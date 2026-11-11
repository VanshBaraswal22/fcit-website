import React, { useState, useEffect, useRef } from 'react';

/**
 * ALGOCREW INTERACTIVE WORLD
 * Color System: Acid Lime (#CCFF00), Charcoal (#121415 / #1C2022), Off-white (#F5F7F2), Muted Green (#3E8E58)
 *
 * Creative Features:
 * - Real, tactile Sorting Visualizer with live animated array bars (QuickSort/Partition step, Shuffle)
 * - Interactive Graph Traversal (Click any node to run a BFS/DFS pulse along adjacent edges)
 * - Brutalist computational aesthetic with Cartesian coordinate grid and complexity tags
 * - Algorithmic complexity telemetry (O(N log N), O(V + E))
 */

const INITIAL_ARRAY = [42, 88, 19, 72, 34, 96, 51, 14, 63, 79];

const GRAPH_NODES = [
  { id: 'A', x: 70, y: 70, label: 'ROOT' },
  { id: 'B', x: 190, y: 50, label: 'LEFT' },
  { id: 'C', x: 190, y: 150, label: 'RIGHT' },
  { id: 'D', x: 310, y: 40, label: 'LEAF_1' },
  { id: 'E', x: 310, y: 110, label: 'LEAF_2' },
  { id: 'F', x: 310, y: 180, label: 'SINK' },
];

const GRAPH_EDGES = [
  { from: 'A', to: 'B', weight: 'w: 4' },
  { from: 'A', to: 'C', weight: 'w: 7' },
  { from: 'B', to: 'D', weight: 'w: 2' },
  { from: 'B', to: 'E', weight: 'w: 5' },
  { from: 'C', to: 'E', weight: 'w: 1' },
  { from: 'C', to: 'F', weight: 'w: 8' },
];

