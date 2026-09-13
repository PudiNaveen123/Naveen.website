import { useState } from "react";
import portrait from "./Picture.png";
import "./App.css";

const services = [
  [
    "01",
    "Growth strategy",
    "Find the next meaningful opportunity.",
    "Business and funnel audits, audience research, channel planning, and a clear roadmap tied to commercial goals.",
  ],
  [
    "02",
    "Performance marketing",
    "Turn demand into customers.",
    "Meta and Google campaign strategy, creative testing, budget allocation, and conversion optimisation.",
  ],
  [
    "03",
    "Organic & app growth",
    "Build discovery that compounds.",
    "SEO, app store optimisation, content strategy, and messaging that helps the right audience find your business.",
  ],
  [
    "04",
    "Retention & automation",
    "Make every customer journey count.",
    "Lifecycle communication, WhatsApp workflows, funnel reporting, and experiments across activation and retention.",
  ],
];
const steps = [
  [
    "Diagnose",
    "Understand your business, customers, economics, and where the funnel loses momentum.",
  ],
  [
    "Prioritise",
    "Choose the audiences, channels, and experiments with the clearest business potential.",
  ],
  [
    "Execute",
    "Connect campaigns, content, landing pages, and follow-up into one customer journey.",
  ],
  [
    "Improve",
    "Review acquisition, conversion, and retention data. Refine the plan as evidence builds.",
  ],
];
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [briefReady, setBriefReady] = useState(false);
  function downloadBrief(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const brief = `GROWTH BRIEF\nFor: Pudi Naveen Kumar\n\nName: ${data.get("name")}\nBusiness: ${data.get("business")}\nEmail: ${data.get("email")}\nPrimary goal: ${data.get("goal")}\n\nContext:\n${data.get("context")}\n`;
    const url = URL.createObjectURL(
      new Blob([brief], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "growth-brief.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setBriefReady(true);
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header wrap">
        <a href="#home" className="brand" aria-label="Naveen home">
          naveen<span>↗</span>
          <small>GROWTH MARKETING</small>
        </a>
        <button
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
        <nav
          id="navigation"
          className={menuOpen ? "open" : ""}
          aria-label="Main navigation"
        >
          {[
            ["About", "about"],
            ["Services", "services"],
            ["Approach", "approach"],
          ].map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <a
            className="nav-cta"
            href="#contact"
            onClick={() => setMenuOpen(false)}
          >
            Let’s talk growth <span>↗</span>
          </a>
        </nav>
      </header>
      <main id="main">
        <section id="home" className="hero wrap">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="dot" /> PUDI NAVEEN KUMAR · GROWTH MARKETING
              CONSULTANT
            </p>
            <h1>
              Helping businesses scale through <em>data-driven growth.</em>
            </h1>
            <p className="intro">
              I help brands increase leads, customers, and revenue through
              data-backed marketing strategies and continuous optimisation.
            </p>
            <div className="actions">
              <a className="button dark" href="#contact">
                Get Your Free Growth Plan <span>↗</span>
              </a>
              <a className="text-link" href="#approach">
                See how it works <span>↓</span>
              </a>
            </div>
            <div className="hero-note">
              <span>STRATEGY</span>
              <i>+</i>
              <span>EXECUTION</span>
              <i>+</i>
              <span>MEASUREMENT</span>
            </div>
          </div>
          <div className="portrait-panel">
            <div className="portrait-top">
              <span>
                YOUR NEXT CHAPTER
                <br />
                OF GROWTH STARTS HERE.
              </span>
              <span className="asterisk" aria-hidden="true">
                ✳
              </span>
            </div>
            <img src={portrait} alt="Pudi Naveen Kumar" fetchPriority="high" />
            <div className="portrait-caption">
              <div>
                <strong>Pudi Naveen Kumar</strong>
                <span>Growth Marketing Consultant</span>
              </div>
              <span className="circle-arrow" aria-hidden="true">
                ↗
              </span>
            </div>
          </div>
        </section>
        <div className="focus-strip">
          <div className="wrap">
            <span>
              A COMMERCIAL MINDSET.
              <br />
              <b>ACROSS THE WHOLE FUNNEL.</b>
            </span>
            <p>
              Acquire <i>↗</i> Convert <i>↗</i> Retain <i>↗</i> Grow
            </p>
          </div>
        </div>
        <section id="about" className="section wrap about">
          <p className="eyebrow">01 / THE PERSON BEHIND THE PLAN</p>
          <div>
            <h2>Good marketing starts with a better business question.</h2>
            <p className="body-copy">
              Where is growth getting stuck? Who are your most valuable
              customers? Which channels deserve the next rupee? I connect those
              questions to practical marketing decisions.
            </p>
            <p className="body-copy">
              My work brings together performance marketing, product growth,
              content, and automation — with a focus on the journey from first
              discovery to repeat customer.
            </p>
            <a className="text-link" href="#services">
              Explore how I can help <span>↘</span>
            </a>
          </div>
        </section>
        <section id="services" className="services section">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">02 / HOW I CAN HELP</p>
                <h2>
                  Built around your
                  <br />
                  next growth challenge.
                </h2>
              </div>
              <p>
                Clear priorities. Connected execution.
                <br />
                Progress you can measure.
              </p>
            </div>
            <div className="service-grid">
              {services.map(([number, title, headline, description]) => (
                <article className="service-card" key={number}>
                  <div className="card-top">
                    <span>{number}</span>
                    <span aria-hidden="true">↗</span>
                  </div>
                  <h3>{title}</h3>
                  <strong>{headline}</strong>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="approach" className="section wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">03 / THE WAY I WORK</p>
              <h2>
                A clear path.
                <br />A continuous feedback loop.
              </h2>
            </div>
            <p>
              From the first question to the next experiment,
              <br />
              every step serves a business goal.
            </p>
          </div>
          <div className="steps">
            {steps.map(([title, description], index) => (
              <article key={title}>
                <span className="step-number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="engagement wrap">
          <p className="eyebrow">FIND THE RIGHT STARTING POINT</p>
          <div>
            <h2>
              A focused audit.
              <br />A growth roadmap.
              <br />
              <em>An ongoing partnership.</em>
            </h2>
            <p>
              Start with the challenge you need to solve. The scope can centre
              on strategy, campaign improvement, or ongoing growth support.
            </p>
          </div>
        </section>
        <section id="contact" className="section wrap contact">
          <div>
            <p className="eyebrow">04 / YOUR NEXT MOVE</p>
            <h2>
              What would growth
              <br />
              look like for you<span className="green">?</span>
            </h2>
            <p className="body-copy">
              Share where your business is today and where you want it to go.
              Start by preparing a short growth brief.
            </p>
            <p className="contact-note">
              Download your brief to keep or share. This form saves a file on
              your device; it does not send an enquiry.
            </p>
          </div>
          <form onSubmit={downloadBrief} onChange={() => setBriefReady(false)}>
            <div className="form-row">
              <label>
                Your name
                <input
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="Full name"
                />
              </label>
              <label>
                Business
                <input
                  name="business"
                  autoComplete="organization"
                  required
                  placeholder="Business or brand"
                />
              </label>
            </div>
            <label>
              Email
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@company.com"
              />
            </label>
            <label>
              What is your primary goal?
              <select name="goal" defaultValue="" required>
                <option value="" disabled>
                  Select a growth priority
                </option>
                <option>Generate qualified leads</option>
                <option>Improve customer acquisition</option>
                <option>Grow app installs and subscriptions</option>
                <option>Improve conversion and retention</option>
                <option>Build a growth strategy</option>
              </select>
            </label>
            <label>
              A little context
              <textarea
                name="context"
                rows="3"
                required
                placeholder="Your business, current challenge, and what you want to achieve."
              />
            </label>
            <button className="button dark" type="submit">
              Download My Growth Brief <span>↓</span>
            </button>
            <p role="status" className="form-status">
              {briefReady
                ? "Your brief is ready. Check your downloads. No enquiry has been sent."
                : "Your information stays in your browser until you download it."}
            </p>
          </form>
        </section>
      </main>
      <footer className="wrap footer">
        <a className="brand" href="#home">
          naveen<span>↗</span>
        </a>
        <p>© {new Date().getFullYear()} Pudi Naveen Kumar</p>
        <a href="https://github.com/PudiNaveen123">GitHub ↗</a>
        <a href="#home">Back to top ↑</a>
      </footer>
    </>
  );
}
export default App;
