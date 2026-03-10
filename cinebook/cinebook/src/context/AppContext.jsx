// ─── CINEBOOK APP CONTEXT (MySQL Backend) ─────────────────────────────────────
import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { movieAPI, screenAPI, showAPI, bookingAPI } from '../services/api';

// ── Initial state ─────────────────────────────────────────────────────────────
const initialState = {
  movies:   [],
  screens:  [],
  shows:    [],
  bookings: [],
  toast:    null,
  loading:  { movies: true, screens: true, shows: true },
};

// ── Reducer ───────────────────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {

    // Movies
    case 'SET_MOVIES':    return { ...state, movies:   action.payload };
    case 'ADD_MOVIE':     return { ...state, movies:   [...state.movies,  action.payload] };
    case 'UPDATE_MOVIE':  return { ...state, movies:   state.movies.map(m => m._id === action.payload._id ? action.payload : m) };
    case 'DELETE_MOVIE':  return { ...state, movies:   state.movies.filter(m => m._id !== action.payload) };

    // Screens
    case 'SET_SCREENS':   return { ...state, screens:  action.payload };
    case 'ADD_SCREEN':    return { ...state, screens:  [...state.screens, action.payload] };
    case 'UPDATE_SCREEN': return { ...state, screens:  state.screens.map(s => s._id === action.payload._id ? action.payload : s) };
    case 'DELETE_SCREEN': return { ...state, screens:  state.screens.filter(s => s._id !== action.payload) };

    // Shows
    case 'SET_SHOWS':     return { ...state, shows:    action.payload };
    case 'ADD_SHOW':      return { ...state, shows:    [...state.shows,   action.payload] };
    case 'DELETE_SHOW':   return { ...state, shows:    state.shows.filter(s => s._id !== action.payload) };

    // Bookings
    case 'SET_BOOKINGS':  return { ...state, bookings: action.payload };
    case 'ADD_BOOKING':   return { ...state, bookings: [...state.bookings, action.payload] };

    // UI
    case 'SET_TOAST':     return { ...state, toast: action.payload };
    case 'CLEAR_TOAST':   return { ...state, toast: null };
    case 'SET_LOADING':   return { ...state, loading: { ...state.loading, ...action.payload } };

    default: return state;
  }
}

// ── Context ───────────────────────────────────────────────────────────────────
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // ── Load all data from backend on startup ────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        const [moviesRes, screensRes, showsRes, bookingsRes] = await Promise.all([
          movieAPI.getAll(),
          screenAPI.getAll(),
          showAPI.getAll(),
          bookingAPI.getAll(),
        ]);
        dispatch({ type: 'SET_MOVIES',   payload: moviesRes.data });
        dispatch({ type: 'SET_SCREENS',  payload: screensRes.data });
        dispatch({ type: 'SET_SHOWS',    payload: showsRes.data });
        dispatch({ type: 'SET_BOOKINGS', payload: bookingsRes.data });
      } catch (err) {
        console.error('Failed to load data from backend:', err.message);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: { movies: false, screens: false, shows: false } });
      }
    };
    load();
  }, []);

  const showToast = useCallback((msg, type = 'success') => {
    dispatch({ type: 'SET_TOAST', payload: { msg, type } });
    setTimeout(() => dispatch({ type: 'CLEAR_TOAST' }), 3500);
  }, []);

  // ── Movies ────────────────────────────────────────────────────────────────
  const addMovie = useCallback(async (movie) => {
    try {
      const res = await movieAPI.create(movie);
      dispatch({ type: 'ADD_MOVIE', payload: res.data });
      showToast(`"${res.data.name}" added successfully!`);
      return res.data;
    } catch (err) {
      showToast(err.response?.data?.error || 'Failed to add movie', 'error');
    }
  }, [showToast]);

  // ── Screens ───────────────────────────────────────────────────────────────
  const addScreen = useCallback(async (screen) => {
    try {
      const res = await screenAPI.create(screen);
      dispatch({ type: 'ADD_SCREEN', payload: res.data });
      showToast(`"${res.data.name}" added!`);
      return res.data;
    } catch (err) {
      showToast(err.response?.data?.error || 'Failed to add screen', 'error');
    }
  }, [showToast]);

  // ── Shows ─────────────────────────────────────────────────────────────────
  const addShow = useCallback(async (show) => {
    try {
      const res = await showAPI.create(show);
      dispatch({ type: 'ADD_SHOW', payload: res.data });
      showToast('Show scheduled!');
      return res.data;
    } catch (err) {
      showToast(err.response?.data?.error || 'Failed to schedule show', 'error');
    }
  }, [showToast]);

  // ── Bookings ──────────────────────────────────────────────────────────────
  const addBooking = useCallback(async (booking) => {
    try {
      const res = await bookingAPI.create(booking);
      dispatch({ type: 'ADD_BOOKING', payload: res.data });
      return res.data;
    } catch (err) {
      showToast(err.response?.data?.error || 'Failed to create booking', 'error');
    }
  }, [showToast]);

  return (
    <AppContext.Provider value={{
      ...state,
      dispatch,
      showToast,
      addMovie,
      addScreen,
      addShow,
      addBooking,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

export default AppContext;
