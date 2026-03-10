// ─── SCREEN MODEL ─────────────────────────────────────────────────────────────
const mongoose = require('mongoose');

const screenSchema = new mongoose.Schema({
  name:  { type: String, required: true, trim: true },
  type:  { type: String, required: true, enum: ['IMAX','Dolby Atmos','4DX','Standard'] },
  seats: { type: Number, required: true, min: 1 },
}, { timestamps: true });

module.exports = mongoose.model('Screen', screenSchema);
