import React from 'react';
import { Link } from 'react-router-dom';
import HalftonePattern from '../textures/HalftonePattern';

export function EventPosterCard({ event, featured = false }) {
  return (
    <article
      className={`editorial-card event-poster-card reveal ${featured ? 'event-poster-card--featured' : ''}`}
      style={{
        backgroundColor: event.bgColor || 'var(--color-warm-ivory)',
        border: '1px solid var(--border-medium)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <HalftonePattern type="corner" position="br" color={event.accentColor === '#B31419' ? 'crimson' : 'black'} />

      {/* Poster Topline Header */}
      <div
        style={{
          padding: '14px 20px',
          borderBottom: '1px solid var(--border-medium)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.75rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          backgroundColor: 'rgba(41, 40, 39, 0.03)',
        }}
      >
        <span style={{ color: event.accentColor || 'var(--color-primary-crimson)', fontWeight: 600 }}>
          {event.type}
        </span>
        <span style={{ color: 'var(--color-ink-charcoal)', fontWeight: 500 }}>
          {event.status === 'UPCOMING' ? '● Registration Open' : 'Past Event'}
        </span>
      </div>

      {/* Poster Visual Artwork Area */}
      <div
        style={{
          position: 'relative',
          height: featured ? '300px' : '200px',
          overflow: 'hidden',
          backgroundColor: 'var(--color-antique-parchment)',
          borderBottom: '1px solid var(--border-medium)',
        }}
      >
        <img
          src={event.image}
          alt={event.alt || event.title}
          className="image-unmask"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'contrast(115%)',
            transition: 'transform 0.6s ease',
          }}
          loading="lazy"
        />
      </div>

      {/* Poster Typographic Core */}
      <div style={{ padding: '24px 22px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', letterSpacing: '0.06em', color: event.accentColor || 'var(--color-primary-crimson)', marginBottom: '8px', fontWeight: 600 }}>
            {event.date}
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: featured ? '1.85rem' : '1.35rem',
              fontWeight: 500,
              lineHeight: 1.2,
              color: 'var(--color-ink-dark)',
              marginBottom: '10px',
            }}
          >
            {event.title}
          </h3>

          <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: 'var(--color-ink-charcoal)', marginBottom: '18px' }}>
            {event.shortDesc}
          </p>
        </div>

        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px', marginTop: '12px' }}>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--color-ink-charcoal)', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div><strong>Venue:</strong> {event.venue}</div>
            <div><strong>Time:</strong> {event.time}</div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Link
              to={`/events/${event.slug}`}
              className="btn-editorial btn-editorial-crimson"
              style={{ padding: '10px 18px', fontSize: '0.8125rem', flexGrow: 1 }}
            >
              <span>View Event Details</span>
              <span>↗</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default EventPosterCard;
