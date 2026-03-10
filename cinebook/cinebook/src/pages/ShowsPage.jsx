// ─── SHOWS PAGE ──────────────────────────────────────────────────────────────
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatDate, formatTime, getScreenColor } from '../utils/helpers';
import './ShowsPage.css';

export default function ShowsPage() {
  const { shows, movies, screens } = useApp();
  const navigate = useNavigate();
  const [dateFilter, setDateFilter] = useState('');

  const getMovie  = id => movies.find(m => m._id === id || m._id === String(id));
  const getScreen = id => screens.find(s => s._id === id || s._id === String(id));

  const filtered = dateFilter
    ? shows.filter(s => s.date === dateFilter)
    : shows;

  // Unique dates for filter
  const dates = [...new Set(shows.map(s => s.date))].sort();

  return (
    <div className="shows-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Show<span>times</span></h1>
          <p className="page-subtitle">Find your perfect show and grab your seats</p>
        </div>

        {/* Date filter */}
        <div className="shows-filter">
          <button
            className={`shows-filter__btn ${!dateFilter ? 'shows-filter__btn--active' : ''}`}
            onClick={() => setDateFilter('')}
          >All Dates</button>
          {dates.map(d => (
            <button
              key={d}
              className={`shows-filter__btn ${dateFilter === d ? 'shows-filter__btn--active' : ''}`}
              onClick={() => setDateFilter(d)}
            >
              {formatDate(d)}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📅</div>
            <h3>No Shows Found</h3>
            <p>No shows scheduled for this date. Check Admin to add shows.</p>
          </div>
        ) : (
          <div className="shows-table-wrap">
            <table className="shows-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Movie</th>
                  <th>Screen</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((show, i) => {
                  const movie  = getMovie(show.movieId);
                  const screen = getScreen(show.screenId);
                  const color  = getScreenColor(screen?.type);
                  return (
                    <tr key={show._id} className="shows-table__row" style={{ animationDelay: `${i * 0.05}s` }}>
                      <td className="shows-table__num">
                        {String(i + 1).padStart(2, '0')}
                      </td>
                      <td>
                        <div className="shows-table__movie">
                          {movie && (
                            <img
                              className="shows-table__poster"
                              src={movie.poster}
                              alt={movie.name}
                              onError={e => { e.target.style.display='none'; }}
                            />
                          )}
                          <div>
                            <div className="shows-table__movie-name">{movie?.name || 'Unknown'}</div>
                            {movie?.genre && <span className="badge badge-red">{movie.genre}</span>}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="shows-table__screen">
                          <span
                            className="shows-table__screen-dot"
                            style={{ background: color }}
                          />
                          <span>{screen?.name || '—'}</span>
                          {screen?.type && (
                            <span
                              className="shows-table__screen-type"
                              style={{ color, borderColor: `${color}44`, background: `${color}12` }}
                            >
                              {screen.type}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="shows-table__date">{formatDate(show.date)}</td>
                      <td>
                        <span className="shows-table__time">{formatTime(show.time)}</span>
                      </td>
                      <td>
                        <button
                          className="btn btn-red btn-sm"
                          onClick={() => navigate('/booking', { state: { movie, show } })}
                        >
                          🎟 Book
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
