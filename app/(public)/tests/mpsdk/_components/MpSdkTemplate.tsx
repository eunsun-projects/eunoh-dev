/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import type * as THREE from "three";
import type { MpSdk } from "../../../../../public/matterport-assets/sdk";
import Shadow from "../_class/Shadow.class";
import lights from "../_data/lights";
import { model } from "../_data/model";
import { GetSDK } from "../_lib/getSdk";
import loadScene from "../_lib/loadScene";

const KEY = process.env.NEXT_PUBLIC_MATTERPORT_API_KEY;

function MpSdkTemplate() {
  const [mpsdk, setMpsdk] = useState<MpSdk | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 0);

    return () => {
      setIsLoaded(false);
      setMpsdk(null);
    };
  }, []);

  useEffect(() => {
    // const showcase = document.getElementById('showcase-iframe') as HTMLIFrameElement;
    // const showcaseWindow = showcase.contentWindow;
    if (isLoaded) {
      try {
        // if (!showcaseWindow?.MP_SDK) return;
        // showcaseWindow.MP_SDK.connect(showcaseWindow).then((sdk: MpSdk) => {
        //   setMpsdk(sdk);
        // });
        GetSDK("showcase-iframe").then((sdk: MpSdk) => {
          setMpsdk(sdk);
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [isLoaded]);

  useEffect(() => {
    const configure = async (mpSdk: MpSdk) => {
      const shadowMatFactory = () => {
        return new Shadow();
      };
      mpSdk.Scene.register("makeShadowMat", shadowMatFactory);
      await mpSdk.Scene.configure((renderer: any, three: any) => {
        renderer.physicallyCorrectLights = false;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.bias = -0.0001;
        renderer.shadowMap.type = three.PCFSoftShadowMap;
      });

      const [sceneObject] = await mpSdk.Scene.createObjects(1);

      // amb light
      sceneObject.addNode().addComponent("mp.ambientLight", lights.ambient);
      // directional light
      sceneObject.addNode().addComponent("mp.directionalLight", lights.ambient);

      // 그림자 캐스트를 위한 노드 생성
      const lightNode = sceneObject.addNode();

      lightNode.addComponent("mp.directionalLight", lights.directional);
      lightNode.addComponent("mp.pointLight", lights.point);

      await loadScene(sceneObject, model, "y");

      lightNode.addComponent("makeShadowMat", shadowMatFactory);

      sceneObject.start();

      if ("obj3D" in lightNode) {
        const obj3D = lightNode.obj3D as THREE.Object3D;
        obj3D.castShadow = true;
        obj3D.receiveShadow = true;
        console.log(obj3D.children[1].children[0]);
        (obj3D.children[1].children[0] as THREE.PointLight).shadow.radius = 8;
        (
          obj3D.children[1].children[0] as THREE.PointLight
        ).shadow.mapSize.width = 1024;
        (
          obj3D.children[1].children[0] as THREE.PointLight
        ).shadow.mapSize.height = 1024;
        (obj3D.children[1].children[0] as THREE.PointLight).shadow.camera.near =
          1;
        (obj3D.children[1].children[0] as THREE.PointLight).shadow.camera.far =
          10000;
        (
          obj3D.children[1].children[0] as THREE.PointLight
        ).shadow.camera.focus = 1;
        (obj3D.children[1].children[0] as THREE.PointLight).shadow.needsUpdate =
          true;
      }
    };
    if (mpsdk) {
      configure(mpsdk);
    }
  }, [mpsdk]);

  return (
    <div className="h-dvh w-full relative" id="mp-sdk-container">
      <iframe
        title="showcase-iframe"
        id="showcase-iframe"
        src={`/matterport-assets/showcase.html?m=fYzEr6ZgD5q&qs=1&views=0&sdkviews=0&brand=0&help=0&title=0&lang=en&play=1&application-key=${KEY}&applicationKey=${KEY}`}
        width="100%"
        height="100%"
        allowFullScreen
        allow="xr-spatial-tracking"
      />
    </div>
  );
}

export default MpSdkTemplate;
