
'use client';

import Link from 'next/link';
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
import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// Define a type for app names
export type AppName = 'inkwell' | 'echo';

interface HeaderProps {
  user?: User | null; // Make user optional
}

export default function Header({ user }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClientComponentClient();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Determine which app we're in from the pathname
  const currentApp: AppName = pathname?.startsWith('/docs') || pathname?.startsWith('/doc') 
    ? 'inkwell' 
    : 'echo';
  
  const isInkwell = currentApp === 'inkwell';
  
  // Get current session if no user prop is provided
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setCurrentUser(data.session?.user ?? null);
    };
    
    if (!user) {
      getSession();
    } else {
      setCurrentUser(user);
    }
  }, [user, supabase]);

  // Signout handler
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  // Check if we're on the homepage
  const isHomePage = pathname === '/';

  // Don't render header on homepage for unauthenticated users
  if (isHomePage && !currentUser) {
    return null;
  }

  return (
    <header className="fixed top-0 z-50 w-full bg-ink-white/70 backdrop-blur">
      <div className="container-custom flex h-14 items-center justify-between px-4">
        {/* Brand */}
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Paradocs
        </Link>

        {/* App-switch links (hidden on small screens) */}
        {currentUser && (
          <nav className="hidden md:flex">
            <div className="flex gap-2 rounded-full bg-gray-100/60 p-1">
              <AppLink
                href="/docs"
                icon={<BookText size={16} />}
                label="Inkwell"
                active={isInkwell}
              />
              <AppLink
                href="/echo"
                icon={<MessageSquare size={16} />}
                label="Echo"
                active={!isInkwell}
              />
            </div>
          </nav>
        )}

        {/* Auth actions or user avatar */}
        {currentUser ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage
                  src={currentUser.user_metadata?.avatar_url ?? undefined}
                  alt={currentUser.email ?? 'User'}
                />
                <AvatarFallback>
                  {currentUser.email?.charAt(0).toUpperCase() ?? '?'}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="flex items-center gap-2">
                <UserIcon size={14} />
                {currentUser.email}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard">
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={isInkwell ? '/echo' : '/docs'}>
                  {isInkwell ? 'Go to Echo' : 'Go to Inkwell'}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">
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
        ) : (
          <div>
            <Button
              variant="outline"
              onClick={() => router.push('/')}
              className="md:ml-auto"
            >
              Sign in
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

/* pill-style nav link */
interface AppLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

function AppLink({ href, icon, label, active }: AppLinkProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition
        ${active
          ? 'bg-white shadow-sm'
          : 'text-gray-700 hover:bg-white hover:shadow-sm'
        }`}
    >
      {icon}
      {label}
    </Link>
  );
}
