# Phase 0: Research

## Unknowns Resolved

1. **How to efficiently apply `will-change` dynamically?**
   - **Decision**: Use GSAP `onStart` to add `willChange: 'transform, opacity'` and `onComplete` to reset it to `auto` or remove it.
   - **Rationale**: Applying `will-change` globally exhausts GPU memory on low-end devices. Toggling it only during active tweens saves VRAM while ensuring smoothness.
   - **Alternatives considered**: Leaving `will-change` on permanently (causes out-of-memory crashes on mobile).

2. **How to completely remove video elements from the rendering pipeline?**
   - **Decision**: Use `IntersectionObserver` to detect when a video is 10% out of the viewport. Pause the video, execute `removeAttribute('src')`, and optionally call `.load()` to clear the buffer. Restore the `src` when it enters the viewport.
   - **Rationale**: Standard `display: none` or `visibility: hidden` does not release the video buffer from active memory on mobile browsers. Removing the source attribute forces the browser to discard the media data.
   - **Alternatives considered**: Unmounting the React component entirely (rejected as it causes larger React tree reconciliations).

3. **How to enforce CSS Containment?**
   - **Decision**: Apply `contain: strict` (or `contain: layout paint` if dimensions are dynamic) via inline styles or Tailwind classes to animated wrapper components (like the LCPD terminal).
   - **Rationale**: Prevents layout thrashing by isolating DOM nodes. Browser repaints inside the container will not trigger reflows in the rest of the application.
   - **Alternatives considered**: `transform: translateZ(0)` (which forces a new layer but doesn't stop layout recalculations).
