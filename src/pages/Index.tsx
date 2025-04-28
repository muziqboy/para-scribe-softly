
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Text } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import RootLayout from '@/components/layout/RootLayout';

const Index = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Thank you for your interest!",
        description: "We'll notify you when Paradocs is ready.",
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <RootLayout hideHeader={true}>
      <Helmet>
        <title>Paradocs - Coming Soon</title>
        <meta name="description" content="Your own little custom AI copilot, coming soon." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 p-4">
        <div className="max-w-md w-full space-y-10 text-center">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="h-12 w-12 rounded-full bg-[#9b87f5] flex items-center justify-center">
                <Text className="text-white" size={24} />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-[#1A1F2C]">
              Paradocs
            </h1>
            <p className="text-xl text-gray-600">
              Your own little custom AI copilot
            </p>
            <p className="text-gray-500 mt-2">
              We're working hard to bring you a powerful AI assistant that understands your documents like never before.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-medium text-[#1A1F2C]">Be the first to know when we launch</h2>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="bg-[#9b87f5] hover:bg-[#8a76e5]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing up..." : "Notify me"}
                </Button>
              </div>
            </form>
          </div>
          
          <div className="text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Paradocs. All rights reserved.</p>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Index;
