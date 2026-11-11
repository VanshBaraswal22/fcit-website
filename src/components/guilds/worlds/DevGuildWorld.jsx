import React, { useState, useEffect, useRef } from 'react';

/**
 * DEV'S GUILD INTERACTIVE WORLD
 * Color System: Electric Blue (#0066FF / #00D2FF), Cyan (#00F0FF), Graphite (#12161A), Cool White (#F0F6FC)
 *
 * Creative Features:
 * - Interactive CI/CD Deployment Pipeline with live status pulses & stage switching
 * - Floating glass Code Editor with tab switcher (Microservices, Docker, Kubernetes)
 * - Animated SVG data-bus stream with moving bytecode packets
 * - Live terminal telemetry / commit logs
 * - Cursor-reactive 2D parallax and glow
 */

const CODE_SNIPPETS = {
  architecture: {
    filename: 'ClusterGateway.ts',
    language: 'TypeScript',
    lines: [
      { text: '// FCIT Distributed Gateway Service', type: 'comment' },
      { text: 'export class ClusterGateway implements ServiceMesh {', type: 'keyword' },
      { text: '  private router: EdgeRouter;', type: 'property' },
      { text: '  private telemetry: OpenTelemetryCollector;', type: 'property' },
      { text: '', type: 'blank' },
      { text: '  async routeTraffic(req: IngressRequest): Promise<Response> {', type: 'keyword' },
      { text: '    const route = await this.router.match(req.path);', type: 'normal' },
      { text: '    const healthyNode = route.getHealthyPod();', type: 'normal' },
      { text: '    this.telemetry.emitLatencyMetric(healthyNode.id);', type: 'highlight' },
      { text: '    return healthyNode.dispatch(req);', type: 'accent' },
      { text: '  }', type: 'normal' },
      { text: '}', type: 'keyword' },
    ],
  },
  pipeline: {
    filename: 'deploy-production.yaml',
    language: 'YAML',
    lines: [
      { text: '# Automated Zero-Downtime Deployment', type: 'comment' },
      { text: 'name: Production Rollout', type: 'keyword' },
      { text: 'on: [push: { branches: [main] }]', type: 'normal' },
      { text: 'jobs:', type: 'keyword' },
      { text: '  verify-sandbox:', type: 'property' },
      { text: '    runs-on: fcit-baremetal-runner-01', type: 'accent' },
      { text: '    steps:', type: 'normal' },
      { text: '      - run: pnpm run test:e2e --parallel', type: 'highlight' },
      { text: '      - run: docker buildx build --push -t fcit/mesh:latest .', type: 'accent' },
      { text: '  deploy-canary:', type: 'property' },
      { text: '    needs: verify-sandbox', type: 'normal' },
      { text: '    strategy: { canary: 15%, evaluate: 60s }', type: 'highlight' },
    ],
  },
  topology: {
    filename: 'consensus_node.go',
    language: 'Go',
    lines: [
      { text: '// Raft Consensus State Machine Node', type: 'comment' },
      { text: 'package consensus', type: 'keyword' },
      { text: '', type: 'blank' },
      { text: 'func (n *Node) AppendEntries(req *AppendReq) *AppendResp {', type: 'keyword' },
      { text: '    n.mu.Lock()', type: 'normal' },
      { text: '    defer n.mu.Unlock()', type: 'normal' },
      { text: '    if req.Term < n.currentTerm {', type: 'highlight' },
      { text: '        return &AppendResp{Success: false, Term: n.currentTerm}', type: 'accent' },
      { text: '    }', type: 'normal' },
      { text: '    n.replicateLogEntries(req.Entries)', type: 'accent' },
      { text: '    return &AppendResp{Success: true, Term: n.currentTerm}', type: 'normal' },
      { text: '}', type: 'keyword' },
    ],
  },
};

const PIPELINE_STAGES = [
  { id: 'lint', name: 'STATIC ANALYSIS', status: 'Passed', duration: '1.2s', icon: '◈' },
  { id: 'test', name: 'UNIT & CONCURRENCY', status: 'Passed (142/142)', duration: '3.8s', icon: '◆' },
  { id: 'build', name: 'CONTAINER SANDBOX', status: 'Passed', duration: '4.5s', icon: '▲' },
  { id: 'deploy', name: 'CANARY INGRESS (100%)', status: 'Active Live', duration: '0.4s', icon: '●' },
];

