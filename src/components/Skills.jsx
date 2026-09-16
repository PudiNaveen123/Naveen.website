import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const systems = [
  {
    number: '01',
    title: 'Acquisition Architecture',
    description: 'Channel roles, audience structure, media planning and creative testing designed around scale and acquisition economics.',
    tags: ['Meta', 'Google', 'Search', 'Media Planning'],
  },
  {
    number: '02',
    title: 'Measurement & Attribution',
    description: 'A cleaner view of what is driving movement across campaigns, funnels, customer behaviour and commercial outcomes.',
    tags: ['GA4', 'MMP', 'Looker', 'Attribution'],
  },
  {
    number: '03',
    title: 'Conversion Systems',
    description: 'Decision journeys across landing pages, onboarding, pricing and monetization built to reduce friction and improve action.',
    tags: ['CRO', 'Funnels', 'Paywalls', 'Monetization'],
  },
  {
    number: '04',
    title: 'Experimentation',
    description: 'Structured testing across creative, offer, audience and product experiences to find the next measurable improvement.',
    tags: ['Testing', 'Creative', 'Offers', 'Journeys'],
  },
  {
    number: '05',
    title: 'Growth Automation',
    description: 'Reporting, monitoring and repeatable workflows automated to improve operating speed and create more room for decisions.',
    tags: ['n8n', 'Apps Script', 'AI', 'Workflows'],
  },
  {
    number: '06',
    title: 'Execution Infrastructure',
    description: 'Clear priorities, defined ownership and coordinated execution support to move strategy into market without operational gaps.',
    tags: ['Planning', 'Operations', 'Dashboards', 'Team Execution'],
  },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative w-full bg-[#0b2545] text-[#eef4ed] py-28 px-6 md:px-12 overflow-hidden">
      <div className="absolute left-[12%] bottom-[5%] w-[420px] h-[420px] rounded-full bg-[#134074]/20 blur-[150px] pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <p className="text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-[#eef4ed]/60 mb-4">Growth Operating System</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.96]">The infrastructure behind <span className="text-[#eef4ed]/50">better decisions.</span></h2>
          </div>
          <p className="lg:col-span-4 text-sm md:text-base leading-relaxed text-[#eef4ed]/62">Tools matter less than how they connect. The operating layer brings planning, execution, measurement and optimization together.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {systems.map((item, index) => (
            <article
              key={item.number}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group min-h-[300px] rounded-[24px] border border-[#eef4ed]/10 bg-[#13315c]/65 p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-[#eef4ed]/22"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="text-[10px] font-mono tracking-[0.16em] uppercase text-[#eef4ed]/45">System</span>
                <span className="text-sm font-mono text-[#eef4ed]/30">{item.number}</span>
              </div>
              <h3 className="text-2xl font-black tracking-tight mb-4">{item.title}</h3>
              <p className="text-sm leading-relaxed text-[#eef4ed]/60">{item.description}</p>
              <div className="mt-auto pt-7 flex flex-wrap gap-2 border-t border-[#eef4ed]/10">
                {item.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-md bg-[#eef4ed]/[0.05] text-[10px] font-mono uppercase tracking-[0.08em] text-[#eef4ed]/60">{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
