'use client';

import dynamic from 'next/dynamic';

const MatterportViewer = dynamic(
  () => import('@matterport/r3f').then((module) => ({ default: module.MatterportViewer })),
  { ssr: false },
);
export type Viewer = typeof MatterportViewer;

function MpSdkTemplate() {
  const handleConnected = () => {
    console.log('Connected');
  };
  const handleOnPlaying = () => {
    console.log('Playing');
  };
  return (
    <>
      <div className="h-dvh w-full relative" id="mp-sdk-container">
        <MatterportViewer
          id="mpviewer"
          m={'fYzEr6ZgD5q'}
          qs={1}
          views={0}
          sdkviews={0}
          brand={0}
          help={0}
          title={0}
          lang={'en'}
          play={1}
          // params={{
          //   lang: 'en',
          //   play: '1',
          //   title: '0',
          //   brand: '0',
          //   qs: '1',
          //   help: '0',
          // }}
          assetBase="/matterport-assets/"
          application-key={process.env.NEXT_PUBLIC_MATTERPORT_API_KEY}
          onConnected={handleConnected}
          onPlaying={handleOnPlaying}
        ></MatterportViewer>
      </div>
    </>
  );
}

export default MpSdkTemplate;
