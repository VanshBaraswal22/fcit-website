import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/teamCinematic.css';
import MemberProfileModal from '../components/team/MemberProfileModal';
import TeamMemberCard from '../components/team/TeamMemberCard';
import {
  LEADERSHIP_MEMBERS,
  DEVS_GUILD_MEMBERS,
  INTELLIGENCE_GUILD_MEMBERS,
  ALGOCREW_MEMBERS,
  FUSION_X_MEMBERS,
  EVENTS_SPORTS_MEMBERS,
  SOCIAL_MEDIA_MEMBERS,
  DESIGNING_ALUMNI_MEMBERS,
  ALL_TEAM_MEMBERS,
} from '../data/teamPageData';

const STAGE_CONFIG = [
  {
    id: 0,
    domId: 'stage-00',
    shortLabel: 'COLLECTIVE',
    eyebrow: 'THE COLLECTIVE',
    titleLine1: 'THE PEOPLE',
    titleLine2: 'Behind',
    titleLine3: 'FCIT.',
    desc: 'Different minds. Shared curiosity. Collective impact.',
    tag: 'BATCH 2026–27.',
  },
  {
    id: 1,
    domId: 'stage-01',
    shortLabel: 'EXECUTIVE',
    eyebrow: 'EXECUTIVE LEADERSHIP',
    titleLine1: 'THE CORE',
    titleLine2: '',
    titleLine3: 'OF FCIT.',
    desc: 'The leadership shaping the fraternity, guiding its direction and bringing its people together.',
    tag: '6 EXECUTIVE OFFICE-BEARERS',
  },
  {
    id: 2,
    domId: 'stage-02',
    shortLabel: 'TECHNICAL',
    eyebrow: 'TECHNICAL LEADERSHIP',
    titleLine1: 'BUILT BY',
    titleLine2: '',
    titleLine3: 'ENGINEERS.',
    desc: 'The technical minds driving development, experimentation, research and innovation across FCIT.',
    tag: '12 TECHNICAL LEADS · 4 GUILDS',
  },
  {
    id: 3,
    domId: 'stage-03',
    shortLabel: 'NON-TECH',
    eyebrow: 'NON-TECHNICAL LEADERSHIP',
    titleLine1: 'THE FORCE',
    titleLine2: 'Behind',
    titleLine3: 'THE WORK.',
    desc: 'The people who shape FCIT through management, creative work, communication, operations and collaboration.',
    tag: '14 DIVISION HEADS · 3 DEPARTMENTS',
  },
];

