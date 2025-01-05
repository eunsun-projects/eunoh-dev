'use client';

function MpSdkTemplate() {
  return (
    <>
      <div className="h-dvh w-full relative" id="mp-sdk-container">
        <iframe
          src={`/matterport-assets/showcase.html?m=fYzEr6ZgD5q&qs=1&views=0&sdkviews=0&brand=0&help=0&title=0&lang=en&play=1&application-key=${process.env.NEXT_PUBLIC_MATTERPORT_API_KEY}`}
          width="100%"
          height="100%"
          allowFullScreen
          allow="xr-spatial-tracking"
        />
      </div>
    </>
  );
}

export default MpSdkTemplate;
