"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

export interface AnimatedVideoPlayerProps {
  webmSrc: string;
  mp4Src: string;
  poster?: string;
  className?: string;
}

export interface AnimatedVideoPlayerRef {
  play: () => void;
  pause: () => void;
}

const AnimatedVideoPlayer = forwardRef<AnimatedVideoPlayerRef, AnimatedVideoPlayerProps>(
  ({ webmSrc, mp4Src, poster, className = "" }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useImperativeHandle(ref, () => ({
      play: () => {
        if (videoRef.current) {
          // Play returns a promise, we catch it to prevent uncaught exceptions if interrupted
          videoRef.current.play().catch(() => {
            console.log("Video playback was interrupted or not allowed.");
          });
        }
      },
      pause: () => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      }
    }));

    return (
      <div className={`relative border-4 border-black overflow-hidden bg-black ${className}`}>
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          autoPlay={false}
          preload="none" // Optimizes performance by not downloading until needed
          poster={poster}
          className="w-full h-full object-cover will-change-transform"
        >
          <source src={webmSrc} type="video/webm" />
          <source src={mp4Src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Subtle CSS noise/grain overlay for gritty GTA IV aesthetic */}
        <div className="absolute inset-0 gta-noise opacity-30 mix-blend-overlay pointer-events-none" />
      </div>
    );
  }
);

AnimatedVideoPlayer.displayName = "AnimatedVideoPlayer";

export default AnimatedVideoPlayer;
