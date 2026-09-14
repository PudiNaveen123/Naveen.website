import { useState } from 'react';
import { offerContent, offers } from './content';
import './WhatIOffer.css';

const images = import.meta.glob('./images/*', { eager: true, query: '?url', import: 'default' });
const paths = {
  growth: 'M4 20V12M10 20V8M16 20V4M3 7l6-4 5 2 6-4M16 1h4v4',
  target: 'M12 4a8 8 0 1 0 8 8M12 8a4 4 0 1 0 4 4M12 12l9-9M16 3h5v5',
  search: 'M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14M15 15l6 6',
  social: 'M4 4h16v12H9l-5 4V4M8 8h8M8 12h5',
  design: 'M3 4h18v16H3V4M3 9h18M9 9v11M6 6.5h.01',
  content: 'M6 3h9l4 4v14H6V3M14 3v5h5M9 12h7M9 16h7',
  brand: 'M12 2l9 5v10l-9 5-9-5V7l9-5M3 7l9 5 9-5M12 12v10',
  funnel: 'M3 4h18l-7 9v7l-4-2v-5L3 4',
  analytics: 'M3 3v18h18M7 16l4-5 4 2 5-7M16 6h4v4',
};

function OfferCard({ offer }) {
  return (
    <article className="offer-card">
      <img src={images[`./images/${offer.image}`]} alt="" width="720" height="960" loading="lazy" decoding="async" style={{ objectPosition: offer.position || 'center' }} />
      <div className="offer-card-shade" />
      <div className="offer-card-copy">
        <span className="offer-icon" aria-hidden="true"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={paths[offer.icon]} /></svg></span>
        <h3>{offer.title}</h3>
        <p>{offer.description}</p>
      </div>
    </article>
  );
}

export default function WhatIOffer() {
  const [paused, setPaused] = useState(false);
  return (
    <section id="what-i-offer" className="offers-section" aria-labelledby="offers-title">
      <div className="offers-heading">
        <p className="offers-eyebrow">{offerContent.eyebrow}</p>
        <div className="offers-heading-row"><h2 id="offers-title">{offerContent.title}</h2><p>{offerContent.introduction}</p></div>
        <div className="offers-description-row"><p><strong>{offerContent.description}</strong></p><button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)} className="offers-pause">{paused ? 'Resume animation' : 'Pause animation'}<span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span></button></div>
      </div>
      <div className="offers-viewport" data-paused={paused}>
        <div className="offers-track" style={{ '--offer-duration': `${offerContent.durationSeconds}s` }}>
          <div className="offers-group">{offers.map(offer => <OfferCard key={offer.id} offer={offer} />)}</div>
          <div className="offers-group offers-duplicate" aria-hidden="true" inert>{offers.map(offer => <OfferCard key={offer.id} offer={offer} />)}</div>
        </div>
      </div>
    </section>
  );
}
