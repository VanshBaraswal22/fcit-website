import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SectionLabel from '../components/SectionLabel';
import { announcements } from '../data/announcementsData';

export default function AnnouncementsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' | 'oldest'

  // Extract dynamically available years
  const years = useMemo(() => {
    const yrs = new Set(
      announcements.map((a) => a.year || new Date(a.publicationDate).getFullYear()).filter(Boolean)
    );
    return ['ALL', ...Array.from(yrs).sort((a, b) => b - a)];
  }, []);

  // Filter & sort announcements
  const filteredNotices = useMemo(() => {
    return announcements
      .filter((item) => {
        // Search query by title
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = item.title?.toLowerCase().includes(q);
          if (!matchTitle) return false;
        }

        // Year filter
        const itemYear = item.year || new Date(item.publicationDate).getFullYear();
        if (selectedYear !== 'ALL' && String(itemYear) !== String(selectedYear)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const timeA = new Date(a.publicationDate || a.uploadDate).getTime();
        const timeB = new Date(b.publicationDate || b.uploadDate).getTime();
        return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
      });
  }, [searchQuery, selectedYear, sortOrder]);

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

  return (
    <div className="fcit-archive-page">
      <div className="home-section-shell">
        {/* Navigation Breadcrumb & Header */}
        <header className="fcit-archive-header">
          <div className="fcit-archive-nav-bar">
            <Link to="/" className="fcit-archive-back-link">
              ← RETURN TO HOMEPAGE
            </Link>
          </div>

          <div className="fcit-archive-title-block">
            <SectionLabel>DEPARTMENT OF COMPUTER SCIENCE &amp; ENGINEERING</SectionLabel>
            <h1 className="fcit-archive-heading">
              OFFICIAL NOTICE <em>ARCHIVE.</em>
            </h1>
            <p className="fcit-archive-subheading">
              Official circulars, workshop registrations, technical symposiums,
              and annual student announcements from FCIT at Harcourt Butler Technical University.
            </p>
          </div>
        </header>

        {/* Filter & Search Control Panel */}
        <section className="fcit-archive-controls" aria-label="Archive Search and Filters">
          <div className="fcit-archive-search-box">
            <span className="fcit-archive-search-icon" aria-hidden="true">⌕</span>
            <input
              type="text"
              className="fcit-archive-search-input"
              placeholder="Search notices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search notices"
            />
            {searchQuery && (
              <button
                type="button"
                className="fcit-archive-search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
              >
                ✕
              </button>
            )}
          </div>

          <div className="fcit-archive-filter-row">
            <div className="fcit-archive-dropdown-group">
              <div className="fcit-archive-select-wrap">
                <label htmlFor="year-select" className="fcit-archive-select-label">YEAR:</label>
                <select
                  id="year-select"
                  className="fcit-archive-select"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y === 'ALL' ? 'ALL YEARS' : y}
                    </option>
                  ))}
                </select>
              </div>

              <div className="fcit-archive-select-wrap">
                <label htmlFor="sort-select" className="fcit-archive-select-label">SORT:</label>
                <select
                  id="sort-select"
                  className="fcit-archive-select"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="newest">NEWEST FIRST</option>
                  <option value="oldest">OLDEST FIRST</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Minimal Editorial Notices Feed: Strictly Date + Title */}
        <main className="fcit-archive-feed" role="feed" aria-label="Notices Archive List">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((item) => {
              const formattedDate = formatDate(item.uploadDate || item.publicationDate);
              const targetUrl = item.fileUrl || item.url || '#';

              return (
                <article key={item.id} className="fcit-archive-minimal-row">
                  <time
                    dateTime={item.uploadDate || item.publicationDate}
                    className="fcit-archive-minimal-date"
                  >
                    {formattedDate}
                  </time>
                  <a
                    href={targetUrl}
                    download={item.fileUrl ? (item.originalFileName || true) : undefined}
                    target={item.fileUrl ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="fcit-archive-minimal-title-link"
                  >
                    <h2 className="fcit-archive-minimal-title">{item.title}</h2>
                  </a>
                </article>
              );
            })
          ) : (
            <div className="fcit-archive-empty">
              <p className="fcit-archive-empty-msg">
                No official notices match your search{searchQuery ? ` "${searchQuery}"` : ''}.
              </p>
              <button
                type="button"
                className="fcit-archive-reset-btn"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedYear('ALL');
                }}
              >
                Reset Search
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
