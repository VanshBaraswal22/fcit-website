FCIT — FOUR GUILD VISUAL ASSETS

Four separate text-free backgrounds for the four guild cards. Keep headings, labels, descriptions and buttons as HTML/React text.

ASSET MAPPING
- 01-devs-guild.webp: Dev’s Guild — glowing gateway / software engineering
- 02-intelligence-guild.webp: Intelligence Guild — marble bust / neural network
- 03-algocrew.webp: AlgoCrew — algorithmic cubes / graph motifs
- 04-fusion-x.webp: Fusion X — orbital research structure / interdisciplinary technology

REACT DATA EXAMPLE

const guilds = [
  { id: "devs", name: "Dev’s Guild", eyebrow: "CHAPTER 01", tagline: "BUILD · DEPLOY · SCALE", image: "/images/guilds/01-devs-guild.webp" },
  { id: "intelligence", name: "Intelligence Guild", eyebrow: "CHAPTER 02", tagline: "TEACH MACHINES TO THINK", image: "/images/guilds/02-intelligence-guild.webp" },
  { id: "algocrew", name: "AlgoCrew", eyebrow: "CHAPTER 03", tagline: "THINK · SOLVE · OPTIMISE", image: "/images/guilds/03-algocrew.webp" },
  { id: "fusion-x", name: "Fusion X", eyebrow: "CHAPTER 04", tagline: "RESEARCH · CONNECT · CREATE", image: "/images/guilds/04-fusion-x.webp" },
];

CSS STARTER

.guild-card { position: relative; isolation: isolate; overflow: hidden; background: #061522; color: #fff8ec; }
.guild-card__art { position: absolute; inset: 0; z-index: -1; width: 100%; height: 100%; object-fit: cover; object-position: center; transition: transform 700ms cubic-bezier(.2,.7,.2,1); }
.guild-card:hover .guild-card__art { transform: scale(1.035); }
.guild-card::after { content: ""; position: absolute; inset: 0; z-index: 0; pointer-events: none; background: linear-gradient(90deg, rgba(3,13,23,.88), rgba(3,13,23,.48) 48%, rgba(3,13,23,.08)); }
.guild-card__content { position: relative; z-index: 1; }

IMPLEMENTATION NOTES
- Place images in public/images/guilds/ and use the paths above.
- Keep all copy in the DOM, not baked into images: this preserves accessibility, responsive typography, SEO and easy editing.
- Lazy-load below-the-fold images and define aspect-ratio to prevent layout shift.
- Prefer transform/opacity animations and respect prefers-reduced-motion.
- Adjust overlay direction/strength to protect text contrast.
