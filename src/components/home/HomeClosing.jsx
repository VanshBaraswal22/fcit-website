import React from 'react';
import { Link } from 'react-router-dom';
import SectionLabel from '../SectionLabel';

export default function HomeClosing() {
  return (
    <section className="home-closing-section" id="closing">
      <div className="home-closing-shell">
        <div className="home-closing-eyebrow">
          <SectionLabel light>FRATERNITY OF COMPUTER SCIENCE &amp; IT</SectionLabel>
        </div>

        <h2 className="home-closing-title">
          <span className="home-closing-line">THE FUTURE IS</span>
          <span className="home-closing-line"><em>BUILT TOGETHER.</em></span>
        </h2>

        <p className="home-closing-lead">
          Explore a community where curiosity becomes capability and ideas become meaningful work.
        </p>

        {/* Primary and Secondary Action Buttons */}
        <div className="home-closing-actions">
          <Link to="/projects" className="home-cta-gold">
            <span>Explore Our Work</span>
            <span aria-hidden="true">↗</span>
          </Link>
          <Link to="/about" className="home-cta-outline-light">
            <span>Discover FCIT</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Institutional Signature */}
        <div className="home-closing-signature">
          <img
            src="/images/fcit-logo-circle-512.png"
            alt="FCIT Crest"
            className="home-closing-seal"
            width="64"
            height="64"
            loading="lazy"
          />
          <div className="home-closing-sig-meta">
            <span className="home-closing-sig-name">Fraternity of Computer Science and Information Technology</span>
            <span className="home-closing-sig-affil">Department of Computer Science &amp; Engineering · Harcourt Butler Technical University, Kanpur</span>
          </div>
        </div>
      </div>
    </section>
  );
}
