import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const systemCategories = [
  {
    title: 'Acquisition Architecture',
    desc: 'Channel roles, audience structure, media planning and creative testing designed around scale and acquisition economics.',
    tag: 'ACQUIRE / SCALE',
    skills: ['Meta', 'Google', 'Search', 'Media Planning'],
  },
  {
    title: 'Measurement & Attribution',
    desc: 'A cleaner view of what is driving movement across campaigns, funnels, customer behaviour and commercial outcomes.',
    tag: 'MEASURE / DECIDE',
    skills: ['GA4', 'MMP', 'Looker', 'Attribution'],
  },
  {
    title: 'Conversion Systems',
    desc: 'Decision journeys across landing pages, onboarding, pricing and monetization built to reduce friction and improve action.',
    tag: 'CONVERT / MONETIZE',
    skills: ['CRO', 'Funnels', 'Paywalls', 'Monetization'],
  },
  {
    title: 'Experimentation',
    desc: 'Structured testing across creative, offer, audience and product experiences to find the next measurable improvement.',
    tag: 'TEST / LEARN',
    skills: ['Creative', 'Offers', 'Audiences', 'Journeys'],
  },
  {
    title: 'Growth Automation',
    desc: 'Reporting, monitoring and repeatable workflows automated to improve operating speed and create more room for decisions.',
    tag: 'AUTOMATE / ACCELERATE',
    skills: ['n8n', 'Apps Script', 'AI', 'Workflows'],
  },
  {
    title: 'Execution Infrastructure',
    desc: 'Clear priorities, defined ownership and coordinated execution support to move strategy into market without operational gaps.',
    tag: 'PLAN / EXECUTE',
    skills: ['Planning', 'Operations', 'Dashboards', 'Team Execution'],
  },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const bgRefs = useRef([]);
  const textRefs = useRef([]);

  const handleScroll = (e) => {
    if (window.innerWidth >= 769) return;
    const container = e.target;
    const center = container.scrollLeft + container.offsetWidth / 2;
    let activeIdx = 0;
    let minDiff = Infinity;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const diff = Math.abs(cardCenter - center);
      if (diff < minDiff) {
        minDiff = diff;
        activeIdx = i;
      }
    });

    cardsRef.current.forEach((card, i) => {
      if (card) gsap.to(card, { scale: i === activeIdx ? 1 : 0.9, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
    });
    bgRefs.current.forEach((bg, i) => {
      if (bg) gsap.to(bg, { opacity: i === activeIdx ? 1 : 0, duration: 0.4, overwrite: 'auto' });
    });
    textRefs.current.forEach((txt, i) => {
      if (txt) gsap.to(txt, { opacity: i === activeIdx ? 1 : 0, duration: 0.4, overwrite: 'auto' });
    });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 769px)', () => {
        const updateCards = (p) => {
          cardsRef.current.forEach((card, i) => {
            if (!card) return;
            const offset = i - p;
            const radius = 1800;
            const angle = offset * 18;
            const rad = angle * Math.PI / 180;
            gsap.set(card, {
              x: Math.sin(rad) * radius,
              y: radius - (Math.cos(rad) * radius),
              z: -Math.abs(offset) * 50,
              scale: Math.max(0.4, 1 - Math.abs(offset) * 0.15),
              rotationZ: angle,
              rotationY: 0,
              opacity: Math.max(0.12, 1 - Math.abs(offset) * 0.3),
              zIndex: Math.round(100 - Math.abs(offset) * 10),
            });
          });

          bgRefs.current.forEach((bg, i) => {
            if (!bg) return;
            const itemOpacity = Math.max(0, 1 - Math.abs(i - p));
            gsap.set(bg, { opacity: itemOpacity });
            if (textRefs.current[i]) gsap.set(textRefs.current[i], { opacity: itemOpacity });
          });
        };

        updateCards(0);
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=500%',
          pin: true,
          scrub: 1,
          onUpdate: (self) => updateCards(self.progress * (systemCategories.length - 1)),
        });
      });

      mm.add('(max-width: 768px)', () => {
        cardsRef.current.forEach((card, i) => {
          if (!card) return;
          gsap.set(card, { clearProps: 'x,y,z,rotation,scale,opacity,position' });
          gsap.set(card, { scale: i === 0 ? 1 : 0.9 });
        });
        bgRefs.current.forEach((bg, i) => bg && gsap.set(bg, { clearProps: 'all', opacity: i === 0 ? 1 : 0 }));
        textRefs.current.forEach((txt, i) => txt && gsap.set(txt, { clearProps: 'all', opacity: i === 0 ? 1 : 0 }));
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative w-full h-screen bg-[#0b2545] text-white overflow-hidden flex items-center justify-center md:[perspective:1000px] select-none">
      <div className="absolute top-8 left-6 md:left-12 z-30 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-white">
        <span className="w-1.5 h-1.5 rounded-full bg-white" />
        Growth Operating System
      </div>

      {systemCategories.map((_, i) => (
        <div key={i} ref={(el) => (bgRefs.current[i] = el)} className="absolute inset-0 z-0 pointer-events-none opacity-0 bg-gradient-to-tr from-[#0b2545] via-[#13315c] to-[#0b2545]" />
      ))}

      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        {systemCategories.map((_, i) => (
          <h1
            key={`text-${i}`}
            ref={(el) => (textRefs.current[i] = el)}
            className="absolute text-[22vw] md:text-[18vw] font-black uppercase text-transparent leading-none tracking-tighter mix-blend-screen"
            style={{ WebkitTextStroke: '2px rgba(255,255,255,0.10)', opacity: 0 }}
          >
            SYSTEMS
          </h1>
        ))}
      </div>

      <div
        className="relative w-full h-full flex md:items-center md:justify-center z-10 md:[transform-style:preserve-3d] overflow-x-auto overflow-y-hidden md:overflow-visible snap-x snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-center px-[10vw] md:px-0 gap-4 md:gap-0 touch-pan-x"
        onScroll={handleScroll}
      >
        {systemCategories.map((category, i) => (
          <div
            key={category.title}
            ref={(el) => (cardsRef.current[i] = el)}
            className="md:absolute relative shrink-0 snap-center w-[82vw] sm:w-[360px] md:w-[440px] h-[460px] md:h-[540px] rounded-[32px] p-8 md:p-10 bg-white/[0.08] backdrop-blur-2xl border border-white/15 flex flex-col justify-between overflow-hidden group shadow-[0_30px_80px_rgba(0,0,0,0.25)] hover:border-white/35 transition-colors duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.10] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
            <div className="flex items-center justify-between relative z-10">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-white bg-white/10 px-3 py-1 rounded border border-white/15">{category.tag}</span>
              <span className="text-xs font-mono text-white/60">[ 0{i + 1} / 06 ]</span>
            </div>
            <div className="space-y-4 relative z-10 my-auto">
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">{category.title}</h3>
              <p className="text-sm md:text-base text-white/80 font-light leading-relaxed">{category.desc}</p>
            </div>
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 relative z-10">
              {category.skills.map((skill) => (
                <span key={skill} className="text-xs font-mono text-white bg-white/[0.06] border border-white/10 px-3 py-1 rounded group-hover:border-white/25 transition-colors">{skill}</span>
              ))}
            </div>
            <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-white/90 group-hover:shadow-[0_0_18px_rgba(255,255,255,0.8)] transition-all" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
