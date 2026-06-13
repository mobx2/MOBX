import re

with open('src/components/MissionList.tsx', 'r') as f:
    content = f.read()

target1 = """            <div className="absolute top-4 right-4 md:top-8 md:right-8 text-[#ffcc00] font-gta-hud tracking-widest text-sm md:text-2xl animate-pulse z-50 drop-shadow-[2px_2px_0_#000] bg-black/80 p-2 md:p-0 md:bg-transparent border border-[#ffcc00] md:border-none">
              <span className="hidden md:inline">[ BACKSPACE ] TO CLOSE</span>
              <span className="md:hidden">TAP ANYWHERE TO CLOSE</span>
            </div>"""

replacement1 = """            <div className="absolute top-4 right-4 md:top-8 md:right-8 text-[#ffcc00] font-gta-hud tracking-widest text-sm md:text-2xl animate-pulse z-50 drop-shadow-[2px_2px_0_#000] bg-black/80 p-2 md:p-0 md:bg-transparent border border-[#ffcc00] md:border-none pointer-events-auto cursor-pointer" onClick={(e) => { e.stopPropagation(); setFullScreenState(null); playHoverSound(); }}>
              <span className="hidden md:inline">[ BACKSPACE ] TO CLOSE</span>
              <span className="md:hidden">[ TAP TO CLOSE ]</span>
            </div>"""

target2 = """            <div className="absolute bottom-4 md:bottom-8 text-white font-gta-hud tracking-widest text-sm md:text-xl z-50 flex gap-4 md:gap-8">
              <span className="animate-pulse">◀ FLIP</span>
              <span>IMAGE {fullScreenState.imageIndex + 1} OF {MISSIONS[fullScreenState.missionIndex].images.length}</span>
              <span className="animate-pulse">FLIP ▶</span>
            </div>"""

replacement2 = """            <div className="absolute bottom-4 md:bottom-8 w-full px-4 text-white font-gta-hud tracking-widest text-sm md:text-xl z-50 flex justify-between md:justify-center items-center md:gap-8 pointer-events-auto">
              <button className="animate-pulse px-3 py-2 md:px-0 bg-black/80 md:bg-transparent border border-white/30 md:border-none rounded active:bg-white/20" onClick={(e) => { e.stopPropagation(); setFullScreenState(prev => { if (!prev) return null; const images = MISSIONS[prev.missionIndex].images; return { ...prev, imageIndex: (prev.imageIndex - 1 + images.length) % images.length }; }); playHoverSound(); }}>◀ FLIP</button>
              <span onClick={(e) => e.stopPropagation()} className="bg-black/50 px-2 py-1 rounded">IMAGE {fullScreenState.imageIndex + 1} OF {MISSIONS[fullScreenState.missionIndex].images.length}</span>
              <button className="animate-pulse px-3 py-2 md:px-0 bg-black/80 md:bg-transparent border border-white/30 md:border-none rounded active:bg-white/20" onClick={(e) => { e.stopPropagation(); setFullScreenState(prev => { if (!prev) return null; const images = MISSIONS[prev.missionIndex].images; return { ...prev, imageIndex: (prev.imageIndex + 1) % images.length }; }); playHoverSound(); }}>FLIP ▶</button>
            </div>"""

content = content.replace(target1, replacement1)
content = content.replace(target2, replacement2)

with open('src/components/MissionList.tsx', 'w') as f:
    f.write(content)

print("Done")
