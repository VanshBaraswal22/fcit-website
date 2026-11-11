import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionLabel from '../SectionLabel';
import { gsap, ScrollTrigger } from '../../animations/motion';
import '../../styles/homeEventsMomentsAnimation.css';

export default function HomeEventsMoments() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop & Tablet Viewports with prefers-reduced-motion: no-preference (Rule 3)
      mm.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
        const featuredCard = section.querySelector('.home-featured-event-card');
        const photoCards = gsap.utils.toArray('.home-moments-photo-card', section);
        const images = photoCards.map((c) => c.querySelector('.home-moments-img')).filter(Boolean);
        const captions = photoCards.map((c) => c.querySelector('.home-moments-caption')).filter(Boolean);

        // Initial states initialized exclusively from JS (Rule 5)
        if (featuredCard) {
          gsap.set(featuredCard, { opacity: 0.85, y: 16 });
        }
        if (images.length) {
          gsap.set(images, { clipPath: 'inset(0 100% 0 0)', scale: 0.94, opacity: 0.3 });
        }
        if (captions.length) {
          gsap.set(captions, { opacity: 0, y: 8 });
        }

        // Master Editorial Reveal Timeline triggered on section entry
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
        });

        // 0ms: Featured Card reveal
        if (featuredCard) {
          tl.to(
            featuredCard,
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: 'power2.out',
            },
            0
          );
        }

        // Staggered Right Images:
        // - 1st right image: 120ms (0.12s)
        // - 2nd right image: 240ms (0.24s)
        // - 3rd right image: 360ms (0.36s)
        const delays = [0.12, 0.24, 0.36];

        images.forEach((img, i) => {
          const delayTime = delays[i] !== undefined ? delays[i] : 0.12 * (i + 1);

          tl.to(
            img,
            {
              clipPath: 'inset(0 0% 0 0)',
              scale: 1,
              opacity: 1,
              duration: 0.75,
              ease: 'power2.out',
            },
            delayTime
          );

          if (captions[i]) {
            tl.to(
              captions[i],
              {
                opacity: 1,
                y: 0,
                duration: 0.55,
                ease: 'power2.out',
              },
              delayTime + 0.1
            );
          }
        });
      });

      // Mobile Viewport Fallback (< 769px) with prefers-reduced-motion: no-preference (Rule 4: simpler fallback, unclipped)
      mm.add('(max-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const featuredCard = section.querySelector('.home-featured-event-card');
        if (featuredCard) {
          gsap.fromTo(
            featuredCard,
            { opacity: 0.9, y: 10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: featuredCard,
                start: 'top 95%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        }

        const photoCards = gsap.utils.toArray('.home-moments-photo-card', section);
        photoCards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0.9, y: 10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 95%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const momentsPhotos = [
    {
      id: 'm1',
      title: 'Systems & Kernel Practicum',
      caption: 'Hands-on debugging & assembly profiling in CSE departmental lab',
      image: '/images/workshop-lab.svg',
      tag: 'WORKSHOP',
    },
    {
      id: 'm2',
      title: 'Department of Computer Science & Engineering',
      caption: 'The institutional home and research facility of FCIT on HBTU East Campus',
      image: '/images/cse-department-building.jpg',
      tag: 'CAMPUS',
    },
    {
      id: 'm3',
      title: 'Sprint Incubator Preview',
      caption: 'Visual identity and track preview for upcoming flagship hackathons',
      image: '/images/hackathon-night.svg',
      tag: 'FUTURE INITIATIVE',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="home-events-moments-section"
      id="events-moments"
    >
      <div className="home-section-shell">
        <div className="home-section-header">
          <div className="home-section-title-wrap">
            <SectionLabel>GATHERINGS &amp; CHRONICLES</SectionLabel>
            <h2 className="home-editorial-heading">
              THE PEOPLE. THE PROCESS. <em>THE MOMENTS.</em>
            </h2>
            <p className="home-section-desc">
              Hands-on systems workshops, peer code salons, and collegiate moments across Harcourt Butler Technical University.
            </p>
          </div>

          <div className="home-events-moments-nav-links">
            <Link to="/events" className="home-cta-primary">
              <span>Explore Events</span>
              <span aria-hidden="true">↗</span>
            </Link>
            <Link to="/gallery" className="home-cta-secondary">
              <span>View Gallery</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        {/* Unified Editorial Grid: Featured Event + 3 Authentic Photographs */}
        <div className="home-events-moments-grid">
          {/* Column 1: One Featured Actual Event */}
          <article className="home-featured-event-card">
            <div className="home-fe-header">
              <span className="home-fe-badge">FEATURED WORKSHOP</span>
              <span className="home-fe-date">APRIL 12, 2025</span>
            </div>

            <h3 className="home-fe-title">Build Lab: Systems &amp; Kernel Foundations</h3>
            <span className="home-fe-venue">📍 Department of Computer Science &amp; Engineering, HBTU</span>

            <p className="home-fe-desc">
              Demystifying low-level memory layouts, pointer arithmetic, virtual memory paging, and Linux system calls with hands-on instrumentation on departmental workstations.
            </p>

            <div className="home-fe-topics">
              <span className="home-fe-topic-pill">C Memory Models</span>
              <span className="home-fe-topic-pill">Linux Syscalls</span>
              <span className="home-fe-topic-pill">GDB Profiling</span>
            </div>

            {/* Reserved Future Hackathon Advisory Notice */}
            <div className="home-fe-future-notice">
              <span className="home-fe-notice-icon">ℹ</span>
              <span className="home-fe-notice-text">
                <strong>Future Initiative Advisory:</strong> Hackathons and multi-day sprint incubators are planned as upcoming departmental initiatives and will be announced once dates are finalized.
              </span>
            </div>

            <div className="home-fe-footer">
              <Link to="/events/build-lab-systems-foundations" className="home-fe-link">
                <span>View Workshop Details</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>

          {/* Column 2: Maximum 3 Authentic Event & Campus Photographs */}
          <div className="home-moments-preview-col">
            <div className="home-moments-photo-stack">
              {momentsPhotos.map((photo, idx) => (
                <figure
                  key={photo.id}
                  className="home-moments-photo-card"
                  style={{ '--card-idx': idx }}
                >
                  <div className="home-moments-img-wrap">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="home-moments-img"
                      loading="eager"
                      decoding="async"
                      width="420"
                      height="240"
                    />
                    <span className="home-moments-tag">{photo.tag}</span>
                  </div>
                  <figcaption className="home-moments-caption">
                    <strong className="home-moments-title">{photo.title}</strong>
                    <span className="home-moments-text">{photo.caption}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
