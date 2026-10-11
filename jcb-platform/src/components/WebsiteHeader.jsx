import React, { useState, useEffect } from 'react';
import { Menu, ArrowUpRight, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function WebsiteHeader() {
  const navigate = useNavigate();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState({ phone: '+91 9842140010', phone2: '+91 9865574700', email: 'info@sribalajiearthmovers.com' });
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Attempt to fetch from backend, but fallback to defaults on error
    fetch('http://localhost:5000/api/public/contact')
      .then(res => res.json())
      .then(data => {
        if (data && data.phone && data.email) {
          setContactInfo(data);
        }
      })
      .catch(err => console.error('Failed to load contact info:', err));
  }, []);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const isHomePage = window.location.pathname === '/' || window.location.pathname === '/intro';
      if (!isHomePage) return;

      const sections = ['contact', 'gallery', 'about', 'home'];
      const scrollPos = window.scrollY + 140;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionId);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    const isHomePage = window.location.pathname === '/' || window.location.pathname === '/intro';
    setActiveSection(sectionId);

    if (isHomePage) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `/#${sectionId}`);
      }
    } else {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  };

  return (
    <>
      <header className="header-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: isScrolled ? 'rgba(255, 255, 255, 0.96)' : '#ffffff',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        height: '90px',
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        fontFamily: 'Inter, sans-serif',
        boxShadow: isScrolled ? '0 6px 28px rgba(0,0,0,0.12)' : '0 2px 20px rgba(0,0,0,0.05)',
        zIndex: 1000,
        transition: 'background 0.3s ease, box-shadow 0.3s ease'
      }}>
        {/* Left Logo Section (Red Trapezoid) */}
        <div className="logo-section" style={{
          background: '#e3000f',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 60px 0 40px',
          clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)',
          width: '320px',
          cursor: 'pointer'
        }} onClick={() => handleNavClick('home')}>
          <div style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="logo-img-container" style={{ background: '#fff', padding: '4px', borderRadius: '4px', display: 'flex' }}>
              <img className="logo-img" src="/logo.png" alt="Logo" style={{ height: '40px', objectFit: 'contain' }} onError={(e) => e.target.style.display = 'none'} />
            </div>
            <div className="logo-text" style={{ fontWeight: 900, fontSize: 20, lineHeight: 1.1, letterSpacing: '0.5px' }}>
              SRI BALAJI <br />
              <span className="logo-subtext" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '1px' }}>EARTH MOVERS</span>
            </div>
          </div>
        </div>

        {/* Center Navigation */}
        <nav className="desktop-nav" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          height: '100%',
        }}>
          <style>
            {`
              .nav-link {
                color: #002855;
                font-weight: 600;
                font-size: 14px;
                cursor: pointer;
                position: relative;
                transition: color 0.3s ease;
                display: flex;
                align-items: center;
              }
              .nav-link:hover {
                color: #e3000f;
              }
              .nav-link.active {
                color: #e3000f !important;
              }
              .nav-link::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 2px;
                bottom: -4px;
                left: 0;
                background-color: #e3000f;
                transform: scaleX(0);
                transition: transform 0.3s ease;
                transform-origin: right;
              }
              .nav-link:hover::after,
              .nav-link.active::after {
                transform: scaleX(1);
                transform-origin: left;
              }
              
              .mobile-only {
                display: none !important;
              }

              @media (max-width: 768px) {
                .header-container {
                  height: 70px !important;
                }
                .logo-section {
                  width: 200px !important;
                  padding: 0 30px 0 16px !important;
                  clip-path: polygon(0 0, 100% 0, 90% 100%, 0% 100%) !important;
                }
                .logo-img-container {
                  padding: 2px !important;
                }
                .logo-img {
                  height: 28px !important;
                }
                .logo-text {
                  font-size: 13px !important;
                  letter-spacing: 0.2px !important;
                  line-height: 1.0 !important;
                }
                .logo-subtext {
                  font-size: 8px !important;
                  letter-spacing: 0.5px !important;
                }
                .desktop-nav {
                  display: none !important;
                }
                .desktop-quote-btn {
                  display: none !important;
                }
                .right-actions {
                  padding-right: 16px !important;
                  gap: 8px !important;
                }
                .mobile-only {
                  display: block !important;
                }
              }
            `}
          </style>

          <div 
            className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} 
            onClick={() => handleNavClick('home')}
          >
            HOME
          </div>
          <div 
            className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} 
            onClick={() => handleNavClick('about')}
          >
            ABOUT US
          </div>
          <div 
            className={`nav-link ${activeSection === 'gallery' ? 'active' : ''}`} 
            onClick={() => handleNavClick('gallery')}
          >
            GALLERY
          </div>
          <div 
            className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} 
            onClick={() => handleNavClick('contact')}
          >
            CONTACT
          </div>
        </nav>

        {/* Right Actions Section */}
        <div className="right-actions" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          paddingRight: '40px'
        }}>


          {/* Menu */}
          <div style={{ position: 'relative' }}>
            <div 
              style={{ width: 44, height: 44, borderRadius: '50%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.2s' }} 
              onMouseEnter={e => e.currentTarget.style.background = '#eee'} 
              onMouseLeave={e => e.currentTarget.style.background = '#f5f5f5'}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={20} color="#000" />
            </div>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div style={{
                position: 'absolute', top: '56px', right: 0, background: '#fff',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)', borderRadius: '12px',
                padding: '12px 0', minWidth: '180px', display: 'flex', flexDirection: 'column',
                zIndex: 200, border: '1px solid rgba(0,0,0,0.05)'
              }}>
                {[
                  { label: 'Home', section: 'home' },
                  { label: 'About Us', section: 'about' },
                  { label: 'Gallery', section: 'gallery' },
                  { label: 'Contact', section: 'contact' },
                  { label: 'Billing', path: '/calculate', isMobileOnly: true }
                ].map((item, index) => (
                  <div 
                    key={index}
                    onClick={() => { 
                      if (item.section) {
                        handleNavClick(item.section);
                      } else if (item.path) {
                        navigate(item.path);
                      }
                      setIsMenuOpen(false); 
                    }}
                    className={item.isMobileOnly ? 'mobile-only' : ''}
                    style={{
                      padding: '12px 24px', cursor: 'pointer', fontSize: 14, fontWeight: 600,
                      color: activeSection === item.section ? '#e3000f' : '#002855',
                      background: activeSection === item.section ? 'rgba(227,0,15,0.06)' : 'transparent',
                      transition: '0.2s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#f8f9fa'; e.currentTarget.style.color = '#e3000f'; }}
                    onMouseLeave={e => { 
                      e.currentTarget.style.background = activeSection === item.section ? 'rgba(227,0,15,0.06)' : 'transparent'; 
                      e.currentTarget.style.color = activeSection === item.section ? '#e3000f' : '#002855'; 
                    }}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Free Quote Button */}
          <button className="desktop-quote-btn" style={{
            background: '#e3000f',
            color: '#fff',
            border: 'none',
            borderRadius: '99px',
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontWeight: 700,
            fontSize: '14px',
            lineHeight: 1.2,
            cursor: 'pointer',
            marginLeft: '12px',
            boxShadow: '0 4px 14px rgba(227, 0, 15, 0.3)',
            transition: 'all 0.2s'
          }}
            onClick={() => navigate('/calculate')}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ textAlign: 'left' }}>
              Billing
            </div>
            <ArrowUpRight size={20} />
          </button>
        </div>
      </header>
    </>
  );
}
