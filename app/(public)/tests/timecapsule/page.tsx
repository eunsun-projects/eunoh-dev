import Loading from '@/app/loading';
import { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import TimeCapsuleTemplate from './_components/TimeCapsuleTemplate';

export const metadata: Metadata = {
  title: 'TimeCapsule',
  description: 'TimeCapsule',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function TimeCapsulePage() {
  return (
    <Suspense fallback={<Loading />}>
      <TimeCapsuleTemplate />
    </Suspense>
  );
}
