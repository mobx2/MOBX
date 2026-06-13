"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip, useGSAP);
  
  // Aggressive GSAP Timeline Freezing & Throttling
  ScrollTrigger.config({ 
    limitCallbacks: true, 
    ignoreMobileResize: true 
  });
  
  // Drop frames gracefully to prevent CPU melting
  gsap.ticker.lagSmoothing(1000, 16);
}

export { gsap, ScrollTrigger, Flip, useGSAP };
