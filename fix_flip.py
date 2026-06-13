import re

with open('src/components/MissionList.tsx', 'r') as f:
    lines = f.readlines()

new_lines = []
skip = False

for i, line in enumerate(lines):
    if "TAP ANYWHERE TO CLOSE" in line:
        new_lines.append(line.replace("TAP ANYWHERE TO CLOSE", "[ TAP TO CLOSE ]"))
        continue
    
    if "className=\"hidden md:inline\">[ BACKSPACE ] TO CLOSE" in line:
        # Need to fix the parent div too
        parent_idx = i - 1
        new_lines[parent_idx] = new_lines[parent_idx].replace('md:border-none">', 'md:border-none pointer-events-auto cursor-pointer" onClick={(e) => { e.stopPropagation(); setFullScreenState(null); playHoverSound(); }}>')
        new_lines.append(line)
        continue

    if "FLIP ▶" in line and "<span" in line:
        pass # handled
    elif "◀ FLIP" in line and "<span" in line:
        pass
    elif "<span>IMAGE {fullScreenState" in line:
        # replace the whole div
        new_lines.pop() # remove the div wrapper
        
        replacement = """            <div className="absolute bottom-4 md:bottom-8 w-full flex justify-center text-white font-gta-hud tracking-widest text-sm md:text-xl z-50 pointer-events-auto">
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
            </button>\n"""
        new_lines.append(replacement)
    elif "</div>" in line and "animate-pulse" in lines[i-1] and "FLIP ▶" in lines[i-1]:
        pass # skip closing div of the old flip buttons
    else:
        new_lines.append(line)

with open('src/components/MissionList.tsx', 'w') as f:
    f.writelines(new_lines)
print("Done")
