// ─── CINEBOOK HELPERS ─────────────────────────────────────────────────────────

import { SCREEN_TYPE_COLORS, SCREEN_TYPE_ICONS, SEAT_ROWS, SEAT_COLS, PRE_BOOKED_SEATS } from './constants';

export const getScreenColor = (type) => SCREEN_TYPE_COLORS[type] || '#aaa';
export const getScreenIcon  = (type) => SCREEN_TYPE_ICONS[type]  || '🎥';

/** Generate the full seat map for a screen */
export const generateSeats = () => {
  const seats = [];
  SEAT_ROWS.forEach((row, ri) => {
    for (let c = 1; c <= SEAT_COLS; c++) {
      const num = ri * SEAT_COLS + c;
      seats.push({
        id:     num,
        label:  `${row}${c}`,
        row,
        col:    c,
        booked: PRE_BOOKED_SEATS.includes(num),
      });
    }
  });
  return seats;
};

/** Format date string to readable format */
export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
};

/** Format time to 12-hour */
export const formatTime = (timeStr) => {
  if (!timeStr) return '—';
  const [h, m] = timeStr.split(':');
  const hour = parseInt(h, 10);
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${m} ${suffix}`;
};

/** Simple field validator */
export const validateBookingForm = (form) => {
  const errors = {};
  if (!form.customerName?.trim()) errors.customerName = 'Name is required';
  if (!form.phone?.trim())         errors.phone        = 'Phone is required';
  if (!/^\d{10}$/.test(form.phone?.replace(/\D/g,''))) errors.phone = 'Enter a valid 10-digit number';
  if (!form.movieId)   errors.movieId   = 'Please select a movie';
  if (!form.screenId)  errors.screenId  = 'Please select a screen';
  if (!form.date)      errors.date      = 'Please select a date';
  if (!form.time)      errors.time      = 'Please select a time';
  return errors;
};

/** Generate a random booking reference */
export const generateBookingRef = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return 'CB' + Array.from({length: 8}, () => chars[Math.floor(Math.random()*chars.length)]).join('');
};

/** Truncate text */
export const truncate = (str, len = 90) =>
  str && str.length > len ? str.slice(0, len) + '…' : str;
