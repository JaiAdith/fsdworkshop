import React, { useEffect, useState } from 'react';

const CarsPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showBooking, setShowBooking] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [bookingMsg, setBookingMsg] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch('/api/cars');
        const data = await res.json();
        setCars(data);
      } catch (err) {
        setError('Failed to fetch cars');
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const isLoggedIn = !!localStorage.getItem('token');
  const isAdmin = localStorage.getItem('userEmail') === 'admin@admin.com';

  const handleBook = (car) => {
    setSelectedCar(car);
    setShowBooking(true);
    setBookingMsg('');
    setStartDate('');
    setEndDate('');
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingMsg('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          car: selectedCar._id,
          startDate,
          endDate,
          totalPrice: selectedCar.pricePerDay * (Math.ceil((new Date(endDate) - new Date(startDate)) / (1000*60*60*24)) + 1),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Booking failed');
      setBookingMsg('Booking successful!');
    } catch (err) {
      setBookingMsg(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '40px auto' }}>
      <h2>Available Cars</h2>
      {loading ? <p>Loading...</p> : error ? <p style={{ color: 'red' }}>{error}</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Price/Day</th>
              <th>Available</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cars.map(car => (
              <tr key={car._id}>
                <td>{car.name}</td>
                <td>{car.brand}</td>
                <td>${car.pricePerDay}</td>
                <td>{car.available ? 'Yes' : 'No'}</td>
                <td>
                  {isLoggedIn && car.available && <button onClick={() => handleBook(car)}>Book</button>}
                  {isAdmin && <><button>Edit</button> <button>Delete</button></>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showBooking && selectedCar && (
        <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginTop: 24 }}>
          <h3>Book {selectedCar.name}</h3>
          <form onSubmit={handleBookingSubmit}>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
            <button type="submit">Confirm Booking</button>
            <button type="button" onClick={() => setShowBooking(false)} style={{ marginLeft: 8 }}>Cancel</button>
          </form>
          {bookingMsg && <p>{bookingMsg}</p>}
        </div>
      )}
    </div>
  );
};

export default CarsPage;