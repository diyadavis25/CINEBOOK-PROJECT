// ─── ADMIN PAGE ───────────────────────────────────────────────────────────────
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SCREEN_TYPES, SHOW_TIMES } from '../utils/constants';
import { getScreenColor, getScreenIcon } from '../utils/helpers';
import './AdminPage.css';

// ── Reusable mini form ─────────────────────────────────────────────────────────
function FormField({ label, error, children }) {
  return (
    <div className={`form-group ${error ? 'form-group--error' : ''}`}>
      <label className="form-label">{label}</label>
      {children}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}

// ── Add Movie Form ─────────────────────────────────────────────────────────────
function AddMovieForm({ onAdd }) {
  const blank = { name: '', description: '', cast: '', poster: '', genre: 'Action', duration: '', rating: 'PG-13' };
  const [form, setForm] = useState(blank);
  const [errors, setErrors] = useState({});

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })); };

  const validate = () => {
    const e = {};
    if (!form.name.trim())        e.name = 'Movie name is required';
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.cast.trim())        e.cast = 'Cast is required';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onAdd({
      ...form,
      poster: form.poster.trim() || 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&q=80',
    });
    setForm(blank);
  };

  return (
    <div className="admin-form">
      <FormField label="Movie Title *" error={errors.name}>
        <input className="form-input" placeholder="e.g. Inception" value={form.name} onChange={e => set('name', e.target.value)} />
      </FormField>
      <FormField label="Description *" error={errors.description}>
        <textarea className="form-input admin-textarea" placeholder="Short movie description..." value={form.description} onChange={e => set('description', e.target.value)} rows={3} />
      </FormField>
      <FormField label="Star Cast *" error={errors.cast}>
        <input className="form-input" placeholder="e.g. Leonardo DiCaprio, Ellen Page" value={form.cast} onChange={e => set('cast', e.target.value)} />
      </FormField>
      <div className="admin-form-row">
        <FormField label="Genre">
          <select className="form-select" value={form.genre} onChange={e => set('genre', e.target.value)}>
            {['Action','Drama','Sci-Fi','Thriller','Comedy','Horror','Fantasy','Romance'].map(g =>
              <option key={g}>{g}</option>
            )}
          </select>
        </FormField>
        <FormField label="Duration">
          <input className="form-input" placeholder="e.g. 148 min" value={form.duration} onChange={e => set('duration', e.target.value)} />
        </FormField>
        <FormField label="Rating">
          <select className="form-select" value={form.rating} onChange={e => set('rating', e.target.value)}>
            {['G','PG','PG-13','R','NC-17'].map(r => <option key={r}>{r}</option>)}
          </select>
        </FormField>
      </div>
      <FormField label="Poster URL (optional)">
        <input className="form-input" placeholder="https://... (leave blank for default)" value={form.poster} onChange={e => set('poster', e.target.value)} />
      </FormField>
      <button className="btn btn-red" style={{ width: '100%', marginTop: 4 }} onClick={handleSubmit}>
        ＋ Add Movie
      </button>
    </div>
  );
}

// ── Add Screen Form ────────────────────────────────────────────────────────────
function AddScreenForm({ onAdd }) {
  const blank = { name: '', seats: '', type: 'Standard' };
  const [form, setForm] = useState(blank);
  const [errors, setErrors] = useState({});

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })); };

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = 'Screen name is required';
    if (!form.seats || isNaN(form.seats) || +form.seats < 1) e.seats = 'Enter valid seat count';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onAdd({ ...form, seats: parseInt(form.seats) });
    setForm(blank);
  };

  return (
    <div className="admin-form">
      <FormField label="Screen Name *" error={errors.name}>
        <input className="form-input" placeholder="e.g. Screen Epsilon" value={form.name} onChange={e => set('name', e.target.value)} />
      </FormField>
      <FormField label="Screen Type *">
        <select className="form-select" value={form.type} onChange={e => set('type', e.target.value)}>
          {SCREEN_TYPES.map(t => <option key={t}>{t}</option>)}
        </select>
      </FormField>
      <FormField label="Total Seats *" error={errors.seats}>
        <input className="form-input" type="number" min="1" placeholder="e.g. 150" value={form.seats} onChange={e => set('seats', e.target.value)} />
      </FormField>
      <button className="btn btn-red" style={{ width: '100%', marginTop: 4 }} onClick={handleSubmit}>
        ＋ Add Screen
      </button>
    </div>
  );
}

