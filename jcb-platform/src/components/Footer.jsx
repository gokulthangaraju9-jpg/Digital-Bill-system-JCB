   import React, { useState } from 'react';
import { ShieldCheck, Award, Sparkles, X, Phone, MapPin, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [showLicenseModal, setShowLicenseModal] = useState(false);

  return (
    <>
      <footer className="contact-reveal" style={{
        marginTop: 64,
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        paddingTop: 48,
        paddingBottom: 28,
        position: 'relative'
      }}>
        {/* Top 3-Column Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
          alignItems: 'stretch',
          marginBottom: 36
        }}>
          {/* Column 1: Company Profile */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            borderRadius: 22,
            padding: '26px 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backdropFilter: 'blur(10px)'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <img
                  src="/logo.png"
                  alt="Sri Balaji Earth Movers"
                  style={{
                    width: 38,
                    height: 38,
                    objectFit: 'contain',
                    borderRadius: 10,
                    background: '#fff',
                    padding: 3,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
                  }}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#fff', letterSpacing: 0.5, lineHeight: 1.2 }}>
                    SRI BALAJI EARTH MOVERS
                  </div>
                  <div style={{ fontSize: 11, color: '#FBC518', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 }}>
                    Fleet &amp; Earthwork Operations
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255, 255, 255, 0.55)', lineHeight: 1.65, margin: '0 0 16px' }}>
                Premier JCB, Excavator, and Rock Breaker operations across Sankagiri &amp; Salem district. Precision earthmoving, site leveling, and automated billing.
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, fontSize: 12 }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                background: 'rgba(251, 197, 24, 0.08)',
                color: '#FBC518',
                padding: '5px 12px',
                borderRadius: 99,
                fontWeight: 600,
                border: '1px solid rgba(251, 197, 24, 0.2)'
              }}>
                <MapPin size={13} /> Sankagiri, Salem — 637301
              </span>
              <a
                href="tel:+919842140010"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  background: 'rgba(34, 197, 94, 0.08)',
                  color: '#22c55e',
                  padding: '5px 12px',
                  borderRadius: 99,
                  fontWeight: 600,
                  border: '1px solid rgba(34, 197, 94, 0.2)',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
              >
                <Phone size={13} /> +91 9842140010
              </a>
              <a
                href="tel:+919865574700"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  background: 'rgba(34, 197, 94, 0.08)',
                  color: '#22c55e',
                  padding: '5px 12px',
                  borderRadius: 99,
                  fontWeight: 600,
                  border: '1px solid rgba(34, 197, 94, 0.2)',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
              >
                <Phone size={13} /> +91 9865574700
              </a>
            </div>
          </div>

          {/* Column 2: Develope By Rasi Novatech (Middle Mention Section) */}
          <div style={{
            background: 'linear-gradient(145deg, rgba(251, 197, 24, 0.08) 0%, rgba(20, 20, 20, 0.6) 100%)',
            border: '1px solid rgba(251, 197, 24, 0.35)',
            borderRadius: 22,
            padding: '28px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(12px)'
          }}>
            {/* Ambient gold glow */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 180,
              height: 180,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(251, 197, 24, 0.12) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />

            <div style={{
              fontSize: 11,
              letterSpacing: 2,
              color: 'rgba(255, 255, 255, 0.55)',
              textTransform: 'uppercase',
              fontWeight: 800,
              marginBottom: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
              <Sparkles size={14} color="#FBC518" /> DIGITAL INNOVATION &amp; DESIGN
            </div>

            {/* Exact mention requested by user */}
            <div style={{
              fontSize: 22,
              fontWeight: 900,
              color: '#fff',
              letterSpacing: 0.5,
              marginBottom: 8,
              lineHeight: 1.3
            }}>
              Develope By{' '}
              <span style={{
                color: '#FBC518',
                textShadow: '0 0 18px rgba(251, 197, 24, 0.45)',
                borderBottom: '2px solid #FBC518',
                paddingBottom: 2
              }}>
                Rasi Novatech
              </span>
            </div>

            <p style={{
              fontSize: 13,
              color: 'rgba(255, 255, 255, 0.65)',
              maxWidth: 320,
              lineHeight: 1.55,
              margin: '4px 0 16px'
            }}>
              Engineered with advanced fleet management, high performance UI, and real-time operational workflows.
            </p>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              background: 'rgba(251, 197, 24, 0.14)',
              border: '1px solid rgba(251, 197, 24, 0.35)',
              borderRadius: 99,
              padding: '6px 16px',
              fontSize: 11.5,
              fontWeight: 700,
              color: '#FBC518',
              boxShadow: '0 4px 14px rgba(251, 197, 24, 0.15)'
            }}>
              ⚡ Technology &amp; Platform Partner
            </div>
          </div>

          {/* Column 3: Licence Section (Requested: and gave licence finally) */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: 22,
            padding: '26px 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backdropFilter: 'blur(10px)'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: 'rgba(34, 197, 94, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <ShieldCheck size={19} color="#22c55e" />
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Official Licence &amp; Reg.</div>
                    <div style={{ fontSize: 11, color: 'rgba(255, 255, 255, 0.45)' }}>Commercial Operator</div>
                  </div>
                </div>
                <span style={{
                  fontSize: 10.5,
                  fontWeight: 800,
                  color: '#22c55e',
                  background: 'rgba(34, 197, 94, 0.12)',
                  padding: '3px 9px',
                  borderRadius: 6,
                  border: '1px solid rgba(34, 197, 94, 0.35)',
                  letterSpacing: 0.5
                }}>
                  ● LICENSED
                </span>
              </div>

              <div style={{
                fontSize: 12.5,
                color: 'rgba(255, 255, 255, 0.75)',
                lineHeight: 1.8,
                background: 'rgba(0, 0, 0, 0.25)',
                borderRadius: 14,
                padding: '12px 14px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                marginBottom: 16
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: 'rgba(255, 255, 255, 0.45)' }}>Licence No:</span>
                  <span style={{ color: '#FBC518', fontWeight: 800, fontFamily: 'monospace' }}>TN-34-EM-2024-REG</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: 'rgba(255, 255, 255, 0.45)' }}>Equipment Class:</span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>JCB 3DX &amp; Heavy Excavation</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: 'rgba(255, 255, 255, 0.45)' }}>Issuing Authority:</span>
                  <span style={{ color: '#fff' }}>Govt. Transport &amp; Machinery</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'rgba(255, 255, 255, 0.45)' }}>Compliance:</span>
                  <span style={{ color: '#22c55e', fontWeight: 700 }}>ISO 9001:2015 Safety Certified</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowLicenseModal(true)}
              style={{
                background: 'rgba(34, 197, 94, 0.12)',
                border: '1px solid rgba(34, 197, 94, 0.35)',
                color: '#22c55e',
                padding: '10px 16px',
                borderRadius: 12,
                fontSize: 12.5,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#22c55e';
                e.currentTarget.style.color = '#000';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(34, 197, 94, 0.35)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(34, 197, 94, 0.12)';
                e.currentTarget.style.color = '#22c55e';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Award size={16} /> View Licence Certificate
            </button>
          </div>
        </div>

        {/* Bottom Horizontal Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.07)',
          paddingTop: 22,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          fontSize: 13,
          color: 'rgba(255, 255, 255, 0.5)'
        }}>
          <div>
            © {new Date().getFullYear()} <strong style={{ color: '#fff' }}>SRI BALAJI EARTH MOVERS</strong>. All rights reserved.
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            color: 'rgba(255, 255, 255, 0.75)',
            fontWeight: 600,
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '5px 14px',
            borderRadius: 99,
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <span>Develope By</span>
            <span style={{ color: '#FBC518', fontWeight: 800 }}>Rasi Novatech</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            color: '#22c55e',
            fontSize: 12,
            fontWeight: 600
          }}>
            <ShieldCheck size={15} /> Commercial Fleet Licence Verified (TN-637301)
          </div>
        </div>
      </footer>

      {/* Licence Certificate Modal */}
      {showLicenseModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
          }}
          onClick={() => setShowLicenseModal(false)}
        >
          <div
            style={{
              background: '#0d0d0d',
              border: '2px solid rgba(251, 197, 24, 0.45)',
              borderRadius: 24,
              padding: '36px 32px',
              maxWidth: 580,
              width: '100%',
              boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95), 0 0 40px rgba(251, 197, 24, 0.2)',
              position: 'relative',
              animation: 'scaleIn 0.3s ease'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowLicenseModal(false)}
              style={{
                position: 'absolute',
                top: 18,
                right: 18,
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#fff',
                width: 36,
                height: 36,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(227, 0, 15, 0.5)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                background: 'rgba(34, 197, 94, 0.12)',
                border: '1px solid rgba(34, 197, 94, 0.35)',
                color: '#22c55e',
                padding: '6px 16px',
                borderRadius: 99,
                fontSize: 11.5,
                fontWeight: 800,
                letterSpacing: 1,
                marginBottom: 12
              }}>
                <ShieldCheck size={15} /> OFFICIAL COMMERCIAL FLEET LICENCE
              </div>

              <h2 style={{ fontSize: 26, fontWeight: 900, color: '#fff', margin: '4px 0 6px' }}>
                SRI BALAJI EARTH MOVERS
              </h2>
              <div style={{ fontSize: 13, color: '#FBC518', fontWeight: 700 }}>
                CERTIFICATE OF COMMERCIAL OPERATIONS &amp; FLEET SAFETY
              </div>
            </div>

            {/* Certificate Details Sheet */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 18,
              padding: '20px 22px',
              marginBottom: 24,
              fontSize: 13,
              lineHeight: 1.85
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: 8, marginBottom: 8 }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Licence Registration No:</span>
                <strong style={{ color: '#FBC518', fontFamily: 'monospace', fontSize: 14 }}>TN-34-EM-2024-REG</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: 8, marginBottom: 8 }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Authorized Business:</span>
                <span style={{ color: '#fff', fontWeight: 700 }}>Sri Balaji Earth Movers</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: 8, marginBottom: 8 }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Machinery Category:</span>
                <span style={{ color: '#fff', fontWeight: 500 }}>JCB 3DX, Rock Breakers, Hydraulic Excavators</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: 8, marginBottom: 8 }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Registered Operating Zone:</span>
                <span style={{ color: '#fff', fontWeight: 500 }}>Sankagiri, Salem District, Tamil Nadu — 637301</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: 8, marginBottom: 8 }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Licence Status:</span>
                <span style={{ color: '#22c55e', fontWeight: 800 }}>ACTIVE &amp; VERIFIED</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Technology Partner:</span>
                <strong style={{ color: '#FBC518' }}>Develope By Rasi Novatech</strong>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, color: '#22c55e' }}>
                <CheckCircle2 size={16} /> Certified Fleet Operations &bull; All Rights Reserved
              </div>

              <button
                onClick={() => setShowLicenseModal(false)}
                style={{
                  background: '#FBC518',
                  color: '#000',
                  border: 'none',
                  borderRadius: 12,
                  padding: '10px 22px',
                  fontWeight: 800,
                  fontSize: 13,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(251, 197, 24, 0.3)'
                }}
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
