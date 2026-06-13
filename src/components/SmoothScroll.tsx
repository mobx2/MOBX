"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    let frame: number;
    const throttledUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        ScrollTrigger.update();
      });
    };

    lenis.on('scroll', throttledUpdate);

    let lastTime = 0;
    const tickerUpdate = (time: number) => {
      // Throttle GSAP ticker to max 60fps execution to prevent CPU saturation
      if (time - lastTime > 0.016) {
        lenis.raf(time * 1000);
        lastTime = time;
      }
    };

    gsap.ticker.add(tickerUpdate);

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerUpdate);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <>{children}</>;
}
