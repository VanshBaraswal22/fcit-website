import React, { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import SectionLabel from '../components/SectionLabel';
import PrintRegistrationMarks from '../textures/PrintRegistrationMarks';
import HalftonePattern from '../textures/HalftonePattern';
import { useLightbox } from '../layouts/RootLayout';
import { galleryItems } from '../data/galleryData';

export function GalleryPage() {
  const { openLightbox } = useLightbox();
  const [filter, setFilter] = useState('ALL');

  const filteredItems = galleryItems.filter((item) => {
    if (filter === 'ALL') return true;
    if (filter === 'CAMPUS') return item.category.includes('CAMPUS');
    if (filter === 'BUILD NIGHTS') return item.category.includes('BUILD') || item.category.includes('HACKATHON');
    if (filter === 'SYSTEMS LAB') return item.category.includes('SYSTEMS') || item.category.includes('RESEARCH');
    if (filter === 'COMMONS') return item.category.includes('COMMONS') || item.category.includes('COLLOQUIA') || item.category.includes('CRAFT');
    return true;
  });

  return (
    <div className="gallery-page paper-grain" style={{ backgroundColor: 'var(--color-antique-parchment)', minHeight: '100vh' }}>
      <div className="section-shell" style={{ paddingTop: '32px', paddingBottom: 'clamp(56px, 8vw, 96px)' }}>
        <Breadcrumbs items={[{ label: 'VISUAL NOTEBOOK & PLATES' }]} />

        {/* Masthead Header */}
        <div style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          <PrintRegistrationMarks folio="PLATE-ARCHIVE / 8 PLATES DOCUMENTED" />
          <SectionLabel number="09">THE ARCHIVAL NOTEBOOK</SectionLabel>

          <h1
            className="section-title-editorial"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5rem)', lineHeight: 1.05, maxWidth: '1000px', marginBottom: '20px' }}
          >
            The photographic plates and visual <em>records.</em>
          </h1>

          <p className="section-lead-editorial" style={{ maxWidth: '820px' }}>
            A curated visual archive documenting life within the computing labs of HBTU Kanpur: screen-printed event posters, candid midnight build sessions, collegiate architecture, and hardware diagnostic rigs. Click any folio plate to view high-resolution details and archival provenance.
          </p>
        </div>

        {/* Filter Navigation */}
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
          {['ALL', 'CAMPUS', 'BUILD NIGHTS', 'SYSTEMS LAB', 'COMMONS'].map((cat) => {
            const isSelected = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                style={{
                  padding: '8px 16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  border: isSelected ? '1px solid var(--color-crimson-red)' : '1px solid var(--border-light)',
                  backgroundColor: isSelected ? 'var(--color-crimson-red)' : 'var(--color-warm-ivory)',
                  color: isSelected ? 'var(--color-warm-ivory)' : 'var(--color-carbon-black)',
                  cursor: 'pointer',
                  fontWeight: isSelected ? 600 : 400,
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Asymmetric Gallery Grid */}
        <div className="editorial-gallery-grid">
          {filteredItems.map((item, index) => {
            // Asymmetric layout logic for rhythmic magazine feel
            let spanClass = 'gallery-span-6';
            if (index % 5 === 0) spanClass = 'gallery-span-8';
            else if (index % 5 === 1) spanClass = 'gallery-span-4';
            else if (index % 5 === 2) spanClass = 'gallery-span-4';
            else if (index % 5 === 3) spanClass = 'gallery-span-4';
            else if (index % 5 === 4) spanClass = 'gallery-span-4';

            return (
              <article
                key={item.id}
                className={`editorial-card reveal ${spanClass}`}
                style={{
                  minHeight: '320px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  backgroundColor: 'var(--color-warm-ivory)',
                  border: '1px solid var(--border-medium)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
                onClick={() => openLightbox(item)}
              >
                <HalftonePattern type="corner" position="br" color="crimson" />

                <img
                  src={item.image}
                  alt={item.alt}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: item.tone === 'duotone-crimson'
                      ? 'contrast(130%) grayscale(40%)'
                      : item.tone === 'monochrome'
                      ? 'grayscale(100%) contrast(120%)'
                      : 'contrast(120%) grayscale(15%)',
                    transition: 'transform 0.6s ease',
                  }}
                  loading="lazy"
                />

                {/* Scrim Overlay & Archival Tag */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    padding: '24px',
                    background: 'linear-gradient(transparent, rgba(8, 7, 6, 0.92) 65%)',
                    color: 'var(--color-warm-ivory)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--color-heritage-gold)', letterSpacing: '0.14em' }}>
                      {item.plate} · {item.category}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--color-crimson-red)', fontWeight: 600 }}>
                      ⌕ INSPECT
                    </span>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 500, color: 'var(--color-warm-ivory)' }}>
                    {item.title}
                  </h3>

                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'rgba(255, 248, 232, 0.7)' }}>
                    {item.location} · {item.year}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GalleryPage;
