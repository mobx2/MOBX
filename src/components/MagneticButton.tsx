"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function MagneticButton({ children, className, ...props }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Extreme magnetic effect
    const hoverEffect = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Magnetic pull (radius can be large since it's checked by distance)
      gsap.to(button, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    const resetEffect = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)",
      });
    };

    button.addEventListener("mousemove", hoverEffect);
    button.addEventListener("mouseleave", resetEffect);

    return () => {
      button.removeEventListener("mousemove", hoverEffect);
      button.removeEventListener("mouseleave", resetEffect);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className={`relative rounded-full flex items-center justify-center overflow-hidden group ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-brand-white transform translate-y-[100%] rounded-full transition-transform duration-500 ease-out group-hover:translate-y-0" />
      <span className="relative z-10 transition-colors duration-500 ease-out group-hover:text-brand-black">
        {children}
      </span>
    </button>
  );
}
