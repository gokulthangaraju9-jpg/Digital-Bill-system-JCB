import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutGrid, Calculator, Truck, Play, Image as ImageIcon, X } from 'lucide-react';

import AboutUs from './AboutUs';
import Gallery from './Gallery';
import Contact from './Contact';
import ConstructionBgAnimation from '../components/ConstructionBgAnimation';

const features = [
  {
    icon: <Truck size={24} />,
    title: 'Book a Machine',
    desc: 'Browse and reserve JCB machines for your project',
    path: '/book',
    color: '#FBC518',
  },
  {
    icon: <Calculator size={24} />,
    title: 'Smart Digital Billing',
    desc: 'Generate the reading sheets',
    path: '/calculate',
    color: '#FBC518',
  },
];

export default function Intro() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState('00:10');

  useEffect(() => {
    // Detect video duration from public video
    const video = document.createElement('video');
    video.src = '/JCB%20VIDEO.mp4';
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        const mins = Math.floor(video.duration / 60);
        const secs = Math.floor(video.duration % 60);
        setVideoDuration(`${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`);
      }
    };
  }, []);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash) {
        const id = window.location.hash.replace('#', '');
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050505',
      color: '#fff',
      fontFamily: 'Inter, sans-serif',
      position: 'relative',
      overflowX: 'clip'
    }}>
      {/* ── CONSTRUCTION EQUIPMENT ANIMATED BACKGROUND (Operating across HOME, ABOUT US, GALLERY, CONTACT) ── */}
      <ConstructionBgAnimation />

      <style>
        {`
          @keyframes goldSweep {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes glowBreath {
            0%, 100% {
              filter: drop-shadow(0 0 10px rgba(251, 197, 24, 0.35)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.8));
            }
            50% {
              filter: drop-shadow(0 0 25px rgba(251, 197, 24, 0.85)) drop-shadow(0 0 45px rgba(251, 197, 24, 0.45)) drop-shadow(0 4px 14px rgba(0, 0, 0, 0.95));
            }
          }
          @keyframes gentleFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          @keyframes badgeGlow {
            0%, 100% {
              box-shadow: 0 0 15px rgba(251,197,24,0.15), inset 0 0 10px rgba(251,197,24,0.05);
              border-color: rgba(251,197,24,0.35);
            }
            50% {
              box-shadow: 0 0 25px rgba(251,197,24,0.4), inset 0 0 15px rgba(251,197,24,0.15);
              border-color: rgba(251,197,24,0.7);
            }
          }
          .hero-title-container {
            animation: gentleFloat 4s ease-in-out infinite;
          }
          .hero-badge-animated {
            animation: badgeGlow 3s ease-in-out infinite;
          }
          .animated-heading-primary {
            background: linear-gradient(110deg, #FBC518 0%, #FFF3B0 25%, #FFFFFF 50%, #FBC518 75%, #D49E05 100%);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: goldSweep 3.2s linear infinite, glowBreath 3.2s ease-in-out infinite;
            display: inline-block;
            transition: transform 0.3s ease, filter 0.3s ease;
          }
          .animated-heading-secondary {
            background: linear-gradient(110deg, #FFFFFF 0%, #FFE57F 25%, #FBC518 50%, #FFFFFF 75%, #FBC518 100%);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: goldSweep 3.2s linear infinite 0.5s, glowBreath 3.2s ease-in-out infinite 0.5s;
            display: inline-block;
            transition: transform 0.3s ease, filter 0.3s ease;
          }
          .hero-title-container:hover .animated-heading-primary,
          .hero-title-container:hover .animated-heading-secondary {
            filter: drop-shadow(0 0 35px rgba(251, 197, 24, 0.95)) drop-shadow(0 0 60px rgba(251, 197, 24, 0.6));
          }
          .animated-bg {
            background: linear-gradient(90deg, #FBC518, #ffd54f, #d49e05, #FBC518) !important;
            background-size: 200% auto !important;
            animation: goldSweep 2.5s linear infinite !important;
            color: #000 !important;
            border: none !important;
          }
        `}
      </style>

      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* ── HOME SECTION ── */}
        <section id="home" style={{ scrollMarginTop: '90px', paddingBottom: 80 }}>
          {/* Hero Showcase */}
          <section style={{ position: 'relative', height: '60vh', overflow: 'hidden' }}>
            <img
              src="/hero.jpg"
              alt="JCB Hero"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, transparent 0%, rgba(5,5,5,0.7) 65%, #050505 100%)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
              textAlign: 'center', padding: '0 32px'
            }}>
              <div className="hero-badge-animated" style={{
                background: 'rgba(251,197,24,0.12)',
                border: '1px solid rgba(251,197,24,0.35)',
                borderRadius: 99, padding: '8px 20px',
                fontSize: 14, fontWeight: 700, color: '#FBC518',
                marginBottom: 24, backdropFilter: 'blur(10px)',
                boxShadow: '0 0 20px rgba(251,197,24,0.15)'
              }}>
                🚀 Professional Earth Movers Solutions
              </div>
              <h1 className="hero-title-container" style={{
                fontSize: 'clamp(32px, 5.5vw, 52px)',
                fontWeight: 900,
                lineHeight: 1.15,
                marginBottom: 19,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                userSelect: 'none'
              }}>
                <span className="animated-heading-primary">WELCOME TO SRI BALAJI</span>
                <span className="animated-heading-secondary">EARTH MOVERS</span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, maxWidth: 650, lineHeight: 1.6 }}>
                Simplify Construction Management with Smart Fleet &amp; Billing Tools
              </p>
            </div>
          </section>

          <main style={{ maxWidth: 1200, margin: '40px auto 0', position: 'relative', zIndex: 10, padding: '0 32px' }}>

            {/* Video & Info Section */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: 32,
              marginBottom: 64
            }}>
              <div style={{
                background: 'rgba(20,20,20,0.65)', border: '1px solid rgba(251,197,24,0.15)',
                borderRadius: 32, padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
                backdropFilter: 'blur(16px)'
              }}>
                <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Operational <span style={{ color: '#FBC518', textShadow: '0 0 25px rgba(251,197,24,0.35)' }}>Excellence</span></h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 24 }}>
                  Watch our JCB video to see how we streamline machine bookings and automated receipt generation.
                </p>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    className="animated-bg"
                    onClick={() => {
                      setIsPlaying(true);
                      const el = document.getElementById('platform-video-player');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    style={{
                      padding: '12px 24px', borderRadius: 14, fontWeight: 800, fontSize: 14,
                      display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(251,197,24,0.35)'
                    }}>
                    <Play size={18} fill="#000" /> Start Tour
                  </button>
                  <button
                    onClick={() => {
                      const el = document.getElementById('gallery');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(251,197,24,0.25)',
                      padding: '12px 24px', borderRadius: 14, fontWeight: 700, fontSize: 14,
                      display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#FBC518'; e.currentTarget.style.color = '#FBC518'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(251,197,24,0.25)'; e.currentTarget.style.color = '#fff'; }}
                  >
                    <ImageIcon size={18} /> View Gallery
                  </button>
                </div>
              </div>

              {/* Video Player */}
              <div
                id="platform-video-player"
                style={{
                  position: 'relative',
                  background: '#111',
                  borderRadius: 32,
                  aspectRatio: '16/9',
                  overflow: 'hidden',
                  border: '1px solid rgba(251,197,24,0.25)',
                  cursor: !isPlaying ? 'pointer' : 'default',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                  transition: 'transform 0.3s ease, border-color 0.3s ease'
                }}
                onClick={() => !isPlaying && setIsPlaying(true)}
                onMouseEnter={e => { if (!isPlaying) { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.borderColor = '#FBC518'; } }}
                onMouseLeave={e => { if (!isPlaying) { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = 'rgba(251,197,24,0.25)'; } }}
              >
                {!isPlaying ? (
                  <>
                    <img
                      src="/hero.jpg"
                      alt="Video Poster"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45, filter: 'grayscale(0.7)' }}
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <div style={{
                        width: 80, height: 80, borderRadius: '50%',
                        background: '#FBC518', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 35px rgba(251,197,24,0.55)',
                        transition: 'all 0.3s'
                      }}>
                        <Play size={32} fill="#000" color="#000" />
                      </div>
                    </div>
                    <div style={{
                      position: 'absolute', bottom: 20, left: 24, right: 24,
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Play size={12} fill="#FBC518" color="#FBC518" /> JCB VIDEO.mp4
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>{videoDuration}</div>
                    </div>
                  </>
                ) : (
                  <>
                    <video
                      autoPlay
                      controls
                      playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover', outline: 'none' }}
                      src="/JCB%20VIDEO.mp4"
                      onEnded={() => setIsPlaying(false)}
                      onError={(e) => console.error('Video playback error', e)}
                    >
                      <source src="/JCB%20VIDEO.mp4" type="video/mp4" />
                      <source src="/JCB VIDEO.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPlaying(false);
                      }}
                      title="Close Video"
                      style={{
                        position: 'absolute',
                        top: 14,
                        right: 14,
                        zIndex: 20,
                        background: 'rgba(0,0,0,0.7)',
                        border: '1px solid rgba(251,197,24,0.4)',
                        color: '#FBC518',
                        borderRadius: '50%',
                        width: 34,
                        height: 34,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        backdropFilter: 'blur(8px)',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.background = '#FBC518'; e.currentTarget.style.color = '#000'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'rgba(0,0,0,0.7)'; e.currentTarget.style.color = '#FBC518'; }}
                    >
                      <X size={16} />
                    </button>
                  </>
                )}
              </div>

            </div>

            {/* Action Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 24,
            }}>
              {features.map(f => (
                <button
                  key={f.path}
                  onClick={() => navigate(f.path)}
                  style={{
                    background: 'rgba(20,20,20,0.6)',
                    border: '1px solid rgba(251,197,24,0.18)',
                    borderRadius: 28,
                    padding: '32px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    backdropFilter: 'blur(16px)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.borderColor = '#FBC518';
                    e.currentTarget.style.background = 'rgba(251,197,24,0.08)';
                    e.currentTarget.style.boxShadow = `0 15px 40px -10px rgba(251,197,24,0.3)`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(251,197,24,0.18)';
                    e.currentTarget.style.background = 'rgba(20,20,20,0.6)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    width: 64, height: 64, borderRadius: 20,
                    background: 'rgba(251,197,24,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: f.color, marginBottom: 28,
                    border: '1px solid rgba(251,197,24,0.3)'
                  }}>{f.icon}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 12 }}>{f.title}</div>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                  <div style={{
                    position: 'absolute', bottom: 32, right: 32,
                    color: f.color, opacity: 0.8,
                  }}>
                    <LayoutGrid size={24} style={{ transform: 'rotate(-45deg)' }} />
                  </div>
                </button>
              ))}
            </div>
          </main>
        </section>

        {/* ── ABOUT US SECTION ── */}
        <section id="about" style={{ scrollMarginTop: '90px', borderTop: '1px solid rgba(251,197,24,0.15)' }}>
          <AboutUs isEmbedded={true} />
        </section>

        {/* ── GALLERY SECTION ── */}
        <section id="gallery" style={{ scrollMarginTop: '90px', borderTop: '1px solid rgba(251,197,24,0.15)' }}>
          <Gallery isEmbedded={true} />
        </section>

        {/* ── CONTACT SECTION ── */}
        <section id="contact" style={{ scrollMarginTop: '90px', borderTop: '1px solid rgba(251,197,24,0.15)' }}>
          <Contact isEmbedded={true} />
        </section>
      </div>
    </div>
  );
}
