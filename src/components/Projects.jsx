import { useEffect, useRef, useState } from 'react';

const projectsData = [
  {
    title: 'Scaling High-Volume Demand',
    category: 'Acquisition Scale',
    description: 'Channel structure, audience strategy, creative testing and budget allocation built for stronger scale without losing efficiency.',
    tags: ['Scale', 'Media', 'Audience', 'Creative'],
    result: '₹2Cr+ monthly scale',
    episode: 'WORK 01',
  },
  {
    title: 'Improving Acquisition Efficiency',
    category: 'Unit Economics',
    description: 'Audience quality, campaign structure, creative performance and funnel friction aligned around lower acquisition cost.',
    tags: ['CAC', 'Testing', 'Funnel', 'Efficiency'],
    result: '30% CAC improvement',
    episode: 'WORK 02',
  },
  {
    title: 'Strengthening Paywall Conversion',
    category: 'Monetization',
    description: 'Paywall experience, pricing communication and conversion experimentation focused on better decision-stage performance.',
    tags: ['CRO', 'Paywall', 'Pricing', 'Journey'],
    result: '8% → 12% conversion',
    episode: 'WORK 03',
  },
  {
    title: 'Compressing Reporting Time',
    category: 'Growth Operations',
    description: 'Automated data collection, dashboards and monitoring workflows designed to reduce manual operating load.',
    tags: ['Automation', 'Reporting', 'AI', 'Ops'],
    result: '7 hrs → ~7 mins',
    episode: 'WORK 04',
  },
  {
    title: 'Growth Across Business Models',
    category: 'Business Exposure',
    description: 'Different categories, products and commercial stages translated into different channel, conversion and operating choices.',
    tags: ['Strategy', 'Channels', 'Conversion', 'Execution'],
    result: '60+ businesses & products',
    episode: 'WORK 05',
  },
  {
    title: 'Connecting Activity to Revenue',
    category: 'Commercial Impact',
    description: 'Acquisition, monetization and growth intelligence connected back to business outcomes instead of isolated channel metrics.',
    tags: ['Revenue', 'Growth', 'Analytics', 'Systems'],
    result: '₹40Cr+ influenced',
    episode: 'WORK 06',
  },
];

const desktopPositions = [
  { x: 'calc(-1 * clamp(270px, 30vw, 380px))', y: '-145px', r: '-1.2deg' },
  { x: '0px', y: '-145px', r: '0.4deg' },
  { x: 'clamp(270px, 30vw, 380px)', y: '-145px', r: '1.1deg' },
  { x: 'calc(-1 * clamp(270px, 30vw, 380px))', y: '145px', r: '0.8deg' },
  { x: '0px', y: '145px', r: '-0.6deg' },
  { x: 'clamp(270px, 30vw, 380px)', y: '145px', r: '0.5deg' },
];

