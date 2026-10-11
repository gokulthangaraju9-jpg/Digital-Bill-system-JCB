import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const navigate = useNavigate();
  const { user, userData } = useAuth();

  const sections = [
    {
      title: 'Profile Information',
      icon: '👤',
      fields: [
        { label: 'Full Name', value: userData?.fullName || 'Not set' },
        { label: 'Phone Number', value: userData?.phone || 'Not set' },
        { label: 'Email Address', value: user?.email },
        { label: 'Account Type', value: userData?.role?.toUpperCase() || 'USER' },
      ]
    },
    {
      title: 'Preferences',
      icon: '⚙️',
      fields: [
        { label: 'Language', value: 'English (IN)' },
        { label: 'Theme', value: 'Dark (System)' },
        { label: 'Notifications', value: 'Enabled' },
      ]
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.05) 0%, #000 70%)',
    }}>
      {/* Header */}
      <header style={{
        padding: '20px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(8px)',
        position: 'sticky', top: 0, zIndex: 10,
        background: 'rgba(0,0,0,0.7)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => navigate(-1)}
            style={{ background: 'none', border: 'none', color: 'var(--text-2)', cursor: 'pointer', fontSize: 20 }}
          >←</button>
          <div style={{
            width: 40, height: 40, background: 'var(--brand)', borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: 16, color: '#000',
          }}>JCB</div>
          <span style={{ fontWeight: 700, fontSize: 18 }}>Settings</span>
        </div>
      </header>

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>⚙️ Settings</h1>
          <p style={{ color: 'var(--text-2)', fontSize: 15 }}>
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="flex-col gap-6">
          {sections.map((section, idx) => (
            <div key={idx} className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <span style={{ fontSize: 20 }}>{section.icon}</span>
                <h3 style={{ fontSize: 18, fontWeight: 700 }}>{section.title}</h3>
              </div>
              
              <div className="flex-col gap-4">
                {section.fields.map((field, fIdx) => (
                  <div key={fIdx} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    paddingBottom: 12,
                    borderBottom: fIdx === section.fields.length - 1 ? 'none' : '1px solid var(--border)'
                  }}>
                    <span style={{ color: 'var(--text-2)', fontSize: 14 }}>{field.label}</span>
                    <span style={{ fontWeight: 500, fontSize: 14 }}>{field.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Settings;

