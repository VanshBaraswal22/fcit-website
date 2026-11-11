import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import '../styles/globalButterfly.css';

// Celestial golden stardust trail template
const SPARKLE_POOL_SIZE = 14;

export default function GlobalButterfly() {
  const [mounted, setMounted] = useState(false);
  const butterflyRef = useRef(null);
  const sparklesRef = useRef([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Viewport dimensions
    let width = window.innerWidth || 1200;
    let height = window.innerHeight || 800;

    const onResize = () => {
      width = window.innerWidth || 1200;
      height = window.innerHeight || 800;
    };
    window.addEventListener('resize', onResize, { passive: true });

    // Reduced motion preference
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isReducedMotion = reducedMotionQuery.matches;
    const onMotionChange = (e) => {
      isReducedMotion = e.matches;
    };
    reducedMotionQuery.addEventListener('change', onMotionChange);

    // Initial position & kinematics
    let x = width * 0.45;
    let y = height * 0.35;
    let vx = 1.2;
    let vy = -0.8;
    let heading = 45; // Degrees

    // Target waypoint
    let targetX = width * 0.75;
    let targetY = height * 0.30;
    let isHovering = false;
    let hoverDuration = 0;
    let hoverStartTime = 0;

    // Mouse proximity tracking for soft, respectful avoidance
    let mouseX = -9999;
    let mouseY = -9999;
    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Pick scenic viewport waypoint
    const pickNextWaypoint = () => {
      const minX = width * 0.10;
      const maxX = width * 0.90;
      const minY = height * 0.12;
      const maxY = height * 0.88;

      let bestTx = minX + Math.random() * (maxX - minX);
      let bestTy = minY + Math.random() * (maxY - minY);

      for (let i = 0; i < 4; i++) {
        const candidateX = minX + Math.random() * (maxX - minX);
        const candidateY = minY + Math.random() * (maxY - minY);
        if (Math.hypot(candidateX - x, candidateY - y) > 220) {
          bestTx = candidateX;
          bestTy = candidateY;
          break;
        }
      }
      targetX = bestTx;
      targetY = bestTy;
    };

    // Stardust pool
    const sparkles = Array.from({ length: SPARKLE_POOL_SIZE }).map(() => ({
      active: false,
      x: -9999,
      y: -9999,
      scale: 1,
      opacity: 0,
      life: 0,
      decay: 0.035,
    }));
    let nextSparkleIdx = 0;
    let framesSinceSparkle = 0;

    const spawnSparkle = (originX, originY) => {
      const p = sparkles[nextSparkleIdx];
      nextSparkleIdx = (nextSparkleIdx + 1) % SPARKLE_POOL_SIZE;
      p.active = true;
      p.x = originX + (Math.random() - 0.5) * 8;
      p.y = originY + 4 + (Math.random() - 0.5) * 6;
      p.scale = 0.5 + Math.random() * 0.35;
      p.opacity = 0.75;
      p.life = 1.0;
      p.decay = 0.024 + Math.random() * 0.015;
    };

    let rafId = 0;
    let isTabVisible = !document.hidden;

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && !rafId) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(flightLoop);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    let lastTime = performance.now();

    // Main Autonomous Aerodynamic Flight Loop
    const flightLoop = (currentTime) => {
      const dt = Math.min(40, currentTime - lastTime);
      lastTime = currentTime;
      const timeSec = currentTime * 0.001;

      if (!isTabVisible) {
        rafId = 0;
        return;
      }

      if (isReducedMotion) {
        // Dock gently in upper right viewport margin with slow calming wing beats
        x += (width - 70 - x) * 0.05;
        y += (120 - y) * 0.05;
        if (butterflyRef.current) {
          butterflyRef.current.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(15deg) scale(0.85)`;
          butterflyRef.current.style.setProperty('--bf-flap-duration', '1.6s');
        }
        rafId = requestAnimationFrame(flightLoop);
        return;
      }

      // Check distance to target waypoint
      const toTargetX = targetX - x;
      const toTargetY = targetY - y;
      const distToTarget = Math.hypot(toTargetX, toTargetY);

      if (isHovering) {
        // Hovering / lingering phase
        const hoverElapsed = currentTime - hoverStartTime;
        if (hoverElapsed > hoverDuration) {
          isHovering = false;
          pickNextWaypoint();
        } else {
          // Gentle organic float while hovering
          vx *= 0.94;
          vy *= 0.94;
          x += vx + Math.cos(timeSec * 2.2) * 0.25;
          y += vy + Math.sin(timeSec * 2.6) * 0.35;
        }
      } else {
        // Active flight phase
        if (distToTarget < 50) {
          // 35% chance to pause & hover gracefully
          if (Math.random() < 0.35) {
            isHovering = true;
            hoverStartTime = currentTime;
            hoverDuration = 1600 + Math.random() * 1400; // 1.6s – 3.0s
          } else {
            pickNextWaypoint();
          }
        }

        // Steer towards target waypoint with smooth curved acceleration
        const targetSpeed = 2.1;
        const desiredVx = (toTargetX / Math.max(1, distToTarget)) * targetSpeed;
        const desiredVy = (toTargetY / Math.max(1, distToTarget)) * targetSpeed;

        vx += (desiredVx - vx) * 0.042;
        vy += (desiredVy - vy) * 0.042;

        // Organic wing-flutter lift noise perpendicular to velocity
        const speed = Math.hypot(vx, vy);
        if (speed > 0.1) {
          const perpX = -vy / speed;
          const perpY = vx / speed;
          const flutter = Math.sin(timeSec * 4.8) * 0.38;
          vx += perpX * flutter;
          vy += perpY * flutter;
        }

        // Soft avoidance: gently steer away from cursor when nearby (never cover reading area)
        const toMouseX = x - mouseX;
        const toMouseY = y - mouseY;
        const distToMouse = Math.hypot(toMouseX, toMouseY);
        if (distToMouse < 90) {
          const repelStrength = ((90 - distToMouse) / 90) * 0.65;
          vx += (toMouseX / distToMouse) * repelStrength;
          vy += (toMouseY / distToMouse) * repelStrength;
        }

        // Keep inside comfortable viewport bounds with gentle steering
        const margin = 50;
        if (x < margin) vx += 0.18;
        if (x > width - margin) vx -= 0.18;
        if (y < margin + 60) vy += 0.18; // Keep below top navbar
        if (y > height - margin) vy -= 0.18;

        x += vx;
        y += vy;

        // Smooth banking in direction of flight
        if (speed > 0.15) {
          const targetHeading = Math.atan2(vy, vx) * (180 / Math.PI) + 90;
          let diff = (targetHeading - heading + 180) % 360 - 180;
          heading += diff * 0.082;
        }

        // Occasional stardust sparkle in its flight path
        framesSinceSparkle++;
        if (framesSinceSparkle > 20) {
          framesSinceSparkle = 0;
          spawnSparkle(x, y);
        }
      }

      // Update Butterfly DOM transform
      if (butterflyRef.current) {
        const flapDuration = isHovering
          ? '0.52s'
          : `${Math.max(0.24, Math.min(0.44, 0.34 / Math.max(0.7, Math.hypot(vx, vy) / 2)))}s`;

        butterflyRef.current.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${heading.toFixed(1)}deg) scale(0.92)`;
        butterflyRef.current.style.setProperty('--bf-flap-duration', flapDuration);
      }

      // Update sparkles
      for (let i = 0; i < SPARKLE_POOL_SIZE; i++) {
        const p = sparkles[i];
        const el = sparklesRef.current[i];
        if (p && el) {
          if (p.active) {
            p.life -= p.decay;
            if (p.life <= 0) {
              p.active = false;
              el.style.opacity = '0';
              el.style.transform = 'translate3d(-9999px, -9999px, 0)';
            } else {
              p.y += 0.22;
              el.style.opacity = (p.life * p.opacity).toFixed(2);
              el.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) scale(${(p.scale * p.life).toFixed(2)})`;
            }
          }
        }
      }

      rafId = requestAnimationFrame(flightLoop);
    };

    rafId = requestAnimationFrame(flightLoop);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      reducedMotionQuery.removeEventListener('change', onMotionChange);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [mounted]);

  if (!mounted || typeof document === 'undefined') return null;

  // Render through React Portal directly into document.body
  return createPortal(
    <aside className="fcit-global-butterfly-portal" aria-hidden="true">
      {/* 1. Subtle Golden Stardust Wake */}
      <div className="fcit-bf-sparkle-layer">
        {Array.from({ length: SPARKLE_POOL_SIZE }).map((_, idx) => (
          <div
            key={idx}
            ref={(el) => (sparklesRef.current[idx] = el)}
            className="fcit-bf-sparkle"
            style={{ transform: 'translate3d(-9999px, -9999px, 0)', opacity: 0 }}
          >
            <svg viewBox="-8 -8 16 16" width="10" height="10" fill="none">
              <path
                d="M0,-6 Q0,0 6,0 Q0,0 0,6 Q0,0 -6,0 Q0,0 0,-6 Z"
                fill="#F8D36A"
                opacity="0.9"
              />
              <circle cx="0" cy="0" r="1.4" fill="#FFFFFF" />
            </svg>
          </div>
        ))}
      </div>

      {/* 2. Signature Artisanal Crimson Red Butterfly Artwork */}
      <div ref={butterflyRef} className="fcit-ambient-butterfly">
        <svg
          className="fcit-ambient-butterfly-svg"
          viewBox="-35 -30 70 60"
          width="50"
          height="43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gBfCrimsonFore" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D97777" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#B31419" stopOpacity="0.95" />
              <stop offset="75%" stopColor="#851014" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#5A0F0E" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="gBfCrimsonHind" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C15B5B" stopOpacity="0.88" />
              <stop offset="40%" stopColor="#B31419" stopOpacity="0.90" />
              <stop offset="100%" stopColor="#5A0F0E" stopOpacity="0.92" />
            </linearGradient>

            <radialGradient id="gBfTranslucentCell" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FFF8E8" stopOpacity="0.55" />
              <stop offset="45%" stopColor="#D97777" stopOpacity="0.40" />
              <stop offset="100%" stopColor="#B31419" stopOpacity="0.10" />
            </radialGradient>

            <linearGradient id="gBfBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#400A0A" />
              <stop offset="50%" stopColor="#851014" />
              <stop offset="100%" stopColor="#300707" />
            </linearGradient>
          </defs>

          {/* LEFT WING (Anchored for 3D Flapping) */}
          <g className="fcit-bf-wing-anchor fcit-bf-wing-anchor--left">
            <g className="fcit-bf-wing fcit-bf-wing--left">
              <path
                d="M-1,-2 C-8,-14 -18,-24 -29,-20 C-34,-17 -34,-6 -27,2 C-21,9 -12,11 -1,4 Z"
                fill="url(#gBfCrimsonFore)"
                stroke="#5A0F0E"
                strokeWidth="0.75"
                strokeLinejoin="round"
              />
              <path
                d="M-5,-4 C-11,-12 -18,-17 -24,-14 C-27,-12 -26,-5 -21,0 C-16,5 -9,5 -5,-2 Z"
                fill="url(#gBfTranslucentCell)"
              />
              <path
                d="M-3,-1 C-12,-9 -20,-15 -27,-17 M-12,-9 C-19,-5 -25,-2 -26,1 M-15,-6 C-17,2 -20,6 -21,7"
                stroke="rgba(255, 248, 232, 0.45)"
                strokeWidth="0.5"
                strokeLinecap="round"
              />
              <circle cx="-29" cy="-18" r="0.8" fill="#D6B33F" opacity="0.85" />
              <circle cx="-32" cy="-12" r="0.7" fill="#D6B33F" opacity="0.80" />
              <circle cx="-31" cy="-4" r="0.7" fill="#D6B33F" opacity="0.80" />
              <circle cx="-27" cy="3" r="0.6" fill="#D6B33F" opacity="0.75" />

              <path
                d="M-1,3 C-9,7 -20,7 -23,14 C-25,19 -20,26 -13,24 C-6,22 -2,14 -1,7 Z"
                fill="url(#gBfCrimsonHind)"
                stroke="#5A0F0E"
                strokeWidth="0.7"
                strokeLinejoin="round"
              />
              <path
                d="M-3,5 C-9,8 -16,8 -18,13 C-19,16 -16,20 -11,19 C-6,17 -3,11 -3,6 Z"
                fill="url(#gBfTranslucentCell)"
              />
              <path
                d="M-2,4 C-9,10 -14,14 -17,19 M-9,10 C-14,12 -17,14 -18,17"
                stroke="rgba(255, 248, 232, 0.40)"
                strokeWidth="0.45"
                strokeLinecap="round"
              />
              <circle cx="-22" cy="16" r="0.6" fill="#D6B33F" opacity="0.80" />
              <circle cx="-18" cy="22" r="0.6" fill="#D6B33F" opacity="0.80" />
            </g>
          </g>

          {/* RIGHT WING (Anchored for 3D Flapping) */}
          <g className="fcit-bf-wing-anchor fcit-bf-wing-anchor--right">
            <g className="fcit-bf-wing fcit-bf-wing--right">
              <path
                d="M1,-2 C8,-14 18,-24 29,-20 C34,-17 34,-6 27,2 C21,9 12,11 1,4 Z"
                fill="url(#gBfCrimsonFore)"
                stroke="#5A0F0E"
                strokeWidth="0.75"
                strokeLinejoin="round"
              />
              <path
                d="M5,-4 C11,-12 18,-17 24,-14 C27,-12 26,-5 21,0 C16,5 9,5 5,-2 Z"
                fill="url(#gBfTranslucentCell)"
              />
              <path
                d="M3,-1 C12,-9 20,-15 27,-17 M12,-9 C19,-5 25,-2 26,1 M15,-6 C17,2 20,6 21,7"
                stroke="rgba(255, 248, 232, 0.45)"
                strokeWidth="0.5"
                strokeLinecap="round"
              />
              <circle cx="29" cy="-18" r="0.8" fill="#D6B33F" opacity="0.85" />
              <circle cx="32" cy="-12" r="0.7" fill="#D6B33F" opacity="0.80" />
              <circle cx="31" cy="-4" r="0.7" fill="#D6B33F" opacity="0.80" />
              <circle cx="27" cy="3" r="0.6" fill="#D6B33F" opacity="0.75" />

              <path
                d="M1,3 C9,7 20,7 23,14 C25,19 20,26 13,24 C6,22 2,14 1,7 Z"
                fill="url(#gBfCrimsonHind)"
                stroke="#5A0F0E"
                strokeWidth="0.7"
                strokeLinejoin="round"
              />
              <path
                d="M3,5 C9,8 16,8 18,13 C19,16 16,20 11,19 C6,17 3,11 3,6 Z"
                fill="url(#gBfTranslucentCell)"
              />
              <path
                d="M2,4 C9,10 14,14 17,19 M9,10 C14,12 17,14 18,17"
                stroke="rgba(255, 248, 232, 0.40)"
                strokeWidth="0.45"
                strokeLinecap="round"
              />
              <circle cx="22" cy="16" r="0.6" fill="#D6B33F" opacity="0.80" />
              <circle cx="18" cy="22" r="0.6" fill="#D6B33F" opacity="0.80" />
            </g>
          </g>

          {/* SLENDER BODY (Thorax, Abdomen, Antennae) */}
          <g className="fcit-bf-body">
            <g className="fcit-bf-antenna fcit-bf-antenna--left">
              <path
                d="M-0.8,-7 Q-4,-17 -8,-22"
                stroke="#5A0F0E"
                strokeWidth="0.75"
                strokeLinecap="round"
              />
              <circle cx="-8.2" cy="-22.2" r="0.8" fill="#D6B33F" />
            </g>

            <g className="fcit-bf-antenna fcit-bf-antenna--right">
              <path
                d="M0.8,-7 Q4,-17 8,-22"
                stroke="#5A0F0E"
                strokeWidth="0.75"
                strokeLinecap="round"
              />
              <circle cx="8.2" cy="-22.2" r="0.8" fill="#D6B33F" />
            </g>

            <g className="fcit-bf-torso">
              <circle cx="0" cy="-7" r="1.8" fill="#400A0A" />
              <ellipse cx="0" cy="-2" rx="2" ry="3.5" fill="url(#gBfBodyGrad)" />
              <ellipse cx="0" cy="8" rx="1.6" ry="6.5" fill="url(#gBfBodyGrad)" />
              <line x1="-1.2" y1="4" x2="1.2" y2="4" stroke="#D6B33F" strokeWidth="0.4" opacity="0.7" />
              <line x1="-1.4" y1="7" x2="1.4" y2="7" stroke="#D6B33F" strokeWidth="0.4" opacity="0.7" />
              <line x1="-1.2" y1="10" x2="1.2" y2="10" stroke="#D6B33F" strokeWidth="0.4" opacity="0.7" />
            </g>
          </g>
        </svg>
      </div>
    </aside>,
    document.body
  );
}
