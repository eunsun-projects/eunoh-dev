/*! For license information please see late-stream.712ad989daba6444a08f.js.LICENSE.txt */
"use strict";(self.webpackChunkmp_webgl=self.webpackChunkmp_webgl||[]).push([[276],{51093:(e,t,n)=>{n.r(t),n.d(t,{default:()=>u});var a=n(80509),r=n(80328),l=n(8665),i=n(95836),s=n(35223);const{TEXTURE_SETTINGS:o,clearRaycastHits:d}=l.yJ;const u=async function(e){const t=await e.getModuleBySymbol(r.ZF),n=await e.getModuleBySymbol(s.GR),l=t.addPanel(a.F.TITLE,a.F.HOTKEYS,{width:350});await t.loadPromise.then((()=>{const a="meshtextures";[{panel:l,header:a,setting:"disableTextureStreamBelowLod",initialValue:()=>-1,onChange:e=>{e>-1&&n.textureQualityMap.limitStreamingBelow(e)},urlParam:!0,rangePrecision:0,range:[-1,7]},{panel:l,header:a,setting:"textureStreamPause",initialValue:()=>o.debugPauseTexStream,onChange:e=>{o.debugPauseTexStream=e},urlParam:!0},{panel:l,header:a,setting:"textureStreamRaycastHits",initialValue:()=>o.debugLOD,onChange:e=>{o.debugLOD=e,e||d()},urlParam:!0},{panel:l,header:a,setting:"debugRTTQuality",initialValue:()=>o.debugRttQuality,onChange:t=>{o.debugRttQuality=t,t||e.commandBinder.issueCommand(new i.T({color:null},{style:i.T.selectBy.all}))},urlParam:!0},{panel:l,header:a,setting:"debugRTTScores",initialValue:()=>o.debugRttScores,onChange:t=>{o.debugRttScores=t,t||e.commandBinder.issueCommand(new i.T({color:null},{style:i.T.selectBy.all}))},urlParam:!0}].forEach((e=>t.registerMenuEntry(e)))}))}},91336:(e,t,n)=>{n.r(t),n.d(t,{default:()=>h});var a=n(68909),r=n(61825),l=n(28997),i=n(80328),s=n(14947),o=n(35223),d=n(24081),u=n(97624),c=n(60110),g=n(80172);async function h(e){const t=await e.getModuleBySymbol(o.GR),[n,h]=await Promise.all([e.market.waitForData(l.o),e.getModuleBySymbol(i.ZF)]),m=t.commands;await h.loadPromise.then((()=>{h.registerButton("Mesh","Toggle visible",(()=>{t.meshes.forEach((e=>{e.modelMesh.visible=!e.modelMesh.visible}))})),h.registerButton("Mesh","Toggle UV debug",(()=>{t.meshes.forEach((t=>{const n=t.renderer.chunkRenderingModeOverride?null:d.f.UV;e.commandBinder.issueCommand(new m.SetChunkRenderModeCommand(n))}))})),h.registerButton("Mesh","Toggle depth",(()=>{t.meshes.forEach((t=>{const n=t.renderer.chunkRenderingModeOverride?null:d.f.Depth;e.commandBinder.issueCommand(new m.SetChunkRenderModeCommand(n))}))})),h.registerButton("Mesh","Toggle transparent",(()=>{t.meshes.forEach((t=>{const n=t.renderer.chunkRenderingModeOverride?null:d.f.Transparent;e.commandBinder.issueCommand(new m.SetChunkRenderModeCommand(n))}))})),h.registerButton("Mesh","Toggle wireframe",(()=>{t.meshes.forEach((t=>{const n=t.renderer.chunkRenderingModeOverride?null:d.f.Wireframe;e.commandBinder.issueCommand(new m.SetChunkRenderModeCommand(n))}))}));let l=!1;h.registerButton("Mesh","Toggle flat shading",(()=>{l=!l,t.meshes.forEach((e=>{for(const t of e.modelMesh.chunks)t.setFlatShading(l)}))}));const i=(()=>{let e=!1;return(n,l)=>{const i=new a.Vector4(1,1,1,0);var s;e=!e,s=n||e,t.meshes.forEach((e=>{for(const t of e.modelMesh.chunks){const e=l?100*t.id:100*t.meshSubgroup,n=s?(0,r.Zd)(.5,e):i;t.setColorOverlay(n)}}))}})();h.registerButton("Mesh","Highlight Rooms",i),h.registerButton("Mesh","Highlight Chunks",(()=>i(!0,!0))),n.onPropertyChanged(u.Vp,(e=>{t.meshes.forEach((t=>{for(const n of t.modelMesh.chunks){const a=t.meshData.meshGroups.floors.get(n.meshGroup);a&&n.setMaterialsUniform({floorTrimHeight:1-e/100,floorHeightMin:a.boundingBox.min.y,floorHeightMax:a.boundingBox.max.y})}}))}));const o=(e,t,a,r,l)=>{h.registerSetting(e,t,a,!0,s.SettingPersistence.NONE,l),n.onPropertyChanged(t,r)};o("Wireframe",u._Z,!1,(e=>{t.meshes.forEach((t=>{for(const n of t.modelMesh.chunks)n.setWireframe(e)}))}));const p={[c.d.Wireframe]:{Wireframe:["thickness","wireframeOpacity","stroke","fillEnabled","fill","insideAltColor","dualStroke","secondThickness"],"Wireframe Dashes":["dashEnabled","dashLength","dashAnimate","dashOverlap"],"Wireframe Advanced":["squeeze","squeezeMin","squeezeMax"]}};for(const e in p){const n=g.A.modelChunk.uniforms[e];for(const a in p[e])for(const r of p[e][a])o(a,r,n[r].value,(e=>{t.meshes.forEach((t=>{for(const n of t.modelMesh.chunks)n.setMaterialsUniform({[r]:e})}))}),n[r].range)}}))}},32729:(e,t,n)=>{n.r(t),n.d(t,{default:()=>k,tiledMeshDebugMenu:()=>P});var a=n(68909),r=n(80328),l=n(1803);function i(e,t=16){let n;const a=(0,l.Sh)((()=>n=window.setInterval((()=>e()),t)),(()=>{n&&clearInterval(n)}));return a.cancel(),a}var s=n(46785),o=n(96452),d=n(95149),u=n(35223),c=n(95226),g=n(61825),h=n(70835),m=n(8665),p=n(97624),M=n(80509);const y=new o.Vy("tiled-mesh"),{TILEDMESH_SETTINGS:f}=m.yJ,T={hideMenu:"1"!==(0,d.P3)("dmenu","0"),debug:"1"===(0,d.P3)("debugTiles","0")||"1"===(0,d.P3)("debug-tiles","0"),statsTiles:!1,statsTileset:!0,statsTextures:!0,statsTextureStream:!0};let b=null;function v(e,t,n){b||(b=document.createElement("div"),b.style.color="#FFFFFF",b.style.fontFamily="Roboto",b.style.fontWeight="300",b.style.fontSize="12px",b.style.position="absolute",b.style.top="85px",b.style.width="500px",b.style.pointerEvents="none",b.style.whiteSpace="pre",b.style.zIndex="99999",b.style.textShadow="0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black",document.body.appendChild(b));let a="\n\n";a+=function(e){const t=e.threeRenderer.info,n=`three:\n  drawCalls: ${t.render.calls}\n  geometries: ${t.memory.geometries}\n  textures: ${t.memory.textures}\n  triangles: ${t.render.triangles}\n  memory allocated (megs): ${Math.floor(e.estimatedGPUMemoryAllocated()/2**20)}`;return n}(e),a+=T.statsTextureStream?function(e){const t=`\ntextureStreaming:\n  downloadingTiles: ${e.downloadingTiles} / ${e.totalTiles}\n  downloadingTextures: ${e.loadingTextures}\n`,n="  downloaded:\n"+Object.keys(e.totalTextures).map((t=>`    ${t}: ${e.totalTextures[t]} `)).join("\n")+"\n";return t+n}(n):"",t.forEach(((e,t)=>{const n=e.modelMesh;a+=`\n\n<mesh: id:${t}>`,a+=T.statsTileset?function(e,t){var n,a,r;const l=e.tilesRenderer,i=Object.values(null!==(n=l.tileSets)&&void 0!==n?n:[])[0];return`\n  tileset: preset: ${null===(a=null==i?void 0:i.asset.extras)||void 0===a?void 0:a.preset}, depth: ${null===(r=null==i?void 0:i.asset.extras)||void 0===r?void 0:r.depth}, version: ${null==i?void 0:i.asset.tilesetVersion}\n  view: errorTarget: ${t.settings.errorTarget}, maxLOD: ${t.settings.maxLOD}, detail: '${t.detail}'\n`}(n.tileLoader,n):"",a+=T.statsTiles?function(e){const t=e.tilesRenderer,n=t.visibleTiles,a={};n.forEach((e=>{var t;const n=`lod${null===(t=e.extras)||void 0===t?void 0:t.level}`,r=a[n]||0;a[n]=r+1}));const{stats:r,downloadQueue:l,parseQueue:i,lruCache:s}=t,{active:o,downloading:d,inFrustum:u,parsing:c,used:g,visible:h}=r,m=`  tiles:\n    tiles in frustum: ${u}\n    visible: ${h}`+Object.keys(a).sort().map((e=>`\n     ${e} tiles: ${a[e]||0}`)).join()+`\n    downloading gltf: ${d}\n    parsing gltf: ${c}\n    active: ${o}\n    used: ${g}\n    queues:\n      download: ${l.currJobs} running, ${l.items.length} waiting\n      parse: ${i.currJobs} running, ${i.items.length} waiting\n    lruCache: ${s.itemSet.size}\n`;return m}(n.tileLoader):"",a+=`</mesh: id:${t}>`})),b.textContent=a}function x(e,t,n,r,l,s){w&&(e.forEach(((e,n)=>{C.has(e.modelMesh)||(C.add(e.modelMesh),S.push(...function(e,t,n,r){const l=[{panel:e,header:t.tile+": "+n,setting:"maxLOD: "+n,initialValue:()=>r.settings.maxLOD,onChange:e=>{r.settings.maxLOD=e},range:[0,4],rangePrecision:0},{panel:e,header:t.tile+": "+n,setting:"nonMeshMaxLOD: "+n,initialValue:()=>r.settings.nonMeshMaxLOD,onChange:e=>{r.settings.nonMeshMaxLOD=e},range:[0,4],rangePrecision:0},{panel:e,header:t.tile+": "+n,setting:"minLOD: "+n,initialValue:()=>r.settings.minLOD,onChange:e=>{r.settings.minLOD=e},range:[0,4],rangePrecision:0},{panel:e,header:t.tile+": "+n,setting:"errorTarget:"+n,initialValue:()=>r.settings.errorTarget,onChange:e=>{r.settings.errorTarget=e},range:[0,20],rangePrecision:1,urlParam:!0},{panel:e,header:t.tile+": "+n,setting:"disableTileUpdates:"+n,initialValue:()=>r.settings.disableTileUpdates,onChange:e=>{r.settings.disableTileUpdates=e}},{panel:e,header:t.tile+": "+n,setting:"disposeModel: "+n,initialValue:()=>r.settings.disposeModel,onChange:e=>{r.settings.disposeModel=e}},{panel:e,header:t.tile+": "+n,setting:"pos on z axis: "+n,initialValue:()=>0,onChange:e=>{r.position.copy(new a.Vector3(0,0,e)),r.updateMatrixWorld(!0)},range:[-100,100],rangePrecision:0}];return l}(t,r,n,e.modelMesh)),S.push(...function(e,t,n,a,r,l){const s=a.tileLoader,o=V(s,l,((e,t)=>e.setWireframe(t))),d=function(e,t){const n={scale:1},a=(t,a)=>{if(!t)return;const r=e.container.tilesByChunkId.get(t.id),l=(null==r?void 0:r.__error)||1e-4,i=t.lod!==f.maxLOD&&l>f.errorTarget?1:.5,s=Math.max(0,Math.min(1,1-n.scale/l)),o=a?L(t.lod,s,i):null;t.setColorOverlay(o)},r=V(e,t,a),l=i((()=>r.colorize(e.container.chunks)));return{toggle:e=>{e?l.renew():l.cancel(),r.toggle(e)},colorize:r.colorize,subscription:l,config:n}}(s,l),u=V(s,l,((e,t)=>{e.setColorOverlay(t?L(e.lod,1,.5):null)})),c=V(s,l,((e,t)=>{e.setColorOverlay(t?(0,g.Zd)(.5,e.id||0):null)})),m=V(s,l,((e,t)=>{var n;const a=s.container.tilesByChunkId.get(e.id);e.setColorOverlay(t?(0,g.Zd)(.5,(0,h.s5)((null===(n=null==a?void 0:a.content)||void 0===n?void 0:n.uri)||"missing")||0):null)})),p=V(s,l,((e,t)=>{e.setColorOverlay(t?(0,g.Zd)(.5,(e.meshGroup<<16)+e.meshSubgroup||0):null)})),M=V(s,l,((e,t)=>{e.setColorOverlay(t?(0,g.Zd)(.5,e.meshSubgroup||0):null)})),T=V(s,l,((e,t)=>{e.setColorOverlay(t?(0,g.Zd)(.5,e.meshGroup||0):null)})),b=V(s,l,((e,t)=>{e.setColorOverlay(t?(0,g.Zd)(.5,(0,h.s5)(e.textureName)||0):null)})),v=V(s,l,((e,t)=>{const n=s.container.tilesByChunkId.get(e.id);e.setColorOverlay(t?(0,g.Zd)(.5,(null==n?void 0:n.geometricError)||0):null)})),x=r.slots,S=r.textureQualityMap,C=V(s,l,((e,t)=>{const n=x.find((t=>t.textureName===e.textureName));if(n){const a=n.loading?1:n.quality>S.min(e.lod)?.7:.3,r=S.maxTexelSize/S.get(n.quality).texelSize;e.setColorOverlay(t?L(e.lod,r,a):null)}})),w=i((()=>C.colorize(s.container.chunks)));let E="none";const P={none:void 0,byError:d,byGeometricError:v,byTile:m,bySubgroup:M,byMeshgroup:T,bySubAndMeshgroup:p,byTexture:b,byStreamedTextures:{subscription:w,toggle:e=>{e?w.renew():w.cancel(),e&&y.info("colorize=byStreamedTextures solid color: loading, dark color: streamed, light color: basis"),C.toggle(e)}},byChunk:c,byLod:u},O=[{panel:e,header:`${t.viz}: ${n}`,setting:"disableTileUpdates:"+n,initialValue:()=>a.settings.disableTileUpdates,onChange:e=>{a.settings.disableTileUpdates=e},urlParam:!0},{panel:e,header:`${t.viz}: ${n}`,setting:"wireframe:"+n,initialValue:()=>!1,onChange:o.toggle,urlParam:!0},{panel:e,header:`${t.viz}: ${n}`,setting:"colorize:"+n,initialValue:()=>"none",onChange:e=>{var t,n;null===(t=P[E])||void 0===t||t.toggle(!1),null===(n=P[e])||void 0===n||n.toggle(!0),E=e},options:Object.keys(P),urlParam:!0},{panel:e,header:`${t.viz}: ${n}`,setting:"colorizeByErrorScale:"+n,initialValue:()=>1,onChange:e=>{d.config.scale=e},range:[0,6],rangePrecision:3,urlParam:!0}];return O}(t,r,n,e.modelMesh,l,s)))})),S.length&&(S.forEach((e=>n.registerMenuEntry(e))),S.length=0))}const S=[],C=new Set;let w=!1,E=null;async function P(e){if(!T.debug)return;const t=await e.getModuleBySymbol(r.ZF),n=await e.getModuleBySymbol(u.mL),a=await e.getModuleBySymbol(u.M7),l=a.getScene(),i=await e.getModuleBySymbol(u.GR);await i.firstMeshLoadPromise,await(0,c.cb)(100);const s=i.meshes,o=i.meshTextureLoader,d=t.tryGetProperty(p.sz,!1),g=t.addPanel(M.F.TITLE,M.F.HOTKEYS,{width:350}),h={viz:"visualize",stats:"stats",tile:"tileset",log:"log"};function m(){E||(E=setInterval((()=>{v(a,s,o),x(s,g,t,h,o,e)}),150))}const b=[{panel:g,header:h.stats,setting:"tilesetStatsOverlay",initialValue:()=>T.statsTileset,onChange:e=>{T.statsTileset=e,e&&m()},urlParam:!0},{panel:g,header:h.stats,setting:"tileStatsOverlay",initialValue:()=>T.statsTiles,onChange:e=>{T.statsTiles=e,e&&m()},urlParam:!0},{panel:g,header:h.stats,setting:"textureStatsOverlay",initialValue:()=>T.statsTextures,onChange:e=>{T.statsTextures=e,e&&m()},urlParam:!0},{panel:g,header:h.stats,setting:"textureStreamingOverlay",initialValue:()=>T.statsTextureStream,onChange:e=>{T.statsTextureStream=e,e&&m()},urlParam:!0}],S=[{panel:g,header:h.log,buttonName:"Log: App State",callback:()=>{y.warn(s),y.warn(n),y.warn(l),y.warn(t)}}];d&&(T.hideMenu||await(0,c.cb)(1e3).then((()=>{t.getSettingsGui().loadGuiPackage().then((()=>{t.getSettingsGui().toggle(t.getMainPanelId()),t.getSettingsGui().toggle(t.getMainPanelId())}))})),await(0,c.cb)(16),w||(await(0,c.cb)(16),w=!0,function(e,t,n,a){const r=[{panel:e,header:t.tile,setting:"smallMeshThreshold",initialValue:()=>f.smallMeshThreshold,onChange:e=>{f.smallMeshThreshold=e,a.forEach((t=>{t.modelMesh.settings.smallMeshThreshold=e}))},range:[0,100],rangePrecision:1,urlParam:!0},{panel:e,header:t.tile,setting:"smallMeshErrorMultiplier",initialValue:()=>f.smallMeshErrorMultiplier,onChange:e=>{f.smallMeshErrorMultiplier=e,a.forEach((t=>{t.modelMesh.settings.smallMeshErrorMultiplier=e}))},range:[.01,2],rangePrecision:2,urlParam:!0},{panel:e,header:t.tile,setting:"displayActiveTiles",initialValue:()=>f.displayActiveTiles,onChange:e=>{f.displayActiveTiles=e,a.forEach((t=>{t.modelMesh.settings.displayActiveTiles=e}))},urlParam:!0},{panel:e,header:t.tile,setting:"loadSiblings",initialValue:()=>f.loadSiblings,onChange:e=>{f.loadSiblings=e,a.forEach((t=>{t.modelMesh.settings.loadSiblings=e}))},urlParam:!0},{panel:e,header:t.tile,setting:"autoDisableRendererCulling",initialValue:()=>f.autoDisableRendererCulling,onChange:e=>{f.autoDisableRendererCulling=e,a.forEach((t=>{t.modelMesh.settings.autoDisableRendererCulling=e}))},urlParam:!0},{panel:e,header:t.tile,setting:"stopAtEmptyTiles",initialValue:()=>f.stopAtEmptyTiles,onChange:e=>{f.stopAtEmptyTiles=e,a.forEach((t=>{t.modelMesh.settings.stopAtEmptyTiles=e}))},urlParam:!0},{panel:e,header:t.tile,setting:"limitMemoryUsage",initialValue:()=>f.limitMemoryUsage,onChange:e=>{f.limitMemoryUsage=e,a.forEach((t=>{t.modelMesh.settings.limitMemoryUsage=e}))},urlParam:!0},{panel:e,header:t.tile,setting:"allocatedMegsBeforeLimitingLod",initialValue:()=>f.allocatedMegsBeforeLimitingLod,onChange:e=>{f.allocatedMegsBeforeLimitingLod=e,a.forEach((t=>{t.modelMesh.settings.allocatedMegsBeforeLimitingLod=e}))},urlParam:!0,range:[100,1e3]},{panel:e,header:t.tile,setting:"lruMinExtraTiles",initialValue:()=>f.lruMinExtraTiles,onChange:e=>{f.lruMinExtraTiles=e,a.forEach((t=>{t.modelMesh.settings.lruMinExtraTiles=e}))},urlParam:!0,range:[0,2e3]},{panel:e,header:t.tile,setting:"lruMaxTiles",initialValue:()=>f.lruMaxTiles,onChange:e=>{f.lruMaxTiles=e,a.forEach((t=>{t.modelMesh.settings.lruMaxTiles=e}))},urlParam:!0,range:[0,2e3]},{panel:e,header:t.tile,setting:"lruUnloadPercent",initialValue:()=>f.lruUnloadPercent,onChange:e=>{f.lruUnloadPercent=e,a.forEach((t=>{t.modelMesh.settings.lruUnloadPercent=e}))},urlParam:!0,range:[0,1]},{panel:e,header:"Priority",setting:"errorMultiplierRaycastOcclusion",initialValue:()=>f.errorMultiplierRaycastOcclusion,onChange:e=>{f.errorMultiplierRaycastOcclusion=e,a.forEach((t=>{t.modelMesh.settings.errorMultiplierRaycastOcclusion=e}))},range:[.001,1],rangePrecision:2},{panel:e,header:"Priority",setting:"errorMultiplierHiddenFloors",initialValue:()=>f.errorMultiplierHiddenFloors,onChange:e=>{f.errorMultiplierHiddenFloors=e,a.forEach((t=>{t.modelMesh.settings.errorMultiplierHiddenFloors=e}))},range:[.001,1],rangePrecision:2}];return r}(g,h,0,s).forEach((e=>t.registerMenuEntry(e))),b.forEach((e=>t.registerMenuEntry(e))),S.forEach((e=>t.registerMenuButton(e)))))}function V(e,t,n){let a=!1;const r=e=>{t.after(s.R.End).then((()=>{e.forEach((e=>{e&&n(e,a)}))}))},l=e.notifyOnChunksLoaded(r);l.cancel();return{toggle:t=>{t?l.renew():l.cancel(),t!==a&&(a=t,r([...e.container.chunks]))},colorize:r,subscription:l}}const O={0:new a.Vector4(1,0,0,1),1:new a.Vector4(0,1,0,1),2:new a.Vector4(0,0,1,1),3:new a.Vector4(1,1,1,1),4:new a.Vector4(1,0,1,1),5:new a.Vector4(0,1,1,1),6:new a.Vector4(1,1,0,1),7:new a.Vector4(0,0,0,1)};function L(e,t,n){var r,l;const i=null!==(l=null===(r=O[e])||void 0===r?void 0:r.clone())&&void 0!==l?l:new a.Vector4;return i.multiplyScalar(t),i.setW(n),i}const k=P},80509:(e,t,n)=>{n.d(t,{F:()=>a});const a={TITLE:"streamed-mesh (T)",HOTKEYS:[n(44158).D.T]}},24081:(e,t,n)=>{var a;n.d(t,{f:()=>a}),function(e){e[e.Standard=0]="Standard",e[e.Depth=1]="Depth",e[e.Transparent=2]="Transparent",e[e.Wireframe=3]="Wireframe",e[e.UV=4]="UV"}(a||(a={}))},95836:(e,t,n)=>{n.d(t,{T:()=>i});var a,r,l=n(18268);!function(e){e.all="all",e.byMeshGroup="byMeshGroup",e.byMeshSubGroup="byMeshSubGroup"}(a||(a={})),function(e){e.explicit="explicit",e.random="random"}(r||(r={}));class i extends l.u{constructor(e,t,n){super(),this.payload={meshIds:null!=n?n:[],selectBy:(null==t?void 0:t.style)||a.all,colorStyle:(null==e?void 0:e.style)||r.explicit,color:(null==e?void 0:e.color)||null,alpha:(null==e?void 0:e.alpha)||.5,index:null==t?void 0:t.index}}}i.id="SET_MESH_OVERLAY_COLOR",i.selectBy=a,i.colorBy=r,i.COLOR_DIM={x:0,y:0,z:0,w:.3}},44588:(e,t,n)=>{var a;n.d(t,{X:()=>a}),function(e){e[e.Min=0]="Min",e[e.Standard=1]="Standard",e[e.High=2]="High",e[e.Detail=3]="Detail"}(a||(a={}))},8665:(e,t,n)=>{n.d(t,{yJ:()=>i});var a=n(2173),r=n(97624),l=n(96822);const i={TEXTURE_SETTINGS:r.Ay,TILEDMESH_SETTINGS:a.W,clearRaycastHits:l.Jn}},2173:(e,t,n)=>{n.d(t,{W:()=>i});var a=n(8430),r=n(95149),l=n(44588);const i={urlTemplateToken:"<file>",initialMaxLOD:l.X.Min,nonMeshMaxLOD:l.X.Standard,maxLOD:l.X.High,minLOD:l.X.Min,loadSiblings:!0,displayActiveTiles:!1,autoDisableRendererCulling:!0,optimizeRaycast:!1,stopAtEmptyTiles:!1,disableTileUpdates:!1,disposeModel:!1,limitMemoryUsage:(0,a.Fr)(),allocatedMegsBeforeLimitingLod:350,lruMinExtraTiles:(0,a.Fr)()?0:100,lruMaxTiles:800,lruUnloadPercent:.05,downloadQueueConcurrency:8,parseQueueConcurrency:10,snappingMaxLOD:l.X.Standard,errorTarget:Number((0,r.P3)("errorTarget",(0,a.Fr)()?6:4)),errorMultiplierHiddenFloors:.01,errorMultiplierRaycastOcclusion:.1,smallMeshThreshold:Number((0,r.P3)("smallMeshThreshold",40)),smallMeshErrorMultiplier:Number((0,r.P3)("smallMeshErrorMultiplier",.1))}},96822:(e,t,n)=>{n.d(t,{Jn:()=>d,rt:()=>o});var a=n(68909);const r=n(97624).Ay.sightingMaxAge,l=new a.Color;let i,s=-1;const o=(e,t,n)=>{i||(i=new a.InstancedMesh(new a.SphereGeometry(.005,8,4),new a.MeshBasicMaterial,r),i.frustumCulled=!1,u(i));const o=new a.Matrix4;return({point:a,distance:d})=>{const u=d/n.fovDistanceScale();o.makeScale(u,u,u).setPosition(a),i.setMatrixAt(++s%r,o),i.instanceMatrix.needsUpdate=!0;for(let t=r;t--;)i.setColorAt((s-t+r)%r,l.set(e).multiplyScalar(1-t/r));i.instanceColor&&(i.instanceColor.needsUpdate=!0),i.parent||t.scene.add(i)}},d=()=>{var e;i&&(null===(e=i.parent)||void 0===e||e.remove(i),u(i))};function u(e){const t=(new a.Matrix4).makeScale(0,0,0);for(let n=0;n<r;n++)e.setMatrixAt(n,t)}new a.Vector4(1,0,0,1),new a.Vector4(0,1,0,1),new a.Vector4(0,0,1,1),new a.Vector4(1,1,0,1),new a.Vector4(1,0,1,1),new a.Vector4(1,1,1,1),new a.Vector4(0,1,1,1),new a.Vector4(0,0,0,1)},61825:(e,t,n)=>{n.d(t,{Mq:()=>o,Zd:()=>s,_o:()=>d,iE:()=>u});var a=n(68909),r=n(95226);const l=()=>Math.random(),i={},s=(e,t=l())=>(i[t]||(i[t]=new a.Vector4(l(),l(),l(),e)),i[t]),o=()=>new a.Color(l(),l(),l()),d=e=>e instanceof Object&&"r"in e&&"g"in e&&"b"in e;function u(e){return`#${(0,r.Ho)(255*e.r,2,"0",16)}${(0,r.Ho)(255*e.g,2,"0",16)}${(0,r.Ho)(255*e.b,2,"0",16)}`}}}]);