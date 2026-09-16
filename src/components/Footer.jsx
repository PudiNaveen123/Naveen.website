import FlowBackground from './FlowBackground';

const Footer = () => {
  return (
    <footer className="bg-[#0b2545] text-white py-16 px-6 md:px-12 border-t border-white/10 select-none relative z-10 overflow-hidden">
      <FlowBackground variant="footer" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

      <div className="footer-content max-w-7xl mx-auto flex flex-col space-y-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-white/10">
          <div className="space-y-3 max-w-md">
            <div className="text-2xl md:text-3xl font-black text-white tracking-tighter">NAVEEN <span className="text-white/45">/</span> GROWTH.ENGINE</div>
            <p className="text-xs font-mono text-white/65 tracking-[0.16em] uppercase">Growth · Product · Data · Automation</p>
          </div>

          <nav className="flex flex-wrap gap-6 md:gap-8 text-xs font-mono uppercase tracking-widest text-white/75">
            <a href="#about" className="hover:text-white transition-colors">Perspective</a>
            <a href="#expertise" className="hover:text-white transition-colors">Capabilities</a>
            <a href="#skills" className="hover:text-white transition-colors">Systems</a>
            <a href="#projects" className="hover:text-white transition-colors">Work</a>
            <a href="#contact" className="hover:text-white transition-colors">Connect</a>
          </nav>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs font-mono text-white/65">
          <div className="flex items-center gap-6">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors uppercase tracking-wider">LinkedIn //</a>
            <a href="#contact" className="hover:text-white transition-colors uppercase tracking-wider">Email //</a>
          </div>
          <div className="tracking-widest uppercase">India · Working Across Markets</div>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-end pt-6 border-t border-white/5">
          <p className="md:col-span-7 text-[11px] font-mono text-white/55 uppercase tracking-widest">© {new Date().getFullYear()} Naveen Growth Engine. All Rights Reserved.</p>
          <p className="md:col-span-5 md:text-right text-[11px] font-mono text-white/75 uppercase tracking-widest">Built around measurable growth.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
