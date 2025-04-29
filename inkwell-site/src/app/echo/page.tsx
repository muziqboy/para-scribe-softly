
'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Message = {
  id: string;
  role: 'user' | 'assistant';
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
    
    // Simulate AI response (this would be replaced with an actual API call)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'This is a placeholder response. Echo AI will be integrated in a future update.',
        timestamp: new Date(),
      };
      
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      setLoading(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 container-custom max-w-4xl pt-24 pb-6">
        <h1 className="text-3xl font-bold mb-8">Echo AI Assistant</h1>
        
        <div className="flex flex-col h-[calc(100vh-200px)]">
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto pb-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[80%] ${
                  message.role === 'user' ? 'ml-auto bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
                } p-3 rounded-lg`}
              >
                <p>{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            ))}
            {loading && (
              <div className="bg-gray-100 text-gray-800 p-3 rounded-lg max-w-[80%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
          </div>
          
          {/* Chat input */}
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
        </div>
      </main>
    </div>
  );
}
