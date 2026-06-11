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
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // 1. Aggressive Title Pinning & Slam
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".archive-header",
        pin: true,
        start: "top top",
        end: "+=1500", // Keep it pinned for 1.5 viewport heights
        scrub: 1.5,
      }
    });

    headerTl.fromTo(".archive-title-word",
      { scale: 15, opacity: 0 },
      {
        scale: 1, opacity: 1,
        stagger: 0.2,
        ease: "power4.out",
        duration: 2
      }
    ).to(".archive-title-word", {
      scale: 1.2, opacity: 0, y: -100, stagger: 0.1, ease: "power2.inOut"
    }, "+=1.5");

    // Scroll Velocity Skewing (Grime Effect) for Projects
    const proxy = { skew: 0 };
    const clamp = gsap.utils.clamp(-15, 15);
    const skewSetters = sectionsRef.current.map(sec => sec ? gsap.quickSetter(sec.querySelector(".mission-info"), "skewY", "deg") : null);

    ScrollTrigger.create({
      onUpdate: (self) => {
        const skew = clamp(self.getVelocity() / -50);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0, duration: 1, ease: "elastic.out(1, 0.3)", overwrite: true,
            onUpdate: () => skewSetters.forEach(set => set && set(proxy.skew))
          });
        }
      }
    });

    // Deep Parallax and reveal animations for each project screen
    sectionsRef.current.forEach((section, i) => {
      if (!section) return;
      
      const imgWrapper = section.querySelector(".bg-wrapper");
      const img = section.querySelector(".bg-image");
      const info = section.querySelector(".mission-info");
      const tape = section.querySelector(".scroll-tape");

      // Aggressive Clip Path Wipe (No fading, pure wipe)
      gsap.fromTo(imgWrapper,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top 20%",
            scrub: 1.5
          }
        }
      );

      // Deep Parallax Zoom with SCRUB
      gsap.fromTo(img, 
        { scale: 1.5, yPercent: 30 }, 
        { 
          scale: 1, yPercent: -30, 
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
          }
        }
      );

      // Slam in the mission info box
      gsap.fromTo(info,
        { xPercent: i % 2 === 0 ? -150 : 150, rotateZ: i % 2 === 0 ? -15 : 15 },
        {
          xPercent: 0, rotateZ: 0,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "top 10%",
            scrub: 1.5
          }
        }
      );

      // Moving Police Tape driven entirely by scroll (Scrubbed)
      if (tape) {
        gsap.fromTo(tape,
          { xPercent: i % 2 === 0 ? -50 : 0 },
          {
            xPercent: i % 2 === 0 ? 0 : -50,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5
            }
          }
        );
      }
    });

    // Massive Sticky Ticker Animation
    gsap.to(".massive-sticky-ticker", {
      xPercent: -30, // Reduced from -50 to make it move slower and smoother
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 2, // Softer scrub
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full relative">
      
      {/* MASSIVE STICKY TICKER THAT STAYS WITH YOU (TONED DOWN) */}
      <div className="sticky top-[45vh] left-0 w-[300vw] h-0 z-0 pointer-events-none opacity-[0.03] overflow-visible">
        <h1 className="massive-sticky-ticker gta-title text-[15vw] leading-none text-white whitespace-nowrap">
          LCPD DATABASE // LCPD DATABASE // LCPD DATABASE // LCPD DATABASE // LCPD DATABASE // LCPD DATABASE //
        </h1>
      </div>

      {/* Intro Header Section */}
      <section className="archive-header level-section relative w-full h-screen bg-gta-black flex flex-col justify-center items-center overflow-hidden perspective-1000">
        <div className="absolute inset-0 gta-noise z-0 pointer-events-none" />
        <div className="relative z-10 text-center px-4 flex flex-col items-center w-full">
          <h2 className="gta-title leading-none drop-shadow-[5px_5px_0_#050505] flex flex-col gap-4 items-center w-full">
            <span className="archive-title-word block text-[#cc9933] text-5xl md:text-7xl origin-center tracking-wider whitespace-nowrap">
              MISSION PASSED!
            </span>
            <span className="archive-title-word block text-[#e6e6e6] text-3xl md:text-5xl origin-center tracking-widest whitespace-nowrap">
              RESPECT +
            </span>
            <span className="archive-title-word gta-hud text-gta-brown text-xl md:text-2xl mt-8 tracking-[0.2em] animate-pulse">
              ACCESSING LCPD DATABASE...
            </span>
          </h2>
        </div>
      </section>

      {/* Full-Screen Projects */}
      {MISSIONS.map((mission, i) => (
        <section 
          key={mission.id}
          ref={el => { sectionsRef.current[i] = el }}
          className="level-section relative w-full h-screen overflow-hidden border-b-4 border-gta-brown/50 bg-gta-black"
        >
          {/* Aggressive Image Reveal Wrapper */}
          <div className="bg-wrapper absolute inset-0 w-full h-full overflow-hidden">
            <div 
              className="bg-image absolute inset-[-10%] w-[120%] h-[120%] bg-cover bg-center will-change-transform origin-center"
              style={{ backgroundImage: `url('${mission.image}')` }}
            />
          </div>
          
          {/* Interactive Scroll Tape */}
          <div className={`scroll-tape absolute top-1/4 ${i % 2 === 0 ? '-left-10 rotate-[-5deg]' : '-right-10 rotate-[5deg]'} w-[200vw] h-16 bg-[#D1C7AC] text-black z-[5] opacity-20 flex items-center overflow-hidden pointer-events-none mix-blend-overlay`}>
            <div className="flex gap-4 whitespace-nowrap gta-title text-5xl">
              {[...Array(10)].map((_, idx) => (
                <span key={idx}>POLICE LINE DO NOT CROSS // LCPD // </span>
              ))}
            </div>
          </div>
          
          {/* GTA Cinematic Filters */}
          <div className="absolute inset-0 bg-[#4A3219] opacity-40 mix-blend-color pointer-events-none" />
          <div className="absolute inset-0 bg-black opacity-60 pointer-events-none" />
          <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />
          <div className="absolute inset-0 gta-vignette pointer-events-none" />

          {/* Mission Information (HUD style overlay) */}
          <div className={`mission-info absolute top-1/2 -translate-y-1/2 ${i % 2 === 0 ? 'left-4 md:left-24' : 'right-4 md:right-24'} w-[90vw] md:w-[500px] z-10`}>
            
            <div className="bg-[#050505]/95 border-2 border-[#222] p-6 md:p-10 shadow-[15px_15px_0px_rgba(0,0,0,1)]">
              {/* Fake Tape */}
              <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-32 h-8 bg-[#D1C7AC] opacity-20 rotate-[-2deg] pointer-events-none" />

              <div className="border-b-2 border-gta-brown/50 pb-4 mb-6 relative">
                {/* Minor Police Strobe in HUD */}
                <div className="absolute top-0 right-0 w-16 h-16 siren-red animate-siren opacity-30 pointer-events-none" />
                
                <p className="gta-hud text-gta-brown mb-2 tracking-widest text-lg">FILE N° 0{mission.id}</p>
                <h3 className="gta-title text-5xl md:text-7xl tracking-tight text-gta-sepia leading-none drop-shadow-[4px_4px_0_#000] glitch-hover">
                  {mission.title}
                </h3>
              </div>
              
              <div className="grid grid-cols-2 gap-6 my-6 gta-hud text-sm">
                <div>
                  <span className="text-gta-brown block mb-1">CLIENT</span>
                  <span className="text-white text-xl">{mission.client}</span>
                </div>
                <div>
                  <span className="text-gta-brown block mb-1">STATUS</span>
                  <span className={`text-xl ${mission.status === 'WANTED' ? 'text-gta-red' : 'text-gta-green'} animate-pulse`}>
                    {mission.status}
                  </span>
                </div>
              </div>

              <div className="bg-[#0A0A0A] p-5 border border-[#222] mb-8 relative overflow-hidden group">
                <div className="absolute inset-0 scanlines opacity-50 pointer-events-none" />
                <p className="gta-hud text-sm md:text-base text-gta-sepia/80 leading-relaxed relative z-10 transition-colors duration-300 group-hover:text-white">
                  {mission.desc}
                </p>
              </div>

              <button className="gta-hud relative w-full border-2 border-gta-sepia py-4 text-gta-sepia overflow-hidden group text-xl">
                <div className="absolute inset-0 bg-gta-sepia -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative z-10 group-hover:text-gta-black transition-colors duration-500">
                  LOAD MISSION
                </span>
              </button>
            </div>

          </div>
        </section>
      ))}
    </div>
  );
}
