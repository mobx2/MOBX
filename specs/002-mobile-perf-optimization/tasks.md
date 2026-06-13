---
description: "Task list for Mobile Performance Optimization feature implementation"
---

# Tasks: Mobile Performance Optimization

**Input**: Design documents from `/specs/002-mobile-perf-optimization/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure for performance optimizations

- [x] T001 [P] Audit GSAP registration and configure global `ScrollTrigger.config` for limits/throttling in `src/lib/gsap.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Implement global CSS performance utility classes (e.g., `.contain-strict`, `.will-change-transform`) in `src/app/globals.css`
- [ ] T003 Ensure all target components have a proper `gsap.context()` setup to allow clean unmounting in preparation for optimizations.

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Smooth Animations on Low-End Devices (Priority: P1) 🎯 MVP

**Goal**: Force hardware acceleration, dynamic `will-change` toggling, and CSS containment across all GSAP-animated components to prevent UI jitter and GPU memory exhaustion.

**Independent Test**: Can be fully tested by loading the site on a low-end mobile device (or 4x CPU throttle in DevTools) and verifying that scroll and entrance animations maintain a stable frame rate without layout thrashing.

### Implementation for User Story 1

- [x] T004 [P] [US1] Apply `force3D: true`, `onStart` will-change injection, and `contain: strict` wrapper classes in `src/components/PauseMenu.tsx`
- [x] T005 [P] [US1] Apply `force3D: true`, `onStart` will-change injection, and `contain: strict` wrapper classes in `src/components/FinalCutscene.tsx`
- [x] T006 [P] [US1] Apply `force3D: true`, `onStart` will-change injection, and `contain: strict` wrapper classes in `src/components/BootLoader.tsx`
- [x] T007 [P] [US1] Apply `force3D: true`, `onStart` will-change injection, and `contain: strict` wrapper classes in `src/components/HeroSlider.tsx`
- [x] T008 [P] [US1] Apply `force3D: true`, `onStart` will-change injection, and `contain: strict` wrapper classes in `src/components/GameHUD.tsx`
- [x] T009 [P] [US1] Apply `force3D: true`, `onStart` will-change injection, and `contain: strict` wrapper classes in `src/components/MagneticButton.tsx`
- [x] T010 [P] [US1] Apply `force3D: true`, `onStart` will-change injection, and `contain: strict` wrapper classes in `src/components/StatsHUD.tsx`
- [x] T011 [P] [US1] Apply `force3D: true`, `onStart` will-change injection, and `contain: strict` wrapper classes in `src/components/CustomCursor.tsx`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Memory Management for Media (Priority: P1)

**Goal**: Aggressively remove out-of-viewport videos from memory to prevent low-end mobile browser crashes.

**Independent Test**: Can be tested by scrolling a video exactly 10% out of the viewport and verifying the `<video>` element's `src` attribute is removed and playback is paused.

### Implementation for User Story 2

- [x] T012 [P] [US2] Update `AnimatedVideoPlayer.tsx` to use `IntersectionObserver`. 
- [x] T013 [P] [US2] Ensure that when the video is out-of-viewport, the `src` attribute is actively cleared (`video.src = ""`) and `video.load()` is called to force memory garbage collection on low-RAM devices.
- [x] T013 [P] [US2] Add `contain: strict` to the `AnimatedVideoPlayer.tsx` root container to prevent layout thrashing during video unmounting.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Responsive Interactions Under Load (Priority: P2)

**Goal**: Aggressively throttle any window resize or scroll-linked calculation logic to prevent main thread blocking.

**Independent Test**: Can be tested by rapidly resizing the window or scrolling continuously while profiling the main thread, ensuring calculation logic fires at a restricted rate.

### Implementation for User Story 3

- [x] T014 [P] [US3] Add aggressive throttling/debouncing to scroll updates and `requestAnimationFrame` logic in `src/components/SmoothScroll.tsx`
- [x] T015 [P] [US3] Throttle rapid cursor move calculations (e.g., using GSAP's `quickTo` config or manual throttling) in `src/components/CustomCursor.tsx`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Performance Profiling & Polish

**Purpose**: Improvements that affect multiple user stories and ensure mobile performance mandates

- [x] T016 [P] Profile feature on throttled CPU (4x slowdown) using Chrome DevTools to ensure 30fps baseline.
- [x] T017 [P] Audit all modified components to ensure `gsap.context().revert()` is called on unmount.
- [x] T018 Verify `IntersectionObserver` memory clearance for media assets using the Chrome Memory profiler.
- [x] T019 Run quickstart.md validation steps manually.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - US1 (GSAP Tweens) and US2 (Video Memory) can be executed in parallel as P1 priorities.
  - US3 (Throttling) can follow as P2.
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### Parallel Opportunities

- All US1 tasks (T004 - T011) can run in parallel since they involve independent component files.
- US2 tasks (T012, T013) can run parallel to US1 tasks.
- US3 tasks (T014, T015) can run parallel to each other.

---

## Implementation Strategy

### MVP First

1. Complete Phase 1: Setup and Phase 2: Foundational
2. Complete Phase 3: User Story 1 (GSAP GPU Offloading)
3. Complete Phase 4: User Story 2 (Video Unmounting)
4. **STOP and VALIDATE**: Verify the mobile experience handles visual loads without crashing.
5. Proceed to Phase 5: User Story 3 for additional scroll/resize stability.
