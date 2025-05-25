import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, UserRole } from '../contexts/AuthContext';
import { useWeb3 } from '../contexts/Web3Context';

type ProtectedRouteProps = {
  children: ReactNode;
  requiredRole: UserRole;
};

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isConnected } = useWeb3();
  const { currentUser } = useAuth();

  // If not connected, redirect to home
  if (!isConnected) {
    return <Navigate to="/" replace />;
  }

  // If connected but not the required role, redirect to appropriate page
  if (currentUser && currentUser.role !== requiredRole) {
    // Artists go to artist dashboard, everyone else to home
    if (currentUser.role === 'artist') {
      return <Navigate to="/artist-dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  // If everything is good, render the children
  return <>{children}</>;
};

export default ProtectedRoute;