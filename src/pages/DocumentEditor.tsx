
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/layout/Header';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { ChevronLeft, Menu, Save } from 'lucide-react';
import { debounce } from '@/lib/utils';

const DocumentEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('Untitled');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch document
  const { data: document, isLoading } = useQuery({
    queryKey: ['document', id],
    queryFn: async () => {
      if (!id) throw new Error('No document ID provided');
      
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id && !!user
  });

  // Set title when document loads
  useEffect(() => {
    if (document?.title) {
      setTitle(document.title);
    }
  }, [document]);

  // Create TipTap editor
  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl mx-auto focus:outline-none',
      },
    },
  });

  // Set up document content when it loads
  useEffect(() => {
    if (document && editor && !editor.isDestroyed) {
      try {
        if (document.content) {
          if (typeof document.content === 'string') {
            editor.commands.setContent(JSON.parse(document.content));
          } else {
            // Ensure we pass a valid content format to the editor
            const content = typeof document.content === 'object' ? document.content : '<p>Start writing...</p>';
            editor.commands.setContent(content);
          }
        } else {
          editor.commands.setContent('<p>Start writing...</p>');
        }
      } catch (error) {
        console.error('Error setting editor content:', error);
        editor.commands.setContent('<p>Start writing...</p>');
      }
    }
  }, [document, editor]);

  // Save document mutation
  const saveDocumentMutation = useMutation({
    mutationFn: async ({ title, content }: { title: string; content: any }) => {
      if (!id || !user) throw new Error('Cannot save document');
      
      const { error } = await supabase
        .from('documents')
        .update({
          title,
          content,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['document', id] });
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error saving document",
        description: error.message,
      });
    }
  });

  // Debounced save function
  const debouncedSave = useCallback(
    debounce(({ title, content }: { title: string; content: any }) => {
      saveDocumentMutation.mutate({ title, content });
    }, 5000),
    [id]
  );

  // Auto-save when content changes
  useEffect(() => {
    if (editor && !editor.isDestroyed) {
      const handleUpdate = () => {
        const content = editor.getJSON();
        debouncedSave({ title, content });
      };

      editor.on('update', handleUpdate);
      return () => {
        editor.off('update', handleUpdate);
      };
    }
  }, [editor, title, debouncedSave]);

  // Manual save
  const handleSave = () => {
    if (editor && !editor.isDestroyed) {
      saveDocumentMutation.mutate({
        title,
        content: editor.getJSON()
      });

      toast({
        title: "Document saved",
        description: "Your changes have been saved"
      });
    }
  };

  // Handle title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    debouncedSave({
      title: newTitle,
      content: editor?.getJSON() || {}
    });
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    navigate('/signin', { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen bg-ink-white text-ink-black">
      <Helmet>
        <title>{title || 'Untitled'} – Inkwell</title>
      </Helmet>

      <Header user={user} currentApp="inkwell" />

      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container-custom py-2 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link to="/documents">
              <Button variant="ghost" size="sm" className="text-[#F7F7F2]/70 hover:text-[#F7F7F2]">
                <ChevronLeft size={18} className="mr-1" />
                Back
              </Button>
            </Link>
            
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="bg-transparent border-none text-xl font-medium text-[#F7F7F2] focus:outline-none focus:ring-1 focus:ring-[#0077B6] px-2 py-1 rounded"
              placeholder="Untitled"
            />
          </div>

          <div className="flex items-center gap-2">
            <Drawer open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="sm" className="text-[#F7F7F2]/70 hover:text-[#F7F7F2]">
                  <Menu size={18} />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="bg-[#0A0A0A] text-[#F7F7F2] border-t border-white/10">
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-4">Document Outline</h3>
                  <p className="text-[#F7F7F2]/70 text-sm">Document outline will appear here when you add headings to your document.</p>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-2">Version History</h3>
                    <p className="text-[#F7F7F2]/70 text-sm">Version history will be available in a future update.</p>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-2">Inkwell Copilot</h3>
                    <p className="text-[#F7F7F2]/70 text-sm">AI writing assistance will be available in a future update.</p>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
            
            <Button 
              onClick={handleSave} 
              disabled={saveDocumentMutation.isPending} 
              className="bg-[#0077B6] hover:bg-[#0077B6]/90"
            >
              <Save size={18} className="mr-1" />
              {saveDocumentMutation.isPending ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </div>

      <main className="container-custom py-8 max-w-4xl mx-auto">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-white/10 rounded w-3/4"></div>
            <div className="h-6 bg-white/10 rounded w-1/2"></div>
            <div className="h-6 bg-white/10 rounded w-5/6"></div>
            <div className="h-6 bg-white/10 rounded w-2/3"></div>
          </div>
        ) : (
          <EditorContent editor={editor} className="min-h-[60vh]" />
        )}
      </main>
    </div>
  );
};

export default DocumentEditor;
