
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { LogOut, Settings, User, BookText, MessageSquare, Upload } from 'lucide-react';

export function UserButton() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };
  
  // Function to toggle dropdown
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  // Close dropdown when clicking outside
  const closeDropdown = () => setIsOpen(false);
  
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
      >
        <User className="h-5 w-5 text-gray-700" />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={closeDropdown}
          />
          <div className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-20">
            <div className="px-4 py-3">
              <p className="text-sm">Signed in as</p>
              <p className="truncate text-sm font-medium text-gray-900">user@example.com</p>
            </div>
            <div className="py-1">
              <Link 
                href="/dashboard" 
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                onClick={closeDropdown}
              >
                <BookText className="mr-3 h-4 w-4" />
                Dashboard
              </Link>
              <Link 
                href="/docs" 
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                onClick={closeDropdown}
              >
                <BookText className="mr-3 h-4 w-4" />
                Documents
              </Link>
              <Link 
                href="/echo" 
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                onClick={closeDropdown}
              >
                <MessageSquare className="mr-3 h-4 w-4" />
                Echo
              </Link>
            </div>
            <div className="py-1">
              <Link 
                href="#" 
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                onClick={closeDropdown}
              >
                <Upload className="mr-3 h-4 w-4" />
                Upload Documents
              </Link>
              <Link 
                href="/settings" 
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                onClick={closeDropdown}
              >
                <Settings className="mr-3 h-4 w-4" />
                Settings
              </Link>
            </div>
            <div className="py-1">
              <button
                onClick={() => {
                  closeDropdown();
                  handleSignOut();
                }}
                className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <LogOut className="mr-3 h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
