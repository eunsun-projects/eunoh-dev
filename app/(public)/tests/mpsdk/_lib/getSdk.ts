/* eslint-disable @typescript-eslint/no-explicit-any */
export const GetSDK = (elementId: string | HTMLIFrameElement): Promise<any> =>
  new Promise((resolve, reject) => {
    const checkIframe = async () => {
      let iframe = null;
      if (elementId instanceof HTMLIFrameElement) {
        iframe = elementId as HTMLIFrameElement;
      } else {
        iframe = document.getElementById(elementId);
      }

      if (iframe && (iframe as any).contentWindow.MP_SDK) {
        clearInterval(intervalId);

        const sdk = await (iframe as any).contentWindow.MP_SDK.connect(iframe);
        resolve(sdk);
        console.log(sdk);
      }
    };
    const intervalId = setInterval(checkIframe, 100);
  });
