// ─── BOOKING CONTROLLER ──────────────────────────────────────────────────────
const Booking = require('../models/Booking');

// Booking ref generator matching the frontend helper
const generateRef = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let ref = 'CB-';
  for (let i = 0; i < 8; i++) ref += chars[Math.floor(Math.random() * chars.length)];
  return ref;
};

// GET /api/bookings   (admin)
exports.getAll = async (req, res) => {
  const bookings = await Booking.find()
    .populate('movieId',  'name')
    .populate('screenId', 'name type')
    .sort({ createdAt: -1 });
  res.json({ success: true, data: bookings });
};

// GET /api/bookings/:id   (admin or by ref query)
exports.getById = async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('movieId',  'name genre')
    .populate('screenId', 'name type');
  if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
  res.json({ success: true, data: booking });
};

// POST /api/bookings   (public)
exports.create = async (req, res) => {
  const { customerName, phone, address, movieId, screenId, date, time, seats } = req.body;

  if (!customerName || !phone || !movieId || !screenId || !date || !time || !seats?.length)
    return res.status(400).json({ success: false, message: 'Missing required booking fields' });

  // Check for seat conflicts on same show
  const conflict = await Booking.findOne({
    movieId, screenId, date, time,
    seats: { $in: seats },
  });
  if (conflict)
    return res.status(409).json({ success: false, message: 'One or more selected seats are already booked' });

  const booking = await Booking.create({
    ref: generateRef(),
    customerName, phone, address,
    movieId, screenId, date, time, seats,
  });

  res.status(201).json({ success: true, data: booking });
};

// DELETE /api/bookings/:id   (admin)
exports.cancel = async (req, res) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
  res.json({ success: true, message: 'Booking cancelled' });
};
