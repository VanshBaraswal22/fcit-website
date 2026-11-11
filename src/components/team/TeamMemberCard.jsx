import React from 'react';
import ImageWithFallback from '../ImageWithFallback';

export function TeamMemberCard({
  member,
  index = 0,
  onSelect,
  className = '',
  showDetails = false,
}) {
  if (!member) return null;

  return (
    <div
      className={`team-portrait-card team-member-card ${className}`}
      style={{
        '--portrait-idx': index,
        '--portrait-delay': `${Math.min(650, index * 35)}ms`,
      }}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      aria-label={`View profile for ${member.name}, ${member.role}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect?.();
        }
      }}
    >
      {/* Crimson offset border backplate */}
      <div className="crimson-backplate" aria-hidden="true" />

      {/* Main card frame with dark burgundy background */}
      <div className="card-frame">
        <ImageWithFallback
          src={member.image}
          alt={member.name}
          name={member.name}
          role={member.role}
          className="monochrome-portrait"
          loading={index < 8 ? 'eager' : 'lazy'}
        />

        <div className="card-caption">
          <span className="card-role">{member.role}</span>
          <span className="card-name">{member.name}</span>
          {showDetails && member.yearBranch && (
            <span className="card-meta-branch">{member.yearBranch}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamMemberCard;
