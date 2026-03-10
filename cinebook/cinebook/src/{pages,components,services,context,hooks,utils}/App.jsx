// ─── CINEBOOK APP ROOT ────────────────────────────────────────────────────────
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

import { AppProvider, useApp } from './context/AppContext';
import Nav     from './components/Nav';
import Footer  from './components/Footer';
import Toast   from './components/Toast';

import HomePage    from './pages/HomePage';
import MoviesPage  from './pages/MoviesPage';
import ScreensPage from './pages/ScreensPage';
import ShowsPage   from './pages/ShowsPage';
import BookingPage from './pages/BookingPage';
import AdminPage   from './pages/AdminPage';
import LoginPage from './pages/LoginPage';

// ── Scroll to top on route change ─────────────────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
}

// ── Toast renderer ────────────────────────────────────────────────────────────
function ToastRenderer() {
  const { toast, dispatch } = useApp();
  if (!toast) return null;
  return (
    <Toast
      msg={toast.msg}
      type={toast.type}
      onClose={() => dispatch({ type: 'CLEAR_TOAST' })}
    />
  );
}

// ── Protected Route — redirects to /login if no token ─────────────────────────
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('cinebook_token');
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

// ── Main Layout ───────────────────────────────────────────────────────────────
function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/"        element={<HomePage    />} />
          <Route path="/movies"  element={<MoviesPage  />} />
          <Route path="/screens" element={<ScreensPage />} />
          <Route path="/shows"   element={<ShowsPage   />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/login"   element={<LoginPage   />} />

          {/* Protected Admin Route */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          } />

          {/* 404 */}
          <Route path="*" element={
            <div style={{ textAlign:'center', padding:'120px 24px' }}>
              <div style={{ fontSize:'4rem', marginBottom:16 }}>🎬</div>
              <h2 style={{ fontFamily:'var(--f-display)', fontSize:'3rem', letterSpacing:4, marginBottom:8 }}>
                PAGE NOT FOUND
              </h2>
              <p style={{ color:'var(--muted)' }}>The reel seems to have run out.</p>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
      <ToastRenderer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppLayout />
      </AppProvider>
    </BrowserRouter>
  );
}
