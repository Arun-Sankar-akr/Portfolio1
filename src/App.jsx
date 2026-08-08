import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import './styles/variables.css';

export default function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <main>
        <section id="hero">
          <Hero />
        </section>

        <section id="about">
          <Skills />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>
    </ThemeProvider>
  );
}