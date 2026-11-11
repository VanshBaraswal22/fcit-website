import React from 'react';

/**
 * GuildArtworkOverlay
 * High-performance, hardware-accelerated transparent SVG overlay
 * that renders subtle continuous living illustrations aligned directly
 * over the background WebP artwork for both the Homepage preview and
 * the dedicated Working Guilds page.
 *
 * Supports two variants:
 * - 'compact': viewBox 0 0 400 500 (homepage portrait cards)
 * - 'stage': viewBox 0 0 834 469 (dedicated page generous landscape compositions)
 */
export default function GuildArtworkOverlay({
  guildType = 'devs',
  variant = 'compact',
  isInView = true,
  className = '',
}) {
  const isStage = variant === 'stage';
  const overlayClass = `guild-artwork-overlay guild-artwork-overlay--${guildType} guild-artwork-overlay--${variant} ${
    isInView ? 'is-in-view' : ''
  } ${className}`.trim();

  switch (guildType) {
    case 'devs':
      return (
        <div className={overlayClass} aria-hidden="true">
          {isStage ? (
            /* DEDICATED WORKING GUILDS STAGE (viewBox 0 0 834 469) */
            <svg viewBox="0 0 834 469" className="guild-artwork-overlay-svg" preserveAspectRatio="none">
              <defs>
                <radialGradient id="devsPortalGlowStage" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#D6AD54" stopOpacity="0.6" />
                  <stop offset="65%" stopColor="#D6AD54" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#D6AD54" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="devsRailGradStage" x1="0%" y1="100%" x2="70%" y2="0%">
                  <stop offset="0%" stopColor="#D6AD54" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#FFF8E8" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#D6AD54" stopOpacity="0.65" />
                </linearGradient>
                <linearGradient id="devsBridgeBeamGradStage" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D6AD54" stopOpacity="0" />
                  <stop offset="50%" stopColor="#FFF8E8" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#D6AD54" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* 1. S-Curved Golden Pathway Rails flowing towards the Gateway */}
              <path
                d="M 75 469 C 180 435, 305 365, 425 295 C 468 260, 488 230, 498 188"
                fill="none"
                stroke="url(#devsRailGradStage)"
                strokeWidth="2.2"
                strokeDasharray="18 22"
                className="devs-highway-stream stream-left"
              />
              <path
                d="M 112 469 C 218 435, 338 365, 452 295 C 490 260, 508 230, 518 188"
                fill="none"
                stroke="url(#devsRailGradStage)"
                strokeWidth="2.2"
                strokeDasharray="18 22"
                className="devs-highway-stream stream-right"
              />

              {/* High-intensity traveling light pulse along the bridge center */}
              <path
                d="M 94 469 C 199 435, 322 365, 438 295 C 479 260, 498 230, 508 188"
                fill="none"
                stroke="url(#devsBridgeBeamGradStage)"
                strokeWidth="3.4"
                strokeDasharray="45 320"
                className="devs-bridge-pulse"
              />

              {/* Continuous Golden Photons Travelling towards Portal */}
              <circle r="4.2" fill="#D6AD54" className="devs-travel-photon photon-1" />
              <circle r="3.2" fill="#FFF8E8" className="devs-travel-photon photon-2" />

              {/* 2. Gateway Arch Illumination & Radiant Portal Chamber */}
              <ellipse cx="514" cy="172" rx="48" ry="52" fill="url(#devsPortalGlowStage)" className="devs-portal-ambient" />
              <path
                d="M 466 182 A 48 54 0 0 1 562 182"
                fill="none"
                stroke="#D6AD54"
                strokeWidth="2.4"
                className="devs-arch-contour"
              />

              {/* 3. Floating 3D Cloud Icon Accent over Right Bastion Terrace */}
              <g className="devs-cloud-group">
                <path
                  d="M 668 112 Q 668 96 684 96 Q 692 88 705 92 Q 718 89 722 101 Q 732 104 732 113 Q 732 122 720 122 L 680 122 Q 668 122 668 112 Z"
                  fill="none"
                  stroke="#D6AD54"
                  strokeWidth="1.6"
                  className="devs-cloud-frame"
                />
                <line x1="700" y1="117" x2="700" y2="103" stroke="#D6AD54" strokeWidth="1.6" className="devs-cloud-arrow" />
                <polyline points="696,107 700,102 704,107" fill="none" stroke="#D6AD54" strokeWidth="1.6" className="devs-cloud-arrow" />
              </g>

              {/* 4. Small Code Symbols Appearing and Disappearing in Architectural Space */}
              <g className="devs-code-symbols">
                <text x="350" y="240" className="devs-code-glyph glyph-1">&lt;/&gt;</text>
                <text x="635" y="165" className="devs-code-glyph glyph-2">&#123; &#125;</text>
                <text x="445" y="340" className="devs-code-glyph glyph-3">01</text>
                <text x="605" y="295" className="devs-code-glyph glyph-4">&lambda;</text>
                <text x="270" y="390" className="devs-code-glyph glyph-5">//</text>
              </g>

              {/* 5. Subtle Flowing Burgundy Ribbon Shimmer */}
              <path
                d="M 310 90 C 210 210, 150 330, 130 460"
                fill="none"
                stroke="rgba(141, 16, 34, 0.5)"
                strokeWidth="3.2"
                strokeDasharray="30 55"
                className="devs-ribbon-shimmer"
              />

              {/* 6. Architectural Edge Shimmer along Upper Entablature */}
              <line x1="450" y1="102" x2="578" y2="102" stroke="#FFF8E8" strokeWidth="1.5" strokeDasharray="24 48" className="devs-entablature-shimmer" />

              {/* Server Rack LED Status Blips on Right Terrace */}
              <circle cx="675" cy="255" r="2.2" fill="#D6AD54" className="devs-server-led led-a" />
              <circle cx="695" cy="255" r="2.2" fill="#D6AD54" className="devs-server-led led-b" />
              <circle cx="715" cy="255" r="2.2" fill="#D6AD54" className="devs-server-led led-c" />
            </svg>
          ) : (
            /* HOMEPAGE COMPACT PORTRAIT CARD (viewBox 0 0 400 500) */
            <svg viewBox="0 0 400 500" className="guild-artwork-overlay-svg" preserveAspectRatio="none">
              <defs>
                <radialGradient id="devsPortalGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#D6AD54" stopOpacity="0.55" />
                  <stop offset="70%" stopColor="#D6AD54" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="#D6AD54" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="devsRailGrad" x1="0%" y1="100%" x2="70%" y2="0%">
                  <stop offset="0%" stopColor="#D6AD54" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#FFF8E8" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#D6AD54" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="devsBridgeBeamGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D6AD54" stopOpacity="0" />
                  <stop offset="50%" stopColor="#FFF8E8" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#D6AD54" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* 1. S-Curved Golden Pathway Rails flowing towards the Gateway */}
              <path
                d="M 35 490 C 85 430, 150 350, 210 270 C 224 250, 233 225, 238 185"
                fill="none"
                stroke="url(#devsRailGrad)"
                strokeWidth="1.6"
                strokeDasharray="14 18"
                className="devs-highway-stream stream-left"
              />
              <path
                d="M 58 490 C 108 430, 172 350, 230 270 C 242 250, 248 225, 252 185"
                fill="none"
                stroke="url(#devsRailGrad)"
                strokeWidth="1.6"
                strokeDasharray="14 18"
                className="devs-highway-stream stream-right"
              />

              {/* Traveling light pulse along the bridge center */}
              <path
                d="M 46 490 C 96 430, 161 350, 220 270 C 233 250, 240 225, 245 185"
                fill="none"
                stroke="url(#devsBridgeBeamGrad)"
                strokeWidth="2.6"
                strokeDasharray="35 240"
                className="devs-bridge-pulse"
              />

              {/* Continuous Golden Photons Travelling towards Portal */}
              <circle r="3.2" fill="#D6AD54" className="devs-travel-photon photon-1" />
              <circle r="2.4" fill="#FFF8E8" className="devs-travel-photon photon-2" />

              {/* 2. Gateway Arch Illumination & Radiant Portal Chamber */}
              <ellipse cx="245" cy="182" rx="28" ry="30" fill="url(#devsPortalGlow)" className="devs-portal-ambient" />
              <path
                d="M 218 192 A 28 32 0 0 1 272 192"
                fill="none"
                stroke="#D6AD54"
                strokeWidth="1.8"
                className="devs-arch-contour"
              />

              {/* 3. Floating 3D Cloud Icon Accent over Right Bastion Terrace */}
              <g className="devs-cloud-group">
                <path
                  d="M 306 118 Q 306 108 316 108 Q 321 102 329 105 Q 337 103 339 111 Q 345 113 345 119 Q 345 125 337 125 L 314 125 Q 306 125 306 118 Z"
                  fill="none"
                  stroke="#D6AD54"
                  strokeWidth="1.3"
                  className="devs-cloud-frame"
                />
                <line x1="325" y1="122" x2="325" y2="113" stroke="#D6AD54" strokeWidth="1.4" className="devs-cloud-arrow" />
                <polyline points="322,116 325,112 328,116" fill="none" stroke="#D6AD54" strokeWidth="1.4" className="devs-cloud-arrow" />
              </g>

              {/* 4. Small Code Symbols Appearing and Disappearing in Architectural Space */}
              <g className="devs-code-symbols">
                <text x="165" y="245" className="devs-code-glyph glyph-1">&lt;/&gt;</text>
                <text x="295" y="150" className="devs-code-glyph glyph-2">&#123; &#125;</text>
                <text x="210" y="325" className="devs-code-glyph glyph-3">01</text>
                <text x="275" y="275" className="devs-code-glyph glyph-4">&lambda;</text>
                <text x="115" y="385" className="devs-code-glyph glyph-5">//</text>
              </g>

              {/* 5. Subtle Flowing Burgundy Ribbon Shimmer */}
              <path
                d="M 142 95 C 100 180, 80 270, 72 380"
                fill="none"
                stroke="rgba(141, 16, 34, 0.45)"
                strokeWidth="2.5"
                strokeDasharray="25 50"
                className="devs-ribbon-shimmer"
              />

              {/* 6. Architectural Edge Shimmer along Upper Entablature */}
              <line x1="210" y1="120" x2="280" y2="120" stroke="#FFF8E8" strokeWidth="1.2" strokeDasharray="18 40" className="devs-entablature-shimmer" />

              {/* Server Rack LED Status Blips on Right Terrace */}
              <circle cx="316" cy="154" r="1.5" fill="#D6AD54" className="devs-server-led led-a" />
              <circle cx="328" cy="154" r="1.5" fill="#D6AD54" className="devs-server-led led-b" />
              <circle cx="340" cy="154" r="1.5" fill="#D6AD54" className="devs-server-led led-c" />
            </svg>
          )}
        </div>
      );

    case 'intelligence':
      return (
        <div className={overlayClass} aria-hidden="true">
          {isStage ? (
            /* DEDICATED WORKING GUILDS STAGE (viewBox 0 0 835 469) */
            <svg viewBox="0 0 835 469" className="guild-artwork-overlay-svg" preserveAspectRatio="none">
              <defs>
                <radialGradient id="intelBrainGlowStage" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#D6AD54" stopOpacity="0.55" />
                  <stop offset="60%" stopColor="#D6AD54" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="#D6AD54" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* 1. Very Slow Orbital Rings surrounding Marble Bust Cranium (Center: 672, 195) */}
              <g className="intel-orbit-group intel-orbit-group--cw">
                <ellipse cx="672" cy="195" rx="124" ry="54" fill="none" stroke="rgba(214, 173, 84, 0.45)" strokeWidth="1.2" className="intel-orbit-ellipse" />
                <circle cx="796" cy="195" r="3.4" fill="#D6AD54" className="intel-orbit-dot" />
              </g>
              <g className="intel-orbit-group intel-orbit-group--ccw">
                <ellipse cx="672" cy="195" rx="148" ry="46" fill="none" stroke="rgba(242, 232, 213, 0.35)" strokeWidth="1" className="intel-orbit-ellipse" />
                <circle cx="524" cy="195" r="2.8" fill="#FFF8E8" className="intel-orbit-dot" />
              </g>

              {/* 2. Central Neural Network Ambient Core Glow & Expanding Resonance Waves */}
              <circle cx="672" cy="195" r="58" fill="url(#intelBrainGlowStage)" className="intel-core-aura" />
              <circle cx="672" cy="195" r="26" fill="none" stroke="#D6AD54" strokeWidth="1.4" className="intel-resonance-wave wave-1" />
              <circle cx="672" cy="195" r="48" fill="none" stroke="rgba(255, 248, 232, 0.7)" strokeWidth="1" className="intel-resonance-wave wave-2" />

              {/* 3. Neural Network Connecting Lines (Synapses) with Sequential Signal Pulses */}
              <g className="intel-synapses">
                <line x1="618" y1="152" x2="672" y2="195" className="intel-syn-edge syn-1" />
                <line x1="668" y1="128" x2="672" y2="195" className="intel-syn-edge syn-2" />
                <line x1="672" y1="195" x2="726" y2="150" className="intel-syn-edge syn-3" />
                <line x1="672" y1="195" x2="746" y2="200" className="intel-syn-edge syn-4" />
                <line x1="672" y1="195" x2="712" y2="240" className="intel-syn-edge syn-5" />
                <line x1="672" y1="195" x2="642" y2="235" className="intel-syn-edge syn-6" />
                <line x1="612" y1="192" x2="672" y2="195" className="intel-syn-edge syn-7" />

                {/* Perimeter Geodesic Facet Lines */}
                <line x1="618" y1="152" x2="668" y2="128" className="intel-facet-edge facet-1" />
                <line x1="668" y1="128" x2="726" y2="150" className="intel-facet-edge facet-2" />
                <line x1="726" y1="150" x2="746" y2="200" className="intel-facet-edge facet-3" />
                <line x1="746" y1="200" x2="712" y2="240" className="intel-facet-edge facet-4" />
                <line x1="712" y1="240" x2="642" y2="235" className="intel-facet-edge facet-5" />
                <line x1="642" y1="235" x2="612" y2="192" className="intel-facet-edge facet-6" />
                <line x1="612" y1="192" x2="618" y2="152" className="intel-facet-edge facet-7" />
              </g>

              {/* 4. Sequential Neural Nodes */}
              <circle cx="618" cy="152" r="4.2" fill="#FFF8E8" className="intel-neural-node node-1" />
              <circle cx="668" cy="128" r="4.2" fill="#D6AD54" className="intel-neural-node node-2" />
              <circle cx="726" cy="150" r="4.2" fill="#FFF8E8" className="intel-neural-node node-3" />
              <circle cx="746" cy="200" r="4.2" fill="#D6AD54" className="intel-neural-node node-4" />
              <circle cx="712" cy="240" r="4.2" fill="#FFF8E8" className="intel-neural-node node-5" />
              <circle cx="642" cy="235" r="4.2" fill="#D6AD54" className="intel-neural-node node-6" />
              <circle cx="612" cy="192" r="4.2" fill="#FFF8E8" className="intel-neural-node node-7" />

              {/* Cognitive Hub Node (Primary Focal Point) */}
              <circle cx="672" cy="195" r="6.5" fill="#D6AD54" className="intel-neural-node node-hub" />
              <circle cx="672" cy="195" r="14" fill="none" stroke="#D6AD54" strokeWidth="1.2" strokeDasharray="3 3" className="intel-hub-halo" />

              {/* 5. Holographic Signal Wave & Graph Traces on Left Panels */}
              <path d="M 140 280 Q 165 250 190 280 T 240 280 T 280 280" fill="none" stroke="#D6AD54" strokeWidth="1.4" className="intel-waveform-trace" />
              <polyline points="140,220 175,200 215,225 250,185 285,195" fill="none" stroke="rgba(214, 173, 84, 0.45)" strokeWidth="1.1" strokeDasharray="4 4" />
            </svg>
          ) : (
            /* HOMEPAGE COMPACT PORTRAIT CARD (viewBox 0 0 400 500) */
            <svg viewBox="0 0 400 500" className="guild-artwork-overlay-svg" preserveAspectRatio="none">
              <defs>
                <radialGradient id="intelBrainGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#D6AD54" stopOpacity="0.5" />
                  <stop offset="60%" stopColor="#D6AD54" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#D6AD54" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* 1. Very Slow Orbital Rings surrounding the Head (Center: 270, 155) */}
              <g className="intel-orbit-group intel-orbit-group--cw">
                <ellipse cx="270" cy="155" rx="76" ry="32" fill="none" stroke="rgba(214, 173, 84, 0.45)" strokeWidth="1" className="intel-orbit-ellipse" />
                <circle cx="346" cy="155" r="2.6" fill="#D6AD54" className="intel-orbit-dot" />
              </g>
              <g className="intel-orbit-group intel-orbit-group--ccw">
                <ellipse cx="270" cy="155" rx="94" ry="26" fill="none" stroke="rgba(242, 232, 213, 0.32)" strokeWidth="0.85" className="intel-orbit-ellipse" />
                <circle cx="176" cy="155" r="2.2" fill="#FFF8E8" className="intel-orbit-dot" />
              </g>

              {/* 2. Central Neural Network Ambient Core Glow & Expanding Resonance Waves */}
              <circle cx="270" cy="155" r="42" fill="url(#intelBrainGlow)" className="intel-core-aura" />
              <circle cx="270" cy="155" r="18" fill="none" stroke="#D6AD54" strokeWidth="1.2" className="intel-resonance-wave wave-1" />
              <circle cx="270" cy="155" r="32" fill="none" stroke="rgba(255, 248, 232, 0.7)" strokeWidth="0.8" className="intel-resonance-wave wave-2" />

              {/* 3. Neural Network Connecting Lines (Synapses) */}
              <g className="intel-synapses">
                <line x1="236" y1="125" x2="270" y2="155" className="intel-syn-edge syn-1" />
                <line x1="268" y1="108" x2="270" y2="155" className="intel-syn-edge syn-2" />
                <line x1="270" y1="155" x2="306" y2="124" className="intel-syn-edge syn-3" />
                <line x1="270" y1="155" x2="318" y2="158" className="intel-syn-edge syn-4" />
                <line x1="270" y1="155" x2="296" y2="186" className="intel-syn-edge syn-5" />
                <line x1="270" y1="155" x2="250" y2="182" className="intel-syn-edge syn-6" />
                <line x1="232" y1="150" x2="270" y2="155" className="intel-syn-edge syn-7" />

                {/* Perimeter Geodesic Facet Lines */}
                <line x1="236" y1="125" x2="268" y2="108" className="intel-facet-edge facet-1" />
                <line x1="268" y1="108" x2="306" y2="124" className="intel-facet-edge facet-2" />
                <line x1="306" y1="124" x2="318" y2="158" className="intel-facet-edge facet-3" />
                <line x1="318" y1="158" x2="296" y2="186" className="intel-facet-edge facet-4" />
                <line x1="296" y1="186" x2="250" y2="182" className="intel-facet-edge facet-5" />
                <line x1="250" y1="182" x2="232" y2="150" className="intel-facet-edge facet-6" />
                <line x1="232" y1="150" x2="236" y2="125" className="intel-facet-edge facet-7" />
              </g>

              {/* 4. Sequential Neural Nodes */}
              <circle cx="236" cy="125" r="3.2" fill="#FFF8E8" className="intel-neural-node node-1" />
              <circle cx="268" cy="108" r="3.2" fill="#D6AD54" className="intel-neural-node node-2" />
              <circle cx="306" cy="124" r="3.2" fill="#FFF8E8" className="intel-neural-node node-3" />
              <circle cx="318" cy="158" r="3.2" fill="#D6AD54" className="intel-neural-node node-4" />
              <circle cx="296" cy="186" r="3.2" fill="#FFF8E8" className="intel-neural-node node-5" />
              <circle cx="250" cy="182" r="3.2" fill="#D6AD54" className="intel-neural-node node-6" />
              <circle cx="232" cy="150" r="3.2" fill="#FFF8E8" className="intel-neural-node node-7" />

              {/* Cognitive Hub Node (Primary Focal Point) */}
              <circle cx="270" cy="155" r="5" fill="#D6AD54" className="intel-neural-node node-hub" />
              <circle cx="270" cy="155" r="11" fill="none" stroke="#D6AD54" strokeWidth="1" strokeDasharray="3 3" className="intel-hub-halo" />

              {/* 5. Holographic Signal Wave on Left */}
              <path d="M 85 185 Q 98 168 110 185 T 135 185 T 155 185" fill="none" stroke="#D6AD54" strokeWidth="1.2" className="intel-waveform-trace" />
            </svg>
          )}
        </div>
      );

    case 'algo':
      return (
        <div className={overlayClass} aria-hidden="true">
          {isStage ? (
            /* DEDICATED WORKING GUILDS STAGE (viewBox 0 0 834 470) */
            <svg viewBox="0 0 834 470" className="guild-artwork-overlay-svg" preserveAspectRatio="none">
              <defs>
                <radialGradient id="algoJunctionGlowStage" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#D6AD54" stopOpacity="0.55" />
                  <stop offset="70%" stopColor="#D6AD54" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#D6AD54" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* 1. Algorithmic Graph Traversal Connections (Lines Drawing Themselves) */}
              <g className="algo-graph-connections">
                <line x1="150" y1="310" x2="265" y2="230" className="algo-graph-edge edge-step-1" />
                <line x1="265" y1="230" x2="350" y2="155" className="algo-graph-edge edge-step-2a" />
                <line x1="265" y1="230" x2="425" y2="235" className="algo-graph-edge edge-step-2b" />
                <line x1="265" y1="230" x2="435" y2="345" className="algo-graph-edge edge-step-2c" />
                <line x1="350" y1="155" x2="530" y2="275" className="algo-graph-edge edge-step-3a" />
                <line x1="425" y1="235" x2="530" y2="275" className="algo-graph-edge edge-step-3b" />
                <line x1="435" y1="345" x2="530" y2="275" className="algo-graph-edge edge-step-3c" />
                <line x1="530" y1="275" x2="650" y2="195" className="algo-graph-edge edge-step-4" />
              </g>

              {/* 2. Highlighted Algorithmic Shortest-Path Tracer (Dijkstra / Optimal Path) */}
              <path
                d="M 150 310 L 265 230 L 425 235 L 530 275 L 650 195"
                fill="none"
                stroke="#FFF8E8"
                strokeWidth="2.4"
                strokeDasharray="40 540"
                className="algo-shortest-path-beam"
              />

              {/* 3. Selected Isometric Cube Edge Traces */}
              <polygon
                points="425,185 480,215 425,245 370,215"
                fill="none"
                stroke="#D6AD54"
                strokeWidth="1.6"
                strokeDasharray="10 10"
                className="algo-cube-top-edge"
              />
              <line x1="425" y1="245" x2="425" y2="305" stroke="#D6AD54" strokeWidth="1.8" className="algo-cube-vertical-edge" />
              <circle cx="425" cy="235" r="45" fill="url(#algoJunctionGlowStage)" className="algo-junction-glow" />

              {/* 4. Graph Nodes Illuminating in Deliberate Traversal Sequence */}
              <circle cx="150" cy="310" r="4.5" fill="#D6AD54" className="algo-seq-node node-a" />
              <circle cx="265" cy="230" r="5.2" fill="#FFF8E8" className="algo-seq-node node-b" />
              <circle cx="350" cy="155" r="4.2" fill="#D6AD54" className="algo-seq-node node-c" />
              <circle cx="425" cy="235" r="6.2" fill="#D6AD54" className="algo-seq-node node-d" />
              <circle cx="435" cy="345" r="4.2" fill="#D6AD54" className="algo-seq-node node-e" />
              <circle cx="530" cy="275" r="5.2" fill="#FFF8E8" className="algo-seq-node node-f" />
              <circle cx="650" cy="195" r="5.8" fill="#D6AD54" className="algo-seq-node node-g" />

              {/* 5. Subtle Floating Geometric Accents */}
              <g className="algo-floating-accent accent-1">
                <rect x="176" y="206" width="10" height="10" fill="none" stroke="#D6AD54" strokeWidth="1.2" transform="rotate(45 181 211)" />
              </g>
              <g className="algo-floating-accent accent-2">
                <rect x="616" y="326" width="9" height="9" fill="none" stroke="#FFF8E8" strokeWidth="1.1" transform="rotate(45 620.5 330.5)" />
              </g>
            </svg>
          ) : (
            /* HOMEPAGE COMPACT PORTRAIT CARD (viewBox 0 0 400 500) */
            <svg viewBox="0 0 400 500" className="guild-artwork-overlay-svg" preserveAspectRatio="none">
              <defs>
                <radialGradient id="algoJunctionGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#D6AD54" stopOpacity="0.5" />
                  <stop offset="70%" stopColor="#D6AD54" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#D6AD54" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* 1. Algorithmic Graph Traversal Connections */}
              <g className="algo-graph-connections">
                <line x1="75" y1="275" x2="135" y2="215" className="algo-graph-edge edge-step-1" />
                <line x1="135" y1="215" x2="195" y2="165" className="algo-graph-edge edge-step-2a" />
                <line x1="135" y1="215" x2="200" y2="245" className="algo-graph-edge edge-step-2b" />
                <line x1="135" y1="215" x2="205" y2="325" className="algo-graph-edge edge-step-2c" />
                <line x1="195" y1="165" x2="265" y2="275" className="algo-graph-edge edge-step-3a" />
                <line x1="200" y1="245" x2="265" y2="275" className="algo-graph-edge edge-step-3b" />
                <line x1="205" y1="325" x2="265" y2="275" className="algo-graph-edge edge-step-3c" />
                <line x1="265" y1="275" x2="325" y2="215" className="algo-graph-edge edge-step-4" />
              </g>

              {/* 2. Highlighted Algorithmic Shortest-Path Tracer */}
              <path
                d="M 75 275 L 135 215 L 200 245 L 265 275 L 325 215"
                fill="none"
                stroke="#FFF8E8"
                strokeWidth="1.8"
                strokeDasharray="25 360"
                className="algo-shortest-path-beam"
              />

              {/* 3. Selected Isometric Cube Edge Traces */}
              <polygon
                points="200,215 235,235 200,255 165,235"
                fill="none"
                stroke="#D6AD54"
                strokeWidth="1.3"
                strokeDasharray="8 8"
                className="algo-cube-top-edge"
              />
              <line x1="200" y1="255" x2="200" y2="295" stroke="#D6AD54" strokeWidth="1.4" className="algo-cube-vertical-edge" />
              <circle cx="200" cy="245" r="28" fill="url(#algoJunctionGlow)" className="algo-junction-glow" />

              {/* 4. Graph Nodes Illuminating in Deliberate Traversal Sequence */}
              <circle cx="75" cy="275" r="3.5" fill="#D6AD54" className="algo-seq-node node-a" />
              <circle cx="135" cy="215" r="4.2" fill="#FFF8E8" className="algo-seq-node node-b" />
              <circle cx="195" cy="165" r="3.5" fill="#D6AD54" className="algo-seq-node node-c" />
              <circle cx="200" cy="245" r="5.0" fill="#D6AD54" className="algo-seq-node node-d" />
              <circle cx="205" cy="325" r="3.5" fill="#D6AD54" className="algo-seq-node node-e" />
              <circle cx="265" cy="275" r="4.2" fill="#FFF8E8" className="algo-seq-node node-f" />
              <circle cx="325" cy="215" r="4.8" fill="#D6AD54" className="algo-seq-node node-g" />

              {/* 5. Subtle Floating Geometric Accents */}
              <g className="algo-floating-accent accent-1">
                <rect x="88" y="180" width="8" height="8" fill="none" stroke="#D6AD54" strokeWidth="1" transform="rotate(45 92 184)" />
              </g>
              <g className="algo-floating-accent accent-2">
                <rect x="310" y="290" width="7" height="7" fill="none" stroke="#FFF8E8" strokeWidth="0.9" transform="rotate(45 313.5 293.5)" />
              </g>
            </svg>
          )}
        </div>
      );

    case 'fusion':
      return (
        <div className={overlayClass} aria-hidden="true">
          {isStage ? (
            /* DEDICATED WORKING GUILDS STAGE (viewBox 0 0 835 470) */
            <svg viewBox="0 0 835 470" className="guild-artwork-overlay-svg" preserveAspectRatio="none">
              <defs>
                <radialGradient id="fusionCoreGlowStage" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#D6AD54" stopOpacity="0.6" />
                  <stop offset="60%" stopColor="#D6AD54" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#D6AD54" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="fusionGlintStage" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D6AD54" stopOpacity="0" />
                  <stop offset="45%" stopColor="#FFF8E8" stopOpacity="0.9" />
                  <stop offset="55%" stopColor="#FFF8E8" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#D6AD54" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* 1. Slow Rotation of Nested Orbital Rings (Center: 490, 235) */}
              <g className="fusion-ring-rotator ring-cw">
                <ellipse cx="490" cy="235" rx="155" ry="68" fill="none" stroke="rgba(214, 173, 84, 0.55)" strokeWidth="1.3" className="fusion-ring-track" />
                <circle cx="645" cy="235" r="3.8" fill="#D6AD54" className="fusion-satellite sat-1" />
              </g>
              <g className="fusion-ring-rotator ring-ccw">
                <ellipse cx="490" cy="235" rx="142" ry="58" fill="none" stroke="rgba(242, 232, 213, 0.45)" strokeWidth="1.1" className="fusion-ring-track" />
                <circle cx="348" cy="235" r="3.2" fill="#FFF8E8" className="fusion-satellite sat-2" />
              </g>
              <g className="fusion-ring-rotator ring-equatorial">
                <ellipse cx="490" cy="235" rx="165" ry="76" fill="none" stroke="rgba(214, 173, 84, 0.38)" strokeWidth="0.95" className="fusion-ring-track" />
                <circle cx="490" cy="159" r="2.8" fill="#D6AD54" className="fusion-satellite sat-3" />
              </g>

              {/* 2. Floating Central Object & Gentle Central Illumination Pulses */}
              <g className="fusion-core-float">
                <circle cx="490" cy="235" r="54" fill="url(#fusionCoreGlowStage)" className="fusion-central-aura" />
                {/* Soft Specular Reflective Glint Passing Over Central Core */}
                <line x1="450" y1="205" x2="530" y2="265" stroke="url(#fusionGlintStage)" strokeWidth="2.8" className="fusion-core-glint-bar" />
              </g>

              {/* 3. Small Technical Symbols Illuminating Periodically */}
              <g className="fusion-tech-symbols">
                <text x="460" y="165" className="fusion-symbol-glyph glyph-a">&Delta;</text>
                <text x="540" y="180" className="fusion-symbol-glyph glyph-b">&int;</text>
                <text x="440" y="295" className="fusion-symbol-glyph glyph-c">&oplus;</text>
                <text x="535" y="315" className="fusion-symbol-glyph glyph-d">&#x26A1;</text>
                <text x="375" y="250" className="fusion-symbol-glyph glyph-e">&lambda;</text>
              </g>

              {/* 4. Subtle Floating Discipline Badges with Halo Accents */}
              <g className="fusion-badge-node badge-cpu">
                <circle cx="365" cy="135" r="18" fill="none" stroke="#D6AD54" strokeWidth="1.1" strokeDasharray="3 3" />
                <circle cx="365" cy="135" r="4.0" fill="#D6AD54" />
              </g>
              <g className="fusion-badge-node badge-atom">
                <circle cx="615" cy="120" r="18" fill="none" stroke="#FFF8E8" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="615" cy="120" r="4.0" fill="#FFF8E8" />
              </g>
              <g className="fusion-badge-node badge-leaf">
                <circle cx="595" cy="350" r="18" fill="none" stroke="#D6AD54" strokeWidth="1.1" strokeDasharray="3 3" />
                <circle cx="595" cy="350" r="4.0" fill="#D6AD54" />
              </g>
              <g className="fusion-badge-node badge-systems">
                <circle cx="385" cy="340" r="18" fill="none" stroke="#FFF8E8" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="385" cy="340" r="4.0" fill="#FFF8E8" />
              </g>
            </svg>
          ) : (
            /* HOMEPAGE COMPACT PORTRAIT CARD (viewBox 0 0 400 500) */
            <svg viewBox="0 0 400 500" className="guild-artwork-overlay-svg" preserveAspectRatio="none">
              <defs>
                <radialGradient id="fusionCoreGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#D6AD54" stopOpacity="0.55" />
                  <stop offset="60%" stopColor="#D6AD54" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#D6AD54" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="fusionGlint" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D6AD54" stopOpacity="0" />
                  <stop offset="45%" stopColor="#FFF8E8" stopOpacity="0.9" />
                  <stop offset="55%" stopColor="#FFF8E8" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#D6AD54" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* 1. Slow Rotation of Nested Orbital Rings (Center: 215, 230) */}
              <g className="fusion-ring-rotator ring-cw">
                <ellipse cx="215" cy="230" rx="98" ry="42" fill="none" stroke="rgba(214, 173, 84, 0.55)" strokeWidth="1.1" className="fusion-ring-track" />
                <circle cx="313" cy="230" r="3" fill="#D6AD54" className="fusion-satellite sat-1" />
              </g>
              <g className="fusion-ring-rotator ring-ccw">
                <ellipse cx="215" cy="230" rx="90" ry="36" fill="none" stroke="rgba(242, 232, 213, 0.42)" strokeWidth="0.95" className="fusion-ring-track" />
                <circle cx="125" cy="230" r="2.5" fill="#FFF8E8" className="fusion-satellite sat-2" />
              </g>
              <g className="fusion-ring-rotator ring-equatorial">
                <ellipse cx="215" cy="230" rx="104" ry="48" fill="none" stroke="rgba(214, 173, 84, 0.35)" strokeWidth="0.85" className="fusion-ring-track" />
                <circle cx="215" cy="182" r="2.2" fill="#D6AD54" className="fusion-satellite sat-3" />
              </g>

              {/* 2. Floating Central Object & Gentle Central Illumination Pulses */}
              <g className="fusion-core-float">
                <circle cx="215" cy="230" r="34" fill="url(#fusionCoreGlow)" className="fusion-central-aura" />
                {/* Soft Specular Reflective Glint Passing Over Central Core */}
                <line x1="190" y1="210" x2="240" y2="250" stroke="url(#fusionGlint)" strokeWidth="2.2" className="fusion-core-glint-bar" />
              </g>

              {/* 3. Small Technical Symbols Illuminating Periodically */}
              <g className="fusion-tech-symbols">
                <text x="200" y="185" className="fusion-symbol-glyph glyph-a">&Delta;</text>
                <text x="240" y="195" className="fusion-symbol-glyph glyph-b">&int;</text>
                <text x="190" y="270" className="fusion-symbol-glyph glyph-c">&oplus;</text>
                <text x="240" y="280" className="fusion-symbol-glyph glyph-d">&#x26A1;</text>
                <text x="160" y="240" className="fusion-symbol-glyph glyph-e">&lambda;</text>
              </g>

              {/* 4. Subtle Floating Discipline Badges with Halo Accents */}
              <g className="fusion-badge-node badge-cpu">
                <circle cx="135" cy="165" r="14" fill="none" stroke="#D6AD54" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="135" cy="165" r="3.2" fill="#D6AD54" />
              </g>
              <g className="fusion-badge-node badge-atom">
                <circle cx="295" cy="155" r="14" fill="none" stroke="#FFF8E8" strokeWidth="0.9" strokeDasharray="3 3" />
                <circle cx="295" cy="155" r="3.2" fill="#FFF8E8" />
              </g>
              <g className="fusion-badge-node badge-leaf">
                <circle cx="280" cy="305" r="14" fill="none" stroke="#D6AD54" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="280" cy="305" r="3.2" fill="#D6AD54" />
              </g>
              <g className="fusion-badge-node badge-systems">
                <circle cx="150" cy="300" r="14" fill="none" stroke="#FFF8E8" strokeWidth="0.9" strokeDasharray="3 3" />
                <circle cx="150" cy="300" r="3.2" fill="#FFF8E8" />
              </g>
            </svg>
          )}
        </div>
      );

    default:
      return null;
  }
}
