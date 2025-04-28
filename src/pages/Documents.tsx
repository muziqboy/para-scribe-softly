
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Header from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const Documents = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: documents, isLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('updated_at', { ascending: false });
        
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const createNewDocument = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('documents')
        .insert({
          owner_id: user.id,
          title: 'Untitled',
        })
        .select('*')
        .single();
        
      if (error) throw error;
      
      navigate(`/document/${data.id}`);
    } catch (error: any) {
      console.error('Error creating document:', error.message);
      toast({
        variant: "destructive",
        title: "Error creating document",
        description: error.message,
      });
    }
  };
  
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  
  return (
    <div className="min-h-screen bg-black text-[#F7F7F2]">
      <Helmet>
        <title>Your Documents - Inkwell</title>
        <meta name="description" content="View and manage your documents" />
      </Helmet>
      
      <Header currentApp="inkwell" />
      
      <main className="container-custom py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Documents</h1>
          
          <Button onClick={createNewDocument} className="bg-[#0077B6] hover:bg-[#0077B6]/90">
            <Plus size={18} className="mr-1" />
            New Document
          </Button>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="h-44 bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : documents && documents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {documents.map((doc) => (
              <Link 
                key={doc.id} 
                to={`/document/${doc.id}`}
                className="block no-underline"
              >
                <Card className="h-44 bg-white/5 hover:bg-white/10 hover:shadow-lg transition-all border border-white/10 overflow-hidden group">
                  <CardContent className="p-5 h-full flex flex-col">
                    <h3 className="font-medium text-lg mb-2 truncate group-hover:text-[#0077B6] transition-colors">
                      {doc.title || 'Untitled'}
                    </h3>
                    <div className="flex-1 text-sm text-gray-300 overflow-hidden">
                      {doc.content && typeof doc.content === 'object' ? 
                        "Click to open document" : 
                        "Empty document"}
                    </div>
                    <div className="mt-auto pt-2 text-xs text-gray-400">
                      Last edited: {new Date(doc.updated_at).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl mb-2">No documents yet</h3>
            <p className="text-gray-400 mb-6">Create your first document to get started</p>
            <Button onClick={createNewDocument} className="bg-[#0077B6] hover:bg-[#0077B6]/90">
              <Plus size={18} className="mr-1" />
              Create Document
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Documents;
