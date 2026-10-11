import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calculator, Receipt, ArrowLeft, Printer, Download,
  Plus, Trash2, FileText, CheckCircle, ArrowDown
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { useAuth } from '../context/AuthContext';
import ConstructionBgAnimation from '../components/ConstructionBgAnimation';

// ── Keyframe styles ──────────────────────────────────────────────────────────
const STYLES = `
  @keyframes fadeUp      { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
  @keyframes scaleIn     { from{opacity:0;transform:scale(0.85)} to{opacity:1;transform:scale(1)} }
  @keyframes shimmer     { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
  @keyframes heroTextIn  { from{opacity:0;letter-spacing:10px} to{opacity:1;letter-spacing:-1px} }
  @keyframes bounceDown  { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(5px); } }
  
  /* Construction Equipment Animations */
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

  .calc-input { transition: border-color 0.3s, box-shadow 0.3s; }
  .calc-input:focus { border-color: #FBC518 !important; box-shadow: 0 0 0 3px rgba(251, 197, 24, 0.25) !important; outline: none; }

  .calc-container {
    max-width: 960px;
    margin: 0 auto;
    padding: 20px 24px 80px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .preview-actions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 10px;
    width: 100%;
  }

  .receipt-scroll-wrapper {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding: 10px 0;
    display: flex;
    justify-content: center;
  }

  @media (max-width: 768px) {
    .calc-container {
      gap: 24px;
      padding: 10px 16px 60px;
    }
    .preview-actions-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media print {
    @page {
      size: A4 portrait;
      margin: 10mm;
    }
    html, body {
      background: #ffffff !important;
      color: #000000 !important;
      overflow: visible !important;
      height: auto !important;
    }
    .no-print, header, nav, footer, #construction-bg { 
      display: none !important; 
    }
    .receipt-scroll-wrapper {
      overflow: visible !important;
      padding: 0 !important;
      display: block !important;
      width: 100% !important;
    }
    #printable-receipt { 
      position: static !important;
      visibility: visible !important;
      width: 100% !important; 
      max-width: 100% !important; 
      min-width: 0 !important; 
      margin: 0 auto !important; 
      padding: 15px !important; 
      background: #ffffff !important; 
      box-shadow: none !important;
      border: 1px solid #111 !important;
      page-break-inside: avoid;
    }
    #printable-receipt * {
      visibility: visible !important;
      color: #000 !important;
    }
  }
`;



