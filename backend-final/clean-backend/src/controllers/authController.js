// ─── AUTH CONTROLLER ──────────────────────────────────────────────────────────
const jwt = require('jsonwebtoken');
const SECRET     = process.env.JWT_SECRET     || 'cinebook_secret';
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'Admin@123';

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (username !== 'admin' || password !== ADMIN_PASS)
    return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ username: 'admin', role: 'admin' }, SECRET, { expiresIn: EXPIRES_IN });
  res.json({ token, user: { username: 'admin', role: 'admin' } });
};
