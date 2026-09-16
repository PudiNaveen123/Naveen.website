import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import WhatIOffer from './sections/what-i-offer/WhatIOffer';
import WhyNaveen from './sections/why-naveen/WhyNaveen';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThemeMotion from './components/ThemeMotion';
import './EmeraldTheme.css';

function App() {
  return (
    <main className="harbour-theme bg-[#eef4ed] min-h-screen text-[#0b2545] relative selection:bg-[#134074] selection:text-[#eef4ed]">
      <ThemeMotion />
      <Hero startMotion />
      <About />
      <Expertise />
      <WhatIOffer />
      <WhyNaveen />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
