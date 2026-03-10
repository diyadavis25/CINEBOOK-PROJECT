// ─── SCREEN CONTROLLER (MySQL) ────────────────────────────────────────────────
const db = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM screens WHERE is_active = 1 ORDER BY name ASC');
    res.json(rows.map(fmt));
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM screens WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Screen not found' });
    res.json(fmt(rows[0]));
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const { name, type, seats } = req.body;
    if (!name || !type || !seats) return res.status(400).json({ error: 'name, type, seats are required' });
    await db.query('INSERT INTO screens (id, name, type, seats) VALUES (UUID(), ?, ?, ?)', [name, type, seats]);
    const [rows] = await db.query('SELECT * FROM screens ORDER BY created_at DESC LIMIT 1');
    res.status(201).json(fmt(rows[0]));
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const { name, type, seats } = req.body;
    await db.query('UPDATE screens SET name=?, type=?, seats=?, updated_at=NOW() WHERE id=?', [name, type, seats, req.params.id]);
    const [rows] = await db.query('SELECT * FROM screens WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Screen not found' });
    res.json(fmt(rows[0]));
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM screens WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ error: 'Screen not found' });
    res.json({ message: 'Screen deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

function fmt(row) { return { ...row, _id: row.id }; }
