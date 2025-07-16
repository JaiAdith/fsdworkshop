import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div style={{ padding: 32, textAlign: 'center' }}>
    <h1>Car Rental System</h1>
    <nav style={{ margin: '24px 0' }}>
      <Link to="/login" style={{ margin: 8 }}>Login</Link>
      <Link to="/register" style={{ margin: 8 }}>Register</Link>
      <Link to="/cars" style={{ margin: 8 }}>Cars</Link>
      <Link to="/bookings" style={{ margin: 8 }}>Bookings</Link>
      <Link to="/admin" style={{ margin: 8 }}>Admin</Link>
      <Link to="/profile" style={{ margin: 8 }}>Profile</Link>
    </nav>
    <p>Welcome to the Car Rental System. Please login or register to continue.</p>
  </div>
);

export default HomePage;