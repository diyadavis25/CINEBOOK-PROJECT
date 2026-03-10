// ─── SHOW CONTROLLER ─────────────────────────────────────────────────────────
const Show = require('../models/Show');

exports.getAll = async (req, res) => {
  const shows = await Show.find()
    .populate('movieId',  'name genre poster duration rating')
    .populate('screenId', 'name type seats')
    .sort({ date: 1, time: 1 });
  res.json({ success: true, data: shows });
};

exports.getById = async (req, res) => {
  const show = await Show.findById(req.params.id)
    .populate('movieId',  'name genre poster duration rating')
    .populate('screenId', 'name type seats');
  if (!show) return res.status(404).json({ success: false, message: 'Show not found' });
  res.json({ success: true, data: show });
};

exports.create = async (req, res) => {
  const show = await Show.create(req.body);
  res.status(201).json({ success: true, data: show });
};

exports.update = async (req, res) => {
  const show = await Show.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!show) return res.status(404).json({ success: false, message: 'Show not found' });
  res.json({ success: true, data: show });
};

exports.remove = async (req, res) => {
  const show = await Show.findByIdAndDelete(req.params.id);
  if (!show) return res.status(404).json({ success: false, message: 'Show not found' });
  res.json({ success: true, message: 'Show deleted' });
};
