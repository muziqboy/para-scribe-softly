import React from 'react';
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
import {
  BookText,
  MessageSquare,
  Settings,
  User,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { cn } from '@/lib/utils';

interface HeaderProps {
  currentApp?: 'inkwell' | 'echo' | undefined;
  toggleSidebar?: () => void;
  isMobile?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  currentApp, 
  toggleSidebar,
  isMobile = false
}) => {
  const { user, signOut } = useAuth();
  const userInitials = user?.email?.charAt(0).toUpperCase() || 'U';
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  
  return (
    <header className="sticky top-0 w-full backdrop-blur-md bg-ink-white/70 border-b border-gray-200 z-50">
      <div className="container-custom flex justify-between items-center h-14">
        {/* Logo */}
        <div className="flex items-center gap-2">
          {toggleSidebar && isMobile && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleSidebar}
              className="mr-2 md:hidden"
            >
              <Menu size={20} />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
          )}
          
          <Link to="/" className="flex items-center">
            <Logo />
            <span className="text-lg font-semibold ml-2 text-ink-black">Paradocs</span>
          </Link>
        </div>
        
        {/* App Navigation Links */}
        {user && (
          <nav className="hidden md:flex items-center">
            <div className="flex space-x-4 rounded-full bg-gray-100/50 p-1">
              {currentApp !== 'inkwell' && (
                <Link 
                  to="/documents" 
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium",
                    "hover:bg-white hover:shadow-sm transition-all duration-150",
                    currentApp === 'inkwell' ? "bg-white shadow-sm" : "text-gray-700"
                  )}
                >
                  <BookText size={16} />
                  <span>Inkwell</span>
                </Link>
              )}
              
              {currentApp !== 'echo' && (
                <Link 
                  to="/echo" 
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium",
                    "hover:bg-white hover:shadow-sm transition-all duration-150",
                    currentApp === 'echo' ? "bg-white shadow-sm" : "text-gray-700"
                  )}
                >
                  <MessageSquare size={16} />
                  <span>Echo</span>
                </Link>
              )}
            </div>
          </nav>
        )}
        
        {/* User Menu */}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full outline-none ring-offset-2 ring-offset-white focus-visible:ring-2 ring-ink-accent">
                <Avatar className="h-8 w-8 border border-gray-200">
                  <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || 'User'} />
                  <AvatarFallback className="bg-ink-accent text-white text-sm">{userInitials}</AvatarFallback>
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
            <Button className="bg-ink-black hover:bg-ink-black/90 text-white">Sign In</Button>
          </Link>
        )}

        {/* Mobile Menu */}
        {user && isMobile && (
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu size={20} />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="p-4 space-y-4">
                <Link 
                  to="/documents"
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <BookText size={18} />
                  <span className="text-base font-medium">Inkwell</span>
                </Link>
                <Link 
                  to="/echo"
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <MessageSquare size={18} />
                  <span className="text-base font-medium">Echo</span>
                </Link>
                <div className="pt-2 border-t">
                  <Link 
                    to="/settings"
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    <Settings size={18} />
                    <span className="text-base font-medium">Settings</span>
                  </Link>
                  <button 
                    onClick={() => { 
                      signOut();
                      setIsDrawerOpen(false);
                    }}
                    className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md text-left"
                  >
                    <span className="text-base font-medium">Sign out</span>
                  </button>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </header>
  );
};

export default Header;
