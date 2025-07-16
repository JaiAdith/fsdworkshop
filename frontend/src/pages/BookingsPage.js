import React, { useEffect, useState } from 'react';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Not logged in');
        const res = await fetch('/api/bookings', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        setError('Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (!localStorage.getItem('token')) {
    return <div style={{ maxWidth: 600, margin: '40px auto' }}><h2>Bookings</h2><p>Please login to view your bookings.</p></div>;
  }

  return (
    <div style={{ maxWidth: 800, margin: '40px auto' }}>
      <h2>Bookings</h2>
      {loading ? <p>Loading...</p> : error ? <p style={{ color: 'red' }}>{error}</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Car</th>
              <th>User</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking._id}>
                <td>{booking.car?.name || 'N/A'}</td>
                <td>{booking.user?.name || 'N/A'}</td>
                <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                <td>${booking.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingsPage;