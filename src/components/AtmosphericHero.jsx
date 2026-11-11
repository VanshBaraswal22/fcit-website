import React, { useLayoutEffect, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { isHeroIntroCompleted, setHeroIntroCompleted } from "../utils/introState";
import "./atmospheric-hero.css";

export default function AtmosphericHero() {
  const root = useRef(null);
  const back = useRef(null);
  const front = useRef(null);
  const logo = useRef(null);
  const affiliation = useRef(null);
  const title = useRef(null);
  const copy = useRef(null);
  const actions = useRef(null);

  // Tab visibility pause to prevent background CPU usage
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        root.current?.classList.add("is-paused");
      } else {
        root.current?.classList.remove("is-paused");
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(root);

    mm.add(
      {
        desktop: "(min-width: 769px)",
        mobile: "(max-width: 768px)",
        reduced: "(prefers-reduced-motion: reduce)"
      },
      (context) => {
        const { desktop, mobile, reduced } = context.conditions;

        let cleanupPointer = null;

        // Desktop motion: two image layers at distinct speeds
        if (desktop) {
          gsap.to(back.current, {
            xPercent: -2.5,
            yPercent: 1.2,
            scale: 1.06,
            duration: 68,
            ease: "none",
            repeat: -1,
            yoyo: true
          });
          gsap.to(front.current, {
            xPercent: 2.5,
            yPercent: -1.2,
            scale: 1.08,
            duration: 84,
            ease: "none",
            repeat: -1,
            yoyo: true
          });

          // Gentle desktop pointer parallax (only if fine pointer exists, limited to 5-8px)
          if (window.matchMedia("(pointer: fine)").matches) {
            const handlePointer = (e) => {
              const xN = (e.clientX / window.innerWidth - 0.5) * 8;
              const yN = (e.clientY / window.innerHeight - 0.5) * 5;
              if (back.current) {
                gsap.to(back.current, { x: -xN, y: -yN, duration: 1.2, ease: "power1.out", overwrite: "auto" });
              }
              if (front.current) {
                gsap.to(front.current, { x: xN * 1.4, y: yN * 1.4, duration: 1.4, ease: "power1.out", overwrite: "auto" });
              }
            };
            window.addEventListener("pointermove", handlePointer, { passive: true });
            cleanupPointer = () => window.removeEventListener("pointermove", handlePointer);
          }
        } else if (mobile) {
          // Mobile motion: single layer, subtle movement, no pointer parallax
          gsap.to(back.current, {
            xPercent: -1.2,
            scale: 1.04,
            duration: 78,
            ease: "none",
            repeat: -1,
            yoyo: true
          });
        }

        // ============================================================================
        // ANIMATION SEQUENCE:
        // 1. Top banner/background appears.
        // 2. FCIT branding & introductory elements reveal.
        // 3. Main typography animates into position.
        // 4. Supporting elements appear.
        // 5. Introductory composition settles into final state.
        // 6. Normal scrolling continues into remaining sections.
        // ============================================================================
        if (reduced) {
          gsap.set([logo.current, affiliation.current, title.current, copy.current, actions.current], {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            clipPath: "none",
            clearProps: "all"
          });
          setHeroIntroCompleted(true, 'reduced-motion');
        } else if (isHeroIntroCompleted()) {
          // Intro already ran in this session: maintain final settled state without replaying
          gsap.set([logo.current, affiliation.current, title.current, copy.current, actions.current], {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            clipPath: "none",
            clearProps: "all"
          });
        } else {
          const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
            onComplete: () => {
              setHeroIntroCompleted(true, 'gsap-timeline-onComplete');
            }
          });

          // Step 1: Top banner & background appear
          const bgElements = [
            back.current,
            front.current,
            root.current?.querySelector(".fcit-atmosphere__light"),
            root.current?.querySelector(".fcit-atmosphere__shade")
          ].filter(Boolean);

          if (bgElements.length > 0) {
            tl.fromTo(
              bgElements,
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.8, ease: "power2.out" },
              0.0
            );
          }

          // Step 2: FCIT branding & introductory elements reveal
          tl.fromTo(
            logo.current,
            { autoAlpha: 0, y: 22, scale: 0.86 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.75, ease: "power2.out" },
            0.3
          );
          tl.fromTo(
            affiliation.current,
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.65, ease: "power2.out" },
            0.5
          );

          // Step 3: Main typography animates into position
          tl.fromTo(
            title.current,
            { autoAlpha: 0, y: 35, clipPath: "inset(0 0 100% 0)" },
            { autoAlpha: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "power3.out" },
            0.8
          );

          // Step 4: Supporting elements appear
          tl.fromTo(
            copy.current,
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
            1.25
          );
          tl.fromTo(
            actions.current,
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" },
            1.5
          );

          // Step 5: Introductory composition settles into final state
          // Step 6: Normal scrolling continues into remaining sections
        }

        return () => {
          if (cleanupPointer) cleanupPointer();
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section className="fcit-atmosphere" ref={root} aria-labelledby="fcit-atmosphere-title">
      <div ref={back} className="fcit-atmosphere__layer fcit-atmosphere__layer--back" aria-hidden="true" />
      <div ref={front} className="fcit-atmosphere__layer fcit-atmosphere__layer--front" aria-hidden="true" />
      <div className="fcit-atmosphere__light" aria-hidden="true" />
      <div className="fcit-atmosphere__shade" aria-hidden="true" />
      <div className="fcit-atmosphere__bottom-fade" aria-hidden="true" />

      <div className="fcit-atmosphere__content">
        <img
          ref={logo}
          className="fcit-atmosphere__logo"
          src="/images/fcit-logo-circle-512.png"
          alt="FCIT emblem"
          width="76"
          height="76"
          loading="eager"
        />

        {/* Institutional Affiliation Hierarchy: Primary Department, Secondary University */}
        <div className="fcit-atmosphere__affiliation" ref={affiliation}>
          <p className="fcit-atmosphere__dept">DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING</p>
          <p className="fcit-atmosphere__univ">Harcourt Butler Technical University · Kanpur</p>
        </div>

        <h1 id="fcit-atmosphere-title" ref={title}>
          IDEAS, <span>ENGINEERED.</span>
        </h1>

        <p className="fcit-atmosphere__copy" ref={copy}>
          FCIT is the student-driven technical fraternity of the Department of Computer Science and Engineering, HBTU, bringing together curious minds to learn, collaborate and build meaningful technology.
        </p>

        <div className="fcit-atmosphere__actions" ref={actions}>
          <Link className="fcit-atmosphere__button" to="/about">Discover FCIT</Link>
          <a className="fcit-atmosphere__text-link" href="#guilds">Explore Working Guilds</a>
        </div>
      </div>
    </section>
  );
}
