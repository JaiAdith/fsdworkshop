import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem('userName');
  const email = localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (!email) {
    return <div style={{ maxWidth: 400, margin: '40px auto' }}><h2>User Profile</h2><p>Please login to view your profile.</p></div>;
  }

  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <h2>User Profile</h2>
      <p><b>Name:</b> {name || 'N/A'}</p>
      <p><b>Email:</b> {email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserProfilePage;