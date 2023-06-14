import React from 'react';
import { useAuth } from './AuthContext';

const Home = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h2>Welcome to the Home page!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
