"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const MISSIONS = [
  {
    id: 1,
    title: "PROJECT ZERO",
    client: "UNKNOWN",
    status: "COMPLETED",
    desc: "Infiltrate the mainframe and establish a WebGL beachhead.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000"
  },
  {
    id: 2,
    title: "NEON VOID",
    client: "SYNDICATE",
    status: "IN PROGRESS",
    desc: "Extract the React components before the deadline hits.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000"
  },
  {
    id: 3,
    title: "ACID DREAMS",
    client: "CARTEL",
    status: "WANTED",
    desc: "Develop a high-performance shader pipeline. Leave no trace.",
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2000"
  }
];

export default function MissionList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    cards.forEach((card, i) => {
      if (!card) return;
      
      const isEven = i % 2 === 0;
      
      // High velocity slide-in on scroll
      gsap.fromTo(card,
        { 
          xPercent: isEven ? -50 : 50, 
          rotationZ: isEven ? -10 : 10,
          opacity: 0 
        },
        {
          xPercent: 0,
          rotationZ: (Math.random() - 0.5) * 4, // Slight polaroid tilt
          opacity: 1,
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="level-section relative w-full min-h-screen bg-gta-black py-32 overflow-hidden border-t-4 border-b-4 border-gta-brown/50 flex flex-col items-center">
      
      <div className="absolute inset-0 gta-noise z-0 pointer-events-none" />
      <div className="absolute inset-0 gta-vignette z-0 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 mb-20 border-b-4 border-gta-brown pb-2 w-full max-w-4xl px-8">
        <h2 className="gta-title text-5xl md:text-6xl text-gta-sepia">MISSION ARCHIVE</h2>
        <p className="gta-hud text-gta-brown text-lg mt-1">ACCESSING LCPD DATABASE...</p>
      </div>

      {/* Vertical Stack Wrapper */}
      <div className="relative z-10 flex flex-col gap-24 w-full px-4 md:px-8 items-center">
        {MISSIONS.map((mission, i) => (
          <div 
            key={mission.id}
            ref={el => { cardsRef.current[i] = el }}
            className="group relative w-full max-w-4xl flex flex-col md:flex-row bg-[#111] border-2 border-[#222] p-6 gap-8 will-change-transform"
            style={{ 
              boxShadow: '20px 20px 0px rgba(0,0,0,0.8)' // Hard shadow instead of blurred shadow for 60FPS
            }}
          >
            {/* Fake Tape on Top */}
            <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-32 h-8 bg-[#D1C7AC] opacity-30 rotate-[-2deg] z-20" />

            {/* Image (Polaroid Style) */}
            <div className="relative w-full md:w-1/2 aspect-video bg-black border-[12px] border-b-[40px] border-[#D1C7AC] overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 will-change-transform"
                style={{ 
                  backgroundImage: `url('${mission.image}')`
                }}
              />
              {/* Fake Sepia Filter using pure HTML overlay (Zero GPU hit) */}
              <div className="absolute inset-0 bg-[#4A3219] opacity-40 mix-blend-color pointer-events-none transition-opacity duration-300 group-hover:opacity-0" />
              <div className="absolute inset-0 bg-black opacity-40 pointer-events-none transition-opacity duration-300 group-hover:opacity-10" />
              
              <div className="absolute inset-0 scanlines opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            {/* Mission Details */}
            <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 text-gta-sepia">
              <div className="border-b-2 border-gta-brown/50 pb-2">
                <p className="gta-hud text-sm text-gta-brown mb-1">FILE N° 0{mission.id}</p>
                <h3 className="gta-title text-4xl md:text-5xl tracking-tight leading-none">{mission.title}</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4 my-2 gta-hud text-sm">
                <div>
                  <span className="text-gta-brown block">CLIENT</span>
                  <span>{mission.client}</span>
                </div>
                <div>
                  <span className="text-gta-brown block">STATUS</span>
                  <span className={mission.status === 'WANTED' ? 'text-gta-red' : 'text-gta-green'}>
                    {mission.status}
                  </span>
                </div>
              </div>

              <div className="bg-[#0A0A0A] p-4 border border-[#222]">
                <p className="gta-hud text-sm text-gta-sepia/80 leading-relaxed">
                  {mission.desc}
                </p>
              </div>

              <button className="gta-hud mt-4 border-2 border-gta-sepia py-3 px-6 hover:bg-gta-sepia hover:text-gta-black transition-colors self-start">
                LOAD MISSION
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
