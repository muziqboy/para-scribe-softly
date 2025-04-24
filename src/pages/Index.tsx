
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Logo from '../components/ui/custom/Logo';

const Index = () => {
  const features = [
    {
      title: 'Rewrite',
      description: 'Transform your writing with different tones and styles',
      icon: '✏️',
    },
    {
      title: 'Summarize',
      description: 'Condense long documents into concise summaries',
      icon: '📝',
    },
    {
      title: 'LaTeXify',
      description: 'Convert plain text to professional LaTeX formatting',
      icon: '📄',
    },
    {
      title: 'Bulletify',
      description: 'Transform paragraphs into organized bullet points',
      icon: '•',
    },
  ];

  return (
    <div className="min-h-screen bg-paradocs-eggshell">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <Logo className="mx-auto mb-8" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              Your Smart Document Copilot
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Transform your writing with AI-powered tools that help you rewrite, summarize, 
              and format documents exactly the way you need them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Link to="/dashboard" className="btn-primary text-center text-lg">
                Start Writing Smarter
              </Link>
              <a href="#features" className="btn-secondary text-center text-lg">
                Explore Features
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Document Tools</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to perfect your writing and documents in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className="card-soft hover:shadow-md transition-shadow animate-fade-in"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Paradocs Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transform your documents in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-soft text-center">
              <div className="w-12 h-12 bg-paradocs-softblue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-semibold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Input Your Text</h3>
              <p className="text-muted-foreground">
                Paste your document or upload a file to get started
              </p>
            </div>

            <div className="card-soft text-center">
              <div className="w-12 h-12 bg-paradocs-softblue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-semibold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose an Action</h3>
              <p className="text-muted-foreground">
                Select what you want to do with your text
              </p>
            </div>

            <div className="card-soft text-center">
              <div className="w-12 h-12 bg-paradocs-softblue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-semibold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Results</h3>
              <p className="text-muted-foreground">
                Copy, download or continue editing your transformed text
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-paradocs-softblue">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your documents?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of writers, students, and professionals who use Paradocs to enhance their documents.
          </p>
          <Link to="/dashboard" className="btn-primary text-lg">
            Start Writing Smarter
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Logo />
            <div className="mt-6 md:mt-0">
              <p className="text-muted-foreground text-sm">
                © 2025 Paradocs. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
