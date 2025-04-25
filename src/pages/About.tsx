
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/ui/custom/Logo';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <div className="min-h-screen bg-[#f0eee6]">
      <Helmet>
        <title>About – Paradocs</title>
      </Helmet>
      
      <header className="w-full py-6">
        <div className="container-custom flex justify-between items-center">
          <Link to="/">
            <Logo />
          </Link>
          <nav className="flex items-center space-x-6">
            <Link to="/about" className="text-paradocs-text hover:text-black font-medium">
              About
            </Link>
            <Link to="/signin" className="text-paradocs-text hover:text-black font-medium">
              Sign In
            </Link>
            <Link to="/signup">
              <button className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800">
                Sign Up
              </button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container-custom max-w-3xl mx-auto pt-24 pb-20">
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
