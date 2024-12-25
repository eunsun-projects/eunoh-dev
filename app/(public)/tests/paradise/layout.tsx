import { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { AudioProvider } from './_components/AudioProvider';
import CheckLandscape from './_components/CheckLandscape';

export const metadata: Metadata = {
  title: 'Paradise',
  description: 'Paradise',
};

function ParadiseLayout({ children }: PropsWithChildren) {
  return (
    <AudioProvider>
      <div className="fixed top-0 left-0 w-dvw h-dvh bg-transparent z-50">
        <CheckLandscape />
        {children}
      </div>
    </AudioProvider>
  );
}

export default ParadiseLayout;
