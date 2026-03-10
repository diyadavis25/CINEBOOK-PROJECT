// ─── HOME PAGE ────────────────────────────────────────────────────────────────
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import MovieCard from '../components/MovieCard';
import './HomePage.css';

export default function HomePage() {
  const { movies } = useApp();
  const navigate   = useNavigate();

  return (
    <div className="home">

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__overlay" />
        <div className="hero__particles">
          {Array.from({length: 20}).map((_, i) => (
            <div key={i} className="hero__particle" style={{
              left:  `${Math.random()*100}%`,
              top:   `${Math.random()*100}%`,
              animationDelay: `${Math.random()*5}s`,
              animationDuration: `${3 + Math.random()*4}s`,
            }} />
          ))}
        </div>
        <div className="hero__content">
          <span className="hero__eyebrow">🎬 Premium Cinema Experience</span>
          <h1 className="hero__title">CINE<span>BOOK</span></h1>
          <p className="hero__subtitle">
            The ultimate destination for booking movie tickets online.<br />
            Choose your seat, pick your show, and lose yourself in cinema magic.
          </p>
          <div className="hero__cta">
            <button className="btn btn-red btn-lg" onClick={() => navigate('/movies')}>
              🎥 Explore Movies
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => navigate('/shows')}>
              📅 View Showtimes
            </button>
          </div>

          {/* Stats bar */}
          <div className="hero__stats">
            {[['6+', 'Movies'], ['4', 'Screens'], ['100%', 'Cashless'], ['24/7', 'Booking']].map(([val, lbl]) => (
              <div key={lbl} className="hero__stat">
                <span className="hero__stat-val">{val}</span>
                <span className="hero__stat-lbl">{lbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hero__scroll">
          <div className="hero__scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="section">
        <div className="container">
          <div className="features-grid">
            {[
              { icon: '🎬', title: 'IMAX & 4DX',      desc: 'Immersive large-format screens with cutting-edge technology.' },
              { icon: '💺', title: 'Choose Your Seat', desc: 'Interactive seat maps — pick the perfect spot before you arrive.' },
              { icon: '🎟️', title: 'Instant Tickets',  desc: 'Digital tickets delivered instantly after booking confirmation.' },
              { icon: '🔊', title: 'Dolby Atmos',      desc: 'Three-dimensional surround sound that puts you in the movie.' },
            ].map(f => (
              <div key={f.title} className="feature-card">
                <span className="feature-card__icon">{f.icon}</span>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOW SHOWING ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Now Showing</h2>
              <span className="section-line" />
            </div>
            <button className="btn btn-outline" onClick={() => navigate('/movies')}>
              View All →
            </button>
          </div>
          <div className="movies-grid">
            {movies.slice(0, 4).map((movie, i) => (
              <div key={movie._id} style={{ animationDelay: `${i * 0.1}s` }}>
                <MovieCard movie={movie} onBook={() => navigate('/booking', { state: { movie } })} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner__bg" />
            <div className="cta-banner__content">
              <h2 className="cta-banner__title">Ready for the Big Screen?</h2>
              <p className="cta-banner__sub">Book your seats in under 2 minutes. No queues, no hassle.</p>
              <button className="btn btn-red btn-lg" onClick={() => navigate('/booking')}>
                🎟 Book Tickets Now
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
