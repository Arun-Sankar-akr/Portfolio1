import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../../Context/ThemeContext';
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
    short: "M.Sc.",
    score: "75%",
    college: "Bishop Heber College, Tiruchirappalli",
    period: "2023 - 2025",
    year: "2025"
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    short: "BCA",
    score: "70%",
    college: "Bishop Heber College, Tiruchirappalli",
    period: "2020 - 2023",
    year: "2023"
  },
  {
    degree: "Higher Secondary (HSC - CS)",
    short: "HSC",
    score: "55%",
    college: "Holy Cross Matriculation Higher Secondary School",
    period: "2019 - 2020",
    year: "2020"
  }
];

const certifications = [
  { title: "FullStack Web Developer", year: "2024", icon: "🏅" },
  { title: "React JS Certification", year: "2025", icon: "🎖️" }
];

const volunteering = [
  {
    title: "Event Management",
    event: "Bootfest '25",
    text: "Built the online registration platform and managed event logistics."
  },
  {
    title: "Discipline Committee",
    event: "2024",
    text: "Coordinated event scheduling, attendee registrations, and campus operations."
  }
];

const tabs = [
  { id: 'skills', label: 'Technical stack', short: 'Stack' },
  { id: 'education', label: 'Education', short: 'Education' },
  { id: 'certs', label: 'Certifications & volunteering', short: 'Credentials' }
];

const LEVEL_SEGMENTS = { Advanced: 3, Intermediate: 2, Beginner: 1 };

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ======================================================================
   Skills: a rotating 3D ring of cards. Drag, swipe, use the arrow keys,
   or press the buttons to turn it; it drifts on its own when idle.
   ====================================================================== */
function SkillRing() {
  const n = skillGroups.length;
  const step = 360 / n;

  const ringRef = useRef(null);
  const angle = useRef(0);
  const target = useRef(0);
  const drag = useRef({ on: false, x: 0 });
  const paused = useRef(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce = prefersReducedMotion();
    let raf;
    let last = -1;

    const tick = () => {
      if (!drag.current.on && !paused.current && !reduce) target.current -= 0.16;
      angle.current += (target.current - angle.current) * 0.08;
      if (ringRef.current) ringRef.current.style.setProperty('--angle', `${angle.current}deg`);

      const front = (((Math.round(-angle.current / step)) % n) + n) % n;
      if (front !== last) {
        last = front;
        setActive(front);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [n, step]);

  const snap = () => {
    target.current = Math.round(target.current / step) * step;
  };

  const turn = useCallback(
    (dir) => {
      target.current = (Math.round(target.current / step) - dir) * step;
    },
    [step]
  );

  const bringToFront = (i) => {
    const k = Math.round(-target.current / step);
    let diff = (((i - k) % n) + n) % n;
    if (diff > n / 2) diff -= n;
    target.current -= diff * step;
  };

  const onPointerDown = (e) => {
    drag.current = { on: true, x: e.clientX };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (e.pointerType !== 'touch') paused.current = true;
    if (!drag.current.on) return;
    target.current += (e.clientX - drag.current.x) * 0.35;
    drag.current.x = e.clientX;
  };

  const onPointerUp = () => {
    if (!drag.current.on) return;
    drag.current.on = false;
    snap();
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); turn(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); turn(-1); }
  };

  const current = skillGroups[active];
  const segments = LEVEL_SEGMENTS[current.level] || 1;

  return (
    <div className={styles.ringWrap}>
      <div
        className={styles.ringStage}
        tabIndex={0}
        role="group"
        aria-label="Technical skills carousel. Use the left and right arrow keys to turn it."
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerEnter={(e) => { if (e.pointerType !== 'touch') paused.current = true; }}
        onPointerLeave={() => { paused.current = false; onPointerUp(); }}
        onKeyDown={onKeyDown}
        style={{ '--n': n, '--step': `${step}deg` }}
      >
        <div className={styles.ring} ref={ringRef}>
          {skillGroups.map((item, i) => (
            <button
              type="button"
              key={item.name}
              className={`${styles.ringCard} ${i === active ? styles.isFront : ''}`}
              style={{ '--i': i }}
              onClick={() => bringToFront(i)}
              aria-label={`${item.name}, ${item.level}`}
              tabIndex={-1}
            >
              <span className={styles.ringIcon} aria-hidden="true">{item.icon}</span>
              <span className={styles.ringName}>{item.name}</span>
            </button>
          ))}
        </div>
        <span className={styles.ringFloor} aria-hidden="true" />
      </div>

      <div className={styles.skillInfo} aria-live="polite">
        <button type="button" className={styles.roundBtn} onClick={() => turn(-1)} aria-label="Previous skill">
          ‹
        </button>
        <div className={styles.skillInfoBody} key={current.name}>
          <span className={styles.skillInfoName}>{current.name}</span>
          <span className={styles.skillInfoLevel}>
            <span className={styles.segs} aria-hidden="true">
              {[0, 1, 2].map((s) => (
                <i key={s} className={s < segments ? styles.segOn : ''} />
              ))}
            </span>
            {current.level}
          </span>
        </div>
        <button type="button" className={styles.roundBtn} onClick={() => turn(1)} aria-label="Next skill">
          ›
        </button>
      </div>
    </div>
  );
}

/* ======================================================================
   Education: a stack of cards in depth. The front card is the one you
   are reading; pick another with the chips, arrows, or by clicking one
   peeking out behind.
   ====================================================================== */
