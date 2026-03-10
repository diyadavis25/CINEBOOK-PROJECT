// ─── SHOW MODEL ───────────────────────────────────────────────────────────────
const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  movieId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Movie',  required: true },
  screenId: { type: mongoose.Schema.Types.ObjectId, ref: 'Screen', required: true },
  date:     { type: String, required: true },
  time:     { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Show', showSchema);
