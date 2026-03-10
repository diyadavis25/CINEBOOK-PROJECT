// ─── FOOTER ───────────────────────────────────────────────────────────────────
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">🎬 CINEBOOK</div>
            <p className="footer__tagline">
              Your premium destination for booking movie tickets online. Immersive experiences, effortless booking.
            </p>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Navigation</h4>
            <ul className="footer__links">
              {['/', '/movies', '/screens', '/shows', '/booking'].map((to, i) => (
                <li key={to}>
                  <NavLink to={to} className="footer__link">
                    {['Home', 'Movies', 'Screens', 'Shows', 'Booking'][i]}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Experience</h4>
            <ul className="footer__links">
              <li><span className="footer__link">IMAX Screens</span></li>
              <li><span className="footer__link">Dolby Atmos</span></li>
              <li><span className="footer__link">4DX Shows</span></li>
              <li><span className="footer__link">VIP Seating</span></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© 2026 CINEBOOK. All rights reserved.</p>
          <p>Built with ⚛️ React · Designed for cinema lovers</p>
        </div>
      </div>
    </footer>
  );
}
