// ─── MOVIES PAGE ─────────────────────────────────────────────────────────────
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import MovieCard from '../components/MovieCard';
import './MoviesPage.css';

export default function MoviesPage() {
  const { movies }   = useApp();
  const navigate     = useNavigate();
  const [filter, setFilter] = useState('All');

  const genres = ['All', ...new Set(movies.map(m => m.genre).filter(Boolean))];
  const filtered = filter === 'All' ? movies : movies.filter(m => m.genre === filter);

  return (
    <div className="movies-page">
      <div className="container">

        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">All <span>Movies</span></h1>
          <p className="page-subtitle">Discover what's playing at CINEBOOK this week</p>
        </div>

        {/* Genre Filter */}
        <div className="movies-filter">
          {genres.map(g => (
            <button
              key={g}
              className={`movies-filter__btn ${filter === g ? 'movies-filter__btn--active' : ''}`}
              onClick={() => setFilter(g)}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="movies-count">
          Showing <strong>{filtered.length}</strong> movie{filtered.length !== 1 ? 's' : ''}
          {filter !== 'All' && ` in ${filter}`}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🎭</div>
            <h3>No Movies Found</h3>
            <p>Try a different genre or check back later.</p>
          </div>
        ) : (
          <div className="movies-grid">
            {filtered.map((movie, i) => (
              <div key={movie._id} style={{ animationDelay: `${i * 0.07}s` }}>
                <MovieCard movie={movie} onBook={() => navigate('/booking', { state: { movie } })} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
