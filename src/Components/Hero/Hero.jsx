import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from '../../Context/ThemeContext';
import styles from './Hero.module.css';

// Each word is its own group; `start` keeps the blur-in stagger running across words
const WORDS = [
  { text: 'ARUN', start: 0 },
  { text: 'SANKAR', start: 4 },
  { text: 'RAM', start: 10 },
];

// Deterministic star field so server and client render the same dots
function makeStars(count) {
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: rand() * 100,
    y: rand() * 100,
    size: 1 + rand() * 1.8,
    delay: rand() * 5,
    dur: 2.5 + rand() * 4,
  }));
}

export default function Hero() {
  const { theme } = useTheme();
  const wrapRef = useRef(null);
  const cardRef = useRef(null);
  const [inView, setInView] = useState(false);
  const stars = useMemo(() => makeStars(70), []);

  // Pointer parallax + scroll progress (how far the intro has scrolled away)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const top = el.getBoundingClientRect().top;
        const p = Math.min(1, Math.max(0, -top / (window.innerHeight * 0.85)));
        el.style.setProperty('--p', p.toFixed(3));
      });
    };
    const onMove = (e) => {
      if (e.pointerType === 'touch') return;
      el.style.setProperty('--mx', ((e.clientX / window.innerWidth - 0.5) * 2).toFixed(3));
      el.style.setProperty('--my', ((e.clientY / window.innerHeight - 0.5) * 2).toFixed(3));
    };
    const onLeave = () => {
      el.style.setProperty('--mx', '0');
      el.style.setProperty('--my', '0');
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  // Reveal the second panel once it scrolls into view
  useEffect(() => {
    const card = cardRef.current;
    if (!card || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(card);
    return () => io.disconnect();
  }, []);

  return (
    <div id="hero" className={styles.wrap} data-mode={theme} ref={wrapRef}>
      {/* ---------- Intro: glowing ring + wordmark ---------- */}
      <section className={styles.intro}>
        <div className={styles.stars} aria-hidden="true">
          {stars.map((s) => (
            <i
              key={s.id}
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.size,
                height: s.size,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.dur}s`,
              }}
            />
          ))}
        </div>

        <div className={styles.ringWrap} aria-hidden="true">
          <div className={styles.halo}></div>
          <div className={styles.ring}>
            <div className={styles.orbit}>
              <span className={styles.comet}></span>
            </div>
            <div className={`${styles.orbit} ${styles.orbitB}`}>
              <span className={styles.comet}></span>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <h1 className={styles.mark} aria-label="Arun Sankar Ram">
            {WORDS.map((word) => (
              <span key={word.text} className={styles.word} aria-hidden="true">
                {word.text.split('').map((ch, i) => (
                  <span key={i} className={styles.letter} style={{ '--i': word.start + i }}>
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p className={styles.sub}>Frontend developer who makes interfaces move</p>

          <a href="#projects" className={styles.cta}>View projects</a>

          <p className={styles.note}>
            <span className={styles.pulseDot}></span>
            Open to frontend roles
          </p>
        </div>
      </section>

      {/* ---------- Panel: grid floor + device ---------- */}
      <section className={styles.showcase}>
        <div ref={cardRef} className={`${styles.card} ${inView ? styles.in : ''}`}>
          <div className={styles.floor} aria-hidden="true"></div>

          <div className={styles.copy}>
            <h2 className={styles.heading}>
              Fast.<br />
              Responsive.<br />
              Accessible.
            </h2>
            <p className={styles.tagline}>
              I'm <strong>Arun Sankar Ram</strong>, an M.Sc. Computer Science graduate building
              responsive, high-performance web apps with <strong>React.js</strong> and modern
              JavaScript.
            </p>
            <div className={styles.actions}>
              <a href="#projects" className={styles.cta}>View projects</a>
              <a href="#contact" className={styles.link}>Contact me</a>
            </div>
          </div>

          <div className={styles.deviceWrap} aria-hidden="true">
            <div className={styles.device}>
              <div className={styles.deviceBar}>
                <span className={styles.logo}>AKR</span>
                <span className={styles.deviceDot}></span>
              </div>

              <div className={styles.planetBox}>
                <div className={styles.planet}>
                  <div className={styles.planetSurface}></div>
                </div>
                <div className={styles.planetRing}></div>
              </div>

              <p className={styles.deviceStatus}>React.js</p>

              <dl className={styles.stats}>
                <div>
                  <dd>4+</dd>
                  <dt>Projects</dt>
                </div>
                <div>
                  <dd>75%</dd>
                  <dt>M.Sc. CS</dt>
                </div>
                <div>
                  <dd>2+</dd>
                  <dt>Certs</dt>
                </div>
              </dl>

              <span className={styles.deviceBtn}>Ship it</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}