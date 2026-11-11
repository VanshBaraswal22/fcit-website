import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ELEMENTAL CONFIGURATION FOR THE FOUR FCIT WORKING GUILDS
 * Dev's Guild -> FIRE (Deep crimson, orange, warm gold)
 * Intelligence Guild -> AIR (Electric blue, silver, pale gold)
 * Algocrew -> EARTH / ROCK (Slate, muted green, gold)
 * Fusion X -> WATER (Deep teal, cyan, gold)
 */
export const GUILD_ELEMENTS = {
  'devs-guild': {
    slug: 'dev',
    element: 'FIRE',
    symbol: '🔥',
    title: 'ENGINEERING & ARCHITECTURE',
    meaning: 'Software engineering, systems architecture & tooling',
    slogan: 'BUILD · DEPLOY · SCALE',
    primaryColor: '#FF5722',
    accentColor: '#FF9800',
    goldColor: '#D6AD54',
    glowColor: 'rgba(255, 87, 34, 0.45)',
    bgGradient: 'radial-gradient(circle at center, rgba(232, 65, 24, 0.15) 0%, transparent 70%)',
    route: '/guilds/dev',
  },
  'intelligence-guild': {
    slug: 'intelligence',
    element: 'AIR',
    symbol: '🌬️',
    title: 'THE WIND OF THOUGHT',
    meaning: 'Thinking, learning and intelligence',
    slogan: 'TEACH MACHINES TO THINK',
    primaryColor: '#00A8FF',
    accentColor: '#70A1FF',
    goldColor: '#D6AD54',
    glowColor: 'rgba(0, 168, 255, 0.45)',
    bgGradient: 'radial-gradient(circle at center, rgba(0, 168, 255, 0.14) 0%, transparent 70%)',
    route: '/guilds/intelligence',
  },
  algocrew: {
    slug: 'algocrew',
    element: 'EARTH',
    symbol: '⛰️',
    title: 'THE BEDROCK OF LOGIC',
    meaning: 'Algorithms, structure and problem-solving',
    slogan: 'THINK · SOLVE · OPTIMIZE',
    primaryColor: '#2ED573',
    accentColor: '#747D8C',
    goldColor: '#D6AD54',
    glowColor: 'rgba(46, 213, 115, 0.4)',
    bgGradient: 'radial-gradient(circle at center, rgba(46, 213, 115, 0.14) 0%, transparent 70%)',
    route: '/guilds/algocrew',
  },
  'fusion-x': {
    slug: 'fusion-x',
    element: 'WATER',
    symbol: '💧',
    title: 'THE TIDE OF INNOVATION',
    meaning: 'Research, collaboration and innovation',
    slogan: 'RESEARCH · DISRUPT · TRANSCEND',
    primaryColor: '#00D2D3',
    accentColor: '#01A3A4',
    goldColor: '#D6AD54',
    glowColor: 'rgba(0, 210, 211, 0.45)',
    bgGradient: 'radial-gradient(circle at center, rgba(0, 210, 211, 0.15) 0%, transparent 70%)',
    route: '/guilds/fusion-x',
  },
};

/**
 * Interactive animated SVG elemental icons
 */
