"use client";

import { useState, useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useHoverSound } from "@/hooks/useHoverSound";

export default function PauseMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("MAP");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const menuRef = useRef<HTMLDivElement>(null);
  const svgMapRef = useRef<SVGSVGElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const { isMuted, playHoverSound } = useHoverSound();

  const playMenuSound = () => {
    if (!isMuted && typeof window !== "undefined") {
      const audio = new Audio("/gta-sa-menu.mp3");
      audio.volume = 0.6;
      audio.play().catch(() => {});
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen((prev) => {
          if (!prev) playMenuSound();
          return !prev;
        });
      }
    };
    const handleToggleEvent = () => {
      setIsOpen((prev) => {
        if (!prev) playMenuSound();
        return !prev;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("togglePauseMenu", handleToggleEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("togglePauseMenu", handleToggleEvent);
    };
  }, []);

  const isInitialMount = useRef(true);

  // Animation for opening/closing the menu
  useGSAP(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      gsap.set(menuRef.current, { autoAlpha: 0, scale: 1.1 });
      // Don't animate on first render
      return;
    }

    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(menuRef.current, 
        { autoAlpha: 0, scale: 1.1 },
        { 
          autoAlpha: 1, scale: 1, duration: 0.3, ease: "power2.out",
          force3D: true,
          onStart: () => gsap.set(menuRef.current, { willChange: "transform, opacity" }),
          onComplete: () => gsap.set(menuRef.current, { willChange: "auto" })
        }
      );
    } else {
      document.body.style.overflow = "auto";
      gsap.to(menuRef.current, {
        autoAlpha: 0, scale: 1.1, duration: 0.3, ease: "power2.in",
        force3D: true,
        onStart: () => gsap.set(menuRef.current, { willChange: "transform, opacity" }),
        onComplete: () => gsap.set(menuRef.current, { willChange: "auto" })
      });
    }
  }, { dependencies: [isOpen] });

  // Tab switching animation
  useGSAP(() => {
    if (isOpen && contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, y: 0, duration: 0.3, ease: "power2.out",
          force3D: true,
          onStart: () => gsap.set(contentRef.current, { willChange: "transform, opacity" }),
          onComplete: () => gsap.set(contentRef.current, { willChange: "auto" })
        }
      );
    }
  }, { dependencies: [activeTab, isOpen] });

  // Map Player Tracking
  useGSAP(() => {
    import("@/lib/gsap").then(({ ScrollTrigger }) => {
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const progress = self.progress;
          const waypoints = [
            { x: 300, y: 200 },
            { x: 700, y: 400 },
            { x: 400, y: 700 },
            { x: 750, y: 850 }
          ];

          let targetX, targetY;
          if (progress < 0.33) {
            const p = progress / 0.33;
            targetX = waypoints[0].x + (waypoints[1].x - waypoints[0].x) * p;
            targetY = waypoints[0].y + (waypoints[1].y - waypoints[0].y) * p;
          } else if (progress < 0.66) {
            const p = (progress - 0.33) / 0.33;
            targetX = waypoints[1].x + (waypoints[2].x - waypoints[1].x) * p;
            targetY = waypoints[1].y + (waypoints[2].y - waypoints[1].y) * p;
          } else {
            const p = (progress - 0.66) / 0.34;
            targetX = waypoints[2].x + (waypoints[3].x - waypoints[2].x) * p;
            targetY = waypoints[2].y + (waypoints[3].y - waypoints[2].y) * p;
          }

          const icon = document.getElementById('pause-player-icon');
          if (icon) {
            icon.style.transform = `translate(${targetX}px, ${targetY}px)`;
          }
        }
      });
    });
  }, []);

  const handleWaypointClick = (x: number, y: number, section: string) => {
    if (!svgMapRef.current) return;
    
    // Aggressive, fast GSAP zoom into the coordinate
    gsap.to(svgMapRef.current, {
      scale: 15,
      x: -x * 10,
      y: -y * 10,
      duration: 0.5,
      ease: "power4.in",
      force3D: true,
      onStart: () => gsap.set(svgMapRef.current, { willChange: "transform, opacity" }),
      onComplete: () => {
        gsap.set(svgMapRef.current, { willChange: "auto" });
        // Scroll the page to the exact element instantly to avoid stutter
        let targetId = "hero";
        if (section === "Profile") targetId = "hero";
        if (section === "Projects") targetId = "missions";
        if (section === "Skills") targetId = "stats";
        if (section === "Ending") targetId = "ending";
        
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
      className="fixed inset-0 z-[100] bg-gta-black text-brand-white flex flex-col font-sans invisible contain-strict"
      style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
    >
      
      {/* Background Noise/Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-noise mix-blend-overlay" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-[1] animate-crt-scroll" />

      {/* GTA Pause Menu Header */}
      <div className="w-full flex flex-col md:flex-row border-b-2 border-gta-sepia/30 bg-[#111] z-10 relative shrink-0">
        <div className="px-4 py-3 md:px-8 md:py-4 font-bold text-lg md:text-2xl tracking-widest text-gta-sepia w-full md:w-1/4 border-b-2 md:border-b-0 md:border-r-2 border-gta-sepia/30 shrink-0">
          PAUSE MENU
        </div>
        <div className="flex flex-1 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {["MAP", "BRIEF", "STATS", "AUDIO"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              onMouseEnter={playHoverSound}
              className={`flex-none px-6 md:px-0 md:flex-1 py-3 md:py-4 text-sm md:text-xl font-bold tracking-widest transition-colors ${
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
                onClick={() => handleWaypointClick(300, 200, "Profile")}
                onMouseEnter={playHoverSound}
              >
                {/* Invisible Hitbox for easier clicking */}
                <circle cx="300" cy="200" r="60" fill="transparent" />
                
                <circle cx="300" cy="200" r="20" fill="#cc9933" className="group-hover:scale-125 transition-transform origin-center" />
                <path d="M 290,205 L 300,190 L 310,205 Z" fill="black" />
                <text x="300" y="240" fill="white" fontSize="16" textAnchor="middle" className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Safehouse (Hero)</text>
              </g>

              {/* Waypoint 2: Mission (Projects) */}
              <g 
                className="cursor-pointer group"
                onClick={() => handleWaypointClick(700, 400, "Projects")}
                onMouseEnter={playHoverSound}
              >
                {/* Invisible Hitbox for easier clicking */}
                <circle cx="700" cy="400" r="60" fill="transparent" />

                <circle cx="700" cy="400" r="20" fill="#ff3333" className="group-hover:scale-125 transition-transform origin-center" />
                <text x="700" y="406" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle" className="pointer-events-none">M</text>
                <text x="700" y="440" fill="white" fontSize="16" textAnchor="middle" className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Missions (Projects)</text>
              </g>

              {/* Waypoint 3: Weapon Shop (Skills) */}
              <g 
                className="cursor-pointer group"
                onClick={() => handleWaypointClick(400, 700, "Skills")}
                onMouseEnter={playHoverSound}
              >
                {/* Invisible Hitbox for easier clicking */}
                <circle cx="400" cy="700" r="60" fill="transparent" />

                <circle cx="400" cy="700" r="20" fill="#3399ff" className="group-hover:scale-125 transition-transform origin-center" />
                <text x="400" y="706" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle" className="pointer-events-none">S</text>
                <text x="400" y="740" fill="white" fontSize="16" textAnchor="middle" className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Ammu-Nation (Stats)</text>
              </g>

              {/* Waypoint 4: Airport (Ending) */}
              <g 
                className="cursor-pointer group"
                onClick={() => handleWaypointClick(750, 850, "Ending")}
                onMouseEnter={playHoverSound}
              >
                {/* Invisible Hitbox for easier clicking */}
                <circle cx="750" cy="850" r="60" fill="transparent" />

                <circle cx="750" cy="850" r="20" fill="#cc33ff" className="group-hover:scale-125 transition-transform origin-center" />
                <text x="750" y="856" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle" className="pointer-events-none">E</text>
                <text x="750" y="890" fill="white" fontSize="16" textAnchor="middle" className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Airport (Ending)</text>
              </g>

              {/* Player Icon tracking scroll */}
              <g id="pause-player-icon" className="transition-transform duration-75 ease-out" style={{ transform: 'translate(300px, 200px)' }}>
                <circle cx="0" cy="0" r="12" fill="white" stroke="#000" strokeWidth="2" className="shadow-[0_0_10px_white]" />
                <circle cx="0" cy="0" r="4" fill="black" />
              </g>
            </svg>
            
            {/* Map Legends */}
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-black/80 border border-gta-sepia p-3 md:p-4 flex flex-col gap-2 text-xs md:text-base">
              <div className="flex items-center gap-3"><div className="w-3 h-3 md:w-4 md:h-4 bg-[#cc9933] rounded-full shrink-0" /> <span>Safehouse</span></div>
              <div className="flex items-center gap-3"><div className="w-3 h-3 md:w-4 md:h-4 bg-[#ff3333] rounded-full shrink-0" /> <span>Main Mission</span></div>
              <div className="flex items-center gap-3"><div className="w-3 h-3 md:w-4 md:h-4 bg-[#3399ff] rounded-full shrink-0" /> <span>Weapon Shop</span></div>
              <div className="flex items-center gap-3"><div className="w-3 h-3 md:w-4 md:h-4 bg-[#cc33ff] rounded-full shrink-0" /> <span>Airport</span></div>
            </div>
          </div>
        )}

        {/* STATS TAB (Profile) */}
        {activeTab === "STATS" && (
          <div className="w-full h-full flex flex-col md:flex-row p-4 md:p-8 gap-4 md:gap-8 overflow-y-auto" data-lenis-prevent="true">
            {/* Player Character */}
            <div className="w-full md:w-1/3 h-[40vh] md:h-full flex items-end justify-center border-b-2 md:border-b-0 md:border-r-2 border-gta-sepia/20 relative overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(204,153,51,0.1),transparent)]" />
              <img src="/ibraheem.png" alt="Player" className="w-[180%] md:w-[180%] scale-[1.2] md:scale-[1.6] origin-bottom translate-y-2 md:translate-y-6 object-bottom object-contain drop-shadow-[5px_5px_0_#000]" style={{ filter: 'sepia(30%) contrast(120%)' }} />
            </div>
            
            {/* Player Stats */}
            <div className="flex-1 flex flex-col gap-4 md:gap-6 py-4 md:py-8 pr-0 md:pr-8">
              <h2 className="text-2xl md:text-4xl font-bold tracking-widest text-gta-sepia mb-2 md:mb-4 border-b-2 border-gta-sepia/30 pb-2">PLAYER STATS</h2>
              
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
                  <li><span className="text-white">EMAIL:</span> ibraheemshaheeh54@gmail.com</li>
                  <li><span className="text-white">WANTED LEVEL:</span> 6 STARS</li>
                  <li><span className="text-white">GANG:</span> JUNIOR DEVELOPER</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* AUDIO TAB */}
        {activeTab === "AUDIO" && (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative overflow-y-auto" data-lenis-prevent="true">
            <div className="w-full max-w-3xl bg-[#080808] border border-gta-sepia/20 p-6 md:p-12 flex flex-col items-center text-center gap-8 md:gap-12 drop-shadow-[0_0_50px_rgba(204,153,51,0.05)] relative overflow-hidden">
              
              {/* Subtle Background Glow */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(204,153,51,0.08),transparent_70%)]" />

              {/* Station Info */}
              <div className="flex flex-col items-center gap-3 z-10">
                <h2 className="text-xl tracking-[0.4em] text-gray-500 font-bold">RADIO STATION</h2>
                <div className="text-5xl font-bold tracking-widest text-black bg-gta-sepia px-8 py-3 drop-shadow-[6px_6px_0_rgba(0,0,0,1)] -rotate-1">
                  SAN ANDREAS FM
                </div>
                <div className="text-gta-sepia/70 text-lg tracking-widest mt-2 animate-pulse">NOW PLAYING: Theme Song</div>
              </div>

              {/* Play / Pause Big Button */}
              <div className="flex items-center justify-center z-10 mt-4">
                <button 
                  onClick={() => {
                    const audio = document.getElementById('bg-music') as HTMLAudioElement;
                    if (audio) {
                      if (audio.paused) {
                        audio.play();
                        setMusicPlaying(true);
                        document.dispatchEvent(new CustomEvent('musicStateChange', { detail: { playing: true } }));
                      } else {
                        audio.pause();
                        setMusicPlaying(false);
                        document.dispatchEvent(new CustomEvent('musicStateChange', { detail: { playing: false } }));
                      }
                    }
                  }}
                  onMouseEnter={playHoverSound}
                  className={`w-32 h-32 rounded-full border-[6px] flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                    musicPlaying 
                      ? "border-gta-sepia bg-gta-sepia/10 text-gta-sepia shadow-[0_0_30px_rgba(204,153,51,0.4)]" 
                      : "border-gray-700 bg-black text-gray-500 hover:border-white hover:text-white"
                  }`}
                >
                  {musicPlaying ? (
                    <svg className="w-14 h-14 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  ) : (
                    <svg className="w-16 h-16 ml-3 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  )}
                </button>
              </div>

              {/* Volume Slider */}
              <div className="flex flex-col gap-4 w-full max-w-lg z-10 mt-4">
                <div className="flex justify-between text-base tracking-[0.2em] text-gray-400 font-bold">
                  <span>MASTER VOLUME</span>
                  <span className="text-gta-sepia">{Math.round(volume * 100)}%</span>
                </div>
                {/* Interactive slider */}
                <div className="w-full h-8 bg-black border-2 border-gray-800 relative flex cursor-pointer group"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const newVol = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                    setVolume(newVol);
                    const audio = document.getElementById('bg-music') as HTMLAudioElement;
                    if (audio) audio.volume = newVol;
                  }}
                  onMouseEnter={playHoverSound}
                >
                  {/* Hover effect highlight */}
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className={`flex-1 border-r border-black/80 ${i < (volume * 20) ? 'bg-gta-sepia shadow-[0_0_10px_rgba(204,153,51,0.5)]' : 'bg-transparent'}`} />
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* BRIEF TAB (Mission Log / CV) */}
        {activeTab === "BRIEF" && (
          <div className="w-full h-full p-4 md:p-8 overflow-y-auto" data-lenis-prevent="true">
            <div className="max-w-4xl mx-auto flex flex-col gap-6 md:gap-8 pb-20">
              
              <div className="border-l-4 border-gta-sepia pl-4 md:pl-6">
                <h2 className="text-2xl md:text-4xl font-bold tracking-widest text-gta-sepia mb-2">TARGET DOSSIER: IBRAHEEM SHAHEEN</h2>
                <p className="text-xl text-gray-300 leading-relaxed font-sans">
                  I&apos;m a Front-End Developer focused on building clean, responsive, and user-friendly interfaces. While I&apos;m still early in my career, I&apos;ve been actively working on personal projects and practicing with modern technologies like React, Tailwind CSS, and JavaScript. I enjoy turning UI/UX designs into real web experiences, and I&apos;m constantly learning to write better, scalable code and stay updated with the latest front-end trends.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Skills Sector */}
                <div className="bg-black/40 border border-gray-800 p-6">
                  <h3 className="text-2xl font-bold tracking-widest text-white mb-4 border-b border-gray-800 pb-2">WEAPONS & SKILLS</h3>
                  <ul className="space-y-4 text-gray-400 font-sans">
                    <li><strong className="text-gta-sepia">Front-End:</strong> HTML, CSS, JavaScript, React.js, JSX, Next.js, Responsive Design</li>
                    <li><strong className="text-gta-sepia">State Management:</strong> Redux (Classic & Toolkit), Context API, useReducer</li>
                    <li><strong className="text-gta-sepia">Tools & Workflow:</strong> Vite, Git & GitHub, VS Code, DevTools, NPM, Yarn, PNPM</li>
                    <li><strong className="text-gta-sepia">Other:</strong> API Integration (REST), Local Storage, Routing, Deployment (Netlify/Vercel)</li>
                  </ul>
                </div>

                {/* Experience & Education */}
                <div className="flex flex-col gap-8">
                  <div className="bg-black/40 border border-gray-800 p-6">
                    <h3 className="text-2xl font-bold tracking-widest text-white mb-4 border-b border-gray-800 pb-2">CRIMINAL RECORD (EXPERIENCE)</h3>
                    <div className="font-sans">
                      <div className="text-gta-sepia font-bold text-lg">Full-Stack Developer @ Start Agency</div>
                      <div className="text-gray-500 mb-2">August 2025 – Present</div>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li>Front-end development with React.js & Next.js, focusing on performance and UX.</li>
                        <li>Back-end work with Supabase for database and API management.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-black/40 border border-gray-800 p-6">
                    <h3 className="text-2xl font-bold tracking-widest text-white mb-4 border-b border-gray-800 pb-2">TRAINING (EDUCATION)</h3>
                    <div className="font-sans">
                      <div className="text-white font-bold text-lg">Faculty of Specific Education</div>
                      <div className="text-gta-sepia">Mansoura University</div>
                      <div className="text-gray-500">09/2022 – Present | Mansoura, Egypt</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Projects (Recent Hits) */}
              <div className="bg-black/40 border border-gray-800 p-6">
                <h3 className="text-2xl font-bold tracking-widest text-white mb-4 border-b border-gray-800 pb-2">RECENT HITS (PROJECTS)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                  <div>
                    <a href="http://elfakharanypastry.com/" target="_blank" rel="noreferrer" className="text-gta-sepia font-bold text-lg hover:text-white transition-colors flex items-center gap-2">
                      El Fakharany Pastry <span className="text-xs">↗</span>
                    </a>
                    <p className="text-gray-400 text-sm mt-1">A comprehensive mobile application, smart menu, high-conversion landing page, and a professional management dashboard.</p>
                  </div>
                  <div>
                    <a href="https://waelelgendy.com/" target="_blank" rel="noreferrer" className="text-gta-sepia font-bold text-lg hover:text-white transition-colors flex items-center gap-2">
                      Wael El Gendy Portal <span className="text-xs">↗</span>
                    </a>
                    <p className="text-gray-400 text-sm mt-1">Official platform for Parliament Member Wael El Gendy, featuring a highly secure, private management dashboard.</p>
                  </div>
                  <div>
                    <a href="https://reyaza.startagency.net/" target="_blank" rel="noreferrer" className="text-gta-sepia font-bold text-lg hover:text-white transition-colors flex items-center gap-2">
                      Reyaza E-Commerce & ERP <span className="text-xs">↗</span>
                    </a>
                    <p className="text-gray-400 text-sm mt-1">Full e-commerce platform for Reyaza Plant Fertilizers with an advanced ERP dashboard for inventory and orders.</p>
                  </div>
                  <div>
                    <a href="https://www.startagency.net/" target="_blank" rel="noreferrer" className="text-gta-sepia font-bold text-lg hover:text-white transition-colors flex items-center gap-2">
                      Start Agency <span className="text-xs">↗</span>
                    </a>
                    <p className="text-gray-400 text-sm mt-1">The core digital footprint and official website for Start Digital Marketing Agency.</p>
                  </div>
                  <div>
                    <a href="https://eparkeg.startagency.net/" target="_blank" rel="noreferrer" className="text-gta-sepia font-bold text-lg hover:text-white transition-colors flex items-center gap-2">
                      ePark Landing Page <span className="text-xs">↗</span>
                    </a>
                    <p className="text-gray-400 text-sm mt-1">A high-conversion landing page designed for ePark to showcase their services and features.</p>
                  </div>
                  <div>
                    <a href="https://start-agency-v1-1at1.vercel.app/" target="_blank" rel="noreferrer" className="text-gta-sepia font-bold text-lg hover:text-white transition-colors flex items-center gap-2">
                      Start Agency (Unofficial) <span className="text-xs">↗</span>
                    </a>
                    <p className="text-gray-400 text-sm mt-1">An experimental, heavily animated and highly interactive concept website developed for Start Agency.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}


      </div>
      
      {/* Footer controls */}
      <div className="border-t-2 border-gta-sepia/30 bg-[#111] p-4 flex justify-end px-8 z-10 relative">
        <button onClick={() => setIsOpen(false)} onMouseEnter={playHoverSound} className="text-xl tracking-widest text-white hover:text-gta-sepia flex items-center gap-2">
          <span className="border border-white px-2 rounded bg-white text-black text-sm">ESC</span> BACK / RESUME
        </button>
      </div>
    </div>
  );
}

// Sub-component for GTA Stat Bars
function StatBar({ label, value, color = "#cc9933" }: { label: string, value: number, color?: string }) {
  const barRef = useRef<HTMLDivElement>(null);
  
  // Smooth fill animation for stats
  useGSAP(() => {
    if (barRef.current) {
      gsap.fromTo(barRef.current, 
        { width: "0%" },
        { 
          width: `${value}%`, duration: 1.2, ease: "power3.out", delay: 0.1,
          force3D: true,
          onStart: () => gsap.set(barRef.current, { willChange: "transform, opacity" }),
          onComplete: () => gsap.set(barRef.current, { willChange: "auto" })
        }
      );
    }
  }, { dependencies: [value] });

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
