import React from 'react';
import { Link } from 'react-router-dom';
import SectionLabel from '../components/SectionLabel';
import Breadcrumbs from '../components/Breadcrumbs';
import HalftonePattern from '../textures/HalftonePattern';

export function AboutPage() {
  const milestones = [
    { year: '1921', title: 'Founding of the Institution', desc: 'Government Technological Institute established in Kanpur, laying the bedrock for century-long engineering excellence in northern India.' },
    { year: '1984', title: 'Advent of Computer Education', desc: 'Formal computing and systems curriculum introduced at the university, training northern India’s early software engineers.' },
    { year: '2016', title: 'University Status & Department Expansion', desc: 'HBTI transitions to Harcourt Butler Technical University (HBTU); creation of dedicated CSE and IT research laboratories.' },
    { year: 'Present', title: 'FCIT: The Autonomous Technical Guild', desc: 'Fraternity of Computer Science & IT consolidates student-led initiatives into 8 specialized technical domains, hackathons, and open source.' },
  ];

  return (
    <div className="about-page paper-grain" style={{ backgroundColor: 'var(--color-antique-parchment)', minHeight: '100vh' }}>
      <div className="section-shell" style={{ paddingTop: '32px', paddingBottom: 'clamp(56px, 8vw, 96px)' }}>
        <Breadcrumbs items={[{ label: 'ABOUT' }]} />

        {/* Masthead Header */}
        <div style={{ marginBottom: 'clamp(40px, 6vw, 72px)', position: 'relative' }}>
          <SectionLabel>ABOUT THE FRATERNITY</SectionLabel>

          <h1
            className="section-title-editorial"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5rem)', lineHeight: 1.05, maxWidth: '1000px', marginBottom: '24px' }}
          >
            MORE THAN A TECHNICAL COMMUNITY.<br />
            <em>A collective of builders.</em>
          </h1>

          <p className="section-lead-editorial" style={{ maxWidth: '820px' }}>
            The Fraternity of Computer Science &amp; IT (FCIT) is the student-led technology society of the Department of Computer Science &amp; Engineering at Harcourt Butler Technical University, Kanpur.
          </p>
        </div>

        {/* Magazine Editorial Spread 01 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(36px, 5vw, 64px)',
            alignItems: 'start',
            marginBottom: 'clamp(48px, 8vw, 84px)',
          }}
        >
          {/* Left Column: Text Essay */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '20px', color: 'var(--color-ink-dark)' }}>
              Where academic rigor meets modern open software culture.
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--color-ink-charcoal)', marginBottom: '20px' }}>
              HBTU’s red-brick buildings and quiet tree-lined avenues in Nawabganj have housed technical minds for over one hundred years. Yet the nature of computer science demands constant reinvention. Algorithms conceived in the 1950s now execute across clusters of tens of thousands of GPUs; programming languages evolve with each passing year.
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--color-ink-charcoal)', marginBottom: '28px' }}>
              FCIT was created by students to ensure that academic coursework is immediately accompanied by hands-on engineering, open-source pull requests, research salons, and collaborative hackathons.
            </p>

            <div
              style={{
                border: '1px solid var(--border-medium)',
                backgroundColor: 'var(--color-warm-ivory)',
                padding: '24px',
                position: 'relative',
              }}
            >
              <HalftonePattern type="corner" position="br" color="black" />
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--color-primary-crimson)', letterSpacing: '0.08em', marginBottom: '8px', textTransform: 'uppercase', fontWeight: 600 }}>
                OUR CORE PRINCIPLES
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9375rem', color: 'var(--color-ink-dark)' }}>
                <li><strong>1. Open Pedagogy:</strong> Senior students mentor juniors; no gatekeeping of knowledge.</li>
                <li><strong>2. Code in Public:</strong> Every line of project work is published as open source under permissive licenses.</li>
                <li><strong>3. Independent Rigor:</strong> We benchmark systems against genuine data, refusing superficial metrics.</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Architectural Photography Card */}
          <div style={{ position: 'relative' }}>
            <div
              className="editorial-card"
              style={{
                backgroundColor: 'var(--color-warm-ivory)',
                padding: '18px',
                border: '1px solid var(--border-medium)',
              }}
            >
              <img
                src="/images/cse-department-building.jpg"
                alt="Department of Computer Science & Engineering Building Facade, HBTU East Campus"
                style={{ width: '100%', height: 'auto', border: '1px solid var(--border-light)', marginBottom: '14px', objectFit: 'cover' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--color-ink-charcoal)', fontWeight: 500 }}>
                  East Campus · Department of CSE &amp; IT
                </span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--color-aged-gold)', fontWeight: 600 }}>
                  EST. 1921
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Timeline */}
        <div
          style={{
            borderTop: '2px solid var(--border-medium)',
            paddingTop: 'clamp(40px, 6vw, 64px)',
            marginBottom: 'clamp(48px, 8vw, 84px)',
          }}
        >
          <SectionLabel>CHRONOLOGY &amp; EVOLUTION</SectionLabel>
          <h2 className="section-title-editorial" style={{ marginBottom: '40px' }}>
            A century of foundation, decades of <em>computing.</em>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '28px' }}>
            {milestones.map((item, idx) => (
              <div
                key={idx}
                style={{
                  borderLeft: '2px solid var(--color-primary-crimson)',
                  paddingLeft: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 600, color: 'var(--color-primary-crimson)', lineHeight: 1 }}>
                    {item.year}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 500, color: 'var(--color-ink-dark)', marginTop: '8px', marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: 'var(--color-ink-charcoal)' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Faculty Advisory & Patronage Note */}
        <div
          className="editorial-card paper-grain"
          style={{
            backgroundColor: 'var(--color-warm-ivory)',
            border: '1px solid var(--border-medium)',
            padding: 'clamp(28px, 5vw, 48px)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--color-primary-crimson)', letterSpacing: '0.08em', fontWeight: 600, textTransform: 'uppercase' }}>
              INSTITUTIONAL GUIDANCE
            </span>
          </div>

          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', fontWeight: 400, color: 'var(--color-ink-dark)', marginBottom: '14px' }}>
            Under the guidance of the Department of Computer Science &amp; Engineering.
          </h3>
          <p style={{ fontSize: '1.02rem', lineHeight: 1.7, color: 'var(--color-ink-charcoal)', maxWidth: '800px', marginBottom: '24px' }}>
            FCIT operates with the active guidance of the faculty and administration of HBTU. Our laboratory sessions, hackathon nights, and research colloquia are hosted in the Radhakrishnan Auditorium and Department Computing Centre.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/team" className="btn-editorial btn-editorial-crimson magnetic">
              <span>Meet the Team</span>
              <span>↗</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
