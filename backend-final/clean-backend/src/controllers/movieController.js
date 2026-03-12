// ─── MOVIE CONTROLLER (MySQL) ─────────────────────────────────────────────────
const db = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM movies WHERE is_active = 1 ORDER BY created_at DESC');
    res.json(rows.map(formatMovie));
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM movies WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Movie not found' });
    res.json(formatMovie(rows[0]));
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const { name, description, cast, poster, genre, duration, rating } = req.body;
    if (!name || !description || !cast) return res.status(400).json({ error: 'name, description, cast are required' });
    const [result] = await db.query(
      'INSERT INTO movies (id, name, description, cast, poster, genre, duration, rating) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?)',
      [name, description, cast, poster || '', genre || 'Drama', duration || '', rating || 'PG-13']
    );
    const [rows] = await db.query('SELECT * FROM movies WHERE id = (SELECT id FROM movies ORDER BY created_at DESC LIMIT 1)');
    res.status(201).json(formatMovie(rows[0]));
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const { name, description, cast, poster, genre, duration, rating } = req.body;
    await db.query(
      'UPDATE movies SET name=?, description=?, cast=?, poster=?, genre=?, duration=?, rating=?, updated_at=NOW() WHERE id=?',
      [name, description, cast, poster, genre, duration, rating, req.params.id]
    );
    const [rows] = await db.query('SELECT * FROM movies WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Movie not found' });
    res.json(formatMovie(rows[0]));
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM movies WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ error: 'Movie not found' });
    res.json({ message: 'Movie deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Format row to match frontend's expected shape (_id instead of id)
function formatMovie(row) {
  return { ...row, _id: row.id };
}
