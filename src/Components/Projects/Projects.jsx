import React from 'react';
import styles from './Projects.module.css';

const projects = [
  {
    title: "Travels Management Platform",
    category: "Full Frontend Web App",
    year: "2025",
    description: "Built a fully responsive travel portal enabling users to explore destination packages, view itineraries, and handle bookings through intuitive dynamic UI controls.",
    tags: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "Netlify"],
    link: "https://ssttravel.netlify.app/en",
    badge: "Live Project"
  },
  {
    title: "Event Management System (Bootfest)",
    category: "Web Application",
    year: "2025",
    description: "Developed an event planning and ticketing dashboard to streamline college event registration, schedule displays, and live attendee check-ins.",
    tags: ["HTML5", "CSS3", "Bootstrap", "Event Systems"],
    link: "https://bootfest2k25.netlify.app/",
    badge: "Live Project"
  },
  {
    title: "Deep Learning Fake News Detector",
    category: "AI / Machine Learning",
    year: "2025",
    description: "Trained a deep learning NLP model on Kaggle news datasets to analyze article source metadata and text context, accurately identifying false information.",
    tags: ["Deep Learning", "NLP", "Python", "Kaggle"],
    link: null,
    badge: "ML Research"
  },
  {
    title: "Smart Parking Slot Reservation",
    category: "Web Portal",
    year: "2023",
    description: "Designed a web portal enabling students and faculty to view real-time parking space availability and reserve slots online prior to campus arrival.",
    tags: ["JavaScript", "HTML5", "CSS3", "Web Systems"],
    link: null,
    badge: "Campus System"
  }
];

export default function Projects() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Featured Projects</h2>
        <p className={styles.subtitle}>Selected applications across web design, frontend systems, and machine learning.</p>
      </div>

      <div className={styles.grid}>
        {projects.map((item, idx) => (
          <div key={idx} className={styles.card}>
            <div className={styles.cardTop}>
              <span className={styles.badge}>{item.badge}</span>
              <span className={styles.year}>{item.year}</span>
            </div>

            <h3 className={styles.projectTitle}>{item.title}</h3>
            <p className={styles.description}>{item.description}</p>

            <div className={styles.cardFooter}>
              <div className={styles.tags}>
                {item.tags.map((tag, tIdx) => (
                  <span key={tIdx} className={styles.tag}>{tag}</span>
                ))}
              </div>

              {item.link ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles.liveBtn}>
                  Live Demo ↗
                </a>
              ) : (
                <span className={styles.repoLabel}>Source / Docs</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}