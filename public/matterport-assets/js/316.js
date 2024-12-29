/*! For license information please see 316.js.LICENSE.txt */
'use strict';
(self.webpackChunkmp_webgl = self.webpackChunkmp_webgl || []).push([
  [316],
  {
    53671: (e, t, i) => {
      i.r(t),
        i.d(t, {
          NavigationVisuals: () => g,
          default: () => f,
          visDollhouseNavigation: () => m,
          visPanoNavigation: () => w,
        });
      var s = i(34608),
        o = i(4763),
        n = i(46522),
        a = i(32197),
        r = i(58057),
        c = i(52281),
        h = i(57793),
        l = i(33716),
        d = i(31740),
        u = i(90512),
        p = i(64150);
      class g {
        constructor(e, t, i) {
          (this.engine = e),
            (this.dynamicNumber = t),
            (this.smoothWalk = i),
            (this.active = !1),
            (this.draw = new n.M()),
            Promise.all([
              this.engine.getModuleBySymbol(o.Aj),
              this.engine.market.waitForData(l.P),
              this.engine.getModuleBySymbol(o.hi),
              this.engine.market.waitForData(p.e),
            ]).then(([e, t, i, s]) => {
              var o;
              (this.meshQuery = i),
                this.draw.setStyle({
                  assetBasePath:
                    null !== (o = s.getProperty('assetBasePath')) && void 0 !== o ? o : '',
                }),
                this.draw.addToScene(e.getScene()),
                (this.subscription = t.onChanged(() => this.update(this.draw, t))),
                this.subscription.cancel();
            }),
            this.engine.getModuleBySymbol(s.Ak).then((e) => {
              const t = 'Navigation';
              [
                {
                  header: t,
                  setting: 'navDebugEnabled',
                  initialValue: () => this.active,
                  onChange: (e) => this.toggle(e),
                  urlParam: !0,
                },
                {
                  header: t,
                  setting: 'Max transition dist',
                  initialValue: () => c.E.longerTransitionMaxDist,
                  range: [3, 50],
                  rangePrecision: 1,
                  onChange: (e) => (c.E.longerTransitionMaxDist = e),
                },
                {
                  header: t,
                  setting: 'accel',
                  initialValue: () => this.dynamicNumber.acceleration,
                  range: [1, 60],
                  rangePrecision: 0.5,
                  onChange: (e) => {
                    this.dynamicNumber.setAccel(e);
                  },
                },
                {
                  header: t,
                  setting: 'top speed',
                  initialValue: () => this.dynamicNumber.maxSpeed,
                  range: [1, 40],
                  rangePrecision: 0.5,
                  onChange: (e) => this.dynamicNumber.setMaxSpeed(e),
                },
                {
                  header: t,
                  setting: 'queue ms',
                  initialValue: () => this.smoothWalk.repeatedQueueDelayMS,
                  range: [0, 1e3],
                  onChange: (e) => (this.smoothWalk.repeatedQueueDelayMS = e),
                },
              ].forEach((t) => e.registerMenuEntry(t));
            });
        }
        toggle(e) {
          this.active !== e &&
            (e || this.draw.toggleAll(!1),
            e || this.subscription.cancel(),
            e && this.subscription.renew(),
            (this.active = e));
        }
        update(e, t) {
          const i = this.engine.market.tryGetData(d.Z),
            s = this.engine.market.tryGetData(h.M),
            o = this.engine.market.tryGetData(u.O);
          e &&
            i &&
            s &&
            o &&
            (e.toggleAll(!1),
            t.hit &&
              this.meshQuery.floorIdFromObject(t.hit.object) &&
              (o.isInside()
                ? w(e, i, s, t.hit.intersection)
                : m(e, i, t.hit.intersection, this.meshQuery)));
        }
      }
      const w = (e, t, i, s) => {
          let o = 0;
          const n = s.point.clone().sub(i.pose.position),
            c = (0, r.Tq)(t, n),
            h = Math.max(...c.map((e) => e.score)),
            l = h - 5;
          for (const { sweep: t, score: i } of c)
            if (t) {
              const n = 0 === o ? 'cyan' : 'orange',
                r = (0, a.dS)(i, l, h, 0, 0.6);
              e.line('panosphere' + o++, n)
                .toggle(!0)
                .updatePositions(s.point, t.position)
                .opacity(r);
              const c = (0, a.dS)(r, 0, 0.6, 0, 0.1);
              e.sphere('panosphere' + o++, { color: n, opacity: 0.8 })
                .toggle(!0)
                .update(t.position, c);
            }
        },
        m = (e, t, i, s) => {
          let o = 0;
          const n = (0, r.bG)(t, !1, i, s),
            c = Math.max(...n.map((e) => e.score)),
            h = c - 15;
          for (const { sweep: t, score: s } of n)
            if (t) {
              const n = 0 === o ? 'cyan' : 'orange',
                r = (0, a.dS)(s, h, c, 0, 1);
              e.line('panosphere' + o++, n)
                .toggle(!0)
                .updatePositions(i.point, t.position)
                .opacity(r);
              const l = (0, a.dS)(r, 0, 1, 0, 0.3);
              e.sphere('panosphere' + o++, { color: n })
                .toggle(!0)
                .update(t.position, l);
            }
        };
      function f(e) {
        e.getModuleBySymbol(o.wR).then((t) => {
          const i = t.navigationWalk,
            s = i.positionTracker;
          new g(e, s, i);
        });
      }
    },
    91416: (e, t, i) => {
      i.r(t), i.d(t, { default: () => h });
      var s = i(5429),
        o = i(53257),
        n = i(34608),
        a = i(4763);
      const r = new o.Z('raycaster-debug');
      class c {
        constructor(e) {
          Promise.all([
            e.getModuleBySymbol(n.Ak),
            e.getModuleBySymbol(a.Aj),
            e.getModuleBySymbol(a.fQ),
          ]).then(([e, t, i]) => {
            const o = t.getScene(),
              n = [];
            let a = !1;
            const c = () => {
                n &&
                  n.forEach((e) => {
                    e.geometry.dispose(), e.material.dispose(), o.remove(e);
                  });
              },
              h = (e, t, a) => {
                r.info('draw', { from: e, to: t, faces: a });
                const c = i.getOctree().getDebugBoundsMesh((0, s.rn)().getHex(), e, t, a);
                (c.frustumCulled = !1), c.updateMatrixWorld(!0), o.add(c), n.push(c);
              };
            e.registerMenuButton({
              header: 'Raycaster',
              buttonName: 'Add Octree Level Buttons',
              callback: () => {
                if (!a) {
                  for (let t = 0; t <= i.getOctree().depth; t++)
                    e.registerMenuButton({
                      header: 'Octree Levels',
                      buttonName: `Anything on Level: ${t}`,
                      callback: () => {
                        c(), h(t, t, !1);
                      },
                    });
                  for (let t = 0; t <= i.getOctree().depth; t++)
                    e.registerMenuButton({
                      header: 'Octree Faces',
                      buttonName: `Faces on Level: ${t}`,
                      callback: () => {
                        c(), h(t, t, !0);
                      },
                    });
                  a = !0;
                }
              },
            }),
              e.registerMenuButton({
                header: 'Raycaster',
                buttonName: 'Visualize Octree - All',
                callback: () => {
                  c();
                  for (let e = 0; e <= i.getOctree().depth; e++) h(e, e, !1);
                },
              }),
              e.registerMenuButton({
                header: 'Raycaster',
                buttonName: 'Visualize Octree - Faces',
                callback: () => {
                  c();
                  for (let e = 0; e <= i.getOctree().depth; e++) h(e, e, !0);
                },
              }),
              e.registerMenuButton({
                header: 'Raycaster',
                buttonName: 'Clear Octree Visuals',
                callback: c,
              });
          });
        }
      }
      function h(e) {
        new c(e);
      }
    },
    83947: (e, t, i) => {
      i.r(t), i.d(t, { default: () => f });
      var s = i(34608),
        o = i(4763),
        n = i(81396),
        a = i(46522),
        r = i(32197),
        c = i(25565),
        h = i(3835),
        l = i(57793),
        d = i(33716),
        u = i(26302);
      const p = new (i(53257).Z)('raycaster-debug');
      var g;
      !(function (e) {
        (e.normal = 'normal'), (e.hitClass = 'hitClass'), (e.hitBounds = 'hitBounds');
      })(g || (g = {}));
      const w = { color: 'yellow' };
      class m {
        constructor(e) {
          (this.engine = e),
            (this.cached = { v1: new n.Vector3(), v2: new n.Vector3(), quat: new n.Quaternion() }),
            (this.showClass = !1),
            (this.showName = !0),
            (this.showNormal = !1),
            (this.showBounds = !1),
            (this.drawRaycastHitNormal = (e) => {
              const t = this.draw.line(g.normal, 'red', 4);
              e &&
                t.updatePositions(
                  e.point,
                  this.cached.v1.copy(e.point).addScaledVector(e.normal, 0.2),
                ),
                t.toggle(null !== e);
            }),
            (this.drawRaycastObjectInfo = (e, t, i, s) => {
              const o = this.draw.label(g.hitClass, 'X', this.cached.v1, 1);
              if (((o.visible = !1), e && t && (i || s))) {
                const { position: n, rotation: a } = t.pose,
                  { point: c, object: l } = e,
                  d = i ? l.__proto__.constructor.name : '',
                  u = s ? ('' !== l.name ? l.name : l.id) : '';
                (o.text = `${d} - ${u}`),
                  o.setPosition(c, (e) =>
                    t.isOrtho() ? e.addScaledVector(h.fU.UP, 10) : (0, r.Xe)(n, e, 1, e),
                  ),
                  o.scaleBillboard(n, a, t.pose.projection, t.zoom(), t.height, t.aspect(), 0.1),
                  o.setOrientation(a),
                  (o.visible = !0);
              }
            }),
            (this.drawRaycastHitBounds = (e) => {
              const t = this.draw.boxWire(g.hitBounds, w).toggle(!1);
              if (e && e.object && !(e.object instanceof u.i) && e.object instanceof n.Mesh) {
                const i = (0, c.A5)(e.object.geometry),
                  s = i.getCenter(this.cached.v1).applyMatrix4(e.object.matrixWorld),
                  o = i.getSize(this.cached.v2).multiply(e.object.scale).multiplyScalar(0.5);
                t.mesh.quaternion.copy(e.object.quaternion), t.toggle(!0).update(s, o);
              }
            }),
            (this.onPointerDown = () => {
              const e = this.data.hit;
              e && e.object && p.warn(e.object, e);
            }),
            Promise.all([e.getModuleBySymbol(s.Ak), e.market.waitForData(d.P)]).then(([e, t]) => {
              this.data = t;
              const i = t.onChanged(() => this.update(t));
              i.cancel();
              const s = (e) => {
                e
                  ? (window.addEventListener('pointerdown', this.onPointerDown), i.renew())
                  : (window.removeEventListener('pointerdown', this.onPointerDown),
                    i.cancel(),
                    this.draw.toggleAll(!1));
              };
              e.registerMenuEntry({
                header: 'Raycaster',
                setting: 'raycasterHitDebugging',
                initialValue: () => !1,
                onChange: (e) => {
                  s(e);
                },
                urlParam: !0,
              }),
                e.registerMenuEntry({
                  header: 'Raycaster',
                  setting: 'raycasterHitClass',
                  initialValue: () => this.showClass,
                  onChange: (e) => {
                    this.showClass = e;
                  },
                  urlParam: !0,
                }),
                e.registerMenuEntry({
                  header: 'Raycaster',
                  setting: 'raycasterHitName',
                  initialValue: () => this.showName,
                  onChange: (e) => {
                    this.showName = e;
                  },
                  urlParam: !0,
                }),
                e.registerMenuEntry({
                  header: 'Raycaster',
                  setting: 'raycasterHitNormal',
                  initialValue: () => this.showNormal,
                  onChange: (e) => {
                    this.showNormal = e;
                  },
                  urlParam: !0,
                }),
                e.registerMenuEntry({
                  header: 'Raycaster',
                  setting: 'raycasterHitBounds',
                  initialValue: () => this.showBounds,
                  onChange: (e) => {
                    this.showBounds = e;
                  },
                  urlParam: !0,
                });
            });
        }
        get draw() {
          return (
            this._draw ||
              ((this._draw = new a.M({ background: !1, color: 'red' })),
              this.engine.getModuleBySymbol(o.Aj).then((e) => this._draw.addToScene(e.getScene()))),
            this._draw
          );
        }
        update(e) {
          const t = this.engine.market.tryGetData(l.M);
          this.showNormal && this.drawRaycastHitNormal(e.hit),
            this.showBounds && this.drawRaycastHitBounds(e.hit),
            this.drawRaycastObjectInfo(e.hit, t, this.showClass, this.showName);
        }
      }
      function f(e) {
        new m(e);
      }
    },
    45251: (e, t, i) => {
      i.r(t), i.d(t, { default: () => l });
      var s = i(34608),
        o = i(4763),
        n = i(81396),
        a = i(3655),
        r = i(65897),
        c = i(41492);
      const h = 'Snapping';
      async function l(e) {
        const [t, i, l] = await Promise.all([
            e.getModuleBySymbol(s.Ak),
            await e.getModuleBySymbol(o.fQ),
            e.getModuleBySymbol(o.Aj),
          ]),
          d = i.snapping,
          u = l.getScene().scene;
        t.registerMenuEntry({
          header: h,
          setting: 'snappingMaxLOD',
          initialValue: () => c.t.snappingMaxLOD,
          onChange: (e) => {
            c.t.snappingMaxLOD = e;
          },
          urlParam: !0,
          rangePrecision: 0,
          range: [0, 3],
        }),
          (function (e, t, i) {
            const s = new n.BufferGeometry(),
              o = new n.LineSegments(s, new n.LineBasicMaterial({ vertexColors: !0 }));
            o.frustumCulled = !1;
            const r = new n.SphereGeometry(0.02, 5, 5);
            let c;
            const l = [16711680, 65280, 255, 16777215],
              d = new n.Color(),
              u = new n.Matrix4().identity(),
              p = new n.Group();
            let g;
            function w() {
              const e = [],
                i = [],
                h = [],
                g = [];
              t.forEachSnapFeature((t) => {
                var s, o, n;
                if (
                  (d.setHex(
                    l[
                      (null ===
                        (n =
                          null === (o = null === (s = t.meta) || void 0 === s ? void 0 : s.tile) ||
                          void 0 === o
                            ? void 0
                            : o.extras) || void 0 === n
                        ? void 0
                        : n.level) || 0
                    ],
                  ),
                  t instanceof a.FM)
                ) {
                  const { start: s, end: o } = t;
                  e.push(s.x, s.y, s.z, o.x, o.y, o.z), i.push(d.r, d.g, d.b, d.r, d.g, d.b);
                } else t instanceof a.UQ && (h.push(t.x, t.y, t.z), g.push(d.r, d.g, d.b));
              }, !0),
                s.dispose(),
                s.setAttribute('position', new n.Float32BufferAttribute(e, 3)),
                s.setAttribute('color', new n.Float32BufferAttribute(i, 3)),
                (c && 3 * c.count === h.length) ||
                  (c && (p.remove(c), null == c || c.dispose()),
                  (c = new n.InstancedMesh(r, new n.MeshBasicMaterial(), h.length / 3)));
              for (let e = 0; e < h.length; e += 3)
                c.setMatrixAt(e / 3, u.setPosition(h[e], h[e + 1], h[e + 2])),
                  c.setColorAt(e / 3, d.setRGB(g[e], g[e + 1], g[e + 2]));
              p.add(o, c);
            }
            e.registerMenuEntry({
              header: h,
              setting: 'Show Snapping Features',
              initialValue: () => !1,
              onChange(e) {
                e
                  ? (i.add(p), (g = setInterval(w, 300)))
                  : (null == c || c.dispose(),
                    r.dispose(),
                    s.dispose(),
                    i.remove(p),
                    clearInterval(g));
              },
            });
          })(t, d, u),
          (function (e, t, i, s) {
            const o = [];
            let a, c;
            function l() {
              c ||
                ((c = new n.Mesh(
                  new n.BufferGeometry(),
                  new n.MeshBasicMaterial({ vertexColors: !0 }),
                )),
                (c.frustumCulled = !1),
                i.add(c));
              const e = [],
                t = [];
              for (const i of o) {
                let s = 0;
                for (const o of i.surfaces) {
                  const i = o.area > 0.1,
                    n = Math.sin(s++) / 2 + 0.5,
                    a = i ? 0 : 0.2 + 0.8 * n,
                    r = i ? 0.2 + 0.8 * n : 0,
                    c = 0;
                  for (const i of o.faces) {
                    const s = i.va.vector,
                      o = i.vb.vector,
                      n = i.vc.vector;
                    e.push(s.x, s.y, s.z),
                      e.push(o.x, o.y, o.z),
                      e.push(n.x, n.y, n.z),
                      t.push(a, r, c, a, r, c, a, r, c);
                  }
                }
              }
              c.geometry.dispose(),
                c.geometry.setAttribute('position', new n.Float32BufferAttribute(e, 3)),
                c.geometry.setAttribute('color', new n.Float32BufferAttribute(t, 3));
            }
            function d(e) {
              o.push(e.edgeFinder);
            }
            [
              {
                header: h,
                setting: 'Collect Snapping Surfaces',
                initialValue: () => !1,
                onChange(e) {
                  e ? s.subscribe(r.x, d) : (s.unsubscribe(r.x, d), (o.length = 0));
                },
              },
              {
                header: 'Snapping',
                setting: 'Show Snapping Surfaces',
                initialValue: () => !1,
                onChange(e) {
                  clearInterval(a),
                    e
                      ? (a = setInterval(() => {
                          t.preloadMeshSnapping(), l();
                        }, 1e3))
                      : c && (c.geometry.dispose(), i.remove(c), (c = null));
                },
              },
            ].forEach((t) => e.registerMenuEntry(t));
          })(t, d, u, e);
      }
    },
    30693: (e, t, i) => {
      i.r(t), i.d(t, { PanoPreloadVisualizer: () => y, default: () => M });
      var s = i(53257),
        o = i(34608),
        n = i(4763),
        a = i(46522),
        r = i(25541),
        c = i(57793),
        h = i(33716),
        l = i(31740),
        d = i(90512),
        u = i(84376),
        p = i(81396),
        g = i(3835),
        w = i(38063),
        m = i(26059),
        f = i(90288);
      const b = new s.Z('previs');
      class y {
        constructor(e, t, i) {
          (this.engine = e),
            (this.downloadDescriptorGetter = t),
            (this.prioritizer = i),
            (this.allPreloadedSweeps = new Set()),
            (this.active = !1),
            (this.freezeCameraRotation = !1),
            (this.sweepIndex = 50),
            (this.useCurrentCriteria = !0),
            (this.showPreloadIds = !0),
            (this.visualTour = !1),
            (this.showSweepLabels = !1),
            (this.draw = new a.M()),
            this.engine.getModuleBySymbol(n.Aj).then((e) => this.draw.addToScene(e.getScene())),
            this.engine.market.waitForData(h.P).then((e) => {
              (this.subscription = e.onChanged(() => this.update(this.draw))),
                this.subscription.cancel();
            });
          const s = this.engine.market.tryGetData(l.Z);
          if (s) {
            this.sweepData = s;
            const e = s.getSweepList(),
              t = new r.Z((e) => e.id);
            for (let i of e)
              i.isObservableProxy && (i = new u.ZP({ platformId: i.platformId }).copy(i)), t.add(i);
            this.sweepMap = t;
          }
          this.engine.getModuleBySymbol(o.Ak).then((e) => {
            const t = 'Pano Preload',
              i = [
                {
                  header: t,
                  setting: 'ShowVis',
                  initialValue: () => this.active,
                  onChange: (e) => this.toggle(e),
                },
                {
                  header: t,
                  setting: 'Use Camera',
                  initialValue: () => this.useCurrentCriteria,
                  onChange: (e) => {
                    (this.useCurrentCriteria = e), this.update(this.draw);
                  },
                },
                {
                  header: t,
                  setting: 'Freeze Rotation',
                  initialValue: () => this.freezeCameraRotation,
                  onChange: (e) => {
                    (this.freezeCameraRotation = e), this.update(this.draw);
                  },
                },
                {
                  header: t,
                  setting: 'Show preload ids',
                  initialValue: () => this.showPreloadIds,
                  onChange: (e) => {
                    (this.showPreloadIds = e), this.update(this.draw);
                  },
                },
                {
                  header: t,
                  setting: 'Visual tour',
                  initialValue: () => this.visualTour,
                  onChange: (e) => {
                    (this.visualTour = e), this.update(this.draw);
                  },
                },
                {
                  header: t,
                  setting: 'Pano labels',
                  initialValue: () => this.showSweepLabels,
                  onChange: (e) => {
                    (this.showSweepLabels = e), this.update(this.draw);
                  },
                },
                {
                  header: t,
                  setting: 'Override Sweep',
                  initialValue: () => 0,
                  onChange: (e) => this.updateSweepIndex(e),
                  range: [0, this.sweepMap.count()],
                },
              ];
            e.registerMenuButton({
              header: 'Pano Preload tour',
              buttonName: 'Tour',
              callback: () => {
                this.activateTourMode();
              },
            }),
              i.forEach((t) => e.registerMenuEntry(t));
          });
        }
        updateSweepIndex(e) {
          const t = Math.round(e);
          (this.sweepIndex = t), this.update(this.draw);
        }
        toggle(e) {
          this.active !== e &&
            (e && this.subscription.renew(),
            e || (this.subscription.cancel(), this.draw.toggleAll(!1)),
            (this.active = e));
        }
        update(e) {
          const t = this.engine.market.tryGetData(l.Z),
            i = this.engine.market.tryGetData(c.M),
            s = this.engine.market.tryGetData(d.O);
          if (!(e && t && i && s)) return;
          if (!this.active || !this.sweepMap) return;
          if (this.tourMode && !this.visualTour) return;
          const o = t.getSweepList(),
            n = this.useCurrentCriteria ? this.prioritizer.priorityCriteria : this.criteria;
          if (this.useCurrentCriteria) {
            if (this.freezeCameraRotation) {
              if (!n.sweep) return;
              n.set({
                position: n.sweep.position,
                rotation: this.lastCriteria.rotation,
                direction: g.fU.FORWARD.clone().applyQuaternion(this.lastCriteria.rotation),
              });
            }
          } else if (
            (n.set({ sweep: this.sweepData.getSweepByIndex(this.sweepIndex) || null }),
            !this.freezeCameraRotation)
          ) {
            if (!n.sweep) return;
            n.set({
              position: n.sweep.position,
              rotation: i.pose.rotation,
              direction: g.fU.FORWARD.clone().applyQuaternion(i.pose.rotation),
            });
          }
          if (((this.lastCriteria = n.clone()), !n.sweep)) return;
          this.tourMode || this.wipePreloadedData();
          const a = [];
          (this.prioritizer.priorityCriteria = n),
            this.prioritizer.filterAndPrioritize(a, this.downloadDescriptorGetter);
          const r = new Set();
          let h = '';
          for (const e of a)
            e &&
              e.sweep &&
              (r.has(e.sweep.id) || (r.add(e.sweep.id), (h += `${e.sweep.index}, `)),
              this.allPreloadedSweeps.has(e.sweep.id) || this.allPreloadedSweeps.add(e.sweep.id));
          const u = new p.Vector3(0, 0, -1.5).applyQuaternion(i.pose.rotation),
            w = new p.Vector3().copy(i.pose.position).add(u),
            m = `Current Pano: ${n.sweep.index}\n    ${this.showPreloadIds ? `Panos: ${h}` : ''}\n    Preload Count (this pano): ${r.size}\n    Total Preloaded: ${this.allPreloadedSweeps.size}`,
            f = e.label('infoLabel', m, w, 0.1);
          if (
            (f.lookAt(i.pose.position),
            f.setPosition(w),
            (f.text = m),
            this.drawSweepSpheres(r, n),
            this.showSweepLabels)
          )
            for (const t of o) {
              const s = `${t.index}`,
                o = e.label(t.id, s, t.position, 0.1);
              (o.text = s), o.setColor(16711680), o.lookAt(i.pose.position);
            }
        }
        drawSweepSpheres(e, t) {
          const i = t.sweep;
          if (!i) return;
          this.draw.toggleAll(!1);
          const s = new p.Vector3().copy(i.position);
          s.y += -0.5;
          for (const t of e) {
            const e = this.sweepData.getSweep(t),
              o = i === e,
              n = o ? 'green' : 'white',
              a = new p.Vector3().copy(e.position);
            if (
              ((a.y += -0.5),
              this.draw
                .sphere(e.id + 'sphere' + (o && 'source'), { color: n, opacity: 1 })
                .update(a, 0.2)
                .toggle(!0),
              !o)
            ) {
              const t = this.draw.line(`${e.id}-${i.id}`, 'white', 0.05);
              t.updatePositions(a, s), t.toggle(!0);
            }
          }
        }
        activateTourMode() {
          this.tourMode = !0;
          const e = {},
            t = Math.round(this.sweepIndex),
            i = this.sweepData.getSweepByIndex(t);
          i &&
            this.engine.commandBinder.issueCommand(new w.ju({ sweep: i.id })).then(() => {
              this.wipePreloadedData(), this.allPreloadedSweeps.clear();
              const t = this.sweepData.getSweepList(),
                s = Math.round(0.05 * t.length);
              i && this.tourStep(i, e, s);
            });
        }
        tourStep(e, t, i, s = 0, o = '') {
          const n = e,
            a = this.sweepData.getSweepList();
          let r = e;
          if (!n || n.neighbours.length <= 0) return;
          (t[n.id] = !0), (o += `Sweep: ${n.index} Loaded: ${this.allPreloadedSweeps.size}\n`);
          let c = 0;
          for (; c < a.length; ) {
            const e = (n.index + 1 + c) % a.length,
              i = this.sweepData.getSweepByIndex(e);
            if ((c++, i && ((r = i), !t[r.id] && r.id !== n.id && r))) break;
          }
          if (++s <= i)
            if (this.visualTour)
              this.engine.commandBinder
                .issueCommand(
                  new w.ju({
                    sweep: n.id,
                    rotation: (0, m.n0)(n.position, r.position),
                    transition: f.nF.Interpolate,
                  }),
                )
                .then(() => {
                  setTimeout(() => {
                    this.tourStep(r, t, i, s, o);
                  }, 500);
                });
            else {
              const e = (0, m.n0)(n.position, r.position),
                a = new p.Vector3().copy(g.fU.FORWARD).applyQuaternion(e),
                c = this.prioritizer.priorityCriteria.clone();
              c.set({ direction: a, rotation: e, sweep: n, position: n.position });
              const h = [];
              (this.prioritizer.priorityCriteria = c),
                this.prioritizer.filterAndPrioritize(h, this.downloadDescriptorGetter);
              this.queueToPanoSet(h).forEach((e) => this.allPreloadedSweeps.add(e)),
                this.tourStep(r, t, i, s, o);
            }
          else
            b.info(
              `TOUR END\n      Sweeps visited: ${s}\n      Visual: ${this.visualTour}\n      Sweeps preloaded: ${this.allPreloadedSweeps.size}`,
            ),
              b.info(`TOUR INFO\n      ${o}`),
              (this.tourMode = !1);
        }
        queueToPanoSet(e) {
          const t = new Set();
          for (const i of e) i && i.sweep && (t.has(i.sweep.id) || t.add(i.sweep.id));
          return t;
        }
        wipePreloadedData() {
          const e = this.sweepData.getSweepList();
          for (const t of e) this.downloadDescriptorGetter.deleteAllTileDownloadDescriptors(t.id);
        }
      }
      function M(e) {
        e.getModuleBySymbol(n.RR).then((t) => {
          const i = t;
          'tileDownloader' in i && new y(e, i.tileDownloader, i.tilePrioritizer);
        });
      }
    },
    28233: (e, t, i) => {
      i.r(t), i.d(t, { default: () => n });
      var s = i(34608),
        o = i(4763);
      async function n(e) {
        const [t, i] = await Promise.all([e.getModuleBySymbol(s.Ak), e.getModuleBySymbol(o.Aj)]),
          n = 'WebGL Renderer';
        let a = null;
        function r(e) {
          i.threeRenderer.forceContextLoss(),
            setTimeout(() => {
              i.threeRenderer.forceContextRestore();
            }, e);
        }
        t.registerMenuButton({
          header: n,
          buttonName: 'Lose Context for 0.1 sec',
          callback: () => {
            r(100);
          },
        }),
          t.registerMenuButton({
            header: n,
            buttonName: 'Lose Context for 5 sec',
            callback: () => {
              r(5e3);
            },
          }),
          t.registerMenuEntry({
            header: n,
            setting: 'autoLoseContext',
            initialValue: () => !1,
            urlParam: !0,
            onChange(e) {
              if (e) {
                const e = () => r(100);
                e(), (a = setInterval(e, 1e4));
              } else clearInterval(a);
            },
          });
      }
    },
    46522: (e, t, i) => {
      i.d(t, { M: () => C });
      var s = i(3835),
        o = i(81396);
      class n {
        constructor(e, t, i) {
          return (
            (this.thisType = e),
            (this.container = t),
            (this.mesh = i()),
            (this.mesh.name = `${e.name}`),
            (this.material = this.mesh.material),
            (this.geometry = this.mesh.geometry),
            this
          );
        }
        opacity(e) {
          return (this.material.opacity = e), this;
        }
      }
      function a(e, t) {
        t.forEach((t) => {
          Object.getOwnPropertyNames(t.prototype).forEach((i) => {
            e.prototype[i] = t.prototype[i];
          });
        });
      }
      class r {
        constructor() {
          this.animationInit = !1;
        }
        initAnimationMixin(e, t) {
          (this.animState = {
            scale: t ? t.clone() : new o.Vector3(1, 1, 1),
            position: e ? e.clone() : new o.Vector3(),
            target: {
              scale: t ? t.clone() : new o.Vector3(1, 1, 1),
              position: e ? e.clone() : new o.Vector3(),
            },
            temp: { pos: new o.Vector3(), scale: new o.Vector3(), makeScale: new o.Vector3() },
          }),
            (this.animationInit = !0);
        }
        update(e, t) {
          if (!this.animationInit)
            throw Error(
              `${r.name} call this.initAnimationMixin() in ${this.style} constructor to enable update, because I said so.`,
            );
          this.mesh.position.copy(e);
          const i = this.vector3From(t);
          return (
            i.equals(this.mesh.scale) || this.mesh.scale.copy(i),
            this.animState.scale.copy(this.mesh.scale),
            this.animState.position.copy(this.mesh.position),
            this.mesh.updateMatrixWorld(!0),
            this
          );
        }
        animate(e, t, i) {
          if (!this.animationInit)
            throw Error(
              `${r.name} call this.initAnimationMixin() in ${this.style} constructor to enable animations, because I said so.`,
            );
          const s = this.vector3From(i);
          this.animState.target.scale.copy(s), this.animState.target.position.copy(t);
          const o = this.animState.temp.pos.copy(this.mesh.position).lerp(t, e),
            n = this.animState.temp.scale.copy(this.mesh.scale).lerp(s, e);
          return this.update(o, n), this;
        }
        vector3From(e) {
          if (e instanceof o.Vector3) return this.animState.temp.makeScale.copy(e).clamp(h, l);
          if ('number' == typeof e) return this.animState.temp.makeScale.set(e, e, e).clamp(h, l);
          throw Error('Unexpected scale input');
        }
      }
      const c = 0.01,
        h = new o.Vector3(c, c, c),
        l = new o.Vector3(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
      class d {
        toggle(e) {
          return (
            e ? this.container.add(this.mesh) : this.container.remove(this.mesh),
            (this.isVisible = e),
            this
          );
        }
      }
      class u extends n {
        constructor(e, t) {
          super(u, e, () => new o.Mesh(new o.BoxGeometry(1, 1, 1), new o.MeshBasicMaterial(t))),
            (this.container = e),
            (this.style = 'Box'),
            (this.mesh.frustumCulled = !1),
            this.geometry.computeBoundingBox(),
            this.initAnimationMixin();
        }
      }
      a(u, [r, d]);
      class p extends n {
        constructor(e, t) {
          super(p, e, () => {
            const e = new o.Box3Helper(
              new o.Box3().setFromCenterAndSize(new o.Vector3(), new o.Vector3(1, 1, 1)),
            );
            return new o.LineSegments(e.geometry, e.material);
          }),
            (this.container = e),
            (this.style = 'BoxWireframeMesh'),
            t && this.material.setValues(t),
            (this.mesh.frustumCulled = !1),
            this.initAnimationMixin();
        }
      }
      a(p, [d, r]);
      class g extends n {
        constructor(e, t) {
          super(g, e, () => new o.CameraHelper(t)),
            (this.container = e),
            (this.style = 'CameraHelper'),
            this.updateCamera(t);
        }
        updateCamera(e) {
          return this.mesh.camera.copy(this.camWithSaneFarDistance(e)), this.mesh.update(), this;
        }
        camWithSaneFarDistance(e) {
          const t = e.clone();
          return (t.far = 5), t;
        }
      }
      a(g, [d]);
      class w extends n {
        constructor(e, t) {
          super(w, e, () => new o.Mesh(new o.PlaneGeometry(1), new o.MeshBasicMaterial(t))),
            (this.container = e),
            (this.style = 'PlaneMesh'),
            (this.radius = 1);
          const i = new o.Matrix4();
          i.makeRotationFromEuler(new o.Euler(-Math.PI / 2, 0, 0, 'XYZ')),
            this.geometry.applyMatrix4(i),
            (this.mesh.frustumCulled = !1),
            this.initAnimationMixin();
        }
      }
      a(w, [d, r]);
      class m extends n {
        constructor(e, t) {
          super(m, e, () => new o.Mesh(new o.SphereGeometry(1), new o.MeshBasicMaterial(t))),
            (this.container = e),
            (this.style = 'SphereMesh'),
            (this.radius = 1),
            (this.mesh.frustumCulled = !1),
            this.initAnimationMixin();
        }
      }
      a(m, [d, r]);
      var f = i(50831);
      class b extends n {
        constructor(e, t) {
          return (
            super(
              b,
              e,
              () =>
                new o.Line(
                  new o.BufferGeometry(),
                  new o.LineBasicMaterial(
                    Object.assign({ color: f.I.MP_BRAND, opacity: 1, transparent: !0 }, t),
                  ),
                ),
            ),
            (this.container = e),
            (this.positionsBuffer = new o.BufferAttribute(new Float32Array(150), 3)),
            (this.point = new o.Vector3()),
            (this.points = {
              start: new o.Vector3(),
              control: new o.Vector3(),
              end: new o.Vector3(),
            }),
            (this.updatePoints = (e, t, i) => {
              this.points.start.copy(this.curve.v0.copy(e)),
                this.points.control.copy(this.curve.v1.copy(t)),
                this.points.end.copy(this.curve.v2.copy(i));
              for (let e = 0; e < 50; e++) {
                const t = e / 49;
                this.curve.getPoint(t, this.point),
                  this.positionsBuffer.setXYZ(e, this.point.x, this.point.y, this.point.z);
              }
              return (this.positionsBuffer.needsUpdate = !0), this;
            }),
            (this.animatePoints = (e, t, i, s) => {
              const { start: o, control: n, end: a } = this.points;
              return o.equals(n) && o.equals(a)
                ? (this.updatePoints(t, i, s), this)
                : (o.lerp(t, e), n.lerp(i, e), a.lerp(s, e), this.updatePoints(o, n, a), this);
            }),
            (this.mesh.frustumCulled = !1),
            (this.curve = new o.QuadraticBezierCurve3(
              new o.Vector3(),
              new o.Vector3(),
              new o.Vector3(),
            )),
            this.geometry.setAttribute('position', this.positionsBuffer),
            this.geometry.computeBoundingBox(),
            this
          );
        }
      }
      a(b, [d]);
      var y = i(71034),
        M = i(22770),
        S = i(55228);
      class C {
        constructor(e, t = {}) {
          (this.cache = {}),
            (this.helperCache = {}),
            (this.style = {}),
            (this.toggle = (e) => (
              this.options.scene &&
                (e
                  ? this.options.scene.add(this.options.container)
                  : this.options.scene.remove(this.options.container)),
              this
            )),
            (this.box = (e, t) => (
              this.cache[B.box][e] ||
                (this.cache[B.box][e] = new u(this.options.container, t).toggle(!0)),
              this.cache[B.box][e]
            )),
            (this.boxWire = (e, t) => (
              this.cache[B.boxWire][e] ||
                (this.cache[B.boxWire][e] = new p(this.options.container, t).toggle(!0)),
              this.cache[B.boxWire][e]
            )),
            (this.cam = (e, t) => (
              this.cache[B.cameraHelper][e] ||
                (this.cache[B.cameraHelper][e] = new g(this.options.container, t).toggle(!0)),
              this.cache[B.cameraHelper][e]
            )),
            (this.label = (e, t, i, s = 0.25) => {
              if (!this.labelCreator) {
                const {
                  color: e,
                  backgroundColor: t,
                  backgroundOpacity: i,
                  background: s,
                } = this.options;
                this.labelCreator = new y.uc(
                  Object.assign(
                    {
                      color: e,
                      background: s,
                      backgroundColor: t,
                      backgroundOpacity: i,
                      wordWrapWidth: 650,
                    },
                    this.style,
                  ),
                );
              }
              if (!this.cache[B.label][e]) {
                const o = this.labelCreator.createLabel();
                (this.cache[B.label][e] = o),
                  o.position.copy(i),
                  (o.text = t),
                  (o.scaleFactor = s),
                  this.options.container.add(o);
              }
              return this.cache[B.label][e];
            }),
            (this.line = (e, t = this.options.lineColor, i = this.options.linewidth) => {
              if (!this.cache[B.line][e]) {
                const n = (0, M.makeLineMaterial)(
                    'string' == typeof t ? new o.Color(t).getHex() : t.getHex(),
                    !1,
                    { linewidth: i },
                  ),
                  a = {
                    onShow: () => this.options.container.add(...r.children),
                    onHide: () => this.options.container.remove(...r.children),
                  },
                  r = new S.c(s.fU.ZERO.clone(), s.fU.ZERO.clone(), n, a);
                r.updateResolution(window.innerWidth, window.innerHeight).opacity(1).toggle(!0),
                  (this.cache[B.line][e] = r);
              }
              return this.cache[B.line][e];
            }),
            (this.plane = (e, t) => (
              this.cache[B.plane][e] ||
                (this.cache[B.plane][e] = new w(this.options.container, t).toggle(!0)),
              this.cache[B.plane][e]
            )),
            (this.setStyle = (e) => {
              this.style = e;
            }),
            (this.sphere = (e, t) => (
              this.cache[B.sphere][e] ||
                (this.cache[B.sphere][e] = new m(this.options.container, t).toggle(!0)),
              this.cache[B.sphere][e]
            )),
            (this.triangle = (e, t, i, s, n) => {
              if (!this.cache[B.triangle][e]) {
                const a = new Float32Array(9);
                t.toArray(a, 0), i.toArray(a, 3), s.toArray(a, 6);
                const r = new o.BufferGeometry();
                r.setAttribute('position', new o.BufferAttribute(a, 3));
                const c = new o.Mesh(r, new o.MeshBasicMaterial(n));
                this.options.container.add(c),
                  (this.cache[B.triangle][e] = new m(this.options.container, n).toggle(!0));
              }
              return this.cache[B.triangle][e];
            }),
            (this.spline = (e, t) => (
              this.cache[B.spline][e] ||
                (this.cache[B.spline][e] = new b(this.options.container, t).toggle(!0)),
              this.cache[B.spline][e]
            )),
            (this.randomColor = (e) => {
              if (void 0 !== e) {
                if (!this.helperCache[k.color][e]) {
                  const t = new o.Color(x(), x(), x());
                  this.helperCache[k.color][e] = t;
                }
                return this.helperCache[k.color][e];
              }
              return new o.Color(x(), x(), x());
            }),
            (this.randomVector3 = (e) => {
              if (void 0 !== e) {
                if (!this.helperCache[k.vector3][e]) {
                  const t = new o.Vector3(2 * (0.5 - x()), 2 * (0.5 - x()), 2 * (0.5 - x()));
                  this.helperCache[k.vector3][e] = t;
                }
                return this.helperCache[k.vector3][e];
              }
              return new o.Vector3(2 * (0.5 - x()), 2 * (0.5 - x()), 2 * (0.5 - x()));
            }),
            (this.toggleAll = (e) => {
              for (const t of Object.values(B)) {
                const i = Object.values(this.cache[t]);
                for (const t of i) 'toggle' in t && t.toggle(e);
              }
              return this;
            }),
            (this.options = Object.assign(Object.assign({}, v), e)),
            (this.style = t);
          for (const e of Object.values(B)) this.cache[e] = {};
          for (const e of Object.values(k)) this.helperCache[e] = {};
          this.options.scene && this.toggle(!0);
        }
        async addToScene(e) {
          return (this.options.scene = e), this.toggle(!0), this;
        }
      }
      const x = () => Math.random(),
        v = {
          lineColor: 'white',
          linewidth: 2,
          color: 'white',
          background: !0,
          backgroundColor: 'white',
          backgroundOpacity: 0.5,
          container: new o.Group(),
        };
      var B, k;
      !(function (e) {
        (e.box = 'box'),
          (e.boxWire = 'boxWire'),
          (e.label = 'label'),
          (e.line = 'line'),
          (e.plane = 'plane'),
          (e.sphere = 'sphere'),
          (e.spline = 'spline'),
          (e.triangle = 'triangle'),
          (e.cameraHelper = 'cameraHelper');
      })(B || (B = {})),
        (function (e) {
          (e.color = 'color'), (e.vector3 = 'vector3');
        })(k || (k = {}));
    },
    65302: (e, t, i) => {
      var s;
      i.d(t, { V: () => s }),
        (function (e) {
          (e[(e.Min = 0)] = 'Min'),
            (e[(e.Standard = 1)] = 'Standard'),
            (e[(e.High = 2)] = 'High'),
            (e[(e.Detail = 3)] = 'Detail');
        })(s || (s = {}));
    },
    41492: (e, t, i) => {
      i.d(t, { t: () => a });
      var s = i(1055),
        o = i(61173),
        n = i(65302);
      const a = {
        urlTemplateToken: '<file>',
        initialMaxLOD: n.V.Min,
        nonMeshMaxLOD: n.V.Standard,
        maxLOD: n.V.High,
        minLOD: n.V.Min,
        loadSiblings: !0,
        displayActiveTiles: !1,
        autoDisableRendererCulling: !0,
        optimizeRaycast: !1,
        stopAtEmptyTiles: !1,
        disableTileUpdates: !1,
        disposeModel: !1,
        limitMemoryUsage: (0, o.tq)(),
        allocatedMegsBeforeLimitingLod: 350,
        lruMinExtraTiles: (0, o.tq)() ? 0 : 100,
        lruMaxTiles: 800,
        lruUnloadPercent: 0.05,
        downloadQueueConcurrency: 8,
        parseQueueConcurrency: 10,
        snappingMaxLOD: n.V.Standard,
        errorTarget: Number((0, s.eY)('errorTarget', (0, o.tq)() ? 6 : 4)),
        errorMultiplierHiddenFloors: 0.01,
        errorMultiplierRaycastOcclusion: 0.1,
        smallMeshThreshold: Number((0, s.eY)('smallMeshThreshold', 40)),
        smallMeshErrorMultiplier: Number((0, s.eY)('smallMeshErrorMultiplier', 0.1)),
      };
    },
    52281: (e, t, i) => {
      i.d(t, { E: () => s });
      const s = { longerTransitionMaxDist: 10, TRANSITION_TIME_DH: 650, TRANSITION_TIME_ROOM: 800 };
    },
    58057: (e, t, i) => {
      i.d(t, { Tq: () => a, bG: () => c });
      var s = i(61565),
        o = i(71835),
        n = i(52281);
      const a = (e, t, i, s, ...o) =>
          r({ sweepData: e, direction: t, directionFactor: i, sourceSweep: s, ignoreSweeps: o }),
        r = (e) => {
          const {
            sweepData: t,
            direction: i,
            sourceSweep: n,
            ignoreSweeps: a,
            directionFactor: r,
          } = e;
          if (!t.currentSweepObject) return [];
          const c = n || t.currentSweepObject,
            h = [s.ff(c), s._k(), s.vO(c), s.pI(c.position, i, r)];
          for (const e of a) h.push(s.ff(e));
          const l = [o.o7(c.position, i), o.TE(c.position)],
            d = t.getSweepNeighbours(c);
          return t.sortByScore(h, l, d);
        },
        c = (e, t, i, a) => {
          const r = [s._k(), s._T()],
            c = [o.Dv(i.point)],
            h = e.currentSweepObject;
          t && h && r.push(s.ff(h), s.SF(h.position, n.E.longerTransitionMaxDist), s.vO(h)),
            i.face && r.push(s.D5(i.point, i.face.normal));
          const l = a.floorIdFromObject(i.object);
          l && c.push(o.Bv(l));
          const d = e.sortByScore(r, c);
          if (0 === d.length) {
            const t = e.getClosestSweep(i.point, !0);
            d.push({ sweep: t, score: 0 });
          }
          return d;
        };
    },
    5429: (e, t, i) => {
      i.d(t, { D5: () => h, Ex: () => l, G1: () => r, rn: () => c });
      var s = i(81396),
        o = i(28721);
      const n = () => Math.random(),
        a = {},
        r = (e, t = n()) => (a[t] || (a[t] = new s.Vector4(n(), n(), n(), e)), a[t]),
        c = () => new s.Color(n(), n(), n()),
        h = (e) => e instanceof Object && 'r' in e && 'g' in e && 'b' in e;
      function l(e) {
        return `#${(0, o.Q_)(255 * e.r, 2, '0', 16)}${(0, o.Q_)(255 * e.g, 2, '0', 16)}${(0, o.Q_)(255 * e.b, 2, '0', 16)}`;
      }
    },
    71034: (e, t, i) => {
      i.d(t, { $7: () => l, uc: () => u, N3: () => h });
      var s = i(81396),
        o = i(4679),
        n = i(11250),
        a = i(43627),
        r = i(96783),
        c = i(26059);
      var h;
      (0, o.Dy)({
        unicodeFontsURL: 'https://static.matterport.com/webgl-vendors/unicode-font-resolver/1.0.1/',
      }),
        (function (e) {
          (e.WORLD = 'world'), (e.NDC = 'ndc');
        })(h || (h = {}));
      class l extends s.Object3D {
        constructor(e, t = h.WORLD) {
          var i, n, a, r;
          super(),
            (this.config = e),
            (this.scaleType = t),
            (this.unscaledWidth = 0),
            (this.unscaledHeight = 0),
            (this.labelTextMaterial = new s.MeshBasicMaterial()),
            (this.bindings = []);
          const c = this.config.background || this.config.backgroundAsCollider;
          if (c) {
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
          const l = (this.labelTextMesh = new o.xv());
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
            c && (l.raycast = () => {}),
            l.addEventListener('synccomplete', () => {
              var e;
              const [t, i, s, o] = l.textRenderInfo.visibleBounds;
              let n = s - t,
                a = o - i;
              isFinite(n) &&
                isFinite(a) &&
                (c &&
                  ((n += this.config.backgroundBorderWidth),
                  (a += this.config.backgroundBorderHeight),
                  this.labelBackgroundMesh.scale.set(n, a, 1)),
                (this.unscaledWidth = n),
                (this.unscaledHeight = a),
                (this.aspect = n / Math.max(a, 0.001)),
                l.position.set(
                  '50%' === l.anchorX ? (t + s) / -2 : 0,
                  '50%' === l.anchorY ? (i + o) / -2 : 0,
                  0,
                ),
                null === (e = this._onGeomUpdate) || void 0 === e || e.call(this));
            }),
            (this.scaleFactor = null !== (n = e.scale) && void 0 !== n ? n : 1),
            (this.opacity = null !== (a = e.opacity) && void 0 !== a ? a : 1),
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
          this.quaternion.copy(e), 0 !== t && this.rotateZ(-t * a.Ue);
        }
        scaleBillboard(e, t, i, s, o, a, l = d.SCALE_DEFAULT) {
          if (0 !== i.elements[15]) this.scaleFactor = 0.2 * l * s * (d.ORTHO_IDEAL_HEIGHT / o);
          else {
            const u = (0, n.D_)(this.position, e, t, i.asThreeMatrix4()),
              p = Math.abs(u.x);
            if (p < 1) {
              const t = (0, c.mY)(i, e, this.position, o, l),
                n = ((0, r.uZ)(a, 1, 2.5) + s) * d.SCALE_ASPECT,
                u = 1 + d.SCALE_NDC - p * d.SCALE_NDC - n,
                g = Math.max(Math.min((1 / t) * u, 3), 0.001);
              this.scaleType === h.NDC
                ? (this.scaleFactor = g)
                : (this.scaleFactor = Math.min(g * d.NDC_MULT, l * d.SCALE_WORLD));
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
      const d = {
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
            (0, o.C5)(
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
  },
]);
