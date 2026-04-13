import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./TechVisionHomepage.css";

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
  { title: "Live Mentorship", desc: "1-on-1 sessions with industry experts from top tech companies." },
  { title: "Job Placement", desc: "Dedicated placement cell with 200+ hiring partners across India." },
  { title: "Hands-on Projects", desc: "Build real-world portfolio projects from day one of the course." },
  { title: "Certification", desc: "Industry-recognized certificates accepted by global employers." },
];

const TEAM = [
  { initials: "AK", name: "Akash Konade", role: "CEO & Founder", color: "#185FA5", bg: "#E6F1FB" },
  { initials: "PS", name: "Priya Sharma", role: "Head of Curriculum", color: "#0F6E56", bg: "#E1F5EE" },
  { initials: "RV", name: "Rohit Verma", role: "Lead Instructor", color: "#534AB7", bg: "#EEEDFE" },
];
 

export default function TechVisionHomepage() {
  const [active, setActive] = useState("Home");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [showEnrollModal, setShowEnrollModal] = useState(false);

const [studentForm, setStudentForm] = useState({
  fullName: "",
  email: "",
  phone: "",
  course: "",
  batch: "",
  address: "",
});
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
              <div
  className="course-enroll"
  style={{ color: c.color }}
  onClick={() => {
    setStudentForm(prev => ({
      ...prev,
      course: c.title,
    }));
    setShowEnrollModal(true);
  }}
>
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
      {showEnrollModal && (
  <div className="modal-overlay" onClick={() => setShowEnrollModal(false)}>
    <div className="enroll-modal" onClick={(e) => e.stopPropagation()}>
      <h2>Enroll for Course</h2>

      <input
        placeholder="Full Name"
        value={studentForm.fullName}
        onChange={(e) =>
          setStudentForm({ ...studentForm, fullName: e.target.value })
        }
      />

      <input
        placeholder="Email"
        value={studentForm.email}
        onChange={(e) =>
          setStudentForm({ ...studentForm, email: e.target.value })
        }
      />

      <input
        placeholder="Phone Number"
        value={studentForm.phone}
        onChange={(e) =>
          setStudentForm({ ...studentForm, phone: e.target.value })
        }
      />

      <input value={studentForm.course} readOnly />

      <select
        value={studentForm.batch}
        onChange={(e) =>
          setStudentForm({ ...studentForm, batch: e.target.value })
        }
      >
        <option value="">Select Batch Timing</option>
        <option>Morning</option>
        <option>Afternoon</option>
        <option>Evening</option>
      </select>

      <textarea
        rows={3}
        placeholder="Address"
        value={studentForm.address}
        onChange={(e) =>
          setStudentForm({ ...studentForm, address: e.target.value })
        }
      />

      <button className="btn-submit">
        Submit Enrollment
      </button>

      <button
        className="btn-outline"
        onClick={() => setShowEnrollModal(false)}
      >
        Cancel
      </button>
    </div>
  </div>
)}
      <footer className="tv-footer">
        <div className="tv-footer-logo">Tech<span>Vision</span></div>
        <div>© 2025 TechVision. All rights reserved.</div>
      </footer>
    </>
  );
}
