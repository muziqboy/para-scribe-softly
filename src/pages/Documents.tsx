
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/custom/Logo';
import { PlusIcon } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  updated_at: string;
}

const Documents = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const { data: documents, isLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('documents')
        .select('id, title, updated_at')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data as Document[];
    }
  });

  const createNewDocument = async () => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .insert([{ owner_id: user?.id }])
        .select()
        .single();

      if (error) throw error;
      navigate(`/document/${data.id}`);
    } catch (error: any) {
      console.error('Error creating document:', error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0eee6]">
      <Helmet>
        <title>My Documents – Paradocs</title>
      </Helmet>

      <header className="w-full py-6 bg-white shadow-sm">
        <div className="container-custom flex justify-between items-center">
          <Link to="/">
            <Logo />
          </Link>
          <nav className="flex items-center space-x-6">
            <Button 
              onClick={createNewDocument}
              className="bg-black text-white hover:bg-gray-800"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              New Document
            </Button>
            <button
              onClick={signOut}
              className="text-gray-600 hover:text-black font-medium"
            >
              Sign Out
            </button>
          </nav>
        </div>
      </header>

      <main className="container-custom py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-40 bg-white rounded-lg shadow-sm animate-pulse"
              />
            ))}
          </div>
        ) : documents?.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              No documents yet
            </h2>
            <p className="text-gray-500 mb-8">
              Create your first document to get started
            </p>
            <Button 
              onClick={createNewDocument}
              className="bg-black text-white hover:bg-gray-800"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Create Document
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents?.map((doc) => (
              <Link
                key={doc.id}
                to={`/document/${doc.id}`}
                className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium text-lg mb-2 truncate">
                  {doc.title}
                </h3>
                <p className="text-sm text-gray-500">
                  Last edited{' '}
                  {new Date(doc.updated_at).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Documents;