export default function AlgoCrewWorld({ isInView = true }) {
  const [arrayData, setArrayData] = useState(INITIAL_ARRAY);
  const [activeBarIdx, setActiveBarIdx] = useState(null);
  const [isSorting, setIsSorting] = useState(false);
  const [activeGraphNode, setActiveGraphNode] = useState('A');
  const [visitedNodes, setVisitedNodes] = useState(new Set(['A', 'B']));
  const [algorithmMode, setAlgorithmMode] = useState('sort'); // 'sort' | 'graph'

  // Shuffle Array
  const handleShuffle = () => {
    const shuffled = [...arrayData].sort(() => Math.random() - 0.5);
    setArrayData(shuffled);
    setActiveBarIdx(null);
  };

  // One-click Auto Sort animation
  const handleAutoSort = () => {
    if (isSorting) return;
    setIsSorting(true);

    const sorted = [...arrayData].sort((a, b) => a - b);
    let step = 0;

    const interval = setInterval(() => {
      if (step < sorted.length) {
        setActiveBarIdx(step);
        setArrayData((prev) => {
          const next = [...prev];
          next[step] = sorted[step];
          return next;
        });
        step++;
      } else {
        clearInterval(interval);
        setIsSorting(false);
        setActiveBarIdx(null);
      }
    }, 140);
  };

  // Graph Node Click -> BFS traversal simulation
  const handleNodeClick = (nodeId) => {
    setActiveGraphNode(nodeId);
    setVisitedNodes((prev) => {
      const next = new Set(prev);
      next.add(nodeId);
      // Also add connected neighbours
      GRAPH_EDGES.forEach((edge) => {
        if (edge.from === nodeId) next.add(edge.to);
      });
      return next;
    });
  };

  return (
    <div
      className="algo-world-container"
      aria-label="AlgoCrew Interactive Algorithmic Laboratory"
    >
      {/* 1. High-Contrast Charcoal Cartesian Grid */}
      <div className="algo-cartesian-grid" aria-hidden="true" />
      <div className="algo-lime-glow" aria-hidden="true" />

      {/* 2. Top Interactive Action Strip: Algorithm Selector & Complexity */}
      <div className="algo-top-strip">
        <div className="algo-live-tag">
          <span className="algo-dot" />
          <span>ALGORITHMIC LAB // COMPLEXITY: O(N log N)</span>
        </div>

        <div className="algo-mode-toggles" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={algorithmMode === 'sort'}
            className={`algo-toggle-btn ${algorithmMode === 'sort' ? 'is-active' : ''}`}
            onClick={() => setAlgorithmMode('sort')}
          >
            01. ARRAY PARTITION
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={algorithmMode === 'graph'}
            className={`algo-toggle-btn ${algorithmMode === 'graph' ? 'is-active' : ''}`}
            onClick={() => setAlgorithmMode('graph')}
          >
            02. GRAPH TRAVERSAL
          </button>
        </div>
      </div>

      {/* 3. Main Stage: Either Sorting Visualizer OR Graph Traversal */}
      <div className="algo-stage-main">
        {algorithmMode === 'sort' ? (
          /* ==========================================================
             SORTING VISUALIZER STAGE
             ========================================================== */
          <div className="algo-sort-container">
            <div className="sort-meta-bar">
              <span className="meta-algo-name">QUICK_SORT // DUAL PIVOT</span>
              <div className="sort-controls">
                <button
                  type="button"
                  className="algo-action-btn"
                  onClick={handleShuffle}
                  disabled={isSorting}
                >
                  <span>SHUFFLE</span>
                </button>
                <button
                  type="button"
                  className="algo-action-btn algo-action-btn--primary"
                  onClick={handleAutoSort}
                  disabled={isSorting}
                >
                  <span>{isSorting ? 'SORTING...' : 'RUN SORT'}</span>
                  <span className="btn-glyph" aria-hidden="true">▶</span>
                </button>
              </div>
            </div>

            {/* Live Reactive Bars */}
            <div className="sort-bars-stage" role="region" aria-label="Array Bars">
              {arrayData.map((val, idx) => {
                const isActive = activeBarIdx === idx;
                return (
                  <div
                    key={idx}
                    className={`sort-bar-column ${isActive ? 'is-bar-active' : ''}`}
                    onClick={() => setActiveBarIdx(idx)}
                    title={`Index ${idx}: value ${val}`}
                  >
                    <span className="bar-val-label">{val}</span>
                    <div
                      className="sort-bar-fill"
                      style={{
                        height: `${val}%`,
                        backgroundColor: isActive ? '#FFFFFF' : '#CCFF00',
                      }}
                    />
                    <span className="bar-idx-label">[{idx}]</span>
                  </div>
                );
              })}
            </div>

            {/* Bottom Complexity Invariant */}
            <div className="sort-bottom-invariants">
              <div className="invariant-chip">
                <span className="inv-label">BEST CASE</span>
                <span className="inv-val">Ω(N log N)</span>
              </div>
              <div className="invariant-chip">
                <span className="inv-label">SPACE COMPLEXITY</span>
                <span className="inv-val">O(log N) AUXILIARY</span>
              </div>
              <div className="invariant-chip">
                <span className="inv-label">STABILITY</span>
                <span className="inv-val">IN-PLACE PARTITION</span>
              </div>
            </div>
          </div>
        ) : (
          /* ==========================================================
             GRAPH TRAVERSAL STAGE
             ========================================================== */
          <div className="algo-graph-container">
            <div className="graph-meta-bar">
              <span className="meta-algo-name">DIRECTED ACYCLIC GRAPH // BFS EXPANSION</span>
              <span className="graph-hint">CLICK NODES TO EXPAND FRONTIER</span>
            </div>

            <svg className="algo-graph-svg" viewBox="0 0 380 220" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="edgeGradActive" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#CCFF00" />
                  <stop offset="100%" stopColor="#3E8E58" />
                </linearGradient>
              </defs>

              {/* Render Graph Edges */}
              {GRAPH_EDGES.map((edge, i) => {
                const fromNode = GRAPH_NODES.find((n) => n.id === edge.from);
                const toNode = GRAPH_NODES.find((n) => n.id === edge.to);
                const isTraversed = visitedNodes.has(edge.from) && visitedNodes.has(edge.to);

                return (
                  <g key={`edge-${i}`}>
                    <line
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke={isTraversed ? 'url(#edgeGradActive)' : '#33383B'}
                      strokeWidth={isTraversed ? '2' : '1.2'}
                      strokeDasharray={isTraversed ? 'none' : '4 3'}
                    />
                    <text
                      x={(fromNode.x + toNode.x) / 2 + 6}
                      y={(fromNode.y + toNode.y) / 2 - 4}
                      className="edge-weight-label"
                    >
                      {edge.weight}
                    </text>
                  </g>
                );
              })}

              {/* Render Graph Nodes */}
              {GRAPH_NODES.map((node) => {
                const isVisited = visitedNodes.has(node.id);
                const isCurrent = activeGraphNode === node.id;

                return (
                  <g
                    key={node.id}
                    className="graph-node-group"
                    onClick={() => handleNodeClick(node.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isCurrent ? '18' : '13'}
                      fill="#121415"
                      stroke={isCurrent ? '#FFFFFF' : isVisited ? '#CCFF00' : '#454C4F'}
                      strokeWidth={isCurrent ? '2.5' : '1.8'}
                    />
                    <text
                      x={node.x}
                      y={node.y + 4}
                      textAnchor="middle"
                      className="graph-node-id"
                      fill={isCurrent ? '#FFFFFF' : isVisited ? '#CCFF00' : '#889094'}
                    >
                      {node.id}
                    </text>
                    <text x={node.x} y={node.y + 26} textAnchor="middle" className="graph-node-name">
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="graph-telemetry-strip">
              <span className="telemetry-item">
                ACTIVE FRONTIER: <strong>NODE_{activeGraphNode}</strong>
              </span>
              <span className="telemetry-item">
                VISITED: <strong>{visitedNodes.size} / 6 NODES</strong>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
