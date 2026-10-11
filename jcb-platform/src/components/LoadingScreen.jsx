import React from 'react';

export default function LoadingScreen() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#050505',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Glow effect */}
      <div style={{
        position: 'absolute',
        width: 260,
        height: 260,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(251,197,24,0.18) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(30px)',
        pointerEvents: 'none',
        animation: 'pulseGlow 2s ease-in-out infinite'
      }} />

      {/* Center Loader Box */}
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20
      }}>
        {/* Animated spinner ring */}
        <div style={{ position: 'relative', width: 96, height: 96 }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '3px solid rgba(251,197,24,0.15)',
          }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '3px solid transparent',
            borderTopColor: '#FBC518',
            borderRightColor: '#FBC518',
            animation: 'spin 0.9s cubic-bezier(0.55, 0.25, 0.25, 0.7) infinite'
          }} />
          {/* Inner Logo Image */}
          <div style={{
            position: 'absolute',
            inset: 8,
            borderRadius: '50%',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(251,197,24,0.4)',
            boxShadow: '0 0 20px rgba(251,197,24,0.3)',
            overflow: 'hidden',
            padding: 8
          }}>
            <img
              src="/logo.png"
              alt="Sri Balaji Earth Movers"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          </div>
        </div>

        {/* Text */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            color: '#fff',
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: 0.5,
            marginBottom: 4
          }}>
            Sri Balaji Earth Movers
          </div>
          <div style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: 1,
            textTransform: 'uppercase'
          }}>
            Loading...
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
