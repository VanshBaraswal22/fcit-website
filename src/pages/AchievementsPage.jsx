import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import SectionLabel from '../components/SectionLabel';
import CountUp from '../components/CountUp';
import Stamp from '../textures/Stamp';
import PrintRegistrationMarks from '../textures/PrintRegistrationMarks';
import HalftonePattern from '../textures/HalftonePattern';
import { achievements } from '../data/achievementsData';

export function AchievementsPage() {
  return (
    <div className="achievements-page paper-grain" style={{ backgroundColor: 'var(--color-antique-parchment)', minHeight: '100vh' }}>
      <div className="section-shell" style={{ paddingTop: '32px', paddingBottom: 'clamp(56px, 8vw, 96px)' }}>
        <Breadcrumbs items={[{ label: 'HONORS & AWARDS' }]} />

        {/* Masthead Header */}
        <div style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          <PrintRegistrationMarks folio="ROLL-OF-HONOR / HBTU KANPUR" />
          <SectionLabel number="06">PODIUMS &amp; DISTINCTIONS</SectionLabel>

          <h1
            className="section-title-editorial"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5rem)', lineHeight: 1.05, maxWidth: '1000px', marginBottom: '20px' }}
          >
            The hall of merit and competition <em>honors.</em>
          </h1>

          <p className="section-lead-editorial" style={{ maxWidth: '820px' }}>
            A verified editorial record of competitive programming qualifiers, national hackathon podiums, global open-source fellowships, and peer-reviewed scholarly acceptances earned by students of HBTU Computer Science &amp; IT.
          </p>
        </div>

        {/* Big Statistics Overview Bar with Count-Up Numbers */}
        <div
          className="stagger-group"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '20px',
            backgroundColor: 'var(--color-warm-ivory)',
            color: 'var(--color-ink-dark)',
            padding: 'clamp(24px, 4vw, 36px)',
            marginBottom: '48px',
            border: '2px solid var(--color-heritage-gold)',
            boxShadow: '4px 4px 0px var(--color-pale-gold)',
          }}
        >
          <div className="stagger-item">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--color-primary-crimson)', letterSpacing: '0.12em', fontWeight: 600 }}>
              NATIONAL PODIUMS
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', fontWeight: 600, color: 'var(--color-primary-crimson)', lineHeight: 1, marginTop: '8px' }}>
              <CountUp end={42} suffix="+" />
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-ink-charcoal)', marginTop: '4px' }}>Smart India &amp; Hackathon Honors</div>
          </div>

          <div className="stagger-item">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--color-aged-gold)', letterSpacing: '0.12em', fontWeight: 600 }}>
              ICPC REGIONALS
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', fontWeight: 600, color: 'var(--color-ink-dark)', lineHeight: 1, marginTop: '8px' }}>
              TOP <CountUp end={5} suffix="%" />
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-ink-charcoal)', marginTop: '4px' }}>Amritapuri &amp; Kanpur Onsites</div>
          </div>

          <div className="stagger-item">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--color-aged-gold)', letterSpacing: '0.12em', fontWeight: 600 }}>
              GLOBAL FELLOWSHIPS
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', fontWeight: 600, color: 'var(--color-aged-gold)', lineHeight: 1, marginTop: '8px' }}>
              <CountUp end={18} suffix="+" />
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-ink-charcoal)', marginTop: '4px' }}>GSoC &amp; Linux Foundation Selectees</div>
          </div>

          <div className="stagger-item">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--color-primary-crimson)', letterSpacing: '0.12em', fontWeight: 600 }}>
              STUDENT PAPERS
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', fontWeight: 600, color: 'var(--color-ink-dark)', lineHeight: 1, marginTop: '8px' }}>
              <CountUp end={24} suffix="+" />
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-ink-charcoal)', marginTop: '4px' }}>IEEE &amp; Peer-Reviewed Acceptances</div>
          </div>
        </div>

        {/* Detailed Achievements List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {achievements.map((ach) => (
            <article
              key={ach.id}
              className="editorial-card paper-grain"
              style={{
                backgroundColor: 'var(--color-warm-ivory)',
                border: '1px solid var(--border-medium)',
                borderLeft: '4px solid var(--color-heritage-gold)',
                padding: 'clamp(24px, 4vw, 40px)',
                position: 'relative',
              }}
            >
              <HalftonePattern type="corner" position="br" color={ach.accentColor === '#B31419' ? 'crimson' : 'black'} />

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '36px', alignItems: 'center' }}>
                {/* Visual Area */}
                <div style={{ position: 'relative', height: '220px', backgroundColor: 'var(--color-soft-cream)', border: '1px solid var(--border-medium)', overflow: 'hidden' }}>
                  <img
                    src={ach.image}
                    alt={ach.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(115%)' }}
                  />
                  <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                    <Stamp text={ach.badge} subtext={ach.year} variant={ach.accentColor === '#D6B33F' ? 'gold' : 'crimson'} rotate="-2deg" />
                  </div>
                  <div style={{ position: 'absolute', bottom: '12px', right: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--color-ink-dark)', backgroundColor: 'var(--color-warm-ivory)', border: '1px solid var(--border-medium)', padding: '4px 8px' }}>
                    CITATION NO. [{ach.number}]
                  </div>
                </div>

                {/* Narrative Area */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-primary-crimson)', letterSpacing: '0.14em', fontWeight: 600 }}>
                      [{ach.number}] {ach.category}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--color-ink-graphite)' }}>
                      • {ach.date}
                    </span>
                  </div>

                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 500, color: 'var(--color-ink-dark)', marginBottom: '8px', lineHeight: 1.15 }}>
                    {ach.title}
                  </h2>

                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-aged-gold)', letterSpacing: '0.1em', marginBottom: '14px', fontWeight: 600 }}>
                    {ach.citation}
                  </div>

                  <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--color-ink-charcoal)', marginBottom: '14px' }}>
                    {ach.summary}
                  </p>

                  <div style={{ backgroundColor: 'var(--color-soft-cream)', padding: '12px 16px', borderLeft: '3px solid var(--color-primary-crimson)', marginBottom: '16px' }}>
                    <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--color-primary-crimson)', textTransform: 'uppercase' }}>MEASURABLE IMPACT:</strong>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-ink-charcoal)', marginTop: '4px' }}>
                      {ach.impact}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '10px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--color-ink-graphite)' }}>
                      CREDIT: {ach.teamLabel}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--color-primary-crimson)', fontWeight: 600 }}>
                      ✓ {ach.verificationTag}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AchievementsPage;
