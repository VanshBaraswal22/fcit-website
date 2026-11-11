import React, { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import SectionLabel from '../components/SectionLabel';
import EventPosterCard from '../components/EventPosterCard';
import { events } from '../data/eventsData';

export function EventsPage() {
  const [filter, setFilter] = useState('ALL');

  const filteredEvents = events.filter((ev) => {
    if (filter === 'ALL') return true;
    if (filter === 'UPCOMING') return ev.status === 'UPCOMING';
    if (filter === 'PAST') return ev.status === 'PAST';
    if (filter === 'HACKATHONS') return ev.type.includes('HACKATHON');
    if (filter === 'WORKSHOPS') return ev.type.includes('WORKSHOP');
    return true;
  });

  return (
    <div className="events-page paper-grain" style={{ backgroundColor: 'var(--color-antique-parchment)', minHeight: '100vh' }}>
      <div className="section-shell" style={{ paddingTop: '32px', paddingBottom: 'clamp(56px, 8vw, 96px)' }}>
        <Breadcrumbs items={[{ label: 'EVENTS' }]} />

        {/* Header */}
        <div style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          <SectionLabel>GATHERINGS &amp; SPRINTS</SectionLabel>

          <h1
            className="section-title-editorial"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5rem)', lineHeight: 1.05, maxWidth: '980px', marginBottom: '20px' }}
          >
            WHERE IDEAS <em>COME TOGETHER.</em>
          </h1>

          <p className="section-lead-editorial" style={{ maxWidth: '820px' }}>
            From 36-hour unbroken build nights to rigorous kernel architecture workshops and collegiate algorithmic battles. Explore our active calendar and past gathering records.
          </p>
        </div>

        {/* Filter Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            borderBottom: '2px solid var(--border-medium)',
            paddingBottom: '16px',
            marginBottom: '44px',
          }}
        >
          {['ALL', 'UPCOMING', 'PAST', 'HACKATHONS', 'WORKSHOPS'].map((category) => {
            const isSelected = filter === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                style={{
                  padding: '8px 16px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  border: isSelected ? '1px solid var(--color-primary-crimson)' : '1px solid var(--border-light)',
                  backgroundColor: isSelected ? 'var(--color-primary-crimson)' : 'var(--color-warm-ivory)',
                  color: isSelected ? 'var(--color-warm-ivory)' : 'var(--color-ink-dark)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{category}</span>
              </button>
            );
          })}
        </div>

        {/* Poster Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px' }}>
          {filteredEvents.map((event, idx) => (
            <EventPosterCard key={event.slug} event={event} featured={idx === 0 && filter === 'ALL'} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
