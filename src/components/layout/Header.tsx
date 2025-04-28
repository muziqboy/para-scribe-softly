// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { User } from '@supabase/supabase-js';
import { BookText, MessageSquare, LogOut, Settings, User as UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

type AppName = 'inkwell' | 'echo';

interface HeaderProps {
  user: User | null;
}

/** Derive the current app from the path: /docs & /doc/* = inkwell, /echo = echo */
function useCurrentApp(): AppName {
  const pathname = usePathname();
  return pathname.startsWith('/docs') || pathname.startsWith('/doc')
    ? 'inkwell'
    : 'echo';
}

export default function Header({ user }: HeaderProps) {
  const router          = useRouter();
  const supabase        = useSupabaseClient();
  const currentApp      = useCurrentApp();
  const isInkwell       = currentApp === 'inkwell';

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace('/auth/login');
  }

  return (
    <header className="fixed top-0 z-50 w-full bg-ink-white/70 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4">
        {/* Brand */}
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Paradocs
        </Link>

        {/* Center app-switch links (hidden on small screens) */}
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

        {/* Avatar / dropdown */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src={user.user_metadata?.avatar_url ?? undefined} />
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
              {/* Switch link duplicated here for accessibility */}
              <DropdownMenuItem asChild>
                <Link href={isInkwell ? '/echo' : '/docs'}>
                  {isInkwell ? 'Go to Echo' : 'Go to Inkwell'}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings/style">
                  <Settings size={14} className="mr-2" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleSignOut} className="text-red-600">
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

/* Small helper component for the nav pills */
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
