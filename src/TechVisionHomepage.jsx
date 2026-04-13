import { useState } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID  = "service_yxjq5mt";
const EMAILJS_TEMPLATE_ID = "template_el5sc0h";
const EMAILJS_PUBLIC_KEY  = "7KHDL2-fcO5D6ceu9";

const NAV_LINKS = ["Home", "Services", "Courses", "About", "Contact"];

const COURSES = [
  { title: "Full Stack Web Development", duration: "6 months", level: "Beginner → Pro", color: "#0C447C", bg: "#E6F1FB" },
  { title: "Data Science & Machine Learning", duration: "5 months", level: "Intermediate",  color: "#085041", bg: "#E1F5EE" },
  { title: "Cloud Architecture (AWS/Azure)", duration: "4 months", level: "Advanced",  color: "#533AB7", bg: "#EEEDFE" },
  { title: "UI/UX Design Fundamentals", duration: "3 months", level: "Beginner",  color: "#712B13", bg: "#FAECE7" },
  
];

const SERVICES = [
  { icon: "◈", title: "Live Mentorship", desc: "1-on-1 sessions with industry experts from top tech companies." },
  { icon: "◉", title: "Job Placement", desc: "Dedicated placement cell with 200+ hiring partners across India." },
  { icon: "◎", title: "Hands-on Projects", desc: "Build real-world portfolio projects from day one of the course." },
  { icon: "◆", title: "Certification", desc: "Industry-recognized certificates accepted by global employers." },
];

const TEAM = [
  { initials: "AK", name: "Akash Konade", role: "CEO & Founder", color: "#185FA5", bg: "#E6F1FB" },
  { initials: "PS", name: "Priya Sharma", role: "Head of Curriculum", color: "#0F6E56", bg: "#E1F5EE" },
  { initials: "RV", name: "Rohit Verma", role: "Lead Instructor", color: "#534AB7", bg: "#EEEDFE" },
];

