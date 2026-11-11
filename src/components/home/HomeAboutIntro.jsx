import React, { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '../SectionLabel';

gsap.registerPlugin(ScrollTrigger);

export default function HomeAboutIntro() {
  const manifestoRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.home-about-manifesto-item');
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0.32, color: '#A8A59E' },
          {
            opacity: 1,
            color: i === 1 ? '#850713' : '#191B1F',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 78%',
              end: 'top 52%',
              scrub: 0.5,
            },
          }
        );
      });
    }, manifestoRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="home-about-intro-section" id="about">
      <div className="home-section-shell">
        <div className="home-about-intro-grid">
          {/* Left Column: Editorial Statement & Concise Introduction */}
          <div className="home-about-intro-text">
            <SectionLabel>ORGANISATIONAL IDENTITY</SectionLabel>

            <h2 className="home-editorial-heading">
              A COMMUNITY BUILT AROUND <em>THE PURSUIT OF KNOWLEDGE.</em>
            </h2>

            <p className="home-about-intro-lead">
              The Fraternity of Computer Science and Information Technology is a student-led technical community affiliated with the Department of Computer Science and Engineering at Harcourt Butler Technical University, Kanpur. We bring together curious undergraduates to pursue practical technical learning, collaborative software engineering, and applied research across artificial intelligence and distributed systems—fostering real-world innovation that extends far beyond the conventional curriculum.
            </p>

            <div className="home-about-intro-actions">
              <Link to="/about" className="home-cta-primary">
                <span>Discover FCIT</span>
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          {/* Right Column: One Authentic FCIT Photograph */}
          <div className="home-about-intro-visual">
            <div className="home-about-image-card">
              <div className="home-about-image-frame">
                <img
                  src="/images/cse-department-building.jpg"
                  alt="Department of Computer Science & Engineering Building, Harcourt Butler Technical University, East Campus"
                  className="home-about-photo"
                  loading="lazy"
                  width="600"
                  height="420"
                />
                <div className="home-about-image-overlay">
                  <span className="home-about-stamp">EST. 1921 · HBTU KANPUR</span>
                </div>
              </div>
              <div className="home-about-card-caption">
                <span className="home-about-caption-dept">Department of Computer Science &amp; Engineering</span>
                <span className="home-about-caption-loc">East Campus · Nawabganj</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progressive Typography Emphasis Manifesto */}
        <div className="home-about-manifesto" ref={manifestoRef} aria-label="Core Engineering Philosophy">
          <div className="home-about-manifesto-header">
            <span className="home-manifesto-tag">PHILOSOPHICAL ANCHOR</span>
            <span className="home-manifesto-rule" />
          </div>
          <div className="home-about-manifesto-grid">
            <div className="home-about-manifesto-item" data-index="01">
              <span className="home-manifesto-num">01 /</span>
              <span className="home-manifesto-text">LEARN DEEPLY.</span>
            </div>
            <div className="home-about-manifesto-item is-accent" data-index="02">
              <span className="home-manifesto-num">02 /</span>
              <span className="home-manifesto-text">BUILD TOGETHER.</span>
            </div>
            <div className="home-about-manifesto-item" data-index="03">
              <span className="home-manifesto-num">03 /</span>
              <span className="home-manifesto-text">CONTRIBUTE MEANINGFULLY.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
