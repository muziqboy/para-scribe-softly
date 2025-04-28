
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Create Next.js Image component replacement
export function Image({ src, alt, width, height, className, priority, quality, ...props }: { 
  src: string; 
  alt: string; 
  width?: number; 
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  [key: string]: any;
}) {
  return (
    <img 
      src={src} 
      alt={alt} 
      width={width} 
      height={height}
      className={className}
      {...props}
    />
  );
}

// Create Next.js Link component replacement
export function Link({ href, className, children, prefetch, target, ...props }: { 
  href: string; 
  className?: string; 
  children: React.ReactNode;
  prefetch?: boolean;
  target?: string;
  [key: string]: any;
}) {
  // For internal links, we use react-router-dom's Link
  // For external links, we use a regular anchor tag
  const isExternal = href.startsWith('http') || href.startsWith('//');
  
  if (isExternal) {
    return (
      <a 
        href={href} 
        className={className} 
        target={target || "_blank"} 
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }
  
  // Use react-router-dom's Link for internal navigation
  return (
    <RouterLink to={href} className={className} {...props}>
      {children}
    </RouterLink>
  );
}

// Create Next.js Head component replacement using react-helmet-async
export function Head({ children }: { children: React.ReactNode }) {
  // This component should be used with HelmetProvider
  // We're already using react-helmet-async in the project
  return <>{children}</>;
}

// Mock other Next.js functionality as needed
export const useRouter = () => {
  // Simple mock of Next.js router
  return {
    push: (path: string) => {
      window.location.href = path;
    },
    replace: (path: string) => {
      window.location.replace(path);
    },
    pathname: window.location.pathname,
    query: Object.fromEntries(new URLSearchParams(window.location.search)),
    asPath: window.location.pathname + window.location.search,
    isReady: true,
  };
};

// Export a fake "next/font" implementation
export const font = {
  variable: "",
  className: "",
  style: {}
};

// Add additional Next.js compatibility as needed
export const usePathname = () => {
  return window.location.pathname;
};

export const useSearchParams = () => {
  return new URLSearchParams(window.location.search);
};

export default {
  Image,
  Link,
  Head,
  useRouter,
  usePathname,
  useSearchParams,
  font
};
