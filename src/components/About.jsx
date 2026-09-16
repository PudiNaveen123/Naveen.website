import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRefs.current,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 72%' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) cardRefs.current.push(el);
  };

  const outcomes = [
    ['₹2Cr+', 'Monthly acquisition scale'],
    ['30%', 'CAC improvement'],
    ['8% → 12%', 'Paywall conversion'],
    ['7h → ~7m', 'Reporting automation'],
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-[#eef4ed] text-[#0b2545] py-28 px-6 md:px-12 overflow-hidden"
    >
      <div className="absolute top-16 left-[8%] w-[420px] h-[420px] bg-[#134074]/[0.06] rounded-full blur-[150px] pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto space-y-14">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-4">
            <p className="text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-[#134074]">The Growth Perspective</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.96]">
              Growth is bigger than <span className="text-[#134074]">marketing.</span>
            </h2>
          </div>
          <p className="lg:col-span-4 text-sm md:text-base leading-relaxed text-[#0b2545]/72">
            Market positioning, acquisition, product experience, conversion, retention and measurement work best when they move as one commercial system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          <article ref={addToRefs} className="md:col-span-7 rounded-[28px] border border-[#0b2545]/10 bg-[#eef4ed]/85 backdrop-blur-xl p-8 md:p-10 shadow-[0_20px_60px_rgba(11,37,69,0.07)]">
            <div className="flex items-center justify-between mb-8">
              <span className="text-[10px] font-mono font-bold tracking-[0.16em] uppercase text-[#134074]">Business Exposure</span>
              <span className="text-[10px] font-mono text-[#0b2545]/40">01</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Built around real growth environments.</h3>
            <p className="text-sm md:text-base leading-relaxed text-[#0b2545]/75 max-w-2xl">
              5+ years across user acquisition, digital growth, monetization and product-led environments — combining commercial context with channel, funnel and operational decisions.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {['Acquisition', 'Monetization', 'Product Growth', 'Experimentation', 'Automation'].map((item) => (
                <span key={item} className="px-3 py-1.5 rounded-md bg-[#134074]/[0.05] border border-[#134074]/15 text-[10px] font-mono uppercase tracking-[0.1em] text-[#134074]">{item}</span>
              ))}
            </div>
          </article>

          <article ref={addToRefs} className="md:col-span-5 rounded-[28px] bg-[#0b2545] text-[#eef4ed] p-8 md:p-10 shadow-[0_20px_60px_rgba(11,37,69,0.14)]">
            <div className="flex items-center justify-between mb-8">
              <span className="text-[10px] font-mono font-bold tracking-[0.16em] uppercase text-[#eef4ed]/75">Selected Outcomes</span>
              <span className="text-[10px] font-mono text-[#eef4ed]/35">02</span>
            </div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-7">
              {outcomes.map(([value, label]) => (
                <div key={label} className="border-t border-[#eef4ed]/12 pt-3">
                  <div className="text-2xl md:text-3xl font-black tracking-tight">{value}</div>
                  <div className="mt-1 text-[11px] leading-snug text-[#eef4ed]/62">{label}</div>
                </div>
              ))}
            </div>
          </article>

          <article ref={addToRefs} className="md:col-span-12 rounded-[28px] border border-[#0b2545]/10 bg-[#eef4ed]/75 p-8 md:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-[10px] font-mono font-bold tracking-[0.16em] uppercase text-[#134074] mb-3">Operating Principle</p>
              <h3 className="text-xl md:text-2xl font-black tracking-tight">Strategy backed by execution capability.</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#0b2545]/70">
                Direction, measurement and decision-making stay connected to a coordinated execution layer — reducing the gap between planning and deployment.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:max-w-lg lg:justify-end">
              {['Meta', 'Google', 'GA4', 'MMP', 'Looker', 'n8n', 'Apps Script', 'Figma', 'AI Workflows'].map((tech) => (
                <span key={tech} className="px-3.5 py-2 rounded-lg border border-[#0b2545]/10 bg-white/30 text-xs font-mono text-[#0b2545]">{tech}</span>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default About;
