import React from 'react';
import '../../styles/elementalActionCards.css';

/**
 * FOUR IMMERSIVE ELEMENTAL ACTION CARDS
 * 1. BURN  — Fire Element (Dev's Guild)
 * 2. FLY   — Air Element (Intelligence Guild)
 * 3. DIVE  — Water Element (Fusion X)
 * 4. RUN   — Earth / Stone Element (AlgoCrew)
 *
 * Designed with living, full-bleed elemental environments:
 * - Realistically animated continuous flames, clouds, waves, and floating stone shards.
 * - Monumental, centered high-contrast typography.
 * - Identical dimensions, glowing borders, smooth hover elevation.
 * - Fluid responsive layout: Desktop (4 across), Tablet (2x2), Mobile (vertical stack).
 */

export const ELEMENTAL_CARDS_DATA = {
  'devs-guild': {
    id: 'burn',
    guildId: 'devs-guild',
    word: 'BURN',
    element: 'FIRE',
    essence: 'Systems & Architecture',
    guildName: "Dev's Guild",
    route: '/guilds/dev',
    anchor: '#devs-guild',
    ariaLabel: "BURN — Dev's Guild (Fire Element). Systems & Architecture. Jump to Chapter 01.",
  },
  'intelligence-guild': {
    id: 'fly',
    guildId: 'intelligence-guild',
    word: 'FLY',
    element: 'AIR',
    essence: 'The Wind of Thought',
    guildName: 'Intelligence Guild',
    route: '/guilds/intelligence',
    anchor: '#intelligence-guild',
    ariaLabel: 'FLY — Intelligence Guild (Air Element). The Wind of Thought. Jump to Chapter 02.',
  },
  'fusion-x': {
    id: 'dive',
    guildId: 'fusion-x',
    word: 'DIVE',
    element: 'WATER',
    essence: 'The Tide of Innovation',
    guildName: 'Fusion X',
    route: '/guilds/fusion-x',
    anchor: '#fusion-x',
    ariaLabel: 'DIVE — Fusion X (Water Element). The Tide of Innovation. Jump to Chapter 04.',
  },
  algocrew: {
    id: 'run',
    guildId: 'algocrew',
    word: 'RUN',
    element: 'EARTH',
    essence: 'The Bedrock of Logic',
    guildName: 'AlgoCrew',
    route: '/guilds/algocrew',
    anchor: '#algocrew',
    ariaLabel: 'RUN — AlgoCrew (Earth / Stone Element). The Bedrock of Logic. Jump to Chapter 03.',
  },
};

const ELEMENTAL_CARDS_LIST = [
  ELEMENTAL_CARDS_DATA['devs-guild'],
  ELEMENTAL_CARDS_DATA['intelligence-guild'],
  ELEMENTAL_CARDS_DATA['fusion-x'],
  ELEMENTAL_CARDS_DATA['algocrew'],
];

/**
 * Single Immersive Elemental Action Card
 * Used in the 4-card navigation grid and inside chapter panels
 */
export function ElementalActionSingleCard({
  guildId,
  cardData,
  compact = false,
  interactive = true,
  className = '',
  onClick,
}) {
  const card = cardData || ELEMENTAL_CARDS_DATA[guildId] || ELEMENTAL_CARDS_DATA['devs-guild'];

  const handleClick = (e) => {
    if (onClick) {
      onClick(e, card);
      return;
    }

    if (!interactive) return;

    e.preventDefault();
    const targetElement = document.querySelector(card.anchor);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', card.anchor);
    } else if (typeof window !== 'undefined') {
      window.location.hash = card.anchor;
    }
  };

  return (
    <a
      href={card.anchor}
      onClick={handleClick}
      className={`elemental-action-card elemental-action-card--${card.id} ${className}`}
      aria-label={card.ariaLabel}
      tabIndex={interactive ? 0 : -1}
    >
      {/* Visual Environment Canvas */}
      <div className="elemental-card__stage" aria-hidden="true">
        {card.id === 'burn' && <BurnEnvironment />}
        {card.id === 'fly' && <FlyEnvironment />}
        {card.id === 'dive' && <DiveEnvironment />}
        {card.id === 'run' && <RunEnvironment />}
      </div>

      {/* Glowing Border / Edge Highlight */}
      <div className="elemental-card__glow-border" aria-hidden="true" />

      {/* Foreground Centered Typography Layer */}
      <div className="elemental-card__content">
        <span className="elemental-card__eyebrow">
          {card.element} · {card.guildName}
        </span>

        <h3 className="elemental-card__word">{card.word}</h3>

        <span className="elemental-card__subtext">
          <span className="elemental-card__essence">{card.essence}</span>
          <span className="elemental-card__arrow" aria-hidden="true">↓</span>
        </span>
      </div>
    </a>
  );
}

