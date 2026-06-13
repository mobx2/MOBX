# Quickstart: Testing Mobile Performance

This guide explains how to verify the brutal performance optimizations introduced in this feature.

## 1. Setup Throttled Environment
To accurately simulate a low-end mobile device:
1. Open Chrome DevTools.
2. Go to the **Performance** tab.
3. Click the Gear icon (Capture settings).
4. Set **CPU** to `4x slowdown` (or `6x slowdown`).
5. Set **Network** to `Fast 3G`.

## 2. Verify Video Memory Management
1. Open the **Elements** panel.
2. Inspect the `<video>` tag within `AnimatedVideoPlayer`.
3. Scroll the video exactly 10% out of the viewport.
4. **Validation**: The `src` attribute MUST disappear from the DOM.
5. Scroll back into view. The `src` attribute MUST reappear and playback should resume.

## 3. Verify Layout Containment
1. Open the **Rendering** tab in Chrome DevTools (hit `Esc`, select the three dots -> Rendering).
2. Check **Paint flashing** and **Layout Shift Regions**.
3. Scroll through the page.
4. **Validation**: Animations happening inside the GSAP wrapper components MUST NOT trigger green paint flashes outside of their bounding boxes.

## 4. Verify GPU Offloading
1. Open the **Layers** panel in DevTools.
2. Observe the animated components during scroll.
3. **Validation**: They should be promoted to their own composited layers (due to `force3D: true` and temporary `will-change` properties) without exploding the total layer count when idle.
