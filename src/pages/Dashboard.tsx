
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/ui/custom/Logo';
import DocumentCard from '../components/features/DocumentCard';
import { PlusCircle } from 'lucide-react';

const Dashboard = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  // Mocked documents array
  const documents = [
    { id: '1', title: 'Research Notes' },
    { id: '2', title: 'Startup Pitch Draft' },
    { id: '3', title: 'Paradocs Roadmap' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Dashboard – Paradocs</title>
      </Helmet>

      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="w-full py-6 bg-white/5 backdrop-blur-md border-b border-white/10">
          <div className="container-custom flex justify-between items-center">
            <Link to="/">
              <Logo />
            </Link>
            <nav className="flex items-center space-x-6">
              <Link to="/about" className="text-white/80 hover:text-white transition-colors">
                About
              </Link>
              <button
                onClick={signOut}
                className="text-white/80 hover:text-white transition-colors"
              >
                Sign Out
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container-custom pt-32 pb-20">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-medium">Your Documents</h1>
          <button
            onClick={() => navigate('/document/new')}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-black 
                     rounded-full hover:bg-white/90 transition-colors font-medium"
          >
            <PlusCircle className="w-5 h-5" />
            New Document
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <DocumentCard key={doc.id} {...doc} />
          ))}
        </div>
      </main>

      <footer className="py-8 bg-black/60 backdrop-blur-md border-t border-white/10">
        <div className="container-custom">
          <p className="text-center text-white/60 text-sm">
            © 2025 Paradocs. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