/**
 * 4-Card Master Grid Navigation Strip
 */
export default function ElementalActionCards({ onCardClick, className = '' }) {
  return (
    <nav
      className={`elemental-action-strip ${className}`}
      aria-label="Elemental disciplines navigation"
    >
      <div className="elemental-action-grid">
        {ELEMENTAL_CARDS_LIST.map((card) => (
          <ElementalActionSingleCard
            key={card.id}
            cardData={card}
            onClick={onCardClick ? (e, c) => onCardClick(c) : undefined}
          />
        ))}
      </div>
    </nav>
  );
}

/* ==========================================================================
   1. BURN — FIRE ENVIRONMENT
   Realistic multi-layered rising flames, licking edge fires, ascending embers
   ========================================================================== */
function BurnEnvironment() {
  return (
    <div className="elemental-env elemental-env--burn">
      {/* Deep Red-Black Base Heat Glow */}
      <div className="burn-heat-base" />

      {/* Heat Distortion Shimmer Overlay */}
      <div className="burn-heat-shimmer" />

      {/* Side Edge Licking Flames */}
      <div className="burn-edge-flames" />

      {/* Realistic Rising Flames SVG Layer */}
      <svg
        className="burn-flames-svg"
        viewBox="0 0 360 220"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="burnFlameDeep" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#3F0402" stopOpacity="0.98" />
            <stop offset="45%" stopColor="#7F1D1D" stopOpacity="0.9" />
            <stop offset="85%" stopColor="#B91C1C" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="burnFlameMid" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#991B1B" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#C2410C" stopOpacity="0.9" />
            <stop offset="75%" stopColor="#EA580C" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="burnFlameHot" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#EA580C" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#F59E0B" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#FBBF24" stopOpacity="0.85" />
            <stop offset="90%" stopColor="#FEF08A" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="burnTongueGlow" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFD32A" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Deep Flame Wall (Back Layer) */}
        <path
          className="burn-flame-path burn-flame-path--deep"
          d="M0,220 L0,90 Q40,60 70,105 T140,85 T210,100 T280,75 T360,95 L360,220 Z"
          fill="url(#burnFlameDeep)"
        />

        {/* Tall Individual Blazing Tongues */}
        <path
          className="burn-flame-tongue burn-flame-tongue--1"
          d="M30,220 C35,160 20,110 50,60 C65,110 55,160 60,220 Z"
          fill="url(#burnTongueGlow)"
        />
        <path
          className="burn-flame-tongue burn-flame-tongue--2"
          d="M150,220 C155,140 135,90 175,45 C190,95 180,150 185,220 Z"
          fill="url(#burnTongueGlow)"
        />
        <path
          className="burn-flame-tongue burn-flame-tongue--3"
          d="M280,220 C285,150 265,100 305,50 C320,100 310,160 315,220 Z"
          fill="url(#burnTongueGlow)"
        />

        {/* Mid Blazing Flame Currents */}
        <path
          className="burn-flame-path burn-flame-path--mid"
          d="M0,220 L0,120 Q35,85 75,130 T155,105 T235,125 T315,95 T360,115 L360,220 Z"
          fill="url(#burnFlameMid)"
        />

        {/* Foreground Incandescent Yellow Core Flames */}
        <path
          className="burn-flame-path burn-flame-path--hot"
          d="M0,220 L0,150 Q30,120 65,160 T145,135 T225,155 T305,125 T360,145 L360,220 Z"
          fill="url(#burnFlameHot)"
        />
      </svg>

      {/* Floating Ascending Fiery Embers (Gold, Orange, Red) */}
      <div className="burn-embers-field">
        <span className="burn-ember burn-ember--1" />
        <span className="burn-ember burn-ember--2" />
        <span className="burn-ember burn-ember--3" />
        <span className="burn-ember burn-ember--4" />
        <span className="burn-ember burn-ember--5" />
        <span className="burn-ember burn-ember--6" />
        <span className="burn-ember burn-ember--7" />
        <span className="burn-ember burn-ember--8" />
        <span className="burn-ember burn-ember--9" />
        <span className="burn-ember burn-ember--10" />
        <span className="burn-ember burn-ember--11" />
        <span className="burn-ember burn-ember--12" />
      </div>

      {/* Perimeter Fiery Border Glow */}
      <div className="burn-edge-fire" />
    </div>
  );
}

