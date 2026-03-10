// ─── AUTH CONTROLLER ─────────────────────────────────────────────────────────
const jwt  = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (user) =>
  jwt.sign({ id: user._id, username: user.username, role: user.role },
           process.env.JWT_SECRET,
           { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

// POST /api/auth/login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ success: false, message: 'Username and password required' });

  const user = await User.findOne({ username });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ success: false, message: 'Invalid credentials' });

  const token = signToken(user);
  res.json({ success: true, token, user: { id: user._id, username: user.username, role: user.role } });
};
