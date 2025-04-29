
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageSquare } from 'lucide-react';

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
      <main className="container-custom pt-24 pb-20">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft size={16} className="mr-1" /> Back
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Echo AI Assistant</h1>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto bg-gray-50 rounded-lg p-8 text-center">
          <div className="mb-6 mx-auto bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center">
            <MessageSquare className="h-8 w-8 text-purple-600" />
          </div>
          
          <h2 className="text-2xl font-semibold mb-4">
            Echo AI Assistant Coming Soon
          </h2>
          
          <p className="text-gray-600 mb-8">
            Our intelligent AI assistant is currently in development. It will help you compose, edit, and analyze documents with human-like understanding.
          </p>
          
          <Link href="/docs">
            <Button>
              Explore Inkwell Documents
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
