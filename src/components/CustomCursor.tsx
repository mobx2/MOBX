"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorOutline = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursorDot.current || !cursorOutline.current) return;

    // We use GSAP quickTo for maximum performance cursor tracking (bypasses standard timeline overhead)
    const xMoveDot = gsap.quickTo(cursorDot.current, "x", { duration: 0.05, ease: "power3.out" });
    const yMoveDot = gsap.quickTo(cursorDot.current, "y", { duration: 0.05, ease: "power3.out" });
    
    const xMoveOutline = gsap.quickTo(cursorOutline.current, "x", { duration: 0.25, ease: "power3.out" });
    const yMoveOutline = gsap.quickTo(cursorOutline.current, "y", { duration: 0.25, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      // Center the cursor
      xMoveDot(e.clientX - 4);
      yMoveDot(e.clientY - 4);
      
      xMoveOutline(e.clientX - 20);
      yMoveOutline(e.clientY - 20);
    };

    // Scale up on clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a") || target.closest("button") || target.closest(".project-card")) {
        gsap.to(cursorOutline.current, {
          scale: 2.5,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          duration: 0.3,
        });
        gsap.to(cursorDot.current, {
          scale: 0,
          duration: 0.3,
        });
      }
    };

    const handleMouseOut = () => {
      gsap.to(cursorOutline.current, {
        scale: 1,
        backgroundColor: "transparent",
        duration: 0.3,
      });
      gsap.to(cursorDot.current, {
        scale: 1,
        duration: 0.3,
      });
    };

    const handleMouseDown = () => {
      gsap.to(cursorOutline.current, { scale: 0.8, duration: 0.1 });
    };

    const handleMouseUp = () => {
      gsap.to(cursorOutline.current, { scale: 1, duration: 0.1 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorDot} 
        className="fixed top-0 left-0 w-2 h-2 bg-brand-white rounded-full pointer-events-none z-[100] mix-blend-difference will-change-transform gpu-accelerated hidden md:block"
      />
      <div 
        ref={cursorOutline} 
        className="fixed top-0 left-0 w-10 h-10 border-[1.5px] border-brand-white rounded-full pointer-events-none z-[100] mix-blend-difference will-change-transform gpu-accelerated hidden md:flex items-center justify-center opacity-80"
      >
        {/* Crosshair Ticks */}
        <div className="absolute top-[-4px] w-[2px] h-[6px] bg-brand-white" />
        <div className="absolute bottom-[-4px] w-[2px] h-[6px] bg-brand-white" />
        <div className="absolute left-[-4px] w-[6px] h-[2px] bg-brand-white" />
        <div className="absolute right-[-4px] w-[6px] h-[2px] bg-brand-white" />
      </div>
    </>
  );
}
