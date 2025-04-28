
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Header from '@/components/layout/Header';

const Echo = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="min-h-screen bg-black">
      <Helmet>
        <title>Echo - Coming Soon</title>
      </Helmet>
      
      <Header currentApp="echo" />
      
      <main className="container-custom py-16 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-[#F7F7F2] mb-6">Echo</h1>
        <p className="text-xl text-[#F7F7F2]/70 mb-12">This application is coming soon.</p>
      </main>
    </div>
  );
};

export default Echo;
