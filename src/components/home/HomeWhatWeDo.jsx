import React from 'react';
import { Link } from 'react-router-dom';
import SectionLabel from '../SectionLabel';

export default function HomeWhatWeDo() {
  const activities = [
    {
      num: '01',
      title: 'Technical Learning',
      status: 'ACTIVE INITIATIVE',
      statusType: 'active',
      desc: 'Rigorous peer-to-peer technical workshops, systems reading circles, and hands-on laboratory deep dives designed to demystify complex computing paradigms beyond standard university syllabi.',
      subItems: [
        'Systems & Kernel Foundations Workshops',
        'Peer Code Reviews & Architecture Salons',
        'Web Standards & Distributed Protocols',
        'Interactive Technical Demonstrations',
      ],
      link: '/activities',
    },
    {
      num: '02',
      title: 'Engineering & Development',
      status: 'ACTIVE INITIATIVE',
      statusType: 'active',
      desc: 'Building robust, maintainable open-source software and production-grade tools. From distributed IoT sensor telemetry to full-stack developer utilities, members ship functional code.',
      subItems: [
        'Real-World Campus Infrastructure Platforms',
        'Open-Source Upstream Contribution Sprints',
        'Containerized Deployment & CI/CD Pipelines',
        'Collaborative Software Engineering Practices',
      ],
      link: '/projects',
    },
    {
      num: '03',
      title: 'Research & Innovation',
      status: 'ACTIVE INITIATIVE',
      statusType: 'active',
      desc: 'Investigating cutting-edge frontiers in deep learning loss landscapes, neural time-series forecasting, and embedded hardware prototypes under the guidance of CSE faculty advisors.',
      subItems: [
        'Transformer & Attention Mechanism Studies',
        'Embedded Hardware Telemetry Prototyping',
        'Scholarly Paper Reading Groups',
        'Conference Manuscript Formulation',
      ],
      link: '/publications',
    },
    {
      num: '04',
      title: 'Competitive Programming',
      status: 'ACTIVE INITIATIVE',
      statusType: 'active',
      desc: 'Cultivating rigorous analytical and algorithmic thinking through weekly contest problem sets, graph theory deep dives, dynamic programming clinics, and ICPC regional preparation.',
      subItems: [
        'Weekly Problem Sets & Speed Contests',
        'ICPC Regional Onsite Training Tracks',
        'Algorithmic Complexity & DP Deconstructions',
        'Intra-University Duel Championships',
      ],
      link: '/activities',
    },
    {
      num: '05',
      title: 'Community & Collaboration',
      status: 'ONGOING & EXPANDING',
      statusType: 'expanding',
      desc: 'A thriving ecosystem of mentorship, alumni interactions, and cross-domain collaborative initiatives that connect undergraduate builders with industry veterans and faculty leaders.',
      subItems: [
        'Senior-to-Junior Peer Mentorship Networks',
        'Industry Alumni Tech Salons & Career AMAs',
        'Cross-Guild Collaborative Engineering',
        'Inter-Departmental Cultural & Sports Engagements',
      ],
      link: '/team',
    },
  ];

  return (
    <section className="home-what-we-do-section" id="what-we-do">
      <div className="home-section-shell">
        <div className="home-section-header">
          <div className="home-section-title-wrap">
            <SectionLabel>PEDAGOGY &amp; PRACTICE</SectionLabel>
            <h2 className="home-editorial-heading">
              LEARN. EXPERIMENT. <em>BUILD.</em>
            </h2>
            <p className="home-section-desc">
              How FCIT fosters deep technical capability across software engineering, algorithmic theory, machine learning, and collaborative student research.
            </p>
          </div>

          <div>
            <Link to="/activities" className="home-cta-secondary">
              <span>Explore All Activities</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <div className="home-what-grid">
          {activities.map((item) => (
            <article key={item.num} className="home-what-card">
              <div className="home-what-top">
                <span className="home-what-num">{item.num}</span>
                <span className={`home-status-tag ${item.statusType}`}>
                  {item.status}
                </span>
              </div>

              <h3 className="home-what-title">{item.title}</h3>
              <p className="home-what-desc">{item.desc}</p>

              <div className="home-what-subitems">
                <span className="home-subitems-heading">Key Focus Pillars</span>
                <ul>
                  {item.subItems.map((sub, sIdx) => (
                    <li key={sIdx}>
                      <span className="home-bullet">·</span>
                      {sub}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="home-what-footer">
                <Link to={item.link} className="home-what-link">
                  <span>Learn More</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
