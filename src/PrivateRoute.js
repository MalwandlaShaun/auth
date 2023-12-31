import React from 'react';
import { Navigate } from 'react-router-dom';
//import { useAuth } from './AuthContext';

const PrivateRoute = ({ Dashboard, ...rest }) => {
  const isAuthenticated = true

  return (
    <>
    {isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
    </>
);
};
// import { Navigate, Outlet } from 'react-router-dom';

// const PrivateRoute = () => {
//     const auth = null; // determine if authorized, from context or however you're doing it

//     // If authorized, return an outlet that will render child elements
//     // If not, return element that will navigate to login page
//     return auth ? <Outlet /> : <Navigate to="/login" />;
// }


export default PrivateRoute;
