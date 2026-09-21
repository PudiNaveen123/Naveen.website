import { useState } from 'react';
import './Expertise.css';

const capabilities = [
  {
    number: '01',
    title: 'Acquisition Systems',
    headline: 'Demand built around economics.',
    text: 'Channel strategy, audience design, budget allocation and creative testing structured around CAC, conversion and revenue quality.',
    meta: 'PAID MEDIA · SEARCH · CREATIVE TESTING · SCALE',
  },
  {
    number: '02',
    title: 'Product & Conversion',
    headline: 'Turn more intent into action.',
    text: 'Landing pages, onboarding, paywalls, pricing journeys and funnel mechanics shaped to reduce friction and improve conversion.',
    meta: 'CRO · ONBOARDING · PAYWALLS · MONETIZATION',
  },
  {
    number: '03',
    title: 'Growth Intelligence',
    headline: 'Measurement that changes decisions.',
    text: 'Analytics, attribution and experimentation frameworks that connect marketing activity with user behaviour and business outcomes.',
    meta: 'GA4 · MMP · ATTRIBUTION · EXPERIMENTATION',
  },
  {
    number: '04',
    title: 'AI & Automation',
    headline: 'Scale the system, not the manual work.',
    text: 'Automation across reporting, campaign workflows, monitoring and insight generation to improve speed, control and operating efficiency.',
    meta: 'AI · N8N · APPS SCRIPT · WORKFLOWS',
  },
];

const Expertise = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section id="expertise" className="capability-map" aria-labelledby="capability-map-title">
      <div className="capability-map__frame">
        <header className="capability-map__bar">
          <h2 id="capability-map-title">Core Capabilities</h2>
          <p><span>04</span> Connected Capabilities</p>
        </header>

        <div className="capability-map__grid">
          <svg className="capability-map__connections" viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true">
            <g className="capability-map__guides">
              <line x1="500" y1="260" x2="375" y2="105" />
              <line x1="500" y1="260" x2="625" y2="105" />
              <line x1="500" y1="260" x2="375" y2="415" />
              <line x1="500" y1="260" x2="625" y2="415" />
            </g>
            {[
              [375, 105], [625, 105], [375, 415], [625, 415],
            ].map(([x, y], index) => (
              <g key={`${x}-${y}`} className={activeIndex === index ? 'is-active' : ''}>
                <line x1="500" y1="260" x2={x} y2={y} />
                <rect x={x - 5} y={y - 7} width="10" height="14" />
              </g>
            ))}
            {[
              { path: 'M 500 260 L 375 105', begin: '0s' },
              { path: 'M 500 260 L 625 105', begin: '0.8s' },
              { path: 'M 500 260 L 375 415', begin: '1.6s' },
              { path: 'M 500 260 L 625 415', begin: '2.4s' },
            ].map((signal) => (
              <circle className="capability-map__signal" r="4" key={signal.path}>
                <animateMotion
                  path={signal.path}
                  dur="3.8s"
                  begin={signal.begin}
                  repeatCount="indefinite"
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1"
                />
              </circle>
            ))}
          </svg>

          {capabilities.map((item, index) => (
            <button
              type="button"
              key={item.number}
              className={`capability-map__cell capability-map__cell--${index + 1}${activeIndex === index ? ' is-active' : ''}`}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(null)}
              aria-pressed={activeIndex === index}
            >
              <div className="capability-map__content">
                <div className="capability-map__number"><span>{item.number}</span><i /></div>
                <h3>{item.title}</h3>
                <p className="capability-map__headline">{item.headline}</p>
                <div className="capability-map__expanded">
                  <p>{item.text}</p>
                  <span>{item.meta}</span>
                </div>
              </div>
            </button>
          ))}

          <div className="capability-map__core" aria-label="Revenue system">
            <i aria-hidden="true" />
            <span>Revenue</span>
            <span>System</span>
          </div>
        </div>
      </div>

      <footer className="capability-map__footer">
        <p>Strategy <span>×</span> Systems <span>×</span> Compound Growth</p>
        <p>Built for what&apos;s next <i /></p>
      </footer>
    </section>
  );
};

export default Expertise;
