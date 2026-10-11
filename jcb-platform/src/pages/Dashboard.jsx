import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const stats = [
  { label: 'Active Bookings', value: '0', icon: '🚜', color: '#FBC518' },
  { label: 'Total Bookings', value: '0', icon: '📋', color: '#22c55e' },
  { label: 'Pending', value: '0', icon: '⏳', color: '#f97316' },
  { label: 'Completed', value: '0', icon: '✅', color: '#3b82f6' },
];

export default function Dashboard() {
  const { user, userData } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/bookings');
        if (res.ok) {
          const data = await res.json();
          setBookings(data);
        }
      } catch (err) {
        console.error('Failed to fetch bookings', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const getStats = () => {
    const total = bookings.length;
    const pending = bookings.filter(b => b.status === 'Pending').length;
    return [
      { label: 'Active Bookings', value: total.toString(), icon: '🚜', color: '#FBC518' },
      { label: 'Total Bookings', value: total.toString(), icon: '📋', color: '#22c55e' },
      { label: 'Pending', value: pending.toString(), icon: '⏳', color: '#f97316' },
      { label: 'Completed', value: '0', icon: '✅', color: '#3b82f6' },
    ];
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050505',
    }}>
      <style>
        {`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      {/* Hero Section */}
      <div style={{
        position: 'relative',
        padding: '100px 32px 140px',
        textAlign: 'center',
        background: 'linear-gradient(rgba(0,0,0,0.6), rgba(5,5,5,1)), url("https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80") center/cover',
        borderBottom: '1px solid rgba(255,255,255,0.02)',
      }}>
        
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(251,197,24,0.12)', border: '1px solid rgba(251,197,24,0.35)', padding: '6px 16px', borderRadius: '40px', color: '#FBC518', fontSize: '13px', fontWeight: '700', marginBottom: '24px', animation: 'fadeUp 0.6s ease-out both' }}>
          🚀 Professional Earth Moving Solutions
        </div>
        
        <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 900, marginBottom: '16px', letterSpacing: '-1px', animation: 'fadeUp 0.6s ease-out 0.1s both' }}>
          Welcome back, <span style={{ color: '#FBC518' }}>{userData?.fullName || user?.email?.split('@')[0] || 'Admin User'}</span>
        </h1>
        
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6', animation: 'fadeUp 0.6s ease-out 0.2s both' }}>
          The most advanced management platform for your JCB fleet and construction billing needs.
        </p>

        {/* Floating Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
          maxWidth: '1000px',
          margin: '0 auto',
          position: 'absolute',
          bottom: '-60px',
          left: '0', right: '0',
          padding: '0 32px',
          zIndex: 10,
          animation: 'fadeUp 0.6s ease-out 0.3s both'
        }}>
          {/* Total Invoices */}
          <div style={{ background: '#121212', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', textAlign: 'left', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', transition: 'transform 0.3s' }} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-5px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(34,197,94,0.1)', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </div>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: '600', marginBottom: '2px' }}>Total Invoices</div>
              <div style={{ fontSize: '28px', fontWeight: '800' }}>0</div>
            </div>
          </div>
          {/* Recent Work */}
          <div style={{ background: '#121212', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', textAlign: 'left', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', transition: 'transform 0.3s' }} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-5px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59,130,246,0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: '600', marginBottom: '2px' }}>Recent Work</div>
              <div style={{ fontSize: '28px', fontWeight: '800' }}>5</div>
            </div>
          </div>
          {/* Total Value */}
          <div style={{ background: '#121212', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', textAlign: 'left', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', transition: 'transform 0.3s' }} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-5px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245,158,11,0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: '600', marginBottom: '2px' }}>Total Value</div>
              <div style={{ fontSize: '28px', fontWeight: '800' }}>₹0.0k</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '140px auto 60px', padding: '0 32px', animation: 'fadeUp 0.6s ease-out 0.4s both' }}>
        {/* Recent Bookings List */}
        <div className="card" style={{ padding: 32, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 24 }}>📋</span> Recent Bookings
          </h2>
          {bookings.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '48px 0',
              color: 'var(--text-3)', fontSize: 15,
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
              No bookings yet.{' '}
              <button
                onClick={() => navigate('/book')}
                style={{ background: 'none', border: 'none', color: '#FBC518', fontWeight: 600, cursor: 'pointer', fontSize: 15 }}
              >
                Book a machine →
              </button>
            </div>
          ) : (
            <div className="flex-col gap-3">
              {bookings.map(b => (
                <div key={b.id} style={{
                  padding: '16px 20px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  borderRadius: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{b.machineType}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Location: {b.siteLocation}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: b.status==='Pending'?'#f59e0b':'#22c55e' }}>{b.status}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{new Date(b.timestamp).toLocaleDateString()}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
