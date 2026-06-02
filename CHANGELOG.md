# Changelog

All notable changes to this project will be documented in this file.

This project follows semantic versioning.

---

## [1.1.2] - 2026-06-02

### Fixed

- Reflection jank on Safari desktop — reflection container is now promoted to a GPU compositing layer via `translateZ(0)` and `will-change: transform`, eliminating per-frame rasterization of the gradient mask
- SVG reflection filter (`feTurbulence`) auto-disabled on Safari to avoid GPU stall
- Cards overflow on mobile — the component now measures its container via `ResizeObserver` and auto-scales `itemWidth`, `itemHeight`, `stackSpacing`, and `centerGap` proportionally so the carousel fits within the available width. Desktop layout is unchanged (`scale` is capped at 1).
- Division-by-zero guard added to the scale calculation when `itemWidth={0}` is passed.

---

## [1.1.1] - 2026-05-29

### Fixed

- Major mobile lag on iOS Safari/Brave caused by the SVG `feTurbulence` reflection filter — now auto-disabled on touch/narrow screens
- Mobile still renders a CSS-only mirrored reflection (gradient mask, no SVG filter, no blend mode) when `enableReflection` is on

---

## [1.1.0] - 2026-05-28

### Added

- `enableAudio` prop — procedural click sound with stereo panning and velocity sensitivity
- `reduceMotion` prop — pass `true` to disable all 3D transforms and animations, `false` to always enable them, or omit to let the OS accessibility setting decide
- SSR-safe `AudioContext` with webkit fallback

### Improved

- Smoother drag tracking during fast swipes
- Debounced wheel scroll to prevent multi-step skipping
- Drag handlers now use `scrollX.get()` instead of `springX.get()` for more accurate position tracking during fast drags
- `onIndexChange` no longer fires on initial mount

---

## [1.0.0] - 2026-05-25

### Added

- `renderImage` prop for custom image rendering in the registry component
- AI assistant dropdown for component documentation

### Improved

- Performance optimizations: `React.memo`, flattened `useTransform` chains, `useCallback`/`useMemo` on handlers, lazy image loading on non-active cards
- `AnimatePresence` replaces key-based title remount for smoother transitions
- Fixed `initialIndex` stale closure via ref
- Docs page restructured from `/get-started` into a dedicated `/docs` route

### Chore

- Added `sync:npm` script to keep npm package in sync

---

## [0.3.0] - 2026-02-15

### Changed
- Renamed `scrollSensitivity` to `scrollThreshold` for clarity.
- `scrollThreshold` now clearly represents the wheel delta required before snapping.


## [0.2.0] - 2026-02-15

### Added

- `enableScroll` prop (enabled by default) for horizontal wheel-based snapping
- `scrollSensitivity` prop (default `100`) to control wheel delta threshold before snapping

### Improved

- `/get-started` usage examples now include `enableScroll` and `scrollSensitivity`
- `/get-started` props table now documents the new scroll props and defaults
- Interactive playground now includes `enableScroll` toggle and `scrollSensitivity` slider controls

### Fixed

- Stable wheel effect dependency handling to avoid changing `useEffect` dependency array size between renders

---

## [0.1.4] - 2026-02-09

### Added

- `enableClickToSnap` prop (enabled by default)
- Click-to-snap interaction support

### Notes

- Users can disable click snapping by setting `enableClickToSnap={false}`

---

## [0.1.3] - 2026-02-03

### Improved

- Performance optimizations
- Smoother motion handling

---

## [0.1.2] - 2026-02-02

### Fixed

- Minor bugs

### Improved

- README documentation clarity

---

## [0.1.1] - 2026-02-02

### Initial Release

- Spring-based motion system
- Keyboard, touch, and drag support
- Hardware-accelerated 3D transforms
- Zero layout shift architecture
- Tailwind CSS styling
- Dark mode compatibility
- shadcn CLI and npm install support