// ── Schedule Show Form ─────────────────────────────────────────────────────────
function AddShowForm({ movies, screens, onAdd }) {
  const blank = { movieId: '', screenId: '', date: '', time: '' };
  const [form, setForm] = useState(blank);
  const [errors, setErrors] = useState({});

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })); };

  const validate = () => {
    const e = {};
    if (!form.movieId)  e.movieId  = 'Select a movie';
    if (!form.screenId) e.screenId = 'Select a screen';
    if (!form.date)     e.date     = 'Select a date';
    if (!form.time)     e.time     = 'Select a time';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onAdd(form);
    setForm(blank);
  };

  return (
    <div className="admin-form">
      <FormField label="Movie *" error={errors.movieId}>
        <select className="form-select" value={form.movieId} onChange={e => set('movieId', e.target.value)}>
          <option value="">— Select Movie —</option>
          {movies.map(m => <option key={m._id} value={m._id}>{m.name}</option>)}
        </select>
      </FormField>
      <FormField label="Screen *" error={errors.screenId}>
        <select className="form-select" value={form.screenId} onChange={e => set('screenId', e.target.value)}>
          <option value="">— Select Screen —</option>
          {screens.map(s => <option key={s._id} value={s._id}>{s.name} ({s.type})</option>)}
        </select>
      </FormField>
      <FormField label="Show Date *" error={errors.date}>
        <input className="form-input" type="date" min={new Date().toISOString().split('T')[0]} value={form.date} onChange={e => set('date', e.target.value)} />
      </FormField>
      <FormField label="Show Time *" error={errors.time}>
        <select className="form-select" value={form.time} onChange={e => set('time', e.target.value)}>
          <option value="">— Select Time —</option>
          {SHOW_TIMES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </FormField>
      <button className="btn btn-red" style={{ width: '100%', marginTop: 4 }} onClick={handleSubmit}>
        ＋ Schedule Show
      </button>
    </div>
  );
}

