
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Plus, MoreVertical, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Document = {
  id: string;
  title: string;
  updated_at: string;
};

export default function DocsPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/');
        return;
      }
      
      // Fetch documents
      fetchDocuments();
    };
    
    checkAuth();
  }, [router, supabase]);
  
  const fetchDocuments = async () => {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('updated_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching documents:', error);
    } else {
      setDocuments(data || []);
    }
    
    setLoading(false);
  };
  
  const createNewDocument = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      router.push('/');
      return;
    }
    
    const { data, error } = await supabase
      .from('documents')
      .insert([{ 
        owner_id: session.user.id,
        title: 'Untitled Document',
        content: JSON.stringify({ type: 'doc', content: [{ type: 'paragraph' }] })
      }])
      .select()
      .single();
      
    if (error) {
      console.error('Error creating document:', error);
      return;
    }
    
    router.push(`/doc/${data.id}`);
  };
  
  return (
    <div className="min-h-screen bg-white">
      <main className="container-custom pt-24 pb-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Documents</h1>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                className={`p-2 ${viewType === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
                onClick={() => setViewType('grid')}
              >
                <Grid size={20} />
              </button>
              <button
                className={`p-2 ${viewType === 'list' ? 'bg-gray-100' : 'bg-white'}`}
                onClick={() => setViewType('list')}
              >
                <List size={20} />
              </button>
            </div>
            
            <Button 
              onClick={createNewDocument}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" /> New Document
            </Button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-xl">
            <h3 className="text-xl font-medium text-gray-700">No documents yet</h3>
            <p className="text-gray-500 mt-2 mb-6">Create your first document to get started</p>
            <Button 
              onClick={createNewDocument}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" /> Create Document
            </Button>
          </div>
        ) : (
          <div className={viewType === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 gap-6' : 'space-y-4'}>
            {documents.map((doc) => (
              <div 
                key={doc.id}
                className={`
                  bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer
                  ${viewType === 'list' ? 'flex justify-between items-center' : ''}
                `}
                onClick={() => router.push(`/doc/${doc.id}`)}
              >
                <div>
                  <h3 className="font-medium text-lg text-gray-800">{doc.title}</h3>
                  <p className="text-gray-500 text-sm">
                    {new Date(doc.updated_at).toLocaleDateString()}
                  </p>
                </div>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    // Show document options
                  }}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <MoreVertical size={18} className="text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
