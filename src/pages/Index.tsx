import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import Logo from '../components/ui/custom/Logo';
import { useAuth } from '../contexts/AuthContext';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-[#f0eee6]">
      <Helmet>
        <title>Paradocs</title>
      </Helmet>
      
      <header className="w-full py-6">
        <div className="container-custom flex justify-between items-center">
          <Link to="/">
            <Logo />
          </Link>
          <nav className="flex items-center space-x-6">
            <Link to="/about" className="text-paradocs-text hover:text-black font-medium">
              About
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-paradocs-text hover:text-black font-medium">
                  Dashboard
                </Link>
                <Button variant="ghost" onClick={signOut} className="text-paradocs-text hover:bg-black/5">
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link to="/signin" className="text-paradocs-text hover:text-black font-medium">
                  Sign In
                </Link>
                <Link to="/signup">
                  <Button className="bg-black text-white hover:bg-gray-800">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      
      <main className="container-custom pt-24 pb-20">
        <div className="max-w-3xl mx-auto space-y-20">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="font-sans text-5xl font-bold text-[#111111]">
              Paradocs
            </h1>
            <p className="text-xl font-sans text-gray-600 tracking-tight">
              AI-powered document analysis and learning tools
            </p>
            {!user && (
              <div className="mt-10 flex justify-center gap-4">
                <Link to="/signin">
                  <Button variant="outline" className="text-paradocs-text">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-black text-white hover:bg-gray-800">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Product Section */}
          <div className="space-y-12">
            <h2 className="text-3xl font-semibold text-center">Our Products</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Inkwell Card */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Inkwell</h3>
                <p className="text-gray-600">
                  Create, edit, and enhance documents with AI-powered assistance. Transform your writing process with intelligent suggestions, context-aware edits, and seamless formatting.
                </p>
                <div className="h-64 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                  <p className="text-xl text-gray-500">Inkwell Preview</p>
                </div>
              </div>

              {/* Echo Card */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Echo</h3>
                <p className="text-gray-600">
                  Generate interactive flashcards and question banks from your study materials, PDFs, and video content. Retain information more effectively with personalized learning tools.
                </p>
                <div className="h-64 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                  <p className="text-xl text-gray-500">Echo Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
