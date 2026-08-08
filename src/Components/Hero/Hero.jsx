import React from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.glowBg}></div>
      <div className={styles.container}>
        <div className={styles.statusBadge}>
          <span className={styles.pulseDot}></span>
          Available for Frontend & Web Roles
        </div>

        <h1 className={styles.title}>
          Hi, I'm <span className={styles.gradientText}>Arun Sankar Ram</span>
        </h1>

        <p className={styles.tagline}>
          M.Sc. Computer Science Graduate & Frontend Developer building responsive, high-performance web interfaces with <strong>React.js</strong> and modern JavaScript.
        </p>

        <div className={styles.actions}>
          <a href="#projects" className={styles.primaryBtn}>
            Explore My Work <span>→</span>
          </a>
          <a href="#contact" className={styles.secondaryBtn}>
            Get in Touch
          </a>
        </div>

        <div className={styles.quickStats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>4+</span>
            <span className={styles.statLabel}>Key Projects</span>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>75%</span>
            <span className={styles.statLabel}>M.Sc CS Aggregate</span>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>2+</span>
            <span className={styles.statLabel}>Certifications</span>
          </div>
        </div>
      </div>
    </section>
  );
}