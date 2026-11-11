import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * INTELLIGENCE GUILD INTERACTIVE WORLD
 * Color System: Deep Violet (#2D0B5A / #3B1373), Lavender (#B892FF), Soft Pink (#FF70A6), Midnight Purple (#0D0618)
 *
 * Creative Features:
 * - Interactive 2D Synaptic Neural Network with multi-layer topology (Input, Attention, Latent, Prediction)
 * - Clickable neurons that fire synaptic pulse waves across axon connections
 * - Cursor-responsive magnetics & real-time connection glow
 * - Dynamic Attention Heatmap Tensor card with interactive cell weights
 * - Ambient cognitive dust & synaptic filaments
 */

const NEURAL_LAYERS = [
  { name: 'INPUT TOKENS', count: 4, ids: ['x0', 'x1', 'x2', 'x3'], labels: ['x₁ EMBED', 'x₂ POS', 'x₃ MASK', 'x₄ ATTN'] },
  { name: 'LATENT TRANSFORMER', count: 5, ids: ['h0', 'h1', 'h2', 'h3', 'h4'], labels: ['Q · Kᵀ', 'SOFTMAX', 'HEAD_01', 'HEAD_02', 'FFN_GELU'] },
  { name: 'COGNITIVE PREDICTION', count: 3, ids: ['y0', 'y1', 'y2'], labels: ['TENSOR_α', 'LOGITS', 'INFERENCE'] },
];

const ATTENTION_MATRIX = [
  [0.94, 0.12, 0.04, 0.45],
  [0.08, 0.88, 0.31, 0.18],
  [0.15, 0.22, 0.96, 0.09],
  [0.34, 0.18, 0.11, 0.91],
];

export default function IntelligenceGuildWorld({ isInView = true }) {
  const [activeNeuron, setActiveNeuron] = useState('h2');
  const [synapticPulse, setSynapticPulse] = useState(0);
  const [hoveredCell, setHoveredCell] = useState({ r: 1, c: 1, val: 0.88 });
  const [pulseOrigin, setPulseOrigin] = useState({ x: 260, y: 140 });
  const containerRef = useRef(null);

  // Trigger pulse wave on click
  const handleNeuronClick = (id, e) => {
    setActiveNeuron(id);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPulseOrigin({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    setSynapticPulse((p) => p + 1);
  };

  // Subtle automated ambient firing every 3.5s
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setSynapticPulse((p) => p + 1);
    }, 3600);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className="intelligence-world-container"
      aria-label="Intelligence Guild Interactive Neural Network Environment"
    >
      {/* 1. Deep Midnight Cosmic Radial Atmosphere */}
      <div className="intelligence-glow-radial" aria-hidden="true" />
      <div className="intelligence-synaptic-mesh" aria-hidden="true" />

      {/* 2. Top Interactive Action Strip: Synaptic Firing Status */}
      <div className="intelligence-top-strip">
        <div className="intelligence-live-tag">
          <span className="synapse-dot" />
          <span>NEURAL TOPOLOGY // MULTI-HEAD ATTENTION</span>
        </div>
        <div className="synapse-action-hint">
          <span>CLICK ANY NEURON TO TRANSMIT SYNAPTIC IMPULSE</span>
        </div>
      </div>

      {/* 3. Main Stage: Interactive Neural Graph & Attention Tensor */}
      <div className="intelligence-stage-split">
        {/* Left / Center: Interactive SVG Neural Network Graph */}
        <div className="intelligence-neural-canvas-wrap">
          <svg
            className="intelligence-neural-svg"
            viewBox="0 0 540 320"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="synapticGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B892FF" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#FF70A6" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#B892FF" stopOpacity="0.45" />
              </linearGradient>

              <radialGradient id="neuronGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF70A6" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#B892FF" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#2D0B5A" stopOpacity="0" />
              </radialGradient>

              <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Connecting Axon Filaments (Layer 0 to Layer 1) */}
            {[
              [60, 50], [60, 120], [60, 190], [60, 260],
            ].map(([x1, y1], i) =>
              [
                [270, 40], [270, 95], [270, 150], [270, 205], [270, 260],
              ].map(([x2, y2], j) => {
                const isConnectedToActive = activeNeuron === `h${j}` || activeNeuron === `x${i}`;
                return (
                  <path
                    key={`l01-${i}-${j}`}
                    d={`M ${x1} ${y1} C ${x1 + 100} ${y1}, ${x2 - 100} ${y2}, ${x2} ${y2}`}
                    fill="none"
                    stroke={isConnectedToActive ? '#FF70A6' : 'rgba(184, 146, 255, 0.22)'}
                    strokeWidth={isConnectedToActive ? 1.8 : 0.8}
                    strokeDasharray={isConnectedToActive ? '6 4' : 'none'}
                    className={isConnectedToActive ? 'synapse-line-active' : 'synapse-line-idle'}
                  />
                );
              })
            )}

            {/* Connecting Axon Filaments (Layer 1 to Layer 2) */}
            {[
              [270, 40], [270, 95], [270, 150], [270, 205], [270, 260],
            ].map(([x1, y1], i) =>
              [
                [480, 80], [480, 160], [480, 240],
              ].map(([x2, y2], j) => {
                const isConnectedToActive = activeNeuron === `h${i}` || activeNeuron === `y${j}`;
                return (
                  <path
                    key={`l12-${i}-${j}`}
                    d={`M ${x1} ${y1} C ${x1 + 90} ${y1}, ${x2 - 90} ${y2}, ${x2} ${y2}`}
                    fill="none"
                    stroke={isConnectedToActive ? '#FF70A6' : 'rgba(184, 146, 255, 0.2)'}
                    strokeWidth={isConnectedToActive ? 1.8 : 0.8}
                    className={isConnectedToActive ? 'synapse-line-active' : 'synapse-line-idle'}
                  />
                );
              })
            )}

            {/* Layer 0: Input Neurons */}
            {[
              { id: 'x0', x: 60, y: 50, label: 'x₁ EMB' },
              { id: 'x1', x: 60, y: 120, label: 'x₂ POS' },
              { id: 'x2', x: 60, y: 190, label: 'x₃ MSK' },
              { id: 'x3', x: 60, y: 260, label: 'x₄ ATT' },
            ].map((n) => (
              <g
                key={n.id}
                className="neuron-group"
                onClick={(e) => handleNeuronClick(n.id, e)}
                style={{ cursor: 'pointer' }}
              >
                <circle cx={n.x} cy={n.y} r="14" fill="url(#neuronGlow)" opacity="0.4" />
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="7"
                  fill={activeNeuron === n.id ? '#FF70A6' : '#B892FF'}
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  className="neuron-core"
                />
                <text x={n.x - 48} y={n.y + 4} className="neuron-label">
                  {n.label}
                </text>
              </g>
            ))}

            {/* Layer 1: Latent Attention Neurons */}
            {[
              { id: 'h0', x: 270, y: 40, label: 'Q·Kᵀ' },
              { id: 'h1', x: 270, y: 95, label: 'SOFTMAX' },
              { id: 'h2', x: 270, y: 150, label: 'HEAD_1' },
              { id: 'h3', x: 270, y: 205, label: 'HEAD_2' },
              { id: 'h4', x: 270, y: 260, label: 'FFN' },
            ].map((n) => {
              const isSelected = activeNeuron === n.id;
              return (
                <g
                  key={n.id}
                  className="neuron-group"
                  onClick={(e) => handleNeuronClick(n.id, e)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={isSelected ? '22' : '16'}
                    fill="url(#neuronGlow)"
                    className={isSelected ? 'neuron-halo-pulse' : ''}
                  />
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={isSelected ? '10' : '7.5'}
                    fill={isSelected ? '#FF70A6' : '#D4B8FF'}
                    stroke="#FFF"
                    strokeWidth="2"
                    filter="url(#softGlow)"
                  />
                  <text x={n.x + 14} y={n.y + 4} className="neuron-label neuron-label--latent">
                    {n.label}
                  </text>
                </g>
              );
            })}

            {/* Layer 2: Output Neurons */}
            {[
              { id: 'y0', x: 480, y: 80, label: 'TENSOR_α' },
              { id: 'y1', x: 480, y: 160, label: 'LOGITS' },
              { id: 'y2', x: 480, y: 240, label: 'INFER' },
            ].map((n) => (
              <g
                key={n.id}
                className="neuron-group"
                onClick={(e) => handleNeuronClick(n.id, e)}
                style={{ cursor: 'pointer' }}
              >
                <circle cx={n.x} cy={n.y} r="15" fill="url(#neuronGlow)" opacity="0.45" />
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="8"
                  fill={activeNeuron === n.id ? '#FF70A6' : '#B892FF'}
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
                <text x={n.x + 15} y={n.y + 4} className="neuron-label">
                  {n.label}
                </text>
              </g>
            ))}

            {/* Dynamic Traveling Synaptic Pulse Wave */}
            {synapticPulse > 0 && (
              <circle
                key={synapticPulse}
                cx="270"
                cy="150"
                r="6"
                fill="none"
                stroke="#FF70A6"
                strokeWidth="2.5"
                className="synaptic-shockwave"
              />
            )}
          </svg>
        </div>

        {/* Right: Interactive Attention Matrix & Cognitive Metrics */}
        <div className="intelligence-tensor-panel">
          {/* Attention Heatmap Card */}
          <div className="tensor-card">
            <div className="tensor-card-top">
              <span className="tensor-badge">SELF-ATTENTION MAP</span>
              <span className="tensor-head-tag">HEAD 04 / 12</span>
            </div>

            <div className="attention-grid" role="grid" aria-label="Attention Weight Matrix">
              {ATTENTION_MATRIX.map((row, rIdx) => (
                <div key={rIdx} className="attention-row" role="row">
                  {row.map((val, cIdx) => {
                    const isHovered = hoveredCell.r === rIdx && hoveredCell.c === cIdx;
                    return (
                      <div
                        key={cIdx}
                        role="gridcell"
                        tabIndex={0}
                        className={`attention-cell ${isHovered ? 'is-cell-hovered' : ''}`}
                        style={{
                          backgroundColor: `rgba(255, 112, 166, ${val})`,
                          borderColor: isHovered ? '#FFFFFF' : 'rgba(184, 146, 255, 0.3)',
                        }}
                        onMouseEnter={() => setHoveredCell({ r: rIdx, c: cIdx, val })}
                        title={`Query token ${rIdx + 1} -> Key token ${cIdx + 1}: ${val}`}
                      >
                        <span className="cell-val">{(val).toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Live Inspection Readout */}
            <div className="tensor-readout">
              <span className="readout-label">INSPECTED WEIGHT:</span>
              <span className="readout-val">
                W[Q_{hoveredCell.r + 1}, K_{hoveredCell.c + 1}] = {hoveredCell.val}
              </span>
            </div>
          </div>

          {/* Model Specification Card */}
          <div className="intelligence-spec-cluster">
            <div className="spec-pill">
              <span className="spec-title">LATENT DIMENSION</span>
              <span className="spec-num">d_model = 768</span>
            </div>
            <div className="spec-pill">
              <span className="spec-title">EVAL LOSS</span>
              <span className="spec-num">0.0412 (converged)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
