# Changelog

All notable changes to this project will be documented in this file.

This project follows semantic versioning.

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
