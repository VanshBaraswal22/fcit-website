import React from 'react';

/**
 * GuildAmbientBackground
 * Restrained, high-performance ambient background layer with:
 * - Subtle drifting geometric grid lines
 * - Warm ivory & champagne gold floating dust motes
 * - Delicate architectural connection filaments
 * - Occasional gentle specular light sweep
 *
 * Keeps opacity ultra-low (0.025 - 0.08) so editorial typography remains 100% sharp & legible.
 */
export default function GuildAmbientBackground() {
  return (
    <div className="guild-ambient-background" aria-hidden="true">
      {/* 1. Subtle moving micro-grid backdrop */}
      <div className="guild-ambient-grid" />

      {/* 2. Delicate gold architectural connection paths */}
      <svg className="guild-ambient-filaments" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <defs>
          <linearGradient id="ambientPathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D6AD54" stopOpacity="0" />
            <stop offset="40%" stopColor="#D6AD54" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#FFF8E8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#D6AD54" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          d="M 120 0 C 180 300, 80 600, 140 900"
          fill="none"
          stroke="url(#ambientPathGrad)"
          strokeWidth="1"
          strokeDasharray="12 24"
          className="ambient-filament filament-left"
        />
        <path
          d="M 1320 0 C 1260 300, 1360 600, 1300 900"
          fill="none"
          stroke="url(#ambientPathGrad)"
          strokeWidth="1"
          strokeDasharray="16 32"
          className="ambient-filament filament-right"
        />
      </svg>

      {/* 3. Small floating particles (subtle warm dust motes) */}
      <div className="guild-ambient-particles">
        {[...Array(12)].map((_, i) => (
          <span key={i} className={`ambient-particle p-${i + 1}`} />
        ))}
      </div>

      {/* 4. Occasional ambient light sweep */}
      <div className="guild-ambient-light-sweep" />
    </div>
  );
}
