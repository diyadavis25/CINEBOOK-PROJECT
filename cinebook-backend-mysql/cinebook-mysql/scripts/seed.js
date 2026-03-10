// ─── SEED SCRIPT ─────────────────────────────────────────────────────────────
// Usage: node scripts/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Movie    = require('../models/Movie');
const Screen   = require('../models/Screen');
const Show     = require('../models/Show');
const User     = require('../models/User');

const MOVIES = [
  { name: 'Dune: Part Two', description: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge.', cast: 'Timothée Chalamet, Zendaya, Rebecca Ferguson', poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&q=80', genre: 'Sci-Fi', duration: '166 min', rating: 'PG-13' },
  { name: 'Oppenheimer', description: 'The story of J. Robert Oppenheimer and the development of the atomic bomb.', cast: 'Cillian Murphy, Emily Blunt, Matt Damon', poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500&q=80', genre: 'Drama', duration: '180 min', rating: 'R' },
  { name: 'Interstellar Redux', description: "A team explores a wormhole to ensure humanity's survival.", cast: 'Matthew McConaughey, Anne Hathaway', poster: 'https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?w=500&q=80', genre: 'Sci-Fi', duration: '169 min', rating: 'PG-13' },
  { name: 'The Dark Knight Rises', description: 'Batman comes out of exile to face a new threat.', cast: 'Christian Bale, Tom Hardy, Anne Hathaway', poster: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500&q=80', genre: 'Action', duration: '164 min', rating: 'PG-13' },
  { name: 'Blade Runner 2099', description: 'A blade runner uncovers a threat hidden in neon-lit megacities.', cast: 'TBA', poster: 'https://images.unsplash.com/photo-1484950763426-56b5bf172dbb?w=500&q=80', genre: 'Sci-Fi', duration: '155 min', rating: 'R' },
  { name: 'Avatar: Horizon', description: "Jake Sully faces a new threat across Pandora's territories.", cast: 'Sam Worthington, Zoe Saldana', poster: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=500&q=80', genre: 'Fantasy', duration: '192 min', rating: 'PG-13' },
];

const SCREENS = [
  { name: 'Screen Alpha', type: 'IMAX',        seats: 280 },
  { name: 'Screen Beta',  type: 'Dolby Atmos', seats: 180 },
  { name: 'Screen Gamma', type: 'Standard',    seats: 120 },
  { name: 'Screen Delta', type: '4DX',         seats: 90  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  // Clear existing
  await Promise.all([Movie.deleteMany(), Screen.deleteMany(), Show.deleteMany()]);
  console.log('Cleared existing data');

  // Seed movies & screens
  const movies  = await Movie.insertMany(MOVIES);
  const screens = await Screen.insertMany(SCREENS);
  console.log(`Inserted ${movies.length} movies, ${screens.length} screens`);

  // Seed shows
  const today = new Date().toISOString().split('T')[0];
  const shows = [
    { movieId: movies[0]._id, screenId: screens[0]._id, date: today, time: '10:00' },
    { movieId: movies[0]._id, screenId: screens[1]._id, date: today, time: '14:30' },
    { movieId: movies[1]._id, screenId: screens[0]._id, date: today, time: '18:00' },
    { movieId: movies[2]._id, screenId: screens[2]._id, date: today, time: '11:00' },
    { movieId: movies[3]._id, screenId: screens[1]._id, date: today, time: '20:30' },
    { movieId: movies[4]._id, screenId: screens[3]._id, date: today, time: '16:00' },
  ];
  await Show.insertMany(shows);
  console.log(`Inserted ${shows.length} shows`);

  // Seed admin user
  const existing = await User.findOne({ username: process.env.ADMIN_USERNAME || 'admin' });
  if (!existing) {
    await User.create({ username: process.env.ADMIN_USERNAME || 'admin', password: process.env.ADMIN_PASSWORD || 'Admin@123' });
    console.log('Admin user created – username: admin  password: Admin@123');
  } else {
    console.log('Admin user already exists, skipped');
  }

  console.log('\n🌱  Seeding complete!');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
