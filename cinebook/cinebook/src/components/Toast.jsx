// ─── TOAST NOTIFICATION ───────────────────────────────────────────────────────
import React from 'react';
import './Toast.css';

export default function Toast({ msg, type = 'success', onClose }) {
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  return (
    <div className={`toast toast--${type}`}>
      <span className="toast__icon">{icons[type]}</span>
      <span className="toast__msg">{msg}</span>
      <button className="toast__close" onClick={onClose}>✕</button>
    </div>
  );
}