const style = `
  
  * { box-sizing: border-box; margin: 0; padding: 0; }

  body, #root { font-family: 'DM Sans', sans-serif; background: #F7F6F2; color: #1a1a1a; }

  .tv-nav {
    position: sticky; top: 0; z-index: 100;
    background: #F7F6F2; border-bottom: 1px solid rgba(0,0,0,0.08);
    padding: 0 5vw; display: flex; align-items: center; justify-content: space-between; height: 64px;
  }
  .tv-logo { font-family: 'Arial', sans-serif; font-weight: 800; font-size: 22px; letter-spacing: -0.5px; }
  .tv-logo span { color: #185FA5; }
  .tv-navlinks { display: flex; gap: 32px; list-style: none; }
  .tv-navlinks a {
    font-size: 14px; font-weight: 500; text-decoration: none; color: #555;
    cursor: pointer; transition: color 0.2s; padding-bottom: 2px;
    border-bottom: 1.5px solid transparent;
  }
  .tv-navlinks a:hover, .tv-navlinks a.active { color: #185FA5; border-bottom-color: #185FA5; }
  .tv-cta-btn {
    background: #185FA5; color: #fff; border: none; border-radius: 6px;
    padding: 9px 20px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
    cursor: pointer; transition: background 0.2s;
  }
  .tv-cta-btn:hover { background: #0C447C; }

  section { padding: 80px 5vw; }

  .hero-section {
    min-height: 80vh; display: flex; flex-direction: column;
    justify-content: center; padding-top: 80px; padding-bottom: 80px;
    border-bottom: 1px solid rgba(0,0,0,0.07);
    position: relative; overflow: hidden;
  }
  .hero-eyebrow {
    display: inline-block; font-size: 12px; font-weight: 500; letter-spacing: 2px;
    text-transform: uppercase; color: #185FA5; background: #E6F1FB;
    border-radius: 4px; padding: 4px 12px; margin-bottom: 20px; width: fit-content;
  }
  .hero-h1 {
    font-family: 'Arial', sans-serif; font-size: clamp(40px, 6vw, 80px);
    font-weight: 800; line-height: 1.05; letter-spacing: -2px;
    color: #111; max-width: 760px; margin-bottom: 24px;
  }
  .hero-h1 em { font-style: normal; color: #185FA5; }
  .hero-sub { font-size: 18px; color: #555; max-width: 520px; line-height: 1.6; margin-bottom: 40px; font-weight: 300; }
  .hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
  .btn-primary {
    background: #185FA5; color: #fff; border: none; border-radius: 8px;
    padding: 14px 28px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500;
    cursor: pointer; transition: background 0.2s;
  }
  .btn-primary:hover { background: #0C447C; }
  .btn-outline {
    background: transparent; color: #185FA5; border: 1.5px solid #185FA5; border-radius: 8px;
    padding: 14px 28px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500;
    cursor: pointer; transition: all 0.2s;
  }
  .btn-outline:hover { background: #E6F1FB; }
  .hero-stats { display: flex; gap: 48px; margin-top: 60px; flex-wrap: wrap; }
  .stat-item { }
  .stat-num { font-family: 'Arial', sans-serif; font-size: 36px; font-weight: 800; color: #111; line-height: 1; }
  .stat-lbl { font-size: 13px; color: #888; margin-top: 4px; }
  .hero-decoration {
    position: absolute; right: -60px; top: 50%; transform: translateY(-50%);
    width: 420px; height: 420px; border-radius: 50%;
    border: 60px solid rgba(24, 95, 165, 0.06);
    pointer-events: none;
  }
  .hero-decoration2 {
    position: absolute; right: 120px; top: 20%;
    width: 180px; height: 180px; border-radius: 50%;
    border: 30px solid rgba(24, 95, 165, 0.04);
    pointer-events: none;
  }

  .section-label {
    font-size: 11px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase;
    color: #185FA5; margin-bottom: 12px;
  }
  .section-h2 {
    font-family: 'Arial', sans-serif; font-size: clamp(28px, 3.5vw, 44px);
    font-weight: 800; letter-spacing: -1px; color: #111; margin-bottom: 12px;
  }
  .section-sub { font-size: 16px; color: #666; max-width: 480px; line-height: 1.6; font-weight: 300; }

  .services-section { background: #fff; }
  .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; margin-top: 48px; }
  .service-card {
    background: #F7F6F2; border-radius: 12px; padding: 28px 24px;
    border: 1px solid rgba(0,0,0,0.06); transition: border-color 0.2s, transform 0.2s;
  }
  .service-card:hover { border-color: rgba(24,95,165,0.25); transform: translateY(-2px); }
  .service-icon { font-size: 24px; color: #185FA5; margin-bottom: 16px; display: block; }
  .service-title { font-family: 'Arial', sans-serif; font-size: 17px; font-weight: 700; margin-bottom: 8px; }
  .service-desc { font-size: 14px; color: #666; line-height: 1.6; font-weight: 300; }

  .courses-section { background: #F7F6F2; }
  .courses-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; margin-top: 48px; }
  .course-card {
    background: #fff; border-radius: 12px; padding: 24px;
    border: 1px solid rgba(0,0,0,0.07); transition: transform 0.2s, box-shadow 0.2s;
    display: flex; flex-direction: column; gap: 12px;
  }
  .course-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.07); }
  .course-tag {
    display: inline-block; font-size: 11px; font-weight: 500; border-radius: 4px;
    padding: 3px 10px; width: fit-content;
  }
  .course-title { font-family: 'Arial', sans-serif; font-size: 17px; font-weight: 700; line-height: 1.3; }
  .course-meta { display: flex; gap: 16px; font-size: 13px; color: #888; margin-top: 4px; }
  .course-enroll {
    margin-top: auto; padding-top: 16px; border-top: 1px solid rgba(0,0,0,0.06);
    font-size: 13px; font-weight: 500; cursor: pointer;
    display: flex; align-items: center; gap: 6px;
  }

  .about-section { background: #fff; }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; margin-top: 48px; }
  @media(max-width:700px) { .about-grid { grid-template-columns: 1fr; } }
  .about-body { font-size: 16px; color: #555; line-height: 1.8; font-weight: 300; margin-bottom: 24px; }
  .team-grid { display: flex; flex-direction: column; gap: 16px; }
  .team-card {
    display: flex; align-items: center; gap: 16px;
    background: #F7F6F2; border-radius: 10px; padding: 16px;
    border: 1px solid rgba(0,0,0,0.06);
  }
  .team-avatar {
    width: 48px; height: 48px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Arial', sans-serif; font-weight: 700; font-size: 16px; flex-shrink: 0;
  }
  .team-name { font-family: 'Arial', sans-serif; font-size: 15px; font-weight: 700; }
  .team-role { font-size: 13px; color: #888; margin-top: 2px; }

  .contact-section { background: #111; color: #fff; }
  .contact-section .section-label { color: #85B7EB; }
  .contact-section .section-h2 { color: #fff; }
  .contact-section .section-sub { color: #aaa; }
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin-top: 48px; align-items: start; }
  @media(max-width:700px) { .contact-grid { grid-template-columns: 1fr; } }
  .contact-info-item { display: flex; flex-direction: column; gap: 4px; margin-bottom: 24px; }
  .contact-info-label { font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px; }
  .contact-info-val { font-size: 16px; color: #ddd; font-weight: 300; }
  .contact-form { display: flex; flex-direction: column; gap: 14px; }
  .contact-form input, .contact-form textarea {
    background: #1e1e1e; border: 1px solid #333; border-radius: 8px;
    padding: 13px 16px; color: #fff; font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 300; resize: none; outline: none;
    transition: border-color 0.2s;
  }
  .contact-form input:focus, .contact-form textarea:focus { border-color: #185FA5; }
  .contact-form input::placeholder, .contact-form textarea::placeholder { color: #555; }
  .btn-submit {
    background: #185FA5; color: #fff; border: none; border-radius: 8px;
    padding: 14px; font-family: 'DM Sans', sans-serif; font-size: 15px;
    font-weight: 500; cursor: pointer; transition: background 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .btn-submit:hover:not(:disabled) { background: #378ADD; }
  .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
  .form-error { color: #F09595; font-size: 13px; margin-top: -6px; }

  .tv-footer {
    background: #0a0a0a; color: #555; font-size: 13px;
    padding: 24px 5vw; display: flex; justify-content: space-between; align-items: center;
  }
  .tv-footer-logo { font-family: 'Arial', sans-serif; font-weight: 800; color: #fff; font-size: 16px; }
  .tv-footer-logo span { color: #185FA5; }

  .spinner {
    width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff; border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
`;

