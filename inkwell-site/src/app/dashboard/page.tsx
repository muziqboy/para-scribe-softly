
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { BookText, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/');
      }
    };
    
    checkAuth();
  }, [router, supabase]);
  
  const navigateToDocuments = () => {
    router.push('/docs');
  };

  const navigateToEcho = () => {
    router.push('/echo');
  };
  
  return (
    <div className="min-h-screen bg-white">
      <main className="container-custom pt-24 pb-20">
        <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Paradocs</h1>
        
        <div className="max-w-2xl mx-auto">
          <p className="text-lg text-center mb-12">
            Choose an application to get started
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-blue-50 p-3 rounded-full">
                  <BookText size={24} className="text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold ml-4">Inkwell</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Create, edit, and manage your documents with our powerful document editor.
              </p>
              <Button 
                onClick={navigateToDocuments}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Open Inkwell
              </Button>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
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
    </div>
  );
}
