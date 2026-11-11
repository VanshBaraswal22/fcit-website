import React, { useState, useEffect, useRef, useCallback } from 'react';
import ImageWithFallback from '../ImageWithFallback';
import MemberSocialLinks from './MemberSocialLinks';

export function MemberProfileModal({ member, onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);

  const handleClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 320); // Sync with CSS exit transition duration
  }, [isClosing, onClose]);

  // Handle Escape key, focus trapping, and background scroll locking
  useEffect(() => {
    if (!member) return;
    setIsClosing(false);

    // Initial focus on close button
    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [member, handleClose]);

  if (!member) return null;

  return (
    <div
      className={`member-profile-overlay ${isClosing ? 'is-closing' : 'is-entering'}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-name"
      aria-describedby="profile-modal-bio"
    >
      <div
        ref={dialogRef}
        className={`member-profile-dialog ${isClosing ? 'is-closing' : 'is-entering'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dedicated Close Button */}
        <button
          ref={closeBtnRef}
          type="button"
          className="profile-modal-close-btn"
          onClick={handleClose}
          aria-label="Close member profile popup"
        >
          <span className="close-btn-icon" aria-hidden="true">✕</span>
        </button>

        <div className="profile-modal-grid">
          {/* LEFT COLUMN: Monochrome Portrait with Crimson Offset Backplate */}
          <div className="profile-modal-photo-column">
            <div className="profile-photo-wrapper">
              <div className="profile-photo-crimson-backplate" aria-hidden="true" />
              <div className="profile-photo-frame">
                <ImageWithFallback
                  src={member.image}
                  alt={member.name}
                  name={member.name}
                  role={member.role}
                  className="profile-modal-img monochrome-portrait"
                  loading="eager"
                />
                <div className="profile-photo-rim-accent" aria-hidden="true" />
              </div>
            </div>
            {member.yearBranch && (
              <div className="profile-photo-branch-tag">
                {member.yearBranch}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Editorial Typography, Bio, Focus Areas & Social Links */}
          <div className="profile-modal-content-column">
            {/* Header: Group Eyebrow & Designation */}
            <div className="profile-modal-header">
              <span className="profile-group-eyebrow">
                {member.group ? member.group.toUpperCase() : 'FCIT COUNCIL'}
              </span>
              <span className="profile-role-badge">
                {member.role ? member.role.toUpperCase() : 'MEMBER'}
              </span>
              <h2 id="profile-modal-name" className="profile-member-name">
                {member.name}
              </h2>
              {member.yearBranch && (
                <div className="profile-meta-line">
                  <span className="meta-icon" aria-hidden="true">◆</span>
                  <span>{member.yearBranch}</span>
                </div>
              )}
            </div>

            {/* Biography */}
            {member.bio && (
              <div className="profile-bio-block">
                <p id="profile-modal-bio" className="profile-bio-text">
                  {member.bio}
                </p>
              </div>
            )}

            {/* Areas of Responsibility */}
            {member.responsibilities && (
              <div className="profile-section-block">
                <span className="profile-section-label">AREAS OF RESPONSIBILITY</span>
                <p className="profile-responsibilities-text">
                  {member.responsibilities}
                </p>
              </div>
            )}

            {/* Technical Interests / Focus Areas */}
            {member.interests && member.interests.length > 0 && (
              <div className="profile-section-block">
                <span className="profile-section-label">INTERESTS &amp; DOMAINS</span>
                <div className="profile-interests-cluster">
                  {member.interests.map((item, idx) => (
                    <span key={idx} className="profile-interest-pill">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Media Links */}
            {member.social && (
              <div className="profile-section-block profile-social-section">
                <span className="profile-section-label">CONNECT</span>
                <MemberSocialLinks social={member.social} />
              </div>
            )}

            {/* Official Institutional Affiliation */}
            <footer className="profile-modal-footer">
              <span>Department of Computer Science &amp; Engineering · HBTU Kanpur</span>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberProfileModal;
