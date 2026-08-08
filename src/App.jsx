import React from 'react';
import { ThemeProvider } from "./Context/ThemeContext";
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import Skills from './Components/Skills/Skills';
import Projects from './Components/Projects/Projects';
import Contact from './Components/Contact/Contact';
import './Styles/variables.css';

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