import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Saju',
  description: 'Saju',
};

export default function SajuLayout({ children }: PropsWithChildren) {
  return (
    <section className="absolute top-0 left-0 w-dvw min-h-dvh h-auto bg-neutral-400 z-50">
      {children}
    </section>
  );
}
