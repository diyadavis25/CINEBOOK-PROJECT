// ─── SEED SCRIPT (MySQL) ──────────────────────────────────────────────────────
// Run: npm run seed
require('dotenv').config();
const db = require('./db');

async function seed() {
  console.log('🌱  Seeding CineBook MySQL database...');

  // Clear existing data
  await db.query('SET FOREIGN_KEY_CHECKS = 0');
  await db.query('TRUNCATE TABLE booked_seats');
  await db.query('TRUNCATE TABLE bookings');
  await db.query('TRUNCATE TABLE shows');
  await db.query('TRUNCATE TABLE screens');
  await db.query('TRUNCATE TABLE movies');
  await db.query('SET FOREIGN_KEY_CHECKS = 1');

  // Insert movies
  await db.query(`
    INSERT INTO movies (id, name, description, cast, poster, genre, duration, rating) VALUES
    ('1', 'Dune: Part Two',       'Paul Atreides unites with Chani and the Fremen on a warpath of revenge.', 'Timothée Chalamet, Zendaya, Rebecca Ferguson', 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&q=80', 'Sci-Fi',  '166 min', 'PG-13'),
    ('2', 'Oppenheimer',           'The story of J. Robert Oppenheimer and the development of the atomic bomb.', 'Cillian Murphy, Emily Blunt, Matt Damon',       'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500&q=80', 'Drama',   '180 min', 'R'),
    ('3', 'Interstellar Redux',    'Explorers travel through a wormhole in space to ensure humanity survival.',  'Matthew McConaughey, Anne Hathaway',            'https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?w=500&q=80', 'Sci-Fi',  '169 min', 'PG-13'),
    ('4', 'The Dark Knight Rises', 'Batman comes out of exile to face a new threat to Gotham City.',            'Christian Bale, Tom Hardy, Anne Hathaway',       'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500&q=80', 'Action',  '164 min', 'PG-13'),
    ('5', 'Blade Runner 2099',     'A blade runner uncovers a threat hidden beneath neon-lit megacities.',      'TBA',                                            'https://images.unsplash.com/photo-1484950763426-56b5bf172dbb?w=500&q=80', 'Sci-Fi',  '155 min', 'R'),
    ('6', 'Avatar: Horizon',       'Jake Sully faces a new threat as conflict spreads across Pandora.',         'Sam Worthington, Zoe Saldana, Sigourney Weaver', 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=500&q=80', 'Fantasy', '192 min', 'PG-13')
  `);

  // Insert screens
  await db.query(`
    INSERT INTO screens (id, name, type, seats) VALUES
    ('1', 'Screen Alpha', 'IMAX',        280),
    ('2', 'Screen Beta',  'Dolby Atmos', 180),
    ('3', 'Screen Gamma', 'Standard',    120),
    ('4', 'Screen Delta', '4DX',          90)
  `);

  // Insert shows
  await db.query(`
    INSERT INTO shows (id, movie_id, screen_id, date, time) VALUES
    ('s1', '1', '1', '2026-03-20', '10:00'),
    ('s2', '1', '2', '2026-03-20', '14:30'),
    ('s3', '2', '1', '2026-03-21', '18:00'),
    ('s4', '3', '3', '2026-03-21', '11:00'),
    ('s5', '4', '2', '2026-03-22', '20:30'),
    ('s6', '5', '4', '2026-03-22', '16:00')
  `);

  console.log('✅  Seed complete! 6 movies | 4 screens | 6 shows');
  process.exit(0);
}

seed().catch(err => { console.error('❌  Seed failed:', err.message); process.exit(1); });
