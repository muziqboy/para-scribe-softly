
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AuthCallbackPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  
  useEffect(() => {
    const handleAuthCallback = async () => {
      const { error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error during auth callback:', error);
        router.push('/');
        return;
      }
      
      router.push('/dashboard');
    };
    
    handleAuthCallback();
  }, [router, supabase]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <h2 className="text-xl font-medium">Signing you in...</h2>
        <p className="text-gray-500 mt-2">Please wait while we complete the authentication.</p>
      </div>
    </div>
  );
}
