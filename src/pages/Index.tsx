
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Logo from '../components/ui/custom/Logo';
import { Button } from '../components/ui/button';
import { Google, Microsoft } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <nav className="absolute top-0 right-0 p-6">
        <Link to="/about">
          <Button variant="ghost" className="text-paradocs-text hover:bg-black/5">
            About
          </Button>
        </Link>
      </nav>
      
      <main className="container-custom min-h-screen flex flex-col items-center justify-center">
        <div className="text-center space-y-12">
          {/* Placeholder for Möbius strip logo */}
          <img 
            src="/mobius.gif" 
            alt="Paradocs Möbius Strip"
            className="w-24 h-24 mx-auto mb-8 opacity-80"
          />
          
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-paradocs-text">
              Paradocs
            </h1>
            <p className="text-xl md:text-2xl text-paradocs-text/80 font-light">
              Let's get started.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button 
              variant="outline" 
              size="lg"
              className="flex items-center gap-2 px-6 py-6 text-lg hover:bg-black/5"
            >
              <Google className="h-5 w-5" />
              Google Workspace
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="flex items-center gap-2 px-6 py-6 text-lg hover:bg-black/5"
            >
              <Microsoft className="h-5 w-5" />
              Microsoft 365
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
