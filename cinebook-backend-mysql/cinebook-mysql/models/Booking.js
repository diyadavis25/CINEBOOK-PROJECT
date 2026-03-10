// ─── BOOKING MODEL ───────────────────────────────────────────────────────────
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    ref:          { type: String, required: true, unique: true },
    customerName: { type: String, required: [true, 'Customer name is required'] },
    phone:        { type: String, required: [true, 'Phone is required'] },
    address:      { type: String, default: '' },
    movieId:      { type: mongoose.Schema.Types.ObjectId, ref: 'Movie',  required: true },
    screenId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Screen', required: true },
    date:         { type: String, required: true },
    time:         { type: String, required: true },
    seats:        { type: [String], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
