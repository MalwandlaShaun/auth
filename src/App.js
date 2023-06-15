import React, {useState} from 'react';
import { Routes,Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import {NotFound} from './NotFound';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import Dashboard from './shopify/App';
import Register from './Register';
import axios from 'axios';





const App = () => {

  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users');
      const users = response.data;

      const matchedUser = users.find(
        (user) => user.email === email && user.password === password 
      );

      console.log(users)
      if (matchedUser) {
        
        alert('Login successful!');
        navigate('/dashboard');
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  

  return (
      <AuthProvider>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login data={{email,setUsername, password, setPassword, handleLogin}} />} />
          <Route path="/register" element={<Register />} />
          <Route  path="/dashboard" element={<PrivateRoute   data={{email,setUsername, password, setPassword, Dashboard,handleLogin}}/>} />
          <Route path="*" element={<NotFound  />} />
          
          </Routes>
      </AuthProvider>
  );
};

export default App;
