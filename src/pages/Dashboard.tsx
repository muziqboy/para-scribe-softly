// Dashboard.tsx — Paradocs full dashboard with TipTap Editor

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/ui/custom/Logo';
import ActionButtons, { ActionType } from '../components/features/ActionButtons';
import OutputDisplay from '../components/features/OutputDisplay';
import DocumentUpload from '../components/features/DocumentUpload';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const Dashboard = () => {
  const { signOut } = useAuth();
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Start writing your next document here...</p>',
    autofocus: 'end',
  });

  const handleActionSelect = async (action: ActionType) => {
    if (!editor || !editor.getText().trim()) {
      alert('Please enter some text first!');
      return;
    }

    setIsProcessing(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const inputText = editor.getText();
    let result = '';

    switch (action) {
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

  const handleFileUpload = (files: File[]) => {
    console.log('Files uploaded:', files);
  };

  const handlePrompt = async () => {
    if (!editor) return;

    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to, '\n', '\0');

    if (!selectedText.trim()) {
      alert('Please select some text first!');
      return;
    }

    setIsPromptOpen(false);
    setLoading(true);

    try {
      const response = await fetch('/api/prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: selectedText }),
      });
      const data = await response.json();

      if (data?.result) {
        editor.commands.insertContent(data.result);
        setAiResponse(data.result);
      }
    } catch (error) {
      console.error('Prompt error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (editor && aiResponse) {
      editor.commands.insertContent(aiResponse);
      setAiResponse('');
    }
  }, [aiResponse, editor]);

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
            <div className="border border-gray-300 rounded-lg p-4 bg-white min-h-[400px]">
              <EditorContent editor={editor} />
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsPromptOpen(true)}
                className="bg-black text-white py-2 px-6 rounded-full hover:bg-gray-800 transition"
              >
                Prompt
              </button>
            </div>
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

      {isPromptOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Send selected text to AI?</h2>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setIsPromptOpen(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handlePrompt}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <p className="mt-4 text-gray-500 text-center">Processing your request...</p>
      )}

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
