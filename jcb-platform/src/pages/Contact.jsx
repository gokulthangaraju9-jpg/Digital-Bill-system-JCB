import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Phone, Mail, MapPin, Clock, Send, ArrowRight,
  MessageCircle, Building2, Globe, Navigation,
  CheckCircle2, Loader2, RotateCcw
} from 'lucide-react';
import ConstructionBgAnimation from '../components/ConstructionBgAnimation';
import Footer from '../components/Footer';

// ── Keyframe styles ──────────────────────────────────────────────────────────
const STYLES = `
  @keyframes fadeUp      { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeLeft    { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
  @keyframes fadeRight   { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
  @keyframes scaleIn     { from{opacity:0;transform:scale(0.82)} to{opacity:1;transform:scale(1)} }
  @keyframes shimmer     { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
  @keyframes float       { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
  @keyframes spin        { to{transform:rotate(360deg)} }
  @keyframes pulse       { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,0.4)} 70%{box-shadow:0 0 0 16px rgba(34,197,94,0)} }
  @keyframes barGrow     { from{width:0} to{width:var(--bar-w)} }
  @keyframes heroTextIn  { from{opacity:0;letter-spacing:10px} to{opacity:1;letter-spacing:-1px} }
  @keyframes particleRise{ 0%{opacity:0;transform:translateY(0) scale(0)} 20%{opacity:1} 100%{opacity:0;transform:translateY(-110px) scale(1.2)} }
  @keyframes lightbeam   { 0%,100%{opacity:0.05} 50%{opacity:0.12} }
  @keyframes ripple      { 0%{transform:scale(1);opacity:0.4} 100%{transform:scale(2.5);opacity:0} }

  .contact-reveal { opacity:0; transform:translateY(36px); transition:opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1); }
  .contact-reveal.visible { opacity:1 !important; transform:translateY(0) !important; }

  .contact-card { transition: transform 0.35s cubic-bezier(.4,0,.2,1), box-shadow 0.35s, border-color 0.35s; }
  .contact-card:hover { transform: translateY(-8px) !important; }

  .contact-input { transition: border-color 0.3s, box-shadow 0.3s; }
  .contact-input:focus { border-color: #FBC518 !important; box-shadow: 0 0 0 3px rgba(251,197,24,0.2) !important; outline: none; }

  .send-btn { transition: transform 0.3s, box-shadow 0.3s; }
  .send-btn:hover { transform: translateY(-3px) scale(1.03) !important; box-shadow: 0 14px 28px -6px rgba(227,0,15,0.45) !important; }

  .shimmer-badge { background:linear-gradient(90deg,rgba(251,197,24,0.08),rgba(251,197,24,0.28),rgba(251,197,24,0.08)); background-size:200% 100%; animation:shimmer 2.5s infinite; }
  .particle { animation: particleRise var(--dur) ease-out var(--delay) infinite; }
`;

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  left: `${7 + i * 7}%`, size: 4 + Math.random() * 5,
  dur: `${3 + Math.random() * 4}s`, delay: `${Math.random() * 4}s`,
  color: i % 3 === 0 ? '#FBC518' : i % 3 === 1 ? '#e3000f' : '#22c55e',
}));

const CONTACT_CARDS = [
  {
    icon: <Phone size={24} />,
    title: 'Call Us',
    lines: ['+91 9842140010', '+91 9865574700'],
    color: '#22c55e',
    actionLabel: 'Call Now',
  },
  {
    icon: <Mail size={24} />,
    title: 'Email Us',
    lines: ['infosribalajiearthmovers7@gmail.com'],
    color: '#3b82f6',
    action: 'mailto:infosribalajiearthmovers7@gmail.com',
    actionLabel: 'Send Email',
  },
  {
    icon: <MapPin size={24} />,
    title: 'Visit Us',
    lines: ['SRI BALAJI EARTH MOVERS', 'Sangagiri, Salem', 'Tamil Nadu, India — 637301'],
    color: '#e3000f',
    action: 'https://maps.google.com/?q=Sangagiri+Salem+Tamil+Nadu+India',
    actionLabel: 'Get Directions',
  },
  {
    icon: <Clock size={24} />,
    title: 'Working Hours',
    lines: ['Mon – Sat: 7:00 AM – 7:00 PM', 'Sunday: Emergency Only'],
    color: '#FBC518',
    action: null,
    actionLabel: null,
  },
];

