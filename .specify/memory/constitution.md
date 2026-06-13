<!-- 
Sync Impact Report:
Version change: 1.0.0 (Initial Ratification)
Added principles:
- I. Performance-First
- II. High-Fidelity Thematics
- III. Fluid Interactivity
- IV. Robust Next.js Architecture
Templates requiring updates: 
- plan-template.md (✅ updated)
- tasks-template.md (✅ updated)
-->

# MOBX PORTFOLIO Constitution

## Core Principles

### I. Performance-First
Every feature MUST prioritize performance, particularly for low-end mobile devices. Heavy animations, GSAP tweens, and media assets MUST be optimized using hardware acceleration (force3D), strict CSS containment, aggressive debouncing/throttling, and lifecycle management (IntersectionObserver for video unmounting, will-change removal post-animation) to prevent out-of-memory crashes and thread blocking.

### II. High-Fidelity Thematics
The project embraces a gritty, cinematic, GTA-inspired aesthetic. All visual components MUST adhere to the established styling (Beckett/Pricedown typography, CRT scanlines, WebGL particle systems) without degrading the layout. Visuals MUST remain intact across all devices but should gracefully fall back or simplify only if performance mandates are breached.

### III. Fluid Interactivity
Scroll-linked animations and UI responsiveness MUST feel instant. Jitter, layout thrashing, and input delay are unacceptable. All event handlers for scroll and resize MUST be rigorously throttled or debounced. Pinned section durations and parallax math MUST be tuned for mobile responsiveness as a priority.

### IV. Robust Next.js Architecture
The project adheres to the Next.js App Router paradigm. Development MUST respect the separation between Client Components and Server Components, avoiding unnecessary hydration boundaries. Server Actions and API Routes MUST securely encapsulate backend logic (e.g., Supabase authentication, database queries).

## Additional Constraints

All GSAP implementations MUST offload to the GPU using `force3D: true`.
All decorative videos MUST be unmounted or cleared using IntersectionObserver when scrolled out of view.
Typography MUST load efficiently using `next/font`.
All UI MUST respect mobile "safe areas" (notches, dynamic islands) to prevent HUD clipping.

## Development Workflow

1. Design & Specification: Identify target devices and performance constraints early.
2. Prototyping: Build animations in isolation before integrating into the scroll timeline.
3. Implementation: Apply strict CSS containment and component encapsulation.
4. Profiling: Rigorously test CPU/Memory footprint in Chrome DevTools using a 4x CPU slowdown profile before merging any UI logic.

## Governance

This Constitution supersedes all other practices for the MOBX PORTFOLIO.
Any architectural changes that risk introducing stuttering or memory leaks MUST be vetted through performance profiling.
Amendments to this document require a demonstrable improvement in either mobile optimization or thematic fidelity.

**Version**: 1.0.0 | **Ratified**: 2026-06-13 | **Last Amended**: 2026-06-13
