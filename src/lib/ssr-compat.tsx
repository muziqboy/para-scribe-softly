
import React from 'react';

// Mock Next.js-style getServerSideProps
export async function getServerSideProps(context: any) {
  // This is a no-op in the Vite environment
  // In a real Next.js app, this would run on the server
  return {
    props: {}
  };
}

// Mock Next.js-style getStaticProps
export async function getStaticProps(context: any) {
  // This is a no-op in the Vite environment
  return {
    props: {}
  };
}

// SSR Provider wrapper to use in components that expect server-side data
export function SSRProvider({ 
  fallback, 
  children 
}: { 
  fallback?: React.ReactNode;
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

// Mock hydration component
export function Hydrate({ state, children }: { state: any; children: React.ReactNode }) {
  return <>{children}</>;
}

export default {
  getServerSideProps,
  getStaticProps,
  SSRProvider,
  Hydrate
};
