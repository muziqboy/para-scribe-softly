
'use client';

import { useState, useRef, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Send, Plus, Sparkles, ChevronDown, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
};

export default function EchoPage() {
  const supabase = createClientComponentClient();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I'm Echo, your AI document assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [userSession, setUserSession] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Fetch user session on mount
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUserSession(data.session);
    };
    getUser();
  }, [supabase]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Create a user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };
    
    // Add user message to chat
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    
    // Set loading state
    setLoading(true);
    
    // In a real implementation, this would call an API endpoint
    // to process the message and get a response from the AI
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateResponse(input.trim()),
        timestamp: new Date(),
      };
      
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      setLoading(false);
    }, 1000);
  };

  // Simple response generator for demo purposes
  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi')) {
      return "Hello! How can I assist you with your documents today?";
    } else if (input.includes('help')) {
      return "I can help you analyze documents, extract information, summarize content, and answer questions about your documents. What specifically would you like help with?";
    } else if (input.includes('document') || input.includes('analyze')) {
      return "I'd be happy to analyze your documents. You can upload them through the Inkwell interface, and then I can help you extract insights, answer questions, or summarize the content.";
    } else if (input.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with?";
    } else {
      return "This is a placeholder response. Echo AI will be integrated with a real language model in a future update. For now, I can understand basic greetings, help requests, and document-related queries.";
    }
  };

  // Start a new conversation
  const handleNewChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Hello! I'm Echo, your AI document assistant. How can I help you today?',
        timestamp: new Date(),
      }
    ]);
  };
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 container mx-auto max-w-4xl pt-24 pb-6 px-4">
        {/* Header with title and new chat button */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Echo AI Assistant</h1>
            <p className="text-sm text-gray-500">Ask questions about your documents or get help with content</p>
          </div>
          <Button variant="outline" onClick={handleNewChat} className="flex items-center gap-1">
            <Plus className="h-4 w-4" /> New Chat
          </Button>
        </div>
        
        {/* Chat container */}
        <div className="flex flex-col h-[calc(100vh-220px)] bg-gray-50 rounded-lg border border-gray-200">
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex w-full mb-4",
                  message.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] p-4 rounded-lg",
                    message.role === 'user' 
                      ? "bg-blue-600 text-white rounded-br-none" 
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {message.role === 'assistant' ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-purple-100 text-purple-800">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">Echo</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage 
                            src={userSession?.user?.user_metadata?.avatar_url} 
                            alt="User" 
                          />
                          <AvatarFallback className="bg-blue-100 text-blue-800">
                            {userSession?.user?.email?.charAt(0).toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">You</span>
                      </div>
                    )}
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex max-w-[80%] p-4 bg-gray-100 text-gray-800 rounded-lg rounded-bl-none">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-purple-100 text-purple-800">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">Echo</span>
                </div>
                <div className="flex space-x-2 ml-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
                disabled={loading}
              />
              <Button type="submit" disabled={loading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <div className="flex justify-center mt-2">
              <p className="text-xs text-gray-500">
                <Sparkles className="inline h-3 w-3 mr-1" /> 
                Echo is in preview mode. Responses are placeholders.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
