import { useEffect, useRef, useState, useCallback } from "react";
import "./index.css";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=1200&q=80",
    title: "Custom Dining Table",
    desc: "Handcrafted oak with elegant joinery",
  },
  {
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&q=80",
    title: "Modern Kitchen Cabinets",
    desc: "Premium materials, flawless finish",
  },
  {
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
    title: "Elegant Interior Doors",
    desc: "Custom design, perfect fit",
  },
  {
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
    title: "Luxury Wardrobe",
    desc: "Spacious design, premium hardware",
  },
  {
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=1200&q=80",
    title: "Handcrafted Wooden Seating",
    desc: "Timeless craftsmanship with strength, comfort, and elegance.",
  },
  {
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
    title: "Custom House Renovation",
    desc: "Transform your home with expert craftsmanship and attention to detail",
  },
];

function Navbar({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = el.offsetTop - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const nav = document.getElementById("navMenu");
      const toggle = document.getElementById("menuToggle");
      if (nav && toggle && !nav.contains(e.target as Node) && !toggle.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-brand">
          <img src="/logo.svg" alt="MMH Contractor Logo" style={{ height: 50, width: "auto" }} />
        </div>
        <button
          className="menu-toggle"
          id="menuToggle"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
        <ul className={`nav-menu${menuOpen ? " active" : ""}`} id="navMenu">
          {["home", "gallery", "about", "services", "contact"].map((id) => (
            <li key={id}>
              <a onClick={() => scrollTo(id)} style={{ textTransform: "capitalize" }}>{id}</a>
            </li>
          ))}
          <li>
            <button className="theme-toggle" id="themeToggle" aria-label="Toggle theme" onClick={toggleTheme}>
              {theme === "dark" ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Masterful House &amp; Business work<br />Built to Last</h1>
        <p className="hero-subtitle">Custom furniture, House Renovation and woodwork crafted with precision and passion. Where tradition meets modern excellence.</p>
        <div className="hero-buttons">
          <a href="#gallery" className="btn btn-primary" onClick={(e) => { e.preventDefault(); scrollTo("gallery"); }}>View Our Work</a>
          <a href="#contact" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>Contact Us</a>
        </div>
      </div>
      <div className="hero-overlay" />
    </section>
  );
}

function Gallery() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
  }, []);

  const stopAuto = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    startAuto();
    return () => stopAuto();
  }, [startAuto, stopAuto]);

  const goTo = (i: number) => {
    setCurrent(i);
    stopAuto();
    startAuto();
  };

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  // Touch support
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <h2 className="section-title">Our Work</h2>
        <p className="section-subtitle">Each piece tells a story of dedication, skill, and timeless beauty</p>
        <div
          className="carousel-container"
          onMouseEnter={stopAuto}
          onMouseLeave={startAuto}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; stopAuto(); }}
          onTouchEnd={(e) => {
            touchEndX.current = e.changedTouches[0].clientX;
            const diff = touchEndX.current - touchStartX.current;
            if (Math.abs(diff) > 50) diff > 0 ? prev() : next();
            else startAuto();
          }}
        >
          <div className="carousel-wrapper">
            <div
              className="carousel-track"
              style={{ transform: `translate3d(${-current * 100}%, 0, 0)` }}
            >
              {slides.map((slide, i) => (
                <div className="carousel-slide" key={i}>
                  <div className="slide-image" style={{ backgroundImage: `url('${slide.image}')` }} />
                  <div className="slide-overlay">
                    <h3>{slide.title}</h3>
                    <p>{slide.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="carousel-btn carousel-btn-prev" aria-label="Previous slide" onClick={prev}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="carousel-btn carousel-btn-next" aria-label="Next slide" onClick={next}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <div className="carousel-dots">
            {slides.map((_, i) => (
              <div key={i} className={`carousel-dot${i === current ? " active" : ""}`} onClick={() => goTo(i)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-content">
          <h2 className="section-title">Build with Legacy and Excellence</h2>
          <p className="about-description">
            With years of dedicated experience, we transform raw materials into timeless pieces that blend functionality with artistry. Every project is approached with meticulous attention to detail, ensuring that each cut, joint, and finish meets our exacting standards.
          </p>
          <p className="about-description">
            We believe in building relationships as strong as our furniture. Your vision becomes our mission, and we work closely with you to bring your ideas to life. From initial consultation to final installation, we're committed to exceeding expectations and delivering work that stands the test of time.
          </p>
          <div className="about-stats">
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="services-section">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">Comprehensive woodworking solutions for your home and business</p>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 3v18" />
              </svg>
            </div>
            <h3>Custom Furniture</h3>
            <p>Bespoke pieces designed to your exact specifications, from dining sets to bedroom collections.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 12h18M3 6h18M3 18h18" />
                <rect x="2" y="3" width="20" height="18" rx="1" />
              </svg>
            </div>
            <h3>Doors &amp; Cabinets</h3>
            <p>Custom doors, kitchen cabinets, and storage solutions crafted for style and durability.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
              </svg>
            </div>
            <h3>Renovation Work</h3>
            <p>Complete woodwork renovations, restorations, and remodeling services for existing spaces.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Trust() {
  const items = [
    {
      title: "Quality Materials",
      desc: "We source only the finest hardwoods and premium materials for lasting quality.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      title: "Skilled Worker",
      desc: "Experienced professionals with years of expertise delivering quality workmanship on every project.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      title: "On-Time Delivery",
      desc: "We respect your time and deliver projects on schedule, every time.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
    },
    {
      title: "Customer Trust",
      desc: "Your satisfaction is our priority. We build lasting relationships through exceptional service.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ];

  return (
    <section className="trust-section">
      <div className="container">
        <h2 className="section-title">Why Choose Us</h2>
        <div className="trust-grid">
          {items.map((item) => (
            <div className="trust-item" key={item.title}>
              <div className="trust-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // @ts-ignore — EmailJS loaded via CDN in index.html
    const emailjsLib = typeof emailjs !== "undefined" ? emailjs : null;

    if (!emailjsLib) {
      console.error("EmailJS SDK not loaded — check CDN script in index.html");
      setStatus("error");
      return;
    }

    const serviceId = "service_52v307t";
    const templateId = "template_c3p4bfj";
    const publicKey = "3mS1S_kRhAhUgWoiE";

    try {
      emailjsLib.init(publicKey);
      await emailjsLib.send(serviceId, templateId, {
        name: form.name,
        contact_number: form.phone || "Not provided",
        message: form.message,
        time: new Date().toLocaleString(),
      });
      setStatus("sent");
      setForm({ name: "", phone: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title">Get in Touch</h2>
        <p className="section-subtitle">Let's discuss your next project</p>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <h4>Email</h4>
                <p>infocontrator@gmail.com</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <h4>Location</h4>
                <p>Gujarat, India</p>
              </div>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                placeholder="Your Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div className="form-group">
              <textarea
                rows={5}
                placeholder="Tell us about your project"
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
            {status === "sent" && (
              <p style={{ color: "var(--color-highlight-golden)", marginBottom: "1rem" }}>
                Thank you! Your message has been sent.
              </p>
            )}
            {status === "error" && (
              <p style={{ color: "#e57373", marginBottom: "1rem" }}>
                Something went wrong. Please try again.
              </p>
            )}
            <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2026 MMH Contrator. All rights reserved.</p>
        <p>Made by: Shashwattech</p>
      </div>
    </footer>
  );
}

export default function App() {
  const [theme, setTheme] = useState<string>(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // Navbar scroll shadow
  useEffect(() => {
    const navbar = document.querySelector(".navbar") as HTMLElement;
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        navbar.style.boxShadow = "0 2px 30px rgba(0,0,0,0.9)";
      } else {
        navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.8)";
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection observer for fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    document.querySelectorAll("section").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div data-theme={theme}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <Gallery />
      <About />
      <Services />
      <Trust />
      <Contact />
      <Footer />
    </div>
  );
}
