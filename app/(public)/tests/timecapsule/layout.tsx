import { PropsWithChildren } from 'react';

export default function TimeCapsuleLayout({ children }: PropsWithChildren) {
  return <div className="fixed inset-0 h-screen w-screen bg-black z-50">{children}</div>;
}
