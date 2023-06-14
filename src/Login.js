import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Login.css";
const Login = () => {



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
        navigate('/dashboard');
        alert('Login successful!');
        
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input
        type="email"
        placeholder="email"
        className="input-field"
        value={email}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="input-field"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>Login</button>
    
    <p>Don't have an account sign up <Link to="/register" >here</Link></p>
    </div>

  );
};




export default Login;
