import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../Context/ThemeContext';
import styles from './Navbar.module.css';

const SECTION_IDS = ['hero', 'about', 'projects', 'contact'];

const dropdowns = {
  about: {
    label: 'About',
    sectionId: 'about',
    items: [
      { title: 'Technical stack', desc: 'React, JavaScript, CSS', tab: 'skills' },
      { title: 'Education', desc: 'M.Sc., BCA and HSC', tab: 'education' },
      { title: 'Certifications', desc: 'Credentials and volunteering', tab: 'certs' }
    ]
  },
  contact: {
    label: 'Contact',
    sectionId: 'contact',
    items: [
      { title: 'Send a message', desc: 'Use the contact form', href: '#contact' },
      { title: 'Email', desc: 'arunsankarramakr@gmail.com', href: 'mailto:arunsankarramakr@gmail.com' },
      { title: 'Call', desc: '+91 9047638853', href: 'tel:9047638853' }
    ]
  }
};

const Plus = () => (
  <svg className={styles.plus} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <path d="M8 3v10M3 8h10" />
  </svg>
);

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [activeId, setActiveId] = useState('hero');
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Close dropdowns on outside click / Escape
  useEffect(() => {
    const onDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const closeAll = () => {
    setOpenMenu(null);
    setIsOpen(false);
  };

  // Switch the Skills tab, then scroll to it
  const openTab = (tab) => {
    window.dispatchEvent(new CustomEvent('open-skills-tab', { detail: tab }));
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    closeAll();
  };

  const linkProps = (id) => ({
    'aria-current': activeId === id ? 'true' : undefined
  });

  return (
    <header ref={navRef} className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <a href="#hero" className={styles.logo} onClick={closeAll}>
          <svg className={styles.logoMark} width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
            <path d="M4 9l10-5 10 5-10 5z" />
            <path d="M4 14l10 5 10-5" />
            <path d="M4 19l10 5 10-5" />
          </svg>
          Arun AKR
        </a>

        <nav className={`${styles.navLinks} ${isOpen ? styles.active : ''}`} aria-label="Main">
          <a href="#hero" className={styles.link} onClick={closeAll} {...linkProps('hero')}>Home</a>

          {Object.entries(dropdowns).map(([key, menu]) => (
            <div key={key} className={`${styles.item} ${openMenu === key ? styles.open : ''}`}>
              <button
                type="button"
                className={`${styles.trigger} ${activeId === menu.sectionId ? styles.current : ''}`}
                aria-expanded={openMenu === key}
                aria-haspopup="true"
                onClick={() => setOpenMenu(openMenu === key ? null : key)}
              >
                {menu.label}
                <Plus />
              </button>
              <div className={styles.dropdown}>
                {menu.items.map((item) =>
                  item.tab ? (
                    <button key={item.title} type="button" className={styles.dropItem} onClick={() => openTab(item.tab)}>
                      {item.title}
                      <small>{item.desc}</small>
                    </button>
                  ) : (
                    <a key={item.title} href={item.href} className={styles.dropItem} onClick={closeAll}>
                      {item.title}
                      <small>{item.desc}</small>
                    </a>
                  )
                )}
              </div>
            </div>
          ))}

          <a href="#projects" className={styles.link} onClick={closeAll} {...linkProps('projects')}>Projects</a>
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={toggleTheme}
            className={styles.iconBtn}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" />
              </svg>
            )}
          </button>

          <a href="#contact" className={styles.hireBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
            </svg>
            Hire me
          </a>

          <span className={styles.avatar} title="Arun Sankar Ram" aria-hidden="true">AK</span>

          <button
            type="button"
            className={`${styles.hamburger} ${isOpen ? styles.openBurger : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}