export function TeamPage() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeStage, setActiveStage] = useState(0);
  const teamStoryRef = useRef(null);

  // Groupings for the leadership stages
  const executiveMembers = LEADERSHIP_MEMBERS; // 6 executive office-bearers
  const technicalGuilds = [
    {
      id: 'devs-guild',
      num: '01',
      title: "DEV'S GUILD",
      tagline: 'Fullstack Systems & Architecture',
      members: DEVS_GUILD_MEMBERS,
    },
    {
      id: 'intelligence-guild',
      num: '02',
      title: 'INTELLIGENCE GUILD',
      tagline: 'ML / LLMs & Autonomous Systems',
      members: INTELLIGENCE_GUILD_MEMBERS,
    },
    {
      id: 'algocrew',
      num: '03',
      title: 'ALGOCREW',
      tagline: 'Algorithms & Competitive Programming',
      members: ALGOCREW_MEMBERS,
    },
    {
      id: 'fusion-x',
      num: '04',
      title: 'FUSION X',
      tagline: 'Applied Research & Projects',
      members: FUSION_X_MEMBERS,
    },
  ];

  const nonTechnicalDivisions = [
    {
      id: 'events-sports',
      num: '01',
      title: 'EVENTS & SPORTS OPERATIONS',
      subtitle: 'Collegiate Summits, Hackathons & Athletic Meets',
      members: EVENTS_SPORTS_MEMBERS,
    },
    {
      id: 'social-media',
      num: '02',
      title: 'MEDIA & PUBLIC RELATIONS',
      subtitle: 'Digital Narrative, Content Strategy & Photography',
      members: SOCIAL_MEDIA_MEMBERS,
    },
    {
      id: 'designing-alumni',
      num: '03',
      title: 'DESIGNING & ALUMNI RELATIONS',
      subtitle: 'Visual Craft, Editorial Identity & Community',
      members: DESIGNING_ALUMNI_MEMBERS,
    },
  ];

  // Stage jump handler
  const jumpToStage = useCallback((idx) => {
    const stage = STAGE_CONFIG[idx];
    if (!stage) return;
    const el = document.getElementById(stage.domId);
    if (el) {
      const navHeight = 78;
      const targetY = window.pageYOffset + el.getBoundingClientRect().top - navHeight - 16;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  }, []);

  // Expose jumpToStage for tests & verification scripts
  useEffect(() => {
    window.__jumpToTeamStage = jumpToStage;
    return () => {
      delete window.__jumpToTeamStage;
    };
  }, [jumpToStage]);

  // Phase 2: Scroll synchronisation via IntersectionObserver
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const stageIds = STAGE_CONFIG.map((s) => s.domId);
    const elements = stageIds.map((id) => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const matchedId = visible[0].target.id;
          const stageIndex = STAGE_CONFIG.findIndex((s) => s.domId === matchedId);
          if (stageIndex !== -1) {
            setActiveStage(stageIndex);
          }
        }
      },
      {
        root: null,
        rootMargin: '-18% 0px -25% 0px',
        threshold: [0.15, 0.35, 0.55, 0.75],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Scroll-based staggered portrait reveals
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cards = document.querySelectorAll('.team-portrait-card');
    if (!cards.length) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !('IntersectionObserver' in window)) {
      cards.forEach((card) => card.classList.add('is-entered'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-entered');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    // Initial check: elements within or above viewport enter immediately with staggered timing
    const vh = window.innerHeight || 800;
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      if (rect.top < vh) {
        card.classList.add('is-entered');
      } else {
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Pause decorative animations when tab is backgrounded
  useEffect(() => {
    const handleVisibility = () => {
      const el = document.querySelector('.fcit-team-page');
      if (!el) return;
      if (document.hidden) {
        el.classList.add('is-paused');
      } else {
        el.classList.remove('is-paused');
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const currentStage = STAGE_CONFIG[activeStage] || STAGE_CONFIG[0];

  return (
    <div className="fcit-team-page">
      {/* ====================================================================
          TWO-COLUMN STICKY STORYTELLING ARCHITECTURE (PHASE 1)
          ==================================================================== */}
      <section className="team-story" ref={teamStoryRef} aria-label="FCIT Team Storytelling">
        {/* LEFT COLUMN: Stationary Sticky Narrative Panel */}
        <aside className="team-story__narrative" aria-label="Story Narrative Overview">
          <div className="team-story__content" key={currentStage.id}>
            {/* 1. Eyebrow Tag */}
            <div className="story-narrative-eyebrow">
              <span className="eyebrow-rule" />
              <span className="eyebrow-text">{currentStage.eyebrow}</span>
            </div>

            {/* 2. Monumental Display Heading (GFS Didot / Bodoni Moda) */}
            <h1 className="story-narrative-title">
              <span className="title-line title-line--1">{currentStage.titleLine1}</span>
              <span className="title-line title-line--2">
                {currentStage.titleLine2 && <em>{currentStage.titleLine2} </em>}
                <span className="title-burgundy-accent">{currentStage.titleLine3}</span>
              </span>
            </h1>

            {/* 3. Supporting Description */}
            <p className="story-narrative-desc">{currentStage.desc}</p>

            {/* 4. Batch Identifier / Division Tag */}
            <div className="story-narrative-stamp">
              <span className="stamp-text">{currentStage.tag}</span>
              <span className="stamp-rule" aria-hidden="true" />
            </div>

            {/* 5. Compact Stage Progress Indicator (Immediately beneath introduction) */}
            <nav className="story-stage-progress" aria-label="Stage navigator">
              <div className="progress-track-rail">
                <div
                  className="progress-track-fill"
                  style={{ width: `${(activeStage / (STAGE_CONFIG.length - 1)) * 100}%` }}
                />
              </div>
              <div className="progress-nodes-list">
                {STAGE_CONFIG.map((st, idx) => {
                  const isActive = activeStage === idx;
                  return (
                    <button
                      key={st.domId}
                      type="button"
                      onClick={() => jumpToStage(idx)}
                      className={`progress-node-btn ${isActive ? 'is-active' : ''}`}
                      aria-current={isActive ? 'true' : undefined}
                      aria-label={`Jump to ${st.eyebrow}`}
                    >
                      <span className="node-num">0{idx}</span>
                      <span className="node-label">{st.shortLabel}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>
        </aside>

        {/* RIGHT COLUMN: Sequential Storytelling Stages */}
        <div className="team-story__stages">
          {/* ==================================================================
              STAGE 00: THE COLLECTIVE — 32 VERIFIED MEMBERS
              Asymmetric, recognizable, full Batch 2026-27 collection
              ================================================================== */}
          <section
            id="stage-00"
            data-stage="0"
            className="team-stage team-stage--collective"
            aria-labelledby="heading-stage-00"
          >
            {/* Mobile-stacked introduction header (rendered on mobile viewports) */}
            <div className="mobile-stage-header">
              <span className="mobile-stage-eyebrow">THE COLLECTIVE</span>
              <h2 id="heading-stage-00" className="mobile-stage-title">
                THE PEOPLE <br />
                <em>Behind</em> <span className="title-burgundy-accent">FCIT.</span>
              </h2>
              <p className="mobile-stage-desc">Different minds. Shared curiosity. Collective impact.</p>
              <div className="mobile-stage-stamp">BATCH 2026–27.</div>
            </div>

            <div className="collective-editorial-grid" aria-label="The FCIT Batch 2026-27 Collective">
              {ALL_TEAM_MEMBERS.map((member, idx) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  index={idx}
                  onSelect={() => setSelectedMember(member)}
                  className="collective-card-item"
                />
              ))}
            </div>
          </section>

          {/* ==================================================================
              STAGE 01: EXECUTIVE LEADERSHIP — 6 OFFICE-BEARERS
              Prominent hierarchy: President as dominant anchor
              ================================================================== */}
          <section
            id="stage-01"
            data-stage="1"
            className="team-stage team-stage--executive"
            aria-labelledby="heading-stage-01"
          >
            {/* Mobile-stacked introduction header */}
            <div className="mobile-stage-header">
              <span className="mobile-stage-eyebrow">01 / EXECUTIVE LEADERSHIP</span>
              <h2 id="heading-stage-01" className="mobile-stage-title">
                THE CORE <br />
                <span className="title-burgundy-accent">OF FCIT.</span>
              </h2>
              <p className="mobile-stage-desc">
                The leadership shaping the fraternity, guiding its direction and bringing its people together.
              </p>
              <div className="mobile-stage-stamp">6 EXECUTIVE OFFICE-BEARERS</div>
            </div>

            <div className="executive-editorial-composition" aria-label="Executive Leadership Council">
              {executiveMembers.map((member, idx) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  index={idx}
                  onSelect={() => setSelectedMember(member)}
                  showDetails
                  className="exec-member-card"
                />
              ))}
            </div>
          </section>

          {/* ==================================================================
              STAGE 02: TECHNICAL LEADERSHIP — 4 GUILDS · 12 MEMBERS
              4 Distinct Quadrants across Dev's, Intelligence, AlgoCrew, Fusion X
              ================================================================== */}
          <section
            id="stage-02"
            data-stage="2"
            className="team-stage team-stage--technical"
            aria-labelledby="heading-stage-02"
          >
            {/* Mobile-stacked introduction header */}
            <div className="mobile-stage-header">
              <span className="mobile-stage-eyebrow">TECHNICAL LEADERSHIP</span>
              <h2 id="heading-stage-02" className="mobile-stage-title">
                BUILT BY <br />
                <span className="title-burgundy-accent">ENGINEERS.</span>
              </h2>
              <p className="mobile-stage-desc">
                The technical minds driving development, experimentation, research and innovation across FCIT.
              </p>
              <div className="mobile-stage-stamp">12 TECHNICAL LEADS · 4 GUILDS</div>
            </div>

            <div className="tech-guilds-quadrants-grid" aria-label="Technical Leadership Guilds">
              {technicalGuilds.map((guild, gIdx) => (
                <div key={guild.id} className="tech-guild-block">
                  <header className="tech-guild-block-header">
                    <span className="guild-index">{guild.num}</span>
                    <h3 className="guild-title-text">{guild.title}</h3>
                    <p className="guild-tagline-text">{guild.tagline}</p>
                  </header>

                  <div className="tech-guild-members-trio">
                    {guild.members.map((member, mIdx) => (
                      <TeamMemberCard
                        key={member.id}
                        member={member}
                        index={gIdx * 3 + mIdx}
                        onSelect={() => setSelectedMember(member)}
                        className="tech-member-card"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ==================================================================
              STAGE 03: NON-TECHNICAL LEADERSHIP — 3 DIVISIONS · 14 MEMBERS
              Events & Sports (6), Media & PR (5), Designing & Alumni (3)
              ================================================================== */}
          <section
            id="stage-03"
            data-stage="3"
            className="team-stage team-stage--nontechnical"
            aria-labelledby="heading-stage-03"
          >
            {/* Mobile-stacked introduction header */}
            <div className="mobile-stage-header">
              <span className="mobile-stage-eyebrow">NON-TECHNICAL LEADERSHIP</span>
              <h2 id="heading-stage-03" className="mobile-stage-title">
                THE FORCE <br />
                <em>Behind</em> <span className="title-burgundy-accent">THE WORK.</span>
              </h2>
              <p className="mobile-stage-desc">
                The people who shape FCIT through management, creative work, communication, operations and collaboration.
              </p>
              <div className="mobile-stage-stamp">14 DIVISION HEADS · 3 DEPARTMENTS</div>
            </div>

            <div className="nontech-divisions-container" aria-label="Non-Technical Leadership Divisions">
              {nonTechnicalDivisions.map((division, dIdx) => (
                <div key={division.id} className="nontech-division-block">
                  <header className="nontech-division-header">
                    <div className="division-header-left">
                      <span className="division-num">{division.num}</span>
                      <h3 className="division-title">{division.title}</h3>
                      <span className="division-badge">({division.members.length})</span>
                    </div>
                    <p className="division-subtitle">{division.subtitle}</p>
                  </header>

                  <div className="nontech-members-grid">
                    {division.members.map((member, mIdx) => (
                      <TeamMemberCard
                        key={member.id}
                        member={member}
                        index={dIdx * 4 + mIdx}
                        onSelect={() => setSelectedMember(member)}
                        className="nontech-member-card"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      {/* ====================================================================
          CLOSING EDITORIAL STATEMENT SECTION
          ==================================================================== */}
      <section className="team-closing-section">
        <div className="team-closing-shell">
          <h2 className="closing-headline">
            WE BUILD <span className="accent-red">BETTER</span> TOGETHER.
          </h2>

          <p className="closing-supporting-text">
            Be part of the next chapter of FCIT.
          </p>
        </div>
      </section>

      {/* ====================================================================
          ACCESSIBLE PROFILE MODAL (INTERACTIVE MEMBER PROFILE POPUP)
          ==================================================================== */}
      <MemberProfileModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
}

export default TeamPage;
