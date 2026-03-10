// ─── SCREEN CONTROLLER ───────────────────────────────────────────────────────
const Screen = require('../models/Screen');

exports.getAll = async (req, res) => {
  const screens = await Screen.find().sort({ name: 1 });
  res.json({ success: true, data: screens });
};

exports.getById = async (req, res) => {
  const screen = await Screen.findById(req.params.id);
  if (!screen) return res.status(404).json({ success: false, message: 'Screen not found' });
  res.json({ success: true, data: screen });
};

exports.create = async (req, res) => {
  const screen = await Screen.create(req.body);
  res.status(201).json({ success: true, data: screen });
};

exports.update = async (req, res) => {
  const screen = await Screen.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!screen) return res.status(404).json({ success: false, message: 'Screen not found' });
  res.json({ success: true, data: screen });
};

exports.remove = async (req, res) => {
  const screen = await Screen.findByIdAndDelete(req.params.id);
  if (!screen) return res.status(404).json({ success: false, message: 'Screen not found' });
  res.json({ success: true, message: 'Screen deleted' });
};
