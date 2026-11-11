import React, { useState, useEffect } from 'react';

/**
 * ShieldLogoIntro
 * Animated institutional shield draw (once per session):
 * - Stroke-dashoffset draw: Left half in Heritage Gold (#D6B33F), right half in Dark Navy (#0B1F3F)
 * - Central divider and inner academic heraldry
 * - "FCIT" lettering and campus subtitle fades in smoothly
 * - Checks sessionStorage('fcit_shield_drawn') so it animates only once per session
 * - Respects prefers-reduced-motion by rendering the fully completed shield instantly
 */
export function ShieldLogoIntro({ className = '', style = {} }) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isDrawn, setIsDrawn] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sessionDrawn = Boolean(sessionStorage.getItem('fcit_shield_drawn'));

    if (reducedMotion || sessionDrawn) {
      setHasAnimated(true);
      setIsDrawn(true);
      return;
    }

    // Trigger stroke draw animation once per session
    const timer = setTimeout(() => {
      setIsDrawn(true);
      sessionStorage.setItem('fcit_shield_drawn', 'true');
    }, 1250);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`shield-intro-container ${isDrawn ? 'is-drawn' : 'is-drawing'} ${hasAnimated ? 'instant' : ''} ${className}`}
      style={style}
      aria-label="FCIT Crest Shield"
    >
      <div className="shield-svg-box">
        <svg
          viewBox="0 0 100 120"
          width="76"
          height="92"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shield-svg"
        >
          {/* Background subtle parchment shield tone */}
          <path
            d="M50 8 C68 8, 86 16, 92 28 C92 72, 70 102, 50 114 C30 102, 8 72, 8 28 C14 16, 32 8, 50 8 Z"
            fill="var(--color-warm-ivory)"
            stroke="none"
          />

          {/* LEFT HALF SHIELD OUTLINE: HERITAGE GOLD (#D6B33F) */}
          <path
            d="M50 8 C32 8, 14 16, 8 28 C8 72, 30 102, 50 114"
            className="shield-stroke shield-stroke--gold"
            stroke="var(--color-heritage-gold)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* RIGHT HALF SHIELD OUTLINE: VERY DARK NAVY (#0B1F3F) */}
          <path
            d="M50 8 C68 8, 86 16, 92 28 C92 72, 70 102, 50 114"
            className="shield-stroke shield-stroke--navy"
            stroke="var(--color-dark-navy)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* CENTRAL HERITAGE DIVIDER */}
          <line
            x1="50"
            y1="14"
            x2="50"
            y2="108"
            className="shield-stroke shield-stroke--divider"
            stroke="var(--color-heritage-gold)"
            strokeWidth="1.8"
            strokeDasharray="3 3"
          />

          {/* INNER HERALDRY: LEFT GOLD EMBLEM (Open Book & Torch) */}
          <path
            d="M24 44 C34 40, 42 43, 46 48 L46 72 C42 68, 34 65, 24 68 Z"
            className="shield-inner shield-inner--gold"
            fill="none"
            stroke="var(--color-heritage-gold)"
            strokeWidth="1.8"
          />

          {/* INNER HERALDRY: RIGHT NAVY EMBLEM (Computing Binary & Mesh) */}
          <path
            d="M54 48 C58 43, 66 40, 76 44 L76 68 C66 65, 58 68, 54 72 Z"
            className="shield-inner shield-inner--navy"
            fill="none"
            stroke="var(--color-dark-navy)"
            strokeWidth="1.8"
          />

          {/* FOUNDING DATE ACCENT 1921 */}
          <text
            x="50"
            y="92"
            textAnchor="middle"
            className="shield-inner-text"
            fill="var(--color-dark-navy)"
            fontSize="7"
            fontFamily="var(--font-mono)"
            letterSpacing="0.16em"
            fontWeight="600"
          >
            EST · 1921
          </text>
        </svg>
      </div>

      {/* FCIT LETTERING FADES IN ONCE STROKE DRAW COMPLETES */}
      <div className="shield-lettering">
        <span className="shield-lettering-title">FCIT</span>
        <span className="shield-lettering-sub">HBTU KANPUR</span>
      </div>
    </div>
  );
}

export default ShieldLogoIntro;
