'use client';

import { useEffect, useState } from 'react';
import { MpSdk } from '../../../../../public/matterport-assets/sdk';

const KEY = process.env.NEXT_PUBLIC_MATTERPORT_API_KEY;

function MpSdkTemplate() {
  const [mpsdk, setMpsdk] = useState<MpSdk | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 0);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const showcase = document.getElementById('showcase-iframe') as HTMLIFrameElement;
      const showcaseWindow = showcase.contentWindow;
      try {
        showcaseWindow?.MP_SDK.connect(showcaseWindow).then((sdk: MpSdk) => {
          console.log(sdk);
          setMpsdk(sdk);
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [isLoaded]);

  return (
    <div className="h-dvh w-full relative" id="mp-sdk-container">
      <iframe
        id="showcase-iframe"
        src={`/matterport-assets/showcase.html?m=fYzEr6ZgD5q&qs=1&views=0&sdkviews=0&brand=0&help=0&title=0&lang=en&play=1&application-key=${KEY}&applicationKey=${KEY}`}
        width="100%"
        height="100%"
        allowFullScreen
        allow="xr-spatial-tracking"
        loading="lazy"
      />
    </div>
  );
}

export default MpSdkTemplate;
