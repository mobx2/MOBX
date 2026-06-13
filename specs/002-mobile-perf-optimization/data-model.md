# Data Model: Mobile Performance Optimization

Since this feature revolves entirely around performance refactoring, there are no new database schemas or persistent data models introduced.

## Core Component States

1. **Video Player State**
   - **`isInView` (boolean)**: Managed by `IntersectionObserver`. When false, the `<video>` element's `src` attribute is actively removed from the DOM to force VRAM garbage collection.

2. **GSAP Context Lifecycle**
   - **`ctx` (gsap.Context)**: Every React component utilizing GSAP must encapsulate tweens within a `gsap.context()` to ensure seamless cleanup (`ctx.revert()`) on unmount.

3. **Performance Flags (Ephemeral)**
   - **`willChange`**: Dynamically toggled between `"transform, opacity"` (during `onStart`) and `"auto"` (during `onComplete`).
