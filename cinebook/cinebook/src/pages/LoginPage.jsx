// ─── ADMIN LOGIN PAGE ─────────────────────────────────────────────────────────
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form,    setForm]    = useState({ username: '', password: '' });
  const [errors,  setErrors]  = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: '' }));
    setApiError('');
  };

  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = 'Username is required';
    if (!form.password.trim()) e.password = 'Password is required';
    return e;
  };

  const handleLogin = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setLoading(true);
    try {
      const res = await authAPI.login({ username: form.username, password: form.password });
      // Save token to localStorage
      localStorage.setItem('cinebook_token', res.data.token);
      localStorage.setItem('cinebook_user',  JSON.stringify(res.data.user));
      navigate('/admin');
    } catch (err) {
      setApiError(err.response?.data?.error || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  // Allow Enter key to submit
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* Logo */}
        <div className="login-logo">
          <span className="login-logo__icon">🎬</span>
          <div className="login-logo__title">CINEBOOK</div>
          <div className="login-logo__sub">Admin Portal</div>
        </div>

        <hr className="login-divider" />

        <h2 className="login-title">Welcome back</h2>
        <p className="login-sub">Sign in to access the admin dashboard</p>

        <div className="login-form">

          {/* API Error */}
          {apiError && (
            <div className="login-alert">🔒 {apiError}</div>
          )}

          {/* Username */}
          <div className="login-field">
            <label>Username</label>
            <input
              className={`login-input ${errors.username ? 'login-input--error' : ''}`}
              type="text"
              placeholder="Enter your username"
              value={form.username}
              onChange={e => set('username', e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            {errors.username && <span className="login-error-msg">{errors.username}</span>}
          </div>

          {/* Password */}
          <div className="login-field">
            <label>Password</label>
            <input
              className={`login-input ${errors.password ? 'login-input--error' : ''}`}
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={e => set('password', e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {errors.password && <span className="login-error-msg">{errors.password}</span>}
          </div>

          {/* Submit */}
          <button className="login-btn" onClick={handleLogin} disabled={loading}>
            {loading ? 'Signing in...' : '🔓 Sign In'}
          </button>

        </div>

        <p className="login-hint">
          Default credentials — username: <span>admin</span> · password: <span>Admin@123</span>
        </p>

      </div>
    </div>
  );
}
