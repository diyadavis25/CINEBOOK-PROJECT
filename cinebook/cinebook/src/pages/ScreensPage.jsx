// ─── SCREENS PAGE ────────────────────────────────────────────────────────────
import React from 'react';
import { useApp } from '../context/AppContext';
import { getScreenColor, getScreenIcon } from '../utils/helpers';
import './ScreensPage.css';

export default function ScreensPage() {
  const { screens } = useApp();

  return (
    <div className="screens-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Our <span>Screens</span></h1>
          <p className="page-subtitle">State-of-the-art auditoriums for an unmatched cinema experience</p>
        </div>

        {screens.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🖥️</div>
            <h3>No Screens Yet</h3>
            <p>Check the Admin panel to add screens.</p>
          </div>
        ) : (
          <div className="screens-grid">
            {screens.map((screen, i) => {
              const color = getScreenColor(screen.type);
              const icon  = getScreenIcon(screen.type);
              return (
                <div
                  key={screen._id}
                  className="screen-card"
                  style={{ animationDelay: `${i * 0.1}s`, '--accent': color }}
                >
                  <div className="screen-card__header">
                    <span className="screen-card__icon">{icon}</span>
                    <div
                      className="screen-card__type-badge"
                      style={{ color, background: `${color}15`, border: `1px solid ${color}44` }}
                    >
                      {screen.type}
                    </div>
                  </div>

                  <h3 className="screen-card__name">{screen.name}</h3>

                  <div className="screen-card__details">
                    <div className="screen-card__detail">
                      <span className="screen-card__detail-label">Total Seats</span>
                      <span className="screen-card__detail-value" style={{ color }}>{screen.seats}</span>
                    </div>
                    <div className="screen-card__detail">
                      <span className="screen-card__detail-label">Technology</span>
                      <span className="screen-card__detail-value">{screen.type}</span>
                    </div>
                  </div>

                  {/* Visual seat representation */}
                  <div className="screen-card__seats-visual">
                    {Array.from({ length: Math.min(screen.seats, 30) }).map((_, si) => (
                      <div key={si} className="screen-card__seat-dot" style={{ background: color }} />
                    ))}
                    {screen.seats > 30 && (
                      <span className="screen-card__more">+{screen.seats - 30} more</span>
                    )}
                  </div>

                  <div className="screen-card__glow" style={{ background: `radial-gradient(circle at 50% 100%, ${color}20, transparent 70%)` }} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
