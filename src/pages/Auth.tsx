
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { LogIn } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    });
    
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleMicrosoftSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    });
    
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f0eee6] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-gray-600">
            Sign in to your account
          </p>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={handleGoogleSignIn}
            className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          >
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5 mr-2" alt="Google" />
            Continue with Google
          </Button>
          
          <Button 
            onClick={handleMicrosoftSignIn}
            className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          >
            <img src="https://www.microsoft.com/favicon.ico" className="w-5 h-5 mr-2" alt="Microsoft" />
            Continue with Microsoft
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
