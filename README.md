# Car Rental System

Full-stack car rental system built with React, Node.js, Express and MongoDB.

## Features

- User registration and login (JWT based)
- Admin and customer roles
- CRUD operations for cars (admin)
- Book and manage rentals
- RESTful API backed by MongoDB
- React frontend with protected routes

## Project Structure

```
.
├── server         # Express + MongoDB backend
└── client         # React frontend (create-react-app or Vite)
```

## Backend Setup (`server`)

1. `cd server`
2. Copy `.env.example` to `.env` and fill in values
3. Install dependencies

```bash
npm install
```

4. Start development server (requires MongoDB running)

```bash
npm run dev
```

API will run on `http://localhost:5000`.

## Frontend Setup (`client`)

Create the React app (if not already):

```bash
npx create-react-app client
# OR using Vite
# npm create vite@latest client -- --template react
```

Inside `client`, install axios and react-router:

```bash
npm install axios react-router-dom
```

Start the frontend:

```bash
npm start
```

The app will be available at `http://localhost:3000`.

## Environment Variables

See `server/.env.example` for required variables.

## Next Steps / Suggestions

- Implement UI pages: Login, Register, Car List, Car Details, My Rentals, Admin Dashboard.
- Use React Context or Redux for auth state.
- Add unit/integration tests with Jest + Supertest.
- Containerize with Docker and docker-compose.
- Deploy to services like Render, Railway, or AWS.
