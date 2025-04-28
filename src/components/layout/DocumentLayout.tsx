
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface DocumentLayoutProps {
  children?: React.ReactNode;
}

const DocumentLayout = ({ children }: DocumentLayoutProps) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  
  return (
    <div className="min-h-screen bg-ink-white">
      {children || <Outlet />}
    </div>
  );
};

export default DocumentLayout;
