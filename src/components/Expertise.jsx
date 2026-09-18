import { useEffect, useState } from 'react';
import './Expertise.css';

const capabilities = [
  {
    number: '01',
    title: 'Acquisition Systems',
    display: 'ACQUISITION',
    headline: 'Demand built around economics.',
    text: 'Channel strategy, audience design, budget allocation and creative testing structured around CAC, conversion and revenue quality.',
    meta: ['Paid Media', 'Search', 'Creative Testing', 'Scale'],
    lensPosition: '62%',
  },
  {
    number: '02',
    title: 'Product & Conversion',
    display: 'CONVERSION',
    headline: 'Turn more intent into action.',
    text: 'Landing pages, onboarding, paywalls, pricing journeys and funnel mechanics shaped to reduce friction and improve conversion.',
    meta: ['CRO', 'Onboarding', 'Paywalls', 'Monetization'],
    lensPosition: '70%',
  },
  {
    number: '03',
    title: 'Growth Intelligence',
    display: 'INTELLIGENCE',
    headline: 'Measurement that changes decisions.',
    text: 'Analytics, attribution and experimentation frameworks that connect marketing activity with user behaviour and business outcomes.',
    meta: ['GA4', 'MMP', 'Attribution', 'Experimentation'],
    lensPosition: '65%',
  },
  {
    number: '04',
    title: 'AI & Automation',
    display: 'AUTOMATION',
    headline: 'Scale the system, not the manual work.',
    text: 'Automation across reporting, campaign workflows, monitoring and insight generation to improve speed, control and operating efficiency.',
    meta: ['AI', 'n8n', 'Apps Script', 'Workflows'],
    lensPosition: '72%',
  },
];

const ROTATION_MS = 5200;

const Expertise = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = capabilities[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % capabilities.length);
    }, ROTATION_MS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="expertise" className="growth-lens" aria-labelledby="capabilities-heading">
      <div className="growth-lens__topline">
        <p className="growth-lens__eyebrow">03 / Core Capabilities</p>
        <span aria-hidden="true" />
        <p className="growth-lens__count">04 Connected Capabilities</p>
      </div>

      <div className="growth-lens__stage">
        <header className="growth-lens__intro">
          <p className="growth-lens__kicker">The</p>
          <h2 id="capabilities-heading">Growth Lens</h2>
          <p className="growth-lens__promise">Same markets.<br />A clearer advantage.</p>
        </header>

        <div className="growth-lens__word-field" key={`field-${active.number}`} aria-hidden="true">
          <span>{active.display}</span>
        </div>

        <div
          className="growth-lens__optic"
          style={{ '--lens-x': active.lensPosition }}
          key={`lens-${active.number}`}
          aria-hidden="true"
        >
          <div className="growth-lens__progress" />
          <span className="growth-lens__position">{active.number} / 04</span>
          <div className="growth-lens__glass">
            <span>{active.display}</span>
          </div>
        </div>

        <div className="growth-lens__detail" key={`detail-${active.number}`} aria-live="polite">
          <span className="growth-lens__detail-rule" aria-hidden="true" />
          <h3>{active.headline}</h3>
          <p>{active.text}</p>
          <ul aria-label={`${active.title} services`}>
            {active.meta.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        <nav className="growth-lens__index" aria-label="Core capabilities">
          {capabilities.map((item, index) => (
            <button
              type="button"
              key={item.number}
              className={index === activeIndex ? 'is-active' : ''}
              onClick={() => setActiveIndex(index)}
              aria-current={index === activeIndex ? 'true' : undefined}
            >
              <span>{item.number}</span>
              {item.title}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default Expertise;
