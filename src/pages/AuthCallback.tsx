
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Handle the OAuth callback
    const handleAuthCallback = async () => {
      try {
        // The hash fragment contains the access token and other OAuth info
        const { error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        // On successful auth, redirect to dashboard
        toast({
          title: "Success",
          description: "You have successfully logged in!",
        });
        navigate('/dashboard');
      } catch (error: any) {
        console.error('Error during auth callback:', error);
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: error.message || "Failed to complete authentication",
        });
        navigate('/signin');
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  // Show a loading state while processing
  return (
    <div className="min-h-screen bg-[#f0eee6] flex items-center justify-center">
      <div className="bg-white shadow-md rounded-md p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Completing login...</h1>
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      </div>
    </div>
  );
};

export default AuthCallback;
