
# Car Rental System (MERN Stack)

## Project Structure

- `frontend/` — React app (client)
- `backend/` — Express + MongoDB API (server)

## Prerequisites
- Node.js & npm
- MongoDB (local or Atlas)

## Setup

### 1. Backend
```bash
cd backend
cp .env.example .env # or edit .env with your MongoDB URI and JWT secret
npm install
npm run dev
```

### 2. Frontend
```bash
cd frontend
npm install
npm start
```

## Features
- User registration & login
- Car listing (CRUD for admin)
- Booking cars

---

**API Endpoints:**
- `POST /api/users/register` — Register
- `POST /api/users/login` — Login
- `GET /api/cars` — List cars
- `POST /api/cars` — Add car (admin)
- `PUT /api/cars/:id` — Update car (admin)
- `DELETE /api/cars/:id` — Delete car (admin)
- `POST /api/bookings` — Book a car
- `GET /api/bookings` — List bookings

---

**Happy coding!**
