import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionLabel from '../SectionLabel';
import { events } from '../../data/eventsData';

export default function HomeEvents() {
  const [activeTab, setActiveTab] = useState('ALL');

  // Filter out any hackathons from past events to strictly adhere to the prompt rule:
  // "FCIT has conducted workshops and other events. Hackathons are a future initiative and have not yet been organised by FCIT."
  const verifiedEvents = events.filter((ev) => ev.slug !== 'night-of-making-2025');

  const upcomingList = verifiedEvents.filter((e) => e.status === 'UPCOMING');
  const pastList = verifiedEvents.filter((e) => e.status === 'PAST');

  return (
    <section className="home-events-section" id="events">
      <div className="home-section-shell">
        <div className="home-section-header">
          <div className="home-section-title-wrap">
            <SectionLabel>GATHERINGS &amp; PRACTICUMS</SectionLabel>
            <h2 className="home-editorial-heading">
              WHERE IDEAS <em>COME TOGETHER.</em>
            </h2>
            <p className="home-section-desc">
              From low-level memory laboratories to competitive programming duels, explore workshops and technical sessions hosted at Harcourt Butler Technical University.
            </p>
          </div>

          <div className="home-events-actions">
            <div className="home-tab-controls" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'ALL'}
                className={`home-filter-pill ${activeTab === 'ALL' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('ALL')}
              >
                All Gatherings
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'UPCOMING'}
                className={`home-filter-pill ${activeTab === 'UPCOMING' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('UPCOMING')}
              >
                Upcoming Workshops
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'PAST'}
                className={`home-filter-pill ${activeTab === 'PAST' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('PAST')}
              >
                Conducted Sessions
              </button>
            </div>

            <Link to="/events" className="home-cta-secondary">
              <span>Explore All Events</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        {/* Events Grid */}
        <div className="home-events-grid">
          {/* Upcoming Section */}
          {(activeTab === 'ALL' || activeTab === 'UPCOMING') && (
            <>
              {upcomingList.map((ev) => (
                <article key={ev.slug} className="home-event-card is-upcoming">
                  <div className="home-event-card-header">
                    <span className="home-event-type-badge">{ev.badge || ev.type}</span>
                    <span className="home-event-date-chip">{ev.date}</span>
                  </div>

                  <div className="home-event-image-wrap">
                    <img
                      src={ev.image}
                      alt={ev.alt || ev.title}
                      className="home-event-thumbnail"
                      loading="lazy"
                      width="480"
                      height="260"
                    />
                  </div>

                  <div className="home-event-content">
                    <h3 className="home-event-title">{ev.title}</h3>
                    <div className="home-event-venue">
                      📍 {ev.venue}
                    </div>
                    <p className="home-event-desc">{ev.shortDesc}</p>

                    <div className="home-event-card-footer">
                      <span className="home-event-reg-chip">{ev.registrationStatus || 'ACTIVE'}</span>
                      <Link to={`/events/${ev.slug}`} className="home-event-link">
                        <span>Details &amp; Schedule</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}

              {/* RESERVED CONTENT SLOT FOR FUTURE HACKATHONS */}
              <article className="home-event-card home-reserved-slot">
                <div className="home-event-card-header">
                  <span className="home-reserved-badge">FUTURE INITIATIVE</span>
                  <span className="home-event-date-chip">TO BE ANNOUNCED</span>
                </div>

                <div className="home-reserved-visual">
                  <div className="home-reserved-icon">⚡</div>
                  <span className="home-reserved-tag">RESERVED FOR FUTURE INITIATIVES</span>
                </div>

                <div className="home-event-content">
                  <h3 className="home-event-title">Flagship 36-Hour Hackathon</h3>
                  <div className="home-event-venue">
                    📍 East Campus Computing Labs · HBTU Kanpur
                  </div>
                  <p className="home-event-desc">
                    Hackathons are an upcoming flagship initiative currently being designed for future academic sessions. Official dates and inter-collegiate prompts will be formally announced when preparations conclude.
                  </p>

                  <div className="home-event-card-footer">
                    <span className="home-reserved-notice">Not Yet Conducted</span>
                    <Link to="/about" className="home-event-link">
                      <span>Stay Informed</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            </>
          )}

          {/* Past Conducted Events Section */}
          {(activeTab === 'ALL' || activeTab === 'PAST') && (
            <>
              {pastList.map((ev) => (
                <article key={ev.slug} className="home-event-card is-past">
                  <div className="home-event-card-header">
                    <span className="home-event-type-badge">{ev.badge || ev.type}</span>
                    <span className="home-event-date-chip">{ev.date}</span>
                  </div>

                  <div className="home-event-image-wrap">
                    <img
                      src={ev.image}
                      alt={ev.alt || ev.title}
                      className="home-event-thumbnail"
                      loading="lazy"
                      width="480"
                      height="260"
                    />
                  </div>

                  <div className="home-event-content">
                    <h3 className="home-event-title">{ev.title}</h3>
                    <div className="home-event-venue">
                      📍 {ev.venue}
                    </div>
                    <p className="home-event-desc">{ev.shortDesc}</p>

                    <div className="home-event-card-footer">
                      <span className="home-past-chip">COMPLETED SESSION</span>
                      <Link to={`/events/${ev.slug}`} className="home-event-link">
                        <span>Event Archive</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
