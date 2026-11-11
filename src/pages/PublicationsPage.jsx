import React, { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import SectionLabel from '../components/SectionLabel';
import Stamp from '../textures/Stamp';
import PrintRegistrationMarks from '../textures/PrintRegistrationMarks';
import HalftonePattern from '../textures/HalftonePattern';
import { publications } from '../data/publicationsData';

export function PublicationsPage() {
  const [selectedTract, setSelectedTract] = useState(null);

  return (
    <div className="publications-page paper-grain" style={{ backgroundColor: 'var(--color-antique-parchment)', minHeight: '100vh' }}>
      <div className="section-shell" style={{ paddingTop: '32px', paddingBottom: 'clamp(56px, 8vw, 96px)' }}>
        <Breadcrumbs items={[{ label: 'TECHNICAL JOURNAL' }]} />

        {/* Masthead Header */}
        <div style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          <PrintRegistrationMarks folio="GAZETTE-MONOGRAPHS / ISSN 2025-FCIT" />
          <SectionLabel number="07">THE EDITORIAL GAZETTE</SectionLabel>

          <h1
            className="section-title-editorial"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5rem)', lineHeight: 1.05, maxWidth: '1000px', marginBottom: '20px' }}
          >
            Tracts, treatises and technical <em>inquiries.</em>
          </h1>

          <p className="section-lead-editorial" style={{ maxWidth: '820px' }}>
            The official academic and engineering journal of the FCIT working groups. We publish deep-dive analyses on browser rendering internals, Raft consensus, attention geometry, systems debugging with eBPF, and the philosophy of digital craftsmanship.
          </p>
        </div>

        {/* Editorial Journal Masthead Box */}
        <div
          className="editorial-card paper-grain"
          style={{
            backgroundColor: 'var(--color-warm-ivory)',
            border: '2px solid var(--border-medium)',
            padding: '24px 32px',
            marginBottom: '48px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.14em', color: 'var(--color-crimson-red)', fontWeight: 600 }}>
              FCIT TECHNICAL MONOGRAPH SERIES · CURRENT VOLUME IV
            </span>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-carbon-black)', marginTop: '4px' }}>
              Edited by the Student Technical Council &amp; Faculty Advisory Group, HBTU Kanpur
            </div>
          </div>
          <Stamp text="PEER REVIEWED" subtext="DEPARTMENT ARCHIVE" variant="crimson" rotate="0deg" />
        </div>

        {/* Journal Entries Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          {publications.map((pub) => (
            <article
              key={pub.id}
              className="editorial-card paper-grain"
              style={{
                backgroundColor: 'var(--color-warm-ivory)',
                border: '1px solid var(--border-medium)',
                padding: 'clamp(28px, 5vw, 44px)',
                position: 'relative',
              }}
            >
              <HalftonePattern type="corner" position="br" color="crimson" />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid var(--border-light)', paddingBottom: '14px', marginBottom: '20px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-crimson-red)', letterSpacing: '0.14em', fontWeight: 600 }}>
                  {pub.issue} · {pub.volume} · {pub.category}
                </span>
                <div style={{ display: 'flex', gap: '16px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-graphite)' }}>
                  <span>{pub.date}</span>
                  <span>•</span>
                  <span>{pub.readTime}</span>
                </div>
              </div>

              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 500, color: 'var(--color-carbon-black)', marginBottom: '8px', lineHeight: 1.15 }}>
                {pub.title}
              </h2>

              <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.15rem', color: 'var(--color-charcoal)', marginBottom: '20px' }}>
                {pub.subtitle}
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--color-crimson-red)', marginBottom: '16px' }}>
                BY {pub.author} <span style={{ color: 'var(--color-graphite)' }}>({pub.authorRole})</span>
              </div>

              <div style={{ backgroundColor: 'var(--color-antique-parchment)', padding: '20px', borderLeft: '3px solid var(--color-crimson-red)', marginBottom: '24px' }}>
                <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.12em', color: 'var(--color-crimson-red)', textTransform: 'uppercase' }}>
                  ABSTRACT / SUMMARY:
                </strong>
                <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--color-charcoal)', marginTop: '8px' }}>
                  {pub.abstract}
                </p>
              </div>

              {/* Key Takeaways & Syllabus Focus */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.14em', color: 'var(--color-carbon-black)', textTransform: 'uppercase', marginBottom: '12px' }}>
                  PRIMARY INQUIRIES &amp; FINDINGS:
                </h3>
                <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
                  {pub.keyTakeaways.map((point, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '8px', fontSize: '0.875rem', color: 'var(--color-charcoal)', lineHeight: 1.5 }}>
                      <span style={{ color: 'var(--color-crimson-red)' }}>✦</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer Row */}
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {pub.tags.map((tag) => (
                    <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', padding: '3px 8px', backgroundColor: 'var(--color-antique-parchment)', border: '1px solid var(--border-light)' }}>
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedTract(pub)}
                  className="btn-editorial btn-editorial-crimson"
                  style={{ padding: '8px 18px', fontSize: '0.75rem' }}
                >
                  <span>Open Full Monograph</span>
                  <span>↗</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Reading Dialog Modal */}
        {selectedTract && (
          <div className="modal-overlay" onClick={() => setSelectedTract(null)}>
            <div className="lightbox-dialog paper-grain" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '840px', maxHeight: '85vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-medium)', paddingBottom: '12px', marginBottom: '20px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-crimson-red)', letterSpacing: '0.14em' }}>
                  {selectedTract.issue} · {selectedTract.category}
                </span>
                <button type="button" onClick={() => setSelectedTract(null)} style={{ fontSize: '24px', cursor: 'pointer' }}>×</button>
              </div>

              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 500, color: 'var(--color-carbon-black)', marginBottom: '8px' }}>
                {selectedTract.title}
              </h2>
              <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--color-charcoal)', marginBottom: '16px' }}>
                {selectedTract.subtitle}
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--color-crimson-red)', marginBottom: '20px' }}>
                BY {selectedTract.author} ({selectedTract.authorRole}) · {selectedTract.date}
              </div>

              <div style={{ lineHeight: 1.8, color: 'var(--color-charcoal)', fontSize: '1.05rem', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p>{selectedTract.abstract}</p>
                <p>
                  In this monograph, the FCIT working circle examines empirical telemetry recorded across our departmental test rigs. We challenge conventional wisdom regarding algorithmic bottlenecks and lay out architectural solutions tested under production-grade conditions at HBTU.
                </p>
                <div style={{ backgroundColor: 'var(--color-antique-parchment)', padding: '20px', border: '1px solid var(--border-medium)', margin: '16px 0' }}>
                  <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', letterSpacing: '0.12em', color: 'var(--color-crimson-red)', textTransform: 'uppercase', marginBottom: '10px' }}>
                    KEY TAKEAWAYS &amp; METHODOLOGY
                  </h3>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedTract.keyTakeaways.map((pt, i) => (
                      <li key={i} style={{ display: 'flex', gap: '10px' }}>
                        <span style={{ color: 'var(--color-crimson-red)' }}>✦</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p>
                  To receive the full unabridged PDF preprint or contribute to future editions of the FCIT Gazette, contact the editorial bureau at the Department of Computer Science &amp; IT, HBTU Kanpur.
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-medium)', paddingTop: '16px', marginTop: '24px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <button type="button" onClick={() => setSelectedTract(null)} className="btn-editorial btn-editorial-dark" style={{ padding: '8px 16px', fontSize: '0.75rem' }}>
                  Close Monograph
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PublicationsPage;
