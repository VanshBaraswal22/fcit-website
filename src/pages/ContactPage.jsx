import React, { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import SectionLabel from '../components/SectionLabel';
import Stamp from '../textures/Stamp';
import PrintRegistrationMarks from '../textures/PrintRegistrationMarks';
import HalftonePattern from '../textures/HalftonePattern';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'Where do FCIT build sessions and workshops take place?',
      a: 'Physical sessions are hosted in the Department of Computer Science & Engineering, primarily in Lab 204 (Systems & Software Lab) and the Radhakrishnan Seminar Hall on HBTU East Campus, Nawabganj, Kanpur.',
    },
    {
      q: 'Who is eligible to participate in FCIT hackathons and salons?',
      a: 'All enrolled undergraduate and postgraduate students of Harcourt Butler Technical University across any engineering discipline are welcome. Certain specialized advanced research tracks may require basic prerequisites in C++ or Python.',
    },
    {
      q: 'How can external organizations or alumni propose collaborations?',
      a: 'Alumni and industry partners can write directly to our official communication channels at fcit@hbtu.ac.in or initiate an inquiry through the form below.',
    },
  ];

  return (
    <div
      className="contact-page paper-grain"
      style={{
        backgroundColor: 'var(--color-antique-parchment)',
        color: 'var(--color-ink-dark)',
        minHeight: '100vh',
      }}
    >
      <div className="section-shell" style={{ paddingTop: '32px', paddingBottom: 'clamp(56px, 8vw, 96px)' }}>
        <Breadcrumbs items={[{ label: 'CAMPUS INQUIRIES & CONTACT' }]} />

        {/* Masthead Header */}
        <div style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          <PrintRegistrationMarks folio="DISPATCH-CHANNEL / HBTU-CSE-2025" />
          <SectionLabel number="10">OFFICIAL COMMUNICATION</SectionLabel>

          <h1
            className="section-title-editorial"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5rem)', lineHeight: 1.05, maxWidth: '1000px', marginBottom: '20px' }}
          >
            Start a conversation with the <em>fraternity.</em>
          </h1>

          <p className="section-lead-editorial" style={{ maxWidth: '820px' }}>
            Whether you are an HBTU student seeking guidance, an alumnus wishing to mentor, or an engineering team proposing a joint research sprint, our communications desk is open.
          </p>
        </div>

        {/* Two-Column Grid: Left Dispatch Metadata, Right Inquiry Form */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'start', marginBottom: '64px' }}>
          {/* Left Column: Campus Dispatch Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="editorial-card paper-grain" style={{ border: '2px solid var(--border-medium)', padding: '32px', backgroundColor: 'var(--color-warm-ivory)', position: 'relative' }}>
              <HalftonePattern type="corner" position="br" color="crimson" />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-primary-crimson)', letterSpacing: '0.14em', marginBottom: '14px', fontWeight: 600 }}>
                PHYSICAL CAMPUS DESK
              </div>
              <div style={{ marginBottom: '18px', border: '1px solid var(--border-medium)', overflow: 'hidden' }}>
                <img
                  src="/images/cse-department-building.jpg"
                  alt="Department of Computer Science & Engineering Building Facade, HBTU East Campus"
                  style={{ width: '100%', height: '190px', objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                />
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 400, color: 'var(--color-ink-dark)', marginBottom: '14px' }}>
                Department of Computer Science &amp; Engineering
              </h2>
              <address style={{ fontStyle: 'normal', fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--color-ink-charcoal)' }}>
                Harcourt Butler Technical University<br />
                East Campus, Nawabganj<br />
                Kanpur, Uttar Pradesh 208002, India
              </address>

              <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-light)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>
                <div>OFFICIAL EMAIL: <span style={{ color: 'var(--color-primary-crimson)', fontWeight: 600 }}>fcit@hbtu.ac.in</span></div>
                <div>OFFICE HOURS: <span style={{ color: 'var(--color-ink-graphite)' }}>Mon–Fri, 16:30 – 19:00 IST</span></div>
              </div>
            </div>

            <div className="editorial-card" style={{ border: '1px solid var(--border-medium)', padding: '24px', backgroundColor: 'var(--color-soft-cream)' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-aged-gold)', fontWeight: 600 }}>
                  STUDENT WORKING SPACE
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--color-ink-dark)', marginTop: '4px' }}>
                  Computing Centre &amp; Lab 204
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form in Warm Ivory */}
          <div
            className="editorial-card paper-grain"
            style={{
              backgroundColor: 'var(--color-warm-ivory)',
              border: '2px solid var(--border-medium)',
              padding: 'clamp(28px, 5vw, 44px)',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-primary-crimson)', letterSpacing: '0.14em', marginBottom: '8px', fontWeight: 600 }}>
              TRANSMIT DISPATCH
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 400, color: 'var(--color-ink-dark)', marginBottom: '8px' }}>
              Send an inquiry to the council.
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-ink-charcoal)', marginBottom: '24px' }}>
              This form routes your inquiry to the student council and faculty advisory coordinator.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <div className="editorial-form-group">
                  <input
                    required
                    type="text"
                    id="contact-name"
                    className="editorial-input"
                    placeholder=" "
                  />
                  <label htmlFor="contact-name" className="editorial-floating-label">YOUR FULL NAME *</label>
                  <span className="editorial-input-underline" aria-hidden="true" />
                </div>

                <div className="editorial-form-group">
                  <input
                    required
                    type="email"
                    id="contact-email"
                    className="editorial-input"
                    placeholder=" "
                  />
                  <label htmlFor="contact-email" className="editorial-floating-label">EMAIL ADDRESS *</label>
                  <span className="editorial-input-underline" aria-hidden="true" />
                </div>

                <div className="editorial-form-group" style={{ marginBottom: '18px' }}>
                  <label htmlFor="contact-class" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-navy-muted)', marginBottom: '8px' }}>
                    INQUIRY CLASSIFICATION *
                  </label>
                  <select
                    id="contact-class"
                    required
                    style={{
                      width: '100%',
                      padding: '10px 0',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid var(--border-medium)',
                      color: 'var(--color-dark-navy)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                  >
                    <option value="student-inquiry">HBTU Student Inquiry / Questions</option>
                    <option value="hackathon-partner">Hackathon Partnership or Mentorship</option>
                    <option value="alumni-advisory">Alumni Collaboration &amp; Talks</option>
                    <option value="academic-research">Academic Research &amp; Paper Collaboration</option>
                    <option value="other">General Department Inquiry</option>
                  </select>
                  <span className="editorial-input-underline" aria-hidden="true" />
                </div>

                <div className="editorial-form-group">
                  <textarea
                    required
                    rows="4"
                    id="contact-msg"
                    className="editorial-textarea"
                    placeholder=" "
                    style={{ resize: 'vertical' }}
                  />
                  <label htmlFor="contact-msg" className="editorial-floating-label">YOUR MESSAGE *</label>
                  <span className="editorial-input-underline" aria-hidden="true" />
                </div>

                <button
                  type="submit"
                  className="btn-editorial btn-editorial-crimson magnetic"
                  style={{ padding: '14px', width: '100%', marginTop: '8px' }}
                >
                  <span>Dispatch Communication</span>
                  <span>↗</span>
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '36px 20px', backgroundColor: 'var(--color-soft-cream)', border: '1px solid var(--color-heritage-gold)' }}>
                <span style={{ fontSize: '32px', color: 'var(--color-primary-crimson)' }}>✓</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginTop: '10px', color: 'var(--color-ink-dark)' }}>
                  Dispatch Received
                </h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--color-ink-charcoal)', marginTop: '8px' }}>
                  Thank you for reaching out to the Fraternity of Computer Science &amp; IT. A council member will respond via email shortly.
                </p>
                <div style={{ marginTop: '20px' }}>
                  <Stamp text="LOGGED TO GAZETTE" subtext="HBTU KANPUR" variant="gold" rotate="0deg" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div style={{ borderTop: '2px solid var(--border-medium)', paddingTop: '48px' }}>
          <SectionLabel number="FAQ">FREQUENTLY ASKED QUESTIONS</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px', marginTop: '24px' }}>
            {faqs.map((faq, i) => (
              <div key={i} className="editorial-card" style={{ borderLeft: '3px solid var(--color-primary-crimson)', padding: '24px', backgroundColor: 'var(--color-warm-ivory)' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-ink-dark)', marginBottom: '8px' }}>
                  {faq.q}
                </h3>
                <p style={{ fontSize: '0.925rem', lineHeight: 1.6, color: 'var(--color-ink-charcoal)' }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
