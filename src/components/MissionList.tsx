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
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    // Horizontal Scroll for Missions
    gsap.to(scrollWrapperRef.current, {
      xPercent: -100 * (cards.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${window.innerWidth * cards.length}`,
        pin: true,
        scrub: 1,
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="level-section relative w-full h-screen bg-gta-black py-20 overflow-hidden border-t-4 border-b-4 border-gta-brown/50">
      
      <div className="absolute inset-0 gta-noise z-0 pointer-events-none" />
      <div className="absolute inset-0 gta-vignette z-0 pointer-events-none" />

      {/* Header */}
      <div className="absolute top-10 left-10 z-20 border-b-4 border-gta-brown pb-2">
        <h2 className="gta-title text-5xl text-gta-sepia">MISSION ARCHIVE</h2>
        <p className="gta-hud text-gta-brown text-lg mt-1">ACCESSING LCPD DATABASE...</p>
      </div>

      {/* Horizontal Scroll Wrapper */}
      <div ref={scrollWrapperRef} className="relative z-10 flex h-full items-center mt-10 w-max pl-[10vw]">
        {MISSIONS.map((mission, i) => (
          <div 
            key={mission.id}
            ref={el => { cardsRef.current[i] = el }}
            className="group relative w-[80vw] md:w-[60vw] max-w-4xl flex flex-col md:flex-row bg-[#111] border-2 border-[#222] p-6 gap-8 shadow-2xl mx-8"
            style={{ 
              boxShadow: '10px 10px 30px rgba(0,0,0,0.8), inset 0 0 50px rgba(0,0,0,0.5)'
            }}
          >
            {/* Fake Tape on Top */}
            <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-32 h-8 bg-[#D1C7AC] opacity-30 rotate-[-2deg] z-20" />

            {/* Image (Polaroid Style) */}
            <div className="relative w-full md:w-1/2 aspect-video bg-black border-[12px] border-b-[40px] border-[#D1C7AC] overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-300"
                style={{ 
                  backgroundImage: `url('${mission.image}')`,
                  filter: 'sepia(60%) contrast(150%) brightness(0.6)'
                }}
              />
              <div className="absolute inset-0 scanlines opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute inset-0 gta-noise opacity-10 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
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
