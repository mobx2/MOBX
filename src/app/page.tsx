"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from 'next/dynamic';
import BootLoader from "@/components/BootLoader";
import HeroSlider from "@/components/HeroSlider";
import PauseMenu from "@/components/PauseMenu";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const MissionList = dynamic(() => import('@/components/MissionList'), { ssr: false });
const StatsHUD = dynamic(() => import('@/components/StatsHUD'), { ssr: false });
const FinalCutscene = dynamic(() => import('@/components/FinalCutscene'), { ssr: false });
const GameHUD = dynamic(() => import('@/components/GameHUD'), { ssr: false });

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

    // Refresh ScrollTrigger after the layout is fully unlocked
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => clearTimeout(timeout);
  }, { scope: containerRef, dependencies: [loading] });

  return (
    <main ref={containerRef} className="bg-gta-black min-h-screen selection:bg-gta-sepia selection:text-gta-black relative overflow-hidden">
      
      <div className="relative z-[99990]">
        <PauseMenu />
      </div>

      {/* Stable wrapper for Loader to prevent React insertBefore crashes */}
      <div className="relative z-[300]">
        {loading && <BootLoader onComplete={() => setLoading(false)} />}
      </div>
      
      <div 
        className={`w-full transition-opacity duration-[2000ms] ease-in-out ${loading ? "opacity-0 h-screen overflow-hidden" : "opacity-100"}`} 
      >
        {/* Stable wrapper for HUD, now inside the same stacking context as sections */}
        <div className={`fixed inset-0 pointer-events-none z-[60] transition-opacity duration-[1500ms] ease-in-out ${loading ? "opacity-0" : "opacity-100"}`}>
          {!loading && <GameHUD />}
        </div>
        <div id="hero" className="relative z-10">
          <HeroSlider />
        </div>
        <div id="missions" className="relative z-[10000]">
          <MissionList />
        </div>
        <div id="stats" className="relative z-10">
          <StatsHUD />
        </div>
        <div id="ending" className="relative z-10">
          <FinalCutscene />
        </div>
      </div>
    </main>
  );
}
