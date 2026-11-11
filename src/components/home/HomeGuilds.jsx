import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../animations/motion';
import GuildArtworkOverlay from '../guilds/GuildArtworkOverlay';
import '../../styles/guildStory.css';
import '../../styles/homeGuildsRedesign.css';
import '../../styles/guildElemental.css';

const GUILDS = [
  {
    id: 'devs-guild',
    fullName: "DEV'S GUILD",
    nameLines: ["DEV'S", "GUILD"],
    tagline: 'Build · Deploy · Scale',
    domain: 'Software Engineering',
    bgImage: '/images/guilds/01-devs-guild.webp',
    alt: "Dev's Guild — glowing architectural gateway and software engineering foundation",
    composition: 'lower-left',
    decorType: 'devs',
  },
  {
    id: 'intelligence-guild',
    fullName: 'INTELLIGENCE GUILD',
    nameLines: ['INTELLIGENCE', 'GUILD'],
    tagline: 'Teach Machines to Think',
    domain: 'Data Science & AI',
    bgImage: '/images/guilds/02-intelligence-guild.webp',
    alt: 'Intelligence Guild — classical marble bust and neural network constellation',
    composition: 'central',
    decorType: 'intelligence',
  },
  {
    id: 'algocrew',
    fullName: 'ALGOCREW',
    nameLines: ['ALGOCREW'],
    tagline: 'Think · Solve · Optimise',
    domain: 'Algorithms & Problem Solving',
    bgImage: '/images/guilds/03-algocrew.webp',
    alt: 'AlgoCrew — isometric geometric crystals and graph matrix backdrop',
    composition: 'asymmetric',
    decorType: 'algo',
  },
  {
    id: 'fusion-x',
    fullName: 'FUSION X',
    nameLines: ['FUSION X'],
    tagline: 'Research · Connect · Create',
    domain: 'Interdisciplinary Research',
    bgImage: '/images/guilds/04-fusion-x.webp',
    alt: 'Fusion X — celestial orbits and technological gyroscope research system',
    composition: 'spacious',
    decorType: 'fusion',
  },
];

