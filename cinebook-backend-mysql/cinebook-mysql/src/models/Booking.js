// ─── BOOKING MODEL ────────────────────────────────────────────────────────────
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  ref:          { type: String, unique: true },
  customerName: { type: String, required: true, trim: true },
  phone:        { type: String, required: true },
  address:      { type: String, default: '' },
  movieId:      { type: mongoose.Schema.Types.ObjectId, ref: 'Movie',  required: true },
  screenId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Screen', required: true },
  date:         { type: String, required: true },
  time:         { type: String, required: true },
  seats:        [{ type: String }],
}, { timestamps: true });

bookingSchema.pre('validate', function(next) {
  if (!this.ref) {
    this.ref = 'CB-' + Date.now().toString(36).toUpperCase() +
               Math.random().toString(36).substr(2, 4).toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
