/* eslint-disable @typescript-eslint/no-explicit-any */
export const GetSDK = function (elementId: string | HTMLIFrameElement): Promise<any> {
  return new Promise(function (resolve, reject) {
    const checkIframe = async function () {
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
};
