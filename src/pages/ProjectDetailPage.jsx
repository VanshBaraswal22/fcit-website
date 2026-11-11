import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import SectionLabel from '../components/SectionLabel';
import HalftonePattern from '../textures/HalftonePattern';
import { projects } from '../data/projectsData';

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="section-shell" style={{ paddingTop: '80px', paddingBottom: '80px', textAlign: 'center' }}>
        <h1 className="section-title-editorial">Case Study Not Found</h1>
        <p>The requested engineering project could not be found.</p>
        <Link to="/projects" className="btn-editorial btn-editorial-crimson" style={{ marginTop: '20px' }}>
          Return to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="project-detail-page paper-grain" style={{ backgroundColor: 'var(--color-antique-parchment)', minHeight: '100vh' }}>
      <div className="section-shell" style={{ paddingTop: '32px', paddingBottom: 'clamp(56px, 8vw, 96px)' }}>
        <Breadcrumbs items={[{ label: 'PROJECTS', to: '/projects' }, { label: project.title.toUpperCase() }]} />

        {/* Masthead Header */}
        <div
          className="editorial-card paper-grain"
          style={{
            backgroundColor: 'var(--color-warm-ivory)',
            border: '2px solid var(--border-medium)',
            padding: 'clamp(28px, 5vw, 64px)',
            position: 'relative',
            marginBottom: '48px',
          }}
        >
          <HalftonePattern type="corner" position="br" color="crimson" />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', margin: '16px 0 24px' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--color-primary-crimson)', letterSpacing: '0.08em', fontWeight: 600, textTransform: 'uppercase' }}>
              {project.category} · {project.year}
            </span>
            <span
              style={{
                padding: '4px 12px',
                backgroundColor: 'var(--color-soft-cream)',
                border: '1px solid var(--border-medium)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--color-ink-dark)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {project.status}
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
              lineHeight: 1.05,
              fontWeight: 400,
              color: 'var(--color-ink-dark)',
              marginBottom: '16px',
            }}
          >
            {(() => {
              const words = project.title.split(' ');
              if (words.length <= 1) return project.title;
              const last = words.pop();
              return (
                <>
                  {words.join(' ')} <em style={{ fontStyle: 'italic', color: 'var(--color-primary-crimson)' }}>{last}</em>
                </>
              );
            })()}
          </h1>

          {project.subtitle && (
            <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', color: 'var(--color-ink-charcoal)', marginBottom: '28px', maxWidth: '850px' }}>
              {project.subtitle}
            </div>
          )}

          {/* Primary Action Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '36px' }}>
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial btn-editorial-crimson magnetic"
              >
                <span>Browse Repository</span>
                <span>↗</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial btn-editorial-outline magnetic"
              >
                <span>Live Demo</span>
                <span>↗</span>
              </a>
            )}
          </div>

          {/* Large Hero Graphic Frame */}
          <div
            style={{
              maxHeight: '480px',
              overflow: 'hidden',
              border: '1px solid var(--border-medium)',
              backgroundColor: 'var(--color-soft-cream)',
              marginBottom: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={project.image}
              alt={project.alt || project.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Performance Benchmark Metrics */}
          {project.metrics && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '16px',
                padding: '24px',
                backgroundColor: 'var(--color-antique-parchment)',
                border: '1px solid var(--border-medium)',
                marginBottom: '36px',
              }}
            >
              {project.metrics.map((m, idx) => (
                <div key={idx}>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', color: 'var(--color-ink-charcoal)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                    {m.label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 600, color: 'var(--color-primary-crimson)', marginTop: '4px' }}>
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          <p style={{ fontSize: '1.15rem', lineHeight: 1.75, color: 'var(--color-ink-charcoal)', maxWidth: '920px' }}>
            {project.overview}
          </p>
        </div>

        {/* Deep Dive Breakdown: Problem vs Architecture */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', marginBottom: '48px' }}>
          {/* Problem Statement */}
          <div className="editorial-card" style={{ backgroundColor: 'var(--color-warm-ivory)', border: '1px solid var(--border-medium)', padding: '32px' }}>
            <SectionLabel>THE ENGINEERING CHALLENGE</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 400, color: 'var(--color-ink-dark)', marginBottom: '18px' }}>
              Why this system was built.
            </h2>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.7, color: 'var(--color-ink-charcoal)' }}>
              {project.problemStatement}
            </p>
          </div>

          {/* Tech Stack Matrix */}
          <div className="editorial-card" style={{ backgroundColor: 'var(--color-warm-ivory)', border: '1px solid var(--border-medium)', padding: '32px' }}>
            <SectionLabel>TECHNOLOGY STACK</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 400, color: 'var(--color-ink-dark)', marginBottom: '18px' }}>
              Languages, runtimes &amp; libraries.
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.8125rem',
                    padding: '6px 14px',
                    backgroundColor: 'var(--color-antique-parchment)',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--color-ink-dark)',
                    fontWeight: 500,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--color-ink-charcoal)' }}>
              Tags: {project.tags.join(' · ')}
            </div>
          </div>
        </div>

        {/* System Architecture Blueprint */}
        {project.architecture && (
          <div
            className="editorial-card paper-grain"
            style={{
              backgroundColor: 'var(--color-warm-ivory)',
              border: '1px solid var(--border-medium)',
              padding: 'clamp(28px, 5vw, 44px)',
              marginBottom: '48px',
            }}
          >
            <SectionLabel>SYSTEM ARCHITECTURE</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 400, color: 'var(--color-ink-dark)', marginBottom: '24px' }}>
              Layer-by-Layer Decomposition
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
              {project.architecture.map((layer, idx) => (
                <div
                  key={idx}
                  style={{
                    borderTop: '2px solid var(--color-primary-crimson)',
                    paddingTop: '16px',
                    backgroundColor: 'var(--color-antique-parchment)',
                    padding: '20px',
                    border: '1px solid var(--border-light)',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', color: 'var(--color-primary-crimson)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                    Layer 0{idx + 1}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 500, color: 'var(--color-ink-dark)', margin: '6px 0 10px' }}>
                    {layer.layer}
                  </h3>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--color-ink-charcoal)' }}>
                    {layer.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contributors & Working Group */}
        <div
          className="editorial-card"
          style={{
            backgroundColor: 'var(--color-warm-ivory)',
            border: '1px solid var(--border-medium)',
            padding: '32px',
          }}
        >
          <SectionLabel>CONTRIBUTORS</SectionLabel>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 400, color: 'var(--color-ink-dark)', marginBottom: '18px' }}>
            Contributors &amp; Guidance
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {project.team.map((m, idx) => (
              <div key={idx} style={{ padding: '16px', backgroundColor: 'var(--color-antique-parchment)', border: '1px solid var(--border-light)' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-ink-dark)' }}>
                  {m.name}
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--color-primary-crimson)', fontWeight: 500, marginTop: '2px' }}>
                  {m.role}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '24px', borderTop: '1px solid var(--border-light)', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Link to="/projects" className="btn-editorial btn-editorial-outline">
              <span>Back to Projects</span>
              <span>↗</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailPage;