export default function Calculate() {
  const navigate = useNavigate();
  const receiptRef = useRef();
  const { userData, setUserData } = useAuth();

  // State matching the physical bill sheet
  const [billNo, setBillNo] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [partyAddress, setPartyAddress] = useState('');
  const [mobilePhone, setMobilePhone] = useState(userData?.phone || '');
  
  const [rows, setRows] = useState([
    { id: 1, startReading: '', closeReading: '', totalHour: '' }
  ]);
  
  const [hourlyRate, setHourlyRate] = useState(950); // Default based on image
  const [notes, setNotes] = useState(''); // e.g., "50 lit Dies"
  const [operatorBeta, setOperatorBeta] = useState(100);
  const [advance, setAdvance] = useState(0);

  useEffect(() => {
    if (userData?.phone) {
      setMobilePhone(prev => prev || userData.phone);
    }
  }, [userData]);

  useEffect(()=>{
    if(document.getElementById('calc-styles')) return;
    const s=document.createElement('style');
    s.id='calc-styles'; s.textContent=STYLES;
    document.head.appendChild(s);
    return ()=>{ const el=document.getElementById('calc-styles'); el&&el.remove(); };
  },[]);

  // Calculate row total hour automatically if start/close are provided
  const handleRowChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    
    // Auto-calculate Total Hour
    if ((field === 'startReading' || field === 'closeReading') && newRows[index].startReading && newRows[index].closeReading) {
      const start = parseFloat(newRows[index].startReading);
      const close = parseFloat(newRows[index].closeReading);
      if (!isNaN(start) && !isNaN(close) && close >= start) {
        newRows[index].totalHour = (close - start).toFixed(2);
      }
    }
    setRows(newRows);
  };

  const addRow = () => {
    setRows([...rows, { id: Date.now(), startReading: '', closeReading: '', totalHour: '' }]);
  };

  const removeRow = (id) => {
    if (rows.length > 1) {
      setRows(rows.filter(row => row.id !== id));
    }
  };

  // Calculations
  const grandTotalHour = rows.reduce((sum, row) => sum + (parseFloat(row.totalHour) || 0), 0);
  const totalAmountBase = grandTotalHour * hourlyRate;
  const grandTotal = totalAmountBase + (parseFloat(operatorBeta) || 0);
  const balance = grandTotal - (parseFloat(advance) || 0);

  const inputStyle = {
    width:'100%', padding:'12px 16px', borderRadius:12,
    background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)',
    color:'#fff', fontSize:14, fontWeight:500, fontFamily: 'Inter, sans-serif'
  };

  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [isDownloadingImage, setIsDownloadingImage] = useState(false);

  const handlePrint = () => {
    const element = document.getElementById('printable-receipt');
    if (!element) {
      window.print();
      return;
    }

    // Create an isolated iframe for clean, instant printing without blank pages or overflow clipping
    let iframe = document.getElementById('receipt-print-iframe');
    if (iframe) {
      iframe.remove();
    }
    iframe = document.createElement('iframe');
    iframe.id = 'receipt-print-iframe';
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Bill_${billNo || 'JCB'}_${date}</title>
          <style>
            @page {
              size: A4 portrait;
              margin: 12mm;
            }
            * {
              box-sizing: border-box;
            }
            body {
              font-family: Arial, sans-serif;
              background: #fff;
              color: #000;
              margin: 0;
              padding: 0;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .print-receipt-container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              padding: 10px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
          </style>
        </head>
        <body>
          <div class="print-receipt-container">
            ${element.innerHTML}
          </div>
        </body>
      </html>
    `);
    doc.close();

    setTimeout(() => {
      try {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      } catch {
        window.print();
      }
    }, 250);
  };

  const handleDownloadPDF = async () => {
    try {
      setIsDownloadingPdf(true);
      const element = document.getElementById('printable-receipt');
      if (!element) {
        alert('Receipt element not found.');
        return;
      }

      // Temporarily normalize styles for pristine canvas render
      const originalShadow = element.style.boxShadow;
      const originalBorderRadius = element.style.borderRadius;
      element.style.boxShadow = 'none';
      element.style.borderRadius = '0px';

      // Capture element with html2canvas (scale 2 for sharpness, scrollX/scrollY 0 to prevent blank page)
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        scrollX: 0,
        scrollY: 0,
        windowWidth: 1200
      });

      // Restore styles
      element.style.boxShadow = originalShadow;
      element.style.borderRadius = originalBorderRadius;

      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      // Create PDF document (A4 portrait: 210mm x 297mm)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 12;
      const pdfWidth = pageWidth - (margin * 2);
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      let yOffset = margin;
      if (pdfHeight < (pageHeight - (margin * 2))) {
        yOffset = Math.max(margin, (pageHeight - pdfHeight) / 3);
      }

      pdf.addImage(imgData, 'JPEG', margin, yOffset, pdfWidth, pdfHeight);
      pdf.save(`Bill_${billNo || 'JCB'}_${date || 'sheet'}.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Failed to download PDF. Please try again.');
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handleDownloadImage = async () => {
    try {
      setIsDownloadingImage(true);
      const element = document.getElementById('printable-receipt');
      if (!element) return;
      
      const originalShadow = element.style.boxShadow;
      const originalBorderRadius = element.style.borderRadius;
      element.style.boxShadow = 'none';
      element.style.borderRadius = '0px';
      
      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        scrollX: 0,
        scrollY: 0
      });
      
      element.style.boxShadow = originalShadow;
      element.style.borderRadius = originalBorderRadius;
      
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `Bill_${billNo || 'JCB'}_${date}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating image:', err);
      alert('Failed to download image. Please try again.');
    } finally {
      setIsDownloadingImage(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/calculations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          billNo,
          date,
          partyAddress,
          mobilePhone,
          rows,
          hourlyRate,
          operatorBeta,
          advance,
          totalAmount: grandTotal,
          balance
        })
      });
      if (response.ok) {
        if (userData && !userData.phone && mobilePhone && setUserData) {
          setUserData(prev => ({
            ...prev,
            phone: mobilePhone
          }));
        }
        alert('Calculation saved successfully!');
      } else {
        alert('Failed to save calculation.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to backend.');
    }
  };

  return (
    <div style={{ minHeight:'100vh', background:'#050505', color:'#fff', fontFamily:'Inter, sans-serif', position: 'relative', overflow: 'hidden' }}>
      
      {/* ── CONSTRUCTION EQUIPMENT ANIMATED BACKGROUND ── */}
      <ConstructionBgAnimation />

      {/* ── HEADER ── */}
      <div className="no-print" style={{ position:'relative', padding:'60px 24px 30px', overflow:'hidden', zIndex: 10 }}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(251,197,24,0.18) 0%,rgba(227,0,15,0.06) 45%,#050505 100%)' }}/>
        <div style={{ position:'relative', zIndex:10, maxWidth:960, margin:'0 auto' }}>
          <button
            onClick={()=>navigate(-1)}
            style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.12)', color:'#fff', borderRadius:99, padding:'8px 18px', fontSize:13, fontWeight:600, cursor:'pointer', marginBottom:20, backdropFilter:'blur(10px)', transition:'background 0.25s' }}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.16)'}
            onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.08)'}
          >
            <ArrowLeft size={16}/> Back
          </button>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
            <span style={{ background:'rgba(251,197,24,0.15)', color:'#FBC518', border:'1px solid rgba(251,197,24,0.45)', padding:'5px 16px', borderRadius:20, fontSize:12, fontWeight:800, letterSpacing:1.2, boxShadow:'0 0 15px rgba(251,197,24,0.2)' }}>
              BILLING SOLUTION
            </span>
          </div>
          <h1 style={{ fontSize:'clamp(28px,4.5vw,48px)', fontWeight:900, lineHeight:1.1, letterSpacing:-1, animation:'heroTextIn 1s cubic-bezier(.4,0,.2,1) 0.1s both' }}>
            Digital <span style={{ color:'#FBC518', textShadow:'0 0 35px rgba(251,197,24,0.45)' }}>Bill Generator</span>
          </h1>
          <p style={{ color:'rgba(255,255,255,0.55)', fontSize:15, maxWidth:580, marginTop:10, animation:'fadeUp 0.9s ease 0.3s both' }}>
            Fill in the machine readings below to generate, download, or print an exact digital copy of the Sri Balaji Earth Movers reading sheet.
          </p>
        </div>
      </div>

      <main className="calc-container" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* ── STEP 1: ENTRY FORM ── */}
        <div className="no-print" style={{ background:'rgba(18,18,18,0.88)', border:'1px solid rgba(251,197,24,0.2)', borderRadius:28, padding:'32px', animation:'fadeUp 0.6s ease 0.4s both', backdropFilter:'blur(16px)' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
            <div>
              <span style={{ fontSize:11, fontWeight:800, color:'#FBC518', textTransform:'uppercase', letterSpacing:1.2 }}>Step 1 &bull; Input</span>
              <h2 style={{ fontSize:20, fontWeight:800, marginTop:4, display:'flex', alignItems:'center', gap:10 }}>
                <FileText size={20} color="#FBC518"/> Bill & Reading Details
              </h2>
            </div>
            <span style={{ fontSize:12, color:'rgba(251,197,24,0.7)', background:'rgba(251,197,24,0.08)', border:'1px solid rgba(251,197,24,0.2)', padding:'6px 14px', borderRadius:10, fontWeight:600 }}>
              Live syncing to bill below &darr;
            </span>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:24 }}>
            <div>
              <label style={{ display:'block', fontSize:12, color:'rgba(255,255,255,0.5)', marginBottom:8, fontWeight:600 }}>Bill No</label>
              <input type="text" className="calc-input" value={billNo} onChange={e=>setBillNo(e.target.value)} style={inputStyle}/>
            </div>
            <div>
              <label style={{ display:'block', fontSize:12, color:'rgba(255,255,255,0.5)', marginBottom:8, fontWeight:600 }}>Date</label>
              <input type="date" className="calc-input" value={date} onChange={e=>setDate(e.target.value)} style={inputStyle}/>
            </div>
            <div>
              <label style={{ display:'block', fontSize:12, color:'rgba(255,255,255,0.5)', marginBottom:8, fontWeight:600 }}>Party Address / Name</label>
              <input type="text" className="calc-input" value={partyAddress} onChange={e=>setPartyAddress(e.target.value)} style={inputStyle}/>
            </div>
            <div>
              <label style={{ display:'block', fontSize:12, color:'rgba(255,255,255,0.5)', marginBottom:8, fontWeight:600 }}>Mobile Phone</label>
              <input type="tel" className="calc-input" value={mobilePhone} onChange={e=>setMobilePhone(e.target.value)} style={inputStyle} placeholder="Your mobile number"/>
            </div>
          </div>

          <h3 style={{ fontSize:14, fontWeight:700, color:'#FBC518', marginBottom:12, textTransform:'uppercase', letterSpacing:1 }}>Readings</h3>
          
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {rows.map((row, index) => (
              <div key={row.id} style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr auto', gap:8, alignItems:'center', background:'rgba(255,255,255,0.02)', padding:12, borderRadius:16, border:'1px solid rgba(255,255,255,0.05)' }}>
                <div>
                  <label style={{ display:'block', fontSize:11, color:'rgba(255,255,255,0.4)', marginBottom:4 }}>Start</label>
                  <input type="number" className="calc-input" value={row.startReading} onChange={e=>handleRowChange(index, 'startReading', e.target.value)} style={{...inputStyle, padding:'8px 12px'}}/>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:11, color:'rgba(255,255,255,0.4)', marginBottom:4 }}>Close</label>
                  <input type="number" className="calc-input" value={row.closeReading} onChange={e=>handleRowChange(index, 'closeReading', e.target.value)} style={{...inputStyle, padding:'8px 12px'}}/>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:11, color:'rgba(255,255,255,0.4)', marginBottom:4 }}>Total Hrs</label>
                  <input type="number" className="calc-input" value={row.totalHour} onChange={e=>handleRowChange(index, 'totalHour', e.target.value)} style={{...inputStyle, padding:'8px 12px', background:'rgba(251,197,24,0.12)', color:'#FBC518', fontWeight:700, borderColor:'transparent'}}/>
                </div>
                <div style={{ display:'flex', alignItems:'flex-end', height:'100%', paddingBottom:2 }}>
                  <button onClick={() => removeRow(row.id)} style={{ background:'rgba(227,0,15,0.1)', color:'#e3000f', border:'none', borderRadius:10, padding:8, cursor:'pointer' }}>
                    <Trash2 size={16}/>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button onClick={addRow} style={{ width:'100%', marginTop:12, background:'rgba(255,255,255,0.05)', color:'#fff', border:'1px dashed rgba(251,197,24,0.3)', borderRadius:12, padding:'10px', fontSize:13, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', gap:8, cursor:'pointer' }}>
            <Plus size={14}/> Add Reading Row
          </button>

          <div style={{ marginTop: 24, padding: '16px 20px', background: 'rgba(251,197,24,0.08)', border: '1px solid rgba(251,197,24,0.3)', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#FBC518' }}>Total Auto-Calculated Hours:</span>
            <span style={{ fontSize: 24, fontWeight: 900, color: '#FBC518', textShadow:'0 0 15px rgba(251,197,24,0.3)' }}>{grandTotalHour.toFixed(2)} Hrs</span>
          </div>

          <div style={{ marginTop:32, borderTop:'1px solid rgba(255,255,255,0.1)', paddingTop:24, display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            <div>
              <label style={{ display:'block', fontSize:12, color:'rgba(255,255,255,0.5)', marginBottom:8, fontWeight:600 }}>Hourly Rate (₹)</label>
              <input type="number" className="calc-input" value={hourlyRate} onChange={e=>setHourlyRate(e.target.value)} style={inputStyle}/>
            </div>
            <div>
              <label style={{ display:'block', fontSize:12, color:'rgba(255,255,255,0.5)', marginBottom:8, fontWeight:600 }}>Operator Beta (₹)</label>
              <input type="number" className="calc-input" value={operatorBeta} onChange={e=>setOperatorBeta(e.target.value)} style={inputStyle}/>
            </div>
            <div>
              <label style={{ display:'block', fontSize:12, color:'rgba(255,255,255,0.5)', marginBottom:8, fontWeight:600 }}>Advance Paid (₹)</label>
              <input type="number" className="calc-input" value={advance} onChange={e=>setAdvance(e.target.value)} style={inputStyle}/>
            </div>
            <div>
              <label style={{ display:'block', fontSize:12, color:'rgba(255,255,255,0.5)', marginBottom:8, fontWeight:600 }}>Notes (e.g. Diesel)</label>
              <input type="text" className="calc-input" value={notes} onChange={e=>setNotes(e.target.value)} style={inputStyle} placeholder="50 lit Dies..."/>
            </div>
          </div>
        </div>

        {/* ── DOWNWARD FLOW CONNECTOR ── */}
        <div className="no-print" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          margin: '4px 0',
          position: 'relative'
        }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(251,197,24,0.3), rgba(251,197,24,0.5))' }} />
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 22px',
            borderRadius: 99,
            background: 'rgba(251,197,24,0.14)',
            border: '1px solid rgba(251,197,24,0.4)',
            color: '#FBC518',
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: 0.6,
            boxShadow: '0 4px 20px rgba(251,197,24,0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            <span>Generated Live Bill Below</span>
            <ArrowDown size={15} style={{ animation: 'bounceDown 1.5s infinite' }} />
          </div>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(251,197,24,0.5), rgba(251,197,24,0.3), transparent)' }} />
        </div>

        {/* ── STEP 2: LIVE RECEIPT PREVIEW (FLOW DOWN) ── */}
        <div style={{ display:'flex', flexDirection:'column', animation:'fadeUp 0.6s ease 0.5s both', width:'100%', minWidth: 0 }}>
          <div className="no-print" style={{ 
            background:'rgba(18,18,18,0.88)', 
            border:'1px solid rgba(251,197,24,0.2)', 
            borderRadius:24, 
            padding:'24px', 
            marginBottom:20,
            display:'flex',
            flexDirection:'column',
            gap:16,
            backdropFilter:'blur(16px)'
          }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
              <div>
                <span style={{ fontSize:11, fontWeight:800, color:'#FBC518', textTransform:'uppercase', letterSpacing:1.2 }}>
                  Step 2 &bull; Instant Output
                </span>
                <h2 style={{ fontSize:18, fontWeight:800, color:'#fff', display:'flex', alignItems:'center', gap:8, margin:'4px 0 0' }}>
                  <Receipt size={20} color="#FBC518"/> Live Bill Preview
                </h2>
              </div>

              {/* Quick totals summary badges */}
              <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                <div style={{ background:'rgba(251,197,24,0.12)', border:'1px solid rgba(251,197,24,0.35)', borderRadius:12, padding:'6px 14px', textAlign:'right' }}>
                  <div style={{ fontSize:10, color:'rgba(255,255,255,0.5)', fontWeight:600 }}>Total Hours</div>
                  <div style={{ fontSize:14, fontWeight:800, color:'#FBC518' }}>{grandTotalHour.toFixed(2)}h</div>
                </div>
                <div style={{ background:'rgba(251,197,24,0.15)', border:'1px solid rgba(251,197,24,0.45)', borderRadius:12, padding:'6px 14px', textAlign:'right' }}>
                  <div style={{ fontSize:10, color:'rgba(255,255,255,0.5)', fontWeight:600 }}>Grand Total</div>
                  <div style={{ fontSize:14, fontWeight:800, color:'#FBC518' }}>₹{grandTotal.toLocaleString('en-IN')}</div>
                </div>
                <div style={{ background:'rgba(34,197,94,0.1)', border:'1px solid rgba(34,197,94,0.25)', borderRadius:12, padding:'6px 14px', textAlign:'right' }}>
                  <div style={{ fontSize:10, color:'rgba(255,255,255,0.5)', fontWeight:600 }}>Balance Due</div>
                  <div style={{ fontSize:14, fontWeight:800, color:'#4ade80' }}>₹{balance.toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>

            <div className="preview-actions-grid">
              <button onClick={handleSave} style={{ background:'rgba(34,197,94,0.15)', color:'#4ade80', border:'1px solid rgba(34,197,94,0.3)', borderRadius:12, padding:'11px', fontSize:13, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, transition:'all 0.2s' }}>
                <CheckCircle size={16}/> Save to Server
              </button>
              <button onClick={handlePrint} style={{ background:'rgba(255,255,255,0.06)', color:'#fff', border:'1px solid rgba(255,255,255,0.12)', borderRadius:12, padding:'11px', fontSize:13, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
                <Printer size={16}/> Print Bill
              </button>
              <button onClick={handleDownloadPDF} disabled={isDownloadingPdf} style={{ background:'linear-gradient(135deg, #FBC518 0%, #d49e05 100%)', color:'#000', border:'none', borderRadius:12, padding:'11px', fontSize:13, fontWeight:800, cursor: isDownloadingPdf ? 'not-allowed' : 'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6, boxShadow:'0 4px 14px rgba(251,197,24,0.35)' }}>
                <Download size={16}/> {isDownloadingPdf ? 'Creating PDF...' : 'Download PDF'}
              </button>
              <button onClick={handleDownloadImage} disabled={isDownloadingImage} style={{ background:'linear-gradient(135deg, #FBC518 0%, #d49e05 100%)', color:'#000', border:'none', borderRadius:12, padding:'11px', fontSize:13, fontWeight:800, cursor: isDownloadingImage ? 'not-allowed' : 'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6, boxShadow:'0 4px 12px rgba(251,197,24,0.35)' }}>
                <FileText size={16}/> {isDownloadingImage ? 'Creating PNG...' : 'Download Image'}
              </button>
            </div>
          </div>
          
          {/* THE ACTUAL RECEIPT TO PRINT (SCROLLABLE ON MOBILE) */}
          <div className="receipt-scroll-wrapper">
            <div id="printable-receipt" style={{ 
              background:'#fff', color:'#000', borderRadius:12, padding:'30px', 
              fontFamily:'Arial, sans-serif', boxShadow:'0 20px 40px rgba(0,0,0,0.4)',
              width:'550px', minWidth: '550px', margin:'0 auto'
            }}>
              {/* Header section matching the physical sheet */}
              <div style={{ textAlign:'center', borderBottom:'2px solid #000', paddingBottom:10, marginBottom:16, position:'relative' }}>
                <div style={{ fontSize:10, fontWeight:'bold', marginBottom:4 }}>Sri PeriyaPachiamman Thunai</div>
                <div style={{ position:'absolute', top:0, right:0, fontSize:11, fontWeight:'bold', textAlign:'right', lineHeight:1.2 }}>
                  📞 98655 74700<br/>98421 40010
                </div>
                {/* Logo section with img src and text fallback */}
                <div style={{ position:'absolute', top:4, left:0, width:40, height:40, display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
                  <img 
                    src="/logo.png" 
                    alt="Logo" 
                    style={{ width:'100%', height:'100%', objectFit:'contain' }} 
                    onError={e => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div style="border:1px solid #ccc; width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-size:8px; color:#888;">LOGO</div>';
                    }}
                  />
                </div>
              <h1 style={{ fontSize:24, fontWeight:900, color:'#1e3a8a', margin:'8px 0 2px', letterSpacing:1, fontFamily:'Impact, sans-serif' }}>
                SRI BALAJI EARTH MOVERS
              </h1>
              <div style={{ fontSize:14, fontWeight:'bold', letterSpacing:0.5 }}>SANKAGIRI - 637 301.</div>
            </div>

            {/* Meta info */}
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:14, fontWeight:'bold', marginBottom:16 }}>
              <div>No : <span style={{ fontSize:18, marginLeft:8 }}>{billNo || '____'}</span></div>
              <div>Date. <span style={{ textDecoration:'underline', textDecorationThickness:2 }}>{date ? new Date(date).toLocaleDateString('en-GB') : '___/___/_____'}</span></div>
            </div>

            <div style={{ fontSize:15, fontWeight:'bold', marginBottom:16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                Party Address <span style={{ borderBottom:'1px dashed #000', paddingBottom:2, minWidth:180, display:'inline-block' }}>{partyAddress || '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}</span>
              </div>
              <div>
                Phone <span style={{ borderBottom:'1px dashed #000', paddingBottom:2, minWidth:120, display:'inline-block' }}>{mobilePhone || '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}</span>
              </div>
            </div>

            {/* Table */}
            <table style={{ width:'100%', borderCollapse:'collapse', marginBottom:16 }}>
              <thead>
                <tr style={{ borderBottom:'2px solid #000', borderTop:'1px solid #000' }}>
                  <th style={{ textAlign:'center', padding:'8px 4px', fontSize:13 }}>Starting Reading</th>
                  <th style={{ textAlign:'center', padding:'8px 4px', fontSize:13 }}>Closing Reading</th>
                  <th style={{ textAlign:'center', padding:'8px 4px', fontSize:13 }}>Total Hour</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i}>
                    <td style={{ textAlign:'center', padding:'10px 4px', borderBottom:'1px dashed #ccc', fontSize:16, fontWeight:'bold', color:'#1e3a8a' }}>{row.startReading || '\u00A0'}</td>
                    <td style={{ textAlign:'center', padding:'10px 4px', borderBottom:'1px dashed #ccc', fontSize:16, fontWeight:'bold', color:'#1e3a8a' }}>{row.closeReading || '\u00A0'}</td>
                    <td style={{ textAlign:'center', padding:'10px 4px', borderBottom:'1px dashed #ccc', fontSize:16, fontWeight:'bold', color:'#1e3a8a' }}>{row.totalHour || '\u00A0'}</td>
                  </tr>
                ))}
                {/* Empty rows to match physical look */}
                {rows.length < 3 && Array(3 - rows.length).fill().map((_, i) => (
                  <tr key={'empty'+i}>
                    <td style={{ textAlign:'center', padding:'14px 4px', borderBottom:'1px dashed #ccc' }}></td>
                    <td style={{ textAlign:'center', padding:'14px 4px', borderBottom:'1px dashed #ccc' }}></td>
                    <td style={{ textAlign:'center', padding:'14px 4px', borderBottom:'1px dashed #ccc' }}></td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Calculation string (e.g. 7.70 x 950 - 7315) */}
            <div style={{ fontSize:18, fontWeight:'bold', color:'#1e3a8a', padding:'10px 0', borderBottom:'1px solid #eee', marginBottom:20 }}>
              {grandTotalHour > 0 ? `${grandTotalHour.toFixed(2)} x ${hourlyRate} = ${totalAmountBase.toFixed(0)}` : '\u00A0'}
            </div>

            {/* Bottom summary */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', paddingBottom:40 }}>
              <div style={{ width:'40%', fontSize:14, fontWeight:'bold', color:'#1e3a8a', textDecoration:'underline' }}>
                {notes}
              </div>
              <div style={{ width:'55%' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12, fontSize:15 }}>
                  <span style={{ fontWeight:'normal' }}>Total</span>
                  <span style={{ fontWeight:'bold', borderBottom:'1px dashed #000', minWidth:80, textAlign:'right' }}>: {totalAmountBase.toFixed(0)}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12, fontSize:15 }}>
                  <span style={{ fontWeight:'normal' }}>Operator Beta</span>
                  <span style={{ fontWeight:'bold', borderBottom:'1px dashed #000', minWidth:80, textAlign:'right' }}>: {operatorBeta}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12, fontSize:16 }}>
                  <span style={{ fontWeight:'bold' }}>Total Amount</span>
                  <span style={{ fontWeight:'bold', color:'#1e3a8a', borderBottom:'1px dashed #000', minWidth:80, textAlign:'right' }}>: {grandTotal.toFixed(0)}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12, fontSize:15 }}>
                  <span style={{ fontWeight:'normal' }}>Advance</span>
                  <span style={{ fontWeight:'bold', borderBottom:'1px dashed #000', minWidth:80, textAlign:'right' }}>: {advance || ''}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12, fontSize:15 }}>
                  <span style={{ fontWeight:'normal' }}>Balance</span>
                  <span style={{ fontWeight:'bold', borderBottom:'1px dashed #000', minWidth:80, textAlign:'right' }}>: {balance.toFixed(0)}</span>
                </div>
              </div>
            </div>

            {/* Signatures */}
            <div style={{ display:'flex', justifyContent:'space-between', marginTop:30, fontSize:14, fontWeight:'bold' }}>
              <div>Party Signature</div>
              <div>Operator Signature</div>
            </div>

          </div>
        </div>
        </div>

      </main>
    </div>
  );
}
