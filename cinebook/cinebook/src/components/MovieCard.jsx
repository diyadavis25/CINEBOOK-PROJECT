// ─── MOVIE CARD COMPONENT ─────────────────────────────────────────────────────
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { truncate } from '../utils/helpers';
import './MovieCard.css';

export default function MovieCard({ movie, onBook }) {
  const navigate = useNavigate();

  const handleBook = () => {
    if (onBook) onBook(movie);
    else navigate('/booking', { state: { movie } });
  };

  return (
    <div className="movie-card">
      {/* Poster */}
      <div className="movie-card__poster-wrap">
        <img
          className="movie-card__poster"
          src={movie.poster}
          alt={movie.name}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&q=80';
          }}
        />
        <div className="movie-card__overlay">
          <button className="movie-card__overlay-btn btn btn-red" onClick={handleBook}>
            🎟 Book Now
          </button>
        </div>
        {movie.rating && (
          <span className="movie-card__rating">{movie.rating}</span>
        )}
      </div>

      {/* Info */}
      <div className="movie-card__info">
        {movie.genre && (
          <span className="badge badge-red">{movie.genre}</span>
        )}
        <h3 className="movie-card__title">{movie.name}</h3>
        <p className="movie-card__desc">{truncate(movie.description, 80)}</p>
        <p className="movie-card__cast">
          <span className="movie-card__cast-label">Stars: </span>
          {truncate(movie.cast, 50)}
        </p>
        {movie.duration && (
          <p className="movie-card__duration">⏱ {movie.duration}</p>
        )}
        <button className="movie-card__btn btn btn-red" onClick={handleBook}>
          🎟 Book Now
        </button>
      </div>
    </div>
  );
}
