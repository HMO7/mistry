import { useEffect, useRef, useState } from "react";
import "./index.css";

// ── ICONS ───────────────────────────────────────────────────────────────────
const Icon = {
  Carpenter: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 17l4-8 4 4 4-6 4 10"/><path d="M3 21h18"/>
    </svg>
  ),
  Plumbing: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2v6m0 0C8.686 8 6 10.686 6 14h12c0-3.314-2.686-6-6-6z"/>
      <path d="M6 14v4a2 2 0 004 0v-4M14 14v4a2 2 0 004 0v-4"/>
    </svg>
  ),
  Electric: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Renovation: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  Aluminium: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  Painting: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2 13.5V19a2 2 0 002 2h16a2 2 0 002-2v-5.5"/><path d="M12 2L2 7l10 5 10-5-10-5z"/>
    </svg>
  ),
  Menu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Arrow: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  ),
  Phone: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.19 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15v1.92z"/>
    </svg>
  ),
  Mail: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Pin: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
};

// ── SERVICES DATA ────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: <Icon.Carpenter />, title: "Carpentry & Woodwork",
    desc: "Custom furniture, cabinets, doors, wardrobes & all woodwork crafted to perfection.",
    tags: ["Furniture", "Cabinets", "Doors", "Wardrobes"],
    color: "#8B6F47",
  },
  {
    icon: <Icon.Plumbing />, title: "Plumbing",
    desc: "Full plumbing installations, pipe fitting, bathroom fixtures & leak repairs.",
    tags: ["Pipe Fitting", "Fixtures", "Repairs", "New Setup"],
    color: "#3B82F6",
  },
  {
    icon: <Icon.Electric />, title: "Electrical",
    desc: "Safe electrical wiring, panel upgrades, lighting setup & smart home integration.",
    tags: ["Wiring", "Lighting", "Panels", "Smart Home"],
    color: "#F59E0B",
  },
  {
    icon: <Icon.Renovation />, title: "Full Renovation",
    desc: "Complete home renovation from planning to finishing — kitchens, baths & interiors.",
    tags: ["Interior", "Kitchen", "Bathroom", "Full Home"],
    color: "#10B981",
  },
  {
    icon: <Icon.Aluminium />, title: "Aluminium Work",
    desc: "Aluminium doors, windows, partitions, railings & structural fabrication.",
    tags: ["Windows", "Doors", "Railings", "Partitions"],
    color: "#6366F1",
  },
  {
    icon: <Icon.Painting />, title: "Painting & Finishing",
    desc: "Professional interior & exterior painting, wall textures and fine finishing.",
    tags: ["Interior", "Exterior", "Texture", "Polishing"],
    color: "#EC4899",
  },
];

// ── GALLERY DATA ─────────────────────────────────────────────────────────────
const GALLERY = [
  { src: "/room-kitchen.png", title: "Modern Kitchen Renovation", cat: "Renovation", label: "Renovation" },
  { src: "/room-living.png", title: "Living Room Transformation", cat: "Renovation", label: "Interior" },
  { src: "/room-bathroom.png", title: "Luxury Bathroom Design", cat: "Plumbing", label: "Plumbing" },
  { src: "/room-office.png", title: "Custom Home Office", cat: "Carpentry", label: "Carpentry" },
  { src: "/room-theater.png", title: "Home Theater Setup", cat: "Electrical", label: "Electrical" },
  { src: "/room-kids.png", title: "Kids Room Complete Build", cat: "Renovation", label: "Full Reno" },
  { src: "/room-zen.png", title: "Zen Relaxation Room", cat: "Renovation", label: "Interior" },
];

const FILTERS = ["All", "Renovation", "Carpentry", "Plumbing", "Electrical"];

// ── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const links = [
    { label: "Services", id: "services" },
    { label: "Our Work", id: "gallery" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="container">
          <a className="nav-logo">
            <img src="/logo.svg" alt="MMH Contractor" />
          </a>
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.id}>
                <a onClick={() => scrollTo(l.id)}>{l.label}</a>
              </li>
            ))}
            <li>
              <a className="nav-cta" onClick={() => scrollTo("contact")}>
                Get a Quote
              </a>
            </li>
          </ul>
          <button className="menu-btn" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Icon.Menu />
          </button>
        </div>
      </nav>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <button className="mobile-close" onClick={() => setMenuOpen(false)}>
          <Icon.X />
        </button>
        {links.map((l) => (
          <a key={l.id} onClick={() => scrollTo(l.id)}>{l.label}</a>
        ))}
        <a onClick={() => scrollTo("contact")} style={{ color: "var(--gold)" }}>Get a Quote →</a>
      </div>
    </>
  );
}

// ── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="hero" id="home">
      {/* warm ambient glow */}
      <div className="hero-glow" />

      {/* 3D room — centered, in front of text, edges softly faded */}
      <div className="hero-room">
        <img src="/room-living.png" alt="Modern living room renovation" />
      </div>

      {/* radial edge vignette */}
      <div className="hero-vignette" />

      {/* vertical explore — left side */}
      <button className="hero-scroll-btn fade-up-3" onClick={() => scrollTo("services")}>
        <span className="hero-scroll-label">Explore</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
      </button>

      {/* eyebrow — top left, absolute */}
      <span className="hero-eyebrow fade-up">Design the Future of Living</span>

      {/* "PERFECTLY" — bottom edge anchored at 50%, BEHIND the room (z-index 1) */}
      <div className="hero-heading-wrap">
        <h1 className="fade-up-2">Perfectly</h1>
      </div>

      {/* "BUILT." — top edge anchored at 50%, IN FRONT of room (z-index 4) */}
      <div className="hero-bottom-wrap">
        <div className="hero-sub-word fade-up-2">Built.</div>
      </div>

    </section>
  );
}

// ── SOCIAL PROOF STRIP ───────────────────────────────────────────────────────
function ProofStrip() {
  return (
    <div className="proof-strip">
      <div className="container proof-strip-inner">
        <div className="proof-left">
          <p className="proof-text">
            Every home service under one roof — carpentry, plumbing, electrical, full renovation &amp; more. 30+ years of trusted craftsmanship in Gujarat, India.
          </p>
          <span className="proof-location">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
            MMH Contractor · Gujarat, India
          </span>
        </div>
        <div className="proof-stats">
          <div className="proof-stat">
            <strong>30+</strong>
            <span>Years Experience</span>
          </div>
          <div className="proof-divider" />
          <div className="proof-stat">
            <strong>500+</strong>
            <span>Projects Done</span>
          </div>
          <div className="proof-divider" />
          <div className="proof-stat">
            <strong>98%</strong>
            <span>Satisfaction</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SERVICES ─────────────────────────────────────────────────────────────────
function Services() {
  return (
    <section className="section section-alt" id="services">
      <div className="container">
        <div className="section-head">
          <div className="section-label">What We Do</div>
          <h2 className="section-title">All Home Services,<br />One Trusted Team</h2>
          <p className="section-sub">
            We handle every trade in-house — no subcontracting, no surprises. Whatever your home needs, we've got it covered.
          </p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s) => (
            <div className="service-card" key={s.title}>
              <div className="service-icon" style={{ color: s.color }}>
                {s.icon}
              </div>
              <div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
              <div className="service-tags">
                {s.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── GALLERY ───────────────────────────────────────────────────────────────────
function Gallery() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? GALLERY : GALLERY.filter((g) => g.cat === active);

  return (
    <section className="section" id="gallery">
      <div className="container">
        <div className="section-head">
          <div className="section-label">Portfolio</div>
          <h2 className="section-title">Our Work Speaks<br />For Itself</h2>
        </div>
        <div className="gallery-filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn${active === f ? " active" : ""}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="gallery-grid">
          {filtered.map((item, i) => (
            <div className="gallery-card" key={item.src + i}>
              <img src={item.src} alt={item.title} loading="lazy" />
              <div className="gallery-overlay">
                <span className="badge">{item.label}</span>
                <h4>{item.title}</h4>
                <p>Gujarat, India</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PROCESS ───────────────────────────────────────────────────────────────────
function Process() {
  const steps = [
    { num: "01", title: "Free Consultation", desc: "Tell us about your project. We visit your site and understand your vision." },
    { num: "02", title: "Custom Quote", desc: "Receive a detailed, transparent quote with no hidden costs within 24 hours." },
    { num: "03", title: "Skilled Execution", desc: "Our certified team gets to work using premium materials and proven methods." },
    { num: "04", title: "Final Handover", desc: "We do a quality walkthrough with you and only sign off when you're delighted." },
  ];
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-head center">
          <div className="section-label">How It Works</div>
          <h2 className="section-title">Simple, Stress-Free Process</h2>
          <p className="section-sub">We keep things straightforward so you can relax while we transform your space.</p>
        </div>
        <div className="process-grid">
          {steps.map((s) => (
            <div className="process-card" key={s.num}>
              <div className="process-num">{s.num}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── WHY US ────────────────────────────────────────────────────────────────────
function WhyUs() {
  const features = [
    { icon: <Icon.Check />, title: "Licensed & Insured", desc: "All work is fully covered. We carry professional liability insurance on every project." },
    { icon: <Icon.Check />, title: "On-Time Delivery", desc: "We commit to deadlines and deliver on schedule — always." },
    { icon: <Icon.Check />, title: "Transparent Pricing", desc: "No surprise bills. The price we quote is the price you pay." },
    { icon: <Icon.Check />, title: "2-Year Workmanship Warranty", desc: "We stand behind every nail, pipe, and wire we install." },
  ];
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="why-grid">
          <div className="why-image">
            <img src="/room-zen.png" alt="Our quality work" />
          </div>
          <div>
            <div className="section-label">Why MMH</div>
            <h2 className="section-title">Built on Trust,<br />Delivered with Pride</h2>
            <p className="section-sub">
              With over 15 years serving Gujarat homes and businesses, we've earned a reputation for quality, honesty, and excellence across every trade.
            </p>
            <div className="why-features">
              {features.map((f) => (
                <div className="why-feature" key={f.title}>
                  <div className="why-icon">{f.icon}</div>
                  <div>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────
function Testimonials() {
  const reviews = [
    { text: "MMH renovated our entire kitchen and bathroom. The workmanship is outstanding — clean, precise, and exactly what we envisioned. Highly recommend!", author: "Priya S.", location: "Ahmedabad", initials: "PS" },
    { text: "They handled all our electrical and plumbing in one go. Saved us so much hassle coordinating different contractors. Will use again!", author: "Rahul M.", location: "Surat", initials: "RM" },
    { text: "The aluminium windows and doors they installed are perfect — tight seals, smooth operation. The team was professional and tidy throughout.", author: "Anjali K.", location: "Vadodara", initials: "AK" },
  ];
  return (
    <section className="section section-dark">
      <div className="container">
        <div className="section-head center">
          <div className="section-label" style={{ color: "var(--gold-light)" }}>Testimonials</div>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-sub">Real feedback from real homeowners across Gujarat.</p>
        </div>
        <div className="testimonials-grid">
          {reviews.map((r) => (
            <div className="testimonial-card" key={r.author}>
              <div className="stars">★★★★★</div>
              <blockquote>"{r.text}"</blockquote>
              <div className="testimonial-author">
                <div className="author-avatar">{r.initials}</div>
                <div className="author-info">
                  <strong>{r.author}</strong>
                  <span>{r.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CONTACT ───────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // @ts-ignore
    const emailjsLib = typeof emailjs !== "undefined" ? emailjs : null;

    if (!emailjsLib) {
      console.error("EmailJS SDK not loaded");
      setStatus("error");
      return;
    }

    try {
      emailjsLib.init("3mS1S_kRhAhUgWoiE");
      await emailjsLib.send("service_52v307t", "template_c3p4bfj", {
        name: form.name,
        contact_number: form.phone || "Not provided",
        message: `Service: ${form.service}\n\n${form.message}`,
        time: new Date().toLocaleString(),
      });
      setStatus("sent");
      setForm({ name: "", phone: "", email: "", service: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  return (
    <section className="section section-alt" id="contact">
      <div className="container">
        <div className="contact-wrapper">
          <div className="contact-info">
            <div className="section-label">Contact Us</div>
            <h2 className="section-title">Let's Build Something Great Together</h2>
            <p>Ready to transform your space? Get in touch for a free consultation and quote. We'll respond within 24 hours.</p>
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-item-icon"><Icon.Mail /></div>
                <div>
                  <strong>Email Us</strong>
                  <span>infocontrator@gmail.com</span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon"><Icon.Pin /></div>
                <div>
                  <strong>Location</strong>
                  <span>Gujarat, India — Serving all major cities</span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon"><Icon.Phone /></div>
                <div>
                  <strong>Call / WhatsApp</strong>
                  <span>Available Mon–Sat, 8am–7pm</span>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-form-card">
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.2rem", marginBottom: "1.5rem", color: "var(--navy)" }}>
              Request a Free Quote
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" placeholder="Your name" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="+91 00000 00000" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Service Needed *</label>
                <select required value={form.service} onChange={e => setForm({...form, service: e.target.value})}>
                  <option value="">Select a service...</option>
                  <option>Carpentry & Woodwork</option>
                  <option>Plumbing</option>
                  <option>Electrical</option>
                  <option>Full Home Renovation</option>
                  <option>Aluminium Work</option>
                  <option>Painting & Finishing</option>
                  <option>Multiple Services</option>
                </select>
              </div>
              <div className="form-group">
                <label>Tell Us About Your Project *</label>
                <textarea placeholder="Describe your project, room size, timeline..." required value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
              </div>
              {status === "sent" && (
                <p style={{ color: "#10B981", fontSize: "0.9rem", marginBottom: "1rem", fontWeight: 600 }}>
                  ✓ Message sent! We'll reach out within 24 hours.
                </p>
              )}
              {status === "error" && (
                <p style={{ color: "#EF4444", fontSize: "0.9rem", marginBottom: "1rem" }}>
                  Something went wrong. Please email us directly at infocontrator@gmail.com
                </p>
              )}
              <button type="submit" className="form-submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Send Request →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <div className="footer-brand">MMH <span>Contractor</span></div>
            <p className="footer-desc">
              Gujarat's complete home solutions provider — carpentry, plumbing, electrical, renovation, aluminium & more. One team for everything your home needs.
            </p>
          </div>
          <div className="footer-col">
            <h5>Services</h5>
            <ul>
              {["Carpentry & Woodwork","Plumbing","Electrical","Full Renovation","Aluminium Work","Painting"].map(s => (
                <li key={s}><a onClick={() => scrollTo("services")}>{s}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><a onClick={() => scrollTo("about")}>About Us</a></li>
              <li><a onClick={() => scrollTo("gallery")}>Our Work</a></li>
              <li><a onClick={() => scrollTo("contact")}>Get a Quote</a></li>
              <li><a>Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 MMH Contractor. All rights reserved.</p>
          <p>Made by Shashwattech · Gujarat, India</p>
        </div>
      </div>
    </footer>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProofStrip />
      <Services />
      <Gallery />
      <Process />
      <WhyUs />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
