// ─── MOVIE MODEL ─────────────────────────────────────────────────────────────
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    name:        { type: String, required: [true, 'Movie name is required'], trim: true },
    description: { type: String, required: [true, 'Description is required'] },
    cast:        { type: String, default: '' },
    poster:      { type: String, default: '' },
    genre:       { type: String, default: 'General' },
    duration:    { type: String, default: '' },
    rating:      { type: String, default: 'U' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Movie', movieSchema);
