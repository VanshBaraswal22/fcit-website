# FCIT — Editorial Website Starter

A lightweight React + Vite frontend concept for the Fraternity of Computer Science & IT (FCIT), HBTU Kanpur.

The project is built around the FCIT gold / navy / ivory palette and uses locally stored SVG demo artwork. It contains no WebGL, Three.js, canvas rendering, video backgrounds or 3D transforms.

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
npm run preview
```

## Animation inventory

All effects are implemented with CSS and a small amount of native JavaScript / React. No animation package is required.

- **Custom pointer:** small gold dot, following ring and soft pointer halo on fine-pointer devices.
- **Magnetic buttons:** restrained 2D pointer displacement on primary calls to action.
- **Scroll progress:** thin gold progress line at the top of the viewport.
- **Scroll reveal:** IntersectionObserver-based fade / vertical reveal for content sections.
- **Hero text reveal:** staggered title-line entrance using CSS keyframes.
- **Hero artwork reveal:** clipped image entrance.
- **Subtle parallax:** small vertical image movement while scrolling on larger screens.
- **Marquee:** lightweight CSS-only horizontal message strip.
- **Image hover:** restrained 2D zoom and saturation change.
- **Navigation:** sticky header, current-section state and mobile drawer transition.
- **Gallery lightbox:** click a gallery image to view it larger; close with Escape or the close button.
- **Join dialog:** accessible frontend demo form with client-side required-field validation.

The site respects `prefers-reduced-motion`; custom cursor effects and parallax are disabled on touch-sized layouts.

## Demo content and replacement guide

The artwork in `public/images/` is intentionally illustrative SVG, not official FCIT photography. Replace it with approved FCIT / HBTU images before publishing.

| File | Intended replacement |
|---|---|
| `fcit-logo.webp` | Optimized display copy of the supplied FCIT logo |
| `fcit-logo.png` | Original supplied logo; used as the favicon source |
| `campus-architecture.svg` | Real HBTU campus / FCIT space photograph |
| `campus-gallery.svg` | Real campus or event photograph |
| `project-gridsage.svg` | Actual project screenshot / demo thumbnail |
| `open-source.svg` | Actual open-source / software project visual |
| `hackathon-night.svg` | Actual hackathon or build-night photograph |
| `workshop-lab.svg` | Actual workshop / lab photograph |

Project and event entries in `src/data.js` are explicitly marked as demo content. Replace titles, descriptions, dates, technologies, contributors and URLs with verified details. Do not publish invented achievements, member profiles or statistics.

The supplied FCIT logo is included as the original PNG and an optimized WebP display copy (about 39 KB).

## Main files

- `src/App.jsx` — page sections, navigation, dialog and gallery interactions.
- `src/data.js` — editable demo project / event / activity data.
- `src/styles.css` — brand styles, responsive layouts and animations.
- `index.html` — document metadata and font loading.
- `vite.config.js` — Vite React plugin configuration.

## Before deployment

1. Replace all demo SVG artwork with genuine, licensed FCIT photographs / screenshots.
2. Replace demo project and event copy with verified information.
3. Connect the Join form to an approved backend. The current form intentionally does **not** send or store data.
4. Add FCIT's official contact email, social profile URLs, privacy policy and terms.
5. Test on actual Android devices and slow mobile connections.
6. Run Lighthouse / PageSpeed against the deployed production build and inspect image / font transfer sizes.

## Performance notes

- No WebGL, Three.js, video backgrounds or animation libraries.
- CSS transforms / opacity are used for most motion.
- Reveal effects use IntersectionObserver instead of continuous scroll calculations.
- The only continuous scroll work updates the progress indicator and a subtle desktop-only parallax value.
- Google Fonts are loaded with `display=swap` by the stylesheet URL. For stricter data budgets, download only the used WOFF2 subsets, self-host them and remove the Google Fonts links in `index.html`.
