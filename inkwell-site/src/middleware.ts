
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protected routes that require authentication
  const protectedRoutes = ['/dashboard', '/docs', '/doc', '/echo', '/settings'];
  
  // Check if the path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  );
  
  // If trying to access a protected route without a session, redirect to home
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL('/', req.url);
    return NextResponse.redirect(redirectUrl);
  }
  
  // If accessing the root with a session, redirect to dashboard
  if (req.nextUrl.pathname === '/' && session) {
    const redirectUrl = new URL('/dashboard', req.url);
    return NextResponse.redirect(redirectUrl);
  }
  
  return res;
}

// Specify the paths that should trigger this middleware
export const config = {
  matcher: ['/', '/dashboard', '/docs', '/doc/:path*', '/echo', '/settings', '/settings/:path*'],
};
