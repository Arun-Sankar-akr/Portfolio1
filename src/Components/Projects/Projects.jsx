import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../Context/ThemeContext';
import styles from './Projects.module.css';

const projects = [
  {
    title: "Travels Management Platform",
    category: "Full Frontend Web App",
    year: "2026",
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
    link: "https://onlineparkingbooking.netlify.app/",
    badge: "Campus System"
  },
  {
    title: "Earth Basket - Online Organic Grocery Store",
    category: "E-Commerce Web App",
    year: "2026",
    description: "Developed an e-commerce platform for ordering fresh, organic groceries and daily staples online, featuring product categorization, cart management, and an intuitive checkout workflow.",
    tags: ["JavaScript", "HTML5", "CSS3", "React", "Web Systems"],
    link: "https://earthbasket.netlify.app/",
    badge: "E-Commerce"
  }
];

// "https://ssttravel.netlify.app/en" -> "ssttravel.netlify.app"
const hostOf = (link) => {
  try {
    return new URL(link).host;
  } catch {
    return link;
  }
};

// Card that tilts in 3D toward the pointer
function TiltCard({ children, className, index }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    if (e.pointerType === 'touch') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--ry', `${((px - 0.5) * 14).toFixed(2)}deg`);
    el.style.setProperty('--rx', `${((0.5 - py) * 14).toFixed(2)}deg`);
    el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
    el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ '--i': index }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </div>
  );
}

export default function Projects() {
  const { theme } = useTheme();
  const gridRef = useRef(null);
  const [inView, setInView] = useState(false);

  // Cards rise in one after another the first time the grid scrolls into view
  useEffect(() => {
    const el = gridRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
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
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="projects" className={styles.band} data-mode={theme}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Featured projects</h2>
          <p className={styles.subtitle}>Selected applications across web design, frontend systems, and machine learning.</p>
        </div>

        <div ref={gridRef} className={`${styles.grid} ${inView ? styles.in : ''}`}>
          {projects.map((item, i) => (
            <TiltCard key={item.title} className={styles.card} index={i}>
              {/* Address strip: shows where the project lives */}
              <div className={styles.addr}>
                <span className={styles.dots} aria-hidden="true"><i></i><i></i><i></i></span>
                <span className={styles.host}>
                  {item.link ? hostOf(item.link) : 'No live demo'}
                </span>
              </div>

              <div className={styles.cardTop}>
                <span className={styles.badge}>{item.badge}</span>
                <span className={styles.year}>{item.year}</span>
              </div>

              <h3 className={styles.projectTitle}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>

              <div className={styles.cardFooter}>
                <div className={styles.tags}>
                  {item.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>

                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles.liveBtn}>
                    Live demo ↗
                  </a>
                ) : (
                  <span className={styles.repoLabel}>Source / docs</span>
                )}
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}