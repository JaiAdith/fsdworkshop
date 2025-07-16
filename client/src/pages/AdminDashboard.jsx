import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const AdminDashboard = () => {
  const [cars, setCars] = useState([]);
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    api
      .get('/cars')
      .then((res) => setCars(res.data))
      .catch((err) => console.error(err));

    api
      .get('/rentals')
      .then((res) => setRentals(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Admin Dashboard</h2>

      <section style={{ marginTop: '1rem' }}>
        <h3>Cars</h3>
        <Link to="/admin/add-car">Add Car</Link>
        <ul>
          {cars.map((c) => (
            <li key={c._id} style={{ marginBottom: '0.5rem' }}>
              {c.make} {c.model} ({c.year}) - {c.status}
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: '1rem' }}>
        <h3>All Rentals</h3>
        <ul>
          {rentals.map((r) => (
            <li key={r._id} style={{ marginBottom: '0.5rem' }}>
              {r.user?.email || r.user?._id} - {r.car.make} {r.car.model} - {r.status}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;