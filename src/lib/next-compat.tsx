import React from 'react';

// Create Next.js Image component replacement
export function Image({ src, alt, width, height, className }: { 
  src: string; 
  alt: string; 
  width?: number; 
  height?: number;
  className?: string;
}) {
  return (
    <img 
      src={src} 
      alt={alt} 
      width={width} 
      height={height}
      className={className}
    />
  );
}

// Create Next.js Link component replacement
export function Link({ href, className, children }: { 
  href: string; 
  className?: string; 
  children: React.ReactNode;
}) {
  // For internal links, we'd use react-router-dom's Link
  // For external links, we use a regular anchor tag
  const isExternal = href.startsWith('http') || href.startsWith('//');
  
  if (isExternal) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  
  // Since we're in a Vite app, we'll use a standard anchor tag
  // (this would normally use react-router-dom's Link but we're keeping it simple)
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

// Create Next.js Head component replacement
export function Head({ children }: { children: React.ReactNode }) {
  // This is a simple implementation that doesn't actually modify the document head
  // For a real implementation, we'd use react-helmet-async
  return <>{children}</>;
}

// Mock other Next.js functionality as needed
export const useRouter = () => {
  // Simple mock of Next.js router
  return {
    push: (path: string) => {
      window.location.href = path;
    },
    pathname: window.location.pathname,
    query: Object.fromEntries(new URLSearchParams(window.location.search)),
  };
};

// Export a fake "next/font" implementation
export const font = {
  variable: "",
  className: "",
  style: {}
};
