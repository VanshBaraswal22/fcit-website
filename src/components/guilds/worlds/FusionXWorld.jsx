import React, { useState, useEffect, useRef } from 'react';

/**
 * FUSION X INTERACTIVE WORLD
 * Color System: Coral (#FF5E5B), Tangerine (#FFAA00), Deep Teal (#004E64 / #082B38), Warm Cream (#FAF5EE)
 *
 * Creative Features:
 * - Interactive multi-orbital system with revolving satellite sensor nodes
 * - Clickable research domain nodes: IoT Edge, Robotics Hardware, Quantum Algorithms, Embedded Telemetry
 * - Dynamic Lissajous / Harmonic wave oscillator
 * - Speed multiplier toggle (1x / 2x / 3x) that controls SVG orbital revolution speed
 * - High-contrast Deep Teal and Coral geometric aesthetic
 */

const ORBITAL_SATELLITES = [
  {
    id: 'iot',
    name: 'EDGE TELEMETRY',
    domain: 'Embedded Systems & LoRaWAN',
    frequency: '868 MHz',
    status: 'Transmitting',
    metric: '99.98% packet delivery',
  },
  {
    id: 'robotics',
    name: 'KINEMATICS ROS2',
    domain: 'Actuators & Autonomous Navigation',
    frequency: '100 Hz Loop',
    status: 'Nominal',
    metric: '6-DOF real-time feedback',
  },
  {
    id: 'quantum',
    name: 'Q-SIMULATION',
    domain: 'Quantum Circuit Emulation',
    frequency: '32-Qubit State',
    status: 'Simulating',
    metric: 'Entanglement fidelity 99.2%',
  },
  {
    id: 'dsp',
    name: 'DIGITAL SIGNAL DSP',
    domain: 'Harmonic Audio & Spectral FFT',
    frequency: '48 kHz 24-bit',
    status: 'Streaming',
    metric: 'SNR 104 dB dynamic range',
  },
];

