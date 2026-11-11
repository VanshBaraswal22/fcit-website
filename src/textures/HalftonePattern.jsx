import React from 'react';

export function HalftonePattern({ type = 'corner', position = 'br', color = 'black', className = '' }) {
  if (type === 'corner') {
    return (
      <div
        className={`halftone-corner halftone-corner--${position} ${className}`}
        style={color === 'crimson' ? { backgroundImage: 'radial-gradient(circle, var(--color-crimson-red) 1.5px, transparent 1.5px)' } : {}}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={`halftone-screen ${color === 'crimson' ? 'halftone-screen-crimson' : ''} ${className}`}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    />
  );
}

export default HalftonePattern;
