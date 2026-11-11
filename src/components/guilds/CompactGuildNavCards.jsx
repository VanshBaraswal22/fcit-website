import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Realistic Elemental SVG Icons
 * Premium, detailed vector illustrations designed to sit crisply inside compact cards.
 */

// 1. Realistic Burning Flame Icon
function RealisticFlameIcon({ className = '' }) {
  return (
    <svg
      className={`compact-elem-icon compact-elem-icon--fire ${className}`}
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="c-fire-glow" cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor="#FF9800" stopOpacity="0.65" />
          <stop offset="50%" stopColor="#C8102E" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#8D1022" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="c-fire-outer" x1="16" y1="30" x2="16" y2="2" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7A0C18" />
          <stop offset="35%" stopColor="#C8102E" />
          <stop offset="70%" stopColor="#FF5722" />
          <stop offset="95%" stopColor="#FFA000" />
          <stop offset="100%" stopColor="#FFD54F" />
        </linearGradient>
        <linearGradient id="c-fire-inner" x1="16" y1="28" x2="16" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF5722" />
          <stop offset="45%" stopColor="#FFA000" />
          <stop offset="85%" stopColor="#FFD54F" />
          <stop offset="100%" stopColor="#FFFDF4" />
        </linearGradient>
      </defs>

      {/* Atmospheric Ember Glow */}
      <circle cx="16" cy="18" r="13" fill="url(#c-fire-glow)" className="flame-glow-circle" />

      {/* Main Outer Flowing Flame Body */}
      <path
        d="M16 2.5C16 2.5 10 10.5 10 18.5C10 23.5 13 27.5 18 28.5C23 29.5 25.5 26 25.5 21C25.5 15.5 20.5 11.5 20.5 11.5C20.5 11.5 21.5 14.5 19.5 16C17.5 17.5 16 13.5 16 13.5C16 13.5 16.5 7.5 16 2.5Z"
        fill="url(#c-fire-outer)"
        className="flame-outer-tongue"
      />

      {/* Left Flickering Tongue */}
      <path
        d="M11 16C11 16 7.5 19 7.5 22.5C7.5 25.5 10 27.5 12.5 27.5C13.2 27.5 13.5 26.8 13.5 26C13.5 23 11 20 11 16Z"
        fill="#FF5722"
        opacity="0.9"
        className="flame-left-tongue"
      />

      {/* Inner White-Gold Core Flame */}
      <path
        d="M16 14C16 14 12.5 18 12.5 22.5C12.5 25.8 14.8 27.5 17 27.5C19.2 27.5 21 25.5 21 22.5C21 19.5 18.5 17 18.5 17C18.5 17 18 18.5 16.8 18.5C15.8 18.5 16 15.5 16 14Z"
        fill="url(#c-fire-inner)"
        className="flame-inner-core"
      />

      {/* Micro Embers */}
      <circle cx="10" cy="11" r="0.9" fill="#FFD54F" className="flame-ember-1" />
      <circle cx="21" cy="7" r="0.8" fill="#FFA000" className="flame-ember-2" />
    </svg>
  );
}

// 2. Realistic Cloud with Wind Breeze Trails Icon
function RealisticAirIcon({ className = '' }) {
  return (
    <svg
      className={`compact-elem-icon compact-elem-icon--air ${className}`}
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="c-air-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#70A1FF" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#00A8FF" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="c-cloud-vol" x1="16" y1="10" x2="16" y2="25" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#F0F9FF" />
          <stop offset="80%" stopColor="#BAE6FD" />
          <stop offset="100%" stopColor="#70A1FF" />
        </linearGradient>
        <linearGradient id="c-wind-stream" x1="2" y1="16" x2="30" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00A8FF" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#00A8FF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#70A1FF" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Atmosphere Glow */}
      <circle cx="16" cy="17" r="13" fill="url(#c-air-glow)" className="air-glow-circle" />

      {/* Wind Breeze Trails Behind */}
      <path
        d="M3 13C6 13 8 11.5 12 11.5M4 22C8 22 11 23 15 23"
        stroke="url(#c-wind-stream)"
        strokeWidth="1.2"
        strokeLinecap="round"
        className="wind-trail-back"
      />

      {/* Realistic Volumetric Cloud Base */}
      <path
        d="M9.5 23C7.5 23 5.5 21.2 5.5 19C5.5 17 6.9 15.3 8.8 15.1C9.4 12.2 11.9 10 15 10C17.3 10 19.3 11.2 20.3 13C20.8 12.7 21.4 12.5 22 12.5C24.2 12.5 26 14.3 26 16.5C26 16.8 25.9 17.1 25.8 17.4C26.5 18 27 18.9 27 20C27 21.7 25.7 23 24 23L9.5 23Z"
        fill="url(#c-cloud-vol)"
        className="cloud-body"
      />

      {/* Cloud Puff Highlights */}
      <ellipse cx="14.5" cy="13.5" rx="3.5" ry="2" fill="#FFFFFF" opacity="0.8" />
      <ellipse cx="21" cy="15.5" rx="2" ry="1.2" fill="#FFFFFF" opacity="0.7" />

      {/* Front Flowing Breeze Stream */}
      <path
        d="M18 19C21 19 24 20.5 29 20.5"
        stroke="#0284C7"
        strokeWidth="1.4"
        strokeLinecap="round"
        className="wind-trail-front"
      />
    </svg>
  );
}

