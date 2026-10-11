import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Truck, Calendar, ShieldCheck, 
  Settings, ArrowLeft, BarChart3, AlertCircle,
  Plus, Edit, Trash2, MessageSquare
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = React.useState({
    totalUsers: '1,284',
    activeFleet: '0',
    pendingBookings: '0',
    securityAlerts: '0'
  });
  const [machines, setMachines] = React.useState([]);
  const [activity, setActivity] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, machinesRes, activityRes, inquiriesRes] = await Promise.all([
          fetch('http://localhost:5000/api/admin/stats'),
          fetch('http://localhost:5000/api/machines'),
          fetch('http://localhost:5000/api/bookings'),
          fetch('http://localhost:5000/api/inquiries').catch(() => ({ ok: false }))
        ]);

        if (statsRes.ok) setStats(await statsRes.json());
        if (machinesRes.ok) setMachines(await machinesRes.json());

        const allActivities = [];
        if (activityRes.ok) {
          const bookings = await activityRes.json();
          allActivities.push(...bookings.map(b => ({
            event: 'Booking: ' + (b.machineModel || 'JCB Machine'),
            user: b.siteLocation || 'Site Booking',
            rawTime: new Date(b.timestamp),
            time: new Date(b.timestamp).toLocaleTimeString()
          })));
        }

        if (inquiriesRes && inquiriesRes.ok) {
          const inquiries = await inquiriesRes.json();
          allActivities.push(...inquiries.map(inq => ({
            event: 'Inquiry: ' + inq.name + ' (' + inq.phone + ')',
            user: inq.message,
            rawTime: new Date(inq.timestamp),
            time: new Date(inq.timestamp).toLocaleTimeString()
          })));
        }

        allActivities.sort((a, b) => b.rawTime - a.rawTime);
        setActivity(allActivities.slice(0, 6));
      } catch (err) {
        console.error('Failed to fetch admin data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddMachine = async () => {
    const model = prompt('Enter Machine Model:');
    if (!model) return;
    const type = prompt('Enter Machine Type:', 'Backhoe Loader');
    
    try {
      const res = await fetch('http://localhost:5000/api/machines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, type, status: 'Available' })
      });
      if (res.ok) {
        const { machine } = await res.json();
        setMachines([machine, ...machines]);
      }
    } catch (err) {
      alert('Error adding machine');
    }
  };

  const handleDeleteMachine = async (id) => {
    if (!confirm('Are you sure you want to delete this machine?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/machines/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setMachines(machines.filter(m => m.id !== id));
      }
    } catch (err) {
      alert('Error deleting machine');
    }
  };

  const kpis = [
    { label: 'Project Inquiries', value: stats.totalInquiries ?? '0', icon: <MessageSquare size={20} />, color: '#ec4899' },
    { label: 'Active Fleet', value: stats.activeFleet, icon: <Truck size={20} />, color: '#FBC518' },
    { label: 'Pending Bookings', value: stats.pendingBookings, icon: <Calendar size={20} />, color: '#22c55e' },
    { label: 'Total Clients', value: stats.totalUsers, icon: <Users size={20} />, color: '#3b82f6' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#fff',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Admin Sidebar/Header */}
      <div style={{
        padding: '24px 32px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(0,0,0,0.3)',
        backdropFilter: 'blur(10px)',
        position: 'sticky', top: 0, zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button 
            onClick={() => navigate('/intro')}
            style={{ 
              background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', 
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
              fontSize: 14, fontWeight: 500
            }}
          >
            <ArrowLeft size={18} /> Back to App
          </button>
          <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.1)' }} />
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Admin Control Panel</h1>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>System Status</div>
            <div style={{ fontSize: 11, color: '#22c55e', display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} /> All Systems Operational
            </div>
          </div>
        </div>
      </div>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 32px' }}>
        
        {/* KPI Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 20,
          marginBottom: 48
        }}>
          {kpis.map(kpi => (
            <div key={kpi.label} style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 20,
              padding: '24px',
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: kpi.color + '15',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: kpi.color, marginBottom: 16
              }}>{kpi.icon}</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>{kpi.label}</div>
              <div style={{ fontSize: 28, fontWeight: 800 }}>{kpi.value}</div>
            </div>
          ))}
        </div>

        {/* Management Sections */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: 32
        }}>
          
          {/* Machine Management */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Truck size={22} color="var(--brand)" /> Fleet Management
              </h2>
              <button 
                onClick={handleAddMachine}
                style={{ 
                background: 'var(--brand)', color: '#000', border: 'none', 
                padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 700,
                display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer'
              }}>
                <Plus size={16} /> Add Machine
              </button>
            </div>
            
            <div style={{ 
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', 
              borderRadius: 20, overflow: 'hidden' 
            }}>
              {machines.map((m, idx) => (
                <div key={m.id} style={{ 
                  padding: '16px 24px', 
                  borderBottom: idx === machines.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.05)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{m.model}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{m.id} • {m.type}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <span style={{ 
                      fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
                      color: m.status === 'Available' ? '#22c55e' : '#f59e0b',
                      background: (m.status === 'Available' ? '#22c55e' : '#f59e0b') + '15',
                      padding: '4px 8px', borderRadius: 4
                    }}>{m.status}</span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}><Edit size={16} /></button>
                      <button 
                        onClick={() => handleDeleteMachine(m.id)}
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {machines.length === 0 && (
                <div style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
                  No machines found.
                </div>
              )}
            </div>
          </section>

          {/* System Logs */}
          <section>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
              <BarChart3 size={22} color="#3b82f6" /> Recent Activity
            </h2>
            <div style={{ 
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', 
              borderRadius: 20, padding: '24px'
            }}>
              {activity.map((log, idx) => (
                <div key={idx} style={{ 
                  display: 'flex', gap: 16, marginBottom: idx === activity.length - 1 ? 0 : 20,
                  borderLeft: '2px solid rgba(255,255,255,0.05)', paddingLeft: 16
                }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{log.event}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Location: {log.user}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{log.time}</div>
                </div>
              ))}
              {activity.length === 0 && (
                <div style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
                  No recent activity.
                </div>
              )}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

