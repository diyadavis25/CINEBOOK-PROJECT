// ─── CINEBOOK SERVER ──────────────────────────────────────────────────────────
require('dotenv').config();
require('express-async-errors');

const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const morgan     = require('morgan');
const rateLimit  = require('express-rate-limit');

const connectDB      = require('./config/db');
const errorHandler   = require('./middleware/errorHandler');

const authRoutes     = require('./routes/auth');
const movieRoutes    = require('./routes/movies');
const screenRoutes   = require('./routes/screens');
const showRoutes     = require('./routes/shows');
const bookingRoutes  = require('./routes/bookings');

// ── Connect database ──────────────────────────────────────────────────────────
connectDB();

const app = express();

// ── Security & utilities ──────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));
app.use(morgan('dev'));
app.use(express.json());

// ── Rate limiting ─────────────────────────────────────────────────────────────
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200, message: 'Too many requests, try again later.' });
app.use('/api', limiter);

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth',     authRoutes);
app.use('/api/movies',   movieRoutes);
app.use('/api/screens',  screenRoutes);
app.use('/api/shows',    showRoutes);
app.use('/api/bookings', bookingRoutes);

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

// ── Global error handler ──────────────────────────────────────────────────────
app.use(errorHandler);

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀  CineBook API running on http://localhost:${PORT}`));
