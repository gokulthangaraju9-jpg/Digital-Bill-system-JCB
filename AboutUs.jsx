import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Truck, Shield, Award, Users, Clock, CheckCircle,
  Phone, Mail, MapPin, ArrowRight, Zap
} from 'lucide-react';

// ── Inject keyframe CSS once ─────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  @keyframes fadeUp   { from { opacity:0; transform:translateY(48px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeLeft { from { opacity:0; transform:translateX(-48px); } to { opacity:1; transform:translateX(0); } }
  @keyframes fadeRight{ from { opacity:0; transform:translateX(48px);  } to { opacity:1; transform:translateX(0); } }
  @keyframes scaleIn  { from { opacity:0; transform:scale(0.82); } to { opacity:1; transform:scale(1); } }
  @keyframes shimmer  { 0%,100%{ background-position:0% 50%; } 50%{ background-position:100% 50%; } }
  @keyframes float    { 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-14px); } }
  @keyframes pulse    { 0%,100%{ box-shadow:0 0 0 0 rgba(255,204,0,0.45); } 70%{ box-shadow:0 0 0 18px rgba(255,204,0,0); } }
  @keyframes spin     { to { transform:rotate(360deg); } }
  @keyframes rotateBg { from { --angle:0deg; } to { --angle:360deg; } }
  @keyframes barGrow  { from { width:0; } to { width:var(--bar-w); } }
  @keyframes particleRise { 0%{ opacity:0; transform:translateY(0) scale(0); } 20%{ opacity:1; } 100%{ opacity:0; transform:translateY(-120px) scale(1.2); } }
  @keyframes heroTextIn { from{ opacity:0; letter-spacing:12px; } to{ opacity:1; letter-spacing:-1.5px; } }
  @keyframes countUp { from{ opacity:0; transform:scale(0.5) rotate(-8deg); } to{ opacity:1; transform:scale(1) rotate(0deg); } }

  .about-reveal { opacity:0; transform:translateY(40px); transition: opacity 0.75s cubic-bezier(.4,0,.2,1), transform 0.75s cubic-bezier(.4,0,.2,1); }
  .about-reveal.visible { opacity:1 !important; transform:translateY(0) !important; }
  .about-reveal-left { opacity:0; transform:translateX(-40px); transition: opacity 0.75s cubic-bezier(.4,0,.2,1), transform 0.75s cubic-bezier(.4,0,.2,1); }
  .about-reveal-left.visible { opacity:1 !important; transform:translateX(0) !important; }
  .about-reveal-right { opacity:0; transform:translateX(40px); transition: opacity 0.75s cubic-bezier(.4,0,.2,1), transform 0.75s cubic-bezier(.4,0,.2,1); }
  .about-reveal-right.visible { opacity:1 !important; transform:translateX(0) !important; }

  .stat-card { transition: transform 0.35s cubic-bezier(.4,0,.2,1), box-shadow 0.35s; }
  .stat-card:hover { transform: translateY(-10px) scale(1.04) !important; }

  .value-card { transition: transform 0.4s cubic-bezier(.4,0,.2,1), border-color 0.4s, box-shadow 0.4s; }
  .value-card:hover { transform: translateY(-10px) !important; }

  .machine-item { transition: background 0.25s, padding-left 0.25s; }
  .machine-item:hover { background: rgba(255,204,0,0.06) !important; padding-left: 18px !important; }

  .cta-btn { transition: transform 0.3s, box-shadow 0.3s; }
  .cta-btn:hover { transform: translateY(-4px) scale(1.04) !important; box-shadow: 0 14px 30px -6px rgba(227,0,15,0.4) !important; }

  .shimmer-badge {
    background: linear-gradient(90deg, rgba(255,204,0,0.08), rgba(255,204,0,0.25), rgba(255,204,0,0.08));
    background-size: 200% 100%;
    animation: shimmer 2.5s infinite;
  }

  .hero-truck {
    animation: float 4s ease-in-out infinite;
    filter: drop-shadow(0 20px 40px rgba(255,204,0,0.2));
  }

  .particle { animation: particleRise var(--dur) ease-out var(--delay) infinite; }
