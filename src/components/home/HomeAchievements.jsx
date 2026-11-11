import React from 'react';
import { Link } from 'react-router-dom';
import SectionLabel from '../SectionLabel';
import { achievements } from '../../data/achievementsData';

export default function HomeAchievements() {
  return (
    <section className="home-achievements-section" id="achievements">
      <div className="home-section-shell">
        <div className="home-section-header">
          <div className="home-section-title-wrap">
            <SectionLabel>ACHIEVEMENTS &amp; RECOGNITION</SectionLabel>
            <h2 className="home-editorial-heading">
              MILESTONES <em>WORTH REMEMBERING.</em>
            </h2>
            <p className="home-section-desc">
              Authentic collegiate honors, competitive programming qualifications, national podium finishes, and open-source fellowships earned by HBTU students.
            </p>
          </div>

          <div>
            <Link to="/achievements" className="home-cta-secondary">
              <span>View All Achievements</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <div className="home-achievements-grid">
          {achievements.map((ach) => (
            <article key={ach.id} className="home-achievement-card">
              <div className="home-achievement-top">
                <span className="home-achievement-num">{ach.number}</span>
                <span className="home-achievement-badge">{ach.badge}</span>
                <span className="home-achievement-year">{ach.year}</span>
              </div>

              <div className="home-achievement-citation">
                {ach.citation}
              </div>

              <h3 className="home-achievement-title">{ach.title}</h3>

              <div className="home-achievement-meta-row">
                <span className="home-achievement-team">👥 {ach.teamLabel}</span>
                <span className="home-achievement-date">📅 {ach.date}</span>
              </div>

              <p className="home-achievement-summary">{ach.summary}</p>

              {ach.impact && (
                <div className="home-achievement-impact-box">
                  <strong>Impact:</strong> {ach.impact}
                </div>
              )}

              <div className="home-achievement-footer">
                <span className="home-achievement-domain">{ach.domain}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
