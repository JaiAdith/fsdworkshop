# 🚗 Car Rental System

A comprehensive full-stack car rental management system built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

### 🔐 Authentication & Authorization
- User registration and login
- JWT-based authentication
- Role-based access control (Admin/User)
- Protected routes

### 🚗 Car Management
- Browse available cars with advanced filtering
- Search cars by brand, model, location
- Filter by category, fuel type, transmission, price range
- Detailed car information pages
- Admin car management (CRUD operations)

### 📅 Booking System
- Make car reservations
- Real-time availability checking
- Booking conflict prevention
- Booking status management (pending, confirmed, active, completed, cancelled)
- User booking history

### 👤 User Management
- User profiles with personal information
- Address management
- Booking history and management
- Profile updates

### 📊 Admin Dashboard
- Business analytics and statistics
- Cars and bookings management
- Revenue tracking
- Fleet utilization reports

### 🎨 Modern UI/UX
- Responsive design with Chakra UI
- Beautiful animations and transitions
- Dark/Light mode support
- Mobile-friendly interface

## Tech Stack

### Frontend
- **React** - Frontend framework
- **Chakra UI** - Component library
- **Zustand** - State management
- **React Router** - Client-side routing
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd car-rental-system
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/car-rental
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=development
   PORT=5000
   ```

4. **Start the development servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   ```

   The application will be available at:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## Project Structure

```
car-rental-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── car.controller.js
│   │   ├── user.controller.js
│   │   └── booking.controller.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── car.model.js
│   │   ├── user.model.js
│   │   └── booking.model.js
│   ├── routes/
│   │   ├── car.route.js
│   │   ├── user.route.js
│   │   └── booking.route.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CarCard.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── CarsPage.jsx
│   │   │   ├── CarDetailsPage.jsx
│   │   │   ├── BookingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── UserDashboard.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── ProfilePage.jsx
│   │   ├── store/
│   │   │   ├── carStore.js
│   │   │   ├── userStore.js
│   │   │   └── bookingStore.js
│   │   └── App.jsx
│   └── package.json
├── .env.example
├── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Cars
- `GET /api/cars` - Get all cars (with filters)
- `GET /api/cars/:id` - Get single car
- `GET /api/cars/search` - Search cars
- `POST /api/cars` - Create car (admin only)
- `PUT /api/cars/:id` - Update car (admin only)
- `DELETE /api/cars/:id` - Delete car (admin only)

### Bookings
- `POST /api/bookings` - Create booking (protected)
- `GET /api/bookings/my-bookings` - Get user bookings (protected)
- `GET /api/bookings` - Get all bookings (admin only)
- `GET /api/bookings/:id` - Get single booking (protected)
- `PUT /api/bookings/:id/cancel` - Cancel booking (protected)
- `PUT /api/bookings/:id/status` - Update booking status (admin only)

## Scripts

```bash
# Development
npm run dev              # Start both frontend and backend in development
npm run build           # Build frontend for production
npm start               # Start production server

# Frontend only
cd frontend
npm run dev             # Start frontend development server
npm run build           # Build frontend
npm run preview         # Preview production build

# Backend only
cd backend
npm run dev             # Start backend with nodemon
```

## Database Models

### User Model
- Personal information (name, email, phone, dateOfBirth)
- Authentication (password, role)
- License information
- Address details

### Car Model
- Basic info (brand, model, year, color)
- Specifications (category, fuelType, transmission, seats)
- Pricing and availability
- Location and features
- Images and descriptions

### Booking Model
- User and car references
- Rental period (startDate, endDate)
- Pricing (totalDays, totalAmount)
- Status tracking
- Pickup/dropoff locations
- Additional details (damage reports, mileage, etc.)

## Key Features Implementation

### Authentication Flow
1. User registers with required information
2. Password is hashed using bcryptjs
3. JWT token is generated upon login
4. Protected routes validate JWT tokens
5. Role-based access for admin features

### Booking System
1. Real-time availability checking
2. Date conflict prevention
3. Automatic price calculation
4. Status workflow management
5. Cancellation handling

### Search & Filtering
1. Text search across multiple fields
2. Multiple filter combinations
3. Price range filtering
4. Real-time filter application

## Default Admin Account

To test admin features, you can create an admin user by:

1. Register a normal user
2. Manually update the user's role to 'admin' in the database
3. Or modify the user controller to create admin users

## Contributing

This project is designed for learning purposes. Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Future Enhancements

- [ ] Payment integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] SMS alerts
- [ ] Advanced reporting and analytics
- [ ] Car maintenance tracking
- [ ] Insurance management
- [ ] Multi-location support
- [ ] Mobile app
- [ ] Real-time chat support

## Support

For questions or issues, please refer to the code comments or create an issue in the repository.

---

Built with ❤️ for learning and development purposes.
