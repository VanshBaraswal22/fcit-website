import React, { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import SectionLabel from '../components/SectionLabel';
import Stamp from '../textures/Stamp';
import PrintRegistrationMarks from '../textures/PrintRegistrationMarks';
import HalftonePattern from '../textures/HalftonePattern';
import { activities } from '../data/activitiesData';

export function ActivitiesPage() {
  const [activeDomain, setActiveDomain] = useState(activities[0].id);
  const current = activities.find(a => a.id === activeDomain) || activities[0];

  return (
    <div className="activities-page paper-grain" style={{ backgroundColor: 'var(--color-antique-parchment)', minHeight: '100vh' }}>
      <div className="section-shell" style={{ paddingTop: '32px', paddingBottom: 'clamp(56px, 8vw, 96px)' }}>
        <Breadcrumbs items={[{ label: 'TECHNICAL DOMAINS' }]} />

        {/* Masthead Header */}
        <div style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          <PrintRegistrationMarks folio="CURRICULA-INDEX / 8 DOMAINS" />
          <SectionLabel number="03">DOMAINS &amp; WORKING GROUPS</SectionLabel>

          <h1
            className="section-title-editorial"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5rem)', lineHeight: 1.05, maxWidth: '980px', marginBottom: '20px' }}
          >
            Eight disciplines of computing.<br />
            One uncompromising <em>standard.</em>
          </h1>

          <p className="section-lead-editorial" style={{ maxWidth: '780px' }}>
            Rather than generic tutorials, FCIT organizes its peer-led learning around eight disciplined engineering circles. Select any domain below to inspect its focus topics, tools, and flagship projects.
          </p>
        </div>

        {/* Interactive Domain Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            borderBottom: '2px solid var(--border-medium)',
            paddingBottom: '16px',
            marginBottom: '40px',
          }}
        >
          {activities.map((item) => {
            const isSelected = item.id === activeDomain;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveDomain(item.id)}
                style={{
                  padding: '10px 18px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: isSelected ? '1px solid var(--color-crimson-red)' : '1px solid var(--border-light)',
                  backgroundColor: isSelected ? 'var(--color-crimson-red)' : 'var(--color-warm-ivory)',
                  color: isSelected ? 'var(--color-warm-ivory)' : 'var(--color-carbon-black)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontWeight: isSelected ? 600 : 400,
                }}
              >
                <span>[{item.number}] {item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Domain Deep Dive Editorial Spread */}
        <div
          className="editorial-card paper-grain"
          style={{
            backgroundColor: 'var(--color-warm-ivory)',
            border: '2px solid var(--border-medium)',
            padding: 'clamp(28px, 5vw, 56px)',
            position: 'relative',
            marginBottom: 'clamp(56px, 8vw, 84px)',
          }}
        >
          <HalftonePattern type="corner" position="br" color="crimson" />

          {/* Topline Info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid var(--border-light)', paddingBottom: '18px', marginBottom: '28px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--color-crimson-red)', letterSpacing: '0.14em', fontWeight: 600 }}>
              DOMAIN [{current.number}] · {current.domain}
            </div>
            <span style={{ fontSize: '1.5rem' }} aria-hidden="true">{current.icon}</span>
          </div>

          {/* Main Title & Description */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'start', marginBottom: '40px' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 400, lineHeight: 1.12, color: 'var(--color-carbon-black)', marginBottom: '18px' }}>
                {current.title}
              </h2>
              <p style={{ fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--color-charcoal)', marginBottom: '24px' }}>
                {current.fullDesc}
              </p>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--color-graphite)', backgroundColor: 'var(--color-antique-parchment)', padding: '12px 18px', borderLeft: '3px solid var(--color-crimson-red)' }}>
                <strong>MEETING CADENCE:</strong> {current.cadence}
              </div>
            </div>

            {/* Topics & Tools Checklist */}
            <div style={{ backgroundColor: 'var(--color-antique-parchment)', border: '1px solid var(--border-medium)', padding: '28px' }}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.16em', color: 'var(--color-crimson-red)', textTransform: 'uppercase', marginBottom: '16px' }}>
                CORE SYLLABUS &amp; RESEARCH TOPICS
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {current.topics.map((t, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9375rem', color: 'var(--color-carbon-black)' }}>
                    <span style={{ color: 'var(--color-crimson-red)', fontFamily: 'var(--font-mono)' }}>0{idx + 1}.</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.16em', color: 'var(--color-crimson-red)', textTransform: 'uppercase', marginBottom: '12px' }}>
                RECOMMENDED TOOLING
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {current.tools.map((tool) => (
                  <span key={tool} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', padding: '4px 10px', backgroundColor: 'var(--color-warm-ivory)', border: '1px solid var(--border-medium)' }}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Flagship Project Footer */}
          <div style={{ borderTop: '1px solid var(--border-medium)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--color-charcoal)' }}>
              <span style={{ color: 'var(--color-crimson-red)', fontWeight: 600 }}>FLAGSHIP INITIATIVE:</span> {current.flagshipProject}
            </div>
          </div>
        </div>

        {/* All Domains Quick Broadside Overview */}
        <div style={{ borderTop: '2px solid var(--border-medium)', paddingTop: '48px' }}>
          <SectionLabel number="03.B">THE FULL BROADSIDE DIRECTORY</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '24px' }}>
            {activities.map((a) => (
              <div
                key={a.id}
                style={{
                  border: '1px solid var(--border-light)',
                  backgroundColor: 'var(--color-warm-ivory)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--color-crimson-red)', fontWeight: 600 }}>
                    [{a.number}]
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-carbon-black)', margin: '6px 0' }}>
                    {a.title}
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-charcoal)', lineHeight: 1.55 }}>
                    {a.shortDesc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveDomain(a.id);
                    window.scrollTo({ top: 380, behavior: 'smooth' });
                  }}
                  style={{
                    marginTop: '14px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--color-crimson-red)',
                    textAlign: 'left',
                    fontWeight: 600,
                  }}
                >
                  Select &amp; Inspect Details ↑
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivitiesPage;
