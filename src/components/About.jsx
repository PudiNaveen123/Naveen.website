import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './About.css';

const growthStages = [
  {
    title: 'Brand Positioning Research',
    statement: 'Find the market position worth owning.',
    signals: ['Customer tension', 'Category white space', 'Commercial relevance'],
    bars: [24, 32, 29, 43, 39, 56, 51, 68, 63, 78, 74, 91],
  },
  {
    title: 'Acquisition',
    statement: 'Turn strategic clarity into qualified demand.',
    signals: ['Audience priority', 'Channel intent', 'Acquisition efficiency'],
    bars: [18, 27, 38, 34, 49, 45, 61, 57, 72, 68, 84, 94],
  },
  {
    title: 'Conversion',
    statement: 'Move customer intent into measurable revenue.',
    signals: ['Journey friction', 'Offer strength', 'Decision confidence'],
    bars: [28, 37, 33, 46, 42, 58, 53, 69, 65, 79, 75, 89],
  },
  {
    title: 'Retention',
    statement: 'Create value customers choose repeatedly.',
    signals: ['Product experience', 'Lifecycle engagement', 'Repeat behaviour'],
    bars: [20, 35, 31, 51, 47, 66, 60, 73, 69, 83, 79, 93],
  },
  {
    title: 'Lifetime Value',
    statement: 'Compound every customer relationship.',
    signals: ['Purchase frequency', 'Customer expansion', 'Margin quality'],
    bars: [22, 30, 41, 38, 55, 50, 67, 62, 77, 73, 87, 97],
  },
];

const controlThemes = [
  { accent: '#174a7c', wash: 'rgba(23, 74, 124, .09)' },
  { accent: '#111821', wash: 'rgba(17, 24, 33, .075)' },
];

const About = () => {
  const sectionRef = useRef(null);
  const slideRefs = useRef([]);
  const tabRefs = useRef([]);
  const barRefs = useRef([]);
  const numberRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const slides = slideRefs.current.filter(Boolean);
    const tabs = tabRefs.current.filter(Boolean);
    const bars = barRefs.current.filter(Boolean);
    const number = numberRef.current;

    if (!section || slides.length !== growthStages.length || tabs.length !== growthStages.length || !number) {
      return undefined;
    }

    const activateStage = (index, theme) => {
      const stage = growthStages[index];
      section.style.setProperty('--control-accent', theme.accent);
      section.style.setProperty('--control-wash', theme.wash);
      number.textContent = String(index + 1).padStart(2, '0');

      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === index;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
      });

      tabs.forEach((tab, tabIndex) => {
        tab.classList.toggle('is-active', tabIndex === index);
      });

      bars.forEach((bar, barIndex) => {
        bar.style.setProperty('--signal-height', `${stage.bars[barIndex]}%`);
      });
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      activateStage(0, controlThemes[0]);
      return undefined;
    }

    const ctx = gsap.context(() => {
      const loop = gsap.timeline({ repeat: -1 });

      controlThemes.forEach((theme) => {
        growthStages.forEach((_, index) => {
          loop
            .call(() => activateStage(index, theme))
            .to({}, { duration: 3.15 });
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="growth-control-section" aria-labelledby="growth-control-title">
      <div className="growth-control-shell">
        <header className="growth-control-header">
          <div>
            <p className="growth-control-kicker">Commercial Growth System</p>
            <h2 id="growth-control-title" className="growth-control-title">
              Growth becomes predictable when <span>every decision connects.</span>
            </h2>
          </div>

          <p className="growth-control-copy">
            From market position to lifetime value, every commercial decision should strengthen the next.
          </p>
        </header>

        <div className="growth-control-panel">
          <div className="growth-control-topline">
            <span>Growth operating model</span>
            <span>05 connected levers</span>
          </div>

          <div className="growth-control-body">
            <div className="growth-control-slides">
              {growthStages.map((stage, index) => (
                <article
                  key={stage.title}
                  ref={(element) => { slideRefs.current[index] = element; }}
                  className={`growth-control-slide${index === 0 ? ' is-active' : ''}`}
                  aria-hidden={index !== 0}
                >
                  <div className="growth-control-stage-meta">
                    <span>0{index + 1}</span>
                    <strong>{stage.title}</strong>
                  </div>

                  <h3>{stage.statement}</h3>

                  <div className="growth-control-signals" aria-label={`${stage.title} strategic focus`}>
                    {stage.signals.map((signal) => (
                      <span key={signal}>{signal}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="growth-control-visual" aria-hidden="true">
              <span className="growth-control-visual-label">Commercial momentum</span>
              <span ref={numberRef} className="growth-control-ghost-number">01</span>
              <div className="growth-control-bars">
                {growthStages[0].bars.map((height, index) => (
                  <span
                    key={index}
                    ref={(element) => { barRefs.current[index] = element; }}
                    className="growth-control-bar"
                    style={{ '--signal-height': `${height}%`, '--bar-index': index }}
                  />
                ))}
              </div>
            </div>

            <span className="growth-control-scan" aria-hidden="true" />
          </div>

          <ol className="growth-control-tabs" aria-label="Growth system stages">
            {growthStages.map((stage, index) => (
              <li
                key={stage.title}
                ref={(element) => { tabRefs.current[index] = element; }}
                className={`growth-control-tab${index === 0 ? ' is-active' : ''}`}
              >
                <span>0{index + 1}</span>
                <strong>{stage.title}</strong>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default About;
