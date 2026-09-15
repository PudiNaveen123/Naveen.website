import { useEffect } from 'react';

// Keep the existing GSAP/Framer transforms independent of these soft entrances.
export default function ThemeMotion() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animations = new Set();
    let observer;
    const stop = () => { observer?.disconnect(); animations.forEach(a => a.cancel()); animations.clear(); };
    const start = () => {
      stop();
      if (preference.matches) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          const fade = target.animate([{ opacity: 0.5 }, { opacity: 1 }], { duration: 850, easing: 'ease-out' });
          animations.add(fade);
          const heading = target.querySelector('h2');
          if (heading) {
            const rise = heading.animate([{ translate: '0 22px', opacity: 0.35 }, { translate: '0 0', opacity: 1 }], { duration: 850, easing: 'cubic-bezier(.2,.7,.2,1)' });
            animations.add(rise);
          }
          observer.unobserve(target);
        });
      }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
      document.querySelectorAll('.harbour-theme > section:not(#home)').forEach(section => observer.observe(section));
    };
    start();
    preference.addEventListener('change', start);
    return () => { stop(); preference.removeEventListener('change', start); };
  }, []);
  return null;
}
