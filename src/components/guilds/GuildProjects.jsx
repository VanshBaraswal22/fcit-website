import React from 'react';
import { Link } from 'react-router-dom';

export default function GuildProjects({ projects = [], guildName = '' }) {
  return (
    <div className="guild-projects-module">
      <div className="guild-module-header">
        <span className="guild-module-eyebrow">ENGINEERING REPOSITORY</span>
        <h3 className="guild-module-title">Selected Projects &amp; Accomplishments</h3>
        <p className="guild-module-desc">
          Featured systems, open-source repositories, and research prototypes authored and maintained by engineers in {guildName}.
        </p>
      </div>

      <div className="guild-projects-grid">
        {projects.map((proj, idx) => (
          <article key={idx} className="guild-project-card">
            <div className="project-card-topline">
              <span className="project-category-badge">{proj.category}</span>
              <span className="project-status-pill">{proj.status}</span>
            </div>

            <h4 className="project-card-title">{proj.title}</h4>
            <div className="project-card-subtitle">{proj.subtitle}</div>
            
            <p className="project-card-summary">{proj.summary}</p>

            {/* Tech stack chips */}
            <div className="project-tech-chips">
              {proj.tech.map((t, i) => (
                <span key={i} className="project-tech-chip">
                  {t}
                </span>
              ))}
            </div>

            {/* Metrics */}
            {proj.metrics && (
              <div className="project-metrics-row">
                {proj.metrics.map((m, i) => (
                  <div key={i} className="project-metric-item">
                    <span className="metric-val">{m.value}</span>
                    <span className="metric-lbl">{m.label}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="project-card-actions">
              <a
                href={proj.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-repo-link"
                aria-label={`View source code for ${proj.title} on GitHub`}
              >
                <span>View Source Code on GitHub</span>
                <span className="link-arrow" aria-hidden="true">↗</span>
              </a>
              <Link to="/projects" className="project-details-link">
                <span>All Projects</span>
                <span className="link-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