/* ==========================================================================
   2. FLY — AIR ENVIRONMENT
   Soft sky-blue atmosphere, beautiful drifting white clouds, flowing wind trails
   ========================================================================== */
function FlyEnvironment() {
  return (
    <div className="elemental-env elemental-env--fly">
      {/* Soft Sky-Blue & Atmospheric White Gradient Backdrop */}
      <div className="fly-sky-backdrop" />

      {/* Layer 1: Slow Drifting Background Fluffy Clouds */}
      <div className="fly-clouds-layer fly-clouds-layer--slow">
        <svg className="fly-cloud-svg fly-cloud-svg--s1" viewBox="0 0 160 60" xmlns="http://www.w3.org/2000/svg">
          <path d="M20,50 Q10,50 10,40 Q10,25 25,25 Q30,10 50,10 Q65,10 75,20 Q85,15 95,20 Q110,15 125,25 Q145,25 145,40 Q145,50 130,50 Z" fill="#FFFFFF" fillOpacity="0.85" filter="drop-shadow(0 4px 8px rgba(186, 230, 253, 0.5))" />
        </svg>

        <svg className="fly-cloud-svg fly-cloud-svg--s2" viewBox="0 0 180 70" xmlns="http://www.w3.org/2000/svg">
          <path d="M25,58 Q12,58 12,46 Q12,30 30,30 Q36,12 60,12 Q78,12 90,24 Q102,18 114,24 Q132,18 150,30 Q174,30 174,46 Q174,58 156,58 Z" fill="#FFFFFF" fillOpacity="0.75" filter="drop-shadow(0 4px 8px rgba(186, 230, 253, 0.4))" />
        </svg>

        <svg className="fly-cloud-svg fly-cloud-svg--s3" viewBox="0 0 140 55" xmlns="http://www.w3.org/2000/svg">
          <path d="M18,45 Q8,45 8,36 Q8,22 22,22 Q27,8 45,8 Q58,8 68,18 Q77,13 86,18 Q100,13 112,22 Q130,22 130,36 Q130,45 118,45 Z" fill="#FFFFFF" fillOpacity="0.8" filter="drop-shadow(0 4px 8px rgba(186, 230, 253, 0.45))" />
        </svg>
      </div>

      {/* Wind Stream Lines SVG */}
      <svg
        className="fly-wind-svg"
        viewBox="0 0 360 220"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="flyWindGrad1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#7DD3FC" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="flyWindGrad2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0" />
            <stop offset="35%" stopColor="#38BDF8" stopOpacity="0.75" />
            <stop offset="75%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Top High-Altitude Wind Stream */}
        <path
          className="fly-stream-line fly-stream-line--1"
          d="M -30,42 C 45,20 115,62 195,35 C 265,15 320,48 390,28"
          fill="none"
          stroke="url(#flyWindGrad1)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* Center Current Stream */}
        <path
          className="fly-stream-line fly-stream-line--2"
          d="M -20,110 C 65,88 135,132 225,98 C 295,72 340,118 400,88"
          fill="none"
          stroke="url(#flyWindGrad2)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Lower Atmospheric Breeze Filament */}
        <path
          className="fly-stream-line fly-stream-line--3"
          d="M -40,175 C 40,150 120,190 205,162 C 280,138 330,178 395,152"
          fill="none"
          stroke="url(#flyWindGrad1)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>

      {/* Layer 2: Faster Drifting Foreground Fluffy Clouds */}
      <div className="fly-clouds-layer fly-clouds-layer--fast">
        <svg className="fly-cloud-svg fly-cloud-svg--f1" viewBox="0 0 130 50" xmlns="http://www.w3.org/2000/svg">
          <path d="M15,42 Q6,42 6,32 Q6,20 20,20 Q24,8 40,8 Q52,8 60,16 Q68,12 76,16 Q88,12 98,20 Q114,20 114,32 Q114,42 104,42 Z" fill="#FFFFFF" fillOpacity="0.92" filter="drop-shadow(0 3px 6px rgba(14, 165, 233, 0.25))" />
        </svg>

        <svg className="fly-cloud-svg fly-cloud-svg--f2" viewBox="0 0 150 55" xmlns="http://www.w3.org/2000/svg">
          <path d="M18,46 Q8,46 8,36 Q8,22 22,22 Q28,9 46,9 Q60,9 70,18 Q79,14 88,18 Q102,14 116,22 Q134,22 134,36 Q134,46 122,46 Z" fill="#FFFFFF" fillOpacity="0.88" filter="drop-shadow(0 3px 6px rgba(14, 165, 233, 0.2))" />
        </svg>
      </div>

      {/* Floating Breeze Particles */}
      <div className="fly-breeze-particles">
        <span className="fly-mote fly-mote--1" />
        <span className="fly-mote fly-mote--2" />
        <span className="fly-mote fly-mote--3" />
        <span className="fly-mote fly-mote--4" />
        <span className="fly-mote fly-mote--5" />
        <span className="fly-mote fly-mote--6" />
      </div>
    </div>
  );
}

