// ─── CINEBOOK API SERVICE ─────────────────────────────────────────────────────
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor: attach JWT if present ────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('cinebook_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor: handle 401 ─────────────────────────────────────────
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('cinebook_token');
    }
    return Promise.reject(error);
  }
);

// ── MOVIES ────────────────────────────────────────────────────────────────────
export const movieAPI = {
  getAll:   ()       => api.get('/movies'),
  getById:  (id)     => api.get(`/movies/${id}`),
  create:   (data)   => api.post('/movies', data),
  update:   (id, d)  => api.put(`/movies/${id}`, d),
  remove:   (id)     => api.delete(`/movies/${id}`),
};

// ── SCREENS ───────────────────────────────────────────────────────────────────
export const screenAPI = {
  getAll:   ()       => api.get('/screens'),
  getById:  (id)     => api.get(`/screens/${id}`),
  create:   (data)   => api.post('/screens', data),
  update:   (id, d)  => api.put(`/screens/${id}`, d),
  remove:   (id)     => api.delete(`/screens/${id}`),
};

// ── SHOWS ─────────────────────────────────────────────────────────────────────
export const showAPI = {
  getAll:   ()       => api.get('/shows'),
  getById:  (id)     => api.get(`/shows/${id}`),
  create:   (data)   => api.post('/shows', data),
  update:   (id, d)  => api.put(`/shows/${id}`, d),
  remove:   (id)     => api.delete(`/shows/${id}`),
};

// ── BOOKINGS ──────────────────────────────────────────────────────────────────
export const bookingAPI = {
  getAll:   ()       => api.get('/bookings'),
  getById:  (id)     => api.get(`/bookings/${id}`),
  create:   (data)   => api.post('/bookings', data),
  cancel:   (id)     => api.delete(`/bookings/${id}`),
};

// ── AUTH ──────────────────────────────────────────────────────────────────────
export const authAPI = {
  login:    (creds)  => api.post('/auth/login', creds),
  logout:   ()       => { localStorage.removeItem('cinebook_token'); },
};

export default api;
