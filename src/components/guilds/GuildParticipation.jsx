import React from 'react';

export default function GuildParticipation({ participation = {}, guildName = '' }) {
  if (!participation || !participation.steps) return null;

  return (
    <div className="guild-participation-module">
      <div className="participation-inner-banner">
        <div className="participation-header">
          <span className="guild-module-eyebrow">COMMUNITY ONBOARDING</span>
          <h3 className="participation-headline">{participation.headline}</h3>
          <p className="participation-subheadline">{participation.subheadline}</p>
        </div>

        <div className="participation-steps-grid">
          {participation.steps.map((step) => (
            <div key={step.num} className="participation-step-card">
              <span className="step-num-badge">{step.num}</span>
              <h4 className="step-title">{step.title}</h4>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="participation-action-strip">
          <span className="participation-cadence-note">
            Mentorship cohorts open to all semesters · Zero prior commercial experience required
          </span>
        </div>
      </div>
    </div>
  );
}
