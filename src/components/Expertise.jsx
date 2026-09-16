import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="expertise" ref={sectionRef} className="relative w-full bg-[#0b2545] text-[#eef4ed] py-28 px-6 md:px-12 overflow-hidden">
      <div className="absolute right-[5%] top-[12%] w-[460px] h-[460px] bg-[#134074]/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8 space-y-4">
            <p className="text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-[#eef4ed]/65">Core Capabilities</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.96]">Growth across the <span className="text-[#eef4ed]/55">revenue system.</span></h2>
          </div>
          <p className="lg:col-span-4 text-sm md:text-base text-[#eef4ed]/65 leading-relaxed">Acquisition, conversion, intelligence and automation connected around commercial priorities rather than isolated channels.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {capabilities.map((item, index) => (
            <article
              key={item.number}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative rounded-[24px] border border-[#eef4ed]/10 bg-[#13315c]/72 backdrop-blur-xl p-7 md:p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#eef4ed]/22"
            >
              <div className="absolute right-6 top-4 text-5xl md:text-6xl font-black text-[#eef4ed]/[0.05]">{item.number}</div>
              <div className="relative z-10 flex flex-col min-h-[260px]">
                <div className="flex items-center justify-between mb-10">
                  <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-[#eef4ed]/55">Capability {item.number}</span>
                  <span className="w-8 h-px bg-[#eef4ed]/25" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-3">{item.title}</h3>
                <p className="text-sm font-semibold text-[#eef4ed]/82 mb-3">{item.headline}</p>
                <p className="text-sm leading-relaxed text-[#eef4ed]/60 max-w-xl">{item.text}</p>
                <div className="mt-auto pt-8 text-[10px] font-mono tracking-[0.12em] uppercase text-[#eef4ed]/48 border-t border-[#eef4ed]/10">{item.meta}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
