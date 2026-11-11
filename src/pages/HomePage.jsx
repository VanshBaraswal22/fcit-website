import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap, ScrollTrigger } from '../animations/motion';

// STRICT 6-SECTION MASTER HOMEPAGE ARCHITECTURE
import AtmosphericHero from '../components/AtmosphericHero';
import HomeAnnouncementsStrip from '../components/home/HomeAnnouncementsStrip';
import HomeAboutIntro from '../components/home/HomeAboutIntro';
import HomeGuilds from '../components/home/HomeGuilds';
import HomeFeaturedProjects from '../components/home/HomeFeaturedProjects';
import HomeEventsMoments from '../components/home/HomeEventsMoments';

import '../styles/homeRedesign.css';

export function HomePage() {
  const containerRef = useRef(null);
  // Default combination: GFS Didot + Alegreya Sans + IBM Plex Mono (Part 5 Preferred)
  const [fontCombo, setFontCombo] = useState('didot');

  useEffect(() => {
    document.documentElement.setAttribute('data-font-combo', fontCombo);
  }, [fontCombo]);

  // Handle direct hash navigation on initial load (e.g. /#guilds)
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        const timer = setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 350);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop Cinematic Scrollytelling Transitions
      mm.add('(min-width: 769px)', () => {
        // 1. Pinned Hero & Curtain Reveal into Ivory
        ScrollTrigger.create({
          trigger: '.home-hero-curtain-pin',
          start: 'top top',
          end: 'bottom top',
          pin: true,
          pinSpacing: false,
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress;
            gsap.set('.fcit-atmosphere__layer--back', {
              scale: 1 + p * 0.12,
              yPercent: -p * 3,
            });
            gsap.set('.fcit-atmosphere__content', {
              y: -p * 50,
              opacity: Math.max(0, 1 - p * 1.5),
            });
          },
          onLeave: () => {
            gsap.set('.home-hero-curtain-pin', { autoAlpha: 0, pointerEvents: 'none' });
          },
          onEnterBack: () => {
            gsap.set('.home-hero-curtain-pin', { autoAlpha: 1, pointerEvents: 'auto' });
          },
          onLeaveBack: () => {
            gsap.set('.home-hero-curtain-pin', { autoAlpha: 1, pointerEvents: 'auto' });
            gsap.set('.fcit-atmosphere__content', { y: 0, opacity: 1 });
            gsap.set('.fcit-atmosphere__layer--back', { scale: 1, yPercent: 0 });
          },
        });

        // 2. About FCIT Architectural Photo Reveal
        const aboutPhoto = document.querySelector('.home-about-photo');
        if (aboutPhoto) {
          gsap.fromTo(
            aboutPhoto,
            { clipPath: 'inset(100% 0 0% 0)', scale: 1.12 },
            {
              clipPath: 'inset(0% 0 0% 0)',
              scale: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: '.home-about-intro-section',
                start: 'top 75%',
                end: 'center 45%',
                scrub: 1,
              },
            }
          );
        }
      });

      // Section Header Triggers for all viewports
      const sectionSelectors = [
        '#announcements',
        '#about',
        '#guilds',
        '#projects',
        '#events-moments',
      ];

      sectionSelectors.forEach((selector) => {
        const sec = document.querySelector(selector);
        if (!sec) return;

        const headerWrap = sec.querySelector('.home-section-title-wrap, .home-ann-strip-inner');
        if (headerWrap) {
          gsap.fromTo(
            headerWrap,
            { opacity: 0, y: 22 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sec,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="home-redesign" ref={containerRef} data-font-combo={fontCombo}>
      {/* SECTION 01 — HERO (Authentic HBTU Building, IDEAS, ENGINEERED., Curtain Pin) */}
      <div className="home-hero-curtain-pin">
        <AtmosphericHero />
      </div>

      {/* SECTION 02 — ANNOUNCEMENTS (Compact Editorial Strip, Max 2 Notices) */}
      <HomeAnnouncementsStrip />

      {/* SECTION 03 — ABOUT FCIT (50–70 Word Introduction, Authentic HBTU Photo, Discover Link) */}
      <HomeAboutIntro />

      {/* SECTION 04 — WORKING GUILDS (Visual Centrepiece: 01 Dev's, 02 Intelligence, 03 AlgoCrew, 04 Fusion X) */}
      <HomeGuilds />

      {/* SECTION 05 — SELECTED WORK (Max Two Featured Projects, Assembled Multi-Plate Compositions) */}
      <HomeFeaturedProjects />

      {/* SECTION 06 — EVENTS & MOMENTS (1 Featured Workshop + 3 Authentic Photographs, Future Hackathon Notice) */}
      <HomeEventsMoments />
    </div>
  );
}

export default HomePage;
