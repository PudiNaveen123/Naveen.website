import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {

  return (
    <main className="bg-[#050505] min-h-screen text-white relative selection:bg-red-600 selection:text-white">
      {/* Portfolio Sections */}
      <Hero />
      <About />
      <Expertise />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;