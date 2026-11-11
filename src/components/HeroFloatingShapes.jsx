import React, { useEffect, useRef } from 'react';

/**
 * HeroFloatingShapes
 * Floating gold wireframe geometric shapes drifting slowly behind the hero.
 * CSS-only transforms (translate & rotate).
 * Uses IntersectionObserver to stop/pause off-screen infinite animations when scrolled out of view.
 */
export function HeroFloatingShapes() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.remove('is-offscreen');
          } else {
            el.classList.add('is-offscreen');
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="hero-floating-shapes infinite-anim-host" aria-hidden="true">
      {/* 1. Thin Gold Diamond */}
      <svg className="drift-shape drift-shape--diamond" viewBox="0 0 60 60" width="56" height="56">
        <rect
          x="12"
          y="12"
          width="36"
          height="36"
          fill="none"
          stroke="var(--color-heritage-gold)"
          strokeWidth="1.2"
          transform="rotate(45 30 30)"
          opacity="0.32"
        />
      </svg>

      {/* 2. Concentric Wire Ring */}
      <svg className="drift-shape drift-shape--ring" viewBox="0 0 70 70" width="64" height="64">
        <circle
          cx="35"
          cy="35"
          r="28"
          fill="none"
          stroke="var(--color-heritage-gold)"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.28"
        />
        <circle
          cx="35"
          cy="35"
          r="16"
          fill="none"
          stroke="var(--color-heritage-gold)"
          strokeWidth="1.2"
          opacity="0.4"
        />
      </svg>

      {/* 3. Academic Crosshair Shape */}
      <svg className="drift-shape drift-shape--crosshair" viewBox="0 0 40 40" width="36" height="36">
        <line x1="20" y1="4" x2="20" y2="36" stroke="var(--color-heritage-gold)" strokeWidth="1.2" opacity="0.35" />
        <line x1="4" y1="20" x2="36" y2="20" stroke="var(--color-heritage-gold)" strokeWidth="1.2" opacity="0.35" />
        <circle cx="20" cy="20" r="4" fill="none" stroke="var(--color-heritage-gold)" strokeWidth="1" opacity="0.45" />
      </svg>

      {/* 4. Hexagonal Grid Wireframe */}
      <svg className="drift-shape drift-shape--polygon" viewBox="0 0 80 80" width="72" height="72">
        <polygon
          points="40,8 70,24 70,56 40,72 10,56 10,24"
          fill="none"
          stroke="var(--color-heritage-gold)"
          strokeWidth="1.2"
          opacity="0.25"
        />
        <circle cx="40" cy="40" r="6" fill="var(--color-heritage-gold)" opacity="0.2" />
      </svg>
    </div>
  );
}

export default HeroFloatingShapes;
