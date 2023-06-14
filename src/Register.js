// import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Send user registration data to the server
      const response = await axios.post('http://localhost:8000/users', {
        email,
        password,
      });

      // Handle the server response as needed
      console.log(response.data);
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};



// const Register = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { register } = useAuth();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     const success = await register(email, password)
//       if (success) {
//         // Registration successful, redirect to the login page
//       } else {
//         // Registration failed, handle the error
//         // You can show an error message or perform other actions
//         console.log('Registration failed');
//       }
    
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleRegister}>
//         <div>
//           <label>Email:</label>
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </div>
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

export default Register;
