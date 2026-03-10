// ─── BOOKING PAGE (3-step flow) ───────────────────────────────────────────────
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { validateBookingForm, generateSeats, formatTime, formatDate, generateBookingRef } from '../utils/helpers';
import { SEAT_ROWS, SEAT_COLS } from '../utils/constants';
import './BookingPage.css';

// ─── STEP 1: Booking Form ─────────────────────────────────────────────────────
function BookingForm({ movies, screens, prefill, onNext }) {
  const [form, setForm] = useState({
    customerName: '',
    phone:        '',
    address:      '',
    movieId:      prefill?.movie?._id  || '',
    screenId:     prefill?.screen?._id || '',
    date:         prefill?.show?.date  || '',
    time:         prefill?.show?.time  || '',
    ...prefill?.form,
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: '' }));
  };

  const handleSubmit = () => {
    const errs = validateBookingForm(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onNext(form);
  };

  return (
    <div className="booking-form-wrap">
      <div className="booking-form-card">
        <h2 className="booking-form-title">🎟 Booking Details</h2>
        <p className="booking-form-sub">Fill in your details to proceed to seat selection</p>

        <div className="booking-form-grid">
          {/* Customer Name */}
          <div className={`form-group ${errors.customerName ? 'form-group--error' : ''}`}>
            <label className="form-label">Customer Name *</label>
            <input
              className="form-input"
              placeholder="Your full name"
              value={form.customerName}
              onChange={e => set('customerName', e.target.value)}
            />
            {errors.customerName && <span className="form-error">{errors.customerName}</span>}
          </div>

          {/* Phone */}
          <div className={`form-group ${errors.phone ? 'form-group--error' : ''}`}>
            <label className="form-label">Contact Number *</label>
            <input
              className="form-input"
              placeholder="10-digit mobile number"
              value={form.phone}
              onChange={e => set('phone', e.target.value)}
            />
            {errors.phone && <span className="form-error">{errors.phone}</span>}
          </div>

          {/* Address */}
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Address (Optional)</label>
            <input
              className="form-input"
              placeholder="Your full address"
              value={form.address}
              onChange={e => set('address', e.target.value)}
            />
          </div>

          {/* Movie */}
          <div className={`form-group ${errors.movieId ? 'form-group--error' : ''}`}>
            <label className="form-label">Select Movie *</label>
            <select className="form-select" value={form.movieId} onChange={e => set('movieId', e.target.value)}>
              <option value="">— Choose a Movie —</option>
              {movies.map(m => <option key={m._id} value={m._id}>{m.name}</option>)}
            </select>
            {errors.movieId && <span className="form-error">{errors.movieId}</span>}
          </div>

          {/* Screen */}
          <div className={`form-group ${errors.screenId ? 'form-group--error' : ''}`}>
            <label className="form-label">Select Screen *</label>
            <select className="form-select" value={form.screenId} onChange={e => set('screenId', e.target.value)}>
              <option value="">— Choose a Screen —</option>
              {screens.map(s => <option key={s._id} value={s._id}>{s.name} ({s.type})</option>)}
            </select>
            {errors.screenId && <span className="form-error">{errors.screenId}</span>}
          </div>

          {/* Date */}
          <div className={`form-group ${errors.date ? 'form-group--error' : ''}`}>
            <label className="form-label">Show Date *</label>
            <input
              className="form-input"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={form.date}
              onChange={e => set('date', e.target.value)}
            />
            {errors.date && <span className="form-error">{errors.date}</span>}
          </div>

          {/* Time */}
          <div className={`form-group ${errors.time ? 'form-group--error' : ''}`}>
            <label className="form-label">Show Time *</label>
            <input
              className="form-input"
              type="time"
              value={form.time}
              onChange={e => set('time', e.target.value)}
            />
            {errors.time && <span className="form-error">{errors.time}</span>}
          </div>
        </div>

        <div className="booking-form-actions">
          <button className="btn btn-red btn-lg" onClick={handleSubmit}>
            Select Seats →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── STEP 2: Seat Selection ───────────────────────────────────────────────────
function SeatSelection({ formData, movies, screens, onConfirm, onBack }) {
  const [seats]    = useState(generateSeats);
  const [selected, setSelected] = useState([]);

  const movie  = movies.find(m => m._id === formData.movieId);
  const screen = screens.find(s => s._id === formData.screenId);

  const toggleSeat = (seat) => {
    if (seat.booked) return;
    setSelected(sel =>
      sel.includes(seat.id)
        ? sel.filter(id => id !== seat.id)
        : [...sel, seat.id]
    );
  };

  const selectedLabels = seats.filter(s => selected.includes(s.id)).map(s => s.label);

  return (
    <div className="seat-page">
      {/* Movie info bar */}
      <div className="seat-info-bar">
        <div className="container">
          <div className="seat-info-bar__inner">
            {movie?.poster && (
              <img className="seat-info-bar__poster" src={movie.poster} alt={movie.name} />
            )}
            <div>
              <h3 className="seat-info-bar__movie">{movie?.name}</h3>
              <p className="seat-info-bar__detail">
                {screen?.name} · {screen?.type} · {formatDate(formData.date)} · {formatTime(formData.time)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="seat-container">

          {/* Screen curve */}
          <div className="seat-screen">
            <div className="seat-screen__curve" />
            <span className="seat-screen__label">◀ SCREEN THIS WAY ▶</span>
          </div>

          {/* Legend */}
          <div className="seat-legend">
            {[
              { label: 'Available', cls: 'available' },
              { label: 'Selected',  cls: 'selected'  },
              { label: 'Booked',    cls: 'booked'    },
            ].map(l => (
              <div key={l.label} className="seat-legend__item">
                <div className={`seat-legend__dot seat-legend__dot--${l.cls}`} />
                <span>{l.label}</span>
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="seat-map">
            {SEAT_ROWS.map((row, ri) => (
              <div key={row} className="seat-row">
                <span className="seat-row__label">{row}</span>
                <div className="seat-row__seats">
                  {seats
                    .filter(s => Math.floor((s.id - 1) / SEAT_COLS) === ri)
                    .map(seat => (
                      <button
                        key={seat.id}
                        className={`seat-btn ${seat.booked ? 'seat-btn--booked' : ''} ${selected.includes(seat.id) ? 'seat-btn--selected' : ''}`}
                        onClick={() => toggleSeat(seat)}
                        title={seat.label}
                        disabled={seat.booked}
                      >
                        {seat.label}
                      </button>
                    ))
                  }
                </div>
                <span className="seat-row__label">{row}</span>
              </div>
            ))}
          </div>

          {/* Summary bar */}
          <div className="seat-summary">
            <div className="seat-summary__left">
              <div className="seat-summary__count">
                {selected.length} seat{selected.length !== 1 ? 's' : ''} selected
              </div>
              <div className="seat-summary__tags">
                {selectedLabels.length === 0
                  ? <span className="seat-summary__empty">No seats selected</span>
                  : selectedLabels.map(l => (
                    <span key={l} className="seat-summary__tag">{l}</span>
                  ))
                }
              </div>
            </div>
            <div className="seat-summary__actions">
              <button className="btn btn-ghost" onClick={onBack}>← Back</button>
              <button
                className="btn btn-red"
                disabled={selected.length === 0}
                onClick={() => onConfirm(selectedLabels)}
              >
                Confirm {selected.length > 0 ? `(${selected.length})` : ''} →
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── STEP 3: Ticket ───────────────────────────────────────────────────────────
function TicketView({ ticket, movies, screens, onNewBooking }) {
  const movie  = movies.find(m => m._id === ticket.movieId);
  const screen = screens.find(s => s._id === ticket.screenId);

  return (
    <div className="ticket-page">
      <div className="container">
        <div className="ticket-success-header">
          <div className="ticket-success-icon">🎉</div>
          <h2 className="ticket-success-title">Booking Confirmed!</h2>
          <p className="ticket-success-sub">Your ticket has been generated. Enjoy the movie!</p>
        </div>

        <div className="ticket-wrap">
          {/* Ticket card */}
          <div className="ticket">

            {/* Top (movie) */}
            <div className="ticket__top">
              <div className="ticket__brand">CINEBOOK</div>
              <h2 className="ticket__movie">{movie?.name || '—'}</h2>
              {movie?.genre && <span className="badge badge-red">{movie.genre}</span>}
              <div className="ticket__ref">Ref: {ticket.ref}</div>
            </div>

            {/* Tear line */}
            <div className="ticket__tear">
              <div className="ticket__hole ticket__hole--left" />
              <div className="ticket__dashes" />
              <div className="ticket__hole ticket__hole--right" />
            </div>

            {/* Bottom (details) */}
            <div className="ticket__bottom">
              <div className="ticket__details-grid">
                <div className="ticket__field">
                  <label>Customer</label>
                  <p>{ticket.customerName}</p>
                </div>
                <div className="ticket__field">
                  <label>Contact</label>
                  <p>{ticket.phone}</p>
                </div>
                <div className="ticket__field">
                  <label>Screen</label>
                  <p>{screen?.name || '—'}</p>
                </div>
                <div className="ticket__field">
                  <label>Type</label>
                  <p>{screen?.type || '—'}</p>
                </div>
                <div className="ticket__field">
                  <label>Date</label>
                  <p>{formatDate(ticket.date)}</p>
                </div>
                <div className="ticket__field">
                  <label>Time</label>
                  <p>{formatTime(ticket.time)}</p>
                </div>
              </div>

              {/* Seats */}
              <div className="ticket__seats-section">
                <label>Seats</label>
                <div className="ticket__seats-tags">
                  {ticket.seats.map(s => (
                    <span key={s} className="ticket__seat-tag">{s}</span>
                  ))}
                </div>
              </div>

              {/* Enjoy message */}
              <div className="ticket__enjoy">
                <span>🍿</span>
                <span className="ticket__enjoy-text">ENJOY YOUR MOVIE!</span>
                <span>🎬</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="ticket-actions">
            <button className="btn btn-outline" onClick={() => window.print()}>🖨️ Print Ticket</button>
            <button className="btn btn-red btn-lg" onClick={onNewBooking}>Book Another Ticket</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN BOOKING PAGE ────────────────────────────────────────────────────────
export default function BookingPage() {
  const { movies, screens, addBooking, showToast } = useApp();
  const location = useLocation();
  const navigate  = useNavigate();

  const prefill = location.state || {};

  const [step,   setStep]   = useState(1);   // 1=form, 2=seats, 3=ticket
  const [form,   setForm]   = useState(null);
  const [ticket, setTicket] = useState(null);

  const handleFormNext = (formData) => {
    setForm(formData);
    setStep(2);
  };

  const handleSeatConfirm = (seatLabels) => {
    const ref = generateBookingRef();
    const newTicket = {
      ...form,
      seats: seatLabels,
      ref,
    };
    addBooking(newTicket);
    setTicket(newTicket);
    setStep(3);
    showToast('🎉 Booking confirmed! Enjoy your movie.');
  };

  const handleNewBooking = () => {
    setStep(1);
    setForm(null);
    setTicket(null);
  };

  // Step indicator
  const steps = ['Details', 'Seats', 'Ticket'];

  return (
    <div className="booking-page">

      {/* Step indicator */}
      <div className="booking-steps">
        <div className="container">
          <div className="booking-steps__inner">
            {steps.map((label, i) => (
              <React.Fragment key={label}>
                <div className={`booking-step ${step === i+1 ? 'booking-step--active' : ''} ${step > i+1 ? 'booking-step--done' : ''}`}>
                  <div className="booking-step__circle">
                    {step > i+1 ? '✓' : i+1}
                  </div>
                  <span className="booking-step__label">{label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`booking-step__connector ${step > i+1 ? 'booking-step__connector--done' : ''}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Step content */}
      {step === 1 && (
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">Book <span>Tickets</span></h1>
            <p className="page-subtitle">Step 1 of 3 — Fill in your details</p>
          </div>
          <BookingForm
            movies={movies}
            screens={screens}
            prefill={prefill}
            onNext={handleFormNext}
          />
        </div>
      )}

      {step === 2 && (
        <>
          <div className="container">
            <div className="page-header">
              <h1 className="page-title">Select <span>Seats</span></h1>
              <p className="page-subtitle">Step 2 of 3 — Click seats to select them</p>
            </div>
          </div>
          <SeatSelection
            formData={form}
            movies={movies}
            screens={screens}
            onConfirm={handleSeatConfirm}
            onBack={() => setStep(1)}
          />
        </>
      )}

      {step === 3 && ticket && (
        <TicketView
          ticket={ticket}
          movies={movies}
          screens={screens}
          onNewBooking={handleNewBooking}
        />
      )}
    </div>
  );
}
