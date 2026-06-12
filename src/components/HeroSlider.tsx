"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const SLIDES = [
  {
    id: 1,
    title: "IBRAHEEM SHAHEEN",
    bg: "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?q=80&w=2070", // Wide city skyline at night
    fg: "/ibraheem.png",
  },
  {
    id: 2,
    title: "FRONT-END DEVELOPER",
    bg: "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2070", // Wide urban street view
    fg: "/fg2.png",
  },
  {
    id: 3,
    title: "REACT|NEXT",
    bg: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070", // Wide aerial city intersection
    fg: "/fg3.png",
  }
];

export default function HeroSlider() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      let { isMobile } = context.conditions as { isDesktop: boolean, isMobile: boolean };

      // Master Pinned Scroll Timeline for sequencing multiple slides
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: `+=${SLIDES.length * (isMobile ? 600 : 1000)}`, // Shorter scroll distance on mobile
          scrub: isMobile ? 0.5 : 1.5, // Faster scrub response on mobile to prevent jitter
        }
      });

      const slides = gsap.utils.toArray('.hero-slide') as HTMLElement[];

      slides.forEach((slide: HTMLElement, index) => {
        const bg = slide.querySelector('.hero-bg');
        const fg = slide.querySelector('.hero-fg');
        const text = slide.querySelector('.hero-text');
        const crosshair = slide.querySelector('.hero-crosshair');

        // 1. Fade transition to prevent any horizontal layout shifts
        if (index > 0) {
          tl.to(slides[index - 1], { autoAlpha: 0, duration: 1, ease: "power2.inOut" }, `slide${index}`);
          tl.fromTo(slide, { autoAlpha: 0, scale: isMobile ? 1.05 : 1.1 }, { autoAlpha: 1, scale: 1, duration: 1, ease: "power2.out" }, `slide${index}`);
        } else {
          tl.addLabel(`slide${index}`);
        }

        // 2. Zoom background slowly over the duration of this slide
        if (bg) {
          tl.to(bg, { scale: isMobile ? 1.05 : 1.2, ease: "none", duration: 2.5 }, `slide${index}`);
        }

        // 3. Move/Scale foreground slightly differently for parallax
        if (fg) {
          tl.to(fg, { scale: isMobile ? 1.02 : 1.05, ease: "none", duration: 2 }, `slide${index}`);
        }

        // 4. Animate Text (fade in from bottom, then fade out up)
        if (text) {
          tl.fromTo(text, 
            { y: isMobile ? 20 : 50, autoAlpha: 0 }, 
            { y: 0, autoAlpha: 1, duration: 0.4, ease: "power2.out" }, 
            `slide${index}+=0.2`
          );
          tl.to(text, { y: isMobile ? -20 : -50, autoAlpha: 0, duration: 0.4, ease: "power2.in" }, `slide${index}+=1.4`);
        }

        // 5. Crosshair pulse & scale on the first slide
        if (crosshair) {
          tl.to(crosshair, { scale: isMobile ? 2 : 5, autoAlpha: 0, duration: 0.5, ease: "power3.in" }, `slide${index}+=1.5`);
        }
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char inline-block will-change-transform">{char === " " ? "\u00A0" : char}</span>
    ));
  };

  return (
    <section ref={containerRef} className="level-section relative w-full h-screen overflow-hidden bg-gta-black">
      
      {/* Global Noise & Vignette & CRT */}
      <div className="absolute inset-0 gta-noise z-50 pointer-events-none" />
      <div className="absolute inset-0 gta-vignette z-40 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-[45] animate-crt-scroll" />

      {/* Slider Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {SLIDES.map((slide, idx) => (
          <div 
            key={slide.id} 
            className="hero-slide absolute inset-0 w-full h-full will-change-transform"
            style={{ 
              opacity: idx === 0 ? 1 : 0, 
              visibility: idx === 0 ? 'visible' : 'hidden'
            }}
          >
            {/* Background */}
            <div 
              className="hero-bg absolute inset-[-10%] w-[120%] h-[120%] bg-cover bg-center will-change-transform origin-center"
              style={{ 
                backgroundImage: `url('${slide.bg}')`,
                filter: 'sepia(80%) hue-rotate(5deg) saturate(150%) contrast(150%) brightness(0.6)'
              }}
            />

            {/* Custom Police Strobe Animation */}
            {idx === 0 && (
              <style>{`
                @keyframes cop-red {
                  0%, 49% { opacity: 1; }
                  50%, 100% { opacity: 0; }
                }
                @keyframes cop-blue {
                  0%, 49% { opacity: 0; }
                  50%, 100% { opacity: 1; }
                }
                .animate-cop-red { animation: cop-red 1.2s infinite; }
                .animate-cop-blue { animation: cop-blue 1.2s infinite; }
              `}</style>
            )}

            {/* Layer 1.5: Police Sirens */}
            <div className="absolute inset-0 z-[5] pointer-events-none mix-blend-screen opacity-90">
              <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_left,rgba(255,0,0,0.8)_0%,transparent_50%)] animate-cop-red" />
              <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_right,rgba(0,100,255,1)_0%,transparent_50%)] animate-cop-blue" />
            </div>

            {/* Foreground Cutout */}
            {slide.fg && (
              <div className="absolute inset-0 flex justify-center items-end z-10 pointer-events-none">
                <div 
                  className="hero-fg flex-shrink-0 bg-contain bg-no-repeat bg-bottom will-change-transform drop-shadow-[20px_20px_0px_#050505] origin-bottom pointer-events-auto w-[250%] md:w-[60%] h-[95%] md:h-[100%]"
                  style={{ 
                    backgroundImage: `url('${slide.fg}')`,
                    filter: 'sepia(40%) contrast(120%) brightness(0.8)'
                  }}
                >
                  {/* Crosshair (Only for first slide to avoid duplication clashing) */}
                  {idx === 0 && (
                    <div className="hero-crosshair absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-[3px] border-[#cc9933] rounded-full flex items-center justify-center opacity-80 z-20 will-change-transform mix-blend-screen">
                      <div className="w-2 h-2 bg-[#cc9933] rounded-full animate-pulse" />
                      <div className="absolute top-1/2 left-[-15px] w-5 h-[3px] bg-[#cc9933]" />
                      <div className="absolute top-1/2 right-[-15px] w-5 h-[3px] bg-[#cc9933]" />
                      <div className="absolute left-1/2 top-[-15px] w-[3px] h-5 bg-[#cc9933]" />
                      <div className="absolute left-1/2 bottom-[-15px] w-[3px] h-5 bg-[#cc9933]" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Bold Typography */}
            <div className="absolute inset-0 flex items-start md:items-center justify-center md:justify-start pt-32 sm:pt-40 md:pt-0 pl-0 md:pl-24 z-30 pointer-events-none w-full">
              <h1 className="hero-text text-[14vw] sm:text-[12vw] md:text-[8vw] text-center md:text-left gta-title leading-[0.85] text-gta-sepia will-change-transform perspective-1000 drop-shadow-2xl">
                {slide.title.split(" ").map((word, wIndex) => (
                  <span key={wIndex} className="block overflow-hidden pb-2 md:pb-4">
                    {splitText(word)}
                  </span>
                ))}
              </h1>
            </div>
          </div>
        ))}
      </div>
      
      {/* Global Foreground Marquee */}
      <div className="absolute top-[10%] md:top-[10%] left-0 w-[200vw] flex overflow-hidden z-[15] opacity-30 pointer-events-none mix-blend-overlay">
        <div className="flex gap-4 md:gap-8 whitespace-nowrap animate-marquee">
          {[...Array(6)].map((_, idx) => (
            <span key={idx} className="gta-diploma text-[50px] md:text-[100px] text-stroke tracking-widest uppercase opacity-80">
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
