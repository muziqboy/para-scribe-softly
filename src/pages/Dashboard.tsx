
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Logo from '../components/ui/custom/Logo';
import { useAuth } from '../contexts/AuthContext';
import TextEditor from '../components/features/TextEditor';
import ActionButtons, { ActionType } from '../components/features/ActionButtons';
import OutputDisplay from '../components/features/OutputDisplay';
import DocumentUpload from '../components/features/DocumentUpload';

const Dashboard = () => {
  const { signOut } = useAuth();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleActionSelect = async (action: ActionType) => {
    if (!inputText.trim()) {
      // Could use a toast here for better UX
      alert('Please enter some text first!');
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Process based on action type
    // In a real implementation, this would call the OpenAI API
    let result = '';
    
    switch(action) {
      case 'rewrite':
        result = `Rewritten version: ${inputText.split(' ').reverse().join(' ')}`;
        break;
      case 'summarize':
        result = `Summary: ${inputText.substring(0, inputText.length / 3)}...`;
        break;
      case 'expand':
        result = `${inputText}\n\nFurther explanation: This is an expanded version of your text with additional details and context to make it more comprehensive and informative.`;
        break;
      case 'latex':
        result = `\\documentclass{article}\n\\begin{document}\n${inputText}\n\\end{document}`;
        break;
      case 'bulletify':
        result = inputText.split('. ')
          .filter(sentence => sentence.trim())
          .map(sentence => `• ${sentence.trim()}`)
          .join('\n');
        break;
    }
    
    setOutputText(result);
    setIsProcessing(false);
  };
  
  const handleTextChange = (text: string) => {
    setInputText(text);
  };
  
  const handleFileUpload = (files: File[]) => {
    // In a real implementation, this would upload to Supabase storage
    console.log('Files uploaded:', files);
    // Display a success message or update the state
  };

  return (
    <div className="min-h-screen bg-[#f0eee6]">
      <Helmet>
        <title>Dashboard – Paradocs</title>
      </Helmet>
      
      <header className="w-full py-6 bg-white/60 backdrop-blur-md">
        <div className="container-custom flex justify-between items-center">
          <Link to="/">
            <Logo />
          </Link>
          <nav className="flex items-center space-x-6">
            <Link to="/about" className="text-paradocs-text hover:text-black font-medium">
              About
            </Link>
            <button 
              onClick={signOut} 
              className="text-paradocs-text hover:text-black font-medium"
            >
              Sign Out
            </button>
          </nav>
        </div>
      </header>
      
      <main className="container-custom pt-24 pb-20">
        <h1 className="text-3xl font-bold mb-8">Document Workspace</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <TextEditor onTextChange={handleTextChange} />
          </div>
          <div>
            <DocumentUpload onUpload={handleFileUpload} />
          </div>
        </div>
        
        <div className="mb-6">
          <ActionButtons onActionSelect={handleActionSelect} isProcessing={isProcessing} />
        </div>
        
        <div>
          <OutputDisplay output={outputText} isLoading={isProcessing} />
        </div>
      </main>
      
      <footer className="py-8 bg-white">
        <div className="container-custom">
          <p className="text-center text-muted-foreground text-sm">
            © 2025 Paradocs. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
