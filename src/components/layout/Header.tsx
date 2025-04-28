
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/ui/custom/Logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BookText, MessageSquare, Settings, User } from 'lucide-react';

interface HeaderProps {
  currentApp?: 'inkwell' | 'echo';
}

const Header: React.FC<HeaderProps> = ({ currentApp }) => {
  const { user, signOut } = useAuth();
  const userInitials = user?.email?.charAt(0).toUpperCase() || 'U';
  
  return (
    <header className="sticky top-0 w-full backdrop-blur-md bg-[#0A0A0A]/70 border-b border-white/10 z-50">
      <div className="container-custom flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <Logo />
            <span className="text-lg font-bold ml-2 text-[#F7F7F2]">Paradocs</span>
          </Link>
          
          {/* App Navigation Links */}
          {user && (
            <nav className="ml-8 hidden md:flex space-x-6">
              {currentApp !== 'inkwell' && (
                <Link 
                  to="/documents" 
                  className="flex items-center gap-2 text-[#F7F7F2]/70 hover:text-[#F7F7F2] transition-colors"
                >
                  <BookText size={18} />
                  <span>Inkwell</span>
                </Link>
              )}
              
              {currentApp !== 'echo' && (
                <Link 
                  to="/echo" 
                  className="flex items-center gap-2 text-[#F7F7F2]/70 hover:text-[#F7F7F2] transition-colors"
                >
                  <MessageSquare size={18} />
                  <span>Echo</span>
                </Link>
              )}
            </nav>
          )}
        </div>
        
        {/* User Menu */}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full outline-none ring-offset-2 ring-offset-black focus-visible:ring-2 ring-[#0077B6]">
                <Avatar>
                  <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || 'User'} />
                  <AvatarFallback className="bg-[#0077B6] text-[#F7F7F2]">{userInitials}</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="flex items-center gap-2">
                <User size={18} />
                <div className="flex flex-col">
                  <span>{user.user_metadata?.full_name || user.email}</span>
                  {user.user_metadata?.full_name && (
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/documents" className="flex items-center gap-2 cursor-pointer">
                  <BookText size={16} />
                  <span>Inkwell</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/echo" className="flex items-center gap-2 cursor-pointer">
                  <MessageSquare size={16} />
                  <span>Echo</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center gap-2 cursor-pointer">
                  <Settings size={16} />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link to="/signin">
            <button className="btn-primary">Sign In</button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