// ── Main Admin Page ────────────────────────────────────────────────────────────
export default function AdminPage() {
  const { movies, screens, shows, bookings, addMovie, addScreen, addShow } = useApp();
  const [activeTab, setActiveTab] = useState('movies');

  const tabs = [
    { id: 'movies',   label: '🎬 Movies',   count: movies.length  },
    { id: 'screens',  label: '🖥️ Screens',  count: screens.length },
    { id: 'shows',    label: '📅 Shows',    count: shows.length   },
    { id: 'bookings', label: '🎟 Bookings', count: bookings.length },
  ];

  return (
    <div className="admin-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title"><span>Admin</span> Dashboard</h1>
          <p className="page-subtitle">Manage movies, screens, shows and bookings</p>
        </div>

        {/* Stats row */}
        <div className="admin-stats">
          {[
            { label: 'Movies',   val: movies.length,   color: '#e50914', icon: '🎬' },
            { label: 'Screens',  val: screens.length,  color: '#f5c518', icon: '🖥️' },
            { label: 'Shows',    val: shows.length,    color: '#00d4ff', icon: '📅' },
            { label: 'Bookings', val: bookings.length, color: '#00e676', icon: '🎟' },
          ].map(s => (
            <div key={s.label} className="admin-stat-card" style={{ '--c': s.color }}>
              <span className="admin-stat-icon">{s.icon}</span>
              <div className="admin-stat-val" style={{ color: s.color }}>{s.val}</div>
              <div className="admin-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          {tabs.map(t => (
            <button
              key={t.id}
              className={`admin-tab ${activeTab === t.id ? 'admin-tab--active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
              <span className="admin-tab-count">{t.count}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="admin-content">

          {/* Movies tab */}
          {activeTab === 'movies' && (
            <div className="admin-split">
              <div className="admin-split__form">
                <h3 className="admin-split__title">➕ Add New Movie</h3>
                <AddMovieForm onAdd={addMovie} />
              </div>
              <div className="admin-split__list">
                <h3 className="admin-split__title">Movie Library ({movies.length})</h3>
                <div className="admin-list">
                  {movies.map(m => (
                    <div key={m._id} className="admin-list-item">
                      <img
                        className="admin-list-poster"
                        src={m.poster}
                        alt={m.name}
                        onError={e => { e.target.style.display='none'; }}
                      />
                      <div className="admin-list-info">
                        <div className="admin-list-name">{m.name}</div>
                        <div className="admin-list-meta">{m.genre} · {m.duration}</div>
                        <div className="admin-list-cast">{m.cast}</div>
                      </div>
                      {m.rating && <span className="badge badge-gold">{m.rating}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Screens tab */}
          {activeTab === 'screens' && (
            <div className="admin-split">
              <div className="admin-split__form">
                <h3 className="admin-split__title">➕ Add New Screen</h3>
                <AddScreenForm onAdd={addScreen} />
              </div>
              <div className="admin-split__list">
                <h3 className="admin-split__title">Screens ({screens.length})</h3>
                <div className="admin-list">
                  {screens.map(s => {
                    const color = getScreenColor(s.type);
                    const icon  = getScreenIcon(s.type);
                    return (
                      <div key={s._id} className="admin-list-item">
                        <span style={{ fontSize: '1.6rem' }}>{icon}</span>
                        <div className="admin-list-info">
                          <div className="admin-list-name">{s.name}</div>
                          <div className="admin-list-meta">{s.seats} seats</div>
                        </div>
                        <span
                          className="badge"
                          style={{ background: `${color}15`, color, border: `1px solid ${color}44` }}
                        >
                          {s.type}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Shows tab */}
          {activeTab === 'shows' && (
            <div className="admin-split">
              <div className="admin-split__form">
                <h3 className="admin-split__title">➕ Schedule Show</h3>
                <AddShowForm movies={movies} screens={screens} onAdd={addShow} />
              </div>
              <div className="admin-split__list">
                <h3 className="admin-split__title">Scheduled Shows ({shows.length})</h3>
                <div className="admin-list">
                  {shows.map(sh => {
                    const mv = movies.find(m => m._id === sh.movieId || m._id === String(sh.movieId));
                    const sc = screens.find(s => s._id === sh.screenId || s._id === String(sh.screenId));
                    return (
                      <div key={sh._id} className="admin-list-item">
                        <div className="admin-list-info">
                          <div className="admin-list-name">{mv?.name || '—'}</div>
                          <div className="admin-list-meta">{sc?.name} · {sh.date}</div>
                        </div>
                        <span className="admin-time-badge">{sh.time}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Bookings tab */}
          {activeTab === 'bookings' && (
            <div>
              <h3 className="admin-split__title" style={{ marginBottom: 20 }}>
                All Bookings ({bookings.length})
              </h3>
              {bookings.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">🎟</div>
                  <h3>No Bookings Yet</h3>
                  <p>Bookings will appear here once customers book tickets.</p>
                </div>
              ) : (
                <div className="admin-list">
                  {bookings.map(b => {
                    const mv = movies.find(m => m._id === b.movieId);
                    const sc = screens.find(s => s._id === b.screenId);
                    return (
                      <div key={b._id} className="admin-list-item admin-list-item--booking">
                        <div className="admin-list-info">
                          <div className="admin-list-name">{b.customerName}</div>
                          <div className="admin-list-meta">
                            {mv?.name} · {sc?.name} · {b.date} {b.time}
                          </div>
                          <div className="admin-list-seats">
                            Seats: {b.seats?.join(', ')}
                          </div>
                        </div>
                        <div className="admin-list-ref">{b.ref}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
