import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const Home = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    api
      .get('/cars')
      .then((res) => setCars(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Available Cars</h2>
      <ul>
        {cars.map((car) => (
          <li key={car._id} style={{ marginBottom: '0.5rem' }}>
            <Link to={`/cars/${car._id}`}>
              {car.make} {car.model} ({car.year}) - ${car.pricePerDay}/day
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;