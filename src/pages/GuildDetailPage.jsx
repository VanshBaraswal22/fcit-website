import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { GUILDS_DETAILED } from '../data/guildsDetailedData';
import GuildInteractiveStage from '../components/guilds/GuildInteractiveStage';
import GuildDomains from '../components/guilds/GuildDomains';
import GuildTechConstellation from '../components/guilds/GuildTechConstellation';
import GuildLeadership from '../components/guilds/GuildLeadership';
import GuildActivities from '../components/guilds/GuildActivities';
import GuildProjects from '../components/guilds/GuildProjects';
import GuildParticipation from '../components/guilds/GuildParticipation';
import '../styles/guildStory.css';
import '../styles/guildEnrichment.css';
import '../styles/guildDetailPage.css';
import '../styles/guildWorlds.css';

const SLUG_TO_ID = {
  dev: 'devs-guild',
  'devs-guild': 'devs-guild',
  intelligence: 'intelligence-guild',
  'intelligence-guild': 'intelligence-guild',
  algocrew: 'algocrew',
  'fusion-x': 'fusion-x',
  fusionx: 'fusion-x',
  fusion: 'fusion-x',
};

export function GuildDetailPage({ guildId: propGuildId }) {
  const { slug } = useParams();
  const targetId = propGuildId || (slug ? SLUG_TO_ID[slug.toLowerCase()] : null);
  const guild = GUILDS_DETAILED.find((g) => g.id === targetId) || GUILDS_DETAILED[0];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [guild.id]);

  if (!guild) {
    return <Navigate to="/working-guilds" replace />;
  }

  const currentIndex = GUILDS_DETAILED.findIndex((g) => g.id === guild.id);
  const nextGuild = GUILDS_DETAILED[(currentIndex + 1) % GUILDS_DETAILED.length];

  const targetNextRoute =
    nextGuild.id === 'devs-guild'
      ? '/guilds/dev'
      : nextGuild.id === 'intelligence-guild'
      ? '/guilds/intelligence'
      : nextGuild.id === 'algocrew'
      ? '/guilds/algocrew'
      : '/guilds/fusion-x';

  return (
    <div className={`guild-detail-page guild-detail-page--${guild.id}`}>
      {/* 1. Header Navigation Strip */}
      <div className="guild-detail-nav-strip section-shell">
        <Link to={`/working-guilds#${guild.id}`} className="guild-back-link">
          <span className="back-arrow" aria-hidden="true">←</span>
          <span>ALL WORKING GUILDS</span>
        </Link>
        <div className="guild-detail-chapter-pill">
          CHAPTER {guild.number} // 04 · {guild.discipline || guild.domain}
        </div>
      </div>

      {/* 2. Hero */}
      <header className="guild-detail-hero section-shell">
        <div className="guild-detail-hero__content">
          <h1 className="guild-detail-title">{guild.name}</h1>
          <p className="guild-detail-slogan">{guild.tagline}</p>
          <div className="guild-detail-domain-chip">{guild.domain}</div>
          <p className="guild-detail-narrative">{guild.introduction || guild.description}</p>
        </div>

        {/* 2D Interactive Stage Artwork */}
        <div className="guild-detail-hero__artwork">
          <GuildInteractiveStage
            guild={guild}
            index={currentIndex}
            isPanelInView={true}
            hasRevealed={true}
          />
        </div>
      </header>

      {/* 3. Deep Specification Modules */}
      <main className="guild-detail-main-modules section-shell">
        {/* Core Domains */}
        <section className="guild-detail-section" id="domains">
          <GuildDomains domains={guild.technicalDomains} guildId={guild.id} />
        </section>

        {/* Tech Constellation */}
        <section className="guild-detail-section" id="tech">
          <GuildTechConstellation techStack={guild.techStack} guildName={guild.name} />
        </section>

        {/* Student Leadership */}
        <section className="guild-detail-section" id="leadership">
          <GuildLeadership leadership={guild.leadership} guildName={guild.name} />
        </section>

        {/* Activities */}
        <section className="guild-detail-section" id="activities">
          <GuildActivities activities={guild.activities} guildName={guild.name} />
        </section>

        {/* Projects */}
        <section className="guild-detail-section" id="projects">
          <GuildProjects projects={guild.projects} guildName={guild.name} />
        </section>

        {/* Participation */}
        <section className="guild-detail-section" id="participate">
          <GuildParticipation participation={guild.participation} guildName={guild.name} />
        </section>
      </main>

      {/* 4. Next Guild Exploration Banner */}
      <footer className="guild-detail-footer-next section-shell">
        <div className="next-guild-card">
          <div className="next-guild-pre">NEXT DISCIPLINE</div>
          <h2 className="next-guild-title">{nextGuild.name}</h2>
          <p className="next-guild-desc">{nextGuild.description}</p>
          <Link to={targetNextRoute} className="next-guild-btn">
            <span>EXPLORE {nextGuild.name}</span>
            <span className="next-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default GuildDetailPage;
