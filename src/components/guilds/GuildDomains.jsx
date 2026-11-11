import React, { useState } from 'react';

export default function GuildDomains({ domains = [], guildId = '' }) {
  const [activeDomainId, setActiveDomainId] = useState(domains[0]?.id || '');

  const activeDomain = domains.find((d) => d.id === activeDomainId) || domains[0];

  return (
    <div className="guild-domains-module">
      <div className="guild-module-header">
        <span className="guild-module-eyebrow">CORE DISCIPLINES</span>
        <h3 className="guild-module-title">Technical Domains &amp; Specialisations</h3>
        <p className="guild-module-desc">
          Structured engineering tracks maintained within the guild, guiding members from fundamentals to advanced distributed systems.
        </p>
      </div>

      <div className="guild-domains-grid">
        {/* Domain selection chips/cards */}
        <div className="guild-domains-list" role="tablist" aria-label="Technical Domains">
          {domains.map((domain) => {
            const isSelected = domain.id === activeDomainId;
            return (
              <button
                key={domain.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`guild-domain-card ${isSelected ? 'is-selected' : ''}`}
                onClick={() => setActiveDomainId(domain.id)}
              >
                <div className="guild-domain-card-header">
                  <span className="guild-domain-badge">{domain.badge}</span>
                  <span className="guild-domain-selector-indicator" aria-hidden="true">
                    {isSelected ? '●' : '○'}
                  </span>
                </div>
                <h4 className="guild-domain-name">{domain.name}</h4>
                <p className="guild-domain-snip">{domain.summary}</p>
              </button>
            );
          })}
        </div>

        {/* Selected domain deep-dive inspection card */}
        {activeDomain && (
          <div className="guild-domain-detail-card" role="tabpanel">
            <div className="domain-detail-topline">
              <span className="domain-detail-tag">FOCUS ARCHITECTURE // {activeDomain.badge}</span>
              <span className="domain-detail-domain-name">{activeDomain.name}</span>
            </div>

            <p className="domain-detail-summary">{activeDomain.summary}</p>

            <div className="domain-detail-block">
              <span className="domain-detail-label">CORE FOCUS TOPICS</span>
              <div className="domain-topics-chips">
                {activeDomain.topics.map((topic, i) => (
                  <span key={i} className="domain-topic-chip">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="domain-detail-block">
              <span className="domain-detail-label">CAMPUS &amp; ENGINEERING RELEVANCE</span>
              <p className="domain-relevance-text">{activeDomain.relevance}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
