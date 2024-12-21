import { UiStateProvider } from '@/contexts/ready.context';
import React from 'react';
import Footer from './_components/ui/Footer';

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <UiStateProvider>
      <div className="bg-neutral-50 text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400 min-h-dvh">
        <main className="max-w-[640px] mx-auto pt-[128px] min-h-[calc(100dvh-128px-20px)]">
          {children}
        </main>
        <Footer />
      </div>
    </UiStateProvider>
  );
}

export default MainLayout;
