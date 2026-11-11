import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionLabel from '../SectionLabel';
import { galleryItems } from '../../data/galleryData';
import { useLightbox } from '../../layouts/RootLayout';

export default function HomeMoments() {
  const [filter, setFilter] = useState('ALL');
  const { openLightbox } = useLightbox();

  const categories = ['ALL', 'CAMPUS HERITAGE', 'SYSTEMS LAB', 'BUILD NIGHTS', 'OPEN COMMONS'];

  const filteredItems = galleryItems.filter((item) => {
    if (filter === 'ALL') return true;
    return item.category === filter;
  });

  return (
    <section className="home-moments-section" id="moments">
      <div className="home-section-shell">
        <div className="home-section-header">
          <div className="home-section-title-wrap">
            <SectionLabel>PHOTOGRAPHIC CHRONICLES</SectionLabel>
            <h2 className="home-editorial-heading">
              BEHIND EVERY IDEA, <em>THERE IS A MOMENT.</em>
            </h2>
            <p className="home-section-desc">
              Glimpses of collegiate laboratory sessions, hardware debugging marathons, and architectural spaces across HBTU East Campus.
            </p>
          </div>

          <div className="home-moments-actions">
            <div className="home-tab-controls" role="tablist">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={filter === cat}
                  className={`home-filter-pill ${filter === cat ? 'is-active' : ''}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <Link to="/gallery" className="home-cta-secondary">
              <span>Explore Gallery</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        {/* Asymmetrical Masonry Editorial Grid */}
        <div className="home-moments-grid">
          {filteredItems.slice(0, 6).map((item, idx) => (
            <figure
              key={item.id}
              className={`home-moment-item home-moment-${idx % 3}`}
              onClick={() => openLightbox && openLightbox(item)}
              tabIndex={0}
              role="button"
              aria-label={`View full size: ${item.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox && openLightbox(item);
                }
              }}
            >
              <div className="home-moment-image-wrapper">
                <img
                  src={item.image}
                  alt={item.alt || item.title}
                  className="home-moment-image"
                  loading="lazy"
                />
                <div className="home-moment-hover-overlay">
                  <span className="home-moment-zoom-icon">⤢ View Full Screen</span>
                </div>
              </div>

              <figcaption className="home-moment-caption">
                <div className="home-moment-meta-line">
                  <span className="home-moment-plate">{item.plate}</span>
                  <span className="home-moment-cat">{item.category}</span>
                </div>
                <h3 className="home-moment-title">{item.title}</h3>
                <p className="home-moment-sub">{item.location} · {item.year}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
