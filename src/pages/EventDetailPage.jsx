import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import SectionLabel from '../components/SectionLabel';
import HalftonePattern from '../textures/HalftonePattern';
import { events } from '../data/eventsData';

export function EventDetailPage() {
  const { slug } = useParams();
  const event = events.find((e) => e.slug === slug);
  const [registered, setRegistered] = useState(false);

  if (!event) {
    return (
      <div className="section-shell" style={{ paddingTop: '80px', paddingBottom: '80px', textAlign: 'center' }}>
        <h1 className="section-title-editorial">Event Not Found</h1>
        <p>The requested event could not be found.</p>
        <Link to="/events" className="btn-editorial btn-editorial-crimson" style={{ marginTop: '20px' }}>
          Return to Events
        </Link>
      </div>
    );
  }

  const handleRegister = (e) => {
    e.preventDefault();
    setRegistered(true);
  };

  return (
    <div className="event-detail-page paper-grain" style={{ backgroundColor: 'var(--color-antique-parchment)', minHeight: '100vh' }}>
      <div className="section-shell" style={{ paddingTop: '32px', paddingBottom: 'clamp(56px, 8vw, 96px)' }}>
        <Breadcrumbs items={[{ label: 'EVENTS', to: '/events' }, { label: event.title.toUpperCase() }]} />

        {/* Poster Canvas Header */}
        <div
          className="editorial-card paper-grain"
          style={{
            backgroundColor: event.bgColor || 'var(--color-warm-ivory)',
            border: '2px solid var(--border-medium)',
            padding: 'clamp(28px, 5vw, 64px)',
            position: 'relative',
            marginBottom: '48px',
          }}
        >
          <HalftonePattern type="corner" position="br" color={event.accentColor === '#B31419' ? 'crimson' : 'black'} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', margin: '16px 0 24px' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: event.accentColor || 'var(--color-primary-crimson)', letterSpacing: '0.08em', fontWeight: 600, textTransform: 'uppercase' }}>
              {event.type}
            </span>
            <span
              style={{
                padding: '4px 12px',
                backgroundColor: 'var(--color-soft-cream)',
                border: '1px solid var(--border-medium)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--color-ink-dark)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {event.status === 'UPCOMING' ? '● Registration Open' : 'Past Event'}
            </span>
          </div>

          {/* Poster Giant Typography */}
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
              lineHeight: 1.05,
              fontWeight: 400,
              color: 'var(--color-ink-dark)',
              marginBottom: '16px',
            }}
          >
            {(() => {
              const words = event.title.split(' ');
              if (words.length <= 1) return event.title;
              const last = words.pop();
              return (
                <>
                  {words.join(' ')} <em style={{ fontStyle: 'italic', color: 'var(--color-primary-crimson)' }}>{last}</em>
                </>
              );
            })()}
          </h1>

          <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', color: 'var(--color-ink-charcoal)', marginBottom: '28px', maxWidth: '850px' }}>
            {event.subtitle}
          </div>

          {/* Quick Meta Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              padding: '20px',
              backgroundColor: 'var(--color-antique-parchment)',
              border: '1px solid var(--border-medium)',
              marginBottom: '36px',
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', color: 'var(--color-ink-charcoal)', textTransform: 'uppercase', fontWeight: 600 }}>Date</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-ink-dark)' }}>{event.date}</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', color: 'var(--color-ink-charcoal)', textTransform: 'uppercase', fontWeight: 600 }}>Time</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--color-ink-dark)', fontWeight: 500 }}>{event.time}</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', color: 'var(--color-ink-charcoal)', textTransform: 'uppercase', fontWeight: 600 }}>Venue</div>
              <div style={{ fontSize: '0.9375rem', color: 'var(--color-ink-dark)' }}>{event.venue}</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', color: 'var(--color-ink-charcoal)', textTransform: 'uppercase', fontWeight: 600 }}>Capacity</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--color-primary-crimson)', fontWeight: 600 }}>{event.capacity}</div>
            </div>
          </div>

          {/* Poster Artwork Embed */}
          <div style={{ maxHeight: '420px', overflow: 'hidden', border: '1px solid var(--border-medium)', backgroundColor: 'var(--color-soft-cream)', marginBottom: '36px' }}>
            <img
              src={event.image}
              alt={event.alt || event.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <p style={{ fontSize: '1.15rem', lineHeight: 1.75, color: 'var(--color-ink-charcoal)', maxWidth: '900px', marginBottom: '32px' }}>
            {event.fullDesc}
          </p>
        </div>

        {/* Schedule & Mentors Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', marginBottom: '48px' }}>
          {/* Detailed Schedule Timeline */}
          <div className="editorial-card" style={{ backgroundColor: 'var(--color-warm-ivory)', border: '1px solid var(--border-medium)', padding: '32px' }}>
            <SectionLabel>ITINERARY &amp; PHASES</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 400, color: 'var(--color-ink-dark)', marginBottom: '24px' }}>
              The Session Progression
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {event.schedule.map((item, idx) => (
                <div key={idx} style={{ borderLeft: '2px solid var(--color-primary-crimson)', paddingLeft: '16px' }}>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--color-primary-crimson)', fontWeight: 600 }}>
                    {item.time}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 500, color: 'var(--color-ink-dark)', margin: '4px 0' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.55, color: 'var(--color-ink-charcoal)' }}>
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Prerequisites & Mentors */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div className="editorial-card" style={{ backgroundColor: 'var(--color-warm-ivory)', border: '1px solid var(--border-medium)', padding: '28px' }}>
              <SectionLabel>TECHNICAL PREREQUISITES</SectionLabel>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 400, color: 'var(--color-ink-dark)', marginBottom: '16px' }}>
                What you need before attending:
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {event.prerequisites.map((req, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '10px', fontSize: '0.9375rem', color: 'var(--color-ink-charcoal)' }}>
                    <span style={{ color: 'var(--color-primary-crimson)' }}>✦</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="editorial-card" style={{ backgroundColor: 'var(--color-warm-ivory)', border: '1px solid var(--border-medium)', padding: '28px' }}>
              <SectionLabel>MENTORS &amp; SPEAKERS</SectionLabel>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 400, color: 'var(--color-ink-dark)', marginBottom: '16px' }}>
                Guiding this gathering:
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {event.mentors.map((m, idx) => (
                  <div key={idx} style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '10px' }}>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-ink-dark)' }}>
                      {m.name}
                    </div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--color-ink-charcoal)' }}>
                      {m.affiliation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Registration Box */}
        {event.status === 'UPCOMING' ? (
          <div
            className="editorial-card paper-grain"
            style={{
              backgroundColor: 'var(--color-warm-ivory)',
              border: '2px solid var(--color-primary-crimson)',
              padding: 'clamp(28px, 5vw, 48px)',
              maxWidth: '780px',
              margin: '0 auto',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <SectionLabel>RESERVE YOUR POSITION</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', fontWeight: 400, color: 'var(--color-ink-dark)', marginBottom: '10px' }}>
                Register for {event.title}
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-ink-charcoal)' }}>
                Admission is open for all current HBTU students. Seats are allocated on a first-come basis.
              </p>
            </div>

            {!registered ? (
              <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--color-ink-dark)', fontWeight: 600 }}>
                    <span>STUDENT FULL NAME *</span>
                    <input required type="text" placeholder="e.g. Aditi Sharma" style={{ padding: '12px', border: '1px solid var(--border-medium)', backgroundColor: 'var(--color-antique-parchment)' }} />
                  </label>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--color-ink-dark)', fontWeight: 600 }}>
                    <span>HBTU EMAIL ADDRESS *</span>
                    <input required type="email" placeholder="rollno@hbtu.ac.in" style={{ padding: '12px', border: '1px solid var(--border-medium)', backgroundColor: 'var(--color-antique-parchment)' }} />
                  </label>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--color-ink-dark)', fontWeight: 600 }}>
                    <span>ACADEMIC YEAR &amp; BRANCH *</span>
                    <select required style={{ padding: '12px', border: '1px solid var(--border-medium)', backgroundColor: 'var(--color-antique-parchment)' }}>
                      <option value="1st-cse">1st Year · CSE</option>
                      <option value="1st-it">1st Year · IT</option>
                      <option value="2nd-cse">2nd Year · CSE</option>
                      <option value="2nd-it">2nd Year · IT</option>
                      <option value="3rd-cse">3rd Year · CSE</option>
                      <option value="3rd-it">3rd Year · IT</option>
                      <option value="4th-cse">4th Year · CSE</option>
                      <option value="4th-it">4th Year · IT</option>
                      <option value="other">Other HBTU Department</option>
                    </select>
                  </label>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--color-ink-dark)', fontWeight: 600 }}>
                    <span>GITHUB / PORTFOLIO URL</span>
                    <input type="url" placeholder="https://github.com/username" style={{ padding: '12px', border: '1px solid var(--border-medium)', backgroundColor: 'var(--color-antique-parchment)' }} />
                  </label>
                </div>

                <button type="submit" className="btn-editorial btn-editorial-crimson magnetic" style={{ padding: '14px', width: '100%', marginTop: '10px' }}>
                  <span>Submit Registration</span>
                  <span>↗</span>
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '30px', backgroundColor: 'var(--color-antique-parchment)', border: '1px solid var(--border-medium)' }}>
                <span style={{ fontSize: '32px', color: 'var(--color-primary-crimson)' }}>✓</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginTop: '10px', color: 'var(--color-ink-dark)' }}>Registration Confirmed</h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--color-ink-charcoal)', marginTop: '8px' }}>
                  Your registration for {event.title} has been received. Check your HBTU email for event updates.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '36px', borderTop: '1px solid var(--border-medium)' }}>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--color-ink-charcoal)' }}>
              This event took place on {event.date}.
            </div>
            <Link to="/events" className="btn-editorial btn-editorial-outline" style={{ marginTop: '16px' }}>
              <span>View All Events</span>
              <span>↗</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventDetailPage;
