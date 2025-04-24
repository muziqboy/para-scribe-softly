
import React from 'react';
import Logo from '../ui/custom/Logo';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <header className="w-full py-6 bg-white/60 backdrop-blur-md fixed top-0 z-50">
      <div className="container-custom flex justify-between items-center">
        <Link to="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex gap-8">
            <a href="#features" className="text-paradocs-text hover:text-black font-medium">Features</a>
            <a href="#how-it-works" className="text-paradocs-text hover:text-black font-medium">How it works</a>
          </nav>
          <div className="flex gap-4">
            <Link to="/dashboard" className="btn-secondary text-sm whitespace-nowrap">
              Dashboard
            </Link>
            <Link to="/" className="btn-primary text-sm whitespace-nowrap">
              Start Writing
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
