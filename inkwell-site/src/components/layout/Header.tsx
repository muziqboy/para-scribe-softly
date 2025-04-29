
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserButton } from '@/components/ui/UserButton';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  
  // Only show header on non-root pages or when user is authenticated
  const isRootPage = pathname === '/';
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (isRootPage) return null;
  
  return (
    <header 
      className={cn(
        "fixed top-0 z-50 w-full bg-white/70 backdrop-blur border-b border-gray-200/70",
        "transition-opacity duration-200",
        isScrolled ? "opacity-90" : "opacity-100"
      )}
    >
      <div className="container-custom flex h-16 items-center justify-between">
        <Link 
          href="/dashboard" 
          className="flex items-center space-x-2"
        >
          <span className="font-semibold text-xl">Paradocs</span>
        </Link>
        
        <UserButton />
      </div>
    </header>
  );
}
