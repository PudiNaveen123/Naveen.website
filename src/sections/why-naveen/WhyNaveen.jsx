import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { reasons, whyContent } from './content';
import portrait from './images/profile.png';
import './WhyNaveen.css';

export default function WhyNaveen() {
  const stageRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start 95%', 'center 45%'] });
  const portraitOpacity = useTransform(scrollYProgress, [0.1, 0.65], [0, 1]);
  const portraitY = useTransform(scrollYProgress, [0.1, 0.75], [110, 0]);
  const portraitScale = useTransform(scrollYProgress, [0.1, 0.75], [0.86, 1]);
  const leftX = useTransform(scrollYProgress, [0, 0.65], [-28, 0]);
  const rightX = useTransform(scrollYProgress, [0, 0.65], [28, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.4], [0.45, 1]);

  return (
    <section className="why-naveen" id="why-naveen" aria-labelledby="why-naveen-title">
      <header className="why-heading">
        <p className="why-eyebrow">{whyContent.eyebrow}</p>
        <h2 id="why-naveen-title">{whyContent.title}</h2>
        <p className="why-introduction"><strong>{whyContent.introduction}</strong></p>
      </header>
      <div className="why-stage" ref={stageRef}>
        {reasons.map((reason, index) => (
          <motion.article className={`why-card why-card-${index + 1}`} key={reason.title} style={reducedMotion ? undefined : { x: index % 2 === 0 ? leftX : rightX, opacity: cardOpacity }}>
            <span className="why-icon" aria-hidden="true"><svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={reason.icon} /></svg></span>
            <h3>{reason.title}</h3>
            <p>{reason.introduction} <strong>{reason.emphasis}</strong></p>
          </motion.article>
        ))}
        <motion.figure className="why-portrait" style={reducedMotion ? undefined : { y: portraitY, scale: portraitScale, opacity: portraitOpacity }}>
          <img src={portrait} alt="Pudi Naveen Kumar" width="1489" height="1056" loading="lazy" decoding="async" />
        </motion.figure>
      </div>
    </section>
  );
}
