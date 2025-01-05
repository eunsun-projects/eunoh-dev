import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { RiArrowGoBackFill } from 'react-icons/ri';

function MpSdkLayout({ children }: PropsWithChildren) {
  return (
    <section className="absolute top-0 left-0 w-dvw min-h-dvh h-auto bg-neutral-400 z-50">
      <Link
        href="/tests"
        className="absolute top-4 right-4 z-50 text-white p-1 rounded-xl bg-neutral-600"
      >
        <RiArrowGoBackFill className="text-lg cursor-pointer" />
      </Link>
      {children}
    </section>
  );
}

export default MpSdkLayout;
