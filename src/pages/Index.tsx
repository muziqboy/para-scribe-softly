
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Helmet } from 'react-helmet-async';
import { cn } from '@/lib/utils';
import Logo from '@/components/ui/custom/Logo';
import { BookText, MessageSquare } from 'lucide-react';

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-ink-white text-ink-black">
        <div className="space-y-4 text-center">
          <Logo className="h-12 w-12 mx-auto" />
          <p className="text-lg animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="min-h-screen bg-ink-white text-ink-black">
      <Helmet>
        <title>Paradocs - Select Application</title>
      </Helmet>

      <main className="container-custom py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Logo className="h-16 w-16" />
          </div>
          
          <h1 className="text-4xl font-bold mb-6">Welcome to Paradocs</h1>
          <p className="text-xl text-gray-600 mb-12">Select an application to continue</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Inkwell Card */}
            <Link to="/documents" className="no-underline">
              <div className={cn(
                "group flex flex-col items-center justify-center h-64 p-8",
                "rounded-xl transition-all duration-300 bg-ink-white",
                "hover:shadow-float hover:-translate-y-1 border border-gray-200"
              )}>
                <div className="p-3 rounded-full bg-gray-100 group-hover:bg-blue-50 mb-6 transition-colors">
                  <BookText size={32} className="text-ink-black group-hover:text-ink-accent transition-colors" />
                </div>
                <h2 className="text-2xl font-bold text-ink-black group-hover:text-ink-accent transition-colors">Inkwell</h2>
                <p className="text-gray-600 mt-2 text-center">Document editor & workspace</p>
              </div>
            </Link>

            {/* Echo Card */}
            <Link to="/echo" className="no-underline">
              <div className={cn(
                "group flex flex-col items-center justify-center h-64 p-8",
                "rounded-xl transition-all duration-300 bg-ink-white",
                "hover:shadow-float hover:-translate-y-1 border border-gray-200"
              )}>
                <div className="p-3 rounded-full bg-gray-100 group-hover:bg-blue-50 mb-6 transition-colors">
                  <MessageSquare size={32} className="text-ink-black group-hover:text-ink-accent transition-colors" />
                </div>
                <h2 className="text-2xl font-bold text-ink-black group-hover:text-ink-accent transition-colors">Echo</h2>
                <p className="text-gray-600 mt-2 text-center">Coming soon</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
