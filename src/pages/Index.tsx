
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import Logo from '../components/ui/custom/Logo';
import { useAuth } from '../contexts/AuthContext';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-black">
      <Helmet>
        <title>Paradocs</title>
      </Helmet>
      
      <header className="w-full py-6">
        <div className="container-custom flex justify-between items-center">
          <Link to="/">
            <Logo className="text-white" />
          </Link>
          <nav className="flex items-center space-x-4 sm:space-x-6">
            <Link to="/about" className="text-white/80 hover:text-white font-medium">
              About
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-white/80 hover:text-white font-medium">
                  Dashboard
                </Link>
                <Button variant="ghost" onClick={signOut} className="text-white/80 hover:text-white">
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link to="/signin" className="text-white/80 hover:text-white font-medium">
                  Sign In
                </Link>
                <Link to="/signup">
                  <Button className="bg-white text-black hover:bg-white/90">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      
      <main className="container-custom pt-16 sm:pt-24 lg:pt-32 pb-20">
        <div className="max-w-6xl mx-auto space-y-24 sm:space-y-32">
          <div className="text-center">
            <h1 className="font-sans text-5xl sm:text-7xl lg:text-[120px] font-bold text-white leading-none">
              paradocs
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <div className="product-card space-y-6">
              <h2 className="text-4xl sm:text-5xl font-bold">inkwell</h2>
              <p className="text-lg sm:text-xl text-white/80 leading-relaxed">
                Your written past, transformed into a forward-thinking copilot
              </p>
            </div>

            <div className="product-card space-y-6">
              <h2 className="text-4xl sm:text-5xl font-bold">echo</h2>
              <p className="text-lg sm:text-xl text-white/80 leading-relaxed">
                An adaptive tutor that builds interactive learning experiences based on your needs
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
