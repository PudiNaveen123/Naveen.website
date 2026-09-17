import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const systemNodes = [
  ['Positioning', 'Find the commercial edge'],
  ['Acquisition', 'Turn attention into qualified demand'],
  ['Experience', 'Remove friction inside the journey'],
  ['Conversion', 'Improve the moment value becomes action'],
  ['Retention', 'Make growth continue after acquisition'],
  ['Measurement', 'Turn signals into better decisions'],
];

const outcomes = [
  ['₹2Cr+', 'Monthly acquisition scale'],
  ['30%', 'CAC improvement'],
  ['8% → 12%', 'Paywall conversion'],
  ['7h → ~7m', 'Reporting automation'],
];

const tools = ['Meta', 'Google', 'GA4', 'MMP', 'Looker', 'n8n', 'Apps Script', 'Figma', 'AI Workflows'];

const About = () => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const pathRef = useRef(null);
  const nodeRefs = useRef([]);
  const outcomeRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const path = pathRef.current;
    if (!section || !stage || !path) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.matchMedia('(max-width: 980px)').matches;

    if (reducedMotion || mobile) {
      gsap.set(path, { strokeDashoffset: 0 });
      gsap.set(nodeRefs.current, { opacity: 1, scale: 1 });
      gsap.set(outcomeRefs.current, { opacity: 1, y: 0 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ['.growth-system-kicker', '.growth-system-title', '.growth-system-copy', '.growth-system-experience'],
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
          },
        }
      );

      gsap.set(path, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(nodeRefs.current, { opacity: 0.18, scale: 0.94, transformOrigin: 'left center' });
      gsap.set(outcomeRefs.current, { opacity: 0, y: 20 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.9,
        },
      });

      timeline.to(path, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0);

      nodeRefs.current.forEach((node, index) => {
        timeline.to(
          node,
          {
            opacity: 1,
            scale: 1,
            duration: 0.1,
            ease: 'power2.out',
          },
          0.06 + index * 0.13
        );
      });

      outcomeRefs.current.forEach((item, index) => {
        timeline.to(
          item,
          {
            opacity: 1,
            y: 0,
            duration: 0.11,
            ease: 'power2.out',
          },
          0.55 + index * 0.075
        );
      });

      const rotateY = gsap.quickTo(stage, 'rotationY', { duration: 0.65, ease: 'power3.out' });
      const rotateX = gsap.quickTo(stage, 'rotationX', { duration: 0.65, ease: 'power3.out' });

      const handlePointerMove = (event) => {
        const rect = stage.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        rotateY(x * 2.3);
        rotateX(y * -1.7);
      };

      const handlePointerLeave = () => {
        rotateY(0);
        rotateX(0);
      };

      stage.addEventListener('pointermove', handlePointerMove);
      stage.addEventListener('pointerleave', handlePointerLeave);

      return () => {
        stage.removeEventListener('pointermove', handlePointerMove);
        stage.removeEventListener('pointerleave', handlePointerLeave);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  const setNodeRef = (element, index) => {
    nodeRefs.current[index] = element;
  };

  const setOutcomeRef = (element, index) => {
    outcomeRefs.current[index] = element;
  };

  return (
    <section id="about" ref={sectionRef} className="growth-system-section" aria-labelledby="growth-system-title">
      <div className="growth-system-sticky">
        <div className="growth-system-orbit" aria-hidden="true" />

        <div className="growth-system-shell">
          <div className="growth-system-top">
            <div>
              <p className="growth-system-kicker">The Growth Perspective</p>
              <h2 id="growth-system-title" className="growth-system-title">
                Growth is bigger than <span>marketing.</span>
              </h2>
            </div>

            <div>
              <p className="growth-system-copy">
                Market positioning, acquisition, product experience, conversion, retention and measurement work best when they move as one commercial system.
              </p>
              <p className="growth-system-experience">
                <b>5+ years</b>
                <span>across acquisition, monetization, product growth and automation</span>
              </p>
            </div>
          </div>

          <div ref={stageRef} className="growth-system-stage">
            <svg
              className="growth-system-svg"
              viewBox="0 0 1000 520"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                className="growth-system-track-base"
                d="M70 374 C150 370 168 276 250 262 S345 360 430 338 S520 194 606 182 S688 302 762 288 S840 151 912 132"
              />
              <path
                ref={pathRef}
                className="growth-system-track-live"
                pathLength="1"
                d="M70 374 C150 370 168 276 250 262 S345 360 430 338 S520 194 606 182 S688 302 762 288 S840 151 912 132"
              />
            </svg>

            {systemNodes.map(([title, caption], index) => (
              <div
                key={title}
                ref={(element) => setNodeRef(element, index)}
                className={`growth-node growth-node--${index + 1}`}
              >
                <span className="growth-node-index">0{index + 1}</span>
                <strong>{title}</strong>
                <small>{caption}</small>
              </div>
            ))}
          </div>

          <div className="growth-system-proof" aria-label="Selected growth outcomes">
            <div className="growth-proof-label">
              <span>Selected outcomes</span>
              <strong>Proof points from real operating environments.</strong>
            </div>

            {outcomes.map(([value, caption], index) => (
              <div
                key={caption}
                ref={(element) => setOutcomeRef(element, index)}
                className="growth-proof-item"
              >
                <div className="growth-proof-value">{value}</div>
                <div className="growth-proof-caption">{caption}</div>
              </div>
            ))}
          </div>

          <div className="growth-system-tools">
            <span className="growth-tools-caption">Execution layer</span>
            <div className="growth-tools-line" aria-label="Execution tools">
              {tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
