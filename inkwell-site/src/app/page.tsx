
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, ArrowRight, Check } from 'lucide-react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        router.push('/dashboard');
      } else {
        setLoading(false);
      }
    };
    
    checkUser();
  }, [router, supabase]);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
  };

  const signInWithMicrosoft = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <header className="absolute top-0 right-0 p-6 z-10">
        <div className="flex gap-4">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/about')}
            className="text-gray-600 hover:text-black"
          >
            About
          </Button>
          <Button 
            onClick={signInWithGoogle}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Sign in
          </Button>
        </div>
      </header>
      
      <div className="container-custom py-16 md:py-24 min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl mx-auto text-center space-y-10">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-2">
              Coming Soon
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Welcome to <span className="text-purple-600">Paradocs</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your AI-powered document assistant. Simplify your document workflows with our intelligent copilot.
            </p>
          </div>
          
          <div className="mt-12 max-w-md mx-auto w-full">
            {!isSubmitted ? (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                    <Input 
                      placeholder="Enter your email" 
                      className="pl-10 h-12 border-purple-100 focus-visible:ring-purple-500" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white h-12 px-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Subscribing..."
                    ) : (
                      <>
                        Notify me <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 flex items-center justify-center space-x-2 animate-fade-in">
                <Check className="text-purple-600 h-5 w-5" />
                <p className="text-purple-800">Thank you! We'll keep you updated.</p>
              </div>
            )}
            
            <p className="text-gray-500 text-sm mt-3 text-center">
              We'll notify you when we launch. No spam, ever.
            </p>
          </div>
          
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={signInWithGoogle}
              className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 px-6 py-3 rounded-md shadow-sm"
            >
              <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
              Sign in with Google
            </Button>
            <Button
              onClick={signInWithMicrosoft}
              className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 px-6 py-3 rounded-md shadow-sm"
            >
              <img src="https://www.microsoft.com/favicon.ico" className="w-5 h-5" alt="Microsoft" />
              Sign in with Microsoft
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
