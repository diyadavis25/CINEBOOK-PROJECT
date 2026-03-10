# 🎬 CineBook Backend – Setup Guide

Node.js + Express + MongoDB REST API powering the CineBook frontend.

---

## 📁 Project Structure

```
cinebook-backend/
├── src/
│   ├── server.js                  ← Entry point
│   ├── controllers/
│   │   ├── movieController.js
│   │   ├── screenController.js
│   │   ├── showController.js
│   │   ├── bookingController.js
│   │   └── authController.js
│   ├── models/
│   │   ├── Movie.js
│   │   ├── Screen.js
│   │   ├── Show.js
│   │   └── Booking.js
│   ├── routes/
│   │   ├── movies.js
│   │   ├── screens.js
│   │   ├── shows.js
│   │   ├── bookings.js
│   │   └── auth.js
│   ├── middleware/
│   │   └── auth.js                ← JWT protect middleware
│   └── config/
│       └── seed.js                ← Database seeder
├── .env.example
├── package.json
└── README.md
```

---

## 🚀 Step-by-Step Setup

### Step 1 – Install Node.js

Download from https://nodejs.org and install **Node.js v18 or later**.

Verify installation:
```bash
node -v    # v18.x.x or higher
npm -v     # 9.x.x or higher
```

---

### Step 2 – Install MongoDB

**Option A – Local MongoDB**
1. Download from https://www.mongodb.com/try/download/community
2. Install and start the service:
   - Windows: MongoDB runs as a Windows Service automatically
   - macOS: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

**Option B – MongoDB Atlas (Cloud, Recommended for production)**
1. Go to https://cloud.mongodb.com and create a free account
2. Create a free M0 cluster
3. Click "Connect" → "Drivers" → copy the connection string
4. Replace `<password>` with your password in the string

---

### Step 3 – Clone & Install

```bash
# Navigate to your project folder
cd cinebook-backend

# Install all dependencies
npm install
```

This installs: `express`, `mongoose`, `jsonwebtoken`, `bcryptjs`, `cors`, `dotenv`, `nodemon`

---

### Step 4 – Configure Environment

Create a `.env` file in the root of `cinebook-backend/`:

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/cinebook
JWT_SECRET=your_super_secret_key_change_this
JWT_EXPIRES_IN=7d
ADMIN_PASSWORD=admin123
```

> ⚠️ Change `JWT_SECRET` to a long random string in production.
> For Atlas: `MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/cinebook`

---

### Step 5 – Seed the Database (Optional but Recommended)

Populate the database with sample movies, screens, and shows:

```bash
npm run seed
```

You should see:
```
Connected to MongoDB
✅  Seed complete! Movies: 3 | Screens: 4 | Shows: 4
```

---

### Step 6 – Start the Server

**Development mode** (auto-restarts on file changes):
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

You should see:
```
✅  MongoDB connected
🚀  CineBook API running on http://localhost:5000
```

---

### Step 7 – Connect Frontend

In your React frontend folder (`cinebook/`), open `.env`:

```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

This is already set! Start the frontend:
```bash
npm start
```

The frontend will now fetch live data from your backend instead of using seed data.

---

## 🔗 API Endpoints

### Movies
| Method | Endpoint          | Auth     | Description        |
|--------|-------------------|----------|--------------------|
| GET    | /api/movies       | Public   | Get all movies     |
| GET    | /api/movies/:id   | Public   | Get movie by ID    |
| POST   | /api/movies       | Admin    | Add new movie      |
| PUT    | /api/movies/:id   | Admin    | Update movie       |
| DELETE | /api/movies/:id   | Admin    | Delete movie       |

### Screens
| Method | Endpoint          | Auth     | Description        |
|--------|-------------------|----------|--------------------|
| GET    | /api/screens      | Public   | Get all screens    |
| GET    | /api/screens/:id  | Public   | Get screen by ID   |
| POST   | /api/screens      | Admin    | Add new screen     |
| PUT    | /api/screens/:id  | Admin    | Update screen      |
| DELETE | /api/screens/:id  | Admin    | Delete screen      |

### Shows
| Method | Endpoint          | Auth     | Description        |
|--------|-------------------|----------|--------------------|
| GET    | /api/shows        | Public   | Get all shows      |
| GET    | /api/shows/:id    | Public   | Get show by ID     |
| POST   | /api/shows        | Admin    | Schedule a show    |
| PUT    | /api/shows/:id    | Admin    | Update show        |
| DELETE | /api/shows/:id    | Admin    | Delete show        |

### Bookings
| Method | Endpoint           | Auth     | Description        |
|--------|--------------------|----------|--------------------|
| GET    | /api/bookings      | Admin    | Get all bookings   |
| GET    | /api/bookings/:id  | Public   | View one booking   |
| POST   | /api/bookings      | Public   | Create booking     |
| DELETE | /api/bookings/:id  | Admin    | Cancel booking     |

### Auth
| Method | Endpoint           | Auth     | Description        |
|--------|--------------------|----------|--------------------|
| POST   | /api/auth/login    | None     | Admin login → JWT  |

---

## 🔐 Authentication

The Admin Panel uses JWT. To get a token:

```bash
POST /api/auth/login
Content-Type: application/json

{ "username": "admin", "password": "admin123" }
```

Response:
```json
{ "token": "eyJhbGci...", "user": { "username": "admin", "role": "admin" } }
```

Include the token in protected requests:
```
Authorization: Bearer eyJhbGci...
```

The frontend stores it in `localStorage` under `cinebook_token` automatically.

---

## 📝 Sample Request – Create a Booking

```bash
POST /api/bookings
Content-Type: application/json

{
  "customerName": "John Doe",
  "phone": "9876543210",
  "address": "123 Main Street",
  "movieId": "<ObjectId from /api/movies>",
  "screenId": "<ObjectId from /api/screens>",
  "date": "2026-03-20",
  "time": "14:30",
  "seats": ["A1", "A2", "A3"]
}
```

---

## 🐛 Troubleshooting

**"MongoServerError: connect ECONNREFUSED"**
→ MongoDB is not running. Start it: `brew services start mongodb-community` (macOS) or `sudo systemctl start mongod` (Linux)

**"Error: Cannot find module 'express'"**
→ Run `npm install` again in the `cinebook-backend` folder.

**Frontend shows "Network Error"**
→ Make sure backend is running on port 5000 and REACT_APP_API_BASE_URL in the frontend .env is correct.

**Admin login fails**
→ Default password is `admin123`. Check your `.env` ADMIN_PASSWORD value.
