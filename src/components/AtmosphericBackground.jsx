import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import '../styles/atmosphericBackground.css';

export function AtmosphericBackground({
  variant = 'hero', // 'hero' | 'intro' | 'subtle'
  showLightAccents = true,
  showGrain = true,
  interactive = true,
  className = '',
  style = {},
  children,
}) {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check device and accessibility preferences
  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px), (hover: none)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateMatches = () => {
      setIsMobile(mobileQuery.matches);
      setIsReducedMotion(motionQuery.matches);
    };

    updateMatches();

    mobileQuery.addEventListener('change', updateMatches);
    motionQuery.addEventListener('change', updateMatches);

    return () => {
      mobileQuery.removeEventListener('change', updateMatches);
      motionQuery.removeEventListener('change', updateMatches);
    };
  }, []);

  // Performance: Pause all CSS & GSAP animations when browser tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      const container = containerRef.current;
      if (!container) return;
      if (document.hidden) {
        container.classList.add('is-paused');
      } else {
        container.classList.remove('is-paused');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Desktop Pointer Parallax with smooth lerp
  useEffect(() => {
    if (isMobile || isReducedMotion || !interactive) return;

    const container = containerRef.current;
    if (!container) return;

    const layers = container.querySelectorAll('[data-parallax-depth]');
    if (!layers.length) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId = null;

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? rect.width / 2;
      const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY) ?? rect.height / 2;

      // Normalized coordinates: -0.5 to +0.5
      const normX = (clientX - rect.left) / rect.width - 0.5;
      const normY = (clientY - rect.top) / rect.height - 0.5;

      targetX = Math.max(-0.5, Math.min(0.5, normX));
      targetY = Math.max(-0.5, Math.min(0.5, normY));
    };

    // Smooth RAF loop with gentle damping (lerp factor 0.05 for fluid organic feel)
    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      layers.forEach((layer) => {
        const depth = parseFloat(layer.getAttribute('data-parallax-depth') || '1');
        const moveX = currentX * depth * 55;
        const moveY = currentY * depth * 30;
        layer.style.setProperty('--px-x', `${moveX.toFixed(2)}px`);
        layer.style.setProperty('--px-y', `${moveY.toFixed(2)}px`);
      });

      animationFrameId = requestAnimationFrame(updateParallax);
    };

    animationFrameId = requestAnimationFrame(updateParallax);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile, isReducedMotion, interactive]);

  // Subtle ambient light breathing animation using GSAP
  useEffect(() => {
    if (isReducedMotion || !showLightAccents) return;

    const container = containerRef.current;
    if (!container) return;

    const goldOrb = container.querySelector('.light-orb--gold');
    const crimsonOrb = container.querySelector('.light-orb--crimson');

    const ctx = gsap.context(() => {
      if (goldOrb) {
        gsap.to(goldOrb, {
          scale: 1.18,
          opacity: 0.48,
          duration: 8,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }

      if (crimsonOrb) {
        gsap.to(crimsonOrb, {
          scale: 1.14,
          opacity: 0.28,
          duration: 11,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 1.5,
        });
      }
    }, container);

    return () => ctx.revert();
  }, [isReducedMotion, showLightAccents]);

  return (
    <div
      ref={containerRef}
      className={`atmospheric-environment atmospheric-environment--${variant} ${className}`}
      style={style}
      aria-hidden="true"
    >
      {/* 1. Base Sky Gradient: Warm Morning Sky Ivory -> Pale Gold -> Cream */}
      <div className="atmospheric-sky-base" />

      {/* 2. Ambient Volumetric Light Accents: Antique Gold & Subtle Crimson */}
      {showLightAccents && (
        <div className="atmospheric-light-accents">
          <div className="light-orb light-orb--gold" />
          <div className="light-orb light-orb--crimson" />
          <div className="light-sunbeam-haze" />
        </div>
      )}

      {/* 3. Multi-Layer Volumetric Clouds Canvas */}
      <div className="atmospheric-clouds-canvas">
        {/* Layer 1: High Atmosphere Drifting Clouds (Upper Viewport, Depth 0.3) */}
        <div
          className="atmospheric-cloud-layer cloud-layer--high"
          data-parallax-depth="0.30"
        >
          <div className="cloud-track cloud-track--high">
            <img
              src="/images/clouds/cloud_layer_high.webp"
              alt=""
              className="cloud-tile"
              loading="eager"
            />
            <img
              src="/images/clouds/cloud_layer_high.webp"
              alt=""
              className="cloud-tile"
              loading="eager"
            />
          </div>
        </div>

        {/* Layer 2: Mid Cumulus Volumetric Billows (Center Stage, Depth 0.6) */}
        <div
          className="atmospheric-cloud-layer cloud-layer--mid"
          data-parallax-depth="0.60"
        >
          <div className="cloud-track cloud-track--mid">
            <img
              src="/images/clouds/cloud_layer_mid.webp"
              alt=""
              className="cloud-tile"
              loading="eager"
            />
            <img
              src="/images/clouds/cloud_layer_mid.webp"
              alt=""
              className="cloud-tile"
              loading="eager"
            />
          </div>
        </div>

        {/* Layer 3: Horizon Rolling Cloud Bank (Bottom Stage, Depth 0.85) */}
        <div
          className="atmospheric-cloud-layer cloud-layer--distant"
          data-parallax-depth="0.85"
        >
          <div className="cloud-track cloud-track--distant">
            <img
              src="/images/clouds/cloud_layer_distant.webp"
              alt=""
              className="cloud-tile"
              loading="eager"
            />
            <img
              src="/images/clouds/cloud_layer_distant.webp"
              alt=""
              className="cloud-tile"
              loading="eager"
            />
          </div>
        </div>

        {/* Layer 4: Foreground Drifting Mist Wisps (Desktop Only, Depth 1.15) */}
        {!isMobile && (
          <div
            className="atmospheric-cloud-layer cloud-layer--front"
            data-parallax-depth="1.15"
          >
            <div className="cloud-track cloud-track--front">
              <img
                src="/images/clouds/cloud_layer_front.webp"
                alt=""
                className="cloud-tile"
                loading="eager"
              />
              <img
                src="/images/clouds/cloud_layer_front.webp"
                alt=""
                className="cloud-tile"
                loading="eager"
              />
            </div>
          </div>
        )}
      </div>

      {/* 4. Editorial Film Grain Texture (Ultra Subtle Analog Aesthetic) */}
      {showGrain && (
        <div className="atmospheric-film-grain" />
      )}

      {/* Children if wrapped */}
      {children}
    </div>
  );
}

export default AtmosphericBackground;
