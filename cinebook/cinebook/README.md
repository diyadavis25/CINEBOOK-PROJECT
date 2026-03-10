# 🎬 CINEBOOK — Online Movie Booking System

A premium, production-ready React frontend for an online movie ticket booking system.

---

## 🚀 Quick Start

```bash
# 1. Clone / extract the project
cd cinebook

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env and set REACT_APP_API_BASE_URL to your backend URL

# 4. Start development server
npm start

# 5. Open browser
# http://localhost:3000
```

---

## 📁 Project Structure

```
cinebook/
├── public/
│   └── index.html              ← HTML shell
├── src/
│   ├── App.jsx                 ← Root: Router + Context + Layout
│   ├── index.js                ← React entry point
│   ├── index.css               ← Global styles + CSS variables
│   │
│   ├── context/
│   │   └── AppContext.jsx      ← Global state (movies, screens, shows, bookings)
│   │
│   ├── pages/
│   │   ├── HomePage.jsx/css    ← Hero + Now Showing
│   │   ├── MoviesPage.jsx/css  ← All movies with genre filter
│   │   ├── ScreensPage.jsx/css ← Cinema screens
│   │   ├── ShowsPage.jsx/css   ← Scheduled showtimes
│   │   ├── BookingPage.jsx/css ← 3-step: Form → Seats → Ticket
│   │   └── AdminPage.jsx/css   ← Dashboard: add movies/screens/shows
│   │
│   ├── components/
│   │   ├── Nav.jsx/css         ← Sticky navbar
│   │   ├── MovieCard.jsx/css   ← Movie card component
│   │   ├── Toast.jsx/css       ← Notification toast
│   │   └── Footer.jsx/css      ← Site footer
│   │
│   ├── services/
│   │   └── api.js              ← Axios instance + all API methods
│   │
│   └── utils/
│       ├── constants.js        ← Seed data, enums, config
│       └── helpers.js          ← Formatters, validators, generators
│
├── .env                        ← Environment variables
├── package.json
└── README.md
```

---

## 🔌 Backend API Integration

Edit `src/services/api.js` or set `REACT_APP_API_BASE_URL` in `.env`.

The app uses seed data when offline. Once your backend is live, the API service
is fully wired — just connect and remove seed data from `AppContext.jsx`.

### Expected REST Endpoints

| Method | Endpoint              | Description           |
|--------|-----------------------|-----------------------|
| GET    | /api/movies           | Fetch all movies      |
| POST   | /api/movies           | Add a movie (admin)   |
| GET    | /api/screens          | Fetch all screens     |
| POST   | /api/screens          | Add a screen (admin)  |
| GET    | /api/shows            | Fetch all shows       |
| POST   | /api/shows            | Schedule a show       |
| GET    | /api/bookings         | List bookings (admin) |
| POST   | /api/bookings         | Create booking        |
| POST   | /api/auth/login       | Admin login           |

---

## 🛠 Tech Stack

- **React 18** — UI framework
- **React Router v6** — Client-side routing
- **Context API + useReducer** — Global state management
- **Axios** — HTTP client (wired, ready for backend)
- **CSS Variables** — Design tokens, no CSS framework needed
- **Bebas Neue + Montserrat** — Typography

---

## 🎨 Design System

| Token          | Value                    |
|----------------|--------------------------|
| `--bg`         | `#0a0a0f` (near black)   |
| `--red`        | `#e50914` (cinema red)   |
| `--gold`       | `#f5c518` (IMDb gold)    |
| `--f-display`  | Bebas Neue               |
| `--f-body`     | Montserrat               |

---

## 📦 Build for Production

```bash
npm run build
# Output in /build directory — deploy to Vercel, Netlify, or any static host
```

---

## 👨‍💻 Pages Overview

| Route      | Page          | Description                            |
|------------|---------------|----------------------------------------|
| `/`        | Home          | Hero banner + Now Showing section      |
| `/movies`  | Movies        | Full grid with genre filters           |
| `/screens` | Screens       | Screen cards with type & seat info     |
| `/shows`   | Shows         | Showtimes table with date filter       |
| `/booking` | Booking       | 3-step: Form → Seat Map → Ticket       |
| `/admin`   | Admin         | Add movies, screens, schedule shows    |

---

Made with ❤️ for cinema lovers. 🍿
