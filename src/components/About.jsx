import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './About.css';

const relayStages = [
  'Brand Positioning Research',
  'Acquisition',
  'Conversion',
  'Retention',
  'Lifetime Value',
];

const relayThemes = [
  { accent: '#174a7c', wash: 'rgba(23, 74, 124, .075)' },
  { accent: '#111821', wash: 'rgba(17, 24, 33, .065)' },
];

const About = () => {
  const sectionRef = useRef(null);
  const numberRef = useRef(null);
  const signalRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const number = numberRef.current;
    const signal = signalRef.current;
    const items = itemRefs.current.filter(Boolean);
    if (!section || !number || !signal || items.length !== relayStages.length) return undefined;

    const showStage = (index, theme) => {
      section.style.setProperty('--relay-accent', theme.accent);
      section.style.setProperty('--relay-wash', theme.wash);
      section.style.setProperty('--relay-step', index);
      number.textContent = String(index + 1).padStart(2, '0');

      items.forEach((item, itemIndex) => {
        item.classList.toggle('is-active', itemIndex === index);
      });
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      showStage(0, relayThemes[0]);
      return undefined;
    }

    const ctx = gsap.context(() => {
      const loop = gsap.timeline({ repeat: -1 });

      relayThemes.forEach((theme) => {
        relayStages.forEach((_, index) => {
          loop
            .call(() => showStage(index, theme))
            .to({}, { duration: 1.65 });
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="growth-relay-section" aria-labelledby="growth-relay-title">
      <div className="growth-relay-shell">
        <header className="growth-relay-header">
          <div>
            <p className="growth-relay-kicker">The Growth Operating Model</p>
            <h2 id="growth-relay-title" className="growth-relay-title">
              Growth compounds when <span>every stage keeps moving.</span>
            </h2>
          </div>

          <p className="growth-relay-copy">
            Every stage passes momentum forward—turning growth into an operating rhythm, not a collection of isolated campaigns.
          </p>
        </header>

        <div className="growth-relay-stage">
          <div className="growth-relay-readout" aria-hidden="true">
            <span className="growth-relay-readout-label">Active stage</span>
            <span ref={numberRef} className="growth-relay-number">01</span>
            <span className="growth-relay-count">of 05</span>
            <span ref={signalRef} className="growth-relay-signal" />
          </div>

          <ol className="growth-relay-list" aria-label="Five-stage growth operating model">
            {relayStages.map((stage, index) => (
              <li
                key={stage}
                ref={(element) => { itemRefs.current[index] = element; }}
                className={`growth-relay-item${index === 0 ? ' is-active' : ''}`}
              >
                <span className="growth-relay-item-fill" aria-hidden="true" />
                <span className="growth-relay-item-index">0{index + 1}</span>
                <strong>{stage}</strong>
                <span className="growth-relay-item-marker" aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default About;
