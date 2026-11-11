import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const GUILD_PROJECTS = [
  {
    slug: 'open-source-desk',
    id: '01',
    name: 'Open Source Desk',
    subtitle: 'Curated Mentorship & Issue Curation Platform for Upstream Contributors',
    category: 'DEVELOPER TOOLING / OPEN SOURCE',
    status: 'ACTIVE TOOLING',
    summary:
      'An algorithmic discovery engine indexing beginner-welcoming issues across high-impact open-source repositories, bridging the gap between syntax and upstream PRs.',
    tech: ['Rust', 'TypeScript', 'GraphQL', 'PostgreSQL', 'Docker'],
    metrics: [
      { label: 'Indexed Issues', value: '1,400+' },
      { label: 'Active Students', value: '380+' },
      { label: 'Merged Upstream PRs', value: '124' },
      { label: 'Participating Repos', value: '45+' },
    ],
    repoUrl: 'https://github.com/fcit-hbtu/open-source-desk',
    demoUrl: 'https://desk.fcit-hbtu.org',
    image: '/images/open-source.svg',
  },
  {
    slug: 'gridsage-ai',
    id: '02',
    name: 'GridSage AI',
    subtitle: 'Adaptive Smart-Grid Electricity Demand Forecasting & Neural Load Balancing',
    category: 'MACHINE LEARNING / SYSTEMS',
    status: 'RESEARCH PROTOTYPE',
    summary:
      'A spatial-temporal neural network predicting microgrid electricity demand fluctuations to stabilize campus power distribution with sub-3% MAPE.',
    tech: ['Python', 'PyTorch', 'TimescaleDB', 'FastAPI', 'Docker', 'React'],
    metrics: [
      { label: 'MAPE Accuracy', value: '2.84%' },
      { label: 'Latency', value: '14ms' },
      { label: 'Telemetry Stream', value: '10K pts/sec' },
      { label: 'Energy Saved', value: '18.2%' },
    ],
    repoUrl: 'https://github.com/fcit-hbtu/gridsage-ai',
    demoUrl: 'https://gridsage.fcit-hbtu.org',
    image: '/images/project-gridsage.svg',
  },
  {
    slug: 'code-arena-hbtu',
    id: '03',
    name: 'CodeArena',
    subtitle: 'Sandboxed Algorithmic Evaluation & Distributed Automated Contest Engine',
    category: 'INFRASTRUCTURE / EDUCATION',
    status: 'CAMPUS DEPLOYMENT',
    summary:
      'A lightweight, secure code judging system running Linux cgroups sandboxes for university programming contests with isolated namespaces.',
    tech: ['Go', 'Docker / cgroups', 'Redis', 'PostgreSQL', 'React'],
    metrics: [
      { label: 'Eval Latency', value: '< 250ms' },
      { label: 'Concurrent Judges', value: '64 nodes' },
      { label: 'Test Suites Run', value: '45,000+' },
      { label: 'Zero Escapes', value: '100% Secure' },
    ],
    repoUrl: 'https://github.com/fcit-hbtu/code-arena',
    demoUrl: 'https://judge.fcit-hbtu.org',
    image: '/images/hackathon-night.svg',
  },
  {
    slug: 'campus-mesh-os',
    id: '04',
    name: 'CampusMesh OS',
    subtitle: 'Decentralized Peer-to-Peer LoRa & Wi-Fi Mesh Emergency Network',
    category: 'NETWORKING / IOT',
    status: 'PROTOTYPE BENCHMARK',
    summary:
      'A resilient ad-hoc communication protocol designed for campus emergency situations when cellular backhauls fail, supporting multi-hop packet routing.',
    tech: ['C++', 'FreeRTOS', 'Embedded C', 'LoRaWAN', 'Python'],
    metrics: [
      { label: 'Transmission Range', value: '3.4 km' },
      { label: 'Hop Latency', value: '180ms' },
      { label: 'Power Draw', value: '18mA' },
      { label: 'Network Uptime', value: '99.9%' },
    ],
    repoUrl: 'https://github.com/fcit-hbtu/campus-mesh-os',
    demoUrl: 'https://mesh.fcit-hbtu.org',
    image: '/images/campus-architecture.svg',
  },
];

export default function GuildBuildsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? GUILD_PROJECTS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === GUILD_PROJECTS.length - 1 ? 0 : prev + 1));
  };

  const project = GUILD_PROJECTS[currentSlide];

  return (
    <section id="builds" className="dev-section dev-builds-section">
      <div className="section-shell">
        {/* Section Header */}
        <div className="dev-section-header">
          <div className="dev-section-eyebrow">
            <span className="eyebrow-accent">//</span>
            <span>FEATURED PROJECTS</span>
          </div>
          <div className="dev-section-title-wrap builds-title-row">
            <div>
              <h2 className="dev-section-title">Guild Builds</h2>
              <p className="dev-section-intro">
                Production-grade software systems, infrastructure engines, and research
                utilities engineered from first principles by Dev's Guild contributors.
              </p>
            </div>

            {/* Slider Navigation Buttons */}
            <div className="builds-slider-controls" aria-label="Project carousel navigation">
              <span className="slider-counter">
                {String(currentSlide + 1).padStart(2, '0')} / {String(GUILD_PROJECTS.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={prevSlide}
                className="slider-arrow-btn"
                aria-label="Previous project"
              >
                ←
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="slider-arrow-btn"
                aria-label="Next project"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Big Editorial Project Display */}
        <div className="featured-build-display">
          <div className="build-display-media">
            <div className="build-media-frame">
              <img
                src={project.image}
                alt={project.name}
                className="build-media-img"
              />
              <div className="build-media-overlay" />
              <div className="build-status-pill">{project.status}</div>
            </div>
          </div>

          <div className="build-display-content">
            <div className="build-header-block">
              <span className="build-category-tag">{project.category}</span>
              <h3 className="build-title">{project.name}</h3>
              <p className="build-subtitle">{project.subtitle}</p>
            </div>

            <p className="build-summary-body">{project.summary}</p>

            {/* Metrics */}
            <div className="build-metrics-grid">
              {project.metrics.map((m, i) => (
                <div key={i} className="build-metric-item">
                  <span className="metric-num">{m.value}</span>
                  <span className="metric-caption">{m.label}</span>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="build-tech-row">
              <span className="tech-row-label">STACK:</span>
              <div className="tech-tags-wrap">
                {project.tech.map((t) => (
                  <span key={t} className="build-tech-badge">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="build-actions-strip">
              <Link to={`/projects/${project.slug}`} className="btn-dev-primary">
                <span>INSPECT ARCHITECTURE</span>
                <span aria-hidden="true">↗</span>
              </Link>
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-dev-secondary"
                >
                  <span>SOURCE REPO</span>
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Project Thumbnail Track */}
        <div className="builds-thumbnail-track" role="tablist">
          {GUILD_PROJECTS.map((p, idx) => (
            <button
              key={p.slug}
              type="button"
              className={`build-thumb-btn ${currentSlide === idx ? 'is-active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
              role="tab"
              aria-selected={currentSlide === idx}
            >
              <span className="thumb-num">{p.id}</span>
              <span className="thumb-title">{p.name}</span>
              <span className="thumb-status">{p.status}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
