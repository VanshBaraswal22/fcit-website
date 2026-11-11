import React, { useState, useMemo } from 'react';

export default function GuildTechConstellation({ techStack = [], guildName = '' }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [hoveredTech, setHoveredTech] = useState(null);

  const categories = useMemo(() => {
    const cats = new Set(techStack.map((t) => t.category));
    return ['ALL', ...Array.from(cats)];
  }, [techStack]);

  const filteredTech = useMemo(() => {
    if (selectedCategory === 'ALL') return techStack;
    return techStack.filter((t) => t.category === selectedCategory);
  }, [techStack, selectedCategory]);

  const activeTech = hoveredTech || filteredTech[0] || techStack[0];

  return (
    <div className="guild-constellation-module">
      <div className="guild-module-header">
        <span className="guild-module-eyebrow">TOOLCHAIN ARCHITECTURE</span>
        <h3 className="guild-module-title">Technology Constellation</h3>
        <p className="guild-module-desc">
          Core languages, frameworks, storage engines, and developer toolchains utilized across projects authored by {guildName}.
        </p>
      </div>

      {/* Category filter pills */}
      <div className="constellation-filters" role="group" aria-label="Technology Categories">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`constellation-filter-btn ${selectedCategory === cat ? 'is-active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="constellation-display-stage">
        {/* Constellation Nodes Grid */}
        <div className="constellation-nodes-grid">
          {filteredTech.map((tech) => {
            const isHovered = hoveredTech?.name === tech.name;
            return (
              <div
                key={tech.name}
                className={`constellation-node-card ${isHovered ? 'is-hovered' : ''}`}
                onMouseEnter={() => setHoveredTech(tech)}
                onMouseLeave={() => setHoveredTech(null)}
                tabIndex={0}
                role="button"
                aria-label={`${tech.name} — ${tech.category}`}
              >
                <div className="node-card-topline">
                  <span className="node-cat-badge">{tech.category}</span>
                  <span className="node-level-pill">{tech.level}</span>
                </div>
                <h4 className="node-tech-name">{tech.name}</h4>
                <p className="node-tech-snip">{tech.desc}</p>
                <div className="node-glow-indicator" aria-hidden="true" />
              </div>
            );
          })}
        </div>

        {/* Selected Tech Inspector Readout */}
        {activeTech && (
          <div className="constellation-inspector-card">
            <div className="inspector-header">
              <span className="inspector-eyebrow">ACTIVE SPECIFICATION</span>
              <span className="inspector-badge">{activeTech.category}</span>
            </div>
            <h4 className="inspector-tech-name">{activeTech.name}</h4>
            <div className="inspector-rule" aria-hidden="true" />
            <p className="inspector-desc">{activeTech.desc}</p>
            <div className="inspector-footer">
              <span className="inspector-status-indicator">● OPERATIONAL ADOPTION: {activeTech.level.toUpperCase()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
