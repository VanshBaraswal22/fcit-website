import React from 'react';
import DevGuildWorld from './worlds/DevGuildWorld';
import IntelligenceGuildWorld from './worlds/IntelligenceGuildWorld';
import AlgoCrewWorld from './worlds/AlgoCrewWorld';
import FusionXWorld from './worlds/FusionXWorld';

/**
 * GuildInteractiveStage
 * Modern, award-winning 2D creative interactive worlds for the four FCIT Working Guilds:
 * - DEV'S GUILD: Software Engineering matrix with live CI/CD pipeline & code window
 * - INTELLIGENCE GUILD: Synaptic neural network with attention tensor heatmap
 * - ALGOCREW: Algorithmic laboratory with live array sorting visualizer & graph traversal
 * - FUSION X: Multi-orbital innovation cosmos with telemetry sensors
 */
export default function GuildInteractiveStage({
  guild,
  index = 0,
  isPanelInView = true,
  hasRevealed = true,
}) {
  const guildId = guild?.id || 'devs-guild';

  const renderWorld = () => {
    switch (guildId) {
      case 'devs-guild':
        return <DevGuildWorld isInView={isPanelInView} />;
      case 'intelligence-guild':
        return <IntelligenceGuildWorld isInView={isPanelInView} />;
      case 'algocrew':
        return <AlgoCrewWorld isInView={isPanelInView} />;
      case 'fusion-x':
      default:
        return <FusionXWorld isInView={isPanelInView} />;
    }
  };

  return (
    <figure
      className={`guild-artwork-stage modern-world-stage guild-stage--${guildId} ${
        isPanelInView ? 'is-in-view' : ''
      } ${hasRevealed ? 'has-revealed' : ''}`}
      aria-label={`${guild?.name || 'Guild'} Interactive 2D Environment`}
    >
      <div className="modern-stage-world-wrapper">
        {renderWorld()}
      </div>
    </figure>
  );
}
