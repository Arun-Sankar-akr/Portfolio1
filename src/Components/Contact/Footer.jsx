import React, { useEffect, useRef, useState } from 'react';
import styles from './Footer.module.css';

const EMAIL = 'arunsankarramakr@gmail.com';

// Add GitHub / LinkedIn here when you have the URLs, e.g.
// { label: 'GitHub', href: 'https://github.com/your-handle', icon: 'link' }
const socials = [
  { label: EMAIL, href: `mailto:${EMAIL}`, icon: 'mail' },
  { label: '+91 9047638853', href: 'tel:9047638853', icon: 'phone' }
];

const icons = {
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  link: (
    <>
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
    </>
  )
};

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

// Open-Meteo weather codes -> a simple glyph
function WeatherIcon({ code }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  if (code === 0) {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    );
  }
  if (code >= 51) {
    return (
      <svg {...common}>
        <path d="M7 15a4 4 0 1 1 .6-7.95A5.5 5.5 0 0 1 18 9.5 3 3 0 0 1 17.5 15z" />
        <path d="M9 18l-1 2M13 18l-1 2M17 18l-1 2" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M7 18a4 4 0 1 1 .6-7.95A5.5 5.5 0 0 1 18 12.5 3 3 0 0 1 17.5 18z" />
    </svg>
  );
}

export default function Footer() {
  const panelRef = useRef(null);
  const [time, setTime] = useState('');
  const [weather, setWeather] = useState(null);

  // Local time in Tiruchirappalli
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
      );
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  // Live temperature (free, no key). Hidden if the request fails.
  useEffect(() => {
    let cancelled = false;
    fetch('https://api.open-meteo.com/v1/forecast?latitude=10.79&longitude=78.70&current=temperature_2m,weather_code')
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled && d.current) {
          setWeather({ temp: Math.round(d.current.temperature_2m), code: d.current.weather_code });
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  // The giant name leans toward the pointer
  const handleMove = (e) => {
    if (e.pointerType === 'touch') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = panelRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--fy', `${(x * 10).toFixed(2)}deg`);
    el.style.setProperty('--fx', `${(-y * 8).toFixed(2)}deg`);
  };

  const handleLeave = () => {
    const el = panelRef.current;
    if (!el) return;
    el.style.setProperty('--fy', '0deg');
    el.style.setProperty('--fx', '0deg');
  };

  return (
    <footer className={styles.wrap}>
      <div className={styles.panel} ref={panelRef} onPointerMove={handleMove} onPointerLeave={handleLeave}>
        <div className={styles.top}>
          <p className={styles.bio}>
            I build fast, responsive React apps and I'm looking for my first full-time frontend role.
          </p>

          <nav className={styles.col} aria-label="Explore">
            <h3>Explore</h3>
            <a href="#hero">Home</a>
            <a href="#about">About &amp; skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className={styles.col}>
            <h3>Follow me</h3>
            <div className={styles.pills}>
              {socials.map((s) => (
                <a key={s.label} href={s.href} className={styles.pill} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {icons[s.icon] || icons.link}
                  </svg>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.ctas}>
            <a href="tel:9047638853" className={`${styles.cta} ${styles.ctaPrimary}`}>
              Call Arun
              <span className={styles.badgeAccent}><Arrow /></span>
            </a>
            <span className={styles.ctaSub}>Let's work together</span>

            <hr className={styles.rule} />

            <a href="#projects" className={styles.cta}>
              Projects
              <span className={styles.badgeDark}><Arrow /></span>
            </a>
            <span className={styles.ctaSub}>Live demos and builds</span>
          </div>
        </div>

        {/* Giant name, cropped by the panel edge */}
        <svg className={styles.mark} viewBox="0 0 1000 130" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="akrGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" style={{ stopColor: 'var(--accent)' }} />
              <stop offset="100%" style={{ stopColor: 'var(--accent-2)' }} />
            </linearGradient>
          </defs>
          <text
            x="-5"
            y="190"
            fontSize="236"
            fontWeight="800"
            textLength="1010"
            lengthAdjust="spacingAndGlyphs"
            fill="url(#akrGradient)"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Arun AKR
          </text>
        </svg>
      </div>

      <div className={styles.bottom}>
        <span>Arun AKR ©{new Date().getFullYear()}</span>
        <span className={styles.meta}>
          <span>Tiruchirappalli</span>
          {time && <span>{time}</span>}
          {weather && (
            <span className={styles.weather}>
              {weather.temp}°C <WeatherIcon code={weather.code} />
            </span>
          )}
        </span>
      </div>
    </footer>
  );
}