
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import Logo from '@/components/ui/custom/Logo';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  useEffect(() => {
    if (user) {
      navigate('/documents');
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate('/documents');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { 
          redirectTo: `${window.location.origin}/auth/callback` 
        }
      });
      
      if (error) {
        throw error;
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };
  
  const handleMicrosoftSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'azure',
        options: { 
          redirectTo: `${window.location.origin}/auth/callback` 
        }
      });
      
      if (error) {
        throw error;
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-ink-white flex flex-col">
      <Helmet>
        <title>Sign In – Paradocs</title>
      </Helmet>
      
      <header className="w-full py-6">
        <div className="container-custom flex justify-between items-center">
          <Link to="/">
            <div className="flex items-center">
              <Logo />
              <span className="text-lg font-semibold ml-2 text-ink-black">Paradocs</span>
            </div>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link to="/about" className="text-ink-black hover:text-ink-accent transition-colors font-medium">
              About
            </Link>
            <Link to="/signup" className="text-ink-black hover:text-ink-accent transition-colors font-medium">
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-ink-black">Sign In</h2>
            <p className="mt-2 text-gray-600">
              Welcome back to Paradocs
            </p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-ink-black text-white hover:bg-ink-black/90" 
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-ink-black font-medium hover:text-ink-accent transition-colors">
                Sign Up
              </Link>
            </p>
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={handleGoogleSignIn}
              className="w-full bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-sm"
            >
              <img src="https://www.google.com/favicon.ico" className="w-5 h-5 mr-2" alt="Google" />
              Continue with Google
            </Button>
            
            <Button 
              onClick={handleMicrosoftSignIn}
              className="w-full bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-sm"
            >
              <img src="https://www.microsoft.com/favicon.ico" className="w-5 h-5 mr-2" alt="Microsoft" />
              Continue with Microsoft
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
