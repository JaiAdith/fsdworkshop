import React, { useEffect, useState } from 'react';
import api from '../api';

const MyRentals = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    api
      .get('/rentals/me')
      .then((res) => setRentals(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>My Rentals</h2>
      <ul>
        {rentals.map((r) => (
          <li key={r._id} style={{ marginBottom: '0.5rem' }}>
            {r.car.make} {r.car.model} from{' '}
            {new Date(r.startDate).toLocaleDateString()} to{' '}
            {new Date(r.endDate).toLocaleDateString()} - {r.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyRentals;