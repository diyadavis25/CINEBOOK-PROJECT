// ─── MOVIE MODEL ──────────────────────────────────────────────────────────────
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  description: { type: String, required: true },
  cast:        { type: String, required: true },
  poster:      { type: String, default: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&q=80' },
  genre:       { type: String, default: 'Drama', enum: ['Action','Drama','Sci-Fi','Thriller','Comedy','Horror','Fantasy','Romance'] },
  duration:    { type: String, default: '' },
  rating:      { type: String, default: 'PG-13', enum: ['G','PG','PG-13','R','NC-17'] },
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
