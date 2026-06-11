"use client";

import { useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function GameHUD() {
  const [missionText, setMissionText] = useState("MISSION: SURVIVE THE CITY");
  const [time, setTime] = useState("08:00");

  useEffect(() => {
    // Clock simulation
    const interval = setInterval(() => {
      const date = new Date();
      setTime(`${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`);
    }, 1000);

    // Scroll listener for mission updates
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = window.innerHeight;
      
      let newMission = "MISSION: SURVIVE THE CITY";
      if (scrollY > height * 2.5) {
        newMission = "MISSION: EXECUTE CONTRACT";
      } else if (scrollY > height * 1.5) {
        newMission = "MISSION: CHECK PLAYER STATS";
      } else if (scrollY > height * 0.5) {
        newMission = "MISSION: REVIEW DOSSIERS";
      }

      if (newMission !== missionText) {
        // Glitch effect on text change
        const target = document.getElementById("hud-mission-text");
        if (target) {
          gsap.fromTo(target, 
            { opacity: 0, x: -10 },
            { opacity: 1, x: 0, duration: 0.2, ease: "power4.out" }
          );
        }
        setMissionText(newMission);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [missionText]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] select-none">
      
      {/* Top Left: Mission Objective */}
      <div className="absolute top-8 left-8">
        <h3 id="hud-mission-text" className="gta-hud text-gta-sepia text-2xl drop-shadow-[2px_2px_0_#050505]">
          {missionText}
        </h3>
      </div>

      {/* Top Right: Money, Weapon, Stars */}
      <div className="absolute top-8 right-8 flex flex-col items-end gap-2">
        <div className="flex items-center gap-4">
          <div className="gta-hud text-gta-green text-4xl drop-shadow-[2px_2px_0_#050505]">$99,999,999</div>
          <div className="w-16 h-16 bg-gta-black/80 border-2 border-gta-black flex items-center justify-center rounded-sm">
            {/* Fake Weapon Icon: A simple pistol shape using SVG or unicode */}
            <span className="text-gta-sepia text-4xl transform scale-x-[-1]">🔫</span>
          </div>
        </div>
        
        {/* Wanted Stars */}
        <div className="flex gap-1 text-gta-red text-2xl drop-shadow-[2px_2px_0_#050505]">
          ★★★★★★
        </div>
        
        {/* Time */}
        <div className="gta-hud text-gta-sepia text-2xl drop-shadow-[2px_2px_0_#050505] mt-1">
          {time}
        </div>
      </div>

      {/* Bottom Left: Mini Map */}
      <div className="absolute bottom-8 left-8 w-48 h-48 rounded-full border-[6px] border-gta-black/90 bg-gta-black/50 overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.8)]">
        {/* Map Background (Radar) */}
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074')] bg-cover bg-center opacity-40 mix-blend-screen"
          style={{ filter: 'grayscale(100%) sepia(100%) hue-rotate(60deg)' }}
        />
        {/* Player Icon (Center) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rotate-45 border-2 border-gta-black shadow-[0_0_10px_white]" />
        
        {/* Radar Scanner Line */}
        <div className="absolute top-1/2 left-1/2 w-1/2 h-[2px] bg-gta-green/50 origin-left animate-[spin_4s_linear_infinite]" />
        
        {/* Mission Waypoints (Yellow dots) */}
        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-gta-sepia rounded-full border border-gta-black shadow-[0_0_5px_#D1C7AC]" />
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-gta-sepia rounded-full border border-gta-black shadow-[0_0_5px_#D1C7AC]" />
      </div>

      {/* Action Text (Bottom Center) */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <h3 className="gta-hud text-gta-sepia/70 text-lg drop-shadow-[2px_2px_0_#050505] text-center">
          SCROLL TO NAVIGATE LIBERTY CITY
        </h3>
      </div>

    </div>
  );
}
