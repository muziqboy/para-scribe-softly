
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/ui/custom/Logo';
import { Button } from '../components/ui/button';

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
            <h1 className="font-sans text-5xl font-bold">
              Paradocs
            </h1>
            <p className="text-xl font-sans text-gray-600 tracking-tight mb-8">
              Let’s get started.
            </p>

          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button 
              variant="outline" 
              size="lg"
              className="flex items-center gap-2 px-6 py-6 text-lg hover:bg-black/5"
            >
              Google Workspace
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="flex items-center gap-2 px-6 py-6 text-lg hover:bg-black/5"
            >
              Microsoft 365
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
