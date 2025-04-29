
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ChevronLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { debounce } from '@/lib/utils';

export default function DocumentEditor() {
  const { id } = useParams();
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [document, setDocument] = useState<any>(null);
  const [title, setTitle] = useState('Untitled');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<p>Start writing...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      debouncedSave({ 
        content: JSON.stringify(editor.getJSON()),
        title 
      });
    },
  });
  
  useEffect(() => {
    const fetchDocument = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/');
        return;
      }
      
      if (!id) return;
      
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) {
        console.error('Error fetching document:', error);
        router.push('/docs');
        return;
      }
      
      if (data) {
        setDocument(data);
        setTitle(data.title);
        
        try {
          let content;
          if (typeof data.content === 'string') {
            content = JSON.parse(data.content);
          } else {
            content = data.content;
          }
          
          editor?.commands.setContent(content);
        } catch (e) {
          console.error('Error parsing document content:', e);
          editor?.commands.setContent('<p>Start writing...</p>');
        }
      }
      
      setLoading(false);
    };
    
    if (editor) {
      fetchDocument();
    }
  }, [editor, id, router, supabase]);
  
  const saveDocument = async (data: { content: string; title: string }) => {
    setSaving(true);
    
    const { error } = await supabase
      .from('documents')
      .update({
        title: data.title,
        content: data.content,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);
      
    if (error) {
      console.error('Error saving document:', error);
    }
    
    setSaving(false);
  };
  
  const debouncedSave = debounce(saveDocument, 1000);
  
  const handleManualSave = () => {
    if (editor) {
      saveDocument({
        content: JSON.stringify(editor.getJSON()),
        title
      });
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10 h-16">
        <div className="container-custom h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.push('/docs')}
              className="text-gray-500"
            >
              <ChevronLeft className="h-5 w-5 mr-1" /> Back
            </Button>
            
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                debouncedSave({ 
                  content: editor ? JSON.stringify(editor.getJSON()) : '',
                  title: e.target.value 
                });
              }}
              className="text-xl font-medium border-none focus:outline-none focus:ring-0"
              placeholder="Untitled"
            />
          </div>
          
          <Button
            onClick={handleManualSave}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            disabled={saving}
          >
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </header>
      
      <main className="container-custom max-w-4xl pt-28 pb-20">
        {editor && <EditorContent editor={editor} className="min-h-[70vh]" />}
      </main>
    </div>
  );
}
