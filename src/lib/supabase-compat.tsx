
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

// Create a context for server-side auth flow compatibility
interface ServerAuthContextType {
  serverSession: Session | null;
  serverUser: User | null;
}

const ServerAuthContext = createContext<ServerAuthContextType>({
  serverSession: null,
  serverUser: null
});

// Provider component
export function ServerAuthProvider({ children, initialSession = null }: {
  children: React.ReactNode;
  initialSession?: Session | null;
}) {
  const [serverSession, setServerSession] = useState<Session | null>(initialSession);
  const [serverUser, setServerUser] = useState<User | null>(initialSession?.user || null);

  useEffect(() => {
    // This mimics the server-side auth flow in Next.js
    const initAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setServerSession(data.session);
      setServerUser(data.session?.user || null);
    };

    initAuth();
  }, []);

  return (
    <ServerAuthContext.Provider value={{ serverSession, serverUser }}>
      {children}
    </ServerAuthContext.Provider>
  );
}

// Hook to use the auth context
export function useServerAuth() {
  const context = useContext(ServerAuthContext);
  if (context === undefined) {
    throw new Error('useServerAuth must be used within a ServerAuthProvider');
  }
  return context;
}

// Mock Next.js createServerClient
export const createServerClient = () => {
  return supabase;
};

// Mock Next.js createClient
export const createClient = () => {
  return supabase;
};

export default {
  ServerAuthProvider,
  useServerAuth,
  createServerClient,
  createClient
};
