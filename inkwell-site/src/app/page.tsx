
'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, BookText, MessageCircle } from 'lucide-react';

export default function HomePage() {
  const supabase = createClientComponentClient();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const handleEmailSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    // This would typically connect to a newsletter service
    // For now we'll just simulate success
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
    }, 1000);
  };
  
  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section */}
      <div className="bg-white">
        <header className="container-custom py-6 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold">Paradocs</span>
          </div>
          
          <Button 
            onClick={handleSignIn} 
            variant="outline"
            className="sm:ml-auto"
          >
            Sign in
          </Button>
        </header>
      </div>
      
      <main className="flex-1">
        <section className="container-custom py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Welcome to Paradocs
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              The all-in-one document management and AI assistant platform for teams and individuals.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
              <Button 
                onClick={handleSignIn} 
                className="px-8 py-6 text-lg"
              >
                Get Started <ArrowRight className="ml-2" />
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-20 max-w-4xl mx-auto">
              <div className="bg-gray-50 p-8 rounded-lg text-left">
                <div className="bg-blue-100 rounded-full p-3 w-fit mb-4">
                  <BookText className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Inkwell Documents</h3>
                <p className="text-gray-600 mb-4">
                  Create and collaborate on rich documents with our powerful editor. Support for tables, images, code blocks, and more.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg text-left">
                <div className="bg-purple-100 rounded-full p-3 w-fit mb-4">
                  <MessageCircle className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Echo AI Assistant</h3>
                <p className="text-gray-600 mb-4">
                  Your intelligent AI companion that helps you compose, edit, and analyze documents with human-like understanding.
                </p>
              </div>
            </div>
            
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-4">Stay updated</h3>
              
              {isSubscribed ? (
                <div className="bg-green-50 text-green-700 p-4 rounded-lg">
                  Thanks for subscribing! We'll keep you updated on the latest features.
                </div>
              ) : (
                <form onSubmit={handleEmailSubscribe} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                    required
                  />
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Subscribing..." : "Subscribe"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-50 py-12">
        <div className="container-custom">
          <div className="md:flex md:justify-between">
            <div className="mb-8 md:mb-0">
              <span className="text-xl font-semibold">Paradocs</span>
              <p className="mt-2 text-sm text-gray-600">
                The document platform for the future.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold mb-3">Product</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">Features</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">Pricing</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">API</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-3">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">About</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">Blog</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">Careers</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-3">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">Privacy</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">Terms</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Paradocs. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
