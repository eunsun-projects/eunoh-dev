/*! For license information please see 376.js.LICENSE.txt */
'use strict';
(self.webpackChunkmp_webgl = self.webpackChunkmp_webgl || []).push([
  [376],
  {
    92583: (e, t, s) => {
      s.r(t), s.d(t, { XRControllerModelFactory: () => m });
      var o = s(81396),
        a = s(1217);
      const n = {
        Handedness: Object.freeze({ NONE: 'none', LEFT: 'left', RIGHT: 'right' }),
        ComponentState: Object.freeze({
          DEFAULT: 'default',
          TOUCHED: 'touched',
          PRESSED: 'pressed',
        }),
        ComponentProperty: Object.freeze({
          BUTTON: 'button',
          X_AXIS: 'xAxis',
          Y_AXIS: 'yAxis',
          STATE: 'state',
        }),
        ComponentType: Object.freeze({
          TRIGGER: 'trigger',
          SQUEEZE: 'squeeze',
          TOUCHPAD: 'touchpad',
          THUMBSTICK: 'thumbstick',
          BUTTON: 'button',
        }),
        ButtonTouchThreshold: 0.05,
        AxisTouchThreshold: 0.1,
        VisualResponseProperty: Object.freeze({ TRANSFORM: 'transform', VISIBILITY: 'visibility' }),
      };
      async function i(e) {
        const t = await fetch(e);
        if (t.ok) return t.json();
        throw new Error(t.statusText);
      }
      async function r(e, t, s = null, o = !0) {
        if (!e) throw new Error('No xrInputSource supplied');
        if (!t) throw new Error('No basePath supplied');
        const a = await (async function (e) {
          if (!e) throw new Error('No basePath supplied');
          return await i(`${e}/profilesList.json`);
        })(t);
        let n;
        if (
          (e.profiles.some((e) => {
            const s = a[e];
            return (
              s &&
                (n = { profileId: e, profilePath: `${t}/${s.path}`, deprecated: !!s.deprecated }),
              !!n
            );
          }),
          !n)
        ) {
          if (!s) throw new Error('No matching profile name found');
          const e = a[s];
          if (!e)
            throw new Error(`No matching profile name found and default profile "${s}" missing.`);
          n = { profileId: s, profilePath: `${t}/${e.path}`, deprecated: !!e.deprecated };
        }
        const r = await i(n.profilePath);
        let l;
        if (o) {
          let t;
          if (
            ((t =
              'any' === e.handedness
                ? r.layouts[Object.keys(r.layouts)[0]]
                : r.layouts[e.handedness]),
            !t)
          )
            throw new Error(`No matching handedness, ${e.handedness}, in profile ${n.profileId}`);
          t.assetPath && (l = n.profilePath.replace('profile.json', t.assetPath));
        }
        return { profile: r, assetPath: l };
      }
      const l = { xAxis: 0, yAxis: 0, button: 0, state: n.ComponentState.DEFAULT };
      class h {
        constructor(e) {
          (this.componentProperty = e.componentProperty),
            (this.states = e.states),
            (this.valueNodeName = e.valueNodeName),
            (this.valueNodeProperty = e.valueNodeProperty),
            this.valueNodeProperty === n.VisualResponseProperty.TRANSFORM &&
              ((this.minNodeName = e.minNodeName), (this.maxNodeName = e.maxNodeName)),
            (this.value = 0),
            this.updateFromComponent(l);
        }
        updateFromComponent({ xAxis: e, yAxis: t, button: s, state: o }) {
          const { normalizedXAxis: a, normalizedYAxis: i } = (function (e = 0, t = 0) {
            let s = e,
              o = t;
            if (Math.sqrt(e * e + t * t) > 1) {
              const a = Math.atan2(t, e);
              (s = Math.cos(a)), (o = Math.sin(a));
            }
            return { normalizedXAxis: 0.5 * s + 0.5, normalizedYAxis: 0.5 * o + 0.5 };
          })(e, t);
          switch (this.componentProperty) {
            case n.ComponentProperty.X_AXIS:
              this.value = this.states.includes(o) ? a : 0.5;
              break;
            case n.ComponentProperty.Y_AXIS:
              this.value = this.states.includes(o) ? i : 0.5;
              break;
            case n.ComponentProperty.BUTTON:
              this.value = this.states.includes(o) ? s : 0;
              break;
            case n.ComponentProperty.STATE:
              this.valueNodeProperty === n.VisualResponseProperty.VISIBILITY
                ? (this.value = this.states.includes(o))
                : (this.value = this.states.includes(o) ? 1 : 0);
              break;
            default:
              throw new Error(
                `Unexpected visualResponse componentProperty ${this.componentProperty}`,
              );
          }
        }
      }
      class u {
        constructor(e, t) {
          if (
            !(
              e &&
              t &&
              t.visualResponses &&
              t.gamepadIndices &&
              0 !== Object.keys(t.gamepadIndices).length
            )
          )
            throw new Error('Invalid arguments supplied');
          (this.id = e),
            (this.type = t.type),
            (this.rootNodeName = t.rootNodeName),
            (this.touchPointNodeName = t.touchPointNodeName),
            (this.visualResponses = {}),
            Object.keys(t.visualResponses).forEach((e) => {
              const s = new h(t.visualResponses[e]);
              this.visualResponses[e] = s;
            }),
            (this.gamepadIndices = Object.assign({}, t.gamepadIndices)),
            (this.values = {
              state: n.ComponentState.DEFAULT,
              button: void 0 !== this.gamepadIndices.button ? 0 : void 0,
              xAxis: void 0 !== this.gamepadIndices.xAxis ? 0 : void 0,
              yAxis: void 0 !== this.gamepadIndices.yAxis ? 0 : void 0,
            });
        }
        get data() {
          return { id: this.id, ...this.values };
        }
        updateFromGamepad(e) {
          if (
            ((this.values.state = n.ComponentState.DEFAULT),
            void 0 !== this.gamepadIndices.button && e.buttons.length > this.gamepadIndices.button)
          ) {
            const t = e.buttons[this.gamepadIndices.button];
            (this.values.button = t.value),
              (this.values.button = this.values.button < 0 ? 0 : this.values.button),
              (this.values.button = this.values.button > 1 ? 1 : this.values.button),
              t.pressed || 1 === this.values.button
                ? (this.values.state = n.ComponentState.PRESSED)
                : (t.touched || this.values.button > n.ButtonTouchThreshold) &&
                  (this.values.state = n.ComponentState.TOUCHED);
          }
          void 0 !== this.gamepadIndices.xAxis &&
            e.axes.length > this.gamepadIndices.xAxis &&
            ((this.values.xAxis = e.axes[this.gamepadIndices.xAxis]),
            (this.values.xAxis = this.values.xAxis < -1 ? -1 : this.values.xAxis),
            (this.values.xAxis = this.values.xAxis > 1 ? 1 : this.values.xAxis),
            this.values.state === n.ComponentState.DEFAULT &&
              Math.abs(this.values.xAxis) > n.AxisTouchThreshold &&
              (this.values.state = n.ComponentState.TOUCHED)),
            void 0 !== this.gamepadIndices.yAxis &&
              e.axes.length > this.gamepadIndices.yAxis &&
              ((this.values.yAxis = e.axes[this.gamepadIndices.yAxis]),
              (this.values.yAxis = this.values.yAxis < -1 ? -1 : this.values.yAxis),
              (this.values.yAxis = this.values.yAxis > 1 ? 1 : this.values.yAxis),
              this.values.state === n.ComponentState.DEFAULT &&
                Math.abs(this.values.yAxis) > n.AxisTouchThreshold &&
                (this.values.state = n.ComponentState.TOUCHED)),
            Object.values(this.visualResponses).forEach((e) => {
              e.updateFromComponent(this.values);
            });
        }
      }
      class d {
        constructor(e, t, s) {
          if (!e) throw new Error('No xrInputSource supplied');
          if (!t) throw new Error('No profile supplied');
          (this.xrInputSource = e),
            (this.assetUrl = s),
            (this.id = t.profileId),
            (this.layoutDescription = t.layouts[e.handedness]),
            (this.components = {}),
            Object.keys(this.layoutDescription.components).forEach((e) => {
              const t = this.layoutDescription.components[e];
              this.components[e] = new u(e, t);
            }),
            this.updateFromGamepad();
        }
        get gripSpace() {
          return this.xrInputSource.gripSpace;
        }
        get targetRaySpace() {
          return this.xrInputSource.targetRaySpace;
        }
        get data() {
          const e = [];
          return (
            Object.values(this.components).forEach((t) => {
              e.push(t.data);
            }),
            e
          );
        }
        updateFromGamepad() {
          Object.values(this.components).forEach((e) => {
            e.updateFromGamepad(this.xrInputSource.gamepad);
          });
        }
      }
      class p extends o.Object3D {
        constructor() {
          super(), (this.motionController = null), (this.envMap = null);
        }
        setEnvironmentMap(e) {
          return (
            this.envMap == e ||
              ((this.envMap = e),
              this.traverse((e) => {
                e.isMesh && ((e.material.envMap = this.envMap), (e.material.needsUpdate = !0));
              })),
            this
          );
        }
        updateMatrixWorld(e) {
          super.updateMatrixWorld(e),
            this.motionController &&
              (this.motionController.updateFromGamepad(),
              Object.values(this.motionController.components).forEach((e) => {
                Object.values(e.visualResponses).forEach((e) => {
                  const {
                    valueNode: t,
                    minNode: s,
                    maxNode: o,
                    value: a,
                    valueNodeProperty: i,
                  } = e;
                  t &&
                    (i === n.VisualResponseProperty.VISIBILITY
                      ? (t.visible = a)
                      : i === n.VisualResponseProperty.TRANSFORM &&
                        (t.quaternion.slerpQuaternions(s.quaternion, o.quaternion, a),
                        t.position.lerpVectors(s.position, o.position, a)));
                });
              }));
        }
      }
      function c(e, t) {
        !(function (e, t) {
          Object.values(e.components).forEach((e) => {
            const { type: s, touchPointNodeName: a, visualResponses: i } = e;
            if (s === n.ComponentType.TOUCHPAD)
              if (((e.touchPointNode = t.getObjectByName(a)), e.touchPointNode)) {
                const t = new o.SphereGeometry(0.001),
                  s = new o.MeshBasicMaterial({ color: 255 }),
                  a = new o.Mesh(t, s);
                e.touchPointNode.add(a);
              } else
                console.warn(
                  `Could not find touch dot, ${e.touchPointNodeName}, in touchpad component ${e.id}`,
                );
            Object.values(i).forEach((e) => {
              const { valueNodeName: s, minNodeName: o, maxNodeName: a, valueNodeProperty: i } = e;
              if (i === n.VisualResponseProperty.TRANSFORM) {
                if (
                  ((e.minNode = t.getObjectByName(o)),
                  (e.maxNode = t.getObjectByName(a)),
                  !e.minNode)
                )
                  return void console.warn(`Could not find ${o} in the model`);
                if (!e.maxNode) return void console.warn(`Could not find ${a} in the model`);
              }
              (e.valueNode = t.getObjectByName(s)),
                e.valueNode || console.warn(`Could not find ${s} in the model`);
            });
          });
        })(e.motionController, t),
          e.envMap &&
            t.traverse((t) => {
              t.isMesh && ((t.material.envMap = e.envMap), (t.material.needsUpdate = !0));
            }),
          e.add(t);
      }
      class m {
        constructor(e = null) {
          (this.gltfLoader = e),
            (this.path =
              'https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles'),
            (this._assetCache = {}),
            this.gltfLoader || (this.gltfLoader = new a.GLTFLoader());
        }
        createControllerModel(e) {
          const t = new p();
          let s = null;
          return (
            e.addEventListener('connected', (e) => {
              const o = e.data;
              'tracked-pointer' === o.targetRayMode &&
                o.gamepad &&
                r(o, this.path, 'generic-trigger')
                  .then(({ profile: e, assetPath: a }) => {
                    t.motionController = new d(o, e, a);
                    const n = this._assetCache[t.motionController.assetUrl];
                    if (n) (s = n.scene.clone()), c(t, s);
                    else {
                      if (!this.gltfLoader) throw new Error('GLTFLoader not set.');
                      this.gltfLoader.setPath(''),
                        this.gltfLoader.load(
                          t.motionController.assetUrl,
                          (e) => {
                            (this._assetCache[t.motionController.assetUrl] = e),
                              (s = e.scene.clone()),
                              c(t, s);
                          },
                          null,
                          () => {
                            throw new Error(
                              `Asset ${t.motionController.assetUrl} missing or malformed.`,
                            );
                          },
                        );
                    }
                  })
                  .catch((e) => {
                    console.warn(e);
                  });
            }),
            e.addEventListener('disconnected', () => {
              (t.motionController = null), t.remove(s), (s = null);
            }),
            t
          );
        }
      }
    },
  },
]);
