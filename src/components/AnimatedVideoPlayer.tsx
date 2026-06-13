"use client";

import { forwardRef, useImperativeHandle, useRef, useEffect, useState, memo } from "react";

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

const AnimatedVideoPlayer = memo(forwardRef<AnimatedVideoPlayerRef, AnimatedVideoPlayerProps>(
  ({ webmSrc, mp4Src, poster, className = "" }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          // Use requestAnimationFrame to debounce state changes
          requestAnimationFrame(() => {
            setInView(entry.isIntersecting);
          });
        },
        { rootMargin: "300px" } // Load before coming into view
      );
      
      observer.observe(el);
      return () => observer.disconnect();
    }, []);

    useImperativeHandle(ref, () => ({
      play: () => {
        if (videoRef.current) {
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
      <div 
        ref={containerRef}
        className={`relative border-4 border-black overflow-hidden bg-black contain-strict ${className}`}
        style={{ contentVisibility: 'auto', containIntrinsicSize: '100% 100%' }}
      >
        {inView ? (
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
        ) : (
          <div className="w-full h-full bg-black/50" />
        )}
        {/* Subtle CSS noise/grain overlay for gritty GTA IV aesthetic */}
        <div className="absolute inset-0 gta-noise opacity-30 mix-blend-overlay pointer-events-none" />
      </div>
    );
  }
), (prevProps, nextProps) => {
  return prevProps.webmSrc === nextProps.webmSrc && prevProps.mp4Src === nextProps.mp4Src;
});

AnimatedVideoPlayer.displayName = "AnimatedVideoPlayer";

export default AnimatedVideoPlayer;