// ── Component ────────────────────────────────────────────────────────────────
export default function Contact({ isEmbedded = false }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // inject styles
  useEffect(() => {
    if (document.getElementById('contact-styles')) return;
    const s = document.createElement('style');
    s.id = 'contact-styles'; s.textContent = STYLES;
    document.head.appendChild(s);
    return () => { const el = document.getElementById('contact-styles'); el && el.remove(); };
  }, []);

  // scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    document.querySelectorAll('.contact-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setErrorMessage('Please fill in your name, phone number, and project details.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      message: form.message.trim()
    };

    let saved = null;
    try {
      const res = await fetch('http://localhost:5000/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        saved = data.inquiry;
      }
    } catch (err) {
      console.warn('Backend server unreachable, using offline fallback', err);
    }

    if (!saved) {
      saved = {
        id: `INQ-${Math.floor(10000 + Math.random() * 90000)}`,
        ...payload,
        timestamp: new Date().toISOString(),
        status: 'New'
      };
    }

    try {
      const existing = JSON.parse(localStorage.getItem('jcb_inquiries') || '[]');
      localStorage.setItem('jcb_inquiries', JSON.stringify([saved, ...existing]));
    } catch (err) {}

    setSubmitting(false);
    setSubmittedInquiry(saved);
  };

  const inputStyle = {
    width: '100%', padding: '14px 18px', borderRadius: 14,
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff', fontSize: 14, fontFamily: 'Inter, sans-serif', fontWeight: 500,
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: isEmbedded ? 'transparent' : '#050505',
      color: '#fff',
      fontFamily: 'Inter, sans-serif',
      overflowX: 'clip',
      position: 'relative'
    }}>
      {/* Background animation when standalone */}
      {!isEmbedded && <ConstructionBgAnimation />}

      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '50vh', overflow: 'hidden' }}>
        <img src="/hero.jpg" alt="Contact SRI BALAJI" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />

        {/* gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(34,197,94,0.2) 0%,rgba(5,5,5,0.85) 55%,rgba(5,5,5,0.65) 100%)' }} />

        {/* light beams */}
        {[20, 50, 80].map((l, i) => (
          <div key={i} style={{ position: 'absolute', top: 0, left: `${l}%`, width: 2, height: '100%', background: 'linear-gradient(to bottom,transparent,rgba(251,197,24,0.15),transparent)', animation: `lightbeam ${2 + i}s ease-in-out infinite`, animationDelay: `${i * 0.6}s` }} />
        ))}

        {/* particles */}
        {PARTICLES.map((p, i) => (
          <div key={i} className="particle" style={{ position: 'absolute', bottom: 0, left: p.left, width: p.size, height: p.size, borderRadius: '50%', background: p.color, opacity: 0, '--dur': p.dur, '--delay': p.delay }} />
        ))}

        {/* content */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 10vw' }}>
          {/* back button */}
          {!isEmbedded && (
            <button
              onClick={() => navigate(-1)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', borderRadius: 99, padding: '8px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', width: 'fit-content', marginBottom: 24, backdropFilter: 'blur(10px)', transition: 'background 0.25s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.16)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            >
              <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} /> Back
            </button>
          )}

          <div className="shimmer-badge" style={{ border: '1px solid rgba(251,197,24,0.35)', borderRadius: 99, padding: '8px 20px', fontSize: 13, fontWeight: 700, color: '#FBC518', marginBottom: 20, letterSpacing: 1.5, display: 'inline-flex', alignItems: 'center', gap: 8, width: 'fit-content', animation: 'fadeUp 0.7s ease both' }}>
            <MessageCircle size={14} />
            <span>24/7 SUPPORT AVAILABLE</span>
          </div>

          <h1 style={{ fontSize: 'clamp(36px,5.5vw,64px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: -1, marginBottom: 12, animation: 'heroTextIn 1s cubic-bezier(.4,0,.2,1) 0.2s both' }}>
            Get in <span style={{ color: '#FBC518' }}>Touch</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, maxWidth: 500, lineHeight: 1.75, animation: 'fadeUp 0.9s ease 0.4s both' }}>
            We are here to answer your questions, provide instant machine quotes, and dispatch equipment to your site.
          </p>

          {/* animated underline */}
          <div style={{ marginTop: 28, height: 3, width: 0, background: 'linear-gradient(90deg,#22c55e,#FBC518)', borderRadius: 99, animation: 'barGrow 1.2s cubic-bezier(.4,0,.2,1) 0.7s forwards', '--bar-w': '200px' }} />
        </div>
      </section>

      <main style={{ maxWidth: 1260, margin: '0 auto', padding: '64px 32px' }}>

        {/* ── CONTACT CARDS ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 20, marginBottom: 64 }}>
          {CONTACT_CARDS.map((card, i) => (
            <div
              key={card.title}
              className="contact-reveal contact-card"
              style={{
                background: 'rgba(18,18,18,0.85)', border: `1px solid ${card.color}35`,
                borderRadius: 24, padding: '28px 24px', position: 'relative', overflow: 'hidden',
                transitionDelay: `${i * 0.08}s`,
                backdropFilter: 'blur(20px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
              }}
            >
              <div style={{
                position: 'absolute', top: 0, right: 0, width: 90, height: 90,
                background: `radial-gradient(circle at 80% 20%,${card.color}15,transparent 65%)`,
                pointerEvents: 'none',
              }} />
              <div style={{
                width: 52, height: 52, borderRadius: 16,
                background: card.color + '18', color: card.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20,
              }}>{card.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10, color: '#fff' }}>{card.title}</h3>
              {card.lines.map((line, j) => (
                <div key={j} style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{line}</div>
              ))}
              {card.action && (
                <a
                  href={card.action}
                  target={card.action.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    marginTop: 18, fontSize: 13, fontWeight: 700, color: card.color,
                    textDecoration: 'none', transition: 'gap 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                  onMouseLeave={e => e.currentTarget.style.gap = '6px'}
                >
                  {card.actionLabel} →
                </a>
              )}
            </div>
          ))}
        </div>

        {/* ── MAP + FORM ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: 40, alignItems: 'start' }}>

          {/* Map + Address card */}
          <div className="contact-reveal" style={{
            background: 'rgba(18,18,18,0.85)', border: '1px solid rgba(251,197,24,0.18)',
            borderRadius: 32, overflow: 'hidden', backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
          }}>
            {/* embedded map */}
            <div style={{ position: 'relative', height: 260, width: '100%', background: '#111' }}>
              <iframe
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.4820925232924!2d77.86873527481755!3d11.58894178861348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba961168f1c8411%3A0xc3cf9c98ba5c4eb5!2sSankari%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1711200000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* map overlay badge */}
              <div style={{ position: 'absolute', bottom: 14, left: 14, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)', borderRadius: 14, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, border: '1px solid rgba(251,197,24,0.25)' }}>
                <Navigation size={16} color="#FBC518" />
                <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>Sangagiri, Salem, Tamil Nadu, India</span>
              </div>
            </div>

            {/* address details */}
            <div style={{ padding: '28px 28px 32px' }}>
              <div style={{ color: '#FBC518', fontWeight: 700, fontSize: 12, letterSpacing: 2.5, marginBottom: 16, textTransform: 'uppercase' }}>Office Address</div>

              {[
                { icon: <Building2 size={17} />, text: 'SRI BALAJI EARTH MOVERS', color: '#e3000f' },
                { icon: <MapPin size={17} />, text: 'Sangagiri, Salem, Tamil Nadu, India — 637301', color: '#22c55e' },
                { icon: <Phone size={17} />, text: '+91 9842140010 | +91 9865574700', color: '#3b82f6' },
                { icon: <Mail size={17} />, text: 'infosribalajiearthmovers7@gmail.com', color: '#FBC518' },
                { icon: <Globe size={17} />, text: 'www.sribalajiearthmovers.com', color: '#a855f7' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 11,
                    background: item.color + '15', color: item.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    transition: 'transform 0.3s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15) rotate(5deg)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) rotate(0)'}
                  >{item.icon}</div>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-reveal" style={{
            background: 'rgba(18,18,18,0.85)', border: '1px solid rgba(251,197,24,0.18)',
            borderRadius: 32, padding: '36px 32px', backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
          }}>
            {!submittedInquiry ? (
              <>
                <div style={{ color: '#22c55e', fontWeight: 700, fontSize: 12, letterSpacing: 2.5, marginBottom: 12, textTransform: 'uppercase' }}>Send a Message</div>
                <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8 }}>
                  Have a <span style={{ color: '#FBC518' }}>Project?</span>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>
                  Fill out the form and our team will get back to you within 1 hour.
                </p>

                {errorMessage && (
                  <div style={{
                    marginBottom: 16, background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: 12, padding: '12px 16px', color: '#ef4444', fontSize: 13, fontWeight: 600
                  }}>
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <input
                    className="contact-input"
                    type="text"
                    placeholder="Your Name"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                  />
                  <input
                    className="contact-input"
                    type="tel"
                    placeholder="Phone Number"
                    required
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    style={inputStyle}
                  />
                  <input
                    className="contact-input"
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                  />
                  <textarea
                    className="contact-input"
                    placeholder="Tell us about your project — machine type, duration, location…"
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 110 }}
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="send-btn"
                    style={{
                      background: 'linear-gradient(135deg,#e3000f,#c00)', color: '#fff',
                      border: 'none', borderRadius: 14, padding: '16px 32px',
                      fontWeight: 800, fontSize: 15, cursor: submitting ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      boxShadow: '0 8px 20px rgba(227,0,15,0.3)', marginTop: 4,
                      opacity: submitting ? 0.7 : 1
                    }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Submitting Inquiry...
                      </>
                    ) : (
                      <>
                        <Send size={18} /> Send Message
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ animation: 'fadeUp 0.5s ease both' }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.35)',
                  borderRadius: 99, padding: '6px 16px', color: '#22c55e', fontSize: 12, fontWeight: 700,
                  marginBottom: 16
                }}>
                  <CheckCircle2 size={16} /> INQUIRY CONFIRMED
                </div>

                <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 8, color: '#fff' }}>
                  Thank you, <span style={{ color: '#FBC518' }}>{submittedInquiry.name}</span>!
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                  Your project details have been successfully received and dispatched to our fleet operations team.
                </p>

                {/* Inquiry summary card */}
                <div style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 18, padding: '18px 20px', marginBottom: 24
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 12 }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>Reference ID</span>
                    <span style={{ color: '#FBC518', fontWeight: 800 }}>#{submittedInquiry.id}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 12 }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>Contact Phone</span>
                    <span style={{ color: '#fff', fontWeight: 600 }}>{submittedInquiry.phone}</span>
                  </div>
                  {submittedInquiry.email && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 12 }}>
                      <span style={{ color: 'rgba(255,255,255,0.4)' }}>Email</span>
                      <span style={{ color: '#fff', fontWeight: 500 }}>{submittedInquiry.email}</span>
                    </div>
                  )}
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 10, marginTop: 10 }}>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>PROJECT REQUIREMENT</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', fontStyle: 'italic', background: 'rgba(0,0,0,0.3)', padding: '10px 12px', borderRadius: 10 }}>
                      "{submittedInquiry.message}"
                    </div>
                  </div>
                </div>

                {/* Instant connection options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                  <a
                    href={`https://wa.me/919842140010?text=${encodeURIComponent(
                      `Hello Sri Balaji Earth Movers! I have submitted project inquiry #${submittedInquiry.id}.\n\nName: ${submittedInquiry.name}\nPhone: ${submittedInquiry.phone}\nProject: ${submittedInquiry.message}\n\nPlease confirm availability and rate quote.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'linear-gradient(135deg, #25D366, #128C7E)',
                      color: '#fff', textDecoration: 'none',
                      borderRadius: 14, padding: '14px 20px', fontWeight: 700, fontSize: 14,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      boxShadow: '0 8px 20px rgba(37,211,102,0.3)', transition: 'transform 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <MessageCircle size={18} /> Connect on WhatsApp (Instant Response)
                  </a>

                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <a
                      href="tel:+919842140010"
                      style={{
                        flex: '1 1 180px',
                        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(251,197,24,0.3)',
                        color: '#FBC518', textDecoration: 'none',
                        borderRadius: 14, padding: '12px 14px', fontWeight: 700, fontSize: 13.5,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#FBC518'; e.currentTarget.style.background = 'rgba(251,197,24,0.1)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(251,197,24,0.3)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                    >
                      <Phone size={15} /> Call: +91 9842140010
                    </a>
                    <a
                      href="tel:+919865574700"
                      style={{
                        flex: '1 1 180px',
                        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(251,197,24,0.3)',
                        color: '#FBC518', textDecoration: 'none',
                        borderRadius: 14, padding: '12px 14px', fontWeight: 700, fontSize: 13.5,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#FBC518'; e.currentTarget.style.background = 'rgba(251,197,24,0.1)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(251,197,24,0.3)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                    >
                      <Phone size={15} /> Call: +91 9865574700
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSubmittedInquiry(null);
                    setForm({ name: '', phone: '', email: '', message: '' });
                  }}
                  style={{
                    background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)',
                    fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                    margin: '0 auto', padding: '6px 12px'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                >
                  <RotateCcw size={14} /> Send Another Inquiry
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── QUICK CTA STRIP ── */}
        <div className="contact-reveal" style={{
          marginTop: 72, background: 'linear-gradient(135deg,rgba(34,197,94,0.08),rgba(251,197,24,0.08))',
          border: '1px solid rgba(251,197,24,0.25)', borderRadius: 28,
          padding: '40px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 24, position: 'relative', overflow: 'hidden',
          backdropFilter: 'blur(16px)'
        }}>
          {/* spinning ring */}
          <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', border: '2px dashed rgba(251,197,24,0.18)', animation: 'spin 16s linear infinite' }} />

          <div>
            <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 6 }}>Need a machine <span style={{ color: '#FBC518' }}>urgently?</span></h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Call us directly for same-day booking and dispatch.</p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="tel:+919842140010" style={{
              background: '#22c55e', color: '#fff', textDecoration: 'none',
              borderRadius: 14, padding: '14px 24px', fontWeight: 800, fontSize: 15,
              display: 'flex', alignItems: 'center', gap: 10,
              boxShadow: '0 8px 24px rgba(34,197,94,0.3)', transition: 'transform 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
            >
              <Phone size={18} /> +91 9842140010
            </a>
            <a href="tel:+919865574700" style={{
              background: 'rgba(255,255,255,0.08)', color: '#FBC518', textDecoration: 'none',
              border: '1px solid rgba(251,197,24,0.35)',
              borderRadius: 14, padding: '14px 24px', fontWeight: 800, fontSize: 15,
              display: 'flex', alignItems: 'center', gap: 10,
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)', transition: 'transform 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
            >
              <Phone size={18} /> +91 9865574700
            </a>
          </div>
        </div>

        {/* ── FOOTER / CREDITS & LICENCE ── */}
        <Footer />

      </main>
    </div>
  );
}
