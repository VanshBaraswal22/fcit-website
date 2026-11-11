import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { isHeroIntroCompleted, setHeroIntroCompleted, subscribeHeroIntro } from '../utils/introState';
import '../styles/navbarEntrance.css';
import '../styles/guildDropdown.css';

// Module-scoped flag so entrance animation runs ONCE per page session / refresh / direct load,
// and persists across client-side SPA routing.
let hasPlayedEntranceAnimation = false;

export const WORKING_GUILDS_OPTIONS = [
  {
    id: 'devs-guild',
    name: "DEV'S GUILD",
    domain: 'Software engineering & architecture',
    path: '/guilds/dev',
    num: '01',
  },
  {
    id: 'intelligence-guild',
    name: 'INTELLIGENCE GUILD',
    domain: 'Artificial intelligence & machine learning',
    path: '/guilds/intelligence',
    num: '02',
  },
  {
    id: 'algocrew',
    name: 'ALGOCREW',
    domain: 'Algorithms & competitive programming',
    path: '/guilds/algocrew',
    num: '03',
  },
  {
    id: 'fusion-x',
    name: 'FUSION X',
    domain: 'Interdisciplinary research & innovation',
    path: '/guilds/fusion-x',
    num: '04',
  },
];

export function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '';
  const isTeamPage = location.pathname === '/team';
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [guildDropdownOpen, setGuildDropdownOpen] = useState(false);
  const [mobileGuildOpen, setMobileGuildOpen] = useState(false);
  const [moreDropdown, setMoreDropdown] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const guildDropdownRef = useRef(null);
  const guildCloseTimerRef = useRef(null);

  const handleGuildEnter = () => {
    if (guildCloseTimerRef.current) {
      clearTimeout(guildCloseTimerRef.current);
      guildCloseTimerRef.current = null;
    }
    setGuildDropdownOpen(true);
  };

  const handleGuildLeave = () => {
    if (guildCloseTimerRef.current) {
      clearTimeout(guildCloseTimerRef.current);
    }
    guildCloseTimerRef.current = setTimeout(() => {
      setGuildDropdownOpen(false);
    }, 100);
  };

  const handleGuildToggleClick = (e) => {
    e.stopPropagation();
    if (guildCloseTimerRef.current) {
      clearTimeout(guildCloseTimerRef.current);
      guildCloseTimerRef.current = null;
    }
    setGuildDropdownOpen((prev) => !prev);
  };

  // Check reduced-motion preference immediately
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

  // Track navbar lifecycle: 'hidden' | 'entrance' | 'settled'
  const [navState, setNavState] = useState(() => {
    if (prefersReducedMotion || hasPlayedEntranceAnimation) {
      return 'settled';
    }
    if (!isHomePage) {
      return 'entrance';
    }
    return isHeroIntroCompleted() ? 'settled' : 'hidden';
  });

  // If directly loaded on an internal route, mark intro as completed in state
  useEffect(() => {
    if (!isHomePage && !isHeroIntroCompleted()) {
      setHeroIntroCompleted(true, 'internal-route-direct-mount');
    }
  }, [isHomePage]);

  // Synchronise navbar entrance with landing intro completion
  useEffect(() => {
    if (prefersReducedMotion) {
      setNavState('settled');
      hasPlayedEntranceAnimation = true;
      return;
    }

    if (hasPlayedEntranceAnimation) {
      setNavState('settled');
      return;
    }

    if (navState === 'entrance') {
      const timer = setTimeout(() => {
        setNavState('settled');
        hasPlayedEntranceAnimation = true;
      }, 1250);
      return () => clearTimeout(timer);
    }

    if (navState === 'hidden') {
      if (isHeroIntroCompleted()) {
        setNavState('entrance');
        return;
      }

      const unsubscribe = subscribeHeroIntro((completed) => {
        if (completed && !hasPlayedEntranceAnimation) {
          setNavState('entrance');
        }
      });

      const fallbackTimer = setTimeout(() => {
        if (!isHeroIntroCompleted()) {
          console.warn('[Navbar] Safe fallback triggered: hero intro timed out or was interrupted.');
          setHeroIntroCompleted(true, 'fallback-timeout-3.5s');
        }
      }, 3500);

      return () => {
        unsubscribe();
        clearTimeout(fallbackTimer);
      };
    }
  }, [navState, prefersReducedMotion]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (isTeamPage) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isTeamPage]);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setMoreDropdown(false);
    setGuildDropdownOpen(false);
  }, [location.pathname]);

  // Close Working Guilds dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (guildDropdownRef.current && !guildDropdownRef.current.contains(event.target)) {
        setGuildDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (guildCloseTimerRef.current) clearTimeout(guildCloseTimerRef.current);
    };
  }, []);

  const primaryLinksBefore = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
  ];

  const primaryLinksAfter = [
    { label: 'Projects', path: '/projects' },
    { label: 'Events', path: '/events' },
    { label: 'People', path: '/team' },
  ];

  const getIsActive = (targetPath) => {
    const current = location.pathname.replace(/\/+$/, '') || '/';
    const target = targetPath.split('#')[0].replace(/\/+$/, '') || '/';
    if (target === '/') {
      return current === '/';
    }
    return current === target || current.startsWith(target + '/');
  };

  const isGuildActive = location.pathname.startsWith('/guilds') || location.pathname.startsWith('/working-guilds');

  const handleNavLinkClick = (e, path) => {
    if (path.includes('#')) {
      const [route, hash] = path.split('#');
      const isCurrentRoute = (route === '' || route === '/')
        ? (location.pathname === '/' || location.pathname === '')
        : location.pathname === route;

      if (isCurrentRoute) {
        e.preventDefault();
        const target = document.getElementById(hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', path);
        }
      }
    }
  };

  const moreLinks = [
    { label: 'Achievements', path: '/achievements', num: '07' },
    { label: 'Gallery', path: '/gallery', num: '08' },
    { label: 'Announcements', path: '/announcements', num: '09' },
    { label: 'Publications', path: '/publications', num: '10' },
    { label: 'Contact', path: '/contact', num: '11' },
  ];

  const isMoreActive = moreLinks.some(link => getIsActive(link.path));

  return (
    <>
      <header
        className={`site-header ${
          navState === 'hidden'
            ? 'nav-hidden'
            : navState === 'entrance'
            ? 'nav-entrance'
            : 'nav-settled'
        } ${isScrolled ? 'is-scrolled' : ''} ${isTeamPage ? 'is-team-page' : ''}`}
      >
        <div className="section-shell header-container">
          {/* Brand Logo & Editorial Wordmark */}
          <Link to="/" className="brand-editorial" aria-label="FCIT Homepage">
            <img
              src="/images/fcit-logo-circle.png"
              alt="FCIT Crest Logo"
              className="brand-editorial-logo"
              width="48"
              height="48"
            />
            <div className="brand-editorial-text">
              <span className="brand-editorial-name">FCIT</span>
              <span className="brand-editorial-sub">HBTU KANPUR</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop" aria-label="Primary Navigation">
            {primaryLinksBefore.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                onClick={(e) => handleNavLinkClick(e, link.path)}
                className={() => `nav-link-editorial ${getIsActive(link.path) ? 'is-active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}

            {/* Working Guilds Dropdown Trigger & Editorial Menu */}
            <div
              ref={guildDropdownRef}
              className="nav-dropdown-wrapper"
              onMouseEnter={handleGuildEnter}
              onMouseLeave={handleGuildLeave}
            >
              <button
                type="button"
                className={`nav-link-editorial nav-dropdown-trigger ${isGuildActive ? 'is-active' : ''}`}
                onClick={handleGuildToggleClick}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setGuildDropdownOpen(false);
                }}
                aria-expanded={guildDropdownOpen}
                aria-haspopup="true"
                aria-controls="working-guilds-dropdown"
              >
                <span>Working Guilds</span>
                <span
                  className={`dropdown-chevron ${guildDropdownOpen ? 'is-rotated' : ''}`}
                  aria-hidden="true"
                >
                  ▾
                </span>
              </button>

              <div
                id="working-guilds-dropdown"
                className={`guild-editorial-dropdown ${guildDropdownOpen ? 'is-open' : ''}`}
                role="menu"
                aria-label="Working Guilds Navigation"
              >
                <div className="guild-dropdown-list">
                  {WORKING_GUILDS_OPTIONS.map((guild, idx) => {
                    const isItemActive =
                      location.pathname === guild.path ||
                      location.pathname === `${guild.path}/`;
                    return (
                      <NavLink
                        key={guild.id}
                        to={guild.path}
                        role="menuitem"
                        className={`guild-dropdown-item ${isItemActive ? 'is-current' : ''}`}
                        style={{ '--item-stagger': `${idx * 45}ms` }}
                        onClick={() => setGuildDropdownOpen(false)}
                      >
                        <div className="guild-item-row">
                          <span className="guild-item-heading">
                            <span className="guild-item-num">{guild.num} — </span>
                            <span className="guild-item-name">{guild.name}</span>
                          </span>
                          <span className="guild-item-arrow" aria-hidden="true">
                            →
                          </span>
                        </div>
                        <span className="guild-item-desc">{guild.domain}</span>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            </div>

            {primaryLinksAfter.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={(e) => handleNavLinkClick(e, link.path)}
                className={() => `nav-link-editorial ${getIsActive(link.path) ? 'is-active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}

            {/* More Dropdown */}
            <div
              className="nav-more-wrapper"
              style={{ position: 'relative' }}
              onMouseEnter={() => setMoreDropdown(true)}
              onMouseLeave={() => setMoreDropdown(false)}
            >
              <button
                type="button"
                className={`nav-link-editorial ${isMoreActive ? 'is-active' : ''}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                onClick={() => setMoreDropdown(!moreDropdown)}
                aria-expanded={moreDropdown}
              >
                <span>More</span>
                <span style={{ fontSize: '10px', transform: moreDropdown ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
              </button>

              {moreDropdown && (
                <div
                  className="nav-more-menu"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '-16px',
                    width: '200px',
                    backgroundColor: 'var(--color-warm-ivory)',
                    border: '1px solid var(--border-medium)',
                    boxShadow: '0 12px 32px rgba(8, 7, 6, 0.12)',
                    padding: '8px 0',
                    zIndex: 950,
                  }}
                >
                  <div style={{ padding: '6px 16px 8px', borderBottom: '1px solid var(--border-light)', fontFamily: 'var(--font-sans)', fontSize: '11px', letterSpacing: '0.08em', color: 'var(--color-ink-charcoal)', fontWeight: 600, textTransform: 'uppercase' }}>
                    Community
                  </div>
                  {moreLinks.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={() => `dropdown-item ${getIsActive(item.path) ? 'is-active' : ''}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 16px',
                        fontSize: '0.875rem',
                        color: 'var(--color-carbon-black)',
                        transition: 'background 0.2s, color 0.2s',
                      }}
                    >
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Toggle & Institutional Crest */}
          <div className="header-actions">
            <button
              type="button"
              className={`mobile-menu-btn ${mobileOpen ? 'is-open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close navigation drawer' : 'Open navigation drawer'}
              aria-expanded={mobileOpen}
            >
              <span />
              <span />
              <span />
            </button>

            {/* University Crest on Top Right of Banner */}
            <a
              href="https://hbtu.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="header-hbtu-seal-link"
              title="Harcourt Butler Technical University (HBTU), Kanpur"
              aria-label="HBTU Official University Website"
            >
              <img
                src="/images/hbtu-seal.png"
                alt="Harcourt Butler Technical University Kanpur Official Seal"
                className="header-hbtu-seal-img"
                width="34"
                height="46"
                loading="eager"
              />
            </a>
          </div>
        </div>
        {isTeamPage && (
          <div
            className="team-nav-scroll-indicator"
            style={{ width: `${scrollProgress}%` }}
            aria-hidden="true"
          />
        )}
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileOpen ? 'is-open' : ''}`}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-crimson-red)', letterSpacing: '0.14em', marginBottom: '20px' }}>
          TABLE OF CONTENTS · FCIT
        </div>
        <nav className="mobile-nav-links">
          {primaryLinksBefore.map((link, idx) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              onClick={(e) => {
                handleNavLinkClick(e, link.path);
                setMobileOpen(false);
              }}
              className={() => `mobile-nav-item ${getIsActive(link.path) ? 'is-active' : ''}`}
            >
              <span>{link.label}</span>
              <small>{String(idx + 1).padStart(2, '0')}</small>
            </NavLink>
          ))}

          {/* Mobile Working Guilds Accordion */}
          <div className="mobile-guild-group">
            <button
              type="button"
              className={`mobile-nav-item mobile-guild-toggle ${isGuildActive ? 'is-active' : ''}`}
              onClick={() => setMobileGuildOpen((prev) => !prev)}
              aria-expanded={mobileGuildOpen}
            >
              <span>Working Guilds</span>
              <span className="mobile-toggle-glyph" aria-hidden="true">
                {mobileGuildOpen ? '−' : '+'}
              </span>
            </button>

            {mobileGuildOpen && (
              <div className="mobile-guild-subitems">
                {WORKING_GUILDS_OPTIONS.map((guild) => (
                  <NavLink
                    key={guild.id}
                    to={guild.path}
                    onClick={() => setMobileOpen(false)}
                    className={() => `mobile-guild-subitem ${location.pathname === guild.path ? 'is-active' : ''}`}
                  >
                    <div className="mobile-subitem-content">
                      <div className="mobile-guild-heading">
                        <span className="mobile-guild-num">{guild.num} — </span>
                        <span className="mobile-guild-name">{guild.name}</span>
                      </div>
                      <span className="mobile-guild-desc">{guild.domain}</span>
                    </div>
                    <span className="mobile-guild-arrow" aria-hidden="true">
                      →
                    </span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {primaryLinksAfter.map((link, idx) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={(e) => {
                handleNavLinkClick(e, link.path);
                setMobileOpen(false);
              }}
              className={() => `mobile-nav-item ${getIsActive(link.path) ? 'is-active' : ''}`}
            >
              <span>{link.label}</span>
              <small>{String(idx + 4).padStart(2, '0')}</small>
            </NavLink>
          ))}

          {moreLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={() => `mobile-nav-item ${getIsActive(link.path) ? 'is-active' : ''}`}
            >
              <span>{link.label}</span>
              <small>{link.num}</small>
            </NavLink>
          ))}
        </nav>

        <div className="mobile-drawer-footer">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--color-graphite)', textAlign: 'center', letterSpacing: '0.1em' }}>
            HARCOURT BUTLER TECHNICAL UNIVERSITY · KANPUR
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
