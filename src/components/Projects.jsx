import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const work = [
  {
    number: '01',
    label: 'ACQUISITION SCALE',
    title: 'Scaling high-volume demand.',
    context: 'Complex paid acquisition environments requiring stronger scale without losing efficiency.',
    focus: 'Channel structure, audience strategy, creative testing and budget allocation.',
    outcome: '₹2Cr+ monthly media scale',
  },
  {
    number: '02',
    label: 'UNIT ECONOMICS',
    title: 'Improving acquisition efficiency.',
    context: 'Customer acquisition costs limiting room for profitable growth.',
    focus: 'Audience quality, creative performance, campaign structure and funnel friction.',
    outcome: '30% CAC improvement',
  },
  {
    number: '03',
    label: 'MONETIZATION',
    title: 'Strengthening paywall conversion.',
    context: 'Healthy traffic with friction at the subscription and decision stage.',
    focus: 'Paywall experience, offer hierarchy, pricing communication and experimentation.',
    outcome: '8% → 12% conversion',
  },
  {
    number: '04',
    label: 'OPERATIONS',
    title: 'Compressing reporting time.',
    context: 'Manual reporting consuming significant operating time every week.',
    focus: 'Automated data collection, reporting workflows and performance monitoring.',
    outcome: '7 hours → ~7 minutes',
  },
  {
    number: '05',
    label: 'BUSINESS EXPOSURE',
    title: 'Growth across multiple models.',
    context: 'Different products, categories and commercial stages demand different operating choices.',
    focus: 'Business context, channel fit, conversion logic and scalable execution systems.',
    outcome: '60+ businesses & products',
  },
  {
    number: '06',
    label: 'COMMERCIAL IMPACT',
    title: 'Connecting activity to revenue.',
    context: 'Growth work becomes useful when it is tied back to commercial outcomes.',
    focus: 'Acquisition, monetization, funnel movement and performance intelligence.',
    outcome: '₹40Cr+ revenue influenced',
  },
];

const Projects = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative w-full bg-[#eef4ed] text-[#0b2545] py-28 px-6 md:px-12 overflow-hidden">
      <div className="absolute right-[8%] top-[12%] w-[420px] h-[420px] rounded-full bg-[#134074]/[0.06] blur-[150px] pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <p className="text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-[#134074] mb-4">Selected Growth Work</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.96]">Strategy becomes valuable when it <span className="text-[#134074]">moves a metric.</span></h2>
          </div>
          <p className="lg:col-span-4 text-sm md:text-base leading-relaxed text-[#0b2545]/68">Selected examples across acquisition, monetization, efficiency and operating systems — expressed through the business movement they created.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {work.map((item, index) => (
            <article
              key={item.number}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group rounded-[24px] border border-[#0b2545]/10 bg-[#eef4ed]/82 backdrop-blur-xl p-7 md:p-8 min-h-[330px] flex flex-col shadow-[0_18px_60px_rgba(11,37,69,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#134074]/30"
            >
              <div className="flex items-center justify-between mb-9">
                <span className="text-[10px] font-mono font-bold tracking-[0.14em] text-[#134074]">{item.label}</span>
                <span className="text-[10px] font-mono text-[#0b2545]/35">{item.number}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-5">{item.title}</h3>
              <div className="grid sm:grid-cols-2 gap-5 text-sm leading-relaxed text-[#0b2545]/68">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-[#0b2545]/45 mb-2">Context</p>
                  <p>{item.context}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-[#0b2545]/45 mb-2">Growth Focus</p>
                  <p>{item.focus}</p>
                </div>
              </div>
              <div className="mt-auto pt-7 border-t border-[#0b2545]/10 flex items-end justify-between gap-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-[#0b2545]/45">Business Movement</span>
                <strong className="text-xl md:text-2xl font-black tracking-tight text-[#134074] text-right">{item.outcome}</strong>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
