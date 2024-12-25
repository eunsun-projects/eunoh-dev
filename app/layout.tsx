import QueryProvider from '@/providers/QueryProvider';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { d2coding } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: "EunOh's Portfolio",
  description: "EunOh's Dev Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body
        className={`${d2coding.className} bg-neutral-50 text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400 p-2 xl:p-0`}
      >
        <QueryProvider>{children}</QueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
