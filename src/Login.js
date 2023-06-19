//import React, { useState } from 'react';
import { Link, } from 'react-router-dom';
//import axios from 'axios';
import "./Login.css"; 
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { login } from './features/auth/authSlice';
const Login = ({data}) => {

//const {email,setUsername, password, setPassword, handleLogin} = data

const { email, password, setPassword, setUsername } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

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
      <button className="login-button" onClick={()=> {
            dispatch(login());

      }}>Login</button>
    
    <p>Don't have an account sign up <Link to="/register" >here</Link></p>
    </div>

  );
};




export default Login;
