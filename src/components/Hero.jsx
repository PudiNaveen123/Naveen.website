import { useState } from 'react';
import pictureImg from '../Picture.png';
import './Hero.css';

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <section id="home" className="marketing-hero" aria-labelledby="hero-title">
      <header className="mh-header mh-container">
        <a className="mh-brand" href="#home" aria-label="Naveen Kumar home">
          Naveen<span> Kumar.</span>
          <small>PRODUCT MARKETING & GROWTH</small>
        </a>
        <button className="mh-menu" type="button" aria-expanded={menuOpen} aria-controls="hero-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? 'Close' : 'Menu'}
        </button>
        <nav id="hero-navigation" className={menuOpen ? 'mh-nav is-open' : 'mh-nav'} aria-label="Main navigation">
          {[['About', '#about'], ['Expertise', '#expertise'], ['Projects', '#projects']].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a className="mh-nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let’s connect <span aria-hidden="true">↗</span></a>
        </nav>
      </header>
      <div className="mh-content mh-container">
        <div className="mh-copy">
          <p className="mh-eyebrow">PUDI NAVEEN KUMAR · PRODUCT MARKETING CONSULTANT</p>
          <h1 id="hero-title">Make your product<br className="mh-desktop-break" /> the one customers<br className="mh-desktop-break" /> <em>understand. Trust.<br />And choose.</em></h1>
          <p className="mh-intro">I help businesses turn customer insights into clear positioning, meaningful launches, and marketing that drives adoption and growth.</p>
          <div className="mh-actions">
            <a className="mh-primary" href="#contact">Let’s Talk About Your Product <span aria-hidden="true">↗</span></a>
            <a className="mh-secondary" href="#expertise">Explore my expertise <span aria-hidden="true">↓</span></a>
          </div>
          <ul className="mh-pillars" aria-label="Areas of focus">
            <li>Customer insights</li><li>Product positioning</li><li>Go-to-market</li>
          </ul>
        </div>
        <figure className="mh-portrait">
          <div className="mh-photo"><img src={pictureImg} alt="Pudi Naveen Kumar, product marketing consultant" fetchPriority="high" width="1489" height="1056" /></div>
          <figcaption><div><strong>Pudi Naveen Kumar</strong><span>Product Marketing & Growth</span></div><span className="mh-monogram" aria-hidden="true">NK.</span></figcaption>
          <p className="mh-personal-note">Understanding people.<br /><strong>Creating reasons to choose.</strong></p>
        </figure>
      </div>
    </section>
  );
};

export default Hero;
