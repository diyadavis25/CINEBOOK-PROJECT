// ─── NAV COMPONENT ────────────────────────────────────────────────────────────
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Nav.css';

const NAV_LINKS = [
  { to: '/',        label: 'Home'    },
  { to: '/movies',  label: 'Movies'  },
  { to: '/screens', label: 'Screens' },
  { to: '/shows',   label: 'Shows'   },
  { to: '/booking', label: 'Booking' },
  { to: '/admin',   label: 'Admin'   },
];

export default function Nav() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('cinebook_token'));
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu on route change & refresh login state
  useEffect(() => {
    setOpen(false);
    setIsLoggedIn(!!localStorage.getItem('cinebook_token'));
  }, [location]);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('cinebook_token');
    localStorage.removeItem('cinebook_user');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">

        {/* Logo */}
        <NavLink to="/" className="nav__logo">
          <span className="nav__logo-icon">🎬</span>
          CINEBOOK
        </NavLink>

        {/* Desktop links */}
        <ul className="nav__links">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right side buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="btn btn-sm"
              style={{ background: '#2a2a2a', color: '#aaa', border: '1px solid #333', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              🔓 Logout
            </button>
          ) : (
            <NavLink to="/booking" className="nav__cta btn btn-red btn-sm">
              🎟 Book Now
            </NavLink>
          )}
        </div>

        {/* Hamburger */}
        <button
          className={`nav__hamburger ${open ? 'nav__hamburger--open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`nav__mobile ${open ? 'nav__mobile--open' : ''}`}>
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `nav__mobile-link ${isActive ? 'nav__mobile-link--active' : ''}`}
          >
            {label}
          </NavLink>
        ))}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            style={{ background: 'none', border: 'none', color: '#aaa', padding: '12px 24px', cursor: 'pointer', textAlign: 'left', fontSize: '1rem' }}
          >
            🔓 Logout
          </button>
        )}
      </div>
    </nav>
  );
}
