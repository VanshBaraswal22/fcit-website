import React from 'react';

export default function GuildLeadership({ leadership = [], guildName = '' }) {
  return (
    <div className="guild-leadership-module">
      <div className="guild-module-header">
        <span className="guild-module-eyebrow">STUDENT STEWARDSHIP</span>
        <h3 className="guild-module-title">THE PEOPLE BUILDING THE GUILD</h3>
        <p className="guild-module-desc">
          Technical leads and coordinators steering curriculum tracks, code reviews, and project architectures for {guildName}.
        </p>
      </div>

      <div className="guild-leadership-grid">
        {leadership.map((member) => (
          <article key={member.id || member.name} className="guild-leader-card">
            <div className="guild-leader-portrait-wrap">
              <div className="leader-portrait-frame">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                  width={280}
                  height={340}
                  className="leader-portrait-img"
                  onError={(e) => {
                    // Fallback to campus architecture SVG if webp fails to load
                    e.currentTarget.src = '/images/campus-architecture.svg';
                  }}
                />
                <div className="leader-portrait-tint" aria-hidden="true" />
              </div>
              <div className="leader-crimson-accent-rule" aria-hidden="true" />
            </div>

            <div className="guild-leader-info">
              <div className="leader-role-badge">{member.role}</div>
              <h4 className="leader-name">{member.name}</h4>
              <div className="leader-gold-divider" aria-hidden="true" />
              
              <div className="leader-responsibility-block">
                <span className="responsibility-label">TECHNICAL RESPONSIBILITY</span>
                <p className="responsibility-text">{member.responsibility}</p>
              </div>

              {member.github && (
                <div className="leader-actions">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="leader-profile-link"
                    aria-label={`View FCIT engineering records for ${member.name}`}
                  >
                    <span>FCIT Technical Registry</span>
                    <span className="link-arrow" aria-hidden="true">↗</span>
                  </a>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
