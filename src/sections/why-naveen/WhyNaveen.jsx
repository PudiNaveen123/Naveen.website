import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { reasons, whyContent } from './content';
import portrait from './images/profile.png';
import './WhyNaveen.css';

export default function WhyNaveen() {
  const scrollRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['start 50%', 'end 90%'] });
  // The cards begin as a closed 2×2 grid. Scroll opens the centre progressively.
  const portraitOpacity = useTransform(scrollYProgress, [0, 0.15, 0.9, 1], [0, 0, 1, 1]);
  const portraitY = useTransform(scrollYProgress, [0, 0.15, 0.9, 1], [120, 120, 0, 0]);
  const portraitScale = useTransform(scrollYProgress, [0, 0.15, 0.9, 1], [0.2, 0.2, 1, 1]);
  const cardWidth = useTransform(scrollYProgress, [0, 0.15, 0.9, 1], ['100%', '100%', '70%', '70%']);

  return (
    <section className="why-naveen" data-reduced-motion={Boolean(reducedMotion)} id="why-naveen" aria-labelledby="why-naveen-title">
      <header className="why-heading">
        <p className="why-eyebrow">{whyContent.eyebrow}</p>
        <h2 id="why-naveen-title">{whyContent.title}</h2>
        <p className="why-introduction"><strong>{whyContent.introduction}</strong></p>
      </header>
      <div className="why-scroll" ref={scrollRef}>
      <div className="why-stage">
        {reasons.map((reason, index) => (
          <motion.article className={`why-card why-card-${index + 1}`} key={reason.title} style={reducedMotion ? undefined : { width: cardWidth }}>
            <span className="why-icon" aria-hidden="true"><svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={reason.icon} /></svg></span>
            <h3>{reason.title}</h3>
            <p>{reason.introduction} <strong>{reason.emphasis}</strong></p>
          </motion.article>
        ))}
        <motion.figure className="why-portrait" style={reducedMotion ? undefined : { y: portraitY, scale: portraitScale, opacity: portraitOpacity }}>
          <img src={portrait} alt="Pudi Naveen Kumar" width="1489" height="1056" loading="lazy" decoding="async" />
        </motion.figure>
      </div>
      </div>
    </section>
  );
}
