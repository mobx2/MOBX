"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const PROJECTS = [
  {
    id: 1,
    title: "Project Zero",
    tags: ["WebGL", "Awwwards", "Creative"],
    color: "#ff3300",
  },
  {
    id: 2,
    title: "Neon Void",
    tags: ["Next.js", "GSAP", "Brutalist"],
    color: "#0033ff",
  },
  {
    id: 3,
    title: "Acid Dreams",
    tags: ["Three.js", "Shaders", "Experience"],
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
      const title = card.querySelector('.project-title');
      const tags = card.querySelector('.project-tags');

      // Expand & Tilt Effect (Simulating Flip behavior with pure ScrollTrigger for perfect scrub)
      // Starts small & tilted, expands to fill screen
      gsap.fromTo(card,
        {
          scale: 0.5,
          rotationZ: 10,
          rotationX: 20,
          opacity: 0.5,
          transformOrigin: "center center",
        },
        {
          scale: 1,
          rotationZ: 0,
          rotationX: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "center center",
            scrub: 1,
            onEnter: () => {
              gsap.to(document.body, { backgroundColor: projectColor, duration: 0.8, ease: "power2.out" });
            },
            onEnterBack: () => {
              gsap.to(document.body, { backgroundColor: projectColor, duration: 0.8, ease: "power2.out" });
            }
          }
        }
      );

      // Deep Layer Parallax inside the card
      gsap.to(innerWrapper, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      gsap.fromTo(title,
        { y: 100 },
        {
          y: -100,
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
        { y: -50 },
        {
          y: 50,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          }
        }
      );
    });

    // Reset background to black when leaving projects section
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
          {/* 
            PLACEHOLDER ASSETS:
            Replace the 'bg-brand-black' below with your project images.
            Example: <img src="/project-1.jpg" className="absolute inset-0 w-full h-full object-cover" />
          */}
          <div 
            ref={(el) => { cardsRef.current[i] = el; }}
            className="relative w-[90vw] h-[80vh] overflow-hidden rounded-3xl bg-brand-black shadow-2xl gpu-accelerated transform-style-3d"
            style={{ border: `1px solid rgba(255,255,255,0.1)` }}
          >
            <div className="inner-parallax absolute inset-[-20%] w-[140%] h-[140%] bg-neutral-900">
              {/* IMAGE PLACEHOLDER: Inject high-end photography here */}
              <div className="absolute inset-0 opacity-40 bg-[url('https://picsum.photos/1920/1080')] bg-cover bg-center mix-blend-overlay" />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
              <h2 className="project-title text-[8vw] brutalist-text text-brand-white mix-blend-difference drop-shadow-2xl text-center">
                {project.title}
              </h2>
              <div className="project-tags flex gap-4 mt-8 mix-blend-difference">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-6 py-2 border border-brand-white text-brand-white text-xl rounded-full uppercase tracking-widest font-bold">
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
