import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionLabel from '../SectionLabel';
import { announcements } from '../../data/announcementsData';

export default function HomeAnnouncements() {
  const [filter, setFilter] = useState('ALL');

  const categories = ['ALL', 'IMPORTANT', 'WORKSHOP REGISTRATION', 'TECHNICAL SESSION'];

  const filteredAnnouncements = announcements.filter((item) => {
    if (filter === 'ALL') return true;
    if (filter === 'IMPORTANT') return item.status === 'IMPORTANT' || item.isPinned;
    return item.category === filter;
  });

  return (
    <section className="home-announcements-section" id="announcements">
      <div className="home-section-shell">
        <div className="home-section-header">
          <div className="home-section-title-wrap">
            <SectionLabel>OFFICIAL DISPATCHES &amp; NOTICES</SectionLabel>
            <h2 className="home-editorial-heading">
              WHAT'S HAPPENING <em>AT FCIT?</em>
            </h2>
            <p className="home-section-desc">
              Official circulars, workshop registrations, seasonal technical symposiums, and annual student membership announcements from the Department of CSE.
            </p>
          </div>

          <div className="home-announcements-filters" role="tablist" aria-label="Announcement filters">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={filter === cat}
                className={`home-filter-pill ${filter === cat ? 'is-active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredAnnouncements.length > 0 ? (
          <div className="home-announcements-grid">
            {filteredAnnouncements.map((ann) => (
              <article key={ann.id} className={`home-announcement-card ${ann.status === 'IMPORTANT' ? 'is-important' : ''}`}>
                <div className="home-announcement-meta">
                  <span className={`home-badge-status ${ann.status.toLowerCase()}`}>
                    {ann.status}
                  </span>
                  <span className="home-announcement-category">{ann.category}</span>
                  <span className="home-announcement-date">📅 {ann.publishDate}</span>
                </div>

                <h3 className="home-announcement-title">{ann.title}</h3>
                <p className="home-announcement-desc">{ann.shortDesc}</p>

                <div className="home-announcement-footer">
                  {ann.expiryDate && (
                    <span className="home-announcement-deadline">
                      Deadline: <strong>{ann.expiryDate}</strong>
                    </span>
                  )}
                  {ann.url ? (
                    <Link to={ann.url} className="home-announcement-link">
                      <span>{ann.linkText || 'Read Notice'}</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  ) : (
                    <span className="home-announcement-status-text">Official Notification</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="home-empty-state">
            <div className="home-empty-icon">📜</div>
            <h4 className="home-empty-title">No Active Notices In This Category</h4>
            <p className="home-empty-desc">
              There are currently no additional notices scheduled under this filter. Check back during upcoming academic terms or view all circulars.
            </p>
            <button type="button" className="home-cta-secondary" onClick={() => setFilter('ALL')}>
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
