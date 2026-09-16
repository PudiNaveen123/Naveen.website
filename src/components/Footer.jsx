import FlowBackground from './FlowBackground';

const Footer = () => {
  return (
    <footer className="relative bg-[#0b2545] text-[#eef4ed] px-6 md:px-12 py-14 overflow-hidden">
      <FlowBackground variant="footer" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-end pb-10 border-b border-[#eef4ed]/10">
          <div className="lg:col-span-7">
            <div className="text-2xl md:text-3xl font-black tracking-tighter">GROWTH.ENGINE/</div>
            <p className="mt-3 text-sm text-[#eef4ed]/62 max-w-xl leading-relaxed">Connected growth systems across acquisition, conversion, product, intelligence and automation.</p>
          </div>
          <nav className="lg:col-span-5 flex flex-wrap lg:justify-end gap-x-6 gap-y-3 text-[10px] font-mono uppercase tracking-[0.14em] text-[#eef4ed]/60">
            <a href="#about" className="hover:text-[#eef4ed] transition-colors">Perspective</a>
            <a href="#expertise" className="hover:text-[#eef4ed] transition-colors">Capabilities</a>
            <a href="#skills" className="hover:text-[#eef4ed] transition-colors">Systems</a>
            <a href="#projects" className="hover:text-[#eef4ed] transition-colors">Work</a>
            <a href="#contact" className="hover:text-[#eef4ed] transition-colors">Connect</a>
          </nav>
        </div>

        <div className="pt-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[10px] font-mono uppercase tracking-[0.12em] text-[#eef4ed]/42">
          <p>© {new Date().getFullYear()} All Rights Reserved.</p>
          <p>Strategy · Systems · Business Movement</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
