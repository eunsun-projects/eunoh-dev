import { PropsWithChildren } from 'react';

function MpSdkLayout({ children }: PropsWithChildren) {
  return (
    <section className="absolute top-0 left-0 w-dvw min-h-dvh h-auto bg-neutral-400 z-50">
      {children}
    </section>
  );
}

export default MpSdkLayout;
