import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', company: '', email: '', objective: '', message: '' });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Growth conversation:', formData);
    alert('Thanks — your message has been captured.');
    setFormData({ name: '', company: '', email: '', objective: '', message: '' });
  };

  return (
    <section id="contact" className="relative w-full bg-[#eef4ed] text-[#0b2545] py-28 px-6 md:px-12 overflow-hidden border-t border-[#0b2545]/10">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-[#134074]/[0.06] blur-[160px] pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <p className="text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-[#134074] mb-4">Start a Conversation</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.96] mb-6">Good growth conversations start with the <span className="text-[#134074]">business problem.</span></h2>
          <p className="text-sm md:text-base leading-relaxed text-[#0b2545]/68 max-w-xl">
            Acquisition, conversion, monetization, efficiency, operating systems or a broader business mandate — start with the context and the outcome that needs to move.
          </p>
          <div className="mt-9 grid grid-cols-2 gap-4 text-[10px] font-mono uppercase tracking-[0.11em] text-[#0b2545]/55">
            <span className="border-t border-[#0b2545]/12 pt-3">Growth Leadership</span>
            <span className="border-t border-[#0b2545]/12 pt-3">Business Mandates</span>
            <span className="border-t border-[#0b2545]/12 pt-3">Partnerships</span>
            <span className="border-t border-[#0b2545]/12 pt-3">New Opportunities</span>
          </div>
        </div>

        <div className="lg:col-span-7 rounded-[28px] border border-[#0b2545]/10 bg-[#eef4ed]/80 backdrop-blur-xl p-7 md:p-10 shadow-[0_24px_70px_rgba(11,37,69,0.07)]">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-x-6 gap-y-7">
            {[
              ['name', 'Name', 'text'],
              ['company', 'Company / Organisation', 'text'],
              ['email', 'Work Email', 'email'],
              ['objective', 'Growth Objective', 'text'],
            ].map(([id, label, type]) => (
              <label key={id} className="block">
                <span className="block text-[10px] font-mono uppercase tracking-[0.12em] text-[#0b2545]/45 mb-2">{label}</span>
                <input
                  id={id}
                  type={type}
                  value={formData[id]}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-[#0b2545]/18 py-3 text-base focus:outline-none focus:border-[#134074] transition-colors rounded-none"
                />
              </label>
            ))}

            <label className="md:col-span-2 block">
              <span className="block text-[10px] font-mono uppercase tracking-[0.12em] text-[#0b2545]/45 mb-2">Business Context</span>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="What is the business trying to solve, improve or scale?"
                className="w-full bg-transparent border-b border-[#0b2545]/18 py-3 text-base focus:outline-none focus:border-[#134074] transition-colors resize-none rounded-none placeholder:text-[#0b2545]/32"
              />
            </label>

            <div className="md:col-span-2 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 border-t border-[#0b2545]/10">
              <p className="text-xs leading-relaxed text-[#0b2545]/52 max-w-sm">A direct route for relevant business, leadership, partnership and strategic conversations.</p>
              <button type="submit" className="px-7 py-3.5 rounded-lg bg-[#134074] text-[#eef4ed] font-bold text-[11px] uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5">Start a Conversation</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
