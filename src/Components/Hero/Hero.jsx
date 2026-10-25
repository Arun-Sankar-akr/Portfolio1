import React, { useRef } from 'react';
import styles from './Hero.module.css';

const chips = ['React', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'Java', 'Git', 'Netlify'];

export default function Hero() {
  const sceneRef = useRef(null);

  // The 3D scene follows the pointer anywhere over the hero
  const handleMove = (e) => {
    if (e.pointerType === 'touch') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = sceneRef.current;
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--ry', `${(x * 28).toFixed(2)}deg`);
    el.style.setProperty('--rx', `${(-y * 20).toFixed(2)}deg`);
  };

  const handleLeave = () => {
    const el = sceneRef.current;
    if (!el) return;
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--rx', '0deg');
  };

  return (
    <section id="hero" className={styles.hero} onPointerMove={handleMove} onPointerLeave={handleLeave}>
      <div className={styles.container}>
        <div className={styles.copy}>
          <div className={styles.badge}>
            <span className={styles.pulseDot}></span>
            Open to frontend roles
          </div>

          <h1 className={styles.title}>Frontend developer who makes interfaces move.</h1>

          <p className={styles.tagline}>
            I'm <strong>Arun Sankar Ram</strong>, an M.Sc. Computer Science graduate building
            responsive, high-performance web apps with <strong>React.js</strong> and modern JavaScript.
          </p>

          <div className={styles.actions}>
            <a href="#projects" className={styles.primaryBtn}>View projects</a>
            <a href="#contact" className={styles.secondaryBtn}>Contact me</a>
          </div>

          <dl className={styles.facts}>
            <div className={styles.fact}>
              <dt>Key projects</dt>
              <dd>4+</dd>
            </div>
            <div className={styles.fact}>
              <dt>M.Sc. CS aggregate</dt>
              <dd>75%</dd>
            </div>
            <div className={styles.fact}>
              <dt>Certifications</dt>
              <dd>2+</dd>
            </div>
          </dl>
        </div>

        {/* Decorative 3D scene */}
        <div className={styles.scene} ref={sceneRef} aria-hidden="true">
          <div className={styles.stage}>
            <div className={styles.float}>
              <div className={`${styles.pane} ${styles.p1}`}>
                <div className={styles.chrome}><i></i><i></i><i></i></div>
                <div className={styles.skeleton}>
                  <span style={{ width: '70%' }}></span>
                  <span style={{ width: '90%' }}></span>
                  <span style={{ width: '55%' }}></span>
                  <span style={{ width: '80%' }}></span>
                </div>
              </div>

              <div className={`${styles.pane} ${styles.p2}`}>
                <div className={styles.chrome}><i></i><i></i><i></i></div>
                <pre className={styles.code}>
                  <span className={styles.kw}>const</span> Hero = () =&gt; (
                  {'\n'}  &lt;<span className={styles.tag}>main</span> className=<span className={styles.str}>"alive"</span>&gt;
                  {'\n'}    &lt;<span className={styles.tag}>Scene</span> depth={'{'}3{'}'} /&gt;
                  {'\n'}  &lt;/<span className={styles.tag}>main</span>&gt;
                  {'\n'});
                </pre>
              </div>

              <div className={`${styles.pane} ${styles.p3}`}>
                <div className={styles.miniRow}>
                  <span className={styles.toggle}><b></b></span>
                  <span className={styles.miniLabel}>Dark mode</span>
                </div>
                <span className={styles.miniBtn}>Ship it</span>
              </div>

              <div className={styles.cube}>
                <div className={styles.cubeSpin}>
                  <span className={`${styles.face} ${styles.f1}`}>A</span>
                  <span className={`${styles.face} ${styles.f2}`}>K</span>
                  <span className={`${styles.face} ${styles.f3}`}>R</span>
                  <span className={`${styles.face} ${styles.f4}`}>{'</>'}</span>
                  <span className={`${styles.face} ${styles.f5}`}>{'{ }'}</span>
                  <span className={`${styles.face} ${styles.f6}`}>⚛</span>
                </div>
              </div>

              <div className={styles.ring}>
                <div className={styles.ringLine}></div>
                <div className={styles.orbit}>
                  {chips.map((chip, i) => (
                    <div key={chip} className={styles.chip} style={{ '--i': i }}>
                      <span className={styles.chipInner}>{chip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}