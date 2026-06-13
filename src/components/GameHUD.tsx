"use client";

import { useEffect, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useHoverSound } from "@/hooks/useHoverSound";

const RADIO_STATIONS = [
  { id: 0, name: "SAN ANDREAS FM", src: "/theme.mp3" },
  { id: 1, name: "LIBERTY CITY FM", src: "/gta4.mp3" },
  { id: 2, name: "HEAD RADIO", src: "/gta3.mp3" }
];

export default function GameHUD() {
  const [missionText, setMissionText] = useState("MISSION: SURVIVE THE CITY");
  const [time, setTime] = useState("08:00");
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [currentStation, setCurrentStation] = useState(0);
  const { isMuted, toggleMute, playHoverSound } = useHoverSound();

  useEffect(() => {
    // Clock simulation
    const interval = setInterval(() => {
      const date = new Date();
      setTime(`${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`);
    }, 1000);

    const handleMusicState = (e: any) => {
      setIsMusicPlaying(e.detail.playing);
    };
    document.addEventListener('musicStateChange', handleMusicState);

    return () => {
      clearInterval(interval);
      document.removeEventListener('musicStateChange', handleMusicState);
    };
  }, []);

  useGSAP(() => {
    // Highly performant ScrollTrigger for the crosshair tracking
    const crosshair = document.getElementById("scroll-crosshair");
    if (crosshair) {
      gsap.to(crosshair, {
        top: "100%",
        ease: "none",
        force3D: true,
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

        // Move Player Icon on the Map
        const waypoints = [
          { top: 20, left: 30 }, // Hero
          { top: 40, left: 70 }, // Missions
          { top: 70, left: 40 }, // Stats
          { top: 85, left: 75 }  // Ending
        ];

        let targetTop, targetLeft;
        if (progress < 0.33) {
          const p = progress / 0.33;
          targetTop = waypoints[0].top + (waypoints[1].top - waypoints[0].top) * p;
          targetLeft = waypoints[0].left + (waypoints[1].left - waypoints[0].left) * p;
        } else if (progress < 0.66) {
          const p = (progress - 0.33) / 0.33;
          targetTop = waypoints[1].top + (waypoints[2].top - waypoints[1].top) * p;
          targetLeft = waypoints[1].left + (waypoints[2].left - waypoints[1].left) * p;
        } else {
          const p = (progress - 0.66) / 0.34;
          targetTop = waypoints[2].top + (waypoints[3].top - waypoints[2].top) * p;
          targetLeft = waypoints[2].left + (waypoints[3].left - waypoints[2].left) * p;
        }

        const playerIcon = document.getElementById('player-icon');
        if (playerIcon) {
          playerIcon.style.top = `${targetTop}%`;
          playerIcon.style.left = `${targetLeft}%`;
        }

        setMissionText((prev) => {
          if (prev !== newMission) {
            const target = document.getElementById("hud-mission-text");
            if (target) {
              gsap.fromTo(target, 
                { opacity: 0, x: -10 },
                { 
                  opacity: 1, x: 0, duration: 0.2, ease: "power4.out", force3D: true,
                  onStart: () => gsap.set(target, { willChange: "transform, opacity" }),
                  onComplete: () => gsap.set(target, { willChange: "auto" })
                }
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
    <div className="fixed inset-0 pointer-events-none z-[60] select-none contain-strict">
      
      {/* Top Left: Mission Objective & Music Player */}
      <div className="absolute top-12 left-4 md:top-8 md:left-8 flex flex-col gap-2 md:gap-6 items-start pointer-events-auto">
        <h3 id="hud-mission-text" className="gta-hud text-gta-sepia text-sm md:text-2xl drop-shadow-[2px_2px_0_#050505] pointer-events-none max-w-[200px] md:max-w-none leading-tight">
          {missionText}
        </h3>

        {/* Music Player (Slanted & Compact) */}
        <div className="flex flex-col items-stretch -skew-x-6 origin-left transform drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)] md:drop-shadow-[4px_4px_0_rgba(0,0,0,0.8)] scale-75 md:scale-100 origin-top-left">
          {/* Track Info Display */}
          <div className="bg-black/80 border-2 border-gta-black px-6 py-2 flex flex-col items-start relative overflow-hidden group cursor-pointer min-w-[220px]"
            onClick={() => {
              const audio = document.getElementById('bg-music') as HTMLAudioElement;
              if (audio) {
                if (audio.paused) {
                  audio.play();
                  document.dispatchEvent(new CustomEvent('musicStateChange', { detail: { playing: true } }));
                } else {
                  audio.pause();
                  document.dispatchEvent(new CustomEvent('musicStateChange', { detail: { playing: false } }));
                }
              }
            }}
            onMouseEnter={playHoverSound}
          >
            {/* Animated Shine Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)] -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <div className="text-[8px] text-gta-sepia font-gta-hud tracking-[0.2em] uppercase mb-1 animate-pulse">
              {isMusicPlaying ? 'NOW PLAYING' : 'RADIO STATION'}
            </div>
            <div className="font-gta-hud text-white tracking-widest text-sm drop-shadow-[2px_2px_0_#000] truncate max-w-full">
              {RADIO_STATIONS[currentStation].name}
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center gap-1 mt-[-2px] z-10 w-full">
            <button 
              onMouseEnter={playHoverSound}
              onClick={() => {
                const nextIdx = (currentStation - 1 + RADIO_STATIONS.length) % RADIO_STATIONS.length;
                setCurrentStation(nextIdx);
                const audio = document.getElementById('bg-music') as HTMLAudioElement;
                if (audio) {
                  audio.src = RADIO_STATIONS[nextIdx].src;
                  if (isMusicPlaying) audio.play();
                }
              }}
              className="bg-black/90 border-2 border-gta-black px-3 py-1 text-gray-400 hover:text-gta-sepia hover:bg-black transition-colors text-xs flex-1 text-center"
            >
              ◄
            </button>
            
            <button 
              onMouseEnter={playHoverSound}
              onClick={() => {
                const audio = document.getElementById('bg-music') as HTMLAudioElement;
                if (audio) {
                  if (audio.paused) {
                    audio.play();
                    document.dispatchEvent(new CustomEvent('musicStateChange', { detail: { playing: true } }));
                  } else {
                    audio.pause();
                    document.dispatchEvent(new CustomEvent('musicStateChange', { detail: { playing: false } }));
                  }
                }
              }}
              className={`bg-black/90 border-2 border-gta-black px-6 py-1 font-bold transition-colors text-xs flex-[2] text-center tracking-widest ${
                isMusicPlaying ? 'text-gta-sepia' : 'text-white hover:text-gta-sepia'
              }`}
            >
              {isMusicPlaying ? '❚❚ PAUSE' : '► PLAY'}
            </button>

            <button 
              onMouseEnter={playHoverSound}
              onClick={() => {
                const nextIdx = (currentStation + 1) % RADIO_STATIONS.length;
                setCurrentStation(nextIdx);
                const audio = document.getElementById('bg-music') as HTMLAudioElement;
                if (audio) {
                  audio.src = RADIO_STATIONS[nextIdx].src;
                  if (isMusicPlaying) audio.play();
                }
              }}
              className="bg-black/90 border-2 border-gta-black px-3 py-1 text-gray-400 hover:text-gta-sepia hover:bg-black transition-colors text-xs flex-1 text-center"
            >
              ►
            </button>
          </div>
        </div>
      </div>

      {/* Top Right: Money, Weapon, Stars */}
      <div className="absolute top-12 right-4 md:top-8 md:right-8 flex flex-col items-end gap-1 md:gap-2">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="gta-hud text-gta-green text-lg md:text-4xl drop-shadow-[2px_2px_0_#050505]">$99,999,999</div>
          <div className="w-8 h-8 md:w-16 md:h-16 bg-gta-black/80 border md:border-2 border-gta-black flex items-center justify-center rounded-sm">
            {/* Fake Weapon Icon: A simple pistol shape using SVG or unicode */}
            <span className="text-gta-sepia text-lg md:text-4xl transform scale-x-[-1]">🔫</span>
          </div>
        </div>
        
        {/* Wanted Stars */}
        <div className="flex gap-0.5 md:gap-1 text-gta-red text-sm md:text-2xl drop-shadow-[2px_2px_0_#050505]">
          ★★★★★★
        </div>
        
        {/* Time */}
        <div className="gta-hud text-gta-sepia text-sm md:text-2xl drop-shadow-[2px_2px_0_#050505] mt-0.5 md:mt-1">
          {time}
        </div>
      </div>



      {/* Bottom Left: Mini Map (Interactive Navigation) */}
      <div 
        onClick={() => window.dispatchEvent(new CustomEvent('togglePauseMenu'))}
        className="absolute bottom-10 left-4 md:bottom-8 md:left-8 w-32 h-32 md:w-48 md:h-48 rounded-full border-2 md:border-[6px] border-gta-black/90 bg-gta-black/50 overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.8)] md:shadow-[0_0_20px_rgba(0,0,0,0.8)] pointer-events-auto group cursor-pointer scale-90 md:scale-100 origin-bottom-left"
      >
        {/* Map Background (Radar) */}
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074')] bg-cover bg-center opacity-40 mix-blend-screen transition-transform duration-500 group-hover:scale-110"
          style={{ filter: 'grayscale(100%) sepia(100%) hue-rotate(60deg)' }}
        />
        {/* Player Icon (Dynamic Position) */}
        <div id="player-icon" className="absolute w-4 h-4 bg-white rotate-45 border-2 border-gta-black shadow-[0_0_10px_white] z-30 transition-all duration-75 ease-out -translate-x-1/2 -translate-y-1/2" style={{ top: '20%', left: '30%' }} />
        
        {/* Radar Scanner Line */}
        <div className="absolute top-1/2 left-1/2 w-1/2 h-[2px] bg-gta-green/50 origin-left animate-[spin_4s_linear_infinite] z-0" />
        
        {/* Navigation Waypoints */}
        {/* 1. Hero */}
        <div className="absolute top-[20%] left-[30%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#cc9933] rounded-full border-2 border-gta-black shadow-[0_0_5px_#cc9933] hover:scale-150 transition-transform z-20 peer/home">
          <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white">H</span>
        </div>
        <span className="absolute top-[10%] left-[30%] -translate-x-1/2 text-[10px] font-bold text-white bg-black/80 px-1 rounded opacity-0 peer-hover/home:opacity-100 transition-opacity z-30 pointer-events-none">HOME</span>

        {/* 2. Missions */}
        <div className="absolute top-[40%] left-[70%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#ff3333] rounded-full border-2 border-gta-black shadow-[0_0_5px_#ff3333] hover:scale-150 transition-transform z-20 peer/projects">
          <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white">M</span>
        </div>
        <span className="absolute top-[30%] left-[70%] -translate-x-1/2 text-[10px] font-bold text-white bg-black/80 px-1 rounded opacity-0 peer-hover/projects:opacity-100 transition-opacity z-30 pointer-events-none">MISSIONS</span>

        {/* 3. Stats */}
        <div className="absolute top-[70%] left-[40%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#3399ff] rounded-full border-2 border-gta-black shadow-[0_0_5px_#3399ff] hover:scale-150 transition-transform z-20 peer/skills">
          <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white">S</span>
        </div>
        <span className="absolute top-[60%] left-[40%] -translate-x-1/2 text-[10px] font-bold text-white bg-black/80 px-1 rounded opacity-0 peer-hover/skills:opacity-100 transition-opacity z-30 pointer-events-none">STATS</span>
        
        {/* 4. Ending */}
        <div className="absolute top-[85%] left-[75%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#cc33ff] rounded-full border-2 border-gta-black shadow-[0_0_5px_#cc33ff] hover:scale-150 transition-transform z-20 peer/end">
          <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white">E</span>
        </div>
        <span className="absolute top-[75%] left-[75%] -translate-x-1/2 text-[10px] font-bold text-white bg-black/80 px-1 rounded opacity-0 peer-hover/end:opacity-100 transition-opacity z-30 pointer-events-none">ENDING</span>
        
        {/* Click to open menu overlay text */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-40">
          <span className="text-white font-bold tracking-widest text-sm bg-black/80 px-2 py-1 border border-white">OPEN MAP</span>
        </div>
      </div>

      {/* Action Text (Bottom Center) */}
      <div className="absolute bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 w-full px-4 pointer-events-none z-0">
        <h3 className="gta-hud text-gta-sepia/70 text-[10px] md:text-lg drop-shadow-[2px_2px_0_#050505] text-center">
          SCROLL TO NAVIGATE LIBERTY CITY
        </h3>
      </div>

      {/* Global Comms Mute Toggle (Bottom Right) */}
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 pointer-events-auto scale-75 md:scale-100 origin-bottom-right">
        <button
          onClick={toggleMute}
          onMouseEnter={playHoverSound}
          className={`border md:border-2 border-gta-black px-2 md:px-4 py-1 md:py-2 font-gta-hud text-[10px] md:text-sm tracking-widest uppercase transition-colors drop-shadow-[2px_2px_0_#050505]
            ${isMuted ? 'text-gta-red bg-black/80' : 'text-gta-sepia bg-black/60 hover:bg-black hover:text-white'}
          `}
        >
          [ {isMuted ? 'MUTED' : 'MUTE'} ]
        </button>
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
      <audio id="bg-music" src="/theme.mp3" loop />
    </div>
  );
}
