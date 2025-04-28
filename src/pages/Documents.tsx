
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, BookText, FileText, FileImage } from 'lucide-react';
import Header from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { formatRelativeTime } from '@/lib/utils';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Documents = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
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

  const handleSlideNotImplemented = () => {
    toast({
      title: "Coming Soon",
      description: "Slide editor is not yet implemented",
    });
    setIsCreateDialogOpen(false);
  };

  const handleInkwellAINotImplemented = () => {
    toast({
      title: "Coming Soon",
      description: "Inkwell AI assistant is not yet implemented",
    });
    setIsCreateDialogOpen(false);
  };
  
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-ink-white">
        <div className="space-y-4 text-center">
          <div className="w-10 h-10 mx-auto rounded-full border-4 border-ink-accent border-t-transparent animate-spin"></div>
          <p className="text-lg">Loading your documents...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  
  return (
    <div className="min-h-screen bg-ink-white">
      <Helmet>
        <title>Your Documents - Inkwell</title>
        <meta name="description" content="View and manage your documents" />
      </Helmet>
      
      <Header currentApp="inkwell" />
      
      <main className="container-custom py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-ink-black">Your Documents</h1>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-ink-accent hover:bg-ink-accent/90 text-white">
                <Plus size={18} className="mr-1" />
                Create
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New</DialogTitle>
                <DialogDescription>
                  Choose what you want to create
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <button
                  onClick={() => {
                    createNewDocument();
                    setIsCreateDialogOpen(false);
                  }}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors text-ink-black"
                >
                  <FileText size={24} className="text-ink-accent" />
                  <span className="font-medium">Document</span>
                </button>
                <button
                  onClick={handleSlideNotImplemented}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors text-ink-black"
                >
                  <FileImage size={24} className="text-orange-500" />
                  <span className="font-medium">Slide</span>
                </button>
                <button
                  onClick={handleInkwellAINotImplemented}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors text-ink-black"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
                    <path d="M12 3C16.982 3 21 7.018 21 12C21 16.982 16.982 21 12 21C7.018 21 3 16.982 3 12C3 7.018 7.018 3 12 3ZM12 5C8.134 5 5 8.134 5 12C5 15.866 8.134 19 12 19C15.866 19 19 15.866 19 12C19 8.134 15.866 5 12 5ZM9 14.25L15 14.25C15.414 14.25 15.75 14.586 15.75 15C15.75 15.414 15.414 15.75 15 15.75L9 15.75C8.586 15.75 8.25 15.414 8.25 15C8.25 14.586 8.586 14.25 9 14.25ZM9 11.25L15 11.25C15.414 11.25 15.75 11.586 15.75 12C15.75 12.414 15.414 12.75 15 12.75L9 12.75C8.586 12.75 8.25 12.414 8.25 12C8.25 11.586 8.586 11.25 9 11.25ZM9 8.25L15 8.25C15.414 8.25 15.75 8.586 15.75 9C15.75 9.414 15.414 9.75 15 9.75L9 9.75C8.586 9.75 8.25 9.414 8.25 9C8.25 8.586 8.586 8.25 9 8.25Z" fill="currentColor"/>
                  </svg>
                  <span className="font-medium">Inkwell AI</span>
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="h-44 bg-gray-50 animate-pulse" />
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
                <Card className="h-44 bg-white hover:shadow-md transition-all border border-gray-200 overflow-hidden group">
                  <CardContent className="p-5 h-full flex flex-col">
                    <div className="flex items-center mb-2">
                      <BookText size={16} className="text-gray-400 mr-2" />
                      <h3 className="font-medium text-lg truncate text-ink-black group-hover:text-ink-accent transition-colors">
                        {doc.title || 'Untitled'}
                      </h3>
                    </div>
                    <div className="flex-1 text-sm text-gray-600 overflow-hidden line-clamp-3">
                      {doc.content && typeof doc.content === 'object' ? 
                        "Click to open document" : 
                        "Empty document"}
                    </div>
                    <div className="mt-auto pt-2 text-xs text-gray-500">
                      Last edited: {formatRelativeTime(doc.updated_at)}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200">
            <BookText size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl mb-2">No documents yet</h3>
            <p className="text-gray-500 mb-6">Create your first document to get started</p>
            <Button 
              onClick={createNewDocument} 
              className="bg-ink-accent hover:bg-ink-accent/90 text-white"
            >
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
