import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const CarDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    api
      .get(`/cars/${id}`)
      .then((res) => setCar(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleBook = async () => {
    try {
      await api.post('/rentals', { carId: id, startDate, endDate });
      alert('Rental booked successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  if (!car) return <p style={{ padding: '1rem' }}>Loading...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>
        {car.make} {car.model} ({car.year})
      </h2>
      <p>Price per day: ${car.pricePerDay}</p>
      <p>Status: {car.status}</p>

      {user && car.status === 'available' && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Book this car</h3>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ marginRight: '0.5rem' }}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{ marginRight: '0.5rem' }}
          />
          <button onClick={handleBook}>Book</button>
        </div>
      )}
    </div>
  );
};

export default CarDetails;