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

    // --- Cinematic Stagger Entrance on Scroll ---
    gsap.fromTo(
      cardRefs.current,
      { y: 80, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // --- Interactive Magnetic Mouse Spotlight per Bento Card ---
    const cards = cardRefs.current;
    const handleMouseMove = (e, card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    cards.forEach((card) => {
      if (!card) return;
      const listener = (e) => handleMouseMove(e, card);
      card.addEventListener('mousemove', listener);
      return () => card.removeEventListener('mousemove', listener);
    });

  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#eef4ed] text-[#0b2545] py-32 px-6 md:px-12 flex flex-col justify-center select-none overflow-hidden"
    >
      {/* Background Cinematic Red Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#134074]/10 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#134074]/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">

        {/* Section Header */}
        <div className="flex flex-col items-start space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-[#eef4ed]/80 backdrop-blur-2xl border border-[#134074]/40 text-xs font-mono uppercase tracking-widest text-[#0b2545] shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#134074] animate-ping"></span>
            <span className="text-[#134074] font-bold">EPISODE 01</span>
            <span className="text-[#0b2545]">|</span>
            <span>ABOUT ME</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#0b2545]">
            CURIOUS MIND. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#134074] via-[#0b2545] to-[#134074] drop-shadow-[0_0_30px_rgba(19,64,116,0.4)]">
              REAL GROWTH.
            </span>
          </h2>
          <p className="flex items-center gap-4 text-xs md:text-sm font-mono tracking-[0.2em] text-[#0b2545]">
            <span className="w-10 h-px bg-[#134074]" aria-hidden="true"></span>
            PEOPLE × DATA × IDEAS × IMPACT
          </p>
        </div>

        {/* Bento Grid Layout with Interactive Mouse Light Tracking */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Card 1: My journey (Span 7) */}
          <div
            ref={addToRefs}
            className="md:col-span-7 p-8 md:p-12 bg-[#eef4ed]/90 backdrop-blur-2xl border border-[#0b2545]/10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between relative group hover:border-[#134074]/60 transition-all duration-500 overflow-hidden"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(19,64,116,0.15), transparent 70%)'
              }}
            ></div>

            <div className="absolute top-0 right-0 p-8 text-[#0b2545]/5 font-mono text-7xl font-black pointer-events-none">
              01
            </div>

            <div className="space-y-5 relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#134074] font-bold">MY JOURNEY & WHO I AM</h3>
              <p className="text-lg md:text-xl font-medium text-[#0b2545] leading-relaxed">
                I’m <span className="text-[#0b2545] font-bold drop-shadow">Pudi Naveen</span>, a Performance Marketer and Growth Manager with 5+ years of experience in digital marketing, user acquisition and product growth.
              </p>
              <p className="text-sm md:text-base text-[#0b2545] font-light leading-relaxed">
                I enjoy turning complex data into simple growth strategies, experimenting with new ideas, and building scalable systems that create real business impact.
              </p>
            </div>

            <div className="pt-8 flex flex-wrap gap-2 relative z-10">
              <span className="px-3.5 py-1.5 rounded bg-[#134074]/5 border border-[#0b2545]/10 text-xs font-mono text-[#0b2545]">Performance Marketing</span>
              <span className="px-3.5 py-1.5 rounded bg-[#134074]/5 border border-[#0b2545]/10 text-xs font-mono text-[#0b2545]">Product Growth</span>
              <span className="px-3.5 py-1.5 rounded bg-[#134074]/5 border border-[#0b2545]/10 text-xs font-mono text-[#0b2545]">Growth Strategy</span>
            </div>
          </div>

          {/* Card 2: Growth achievements (Span 5) */}
          <div
            ref={addToRefs}
            className="md:col-span-5 p-8 md:p-12 bg-[#eef4ed]/90 backdrop-blur-2xl border border-[#0b2545]/10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between relative group hover:border-[#134074]/60 transition-all duration-500 overflow-hidden"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(19,64,116,0.15), transparent 70%)'
              }}
            ></div>

            <div className="absolute top-0 right-0 p-8 text-[#0b2545]/5 font-mono text-7xl font-black pointer-events-none">
              02
            </div>

            <div className="space-y-5 relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#134074] font-bold">WHAT I’VE BUILT & DELIVERED</h3>
              <ul className="space-y-3.5 text-sm text-[#0b2545] font-light">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#134074] font-bold" aria-hidden="true">&#8250;</span>
                  <span>Managed ₹2Cr+ monthly acquisition budgets across Meta, Google Ads and other platforms.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#134074] font-bold" aria-hidden="true">&#8250;</span>
                  <span>Reduced CAC by 30% and achieved 113% ROAS on key campaigns.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#134074] font-bold" aria-hidden="true">&#8250;</span>
                  <span>Improved paywall conversion from 8% to 12% through funnel optimization.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#134074] font-bold" aria-hidden="true">&#8250;</span>
                  <span>Automated marketing reporting, cutting 7 hours of weekly work to ~7 minutes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#134074] font-bold" aria-hidden="true">&#8250;</span>
                  <span>Built AI & automation workflows to speed up campaign execution, creative testing and performance monitoring.</span>
                </li>
              </ul>
            </div>


          </div>

          {/* Card 3: Growth toolkit (Span 12) */}
          <div
            ref={addToRefs}
            className="md:col-span-12 p-8 md:p-12 bg-[#eef4ed]/90 backdrop-blur-2xl border border-[#0b2545]/10 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#134074]/60 transition-all duration-500 overflow-hidden relative group"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(19,64,116,0.15), transparent 70%)'
              }}
            ></div>

            <div className="space-y-2 text-left relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#134074] font-bold">MY GROWTH TOOLKIT</h3>
              <p className="text-base md:text-lg font-semibold text-[#0b2545]">Platforms, analytics and AI tools I use to plan, execute and scale growth.</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 relative z-10">
              {['Google Ads', 'Meta Ads', 'GA4', 'MMP', 'Google Sheets', 'Apps Script', 'n8n', 'Claude', 'ChatGPT', 'Looker Studio', 'Figma', 'Notion'].map((tech, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded bg-[#134074]/[0.04] border border-[#0b2545]/10 text-xs font-mono tracking-wider text-[#0b2545] shadow-inner hover:bg-[#134074]/20 hover:border-[#134074]/40 hover:scale-105 transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
