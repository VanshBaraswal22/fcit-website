import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { announcements } from '../../data/announcementsData';
import { gsap, ScrollTrigger } from '../../animations/motion';
import '../../styles/homeNoticesRepository.css';

export default function HomeAnnouncementsStrip() {
  const sectionRef = useRef(null);

  // Active, published announcements, sorted newest first
  const activeAnnouncements = announcements
    .filter((item) => item.status === 'ACTIVE')
    .sort((a, b) => new Date(b.publicationDate || b.uploadDate) - new Date(a.publicationDate || a.uploadDate));

  // Strictly display the three latest published notices on the homepage
  const displayNotices = activeAnnouncements.slice(0, 3);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr;
    const day = String(date.getDate()).padStart(2, '0');
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Respect prefers-reduced-motion (Rule 3)
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const header = section.querySelector('.fcit-notices-header');
        const rows = gsap.utils.toArray('.fcit-notices-row', section);

        // Initial states initialized exclusively in JS (Rule 5)
        if (header) {
          gsap.set(header, { opacity: 0, y: 12 });
        }
        if (rows.length) {
          gsap.set(rows, { opacity: 0, y: 10 });
        }

        // Master single-fire scroll trigger
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true,
          },
        });

        if (header) {
          tl.to(header, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          });
        }

        if (rows.length) {
          tl.to(
            rows,
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              stagger: 0.08,
              ease: 'power2.out',
            },
            '-=0.25'
          );
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="fcit-notices-section"
      id="announcements"
      aria-label="FCIT Official Notices"
    >
      <div className="home-section-shell">
        {/* Minimal Editorial Header */}
        <header className="fcit-notices-header">
          <h2 className="fcit-notices-heading">LATEST NOTICES</h2>

          <Link to="/announcements" className="fcit-notices-all-link">
            <span>VIEW ALL</span>
            <span className="fcit-notices-all-arrow" aria-hidden="true">→</span>
          </Link>
        </header>

        {/* Minimal Editorial Notice Rows: Date + Title only */}
        <div className="fcit-notices-board" role="feed" aria-label="Latest Notices">
          {displayNotices.map((item) => {
            const formattedDate = formatDate(item.uploadDate || item.publicationDate);
            const targetUrl = item.fileUrl || item.url || '/announcements';

            return (
              <article key={item.id} className="fcit-notices-row">
                <time
                  dateTime={item.uploadDate || item.publicationDate}
                  className="fcit-notices-date"
                >
                  {formattedDate}
                </time>

                <a
                  href={targetUrl}
                  download={item.fileUrl ? (item.originalFileName || true) : undefined}
                  target={item.fileUrl ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="fcit-notices-title-link"
                >
                  <h3 className="fcit-notices-title">{item.title}</h3>
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
