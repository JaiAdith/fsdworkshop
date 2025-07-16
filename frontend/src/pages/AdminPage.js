import React from 'react';

const AdminPage = () => {
  const isAdmin = localStorage.getItem('userEmail') === 'admin@admin.com';
  if (!isAdmin) {
    return <div style={{ maxWidth: 600, margin: '40px auto' }}><h2>Admin</h2><p>Access denied. Admins only.</p></div>;
  }
  return (
    <div style={{ maxWidth: 800, margin: '40px auto' }}>
      <h2>Admin Dashboard</h2>
      <p>Welcome, admin! Here you can manage cars, users, and bookings.</p>
      {/* Add admin features here */}
    </div>
  );
};

export default AdminPage;