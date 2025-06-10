import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const AdminRoute = () => {
  const { user, isSuperadmin, loading } = useAuth();

  if (loading) {
    // You can replace this with a more sophisticated loading spinner
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-foreground">Loading...</div>
      </div>
    );
  }

  // If user is logged in AND is a superadmin, allow access.
  // Otherwise, redirect them to their regular dashboard.
  return user && isSuperadmin ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default AdminRoute;