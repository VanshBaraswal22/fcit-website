import React from 'react';

export function Stamp({
  text = 'FCIT · HBTU KANPUR',
  subtext = 'DEPARTMENT EDITORIAL · EST. 1921',
  variant = 'crimson',
  rotate = '-3deg',
  className = '',
}) {
  const variantClass = variant === 'gold' ? 'stamp-seal--gold' : variant === 'dark' ? 'stamp-seal--dark' : '';
  return (
    <div
      className={`stamp-seal ${variantClass} ${className}`}
      style={{ transform: `rotate(${rotate})` }}
      aria-hidden="true"
    >
      <span>{text}</span>
      {subtext && <small style={{ fontSize: '7px', opacity: 0.85, marginTop: '2px', letterSpacing: '0.12em' }}>{subtext}</small>}
    </div>
  );
}

export default Stamp;
