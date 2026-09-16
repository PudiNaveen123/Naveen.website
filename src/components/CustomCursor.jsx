import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const spotlightRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return;
    const dot = dotRef.current;
    const spotlight = spotlightRef.current;
    if (!dot) return;

    gsap.set(dot, { scale: 0.7, opacity: 0, transformOrigin: '50% 50%' });

    const xToDot = gsap.quickTo(dot, 'x', { duration: 0.05, ease: 'power2.out' });
    const yToDot = gsap.quickTo(dot, 'y', { duration: 0.05, ease: 'power2.out' });

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const dotSize = 8;

      xToDot(x - dotSize / 2);
      yToDot(y - dotSize / 2);

      if (spotlight) {
        spotlight.style.transform = `translate3d(${x - 350}px, ${y - 350}px, 0)`;
      }
    };

    const handleMouseEnter = () => {
      gsap.to(dot, { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' });
      if (spotlight) gsap.to(spotlight, { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(dot, { opacity: 0, scale: 0.7, duration: 0.25, ease: 'power2.inOut' });
      if (spotlight) gsap.to(spotlight, { opacity: 0, duration: 0.3 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      gsap.killTweensOf([dot, spotlight].filter(Boolean));
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={spotlightRef}
        className="fixed top-0 left-0 w-[700px] h-[700px] pointer-events-none z-[9998] opacity-0 blur-[110px] transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(19,64,116,0.10) 36%, rgba(19,64,116,0.035) 58%, transparent 76%)',
        }}
      />

      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-2 h-2 bg-[#134074] rounded-full shadow-[0_0_10px_rgba(19,64,116,0.55)]"
      />
    </>
  );
};

export default CustomCursor;
