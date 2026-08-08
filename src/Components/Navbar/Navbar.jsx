import React, { useState, useEffect } from 'react';
import { useTheme } from '../../Context/ThemeContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <a href="#hero" className={styles.logo}>
          Arun<span className={styles.dot}>.dev</span>
        </a>

        <div className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
          <a href="#hero" onClick={() => setIsOpen(false)}>Home</a>
          <a href="#about" onClick={() => setIsOpen(false)}>About & Skills</a>
          <a href="#projects" onClick={() => setIsOpen(false)}>Projects</a>
          <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
          
          <button onClick={toggleTheme} className={styles.themeBtn} aria-label="Toggle Theme">
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        <button 
          className={`${styles.hamburger} ${isOpen ? styles.open : ''}`} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}