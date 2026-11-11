import React, { useState } from 'react';

const DOMAINS_DATA = [
  {
    num: '01',
    id: 'full-stack',
    name: 'FULL-STACK SYSTEMS',
    badge: 'ENGINEERING',
    icon: '/assets/dev-guild/icons/code.svg',
    summary:
      'Architecting end-to-end reactive applications with clean separation of presentation, state, and persistence layers.',
    topics: [
      'Component Hierarchies & Reconciliation',
      'Client-Side State Management',
      'Server-Side Rendering & Hydration',
      'Micro-Frontends & Design Tokens',
    ],
    relevance:
      'Powers all university web portals, student tools, and community registries.',
    metrics: '98+ Lighthouse / <900ms TTI',
    stack: ['React', 'TypeScript', 'Node.js', 'Vite', 'PostgreSQL'],
  },
  {
    num: '02',
    id: 'backend',
    name: 'BACKEND ENGINEERING',
    badge: 'DISTRIBUTED',
    icon: '/assets/dev-guild/icons/server.svg',
    summary:
      'Designing high-concurrency microservices, idempotent RESTful and GraphQL APIs, and reliable message pipelines.',
    topics: [
      'API Gateway Routing & Throttling',
      'ACID Relational Persistence',
      'Schema Migrations & Backpressure',
      'Distributed Caching & Invalidation',
    ],
    relevance:
      'Ensures zero-downtime operations during campus-wide registration spikes.',
    metrics: '10K+ req/sec / 99.9% Uptime',
    stack: ['Go', 'Express', 'PostgreSQL', 'Redis', 'Kafka'],
  },
  {
    num: '03',
    id: 'devops',
    name: 'CLOUD & DEVOPS',
    badge: 'INFRASTRUCTURE',
    icon: '/assets/dev-guild/icons/cloud.svg',
    summary:
      'Containerized deployment topologies, automated CI/CD pipelines, and robust production Linux server hardening.',
    topics: [
      'Docker Sandboxing & OCI Standards',
      'Zero-Downtime Deployment Blue/Green',
      'Linux Kernel cgroups Isolation',
      'Observability & Distributed Tracing',
    ],
    relevance:
      'Manages internal build runners, staging environments, and production VPS nodes.',
    metrics: 'Automated CI/CD / Zero Config Drift',
    stack: ['Docker', 'Linux', 'GitHub Actions', 'Nginx', 'Prometheus'],
  },
  {
    num: '04',
    id: 'open-source',
    name: 'OPEN SOURCE ENGINEERING',
    badge: 'COMMUNITY',
    icon: '/assets/dev-guild/icons/cube.svg',
    summary:
      'Cultivating upstream contribution etiquette, code review rigor, package publishing, and mentorship for GSoC/LFX.',
    topics: [
      'Upstream Pull Requests & Git Graph',
      'Semantic Versioning & Changelogs',
      'Code Review Rigor & Linters',
      'Maintainer Etiquette & Issue Discovery',
    ],
    relevance:
      'Helps students land their first merged PRs in global software foundations.',
    metrics: '124+ Merged PRs in CNCF & Apache',
    stack: ['Git', 'Rust', 'GitHub CLI', 'GraphQL', 'Markdown'],
  },
];

export default function TechnicalDomainsSection() {
  const [activeDomainIndex, setActiveDomainIndex] = useState(0);
  const activeDomain = DOMAINS_DATA[activeDomainIndex];

  return (
    <section id="disciplines" className="dev-section dev-disciplines-section">
      <div className="section-shell">
        {/* Section Header */}
        <div className="dev-section-header">
          <div className="dev-section-eyebrow">
            <span className="eyebrow-accent">//</span>
            <span>THE DISCIPLINES</span>
          </div>
          <div className="dev-section-title-wrap">
            <h2 className="dev-section-title">
              Technical Domains &amp; Specialisations
            </h2>
            <p className="dev-section-intro">
              Structured engineering tracks within Dev's Guild, spanning from
              first-principles product development to distributed infrastructure
              and global open source ecosystems.
            </p>
          </div>
        </div>

        {/* 4 Interactive Domain Cards Grid */}
        <div className="dev-domains-grid">
          {DOMAINS_DATA.map((domain, index) => {
            const isSelected = activeDomainIndex === index;
            return (
              <div
                key={domain.id}
                className={`dev-domain-card ${isSelected ? 'is-selected' : ''}`}
                onClick={() => setActiveDomainIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveDomainIndex(index);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-pressed={isSelected}
              >
                <div className="domain-card-top">
                  <span className="domain-card-num">{domain.num}</span>
                  <span className="domain-badge">{domain.badge}</span>
                </div>

                <div className="domain-card-icon-wrap">
                  <img
                    src={domain.icon}
                    alt=""
                    aria-hidden="true"
                    className="domain-icon-svg"
                  />
                </div>

                <h3 className="domain-card-name">{domain.name}</h3>
                <p className="domain-card-summary">{domain.summary}</p>

                <div className="domain-card-footer">
                  <span className="domain-metrics-pill">{domain.metrics}</span>
                  <span className="domain-expand-indicator" aria-hidden="true">
                    {isSelected ? '● ACTIVE' : '↗ INSPECT'}
                  </span>
                </div>

                {/* Crimson active bar */}
                <div className="domain-active-border" />
              </div>
            );
          })}
        </div>

        {/* Selected Domain Deep Dive Panel */}
        <div className="dev-domain-expanded-panel">
          <div className="expanded-panel-header">
            <div className="expanded-panel-title">
              <span className="panel-num">{activeDomain.num} //</span>
              <h4>{activeDomain.name} DEEP DIVE</h4>
            </div>
            <div className="expanded-panel-tags">
              {activeDomain.stack.map((item) => (
                <span key={item} className="tech-stack-tag">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="expanded-panel-body">
            <div className="panel-col">
              <span className="panel-subheading">CORE SYLLABUS &amp; PRACTICAL TOPICS</span>
              <ul className="domain-topics-list">
                {activeDomain.topics.map((topic, i) => (
                  <li key={i}>
                    <span className="topic-bullet">›</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel-col">
              <span className="panel-subheading">INSTITUTIONAL RELEVANCE</span>
              <p className="panel-relevance-text">{activeDomain.relevance}</p>
              <div className="panel-metric-highlight">
                <span className="metric-label">PERFORMANCE BENCHMARK</span>
                <span className="metric-val">{activeDomain.metrics}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
