import React, { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import SectionLabel from '../components/SectionLabel';
import Stamp from '../textures/Stamp';
import PrintRegistrationMarks from '../textures/PrintRegistrationMarks';
import HalftonePattern from '../textures/HalftonePattern';

export function JoinPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNo: '',
    branchYear: '1st-cse',
    domain: 'software-web',
    github: '',
    experience: 'intermediate',
    statement: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedId = `FCIT-REG-${Math.floor(100000 + Math.random() * 900000)}`;
    setReceiptNumber(generatedId);
    setSubmitted(true);
  };

  return (
    <div className="join-page paper-grain" style={{ backgroundColor: 'var(--color-antique-parchment)', minHeight: '100vh' }}>
      <div className="section-shell" style={{ paddingTop: '32px', paddingBottom: 'clamp(56px, 8vw, 96px)' }}>
        <Breadcrumbs items={[{ label: 'APPLY FOR MEMBERSHIP' }]} />

        {/* Masthead Header */}
        <div style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          <PrintRegistrationMarks folio="ENROLLMENT-COHORT / SESSION 2024-2025" />
          <SectionLabel number="11">MEMBERSHIP PETITION</SectionLabel>

          <h1
            className="section-title-editorial"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5rem)', lineHeight: 1.05, maxWidth: '1000px', marginBottom: '20px' }}
          >
            Become a part of the <em>fraternity.</em>
          </h1>

          <p className="section-lead-editorial" style={{ maxWidth: '820px' }}>
            We look for students driven by relentless curiosity, intellectual honesty, and the hunger to turn ideas into functional, deployed software. Membership is open to all students enrolled at Harcourt Butler Technical University.
          </p>
        </div>

        {/* Admission Values / What We Expect */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          <div style={{ backgroundColor: 'var(--color-warm-ivory)', border: '1px solid var(--border-medium)', padding: '24px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--color-crimson-red)', fontWeight: 600 }}>01. CURIOSITY</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', margin: '8px 0', color: 'var(--color-carbon-black)' }}>Ask the hard questions.</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--color-charcoal)' }}>We value candidates who strive to understand how systems operate under the hood, rather than just copying boilerplates.</p>
          </div>

          <div style={{ backgroundColor: 'var(--color-warm-ivory)', border: '1px solid var(--border-medium)', padding: '24px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--color-crimson-red)', fontWeight: 600 }}>02. COMMITMENT</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', margin: '8px 0', color: 'var(--color-carbon-black)' }}>Consistent lab presence.</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--color-charcoal)' }}>Members attend weekly working group circles, contribute to sprint codebases, and participate in peer reviews.</p>
          </div>

          <div style={{ backgroundColor: 'var(--color-warm-ivory)', border: '1px solid var(--border-medium)', padding: '24px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--color-crimson-red)', fontWeight: 600 }}>03. COMMUNITY</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', margin: '8px 0', color: 'var(--color-carbon-black)' }}>Teach what you learn.</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--color-charcoal)' }}>No elitism or hoarding of knowledge. Every senior is expected to guide incoming juniors through their first roadblocks.</p>
          </div>
        </div>

        {/* Application Form or Receipt */}
        <div
          className="editorial-card paper-grain"
          style={{
            backgroundColor: 'var(--color-warm-ivory)',
            border: '2px solid var(--border-medium)',
            padding: 'clamp(28px, 5vw, 64px)',
            maxWidth: '880px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          <HalftonePattern type="corner" position="br" color="crimson" />

          {!submitted ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid var(--border-medium)', paddingBottom: '16px', marginBottom: '32px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-crimson-red)', letterSpacing: '0.14em', fontWeight: 600 }}>
                  OFFICIAL PETITION FOR ADMISSION · FORM 2024-C
                </span>
                <Stamp text="FCIT ENROLLMENT" subtext="HBTU KANPUR" variant="crimson" rotate="-2deg" />
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Personal Information */}
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 500, color: 'var(--color-carbon-black)', marginBottom: '14px' }}>
                    1. Applicant Identification
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '22px' }}>
                    <div className="editorial-form-group">
                      <input
                        required
                        type="text"
                        name="name"
                        id="join-name"
                        className="editorial-input"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder=" "
                      />
                      <label htmlFor="join-name" className="editorial-floating-label">FULL NAME *</label>
                      <span className="editorial-input-underline" aria-hidden="true" />
                    </div>

                    <div className="editorial-form-group">
                      <input
                        required
                        type="email"
                        name="email"
                        id="join-email"
                        className="editorial-input"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder=" "
                      />
                      <label htmlFor="join-email" className="editorial-floating-label">HBTU EMAIL *</label>
                      <span className="editorial-input-underline" aria-hidden="true" />
                    </div>

                    <div className="editorial-form-group">
                      <input
                        required
                        type="text"
                        name="rollNo"
                        id="join-roll"
                        className="editorial-input"
                        value={formData.rollNo}
                        onChange={handleChange}
                        placeholder=" "
                      />
                      <label htmlFor="join-roll" className="editorial-floating-label">ROLL NUMBER *</label>
                      <span className="editorial-input-underline" aria-hidden="true" />
                    </div>

                    <div className="editorial-form-group">
                      <label htmlFor="join-branch" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-navy-muted)', marginBottom: '8px' }}>
                        ACADEMIC COHORT &amp; BRANCH *
                      </label>
                      <select
                        id="join-branch"
                        name="branchYear"
                        value={formData.branchYear}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px 0', border: 'none', borderBottom: '1px solid var(--border-medium)', backgroundColor: 'transparent', color: 'var(--color-dark-navy)', outline: 'none' }}
                      >
                        <option value="1st-cse">1st Year · B.Tech CSE</option>
                        <option value="1st-it">1st Year · B.Tech IT</option>
                        <option value="2nd-cse">2nd Year · B.Tech CSE</option>
                        <option value="2nd-it">2nd Year · B.Tech IT</option>
                        <option value="3rd-cse">3rd Year · B.Tech CSE</option>
                        <option value="3rd-it">3rd Year · B.Tech IT</option>
                        <option value="4th-cse">4th Year · B.Tech CSE</option>
                        <option value="4th-it">4th Year · B.Tech IT</option>
                        <option value="mca">MCA · Computer Applications</option>
                        <option value="other">Other Engineering Department</option>
                      </select>
                      <span className="editorial-input-underline" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                {/* Technical Interest & Domain */}
                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '20px' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 500, color: 'var(--color-carbon-black)', marginBottom: '14px' }}>
                    2. Primary Technical Focus
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '22px' }}>
                    <div className="editorial-form-group">
                      <label htmlFor="join-domain" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-navy-muted)', marginBottom: '8px' }}>
                        PRIMARY DOMAIN CIRCLE *
                      </label>
                      <select
                        id="join-domain"
                        name="domain"
                        value={formData.domain}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px 0', border: 'none', borderBottom: '1px solid var(--border-medium)', backgroundColor: 'transparent', color: 'var(--color-dark-navy)', outline: 'none' }}
                      >
                        <option value="software-web">Software &amp; Web Systems</option>
                        <option value="ai-ml">Artificial Intelligence &amp; ML</option>
                        <option value="open-source">Open Source &amp; Tooling</option>
                        <option value="algorithms-cp">Competitive Programming &amp; Algorithms</option>
                        <option value="research-papers">Computing Research &amp; Scholarly Papers</option>
                        <option value="hackathons">Hackathons &amp; Rapid Prototyping</option>
                        <option value="workshops">Technical Workshops &amp; Linux Labs</option>
                        <option value="design-editorial">Creative Tech &amp; Editorial Design</option>
                      </select>
                      <span className="editorial-input-underline" aria-hidden="true" />
                    </div>

                    <div className="editorial-form-group">
                      <input
                        type="url"
                        name="github"
                        id="join-github"
                        className="editorial-input"
                        value={formData.github}
                        onChange={handleChange}
                        placeholder=" "
                      />
                      <label htmlFor="join-github" className="editorial-floating-label">GITHUB / PORTFOLIO URL</label>
                      <span className="editorial-input-underline" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                {/* Statement of Intent */}
                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '20px' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 500, color: 'var(--color-carbon-black)', marginBottom: '14px' }}>
                    3. Statement of Intent
                  </h3>
                  <div className="editorial-form-group">
                    <textarea
                      required
                      name="statement"
                      id="join-statement"
                      className="editorial-textarea"
                      value={formData.statement}
                      onChange={handleChange}
                      rows="4"
                      placeholder=" "
                      style={{ resize: 'vertical' }}
                    />
                    <label htmlFor="join-statement" className="editorial-floating-label">
                      WHY DO YOU WISH TO JOIN FCIT, AND WHAT PROJECT DO YOU HOPE TO BUILD? *
                    </label>
                    <span className="editorial-input-underline" aria-hidden="true" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-editorial btn-editorial-crimson magnetic"
                  style={{ padding: '16px', width: '100%', fontSize: '0.875rem', marginTop: '10px' }}
                >
                  <span>Submit Membership Application</span>
                  <span>↗</span>
                </button>
              </form>
            </>
          ) : (
            /* Application Receipt View */
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--color-crimson-red)', color: 'var(--color-warm-ivory)', fontSize: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                ✓
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--color-crimson-red)', letterSpacing: '0.14em', fontWeight: 600 }}>
                PETITION RECORDED · {receiptNumber}
              </div>

              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 500, color: 'var(--color-carbon-black)', margin: '10px 0 16px' }}>
                Welcome, {formData.name || 'Candidate'}.
              </h2>

              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--color-charcoal)', maxWidth: '640px', margin: '0 auto 32px' }}>
                Your membership petition for the <strong>{formData.domain.replace('-', ' ').toUpperCase()}</strong> circle has been received by the FCIT Executive Council and recorded into the departmental logbook.
              </p>

              {/* Archival Pass Certificate Card */}
              <div
                style={{
                  border: '2px solid var(--color-heritage-gold)',
                  backgroundColor: 'var(--color-antique-parchment)',
                  padding: '24px',
                  maxWidth: '560px',
                  margin: '0 auto 32px',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '10px', marginBottom: '14px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--color-graphite)' }}>
                    HBTU CSE DEPARTMENT PASS
                  </span>
                  <Stamp text="PENDING ORIENTATION" subtext="LAB 204" variant="gold" rotate="0deg" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                  <div>
                    <span style={{ color: 'var(--color-graphite)' }}>CANDIDATE:</span><br />
                    <strong style={{ color: 'var(--color-carbon-black)' }}>{formData.name}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-graphite)' }}>ROLL NO:</span><br />
                    <strong style={{ color: 'var(--color-carbon-black)' }}>{formData.rollNo}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-graphite)' }}>COHORT:</span><br />
                    <strong style={{ color: 'var(--color-carbon-black)' }}>{formData.branchYear.toUpperCase()}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-graphite)' }}>EMAIL:</span><br />
                    <strong style={{ color: 'var(--color-crimson-red)' }}>{formData.email}</strong>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn-editorial btn-editorial-outline"
                >
                  Submit Another Response
                </button>
                <a
                  href="#print"
                  onClick={(e) => { e.preventDefault(); window.print(); }}
                  className="btn-editorial btn-editorial-dark"
                >
                  Print Admission Slip ⎙
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JoinPage;
