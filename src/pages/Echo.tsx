
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/layout/Header';

const Echo = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-ink-white text-ink-black">
      <Helmet>
        <title>Echo - Paradocs</title>
      </Helmet>

      <Header user={user} currentApp="echo" />

      <main className="container-custom pt-24 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8">Echo</h1>
          <p className="text-xl mb-8">Echo is a placeholder for the AI assistant application.</p>
          <p className="text-gray-500">
            This feature will be available in a future update.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Echo;
