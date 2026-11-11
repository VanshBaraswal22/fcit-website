import React from 'react';

/**
 * SectionLabel
 * Editorial masthead label featuring:
 * - A section number that fades and slides in beside each title (.section-number-slide)
 * - A gold rule that draws from left to right when visible (.section-gold-rule)
 * - IBM Plex Mono typography with Heritage Gold styling
 */
export function SectionLabel({ children, light = false, className = '' }) {
  return (
    <div className={`editorial-label ${light ? 'editorial-label--light' : ''} ${className}`}>
      <span className="rule section-gold-rule" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

export default SectionLabel;
