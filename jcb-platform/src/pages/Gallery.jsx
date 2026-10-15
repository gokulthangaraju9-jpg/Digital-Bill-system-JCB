import React, { useState, useEffect } from 'react';
import { ArrowLeft, Image as ImageIcon, ZoomIn, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ConstructionBgAnimation from '../components/ConstructionBgAnimation';

// ── Keyframe styles ──────────────────────────────────────────────────────────
const STYLES = `
  @keyframes fadeUp    { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
  @keyframes scaleIn   { from{opacity:0;transform:scale(0.85)} to{opacity:1;transform:scale(1)} }
  @keyframes shimmer   { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
  @keyframes spin      { to{transform:rotate(360deg)} }
  @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  @keyframes particleRise { 0%{opacity:0;transform:translateY(0) scale(0)} 20%{opacity:1} 100%{opacity:0;transform:translateY(-110px) scale(1.2)} }
  @keyframes heroTextIn  { from{opacity:0;letter-spacing:10px} to{opacity:1;letter-spacing:-1px} }
  @keyframes barGrow   { from{width:0} to{width:var(--bar-w)} }
  @keyframes lightbeam { 0%,100%{opacity:0.06} 50%{opacity:0.13} }
  @keyframes cardGlow  { 0%,100%{box-shadow:0 0 0 0 rgba(251,197,24,0)} 50%{box-shadow:0 0 30px 4px rgba(251,197,24,0.15)} }
  @keyframes overlayIn { from{opacity:0} to{opacity:1} }
  @keyframes modalIn   { from{opacity:0;transform:scale(0.82) translateY(40px)} to{opacity:1;transform:scale(1) translateY(0)} }

  .gallery-reveal { opacity:0; transform:translateY(36px); transition:opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1); }
  .gallery-reveal.visible { opacity:1 !important; transform:translateY(0) !important; }

  .gallery-card {
    transition: transform 0.4s cubic-bezier(.4,0,.2,1), box-shadow 0.4s, border-color 0.4s;
    cursor: pointer;
  }
  .gallery-card:hover {
    transform: translateY(-10px) scale(1.02) !important;
    box-shadow: 0 30px 60px -12px rgba(251,197,24,0.25) !important;
    border-color: rgba(251,197,24,0.45) !important;
  }
  .gallery-card:hover .card-img { transform: scale(1.1) !important; }
  .gallery-card:hover .card-overlay { opacity: 1 !important; }
  .gallery-card:hover .card-label  { opacity:1 !important; transform:translateY(0) !important; }
  .gallery-card:hover .zoom-btn    { opacity:1 !important; transform:scale(1) !important; }

  .card-img     { transition: transform 0.6s cubic-bezier(.4,0,.2,1); }
  .card-overlay { opacity:0; transition: opacity 0.4s; }
  .card-label   { opacity:0; transform:translateY(10px); transition: opacity 0.35s, transform 0.35s; }
  .zoom-btn     { opacity:0; transform:scale(0.7); transition: opacity 0.3s, transform 0.3s; }

  .filter-btn { transition: background 0.25s, color 0.25s, transform 0.25s; }
  .filter-btn:hover { transform: translateY(-2px); }

  .particle { animation: particleRise var(--dur) ease-out var(--delay) infinite; }

  .shimmer-badge {
    background: linear-gradient(90deg, rgba(251,197,24,0.08), rgba(251,197,24,0.28), rgba(251,197,24,0.08));
    background-size: 200% 100%;
    animation: shimmer 2.5s infinite;
  }
`;

// ── Machine data ─────────────────────────────────────────────────────────────
const MACHINES = [
  { id: 1, name: 'JCB 3DX', type: 'Backhoe Loader', image: '/images/1.jpeg', tag: 'AVAILABLE' },
  { id: 2, name: 'Kobelco Excavator', type: 'Excavator', image: '/images/2.jpg', tag: 'AVAILABLE' }
];

const FILTERS = ['All', 'Backhoe Loader', 'Excavator'];

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  left: `${6 + i * 6.5}%`,
  size: 4 + Math.random() * 5,
  dur: `${3 + Math.random() * 4}s`,
  delay: `${Math.random() * 4}s`,
  color: i % 3 === 0 ? '#FBC518' : i % 3 === 1 ? '#e3000f' : '#3b82f6',
}));

