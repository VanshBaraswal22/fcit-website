import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import SectionLabel from '../SectionLabel';
import { projects } from '../../data/projectsData';

export default function HomeFeaturedProjects() {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const featured = projects.filter((p) => p.featured);
  const [activeIdx, setActiveIdx] = useState(0);

  // Swipe support
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const current = featured[activeIdx] || featured[0];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + featured.length) % featured.length);
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % featured.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only handle if section is partially in view
      const rect = rootRef.current?.getBoundingClientRect();
      if (!rect) return;
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [featured.length]);

  // Smooth slide change animation
  useLayoutEffect(() => {
    if (!stageRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.fromTo(
      stageRef.current.querySelector('.home-project-assembled-stage'),
      { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0.6 },
      { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.55, ease: 'power3.out' }
    );

    gsap.fromTo(
      stageRef.current.querySelector('.home-project-content'),
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }
    );
  }, [activeIdx]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 45) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  };

  return (
    <section className="home-projects-section" id="projects" ref={rootRef}>
      <div className="home-section-shell">
        <div className="home-section-header">
          <div className="home-section-title-wrap">
            <SectionLabel>SELECTED WORK</SectionLabel>
            <h2 className="home-editorial-heading">
              IDEAS <em>TAKE FORM.</em>
            </h2>
            <p className="home-section-desc">
              Explore the ideas, experiments and engineering projects developed by members of the FCIT community.
            </p>
          </div>

          <div>
            <Link to="/projects" className="home-cta-primary">
              <span>Explore All Projects</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        {/* Interactive Slider Toolbar: Tabs + Counter + Arrows */}
        <div className="home-project-slider-toolbar" aria-label="Selected Work Navigation">
          <div className="home-project-tabs-list" role="tablist">
            {featured.map((p, idx) => (
              <button
                key={p.slug}
                role="tab"
                aria-selected={activeIdx === idx}
                className={`home-project-tab-btn ${activeIdx === idx ? 'is-active' : ''}`}
                onClick={() => setActiveIdx(idx)}
              >
                <span className="home-project-tab-num">0{idx + 1}</span>
                <span className="home-project-tab-title">{p.title}</span>
              </button>
            ))}
          </div>

          <div className="home-project-slider-controls">
            <div className="home-project-slider-counter">
              <strong>{String(activeIdx + 1).padStart(2, '0')}</strong>
              <span className="home-counter-sep">/</span>
              <span>{String(featured.length).padStart(2, '0')}</span>
            </div>

            <div className="home-project-nav-buttons">
              <button
                type="button"
                className="home-slider-arrow-btn"
                onClick={handlePrev}
                aria-label="Previous Project"
              >
                ←
              </button>
              <button
                type="button"
                className="home-slider-arrow-btn"
                onClick={handleNext}
                aria-label="Next Project"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Slider Progress Bar */}
        <div className="home-project-progress-track" aria-hidden="true">
          <div
            className="home-project-progress-fill"
            style={{ width: `${((activeIdx + 1) / featured.length) * 100}%` }}
          />
        </div>

        {/* Single Active Project Slide */}
        <div
          className="home-featured-slider-stage"
          ref={stageRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <article className="home-featured-project-card">
            {/* Visual Composition */}
            <div className="home-project-visual">
              <div className="home-project-assembled-stage">
                {/* Plate 1: Main System Viewport */}
                <div className="home-project-plate home-project-plate--main">
                  <img
                    src={current.image}
                    alt={current.alt || current.title}
                    className="home-project-image"
                    loading="lazy"
                    width="640"
                    height="380"
                  />
                  <div className="home-project-overlay-badge">
                    <span>{current.category}</span>
                  </div>
                </div>

                {/* Plate 2: Architectural Schematic Overlay */}
                <div className="home-project-plate home-project-plate--schema" aria-hidden="true">
                  <div className="home-schema-header">
                    <span className="home-schema-dot" />
                    <span className="home-schema-title">SYSTEM ARCHITECTURE · {current.id}</span>
                  </div>
                  <div className="home-schema-body">
                    {current.architecture && current.architecture.length > 0 ? (
                      current.architecture.slice(0, 2).map((arch, aIdx) => (
                        <div key={aIdx} className="home-schema-node">
                          <span className="home-schema-node-tag">LAYER 0{aIdx + 1}</span>
                          <span className="home-schema-node-name">{arch.layer}</span>
                        </div>
                      ))
                    ) : (
                      <div className="home-schema-node">
                        <span className="home-schema-node-tag">SYSTEM COMPONENT</span>
                        <span className="home-schema-node-name">Core Engine Pipeline</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Plate 3: Realtime Telemetry Chip */}
                <div className="home-project-plate home-project-plate--chip" aria-hidden="true">
                  <div className="home-chip-indicator">
                    <span className="home-chip-pulse" />
                    <span className="home-chip-status">{current.status}</span>
                  </div>
                  <div className="home-chip-primary-metric">
                    <span className="home-chip-value">
                      {current.metrics?.[0]?.value || '100%'}
                    </span>
                    <span className="home-chip-label">
                      {current.metrics?.[0]?.label || 'KEY METRIC'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Editorial Description Column */}
            <div className="home-project-content">
              <div className="home-project-header-meta">
                <span className="home-project-id">{current.id}</span>
                <span className="home-project-status-pill">{current.status}</span>
                <span className="home-project-year">{current.year}</span>
              </div>

              <h3 className="home-project-headline">{current.title}</h3>
              <h4 className="home-project-subheadline">{current.subtitle}</h4>

              <p className="home-project-body">{current.overview || current.shortDesc}</p>

              {/* Tech Stack Pills */}
              <div className="home-project-tech-group">
                <span className="home-tech-label">TECHNOLOGY STACK:</span>
                <div className="home-tech-pills">
                  {current.techStack?.map((tech) => (
                    <span key={tech} className="home-tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contributors */}
              {current.team && current.team.length > 0 && (
                <div className="home-project-contributors">
                  <span className="home-contributors-label">CONTRIBUTORS:</span>
                  <span className="home-contributors-text">
                    {current.team.map((m) => m.name).join(' · ')}
                  </span>
                </div>
              )}

              {/* Key Metrics */}
              {current.metrics && current.metrics.length > 0 && (
                <div className="home-project-metrics-row">
                  {current.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="home-metric-item">
                      <span className="home-metric-val">{m.value}</span>
                      <span className="home-metric-lbl">{m.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Links */}
              <div className="home-project-action-row">
                <Link to={`/projects/${current.slug}`} className="home-cta-secondary">
                  <span>Read Full Case Study</span>
                  <span aria-hidden="true">→</span>
                </Link>
                {current.demoUrl && (
                  <a
                    href={current.demoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="home-project-live-link"
                  >
                    <span>Live Prototype</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
