"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const PROJECTS = [
  {
    id: 1,
    title: "PROJECT ZERO",
    tags: ["WEBGL", "AWWWARDS", "CREATIVE"],
    color: "#ff3300",
  },
  {
    id: 2,
    title: "NEON VOID",
    tags: ["NEXT.JS", "GSAP", "BRUTALIST"],
    color: "#0033ff",
  },
  {
    id: 3,
    title: "ACID DREAMS",
    tags: ["THREE.JS", "SHADERS", "EXPERIENCE"],
    color: "#ccff00",
  }
];

export default function Projects() {
  const container = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const projectColor = PROJECTS[index].color;
      const innerWrapper = card.querySelector('.inner-parallax');
      const titleWrapper = card.querySelector('.project-title-wrapper');
      const title = card.querySelector('.project-title');
      const tags = card.querySelectorAll('.project-tag');

      // 1. Harsh Mask Reveal on Enter
      gsap.fromTo(card, 
        { clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)" },
        { 
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 2. Expand & Tilt Effect (Aggressive scrub)
      gsap.fromTo(card,
        {
          scale: 0.8,
          rotationZ: 5,
          opacity: 0.8,
          transformOrigin: "center center",
        },
        {
          scale: 1,
          rotationZ: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "center center",
            scrub: 1,
            onEnter: () => gsap.to(document.body, { backgroundColor: projectColor, duration: 0.8, ease: "power2.out" }),
            onEnterBack: () => gsap.to(document.body, { backgroundColor: projectColor, duration: 0.8, ease: "power2.out" })
          }
        }
      );

      // 3. Deep Layer Parallax (Image)
      gsap.fromTo(innerWrapper, 
        { scale: 1.2, yPercent: -20 },
        {
          scale: 1,
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      // 4. Premium Text Reveal (Slide up from mask)
      gsap.fromTo(title,
        { y: "150%", rotationZ: 10 },
        {
          y: "0%",
          rotationZ: 0,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: card,
            start: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Deep parallax on the title wrapper itself
      gsap.fromTo(titleWrapper,
        { y: 150 },
        {
          y: -150,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          }
        }
      );

      gsap.fromTo(tags,
        { y: 50, opacity: 0 },
        {
          y: -50,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: card,
            start: "top 60%",
            end: "bottom top",
            scrub: 2,
          }
        }
      );
    });

    ScrollTrigger.create({
      trigger: container.current,
      start: "top bottom",
      end: "bottom top",
      onLeave: () => gsap.to(document.body, { backgroundColor: "#000000", duration: 0.8 }),
      onLeaveBack: () => gsap.to(document.body, { backgroundColor: "#000000", duration: 0.8 })
    });

  }, { scope: container });

  return (
    <section ref={container} className="w-full relative z-20 pb-32">
      {PROJECTS.map((project, i) => (
        <div 
          key={project.id}
          className="h-screen w-full flex items-center justify-center sticky top-0"
        >
          <div 
            ref={(el) => { cardsRef.current[i] = el; }}
            className="project-card relative w-[90vw] h-[85vh] overflow-hidden rounded-[40px] bg-brand-black shadow-2xl gpu-accelerated transform-style-3d cursor-none"
            style={{ border: `1px solid rgba(255,255,255,0.05)` }}
          >
            <div className="inner-parallax absolute inset-[-20%] w-[140%] h-[140%] bg-neutral-900 will-change-transform">
              {/* IMAGE PLACEHOLDER */}
              <div className="absolute inset-0 opacity-60 bg-[url('https://picsum.photos/1920/1080')] bg-cover bg-center mix-blend-overlay transition-opacity duration-500 hover:opacity-100" />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4">
              <div className="project-title-wrapper overflow-hidden pb-4">
                <h2 className="project-title text-[9vw] brutalist-text text-brand-white mix-blend-difference drop-shadow-2xl text-center will-change-transform transform-origin-bottom">
                  {project.title}
                </h2>
              </div>
              <div className="flex gap-4 mt-4 mix-blend-difference">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-tag px-8 py-3 border border-brand-white text-brand-white text-xl rounded-full uppercase tracking-widest font-bold backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
