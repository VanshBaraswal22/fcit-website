import React from 'react';

export function PrintRegistrationMarks({ folio = 'FOLIO-FCIT/1921', showSwatches = true, className = '', style = {} }) {
  return (
    <div className={`print-meta-header ${className}`} style={style} aria-hidden="true">
      <div className="reg-mark" style={{ gap: '8px' }}>
        <div className="reg-crosshair">
          <div className="reg-crosshair-circle" />
        </div>
        <span>HBTU KANPUR</span>
      </div>

      <div className="reg-mark" style={{ letterSpacing: '0.18em' }}>
        <span>{folio}</span>
      </div>

      {showSwatches && (
        <div className="cmyk-swatches" title="FCIT Tri-Family Print Standards">
          <span className="cmyk-chip" style={{ backgroundColor: 'var(--color-pure-white)' }} title="Pure White" />
          <span className="cmyk-chip" style={{ backgroundColor: 'var(--color-warm-ivory)' }} title="Warm Ivory" />
          <span className="cmyk-chip" style={{ backgroundColor: 'var(--color-pale-gold)' }} title="Pale Gold" />
          <span className="cmyk-chip" style={{ backgroundColor: 'var(--color-heritage-gold)' }} title="Heritage Gold" />
          <span className="cmyk-chip" style={{ backgroundColor: 'var(--color-primary-crimson)' }} title="Primary Crimson" />
          <span className="cmyk-chip" style={{ backgroundColor: 'var(--color-deep-oxblood)' }} title="Deep Oxblood" />
          <span className="cmyk-chip" style={{ backgroundColor: 'var(--color-ink-dark)' }} title="Dark Ink" />
        </div>
      )}
    </div>
  );
}

export default PrintRegistrationMarks;
