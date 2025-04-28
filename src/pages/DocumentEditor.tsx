
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/custom/Logo';
import { Link } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const DocumentEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: document, isLoading } = useQuery({
    queryKey: ['document', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const editor = useEditor({
    extensions: [StarterKit],
    content: document?.content || '<p>Start writing...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
  });

  const saveDocument = async () => {
    if (!editor || !id) return;

    try {
      const { error } = await supabase
        .from('documents')
        .update({
          content: editor.getJSON(),
          title: document?.title || 'Untitled',
        })
        .eq('id', id);

      if (error) throw error;
    } catch (error: any) {
      console.error('Error saving document:', error.message);
    }
  };

  useEffect(() => {
    if (document && editor && !editor.isDestroyed) {
      editor.commands.setContent(document.content || '<p>Start writing...</p>');
    }
  }, [document, editor]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{document?.title || 'Untitled'} – Paradocs</title>
      </Helmet>

      <header className="w-full py-4 px-6 border-b border-gray-200">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link to="/documents">
              <Logo />
            </Link>
            <input
              type="text"
              value={document?.title || 'Untitled'}
              className="text-xl font-medium bg-transparent border-none focus:outline-none"
              placeholder="Untitled"
              onChange={(e) => {
                // Update title logic will be implemented later
              }}
            />
          </div>
          <Button
            onClick={saveDocument}
            className="bg-black text-white hover:bg-gray-800"
          >
            Save
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-8 px-4">
        <EditorContent editor={editor} />
      </main>
    </div>
  );
};

export default DocumentEditor;
