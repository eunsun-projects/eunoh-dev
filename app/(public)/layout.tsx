import { UiStateProvider } from '@/contexts/ready.context';
import React from 'react';
import Footer from './_components/ui/Footer';

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <UiStateProvider>
      <div className="min-h-full">
        <main className="max-w-[640px] mx-auto pt-[128px] min-h-[calc(100dvh-128px-28px)]">
          {children}
        </main>
        <Footer />
      </div>
    </UiStateProvider>
  );
}

export default MainLayout;
