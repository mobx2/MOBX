"use client";

import { useState, useEffect, useRef } from "react";
import BootLoader from "@/components/BootLoader";
import HeroSlider from "@/components/HeroSlider";
import MissionList from "@/components/MissionList";
import StatsHUD from "@/components/StatsHUD";
import FinalCutscene from "@/components/FinalCutscene";
import GameHUD from "@/components/GameHUD";
import WantedLevel from "@/components/WantedLevel";
import PauseMenu from "@/components/PauseMenu";
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
    
    // We intentionally removed the section-level yPercent parallax 
    // because animating the actual DOM containers while scrolling past them 
    // fights Lenis and creates a "dragging" / "torture" scroll feeling.
    // Parallax should only be applied to inner elements, never the wrapper!
  }, { scope: containerRef, dependencies: [loading] });

  return (
    <main ref={containerRef} className="bg-gta-black min-h-screen selection:bg-gta-sepia selection:text-gta-black relative overflow-hidden">
      
      {/* Stable wrapper for Loader to prevent React insertBefore crashes */}
      <div className="relative z-[200]">
        <PauseMenu />
      </div>

      <div className="relative z-50">
        {loading && <BootLoader onComplete={() => setLoading(false)} />}
      </div>
      
      {/* Stable wrapper for HUD */}
      <div className={`relative z-40 transition-opacity duration-[1500ms] ease-in-out ${loading ? "opacity-0" : "opacity-100"}`}>
        {!loading && (
          <>
            <GameHUD />
            <WantedLevel />
          </>
        )}
      </div>

      <div 
        className={`w-full relative z-10 transition-opacity duration-[2000ms] ease-in-out ${loading ? "opacity-0 h-screen overflow-hidden" : "opacity-100"}`} 
      >
        <HeroSlider />
        <MissionList />
        <StatsHUD />
        <FinalCutscene />
      </div>
    </main>
  );
}
