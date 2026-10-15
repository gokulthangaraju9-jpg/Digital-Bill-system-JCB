import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft } from 'lucide-react';

const BookMachine = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, setUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const initialMachine = location.state?.machineType || 'JCB 3DX';

  const [formData, setFormData] = useState({
    machineType: initialMachine,
    duration: '8',
    siteLocation: '',
    startDate: '',
    contactNumber: userData?.phone || '',
    notes: ''
  });

  useEffect(() => {
    if (location.state?.machineType) {
      setFormData(prev => ({ ...prev, machineType: location.state.machineType }));
    }
  }, [location.state]);

  React.useEffect(() => {
    if (userData?.phone) {
      setFormData(prev => ({
        ...prev,
        contactNumber: prev.contactNumber || userData.phone
      }));
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        // If user profile does not have a phone number, save the entered contactNumber to user's profile
        if (userData && !userData.phone && formData.contactNumber && setUserData) {
          setUserData(prev => ({
            ...prev,
            phone: formData.contactNumber
          }));
        }
        setSuccess(true);
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        alert('Failed to save booking. Please try again.');
      }
    } catch (err) {
      console.error('Error saving booking:', err);
      alert('Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex-col items-center justify-center" style={{ minHeight: '100vh', textAlign: 'center', padding: 20 }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Booking Request Sent!</h2>
        <p style={{ color: 'var(--text-2)', maxWidth: 400 }}>
          Our team will contact you shortly at <b>{formData.contactNumber}</b> to confirm your booking for the <b>{formData.siteLocation}</b> site.
        </p>
        <div style={{ marginTop: 32 }} className="spinner"></div>
        <p style={{ marginTop: 16, fontSize: 13, color: 'var(--text-3)' }}>Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.05) 0%, #000 70%)',
    }}>
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '64px 24px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', borderRadius: 99, padding: '8px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 24, backdropFilter: 'blur(10px)', transition: 'background 0.25s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.16)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
        >
          <ArrowLeft size={16} /> Back
        </button>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🚜 New Booking</h1>
          <p style={{ color: 'var(--text-2)', fontSize: 15 }}>
            Fill in the details below to request a machine for your project.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card flex-col gap-6">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label className="label">Machine Type</label>
              <select
                className="input"
                value={formData.machineType}
                onChange={(e) => setFormData({ ...formData, machineType: e.target.value })}
              >
                <option value="JCB 3DX">JCB 3DX (Backhoe Loader)</option>
                <option value="Kobelco Excavator">Kobelco Excavator (Heavy Excavator)</option>
              </select>
            </div>
            <div>
              <label className="label">Duration (Hours)</label>
              <input
                type="number"
                className="input"
                placeholder="e.g. 8"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="label">Site Location</label>
            <input
              type="text"
              className="input"
              placeholder="Full address of the site"
              value={formData.siteLocation}
              onChange={(e) => setFormData({ ...formData, siteLocation: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label className="label">Start Date</label>
              <input
                type="date"
                className="input"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="label">Contact Number</label>
              <input
                type="tel"
                className="input"
                placeholder="Your mobile number"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="label">Special Instructions (Optional)</label>
            <textarea
              className="input"
              style={{ minHeight: 100, resize: 'vertical' }}
              placeholder="Any specific requirements..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
            style={{ padding: '14px', marginTop: 8 }}
          >
            {loading ? <div className="spinner" style={{ width: 20, height: 20, borderWeight: 2 }}></div> : 'Confirm Booking Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookMachine;

