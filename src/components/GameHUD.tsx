"use client";

import { useEffect, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export default function GameHUD() {
  const [missionText, setMissionText] = useState("MISSION: SURVIVE THE CITY");
  const [time, setTime] = useState("08:00");

  useEffect(() => {
    // Clock simulation
    const interval = setInterval(() => {
      const date = new Date();
      setTime(`${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    // Highly performant ScrollTrigger for the crosshair tracking
    const crosshair = document.getElementById("scroll-crosshair");
    if (crosshair) {
      gsap.to(crosshair, {
        top: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        }
      });
    }

    // Scroll listener for mission updates (Throttled via ScrollTrigger callbacks)
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const progress = self.progress;
        
        let newMission = "MISSION: SURVIVE THE CITY";
        if (progress > 0.75) {
          newMission = "MISSION: EXECUTE CONTRACT";
        } else if (progress > 0.5) {
          newMission = "MISSION: CHECK PLAYER STATS";
        } else if (progress > 0.25) {
          newMission = "MISSION: REVIEW DOSSIERS";
        }

        setMissionText((prev) => {
          if (prev !== newMission) {
            const target = document.getElementById("hud-mission-text");
            if (target) {
              gsap.fromTo(target, 
                { opacity: 0, x: -10 },
                { opacity: 1, x: 0, duration: 0.2, ease: "power4.out" }
              );
            }
            return newMission;
          }
          return prev;
        });
      }
    });

  }, []);

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

      {/* Bottom Left: Mini Map (Interactive Navigation) */}
      <div className="absolute bottom-8 left-8 w-48 h-48 rounded-full border-[6px] border-gta-black/90 bg-gta-black/50 overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.8)] pointer-events-auto group">
        {/* Map Background (Radar) */}
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074')] bg-cover bg-center opacity-40 mix-blend-screen transition-transform duration-500 group-hover:scale-110"
          style={{ filter: 'grayscale(100%) sepia(100%) hue-rotate(60deg)' }}
        />
        {/* Player Icon (Center) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rotate-45 border-2 border-gta-black shadow-[0_0_10px_white] z-10" />
        
        {/* Radar Scanner Line */}
        <div className="absolute top-1/2 left-1/2 w-1/2 h-[2px] bg-gta-green/50 origin-left animate-[spin_4s_linear_infinite] z-0" />
        
        {/* Navigation Waypoints */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute top-[20%] left-[30%] w-4 h-4 bg-[#cc9933] rounded-full border-2 border-gta-black shadow-[0_0_5px_#cc9933] hover:scale-150 transition-transform z-20 cursor-pointer peer/home"
        />
        <span className="absolute top-[10%] left-[30%] -translate-x-1/2 text-[10px] font-bold text-white bg-black/80 px-1 rounded opacity-0 peer-hover/home:opacity-100 transition-opacity z-30 pointer-events-none">HOME</span>

        <button 
          onClick={() => window.scrollTo({ top: window.innerHeight * 1.5, behavior: 'smooth' })}
          className="absolute top-[60%] right-[20%] w-4 h-4 bg-[#ff3333] rounded-full border-2 border-gta-black shadow-[0_0_5px_#ff3333] hover:scale-150 transition-transform z-20 cursor-pointer peer/projects"
        >
          <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white">M</span>
        </button>
        <span className="absolute top-[50%] right-[20%] translate-x-1/2 text-[10px] font-bold text-white bg-black/80 px-1 rounded opacity-0 peer-hover/projects:opacity-100 transition-opacity z-30 pointer-events-none">MISSIONS</span>

        <button 
          onClick={() => window.scrollTo({ top: window.innerHeight * 3, behavior: 'smooth' })}
          className="absolute bottom-[20%] left-[40%] w-4 h-4 bg-[#3399ff] rounded-full border-2 border-gta-black shadow-[0_0_5px_#3399ff] hover:scale-150 transition-transform z-20 cursor-pointer peer/skills"
        >
          <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white">W</span>
        </button>
        <span className="absolute bottom-[10%] left-[40%] -translate-x-1/2 text-[10px] font-bold text-white bg-black/80 px-1 rounded opacity-0 peer-hover/skills:opacity-100 transition-opacity z-30 pointer-events-none">WEAPONS</span>
      </div>

      {/* Action Text (Bottom Center) */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <h3 className="gta-hud text-gta-sepia/70 text-lg drop-shadow-[2px_2px_0_#050505] text-center">
          SCROLL TO NAVIGATE LIBERTY CITY
        </h3>
      </div>

      {/* The Sniper Crosshair Scroll Tracker */}
      <div className="absolute top-0 right-4 bottom-0 w-8 flex justify-center py-32 pointer-events-none">
        {/* Track Line */}
        <div className="w-[2px] h-full bg-gta-brown/30 relative">
          {/* Moving Crosshair */}
          <div 
            id="scroll-crosshair" 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center will-change-transform"
          >
            <div className="w-full h-[2px] bg-gta-red absolute" />
            <div className="w-[2px] h-full bg-gta-red absolute" />
            <div className="w-8 h-8 border-2 border-gta-red rounded-full absolute" />
            <div className="w-1 h-1 bg-white rounded-full absolute z-10 shadow-[0_0_5px_white]" />
          </div>
        </div>
      </div>

    </div>
  );
}
