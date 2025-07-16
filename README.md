<h1 align="center">MERN Crash Course 🚀</h1>

![Demo App](/frontend/public/screenshot-for-readme.png)

[Video Tutorial on Youtube](https://youtu.be/Dukz-3mS3Us)

About This Course:

-   ⚛️ Tech Stack: React.js, Node.js, Express.js, MongoDB, Chakra UI
-   🔥 Build an API
-   📱 Responsive UI With React.js and ChakraUI
-   🐞 Error Handling
-   🌐 Deployment
-   🚀 And Many More Cool Features
-   ✅ This is a lot of work. Support my work by subscribing to the [Channel](https://www.youtube.com/@asaprogrammer_)

### Setup .env file

```shell
MONGO_URI=your_mongo_uri
PORT=5000
```

### Run this app locally

```shell
npm run build
```

### Start the app

```shell
npm run start
```

### I'll see you in the next one! 🚀

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
