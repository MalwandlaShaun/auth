
import { useNavigate, Link } from 'react-router-dom';

import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users');
      const existingUsers = response.data;
  
      // Check if email already exists
      const userExists = existingUsers.some(user => user.email === email);
      if (userExists) {
        alert('Registration failed: Email already exists');
        return;
      }
  
      // If email doesn't exist, proceed with registration
      await axios.post('http://localhost:8000/users', {
        email,
        password,
      });
  
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed');
    }
  };

  return (
    <div className='login-container'> 
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Email"
        className='input-field'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className='input-field'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='login-button' onClick={handleRegister}>Register</button>
      <p>Already have an account sign in <Link to="/login" >here</Link></p>
    </div>
  );
};

export default Register;
