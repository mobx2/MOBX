"use client";

import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Smooth scroll wrapper could be added here (like Lenis) for an even better experience, 
  // but for GSAP ScrollTrigger out of the box, we just render the sections.

  useEffect(() => {
    // Prevent scrolling while loader is active
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      window.scrollTo(0, 0);
    }
  }, [loading]);

  return (
    <main className="bg-brand-black min-h-screen selection:bg-brand-magenta selection:text-brand-white">
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      <div 
        className="w-full relative" 
        style={{ visibility: loading ? "hidden" : "visible" }}
      >
        <Hero />
        <Projects />
        <Marquee />
        <About />
        <Contact />
      </div>
    </main>
  );
}
