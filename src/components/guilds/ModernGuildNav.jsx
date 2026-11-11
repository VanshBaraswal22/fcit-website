import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * MODERN GUILD NAVIGATION DOCK
 * Contemporary creative agency dock styled according to the 4 new visual identities:
 * 01. DEV'S GUILD        — Electric Blue (#0066FF / #00F0FF)
 * 02. INTELLIGENCE GUILD — Deep Violet & Lavender (#B892FF / #FF70A6)
 * 03. ALGOCREW           — Acid Lime & Charcoal (#CCFF00 / #121415)
 * 04. FUSION X           — Coral & Tangerine (#FF5E5B / #FFAA00)
 */

export const GUILD_NAVIGATION_ITEMS = [
  {
    id: 'devs-guild',
    number: '01',
    name: "DEV'S GUILD",
    discipline: 'SOFTWARE ARCHITECTURE',
    color: '#0066FF',
    accent: '#00F0FF',
    route: '/guilds/dev',
    hashAnchor: 'devs-guild',
    glyph: '⌥',
  },
  {
    id: 'intelligence-guild',
    number: '02',
    name: 'INTELLIGENCE GUILD',
    discipline: 'AI & NEURAL NETWORKS',
    color: '#9D4EDD',
    accent: '#FF70A6',
    route: '/guilds/intelligence',
    hashAnchor: 'intelligence-guild',
    glyph: '✦',
  },
  {
    id: 'algocrew',
    number: '03',
    name: 'ALGOCREW',
    discipline: 'ALGORITHMS & LOGIC',
    color: '#CCFF00',
    accent: '#3E8E58',
    route: '/guilds/algocrew',
    hashAnchor: 'algocrew',
    glyph: '◈',
  },
  {
    id: 'fusion-x',
    number: '04',
    name: 'FUSION X',
    discipline: 'INNOVATION & EMBEDDED',
    color: '#FF5E5B',
    accent: '#FFAA00',
    route: '/guilds/fusion-x',
    hashAnchor: 'fusion-x',
    glyph: '◎',
  },
];

export default function ModernGuildNav({ activeGuildId = 'devs-guild', className = '' }) {
  const location = useLocation();
  const isWorkingGuildsPage = location.pathname.includes('/working-guilds');

  const handleNavClick = (e, item) => {
    if (isWorkingGuildsPage) {
      e.preventDefault();
      const el = document.getElementById(item.hashAnchor);
      if (el) {
        const navHeight = 76;
        const targetY = window.pageYOffset + el.getBoundingClientRect().top - navHeight - 12;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
        window.history.replaceState(null, '', `#${item.hashAnchor}`);
      }
    }
  };

  return (
    <nav
      className={`modern-guild-nav-dock ${className}`}
      aria-label="Working Guilds Navigation Dock"
    >
      <div className="modern-nav-grid" role="menubar">
        {GUILD_NAVIGATION_ITEMS.map((item) => {
          const isActive = activeGuildId === item.id;
          return (
            <Link
              key={item.id}
              to={item.route}
              onClick={(e) => handleNavClick(e, item)}
              className={`modern-nav-card ${isActive ? 'is-active' : ''}`}
              style={{
                '--item-color': item.color,
                '--item-accent': item.accent,
              }}
              role="menuitem"
              aria-label={`${item.number}. ${item.name} — ${item.discipline}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="modern-nav-card__indicator" aria-hidden="true" />
              <div className="modern-nav-card__content">
                <div className="card-topline">
                  <span className="card-number">{item.number}</span>
                  <span className="card-glyph">{item.glyph}</span>
                </div>
                <div className="card-identity">
                  <span className="card-name">{item.name}</span>
                  <span className="card-discipline">{item.discipline}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
