import React from 'react';

export function MarqueeBand({
  items = [
    'WHERE IDEAS BECOME INNOVATION',
    'LEARN WITH CURIOSITY',
    'BUILD WITH INTENTION',
    'CONTRIBUTE WITH PURPOSE',
    'HBTU KANPUR · EST. 1921',
    'FRATERNITY OF COMPUTER SCIENCE & IT',
  ],
  variant = 'carbon',
  className = '',
}) {
  const variantClass = variant === 'oxblood' ? 'marquee-band--oxblood' : variant === 'parchment' ? 'marquee-band--parchment' : '';

  // Duplicate items to ensure smooth infinite loop
  const repeated = [...items, ...items, ...items];

  return (
    <div className={`marquee-band ${variantClass} ${className}`} aria-hidden="true">
      <div className="marquee-track">
        {repeated.map((item, idx) => (
          <React.Fragment key={idx}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', letterSpacing: '0.14em', fontWeight: 500 }}>
              {item}
            </span>
            <span style={{ color: 'var(--color-crimson-red)', opacity: 0.8 }}>✦</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default MarqueeBand;
