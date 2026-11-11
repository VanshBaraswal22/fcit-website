import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import GuildInteractiveStage from '../components/guilds/GuildInteractiveStage';
import { GUILDS_DETAILED } from '../data/guildsDetailedData';
import '../styles/guildStory.css';
import '../styles/homeGuildsRedesign.css';
import '../styles/guildEnrichment.css';
import '../styles/guildWorlds.css';

const GUILDS = GUILDS_DETAILED;

export function WorkingGuildsPage() {
  const [activeGuild, setActiveGuild] = useState('devs-guild');
  const [visibleGuilds, setVisibleGuilds] = useState({
    'devs-guild': true,
    'intelligence-guild': false,
    algocrew: false,
    'fusion-x': false,
  });
  const [revealedGuilds, setRevealedGuilds] = useState({
    'devs-guild': true,
    'intelligence-guild': false,
    algocrew: false,
    'fusion-x': false,
  });
  const [isTabVisible, setIsTabVisible] = useState(true);
  const panelRefs = useRef([]);

  // Scroll to top or handle hash anchor upon landing on page
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        const timer = setTimeout(() => {
          const navHeight = 76;
          const targetY = window.pageYOffset + el.getBoundingClientRect().top - navHeight - 12;
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }, 300);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  // Performance Guard: Tab Visibility Listener
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Bi-directional Scroll Tracking for Sticky Stacked Panels
  useEffect(() => {
    const nodes = panelRefs.current.filter(Boolean);
    if (!nodes.length) return;

    let ticking = false;

    const updatePanels = () => {
      ticking = false;
      const viewportHeight = window.innerHeight || 800;
      const navOffset = 80;
      const triggerLine = navOffset + 140;

      let currentActive = 'devs-guild';
      const newVisible = {};
      const newRevealed = {};

      nodes.forEach((node) => {
        const id = node.dataset.guildId;
        if (!id) return;
        const rect = node.getBoundingClientRect();

        // Is this panel currently visible in the viewport?
        const isIntersecting = rect.bottom > navOffset && rect.top < viewportHeight;
        newVisible[id] = isIntersecting;

        // Permanently mark revealed
        if (rect.top < viewportHeight * 0.95 && rect.bottom > 0) {
          newRevealed[id] = true;
        }

        // Active chapter tracking
        if (rect.top <= triggerLine && rect.bottom > navOffset + 80) {
          currentActive = id;
        }
      });

      setActiveGuild(currentActive);

      setVisibleGuilds((prev) => {
        let changed = false;
        for (const k in newVisible) {
          if (prev[k] !== newVisible[k]) {
            changed = true;
            break;
          }
        }
        return changed ? { ...prev, ...newVisible } : prev;
      });

      setRevealedGuilds((prev) => {
        let changed = false;
        const updated = { ...prev };
        for (const k in newRevealed) {
          if (!updated[k]) {
            updated[k] = true;
            changed = true;
          }
        }
        return changed ? updated : prev;
      });
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updatePanels);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    updatePanels();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="working-guilds-page-wrapper">
      {/* 1. CREATIVE AGENCY HERO INTRO */}
      <header className="modern-guild-intro" id="guilds-intro">
        <div className="modern-intro-meta">
          <Breadcrumbs items={[{ label: 'WORKING GUILDS' }]} />
          <span className="meta-pill">4 AUTONOMOUS DISCIPLINES</span>
        </div>

        <h1 id="guild-story-heading" className="modern-intro-title">
          FOUR DISCIPLINES.<br />
          <em>ONE FRATERNITY.</em>
        </h1>

        <p className="modern-intro-desc">
          An engineering culture shaped by four autonomous student disciplines under the
          Department of Computer Science &amp; Engineering, Harcourt Butler Technical University, Kanpur.
          Explore interactive software architecture, cognitive neural networks, algorithmic complexity,
          and experimental innovation.
        </p>
      </header>

      {/* 2. FOUR DISTINCT INTERACTIVE WORLDS (ASYMMETRIC COMPOSITIONS) */}
      <main className="modern-guild-stack" id="working-guilds-stack">
        {GUILDS.map((guild, index) => {
          const isActive = activeGuild === guild.id;
          const isPanelInView = (!!visibleGuilds[guild.id] || isActive) && isTabVisible;
          const hasRevealed = !!revealedGuilds[guild.id] || isActive || isPanelInView;

          const panelThemeClass =
            guild.id === 'devs-guild'
              ? 'modern-guild-panel--dev'
              : guild.id === 'intelligence-guild'
              ? 'modern-guild-panel--intelligence'
              : guild.id === 'algocrew'
              ? 'modern-guild-panel--algo'
              : 'modern-guild-panel--fusion';

          const targetRoute =
            guild.id === 'devs-guild'
              ? '/guilds/dev'
              : guild.id === 'intelligence-guild'
              ? '/guilds/intelligence'
              : guild.id === 'algocrew'
              ? '/guilds/algocrew'
              : '/guilds/fusion-x';

          return (
            <article
              key={guild.id}
              id={guild.id}
              data-guild-id={guild.id}
              ref={(node) => {
                panelRefs.current[index] = node;
              }}
              className={`modern-guild-panel ${panelThemeClass} ${isActive ? 'is-active' : ''} ${
                isPanelInView ? 'is-in-view' : ''
              } ${hasRevealed ? 'has-revealed' : ''}`}
              style={{ '--panel-index': index }}
              aria-label={`Chapter ${guild.number}: ${guild.name}`}
            >
              {/* Panel Topline */}
              <div className="panel-topline">
                <span className="chapter-tag">
                  <span className="chapter-pip" />
                  CHAPTER {guild.number} // 04 · {guild.discipline || guild.domain}
                </span>
                <span className="chapter-index">0{index + 1} / 04</span>
              </div>

              {/* Monumental Asymmetric Typography Block */}
              <div className="panel-headline-block">
                <h2 className="panel-guild-title">
                  {guild.id === 'devs-guild' && (
                    <>
                      DEV'S <span className="accent-title-word">GUILD</span>
                    </>
                  )}
                  {guild.id === 'intelligence-guild' && (
                    <>
                      INTELLIGENCE <span className="accent-title-word">GUILD</span>
                    </>
                  )}
                  {guild.id === 'algocrew' && (
                    <>
                      ALGO <span className="accent-title-word">CREW</span>
                    </>
                  )}
                  {guild.id === 'fusion-x' && (
                    <>
                      FUSION <span className="accent-title-word">X</span>
                    </>
                  )}
                </h2>

                <p className="panel-tagline">{guild.tagline}</p>
                <div className="panel-domain-chip">{guild.domain}</div>
                <p className="panel-narrative">{guild.introduction || guild.description}</p>

                {/* Simple Editorial Explore Link */}
                <div className="guild-editorial-explore">
                  <Link
                    to={targetRoute}
                    className="guild-explore-link"
                    aria-label={`Explore ${guild.name} dedicated page`}
                  >
                    <span className="explore-label">EXPLORE GUILD</span>
                    <span className="explore-arrow" aria-hidden="true">→</span>
                    <span className="explore-underline" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Unique Interactive 2D World for this Guild */}
              <GuildInteractiveStage
                guild={guild}
                index={index}
                isPanelInView={isPanelInView || isActive}
                hasRevealed={hasRevealed}
              />
            </article>
          );
        })}
      </main>

      {/* 3. Conclusive Editorial Footer */}
      <footer className="guild-story-footer">
        <span className="footer-fraternity-label">FOUR DISCIPLINES. ONE FRATERNITY.</span>
        <Link to="/team" className="guild-footer-cta">
          <span>MEET THE GUILD DIRECTORS &amp; ENGINEERS</span>
          <span className="cta-arrow" aria-hidden="true">→</span>
        </Link>
      </footer>
    </div>
  );
}

export default WorkingGuildsPage;
