
'use client';

import { useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function AuthCallback() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  
  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error during auth callback:', error);
        router.push('/');
        return;
      }
      
      if (data.session) {
        router.push('/dashboard');
      }
    };
    
    handleAuthCallback();
  }, [router, supabase]);
  
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-xl font-medium">Signing you in...</p>
      </div>
    </div>
  );
}
