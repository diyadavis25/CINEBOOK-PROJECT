// ─── BOOKING CONTROLLER (MySQL) ───────────────────────────────────────────────
const db = require('../config/db');

function genRef() {
  return 'CB-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2,4).toUpperCase();
}

function fmtBooking(row) {
  return {
    ...row,
    _id:   row.id,
    seats: typeof row.seats === 'string' ? JSON.parse(row.seats) : row.seats,
  };
}

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT b.*, m.name as movie_name, sc.name as screen_name, sc.type as screen_type
      FROM bookings b
      LEFT JOIN shows  s  ON b.show_id   = s.id
      LEFT JOIN movies m  ON s.movie_id  = m.id
      LEFT JOIN screens sc ON s.screen_id = sc.id
      ORDER BY b.created_at DESC
    `);
    res.json(rows.map(fmtBooking));
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM bookings WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Booking not found' });
    res.json(fmtBooking(rows[0]));
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const { customerName, phone, address, movieId, screenId, date, time, seats } = req.body;
    if (!customerName || !phone || !movieId || !screenId || !date || !time || !seats?.length)
      return res.status(400).json({ error: 'Missing required booking fields' });

    // Find or create show
    let [shows] = await db.query('SELECT id FROM shows WHERE movie_id=? AND screen_id=? AND date=? AND time=?', [movieId, screenId, date, time]);
    let showId;
    if (shows.length) {
      showId = shows[0].id;
    } else {
      await db.query('INSERT INTO shows (id, movie_id, screen_id, date, time) VALUES (UUID(), ?, ?, ?, ?)', [movieId, screenId, date, time]);
      [shows] = await db.query('SELECT id FROM shows ORDER BY created_at DESC LIMIT 1');
      showId = shows[0].id;
    }

    const ref = genRef();
    await db.query(
      'INSERT INTO bookings (id, ref, show_id, customer_name, phone, address, seats, seat_count) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?)',
      [ref, showId, customerName, phone, address || '', JSON.stringify(seats), seats.length]
    );
    const [rows] = await db.query('SELECT * FROM bookings ORDER BY created_at DESC LIMIT 1');
    res.status(201).json(fmtBooking(rows[0]));
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.cancel = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM bookings WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ error: 'Booking not found' });
    res.json({ message: 'Booking cancelled' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
