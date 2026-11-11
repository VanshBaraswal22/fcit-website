import React, { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import SectionLabel from '../components/SectionLabel';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projectsData';

export function ProjectsPage() {
  const [filter, setFilter] = useState('ALL');

  const filteredProjects = projects.filter((p) => {
    if (filter === 'ALL') return true;
    if (filter === 'SYSTEMS') return p.category.includes('SYSTEMS') || p.category.includes('INFRASTRUCTURE');
    if (filter === 'ML & AI') return p.category.includes('MACHINE LEARNING') || p.category.includes('VISION') || p.category.includes('NLP');
    if (filter === 'OPEN SOURCE') return p.category.includes('COMMUNITY') || p.category.includes('DEVELOPMENT');
    if (filter === 'HARDWARE') return p.category.includes('IOT') || p.category.includes('NETWORKING');
    return true;
  });

  return (
    <div className="projects-page paper-grain" style={{ backgroundColor: 'var(--color-antique-parchment)', minHeight: '100vh' }}>
      <div className="section-shell" style={{ paddingTop: '32px', paddingBottom: 'clamp(56px, 8vw, 96px)' }}>
        <Breadcrumbs items={[{ label: 'PROJECTS' }]} />

        {/* Masthead Header */}
        <div style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          <SectionLabel>FEATURED ENGINEERING</SectionLabel>

          <h1
            className="section-title-editorial"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5rem)', lineHeight: 1.05, maxWidth: '1000px', marginBottom: '20px' }}
          >
            IDEAS INTO <em>REALITY.</em>
          </h1>

          <p className="section-lead-editorial" style={{ maxWidth: '820px' }}>
            A curated collection of open-source libraries, neural architectures, hardware mesh firmwares, and campus utilities authored by student builders across HBTU. Every project is documented with architecture blueprints and source repositories.
          </p>
        </div>

        {/* Category Filters */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            borderBottom: '2px solid var(--border-medium)',
            paddingBottom: '16px',
            marginBottom: '44px',
          }}
        >
          {['ALL', 'SYSTEMS', 'ML & AI', 'OPEN SOURCE', 'HARDWARE'].map((cat) => {
            const isSelected = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                style={{
                  padding: '8px 16px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  border: isSelected ? '1px solid var(--color-primary-crimson)' : '1px solid var(--border-light)',
                  backgroundColor: isSelected ? 'var(--color-primary-crimson)' : 'var(--color-warm-ivory)',
                  color: isSelected ? 'var(--color-warm-ivory)' : 'var(--color-ink-dark)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Showcase */}
        <div>
          {filteredProjects.map((proj, idx) => (
            <ProjectCard
              key={proj.slug}
              project={proj}
              variant="feature"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;
