// ─── MOVIE CONTROLLER ────────────────────────────────────────────────────────
const Movie = require('../models/Movie');

// GET /api/movies
exports.getAll = async (req, res) => {
  const movies = await Movie.find().sort({ createdAt: -1 });
  res.json({ success: true, data: movies });
};

// GET /api/movies/:id
exports.getById = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).json({ success: false, message: 'Movie not found' });
  res.json({ success: true, data: movie });
};

// POST /api/movies   (admin)
exports.create = async (req, res) => {
  const movie = await Movie.create(req.body);
  res.status(201).json({ success: true, data: movie });
};

// PUT /api/movies/:id   (admin)
exports.update = async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!movie) return res.status(404).json({ success: false, message: 'Movie not found' });
  res.json({ success: true, data: movie });
};

// DELETE /api/movies/:id   (admin)
exports.remove = async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) return res.status(404).json({ success: false, message: 'Movie not found' });
  res.json({ success: true, message: 'Movie deleted' });
};
