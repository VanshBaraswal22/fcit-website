// Module-scoped state for homepage hero intro
// Resets on page reload or fresh site visit; persists across SPA client-side routing.
let listeners = new Set();
let heroIntroCompleted = false;

export function isHeroIntroCompleted() {
  return heroIntroCompleted;
}

export function setHeroIntroCompleted(val) {
  heroIntroCompleted = Boolean(val);
  if (heroIntroCompleted && typeof document !== 'undefined') {
    document.documentElement.classList.remove('fcit-intro-pending');
  }
  listeners.forEach(fn => {
    try {
      fn(heroIntroCompleted);
    } catch (err) {
      console.error('[introState] listener error:', err);
    }
  });
}

export function subscribeHeroIntro(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