const Projects = () => {
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    let frameA;
    let frameB;
    let observer;
    let hasRevealed = false;

    const reveal = () => {
      if (hasRevealed) return;
      hasRevealed = true;
      frameA = requestAnimationFrame(() => {
        frameB = requestAnimationFrame(() => setRevealed(true));
      });
      observer?.disconnect();
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(true);
      return undefined;
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) reveal();
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    observer.observe(section);

    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88 && rect.bottom > 0) reveal();

    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frameA);
      cancelAnimationFrame(frameB);
    };
  }, []);

  const WorkCard = ({ project, index, mobile = false }) => {
    if (mobile) {
      return (
        <article
          className="relative shrink-0 snap-center w-[82vw] max-w-[350px] aspect-[16/10] transition-all ease-out"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0) scale(1)' : 'translateY(48px) scale(.92)',
            transitionDuration: '700ms',
            transitionDelay: `${220 + index * 80}ms`,
          }}
        >
          <CardContent project={project} />
        </article>
      );
    }

    const position = desktopPositions[index];
    return (
      <article
        className="absolute left-1/2 top-1/2 aspect-[16/10] will-change-transform transition-[transform,opacity] ease-[cubic-bezier(.16,1,.3,1)]"
        style={{
          width: 'clamp(250px, 27vw, 340px)',
          zIndex: 20 + index,
          opacity: revealed ? 1 : 0,
          transform: revealed
            ? `translate(-50%, -50%) translate3d(${position.x}, ${position.y}, 0) rotate(${position.r}) scale(1)`
            : `translate(-50%, -50%) translate3d(0px, 38px, 0) rotate(${index % 2 === 0 ? '-2deg' : '2deg'}) scale(.76)`,
          transitionDuration: '950ms',
          transitionDelay: `${460 + index * 85}ms`,
        }}
      >
        <CardContent project={project} />
      </article>
    );
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="bg-white min-h-[110vh] relative font-sans overflow-hidden text-[#0b2545] w-full py-24 md:py-28 select-none"
    >
      <div className="absolute top-8 left-6 md:left-12 z-40 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 border border-[#134074]/20 shadow-sm backdrop-blur-xl text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-[#134074]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#134074]" />
        Selected Growth Work
      </div>

      <div className="absolute top-9 left-0 w-full flex items-start justify-center pointer-events-none z-0">
        <h1 className="text-[15vw] sm:text-[17vw] md:text-[18vw] font-black text-[#0b2545]/[0.022] tracking-tighter leading-none whitespace-nowrap uppercase">WORK</h1>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[44vw] h-[44vw] bg-[#134074]/[0.045] rounded-full blur-[125px] pointer-events-none z-0" />

      <div className="hidden md:block relative z-10 max-w-[1240px] h-[720px] mx-auto mt-10" style={{ perspective: '1800px' }}>
        <div
          className="absolute left-1/2 top-1/2 w-[360px] aspect-video bg-white rounded-[24px] border border-[#134074]/22 shadow-[0_20px_55px_rgba(19,64,116,0.13)] flex items-center justify-center transition-all ease-out"
          style={{
            zIndex: 5,
            opacity: revealed ? 0.14 : 1,
            transform: `translate(-50%, -50%) scale(${revealed ? 0.92 : 1})`,
            transitionDuration: '700ms',
            transitionDelay: revealed ? '1050ms' : '0ms',
          }}
        >
          <div className="absolute -top-6 left-6 w-32 h-8 bg-white rounded-t-xl border-t border-x border-[#134074]/18" />
          <div className="text-[#134074] font-mono font-black text-xl tracking-[0.18em] uppercase opacity-70">GROWTH_ARCHIVE</div>
        </div>

        {projectsData.map((project, index) => (
          <WorkCard key={project.title} project={project} index={index} />
        ))}

        <div
          className="absolute left-1/2 top-1/2 w-[360px] aspect-video pointer-events-none transition-all ease-[cubic-bezier(.65,0,.35,1)]"
          style={{
            zIndex: 60,
            transformOrigin: 'bottom center',
            transform: revealed
              ? 'translate(-50%, -50%) perspective(900px) rotateX(-118deg) scale(.94)'
              : 'translate(-50%, -50%) perspective(900px) rotateX(0deg) scale(1)',
            opacity: revealed ? 0.12 : 1,
            transitionDuration: '800ms',
            transitionDelay: '80ms',
          }}
        >
          <div className="absolute bottom-0 w-full h-[85%] bg-[#f7faf7] rounded-b-[24px] rounded-t-md shadow-[0_-5px_25px_rgba(11,37,69,0.10)] flex flex-col justify-end p-6 border-t border-[#134074]/24">
            <div className="w-20 h-1.5 bg-[#134074]/15 rounded-full mx-auto mb-2" />
          </div>
        </div>
      </div>

      <div className="md:hidden relative z-10 pt-36 pb-10">
        <div className="px-6 mb-8">
          <div className="relative mx-auto w-[72vw] max-w-[320px] aspect-video">
            <div className="absolute inset-0 bg-white rounded-[22px] border border-[#134074]/22 shadow-[0_20px_55px_rgba(19,64,116,0.12)] flex items-center justify-center">
              <span className="text-[#134074] font-mono font-black text-sm tracking-[0.16em]">GROWTH_ARCHIVE</span>
            </div>
            <div
              className="absolute inset-0 origin-bottom transition-transform ease-[cubic-bezier(.65,0,.35,1)]"
              style={{
                transform: revealed ? 'perspective(700px) rotateX(-112deg)' : 'perspective(700px) rotateX(0deg)',
                transitionDuration: '750ms',
              }}
            >
              <div className="absolute bottom-0 w-full h-[84%] bg-[#f7faf7] rounded-b-[22px] border-t border-[#134074]/22" />
            </div>
          </div>
        </div>

        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory px-[9vw] pb-8 hide-scrollbar">
          <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}.hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
          {projectsData.map((project, index) => (
            <WorkCard key={`mobile-${project.title}`} project={project} index={index} mobile />
          ))}
        </div>
      </div>
    </section>
  );
};

const CardContent = ({ project }) => (
  <div className="w-full h-full rounded-[24px] overflow-hidden border border-[#0b2545]/12 bg-white/97 backdrop-blur-2xl shadow-[0_24px_62px_rgba(11,37,69,0.14)] group hover:border-[#134074]/45 hover:shadow-[0_30px_80px_rgba(19,64,116,0.20)] relative p-5 md:p-6 flex flex-col justify-between transition-shadow duration-300">
    <div className="flex items-center justify-between gap-3">
      <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-white bg-[#134074] px-2.5 py-1 rounded">{project.episode}</span>
      <span className="text-[10px] font-mono text-[#134074] font-bold text-right">{project.result}</span>
    </div>
    <div className="space-y-2 my-auto">
      <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#13315c]">{project.category}</div>
      <h3 className="text-xl md:text-2xl font-black text-[#0b2545] tracking-tight group-hover:text-[#134074] transition-colors duration-300">{project.title}</h3>
      <p className="text-xs text-[#13315c] font-light leading-relaxed line-clamp-3">{project.description}</p>
    </div>
    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#0b2545]/10">
      {project.tags.map((tag) => (
        <span key={tag} className="text-[9px] font-mono text-[#0b2545] bg-[#eef4ed] px-2 py-1 rounded border border-[#0b2545]/8">{tag}</span>
      ))}
    </div>
    <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-[#134074]" />
  </div>
);

export default Projects;
