"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const SLIDES = [
  {
    id: 1,
    title: "THE DEVELOPER",
    bg: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070",
    fg: "/ibraheem.png",
  },
  {
    id: 2,
    title: "THE ARTIST",
    bg: "https://images.unsplash.com/photo-1478809846157-ec82fa6ce4ab?q=80&w=2070",
    fg: "https://images.unsplash.com/photo-1552168324-d612d77725e3?q=80&w=1936",
  }
];

export default function HeroSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgsRef = useRef<(HTMLDivElement | null)[]>([]);
  const fgsRef = useRef<(HTMLDivElement | null)[]>([]);
  const textsRef = useRef<(HTMLHeadingElement | null)[]>([]);

  useGSAP(() => {
    // Scroll Velocity Skewing (The Grime Effect)
    const proxy = { skew: 0 };
    const skewSetter = gsap.quickSetter(fgsRef.current, "skewY", "deg");
    const clamp = gsap.utils.clamp(-20, 20);
    
    ScrollTrigger.create({
      onUpdate: (self) => {
        const skew = clamp(self.getVelocity() / -100);
        // Only do something if the skew is more than 1 degree to avoid micro-updates
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)",
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew)
          });
        }
      }
    });

    // Master Pinned Scroll Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: "top top",
        end: "+=3000", // Force 3000px of scrolling to complete the sequence
        scrub: 1.5,    // Buttery smooth trailing inertia
      }
    });

    // Initial state setup
    gsap.set(slidesRef.current[0], { zIndex: 10, autoAlpha: 1 });
    gsap.set(slidesRef.current[1], { zIndex: 1, autoAlpha: 0 });

    // SLIDE 1: Deep Parallax while pinned
    tl.to(bgsRef.current[0], { scale: 1.3, yPercent: 20, ease: "none" }, 0)
      .to(fgsRef.current[0], { scale: 1.1, yPercent: 10, ease: "none" }, 0)
      .to(textsRef.current[0], { yPercent: -50, ease: "none" }, 0);

    // VIOLENT TRANSITION to SLIDE 2
    tl.to(slidesRef.current[1], { autoAlpha: 1, zIndex: 20, duration: 0.1 }, 1)
      .fromTo(bgsRef.current[1], 
        { scale: 2, filter: "brightness(2) sepia(100%)" }, 
        { scale: 1, filter: "brightness(0.6) sepia(80%) hue-rotate(5deg) saturate(150%) contrast(150%)", duration: 1, ease: "expo.out" }, 
      )
      .fromTo(fgsRef.current[1],
        { yPercent: 100, scale: 1.5 },
        { yPercent: 0, scale: 1, duration: 1, ease: "power4.out" },
        1
      );

    // Staggered Text Slam for Slide 2
    const slide2Chars = textsRef.current[1]?.querySelectorAll(".char");
    if (slide2Chars) {
      tl.fromTo(slide2Chars,
        { scale: 4, opacity: 0, z: 500, rotateX: -90 },
        { 
          scale: 1, opacity: 1, z: 0, rotateX: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: "expo.out"
        },
        1.2
      );
    }

    // SLIDE 2: Deep Parallax exit
    tl.to(bgsRef.current[1], { scale: 1.2, yPercent: 10, ease: "none" }, 2)
      .to(fgsRef.current[1], { yPercent: -10, ease: "none" }, 2)
      .to(textsRef.current[1], { yPercent: -30, ease: "none" }, 2);

    // Intro Text Slam for Slide 1 (On Page Load, not scroll)
    const slide1Chars = textsRef.current[0]?.querySelectorAll(".char");
    if (slide1Chars) {
      gsap.fromTo(slide1Chars,
        { scale: 3, opacity: 0, y: 100 },
        {
          scale: 1, opacity: 1, y: 0,
          stagger: 0.05,
          duration: 1.2,
          ease: "expo.out",
          delay: 0.5
        }
      );
    }

  }, { scope: containerRef });

  // Helper to split text into characters for staggering
  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char inline-block will-change-transform">{char === " " ? "\u00A0" : char}</span>
    ));
  };

  return (
    <section ref={containerRef} className="level-section relative w-full h-screen overflow-hidden bg-gta-black">
      
      {/* Global Noise & Vignette */}
      <div className="absolute inset-0 gta-noise z-50" />
      <div className="absolute inset-0 gta-vignette z-40" />

      {SLIDES.map((slide, i) => (
        <div 
          key={slide.id} 
          ref={el => { slidesRef.current[i] = el }}
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ opacity: i === 0 ? 1 : 0 }}
        >
          {/* Layer 1: Background Scene (Sepia / Gritty) */}
          <div 
            ref={el => { bgsRef.current[i] = el }}
            className="absolute inset-[-10%] w-[120%] h-[120%] bg-cover bg-center will-change-transform origin-center"
            style={{ 
              backgroundImage: `url('${slide.bg}')`,
              filter: 'sepia(80%) hue-rotate(5deg) saturate(150%) contrast(150%) brightness(0.6)'
            }}
          />

          {/* Layer 2: Foreground Cutout */}
          <div 
            ref={el => { fgsRef.current[i] = el }}
            className="absolute bottom-0 right-[5%] w-[60%] h-[100%] bg-contain bg-no-repeat bg-bottom z-10 will-change-transform drop-shadow-[20px_20px_0px_#050505] origin-bottom"
            style={{ 
              backgroundImage: `url('${slide.fg}')`,
              filter: 'sepia(40%) contrast(120%) brightness(0.8)'
            }}
          />

          {/* Layer 3: Bold Typography */}
          <div className="absolute inset-0 flex items-center justify-start pl-8 md:pl-24 z-20 pointer-events-none">
            <h1 
              ref={el => { textsRef.current[i] = el }}
              className="text-[12vw] gta-title leading-[0.85] text-gta-sepia will-change-transform perspective-1000"
            >
              {slide.title.split(" ").map((word, wIndex) => (
                <span key={wIndex} className="block overflow-hidden pb-4">
                  {splitText(word)}
                </span>
              ))}
            </h1>
          </div>
        </div>
      ))}
      
      {/* Global Foreground Marquee */}
      <div className="absolute top-[10%] left-0 w-[200vw] flex overflow-hidden z-[15] opacity-30 pointer-events-none mix-blend-overlay">
        <div className="flex gap-8 whitespace-nowrap animate-marquee">
          {[...Array(6)].map((_, idx) => (
            <span key={idx} className="gta-title text-[150px] text-stroke tracking-widest uppercase">
              HIGHLY CLASSIFIED // LCPD DATABASE // 
            </span>
          ))}
        </div>
      </div>
      
      {/* Police Sirens */}
      <div className="absolute inset-0 z-[15] pointer-events-none mix-blend-screen opacity-60">
        <div className="absolute inset-0 siren-red animate-siren" />
        <div className="absolute inset-0 siren-blue animate-siren" style={{ animationDelay: "1s" }} />
      </div>
      
    </section>
  );
}
