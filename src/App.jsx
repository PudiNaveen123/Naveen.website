import { useCallback, useState } from 'react';
import NetflixPreloader from './components/NetflixPreloader';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import WhatIOffer from './sections/what-i-offer/WhatIOffer';
import WhyNaveen from './sections/why-naveen/WhyNaveen';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const finishLoading = useCallback(() => setLoading(false), []);

  return (
    <main className="bg-[#050505] min-h-screen text-white relative selection:bg-teal-700 selection:text-white">
      {/* Cinematic Preloader */}
      {loading && <NetflixPreloader onComplete={finishLoading} />}

      {/* Global Mouse Hover Effects & Spotlight across ALL sections */}
      <CustomCursor />

      {/* Portfolio Sections */}
      <Hero startMotion={!loading} />
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
