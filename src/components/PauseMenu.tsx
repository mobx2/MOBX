"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function PauseMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("MAP");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const menuRef = useRef<HTMLDivElement>(null);
  const svgMapRef = useRef<SVGSVGElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen((prev) => !prev);
      }
    };
    const handleToggleEvent = () => {
      setIsOpen((prev) => !prev);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("togglePauseMenu", handleToggleEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("togglePauseMenu", handleToggleEvent);
    };
  }, []);

  // Animation for opening/closing the menu
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(menuRef.current, 
        { autoAlpha: 0, scale: 1.1 },
        { autoAlpha: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    } else {
      document.body.style.overflow = "auto";
      gsap.to(menuRef.current, {
        autoAlpha: 0, scale: 1.1, duration: 0.3, ease: "power2.in"
      });
    }
  }, [isOpen]);

  // Tab switching animation
  useEffect(() => {
    if (isOpen && contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [activeTab, isOpen]);

  const handleWaypointClick = (x: number, y: number, section: string) => {
    if (!svgMapRef.current) return;
    
    // Aggressive, fast GSAP zoom into the coordinate
    gsap.to(svgMapRef.current, {
      scale: 15,
      x: -x * 10,
      y: -y * 10,
      duration: 0.5,
      ease: "power4.in",
      onComplete: () => {
        // Scroll the page to the exact element instantly to avoid stutter
        let targetId = "hero";
        if (section === "Profile") targetId = "hero";
        if (section === "Projects") targetId = "missions";
        if (section === "Skills") targetId = "stats";
        
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        // Close the menu instantly
        setIsOpen(false);
        
        // Reset map zoom after menu has completely faded out (300ms)
        setTimeout(() => {
          gsap.set(svgMapRef.current, { scale: 1, x: 0, y: 0 });
        }, 300);
      }
    });
  };

  return (
    <div 
      ref={menuRef} 
      className="fixed inset-0 z-[100] bg-gta-black text-brand-white flex flex-col font-sans invisible"
      style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
    >
      
      {/* Background Noise/Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('/noise.png')] mix-blend-overlay" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-[1]" />

      {/* GTA Pause Menu Header */}
      <div className="w-full flex border-b-2 border-gta-sepia/30 bg-[#111] z-10 relative">
        <div className="px-8 py-4 font-bold text-2xl tracking-widest text-gta-sepia w-1/4 border-r-2 border-gta-sepia/30">
          PAUSE MENU
        </div>
        <div className="flex flex-1">
          {["MAP", "BRIEF", "STATS", "AUDIO", "DISPLAY", "GAME"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-xl font-bold tracking-widest transition-colors ${
                activeTab === tab ? "bg-gta-sepia text-black" : "text-gray-500 hover:text-gta-sepia hover:bg-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div ref={contentRef} className="flex-1 relative overflow-hidden bg-[#0a0a0a]">
        
        {/* MAP TAB */}
        {activeTab === "MAP" && (
          <div className="w-full h-full flex items-center justify-center relative">
            <svg 
              ref={svgMapRef}
              viewBox="0 0 1000 1000" 
              className="w-full h-full max-w-[1200px] max-h-[1200px] will-change-transform drop-shadow-[0_0_15px_rgba(204,153,51,0.2)]"
            >
              {/* Abstract City Map Paths */}
              <path d="M 100,100 L 300,150 L 350,400 L 150,500 Z" fill="#1a1a1a" stroke="#cc9933" strokeWidth="2" strokeOpacity="0.3" />
              <path d="M 400,100 L 800,50 L 900,300 L 450,450 Z" fill="#1a1a1a" stroke="#cc9933" strokeWidth="2" strokeOpacity="0.3" />
              <path d="M 200,600 L 400,550 L 600,900 L 150,850 Z" fill="#1a1a1a" stroke="#cc9933" strokeWidth="2" strokeOpacity="0.3" />
              <path d="M 500,500 L 900,400 L 850,800 L 650,750 Z" fill="#1a1a1a" stroke="#cc9933" strokeWidth="2" strokeOpacity="0.3" />
              
              {/* Highways */}
              <path d="M 0,250 C 300,300 600,100 1000,200" fill="none" stroke="#555" strokeWidth="8" />
              <path d="M 250,0 C 300,400 100,700 300,1000" fill="none" stroke="#555" strokeWidth="8" />
              <path d="M 600,0 C 500,500 800,600 700,1000" fill="none" stroke="#555" strokeWidth="8" />

              {/* Waypoint 1: Safehouse (Profile) */}
              <g 
                className="cursor-pointer group"
                onClick={() => handleWaypointClick(250, 300, "Profile")}
              >
                <circle cx="250" cy="300" r="20" fill="#cc9933" className="group-hover:scale-125 transition-transform origin-center" />
                <path d="M 240,305 L 250,290 L 260,305 Z" fill="black" />
                <text x="250" y="340" fill="white" fontSize="16" textAnchor="middle" className="opacity-0 group-hover:opacity-100 transition-opacity">Safehouse (Profile)</text>
              </g>

              {/* Waypoint 2: Mission (Projects) */}
              <g 
                className="cursor-pointer group"
                onClick={() => handleWaypointClick(700, 250, "Projects")}
              >
                <circle cx="700" cy="250" r="20" fill="#ff3333" className="group-hover:scale-125 transition-transform origin-center" />
                <text x="700" y="256" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle">M</text>
                <text x="700" y="290" fill="white" fontSize="16" textAnchor="middle" className="opacity-0 group-hover:opacity-100 transition-opacity">Missions (Projects)</text>
              </g>

              {/* Waypoint 3: Weapon Shop (Skills) */}
              <g 
                className="cursor-pointer group"
                onClick={() => handleWaypointClick(500, 700, "Skills")}
              >
                <circle cx="500" cy="700" r="20" fill="#3399ff" className="group-hover:scale-125 transition-transform origin-center" />
                <text x="500" y="706" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle">W</text>
                <text x="500" y="740" fill="white" fontSize="16" textAnchor="middle" className="opacity-0 group-hover:opacity-100 transition-opacity">Ammu-Nation (Skills)</text>
              </g>
            </svg>
            
            {/* Map Legends */}
            <div className="absolute bottom-8 right-8 bg-black/80 border border-gta-sepia p-4 flex flex-col gap-2">
              <div className="flex items-center gap-3"><div className="w-4 h-4 bg-[#cc9933] rounded-full" /> <span>Safehouse</span></div>
              <div className="flex items-center gap-3"><div className="w-4 h-4 bg-[#ff3333] rounded-full" /> <span>Main Mission</span></div>
              <div className="flex items-center gap-3"><div className="w-4 h-4 bg-[#3399ff] rounded-full" /> <span>Weapon Shop</span></div>
            </div>
          </div>
        )}

        {/* STATS TAB (Profile) */}
        {activeTab === "STATS" && (
          <div className="w-full h-full flex p-8 gap-8 overflow-y-auto">
            {/* Player Character */}
            <div className="w-1/3 h-full flex items-end justify-center border-r-2 border-gta-sepia/20 relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(204,153,51,0.1),transparent)]" />
              <img src="/ibraheem.png" alt="Player" className="w-[80%] object-contain drop-shadow-[5px_5px_0_#000]" style={{ filter: 'sepia(30%) contrast(120%)' }} />
            </div>
            
            {/* Player Stats */}
            <div className="flex-1 flex flex-col gap-6 py-8 pr-8">
              <h2 className="text-4xl font-bold tracking-widest text-gta-sepia mb-4 border-b-2 border-gta-sepia/30 pb-2">PLAYER STATS</h2>
              
              <div className="flex flex-col gap-4">
                <StatBar label="RESPECT (Web Dev)" value={95} />
                <StatBar label="STAMINA (React/Next.js)" value={90} />
                <StatBar label="MUSCLE (Tailwind/CSS)" value={85} />
                <StatBar label="FAT (Bugs)" value={10} color="#ff3333" />
                <StatBar label="SEX APPEAL (UI/UX)" value={88} />
                <StatBar label="WEAPON SKILL (GSAP)" value={92} />
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gta-sepia mb-4">CONTACT INFOMATION</h3>
                <ul className="text-xl text-gray-300 space-y-2">
                  <li><span className="text-white">EMAIL:</span> ibraheem.shaheen@example.com</li>
                  <li><span className="text-white">WANTED LEVEL:</span> 6 STARS</li>
                  <li><span className="text-white">CURRENT LOCATION:</span> LIBERTY CITY</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* AUDIO TAB */}
        {activeTab === "AUDIO" && (
          <div className="w-full h-full flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-2xl bg-black/50 border border-gta-sepia/30 p-8 flex flex-col gap-8">
              <h2 className="text-3xl font-bold tracking-widest text-gta-sepia border-b-2 border-gta-sepia/30 pb-4">AUDIO SETTINGS</h2>
              
              <div className="flex justify-between items-center text-xl text-gray-300">
                <span>RADIO STATION</span>
                <span className="text-white bg-gta-sepia text-black px-4 font-bold">SAN ANDREAS FM</span>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xl text-gray-300">
                  <span>PLAY MUSIC</span>
                  <button 
                    onClick={() => {
                      const audio = document.getElementById('bg-music') as HTMLAudioElement;
                      if (audio) {
                        if (audio.paused) audio.play();
                        else audio.pause();
                        // Force re-render just to show status if we had a state, but let's just let it be toggle
                        audio.paused ? setMusicPlaying(false) : setMusicPlaying(true);
                      }
                    }}
                    className="text-white hover:text-gta-sepia uppercase"
                  >
                    {musicPlaying ? "ON" : "OFF"}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xl text-gray-300">
                  <span>MUSIC VOLUME</span>
                  <span>{Math.round(volume * 100)}%</span>
                </div>
                {/* Interactive slider */}
                <div className="w-full h-4 bg-gray-800 border border-gray-600 relative flex cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const newVol = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                    setVolume(newVol);
                    const audio = document.getElementById('bg-music') as HTMLAudioElement;
                    if (audio) audio.volume = newVol;
                  }}
                >
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className={`flex-1 border-r border-black ${i < (volume * 20) ? 'bg-[#cc9933]' : 'bg-transparent'}`} />
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Placeholder for remaining tabs */}
        {["BRIEF", "DISPLAY", "GAME", "PROJECTS"].includes(activeTab) && (
          <div className="w-full h-full flex items-center justify-center text-4xl text-gray-600 tracking-widest">
            {activeTab} LOG DATA UNAVAILABLE
          </div>
        )}
      </div>
      
      {/* Footer controls */}
      <div className="border-t-2 border-gta-sepia/30 bg-[#111] p-4 flex justify-end px-8 z-10 relative">
        <button onClick={() => setIsOpen(false)} className="text-xl tracking-widest text-white hover:text-gta-sepia flex items-center gap-2">
          <span className="border border-white px-2 rounded bg-white text-black text-sm">ESC</span> BACK / RESUME
        </button>
      </div>

      <audio id="bg-music" src="/theme.mp3" loop />
    </div>
  );
}

// Sub-component for GTA Stat Bars
function StatBar({ label, value, color = "#cc9933" }: { label: string, value: number, color?: string }) {
  const barRef = useRef<HTMLDivElement>(null);
  
  // Smooth fill animation for stats
  useEffect(() => {
    if (barRef.current) {
      gsap.fromTo(barRef.current, 
        { width: "0%" },
        { width: `${value}%`, duration: 1.2, ease: "power3.out", delay: 0.1 }
      );
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-1 w-full max-w-2xl">
      <div className="text-lg tracking-wider text-gray-300">{label}</div>
      <div className="w-full h-4 bg-gray-800 border border-gray-600 relative overflow-hidden">
        {/* The jagged fill */}
        <div 
          ref={barRef}
          className="h-full relative"
          style={{ backgroundColor: color }}
        >
          {/* Add a scanline over the bar to make it look CRT-like */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px]" />
        </div>
      </div>
    </div>
  );
}
