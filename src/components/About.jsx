import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './About.css';

const growthStages = [
  {
    title: 'Brand Positioning Research',
    statement: 'Find the market position worth owning.',
    signals: ['Customer tension', 'Category white space', 'Commercial relevance'],
    handoff: {
      input: 'Market + customer evidence',
      decision: 'Position worth owning',
      output: 'Clear brand relevance',
    },
  },
  {
    title: 'Acquisition',
    statement: 'Turn strategic clarity into qualified demand.',
    signals: ['Audience priority', 'Channel intent', 'Acquisition efficiency'],
    handoff: {
      input: 'Defined market position',
      decision: 'Audience + channel priority',
      output: 'Qualified demand',
    },
  },
  {
    title: 'Conversion',
    statement: 'Move customer intent into measurable revenue.',
    signals: ['Journey friction', 'Offer strength', 'Decision confidence'],
    handoff: {
      input: 'Qualified customer intent',
      decision: 'Offer + journey clarity',
      output: 'Measurable revenue',
    },
  },
  {
    title: 'Retention',
    statement: 'Create value customers choose repeatedly.',
    signals: ['Product experience', 'Lifecycle engagement', 'Repeat behaviour'],
    handoff: {
      input: 'First customer experience',
      decision: 'Product + lifecycle value',
      output: 'Repeat behaviour',
    },
  },
  {
    title: 'Lifetime Value',
    statement: 'Compound every customer relationship.',
    signals: ['Purchase frequency', 'Customer expansion', 'Margin quality'],
    handoff: {
      input: 'Retained customer base',
      decision: 'Frequency + expansion',
      output: 'Compounding customer value',
    },
  },
];

const controlThemes = [
  { accent: '#174a7c', wash: 'rgba(23, 74, 124, .09)' },
  { accent: '#111821', wash: 'rgba(17, 24, 33, .075)' },
];

const About = () => {
  const sectionRef = useRef(null);
  const slideRefs = useRef([]);
  const handoffRefs = useRef([]);
  const tabRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const slides = slideRefs.current.filter(Boolean);
    const handoffs = handoffRefs.current.filter(Boolean);
    const tabs = tabRefs.current.filter(Boolean);

    if (!section || slides.length !== growthStages.length || handoffs.length !== growthStages.length || tabs.length !== growthStages.length) {
      return undefined;
    }

    const activateStage = (index, theme) => {
      section.style.setProperty('--control-accent', theme.accent);
      section.style.setProperty('--control-wash', theme.wash);

      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === index;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
      });

      handoffs.forEach((handoff, handoffIndex) => {
        const active = handoffIndex === index;
        handoff.classList.toggle('is-active', active);
        handoff.setAttribute('aria-hidden', String(!active));
      });

      tabs.forEach((tab, tabIndex) => {
        tab.classList.toggle('is-active', tabIndex === index);
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

            <div className="growth-control-handoff">
              {growthStages.map((stage, index) => (
                <article
                  key={stage.title}
                  ref={(element) => { handoffRefs.current[index] = element; }}
                  className={`growth-handoff-slide${index === 0 ? ' is-active' : ''}`}
                  aria-hidden={index !== 0}
                >
                  <span className="growth-handoff-title">Commercial handoff</span>

                  <div className="growth-handoff-flow">
                    <div className="growth-handoff-node growth-handoff-node--input">
                      <span className="growth-handoff-marker" aria-hidden="true" />
                      <div>
                        <span>Input</span>
                        <strong>{stage.handoff.input}</strong>
                      </div>
                    </div>

                    <span className="growth-handoff-line growth-handoff-line--one" aria-hidden="true" />

                    <div className="growth-handoff-node growth-handoff-node--decision">
                      <span className="growth-handoff-marker" aria-hidden="true" />
                      <div>
                        <span>Decision</span>
                        <strong>{stage.handoff.decision}</strong>
                      </div>
                    </div>

                    <span className="growth-handoff-line growth-handoff-line--two" aria-hidden="true" />

                    <div className="growth-handoff-node growth-handoff-node--output">
                      <span className="growth-handoff-marker" aria-hidden="true" />
                      <div>
                        <span>Output</span>
                        <strong>{stage.handoff.output}</strong>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
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
