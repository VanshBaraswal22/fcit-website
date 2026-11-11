import React from 'react';

export default function GuildActivities({ activities = [], guildName = '' }) {
  return (
    <div className="guild-activities-module">
      <div className="guild-module-header">
        <span className="guild-module-eyebrow">COMMUNITY RHYTHMS</span>
        <h3 className="guild-module-title">Guild Activities &amp; Sprints</h3>
        <p className="guild-module-desc">
          Structured recurring sessions, technical challenges, and build nights conducted across academic semesters for {guildName}.
        </p>
      </div>

      <div className="guild-activities-grid">
        {activities.map((act, index) => (
          <article key={index} className="guild-activity-card">
            <div className="activity-card-header">
              <span className="activity-type-pill">{act.type}</span>
              <span className="activity-cadence-label">{act.cadence}</span>
            </div>

            <h4 className="activity-title">{act.title}</h4>
            <p className="activity-summary">{act.summary}</p>

            <div className="activity-outcome-box">
              <span className="outcome-label">TANGIBLE OUTCOME:</span>
              <span className="outcome-text">{act.outcome}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
