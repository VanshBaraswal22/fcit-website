import React from 'react';
import { Link } from 'react-router-dom';

export function ProjectCard({ project, variant = 'feature' }) {
  if (variant === 'feature') {
    return (
      <article
        className="editorial-card reveal"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          backgroundColor: 'var(--color-warm-ivory)',
          border: '1px solid var(--border-medium)',
          overflow: 'hidden',
          marginBottom: '36px',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {/* Visual Canvas */}
          <div
            style={{
              position: 'relative',
              backgroundColor: 'var(--color-soft-cream)',
              minHeight: '340px',
              borderRight: '1px solid var(--border-medium)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={project.image}
              alt={project.alt || project.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'contrast(120%)',
                transition: 'transform 0.6s ease',
              }}
              loading="lazy"
            />
            <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
              <span
                style={{
                  padding: '4px 10px',
                  backgroundColor: 'var(--color-warm-ivory)',
                  border: '1px solid var(--border-medium)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  color: 'var(--color-ink-dark)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                {project.status} · {project.year}
              </span>
            </div>
          </div>

          {/* Editorial Content */}
          <div style={{ padding: '36px clamp(24px, 4vw, 48px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--color-primary-crimson)', letterSpacing: '0.08em', fontWeight: 600, textTransform: 'uppercase' }}>
                  {project.category}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.75rem, 2.8vw, 2.4rem)',
                  fontWeight: 500,
                  lineHeight: 1.15,
                  color: 'var(--color-ink-dark)',
                  marginBottom: '10px',
                }}
              >
                {project.title}
              </h3>

              {project.subtitle && (
                <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--color-ink-charcoal)', marginBottom: '16px' }}>
                  {project.subtitle}
                </div>
              )}

              <p style={{ fontSize: '1rem', lineHeight: 1.68, color: 'var(--color-ink-charcoal)', marginBottom: '24px' }}>
                {project.shortDesc}
              </p>

              {/* Metrics Row */}
              {project.metrics && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                    gap: '12px',
                    padding: '16px',
                    backgroundColor: 'rgba(41, 40, 39, 0.03)',
                    border: '1px solid var(--border-light)',
                    marginBottom: '24px',
                  }}
                >
                  {project.metrics.map((m, idx) => (
                    <div key={idx}>
                      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', color: 'var(--color-ink-charcoal)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                        {m.label}
                      </div>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 600, color: 'var(--color-primary-crimson)' }}>
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech Stack Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '28px' }}>
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.6875rem',
                      padding: '4px 10px',
                      backgroundColor: 'var(--color-antique-parchment)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--color-ink-charcoal)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '20px' }}>
              <Link
                to={`/projects/${project.slug}`}
                className="btn-editorial btn-editorial-crimson magnetic"
              >
                <span>Read Full Case Study</span>
                <span>↗</span>
              </Link>

              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-editorial btn-editorial-outline"
                >
                  <span>View Repository</span>
                  <span>↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Secondary / Asymmetric layout
  return (
    <article
      className="editorial-card reveal"
      style={{
        backgroundColor: 'var(--color-warm-ivory)',
        border: '1px solid var(--border-medium)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          height: '220px',
          backgroundColor: 'var(--color-soft-cream)',
          borderBottom: '1px solid var(--border-medium)',
          overflow: 'hidden',
        }}
      >
        <img
          src={project.image}
          alt={project.alt || project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(115%)' }}
          loading="lazy"
        />
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
          <span
            style={{
              padding: '3px 8px',
              backgroundColor: 'var(--color-warm-ivory)',
              border: '1px solid var(--border-medium)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.6875rem',
              fontWeight: 600,
              color: 'var(--color-ink-dark)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            {project.status} · {project.year}
          </span>
        </div>
      </div>

      <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', color: 'var(--color-primary-crimson)', letterSpacing: '0.08em', marginBottom: '8px', textTransform: 'uppercase', fontWeight: 600 }}>
            {project.category}
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 500, color: 'var(--color-ink-dark)', marginBottom: '10px', lineHeight: 1.2 }}>
            {project.title}
          </h3>
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: 'var(--color-ink-charcoal)', marginBottom: '18px' }}>
            {project.shortDesc}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6875rem',
                  padding: '3px 8px',
                  backgroundColor: 'var(--color-antique-parchment)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--color-ink-charcoal)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link
            to={`/projects/${project.slug}`}
            className="btn-editorial btn-editorial-crimson"
            style={{ padding: '8px 16px', fontSize: '0.8125rem' }}
          >
            <span>Explore Case Study</span>
            <span>↗</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
