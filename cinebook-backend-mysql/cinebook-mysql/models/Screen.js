// ─── SCREEN MODEL ────────────────────────────────────────────────────────────
const mongoose = require('mongoose');

const SCREEN_TYPES = ['IMAX', 'Dolby Atmos', '4DX', 'Standard'];

const screenSchema = new mongoose.Schema(
  {
    name:  { type: String, required: [true, 'Screen name is required'], trim: true, unique: true },
    type:  { type: String, enum: SCREEN_TYPES, required: [true, 'Screen type is required'] },
    seats: { type: Number, required: [true, 'Seat count is required'], min: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Screen', screenSchema);
