"use client";

import { useState, useEffect, useRef } from "react";
import BootLoader from "@/components/BootLoader";
import HeroSlider from "@/components/HeroSlider";
import MissionList from "@/components/MissionList";
import StatsHUD from "@/components/StatsHUD";
import FinalCutscene from "@/components/FinalCutscene";
import GameHUD from "@/components/GameHUD";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent scrolling while loader is active
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      window.scrollTo(0, 0);
    }
  }, [loading]);

  useGSAP(() => {
    if (loading) return;

    // Remove old pinning logic. 
    // Instead, let's create a crazy vertical parallax effect where sections overlap dynamically.
    const sections = gsap.utils.toArray<HTMLElement>(".level-section");
    
    sections.forEach((section, i) => {
      // Skip the first section (Hero) from sliding up
      if (i === 0) return;
      
      // We start the section slightly lower and move it up faster than the scroll
      gsap.fromTo(section, 
        { yPercent: 20, boxShadow: "0px -50px 100px rgba(0,0,0,1)" },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom", // When top of section hits bottom of viewport
            end: "top top",      // Until it reaches its natural position
            scrub: true,
          }
        }
      );
      
      // We push the previous section down slightly to create an overlapping parallax!
      const prevSection = sections[i - 1];
      if (prevSection) {
        gsap.to(prevSection, {
          yPercent: 30, // Push it down
          filter: "brightness(0.2) grayscale(100%)", // Fade it to black
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top top",
            scrub: true,
          }
        });
      }
    });

  }, { scope: containerRef, dependencies: [loading] });

  return (
    <main ref={containerRef} className="bg-gta-black min-h-screen selection:bg-gta-sepia selection:text-gta-black relative overflow-hidden">
      {loading && <BootLoader onComplete={() => setLoading(false)} />}
      
      {!loading && <GameHUD />}

      <div 
        className="w-full relative z-10" 
        style={{ visibility: loading ? "hidden" : "visible" }}
      >
        <HeroSlider />
        <MissionList />
        <StatsHUD />
        <FinalCutscene />
      </div>
    </main>
  );
}
