import React, { useEffect } from 'react';
import PrintRegistrationMarks from '../textures/PrintRegistrationMarks';
import Stamp from '../textures/Stamp';

export function GalleryLightbox({ item, onClose }) {
  useEffect(() => {
    if (!item) return undefined;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.classList.add('modal-open');
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.classList.remove('modal-open');
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="lightbox-dialog paper-grain"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-title"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--border-medium)', paddingBottom: '10px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-crimson-red)', letterSpacing: '0.14em' }}>
            {item.plate || 'ARCHIVE PLATE'} · {item.category || 'VISUAL NOTEBOOK'}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close lightbox"
            style={{
              width: '32px',
              height: '32px',
              border: '1px solid var(--border-medium)',
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--color-warm-ivory)',
            }}
          >
            ×
          </button>
        </div>

        <figure style={{ margin: 0 }}>
          <div style={{ maxHeight: '60vh', overflow: 'hidden', border: '1px solid var(--border-light)', backgroundColor: 'var(--color-soft-cream)' }}>
            <img
              src={item.image}
              alt={item.alt || item.title}
              style={{ width: '100%', height: '100%', objectFit: 'contain', maxHeight: '60vh' }}
            />
          </div>
          <figcaption style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 id="lightbox-title" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 500, color: 'var(--color-carbon-black)' }}>
              {item.title}
            </h3>
            {item.subtitle && (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-graphite)' }}>
                {item.subtitle}
              </div>
            )}
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-charcoal)', lineHeight: 1.6 }}>
              {item.caption}
            </p>
            {item.archivalNote && (
              <small style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--color-crimson-red)', opacity: 0.9 }}>
                ✦ {item.archivalNote}
              </small>
            )}
          </figcaption>
        </figure>

        <div style={{ marginTop: '16px', borderTop: '1px solid var(--border-light)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <PrintRegistrationMarks folio={item.folio || 'FOLIO-ARCHIVE'} showSwatches={false} />
          <Stamp text="FCIT ARCHIVE" subtext="HBTU KANPUR" variant="crimson" rotate="0deg" />
        </div>
      </div>
    </div>
  );
}

export default GalleryLightbox;
