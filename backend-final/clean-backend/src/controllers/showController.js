// ─── SHOW CONTROLLER (MySQL) ──────────────────────────────────────────────────
const db = require('../config/db');

const SHOW_QUERY = `
  SELECT s.*, s.id as _id,
    m.id as movieId, m.name as movie_name, m.genre, m.poster, m.duration, m.rating,
    sc.id as screenId, sc.name as screen_name, sc.type as screen_type, sc.seats as screen_seats
  FROM shows s
  JOIN movies  m  ON s.movie_id  = m.id
  JOIN screens sc ON s.screen_id = sc.id
`;

function fmtShow(row) {
  return {
    _id:      row.id,
    id:       row.id,
    movieId:  row.movieId,
    screenId: row.screenId,
    date:     row.date,
    time:     row.time,
    movie:  { _id: row.movieId,  name: row.movie_name,  genre: row.genre, poster: row.poster, duration: row.duration, rating: row.rating },
    screen: { _id: row.screenId, name: row.screen_name, type: row.screen_type, seats: row.screen_seats },
  };
}

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query(SHOW_QUERY + ' ORDER BY s.date ASC, s.time ASC');
    res.json(rows.map(fmtShow));
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query(SHOW_QUERY + ' WHERE s.id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Show not found' });
    res.json(fmtShow(rows[0]));
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const { movieId, screenId, date, time } = req.body;
    if (!movieId || !screenId || !date || !time) return res.status(400).json({ error: 'movieId, screenId, date, time are required' });
    await db.query('INSERT INTO shows (id, movie_id, screen_id, date, time) VALUES (UUID(), ?, ?, ?, ?)', [movieId, screenId, date, time]);
    const [rows] = await db.query(SHOW_QUERY + ' ORDER BY s.created_at DESC LIMIT 1');
    res.status(201).json(fmtShow(rows[0]));
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const { movieId, screenId, date, time } = req.body;
    await db.query('UPDATE shows SET movie_id=?, screen_id=?, date=?, time=?, updated_at=NOW() WHERE id=?', [movieId, screenId, date, time, req.params.id]);
    const [rows] = await db.query(SHOW_QUERY + ' WHERE s.id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Show not found' });
    res.json(fmtShow(rows[0]));
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM shows WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ error: 'Show not found' });
    res.json({ message: 'Show deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
