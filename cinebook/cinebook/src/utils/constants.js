// ─── CINEBOOK CONSTANTS ───────────────────────────────────────────────────────

export const SCREEN_TYPES = ['IMAX', 'Dolby Atmos', '4DX', 'Standard'];

export const SHOW_TIMES = [
  '09:00', '11:30', '14:00', '16:30', '19:00', '21:30', '23:59'
];

export const SEAT_ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
export const SEAT_COLS = 10;

export const SCREEN_TYPE_COLORS = {
  'IMAX':       '#e50914',
  'Dolby Atmos':'#f5c518',
  '4DX':        '#00e676',
  'Standard':   '#00d4ff',
};

export const SCREEN_TYPE_ICONS = {
  'IMAX':       '🎬',
  'Dolby Atmos':'🔊',
  '4DX':        '🌀',
  'Standard':   '🎞️',
};

// Seed data used when no backend available
export const SEED_MOVIES = [
  {
    _id: '1',
    name: 'Dune: Part Two',
    description: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against those who destroyed his family.',
    cast: 'Timothée Chalamet, Zendaya, Rebecca Ferguson',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&q=80',
    genre: 'Sci-Fi',
    duration: '166 min',
    rating: 'PG-13',
  },
  {
    _id: '2',
    name: 'Oppenheimer',
    description: 'The story of J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.',
    cast: 'Cillian Murphy, Emily Blunt, Matt Damon',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500&q=80',
    genre: 'Drama',
    duration: '180 min',
    rating: 'R',
  },
  {
    _id: '3',
    name: 'Interstellar Redux',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    cast: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain',
    poster: 'https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?w=500&q=80',
    genre: 'Sci-Fi',
    duration: '169 min',
    rating: 'PG-13',
  },
  {
    _id: '4',
    name: 'The Dark Knight Rises',
    description: 'Eight years after the Joker\'s reign of anarchy, Batman must come out of exile with the help of Selina Kyle.',
    cast: 'Christian Bale, Tom Hardy, Anne Hathaway',
    poster: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500&q=80',
    genre: 'Action',
    duration: '164 min',
    rating: 'PG-13',
  },
  {
    _id: '5',
    name: 'Blade Runner 2099',
    description: 'In a dystopian future, a blade runner uncovers a devastating threat to humanity hidden beneath neon-lit megacities.',
    cast: 'TBA – Upcoming Release',
    poster: 'https://images.unsplash.com/photo-1484950763426-56b5bf172dbb?w=500&q=80',
    genre: 'Sci-Fi',
    duration: '155 min',
    rating: 'R',
  },
  {
    _id: '6',
    name: 'Avatar: Horizon',
    description: 'Jake Sully and Neytiri face a new threat as conflict spreads across Pandora\'s unexplored territories.',
    cast: 'Sam Worthington, Zoe Saldana, Sigourney Weaver',
    poster: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=500&q=80',
    genre: 'Fantasy',
    duration: '192 min',
    rating: 'PG-13',
  },
];

export const SEED_SCREENS = [
  { _id: '1', name: 'Screen Alpha', type: 'IMAX',        seats: 280 },
  { _id: '2', name: 'Screen Beta',  type: 'Dolby Atmos', seats: 180 },
  { _id: '3', name: 'Screen Gamma', type: 'Standard',    seats: 120 },
  { _id: '4', name: 'Screen Delta', type: '4DX',         seats: 90  },
];

export const SEED_SHOWS = [
  { _id: 's1', movieId: '1', screenId: '1', date: '2026-03-15', time: '10:00' },
  { _id: 's2', movieId: '1', screenId: '2', date: '2026-03-15', time: '14:30' },
  { _id: 's3', movieId: '2', screenId: '1', date: '2026-03-16', time: '18:00' },
  { _id: 's4', movieId: '3', screenId: '3', date: '2026-03-15', time: '11:00' },
  { _id: 's5', movieId: '4', screenId: '2', date: '2026-03-17', time: '20:30' },
  { _id: 's6', movieId: '5', screenId: '4', date: '2026-03-18', time: '16:00' },
];

export const PRE_BOOKED_SEATS = [3, 7, 12, 18, 25, 33, 41, 48, 55, 62, 70];