// 3. Realistic Water Droplet & Flowing Wave Icon
function RealisticWaterIcon({ className = '' }) {
  return (
    <svg
      className={`compact-elem-icon compact-elem-icon--water ${className}`}
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="c-water-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00D2D3" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#0284C7" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0369A1" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="c-drop-grad" x1="16" y1="4" x2="16" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="25%" stopColor="#38BDF8" />
          <stop offset="65%" stopColor="#00D2D3" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
      </defs>

      {/* Ambient Fluid Glow */}
      <circle cx="16" cy="17" r="13" fill="url(#c-water-glow)" className="water-glow-circle" />

      {/* Concentric Surface Ripple Waves */}
      <ellipse
        cx="16"
        cy="25"
        rx="12"
        ry="4.5"
        stroke="#00D2D3"
        strokeWidth="1"
        strokeOpacity="0.4"
        className="water-ripple-outer"
      />
      <ellipse
        cx="16"
        cy="25"
        rx="8"
        ry="3"
        stroke="#38BDF8"
        strokeWidth="1.2"
        strokeOpacity="0.65"
        className="water-ripple-inner"
      />

      {/* Realistic Teardrop / Droplet */}
      <path
        d="M16 4.5C16 4.5 9 14.5 9 20C9 23.8 12.1 27 16 27C19.9 27 23 23.8 23 20C23 14.5 16 4.5 16 4.5Z"
        fill="url(#c-drop-grad)"
        className="water-drop-body"
      />

      {/* Curved Specular Reflection Gloss */}
      <path
        d="M13 14C12 16 12 19 13.5 21"
        stroke="#FFFFFF"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.85"
        className="water-drop-reflex"
      />
      <circle cx="17.5" cy="11.5" r="0.9" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
}

// 4. Realistic Mineral Stone / Rock Formation Icon
function RealisticEarthIcon({ className = '' }) {
  return (
    <svg
      className={`compact-elem-icon compact-elem-icon--earth ${className}`}
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="c-earth-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D6AD54" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#A16207" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#451A03" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="c-rock-top" x1="16" y1="5" x2="16" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="50%" stopColor="#D6AD54" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="c-rock-left" x1="7" y1="12" x2="16" y2="27" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#92400E" />
          <stop offset="60%" stopColor="#78350F" />
          <stop offset="100%" stopColor="#451A03" />
        </linearGradient>
        <linearGradient id="c-rock-right" x1="25" y1="12" x2="16" y2="27" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D6AD54" />
          <stop offset="50%" stopColor="#B45309" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
      </defs>

      {/* Earth Amber Glow */}
      <circle cx="16" cy="16" r="13" fill="url(#c-earth-glow)" className="earth-glow-circle" />

      {/* Faceted Geological Stone Formation */}
      <g className="stone-cluster">
        {/* Top Facet */}
        <polygon points="16,5 25,12 16,18 7,12" fill="url(#c-rock-top)" className="rock-facet-top" />

        {/* Left Shaded Geological Slope */}
        <polygon points="7,12 16,18 16,28 6,21" fill="url(#c-rock-left)" className="rock-facet-left" />

        {/* Right Illuminated Geological Slope */}
        <polygon points="16,18 25,12 26,21 16,28" fill="url(#c-rock-right)" className="rock-facet-right" />

        {/* Minor Satellite Crystal / Stone on side */}
        <polygon points="24,20 28,18 29,23 25,25" fill="#D6AD54" opacity="0.85" />
        <polygon points="5,19 8,17 7,23 4,22" fill="#78350F" opacity="0.75" />

        {/* Mineral Strata Edge Highlights */}
        <line x1="16" y1="5" x2="16" y2="18" stroke="#FEF3C7" strokeWidth="0.8" opacity="0.7" />
        <line x1="7" y1="12" x2="16" y2="18" stroke="#FEF3C7" strokeWidth="0.8" opacity="0.6" />
        <line x1="25" y1="12" x2="16" y2="18" stroke="#FEF3C7" strokeWidth="0.8" opacity="0.8" />
        <line x1="16" y1="18" x2="16" y2="28" stroke="#D6AD54" strokeWidth="0.8" opacity="0.7" />
      </g>
    </svg>
  );
}

/**
 * FOUR COMPACT ELEMENTAL GUILD NAVIGATION CARDS
 * CARD 01 — FIRE:  BURN  -> Dev's Guild (/guilds/dev)
 * CARD 02 — AIR:   FLY   -> Intelligence Guild (/guilds/intelligence)
 * CARD 03 — WATER: DIVE  -> Fusion X (/guilds/fusion-x)
 * CARD 04 — EARTH: RUN   -> AlgoCrew (/guilds/algocrew)
 */
export const GUILD_CARDS_DATA = [
  {
    elementId: 'fire',
    guildId: 'devs-guild',
    label: 'BURN',
    guildName: "Dev's Guild",
    route: '/guilds/dev',
    hashAnchor: 'devs-guild',
    themeColor: '#C8102E',
    accentColor: '#FF5722',
    iconComponent: RealisticFlameIcon,
    shortMeaning: 'Architecture & Systems',
  },
  {
    elementId: 'air',
    guildId: 'intelligence-guild',
    label: 'FLY',
    guildName: 'Intelligence Guild',
    route: '/guilds/intelligence',
    hashAnchor: 'intelligence-guild',
    themeColor: '#00A8FF',
    accentColor: '#70A1FF',
    iconComponent: RealisticAirIcon,
    shortMeaning: 'AI, ML & Neural Networks',
  },
  {
    elementId: 'water',
    guildId: 'fusion-x',
    label: 'DIVE',
    guildName: 'Fusion X',
    route: '/guilds/fusion-x',
    hashAnchor: 'fusion-x',
    themeColor: '#00D2D3',
    accentColor: '#01A3A4',
    iconComponent: RealisticWaterIcon,
    shortMeaning: 'Embedded & Innovations',
  },
  {
    elementId: 'earth',
    guildId: 'algocrew',
    label: 'RUN',
    guildName: 'AlgoCrew',
    route: '/guilds/algocrew',
    hashAnchor: 'algocrew',
    themeColor: '#C49A58',
    accentColor: '#D6AD54',
    iconComponent: RealisticEarthIcon,
    shortMeaning: 'Algorithms & Structures',
  },
];

export default function CompactGuildNavCards({ activeGuildId = 'devs-guild', className = '' }) {
  const location = useLocation();
  const isWorkingGuildsPage = location.pathname.includes('/working-guilds');

  const handleCardClick = (e, card) => {
    // If on /working-guilds, smooth scroll directly to the matching chapter panel!
    if (isWorkingGuildsPage) {
      e.preventDefault();
      const el = document.getElementById(card.hashAnchor);
      if (el) {
        const navHeight = 76;
        const targetY = window.pageYOffset + el.getBoundingClientRect().top - navHeight - 12;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
        // Update hash in address bar without jump
        window.history.replaceState(null, '', `#${card.hashAnchor}`);
      }
    }
  };

  return (
    <nav
      className={`compact-guild-nav-container ${className}`}
      aria-label="Working Guilds Elemental Navigation"
    >
      <div className="compact-guild-nav-grid" role="menubar">
        {GUILD_CARDS_DATA.map((card) => {
          const isActive = activeGuildId === card.guildId;
          const Icon = card.iconComponent;

          return (
            <Link
              key={card.elementId}
              to={card.route}
              onClick={(e) => handleCardClick(e, card)}
              className={`compact-guild-card compact-guild-card--${card.elementId} ${
                isActive ? 'is-active' : ''
              }`}
              style={{
                '--card-theme': card.themeColor,
                '--card-accent': card.accentColor,
              }}
              role="menuitem"
              aria-label={`${card.label} — ${card.guildName}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Left Realistic Icon Container */}
              <div className="compact-card-icon-wrap" aria-hidden="true">
                <Icon />
              </div>

              {/* Text Info Block */}
              <div className="compact-card-info">
                <span className="compact-card-label">{card.label}</span>
                <span className="compact-card-guild">{card.guildName}</span>
              </div>

              {/* Active Indicator Pip */}
              {isActive && (
                <span className="compact-card-active-pip" aria-hidden="true" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
