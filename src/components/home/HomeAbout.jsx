import React from 'react';
import { Link } from 'react-router-dom';
import SectionLabel from '../SectionLabel';

export default function HomeAbout() {
  return (
    <section className="home-about-section" id="about">
      <div className="home-section-shell">
        <div className="home-about-grid">
          {/* Left Column: Vision & Identity */}
          <div className="home-about-text-col">
            <SectionLabel>ORGANISATIONAL IDENTITY &amp; PURPOSE</SectionLabel>

            <h2 className="home-editorial-heading">
              BEYOND CLASSROOMS. <br />
              <em>BEYOND CONVENTIONAL LEARNING.</em>
            </h2>

            <div className="home-about-vision-box">
              <blockquote className="home-about-vision-quote">
                “To create an environment where learning extends beyond classrooms and syllabi. Through technical events, workshops, coding contests, discussions and collaborative initiatives, FCIT seeks to encourage skill development, critical thinking and practical exposure. We strive to promote awareness around emerging technologies, career pathways and industry expectations while maintaining academic integrity and inclusivity.”
              </blockquote>
            </div>

            <div className="home-about-body-text">
              <p>
                <strong>The Fraternity of Computer Science and Information Technology (FCIT)</strong> is the student-led technical society of the Department of Computer Science and Engineering at Harcourt Butler Technical University (HBTU), Kanpur.
              </p>
              <p>
                FCIT brings together students, alumni and professors associated with Computer Science and Information Technology, encouraging knowledge exchange, mentorship, collaboration and collective technical growth.
              </p>
            </div>

            {/* Founding Story Slot */}
            <div className="home-about-history-slot">
              <div className="home-about-history-tag">
                <span>FOUNDING HERITAGE</span>
              </div>
              <p className="home-about-history-desc">
                Conceived within the historic brick quadrangles of HBTU East Campus, FCIT was established as an autonomous collaborative nexus to empower undergraduate computer scientists. Through student-led working guilds, peer research salons, and production software initiatives, the fraternity continues a century-long legacy of engineering diligence.
              </p>
            </div>

            <div className="home-about-action-row">
              <Link to="/about" className="home-cta-primary">
                <span>Explore Full About Page</span>
                <span aria-hidden="true">↗</span>
              </Link>
              <a href="#guilds" className="home-cta-secondary">
                <span>View Working Guilds</span>
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          {/* Right Column: Architectural Photography & Institutional Card */}
          <div className="home-about-visual-col">
            <div className="home-about-image-card">
              <div className="home-about-image-frame">
                <img
                  src="/images/cse-department-building.jpg"
                  alt="Department of Computer Science & Engineering Building, Harcourt Butler Technical University, East Campus"
                  className="home-about-photo"
                  loading="lazy"
                  width="600"
                  height="420"
                />
                <div className="home-about-image-overlay">
                  <span className="home-about-stamp">EST. 1921 · HBTU KANPUR</span>
                </div>
              </div>

              <div className="home-about-card-caption">
                <div className="home-about-caption-header">
                  <span className="home-about-caption-dept">Department of Computer Science &amp; Engineering</span>
                  <span className="home-about-caption-loc">East Campus · Nawabganj</span>
                </div>
                <p className="home-about-caption-p">
                  Harcourt Butler Technical University provides the academic bedrock and physical research laboratories where FCIT students organize hands-on technical labs and develop open-source systems.
                </p>
              </div>

              {/* Technical Pillars Summary Strip */}
              <div className="home-about-pillars-grid">
                <div className="home-about-pillar">
                  <span className="home-pillar-num">01</span>
                  <span className="home-pillar-title">Technical Rigor</span>
                  <span className="home-pillar-sub">Practical software &amp; machine learning</span>
                </div>
                <div className="home-about-pillar">
                  <span className="home-pillar-num">02</span>
                  <span className="home-pillar-title">Peer Pedagogy</span>
                  <span className="home-pillar-sub">Senior mentorship &amp; knowledge exchange</span>
                </div>
                <div className="home-about-pillar">
                  <span className="home-pillar-num">03</span>
                  <span className="home-pillar-title">Selective Cohort</span>
                  <span className="home-pillar-sub">Annual merit-based selection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
