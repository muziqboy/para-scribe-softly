
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { useAuth } from '@/contexts/AuthContext';

interface RootLayoutProps {
  children?: React.ReactNode;
  hideHeader?: boolean;
}

const RootLayout = ({ children, hideHeader = false }: RootLayoutProps) => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeader && <Header user={user} currentApp="inkwell" />}
      
      <main className="flex-1">
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default RootLayout;
