import React from 'react';
import { Routes,Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import {NotFound} from './NotFound';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import Dashboard from './shopify/App';
import Register from './Register';

const App = () => {
  return (
      <AuthProvider>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route  path="/dashboard" element={<PrivateRoute  Dashboard={Dashboard}/>} />
          <Route path="*" element={<NotFound  />} />
          
          </Routes>
      </AuthProvider>
  );
};

export default App;
