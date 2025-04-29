
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { MessageSquare } from 'lucide-react';

export default function EchoPage() {
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
  
  return (
    <div className="min-h-screen bg-white">
      <main className="container-custom pt-24 pb-20 max-w-4xl">
        <div className="text-center">
          <MessageSquare size={48} className="text-purple-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">Echo Chat</h1>
          <p className="text-gray-600 mb-8">
            Echo chat assistant is coming soon. This page is a placeholder for the upcoming chat feature.
          </p>
          
          <div className="bg-purple-50 p-6 rounded-lg text-left">
            <h2 className="font-medium text-lg mb-2">What to expect from Echo:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>AI-powered document analysis and summaries</li>
              <li>Natural language queries about your documents</li>
              <li>Content generation assistance</li>
              <li>Research aid and fact-checking</li>
              <li>Integration with Inkwell document editor</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
