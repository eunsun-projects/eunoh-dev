/*! For license information please see 833.js.LICENSE.txt */
(self.webpackChunkmp_webgl = self.webpackChunkmp_webgl || []).push([
  [833],
  {
    40232: (e, t, i) => {
      'use strict';
      var s;
      function n(e) {
        const t = new Date();
        t.setHours(0, 0, 0, 0), e.setHours(0, 0, 0, 0);
        const i = (t.getTime() - e.getTime()) / 864e5;
        if (0 === i) return s.TODAY;
        if (1 === i) return s.YESTERDAY;
        if (i < 7) return s.THIS_WEEK;
        const n = Math.floor(i / 7);
        return 1 === n
          ? s.ONE_WEEK_AGO
          : 2 === n
            ? s.TWO_WEEKS_AGO
            : 3 === n
              ? s.THREE_WEEKS_AGO
              : s.OLDER;
      }
      i.d(t, { Z: () => s, f: () => n }),
        (function (e) {
          (e.TODAY = 'TODAY'),
            (e.YESTERDAY = 'YESTERDAY'),
            (e.THIS_WEEK = 'THIS_WEEK'),
            (e.ONE_WEEK_AGO = 'ONE_WEEK_AGO'),
            (e.TWO_WEEKS_AGO = 'TWO_WEEKS_AGO'),
            (e.THREE_WEEKS_AGO = 'THREE_WEEKS_AGO'),
            (e.OLDER = 'OLDER');
        })(s || (s = {}));
    },
    59739: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => o });
      var s = i(933),
        n = i(4763),
        a = i(41492);
      class o extends s.Y {
        constructor() {
          super(...arguments), (this.name = 'automation-support');
        }
        async init(e, t) {
          const i = window;
          if (i.MP_AUTOMATION) this.addAutomationHooks(t, i.MP_AUTOMATION);
          else {
            const e = performance.now(),
              s = setInterval(() => {
                i.MP_AUTOMATION
                  ? (this.addAutomationHooks(t, i.MP_AUTOMATION), clearInterval(s))
                  : performance.now() - e > 5e3 && clearInterval(s);
              }, 100);
          }
        }
        async addAutomationHooks(e, t) {
          const i = await e.getModuleBySymbol(n.Aj);
          (t.estimatedGPUMemoryAllocated = () => i.estimatedGPUMemoryAllocated()),
            (t.maxLOD = () => a.t.maxLOD);
        }
      }
    },
    95142: (e, t, i) => {
      'use strict';
      i.d(t, { Y: () => a });
      var s = i(63926),
        n = i(42141);
      class a extends n.V {
        constructor() {
          super(), (this.name = 'cursor'), (this.opacity = new s.z(0)), (this.texture = null);
        }
      }
    },
    70102: (e, t, i) => {
      'use strict';
      var s;
      i.d(t, { L: () => s }),
        (function (e) {
          (e[(e.Reticle = 0)] = 'Reticle'), (e[(e.GridPlane = 1)] = 'GridPlane');
        })(s || (s = {}));
    },
    37511: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => v });
      var s = i(933),
        n = i(4763),
        a = i(57793),
        o = i(24938),
        r = i(90512),
        h = i(43017),
        d = i(23355),
        l = i(6394),
        c = i(38256),
        u = i(32197),
        p = i(16385);
      function m(e) {
        const t = (0, p.J5)(u.ep.toVisionQuaternion(e.rotation));
        return {
          position: (0, p.m)(u.ep.toVisionVector(e.position)),
          rotation: t,
          aspect: e.aspect(),
          isOrtho: e.isOrtho(),
          fovX: e.fovX(),
          fovY: e.fovY(),
        };
      }
      function g(e) {
        return (0, c.U)(new Date(e));
      }
      class v extends s.Y {
        constructor() {
          super(...arguments),
            (this.name = 'dwell-analytics'),
            (this.pendingDwellEvents = []),
            (this.onCameraChange = (0, d.P)((e) => {
              this.checkForDwellEvent(),
                e.clone(this.currentEvent.pose),
                (this.currentEvent.startTimeMs = Date.now()),
                this.scheduleDwellTimeOutEvent();
            }, 1e3)),
            (this.checkForDwellEvent = (e = !1) => {
              const { startTimeMs: t, viewmode: i } = this.currentEvent;
              if (!t || this.appData.phase !== o.nh.PLAYING) return;
              const s = Date.now(),
                n = s - t,
                a = {
                  pose: m(this.currentEvent.pose),
                  durationMs: n,
                  startTime: g(t),
                  endTime: g(s),
                  timedOut: e,
                  viewmode: i,
                };
              this.trackDwellEvent(a);
            }),
            (this.onViewmodeUpdate = (e) => {
              e.value !== h.Ey.Transition && (this.currentEvent.viewmode = (0, h.Ae)(e.value));
            }),
            (this.trackDwellEvent = (e) => {
              this.pendingDwellEvents.push(e), this.trackPendingDwellEvents();
            }),
            (this.trackPendingDwellEvents = (0, d.P)(() => {
              const e = { events: JSON.stringify(this.pendingDwellEvents) };
              (this.pendingDwellEvents = []), this.analytics.track('dwell_events', e);
            }, 5e3)),
            (this.onBlur = () => this.stopTrackingDwellTime(!1)),
            (this.stopTrackingDwellTime = (e = !1) => {
              this.checkForDwellEvent(e), delete this.currentEvent.startTimeMs;
            }),
            (this.resumeTrackingDwellTime = () => {
              this.currentEvent.startTimeMs || (this.currentEvent.startTimeMs = Date.now()),
                this.scheduleDwellTimeOutEvent();
            }),
            (this.throttledResumeTrackingDwellTime = (0, d.P)(this.resumeTrackingDwellTime, 100)),
            (this.scheduleDwellTimeOutEvent = (0, l.D)(() => this.stopTrackingDwellTime(!0), 15e3));
        }
        async init(e, t) {
          ([this.analytics, this.cameraData, this.appData, this.viewmodeData] = await Promise.all([
            t.getModuleBySymbol(n.V6),
            t.market.waitForData(a.M),
            t.market.waitForData(o.pu),
            t.market.waitForData(r.O),
          ])),
            (this.currentEvent = { pose: this.cameraData.pose.clone(), viewmode: (0, h.Ae)(null) }),
            this.bindings.push(this.cameraData.pose.onChanged(this.onCameraChange)),
            this.bindings.push(
              this.viewmodeData.onPropertyChanged('currentModeObservable', this.onViewmodeUpdate),
            ),
            window.addEventListener('blur', this.onBlur),
            window.addEventListener('focus', this.resumeTrackingDwellTime),
            window.addEventListener('keydown', this.resumeTrackingDwellTime, { capture: !0 }),
            window.addEventListener('touchcancel', this.resumeTrackingDwellTime),
            window.addEventListener('touchstart', this.resumeTrackingDwellTime),
            window.addEventListener('touchend', this.resumeTrackingDwellTime),
            window.addEventListener('touchmove', this.throttledResumeTrackingDwellTime),
            window.addEventListener('mousemove', this.throttledResumeTrackingDwellTime);
        }
        dispose(e) {
          super.dispose(e),
            window.removeEventListener('blur', this.onBlur),
            window.removeEventListener('focus', this.resumeTrackingDwellTime),
            window.removeEventListener('keydown', this.resumeTrackingDwellTime, { capture: !0 }),
            window.removeEventListener('touchcancel', this.resumeTrackingDwellTime),
            window.removeEventListener('touchstart', this.resumeTrackingDwellTime),
            window.removeEventListener('touchend', this.resumeTrackingDwellTime),
            window.removeEventListener('touchmove', this.throttledResumeTrackingDwellTime),
            window.removeEventListener('mousemove', this.throttledResumeTrackingDwellTime);
        }
      }
    },
    92394: (e, t, i) => {
      'use strict';
      i.d(t, { C: () => l });
      var s = i(85893),
        n = i(67294),
        a = i(38772),
        o = i(94184),
        r = i.n(o),
        h = function (e, t, i, s) {
          var n,
            a = arguments.length,
            o = a < 3 ? t : null === s ? (s = Object.getOwnPropertyDescriptor(t, i)) : s;
          if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
            o = Reflect.decorate(e, t, i, s);
          else
            for (var r = e.length - 1; r >= 0; r--)
              (n = e[r]) && (o = (a < 3 ? n(o) : a > 3 ? n(t, i, o) : n(t, i)) || o);
          return a > 3 && o && Object.defineProperty(t, i, o), o;
        },
        d = function (e, t) {
          if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
            return Reflect.metadata(e, t);
        };
      let l = class extends n.Component {
        constructor(e) {
          super(e);
        }
        render() {
          const {
            iconClass: e,
            label: t,
            badgeStyle: i,
            onClick: n,
            className: a,
            imageUrl: o,
          } = this.props;
          return (0, s.jsxs)(
            'span',
            Object.assign(
              { className: r()('badge', a, { clickable: !!n }), style: i, onClick: n },
              {
                children: [
                  e && (0, s.jsx)('span', { className: `icon badge-icon ${e}` }),
                  t &&
                    (0, s.jsx)(
                      'span',
                      Object.assign({ className: 'badge-label' }, { children: t }),
                    ),
                  o &&
                    (0, s.jsx)(
                      'span',
                      Object.assign(
                        { className: 'badge-img' },
                        { children: (0, s.jsx)('img', { src: o }) },
                      ),
                    ),
                ],
              },
            ),
          );
        }
      };
      l = h([a.Z, d('design:paramtypes', [Object])], l);
    },
    80744: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => A });
      var s = i(933),
        n = i(4763),
        a = i(35659),
        o = i(37137),
        r = i(4218),
        h = i(68661),
        d = i(83069),
        l = i(29638),
        c = i(93797),
        u = i(53257),
        p = i(64831),
        m = i(81396);
      class g extends p.T {
        constructor() {
          super(...arguments),
            (this.position = new m.Vector3()),
            (this.floorId = ''),
            (this.sid = ''),
            (this.layerId = ''),
            (this.text = ''),
            (this.visible = !1),
            (this.roomId = void 0),
            (this.created = new Date()),
            (this.modified = new Date()),
            (this.version = '3.1');
        }
        copy(e) {
          return (
            (this.floorId = e.floorId),
            (this.roomId = e.roomId),
            (this.sid = e.sid),
            (this.text = e.text),
            (this.visible = e.visible),
            (this.roomId = e.roomId),
            (this.created = e.created),
            (this.modified = e.modified),
            this.position.copy(e.position),
            (this.version = e.version),
            this.commit(),
            this
          );
        }
      }
      var v = i(73908),
        f = i(32197);
      const y = new u.Z('mds-label-serialize');
      class w {
        constructor() {
          this.validate = (e) => {
            if (!e) return !1;
            const t = ['enabled', 'floorId', 'label', 'position'].filter((t) => !(t in e)),
              i = 0 === t.length,
              s = !!e.floorId && 'string' == typeof e.floorId,
              n = !!e.position && (0, v.u)(e.position),
              a = i && s && n;
            return a || y.debug('Label invalid:', { missingFields: t, validPosition: n }), a;
          };
        }
        serialize(e, t) {
          const i = D(e, t);
          return this.validate(i) ? i : null;
        }
      }
      class b {
        constructor() {
          this.validate = (e) => {
            if (!e) return !1;
            const t = ['enabled', 'label', 'position', 'floorId', 'roomId', 'layerId'];
            return Object.keys(e).every((e) => t.includes(e));
          };
        }
        serialize(e, t) {
          const i = D(e, t);
          return i && this.validate(i) ? i : null;
        }
      }
      const D = (e, t) => {
        const i = {};
        return (
          void 0 !== e.visible && (i.enabled = e.visible),
          void 0 !== e.text && (i.label = e.text),
          void 0 !== e.position &&
            (0, v.u)(e.position) &&
            (i.position = f.ep.toVisionVector(e.position)),
          void 0 !== e.floorId && '' !== e.floorId && (i.floorId = e.floorId),
          void 0 !== e.roomId && '' !== e.roomId && (i.roomId = e.roomId),
          t && void 0 !== e.layerId && '' !== e.layerId && (i.layerId = e.layerId),
          Object.keys(i).length > 0 ? i : null
        );
      };
      var S = i(38256);
      const I = new u.Z('mds-label-deserializer');
      class P {
        constructor() {
          this.validate = (e) => {
            if (!e) return !1;
            const t = ['id', 'created', 'modified', 'enabled', 'floor', 'label', 'position'].filter(
                (t) => !(t in e),
              ),
              i = 0 === t.length,
              s = !(!e.floor || !e.floor.id),
              n = !!e.position && (0, v.u)(e.position);
            return (
              (i && s && n) ||
                I.debug('Label invalid:', { missingFields: t, validFloor: s, validPosition: n }),
              i && s && n
            );
          };
        }
        deserialize(e) {
          var t;
          if (!e || !this.validate(e))
            return I.debug('Deserialized invalid Label data from MDS', e), null;
          const i = new g();
          return (
            (i.sid = e.id),
            (i.layerId = (null === (t = e.layer) || void 0 === t ? void 0 : t.id) || ''),
            (i.floorId = e.floor.id),
            (i.text = e.label),
            (i.visible = !!e.enabled),
            (i.created = (0, S.p)(e.created)),
            (i.modified = (0, S.p)(e.modified)),
            (i.position = f.ep.fromVisionVector(e.position)),
            e.room && e.room.id && (i.roomId = e.room.id),
            i
          );
        }
      }
      var T = i(61341),
        E = i(71439),
        M = i(39011),
        C = i(80383);
      const x = new u.Z('MdsLabelStore');
      class R extends c.u {
        constructor(e) {
          super(e),
            (this.prefetchKey = 'data.model.labels'),
            (this.layeredType = C.SF.LABEL),
            (this.deserializer = new P()),
            (this.updateSerializer = new b()),
            (this.createSerializer = new w());
        }
        async read(e) {
          const { includeDisabled: t = !1 } = this.config,
            i = {
              modelId: this.getViewId(),
              includeDisabled: t,
              includeLayers: this.readLayerId(),
            };
          return this.query(T.GetLabels, i, e).then((e) => {
            var t, i;
            const s =
              null ===
                (i =
                  null === (t = null == e ? void 0 : e.data) || void 0 === t ? void 0 : t.model) ||
              void 0 === i
                ? void 0
                : i.labels;
            if (!s || !Array.isArray(s)) return null;
            const n = [];
            for (const e of s) {
              const t = this.deserializer.deserialize(e);
              t && n.push(t);
            }
            return n.reduce((e, t) => ((e[t.sid] = t), e), {});
          });
        }
        async create(e) {
          const t = this.getViewId(),
            i = [];
          for (const s of e) {
            const e = this.createSerializer.serialize(s, this.writeLayerId(s.layerId));
            if (!e)
              throw (x.error('Failure saving label:', s.sid, s), new Error('Could not save Label'));
            const n = { modelId: t, labelId: s.sid, data: e, includeLayers: this.readLayerId() };
            await this.mutate(T.AddLabel, n).then((e) => {
              var t;
              const n = null === (t = e.data) || void 0 === t ? void 0 : t.addLabel;
              if (!n) throw new Error('Could not save label: empty response');
              const a = new g().copy(s);
              (a.sid = n.id),
                a.commit(),
                x.debug(Object.assign({ type: 'addLabel' }, e)),
                i.push(a);
            });
          }
          return i;
        }
        async update(e) {
          if (!e || 0 === e.length) return;
          const t = this.getViewId();
          let i = '';
          const s = {};
          (s.modelId = t), (s.includeLayers = this.readLayerId());
          let n = '';
          for (const t of e) {
            const e = t.sid,
              a = this.updateSerializer.serialize(t, !1);
            if (!a)
              throw (x.error('Failure updating label:', e, t), new Error('Could not update Label'));
            (i += `, $patch${e}: LabelPatch!`),
              (s[`patch${e}`] = a),
              (n += `patch${e}:\n        patchLabel(modelId: $modelId, labelId: "${e}", patch: $patch${e}) {\n          ...LabelDetails\n        }\n      `);
          }
          const a = E.gql`
      mutation labelUpdate($modelId: ID! ${i}, $includeLayers: Boolean!) {
        ${n}
      }

      ${(0, M.S)(T.LabelDetails)}
    `;
          return this.mutate(a, s).then((e) => {
            x.debug(Object.assign({ type: 'patchLabel' }, e));
          });
        }
        async delete(e) {
          if (!e || 0 === e.length) return;
          const t = this.getViewId();
          let i = '';
          for (const t of e) {
            if (!t || (t && !t.sid))
              throw (x.error('Failure deleting label:', t), new Error('Could not update Label'));
            i += `delete${t.sid}: deleteLabel(modelId: $modelId, labelId: "${t.sid}") `;
          }
          const s = E.gql`
      mutation batchDeleteLabel($modelId: ID!) {
        ${i}
      }
    `;
          return this.mutate(s, { modelId: t }).then(() => {});
        }
      }
      var L = i(22925);
      class A extends s.Y {
        constructor() {
          super(...arguments), (this.name = 'label-data'), (this.monitor = null);
        }
        async init(e, t) {
          const { readonly: i } = e;
          (this.engine = t),
            (this.market = t.market),
            (this.layersData = await t.market.waitForData(L.R)),
            (this.store = new R({
              context: this.layersData.mdsContext,
              readonly: e.readonly,
              includeDisabled: !e.readonly,
              baseUrl: e.baseUrl,
            }));
          const s = (await this.store.read()) || {},
            o = await t.getModuleBySymbol(n.Lx),
            h = await t.getModuleBySymbol(n.hi);
          for (const e of Object.values(s)) h.inferMeshIdsFromPoint(e, e.position, !1);
          (this.labelData = t.market.tryGetData(l.D) || new l.D(s)),
            this.store.onNewData(async (e) => {
              var t;
              this.labelData.atomic(() => {
                this.layersData.replaceBackendLayers(this.labelData.getCollection(), {});
              }),
                e &&
                  this.labelData.atomic(() => {
                    this.layersData.replaceBackendLayers(this.labelData.getCollection(), e);
                  }),
                null === (t = this.monitor) || void 0 === t || t.clearDiffRecord();
            }),
            await this.store.refresh(),
            this.market.register(this, l.D, this.labelData),
            i ||
              ((this.monitor = new r.c(
                this.labelData.getCollection(),
                { aggregationType: d.E.Manual, shallow: !0 },
                this.engine,
              )),
              this.bindings.push(o.onSave(() => this.saveDiff(), { dataType: a.g.LABELS })));
        }
        dispose(e) {
          this.store.dispose(), super.dispose(e);
        }
        async save() {
          return this.engine.commandBinder.issueCommand(new o.V({ dataTypes: [a.g.LABELS] }));
        }
        getDiffRecord() {
          var e;
          return (null === (e = this.monitor) || void 0 === e ? void 0 : e.getDiffRecord()) || [];
        }
        async saveDiff() {
          if (!this.store || !this.monitor)
            return void this.log.warn('Labels changes will NOT be saved');
          this.monitor.commitChanges();
          const e = this.monitor.getDiffRecord();
          this.monitor.clearDiffRecord();
          const t = e
              .map((e) => {
                var t;
                const i =
                  e.diff.layerId ||
                  (null === (t = this.labelData.getLabel(e.index)) || void 0 === t
                    ? void 0
                    : t.layerId);
                return Object.assign(Object.assign({}, e), { layerId: i });
              })
              .filter((e) => !this.layersData.isInMemoryLayer(e.layerId)),
            i = t
              .filter((e) => e.action === h.KI.removed)
              .map((e) => ({ sid: e.index, layerId: e.layerId })),
            s = t
              .filter((e) => e.action === h.KI.added)
              .map((e) => this.labelData.getLabel(e.index)),
            n = t
              .filter((e) => e.action === h.KI.updated)
              .map((e) =>
                Object.assign(Object.assign({ sid: e.index }, e.diff), { layerId: e.layerId }),
              );
          return Promise.all([
            this.store.delete(i),
            this.store.create(s),
            this.store.update(n),
          ]).then(() => {});
        }
        onUpdate(e) {}
      }
    },
    51630: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { USER_LABELS: () => T, default: () => ge });
      var s = i(933),
        n = i(4763),
        a = i(29638),
        o = i(57793),
        r = i(60937),
        h = i(70593),
        d = i(67108),
        l = i(31740),
        c = i(62770),
        u = i(64150),
        p = i(72803),
        m = i(71034),
        g = i(81396);
      const v = {
        ColorDefault: 16777215,
        ColorHovered: i(50831).I.MP_BRAND.getHex(),
        ColorInvalid: 16750933,
      };
      class f extends m.$7 {
        use(e) {
          (this.userData.sid = e.data.sid),
            (this.collider.data = e.data),
            (this.collider.name = e.data.text),
            (this.collider.labelMesh = e);
        }
      }
      class y extends g.Mesh {
        constructor() {
          super(...arguments),
            (this.hitTest = (() => {
              const e = new g.Matrix4(),
                t = new g.Ray(),
                i = new g.Plane(new g.Vector3(0, 0, -1)),
                s = new g.Vector3();
              return (n, a) => {
                if (
                  (e.copy(this.matrixWorld).invert(),
                  t.copy(n.ray).applyMatrix4(e),
                  t.intersectPlane(i, s))
                ) {
                  const e = this.scale.x / this.scale.y;
                  let t = 0.5;
                  e < 1.5 && (t = 1 / e),
                    Math.abs(s.x) <= t &&
                      Math.abs(s.y) <= 0.75 &&
                      (s.applyMatrix4(this.matrixWorld),
                      a.push({
                        distance: n.ray.origin.distanceTo(s),
                        point: s.clone(),
                        object: this,
                      }));
                }
              };
            })());
        }
        labelVisible() {
          return !(!this.labelMesh || !this.labelMesh.labelVisible());
        }
        getId() {
          if (!this.data) throw new Error('LabelInputCollider used before configure');
          return this.data.sid;
        }
        raycast(e, t) {
          if (!this.labelVisible()) return;
          if (this.material.depthTest) return void this.hitTest(e, t);
          const i = this.material.depthTest ? t : [];
          this.hitTest(e, i), i.length > 0 && ((i[0].distance /= 1e4), t.push(i[0]));
        }
      }
      class w {
        constructor(e = {}) {
          (this.makeLabel = () => {
            const e = new f(Object.assign({}, this.textStyle));
            return (
              (e.scaleType = m.N3.WORLD),
              e.setRenderOrder(p.z.labels),
              e.setRenderLayer(this.layer),
              (e.opacity = 0),
              e
            );
          }),
            (this.textStyle = m.uc.makeConfig(
              Object.assign(
                {
                  color: 'white',
                  background: !1,
                  backgroundAsCollider: !0,
                  backgroundColliderType: y,
                  backgroundColor: '#222',
                  backgroundOpacity: 1,
                  outline: !0,
                  outlineWidth: 0.06,
                  wordWrapWidth: void 0,
                  disableDepth: !0,
                },
                e,
              ),
            ));
        }
        setRenderLayer(e) {
          this.layer = e;
        }
      }
      var b = i(56063);
      class D extends b.m {
        constructor(e) {
          super(), (this.payload = { ids: e });
        }
      }
      D.id = 'FILTER_LABEL_VISIBILITY';
      class S extends b.m {
        constructor(e) {
          super(), (this.payload = { enabled: e });
        }
      }
      S.id = 'VISIBILITY_FILTER_ENABLED';
      var I = i(42896),
        P = i(63926);
      const T = { LABEL_SIZE: 0, FADE_DURATION: 200 };
      class E extends g.Object3D {
        constructor(e) {
          super(),
            (this.text = e),
            (this.maxOpacity = 1),
            (this.labelAnim = new P.z(0)),
            (this.filtered = !1),
            (this.hidden = !1),
            (this.selectState = { active: !1, on: () => {}, off: () => {} }),
            (this.validState = {
              active: !0,
              on: () => {
                const e = this.hoverState.active ? v.ColorHovered : v.ColorDefault;
                this.text.setColor(e);
              },
              off: () => {
                this.text.setColor(v.ColorInvalid);
              },
            }),
            (this.hoverState = {
              active: !1,
              on: () => {
                this.validState.active && this.text.setColor(v.ColorHovered);
              },
              off: () => {
                this.validState.active && this.text.setColor(v.ColorDefault);
              },
            }),
            this.add(e);
        }
        use(e) {
          (this.data = e),
            (this.userData.sid = e.sid),
            (this.userData.data = e),
            this.text.use(this),
            this.labelUpdate(e.position, new g.Quaternion(), '');
        }
        getId() {
          return this.data.sid;
        }
        labelVisible() {
          return !this.filtered && !this.hidden;
        }
        updatePose(e, t) {
          return this.labelUpdate(e, t, this.data.text), this;
        }
        setMaxOpacity(e) {
          (this.maxOpacity = e), this.toggleLabel(this.labelVisible());
        }
        free() {
          this.labelAnim.value > 0 && this.toggleLabel(!1);
        }
        tickAnimations(e) {
          return this.animateLabelOpacity(0.5 * e), this;
        }
        toggleLabel(e) {
          (this.hidden = !e), this.updateOpacity();
        }
        isHidden() {
          return this.hidden;
        }
        toggleFiltered(e) {
          e !== this.filtered && ((this.filtered = e), this.updateOpacity());
        }
        updateOpacity() {
          const e = this.labelVisible() ? this.maxOpacity : 0;
          this.labelAnim.endValue !== e &&
            this.labelAnim.modifyAnimation(this.labelAnim.value, e, T.FADE_DURATION);
        }
        animateLabelOpacity(e) {
          const t = this.labelAnim.tick(e);
          Math.min(t, this.maxOpacity) !== this.text.opacity && (this.text.opacity = t);
        }
        labelUpdate(e, t, i) {
          this.text.position.copy(e), this.text.quaternion.copy(t), (this.text.text = i);
        }
        billboard(e, t, i, s, n, a, o) {
          this.text.scaleBillboard(e, t, i, s, n, a, o);
        }
      }
      var M = i(53257);
      const C = new M.Z('label-spawner');
      class x {
        constructor(e, t) {
          (this.map = e),
            (this.maker = t),
            (this.container = new g.Object3D()),
            (this.pool = []),
            (this.bindings = []),
            (this.meshesMap = (0, I.q)()),
            (this.container.name = 'RoomLabels');
          const i = e.keys;
          for (const t of i) {
            const i = e.get(t);
            this.add(i, t);
          }
          this.bindings.push(
            e.onElementChanged({
              onAdded: (e, t) => {
                this.add(e, t), C.debug('LabelMesh: added:', t);
              },
              onRemoved: (e, t) => {
                C.debug('LabelMesh: removing:', t);
                const i = this.meshesMap.get(t);
                i && this.free(i);
              },
            }),
          );
        }
        subscribe(e) {
          return this.meshesMap.onElementChanged(e);
        }
        get(e) {
          return this.meshesMap.get(e);
        }
        free(e) {
          const t = e.getId(),
            i = this.meshesMap.get(t);
          i.free(),
            this.meshesMap.delete(t),
            this.container.remove(i),
            this.pool.push(i),
            C.debug('LabelMesh: removed:', i);
        }
        add(e, t) {
          const i = this.get(t);
          if (i) return i;
          const s = this.pool.shift();
          if (void 0 !== s) return s.use(e), this.container.add(s), this.meshesMap.set(t, s), s;
          {
            const i = new E(this.maker.makeLabel());
            return i.use(e), this.container.add(i), this.meshesMap.set(t, i), i;
          }
        }
        dispose() {
          for (const e of this.meshesMap.values) this.free(e), e.text.dispose();
          this.meshesMap.clear();
          for (const e of this.pool) e.text.dispose();
          (this.pool.length = 0), this.bindings.forEach((e) => e.cancel());
        }
      }
      var R = i(32197);
      class L {
        constructor(e, t, i, s) {
          (this.meshes = e),
            (this.cameraData = i),
            (this.screenFilter = s),
            (this.dirty = !0),
            (this.bindings = []),
            (this.pendingMesh = null),
            (this.setDirty = () => {
              this.dirty = !0;
            }),
            this.bindings.push(i.onChanged(this.setDirty), t.onChanged(this.setDirty));
          for (const e of this.meshes.values) e.text.onGeomUpdate(this.setDirty);
          this.meshes.onElementChanged({ onAdded: (e) => e.text.onGeomUpdate(this.setDirty) });
        }
        dispose() {
          this.bindings.forEach((e) => e.cancel()), (this.bindings.length = 0);
        }
        setPendingMeshId(e) {
          if (
            (!this.pendingMesh || this.pendingMesh.getId() !== e) &&
            (this.pendingMesh &&
              (this.pendingMesh.data.removeOnChanged(this.setDirty), (this.pendingMesh = null)),
            e)
          ) {
            const t = this.meshes.get(e);
            t.data.onChanged(this.setDirty), (this.pendingMesh = t);
          }
        }
        beforeRender() {
          if (!this.dirty) return;
          this.dirty = !1;
          const { position: e, rotation: t, projection: i } = this.cameraData.pose,
            { height: s } = this.cameraData,
            n = this.cameraData.zoom(),
            a = this.cameraData.aspect(),
            o = (0, R.dS)(64 - T.LABEL_SIZE, 0, 64, 0.02, 0.1);
          for (const r of this.meshes.values)
            r.isHidden() || (r.updatePose(r.data.position, t), r.billboard(e, t, i, n, s, a, o));
          this.screenFilter.update();
          for (const e of this.meshes.values)
            e.isHidden() || e.toggleFiltered(!this.screenFilter.visible(e.data.sid));
        }
        render(e) {
          for (const t of this.meshes) t.tickAnimations(e);
        }
        deactivate() {}
        init() {}
        activate() {}
      }
      var A = i(82582),
        F = i.n(A),
        k = i(11250);
      class O {
        constructor(e, t, i) {
          (this.meshes = e),
            (this.cameraData = t),
            (this.enabled = i),
            (this.tree = new (F())()),
            (this.visibleMap = {}),
            (this._screenPosition = new g.Vector2()),
            (this._ndcPosition = new g.Vector3()),
            (this._cornerWorldPosition = new g.Vector3()),
            (this._cornerScreenPosition = new g.Vector2()),
            (this._selectedId = null),
            (this.update = () => {
              this.enabled()
                ? ((this.visibleMap = {}), this.updatePositions())
                : Object.keys(this.visibleMap).length && (this.visibleMap = {});
            });
        }
        visible(e) {
          if (!(e in this.visibleMap)) return !1;
          return e in this.visibleMap;
        }
        setSelectedMeshId(e) {
          this._selectedId = e;
        }
        updatePositions() {
          this.tree.clear(),
            this.meshes()
              .filter((e) => !e.isHidden())
              .map((e) => {
                (0, k.q9)(
                  this.cameraData,
                  e.text.position,
                  this._screenPosition,
                  this._ndcPosition,
                );
                const { width: t, height: i } = e.text.getUnscaledSize();
                this._cornerWorldPosition.set(0.5 * t, -0.5 * i, 0),
                  e.text.updateMatrixWorld(),
                  this._cornerWorldPosition.applyMatrix4(e.text.matrixWorld),
                  (0, k.q9)(this.cameraData, this._cornerWorldPosition, this._cornerScreenPosition);
                const s = e.getId() !== this._selectedId ? this._ndcPosition.z : -999;
                return this.describeBbox(
                  e.text,
                  this._screenPosition,
                  this._cornerScreenPosition,
                  s,
                );
              })
              .sort((e, t) => e.depth - t.depth)
              .forEach((e) => {
                this.tree.collides(e) || (this.tree.insert(e), (this.visibleMap[e.id] = e));
              });
        }
        describeBbox(e, t, i, s) {
          i.sub(t);
          const n = i.x,
            a = i.y;
          return {
            id: e.userData.sid,
            depth: s,
            minX: t.x - n,
            minY: t.y - a,
            maxX: t.x + n,
            maxY: t.y + a,
          };
        }
      }
      var V = i(24938),
        B = i(9263),
        N = i(82196),
        G = i(27163),
        H = i(90512),
        _ = i(22925),
        U = i(59452);
      class W {
        constructor(e) {
          (this.meshes = e),
            (this.initialized = !1),
            (this.pendingMeshId = null),
            (this.selectedMeshId = null),
            (this.dirty = !0),
            (this.bindings = []),
            (this.labelIdVisibility = {}),
            (this.visibilityFilterEnabled = !1),
            (this.featureEnabled = () => {
              if (!this.initialized) return !1;
              const e = this.appData.phase === V.nh.PLAYING,
                t = this.settingsData.tryGetProperty(N.Nj, !1),
                i =
                  this.settingsData.tryGetProperty(B.gx.Labels, !1) ||
                  this.toolsData.activeToolName === G.w1.LABELS,
                s = e && t && i;
              return this.settingsData.setProperty(N.Cu, s), s;
            }),
            (this.visibleByTool = () => {
              if (!this.initialized) return !1;
              const { activeToolName: e } = this.toolsData;
              return (
                null === e ||
                e === G.w1.LABELS ||
                e === G.w1.PHOTOS ||
                e === G.w1.SEARCH ||
                e === G.w1.LAYERS
              );
            }),
            (this.visibleByViewmode = () => {
              const e =
                  this.settingsData.tryGetProperty(B.gx.LabelsDollhouse, !1) ||
                  this.toolsData.activeToolName === G.w1.LABELS,
                t = this.viewmodeData.isDollhouse() && e,
                i =
                  this.viewmodeData.isFloorplan() &&
                  ((this.appData.application === V.Mx.WORKSHOP && this.visibleByTool()) ||
                    this.settingsData.tryGetProperty(B.gx.Labels, !1)),
                s =
                  this.viewmodeData.isDollhouse() &&
                  this.settingsData.tryGetProperty(B.gx.Labels, !1) &&
                  this.settingsData.tryGetProperty(U.eC, !1) &&
                  this.cameraData.pose.isPitchFactorOrtho.value;
              return i || t || s;
            }),
            (this.hiddenByTransition = () =>
              this.viewmodeData.transitionActive() || this.floorsViewData.transitionActive),
            (this.visibleByFloor = (e) => {
              if (!(this.toolsData.activeToolName === G.w1.LABELS)) {
                const { roomSelectModeActive: e, floorSelectModeActive: t } = this.floorsViewData;
                if (!e) return !1;
                if (t) return !1;
              }
              return this.viewmodeData.isFloorplan()
                ? this.floorsViewData.currentFloor
                  ? this.floorsViewData.isCurrentOrAllFloors(e)
                  : this.floorsViewData.topFloorId === e
                : this.floorsViewData.isCurrentOrAllFloors(e);
            }),
            (this.setDirty = () => {
              this.dirty = !0;
            });
        }
        async init(e) {
          [
            this.viewmodeData,
            this.floorsViewData,
            this.settingsData,
            this.toolsData,
            this.appData,
            this.layersData,
            this.cameraData,
          ] = await Promise.all([
            e.waitForData(H.O),
            e.waitForData(r.c),
            e.waitForData(u.e),
            e.waitForData(h.t),
            e.waitForData(V.pu),
            e.waitForData(_.R),
            e.waitForData(o.M),
          ]);
          const t = await e.waitForData(a.D);
          [
            this.viewmodeData,
            this.floorsViewData,
            this.settingsData,
            this.toolsData,
            this.appData,
            t,
          ].forEach((e) => this.bindings.push(e.onChanged(this.setDirty))),
            this.bindings.push(
              this.layersData.onCurrentLayersChanged(this.setDirty),
              this.cameraData.pose.isPitchFactorOrtho.onChanged(this.setDirty),
            ),
            this.meshes.onChanged(this.setDirty),
            (this.initialized = !0);
        }
        dispose() {
          this.bindings.forEach((e) => e.cancel()), (this.bindings.length = 0);
        }
        setVisibilityFilterEnabled(e) {
          (this.visibilityFilterEnabled = e), this.setDirty();
        }
        updateLabelVisibility(e) {
          (this.labelIdVisibility = e.reduce((e, t) => ((e[t] = !0), e), {})), this.setDirty();
        }
        onUpdate() {
          if (!this.initialized || !this.dirty) return;
          this.dirty = !1;
          const e =
              this.featureEnabled() &&
              !this.hiddenByTransition() &&
              this.visibleByTool() &&
              this.visibleByViewmode(),
            t = (e) =>
              e.visible &&
              this.visibleByFloor(e.floorId) &&
              this.visibleById(e.sid) &&
              this.layerToggledOn(e.layerId) &&
              this.layersData.layerVisible(e.layerId);
          for (const i of this.meshes.values) {
            const s = i.data.sid === this.pendingMeshId || i.data.sid === this.selectedMeshId,
              n = e && (s || t(i.data));
            i.toggleLabel(n);
          }
          this.dirtyCb && this.dirtyCb();
        }
        setPendingMeshId(e) {
          (this.pendingMeshId = e), this.setDirty();
        }
        setSelectedMeshId(e) {
          (this.selectedMeshId = e), this.setDirty();
        }
        setDirtyCallback(e) {
          this.dirtyCb = e;
        }
        visibleById(e) {
          return !this.visibilityFilterEnabled || !!this.labelIdVisibility[e];
        }
        layerToggledOn(e) {
          return this.appData.application === V.Mx.WORKSHOP || this.layersData.layerToggled(e);
        }
      }
      var z = i(97187),
        j = i(90288),
        $ = i(21676),
        q = i(79242),
        Z = i(86210),
        Y = i(59491),
        X = i(20348),
        K = i(74094),
        Q = i(945),
        J = i(61173),
        ee = i(38063);
      class te {
        constructor(e, t, i, s, n, a) {
          (this.labelRenderer = e),
            (this.issueCommand = t),
            (this.input = i),
            (this.floorsViewData = s),
            (this.toolsData = n),
            (this.roomNavigationPose = a),
            (this.inputBindings = []),
            (this.appStateBindings = []),
            (this.raycasterRegistrationBindings = []),
            (this.active = !0),
            (this.enabled = !0),
            (this.refresh = () => {
              this.shouldBeInteractive !== this.active &&
                (this.inputBindings.forEach((e) =>
                  this.shouldBeInteractive ? e.renew() : e.cancel(),
                ),
                this.raycasterRegistrationBindings.forEach((e) =>
                  this.shouldBeInteractive ? e.renew() : e.cancel(),
                ),
                (this.active = this.shouldBeInteractive));
            }),
            (this.refreshColliders = () => {
              for (const e of this.labelRenderer.labelMeshIterator())
                this.shouldBeInteractive
                  ? this.input.registerMesh(e.text.collider, !1)
                  : this.input.unregisterMesh(e.text.collider);
            }),
            (this.clearColliders = () => {
              for (const e of this.labelRenderer.labelMeshIterator())
                this.input.unregisterMesh(e.text.collider);
            }),
            this.inputBindings.push(...this.setupInputBindings()),
            this.raycasterRegistrationBindings.push(...this.setupRaycasterBindings());
          const o = this.toolsData.onPropertyChanged('activeToolName', this.refresh),
            r = this.floorsViewData.makeFloorChangeSubscription(this.refresh),
            h = this.floorsViewData.onRoomSelectModeChange(this.refresh);
          this.appStateBindings.push(o, r, h), this.refresh();
        }
        toggleInput(e) {
          this.enabled !== e &&
            ((this.enabled = e),
            this.appStateBindings.forEach((t) => (e ? t.renew() : t.cancel())),
            this.refresh());
        }
        get shouldBeInteractive() {
          return (
            this.enabled &&
            null === this.toolsData.activeToolName &&
            this.floorsViewData.roomSelectModeActive
          );
        }
        setupRaycasterBindings() {
          return [
            (0, Y.k1)(
              () => this.refreshColliders(),
              () => this.clearColliders(),
              !0,
              'toggleLabelMeshInput',
            ),
            this.labelRenderer.subscribe({
              onAdded: (e) => this.input.registerMesh(e.text.collider, !1),
              onRemoved: (e) => this.input.unregisterMesh(e.text.collider),
            }),
          ];
        }
        setupInputBindings() {
          const e = $.s.is((e) => e instanceof y && e.labelVisible()),
            t = this.input.registerMeshHandler(q.Rd, e, (e, t) => {
              const i = this.labelRenderer.getLabelMesh(t.getId());
              if (i) {
                const e = i.data.roomId;
                if (e) {
                  const t = this.roomNavigationPose.getPoseForRoom(e, i.data.position);
                  t && this.issueCommand(new z._i(z.BD.INSIDE, j.nF.Interpolate, t));
                } else
                  this.issueCommand(
                    new ee.zs({ focusPosition: i.data.position, transition: j.nF.Interpolate }),
                  );
              }
            });
          if ((0, J.Jm)()) return [t];
          let i = null;
          return [
            new X.V(
              this.input.registerMeshHandler(Z.z, e, (e, t) => {
                const s = this.labelRenderer.getLabelMesh(t.getId());
                s &&
                  ((s.hoverState.active = !0),
                  s.hoverState.on(),
                  (i = s),
                  this.issueCommand(new K.u(Q.C.FINGER)));
              }),
              this.input.registerMeshHandler(Z.A, $.s.isType(y), (e, t) => {
                i && this.issueCommand(new K.u(Q.C.DEFAULT));
                const s = this.labelRenderer.getLabelMesh(t.getId());
                s && ((s.hoverState.active = !1), s.hoverState.off()), (i = null);
              }),
              (0, Y.k1)(
                () => {},
                () => {
                  i &&
                    ((i.hoverState.active = !1),
                    i.hoverState.off(),
                    this.issueCommand(new K.u(Q.C.DEFAULT)),
                    (i = null));
                },
                !0,
                'labelHoverClear',
              ),
            ),
            t,
          ];
        }
      }
      var ie = i(3835),
        se = i(43017);
      const ne = new M.Z('room-with-a-view');
      class ae {
        constructor(e, t, i) {
          (this.sweepData = e), (this.roomData = t), (this.meshData = i);
        }
        getPoseForRoom(e, t) {
          const i = this.bestViewForRoom(e, t);
          if (i) {
            return { rotation: i.rotation, sweepID: i.sweepID, viewmode: se.Ey.Panorama };
          }
          return null;
        }
        bestViewForRoom(e, t) {
          const i = this.sweepData.filter((t) => t.roomId === e && t.enabled);
          if (0 === i.length)
            return ne.debug('no sweeps in selected room', { roomId: e, scansInRoom: i }), null;
          let s = 1;
          const n = this.roomData.get(e),
            a = this.meshData.meshGroups.rooms.get(n.meshSubgroup),
            o = (null == a ? void 0 : a.boundingBox.getSize(new g.Vector3()).length()) || 1 / 0;
          t && o > 10 && (s = 0.1);
          const r = i.sort((i, n) => {
              let a = 0,
                o = 0;
              t && ((a = i.position.distanceTo(t)), (o = n.position.distanceTo(t)));
              const r = i.neighbours
                  .map((e) => this.sweepData.getSweep(e))
                  .filter((t) => t.roomId === e).length,
                h = n.neighbours
                  .map((e) => this.sweepData.getSweep(e))
                  .filter((t) => t.roomId === e).length;
              return 1 * s * (h - r) - 3 * (o - a);
            }),
            h = r[0];
          if (!h)
            return (
              ne.debug('no start sweep', { roomId: e, scansInRoom: i, connectedness: r }), null
            );
          const d = h.neighbours
              .map((e) => this.sweepData.getSweep(e))
              .sort((t, i) => {
                let s = h.position.distanceTo(t.position),
                  n = h.position.distanceTo(i.position);
                return t.roomId === e && (s *= 1e3), i.roomId === e && (n *= 1e3), n - s;
              })
              .map((e) => ({ sweep: e, dist: h.position.distanceTo(e.position), rm: e.roomId })),
            l = d[0];
          ne.warn({ roomId: e, roomSize: o, scoring: r, byDistance: d, scansInRoom: i });
          const c = new g.Quaternion();
          if (1 === i.length && void 0 !== l) {
            const e = new g.Matrix4().setPosition(h.position);
            e.lookAt(l.sweep.position, h.position, ie.fU.UP), c.setFromRotationMatrix(e);
          } else {
            const e = new g.Matrix4().setPosition(h.position);
            e.lookAt(h.position, l.sweep.position, ie.fU.UP), c.setFromRotationMatrix(e);
          }
          return { sweepID: h.id, rotation: c };
        }
      }
      var oe = i(80383),
        re = i(7321),
        he = i(32137),
        de = i(55587),
        le = i(73521),
        ce = i(40232);
      class ue extends le.K {
        constructor(e, t, i, s, n) {
          super(e, t, i),
            (this.editMode = s),
            (this.label = n),
            (this.id = this.label.sid),
            (this.title = this.label.text),
            (this.icon = 'icon-toolbar-labels'),
            (this.typeId = oe.SF.LABEL),
            (this.floorId = this.label.floorId),
            (this.roomId = this.label.roomId || ''),
            (this.layerId = this.label.layerId),
            (this.dateBucket = (0, ce.f)(this.label.created)),
            (this.enabled = this.label.visible),
            (this.onSelect = () => {
              super.onSelect(),
                this.editMode || this.commandBinder.issueCommand(new ee.Cs(this.label));
            });
        }
        supportsLayeredCopyMove() {
          return !0;
        }
        supportsBatchDelete() {
          return !0;
        }
      }
      const { LABELS: pe } = re.Z.SHOWCASE;
      class me extends s.Y {
        constructor() {
          super(...arguments),
            (this.name = 'user-labels'),
            (this.labelMeshIterator = () => this.spawner.meshesMap.values),
            (this.filterVisibleLabels = async (e) => {
              this.visibilityRules.updateLabelVisibility(e.ids);
            }),
            (this.changeVisibilityFilterEnabled = async (e) => {
              this.visibilityRules.setVisibilityFilterEnabled(e.enabled);
            });
        }
        async init(e, t) {
          const [i, s, p, m, g, v, f, y, b, I, P] = await Promise.all([
              t.market.waitForData(a.D),
              t.market.waitForData(o.M),
              t.market.waitForData(r.c),
              t.market.waitForData(h.t),
              t.market.waitForData(l.Z),
              t.market.waitForData(c.Z),
              t.market.waitForData(d._),
              t.getModuleBySymbol(n.Aj),
              t.getModuleBySymbol(n.PZ),
              t.getModuleBySymbol(n.e9),
              t.market.waitForData(u.e),
            ]),
            T = y.getScene(),
            E = new w({
              assetBasePath: P.tryGetProperty('assetBasePath', ''),
              lang: I.languageCode,
            });
          E.setRenderLayer(t.claimRenderLayer('labels')),
            (this.spawner = new x(i.getCollection(), E)),
            T.add(this.spawner.container),
            (this.visibilityRules = new W(this.spawner.meshesMap)),
            this.visibilityRules.init(t.market),
            this.bindings.push(
              t.commandBinder.addBinding(D, this.filterVisibleLabels),
              t.commandBinder.addBinding(S, this.changeVisibilityFilterEnabled),
            );
          (this.labelFilter = new O(
            this.labelMeshIterator,
            s,
            () => this.visibilityRules.featureEnabled() && this.visibilityRules.visibleByTool(),
          )),
            (this.labelRenderer = new L(
              this.spawner.meshesMap,
              i.getCollection(),
              s,
              this.labelFilter,
            )),
            t.addComponent(this, this.labelRenderer),
            this.visibilityRules.setDirtyCallback(this.labelRenderer.setDirty);
          const M = new ae(g, v, f);
          (this.labelNavInput = new te(this, t.commandBinder.issueCommand, b, p, m, M)),
            this.toggleInput(!0),
            (async function (e, t, i) {
              const [s, n, a] = await Promise.all([
                e.market.waitForData(V.pu),
                e.market.waitForData(_.R),
                e.market.waitForData(h.t),
              ]);
              let o = s.application === V.Mx.WORKSHOP;
              const r = (i, s, a, r = []) => {
                  const h = [];
                  return (
                    0 === r.length &&
                      t.iterate((t) => {
                        (o || (t.visible && n.layerToggled(t.layerId))) &&
                          i(t.text) &&
                          h.push(new ue(e.commandBinder, n, s, o, t));
                      }),
                    e.commandBinder.issueCommand(new D(h.map((e) => e.id))),
                    h.sort((e, t) => e.title.localeCompare(t.title))
                  );
                },
                d = (t) => {
                  e.commandBinder.issueCommand(new S(!!t));
                },
                l = (e) => new X.V(t.onChanged(e)),
                c = () => {
                  e.commandBinder.issueCommandWhenBound(
                    new he.c6({
                      id: oe.SF.LABEL,
                      groupPhraseKey: pe.SEARCH_GROUP_HEADER,
                      getSimpleMatches: r,
                      registerChangeObserver: l,
                      onSearchActivatedChanged: d,
                      groupOrder: 30,
                      groupIcon: 'toolbar-labels',
                      batchSupported: !0,
                    }),
                  );
                },
                u = () => {
                  e.commandBinder.issueCommandWhenBound(new he.Pe(oe.SF.LABEL));
                },
                p = () => {
                  o = s.application === V.Mx.WORKSHOP;
                  const e = a.activeToolName === G.w1.LABELS,
                    t = i.tryGetProperty(B.gx.Labels, !1),
                    n = i.tryGetProperty(de.wY, !1),
                    r = i.tryGetProperty(de.dF, !1);
                  (t || e) && (n || r || o) ? c() : u();
                },
                m = [s.onPropertyChanged('application', p), i.onChanged(p), a.onChanged(p)];
              return p(), new X.V(...m);
            })(t, i, P).then((e) => this.bindings.push(e));
        }
        dispose(e) {
          super.dispose(e), this.visibilityRules.dispose(), this.spawner.dispose();
        }
        getLabelMesh(e) {
          return (e && this.spawner.get(e)) || null;
        }
        addLabelMesh(e, t) {
          return this.spawner.add(e, t);
        }
        freeLabelMesh(e) {
          e && this.spawner.free(e);
        }
        setPendingMeshId(e) {
          this.visibilityRules.setPendingMeshId(e), this.labelRenderer.setPendingMeshId(e);
        }
        setSelectedMeshId(e) {
          this.labelFilter.setSelectedMeshId(e), this.visibilityRules.setSelectedMeshId(e);
        }
        toggleInput(e) {
          this.labelNavInput.toggleInput(e);
        }
        subscribe(e) {
          return this.spawner.subscribe(e);
        }
        onUpdate() {
          this.visibilityRules && this.visibilityRules.onUpdate();
        }
      }
      const ge = me;
    },
    83191: (e, t, i) => {
      'use strict';
      i.d(t, { Ko: () => l, hJ: () => u });
      var s = i(81396),
        n = i(43627),
        a = i(11250);
      const o = new s.Vector2(),
        r = new s.Vector3(),
        h = new s.Vector2(),
        d = new s.Vector2(),
        l = (e, t, i) => {
          const s = ((e, t, i) => (
            (0, a.q9)(i, e, h),
            (0, a.q9)(i, t, d),
            { pixelDistance: h.distanceTo(d), startScreenPosition: h, endScreenPosition: d }
          ))(e, t, i);
          return {
            screenPosition: ((e, t, i) => (
              r.copy(e).add(t).multiplyScalar(0.5), (0, a.q9)(i, r, o), o
            ))(e, t, i),
            rotation: c(h, d),
            pixelDistance: s.pixelDistance,
            startScreenPosition: s.startScreenPosition,
            endScreenPosition: s.endScreenPosition,
          };
        },
        c = (e, t) => {
          const i = e.y - t.y,
            s = e.x - t.x;
          let a = Math.atan2(i, s) * n.MN;
          return (a = a >= 90 || a <= -90 ? a + 180 : a), a;
        },
        u = (e, t = 10, i = 40) => ({ width: Math.max(9 * Math.max(e, 2) + t, i), height: 18 + t });
    },
    42798: (e, t, i) => {
      'use strict';
      i.r(t),
        i.d(t, {
          Group: () => we,
          Grouper: () => ye,
          MeasurementLabelBackgroundMesh: () => Oe,
          MeasurementLabelRenderer: () => Ve,
          MeasurementLineRenderer: () => xe,
          MeasurementModeData: () => X.X,
          MeasuringPhase: () => Y.au,
          default: () => Ti,
          labelVisible: () => Y.Ph,
        });
      var s,
        n = i(933),
        a = i(34608),
        o = i(4763),
        r = i(71034),
        h = i(80383),
        d = i(1945),
        l = i(945),
        c = i(90288),
        u = i(74094),
        p = i(57793),
        m = i(60937),
        g = i(90512),
        v = i(43017),
        f = i(53257),
        y = i(81396),
        w = i(63926);
      !(function (e) {
        (e[(e.FloorplanOnly = 0)] = 'FloorplanOnly'), (e[(e.ThreeD = 1)] = 'ThreeD');
      })(s || (s = {}));
      var b = i(83191),
        D = i(12241),
        S = i(49668);
      const I = new f.Z('line-data'),
        P = () => ({ lineVisibleByFeatureType: !0, labelVisibleByFeatureType: !0 });
      class T {
        constructor(e, t, i, n, a, o, r = P) {
          (this.cameraData = e),
            (this.viewmodeData = t),
            (this.floorsViewData = i),
            (this.isCurrentSweepAligned = n),
            (this.getUnits = a),
            (this.isFeatureEnabled = o),
            (this.visibleFilter = r),
            (this.derivedDataCache = {}),
            (this.dollhouseLineStyle = s.ThreeD),
            (this.setVisibilityFilter = (e) => {
              this.visibleFilter = e;
            }),
            (this.resetVisibilityFilter = () => {
              this.visibleFilter = P;
            }),
            (this.make = (e, t, i) => {
              const s = t(),
                {
                  start_position: n,
                  end_position: a,
                  visible: o,
                  floorId: r,
                  type: h,
                  text: d,
                } = s,
                l = o && this.isFeatureEnabled(),
                c = l && this.visibleByFloorAndModes(r, h),
                u = void 0 !== i ? i.opacity.value : 0,
                p = 0 === u || (u === D.iV.LABEL_HIDDEN_OPACITY && c);
              if (i && p && (!l || !c)) return i;
              let m = c,
                g = c;
              if (c) {
                const t = this.visibleFilter(e);
                (m = m && t.lineVisibleByFeatureType), (g = g && t.labelVisibleByFeatureType);
              }
              let v = 0;
              const f = n.distanceTo(a),
                y = (0, S.up)(f, this.getUnits());
              if (g || !p) {
                const { width: e, height: t } = (0, b.hJ)(d.length + y.length),
                  i = (0, b.Ko)(n, a, this.cameraData);
                this.tmpVec.copy(i.startScreenPosition).sub(i.endScreenPosition);
                let s = Math.abs(this.tmpVec.y) < Math.abs(this.tmpVec.x) ? t : e;
                D.iV.ALIGN_LABELS && ((s = e), (v = i.rotation)), (g = g && i.pixelDistance > s);
              }
              let I;
              const P = m && g ? 1 : m && !g ? D.iV.LABEL_HIDDEN_OPACITY : 0;
              i
                ? ((I = i.opacity),
                  (I.endValue === P && m === i.visible && g === i.labelVisible) ||
                    I.modifyAnimation(I.value, P, D.iV.FADE_DURATION))
                : (I = new w.z(0, P, D.iV.FADE_DURATION));
              const T = {
                sid: e,
                rotation: v,
                labelVisible: g,
                visible: m,
                length: f,
                displayLength: y,
                labelContents: d.length > 0 ? `${y} ${d}` : y,
                opacity: I,
              };
              return (this.derivedDataCache[e] = { getLineData: t, previousDerivedData: T }), T;
            }),
            (this.update = (e) => {
              if (this.derivedDataCache[e]) {
                const { getLineData: t, previousDerivedData: i } = this.derivedDataCache[e];
                return this.make(e, t, i);
              }
              I.warn(`data not found for ${e}`);
            }),
            (this.get = (e) => {
              if (this.derivedDataCache[e]) return this.derivedDataCache[e].previousDerivedData;
            }),
            (this.remove = (e) => {
              this.derivedDataCache[e] && delete this.derivedDataCache[e];
            }),
            (this.clear = () => {
              this.derivedDataCache = {};
            }),
            (this.visibleByFloorAndModes = (e, t) => {
              if (this.floorsViewData.transition.progress.active) return !1;
              const i = this.viewmodeData.isInside(),
                n = this.viewmodeData.isFloorplan(),
                a = this.viewmodeData.isDollhouse(),
                o = this.cameraData.pose.pitchFactor(),
                r = this.floorsViewData.currentFloorId,
                h = !r,
                d = !(!r || r !== e),
                l = e === this.floorsViewData.topFloorId,
                c = t === s.FloorplanOnly && (n || (a && o <= 1e-5)) && (d || (l && h)),
                u = t === this.dollhouseLineStyle && a && !(a && o <= 0.9) && (d || h);
              return (t === s.ThreeD && i && this.isCurrentSweepAligned()) || u || c;
            }),
            (this.tmpVec = new y.Vector2());
        }
        setDollhouseLineStyle(e) {
          this.dollhouseLineStyle = e;
        }
      }
      var E = i(47149),
        M = i(64150),
        C = i(9263),
        x = i(65919),
        R = i(66379),
        L = i(31740),
        A = i(24938),
        F = i(53310),
        k = i(94936),
        O = i(92164),
        V = i(47615),
        B = i(99244),
        N = i(56063);
      class G extends N.m {
        constructor(e, ...t) {
          super(), (this.payload = { sids: t, visible: e });
        }
      }
      G.id = 'MEASUREMENTS_SET_VISIBILITY';
      class H extends N.m {
        constructor(e, t = '') {
          super(), (this.payload = { sid: e, text: t });
        }
      }
      H.id = 'RENAME_MEASUREMENT';
      class _ extends N.m {
        constructor(e) {
          super(), (this.payload = e);
        }
      }
      _.id = 'MEASURE_CONTENTS_REPLACE';
      class U extends N.m {
        constructor(e) {
          super(), (this.payload = { sids: e });
        }
      }
      U.id = 'FILTER_MEASUREMENT_VISIBILITY';
      class W extends N.m {
        constructor(e) {
          super(), (this.payload = { enabled: e });
        }
      }
      W.id = 'MEASUREMENT_VISIBILITY_FILTER_ENABLED';
      class z extends N.m {
        constructor(e) {
          super(), (this.payload = { groupId: e });
        }
      }
      z.id = 'NAVIGATE_TO_MEASUREMENT';
      var j = i(2159),
        $ = i(92257),
        q = i(27163),
        Z = i(67781),
        Y = i(60580),
        X = i(44288),
        K = i(43627),
        Q = i(3835);
      var J;
      !(function (e) {
        (e[(e.Axes = 1)] = 'Axes'),
          (e[(e.PlanarAxes = 2)] = 'PlanarAxes'),
          (e[(e.EdgesAndPlanarAxes = 3)] = 'EdgesAndPlanarAxes'),
          (e[(e.Edges = 4)] = 'Edges'),
          (e[(e.Free = 5)] = 'Free'),
          (e[(e.Locked = 6)] = 'Locked');
      })(J || (J = {}));
      const ee = {
          [Q.eD.UP]: { dir: Object.freeze(Q.fU.UP.clone()) },
          [Q.eD.DOWN]: { dir: Object.freeze(Q.fU.DOWN.clone()) },
          [Q.eD.BACK]: { dir: Object.freeze(Q.fU.BACK.clone()) },
          [Q.eD.LEFT]: { dir: Object.freeze(Q.fU.LEFT.clone()) },
          [Q.eD.RIGHT]: { dir: Object.freeze(Q.fU.RIGHT.clone()) },
          [Q.eD.FORWARD]: { dir: Object.freeze(Q.fU.FORWARD.clone()) },
        },
        te = { [Q.eD.HORIZONTAL_PLANE]: { dir: Object.freeze(Q.fU.HORIZONTAL_PLANE.clone()) } },
        ie = (() => {
          let e = 0;
          const t = new y.Vector3(),
            i = new y.Vector3(),
            s = new y.Vector3(),
            n = new y.Vector3(),
            a = 999,
            o = Object.freeze(Q.fU.ZERO.clone()),
            r = Object.keys(ee).map((e) =>
              Object.assign(Object.assign({}, ee[e]), { name: e, angleTo: a }),
            ),
            h = Object.keys(te).map((e) =>
              Object.assign(Object.assign({}, te[e]), { name: e, angleTo: a }),
            ),
            d = (e) => (e + 3) % 2;
          let l = r[0];
          return (c, u, p = J.Axes) => {
            if (p === J.Free)
              return { position: u.clone(), constrainedAxis: o, axisName: Q.eD.NONE };
            if (
              (r.forEach((e) => (e.angleTo = a)),
              h.forEach((e) => (e.angleTo = a)),
              s.copy(u).sub(c),
              (e = s.length()),
              e < 0.05)
            )
              return { position: u.clone(), constrainedAxis: o, axisName: Q.eD.NONE };
            n.copy(s).normalize();
            const m = 0.05 * Math.min(e, 1);
            if (p !== J.Locked) {
              for (const e of r) {
                const t = (0, K.ZY)(n.angleTo(e.dir));
                t < l.angleTo && (l = e), (e.angleTo = t);
              }
              if (l.angleTo > 20) {
                const e = Math.abs(s.y);
                e * e < m && (l = h[0]);
              }
            }
            t.set(c.x * d(l.dir.x), c.y * d(l.dir.y), c.z * d(l.dir.z)),
              i
                .set(u.x * Math.abs(l.dir.x), u.y * Math.abs(l.dir.y), u.z * Math.abs(l.dir.z))
                .add(t);
            return p === J.Locked || i.distanceToSquared(u) < m
              ? { position: i.clone(), constrainedAxis: l.dir, axisName: l.name }
              : { position: u.clone(), constrainedAxis: o, axisName: Q.eD.NONE };
          };
        })(),
        se = 1081,
        ne = 192,
        ae = 320,
        oe = 128,
        re = {
          smoothness: 0.4,
          perspective: {
            fov: 40,
            thresholdClose: 1,
            thresholdFar: 8,
            offsetClose: 0.25,
            offsetFar: 0.5,
            scale: 1,
          },
          ortho: {
            fov: 5,
            thresholdClose: 5,
            thresholdFar: 20,
            offsetClose: 15,
            offsetFar: 30,
            scale: 4,
          },
        },
        he = {
          desktop: J.Edges,
          floorplan: J.Axes,
          mobile: J.Edges,
          alt: J.Free,
          shift: J.PlanarAxes,
          shiftAlt: J.EdgesAndPlanarAxes,
          disabled: J.Free,
        },
        de = 0.15,
        le = 0.1,
        ce = 0.1,
        ue = 0.5,
        pe = 0.035,
        me = 0.025,
        ge = 'measurements';
      var ve = i(58196),
        fe = i(25589);
      class ye {
        constructor(e) {
          (this.contents = e),
            (this.groupInfo = []),
            (this.groupIndices = []),
            (this.groupInfoMap = {}),
            (this.groupIndicesMap = {});
        }
        startGroup(e) {
          const t = 0 === this.groupCount,
            i = this.contents.length !== this.groupIndices[this.groupCount - 1];
          if (t || i) {
            let t = e.sid;
            if (!t) for (t = (0, fe.fV)(); this.groupInfoMap.hasOwnProperty(t); ) t = (0, fe.fV)();
            const i = Object.assign(Object.assign({}, e), { sid: t });
            this.groupInfo.push(i),
              (this.groupInfoMap[t] = i),
              this.groupIndices.push(this.contents.length),
              (this.groupIndicesMap[this.contents.length] = !0);
          }
          return this.groupIndices.length - 1;
        }
        reset() {
          this.contents.atomic(() => {
            for (let e = this.contents.length - 1; e >= 0; --e) this.removeFromIdx(e);
            (this.groupIndices = []), (this.groupInfo = []), (this.groupIndicesMap = {});
          });
        }
        isStartIndex(e) {
          return !!this.groupIndicesMap[e];
        }
        *groups() {
          for (let e = 0; e < this.groupCount; ++e) yield this.getGroup(e);
        }
        *[Symbol.iterator]() {
          for (const e of this.contents) yield e;
        }
        getGroupStartIndex(e) {
          return this.groupIndices[e];
        }
        getGroup(e) {
          const t = this.groupIndices[e],
            i = this.groupIndices[e + 1],
            s = isNaN(i) ? this.contents.length - 1 : i - 1;
          return new we(e, this.contents, t, s, Object.assign({}, this.groupInfo[e]));
        }
        getGroupById(e) {
          for (let t = 0; t < this.groupInfo.length; t++)
            if (e === this.groupInfo[t].sid) return this.getGroup(t);
        }
        indexOfGroup(e) {
          for (let t = 0; t < this.groupInfo.length; t++) if (e(this.groupInfo[t])) return t;
          return -1;
        }
        updateGroupInfo(e, t) {
          const i = this.groupInfo[e].sid;
          delete this.groupInfoMap[i];
          const s = Object.assign({ sid: i }, t);
          this.groupInfo.splice(e, 1, s), (this.groupInfoMap[i] = s);
        }
        get groupCount() {
          return this.groupIndices.length;
        }
        get length() {
          return this.contents.length;
        }
        get(e) {
          return this.contents.get(e);
        }
        push(e) {
          if (0 === this.groupCount)
            throw Error('Grouper: Error pushing points when we have no groups!');
          return this.contents.push(e.clone()), this.contents.length;
        }
        pop() {
          return this.removeFromIdx(this.contents.length - 1);
        }
        removeFromIdx(e) {
          if (e < this.contents.length && e >= 0 && this.contents.length >= 0) {
            const t = this.contents.get(e);
            return this.contents.remove(e), this.removeEmptyGroups(), t;
          }
        }
        removeEmptyGroups() {
          this.contents.length <= this.groupIndices[this.groupCount - 1] &&
            this.removeGroup(this.groupCount - 1);
        }
        groupFromPointIndex(e) {
          if (0 > e || e >= this.length) return -1;
          let t = this.groupCount - 1;
          for (; e < this.groupIndices[t]; ) --t;
          return t;
        }
        removeGroup(e) {
          if (e > this.groupCount || e < 0) return;
          const t = this.getGroup(e);
          if (0 === t.count) return;
          const i = this.groupIndices[e];
          this.groupIndices.splice(e, 1),
            this.groupInfo.splice(e, 1),
            delete this.groupInfoMap[t.info.sid],
            delete this.groupIndicesMap[i];
          for (let i = e; i < this.groupCount; ++i) {
            const e = this.groupIndices[i],
              s = e - t.count;
            (this.groupIndices[i] = s),
              delete this.groupIndicesMap[e],
              (this.groupIndicesMap[s] = !0);
          }
          this.contents.splice(t.startIndex, t.count);
        }
        update(e, t) {
          this.contents.update(e, t.clone());
        }
        copy(e, t = !0) {
          return (
            t && this.reset(),
            this.contents.atomic(() => {
              for (const t of e) {
                this.startGroup(t.info);
                for (const e of t) this.push(e);
              }
            }),
            this
          );
        }
        toString() {
          return `Grouper: { groupCount: ${this.groupCount}, length: ${this.length}, groups: [${[...this.groups()].map((e) => `${e}`)}]}`;
        }
      }
      class we {
        constructor(e, t, i, s, n) {
          (this.index = e),
            (this.grouper = t),
            (this.startIndex = i),
            (this.endIndex = s),
            (this.data = n);
        }
        *[Symbol.iterator]() {
          for (let e = 0; e < this.count; ++e) yield this.get(e);
        }
        get(e) {
          if (!this.has(e)) throw RangeError(`Out of range error ${e} / ${this.count - 1}`);
          return this.grouper.get(this.startIndex + e);
        }
        has(e) {
          return e >= 0 && this.startIndex + e <= this.endIndex;
        }
        get count() {
          return this.endIndex - this.startIndex + 1;
        }
        get info() {
          return this.data;
        }
        get isClosed() {
          const e = this.grouper.get(this.startIndex),
            t = this.grouper.get(this.endIndex);
          return this.count > 2 && e.distanceTo(t) <= 0.001;
        }
        get length() {
          let e = 0,
            t = null;
          for (let i = 0; i < this.count; i++)
            t && (e += this.get(i).distanceTo(t)), (t = this.get(i));
          return e;
        }
        get segmentLengths() {
          const e = [];
          let t = null;
          for (let i = 0; i < this.count; i++)
            t && e.push(this.get(i).distanceTo(t)), (t = this.get(i));
          return e;
        }
        hasLength() {
          const e = this.grouper.get(this.startIndex),
            t = this.grouper.get(this.endIndex);
          return e && t && (this.isClosed || e.distanceTo(t) > 0.001);
        }
        clone() {
          const e = [],
            t = { get: (t) => e[t], contents: e };
          for (let e = 0; e < this.count; e++) t.contents.push(this.get(e));
          return new we(this.index, t, 0, t.contents.length - 1, Object.assign({}, this.data));
        }
        describe(e = this.endIndex) {
          return `GroupSegment${this.index}/${this.startIndex}/${e}}`;
        }
        equals(e) {
          if (this.count !== e.count || this.index !== e.index) return !1;
          if ((0, ve.NK)(this.info, e.info)) return !1;
          for (let t = 0; t < this.count; ++t) if (!this.get(t).equals(e.get(t))) return !1;
          return !0;
        }
      }
      var be,
        De,
        Se = i(53462),
        Ie = i(14778),
        Pe = i(59491);
      !(function (e) {
        (e[(e.ADDED = 0)] = 'ADDED'),
          (e[(e.REMOVED = 1)] = 'REMOVED'),
          (e[(e.UPDATED = 2)] = 'UPDATED'),
          (e[(e.COUNT = 3)] = 'COUNT');
      })(be || (be = {})),
        (function (e) {
          (e[(e.ADDED = 1)] = 'ADDED'),
            (e[(e.REMOVED = 2)] = 'REMOVED'),
            (e[(e.UPDATED = 4)] = 'UPDATED'),
            (e[(e.ALL = 7)] = 'ALL');
        })(De || (De = {}));
      const Te = (e, t) => {
        const i = t & De.ADDED,
          s = t & De.REMOVED,
          n = t & De.UPDATED,
          a = {};
        let o;
        return new Pe.gm(
          () => e,
          (t) =>
            (o = e.onElementChanged(
              ((e) => (
                (a.onAdded = i ? e : void 0),
                (a.onRemoved = s ? e : void 0),
                (a.onUpdated = n ? e : void 0),
                a
              ))(t),
            )),
          (e) => {
            o && o.cancel();
          },
        );
      };
      var Ee;
      !(function (e) {
        (e[(e.x = 16711680)] = 'x'),
          (e[(e.y = 32768)] = 'y'),
          (e[(e.z = 255)] = 'z'),
          (e[(e.free = 16777215)] = 'free'),
          (e[(e.xz = 16711935)] = 'xz'),
          (e[(e.laser = 16724312)] = 'laser'),
          (e[(e.yellow = 16776960)] = 'yellow'),
          (e[(e.white = 16777215)] = 'white');
      })(Ee || (Ee = {}));
      var Me = i(26059),
        Ce = i(25565);
      class xe {
        constructor(e, t, i, s, n, a, o = () => -1, r, h = 16777215) {
          (this.points = e),
            (this.createPointSubscription = t),
            (this.cameraData = i),
            (this.lineModule = s),
            (this.mainLayer = n),
            (this.lineLayer = a),
            (this.selectedGroup = o),
            (this.getLineDetails = r),
            (this.lineColor = h),
            (this.endpointGeometry = (0, Ce.fc)()),
            (this.linePool = []),
            (this.groupToLines = {}),
            (this.pointToLines = {}),
            (this.activeLines = []),
            (this.cameraQuaternion = new y.Quaternion()),
            (this.cameraPosition = new y.Vector3()),
            (this.cameraProjection = new Se.M()),
            (this.getLinesForPoint = (e) => {
              const t = [];
              if (this.pointToLines[e])
                for (const i of this.pointToLines[e]) {
                  const e = i.getMesh(Ie.B.line),
                    { startIndex: s, endIndex: n, group: a } = e.userData;
                  t.push({ endIndex: n, startIndex: s, line: i, group: a });
                }
              return t;
            }),
            this.updateMaterialColors(this.lineColor),
            (this.dataSubs = [
              this.createPointSubscription(De.REMOVED, (e, t) => {
                this.resetLines();
              }),
            ]);
        }
        updateMaterialColors(e) {
          const t = D.V9.lineDefault;
          (this.lineMaterial = this.lineModule.makeLineMaterial(e, !0, { linewidth: t })),
            this.setStencilState(this.lineMaterial),
            (this.endpointMaterial = this.lineModule.makeEndpointMaterial(e));
          const i = {
            dashed: !0,
            dashSize: 0.025,
            gapSize: 0.05,
            linewidth: D.V9.dottedLineDefault,
          };
          (this.dottedLineMaterial = this.lineModule.makeLineMaterial(e, !1, i)),
            this.setStencilState(this.dottedLineMaterial),
            (this.xLineMaterial = this.lineModule.makeLineMaterial(Ee.x, !1, i)),
            (this.yLineMaterial = this.lineModule.makeLineMaterial(Ee.y, !1, i)),
            (this.zLineMaterial = this.lineModule.makeLineMaterial(Ee.z, !1, i)),
            (this.xzLineMaterial = this.lineModule.makeLineMaterial(Ee.xz, !1, i));
        }
        setStencilState(e) {
          (e.stencilRef = 1),
            (e.stencilFail = y.KeepStencilOp),
            (e.stencilZFail = y.KeepStencilOp),
            (e.stencilZPass = y.KeepStencilOp),
            (e.stencilFunc = y.GreaterStencilFunc),
            (e.stencilWrite = !0);
        }
        setLineOpacityByGroup(e, t) {
          const i = this.groupToLines[e];
          if (i) for (const e of i) e.opacity(t);
        }
        setLineOpacityByPoint(e, t) {
          const i = this.getLinesForPoint(e);
          if (i) for (const e of i) e.line.opacity(t);
        }
        resetLines() {
          for (const e of this.lines) e.opacity(0), e.hide();
          (this.groupToLines = {}), (this.pointToLines = {}), (this.lines.length = 0);
        }
        updateAllLines() {
          if (!(this.points.length < 1)) {
            for (let e = 0; e < this.points.length; e++) this.updateLine(e);
            for (const e in this.groupToLines) {
              const t = Number(e),
                i = this.groupToLines[t];
              for (const e of i) e.updateSelected(this.selectedGroup() === t);
            }
          }
        }
        init() {}
        dispose() {
          this.deactivate();
          for (const e of this.linePool) e.dispose();
          this.endpointGeometry.dispose(),
            this.dottedLineMaterial.dispose(),
            this.lineMaterial.dispose(),
            this.endpointMaterial.dispose(),
            this.xLineMaterial.dispose(),
            this.yLineMaterial.dispose(),
            this.zLineMaterial.dispose();
        }
        activate() {
          for (const e of this.dataSubs) e.renew();
        }
        deactivate() {
          for (const e of this.dataSubs) e.cancel();
          this.resetLines();
        }
        get lines() {
          return this.activeLines;
        }
        get dottedMaterial() {
          return this.dottedLineMaterial;
        }
        beforeRender() {
          this.cameraQuaternion.copy(this.cameraData.pose.rotation),
            this.cameraPosition.copy(this.cameraData.pose.position),
            this.cameraProjection.copy(this.cameraData.pose.projection);
        }
        get xMaterial() {
          return this.xLineMaterial;
        }
        get yMaterial() {
          return this.yLineMaterial;
        }
        get zMaterial() {
          return this.zLineMaterial;
        }
        get xzMaterial() {
          return this.xzLineMaterial;
        }
        render() {
          this.updateAllLines();
        }
        updateLine(e) {
          const t = this.points.get(e),
            i = this.points.get(e + 1),
            s = this.points.groupFromPointIndex(e) === this.points.groupFromPointIndex(e + 1);
          t && i && s && this.setLinePosition(e, t, i);
        }
        setLinePosition(e, t, i) {
          let s = this.linePool[e];
          if (!s) {
            const n = this.points.groupFromPointIndex(e);
            if (!this.getLineDetails(n, e, e + 1).visible) return;
            const a = D.V9.endpointDefault > 0.01 ? this.endpointMaterial.clone() : void 0;
            (s = this.lineModule.makeLine(
              t,
              i,
              this.lineMaterial.clone(),
              a,
              () => !(0, Me.Pp)(this.cameraProjection),
            )),
              this.setupLine(s, e),
              s.setRenderLayer(this.mainLayer);
          }
          s.visible || this.setupLine(s, e),
            (this.linePool[e] = s),
            s.updateResolution(this.cameraData.width, this.cameraData.height),
            s.updatePositions(t, i),
            s.updateBillboard({
              rotation: this.cameraQuaternion,
              position: this.cameraPosition,
              projection: this.cameraProjection,
            });
        }
        setupLine(e, t) {
          const i = this.points.groupFromPointIndex(t);
          e.children.forEach((e) => {
            (e.userData.startIndex = t),
              (e.userData.endIndex = t + 1),
              (e.userData.group = i),
              (e.layers.mask = this.mainLayer.mask);
          }),
            (e.getMesh(Ie.B.line).layers.mask = this.lineLayer.mask),
            this.activeLines.push(e),
            this.addLineToGroup(i, e),
            this.addLineToPoint(t, e),
            this.addLineToPoint(t + 1, e),
            e.show(),
            e.opacity(0);
        }
        addLineToGroup(e, t) {
          this.groupToLines[e] || (this.groupToLines[e] = []), this.groupToLines[e].push(t);
        }
        addLineToPoint(e, t) {
          this.pointToLines[e] || (this.pointToLines[e] = []), this.pointToLines[e].push(t);
        }
      }
      var Re = i(96783),
        Le = i(11250),
        Ae = i(79242),
        Fe = i(86210),
        ke = i(21676);
      class Oe extends y.Mesh {}
      class Ve {
        constructor(e, t, i, s, n, a, o, r, h, d, l) {
          (this.points = e),
            (this.input = t),
            (this.mobile = i),
            (this.cameraData = s),
            (this.renderLayer = n),
            (this.renderOrder = a),
            (this.textRenderer = o),
            (this.getLineDetails = r),
            (this.changeCursor = h),
            (this.getPhase = d),
            (this.setSelectedLine = l),
            (this.meshPool = []),
            (this.textContainer = new y.Object3D()),
            (this.textGeometry = new y.PlaneGeometry(1, 1)),
            (this.tmpMidpoint = new y.Vector3()),
            (this.tmpCamPos = new y.Vector3()),
            (this.cameraRotation = new y.Quaternion()),
            (this.cameraProjection = new Se.M()),
            (this.cameraPosition = new y.Vector3());
          (this.inputSubs = [
            this.input.registerMeshHandler(Ae.Rd, ke.s.isType(Oe), (e, t) => {
              var i, s;
              if (this.getPhase() === Y.au.IDLE)
                return (
                  this.setSelectedLine(
                    null ===
                      (s =
                        null === (i = null == t ? void 0 : t.parent) || void 0 === i
                          ? void 0
                          : i.userData) || void 0 === s
                      ? void 0
                      : s.groupIndex,
                  ),
                  !0
                );
            }),
          ]),
            this.mobile || this.inputSubs.push(...this.registerHoverHandlers()),
            this.deactivate(),
            this.deactivateInteraction();
        }
        registerHoverHandlers() {
          return [
            this.input.registerMeshHandler(Fe.z, ke.s.isType(Oe), () => {
              this.getPhase() === Y.au.IDLE && this.changeCursor(l.C.FINGER);
            }),
            this.input.registerMeshHandler(Fe.A, ke.s.isType(Oe), () => {
              this.changeCursor(l.C.DEFAULT);
            }),
          ];
        }
        reset() {
          for (const e of this.meshPool)
            e && (this.input.unregisterMesh(e.collider), this.textContainer.remove(e));
          this.meshPool = [];
        }
        init() {}
        dispose() {
          this.textGeometry.dispose();
        }
        activate() {}
        deactivate() {
          this.reset();
        }
        activateInteraction() {
          for (const e of this.inputSubs) e.renew();
        }
        deactivateInteraction() {
          for (const e of this.inputSubs) e.cancel();
        }
        get container() {
          return this.textContainer;
        }
        beforeRender() {
          const e = this.cameraData.pose;
          this.cameraRotation.copy(e.rotation),
            this.cameraPosition.copy(e.position),
            this.cameraProjection.copy(e.projection);
          const t = (0, Me.s1)(this.cameraProjection),
            i = (0, Me.Pp)(this.cameraProjection),
            s = this.cameraData.height,
            n = this.cameraData.zoom(),
            a = this.cameraData.aspect();
          for (let e = 1; e < this.points.length; ++e) {
            const o = e - 1,
              r = this.points.groupFromPointIndex(e),
              h = this.getLineDetails(r, o, e);
            if (!h || r !== this.points.groupFromPointIndex(o)) {
              this.removeLabelMesh(e);
              continue;
            }
            const d = this.points.get(o),
              l = this.points.get(e),
              c = this.setMeshVisible(e, h.labelVisible);
            if (!c) continue;
            c.text !== h.labelContents && (c.text = h.labelContents);
            const u = this.cameraPosition.distanceTo(c.position);
            if (
              (this.updateMeshPose(
                c,
                d,
                l,
                this.cameraRotation,
                this.cameraPosition,
                u,
                h.rotation,
                i,
              ),
              i || t)
            )
              c.scaleFactor = me * n;
            else {
              const e = (0, Le.D_)(
                  c.position,
                  this.cameraPosition,
                  this.cameraRotation,
                  this.cameraProjection.asThreeMatrix4(),
                ),
                t = Math.abs(e.x);
              if (t < 1) {
                const e = (0, Me.mY)(this.cameraProjection, this.cameraPosition, c.position, s, ce),
                  i = ((0, Re.uZ)(a, 1, 2.5) + n) * pe,
                  o = 1 + ue - t * ue - i;
                c.scaleFactor = Math.max(Math.min((1 / e) * o, 3), 0.001);
              } else c.scaleFactor = 0.001;
            }
          }
          for (let e = this.points.length; e < this.meshPool.length; e++) this.removeLabelMesh(e);
          this.meshPool = this.meshPool.slice(0, this.points.length);
        }
        setTextOpacityByPoint(e, t) {
          const i = this.meshPool[e];
          i && (i.opacity = t);
        }
        updateMeshPose(e, t, i, s, n, a, o, r) {
          this.tmpMidpoint.copy(t).add(i).multiplyScalar(0.5);
          const h = r
            ? (e) => this.tmpCamPos.copy(e).addScaledVector(Q.fU.UP, 0.15)
            : (e) =>
                this.tmpCamPos
                  .copy(n)
                  .sub(e)
                  .setLength(0.15 * a)
                  .add(e);
          e.setPosition(this.tmpMidpoint, h), e.setOrientation(s, o);
        }
        render() {}
        setMeshVisible(e, t) {
          let i = this.meshPool[e];
          if (!i && t) {
            (i = this.textRenderer.createLabel()),
              i.setRenderLayer(this.renderLayer),
              (i.renderOrder = this.renderOrder),
              (i.opacity = 1),
              (i.visible = !1);
            const t = this.points.groupFromPointIndex(e);
            (i.userData.groupIndex = t),
              this.textContainer.add(i),
              this.input.registerMesh(i.collider, !1),
              (this.meshPool[e] = i);
          }
          if (i) {
            const e = t ? 0.001 : D.iV.LABEL_HIDDEN_OPACITY;
            if (((i.visible = i.opacity > e), !i.visible)) return null;
          }
          return i;
        }
        removeLabelMesh(e) {
          const t = this.meshPool[e];
          t &&
            (this.textContainer.remove(t),
            t.dispose(),
            this.input.unregisterMesh(t.collider),
            (this.meshPool[e] = null));
        }
      }
      var Be = i(63511);
      const Ne = i.p + 'images/scope.svg';
      var Ge = i(71472),
        He = i(95142),
        _e = i(33716),
        Ue = i(70102);
      const We = i.p + 'images/vert_arrows.png',
        ze = i.p + 'images/surface_grid_planar_256.png';
      var je = i(72803);
      class $e {
        constructor(e, t = Be.o.ALL) {
          (this.scene = e),
            (this.layer = t),
            (this.supportsMobile = !0),
            (this.style = Ue.L.GridPlane),
            (this.alignToNormal = !0),
            (this.xzTex = (0, Ge.p)(We)),
            (this.zyTex = (0, Ge.p)(ze)),
            (this.bindings = []),
            (this.onOpacityUpdate = (e) => {
              this.container.children.forEach((t) => {
                t.isMesh && (t.material.opacity = Math.max(0, e.opacity.value));
              });
            }),
            (this.onPositionUpdate = (e, t) => {
              this.container.position.copy(e).addScaledVector(t, 0.005),
                this.alignToNormal && (0, Me.J2)(this.container, e, t);
            }),
            (this.scale = (e) => {
              this.container.scale.set(e, e, e);
            }),
            (this.onRaycasterUpdate = (e) => {
              e.hit && e.hit.face && this.onPositionUpdate(e.hit.point.clone(), e.hit.face.normal);
            }),
            (this.container = new y.Group());
          const i = new y.PlaneGeometry(0.4, 0.4),
            s = {
              color: 16777215,
              side: y.DoubleSide,
              transparent: !0,
              depthTest: !0,
              depthWrite: !1,
            };
          (this.xzTex.generateMipmaps = !1),
            (this.xzTex.minFilter = y.LinearFilter),
            (this.xzMaterial = new y.MeshBasicMaterial(
              Object.assign(Object.assign({}, s), { color: 65280, map: this.xzTex }),
            )),
            (this.xzMaterial.premultipliedAlpha = !1);
          const n = new y.Mesh(i, this.xzMaterial);
          n.rotateOnAxis(Q.fU.LEFT, Math.PI / 2),
            (this.zyTex.generateMipmaps = !1),
            (this.zyTex.minFilter = y.NearestFilter),
            (this.zyMaterial = new y.MeshBasicMaterial(
              Object.assign(Object.assign({}, s), { map: this.zyTex }),
            )),
            (this.zyMaterial.premultipliedAlpha = !1);
          const a = new y.Mesh(i, this.zyMaterial);
          this.container.add(n, a),
            this.container.children.forEach((e) => {
              (e.renderOrder = je.z.reticule), (e.layers.mask = this.layer.mask);
            });
        }
        init() {}
        render() {}
        dispose() {
          this.container.children.forEach((e) => {
            if (e.isMesh) {
              e.geometry.dispose();
              const t = e.material;
              t.dispose(), t.map && t.map.dispose();
            }
          });
        }
        async activate(e) {
          const t = await e.market.waitForData(He.Y),
            i = await e.market.waitForData(_e.P);
          this.bindings.push(
            t.onChanged(this.onOpacityUpdate),
            i.onChanged(this.onRaycasterUpdate),
          ),
            this.scene.add(this.container);
        }
        deactivate(e) {
          for (const e of this.bindings) e.cancel();
          (this.bindings.length = 0), this.scene.remove(this.container);
        }
        setVisible(e) {
          this.container.visible = e;
        }
      }
      var qe = i(32197);
      class Ze {
        constructor(e, t, i, s, n, a) {
          (this.mobile = e),
            (this.pointer = t),
            (this.sceneInfo = i),
            (this.renderToTexture = s),
            (this.getLayer = n),
            (this.editing = !1),
            (this.editingStateChange = !1),
            (this.setupCursorRenderCamera = () => {
              const e = new y.PerspectiveCamera(re.perspective.fov, 1, 0.1, 100);
              e.name = 'Cursor Peek Camera';
              const t = Be.o.ALL,
                i = ['measurement-mode', 'measurement3d'];
              for (const e of i) t.removeLayers(this.getLayer(e));
              (e.layers.mask = t.mask), e.updateProjectionMatrix();
              return {
                camera: e,
                update: (t, i, s) => {
                  (e.fov = t), (e.near = i), (e.far = s), e.updateProjectionMatrix();
                },
              };
            });
          const o = (0, Ge.p)(Ne),
            r = new y.Vector2(),
            h = (e) => {
              const t = this.rttView.height,
                i = this.rttView.width,
                s = this.sceneInfo.cameraData;
              let n = t / 2;
              const a = -i / 2;
              n = e.y < t / 2 + n ? t + n : -n;
              const o = e.x + a,
                h = s.height - e.y - n;
              return r.set(o, h);
            };
          (this.cursorMesh = new $e(this.sceneInfo.scene, this.getLayer('cursor-mesh'))),
            this.cursorMesh.setVisible(!1);
          const d = new y.Vector3(),
            l = new y.Quaternion(),
            c = new y.Vector2();
          let u,
            p,
            m = a(),
            g = re.perspective;
          this.renderIntersection = (e, t, n) => {
            u ||
              ((p = this.setupCursorRenderCamera()),
              (u = p.camera),
              p.update(re.perspective.fov, 0.1, 100)),
              m !== a() &&
                ((g = a() ? re.ortho : re.perspective),
                this.cursorMesh.scale(g.scale),
                p.update(g.fov, 0.1, 100),
                (m = a()));
            const r = this.editingStateChange ? 1 : re.smoothness;
            if (t) {
              if ((i.playerCamera.getWorldPosition(d), i.playerCamera.getWorldQuaternion(l), a())) {
                const e = i.cameraData.zoom(),
                  s = (0, qe.dS)(e, g.thresholdClose, g.thresholdFar, g.offsetClose, g.offsetFar);
                u.position.copy(t.point).addScaledVector(Q.fU.UP, s), u.quaternion.copy(l);
              } else {
                const e = (0, qe.dS)(
                    t.distance,
                    g.thresholdClose,
                    g.thresholdFar,
                    g.offsetClose,
                    g.offsetFar,
                  ),
                  i = d.sub(t.point).setLength(e).add(t.point);
                u.position.lerp(i, r), u.lookAt(t.point);
              }
              u.updateMatrixWorld(),
                s.render(e, i.scene.scene, u),
                c.lerp(h(n), r),
                s.renderToScreen(e, !1, c, o);
            }
            this.editingStateChange = !1;
          };
        }
        init() {}
        dispose() {}
        activate() {
          this.sceneInfo.scene.addChild(d.a.Root, this.cursorMesh.container);
          const e = this.mobile ? oe : this.sceneInfo.cameraData.height > se ? ae : ne;
          this.rttView = this.renderToTexture.createRenderTarget2D(
            e,
            e,
            { format: y.RGBAFormat },
            !1,
          );
        }
        setMeasuringPhase(e) {
          const t = this.mobile ? !!Y.Pj.mobile[e] : !!Y.Pj.desktop[e];
          t !== this.editing &&
            ((this.editingStateChange = !0),
            (this.editing = t),
            this.cursorMesh.setVisible(this.editing));
        }
        deactivate() {
          this.sceneInfo.scene.removeChild(d.a.Root, this.cursorMesh.container),
            this.renderToTexture.disposeRenderTarget2D(this.rttView),
            (this.editing = !1);
        }
        beforeRender() {
          this.editing &&
            ((this.hit = this.mobile
              ? this.pointer.lastIntersection
              : this.pointer.getIntersection()),
            this.hit && this.cursorMesh.onPositionUpdate(this.hit.point, this.hit.normal));
        }
        render() {
          if (this.editing && this.hit) {
            const { screenPosition: e } = (0, Le.q9)(this.sceneInfo.cameraData, this.hit.point);
            this.renderIntersection(this.rttView, this.hit, e);
          }
        }
      }
      var Ye,
        Xe = i(97140),
        Ke = i(49940),
        Qe = i(3655);
      !(function (e) {
        (e[(e.SnapPoint = 1)] = 'SnapPoint'),
          (e[(e.SnapLine = 2)] = 'SnapLine'),
          (e[(e.AxisAny = 3)] = 'AxisAny'),
          (e[(e.AxisX = 4)] = 'AxisX'),
          (e[(e.AxisY = 5)] = 'AxisY'),
          (e[(e.AxisZ = 6)] = 'AxisZ'),
          (e[(e.Mesh = 7)] = 'Mesh'),
          (e[(e.RoomMesh = 8)] = 'RoomMesh'),
          (e[(e.LinePoint = 9)] = 'LinePoint'),
          (e[(e.LineSegment = 10)] = 'LineSegment');
      })(Ye || (Ye = {}));
      class Je extends Qe.FM {
        constructor(e, t, i) {
          super(e, t), (this.featureType = i);
        }
      }
      class et extends Qe.FM {
        constructor(e, t, i) {
          super(e, t), (this.featureType = i);
        }
      }
      const tt = {
        [Q.eD.UP]: Ye.AxisY,
        [Q.eD.DOWN]: Ye.AxisY,
        [Q.eD.FORWARD]: Ye.AxisZ,
        [Q.eD.BACK]: Ye.AxisZ,
        [Q.eD.LEFT]: Ye.AxisX,
        [Q.eD.RIGHT]: Ye.AxisX,
        [Q.eD.HORIZONTAL_PLANE]: Ye.AxisY,
        NONE: void 0,
      };
      var it;
      !(function (e) {
        (e[(e.UserAxis = 1)] = 'UserAxis'),
          (e[(e.UserPoint = 2)] = 'UserPoint'),
          (e[(e.UserLine = 3)] = 'UserLine'),
          (e[(e.ModelFeature = 4)] = 'ModelFeature');
      })(it || (it = {}));
      const st = {
        [Ye.LinePoint]: it.UserPoint,
        [Ye.LineSegment]: it.UserLine,
        [Ye.AxisAny]: it.UserAxis,
        [Ye.AxisX]: it.UserAxis,
        [Ye.AxisY]: it.UserAxis,
        [Ye.AxisZ]: it.UserAxis,
        [Ye.Mesh]: it.ModelFeature,
        [Ye.RoomMesh]: it.ModelFeature,
        [Ye.SnapLine]: it.ModelFeature,
        [Ye.SnapPoint]: it.ModelFeature,
      };
      class nt {
        constructor(e, t, i, s) {
          (this.constraint = t),
            (this.meshQuery = i),
            (this.point = new y.Vector3()),
            (this.normal = new y.Vector3()),
            at(e, i)
              ? this.updateFromIntersection(e, t)
              : ot(e, i) && s && this.updateFromSnapIntersection(e, t, s),
            (this.source = e);
        }
        updatePoint(e) {
          return this.point.copy(e), this.source.point.copy(e), this;
        }
        updateFromIntersection(e, t) {
          return (
            (this.source = e),
            this.updateContents(t, e.point, e.face.normal, e.distance, e.object),
            this
          );
        }
        updateFromSnapIntersection(e, t, i) {
          return (this.source = e), this.updateContents(t, e.point, i, e.distance, e.object), this;
        }
        copy({ constraint: e, point: t, normal: i, distance: s, object: n }) {
          this.updateContents(e, t, i, s, n);
        }
        clone() {
          return new nt(this.source, this.constraint, this.meshQuery);
        }
        updateContents(e, t, i, s, n) {
          (this.constraint = e),
            this.point.copy(t),
            this.normal.copy(i),
            (this.distance = s),
            (this.object = n);
          const a = this.meshQuery.roomIdFloorIdFromObject(n);
          a && ((this.roomId = a.roomId || null), (this.floorId = a.floorId)),
            (this.featureType = ((e) => {
              if (e)
                return 'featureType' in e && void 0 !== e.featureType
                  ? e.featureType
                  : e instanceof y.Vector3 || e instanceof Qe.UQ
                    ? Ye.SnapPoint
                    : Xe.$4.isRoomMesh(e)
                      ? Ye.RoomMesh
                      : e instanceof Ke.S
                        ? Ye.Mesh
                        : e instanceof y.Line3 || e instanceof Qe.FM
                          ? Ye.SnapLine
                          : void 0;
            })(n));
        }
      }
      const at = (e, t) =>
          e &&
          'face' in e &&
          void 0 !== e.face &&
          (t.floorIdFromObject(e.object) || e.object.floorId),
        ot = (e, t) => e && 'isLineOctreeIntersection' in e && t.floorIdFromObject(e.object),
        rt = (() => {
          class e extends y.Object3D {
            constructor(e, t, i, s) {
              super(),
                (this.floorId = e),
                (this.roomId = t),
                (this.meshGroup = i),
                (this.meshSubGroup = s);
            }
          }
          return (t, i, s, n, a, o, r) => ({
            point: t,
            object: new e(n, a, o, r),
            face: { a: 0, b: 1, c: 2, normal: i, materialIndex: 0 },
            distance: s,
          });
        })();
      var ht = i(45602),
        dt = i(41513),
        lt = i(95840),
        ct = i(47426);
      class ut extends y.Mesh {
        constructor(e, t, i, s, n, a, o, r, h, d, l, c) {
          super(),
            (this.pointGroups = e),
            (this.input = t),
            (this.cameraData = i),
            (this.mobile = s),
            (this.changeCursor = n),
            (this.getPhase = a),
            (this.changePhase = o),
            (this.restorePreviousPhase = r),
            (this.setSelectedLine = h),
            (this.getSelected = d),
            (this.onDragStart = l),
            (this.onDragEnd = c),
            (this.inputSubscriptions = []),
            (this.groupVisible = []),
            (this.raycast = (() => {
              const e = new y.Vector3(),
                t = new y.Vector3(),
                i = new y.Vector3(),
                s = (e, t, i) => {
                  if (e.isOrtho()) return i.copy(t);
                  {
                    const s = D.iV.OFFSET_TOWARDS_CAMERA;
                    return i.copy(e.position).sub(t).setLength(s).add(t);
                  }
                };
              return (n, a) => {
                const { pose: o, width: r } = this.cameraData,
                  h = this.mobile ? 3 : -2,
                  d = D.V9.lineDefault + h,
                  l = o.projection.asThreeMatrix4(),
                  c = o.position;
                let u,
                  p = 0,
                  m = 0;
                for (let a = 0; a < this.pointGroups.groupCount; ++a) {
                  const h = this.pointGroups.getGroup(a);
                  if (
                    !(void 0 !== this.editingGroup && this.editingGroup !== a) &&
                    this.groupVisible[a]
                  ) {
                    for (let g = 0; g < h.count - 1; ++g) {
                      const v = s(o, h.get(g), t),
                        f = s(o, h.get(g + 1), i);
                      if (v && f) {
                        const t = n.ray.distanceSqToSegment(v, f, void 0, e),
                          i = c.distanceTo(e);
                        let s = (0, Me._U)(i, l, r) * d;
                        if (((s *= s), t < s)) {
                          let i,
                            o = e;
                          this.editingPointIndex
                            ? (i = this.editingPointIndex)
                            : v.distanceToSquared(e) < 2 * s
                              ? ((i = m), (o = v))
                              : f.distanceToSquared(e) < 2 * s && ((i = m + 1), (o = f)),
                            (!u || t < p) &&
                              ((u = {
                                distance: n.ray.origin.distanceTo(o),
                                point: o,
                                object: this,
                                instanceId: a,
                                index: i,
                              }),
                              (p = t));
                        }
                      }
                      m++;
                    }
                    m++;
                  } else m += h.count;
                }
                u && a.push(u);
              };
            })()),
            this.inputSubscriptions.push(...this.registerCommonInput()),
            s || this.inputSubscriptions.push(...this.registerHoverInput()),
            this.deactivate();
        }
        activate() {
          this.input.registerMesh(this, !1), this.inputSubscriptions.forEach((e) => e.renew());
        }
        deactivate() {
          this.input.unregisterMesh(this), this.inputSubscriptions.forEach((e) => e.cancel());
        }
        dispose() {
          this.deactivate();
        }
        setEditingGroup(e) {
          this.editingGroup = e;
        }
        setGroupVisible(e, t) {
          this.groupVisible[e] = t;
        }
        validJoint(e) {
          return !!e && void 0 !== e.index;
        }
        registerHoverInput() {
          return [
            this.input.registerMeshHandler(Fe.z, ke.s.isType(ut), (e, t, i) => {
              this.getPhase() === Y.au.IDLE &&
                this.changeCursor(i && void 0 !== i.index ? l.C.GRAB : l.C.FINGER);
            }),
            this.input.registerMeshHandler(Fe.A, ke.s.isType(ut), (e, t, i) => {
              this.getPhase() === Y.au.IDLE && this.changeCursor(l.C.DEFAULT);
            }),
          ];
        }
        registerCommonInput() {
          return [
            this.input.registerMeshHandler(Ae.Rd, ke.s.isType(ut), (e, t, i) => {
              if (!(0, ct._)(e)) return !1;
              if (this.getPhase() !== Y.au.IDLE) return !1;
              const s = i && void 0 !== i.instanceId ? i.instanceId : -1,
                n = this.getSelected() === s ? -1 : s;
              return this.setSelectedLine(n), !0;
            }),
            this.input.registerMeshHandler(
              lt._t,
              ke.s.isType(ut),
              (e, t, i) =>
                !!(0, ct._)(e) &&
                !!Y.WN[this.getPhase()] &&
                (!this.validJoint(i) ||
                  !i ||
                  void 0 === i.instanceId ||
                  (this.getPhase() === Y.au.EDITING ||
                    ((this.editingPointIndex = i.index),
                    this.onDragStart(i.instanceId),
                    this.setSelectedLine(i.instanceId),
                    this.changePhase(Y.au.EDITING),
                    this.mobile || this.changeCursor(l.C.GRABBING)),
                  !0)),
            ),
            this.input.registerMeshHandler(
              lt._R,
              ke.s.isType(ut),
              (e, t, i) =>
                this.getPhase() === Y.au.EDITING &&
                ((this.editingPointIndex = void 0),
                this.restorePreviousPhase(),
                this.onDragEnd(),
                this.mobile || this.changeCursor(l.C.DEFAULT),
                !0),
            ),
          ];
        }
      }
      const pt = new f.Z('snapping');
      class mt {
        constructor(e, t, i, s, n, a, o) {
          (this.raycaster = e),
            (this.getConstraintStyle = t),
            (this.floorsViewData = s),
            (this.viewmodeData = n),
            (this.meshQuery = a),
            (this.cameraPoseData = o),
            (this.origin = null),
            (this.planeNormal = new y.Vector3()),
            (this.plane = new y.Plane()),
            (this.ray = new y.Ray()),
            (this.originChangedListeners = []),
            (this.registeredSnapFeatures = {
              [it.UserAxis]: [],
              [it.UserLine]: [],
              [it.UserPoint]: [],
              [it.ModelFeature]: [],
            }),
            (this.clearOrigin = () => {
              (this.origin = null), this.originChangedListeners.forEach((e) => e(null));
            }),
            (this.setOrigin = (e, t = !1) => {
              (this.origin && !t) ||
                ((this.origin = e),
                this.plane.setFromNormalAndCoplanarPoint(this.origin.normal, this.origin.point),
                this.originChangedListeners.forEach((e) => e(this.origin)),
                pt.debug('Updating origin', this.origin, { forceUpdate: t }));
            }),
            (this.setOriginFromPointer = (e) => {
              if (this.origin) return;
              const t = this.getMeshIntersection();
              if (!t) return;
              const i = new nt(t, this.getConstraintStyle(), this.meshQuery);
              e && i.updatePoint(e), this.setOrigin(i, !0);
            }),
            (this.snapFeatures = (e) =>
              this.registeredSnapFeatures[e].reduce((e, t) => e.concat(t.features), [])),
            (this.addSnapFeatures = (e, t, i) => {
              const s = st[t];
              this.registeredSnapFeatures[s].push({ owner: e, features: i }),
                pt.debug(`Adding ${i.length} snap feature groups`, Ye[t], t);
            }),
            (this.removeSnapFeatures = (e, t) => {
              const i = st[t],
                s = this.registeredSnapFeatures[i].findIndex((t) => t.owner === e);
              if (-1 !== s) {
                const e = this.registeredSnapFeatures[i].splice(s, 1);
                pt.debug(`Removing ${e.length} snap feature groups`, Ye[t], t);
              } else
                pt.debug(
                  `removeTemporarySnapFeature: ${t} ${Ye[t]} not found from`,
                  e,
                  this.registeredSnapFeatures,
                );
            }),
            (this.filters = {
              nop: (e) => !0,
              isNotMeasurementInput: (e) => !(e instanceof ut),
              meshVisible: (e) =>
                !!(0, dt.Pv)(e) &&
                (!this.viewmodeData.isDollhouse() ||
                  this.floorsViewData.isCurrentMeshGroupOrAllFloors(e.meshGroup)),
              visibleFloor: (e) => {
                const t = e.object;
                return (
                  !t ||
                  !t.meta ||
                  null == t.meta.meshGroup ||
                  this.floorsViewData.isCurrentMeshGroupOrAllFloors(t.meta.meshGroup)
                );
              },
              userPoints: (e) => {
                if (void 0 === e.object) return !1;
                if ((t = e.object) && t instanceof y.Vector3)
                  for (const t of this.snapFeatures(it.UserPoint))
                    if (t.equals(e.object)) return !0;
                var t;
                return !1;
              },
              userLines: (e) => {
                if (void 0 === e.object) return !1;
                if (
                  ((t = e.object) && 'isSnapAxisLine3' in t) ||
                  'isSnapUserLine3' in t ||
                  'isSnapLine3' in t ||
                  ('start' in t && 'end' in t && 'closestPointToPoint' in t)
                ) {
                  for (const t of this.snapFeatures(it.UserLine)) if (t.equals(e.object)) return !0;
                  for (const t of this.snapFeatures(it.UserAxis)) if (t.equals(e.object)) return !0;
                }
                var t;
                return !1;
              },
              userFeatures: (e) => this.filters.userPoints(e) || this.filters.userLines(e),
            }),
            (this.meshSnapRadius = i ? de : le);
        }
        preload() {
          this.raycaster.snapping.preloadMeshSnapping();
        }
        getMeshIntersection(e) {
          let t = [];
          const i =
            this.viewmodeData.isFloorplan() ||
            (this.viewmodeData.isDollhouse() && this.cameraPoseData.pitchFactor() < 0.01);
          if (e && e.origin && e.normal)
            t = this.raycaster.picking.cast(e.origin, e.normal, this.filters.meshVisible);
          else if (i) {
            const e = this.floorsViewData.getHighestVisibleFloor(),
              i = new y.Vector3(0, 1, 0),
              s = new y.Plane().setFromNormalAndCoplanarPoint(
                i,
                new y.Vector3(0, e.boundingBox.max.y, 0),
              ),
              n = new y.Vector3();
            if (this.raycaster.pointer.pointerRay.intersectPlane(s, n)) {
              const s = this.raycaster.pointer.pointerRay.origin.distanceTo(n);
              t = [rt(n, i, s, e.id, null, e.meshGroup, null)];
            }
          } else t = this.raycaster.pointer.cast(this.filters.meshVisible);
          const s = t[0];
          return at(s, this.meshQuery) ? s : null;
        }
        getIntersection(e) {
          const t = this.getMeshIntersection(e);
          if (!t) return null;
          this.cachedHit || (this.cachedHit = new nt(t, this.getConstraintStyle(), this.meshQuery));
          const i = this.cachedHit.updateFromIntersection(t, this.getConstraintStyle()),
            s = this.raycaster.pointer.pointerRay;
          this.ray.set(s.origin, s.direction), this.planeNormal.copy(i.normal);
          switch (this.getConstraintStyle()) {
            case J.Free:
              return i;
            case J.Axes:
              return this.lockToWorldAxes(i);
            case J.PlanarAxes:
              const e = [
                ...this.snapFeatures(it.UserAxis),
                ...this.snapFeatures(it.UserLine),
                ...this.snapFeatures(it.UserPoint),
              ];
              return this.softSnapToEdges(i, e, this.filters.userFeatures);
            case J.Edges:
              const t = [...this.snapFeatures(it.UserLine), ...this.snapFeatures(it.UserPoint)];
              return this.softSnapToEdges(i, t, this.filters.visibleFloor);
            case J.EdgesAndPlanarAxes:
              const s = [
                ...this.snapFeatures(it.UserAxis),
                ...this.snapFeatures(it.UserLine),
                ...this.snapFeatures(it.UserPoint),
              ];
              return this.softSnapToEdges(i, s, this.filters.visibleFloor);
          }
          return i;
        }
        get lastIntersection() {
          return this.cachedHit;
        }
        onOriginChanged(e, t = !1) {
          const i = {
            renew: () => {
              this.originChangedListeners.push(e);
            },
            cancel: () => {
              (0, ht.bX)(this.originChangedListeners, e);
            },
          };
          return t && i.renew(), i;
        }
        lockToWorldAxes(e) {
          if (this.origin) {
            const t = ie(this.origin.point, e.point, J.Axes);
            return (
              this.cachedHit.copy(e),
              this.cachedHit.point.copy(t.position),
              (this.cachedHit.constraint = 'NONE' !== t.axisName ? J.Axes : J.Free),
              (this.cachedHit.featureType = tt[t.axisName]),
              this.cachedHit
            );
          }
          return e;
        }
        softSnapToEdges(e, t, i) {
          const s = this.origin ? this.origin.point : e.point,
            n = this.origin ? this.origin.normal : e.normal;
          this.raycaster.snapping.add(...t);
          const a = this.raycaster.snapping.cast(this.ray, this.meshSnapRadius, s, n).filter(i),
            o = this.findClosestVisible(a);
          return (
            this.raycaster.snapping.remove(...t),
            o
              ? (this.cachedHit.updateFromSnapIntersection(o, this.getConstraintStyle(), n),
                this.cachedHit)
              : e
          );
        }
        findClosestVisible(e) {
          let t = null;
          const i = new y.Vector3();
          for (const s of e) {
            i.copy(s.point).sub(this.ray.origin).normalize();
            const e = this.raycaster.picking.pick(this.ray.origin, i, this.filters.meshVisible);
            if (!e || e.distance > s.distance - 0.05) {
              t = s;
              break;
            }
          }
          return t
            ? {
                isLineOctreeIntersection: !0,
                distance: t.distance,
                distanceToRay: t.distanceToRay,
                point: t.point,
                object: t.object,
              }
            : null;
        }
      }
      var gt = i(6394);
      class vt {
        constructor(e, t, i, s) {
          (this.points = e),
            (this.createPointSubscription = t),
            (this.pointer = i),
            (this.mobileCreateHackJob = s),
            (this.subscriptions = []),
            (this.lineSegments = []),
            (this.updateSnapping = (e) => {
              this.lineSegments.length > 0 &&
                (this.pointer.removeSnapFeatures(this, Ye.LineSegment),
                (this.lineSegments.length = 0));
              for (let t = 0; t < this.points.length; t++)
                if (t !== e && t !== e - 1 && t !== e + 1 && !this.points.isStartIndex(t)) {
                  const e = this.points.get(t),
                    i = this.points.get(t - 1);
                  this.lineSegments.push(new et(i, e, Ye.LineSegment));
                }
              this.lineSegments.length > 0 &&
                this.pointer.addSnapFeatures(this, Ye.LineSegment, this.lineSegments);
            });
        }
        init() {}
        dispose() {}
        activate(e) {
          let t = -1,
            i = -1;
          const s = (0, gt.D)(() => this.updateSnapping(this.points.length), 16);
          this.subscriptions.push(
            this.createPointSubscription(De.ADDED, s, !0),
            this.createPointSubscription(De.REMOVED, s, !0),
            this.createPointSubscription(
              De.UPDATED,
              (e, s) => {
                s === t ||
                  (this.mobileCreateHackJob() && s === i) ||
                  (this.updateSnapping(s), (i = t), (t = s));
              },
              !0,
            ),
          );
        }
        deactivate() {
          this.subscriptions.forEach((e) => e.cancel()),
            (this.subscriptions.length = 0),
            this.pointer.removeSnapFeatures(this, Ye.LinePoint),
            this.pointer.removeSnapFeatures(this, Ye.LineSegment);
        }
        beforeRender() {}
        render() {}
      }
      var ft = i(40333);
      class yt {
        constructor(e, t, i, s, n, a) {
          (this.points = e),
            (this.pointer = i),
            (this.getPhase = s),
            (this.onDrag = n),
            (this.onDragEnd = a),
            (this.inputSubscriptions = []),
            (this.dragging = !1),
            (this.onDragBegin = (e, t, i) => {
              if (!Y.q8[this.getPhase()]) return !1;
              if (!i || void 0 === i.index) return !1;
              this.dragging = !0;
              const s = this.points.isStartIndex(i.index) ? i.index + 1 : i.index - 1,
                n = this.points.get(s);
              return this.pointer.clearOrigin(), this.pointer.setOriginFromPointer(n), !0;
            }),
            (this.onDragEndEvent = () =>
              !!Y.q8[this.getPhase()] &&
              !!this.dragging &&
              (this.onDragEnd(), this.pointer.clearOrigin(), (this.dragging = !1), !0)),
            (this.onDragEvent = (e, t, i) => {
              if (e.buttons !== ft.r.PRIMARY) return !1;
              if (!Y.q8[this.getPhase()]) return !1;
              if (!i || void 0 === i.index || void 0 === i.instanceId) return !1;
              const s = this.pointer.getIntersection();
              return s && this.points.update(i.index, s.point), this.onDrag(i.instanceId), !0;
            }),
            this.inputSubscriptions.push(
              t.registerMeshHandler(lt.E0, ke.s.isType(ut), this.onDragBegin),
              t.registerMeshHandler(lt._t, ke.s.isType(ut), this.onDragEvent),
              t.registerMeshHandler(lt._R, ke.s.isType(ut), this.onDragEndEvent),
            ),
            this.deactivate();
        }
        activate() {
          for (const e of this.inputSubscriptions) e.renew();
        }
        deactivate() {
          for (const e of this.inputSubscriptions) e.cancel();
        }
      }
      var wt = i(59228);
      class bt {
        constructor(e, t, i, s, n, a, o) {
          (this.lines = e),
            (this.getLinesForPoint = t),
            (this.editingMaterial = i),
            (this.createPointSubscription = s),
            (this.getPhase = a),
            (this.getSelected = o),
            (this.bindings = []),
            (this.onDragEnd = (e) => {
              for (const e of this.lines) e.restoreLineMaterial();
            }),
            (this.onClick = (e, t, i) => {
              if (this.getPhase() !== Y.au.IDLE) return !1;
              for (const e of this.lines) e.restoreLineMaterial();
              if (!i || void 0 === i.index) return !1;
              if (e.down) {
                const e = i.index;
                void 0 !== e && this.styleLines(e);
              }
              return !1;
            }),
            (this.styleLines = (e) => {
              const t = this.getLinesForPoint(e);
              for (const e of t)
                e.group === this.getSelected() && e.line.overrideLineMaterial(this.editingMaterial);
            }),
            this.bindings.push(
              n.registerMeshHandler(wt.er, ke.s.isType(ut), this.onClick),
              n.registerUnfilteredHandler(lt._R, this.onDragEnd),
              ...this.setupLineStyler(this.createPointSubscription),
            ),
            this.deactivate();
        }
        activate() {
          for (const e of this.bindings) e.renew();
        }
        deactivate() {
          for (const e of this.bindings) e.cancel();
        }
        setupLineStyler(e) {
          return [
            e(
              De.ADDED,
              () => {
                const e = this.lines[this.lines.length - 1];
                e && e.restoreLineMaterial();
              },
              !0,
            ),
            e(
              De.UPDATED,
              (e, t) => {
                this.styleLines(t);
              },
              !0,
            ),
          ];
        }
      }
      var Dt = i(11798),
        St = i(97115);
      class It {
        constructor(e, t, i, n, a, o, r, h, d, l) {
          (this.points = e),
            (this.setSelected = t),
            (this.pointer = i),
            (this.changePhase = n),
            (this.getPhase = a),
            (this.isFloorplan = o),
            (this.currentFloorId = r),
            (this.currentRoomId = h),
            (this.currentLayerId = d),
            (this.inferRoomAssociation = l),
            (this.id = It),
            (this.onGroupCreated = (e) => null),
            (this.onGroupAddPoint = () => null),
            (this.onDone = () => null),
            (this.onEdit = (e) => null),
            (this.previousPhase = Y.au.IDLE),
            (this.currentLinePoints = 0),
            (this.previousPoint = new y.Vector3()),
            (this.inputSubscriptions = []),
            (this.log = new f.Z('measurement-creator')),
            (this.isReadonly = !1),
            (this.createNewLine = (e) => {
              const t = this.inferRoomAssociation(e),
                i = e.roomId || t.roomId || this.currentRoomId() || void 0,
                n = e.floorId || t.floorId || this.currentFloorId();
              if ((this.log.debug(`Starting measurement: floorId="${n}" roomId="${i}"`), !n))
                throw new St.H(`Cannot create new line on invalid floor '${n}'`);
              const a = {
                  visible: !0,
                  roomId: i,
                  floorId: n,
                  type: this.isFloorplan() ? s.FloorplanOnly : s.ThreeD,
                  text: '',
                  created: new Date(),
                  modified: new Date(),
                  temporary: this.isReadonly,
                  layerId: this.currentLayerId(),
                },
                o = this.points.startGroup(a);
              (this.currentGroup = o),
                this.points.push(e.point),
                (this.currentLinePoints = 1),
                this.setSelected(o);
              const r = this.points.getGroup(o);
              this.onGroupCreated(r.info.sid), this.pointer.setOrigin(e, !0);
            }),
            (this.addPointToLine = (e) => {
              this.previousPoint.copy(e.point),
                this.points.push(e.point),
                ++this.currentLinePoints,
                this.onGroupAddPoint(),
                this.pointer.setOrigin(e, !0);
            }),
            (this.updateLastPoint = (e) => {
              this.points.update(this.points.length - 1, e.point);
            }),
            (this.getIntersection = () => this.pointer.getIntersection()),
            (this.setPhase = (e) => {
              const t = this.getPhase();
              e !== t && ((this.previousPhase = t), this.changePhase(e));
            }),
            (this.restorePreviousPhase = () => {
              this.setPhase(this.previousPhase);
            });
        }
        start() {
          if (this.getPhase() === Y.au.IDLE) {
            this.previousPoint.set(1e3, 1e3, 1e3),
              this.setPhase(Y.au.CREATING),
              this.setSelected(-1);
            for (const e of this.inputSubscriptions) e.renew();
          }
        }
        cancelSubs() {
          for (const e of this.inputSubscriptions) e.cancel();
        }
        stop() {
          this.cancelSubs(),
            (this.currentLinePoints = 0),
            this.setSelected(-1),
            this.setPhase(Y.au.IDLE),
            this.pointer.clearOrigin(),
            this.onDone();
        }
        syncReadonly(e) {
          this.isReadonly = e;
        }
      }
      class Pt extends It {
        constructor(e, t, i, s, n, a, o, r, h, d, l, c, u, p, m) {
          super(e, t, s, n, h, l, c, u, p, m),
            (this.setCreatePointProgress = a),
            (this.updateCreatePointHit = o),
            (this.toggleCameraMovement = r),
            (this.continuous = d),
            (this.onLongPressSuccess = (e) => {
              this.log.debug('onLongPressSuccess while in phase:', Y.au[this.getPhase()]),
                this.getPhase() === Y.au.CREATING
                  ? (this.createNewLine(e), this.addPointToLine(e))
                  : this.getPhase() === Y.au.CREATING_NEXT_POINT &&
                    (this.continuous()
                      ? (this.updateLastPoint(e), this.addPointToLine(e))
                      : this.updateLastPoint(e)),
                this.setPhase(Y.au.POINT_PLACED);
            }),
            (this.onLongPressStart = (e) => {
              if (
                e.buttons === ft.r.PRIMARY &&
                (this.getPhase() === Y.au.CREATING || this.getPhase() === Y.au.CREATING_NEXT_POINT)
              ) {
                const e = this.getIntersection();
                e &&
                  (this.previousPoint.equals(e.point) ||
                    (this.setPhase(Y.au.CONFIRMING_POINT),
                    this.toggleCameraMovement(!1),
                    this.setCreatePointProgress(Date.now(), Pt.longPressCreateThreshold),
                    this.updateCreatePointHit(e),
                    this.previousPhase === Y.au.CREATING_NEXT_POINT &&
                      (this.updateLastPoint(e), this.toggleLastPointDraggable(!1)),
                    (this.creatingPointTimeout = window.setTimeout(() => {
                      this.restorePreviousPhase(),
                        this.onLongPressSuccess(e),
                        this.toggleLastPointDraggable(!0);
                    }, Pt.longPressCreateThreshold))));
              }
            }),
            (this.onLongPressEnd = () => {
              this.getPhase() === Y.au.CONFIRMING_POINT &&
                (this.log.debug('onLongPressEnd, cancelling confirmation'),
                this.setCreatePointProgress(0, Pt.longPressCreateThreshold),
                window.clearTimeout(this.creatingPointTimeout),
                this.toggleCameraMovement(!0),
                this.restorePreviousPhase()),
                this.getPhase() === Y.au.CREATING_NEXT_POINT &&
                  this.points.update(
                    this.points.length - 1,
                    this.points.get(this.points.length - 2),
                  ),
                this.setPlacedtoCreatePhase();
            }),
            (this.onDrag = () => {
              const e = this.getIntersection();
              e &&
                (this.setPlacedtoCreatePhase(),
                this.setPhase(Y.au.EDITING),
                this.previousPhase === Y.au.CREATING_NEXT_POINT
                  ? this.updateLastTwoPoints(e)
                  : this.previousPhase === Y.au.CREATING && this.updateLastPoint(e));
            }),
            (this.onDragEnd = () => {
              this.getPhase() === Y.au.EDITING && this.restorePreviousPhase(),
                (this.getPhase() !== Y.au.CREATING &&
                  this.getPhase() !== Y.au.CREATING_NEXT_POINT) ||
                  (this.toggleLastPointDraggable(!1), this.toggleCameraMovement(!0));
            }),
            (this.toggleLastPointDraggable = (e) => {
              e
                ? (this.dragSub.renew(), this.dragEndSub.renew())
                : (this.dragSub.cancel(), this.dragEndSub.cancel());
            }),
            (this.updateLastTwoPoints = (e) => {
              this.points.update(this.points.length - 1, e.point),
                this.points.update(this.points.length - 2, e.point);
            }),
            (this.dragSub = i(lt._t, this.onDrag)),
            (this.dragEndSub = i(lt._R, this.onDragEnd)),
            this.inputSubscriptions.push(
              i(Dt.Vh, this.onLongPressStart),
              i(Dt.pt, this.onLongPressEnd),
              i(Ae.bN, (e) => e.preventDefault()),
            ),
            this.dragSub.cancel(),
            this.dragEndSub.cancel(),
            this.cancelSubs();
        }
        start() {
          super.start();
        }
        stop() {
          if (this.getPhase() === Y.au.CREATING_NEXT_POINT)
            if (this.continuous()) this.points.pop();
            else {
              const e = this.points.getGroup(this.currentGroup);
              this.points.removeFromIdx(e.startIndex);
            }
          super.stop();
        }
        setPlacedtoCreatePhase() {
          this.getPhase() === Y.au.POINT_PLACED &&
            (this.continuous()
              ? (this.previousPhase === Y.au.CREATING ||
                  this.previousPhase === Y.au.CREATING_NEXT_POINT) &&
                this.setPhase(Y.au.CREATING_NEXT_POINT)
              : this.previousPhase === Y.au.CREATING
                ? this.setPhase(Y.au.CREATING_NEXT_POINT)
                : this.previousPhase === Y.au.CREATING_NEXT_POINT && this.setPhase(Y.au.CREATING));
        }
      }
      Pt.longPressCreateThreshold = 500;
      class Tt extends It {
        constructor(e, t, i, s, n, a, o, r, h, d, l, c, u) {
          super(e, t, s, n, a, o, r, h, d, c),
            (this.continuous = l),
            (this.meshQuery = u),
            (this.onCreate = (e) => {
              const t = this.previousPoint.distanceTo(e.point) > 0.01;
              if (this.getPhase() === Y.au.CREATING)
                return (
                  this.createNewLine(e),
                  this.addPointToLine(e),
                  void this.setPhase(Y.au.CREATING_NEXT_POINT)
                );
              t &&
                this.getPhase() === Y.au.CREATING_NEXT_POINT &&
                (this.continuous()
                  ? (this.updateLastPoint(e), this.addPointToLine(e))
                  : this.finishLine(e));
            }),
            (this.onMouseMove = () => {
              if (this.getPhase() === Y.au.CREATING_NEXT_POINT) {
                const e = this.getIntersection();
                e && this.updateLastPoint(e);
              }
            }),
            (this.onMouseClick = (e) => {
              if (e.button !== ft.M.PRIMARY || this.getPhase() === Y.au.IDLE) return;
              const t = this.getIntersection();
              t && this.onCreate(t);
            }),
            (this.onDoubleClick = (e) => {
              if ((e.preventDefault(), e.button !== ft.M.PRIMARY || this.getPhase() === Y.au.IDLE))
                return;
              const t = this.getIntersection();
              if (t && 2 === this.currentLinePoints) {
                const e = { origin: t.point.addScaledVector(t.normal, 0.05), normal: t.normal },
                  i = this.pointer.getMeshIntersection(e);
                if (i)
                  if (this.continuous()) {
                    this.points.pop();
                    const e = new nt(i, J.Free, this.meshQuery);
                    this.addPointToLine(e),
                      this.addPointToLine(e),
                      this.setPhase(Y.au.CREATING_NEXT_POINT);
                  } else this.finishLine(new nt(i, J.Free, this.meshQuery));
              }
            }),
            this.inputSubscriptions.push(
              i(wt.mE, this.onMouseMove),
              i(Ae.Rd, this.onMouseClick),
              i(Ae.bN, this.onDoubleClick),
            ),
            this.cancelSubs();
        }
        start() {
          super.start();
        }
        stop() {
          this.getPhase() === Y.au.CREATING_NEXT_POINT &&
            (this.points.pop(), this.currentLinePoints < 3 && this.points.pop()),
            super.stop();
        }
        finishLine(e) {
          this.points.pop(), this.addPointToLine(e), this.setPhase(Y.au.CREATING), this.onDone();
        }
      }
      var Et = i(53584),
        Mt = i(26302),
        Ct = i(31971),
        xt = i(20348),
        Rt = i(69947),
        Lt = i(20360),
        At = i(61173),
        Ft = i(4153);
      class kt {
        constructor(e, t, i, s, n) {
          (this.pointer = e),
            (this.mobile = t),
            (this.getPhase = i),
            (this.scene = s),
            (this.getLayer = n),
            (this.subscriptions = []),
            (this.editing = !1),
            (this.axisLines = []),
            (this.axisAlignmentHelper = new y.Object3D()),
            (this.updateSnapping = (e) => {
              if (
                (this.axisLines.length > 0 &&
                  (this.pointer.removeSnapFeatures(this, Ye.AxisAny), (this.axisLines.length = 0)),
                e)
              ) {
                this.axisAlignmentHelper.position.copy(e.point);
                const t = (0, Me.J2)(this.axisAlignmentHelper, e.point, e.normal);
                this.axisAlignmentHelper.updateMatrixWorld(!0);
                const i = this.axisAlignmentHelper.matrixWorld,
                  s = 100,
                  n = (e, t, i, n) => {
                    const a = new Je(e.clone().multiplyScalar(s), t.clone().multiplyScalar(s), n);
                    return a.applyMatrix4(i), a;
                  },
                  a = new y.Matrix4().copyPosition(i);
                this.axisLines.push(n(Q.fU.UP, Q.fU.DOWN, a, Ye.AxisY)),
                  t ||
                    this.axisLines.push(
                      n(Q.fU.FORWARD, Q.fU.BACK, i, Ye.AxisY),
                      n(Q.fU.UP, Q.fU.DOWN, i, Ye.AxisX),
                      n(Q.fU.LEFT, Q.fU.RIGHT, i, Ye.AxisZ),
                    ),
                  this.axisLines.length > 0 &&
                    this.pointer.addSnapFeatures(this, Ye.AxisAny, this.axisLines);
              }
            });
        }
        init() {}
        dispose() {}
        activate() {
          this.subscriptions.push(this.pointer.onOriginChanged(this.updateSnapping, !0)),
            (this.axisLineRenderer = new Ot(this.scene, this.getLayer('cursor-mesh')));
        }
        deactivate() {
          this.subscriptions.forEach((e) => e.cancel()),
            (this.subscriptions.length = 0),
            this.pointer.removeSnapFeatures(this, Ye.AxisAny),
            this.axisLineRenderer.dispose(),
            (this.axisLineRenderer = null);
        }
        beforeRender() {
          const e = this.getPhase(),
            t = this.mobile ? !!Y.Pj.mobile[e] : !!Y.Pj.desktop[e];
          t !== this.editing && ((this.editing = t), this.axisLineRenderer.clearLines());
        }
        render() {
          this.editing &&
            this.axisLineRenderer.render(this.pointer.lastIntersection, this.axisLines);
        }
      }
      class Ot {
        constructor(e, t) {
          (this.scene = e),
            (this.layer = t),
            (this.offsetFromMesh = 0.0075),
            (this.featureColors = { [Ye.AxisX]: Ee.x, [Ye.AxisZ]: Ee.z, [Ye.AxisY]: Ee.y }),
            (this.axesVisibleInConstraints = {
              [J.EdgesAndPlanarAxes]: !0,
              [J.Axes]: !0,
              [J.PlanarAxes]: !0,
            }),
            (this.linesActive = []),
            (this.linesFree = []),
            (this.axesVisible = []),
            (this.axisMat = new y.LineBasicMaterial({
              color: 4095,
              linewidth: 1,
              opacity: 0.75,
              transparent: !0,
              depthWrite: !1,
              depthTest: !0,
            })),
            (this.render = (e, t) => {
              if (e && this.axesVisibleInConstraints[e.constraint] && t.length > 0) {
                if (t.length !== this.axesVisible.length) this.clearLines();
                else {
                  this.axesVisible.every((e, i) => e.equals(t[i])) || this.clearLines();
                }
                if (this.container.parent !== this.scene.scene) {
                  for (const e of t) {
                    const t = this.getMesh(e);
                    t.material.color.setHex(this.featureColors[e.featureType]),
                      this.container.add(t),
                      this.linesActive.push(t);
                  }
                  (this.axesVisible = t.map((e) => e)),
                    this.scene.addChild(d.a.Root, this.container),
                    this.container.position.copy(e.normal).multiplyScalar(this.offsetFromMesh),
                    this.container.updateMatrixWorld(!0);
                }
              } else this.clearLines();
            }),
            (this.clearLines = () => {
              if (0 !== this.linesActive.length) {
                for (; this.linesActive.length > 0; ) {
                  const e = this.linesActive.pop();
                  e && (this.container.remove(e), this.linesFree.push(e));
                }
                this.scene.removeChild(d.a.Root, this.container);
              }
            }),
            (this.container = new y.Object3D());
        }
        getMesh(e) {
          let t = this.linesFree.pop();
          return (
            t
              ? t.geometry.setFromPoints([e.start, e.end])
              : ((t = new Vt(e, this.axisMat.clone())), (t.layers.mask = this.layer.mask)),
            t
          );
        }
        dispose() {
          for (this.clearLines(); this.linesFree.length > 0; ) {
            const e = this.linesFree.pop();
            e && (this.container.remove(e), e.geometry.dispose(), e.material.dispose());
          }
          (this.linesActive = []), (this.linesFree = []), (this.container = null);
        }
      }
      class Vt extends y.Line {
        constructor(e, t) {
          super(void 0, t),
            (this.material = t),
            (this.geometry = new y.BufferGeometry().setFromPoints([e.start, e.end]));
        }
      }
      var Bt = i(35659),
        Nt = i(37137),
        Gt = i(22925),
        Ht = i(44303),
        _t = i(71439),
        Ut = i(93797),
        Wt = i(3952),
        zt = i(79978),
        jt = i(77285);
      const $t = { [s.FloorplanOnly]: h.eR.LINETYPE_2D, [s.ThreeD]: h.eR.LINETYPE_3D },
        qt = { [h.eR.LINETYPE_2D]: s.FloorplanOnly, [h.eR.LINETYPE_3D]: s.ThreeD };
      class Zt {
        serialize(e, t) {
          if (!e) return null;
          const i = [],
            { text: s, visible: n, type: a, floorId: o, roomId: r, layerId: d } = e.info;
          for (const t of e) {
            const e = { position: qe.ep.toVisionVector(t) };
            o && (e.floorId = o), r && (e.roomId = r), i.push(e);
          }
          const l = {
            enabled: n,
            label: s,
            version: '3.2',
            lineType: $t[a] || h.eR.LINETYPE_3D,
            points: i,
          };
          return t && (l.layerId = d), this.validate(l) ? l : null;
        }
        validate(e) {
          return !!e && !(e.points.length < 2);
        }
      }
      var Yt = i(38256);
      const Xt = new f.Z('mds-measurement-serializer');
      class Kt {
        constructor() {
          (this.points = (0, Et.C)([])), (this.grouper = new ye(this.points));
        }
        deserialize(e) {
          var t;
          if (!e || !Array.isArray(e)) return Xt.debug('No contents', e), null;
          this.grouper.reset();
          for (const i of e)
            if (this.validate(i)) {
              const e = i.lineType || h.eR.LINETYPE_3D,
                s = qt[e],
                n = this.getModelContextFromPoint(i.points[0]),
                a = Object.assign(
                  Object.assign(
                    {
                      layerId: (null === (t = i.layer) || void 0 === t ? void 0 : t.id) || '',
                      sid: i.id,
                      text: i.label || '',
                      visible: i.enabled,
                      type: s,
                    },
                    n,
                  ),
                  { created: (0, Yt.p)(i.created), modified: (0, Yt.p)(i.modified), temporary: !1 },
                );
              this.grouper.startGroup(a),
                i.points.forEach((e) => this.grouper.push(qe.ep.fromVisionVector(e.position)));
            } else Xt.debug('Deserialized invalid Measurement data from MDS', i);
          return 0 === this.grouper.length ? null : this.grouper;
        }
        validate(e) {
          if (!e || 'object' != typeof e) return !1;
          const t = ['id', 'points'].every((t) => t in e),
            i = e.points && Array.isArray(e.points) && e.points.length > 0,
            s = t && i;
          return (
            s ||
              Xt.debug('Invalid MDS.MeasurementPath:', {
                hasRequiredFields: t,
                hasPoints: i,
                data: e,
              }),
            s
          );
        }
        getModelContextFromPoint(e) {
          return {
            floorId: e.floor && e.floor.id ? e.floor.id : '',
            roomId: e.room && e.room.id ? e.room.id : '',
          };
        }
      }
      class Qt extends Ut.u {
        constructor() {
          super(...arguments),
            (this.serializer = new Zt()),
            (this.deserializer = new Kt()),
            (this.prefetchKey = 'data.model.measurementPaths'),
            (this.layeredType = h.SF.MEASUREMENTPATH);
        }
        async read(e) {
          const { readonly: t } = this.config,
            i = {
              modelId: this.getViewId(),
              includeDisabled: !t,
              includeLayers: this.readLayerId(),
            };
          return this.query(jt.GetMeasurements, i, e).then((e) => {
            var t, i;
            if (!Wt.w.isOk(e, 'model.measurementPaths'))
              throw new zt.Zb('MdsMeasurementModeStore.read failed');
            return this.deserializer.deserialize(
              null ===
                (i =
                  null === (t = null == e ? void 0 : e.data) || void 0 === t ? void 0 : t.model) ||
                void 0 === i
                ? void 0
                : i.measurementPaths,
            );
          });
        }
        async create(e) {
          const t = this.getViewId(),
            i = this.serializer.serialize(e, this.writeLayerId(e.info.layerId));
          if (!i) throw new Error('Could not create Measurement');
          return this.mutate(jt.AddMeasurement, { modelId: t, data: i }).then((e) => {
            var t, i;
            const s =
              null ===
                (i = null === (t = e.data) || void 0 === t ? void 0 : t.addMeasurementPath) ||
              void 0 === i
                ? void 0
                : i.id;
            if (!s) throw new Error('Unable to add measurement!');
            return s;
          });
        }
        async update(e) {
          if (!e || 0 === e.length) return Promise.resolve();
          const t = this.getViewId();
          let i = '';
          const s = {};
          s.modelId = t;
          let n = '';
          for (const t of e) {
            const e = t.info.sid,
              a = this.serializer.serialize(t, !1);
            if (!a) throw new Error('Could not update Measurement');
            (s[`data${e}`] = a),
              (i += `, $data${e}: MeasurementPathPatch!`),
              (n += `patch${e}: patchMeasurementPath(modelId: $modelId, pathId: "${e}", patch: $data${e}) {\n        id\n      }`);
          }
          const a = _t.gql`
      mutation PatchMeasurements($modelId: ID! ${i}) {
        ${n}
      }
    `;
          return this.mutate(a, s).then(() => {});
        }
        async delete(...e) {
          if (!e || 0 === e.length) return;
          const t = this.getViewId();
          let i = '';
          for (const t of e) {
            const { pathId: e } = t;
            i += `delete${e}: deleteMeasurementPath(modelId: $modelId, pathId: "${e}")`;
          }
          const s = _t.gql`
      mutation DeleteMeasurements($modelId: ID!) {
        ${i}
      }
    `;
          return this.mutate(s, { modelId: t }).then(() => {});
        }
      }
      var Jt = i(62770),
        ei = i(68661),
        ti = i(73521),
        ii = i(40232);
      class si extends ti.K {
        constructor(e, t, i, s, n, a) {
          super(e, t, i),
            (this.group = s),
            (this.units = n),
            (this.id = this.group.info.sid),
            (this.title = si.getTitle(this.group, this.units, this.textParser)),
            (this.description = si.getDescription(this.group, this.units)),
            (this.label = si.getLabel(this.group, this.textParser)),
            (this.icon = 'icon-tape-measure'),
            (this.enabled = this.group.info.visible),
            (this.typeId = h.SF.MEASUREMENTPATH),
            (this.floorId = this.group.info.floorId),
            (this.roomId = this.group.info.roomId || ''),
            (this.layerId = this.group.info.layerId),
            (this.dateBucket = (0, ii.f)(this.group.info.created)),
            (this.onSelect = async () => {
              super.onSelect(), this.commandBinder.issueCommand(new z(this.id));
            }),
            (this.textParser = a);
        }
        supportsLayeredCopyMove() {
          return !0;
        }
        supportsBatchDelete() {
          return !0;
        }
        static getTitle(e, t, i) {
          const s = (0, S.up)(e.length, t),
            n = si.getLabel(e, i);
          return n ? `${s} ${n}` : s;
        }
        static getLabel(e, t) {
          return t.getPlainText(e.info.text);
        }
        static getDescription(e, t) {
          if (e.count > 2) {
            return e.segmentLengths.map((e) => (0, S.up)(e, t)).join(' – ');
          }
          return '';
        }
      }
      var ni = i(75287),
        ai = i(32137),
        oi = i(85893),
        ri = i(67294),
        hi = i(29707),
        di = i(65834),
        li = i(77855),
        ci = i(17106),
        ui = i(46199),
        pi = i(35748),
        mi = i(80308),
        gi = i(92394),
        vi = i(69634);
      const fi = ({ item: e }) => {
        const { analytics: t } = (0, ri.useContext)(hi.I),
          i = (0, di.l)(e.id),
          n = (0, ui.A)(),
          a = (0, li.m)(),
          o = (0, ci.e)();
        if (!i) return null;
        const { id: r, textParser: h, title: d, description: l, icon: c } = e,
          u = r === a,
          p = i.info.type === s.FloorplanOnly ? 'floorplan' : 'dollhouse',
          m = n ? (0, pi.vr)(d, n) : d,
          g = n ? (0, pi.vr)(l, n) : l,
          v = (0, oi.jsxs)(
            'div',
            Object.assign(
              { className: 'item-details' },
              {
                children: [
                  (0, oi.jsxs)(
                    'div',
                    Object.assign(
                      { className: 'item-header' },
                      {
                        children: [
                          (0, oi.jsx)(vi.S, { text: m || '', textParser: h, markers: pi.PP }),
                          (0, oi.jsx)(
                            'div',
                            Object.assign(
                              { className: 'list-item-decal' },
                              { children: (0, oi.jsx)(mi.JO, { name: p }) },
                            ),
                          ),
                        ],
                      },
                    ),
                  ),
                  l &&
                    (0, oi.jsx)(
                      'div',
                      Object.assign(
                        { className: 'item-description' },
                        { children: (0, oi.jsx)(vi.S, { text: g, textParser: h, markers: pi.PP }) },
                      ),
                    ),
                ],
              },
            ),
          );
        return (0, oi.jsx)(
          mi.HC,
          {
            id: r,
            className: 'search-result-item',
            title: v,
            active: u,
            disabled: !e.enabled,
            onClick: async () => {
              t.trackGuiEvent('search_item_measurement_click', { tool: o }), e.onSelect();
            },
            badge: (0, oi.jsx)(gi.C, { iconClass: c }),
          },
          r,
        );
      };
      var yi = i(7321);
      const { MEASUREMENTS: wi } = yi.Z.SHOWCASE,
        bi = new ni.v({});
      var Di = i(35922),
        Si = i(53015),
        Ii = i(69161);
      class Pi extends n.Y {
        constructor() {
          super(),
            (this.name = 'measurement-mode'),
            (this.mutationRecord = {
              [ei.KI.added]: new Set(),
              [ei.KI.updated]: new Set(),
              [ei.KI.removed]: new Set(),
            }),
            (this.removedLayerMap = new Map()),
            (this.store = null),
            (this.newDataBinding = null),
            (this.roomboundData = null),
            (this.longPressStart = Date.now()),
            (this.threshold = 800),
            (this.lineSidToPointMap = {}),
            (this.mobile = !1),
            (this.cameraAndDragBlocked = !1),
            (this.blockNavigation = () => !1),
            (this.visibilityFilterEnabled = !1),
            (this.editable = !0),
            (this.changeCursor = (e) => {
              this.engine.commandBinder.issueCommand(new u.u(e));
            }),
            (this.onEdit = (e) => {
              const t = this.data.getGroupInfo(e),
                i = (t && t.info.sid) || null;
              this.data.editingGroupId !== i &&
                ((this.data.editingGroupId = i), this.colliders.setEditingGroup(e));
            }),
            (this.onEditEnd = () => {
              if (this.data.editingGroupId) {
                const e = this.pointGroups.getGroupById(this.data.editingGroupId);
                e &&
                  (this.mutationRecord.updated.add(e.info.sid),
                  this.save(),
                  this.engine.broadcast(new Ft.av(this.buildAnalyticsMessageFromGroup(e))));
              }
              (this.data.editingGroupId = null), this.colliders.setEditingGroup(void 0);
            }),
            (this.onCreatorAddNewLine = (e) => {
              this.log.debug('onCreatorAddNewLine', e), (this.data.creatingGroupId = e);
            }),
            (this.onCreatorAddPoint = () => {
              if (this.data.creatingGroupId) {
                this.log.debug('onCreatorAddNewSegment', this.data.creatingGroupId);
                const e = this.pointGroups.getGroupById(this.data.creatingGroupId);
                if (e && e.count > 1 && e.length > 0) {
                  const t = this.buildAnalyticsMessageFromGroup(e);
                  this.engine.broadcast(
                    new Ft.rf(
                      Object.assign(Object.assign({}, t), {
                        startPosition: this.pointGroups.get(e.startIndex),
                        endPosition: this.pointGroups.get(e.endIndex),
                      }),
                    ),
                  );
                }
              }
            }),
            (this.onCreatorStop = () => {
              if (this.data.creatingGroupId) {
                const e = this.pointGroups.getGroupById(this.data.creatingGroupId);
                e &&
                  (e.count > 1 && e.hasLength()
                    ? (this.engine.broadcast(
                        new Ft.u6(Object.assign({}, this.buildAnalyticsMessageFromGroup(e))),
                      ),
                      this.mutationRecord.added.add(e.info.sid),
                      this.save())
                    : this.engine.broadcast(new Ft.ff()));
              }
              this.data.creatingGroupId = null;
            }),
            (this.onToggleMeasurementMode = async (e, t, i) => {
              this.toggleMeasuringMode(e, i);
            }),
            (this.onViewmodeChange = () => {
              this.getPhase() !== Y.au.CLOSED && this.stopMeasuring();
            }),
            (this.onSweepChange = () => {
              const e = this.getPhase();
              e !== Y.au.CREATING && e !== Y.au.CREATING_NEXT_POINT && this.setSelected(-1);
            }),
            (this.initStorageOnApplicationChange = async () => {
              var e;
              const t = this.loadSavedMeasurements();
              this.data.modeActive() && this.engine.commandBinder.issueCommand(new F.O(!1)),
                this.store && t && !this.newDataBinding
                  ? (this.newDataBinding = this.store.onNewData(async (e) => {
                      this.getPhase() !== Y.au.CLOSED && this.stopMeasuring(),
                        this.loadSavedMeasurements()
                          ? this.replaceContents(null == e ? void 0 : e.groups())
                          : this.replaceContents(),
                        this.clearMutationRecord();
                    }))
                  : this.newDataBinding &&
                    !t &&
                    (this.newDataBinding.cancel(), (this.newDataBinding = null)),
                t && (await (null === (e = this.store) || void 0 === e ? void 0 : e.refresh()));
            }),
            (this.getPhase = () => this.data.phase),
            (this.toggleCameraMovement = (e) => {
              e || this.cameraAndDragBlocked
                ? e &&
                  this.cameraAndDragBlocked &&
                  (this.dragInterceptor.cancel(),
                  this.navigation.removeNavigationRule(this.blockNavigation),
                  (this.cameraAndDragBlocked = !1))
                : (this.dragInterceptor.renew(),
                  this.navigation.addNavigationRule(this.blockNavigation),
                  (this.cameraAndDragBlocked = !0));
            }),
            (this.getConstraint = () =>
              this.settings.tryGetProperty(R.F.MeasurementSnapping, !1)
                ? this.viewmodeData.isFloorplan() || (0, Le.Eb)(this.cameraData.pose.pitchFactor())
                  ? he.floorplan
                  : this.constraint
                : he.disabled),
            (this.selectedItemChanged = () => {
              const { activeItemId: e, selectedType: t } = this.searchData;
              -1 === this.getSelected() ||
                (e && t === h.SF.MEASUREMENTPATH) ||
                this.setSelectedById(null);
            }),
            (this.getSelected = () => this.data.selectedGroupIndex),
            (this.setSelected = (e) => {
              this.data.selectedGroupIndex !== e && this.data.setSelectedGroupIndex(e);
            }),
            (this.setSelectedById = (e) => {
              if (null === e) this.setSelected(-1);
              else {
                const t = this.pointGroups.getGroupById(e);
                t && this.setSelected(t.index);
              }
            }),
            (this.deleteSelectedMeasurement = () => {
              -1 !== this.data.selectedGroupIndex &&
                (this.deleteMeasurement(this.data.selectedGroupIndex),
                this.setSelected(-1),
                this.changePhase(Y.au.IDLE),
                this.mobile ||
                  (this.navigation.removeNavigationRule(this.blockNavigation),
                  this.engine.commandBinder.issueCommand(new u.u(l.C.DEFAULT))));
            }),
            (this.deleteMeasurementBySids = async (e) => {
              const t = e.sids;
              for (const i of t) {
                const t = this.pointGroups.getGroupById(i);
                if (!t)
                  throw (
                    (this.log.error('Measurement delete failed', Object.assign({}, e)),
                    Error('Measurement delete failed, not found'))
                  );
                this.deleteMeasurement(t.index, !0);
              }
              this.save();
            }),
            (this.onToggleContinuous = () => {
              this.stopMeasuring();
            }),
            (this.changePhase = (e) => {
              this.getPhase() !== e &&
                (this.log.debug(`Phase Change: ${Y.au[this.getPhase()]} -> ${Y.au[e]}`),
                (this.previousPhase = this.getPhase()),
                this.data.setPhase(e));
            }),
            (this.restorePreviousPhase = () => {
              this.changePhase(this.previousPhase);
            }),
            (this.onPhaseChange = (e) => {
              if ((this.intersectionVisualizer.setMeasuringPhase(e), this.previousPhase !== e))
                switch (e) {
                  case Y.au.CLOSED:
                  case Y.au.IDLE:
                    this.engine.broadcast(new j.ps(!0)),
                      this.engine.commandBinder.issueCommand(new Z.U());
                    break;
                  case Y.au.EDITING:
                  case Y.au.CREATING:
                  case Y.au.POINT_PLACED:
                  case Y.au.CREATING_NEXT_POINT:
                  case Y.au.CONFIRMING_POINT:
                    this.engine.broadcast(new j.ps(!1)),
                      this.engine.commandBinder.issueCommand(new Z.t());
                }
            }),
            (this.buildAnalyticsMessage = (e) => {
              const t = this.pointGroups.getGroup(e);
              return t && t.hasLength() ? this.buildAnalyticsMessageFromGroup(t) : null;
            }),
            (this.buildAnalyticsMessageFromGroup = (e) => {
              const t = s[e.info.type];
              return Object.assign(
                Object.assign(
                  {
                    sid: e.info && e.info.sid ? e.info.sid : e.describe(),
                    totalLength: e ? e.length : 0,
                    segments: e ? e.count : 0,
                    temporary: !!e.info.temporary,
                    viewmode: this.viewmodeData.peekabooCorrectedMode(this.cameraData),
                    floorId: e.info.floorId,
                    continuous: this.settings.tryGetProperty(R.F.MeasurementContinuousLines, !1),
                  },
                  this.getAnalyticsForConstraints(),
                ),
                { type: t },
              );
            }),
            (this.getAnalyticsForConstraints = () => {
              const e = this.pointer.lastIntersection;
              if (e) {
                const t = e.featureType,
                  i = e.constraint;
                return { featureType: void 0 !== t ? Ye[t] : 'None', constraint: J[i] };
              }
              return null;
            }),
            (this.toggleMeasuringMode = (e, t) => {
              this.log.debug('toggleMeasuringMode', e);
              e !== (this.getPhase() !== Y.au.CLOSED) &&
                (e
                  ? ((this.editable = t),
                    this.engine.toggleRendering(this, !0),
                    this.changePhase(Y.au.IDLE),
                    this.lineStyler.activate(),
                    this.renderer.activate(),
                    this.textRenderer.activate(),
                    this.editable &&
                      (this.editor.activate(),
                      this.colliders.activate(),
                      this.textRenderer.activateInteraction()),
                    this.scene.addChild(d.a.Root, this.textRenderer.container),
                    this.engine.broadcast(
                      new Ft.$n(
                        !0,
                        this.viewmodeData.peekabooCorrectedMode(this.cameraData),
                        this.pointGroups.groupCount,
                      ),
                    ))
                  : (this.engine.toggleRendering(this, !1),
                    this.stopMeasuring(),
                    this.changePhase(Y.au.CLOSED),
                    this.toggleCameraMovement(!0),
                    this.editable &&
                      (this.editor.deactivate(),
                      this.colliders.deactivate(),
                      this.textRenderer.deactivateInteraction()),
                    this.lineStyler.deactivate(),
                    this.renderer.deactivate(),
                    this.textRenderer.deactivate(),
                    this.scene.removeChild(d.a.Root, this.textRenderer.container),
                    this.engine.broadcast(
                      new Ft.$n(
                        !1,
                        this.viewmodeData.peekabooCorrectedMode(this.cameraData),
                        this.pointGroups.groupCount,
                      ),
                    )));
            }),
            (this.startMeasuring = () => {
              this.settings.tryGetProperty(R.F.MeasurementSnapping, !1) && this.pointer.preload(),
                this.mobile ||
                  (this.navigation.addNavigationRule(this.blockNavigation),
                  this.engine.commandBinder.issueCommand(new u.u(l.C.XHAIR))),
                this.creator.start();
            }),
            (this.stopMeasuring = () => {
              if (this.getPhase() === Y.au.CLOSED) return;
              const e = this.isMeasurementComplete(this.data.selectedGroupIndex);
              this.isCreating() && !e && this.deleteSelectedMeasurement(),
                this.creator.stop(),
                this.mobile ||
                  (this.navigation.removeNavigationRule(this.blockNavigation),
                  this.engine.commandBinder.issueCommand(new u.u(l.C.DEFAULT)));
            }),
            (this.setupIntersectionVisuals = (e, t, i, s, n, a, o, r) => {
              t.addVisibilityRule(() => {
                const e = this.getPhase();
                return !(
                  (!a && e === Y.au.CREATING) ||
                  e === Y.au.CONFIRMING_POINT ||
                  e === Y.au.CREATING_NEXT_POINT ||
                  e === Y.au.EDITING
                );
              });
              const h = { cameraData: s, playerCamera: i.camera, scene: i };
              return new Ze(a, n, h, e, o, r.isFloorplan);
            }),
            (this.renameMeasurement = async (e) => {
              const t = this.pointGroups.getGroupById(e.sid);
              if (!t)
                throw (
                  (this.log.error('Measurement rename failed', Object.assign({}, e)),
                  Error('Measurement rename failed, not found'))
                );
              const i = void 0 !== e.text && e.text.length <= 24;
              if (!t || !i)
                throw (
                  (this.log.error(
                    'Measurement text invalid, text must be between 0 and 24 charachters in length.',
                    Object.assign({}, e),
                  ),
                  new Error('Measurement text invalid'))
                );
              {
                const i = '' === t.info.text && e.text.length > 0,
                  s = !i && t.info.text !== e.text;
                this.pointGroups.updateGroupInfo(
                  t.index,
                  Object.assign(Object.assign({}, t.info), { text: e.text }),
                ),
                  this.mutationRecord.updated.add(t.info.sid),
                  this.save(),
                  i && this.engine.broadcast(new Ft.ty(e.sid, e.text)),
                  s && this.engine.broadcast(new Ft.mM(e.sid, t.info.text, e.text));
              }
            }),
            (this.onChangeVisibility = async (e) => {
              const { sids: t, visible: i } = e;
              for (const s of t) {
                const t = this.pointGroups.getGroupById(s);
                if (!t)
                  throw (
                    (this.log.error(
                      'Measurement visibility toggle failed',
                      Object.assign(Object.assign({}, e), { group: t }),
                    ),
                    new Error('Measurement visibility toggle failed, not found'))
                  );
                {
                  this.pointGroups.updateGroupInfo(
                    t.index,
                    Object.assign(Object.assign({}, t.info), { visible: i }),
                  ),
                    this.mutationRecord.updated.add(t.info.sid);
                  const e = this.buildAnalyticsMessage(t.index);
                  e && this.engine.broadcast(new Ft.av(e)),
                    i || t.index !== this.getSelected() || this.setSelected(-1);
                }
              }
              this.save();
            }),
            (this.filterVisibility = async (e) => {
              (this.data.idVisibility = new Set(e.sids)), this.data.commit();
            }),
            (this.changeVisibilityFilterEnabled = async (e) => {
              (this.data.idVisibility = new Set()),
                (this.visibilityFilterEnabled = e.enabled),
                this.data.commit();
            }),
            (this.currentRoomId = () =>
              (0, Si.O)(this.roomboundData, this.layersData, this.layersData.activeLayerId)
                ? this.roomData.selected.value
                : null),
            (this.clearMutationRecord = this.clearMutationRecord.bind(this)),
            (this.deleteMeasurement = this.deleteMeasurement.bind(this)),
            (this.replaceContents = this.replaceContents.bind(this)),
            (this.navigateToMeasurement = this.navigateToMeasurement.bind(this));
        }
        async init(e, t) {
          var i;
          const { readonly: s, baseUrl: n } = e;
          (this.config = e), (this.mobile = (0, At.tq)()), (this.engine = t);
          const [a, d, l, c, u, v, f, y, w, b] = await Promise.all([
            t.getModuleBySymbol(o.Aj),
            t.getModuleBySymbol(o.tA),
            t.getModuleBySymbol(o.PZ),
            t.getModuleBySymbol(o.hn),
            t.getModuleBySymbol(o.fQ),
            t.market.waitForData(m.c),
            t.market.waitForData(p.M),
            t.market.waitForData(g.O),
            t.market.waitForData(L.Z),
            t.market.waitForData(Jt.Z),
          ]);
          ([this.settings, this.playerOptions, this.layersData, this.searchData] =
            await Promise.all([
              t.market.waitForData(M.e),
              t.market.waitForData(C.af),
              t.market.waitForData(Gt.R),
              t.market.waitForData(E.T),
            ])),
            t.market.waitForData(Ii.Z).then((e) => (this.roomboundData = e)),
            (this.playerOptions = await t.market.waitForData(C.af)),
            (this.layersData = await t.market.waitForData(Gt.R)),
            (this.scene = a.getScene()),
            (this.viewmodeData = y),
            (this.cameraData = f),
            (this.floorsViewData = v),
            (this.roomData = b),
            (this.input = l),
            (this.navigation = await t.getModuleBySymbol(o.wR)),
            (this.meshQueryModule = await t.getModuleBySymbol(o.hi));
          const D = await t.getModuleBySymbol(o.Lx);
          (this.applicationData = await t.market.waitForData(A.pu)),
            (this.lineDerivedDataFactory = new T(
              f,
              y,
              v,
              () => !!w.currentSweep && w.isSweepAligned(w.currentSweep),
              () => this.settings.tryGetProperty(R.F.UnitType, x.M.IMPERIAL),
              () => !0,
            ));
          const S = t.claimRenderLayer(this.name);
          this.data = new X.X();
          const I = (0, Et.C)([]);
          this.pointGroups = new ye(I);
          const P = (e, t, i = !1) => Te(I, e).createSubscription(t, i);
          (this.dataSubscription = I.onChanged(() => {
            this.data.repopulate(this.pointGroups.groups()), this.data.commit();
          })),
            (this.store = new Qt({ context: this.layersData.mdsContext, readonly: s, baseUrl: n })),
            this.registerRoomAssociationSource(t),
            (async function (e, t, i, s) {
              const n = await e.market.waitForData(A.pu);
              let a = n.application === A.Mx.WORKSHOP;
              const o = (n, o, r, h = []) => {
                  const d = s.tryGetProperty(R.F.UnitType, x.M.METRIC),
                    l = [],
                    c = t.groups();
                  if (0 === h.length)
                    for (const t of c)
                      (a || (t.info.visible && i.layerToggled(t.info.layerId))) &&
                        n(si.getTitle(t, d, bi), si.getDescription(t, d)) &&
                        l.push(new si(e.commandBinder, i, o, t, d, bi));
                  return e.commandBinder.issueCommand(new U(l.map((e) => e.id))), l;
                },
                r = (t) => {
                  e.commandBinder.issueCommand(new W(!!t));
                },
                d = (e) => new xt.V(t.onDataChanged(e), s.onPropertyChanged(R.F.UnitType, e)),
                l = {
                  renew: () => {
                    e.commandBinder.issueCommandWhenBound(
                      new ai.c6({
                        id: h.SF.MEASUREMENTPATH,
                        groupPhraseKey: wi.SEARCH_GROUP_HEADER,
                        getSimpleMatches: o,
                        registerChangeObserver: d,
                        onSearchActivatedChanged: r,
                        groupOrder: 40,
                        groupIcon: 'tape-measure',
                        batchSupported: !0,
                        itemFC: fi,
                      }),
                    );
                  },
                  cancel: () => {
                    e.commandBinder.issueCommandWhenBound(new ai.Pe(h.SF.MEASUREMENTPATH));
                  },
                },
                c = () => {
                  (a = n.application === A.Mx.WORKSHOP),
                    s.tryGetProperty(C.gx.Measurements, !0) || a ? l.renew() : l.cancel();
                },
                u = n.onPropertyChanged('application', c),
                p = s.onPropertyChanged(C.gx.Measurements, c);
              return c(), new xt.V(l, u, p);
            })(t, this.data, this.layersData, this.settings).then((e) => this.bindings.push(e)),
            (this.constraint = this.mobile ? he.mobile : he.desktop),
            (this.pointer = new mt(
              u,
              this.getConstraint,
              this.mobile,
              this.floorsViewData,
              this.viewmodeData,
              this.meshQueryModule,
              f.pose,
            ));
          const N = new vt(this.pointGroups, P, this.pointer, () => {
            const e = this.settings.tryGetProperty(R.F.MeasurementContinuousLines, !1),
              t =
                this.getPhase() === Y.au.CREATING ||
                this.getPhase() === Y.au.CREATING_NEXT_POINT ||
                (this.previousPhase === Y.au.CREATING_NEXT_POINT &&
                  this.getPhase() === Y.au.EDITING);
            return e && this.mobile && t;
          });
          t.addComponent(this, N);
          const j = new kt(this.pointer, this.mobile, this.getPhase, this.scene, t.getRenderLayer);
          t.addComponent(this, j),
            (this.creator = this.instantiateCreator(f)),
            this.initStorageOnApplicationChange();
          const $ = (e, t, i) => {
            const s = this.pointGroups.getGroup(e),
              n = s.describe(i);
            this.lineSidToPointMap[n] = i;
            const a = this.lineDerivedDataFactory.get(n);
            return this.lineDerivedDataFactory.make(
              n,
              () => ({
                start_position: this.pointGroups.get(t),
                end_position: this.pointGroups.get(i),
                visible: this.getMeasurementVisibility(s.info.sid, s.info.layerId, s.info.visible),
                floorId: s.info.floorId,
                roomId: s.info.roomId,
                type: s.info.type,
                text: this.pointGroups.isStartIndex(t) ? s.info.text : '',
              }),
              a,
            );
          };
          (this.renderer = new xe(
            this.pointGroups,
            P,
            f,
            c,
            S,
            t.claimRenderLayer('measure-lines'),
            this.getSelected,
            $,
          )),
            await t.addComponent(this, this.renderer);
          const q = new r.uc({
            assetBasePath:
              null !== (i = this.settings.getProperty('assetBasePath')) && void 0 !== i ? i : '',
            color: 'black',
            background: !0,
            backgroundColor: '#ffffff',
            backgroundColliderType: Oe,
          });
          (this.textRenderer = new Ve(
            this.pointGroups,
            l,
            this.mobile,
            f,
            S,
            je.z.labels,
            q,
            $,
            this.changeCursor,
            this.getPhase,
            this.setSelected,
          )),
            await t.addComponent(this, this.textRenderer),
            (this.editor = new yt(
              this.pointGroups,
              l,
              this.pointer,
              this.getPhase,
              this.onEdit,
              this.onEditEnd,
            )),
            (this.colliders = new ut(
              this.pointGroups,
              this.input,
              f,
              this.mobile,
              this.changeCursor,
              this.getPhase,
              this.changePhase,
              this.restorePreviousPhase,
              this.setSelected,
              this.getSelected,
              this.onEdit,
              this.onEditEnd,
            )),
            (this.lineStyler = new bt(
              this.renderer.lines,
              this.renderer.getLinesForPoint,
              this.renderer.dottedMaterial,
              P,
              this.input,
              this.getPhase,
              this.getSelected,
            ));
          const [Z] = await Promise.all([t.getModuleBySymbol(o.Lk)]);
          (this.intersectionVisualizer = this.setupIntersectionVisuals(
            d,
            Z,
            this.scene,
            f,
            this.pointer,
            this.mobile,
            t.getRenderLayer,
            this.viewmodeData,
          )),
            t.addComponent(this, this.intersectionVisualizer),
            (this.dragInterceptor = new xt.V(
              this.input.registerPriorityHandler(lt._t, Ke.S, () => !0),
              this.input.registerPriorityHandler(lt._t, Mt.i, () => !0),
            )),
            this.dragInterceptor.cancel(),
            this.mobile || this.bindings.push(...this.hotkeys()),
            this.bindings.push(
              this.applicationData.onPropertyChanged(
                'application',
                this.initStorageOnApplicationChange,
              ),
              y.makeModeChangeSubscription(this.onViewmodeChange),
              w.makeSweepChangeSubscription(this.onSweepChange),
              t.commandBinder.addBinding(F.O, async (e) => {
                this.onToggleMeasurementMode(e.on, e.dimWhileActive, e.editable);
              }),
              t.commandBinder.addBinding(k.c, async () => this.startMeasuring()),
              t.commandBinder.addBinding(O.Q, async (e) => this.setSelected(e.index)),
              t.commandBinder.addBinding(V.B, async () => this.stopMeasuring()),
              t.commandBinder.addBinding(B.Ev, async () => this.deleteSelectedMeasurement()),
              t.commandBinder.addBinding(B.Tn, async (e) => this.deleteMeasurement(e.index)),
              t.commandBinder.addBinding(G, this.onChangeVisibility),
              t.commandBinder.addBinding(H, this.renameMeasurement),
              t.commandBinder.addBinding(B.JM, this.deleteMeasurementBySids),
              t.commandBinder.addBinding(_, async (e) => {
                var t;
                return this.replaceContents(
                  null === (t = e.points) || void 0 === t ? void 0 : t.groups(),
                );
              }),
              t.commandBinder.addBinding(U, this.filterVisibility),
              t.commandBinder.addBinding(W, this.changeVisibilityFilterEnabled),
              t.commandBinder.addBinding(z, this.navigateToMeasurement),
              this.dataSubscription,
              this.settings.onPropertyChanged(R.F.MeasurementContinuousLines, () =>
                this.onToggleContinuous(),
              ),
              D.onSave(() => this.saveDiff(), { dataType: Bt.g.MEASUREMENTS }),
              this.layersData.onPropertyChanged('currentViewId', () => this.updateSettings()),
              this.layersData.onPropertyChanged('activeLayerId', () =>
                this.updatePendingMeasurement(),
              ),
              this.data.onPropertyChanged('phase', this.onPhaseChange),
              this.searchData.onPropertyChanged('activeItemId', this.selectedItemChanged),
            ),
            t.market.register(this, X.X, this.data),
            t.toggleRendering(this, !1),
            this.updateSettings(),
            this.registerDebugSettings();
        }
        replaceContents(e) {
          this.lineDerivedDataFactory.clear();
          for (let e = this.pointGroups.groupCount; e >= 0; e--) {
            const t = this.pointGroups.getGroup(e);
            this.layersData.isInMemoryLayer(t.info.layerId) || this.pointGroups.removeGroup(e);
          }
          e && this.pointGroups.copy(e, !1);
        }
        loadSavedMeasurements() {
          return (
            (this.config.readonly = this.applicationData.application !== A.Mx.WORKSHOP),
            this.creator.syncReadonly(this.config.readonly),
            !this.config.readonly || this.playerOptions.options.measurements_saved
          );
        }
        isCreating() {
          const e = this.getPhase();
          return e === Y.au.CREATING || e === Y.au.CREATING_NEXT_POINT;
        }
        setConstraintStyle(e) {
          this.log.debug('setConstraintStyle:', J[e]), (this.constraint = e);
        }
        deleteMeasurement(e, t = !1) {
          const i = this.buildAnalyticsMessage(e);
          i &&
            this.engine.broadcast(
              new Ft.$Z(
                Object.assign(Object.assign({}, i), { count: this.pointGroups.groupCount - 1 }),
              ),
            );
          const s = this.pointGroups.getGroup(e);
          if (s) {
            const { sid: i, layerId: n } = s.info;
            this.pointGroups.removeGroup(e),
              i !== this.data.creatingGroupId &&
                (this.layersData.isInMemoryLayer(n) ||
                  (this.mutationRecord.removed.add(i),
                  this.removedLayerMap.set(i, n),
                  t || this.save()));
          }
        }
        isMeasurementComplete(e) {
          if (-1 === e || !this.isCreating()) return !0;
          const t = this.getPhase(),
            i = this.pointGroups.getGroup(e);
          return this.settings.tryGetProperty(R.F.MeasurementContinuousLines, !1)
            ? i.count > 2 && t === Y.au.CREATING_NEXT_POINT
            : i.count >= 2 && t === Y.au.CREATING;
        }
        hotkeys() {
          return [
            this.input.registerHandler(Ct.e, (e) => {
              if (e.state === Rt.M.PRESSED)
                switch (e.key) {
                  case Lt.R.ESCAPE:
                    this.getPhase() === Y.au.CONFIRMING_POINT
                      ? (this.creator.stop(), this.creator.start(), this.changePhase(Y.au.CREATING))
                      : this.isCreating()
                        ? this.stopMeasuring()
                        : this.applicationData.application !== A.Mx.WORKSHOP &&
                          this.getPhase() !== Y.au.CLOSED &&
                          this.engine.commandBinder.issueCommand(new $.tT(q.w1.MEASUREMENTS, !1));
                    break;
                  case Lt.R.BACKSPACE:
                  case Lt.R.DELETE:
                    this.getPhase() !== Y.au.CLOSED &&
                      this.getPhase() !== Y.au.EDITING &&
                      this.deleteSelectedMeasurement();
                    break;
                  case Lt.R.RETURN:
                    const e = this.pointGroups.groupCount - 1;
                    this.isMeasurementComplete(e) && this.stopMeasuring();
                }
            }),
            this.input.registerHandler(Ct.e, (e) => {
              if (e.key === Lt.R.SHIFT || e.key === Lt.R.ALT) {
                const { altKey: t, shiftKey: i } = e.modifiers,
                  s = i && t ? he.shiftAlt : t ? he.alt : i ? he.shift : he.desktop;
                this.setConstraintStyle(s);
              }
            }),
          ];
        }
        onUpdate(e) {
          if (this.getPhase() === Y.au.CLOSED) return;
          const t = this.data.selectedGroupIndex,
            i = this.mobile ? Y.Ph.mobile[this.getPhase()] : Y.Ph.desktop[this.getPhase()];
          for (const s in this.lineSidToPointMap) {
            const n = this.lineDerivedDataFactory.get(s);
            if (n) {
              n.opacity.tick(e);
              const a = this.lineSidToPointMap[s],
                o = this.pointGroups.groupFromPointIndex(a),
                r = o === t && n.visible ? 1 : n.opacity.value,
                h = i && !n.labelVisible ? 0 : r;
              this.textRenderer.setTextOpacityByPoint(a, h),
                this.renderer.setLineOpacityByPoint(a, r),
                -1 !== o && this.colliders.setGroupVisible(o, r > 0);
            }
          }
          if (this.mobile)
            if (this.getPhase() === Y.au.CONFIRMING_POINT) {
              const e = (Date.now() - this.longPressStart) / this.threshold;
              e <= 1 && ((this.data.pressProgress = e), this.data.commit());
            } else
              this.getPhase() === Y.au.CREATING &&
                0 !== this.data.pressProgress &&
                ((this.data.pressProgress = 0), this.data.commit());
        }
        dispose() {
          var e, t;
          this.data.modeActive() &&
            (this.stopMeasuring(), this.engine.commandBinder.issueCommand(new F.O(!1))),
            this.colliders.dispose(),
            this.textRenderer.dispose(),
            this.renderer.dispose(),
            this.engine.disposeRenderLayer(this.name),
            null === (e = this.store) || void 0 === e || e.dispose(),
            (this.store = null),
            null === (t = this.newDataBinding) || void 0 === t || t.cancel(),
            (this.newDataBinding = null),
            super.dispose(this.engine);
        }
        clearMutationRecord() {
          for (const e of Object.values(this.mutationRecord)) e.clear();
        }
        async save() {
          if (!this.config.readonly)
            return this.engine.commandBinder.issueCommand(
              new Nt.V({ dataTypes: [Bt.g.MEASUREMENTS] }),
            );
          this.clearMutationRecord();
        }
        async saveDiff() {
          var e, t;
          if (
            (this.data.repopulate(this.pointGroups.groups()),
            this.data.commit(),
            this.data.notifyDataChanged(),
            this.config.readonly || !this.store)
          )
            return void this.clearMutationRecord();
          const i = this.mutationRecord,
            s = [];
          this.log.debug(
            'MDS mutation ops:',
            `{\n      added: '${[...i.added.keys()]}',\n      updated: '${[...i.updated.keys()]}',\n      removed: '${[...i.removed.keys()]}',\n    }`,
          );
          const n = [];
          for (const e of i[ei.KI.removed]) {
            if (i[ei.KI.added].has(e)) i[ei.KI.added].delete(e);
            else {
              const t = this.removedLayerMap.get(e);
              n.push({ pathId: e, layerId: t });
            }
            i[ei.KI.updated].delete(e);
          }
          this.removedLayerMap.clear();
          const a = this.store.delete(...n);
          s.push(a);
          for (const t of i[ei.KI.added]) {
            if (
              this.layersData.isInMemoryLayer(
                null === (e = this.data.getGroupInfoBySid(t)) || void 0 === e
                  ? void 0
                  : e.info.layerId,
              )
            )
              continue;
            const n = this.pointGroups.getGroupById(t);
            if (n) {
              const e = this.store.create(n).then((e) => {
                e &&
                  (this.log.debug(`Updating group id for new path: ${n.info.sid} -> ${e}`),
                  this.pointGroups.updateGroupInfo(
                    n.index,
                    Object.assign(Object.assign({}, n.info), { sid: e }),
                  )),
                  this.data.repopulate(this.pointGroups.groups()),
                  this.data.commit(),
                  this.data.notifyDataChanged();
              });
              s.push(e);
            }
            i[ei.KI.updated].delete(t);
          }
          const o = [];
          for (const e of i[ei.KI.updated]) {
            if (
              this.layersData.isInMemoryLayer(
                null === (t = this.data.getGroupInfoBySid(e)) || void 0 === t
                  ? void 0
                  : t.info.layerId,
              )
            )
              continue;
            const i = this.pointGroups.getGroupById(e);
            i && o.push(i);
          }
          const r = this.store.update(o);
          return s.push(r), this.clearMutationRecord(), Promise.all(s);
        }
        updatePendingMeasurement() {
          const e = this.data.creatingGroupId;
          if (e) {
            const t = this.pointGroups.getGroupById(e);
            if (!t) return void this.log.error('Missing pending measurement group');
            if (!this.layersData.isInMemoryLayer(t.info.layerId)) {
              const i = this.layersData.activeLayerId;
              this.pointGroups.updateGroupInfo(
                t.index,
                Object.assign(Object.assign({}, t.info), { layerId: i }),
              );
              const s = this.data.getGroupInfoBySid(e);
              s && ((s.info.layerId = i), this.data.commit(), this.data.notifyDataChanged());
            }
          }
        }
        getMeasurementVisibility(e, t, i) {
          if (!this.data.modeActive()) return !1;
          const {
              selectedGroupSid: s,
              creatingGroupId: n,
              editingGroupId: a,
              idVisibility: o,
            } = this.data,
            r =
              this.applicationData.application === A.Mx.WORKSHOP || this.layersData.layerToggled(t),
            h = this.layersData.layerVisible(t),
            d = [s, n, a].includes(e),
            l = !this.visibilityFilterEnabled || o.has(e);
          return r && (d || (i && l && h));
        }
        async registerDebugSettings() {
          const e = await this.engine.getModuleBySymbol(a.Ak);
          e.registerMenuEntry({
            header: 'Measurement Debug',
            setting: 'measure/fp_in_dh',
            initialValue: () => !1,
            onChange: (t) => (
              this.lineDerivedDataFactory.setDollhouseLineStyle(t ? s.FloorplanOnly : s.ThreeD),
              e.updateSetting('measure/fp_in_dh', t)
            ),
          });
        }
        updateSettings() {
          const e = this.layersData.getCurrentView(),
            t = (null == e ? void 0 : e.viewType) === Ht.XZ.TRUEPLAN,
            i = this.settings.tryGetProperty(ge, !0),
            s = t || i;
          this.settings.setProperty(ge, s);
        }
        instantiateCreator(e) {
          let t;
          const i = this.viewmodeData,
            s = () => {
              const t = i.isFloorplan(),
                s = i.isDollhouse() && e.pose.pitchFactor() < 0.01;
              return t || s;
            },
            n = (e) => {
              const t = {
                floorId: e.floorId || '',
                roomId: e.roomId || '',
                layerId: this.layersData.activeLayerId,
              };
              return this.meshQueryModule.inferMeshIdsFromPoint(t, e.point, !0), t;
            };
          if (this.mobile) {
            const i = (e, t) => {
                (this.longPressStart = e), (this.threshold = t);
              },
              a = (t) => {
                const i = (0, Le.q9)(e, t.point);
                this.data.setPointPosition(i.screenPosition);
              };
            t = new Pt(
              this.pointGroups,
              this.setSelected,
              this.input.registerUnfilteredHandler,
              this.pointer,
              this.changePhase,
              i,
              a,
              this.toggleCameraMovement,
              this.getPhase,
              () => this.settings.tryGetProperty(R.F.MeasurementContinuousLines, !1),
              s,
              () => this.floorsViewData.getHighestVisibleFloorId(),
              this.currentRoomId,
              () => this.layersData.activeLayerId,
              n,
            );
          } else
            t = new Tt(
              this.pointGroups,
              this.setSelected,
              this.input.registerUnfilteredHandler,
              this.pointer,
              this.changePhase,
              this.getPhase,
              s,
              () => this.floorsViewData.getHighestVisibleFloorId(),
              this.currentRoomId,
              () => this.layersData.activeLayerId,
              () => this.settings.tryGetProperty(R.F.MeasurementContinuousLines, !1),
              n,
              this.meshQueryModule,
            );
          return (
            (t.onGroupCreated = this.onCreatorAddNewLine),
            (t.onGroupAddPoint = this.onCreatorAddPoint),
            (t.onEdit = this.onEdit),
            (t.onDone = this.onCreatorStop),
            t.syncReadonly(this.config.readonly),
            t
          );
        }
        async navigateToMeasurement({ groupId: e }) {
          const t = this.data.getGroupInfoBySid(e);
          if (!t) return;
          const i = [];
          for (const e of t) i.push(e);
          const n = new y.Box3().setFromPoints(i),
            a = t.info.type === s.FloorplanOnly ? v.Ey.Floorplan : v.Ey.Dollhouse;
          n.expandByScalar(a === v.Ey.Dollhouse ? 1.25 : 1);
          const o = { mode: a, transition: c.nF.Interpolate, floorId: t.info.floorId };
          try {
            await this.navigation.focus(n, o), this.setSelectedById(e);
          } catch (e) {
            this.log.info('Unable to navigateToMeasurement:', e);
          }
        }
        registerRoomAssociationSource(e) {
          const t = this.data;
          e.commandBinder.issueCommandWhenBound(
            new Di.I({
              type: 'measurements',
              getPositionId: function* () {
                for (const e of t.groups())
                  yield {
                    id: e.info.sid,
                    roomId: e.info.roomId,
                    floorId: e.info.floorId,
                    position: e.get(0),
                    layerId: e.info.layerId,
                  };
              },
              updateRoomForId: (e, i) => {
                const s = t.getGroupInfoBySid(e);
                if (!s) throw new Error('Invalid measurement group id');
                s.info.roomId = i || void 0;
              },
            }),
          );
        }
      }
      const Ti = Pi;
    },
    34214: (e, t, i) => {
      'use strict';
      i.r(t),
        i.d(t, {
          ModelRatedMessage: () => o.E,
          SubmitModelRatingCommand: () => r.M,
          ToggleModelRatingDialogCommand: () => r.m,
          default: () => I,
        });
      var s = i(85453),
        n = i(933),
        a = i(22816),
        o = i(3807),
        r = i(27691),
        h = i(13760),
        d = i(9993),
        l = i(43606);
      const c = new (i(53257).Z)('model-rating-data-store'),
        u = (e) => e,
        p = (e) => e;
      class m extends l.MU {
        constructor(e, t, i) {
          super({
            queue: e,
            deserialize: u,
            serialize: p,
            path: `${t}/api/v1/jsonstore/model/model-rating/${i}`,
          }),
            (this.queue = e),
            (this.baseUrl = t),
            (this.modelId = i);
        }
        async canPromptRating() {
          let e;
          try {
            e = await this.read();
          } catch (e) {
            return c.error('Failed to read existing rating data from JSONStore'), !1;
          }
          const t = !!e.rated_at;
          return !!!e.prompt_dismissed_at && !t;
        }
        async recordRatingSubmitted() {
          this.update({ rated_at: new Date().toISOString() });
        }
        async recordAutomaticPromptDismissed() {
          this.update({ prompt_dismissed_at: new Date().toISOString() });
        }
        async reset() {
          var e;
          const t = `${this.baseUrl}/api/v1/jsonstore/model/model-rating/${this.modelId}`;
          if (!(null === (e = this.modelId) || void 0 === e ? void 0 : e.length))
            throw new Error(`Refusing to DELETE ${t}`);
          if (
            window.confirm(
              'Are you sure you want to reset the Model Rated value for this space? This cannot be undone.',
            )
          )
            return this.queue.delete(t, this.options).then(() => {
              window.location.reload();
            });
        }
      }
      var g = i(66379),
        v = i(64150),
        f = i(52893),
        y = i(34608);
      const w = (e) => 864e5 * e,
        b = w(1),
        D = w(7);
      class S extends n.Y {
        constructor() {
          super(...arguments),
            (this.name = 'model-rating'),
            (this.promptEnabled = !1),
            (this.totalActiveTime = 0),
            (this.wasLastOpeningAutomatic = !1),
            (this.canPrompt = async () => {
              const e = Date.now(),
                t = +this.settings.tryGetProperty(g.F.LastRatingPromptTime, null),
                i = !t || isNaN(t) || +new Date(e) - +new Date(t) >= b,
                s = await this.store.canPromptRating();
              return this.log.debug(`canPromptUser: ${i}, canPromptModel: ${s}`), i && s;
            }),
            (this.handleActivityPingMessage = async (e) => {
              if (
                ((this.totalActiveTime +=
                  e.durationDollhouse + e.durationFloorplan + e.durationInside),
                this.log.debug(
                  `prompt timing update: totalActiveTime:${this.totalActiveTime}, threshHold: 74500`,
                ),
                this.totalActiveTime < 74500 || !this.promptEnabled)
              )
                return;
              this.engine.unsubscribe(s.i, this.handleActivityPingMessage);
              if ((await this.canPrompt()) && !this.viewData.isDialogVisible) {
                this.log.debug('automatically prompting user for Model Rating');
                const e = new Date().toISOString();
                this.settings.setLocalStorageProperty(g.F.LastRatingPromptTime, e),
                  this.engine.commandBinder.issueCommand(new r.m(!0)),
                  (this.wasLastOpeningAutomatic = !0);
              }
            }),
            (this.handleSubmitModelRatingCommand = async ({ rating: e, didFinish: t }) => {
              this.log.info(e),
                this.engine.broadcast(new o.E(e)),
                this.store.recordRatingSubmitted(),
                t &&
                  (this.engine.commandBinder.issueCommand(new r.m(!1)),
                  this.engine.commandBinder.issueCommand(new h.B(d.P.RATING_THANK_YOU, !0)));
            }),
            (this.handleToggleDialogCommand = async ({ toVisible: e }) => {
              this.viewData.setDialogVisible(e);
              !this.viewData.isDialogVisible &&
                this.wasLastOpeningAutomatic &&
                (this.store.recordAutomaticPromptDismissed(), (this.wasLastOpeningAutomatic = !1));
            });
        }
        async init(e, t) {
          (this.engine = t),
            (this.config = e),
            (this.viewData = new a.P()),
            (this.store = new m(e.queue, e.baseUrl, e.baseModelId)),
            (this.promptEnabled = e.promptEnabled),
            (this.settings = await t.market.waitForData(v.e)),
            (this.modelData = await t.market.waitForData(f.T)),
            this.bindings.push(
              t.commandBinder.addBinding(r.m, this.handleToggleDialogCommand),
              t.commandBinder.addBinding(r.M, this.handleSubmitModelRatingCommand),
            );
          const i = this.modelData.model.created;
          let n = !!i && Date.now() - +new Date(i) < D;
          this.promptEnabled &&
            e.debug &&
            (this.log.info(
              'Debug Mode Enabled: Ignoring max model age requirement for rating prompt.',
            ),
            (n = !0)),
            this.log.debug(`promptEnabled: ${e.promptEnabled}, isModelEligible: ${n}`),
            this.promptEnabled &&
              n &&
              this.bindings.push(t.subscribe(s.i, this.handleActivityPingMessage)),
            t.market.register(this, a.P, this.viewData),
            this.registerSettings();
        }
        async registerSettings() {
          const e = await this.engine.getModuleBySymbol(y.Ak),
            { debug: t } = this.config;
          t &&
            e.registerMenuButton({
              header: 'Model Rating',
              buttonName: 'Reset Model Rated value',
              callback: () => {
                this.settings.setLocalStorageProperty(g.F.LastRatingPromptTime, null),
                  this.store.reset();
              },
            });
        }
        dispose(e) {
          this.bindings.forEach((e) => {
            e.cancel();
          }),
            (this.bindings = []),
            super.dispose(e);
        }
      }
      const I = S;
    },
    49304: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => oe });
      var s = i(933),
        n = i(24938),
        a = i(88288),
        o = i(64150),
        r = i(35659),
        h = i(20348),
        d = i(4763),
        l = i(22925),
        c = i(35575),
        u = i(16810),
        p = i(62770),
        m = i(33315),
        g = i(10835),
        v = i(37137),
        f = i(69161),
        y = i(67540),
        w = i(35922),
        b = i(3626),
        D = i(40232),
        S = i(80383),
        I = i(66379),
        P = i(65919),
        T = i(10637),
        E = i(7321),
        M = i(32137),
        C = i(73521),
        x = i(17295),
        R = i(38063),
        L = i(69137),
        A = i(87389),
        F = i(68184),
        k = i(55587);
      class O extends C.K {
        constructor(e, t, i, s, n, a, o) {
          super(e, t, s),
            (this.room = n),
            (this.title = a),
            (this.id = this.room.id),
            (this.icon = `icon-${(0, L.mX)(this.room.roomTypeIds)}`),
            (this.typeId = S.SF.MODELROOM),
            (this.layerId = T.gi),
            (this.dateBucket = D.Z.OLDER),
            (this.enabled = !0),
            (this.onSelect = async () => {
              super.onSelect(), await this.commandBinder.issueCommand(new R.SG(this.room));
            }),
            (this.floorId = o),
            (this.roomId = n.id);
          const r = i.tryGetProperty(I.F.UnitType, P.M.IMPERIAL);
          this.description = this.room.getMeasurementText(r);
        }
      }
      var V = i(76074),
        B = i(71439),
        N = i(93797),
        G = i(22999),
        H = i(53257),
        _ = i(52803),
        U = i(81396),
        W = i(32197);
      const z = new H.Z('MdsRoomBoundsDeserializer');
      class j {
        deserialize(e, t = !1) {
          var i, s, n, a, o, r, h, d;
          const l = { version: 0, floors: {} };
          for (const t of e.floors || []) {
            const e = { edges: {}, vertices: {}, rooms: {} };
            l.floors[t.id] = e;
            for (const i of t.vertices || [])
              i
                ? (e.vertices[i.id] = { x: i.position.x, y: i.position.y })
                : z.warn('Found null vertex in floor vertices!');
            for (const i of t.edges || []) {
              if (!i || null === i.thickness || null === i.centerLineBias) {
                z.warn('Invalid edge!');
                continue;
              }
              for (const t of i.vertices || [])
                (null == t ? void 0 : t.position) &&
                  (e.vertices[t.id] = { x: t.position.x, y: t.position.y });
              const t = {
                vertices: (i.vertices || []).map((e) => (null == e ? void 0 : e.id)),
                thickness: i.thickness,
                bias: i.centerLineBias,
                openings: {},
                type: i.type || void 0,
              };
              e.edges[i.id] = t;
              for (const e of i.openings || []) {
                if (!e) {
                  z.warn('Found null opening!');
                  continue;
                }
                const i = {
                  height: e.height,
                  lowerElevation: e.lowerElevation,
                  relativePos: e.relativeCenter,
                  type: e.type,
                  width: e.width,
                };
                t.openings[e.id] = i;
              }
            }
          }
          for (const c of e.rooms || []) {
            if (!c || !c.floor) {
              z.warn('Found null room');
              continue;
            }
            if (!l.floors[c.floor.id]) {
              z.warn('Unable to find floor for room!');
              continue;
            }
            const e =
                c.classifications || [].sort((e, t) => (e.confidence || 0) - (t.confidence || 0)),
              u = null === (i = c.dimensionEstimates) || void 0 === i ? void 0 : i.units,
              p = (c.label || '').trim();
            l.floors[c.floor.id].rooms[c.id] = {
              edges:
                (null === (n = null === (s = c.boundary) || void 0 === s ? void 0 : s.edges) ||
                void 0 === n
                  ? void 0
                  : n.map((e) => e.id)) || [],
              holes:
                (null === (a = c.holes) || void 0 === a
                  ? void 0
                  : a.map((e) => {
                      var t;
                      return (
                        (null === (t = e.edges) || void 0 === t ? void 0 : t.map((e) => e.id)) || []
                      );
                    })) || [],
              classifications: e,
              label: p,
              width: this.ensureMetric(
                'distance',
                null === (o = c.dimensionEstimates) || void 0 === o ? void 0 : o.width,
                u,
              ),
              length: this.ensureMetric(
                'distance',
                null === (r = c.dimensionEstimates) || void 0 === r ? void 0 : r.depth,
                u,
              ),
              area: this.ensureMetric(
                'area',
                null === (h = c.dimensionEstimates) || void 0 === h ? void 0 : h.area,
                u,
              ),
              height:
                this.ensureMetric(
                  'distance',
                  null === (d = c.dimensionEstimates) || void 0 === d ? void 0 : d.height,
                  u,
                ) || NaN,
              keywords: c.keywords || [],
              ceiling: t ? this.mdsCeilingToCeiling(c.ceiling, u) : void 0,
            };
          }
          return l;
        }
        ensureMetric(e, t, i) {
          if (null != t && null != i) {
            const s = i === S.nL.IMPERIAL,
              n = 'area' === e ? _.W3 : _._F;
            return s ? n(t) : t;
          }
          return NaN;
        }
        mdsCeilingToCeiling(e, t) {
          if (
            null != e &&
            null != e.maxHeight &&
            null != e.minHeight &&
            null != e.planes &&
            e.planes.length > 0
          ) {
            const i = [];
            for (const s of e.planes)
              if (null != s.measurements && s.measurements.length > 0) {
                const e = [];
                for (const i of s.measurements)
                  null != i.height &&
                    null != i.bottom &&
                    e.push({
                      height: this.ensureMetric('distance', i.height, t),
                      bottom: W.ep.fromVisionVector(
                        new U.Vector3(i.bottom.x, i.bottom.y, i.bottom.z),
                      ),
                    });
                e.length > 0 && i.push({ measurements: e });
              }
            if (i.length > 0)
              return {
                minHeight: this.ensureMetric('distance', e.minHeight, t),
                maxHeight: this.ensureMetric('distance', e.maxHeight, t),
                planes: i,
              };
          }
        }
      }
      var $ = i(24826),
        q = i(71369);
      class Z extends N.u {
        constructor(e, t = !1, i = !1, s = () => {}) {
          super(e),
            (this.writeRepairs = t),
            (this.ceilingsEnabled = i),
            (this.broadcast = s),
            (this.queuedMutations = []),
            (this.seenRooms = new Map()),
            (this.lastUpdates = new Map()),
            (this.entitiesToDelete = new Map()),
            (this.deserializer = new j());
        }
        async read(e) {
          var t, i;
          const s = { modelId: this.getViewId() },
            n = await this.query(G.GetRoomBounds, s, e);
          return (
            null ===
              (i = null === (t = null == n ? void 0 : n.data) || void 0 === t ? void 0 : t.model) ||
            void 0 === i
              ? void 0
              : i.floors
          )
            ? this.validateData(this.deserializer.deserialize(n.data.model, this.ceilingsEnabled))
            : null;
        }
        async readClassifications({ options: e, localizeFn: t } = {}) {
          var i;
          const s = { modelId: this.getViewId() },
            n = Object.assign(Object.assign({}, e), { prefetchKey: 'data.roomClassifications' });
          return (
            (null === (i = (await this.query(G.GetRoomClassifications, s, n)).data) || void 0 === i
              ? void 0
              : i.roomClassifications) || []
          ).reduce((e, i) => (i && (e[i.id] = t ? t(i) : i), e), {});
        }
        get readonly() {
          return this.config.readonly;
        }
        set readonly(e) {
          this.config.readonly = e;
        }
        queueAddNode(e) {
          this.queueMutation(
            `addBoundaryVertex(modelId: $modelId, id: "${e.id}", vertex: ${this.vertexDetailsFromNode(e)}) { id }`,
          );
        }
        queueUpdateNode(e) {
          this.updateEntity(
            'node',
            e.id,
            `patchBoundaryVertex(modelId: $modelId, id: "${e.id}", vertex: ${this.vertexDetailsFromNode(e)}) { id }`,
          );
        }
        vertexDetailsFromNode(e) {
          return `{\n      floorId: "${e.floorId}",\n      position: { x: ${e.x} y: ${-e.z} }\n    }`;
        }
        queueRemoveNode(e) {
          this.queueRemoveEntity('node', e.id);
        }
        queueAddWall(e) {
          this.queueMutation(
            `addBoundaryEdge(modelId: $modelId, id: "${e.id}", edge: ${this.edgeDetailsFromWall(e)}) { id }`,
          );
        }
        queueUpdateWall(e) {
          this.updateEntity(
            'wall',
            e.id,
            `patchBoundaryEdge(modelId: $modelId, id: "${e.id}" edge: ${this.edgeDetailsFromWall(e)}) { id }`,
          );
        }
        edgeDetailsFromWall(e) {
          return `\n    {\n      floorId: "${e.floorId}"\n      vertices: ["${e.from.id}", "${e.to.id}"]\n      thickness: ${e.width}\n      units: ${S.nL.METRIC}\n      centerLineBias: ${1 - e.bias}\n      type: ${e.type === $.d.SOLID ? S.Pb.WALL : S.Pb.INVISIBLE}\n    }\n    `;
        }
        queueRemoveWall(e) {
          this.queueRemoveEntity('wall', e.id);
        }
        queueAddOpening(e) {
          this.queueMutation(
            `addEdgeOpenings(modelId: $modelId, id: "${e.wallId}", openings: [${this.openingDetailsFromOpening(e)}]) { id }`,
          );
        }
        queueUpdateOpening(e) {
          this.updateEntity(
            'opening',
            e.id,
            `patchEdgeOpening(modelId: $modelId, id: "${e.wallId}", opening: ${this.openingDetailsFromOpening(e)}) { id }`,
          );
        }
        openingDetailsFromOpening(e) {
          return `\n    {\n      id: "${e.id}"\n      relativeCenter: ${e.relativePos}\n      type: ${e.type}\n      width: ${e.width}\n      height: 0.1,\n      lowerElevation: 0.1\n    }\n    `;
        }
        queueRemoveOpening(e) {
          this.queueMutation(
            `removeEdgeOpenings(\n        modelId: $modelId\n        id: "${e.wallId}"\n        openings: ["${e.id}"]\n      )`,
          ),
            this.clearEntityUpdate('opening', e.id);
        }
        queueAddRoom(e) {
          this.queueMutation(
            `addRoom(\n        modelId: $modelId,\n        id: "${e.id}",\n        room: ${this.getRoomDetailsFromRoom(e)}\n      ) { id }`,
          );
        }
        queueUpdateRoom(e) {
          const t = this.seenRooms.get(e.id);
          t && t !== e && this.clearEntityUpdate('room', e.id),
            this.seenRooms.set(e.id, e),
            this.updateEntity(
              'room',
              e.id,
              `patchRoom(\n        modelId: $modelId,\n        id: "${e.id}",\n        room: ${this.getRoomDetailsFromRoom(e)}\n      ) { id }`,
            );
        }
        getRoomDetailsFromRoom(e) {
          const t = !e.showDimensions,
            i = !e.showHeight;
          return `\n    {\n      floorId: "${e.floorId}"\n      label: "${this.escapeUserString(e.name)}"\n      classifications: [${e.roomTypeIds.map((e) => `"${e}"`)}],\n      boundary: {\n        edges: [${Array.from(e.walls.values()).map((e) => `"${e.id}"`)}],\n      }\n      holes: [${Array.from(e.holes.values()).map((e) => `{ edges: [${Array.from(e.values()).map((e) => `"${e.id}"`)}] }`)}]\n      dimensionEstimates: {\n        room: "${e.id}",\n        area: ${Number.isNaN(e.area) ? 0 : e.area},\n        areaIndoor: ${Number.isNaN(e.area) ? null : e.area},\n        depth: ${Number.isNaN(e.length) || t ? 0 : e.length}\n        width: ${Number.isNaN(e.width) || t ? 0 : e.width}\n        height: ${Number.isNaN(e.height) || i ? 0 : e.height}\n        units: ${S.nL.METRIC}\n      },\n      keywords: [${e.allKeywords().map((e) => `"${e}"`)}],\n      ${this.getCeilingDetailsForRoom(e)}\n    }\n    `;
        }
        getCeilingDetailsForRoom(e) {
          if (null != e.ceiling) {
            return `ceiling: {\n        planes: [${e.ceiling.planes.map(
              (e) =>
                `{\n          measurements: [${e.measurements.map((e) => {
                  const t = W.ep.toVisionVector(e.bottom);
                  return `{\n            height: ${e.height},\n            bottom: {\n              x: ${t.x},\n              y: ${t.y},\n              z: ${t.z},\n            }\n          }`;
                })}]\n        }`,
            )}],\n      }`;
          }
          return 'ceiling: {\n        planes: null,\n      }';
        }
        queueRemoveRoom(e) {
          this.seenRooms.delete(e.id), this.queueRemoveEntity('room', e.id);
        }
        queueRemoveLegacyRooms(e) {
          const t = e.map((e) => `"${e}"`);
          this.queueMutation(
            `deleteRoomsAndBoundaryData(\n      modelId: $modelId,\n      selectedData: {\n        ids: [${t.join(',')}],\n        type: ${S.TS.ROOM}\n      }\n    )`,
          );
        }
        queueUpdateRoomAssociations(e) {
          if (0 === e.length) return;
          this.queueMutation(
            `bulkPatchRoomData(\n        modelId: $modelId,\n        updatedRoomAssociations: [${e.map(
              (e) =>
                ((e) =>
                  `{ ${Object.keys(e)
                    .map((t) => `${t}: ${JSON.stringify(e[t])}`)
                    .join(',')} }`)(e),
            )}]\n      )`,
          );
        }
        peekQueuedMutations() {
          return this.queuedMutations.slice();
        }
        async submitQueuedMutations() {
          if ((this.checkForPendingDeletes(), 0 === this.queuedMutations.length)) return;
          const e = this.queuedMutations.slice();
          this.queuedMutations.length = 0;
          for (const e of this.lastUpdates.values()) e.clear();
          const t = [];
          let i = 0;
          const s = async () => {
            if (0 === t.length) return;
            const e = B.gql`
        mutation updateRoomBoundaries($modelId: ID!) {
          ${t.map((e, t) => `op${t}: ${e}`).join('\n')}
        }
      `;
            await this.mutate(e, { modelId: this.getViewId() }), (t.length = 0), (i = 0);
          };
          for (const n of e) {
            const e = n.startsWith('delete');
            (t.length > 40 || i + n.length > 65536 || e) && (await s()),
              t.push(n),
              (i += n.length),
              e && (await s());
          }
          await s();
        }
        updateEntity(e, t, i) {
          const s = this.lastUpdates.get(e) || new Map();
          this.lastUpdates.set(e, s);
          const n = s.get(t);
          void 0 !== n
            ? (this.queuedMutations[n] = i)
            : (this.queueMutation(i), s.set(t, this.queuedMutations.length - 1));
        }
        clearEntityUpdate(e, t) {
          const i = this.lastUpdates.get(e);
          i && i.delete(t);
        }
        queueRemoveEntity(e, t) {
          var i;
          const s = null !== (i = this.entitiesToDelete.get(e)) && void 0 !== i ? i : [];
          s.push(t), this.entitiesToDelete.set(e, s);
        }
        checkForPendingDeletes() {
          const e = [
            ['room', S.TS.ROOM],
            ['wall', S.TS.BOUNDARYEDGE],
            ['node', S.TS.BOUNDARYVERTEX],
          ];
          for (const [t, i] of e) {
            const e = this.entitiesToDelete.get(t);
            if (e) {
              const s = `deleteRoomsAndBoundaryData(\n            modelId: $modelId,\n            selectedData: {\n              ids: [${e.map((e) => `"${e}"`).join(',')}],\n              type: ${i}\n            }\n          )\n        `;
              this.queuedMutations.push(s), e.forEach((e) => this.clearEntityUpdate(t, e));
            }
          }
          this.entitiesToDelete.clear();
        }
        queueMutation(e) {
          this.checkForPendingDeletes(), this.queuedMutations.push(e);
        }
        escapeUserString(e) {
          return e.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
        }
        validateData(e) {
          var t, i, s;
          const n = this.config.readonly || !this.writeRepairs;
          Object.values(e.floors).forEach((e) => {
            const t = {};
            Object.values(e.edges).forEach((e) => {
              e.vertices &&
                e.vertices.forEach((e) => {
                  t[e] = !0;
                });
            });
            const i = {};
            Object.entries(e.vertices).forEach(([e, s]) => {
              t[e]
                ? (i[e] = s)
                : n
                  ? this.broadcast(new q.$(`validateData: Would delete orphan node: ${e}`))
                  : (this.broadcast(new q.$(`validateData: Deleting orphan node: ${e}`)),
                    this.queueRemoveEntity('node', e));
            }),
              (e.vertices = i);
          }),
            Object.values(e.floors).forEach((e) => {
              Object.entries(e.edges).forEach(([t, i]) => {
                var s;
                (2 === (null === (s = i.vertices) || void 0 === s ? void 0 : s.length) &&
                  e.vertices[i.vertices[0]] &&
                  e.vertices[i.vertices[1]]) ||
                  (delete e.edges[t],
                  n
                    ? this.broadcast(new q.$(`validateData: Would delete invalid wall: ${t}`))
                    : (this.broadcast(new q.$(`validateData: Deleting invalid wall: ${t}`)),
                      this.queueRemoveEntity('wall', t)));
              });
            });
          for (const a of Object.values(e.floors))
            for (const e of Object.keys(a.rooms)) {
              const o = a.rooms[e];
              let r = !1;
              const h = (null !== (t = o.edges) && void 0 !== t ? t : []).concat(
                null !== (s = null === (i = o.holes) || void 0 === i ? void 0 : i.flat()) &&
                  void 0 !== s
                  ? s
                  : [],
              );
              for (const e of h) {
                a.edges[e] || (r = !0);
              }
              r &&
                (n
                  ? this.broadcast(new q.$(`validateData: Would delete invalid room: ${e}`))
                  : (this.broadcast(new q.$(`validateData: Deleting invalid room: ${e}`)),
                    this.queueRemoveEntity('room', e)),
                delete a.rooms[e]);
            }
          return (
            Object.values(e.floors).forEach((e) => {
              const t = (t) => {
                  n
                    ? this.broadcast(new q.$(`validateData: Would delete existing wall: ${t}`))
                    : (this.broadcast(new q.$(`validateData: Deleting existing wall: ${t}`)),
                      this.queueRemoveEntity('wall', t)),
                    delete e.edges[t];
                },
                i = new Map();
              Object.entries(e.rooms).forEach(([e, t]) => {
                for (const s of t.edges || []) {
                  const t = i.get(s) || [];
                  t.push(e), i.set(s, t);
                }
              });
              const s = new Map();
              Array.from(Object.entries(e.edges)).forEach(([n, a]) => {
                if (!a.vertices) return;
                const o = a.vertices.slice().sort().join(':');
                if (s.has(o))
                  if (i.has(n)) {
                    const a = s.get(o);
                    if (a && !i.has(a)) t(a), s.set(o, n);
                    else if (a) {
                      const r = i.get(a);
                      for (const t of r || []) {
                        const i = e.rooms[t].edges || [];
                        for (let e = 0; e < i.length; e++) i[e] === a && (i[e] = n);
                      }
                      t(a), s.set(o, n);
                    }
                  } else t(n);
                else s.set(o, n);
              });
            }),
            n || this.submitQueuedMutations(),
            e
          );
        }
      }
      var Y = i(88726),
        X = i(43606);
      class K extends X.MU {
        constructor(e, t, i) {
          const s = new Q(),
            n = new J();
          super({
            queue: e,
            path: `${t}/api/v1/jsonstore/model/room-bound-debug/${i}`,
            batchUpdate: !1,
            deserialize: (e) => s.deserialize(e),
            serialize: (e) => n.serialize(e),
          });
        }
      }
      class Q {
        deserialize(e) {
          if (!this.isValid(e)) return null;
          return {
            mutations: e.mutations.slice(),
            error: e.error,
            localData: e.localData,
            actionList: e.actionList,
          };
        }
        isValid(e) {
          return !(!e || 'object' != typeof e) && e.mutations && 'object' == typeof e.mutations;
        }
      }
      class J {
        serialize(e, ...t) {
          return e;
        }
      }
      var ee = i(53015),
        te = i(9263),
        ie = i(70593),
        se = i(30419),
        ne = i(34608);
      class ae extends s.Y {
        constructor() {
          super(...arguments),
            (this.name = 'room_bound_data'),
            (this.associationSources = []),
            (this.modifiedFloors = new Set()),
            (this.layersChecked = !1),
            (this.processPromise = Promise.resolve()),
            (this.isProcessingCeilings = !1),
            (this.ceilingRecalcQueue = []),
            (this.afterFinalize = async () => {
              if (!this.writeBindings) throw new Error('Not permitted to write room bounds data');
              if (this.appData.error) return;
              const e = this.data.getSnapshot(),
                t = this.store.peekQueuedMutations();
              try {
                this.store.queueUpdateRoomAssociations(this.updateRoomAssociations()),
                  await this.store.submitQueuedMutations(),
                  this.data.getAndClearActionList();
              } catch (i) {
                throw (
                  (this.log.info('Error finalizing room bounds data', i),
                  this.data.clearUndoBuffer(),
                  (this.appData.error = i),
                  this.appData.commit(),
                  this.debugStore.update({
                    error: `${new Date().toUTCString()} ${i.message}`,
                    mutations: t,
                    localData: e,
                    actionList: this.data.getAndClearActionList(),
                  }),
                  i)
                );
              }
            }),
            (this.addRoom = (e) => {
              this.roomData.get(e.id) ||
                this.roomData.add(new u.d({ id: e.id, floorId: e.floorId, meshSubgroup: -1 })),
                this.addToModifiedFloors(e),
                this.data.legacyRoomIds.length &&
                  (this.store.queueRemoveLegacyRooms(this.data.legacyRoomIds),
                  this.data.legacyRoomIds.forEach((e) => this.roomData.remove(e)),
                  (this.data.legacyRoomIds.length = 0)),
                this.store.queueAddRoom(e);
            }),
            (this.removeRoom = (e) => {
              this.roomData.get(e.id) && this.roomData.remove(e.id),
                this.addToModifiedFloors(e),
                this.store.queueRemoveRoom(e);
            });
        }
        async init(e, t) {
          this.engine = t;
          const [i, s, c, u, D, P, T, C] = await Promise.all([
            t.market.waitForData(l.R),
            t.market.waitForData(p.Z),
            t.market.waitForData(n.pu),
            t.market.waitForData(o.e),
            t.market.waitForData(ie.t),
            t.market.waitForData(m.Q),
            t.getModuleBySymbol(ne.Ak),
            t.getModuleBySymbol(d.Lx),
          ]);
          (this.roomData = s),
            (this.layersData = i),
            (this.appData = c),
            (this.storageData = P),
            (this.issueCommand = t.commandBinder.issueCommand);
          const R = i.getBaseModelView();
          if (!R)
            return (
              t.market.register(this, f.Z, new f.Z(null)),
              u.setProperty(b._h, !0),
              void t.broadcast(new q.x(new Error('Unable to find view for RoomBoundData')))
            );
          (this.localeModule = await t.getModuleBySymbol(d.e9)),
            (this.store = new Z(
              { viewId: R.id, context: i.mdsContext, readonly: !0, baseUrl: e.baseUrl },
              1 === u.getOverrideParam('rbeRepair', 0),
              u.tryGetProperty(se.En, !1),
              t.broadcast.bind(t),
            )),
            (this.debugStore = new K(e.requestQueue, e.baseUrl, R.id));
          const L = await this.store.read(),
            B = await this.store.readClassifications({
              localizeFn: (e) => this.localizeRoomClassification(e),
            });
          V.Ds.forEach((e) => {
            const t = e.join(V.Rt);
            B[t] = {
              id: t,
              label: e
                .map((e) => {
                  var t;
                  return (null === (t = B[e]) || void 0 === t ? void 0 : t.label) || [];
                })
                .join(V.X9),
              defaultKeywords: (0, y.Hc)(e.map((e) => B[e])),
            };
          }),
            (this.data = new f.Z(L, B, t.broadcast.bind(t))),
            this.data.commit();
          const N = u.tryGetProperty(te.gx.RoomBounds, !1);
          (this.roomBoundViewData = new F.e(this.data, c, D, N)),
            this.data.rooms.size > 0 && u.setProperty(Y.x, !0),
            this.data.clearUndoBuffer(),
            this.data.resetHistory(),
            e.readonly ||
              ((this.writeBindings = new h.V(
                this.data.onWallsChanged({
                  onAdded: (e) => {
                    this.addToModifiedFloors(e), this.store.queueAddWall(e);
                  },
                  onUpdated: (e) => {
                    this.addToModifiedFloors(e), this.store.queueUpdateWall(e);
                  },
                  onRemoved: (e) => {
                    this.addToModifiedFloors(e), this.store.queueRemoveWall(e);
                  },
                }),
                this.data.onNodesChanged({
                  onAdded: (e) => {
                    this.addToModifiedFloors(e), this.store.queueAddNode(e);
                  },
                  onUpdated: (e) => {
                    this.addToModifiedFloors(e), this.store.queueUpdateNode(e);
                  },
                  onRemoved: (e) => {
                    this.addToModifiedFloors(e), this.store.queueRemoveNode(e);
                  },
                }),
                this.data.onRoomsChanged({
                  onAdded: this.addRoom,
                  onUpdated: (e) => {
                    this.addToModifiedFloors(e), this.store.queueUpdateRoom(e);
                  },
                  onChildUpdated: (e) => {
                    this.addToModifiedFloors(e), this.store.queueUpdateRoom(e);
                  },
                  onRemoved: this.removeRoom,
                }),
                this.data.onOpeningsChanged({
                  onAdded: (e) => {
                    this.addToModifiedFloors(e), this.store.queueAddOpening(e);
                  },
                  onUpdated: (e) => {
                    this.addToModifiedFloors(e), this.store.queueUpdateOpening(e);
                  },
                  onRemoved: (e) => {
                    this.addToModifiedFloors(e), this.store.queueRemoveOpening(e);
                  },
                }),
                C.onSave(
                  async () => {
                    this.storageData.setProcessingSubState(!0),
                      await this.processPromise,
                      this.storageData.setProcessingSubState(!1);
                  },
                  { dataType: r.g.ROOM_BOUNDS, phase: g.Q.BEFORE },
                ),
                this.data.afterFinalize(async () => {
                  this.ceilingRecalcQueue.push(async () => await this.data.recalculateCeilings()),
                    this.isProcessingCeilings ||
                      (this.processPromise = this.flushCeilingCalculations()),
                    this.engine.commandBinder.issueCommand(
                      new v.V({
                        dataTypes: [r.g.ROOM_BOUNDS],
                        onCallback: this.afterFinalize,
                        skipDirtyUpdate: !0,
                      }),
                    );
                }),
              )),
              this.writeBindings.cancel(),
              T.getSettingsGui().loadPromise.then(() => {
                T.getSettingsGui().addButton(0, 'Debug', 'Clear Ceilings', () => {
                  this.data.clearAllCeilings(),
                    this.engine.commandBinder.issueCommand(
                      new v.V({
                        dataTypes: [r.g.ROOM_BOUNDS],
                        onCallback: this.afterFinalize,
                        skipDirtyUpdate: !0,
                      }),
                    );
                });
              })),
            this.trackRoomBoundsABTest(t, c.application),
            this.bindings.push(
              t.subscribe(a.bS, (e) => this.trackRoomBoundsABTest(t, e.application)),
              t.commandBinder.addBinding(w.I, (e) =>
                this.registerRoomAssociationSource(e.roomAssociation),
              ),
            ),
            (async function (e, t) {
              const [i, s, a, r, c, u] = await Promise.all([
                e.market.waitForData(n.pu),
                e.market.waitForData(l.R),
                e.market.waitForData(o.e),
                e.market.waitForData(x.i),
                e.getModuleBySymbol(d.e9),
                e.market.waitForData(F.e),
              ]);
              let p = i.application === n.Mx.WORKSHOP;
              const m = (i, n, o, h = []) => {
                  const d = a.tryGetProperty(k.wY, !1),
                    l = a.tryGetProperty(k.dF, !1),
                    m = d || l || p,
                    g = (a.tryGetProperty(b.hW, !1) && u.visibleInShowcase) || p,
                    v = 0 === h.length;
                  if (!(g && m && v)) return [];
                  const f = [];
                  for (const o of t.rooms.values()) {
                    const h = (0, A.LN)(o.id, c, t);
                    if (i(o.name) || i(h)) {
                      const t = r.getFloor(o.floorId);
                      if (!t)
                        throw new Error(
                          'Unable to find floor for room while generating search results.',
                        );
                      f.push(new O(e.commandBinder, s, a, n, o, h, t.id));
                    }
                  }
                  return f.sort((e, t) => e.title.localeCompare(t.title));
                },
                g = (e) => {},
                v = (e) =>
                  new h.V(t.onChanged(e), a.onPropertyChanged(I.F.UnitType, e), u.onChanged(e)),
                f = {
                  renew: () => {
                    e.commandBinder.issueCommandWhenBound(
                      new M.c6({
                        id: S.SF.MODELROOM,
                        groupPhraseKey: E.Z.SHOWCASE.ROOMS.SEARCH_GROUP_HEADER,
                        getSimpleMatches: m,
                        registerChangeObserver: v,
                        onSearchActivatedChanged: g,
                        groupOrder: 100,
                        groupIcon: 'edit-floorplan',
                        batchSupported: !1,
                      }),
                    );
                  },
                  cancel: () => {
                    e.commandBinder.issueCommandWhenBound(new M.Pe(S.SF.MODELROOM));
                  },
                },
                y = () => {
                  (p = i.application === n.Mx.WORKSHOP),
                    (a.tryGetProperty(b.hW, !1) && u.visibleInShowcase) || p
                      ? f.renew()
                      : f.cancel();
                },
                w = i.onPropertyChanged('application', y),
                D = a.onPropertyChanged(b.hW, y),
                P = u.onChanged(y);
              return y(), new h.V(f, w, D, P);
            })(t, this.data).then((e) => this.bindings.push(e)),
            t.market.register(this, f.Z, this.data),
            t.market.register(this, F.e, this.roomBoundViewData);
        }
        dispose(e) {
          super.dispose(e), this.writeBindings && this.writeBindings.cancel();
        }
        async setReadOnly(e) {
          e !== this.store.readonly &&
            ((this.store.readonly = e),
            this.writeBindings &&
              (e
                ? this.writeBindings.cancel()
                : (this.writeBindings.renew(),
                  this.layersChecked ||
                    (await this.issueCommand(new c.fk()),
                    this.layersData.getProxyLayerId() || (await this.issueCommand(new c.vO())),
                    this.data.validateGraph()))));
        }
        localizeRoomClassification(e) {
          return this.localeModule
            ? Object.assign(Object.assign({}, e), { label: (0, A.Nw)(e, this.localeModule) })
            : e;
        }
        trackRoomBoundsABTest(e, t) {
          Promise.all([e.getModuleBySymbol(d.V6), e.market.waitForData(o.e)]).then(([e, i]) => {
            const s = this.data.rooms.size > 0,
              a = t === n.Mx.WORKSHOP || (s && (0, b.G)(i));
            e.trackFeatures(`${b.A0}:${a}`);
          });
        }
        addToModifiedFloors(e) {
          this.modifiedFloors.add(e.floorId);
        }
        updateRoomAssociations() {
          const e = new Map();
          for (const t of this.associationSources)
            for (const i of t.getPositionId()) {
              if (
                !i.floorId ||
                !this.modifiedFloors.has(i.floorId) ||
                !(0, ee.O)(this.data, this.layersData, i.layerId)
              )
                continue;
              const s = this.data.findRoomIdForPosition(i.position, i.floorId, i.roomId);
              if (s != i.roomId) {
                const n = e.get(s) || (s ? { roomId: s } : { resetRoom: !0 }),
                  a = n[t.type] || [];
                a.push(i.id), (n[t.type] = a), e.set(s, n), t.updateRoomForId(i.id, s);
              }
            }
          return this.modifiedFloors.clear(), Array.from(e.values());
        }
        async registerRoomAssociationSource(e) {
          this.associationSources.push(e);
        }
        async flushCeilingCalculations() {
          for (this.isProcessingCeilings = !0; this.ceilingRecalcQueue.length > 0; )
            await this.ceilingRecalcQueue[0](), this.ceilingRecalcQueue.shift();
          this.isProcessingCeilings = !1;
        }
        async computeAllCeilingsIfNecessary() {
          Array.from(this.data.rooms.values()).some((e) => null != e.ceiling) ||
            (this.ceilingRecalcQueue.push(async () => await this.data.recalculateCeilings(!0)),
            (this.processPromise = this.flushCeilingCalculations()),
            await this.processPromise);
        }
      }
      const oe = ae;
    },
    21998: (e, t, i) => {
      'use strict';
      i.d(t, { $: () => n, o: () => s });
      var s,
        n,
        a = i(72803);
      !(function (e) {
        (e[(e.BASE = a.z.roomBounds)] = 'BASE'),
          (e[(e.OPENING_STENCIL = a.z.roomBounds + 1)] = 'OPENING_STENCIL'),
          (e[(e.EDGE_STENCIL = a.z.roomBounds + 2)] = 'EDGE_STENCIL'),
          (e[(e.ROOM = a.z.roomBounds + 3)] = 'ROOM'),
          (e[(e.EDGE = a.z.roomBounds + 4)] = 'EDGE'),
          (e[(e.HIGHLIGHTED_EDGE = a.z.roomBounds + 5)] = 'HIGHLIGHTED_EDGE'),
          (e[(e.OPENING_LINES = a.z.roomBounds + 6)] = 'OPENING_LINES'),
          (e[(e.NODE = a.z.roomBounds + 7)] = 'NODE');
      })(s || (s = {})),
        (function (e) {
          (e[(e.OPENINGS = 0)] = 'OPENINGS'), (e[(e.EDGE = 1)] = 'EDGE');
        })(n || (n = {}));
    },
    9975: (e, t, i) => {
      'use strict';
      i.d(t, { c: () => k });
      var s = i(50831),
        n = i(83191),
        a = i(5829),
        o = i(43627),
        r = i(26059),
        h = i(86743);
      function d(e, t, i) {
        const s = (function (e) {
          return (e / 180) * Math.PI;
        })(t || 0);
        if (!i || (0 === i[0] && 0 === i[1])) return l(e, s);
        return l(
          e.map((e, t) => e - i[t]),
          s,
        ).map((e, t) => e + i[t]);
      }
      function l(e, t) {
        return [e[0] * Math.cos(t) - e[1] * Math.sin(t), e[0] * Math.sin(t) + e[1] * Math.cos(t)];
      }
      function c(e, t, i) {
        let s = [];
        for (let n = 0, a = e.length; n < a; n++) s[n] = d(e[n], t, i);
        return s;
      }
      var u = i(75327),
        p = i(81396),
        m = i(21998),
        g = i(60103),
        v = i(70873),
        f = i(59339);
      class y extends p.Mesh {
        constructor(e, t, i) {
          const s = new Float32Array([-1, 0, -1, 1, 1, 1, 1, 0]),
            n = new Float32Array([0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0]),
            a = new p.BufferGeometry();
          a.setAttribute('offset', new p.Float32BufferAttribute(s, 2)),
            a.setAttribute('normal', new p.Float32BufferAttribute(n, 3)),
            a.setIndex([0, 3, 1, 3, 2, 1]);
          super(
            a,
            new p.RawShaderMaterial({
              uniforms: p.UniformsUtils.clone(f.Ud.uniforms),
              vertexShader: f.Ud.vertexShader,
              fragmentShader: f.Ud.fragmentShader,
              side: p.DoubleSide,
              transparent: !0,
              depthTest: !1,
            }),
          ),
            this.updateState(e, t, i),
            (this.renderOrder = m.o.EDGE),
            (this.frustumCulled = !1),
            (this.onBeforeRender = (e) => {
              e.getSize(this.material.uniforms.screenSize.value);
            });
        }
        setUniformParams(e) {
          for (const t in e) {
            const i = e;
            this.material.uniforms[t].value = i[t];
          }
        }
        updateState(e, t, i) {
          this.material.uniforms.tip.value.copy(e),
            this.material.uniforms.normal.value.copy(t),
            (this.material.uniforms.height.value = i);
        }
        updateOpacity(e) {
          this.material.uniforms.opacity.value = e;
        }
        updateMetersPerPx(e) {
          this.material.uniforms.metersPerPx.value = e;
        }
        raycast(e) {}
      }
      var w,
        b = i(61077),
        D = i(91435),
        S = i(72803);
      !(function (e) {
        (e[(e.PIXELS = 0)] = 'PIXELS'), (e[(e.METERS = 1)] = 'METERS');
      })(w || (w = {}));
      class I extends p.Mesh {
        constructor(e, t, i) {
          const s = new Float32Array([
              -9999, -9999, -9999, 9999, 9999, 9999, -9999, -9999, -9999, 9999, 9999, 9999, 9999,
              9999, 9999, -9999, -9999, -9999,
            ]),
            n = new Float32Array([1, 1, 0, 0, -1, -1]),
            a = new Float32Array([0, 1, 0, 1, 0, 1]),
            o = new p.InstancedBufferGeometry();
          o.setAttribute('position', new p.Float32BufferAttribute(s, 3)),
            o.setAttribute('offsetDirection', new p.Float32BufferAttribute(n, 1)),
            o.setAttribute('t', new p.Float32BufferAttribute(a, 1)),
            o.setIndex([0, 1, 3, 2, 0, 3, 2, 3, 5, 4, 2, 5]);
          const r = {},
            h = {};
          (null == t ? void 0 : t.dashUnits) === w.METERS &&
            ((r.WORLDSPACE_DASH = !0), (h.derivatives = !0));
          const d = null == t ? void 0 : t.fadeDistanceFromCamera;
          null != d && (r.FADE_DISTANCE_FROM_CAMERA = d.toFixed(2));
          super(
            o,
            new p.RawShaderMaterial({
              uniforms: p.UniformsUtils.clone(D.T.screenline.uniforms),
              side: p.DoubleSide,
              vertexShader: D.T.screenline.vertexShader,
              fragmentShader: D.T.screenline.fragmentShader,
              transparent: !0,
              depthTest: t.depthTest,
              depthWrite: t.depthWrite,
              depthFunc: t.depthFunc,
              defines: r,
              extensions: h,
            }),
          ),
            (this.cameraPose = i),
            this.updateEndpoints(e),
            this.geometry.computeBoundingBox(),
            this.geometry.computeBoundingSphere(),
            (this.renderOrder = S.z.lines),
            (this.onBeforeRender = (e) => {
              e.getSize(this.material.uniforms.screenSize.value),
                null != this.cameraPose &&
                  this.material.uniforms.cameraPos.value.copy(this.cameraPose.position);
            }),
            (this.material.uniforms.dashed.value = +t.dashed),
            (this.material.uniforms.dashSize.value = t.dashSize),
            (this.material.uniforms.gapSize.value = t.gapSize),
            (this.material.uniforms.lineWidth.value = t.lineWidth),
            this.material.uniforms.color.value.copy(t.color),
            (this.material.uniforms.globalOpacity.value = t.globalOpacity);
        }
        updateEndpoints(e) {
          var t;
          3 * e.length !== (null === (t = this.start) || void 0 === t ? void 0 : t.length) &&
            (this.geometry.dispose(),
            (this.start = new Float32Array(3 * e.length)),
            (this.startAttrib = new p.InstancedBufferAttribute(this.start, 3)),
            this.geometry.setAttribute('start', this.startAttrib),
            (this.end = new Float32Array(3 * e.length)),
            (this.endAttrib = new p.InstancedBufferAttribute(this.end, 3)),
            this.geometry.setAttribute('end', this.endAttrib),
            (this.opacity = new Float32Array(e.length)),
            (this.opacityAttrib = new p.InstancedBufferAttribute(this.opacity, 1)),
            this.geometry.setAttribute('opacity', this.opacityAttrib));
          for (let t = 0; t < e.length; t++) {
            const i = e[t].points,
              s = e[t].opacity;
            i[0].toArray(this.start, 3 * t),
              i[1].toArray(this.end, 3 * t),
              (this.opacity[t] = null != s ? s : 1);
          }
          (this.startAttrib.needsUpdate = !0),
            (this.endAttrib.needsUpdate = !0),
            (this.opacityAttrib.needsUpdate = !0);
        }
        setVisibilityAt(e, t) {
          const i = t ? 1 : 0;
          (this.opacity[e] = i), (this.opacityAttrib.needsUpdate = !0);
        }
        globalOpacity(e) {
          this.material.uniforms.globalOpacity.value = e;
        }
        color(e) {
          this.material.uniforms.color.value.copy(e);
        }
      }
      var P = i(11250),
        T = i(3835),
        E = i(49338),
        M = i.n(E),
        C = i(38985),
        x = i.n(C);
      const R = {
        uniforms: {
          screenSize: { value: new p.Vector2(0, 0) },
          color: { value: new p.Vector3(1, 1, 1) },
          radius: { value: 10 },
          opacity: { value: 1 },
        },
        vertexShader: M(),
        fragmentShader: x(),
      };
      class L extends p.Mesh {
        constructor(e, t) {
          const i = new Float32Array([
              -9999, -9999, -9999, 9999, 9999, 9999, -9999, -9999, -9999, 9999, 9999, 9999,
            ]),
            s = new Float32Array([-1, 1, 1, 1, 1, -1, -1, -1]),
            n = new p.InstancedBufferGeometry();
          n.setAttribute('position', new p.Float32BufferAttribute(i, 3)),
            n.setAttribute('offsetDirection', new p.Float32BufferAttribute(s, 2)),
            n.setIndex([0, 3, 1, 1, 3, 2]);
          super(
            n,
            new p.RawShaderMaterial({
              uniforms: p.UniformsUtils.clone(R.uniforms),
              vertexShader: R.vertexShader,
              fragmentShader: R.fragmentShader,
              transparent: !0,
              depthTest: !1,
              depthWrite: !1,
            }),
          ),
            this.setPositions(e),
            this.setMaterialParams(t),
            (this.frustumCulled = !1),
            (this.onBeforeRender = (e) => {
              e.getSize(this.material.uniforms.screenSize.value);
            });
        }
        setMaterialParams(e) {
          null != e.color && this.material.uniforms.color.value.copy(e.color),
            null != e.opacity && (this.material.uniforms.opacity.value = e.opacity),
            null != e.radius && (this.material.uniforms.radius.value = e.radius);
        }
        setPositions(e) {
          this.geometry.dispose();
          const t = new Float32Array(3 * e.length);
          for (let i = 0; i < e.length; i++)
            (t[3 * i] = e[i].position.x),
              (t[3 * i + 1] = e[i].position.y),
              (t[3 * i + 2] = e[i].position.z);
          const i = new p.InstancedBufferAttribute(t, 3);
          this.geometry.setAttribute('center', i), (i.needsUpdate = !0);
        }
      }
      class A extends p.Object3D {
        constructor(e, t, i, n, a, o, r, h) {
          super(),
            (this.labelManager = n),
            (this.floorId = a),
            (this.units = o),
            (this.cameraPoseData = r),
            (this.roomBoundViewData = h),
            (this.labels = []),
            (this.userIsInside = !1),
            (this.lines = []),
            (this.datumLines = []),
            (this.roofLinesOffset = 0),
            (this.tempUp = new p.Vector3()),
            (this.solidOutlines = new I(
              this.lines,
              {
                dashed: !1,
                dashSize: 1,
                gapSize: 1,
                lineWidth: 0.5,
                color: s.I.WHITE,
                dashUnits: w.METERS,
                depthWrite: !1,
                depthTest: !1,
                depthFunc: p.LessDepth,
                globalOpacity: 1,
                fadeDistanceFromCamera: 9,
              },
              this.cameraPoseData,
            )),
            (this.solidDatums = new I(
              this.lines,
              {
                dashed: !0,
                dashSize: 10,
                gapSize: 4,
                lineWidth: 1,
                color: s.I.WHITE,
                dashUnits: w.PIXELS,
                depthWrite: !1,
                depthTest: !0,
                depthFunc: p.LessDepth,
                globalOpacity: 1,
              },
              this.cameraPoseData,
            )),
            (this.fadedDatums = new I(
              this.lines,
              {
                dashed: !0,
                dashSize: 10,
                gapSize: 4,
                lineWidth: 1,
                color: s.I.WHITE,
                dashUnits: w.PIXELS,
                depthWrite: !1,
                depthTest: !0,
                depthFunc: p.GreaterDepth,
                globalOpacity: 0.4,
              },
              this.cameraPoseData,
            )),
            (this.datumCircles = new L([], { radius: 5 })),
            this.add(this.solidOutlines),
            this.add(this.solidDatums),
            this.add(this.fadedDatums),
            this.add(this.datumCircles),
            this.updateEndpoints(e, t, o, i),
            this.updateLabelEndpoints();
        }
        updateEndpoints(e, t, i, s) {
          (this.units = i), (this.datumLines = e.map((e) => ({ points: e.points, opacity: 1 })));
          const n = [],
            a = [];
          if (null != s) {
            this.tempUp.copy(T.fU.UP).multiplyScalar(s);
            for (const e of t) {
              const t = new p.Vector3().copy(e.points[0]);
              (t.y += s),
                n.push({ points: [e.points[0], t] }),
                a.push({
                  points: [
                    e.points[0].clone().add(this.tempUp),
                    e.points[1].clone().add(this.tempUp),
                  ],
                });
            }
          }
          (this.roofLinesOffset = t.length + n.length),
            (this.lines = t.concat(n, a).map((e) => ({ points: e.points, opacity: 1 }))),
            this.solidOutlines.updateEndpoints(this.lines),
            this.solidDatums.updateEndpoints(this.datumLines),
            this.fadedDatums.updateEndpoints(this.datumLines);
          const o = [];
          for (const e of this.datumLines) for (const t of e.points) o.push({ position: t });
          this.datumCircles.setPositions(o), this.updateLabelEndpoints();
        }
        onRender(e) {
          var t, i;
          if (
            (this.solidOutlines.globalOpacity(1 * e),
            this.solidDatums.globalOpacity(1 * e),
            this.fadedDatums.globalOpacity(0.4 * e),
            this.datumCircles.setMaterialParams({ opacity: 1 * e }),
            this.userIsInside && this.roomBoundViewData.roomDimensionsVisible)
          ) {
            for (const e of this.labels)
              e.distanceToCamera() < 9 ? e.setVisible(!0) : e.setVisible(!1);
            null === (t = this.datumLabel) || void 0 === t || t.setVisible(!0);
          } else {
            for (const e of this.labels) e.setVisible(!1);
            null === (i = this.datumLabel) || void 0 === i || i.setVisible(!1);
          }
        }
        setUserIsInsideRoom(e) {
          (this.solidOutlines.visible = e),
            (this.solidDatums.visible = e),
            (this.fadedDatums.visible = e),
            (this.datumCircles.visible = e),
            (this.userIsInside = e);
        }
        updateLabelEndpoints() {
          var e;
          if (this.roofLinesOffset !== this.labels.length) {
            const e = this.roofLinesOffset - this.labels.length;
            e > 0 ? this.createLabels(e, this.labels) : e < 0 && this.deleteLabels(e, this.labels);
          }
          for (let e = 0; e < this.roofLinesOffset; e++) {
            const t = this.lines[e];
            this.labels[e].updateDimensions(t.points[0], t.points[1], 0, this.units),
              this.labels[e].isVertical(t.points[0], t.points[1]) &&
                (this.labels[e].labelGroupId = 'inside_height_label');
          }
          this.datumLines.length > 0 &&
            (null == this.datumLabel &&
              ((this.datumLabel = this.labelManager.createDatumLabel(this.floorId)),
              this.datumLabel.addTo(this),
              this.datumLabel.setVisible(!0)),
            null === (e = this.datumLabel) ||
              void 0 === e ||
              e.updateDimensions(
                this.datumLines[0].points[0],
                this.datumLines[0].points[1],
                0,
                this.units,
              ));
        }
        createLabels(e, t) {
          for (let i = 0; i < e; i++) {
            const e = this.labelManager.createInsideLabel(this.floorId);
            t.push(e), e.addTo(this);
          }
        }
        deleteLabels(e, t) {
          for (let i = 0; i < e; i++) {
            const e = t.pop();
            null == e || e.removeFrom(this), null == e || e.dispose();
          }
        }
      }
      const F = {
        baseState: { innerColor: s.I.LENS_GRAY, outerColor: s.I.WHITE, opacity: 0 },
        hoverState: { innerColor: s.I.WHITE, outerColor: s.I.WHITE, opacity: 0.25 },
        selectState: { innerColor: s.I.NEPTUNE, outerColor: s.I.WHITE, opacity: 0 },
        dimState: { innerColor: s.I.LENS_GRAY, outerColor: s.I.WHITE, opacity: 0.5 },
      };
      class k extends g.H {
        constructor(e, t, i, o, h, d) {
          const l = k.getGeoFromRoom(e, t),
            c = new p.MeshBasicMaterial({
              color: s.I.LENS_GRAY,
              depthTest: !1,
              side: p.DoubleSide,
              transparent: !0,
              opacity: 0,
              blending: p.NormalBlending,
              blendEquation: p.AddEquation,
              blendSrc: p.SrcAlphaFactor,
              blendDst: p.DstColorFactor,
              stencilRef: 65535,
              stencilFuncMask: 1 << m.$.EDGE,
              stencilFail: p.KeepStencilOp,
              stencilZFail: p.KeepStencilOp,
              stencilZPass: p.KeepStencilOp,
              stencilFunc: p.GreaterStencilFunc,
              stencilWrite: !0,
            });
          super(e.id, l, c, i),
            (this.baseHeight = t),
            (this.roomBoundViewData = o),
            (this.labelManager = h),
            (this.units = d),
            (this.potentialLabels = []),
            (this.perimeterLabels = []),
            (this.dimensionCarets = [
              new y(new p.Vector2(), new p.Vector2(), 0),
              new y(new p.Vector2(), new p.Vector2(), 0),
              new y(new p.Vector2(), new p.Vector2(), 0),
              new y(new p.Vector2(), new p.Vector2(), 0),
            ]),
            (this.hideMaterial = new p.RawShaderMaterial({
              vertexShader: f.AK.vertexShader,
              fragmentShader: f.AK.fragmentShader,
              uniforms: p.UniformsUtils.clone(f.AK.uniforms),
              depthTest: !1,
              side: p.DoubleSide,
              transparent: !0,
            })),
            (this.perimeterLabelsVisible = !1),
            (this.fullLabelVisible = !1),
            (this.hoverTimer = null),
            (this.labelHovered = !1),
            (this.heightLines = new p.Group()),
            (this.heightLabels = []),
            (this.insideNess = 0),
            (this.getLabelPolygon = (() => {
              const e = new p.Vector3(),
                t = [0, 0],
                i = [t, [0, 0], [0, 0], [0, 0], t];
              return (t, s) => {
                const a = this.cameraData.pose.position.distanceTo(s),
                  o = (0, r._U)(
                    a,
                    this.cameraData.pose.projection.asThreeMatrix4(),
                    this.cameraData.width,
                  ),
                  h = t.split('\n'),
                  d = h.reduce((e, t) => Math.max(e, t.length), 0),
                  l = (0, n.hJ)(d, 0, 0),
                  c = s.x,
                  u = s.z,
                  p = 0.5 * l.width * o,
                  m = 0.5 * l.height * o * h.length;
                return (
                  e.set(c - p, 0, u - m),
                  e.applyQuaternion(this.cameraData.pose.rotation),
                  (i[0][0] = c - p),
                  (i[0][1] = u - m),
                  (i[1][0] = c + p),
                  (i[1][1] = u - m),
                  (i[2][0] = c + p),
                  (i[2][1] = u + m),
                  (i[3][0] = c - p),
                  (i[3][1] = u + m),
                  i
                );
              };
            })()),
            (this.baseHeight += 0.01),
            (this.standardMaterial = c),
            (this.renderOrder = m.o.ROOM),
            (this.roomLabel = this.labelManager.createRoomLabel(e.floorId, e.id)),
            this.roomLabel.addTo(this),
            this.roomLabel.setVisible(!e.hide),
            (this.room = e);
          for (const e of this.dimensionCarets) this.add(e);
          this.updateLabel(!0),
            (this.colors = F),
            this.animation.onChanged(() => {
              const e = this.prevColorState;
              this.standardMaterial.color.lerpColors(
                e.innerColor,
                this.targetColorScheme.innerColor,
                this.animation.value,
              );
              const t = (0, a.t)(e.opacity, this.targetColorScheme.opacity, this.animation.value);
              (this.opacity = t),
                (this.hideMaterial.uniforms.opacity.value = this.roomLabel.label.opacity);
            }),
            this.add(this.heightLines);
          const {
            datumLines: u,
            perimeterLines: g,
            height: v,
          } = this.calculateInsideModeLinePositions();
          (this.insideModeLines = new A(
            u,
            g,
            v,
            h,
            e.floorId,
            this.units,
            this.cameraData.pose,
            this.roomBoundViewData,
          )),
            this.add(this.insideModeLines);
        }
        hasIntersectionPriorityWithRespectTo(e) {
          return !(!e.object || !e.object.isModelMesh);
        }
        dispose() {
          this.labelManager.deleteLabel(this.roomLabel);
          for (const e of this.perimeterLabels) this.labelManager.deleteLabel(e), e.dispose();
          for (const e of this.heightLabels) this.labelManager.deleteLabel(e), e.dispose();
          this.datumLabel &&
            (this.labelManager.deleteLabel(this.datumLabel), this.datumLabel.dispose()),
            this.clearHoverTimer(),
            super.dispose();
        }
        hoverRoomLabel(e) {
          const t = () => {
            if ((!e && this.roomLabel.getDisplayingTooltip() === e) || (e && this.fullLabelVisible))
              return void (e || ((this.labelHovered = !1), this.updateMaterial()));
            this.roomLabel.setDisplayingTooltip(e), this.updateMaterial();
            const t = this.roomLabel.label.collider.material;
            (t.opacity = e ? 0.65 : 0),
              (t.transparent = !0),
              this.updateLabel(!1),
              this.updateCarets();
          };
          (this.labelHovered = e),
            e
              ? null === this.hoverTimer &&
                ((this.hoverTimer = window.setTimeout(t, v.qb)), this.updateMaterial())
              : (t(), this.clearHoverTimer());
        }
        updateGeo(e, t, i) {
          this.room = e;
          const s = isNaN(this.room.floorHeight) ? t : this.room.floorHeight;
          this.baseHeight = s + 0.01;
          const n = k.getGeoFromRoom(e, s);
          this.geometry.dispose(),
            (this.geometry = n),
            this.geometry.computeBoundingBox(),
            this.updateLabel(!1),
            (this.units = i),
            this.updateLabels(),
            this.createHeightObjects();
          const {
            datumLines: a,
            perimeterLines: o,
            height: r,
          } = this.calculateInsideModeLinePositions();
          this.insideModeLines.updateEndpoints(a, o, i, r);
        }
        beforeRender() {
          this.standardMaterial.opacity =
            this.opacity * (1 - this.pitchFactor) * Number(this.roomBoundViewData.roomWallsVisible);
          const e = this.dimState.active ? 0.5 : 1;
          for (const t of this.dimensionCarets)
            t.updateMetersPerPx(this.cameraData.metersPerPx()),
              t.updateOpacity((1 - this.pitchFactor) * e);
          this.updateLabelBillboard(), this.updateMaterial(), this.updateCarets();
        }
        updateLabelBillboard() {
          if (this.isRoomLabelVisible()) {
            const { position: e, rotation: t, projection: i } = this.cameraData.pose,
              { height: s } = this.cameraData,
              n = this.cameraData.isOrtho() ? this.cameraData.zoom() : 1,
              a = this.cameraData.aspect(),
              o = 0.1;
            this.roomLabel.label.quaternion.copy(t),
              this.roomLabel.label.scaleBillboard(e, t, i, n, s, a, o),
              this.updateLabel(!1);
          }
          for (const e of this.perimeterLabels) e.update();
          for (const e of this.heightLabels) e.update();
          this.datumLabel && this.datumLabel.update();
        }
        updateLabelVisibility() {
          const e = this.hoverState.active || this.labelHovered;
          (this.perimeterLabelsVisible =
            this.roomBoundViewData.roomDimensionsVisible &&
            (this.selectState.active || (e && (0, P.Eb)(this.pitchFactor))) &&
            this.insideNess < 0.9),
            this.updateLabels();
          for (const e of this.perimeterLabels) e.setVisible(this.perimeterLabelsVisible);
          const t = this.perimeterLabelsVisible && !(0, P.Eb)(this.pitchFactor);
          for (const e of this.heightLabels) e.setVisible(t);
          this.datumLabel && this.datumLabel.setVisible(t), this.updateCarets();
        }
        updateMaterial() {
          (this.material = this.room.hide ? this.hideMaterial : this.standardMaterial),
            super.updateMaterial();
          const e = this.hoverState.active || this.labelHovered,
            t = (0, P.Eb)(this.pitchFactor),
            i =
              (this.selectState.active || e) && !t && this.roomBoundViewData.roomDimensionsVisible;
          (this.heightLines.visible = !!i),
            e && t && (this.targetColorScheme = this.colors.hoverState);
          const s = this.standardMaterial;
          this.prevColorState.innerColor.copy(s.color),
            (this.prevColorState.opacity = s.opacity),
            this.animation.modifyAnimation(0, 1, v.rP, h.hl),
            this.roomLabel.setDimmed(this.dimState.active),
            this.roomLabel.setVisible(this.isRoomLabelVisible()),
            this.updateLabelVisibility();
        }
        isRoomLabelVisible() {
          const e = this.hoverState.active || this.labelHovered;
          return !(this.insideNess > 0.9) && (!this.room.hide || e);
        }
        updateText(e, t) {
          (this.potentialLabels = e), this.updateLabel(t), this.updateCarets();
        }
        static getGeoFromRoom(e, t) {
          const { points: i, faces: s } = e.getGeometry(),
            n = i.map((e) => [e.x, t, e.y]).flat(1),
            a = new p.BufferGeometry();
          return (
            a.setAttribute('position', new p.BufferAttribute(new Float32Array(n), 3)),
            a.setIndex(s.flat(1)),
            a
          );
        }
        updateLabel(e) {
          if (0 === this.potentialLabels.length) return;
          const t = this.room.points.map((e) => [e.x, e.z]);
          t.push(t[0]);
          const i = new p.Euler().setFromQuaternion(this.cameraData.pose.rotation).z,
            s = o.MN * i,
            n = [];
          if (!e) {
            const { position: e } = this.roomLabel.label,
              t = { x: e.x, y: e.z };
            this.room.holesCW.find((e) => {
              const i = e.map((e) => ({ x: e.x, y: e.z }));
              return (0, b.L)(t, i);
            }) || n.push(e.clone());
          }
          n.push(this.room.getViewCenter(new p.Vector3(), 1.5));
          for (const e of n) {
            this.roomLabel.label.position.copy(e),
              (this.roomLabel.label.position.y = this.baseHeight + v.mU);
            let i = !1;
            this.fullLabelVisible = !0;
            for (const a of this.potentialLabels) {
              const o = c(this.getLabelPolygon(a, e), -s, [e.x, e.z]);
              if (
                (0, u.D)(o, t) ||
                this.roomLabel.getDisplayingTooltip() ||
                (e === n[n.length - 1] && '...' === a)
              ) {
                (this.roomLabel.label.text = a), (i = !0);
                break;
              }
              this.fullLabelVisible = !1;
            }
            if (i) break;
          }
        }
        calculateInsideModeLinePositions() {
          const e = this.room.getMaxCeilingDatum(),
            t = [];
          if (e) {
            const i = new p.Vector3(e.position.x, this.baseHeight, e.position.z),
              s = new p.Vector3(e.position.x, this.baseHeight + e.height, e.position.z);
            t.push({ points: [i, s] });
          }
          const i = [],
            s = this.room.calculateMinimalInnerLoop();
          for (const e of s) {
            const t = e.length;
            for (let s = 0; s < t; s++) {
              const n = new p.Vector3().copy(e[s]);
              n.y = this.baseHeight;
              const a = new p.Vector3().copy(e[(s + 1) % t]);
              (a.y = this.baseHeight), i.push({ points: [n, a] });
            }
          }
          return {
            datumLines: t,
            perimeterLines: i,
            height: this.room.canDisplayHeight() ? this.room.getMinCeilingHeight() : void 0,
          };
        }
        updateLabels() {
          var e;
          if (!this.perimeterLabelsVisible) return;
          const t = this.room.hide ? [] : this.room.minimalInnerEdges,
            i = this.room.canDisplayHeight() ? t.length : 0;
          for (; t.length > this.perimeterLabels.length; )
            this.perimeterLabels.push(
              this.labelManager.createPerimeterLabel(this.room.floorId, !0).addTo(this),
            );
          for (; i > this.heightLabels.length; ) {
            const e = this.labelManager.createHeightLabel(this.room.floorId, !1, !0).addTo(this);
            (e.labelGroupId = this.room.id), this.heightLabels.push(e);
          }
          for (; t.length < this.perimeterLabels.length; ) {
            const e = this.perimeterLabels.pop();
            if (!e) throw new Error('Label should exist!');
            this.labelManager.deleteLabel(e);
          }
          for (; i < this.heightLabels.length; ) {
            const e = this.heightLabels.pop();
            if (!e) throw new Error('Label should exist!');
            this.labelManager.deleteLabel(e);
          }
          for (let e = 0; e < t.length; e++) {
            const s = t[e],
              n = s.start.clone();
            n.y = this.baseHeight;
            const a = s.end.clone();
            if (
              ((a.y = this.baseHeight),
              this.perimeterLabels[e].updateDimensions(n, a, 0, this.units),
              i > 0)
            ) {
              const t = n.clone(),
                i = t.clone();
              (i.y = this.baseHeight + this.room.getMinCeilingHeight()),
                this.heightLabels[e].updateDimensions(t, i, 0, this.units);
            }
          }
          const s = this.room.getMaxCeilingDatum();
          if (null != s) {
            null == this.datumLabel &&
              ((this.datumLabel = this.labelManager
                .createDatumLabel(this.room.floorId)
                .addTo(this)),
              (this.datumLabel.labelGroupId = this.room.id + '_max_height'),
              (this.datumLabel.labelHeightFraction = 2 / 3));
            const t = s.position.clone();
            t.y = this.baseHeight;
            const i = t.clone();
            (i.y += s.height),
              null === (e = this.datumLabel) ||
                void 0 === e ||
                e.updateDimensions(t, i, 0, this.units);
          } else
            this.datumLabel &&
              (this.datumLabel.dispose(),
              this.labelManager.deleteLabel(this.datumLabel),
              (this.datumLabel = null));
          this.labelManager.needsImmediateCollsisionDetection(), this.labelManager.update();
        }
        updateCarets() {
          const e = this.cameraData.metersPerPx(),
            t = this.room.length / e,
            i = this.room.width / e,
            s = this.roomLabel.getSize(),
            n = s.width + 2 > t,
            a = s.height + 2 > i,
            o = this.fullLabelVisible && (n || a),
            r =
              this.roomBoundViewData.roomDimensionsVisible &&
              this.roomBoundViewData.roomWallsVisible;
          if (
            this.room.canDisplayDimensions() &&
            !this.perimeterLabelsVisible &&
            this.fullLabelVisible &&
            !o &&
            r
          ) {
            const e = new p.Vector2();
            e.subVectors(this.room.w2, this.room.w1).normalize(),
              this.dimensionCarets[0].updateState(this.room.w1, e, this.baseHeight),
              (this.dimensionCarets[0].visible = !0),
              e.subVectors(this.room.w1, this.room.w2).normalize(),
              this.dimensionCarets[1].updateState(this.room.w2, e, this.baseHeight),
              (this.dimensionCarets[1].visible = !0),
              e.subVectors(this.room.l2, this.room.l1).normalize(),
              this.dimensionCarets[2].updateState(this.room.l1, e, this.baseHeight),
              (this.dimensionCarets[2].visible = !0),
              e.subVectors(this.room.l1, this.room.l2).normalize(),
              this.dimensionCarets[3].updateState(this.room.l2, e, this.baseHeight),
              (this.dimensionCarets[3].visible = !0);
          } else for (const e of this.dimensionCarets) e.visible = !1;
        }
        clearHoverTimer() {
          null !== this.hoverTimer && (clearTimeout(this.hoverTimer), (this.hoverTimer = null));
        }
        createHeightObjects() {
          this.heightLines.clear();
          const e = {
              dashed: !1,
              dashSize: 1,
              gapSize: 1,
              lineWidth: 1,
              color: s.I.WHITE,
              dashUnits: w.METERS,
              depthWrite: !1,
              depthTest: !0,
              depthFunc: p.LessDepth,
              globalOpacity: 1,
            },
            t = {
              dashed: !1,
              dashSize: 0.08,
              gapSize: 0.04,
              lineWidth: 0.5,
              color: s.I.WHITE,
              dashUnits: w.METERS,
              depthWrite: !1,
              depthTest: !0,
              depthFunc: p.GreaterDepth,
              globalOpacity: 0.3,
            },
            i = {
              dashed: !0,
              dashSize: 10,
              gapSize: 4,
              lineWidth: 1,
              color: s.I.WHITE,
              dashUnits: w.PIXELS,
              depthWrite: !1,
              depthTest: !0,
              depthFunc: p.LessDepth,
              globalOpacity: 1,
            },
            n = {
              dashed: !0,
              dashSize: 10,
              gapSize: 4,
              lineWidth: 1,
              color: s.I.WHITE,
              dashUnits: w.PIXELS,
              depthWrite: !1,
              depthTest: !0,
              depthFunc: p.GreaterDepth,
              globalOpacity: 0.3,
            },
            a = [],
            o = (e, t, i = a) => {
              i.push({ points: [e.clone(), t.clone()] });
            },
            r = [],
            h = new p.Vector3(),
            d = new p.Vector3(),
            l = this.room.minimalInnerLoop,
            c = this.room.getMinCeilingHeight();
          for (const e of l) {
            const t = e.length;
            for (let i = 0; i < t; i++)
              h.copy(e[i]),
                (h.y = this.baseHeight),
                d.copy(e[(i + 1) % t]),
                (d.y = this.baseHeight),
                o(h, d),
                this.room.canDisplayHeight() && ((h.y += c), (d.y += c), o(h, d));
            if (this.room.canDisplayHeight())
              for (const t of e) h.copy(t), (h.y = this.baseHeight), d.copy(h), (d.y += c), o(h, d);
          }
          const u = this.room.getMaxCeilingDatum();
          u &&
            (h.copy(u.position), (h.y = this.baseHeight), d.copy(h), (d.y += u.height), o(h, d, r)),
            (this.occlusionLine = new I(a, t, this.cameraData.pose)),
            (this.perspectiveLine = new I(a, e, this.cameraData.pose)),
            (this.occlusionDatums = new I(r, n, this.cameraData.pose)),
            (this.perspectiveDatums = new I(r, i, this.cameraData.pose));
          const m = [];
          for (const e of r) for (const t of e.points) m.push({ position: t });
          (this.datumCircles = new L(m, { radius: 5 })),
            this.heightLines.add(this.occlusionLine),
            this.heightLines.add(this.perspectiveLine),
            this.heightLines.add(this.occlusionDatums),
            this.heightLines.add(this.perspectiveDatums),
            this.heightLines.add(this.datumCircles);
        }
        setIsInside(e) {
          this.insideModeLines.setUserIsInsideRoom(e);
        }
        onRender(e, t) {
          (this.pitchFactor = e),
            (this.insideNess = t),
            (this.raycastEnabled =
              t < 0.1 &&
              (this.roomBoundViewData.roomDimensionsVisible || (0, P.Eb)(this.pitchFactor))),
            this.insideModeLines.onRender(t);
          const i = (1 - t) * e,
            s = 1 * i,
            n = 0.3 * i;
          this.perspectiveLine &&
            this.occlusionLine &&
            (this.perspectiveLine.globalOpacity(s), this.occlusionLine.globalOpacity(n)),
            this.perspectiveDatums &&
              this.occlusionDatums &&
              this.datumCircles &&
              (this.perspectiveDatums.globalOpacity(s),
              this.occlusionDatums.globalOpacity(n),
              this.datumCircles.setMaterialParams({ opacity: s }));
        }
      }
    },
    60103: (e, t, i) => {
      'use strict';
      i.d(t, { H: () => r });
      var s = i(11250),
        n = i(63926),
        a = i(81396),
        o = i(21998);
      class r extends a.Mesh {
        constructor(e, t, i, s) {
          super(t, i),
            (this.roomBoundsId = e),
            (this.cameraData = s),
            (this.animation = new n.z(0)),
            (this.prevColorState = {
              opacity: 1,
              innerColor: new a.Color(),
              outerColor: new a.Color(),
            }),
            (this.pitchFactor = 1),
            (this.raycastEnabled = !0),
            (this.opacity = 1),
            (this.selectState = {
              active: !1,
              on: () => {
                this.updateMaterial();
              },
              off: () => {
                this.updateMaterial();
              },
            }),
            (this.hoverState = {
              active: !1,
              on: () => {
                this.updateMaterial();
              },
              off: () => this.updateMaterial(),
            }),
            (this.highlightState = {
              active: !1,
              on: () => this.updateMaterial(),
              off: () => this.updateMaterial(),
            }),
            (this.dimState = {
              active: !1,
              on: () => this.updateMaterial(),
              off: () => this.updateMaterial(),
            }),
            (this.name = e),
            (this.renderOrder = o.o.BASE);
        }
        updateMaterial() {
          var e;
          let t = this.colors.baseState;
          this.dimState.active && (t = this.colors.dimState),
            this.hoverState.active && (t = this.colors.hoverState),
            this.highlightState.active &&
              (t =
                null !== (e = this.colors.highlightState) && void 0 !== e
                  ? e
                  : this.colors.selectState),
            this.selectState.active && (t = this.colors.selectState);
          t !== this.targetColorScheme && (this.targetColorScheme = t);
        }
        tickAnimations(e) {
          this.animation.tick(e);
        }
        dispose() {}
        raycast(e, t) {
          if (!this.raycastEnabled) return;
          const i = [];
          super.raycast(e, i), i.length > 0 && t.push(i[0]);
        }
        onRender(e, t) {
          (this.pitchFactor = e), (this.raycastEnabled = (0, s.Eb)(this.pitchFactor));
        }
      }
    },
    83532: (e, t, i) => {
      'use strict';
      i.r(t),
        i.d(t, {
          RoomBoundEdgeView: () => m,
          RoomBoundEndHandleView: () => E,
          RoomBoundHandleView: () => f,
          RoomBoundOpeningHandleView: () => P,
          RoomBoundOpeningView: () => S,
          RoomBoundRenderer: () => ue,
          RoomBoundStartHandleView: () => T,
          RoomBoundView: () => l.H,
          default: () => Te,
        });
      var s = i(50831),
        n = i(66091),
        a = i(5829),
        o = i(26059),
        r = i(86743),
        h = i(81396),
        d = i(21998),
        l = i(60103),
        c = i(70873),
        u = i(59339);
      const p = {
        baseState: { innerColor: s.I.WHITE, outerColor: s.I.WHITE, opacity: 1 },
        hoverState: { innerColor: s.I.WHITE, outerColor: s.I.NEPTUNE, opacity: 1 },
        selectState: { innerColor: s.I.WHITE, outerColor: s.I.NEPTUNE, opacity: 1 },
        dimState: { innerColor: s.I.WHITE, outerColor: s.I.WHITE, opacity: 0.5 },
        highlightState: { innerColor: s.I.WHITE, outerColor: s.I.NEPTUNE, opacity: 1 },
      };
      class m extends l.H {
        constructor(e, t, i, l, m) {
          const g = new Float32Array([
              0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, -1, 0, 1, -1, 0, 0, 1, 0, 2, -1, 0, 2, -1, 0, -1,
              1, 0, -1,
            ]),
            v = new h.BufferGeometry();
          v.setAttribute('position', new h.Float32BufferAttribute(g, 3)),
            v.setIndex([0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5, 3, 2, 6, 3, 7, 4, 0, 9, 1, 0, 5, 8]);
          const f = new h.RawShaderMaterial({
            uniforms: h.UniformsUtils.clone(u.LD.uniforms),
            vertexShader: u.LD.vertexShader,
            fragmentShader: u.LD.fragmentShader,
            transparent: !0,
            depthTest: !1,
            stencilRef: 65535,
            stencilFuncMask: 1 << d.$.OPENINGS,
            stencilFail: h.KeepStencilOp,
            stencilZFail: h.KeepStencilOp,
            stencilZPass: h.KeepStencilOp,
            stencilFunc: h.GreaterStencilFunc,
            stencilWrite: !0,
            extensions: { derivatives: !0 },
          });
          super(e, v, f, t),
            (this.roomBoundViewData = i),
            (this.lineLabel = l),
            (this.isAddState = m),
            (this.line3 = new h.Line3(new h.Vector3(), new h.Vector3())),
            (this.widthCache = 0.1),
            (this.updateMaterial = () => {
              super.updateMaterial(),
                this.targetColorScheme !== p.highlightState ||
                  this.isAddState() ||
                  (this.targetColorScheme = p.baseState);
              const e = this.material.uniforms;
              this.prevColorState.innerColor.copy(e.color.value),
                this.prevColorState.outerColor.copy(e.outlineColor.value),
                (this.prevColorState.opacity = e.opacity.value);
              const t = this.selectState.active || this.highlightState.active,
                i = this.hoverState.active;
              (this.renderOrder = t || i ? d.o.HIGHLIGHTED_EDGE : d.o.EDGE),
                this.animation.modifyAnimation(0, 1, c.rP, r.hl),
                this.lineLabel.setVisible(
                  this.selectState.active || this.highlightState.active || this.hoverState.active,
                );
            }),
            (this.raycast = (() => {
              const e = new h.Vector3(),
                t = new h.Vector2(),
                i = new h.Vector2();
              return (s, n) => {
                const a = this.line3.closestPointToPoint(s.ray.origin, !0, e);
                t.set(a.x, a.z), i.set(s.ray.origin.x, s.ray.origin.z);
                const r = t.distanceTo(i),
                  d = s.ray.origin.distanceTo(this.line3.start),
                  l = (0, o._U)(
                    d,
                    this.cameraData.pose.projection.asThreeMatrix4(),
                    this.cameraData.width,
                  ),
                  u = c.Nh * l;
                r < 0.5 * Math.max(this.widthCache, c.ZT) + u &&
                  n.push({
                    distance: d,
                    object: this,
                    point: a.clone(),
                    face: {
                      a: -1,
                      b: -1,
                      c: -1,
                      materialIndex: -1,
                      normal: new h.Vector3(0, 1, 0),
                    },
                  });
              };
            })()),
            (this.onEdgePositionChanged = (() => {
              const e = new h.Vector3(),
                t = new h.Vector3(),
                i = new h.Vector3(),
                s = new h.Vector3(),
                a = new h.Vector3(),
                o = new h.Vector3(),
                r = new h.Vector3();
              return (h, d, l) => {
                const c = h.getWall(this.roomBoundsId);
                c.from.getVec3(e), c.to.getVec3(t);
                const u = this.geometry.getAttribute('position');
                c.getBiasAdjustmentVec(r),
                  i.set(e.x, e.y + d, e.z),
                  s.set(t.x, t.y + d, t.z),
                  a.addVectors(i, r),
                  o.addVectors(s, r),
                  this.line3.start.copy(a),
                  this.line3.end.copy(o),
                  this.material.uniforms.lineStart.value.copy(a),
                  this.material.uniforms.lineEnd.value.copy(o),
                  (this.material.uniforms.width.value = c.width),
                  this.stencilMat.uniforms.lineStart.value.copy(a),
                  this.stencilMat.uniforms.lineEnd.value.copy(o),
                  (this.stencilMat.uniforms.width.value = c.width),
                  (this.widthCache = c.width),
                  this.lineLabel.updateDimensions(a, o, c.width, l),
                  u.setXYZ(0, i.x, i.y, i.z),
                  u.setXYZ(3, s.x, s.y, s.z);
                const { fromLeft: p, fromRight: m, toLeft: g, toRight: v } = (0, n.b)(c, h);
                u.setXYZ(1, m.primary.x, m.primary.y + d, m.primary.z),
                  u.setXYZ(2, v.primary.x, v.primary.y + d, v.primary.z),
                  u.setXYZ(4, g.primary.x, g.primary.y + d, g.primary.z),
                  u.setXYZ(5, p.primary.x, p.primary.y + d, p.primary.z),
                  u.setXYZ(9, m.bevel.x, m.bevel.y + d, m.bevel.z),
                  u.setXYZ(6, v.bevel.x, v.bevel.y + d, v.bevel.z),
                  u.setXYZ(7, g.bevel.x, g.bevel.y + d, g.bevel.z),
                  u.setXYZ(8, p.bevel.x, p.bevel.y + d, p.bevel.z),
                  (u.needsUpdate = !0),
                  this.geometry.computeBoundingBox(),
                  this.geometry.computeBoundingSphere();
              };
            })()),
            (this.renderOrder = d.o.EDGE),
            this.geometry.computeBoundingBox(),
            this.geometry.computeBoundingSphere(),
            (this.colors = p),
            (this.material.uniforms.selectedWidth.value = 0.03);
          const y = f.clone();
          (y.stencilRef = 65535),
            (y.stencilFuncMask = 1 << d.$.OPENINGS),
            (y.stencilWriteMask = 1 << d.$.EDGE),
            (y.stencilFail = h.KeepStencilOp),
            (y.stencilZFail = h.KeepStencilOp),
            (y.stencilZPass = h.ReplaceStencilOp),
            (y.stencilFunc = h.AlwaysStencilFunc),
            (y.stencilWrite = !0),
            (y.colorWrite = !1),
            (this.stencilMat = y);
          const w = new h.Mesh(this.geometry, this.stencilMat);
          (w.renderOrder = d.o.EDGE_STENCIL), (this.stencilMesh = w);
          const b = s.I.WHITE.clone();
          this.animation.onChanged(() => {
            const e = this.prevColorState,
              t = this.targetColorScheme;
            this.material.uniforms.outlineColor.value.lerpColors(
              e.outerColor,
              t.outerColor,
              this.animation.value,
            );
            this.material.uniforms.color.value.lerpColors(
              e.innerColor,
              t.innerColor,
              this.animation.value,
            );
            const i = (0, a.t)(e.opacity, t.opacity, this.animation.value);
            (this.opacity = i), b.copy(s.I.WHITE).multiplyScalar(this.opacity);
          }),
            (this.onBeforeRender = () => {
              (this.material.depthTest = 1 === this.pitchFactor),
                (this.material.uniforms.opacity.value =
                  (1 - this.pitchFactor) *
                  this.opacity *
                  Number(this.roomBoundViewData.roomWallsVisible)),
                this.lineLabel.update();
            });
        }
        tickAnimations(e) {
          super.tickAnimations(e), this.lineLabel.tickAnimations(e);
        }
        setLabelVisible(e) {
          this.lineLabel.setVisible(e);
        }
        dispose() {
          super.dispose(), this.lineLabel.dispose();
        }
      }
      const g = {
        baseState: { opacity: 1, innerColor: s.I.MIRROR, outerColor: s.I.PORTAL },
        hoverState: { opacity: 1, innerColor: s.I.MIRROR, outerColor: s.I.PORTAL },
        selectState: { opacity: 1, innerColor: s.I.MP_BRAND, outerColor: s.I.WHITE },
        dimState: { opacity: 1, innerColor: s.I.MIRROR, outerColor: s.I.PORTAL },
      };
      class v extends h.RawShaderMaterial {
        constructor() {
          super({
            fragmentShader: u.pr.fragmentShader,
            vertexShader: u.pr.vertexShader,
            uniforms: h.UniformsUtils.clone(u.pr.uniforms),
            name: 'HandleMaterial',
            transparent: !0,
            depthTest: !1,
            extensions: { derivatives: !0 },
          });
        }
      }
      class f extends l.H {
        constructor(e, t, i) {
          const s = new Float32Array([-1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1]),
            n = new h.BufferGeometry();
          n.setAttribute('position', new h.Float32BufferAttribute(s, 3)),
            n.setIndex([0, 2, 1, 0, 3, 2]),
            super(e, n, new v(), t),
            (this.roomBoundViewData = i),
            (this.targetRadius = 0.3),
            (this.prevRadius = 0.3),
            (this.renderOrder = d.o.NODE),
            (this.colors = g),
            this.animation.onChanged(() => this.onAnimationChange()),
            (this.onBeforeRender = () => {
              this.material.uniforms.opacity.value =
                this.opacity *
                (1 - this.pitchFactor) *
                Number(this.roomBoundViewData.roomWallsVisible);
            });
        }
        onAnimationChange() {
          const e = this.prevColorState,
            t = this.targetColorScheme;
          this.material.uniforms.outlineColor.value.lerpColors(
            e.outerColor,
            t.outerColor,
            this.animation.value,
          ),
            this.material.uniforms.baseColor.value.lerpColors(
              e.innerColor,
              t.innerColor,
              this.animation.value,
            ),
            (this.opacity = (0, a.t)(e.opacity, t.opacity, this.animation.value));
          const i = (0, a.t)(this.prevRadius, this.targetRadius, this.animation.value);
          this.setRadius(i);
        }
        onRender(e, t) {
          super.onRender(e, t), (this.visible = this.pitchFactor < 1);
        }
        raycast(e, t) {
          const i = [];
          if ((super.raycast(e, i), i.length > 0)) {
            const s = i[0].point,
              n = e.ray.origin.distanceTo(this.position),
              a = (0, o._U)(
                n,
                this.cameraData.pose.projection.asThreeMatrix4(),
                this.cameraData.width,
              ),
              r = c.Nh * a;
            s.distanceTo(this.position) < c.pp + r && t.push(i[0]);
          }
        }
        updateMaterial() {
          (this.prevRadius = this.material.uniforms.radius.value),
            (this.targetRadius =
              c.pp + (this.hoverState.active ? c.XG : 0) + (this.selectState.active ? c.XG : 0)),
            super.updateMaterial(),
            this.prevColorState.innerColor.copy(this.material.uniforms.baseColor.value),
            this.prevColorState.outerColor.copy(this.material.uniforms.outlineColor.value),
            (this.prevColorState.opacity = this.material.opacity),
            this.animation.modifyAnimation(0, 1, c.rP, r.hl);
        }
        setRadius(e) {
          this.material.uniforms.radius.value = e;
        }
        updatePosition(e) {
          this.position.copy(e);
        }
      }
      var y = i(17516);
      class w extends h.RawShaderMaterial {
        constructor() {
          super({
            fragmentShader: u.z6.fragmentShader,
            vertexShader: u.z6.vertexShader,
            uniforms: h.UniformsUtils.clone(u.z6.uniforms),
            name: 'OpeningMaterial',
            depthTest: !1,
            transparent: !0,
            stencilFunc: h.AlwaysStencilFunc,
            stencilWrite: !1,
          });
        }
      }
      const b = new h.BoxGeometry(1, 1, 1);
      class D extends l.H {
        constructor(e, t, i, n) {
          super(e, b.clone(), new w(), i),
            (this.floorId = t),
            (this.roomBoundViewData = n),
            (this.onEdgePositionChanged = (() => {
              const e = new h.Vector3();
              return (t, i, s, n) => {
                e.subVectors(i, t),
                  this.scale.set(e.length(), 0.05, s),
                  this.stencilPrepass && this.stencilPrepass.scale.set(e.length(), 0.05, s);
                const a = Math.atan2(i.x - t.x, i.z - t.z) + Math.PI / 2;
                (this.rotation.y = a), this.stencilPrepass && (this.stencilPrepass.rotation.y = a);
                const o = e.addVectors(i, t).multiplyScalar(0.5);
                this.position.copy(o),
                  this.stencilPrepass && this.stencilPrepass.position.copy(o),
                  this.startHandle.position.copy(t),
                  this.endHandle.position.copy(i);
                const r = n === y.u.DOOR ? 1 : 0;
                (this.material.uniforms.isDoor.value = r),
                  this.stencilPrepass && (this.stencilPrepass.material.uniforms.isDoor.value = r);
              };
            })()),
            (this.renderOrder = d.o.OPENING_LINES),
            (this.startHandle = new T(e, i, n, this)),
            (this.endHandle = new E(e, i, n, this)),
            this.animation.onChanged(() => {
              this.material.uniforms.baseColor.value.lerpColors(
                s.I.WHITE,
                s.I.NEPTUNE,
                this.animation.value,
              );
            });
        }
        onRender(e, t) {
          super.onRender(e, t),
            (this.visible = this.pitchFactor < 1 && this.roomBoundViewData.roomWallsVisible),
            this.startHandle.onRender(e, t),
            this.endHandle.onRender(e, t),
            this.stencilPrepass && this.stencilPrepass.onRender(e, t);
        }
        updateMaterial() {
          const e = this.selectState.active || this.hoverState.active || this.highlightState.active;
          this.animation.modifyAnimation(this.animation.value, e ? 1 : 0, c.rP, r.hl);
        }
        tickAnimations(e) {
          super.tickAnimations(e),
            this.startHandle.tickAnimations(e),
            this.endHandle.tickAnimations(e);
        }
      }
      class S extends D {
        constructor(e, t, i, s) {
          super(e, t, i, s), (this.floorId = t), (this.stencilPrepass = new I(e, t, i, s));
        }
      }
      class I extends D {
        constructor(e, t, i, s) {
          super(e, t, i, s),
            (this.floorId = t),
            (this.renderOrder = d.o.OPENING_STENCIL),
            (this.material.colorWrite = !1),
            (this.material.stencilRef = 65535),
            (this.material.stencilFuncMask = 1 << d.$.OPENINGS),
            (this.material.stencilWriteMask = 1 << d.$.OPENINGS),
            (this.material.stencilFail = h.ReplaceStencilOp),
            (this.material.stencilZFail = h.ReplaceStencilOp),
            (this.material.stencilZPass = h.ReplaceStencilOp),
            (this.material.stencilFunc = h.AlwaysStencilFunc),
            (this.material.stencilWrite = !0);
        }
        raycast(e, t) {}
      }
      class P extends f {
        constructor(e, t, i, s) {
          super(e, t, i), (this.parentOpeningView = s);
        }
      }
      class T extends P {}
      class E extends P {}
      var M = i(66379),
        C = i(33809),
        x = i(82076),
        R = i(65919);
      class L extends f {}
      var A = i(9975),
        F = i(82582),
        k = i.n(F),
        O = i(71034),
        V = i(72803),
        B = i(11250),
        N = i(83191),
        G = i(63926);
      class H {
        constructor() {
          (this.corner = [new h.Vector2(), new h.Vector2(), new h.Vector2(), new h.Vector2()]),
            (this.axis = [new h.Vector2(), new h.Vector2()]),
            (this.origin = [0, 0]),
            (this.aabb = new h.Box2());
        }
        set(e) {
          if (4 !== e.length) throw new Error('Obb needs four points!');
          for (let t = 0; t < e.length; t++) this.corner[t].copy(e[t]);
          this.aabb.setFromPoints(this.corner),
            this.axis[0].subVectors(this.corner[1], this.corner[0]),
            this.axis[1].subVectors(this.corner[3], this.corner[0]);
          for (let e = 0; e < 2; e++)
            this.axis[e].divideScalar(this.axis[e].lengthSq()),
              (this.origin[e] = this.corner[0].dot(this.axis[e]));
        }
        overlaps(e) {
          return this.overlaps1Way(e) && e.overlaps1Way(this);
        }
        overlaps1Way(e) {
          for (let t = 0; t < 2; t++) {
            let i = e.corner[0].dot(this.axis[t]),
              s = i,
              n = i;
            for (let a = 1; a < 4; a++)
              (i = e.corner[a].dot(this.axis[t])), (s = Math.min(s, i)), (n = Math.max(n, i));
            if (s > 1 + this.origin[t] || n < this.origin[t]) return !1;
          }
          return !0;
        }
      }
      var _ = i(49668),
        U = i(22594),
        W = i(91524),
        z = i(3835);
      const j = new h.Vector2(0, 0);
      class $ {
        constructor(e, t, i, s, n, a) {
          (this.cameraData = i),
            (this.getCurrFloorId = s),
            (this.isMultiFloor = n),
            (this.debugContainer = a),
            (this.labels = new Set()),
            (this.needsImmediateCollisionDetectionCtr = 5),
            (this.lastCollisionTimestamp = 0),
            (this.tree = new (k())()),
            (this.roomLabelMaker = new O.uc({
              assetBasePath: e,
              lang: t,
              color: 'white',
              outline: !0,
              background: !1,
              backgroundColor: '#000000',
              backgroundColliderType: J,
              disableDepth: !0,
            })),
            (this.wallLabelMaker = new O.uc({
              assetBasePath: e,
              color: '#000000',
              lang: t,
              background: !0,
              outline: !1,
              backgroundColor: 'white',
              backgroundColliderType: Q,
              disableDepth: !0,
              backgroundBorderHeight: 0.8,
              backgroundBorderWidth: 0.8,
            })),
            (this.insideLabelMaker = new O.uc({
              assetBasePath: e,
              color: '#000000',
              lang: t,
              background: !0,
              outline: !1,
              backgroundColor: 'white',
              backgroundColliderType: Q,
              disableDepth: !0,
              backgroundBorderHeight: 0.8,
              backgroundBorderWidth: 0.8,
            }));
        }
        createRoomLabel(e, t) {
          const i = new Z(q.ROOM, e, this.roomLabelMaker.createLabel(), this.cameraData);
          return (i.label.collider.userData = { roomId: t }), this.labels.add(i), i;
        }
        createWallLabel(e) {
          const t = new Y(q.WALL, e, this.wallLabelMaker.createLabel(), this.cameraData, 21);
          return this.labels.add(t), this.needsImmediateCollsisionDetection(), t;
        }
        createPerimeterLabel(e, t = !1) {
          const i = new Y(q.PERIMETER, e, this.wallLabelMaker.createLabel(), this.cameraData, 21);
          return (
            this.labels.add(i), t || this.update(), this.needsImmediateCollsisionDetection(), i
          );
        }
        createHeightLabel(e, t, i = !1) {
          const s = t ? q.HEIGHT_HIGH_PRIO : q.HEIGHT_LOW_PRIO,
            n = new Y(s, e, this.wallLabelMaker.createLabel(), this.cameraData, 21);
          return (
            this.labels.add(n), i || this.update(), this.needsImmediateCollsisionDetection(), n
          );
        }
        createInsideLabel(e) {
          const t = new K(q.PERIMETER, e, this.insideLabelMaker.createLabel(), this.cameraData, 21);
          return this.labels.add(t), this.needsImmediateCollsisionDetection(), t;
        }
        createDatumLabel(e) {
          const t = new X(q.PERIMETER, e, this.insideLabelMaker.createLabel(), this.cameraData, 21);
          return this.labels.add(t), this.needsImmediateCollsisionDetection(), t;
        }
        deleteLabel(e) {
          e.label.parent && e.removeFrom(e.label.parent),
            this.labels.delete(e),
            e.dispose(),
            this.needsImmediateCollsisionDetection();
        }
        tickAnimations(e) {
          for (const t of this.labels) t.tickAnimations(e);
        }
        needsImmediateCollsisionDetection() {
          this.needsImmediateCollisionDetectionCtr = 5;
        }
        update() {
          this.debugContainer && this.debugContainer.clear();
          for (const e of this.labels) e.update();
          (this.needsImmediateCollisionDetectionCtr > 0 ||
            performance.now() - this.lastCollisionTimestamp > 2e3) &&
            (this.updateLabelCollisions(),
            (this.needsImmediateCollisionDetectionCtr = Math.max(
              this.needsImmediateCollisionDetectionCtr - 1,
              0,
            )),
            (this.lastCollisionTimestamp = performance.now()));
        }
        updateLabelCollisions() {
          const e = new h.Vector2(),
            t = new h.Vector3(),
            i = new h.Vector3(),
            s = [
              { x: -1, y: -1, screenPos: new h.Vector2() },
              { x: 1, y: -1, screenPos: new h.Vector2() },
              { x: 1, y: 1, screenPos: new h.Vector2() },
              { x: -1, y: 1, screenPos: new h.Vector2() },
            ],
            n = [],
            a = (0, o.Pp)(this.cameraData.pose.projection),
            r = (e) => {
              const t = e.positionPriority();
              let i = 0;
              e.getDisplayingTooltip() && (i += 1e3);
              return (
                e.getDimmed()
                  ? (i += -1e4)
                  : e.type === q.ROOM
                    ? (i += 200)
                    : e.type === q.HEIGHT_HIGH_PRIO
                      ? (i += 100)
                      : e.type === q.HEIGHT_LOW_PRIO && (i += 50),
                t + i
              );
            },
            d = this.getCurrFloorId(),
            l = Array.from(this.labels)
              .filter((e) => {
                const t = !this.isMultiFloor || d === e.floorId;
                return (
                  e.labelVisible &&
                  e.fitsWall &&
                  t &&
                  e.collisionDetection &&
                  this.cameraData.pose.worldspaceFrustum.value.containsPoint(e.label.position)
                );
              })
              .map((e) => {
                const t = e.label;
                return {
                  label: e,
                  cameraDistance: a
                    ? Math.abs(t.position.y - this.cameraData.pose.position.y)
                    : this.cameraData.pose.position.distanceTo(t.position),
                  priority: r(e),
                };
              })
              .sort((e, t) => t.priority - e.priority)
              .map((a) => {
                const { label: r, cameraDistance: d } = a,
                  l = r.label,
                  u =
                    (0, o._U)(
                      d,
                      this.cameraData.pose.projection.asThreeMatrix4(),
                      this.cameraData.width,
                    ) * c.bk;
                (0, B.q9)(this.cameraData, l.position, e, t);
                const { width: p, height: m } = l.getUnscaledSize();
                this.debugContainer && (n.length = 0), l.updateMatrixWorld();
                for (const e of s)
                  i.set(p * e.x * 0.5 + u * e.x, m * e.y * 0.5 + (u + e.y), 0),
                    i.applyMatrix4(l.matrixWorld),
                    this.debugContainer && n.push(i.clone()),
                    (0, B.q9)(this.cameraData, i, e.screenPos);
                if (this.debugContainer) {
                  const e = new h.Mesh(
                    new h.ShapeGeometry(new h.Shape(n.map((e) => new h.Vector2(e.x, e.z)))).rotateX(
                      Math.PI / 2,
                    ),
                    new h.MeshBasicMaterial({ color: 'red', depthTest: !1, side: h.DoubleSide }),
                  );
                  this.debugContainer.add(e);
                }
                const g = new H();
                g.set(s.map((e) => e.screenPos));
                const v = g.aabb;
                return {
                  label: r,
                  oob: g,
                  minX: v.min.x,
                  minY: v.min.y,
                  maxX: v.max.x,
                  maxY: v.max.y,
                  distance: d,
                };
              }),
            u = new Set();
          this.tree.clear();
          for (const e of l) {
            const t = this.tree.search(e).find((t) => t.oob.overlaps(e.oob)),
              i = e.label.labelGroupId,
              s = i && u.has(i),
              n = !(t || (s && i));
            e.label.setCollides(!n), n && (this.tree.insert(e), i && u.add(i));
          }
        }
      }
      var q;
      !(function (e) {
        (e[(e.ROOM = 0)] = 'ROOM'),
          (e[(e.WALL = 1)] = 'WALL'),
          (e[(e.HEIGHT_HIGH_PRIO = 2)] = 'HEIGHT_HIGH_PRIO'),
          (e[(e.HEIGHT_LOW_PRIO = 3)] = 'HEIGHT_LOW_PRIO'),
          (e[(e.PERIMETER = 4)] = 'PERIMETER');
      })(q || (q = {}));
      class Z {
        constructor(e, t, i, s) {
          (this.type = e),
            (this.floorId = t),
            (this.label = i),
            (this.cameraData = s),
            (this.length = 0),
            (this.labelGroupId = null),
            (this.collisionDetection = !0),
            (this.labelOpacityAnimation = new G.z(1)),
            (this.labelVisible = !1),
            (this.collides = !1),
            (this.dimmed = !1),
            (this.displayingTooltip = !1),
            (this.fitsWall = !0),
            this.label.setRenderOrder(V.z.labels),
            this.updateOpacityTarget(0);
        }
        addTo(e) {
          return e.add(this.label), this;
        }
        removeFrom(e) {
          e.remove(this.label);
        }
        dispose() {
          this.label.dispose();
        }
        tickAnimations(e) {
          this.labelOpacityAnimation.tick(e);
        }
        setVisible(e) {
          e !== this.labelVisible && ((this.labelVisible = e), this.updateOpacityTarget());
        }
        setCollides(e) {
          e !== this.collides && ((this.collides = e), this.updateOpacityTarget(e ? 0 : c.rP));
        }
        setFitsWall(e) {
          e !== this.fitsWall && ((this.fitsWall = e), this.updateOpacityTarget());
        }
        setDimmed(e) {
          e !== this.dimmed && ((this.dimmed = e), this.updateOpacityTarget());
        }
        getDimmed() {
          return this.dimmed;
        }
        setDisplayingTooltip(e) {
          (this.displayingTooltip = e), this.updateOpacityTarget();
        }
        getDisplayingTooltip() {
          return this.displayingTooltip;
        }
        update() {
          this.updateOpacity();
        }
        getSize() {
          const e = this.label.text.split('\n'),
            t = e.reduce((e, t) => Math.max(e, t.length), 0),
            i = (0, N.hJ)(t, 0, 0);
          return { width: i.width, height: i.height * e.length };
        }
        updateOpacity() {
          this.label.opacity = this.labelOpacityAnimation.value;
        }
        updateOpacityTarget(e = c.rP) {
          const t = this.dimmed && !this.displayingTooltip ? 0.5 : 1,
            i = this.labelVisible && !this.collides && this.fitsWall ? t : 0;
          this.labelOpacityAnimation.modifyAnimation(
            e > 0 ? this.labelOpacityAnimation.value : i,
            i,
            e,
          );
        }
        positionPriority() {
          const e = this.cameraData.pose.isProjectionOrtho.value,
            t = this.label;
          return (
            1 -
            ((e
              ? Math.abs(t.position.y - this.cameraData.pose.position.y)
              : this.cameraData.pose.position.distanceTo(t.position)) -
              W.oR.near) /
              (W.oR.far - W.oR.near)
          );
        }
      }
      class Y extends Z {
        constructor(e, t, i, s, n) {
          super(e, t, i, s),
            (this.cameraData = s),
            (this.labelHeightPx = n),
            (this.start = new h.Vector3()),
            (this.end = new h.Vector3()),
            (this.width = 0.1),
            (this.collisionDetection = !0),
            (this.tempMidpoint = new h.Vector3()),
            (this.getLinePositions = (() => {
              const e = new h.Vector3(),
                t = new h.Vector3(),
                i = new h.Vector3(),
                s = new h.Vector3(),
                n = new h.Vector3(),
                a = new h.Vector3(),
                o = new h.Vector3(),
                r = new h.Vector2(),
                d = new h.Vector2(),
                l = new h.Vector2(),
                c = new h.Vector2(),
                u = new h.Vector2(),
                p = new h.Vector2(),
                m = new h.Vector2();
              return (h = this.start, g = this.end) => {
                e.copy(h),
                  t.copy(g),
                  a
                    .subVectors(t, e)
                    .normalize()
                    .applyAxisAngle(z.fU.UP, Math.PI / 2);
                const v = (0, N.Ko)(e, t, this.cameraData),
                  f = (0, N.hJ)(this.label.text.length),
                  y = v.pixelDistance > f.width && this.labelVisible;
                this.setFitsWall(y);
                const w = this.cameraData.isOrtho();
                i.addVectors(e, t).multiplyScalar(0.5),
                  (0, B.q9)(this.cameraData, h, d, o),
                  (0, B.q9)(this.cameraData, g, l, o),
                  (0, B.q9)(this.cameraData, i, c, o);
                const b = o.z;
                u.copy(c), s.addVectors(i, a), (0, B.q9)(this.cameraData, s, p, o);
                const D = m.subVectors(p, c),
                  S = l
                    .sub(d)
                    .normalize()
                    .rotateAround(j, Math.PI / 2);
                w ? S.copy(D).normalize() : S.y > 0 && S.multiplyScalar(-1);
                const I = this.labelHeightPx;
                let P = c.addScaledVector(S, I),
                  T = (0, B.z5)(P.x, P.y, this.cameraData.width, this.cameraData.height, r),
                  E = o.set(T.x, T.y, b),
                  M = (0, B.Kh)(this.cameraData.pose, E, n);
                const C = M.distanceTo(i) / I,
                  x = 2 + (w ? this.width / 2 / C : 0) + this.labelHeightPx / 2;
                return (
                  (P = u.addScaledVector(S, x)),
                  (T = (0, B.z5)(P.x, P.y, this.cameraData.width, this.cameraData.height, r)),
                  (E = o.set(T.x, T.y, b)),
                  (M = (0, B.Kh)(this.cameraData.pose, E, n)),
                  {
                    start: e,
                    end: t,
                    center: i,
                    labelPosition: M,
                    lineRotation: v.rotation,
                    heightScale: C,
                  }
                );
              };
            })());
        }
        distanceToCamera() {
          return this.tempMidpoint
            .addVectors(this.start, this.end)
            .multiplyScalar(0.5)
            .distanceTo(this.cameraData.pose.position);
        }
        updateDimensions(e, t, i, s) {
          this.start.copy(e), this.end.copy(t), (this.width = i);
          const n = this.start.distanceTo(this.end);
          this.length = n;
          const a = (0, _.up)(n, s);
          this.label.text = a;
        }
        update() {
          super.update(), this.updateBillboard();
        }
        updateBillboard() {
          if (!this.labelVisible) return;
          const { labelPosition: e, lineRotation: t, heightScale: i } = this.getLinePositions(),
            { label: s } = this;
          s.setPosition(e), s.setOrientation(this.cameraData.pose.rotation, t);
          const n = i,
            a = this.label.unscaledHeight,
            o = (this.labelHeightPx * n) / a;
          s.scaleFactor = o;
        }
      }
      class X extends Y {
        constructor() {
          super(...arguments),
            (this.labelHeightFraction = 0.5),
            (this.center = new h.Vector3()),
            (this.dir = new h.Vector3());
        }
        updateDimensions(e, t, i, s) {
          this.start.copy(e),
            this.end.copy(t),
            this.dir.subVectors(this.end, this.start),
            this.center.copy(this.start).addScaledVector(this.dir, this.labelHeightFraction),
            (this.width = i);
          const n = this.start.distanceTo(this.end);
          this.length = n;
          const a = (0, _.up)(n, s);
          (this.label.text = `Max: ${a}`), this.label.setPosition(this.center);
        }
        update() {
          super.updateOpacity();
          const { position: e, rotation: t, projection: i } = this.cameraData.pose,
            { height: s } = this.cameraData,
            n = this.cameraData.isOrtho() ? this.cameraData.zoom() : 1,
            a = this.cameraData.aspect();
          this.label.quaternion.copy(t);
          this.label.scaleBillboard(e, t, i, n, s, a, 0.1);
        }
      }
      class K extends Y {
        constructor() {
          super(...arguments), (this.collisionDetection = !0), (this._t1 = new h.Vector3());
        }
        isVertical(e, t) {
          const i = Math.abs(e.y - t.y),
            s = Math.abs(e.x - t.x),
            n = Math.abs(e.z - t.z);
          return i > 0 && s < 1e-6 && n < 1e-6;
        }
        positionPriority() {
          const e = this.label;
          this._t1.copy(e.position);
          const t = (0, B.D_)(
            this._t1,
            this.cameraData.pose.position,
            this.cameraData.pose.rotation,
            this.cameraData.pose.projection.asThreeMatrix4(),
          );
          return 1 - Math.sqrt(t.x * t.x + t.y * t.y);
        }
      }
      class Q extends h.Mesh {
        raycast(e, t) {}
      }
      class J extends h.Mesh {
        constructor() {
          super(...arguments), (this.intersectionPriority = U.e.RoomLabels);
        }
        raycast(e, t) {
          this.visible && super.raycast(e, t);
        }
      }
      var ee = i(21676),
        te = i(86210),
        ie = i(79242),
        se = i(59228),
        ne = i(68720),
        ae = i(95840),
        oe = i(31971),
        re = i(59452),
        he = i(61173),
        de = i(7321),
        le = i(27163),
        ce = i(30419);
      class ue {
        constructor(e, t, i, s, n, a, o, r, d, c, u, p, m, g, v, f, y) {
          (this.readonly = e),
            (this.data = t),
            (this.scene = i),
            (this.input = s),
            (this.viewListener = n),
            (this.isAdding = a),
            (this.floorsViewData = o),
            (this.cameraData = r),
            (this.locale = d),
            (this.settingsData = u),
            (this.roomBoundsViewData = p),
            (this.viewmodeData = m),
            (this.sweepData = g),
            (this.toolsData = v),
            (this.canHoverRoomLabels = f),
            (this.onRoomLabelHover = y),
            (this.currentFloorId = ''),
            (this.rootObjects = {}),
            (this.viewMap = new Map()),
            (this.nodeMap = new Map()),
            (this.roomMap = new Map()),
            (this.openingMap = new Map()),
            (this.visibleWallLabels = new Set()),
            (this.hideCurrentFloorViews = () => {
              if (this.currentFloorId) {
                const e = this.rootObjects[this.currentFloorId];
                for (const t of e.children) t instanceof l.H && this.unregisterViewToInput(t);
                this.scene.remove(e);
              }
            }),
            (this.showCurrentFloorViews = () => {
              var e;
              const t =
                (null === (e = this.floorsViewData.singleFloor) || void 0 === e ? void 0 : e.id) ||
                this.floorsViewData.currentFloorId;
              if (t) {
                const e = this.rootObjects[t];
                this.scene.add(e);
                for (const t of e.children) t instanceof l.H && this.registerViewToInput(t);
                this.currentFloorId = t;
              }
            }),
            (this.updateOpeningView = (() => {
              const e = new h.Vector3(),
                t = new h.Vector3(),
                i = new h.Vector3(),
                s = new h.Vector3(),
                n = new h.Vector3(),
                a = new h.Vector3();
              return (o) => {
                const r = this.data.getWall(o.wallId),
                  h = this.baseHeightForFloor(r.floorId);
                a.set(0, h, 0),
                  r.getBiasAdjustmentVec(n),
                  r.from.getVec3(i).add(n).add(a),
                  r.to.getVec3(s).add(n).add(a),
                  t.subVectors(s, i).normalize(),
                  e.copy(i),
                  e.lerp(s, o.relativePos),
                  i.copy(e).addScaledVector(t, -0.5 * o.width),
                  s.copy(e).addScaledVector(t, 0.5 * o.width);
                const d = this.openingMap.get(o.id);
                if (!d) throw new Error('Unable to find view for opening while updating');
                d.onEdgePositionChanged(i, s, r.width, o.type);
              };
            })()),
            (this.onMoveEnd = () => {
              for (const e of this.data.rooms.values()) this.updateRoomView(e, !0);
            }),
            this.floorsViewData.floors.iterate((e) => {
              this.rootObjects[e.id] = new h.Object3D();
            }),
            (this.bindings = [
              this.data.onWallsChanged({
                onRemoved: (e) => this.removeViewForWall(e),
                onUpdated: (e) => this.updateWallView(e),
                onChildUpdated: (e) => this.updateWallView(e),
                onAdded: (e) => this.makeWallView(e),
              }),
              this.data.onNodesChanged({
                onRemoved: (e) => this.removeViewForNode(e),
                onUpdated: (e) => this.updateNodeView(e),
                onChildUpdated: (e) => this.updateNodeView(e),
                onAdded: (e) => this.makeNodeView(e),
              }),
              this.data.onRoomsChanged({
                onRemoved: (e) => this.removeViewForRoom(e),
                onUpdated: (e) => this.updateRoomView(e, !1),
                onChildUpdated: (e) => this.updateRoomView(e, !1),
                onAdded: (e) => this.makeRoomView(e),
              }),
              this.data.onOpeningsChanged({
                onRemoved: (e) => this.removeViewForOpening(e),
                onUpdated: (e) => this.updateOpeningView(e),
                onChildUpdated: (e) => this.updateOpeningView(e),
                onAdded: (e) => this.makeOpeningView(e),
              }),
              this.data.afterFinalize(this.onMoveEnd),
              c.subscribe(x.S, this.hideCurrentFloorViews),
              c.subscribe(C.P, this.showCurrentFloorViews),
              this.settingsData.onPropertyChanged(M.F.UnitType, (e) => {
                for (const e of this.data.rooms.values()) this.updateRoomView(e, !0);
                for (const e of this.data.walls.values()) this.updateWallView(e);
              }),
              this.roomBoundsViewData.onChanged(() => {
                for (const e of this.data.rooms.values()) this.updateRoomView(e, !0);
              }),
              this.sweepData.onPropertyChanged('currentSweep', () => {
                for (const e of this.data.rooms.values()) this.updateRoomViewSweep(e);
              }),
              this.viewmodeData.onChanged(() => {
                for (const e of this.data.rooms.values()) this.updateRoomViewSweep(e);
              }),
              this.toolsData.onPropertyChanged('activeToolName', () => {
                for (const e of this.data.rooms.values()) this.updateRoomView(e, !0);
              }),
            ]),
            (0, he.Jm)() ||
              this.bindings.push(
                this.input.registerMeshHandler(te.z, ee.s.isInstanceOf(J), (e, t) =>
                  this.roomLabelHover(t, !0),
                ),
                this.input.registerMeshHandler(te.A, ee.s.isInstanceOf(J), (e, t) =>
                  this.roomLabelHover(t, !1),
                ),
              ),
            this.settingsData.tryGetProperty(re.eC, !1) &&
              this.bindings.push(
                this.input.registerMeshHandler(ie.Rd, ee.s.isInstanceOf(J), (e, t) =>
                  this.roomLabelClick(t),
                ),
              ),
            (this.labelManager = new $(
              u.tryGetProperty('assetBasePath', ''),
              d.languageCode,
              r,
              () => o.currentFloorId,
              this.floorsViewData.isMultifloor(),
            )),
            this.bindings.push(
              this.input.registerUnfilteredHandler(se.er, () =>
                this.labelManager.needsImmediateCollsisionDetection(),
              ),
              this.input.registerUnfilteredHandler(ie.Rd, () =>
                this.labelManager.needsImmediateCollsisionDetection(),
              ),
              this.input.registerUnfilteredHandler(ne.a, () =>
                this.labelManager.needsImmediateCollsisionDetection(),
              ),
              this.input.registerUnfilteredHandler(ae.E0, () =>
                this.labelManager.needsImmediateCollsisionDetection(),
              ),
              this.input.registerUnfilteredHandler(ae._R, () =>
                this.labelManager.needsImmediateCollsisionDetection(),
              ),
              this.input.registerUnfilteredHandler(oe.e, () =>
                this.labelManager.needsImmediateCollsisionDetection(),
              ),
            ),
            this.bindings.forEach((e) => e.cancel());
        }
        init() {}
        render(e) {
          this.labelManager.tickAnimations(e);
          const t = this.cameraData.pose.pitchFactor(),
            i = this.viewmodeData.insideModeTransitionProgress();
          for (const s of [this.viewMap, this.nodeMap, this.roomMap, this.openingMap])
            for (const n of s.values()) n.onRender(t, i), n.tickAnimations(e);
        }
        dispose() {}
        beforeRender() {
          this.labelManager.update(), this.updateRoomViews();
        }
        activate(e) {
          if (!this.readonly) for (const [e, t] of this.data.nodes) this.makeNodeView(t);
          for (const [e, t] of this.data.walls) this.makeWallView(t);
          for (const [e, t] of this.data.rooms) this.makeRoomView(t);
          for (const [e, t] of this.data.wallOpenings) this.makeOpeningView(t);
          this.bindings.forEach((e) => e.renew()), this.showCurrentFloorViews();
        }
        deactivate() {
          this.bindings.forEach((e) => e.cancel());
          for (const e in this.rootObjects) {
            const t = this.rootObjects[e];
            this.scene.remove(t);
            for (const e of t.children.slice())
              e instanceof l.H && (e.dispose(), this.unregisterViewToInput(e)), t.remove(e);
          }
        }
        updateRoomViews() {
          for (const e of this.roomMap.values()) e.beforeRender();
        }
        registerViewToInput(...e) {
          var t;
          for (const i of e)
            (null === (t = i.parent) || void 0 === t ? void 0 : t.parent) &&
              this.input.registerMesh(i, !1);
        }
        unregisterViewToInput(...e) {
          for (const t of e) this.input.unregisterMesh(t);
        }
        makeNodeView(e) {
          const t = new L(e.id, this.cameraData, this.roomBoundsViewData),
            i = this.baseHeightForFloor(e.floorId);
          t.updatePosition(new h.Vector3(e.x, i, e.z)),
            this.nodeMap.set(e.id, t),
            this.rootObjects[e.floorId].add(t),
            this.registerViewToInput(t),
            this.viewListener.addView(t, e.id);
        }
        updateNodeView(e) {
          const t = this.nodeMap.get(e.id);
          if (t) {
            const i = this.baseHeightForFloor(e.floorId);
            t.updatePosition(new h.Vector3(e.x, i, e.z));
          }
        }
        removeViewForNode(e) {
          const t = this.nodeMap.get(e.id);
          t &&
            (this.rootObjects[e.floorId].remove(t),
            this.nodeMap.delete(e.id),
            t.dispose(),
            this.unregisterViewToInput(t),
            this.viewListener.removeView(e.id));
        }
        makeWallView(e) {
          const t = this.labelManager.createWallLabel(e.floorId);
          t.updateDimensions(e.from.getVec3(), e.to.getVec3(), e.width, this.getUnits());
          const i = new m(e.id, this.cameraData, this.roomBoundsViewData, t, this.isAdding);
          this.viewMap.set(e.id, i),
            this.rootObjects[e.floorId].add(i, i.stencilMesh),
            t.addTo(this.rootObjects[e.floorId]),
            this.updateWallView(e),
            t.update(),
            this.registerViewToInput(i),
            this.viewListener.addView(i, e.id);
        }
        updateWallView(e) {
          const t = this.viewMap.get(e.id);
          if (t) {
            const i = this.baseHeightForFloor(e.floorId);
            t.onEdgePositionChanged(this.data, i, this.getUnits());
          }
        }
        removeViewForWall(e) {
          const t = this.viewMap.get(e.id);
          t &&
            (this.rootObjects[e.floorId].remove(t, t.stencilMesh),
            this.labelManager.deleteLabel(t.lineLabel),
            this.viewMap.delete(e.id),
            this.visibleWallLabels.delete(t),
            t.dispose(),
            this.unregisterViewToInput(t),
            this.viewListener.removeView(e.id));
        }
        makeRoomView(e) {
          const t = this.rootObjects[e.floorId];
          this.roomMap.has(e.id) && this.removeViewForRoom(e);
          const i = this.baseHeightForFloor(e.floorId),
            s = new A.c(
              e,
              i,
              this.cameraData,
              this.roomBoundsViewData,
              this.labelManager,
              this.getUnits(),
            );
          t.add(s),
            this.roomMap.set(e.id, s),
            this.registerViewToInput(s),
            this.updateRoomView(e, !0),
            this.viewListener.addView(s, e.id);
        }
        updateRoomView(e, t) {
          const i = this.roomMap.get(e.id);
          if (!i) throw new Error('Unable to find view for room while updating.');
          const s = this.medianSweepHeightForRoom(e) || this.baseHeightForFloor(e.floorId);
          i.updateGeo(e, s, this.getUnits()), i.beforeRender();
          const n = this.data.getPotentialRoomCanvasLabels(
            e.id,
            this.locale.t(de.Z.SHOWCASE.ROOMS.DEFAULT_NAME),
            this.getUnits(),
            this.roomBoundsViewData.roomNamesVisible,
            this.roomBoundsViewData.roomDimensionsVisible,
          );
          i.updateText(n, t), this.updateRoomViewSweep(e);
        }
        updateRoomViewSweep(e) {
          const t = this.roomMap.get(e.id);
          if (!t) throw new Error('Unable to find view for room while updating.');
          const i = this.sweepData.currentAlignedSweepObject,
            s =
              !!i &&
              i.floorId === e.floorId &&
              e.containsPoint(i.floorPosition.x, i.floorPosition.z),
            n =
              this.settingsData.tryGetProperty(ce.En, !1) &&
              s &&
              this.toolsData.activeToolName === le.w1.MEASUREMENTS &&
              this.viewmodeData.insideModeTransitionProgress() > 0;
          t.setIsInside(n);
        }
        removeViewForRoom(e) {
          const t = this.roomMap.get(e.id);
          if (!t) throw new Error('Unable to find view for room while deleting.');
          this.rootObjects[e.floorId].remove(t),
            this.roomMap.delete(e.id),
            t.dispose(),
            this.input.unregisterMesh(t),
            this.viewListener.removeView(e.id);
        }
        makeOpeningView(e) {
          const t = this.data.getWall(e.wallId),
            i = new S(e.id, t.floorId, this.cameraData, this.roomBoundsViewData);
          this.rootObjects[t.floorId].add(i, i.stencilPrepass, i.startHandle, i.endHandle),
            this.openingMap.set(e.id, i),
            this.registerViewToInput(i, i.startHandle, i.endHandle);
          for (const t of [i, i.startHandle, i.endHandle]) this.viewListener.addView(t, e.id);
          this.updateOpeningView(e);
        }
        removeViewForOpening(e) {
          const t = this.openingMap.get(e.id);
          if (!t) throw new Error('Unable to find view for opening while deleting.');
          this.rootObjects[t.floorId].remove(t, t.stencilPrepass, t.startHandle, t.endHandle),
            this.openingMap.delete(e.id),
            t.dispose(),
            this.unregisterViewToInput(t, t.startHandle, t.endHandle),
            this.viewListener.removeView(e.id);
        }
        isInsideMode() {
          return this.viewmodeData.isInside();
        }
        roomLabelHover(e, t) {
          if (this.isInsideMode() || !this.canHoverRoomLabels()) return;
          const i = e.userData.roomId,
            s = this.roomMap.get(i);
          s && s instanceof A.c && (s.hoverRoomLabel(t), this.onRoomLabelHover(t));
        }
        roomLabelClick(e) {
          return !(!this.isInsideMode() && this.canHoverRoomLabels());
        }
        getUnits() {
          return this.settingsData.tryGetProperty(M.F.UnitType, R.M.IMPERIAL);
        }
        baseHeightForFloor(e) {
          var t;
          return (
            (null === (t = this.floorsViewData.floors.getFloor(e)) || void 0 === t
              ? void 0
              : t.medianSweepFloorHeight()) || 0
          );
        }
        medianSweepHeightForRoom(e) {
          const t = [];
          for (const i of this.sweepData.sweeps())
            if (
              (i.floorId === e.floorId &&
                e.containsPoint(i.floorPosition.x, i.floorPosition.z) &&
                t.push(i.floorPosition.y),
              t.length >= 5)
            )
              break;
          if (t.length > 0) {
            const e = t.sort((e, t) => e - t);
            return e[Math.floor(e.length / 2)];
          }
          return null;
        }
      }
      var pe = i(933),
        me = i(69161),
        ge = i(4763),
        ve = i(60937),
        fe = i(57793),
        ye = i(64150),
        we = i(68184),
        be = i(90512),
        De = i(31740),
        Se = i(70593),
        Ie = i(74094),
        Pe = i(945);
      class Te extends pe.Y {
        constructor() {
          super(...arguments), (this.name = 'room-bound-renderer');
        }
        async init(e, t) {
          (this.engine = t),
            ([
              this.data,
              this.renderer,
              this.input,
              this.floorsViewData,
              this.cameraData,
              this.locale,
              this.settingsData,
              this.roomBoundViewData,
              this.viewmodeData,
              this.sweepData,
              this.toolsData,
            ] = await Promise.all([
              t.market.waitForData(me.Z),
              t.getModuleBySymbol(ge.Aj),
              t.getModuleBySymbol(ge.PZ),
              t.market.waitForData(ve.c),
              t.market.waitForData(fe.M),
              t.getModuleBySymbol(ge.e9),
              t.market.waitForData(ye.e),
              t.market.waitForData(we.e),
              t.market.waitForData(be.O),
              t.market.waitForData(De.Z),
              t.market.waitForData(Se.t),
            ]));
        }
        async dispose(e) {
          this.roomBoundRenderer && this.engine.removeComponent(this, this.roomBoundRenderer);
        }
        startRendering(e, t, i, s) {
          if (this.roomBoundRenderer) throw new Error('Already rendering!!');
          (this.roomBoundRenderer = new ue(
            e,
            this.data,
            this.renderer.getScene(),
            this.input,
            t,
            i,
            this.floorsViewData,
            this.cameraData,
            this.locale,
            this.engine,
            this.settingsData,
            this.roomBoundViewData,
            this.viewmodeData,
            this.sweepData,
            this.toolsData,
            s,
            (e) => {
              e
                ? this.engine.commandBinder.issueCommand(new Ie.u(Pe.C.FINGER))
                : this.engine.commandBinder.issueCommand(new Ie.u(Pe.C.DEFAULT));
            },
          )),
            this.engine.addComponent(this, this.roomBoundRenderer);
        }
        stopRendering() {
          if (!this.roomBoundRenderer) throw new Error('Not rendering!');
          this.engine.removeComponent(this, this.roomBoundRenderer),
            this.roomBoundRenderer.dispose(),
            (this.roomBoundRenderer = null);
        }
      }
    },
    70873: (e, t, i) => {
      'use strict';
      i.d(t, {
        Nh: () => n,
        XG: () => o,
        ZT: () => a,
        bk: () => h,
        mU: () => l,
        pp: () => s,
        qb: () => d,
        rP: () => r,
      });
      const s = 0.06,
        n = 7,
        a = 0.1,
        o = 0.02,
        r = 100,
        h = 8,
        d = 500,
        l = 0.9;
    },
    59339: (e, t, i) => {
      'use strict';
      i.d(t, { AK: () => x, LD: () => M, Ud: () => R, pr: () => E, z6: () => C });
      var s = i(50831),
        n = i(81396),
        a = i(67498),
        o = i.n(a),
        r = i(73293),
        h = i.n(r),
        d = i(40134),
        l = i.n(d),
        c = i(93670),
        u = i.n(c),
        p = i(86242),
        m = i.n(p),
        g = i(14536),
        v = i.n(g),
        f = i(47706),
        y = i.n(f),
        w = i(72292),
        b = i.n(w),
        D = i(25888),
        S = i.n(D),
        I = i(73868),
        P = i.n(I),
        T = i(70873);
      const E = {
          uniforms: {
            outlineColor: { type: 'v4', value: s.I.BLACK },
            baseColor: { type: 'v4', value: s.I.SINE },
            outlinePct: { type: 'f', value: 0.8 },
            radius: { type: 'f', value: T.pp },
            opacity: { type: 'f', value: 1 },
          },
          vertexShader: o(),
          fragmentShader: h(),
        },
        M = {
          uniforms: {
            outlineColor: { type: 'v3', value: s.I.WHITE },
            color: { type: 'v3', value: s.I.WHITE },
            lineStart: { type: 'v3', value: new n.Vector3() },
            lineEnd: { type: 'v3', value: new n.Vector3() },
            width: { type: 'f', value: 1 },
            selectedWidth: { type: 'f', value: 0.01 },
            opacity: { type: 'f', value: 1 },
          },
          vertexShader: l(),
          fragmentShader: u(),
        },
        C = {
          uniforms: {
            baseColor: { type: 'v4', value: s.I.WHITE },
            isDoor: { type: 'f', value: 1 },
            opacity: { type: 'f', value: 1 },
          },
          vertexShader: m(),
          fragmentShader: v(),
        },
        x = {
          uniforms: {
            opacity: { type: 'f', value: 1 },
            centerSpacing: { type: 'f', value: 24 },
            radius: { type: 'f', value: 4 },
            color: { type: 'v4', value: s.I.LENS_GRAY },
          },
          vertexShader: y(),
          fragmentShader: b(),
        },
        R = {
          uniforms: {
            tip: { type: 'v2', value: new n.Vector2() },
            normal: { type: 'v2', value: new n.Vector2() },
            height: { type: 'f', value: 0 },
            color: { type: 'v4', value: s.I.WHITE },
            opacity: { type: 'f', value: 1 },
            outline: { type: 'f', value: 1 },
            outlineColor: { type: 'v4', value: s.I.BLACK },
            screenSize: { type: 'v2', value: new n.Vector2() },
            tipPaddingPx: { type: 'f', value: 2 },
            widthPx: { type: 'f', value: 12 },
            heightPx: { type: 'f', value: 6 },
            aaPaddingPx: { type: 'f', value: 2 },
            metersPerPx: { type: 'f', value: 0.01 },
            autoScale: { type: 'f', value: 1 },
          },
          vertexShader: S(),
          fragmentShader: P(),
        };
    },
    2868: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => ee });
      var s = i(933),
        n = i(24938),
        a = i(88288),
        o = i(64150),
        r = i(4763),
        h = i(9263),
        d = i(69161),
        l = i(3626),
        c = i(27163),
        u = i(70593),
        p = i(55587),
        m = i(59491),
        g = i(20348);
      class v {
        constructor(e) {
          (this.map = new Map()), e.forEach((e) => this.map.set(e.state, e.subs));
        }
        renew(e) {
          (this.map.get(e) || []).forEach((e) => e.renew());
        }
        cancel(e) {
          if (e) {
            (this.map.get(e) || []).forEach((e) => e.cancel());
          } else this.map.forEach((e) => e.forEach((e) => e.cancel()));
        }
        update(e, t) {
          this.map.set(e, t);
        }
      }
      var f = i(59452),
        y = i(82076),
        w = i(79242),
        b = i(86210),
        D = i(49940),
        S = i(9975),
        I = i(26302),
        P = i(98375),
        T = i(21676),
        E = i(61173),
        M = i(64831),
        C = i(73943),
        x = i(53257),
        R = i(85726),
        L = i(32088),
        A = i(8126);
      const F = new x.Z('editor');
      var k, O;
      !(function (e) {
        e.DragAndDropBase = class {
          constructor(e = new s(), t) {
            (this.state = e),
              (this.eventConstructors = t),
              (this.events = new L.Y()),
              (this.bindings = []),
              (this.validator = null),
              this.state.commit(),
              this.bindings.push(
                this.state.onPropertyChanged('toolState', () => {
                  F.debug(
                    'toolState:',
                    { from: this.state.previousToolState, to: this.state.toolState },
                    this.state,
                  ),
                    this.events.broadcast(
                      new i.StateChange(this.state.toolState, this.state.previousToolState),
                    );
                }),
                this.onSelectedChanged((e, i) => {
                  this.events.broadcast(new t.SelectChange(e, i));
                }),
                this.onHoveredChanged((e, t) => {
                  this.events.broadcast(new i.HoverChange(e, t));
                }),
                this.state.onCurrentIdChanged((e, i) => {
                  this.events.broadcast(new t.CurrentChange(e, i));
                }),
              ),
              this.bindings.forEach((e) => e.cancel());
          }
          subscribe(e, t) {
            return this.events.subscribe(e, t);
          }
          setState(e) {
            e !== this.state.toolState &&
              ((this.state.previousToolState = this.state.toolState),
              (this.state.toolState = e),
              this.state.commit());
          }
          start() {
            const { toolState: e } = this.state;
            if (e !== t.CLOSED) throw new n('Editor already started');
            this.bindings.forEach((e) => e.renew()),
              this.setState(t.IDLE),
              this.events.broadcast(new i.Start());
          }
          setEnabled(e) {
            if (this.state.toolState === t.CLOSED) throw new n('Editor not started');
            if (e) this.state.toolState === t.DISABLED && this.setState(t.IDLE);
            else
              switch (this.state.toolState) {
                case t.DISABLED:
                  break;
                case t.IDLE:
                  this.setState(t.DISABLED);
                  break;
                default:
                  this.unhover({ commit: !1 }),
                    this.deselect({ commit: !1 }),
                    this.discard(),
                    this.setState(t.DISABLED);
              }
          }
          exit() {
            this.state.toolState !== t.CLOSED &&
              (this.state.toolState !== t.DISABLED &&
                (this.unhover({ commit: !1 }), this.deselect({ commit: !1 }), this.discard()),
              this.setState(t.CLOSED),
              this.bindings.forEach((e) => e.cancel()),
              this.events.broadcast(new i.Exit()));
          }
          setValidator(e) {
            this.validator = e;
          }
          onDiscard(e) {
            this.state.onBeforeDiscard = e || null;
          }
          internalEdit(e) {
            if ((this.assertActive(), null !== this.state.pendingEdit))
              throw (
                (F.error(
                  `Trying to edit asset ${e}, but currently editing ${this.state.pendingEdit}`,
                ),
                new n('Edit in progress'))
              );
            (this.state.pendingEdit = e),
              this.setState(t.EDITING),
              this.events.broadcast(new this.eventConstructors.EditStart(e, !1));
          }
          waitForAdd() {
            if ((this.assertActive(), null !== this.state.pendingAdd))
              throw (
                (F.error(
                  `Entering wait for add state, but already adding ${this.state.pendingAdd}`,
                ),
                new n('Add in progress'))
              );
            null !== this.state.selected &&
              (F.debug(
                `Entering the wait for add state, deselecting previous ${this.state.selected}`,
              ),
              this.deselect({ commit: !1 })),
              this.events.broadcast(new i.WaitForAddStart()),
              this.setState(t.WAIT_FOR_ADD);
          }
          internalAdd(e) {
            if ((this.assertActive(), null !== this.state.pendingAdd))
              throw (
                (F.error(
                  `Trying to add new asset ${e}, but already adding ${this.state.pendingAdd}`,
                ),
                new n('Add in progress'))
              );
            null !== this.state.selected &&
              (F.debug(`Add ${e} called, deselecting previous ${this.state.selected}`),
              this.deselect({ commit: !1 })),
              (this.state.pendingAdd = e),
              this.events.broadcast(new this.eventConstructors.AddStart(e)),
              this.setState(t.ADDING);
          }
          internalPlace(e) {
            this.assertActive();
            const { pendingAdd: i, pendingEdit: s } = this.state,
              n = i || s;
            (n && e === n) || (this.state.pendingEdit = e),
              this.setState(t.PLACING),
              this.events.broadcast(new this.eventConstructors.EditStart(e, !0));
          }
          move(e) {
            this.assertActive(), this.validate(e);
            const { pendingAdd: t, pendingEdit: i, selected: s } = this.state,
              n = t || i || s;
            n && this.events.broadcast(new this.eventConstructors.Move(n, e)),
              (this.state.ndcPosition.value = e.clientPosition);
          }
          highlight(...e) {
            this.assertActive();
            for (const t of e)
              this.state.highlighted.add(t), this.events.broadcast(new i.HighlightAdd(t));
          }
          clearHighlight(...e) {
            this.assertActive();
            for (const t of e)
              this.state.highlighted.delete(t), this.events.broadcast(new i.HighlightClear(t));
          }
          clearAllHighlights() {
            this.assertActive();
            for (const e of this.state.highlighted) this.events.broadcast(new i.HighlightClear(e));
            this.state.highlighted.clear();
          }
          dim(e) {
            this.assertActive(), this.state.dimmed.add(e), this.events.broadcast(new i.DimAdd(e));
          }
          clearDim(e) {
            this.assertActive(),
              this.state.dimmed.delete(e),
              this.events.broadcast(new i.DimClear(e));
          }
          clearAllDims() {
            this.assertActive();
            for (const e of this.state.dimmed) this.events.broadcast(new i.DimClear(e));
            this.state.dimmed.clear();
          }
          internalSelect(e, i) {
            this.assertActive(),
              this.state.pendingAdd ||
                this.state.pendingEdit ||
                ((this.state.previousSelected = this.state.selected),
                (this.state.selected = e),
                this.state.commit(),
                i && i.transitionTo ? this.setState(i.transitionTo) : this.setState(t.SELECTED));
          }
          deselect(e = { commit: !0 }) {
            this.assertActive(),
              this.state.pendingAdd ||
                this.state.pendingEdit ||
                (null !== this.state.selected &&
                  ((this.state.previousSelected = this.state.selected),
                  (this.state.selected = null),
                  e.commit && this.state.commit(),
                  e && e.transitionTo ? this.setState(e.transitionTo) : this.setState(t.IDLE)));
          }
          hover(e) {
            this.assertActive(),
              e !== this.state.hovered &&
                ((this.state.previousHovered = this.state.hovered),
                (this.state.hovered = e),
                this.state.commit());
          }
          unhover(e = { commit: !0 }) {
            this.state.hovered &&
              ((this.state.previousHovered = this.state.hovered),
              (this.state.hovered = null),
              e.commit && this.state.commit());
          }
          tryCommit() {
            this.assertActive();
            const e = this.state.pendingAdd,
              t = this.state.pendingEdit;
            if (!1 === this.state.pendingValid)
              return F.warn('nop, pendingValid', this.state.pendingValid), !1;
            let i = !1;
            const s = this.state.selected,
              n = this.state.pendingAdd || this.state.pendingEdit;
            if (n) {
              const a = null === this.state.pendingValid || !0 === this.state.pendingValid;
              a &&
                ((this.state.pendingAdd = null),
                (this.state.pendingEdit = null),
                (this.state.pendingValid = null),
                (this.state.onBeforeDiscard = null),
                t && this.events.broadcast(new this.eventConstructors.EditConfirm(t)),
                e && this.events.broadcast(new this.eventConstructors.AddConfirm(e)),
                this.state.pendingAdd ||
                  this.state.pendingEdit ||
                  s !== this.state.selected ||
                  this.internalSelect(n)),
                (i = a);
            }
            return i;
          }
          discard() {
            const e = this.state.pendingAdd || this.state.pendingEdit,
              i = this.state.pendingAdd,
              s = this.state.pendingEdit;
            e &&
              (this.state.onBeforeDiscard && this.state.onBeforeDiscard(),
              s &&
                ((this.state.pendingEdit = null),
                this.events.broadcast(new this.eventConstructors.EditDiscard(s))),
              i &&
                ((this.state.pendingAdd = null),
                this.events.broadcast(new this.eventConstructors.AddDiscard(i))),
              this.events.broadcast(new this.eventConstructors.ValidChange(null, null)),
              (this.state.pendingValid = null),
              (this.state.onBeforeDiscard = null)),
              this.unhover({ commit: !1 }),
              this.deselect({ commit: !1 }),
              this.state.toolState !== t.IDLE && this.setState(t.IDLE),
              this.state.commit();
          }
          validate(e) {
            const t = this.state.pendingAdd || this.state.pendingEdit || this.state.selected;
            if (t) {
              const i = this.state.pendingValid;
              let s = !0;
              this.validator
                ? ((s = this.validator.validate(t, e)), (this.state.pendingValid = s))
                : (this.state.pendingValid = null),
                null !== this.state.pendingValid &&
                  i !== this.state.pendingValid &&
                  this.events.broadcast(
                    new this.eventConstructors.ValidChange(s ? t : null, s ? null : t),
                  );
            }
          }
          assertActive() {
            if (this.state.toolState === e.ToolState.CLOSED) throw new n('Editor closed');
            if (this.state.toolState === e.ToolState.DISABLED) throw new n('Editor disabled');
          }
          onSelectedChanged(e) {
            return this.state.onPropertyChanged('selected', () =>
              e(this.state.selected, this.state.previousSelected),
            );
          }
          onHoveredChanged(e) {
            return this.state.onPropertyChanged('hovered', () =>
              e(this.state.hovered, this.state.previousHovered),
            );
          }
        };
        let t, i;
        (e.EventConstructors = class {
          constructor(e, t, i, s, n, a, o, r, h, d, l) {
            (this.AddStart = e),
              (this.EditStart = t),
              (this.AddConfirm = i),
              (this.AddDiscard = s),
              (this.EditConfirm = n),
              (this.EditDiscard = a),
              (this.Delete = o),
              (this.Move = r),
              (this.CurrentChange = h),
              (this.SelectChange = d),
              (this.ValidChange = l);
          }
        }),
          (function (e) {
            (e.CLOSED = 'CLOSED'),
              (e.DISABLED = 'DISABLED'),
              (e.IDLE = 'IDLE'),
              (e.SELECTED = 'SELECTED'),
              (e.WAIT_FOR_ADD = 'WAIT_FOR_ADD'),
              (e.ADDING = 'ADDING'),
              (e.EDITING = 'EDITING'),
              (e.PLACING = 'PLACING');
          })((t = e.ToolState || (e.ToolState = {})));
        class s extends M.T {
          constructor() {
            super(...arguments),
              (this.toolState = t.CLOSED),
              (this.previousToolState = t.CLOSED),
              (this.pendingAdd = null),
              (this.pendingEdit = null),
              (this.selected = null),
              (this.previousSelected = null),
              (this.hovered = null),
              (this.previousHovered = null),
              (this.highlighted = new Set()),
              (this.dimmed = new Set()),
              (this.ndcPosition = new R.f(null)),
              (this.onBeforeDiscard = null),
              (this.pendingValid = null);
          }
          get currentId() {
            return this.pendingAdd || this.pendingEdit || this.selected || null;
          }
          onCurrentIdChanged(e, t = !1) {
            let i = this.currentId;
            const s = () => {
                this.currentId !== i && (e(this.currentId, i), (i = this.currentId));
              },
              n = new g.V(
                this.onPropertyChanged('selected', s),
                this.onPropertyChanged('pendingAdd', s),
                this.onPropertyChanged('pendingEdit', s),
              );
            return t ? n.renew() : n.cancel(), n;
          }
        }
        e.BaseState = s;
        class n extends C.y {
          constructor(e = 'invalid state') {
            super(e), (this.name = 'invalid state');
          }
        }
        (e.EditorException = n),
          (function (e) {
            class t extends A.v0 {}
            (t.type = 'edit'), (e.EditEvent = t);
            class i extends t {
              constructor(e) {
                super(), (this.target = e);
              }
            }
            (i.type = 'editt'), (e.BaseEditTarget = i);
            class s extends t {
              constructor(e, t) {
                super(), (this.target = e), (this.previous = t);
              }
            }
            (s.type = 'edittp'), (e.BaseEditTargetAndPrev = s);
            class n extends t {
              constructor(e, t) {
                super(), (this.target = e), (this.previous = t);
              }
            }
            (n.type = 'toolchange'), (e.StateChange = n);
            class a extends t {}
            (a.type = 'editorstart'), (e.Start = a);
            class o extends t {}
            (o.type = 'editorexit'), (e.Exit = o);
            class r extends t {}
            (r.type = 'waitforaddstart'), (e.WaitForAddStart = r);
            class h extends i {}
            (h.type = 'addstart'), (e.BaseAddStart = h);
            class d extends i {
              constructor(e, t) {
                super(e), (this.placeOnly = t);
              }
            }
            (d.type = 'editstart'), (e.BaseEditStart = d);
            class l extends i {}
            (l.type = 'addconfirm'), (e.BaseAddConfirm = l);
            class c extends i {}
            (c.type = 'adddiscard'), (e.BaseAddDiscard = c);
            class u extends i {}
            (u.type = 'editconfirm'), (e.BaseEditConfirm = u);
            class p extends i {}
            (p.type = 'editdiscard'), (e.BaseEditDiscard = p);
            class m extends i {}
            (m.type = 'delete'), (e.BaseDelete = m);
            class g extends i {
              constructor(e, t) {
                super(e), (this.target = e), (this.ev = t);
              }
            }
            (g.type = 'move'), (e.BaseMove = g);
            class v extends s {}
            (v.type = 'target'), (e.BaseCurrentChange = v);
            class f extends s {}
            (f.type = 'hover'), (e.HoverChange = f);
            class y extends s {}
            (y.type = 'select'), (e.BaseSelectChange = y);
            class w extends i {}
            (w.type = 'highlight'), (e.HighlightAdd = w);
            class b extends i {}
            (b.type = 'highlightclear'), (e.HighlightClear = b);
            class D extends i {}
            (D.type = 'dim'), (e.DimAdd = D);
            class S extends i {}
            (S.type = 'dimclear'), (e.DimClear = S);
            class I extends s {}
            (I.type = 'valid'),
              (e.BaseValidChange = I),
              (e.hasTarget = function (e) {
                return e instanceof i;
              }),
              (e.hasTargetAndPrev = function (e) {
                return e instanceof s;
              });
          })((i = e.Events || (e.Events = {})));
      })(k || (k = {})),
        (function (e) {
          class t extends k.DragAndDropBase {
            constructor(e = new i()) {
              super(
                e,
                new k.EventConstructors(
                  s.AddStart,
                  s.EditStart,
                  s.AddConfirm,
                  s.AddDiscard,
                  s.EditConfirm,
                  s.EditDiscard,
                  s.Delete,
                  s.Move,
                  s.CurrentChange,
                  s.SelectChange,
                  s.ValidChange,
                ),
              ),
                (this.state = e);
            }
            add(e) {
              this.internalAdd(e);
            }
            edit(e) {
              this.internalEdit(e);
            }
            place(e) {
              this.internalPlace(e);
            }
            select(e, t) {
              this.internalSelect(e, t);
            }
            toggleSelect(e) {
              this.state.selected === e ? this.deselect() : this.select(e);
            }
          }
          e.DragAndDrop = t;
          class i extends k.BaseState {}
          let s;
          (e.State = i),
            (function (e) {
              class t extends k.Events.BaseAddStart {}
              e.AddStart = t;
              class i extends k.Events.BaseEditStart {}
              e.EditStart = i;
              class s extends k.Events.BaseAddConfirm {}
              e.AddConfirm = s;
              class n extends k.Events.BaseAddDiscard {}
              e.AddDiscard = n;
              class a extends k.Events.BaseEditConfirm {}
              e.EditConfirm = a;
              class o extends k.Events.BaseEditDiscard {}
              e.EditDiscard = o;
              class r extends k.Events.BaseDelete {}
              e.Delete = r;
              class h extends k.Events.BaseMove {}
              e.Move = h;
              class d extends k.Events.BaseCurrentChange {}
              e.CurrentChange = d;
              class l extends k.Events.BaseSelectChange {}
              e.SelectChange = l;
              class c extends k.Events.BaseValidChange {}
              e.ValidChange = c;
            })((s = e.Events || (e.Events = {})));
        })(O || (O = {}));
      var V = i(74094),
        B = i(945);
      const N = new x.Z('room-bounds-editor');
      class G extends O.DragAndDrop {
        constructor(e, t, i, s, n) {
          super(new O.State()),
            (this.messageBus = e),
            (this.commandBinder = t),
            (this.input = i),
            (this.settingsData = s),
            (this.isRoomHoverAllowed = n),
            (this.allViewsComparator = T.s.is((e) => e instanceof S.c)),
            this.subscribe(k.Events.StateChange, async ({ target: e }) => {
              this.inputStates || (this.inputStates = this.bindInputToEditorStates()),
                this.inputStates.cancel(),
                this.inputStates.renew(e);
            });
        }
        bindInputToEditorStates() {
          const e = () => {
              this.setEnabled(!1), this.commandBinder.issueCommand(new V.u(B.C.DEFAULT));
            },
            t = () => this.setEnabled(!0),
            i = new g.V(
              (0, m.k1)(
                () => this.messageBus.subscribe(P.oR, e),
                () => this.messageBus.unsubscribe(P.oR, e),
                !1,
              ),
              (0, m.k1)(
                () => this.messageBus.subscribe(P.NR, t),
                () => this.messageBus.unsubscribe(P.NR, t),
                !1,
              ),
              this.isRoomHoverAllowed.onChanged((i) => {
                i ? t() : e();
              }),
            ),
            s = (0, E.Jm)()
              ? new g.V()
              : new g.V(
                  this.input.registerMeshHandler(b.z, this.allViewsComparator, (e, t) => {
                    this.hover(t.roomBoundsId),
                      this.commandBinder.issueCommand(new V.u(B.C.FINGER));
                  }),
                  this.input.registerMeshHandler(b.A, this.allViewsComparator, () => {
                    this.unhover(), this.commandBinder.issueCommand(new V.u(B.C.DEFAULT));
                  }),
                );
          s.cancel();
          const n = new g.V(
            this.input.registerMeshHandler(
              w.Rd,
              this.allViewsComparator,
              this.onToggleSelectInput.bind(this),
            ),
          );
          n.cancel();
          const a = (e) => !!this.state.selected && (this.discard(), e.preventDefault(), !0),
            o = [this.input.registerMeshHandler(w.Rd, T.s.isType(I.i), a)];
          this.settingsData.tryGetProperty(f.eC, !1) ||
            o.push(this.input.registerMeshHandler(w.Rd, T.s.isType(D.S), a));
          const r = new g.V(...o);
          r.cancel();
          const h = this.messageBus.subscribe(y.S, () => this.discard()),
            d = new g.V(
              i,
              s,
              n,
              r,
              h,
              ((e) => {
                const t = N.debug;
                return (0, m.k1)(
                  () => t(`${e}.renew()`),
                  () => t(`${e}.cancel()`),
                  !1,
                );
              })('ToolState.SELECTED || ToolState.IDLE -> bindings'),
            );
          return new v([
            { state: k.ToolState.DISABLED, subs: [i] },
            { state: k.ToolState.SELECTED, subs: [d] },
            { state: k.ToolState.IDLE, subs: [d] },
          ]);
        }
        onToggleSelectInput(e, t) {
          const i = t.roomBoundsId,
            s = this.state.selected === i;
          return (
            i &&
              setTimeout(() => {
                t.parent &&
                  (s
                    ? e instanceof w.Rd && (this.discard(), this.deselect())
                    : (this.select(i), this.hover(i)));
              }, 0),
            !s
          );
        }
      }
      var H,
        _,
        U = i(67540),
        W = i(24826);
      !(function (e) {
        class t extends k.DragAndDropBase {
          constructor(e = new i()) {
            super(
              e,
              new k.EventConstructors(
                s.AddStart,
                s.EditStart,
                s.AddConfirm,
                s.AddDiscard,
                s.EditConfirm,
                s.EditDiscard,
                s.Delete,
                s.Move,
                s.CurrentChange,
                s.SelectChange,
                s.ValidChange,
              ),
            ),
              (this.state = e);
          }
          add(e) {
            this.internalAdd(new Set(e));
          }
          edit(e) {
            this.internalEdit(new Set(e));
          }
          place(e) {
            this.internalPlace(new Set(e));
          }
          select(e, t) {
            const i =
              (null == t ? void 0 : t.addToExistingSelection) && this.state.selected
                ? Array.from(this.state.selected.keys()).concat(e)
                : e;
            this.internalSelect(new Set(i), t);
          }
          toggleSelect(e) {
            var t;
            const i = new Set(
              null === (t = this.state.selected) || void 0 === t ? void 0 : t.keys(),
            );
            for (const t of e) i.has(t) ? i.delete(t) : i.add(t);
            this.internalSelect(i);
          }
        }
        e.DragAndDrop = t;
        class i extends k.BaseState {}
        let s;
        (e.State = i),
          (function (e) {
            class t extends k.Events.BaseAddStart {}
            e.AddStart = t;
            class i extends k.Events.BaseEditStart {}
            e.EditStart = i;
            class s extends k.Events.BaseAddConfirm {}
            e.AddConfirm = s;
            class n extends k.Events.BaseAddDiscard {}
            e.AddDiscard = n;
            class a extends k.Events.BaseEditConfirm {}
            e.EditConfirm = a;
            class o extends k.Events.BaseEditDiscard {}
            e.EditDiscard = o;
            class r extends k.Events.BaseDelete {}
            e.Delete = r;
            class h extends k.Events.BaseMove {}
            e.Move = h;
            class d extends k.Events.BaseCurrentChange {}
            e.CurrentChange = d;
            class l extends k.Events.BaseSelectChange {}
            e.SelectChange = l;
            class c extends k.Events.BaseValidChange {}
            e.ValidChange = c;
          })((s = e.Events || (e.Events = {})));
      })(H || (H = {})),
        (function (e) {
          const t = {
            [k.Events.HoverChange.type]: 'hoverState',
            [k.Events.HighlightAdd.type]: 'highlightState',
            [k.Events.HighlightClear.type]: 'highlightState',
            [k.Events.DimAdd.type]: 'dimState',
            [k.Events.DimClear.type]: 'dimState',
          };
          class i {
            constructor(e) {
              (this.editor = e),
                (this.bindings = []),
                (this.entities = new Map()),
                this.bindings.push(
                  this.editor.subscribe(k.Events.HoverChange, (e) =>
                    this.bindTargetedCallback(k.Events.HoverChange.type, e),
                  ),
                  this.editor.subscribe(k.Events.HighlightAdd, (e) =>
                    this.bindTargetedCallback(k.Events.HighlightAdd.type, e),
                  ),
                  this.editor.subscribe(k.Events.HighlightClear, (e) =>
                    this.bindClearCallback(k.Events.HighlightClear.type, e),
                  ),
                  this.editor.subscribe(k.Events.DimAdd, (e) =>
                    this.bindTargetedCallback(k.Events.DimAdd.type, e),
                  ),
                  this.editor.subscribe(k.Events.DimClear, (e) =>
                    this.bindClearCallback(k.Events.DimClear.type, e),
                  ),
                );
            }
            registerEntity(e, ...t) {
              let i = this.entities.get(e);
              i || (i = []), i.push(...t), this.entities.set(e, i);
            }
            unregisterEntity(e) {
              return this.entities.delete(e);
            }
            bindTargetedCallback(e, t) {
              const { target: i, previousTarget: s } = this.getTargetAndPrevIds(t),
                n = this.eventToCallbackMapping[e];
              if (!n) throw Error(`implement targetted callback for ${e}`);
              for (const e of s)
                (this.entities.get(e) || []).forEach((e) => {
                  n in e && ((e[n].active = !1), e[n].off());
                });
              for (const e of i)
                (this.entities.get(e) || []).forEach((e) => {
                  n in e && ((e[n].active = !0), e[n].on());
                });
            }
            bindMoveCallback(e) {
              const { target: t } = this.getTargetAndPrevIds(e);
              for (const i of t)
                (this.entities.get(i) || []).forEach((t) => {
                  t.mover && e.target && t.mover.onMove(i, e.ev);
                });
            }
            bindClearCallback(e, t) {
              const i = this.eventToCallbackMapping[e],
                { target: s } = this.getTargetAndPrevIds(t);
              for (const e of s)
                (this.entities.get(e) || []).forEach((e) => {
                  i in e && ((e[i].active = !1), e[i].off());
                });
            }
          }
          e.BaseEditorEntityAdapter = i;
          e.EditorEntityAdapter = class extends i {
            constructor(e) {
              super(e),
                (this.eventToCallbackMapping = Object.assign(Object.assign({}, t), {
                  [O.Events.SelectChange.type]: 'selectState',
                  [O.Events.ValidChange.type]: 'validState',
                  [O.Events.Move.type]: 'mover',
                })),
                this.bindings.push(
                  this.editor.subscribe(O.Events.SelectChange, (e) =>
                    this.bindTargetedCallback(O.Events.SelectChange.type, e),
                  ),
                  this.editor.subscribe(O.Events.ValidChange, (e) =>
                    this.bindTargetedCallback(O.Events.ValidChange.type, e),
                  ),
                  this.editor.subscribe(O.Events.Move, (e) => this.bindMoveCallback(e)),
                );
            }
            getTargetAndPrevIds(e) {
              if (k.Events.hasTargetAndPrev(e))
                return {
                  target: e.target ? [e.target] : [],
                  previousTarget: e.previous ? [e.previous] : [],
                };
              if (k.Events.hasTarget(e))
                return { target: e.target ? [e.target] : [], previousTarget: [] };
              throw new Error('Unexpected message!!');
            }
          };
          e.MultiSelectEditorEntityAdapter = class extends i {
            constructor(e) {
              super(e),
                (this.eventToCallbackMapping = Object.assign(Object.assign({}, t), {
                  [H.Events.SelectChange.type]: 'selectState',
                  [H.Events.ValidChange.type]: 'validState',
                  [H.Events.Move.type]: 'mover',
                })),
                this.bindings.push(
                  this.editor.subscribe(H.Events.SelectChange, (e) =>
                    this.bindTargetedCallback(H.Events.SelectChange.type, e),
                  ),
                  this.editor.subscribe(H.Events.ValidChange, (e) =>
                    this.bindTargetedCallback(H.Events.ValidChange.type, e),
                  ),
                  this.editor.subscribe(H.Events.Move, (e) => this.bindMoveCallback(e)),
                );
            }
            getTargetAndPrevIds(e) {
              const t = (e) => (e instanceof Set ? Array.from(e.keys()) : null !== e ? [e] : []);
              if (k.Events.hasTargetAndPrev(e))
                return {
                  target: e.target ? t(e.target) : [],
                  previousTarget: e.previous ? t(e.previous) : [],
                };
              if (k.Events.hasTarget(e))
                return { target: e.target ? t(e.target) : [], previousTarget: [] };
              throw new Error('Unexpected message!!');
            }
          };
        })(_ || (_ = {}));
      class z {
        constructor(e, t) {
          (this.editor = e),
            (this.data = t),
            (this.readBindings = []),
            (this.mover = { onMove: (e, t) => {} }),
            (this.onCurrentChange = ({ target: e }) => {
              this.editor.state.toolState !== k.ToolState.ADDING && this.clearHighlightedViews(),
                this.highlightView(e);
            }),
            (this.onSelectChange = ({ target: e }) => {
              this.setSelectedView(e);
            }),
            (this.onHoverChange = ({ target: e, previous: t }) => {
              if (this.editor.state.toolState === k.ToolState.ADDING) return;
              if (!e)
                return (
                  this.editor.clearAllDims(),
                  this.editor.clearAllHighlights(),
                  void (
                    this.editor.state.selected && this.setSelectedView(this.editor.state.selected)
                  )
                );
              const i = this.data.getEntity(e);
              this.hoverView(i);
            }),
            (this.editableEntities = new _.EditorEntityAdapter(this.editor));
        }
        addEditableEntity(e, t) {
          this.editableEntities.registerEntity(t, this, e);
        }
        removeEditableEntity(e) {
          this.editableEntities.unregisterEntity(e);
        }
        activate() {
          0 === this.readBindings.length
            ? this.readBindings.push(
                this.editor.subscribe(O.Events.CurrentChange, this.onCurrentChange),
                this.editor.subscribe(O.Events.SelectChange, this.onSelectChange),
                this.editor.subscribe(k.Events.HoverChange, this.onHoverChange),
              )
            : this.readBindings.forEach((e) => e.renew());
        }
        deactivate() {
          this.readBindings.forEach((e) => e.cancel());
        }
        clearHighlightedViews() {
          this.editor.clearAllHighlights();
        }
        highlightView(e) {
          if (!e) return;
          const t = this.data.getEntity(e);
          t instanceof W.c && this.editor.highlight(e, t.from.id, t.to.id);
        }
        setSelectedView(e) {
          if (!e) return void this.editor.clearAllDims();
          const t = this.data.getEntity(e);
          t instanceof W.c && this.editor.highlight(t.from.id, t.to.id),
            t instanceof U.JJ &&
              (this.clearHighlightedViews(), this.dimAllRooms(), this.selectRoom(t));
        }
        dimAllRooms() {
          this.editor.clearAllDims();
          for (const [, e] of this.data.rooms) this.dimRoom(e);
        }
        hoverView(e) {
          e instanceof U.JJ && this.hoverRoom(e);
        }
        hoverRoom(e) {
          const t = e.id;
          this.editor.clearDim(t);
          for (const t of e.walls) this.editor.clearDim(t.id);
          for (const t of e.points) this.editor.clearDim(t.id);
        }
        selectRoom(e) {
          const t = e.id;
          this.editor.clearDim(t);
          for (const t of e.walls) this.editor.clearDim(t.id);
          for (const t of e.points) this.editor.clearDim(t.id);
        }
        dimRoom(e) {
          const t = e.id;
          this.editor.dim(t);
          for (const t of e.walls) this.editor.dim(t.id);
          for (const t of e.points) this.editor.dim(t.id);
        }
      }
      var j = i(68184),
        $ = i(2157),
        q = i(90512),
        Z = i(60580),
        Y = i(44288),
        X = i(56574);
      const K = [c.w1.SEARCH, c.w1.LAYERS, c.w1.ROOM_VIEW, c.w1.HLR, c.w1.MEASUREMENTS],
        Q = new Map(),
        J = new Set([Z.au.CLOSED, Z.au.IDLE]);
      class ee extends s.Y {
        constructor() {
          super(...arguments),
            (this.name = 'room_bound'),
            (this.active = !1),
            (this.allowRendering = !0),
            (this.isActivatingOrDeactivating = !1),
            (this.viewListener = {
              addView: (e, t) => this.inputManager.addEditableEntity(e, t),
              removeView: (e) => this.inputManager.removeEditableEntity(e),
            }),
            (this.activate = async () => {
              (this.isActivatingOrDeactivating = !0),
                this.active ||
                  ((this.active = !0),
                  this.editor.start(),
                  this.renderer.startRendering(
                    !0,
                    this.viewListener,
                    () => !1,
                    () => this.isRoomHoverAllowed.value,
                  ),
                  this.viewData.setRoomBoundVisible(!0),
                  this.inputManager.activate()),
                (this.isActivatingOrDeactivating = !1);
            }),
            (this.deactivate = async () => {
              (this.isActivatingOrDeactivating = !0),
                this.active &&
                  ((this.active = !1),
                  this.editor.exit(),
                  this.renderer.stopRendering(),
                  this.viewData.setRoomBoundVisible(!1),
                  this.inputManager.deactivate()),
                (this.isActivatingOrDeactivating = !1);
            }),
            (this.unselect = async (e) => {
              e && (await this.updateShowcaseVisibility(), this.active && this.editor.deselect());
            });
        }
        get getAllowRendering() {
          return this.allowRendering;
        }
        async init(e, t) {
          const [i, s, l, p, m, g, v, f, y] = await Promise.all([
            t.getModuleBySymbol(r.PZ),
            t.market.waitForData(d.Z),
            t.market.waitForData(o.e),
            t.market.waitForData(n.pu),
            t.market.waitForData(u.t),
            t.getModuleBySymbol(r.Ay),
            t.market.waitForData(j.e),
            t.market.waitForData(q.O),
            t.market.waitForData(Y.X),
          ]);
          (this.data = s),
            (this.data.onActionError = (e) => {
              (this.applicationData.error = e), this.applicationData.commit();
            }),
            (this.applicationData = p),
            (this.toolsData = m),
            (this.settingsData = l),
            (this.renderer = g),
            (this.viewData = v),
            (this.viewmodeData = f),
            (this.isRoomHoverAllowed = new X.Y(
              () =>
                this.applicationData.application !== n.Mx.SHOWCASE ||
                this.toolsData.activeToolName !== c.w1.MEASUREMENTS ||
                J.has(y.phase),
              [
                (e) => y.onPhaseChanged(e),
                (e) => this.toolsData.onPropertyChanged('activeToolName', e),
                (e) => this.applicationData.onChanged(e),
              ],
            )),
            (this.editor = new G(
              t.msgBus,
              t.commandBinder,
              i,
              this.settingsData,
              this.isRoomHoverAllowed,
            )),
            this.viewData.setEditorState(this.editor.state),
            (this.inputManager = new z(this.editor, s)),
            this.bindings.push(
              t.commandBinder.addBinding($.pZ, async (e) => this.unselect(e.id)),
              t.commandBinder.addBinding($.Os, async (e) =>
                this.toggleVisibilityForViewer(e.visible),
              ),
              t.commandBinder.addBinding(
                $.lN,
                async (e) => await this.setAllowRendering(e.allowRendering),
              ),
              this.applicationData.onChanged(() => this.updateShowcaseVisibility()),
              this.viewmodeData.onChanged(() => this.updateShowcaseVisibility()),
              this.toolsData.onPropertyChanged('activeToolName', () =>
                this.updateShowcaseVisibility(),
              ),
              this.settingsData.onPropertyChanged(h.gx.RoomBounds, () =>
                this.updateShowcaseAvailability(),
              ),
              t.subscribe(a.pB, (e) => {
                this.updateShowcaseVisibility();
              }),
            ),
            this.updateShowcaseAvailability();
        }
        dispose(e) {
          super.dispose(e), e.market.unregister(this, j.e);
        }
        toggleVisibilityForViewer(e) {
          (this.viewData.visibleInShowcase = e),
            this.viewData.commit(),
            this.updateShowcaseVisibility();
        }
        async updateShowcaseAvailability() {
          const e = this.settingsData.tryGetProperty(h.gx.RoomBounds, !1),
            t =
              this.settingsData.tryGetProperty(p.dF, !1) ||
              this.settingsData.tryGetProperty(p.wY, !1),
            i = e && t;
          this.settingsData.setProperty(l.hW, i),
            i && !this.viewData.visibleInShowcase
              ? this.toggleVisibilityForViewer(!0)
              : this.updateShowcaseVisibility();
        }
        async updateShowcaseVisibility() {
          const e = this.toolsData.activeToolName === c.w1.ROOM_BOUNDS;
          if (this.isActivatingOrDeactivating || e) return;
          const { application: t } = this.applicationData,
            i = t === n.Mx.SHOWCASE,
            s = t === n.Mx.WORKSHOP,
            a = this.settingsData.tryGetProperty(l.hW, !1),
            o = (i && this.viewData.visibleInShowcase && a) || s,
            r = null == this.toolsData.activeToolName || K.includes(this.toolsData.activeToolName),
            h = null != this.toolsData.activeToolName ? Q.get(this.toolsData.activeToolName) : null,
            d =
              null != h &&
              null != this.viewmodeData.currentMode &&
              h.includes(this.viewmodeData.currentMode),
            u = r || d,
            p = this.data.rooms.size > 0,
            m = this.applicationData.phase === n.nh.PLAYING;
          o && u && p && m && this.allowRendering ? await this.activate() : await this.deactivate();
        }
        async setAllowRendering(e) {
          (this.allowRendering = e), this.updateShowcaseVisibility();
        }
      }
    },
    75328: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => g });
      var s = i(933),
        n = i(53257),
        a = i(64831);
      class o extends a.T {
        equals(e) {
          return this.id === e.id;
        }
        copy(e) {
          return (
            (this.id = e.id),
            (this.name = e.name),
            (this.vendor = e.vendor),
            (this.model = e.model),
            (this.captureMode = e.captureMode),
            (this.depthCameraType = e.depthCameraType),
            (this.cameraTypes = e.cameraTypes.slice()),
            (this.sensorSerialNumbers = e.sensorSerialNumbers.slice()),
            (this.serialNumber = e.serialNumber),
            (this.mountCalibrationVersion = e.mountCalibrationVersion),
            (this.softwareVersion = e.softwareVersion),
            this
          );
        }
      }
      class r extends a.T {
        constructor(e) {
          super(),
            e &&
              (e.id && (this.id = e.id),
              void 0 !== e.index && (this.index = e.index),
              (this.name = e.name || ''),
              (this.created = e.created || ''),
              (this.alignment = e.alignment || ''),
              (this.options = e.options || []),
              (this.camera = e.camera || new o()));
        }
        equals(e) {
          return this.id === e.id;
        }
        copy(e) {
          return (
            (this.id = e.id),
            (this.index = e.index),
            (this.name = e.name),
            (this.created = e.created),
            (this.alignment = e.alignment),
            (this.options = e.options.slice()),
            (this.camera = new o().copy(e.camera)),
            this
          );
        }
      }
      const h = new n.Z('mds-scaninfo-serializer');
      class d {
        deserialize(e) {
          if (!e || !this.validate(e))
            return h.debug('Deserialized invalid ScanInfo data from MDS', e), null;
          const t = e,
            i = new r();
          (i.id = t.id),
            (i.anchorId = (t.anchor && t.anchor.id) || ''),
            (i.index = t.index || -1),
            (i.name = t.name || ''),
            (i.created = t.created || ''),
            (i.alignment = t.alignment || ''),
            (i.url = t.url || ''),
            (i.timeOfDay = t.timeOfDay || ''),
            (i.options = t.options || []);
          const s = t.camera;
          return (
            (i.camera = new o()),
            (i.camera.id = (s && s.id) || ''),
            (i.camera.name = (s && s.name) || ''),
            (i.camera.vendor = (s && s.vendor) || ''),
            (i.camera.model = (s && s.model) || ''),
            (i.camera.captureMode = (s && s.captureMode) || ''),
            (i.camera.depthCameraType = (s && s.depthCameraType) || ''),
            (i.camera.cameraTypes = ((null == s ? void 0 : s.cameraTypes) || []).filter((e) => e)),
            (i.camera.sensorSerialNumbers = (
              (null == s ? void 0 : s.sensorSerialNumbers) || []
            ).filter((e) => e)),
            (i.camera.serialNumber = (s && s.serialNumber) || ''),
            (i.camera.mountCalibrationVersion = (null == s ? void 0 : s.mountCalibrationVersion)
              ? s.mountCalibrationVersion
              : void 0),
            (i.camera.softwareVersion = (s && s.softwareVersion) || ''),
            i
          );
        }
        validate(e) {
          if (!e) return !1;
          return ['id'].every((t) => t in e);
        }
      }
      var l = i(93797),
        c = i(34029);
      class u {}
      class p extends l.u {
        constructor() {
          super(...arguments), (this.deserializer = new d());
        }
        async fetch() {
          const e = this.getViewId();
          return this.query(c.GetScans, { modelId: e }, { fetchPolicy: 'no-cache' }).then((e) => {
            var t, i, s;
            const n =
                (null ===
                  (s =
                    null === (i = null === (t = e.data) || void 0 === t ? void 0 : t.model) ||
                    void 0 === i
                      ? void 0
                      : i.assets) || void 0 === s
                  ? void 0
                  : s.scans) || [],
              a = {},
              o = {};
            for (const e of n) {
              const t = this.deserializer.deserialize(e);
              t && ((a[t.id] = t), t.anchorId && (o[t.anchorId] = t));
            }
            const r = new u();
            return (r.scansById = a), (r.scansByAnchor = o), r;
          });
        }
        async read() {
          return this.scans || (this.scans = this.fetch()), this.scans;
        }
        async refresh() {
          return (this.scans = this.fetch()), this.scans;
        }
      }
      var m = i(22925);
      class g extends s.Y {
        constructor() {
          super(...arguments),
            (this.name = 'scaninfo-data'),
            (this.getScanInfo = (e) =>
              this.store.read().then((t) => (t ? t.scansByAnchor[e] : void 0))),
            (this.getScanDownloadURL = (e) =>
              this.store.refresh().then((t) => {
                if (t) {
                  const i = t.scansByAnchor[e];
                  return i ? i.url : void 0;
                }
              }));
        }
        async init(e, t) {
          const i = await t.market.waitForData(m.R);
          this.store = new p({ context: i.mdsContext, readonly: !0 });
        }
      }
    },
    73521: (e, t, i) => {
      'use strict';
      i.d(t, { K: () => r });
      var s = i(75287),
        n = i(32137),
        a = i(44303);
      const o = new s.v({});
      class r {
        constructor(e, t, i) {
          (this.commandBinder = e),
            (this.layersData = t),
            (this.dataTypeGroup = i),
            (this.textParser = o),
            (this.enabled = !0),
            (this.bindings = []);
        }
        getGroupingId(e) {
          switch (e) {
            case a.HH.TYPE:
              return this.getTypeId();
            case a.HH.FLOOR:
              return this.getFloorId();
            case a.HH.ROOM:
              return this.getRoomId();
            case a.HH.LAYER:
              return this.getLayerGroupId();
            case a.HH.DATE:
              return this.dateBucket;
          }
        }
        getFloorId() {
          return this.floorId;
        }
        getRoomId() {
          return this.roomId;
        }
        getDateBucket() {
          return this.dateBucket;
        }
        getTypeId() {
          return this.typeId;
        }
        supportsBatchDelete() {
          return !1;
        }
        supportsLayeredCopyMove() {
          return !1;
        }
        getLayerGroupId() {
          var e, t;
          const i = null === (e = this.layersData) || void 0 === e ? void 0 : e.getBaseLayerId(),
            s = null === (t = this.layersData) || void 0 === t ? void 0 : t.getViewLayerId();
          return this.layerId && s && this.layerId === i ? s : this.layerId;
        }
        isLayerVisible() {
          return !this.layersData || !this.layerId || this.layersData.layerVisible(this.layerId);
        }
        onSelect(e, t, i) {
          this.commandBinder.issueCommand(new n.IL(this.id, this.typeId));
        }
        registerBindings() {}
        cancelBindings() {
          this.bindings.forEach((e) => e.cancel());
        }
      }
    },
    32137: (e, t, i) => {
      'use strict';
      i.d(t, {
        FZ: () => a,
        H1: () => n,
        Hf: () => h,
        IL: () => l,
        M8: () => o,
        Mp: () => d,
        Pe: () => u,
        SN: () => r,
        c6: () => c,
      });
      var s = i(56063);
      class n extends s.m {
        constructor(e) {
          super(), (this.payload = { query: e });
        }
      }
      n.id = 'UPDATE_SEARCH_QUERY';
      class a extends s.m {
        constructor(e) {
          super(), (this.payload = { keywords: e });
        }
      }
      a.id = 'UPDATE_SEARCH_QUERY_KEYWORDS';
      class o extends s.m {
        constructor(e) {
          super(), (this.payload = { keywordId: e });
        }
      }
      o.id = 'TOGGLE_SEARCH_QUERY_KEYWORD';
      class r extends s.m {
        constructor(e) {
          super(), (this.payload = { grouping: e });
        }
      }
      r.id = 'CHANGE_SEARCH_GROUPING';
      class h extends s.m {
        constructor() {
          super();
        }
      }
      h.id = 'SEARCH_FILTER_CLEAR';
      class d extends s.m {
        constructor(e, t) {
          super(), (this.payload = { groupId: e, enabled: t });
        }
      }
      d.id = 'SEARCH_FILTER_TOGGLE';
      class l extends s.m {
        constructor(e, t) {
          super(), (this.payload = { id: e, typeId: t });
        }
      }
      l.id = 'SELECT_SEARCH_RESULT';
      class c extends s.m {
        constructor(e) {
          super(), (this.payload = e);
        }
      }
      c.id = 'SEARCH_GROUP_REGISTER';
      class u extends s.m {
        constructor(e) {
          super(), (this.payload = { id: e });
        }
      }
      u.id = 'SEARCH_GROUP_DEREGISTER';
    },
    46199: (e, t, i) => {
      'use strict';
      i.d(t, { A: () => a });
      var s = i(16996),
        n = i(47149);
      const a = (0, s.M)(n.T, 'query', '');
    },
    98009: (e, t, i) => {
      'use strict';
      i.d(t, { F: () => n });
      var s = i(56063);
      class n extends s.m {
        constructor(e) {
          super(), (this.payload = { navSize: e });
        }
      }
      n.id = 'SET_NAV_PANO_SIZE';
    },
    12652: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => L });
      var s = i(933),
        n = i(81396),
        a = i(21676),
        o = i(26302),
        r = i(49940),
        h = i(75961),
        d = i(6041),
        l = i(56063);
      class c extends l.m {
        constructor(e) {
          super(), (this.payload = { enabled: e });
        }
      }
      c.id = 'TOGGLE_PUCK_EDITING';
      var u = i(87549),
        p = i(40333),
        m = i(59228),
        g = i(79242),
        v = i(64150),
        f = i(57793),
        y = i(79884),
        w = i(90512),
        b = i(43017),
        D = i(38063),
        S = i(55574),
        I = i(59452),
        P = i(4763);
      const T = [
        { outerRadius: 1, innerRadius: 0.97, color: 0, opacity: 0.1 },
        { outerRadius: 0.97, innerRadius: 0.65, color: 16777215, opacity: 0.64 },
        { outerRadius: 0.65, innerRadius: 0.62, color: 0, opacity: 0.13 },
      ];
      var E = i(54909),
        M = i(59491),
        C = i(74094),
        x = i(945);
      const R = { enabled: T, enabledHover: T };
      class L extends s.Y {
        constructor() {
          super(...arguments),
            (this.name = 'sweep-pucks'),
            (this.IDLE_OPACITY = 0.3),
            (this.EDITING_OPACITY = 0.9),
            (this.IDLE_COLOR = new n.Color('white')),
            (this.SELECTION_COLOR = new n.Color(16724312)),
            (this.defaultCheckRenderModes = () => !0),
            (this.unselectingSweep = null),
            (this.editingEnabled = !1),
            (this.selectionBindings = []),
            (this.unselectionBindings = []),
            (this.isHoveringPuck = !1),
            (this.selectionHandled = !0),
            (this.unselectionHandled = !0),
            (this.handlePuckClickedMessage = (e) => {
              if (!e)
                throw new Error(
                  'SweepPucks -> on PuckClickedMessage: Tried to move to invalid sweep id.',
                );
              this.canSelectPuck() ||
                (this.sweepViewData.data.canTransition() &&
                  this.cameraData.canTransition() &&
                  this.engine.commandBinder.issueCommand(
                    new D.ju({ transition: I.y4[this.interactionmodeData.mode], sweep: e }),
                  ));
            }),
            (this.handlePuckHoverMessage = ({ hovered: e }) => {
              (this.isHoveringPuck = e),
                this.engine.commandBinder.issueCommand(new C.u(e ? x.C.FINGER : null));
            }),
            (this.cursorVisibilityRule = () => !this.isHoveringPuck),
            (this.handleSweepSelectionChange = () => {
              this.updateHighlightOnSelectedPuck(!1),
                (this.selectedSweep = this.sweepViewData.selectedSweep),
                this.updateHighlightOnSelectedPuck(!0),
                this.updateHandlers();
            }),
            (this.updateViewmode = () => {
              (this.viewmode = this.viewmodeData.currentMode),
                this.updateHighlightOnSelectedPuck(this.editingEnabled),
                this.updateHandlers();
            }),
            (this.updateHandlers = () => {
              (this.selectionHandled = this.toggleHandlers(
                this.canSelectPuck(),
                this.selectionBindings,
                this.selectionHandled,
              )),
                (this.unselectionHandled = this.toggleHandlers(
                  this.canUnselectPuck(),
                  this.unselectionBindings,
                  this.unselectionHandled,
                ));
            }),
            (this.unselectPuck = () => {
              (this.unselectingSweep = null), this.sweepViewData.setSelectedSweep(null);
            }),
            (this.onUnselectPuck = (e) => {
              const t = this.sweepViewData.selectedSweep;
              return (
                t &&
                  (e.down
                    ? (this.unselectingSweep = t)
                    : this.unselectingSweep && this.unselectPuck()),
                !0
              );
            }),
            (this.onPointerOnPuck = (e, t) => {
              if (e.button !== p.M.PRIMARY) return;
              const i = this.renderer.getSweepId(t.id);
              i &&
                (e.down
                  ? i === this.selectedSweep
                    ? (this.unselectingSweep = i)
                    : ((this.unselectingSweep = null), this.sweepViewData.setSelectedSweep(i))
                  : (i === this.unselectingSweep && this.unselectPuck(),
                    (this.unselectingSweep = null)));
            });
        }
        async init(e, t) {
          (this.engine = t),
            void 0 !== e.checkRenderModes && (this.defaultCheckRenderModes = e.checkRenderModes);
          const i = (await t.getModuleBySymbol(P.Aj)).getScene(),
            s = await t.getModuleBySymbol(P.PZ),
            n = await t.getModuleBySymbol(P.Lk),
            [l, u, p, b, D] = await Promise.all([
              t.market.waitForData(v.e),
              t.market.waitForData(f.M),
              t.market.waitForData(y.D),
              t.market.waitForData(w.O),
              t.market.waitForData(S.Z),
            ]);
          (this.viewmodeData = b),
            (this.viewmode = b.currentMode),
            (this.sweepViewData = p),
            (this.cameraData = u),
            (this.interactionmodeData = D);
          (this.renderer = new h.C(
            i.scene,
            s,
            l,
            p,
            R,
            !0,
            this.defaultCheckRenderModes,
            this.IDLE_COLOR,
            this.SELECTION_COLOR,
            this.IDLE_OPACITY,
            this.EDITING_OPACITY,
            void 0,
            void 0,
            t.claimRenderLayer(this.name),
          )),
            t.addComponent(this, this.renderer),
            this.bindings.push(
              t.commandBinder.addBinding(c, async (e) => this.togglePuckEditing(e.enabled)),
              t.subscribe(d.Z, (e) => this.handlePuckClickedMessage(e.sweepId)),
              t.subscribe(E.Z, this.handlePuckHoverMessage),
              (0, M.k1)(
                () => n.addVisibilityRule(this.cursorVisibilityRule),
                () => n.removeVisibilityRule(this.cursorVisibilityRule),
              ),
            ),
            this.selectionBindings.push(
              s.registerMeshHandler(m.er, a.s.isType(h.Y), this.onPointerOnPuck),
              s.registerHandler(m.mE, () => {
                this.unselectingSweep = null;
              }),
            ),
            (this.selectionHandled = this.toggleHandlers(
              !1,
              this.selectionBindings,
              this.selectionHandled,
            )),
            (this.selectionSub = this.sweepViewData.onSelectedSweepChanged(
              this.handleSweepSelectionChange,
            )),
            this.selectionSub.cancel(),
            this.unselectionBindings.push(
              s.registerPriorityHandler(g.Rd, r.S, () => !0),
              s.registerPriorityHandler(m.er, r.S, this.onUnselectPuck),
              s.registerPriorityHandler(m.er, o.i, this.onUnselectPuck),
            ),
            (this.unselectionHandled = this.toggleHandlers(
              !1,
              this.unselectionBindings,
              this.unselectionHandled,
            ));
        }
        dispose(e) {
          for (const e of this.bindings) e.cancel();
          (this.bindings = []), this.togglePuckEditing(!1), super.dispose(e);
        }
        updatePuckImagery(e = {}) {
          const t = Object.assign(Object.assign({}, R), e);
          t.disabled && !t.disabledHover && (t.disabledHover = t.disabled),
            this.renderer.updatePuckImagery(t);
        }
        updateCheckRenderModes(e) {
          this.renderer.updateCheckRenderModes(e || this.defaultCheckRenderModes);
        }
        updateHighlightOnSelectedPuck(e) {
          const t = this.selectedSweep;
          if (t) {
            if (!this.sweepViewData.isSweepAligned(t)) return;
            const i = this.viewmode === b.Ey.Dollhouse || this.viewmode === b.Ey.Floorplan;
            this.renderer.renderPuckHighlight(t, this.editingEnabled && i && e);
          }
        }
        togglePuckEditing(e) {
          (this.editingEnabled = e),
            (this.selectedSweep = this.sweepViewData.selectedSweep),
            this.updateViewmode(),
            this.renderer.toggleEditingEnabled(e),
            e
              ? (this.engine.subscribe(u.Z, this.updateViewmode), this.selectionSub.renew())
              : (this.engine.unsubscribe(u.Z, this.updateViewmode), this.selectionSub.cancel());
        }
        canUnselectPuck() {
          const e = this.viewmode === b.Ey.Dollhouse || this.viewmode === b.Ey.Floorplan;
          return this.editingEnabled && !!this.selectedSweep && e;
        }
        canSelectPuck() {
          const e = this.viewmode === b.Ey.Dollhouse || this.viewmode === b.Ey.Floorplan;
          return this.editingEnabled && e;
        }
        toggleHandlers(e, t, i) {
          if (e !== i) for (const i of t) e ? i.renew() : i.cancel();
          return e;
        }
      }
    },
    63631: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { FAST_FORWARD_FACTOR: () => ae, default: () => oe });
      var s = i(17785),
        n = i(90129),
        a = i(933),
        o = i(43017),
        r = i(7755),
        h = i(72392),
        d = i(18097),
        l = i(90512),
        c = i(90288),
        u = i(98375),
        p = i(59228),
        m = i(68720),
        g = i(24938),
        v = i(88288),
        f = i(64150),
        y = i(57793),
        w = i(43627),
        b = i(32197),
        D = i(25396),
        S = i(9263),
        I = i(78383),
        P = i(30629);
      class T {
        constructor(e = -1) {
          (this.active = !1),
            (this.type = P.Aq.Nop),
            (this.promise = Promise.resolve()),
            (this.stop = () => Promise.resolve()),
            (this.duration = 0),
            (this.started = -1),
            (this.stopped = -1),
            (this.toIndex = e);
        }
      }
      var E = i(28721);
      class M {
        constructor(e) {
          (this.type = P.Aq.Delay),
            (this.toIndex = -1),
            (this.started = -1),
            (this.stopped = -1),
            (this.duration = 0),
            (this.currentTransitionPromise = null),
            (this.cancelDelay = () => null),
            (this.duration = e);
        }
        get active() {
          return null !== this.currentTransitionPromise;
        }
        get promise() {
          return this.currentTransitionPromise ? this.currentTransitionPromise : Promise.resolve();
        }
        async stop() {
          this.currentTransitionPromise &&
            (this.cancelDelay(),
            (this.currentTransitionPromise = null),
            (this.stopped = Date.now()));
        }
        start(e, t) {
          if (this.active) throw Error('Transition already active');
          void 0 !== e.duration && (this.duration = e.duration);
          const i = (0, E.Ig)(this.duration);
          return (
            (this.cancelDelay = () => {
              i.cancel();
            }),
            (this.currentTransitionPromise = i.promise.then(() => this.stop())),
            (this.toIndex = t),
            (this.started = Date.now()),
            (this.stopped = -1),
            this
          );
        }
      }
      class C {
        constructor(e, t, i, s = !1) {
          (this.zoom = e),
            (this.stopZooming = t),
            (this.peekabooActive = s),
            (this.type = P.Aq.Zoom),
            (this.toIndex = -1),
            (this.started = -1),
            (this.stopped = -1),
            (this.duration = 0),
            (this.currentTransitionPromise = null),
            (this.onStopRequested = () => Promise.resolve()),
            (this.duration = i);
        }
        get active() {
          return null !== this.currentTransitionPromise;
        }
        get promise() {
          return this.currentTransitionPromise ? this.currentTransitionPromise : Promise.resolve();
        }
        async stop() {
          this.currentTransitionPromise &&
            (await this.onStopRequested(),
            await this.promise,
            (this.currentTransitionPromise = null),
            (this.stopped = Date.now()));
        }
        start(e, t) {
          if (this.active) throw Error('Transition already active');
          void 0 !== e.duration && (this.duration = e.duration);
          const i = this.peekabooActive ? -5 : -5e-4;
          return (
            (this.currentTransitionPromise = this.zoom(this.duration, i).then(() => {
              (this.currentTransitionPromise = null), (this.stopped = Date.now());
            })),
            (this.toIndex = t),
            (this.started = Date.now()),
            (this.stopped = -1),
            (this.onStopRequested = async () => {
              await this.stopZooming();
            }),
            this
          );
        }
      }
      var x = i(81396),
        R = i(3835),
        L = i(2897);
      class A {
        constructor(e, t, i) {
          (this.settingsData = e),
            (this.rotate = t),
            (this.stopRotating = i),
            (this.type = P.Aq.Burns),
            (this.toIndex = -1),
            (this.started = -1),
            (this.stopped = -1),
            (this.duration = 0),
            (this.currentTransitionPromise = null),
            (this.onStopRequested = () => Promise.resolve()),
            (this.getPanDirection = (e, t) => {
              let i = P.kw.Right;
              if (
                e &&
                e.metadata.scanId &&
                e.metadata.cameraQuaternion &&
                e.metadata.cameraPosition &&
                t &&
                t.metadata.scanId &&
                t.metadata.cameraPosition &&
                t.metadata.cameraQuaternion
              ) {
                const s = R.fU.FORWARD.clone().applyQuaternion(e.metadata.cameraQuaternion),
                  n = t.metadata.cameraPosition,
                  a = e.metadata.cameraPosition;
                let o = n.clone().sub(a).normalize();
                o.lengthSq() < L.Z.epsilon &&
                  (o = R.fU.FORWARD.clone().applyQuaternion(t.metadata.cameraQuaternion)),
                  s.cross(o).y > 0 && (i = P.kw.Left);
              }
              return i;
            });
        }
        get active() {
          return null !== this.currentTransitionPromise;
        }
        get promise() {
          return this.currentTransitionPromise ? this.currentTransitionPromise : Promise.resolve();
        }
        async stop() {
          this.currentTransitionPromise &&
            (await this.onStopRequested(),
            await this.promise,
            (this.currentTransitionPromise = null),
            (this.stopped = Date.now()));
        }
        start(e, t, i) {
          if (this.active) throw Error('Transition already active');
          if (!e) throw Error('Tour pan requires two snapshots');
          if (!e.snapshot || !e.nextSnapshot)
            return (
              (this.currentTransitionPromise = Promise.resolve()),
              (this.toIndex = t),
              (this.started = Date.now()),
              (this.stopped = Date.now()),
              this
            );
          const { deferred: s } = this.build(e.snapshot, e.nextSnapshot, e.panOverrides, i);
          return (
            (this.currentTransitionPromise = s.then(() => {
              (this.currentTransitionPromise = null), (this.stopped = Date.now());
            })),
            (this.toIndex = t),
            (this.started = Date.now()),
            (this.stopped = -1),
            this
          );
        }
        build(e, t, i, s) {
          const { panDirection: n, panAngle: a } = i,
            o = J.getPanValues(this.settingsData, !1, n, a);
          let r = o.direction;
          (void 0 !== r && r !== P.kw.Auto) || (r = this.getPanDirection(e, t)),
            (this.onStopRequested = async () => {
              await this.stopRotating();
            }),
            (this.duration = void 0 !== s ? s : o.ms);
          return { deferred: this.rotate(this.duration, new x.Vector2(r * o.radiansPerMs, 0)) };
        }
      }
      var F = i(86743),
        k = i(93827);
      const O = 0.001,
        V = (e, t, i, s) => {
          const n = Math.max(0.75, Math.min(e.distanceTo(t), 5)),
            a = n * (1 / s) * 1e3;
          let o = a;
          const r = i / a;
          if (r > O) {
            o += o * ((r - O) / O);
          }
          const h = Math.abs(
            e.clone().setX(0).setZ(0).distanceTo(t.clone().setX(0).setZ(0)) / Math.max(n, 1),
          );
          if (h > 0.1) {
            o *= 0.9 + 0.75 * h;
          }
          return o;
        };
      class B {
        constructor(e, t, i, s, n, a) {
          (this.settingsData = e),
            (this.cameraPose = t),
            (this.moveToSweep = i),
            (this.updateTransitionSpeed = s),
            (this.setRestrictedSweeps = n),
            (this.generators = a),
            (this.toIndex = -1),
            (this.started = -1),
            (this.stopped = -1),
            (this.duration = 0),
            (this.currentGenerator = null),
            (this.currentTransitionPromise = null),
            (this.type = P.Aq.Move);
        }
        get active() {
          return null !== this.currentTransitionPromise || null !== this.currentGenerator;
        }
        get promise() {
          return this.currentTransitionPromise ? this.currentTransitionPromise : Promise.resolve();
        }
        async stop() {
          this.currentTransitionPromise &&
            (await this.onStopRequested(),
            await this.promise,
            (this.currentTransitionPromise = null),
            (this.stopped = Date.now())),
            this.currentGenerator &&
              (this.generators.stopGenerator(this.currentGenerator),
              (this.currentGenerator = null));
        }
        start(e, t) {
          if (this.active) throw Error('Transition already active');
          const { generator: i, deferred: s } = this.build(e.path, e.orientations);
          return (
            this.generators.startGenerator(i),
            (this.currentGenerator = i),
            (this.currentTransitionPromise = s.nativePromise()),
            (this.toIndex = t),
            (this.started = Date.now()),
            (this.stopped = -1),
            this
          );
        }
        build(e, t) {
          const i = new k.Q(),
            n = this;
          let a = !1;
          return (
            (this.onStopRequested = async () => {
              (a = !0), await this.updateTransitionSpeed(ae);
            }),
            {
              generator: function* () {
                let o = 1;
                for (; o < e.length && !a; ) {
                  const i = o - 1,
                    a = e[o],
                    r = a.position,
                    h = e[i],
                    d = t[o],
                    l = (0, b.zW)(n.cameraPose.rotation, d),
                    u = J.getTransitionSpeed(n.settingsData),
                    p = V(h.position, r, l, u),
                    m = {
                      transitionType: c.nF.Interpolate,
                      sweepId: a.id,
                      rotation: d,
                      transitionTime: p,
                      easing: F.vG,
                    };
                  (n.duration = p), n.setRestrictedSweeps(e, i);
                  const g = n.moveToSweep(m);
                  yield new s.M8(g.nativePromise()), o++;
                }
                n.setRestrictedSweeps(null),
                  i.resolve(),
                  (n.currentTransitionPromise = null),
                  n.stop();
              },
              deferred: i,
            }
          );
        }
      }
      var N = i(60937);
      const G = new (i(53257).Z)('tours');
      class H {
        constructor(e, t, i, n, a, o, r, h, d) {
          (this.settingsData = e),
            (this.cameraPose = t),
            (this.cameraTransition = i),
            (this.sweepTransition = n),
            (this.sweepControl = a),
            (this.cameraControl = o),
            (this.generators = r),
            (this.setRestrictedSweeps = h),
            (this.getCurve = d),
            (this.type = P.Aq.Path),
            (this.toIndex = -1),
            (this.started = -1),
            (this.stopped = -1),
            (this.duration = 0),
            (this.currentTransitionGenerator = null),
            (this.currentTransitionPromise = null),
            (this.canceling = !1),
            (this.buildTransition = (e, t) => {
              if (e.length <= 2)
                throw (
                  (G.debug(`invalid path: ${e}`),
                  new Error('smooth path requires more than 2 stops'))
                );
              const i = this,
                n = new k.Q();
              i.setRestrictedSweeps(e);
              const a = e.map((e) => e.position),
                o = i.getCurve(a),
                r = F.vG,
                h = F.Fs,
                d = F.to,
                l = J.getTransitionSpeed(i.settingsData);
              (this.duration = ((e, t, i) => {
                let s = 0;
                for (let n = 0; n < e.length - 1; n++) {
                  const a = (0, b.zW)(t[n], t[n + 1]);
                  s += V(e[n].position, e[n + 1].position, a, i);
                }
                return s;
              })(e, t, l)),
                G.debug(`path duration: ${this.duration.toFixed(0)}ms, at speed: ${l}m/s`),
                i.cameraControl.beginExternalTransition();
              return {
                generator: function* () {
                  n.notify(0);
                  const a = new x.Vector3(),
                    u = new x.Quaternion();
                  let p = 0,
                    m = 0,
                    g = 0,
                    v = 1,
                    f = e[v].id;
                  yield new s.M8(
                    i.sweepControl.activateSweepUnsafe({ sweepId: f }).then(() => {
                      i.sweepControl.beginSweepTransition({
                        sweepId: f,
                        transitionTime: i.duration,
                        internalProgress: !1,
                      });
                    }),
                  ),
                    e.length > 2 && i.sweepControl.activateSweepUnsafe({ sweepId: e[2].id });
                  let y = i.cameraPose.rotation.clone();
                  for (; p < i.duration && !i.canceling; ) {
                    const l = p / i.duration;
                    g > 0 && (y = t[g].clone());
                    const c = t[v],
                      w = o.normalSourceDistances[g],
                      D = o.normalSourceDistances[v],
                      S = e[v];
                    if (((m = (0, b.et)(l, w, D, 0, 1)), m <= 1)) {
                      const e = d(m, 0, 1, 1);
                      i.sweepTransition.progress.modifyAnimation(e, 1, 0);
                      const t = h(m, 0, 1, 1);
                      u.copy(y).slerp(c, t);
                    }
                    l < 1 && a.copy(o.curve.getPointAt(r(l, 0, 1, 1))),
                      i.cameraControl.updateCameraPosition(a),
                      i.cameraControl.updateCameraRotation(u),
                      l >= D &&
                        (i.sweepControl.endSweepTransition({ sweepId: S.id }),
                        g++,
                        v++,
                        (f = e[g + 1].id),
                        yield new s.M8(
                          i.sweepControl.activateSweepUnsafe({ sweepId: f }).then(() => {
                            i.sweepControl.beginSweepTransition({
                              sweepId: f,
                              transitionTime: i.duration,
                              internalProgress: !1,
                            });
                          }),
                        ),
                        e.length > g + 2 &&
                          i.sweepControl.activateSweepUnsafe({ sweepId: e[g + 2].id })),
                      n.notify(l),
                      (p = Date.now() - i.cameraTransition.startTime),
                      yield new s.Jj();
                  }
                  if ((i.cameraControl.endExternalTransition(), i.canceling)) {
                    i.canceling = !1;
                    const t = e[v].position,
                      n = V(i.cameraPose.position, t, 0, l),
                      a = i.cameraControl.moveTo({
                        transitionTime: n / ae,
                        transitionType: c.nF.Interpolate,
                        pose: { position: t },
                      });
                    a.progress((e) => {
                      const t = (0, b.et)(e, 0, 1, m, 1);
                      i.sweepTransition.progress.modifyAnimation(t, 1, 0);
                    }),
                      yield new s.M8(a.nativePromise());
                  }
                  i.sweepControl.endSweepTransition({ sweepId: f }),
                    i.setRestrictedSweeps(null),
                    n.notify(1),
                    n.resolve();
                },
                deferred: n,
              };
            });
        }
        get active() {
          return null !== this.currentTransitionPromise || null !== this.currentTransitionGenerator;
        }
        get promise() {
          return this.currentTransitionPromise ? this.currentTransitionPromise : Promise.resolve();
        }
        async stop() {
          (this.canceling = !0),
            this.currentTransitionPromise &&
              (await this.promise,
              (this.currentTransitionPromise = null),
              (this.stopped = Date.now())),
            this.currentTransitionGenerator &&
              (this.generators.stopGenerator(this.currentTransitionGenerator),
              (this.currentTransitionGenerator = null));
        }
        start(e, t) {
          if ((G.debug(`starting smooth transition with ${e.path.length - 1} stops`), this.active))
            throw Error('Transition already active');
          this.canceling = !1;
          const { generator: i, deferred: s } = this.buildTransition(e.path, e.orientations);
          return (
            this.generators.startGenerator(i),
            (this.currentTransitionGenerator = i),
            (this.currentTransitionPromise = s.nativePromise().then(() => {
              (this.currentTransitionPromise = null),
                (this.currentTransitionGenerator = null),
                (this.stopped = Date.now());
            })),
            (this.toIndex = t),
            (this.started = Date.now()),
            (this.stopped = -1),
            this
          );
        }
      }
      var _ = i(31740),
        U = i(59452);
      class W {
        constructor(e, t, i, s, n, a, o, r) {
          (this.settingsData = e),
            (this.cameraPose = t),
            (this.viewmodeData = i),
            (this.cameraControl = s),
            (this.sweepControl = n),
            (this.switchToMode = a),
            (this.setRestrictedSweeps = o),
            (this.generators = r),
            (this.toIndex = -1),
            (this.started = -1),
            (this.stopped = -1),
            (this.duration = 0),
            (this.type = P.Aq.Move),
            (this.currentTransitionPromise = null),
            (this.onStopRequested = () => Promise.resolve());
        }
        get active() {
          return null !== this.currentTransitionPromise;
        }
        get promise() {
          return this.currentTransitionPromise ? this.currentTransitionPromise : Promise.resolve();
        }
        async stop() {
          this.currentTransitionPromise &&
            (await this.onStopRequested(),
            await this.promise,
            (this.currentTransitionPromise = null),
            (this.stopped = Date.now()));
        }
        start(e, t) {
          if (this.active) throw Error('Transition already active');
          if (!e.snapshot) return (this.currentTransitionPromise = Promise.resolve()), this;
          const { deferred: i } = this.build(e.snapshot, e.currentSweep, e.transitionType);
          return (
            (this.currentTransitionPromise = i.then(() => {
              (this.currentTransitionPromise = null), (this.stopped = Date.now());
            })),
            (this.toIndex = t),
            (this.started = Date.now()),
            (this.stopped = -1),
            this
          );
        }
        build(e, t, i) {
          let s = Promise.resolve();
          const n = e.metadata.cameraMode,
            a = e.metadata.cameraQuaternion;
          let r;
          e.metadata.scanId && (r = this.sweepControl.getSweepOnView(e.metadata.scanId).id);
          const h = this.cameraPose.rotation,
            d = (0, b.zW)(h, a),
            l = e.metadata.cameraPosition,
            c = !e.is360,
            u = { position: l, rotation: a, sweepID: r, zoom: e.metadata.orthoZoom };
          let p;
          const m = this.settingsData.tryGetProperty(U.eC, !1),
            g = this.viewmodeData.isDollhouse() && !this.cameraPose.isPitchFactorOrtho.value,
            v = this.viewmodeData.isFloorplan() || this.cameraPose.isPitchFactorOrtho.value,
            f = n === o.Ey.Floorplan,
            y = n === o.Ey.Dollhouse,
            w = m && ((y && !g) || (f && !v));
          if (n !== this.viewmodeData.currentMode || w)
            (p = J.getOtherModeTransitionTime(this.settingsData, d, i)),
              (s = this.switchToMode(n, i, u, p));
          else {
            if (!!r && this.viewmodeData.isInside()) {
              const e = !t || r !== t;
              r && e
                ? ((p = J.getTransitionTime(this.settingsData)),
                  (s = this.standardTransitionSweepMovePromise(u, r, c, p)))
                : ((p = J.getSamePanoTransitionTime(this.settingsData, d)),
                  (s = this.standardTransitionSameSweepRotationPromise(u, d, p)));
            } else
              (p = J.getOtherModeTransitionTime(this.settingsData, d, i)),
                (s = this.cameraControl
                  .moveTo({ transitionType: i, pose: u, transitionTime: p })
                  .nativePromise());
          }
          return (this.duration = null != p ? p : 0), { deferred: s };
        }
        standardTransitionSameSweepRotationPromise(e, t, i) {
          if (!e.rotation) throw Error('Rotation transition requires a rotation');
          return t < 0.01
            ? Promise.resolve()
            : (this.setRestrictedSweeps(null),
              this.cameraControl
                .moveTo({
                  transitionType: c.nF.Interpolate,
                  pose: { rotation: e.rotation },
                  transitionTime: i,
                })
                .nativePromise());
        }
        standardTransitionSweepMovePromise(e, t, i, n) {
          if (!e.position) throw Error('Push transition requires a position');
          const a = e.position.clone().sub(this.cameraPose.position).normalize(),
            o = this.cameraPose.position.clone().add(a.multiplyScalar(0.15)),
            r = new k.Q();
          this.setRestrictedSweeps(null);
          const h = this;
          return (
            this.generators.startGenerator(function* () {
              yield new s.M8(h.sweepControl.activateSweepUnsafe({ sweepId: t }));
              const a = new x.Vector3(),
                d = h.cameraPose.position.clone(),
                l = Date.now();
              let u,
                p = 0,
                m = !1,
                g = !1;
              for (; p < n; ) {
                const r = (0, F.FG)(p, 0, p / n, n);
                i && h.cameraControl.updateCameraPosition(a.copy(d).lerp(o, r)),
                  r >= 0.3 &&
                    !g &&
                    ((u = h.cameraControl
                      .moveTo({
                        transitionType: c.nF.FadeToBlack,
                        pose: e,
                        transitionTime: n,
                        blackoutTime: 0.5 * n,
                      })
                      .progress((e) => {
                        e >= 0.5 && !m && (h.sweepControl.instantSweepTransition(t), (m = !0));
                      })),
                    (g = !0)),
                  yield new s.Jj(),
                  (p = Date.now() - l);
              }
              u && (yield new s.M8(u.nativePromise())), r.resolve();
            }),
            r.nativePromise()
          );
        }
      }
      class z {
        constructor(e, t, i, s) {
          (this.moveToSweep = e),
            (this.viewmodeData = t),
            (this.cameraControl = i),
            (this.switchToMode = s),
            (this.toIndex = -1),
            (this.started = -1),
            (this.stopped = -1),
            (this.duration = 0),
            (this.type = P.Aq.Move),
            (this.currentTransitionPromise = null),
            (this.onStopRequested = () => Promise.resolve());
        }
        get active() {
          return null !== this.currentTransitionPromise;
        }
        get promise() {
          return this.currentTransitionPromise ? this.currentTransitionPromise : Promise.resolve();
        }
        async stop() {
          this.currentTransitionPromise &&
            (await this.onStopRequested(),
            await this.promise,
            (this.currentTransitionPromise = null),
            (this.stopped = Date.now()));
        }
        start(e, t) {
          if (this.active) throw Error('Transition already active');
          if (!e.snapshot)
            return (
              (this.currentTransitionPromise = Promise.resolve()),
              (this.started = Date.now()),
              (this.stopped = Date.now()),
              this
            );
          const { deferred: i } = this.build(e.snapshot, e.currentSweep);
          return (
            (this.currentTransitionPromise = i.then(() => {
              (this.currentTransitionPromise = null), (this.stopped = Date.now());
            })),
            (this.toIndex = t),
            (this.started = Date.now()),
            (this.stopped = -1),
            this
          );
        }
        build(e, t) {
          let i = Promise.resolve();
          const s = e.metadata.cameraMode,
            n = e.metadata.cameraQuaternion,
            a = e.metadata.scanId,
            o = {
              position: e.metadata.cameraPosition,
              rotation: n,
              sweepID: a,
              zoom: e.metadata.orthoZoom,
            },
            r = s !== this.viewmodeData.currentMode,
            h = !!a && this.viewmodeData.isInside();
          if (r) i = this.switchToMode(s, c.nF.Instant, o);
          else if (h) {
            const e = { transitionType: c.nF.Instant, sweepId: a, rotation: n };
            i = this.moveToSweep(e).nativePromise();
          } else
            i = this.cameraControl
              .moveTo({ transitionType: c.nF.Instant, pose: o })
              .nativePromise();
          return { deferred: i };
        }
      }
      var j = i(58340),
        $ = i(29765);
      class q {
        constructor(e, t) {
          (this.issueCommand = e),
            (this.currentFloorId = t),
            (this.type = P.Aq.FloorChange),
            (this.toIndex = -1),
            (this.started = -1),
            (this.stopped = -1),
            (this.duration = j.cw),
            (this.currentTransitionPromise = null),
            (this.onStopRequested = () => Promise.resolve());
        }
        get active() {
          return null !== this.currentTransitionPromise;
        }
        get promise() {
          return this.currentTransitionPromise ? this.currentTransitionPromise : Promise.resolve();
        }
        async stop() {
          this.currentTransitionPromise &&
            (await this.onStopRequested(),
            await this.promise,
            (this.currentTransitionPromise = null),
            (this.stopped = Date.now()));
        }
        start(e, t) {
          if (this.active) throw Error('Transition already active');
          let i = Promise.resolve();
          const s = e.targetSnapshot.metadata.floorId,
            n = s !== this.currentFloorId(),
            a = e.targetSnapshot.metadata.cameraMode;
          return (
            !(0, o.Bw)(a) &&
              a !== o.Ey.Outdoor &&
              n &&
              (i = this.issueCommand(new $.Vw(s, !0, this.duration))),
            (this.currentTransitionPromise = i.then(() => {
              (this.currentTransitionPromise = null), (this.stopped = Date.now());
            })),
            (this.toIndex = t),
            (this.started = Date.now()),
            (this.stopped = -1),
            this
          );
        }
      }
      class Z {
        constructor(e, t, i) {
          (this.settingsData = e),
            (this.rotate = t),
            (this.stopRotating = i),
            (this.type = P.Aq.Burns),
            (this.toIndex = -1),
            (this.started = -1),
            (this.stopped = -1),
            (this.duration = 0),
            (this.currentTransitionPromise = null),
            (this.onStopRequested = () => Promise.resolve());
        }
        get active() {
          return null !== this.currentTransitionPromise;
        }
        get promise() {
          return this.currentTransitionPromise ? this.currentTransitionPromise : Promise.resolve();
        }
        async stop() {
          this.currentTransitionPromise &&
            (await this.onStopRequested(),
            await this.promise,
            (this.currentTransitionPromise = null),
            (this.stopped = Date.now()));
        }
        start(e, t, i) {
          if (this.active) throw Error('Transition already active');
          if (!e.snapshot || !e.nextSnapshot)
            return (this.currentTransitionPromise = Promise.resolve()), this;
          const { deferred: s } = this.build(e.snapshot, e.nextSnapshot, e.panOverrides, i);
          return (
            (this.currentTransitionPromise = s.then(() => {
              (this.currentTransitionPromise = null), (this.stopped = Date.now());
            })),
            (this.toIndex = t),
            (this.started = Date.now()),
            (this.stopped = -1),
            this
          );
        }
        build(e, t, i, s) {
          const { panDirection: n, panAngle: a } = i,
            o = J.getPanValues(this.settingsData, !0, n, a);
          let r = -1 * o.radiansPerMs;
          this.duration = void 0 !== s ? s : o.ms;
          const h = o.direction;
          if (void 0 !== h && h !== P.kw.Auto) r *= h;
          else if (e && e.metadata.cameraQuaternion && t && t.metadata.cameraQuaternion) {
            const i = R.fU.FORWARD.clone().applyQuaternion(e.metadata.cameraQuaternion),
              s = R.fU.FORWARD.clone().applyQuaternion(t.metadata.cameraQuaternion),
              n = Math.sign(i.cross(s).y);
            r = 0 !== n ? r * n : r;
          }
          this.onStopRequested = async () => {
            await this.stopRotating();
          };
          return { deferred: this.rotate(this.duration, new x.Vector2(r, 0)) };
        }
      }
      class Y {
        constructor(e, t, i, s, n) {
          (this.settingsData = e),
            (this.cameraPose = t),
            (this.rotate = i),
            (this.stopRotating = s),
            (this.getCurve = n),
            (this.type = P.Aq.Burns),
            (this.toIndex = -1),
            (this.started = -1),
            (this.stopped = -1),
            (this.duration = 0),
            (this.currentTransitionPromise = null),
            (this.onStopRequested = () => Promise.resolve());
        }
        get active() {
          return null !== this.currentTransitionPromise;
        }
        get promise() {
          return this.currentTransitionPromise ? this.currentTransitionPromise : Promise.resolve();
        }
        async stop() {
          this.currentTransitionPromise &&
            (await this.onStopRequested(),
            await this.promise,
            (this.currentTransitionPromise = null),
            (this.stopped = Date.now()));
        }
        start(e, t, i) {
          if (this.active) throw Error('Transition already active');
          const { deferred: s } = this.build(e.path, e.snapshot, e.nextSnapshot, e.panOverrides, i);
          return (
            (this.currentTransitionPromise = s.then(() => {
              (this.currentTransitionPromise = null), (this.stopped = Date.now());
            })),
            (this.toIndex = t),
            (this.started = Date.now()),
            (this.stopped = -1),
            this
          );
        }
        build(e, t, i, s, n) {
          this.onStopRequested = async () => {
            await this.stopRotating();
          };
          const { panDirection: a, panAngle: r } = s,
            h = J.getPanValues(this.settingsData, !1, a, r),
            d = h.direction;
          let l = h.radiansPerMs;
          if (void 0 !== d && d !== P.kw.Auto) l *= d;
          else if (e) {
            const t = this.cameraPose.position.clone().setY(0),
              i = e.map((e) => e.position),
              s = this.getCurve(i).curve.getPointAt(0.1).setY(0).clone().sub(t).normalize(),
              n = R.fU.FORWARD.clone().applyQuaternion(this.cameraPose.rotation),
              a = Math.sign(n.cross(s).y);
            l = 0 !== a ? l * a : l;
          } else if (i && t) {
            if (
              (!(0, o.Bw)(t.metadata.cameraMode) && (l = -l),
              t.metadata.scanId === i.metadata.scanId)
            ) {
              const e = R.fU.FORWARD.clone().applyQuaternion(this.cameraPose.rotation),
                t = R.fU.FORWARD.clone().applyQuaternion(i.metadata.cameraQuaternion),
                s = Math.sign(e.cross(t).y);
              l = 0 !== s ? l * s : l;
            }
          }
          const c = i && !(0, o.Bw)(i.metadata.cameraMode);
          this.duration = void 0 !== n ? n : h.ms;
          return { deferred: this.rotate(this.duration, new x.Vector2(l, 0), !c) };
        }
      }
      const X = {
        sharpTurnDotThreshold: 0.65,
        directionWeightFactorStd: 0.75,
        directionWeightFactorSharp: 0.2,
        positionalWeightFactorStd: 0.4,
        positionalWeightFactorSharp: 0.2,
        finalWalkingNodeDirectionWeight: 5,
        lookAheadNodes: 3,
      };
      class K {
        constructor(e = X) {
          this.settings = e;
        }
        getOrientationsForPath(e, t) {
          const i = [];
          for (let s = 0; s < e.length; s++) {
            const n = new x.Vector3();
            this.getLookVectorsForPathNode(e, s, t, n);
            const a = new x.Matrix4().lookAt(e[s], n, R.fU.UP);
            i[s] = new x.Quaternion().setFromRotationMatrix(a);
          }
          return i.push(t), i;
        }
        getLookVectorsForPathNode(e, t, i, s) {
          const n = new x.Vector3(),
            a = new x.Vector3(),
            o = new x.Vector3(),
            r = new x.Vector3(),
            h = e.length;
          if (t >= h) return !1;
          let d = 1,
            l = 1;
          const c = new x.Vector3();
          let u;
          for (let s = t; s < t + this.settings.lookAheadNodes && s < h; s++) {
            if (
              ((u = e[s]), this.getOrientationForPathNode(e, s, i, o), s === t && n.copy(o), s > t)
            ) {
              const e = n.dot(o) < this.settings.sharpTurnDotThreshold;
              (d *= e
                ? this.settings.directionWeightFactorSharp
                : this.settings.directionWeightFactorStd),
                (l *= e
                  ? this.settings.positionalWeightFactorSharp
                  : this.settings.positionalWeightFactorStd);
            }
            s === h - 1 && ((d = this.settings.finalWalkingNodeDirectionWeight), (l = 1)),
              c.copy(o),
              o.multiplyScalar(d),
              a.add(o),
              r.lerp(u, l);
          }
          return a.normalize(), s.copy(r), s.add(a), !0;
        }
        getOrientationForPathNode(e, t, i, s) {
          if (t >= e.length) return !1;
          if (t === e.length - 1) s.copy(R.fU.FORWARD).applyQuaternion(i);
          else {
            const i = e[t],
              n = e[t + 1];
            s.copy(n).sub(i);
          }
          return s.normalize(), !0;
        }
      }
      var Q = i(4763);
      class J {
        constructor(e, t, i, s, a) {
          (this.engine = e),
            (this.tourData = t),
            (this.cameraData = i),
            (this.settingsData = s),
            (this.viewmodeData = a),
            (this.init = async () => {
              (this.sweepModule = await this.engine.getModuleBySymbol(Q.l)),
                (this.sweepData = await this.engine.market.waitForData(_.Z)),
                (this.cameraModule = await this.engine.getModuleBySymbol(Q.kg)),
                (this.pathModule = await this.engine.getModuleBySymbol(Q.An)),
                (this.floorsViewData = await this.engine.market.waitForData(N.c)),
                (this.commonControlsModule = await this.engine.getModuleBySymbol(Q.Ng)),
                (this.viewmodeModule = await this.engine.getModuleBySymbol(Q.XT)),
                (this.pathOrientHelper = new K()),
                (this.setRestrictedSweeps = this.pathModule.setRestrictedSweeps.bind(
                  this.pathModule,
                )),
                (this.getCurveForPath = this.pathModule.getCurveForPath.bind(this.pathModule)),
                (this.moveToSweep = this.sweepModule.moveToSweep.bind(this.sweepModule)),
                (this.updateTransitionSpeed = this.cameraModule.updateTransitionSpeed.bind(
                  this.cameraModule,
                )),
                (this.switchToMode = this.viewmodeModule.switchToMode.bind(this.viewmodeModule)),
                (this.startRotateTransition = this.commonControlsModule.startRotateTransition.bind(
                  this.commonControlsModule,
                )),
                (this.stopCamera = this.commonControlsModule.stop.bind(this.commonControlsModule)),
                (this.startZoomTransition = this.commonControlsModule.startZoomTransition.bind(
                  this.commonControlsModule,
                )),
                (this.issueCommand = this.engine.commandBinder.issueCommand.bind(
                  this.engine.commandBinder,
                ));
            }),
            (this.getValidWalkingPath = (e) => {
              let t;
              e.metadata.scanId && (t = this.sweepModule.getSweepOnView(e.metadata.scanId).id);
              const i = this.sweepData.currentSweep,
                s = this.tourData.getTourCurrentSnapshotIndex();
              let a = null;
              if (s >= 0) {
                const e = this.tourData.getTourSnapshotSid(s);
                a = this.tourData.getSnapshot(e);
              }
              if (
                this.viewmodeData.currentMode !== o.Ey.Panorama ||
                !i ||
                !t ||
                t === i ||
                e.is360 ||
                !a ||
                a.is360
              )
                return null;
              const r =
                this.pathModule.findShortestPath(
                  i,
                  t,
                  n.Xd.walkingTourIncludeExtraPanosDistance,
                  n.Xd.walkingStageMinimumDistance,
                  n.Xd.maxWalkingSweepsBetweenSnapshots,
                ) || [];
              return 0 === r.length ? null : r;
            });
        }
        static isDelayTransition(e, t, i) {
          return !(0, n.dF)(e) || (t !== P.BZ.Zoom && 0 === J.getPanDegrees(e, i.panAngle));
        }
        static getTourBurnsStyle(e, t, i) {
          return J.isDelayTransition(e, t, i) ? P.BZ.Delay : t;
        }
        static getPanDegrees(e, t) {
          let i;
          return (
            (i = (0, n.dF)(e)
              ? -1 !== e.getOverrideParam(n.xs, -1)
                ? (0, n.y)(e)
                : void 0 !== t
                  ? t
                  : e.tryGetProperty(S.gx.PanAngle, n.BA)
              : 0),
            Math.max(i, 0)
          );
        }
        static getPanDirection(e, t) {
          return void 0 !== t ? t : e.tryGetProperty(S.gx.PanDirection, D.y6);
        }
        static getDelayDuration(e) {
          return -1 !== e.getOverrideParam(n.lY, -1) || 0 === e.getOverrideParam(n._c, -1)
            ? (0, n.g_)(e)
            : n.mS;
        }
        static getZoomDuration(e) {
          return -1 !== e.getOverrideParam(n.lY, -1)
            ? (0, n.g_)(e)
            : e.tryGetProperty(S.gx.ZoomDuration, n.i7);
        }
        static getPanRadiansPerMs(e, t, i) {
          if (-1 !== e.getOverrideParam(n.lY, -1)) {
            const t = (0, n.g_)(e);
            return t > 0 ? i / t : 0;
          }
          const s = t
            ? e.tryGetProperty(S.gx.DollhousePanSpeed, n.su)
            : e.tryGetProperty(S.gx.PanSpeed, n.pn);
          return (0, I.DA)(s);
        }
        static getPanValues(e, t, i, s) {
          const a = J.getPanDirection(e, i),
            o = J.getPanDegrees(e, s),
            r = (0, w.Id)(o),
            h = J.getPanRadiansPerMs(e, t, r);
          let d = h > 0 ? r / h : 0;
          return (
            t && void 0 === s && (d = (0, n.g_)(e)),
            { degrees: o, radiansPerMs: h, ms: d, direction: a }
          );
        }
        static getTransitionSpeed(e) {
          if (-1 !== e.getOverrideParam('wts', -1)) return e.tryGetProperty(n.EU, n.Im);
          const t = e.tryGetProperty(S.gx.TransitionSpeed, n.Mk);
          return (0, I.mf)(t / 1e3);
        }
        static getTransitionTime(e) {
          const t = e.tryGetProperty(S.gx.TransitionTime, n.mL);
          return Math.min(Math.max(n.eu, t), n.NY);
        }
        static getOtherModeTransitionTime(e, t, i) {
          if (i === c.nF.FadeToBlack) {
            return J.getTransitionTime(e) + n.HJ;
          }
          let s = n.Cp,
            a = n.f7;
          if (-1 === e.getOverrideParam('wts', -1)) {
            const t = 1e3 * J.getTransitionSpeed(e);
            (s = Math.sqrt(2 * (t - n.Pv)) + 45), t !== n.Mk && (a = n._D);
          }
          const o = (1e3 * t) / (w.Ue * s);
          return Math.max(o, a);
        }
        static getSamePanoTransitionTime(e, t) {
          const i = e.tryGetProperty(S.gx.PanSpeed, n.pn);
          if (i === n.pn) return Math.max((1e3 * t) / (w.Ue * n.O2), n.gS);
          {
            const e = (0, b.dS)(i, n.z$, n.b_, n.rM, n.z8),
              s = (0, I.DA)(e);
            return s > 0 ? t / s : 0;
          }
        }
        getFloorTransition(e) {
          const t = this.tourData.getTourSnapshotSid(e),
            i = this.tourData.getSnapshot(t);
          if (!i) {
            return new T(e);
          }
          return new q(this.issueCommand, () => this.floorsViewData.currentFloorId).start(
            { targetSnapshot: i },
            e,
          );
        }
        getMainTransition(e, t) {
          const i = this.tourData.getTourSnapshotSid(e),
            s = this.tourData.getSnapshot(i);
          if (!s) {
            return new T(e);
          }
          let n = null;
          if (t === c.nF.Interpolate) {
            const t = s.metadata.cameraQuaternion,
              i = this.getValidWalkingPath(s);
            if (i) {
              const s = i.map((e) => e.position),
                a = this.pathOrientHelper.getOrientationsForPath(s, (0, b.Z)(t));
              n =
                i.length > 2
                  ? new H(
                      this.settingsData,
                      this.cameraData.pose,
                      this.cameraData.transition,
                      this.sweepData.transition,
                      this.sweepModule,
                      this.cameraModule,
                      this.engine,
                      this.setRestrictedSweeps,
                      this.getCurveForPath,
                    ).start({ path: i, orientations: a }, e)
                  : new B(
                      this.settingsData,
                      this.cameraData.pose,
                      this.moveToSweep,
                      this.updateTransitionSpeed,
                      this.setRestrictedSweeps,
                      this.engine,
                    ).start({ path: i, orientations: a }, e);
            }
          } else if (t === c.nF.Instant) {
            const t = this.sweepData.currentSweep;
            n = new z(
              this.moveToSweep,
              this.viewmodeData,
              this.cameraModule,
              this.switchToMode,
            ).start({ snapshot: s, currentSweep: t }, e);
          }
          if (!n) {
            const i = this.sweepData.currentSweep;
            n = new W(
              this.settingsData,
              this.cameraData.pose,
              this.viewmodeData,
              this.cameraModule,
              this.sweepModule,
              this.switchToMode,
              this.setRestrictedSweeps,
              this.engine,
            ).start({ snapshot: s, currentSweep: i, transitionType: t }, e);
          }
          return n;
        }
        getBurnsTransition(e, t, i) {
          const s = this.tourData.getTourSnapshotSid(e),
            n = (e + 1) % this.tourData.getSnapshotCount(),
            a = this.tourData.getTourSnapshotSid(n),
            o = this.tourData.getTourStop(s),
            r = {};
          o.reelEntry &&
            o.reelEntry.overrides &&
            ((r.panDirection = o.reelEntry.overrides.panDirection),
            (r.panAngle = o.reelEntry.overrides.panAngle));
          const h = this.tourData.getSnapshot(a);
          let d = new T(e);
          switch (t) {
            case P.BZ.Pan:
              if (h) {
                const t = this.getValidWalkingPath(h);
                d = new Y(
                  this.settingsData,
                  this.cameraData.pose,
                  this.startRotateTransition,
                  this.stopCamera,
                  this.getCurveForPath,
                ).start({ path: t, snapshot: o.snapshot, nextSnapshot: h, panOverrides: r }, e, i);
              }
              d.type === P.Aq.Nop &&
                (d = new A(this.settingsData, this.startRotateTransition, this.stopCamera).start(
                  { snapshot: o.snapshot, nextSnapshot: h, panOverrides: r },
                  e,
                  i,
                ));
              break;
            case P.BZ.PanDollhouse:
              d = new Z(this.settingsData, this.startRotateTransition, this.stopCamera).start(
                { snapshot: o.snapshot, nextSnapshot: h, panOverrides: r },
                e,
                i,
              );
              break;
            case P.BZ.Zoom:
              d = new C(
                this.startZoomTransition,
                this.stopCamera,
                J.getZoomDuration(this.settingsData),
                this.settingsData.tryGetProperty(U.eC, !1),
              ).start({ duration: i }, e);
              break;
            case P.BZ.Delay:
              const t = J.getDelayDuration(this.settingsData);
              d = new M(t).start({ duration: i }, e);
              break;
            case P.BZ.None:
              d = new T(e);
              break;
            default:
              throw Error('unhandled TourBurnsStyle');
          }
          return d;
        }
      }
      var ee = i(39060),
        te = i(61647),
        ie = i(11093),
        se = i(44209),
        ne = i(22925);
      const ae = 5;
      class oe extends a.Y {
        constructor() {
          super(...arguments),
            (this.name = 'tours-controls'),
            (this.getBurnsStyleForSnapshot = (e, t) => {
              const i = this.data,
                s = i.getTourSnapshotSid(e),
                n = i.getTourStop(s),
                a = i.getSnapshotCount();
              if (!n || !n.snapshot) return P.BZ.None;
              if (e === a - 1 && this.isLastStopStatic(t))
                return this.toursViewData.getTourStoryMode() ? P.BZ.Delay : P.BZ.None;
              const r = n.snapshot.metadata.cameraMode,
                h =
                  r === o.Ey.Dollhouse
                    ? P.BZ.PanDollhouse
                    : r === o.Ey.Floorplan
                      ? P.BZ.Zoom
                      : P.BZ.Pan;
              return J.getTourBurnsStyle(this.settingsData, h, t);
            }),
            (this.canChangeTourLocation = () => {
              const e = this.data.getTourState(),
                t = this.data.isTourTransitionActive(),
                i = this.cameraData.canTransition();
              return (
                e === r.Vs.Inactive &&
                !t &&
                !(this.viewmodeData.transition && this.viewmodeData.transition.active) &&
                i
              );
            });
        }
        async init(e, t) {
          (this.engine = t),
            ([
              this.cameraData,
              this.viewmodeData,
              this.settingsData,
              this.data,
              this.toursViewData,
            ] = await Promise.all([
              t.market.waitForData(y.M),
              t.market.waitForData(l.O),
              t.market.waitForData(f.e),
              t.market.waitForData(h.k),
              t.market.waitForData(d.T),
            ]));
          const i = await t.market.waitForData(ne.R);
          t.getModuleBySymbol(Q.PZ).then((e) => {
            e.registerHandler(p.er, () => {
              this.handleTourInputInterrupt();
            }),
              e.registerHandler(m.a, () => {
                this.handleTourInputInterrupt();
              });
          }),
            (this.transitionFactory = new J(
              t,
              this.data,
              this.cameraData,
              this.settingsData,
              this.viewmodeData,
            )),
            await this.transitionFactory.init(),
            this.setupAutoPlay(t),
            this.bindings.push(
              t.commandBinder.addBinding(te.TH, async (e) =>
                this.startTour(e.index, e.steps, e.loop),
              ),
            ),
            this.bindings.push(
              t.commandBinder.addBinding(te.vy, async (e) => this.stopTour(e.willResume)),
            ),
            this.bindings.push(
              t.commandBinder.addBinding(te.rU, async (e) =>
                this.tourGoTo(e.index, e.instant ? c.nF.Instant : void 0),
              ),
            ),
            this.bindings.push(
              t.commandBinder.addBinding(te.HW, async (e) =>
                e.forward ? this.tourGoNext(e.instant) : this.tourGoPrevious(e.instant),
              ),
            ),
            this.bindings.push(
              t.commandBinder.addBinding(te.r2, async (e) => {
                const t = this.data.tourPlaying;
                try {
                  t && (await this.stopTour(!0)),
                    await this.tourGoNext(!1),
                    t && (await this.startTour());
                } catch (e) {
                  this.log.debug(e);
                }
              }),
            ),
            this.bindings.push(
              t.commandBinder.addBinding(te.Ri, async (e) => {
                const t = this.data.tourPlaying;
                try {
                  t && (await this.stopTour(!0)),
                    await this.tourGoPrevious(!1),
                    t && (await this.startTour());
                } catch (e) {
                  this.log.debug(e);
                }
              }),
            ),
            this.bindings.push(i.onPropertyChanged('currentViewId', () => this.stopTour(!1)));
        }
        handleTourInputInterrupt() {
          this.data.getTourState() !== r.Vs.Inactive && this.stopTour();
        }
        canTourProceed(e, t, i) {
          const s = this.data.getSnapshotCount();
          if (0 === s || 0 === i || this.data.getTourState() !== r.Vs.Inactive) return !1;
          if (void 0 !== t) {
            if (t < -1) return !1;
            if (!0 !== e && t > s - 1) return !1;
          }
          return !0;
        }
        shouldTourContinue(e, t, i, s) {
          return void 0 !== s ? i < s : t < e - 1;
        }
        startTour(e, t, i) {
          if (!this.canChangeTourLocation())
            throw new ie.Y('Cannot start tour at this time, another transition is active');
          const n = void 0 !== i ? i : this.data.isLooping();
          if (!this.canTourProceed(n, e, t)) return;
          this.data.setLooping(n);
          const a = this.data.getActiveReelTourMode(),
            o = (0, se.Cf)(this.settingsData, a),
            h = this.data.getTourCurrentSnapshotIndex(),
            d = this.data.getSnapshotCount(),
            l = this.data.transition,
            c =
              h === d - 1 &&
              (P.c5.includes(l.type) || !o) &&
              l.toIndex === d - 1 &&
              l.stopped - l.started >= l.duration;
          let p,
            m = 0;
          p = void 0 !== e ? e - 1 : c ? -1 : Math.max(h - 1, -1);
          const g = this.settingsData.tryGetProperty(ee.YS, null);
          this.settingsData.setProperty(ee.YS, null);
          const v = this;
          (this.tourGenerator = function* () {
            for (; v.shouldTourContinue(d, p, m, t); ) {
              const e = p + 1,
                t = v.composeTourTransition(e);
              yield new s.M8(t), (p = e), p === d - 1 && n && (p = -1), m++;
            }
            v.stopTour(), v.settingsData.setProperty(ee.YS, g);
          }),
            this.engine.startGenerator(this.tourGenerator),
            this.data.setTourState(r.Vs.Active),
            (this.data.tourEnded = !1),
            (this.data.tourWillResume = !1),
            (this.data.tourPlaying = !0),
            this.data.commit(),
            this.engine.broadcast(new u.oR());
        }
        async composeTourTransition(e, t, i) {
          var s, a, h;
          const d = this.data.getTourSnapshotSid(e),
            l = this.data.getTourStop(d);
          if (!l.snapshot) throw Error(`Highlight not found for reel index ${e}`);
          const p = this.data.getTourCurrentSnapshotSid() === d,
            m = this.cameraData.transition.startTime > this.data.transition.stopped;
          let g = 0;
          const v = this.data.transition.duration;
          if (p) {
            const { started: e, stopped: t } = this.data.transition;
            (g = (t - e) / v || 0), (g = Math.min(1, g));
          }
          if (m || !p) {
            let t = this.settingsData.tryGetProperty(D.gj, c.nF.Interpolate);
            const n = l.snapshot.metadata.cameraMode,
              h = n === o.Ey.Dollhouse || n === o.Ey.Floorplan,
              d = (0, o.Bw)(n),
              p = !this.viewmodeData.isInside() && d,
              m = this.viewmodeData.isInside() && h,
              g = !this.viewmodeData.isInside() && h,
              v = this.viewmodeData.isInside() && d;
            (p || m || g) && (t = c.nF.Interpolate),
              void 0 !==
                (null === (a = null === (s = l.reelEntry) || void 0 === s ? void 0 : s.overrides) ||
                void 0 === a
                  ? void 0
                  : a.transitionType) && (t = l.reelEntry.overrides.transitionType),
              v && 0 === e && (t = c.nF.FadeToBlack),
              void 0 !== i && (t = i),
              this.engine.broadcast(new u.dW(e));
            const f = this.transitionFactory.getFloorTransition(e);
            if (
              (this.data.useTransition(f),
              await f.promise,
              this.data.getTourState() === r.Vs.StopScheduled)
            )
              return;
            const y = this.transitionFactory.getMainTransition(e, t);
            this.data.useTransition(y),
              await y.promise,
              this.data.setTourCurrentSnapshotByIndex(e),
              this.engine.broadcast(new u.Vx(e));
          }
          if (this.data.getTourState() === r.Vs.StopScheduled) return;
          const f = {};
          (null === (h = l.reelEntry) || void 0 === h ? void 0 : h.overrides) &&
            ((f.panAngle = l.reelEntry.overrides.panAngle),
            (f.panDirection = l.reelEntry.overrides.panDirection));
          const y = t || this.getBurnsStyleForSnapshot(e, f);
          let w;
          if (this.toursViewData.getTourStoryMode()) {
            e === this.data.getSnapshotCount() - 1 && this.isLastStopStatic(f) && (w = n.GS);
          }
          g > 0 && (w = (1 - g) * v);
          const b = this.transitionFactory.getBurnsTransition(e, y, w);
          this.engine.broadcast(new u._3(e, b.type, b.duration)),
            this.data.useTransition(b),
            await b.promise;
        }
        isLastStopStatic(e) {
          const t = J.getPanDirection(this.settingsData, e.panDirection),
            i = J.getPanDegrees(this.settingsData, e.panAngle),
            s = this.data.getActiveReelTourMode(),
            n = (0, se.Cf)(this.settingsData, s);
          return 0 === i || (!n && t === P.kw.Auto);
        }
        async stopTour(e = !1) {
          this.data.getTourState() === r.Vs.Active &&
            (this.data.setTourState(r.Vs.StopScheduled),
            (this.data.tourWillResume = e),
            (this.data.tourPlaying = !1),
            await this.data.stopTourTransition(),
            this.tourGenerator && this.engine.stopGenerator(this.tourGenerator),
            this.engine.broadcast(new u.NR(e)),
            this.data.getTourCurrentSnapshotIndex() !== this.data.getSnapshotCount() - 1 ||
              this.data.isLooping() ||
              ((this.data.tourEnded = !0), this.engine.broadcast(new u.Mt())),
            this.data.setTourState(r.Vs.Inactive),
            this.data.commit());
        }
        async tourGoNext(e) {
          let t = this.data.getTourCurrentSnapshotIndex() + 1;
          t >= this.data.getSnapshotCount() && (t = 0);
          const i = e ? c.nF.Instant : void 0;
          return this.tourGoTo(t, i);
        }
        async tourGoPrevious(e) {
          let t = this.data.getTourCurrentSnapshotIndex();
          t < 0 && (t = 0);
          let i = t - 1;
          i < 0 && (i = this.data.getSnapshotCount() - 1);
          const s = e ? c.nF.Instant : void 0;
          return this.tourGoTo(i, s);
        }
        async tourGoTo(e, t = c.nF.FadeToBlack) {
          if (!this.canChangeTourLocation())
            throw new ie.z(
              'Cannot change tour location at this time, another transition is active',
            );
          if (this.viewmodeData.transition && this.viewmodeData.transition.active)
            throw new ie.z('Cannot go to tour location during viewmode transition');
          if (this.data.getTourState() !== r.Vs.Inactive)
            throw new ie.z('Cannot jump to tour location while tour is active');
          try {
            this.data.setTourState(r.Vs.Active), await this.composeTourTransition(e, P.BZ.None, t);
          } catch (e) {
            this.log.error(e);
          } finally {
            this.data.setTourState(r.Vs.Inactive);
          }
        }
        setupAutoPlay(e) {
          const t = 1e3 * (0, n.zi)(this.settingsData),
            i = () => {
              let e = !0;
              const i = this.cameraData.pose.onChanged(() => {
                (e = !1), i.cancel();
              });
              setTimeout(() => {
                e && this.startTour(), i.cancel();
              }, t);
            };
          if (t >= 0) {
            const t = e.market.tryGetData(g.pu);
            if (t && t.phase === g.nh.PLAYING) i();
            else {
              const t = (s) => {
                s.phase === g.nh.PLAYING && (i(), e.unsubscribe(v.LZ, t));
              };
              e.subscribe(v.LZ, t);
            }
          }
        }
      }
    },
    79777: (e, t, i) => {
      'use strict';
      i.r(t),
        i.d(t, {
          HighlightReel: () => f,
          ToggleForceShowStoryTextCommand: () => G.iy,
          ToggleHighlightReelOpenCommand: () => G.Av,
          TourAddPosition: () => N.VH,
          TourChangeDescriptionCommand: () => G.K1,
          TourChangeTitleCommand: () => G.Ty,
          TourData: () => s.k,
          TourMode: () => N.zz,
          TourRenameCommand: () => G.CI,
          TourSetTourModeCommand: () => G.Te,
          TourState: () => N.Vs,
          ToursViewData: () => n.T,
          default: () => ee,
        });
      var s = i(72392),
        n = i(18097),
        a = i(933),
        o = i(64150),
        r = i(43017),
        h = i(31740),
        d = i(90420),
        l = i(9263),
        c = i(55587),
        u = i(93797),
        p = i(32082),
        m = i(53257),
        g = i(53584),
        v = i(64831);
      class f extends v.T {
        constructor(e) {
          super(),
            (this.reel = (0, g.C)([])),
            (this.modified = new Date()),
            (this.mode = e),
            this.commit();
        }
        replace(e) {
          this.atomic(() => {
            (this.sid = e.sid),
              this.reel.replace(Array.from(e.reel.values())),
              (this.mode = e.mode),
              (this.modified = e.modified);
          });
        }
      }
      var y = i(90288),
        w = i(30629),
        b = i(49518),
        D = i(33382),
        S = i(80383);
      const I = new m.Z('mds-reel-element-serializer'),
        P = {
          [S.y8.FADE_TO_BLACK]: y.nF.FadeToBlack,
          [S.y8.INSTANT]: y.nF.Instant,
          [S.y8.INTERPOLATE]: y.nF.Interpolate,
        },
        T = { [S.Y6.LEFT]: w.kw.Left, [S.Y6.RIGHT]: w.kw.Right, [S.Y6.AUTO]: w.kw.Auto };
      class E {
        deserialize(e) {
          var t;
          if (!e || !(null === (t = null == e ? void 0 : e.asset) || void 0 === t ? void 0 : t.id))
            return I.debug('Deserialized invalid highlight reel entry from MDS', e), null;
          const i = e.overrides,
            s = {},
            n = (null == i ? void 0 : i.transitionType)
              ? P[null == i ? void 0 : i.transitionType]
              : void 0,
            a = (null == i ? void 0 : i.panDirection)
              ? T[null == i ? void 0 : i.panDirection]
              : void 0,
            o = null == i ? void 0 : i.panAngle;
          (0, D.r)(n) && (s.transitionType = n),
            (0, D.r)(a) && (s.panDirection = a),
            (0, b.hj)(o) && (s.panAngle = o);
          const r = { sid: e.asset.id, overrides: s };
          return (
            e.title && (r.title = e.title), e.description && (r.description = e.description), r
          );
        }
      }
      const M = new m.Z('mds-highlight-reel-serializer');
      class C {
        constructor(e) {
          (this.defaultTourMode = e), (this.reelEntrySerializer = new E());
        }
        deserialize(e) {
          if (!e || !this.validate(e))
            return M.debug('Deserialized invalid active reel data from MDS', e), null;
          const t = new f(e.mode || this.defaultTourMode);
          if (((t.sid = e.id), e.reel))
            for (const i of e.reel) {
              if (!i) continue;
              const e = this.reelEntrySerializer.deserialize(i);
              e && t.reel.push(e);
            }
          return t;
        }
        validate(e) {
          return ['id'].every((t) => t in e);
        }
      }
      const x = {
          [y.nF.FadeToBlack]: S.y8.FADE_TO_BLACK,
          [y.nF.Instant]: S.y8.INSTANT,
          [y.nF.Interpolate]: S.y8.INTERPOLATE,
          [y.nF.MoveToBlack]: S.y8.FADE_TO_BLACK,
          [y.nF.OrbitTo]: S.y8.INTERPOLATE,
        },
        R = { [w.kw.Left]: S.Y6.LEFT, [w.kw.Right]: S.Y6.RIGHT, [w.kw.Auto]: S.Y6.AUTO };
      class L {
        serialize(e) {
          const t = { id: e.sid };
          return (
            e.title && (t.title = e.title),
            e.description && (t.description = e.description),
            e.overrides &&
              ((t.overrides = {}),
              void 0 !== e.overrides.transitionType &&
                (t.overrides.transitionType = x[e.overrides.transitionType]),
              void 0 !== e.overrides.panDirection &&
                (t.overrides.panDirection = R[e.overrides.panDirection]),
              void 0 !== e.overrides.panAngle && (t.overrides.panAngle = e.overrides.panAngle)),
            t
          );
        }
      }
      const A = new m.Z('mds-highlight-reel-store');
      class F extends u.u {
        constructor(e, t, i) {
          super(e),
            (this.baseModelId = i),
            (this.serializer = new L()),
            (this.prefetchKey = 'data.model.activeHighlightReel'),
            (this.deserializer = new C(t));
        }
        async read(e) {
          const t = { modelId: this.getViewId(), prefetchKey: this.prefetchKey };
          return this.query(p.GetHighlightReel, t, e).then((e) => {
            var t, i;
            const s =
              null ===
                (i =
                  null === (t = null == e ? void 0 : e.data) || void 0 === t ? void 0 : t.model) ||
              void 0 === i
                ? void 0
                : i.activeHighlightReel;
            return this.deserializer.deserialize(s);
          });
        }
        async update(e) {
          const t = this.getViewId(),
            i = e.reel.map((e) => this.serializer.serialize(e)),
            s = e.mode;
          return this.mutate(p.PutActiveReel, { modelId: t, elements: i, mode: s }).then(
            async (e) => {
              A.debug(e);
            },
          );
        }
        async fetchAllTourSweeps() {
          var e, t;
          const i = { modelId: this.baseModelId },
            s =
              null ===
                (t =
                  null ===
                    (e = (
                      await this.query(p.GetHighlightReelSweeps, i, { fetchPolicy: 'no-cache' })
                    ).data) || void 0 === e
                    ? void 0
                    : e.model) || void 0 === t
                ? void 0
                : t.views,
            n = [];
          return (
            s &&
              s.forEach((e) => {
                var t, i;
                const s =
                  null ===
                    (i = null === (t = e.model) || void 0 === t ? void 0 : t.activeHighlightReel) ||
                  void 0 === i
                    ? void 0
                    : i.reel;
                s &&
                  s.forEach((t) => {
                    var i, s, a;
                    const o =
                      null ===
                        (a =
                          null ===
                            (s =
                              null === (i = t.asset) || void 0 === i
                                ? void 0
                                : i.snapshotLocation) || void 0 === s
                            ? void 0
                            : s.anchor) || void 0 === a
                        ? void 0
                        : a.id;
                    o && n.push({ viewId: e.id, sweepId: o });
                  });
              }),
            n
          );
        }
      }
      var k = i(27606),
        O = i(83069),
        V = i(35659),
        B = i(37137),
        N = i(7755),
        G = i(23146),
        H = i(44209),
        _ = i(4763),
        U = i(24938),
        W = i(20348),
        z = i(7321),
        j = i(32137),
        $ = i(40232),
        q = i(73521),
        Z = i(61647);
      const { HLR: Y } = z.Z.WORKSHOP;
      class X extends q.K {
        constructor(e, t, i, s, n, a) {
          if (
            (super(e, void 0, t),
            (this.reelEntry = i),
            (this.index = s),
            (this.tourMode = n),
            (this.locale = a),
            (this.id = this.reelEntry.id),
            (this.title = this.reelEntry.title || ''),
            (this.description = this.reelEntry.description || ''),
            (this.icon = 'icon-toolbar-hlr'),
            (this.typeId = S.SF.HIGHLIGHTREEL),
            (this.floorId = ''),
            (this.roomId = ''),
            (this.dateBucket = (0, $.f)(this.reelEntry.snapshot.created)),
            (this.onSelect = async () => {
              super.onSelect(),
                await this.commandBinder.issueCommand(new Z.rU(this.index)),
                this.tourMode === N.zz.STORIES
                  ? await this.commandBinder.issueCommand(new G.iy(!0))
                  : this.commandBinder.issueCommand(new G.Av(!0));
            }),
            n === N.zz.STORIES)
          ) {
            const e = !!i.title,
              t = !!i.snapshot.name;
            this.title =
              e && t
                ? i.snapshot.name + ' - ' + i.title
                : e || t
                  ? i.title
                    ? i.title
                    : i.snapshot.name
                  : this.getDefaultName();
          } else
            (this.title = i.snapshot.name ? i.snapshot.name : this.getDefaultName()),
              (this.description = '');
          this.imgUrl = this.reelEntry.snapshot.thumbnailUrl;
        }
        supportsBatchDelete() {
          return !1;
        }
        getDefaultName() {
          return this.locale.t(Y.SEARCH_HIGHLIGHT_DEFAULTNAME) + ' ' + (this.index + 1);
        }
      }
      const { HLR: K } = z.Z.WORKSHOP;
      var Q = i(52821),
        J = i(22925);
      class ee extends a.Y {
        constructor() {
          super(...arguments),
            (this.name = 'tours-data'),
            (this.defaultModes = [r.Ey.Panorama, r.Ey.Outdoor]),
            (this.fetchAllTourSweeps = async () => {
              const e = await this.store.fetchAllTourSweeps();
              this.viewData.setSweepsInToursAcrossViews(e);
            }),
            (this.updateTourMode = () => {
              (this.viewData.currentTourMode = this.getCurrentTourMode()),
                this.viewData.setTourModeSetting(this.getTourModeSetting()),
                this.viewData.commit();
            }),
            (this.closeReelIfEmpty = () => {
              0 === this.tourData.getSnapshotCount() &&
                this.viewData.reelOpen &&
                this.toggleReel(!1);
            }),
            (this.saveTourModeChange = async (e) => {
              const { tourMode: t } = e;
              t === N.zz.STORIES
                ? this.tourData.setActiveReelTourMode(S.Z1.STORY)
                : t === N.zz.LEGACY && this.tourData.setActiveReelTourMode(S.Z1.REEL),
                this.updateTourMode();
            }),
            (this.onToggleReel = async (e) => {
              this.toggleReel(e.open);
            }),
            (this.onForceShowStoryText = async (e) => {
              this.engine.broadcast(new Q.Q());
            }),
            (this.onUpdateSnapshots = () => {
              this.tourData.updateSnapshots(this.snapshotsData.collection);
            });
        }
        async init(e, t) {
          const { readonly: i, baseUrl: a, storyToursFeature: r, baseModelId: c } = e;
          (this.engine = t), (this.config = e);
          const [u, p, m, g, v] = await Promise.all([
            t.market.waitForData(o.e),
            t.market.waitForData(h.Z),
            t.market.waitForData(d.P),
            t.market.waitForData(J.R),
            t.market.waitForData(U.pu),
          ]);
          (this.settingsData = u), (this.appData = v), (this.snapshotsData = m);
          const y = r ? S.Z1.STORY : S.Z1.REEL;
          if (
            ((this.tourData = new s.k(
              this.snapshotsData.collection,
              new f(y),
              () => this.getFilterModes(this.defaultModes.slice()),
              p.isSweepDisabled,
              e.looping,
              this.log,
            )),
            (this.viewData = new n.T(
              this.tourData,
              this.getTourModeSetting(),
              this.getCurrentTourMode(),
            )),
            !1 === i)
          ) {
            const e = await t.getModuleBySymbol(_.Lx),
              i = this.tourData.getReel();
            (this.monitor = new k.u(i, { aggregationType: O.E.NextFrame }, t)),
              this.monitor.onChanged(() => {
                this.monitor.hasDiffRecord() &&
                  this.engine.commandBinder.issueCommand(new B.V({ dataTypes: [V.g.HIGHLIGHTS] }));
              }),
              this.bindings.push(
                e.onSave(() => this.save(), { dataType: V.g.HIGHLIGHTS }),
                e.onSave(() => this.fetchAllTourSweeps(), { dataType: V.g.SWEEPS }),
              ),
              this.bindings.push(
                t.commandBinder.addBinding(G.Te, this.saveTourModeChange),
                this.settingsData.onPropertyChanged(l.gx.TourButtons, this.updateTourMode),
                this.settingsData.onPropertyChanged(l.gx.HighlightReel, this.updateTourMode),
              );
          }
          const w = () =>
            this.tourData.updateEnabledStops(this.getFilterModes(this.defaultModes.slice()));
          this.bindings.push(
            this.appData.onChanged(() => w()),
            this.settingsData.onPropertyChanged(l.gx.Dollhouse, () => w()),
            this.settingsData.onPropertyChanged(l.gx.FloorPlan, () => w()),
          ),
            (this.store = new F({ context: g.mdsContext, readonly: i, baseUrl: a }, y, c)),
            this.bindings.push(
              this.store.onNewData(async (e) => {
                this.tourData.atomic(() => {
                  var t;
                  const i = this.tourData.getActiveReelTourMode();
                  this.tourData.setHighlightReel(e || new f(i)),
                    null === (t = this.monitor) || void 0 === t || t.clearDiffRecord();
                }),
                  this.updateTourMode(),
                  this.closeReelIfEmpty();
              }),
            ),
            await this.store.refresh(),
            this.bindings.push(
              t.commandBinder.addBinding(G.Av, this.onToggleReel),
              t.commandBinder.addBinding(G.iy, this.onForceShowStoryText),
              this.snapshotsData.onChanged(this.onUpdateSnapshots),
            ),
            (async function (e, t, i) {
              const s = await e.market.waitForData(U.pu),
                n = await e.getModuleBySymbol(_.e9),
                a = (s, a, o, r = []) => {
                  const h = [],
                    d = t.getCurrentTourState().highlights,
                    l = i.currentTourMode;
                  if (r.length > 0 || l === N.zz.NONE) return h;
                  const c = l === N.zz.STORIES;
                  let u = 0;
                  return (
                    d.forEach((t) => {
                      const i =
                        t.title && c
                          ? t.title
                          : n.t(K.SEARCH_HIGHLIGHT_DEFAULTNAME) + ' ' + (u + 1);
                      if (
                        s(i) ||
                        (t.snapshot.name && s(t.snapshot.name)) ||
                        (c && t.description && s(t.description))
                      ) {
                        const i = new X(e.commandBinder, a, t, u, l, n);
                        h.push(i);
                      }
                      u++;
                    }),
                    h
                  );
                },
                o = (e) => new W.V(t.onChanged(e), i.onTourModeSettingChanged(e)),
                r = () => {
                  e.commandBinder.issueCommandWhenBound(
                    new j.c6({
                      id: S.SF.HIGHLIGHTREEL,
                      groupPhraseKey: K.SEARCH_TOUR_HEADER,
                      getSimpleMatches: a,
                      registerChangeObserver: o,
                      groupOrder: 10,
                      groupIcon: 'toolbar-hlr',
                      batchSupported: !1,
                    }),
                  );
                },
                h = () => {
                  e.commandBinder.issueCommandWhenBound(new j.Pe(S.SF.HIGHLIGHTREEL));
                },
                d = { renew: r, cancel: h },
                l = (e) => {
                  h(), r();
                },
                c = s.onPropertyChanged('application', l);
              l(s.application), new W.V(d, c);
            })(t, this.tourData, this.viewData),
            t.market.register(this, s.k, this.tourData),
            i
              ? t.market.register(this, n.T, this.viewData)
              : this.fetchAllTourSweeps().then(() => {
                  t.market.register(this, n.T, this.viewData);
                });
        }
        dispose(e) {
          this.store.dispose(), super.dispose(e);
        }
        async save() {
          if (!this.monitor || this.config.readonly)
            return void this.log.warn('Tour changes will NOT be saved');
          const e = this.tourData.getReel();
          await this.store.update(e), this.fetchAllTourSweeps(), this.monitor.clearDiffRecord();
        }
        getCurrentTourMode() {
          return (0, H.aW)(this.settingsData, this.tourData.getActiveReelTourMode());
        }
        getTourModeSetting() {
          return (0, H.w7)(this.settingsData, this.tourData.getActiveReelTourMode());
        }
        toggleReel(e) {
          (this.viewData.reelOpen = e), this.viewData.commit();
        }
        getFilterModes(e) {
          const t = this.appData.application === U.Mx.WORKSHOP;
          return (
            (t || this.settingsData.tryGetProperty(c.wY, !1)) && e.push(r.Ey.Dollhouse),
            (t || this.settingsData.tryGetProperty(c.dF, !1)) && e.push(r.Ey.Floorplan),
            e
          );
        }
      }
    },
    58881: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => m });
      var s = i(34608),
        n = i(4763),
        a = i(933),
        o = i(61647),
        r = i(98375),
        h = i(61173),
        d = i(51804);
      class l {
        constructor() {
          (this._dateNow = Date.now),
            (this._performanceNow = performance.now),
            (this.nowOverride = 0);
        }
        slowTime(e) {
          (this.fps = e),
            (this.nowOverride = Date.now()),
            (Date.now = () => this.nowOverride),
            (performance.now = () => this.nowOverride);
        }
        tick() {
          this.nowOverride += 1e3 / this.fps;
        }
        resetTime() {
          (Date.now = this._dateNow), (performance.now = this._performanceNow);
        }
      }
      var c,
        u = i(15109),
        p = i(17785);
      !(function (e) {
        (e[(e.STOPPED = 0)] = 'STOPPED'), (e[(e.RECORDING = 1)] = 'RECORDING');
      })(c || (c = {}));
      class m extends a.Y {
        constructor() {
          super(...arguments),
            (this.name = 'video-recorder-module'),
            (this.state = c.STOPPED),
            (this.frostMage = new l());
        }
        async init(e, t) {
          (this.settingsModule = await t.getModuleBySymbol(s.Ak)),
            (this.canvasModule = await t.getModuleBySymbol(n.iM)),
            (this.engine = t),
            this.settingsModule.registerButton(
              'Tour Recorder (Chrome Only)',
              'Download 1080p @ 60',
              () => {
                this.state === c.STOPPED && this.record(1920, 1080, 60);
              },
            ),
            this.settingsModule.registerButton(
              'Tour Recorder (Chrome Only)',
              'Download 720p @ 30',
              () => {
                this.state === c.STOPPED && this.record(1280, 720, 30);
              },
            ),
            this.settingsModule.registerButton(
              'Tour Recorder (Chrome Only)',
              'Download instagram',
              () => {
                this.state === c.STOPPED && this.record(1080, 1080, 30);
              },
            ),
            this.settingsModule.registerButton(
              'Tour Recorder (Chrome Only)',
              'Download instagram story',
              () => {
                this.state === c.STOPPED && this.record(1080, 1920, 30);
              },
            ),
            this.settingsModule.registerButton(
              'Tour Recorder (Chrome Only)',
              'Stop & download current',
              () => {
                this.state === c.RECORDING && this.stop();
              },
            );
        }
        async record(e, t, s) {
          if (this.state !== c.STOPPED)
            return void this.log.warn("Can't start recording... we're already recording!");
          this.log.info('Starting recording of tour. Now is a good time to get a coffee :)'),
            (this.state = c.RECORDING);
          const n = await Promise.all([i.e(764), i.e(548), i.e(718)]).then(i.bind(i, 15730));
          (this.encoder = new n.WebMWriter({ quality: 0.95, frameRate: s })),
            this.frostMage.slowTime(s),
            await this.engine.commandBinder.issueCommand(
              new d.M({
                resizeDimensions: [
                  { property: d.P.width, setDimension: e, duration: 0 },
                  { property: d.P.height, setDimension: t, duration: 0 },
                ],
              }),
            ),
            await this.engine.commandBinder.issueCommand(new o.TH());
          const a = this.engine.subscribe(r.NR, () => {
              a.cancel(), this.state === c.RECORDING && this.stop();
            }),
            h = this,
            l = this.canvasModule.element;
          this.engine.startGenerator(function* () {
            for (; h.state === c.RECORDING; )
              h.encoder.addFrame(l), yield new p.Jj(), h.frostMage.tick(), yield new p.Jj();
          });
        }
        async stop() {
          if (this.state !== c.RECORDING)
            return void this.log.warn("Can't stop recording, we weren't recording at all");
          this.frostMage.resetTime(),
            (this.state = c.STOPPED),
            await this.engine.commandBinder.issueCommand(new d.M((0, u.lb)(0))),
            this.log.info('Encoding tour to video...');
          const e = await this.encoder.complete();
          this.log.info('Tour encoded! Prompting user to download.'), (0, h.Hx)(e, 'tour.webm');
        }
      }
    },
    89704: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => de });
      var s = i(81396),
        n = i(933),
        a = i(4763),
        o = i(20348),
        r = i(43627),
        h = i(32197),
        d = i(3835),
        l = i(57793),
        c = i(33716),
        u = i(98009),
        p = i(7516),
        m = i(90512),
        g = i(97187),
        v = i(11250);
      const f = new s.Vector3(0, -100, 0),
        y = new s.Vector2(-2, -2),
        w = new s.Vector3(-1, -1, -1),
        b = new s.Vector3(1, 1, 1);
      class D {
        constructor(e) {
          (this.raycaster = e),
            (this.currentRay = new s.Ray()),
            (this.origin = f),
            (this.direction = new s.Vector3()),
            (this.pointerNdc = y),
            (this.cameraCache = {
              position: new s.Vector3(),
              quaternion: new s.Quaternion(),
              camera: void 0,
            }),
            (this.cast = (e) => {
              const t = this.currentRay,
                i = this.raycaster.cast(t.origin, t.direction, e).slice();
              return i.length && (this.lastHit = i[0]), i;
            }),
            (this.update3D = (e, t, i) => {
              e instanceof s.Vector3 && this.origin.copy(e),
                t instanceof s.Vector3 && this.direction.copy(t),
                (this.cameraCache.camera = i),
                this.currentRay.set(this.origin, this.direction);
            }),
            (this.updateNDCPosition = () => {
              const e = this.lastHit;
              if (this.cameraCache.camera && e && e.point) {
                const t = this.cameraCache.camera;
                this.cameraCache.position.setFromMatrixPosition(t.matrixWorld),
                  this.cameraCache.quaternion.setFromRotationMatrix(t.matrixWorld);
                const i = (0, v.D_)(
                  e.point,
                  this.cameraCache.position,
                  this.cameraCache.quaternion,
                  t.projectionMatrix,
                );
                i.clamp(w, b), this.pointerNdc.set(i.x, i.y);
              }
            }),
            (this.updatePointer = () => {});
        }
        get pointerRay() {
          return this.currentRay;
        }
        get ndcPosition() {
          return this.updateNDCPosition(), this.pointerNdc;
        }
      }
      var S = i(8126);
      class I extends S.v0 {}
      class P extends I {
        constructor(e) {
          super(), (this.trackedCamera = e);
        }
      }
      class T extends I {}
      class E extends I {}
      var M,
        C = i(94187),
        x = i(32088),
        R = i(63511);
      !(function (e) {
        (e[(e.Mono = 0)] = 'Mono'),
          (e[(e.Stereo = 1)] = 'Stereo'),
          (e[(e.SixDof = 2)] = 'SixDof'),
          (e[(e.__length = 3)] = '__length');
      })(M || (M = {}));
      const L = { controllers: Object.freeze([0, 1]), rotationDegrees: 25 };
      var A;
      !(function (e) {
        (e[(e.touchpadX = 0)] = 'touchpadX'),
          (e[(e.touchpadY = 1)] = 'touchpadY'),
          (e[(e.thumbstickX = 2)] = 'thumbstickX'),
          (e[(e.thumbstickY = 3)] = 'thumbstickY');
      })(A || (A = {}));
      const F = { x: 0, y: 0, z: 0, w: 1 };
      class k extends x.Y {
        constructor(e, t, i, n) {
          super(),
            (this.renderer = e),
            (this.webglScene = t),
            (this.cameraData = i),
            (this.cameraModule = n),
            (this.trackingStyle = M.Mono),
            (this.session = null),
            (this.rotations = {
              initialYawOffset: new s.Quaternion(),
              yawOffset: new s.Quaternion(),
              invYawOffset: new s.Quaternion(),
              trackingOffset: new s.Quaternion(),
            }),
            (this.setTrackingStyle = (e, t = !0) => {
              e < M.__length && ((this.trackingStyle = e), t && this.resetInitialRotation());
            }),
            (this.offsetRotation = (e) => {
              this.rotations.invYawOffset.multiply(e),
                this.rotations.yawOffset.copy(this.rotations.invYawOffset).invert();
            }),
            (this.onPresentStart = (e) => {
              (e.cameras[0].layers.mask = R.o.ALL.mask),
                (e.cameras[1].layers.mask = R.o.ALL.mask),
                (e.cameras[0].far = e.far),
                (e.cameras[1].far = e.far),
                (e.layers.mask = R.o.ALL.mask),
                this.resetInitialRotation(),
                this.broadcast(new T());
            }),
            (this.resetInitialRotation = () => {
              const e = this.cameraData.pose.rotation.clone();
              (0, h.Rq)(e, this.rotations.initialYawOffset),
                this.rotations.yawOffset.copy(this.rotations.initialYawOffset),
                this.rotations.invYawOffset.copy(this.rotations.initialYawOffset).invert();
            }),
            (this.onPresentEnd = () => {
              this.broadcast(new E());
            }),
            (this.applyTrackingOverrides = (e, t, i) => {
              if (e.xr.isPresenting && i instanceof s.ArrayCamera) {
                e.clear();
                const t = i.cameras[0],
                  s = i.cameras[1];
                (this.frame = this.renderer.xr.getFrame()),
                  this.session || ((this.session = e.xr.getSession()), this.onPresentStart(i));
                const n = this.renderer.xr.getReferenceSpace();
                if (this.frame && this.session && n) {
                  this.rotations.trackingOffset
                    .copy(this.rotations.yawOffset)
                    .multiply(i.quaternion),
                    this.cameraModule.updateCameraRotation(this.rotations.trackingOffset);
                  const e = this.webglScene.camera.parent;
                  if (e) {
                    const t = this.getReferenceSpace(this.frame, e, n);
                    this.updateCameras(i, this.frame, t, e),
                      this.updateControllers(this.session, this.frame, t, e);
                  }
                  switch (this.trackingStyle) {
                    case M.Mono:
                      s.matrixWorld.copy(t.matrixWorld),
                        s.matrixWorldInverse.copy(s.matrixWorld),
                        s.matrixWorldInverse.invert();
                  }
                  this.broadcast(new P(t));
                }
              } else this.session && ((this.session = null), this.onPresentEnd());
            }),
            (this.getReferenceSpace = (e, t, i) => {
              const s = e.getViewerPose(i),
                n = (null == s ? void 0 : s.views[0].transform.position) || F,
                a = this.trackingStyle === M.SixDof ? F : n,
                o = new XRRigidTransform({
                  x: a.x - t.position.x,
                  y: a.y - t.position.y,
                  z: a.z - t.position.z,
                }),
                r = i.getOffsetReferenceSpace(o),
                h = this.rotations.invYawOffset,
                d = this.cameraData.pose.position,
                l = new XRRigidTransform(
                  { x: d.x, y: d.y, z: d.z, w: 1 },
                  { x: h.x, y: h.y, z: h.z, w: h.w },
                );
              return r.getOffsetReferenceSpace(l);
            }),
            (this.updateCameras = (e, t, i, s) => {
              const n = t.getViewerPose(i);
              if (n) {
                const t = n.views;
                for (let i = 0; i < t.length; i++) {
                  const n = t[i],
                    a = e.cameras[i];
                  a.matrix.fromArray(n.transform.matrix),
                    a.projectionMatrix.fromArray(n.projectionMatrix),
                    a.projectionMatrixInverse.copy(a.projectionMatrix),
                    a.projectionMatrixInverse.invert(),
                    a.matrixWorld.multiplyMatrices(s.matrixWorld, a.matrix),
                    a.matrixWorldInverse.copy(a.matrixWorld),
                    a.matrixWorldInverse.invert(),
                    a.matrix.decompose(a.position, a.quaternion, a.scale),
                    0 === i &&
                      (e.matrix.copy(a.matrix),
                      e.matrix.decompose(e.position, e.quaternion, e.scale),
                      e.matrixWorld.copy(a.matrixWorld),
                      e.matrixWorldInverse.copy(a.matrixWorldInverse),
                      e.projectionMatrix.copy(a.projectionMatrix),
                      e.projectionMatrixInverse.copy(a.projectionMatrixInverse));
                }
              }
            }),
            (this.updateControllers = (e, t, i, s) => {
              for (let n = 0; n < 2; n++) {
                const a = this.renderer.xr.getController(n),
                  o = this.renderer.xr.getControllerGrip(n),
                  r = e.inputSources[n];
                let h = null,
                  d = null;
                r &&
                  (a &&
                    ((h = t.getPose(r.targetRaySpace, i)),
                    h &&
                      (a.matrix.fromArray(h.transform.matrix),
                      a.matrixWorld.multiplyMatrices(s.matrixWorld, a.matrix),
                      a.matrix.decompose(a.position, a.quaternion, a.scale)),
                    (a.visible = !!h)),
                  o &&
                    r.gripSpace &&
                    ((d = t.getPose(r.gripSpace, i)),
                    d &&
                      (o.matrix.fromArray(d.transform.matrix),
                      o.matrixWorld.multiplyMatrices(s.matrixWorld, o.matrix),
                      o.children.forEach((e) => {
                        e.updateMatrixWorld();
                      }),
                      o.matrix.decompose(o.position, o.quaternion, o.scale)))),
                  o && (o.visible = !!d);
              }
            }),
            (this.webglScene.scene.onBeforeRender = this.applyTrackingOverrides);
        }
      }
      var O = i(85726),
        V = i(97957),
        B = i(22770),
        N = i(55228),
        G = i(58057),
        H = i(62900),
        _ = i(75961),
        U = i(31740),
        W = i(55574),
        z = i(95142),
        j = i(71472);
      const $ = i.p + 'images/selected_sweep_glow.png';
      class q {
        constructor(e) {
          (this.meshQuery = e),
            (this.active = !1),
            (this.target = new O.f(null)),
            (this.previousSweep = null),
            (this.activate = () => {
              this.active ||
                (this.updateLoopSub.renew(),
                this.selectionChangeSub.renew(),
                this.ray.toggle(!0),
                this.targetDecoration.toggle(!0),
                (this.active = !0));
            }),
            (this.deactivate = () => {
              this.active &&
                ((this.target.value = null),
                this.selectionChangeSub.cancel(),
                this.updateLoopSub.cancel(),
                this.ray.toggle(!1),
                this.targetDecoration.toggle(!1),
                (this.active = !1));
            }),
            (this.getTargetSweep = (e, t, i) => {
              let s = null;
              if (t.object instanceof _.Y) return (s = e.getSweep(t.object.userData.sid)), s;
              const n = (0, G.bG)(e, !0, t.intersection, this.meshQuery);
              return (s = n.length > 0 ? n[0].sweep : null), s;
            });
        }
        get container() {
          return this._container;
        }
        async init(e) {
          (this.engine = e),
            (this._container = new s.Group()),
            (this._container.name = 'XRNavigationVisuals'),
            (this.ray = new Z(this.container)),
            (this.targetDecoration = new Y(this.container));
          const t = await this.engine.market.waitForData(c.P);
          return (
            (this.updateLoopSub = t.onChanged(() => this.update(t))),
            this.updateLoopSub.cancel(),
            (this.selectionChangeSub = this.target.onChanged((e) => {
              null !== this.previousSweep &&
                this.engine.commandBinder.issueCommand(new H.kR(this.previousSweep.id, !1, 200)),
                null !== e &&
                  (this.engine.commandBinder.issueCommand(new H.kR(e.id, !0, 200)),
                  this.targetDecoration.updateTargetPosition(e.floorPosition)),
                (this.previousSweep = e);
            })),
            this.selectionChangeSub.cancel(),
            this
          );
        }
        update(e) {
          const t = this.engine.market.tryGetData(U.Z),
            i = this.engine.market.tryGetData(l.M),
            s = this.engine.market.tryGetData(m.O),
            n = this.engine.market.tryGetData(z.Y),
            a = this.engine.market.tryGetData(W.Z);
          if (!(t && i && s && a && n)) return;
          if (!a.isVR()) return;
          if (!s.isInside()) return;
          const { hit: o, pointerDirection: r, pointerOrigin: h } = e;
          if (!o) return;
          const d = this.getTargetSweep(t, o, r);
          (this.target.value = d),
            this.ray.update(h, o.point, n.opacity.value),
            this.targetDecoration.update(i.pose.rotation, n.opacity.value);
        }
      }
      class Z {
        constructor(e) {
          (this.container = e),
            (this.styles = {
              ray: { color: 'white', transparent: !0, opacity: 0.3, linewidth: 2, depthWrite: !1 },
              hit: { color: 'white', transparent: !0, opacity: 0.3 },
              hitScale: 0.02,
            }),
            (this.update = (e, t, i) => {
              this.ray.updatePositions(e, t).opacity(Math.min(i, this.styles.ray.opacity)),
                this.hitMarker.position.copy(t),
                (this.hitMarker.material.opacity = Math.min(i, this.styles.hit.opacity));
            }),
            (this.toggle = (e) => {
              e
                ? (this.container.add(...this.ray.children), this.container.add(this.hitMarker))
                : (this.container.remove(...this.ray.children),
                  this.container.remove(this.hitMarker));
            });
          const { ray: t, hit: i } = this.styles,
            n = (0, B.makeLineMaterial)(t.color, !1, t);
          (this.ray = new N.c(new s.Vector3(), new s.Vector3(), n, {})),
            this.ray.updateResolution(window.innerWidth, window.innerHeight),
            (this.hitMarker = new V.E(
              new s.SphereGeometry(this.styles.hitScale),
              new s.MeshBasicMaterial(i),
            )),
            (this.hitMarker.name = 'hit');
        }
      }
      class Y {
        constructor(e) {
          (this.container = e),
            (this.styles = {
              scale: 0.46,
              animationSpeed: 1,
              plane: {
                color: 'white',
                transparent: !0,
                opacity: 0.6,
                depthWrite: !1,
                depthTest: !1,
                map: (0, j.p)($),
              },
            }),
            (this.position = new s.Vector3()),
            (this.quaternion = new s.Quaternion()),
            (this.updateTargetPosition = (e) => {
              this.position.copy((0, h.Xv)(e, d.fU.UP, 0.05));
            }),
            (this.update = (e, t) => {
              const i = (0, h.Rq)(e, this.quaternion);
              this.target.quaternion.copy(i),
                this.target.position.lerp(this.position, this.styles.animationSpeed),
                (this.target.material.opacity = Math.min(t, this.styles.plane.opacity));
            }),
            (this.toggle = (e) => {
              e ? this.container.add(this.target) : this.container.remove(this.target);
            });
          const t = new s.PlaneGeometry(1),
            i = new s.Matrix4();
          i.makeRotationFromEuler(new s.Euler(-Math.PI / 2, 0, 0, 'XYZ')),
            t.applyMatrix4(i),
            (this.target = new V.E(t, new s.MeshBasicMaterial(this.styles.plane))),
            (this.target.name = 'Destination'),
            this.target.scale.set(this.styles.scale, this.styles.scale, this.styles.scale);
        }
      }
      class X {
        constructor(e) {
          (this.controllers = e), (this._lastInputWas = 0);
        }
        focus(e) {
          e !== this._lastInputWas &&
            (L.controllers.forEach((t) => {
              this.controllers.controller(t).grip.visible = t !== e;
            }),
            (this._lastInputWas = e));
        }
      }
      var K = i(59491);
      class Q {
        constructor(e) {
          (this.renderer = e),
            (this._defaultController = 0),
            (this.controllerGroups = []),
            (this.bindings = []),
            (this.cancel = () => {
              this.bindings.forEach((e) => e.cancel()), (this.bindings.length = 0);
            }),
            (this.container = new s.Group()),
            (this.container.name = 'XRControllerMesh'),
            L.controllers.forEach((e) => {
              const t = this.createControllerGroup(e);
              this.controllerGroups.push(t), this.container.add(t.grip, t.pointer);
            }),
            this.connectControllerModel(),
            (this.container.matrixAutoUpdate = !1);
        }
        controller(e = this._defaultController) {
          return this.controllerGroups[e];
        }
        setDefault(e) {
          this._defaultController = e;
        }
        async connectControllerModel() {
          const e = new (
            await Promise.all([i.e(217), i.e(376)]).then(i.bind(i, 92583))
          ).XRControllerModelFactory();
          L.controllers.forEach((t) => {
            const i = this.controller(t).grip;
            i.add(e.createControllerModel(i));
          });
        }
        createControllerGroup(e) {
          const t = this.renderer.xr.getController(e);
          t.name = `Controller Ray ${e}`;
          const i = this.renderer.xr.getControllerGrip(e);
          (i.name = `Controller Grip ${e}`), (i.visible = !1);
          const s = { index: e, pointer: t, grip: i, connected: !1, hand: 'none' },
            n = (e) => {
              (s.hand = e.data.handedness), (s.connected = !0);
            },
            a = () => {
              (s.hand = 'none'), (s.connected = !1);
            };
          return (
            this.bindings.push(
              (0, K.k1)(
                () => t.addEventListener('connected', n),
                () => t.removeEventListener('connected', n),
              ),
              (0, K.k1)(
                () => t.addEventListener('disconnected', a),
                () => t.removeEventListener('disconnected', a),
              ),
            ),
            s
          );
        }
      }
      const J = new (i(53257).Z)('xr-input-forwarding');
      class ee {
        constructor(e) {
          (this.options = e),
            (this.dispatchPointerDown = (e) => {
              this.forwardEvent('pointerdown', this.mockPointerEventInit(e));
            }),
            (this.dispatchPointerUp = (e) => {
              this.forwardEvent('pointerup', this.mockPointerEventInit(e));
            }),
            (this.target = e.forwardToElement);
        }
        dispatchPointerMove(e) {
          this.forwardEvent('pointermove', this.mockPointerEventInit(e));
        }
        mockPointerEventInit(e) {
          let t = 0,
            i = 0;
          if (this.options.getPointerScreenPosition) {
            const e = this.options.getPointerScreenPosition();
            (t = e.x), (i = e.y);
          }
          return { pointerType: 'gamepad', pointerId: e, clientX: t, clientY: i };
        }
        forwardEvent(e, t) {
          let i;
          try {
            (i = window.PointerEvent ? new PointerEvent(e, t) : new MouseEvent(e, t)),
              i && this.target.dispatchEvent(i);
          } catch (e) {
            J.error(e);
          }
        }
      }
      class te extends s.EventDispatcher {
        constructor(e, t) {
          super(),
            (this.renderer = e),
            (this.options = {
              forwardNativeXrEvents: !0,
              dispatchToControllerGroup: !1,
              axisMoveTriggerThreshold: 0.5,
            }),
            (this.previousGamepad = new Map()),
            (this.forwardedEvents = [
              'selectstart',
              'select',
              'selectend',
              'squeeze',
              'squeezestart',
              'squeezeend',
            ]),
            (this.active = !1),
            (this.renew = () => {
              !this.active &&
                this.options.forwardNativeXrEvents &&
                (this.addSessionListeners(), (this.active = !0));
            }),
            (this.cancel = () => {
              this.active &&
                this.options.forwardNativeXrEvents &&
                (this.removeSessionListeners(), (this.active = !1));
            }),
            (this.updateFromGamepads = () => {
              if (!this.active) return;
              const e = this.renderer.xr.getSession();
              if (e)
                for (const t of L.controllers) {
                  const i = e.inputSources[t];
                  if (!i || !i.gamepad) continue;
                  const s = this.renderer.xr.getController(t),
                    n = this.previousGamepad.get(i),
                    a = {
                      buttons: i.gamepad.buttons.map((e) => e.value),
                      axes: new Float32Array(i.gamepad.axes.slice()),
                    },
                    o = { controllerIndex: t, inputSource: i, axes: a.axes };
                  n &&
                    (a.buttons.forEach((e, t) => {
                      e !== n.buttons[t] &&
                        (1 === e
                          ? this.sendGamepadEvent(
                              s,
                              Object.assign(Object.assign({}, o), {
                                type: 'buttondown',
                                value: e,
                                index: t,
                                target: s,
                              }),
                            )
                          : 0 === e &&
                            this.sendGamepadEvent(
                              s,
                              Object.assign(Object.assign({}, o), {
                                type: 'buttonup',
                                value: e,
                                index: t,
                                target: s,
                              }),
                            ));
                    }),
                    a.axes.forEach((e, t) => {
                      const i = n.axes[t];
                      if (e !== i) {
                        this.sendGamepadEvent(
                          s,
                          Object.assign(Object.assign({}, o), {
                            type: 'axesmove',
                            value: e,
                            index: t,
                            target: s,
                          }),
                        ),
                          0 === i &&
                            this.sendGamepadEvent(
                              s,
                              Object.assign(Object.assign({}, o), {
                                type: 'axesmovestart',
                                value: e,
                                index: t,
                                target: s,
                              }),
                            );
                        const n = this.options.axisMoveTriggerThreshold;
                        Math.abs(i) < n &&
                          Math.abs(e) > n &&
                          this.sendGamepadEvent(
                            s,
                            Object.assign(Object.assign({}, o), {
                              type: 'axestriggered',
                              value: e,
                              index: t,
                              target: s,
                            }),
                          ),
                          0 === e &&
                            this.sendGamepadEvent(
                              s,
                              Object.assign(Object.assign({}, o), {
                                type: 'axesmoveend',
                                value: e,
                                index: t,
                                target: s,
                              }),
                            );
                      }
                    })),
                    this.previousGamepad.set(i, a);
                }
            }),
            (this.onGamepadEvent = (e, t) =>
              (0, K.k1)(
                () => super.addEventListener(e, t),
                () => super.removeEventListener(e, t),
              )),
            (this.onSessionEvent = (e, t) =>
              (0, K.k1)(
                () => super.addEventListener(e, t),
                () => super.removeEventListener(e, t),
              )),
            (this.sendGamepadEvent = (e, t) => {
              this.dispatchEvent(t), this.options.dispatchToControllerGroup && e.dispatchEvent(t);
            }),
            (this.sendSessionEvent = (e, t) => {
              this.dispatchEvent({ type: e, controllerIndex: t });
            }),
            (this.addSessionListeners = () => {
              L.controllers.forEach((e) => {
                const t = this.renderer.xr.getController(e);
                for (const i of this.forwardedEvents)
                  t.addEventListener(i, (t) => this.sendSessionEvent(t.type, e));
              });
            }),
            (this.removeSessionListeners = () => {
              L.controllers.forEach((e) => {
                const t = this.renderer.xr.getController(e);
                for (const i of this.forwardedEvents)
                  t.removeEventListener(i, (t) => this.sendSessionEvent(t.type, e));
              });
            }),
            t && (this.options = Object.assign(Object.assign({}, this.options), t)),
            this.renew();
        }
      }
      var ie = i(90449),
        se = i(99010),
        ne = i(61173);
      var ae = i(44979);
      const oe = new s.Quaternion().setFromAxisAngle(d.fU.UP, r.Ue * L.rotationDegrees),
        re = new s.Quaternion().setFromAxisAngle(d.fU.UP, r.Ue * -L.rotationDegrees);
      class he extends n.Y {
        constructor() {
          super(...arguments),
            (this.name = 'webxr'),
            (this.framebufferScaledTo = 1),
            (this.framebufferScale = 0),
            (this.ray = { forward: new s.Vector3(), origin: new s.Vector3() }),
            (this.onXrPresentBegin = () => {
              const e = this.renderer.xr.getSession();
              e &&
                (this.log.info(`Session framebuffer: ${e.renderState.baseLayer}`),
                this.engine.commandBinder.issueCommand(new u.F(p.SL.HIGH)),
                this.viewmodeData.isInside() ||
                  this.engine.commandBinder.issueCommand(new g._i(g.BD.INSIDE)),
                (this.xrPointer = new D(this.raycaster.picking)),
                this.raycaster.setOverridePointer(this.xrPointer),
                this.xrNavVisuals.activate());
            }),
            (this.onXrPresentEnd = () => {
              this.engine.commandBinder.issueCommand(new u.F(null)),
                this.xrNavVisuals.deactivate(),
                this.raycaster.setOverridePointer(null),
                this.cameraModule.updateCameraRotation(
                  (0, h.Rq)(this.cameraData.pose.rotation, new s.Quaternion()),
                ),
                this.webglScene.setCameraDirty();
            }),
            (this.onXrTrackingApplied = (e) => {
              const t = this.controllerMesh.controller();
              if (t.connected) {
                const i = this.ray.forward.copy(d.fU.FORWARD).applyQuaternion(t.pointer.quaternion),
                  s = this.ray.origin.setFromMatrixPosition(t.pointer.matrixWorld);
                this.xrPointer.update3D(s, i, e.trackedCamera),
                  this.xrPointerInput.dispatchPointerMove(t.index);
              }
              this.xrGamepadInput.updateFromGamepads();
            }),
            (this.tryEndSession = async () => {
              var e;
              await (null === (e = this.activeXrSession) || void 0 === e ? void 0 : e.end()),
                (this.activeXrSession = void 0);
            }),
            (this.requestSession = async (e, t) => {
              var i;
              if ((await (0, ie.pl)(this.config.xrBrowsersUnlocked)) !== ie.bk.webxr) return null;
              if (this.renderer.xr.isPresenting) return this.renderer.xr.getSession();
              if (se.Z.apiExists()) {
                const s = await (null === (i = navigator.xr) || void 0 === i
                  ? void 0
                  : i.requestSession(e, { optionalFeatures: t }));
                if (!s) return null;
                this.activeXrSession = s;
                const n = XRWebGLLayer.getNativeFramebufferScaleFactor(s);
                return (
                  (this.framebufferScaledTo = this.framebufferScale * (n - 1) + 1),
                  this.log.info(
                    'Scaling framebuffer by:',
                    this.framebufferScaledTo,
                    'native size:',
                    n,
                    ' * factor:',
                    this.framebufferScale,
                  ),
                  0 !== this.framebufferScale &&
                    this.renderer.xr.setFramebufferScaleFactor(this.framebufferScaledTo),
                  this.renderer.xr.setSession(s),
                  s
                );
              }
              return null;
            });
        }
        async init(e, t) {
          (this.config = e), (this.engine = t);
          const [i, s] = await Promise.all([t.getModuleBySymbol(a.Aj), t.getModuleBySymbol(a.hi)]);
          (this.renderer = i.threeRenderer),
            (this.webglScene = i.getScene()),
            this.bindings.push(
              t.commandBinder.addBinding(C.j, (e) => this.requestSession(e.type, e.features)),
              t.commandBinder.addBinding(C.A, () => this.tryEndSession()),
            );
          if ((await (0, ie.pl)(e.xrBrowsersUnlocked)) !== ie.bk.webxr) return;
          ([this.canvasModule, this.cameraModule, this.raycaster] = await Promise.all([
            t.getModuleBySymbol(a.iM),
            t.getModuleBySymbol(a.kg),
            t.getModuleBySymbol(a.fQ),
          ])),
            ([this.cameraData, this.raycasterData, this.viewmodeData, this.policyData] =
              await Promise.all([
                t.market.waitForData(l.M),
                t.market.waitForData(c.P),
                t.market.waitForData(m.O),
                t.market.waitForData(ae.n),
              ])),
            this.renderer.xr.setReferenceSpaceType('local'),
            (this.framebufferScale =
              this.config.framebufferScaling ||
              (function (e) {
                const t = (0, ne.tq)();
                return !t ||
                  (t &&
                    (function (e) {
                      return /Adreno \(TM\) (540|[6-9]\d\d)/.test(e.renderer);
                    })(e))
                  ? 1
                  : 0;
              })(i.gpuInfo));
          const n = new k(this.renderer, this.webglScene, this.cameraData, this.cameraModule);
          n.setTrackingStyle(e.tracking),
            this.bindings.push(
              n.subscribe(T, this.onXrPresentBegin),
              n.subscribe(E, this.onXrPresentEnd),
              n.subscribe(P, this.onXrTrackingApplied),
            ),
            (this.controllerMesh = new Q(this.renderer)),
            this.webglScene.add(this.controllerMesh.container);
          const r = new X(this.controllerMesh),
            h = e.enableEventPositions ? () => this.raycasterData.pointerScreenPosition : void 0;
          (this.xrPointerInput = new ee({
            forwardToElement: this.canvasModule.element,
            getPointerScreenPosition: h,
          })),
            (this.xrGamepadInput = new te(this.renderer));
          const d = [
            this.xrGamepadInput.onGamepadEvent('axestriggered', (e) => {
              if (e.index === A.thumbstickX || e.index === A.touchpadX) {
                this.log.debug(
                  `${e.inputSource.handedness} ${A[e.index]} axis.value over threshold, do the rotate!`,
                );
                Math.sign(e.value) > 0 ? n.offsetRotation(oe) : n.offsetRotation(re);
              }
              r.focus(e.controllerIndex), this.controllerMesh.setDefault(e.controllerIndex);
            }),
            this.xrGamepadInput.onSessionEvent('selectstart', (e) => {
              this.xrPointerInput.dispatchPointerDown(e.controllerIndex),
                r.focus(e.controllerIndex),
                this.controllerMesh.setDefault(e.controllerIndex);
            }),
            this.xrGamepadInput.onSessionEvent('selectend', (e) => {
              this.xrPointerInput.dispatchPointerUp(e.controllerIndex),
                r.focus(e.controllerIndex),
                this.controllerMesh.setDefault(e.controllerIndex);
            }),
            this.xrGamepadInput.onSessionEvent('squeezestart', (e) => {
              r.focus(e.controllerIndex), this.controllerMesh.setDefault(e.controllerIndex);
            }),
          ];
          this.policyData.hasPolicy('spaces.sdk.qa') &&
            d.push(
              this.xrGamepadInput.onGamepadEvent('buttondown', (t) => {
                4 === t.index
                  ? ((e.tracking = (e.tracking + 1) % M.__length),
                    n.setTrackingStyle(e.tracking, !1))
                  : 5 === t.index &&
                    ((e.tracking = (M.__length + e.tracking - 1) % M.__length),
                    n.setTrackingStyle(e.tracking, !1)),
                  r.focus(t.controllerIndex),
                  this.controllerMesh.setDefault(t.controllerIndex);
              }),
            );
          const u = new o.V(...d);
          this.bindings.push(u, this.xrGamepadInput),
            (this.xrNavVisuals = new q(s)),
            this.xrNavVisuals.init(t),
            this.webglScene.add(this.xrNavVisuals.container);
        }
      }
      const de = he;
    },
    71034: (e, t, i) => {
      'use strict';
      i.d(t, { $7: () => l, uc: () => u, N3: () => d });
      var s = i(81396),
        n = i(4679),
        a = i(11250),
        o = i(43627),
        r = i(96783),
        h = i(26059);
      var d;
      (0, n.Dy)({
        unicodeFontsURL: 'https://static.matterport.com/webgl-vendors/unicode-font-resolver/1.0.1/',
      }),
        (function (e) {
          (e.WORLD = 'world'), (e.NDC = 'ndc');
        })(d || (d = {}));
      class l extends s.Object3D {
        constructor(e, t = d.WORLD) {
          var i, a, o, r;
          super(),
            (this.config = e),
            (this.scaleType = t),
            (this.unscaledWidth = 0),
            (this.unscaledHeight = 0),
            (this.labelTextMaterial = new s.MeshBasicMaterial()),
            (this.bindings = []);
          const h = this.config.background || this.config.backgroundAsCollider;
          if (h) {
            (this.config.backgroundOpacity =
              void 0 !== this.config.backgroundOpacity ? this.config.backgroundOpacity : 1),
              (this.config.backgroundOpacity = this.config.background
                ? this.config.backgroundOpacity
                : 0);
            const t = this.createQuadGeometry(),
              i = new s.MeshBasicMaterial({
                color: e.backgroundColor,
                transparent: !0,
                depthTest: this.config.backgroundOpacity > 0 && !e.disableDepth,
                depthWrite: this.config.backgroundOpacity > 0 && !e.disableDepth,
                opacity: this.config.backgroundOpacity,
                stencilRef: 1,
                stencilFail: s.KeepStencilOp,
                stencilZFail: s.KeepStencilOp,
                stencilZPass: s.ReplaceStencilOp,
                stencilFunc: s.AlwaysStencilFunc,
                stencilWrite: !0,
              });
            (this.labelBackgroundMesh = new this.config.backgroundColliderType(t, i)),
              (this.labelBackgroundMesh.position.z = -0.01),
              (this.labelBackgroundMesh.name = 'Label Background'),
              (this.collider = this.labelBackgroundMesh),
              this.add(this.labelBackgroundMesh);
          }
          const l = (this.labelTextMesh = new n.xv());
          (l.material = this.labelTextMaterial),
            (l.name = 'Label Text'),
            (l.text = e.text || ''),
            (l.renderOrder = 10),
            (l.font = `${null !== (i = e.assetBasePath) && void 0 !== i ? i : ''}${e.fontPath}`),
            (l.lang = e.lang),
            (l.fontSize = 1),
            (l.fontWeight = 700),
            (l.anchorX = '50%'),
            (l.anchorY = '50%'),
            (l.outlineWidth = e.outline ? e.outlineWidth : 0),
            (l.maxWidth = e.wordWrapWidth),
            (l.textAlign = e.align),
            (l.depthOffset = e.depthOffset || 0),
            h && (l.raycast = () => {}),
            l.addEventListener('synccomplete', () => {
              var e;
              const [t, i, s, n] = l.textRenderInfo.visibleBounds;
              let a = s - t,
                o = n - i;
              isFinite(a) &&
                isFinite(o) &&
                (h &&
                  ((a += this.config.backgroundBorderWidth),
                  (o += this.config.backgroundBorderHeight),
                  this.labelBackgroundMesh.scale.set(a, o, 1)),
                (this.unscaledWidth = a),
                (this.unscaledHeight = o),
                (this.aspect = a / Math.max(o, 0.001)),
                l.position.set(
                  '50%' === l.anchorX ? (t + s) / -2 : 0,
                  '50%' === l.anchorY ? (i + n) / -2 : 0,
                  0,
                ),
                null === (e = this._onGeomUpdate) || void 0 === e || e.call(this));
            }),
            (this.scaleFactor = null !== (a = e.scale) && void 0 !== a ? a : 1),
            (this.opacity = null !== (o = e.opacity) && void 0 !== o ? o : 1),
            this.setColor(null !== (r = e.color) && void 0 !== r ? r : 0),
            this.add(l),
            l.sync(),
            (this.name = 'Label Container');
        }
        dispose() {
          this.bindings.forEach((e) => e.cancel()), this.labelTextMesh.dispose();
        }
        onGeomUpdate(e) {
          this._onGeomUpdate = e;
        }
        get text() {
          return this.config.text;
        }
        set text(e) {
          (this.config.text = e), (this.labelTextMesh.text = e), this.labelTextMesh.sync();
        }
        get mesh() {
          return this.labelTextMesh;
        }
        getUnscaledSize() {
          return { width: this.unscaledWidth, height: this.unscaledHeight };
        }
        get scaleFactor() {
          return this.config.scale;
        }
        set scaleFactor(e) {
          (this.config.scale = e), this.scale.setScalar(e);
        }
        get opacity() {
          return void 0 !== this.config.opacity ? this.config.opacity : 1;
        }
        set opacity(e) {
          if (e !== this.config.opacity) {
            this.config.opacity = e;
            const t = e > 0 && !this.config.disableDepth;
            if (this.config.background) {
              const i = this.labelBackgroundMesh.material;
              (i.opacity = Math.min(this.config.backgroundOpacity || 1, e)),
                (i.depthWrite = e > 0.15),
                (i.depthTest = t);
            }
            const i = this.labelTextMaterial;
            (i.opacity = e),
              (i.depthTest = t),
              (this.visible = e > 0),
              (this.labelBackgroundMesh.visible = this.visible);
          }
        }
        setColor(e) {
          this.labelTextMaterial.color.set(e);
        }
        setRenderLayer(e) {
          (this.labelTextMesh.layers.mask = e.mask),
            this.labelBackgroundMesh && (this.labelBackgroundMesh.layers.mask = e.mask);
        }
        setRenderOrder(e) {
          (this.renderOrder = e),
            (this.labelTextMesh.renderOrder = e),
            this.labelBackgroundMesh && (this.labelBackgroundMesh.renderOrder = e);
        }
        setPosition(e, t = (e) => e) {
          this.position.copy(t(e));
        }
        setOrientation(e, t = 0) {
          this.quaternion.copy(e), 0 !== t && this.rotateZ(-t * o.Ue);
        }
        scaleBillboard(e, t, i, s, n, o, l = c.SCALE_DEFAULT) {
          if (0 !== i.elements[15]) this.scaleFactor = 0.2 * l * s * (c.ORTHO_IDEAL_HEIGHT / n);
          else {
            const u = (0, a.D_)(this.position, e, t, i.asThreeMatrix4()),
              p = Math.abs(u.x);
            if (p < 1) {
              const t = (0, h.mY)(i, e, this.position, n, l),
                a = ((0, r.uZ)(o, 1, 2.5) + s) * c.SCALE_ASPECT,
                u = 1 + c.SCALE_NDC - p * c.SCALE_NDC - a,
                m = Math.max(Math.min((1 / t) * u, 3), 0.001);
              this.scaleType === d.NDC
                ? (this.scaleFactor = m)
                : (this.scaleFactor = Math.min(m * c.NDC_MULT, l * c.SCALE_WORLD));
            } else this.scaleFactor = 0.001;
          }
        }
        createQuadGeometry() {
          const e = new Float32Array([-0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0]),
            t = new Float32Array([0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1]),
            i = new s.BufferGeometry();
          return (
            i.setAttribute('position', new s.BufferAttribute(e, 3)),
            i.setIndex([0, 1, 2, 0, 2, 3]),
            i.setAttribute('normal', new s.BufferAttribute(t, 3)),
            i
          );
        }
      }
      const c = {
        SCALE_DEFAULT: 0.1,
        SCALE_WORLD: 4,
        SCALE_NDC: 0.5,
        SCALE_ASPECT: 0.035,
        DEPTH_WRITE_THRESHOD: 0.15,
        ORTHO_IDEAL_HEIGHT: 1500,
        NDC_MULT: 1.15,
      };
      class u {
        constructor(e) {
          (this.currentTextConfig = u.defaultTextConfig),
            e ? this.updateTextStyle(e) : this.updateTextStyle(u.defaultTextConfig);
        }
        updateTextStyle(e) {
          this.currentTextConfig = Object.assign(Object.assign({}, this.currentTextConfig), e);
        }
        createLabel(e = { text: '' }) {
          return new l(Object.assign(Object.assign({}, this.currentTextConfig), e));
        }
        async preload(e = { text: '' }) {
          const t = Object.assign(Object.assign({}, this.currentTextConfig), e);
          return new Promise((e) => {
            var i;
            (0, n.C5)(
              {
                font: `${null !== (i = t.assetBasePath) && void 0 !== i ? i : ''}${t.fontPath}`,
                characters: t.text,
              },
              e,
            );
          });
        }
        static makeConfig(e) {
          return Object.assign(Object.assign({}, u.defaultTextConfig), e);
        }
      }
      u.defaultTextConfig = {
        text: '',
        fontPath: 'fonts/roboto-700.woff',
        align: 'center',
        wordWrapWidth: void 0,
        color: 'black',
        backgroundColor: 'white',
        backgroundBorderWidth: 0.9,
        backgroundBorderHeight: 0.7,
        background: !0,
        backgroundAsCollider: !0,
        backgroundColliderType: s.Mesh,
        scale: 1,
        outline: !1,
        outlineWidth: 0.06,
      };
    },
    73868: (e) => {
      e.exports =
        'precision highp float;uniform float aaPaddingPx;uniform vec3 color;uniform float opacity;varying vec2 vOffsetPx;uniform float outline;uniform vec3 outlineColor;varying vec2 scaledWidthHeightPx;float sdTriangle(vec2 p,vec2 p0,vec2 p1,vec2 p2){vec2 e0=p1-p0;vec2 e1=p2-p1;vec2 e2=p0-p2;vec2 v0=p-p0;vec2 v1=p-p1;vec2 v2=p-p2;vec2 pq0=v0-e0*clamp(dot(v0,e0)/dot(e0,e0),0.,1.);vec2 pq1=v1-e1*clamp(dot(v1,e1)/dot(e1,e1),0.,1.);vec2 pq2=v2-e2*clamp(dot(v2,e2)/dot(e2,e2),0.,1.);float s=e0.x*e2.y-e0.y*e2.x;vec2 d=min(min(vec2(dot(pq0,pq0),s*(v0.x*e0.y-v0.y*e0.x)),vec2(dot(pq1,pq1),s*(v1.x*e1.y-v1.y*e1.x))),vec2(dot(pq2,pq2),s*(v2.x*e2.y-v2.y*e2.x)));return-sqrt(d.x)*sign(d.y);}void main(){float padding=aaPaddingPx+outline;float halfWidth=scaledWidthHeightPx.x/2.;vec2 p0=vec2(-halfWidth,scaledWidthHeightPx.y+padding);vec2 p1=vec2(halfWidth,scaledWidthHeightPx.y+padding);vec2 p2=vec2(0.,padding);float sd=sdTriangle(vOffsetPx,p0,p1,p2);float aaOpacity=1.-smoothstep(outline,outline+0.5,sd);float colorMix=smoothstep(0.,outline,sd);vec3 colorWithOutline=mix(color,outlineColor,colorMix);gl_FragColor=vec4(colorWithOutline,aaOpacity*opacity);}';
    },
    25888: (e) => {
      e.exports =
        'precision highp float;uniform vec2 screenSize;vec2 rotate90(vec2 v){return vec2(-v.y,v.x);}vec2 ndcToScreen(vec4 pt){return(vec2(pt.x,pt.y)+vec2(1.,1.))*screenSize/2.;}vec2 screenToNdc(vec2 pt){return(pt*2./screenSize)-vec2(1.,1.);}\n#define MIN_SCALE  0.4\n#define MIN_METERS_PER_PX  0.006\n#define MAX_METERS_PER_PX  0.012\nuniform float tipPaddingPx;uniform float widthPx;uniform float heightPx;uniform float aaPaddingPx;uniform float metersPerPx;uniform float outline;uniform vec2 tip;uniform vec2 normal;uniform float height;uniform float autoScale;attribute vec2 offset;uniform mat4 projectionMatrix;uniform mat4 modelViewMatrix;varying vec2 vOffsetPx;varying vec2 scaledWidthHeightPx;vec2 scaleByZoom(){float t=clamp((metersPerPx-MIN_METERS_PER_PX)/(MAX_METERS_PER_PX-MIN_METERS_PER_PX),0.,1.);float scale=1.;if(autoScale>0.){scale=mix(1.,MIN_SCALE,t);}return vec2(widthPx,heightPx)*scale;}void main(){vec2 yAxis=normal;vec2 xAxis=rotate90(yAxis);vec4 tipWorld=vec4(tip.x,height,tip.y,1.);vec4 xOffsetWorld=tipWorld+vec4(xAxis.x,0.,xAxis.y,0.);vec4 yOffsetWorld=tipWorld+vec4(yAxis.x,0.,yAxis.y,0.);vec4 ndcTip=projectionMatrix*modelViewMatrix*tipWorld;vec2 tipScreen=ndcToScreen(ndcTip/ndcTip.w);vec4 ndcXOffset=projectionMatrix*modelViewMatrix*xOffsetWorld;vec2 xOffsetScreen=ndcToScreen(ndcXOffset/ndcXOffset.w);vec4 ndcYOffset=projectionMatrix*modelViewMatrix*yOffsetWorld;vec2 yOffsetScreen=ndcToScreen(ndcYOffset/ndcYOffset.w);vec2 xAxisScreen=normalize(xOffsetScreen-tipScreen);vec2 yAxisScreen=normalize(yOffsetScreen-tipScreen);float padding=aaPaddingPx+outline;scaledWidthHeightPx=scaleByZoom();float halfWidth=scaledWidthHeightPx.x/2.+padding;float quadHeight=scaledWidthHeightPx.y+padding*2.;vec2 vertexScreen=(tipScreen+yAxisScreen*tipPaddingPx)+xAxisScreen*halfWidth*offset.x+yAxisScreen*quadHeight*offset.y;vec2 ndcVert=screenToNdc(vertexScreen);vOffsetPx=vec2(offset.x*halfWidth,offset.y*quadHeight);gl_Position=vec4(ndcVert*ndcTip.w,ndcTip.z,ndcTip.w);}';
    },
    72292: (e) => {
      e.exports =
        'precision highp float;uniform float opacity;uniform float centerSpacing;uniform float radius;uniform vec3 color;void main(){vec2 center=mod(gl_FragCoord.xy,vec2(centerSpacing))-vec2(centerSpacing*0.5);float polkaDot=1.-smoothstep(radius-(radius*0.2),radius,length(center));gl_FragColor=vec4(color,opacity*polkaDot);}';
    },
    47706: (e) => {
      e.exports =
        'precision highp float;uniform mat4 projectionMatrix;uniform mat4 modelViewMatrix;attribute vec3 position;void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}';
    },
    73293: (e) => {
      e.exports =
        '#define ANTIALIAS_WIDTH  1.0\nprecision highp float;uniform vec3 outlineColor;uniform vec3 baseColor;uniform float radius;uniform float opacity;uniform float outlinePct;varying vec3 vPosition;void main(){float fragRadius=length(vPosition.xz);float outlineRadius=radius*outlinePct;float smoothAmt=fwidth(fragRadius)*ANTIALIAS_WIDTH;float mixAmt=smoothstep(outlineRadius-smoothAmt,outlineRadius,fragRadius);gl_FragColor=vec4(mix(baseColor,outlineColor,mixAmt),1.);gl_FragColor.a=opacity*(1.-smoothstep(radius-smoothAmt,radius,fragRadius));}';
    },
    67498: (e) => {
      e.exports =
        'precision highp float;uniform mat4 projectionMatrix;uniform mat4 modelViewMatrix;attribute vec3 position;varying vec3 vPosition;void main(){vPosition=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}';
    },
    14536: (e) => {
      e.exports =
        'precision highp float;uniform vec3 baseColor;uniform float isDoor;varying vec3 vPosition;void main(){const float lineWidth=0.15;if(isDoor>0.){const float startZ=0.15;const float endZ=startZ+lineWidth;float alpha=(abs(vPosition.z)>startZ&&abs(vPosition.z)<endZ)?1.:0.;gl_FragColor=vec4(baseColor,alpha);}else{float alpha=(abs(vPosition.z)<lineWidth*0.5)?1.:0.;gl_FragColor=vec4(baseColor,alpha);}}';
    },
    86242: (e) => {
      e.exports =
        'precision highp float;uniform mat4 projectionMatrix;uniform mat4 modelViewMatrix;attribute vec3 position;varying vec3 vPosition;void main(){vPosition=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}';
    },
    93670: (e) => {
      e.exports =
        '#define ANTIALIAS_WIDTH  1.0\nprecision highp float;uniform float selectedWidth;uniform vec3 outlineColor;uniform vec3 color;uniform float opacity;uniform float width;uniform vec3 lineStart;uniform vec3 lineEnd;varying vec3 vWorldPos;float distanceBetween(vec2 l1,vec2 l2,vec2 p){float D=length(l2-l1);float N=abs((l2.x-l1.x)*(l1.y-p.y)-(l1.x-p.x)*(l2.y-l1.y));return N/D;}void main(){float distanceToLine=distanceBetween(lineStart.xz,lineEnd.xz,vWorldPos.xz);float aaWidth=fwidth(distanceToLine)*ANTIALIAS_WIDTH;float lineLerp=smoothstep(selectedWidth-aaWidth,selectedWidth,distanceToLine);float halfWidth=width*0.5;float aaOpacity=smoothstep(halfWidth,halfWidth-aaWidth,distanceToLine);gl_FragColor=mix(vec4(outlineColor,opacity*aaOpacity),vec4(color,opacity*aaOpacity),lineLerp);if(gl_FragColor.a<0.01){discard;}}';
    },
    40134: (e) => {
      e.exports =
        'precision highp float;uniform mat4 projectionMatrix;uniform mat4 modelViewMatrix;attribute vec3 position;varying vec3 vWorldPos;void main(){vWorldPos=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}';
    },
    38985: (e) => {
      e.exports =
        'precision highp float;uniform vec3 color;uniform float opacity;uniform float radius;varying vec2 vCenter;varying vec2 vScreenPos;void main(){float distanceFromCenter=length(vScreenPos-vCenter);float sdfOpacity=1.-smoothstep(radius-0.5,radius+0.5,distanceFromCenter);float alpha=sdfOpacity*opacity;if(alpha<0.01){discard;}gl_FragColor=vec4(color,alpha);}';
    },
    49338: (e) => {
      e.exports =
        'precision highp float;uniform vec2 screenSize;vec2 rotate90(vec2 v){return vec2(-v.y,v.x);}vec2 ndcToScreen(vec4 pt){return(vec2(pt.x,pt.y)+vec2(1.,1.))*screenSize/2.;}vec2 screenToNdc(vec2 pt){return(pt*2./screenSize)-vec2(1.,1.);}\n#define ANTIALIAS_BUFFER  10.0\nuniform mat4 projectionMatrix;uniform mat4 modelViewMatrix;uniform float radius;attribute vec3 center;attribute vec2 offsetDirection;varying vec2 vCenter;varying vec2 vScreenPos;void main(){vec4 centerNdc=projectionMatrix*modelViewMatrix*vec4(center,1.);vec2 centerScreen=ndcToScreen(centerNdc/centerNdc.w);vec2 vertexScreen=centerScreen+normalize(offsetDirection)*(radius+ANTIALIAS_BUFFER);vec2 vertexNdc=screenToNdc(vertexScreen);vCenter=centerScreen;vScreenPos=vertexScreen;gl_Position=vec4(vertexNdc*centerNdc.w,centerNdc.z,centerNdc.w);}';
    },
    22999: (e) => {
      var t = {
        kind: 'Document',
        definitions: [
          {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'GetRoomBounds' },
            variableDefinitions: [
              {
                kind: 'VariableDefinition',
                variable: { kind: 'Variable', name: { kind: 'Name', value: 'modelId' } },
                type: {
                  kind: 'NonNullType',
                  type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
                },
                directives: [],
              },
            ],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'model' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'id' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'modelId' } },
                    },
                  ],
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'floors' },
                        arguments: [],
                        directives: [],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                              arguments: [],
                              directives: [],
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'layer' },
                              arguments: [],
                              directives: [],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                    arguments: [],
                                    directives: [],
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'edges' },
                              arguments: [
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'includeUsed' },
                                  value: { kind: 'BooleanValue', value: !0 },
                                },
                              ],
                              directives: [],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'layer' },
                                    arguments: [],
                                    directives: [],
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'id' },
                                          arguments: [],
                                          directives: [],
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'type' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'vertices' },
                                    arguments: [],
                                    directives: [],
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'id' },
                                          arguments: [],
                                          directives: [],
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'layer' },
                                          arguments: [],
                                          directives: [],
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'id' },
                                                arguments: [],
                                                directives: [],
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'position' },
                                          arguments: [],
                                          directives: [],
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'x' },
                                                arguments: [],
                                                directives: [],
                                              },
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'y' },
                                                arguments: [],
                                                directives: [],
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'centerLineBias' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'thickness' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'openings' },
                                    arguments: [],
                                    directives: [],
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'id' },
                                          arguments: [],
                                          directives: [],
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'width' },
                                          arguments: [],
                                          directives: [],
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'relativeCenter' },
                                          arguments: [],
                                          directives: [],
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'type' },
                                          arguments: [],
                                          directives: [],
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'height' },
                                          arguments: [],
                                          directives: [],
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'lowerElevation' },
                                          arguments: [],
                                          directives: [],
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'layer' },
                                          arguments: [],
                                          directives: [],
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'id' },
                                                arguments: [],
                                                directives: [],
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'rooms' },
                        arguments: [],
                        directives: [],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                              arguments: [],
                              directives: [],
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'layer' },
                              arguments: [],
                              directives: [],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                    arguments: [],
                                    directives: [],
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'floor' },
                              arguments: [],
                              directives: [],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                    arguments: [],
                                    directives: [],
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'classifications' },
                              arguments: [],
                              directives: [],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'confidence' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'label' },
                                    arguments: [],
                                    directives: [],
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'boundary' },
                              arguments: [],
                              directives: [],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'edges' },
                                    arguments: [],
                                    directives: [],
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'id' },
                                          arguments: [],
                                          directives: [],
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'holes' },
                              arguments: [],
                              directives: [],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'edges' },
                                    arguments: [],
                                    directives: [],
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'id' },
                                          arguments: [],
                                          directives: [],
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'dimensionEstimates' },
                              arguments: [],
                              directives: [],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'area' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'areaIndoor' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'width' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'depth' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'height' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'units' },
                                    arguments: [],
                                    directives: [],
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'ceiling' },
                              arguments: [],
                              directives: [],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'planes' },
                                    arguments: [],
                                    directives: [],
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'measurements' },
                                          arguments: [],
                                          directives: [],
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'bottom' },
                                                arguments: [],
                                                directives: [],
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'x' },
                                                      arguments: [],
                                                      directives: [],
                                                    },
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'y' },
                                                      arguments: [],
                                                      directives: [],
                                                    },
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'z' },
                                                      arguments: [],
                                                      directives: [],
                                                    },
                                                  ],
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'height' },
                                                arguments: [],
                                                directives: [],
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'maxHeight' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'minHeight' },
                                    arguments: [],
                                    directives: [],
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'label' },
                              arguments: [],
                              directives: [],
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'keywords' },
                              arguments: [],
                              directives: [],
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'GetRoomClassifications' },
            variableDefinitions: [],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'roomClassifications' },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'id' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'label' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'defaultKeywords' },
                        arguments: [],
                        directives: [],
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
        loc: { start: 0, end: 1109 },
      };
      t.loc.source = {
        body: 'query GetRoomBounds($modelId: ID!) {\n  model(id: $modelId) {\n    floors {\n      id\n      layer { id }\n      edges(includeUsed: true) {\n        id\n        layer { id }\n        type\n        vertices { id layer { id } position { x y }}\n        centerLineBias\n        thickness\n        openings {\n          id\n          width\n          relativeCenter\n          type\n          height\n          lowerElevation\n          layer { id }\n        }\n      }\n    }\n    rooms {\n      id\n      layer { id }\n      floor { id }\n      classifications {\n        id\n        confidence\n        label\n      }\n      boundary {\n        edges { id }\n      }\n      holes {\n        edges { id }\n      }\n      dimensionEstimates {\n        area\n        areaIndoor\n        width\n        depth\n        height\n        units\n      }\n      ceiling {\n        planes {\n          measurements {\n            bottom { x y z }\n            height\n          }\n        }\n        maxHeight\n        minHeight\n      }\n      label\n      keywords\n    }\n  }\n}\n\nquery GetRoomClassifications {\n  roomClassifications {\n    id\n    label\n    defaultKeywords\n  }\n}\n',
        name: 'GraphQL request',
        locationOffset: { line: 1, column: 1 },
      };
      function i(e, t) {
        if ('FragmentSpread' === e.kind) t.add(e.name.value);
        else if ('VariableDefinition' === e.kind) {
          var s = e.type;
          'NamedType' === s.kind && t.add(s.name.value);
        }
        e.selectionSet &&
          e.selectionSet.selections.forEach(function (e) {
            i(e, t);
          }),
          e.variableDefinitions &&
            e.variableDefinitions.forEach(function (e) {
              i(e, t);
            }),
          e.definitions &&
            e.definitions.forEach(function (e) {
              i(e, t);
            });
      }
      var s = {};
      function n(e, t) {
        for (var i = 0; i < e.definitions.length; i++) {
          var s = e.definitions[i];
          if (s.name && s.name.value == t) return s;
        }
      }
      function a(e, t) {
        var i = { kind: e.kind, definitions: [n(e, t)] };
        e.hasOwnProperty('loc') && (i.loc = e.loc);
        var a = s[t] || new Set(),
          o = new Set(),
          r = new Set();
        for (
          a.forEach(function (e) {
            r.add(e);
          });
          r.size > 0;

        ) {
          var h = r;
          (r = new Set()),
            h.forEach(function (e) {
              o.has(e) ||
                (o.add(e),
                (s[e] || new Set()).forEach(function (e) {
                  r.add(e);
                }));
            });
        }
        return (
          o.forEach(function (t) {
            var s = n(e, t);
            s && i.definitions.push(s);
          }),
          i
        );
      }
      t.definitions.forEach(function (e) {
        if (e.name) {
          var t = new Set();
          i(e, t), (s[e.name.value] = t);
        }
      }),
        (e.exports = t),
        (e.exports.GetRoomBounds = a(t, 'GetRoomBounds')),
        (e.exports.GetRoomClassifications = a(t, 'GetRoomClassifications'));
    },
    34029: (e) => {
      var t = {
        kind: 'Document',
        definitions: [
          {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'GetScans' },
            variableDefinitions: [
              {
                kind: 'VariableDefinition',
                variable: { kind: 'Variable', name: { kind: 'Name', value: 'modelId' } },
                type: {
                  kind: 'NonNullType',
                  type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
                },
                directives: [],
              },
            ],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'model' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'id' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'modelId' } },
                    },
                  ],
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'id' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'assets' },
                        arguments: [],
                        directives: [],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'scans' },
                              arguments: [],
                              directives: [],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'FragmentSpread',
                                    name: { kind: 'Name', value: 'ScanDetails' },
                                    directives: [],
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'ScanDetails' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Scan' } },
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'id' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'index' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'name' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'created' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'alignment' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'options' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'url' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'timeOfDay' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'anchor' },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'id' },
                        arguments: [],
                        directives: [],
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'camera' },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'id' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'name' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'vendor' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'model' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'captureMode' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'depthCameraType' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'cameraTypes' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sensorSerialNumbers' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'serialNumber' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'mountCalibrationVersion' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'softwareVersion' },
                        arguments: [],
                        directives: [],
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
        loc: { start: 0, end: 452 },
      };
      t.loc.source = {
        body: 'query GetScans($modelId: ID!) {\n  model(id: $modelId) {\n    id\n    assets {\n      scans {\n        ...ScanDetails\n      }\n    }\n  }\n}\n\nfragment ScanDetails on Scan {\n  id\n  index\n  name\n  created\n  alignment\n  options\n  url\n  timeOfDay\n  anchor {\n    id\n  }\n  camera {\n    id\n    name\n    vendor\n    model\n    captureMode\n    depthCameraType\n    cameraTypes\n    sensorSerialNumbers\n    serialNumber\n    mountCalibrationVersion\n    softwareVersion\n  }\n}\n',
        name: 'GraphQL request',
        locationOffset: { line: 1, column: 1 },
      };
      function i(e, t) {
        if ('FragmentSpread' === e.kind) t.add(e.name.value);
        else if ('VariableDefinition' === e.kind) {
          var s = e.type;
          'NamedType' === s.kind && t.add(s.name.value);
        }
        e.selectionSet &&
          e.selectionSet.selections.forEach(function (e) {
            i(e, t);
          }),
          e.variableDefinitions &&
            e.variableDefinitions.forEach(function (e) {
              i(e, t);
            }),
          e.definitions &&
            e.definitions.forEach(function (e) {
              i(e, t);
            });
      }
      var s = {};
      function n(e, t) {
        for (var i = 0; i < e.definitions.length; i++) {
          var s = e.definitions[i];
          if (s.name && s.name.value == t) return s;
        }
      }
      function a(e, t) {
        var i = { kind: e.kind, definitions: [n(e, t)] };
        e.hasOwnProperty('loc') && (i.loc = e.loc);
        var a = s[t] || new Set(),
          o = new Set(),
          r = new Set();
        for (
          a.forEach(function (e) {
            r.add(e);
          });
          r.size > 0;

        ) {
          var h = r;
          (r = new Set()),
            h.forEach(function (e) {
              o.has(e) ||
                (o.add(e),
                (s[e] || new Set()).forEach(function (e) {
                  r.add(e);
                }));
            });
        }
        return (
          o.forEach(function (t) {
            var s = n(e, t);
            s && i.definitions.push(s);
          }),
          i
        );
      }
      t.definitions.forEach(function (e) {
        if (e.name) {
          var t = new Set();
          i(e, t), (s[e.name.value] = t);
        }
      }),
        (e.exports = t),
        (e.exports.GetScans = a(t, 'GetScans')),
        (e.exports.ScanDetails = a(t, 'ScanDetails'));
    },
  },
]);
