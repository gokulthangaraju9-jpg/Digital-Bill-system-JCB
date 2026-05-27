import express from 'express';
import cors from 'cors';
import { createClient } from 'redis';

const app = express();
app.use(cors());
app.use(express.json());

const redisClient = createClient({
  url: 'redis://default:Z3RgJ4KGMnSnPUFokG8wqshhyuvgpArC@cognac-artsy-tender-32793.db.redis.io:18801'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

await redisClient.connect();
console.log('Connected to Redis');

// Root endpoint to handle browser requests and guide users to the frontend
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>JCB Platform API Server</title>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Outfit', sans-serif;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #0b0f19 0%, #111827 50%, #1e1b4b 100%);
            color: #f3f4f6;
            text-align: center;
            padding: 20px;
            overflow: hidden;
            position: relative;
          }
          /* Subtle ambient lighting */
          body::before {
            content: '';
            position: absolute;
            width: 300px;
            height: 300px;
            background: #ffcc00;
            filter: blur(150px);
            opacity: 0.15;
            top: 20%;
            left: 30%;
            border-radius: 50%;
            pointer-events: none;
          }
          body::after {
            content: '';
            position: absolute;
            width: 400px;
            height: 400px;
            background: #4f46e5;
            filter: blur(180px);
            opacity: 0.12;
            bottom: 10%;
            right: 20%;
            border-radius: 50%;
            pointer-events: none;
          }
          .card {
            background: rgba(30, 41, 59, 0.45);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 24px;
            padding: 40px 30px;
            max-width: 550px;
            width: 100%;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            transform: translateY(0);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
            z-index: 10;
          }
          .card:hover {
            transform: translateY(-5px);
            border-color: rgba(255, 204, 0, 0.3);
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 204, 0, 0.05);
          }
          .badge {
            background: rgba(255, 204, 0, 0.1);
            color: #ffcc00;
            border: 1px solid rgba(255, 204, 0, 0.2);
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            display: inline-block;
            margin-bottom: 20px;
            letter-spacing: 0.05em;
            text-transform: uppercase;
          }
          h1 {
            font-size: 2.2rem;
            font-weight: 800;
            margin-bottom: 16px;
            background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #ffcc00 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            line-height: 1.2;
          }
          p {
            font-size: 1.05rem;
            color: #94a3b8;
            line-height: 1.6;
            margin-bottom: 32px;
            font-weight: 300;
          }
          .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #ffcc00 0%, #e6b800 100%);
            color: #0b0f19;
            text-decoration: none;
            font-weight: 600;
            font-size: 1rem;
            padding: 14px 28px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(255, 204, 0, 0.25);
            transition: all 0.3s ease;
          }
          .btn:hover {
            transform: scale(1.02);
            box-shadow: 0 6px 20px rgba(255, 204, 0, 0.4);
            background: linear-gradient(135deg, #ffd633 0%, #ffcc00 100%);
          }
          .footer {
            margin-top: 24px;
            font-size: 0.75rem;
            color: #64748b;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <span class="badge">API Status: Running</span>
          <h1>JCB API Backend Server</h1>
          <p>The backend server is operating normally. To interact with the JCB Platform user interface, please navigate to the client application.</p>
          <a href="http://localhost:5173" class="btn">Launch Frontend Client (Port 5173)</a>
          <div class="footer">JCB Platform &bull; Dev Mode Server</div>
        </div>
      </body>
    </html>
  `);
});

// Endpoint to save a calculation
app.post('/api/calculations', async (req, res) => {
  try {
    const { id, ...data } = req.body;
    const calcId = id || Date.now().toString();
    const calculation = { id: calcId, ...data, timestamp: new Date().toISOString() };

    await redisClient.hSet('calculations', calcId, JSON.stringify(calculation));

    res.status(201).json({ success: true, calculation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save calculation' });
  }
});

// Endpoint to save a booking
app.post('/api/bookings', async (req, res) => {
  try {
    const { id, ...data } = req.body;
    const bookingId = id || Date.now().toString();
    const booking = { id: bookingId, ...data, timestamp: new Date().toISOString(), status: 'Pending' };

    await redisClient.hSet('bookings', bookingId, JSON.stringify(booking));

    res.status(201).json({ success: true, booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save booking' });
  }
});

// Endpoint to retrieve all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const bookingsObj = await redisClient.hGetAll('bookings');
    const bookings = Object.values(bookingsObj).map(val => JSON.parse(val));
    bookings.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve bookings' });
  }
});

// Endpoint to save a machine
app.post('/api/machines', async (req, res) => {
  try {
    const { id, ...data } = req.body;
    const machineId = id || `JCB-${Math.floor(100 + Math.random() * 900)}`;
    const machine = { id: machineId, ...data };

    await redisClient.hSet('machines', machineId, JSON.stringify(machine));

    res.status(201).json({ success: true, machine });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save machine' });
  }
});

// Endpoint to retrieve all machines
app.get('/api/machines', async (req, res) => {
  try {
    const machinesObj = await redisClient.hGetAll('machines');
    const machines = Object.values(machinesObj).map(val => JSON.parse(val));
    // If no machines, return some defaults for first-time use
    if (machines.length === 0) {
      const defaults = [
        { id: 'JCB-001', model: '3DX Super', status: 'Available', type: 'Backhoe Loader' },
        { id: 'JCB-002', model: '4DX', status: 'In Service', type: 'Backhoe Loader' },
        { id: 'JCB-003', model: '215LS', status: 'Available', type: 'Skid Steer' },
      ];
      return res.status(200).json(defaults);
    }
    res.status(200).json(machines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve machines' });
  }
});

// Endpoint to delete a machine
app.delete('/api/machines/:id', async (req, res) => {
  try {
    await redisClient.hDel('machines', req.params.id);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete machine' });
  }
});

// Endpoint for admin dashboard stats
app.get('/api/admin/stats', async (req, res) => {
  try {
    const [bookingsObj, machinesObj] = await Promise.all([
      redisClient.hGetAll('bookings'),
      redisClient.hGetAll('machines')
    ]);

    const bookings = Object.values(bookingsObj).map(val => JSON.parse(val));
    const machines = Object.values(machinesObj).map(val => JSON.parse(val));

    res.status(200).json({
      totalUsers: 1284, // Mock for now
      activeFleet: machines.length || 3,
      pendingBookings: bookings.filter(b => b.status === 'Pending').length,
      securityAlerts: 0
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve stats' });
  }
});

// Endpoint to retrieve all calculations
app.get('/api/calculations', async (req, res) => {
  try {
    const calculationsObj = await redisClient.hGetAll('calculations');
    const calculations = Object.values(calculationsObj).map(val => JSON.parse(val));
    calculations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    res.status(200).json(calculations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve calculations' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
