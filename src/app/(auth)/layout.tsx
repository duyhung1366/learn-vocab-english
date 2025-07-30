import type { Metadata } from 'next';
import { Playfair_Display, PT_Sans } from 'next/font/google';

import '../globals.css';
import { Toaster } from '@/components/ui/toaster';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-headline',
});

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'LexiLearn - Vocabulary Mastery',
  description: 'Practice TOEIC and IELTS vocabulary with AI-powered tools.',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${ptSans.variable} font-body antialiased bg-background`}>
        <main className="min-h-screen flex flex-col">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
