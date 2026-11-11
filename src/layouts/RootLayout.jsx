import React, { useEffect, createContext, useContext, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TextureOverlay from '../textures/TextureOverlay';
import ButterflyCursor from '../components/ButterflyCursor';
import GalleryLightbox from '../components/GalleryLightbox';
import useScrollProgress from '../animations/useScrollProgress';
import useRevealObserver from '../animations/useRevealObserver';

export const LightboxContext = createContext({
  openLightbox: () => {},
  closeLightbox: () => {},
});

export const useLightbox = () => useContext(LightboxContext);

export function RootLayout() {
  const location = useLocation();
  const [activeLightboxItem, setActiveLightboxItem] = useState(null);

  // Scroll to hash target if present, otherwise scroll to top on route change
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname, location.hash]);

  // Hook subscriptions
  useScrollProgress();
  useRevealObserver(location.pathname);

  const openLightbox = (item) => setActiveLightboxItem(item);
  const closeLightbox = () => setActiveLightboxItem(null);

  const isHomePage =
    location.pathname === '/' ||
    location.pathname === '' ||
    location.pathname === '/index.html' ||
    location.pathname === '/home';

  return (
    <LightboxContext.Provider value={{ openLightbox, closeLightbox }}>
      <div className="site-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div className="scroll-progress-line" aria-hidden="true" />
        <ButterflyCursor />
        <TextureOverlay />
        <Navbar />

        <main
          key={location.pathname}
          className={`page-route-enter site-main-content ${
            isHomePage
              ? 'is-home-layout'
              : location.pathname.startsWith('/team')
              ? 'is-team-layout'
              : ''
          }`}
          style={{ flexGrow: 1 }}
        >
          <Outlet />
        </main>

        <Footer />
        <GalleryLightbox item={activeLightboxItem} onClose={closeLightbox} />
      </div>
    </LightboxContext.Provider>
  );
}

export default RootLayout;
