
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/layout/Header';
import { useNavigate } from 'react-router-dom';
import { BookText, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const navigateToDocuments = () => {
    navigate('/documents');
  };

  const navigateToEcho = () => {
    navigate('/echo');
  };

  return (
    <div className="min-h-screen bg-ink-white text-ink-black">
      <Helmet>
        <title>Paradocs</title>
      </Helmet>

      <Header user={user} />

      <main className="container-custom pt-24 pb-20">
        <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Paradocs</h1>
        
        <div className="max-w-2xl mx-auto">
          <p className="text-lg text-center mb-12">
            Choose an application to get started
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-soft hover:shadow-float transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-blue-50 p-3 rounded-full">
                  <BookText size={24} className="text-ink-accent" />
                </div>
                <h2 className="text-2xl font-semibold ml-4">Inkwell</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Create, edit, and manage your documents with our powerful document editor.
              </p>
              <Button 
                onClick={navigateToDocuments}
                className="w-full bg-ink-accent hover:bg-ink-accent/90"
              >
                Open Inkwell
              </Button>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-soft hover:shadow-float transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-purple-50 p-3 rounded-full">
                  <MessageSquare size={24} className="text-purple-600" />
                </div>
                <h2 className="text-2xl font-semibold ml-4">Echo</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Chat with our AI assistant to get answers to your questions.
              </p>
              <Button 
                onClick={navigateToEcho}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Open Echo
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-gray-200">
        <div className="container-custom">
          <p className="text-center text-gray-500 text-sm">
            © 2025 Paradocs. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
