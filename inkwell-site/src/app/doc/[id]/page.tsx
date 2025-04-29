
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DocumentPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [document, setDocument] = useState<any>(null);
  const [title, setTitle] = useState('Untitled');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const id = params?.id as string;
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/');
        return;
      }
      
      if (id) {
        fetchDocument(id);
      }
    };
    
    checkAuth();
  }, [id, router, supabase]);
  
  const fetchDocument = async (documentId: string) => {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('id', documentId)
      .single();
      
    if (error) {
      console.error('Error fetching document:', error);
      setLoading(false);
      return;
    }
    
    setDocument(data);
    setTitle(data.title || 'Untitled');
    setLoading(false);
  };
  
  const handleSave = async () => {
    if (!document) return;
    
    setSaving(true);
    
    const { error } = await supabase
      .from('documents')
      .update({
        title,
        updated_at: new Date().toISOString(),
      })
      .eq('id', document.id);
      
    if (error) {
      console.error('Error saving document:', error);
    }
    
    setTimeout(() => setSaving(false), 1000);
  };
  
  return (
    <div className="min-h-screen bg-white">
      <div className="container-custom pt-24 pb-20">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <Link href="/docs">
                  <Button variant="outline" size="sm">
                    <ArrowLeft size={16} className="mr-1" /> Back
                  </Button>
                </Link>
                
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-2xl font-medium border-0 focus:border-b-2 focus:border-blue-500 focus:outline-none px-2 py-1"
                />
              </div>
              
              <Button onClick={handleSave} disabled={saving}>
                <Save size={16} className="mr-1" />
                {saving ? 'Saving...' : 'Save'}
              </Button>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg min-h-[500px]">
              <p className="text-gray-500 text-center">
                Editor will be implemented with Tiptap in the future.
                <br /><br />
                This is a placeholder for document ID: {id}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
