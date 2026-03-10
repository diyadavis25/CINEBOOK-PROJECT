// ─── SHOW MODEL ──────────────────────────────────────────────────────────────
const mongoose = require('mongoose');

const showSchema = new mongoose.Schema(
  {
    movieId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Movie',  required: true },
    screenId: { type: mongoose.Schema.Types.ObjectId, ref: 'Screen', required: true },
    date:     { type: String, required: [true, 'Date is required'] },   // "YYYY-MM-DD"
    time:     { type: String, required: [true, 'Time is required'] },   // "HH:MM"
  },
  { timestamps: true }
);

// A screen can only have one show at a given date+time
showSchema.index({ screenId: 1, date: 1, time: 1 }, { unique: true });

module.exports = mongoose.model('Show', showSchema);
