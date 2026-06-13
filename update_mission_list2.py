import re

with open('src/components/MissionList.tsx', 'r') as f:
    content = f.read()

# 1. Remove auth requirement by setting default to true
content = content.replace("const [isAuthenticated, setIsAuthenticated] = useState(false);", "const [isAuthenticated, setIsAuthenticated] = useState(true);")

# 2. Make image clickable
target_img = """                    <img 
                      src={encodeURI(`/${activeMissionData.images[0]}`)}
                      alt={activeMissionData.title}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-10"
                      style={{ filter: 'grayscale(30%) contrast(120%) brightness(0.9) sepia(20%)' }}
                    />"""

replacement_img = """                    <img 
                      src={encodeURI(`/${activeMissionData.images[0]}`)}
                      alt={activeMissionData.title}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-10 cursor-pointer"
                      style={{ filter: 'grayscale(30%) contrast(120%) brightness(0.9) sepia(20%)' }}
                      onClick={() => {
                        const missionIndex = visibleItems[activeIndex]?.type === 'MISSION' 
                          ? visibleItems[activeIndex].index 
                          : visibleItems[activeIndex]?.missionIndex ?? 0;
                        setFullScreenState({ missionIndex, imageIndex: 0 });
                        playHoverSound();
                      }}
                    />"""

if target_img in content:
    content = content.replace(target_img, replacement_img)
else:
    print("WARNING: target_img not found")

# 3. Replace bottom flip buttons with side arrows
target_flip = """            <div className="absolute bottom-4 md:bottom-8 w-full px-4 text-white font-gta-hud tracking-widest text-sm md:text-xl z-50 flex justify-between md:justify-center items-center md:gap-8 pointer-events-auto">
              <button className="animate-pulse px-3 py-2 md:px-0 bg-black/80 md:bg-transparent border border-white/30 md:border-none rounded active:bg-white/20" onClick={(e) => { e.stopPropagation(); setFullScreenState(prev => { if (!prev) return null; const images = MISSIONS[prev.missionIndex].images; return { ...prev, imageIndex: (prev.imageIndex - 1 + images.length) % images.length }; }); playHoverSound(); }}>◀ FLIP</button>
              <span onClick={(e) => e.stopPropagation()} className="bg-black/50 px-2 py-1 rounded">IMAGE {fullScreenState.imageIndex + 1} OF {MISSIONS[fullScreenState.missionIndex].images.length}</span>
              <button className="animate-pulse px-3 py-2 md:px-0 bg-black/80 md:bg-transparent border border-white/30 md:border-none rounded active:bg-white/20" onClick={(e) => { e.stopPropagation(); setFullScreenState(prev => { if (!prev) return null; const images = MISSIONS[prev.missionIndex].images; return { ...prev, imageIndex: (prev.imageIndex + 1) % images.length }; }); playHoverSound(); }}>FLIP ▶</button>
            </div>"""

replacement_flip = """            <div className="absolute bottom-4 md:bottom-8 w-full flex justify-center text-white font-gta-hud tracking-widest text-sm md:text-xl z-50 pointer-events-auto">
              <span onClick={(e) => e.stopPropagation()} className="bg-black/50 px-4 py-2 rounded">IMAGE {fullScreenState.imageIndex + 1} OF {MISSIONS[fullScreenState.missionIndex].images.length}</span>
            </div>

            {/* FLIP LEFT BUTTON */}
            <button 
              className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-50 p-4 md:p-8 text-[#ffcc00] text-4xl md:text-6xl animate-pulse hover:scale-110 active:scale-95 transition-transform drop-shadow-[4px_4px_0_#000] pointer-events-auto"
              onClick={(e) => {
                e.stopPropagation();
                setFullScreenState(prev => {
                  if (!prev) return null;
                  const images = MISSIONS[prev.missionIndex].images;
                  return { ...prev, imageIndex: (prev.imageIndex - 1 + images.length) % images.length };
                });
                playHoverSound();
              }}
            >
              ◀
            </button>

            {/* FLIP RIGHT BUTTON */}
            <button 
              className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-50 p-4 md:p-8 text-[#ffcc00] text-4xl md:text-6xl animate-pulse hover:scale-110 active:scale-95 transition-transform drop-shadow-[4px_4px_0_#000] pointer-events-auto"
              onClick={(e) => {
                e.stopPropagation();
                setFullScreenState(prev => {
                  if (!prev) return null;
                  const images = MISSIONS[prev.missionIndex].images;
                  return { ...prev, imageIndex: (prev.imageIndex + 1) % images.length };
                });
                playHoverSound();
              }}
            >
              ▶
            </button>"""

if target_flip in content:
    content = content.replace(target_flip, replacement_flip)
else:
    print("WARNING: target_flip not found")

with open('src/components/MissionList.tsx', 'w') as f:
    f.write(content)

print("Done")