export default function TechVisionHomepage() {
  const [active, setActive] = useState("Home");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id === "home" ? "Home" : id.charAt(0).toUpperCase() + id.slice(1));
  };

  const sectionMap = { Home: "home", Services: "services", Courses: "courses", About: "about", Contact: "contact" };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) return;
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message || "(no message provided)",
          time: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  return (
    <>
      {<style>{style}</style>}

      <nav className="tv-nav">
        <div className="tv-logo">Tech<span>Vision</span></div>
        <ul className="tv-navlinks">
          {NAV_LINKS.map(n => (
            <li key={n}>
              <a className={active === n ? "active" : ""} onClick={() => scrollTo(sectionMap[n])}>{n}</a>
            </li>
          ))}
        </ul>
        <button className="tv-cta-btn" onClick={() => scrollTo("courses")}>Enroll Now</button>
      </nav>

      <section className="hero-section" id="home">
        <div className="hero-decoration" />
        <div className="hero-decoration2" />
        <div className="hero-eyebrow">India's #1 Tech Learning Platform</div>
        <h1 className="hero-h1">Build skills that<br /><em>matter in</em> tech.</h1>
        <p className="hero-sub">Industry-aligned courses, live mentorship, and guaranteed placement support — everything you need to launch your tech career.</p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => scrollTo("courses")}>Explore Courses</button>
          <button className="btn-outline" onClick={() => scrollTo("about")}>Our Story</button>
        </div>
        <div className="hero-stats">
          <div className="stat-item"><div className="stat-num">12K+</div><div className="stat-lbl">Students Enrolled</div></div>
          <div className="stat-item"><div className="stat-num">94%</div><div className="stat-lbl">Placement Rate</div></div>
          <div className="stat-item"><div className="stat-num">200+</div><div className="stat-lbl">Hiring Partners</div></div>
          <div className="stat-item"><div className="stat-num">6</div><div className="stat-lbl">Flagship Courses</div></div>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="section-label">What we offer</div>
        <h2 className="section-h2">Everything you need to succeed</h2>
        <p className="section-sub">From day one to your first job offer, we're with you every step of the way.</p>
        <div className="services-grid">
          {SERVICES.map(s => (
            <div className="service-card" key={s.title}>
              <span className="service-icon">{s.icon}</span>
              <div className="service-title">{s.title}</div>
              <div className="service-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="courses-section" id="courses">
        <div className="section-label">Our Programs</div>
        <h2 className="section-h2">Courses built for the industry</h2>
        <p className="section-sub">Curriculum designed with input from engineers at Google, Microsoft, and Infosys.</p>
        <div className="courses-grid">
          {COURSES.map(c => (
            <div className="course-card" key={c.title}>
              {c.tag && (
                <span className="course-tag" style={{ background: c.bg, color: c.color }}>{c.tag}</span>
              )}
              <div className="course-title">{c.title}</div>
              <div className="course-meta">
                <span>{c.duration}</span>
                <span>{c.level}</span>
              </div>
              <div className="course-enroll" style={{ color: c.color }}>
                Enroll now →
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section" id="about">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          <div>
            <div className="section-label">Our Story</div>
            <h2 className="section-h2">Bridging the gap between learning and doing</h2>
            <p className="about-body">
              TechVision was founded in 2019 with a single mission: make world-class tech education accessible to every motivated learner in India, regardless of their background or location.
            </p>
            <p className="about-body">
              We partner directly with hiring companies to build curricula that reflect what's actually needed on the job — not just theory. Our instructors are active practitioners, not just academics.
            </p>
            <button className="btn-primary" onClick={() => scrollTo("contact")}>Get in Touch</button>
          </div>
          <div className="team-grid">
            {TEAM.map(m => (
              <div className="team-card" key={m.name}>
                <div className="team-avatar" style={{ background: m.bg, color: m.color }}>{m.initials}</div>
                <div>
                  <div className="team-name">{m.name}</div>
                  <div className="team-role">{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="section-label">Reach us</div>
        <h2 className="section-h2">Let's talk</h2>
        <p className="section-sub">Have questions about admissions, courses, or placements? We'd love to hear from you.</p>
        <div className="contact-grid">
          <div>
            <div className="contact-info-item">
              <span className="contact-info-label">Email</span>
              <span className="contact-info-val">admissions@techvision.com</span>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-label">Phone</span>
              <span className="contact-info-val">+911234567890</span>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-label">Location</span>
              <span className="contact-info-val">Pune, Maharashtra — India</span>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-label">Office Hours</span>
              <span className="contact-info-val">Mon – Sat, 9am to 6pm IST</span>
            </div>
          </div>
          <div className="contact-form">
            {status === "success" ? (
              <div style={{ color: "#9FE1CB", fontSize: 16, padding: "24px 0", lineHeight: 1.7 }}>
                <div style={{ fontSize: 24, marginBottom: 12 }}>✓</div>
                Message sent! We'll get back to you within 24 hours.
              </div>
            ) : (
              <>
                <input
                  placeholder="Your name *"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
                <input
                  placeholder="Email address *"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
                <textarea
                  rows={4}
                  placeholder="Your message..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                />
                {status === "error" && (
                  <p className="form-error">Something went wrong. Please try again or email us directly.</p>
                )}
                <button
                  className="btn-submit"
                  onClick={handleSubmit}
                  disabled={status === "sending" || !form.name.trim() || !form.email.trim()}
                >
                  {status === "sending" ? (
                    <><div className="spinner" /> Sending…</>
                  ) : "Send Message"}
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      <footer className="tv-footer">
        <div className="tv-footer-logo">Tech<span>Vision</span></div>
        <div>© 2025 TechVision. All rights reserved.</div>
      </footer>
    </>
  );
}
