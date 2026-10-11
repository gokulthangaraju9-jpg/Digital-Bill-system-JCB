import React from 'react';

export default function ConstructionBgAnimation() {
  const sparks = [
    { left: '7%', delay: '0s', dur: '4.2s', size: 5 },
    { left: '19%', delay: '1.4s', dur: '5.2s', size: 4 },
    { left: '34%', delay: '2.6s', dur: '4.7s', size: 6 },
    { left: '48%', delay: '0.8s', dur: '5.5s', size: 3 },
    { left: '62%', delay: '2.0s', dur: '4.5s', size: 5 },
    { left: '78%', delay: '1.2s', dur: '5.8s', size: 4 },
    { left: '88%', delay: '3.0s', dur: '4.6s', size: 6 },
    { left: '95%', delay: '1.8s', dur: '5.0s', size: 4 },
  ];

  return (
    <>
      <style>
        {`
          @keyframes jcbBoom {
            0%, 100% { transform: rotate(0deg); }
            30% { transform: rotate(-14deg); }
            60% { transform: rotate(18deg); }
            85% { transform: rotate(4deg); }
          }
          @keyframes jcbDipper {
            0%, 100% { transform: rotate(0deg); }
            30% { transform: rotate(26deg); }
            60% { transform: rotate(-24deg); }
            85% { transform: rotate(8deg); }
          }
          @keyframes jcbBucket {
            0%, 100% { transform: rotate(0deg); }
            30% { transform: rotate(40deg); }
            60% { transform: rotate(-45deg); }
            85% { transform: rotate(15deg); }
          }
          @keyframes jcbTreadRoll {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -40; }
          }
          @keyframes gearSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes gearSpinRev {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-360deg); }
          }
          @keyframes beaconFlash {
            0%, 100% { opacity: 0.3; transform: scale(0.9); }
            50% { opacity: 1; transform: scale(1.3); filter: drop-shadow(0 0 10px #FBC518); }
          }
          @keyframes exhaustPuff {
            0% { opacity: 0.7; transform: translate(0, 0) scale(0.5); }
            100% { opacity: 0; transform: translate(-30px, -50px) scale(2); }
          }
          @keyframes sparkDrift {
            0% { transform: translateY(0) translateX(0) scale(0.6); opacity: 0; }
            30% { opacity: 0.9; }
            100% { transform: translateY(-180px) translateX(25px) scale(1.2); opacity: 0; }
          }
          @keyframes craneSwing {
            0%, 100% { transform: rotate(-7deg); }
            50% { transform: rotate(7deg); }
          }
          @keyframes cautionBarMove {
            0% { background-position: 0 0; }
            100% { background-position: 56px 0; }
          }
          @keyframes pulseGlow {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 0.85; transform: scale(1.08); }
          }
          @keyframes floatLogo {
            0%, 100% { transform: translate(-50%, -50%) scale(1) translateY(0); opacity: 0.03; }
            50% { transform: translate(-50%, -50%) scale(1.05) translateY(-20px); opacity: 0.08; }
          }
        `}
      </style>

      <div className="no-print" style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}>
        {/* Ambient #FBC518 Lighting Glows */}
        <div style={{
          position: 'absolute', top: '-10%', right: '-5%', width: 620, height: 620,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,197,24,0.18) 0%, transparent 70%)',
          filter: 'blur(80px)', animation: 'pulseGlow 7s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute', bottom: '15%', left: '-8%', width: 550, height: 550,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,197,24,0.12) 0%, transparent 70%)',
          filter: 'blur(90px)', animation: 'pulseGlow 9s ease-in-out infinite 3s'
        }} />

        {/* Animated JCB Logo Background Image */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 'clamp(300px, 50vw, 800px)',
          animation: 'floatLogo 12s ease-in-out infinite',
          zIndex: -1,
        }}>
          <img 
            src="/jcb-plate.jpeg" 
            alt="JCB Background" 
            style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 0 20px rgba(248,187,0,0.5))', borderRadius: '16px' }} 
            onError={(e) => { e.target.src = '/logo.png'; }}
          />
        </div>

        {/* Floating Mechanical Cogs / Gears in #FBC518 */}
        <div style={{ position: 'absolute', top: '130px', right: '4vw', opacity: 0.16 }}>
          <svg width="120" height="120" viewBox="0 0 100 100" style={{ animation: 'gearSpin 24s linear infinite', transformOrigin: 'center' }}>
            <path d="M50 35 A15 15 0 1 0 50 65 A15 15 0 1 0 50 35 M44 8 L56 8 L54 20 L46 20 Z M44 80 L56 80 L54 92 L46 92 Z M8 44 L8 56 L20 54 L20 46 Z M80 44 L80 56 L92 54 L92 46 Z M22 22 L30 14 L40 22 L32 30 Z M70 70 L78 62 L88 70 L80 78 Z M22 78 L14 70 L22 60 L30 68 Z M78 22 L70 30 L60 22 L68 14 Z" fill="#FBC518" />
            <circle cx="50" cy="50" r="10" fill="#050505" stroke="#FBC518" strokeWidth="2" />
          </svg>
        </div>

        <div style={{ position: 'absolute', top: '220px', right: '8vw', opacity: 0.12 }}>
          <svg width="80" height="80" viewBox="0 0 100 100" style={{ animation: 'gearSpinRev 18s linear infinite', transformOrigin: 'center' }}>
            <path d="M50 35 A15 15 0 1 0 50 65 A15 15 0 1 0 50 35 M44 8 L56 8 L54 20 L46 20 Z M44 80 L56 80 L54 92 L46 92 Z M8 44 L8 56 L20 54 L20 46 Z M80 44 L80 56 L92 54 L92 46 Z M22 22 L30 14 L40 22 L32 30 Z M70 70 L78 62 L88 70 L80 78 Z M22 78 L14 70 L22 60 L30 68 Z M78 22 L70 30 L60 22 L68 14 Z" fill="#FBC518" />
            <circle cx="50" cy="50" r="10" fill="#050505" stroke="#FBC518" strokeWidth="2" />
          </svg>
        </div>

        {/* Floating Crane Cable & Hook in #FBC518 */}
        <div style={{
          position: 'absolute', top: '-10px', left: '3vw', opacity: 0.15,
          transformOrigin: 'top center', animation: 'craneSwing 6s ease-in-out infinite'
        }}>
          <svg width="60" height="260" viewBox="0 0 60 260">
            <line x1="30" y1="0" x2="30" y2="180" stroke="#FBC518" strokeWidth="2" strokeDasharray="6 4" />
            <rect x="22" y="180" width="16" height="24" rx="3" fill="#FBC518" />
            <circle cx="30" cy="192" r="4" fill="#050505" />
            <path d="M 30 204 C 30 230 15 240 15 248 C 15 254 22 258 28 255 C 36 250 44 235 44 222" fill="none" stroke="#FBC518" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>

        {/* Big Animated Articulated JCB Backhoe / Excavator Machinery (Operating Watermark) */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          right: '-30px',
          width: 'clamp(460px, 48vw, 760px)',
          opacity: 0.22,
          transform: 'scaleX(-1)'
        }}>
          <svg viewBox="0 0 750 460" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
            {/* Ground contour */}
            <line x1="10" y1="420" x2="740" y2="420" stroke="#FBC518" strokeWidth="2" strokeDasharray="10 8" opacity="0.4" />

            {/* Underbody & Heavy Tracks */}
            <g>
              <rect x="160" y="370" width="280" height="48" rx="24" fill="#141414" stroke="#FBC518" strokeWidth="3" />
              {[190, 240, 290, 340, 390, 420].map((cx, i) => (
                <g key={i} style={{ transformOrigin: `${cx}px 394px`, animation: 'gearSpin 5s linear infinite' }}>
                  <circle cx={cx} cy="394" r="14" fill="#0a0a0a" stroke="#FBC518" strokeWidth="2" />
                  <line x1={cx - 11} y1="394" x2={cx + 11} y2="394" stroke="#FBC518" strokeWidth="2" />
                  <line x1={cx} y1="383" x2={cx} y2="405" stroke="#FBC518" strokeWidth="2" />
                </g>
              ))}
              <rect x="155" y="365" width="290" height="58" rx="29" fill="none" stroke="#FBC518" strokeWidth="3" strokeDasharray="14 10" style={{ animation: 'jcbTreadRoll 3.5s linear infinite' }} />
            </g>

            {/* Machine Body & Operator Cab */}
            <g>
              {/* Turret Chassis */}
              <path d="M 180 365 L 430 365 L 415 300 L 200 300 Z" fill="#FBC518" stroke="#111" strokeWidth="2" />
              {/* Heavy Counterweight */}
              <path d="M 160 365 L 205 365 L 205 260 L 150 295 Z" fill="#111111" stroke="#FBC518" strokeWidth="2" />
              <text x="160" y="335" fill="#FBC518" fontSize="13" fontWeight="900" fontFamily="Arial, sans-serif" letterSpacing="1">JCB</text>
              
              {/* Operator Cabin */}
              <path d="M 215 300 L 315 300 L 298 190 L 235 190 Z" fill="#FBC518" stroke="#000" strokeWidth="2.5" />
              {/* Cabin Safety Glass Windows */}
              <path d="M 238 285 L 298 285 L 288 205 L 245 205 Z" fill="rgba(251,197,24,0.3)" stroke="#FBC518" strokeWidth="2" />
              {/* Flashing Amber Safety Beacon */}
              <circle cx="266" cy="184" r="5" fill="#FBC518" style={{ animation: 'beaconFlash 1.4s ease-in-out infinite' }} />

              {/* Engine Hood Compartment */}
              <path d="M 315 300 L 420 300 L 420 245 L 315 245 Z" fill="#FBC518" stroke="#111" strokeWidth="2.5" />
              <rect x="335" y="258" width="65" height="8" fill="#111" rx="2" />
              <rect x="335" y="272" width="65" height="8" fill="#111" rx="2" />
              {/* Exhaust stack with animated puffing smoke */}
              <rect x="350" y="215" width="8" height="30" fill="#333" rx="2" />
              <circle cx="354" cy="208" r="5" fill="rgba(251,197,24,0.5)" style={{ animation: 'exhaustPuff 2.5s ease-out infinite' }} />
            </g>

            {/* Articulated Boom Arm - Pivots at (410, 300) */}
            <g className="jcb-boom" style={{ transformOrigin: '410px 300px', animation: 'jcbBoom 8s cubic-bezier(0.45, 0, 0.55, 1) infinite' }}>
              <path d="M 400 310 L 435 295 L 535 170 L 515 155 Z" fill="#FBC518" stroke="#111" strokeWidth="3" />
              {/* Hydraulic Cylinder */}
              <line x1="390" y1="270" x2="475" y2="215" stroke="#777" strokeWidth="7" strokeLinecap="round" />
              <line x1="440" y1="235" x2="500" y2="200" stroke="#FBC518" strokeWidth="4.5" strokeLinecap="round" />
              <circle cx="410" cy="300" r="7" fill="#111" stroke="#FBC518" strokeWidth="2.5" />

              {/* Dipper / Secondary Arm - Pivots at (525, 162) */}
              <g className="jcb-dipper" style={{ transformOrigin: '525px 162px', animation: 'jcbDipper 8s cubic-bezier(0.45, 0, 0.55, 1) infinite' }}>
                <path d="M 520 155 L 538 168 L 625 285 L 610 295 Z" fill="#FBC518" stroke="#111" strokeWidth="3" />
                <circle cx="525" cy="162" r="6" fill="#111" stroke="#FBC518" strokeWidth="2.5" />
                {/* Dipper Hydraulic */}
                <line x1="495" y1="170" x2="570" y2="225" stroke="#777" strokeWidth="6" strokeLinecap="round" />

                {/* Digging Heavy Bucket - Pivots at (618, 290) */}
                <g className="jcb-bucket" style={{ transformOrigin: '618px 290px', animation: 'jcbBucket 8s cubic-bezier(0.45, 0, 0.55, 1) infinite' }}>
                  <path d="M 618 290 L 655 315 L 660 365 L 618 375 L 595 325 Z" fill="#181818" stroke="#FBC518" strokeWidth="3" />
                  {/* Heavy Cast Teeth */}
                  <polygon points="660,365 672,380 652,372" fill="#FBC518" />
                  <polygon points="645,372 654,386 638,377" fill="#FBC518" />
                  <polygon points="628,375 634,390 618,378" fill="#FBC518" />
                  <circle cx="618" cy="290" r="5" fill="#FBC518" />
                </g>
              </g>
            </g>
          </svg>
        </div>

        {/* Floating Golden Sparks / Excavation Particles in #FBC518 */}
        {sparks.map((s, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              bottom: '40px',
              left: s.left,
              width: s.size,
              height: s.size,
              borderRadius: '50%',
              background: '#FBC518',
              boxShadow: '0 0 10px #FBC518',
              animation: `sparkDrift ${s.dur} ease-out ${s.delay} infinite`,
              opacity: 0
            }}
          />
        ))}

        {/* Top Animated Hazard Caution Border in #FBC518 */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'repeating-linear-gradient(45deg, #FBC518, #FBC518 14px, #111111 14px, #111111 28px)',
          backgroundSize: '56px 4px',
          animation: 'cautionBarMove 2.5s linear infinite',
          opacity: 0.8
        }} />
      </div>
    </>
  );
}
