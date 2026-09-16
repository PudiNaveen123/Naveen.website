import FlowBackground from './FlowBackground';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import pictureImg from '../Picture.png';
import './Hero.css';

const Hero = ({ startMotion = true }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const portraitRef = useRef(null);

  const systemSignals = [
    'ACQUISITION // CONVERSION',
    'PRODUCT // REVENUE',
    'DATA // AUTOMATION',
    'STRATEGY // EXECUTION',
  ];

  useEffect(() => {
    if (!startMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const section = sectionRef.current;
    const content = contentRef.current;
    const portrait = portraitRef.current;
    if (!section || !content || !portrait) return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.fromTo(section.querySelector('header'), { y: -28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
      .fromTo(
        content.querySelectorAll('.hero-anim-item'),
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.09 },
        '-=0.45'
      )
      .fromTo(portrait, { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 }, '-=0.7');

    return () => tl.kill();
  }, [startMotion]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="theme-hero relative w-full min-h-screen bg-[#eef4ed] overflow-hidden flex flex-col"
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .brand-marquee {
          width: max-content;
          animation: marquee 42s linear infinite;
        }
      `}</style>

      <FlowBackground />

      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none select-none">
        <div className="absolute top-[36%] -translate-y-1/2 opacity-[0.055]">
          <div className="brand-marquee flex whitespace-nowrap">
            {[...systemSignals, ...systemSignals].map((signal, idx) => (
              <span key={idx} className="text-[12vw] font-black text-[#134074] mx-8 tracking-tighter">
                {signal} ·
              </span>
            ))}
          </div>
        </div>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#134074]/30 to-transparent" />
      </div>

      <header className="relative z-50 w-full max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
        <a href="#home" className="text-xl md:text-2xl font-black text-[#134074] tracking-tighter">
          GROWTH.ENGINE<span className="text-[#0b2545]">/</span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-[11px] font-mono uppercase tracking-[0.16em] text-[#0b2545]">
          <a href="#about" className="hover:text-[#134074] transition-colors">Perspective</a>
          <a href="#expertise" className="hover:text-[#134074] transition-colors">Capabilities</a>
          <a href="#skills" className="hover:text-[#134074] transition-colors">Systems</a>
          <a href="#projects" className="hover:text-[#134074] transition-colors">Work</a>
          <a href="#contact" className="hover:text-[#134074] transition-colors">Connect</a>
        </nav>
        <a
          href="#contact"
          className="px-5 py-2.5 rounded-lg bg-[#134074] text-[#eef4ed] font-bold text-[11px] uppercase tracking-[0.14em] transition-transform duration-300 hover:-translate-y-0.5"
        >
          Start a Conversation
        </a>
      </header>

      <div ref={contentRef} className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex-1 flex flex-col justify-center py-10 md:py-14">
        <div className="hero-anim-item flex items-center justify-between gap-4 mb-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-[#eef4ed]/85 backdrop-blur-xl border border-[#134074]/25 text-[11px] font-mono tracking-[0.12em] text-[#134074] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#134074]" />
            <span className="font-bold normal-case tracking-normal">Growth That Moves the Business.</span>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-[10px] font-mono tracking-[0.14em] text-[#0b2545]">
            <span className="px-3 py-1.5 border border-[#0b2545]/15 rounded-md bg-[#eef4ed]/70">₹2CR+ MONTHLY SCALE</span>
            <span className="px-3 py-1.5 border border-[#0b2545]/15 rounded-md bg-[#eef4ed]/70">AI × BUSINESS SYSTEMS</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="hero-anim-item flex items-center gap-3 text-[11px] font-mono tracking-[0.16em] uppercase text-[#0b2545]">
              <span className="w-8 h-px bg-[#134074]" />
              Strategy · Scale · Systems
            </div>

            <h1 className="hero-anim-item text-5xl md:text-7xl font-black tracking-tighter text-[#0b2545] leading-[0.92]">
              NAVEEN <br />
              <span className="text-[#134074]">GROWTH.ENGINE</span>
            </h1>

            <p className="hero-anim-item text-sm md:text-[17px] text-[#0b2545]/85 leading-relaxed max-w-xl">
              Building connected business systems across acquisition, product, conversion, intelligence and automation — designed to create measurable movement, not isolated activity.
            </p>

            <div className="hero-anim-item flex flex-wrap gap-2 text-[10px] font-mono tracking-[0.12em] uppercase text-[#134074]">
              {['Acquisition', 'Product', 'Conversion', 'Analytics', 'Automation'].map((item) => (
                <span key={item} className="px-3 py-1.5 rounded-md border border-[#134074]/20 bg-[#134074]/[0.04]">{item}</span>
              ))}
            </div>

            <div className="hero-anim-item flex flex-wrap gap-3 pt-1">
              <a href="#projects" className="px-7 py-3.5 rounded-lg bg-[#134074] text-[#eef4ed] font-bold text-[11px] uppercase tracking-[0.14em] hover:-translate-y-0.5 transition-transform">
                Explore Business Work
              </a>
              <a href="#about" className="px-7 py-3.5 rounded-lg border border-[#0b2545]/20 text-[#0b2545] font-bold text-[11px] uppercase tracking-[0.14em] bg-[#eef4ed]/70 hover:border-[#134074]/50 transition-colors">
                See the System
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div ref={portraitRef} className="relative w-[280px] md:w-[330px]">
              <div className="absolute -inset-8 rounded-full bg-[#134074]/10 blur-3xl" />
              <div className="relative p-3 rounded-[28px] bg-[#eef4ed]/80 backdrop-blur-xl border border-[#134074]/20 shadow-[0_30px_90px_rgba(11,37,69,0.16)]">
                <div className="absolute top-6 left-6 z-20 px-3 py-1.5 rounded-md bg-[#134074] text-[#eef4ed] text-[10px] font-mono font-bold tracking-[0.12em] uppercase">
                  Business Growth
                </div>
                <img src={pictureImg} alt="Portrait" className="w-full h-[360px] md:h-[410px] object-cover rounded-[20px]" />
              </div>
            </div>
          </div>

          <div className="hero-anim-item lg:col-span-3">
            <div className="rounded-2xl border border-[#0b2545]/12 bg-[#eef4ed]/75 backdrop-blur-xl p-6 shadow-[0_18px_60px_rgba(11,37,69,0.08)]">
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] font-mono tracking-[0.16em] uppercase text-[#134074] font-bold">Operating System</span>
                <span className="text-[10px] font-mono text-[#0b2545]/50">01 / 01</span>
              </div>
              <h2 className="text-xl font-black tracking-tight text-[#0b2545] mb-3">Business before channels.</h2>
              <p className="text-sm text-[#0b2545]/75 leading-relaxed">
                Strategy, execution, measurement and optimization connected around commercial priorities — with structured implementation support built into the operating model.
              </p>
              <div className="mt-6 pt-5 border-t border-[#0b2545]/10 grid grid-cols-2 gap-4 text-[10px] font-mono uppercase tracking-[0.1em] text-[#0b2545]/65">
                <span>Demand</span><span>Conversion</span><span>Revenue</span><span>Efficiency</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-anim-item mt-12 border-t border-[#0b2545]/10 pt-6">
          <dl className="hero-metrics" aria-label="Business growth results">
            {[
              ['₹40Cr+', 'Revenue Influenced'],
              ['₹2Cr+', 'Monthly Media Scale'],
              ['3×', 'Acquisition Growth'],
              ['60+', 'Businesses & Products'],
            ].map(([value, label]) => (
              <div className="hero-metric" key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Hero;