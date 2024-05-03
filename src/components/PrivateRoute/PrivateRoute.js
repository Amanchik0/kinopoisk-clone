import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
const isAdmin = useSelector(state => state.user.isAdmin)
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  

  return children; 
};

export default PrivateRoute;
