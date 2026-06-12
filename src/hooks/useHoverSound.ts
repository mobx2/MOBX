"use client";

import { useCallback, useEffect, useState } from "react";

// Global mute state shared across all hook instances
let globalIsMuted = false;
const listeners = new Set<(muted: boolean) => void>();

export const toggleGlobalMute = () => {
  globalIsMuted = !globalIsMuted;
  listeners.forEach((listener) => listener(globalIsMuted));
};

export function useHoverSound(soundPath: string = "/justsomesounds-click-sound-432501.mp3") {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(globalIsMuted);

  useEffect(() => {
    // Only instantiate HTMLAudioElement on the client side
    if (typeof window !== "undefined") {
      const audioEl = new Audio(soundPath);
      audioEl.volume = 1.0; // MAX Volume (Browser Limit)
      setAudio(audioEl);
    }

    const handleMuteChange = (muted: boolean) => setIsMuted(muted);
    listeners.add(handleMuteChange);
    
    return () => {
      listeners.delete(handleMuteChange);
    };
  }, [soundPath]);

  const playHoverSound = useCallback(() => {
    if (audio && !globalIsMuted) {
      // Clone the audio node to allow true overlapping "machine-gun" firing
      const clone = audio.cloneNode() as HTMLAudioElement;
      clone.volume = audio.volume;
      clone.play().catch(() => {
        // Ignore DOMException
      });
    }
  }, [audio]);

  return { playHoverSound, isMuted, toggleMute: toggleGlobalMute };
}