function EducationDeck() {
  const [idx, setIdx] = useState(0);
  const last = education.length - 1;

  const onMove = (e) => {
    if (e.pointerType === 'touch' || prefersReducedMotion()) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--ry', `${(x * 10).toFixed(2)}deg`);
    el.style.setProperty('--rx', `${(-y * 8).toFixed(2)}deg`);
  };

  const onLeave = (e) => {
    e.currentTarget.style.setProperty('--ry', '0deg');
    e.currentTarget.style.setProperty('--rx', '0deg');
  };

  return (
    <div className={styles.deckWrap}>
      <div className={styles.deckStage}>
        <div className={styles.deck} onPointerMove={onMove} onPointerLeave={onLeave}>
          {education.map((item, i) => {
            const d = i - idx;
            return (
              <article
                key={item.degree}
                className={`${styles.deckCard} ${d < 0 ? styles.gone : ''} ${d === 0 ? styles.front : ''}`}
                style={{ '--d': Math.max(d, 0), '--z': education.length - Math.abs(d) }}
                onClick={() => d > 0 && setIdx(i)}
                aria-hidden={d !== 0}
              >
                <span className={styles.deckYear} aria-hidden="true">{item.year}</span>
                <div className={styles.deckHead}>
                  <h3>{item.degree}</h3>
                  <span className={styles.scoreBadge}>{item.score}</span>
                </div>
                <p className={styles.college}>{item.college}</p>
                <span className={styles.period}>{item.period}</span>
              </article>
            );
          })}
        </div>
      </div>

      <div className={styles.deckNav}>
        <button
          type="button"
          className={styles.roundBtn}
          onClick={() => setIdx((v) => Math.max(0, v - 1))}
          disabled={idx === 0}
          aria-label="Newer qualification"
        >
          ‹
        </button>
        <div className={styles.chips} role="tablist" aria-label="Qualifications">
          {education.map((item, i) => (
            <button
              type="button"
              key={item.short}
              role="tab"
              aria-selected={i === idx}
              className={`${styles.chip} ${i === idx ? styles.chipOn : ''}`}
              onClick={() => setIdx(i)}
            >
              {item.short}
              <small>{item.year}</small>
            </button>
          ))}
        </div>
        <button
          type="button"
          className={styles.roundBtn}
          onClick={() => setIdx((v) => Math.min(last, v + 1))}
          disabled={idx === last}
          aria-label="Earlier qualification"
        >
          ›
        </button>
      </div>
    </div>
  );
}

/* ======================================================================
   Credentials: cards that flip over. Hover on desktop, tap on touch.
   ====================================================================== */
function FlipCard({ index, front, back }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      className={`${styles.flip} ${flipped ? styles.flipped : ''}`}
      style={{ '--i': index }}
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
    >
      <span className={styles.flipInner}>
        <span className={`${styles.flipFace} ${styles.flipFront}`}>{front}</span>
        <span className={`${styles.flipFace} ${styles.flipBack}`}>{back}</span>
      </span>
    </button>
  );
}

function Credentials() {
  return (
    <div className={styles.groups}>
      <div className={styles.group}>
        <h3 className={styles.groupTitle}>Professional certifications</h3>
        <div className={styles.groupCards}>
          {certifications.map((c, i) => (
            <FlipCard
              key={c.title}
              index={i}
              front={
                <>
                  <span className={styles.medal} aria-hidden="true">{c.icon}</span>
                  <span className={styles.flipTitle}>{c.title}</span>
                </>
              }
              back={
                <>
                  <span className={styles.flipBig}>{c.year}</span>
                  <span className={styles.flipText}>Certified in {c.year}</span>
                </>
              }
            />
          ))}
        </div>
      </div>

      <div className={styles.group}>
        <h3 className={styles.groupTitle}>Volunteer leadership</h3>
        <div className={styles.groupCards}>
          {volunteering.map((v, i) => (
            <FlipCard
              key={v.title}
              index={i + 2}
              front={
                <>
                  <span className={styles.flipTitle}>{v.title}</span>
                  <span className={styles.flipSub}>{v.event}</span>
                </>
              }
              back={<span className={styles.flipText}>{v.text}</span>}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ====================================================================== */
export default function Skills() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('skills');

  // The navbar's About menu can switch tabs
  useEffect(() => {
    const handler = (e) => setActiveTab(e.detail);
    window.addEventListener('open-skills-tab', handler);
    return () => window.removeEventListener('open-skills-tab', handler);
  }, []);

  const activeIndex = Math.max(0, tabs.findIndex((t) => t.id === activeTab));

  return (
    <section id="about" className={styles.band} data-mode={theme}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Qualifications &amp; background</h2>
          <p className={styles.subtitle}>
            Academic excellence, core competencies, and professional credentials.
          </p>
        </div>

        <div className={styles.dock} role="tablist" style={{ '--idx': activeIndex }}>
          <span className={styles.dockPill} aria-hidden="true" />
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={activeTab === tab.id}
              className={`${styles.dockBtn} ${activeTab === tab.id ? styles.dockOn : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className={styles.labelFull}>{tab.label}</span>
              <span className={styles.labelShort}>{tab.short}</span>
            </button>
          ))}
        </div>

        {/* key restarts the entrance animation whenever the tab changes */}
        <div key={activeTab} className={styles.panel}>
          {activeTab === 'skills' && <SkillRing />}
          {activeTab === 'education' && <EducationDeck />}
          {activeTab === 'certs' && <Credentials />}
        </div>
      </div>
    </section>
  );
}