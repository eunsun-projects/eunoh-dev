/*! For license information please see 176.js.LICENSE.txt */
'use strict';
(self.webpackChunkmp_webgl = self.webpackChunkmp_webgl || []).push([
  [176],
  {
    63592: (t, e, i) => {
      i.d(e, { s: () => s });
      var n = i(42141);
      class s extends n.V {
        constructor() {
          super(),
            (this.name = 'room-mesh-data'),
            (this.floors = new Set()),
            (this.rooms = new Set());
        }
      }
    },
    10880: (t, e, i) => {
      i.d(e, { Y: () => s });
      var n = i(56063);
      class s extends n.m {
        constructor(t, e) {
          super(), (this.payload = { owner: t, isVisible: e });
        }
      }
      s.id = 'TOGGLE_SCENES_BY_OWNER';
    },
    35176: (t, e, i) => {
      i.r(e), i.d(e, { default: () => Ee });
      var n,
        s = i(933),
        r = i(4763),
        a = i(72961),
        o = i(53257);
      !(function (t) {
        (t.CLICK = 'INTERACTION.CLICK'),
          (t.HOVER = 'INTERACTION.HOVER'),
          (t.DRAG = 'INTERACTION.DRAG'),
          (t.DRAG_BEGIN = 'INTERACTION.DRAG_BEGIN'),
          (t.DRAG_END = 'INTERACTION.DRAG_END'),
          (t.POINTER_MOVE = 'INTERACTION.POINTER_MOVE'),
          (t.POINTER_BUTTON = 'INTERACTION.POINTER_BUTTON'),
          (t.SCROLL = 'INTERACTION.SCROLL'),
          (t.KEY = 'INTERACTION.KEY'),
          (t.LONG_PRESS_START = 'INTERACTION.LONG_PRESS_START'),
          (t.LONG_PRESS_END = 'INTERACTION.LONG_PRESS_END'),
          (t.MULTI_SWIPE = 'INTERACTION.MULTI_SWIPE'),
          (t.MULTI_SWIPE_END = 'INTERACTION.MULTI_SWIPE_END'),
          (t.PINCH = 'INTERACTION.PINCH'),
          (t.PINCH_END = 'INTERACTION.PINCH_END'),
          (t.ROTATE = 'INTERACTION.ROTATE'),
          (t.ROTATE_END = 'INTERACTION.ROTATE_END');
      })(n || (n = {}));
      const h = 'global';
      var l = i(28721);
      class d {
        constructor() {
          this.ids = new Set();
        }
        reserve(t) {
          return !this.ids.has(t) && (this.ids.add(t), !0);
        }
        peekId() {
          let t;
          do {
            t = (0, l.O1)(4);
          } while (!this.isAvailable(t));
          return t;
        }
        nextId() {
          const t = this.peekId();
          return this.reserve(t), t;
        }
        release(t) {
          this.ids.delete(t);
        }
        isAvailable(t) {
          return !this.ids.has(t);
        }
      }
      const c = new o.Z('SceneComponentFactory');
      class u {
        constructor() {
          (this.idTracker = new d()), (this.scopedFactories = {});
        }
        registerFactory(t, e) {
          let i = h;
          t.scope && (i = t.scope);
          const n = this.scopedFactories[i] || {};
          return (
            (n[t.name] = e),
            (this.scopedFactories[i] = n),
            c.debug(`Component "${i}.${t.name}" registered`),
            !0
          );
        }
        unregisterFactory(t, e) {
          return !0;
        }
        newInstance(t, e, i, n, s, r) {
          let a = null;
          if (t.scope !== h) {
            const e = this.scopedFactories[t.scope];
            e && (a = e[t.name]);
          }
          if ((a || (a = this.scopedFactories.global[t.name]), !a))
            throw Error(`Unknown component "${t.name}"`);
          const o = a();
          return (
            (o.componentType = t.name),
            u.setupInputs(o, r),
            u.setupOutputs(o),
            u.setupBind(o, this.idTracker, n, s),
            u.setupEvents(o),
            u.setupEmits(o),
            u.setupBindEvent(o, this.idTracker, n, s),
            u.setupNotify(o, i),
            u.setupSpyOnEvent(o, this.idTracker, n, s),
            (o.context = e),
            o
          );
        }
        static setupInputs(t, e) {
          if (!t.inputs || 0 === Object.keys(t.inputs).length) return;
          t.inputs = (0, a.$)(t.inputs);
          const i = t.inputs;
          if (e) for (const t of Object.keys(e)) t in i && (i[t] = e[t]);
          for (const t of Object.keys(i)) {
            const e = i[t];
            e &&
              'object' == typeof e &&
              !Array.isArray(e) &&
              0 !== Object.keys(e).length &&
              (i[t] = (0, a.$)(e));
          }
          return i;
        }
        static setupOutputs(t) {
          if (((t.outputs = t.outputs || {}), t.outputs.hasOwnProperty('objectRoot')))
            throw Error('outputs.objectRoot is a reserved property of the outputs object');
          if (t.outputs.hasOwnProperty('collider'))
            throw Error('outputs.collider is a reserved property of the outputs object');
          (t.outputs.objectRoot = t.outputs.objectRoot || null),
            (t.outputs.collider = t.outputs.collider || null),
            (t.outputs = (0, a.$)(t.outputs));
        }
        static setupBind(t, e, i, n) {
          const s = t.inputs;
          t.bind = s
            ? function (n, r, a) {
                if (
                  (c.warn(
                    '`SceneComponent.bind` has been deprecated. See `SceneObject.bindPath` for replacement functionality',
                  ),
                  !s || !(n in s))
                )
                  throw Error(n + ' is not an input of the target component');
                const o = i.addInputPath(t, n, 'input-' + e.nextId()),
                  h = i.addOutputPath(r, a, 'output-' + e.nextId());
                i.bindPath(o, h);
              }
            : function () {
                throw (
                  (c.warn(
                    '`SceneComponent.bind` has been deprecated. See `SceneObject.bindPath` for replacement functionality',
                  ),
                  Error('This component has no inputs, bind failed'))
                );
              };
        }
        static setupEvents(t) {
          const e = t.events || {};
          !(function (t, e) {
            for (const i of e) t[i] = !!t[i];
          })(e, Object.values(n)),
            (t.events = (0, a.$)(e));
        }
        static setupEmits(t) {
          const e = t.emits;
          e && Object.keys(e).length > 0 && (t.emits = (0, a.$)(e));
        }
        static setupBindEvent(t, e, i, n) {
          t.bindEvent = function (n, s, r) {
            if (
              (c.warn(
                '`SceneComponent.bindEvent` has been deprecated. See `SceneObject.bindPath` for replacement functionality',
              ),
              !(n in t.events))
            )
              throw Error(n + ' is not supported by the target component');
            const a = i.addEventPath(t, n, 'event-' + e.nextId());
            f(s, r);
            const o = i.addEmitPath(s, r, 'emit-' + e.nextId());
            i.bindPath(a, o);
          };
        }
        static setupNotify(t, e) {
          t.notify = function (i, n) {
            (t.emits && !t.emits[i]) || e.notify(t, { type: i, data: n });
          };
        }
        static setupSpyOnEvent(t, e, i, n) {
          t.spyOnEvent = function (n) {
            c.warn(
              '`SceneComponent.spyOnEvent` has been deprecated. See `SceneObject.spyOnEvent` for replacement functionality',
            ),
              f(t, n.eventType);
            const s = i.addEmitPath(t, n.eventType, 'event-spy-' + e.nextId());
            return i.spyOnEvent({ path: s, onEvent: n.onEvent.bind(n) });
          };
        }
      }
      function f(t, e) {
        const i = t.emits;
        (i && i.isObservableProxy) || ((t.emits = i || {}), (t.emits[e] = !0));
      }
      class p {
        constructor() {
          this.observers = new Map();
        }
        notify(t, e) {
          const i = this.observers.get(t);
          if (i) {
            const t = i.get(e.type) || [];
            for (const i of t) i.onEvent(i.targetEventType, e.data);
          }
        }
        observe(t) {
          const e = this.observers.get(t.src) || new Map();
          this.observers.set(t.src, e);
          const i = e.get(t.srcEventType) || new Set();
          e.set(t.srcEventType, i), i.add(t);
          const n = this;
          return {
            cancel() {
              n.removeObserver(t);
            },
          };
        }
        removeObserver(t) {
          const { src: e, srcEventType: i } = t,
            n = this.observers.get(e);
          if (n) {
            const e = n.get(i);
            e && e.delete(t);
          }
        }
      }
      var _ = i(81396);
      class g {
        constructor(t, e, i, n) {
          (this.instance = e),
            (this.onBeforeRender = i),
            (this.analytics = n),
            (this.state = null),
            (this.inputsCache = null),
            (this.dirty = !1),
            (this.interactionQueue = []),
            (this.eventSpies = new Set()),
            (this.log = new o.Z(t)),
            (this.onDataChanged = this.onDataChanged.bind(this));
        }
        init() {}
        beforeRender(t) {
          if ((this.onBeforeRender.update(), this.instance.onEvent))
            for (; this.interactionQueue.length > 0; ) {
              const t = this.interactionQueue.shift();
              if (t)
                try {
                  this.instance.onEvent(t.type, t.data);
                  for (const e of this.eventSpies)
                    e.srcEventType === t.type && e.onEvent(t.type, t.data);
                } catch (t) {
                  this.log.error(t);
                }
            }
          if (this.dirty && this.instance.onInputsUpdated && this.inputsCache) {
            try {
              this.instance.onInputsUpdated(this.inputsCache);
            } catch (t) {
              this.log.error(t);
            }
            Object.assign(this.inputsCache, this.instance.inputs), (this.dirty = !1);
          }
          if (this.instance.onTick)
            try {
              this.instance.onTick(t);
            } catch (t) {
              this.log.error(t);
            }
        }
        spyOnEvent(t) {
          this.eventSpies.add(t);
          const e = this;
          return {
            cancel() {
              e.eventSpies.delete(t);
            },
          };
        }
        render(t) {}
        dispose() {
          this.state && this.state.removeOnChanged(this.onDataChanged);
        }
        activate() {
          const t = this.instance.inputs;
          if (
            (t && (t.onChanged(this.onDataChanged), (this.inputsCache = Object.assign({}, t))),
            this.instance.onInit)
          )
            try {
              this.instance.onInit();
            } catch (t) {
              this.log.error(t);
            }
          const e = { componentType: this.instance.componentType };
          this.analytics.track('sdk_component_start', this.instance.componentType, e);
        }
        deactivate() {
          const t = this.instance.inputs;
          if ((t && t.removeOnChanged(this.onDataChanged), this.instance.onDestroy))
            try {
              this.instance.onDestroy();
            } catch (t) {
              this.log.error(t);
            }
        }
        onDataChanged() {
          this.dirty = !0;
        }
        onEvent(t) {
          this.interactionQueue.push(t);
        }
      }
      var w = i(79242),
        b = i(86210),
        m = i(95840),
        y = i(21676);
      class v {
        constructor(t) {
          this.propertyAccessor = t;
        }
        create(t, e) {
          return this._createProxy(t, (i) => {
            const n = this.propertyAccessor;
            return {
              get: () => (n.onAccess(e, i), t[i]),
              set: (s) => (n.onAccess(e, i), (t[i] = s), s),
            };
          });
        }
        createReadonly(t, e) {
          return this._createProxy(t, (i) => {
            const n = this.propertyAccessor;
            return { get: () => (n.onAccess(e, i), t[i]) };
          });
        }
        _createProxy(t, e) {
          const i = {};
          for (const n in t) t.hasOwnProperty(n) && Object.defineProperty(i, n, e(n));
          return i;
        }
      }
      var k = i(59491);
      const E = new o.Z('SceneNode');
      var x;
      !(function (t) {
        (t[(t.Idle = 0)] = 'Idle'),
          (t[(t.Operating = 1)] = 'Operating'),
          (t[(t.Stopped = 2)] = 'Stopped');
      })(x || (x = {}));
      class A {
        constructor(t, e, i, n, s, r, a, o, h, l, c) {
          (this.componentLoader = t),
            (this.renderer = e),
            (this.targets = i),
            (this.analytics = n),
            (this.componentFactory = s),
            (this.sceneObject = r),
            (this.eventBus = a),
            (this.inputIni = o),
            (this.sceneNodeFactory = l),
            (this.id = c),
            (this.obj3D = new _.Object3D()),
            (this.state = x.Idle),
            (this.components = []),
            (this.componentLookup = new Map()),
            (this.interactionsSubs = []),
            (this.idTracker = new d()),
            (this.proxyFactory = new v(h));
          const u = this;
          this.facade = new (class {
            get id() {
              return u.id;
            }
            get name() {
              return u.name;
            }
            set name(t) {
              u.name = t;
            }
            get position() {
              return u.position;
            }
            get quaternion() {
              return u.quaternion;
            }
            get scale() {
              return u.scale;
            }
            get obj3D() {
              return u.obj3D;
            }
            componentIterator() {
              return u.componentIterator();
            }
            bindings() {
              return u.bindings();
            }
            findComponentById(t) {
              return u.findComponentById(t);
            }
            addComponent(t, e, i) {
              return u.addComponent(t, e, i);
            }
            start() {
              return u.start();
            }
            stop() {
              return u.stop();
            }
          })();
        }
        *componentIterator() {
          for (const t of this.components) yield t.instance;
        }
        *bindings() {
          for (const t of this.sceneObject.bindings()) {
            const [e] = t;
            e.node.id === this.id && (yield t);
          }
        }
        findComponentById(t) {
          const e = this.components.find((e) => e.instance.id === t);
          return e ? e.instance : null;
        }
        getComponentByInstance(t) {
          const e = this.componentLookup.get(t.id);
          if (e && e.instance === t) return e;
        }
        publicFacade() {
          return this.facade;
        }
        addObject(t) {
          return this.obj3D.add(t), t;
        }
        removeObject(t) {
          this.obj3D.remove(t);
        }
        addCollider(t) {
          return this.targets.addTarget(t, !1), t;
        }
        removeCollider(t) {
          this.targets.removeTarget(t);
        }
        get name() {
          return this.obj3D.name || '';
        }
        set name(t) {
          this.obj3D.name = t;
        }
        get position() {
          return this.obj3D.position;
        }
        get quaternion() {
          return this.obj3D.quaternion;
        }
        get scale() {
          return this.obj3D.scale;
        }
        addComponent(t, e, i) {
          if (this.state !== x.Idle)
            return E.warn('Cannot add component after the node has started'), null;
          const n = this.publicFacade(),
            s = {
              three: this.proxyFactory.createReadonly(_, 'three'),
              renderer: this.proxyFactory.create(this.renderer.threeRenderer, 'renderer'),
              scene: this.renderer.getScene().scene,
              camera: this.renderer.getScene().camera,
              nodeFactory: this.sceneNodeFactory,
              root: n,
            };
          const r = this.componentFactory.newInstance(
              { scope: this.sceneObject.scope, name: t },
              s,
              this.eventBus,
              this.sceneObject,
              n,
              e,
            ),
            a = new g(
              t,
              r,
              new (class {
                constructor(t) {
                  this.sceneNode = t;
                }
                update() {
                  this.sceneNode.obj3D.updateMatrixWorld();
                }
              })(this),
              this.analytics,
            ),
            o = r.outputs;
          this.subscribeToObjectOutput(o);
          const h = this.subscribeToInteraction(a, r);
          if ((this.interactionsSubs.push(h), i)) {
            if (!this.idTracker.isAvailable(i))
              throw Error('Component with duplicate id detected.');
            if (-1 !== i.indexOf('/')) throw Error('Component ids cannot have "/" character.');
            this.idTracker.reserve(i);
          }
          const l = i || this.idTracker.nextId();
          return (
            Object.defineProperty(r, 'id', { value: l, writable: !1, enumerable: !0 }),
            this.components.push(a),
            this.sceneObject.onComponentAdded(n, r),
            this.componentLookup.set(r.id, a),
            r
          );
        }
        subscribeToObjectOutput(t) {
          let e;
          t.onPropertyChanged('objectRoot', () => {
            var i;
            e && (this.removeObject(e), (e = void 0)),
              (null === (i = t.objectRoot) || void 0 === i ? void 0 : i.isObject3D)
                ? (e = this.addObject(t.objectRoot))
                : t.objectRoot && E.warn('outputs.object is not an instanceof THREE.Object3D');
          });
        }
        subscribeToInteraction(t, e) {
          let i, s;
          const r = e.outputs,
            a = () => {
              if ((i && (this.removeCollider(i), (i = void 0)), s)) {
                for (const t of s) t.cancel();
                s = void 0;
              }
            },
            o = () => {
              var n;
              a(),
                (null === (n = r.collider) || void 0 === n ? void 0 : n.isObject3D)
                  ? ((i = this.addCollider(r.collider)),
                    (s = this.registerInput(t, r.collider, e.events)))
                  : r.collider && E.warn('outputs.collider is not an instanceof THREE.Object3D');
            };
          return (
            e.events.onPropertyChanged(n.CLICK, o),
            e.events.onPropertyChanged(n.HOVER, o),
            e.events.onPropertyChanged(n.DRAG, o),
            r.onPropertyChanged('collider', o),
            (0, k.k1)(
              () => {},
              () => a(),
            )
          );
        }
        registerInput(t, e, i) {
          const s = (e, i, n, s) => {
              const r = A.inputEventMap.get(Object.getPrototypeOf(e).constructor);
              if (r) {
                const a = {
                  type: r,
                  data: Object.assign(s || {}, {
                    collider: i,
                    point: n ? n.point : null,
                    normal: n && n.face ? n.face.normal : null,
                    input: e,
                  }),
                };
                t.onEvent(a);
              }
            },
            r = y.s.is((t) => (t === e && t.visible) || U(e)(t)),
            a = [];
          return (
            i[n.CLICK] && a.push(this.inputIni.registerMeshHandler(w.Rd, r, s)),
            i[n.HOVER] &&
              a.push(
                this.inputIni.registerMeshHandler(b.z, r, (t, e, i) => {
                  s(t, e, i, { hover: !0 });
                }),
                this.inputIni.registerMeshHandler(b.A, r, (t, e, i) => {
                  s(t, e, i, { hover: !1 });
                }),
              ),
            i[n.DRAG] &&
              a.push(
                this.inputIni.registerMeshHandler(m.E0, r, s),
                this.inputIni.registerMeshHandler(m._t, r, s),
                this.inputIni.registerMeshHandler(m._R, r, s),
              ),
            a
          );
        }
        start() {
          if (this.state === x.Idle) {
            this.obj3D.parent || this.sceneObject.attachRenderableNode(this.obj3D);
            for (const t of this.components) this.componentLoader.addComponent(t);
            this.state = x.Operating;
          }
        }
        stop() {
          if (this.state === x.Operating) {
            for (const t of this.interactionsSubs) t.cancel();
            this.interactionsSubs = [];
            for (const t of this.components) this.componentLoader.removeComponent(t);
            this.obj3D.parent && this.obj3D.parent.remove(this.obj3D), (this.state = x.Stopped);
          }
        }
      }
      A.inputEventMap = new Map([
        [w.Rd, n.CLICK],
        [b.z, n.HOVER],
        [b.A, n.HOVER],
        [m._t, n.DRAG],
        [m.E0, n.DRAG_BEGIN],
        [m._R, n.DRAG_END],
      ]);
      const U = (t) => (e) => {
        for (let i = e; i; i = i.parent) {
          if (!i.visible) return !1;
          if (t === i.parent) return !0;
        }
        return !1;
      };
      var O = i(87011),
        R = i(36023);
      class T {
        async load(t, e) {
          let i = null;
          if (e) {
            const t = new R.MTLLoader();
            i = await ((n = t),
            (s = e),
            new Promise((t, e) => {
              n.load(
                s,
                function (e) {
                  t(e);
                },
                void 0,
                e,
              );
            }));
          }
          var n, s;
          const r = new O.OBJLoader();
          i && r.setMaterials(i);
          const a = await ((t, e) =>
            new Promise((i, n) => {
              t.load(
                e,
                function (t) {
                  i(t);
                },
                void 0,
                n,
              );
            }))(r, t);
          return (
            a.traverse((t) => {
              if ('Mesh' === t.type) {
                const e = t;
                (e.castShadow = !0), (e.receiveShadow = !0);
              }
            }),
            { objectRoot: a, collider: a }
          );
        }
      }
      T.factoryName = 'mp.objLoader';
      var N = i(62515);
      class z {
        async load(t, e) {
          const i = new N.FBXLoader(),
            n = await ((t, e) =>
              new Promise((i, n) => {
                t.load(
                  e,
                  function (t) {
                    i(t);
                  },
                  void 0,
                  n,
                );
              }))(i, t);
          return (
            n.traverse((t) => {
              if ('Mesh' === t.type) {
                const e = t;
                (e.castShadow = !0), (e.receiveShadow = !0);
              }
            }),
            { objectRoot: n, collider: n }
          );
        }
      }
      z.factoryName = 'mp.fbxLoader';
      var I = i(69706);
      class C {
        async load(t, e) {
          const i = new I.ColladaLoader(),
            n = await ((t, e) =>
              new Promise((i, n) => {
                t.load(
                  e,
                  function (t) {
                    i(t);
                  },
                  void 0,
                  n,
                );
              }))(i, t);
          return (
            n.scene.traverse((t) => {
              if ('Mesh' === t.type) {
                const e = t;
                (e.castShadow = !0), (e.receiveShadow = !0);
              }
            }),
            { objectRoot: n.scene, collider: n.scene }
          );
        }
      }
      C.factoryName = 'mp.daeLoader';
      var S = i(1217);
      class D {
        async load(t, e) {
          const i = new S.GLTFLoader(),
            n = await ((t, e) =>
              new Promise((i, n) => {
                t.load(
                  e,
                  function (t) {
                    i(t);
                  },
                  void 0,
                  n,
                );
              }))(i, t);
          return (
            n.scene.traverse((t) => {
              if ('Mesh' === t.type || 'SkinnedMesh' === t.type) {
                const e = t;
                (e.castShadow = !0),
                  (e.receiveShadow = !0),
                  e.material instanceof _.MeshStandardMaterial &&
                    e.material.map &&
                    (e.material.map.encoding = _.LinearEncoding);
              }
            }),
            { objectRoot: n.scene, collider: n.scene }
          );
        }
      }
      D.factoryName = 'mp.gltfLoader';
      var L,
        P = i(92327);
      !(function (t) {
        (t.Translate = 'translate'), (t.Rotate = 'rotate'), (t.scale = 'scale');
      })(L || (L = {}));
      function B(t) {
        class e {
          constructor() {
            (this.controlsSubs = []),
              (this.inputs = {
                selection: null,
                mode: L.Translate,
                showX: !0,
                showY: !0,
                showZ: !0,
                size: 1,
              }),
              (this.events = { [n.HOVER]: !1, [n.DRAG]: !0, [n.CLICK]: !1 });
          }
          onInit() {
            (this.transformControls = (function (t, e) {
              class i {
                addEventListener(t, i, n) {
                  return e.addEventListener(t, i, n);
                }
                removeEventListener(t, i, n) {
                  return e.removeEventListener(t, i, n);
                }
                getBoundingClientRect() {
                  return e.getBoundingClientRect();
                }
                setPointerCapture(t) {
                  return e.setPointerCapture(t);
                }
                releasePointerCapture(t) {
                  return e.releasePointerCapture(t);
                }
                get ownerDocument() {
                  return {
                    get pointerLockElement() {
                      return e.ownerDocument.pointerLockElement ? this : null;
                    },
                  };
                }
              }
              class n extends P.TransformControls {
                constructor() {
                  super(t, e), (this.domElement = new i());
                }
              }
              return new n();
            })(this.context.camera, t)),
              (this.transformControls.enabled = !0),
              (this.outputs.objectRoot = this.transformControls),
              (this.collider = this.transformControls.children[0]),
              this.onInputsUpdated();
          }
          onEvent() {}
          onInputsUpdated() {
            if (this.inputs.selection) {
              const t = this.inputs.selection.obj3D;
              this.transformControls.attach(t), (this.outputs.collider = this.collider);
            } else this.transformControls.detach(), (this.outputs.collider = null);
            this.handleMode();
          }
          onDestroy() {
            for (const t of this.controlsSubs) t.cancel();
            (this.outputs.objectRoot = null), this.transformControls.dispose();
          }
          handleMode() {
            this.transformControls.mode !== this.inputs.mode &&
              this.transformControls.setMode(this.inputs.mode),
              (this.transformControls.showX = this.inputs.showX),
              (this.transformControls.showY = this.inputs.showY),
              (this.transformControls.showZ = this.inputs.showZ),
              (this.transformControls.size = this.inputs.size);
          }
        }
        return () => new e();
      }
      var F,
        M = i(42642);
      class j {
        constructor() {
          (this.visibleCache = !0),
            (this.lengthCache = 1),
            (this.radiusCache = 0.5),
            (this.fillColorCache = 'rgba(0,255,0,0.3)'),
            (this.textColorCache = 'rgb(0,255,0)'),
            (this.textCache = '➡︎'),
            (this.fontCache = '48px sans-serif'),
            (this.mesh = null),
            (this.material = null),
            (this.geometry = null),
            (this.texture = null),
            (this.time = 0),
            (this.inputs = {
              visible: !0,
              length: 1,
              radius: 0.5,
              fillColor: 'rgba(0,255,0,0.3)',
              textColor: 'rgb(255,255,255)',
              text: '➡︎',
              font: '48px sans-serif',
              scrollSpeed: 1,
            });
        }
        onInit() {
          this.updateCache(), this.makeTube();
        }
        onInputsUpdated() {
          (this.inputs.length === this.lengthCache &&
            this.inputs.radius === this.radiusCache &&
            this.inputs.fillColor === this.fillColorCache &&
            this.inputs.textColor === this.textColorCache &&
            this.inputs.text === this.textCache &&
            this.inputs.font === this.fontCache) ||
            (this.updateCache(), this.makeTube()),
            this.visibleCache !== this.inputs.visible &&
              ((this.visibleCache = this.inputs.visible),
              this.mesh && (this.mesh.visible = this.inputs.visible));
        }
        onDestroy() {
          this.releaseTube();
        }
        updateCache() {
          (this.radiusCache = this.inputs.radius),
            (this.lengthCache = this.inputs.length),
            (this.fillColorCache = this.inputs.fillColor),
            (this.textColorCache = this.inputs.textColor),
            (this.textCache = this.inputs.text),
            (this.fontCache = this.inputs.font);
        }
        makeTube() {
          this.releaseTube();
          const t = document.createElement('canvas').getContext('2d');
          if (!t) return;
          (t.canvas.width = 64),
            (t.canvas.height = 64),
            (t.fillStyle = this.inputs.fillColor),
            t.fillRect(0, 0, 64, 64),
            t.translate(32, 32),
            t.rotate(0.5 * Math.PI),
            (t.fillStyle = this.inputs.textColor),
            (t.textAlign = 'center'),
            (t.textBaseline = 'middle'),
            (t.font = this.inputs.font),
            t.fillText(this.inputs.text, 0, 0),
            (this.texture = new _.CanvasTexture(t.canvas)),
            (this.texture.wrapS = _.RepeatWrapping),
            (this.texture.wrapT = _.RepeatWrapping),
            (this.texture.repeat.x = 4),
            (this.texture.repeat.y = this.inputs.length / (2 * this.inputs.radius));
          const e = new _.CylinderGeometry(
            this.inputs.radius,
            this.inputs.radius,
            this.inputs.length,
            20,
            2,
            !0,
          );
          (this.material = new _.MeshBasicMaterial({
            map: this.texture,
            depthWrite: !1,
            depthTest: !1,
            transparent: !0,
          })),
            (this.outputs.objectRoot = new _.Mesh(e, this.material));
        }
        onTick(t) {
          (this.time += t),
            this.texture &&
              (this.texture.offset.y = ((this.inputs.scrollSpeed * this.time) / 1e3) % 1);
        }
        releaseTube() {
          this.material && (this.material.dispose(), (this.material = null)),
            this.geometry && (this.geometry.dispose(), (this.geometry = null)),
            this.texture && (this.texture.dispose(), (this.texture = null)),
            (this.mesh = null);
        }
      }
      (j.factory = () => new j()),
        (j.factoryName = 'mp.scrollingTube'),
        (function (t) {
          (t.Scene = 'scene'), (t.Model = 'model'), (t.Floor = 'floor'), (t.Room = 'room');
        })(F || (F = {}));
      class Z {
        constructor() {
          (this.tagMap = new Map()), (this.tmpSet = new Set());
        }
        tagObject(t, e) {
          for (const i of e) {
            let e = this.tagMap.get(i);
            e || ((e = []), this.tagMap.set(i, e));
            e.find((e) => e === t) || e.push(t);
          }
        }
        untagObject(t, e) {
          for (const i of e) {
            const e = this.tagMap.get(i);
            if (e) {
              const i = e.findIndex((e) => e === t);
              -1 !== i && e.splice(i);
            }
          }
        }
        getObjects(t) {
          const e = [];
          for (const i of t) {
            const t = this.tagMap.get(i);
            if (t) for (const i of t) this.tmpSet.has(i) || (e.push(i), this.tmpSet.add(i));
          }
          return this.tmpSet.clear(), e;
        }
        clearAllTags() {
          this.tagMap.clear();
        }
      }
      class H {
        onInit() {
          const t = new _.Object3D(),
            e = new _.AmbientLight(8947848),
            i = new _.DirectionalLight(14540253, 1);
          i.position.set(1, 0.5, 1), t.add(e), t.add(i), (this.outputs.objectRoot = t);
        }
      }
      (H.factory = () => new H()), (H.factoryName = 'mp.lights');
      class W {
        constructor() {
          this.inputs = {
            enabled: !0,
            color: { r: 1, g: 1, b: 1 },
            intensity: 2,
            position: { x: 1, y: 5, z: 1 },
            distance: 0,
            decay: 1,
            castShadow: !1,
            debug: !1,
          };
        }
        onInit() {
          (this.light = new _.PointLight()),
            (this.lightHelper = new _.PointLightHelper(this.light, 1));
          const t = new _.Group();
          t.add(this.light),
            t.add(this.lightHelper),
            this.onInputsUpdated(),
            (this.outputs.objectRoot = t);
        }
        onInputsUpdated() {
          (this.light.visible = this.inputs.enabled),
            (this.lightHelper.visible = this.inputs.debug),
            this.light.visible &&
              (this.light.position.set(
                this.inputs.position.x,
                this.inputs.position.y,
                this.inputs.position.z,
              ),
              this.light.color.setRGB(
                this.inputs.color.r,
                this.inputs.color.g,
                this.inputs.color.b,
              ),
              (this.light.intensity = this.inputs.intensity),
              (this.light.distance = this.inputs.distance),
              (this.light.decay = this.inputs.decay),
              (this.light.castShadow = this.inputs.castShadow));
        }
        onDestroy() {
          this.lightHelper.dispose(), (this.outputs.objectRoot = null);
        }
        onTick() {
          this.inputs.debug && this.lightHelper.update();
        }
      }
      (W.factory = () => new W()), (W.factoryName = 'mp.pointLight');
      class K {
        constructor() {
          this.inputs = {
            enabled: !0,
            color: { r: 1, g: 1, b: 1 },
            intensity: 2,
            position: { x: 1, y: 5, z: 1 },
            target: { x: 0, y: 0, z: 0 },
            castShadow: !1,
            debug: !1,
          };
        }
        onInit() {
          (this.targetObject = new _.Object3D()),
            (this.light = new _.DirectionalLight()),
            (this.light.target = this.targetObject),
            (this.light.castShadow = !0),
            (this.lightHelper = new _.DirectionalLightHelper(this.light, 1));
          const t = new _.Group();
          t.add(this.light),
            t.add(this.targetObject),
            t.add(this.lightHelper),
            this.onInputsUpdated(),
            (this.outputs.objectRoot = t);
        }
        onInputsUpdated(t = null) {
          (this.light.visible = this.inputs.enabled),
            (this.lightHelper.visible = this.inputs.debug),
            this.inputs.enabled &&
              (this.targetObject.position.set(
                this.inputs.target.x,
                this.inputs.target.y,
                this.inputs.target.z,
              ),
              this.light.position.set(
                this.inputs.position.x,
                this.inputs.position.y,
                this.inputs.position.z,
              ),
              this.light.color.setRGB(
                this.inputs.color.r,
                this.inputs.color.g,
                this.inputs.color.b,
              ),
              (this.light.intensity = this.inputs.intensity),
              (this.light.castShadow = this.inputs.castShadow));
        }
        onTick(t) {
          this.inputs.debug && this.lightHelper.update();
        }
        onDestroy() {
          this.lightHelper.dispose(), (this.outputs.objectRoot = null);
        }
      }
      (K.factory = () => new K()), (K.factoryName = 'mp.directionalLight');
      class $ {
        constructor() {
          this.inputs = { enabled: !0, color: { r: 0.2, g: 0.2, b: 0.2 }, intensity: 1 };
        }
        onInit() {
          (this.light = new _.AmbientLight()),
            this.onInputsUpdated(),
            (this.outputs.objectRoot = this.light);
        }
        onInputsUpdated() {
          this.light.color.setRGB(this.inputs.color.r, this.inputs.color.g, this.inputs.color.b),
            (this.light.intensity = this.inputs.intensity),
            (this.light.visible = this.inputs.enabled);
        }
        onDestroy() {
          this.outputs.objectRoot = null;
        }
      }
      ($.factory = () => new $()), ($.factoryName = 'mp.ambientLight');
      var V = i(38099);
      class G {
        constructor(t, e) {
          (this.analytics = t),
            (this.sdkData = e),
            (this.track = async (t, e) => {
              if (this.sdkData.applicationKeys.length > 1) this.analytics.track(t, e);
              else {
                const i = this.sdkData.applicationKeys.get(0),
                  n = Object.assign(e || {}, { applicationKey: i.key, provider: i.provider });
                this.analytics.track(t, n);
              }
            });
        }
      }
      class Y {
        constructor(t) {
          (this.analytics = t), (this.trackedProperties = {});
        }
        onAccess(t, e) {
          if (this.trackedProperties[String(e)]) return;
          this.trackedProperties[String(e)] = !0;
          const i = { name: t, property: e };
          this.analytics.track('context-usage', i);
        }
      }
      class q {
        constructor(t) {
          (this.analytics = t), (this.trackedKeys = {});
        }
        track(t, e, i) {
          this.trackedKeys[String(e)] ||
            ((this.trackedKeys[String(e)] = !0), this.analytics.track(t, i));
        }
      }
      var X = i(10548),
        Q = i(27067);
      class J extends _.Loader {
        constructor(t, e, i) {
          super(i), (this.renderer = t), (this.requestq = new Q.gO()), (this.worker = e());
        }
        load(t, e) {
          const i = new _.Texture();
          return (
            this.requestImage(t).then(async (t) => {
              this.updateTexture(i, t), e && e(i);
            }),
            i
          );
        }
        async loadAsync(t) {
          const e = await this.requestImage(t),
            i = await this.worker.exec(e, [e]),
            n = new _.DataTexture(new Uint8ClampedArray(i.width), i.width, i.height);
          return (n.format = this.getPixelFormat(i)), this.prerenderTexture(n), n;
        }
        requestImage(t) {
          return this.requestq.get(t, { responseType: 'arraybuffer' });
        }
        async updateTexture(t, e) {
          const i = await this.worker.exec(e, [e]);
          (t.format = this.getPixelFormat(i)),
            (function (t, e) {
              (t.image = { data: new Uint8Array(e.data), height: e.height, width: e.width }),
                (t.isDataTexture = !0);
            })(t, i),
            this.prerenderTexture(t);
        }
        getPixelFormat(t) {
          const e = t.data.byteLength / (t.width * t.height);
          if (4 === e) return _.RGBAFormat;
          if (1 === e) return _.AlphaFormat;
          throw Error('images with only 2 or 3 channels are not supported');
        }
        prerenderTexture(t) {
          (t.needsUpdate = !0), this.renderer.initTexture(t), (t.image = new ImageData(1, 1));
        }
      }
      var tt = i(89798);
      const et = new WeakMap();
      function it(t) {
        return function () {
          return (function (t) {
            let e = et.get(t);
            return e || ((e = new J(t, X.createJpegDecodeWorker, tt.U)), et.set(t, e)), e;
          })(t);
        };
      }
      var nt = i(29078),
        st = i(20477),
        rt = i.n(st);
      (0, nt.h)(function () {
        return rt()(
          '/*! For license information please see PNGEncoder.worker.worker.js.LICENSE.txt */\n(()=>{"use strict";var t={396:function(){!function(t){if(t.TextEncoder&&t.TextDecoder)return!1;function e(t="utf-8"){if("utf-8"!==t)throw new RangeError(`Failed to construct \'TextEncoder\': The encoding label provided (\'${t}\') is invalid.`)}function i(t="utf-8",e={fatal:!1}){if("utf-8"!==t)throw new RangeError(`Failed to construct \'TextDecoder\': The encoding label provided (\'${t}\') is invalid.`);if(e.fatal)throw new Error("Failed to construct \'TextDecoder\': the \'fatal\' option is unsupported.")}Object.defineProperty(e.prototype,"encoding",{value:"utf-8"}),e.prototype.encode=function(t,e={stream:!1}){if(e.stream)throw new Error("Failed to encode: the \'stream\' option is unsupported.");let i=0;const a=t.length;let n=0,r=Math.max(32,a+(a>>1)+7),s=new Uint8Array(r>>3<<3);for(;i<a;){let e=t.charCodeAt(i++);if(e>=55296&&e<=56319){if(i<a){const a=t.charCodeAt(i);56320==(64512&a)&&(++i,e=((1023&e)<<10)+(1023&a)+65536)}if(e>=55296&&e<=56319)continue}if(n+4>s.length){r+=8,r*=1+i/t.length*2,r=r>>3<<3;const e=new Uint8Array(r);e.set(s),s=e}if(0!=(4294967168&e)){if(0==(4294965248&e))s[n++]=e>>6&31|192;else if(0==(4294901760&e))s[n++]=e>>12&15|224,s[n++]=e>>6&63|128;else{if(0!=(4292870144&e))continue;s[n++]=e>>18&7|240,s[n++]=e>>12&63|128,s[n++]=e>>6&63|128}s[n++]=63&e|128}else s[n++]=e}return s.slice(0,n)},Object.defineProperty(i.prototype,"encoding",{value:"utf-8"}),Object.defineProperty(i.prototype,"fatal",{value:!1}),Object.defineProperty(i.prototype,"ignoreBOM",{value:!1}),i.prototype.decode=function(t,e={stream:!1}){if(e.stream)throw new Error("Failed to decode: the \'stream\' option is unsupported.");const i=new Uint8Array(t);let a=0;const n=i.length,r=[];for(;a<n;){const t=i[a++];if(0===t)break;if(0==(128&t))r.push(t);else if(192==(224&t)){const e=63&i[a++];r.push((31&t)<<6|e)}else if(224==(240&t)){const e=63&i[a++],n=63&i[a++];r.push((31&t)<<12|e<<6|n)}else if(240==(248&t)){let e=(7&t)<<18|(63&i[a++])<<12|(63&i[a++])<<6|63&i[a++];e>65535&&(e-=65536,r.push(e>>>10&1023|55296),e=56320|1023&e),r.push(e)}}return String.fromCharCode.apply(null,r)},t.TextEncoder=e,t.TextDecoder=i}("undefined"!=typeof window?window:"undefined"!=typeof self?self:this)}},e={};function i(a){var n=e[a];if(void 0!==n)return n.exports;var r=e[a]={exports:{}};return t[a].call(r.exports,r,r.exports,i),r.exports}(()=>{i(396);const t=new TextDecoder("utf-8");const e=new TextEncoder;class a{constructor(t=8192,e={}){let i=!1;"number"==typeof t?t=new ArrayBuffer(t):(i=!0,this.lastWrittenByte=t.byteLength);const n=e.offset?e.offset>>>0:0,r=t.byteLength-n;let s=n;(ArrayBuffer.isView(t)||t instanceof a)&&(t.byteLength!==t.buffer.byteLength&&(s=t.byteOffset+n),t=t.buffer),this.lastWrittenByte=i?r:0,this.buffer=t,this.length=r,this.byteLength=r,this.byteOffset=s,this.offset=0,this.littleEndian=!0,this._data=new DataView(this.buffer,s,r),this._mark=0,this._marks=[]}available(t=1){return this.offset+t<=this.length}isLittleEndian(){return this.littleEndian}setLittleEndian(){return this.littleEndian=!0,this}isBigEndian(){return!this.littleEndian}setBigEndian(){return this.littleEndian=!1,this}skip(t=1){return this.offset+=t,this}seek(t){return this.offset=t,this}mark(){return this._mark=this.offset,this}reset(){return this.offset=this._mark,this}pushMark(){return this._marks.push(this.offset),this}popMark(){const t=this._marks.pop();if(void 0===t)throw new Error("Mark stack empty");return this.seek(t),this}rewind(){return this.offset=0,this}ensureAvailable(t=1){if(!this.available(t)){const e=2*(this.offset+t),i=new Uint8Array(e);i.set(new Uint8Array(this.buffer)),this.buffer=i.buffer,this.length=this.byteLength=e,this._data=new DataView(this.buffer)}return this}readBoolean(){return 0!==this.readUint8()}readInt8(){return this._data.getInt8(this.offset++)}readUint8(){return this._data.getUint8(this.offset++)}readByte(){return this.readUint8()}readBytes(t=1){const e=new Uint8Array(t);for(let i=0;i<t;i++)e[i]=this.readByte();return e}readInt16(){const t=this._data.getInt16(this.offset,this.littleEndian);return this.offset+=2,t}readUint16(){const t=this._data.getUint16(this.offset,this.littleEndian);return this.offset+=2,t}readInt32(){const t=this._data.getInt32(this.offset,this.littleEndian);return this.offset+=4,t}readUint32(){const t=this._data.getUint32(this.offset,this.littleEndian);return this.offset+=4,t}readFloat32(){const t=this._data.getFloat32(this.offset,this.littleEndian);return this.offset+=4,t}readFloat64(){const t=this._data.getFloat64(this.offset,this.littleEndian);return this.offset+=8,t}readChar(){return String.fromCharCode(this.readInt8())}readChars(t=1){let e="";for(let i=0;i<t;i++)e+=this.readChar();return e}readUtf8(e=1){return i=this.readBytes(e),t.decode(i);var i}writeBoolean(t){return this.writeUint8(t?255:0),this}writeInt8(t){return this.ensureAvailable(1),this._data.setInt8(this.offset++,t),this._updateLastWrittenByte(),this}writeUint8(t){return this.ensureAvailable(1),this._data.setUint8(this.offset++,t),this._updateLastWrittenByte(),this}writeByte(t){return this.writeUint8(t)}writeBytes(t){this.ensureAvailable(t.length);for(let e=0;e<t.length;e++)this._data.setUint8(this.offset++,t[e]);return this._updateLastWrittenByte(),this}writeInt16(t){return this.ensureAvailable(2),this._data.setInt16(this.offset,t,this.littleEndian),this.offset+=2,this._updateLastWrittenByte(),this}writeUint16(t){return this.ensureAvailable(2),this._data.setUint16(this.offset,t,this.littleEndian),this.offset+=2,this._updateLastWrittenByte(),this}writeInt32(t){return this.ensureAvailable(4),this._data.setInt32(this.offset,t,this.littleEndian),this.offset+=4,this._updateLastWrittenByte(),this}writeUint32(t){return this.ensureAvailable(4),this._data.setUint32(this.offset,t,this.littleEndian),this.offset+=4,this._updateLastWrittenByte(),this}writeFloat32(t){return this.ensureAvailable(4),this._data.setFloat32(this.offset,t,this.littleEndian),this.offset+=4,this._updateLastWrittenByte(),this}writeFloat64(t){return this.ensureAvailable(8),this._data.setFloat64(this.offset,t,this.littleEndian),this.offset+=8,this._updateLastWrittenByte(),this}writeChar(t){return this.writeUint8(t.charCodeAt(0))}writeChars(t){for(let e=0;e<t.length;e++)this.writeUint8(t.charCodeAt(e));return this}writeUtf8(t){return this.writeBytes(function(t){return e.encode(t)}(t))}toArray(){return new Uint8Array(this.buffer,this.byteOffset,this.lastWrittenByte)}_updateLastWrittenByte(){this.offset>this.lastWrittenByte&&(this.lastWrittenByte=this.offset)}}function n(t){let e=t.length;for(;--e>=0;)t[e]=0}const r=256,s=286,o=30,h=15,l=new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]),d=new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]),_=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]),f=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),c=new Array(576);n(c);const u=new Array(60);n(u);const w=new Array(512);n(w);const g=new Array(256);n(g);const b=new Array(29);n(b);const p=new Array(o);function m(t,e,i,a,n){this.static_tree=t,this.extra_bits=e,this.extra_base=i,this.elems=a,this.max_length=n,this.has_stree=t&&t.length}let k,y,v;function E(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}n(p);const A=t=>t<256?w[t]:w[256+(t>>>7)],x=(t,e)=>{t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255},U=(t,e,i)=>{t.bi_valid>16-i?(t.bi_buf|=e<<t.bi_valid&65535,x(t,t.bi_buf),t.bi_buf=e>>16-t.bi_valid,t.bi_valid+=i-16):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=i)},z=(t,e,i)=>{U(t,i[2*e],i[2*e+1])},R=(t,e)=>{let i=0;do{i|=1&t,t>>>=1,i<<=1}while(--e>0);return i>>>1},O=(t,e,i)=>{const a=new Array(16);let n,r,s=0;for(n=1;n<=h;n++)a[n]=s=s+i[n-1]<<1;for(r=0;r<=e;r++){let e=t[2*r+1];0!==e&&(t[2*r]=R(a[e]++,e))}},N=t=>{let e;for(e=0;e<s;e++)t.dyn_ltree[2*e]=0;for(e=0;e<o;e++)t.dyn_dtree[2*e]=0;for(e=0;e<19;e++)t.bl_tree[2*e]=0;t.dyn_ltree[512]=1,t.opt_len=t.static_len=0,t.last_lit=t.matches=0},L=t=>{t.bi_valid>8?x(t,t.bi_buf):t.bi_valid>0&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0},T=(t,e,i,a)=>{const n=2*e,r=2*i;return t[n]<t[r]||t[n]===t[r]&&a[e]<=a[i]},D=(t,e,i)=>{const a=t.heap[i];let n=i<<1;for(;n<=t.heap_len&&(n<t.heap_len&&T(e,t.heap[n+1],t.heap[n],t.depth)&&n++,!T(e,a,t.heap[n],t.depth));)t.heap[i]=t.heap[n],i=n,n<<=1;t.heap[i]=a},B=(t,e,i)=>{let a,n,s,o,h=0;if(0!==t.last_lit)do{a=t.pending_buf[t.d_buf+2*h]<<8|t.pending_buf[t.d_buf+2*h+1],n=t.pending_buf[t.l_buf+h],h++,0===a?z(t,n,e):(s=g[n],z(t,s+r+1,e),o=l[s],0!==o&&(n-=b[s],U(t,n,o)),a--,s=A(a),z(t,s,i),o=d[s],0!==o&&(a-=p[s],U(t,a,o)))}while(h<t.last_lit);z(t,256,e)},Z=(t,e)=>{const i=e.dyn_tree,a=e.stat_desc.static_tree,n=e.stat_desc.has_stree,r=e.stat_desc.elems;let s,o,l,d=-1;for(t.heap_len=0,t.heap_max=573,s=0;s<r;s++)0!==i[2*s]?(t.heap[++t.heap_len]=d=s,t.depth[s]=0):i[2*s+1]=0;for(;t.heap_len<2;)l=t.heap[++t.heap_len]=d<2?++d:0,i[2*l]=1,t.depth[l]=0,t.opt_len--,n&&(t.static_len-=a[2*l+1]);for(e.max_code=d,s=t.heap_len>>1;s>=1;s--)D(t,i,s);l=r;do{s=t.heap[1],t.heap[1]=t.heap[t.heap_len--],D(t,i,1),o=t.heap[1],t.heap[--t.heap_max]=s,t.heap[--t.heap_max]=o,i[2*l]=i[2*s]+i[2*o],t.depth[l]=(t.depth[s]>=t.depth[o]?t.depth[s]:t.depth[o])+1,i[2*s+1]=i[2*o+1]=l,t.heap[1]=l++,D(t,i,1)}while(t.heap_len>=2);t.heap[--t.heap_max]=t.heap[1],((t,e)=>{const i=e.dyn_tree,a=e.max_code,n=e.stat_desc.static_tree,r=e.stat_desc.has_stree,s=e.stat_desc.extra_bits,o=e.stat_desc.extra_base,l=e.stat_desc.max_length;let d,_,f,c,u,w,g=0;for(c=0;c<=h;c++)t.bl_count[c]=0;for(i[2*t.heap[t.heap_max]+1]=0,d=t.heap_max+1;d<573;d++)_=t.heap[d],c=i[2*i[2*_+1]+1]+1,c>l&&(c=l,g++),i[2*_+1]=c,_>a||(t.bl_count[c]++,u=0,_>=o&&(u=s[_-o]),w=i[2*_],t.opt_len+=w*(c+u),r&&(t.static_len+=w*(n[2*_+1]+u)));if(0!==g){do{for(c=l-1;0===t.bl_count[c];)c--;t.bl_count[c]--,t.bl_count[c+1]+=2,t.bl_count[l]--,g-=2}while(g>0);for(c=l;0!==c;c--)for(_=t.bl_count[c];0!==_;)f=t.heap[--d],f>a||(i[2*f+1]!==c&&(t.opt_len+=(c-i[2*f+1])*i[2*f],i[2*f+1]=c),_--)}})(t,e),O(i,d,t.bl_count)},S=(t,e,i)=>{let a,n,r=-1,s=e[1],o=0,h=7,l=4;for(0===s&&(h=138,l=3),e[2*(i+1)+1]=65535,a=0;a<=i;a++)n=s,s=e[2*(a+1)+1],++o<h&&n===s||(o<l?t.bl_tree[2*n]+=o:0!==n?(n!==r&&t.bl_tree[2*n]++,t.bl_tree[32]++):o<=10?t.bl_tree[34]++:t.bl_tree[36]++,o=0,r=n,0===s?(h=138,l=3):n===s?(h=6,l=3):(h=7,l=4))},I=(t,e,i)=>{let a,n,r=-1,s=e[1],o=0,h=7,l=4;for(0===s&&(h=138,l=3),a=0;a<=i;a++)if(n=s,s=e[2*(a+1)+1],!(++o<h&&n===s)){if(o<l)do{z(t,n,t.bl_tree)}while(0!=--o);else 0!==n?(n!==r&&(z(t,n,t.bl_tree),o--),z(t,16,t.bl_tree),U(t,o-3,2)):o<=10?(z(t,17,t.bl_tree),U(t,o-3,3)):(z(t,18,t.bl_tree),U(t,o-11,7));o=0,r=n,0===s?(h=138,l=3):n===s?(h=6,l=3):(h=7,l=4)}};let C=!1;const F=(t,e,i,a)=>{U(t,0+(a?1:0),3),((t,e,i,a)=>{L(t),a&&(x(t,i),x(t,~i)),t.pending_buf.set(t.window.subarray(e,e+i),t.pending),t.pending+=i})(t,e,i,!0)};var M={_tr_init:t=>{C||((()=>{let t,e,i,a,n;const r=new Array(16);for(i=0,a=0;a<28;a++)for(b[a]=i,t=0;t<1<<l[a];t++)g[i++]=a;for(g[i-1]=a,n=0,a=0;a<16;a++)for(p[a]=n,t=0;t<1<<d[a];t++)w[n++]=a;for(n>>=7;a<o;a++)for(p[a]=n<<7,t=0;t<1<<d[a]-7;t++)w[256+n++]=a;for(e=0;e<=h;e++)r[e]=0;for(t=0;t<=143;)c[2*t+1]=8,t++,r[8]++;for(;t<=255;)c[2*t+1]=9,t++,r[9]++;for(;t<=279;)c[2*t+1]=7,t++,r[7]++;for(;t<=287;)c[2*t+1]=8,t++,r[8]++;for(O(c,287,r),t=0;t<o;t++)u[2*t+1]=5,u[2*t]=R(t,5);k=new m(c,l,257,s,h),y=new m(u,d,0,o,h),v=new m(new Array(0),_,0,19,7)})(),C=!0),t.l_desc=new E(t.dyn_ltree,k),t.d_desc=new E(t.dyn_dtree,y),t.bl_desc=new E(t.bl_tree,v),t.bi_buf=0,t.bi_valid=0,N(t)},_tr_stored_block:F,_tr_flush_block:(t,e,i,a)=>{let n,s,o=0;t.level>0?(2===t.strm.data_type&&(t.strm.data_type=(t=>{let e,i=4093624447;for(e=0;e<=31;e++,i>>>=1)if(1&i&&0!==t.dyn_ltree[2*e])return 0;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return 1;for(e=32;e<r;e++)if(0!==t.dyn_ltree[2*e])return 1;return 0})(t)),Z(t,t.l_desc),Z(t,t.d_desc),o=(t=>{let e;for(S(t,t.dyn_ltree,t.l_desc.max_code),S(t,t.dyn_dtree,t.d_desc.max_code),Z(t,t.bl_desc),e=18;e>=3&&0===t.bl_tree[2*f[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e})(t),n=t.opt_len+3+7>>>3,s=t.static_len+3+7>>>3,s<=n&&(n=s)):n=s=i+5,i+4<=n&&-1!==e?F(t,e,i,a):4===t.strategy||s===n?(U(t,2+(a?1:0),3),B(t,c,u)):(U(t,4+(a?1:0),3),((t,e,i,a)=>{let n;for(U(t,e-257,5),U(t,i-1,5),U(t,a-4,4),n=0;n<a;n++)U(t,t.bl_tree[2*f[n]+1],3);I(t,t.dyn_ltree,e-1),I(t,t.dyn_dtree,i-1)})(t,t.l_desc.max_code+1,t.d_desc.max_code+1,o+1),B(t,t.dyn_ltree,t.dyn_dtree)),N(t),a&&L(t)},_tr_tally:(t,e,i)=>(t.pending_buf[t.d_buf+2*t.last_lit]=e>>>8&255,t.pending_buf[t.d_buf+2*t.last_lit+1]=255&e,t.pending_buf[t.l_buf+t.last_lit]=255&i,t.last_lit++,0===e?t.dyn_ltree[2*i]++:(t.matches++,e--,t.dyn_ltree[2*(g[i]+r+1)]++,t.dyn_dtree[2*A(e)]++),t.last_lit===t.lit_bufsize-1),_tr_align:t=>{U(t,2,3),z(t,256,c),(t=>{16===t.bi_valid?(x(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):t.bi_valid>=8&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)})(t)}};var H=(t,e,i,a)=>{let n=65535&t|0,r=t>>>16&65535|0,s=0;for(;0!==i;){s=i>2e3?2e3:i,i-=s;do{n=n+e[a++]|0,r=r+n|0}while(--s);n%=65521,r%=65521}return n|r<<16|0};const W=new Uint32Array((()=>{let t,e=[];for(var i=0;i<256;i++){t=i;for(var a=0;a<8;a++)t=1&t?3988292384^t>>>1:t>>>1;e[i]=t}return e})());var K=(t,e,i,a)=>{const n=W,r=a+i;t^=-1;for(let i=a;i<r;i++)t=t>>>8^n[255&(t^e[i])];return-1^t},P={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"},j={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8};const{_tr_init:Y,_tr_stored_block:G,_tr_flush_block:$,_tr_tally:V,_tr_align:X}=M,{Z_NO_FLUSH:q,Z_PARTIAL_FLUSH:J,Z_FULL_FLUSH:Q,Z_FINISH:tt,Z_BLOCK:et,Z_OK:it,Z_STREAM_END:at,Z_STREAM_ERROR:nt,Z_DATA_ERROR:rt,Z_BUF_ERROR:st,Z_DEFAULT_COMPRESSION:ot,Z_FILTERED:ht,Z_HUFFMAN_ONLY:lt,Z_RLE:dt,Z_FIXED:_t,Z_DEFAULT_STRATEGY:ft,Z_UNKNOWN:ct,Z_DEFLATED:ut}=j,wt=258,gt=262,bt=103,pt=113,mt=666,kt=(t,e)=>(t.msg=P[e],e),yt=t=>(t<<1)-(t>4?9:0),vt=t=>{let e=t.length;for(;--e>=0;)t[e]=0};let Et=(t,e,i)=>(e<<t.hash_shift^i)&t.hash_mask;const At=t=>{const e=t.state;let i=e.pending;i>t.avail_out&&(i=t.avail_out),0!==i&&(t.output.set(e.pending_buf.subarray(e.pending_out,e.pending_out+i),t.next_out),t.next_out+=i,e.pending_out+=i,t.total_out+=i,t.avail_out-=i,e.pending-=i,0===e.pending&&(e.pending_out=0))},xt=(t,e)=>{$(t,t.block_start>=0?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,At(t.strm)},Ut=(t,e)=>{t.pending_buf[t.pending++]=e},zt=(t,e)=>{t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e},Rt=(t,e,i,a)=>{let n=t.avail_in;return n>a&&(n=a),0===n?0:(t.avail_in-=n,e.set(t.input.subarray(t.next_in,t.next_in+n),i),1===t.state.wrap?t.adler=H(t.adler,e,n,i):2===t.state.wrap&&(t.adler=K(t.adler,e,n,i)),t.next_in+=n,t.total_in+=n,n)},Ot=(t,e)=>{let i,a,n=t.max_chain_length,r=t.strstart,s=t.prev_length,o=t.nice_match;const h=t.strstart>t.w_size-gt?t.strstart-(t.w_size-gt):0,l=t.window,d=t.w_mask,_=t.prev,f=t.strstart+wt;let c=l[r+s-1],u=l[r+s];t.prev_length>=t.good_match&&(n>>=2),o>t.lookahead&&(o=t.lookahead);do{if(i=e,l[i+s]===u&&l[i+s-1]===c&&l[i]===l[r]&&l[++i]===l[r+1]){r+=2,i++;do{}while(l[++r]===l[++i]&&l[++r]===l[++i]&&l[++r]===l[++i]&&l[++r]===l[++i]&&l[++r]===l[++i]&&l[++r]===l[++i]&&l[++r]===l[++i]&&l[++r]===l[++i]&&r<f);if(a=wt-(f-r),r=f-wt,a>s){if(t.match_start=e,s=a,a>=o)break;c=l[r+s-1],u=l[r+s]}}}while((e=_[e&d])>h&&0!=--n);return s<=t.lookahead?s:t.lookahead},Nt=t=>{const e=t.w_size;let i,a,n,r,s;do{if(r=t.window_size-t.lookahead-t.strstart,t.strstart>=e+(e-gt)){t.window.set(t.window.subarray(e,e+e),0),t.match_start-=e,t.strstart-=e,t.block_start-=e,a=t.hash_size,i=a;do{n=t.head[--i],t.head[i]=n>=e?n-e:0}while(--a);a=e,i=a;do{n=t.prev[--i],t.prev[i]=n>=e?n-e:0}while(--a);r+=e}if(0===t.strm.avail_in)break;if(a=Rt(t.strm,t.window,t.strstart+t.lookahead,r),t.lookahead+=a,t.lookahead+t.insert>=3)for(s=t.strstart-t.insert,t.ins_h=t.window[s],t.ins_h=Et(t,t.ins_h,t.window[s+1]);t.insert&&(t.ins_h=Et(t,t.ins_h,t.window[s+3-1]),t.prev[s&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=s,s++,t.insert--,!(t.lookahead+t.insert<3)););}while(t.lookahead<gt&&0!==t.strm.avail_in)},Lt=(t,e)=>{let i,a;for(;;){if(t.lookahead<gt){if(Nt(t),t.lookahead<gt&&e===q)return 1;if(0===t.lookahead)break}if(i=0,t.lookahead>=3&&(t.ins_h=Et(t,t.ins_h,t.window[t.strstart+3-1]),i=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==i&&t.strstart-i<=t.w_size-gt&&(t.match_length=Ot(t,i)),t.match_length>=3)if(a=V(t,t.strstart-t.match_start,t.match_length-3),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=3){t.match_length--;do{t.strstart++,t.ins_h=Et(t,t.ins_h,t.window[t.strstart+3-1]),i=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart}while(0!=--t.match_length);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=Et(t,t.ins_h,t.window[t.strstart+1]);else a=V(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(a&&(xt(t,!1),0===t.strm.avail_out))return 1}return t.insert=t.strstart<2?t.strstart:2,e===tt?(xt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(xt(t,!1),0===t.strm.avail_out)?1:2},Tt=(t,e)=>{let i,a,n;for(;;){if(t.lookahead<gt){if(Nt(t),t.lookahead<gt&&e===q)return 1;if(0===t.lookahead)break}if(i=0,t.lookahead>=3&&(t.ins_h=Et(t,t.ins_h,t.window[t.strstart+3-1]),i=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=2,0!==i&&t.prev_length<t.max_lazy_match&&t.strstart-i<=t.w_size-gt&&(t.match_length=Ot(t,i),t.match_length<=5&&(t.strategy===ht||3===t.match_length&&t.strstart-t.match_start>4096)&&(t.match_length=2)),t.prev_length>=3&&t.match_length<=t.prev_length){n=t.strstart+t.lookahead-3,a=V(t,t.strstart-1-t.prev_match,t.prev_length-3),t.lookahead-=t.prev_length-1,t.prev_length-=2;do{++t.strstart<=n&&(t.ins_h=Et(t,t.ins_h,t.window[t.strstart+3-1]),i=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart)}while(0!=--t.prev_length);if(t.match_available=0,t.match_length=2,t.strstart++,a&&(xt(t,!1),0===t.strm.avail_out))return 1}else if(t.match_available){if(a=V(t,0,t.window[t.strstart-1]),a&&xt(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return 1}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(a=V(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<2?t.strstart:2,e===tt?(xt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(xt(t,!1),0===t.strm.avail_out)?1:2};function Dt(t,e,i,a,n){this.good_length=t,this.max_lazy=e,this.nice_length=i,this.max_chain=a,this.func=n}const Bt=[new Dt(0,0,0,0,((t,e)=>{let i=65535;for(i>t.pending_buf_size-5&&(i=t.pending_buf_size-5);;){if(t.lookahead<=1){if(Nt(t),0===t.lookahead&&e===q)return 1;if(0===t.lookahead)break}t.strstart+=t.lookahead,t.lookahead=0;const a=t.block_start+i;if((0===t.strstart||t.strstart>=a)&&(t.lookahead=t.strstart-a,t.strstart=a,xt(t,!1),0===t.strm.avail_out))return 1;if(t.strstart-t.block_start>=t.w_size-gt&&(xt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===tt?(xt(t,!0),0===t.strm.avail_out?3:4):(t.strstart>t.block_start&&(xt(t,!1),t.strm.avail_out),1)})),new Dt(4,4,8,4,Lt),new Dt(4,5,16,8,Lt),new Dt(4,6,32,32,Lt),new Dt(4,4,16,16,Tt),new Dt(8,16,32,32,Tt),new Dt(8,16,128,128,Tt),new Dt(8,32,128,256,Tt),new Dt(32,128,258,1024,Tt),new Dt(32,258,258,4096,Tt)];function Zt(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=ut,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new Uint16Array(1146),this.dyn_dtree=new Uint16Array(122),this.bl_tree=new Uint16Array(78),vt(this.dyn_ltree),vt(this.dyn_dtree),vt(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new Uint16Array(16),this.heap=new Uint16Array(573),vt(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new Uint16Array(573),vt(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}const St=t=>{if(!t||!t.state)return kt(t,nt);t.total_in=t.total_out=0,t.data_type=ct;const e=t.state;return e.pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=e.wrap?42:pt,t.adler=2===e.wrap?0:1,e.last_flush=q,Y(e),it},It=t=>{const e=St(t);var i;return e===it&&((i=t.state).window_size=2*i.w_size,vt(i.head),i.max_lazy_match=Bt[i.level].max_lazy,i.good_match=Bt[i.level].good_length,i.nice_match=Bt[i.level].nice_length,i.max_chain_length=Bt[i.level].max_chain,i.strstart=0,i.block_start=0,i.lookahead=0,i.insert=0,i.match_length=i.prev_length=2,i.match_available=0,i.ins_h=0),e},Ct=(t,e,i,a,n,r)=>{if(!t)return nt;let s=1;if(e===ot&&(e=6),a<0?(s=0,a=-a):a>15&&(s=2,a-=16),n<1||n>9||i!==ut||a<8||a>15||e<0||e>9||r<0||r>_t)return kt(t,nt);8===a&&(a=9);const o=new Zt;return t.state=o,o.strm=t,o.wrap=s,o.gzhead=null,o.w_bits=a,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=n+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+3-1)/3),o.window=new Uint8Array(2*o.w_size),o.head=new Uint16Array(o.hash_size),o.prev=new Uint16Array(o.w_size),o.lit_bufsize=1<<n+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new Uint8Array(o.pending_buf_size),o.d_buf=1*o.lit_bufsize,o.l_buf=3*o.lit_bufsize,o.level=e,o.strategy=r,o.method=i,It(t)};var Ft={deflateInit:(t,e)=>Ct(t,e,ut,15,8,ft),deflateInit2:Ct,deflateReset:It,deflateResetKeep:St,deflateSetHeader:(t,e)=>t&&t.state?2!==t.state.wrap?nt:(t.state.gzhead=e,it):nt,deflate:(t,e)=>{let i,a;if(!t||!t.state||e>et||e<0)return t?kt(t,nt):nt;const n=t.state;if(!t.output||!t.input&&0!==t.avail_in||n.status===mt&&e!==tt)return kt(t,0===t.avail_out?st:nt);n.strm=t;const r=n.last_flush;if(n.last_flush=e,42===n.status)if(2===n.wrap)t.adler=0,Ut(n,31),Ut(n,139),Ut(n,8),n.gzhead?(Ut(n,(n.gzhead.text?1:0)+(n.gzhead.hcrc?2:0)+(n.gzhead.extra?4:0)+(n.gzhead.name?8:0)+(n.gzhead.comment?16:0)),Ut(n,255&n.gzhead.time),Ut(n,n.gzhead.time>>8&255),Ut(n,n.gzhead.time>>16&255),Ut(n,n.gzhead.time>>24&255),Ut(n,9===n.level?2:n.strategy>=lt||n.level<2?4:0),Ut(n,255&n.gzhead.os),n.gzhead.extra&&n.gzhead.extra.length&&(Ut(n,255&n.gzhead.extra.length),Ut(n,n.gzhead.extra.length>>8&255)),n.gzhead.hcrc&&(t.adler=K(t.adler,n.pending_buf,n.pending,0)),n.gzindex=0,n.status=69):(Ut(n,0),Ut(n,0),Ut(n,0),Ut(n,0),Ut(n,0),Ut(n,9===n.level?2:n.strategy>=lt||n.level<2?4:0),Ut(n,3),n.status=pt);else{let e=ut+(n.w_bits-8<<4)<<8,i=-1;i=n.strategy>=lt||n.level<2?0:n.level<6?1:6===n.level?2:3,e|=i<<6,0!==n.strstart&&(e|=32),e+=31-e%31,n.status=pt,zt(n,e),0!==n.strstart&&(zt(n,t.adler>>>16),zt(n,65535&t.adler)),t.adler=1}if(69===n.status)if(n.gzhead.extra){for(i=n.pending;n.gzindex<(65535&n.gzhead.extra.length)&&(n.pending!==n.pending_buf_size||(n.gzhead.hcrc&&n.pending>i&&(t.adler=K(t.adler,n.pending_buf,n.pending-i,i)),At(t),i=n.pending,n.pending!==n.pending_buf_size));)Ut(n,255&n.gzhead.extra[n.gzindex]),n.gzindex++;n.gzhead.hcrc&&n.pending>i&&(t.adler=K(t.adler,n.pending_buf,n.pending-i,i)),n.gzindex===n.gzhead.extra.length&&(n.gzindex=0,n.status=73)}else n.status=73;if(73===n.status)if(n.gzhead.name){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(t.adler=K(t.adler,n.pending_buf,n.pending-i,i)),At(t),i=n.pending,n.pending===n.pending_buf_size)){a=1;break}a=n.gzindex<n.gzhead.name.length?255&n.gzhead.name.charCodeAt(n.gzindex++):0,Ut(n,a)}while(0!==a);n.gzhead.hcrc&&n.pending>i&&(t.adler=K(t.adler,n.pending_buf,n.pending-i,i)),0===a&&(n.gzindex=0,n.status=91)}else n.status=91;if(91===n.status)if(n.gzhead.comment){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(t.adler=K(t.adler,n.pending_buf,n.pending-i,i)),At(t),i=n.pending,n.pending===n.pending_buf_size)){a=1;break}a=n.gzindex<n.gzhead.comment.length?255&n.gzhead.comment.charCodeAt(n.gzindex++):0,Ut(n,a)}while(0!==a);n.gzhead.hcrc&&n.pending>i&&(t.adler=K(t.adler,n.pending_buf,n.pending-i,i)),0===a&&(n.status=bt)}else n.status=bt;if(n.status===bt&&(n.gzhead.hcrc?(n.pending+2>n.pending_buf_size&&At(t),n.pending+2<=n.pending_buf_size&&(Ut(n,255&t.adler),Ut(n,t.adler>>8&255),t.adler=0,n.status=pt)):n.status=pt),0!==n.pending){if(At(t),0===t.avail_out)return n.last_flush=-1,it}else if(0===t.avail_in&&yt(e)<=yt(r)&&e!==tt)return kt(t,st);if(n.status===mt&&0!==t.avail_in)return kt(t,st);if(0!==t.avail_in||0!==n.lookahead||e!==q&&n.status!==mt){let i=n.strategy===lt?((t,e)=>{let i;for(;;){if(0===t.lookahead&&(Nt(t),0===t.lookahead)){if(e===q)return 1;break}if(t.match_length=0,i=V(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,i&&(xt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===tt?(xt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(xt(t,!1),0===t.strm.avail_out)?1:2})(n,e):n.strategy===dt?((t,e)=>{let i,a,n,r;const s=t.window;for(;;){if(t.lookahead<=wt){if(Nt(t),t.lookahead<=wt&&e===q)return 1;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=3&&t.strstart>0&&(n=t.strstart-1,a=s[n],a===s[++n]&&a===s[++n]&&a===s[++n])){r=t.strstart+wt;do{}while(a===s[++n]&&a===s[++n]&&a===s[++n]&&a===s[++n]&&a===s[++n]&&a===s[++n]&&a===s[++n]&&a===s[++n]&&n<r);t.match_length=wt-(r-n),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=3?(i=V(t,1,t.match_length-3),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(i=V(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),i&&(xt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===tt?(xt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(xt(t,!1),0===t.strm.avail_out)?1:2})(n,e):Bt[n.level].func(n,e);if(3!==i&&4!==i||(n.status=mt),1===i||3===i)return 0===t.avail_out&&(n.last_flush=-1),it;if(2===i&&(e===J?X(n):e!==et&&(G(n,0,0,!1),e===Q&&(vt(n.head),0===n.lookahead&&(n.strstart=0,n.block_start=0,n.insert=0))),At(t),0===t.avail_out))return n.last_flush=-1,it}return e!==tt?it:n.wrap<=0?at:(2===n.wrap?(Ut(n,255&t.adler),Ut(n,t.adler>>8&255),Ut(n,t.adler>>16&255),Ut(n,t.adler>>24&255),Ut(n,255&t.total_in),Ut(n,t.total_in>>8&255),Ut(n,t.total_in>>16&255),Ut(n,t.total_in>>24&255)):(zt(n,t.adler>>>16),zt(n,65535&t.adler)),At(t),n.wrap>0&&(n.wrap=-n.wrap),0!==n.pending?it:at)},deflateEnd:t=>{if(!t||!t.state)return nt;const e=t.state.status;return 42!==e&&69!==e&&73!==e&&91!==e&&e!==bt&&e!==pt&&e!==mt?kt(t,nt):(t.state=null,e===pt?kt(t,rt):it)},deflateSetDictionary:(t,e)=>{let i=e.length;if(!t||!t.state)return nt;const a=t.state,n=a.wrap;if(2===n||1===n&&42!==a.status||a.lookahead)return nt;if(1===n&&(t.adler=H(t.adler,e,i,0)),a.wrap=0,i>=a.w_size){0===n&&(vt(a.head),a.strstart=0,a.block_start=0,a.insert=0);let t=new Uint8Array(a.w_size);t.set(e.subarray(i-a.w_size,i),0),e=t,i=a.w_size}const r=t.avail_in,s=t.next_in,o=t.input;for(t.avail_in=i,t.next_in=0,t.input=e,Nt(a);a.lookahead>=3;){let t=a.strstart,e=a.lookahead-2;do{a.ins_h=Et(a,a.ins_h,a.window[t+3-1]),a.prev[t&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=t,t++}while(--e);a.strstart=t,a.lookahead=2,Nt(a)}return a.strstart+=a.lookahead,a.block_start=a.strstart,a.insert=a.lookahead,a.lookahead=0,a.match_length=a.prev_length=2,a.match_available=0,t.next_in=s,t.input=o,t.avail_in=r,a.wrap=n,it},deflateInfo:"pako deflate (from Nodeca project)"};const Mt=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var Ht=function(t){const e=Array.prototype.slice.call(arguments,1);for(;e.length;){const i=e.shift();if(i){if("object"!=typeof i)throw new TypeError(i+"must be non-object");for(const e in i)Mt(i,e)&&(t[e]=i[e])}}return t},Wt=t=>{let e=0;for(let i=0,a=t.length;i<a;i++)e+=t[i].length;const i=new Uint8Array(e);for(let e=0,a=0,n=t.length;e<n;e++){let n=t[e];i.set(n,a),a+=n.length}return i};let Kt=!0;try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(t){Kt=!1}const Pt=new Uint8Array(256);for(let t=0;t<256;t++)Pt[t]=t>=252?6:t>=248?5:t>=240?4:t>=224?3:t>=192?2:1;Pt[254]=Pt[254]=1;var jt=t=>{let e,i,a,n,r,s=t.length,o=0;for(n=0;n<s;n++)i=t.charCodeAt(n),55296==(64512&i)&&n+1<s&&(a=t.charCodeAt(n+1),56320==(64512&a)&&(i=65536+(i-55296<<10)+(a-56320),n++)),o+=i<128?1:i<2048?2:i<65536?3:4;for(e=new Uint8Array(o),r=0,n=0;r<o;n++)i=t.charCodeAt(n),55296==(64512&i)&&n+1<s&&(a=t.charCodeAt(n+1),56320==(64512&a)&&(i=65536+(i-55296<<10)+(a-56320),n++)),i<128?e[r++]=i:i<2048?(e[r++]=192|i>>>6,e[r++]=128|63&i):i<65536?(e[r++]=224|i>>>12,e[r++]=128|i>>>6&63,e[r++]=128|63&i):(e[r++]=240|i>>>18,e[r++]=128|i>>>12&63,e[r++]=128|i>>>6&63,e[r++]=128|63&i);return e},Yt=(t,e)=>{let i,a;const n=e||t.length,r=new Array(2*n);for(a=0,i=0;i<n;){let e=t[i++];if(e<128){r[a++]=e;continue}let s=Pt[e];if(s>4)r[a++]=65533,i+=s-1;else{for(e&=2===s?31:3===s?15:7;s>1&&i<n;)e=e<<6|63&t[i++],s--;s>1?r[a++]=65533:e<65536?r[a++]=e:(e-=65536,r[a++]=55296|e>>10&1023,r[a++]=56320|1023&e)}}return((t,e)=>{if(e<65534&&t.subarray&&Kt)return String.fromCharCode.apply(null,t.length===e?t:t.subarray(0,e));let i="";for(let a=0;a<e;a++)i+=String.fromCharCode(t[a]);return i})(r,a)},Gt=(t,e)=>{(e=e||t.length)>t.length&&(e=t.length);let i=e-1;for(;i>=0&&128==(192&t[i]);)i--;return i<0||0===i?e:i+Pt[t[i]]>e?i:e};var $t=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0};const Vt=Object.prototype.toString,{Z_NO_FLUSH:Xt,Z_SYNC_FLUSH:qt,Z_FULL_FLUSH:Jt,Z_FINISH:Qt,Z_OK:te,Z_STREAM_END:ee,Z_DEFAULT_COMPRESSION:ie,Z_DEFAULT_STRATEGY:ae,Z_DEFLATED:ne}=j;function re(t){this.options=Ht({level:ie,method:ne,chunkSize:16384,windowBits:15,memLevel:8,strategy:ae},t||{});let e=this.options;e.raw&&e.windowBits>0?e.windowBits=-e.windowBits:e.gzip&&e.windowBits>0&&e.windowBits<16&&(e.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new $t,this.strm.avail_out=0;let i=Ft.deflateInit2(this.strm,e.level,e.method,e.windowBits,e.memLevel,e.strategy);if(i!==te)throw new Error(P[i]);if(e.header&&Ft.deflateSetHeader(this.strm,e.header),e.dictionary){let t;if(t="string"==typeof e.dictionary?jt(e.dictionary):"[object ArrayBuffer]"===Vt.call(e.dictionary)?new Uint8Array(e.dictionary):e.dictionary,i=Ft.deflateSetDictionary(this.strm,t),i!==te)throw new Error(P[i]);this._dict_set=!0}}function se(t,e){const i=new re(e);if(i.push(t,!0),i.err)throw i.msg||P[i.err];return i.result}re.prototype.push=function(t,e){const i=this.strm,a=this.options.chunkSize;let n,r;if(this.ended)return!1;for(r=e===~~e?e:!0===e?Qt:Xt,"string"==typeof t?i.input=jt(t):"[object ArrayBuffer]"===Vt.call(t)?i.input=new Uint8Array(t):i.input=t,i.next_in=0,i.avail_in=i.input.length;;)if(0===i.avail_out&&(i.output=new Uint8Array(a),i.next_out=0,i.avail_out=a),(r===qt||r===Jt)&&i.avail_out<=6)this.onData(i.output.subarray(0,i.next_out)),i.avail_out=0;else{if(n=Ft.deflate(i,r),n===ee)return i.next_out>0&&this.onData(i.output.subarray(0,i.next_out)),n=Ft.deflateEnd(this.strm),this.onEnd(n),this.ended=!0,n===te;if(0!==i.avail_out){if(r>0&&i.next_out>0)this.onData(i.output.subarray(0,i.next_out)),i.avail_out=0;else if(0===i.avail_in)break}else this.onData(i.output)}return!0},re.prototype.onData=function(t){this.chunks.push(t)},re.prototype.onEnd=function(t){t===te&&(this.result=Wt(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg};var oe={Deflate:re,deflate:se,deflateRaw:function(t,e){return(e=e||{}).raw=!0,se(t,e)},gzip:function(t,e){return(e=e||{}).gzip=!0,se(t,e)},constants:j};var he=function(t,e){let i,a,n,r,s,o,h,l,d,_,f,c,u,w,g,b,p,m,k,y,v,E,A,x;const U=t.state;i=t.next_in,A=t.input,a=i+(t.avail_in-5),n=t.next_out,x=t.output,r=n-(e-t.avail_out),s=n+(t.avail_out-257),o=U.dmax,h=U.wsize,l=U.whave,d=U.wnext,_=U.window,f=U.hold,c=U.bits,u=U.lencode,w=U.distcode,g=(1<<U.lenbits)-1,b=(1<<U.distbits)-1;t:do{c<15&&(f+=A[i++]<<c,c+=8,f+=A[i++]<<c,c+=8),p=u[f&g];e:for(;;){if(m=p>>>24,f>>>=m,c-=m,m=p>>>16&255,0===m)x[n++]=65535&p;else{if(!(16&m)){if(0==(64&m)){p=u[(65535&p)+(f&(1<<m)-1)];continue e}if(32&m){U.mode=12;break t}t.msg="invalid literal/length code",U.mode=30;break t}k=65535&p,m&=15,m&&(c<m&&(f+=A[i++]<<c,c+=8),k+=f&(1<<m)-1,f>>>=m,c-=m),c<15&&(f+=A[i++]<<c,c+=8,f+=A[i++]<<c,c+=8),p=w[f&b];i:for(;;){if(m=p>>>24,f>>>=m,c-=m,m=p>>>16&255,!(16&m)){if(0==(64&m)){p=w[(65535&p)+(f&(1<<m)-1)];continue i}t.msg="invalid distance code",U.mode=30;break t}if(y=65535&p,m&=15,c<m&&(f+=A[i++]<<c,c+=8,c<m&&(f+=A[i++]<<c,c+=8)),y+=f&(1<<m)-1,y>o){t.msg="invalid distance too far back",U.mode=30;break t}if(f>>>=m,c-=m,m=n-r,y>m){if(m=y-m,m>l&&U.sane){t.msg="invalid distance too far back",U.mode=30;break t}if(v=0,E=_,0===d){if(v+=h-m,m<k){k-=m;do{x[n++]=_[v++]}while(--m);v=n-y,E=x}}else if(d<m){if(v+=h+d-m,m-=d,m<k){k-=m;do{x[n++]=_[v++]}while(--m);if(v=0,d<k){m=d,k-=m;do{x[n++]=_[v++]}while(--m);v=n-y,E=x}}}else if(v+=d-m,m<k){k-=m;do{x[n++]=_[v++]}while(--m);v=n-y,E=x}for(;k>2;)x[n++]=E[v++],x[n++]=E[v++],x[n++]=E[v++],k-=3;k&&(x[n++]=E[v++],k>1&&(x[n++]=E[v++]))}else{v=n-y;do{x[n++]=x[v++],x[n++]=x[v++],x[n++]=x[v++],k-=3}while(k>2);k&&(x[n++]=x[v++],k>1&&(x[n++]=x[v++]))}break}}break}}while(i<a&&n<s);k=c>>3,i-=k,c-=k<<3,f&=(1<<c)-1,t.next_in=i,t.next_out=n,t.avail_in=i<a?a-i+5:5-(i-a),t.avail_out=n<s?s-n+257:257-(n-s),U.hold=f,U.bits=c};const le=15,de=new Uint16Array([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0]),_e=new Uint8Array([16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78]),fe=new Uint16Array([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0]),ce=new Uint8Array([16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64]);var ue=(t,e,i,a,n,r,s,o)=>{const h=o.bits;let l,d,_,f,c,u,w=0,g=0,b=0,p=0,m=0,k=0,y=0,v=0,E=0,A=0,x=null,U=0;const z=new Uint16Array(16),R=new Uint16Array(16);let O,N,L,T=null,D=0;for(w=0;w<=le;w++)z[w]=0;for(g=0;g<a;g++)z[e[i+g]]++;for(m=h,p=le;p>=1&&0===z[p];p--);if(m>p&&(m=p),0===p)return n[r++]=20971520,n[r++]=20971520,o.bits=1,0;for(b=1;b<p&&0===z[b];b++);for(m<b&&(m=b),v=1,w=1;w<=le;w++)if(v<<=1,v-=z[w],v<0)return-1;if(v>0&&(0===t||1!==p))return-1;for(R[1]=0,w=1;w<le;w++)R[w+1]=R[w]+z[w];for(g=0;g<a;g++)0!==e[i+g]&&(s[R[e[i+g]]++]=g);if(0===t?(x=T=s,u=19):1===t?(x=de,U-=257,T=_e,D-=257,u=256):(x=fe,T=ce,u=-1),A=0,g=0,w=b,c=r,k=m,y=0,_=-1,E=1<<m,f=E-1,1===t&&E>852||2===t&&E>592)return 1;for(;;){O=w-y,s[g]<u?(N=0,L=s[g]):s[g]>u?(N=T[D+s[g]],L=x[U+s[g]]):(N=96,L=0),l=1<<w-y,d=1<<k,b=d;do{d-=l,n[c+(A>>y)+d]=O<<24|N<<16|L|0}while(0!==d);for(l=1<<w-1;A&l;)l>>=1;if(0!==l?(A&=l-1,A+=l):A=0,g++,0==--z[w]){if(w===p)break;w=e[i+s[g]]}if(w>m&&(A&f)!==_){for(0===y&&(y=m),c+=b,k=w-y,v=1<<k;k+y<p&&(v-=z[k+y],!(v<=0));)k++,v<<=1;if(E+=1<<k,1===t&&E>852||2===t&&E>592)return 1;_=A&f,n[_]=m<<24|k<<16|c-r|0}}return 0!==A&&(n[c+A]=w-y<<24|64<<16|0),o.bits=m,0};const{Z_FINISH:we,Z_BLOCK:ge,Z_TREES:be,Z_OK:pe,Z_STREAM_END:me,Z_NEED_DICT:ke,Z_STREAM_ERROR:ye,Z_DATA_ERROR:ve,Z_MEM_ERROR:Ee,Z_BUF_ERROR:Ae,Z_DEFLATED:xe}=j,Ue=12,ze=30,Re=t=>(t>>>24&255)+(t>>>8&65280)+((65280&t)<<8)+((255&t)<<24);function Oe(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new Uint16Array(320),this.work=new Uint16Array(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}const Ne=t=>{if(!t||!t.state)return ye;const e=t.state;return t.total_in=t.total_out=e.total=0,t.msg="",e.wrap&&(t.adler=1&e.wrap),e.mode=1,e.last=0,e.havedict=0,e.dmax=32768,e.head=null,e.hold=0,e.bits=0,e.lencode=e.lendyn=new Int32Array(852),e.distcode=e.distdyn=new Int32Array(592),e.sane=1,e.back=-1,pe},Le=t=>{if(!t||!t.state)return ye;const e=t.state;return e.wsize=0,e.whave=0,e.wnext=0,Ne(t)},Te=(t,e)=>{let i;if(!t||!t.state)return ye;const a=t.state;return e<0?(i=0,e=-e):(i=1+(e>>4),e<48&&(e&=15)),e&&(e<8||e>15)?ye:(null!==a.window&&a.wbits!==e&&(a.window=null),a.wrap=i,a.wbits=e,Le(t))},De=(t,e)=>{if(!t)return ye;const i=new Oe;t.state=i,i.window=null;const a=Te(t,e);return a!==pe&&(t.state=null),a};let Be,Ze,Se=!0;const Ie=t=>{if(Se){Be=new Int32Array(512),Ze=new Int32Array(32);let e=0;for(;e<144;)t.lens[e++]=8;for(;e<256;)t.lens[e++]=9;for(;e<280;)t.lens[e++]=7;for(;e<288;)t.lens[e++]=8;for(ue(1,t.lens,0,288,Be,0,t.work,{bits:9}),e=0;e<32;)t.lens[e++]=5;ue(2,t.lens,0,32,Ze,0,t.work,{bits:5}),Se=!1}t.lencode=Be,t.lenbits=9,t.distcode=Ze,t.distbits=5},Ce=(t,e,i,a)=>{let n;const r=t.state;return null===r.window&&(r.wsize=1<<r.wbits,r.wnext=0,r.whave=0,r.window=new Uint8Array(r.wsize)),a>=r.wsize?(r.window.set(e.subarray(i-r.wsize,i),0),r.wnext=0,r.whave=r.wsize):(n=r.wsize-r.wnext,n>a&&(n=a),r.window.set(e.subarray(i-a,i-a+n),r.wnext),(a-=n)?(r.window.set(e.subarray(i-a,i),0),r.wnext=a,r.whave=r.wsize):(r.wnext+=n,r.wnext===r.wsize&&(r.wnext=0),r.whave<r.wsize&&(r.whave+=n))),0};var Fe={inflateReset:Le,inflateReset2:Te,inflateResetKeep:Ne,inflateInit:t=>De(t,15),inflateInit2:De,inflate:(t,e)=>{let i,a,n,r,s,o,h,l,d,_,f,c,u,w,g,b,p,m,k,y,v,E,A=0;const x=new Uint8Array(4);let U,z;const R=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);if(!t||!t.state||!t.output||!t.input&&0!==t.avail_in)return ye;i=t.state,i.mode===Ue&&(i.mode=13),s=t.next_out,n=t.output,h=t.avail_out,r=t.next_in,a=t.input,o=t.avail_in,l=i.hold,d=i.bits,_=o,f=h,E=pe;t:for(;;)switch(i.mode){case 1:if(0===i.wrap){i.mode=13;break}for(;d<16;){if(0===o)break t;o--,l+=a[r++]<<d,d+=8}if(2&i.wrap&&35615===l){i.check=0,x[0]=255&l,x[1]=l>>>8&255,i.check=K(i.check,x,2,0),l=0,d=0,i.mode=2;break}if(i.flags=0,i.head&&(i.head.done=!1),!(1&i.wrap)||(((255&l)<<8)+(l>>8))%31){t.msg="incorrect header check",i.mode=ze;break}if((15&l)!==xe){t.msg="unknown compression method",i.mode=ze;break}if(l>>>=4,d-=4,v=8+(15&l),0===i.wbits)i.wbits=v;else if(v>i.wbits){t.msg="invalid window size",i.mode=ze;break}i.dmax=1<<i.wbits,t.adler=i.check=1,i.mode=512&l?10:Ue,l=0,d=0;break;case 2:for(;d<16;){if(0===o)break t;o--,l+=a[r++]<<d,d+=8}if(i.flags=l,(255&i.flags)!==xe){t.msg="unknown compression method",i.mode=ze;break}if(57344&i.flags){t.msg="unknown header flags set",i.mode=ze;break}i.head&&(i.head.text=l>>8&1),512&i.flags&&(x[0]=255&l,x[1]=l>>>8&255,i.check=K(i.check,x,2,0)),l=0,d=0,i.mode=3;case 3:for(;d<32;){if(0===o)break t;o--,l+=a[r++]<<d,d+=8}i.head&&(i.head.time=l),512&i.flags&&(x[0]=255&l,x[1]=l>>>8&255,x[2]=l>>>16&255,x[3]=l>>>24&255,i.check=K(i.check,x,4,0)),l=0,d=0,i.mode=4;case 4:for(;d<16;){if(0===o)break t;o--,l+=a[r++]<<d,d+=8}i.head&&(i.head.xflags=255&l,i.head.os=l>>8),512&i.flags&&(x[0]=255&l,x[1]=l>>>8&255,i.check=K(i.check,x,2,0)),l=0,d=0,i.mode=5;case 5:if(1024&i.flags){for(;d<16;){if(0===o)break t;o--,l+=a[r++]<<d,d+=8}i.length=l,i.head&&(i.head.extra_len=l),512&i.flags&&(x[0]=255&l,x[1]=l>>>8&255,i.check=K(i.check,x,2,0)),l=0,d=0}else i.head&&(i.head.extra=null);i.mode=6;case 6:if(1024&i.flags&&(c=i.length,c>o&&(c=o),c&&(i.head&&(v=i.head.extra_len-i.length,i.head.extra||(i.head.extra=new Uint8Array(i.head.extra_len)),i.head.extra.set(a.subarray(r,r+c),v)),512&i.flags&&(i.check=K(i.check,a,c,r)),o-=c,r+=c,i.length-=c),i.length))break t;i.length=0,i.mode=7;case 7:if(2048&i.flags){if(0===o)break t;c=0;do{v=a[r+c++],i.head&&v&&i.length<65536&&(i.head.name+=String.fromCharCode(v))}while(v&&c<o);if(512&i.flags&&(i.check=K(i.check,a,c,r)),o-=c,r+=c,v)break t}else i.head&&(i.head.name=null);i.length=0,i.mode=8;case 8:if(4096&i.flags){if(0===o)break t;c=0;do{v=a[r+c++],i.head&&v&&i.length<65536&&(i.head.comment+=String.fromCharCode(v))}while(v&&c<o);if(512&i.flags&&(i.check=K(i.check,a,c,r)),o-=c,r+=c,v)break t}else i.head&&(i.head.comment=null);i.mode=9;case 9:if(512&i.flags){for(;d<16;){if(0===o)break t;o--,l+=a[r++]<<d,d+=8}if(l!==(65535&i.check)){t.msg="header crc mismatch",i.mode=ze;break}l=0,d=0}i.head&&(i.head.hcrc=i.flags>>9&1,i.head.done=!0),t.adler=i.check=0,i.mode=Ue;break;case 10:for(;d<32;){if(0===o)break t;o--,l+=a[r++]<<d,d+=8}t.adler=i.check=Re(l),l=0,d=0,i.mode=11;case 11:if(0===i.havedict)return t.next_out=s,t.avail_out=h,t.next_in=r,t.avail_in=o,i.hold=l,i.bits=d,ke;t.adler=i.check=1,i.mode=Ue;case Ue:if(e===ge||e===be)break t;case 13:if(i.last){l>>>=7&d,d-=7&d,i.mode=27;break}for(;d<3;){if(0===o)break t;o--,l+=a[r++]<<d,d+=8}switch(i.last=1&l,l>>>=1,d-=1,3&l){case 0:i.mode=14;break;case 1:if(Ie(i),i.mode=20,e===be){l>>>=2,d-=2;break t}break;case 2:i.mode=17;break;case 3:t.msg="invalid block type",i.mode=ze}l>>>=2,d-=2;break;case 14:for(l>>>=7&d,d-=7&d;d<32;){if(0===o)break t;o--,l+=a[r++]<<d,d+=8}if((65535&l)!=(l>>>16^65535)){t.msg="invalid stored block lengths",i.mode=ze;break}if(i.length=65535&l,l=0,d=0,i.mode=15,e===be)break t;case 15:i.mode=16;case 16:if(c=i.length,c){if(c>o&&(c=o),c>h&&(c=h),0===c)break t;n.set(a.subarray(r,r+c),s),o-=c,r+=c,h-=c,s+=c,i.length-=c;break}i.mode=Ue;break;case 17:for(;d<14;){if(0===o)break t;o--,l+=a[r++]<<d,d+=8}if(i.nlen=257+(31&l),l>>>=5,d-=5,i.ndist=1+(31&l),l>>>=5,d-=5,i.ncode=4+(15&l),l>>>=4,d-=4,i.nlen>286||i.ndist>30){t.msg="too many length or distance symbols",i.mode=ze;break}i.have=0,i.mode=18;case 18:for(;i.have<i.ncode;){for(;d<3;){if(0===o)break t;o--,l+=a[r++]<<d,d+=8}i.lens[R[i.have++]]=7&l,l>>>=3,d-=3}for(;i.have<19;)i.lens[R[i.have++]]=0;if(i.lencode=i.lendyn,i.lenbits=7,U={bits:i.lenbits},E=ue(0,i.lens,0,19,i.lencode,0,i.work,U),i.lenbits=U.bits,E){t.msg="invalid code lengths set",i.mode=ze;break}i.have=0,i.mode=19;case 19:for(;i.have<i.nlen+i.ndist;){for(;A=i.lencode[l&(1<<i.lenbits)-1],g=A>>>24,b=A>>>16&255,p=65535&A,!(g<=d);){if(0===o)break t;o--,l+=a[r++]<<d,d+=8}if(p<16)l>>>=g,d-=g,i.lens[i.have++]=p;else{if(16===p){for(z=g+2;d<z;){if(0===o)break t;o--,l+=a[r++]<<d,d+=8}if(l>>>=g,d-=g,0===i.have){t.msg="invalid bit length repeat",i.mode=ze;break}v=i.lens[i.have-1],c=3+(3&l),l>>>=2,d-=2}else if(17===p){for(z=g+3;d<z;){if(0===o)break t;o--,l+=a[r++]<<d,d+=8}l>>>=g,d-=g,v=0,c=3+(7&l),l>>>=3,d-=3}else{for(z=g+7;d<z;){if(0===o)break t;o--,l+=a[r++]<<d,d+=8}l>>>=g,d-=g,v=0,c=11+(127&l),l>>>=7,d-=7}if(i.have+c>i.nlen+i.ndist){t.msg="invalid bit length repeat",i.mode=ze;break}for(;c--;)i.lens[i.have++]=v}}if(i.mode===ze)break;if(0===i.lens[256]){t.msg="invalid code -- missing end-of-block",i.mode=ze;break}if(i.lenbits=9,U={bits:i.lenbits},E=ue(1,i.lens,0,i.nlen,i.lencode,0,i.work,U),i.lenbits=U.bits,E){t.msg="invalid literal/lengths set",i.mode=ze;break}if(i.distbits=6,i.distcode=i.distdyn,U={bits:i.distbits},E=ue(2,i.lens,i.nlen,i.ndist,i.distcode,0,i.work,U),i.distbits=U.bits,E){t.msg="invalid distances set",i.mode=ze;break}if(i.mode=20,e===be)break t;case 20:i.mode=21;case 21:if(o>=6&&h>=258){t.next_out=s,t.avail_out=h,t.next_in=r,t.avail_in=o,i.hold=l,i.bits=d,he(t,f),s=t.next_out,n=t.output,h=t.avail_out,r=t.next_in,a=t.input,o=t.avail_in,l=i.hold,d=i.bits,i.mode===Ue&&(i.back=-1);break}for(i.back=0;A=i.lencode[l&(1<<i.lenbits)-1],g=A>>>24,b=A>>>16&255,p=65535&A,!(g<=d);){if(0===o)break t;o--,l+=a[r++]<<d,d+=8}if(b&&0==(240&b)){for(m=g,k=b,y=p;A=i.lencode[y+((l&(1<<m+k)-1)>>m)],g=A>>>24,b=A>>>16&255,p=65535&A,!(m+g<=d);){if(0===o)break t;o--,l+=a[r++]<<d,d+=8}l>>>=m,d-=m,i.back+=m}if(l>>>=g,d-=g,i.back+=g,i.length=p,0===b){i.mode=26;break}if(32&b){i.back=-1,i.mode=Ue;break}if(64&b){t.msg="invalid literal/length code",i.mode=ze;break}i.extra=15&b,i.mode=22;case 22:if(i.extra){for(z=i.extra;d<z;){if(0===o)break t;o--,l+=a[r++]<<d,d+=8}i.length+=l&(1<<i.extra)-1,l>>>=i.extra,d-=i.extra,i.back+=i.extra}i.was=i.length,i.mode=23;case 23:for(;A=i.distcode[l&(1<<i.distbits)-1],g=A>>>24,b=A>>>16&255,p=65535&A,!(g<=d);){if(0===o)break t;o--,l+=a[r++]<<d,d+=8}if(0==(240&b)){for(m=g,k=b,y=p;A=i.distcode[y+((l&(1<<m+k)-1)>>m)],g=A>>>24,b=A>>>16&255,p=65535&A,!(m+g<=d);){if(0===o)break t;o--,l+=a[r++]<<d,d+=8}l>>>=m,d-=m,i.back+=m}if(l>>>=g,d-=g,i.back+=g,64&b){t.msg="invalid distance code",i.mode=ze;break}i.offset=p,i.extra=15&b,i.mode=24;case 24:if(i.extra){for(z=i.extra;d<z;){if(0===o)break t;o--,l+=a[r++]<<d,d+=8}i.offset+=l&(1<<i.extra)-1,l>>>=i.extra,d-=i.extra,i.back+=i.extra}if(i.offset>i.dmax){t.msg="invalid distance too far back",i.mode=ze;break}i.mode=25;case 25:if(0===h)break t;if(c=f-h,i.offset>c){if(c=i.offset-c,c>i.whave&&i.sane){t.msg="invalid distance too far back",i.mode=ze;break}c>i.wnext?(c-=i.wnext,u=i.wsize-c):u=i.wnext-c,c>i.length&&(c=i.length),w=i.window}else w=n,u=s-i.offset,c=i.length;c>h&&(c=h),h-=c,i.length-=c;do{n[s++]=w[u++]}while(--c);0===i.length&&(i.mode=21);break;case 26:if(0===h)break t;n[s++]=i.length,h--,i.mode=21;break;case 27:if(i.wrap){for(;d<32;){if(0===o)break t;o--,l|=a[r++]<<d,d+=8}if(f-=h,t.total_out+=f,i.total+=f,f&&(t.adler=i.check=i.flags?K(i.check,n,f,s-f):H(i.check,n,f,s-f)),f=h,(i.flags?l:Re(l))!==i.check){t.msg="incorrect data check",i.mode=ze;break}l=0,d=0}i.mode=28;case 28:if(i.wrap&&i.flags){for(;d<32;){if(0===o)break t;o--,l+=a[r++]<<d,d+=8}if(l!==(4294967295&i.total)){t.msg="incorrect length check",i.mode=ze;break}l=0,d=0}i.mode=29;case 29:E=me;break t;case ze:E=ve;break t;case 31:return Ee;case 32:default:return ye}return t.next_out=s,t.avail_out=h,t.next_in=r,t.avail_in=o,i.hold=l,i.bits=d,(i.wsize||f!==t.avail_out&&i.mode<ze&&(i.mode<27||e!==we))&&Ce(t,t.output,t.next_out,f-t.avail_out),_-=t.avail_in,f-=t.avail_out,t.total_in+=_,t.total_out+=f,i.total+=f,i.wrap&&f&&(t.adler=i.check=i.flags?K(i.check,n,f,t.next_out-f):H(i.check,n,f,t.next_out-f)),t.data_type=i.bits+(i.last?64:0)+(i.mode===Ue?128:0)+(20===i.mode||15===i.mode?256:0),(0===_&&0===f||e===we)&&E===pe&&(E=Ae),E},inflateEnd:t=>{if(!t||!t.state)return ye;let e=t.state;return e.window&&(e.window=null),t.state=null,pe},inflateGetHeader:(t,e)=>{if(!t||!t.state)return ye;const i=t.state;return 0==(2&i.wrap)?ye:(i.head=e,e.done=!1,pe)},inflateSetDictionary:(t,e)=>{const i=e.length;let a,n,r;return t&&t.state?(a=t.state,0!==a.wrap&&11!==a.mode?ye:11===a.mode&&(n=1,n=H(n,e,i,0),n!==a.check)?ve:(r=Ce(t,e,i,i),r?(a.mode=31,Ee):(a.havedict=1,pe))):ye},inflateInfo:"pako inflate (from Nodeca project)"};var Me=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1};const He=Object.prototype.toString,{Z_NO_FLUSH:We,Z_FINISH:Ke,Z_OK:Pe,Z_STREAM_END:je,Z_NEED_DICT:Ye,Z_STREAM_ERROR:Ge,Z_DATA_ERROR:$e,Z_MEM_ERROR:Ve}=j;function Xe(t){this.options=Ht({chunkSize:65536,windowBits:15,to:""},t||{});const e=this.options;e.raw&&e.windowBits>=0&&e.windowBits<16&&(e.windowBits=-e.windowBits,0===e.windowBits&&(e.windowBits=-15)),!(e.windowBits>=0&&e.windowBits<16)||t&&t.windowBits||(e.windowBits+=32),e.windowBits>15&&e.windowBits<48&&0==(15&e.windowBits)&&(e.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new $t,this.strm.avail_out=0;let i=Fe.inflateInit2(this.strm,e.windowBits);if(i!==Pe)throw new Error(P[i]);if(this.header=new Me,Fe.inflateGetHeader(this.strm,this.header),e.dictionary&&("string"==typeof e.dictionary?e.dictionary=jt(e.dictionary):"[object ArrayBuffer]"===He.call(e.dictionary)&&(e.dictionary=new Uint8Array(e.dictionary)),e.raw&&(i=Fe.inflateSetDictionary(this.strm,e.dictionary),i!==Pe)))throw new Error(P[i])}function qe(t,e){const i=new Xe(e);if(i.push(t),i.err)throw i.msg||P[i.err];return i.result}Xe.prototype.push=function(t,e){const i=this.strm,a=this.options.chunkSize,n=this.options.dictionary;let r,s,o;if(this.ended)return!1;for(s=e===~~e?e:!0===e?Ke:We,"[object ArrayBuffer]"===He.call(t)?i.input=new Uint8Array(t):i.input=t,i.next_in=0,i.avail_in=i.input.length;;){for(0===i.avail_out&&(i.output=new Uint8Array(a),i.next_out=0,i.avail_out=a),r=Fe.inflate(i,s),r===Ye&&n&&(r=Fe.inflateSetDictionary(i,n),r===Pe?r=Fe.inflate(i,s):r===$e&&(r=Ye));i.avail_in>0&&r===je&&i.state.wrap>0&&0!==t[i.next_in];)Fe.inflateReset(i),r=Fe.inflate(i,s);switch(r){case Ge:case $e:case Ye:case Ve:return this.onEnd(r),this.ended=!0,!1}if(o=i.avail_out,i.next_out&&(0===i.avail_out||r===je))if("string"===this.options.to){let t=Gt(i.output,i.next_out),e=i.next_out-t,n=Yt(i.output,t);i.next_out=e,i.avail_out=a-e,e&&i.output.set(i.output.subarray(t,t+e),0),this.onData(n)}else this.onData(i.output.length===i.next_out?i.output:i.output.subarray(0,i.next_out));if(r!==Pe||0!==o){if(r===je)return r=Fe.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,!0;if(0===i.avail_in)break}}return!0},Xe.prototype.onData=function(t){this.chunks.push(t)},Xe.prototype.onEnd=function(t){t===Pe&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=Wt(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg};var Je={Inflate:Xe,inflate:qe,inflateRaw:function(t,e){return(e=e||{}).raw=!0,qe(t,e)},ungzip:qe,constants:j};const{Deflate:Qe,deflate:ti,deflateRaw:ei,gzip:ii}=oe,{Inflate:ai,inflate:ni,inflateRaw:ri,ungzip:si}=Je;var oi=ti;const hi=[137,80,78,71,13,10,26,10],li=[];for(let t=0;t<256;t++){let e=t;for(let t=0;t<8;t++)1&e?e=3988292384^e>>>1:e>>>=1;li[t]=e}const di=4294967295;function _i(t,e){return(function(t,e,i){let a=t;for(let t=0;t<i;t++)a=li[255&(a^e[t])]^a>>>8;return a}(di,t,e)^di)>>>0}var fi,ci,ui,wi;!function(t){t[t.UNKNOWN=-1]="UNKNOWN",t[t.GREYSCALE=0]="GREYSCALE",t[t.TRUECOLOUR=2]="TRUECOLOUR",t[t.INDEXED_COLOUR=3]="INDEXED_COLOUR",t[t.GREYSCALE_ALPHA=4]="GREYSCALE_ALPHA",t[t.TRUECOLOUR_ALPHA=6]="TRUECOLOUR_ALPHA"}(fi||(fi={})),function(t){t[t.UNKNOWN=-1]="UNKNOWN",t[t.DEFLATE=0]="DEFLATE"}(ci||(ci={})),function(t){t[t.UNKNOWN=-1]="UNKNOWN",t[t.ADAPTIVE=0]="ADAPTIVE"}(ui||(ui={})),function(t){t[t.UNKNOWN=-1]="UNKNOWN",t[t.NO_INTERLACE=0]="NO_INTERLACE",t[t.ADAM7=1]="ADAM7"}(wi||(wi={}));new Uint8Array(0);const gi=new Uint16Array([255]);new Uint8Array(gi.buffer)[0];const bi={level:3};class pi extends a{constructor(t,e={}){super(),this._colorType=fi.UNKNOWN,this._zlibOptions=Object.assign({},bi,e.zlib),this._png=this._checkData(t),this.setBigEndian()}encode(){return this.encodeSignature(),this.encodeIHDR(),this.encodeData(),this.encodeIEND(),this.toArray()}encodeSignature(){this.writeBytes(hi)}encodeIHDR(){this.writeUint32(13),this.writeChars("IHDR"),this.writeUint32(this._png.width),this.writeUint32(this._png.height),this.writeByte(this._png.depth),this.writeByte(this._colorType),this.writeByte(ci.DEFLATE),this.writeByte(ui.ADAPTIVE),this.writeByte(wi.NO_INTERLACE),this.writeCrc(17)}encodeIEND(){this.writeUint32(0),this.writeChars("IEND"),this.writeCrc(4)}encodeIDAT(t){this.writeUint32(t.length),this.writeChars("IDAT"),this.writeBytes(t),this.writeCrc(t.length+4)}encodeData(){const{width:t,height:e,channels:i,depth:n,data:r}=this._png,s=i*t,o=(new a).setBigEndian();let h=0;for(let t=0;t<e;t++)if(o.writeByte(0),8===n)h=ki(r,o,s,h);else{if(16!==n)throw new Error("unreachable");h=yi(r,o,s,h)}const l=o.toArray(),d=oi(l,this._zlibOptions);this.encodeIDAT(d)}_checkData(t){const{colorType:e,channels:i,depth:a}=function(t){const{channels:e=4,depth:i=8}=t;if(4!==e&&3!==e&&2!==e&&1!==e)throw new RangeError(`unsupported number of channels: ${e}`);if(8!==i&&16!==i)throw new RangeError(`unsupported bit depth: ${i}`);const a={channels:e,depth:i,colorType:fi.UNKNOWN};switch(e){case 4:a.colorType=fi.TRUECOLOUR_ALPHA;break;case 3:a.colorType=fi.TRUECOLOUR;break;case 1:a.colorType=fi.GREYSCALE;break;case 2:a.colorType=fi.GREYSCALE_ALPHA;break;default:throw new Error("unsupported number of channels")}return a}(t),n={width:mi(t.width,"width"),height:mi(t.height,"height"),channels:i,data:t.data,depth:a,text:{}};this._colorType=e;const r=n.width*n.height*i;if(n.data.length!==r)throw new RangeError(`wrong data size. Found ${n.data.length}, expected ${r}`);return n}writeCrc(t){this.writeUint32(_i(new Uint8Array(this.buffer,this.byteOffset+this.offset-t,t),t))}}function mi(t,e){if(Number.isInteger(t)&&t>0)return t;throw new TypeError(`${e} must be a positive integer`)}function ki(t,e,i,a){for(let n=0;n<i;n++)e.writeByte(t[a++]);return a}function yi(t,e,i,a){for(let n=0;n<i;n++)e.writeUint16(t[a++]);return a}var vi;!function(t){t[t.UNKNOWN=0]="UNKNOWN",t[t.METRE=1]="METRE"}(vi||(vi={})),self.addEventListener("message",(t=>{const{data:e,width:i,height:a,options:n}=t.data,r=function(t,e){return new pi(t,e).encode()}({data:new Uint8Array(e),width:i,height:a},n);postMessage({data:r,width:i,height:a},[r])}))})()})();',
          'Worker',
          void 0,
          void 0,
        );
      });
      const at = (0, nt.h)(function () {
          return rt()(
            '/*! For license information please see PNGDecoder.worker.worker.js.LICENSE.txt */\n(()=>{"use strict";var t={396:function(){!function(t){if(t.TextEncoder&&t.TextDecoder)return!1;function e(t="utf-8"){if("utf-8"!==t)throw new RangeError(`Failed to construct \'TextEncoder\': The encoding label provided (\'${t}\') is invalid.`)}function i(t="utf-8",e={fatal:!1}){if("utf-8"!==t)throw new RangeError(`Failed to construct \'TextDecoder\': The encoding label provided (\'${t}\') is invalid.`);if(e.fatal)throw new Error("Failed to construct \'TextDecoder\': the \'fatal\' option is unsupported.")}Object.defineProperty(e.prototype,"encoding",{value:"utf-8"}),e.prototype.encode=function(t,e={stream:!1}){if(e.stream)throw new Error("Failed to encode: the \'stream\' option is unsupported.");let i=0;const a=t.length;let n=0,s=Math.max(32,a+(a>>1)+7),r=new Uint8Array(s>>3<<3);for(;i<a;){let e=t.charCodeAt(i++);if(e>=55296&&e<=56319){if(i<a){const a=t.charCodeAt(i);56320==(64512&a)&&(++i,e=((1023&e)<<10)+(1023&a)+65536)}if(e>=55296&&e<=56319)continue}if(n+4>r.length){s+=8,s*=1+i/t.length*2,s=s>>3<<3;const e=new Uint8Array(s);e.set(r),r=e}if(0!=(4294967168&e)){if(0==(4294965248&e))r[n++]=e>>6&31|192;else if(0==(4294901760&e))r[n++]=e>>12&15|224,r[n++]=e>>6&63|128;else{if(0!=(4292870144&e))continue;r[n++]=e>>18&7|240,r[n++]=e>>12&63|128,r[n++]=e>>6&63|128}r[n++]=63&e|128}else r[n++]=e}return r.slice(0,n)},Object.defineProperty(i.prototype,"encoding",{value:"utf-8"}),Object.defineProperty(i.prototype,"fatal",{value:!1}),Object.defineProperty(i.prototype,"ignoreBOM",{value:!1}),i.prototype.decode=function(t,e={stream:!1}){if(e.stream)throw new Error("Failed to decode: the \'stream\' option is unsupported.");const i=new Uint8Array(t);let a=0;const n=i.length,s=[];for(;a<n;){const t=i[a++];if(0===t)break;if(0==(128&t))s.push(t);else if(192==(224&t)){const e=63&i[a++];s.push((31&t)<<6|e)}else if(224==(240&t)){const e=63&i[a++],n=63&i[a++];s.push((31&t)<<12|e<<6|n)}else if(240==(248&t)){let e=(7&t)<<18|(63&i[a++])<<12|(63&i[a++])<<6|63&i[a++];e>65535&&(e-=65536,s.push(e>>>10&1023|55296),e=56320|1023&e),s.push(e)}}return String.fromCharCode.apply(null,s)},t.TextEncoder=e,t.TextDecoder=i}("undefined"!=typeof window?window:"undefined"!=typeof self?self:this)}},e={};function i(a){var n=e[a];if(void 0!==n)return n.exports;var s=e[a]={exports:{}};return t[a].call(s.exports,s,s.exports,i),s.exports}(()=>{i(396);const t=new TextDecoder("utf-8");const e=new TextEncoder;class a{constructor(t=8192,e={}){let i=!1;"number"==typeof t?t=new ArrayBuffer(t):(i=!0,this.lastWrittenByte=t.byteLength);const n=e.offset?e.offset>>>0:0,s=t.byteLength-n;let r=n;(ArrayBuffer.isView(t)||t instanceof a)&&(t.byteLength!==t.buffer.byteLength&&(r=t.byteOffset+n),t=t.buffer),this.lastWrittenByte=i?s:0,this.buffer=t,this.length=s,this.byteLength=s,this.byteOffset=r,this.offset=0,this.littleEndian=!0,this._data=new DataView(this.buffer,r,s),this._mark=0,this._marks=[]}available(t=1){return this.offset+t<=this.length}isLittleEndian(){return this.littleEndian}setLittleEndian(){return this.littleEndian=!0,this}isBigEndian(){return!this.littleEndian}setBigEndian(){return this.littleEndian=!1,this}skip(t=1){return this.offset+=t,this}seek(t){return this.offset=t,this}mark(){return this._mark=this.offset,this}reset(){return this.offset=this._mark,this}pushMark(){return this._marks.push(this.offset),this}popMark(){const t=this._marks.pop();if(void 0===t)throw new Error("Mark stack empty");return this.seek(t),this}rewind(){return this.offset=0,this}ensureAvailable(t=1){if(!this.available(t)){const e=2*(this.offset+t),i=new Uint8Array(e);i.set(new Uint8Array(this.buffer)),this.buffer=i.buffer,this.length=this.byteLength=e,this._data=new DataView(this.buffer)}return this}readBoolean(){return 0!==this.readUint8()}readInt8(){return this._data.getInt8(this.offset++)}readUint8(){return this._data.getUint8(this.offset++)}readByte(){return this.readUint8()}readBytes(t=1){const e=new Uint8Array(t);for(let i=0;i<t;i++)e[i]=this.readByte();return e}readInt16(){const t=this._data.getInt16(this.offset,this.littleEndian);return this.offset+=2,t}readUint16(){const t=this._data.getUint16(this.offset,this.littleEndian);return this.offset+=2,t}readInt32(){const t=this._data.getInt32(this.offset,this.littleEndian);return this.offset+=4,t}readUint32(){const t=this._data.getUint32(this.offset,this.littleEndian);return this.offset+=4,t}readFloat32(){const t=this._data.getFloat32(this.offset,this.littleEndian);return this.offset+=4,t}readFloat64(){const t=this._data.getFloat64(this.offset,this.littleEndian);return this.offset+=8,t}readChar(){return String.fromCharCode(this.readInt8())}readChars(t=1){let e="";for(let i=0;i<t;i++)e+=this.readChar();return e}readUtf8(e=1){return i=this.readBytes(e),t.decode(i);var i}writeBoolean(t){return this.writeUint8(t?255:0),this}writeInt8(t){return this.ensureAvailable(1),this._data.setInt8(this.offset++,t),this._updateLastWrittenByte(),this}writeUint8(t){return this.ensureAvailable(1),this._data.setUint8(this.offset++,t),this._updateLastWrittenByte(),this}writeByte(t){return this.writeUint8(t)}writeBytes(t){this.ensureAvailable(t.length);for(let e=0;e<t.length;e++)this._data.setUint8(this.offset++,t[e]);return this._updateLastWrittenByte(),this}writeInt16(t){return this.ensureAvailable(2),this._data.setInt16(this.offset,t,this.littleEndian),this.offset+=2,this._updateLastWrittenByte(),this}writeUint16(t){return this.ensureAvailable(2),this._data.setUint16(this.offset,t,this.littleEndian),this.offset+=2,this._updateLastWrittenByte(),this}writeInt32(t){return this.ensureAvailable(4),this._data.setInt32(this.offset,t,this.littleEndian),this.offset+=4,this._updateLastWrittenByte(),this}writeUint32(t){return this.ensureAvailable(4),this._data.setUint32(this.offset,t,this.littleEndian),this.offset+=4,this._updateLastWrittenByte(),this}writeFloat32(t){return this.ensureAvailable(4),this._data.setFloat32(this.offset,t,this.littleEndian),this.offset+=4,this._updateLastWrittenByte(),this}writeFloat64(t){return this.ensureAvailable(8),this._data.setFloat64(this.offset,t,this.littleEndian),this.offset+=8,this._updateLastWrittenByte(),this}writeChar(t){return this.writeUint8(t.charCodeAt(0))}writeChars(t){for(let e=0;e<t.length;e++)this.writeUint8(t.charCodeAt(e));return this}writeUtf8(t){return this.writeBytes(function(t){return e.encode(t)}(t))}toArray(){return new Uint8Array(this.buffer,this.byteOffset,this.lastWrittenByte)}_updateLastWrittenByte(){this.offset>this.lastWrittenByte&&(this.lastWrittenByte=this.offset)}}function n(t){let e=t.length;for(;--e>=0;)t[e]=0}const s=256,r=286,o=30,h=15,l=new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]),d=new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]),_=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]),f=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),c=new Array(576);n(c);const u=new Array(60);n(u);const w=new Array(512);n(w);const p=new Array(256);n(p);const g=new Array(29);n(g);const b=new Array(o);function m(t,e,i,a,n){this.static_tree=t,this.extra_bits=e,this.extra_base=i,this.elems=a,this.max_length=n,this.has_stree=t&&t.length}let k,y,v;function E(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}n(b);const A=t=>t<256?w[t]:w[256+(t>>>7)],x=(t,e)=>{t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255},U=(t,e,i)=>{t.bi_valid>16-i?(t.bi_buf|=e<<t.bi_valid&65535,x(t,t.bi_buf),t.bi_buf=e>>16-t.bi_valid,t.bi_valid+=i-16):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=i)},z=(t,e,i)=>{U(t,i[2*e],i[2*e+1])},R=(t,e)=>{let i=0;do{i|=1&t,t>>>=1,i<<=1}while(--e>0);return i>>>1},N=(t,e,i)=>{const a=new Array(16);let n,s,r=0;for(n=1;n<=h;n++)a[n]=r=r+i[n-1]<<1;for(s=0;s<=e;s++){let e=t[2*s+1];0!==e&&(t[2*s]=R(a[e]++,e))}},L=t=>{let e;for(e=0;e<r;e++)t.dyn_ltree[2*e]=0;for(e=0;e<o;e++)t.dyn_dtree[2*e]=0;for(e=0;e<19;e++)t.bl_tree[2*e]=0;t.dyn_ltree[512]=1,t.opt_len=t.static_len=0,t.last_lit=t.matches=0},O=t=>{t.bi_valid>8?x(t,t.bi_buf):t.bi_valid>0&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0},T=(t,e,i,a)=>{const n=2*e,s=2*i;return t[n]<t[s]||t[n]===t[s]&&a[e]<=a[i]},D=(t,e,i)=>{const a=t.heap[i];let n=i<<1;for(;n<=t.heap_len&&(n<t.heap_len&&T(e,t.heap[n+1],t.heap[n],t.depth)&&n++,!T(e,a,t.heap[n],t.depth));)t.heap[i]=t.heap[n],i=n,n<<=1;t.heap[i]=a},S=(t,e,i)=>{let a,n,r,o,h=0;if(0!==t.last_lit)do{a=t.pending_buf[t.d_buf+2*h]<<8|t.pending_buf[t.d_buf+2*h+1],n=t.pending_buf[t.l_buf+h],h++,0===a?z(t,n,e):(r=p[n],z(t,r+s+1,e),o=l[r],0!==o&&(n-=g[r],U(t,n,o)),a--,r=A(a),z(t,r,i),o=d[r],0!==o&&(a-=b[r],U(t,a,o)))}while(h<t.last_lit);z(t,256,e)},Z=(t,e)=>{const i=e.dyn_tree,a=e.stat_desc.static_tree,n=e.stat_desc.has_stree,s=e.stat_desc.elems;let r,o,l,d=-1;for(t.heap_len=0,t.heap_max=573,r=0;r<s;r++)0!==i[2*r]?(t.heap[++t.heap_len]=d=r,t.depth[r]=0):i[2*r+1]=0;for(;t.heap_len<2;)l=t.heap[++t.heap_len]=d<2?++d:0,i[2*l]=1,t.depth[l]=0,t.opt_len--,n&&(t.static_len-=a[2*l+1]);for(e.max_code=d,r=t.heap_len>>1;r>=1;r--)D(t,i,r);l=s;do{r=t.heap[1],t.heap[1]=t.heap[t.heap_len--],D(t,i,1),o=t.heap[1],t.heap[--t.heap_max]=r,t.heap[--t.heap_max]=o,i[2*l]=i[2*r]+i[2*o],t.depth[l]=(t.depth[r]>=t.depth[o]?t.depth[r]:t.depth[o])+1,i[2*r+1]=i[2*o+1]=l,t.heap[1]=l++,D(t,i,1)}while(t.heap_len>=2);t.heap[--t.heap_max]=t.heap[1],((t,e)=>{const i=e.dyn_tree,a=e.max_code,n=e.stat_desc.static_tree,s=e.stat_desc.has_stree,r=e.stat_desc.extra_bits,o=e.stat_desc.extra_base,l=e.stat_desc.max_length;let d,_,f,c,u,w,p=0;for(c=0;c<=h;c++)t.bl_count[c]=0;for(i[2*t.heap[t.heap_max]+1]=0,d=t.heap_max+1;d<573;d++)_=t.heap[d],c=i[2*i[2*_+1]+1]+1,c>l&&(c=l,p++),i[2*_+1]=c,_>a||(t.bl_count[c]++,u=0,_>=o&&(u=r[_-o]),w=i[2*_],t.opt_len+=w*(c+u),s&&(t.static_len+=w*(n[2*_+1]+u)));if(0!==p){do{for(c=l-1;0===t.bl_count[c];)c--;t.bl_count[c]--,t.bl_count[c+1]+=2,t.bl_count[l]--,p-=2}while(p>0);for(c=l;0!==c;c--)for(_=t.bl_count[c];0!==_;)f=t.heap[--d],f>a||(i[2*f+1]!==c&&(t.opt_len+=(c-i[2*f+1])*i[2*f],i[2*f+1]=c),_--)}})(t,e),N(i,d,t.bl_count)},I=(t,e,i)=>{let a,n,s=-1,r=e[1],o=0,h=7,l=4;for(0===r&&(h=138,l=3),e[2*(i+1)+1]=65535,a=0;a<=i;a++)n=r,r=e[2*(a+1)+1],++o<h&&n===r||(o<l?t.bl_tree[2*n]+=o:0!==n?(n!==s&&t.bl_tree[2*n]++,t.bl_tree[32]++):o<=10?t.bl_tree[34]++:t.bl_tree[36]++,o=0,s=n,0===r?(h=138,l=3):n===r?(h=6,l=3):(h=7,l=4))},C=(t,e,i)=>{let a,n,s=-1,r=e[1],o=0,h=7,l=4;for(0===r&&(h=138,l=3),a=0;a<=i;a++)if(n=r,r=e[2*(a+1)+1],!(++o<h&&n===r)){if(o<l)do{z(t,n,t.bl_tree)}while(0!=--o);else 0!==n?(n!==s&&(z(t,n,t.bl_tree),o--),z(t,16,t.bl_tree),U(t,o-3,2)):o<=10?(z(t,17,t.bl_tree),U(t,o-3,3)):(z(t,18,t.bl_tree),U(t,o-11,7));o=0,s=n,0===r?(h=138,l=3):n===r?(h=6,l=3):(h=7,l=4)}};let B=!1;const F=(t,e,i,a)=>{U(t,0+(a?1:0),3),((t,e,i,a)=>{O(t),a&&(x(t,i),x(t,~i)),t.pending_buf.set(t.window.subarray(e,e+i),t.pending),t.pending+=i})(t,e,i,!0)};var M={_tr_init:t=>{B||((()=>{let t,e,i,a,n;const s=new Array(16);for(i=0,a=0;a<28;a++)for(g[a]=i,t=0;t<1<<l[a];t++)p[i++]=a;for(p[i-1]=a,n=0,a=0;a<16;a++)for(b[a]=n,t=0;t<1<<d[a];t++)w[n++]=a;for(n>>=7;a<o;a++)for(b[a]=n<<7,t=0;t<1<<d[a]-7;t++)w[256+n++]=a;for(e=0;e<=h;e++)s[e]=0;for(t=0;t<=143;)c[2*t+1]=8,t++,s[8]++;for(;t<=255;)c[2*t+1]=9,t++,s[9]++;for(;t<=279;)c[2*t+1]=7,t++,s[7]++;for(;t<=287;)c[2*t+1]=8,t++,s[8]++;for(N(c,287,s),t=0;t<o;t++)u[2*t+1]=5,u[2*t]=R(t,5);k=new m(c,l,257,r,h),y=new m(u,d,0,o,h),v=new m(new Array(0),_,0,19,7)})(),B=!0),t.l_desc=new E(t.dyn_ltree,k),t.d_desc=new E(t.dyn_dtree,y),t.bl_desc=new E(t.bl_tree,v),t.bi_buf=0,t.bi_valid=0,L(t)},_tr_stored_block:F,_tr_flush_block:(t,e,i,a)=>{let n,r,o=0;t.level>0?(2===t.strm.data_type&&(t.strm.data_type=(t=>{let e,i=4093624447;for(e=0;e<=31;e++,i>>>=1)if(1&i&&0!==t.dyn_ltree[2*e])return 0;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return 1;for(e=32;e<s;e++)if(0!==t.dyn_ltree[2*e])return 1;return 0})(t)),Z(t,t.l_desc),Z(t,t.d_desc),o=(t=>{let e;for(I(t,t.dyn_ltree,t.l_desc.max_code),I(t,t.dyn_dtree,t.d_desc.max_code),Z(t,t.bl_desc),e=18;e>=3&&0===t.bl_tree[2*f[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e})(t),n=t.opt_len+3+7>>>3,r=t.static_len+3+7>>>3,r<=n&&(n=r)):n=r=i+5,i+4<=n&&-1!==e?F(t,e,i,a):4===t.strategy||r===n?(U(t,2+(a?1:0),3),S(t,c,u)):(U(t,4+(a?1:0),3),((t,e,i,a)=>{let n;for(U(t,e-257,5),U(t,i-1,5),U(t,a-4,4),n=0;n<a;n++)U(t,t.bl_tree[2*f[n]+1],3);C(t,t.dyn_ltree,e-1),C(t,t.dyn_dtree,i-1)})(t,t.l_desc.max_code+1,t.d_desc.max_code+1,o+1),S(t,t.dyn_ltree,t.dyn_dtree)),L(t),a&&O(t)},_tr_tally:(t,e,i)=>(t.pending_buf[t.d_buf+2*t.last_lit]=e>>>8&255,t.pending_buf[t.d_buf+2*t.last_lit+1]=255&e,t.pending_buf[t.l_buf+t.last_lit]=255&i,t.last_lit++,0===e?t.dyn_ltree[2*i]++:(t.matches++,e--,t.dyn_ltree[2*(p[i]+s+1)]++,t.dyn_dtree[2*A(e)]++),t.last_lit===t.lit_bufsize-1),_tr_align:t=>{U(t,2,3),z(t,256,c),(t=>{16===t.bi_valid?(x(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):t.bi_valid>=8&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)})(t)}};var H=(t,e,i,a)=>{let n=65535&t|0,s=t>>>16&65535|0,r=0;for(;0!==i;){r=i>2e3?2e3:i,i-=r;do{n=n+e[a++]|0,s=s+n|0}while(--r);n%=65521,s%=65521}return n|s<<16|0};const P=new Uint32Array((()=>{let t,e=[];for(var i=0;i<256;i++){t=i;for(var a=0;a<8;a++)t=1&t?3988292384^t>>>1:t>>>1;e[i]=t}return e})());var W=(t,e,i,a)=>{const n=P,s=a+i;t^=-1;for(let i=a;i<s;i++)t=t>>>8^n[255&(t^e[i])];return-1^t},K={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"},$={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8};const{_tr_init:Y,_tr_stored_block:j,_tr_flush_block:G,_tr_tally:X,_tr_align:V}=M,{Z_NO_FLUSH:q,Z_PARTIAL_FLUSH:J,Z_FULL_FLUSH:Q,Z_FINISH:tt,Z_BLOCK:et,Z_OK:it,Z_STREAM_END:at,Z_STREAM_ERROR:nt,Z_DATA_ERROR:st,Z_BUF_ERROR:rt,Z_DEFAULT_COMPRESSION:ot,Z_FILTERED:ht,Z_HUFFMAN_ONLY:lt,Z_RLE:dt,Z_FIXED:_t,Z_DEFAULT_STRATEGY:ft,Z_UNKNOWN:ct,Z_DEFLATED:ut}=$,wt=258,pt=262,gt=103,bt=113,mt=666,kt=(t,e)=>(t.msg=K[e],e),yt=t=>(t<<1)-(t>4?9:0),vt=t=>{let e=t.length;for(;--e>=0;)t[e]=0};let Et=(t,e,i)=>(e<<t.hash_shift^i)&t.hash_mask;const At=t=>{const e=t.state;let i=e.pending;i>t.avail_out&&(i=t.avail_out),0!==i&&(t.output.set(e.pending_buf.subarray(e.pending_out,e.pending_out+i),t.next_out),t.next_out+=i,e.pending_out+=i,t.total_out+=i,t.avail_out-=i,e.pending-=i,0===e.pending&&(e.pending_out=0))},xt=(t,e)=>{G(t,t.block_start>=0?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,At(t.strm)},Ut=(t,e)=>{t.pending_buf[t.pending++]=e},zt=(t,e)=>{t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e},Rt=(t,e,i,a)=>{let n=t.avail_in;return n>a&&(n=a),0===n?0:(t.avail_in-=n,e.set(t.input.subarray(t.next_in,t.next_in+n),i),1===t.state.wrap?t.adler=H(t.adler,e,n,i):2===t.state.wrap&&(t.adler=W(t.adler,e,n,i)),t.next_in+=n,t.total_in+=n,n)},Nt=(t,e)=>{let i,a,n=t.max_chain_length,s=t.strstart,r=t.prev_length,o=t.nice_match;const h=t.strstart>t.w_size-pt?t.strstart-(t.w_size-pt):0,l=t.window,d=t.w_mask,_=t.prev,f=t.strstart+wt;let c=l[s+r-1],u=l[s+r];t.prev_length>=t.good_match&&(n>>=2),o>t.lookahead&&(o=t.lookahead);do{if(i=e,l[i+r]===u&&l[i+r-1]===c&&l[i]===l[s]&&l[++i]===l[s+1]){s+=2,i++;do{}while(l[++s]===l[++i]&&l[++s]===l[++i]&&l[++s]===l[++i]&&l[++s]===l[++i]&&l[++s]===l[++i]&&l[++s]===l[++i]&&l[++s]===l[++i]&&l[++s]===l[++i]&&s<f);if(a=wt-(f-s),s=f-wt,a>r){if(t.match_start=e,r=a,a>=o)break;c=l[s+r-1],u=l[s+r]}}}while((e=_[e&d])>h&&0!=--n);return r<=t.lookahead?r:t.lookahead},Lt=t=>{const e=t.w_size;let i,a,n,s,r;do{if(s=t.window_size-t.lookahead-t.strstart,t.strstart>=e+(e-pt)){t.window.set(t.window.subarray(e,e+e),0),t.match_start-=e,t.strstart-=e,t.block_start-=e,a=t.hash_size,i=a;do{n=t.head[--i],t.head[i]=n>=e?n-e:0}while(--a);a=e,i=a;do{n=t.prev[--i],t.prev[i]=n>=e?n-e:0}while(--a);s+=e}if(0===t.strm.avail_in)break;if(a=Rt(t.strm,t.window,t.strstart+t.lookahead,s),t.lookahead+=a,t.lookahead+t.insert>=3)for(r=t.strstart-t.insert,t.ins_h=t.window[r],t.ins_h=Et(t,t.ins_h,t.window[r+1]);t.insert&&(t.ins_h=Et(t,t.ins_h,t.window[r+3-1]),t.prev[r&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=r,r++,t.insert--,!(t.lookahead+t.insert<3)););}while(t.lookahead<pt&&0!==t.strm.avail_in)},Ot=(t,e)=>{let i,a;for(;;){if(t.lookahead<pt){if(Lt(t),t.lookahead<pt&&e===q)return 1;if(0===t.lookahead)break}if(i=0,t.lookahead>=3&&(t.ins_h=Et(t,t.ins_h,t.window[t.strstart+3-1]),i=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==i&&t.strstart-i<=t.w_size-pt&&(t.match_length=Nt(t,i)),t.match_length>=3)if(a=X(t,t.strstart-t.match_start,t.match_length-3),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=3){t.match_length--;do{t.strstart++,t.ins_h=Et(t,t.ins_h,t.window[t.strstart+3-1]),i=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart}while(0!=--t.match_length);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=Et(t,t.ins_h,t.window[t.strstart+1]);else a=X(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(a&&(xt(t,!1),0===t.strm.avail_out))return 1}return t.insert=t.strstart<2?t.strstart:2,e===tt?(xt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(xt(t,!1),0===t.strm.avail_out)?1:2},Tt=(t,e)=>{let i,a,n;for(;;){if(t.lookahead<pt){if(Lt(t),t.lookahead<pt&&e===q)return 1;if(0===t.lookahead)break}if(i=0,t.lookahead>=3&&(t.ins_h=Et(t,t.ins_h,t.window[t.strstart+3-1]),i=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=2,0!==i&&t.prev_length<t.max_lazy_match&&t.strstart-i<=t.w_size-pt&&(t.match_length=Nt(t,i),t.match_length<=5&&(t.strategy===ht||3===t.match_length&&t.strstart-t.match_start>4096)&&(t.match_length=2)),t.prev_length>=3&&t.match_length<=t.prev_length){n=t.strstart+t.lookahead-3,a=X(t,t.strstart-1-t.prev_match,t.prev_length-3),t.lookahead-=t.prev_length-1,t.prev_length-=2;do{++t.strstart<=n&&(t.ins_h=Et(t,t.ins_h,t.window[t.strstart+3-1]),i=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart)}while(0!=--t.prev_length);if(t.match_available=0,t.match_length=2,t.strstart++,a&&(xt(t,!1),0===t.strm.avail_out))return 1}else if(t.match_available){if(a=X(t,0,t.window[t.strstart-1]),a&&xt(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return 1}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(a=X(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<2?t.strstart:2,e===tt?(xt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(xt(t,!1),0===t.strm.avail_out)?1:2};function Dt(t,e,i,a,n){this.good_length=t,this.max_lazy=e,this.nice_length=i,this.max_chain=a,this.func=n}const St=[new Dt(0,0,0,0,((t,e)=>{let i=65535;for(i>t.pending_buf_size-5&&(i=t.pending_buf_size-5);;){if(t.lookahead<=1){if(Lt(t),0===t.lookahead&&e===q)return 1;if(0===t.lookahead)break}t.strstart+=t.lookahead,t.lookahead=0;const a=t.block_start+i;if((0===t.strstart||t.strstart>=a)&&(t.lookahead=t.strstart-a,t.strstart=a,xt(t,!1),0===t.strm.avail_out))return 1;if(t.strstart-t.block_start>=t.w_size-pt&&(xt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===tt?(xt(t,!0),0===t.strm.avail_out?3:4):(t.strstart>t.block_start&&(xt(t,!1),t.strm.avail_out),1)})),new Dt(4,4,8,4,Ot),new Dt(4,5,16,8,Ot),new Dt(4,6,32,32,Ot),new Dt(4,4,16,16,Tt),new Dt(8,16,32,32,Tt),new Dt(8,16,128,128,Tt),new Dt(8,32,128,256,Tt),new Dt(32,128,258,1024,Tt),new Dt(32,258,258,4096,Tt)];function Zt(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=ut,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new Uint16Array(1146),this.dyn_dtree=new Uint16Array(122),this.bl_tree=new Uint16Array(78),vt(this.dyn_ltree),vt(this.dyn_dtree),vt(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new Uint16Array(16),this.heap=new Uint16Array(573),vt(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new Uint16Array(573),vt(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}const It=t=>{if(!t||!t.state)return kt(t,nt);t.total_in=t.total_out=0,t.data_type=ct;const e=t.state;return e.pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=e.wrap?42:bt,t.adler=2===e.wrap?0:1,e.last_flush=q,Y(e),it},Ct=t=>{const e=It(t);var i;return e===it&&((i=t.state).window_size=2*i.w_size,vt(i.head),i.max_lazy_match=St[i.level].max_lazy,i.good_match=St[i.level].good_length,i.nice_match=St[i.level].nice_length,i.max_chain_length=St[i.level].max_chain,i.strstart=0,i.block_start=0,i.lookahead=0,i.insert=0,i.match_length=i.prev_length=2,i.match_available=0,i.ins_h=0),e},Bt=(t,e,i,a,n,s)=>{if(!t)return nt;let r=1;if(e===ot&&(e=6),a<0?(r=0,a=-a):a>15&&(r=2,a-=16),n<1||n>9||i!==ut||a<8||a>15||e<0||e>9||s<0||s>_t)return kt(t,nt);8===a&&(a=9);const o=new Zt;return t.state=o,o.strm=t,o.wrap=r,o.gzhead=null,o.w_bits=a,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=n+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+3-1)/3),o.window=new Uint8Array(2*o.w_size),o.head=new Uint16Array(o.hash_size),o.prev=new Uint16Array(o.w_size),o.lit_bufsize=1<<n+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new Uint8Array(o.pending_buf_size),o.d_buf=1*o.lit_bufsize,o.l_buf=3*o.lit_bufsize,o.level=e,o.strategy=s,o.method=i,Ct(t)};var Ft={deflateInit:(t,e)=>Bt(t,e,ut,15,8,ft),deflateInit2:Bt,deflateReset:Ct,deflateResetKeep:It,deflateSetHeader:(t,e)=>t&&t.state?2!==t.state.wrap?nt:(t.state.gzhead=e,it):nt,deflate:(t,e)=>{let i,a;if(!t||!t.state||e>et||e<0)return t?kt(t,nt):nt;const n=t.state;if(!t.output||!t.input&&0!==t.avail_in||n.status===mt&&e!==tt)return kt(t,0===t.avail_out?rt:nt);n.strm=t;const s=n.last_flush;if(n.last_flush=e,42===n.status)if(2===n.wrap)t.adler=0,Ut(n,31),Ut(n,139),Ut(n,8),n.gzhead?(Ut(n,(n.gzhead.text?1:0)+(n.gzhead.hcrc?2:0)+(n.gzhead.extra?4:0)+(n.gzhead.name?8:0)+(n.gzhead.comment?16:0)),Ut(n,255&n.gzhead.time),Ut(n,n.gzhead.time>>8&255),Ut(n,n.gzhead.time>>16&255),Ut(n,n.gzhead.time>>24&255),Ut(n,9===n.level?2:n.strategy>=lt||n.level<2?4:0),Ut(n,255&n.gzhead.os),n.gzhead.extra&&n.gzhead.extra.length&&(Ut(n,255&n.gzhead.extra.length),Ut(n,n.gzhead.extra.length>>8&255)),n.gzhead.hcrc&&(t.adler=W(t.adler,n.pending_buf,n.pending,0)),n.gzindex=0,n.status=69):(Ut(n,0),Ut(n,0),Ut(n,0),Ut(n,0),Ut(n,0),Ut(n,9===n.level?2:n.strategy>=lt||n.level<2?4:0),Ut(n,3),n.status=bt);else{let e=ut+(n.w_bits-8<<4)<<8,i=-1;i=n.strategy>=lt||n.level<2?0:n.level<6?1:6===n.level?2:3,e|=i<<6,0!==n.strstart&&(e|=32),e+=31-e%31,n.status=bt,zt(n,e),0!==n.strstart&&(zt(n,t.adler>>>16),zt(n,65535&t.adler)),t.adler=1}if(69===n.status)if(n.gzhead.extra){for(i=n.pending;n.gzindex<(65535&n.gzhead.extra.length)&&(n.pending!==n.pending_buf_size||(n.gzhead.hcrc&&n.pending>i&&(t.adler=W(t.adler,n.pending_buf,n.pending-i,i)),At(t),i=n.pending,n.pending!==n.pending_buf_size));)Ut(n,255&n.gzhead.extra[n.gzindex]),n.gzindex++;n.gzhead.hcrc&&n.pending>i&&(t.adler=W(t.adler,n.pending_buf,n.pending-i,i)),n.gzindex===n.gzhead.extra.length&&(n.gzindex=0,n.status=73)}else n.status=73;if(73===n.status)if(n.gzhead.name){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(t.adler=W(t.adler,n.pending_buf,n.pending-i,i)),At(t),i=n.pending,n.pending===n.pending_buf_size)){a=1;break}a=n.gzindex<n.gzhead.name.length?255&n.gzhead.name.charCodeAt(n.gzindex++):0,Ut(n,a)}while(0!==a);n.gzhead.hcrc&&n.pending>i&&(t.adler=W(t.adler,n.pending_buf,n.pending-i,i)),0===a&&(n.gzindex=0,n.status=91)}else n.status=91;if(91===n.status)if(n.gzhead.comment){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(t.adler=W(t.adler,n.pending_buf,n.pending-i,i)),At(t),i=n.pending,n.pending===n.pending_buf_size)){a=1;break}a=n.gzindex<n.gzhead.comment.length?255&n.gzhead.comment.charCodeAt(n.gzindex++):0,Ut(n,a)}while(0!==a);n.gzhead.hcrc&&n.pending>i&&(t.adler=W(t.adler,n.pending_buf,n.pending-i,i)),0===a&&(n.status=gt)}else n.status=gt;if(n.status===gt&&(n.gzhead.hcrc?(n.pending+2>n.pending_buf_size&&At(t),n.pending+2<=n.pending_buf_size&&(Ut(n,255&t.adler),Ut(n,t.adler>>8&255),t.adler=0,n.status=bt)):n.status=bt),0!==n.pending){if(At(t),0===t.avail_out)return n.last_flush=-1,it}else if(0===t.avail_in&&yt(e)<=yt(s)&&e!==tt)return kt(t,rt);if(n.status===mt&&0!==t.avail_in)return kt(t,rt);if(0!==t.avail_in||0!==n.lookahead||e!==q&&n.status!==mt){let i=n.strategy===lt?((t,e)=>{let i;for(;;){if(0===t.lookahead&&(Lt(t),0===t.lookahead)){if(e===q)return 1;break}if(t.match_length=0,i=X(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,i&&(xt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===tt?(xt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(xt(t,!1),0===t.strm.avail_out)?1:2})(n,e):n.strategy===dt?((t,e)=>{let i,a,n,s;const r=t.window;for(;;){if(t.lookahead<=wt){if(Lt(t),t.lookahead<=wt&&e===q)return 1;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=3&&t.strstart>0&&(n=t.strstart-1,a=r[n],a===r[++n]&&a===r[++n]&&a===r[++n])){s=t.strstart+wt;do{}while(a===r[++n]&&a===r[++n]&&a===r[++n]&&a===r[++n]&&a===r[++n]&&a===r[++n]&&a===r[++n]&&a===r[++n]&&n<s);t.match_length=wt-(s-n),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=3?(i=X(t,1,t.match_length-3),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(i=X(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),i&&(xt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===tt?(xt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(xt(t,!1),0===t.strm.avail_out)?1:2})(n,e):St[n.level].func(n,e);if(3!==i&&4!==i||(n.status=mt),1===i||3===i)return 0===t.avail_out&&(n.last_flush=-1),it;if(2===i&&(e===J?V(n):e!==et&&(j(n,0,0,!1),e===Q&&(vt(n.head),0===n.lookahead&&(n.strstart=0,n.block_start=0,n.insert=0))),At(t),0===t.avail_out))return n.last_flush=-1,it}return e!==tt?it:n.wrap<=0?at:(2===n.wrap?(Ut(n,255&t.adler),Ut(n,t.adler>>8&255),Ut(n,t.adler>>16&255),Ut(n,t.adler>>24&255),Ut(n,255&t.total_in),Ut(n,t.total_in>>8&255),Ut(n,t.total_in>>16&255),Ut(n,t.total_in>>24&255)):(zt(n,t.adler>>>16),zt(n,65535&t.adler)),At(t),n.wrap>0&&(n.wrap=-n.wrap),0!==n.pending?it:at)},deflateEnd:t=>{if(!t||!t.state)return nt;const e=t.state.status;return 42!==e&&69!==e&&73!==e&&91!==e&&e!==gt&&e!==bt&&e!==mt?kt(t,nt):(t.state=null,e===bt?kt(t,st):it)},deflateSetDictionary:(t,e)=>{let i=e.length;if(!t||!t.state)return nt;const a=t.state,n=a.wrap;if(2===n||1===n&&42!==a.status||a.lookahead)return nt;if(1===n&&(t.adler=H(t.adler,e,i,0)),a.wrap=0,i>=a.w_size){0===n&&(vt(a.head),a.strstart=0,a.block_start=0,a.insert=0);let t=new Uint8Array(a.w_size);t.set(e.subarray(i-a.w_size,i),0),e=t,i=a.w_size}const s=t.avail_in,r=t.next_in,o=t.input;for(t.avail_in=i,t.next_in=0,t.input=e,Lt(a);a.lookahead>=3;){let t=a.strstart,e=a.lookahead-2;do{a.ins_h=Et(a,a.ins_h,a.window[t+3-1]),a.prev[t&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=t,t++}while(--e);a.strstart=t,a.lookahead=2,Lt(a)}return a.strstart+=a.lookahead,a.block_start=a.strstart,a.insert=a.lookahead,a.lookahead=0,a.match_length=a.prev_length=2,a.match_available=0,t.next_in=r,t.input=o,t.avail_in=s,a.wrap=n,it},deflateInfo:"pako deflate (from Nodeca project)"};const Mt=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var Ht=function(t){const e=Array.prototype.slice.call(arguments,1);for(;e.length;){const i=e.shift();if(i){if("object"!=typeof i)throw new TypeError(i+"must be non-object");for(const e in i)Mt(i,e)&&(t[e]=i[e])}}return t},Pt=t=>{let e=0;for(let i=0,a=t.length;i<a;i++)e+=t[i].length;const i=new Uint8Array(e);for(let e=0,a=0,n=t.length;e<n;e++){let n=t[e];i.set(n,a),a+=n.length}return i};let Wt=!0;try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(t){Wt=!1}const Kt=new Uint8Array(256);for(let t=0;t<256;t++)Kt[t]=t>=252?6:t>=248?5:t>=240?4:t>=224?3:t>=192?2:1;Kt[254]=Kt[254]=1;var $t=t=>{let e,i,a,n,s,r=t.length,o=0;for(n=0;n<r;n++)i=t.charCodeAt(n),55296==(64512&i)&&n+1<r&&(a=t.charCodeAt(n+1),56320==(64512&a)&&(i=65536+(i-55296<<10)+(a-56320),n++)),o+=i<128?1:i<2048?2:i<65536?3:4;for(e=new Uint8Array(o),s=0,n=0;s<o;n++)i=t.charCodeAt(n),55296==(64512&i)&&n+1<r&&(a=t.charCodeAt(n+1),56320==(64512&a)&&(i=65536+(i-55296<<10)+(a-56320),n++)),i<128?e[s++]=i:i<2048?(e[s++]=192|i>>>6,e[s++]=128|63&i):i<65536?(e[s++]=224|i>>>12,e[s++]=128|i>>>6&63,e[s++]=128|63&i):(e[s++]=240|i>>>18,e[s++]=128|i>>>12&63,e[s++]=128|i>>>6&63,e[s++]=128|63&i);return e},Yt=(t,e)=>{let i,a;const n=e||t.length,s=new Array(2*n);for(a=0,i=0;i<n;){let e=t[i++];if(e<128){s[a++]=e;continue}let r=Kt[e];if(r>4)s[a++]=65533,i+=r-1;else{for(e&=2===r?31:3===r?15:7;r>1&&i<n;)e=e<<6|63&t[i++],r--;r>1?s[a++]=65533:e<65536?s[a++]=e:(e-=65536,s[a++]=55296|e>>10&1023,s[a++]=56320|1023&e)}}return((t,e)=>{if(e<65534&&t.subarray&&Wt)return String.fromCharCode.apply(null,t.length===e?t:t.subarray(0,e));let i="";for(let a=0;a<e;a++)i+=String.fromCharCode(t[a]);return i})(s,a)},jt=(t,e)=>{(e=e||t.length)>t.length&&(e=t.length);let i=e-1;for(;i>=0&&128==(192&t[i]);)i--;return i<0||0===i?e:i+Kt[t[i]]>e?i:e};var Gt=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0};const Xt=Object.prototype.toString,{Z_NO_FLUSH:Vt,Z_SYNC_FLUSH:qt,Z_FULL_FLUSH:Jt,Z_FINISH:Qt,Z_OK:te,Z_STREAM_END:ee,Z_DEFAULT_COMPRESSION:ie,Z_DEFAULT_STRATEGY:ae,Z_DEFLATED:ne}=$;function se(t){this.options=Ht({level:ie,method:ne,chunkSize:16384,windowBits:15,memLevel:8,strategy:ae},t||{});let e=this.options;e.raw&&e.windowBits>0?e.windowBits=-e.windowBits:e.gzip&&e.windowBits>0&&e.windowBits<16&&(e.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new Gt,this.strm.avail_out=0;let i=Ft.deflateInit2(this.strm,e.level,e.method,e.windowBits,e.memLevel,e.strategy);if(i!==te)throw new Error(K[i]);if(e.header&&Ft.deflateSetHeader(this.strm,e.header),e.dictionary){let t;if(t="string"==typeof e.dictionary?$t(e.dictionary):"[object ArrayBuffer]"===Xt.call(e.dictionary)?new Uint8Array(e.dictionary):e.dictionary,i=Ft.deflateSetDictionary(this.strm,t),i!==te)throw new Error(K[i]);this._dict_set=!0}}function re(t,e){const i=new se(e);if(i.push(t,!0),i.err)throw i.msg||K[i.err];return i.result}se.prototype.push=function(t,e){const i=this.strm,a=this.options.chunkSize;let n,s;if(this.ended)return!1;for(s=e===~~e?e:!0===e?Qt:Vt,"string"==typeof t?i.input=$t(t):"[object ArrayBuffer]"===Xt.call(t)?i.input=new Uint8Array(t):i.input=t,i.next_in=0,i.avail_in=i.input.length;;)if(0===i.avail_out&&(i.output=new Uint8Array(a),i.next_out=0,i.avail_out=a),(s===qt||s===Jt)&&i.avail_out<=6)this.onData(i.output.subarray(0,i.next_out)),i.avail_out=0;else{if(n=Ft.deflate(i,s),n===ee)return i.next_out>0&&this.onData(i.output.subarray(0,i.next_out)),n=Ft.deflateEnd(this.strm),this.onEnd(n),this.ended=!0,n===te;if(0!==i.avail_out){if(s>0&&i.next_out>0)this.onData(i.output.subarray(0,i.next_out)),i.avail_out=0;else if(0===i.avail_in)break}else this.onData(i.output)}return!0},se.prototype.onData=function(t){this.chunks.push(t)},se.prototype.onEnd=function(t){t===te&&(this.result=Pt(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg};var oe={Deflate:se,deflate:re,deflateRaw:function(t,e){return(e=e||{}).raw=!0,re(t,e)},gzip:function(t,e){return(e=e||{}).gzip=!0,re(t,e)},constants:$};var he=function(t,e){let i,a,n,s,r,o,h,l,d,_,f,c,u,w,p,g,b,m,k,y,v,E,A,x;const U=t.state;i=t.next_in,A=t.input,a=i+(t.avail_in-5),n=t.next_out,x=t.output,s=n-(e-t.avail_out),r=n+(t.avail_out-257),o=U.dmax,h=U.wsize,l=U.whave,d=U.wnext,_=U.window,f=U.hold,c=U.bits,u=U.lencode,w=U.distcode,p=(1<<U.lenbits)-1,g=(1<<U.distbits)-1;t:do{c<15&&(f+=A[i++]<<c,c+=8,f+=A[i++]<<c,c+=8),b=u[f&p];e:for(;;){if(m=b>>>24,f>>>=m,c-=m,m=b>>>16&255,0===m)x[n++]=65535&b;else{if(!(16&m)){if(0==(64&m)){b=u[(65535&b)+(f&(1<<m)-1)];continue e}if(32&m){U.mode=12;break t}t.msg="invalid literal/length code",U.mode=30;break t}k=65535&b,m&=15,m&&(c<m&&(f+=A[i++]<<c,c+=8),k+=f&(1<<m)-1,f>>>=m,c-=m),c<15&&(f+=A[i++]<<c,c+=8,f+=A[i++]<<c,c+=8),b=w[f&g];i:for(;;){if(m=b>>>24,f>>>=m,c-=m,m=b>>>16&255,!(16&m)){if(0==(64&m)){b=w[(65535&b)+(f&(1<<m)-1)];continue i}t.msg="invalid distance code",U.mode=30;break t}if(y=65535&b,m&=15,c<m&&(f+=A[i++]<<c,c+=8,c<m&&(f+=A[i++]<<c,c+=8)),y+=f&(1<<m)-1,y>o){t.msg="invalid distance too far back",U.mode=30;break t}if(f>>>=m,c-=m,m=n-s,y>m){if(m=y-m,m>l&&U.sane){t.msg="invalid distance too far back",U.mode=30;break t}if(v=0,E=_,0===d){if(v+=h-m,m<k){k-=m;do{x[n++]=_[v++]}while(--m);v=n-y,E=x}}else if(d<m){if(v+=h+d-m,m-=d,m<k){k-=m;do{x[n++]=_[v++]}while(--m);if(v=0,d<k){m=d,k-=m;do{x[n++]=_[v++]}while(--m);v=n-y,E=x}}}else if(v+=d-m,m<k){k-=m;do{x[n++]=_[v++]}while(--m);v=n-y,E=x}for(;k>2;)x[n++]=E[v++],x[n++]=E[v++],x[n++]=E[v++],k-=3;k&&(x[n++]=E[v++],k>1&&(x[n++]=E[v++]))}else{v=n-y;do{x[n++]=x[v++],x[n++]=x[v++],x[n++]=x[v++],k-=3}while(k>2);k&&(x[n++]=x[v++],k>1&&(x[n++]=x[v++]))}break}}break}}while(i<a&&n<r);k=c>>3,i-=k,c-=k<<3,f&=(1<<c)-1,t.next_in=i,t.next_out=n,t.avail_in=i<a?a-i+5:5-(i-a),t.avail_out=n<r?r-n+257:257-(n-r),U.hold=f,U.bits=c};const le=15,de=new Uint16Array([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0]),_e=new Uint8Array([16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78]),fe=new Uint16Array([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0]),ce=new Uint8Array([16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64]);var ue=(t,e,i,a,n,s,r,o)=>{const h=o.bits;let l,d,_,f,c,u,w=0,p=0,g=0,b=0,m=0,k=0,y=0,v=0,E=0,A=0,x=null,U=0;const z=new Uint16Array(16),R=new Uint16Array(16);let N,L,O,T=null,D=0;for(w=0;w<=le;w++)z[w]=0;for(p=0;p<a;p++)z[e[i+p]]++;for(m=h,b=le;b>=1&&0===z[b];b--);if(m>b&&(m=b),0===b)return n[s++]=20971520,n[s++]=20971520,o.bits=1,0;for(g=1;g<b&&0===z[g];g++);for(m<g&&(m=g),v=1,w=1;w<=le;w++)if(v<<=1,v-=z[w],v<0)return-1;if(v>0&&(0===t||1!==b))return-1;for(R[1]=0,w=1;w<le;w++)R[w+1]=R[w]+z[w];for(p=0;p<a;p++)0!==e[i+p]&&(r[R[e[i+p]]++]=p);if(0===t?(x=T=r,u=19):1===t?(x=de,U-=257,T=_e,D-=257,u=256):(x=fe,T=ce,u=-1),A=0,p=0,w=g,c=s,k=m,y=0,_=-1,E=1<<m,f=E-1,1===t&&E>852||2===t&&E>592)return 1;for(;;){N=w-y,r[p]<u?(L=0,O=r[p]):r[p]>u?(L=T[D+r[p]],O=x[U+r[p]]):(L=96,O=0),l=1<<w-y,d=1<<k,g=d;do{d-=l,n[c+(A>>y)+d]=N<<24|L<<16|O|0}while(0!==d);for(l=1<<w-1;A&l;)l>>=1;if(0!==l?(A&=l-1,A+=l):A=0,p++,0==--z[w]){if(w===b)break;w=e[i+r[p]]}if(w>m&&(A&f)!==_){for(0===y&&(y=m),c+=g,k=w-y,v=1<<k;k+y<b&&(v-=z[k+y],!(v<=0));)k++,v<<=1;if(E+=1<<k,1===t&&E>852||2===t&&E>592)return 1;_=A&f,n[_]=m<<24|k<<16|c-s|0}}return 0!==A&&(n[c+A]=w-y<<24|64<<16|0),o.bits=m,0};const{Z_FINISH:we,Z_BLOCK:pe,Z_TREES:ge,Z_OK:be,Z_STREAM_END:me,Z_NEED_DICT:ke,Z_STREAM_ERROR:ye,Z_DATA_ERROR:ve,Z_MEM_ERROR:Ee,Z_BUF_ERROR:Ae,Z_DEFLATED:xe}=$,Ue=12,ze=30,Re=t=>(t>>>24&255)+(t>>>8&65280)+((65280&t)<<8)+((255&t)<<24);function Ne(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new Uint16Array(320),this.work=new Uint16Array(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}const Le=t=>{if(!t||!t.state)return ye;const e=t.state;return t.total_in=t.total_out=e.total=0,t.msg="",e.wrap&&(t.adler=1&e.wrap),e.mode=1,e.last=0,e.havedict=0,e.dmax=32768,e.head=null,e.hold=0,e.bits=0,e.lencode=e.lendyn=new Int32Array(852),e.distcode=e.distdyn=new Int32Array(592),e.sane=1,e.back=-1,be},Oe=t=>{if(!t||!t.state)return ye;const e=t.state;return e.wsize=0,e.whave=0,e.wnext=0,Le(t)},Te=(t,e)=>{let i;if(!t||!t.state)return ye;const a=t.state;return e<0?(i=0,e=-e):(i=1+(e>>4),e<48&&(e&=15)),e&&(e<8||e>15)?ye:(null!==a.window&&a.wbits!==e&&(a.window=null),a.wrap=i,a.wbits=e,Oe(t))},De=(t,e)=>{if(!t)return ye;const i=new Ne;t.state=i,i.window=null;const a=Te(t,e);return a!==be&&(t.state=null),a};let Se,Ze,Ie=!0;const Ce=t=>{if(Ie){Se=new Int32Array(512),Ze=new Int32Array(32);let e=0;for(;e<144;)t.lens[e++]=8;for(;e<256;)t.lens[e++]=9;for(;e<280;)t.lens[e++]=7;for(;e<288;)t.lens[e++]=8;for(ue(1,t.lens,0,288,Se,0,t.work,{bits:9}),e=0;e<32;)t.lens[e++]=5;ue(2,t.lens,0,32,Ze,0,t.work,{bits:5}),Ie=!1}t.lencode=Se,t.lenbits=9,t.distcode=Ze,t.distbits=5},Be=(t,e,i,a)=>{let n;const s=t.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new Uint8Array(s.wsize)),a>=s.wsize?(s.window.set(e.subarray(i-s.wsize,i),0),s.wnext=0,s.whave=s.wsize):(n=s.wsize-s.wnext,n>a&&(n=a),s.window.set(e.subarray(i-a,i-a+n),s.wnext),(a-=n)?(s.window.set(e.subarray(i-a,i),0),s.wnext=a,s.whave=s.wsize):(s.wnext+=n,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=n))),0};var Fe={inflateReset:Oe,inflateReset2:Te,inflateResetKeep:Le,inflateInit:t=>De(t,15),inflateInit2:De,inflate:(t,e)=>{let i,a,n,s,r,o,h,l,d,_,f,c,u,w,p,g,b,m,k,y,v,E,A=0;const x=new Uint8Array(4);let U,z;const R=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);if(!t||!t.state||!t.output||!t.input&&0!==t.avail_in)return ye;i=t.state,i.mode===Ue&&(i.mode=13),r=t.next_out,n=t.output,h=t.avail_out,s=t.next_in,a=t.input,o=t.avail_in,l=i.hold,d=i.bits,_=o,f=h,E=be;t:for(;;)switch(i.mode){case 1:if(0===i.wrap){i.mode=13;break}for(;d<16;){if(0===o)break t;o--,l+=a[s++]<<d,d+=8}if(2&i.wrap&&35615===l){i.check=0,x[0]=255&l,x[1]=l>>>8&255,i.check=W(i.check,x,2,0),l=0,d=0,i.mode=2;break}if(i.flags=0,i.head&&(i.head.done=!1),!(1&i.wrap)||(((255&l)<<8)+(l>>8))%31){t.msg="incorrect header check",i.mode=ze;break}if((15&l)!==xe){t.msg="unknown compression method",i.mode=ze;break}if(l>>>=4,d-=4,v=8+(15&l),0===i.wbits)i.wbits=v;else if(v>i.wbits){t.msg="invalid window size",i.mode=ze;break}i.dmax=1<<i.wbits,t.adler=i.check=1,i.mode=512&l?10:Ue,l=0,d=0;break;case 2:for(;d<16;){if(0===o)break t;o--,l+=a[s++]<<d,d+=8}if(i.flags=l,(255&i.flags)!==xe){t.msg="unknown compression method",i.mode=ze;break}if(57344&i.flags){t.msg="unknown header flags set",i.mode=ze;break}i.head&&(i.head.text=l>>8&1),512&i.flags&&(x[0]=255&l,x[1]=l>>>8&255,i.check=W(i.check,x,2,0)),l=0,d=0,i.mode=3;case 3:for(;d<32;){if(0===o)break t;o--,l+=a[s++]<<d,d+=8}i.head&&(i.head.time=l),512&i.flags&&(x[0]=255&l,x[1]=l>>>8&255,x[2]=l>>>16&255,x[3]=l>>>24&255,i.check=W(i.check,x,4,0)),l=0,d=0,i.mode=4;case 4:for(;d<16;){if(0===o)break t;o--,l+=a[s++]<<d,d+=8}i.head&&(i.head.xflags=255&l,i.head.os=l>>8),512&i.flags&&(x[0]=255&l,x[1]=l>>>8&255,i.check=W(i.check,x,2,0)),l=0,d=0,i.mode=5;case 5:if(1024&i.flags){for(;d<16;){if(0===o)break t;o--,l+=a[s++]<<d,d+=8}i.length=l,i.head&&(i.head.extra_len=l),512&i.flags&&(x[0]=255&l,x[1]=l>>>8&255,i.check=W(i.check,x,2,0)),l=0,d=0}else i.head&&(i.head.extra=null);i.mode=6;case 6:if(1024&i.flags&&(c=i.length,c>o&&(c=o),c&&(i.head&&(v=i.head.extra_len-i.length,i.head.extra||(i.head.extra=new Uint8Array(i.head.extra_len)),i.head.extra.set(a.subarray(s,s+c),v)),512&i.flags&&(i.check=W(i.check,a,c,s)),o-=c,s+=c,i.length-=c),i.length))break t;i.length=0,i.mode=7;case 7:if(2048&i.flags){if(0===o)break t;c=0;do{v=a[s+c++],i.head&&v&&i.length<65536&&(i.head.name+=String.fromCharCode(v))}while(v&&c<o);if(512&i.flags&&(i.check=W(i.check,a,c,s)),o-=c,s+=c,v)break t}else i.head&&(i.head.name=null);i.length=0,i.mode=8;case 8:if(4096&i.flags){if(0===o)break t;c=0;do{v=a[s+c++],i.head&&v&&i.length<65536&&(i.head.comment+=String.fromCharCode(v))}while(v&&c<o);if(512&i.flags&&(i.check=W(i.check,a,c,s)),o-=c,s+=c,v)break t}else i.head&&(i.head.comment=null);i.mode=9;case 9:if(512&i.flags){for(;d<16;){if(0===o)break t;o--,l+=a[s++]<<d,d+=8}if(l!==(65535&i.check)){t.msg="header crc mismatch",i.mode=ze;break}l=0,d=0}i.head&&(i.head.hcrc=i.flags>>9&1,i.head.done=!0),t.adler=i.check=0,i.mode=Ue;break;case 10:for(;d<32;){if(0===o)break t;o--,l+=a[s++]<<d,d+=8}t.adler=i.check=Re(l),l=0,d=0,i.mode=11;case 11:if(0===i.havedict)return t.next_out=r,t.avail_out=h,t.next_in=s,t.avail_in=o,i.hold=l,i.bits=d,ke;t.adler=i.check=1,i.mode=Ue;case Ue:if(e===pe||e===ge)break t;case 13:if(i.last){l>>>=7&d,d-=7&d,i.mode=27;break}for(;d<3;){if(0===o)break t;o--,l+=a[s++]<<d,d+=8}switch(i.last=1&l,l>>>=1,d-=1,3&l){case 0:i.mode=14;break;case 1:if(Ce(i),i.mode=20,e===ge){l>>>=2,d-=2;break t}break;case 2:i.mode=17;break;case 3:t.msg="invalid block type",i.mode=ze}l>>>=2,d-=2;break;case 14:for(l>>>=7&d,d-=7&d;d<32;){if(0===o)break t;o--,l+=a[s++]<<d,d+=8}if((65535&l)!=(l>>>16^65535)){t.msg="invalid stored block lengths",i.mode=ze;break}if(i.length=65535&l,l=0,d=0,i.mode=15,e===ge)break t;case 15:i.mode=16;case 16:if(c=i.length,c){if(c>o&&(c=o),c>h&&(c=h),0===c)break t;n.set(a.subarray(s,s+c),r),o-=c,s+=c,h-=c,r+=c,i.length-=c;break}i.mode=Ue;break;case 17:for(;d<14;){if(0===o)break t;o--,l+=a[s++]<<d,d+=8}if(i.nlen=257+(31&l),l>>>=5,d-=5,i.ndist=1+(31&l),l>>>=5,d-=5,i.ncode=4+(15&l),l>>>=4,d-=4,i.nlen>286||i.ndist>30){t.msg="too many length or distance symbols",i.mode=ze;break}i.have=0,i.mode=18;case 18:for(;i.have<i.ncode;){for(;d<3;){if(0===o)break t;o--,l+=a[s++]<<d,d+=8}i.lens[R[i.have++]]=7&l,l>>>=3,d-=3}for(;i.have<19;)i.lens[R[i.have++]]=0;if(i.lencode=i.lendyn,i.lenbits=7,U={bits:i.lenbits},E=ue(0,i.lens,0,19,i.lencode,0,i.work,U),i.lenbits=U.bits,E){t.msg="invalid code lengths set",i.mode=ze;break}i.have=0,i.mode=19;case 19:for(;i.have<i.nlen+i.ndist;){for(;A=i.lencode[l&(1<<i.lenbits)-1],p=A>>>24,g=A>>>16&255,b=65535&A,!(p<=d);){if(0===o)break t;o--,l+=a[s++]<<d,d+=8}if(b<16)l>>>=p,d-=p,i.lens[i.have++]=b;else{if(16===b){for(z=p+2;d<z;){if(0===o)break t;o--,l+=a[s++]<<d,d+=8}if(l>>>=p,d-=p,0===i.have){t.msg="invalid bit length repeat",i.mode=ze;break}v=i.lens[i.have-1],c=3+(3&l),l>>>=2,d-=2}else if(17===b){for(z=p+3;d<z;){if(0===o)break t;o--,l+=a[s++]<<d,d+=8}l>>>=p,d-=p,v=0,c=3+(7&l),l>>>=3,d-=3}else{for(z=p+7;d<z;){if(0===o)break t;o--,l+=a[s++]<<d,d+=8}l>>>=p,d-=p,v=0,c=11+(127&l),l>>>=7,d-=7}if(i.have+c>i.nlen+i.ndist){t.msg="invalid bit length repeat",i.mode=ze;break}for(;c--;)i.lens[i.have++]=v}}if(i.mode===ze)break;if(0===i.lens[256]){t.msg="invalid code -- missing end-of-block",i.mode=ze;break}if(i.lenbits=9,U={bits:i.lenbits},E=ue(1,i.lens,0,i.nlen,i.lencode,0,i.work,U),i.lenbits=U.bits,E){t.msg="invalid literal/lengths set",i.mode=ze;break}if(i.distbits=6,i.distcode=i.distdyn,U={bits:i.distbits},E=ue(2,i.lens,i.nlen,i.ndist,i.distcode,0,i.work,U),i.distbits=U.bits,E){t.msg="invalid distances set",i.mode=ze;break}if(i.mode=20,e===ge)break t;case 20:i.mode=21;case 21:if(o>=6&&h>=258){t.next_out=r,t.avail_out=h,t.next_in=s,t.avail_in=o,i.hold=l,i.bits=d,he(t,f),r=t.next_out,n=t.output,h=t.avail_out,s=t.next_in,a=t.input,o=t.avail_in,l=i.hold,d=i.bits,i.mode===Ue&&(i.back=-1);break}for(i.back=0;A=i.lencode[l&(1<<i.lenbits)-1],p=A>>>24,g=A>>>16&255,b=65535&A,!(p<=d);){if(0===o)break t;o--,l+=a[s++]<<d,d+=8}if(g&&0==(240&g)){for(m=p,k=g,y=b;A=i.lencode[y+((l&(1<<m+k)-1)>>m)],p=A>>>24,g=A>>>16&255,b=65535&A,!(m+p<=d);){if(0===o)break t;o--,l+=a[s++]<<d,d+=8}l>>>=m,d-=m,i.back+=m}if(l>>>=p,d-=p,i.back+=p,i.length=b,0===g){i.mode=26;break}if(32&g){i.back=-1,i.mode=Ue;break}if(64&g){t.msg="invalid literal/length code",i.mode=ze;break}i.extra=15&g,i.mode=22;case 22:if(i.extra){for(z=i.extra;d<z;){if(0===o)break t;o--,l+=a[s++]<<d,d+=8}i.length+=l&(1<<i.extra)-1,l>>>=i.extra,d-=i.extra,i.back+=i.extra}i.was=i.length,i.mode=23;case 23:for(;A=i.distcode[l&(1<<i.distbits)-1],p=A>>>24,g=A>>>16&255,b=65535&A,!(p<=d);){if(0===o)break t;o--,l+=a[s++]<<d,d+=8}if(0==(240&g)){for(m=p,k=g,y=b;A=i.distcode[y+((l&(1<<m+k)-1)>>m)],p=A>>>24,g=A>>>16&255,b=65535&A,!(m+p<=d);){if(0===o)break t;o--,l+=a[s++]<<d,d+=8}l>>>=m,d-=m,i.back+=m}if(l>>>=p,d-=p,i.back+=p,64&g){t.msg="invalid distance code",i.mode=ze;break}i.offset=b,i.extra=15&g,i.mode=24;case 24:if(i.extra){for(z=i.extra;d<z;){if(0===o)break t;o--,l+=a[s++]<<d,d+=8}i.offset+=l&(1<<i.extra)-1,l>>>=i.extra,d-=i.extra,i.back+=i.extra}if(i.offset>i.dmax){t.msg="invalid distance too far back",i.mode=ze;break}i.mode=25;case 25:if(0===h)break t;if(c=f-h,i.offset>c){if(c=i.offset-c,c>i.whave&&i.sane){t.msg="invalid distance too far back",i.mode=ze;break}c>i.wnext?(c-=i.wnext,u=i.wsize-c):u=i.wnext-c,c>i.length&&(c=i.length),w=i.window}else w=n,u=r-i.offset,c=i.length;c>h&&(c=h),h-=c,i.length-=c;do{n[r++]=w[u++]}while(--c);0===i.length&&(i.mode=21);break;case 26:if(0===h)break t;n[r++]=i.length,h--,i.mode=21;break;case 27:if(i.wrap){for(;d<32;){if(0===o)break t;o--,l|=a[s++]<<d,d+=8}if(f-=h,t.total_out+=f,i.total+=f,f&&(t.adler=i.check=i.flags?W(i.check,n,f,r-f):H(i.check,n,f,r-f)),f=h,(i.flags?l:Re(l))!==i.check){t.msg="incorrect data check",i.mode=ze;break}l=0,d=0}i.mode=28;case 28:if(i.wrap&&i.flags){for(;d<32;){if(0===o)break t;o--,l+=a[s++]<<d,d+=8}if(l!==(4294967295&i.total)){t.msg="incorrect length check",i.mode=ze;break}l=0,d=0}i.mode=29;case 29:E=me;break t;case ze:E=ve;break t;case 31:return Ee;case 32:default:return ye}return t.next_out=r,t.avail_out=h,t.next_in=s,t.avail_in=o,i.hold=l,i.bits=d,(i.wsize||f!==t.avail_out&&i.mode<ze&&(i.mode<27||e!==we))&&Be(t,t.output,t.next_out,f-t.avail_out),_-=t.avail_in,f-=t.avail_out,t.total_in+=_,t.total_out+=f,i.total+=f,i.wrap&&f&&(t.adler=i.check=i.flags?W(i.check,n,f,t.next_out-f):H(i.check,n,f,t.next_out-f)),t.data_type=i.bits+(i.last?64:0)+(i.mode===Ue?128:0)+(20===i.mode||15===i.mode?256:0),(0===_&&0===f||e===we)&&E===be&&(E=Ae),E},inflateEnd:t=>{if(!t||!t.state)return ye;let e=t.state;return e.window&&(e.window=null),t.state=null,be},inflateGetHeader:(t,e)=>{if(!t||!t.state)return ye;const i=t.state;return 0==(2&i.wrap)?ye:(i.head=e,e.done=!1,be)},inflateSetDictionary:(t,e)=>{const i=e.length;let a,n,s;return t&&t.state?(a=t.state,0!==a.wrap&&11!==a.mode?ye:11===a.mode&&(n=1,n=H(n,e,i,0),n!==a.check)?ve:(s=Be(t,e,i,i),s?(a.mode=31,Ee):(a.havedict=1,be))):ye},inflateInfo:"pako inflate (from Nodeca project)"};var Me=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1};const He=Object.prototype.toString,{Z_NO_FLUSH:Pe,Z_FINISH:We,Z_OK:Ke,Z_STREAM_END:$e,Z_NEED_DICT:Ye,Z_STREAM_ERROR:je,Z_DATA_ERROR:Ge,Z_MEM_ERROR:Xe}=$;function Ve(t){this.options=Ht({chunkSize:65536,windowBits:15,to:""},t||{});const e=this.options;e.raw&&e.windowBits>=0&&e.windowBits<16&&(e.windowBits=-e.windowBits,0===e.windowBits&&(e.windowBits=-15)),!(e.windowBits>=0&&e.windowBits<16)||t&&t.windowBits||(e.windowBits+=32),e.windowBits>15&&e.windowBits<48&&0==(15&e.windowBits)&&(e.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new Gt,this.strm.avail_out=0;let i=Fe.inflateInit2(this.strm,e.windowBits);if(i!==Ke)throw new Error(K[i]);if(this.header=new Me,Fe.inflateGetHeader(this.strm,this.header),e.dictionary&&("string"==typeof e.dictionary?e.dictionary=$t(e.dictionary):"[object ArrayBuffer]"===He.call(e.dictionary)&&(e.dictionary=new Uint8Array(e.dictionary)),e.raw&&(i=Fe.inflateSetDictionary(this.strm,e.dictionary),i!==Ke)))throw new Error(K[i])}function qe(t,e){const i=new Ve(e);if(i.push(t),i.err)throw i.msg||K[i.err];return i.result}Ve.prototype.push=function(t,e){const i=this.strm,a=this.options.chunkSize,n=this.options.dictionary;let s,r,o;if(this.ended)return!1;for(r=e===~~e?e:!0===e?We:Pe,"[object ArrayBuffer]"===He.call(t)?i.input=new Uint8Array(t):i.input=t,i.next_in=0,i.avail_in=i.input.length;;){for(0===i.avail_out&&(i.output=new Uint8Array(a),i.next_out=0,i.avail_out=a),s=Fe.inflate(i,r),s===Ye&&n&&(s=Fe.inflateSetDictionary(i,n),s===Ke?s=Fe.inflate(i,r):s===Ge&&(s=Ye));i.avail_in>0&&s===$e&&i.state.wrap>0&&0!==t[i.next_in];)Fe.inflateReset(i),s=Fe.inflate(i,r);switch(s){case je:case Ge:case Ye:case Xe:return this.onEnd(s),this.ended=!0,!1}if(o=i.avail_out,i.next_out&&(0===i.avail_out||s===$e))if("string"===this.options.to){let t=jt(i.output,i.next_out),e=i.next_out-t,n=Yt(i.output,t);i.next_out=e,i.avail_out=a-e,e&&i.output.set(i.output.subarray(t,t+e),0),this.onData(n)}else this.onData(i.output.length===i.next_out?i.output:i.output.subarray(0,i.next_out));if(s!==Ke||0!==o){if(s===$e)return s=Fe.inflateEnd(this.strm),this.onEnd(s),this.ended=!0,!0;if(0===i.avail_in)break}}return!0},Ve.prototype.onData=function(t){this.chunks.push(t)},Ve.prototype.onEnd=function(t){t===Ke&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=Pt(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg};var Je={Inflate:Ve,inflate:qe,inflateRaw:function(t,e){return(e=e||{}).raw=!0,qe(t,e)},ungzip:qe,constants:$};const{Deflate:Qe,deflate:ti,deflateRaw:ei,gzip:ii}=oe,{Inflate:ai,inflate:ni,inflateRaw:si,ungzip:ri}=Je;var oi=ai;const hi=[137,80,78,71,13,10,26,10],li=[];for(let t=0;t<256;t++){let e=t;for(let t=0;t<8;t++)1&e?e=3988292384^e>>>1:e>>>=1;li[t]=e}const di=4294967295;function _i(t,e){return(function(t,e,i){let a=t;for(let t=0;t<i;t++)a=li[255&(a^e[t])]^a>>>8;return a}(di,t,e)^di)>>>0}var fi,ci,ui,wi;!function(t){t[t.UNKNOWN=-1]="UNKNOWN",t[t.GREYSCALE=0]="GREYSCALE",t[t.TRUECOLOUR=2]="TRUECOLOUR",t[t.INDEXED_COLOUR=3]="INDEXED_COLOUR",t[t.GREYSCALE_ALPHA=4]="GREYSCALE_ALPHA",t[t.TRUECOLOUR_ALPHA=6]="TRUECOLOUR_ALPHA"}(fi||(fi={})),function(t){t[t.UNKNOWN=-1]="UNKNOWN",t[t.DEFLATE=0]="DEFLATE"}(ci||(ci={})),function(t){t[t.UNKNOWN=-1]="UNKNOWN",t[t.ADAPTIVE=0]="ADAPTIVE"}(ui||(ui={})),function(t){t[t.UNKNOWN=-1]="UNKNOWN",t[t.NO_INTERLACE=0]="NO_INTERLACE",t[t.ADAM7=1]="ADAM7"}(wi||(wi={}));const pi=new Uint8Array(0),gi=new Uint16Array([255]),bi=255===new Uint8Array(gi.buffer)[0];class mi extends a{constructor(t,e={}){super(t);const{checkCrc:i=!1}=e;this._checkCrc=i,this._inflator=new oi,this._png={width:-1,height:-1,channels:-1,data:new Uint8Array(0),depth:1,text:{}},this._end=!1,this._hasPalette=!1,this._palette=[],this._compressionMethod=ci.UNKNOWN,this._filterMethod=ui.UNKNOWN,this._interlaceMethod=wi.UNKNOWN,this._colorType=-1,this.setBigEndian()}decode(){for(this.decodeSignature();!this._end;)this.decodeChunk();return this.decodeImage(),this._png}decodeSignature(){for(let t=0;t<hi.length;t++)if(this.readUint8()!==hi[t])throw new Error(`wrong PNG signature. Byte at ${t} should be ${hi[t]}.`)}decodeChunk(){const t=this.readUint32(),e=this.readChars(4),i=this.offset;switch(e){case"IHDR":this.decodeIHDR();break;case"PLTE":this.decodePLTE(t);break;case"IDAT":this.decodeIDAT(t);break;case"IEND":this._end=!0;break;case"tRNS":this.decodetRNS(t);break;case"tEXt":this.decodetEXt(t);break;case"pHYs":this.decodepHYs();break;default:this.skip(t)}if(this.offset-i!==t)throw new Error(`Length mismatch while decoding chunk ${e}`);if(this._checkCrc){const i=this.readUint32(),a=t+4,n=_i(new Uint8Array(this.buffer,this.byteOffset+this.offset-a-4,a),a);if(n!==i)throw new Error(`CRC mismatch for chunk ${e}. Expected ${i}, found ${n}`)}else this.skip(4)}decodeIHDR(){const t=this._png;t.width=this.readUint32(),t.height=this.readUint32(),t.depth=function(t){if(1!==t&&2!==t&&4!==t&&8!==t&&16!==t)throw new Error(`invalid bit depth: ${t}`);return t}(this.readUint8());const e=this.readUint8();let i;switch(this._colorType=e,e){case fi.GREYSCALE:i=1;break;case fi.TRUECOLOUR:i=3;break;case fi.INDEXED_COLOUR:i=1;break;case fi.GREYSCALE_ALPHA:i=2;break;case fi.TRUECOLOUR_ALPHA:i=4;break;default:throw new Error(`Unknown color type: ${e}`)}if(this._png.channels=i,this._compressionMethod=this.readUint8(),this._compressionMethod!==ci.DEFLATE)throw new Error(`Unsupported compression method: ${this._compressionMethod}`);this._filterMethod=this.readUint8(),this._interlaceMethod=this.readUint8()}decodePLTE(t){if(t%3!=0)throw new RangeError(`PLTE field length must be a multiple of 3. Got ${t}`);const e=t/3;this._hasPalette=!0;const i=[];this._palette=i;for(let t=0;t<e;t++)i.push([this.readUint8(),this.readUint8(),this.readUint8()])}decodeIDAT(t){this._inflator.push(new Uint8Array(this.buffer,this.offset+this.byteOffset,t)),this.skip(t)}decodetRNS(t){if(3===this._colorType){if(t>this._palette.length)throw new Error(`tRNS chunk contains more alpha values than there are palette colors (${t} vs ${this._palette.length})`);let e=0;for(;e<t;e++){const t=this.readByte();this._palette[e].push(t)}for(;e<this._palette.length;e++)this._palette[e].push(255)}}decodetEXt(t){let e,i="";for(;"\\0"!==(e=this.readChar());)i+=e;this._png.text[i]=this.readChars(t-i.length-1)}decodepHYs(){const t=this.readUint32(),e=this.readUint32(),i=this.readByte();this._png.resolution={x:t,y:e,unit:i}}decodeImage(){if(this._inflator.err)throw new Error(`Error while decompressing the data: ${this._inflator.err}`);const t=this._inflator.result;if(this._filterMethod!==ui.ADAPTIVE)throw new Error(`Filter method ${this._filterMethod} not supported`);if(this._interlaceMethod!==wi.NO_INTERLACE)throw new Error(`Interlace method ${this._interlaceMethod} not supported`);this.decodeInterlaceNull(t)}decodeInterlaceNull(t){const e=this._png.height,i=this._png.channels*this._png.depth/8,a=this._png.width*i,n=new Uint8Array(this._png.height*a);let s,r,o=pi,h=0;for(let l=0;l<e;l++){switch(s=t.subarray(h+1,h+1+a),r=n.subarray(l*a,(l+1)*a),t[h]){case 0:ki(s,r,a);break;case 1:yi(s,r,a,i);break;case 2:vi(s,r,o,a);break;case 3:Ei(s,r,o,a,i);break;case 4:Ai(s,r,o,a,i);break;default:throw new Error(`Unsupported filter: ${t[h]}`)}o=r,h+=a+1}if(this._hasPalette&&(this._png.palette=this._palette),16===this._png.depth){const t=new Uint16Array(n.buffer);if(bi)for(let e=0;e<t.length;e++)t[e]=(255&(l=t[e]))<<8|l>>8&255;this._png.data=t}else this._png.data=n;var l}}function ki(t,e,i){for(let a=0;a<i;a++)e[a]=t[a]}function yi(t,e,i,a){let n=0;for(;n<a;n++)e[n]=t[n];for(;n<i;n++)e[n]=t[n]+e[n-a]&255}function vi(t,e,i,a){let n=0;if(0===i.length)for(;n<a;n++)e[n]=t[n];else for(;n<a;n++)e[n]=t[n]+i[n]&255}function Ei(t,e,i,a,n){let s=0;if(0===i.length){for(;s<n;s++)e[s]=t[s];for(;s<a;s++)e[s]=t[s]+(e[s-n]>>1)&255}else{for(;s<n;s++)e[s]=t[s]+(i[s]>>1)&255;for(;s<a;s++)e[s]=t[s]+(e[s-n]+i[s]>>1)&255}}function Ai(t,e,i,a,n){let s=0;if(0===i.length){for(;s<n;s++)e[s]=t[s];for(;s<a;s++)e[s]=t[s]+e[s-n]&255}else{for(;s<n;s++)e[s]=t[s]+i[s]&255;for(;s<a;s++)e[s]=t[s]+xi(e[s-n],i[s],i[s-n])&255}}function xi(t,e,i){const a=t+e-i,n=Math.abs(a-t),s=Math.abs(a-e),r=Math.abs(a-i);return n<=s&&n<=r?t:s<=r?e:i}var Ui;!function(t){t[t.UNKNOWN=0]="UNKNOWN",t[t.METRE=1]="METRE"}(Ui||(Ui={})),self.addEventListener("message",(t=>{const e=t.data,i=new mi(e,a).decode();var a;let n;if(3===i.channels&&8===i.depth){const t=i.data.buffer,e=new Uint8ClampedArray(i.height*i.width*4),a=2**i.depth-1;for(let n=0;n<i.height*i.width;n++)e[4*n]=t[3*n],e[4*n+1]=t[3*n+1],e[4*n+2]=t[3*n+2],e[4*n+3]=a;n=e.buffer}else n=i.data.buffer;postMessage({data:n,width:i.width,height:i.height},[n])}))})()})();',
            'Worker',
            void 0,
            void 0,
          );
        }),
        ot = new WeakMap();
      function ht(t) {
        return function () {
          return (function (t) {
            let e = ot.get(t);
            return e || ((e = new J(t, at, tt.U)), ot.set(t, e)), e;
          })(t);
        };
      }
      const lt = new o.Z('LoaderComponent');
      var dt;
      !(function (t) {
        (t.Idle = 'Idle'), (t.Loading = 'Loading'), (t.Loaded = 'Loaded'), (t.Error = 'Error');
      })(dt || (dt = {}));
      const ct = (t) => new pt(new t()),
        ut = (t, e) => {
          if (t && (e(t), t.children && t.children.length > 0))
            for (const i of t.children) ut(i, e);
        },
        ft = (t) => {
          ut(t, (t) => {
            if ('Mesh' === t.type) {
              const e = t;
              if ((e.geometry && e.geometry.dispose(), e.material))
                if (Array.isArray(e.material)) {
                  const t = e.material;
                  for (const e of t) e.dispose();
                } else {
                  e.material.dispose();
                }
            }
          });
        };
      class pt {
        constructor(t) {
          (this.assetLoader = t),
            (this.visibleCache = !0),
            (this.urlCache = ''),
            (this.materialUrlCache = ''),
            (this.pivot = null),
            (this.inputs = {
              url: '',
              materialUrl: '',
              visible: !0,
              onLoaded: (t) => {},
              localScale: { x: 1, y: 1, z: 1 },
              localRotation: { x: 0, y: 0, z: 0 },
              localPosition: { x: 0, y: 0, z: 0 },
              colliderEnabled: !0,
            }),
            (this.events = { [n.CLICK]: !0, [n.HOVER]: !0, [n.DRAG]: !1 }),
            (this.emits = { [n.CLICK]: !0, [n.HOVER]: !0, [n.DRAG]: !1 }),
            (this.outputs = { loadingState: dt.Idle });
        }
        onInit() {
          this.checkForUpdates();
        }
        onInputsUpdated() {
          this.checkForUpdates();
        }
        onEvent(t, e) {
          this.notify(t, e);
        }
        onDestroy() {
          this.pivot && (ft(this.pivot), (this.outputs.objectRoot = null), (this.pivot = null));
        }
        async checkForUpdates() {
          if (
            this.inputs.url !== this.urlCache ||
            this.inputs.materialUrl !== this.materialUrlCache
          ) {
            if (
              ((this.urlCache = this.inputs.url),
              (this.materialUrlCache = this.inputs.materialUrl),
              null === this.inputs.url)
            )
              return void (this.outputs.loadingState = dt.Idle);
            const t = this.pivot;
            (this.pivot = new _.Object3D()),
              (this.outputs.objectRoot = null),
              (this.outputs.collider = null),
              t && ft(t),
              lt.debug(`Loading ${this.inputs.url}`),
              (this.outputs.loadingState = dt.Loading);
            const e = this.inputs.url;
            let i,
              n = !1;
            try {
              i = await this.assetLoader.load(this.inputs.url, this.inputs.materialUrl);
            } catch (t) {
              n = !0;
            }
            if (e !== this.inputs.url)
              return void lt.debug(`Ignoring url ${e} since the input url changed during loading.`);
            if (n || !i) return void (this.outputs.loadingState = dt.Error);
            this.pivot.add(i.objectRoot), (this.outputs.objectRoot = this.pivot);
          }
          if (
            (this.inputs.visible !== this.visibleCache &&
              this.outputs.objectRoot &&
              ((this.visibleCache = this.inputs.visible),
              (this.outputs.objectRoot.visible = this.visibleCache)),
            this.outputs.objectRoot &&
              (this.outputs.collider = this.inputs.colliderEnabled ? this.pivot : null),
            this.outputs.objectRoot && this.pivot)
          ) {
            const t = this.pivot.children[0],
              e = new _.Euler(
                (this.inputs.localRotation.x * Math.PI) / 180,
                (this.inputs.localRotation.y * Math.PI) / 180,
                (this.inputs.localRotation.z * Math.PI) / 180,
                'YXZ',
              );
            this.pivot.quaternion.setFromEuler(e),
              t.scale.set(
                this.inputs.localScale.x,
                this.inputs.localScale.y,
                this.inputs.localScale.z,
              ),
              t.position.set(
                this.inputs.localPosition.x,
                this.inputs.localPosition.y,
                this.inputs.localPosition.z,
              );
          }
          (this.outputs.loadingState = dt.Loaded),
            this.inputs.onLoaded(this.outputs.objectRoot || null);
        }
      }
      var _t;
      !(function (t) {
        (t.ONACCESSGRANTED = 'ONACCESSGRANTED'), (t.ONACCESSREVOKED = 'ONACCESSREVOKED');
      })(_t || (_t = {}));
      const gt = (t) => {
        class e {
          constructor() {
            (this.sub = null),
              (this.controller = null),
              (this.tmpPosition = new _.Vector3()),
              (this.tmpQuaternion = new _.Quaternion()),
              (this.inputs = { enabled: !1, camera: null }),
              (this.emits = { [_t.ONACCESSGRANTED]: !0, [_t.ONACCESSREVOKED]: !0 });
          }
          onInit() {
            this.inputs.enabled && this.requestControl();
          }
          onInputsUpdated(t) {
            t.enabled && this.release(), this.inputs.enabled && this.requestControl();
          }
          onTick() {
            const t = this.inputs.camera;
            t &&
              this.controller &&
              (t.getWorldPosition(this.tmpPosition),
              t.getWorldQuaternion(this.tmpQuaternion),
              this.controller.updateCameraPosition(this.tmpPosition),
              this.controller.updateCameraRotation(this.tmpQuaternion));
          }
          onDestroy() {
            this.release();
          }
          release() {
            this.sub && (this.sub.cancel(), (this.sub = null));
          }
          requestControl() {
            this.sub = t.newSession(
              new (class {
                constructor(t) {
                  this.component = t;
                }
                onAccessGranted(t) {
                  (this.component.controller = t), this.notify(t, _t.ONACCESSGRANTED);
                }
                onAccessRevoked(t) {
                  (this.component.controller = null), this.notify(t, _t.ONACCESSREVOKED);
                }
                notify(e, i) {
                  const n = this.component,
                    s = { pose: t.pose };
                  n.notify(i, s);
                }
              })(this),
            );
          }
        }
        return () => new e();
      };
      var wt = i(59228),
        bt = i(68720),
        mt = i(31971),
        yt = i(11798),
        vt = i(12216),
        kt = i(58724),
        Et = i(41200);
      const xt = (t, e) => {
          class i {
            constructor() {
              (this.subs = []),
                (this.inputs = { eventsEnabled: !0, userNavigationEnabled: !0, unfiltered: !0 }),
                (this.emits = {
                  [n.CLICK]: !0,
                  [n.HOVER]: !0,
                  [n.DRAG]: !0,
                  [n.DRAG_BEGIN]: !0,
                  [n.DRAG_END]: !0,
                  [n.POINTER_MOVE]: !0,
                  [n.POINTER_BUTTON]: !0,
                  [n.SCROLL]: !0,
                  [n.KEY]: !0,
                  [n.LONG_PRESS_START]: !0,
                  [n.LONG_PRESS_END]: !0,
                  [n.MULTI_SWIPE]: !0,
                  [n.MULTI_SWIPE_END]: !0,
                  [n.PINCH]: !0,
                  [n.PINCH_END]: !0,
                  [n.ROTATE]: !0,
                  [n.ROTATE_END]: !0,
                }),
                (this.isUserNavigationEnabled = this.isUserNavigationEnabled.bind(this));
            }
            subHandler(e, i) {
              this.inputs.unfiltered
                ? this.subs.push(t.registerUnfilteredHandler(e, (t) => this.notify(i, t)))
                : this.subs.push(t.registerHandler(e, (t) => this.notify(i, t)));
            }
            isUserNavigationEnabled() {
              return this.inputs.userNavigationEnabled;
            }
            onInit() {
              e.addNavigationRule(this.isUserNavigationEnabled),
                this.inputs.eventsEnabled && this.subscribeAll();
            }
            onInputsUpdated(t) {
              t.eventsEnabled !== this.inputs.eventsEnabled
                ? this.inputs.eventsEnabled
                  ? this.subscribeAll()
                  : this.cancelAll()
                : t.unfiltered !== this.inputs.unfiltered &&
                  this.inputs.eventsEnabled &&
                  (this.cancelAll(), this.subscribeAll());
            }
            onDestroy() {
              e.removeNavigationRule(this.isUserNavigationEnabled), this.cancelAll();
            }
            subscribeAll() {
              this.subs.length > 0
                ? this.subs.forEach((t) => t.renew())
                : (this.subHandler(wt.mE, n.POINTER_MOVE),
                  this.subHandler(m.E0, n.DRAG_BEGIN),
                  this.subHandler(m._t, n.DRAG),
                  this.subHandler(m._R, n.DRAG_END),
                  this.subHandler(bt.a, n.SCROLL),
                  this.subHandler(wt.er, n.POINTER_BUTTON),
                  this.subHandler(mt.e, n.KEY),
                  this.subHandler(w.Rd, n.CLICK),
                  this.subHandler(yt.Vh, n.LONG_PRESS_START),
                  this.subHandler(yt.pt, n.LONG_PRESS_END),
                  this.subHandler(vt.d, n.MULTI_SWIPE),
                  this.subHandler(vt.h, n.MULTI_SWIPE_END),
                  this.subHandler(kt.G, n.PINCH),
                  this.subHandler(kt.i, n.PINCH_END),
                  this.subHandler(Et.D, n.ROTATE),
                  this.subHandler(Et.u, n.ROTATE_END));
            }
            cancelAll() {
              this.subs.forEach((t) => t.cancel());
            }
          }
          return () => new i();
        },
        At = (t) => {
          class e {
            constructor() {
              this.outputs = { session: null };
            }
            onTick() {
              this.outputs.session = t.xr.getSession();
            }
          }
          return () => new e();
        };
      var Ut,
        Ot = i(49518);
      !(function (t) {
        (t.OUTPUT = 'output'), (t.INPUT = 'input'), (t.EVENT = 'event'), (t.EMIT = 'emit');
      })(Ut || (Ut = {}));
      var Rt,
        Tt,
        Nt,
        zt,
        It,
        Ct,
        St,
        Dt,
        Lt,
        Pt = function (t, e, i, n, s) {
          if ('m' === n) throw new TypeError('Private method is not writable');
          if ('a' === n && !s) throw new TypeError('Private accessor was defined without a setter');
          if ('function' == typeof e ? t !== e || !s : !e.has(t))
            throw new TypeError(
              'Cannot write private member to an object whose class did not declare it',
            );
          return 'a' === n ? s.call(t, i) : s ? (s.value = i) : e.set(t, i), i;
        },
        Bt = function (t, e, i, n) {
          if ('a' === i && !n) throw new TypeError('Private accessor was defined without a getter');
          if ('function' == typeof e ? t !== e || !n : !e.has(t))
            throw new TypeError(
              'Cannot read private member from an object whose class did not declare it',
            );
          return 'm' === i ? n : 'a' === i ? n.call(t) : n ? n.value : e.get(t);
        };
      const Ft = new o.Z('ScenePath');
      function Mt(t, e, i, n) {
        return `${t ? `${t.id}/` : ''}${e.id}/${i}/${n}`;
      }
      function jt(t, e, i) {
        switch (
          ((i.node = e), (i.component = null), (i.type = null), (i.property = null), t.length)
        ) {
          case 3:
            (i.property = t[2]), (i.component = e.findComponentById(t[0])), (i.type = t[1]);
            break;
          case 2:
            (i.property = t[1]),
              (i.component = e.findComponentById(t[0])),
              (i.type = i.component ? Wt(i.property, i.component) : null);
        }
      }
      function Zt(t, e) {
        const i = t.split('/'),
          n = { node: null, component: null, type: null, property: null };
        return jt.length > 0 && jt(i, e, n), n;
      }
      function Ht(t, e) {
        const i = t.split('/'),
          n = { node: null, component: null, type: null, property: null };
        if (i.length > 0) {
          const t = e.findNodeById(i[0]);
          t && (i.splice(0, 1), jt(i, t, n));
        }
        return n;
      }
      function Wt(t, e) {
        return t in e.outputs
          ? Ut.OUTPUT
          : e.inputs && t in e.inputs
            ? Ut.INPUT
            : t in e.events
              ? Ut.EVENT
              : e.emits && t in e.emits
                ? Ut.EMIT
                : null;
      }
      class Kt {
        constructor(t, e) {
          Rt.set(this, void 0), Tt.set(this, void 0), Pt(this, Rt, t, 'f'), Pt(this, Tt, e, 'f');
        }
        get id() {
          return Bt(this, Tt, 'f').id;
        }
        get type() {
          return Ut.OUTPUT;
        }
        get property() {
          return Bt(this, Tt, 'f').property;
        }
        get() {
          const t = Bt(this, Tt, 'f').component.outputs;
          if (t && Bt(this, Tt, 'f').property in t) return t[Bt(this, Tt, 'f').property];
          const e = `'get' called on path that does not exist "${Bt(this, Tt, 'f').property}"`;
          throw (Ft.warn(e), e);
        }
        bind(t) {
          Bt(this, Rt, 'f').bindPath(t, this);
        }
      }
      (Rt = new WeakMap()), (Tt = new WeakMap());
      class $t {
        constructor(t, e) {
          Nt.set(this, void 0), zt.set(this, void 0), Pt(this, Nt, t, 'f'), Pt(this, zt, e, 'f');
        }
        get id() {
          return Bt(this, zt, 'f').id;
        }
        get type() {
          return Bt(this, zt, 'f').type;
        }
        get property() {
          return Bt(this, zt, 'f').property;
        }
        get() {
          const t = Bt(this, zt, 'f').component.inputs;
          if (t && Bt(this, zt, 'f').property in t) return t[Bt(this, zt, 'f').property];
          const e = `'get' called on component without input "${Bt(this, zt, 'f').property}`;
          throw (Ft.warn(e), e);
        }
        set(t) {
          const e = Bt(this, zt, 'f').component.inputs;
          e && Bt(this, zt, 'f').property in e
            ? (e[Bt(this, zt, 'f').property] = t)
            : Ft.warn(`'set' called on component without input "${Bt(this, zt, 'f').property}"`);
        }
        bind(t) {
          Bt(this, Nt, 'f').bindPath(this, t);
        }
      }
      (Nt = new WeakMap()), (zt = new WeakMap());
      class Vt {
        constructor(t, e, i) {
          It.set(this, void 0),
            Ct.set(this, void 0),
            St.set(this, void 0),
            Pt(this, It, t, 'f'),
            Pt(this, Ct, e, 'f'),
            Pt(this, St, i, 'f');
        }
        get id() {
          return Bt(this, St, 'f').id;
        }
        get type() {
          return Bt(this, St, 'f').type;
        }
        get eventName() {
          return Bt(this, St, 'f').property;
        }
        bind(t) {
          Bt(this, It, 'f').bindPath(this, t);
        }
        enable() {
          Bt(this, St, 'f').component.events[Bt(this, St, 'f').property] = !0;
        }
        disable() {
          Bt(this, St, 'f').component.events[Bt(this, St, 'f').property] = !1;
        }
        emit(t) {
          if (!Bt(this, St, 'f').component.events[Bt(this, St, 'f').property]) return;
          const e = Bt(this, Ct, 'f').get(Bt(this, St, 'f').node.id),
            i = null == e ? void 0 : e.getComponentByInstance(Bt(this, St, 'f').component);
          null == i || i.onEvent({ type: Bt(this, St, 'f').property, data: t });
        }
      }
      (It = new WeakMap()), (Ct = new WeakMap()), (St = new WeakMap());
      class Gt {
        constructor(t, e) {
          Dt.set(this, void 0), Lt.set(this, void 0), Pt(this, Dt, t, 'f'), Pt(this, Lt, e, 'f');
        }
        get id() {
          return Bt(this, Lt, 'f').id;
        }
        get type() {
          return Bt(this, Lt, 'f').type;
        }
        get emitName() {
          return Bt(this, Lt, 'f').property;
        }
        bind(t) {
          Bt(this, Dt, 'f').bindPath(t, this);
        }
        enable() {
          Bt(this, Lt, 'f').component.emits &&
            (Bt(this, Lt, 'f').component.emits[Bt(this, Lt, 'f').property] = !0);
        }
        disable() {
          Bt(this, Lt, 'f').component.emits &&
            (Bt(this, Lt, 'f').component.emits[Bt(this, Lt, 'f').property] = !1);
        }
        emit(t) {
          Bt(this, Lt, 'f').component.notify(this.emitName, t);
        }
      }
      function Yt(t) {
        return t.type === Ut.OUTPUT;
      }
      function qt(t) {
        return t.type === Ut.INPUT;
      }
      function Xt(t) {
        return t.type === Ut.EVENT;
      }
      function Qt(t) {
        return t.type === Ut.EMIT;
      }
      (Dt = new WeakMap()), (Lt = new WeakMap());
      var Jt,
        te = i(73908);
      function ee(t, e, i) {
        const { position: n, rotation: s, scale: r } = e,
          a = t.createNode(i).publicFacade();
        if (((a.name = e.name || 'Unnamed Node'), n)) {
          if (!(0, te.u)(n)) throw Error(`Invalid position ${JSON.stringify(n)}`);
          a.position.set(n.x, n.y, n.z);
        }
        if (s) {
          if (!(0, te.u)(s)) throw Error(`Invalid rotation ${JSON.stringify(s)}`);
          a.quaternion.setFromEuler(
            new _.Euler((s.x * Math.PI) / 180, (s.y * Math.PI) / 180, (s.z * Math.PI) / 180, 'YXZ'),
          );
        }
        if (r) {
          if (!(0, te.u)(r)) throw Error(`Invalid scale ${JSON.stringify(r)}`);
          a.scale.set(r.x, r.y, r.z);
        }
        for (const t of e.components) ie(a, t);
        return a;
      }
      function ie(t, e, i) {
        const n = t.addComponent(e.type, e.inputs, e.id);
        if (n) {
          for (const t in e.events) n.events[t] = e.events[t];
          if (n.emits) for (const t in e.emits) n.emits[t] = e.emits[t];
        }
        return n;
      }
      class ne extends Error {
        constructor(t) {
          super(t);
        }
      }
      function se(t) {
        const e = { objects: [], bindings: [], paths: [] };
        for (const i of t.nodeIterator()) {
          const t = re(i);
          e.objects.push(t);
        }
        for (const [i, n] of t.bindings()) {
          const t = [i.id, n.id];
          e.bindings.push(t);
        }
        for (const i of t.pathIterator()) {
          const t = Mt(i.desc.node, i.desc.component, i.desc.type, i.desc.property);
          e.paths.push([i.desc.id, t]);
        }
        return e;
      }
      function re(t) {
        const e = new _.Euler();
        e.setFromQuaternion(t.quaternion, 'YXZ');
        const i = 180 / Math.PI;
        return {
          id: t.id,
          name: t.name,
          position: { x: t.position.x, y: t.position.y, z: t.position.z },
          rotation: { x: e.x * i, y: e.y * i, z: e.z * i },
          scale: { x: t.scale.x, y: t.scale.y, z: t.scale.z },
          components: ae(t),
        };
      }
      function ae(t) {
        const e = [];
        for (const i of t.componentIterator()) {
          const t = {
            id: i.id,
            type: i.componentType,
            inputs: Object.assign({}, i.inputs),
            emits: {},
            events: {},
          };
          for (const e in i.emits) t.emits[e] = !!i.emits[e];
          for (const e in i.events) t.events[e] = !!i.events[e];
          e.push(t);
        }
        return e;
      }
      !(function (t) {
        (t.V_1_0 = '1.0'), (t.V_2_0 = '2.0'), (t.V_2_1 = '2.1');
      })(Jt || (Jt = {}));
      const oe = (t, e, i, n) => {
          const s = t.createObject(i, { owner: n }),
            r = s.publicFacade(),
            a = [];
          for (const t of e.objects) {
            const e = he(
              {
                createNode: function () {
                  return s.addNode(t.id) || {};
                },
              },
              t,
              i,
            );
            a.push(e);
          }
          if (
            (e.bindings &&
              (function (t, e, i) {
                for (const i of e)
                  if (2 === i.length) {
                    const [e, n] = i,
                      s = Ht(e, t),
                      r = Ht(n, t);
                    if (null === s.component || null === s.property)
                      throw Error(`Could not resolve target for path '${e}'`);
                    if (null === r.component || null === r.property)
                      throw Error(`Could not resolve source for path '${n}'`);
                    s.component.bind(s.property, r.component, r.property);
                  }
              })(r, e.bindings),
            e.events &&
              (function (t, e, i) {
                for (const i of e)
                  if (2 === i.length) {
                    const [e, n] = i,
                      s = Ht(e, t),
                      r = Ht(n, t);
                    if (null === s.component || null === s.property)
                      throw Error(`Could not resolve target for path '${e}'`);
                    if (null === r.component || null === r.property)
                      throw Error(`Could not resolve source for path '${n}'`);
                    s.component.bindEvent(s.property, r.component, r.property);
                  }
              })(r, e.events),
            e.paths)
          )
            for (const t of e.paths) {
              const e = Ht(t[1], r);
              if (!(e.node && e.component && e.property && Wt(e.property, e.component)))
                throw Error(`Unable to parse path "${t[1]}"`);
              {
                const i = Wt(e.property, e.component);
                if (i) {
                  ({
                    [Ut.INPUT]: (t, e, i) => r.addInputPath(t, e, i),
                    [Ut.OUTPUT]: (t, e, i) => r.addOutputPath(t, e, i),
                    [Ut.EVENT]: (t, e, i) => r.addEventPath(t, e, i),
                    [Ut.EMIT]: (t, e, i) => r.addEmitPath(t, e, i),
                  })[i](e.component, e.property, t[0]);
                }
              }
            }
          return s;
        },
        he = (t, e, i) => {
          const n = e.position,
            s = e.scale,
            r = e.rotation,
            a = t.createNode(i),
            o = e.name || 'Unnamed Node',
            h = a.publicFacade();
          if (((h.name = o), n)) {
            if (!(0, Ot.hj)(n.x) || !(0, Ot.hj)(n.y) || !(0, Ot.hj)(n.z))
              throw new Error(`Invalid position ${JSON.stringify(n)}`);
            h.position.set(n.x, n.y, n.z);
          } else h.position.set(0, 0, 0);
          if (r) {
            if (!(0, Ot.hj)(r.x) || !(0, Ot.hj)(r.y) || !(0, Ot.hj)(r.z))
              throw new Error(`Invalid rotation ${JSON.stringify(r)}`);
            h.quaternion.setFromEuler(
              new _.Euler(
                (r.x * Math.PI) / 180,
                (r.y * Math.PI) / 180,
                (r.z * Math.PI) / 180,
                'YXZ',
              ),
            );
          } else h.quaternion.set(0, 0, 0, 1);
          if (s) {
            if (!(0, Ot.hj)(s.x) || !(0, Ot.hj)(s.y) || !(0, Ot.hj)(s.z))
              throw new Error(`Invalid scale ${JSON.stringify(s)}`);
            h.scale.set(s.x, s.y, s.z);
          } else h.scale.set(1, 1, 1);
          const l = [];
          if (e.components)
            for (const t of e.components) {
              const e = le(h, t, i);
              e && l.push(e);
            }
          return (
            e.bindings &&
              (function (t, e, i) {
                for (const n of e)
                  if (4 === n.length) {
                    const [t, e, s, r] = n,
                      a = i[t],
                      o = i[s];
                    if (!a) throw Error('could not find target Component index=' + t);
                    if (!o) throw Error('could not find source Component index=' + s);
                    a.bind(e, o, r);
                  } else if (2 === n.length) {
                    const [e, i] = n,
                      s = Zt(e, t),
                      r = Zt(i, t);
                    if (null === s.component || null === s.property)
                      throw Error(`Could not resolve target for path '${e}'`);
                    if (null === r.component || null === r.property)
                      throw Error(`Could not resolve source for path '${i}'`);
                    s.component.bind(s.property, r.component, r.property);
                  }
              })(h, e.bindings, l),
            e.events &&
              (function (t, e, i) {
                for (const n of e)
                  if (4 === n.length) {
                    const [t, e, s, r] = n,
                      a = i[t],
                      o = i[s];
                    if (!a) throw Error('could not find target Component index=' + t);
                    if (!o) throw Error('could not find source Component index=' + s);
                    if (!(e in a.events))
                      throw Error(
                        'Component index=' + t + ' does not have "' + e + '" as a handled event',
                      );
                    a.bindEvent(e, o, r);
                  } else if (2 === n.length) {
                    const [e, i] = n,
                      s = Zt(e, t),
                      r = Zt(i, t);
                    if (null === s.component || null === s.property)
                      throw Error(`Could not resolve target for event path '${e}'`);
                    if (null === r.component || null === r.property)
                      throw Error(`Could not resolve source for event path '${i}'`);
                    s.component.bindEvent(s.property, r.component, r.property);
                  }
              })(h, e.events, l),
            h
          );
        },
        le = function (t, e, i) {
          const n = t.addComponent(e.type, e.inputs, e.id);
          if (n) for (const t in e.events) n.events[t] = e.events[t];
          return n;
        };
      const de = (t, e, i, n) => {
        const s = JSON.parse(e),
          r = s.version;
        let a;
        switch (r) {
          case Jt.V_1_0:
            a = ((t, e, i, n) => {
              const s = t.createObject(i, { owner: n }),
                r = [];
              for (const t of e.objects) {
                const e = he(
                  {
                    createNode: function () {
                      return s.addNode(t.id) || {};
                    },
                  },
                  t,
                  i,
                );
                r.push(e);
              }
              return s;
            })(t, s.payload, i, n);
            break;
          case Jt.V_2_0:
            a = oe(t, s.payload, i, n);
            break;
          case Jt.V_2_1:
            a = (function (t, e, i, n) {
              const s = t.createObject(i, { owner: n }),
                r = s.publicFacade(),
                a = [];
              for (const t of e.objects) {
                const e = { createNode: () => s.addNode(t.id) || {} };
                a.push(ee(e, t, i));
              }
              const o = new Map(),
                h = new Map(),
                l = new Map(),
                d = new Map();
              for (const [t, i] of e.paths) {
                const e = Ht(i, r),
                  { node: n, component: a, type: c, property: u } = e;
                if (n && a && c && u)
                  switch (c) {
                    case Ut.OUTPUT:
                      o.set(t, s.addOutputPath(a, u, t));
                      break;
                    case Ut.INPUT:
                      h.set(t, s.addInputPath(a, u, t));
                      break;
                    case Ut.EVENT:
                      l.set(t, s.addEventPath(a, u, t));
                      break;
                    case Ut.EMIT:
                      d.set(t, s.addEmitPath(a, u, t));
                      break;
                    default:
                      throw Error(`unable to parse path "${i}"`);
                  }
              }
              for (const [t, i] of e.bindings) {
                const e = h.get(t) || l.get(t);
                if (!e) throw Error(`"${t}" not found in input or event paths`);
                const n = o.get(i) || d.get(i);
                if (!n) throw Error(`"${t}" not found in output or emit paths`);
                s.bindPath(e, n);
              }
              return s;
            })(t, s.payload, i, n);
            break;
          default:
            throw Error(`Unsupported scene version ${r}`);
        }
        return { version: r, scene: a };
      };
      function ce(t, e) {
        const i = Array.isArray(t)
          ? (function (t, e) {
              const i = new Set(),
                n = new Set();
              for (const s of t) {
                if (i.has(s.id))
                  throw new ne(`Node IDs must be unique; found two nodes with ID: ${s.id}`);
                i.add(s.id);
                const t = e.get(s);
                if (t)
                  for (const { path: e } of t.pathIterator())
                    if (n.has(e.id))
                      throw new ne(`Path IDs must be unique; found two paths with ID: ${e.id}`);
              }
              const s = { objects: [], bindings: [], paths: [] };
              for (let i = 0; i < t.length; ++i) {
                const n = e.get(t[i]);
                if (!n) throw new ne(`Unable to serialize node at index: ${i}`);
                const r = se(n.publicFacade());
                s.objects.push(...r.objects),
                  s.bindings.push(...r.bindings),
                  s.paths.push(...r.paths);
              }
              return s;
            })(t, e)
          : se(t);
        return JSON.stringify({ version: Jt.V_2_1, payload: i });
      }
      class ue {
        constructor() {
          (this.target = null), (this.targetProp = null), (this.src = null), (this.srcProp = null);
        }
        bind(t, e, i, n) {
          (this.target = t),
            (this.targetProp = e),
            (this.src = i),
            (this.srcProp = n),
            (this.initialTargetValue = this.target[this.targetProp]),
            (this.target[this.targetProp] = this.src[this.srcProp]),
            (this.subscription = this.src.onPropertyChanged(this.srcProp, (t) => {
              this.target && this.targetProp && (this.target[this.targetProp] = t);
            }));
        }
        unbind() {
          this.target &&
            this.targetProp &&
            ((this.target[this.targetProp] = this.initialTargetValue),
            (this.target = null),
            (this.targetProp = null)),
            this.src &&
              this.srcProp &&
              (this.subscription && this.subscription.cancel(),
              (this.src = null),
              (this.srcProp = null));
        }
      }
      class fe {
        constructor(t) {
          (this.target = t), (this.bindings = {});
        }
        bind(t, e, i) {
          if (this.bindings[t]) throw Error(`Property ${t} already bound.`);
          const n = new ue();
          n.bind(this.target, t, e, i), (this.bindings[t] = n);
        }
        unbind(t) {
          const e = this.bindings[t];
          e && (e.unbind(), delete this.bindings[t]);
        }
      }
      var pe = i(1945),
        _e = i(42714);
      const ge = new o.Z('SceneObject');
      var we;
      !(function (t) {
        (t[(t.Idle = 0)] = 'Idle'),
          (t[(t.Operating = 1)] = 'Operating'),
          (t[(t.Stopped = 2)] = 'Stopped');
      })(we || (we = {}));
      class be {
        constructor(t, e, i, n) {
          (this.nodeFactory = t),
            (this.eventBus = e),
            (this.scope = i),
            (this.state = we.Idle),
            (this.nodes = []),
            (this.nodeLookup = new Map()),
            (this.componentNodeMap = new Map()),
            (this.paths = new Set()),
            (this.pathLookup = new Map()),
            (this.pathDescLookup = new Map()),
            (this.bindingMap = new Map()),
            (this.dictionaryBinders = new Map()),
            (this.idTracker = new d()),
            (this.pathIdTracker = new d()),
            (this.rootScene = new _.Scene()),
            (this.startObserver = new _e.$()),
            (this.stopObserver = new _e.$()),
            n.getScene().addChild(pe.a.Root, this.rootScene);
          const s = this;
          this.facade = new (class {
            get state() {
              return s.state;
            }
            nodeIterator() {
              return s.nodeIterator();
            }
            bindings() {
              return s.bindings();
            }
            pathIterator() {
              return s.pathIterator();
            }
            findNodeById(t) {
              return s.findNodeById(t);
            }
            addNode(t) {
              const e = s.addNode(t);
              return (null == e ? void 0 : e.publicFacade()) || null;
            }
            addNodes(t) {
              return s.addNodes(t).map((t) => t.publicFacade());
            }
            addPath(t) {
              return s.addPath(t);
            }
            addOutputPath(t, e, i) {
              return s.addOutputPath(t, e, i);
            }
            addInputPath(t, e, i) {
              return s.addInputPath(t, e, i);
            }
            addEmitPath(t, e, i) {
              return s.addEmitPath(t, e, i);
            }
            addEventPath(t, e, i) {
              return s.addEventPath(t, e, i);
            }
            bind(t, e, i, n) {
              return s.bind(t, e, i, n);
            }
            bindPath(t, e) {
              return s.bindPath(t, e);
            }
            setValueAtPath(t, e) {
              return s.setValueAtPath(t, e);
            }
            getValueAtPath(t) {
              return s.getValueAtPath(t);
            }
            spyOnEvent(t) {
              return s.spyOnEvent(t);
            }
            start() {
              return s.start();
            }
            stop() {
              return s.stop();
            }
          })();
        }
        publicFacade() {
          return this.facade;
        }
        addNodes(t = 1) {
          if (this.state !== we.Idle)
            return ge.warn('Cannot add nodes after the scene object has started'), [];
          if (t <= 0) return ge.warn('Cannot add zero or fewer nodes'), [];
          const e = [];
          for (let i = 0; i < t; i++) {
            const t = this.addNode();
            t && e.push(t);
          }
          return e;
        }
        pushNode(t) {
          if (this.state !== we.Idle)
            return void ge.warn('Cannot add node after the scene object has started');
          const e = t.publicFacade();
          this.nodes.push(e), this.nodeLookup.set(t.id, t);
        }
        addNode(t) {
          if (this.state !== we.Idle)
            return ge.warn('Cannot add node after the scene object has started'), null;
          if (t) {
            if (!this.idTracker.isAvailable(t))
              throw Error('Component with duplicate id detected.');
            if (-1 !== t.indexOf('/')) throw Error('Node ids cannot have "/" character.');
            this.idTracker.reserve(t);
          }
          const e = t || this.idTracker.nextId(),
            i = this.nodeFactory.createNode(this.scope, { id: e, sceneObject: this }),
            n = i.publicFacade();
          return this.nodes.push(n), this.nodeLookup.set(i.id, i), i;
        }
        attachRenderableNode(t) {
          this.rootScene.add(t);
        }
        onComponentAdded(t, e) {
          this.componentNodeMap.set(e, t);
        }
        *nodeIterator() {
          for (const t of this.nodes) yield t;
        }
        *bindings() {
          for (const t of this.bindingMap) yield t;
        }
        *pathIterator() {
          for (const [, t] of this.pathDescLookup) {
            const e = this.pathLookup.get(t.id);
            void 0 !== e && (yield { desc: t, path: e });
          }
        }
        start() {
          if (this.state === we.Idle) {
            for (const t of this.nodes) t.start();
            (this.state = we.Operating), this.startObserver.notify();
          } else ge.warn('A scene object cannot be restarted.');
        }
        onStart(t) {
          return this.startObserver.observe(t);
        }
        stop() {
          if (this.state === we.Operating) {
            for (const t of this.nodes) t.stop();
            (this.state = we.Stopped), this.stopObserver.notify();
          }
        }
        onStop(t) {
          return this.stopObserver.observe(t);
        }
        setVisible(t) {
          this.rootScene.visible = t;
        }
        bindPath(t, e) {
          if (this.state !== we.Idle)
            throw Error('bind cannot be called after starting the scene node.');
          if (!this.paths.has(t) || !this.paths.has(e))
            throw Error('cannot bind paths across multiple objects');
          const i = this.pathDescLookup.get(t.id),
            n = this.pathDescLookup.get(e.id),
            s = i && this.nodeLookup.get(i.node.id),
            r = n && this.nodeLookup.get(n.node.id);
          if (!s)
            throw Error(
              '`inputPath/eventPath` references a node that does not exist in this Object',
            );
          if (!r)
            throw Error(
              '`outputPath/emitPath` references a node that does not exist in this Object',
            );
          const a = i.component,
            o = n.component,
            h = s.getComponentByInstance(a),
            l = r.getComponentByInstance(o);
          if (!h)
            throw Error(
              '`inputPath/eventPath` references a component that does not exist under this Object',
            );
          if (!l)
            throw Error(
              '`outputPath/emitPath` references a component that does not exist under this Object',
            );
          if (qt(i) && Yt(n)) this.bindInput(i, n);
          else {
            if (!Xt(i) || !Qt(n))
              throw Error(
                'Couldn\'t bind. Only an "output" can be bound to an "input", or an "emit" to an "event"',
              );
            this.bindEvent(i, n, h);
          }
        }
        bind(t, e, i, n) {
          if (this.state !== we.Idle)
            throw Error('bind cannot be called after starting the scene node.');
          if (!t || !i) throw Error('Some bind parameters were undefined.');
          const s = this.addInputPath(t, e, 'input-' + this.pathIdTracker.nextId()),
            r = this.addOutputPath(i, n, 'output-' + this.pathIdTracker.nextId());
          this.bindPath(s, r);
        }
        findNodeById(t) {
          return this.nodes.find((e) => e.id === t) || null;
        }
        addPath(t) {
          if (!this.pathIdTracker.isAvailable(t.id)) throw Error('Duplicate id detected.');
          if (-1 !== t.id.indexOf('/')) throw Error('Path ids cannot have "/" character.');
          let e;
          if (Yt(t)) {
            if (!(t.property in t.component.outputs))
              throw Error(t.property + ' is not an "output" of the component');
            e = new Kt(this, t);
          } else if (qt(t)) {
            if (!t.component.inputs || !(t.property in t.component.inputs))
              throw Error(t.property + ' is not an "input" of the component');
            e = new $t(this, t);
          } else if (Xt(t)) {
            if (!(t.property in t.component.events))
              throw Error(t.property + ' is not an "event" of the component');
            e = new Vt(this, this.nodeLookup, t);
          } else {
            if (!Qt(t)) throw Error("Couldn't determine path type");
            if (!t.component.emits || !(t.property in t.component.emits))
              throw Error(t.property + ' is not an "emit" of the component');
            e = new Gt(this, t);
          }
          return (
            this.pathIdTracker.reserve(t.id),
            this.pathDescLookup.set(t.id, Object.assign({}, t)),
            this.paths.add(e),
            this.pathLookup.set(e.id, e),
            e
          );
        }
        addInputPath(t, e, i) {
          const n = this.componentNodeMap.get(t);
          if (!n) throw Error(`Couldn't find a path to ${e}`);
          const s = void 0 !== i ? i : this.pathIdTracker.peekId();
          return this.addPath({ id: s, type: Ut.INPUT, node: n, component: t, property: e });
        }
        addOutputPath(t, e, i) {
          const n = this.componentNodeMap.get(t);
          if (!n) throw Error(`Couldn't find a path to ${e}`);
          const s = void 0 !== i ? i : this.pathIdTracker.peekId();
          return this.addPath({ id: s, type: Ut.OUTPUT, node: n, component: t, property: e });
        }
        addEmitPath(t, e, i) {
          const n = this.componentNodeMap.get(t);
          if (!n) throw Error(`Couldn't find a path to ${e}`);
          const s = void 0 !== i ? i : this.pathIdTracker.peekId();
          return this.addPath({ id: s, type: Ut.EMIT, node: n, component: t, property: e });
        }
        addEventPath(t, e, i) {
          const n = this.componentNodeMap.get(t);
          if (!n) throw Error(`Couldn't find a path to ${e}`);
          const s = void 0 !== i ? i : this.pathIdTracker.peekId();
          return this.addPath({ id: s, type: Ut.EVENT, node: n, component: t, property: e });
        }
        spyOnEvent(t) {
          var e;
          const { path: i } = t,
            n = this.pathDescLookup.get(i.id);
          if (!n) throw Error("'spy.path' is not a valid path to spy on");
          const { node: s, component: r, type: a, property: o } = n,
            h =
              null === (e = this.nodeLookup.get(s.id)) || void 0 === e
                ? void 0
                : e.getComponentByInstance(r);
          if (!h) throw Error(`spy.path: ${Mt(s, r, a, o)}, is not a valid path to spy on`);
          if (qt(n)) return r.inputs.onPropertyChanged(o, (e) => t.onEvent(e));
          if (Yt(n)) return r.outputs.onPropertyChanged(o, (e) => t.onEvent(e));
          if (Xt(n)) return h.spyOnEvent(this.createSceneObjectEventSpy(t));
          if (Qt(n)) return this.eventBus.observe(this.createSceneObjectEventSpy(t));
          throw Error(`spy.path: ${Mt(s, r, a, o)}, is not a valid path to spy on`);
        }
        setValueAtPath(t, e) {
          ge.warn(
            '`SceneObject.setValueAtPath` has been deprecated. Use `InputPath.set() instead.',
          );
          const i = t.component.inputs;
          i && t.property && t.property in i
            ? (i[t.property] = e)
            : ge.warn(`setValueAtPath called on component without input "${t.property}"`);
        }
        getValueAtPath(t) {
          ge.warn(
            '`SceneObject.setValueAtPath` has been deprecated. Use `OutputPath.get() instead.',
          );
          const e = t.component.outputs;
          if (e && t.property && e[t.property]) return e[t.property];
          ge.warn(`getValueAtPath called on path that does not exist "${t.property}"`);
        }
        bindInput(t, e) {
          const i = this.dictionaryBinders.get(t.component) || new fe(t.component.inputs || {});
          this.dictionaryBinders.set(t.component, i),
            i.bind(t.property, e.component.outputs, e.property),
            this.bindingMap.set(t, e);
        }
        bindEvent(t, e, i) {
          const n = t.component,
            s = t.property,
            r = e.component,
            a = e.property;
          this.bindingMap.set(t, e),
            this.eventBus.observe({
              src: r,
              srcEventType: a,
              targetEventType: s,
              onEvent(t, e) {
                n.events[t] && n.onEvent && i.onEvent({ type: t, data: e });
              },
            });
        }
        createSceneObjectEventSpy(t) {
          const e = this.pathDescLookup.get(t.path.id);
          if (!e) throw Error();
          return new (class {
            constructor(t) {
              (this.src = t.component),
                (this.srcEventType = t.property),
                (this.targetEventType = t.property);
            }
            onEvent(e, i) {
              t.onEvent(i);
            }
          })(e);
        }
      }
      var me = i(63592),
        ye = i(46390),
        ve = i(10880);
      class ke {
        constructor(t, e) {
          (this.engine = t),
            (this.sceneModule = e),
            (this.queuedComponents = new Set()),
            (this.started = !1);
        }
        start() {
          (this.started = !0), this.addQueuedComponents();
        }
        addComponent(t) {
          this.started ? this.addToEngine(t) : this.queuedComponents.add(t);
        }
        removeComponent(t) {
          this.engine.removeComponent(this.sceneModule, t), this.queuedComponents.delete(t);
        }
        addQueuedComponents() {
          for (const t of this.queuedComponents) this.addToEngine(t);
        }
        addToEngine(t) {
          this.engine.addComponent(this.sceneModule, t);
        }
      }
      class Ee extends s.Y {
        constructor() {
          super(...arguments),
            (this.name = 'scene'),
            (this.sceneVisibilityByOwner = new Map()),
            (this.scenes = new ye.V()),
            (this.componentFactory = new u()),
            (this.eventBus = new p()),
            (this.nodeObjectMap = new Map()),
            (this.globalIdTracker = new d());
        }
        async init(t, e) {
          let i, n, s, a, o;
          (this.componentLoader = new ke(e, this)),
            e.commandBinder.addBinding(ve.Y, async ({ owner: t, isVisible: e }) =>
              this.toggleScenesByOwner(t, e),
            ),
            ([i, s, o, this.renderer, this.raycasterModule, this.inputIni, n, a] =
              await Promise.all([
                e.getModuleBySymbol(r.V6),
                e.getModuleBySymbol(r.iM),
                e.getModuleBySymbol(r.kg),
                e.getModuleBySymbol(r.Aj),
                e.getModuleBySymbol(r.fQ),
                e.getModuleBySymbol(r.PZ),
                e.market.waitForData(V.I),
                e.getModuleBySymbol(r.wR),
              ])),
            (this.analytics = new G(i, n)),
            (this.tags = new Z()),
            (0, M.O)(it(this.renderer.threeRenderer), ht(this.renderer.threeRenderer)),
            this.registerFactory({ name: T.factoryName, scope: h }, () => ct(T)),
            this.registerFactory({ name: z.factoryName, scope: h }, () => ct(z)),
            this.registerFactory({ name: C.factoryName, scope: h }, () => ct(C)),
            this.registerFactory({ name: D.factoryName, scope: h }, () => ct(D)),
            this.registerFactory({ name: j.factoryName, scope: h }, j.factory),
            this.registerFactory({ name: 'mp.transformControls', scope: h }, B(s.element)),
            this.registerFactory({ name: H.factoryName, scope: h }, H.factory),
            this.registerFactory({ name: W.factoryName, scope: h }, W.factory),
            this.registerFactory({ name: K.factoryName, scope: h }, K.factory),
            this.registerFactory({ name: $.factoryName, scope: h }, $.factory),
            this.registerFactory({ name: 'mp.camera', scope: h }, gt(o.cameraPoseProxy)),
            this.registerFactory({ name: 'mp.input', scope: h }, xt(this.inputIni, a)),
            this.registerFactory({ name: 'mp.xr', scope: h }, At(this.renderer.threeRenderer));
          const l = (t) => {
            this.tags.clearAllTags(), this.tags.tagObject(t.root, [F.Model]);
            for (const e of t.floors) {
              this.tags.tagObject(e, [F.Floor]);
              for (const e of t.rooms) this.tags.tagObject(e, [F.Room]);
            }
            this.tags.tagObject(this.renderer.getScene().scene, [F.Scene]);
          };
          e.market.waitForData(me.s).then((t) => {
            l(t), t.onChanged(l);
          }),
            (this.contextPropertyAccessor = new Y(this.analytics)),
            (this.componentStartAnalytics = new q(this.analytics));
        }
        dispose(t) {
          super.dispose(t), this.tags.clearAllTags();
        }
        registerFactory(t, e) {
          return this.componentFactory.registerFactory(t, e);
        }
        unregisterFactory(t, e) {
          this.componentFactory.unregisterFactory(t, e);
        }
        createNode(t, e) {
          var i, n;
          const s =
              null !== (i = null == e ? void 0 : e.sceneObject) && void 0 !== i
                ? i
                : this.createObject(
                    t,
                    (null == e ? void 0 : e.owner)
                      ? { owner: null == e ? void 0 : e.owner }
                      : void 0,
                  ),
            r =
              null !== (n = null == e ? void 0 : e.id) && void 0 !== n
                ? n
                : this.globalIdTracker.nextId(),
            a = new A(
              this.componentLoader,
              this.renderer,
              this.raycasterModule.targets,
              this.componentStartAnalytics,
              this.componentFactory,
              s,
              this.eventBus,
              this.inputIni,
              this.contextPropertyAccessor,
              this,
              r,
            );
          (null == e ? void 0 : e.sceneObject) || s.pushNode(a);
          const o = a.publicFacade();
          return this.nodeObjectMap.set(o, s), a;
        }
        createObject(t, e) {
          const i = this.sceneVisibilityByOwner.get(null == e ? void 0 : e.owner) || !0,
            n = new be(this, this.eventBus, t, this.renderer);
          return (
            n.setVisible(i),
            this.scenes.add(null == e ? void 0 : e.owner, n),
            n.onStop({ notify: () => this.scenes.remove(null == e ? void 0 : e.owner, n) }),
            n
          );
        }
        toggleScenesByOwner(t, e) {
          this.sceneVisibilityByOwner.set(t, e);
          for (const i of this.scenes.getValuesAtKey(t)) i.setVisible(e);
        }
        startLoading() {
          this.componentLoader.start();
        }
        sceneTags() {
          return this.tags;
        }
        serialize(t) {
          return ce(t, this.nodeObjectMap);
        }
        serializeNodeList(t) {
          return ce(t, this.nodeObjectMap);
        }
        deserialize(t, e, i) {
          const n = this.sceneVisibilityByOwner.get(i) || !0,
            { version: s, scene: r } = de(this, e, t, i);
          return r.setVisible(n), { version: s, object: r.publicFacade() };
        }
        get supportedSerializerVersions() {
          return Jt;
        }
      }
    },
  },
]);
