"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import MagneticButton from "./MagneticButton";

export default function Contact() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Color Invert when scrolling into dead center
    ScrollTrigger.create({
      trigger: container.current,
      start: "center center",
      end: "bottom center",
      onEnter: () => gsap.to(container.current, { backgroundColor: "#ffffff", color: "#000000", duration: 0.6 }),
      onLeaveBack: () => gsap.to(container.current, { backgroundColor: "#000000", color: "#ffffff", duration: 0.6 }),
    });
  }, { scope: container });

  return (
    <section 
      ref={container} 
      className="w-full min-h-screen bg-brand-black text-brand-white flex flex-col items-center justify-center py-32 px-12 transition-colors duration-500 z-20 relative"
    >
      <h2 className="text-[10vw] brutalist-text mb-24 text-center leading-none">
        LET'S<br />TALK
      </h2>

      <form className="w-full max-w-3xl flex flex-col gap-16 relative z-10">
        <div className="flex flex-col gap-4 border-b border-current pb-4">
          <label className="text-sm font-bold uppercase tracking-widest opacity-50">Name</label>
          <input 
            type="text" 
            placeholder="JOHN DOE"
            className="bg-transparent text-4xl brutalist-text outline-none placeholder:opacity-20"
          />
        </div>
        
        <div className="flex flex-col gap-4 border-b border-current pb-4">
          <label className="text-sm font-bold uppercase tracking-widest opacity-50">Email</label>
          <input 
            type="email" 
            placeholder="HELLO@EXAMPLE.COM"
            className="bg-transparent text-4xl brutalist-text outline-none placeholder:opacity-20"
          />
        </div>

        <div className="flex justify-center mt-20">
          <MagneticButton className="w-80 h-80 bg-brand-accent text-brand-black text-4xl brutalist-text">
            SEND
          </MagneticButton>
        </div>
      </form>
    </section>
  );
}
