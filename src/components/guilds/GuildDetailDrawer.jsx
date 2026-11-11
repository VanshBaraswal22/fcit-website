import React from 'react';
import { Link } from 'react-router-dom';

/**
 * GUILD TECHNICAL BLUEPRINT DRAWER
 * Expandable technical module that displays verified domain pillars,
 * technology stack, and student leadership in the respective guild's color system.
 */

export default function GuildDetailDrawer({ guild, isOpen, onClose }) {
  if (!isOpen || !guild) return null;

  return (
    <div
      className="guild-blueprint-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${guild.name} Technical Blueprint`}
    >
      <div
        className={`guild-blueprint-modal-content guild-theme--${guild.id}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="blueprint-header">
          <div className="blueprint-tagline-cluster">
            <span className="blueprint-chapter-tag">
              CHAPTER {guild.number} // 04 · TECHNICAL SPECIFICATION
            </span>
            <h2 className="blueprint-title">{guild.name}</h2>
            <p className="blueprint-domain">{guild.domain}</p>
          </div>
          <button
            type="button"
            className="blueprint-close-btn"
            onClick={onClose}
            aria-label="Close specification drawer"
          >
            ✕
          </button>
        </div>

        {/* Narrative */}
        <p className="blueprint-intro-text">{guild.description}</p>

        {/* 1. Core Technical Domains */}
        {guild.technicalDomains && guild.technicalDomains.length > 0 && (
          <div className="blueprint-section">
            <h3 className="section-label-bar">01. RESEARCH &amp; CURRICULUM PILLARS</h3>
            <div className="blueprint-domains-grid">
              {guild.technicalDomains.map((dom) => (
                <div key={dom.id} className="domain-card">
                  <div className="domain-card-badge">{dom.badge}</div>
                  <h4 className="domain-card-name">{dom.name}</h4>
                  <p className="domain-card-summary">{dom.summary}</p>
                  <div className="domain-card-topics">
                    {dom.topics?.map((topic, i) => (
                      <span key={i} className="topic-chip">{topic}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Core Technology Stack */}
        {guild.techStack && guild.techStack.length > 0 && (
          <div className="blueprint-section">
            <h3 className="section-label-bar">02. VERIFIED TECHNOLOGY INFRASTRUCTURE</h3>
            <div className="blueprint-tech-grid">
              {guild.techStack.map((tech, idx) => (
                <div key={idx} className="tech-chip-item">
                  <span className="tech-name">{tech.name}</span>
                  <span className="tech-cat">{tech.category} · {tech.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Student Leadership */}
        {guild.leadership && guild.leadership.length > 0 && (
          <div className="blueprint-section">
            <h3 className="section-label-bar">03. GUILD DIRECTORS &amp; LEADS</h3>
            <div className="blueprint-leads-grid">
              {guild.leadership.map((lead, idx) => (
                <div key={idx} className="lead-card">
                  <img src={lead.avatar} alt={lead.name} className="lead-avatar" />
                  <div className="lead-info">
                    <span className="lead-name">{lead.name}</span>
                    <span className="lead-role">{lead.role}</span>
                    <span className="lead-domain">{lead.domain}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dedicated Route Footer Link */}
        <div className="blueprint-footer">
          <Link
            to={
              guild.id === 'devs-guild'
                ? '/guilds/dev'
                : guild.id === 'intelligence-guild'
                ? '/guilds/intelligence'
                : guild.id === 'algocrew'
                ? '/guilds/algocrew'
                : '/guilds/fusion-x'
            }
            className="blueprint-portal-link"
          >
            <span>OPEN DEDICATED {guild.name} ATLAS</span>
            <span className="portal-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
