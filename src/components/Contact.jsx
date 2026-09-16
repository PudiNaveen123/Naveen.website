import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Contact = () => {
  const ref = useRef(null);
  const [formData, setFormData] = useState({
    firstName: '',
    company: '',
    email: '',
    message: '',
    permission: false,
  });

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '20%']);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [id]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.permission) {
      alert('Please accept the contact permission checkbox.');
      return;
    }
    alert(`Thanks ${formData.firstName}! Your message has been captured.`);
    setFormData({ firstName: '', company: '', email: '', message: '', permission: false });
  };

  return (
    <section ref={ref} id="contact" className="bg-white w-full min-h-screen relative overflow-hidden flex items-end pt-32 pb-0 border-t border-[#0b2545]/10 select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] bg-[#134074]/12 rounded-full blur-[170px] pointer-events-none z-0" />

      <motion.div style={{ y }} className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-14 opacity-[0.06]">
        <h1 className="text-[24vw] leading-[0.75] font-black text-[#134074] uppercase tracking-tighter select-none scale-y-[1.45] origin-top">CONNECT</h1>
      </motion.div>

      <div className="relative z-10 w-full flex justify-end items-end">
        <motion.div
          initial={{ opacity: 0, y: 55 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          className="bg-white/95 backdrop-blur-2xl border-t border-l border-[#0b2545]/12 w-full md:w-[90%] lg:w-[82%] p-8 md:p-16 text-[#0b2545] flex flex-col justify-between rounded-tl-[3rem] shadow-[0_-28px_80px_rgba(11,37,69,0.10)] relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-1 bg-gradient-to-r from-transparent via-[#134074] to-transparent opacity-90" />

          <div className="flex items-center justify-between mb-12 md:mb-16 gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#134074] text-white border border-[#134074] text-[11px] font-mono uppercase tracking-[0.18em] font-bold shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Start a Conversation
            </div>
            <span className="text-xs font-mono text-[#13315c] tracking-[0.12em] hidden md:block">BUSINESS · LEADERSHIP · PARTNERSHIPS · OPPORTUNITIES</span>
          </div>

          <div className="mb-12 max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.95] text-[#0b2545] mb-5">Good conversations start with the business problem.</h2>
            <p className="text-sm md:text-base text-[#13315c] leading-relaxed max-w-2xl">Share the context, challenge or opportunity. The right conversation can begin around acquisition, conversion, product, systems, leadership or a broader growth mandate.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-12 md:gap-16 w-full">
            <div className="flex flex-col md:flex-row gap-12 md:gap-20 w-full">
              <div className="flex-1 flex flex-col gap-10">
                <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} placeholder="Name" required className="w-full bg-transparent border-b border-[#0b2545]/20 pb-3 text-lg focus:outline-none focus:border-[#134074] transition-colors placeholder-[#13315c] font-medium rounded-none text-[#0b2545]" />
                <input type="text" id="company" value={formData.company} onChange={handleChange} placeholder="Company / Organisation" className="w-full bg-transparent border-b border-[#0b2545]/20 pb-3 text-lg focus:outline-none focus:border-[#134074] transition-colors placeholder-[#13315c] font-medium rounded-none text-[#0b2545]" />
                <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Work Email" required className="w-full bg-transparent border-b border-[#0b2545]/20 pb-3 text-lg focus:outline-none focus:border-[#134074] transition-colors placeholder-[#13315c] font-medium rounded-none text-[#0b2545]" />
              </div>

              <div className="flex-1 flex flex-col">
                <textarea id="message" value={formData.message} onChange={handleChange} placeholder="What are you trying to move in the business?" required className="w-full h-full min-h-[170px] bg-transparent border-b border-[#0b2545]/20 pb-3 text-lg focus:outline-none focus:border-[#134074] transition-colors placeholder-[#13315c] font-medium resize-none rounded-none text-[#0b2545]" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-10 mt-4 pt-6 border-t border-[#0b2545]/10">
              <div className="flex-1 flex items-start gap-4 text-sm font-light text-[#13315c]">
                <input type="checkbox" id="permission" checked={formData.permission} onChange={handleChange} className="mt-1 w-4 h-4 cursor-pointer" style={{ accentColor: '#134074' }} />
                <label htmlFor="permission" className="cursor-pointer max-w-[320px] leading-snug">I give permission to contact me at this email address.</label>
              </div>

              <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
                <p className="max-w-[330px] text-xs text-[#13315c] leading-relaxed">Relevant conversations can include strategic roles, business mandates, partnerships, growth leadership and new opportunities.</p>
                <button type="submit" className="px-8 py-3.5 rounded bg-[#134074] text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-[#0b2545] transition-all duration-300 group whitespace-nowrap shadow-[0_12px_28px_rgba(19,64,116,0.22)] hover:-translate-y-1">
                  Start Conversation
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
