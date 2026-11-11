import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// Ethereal Cosmic Sparkle SVG component
function CosmicSparkleSVG({ kind = 'star', color = 'gold', size = 16 }) {
  const colorMap = {
    gold: {
      primary: '#F8D36A',
      secondary: '#D6B33F',
      core: '#FFFFFF',
      glow: 'rgba(248, 211, 106, 0.85)',
    },
    crimson: {
      primary: '#FF5E68',
      secondary: '#B31419',
      core: '#FFF0F2',
      glow: 'rgba(255, 94, 104, 0.85)',
    },
    azure: {
      primary: '#7ABAFF',
      secondary: '#2563EB',
      core: '#F0F9FF',
      glow: 'rgba(122, 186, 255, 0.85)',
    },
    ivory: {
      primary: '#FFFDF4',
      secondary: '#E8D69B',
      core: '#FFFFFF',
      glow: 'rgba(255, 253, 244, 0.9)',
    },
    rose: {
      primary: '#FFA8B0',
      secondary: '#DE4554',
      core: '#FFF5F6',
      glow: 'rgba(255, 168, 176, 0.85)',
    },
  }[color] || {
    primary: '#F8D36A',
    secondary: '#D6B33F',
    core: '#FFFFFF',
    glow: 'rgba(248, 211, 106, 0.85)',
  };

  if (kind === 'star') {
    // 4-pointed radiant cosmic star with curved rays and glowing nucleus
    return (
      <svg viewBox="-12 -12 24 24" width={size} height={size} fill="none" className="cosmic-sparkle-svg">
        <defs>
          <radialGradient id={`glow_star_${color}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colorMap.core} stopOpacity="1" />
            <stop offset="35%" stopColor={colorMap.primary} stopOpacity="0.85" />
            <stop offset="100%" stopColor={colorMap.secondary} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="0" cy="0" r="9" fill={`url(#glow_star_${color})`} opacity="0.65" />
        <path
          d="M0,-11 Q0,0 11,0 Q0,0 0,11 Q0,0 -11,0 Q0,0 0,-11 Z"
          fill={colorMap.primary}
        />
        <line x1="-12" y1="0" x2="12" y2="0" stroke={colorMap.core} strokeWidth="0.85" strokeLinecap="round" />
        <line x1="0" y1="-12" x2="0" y2="12" stroke={colorMap.core} strokeWidth="0.85" strokeLinecap="round" />
        <line x1="-4" y1="-4" x2="4" y2="4" stroke={colorMap.primary} strokeWidth="0.6" opacity="0.75" />
        <line x1="4" y1="-4" x2="-4" y2="4" stroke={colorMap.primary} strokeWidth="0.6" opacity="0.75" />
        <circle cx="0" cy="0" r="1.6" fill={colorMap.core} />
      </svg>
    );
  }

  if (kind === 'burst') {
    // 8-pointed astral flare
    return (
      <svg viewBox="-10 -10 20 20" width={size} height={size} fill="none" className="cosmic-sparkle-svg">
        <circle cx="0" cy="0" r="7" fill={colorMap.glow} opacity="0.4" />
        <path d="M0,-9 Q0,0 9,0 Q0,0 0,9 Q0,0 -9,0 Q0,0 0,-9 Z" fill={colorMap.primary} />
        <path d="M0,-5.5 Q0,0 5.5,0 Q0,0 0,5.5 Q0,0 -5.5,0 Q0,0 0,-5.5 Z" fill={colorMap.core} transform="rotate(45)" opacity="0.9" />
        <circle cx="0" cy="0" r="1.7" fill="#FFFFFF" />
      </svg>
    );
  }

  if (kind === 'diamond') {
    // Prismatic cosmic diamond
    return (
      <svg viewBox="-8 -8 16 16" width={size} height={size} fill="none" className="cosmic-sparkle-svg">
        <polygon points="0,-8 6,0 0,8 -6,0" fill={colorMap.primary} />
        <polygon points="0,-5 3.5,0 0,5 -3.5,0" fill={colorMap.core} opacity="0.9" />
        <line x1="-7" y1="0" x2="7" y2="0" stroke={colorMap.core} strokeWidth="0.65" opacity="0.85" />
        <line x1="0" y1="-7" x2="0" y2="7" stroke={colorMap.core} strokeWidth="0.65" opacity="0.85" />
      </svg>
    );
  }

  // 'glint'
  return (
    <svg viewBox="-8 -8 16 16" width={size} height={size} fill="none" className="cosmic-sparkle-svg">
      <circle cx="0" cy="0" r="5" fill={colorMap.glow} opacity="0.45" />
      <circle cx="0" cy="0" r="2.4" fill={colorMap.primary} />
      <circle cx="0" cy="0" r="1.3" fill={colorMap.core} />
      <line x1="-6" y1="0" x2="6" y2="0" stroke={colorMap.core} strokeWidth="0.65" opacity="0.9" />
      <line x1="0" y1="-6" x2="0" y2="6" stroke={colorMap.core} strokeWidth="0.65" opacity="0.9" />
    </svg>
  );
}

// Pool of cosmic sparkles (delicate, compact & lightweight)
const POOL_SIZE = 24;
const TRAIL_TEMPLATES = [
  { kind: 'star', color: 'gold', baseScale: 0.58 },
  { kind: 'burst', color: 'crimson', baseScale: 0.52 },
  { kind: 'diamond', color: 'azure', baseScale: 0.46 },
  { kind: 'glint', color: 'ivory', baseScale: 0.42 },
  { kind: 'star', color: 'rose', baseScale: 0.54 },
  { kind: 'burst', color: 'gold', baseScale: 0.56 },
  { kind: 'diamond', color: 'crimson', baseScale: 0.48 },
  { kind: 'glint', color: 'azure', baseScale: 0.44 },
  { kind: 'star', color: 'ivory', baseScale: 0.52 },
  { kind: 'burst', color: 'rose', baseScale: 0.54 },
  { kind: 'diamond', color: 'gold', baseScale: 0.50 },
  { kind: 'glint', color: 'crimson', baseScale: 0.44 },
  { kind: 'star', color: 'gold', baseScale: 0.56 },
  { kind: 'diamond', color: 'azure', baseScale: 0.48 },
  { kind: 'burst', color: 'crimson', baseScale: 0.50 },
  { kind: 'glint', color: 'gold', baseScale: 0.45 },
  { kind: 'star', color: 'ivory', baseScale: 0.52 },
  { kind: 'diamond', color: 'rose', baseScale: 0.46 },
  { kind: 'burst', color: 'gold', baseScale: 0.54 },
  { kind: 'glint', color: 'crimson', baseScale: 0.42 },
  { kind: 'star', color: 'azure', baseScale: 0.50 },
  { kind: 'diamond', color: 'gold', baseScale: 0.48 },
  { kind: 'burst', color: 'rose', baseScale: 0.52 },
  { kind: 'glint', color: 'ivory', baseScale: 0.44 },
];

export function ButterflyCursor() {
  const [mounted, setMounted] = useState(false);
  const butterflyRef = useRef(null);
  const wrapperRef = useRef(null);
  const companion1Ref = useRef(null);
  const companion2Ref = useRef(null);
  const particleElsRef = useRef([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    document.documentElement.classList.add('has-butterfly-cursor');

    let mouseX = -9999;
    let mouseY = -9999;
    let bfX = -9999;
    let bfY = -9999;
    let comp1X = -9999;
    let comp1Y = -9999;
    let comp2X = -9999;
    let comp2Y = -9999;
    let lastSpawnX = -9999;
    let lastSpawnY = -9999;
    let wingSide = 1;
    let currentTilt = 0;
    let isHovering = false;
    let isVisible = false;
    let rafId = 0;
    let startTime = performance.now();
    let hasMoved = false;

    // Zoom Shape Modulation State
    // targetZoom: -1.0 (zoomed out: sleek tucked dart) to +1.0 (zoomed in: expansive soaring wingspan)
    let targetZoom = 0;
    let zoomMorph = 0;
    let baseBrowserZoom = 0;
    let lastZoomActivity = 0;

    const initialDPR = window.devicePixelRatio || 1;
    const checkViewportZoom = () => {
      let scale = 1;
      if (window.visualViewport) {
        scale = window.visualViewport.scale;
      } else {
        scale = (window.devicePixelRatio || 1) / initialDPR;
      }
      baseBrowserZoom = Math.max(-0.85, Math.min(0.85, (scale - 1) * 1.6));
    };
    checkViewportZoom();

    const onWheel = (e) => {
      if (e.ctrlKey) {
        // Pinch zoom on trackpad or Ctrl + MouseWheel
        // deltaY < 0 is zooming in (magnify)
        // deltaY > 0 is zooming out (demagnify)
        const zoomDelta = -Math.sign(e.deltaY) * Math.min(1.0, Math.abs(e.deltaY) * 0.05 + 0.35);
        targetZoom = Math.max(-1.0, Math.min(1.0, targetZoom + zoomDelta * 0.5));
        lastZoomActivity = performance.now();
      } else {
        // Subtle aerodynamic lift on scroll up (soar), tuck on scroll down (dive)
        const scrollDelta = Math.max(-0.4, Math.min(0.4, -e.deltaY * 0.003));
        targetZoom = Math.max(-1.0, Math.min(1.0, targetZoom + scrollDelta * 0.25));
        lastZoomActivity = performance.now();
      }
    };

    const onKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '=' || e.key === '+' || e.key === 'Add')) {
        targetZoom = Math.min(1.0, targetZoom + 0.5);
        lastZoomActivity = performance.now();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === '-' || e.key === '_' || e.key === 'Subtract')) {
        targetZoom = Math.max(-1.0, targetZoom - 0.5);
        lastZoomActivity = performance.now();
      } else if ((e.ctrlKey || e.metaKey) && e.key === '0') {
        targetZoom = baseBrowserZoom;
        lastZoomActivity = performance.now();
      }
    };

    // Fast particle pool state
    const particles = TRAIL_TEMPLATES.map((tmpl) => ({
      kind: tmpl.kind,
      color: tmpl.color,
      baseScale: tmpl.baseScale || 0.50,
      active: false,
      x: -9999,
      y: -9999,
      vx: 0,
      vy: 0,
      rotation: 0,
      vRot: 0,
      scale: 1,
      life: 0,
      age: 0,
      phase: 0,
      decay: 0.054,
    }));

    let nextParticleIdx = 0;

    const spawnTrailItem = (originX, originY, moveDx, moveDy, isBurst = false) => {
      const p = particles[nextParticleIdx];
      nextParticleIdx = (nextParticleIdx + 1) % POOL_SIZE;

      p.active = true;
      p.age = 0;
      p.phase = Math.random() * Math.PI * 2;

      if (isBurst) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.4 + Math.random() * 2.0;
        p.x = originX + Math.cos(angle) * 4;
        p.y = originY + Math.sin(angle) * 4;
        p.vx = Math.cos(angle) * speed;
        p.vy = Math.sin(angle) * speed;
        p.scale = p.baseScale * (0.85 + Math.random() * 0.35);
        p.decay = 0.045 + Math.random() * 0.018;
      } else {
        // Delicate stardust sparkles trailing directly from the butterfly's tail
        wingSide = -wingSide;
        const offsetDist = wingSide * (1.8 + Math.random() * 3.2);
        p.x = originX + offsetDist;
        p.y = originY + (Math.random() - 0.5) * 2.5;
        // Trailing drift opposite to movement
        p.vx = (Math.random() - 0.5) * 0.35 - moveDx * 0.045;
        p.vy = 0.2 + Math.random() * 0.3 - moveDy * 0.045;
        p.scale = p.baseScale * (0.8 + Math.random() * 0.35);
        // Decays gracefully over ~0.42s
        p.decay = 0.038 + Math.random() * 0.012;
      }

      p.rotation = (Math.random() - 0.5) * 20;
      p.vRot = (Math.random() - 0.5) * 2.8;
      p.life = 1.0;
    };

    const onPointerMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isVisible = true;

      if (!hasMoved) {
        hasMoved = true;
        bfX = mouseX;
        bfY = mouseY;
        lastSpawnX = mouseX;
        lastSpawnY = mouseY;
      }

      if (wrapperRef.current) {
        wrapperRef.current.style.opacity = '1';
        wrapperRef.current.style.visibility = 'visible';
      }
    };

    let touchFadeTimer = null;
    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        isVisible = true;

        if (!hasMoved) {
          hasMoved = true;
          bfX = mouseX;
          bfY = mouseY;
          lastSpawnX = mouseX;
          lastSpawnY = mouseY;
        }

        if (wrapperRef.current) {
          wrapperRef.current.style.opacity = '1';
          wrapperRef.current.style.visibility = 'visible';
        }
      }
    };

    const onTouchEnd = () => {
      if (touchFadeTimer) clearTimeout(touchFadeTimer);
      touchFadeTimer = setTimeout(() => {
        if (wrapperRef.current) {
          wrapperRef.current.style.opacity = '0';
        }
      }, 500);
    };

    const onPointerDown = (e) => {
      if (butterflyRef.current) {
        butterflyRef.current.classList.add('butterfly--clicking');
      }
      // Cosmic stardust burst on click
      for (let b = 0; b < 8; b++) {
        spawnTrailItem(e.clientX, e.clientY, 0, 0, true);
      }
    };

    const onPointerUp = () => {
      if (butterflyRef.current) {
        butterflyRef.current.classList.remove('butterfly--clicking');
      }
    };

    const onPointerLeave = () => {
      isVisible = false;
      if (wrapperRef.current) {
        wrapperRef.current.style.opacity = '0';
      }
    };

    const onPointerEnter = (e) => {
      isVisible = true;
      if (e && e.clientX && e.clientY) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!hasMoved) {
          hasMoved = true;
          bfX = mouseX;
          bfY = mouseY;
          lastSpawnX = mouseX;
          lastSpawnY = mouseY;
        }
      }
      if (wrapperRef.current) {
        wrapperRef.current.style.opacity = '1';
        wrapperRef.current.style.visibility = 'visible';
      }
    };

    const onPointerOver = (e) => {
      const interactive = Boolean(
        e.target.closest('a, button, input, textarea, select, [data-cursor-interactive], .magnetic, [role="button"]')
      );
      isHovering = interactive;
      if (butterflyRef.current) {
        butterflyRef.current.classList.toggle('butterfly--interactive', interactive);
      }
    };

    // Magnetic buttons integration
    const onMagneticMove = (e) => {
      const el = e.target.closest('.magnetic');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      el.style.setProperty('--mag-x', `${(dx * 0.16).toFixed(1)}px`);
      el.style.setProperty('--mag-y', `${(dy * 0.16).toFixed(1)}px`);
    };

    const onMagneticLeave = (e) => {
      const el = e.target.closest('.magnetic');
      if (!el) return;
      el.style.setProperty('--mag-x', '0px');
      el.style.setProperty('--mag-y', '0px');
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true, capture: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true, capture: true });
    window.addEventListener('touchstart', onTouchMove, { passive: true, capture: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true, capture: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true, capture: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true, capture: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true, capture: true });
    window.addEventListener('pointerover', onPointerOver, { passive: true, capture: true });
    window.addEventListener('pointerout', onMagneticLeave, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave, { passive: true });
    document.addEventListener('mouseenter', onPointerEnter, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('keydown', onKeyDown, { passive: true });
    window.addEventListener('resize', checkViewportZoom, { passive: true });
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', checkViewportZoom, { passive: true });
    }

    const updateLoop = (now) => {
      if (!hasMoved) {
        rafId = requestAnimationFrame(updateLoop);
        return;
      }

      const elapsed = (now - startTime) * 0.001;

      // Ultra-crisp 1:1 cursor response (lerp: 0.85 with instant snap for true cursor precision)
      const dx = mouseX - bfX;
      const dy = mouseY - bfY;

      bfX += dx * 0.85;
      bfY += dy * 0.85;
      if (Math.abs(dx) < 0.25) bfX = mouseX;
      if (Math.abs(dy) < 0.25) bfY = mouseY;

      // Directional banking: tilts dynamically into cursor motion
      const targetTilt = Math.max(-28, Math.min(28, dx * 0.85));
      currentTilt += (targetTilt - currentTilt) * 0.22;

      // Subtle aerodynamic micro-float
      const floatOffset = Math.sin(elapsed * 3.2) * 2.0;

      // Dynamic Zoom Shape Modulation
      const timeSinceZoom = now - lastZoomActivity;
      if (timeSinceZoom > 380) {
        targetZoom += (baseBrowserZoom - targetZoom) * 0.05;
      }
      zoomMorph += (targetZoom - zoomMorph) * 0.12;

      // 1. Butterfly Cursor Render & Dynamic Shape Morphing
      if (butterflyRef.current) {
        butterflyRef.current.style.opacity = '1';
        butterflyRef.current.style.visibility = 'visible';

        const posX = bfX.toFixed(1);
        const posY = (bfY + floatOffset).toFixed(1);
        const hoverScale = isHovering ? 1.15 : 1.0;
        const zoomScale = hoverScale * (1.0 + zoomMorph * 0.12);
        butterflyRef.current.style.transform = `translate3d(${posX}px, ${posY}px, 0) rotate(${currentTilt.toFixed(1)}deg) scale(${zoomScale.toFixed(3)})`;

        // Flap physics: faster flutter when hovering or moving
        const movementSpeed = Math.hypot(dx, dy);
        const flapDuration = isHovering
          ? '0.24s'
          : movementSpeed > 4
          ? '0.32s'
          : Math.max(0.28, Math.min(0.65, 0.48 / (1.0 + zoomMorph * 0.35))).toFixed(2) + 's';

        // Modulate wing spread, sweep angles, body, antennae, and flap duration
        const wingSpread = (1.0 + zoomMorph * 0.38).toFixed(3);
        const wingSpreadY = (1.0 - zoomMorph * 0.12).toFixed(3);
        const wingSweepLeft = (-zoomMorph * 14).toFixed(1) + 'deg';
        const wingSweepRight = (zoomMorph * 14).toFixed(1) + 'deg';
        const bodyScaleY = (1.0 - zoomMorph * 0.22).toFixed(3);
        const bodyScaleX = (1.0 + zoomMorph * 0.16).toFixed(3);
        const antennaLeft = (-zoomMorph * 12).toFixed(1) + 'deg';
        const antennaRight = (zoomMorph * 12).toFixed(1) + 'deg';

        butterflyRef.current.style.setProperty('--bf-wing-spread', wingSpread);
        butterflyRef.current.style.setProperty('--bf-wing-spread-y', wingSpreadY);
        butterflyRef.current.style.setProperty('--bf-wing-sweep-left', wingSweepLeft);
        butterflyRef.current.style.setProperty('--bf-wing-sweep-right', wingSweepRight);
        butterflyRef.current.style.setProperty('--bf-body-scale-y', bodyScaleY);
        butterflyRef.current.style.setProperty('--bf-body-scale-x', bodyScaleX);
        butterflyRef.current.style.setProperty('--bf-antenna-left', antennaLeft);
        butterflyRef.current.style.setProperty('--bf-antenna-right', antennaRight);
        butterflyRef.current.style.setProperty('--bf-flap-duration', flapDuration);

        butterflyRef.current.classList.toggle('butterfly--zoomed-in', zoomMorph > 0.20);
        butterflyRef.current.classList.toggle('butterfly--zoomed-out', zoomMorph < -0.20);
      }

      // 2. Cosmic Sparkle Tail Spawning from the Butterfly's Tail tip
      const distFromLast = Math.hypot(mouseX - lastSpawnX, mouseY - lastSpawnY);
      if (distFromLast > 5.5) {
        const rad = (currentTilt * Math.PI) / 180;
        // Tail is at the bottom tip of the butterfly body (~11px down along tilt)
        const tailX = bfX - Math.sin(rad) * 11;
        const tailY = bfY + Math.cos(rad) * 11;
        spawnTrailItem(tailX, tailY, dx, dy, false);
        lastSpawnX = mouseX;
        lastSpawnY = mouseY;
      }

      // 3. Update Trail of Cosmic Sparkles
      for (let i = 0; i < POOL_SIZE; i++) {
        const p = particles[i];
        const el = particleElsRef.current[i];
        if (!p || !el) continue;

        if (p.active) {
          p.life -= p.decay;
          p.age += 0.04;

          if (p.life <= 0) {
            p.active = false;
            el.style.opacity = '0';
            el.style.transform = 'translate3d(-9999px, -9999px, 0)';
          } else {
            // Delicate cosmic sway & trailing drift
            const twinkleSway = Math.sin(p.age * 8 + p.phase) * 0.45;
            p.x += p.vx + twinkleSway;
            p.y += p.vy + 0.12;
            p.rotation += p.vRot;

            const progress = p.life;
            const curScale = (p.scale * (0.35 + 0.65 * progress)).toFixed(2);
            const op = Math.max(0, Math.min(1, progress * 1.35)).toFixed(2);

            el.style.opacity = op;
            el.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) rotate(${p.rotation.toFixed(1)}deg) scale(${curScale})`;
          }
        }
      }

      rafId = requestAnimationFrame(updateLoop);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      } else {
        if (!rafId) {
          rafId = requestAnimationFrame(updateLoop);
        }
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    rafId = requestAnimationFrame(updateLoop);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      document.documentElement.classList.remove('has-butterfly-cursor');
      window.removeEventListener('pointermove', onPointerMove, { capture: true });
      window.removeEventListener('touchmove', onTouchMove, { capture: true });
      window.removeEventListener('touchstart', onTouchMove, { capture: true });
      window.removeEventListener('touchend', onTouchEnd, { capture: true });
      window.removeEventListener('touchcancel', onTouchEnd, { capture: true });
      window.removeEventListener('pointerdown', onPointerDown, { capture: true });
      window.removeEventListener('pointerup', onPointerUp, { capture: true });
      window.removeEventListener('pointerover', onPointerOver, { capture: true });
      window.removeEventListener('pointerout', onMagneticLeave);
      document.removeEventListener('mouseleave', onPointerLeave);
      document.removeEventListener('mouseenter', onPointerEnter);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', checkViewportZoom);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', checkViewportZoom);
      }
      if (touchFadeTimer) clearTimeout(touchFadeTimer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [mounted]);

  if (!mounted || typeof document === 'undefined' || !document.body) return null;

  return createPortal(
    <div
      ref={wrapperRef}
      className="butterfly-cursor-wrapper"
      aria-hidden="true"
      style={{
        opacity: 0,
        visibility: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* 1. ENCHANTING COSMIC SPARKLE TAIL */}
      <div className="cursor-trail-layer">
        {TRAIL_TEMPLATES.map((tmpl, idx) => (
          <div
            key={idx}
            ref={(el) => (particleElsRef.current[idx] = el)}
            className={`cosmic-trail-item sparkle--${tmpl.color}`}
            style={{
              transform: 'translate3d(-9999px, -9999px, 0)',
              opacity: 0,
            }}
          >
            <CosmicSparkleSVG kind={tmpl.kind} color={tmpl.color} size={15} />
          </div>
        ))}
      </div>

      {/* 2. SIGNATURE ARTISANAL CRIMSON RED BUTTERFLY CURSOR */}
      <div ref={butterflyRef} className="cursor-butterfly-layer">
        <svg
          className="butterfly-svg"
          viewBox="-35 -30 70 60"
          width="40"
          height="34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bfCrimsonFore" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D97777" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#B31419" stopOpacity="0.95" />
              <stop offset="75%" stopColor="#851014" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#5A0F0E" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="bfCrimsonHind" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C15B5B" stopOpacity="0.88" />
              <stop offset="40%" stopColor="#B31419" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#5A0F0E" stopOpacity="0.92" />
            </linearGradient>

            <radialGradient id="bfTranslucentCell" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FFF8E8" stopOpacity="0.55" />
              <stop offset="45%" stopColor="#D97777" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#B31419" stopOpacity="0.1" />
            </radialGradient>

            <linearGradient id="bfBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#400A0A" />
              <stop offset="50%" stopColor="#851014" />
              <stop offset="100%" stopColor="#300707" />
            </linearGradient>
          </defs>

          {/* LEFT WING (Anchored for zoom shape morphing + 3D flapping) */}
          <g className="butterfly-wing-anchor butterfly-wing-anchor--left">
            <g className="butterfly-wing butterfly-wing--left">
              <path
                d="M-1,-2 C-8,-14 -18,-24 -29,-20 C-34,-17 -34,-6 -27,2 C-21,9 -12,11 -1,4 Z"
                fill="url(#bfCrimsonFore)"
                stroke="#5A0F0E"
                strokeWidth="0.75"
                strokeLinejoin="round"
              />
              <path
                d="M-5,-4 C-11,-12 -18,-17 -24,-14 C-27,-12 -26,-5 -21,0 C-16,5 -9,5 -5,-2 Z"
                fill="url(#bfTranslucentCell)"
              />
              <path
                d="M-3,-1 C-12,-9 -20,-15 -27,-17 M-12,-9 C-19,-5 -25,-2 -26,1 M-15,-6 C-17,2 -20,6 -21,7"
                stroke="rgba(255, 248, 232, 0.45)"
                strokeWidth="0.5"
                strokeLinecap="round"
              />
              <circle cx="-29" cy="-18" r="0.8" fill="#D6B33F" opacity="0.85" />
              <circle cx="-32" cy="-12" r="0.7" fill="#D6B33F" opacity="0.8" />
              <circle cx="-31" cy="-4" r="0.7" fill="#D6B33F" opacity="0.8" />
              <circle cx="-27" cy="3" r="0.6" fill="#D6B33F" opacity="0.75" />

              <path
                d="M-1,3 C-9,7 -20,7 -23,14 C-25,19 -20,26 -13,24 C-6,22 -2,14 -1,7 Z"
                fill="url(#bfCrimsonHind)"
                stroke="#5A0F0E"
                strokeWidth="0.7"
                strokeLinejoin="round"
              />
              <path
                d="M-3,5 C-9,8 -16,8 -18,13 C-19,16 -16,20 -11,19 C-6,17 -3,11 -3,6 Z"
                fill="url(#bfTranslucentCell)"
              />
              <path
                d="M-2,4 C-9,10 -14,14 -17,19 M-9,10 C-14,12 -17,14 -18,17"
                stroke="rgba(255, 248, 232, 0.4)"
                strokeWidth="0.45"
                strokeLinecap="round"
              />
              <circle cx="-22" cy="16" r="0.6" fill="#D6B33F" opacity="0.8" />
              <circle cx="-18" cy="22" r="0.6" fill="#D6B33F" opacity="0.8" />
            </g>
          </g>

          {/* RIGHT WING (Anchored for zoom shape morphing + 3D flapping) */}
          <g className="butterfly-wing-anchor butterfly-wing-anchor--right">
            <g className="butterfly-wing butterfly-wing--right">
              <path
                d="M1,-2 C8,-14 18,-24 29,-20 C34,-17 34,-6 27,2 C21,9 12,11 1,4 Z"
                fill="url(#bfCrimsonFore)"
                stroke="#5A0F0E"
                strokeWidth="0.75"
                strokeLinejoin="round"
              />
              <path
                d="M5,-4 C11,-12 18,-17 24,-14 C27,-12 26,-5 21,0 C16,5 9,5 5,-2 Z"
                fill="url(#bfTranslucentCell)"
              />
              <path
                d="M3,-1 C12,-9 20,-15 27,-17 M12,-9 C19,-5 25,-2 26,1 M15,-6 C17,2 20,6 21,7"
                stroke="rgba(255, 248, 232, 0.45)"
                strokeWidth="0.5"
                strokeLinecap="round"
              />
              <circle cx="29" cy="-18" r="0.8" fill="#D6B33F" opacity="0.85" />
              <circle cx="32" cy="-12" r="0.7" fill="#D6B33F" opacity="0.8" />
              <circle cx="31" cy="-4" r="0.7" fill="#D6B33F" opacity="0.8" />
              <circle cx="27" cy="3" r="0.6" fill="#D6B33F" opacity="0.75" />

              <path
                d="M1,3 C9,7 20,7 23,14 C25,19 20,26 13,24 C6,22 2,14 1,7 Z"
                fill="url(#bfCrimsonHind)"
                stroke="#5A0F0E"
                strokeWidth="0.7"
                strokeLinejoin="round"
              />
              <path
                d="M3,5 C9,8 16,8 18,13 C19,16 16,20 11,19 C6,17 3,11 3,6 Z"
                fill="url(#bfTranslucentCell)"
              />
              <path
                d="M2,4 C9,10 14,14 17,19 M9,10 C14,12 17,14 18,17"
                stroke="rgba(255, 248, 232, 0.4)"
                strokeWidth="0.45"
                strokeLinecap="round"
              />
              <circle cx="22" cy="16" r="0.6" fill="#D6B33F" opacity="0.8" />
              <circle cx="18" cy="22" r="0.6" fill="#D6B33F" opacity="0.8" />
            </g>
          </g>

          {/* SLENDER BODY (Thorax, Abdomen, Morphable Antennae) */}
          <g className="butterfly-body">
            <g className="butterfly-antenna butterfly-antenna--left">
              <path
                d="M-0.8,-7 Q-4,-17 -8,-22"
                stroke="#5A0F0E"
                strokeWidth="0.7"
                strokeLinecap="round"
              />
              <circle cx="-8.2" cy="-22.2" r="0.75" fill="#D6B33F" />
            </g>

            <g className="butterfly-antenna butterfly-antenna--right">
              <path
                d="M0.8,-7 Q4,-17 8,-22"
                stroke="#5A0F0E"
                strokeWidth="0.7"
                strokeLinecap="round"
              />
              <circle cx="8.2" cy="-22.2" r="0.75" fill="#D6B33F" />
            </g>

            <g className="butterfly-torso">
              <circle cx="0" cy="-7" r="1.8" fill="#400A0A" />
              <ellipse cx="0" cy="-2" rx="2" ry="3.5" fill="url(#bfBodyGrad)" />

              <ellipse cx="0" cy="8" rx="1.6" ry="6.5" fill="url(#bfBodyGrad)" />
              <line x1="-1.2" y1="4" x2="1.2" y2="4" stroke="#D6B33F" strokeWidth="0.4" opacity="0.7" />
              <line x1="-1.4" y1="7" x2="1.4" y2="7" stroke="#D6B33F" strokeWidth="0.4" opacity="0.7" />
              <line x1="-1.2" y1="10" x2="1.2" y2="10" stroke="#D6B33F" strokeWidth="0.4" opacity="0.7" />
            </g>
          </g>
        </svg>
      </div>
    </div>,
    document.body
  );
}

export default ButterflyCursor;
