import FlowBackground from './FlowBackground';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import pictureImg from '../Picture.png';
import './Hero.css';

const Hero = ({ startMotion = true }) => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const spotlightRef = useRef(null);
  const contentRef = useRef(null);

  const systemSignals = [
    'ACQUISITION // CONVERSION',
    'PRODUCT // REVENUE',
    'DATA // AUTOMATION',
    'STRATEGY // EXECUTION',
  ];

  useEffect(() => {
    if (!startMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const section = sectionRef.current;
    const card = cardRef.current;
    const content = contentRef.current;
    if (!section || !card || !content) return;

    const animatedNodes = [
      card,
      glareRef.current,
      spotlightRef.current,
      ...content.querySelectorAll('.hero-anim-item'),
      section.querySelector('header'),
    ].filter(Boolean);

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.fromTo(section.querySelector('header'), { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
      .fromTo(content.querySelectorAll('.hero-anim-item'), { y: 50, opacity: 0, filter: 'blur(10px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.05, stagger: 0.1 }, '-=0.72')
      .fromTo(card, { scale: 0.78, opacity: 0, rotationY: 32, rotationX: -12 }, { scale: 1, opacity: 1, rotationY: 0, rotationX: 0, duration: 1.35, ease: 'back.out(1.18)' }, '-=0.88');

    const xTilt = gsap.quickTo(card, 'rotationY', { duration: 0.4, ease: 'power3.out' });
    const yTilt = gsap.quickTo(card, 'rotationX', { duration: 0.4, ease: 'power3.out' });
    const glareX = gsap.quickTo(glareRef.current, 'x', { duration: 0.3, ease: 'power2.out' });
    const glareY = gsap.quickTo(glareRef.current, 'y', { duration: 0.3, ease: 'power2.out' });

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (spotlightRef.current) spotlightRef.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;

      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2 - rect.left;
      const cardCenterY = cardRect.top + cardRect.height / 2 - rect.top;
      const rotateX = -((y - cardCenterY) / (cardRect.height / 2)) * 12;
      const rotateY = ((x - cardCenterX) / (cardRect.width / 2)) * 12;
      xTilt(rotateY);
      yTilt(rotateX);
      glareX((x - cardRect.left) - cardRect.width / 2);
      glareY((y - cardRect.top) - cardRect.height / 2);
    };

    const handleMouseEnter = () => {
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
      xTilt(0);
      yTilt(0);
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseenter', handleMouseEnter);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      tl.kill();
      gsap.killTweensOf(animatedNodes);
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseenter', handleMouseEnter);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [startMotion]);

  return (
    <section ref={sectionRef} id="home" className="theme-hero relative w-full min-h-screen bg-white overflow-hidden flex flex-col justify-between">
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display:flex; width:max-content; animation:marquee 38s linear infinite; }
      `}</style>

      <FlowBackground />

      <div className="absolute inset-0 z-[1]">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.055]">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...systemSignals, ...systemSignals].map((signal, idx) => (
              <span key={idx} className="text-[13vw] font-black text-[#134074] mx-8 uppercase tracking-tighter">{signal} &bull;</span>
            ))}
          </div>
        </div>
      </div>

      <div ref={spotlightRef} className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-0 blur-[90px] transition-opacity duration-300" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.34) 0%, rgba(19,64,116,0.14) 36%, rgba(19,64,116,0.05) 56%, transparent 72%)' }} />

      <div ref={contentRef} className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col justify-between pt-24 pb-10">
        <div className="hero-anim-item flex items-center justify-between w-full gap-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-2xl border border-[#134074]/25 text-xs font-mono text-[#0b2545] shadow-[0_8px_30px_rgba(11,37,69,0.08)]">
            <span className="w-2 h-2 rounded-full bg-[#134074] animate-ping" />
            <span className="text-[#134074] font-bold tracking-wide normal-case">Growth That Moves the Business.</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-[#0b2545] tracking-[0.14em]">
            <span className="px-3 py-1.5 border border-[#0b2545]/15 rounded-md bg-white/85">₹2Cr+ MONTHLY SCALE</span>
            <span className="px-3 py-1.5 border border-[#0b2545]/15 rounded-md bg-white/85">AI × GROWTH SYSTEMS</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 my-auto py-8">
          <div className="lg:col-span-5 flex flex-col items-start space-y-5 text-left">
            <div className="hero-anim-item flex items-center gap-3">
              <span className="px-3 py-1 bg-[#134074] text-white font-black text-[10px] rounded tracking-[0.16em] shadow-[0_8px_24px_rgba(19,64,116,0.22)]">STRATEGY · SCALE · SYSTEMS</span>
            </div>

            <h1 className="hero-anim-item text-5xl md:text-7xl font-black tracking-tighter text-[#0b2545] leading-[0.95]">
              NAVEEN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#134074] via-[#0b2545] to-[#134074] drop-shadow-[0_0_28px_rgba(19,64,116,0.16)]">GROWTH.ENGINE</span>
            </h1>

            <div className="hero-anim-item flex flex-wrap items-center gap-2 text-[10px] md:text-xs font-mono text-[#134074] font-bold tracking-wide">
              <span className="px-2.5 py-1 bg-white border border-[#134074]/20 rounded">ACQUISITION</span>
              <span className="px-2.5 py-1 bg-white border border-[#134074]/20 rounded">PRODUCT</span>
              <span className="px-2.5 py-1 bg-white border border-[#134074]/20 rounded">CRO</span>
              <span className="px-2.5 py-1 bg-white border border-[#134074]/20 rounded">DATA</span>
              <span className="px-2.5 py-1 bg-white border border-[#134074]/20 rounded">AUTOMATION</span>
            </div>

            <p className="hero-anim-item text-sm md:text-base text-[#13315c] font-light leading-relaxed max-w-md">Connected systems across acquisition, product, conversion, data and automation — built to turn growth activity into measurable business movement.</p>

            <div className="hero-anim-item flex items-center gap-4 pt-2 flex-wrap">
              <a href="#projects" className="px-7 py-3.5 bg-[#134074] text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-[#0b2545] transition-all duration-300 shadow-[0_12px_28px_rgba(19,64,116,0.22)] flex items-center gap-2 hover:-translate-y-1">Explore Growth Work</a>
              <a href="#contact" className="px-7 py-3.5 bg-white text-[#0b2545] border border-[#0b2545]/15 font-bold text-xs uppercase tracking-widest rounded-lg hover:border-[#134074]/50 hover:text-[#134074] transition-all duration-300 shadow-sm backdrop-blur-md flex items-center gap-2 hover:-translate-y-1">Start a Conversation</a>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center perspective-[1200px]">
            <div ref={cardRef} className="relative group transform-gpu transition-transform duration-100 ease-out will-change-transform">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#134074]/28 via-[#134074]/14 to-white rounded-[30px] blur-3xl opacity-90 group-hover:opacity-100 duration-1000" />
              <div className="relative w-[280px] md:w-[320px] p-3.5 bg-white/92 backdrop-blur-2xl rounded-2xl border border-[#134074]/25 shadow-[0_36px_85px_rgba(11,37,69,0.24)] overflow-hidden">
                <div ref={glareRef} className="absolute inset-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/35 to-transparent pointer-events-none transform-gpu z-40" />
                <div className="absolute top-6 left-6 z-30 px-3 py-1.5 bg-[#134074] text-white font-mono text-[10px] font-bold tracking-widest rounded shadow-xl">BUSINESS GROWTH</div>
                <img src={pictureImg} alt="Business growth portrait" className="w-full h-[330px] md:h-[390px] object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-500" />
                <div className="absolute bottom-6 left-6 right-6 z-30 flex items-center justify-between text-[9px] font-mono tracking-[0.14em] text-white drop-shadow-lg">
                  <span>STRATEGY</span><span>EXECUTION</span><span>IMPACT</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-anim-item lg:col-span-3 flex flex-col items-start lg:items-end space-y-4 text-left lg:text-right">
            <div className="p-5 bg-white/90 backdrop-blur-2xl border border-[#0b2545]/12 rounded-2xl shadow-[0_20px_55px_rgba(11,37,69,0.10)] max-w-xs">
              <div className="text-[10px] font-mono tracking-[0.18em] text-[#134074] font-bold mb-3 uppercase">Connected Growth System</div>
              <h3 className="text-base font-black text-[#0b2545] mb-3">From attention to commercial movement.</h3>
              <p className="text-xs text-[#13315c] leading-relaxed font-light">Acquisition, product experience, conversion, analytics and execution working as one operating system—not isolated activities.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
              <div className="bg-white/80 border border-[#0b2545]/10 rounded-xl p-4 text-left shadow-sm"><strong className="block text-lg text-[#0b2545]">5+</strong><span className="text-[10px] text-[#13315c] font-mono uppercase tracking-wider">Years Exposure</span></div>
              <div className="bg-white/80 border border-[#0b2545]/10 rounded-xl p-4 text-left shadow-sm"><strong className="block text-lg text-[#0b2545]">60+</strong><span className="text-[10px] text-[#13315c] font-mono uppercase tracking-wider">Business Contexts</span></div>
            </div>
          </div>
        </div>

        <div className="hero-anim-item flex items-center justify-between text-[10px] font-mono text-[#13315c] tracking-[0.16em] uppercase border-t border-[#0b2545]/10 pt-4"><span>BUILT AROUND MEASURABLE GROWTH</span><span className="hidden md:inline">STRATEGY → SYSTEM → EXECUTION → LEARNING</span></div>

        <dl className="hero-anim-item hero-metrics" aria-label="Business growth results">
          {[
            ['₹40Cr+', 'Revenue Influenced'],
            ['₹2Cr+', 'Monthly Media Scale'],
            ['3×', 'Acquisition Growth'],
            ['60+', 'Businesses & Products'],
          ].map(([value, label]) => (
            <div className="hero-metric" key={label}><dt>{label}</dt><dd>{value}</dd></div>
          ))}
        </dl>
      </div>

      <header className="absolute top-0 left-0 z-50 w-full px-6 md:px-12 py-5 flex items-center justify-between pointer-events-auto bg-white/60 backdrop-blur-xl border-b border-[#0b2545]/8">
        <div className="text-xl md:text-2xl font-black text-[#134074] tracking-tighter flex items-center gap-2">GROWTH.ENGINE<span className="w-1.5 h-1.5 rounded-full bg-[#134074] inline-block" /></div>
        <nav className="hidden md:flex items-center gap-7 text-[10px] font-mono uppercase tracking-[0.16em] text-[#0b2545]">
          <a href="#about" className="hover:text-[#134074] transition-colors">Perspective</a>
          <a href="#expertise" className="hover:text-[#134074] transition-colors">Capabilities</a>
          <a href="#skills" className="hover:text-[#134074] transition-colors">Systems</a>
          <a href="#projects" className="hover:text-[#134074] transition-colors">Work</a>
          <a href="#contact" className="hover:text-[#134074] transition-colors">Connect</a>
        </nav>
        <a href="#contact" className="px-5 py-2.5 rounded-lg bg-[#134074] hover:bg-[#0b2545] text-white font-bold text-[10px] uppercase tracking-[0.14em] transition-all duration-300 shadow-[0_8px_20px_rgba(19,64,116,0.18)] hover:-translate-y-0.5">Start a Conversation</a>
      </header>
    </section>
  );
};

export default Hero;