export default function DevGuildWorld({ isInView = true }) {
  const [activeTab, setActiveTab] = useState('architecture');
  const [activePipelineStage, setActivePipelineStage] = useState('deploy');
  const [pulseCount, setPulseCount] = useState(0);
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setPulseCount((c) => (c + 1) % 100);
    }, 2800);
    return () => clearInterval(interval);
  }, [isInView]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: nx * 16, y: ny * 16 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      className="dev-world-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Dev's Guild Interactive Engineering Environment"
    >
      {/* 1. Animated Atmospheric Background Grid & Data Streams */}
      <div className="dev-world-grid-bg" aria-hidden="true" />
      <div className="dev-world-glow-spot" aria-hidden="true" />

      {/* 2. Top Bar: Live CI/CD Deployment Pipeline Controller */}
      <div className="dev-pipeline-strip">
        <div className="dev-pipeline-header">
          <div className="dev-live-pill">
            <span className="live-dot" />
            <span>PIPELINE // PROD-US-EAST</span>
          </div>
          <span className="dev-pipeline-commit">SHA: 8f42d9c · MERGED BY FCIT BOT</span>
        </div>

        <div className="dev-pipeline-stages" role="tablist" aria-label="Build Pipeline Stages">
          {PIPELINE_STAGES.map((stage, idx) => {
            const isSelected = activePipelineStage === stage.id;
            return (
              <button
                key={stage.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`dev-pipeline-node ${isSelected ? 'is-active' : ''}`}
                onClick={() => setActivePipelineStage(stage.id)}
              >
                <div className="stage-indicator">
                  <span className="stage-icon">{stage.icon}</span>
                  <span className="stage-num">0{idx + 1}</span>
                </div>
                <div className="stage-info">
                  <span className="stage-name">{stage.name}</span>
                  <span className="stage-status">{stage.status} · {stage.duration}</span>
                </div>
                {idx < PIPELINE_STAGES.length - 1 && (
                  <span className="stage-connector" aria-hidden="true">
                    <span className="connector-pulse" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Main Stage: Split Floating Code Window & Interactive Architectural Node */}
      <div className="dev-world-stage">
        {/* Left: Interactive Glass Code Window */}
        <div
          className="dev-code-window"
          style={{
            transform: `translate3d(${mousePos.x * 0.75}px, ${mousePos.y * 0.75}px, 0)`,
          }}
        >
          {/* Editor Header / Tabs */}
          <div className="code-window-header">
            <div className="window-dots" aria-hidden="true">
              <span className="dot dot--red" />
              <span className="dot dot--yellow" />
              <span className="dot dot--cyan" />
            </div>

            <div className="code-window-tabs">
              {Object.keys(CODE_SNIPPETS).map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`code-tab ${activeTab === key ? 'is-active' : ''}`}
                  onClick={() => setActiveTab(key)}
                >
                  <span className="tab-glyph">⌥</span>
                  <span>{CODE_SNIPPETS[key].filename}</span>
                </button>
              ))}
            </div>

            <span className="code-lang-tag">{CODE_SNIPPETS[activeTab].language}</span>
          </div>

          {/* Editor Code Body */}
          <div className="code-window-body">
            <div className="code-line-numbers" aria-hidden="true">
              {CODE_SNIPPETS[activeTab].lines.map((_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>
            <pre className="code-content">
              <code>
                {CODE_SNIPPETS[activeTab].lines.map((line, idx) => (
                  <div key={idx} className={`code-line code-line--${line.type}`}>
                    {line.text}
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>

        {/* Right: Architectural Telemetry & Active Nodes */}
        <div
          className="dev-telemetry-panel"
          style={{
            transform: `translate3d(${-mousePos.x * 0.5}px, ${-mousePos.y * 0.5}px, 0)`,
          }}
        >
          <div className="telemetry-card telemetry-card--primary">
            <div className="card-topline">
              <span className="telemetry-badge">DISTRIBUTED FABRIC</span>
              <span className="telemetry-status-dot" />
            </div>
            <h4 className="card-title">Edge Node Latency</h4>
            <div className="telemetry-metric">
              <span className="metric-val">1.42</span>
              <span className="metric-unit">ms</span>
              <span className="metric-delta">p99.9</span>
            </div>
            {/* Live SVG Wave Sparkline */}
            <svg className="sparkline-svg" viewBox="0 0 200 48" preserveAspectRatio="none">
              <path
                d="M 0,38 Q 25,12 50,30 T 100,20 T 150,14 T 200,24"
                fill="none"
                stroke="#00F0FF"
                strokeWidth="2"
                className="sparkline-path"
              />
              <path
                d="M 0,38 Q 25,12 50,30 T 100,20 T 150,14 T 200,24 L 200,48 L 0,48 Z"
                fill="url(#devSparkGrad)"
                opacity="0.3"
              />
              <defs>
                <linearGradient id="devSparkGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0066FF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0066FF" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="telemetry-cluster">
            <div className="mini-cluster-chip">
              <span className="chip-label">CONTAINERS</span>
              <span className="chip-val">32 / 32 READY</span>
            </div>
            <div className="mini-cluster-chip">
              <span className="chip-label">INGRESS TLS</span>
              <span className="chip-val">HTTP/3 QUIC</span>
            </div>
            <div className="mini-cluster-chip">
              <span className="chip-label">UPSTREAM REPO</span>
              <span className="chip-val">GITHUB / FCIT</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Moving Circuit Bus */}
      <svg className="dev-circuit-svg" viewBox="0 0 800 60" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M 0,30 L 260,30 L 300,50 L 520,50 L 560,15 L 800,15"
          fill="none"
          stroke="#0066FF"
          strokeWidth="1.5"
          strokeDasharray="8 12"
          className="circuit-stream-line"
        />
        <circle cx="300" cy="50" r="3.5" fill="#00F0FF" className="circuit-bus-node" />
        <circle cx="560" cy="15" r="3.5" fill="#00F0FF" className="circuit-bus-node" />
      </svg>
    </div>
  );
}
