import React from 'react';
import { Link } from 'react-router-dom';

export function Breadcrumbs({ items = [] }) {
  return (
    <nav className="breadcrumbs-bar" aria-label="Breadcrumb navigation">
      <Link to="/">FCIT INDEX</Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <span className="breadcrumbs-sep" aria-hidden="true">/</span>
            {isLast || !item.to ? (
              <span aria-current="page" style={{ color: 'var(--color-crimson-red)', fontWeight: 600 }}>
                {item.label}
              </span>
            ) : (
              <Link to={item.to}>{item.label}</Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;
