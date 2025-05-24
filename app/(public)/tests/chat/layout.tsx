import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Chat',
  description: 'Chat',
};

export default function ChatLayout({ children }: PropsWithChildren) {
  return (
    <section className="absolute top-0 left-0 w-dvw min-h-dvh h-auto z-50 bg-[#01008a]">
      {children}
    </section>
  );
}
