import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import React from 'react';

interface Props {
  children: React.JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
