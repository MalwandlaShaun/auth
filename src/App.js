import React from 'react';
import { Routes,Route, Link } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Home from './Home';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import Dashboard from './shopify/App';
import Register from './Register';

const App = () => {
  return (
      <AuthProvider>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
      <Routes>
          <Route  path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route  path='/dashboard' element={<PrivateRoute  Dashboard={Dashboard}/>} />
          </Routes>
      </AuthProvider>
  );
};

export default App;
