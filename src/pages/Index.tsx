
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { FileText, Book } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Index = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-[#F1F0FB]">
      <nav className="absolute top-0 right-0 p-6 flex gap-4">
        <Link to="/about">
          <Button variant="ghost" className="text-paradocs-text hover:bg-black/5">
            About
          </Button>
        </Link>
        {user ? (
          <>
            <Link to="/dashboard">
              <Button variant="ghost" className="text-paradocs-text hover:bg-black/5">
                Dashboard
              </Button>
            </Link>
            <Button variant="ghost" onClick={signOut} className="text-paradocs-text hover:bg-black/5">
              Sign out
            </Button>
          </>
        ) : (
          <Link to="/auth">
            <Button variant="ghost" className="text-paradocs-text hover:bg-black/5">
              Sign in
            </Button>
          </Link>
        )}
      </nav>
      
      <main className="container-custom min-h-screen flex flex-col items-center justify-center">
        <div className="text-center space-y-12 max-w-3xl mx-auto">
          <div className="space-y-6">
            <h1 className="font-sans text-5xl font-bold text-[#111111]">
              Paradocs
            </h1>
            <p className="text-xl font-sans text-gray-600 tracking-tight mb-8">
              AI-powered document analysis and learning tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <Card className="p-6 bg-white hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="h-12 w-12 bg-paradocs-softblue rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-gray-700" />
                </div>
                <h2 className="text-2xl font-semibold">Inkwell</h2>
                <p className="text-gray-600">
                  Create, edit, and enhance documents with AI-powered assistance. Transform your writing process.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-white hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="h-12 w-12 bg-paradocs-softblue rounded-lg flex items-center justify-center">
                  <Book className="h-6 w-6 text-gray-700" />
                </div>
                <h2 className="text-2xl font-semibold">Echo</h2>
                <p className="text-gray-600">
                  Generate interactive flashcards and question banks from your study materials, PDFs, and video content.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
