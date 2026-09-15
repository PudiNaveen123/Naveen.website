import FlowBackground from './FlowBackground';

const Footer = () => {
  return (
    <footer className="bg-[#081c15] text-[#ebf2fa] py-16 px-6 md:px-12 border-t border-[#ebf2fa]/10 select-none relative z-10">
      <FlowBackground variant="footer" />
      <div className="footer-content max-w-7xl mx-auto flex flex-col space-y-12">
        
        {/* Top Section: Brand & Quick Links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-[#ebf2fa]/10">
          <div className="space-y-2">
            <div className="text-2xl font-black text-[#fbb02d] tracking-tighter flex items-center gap-2 drop-shadow-[0_2px_15px_rgba(3,134,102,0.9)]">
              SUSHMITA<span className="w-1.5 h-1.5 rounded-full bg-[#038666] inline-block"></span>
            </div>
            <p className="text-xs font-mono text-[#ebf2fa] tracking-widest uppercase">
              // NETFLIX DEVELOPER SERIES &bull; SEASON 2026
            </p>
          </div>

          {/* Quick Navigation Links */}
          <nav className="flex flex-wrap gap-6 md:gap-8 text-xs font-mono uppercase tracking-widest text-[#ebf2fa]">
            <a href="#home" className="hover:text-[#fbb02d] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#fbb02d] transition-colors">About</a>
            <a href="#expertise" className="hover:text-[#fbb02d] transition-colors">Expertise</a>
            <a href="#skills" className="hover:text-[#fbb02d] transition-colors">Skills</a>
            <a href="#projects" className="hover:text-[#fbb02d] transition-colors">Projects</a>
            <a href="#contact" className="hover:text-[#fbb02d] transition-colors">Contact</a>
          </nav>
        </div>

        {/* Middle Section: Socials & External Profiles */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs font-mono text-[#ebf2fa]">
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[#fbb02d] transition-colors uppercase tracking-wider"
            >
              GitHub //
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[#fbb02d] transition-colors uppercase tracking-wider"
            >
              LinkedIn //
            </a>
            <a 
              href="https://leetcode.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[#fbb02d] transition-colors uppercase tracking-wider"
            >
              LeetCode //
            </a>
          </div>

          <div className="text-[#ebf2fa] tracking-widest uppercase">
            LOCATION: ANDHRA PRADESH, IN
          </div>
        </div>

        {/* Bottom Copyright & Cinematic Tagline */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-[#ebf2fa]/5 text-[11px] font-mono text-[#ebf2fa] uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Dasari Venkata Ratna Sri Sushmita. All Rights Reserved.</p>
          <p className="text-[#fbb02d]/80">STREAMING WORLDWIDE &bull; BUILT WITH REACT & GSAP</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;