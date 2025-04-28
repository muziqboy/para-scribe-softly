
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
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Paradocs - Select Application</title>
      </Helmet>

      <main className="container-custom py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Logo className="h-16 w-16" />
          </div>
          
          <h1 className="text-4xl font-bold mb-6">Welcome to Paradocs</h1>
          <p className="text-xl text-gray-300 mb-12">Select an application to continue</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Inkwell Card */}
            <Link to="/documents" className="no-underline">
              <div className={cn(
                "product-card group flex flex-col items-center justify-center h-64",
                "border border-white/10 relative overflow-hidden"
              )}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#F7F7F2]/5 to-[#0077B6]/5 opacity-50 group-hover:opacity-70 transition-opacity" />
                
                <BookText size={48} className="mb-4 text-[#F7F7F2]" />
                <h2 className="text-2xl font-bold text-[#F7F7F2]">Inkwell</h2>
                <p className="text-[#F7F7F2]/70 mt-2">Document editor & workspace</p>
              </div>
            </Link>

            {/* Echo Card */}
            <Link to="/echo" className="no-underline">
              <div className={cn(
                "product-card group flex flex-col items-center justify-center h-64",
                "border border-white/10 relative overflow-hidden"
              )}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#F7F7F2]/5 to-[#0077B6]/5 opacity-50 group-hover:opacity-70 transition-opacity" />
                
                <MessageSquare size={48} className="mb-4 text-[#F7F7F2]" />
                <h2 className="text-2xl font-bold text-[#F7F7F2]">Echo</h2>
                <p className="text-[#F7F7F2]/70 mt-2">Coming soon</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
