
import { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import Header from '@/components/layout/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'Paradocs - Document Management & AI Assistant',
  description: 'Create, edit, manage, and collaborate on documents with Paradocs',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="min-h-screen bg-background">
        <Header />
        {children}
      </body>
    </html>
  );
}
