import pictureImg from '../Picture.png';
import './Hero.css';

const Hero = () => {
  const developerRoles = [
    'GROWTH HACKER // PRODUCT MARKETER',
    'DIGITAL MARKETER // ADS SPECIALIST',
    'PAID MARKETR // DISTRIBUTED SYSTEMS',
    'ACCLAIMED // ALGORITHMIC PROBLEM SOLVER'
  ];

  return (
    <section
      id="home"
      className="theme-hero relative w-full min-h-screen bg-[#f8faf9] overflow-hidden flex flex-col justify-between"
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
      `}</style>

      {/* 1. Cinematic Background Gradient & Marquee */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#f8faf9] via-white to-[#edf5f5] z-0">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-10">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...developerRoles, ...developerRoles].map((role, idx) => (
              <span key={idx} className="text-[14vw] font-black text-teal-600 mx-8 uppercase tracking-tighter">
                {role} &bull;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Direct Mouse Tracking Spotlight Beam (Glows wherever you move) */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-0 blur-[90px] transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(30,105,120,0.35) 0%, rgba(30,105,120,0.1) 40%, transparent 70%)'
        }}
      ></div>

      {/* 3. Main Content Layer */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col justify-between pt-24 pb-12">

        {/* Top Netflix Cinematic Badge */}
        <div className="hero-anim-item flex items-center justify-between w-full">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded bg-white/90 backdrop-blur-2xl border border-teal-600/40 text-xs font-mono uppercase tracking-widest text-slate-900 shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-teal-600 animate-ping"></span>
            <span className="text-teal-500 font-bold tracking-wider">BUSINESS GROWTH STRATEGIST</span>
            <span className="text-slate-500"></span>
            <span className="text-slate-700"></span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-500 tracking-wider">
            <span className="px-2 py-0.5 border border-slate-300 rounded bg-white/80">₹2Cr+ SCALE</span>
            <span className="px-2 py-0.5 border border-slate-300 rounded bg-white/80">AI × GROWTH</span>
          </div>
        </div>

        {/* Main Center Cinematic Stage Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 my-auto">

          {/* Left Side: Developer Story & Description */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-5 text-left">

            <div className="hero-anim-item flex items-center gap-3">
              <span className="px-2.5 py-0.5 bg-teal-700 text-white font-black text-xs rounded tracking-widest shadow-[0_0_20px_rgba(30,105,120,0.8)] animate-pulse">TOP 1%</span>
              <span className="text-slate-700 text-xs font-mono tracking-widest uppercase">GROWTH MARKETER & PROBLEM SOLVER</span>
            </div>

            <h1 className="hero-anim-item text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[0.95] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
              NAVEEN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-cyan-600 to-teal-700 drop-shadow-[0_0_35px_rgba(30,105,120,0.5)]">
            GROWTH.ENGINE
              </span>
            </h1>

            <div className="hero-anim-item flex items-center gap-3 text-xs font-mono text-teal-400 font-bold">
              <span className="px-2 py-0.5 bg-teal-500/10 border border-teal-500/30 rounded text-teal-500">₹2Cr+ MONTHLY SCALE</span>
              <span className="text-slate-500">•</span>
              <span>META • GOOGLE • AI • CRO</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-600">AUTOMATION</span>
            </div>

            <p className="hero-anim-item text-sm md:text-base text-slate-700 font-light leading-relaxed max-w-md drop-shadow">
              Building systems that grow businesses — combining performance marketing, product growth, AI automation, and experimentation to acquire, convert, and retain customers profitably.
            </p>

            {/* Action Button Set */}
            <div className="hero-anim-item flex items-center gap-4 pt-2">
              <a
                href="#projects"
                className="px-8 py-3.5 bg-white text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-teal-700 hover:text-white transition-all duration-300 shadow-[0_10px_35px_rgba(255,255,255,0.3)] flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                View Projects
              </a>
              <a
                href="#contact"
                className="px-8 py-3.5 bg-white text-slate-900 border border-slate-300 font-bold text-xs uppercase tracking-widest rounded hover:bg-slate-100 transition-all duration-300 shadow-xl backdrop-blur-md flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Contact Me
              </a>
            </div>
          </div>

          {/* Center: Interactive 3D Holographic Tilt Developer Poster Frame */}
          <div className="lg:col-span-4 flex justify-center perspective-[1200px]">
            <div
              className="relative group transform-gpu transition-transform duration-100 ease-out will-change-transform"
            >
              {/* Cinematic Red Neon Back Glow */}
              <div className="absolute -inset-3 bg-gradient-to-r from-teal-600/70 via-cyan-600/40 to-sky-600/20 rounded-3xl blur-3xl opacity-90 group-hover:opacity-100 animate-pulse duration-1000"></div>

              {/* Poster Card with Glossy Sheen */}
              <div className="relative w-[280px] md:w-[320px] p-3.5 bg-white/90 backdrop-blur-2xl rounded-2xl border border-teal-600/40 shadow-[0_40px_80px_rgba(0,0,0,0.95)] overflow-hidden">

                {/* Dynamic Specular Glare Layer */}
                <div
                  className="absolute inset-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transform-gpu z-40"
                ></div>

                {/* Netflix Series Tag */}
                <div className="absolute top-6 left-6 z-30 px-3 py-1 bg-teal-700 text-white font-mono text-[10px] font-bold tracking-widest rounded shadow-xl">
                  FEATURED DEV
                </div>

                <img
                  src={pictureImg}
                  alt="Developer Portrait"
                  className="w-full h-[330px] md:h-[390px] object-cover rounded-xl  group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Technical Specs & Stack */}
          <div className="hero-anim-item lg:col-span-3 flex flex-col items-start lg:items-end space-y-4 text-left lg:text-right">
            <div className="p-5 bg-white/90 backdrop-blur-2xl border border-slate-200 rounded-xl shadow-2xl max-w-xs">
              <h3 className="text-xs font-mono uppercase tracking-widest text-teal-500 font-bold mb-2">Performance marketing for ambitious brands</h3>
              <p className="text-xs text-slate-700 leading-relaxed font-light">
                Paid ads, UGC creative systems, SEO/AEO/GEO, growth strategy — built to scale profitably, not just spend budget.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Cinematic Ticker */}
        <div className="hero-anim-item flex items-center justify-between text-xs font-mono text-slate-500 tracking-widest uppercase">
          <span>BUILT FOR PROFITABLE GROWTH</span>
          <span></span>
        </div>
      </div>

      {/* 4. Ultra Pro Max Custom Precision Cursor Suite */}
      <div
        className="absolute top-0 left-0 z-50 pointer-events-none w-3 h-3 bg-teal-600 rounded-full shadow-[0_0_15px_#1E6978]"
      ></div>

      <div
        className="absolute top-0 left-0 z-50 pointer-events-none w-12 h-12 border border-teal-600/60 rounded-full flex items-center justify-center backdrop-blur-[1px]"
      ></div>

      {/* --- NETFLIX-THEMED DEVELOPER NAVBAR --- */}
      <header className="absolute top-0 left-0 z-50 w-full max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between pointer-events-auto">
        <div className="text-2xl font-black text-teal-600 tracking-tighter flex items-center gap-2 drop-shadow-[0_2px_15px_rgba(30,105,120,0.9)]">
          NAVEEN KUMAR<span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-slate-700">
          <a href="#home" className="hover:text-teal-500 transition-colors">Home</a>
          <a href="#about" className="hover:text-teal-500 transition-colors">About</a>
          <a href="#expertise" className="hover:text-teal-500 transition-colors">Expertise</a>
          <a href="#skills" className="hover:text-teal-500 transition-colors">Skills</a>
          <a href="#projects" className="hover:text-teal-500 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-teal-500 transition-colors">Contact</a>
        </nav>
        <a
          href="#hire"
          className="px-5 py-2 rounded bg-teal-600 hover:bg-teal-800 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(30,105,120,0.6)] hover:scale-105 active:scale-95"
        >
          Hire Me
        </a>
      </header>
    </section>
  );
};

export default Hero;
