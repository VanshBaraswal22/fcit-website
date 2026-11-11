import React, { useState } from 'react';

const PIPELINE_STAGES = [
  {
    id: 'design',
    step: '01',
    name: 'DESIGN',
    icon: '/assets/dev-guild/icons/bulb.svg',
    tagline: 'First-Principles Problem Formulation',
    summary:
      'Before a single line of code is committed, student squads draft comprehensive RFCs (Request for Comments), define database entity boundaries, and identify concrete edge-case constraints.',
    deliverables: ['RFC Document', 'Data Flow Diagrams', 'API Contract Specifications', 'Latency Budgets'],
    tooling: 'Figma, Markdown RFCs, Excalidraw, OpenAPI 3.0',
    verification: 'Peer design review during bi-weekly engineering salons',
  },
  {
    id: 'architect',
    step: '02',
    name: 'ARCHITECT',
    icon: '/assets/dev-guild/icons/layers.svg',
    tagline: 'System Decoupling & Storage Topology',
    summary:
      'Selecting optimal storage paradigms, isolation boundaries, caching tiers, and asynchronous queues to guarantee idempotent execution under unexpected load spikes.',
    deliverables: ['PostgreSQL Schema with DDL', 'Redis Cache Keyspace Topology', 'Event Queue Boundaries', 'Auth Tokens & Roles'],
    tooling: 'PostgreSQL, Redis Streams, Docker Compose, Mermaid diagrams',
    verification: 'Schema migration sanity checks and EXPLAIN query profiling',
  },
  {
    id: 'build',
    step: '03',
    name: 'BUILD',
    icon: '/assets/dev-guild/icons/code.svg',
    tagline: 'Production Code & Peer Review Rigor',
    summary:
      'Writing strict TypeScript or Go code. Every pull request requires two approving reviews, 100% type safety, zero compile warnings, and automated unit test verification.',
    deliverables: ['Modular Services', 'Idiomatic Git History', 'Unit & Integration Suites', 'Linters & Formatters'],
    tooling: 'TypeScript, Go, React, Vite, Vitest, ESLint, Git',
    verification: 'Automated GitHub Actions CI gate with branch protection',
  },
  {
    id: 'deploy',
    step: '04',
    name: 'DEPLOY',
    icon: '/assets/dev-guild/icons/rocket.svg',
    tagline: 'Zero-Downtime Containerized Delivery',
    summary:
      'Deploying immutable OCI container images to departmental staging and production nodes behind reverse proxies with automated SSL certificate provisioning.',
    deliverables: ['Containerized OCI Artifacts', 'Reverse Proxy Routing', 'Healthcheck Probes', 'Rollback Topologies'],
    tooling: 'Docker, Linux systemd, Nginx, Let\'s Encrypt, Bash automation',
    verification: 'Blue/Green deployment rotation with zero packet loss',
  },
  {
    id: 'scale',
    step: '05',
    name: 'SCALE',
    icon: '/assets/dev-guild/icons/chart.svg',
    tagline: 'Observability, Profiling & Reliability',
    summary:
      'Monitoring live telemetry, memory heaps, database slow-query logs, and network saturation to proactively scale capacity as university demand expands.',
    deliverables: ['Structured JSON Logs', 'Prometheus Metrics Scraping', 'Grafana Dashboards', 'Post-Mortem Runbooks'],
    tooling: 'Prometheus, Grafana, pprof, cgroups v2, TimescaleDB',
    verification: 'Chaos fault injection and load testing up to 10K concurrent users',
  },
];

export default function EngineeringPipelineSection() {
  const [activeStageIndex, setActiveStageIndex] = useState(2); // Default to BUILD
  const activeStage = PIPELINE_STAGES[activeStageIndex];

  return (
    <section id="pipeline" className="dev-section dev-pipeline-section">
      <div className="section-shell">
        {/* Section Header */}
        <div className="dev-section-header">
          <div className="dev-section-eyebrow">
            <span className="eyebrow-accent">//</span>
            <span>THE PROCESS</span>
          </div>
          <div className="dev-section-title-wrap">
            <h2 className="dev-section-title">From Idea to Impact</h2>
            <p className="dev-section-intro">
              A disciplined, reproducible software engineering workflow bridging the
              gap between theoretical computer science and resilient, live production
              systems.
            </p>
          </div>
        </div>

        {/* 5-Step Pipeline Strip */}
        <div className="pipeline-workflow-wrapper" role="tablist" aria-label="Engineering Stages">
          {/* Connecting Line Track */}
          <div className="pipeline-connecting-track" aria-hidden="true">
            <div
              className="pipeline-progress-bar"
              style={{
                width: `${(activeStageIndex / (PIPELINE_STAGES.length - 1)) * 100}%`,
              }}
            />
          </div>

          <div className="pipeline-nodes-container">
            {PIPELINE_STAGES.map((stage, idx) => {
              const isSelected = activeStageIndex === idx;
              const isPassed = activeStageIndex >= idx;

              return (
                <div
                  key={stage.id}
                  className={`pipeline-node-item ${isSelected ? 'is-selected' : ''} ${
                    isPassed ? 'is-passed' : ''
                  }`}
                  onClick={() => setActiveStageIndex(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveStageIndex(idx);
                    }
                  }}
                  tabIndex={0}
                  role="tab"
                  aria-selected={isSelected}
                >
                  <div className="pipeline-node-circle">
                    <img
                      src={stage.icon}
                      alt=""
                      aria-hidden="true"
                      className="pipeline-node-icon"
                    />
                    <span className="node-step-tag">{stage.step}</span>
                  </div>
                  <span className="pipeline-node-title">{stage.name}</span>
                  <span className="pipeline-node-indicator" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Stage Deep Dive Card */}
        <div className="pipeline-stage-detail-card">
          <div className="stage-detail-header">
            <div className="stage-meta">
              <span className="stage-badge">PHASE {activeStage.step} // 05</span>
              <h3 className="stage-title">{activeStage.name}</h3>
              <p className="stage-tagline">{activeStage.tagline}</p>
            </div>
            <div className="stage-icon-large">
              <img src={activeStage.icon} alt="" aria-hidden="true" />
            </div>
          </div>

          <p className="stage-summary-text">{activeStage.summary}</p>

          <div className="stage-specs-grid">
            <div className="stage-spec-block">
              <span className="spec-label">CORE DELIVERABLES</span>
              <ul className="spec-list">
                {activeStage.deliverables.map((item, i) => (
                  <li key={i}>
                    <span className="spec-bullet">■</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="stage-spec-block">
              <span className="spec-label">TECHNOLOGY &amp; TOOLING</span>
              <p className="spec-desc">{activeStage.tooling}</p>

              <span className="spec-label mt-4">QUALITY &amp; VERIFICATION GATE</span>
              <p className="spec-desc">{activeStage.verification}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