export default function HomeGuilds() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = React.useState(true);

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === 'undefined') return;

    // IntersectionObserver to pause animations when cards are outside the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInView(entry.isIntersecting && !document.hidden);
      },
      { threshold: 0.08 }
    );
    observer.observe(section);

    // Pause when the browser tab is hidden
    const handleVisibility = () => {
      if (document.hidden) {
        setIsInView(false);
      } else if (section) {
        const rect = section.getBoundingClientRect();
        const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
        setIsInView(inViewport);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Respect prefers-reduced-motion
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const header = section.querySelector('.home-guilds-preview-header');
        const cards = gsap.utils.toArray('.home-guild-editorial-card', section);

        // Initial states set strictly via JS
        if (header) {
          gsap.set(header, { opacity: 0, y: 18 });
        }

        cards.forEach((card) => {
          const bgImg = card.querySelector('.home-guild-card__bg');
          const domainLabel = card.querySelector('.guild-domain-label');
          const titleLines = card.querySelectorAll('.guild-heading__line');
          const tagline = card.querySelector('.guild-tagline');
          const explore = card.querySelector('.guild-explore');

          // Clip card artwork into view initially & subtle upward displacement
          gsap.set(card, {
            opacity: 0,
            y: 32,
            clipPath: 'inset(12% 0% 0% 0%)',
          });

          // Artwork scales from 1.08 down to 1
          if (bgImg) {
            gsap.set(bgImg, { scale: 1.08 });
          }

          // Text elements hidden before artwork reveal
          if (domainLabel) {
            gsap.set(domainLabel, { opacity: 0, y: 10 });
          }
          if (titleLines.length) {
            gsap.set(titleLines, { yPercent: 110, opacity: 0 });
          }
          if (tagline) {
            gsap.set(tagline, { opacity: 0, y: 12 });
          }
          if (explore) {
            gsap.set(explore, { opacity: 0, x: -8 });
          }
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            toggleActions: 'play none none none',
            once: true,
          },
        });

        if (header) {
          tl.to(header, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
          });
        }

        // Sequential card reveal with ~130ms stagger
        cards.forEach((card, i) => {
          const bgImg = card.querySelector('.home-guild-card__bg');
          const domainLabel = card.querySelector('.guild-domain-label');
          const titleLines = card.querySelectorAll('.guild-heading__line');
          const tagline = card.querySelector('.guild-tagline');
          const explore = card.querySelector('.guild-explore');

          const cardStartTime = (header ? 0.32 : 0) + i * 0.13;

          // 1. Reveal card container + clip-path transition
          tl.to(
            card,
            {
              opacity: 1,
              y: 0,
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 0.85,
              ease: 'power3.out',
            },
            cardStartTime
          );

          // 2. Scale artwork from ~1.08 down to 1
          if (bgImg) {
            tl.to(
              bgImg,
              {
                scale: 1,
                duration: 1.1,
                ease: 'power2.out',
              },
              cardStartTime
            );
          }

          // 3. Reveal text after artwork begins appearing
          const textStartTime = cardStartTime + 0.28;

          if (domainLabel) {
            tl.to(
              domainLabel,
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out',
              },
              textStartTime
            );
          }

          if (titleLines.length) {
            tl.to(
              titleLines,
              {
                yPercent: 0,
                opacity: 1,
                duration: 0.65,
                stagger: 0.08,
                ease: 'power3.out',
              },
              textStartTime + 0.06
            );
          }

          if (tagline) {
            tl.to(
              tagline,
              {
                opacity: 1,
                y: 0,
                duration: 0.55,
                ease: 'power2.out',
              },
              textStartTime + 0.18
            );
          }

          if (explore) {
            tl.to(
              explore,
              {
                opacity: 1,
                x: 0,
                duration: 0.45,
                ease: 'power2.out',
              },
              textStartTime + 0.24
            );
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Subtle directional parallax on mouse move (desktop fine pointer only)
  const handleMouseMove = (e) => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches) {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
      card.style.setProperty('--mouse-x', x.toFixed(3));
      card.style.setProperty('--mouse-y', y.toFixed(3));
    }
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty('--mouse-x', '0');
    card.style.setProperty('--mouse-y', '0');
  };

  return (
    <section
      ref={sectionRef}
      className="home-guilds-preview-section"
      id="guilds"
      aria-labelledby="home-guilds-preview-heading"
    >
      <div className="home-guilds-preview-container">
        {/* Header Block */}
        <header className="home-guilds-preview-header">
          <div className="home-guilds-topline">
            <span className="topline-tag">WORKING GUILDS</span>
          </div>

          <div className="home-guilds-header-split">
            <h2 id="home-guilds-preview-heading" className="home-guilds-title">
              FOUR DISCIPLINES.<br />
              <em>ONE FRATERNITY.</em>
            </h2>

            <div className="home-guilds-header-intro">
              <p className="home-guilds-lead-text">
                The technical heartbeat of FCIT is divided into four autonomous student disciplines,
                each dedicated to deep mastery, open-source creation, and peer mentorship under
                the Department of Computer Science &amp; IT at HBTU Kanpur.
              </p>
              <Link
                to="/guilds/dev"
                className="home-guilds-explore-btn home-guilds-explore-btn--top"
                aria-label="Explore all four Working Guilds in the dedicated monograph"
              >
                <span>EXPLORE ALL GUILDS</span>
                <span className="btn-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </header>

        {/* 4 Image-Led Luxury Editorial Guild Compositions */}
        <div className="home-guilds-preview-grid">
          {GUILDS.map((guild) => {
            const isSpacious = guild.composition === 'spacious';

            const targetRoute =
              guild.id === 'devs-guild'
                ? '/guilds/dev'
                : guild.id === 'intelligence-guild'
                ? '/guilds/intelligence'
                : guild.id === 'algocrew'
                ? '/guilds/algocrew'
                : '/guilds/fusion-x';

            return (
              <Link
                key={guild.id}
                to={targetRoute}
                className={`home-guild-editorial-card home-guild-card--${guild.composition} ${isInView ? 'is-in-view' : ''}`}
                aria-label={`${guild.fullName}: ${guild.domain}. ${guild.tagline}. Click to explore dedicated guild atlas.`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* 1. Full-Bleed Background Image Artwork */}
                <div className="home-guild-card__image-wrap">
                  <img
                    src={guild.bgImage}
                    alt={guild.alt}
                    className="home-guild-card__bg"
                    loading="lazy"
                    decoding="async"
                    width={835}
                    height={470}
                  />
                  {/* Subtle image treatment overlay & ambient warmth on hover */}
                  <div className="home-guild-card__art-sheen" aria-hidden="true" />
                </div>

                {/* 2. Guild-Specific Living Artwork Continuous Animation Overlay */}
                <GuildArtworkOverlay
                  guildType={guild.decorType}
                  variant="compact"
                  isInView={isInView}
                />

                {/* 3. Localised Gradient Scrim (strongest around text, fades towards illustration) */}
                <div
                  className={`home-guild-card__scrim home-guild-card__scrim--${guild.composition}`}
                  aria-hidden="true"
                />

                {/* 4. Fine Burgundy / Champagne Gold Accent Line (reveals on hover) */}
                <div className="home-guild-card__accent-line" aria-hidden="true" />

                {/* 5. Actual HTML/React Typography Layer */}
                <div className={`home-guild-card__content home-guild-card__content--${guild.composition}`}>
                  {/* Top Block: Domain label placed at top for spacious composition (Fusion X) */}
                  {isSpacious && (
                    <div className="home-guild-card__top">
                      <span className="guild-domain-label">{guild.domain}</span>
                    </div>
                  )}

                  {/* Main Block: Domain (for non-spacious), Heading, Tagline, Explore */}
                  <div className="home-guild-card__bottom">
                    {!isSpacious && (
                      <span className="guild-domain-label">{guild.domain}</span>
                    )}

                    <h3 className="guild-heading">
                      {guild.nameLines.map((line, idx) => (
                        <span key={idx} className="guild-heading__line-mask">
                          <span className="guild-heading__line">{line}</span>
                        </span>
                      ))}
                    </h3>

                    <p className="guild-tagline">{guild.tagline}</p>

                    <div className="guild-explore">
                      <span className="guild-explore__text">EXPLORE GUILD</span>
                      <span className="guild-explore__arrow" aria-hidden="true">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Conclusive Bottom Action Bar */}
        <footer className="home-guilds-preview-footer">
          <div className="home-guilds-footer-left">
            <span className="footer-monograph-label">FCIT ARCHITECTURAL MONOGRAPH</span>
            <span className="footer-monograph-desc">Interactive 4-chapter deep-dive with system blueprints &amp; domain charters</span>
          </div>

          <Link
            to="/guilds/dev"
            className="home-guilds-explore-btn home-guilds-explore-btn--bottom"
            aria-label="Navigate to dedicated Working Guilds page"
          >
            <span>EXPLORE ALL GUILDS</span>
            <span className="btn-arrow" aria-hidden="true">→</span>
          </Link>
        </footer>
      </div>
    </section>
  );
}
