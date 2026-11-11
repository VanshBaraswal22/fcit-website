import { useEffect } from 'react';

/**
 * useScrollProgress
 * Updates the CSS variable --scroll-progress from 0% to 100% on viewport scroll.
 * Drives the gold-to-navy scroll progress indicator.
 * Disables parallax and smooth motion on touch devices and when prefers-reduced-motion is active.
 * Restricts motion strictly to 2D transforms (translateY) and opacity.
 */
export function useScrollProgress() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    let frameId = 0;

    const handleScroll = () => {
      if (frameId) return;
      frameId = requestAnimationFrame(() => {
        const totalHeight = root.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        root.style.setProperty('--scroll-progress', `${progress.toFixed(2)}%`);

        // Parallax elements: ONLY on desktop non-touch devices, pure 2D translateY
        if (!reducedMotion && !isTouch && window.innerWidth >= 900) {
          document.querySelectorAll('[data-parallax]').forEach((el) => {
            const factor = parseFloat(el.getAttribute('data-parallax') || '0.04');
            const rect = el.getBoundingClientRect();
            const centerOffset = (rect.top + rect.height / 2) - (window.innerHeight / 2);
            el.style.transform = `translateY(${(-centerOffset * factor).toFixed(1)}px)`;
          });
        }
        frameId = 0;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);
}

export default useScrollProgress;
