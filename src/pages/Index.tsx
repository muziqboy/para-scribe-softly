
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Helmet } from 'react-helmet-async';
import { cn } from '@/lib/utils';
import Logo from '@/components/ui/custom/Logo';
import { Mail, ArrowRight, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

// Email validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type FormValues = z.infer<typeof formSchema>;

const Index = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    toast({
      title: "Thank you for joining!",
      description: "We'll notify you when Paradocs launches.",
      variant: "default",
    });
    
    form.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <Helmet>
        <title>Paradocs - Coming Soon</title>
        <meta name="description" content="Paradocs - Your AI copilot for documents coming soon" />
      </Helmet>
      
      <div className="container-custom py-16 md:py-24 min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl mx-auto text-center space-y-10">
          {/* Logo */}
          <div className="mb-6">
            <Logo className="h-16 w-16 mx-auto" />
          </div>
          
          {/* Main Content */}
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
          
          {/* Email Form */}
          <div className="mt-12 max-w-md mx-auto w-full">
            {!isSubmitted ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                                <Input 
                                  placeholder="Enter your email" 
                                  className="pl-10 h-12 border-purple-100 focus-visible:ring-purple-500" 
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
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
              </Form>
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
          
          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              {
                title: "AI Document Analysis",
                description: "Instantly extract insights from your documents with AI."
              },
              {
                title: "Smart Organization",
                description: "Organize and manage your documents effortlessly."
              },
              {
                title: "Collaborative Workspace",
                description: "Work together with your team in real-time."
              }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className={cn(
                  "p-6 rounded-xl border border-purple-100/60 bg-white/70",
                  "backdrop-blur-sm transition-all hover:shadow-md hover:-translate-y-1"
                )}
              >
                <h3 className="font-medium text-lg text-purple-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
