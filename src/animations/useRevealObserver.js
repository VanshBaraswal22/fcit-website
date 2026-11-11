import { useEffect } from 'react';

/**
 * useRevealObserver
 * High-performance IntersectionObserver hook for all scroll-driven reveals:
 * - Observes .reveal, .editorial-card, .stagger-group, .image-unmask, .section-title-editorial
 * - Automatically assigns staggered delays (--stagger-idx * 60ms) to children of .stagger-group
 * - Pauses off-screen infinite animations (.infinite-anim-host)
 * - Animates ONLY transform and opacity (no layout shifts)
 * - Immediately reveals all elements when prefers-reduced-motion is enabled
 */
export function useRevealObserver(dependency = null) {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Target reveal nodes
    const revealTargets = document.querySelectorAll(
      '.reveal, .editorial-card, .image-unmask, .section-title-editorial, .section-number-slide, .stagger-item'
    );
    const staggerGroups = document.querySelectorAll('.stagger-group');
    const infiniteAnimHosts = document.querySelectorAll('.infinite-anim-host, .marquee-band');

    // Setup stagger index on groups
    staggerGroups.forEach((group) => {
      Array.from(group.children).forEach((child, idx) => {
        child.style.setProperty('--stagger-idx', idx.toString());
      });
    });

    if (reducedMotion || !('IntersectionObserver' in window)) {
      revealTargets.forEach(node => node.classList.add('is-visible'));
      staggerGroups.forEach((group) => {
        group.classList.add('is-visible');
        Array.from(group.children).forEach(child => child.classList.add('is-visible'));
      });
      return undefined;
    }

    // 1. Reveal Observer with Bi-directional scroll-up safety
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // If it's a stagger group, reveal all children
            if (entry.target.classList.contains('stagger-group')) {
              Array.from(entry.target.children).forEach(child => child.classList.add('is-visible'));
            }
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    // Initial check: elements already above or within the viewport immediately show sharp
    const viewportHeight = window.innerHeight || 800;
    revealTargets.forEach((node) => {
      const rect = node.getBoundingClientRect();
      if (rect.top < viewportHeight) {
        node.classList.add('is-visible');
      } else {
        revealObserver.observe(node);
      }
    });

    staggerGroups.forEach((group) => {
      const rect = group.getBoundingClientRect();
      if (rect.top < viewportHeight) {
        group.classList.add('is-visible');
        Array.from(group.children).forEach(child => child.classList.add('is-visible'));
      } else {
        revealObserver.observe(group);
      }
    });

    // 2. Off-Screen Infinite Animation Pauser Observer
    const offscreenObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('is-offscreen');
          } else {
            entry.target.classList.add('is-offscreen');
          }
        });
      },
      { threshold: 0.01 }
    );

    infiniteAnimHosts.forEach(host => offscreenObserver.observe(host));

    return () => {
      revealObserver.disconnect();
      offscreenObserver.disconnect();
    };
  }, [dependency]);
}

export default useRevealObserver;
