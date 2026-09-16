import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

const Projects = () => {
  const containerRef = useRef(null);
  const folderBackRef = useRef(null);
  const folderFrontRef = useRef(null);
  const cardsRef = useRef([]);
  const mobileCardsRef = useRef([]);
  const mobileCarouselRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const getGridPos = (index) => ({ row: Math.floor(index / 3), col: index % 3 });
      const mm = gsap.matchMedia();

      gsap.set([folderBackRef.current, folderFrontRef.current], {
        xPercent: -50,
        yPercent: -50,
        force3D: true,
      });
      gsap.set(folderFrontRef.current, {
        rotationX: 0,
        transformOrigin: 'bottom center',
        force3D: true,
      });

      mm.add('(min-width: 768px)', () => {
        cardsRef.current.forEach((card, index) => {
          if (!card) return;
          gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            x: 0,
            y: 0,
            rotation: index % 2 === 0 ? -2.5 : 2.5,
            scale: 0.84,
            opacity: 0.98,
            zIndex: 10 + index,
            force3D: true,
          });
        });

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=150%',
            scrub: 0.9,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(folderFrontRef.current, {
            rotationX: -132,
            duration: 0.24,
            ease: 'power2.inOut',
          })
          .to(cardsRef.current, {
            y: -105,
            scale: 0.92,
            duration: 0.20,
            stagger: 0.015,
            ease: 'back.out(1.15)',
          }, '-=0.11')
          .to(cardsRef.current, {
            x: (i) => {
              const w = Math.max(...cardsRef.current.map((c) => c?.offsetWidth || 0)) || 340;
              const { col } = getGridPos(i);
              return (col - 1) * (w + 34);
            },
            y: (i) => {
              const h = Math.max(...cardsRef.current.map((c) => c?.offsetHeight || 0)) || 230;
              const { row } = getGridPos(i);
              return (row - 0.5) * (h + 36);
            },
            rotation: (i) => [-1.4, 0.8, 1.3, 1.1, -0.7, 0.5][i] || 0,
            scale: 1,
            duration: 0.56,
            stagger: 0.018,
            ease: 'power3.out',
          }, '-=0.03');

        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => timeline.kill();
      });

      mm.add('(max-width: 767px)', () => {
        mobileCardsRef.current.forEach((card, i) => {
          if (!card) return;
          gsap.set(card, {
            x: -(i * (window.innerWidth * 0.8 + 20)),
            y: 0,
            scale: 0.42,
            opacity: 0,
            rotation: i % 2 === 0 ? -9 : 9,
          });
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 68%',
            once: true,
          },
        });

        timeline
          .to(folderFrontRef.current, { rotationX: -130, duration: 0.75, ease: 'power3.inOut' })
          .to(mobileCardsRef.current, {
            y: -86,
            opacity: 1,
            scale: 0.86,
            duration: 0.52,
            stagger: 0.05,
            ease: 'back.out(1.15)',
          }, '-=0.38')
          .to(mobileCardsRef.current, {
            x: 0,
            y: 0,
            rotation: 0,
            scale: (i) => (i === 0 ? 1 : 0.93),
            opacity: (i) => (i === 0 ? 1 : 0.58),
            duration: 0.78,
            stagger: 0.065,
            ease: 'expo.out',
            onComplete: () => {
              if (mobileCarouselRef.current) {
                mobileCarouselRef.current.style.overflowX = 'auto';
                mobileCarouselRef.current.style.pointerEvents = 'auto';
              }
            },
          }, '-=0.18');

        return () => timeline.kill();
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const Card = ({ project, mobile = false, index }) => (
    <div
      ref={(el) => {
        if (mobile) mobileCardsRef.current[index] = el;
        else cardsRef.current[index] = el;
      }}
      className={`${mobile ? 'relative shrink-0 snap-center w-[80vw]' : 'hidden md:block absolute w-[31vw] max-w-[360px]'} aspect-[16/10] will-change-transform`}
      style={mobile ? undefined : { zIndex: 10 + index }}
    >
      <div className="w-full h-full rounded-[24px] overflow-hidden border border-[#0b2545]/12 bg-white/96 backdrop-blur-2xl shadow-[0_25px_65px_rgba(11,37,69,0.14)] transition-all duration-500 group hover:scale-[1.035] hover:border-[#134074]/55 hover:shadow-[0_35px_90px_rgba(19,64,116,0.22)] hover:-translate-y-2 relative z-10 p-6 flex flex-col justify-between">
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
        <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-[#134074] group-hover:shadow-[0_0_15px_#134074] transition-all" />
      </div>
    </div>
  );

  return (
    <section id="projects" ref={containerRef} className="bg-white min-h-screen relative font-sans overflow-x-clip text-[#0b2545] w-full flex items-center justify-center py-24 md:py-32 select-none">
      <div className="absolute top-8 left-6 md:left-12 z-30 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/94 border border-[#134074]/20 shadow-sm backdrop-blur-xl text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-[#134074]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#134074]" />
        Selected Growth Work
      </div>

      <div className="absolute top-10 left-0 w-full flex items-start justify-center pointer-events-none z-0">
        <h1 className="text-[15vw] sm:text-[17vw] md:text-[19vw] font-black text-[#0b2545]/[0.025] tracking-tighter leading-none whitespace-nowrap uppercase">WORK</h1>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48vw] h-[48vw] bg-[#134074]/[0.055] rounded-full blur-[135px] pointer-events-none z-0" />

      <div className="relative w-full max-w-7xl h-[72vh] min-h-[640px] flex items-center justify-center perspective-[2000px] z-10" style={{ transformStyle: 'preserve-3d' }}>
        <div className="relative w-0 h-0" style={{ transformStyle: 'preserve-3d' }}>
          <div ref={folderBackRef} className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video bg-white rounded-[24px] border border-[#134074]/25 shadow-[0_22px_60px_rgba(19,64,116,0.16)] flex items-center justify-center" style={{ zIndex: 5 }}>
            <div className="absolute -top-6 left-6 w-32 h-8 bg-white rounded-t-xl border-t border-x border-[#134074]/20" />
            <div className="relative z-10 text-[#134074] font-mono font-black text-xl tracking-[0.18em] uppercase opacity-70">GROWTH_ARCHIVE</div>
          </div>

          {projectsData.map((project, i) => <Card key={project.title} project={project} index={i} />)}

          <div ref={folderFrontRef} className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video pointer-events-none will-change-transform" style={{ zIndex: 60 }}>
            <div className="absolute bottom-0 w-full h-[85%] bg-[#f7faf7] rounded-b-[24px] rounded-t-md shadow-[0_-5px_25px_rgba(11,37,69,0.10)] flex flex-col justify-end p-6 border-t border-[#134074]/25">
              <div className="w-20 h-1.5 bg-[#134074]/15 rounded-full mx-auto mb-2" />
            </div>
          </div>
        </div>
      </div>

      <div ref={mobileCarouselRef} className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-auto py-12 flex items-center gap-6 px-[10vw] pointer-events-none z-[100] snap-x snap-mandatory overflow-x-hidden hide-scrollbar">
        <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}.hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
        {projectsData.map((project, i) => <Card key={`mob-${project.title}`} project={project} index={i} mobile />)}
      </div>
    </section>
  );
};

export default Projects;
