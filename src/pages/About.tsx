
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const About = () => {
  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <nav className="absolute top-0 left-0 p-6">
        <Link to="/">
          <Button variant="ghost" className="text-paradocs-text hover:bg-black/5">
            ← Back
          </Button>
        </Link>
      </nav>

      <main className="container-custom max-w-3xl mx-auto pt-32 pb-20">
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-paradocs-text">About Paradocs</h1>
          
          <div className="space-y-6 text-lg text-paradocs-text/80">
            <p>
              Paradocs is an advanced document processing assistant powered by artificial intelligence. 
              It seamlessly integrates with your existing workflow through Google Workspace and Microsoft 365, 
              transforming how you interact with and enhance your documents.
            </p>

            <p>
              Our AI-powered platform specializes in document analysis, content enhancement, 
              and intelligent formatting. Whether you're writing professional documentation, 
              academic papers, or business communications, Paradocs helps you achieve clarity 
              and precision in your writing.
            </p>

            <p>
              With features like intelligent rewriting, contextual summarization, and 
              format conversion, Paradocs serves as your personal document copilot, 
              helping you produce better content faster.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
