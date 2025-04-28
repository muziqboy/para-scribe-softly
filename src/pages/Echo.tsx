
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Header from '@/components/layout/Header';

const Echo = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-ink-white text-ink-black">
        <div className="space-y-4 text-center">
          <div className="w-10 h-10 mx-auto rounded-full border-4 border-ink-accent border-t-transparent animate-spin"></div>
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="min-h-screen bg-ink-white">
      <Helmet>
        <title>Echo - Coming Soon</title>
        <meta name="description" content="Echo messaging application - coming soon" />
      </Helmet>
      
      <Header currentApp="echo" />
      
      <main className="container-custom py-16 flex flex-col items-center justify-center">
        <div className="bg-blue-50 p-4 rounded-full mb-6">
          <div className="text-ink-accent p-2 rounded-full bg-white">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="#0077B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-ink-black mb-6">Echo</h1>
        
        <div className="max-w-2xl text-center">
          <p className="text-xl text-gray-600 mb-12">
            Our messaging platform is currently in development.
            Echo will provide real-time communication with advanced features.
          </p>

          <div className="space-y-8">
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-3">Coming Features</h3>
              <ul className="space-y-2 text-left text-gray-600">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-ink-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Real-time messaging
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-ink-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  File sharing & collaboration
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-ink-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  End-to-end encryption
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-ink-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Intelligent message organization
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Echo;
