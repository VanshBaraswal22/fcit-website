import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PrintRegistrationMarks from '../textures/PrintRegistrationMarks';
import Stamp from '../textures/Stamp';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [modalContent, setModalContent] = useState(null);

  const openLegalModal = (title, body) => {
    setModalContent({ title, body });
  };

  return (
    <footer className="site-footer section-padding paper-grain" style={{ backgroundColor: 'var(--bg-footer, #222120)', color: 'var(--color-warm-ivory)' }}>
      <div className="section-shell">
        <div className="footer-top-grid">
          {/* Brand Column */}
          <div className="footer-brand-block">
            <div className="footer-logo-row">
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src="/images/fcit-logo-circle.png"
                  alt="FCIT Crest"
                  width="52"
                  height="52"
                  style={{ borderRadius: '50%', objectFit: 'contain' }}
                />
              </div>
              <div>
                <h3 className="footer-title">FCIT</h3>
                <span className="footer-subtitle">HBTU KANPUR</span>
              </div>
            </div>

            <p className="footer-desc" style={{ color: 'rgba(255, 248, 232, 0.8)' }}>
              Fraternity of Computer Science &amp; IT. A prestigious student-led technology collective exploring software engineering, artificial intelligence, open-source systems, and computing research at Harcourt Butler Technical University.
            </p>

            {/* Social Media Links */}
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginTop: '16px' }}>
              <a
                href="https://github.com/fcit-hbtu"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--color-pale-gold)', textDecoration: 'none' }}
              >
                GitHub ↗
              </a>
              <span style={{ color: 'rgba(255, 248, 232, 0.4)' }}>•</span>
              <a
                href="https://linkedin.com/company/fcit-hbtu"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--color-pale-gold)', textDecoration: 'none' }}
              >
                LinkedIn ↗
              </a>
              <span style={{ color: 'rgba(255, 248, 232, 0.4)' }}>•</span>
              <a
                href="https://twitter.com/fcit_hbtu"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--color-pale-gold)', textDecoration: 'none' }}
              >
                Twitter / X ↗
              </a>
            </div>
          </div>

          {/* Directory 01: Primary Navigation */}
          <div>
            <h4 className="footer-col-title" style={{ color: 'var(--color-heritage-gold)' }}>EXPLORE</h4>
            <ul className="footer-link-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About FCIT</Link></li>
              <li><Link to="/guilds/dev">Working Guilds</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/team">People &amp; Leadership</Link></li>
            </ul>
          </div>

          {/* Directory 02: More Resources */}
          <div>
            <h4 className="footer-col-title" style={{ color: 'var(--color-heritage-gold)' }}>RESOURCES</h4>
            <ul className="footer-link-list">
              <li><Link to="/achievements">Achievements</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/announcements">Announcements</Link></li>
              <li><Link to="/publications">Publications</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Campus Dispatch & Statement */}
          <div className="footer-meta-block">
            <h4 className="footer-col-title" style={{ color: 'var(--color-heritage-gold)' }}>CAMPUS LOCATION</h4>
            <address style={{ fontStyle: 'normal', lineHeight: 1.6, color: 'rgba(255, 248, 232, 0.85)' }}>
              Department of Computer Science &amp; Engineering<br />
              Harcourt Butler Technical University<br />
              East Campus, Nawabganj, Kanpur 208002
            </address>

            <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255, 248, 232, 0.15)', paddingTop: '12px' }}>
              <div style={{ color: 'var(--color-pale-gold)', fontSize: '0.8125rem' }}>
                Official: <a href="mailto:fcit@hbtu.ac.in" style={{ color: 'var(--color-pale-gold)', textDecoration: 'underline' }}>fcit@hbtu.ac.in</a>
              </div>
              <div style={{ color: 'rgba(255, 248, 232, 0.7)', fontSize: '0.75rem', marginTop: '6px' }}>
                <a href="https://hbtu.ac.in" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255, 248, 232, 0.85)', textDecoration: 'underline' }}>
                  hbtu.ac.in ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Closing Statement */}
        <div style={{ marginTop: '40px', padding: '24px 0 16px', borderTop: '1px solid rgba(214, 179, 63, 0.25)', textAlign: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-heritage-gold)', fontWeight: 600 }}>
            A PLACE TO LEARN BY MAKING.
          </span>
        </div>

        {/* Bottom Bar with Privacy Policy & Terms */}
        <div className="footer-bottom-bar" style={{ borderTop: '1px solid rgba(255, 248, 232, 0.15)', marginTop: '48px', paddingTop: '24px' }}>
          <div>
            © {currentYear} FCIT · Fraternity of Computer Science &amp; IT · HBTU Kanpur
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => openLegalModal('Privacy Policy', 'FCIT adheres to ethical computing principles. We do not track personal identifying information, sell user telemetry, or deploy commercial advertising cookies. Any information submitted via student membership forms is utilized solely for academic and event coordination within the Department of Computer Science & Engineering, HBTU Kanpur.')}
              style={{ color: 'rgba(255, 248, 232, 0.75)', textDecoration: 'underline', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit' }}
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => openLegalModal('Terms of Engagement', 'FCIT materials, including technical publications, open source toolkits, and event curricula, are published under permissive educational licenses. Code contributions made to FCIT repositories remain the intellectual property of their student authors while licensed under the MIT or Apache 2.0 open-source licenses.')}
              style={{ color: 'rgba(255, 248, 232, 0.75)', textDecoration: 'underline', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit' }}
            >
              Terms of Engagement
            </button>
          </div>
          <div>
            <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ color: 'var(--color-pale-gold)' }}>
              Back to top ↑
            </a>
          </div>
        </div>
      </div>

      {/* Accessible Legal Modal */}
      {modalContent && (
        <div
          className="modal-overlay"
          role="presentation"
          onClick={() => setModalContent(null)}
        >
          <div
            className="lightbox-dialog paper-grain"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '640px', backgroundColor: 'var(--color-warm-ivory)', border: '2px solid var(--color-heritage-gold)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-medium)', paddingBottom: '12px', marginBottom: '16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-heritage-gold)', letterSpacing: '0.14em', fontWeight: 600 }}>
                FCIT · HBTU KANPUR
              </span>
              <button
                type="button"
                onClick={() => setModalContent(null)}
                style={{ width: '30px', height: '30px', border: '1px solid var(--border-medium)', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ×
              </button>
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--color-ink-dark)', marginBottom: '12px' }}>
              {modalContent.title}
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--color-ink-charcoal)', marginBottom: '24px' }}>
              {modalContent.body}
            </p>
            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '14px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => setModalContent(null)}
                className="btn-editorial btn-editorial-gold"
                style={{ padding: '8px 18px', fontSize: '0.75rem' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;
