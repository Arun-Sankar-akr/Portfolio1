import React, { useState } from 'react';
import styles from './Skills.module.css';

export default function Skills() {
  const [activeTab, setActiveTab] = useState('skills');

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

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Qualifications & Background</h2>
          <p className={styles.subtitle}>Academic excellence, core competencies, and professional credentials.</p>
        </div>

        {/* Tab Switcher */}
        <div className={styles.tabBar}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'skills' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            Technical Stack
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'education' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('education')}
          >
            Education
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'certs' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('certs')}
          >
            Certifications & Volunteer
          </button>
        </div>

        {/* Tab 1: Skills Grid */}
        {activeTab === 'skills' && (
          <div className={styles.skillsGrid}>
            {skillGroups.map((item, idx) => (
              <div key={idx} className={styles.skillCard}>
                <span className={styles.skillIcon}>{item.icon}</span>
                <div>
                  <h4 className={styles.skillName}>{item.name}</h4>
                  <span className={styles.skillLevel}>{item.level}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Timeline Education */}
        {activeTab === 'education' && (
          <div className={styles.timeline}>
            {education.map((item, idx) => (
              <div key={idx} className={styles.timelineItem}>
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

        {/* Tab 3: Certs & Extra */}
        {activeTab === 'certs' && (
          <div className={styles.extraGrid}>
            <div className={styles.extraCard}>
              <h3>📜 Professional Certifications</h3>
              <ul className={styles.list}>
                <li><strong>FullStack Web Developer</strong> — 2024</li>
                <li><strong>React JS Certification</strong> — 2025</li>
              </ul>
            </div>

            <div className={styles.extraCard}>
              <h3>🤝 Volunteer Leadership</h3>
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
