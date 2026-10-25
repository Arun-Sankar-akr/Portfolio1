import React, { useState, useEffect } from 'react';
import styles from './Skills.module.css';

const skillGroups = [
  { name: "React.js", level: "Advanced", icon: "⚛️" },
  { name: "JavaScript (ES6+)", level: "Advanced", icon: "🟨" },
  { name: "HTML5 / CSS3", level: "Advanced", icon: "🎨" },
  { name: "Bootstrap", level: "Intermediate", icon: "🅰️" },
  { name: "Java", level: "Intermediate", icon: "☕" },
  { name: "Virtual DOM & State", level: "Advanced", icon: "⚡" },
  { name: "Responsive UI/UX", level: "Advanced", icon: "📱" },
  { name: "Git & Deployment", level: "Intermediate", icon: "🚀" }
];

const education = [
  {
    degree: "Master of Science in Computer Science",
    score: "75%",
    college: "Bishop Heber College, Tiruchirappalli",
    period: "2023 - 2025"
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    score: "70%",
    college: "Bishop Heber College, Tiruchirappalli",
    period: "2020 - 2023"
  },
  {
    degree: "Higher Secondary (HSC - CS)",
    score: "55%",
    college: "Holy Cross Matriculation Higher Secondary School",
    period: "2019 - 2020"
  }
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState('skills');

  // The navbar's About menu can switch tabs
  useEffect(() => {
    const handler = (e) => setActiveTab(e.detail);
    window.addEventListener('open-skills-tab', handler);
    return () => window.removeEventListener('open-skills-tab', handler);
  }, []);

  const tabs = [
    { id: 'skills', label: 'Technical stack' },
    { id: 'education', label: 'Education' },
    { id: 'certs', label: 'Certifications & volunteering' }
  ];

  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Qualifications &amp; background</h2>
          <p className={styles.subtitle}>Academic excellence, core competencies, and professional credentials.</p>
        </div>

        <div className={styles.tabBar} role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`${styles.tabBtn} ${activeTab === tab.id ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'skills' && (
          <div className={styles.skillsGrid}>
            {skillGroups.map((item) => (
              <div key={item.name} className={styles.skillCard}>
                <span className={styles.skillIcon}>{item.icon}</span>
                <div>
                  <h4 className={styles.skillName}>{item.name}</h4>
                  <span className={styles.skillLevel}>{item.level}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'education' && (
          <div className={styles.timeline}>
            {education.map((item) => (
              <div key={item.degree} className={styles.timelineItem}>
                <div className={styles.timelinePoint}></div>
                <div className={styles.timelineCard}>
                  <div className={styles.cardTop}>
                    <h3>{item.degree}</h3>
                    <span className={styles.scoreBadge}>{item.score}</span>
                  </div>
                  <p className={styles.college}>{item.college}</p>
                  <span className={styles.period}>{item.period}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'certs' && (
          <div className={styles.extraGrid}>
            <div className={styles.extraCard}>
              <h3>Professional certifications</h3>
              <ul className={styles.list}>
                <li><strong>FullStack Web Developer</strong> — 2024</li>
                <li><strong>React JS Certification</strong> — 2025</li>
              </ul>
            </div>

            <div className={styles.extraCard}>
              <h3>Volunteer leadership</h3>
              <ul className={styles.list}>
                <li>
                  <strong>Event Management (Bootfest '25)</strong>: Built online registration platform and managed event logistics.
                </li>
                <li>
                  <strong>Discipline Committee (2024)</strong>: Coordinated event scheduling, attendee registrations, and campus operations.
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}