// ── Component ────────────────────────────────────────────────────────────────
export default function Gallery({ isEmbedded = false }) {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null); // machine object | null

  // inject styles
  useEffect(() => {
    if (document.getElementById('gallery-styles')) return;
    const s = document.createElement('style');
    s.id = 'gallery-styles'; s.textContent = STYLES;
    document.head.appendChild(s);
    return () => { const el = document.getElementById('gallery-styles'); el && el.remove(); };
  }, []);

  // scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    document.querySelectorAll('.gallery-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // close lightbox on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const filtered = activeFilter === 'All' ? MACHINES : MACHINES.filter(m => m.type === activeFilter);

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
      <section style={{ position: 'relative', height: '48vh', overflow: 'hidden' }}>
        <img src="/hero.jpg" alt="Gallery hero" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, transform: 'scale(1.04)' }} />

        {/* gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(0,40,85,0.4) 0%,rgba(5,5,5,0.85) 60%,rgba(5,5,5,0.65) 100%)' }} />

        {/* light beams */}
        {[15, 45, 75].map((l, i) => (
          <div key={i} style={{ position: 'absolute', top: 0, left: `${l}%`, width: 2, height: '100%', background: 'linear-gradient(to bottom,transparent,rgba(251,197,24,0.18),transparent)', animation: `lightbeam ${2 + i}s ease-in-out infinite`, animationDelay: `${i * 0.7}s` }} />
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
              <ArrowLeft size={16} /> Back
            </button>
          )}

          <div className="shimmer-badge" style={{ border: '1px solid rgba(251,197,24,0.35)', borderRadius: 99, padding: '8px 20px', fontSize: 13, fontWeight: 700, color: '#FBC518', marginBottom: 20, letterSpacing: 1.5, display: 'inline-flex', alignItems: 'center', gap: 8, width: 'fit-content', animation: 'fadeUp 0.7s ease both' }}>
            <ImageIcon size={14} />
            <span>MACHINE SHOWCASE</span>
          </div>

          <h1 style={{ fontSize: 'clamp(36px,5.5vw,64px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: -1, marginBottom: 14, animation: 'heroTextIn 1s cubic-bezier(.4,0,.2,1) 0.2s both' }}>
            Machine <span style={{ color: '#FBC518' }}>Gallery</span>
          </h1>
          <p style={{ 
            color: 'rgba(255,255,255,0.78)', 
            fontSize: 'clamp(15px, 1.8vw, 17px)', 
            maxWidth: 560, 
            lineHeight: 1.65, 
            fontWeight: 400,
            letterSpacing: '0.1px',
            animation: 'fadeUp 0.9s ease 0.4s both' 
          }}>
            Step into a world of raw power as our gallery showcases heavy-duty machinery in action and expertly prepared project sites.
          </p>

          {/* animated underline */}
          <div style={{ marginTop: 28, height: 3, width: 0, background: 'linear-gradient(90deg,#FBC518,#e3000f)', borderRadius: 99, animation: 'barGrow 1.2s cubic-bezier(.4,0,.2,1) 0.7s forwards', '--bar-w': '200px' }} />
        </div>

        {/* floating icon */}
        <div style={{ position: 'absolute', bottom: '-8px', right: '7vw', opacity: 0.1, animation: 'float 5s ease-in-out infinite' }}>
          <ImageIcon size={180} color="#FBC518" />
        </div>
      </section>

      <main style={{ maxWidth: 1260, margin: '0 auto', padding: '64px 32px' }}>

        {/* ── FILTER BUTTONS ── */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 36, flexWrap: 'wrap', justifyContent: 'center' }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="filter-btn"
              style={{
                padding: '9px 20px',
                borderRadius: 99,
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                background: activeFilter === f ? '#FBC518' : 'rgba(255,255,255,0.06)',
                color: activeFilter === f ? '#000' : 'rgba(255,255,255,0.7)',
                border: activeFilter === f ? '1px solid #FBC518' : '1px solid rgba(255,255,255,0.12)',
                boxShadow: activeFilter === f ? '0 4px 16px rgba(251,197,24,0.3)' : 'none',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ── GRID ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: 28 }}>
          {filtered.map((machine, i) => (
            <div
              key={machine.id}
              className="gallery-reveal gallery-card"
              style={{
                background: 'rgba(18,18,18,0.85)', border: '1px solid rgba(251,197,24,0.18)',
                borderRadius: 28, overflow: 'hidden',
                transitionDelay: `${i * 0.08}s`,
                backdropFilter: 'blur(20px)',
                boxShadow: '0 15px 35px rgba(0,0,0,0.4)'
              }}
              onClick={() => setLightbox(machine)}
            >
              {/* image */}
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: '#0a0a0a' }}>
                <img
                  src={machine.image}
                  alt={machine.name}
                  className="card-img"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => { 
                    e.target.onerror = null;
                    e.target.src = '/hero.jpg';
                  }}
                />
                {/* dark overlay on hover */}
                <div className="card-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.2) 60%,transparent 100%)' }} />

                {/* type badge */}
                <div className="card-label" style={{ position: 'absolute', bottom: 14, left: 14 }}>
                  <span style={{ background: '#e3000f', color: '#fff', fontSize: 11, fontWeight: 800, padding: '5px 12px', borderRadius: 99, letterSpacing: 0.8, textTransform: 'uppercase' }}>
                    {machine.type}
                  </span>
                </div>

              </div>

              {/* info */}
              <div style={{ padding: '22px 24px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: 0 }}>{machine.name}</h3>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#22c55e', background: 'rgba(34,197,94,0.12)', padding: '3px 10px', borderRadius: 99 }}>
                    {machine.tag}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', margin: '0 0 16px', lineHeight: 1.6 }}>
                  High-performance and well-maintained. Available for immediate hire.
                </p>
                <button
                  onClick={e => { e.stopPropagation(); navigate('/book', { state: { machineType: machine.name } }); }}
                  style={{ background: 'rgba(251,197,24,0.12)', color: '#FBC518', border: '1px solid rgba(251,197,24,0.35)', borderRadius: 10, padding: '9px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.25s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#FBC518'; e.currentTarget.style.color = '#000'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(251,197,24,0.12)'; e.currentTarget.style.color = '#FBC518'; }}
                >
                  Book This Machine →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* empty state */}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.3)', animation: 'fadeUp 0.5s ease both' }}>
            <ImageIcon size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
            <p style={{ fontSize: 16 }}>No machines found for this category.</p>
          </div>
        )}
      </main>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, backdropFilter: 'blur(12px)', animation: 'overlayIn 0.3s ease both' }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: 'rgba(18,18,18,0.98)', border: '1px solid rgba(251,197,24,0.25)', borderRadius: 32, overflow: 'hidden', maxWidth: 760, width: '100%', animation: 'modalIn 0.4s cubic-bezier(.4,0,.2,1) both', boxShadow: '0 40px 80px rgba(0,0,0,0.6)' }}
          >
            <div style={{ position: 'relative', aspectRatio: '16/9', background: '#0a0a0a' }}>
              <img src={lightbox.image} alt={lightbox.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button
                onClick={() => setLightbox(null)}
                style={{ position: 'absolute', top: 16, right: 16, width: 40, height: 40, borderRadius: '50%', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)' }}
              ><X size={18} /></button>
            </div>
            <div style={{ padding: '28px 32px 32px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#e3000f', letterSpacing: 1.5, textTransform: 'uppercase' }}>{lightbox.type}</span>
                <h2 style={{ fontSize: 28, fontWeight: 900, margin: '8px 0 8px', color: '#fff' }}>{lightbox.name}</h2>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: 400 }}>High-performance and well-maintained. Available for immediate hire across Tamil Nadu.</p>
              </div>
              <button
                onClick={() => { setLightbox(null); navigate('/book', { state: { machineType: lightbox.name } }); }}
                style={{ background: '#e3000f', color: '#fff', border: 'none', borderRadius: 14, padding: '14px 28px', fontWeight: 800, fontSize: 14, cursor: 'pointer', whiteSpace: 'nowrap', boxShadow: '0 8px 20px rgba(227,0,15,0.35)', transition: 'transform 0.25s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Book Now →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
