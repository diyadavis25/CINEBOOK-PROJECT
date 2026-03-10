// ─── CINEBOOK SERVER (MySQL) ───────────────────────────────────────────────────
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const pool    = require('./config/db');

const movieRoutes   = require('./routes/movies');
const screenRoutes  = require('./routes/screens');
const showRoutes    = require('./routes/shows');
const bookingRoutes = require('./routes/bookings');
const authRoutes    = require('./routes/auth');

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api/movies',   movieRoutes);
app.use('/api/screens',  screenRoutes);
app.use('/api/shows',    showRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth',     authRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date() }));

app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

// Test DB then start
pool.getConnection()
  .then(conn => {
    conn.release();
    console.log('✅  MySQL connected');
    app.listen(PORT, () => console.log(`🚀  CineBook API running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('❌  MySQL connection failed:', err.message);
    process.exit(1);
  });