/* ==========================================================================
   3. DIVE — WATER ENVIRONMENT
   Deep ocean abyss, caustic light rays, undulating water currents & bubbles
   ========================================================================== */
function DiveEnvironment() {
  return (
    <div className="elemental-env elemental-env--dive">
      {/* Deep Ocean Abyss Backdrop */}
      <div className="dive-ocean-backdrop" />

      {/* Underwater Caustic Light Rays */}
      <div className="dive-caustic-rays">
        <span className="dive-ray dive-ray--1" />
        <span className="dive-ray dive-ray--2" />
        <span className="dive-ray dive-ray--3" />
        <span className="dive-ray dive-ray--4" />
      </div>

      {/* Undulating Underwater Wave Currents SVG */}
      <svg
        className="dive-waves-svg"
        viewBox="0 0 360 220"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="diveWaveDeep" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0891B2" stopOpacity="0" />
            <stop offset="40%" stopColor="#0E7490" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#042F2E" stopOpacity="0.85" />
          </linearGradient>

          <linearGradient id="diveWaveAqua" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#083344" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="diveCrestGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
            <stop offset="50%" stopColor="#A5F3FC" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Back Ocean Surge Wave */}
        <path
          className="dive-wave-path dive-wave-path--back"
          d="M0,220 L0,125 Q45,95 90,145 T180,120 T270,140 T360,115 L360,220 Z"
          fill="url(#diveWaveDeep)"
        />

        {/* Mid Bioluminescent Ripple Wave */}
        <path
          className="dive-wave-path dive-wave-path--mid"
          d="M0,220 L0,150 Q50,125 100,165 T200,140 T300,160 T360,135 L360,220 Z"
          fill="url(#diveWaveAqua)"
        />

        {/* Radiant Aqua Wave Crest Line */}
        <path
          className="dive-wave-crest"
          d="M0,150 Q50,125 100,165 T200,140 T300,160 T360,135"
          fill="none"
          stroke="url(#diveCrestGrad)"
          strokeWidth="1.8"
        />
      </svg>

      {/* Floating Translucent Rising Bubbles */}
      <div className="dive-bubbles-field">
        <span className="dive-bubble dive-bubble--1" />
        <span className="dive-bubble dive-bubble--2" />
        <span className="dive-bubble dive-bubble--3" />
        <span className="dive-bubble dive-bubble--4" />
        <span className="dive-bubble dive-bubble--5" />
        <span className="dive-bubble dive-bubble--6" />
        <span className="dive-bubble dive-bubble--7" />
        <span className="dive-bubble dive-bubble--8" />
        <span className="dive-bubble dive-bubble--9" />
        <span className="dive-bubble dive-bubble--10" />
        <span className="dive-bubble dive-bubble--11" />
        <span className="dive-bubble dive-bubble--12" />
      </div>

      {/* Fluid Glowing Water Edge */}
      <div className="dive-fluid-edge" />
    </div>
  );
}

