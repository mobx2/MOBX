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

    // Pinning logic to make sections stack like levels
    const sections = gsap.utils.toArray<HTMLElement>(".level-section");
    
    sections.forEach((section, i) => {
      // Don't pin the last section
      if (i === sections.length - 1) return;
      
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        pin: true,
        pinSpacing: false, // The next section will slide over this one!
      });
    });

  }, { scope: containerRef, dependencies: [loading] });

  return (
    <main ref={containerRef} className="bg-gta-black min-h-screen selection:bg-gta-sepia selection:text-gta-black">
      {loading && <BootLoader onComplete={() => setLoading(false)} />}
      
      {!loading && <GameHUD />}

      <div 
        className="w-full relative" 
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
