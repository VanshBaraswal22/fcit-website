import React from 'react';
import { Link } from 'react-router-dom';
import { DEVS_GUILD_MEMBERS } from '../../data/teamPageData';

export default function DevLeadershipSection() {
  const leadership = [
    {
      ...DEVS_GUILD_MEMBERS[0],
      responsibility: 'Software Architecture, Full-Stack Systems & Platform Engineering',
    },
    {
      ...DEVS_GUILD_MEMBERS[1],
      responsibility: 'Backend Engineering, Distributed APIs & Database Orchestration',
    },
    {
      ...DEVS_GUILD_MEMBERS[2],
      responsibility: 'Frontend Architecture, Design Systems & DevOps Pipelines',
    },
  ];

  return (
    <section id="scale" className="dev-section dev-leadership-section">
      <div className="section-shell">
        <div className="dev-section-header">
          <div className="dev-section-eyebrow">
            <span className="eyebrow-accent">//</span>
            <span>STEWARDSHIP &amp; ARCHITECTURE</span>
          </div>
          <div className="dev-section-title-wrap">
            <h2 className="dev-section-title">Guild Leadership &amp; Engineering Council</h2>
            <p className="dev-section-intro">
              Student architects upholding code quality, infrastructure reliability,
              and peer-driven software craftsmanship across the fraternity.
            </p>
          </div>
        </div>

        {/* Leadership Cards Grid */}
        <div className="dev-leads-grid">
          {leadership.map((lead) => (
            <div key={lead.id} className="dev-lead-card">
              <div className="lead-photo-frame">
                <img
                  src={lead.image}
                  alt={lead.name}
                  className="lead-photo-img"
                  onError={(e) => {
                    e.currentTarget.src = '/images/avatar-placeholder.png';
                  }}
                />
                <div className="lead-badge-pill">{lead.role}</div>
              </div>

              <div className="lead-info">
                <h3 className="lead-name">{lead.name}</h3>
                <span className="lead-role-title">{lead.role}</span>
                <p className="lead-responsibility">{lead.responsibility}</p>
              </div>

              <div className="lead-card-footer">
                <Link to="/team" className="lead-profile-link">
                  <span>VIEW IN PEOPLE REGISTER</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Institutional Engineering Manifesto / Closing Strip */}
        <div className="dev-manifesto-banner">
          <div className="manifesto-left">
            <span className="manifesto-eyebrow">THE DEV'S GUILD MANIFESTO</span>
            <h3 className="manifesto-headline">
              "Build systems that hold up in the real world."
            </h3>
            <p className="manifesto-body">
              We reject brittle code, unverified claims, and superficial complexity. Every service
              deployed by FCIT is built to survive network partitions, handle unexpected campus
              traffic surges, and serve as an open textbook for future engineering cohorts at Harcourt
              Butler Technical University.
            </p>
          </div>

          <div className="manifesto-right">
            <div className="manifesto-spec-row">
              <span className="spec-title">SPRINT CADENCE</span>
              <span className="spec-val">Bi-Weekly Build Salons</span>
            </div>
            <div className="manifesto-spec-row">
              <span className="spec-title">CODE CRITERIA</span>
              <span className="spec-val">Double Peer Review / 100% Type-Safe</span>
            </div>
            <div className="manifesto-spec-row">
              <span className="spec-title">AFFILIATION</span>
              <span className="spec-val">Department of CSE · HBTU Kanpur</span>
            </div>
            <div className="manifesto-actions">
              <Link to="/working-guilds" className="btn-dev-secondary">
                <span>EXPLORE ALL WORKING GUILDS</span>
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