/* ==========================================================================
   4. RUN — EARTH / STONE ENVIRONMENT
   Rugged stone bedrock, mineral fractures, tumbling rock shards, amber dust
   ========================================================================== */
function RunEnvironment() {
  return (
    <div className="elemental-env elemental-env--run">
      {/* Rugged Geological Obsidian & Slate Backdrop */}
      <div className="run-stone-backdrop" />

      {/* Mineral Veins & Crystalline Bedrock SVG */}
      <svg
        className="run-stone-svg"
        viewBox="0 0 360 220"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="runGoldVein" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#78350F" stopOpacity="0.2" />
            <stop offset="35%" stopColor="#D97706" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#FBBF24" stopOpacity="1" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="runStoneFacet1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2E261F" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#1A1613" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="runStoneFacet2" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3A3026" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#151210" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Angular Bedrock Facets */}
        <polygon points="0,220 0,140 100,175 160,220" fill="url(#runStoneFacet1)" />
        <polygon points="160,220 100,175 230,150 280,220" fill="url(#runStoneFacet2)" />
        <polygon points="280,220 230,150 360,165 360,220" fill="url(#runStoneFacet1)" />

        {/* Glowing Amber Mineral Fracture Veins */}
        <path
          className="run-vein-line run-vein-line--1"
          d="M 10,205 L 75,170 L 135,185 L 195,158 L 265,175 L 325,148 L 355,160"
          fill="none"
          stroke="url(#runGoldVein)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 3"
        />

        <path
          className="run-vein-line run-vein-line--2"
          d="M 100,175 L 125,132 L 185,142 L 230,150"
          fill="none"
          stroke="url(#runGoldVein)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* Crystalline Nodes at Vein Intersections */}
        <circle cx="75" cy="170" r="2.2" fill="#FBBF24" className="run-crystal-node" />
        <circle cx="195" cy="158" r="2.5" fill="#FDE68A" className="run-crystal-node" />
        <circle cx="265" cy="175" r="2" fill="#F59E0B" className="run-crystal-node" />
      </svg>

      {/* Floating & Tumbling Stone Debris / Rock Fragments */}
      <div className="run-debris-field">
        <span className="run-shard run-shard--1" />
        <span className="run-shard run-shard--2" />
        <span className="run-shard run-shard--3" />
        <span className="run-shard run-shard--4" />
        <span className="run-shard run-shard--5" />
        <span className="run-shard run-shard--6" />
        <span className="run-shard run-shard--7" />
        <span className="run-shard run-shard--8" />
      </div>

      {/* Fine Amber Mineral Dust Motes */}
      <div className="run-dust-field">
        <span className="run-dust run-dust--1" />
        <span className="run-dust run-dust--2" />
        <span className="run-dust run-dust--3" />
        <span className="run-dust run-dust--4" />
        <span className="run-dust run-dust--5" />
        <span className="run-dust run-dust--6" />
      </div>

      {/* Crystalline Corner Accents */}
      <div className="run-crystal-corners" />
    </div>
  );
}
