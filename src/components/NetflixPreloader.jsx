import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MinimalPreloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete?.();
      return;
    }

    const tl = gsap.timeline({ onComplete: () => onComplete?.() });
    tl.set(preloaderRef.current, { autoAlpha: 1 })
      .fromTo(contentRef.current, { scale: 0.94, opacity: 0, filter: 'blur(10px)' }, { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.42, ease: 'power3.out' })
      .to(contentRef.current, { scale: 1.045, opacity: 0, filter: 'blur(10px)', duration: 0.28, ease: 'power2.in', delay: 0.18 })
      .to(preloaderRef.current, { opacity: 0, duration: 0.28, ease: 'power2.inOut' });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="fixed inset-0 z-[9999] bg-white flex items-center justify-center select-none overflow-hidden">
      <div className="absolute w-[420px] h-[420px] bg-[#134074]/10 rounded-full blur-[120px]" />
      <div ref={contentRef} className="relative flex flex-col items-center gap-4">
        <div className="w-2.5 h-2.5 rounded-full bg-[#134074] animate-ping" />
        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-[0.22em] text-[#0b2545]">NAVEEN <span className="text-[#134074]">GROWTH.ENGINE</span></h1>
        <span className="text-[9px] font-mono tracking-[0.22em] text-[#13315c] uppercase">Strategy · Scale · Systems</span>
      </div>
    </div>
  );
};

export default MinimalPreloader;
