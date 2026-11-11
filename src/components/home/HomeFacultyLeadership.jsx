import React from 'react';
import { Link } from 'react-router-dom';
import SectionLabel from '../SectionLabel';
import { LEADERSHIP_MEMBERS } from '../../data/teamPageData';

export default function HomeFacultyLeadership() {
  const facultyMembers = [
    {
      id: 'faculty-patron',
      title: 'Faculty Patron & Head of Department',
      department: 'Department of Computer Science & Engineering',
      institution: 'Harcourt Butler Technical University, Kanpur',
      role: 'Institutional Mentorship & Academic Patronage',
      desc: 'Providing academic governance, institutional resources, and strategic alignment with university research laboratories.',
      image: '/images/campus-architecture.svg',
    },
    {
      id: 'faculty-advisor',
      title: 'Faculty Advisor & Student Activities In-Charge',
      department: 'Department of Computer Science & Engineering',
      institution: 'Harcourt Butler Technical University, Kanpur',
      role: 'Curricular Guidance & Student Affairs',
      desc: 'Mentoring student technical initiatives, laboratory sessions, and overseeing academic integrity across all FCIT activities.',
      image: '/images/workshop-lab.svg',
    },
  ];

  return (
    <section className="home-faculty-leadership-section" id="leadership">
      <div className="home-section-shell">
        <div className="home-section-header">
          <div className="home-section-title-wrap">
            <SectionLabel light>GOVERNANCE &amp; STEWARDSHIP</SectionLabel>
            <h2 className="home-editorial-heading home-heading-light">
              THE PEOPLE WHO <em>GUIDE AND DRIVE US.</em>
            </h2>
            <p className="home-section-desc home-desc-light">
              FCIT operates under the academic patronage of the Department of Computer Science &amp; Engineering, steered by elected student stewards.
            </p>
          </div>

          <div>
            <Link to="/team" className="home-cta-gold">
              <span>View Full 32-Member Team</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        {/* FACULTY PATRONAGE */}
        <div className="home-faculty-block">
          <div className="home-subgroup-heading">
            <span className="home-subgroup-line" aria-hidden="true" />
            <span className="home-subgroup-title">FACULTY PATRONAGE &amp; ACADEMIC ADVISORY</span>
            <span className="home-subgroup-line" aria-hidden="true" />
          </div>

          <div className="home-faculty-grid">
            {facultyMembers.map((fac) => (
              <div key={fac.id} className="home-faculty-card">
                <div className="home-faculty-content">
                  <h3 className="home-faculty-name">{fac.title}</h3>
                  <div className="home-faculty-dept">{fac.department}</div>
                  <div className="home-faculty-inst">{fac.institution}</div>
                  <div className="home-faculty-role"><strong>Role:</strong> {fac.role}</div>
                  <p className="home-faculty-desc">{fac.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* STUDENT EXECUTIVE LEADERSHIP */}
        <div className="home-leadership-block">
          <div className="home-subgroup-heading">
            <span className="home-subgroup-line" aria-hidden="true" />
            <span className="home-subgroup-title">STUDENT EXECUTIVE COUNCIL (SESSION 2024–2025)</span>
            <span className="home-subgroup-line" aria-hidden="true" />
          </div>

          <div className="home-leadership-grid">
            {LEADERSHIP_MEMBERS.map((lead) => (
              <Link key={lead.id} to="/team#leadership" className="home-leader-card">
                <div className="home-leader-info">
                  <h4 className="home-leader-name">{lead.name}</h4>
                  <div className="home-leader-role">{lead.role}</div>
                  <div className="home-leader-year">{lead.yearBranch}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