export default function FusionXWorld({ isInView = true }) {
  const [activeSatellite, setActiveSatellite] = useState(ORBITAL_SATELLITES[0]);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [orbitAngle, setOrbitAngle] = useState(0);

  // Smooth continuous orbital rotation via requestAnimationFrame
  useEffect(() => {
    if (!isInView) return;
    let animId;
    let lastTime = performance.now();

    const loop = (now) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      setOrbitAngle((prev) => (prev + dt * 25 * speedMultiplier) % 360);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isInView, speedMultiplier]);

  const rad = (orbitAngle * Math.PI) / 180;
  const sat1X = 220 + Math.cos(rad) * 140;
  const sat1Y = 160 + Math.sin(rad) * 75;

  const sat2X = 220 + Math.cos(rad + Math.PI) * 140;
  const sat2Y = 160 + Math.sin(rad + Math.PI) * 75;

  const sat3X = 220 + Math.cos(-rad * 0.7) * 90;
  const sat3Y = 160 + Math.sin(-rad * 0.7) * 45;

  return (
    <div
      className="fusion-world-container"
      aria-label="Fusion X Interactive Innovation Laboratory"
    >
      {/* 1. Deep Teal Cosmos Background Grid & Atmospheric Glow */}
      <div className="fusion-teal-atmosphere" aria-hidden="true" />
      <div className="fusion-coral-glow" aria-hidden="true" />

      {/* 2. Top Interactive Action Strip: Velocity & Telemetry Status */}
      <div className="fusion-top-strip">
        <div className="fusion-live-tag">
          <span className="fusion-dot" />
          <span>ORBITAL LAB // GYROSCOPIC RESEARCH SYSTEM</span>
        </div>

        <div className="fusion-speed-controls">
          <span className="speed-label">ORBIT VELOCITY:</span>
          {[1, 2, 3].map((s) => (
            <button
              key={s}
              type="button"
              className={`speed-pill ${speedMultiplier === s ? 'is-active' : ''}`}
              onClick={() => setSpeedMultiplier(s)}
            >
              {s}X
            </button>
          ))}
        </div>
      </div>

      {/* 3. Main Stage: Split Concentric Orbits & Active Telemetry Card */}
      <div className="fusion-stage-split">
        {/* Left: Interactive Multi-Orbital Gyroscope SVG */}
        <div className="fusion-orbital-canvas-wrap">
          <svg className="fusion-orbital-svg" viewBox="0 0 440 320" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="orbitCoralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF5E5B" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#FFAA00" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#004E64" stopOpacity="0.1" />
              </linearGradient>

              <radialGradient id="fusionCoreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFAA00" stopOpacity="0.9" />
                <stop offset="45%" stopColor="#FF5E5B" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#004E64" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Outer Concentric Elliptical Orbit Paths */}
            <ellipse
              cx="220"
              cy="160"
              rx="180"
              ry="95"
              fill="none"
              stroke="rgba(255, 94, 91, 0.25)"
              strokeWidth="1.2"
              strokeDasharray="8 6"
              className="orbit-ring-outer"
            />
            <ellipse
              cx="220"
              cy="160"
              rx="140"
              ry="75"
              fill="none"
              stroke="url(#orbitCoralGrad)"
              strokeWidth="1.8"
              className="orbit-ring-mid"
            />
            <ellipse
              cx="220"
              cy="160"
              rx="90"
              ry="45"
              fill="none"
              stroke="rgba(255, 170, 0, 0.35)"
              strokeWidth="1.4"
              strokeDasharray="5 5"
              className="orbit-ring-inner"
            />

            {/* Central Gyroscopic Planetary Core */}
            <circle cx="220" cy="160" r="32" fill="url(#fusionCoreGlow)" className="fusion-core-ambient" />
            <circle cx="220" cy="160" r="16" fill="#004E64" stroke="#FF5E5B" strokeWidth="2.5" />
            <circle cx="220" cy="160" r="6" fill="#FFAA00" />

            {/* Harmonic Wave Rays passing through center */}
            <path
              d="M 40,160 Q 130,110 220,160 T 400,160"
              fill="none"
              stroke="#FFAA00"
              strokeWidth="1.5"
              strokeOpacity="0.4"
              className="harmonic-sine-wave"
            />

            {/* Revolving Satellite Sensor Nodes */}
            {/* Satellite 1: Outer Orbit */}
            <g
              className="satellite-node"
              onClick={() => setActiveSatellite(ORBITAL_SATELLITES[0])}
              style={{ cursor: 'pointer' }}
            >
              <circle cx={sat1X} cy={sat1Y} r="9" fill="#FF5E5B" stroke="#FAF5EE" strokeWidth="1.5" />
              <circle cx={sat1X} cy={sat1Y} r="16" fill="none" stroke="#FF5E5B" strokeWidth="1" strokeDasharray="3 3" />
              <text x={sat1X + 14} y={sat1Y + 4} className="sat-svg-label">
                SAT_01 // IOT
              </text>
            </g>

            {/* Satellite 2: Mid Orbit */}
            <g
              className="satellite-node"
              onClick={() => setActiveSatellite(ORBITAL_SATELLITES[1])}
              style={{ cursor: 'pointer' }}
            >
              <circle cx={sat2X} cy={sat2Y} r="8" fill="#FFAA00" stroke="#004E64" strokeWidth="1.5" />
              <text x={sat2X + 12} y={sat2Y + 4} className="sat-svg-label">
                SAT_02 // ROS2
              </text>
            </g>

            {/* Satellite 3: Inner Orbit */}
            <g
              className="satellite-node"
              onClick={() => setActiveSatellite(ORBITAL_SATELLITES[2])}
              style={{ cursor: 'pointer' }}
            >
              <circle cx={sat3X} cy={sat3Y} r="6.5" fill="#FAF5EE" stroke="#FF5E5B" strokeWidth="1.5" />
              <text x={sat3X + 10} y={sat3Y + 4} className="sat-svg-label">
                SAT_03 // Q-SIM
              </text>
            </g>
          </svg>
        </div>

        {/* Right: Active Satellite Telemetry Card & Domain Selector */}
        <div className="fusion-telemetry-panel">
          <div className="fusion-telemetry-card">
            <div className="telemetry-card-top">
              <span className="fusion-chip-badge">{activeSatellite.name}</span>
              <span className="telemetry-live-state">
                <span className="pulse-beacon" />
                {activeSatellite.status}
              </span>
            </div>

            <h4 className="satellite-domain-title">{activeSatellite.domain}</h4>

            <div className="satellite-metrics-grid">
              <div className="metric-box">
                <span className="metric-box-label">FREQUENCY / CLOCK</span>
                <span className="metric-box-val">{activeSatellite.frequency}</span>
              </div>
              <div className="metric-box">
                <span className="metric-box-label">DIAGNOSTIC HEALTH</span>
                <span className="metric-box-val">{activeSatellite.metric}</span>
              </div>
            </div>

            {/* Selector Pills */}
            <div className="satellite-switcher" role="tablist">
              {ORBITAL_SATELLITES.map((sat) => {
                const isSelected = activeSatellite.id === sat.id;
                return (
                  <button
                    key={sat.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`sat-switcher-pill ${isSelected ? 'is-active' : ''}`}
                    onClick={() => setActiveSatellite(sat)}
                  >
                    <span>{sat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
