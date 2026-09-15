import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const expertiseData = [
  {
    "number": "01",
    "title": "Performance Marketing",
    "text": "Meta Ads, Google Ads, LinkedIn and multi-channel acquisition focused on reaching the right audience, controlling CAC and maximizing return on every marketing rupee.",
    "tag": "ACQUIRE / SCALE / OPTIMIZE",
    "headline": "Paid growth built for scale.",
    "platforms": "META ADS · GOOGLE ADS · LINKEDIN · PAID SOCIAL",
    "gradient": "from-[#13315c] via-[#13315c] to-[#0b2545]"
  },
  {
    "number": "02",
    "title": "Product & Business Growth",
    "subtitle": "Funnel Growth",
    "text": "From landing pages and onboarding to paywalls and subscriptions — optimized journeys designed to remove friction and turn more users into customers.",
    "tag": "CONVERT / ENGAGE / RETAIN",
    "headline": "Every click has a next step.",
    "platforms": "CRO · ONBOARDING · PAYWALLS · MONETIZATION",
    "gradient": "from-[#13315c] via-[#13315c] to-[#0b2545]"
  },
  {
    "number": "03",
    "title": "Growth Analytics",
    "label": "INTELLIGENCE",
    "text": "GA4, MMPs, dashboards and experimentation frameworks that connect marketing performance with user behavior — turning raw data into decisions.",
    "tag": "MEASURE / EXPERIMENT / SCALE",
    "headline": "Numbers that reveal where growth is hiding.",
    "platforms": "GA4 · MMP · EXPERIMENTATION · ATTRIBUTION",
    "gradient": "from-[#13315c] via-[#13315c] to-[#0b2545]"
  },
  {
    "number": "04",
    "title": "AI-Powered Growth Systems",
    "text": "AI and automation workflows that transform repetitive marketing operations into scalable systems — from reporting and analysis to creative testing and campaign workflows.",
    "tag": "AUTOMATE / INNOVATE / ACCELERATE",
    "headline": "Less manual work. More room to think.",
    "platforms": "AI · N8N · APPS SCRIPT · AUTOMATION",
    "gradient": "from-[#13315c] via-[#13315c] to-[#0b2545]"
  }
];

const Expertise = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const cards = cardRefs.current;
    if (!cards.length) return;

    cards.forEach((card, index) => {
      if (index === cards.length - 1) return; // Keep the top-most card fully focused

      gsap.to(card, {
        scale: 0.92 - index * 0.025,
        y: -15 - index * 8,
        filter: "blur(6px)",
        opacity: 0.4,
        scrollTrigger: {
          trigger: card,
          start: `top ${90 + index * 20}px`,
          end: "bottom top",
          scrub: true,
        }
      });
    });

    // Magnetic mouse highlight per card
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

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      id="expertise"
      ref={containerRef}
      className="relative w-full bg-[#0b2545] text-[#eef4ed] py-20 px-6 md:px-12 select-none overflow-hidden"
    >
      {/* Cinematic Red Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-[#134074]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-12">
        
        {/* Compact Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#13315c]/80 backdrop-blur-xl border border-[#134074]/40 text-[11px] font-mono uppercase tracking-widest text-[#eef4ed] shadow-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-[#134074] animate-ping"></span>
              <span className="text-[#eef4ed] font-bold">EPISODE 02</span>
              <span className="text-[#eef4ed]">|</span>
              <span>GROWTH CAPABILITIES</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#eef4ed] tracking-tight leading-tight">
              WHAT I BUILD. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#eef4ed] via-[#eef4ed] to-[#eef4ed] drop-shadow-[0_0_25px_rgba(19,64,116,0.35)]">
                WHAT I SCALE.
              </span>
            </h2>
          </div>
          <p className="text-[#eef4ed] text-xs md:text-sm font-light leading-relaxed max-w-xs">
            <strong className="block text-[#eef4ed] font-semibold mb-2">THE GROWTH PLAYBOOK.</strong>
            Strategy, creativity, data and technology — connected to turn attention into acquisition, acquisition into customers, and customers into growth.
          </p>
        </div>

        {/* Compact 1-on-1 Gradient Stacking Container */}
        <div className="relative flex flex-col gap-8 pb-20">
          {expertiseData.map((item, index) => (
            <div
              key={index}
              ref={addToRefs}
              className={`sticky w-full p-6 md:p-8 rounded-2xl bg-gradient-to-br ${item.gradient} backdrop-blur-2xl border border-[#eef4ed]/10 shadow-[0_20px_45px_rgba(11,37,69,0.10)] flex flex-col justify-between min-h-[230px] md:min-h-[250px] transform-gpu transition-all overflow-hidden group hover:border-[#134074]/50`}
              style={{
                zIndex: index + 1,
                top: `${95 + index * 16}px`
              }}
            >
              {/* Dynamic Mouse Spotlight Highlight */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{
                  background: 'radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), rgba(19,64,116,0.18), transparent 70%)'
                }}
              ></div>

              {/* Crimson Accent Stripe */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-[2px] bg-gradient-to-r from-transparent via-[#134074] to-transparent z-10"></div>

              {/* Card Header Top */}
              <div className="flex items-center justify-between w-full mb-4 relative z-10">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#eef4ed] px-2.5 py-0.5 rounded bg-[#134074]/10 border border-[#134074]/25">
                  {item.tag}
                </span>
                <span className="text-2xl md:text-3xl font-mono font-black text-[#eef4ed]/20">
                  {item.number}
                </span>
              </div>

              {/* Card Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center my-auto relative z-10">
                <div className="lg:col-span-5">
                  <h3 className="text-2xl md:text-3xl font-black text-[#eef4ed] tracking-tight leading-snug group-hover:text-[#eef4ed] transition-colors duration-300">
                    {item.label && <span className="block text-xs font-mono tracking-widest text-[#eef4ed] mb-2">{item.label}</span>}
                    {item.title}
                    {item.subtitle && <span className="block text-sm font-medium text-[#eef4ed] mt-2">{item.subtitle}</span>}
                  </h3>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-xs md:text-sm text-[#eef4ed] font-light leading-relaxed">
                    <strong className="block text-[#eef4ed] font-semibold mb-2">{item.headline}</strong>
                    {item.text}
                    <span className="block text-[10px] font-mono tracking-wider text-[#eef4ed] mt-4">{item.platforms}</span>
                  </p>
                </div>
              </div>

              {/* Subtle Red Corner Dot */}
              <div className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-[#134074] group-hover:shadow-[0_0_10px_#134074] z-10 transition-all"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Expertise;