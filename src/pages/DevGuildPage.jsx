import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RetroComputer3D from '../components/dev-guild/RetroComputer3D';
import TerminalHUD from '../components/dev-guild/TerminalHUD';
import TechnicalDomainsSection from '../components/dev-guild/TechnicalDomainsSection';
import EngineeringPipelineSection from '../components/dev-guild/EngineeringPipelineSection';
import GuildBuildsSection from '../components/dev-guild/GuildBuildsSection';
import DevLeadershipSection from '../components/dev-guild/DevLeadershipSection';
import '../styles/devGuild.css';

export default function DevGuildPage() {
  const [activeCommand, setActiveCommand] = useState('run guild.exe');
  const [bootState, setBootState] = useState('ready'); // 'standby' | 'booting' | 'ready'

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const handleCommandSelect = (cmd) => {
    if (cmd === 'boot') {
      setBootState('booting');
      return;
    }
    setActiveCommand(cmd);
  };

  const handleTriggerBoot = () => {
    setBootState('booting');
  };

  const handleBootComplete = () => {
    setBootState('ready');
    setActiveCommand('run guild.exe');
  };

  return (
    <div className="dev-guild-page">
      {/* Background Ambience: Technical Grid & Subtle Red Fabric Ribbon */}
      <div className="dev-background-grid" aria-hidden="true" />
      <div className="dev-ambient-ribbon" aria-hidden="true">
        <img
          src="/assets/dev-guild/textures/red-fabric-ribbon.svg"
          alt=""
          className="ribbon-svg"
        />
      </div>
      <div className="dev-atmospheric-glow" aria-hidden="true" />

      {/* 1. Header Navigation Strip / Breadcrumbs */}
      <nav className="dev-top-nav-strip section-shell" aria-label="Breadcrumb">
        <Link to="/working-guilds#devs-guild" className="dev-back-link">
          <span className="back-arrow" aria-hidden="true">←</span>
          <span>ALL WORKING GUILDS</span>
        </Link>
        <div className="dev-chapter-badge">
          CHAPTER 01 // 04 · FIRE DISCIPLINE
        </div>
      </nav>

      {/* 2. Hero Section: Editorial Headline (Left) & 3D Retro Computer (Right) */}
      <header className="dev-hero-section section-shell">
        <div className="dev-hero-composition">
          {/* Left Column: Monumental Editorial Typography */}
          <div className="dev-hero-left">
            <div className="dev-hero-chapter-tag">
              <span className="chapter-label">CHAPTER 01 // 04</span>
              <span className="chapter-divider" />
              <span className="discipline-label">SOFTWARE &amp; INFRASTRUCTURE</span>
            </div>

            <h1 className="dev-hero-title">
              DEV'S<br />
              <span className="title-italic-accent">GUILD.</span>
            </h1>

            <p className="dev-hero-statement">
              A software engineering and infrastructure community building reliable,
              scalable and impactful systems from first principles.
            </p>

            <div className="dev-hero-triad">
              <span className="triad-item">BUILD</span>
              <span className="triad-sep">/</span>
              <span className="triad-item">DEPLOY</span>
              <span className="triad-sep">/</span>
              <span className="triad-item">SCALE</span>
            </div>

            {/* Tactical Terminal HUD Controller */}
            <div className="dev-hero-hud-wrap">
              <TerminalHUD
                activeCommand={activeCommand}
                onExecuteCommand={handleCommandSelect}
                bootState={bootState}
                onTriggerBoot={handleTriggerBoot}
              />
            </div>

            <div className="dev-scroll-indicator" aria-hidden="true">
              <div className="scroll-mouse-icon">
                <span className="mouse-wheel-dot" />
              </div>
              <span className="scroll-text">SCROLL TO EXPLORE ARCHITECTURE</span>
            </div>
          </div>

          {/* Right Column: 3D Retro CRT Computer Workstation (45–55% width) */}
          <div className="dev-hero-right">
            <div className="retro-computer-stage-container">
              <RetroComputer3D
                activeCommand={activeCommand}
                onSelectCommand={handleCommandSelect}
                bootState={bootState}
                onBootComplete={handleBootComplete}
              />
              <div className="stage-caption-pill">
                <span className="caption-dot" />
                <span>INTERACTIVE 3D RETRO WORKSTATION · CLICK TO TOGGLE</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. The Disciplines: Technical Domains & Specialisations */}
      <TechnicalDomainsSection />

      {/* 4. The Process: From Idea to Impact */}
      <EngineeringPipelineSection />

      {/* 5. Featured Projects: Guild Builds */}
      <GuildBuildsSection />

      {/* 6. Stewardship & Leadership Council */}
      <DevLeadershipSection />
    </div>
  );
}
