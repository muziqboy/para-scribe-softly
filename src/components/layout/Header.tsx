
// src/components/layout/Header.tsx
'use client';

import { Link, useLocation } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import {
  BookText,
  MessageSquare,
  LogOut,
  Settings,
  User as UserIcon,
} from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

// Define a type for app names
type AppName = 'inkwell' | 'echo';

interface HeaderProps {
  user: User | null;
}

/** Decide which app we're in from the pathname */
function useCurrentApp(): AppName {
  const location = useLocation();
  const pathname = location.pathname;
  
  return pathname.startsWith('/docs') || pathname.startsWith('/doc') || pathname.startsWith('/document')
    ? 'inkwell'
    : 'echo';
}

export default function Header({ user }: HeaderProps) {
  const { signOut } = useAuth();
  const currentApp = useCurrentApp();
  const isInkwell = currentApp === 'inkwell';

  const handleSignOut = () => {
    signOut();
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-ink-white/70 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4">
        {/* Brand */}
        <Link to="/" className="text-lg font-semibold tracking-tight">
          Paradocs
        </Link>

        {/* App-switch links (hidden on small screens) */}
        <nav className="hidden md:flex">
          <div className="flex gap-2 rounded-full bg-gray-100/60 p-1">
            <AppLink
              to="/documents"
              icon={<BookText size={16} />}
              label="Inkwell"
              active={isInkwell}
            />
            <AppLink
              to="/echo"
              icon={<MessageSquare size={16} />}
              label="Echo"
              active={!isInkwell}
            />
          </div>
        </nav>

        {/* Avatar dropdown */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage
                  src={user.user_metadata?.avatar_url ?? undefined}
                  alt={user.email ?? 'User'}
                />
                <AvatarFallback>
                  {user.email?.charAt(0).toUpperCase() ?? '?'}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="flex items-center gap-2">
                <UserIcon size={14} />
                {user.email}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to={isInkwell ? '/echo' : '/documents'}>
                  {isInkwell ? 'Go to Echo' : 'Go to Inkwell'}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings/style">
                  <Settings size={14} className="mr-2" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="text-red-600"
              >
                <LogOut size={14} className="mr-2" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}

/* pill-style nav link */
interface AppLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

function AppLink({ to, icon, label, active }: AppLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition',
        active
          ? 'bg-white shadow-sm'
          : 'text-gray-700 hover:bg-white hover:shadow-sm'
      )}
    >
      {icon}
      {label}
    </Link>
  );
}