`;

// ── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  { label: 'Years of Experience', end: 20, suffix: '+', color: '#FFCC00' },
  { label: 'Projects Completed', end: 250, suffix: '+', color: '#22c55e' },
  { label: 'Happy Clients', end: 300, suffix: '+', color: '#3b82f6' },
];

const VALUES = [
  { icon: <Shield size={28} />, title: 'Safety First', color: '#FFCC00', desc: 'Every operation is conducted with the highest safety standards, protecting our team, clients, and surroundings.' },
  { icon: <Zap size={28} />, title: 'Reliability', color: '#e3000f', desc: 'Well-maintained machines and expert operators mean zero downtime delivering on time, every time.' },
  { icon: <Award size={28} />, title: 'Quality Work', color: '#22c55e', desc: 'Precision and excellence in every cubic metre of earth we move, from foundations to large-scale roads.' },
  { icon: <Users size={28} />, title: 'Client Partnership', color: '#3b82f6', desc: 'We work alongside clients as true partners, understanding their vision and exceeding their expectations.' },
];

const MACHINES = [
  'JCB 3DX Backhoe Loader', 'JCB Breaker',
  'Hitachi Excavator', 'Hitachi Rock Breaker',
];

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  left: `${8 + i * 7.5}%`, size: 4 + Math.random() * 6,
  dur: `${3 + Math.random() * 4}s`, delay: `${Math.random() * 4}s`,
  color: i % 3 === 0 ? '#FFCC00' : i % 3 === 1 ? '#e3000f' : '#3b82f6'
}));

// ── Animated counter hook ────────────────────────────────────────────────────
function useCounter(end, duration = 1800, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0, step = end / 100, t = duration / 100, raf;
    const tick = () => {
      start = Math.min(start + step, end);
      setVal(Math.round(start));
      if (start < end) raf = setTimeout(tick, t);
    };
    raf = setTimeout(tick, t);
    return () => clearTimeout(raf);
  }, [end, duration, active]);
  return val;
}

// ── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ stat, delay }) {
  const ref = useRef();
  const [active, setActive] = useState(false);
  const val = useCounter(stat.end, 1600, active);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setActive(true); ref.current.classList.add('visible'); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className="about-reveal stat-card"
      style={{ transitionDelay: delay, background: 'rgba(20,20,20,0.85)', border: `1px solid ${stat.color}30`, borderRadius: 28, padding: '36px 24px', textAlign: 'center', backdropFilter: 'blur(20px)', cursor: 'default', position: 'relative', overflow: 'hidden' }}
    >
      {/* glow ring */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 0%, ${stat.color}12 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <div style={{ fontSize: 52, fontWeight: 900, color: stat.color, lineHeight: 1, animation: 'countUp 0.6s cubic-bezier(.4,0,.2,1) both', animationDelay: delay }}>
        {val}{stat.suffix}
      </div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>
        {stat.label}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function AboutUs() {
  const navigate = useNavigate();

  // inject styles
  useEffect(() => {
    if (document.getElementById('about-styles')) return;
    const s = document.createElement('style');
    s.id = 'about-styles'; s.textContent = STYLES;
    document.head.appendChild(s);
    return () => { const el = document.getElementById('about-styles'); el && el.remove(); };
  }, []);

  // scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    document.querySelectorAll('.about-reveal,.about-reveal-left,.about-reveal-right').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#050505', color: '#fff', fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '58vh', overflow: 'hidden' }}>
        <img src="/hero.jpg" alt="SRI BALAJI EARTH MOVERS" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45, transform: 'scale(1.05)', transition: 'transform 8s ease' }} />

        {/* Animated gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(227,0,15,0.55) 0%, rgba(5,5,5,0.92) 55%, #050505 100%)',
        }} />

        {/* floating particles */}
        {PARTICLES.map((p, i) => (
          <div key={i} className="particle" style={{
            position: 'absolute', bottom: 0, left: p.left,
            width: p.size, height: p.size, borderRadius: '50%',
            background: p.color, opacity: 0,
            '--dur': p.dur, '--delay': p.delay,
          }} />
        ))}

        {/* hero content */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 10vw' }}>
          {/* shimmer badge */}
          <div className="shimmer-badge" style={{
            border: '1px solid rgba(255,204,0,0.35)', borderRadius: 99,
            padding: '8px 20px', fontSize: 13, fontWeight: 700, color: '#FFCC00',
            marginBottom: 24, letterSpacing: 1.5, display: 'inline-flex', alignItems: 'center', gap: 8,
            width: 'fit-content', animation: 'fadeUp 0.7s ease both',
          }}>
            🏗️ WHO WE ARE
          </div>

          <h1 style={{
            fontSize: 'clamp(38px,6.5vw,72px)', fontWeight: 900,
            lineHeight: 1.05, letterSpacing: -1.5, marginBottom: 16,
            animation: 'heroTextIn 1s cubic-bezier(.4,0,.2,1) 0.2s both',
          }}>
            SRI BALAJI<br />
            <span style={{ color: '#e3000f', textShadow: '0 0 40px rgba(227,0,15,0.4)' }}>EARTH MOVERS</span>
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.6)', fontSize: 17, maxWidth: 520, lineHeight: 1.75,
            animation: 'fadeUp 0.9s ease 0.5s both',
          }}>
            Tamil Nadu's trusted name in professional earth movers &amp; construction equipment since 2005.
          </p>

          {/* animated line */}
          <div style={{
            marginTop: 32, height: 3, width: 0, background: 'linear-gradient(90deg,#FFCC00,#e3000f)',
            borderRadius: 99, animation: 'barGrow 1.2s cubic-bezier(.4,0,.2,1) 0.8s forwards',
            '--bar-w': '220px',
          }} />
        </div>

        {/* Floating truck icon */}
        <div className="hero-truck" style={{ position: 'absolute', bottom: '-10px', right: '8vw', opacity: 0.12 }}>
          <Truck size={200} color="#FFCC00" />
        </div>
      </section>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 32px' }}>

        {/* ── STATS ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
          gap: 20, marginBottom: 100,
        }}>
          {STATS.map((s, i) => (
            <StatCard key={s.label} stat={s} delay={`${i * 0.12}s`} />
          ))}
        </div>

        {/* ── OUR STORY ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: 56, alignItems: 'center', marginBottom: 100 }}>

          {/* text */}
          <div className="about-reveal-left">
            <div style={{ color: '#e3000f', fontWeight: 700, fontSize: 12, letterSpacing: 2.5, marginBottom: 12, textTransform: 'uppercase' }}>Our Story</div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>
              Built on <span style={{ color: '#FFCC00', position: 'relative' }}>Dedication</span><br />&amp; Hard Work
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, marginBottom: 16, fontSize: 15 }}>
              Founded in 2005, Sri Balaji Earth Movers started with a single JCB machine and a commitment to
              deliver honest, high-quality earth movers services across Tamil Nadu. Over 20+ years we have grown
              into one of the region's most reliable equipment providers.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, fontSize: 15 }}>
              From residential foundations to large-scale road construction and industrial site preparation, our
              diverse fleet and experienced operators handle every project with precision, speed, and care.
            </p>

            {/* animated progress bars */}
            {[
              { label: 'Customer Satisfaction', pct: 97, color: '#FFCC00' },
              { label: 'On-Time Delivery', pct: 94, color: '#22c55e' },
              { label: 'Safety Record', pct: 100, color: '#3b82f6' },
            ].map((b, i) => (
              <div key={b.label} style={{ marginTop: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.55)', marginBottom: 6 }}>
                  <span>{b.label}</span><span style={{ color: b.color }}>{b.pct}%</span>
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.07)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', background: b.color, borderRadius: 99,
                    width: 0, animation: `barGrow 1.4s cubic-bezier(.4,0,.2,1) ${0.8 + i * 0.2}s forwards`,
                    '--bar-w': `${b.pct}%`,
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* fleet card */}
          <div className="about-reveal-right" style={{
            background: 'rgba(18,18,18,0.85)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 32, padding: '36px', backdropFilter: 'blur(24px)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
          }}>
            <div style={{ color: '#FFCC00', fontWeight: 700, fontSize: 12, letterSpacing: 2.5, marginBottom: 22, textTransform: 'uppercase' }}>Our Fleet</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {MACHINES.map((m, i) => (
                <div key={m} className="machine-item" style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '10px 12px', borderRadius: 12, cursor: 'default',
                  animation: `fadeUp 0.5s ease ${0.05 * i}s both`,
                }}>
                  <CheckCircle size={17} color="#FFCC00" style={{ flexShrink: 0 }} />
                  <span style={{ color: 'rgba(255,255,255,0.78)', fontSize: 14, fontWeight: 500 }}>{m}</span>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/book')} className="cta-btn" style={{
              marginTop: 28, background: 'linear-gradient(135deg,#e3000f,#c00)', color: '#fff',
              border: 'none', borderRadius: 14, padding: '14px 28px', fontWeight: 800,
              fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
              boxShadow: '0 8px 20px rgba(227,0,15,0.3)',
            }}>
              Book a Machine <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* ── MISSION ── */}
        <div className="about-reveal" style={{
          background: 'linear-gradient(135deg,rgba(227,0,15,0.09) 0%,rgba(255,204,0,0.06) 100%)',
          border: '1px solid rgba(255,204,0,0.2)', borderRadius: 36, padding: '60px 48px',
          textAlign: 'center', marginBottom: 100, position: 'relative', overflow: 'hidden',
        }}>
          {/* spinning ring decoration */}
          <div style={{
            position: 'absolute', top: -60, right: -60,
            width: 220, height: 220, borderRadius: '50%',
            border: '2px dashed rgba(255,204,0,0.12)',
            animation: 'spin 20s linear infinite',
          }} />
          <div style={{
            position: 'absolute', bottom: -40, left: -40,
            width: 160, height: 160, borderRadius: '50%',
            border: '2px dashed rgba(227,0,15,0.12)',
            animation: 'spin 14s linear infinite reverse',
          }} />

          <div style={{ color: '#FFCC00', fontWeight: 700, fontSize: 12, letterSpacing: 2.5, marginBottom: 18, textTransform: 'uppercase' }}>Our Mission</div>
          <h2 style={{ fontSize: 'clamp(20px,3.2vw,36px)', fontWeight: 900, lineHeight: 1.35, maxWidth: 660, margin: '0 auto 20px', fontStyle: 'italic' }}>
            "To empower every construction project with the right machine, the right operator, and the right attitude."
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, maxWidth: 580, margin: '0 auto', lineHeight: 1.85 }}>
            Sri Balaji Earth Movers is committed to being the partner you can count on — always available, always professional, always delivering more than promised.
          </p>
        </div>

        {/* ── CORE VALUES ── */}
        <div className="about-reveal" style={{ marginBottom: 100 }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ color: '#e3000f', fontWeight: 700, fontSize: 12, letterSpacing: 2.5, marginBottom: 12, textTransform: 'uppercase' }}>Core Values</div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900, lineHeight: 1.1 }}>
              What <span style={{ color: '#FFCC00' }}>Drives Us</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(255px,1fr))', gap: 24 }}>
            {VALUES.map((v, i) => (
              <div key={v.title} className="value-card" style={{
                background: 'rgba(18,18,18,0.7)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 28, padding: '36px 28px', position: 'relative', overflow: 'hidden',
                transitionDelay: `${i * 0.08}s`,
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = v.color + '55';
                  e.currentTarget.style.boxShadow = `0 24px 48px -10px ${v.color}25`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  position: 'absolute', top: 0, right: 0, width: 100, height: 100,
                  background: `radial-gradient(circle at 80% 20%,${v.color}18,transparent 65%)`,
                  pointerEvents: 'none',
                }} />
                <div style={{
                  width: 64, height: 64, borderRadius: 20,
                  background: v.color + '18', color: v.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 24,
                  animation: `scaleIn 0.5s ease ${0.1 + i * 0.1}s both`,
                }}>{v.icon}</div>
                <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>{v.title}</div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.78, margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CONTACT + CTA ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 32 }}>

          {/* contact */}
          <div className="about-reveal-left" style={{
            background: 'rgba(18,18,18,0.85)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 32, padding: '40px',
          }}>
            <div style={{ color: '#FFCC00', fontWeight: 700, fontSize: 12, letterSpacing: 2.5, marginBottom: 28, textTransform: 'uppercase' }}>Get in Touch</div>
            {[
              { icon: <Phone size={18} />, label: '+91 9842140010', color: '#22c55e' },
              { icon: <Mail size={18} />, label: 'infosribalajiearthmovers7@gmail.com', color: '#3b82f6' },
              { icon: <MapPin size={18} />, label: 'Sangagiri , Salem ,Tamil Nadu, India', color: '#e3000f' },
              { icon: <Clock size={18} />, label: 'Mon – Sat: 7:00 AM – 7:00 PM', color: '#FFCC00' },
            ].map((c, i) => (
              <div key={c.label} style={{
                display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18,
                animation: `fadeUp 0.5s ease ${0.1 * i}s both`,
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 13,
                  background: c.color + '18', color: c.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  transition: 'transform 0.3s',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15) rotate(5deg)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
                >{c.icon}</div>
                <span style={{ color: 'rgba(255,255,255,0.72)', fontSize: 14, fontWeight: 500 }}>{c.label}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="about-reveal-right" style={{
            background: 'linear-gradient(135deg,#e3000f 0%,#8b0000 100%)',
            borderRadius: 32, padding: '40px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* animated bg rings */}
            <div style={{ position: 'absolute', top: -30, right: -30, width: 180, height: 180, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', animation: 'spin 12s linear infinite' }} />
            <div style={{ position: 'absolute', bottom: -50, left: -50, width: 240, height: 240, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.07)', animation: 'spin 18s linear infinite reverse' }} />

            <div style={{ position: 'relative' }}>
              <div style={{ animation: 'pulse 2.5s ease infinite', width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <Truck size={28} color="#fff" />
              </div>
              <h3 style={{ fontSize: 30, fontWeight: 900, marginBottom: 12, lineHeight: 1.15 }}>
                Ready to Start<br />Your Project?
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.78, marginBottom: 30, fontSize: 14 }}>
                Tell us your requirements and our team will respond within the hour with the best machine and pricing for your job site.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button onClick={() => navigate('/book')} className="cta-btn" style={{
                  background: '#fff', color: '#e3000f', border: 'none',
                  borderRadius: 14, padding: '14px 28px', fontWeight: 800, fontSize: 14,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  Book Now <ArrowRight size={18} />
                </button>
                <button onClick={() => navigate('/calculate')} style={{
                  background: 'rgba(255,255,255,0.15)', color: '#fff',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: 14, padding: '14px 28px', fontWeight: 700, fontSize: 14,
                  cursor: 'pointer', transition: 'background 0.3s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.28)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                >
                  Get a Quote
                </button>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
