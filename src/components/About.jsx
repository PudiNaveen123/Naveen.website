import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './About.css';

const systemNodes = [
  'Brand Positioning Research',
  'Acquisition',
  'Conversion',
  'Retention',
  'Lifetime Value',
];

const nodeActivationPoints = [0.03, 0.25, 0.51, 0.79, 0.98];

const About = () => {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const nodeRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    const nodes = nodeRefs.current.filter(Boolean);
    if (!section || !path || nodes.length !== systemNodes.length) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      gsap.set(path, { strokeDashoffset: 0 });
      gsap.set(nodes, { opacity: 1, y: 0 });
      gsap.set(nodes.map((node) => node.querySelector('.growth-node-marker')), { scale: 1 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.set(path, { strokeDasharray: 1, strokeDashoffset: 1 });
      const markers = nodes.map((node) => node.querySelector('.growth-node-marker'));
      const master = gsap.timeline({ repeat: -1 });
      const drawDuration = 4.4;

      const addCycle = (accent) => {
        const cycleStart = master.duration();

        master
          .set(section, { '--system-accent': accent }, cycleStart)
          .set(path, { strokeDashoffset: 1, opacity: 1 }, cycleStart)
          .set(nodes, { opacity: 0.1, y: 14 }, cycleStart)
          .set(markers, { scale: 0.45 }, cycleStart)
          .to(path, { strokeDashoffset: 0, duration: drawDuration, ease: 'none' }, cycleStart);

        nodes.forEach((node, index) => {
          const marker = markers[index];
          const activationTime = cycleStart + nodeActivationPoints[index] * drawDuration;

          master
            .to(
              node,
              { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
              activationTime
            )
            .to(
              marker,
              { scale: 1.7, duration: 0.16, ease: 'power2.out' },
              activationTime
            )
            .to(
              marker,
              { scale: 1, duration: 0.24, ease: 'power2.inOut' },
              activationTime + 0.16
            );
        });

        const fadeStart = cycleStart + drawDuration + 1.35;
        master
          .to(path, { opacity: 0.08, duration: 0.5, ease: 'power2.inOut' }, fadeStart)
          .to(nodes, { opacity: 0.08, y: -6, duration: 0.5, ease: 'power2.inOut' }, fadeStart);
      };

      addCycle('#174a7c');
      addCycle('#111821');
    }, section);

    return () => ctx.revert();
  }, []);

  const setNodeRef = (element, index) => {
    nodeRefs.current[index] = element;
  };

  return (
    <section id="about" ref={sectionRef} className="growth-system-section" aria-labelledby="growth-system-title">
      <div className="growth-system-sticky">
        <div className="growth-system-shell">
          <header className="growth-system-top">
            <div>
              <p className="growth-system-kicker">The Growth Perspective</p>
              <h2 id="growth-system-title" className="growth-system-title">
                Growth works as a <span>connected system.</span>
              </h2>
            </div>

            <p className="growth-system-copy">
              Brand positioning, acquisition, conversion, retention and lifetime value should move together—not as isolated marketing activities.
            </p>
          </header>

          <div className="growth-system-stage">
            <svg
              className="growth-system-svg"
              viewBox="0 0 1000 540"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                className="growth-system-track-base"
                d="M66 446 C174 435 184 370 286 350 C397 328 422 276 526 253 C638 228 667 174 772 151 C856 133 899 96 942 70"
              />
              <path
                ref={pathRef}
                className="growth-system-track-live"
                pathLength="1"
                d="M66 446 C174 435 184 370 286 350 C397 328 422 276 526 253 C638 228 667 174 772 151 C856 133 899 96 942 70"
              />
            </svg>

            <ol className="growth-system-nodes" aria-label="Connected growth system">
              {systemNodes.map((title, index) => (
                <li
                  key={title}
                  ref={(element) => setNodeRef(element, index)}
                  className={`growth-node growth-node--${index + 1}`}
                >
                  <span className="growth-node-marker" aria-hidden="true" />
                  <span className="growth-node-label">
                    <span className="growth-node-index">0{index + 1}</span>
                    <strong>{title}</strong>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