export function ElementalIcon({ guildId, size = 42, className = '' }) {
  const elem = GUILD_ELEMENTS[guildId] || GUILD_ELEMENTS['devs-guild'];

  switch (elem.element) {
    case 'FIRE':
      return (
        <svg
          className={`elemental-svg elemental-svg--fire ${className}`}
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="fire-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF9800" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#E84118" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#C23616" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="fire-grad-outer" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#8D1022" />
              <stop offset="45%" stopColor="#C23616" />
              <stop offset="85%" stopColor="#FF6B35" />
              <stop offset="100%" stopColor="#FFD32A" />
            </linearGradient>
            <linearGradient id="fire-grad-inner" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FF6B35" />
              <stop offset="60%" stopColor="#FFD32A" />
              <stop offset="100%" stopColor="#FFFDF4" />
            </linearGradient>
          </defs>

          {/* Ambient Glow */}
          <circle cx="24" cy="26" r="18" fill="url(#fire-glow)" className="fire-ambient-glow" />

          {/* Main Outer Flame Tongue */}
          <path
            className="fire-flame-outer"
            d="M24 4C24 4 15 14 15 26C15 33.732 20.268 39 28 39C34.732 39 39 33.732 39 27C39 19.5 31.5 13.5 31.5 13.5C31.5 13.5 33 18 30 20C27 22 24.5 17 24.5 17C24.5 17 25 10 24 4Z"
            fill="url(#fire-grad-outer)"
          />

          {/* Left Subsidiary Flickering Flame */}
          <path
            className="fire-flame-left"
            d="M17 22C17 22 11 26 11 31C11 35.5 14.5 38 18 38C19 38 19.5 37 19.5 36C19.5 32 17 28 17 22Z"
            fill="#E84118"
            opacity="0.85"
          />

          {/* Core Golden Flame */}
          <path
            className="fire-flame-inner"
            d="M24 18C24 18 19 23 19 29C19 33.5 22 36 25 36C28 36 30 33 30 29C30 25 27 22 27 22C27 22 26 24 24.5 24C23.5 24 24 20 24 18Z"
            fill="url(#fire-grad-inner)"
          />

          {/* Rising Embers */}
          <circle cx="16" cy="14" r="1.4" fill="#FFD32A" className="fire-ember fire-ember--1" />
          <circle cx="32" cy="10" r="1.2" fill="#FFA502" className="fire-ember fire-ember--2" />
        </svg>
      );

    case 'AIR':
      return (
        <svg
          className={`elemental-svg elemental-svg--air ${className}`}
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="air-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#70A1FF" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#00A8FF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#071827" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="air-stream-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#70A1FF" stopOpacity="0.2" />
              <stop offset="40%" stopColor="#00A8FF" stopOpacity="0.9" />
              <stop offset="80%" stopColor="#E4E7EB" stopOpacity="1" />
              <stop offset="100%" stopColor="#D6AD54" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Ambient Breeze Glow */}
          <circle cx="24" cy="24" r="18" fill="url(#air-glow)" className="air-ambient-glow" />

          {/* Top Aerodynamic Neural Stream */}
          <path
            className="air-stream air-stream--top"
            d="M6 16C16 16 20 11 30 11C38 11 41 16 38 20C35 24 28 22 28 18"
            stroke="url(#air-stream-grad)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Center Powerful Wind Current */}
          <path
            className="air-stream air-stream--mid"
            d="M10 24C19 24 23 20 34 20C42 20 44 26 40 29C36 32 32 28 34 24"
            stroke="url(#air-stream-grad)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          {/* Bottom Neural Filament */}
          <path
            className="air-stream air-stream--bot"
            d="M8 32C17 32 22 36 29 36C36 36 40 33 38 30"
            stroke="url(#air-stream-grad)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Synaptic Nodes */}
          <circle cx="30" cy="11" r="2.2" fill="#D6AD54" className="air-node air-node--1" />
          <circle cx="34" cy="20" r="2.5" fill="#FFFFFF" className="air-node air-node--2" />
          <circle cx="29" cy="36" r="2" fill="#70A1FF" className="air-node air-node--3" />
        </svg>
      );

    case 'EARTH':
      return (
        <svg
          className={`elemental-svg elemental-svg--earth ${className}`}
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="earth-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2ED573" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#1E272E" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#071827" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="crystal-facet-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2ED573" />
              <stop offset="100%" stopColor="#0F5B2F" />
            </linearGradient>
            <linearGradient id="crystal-facet-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#26DE81" />
              <stop offset="100%" stopColor="#20BF6B" />
            </linearGradient>
            <linearGradient id="crystal-facet-3" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E272E" />
              <stop offset="100%" stopColor="#485460" />
            </linearGradient>
          </defs>

          {/* Ambient Crystalline Glow */}
          <circle cx="24" cy="24" r="18" fill="url(#earth-glow)" className="earth-ambient-glow" />

          {/* Central Algorithmic Polyhedron Group */}
          <g className="earth-polyhedron">
            {/* Top Facet */}
            <polygon points="24,6 39,15 24,24 9,15" fill="url(#crystal-facet-2)" opacity="0.9" />

            {/* Left Lower Facet */}
            <polygon points="9,15 24,24 24,42 9,33" fill="url(#crystal-facet-1)" opacity="0.85" />

            {/* Right Lower Facet */}
            <polygon points="24,24 39,15 39,33 24,42" fill="url(#crystal-facet-3)" opacity="0.95" />

            {/* Connecting Wireframe Overlays */}
            <line x1="24" y1="6" x2="24" y2="24" stroke="#D6AD54" strokeWidth="1.2" strokeOpacity="0.85" />
            <line x1="24" y1="24" x2="9" y2="15" stroke="#D6AD54" strokeWidth="1.2" strokeOpacity="0.85" />
            <line x1="24" y1="24" x2="39" y2="15" stroke="#D6AD54" strokeWidth="1.2" strokeOpacity="0.85" />
            <line x1="24" y1="24" x2="24" y2="42" stroke="#D6AD54" strokeWidth="1.2" strokeOpacity="0.85" />

            {/* Algorithmic Vertices */}
            <circle cx="24" cy="6" r="2" fill="#D6AD54" className="earth-vertex" />
            <circle cx="39" cy="15" r="2" fill="#FFFFFF" className="earth-vertex" />
            <circle cx="9" cy="15" r="2" fill="#FFFFFF" className="earth-vertex" />
            <circle cx="24" cy="24" r="2.6" fill="#D6AD54" className="earth-vertex earth-vertex--center" />
            <circle cx="24" cy="42" r="2" fill="#D6AD54" className="earth-vertex" />
          </g>
        </svg>
      );

    case 'WATER':
    default:
      return (
        <svg
          className={`elemental-svg elemental-svg--water ${className}`}
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="water-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00D2D3" stopOpacity="0.75" />
              <stop offset="60%" stopColor="#01A3A4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#071827" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="water-drop-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#48DBFB" />
              <stop offset="50%" stopColor="#00D2D3" />
              <stop offset="100%" stopColor="#01A3A4" />
            </linearGradient>
          </defs>

          {/* Ambient Fluid Glow */}
          <circle cx="24" cy="24" r="18" fill="url(#water-glow)" className="water-ambient-glow" />

          {/* Fluid Orbital Ripple Waves */}
          <ellipse
            cx="24"
            cy="27"
            rx="16"
            ry="7.5"
            stroke="#00D2D3"
            strokeWidth="1.2"
            strokeOpacity="0.45"
            className="water-ripple water-ripple--outer"
          />
          <ellipse
            cx="24"
            cy="27"
            rx="11"
            ry="5"
            stroke="#48DBFB"
            strokeWidth="1.4"
            strokeOpacity="0.65"
            className="water-ripple water-ripple--inner"
          />

          {/* Central Pure Fluid Droplet */}
          <path
            className="water-droplet"
            d="M24 7C24 7 15 20 15 27C15 32 19 36 24 36C29 36 33 32 33 27C33 20 24 7 24 7Z"
            fill="url(#water-drop-grad)"
          />

          {/* Micro Highlight Reflex */}
          <path
            d="M20 22C19 24 19 27 21 29"
            stroke="#FFFFFF"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Orbital Satellite Node */}
          <circle cx="37" cy="24" r="2.2" fill="#D6AD54" className="water-satellite" />
        </svg>
      );
  }
}

/**
 * Elemental Identity Badge (Permanently removed globally)
 */
export function ElementalIdentityBadge() {
  return null;
}

/**
 * Editorial Explore Link (Clean minimal text link)
 */
export function ElementalExploreLink({ guildId }) {
  const targetRoute =
    guildId === 'devs-guild'
      ? '/guilds/dev'
      : guildId === 'intelligence-guild'
      ? '/guilds/intelligence'
      : guildId === 'algocrew'
      ? '/guilds/algocrew'
      : '/guilds/fusion-x';

  return (
    <Link to={targetRoute} className="guild-explore-link">
      <span className="explore-label">EXPLORE GUILD</span>
      <span className="explore-arrow" aria-hidden="true">→</span>
      <span className="explore-underline" aria-hidden="true" />
    </Link>
  );
}

export default ElementalExploreLink;
