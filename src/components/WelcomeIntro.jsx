import React, { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import '../styles/welcomeExperience.css';
import AtmosphericBackground from './AtmosphericBackground';

export function WelcomeIntro({ onComplete }) {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const [hasExited, setHasExited] = useState(false);

  // Subtle golden & ivory sparkle particles
  const particles = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: `${(i * 7.1 + 5) % 94}%`,
      top: `${(i * 9.3 + 12) % 86}%`,
      size: `${2 + (i % 4) * 1.5}px`,
      delay: `${(i * 0.4) % 3}s`,
    }));
  }, []);

  const handleFinish = () => {
    if (hasExited) return;
    setHasExited(true);

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Save session flag so it does not replay automatically on this session
    sessionStorage.setItem('fcit_welcome_intro_seen', 'true');

    // Smooth exit transition into the homepage
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.45,
        ease: 'power2.out',
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });
    } else if (onComplete) {
      onComplete();
    }
  };

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      handleFinish();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Auto-transition into homepage after sequence completes
          handleFinish();
        },
      });

      timelineRef.current = tl;

      // 0.0 - 0.7s: Atmosphere and ambient elements fade in smoothly
      tl.fromTo(
        '.welcome-logo-circle-wrapper',
        { opacity: 0, scale: 0.86, y: -10 },
        { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power3.out' },
        0.2
      );

      // 0.6 - 1.2s: Institutional label reveal
      tl.fromTo(
        '.welcome-institution-text',
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        0.6
      );

      // 1.0 - 2.0s: Primary headline line 1 reveal through mask
      tl.fromTo(
        '.headline-line--1',
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
        0.9
      );

      // 1.5 - 2.5s: Primary headline line 2 reveal through mask
      tl.fromTo(
        '.headline-line--2',
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
        1.3
      );

      // 2.0 - 2.8s: Secondary narrative line
      tl.fromTo(
        '.welcome-secondary-line',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
        1.8
      );

      // 2.3 - 3.2s: Enter FCIT button reveals with gentle presence
      tl.fromTo(
        ['.welcome-enter-btn', '.welcome-auto-countdown'],
        { opacity: 0, y: 16, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
        2.2
      );

      // Hold atmosphere for viewer engagement until ~5.2s
      tl.to({}, { duration: 2.4 });
    }, containerRef);

    // Keyboard support: Escape or Enter skips directly into the site
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        handleFinish();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      ctx.revert();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <aside
      ref={containerRef}
      className="welcome-overlay"
      role="region"
      aria-label="FCIT Welcome Experience"
    >
      {/* Premium Multi-layer Volumetric Cloud & Atmospheric Background */}
      <AtmosphericBackground variant="intro" interactive={true} showGrain={true} />

      {/* Subtle Dust / Sparkle Particles */}
      <div className="welcome-particles-canvas" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="welcome-particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Top Header Row with Skip Button */}
      <div className="welcome-top-bar">
        <button
          className="welcome-skip-btn"
          onClick={handleFinish}
          aria-label="Skip welcome animation and enter FCIT homepage immediately"
        >
          <span>ENTER FCIT</span> ✕
        </button>
      </div>

      {/* Central Choreographed Stage */}
      <div className="welcome-center-stage">
        {/* Genuine Circular FCIT Logo Mark */}
        <div className="welcome-logo-circle-wrapper">
          <img
            src="/images/fcit-logo-circle.png"
            alt="FCIT Circular Crest Emblem"
            className="welcome-logo-circle-img"
            width="150"
            height="150"
          />
        </div>

        {/* Institutional Accreditation */}
        <div className="welcome-institution-text">
          Harcourt Butler Technical University · Kanpur
        </div>

        {/* Cinematic Large Statement */}
        <h1 className="welcome-main-headline">
          <span className="headline-mask">
            <span className="headline-line headline-line--1">
              IDEAS IN <span className="crimson-italic">MOTION.</span>
            </span>
          </span>
          <span className="headline-mask">
            <span className="headline-line headline-line--2">
              PEOPLE. PASSION. POSSIBILITY.
            </span>
          </span>
        </h1>

        {/* Traveling Light Accent Rule */}
        <div className="welcome-accent-line-box" aria-hidden="true">
          <div className="welcome-accent-line-glow" />
        </div>

        {/* Secondary Subtitle */}
        <p className="welcome-secondary-line">
          The Fraternity of Computer Science &amp; Information Technology
        </p>
      </div>

      {/* Bottom Action Bar */}
      <div className="welcome-bottom-bar">
        <button
          className="welcome-enter-btn"
          onClick={handleFinish}
          aria-label="Enter FCIT homepage"
        >
          <span>ENTER THE COLLECTIVE</span>
          <span className="welcome-enter-btn-arrow" aria-hidden="true">→</span>
        </button>
        <span className="welcome-auto-countdown">
          OR PRESS ENTER / ESCAPE TO SKIP
        </span>
      </div>
    </aside>
  );
}

export default WelcomeIntro;
