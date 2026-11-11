import React, { useState, useEffect, useRef } from 'react';

/**
 * CountUp
 * Lightweight, zero-dependency count-up number component.
 * Uses IntersectionObserver to trigger when visible.
 * Interpolates from 0 to target value using requestAnimationFrame.
 * Strictly respects prefers-reduced-motion.
 */
export function CountUp({
  end = 100,
  duration = 1400,
  prefix = '',
  suffix = '',
  className = '',
  style = {},
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const elementRef = useRef(null);
  const hasCountedRef = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !('IntersectionObserver' in window)) {
      setDisplayValue(end);
      hasCountedRef.current = true;
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasCountedRef.current) {
            hasCountedRef.current = true;
            observer.unobserve(entry.target);

            const startTime = performance.now();
            const startVal = 0;
            const targetVal = Number(end);

            const updateNumber = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Cubic ease-out curve
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const currentVal = Math.round(startVal + (targetVal - startVal) * easeOut);

              setDisplayValue(currentVal);

              if (progress < 1) {
                requestAnimationFrame(updateNumber);
              } else {
                setDisplayValue(targetVal);
              }
            };

            requestAnimationFrame(updateNumber);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={elementRef} className={`count-up-stat ${className}`} style={style}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
}

export default CountUp;
