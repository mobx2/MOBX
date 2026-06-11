"use client";

import { useState, useEffect } from "react";
import BootLoader from "@/components/BootLoader";
import HeroSlider from "@/components/HeroSlider";
import MissionList from "@/components/MissionList";
import StatsHUD from "@/components/StatsHUD";
import FinalCutscene from "@/components/FinalCutscene";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loader is active
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      window.scrollTo(0, 0);
    }
  }, [loading]);

  return (
    <main className="bg-gta-black min-h-screen selection:bg-gta-sepia selection:text-gta-black">
      {loading && <BootLoader onComplete={() => setLoading(false)} />}
      
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
