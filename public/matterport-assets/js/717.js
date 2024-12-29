/*! For license information please see 717.js.LICENSE.txt */
'use strict';
(self.webpackChunkmp_webgl = self.webpackChunkmp_webgl || []).push([
  [717],
  {
    52281: (e, t, i) => {
      i.d(t, { E: () => o });
      const o = { longerTransitionMaxDist: 10, TRANSITION_TIME_DH: 650, TRANSITION_TIME_ROOM: 800 };
    },
    58057: (e, t, i) => {
      i.d(t, { Tq: () => n, bG: () => l });
      var o = i(61565),
        r = i(71835),
        s = i(52281);
      const n = (e, t, i, o, ...r) =>
          a({ sweepData: e, direction: t, directionFactor: i, sourceSweep: o, ignoreSweeps: r }),
        a = (e) => {
          const {
            sweepData: t,
            direction: i,
            sourceSweep: s,
            ignoreSweeps: n,
            directionFactor: a,
          } = e;
          if (!t.currentSweepObject) return [];
          const l = s || t.currentSweepObject,
            u = [o.ff(l), o._k(), o.vO(l), o.pI(l.position, i, a)];
          for (const e of n) u.push(o.ff(e));
          const h = [r.o7(l.position, i), r.TE(l.position)],
            d = t.getSweepNeighbours(l);
          return t.sortByScore(u, h, d);
        },
        l = (e, t, i, n) => {
          const a = [o._k(), o._T()],
            l = [r.Dv(i.point)],
            u = e.currentSweepObject;
          t && u && a.push(o.ff(u), o.SF(u.position, s.E.longerTransitionMaxDist), o.vO(u)),
            i.face && a.push(o.D5(i.point, i.face.normal));
          const h = n.floorIdFromObject(i.object);
          h && l.push(r.Bv(h));
          const d = e.sortByScore(a, l);
          if (0 === d.length) {
            const t = e.getClosestSweep(i.point, !0);
            d.push({ sweep: t, score: 0 });
          }
          return d;
        };
    },
    71835: (e, t, i) => {
      i.d(t, { Bv: () => c, Dv: () => l, TE: () => u, l0: () => d, o7: () => h });
      var o = i(81396);
      const r = -1,
        s = 10,
        n = 5,
        a = -5,
        l =
          (e, t = r) =>
          (i) =>
            e.distanceToSquared(i.position) * t,
        u =
          (e, t = r) =>
          (i) =>
            e.distanceTo(i.position) * t,
        h = (e, t, i = s) => {
          const r = new o.Vector3();
          return (o) => r.copy(o.position).sub(e).normalize().dot(t) * i;
        },
        d =
          (e, t = r) =>
          (i) =>
            e.distanceToSquared(i.floorPosition) * t,
        c =
          (e, t = n, i = a) =>
          (o) =>
            e === o.floorId ? t : i;
    },
    33968: (e, t, i) => {
      i.d(t, { Z: () => n });
      var o,
        r = i(7516),
        s = i(39060);
      !(function (e) {
        (e[(e.Untested = 0)] = 'Untested'),
          (e[(e.Testing = 1)] = 'Testing'),
          (e[(e.Success = 2)] = 'Success'),
          (e[(e.Fail = 3)] = 'Fail');
      })(o || (o = {}));
      class n {
        constructor(e, t, i, o) {
          (this.maxCubemapSize = e),
            (this.maxNavPanoSize = t),
            (this.maxZoomPanoSize = i),
            (this.overrideWindow = !1),
            (this.navPanoSize = r.AB.STANDARD),
            (this.zoomPanoSize = r.AB.STANDARD),
            (this.defaultMaxNavPanoSize = this.maxNavPanoSize),
            (this.resolution = o),
            (this.highQualityThreshold =
              s.Xd.windowHeightHighQualityThresholdOverride ||
              s.Xd.windowHeightHighQualityThreshold),
            this.updateMaximums();
        }
        update({ height: e, fov: t }) {
          (this.resolution = e), this.updateMaximums();
        }
        overrideWindowMaximums(e) {
          (this.overrideWindow = e), this.updateMaximums();
        }
        overrideNavPanoSize(e) {
          (this.maxNavPanoSize = null != e ? e : this.defaultMaxNavPanoSize), this.updateMaximums();
        }
        updateMaximums() {
          this.resolution < this.highQualityThreshold && !this.overrideWindow
            ? ((this.navPanoSize = Math.min(n.getPanoSize(r.SL.STANDARD), this.maxNavPanoSize)),
              (this.zoomPanoSize = Math.min(n.getPanoSize(r.SL.HIGH), this.maxZoomPanoSize)))
            : ((this.navPanoSize = this.maxNavPanoSize),
              (this.zoomPanoSize = this.maxZoomPanoSize)),
            this.zoomPanoSize < this.navPanoSize && (this.navPanoSize = this.zoomPanoSize),
            (this.zoomPanoSize = Math.min(this.maxCubemapSize, this.zoomPanoSize)),
            (this.navPanoSize = Math.min(this.maxCubemapSize, this.navPanoSize));
        }
        static getPanoSize(e) {
          if (e in r.eE) return r.eE[e];
          throw new Error(`Not a panoSizeClass: ${e}`);
        }
        static getPanoSizeClass(e) {
          if (e in r.Qf) return r.Qf[e];
          throw new Error(`Not a valid pano resolution: ${e}`);
        }
        getNavPanoSize() {
          return this.navPanoSize;
        }
        getZoomPanoSize() {
          return this.zoomPanoSize;
        }
      }
    },
    59822: (e, t, i) => {
      i.d(t, { Z: () => r });
      var o = i(8126);
      class r extends o.v0 {
        constructor(e, t, i) {
          super(), (this.size = e), (this.sweepId = t), (this.renderTarget = i);
        }
      }
    },
    98009: (e, t, i) => {
      i.d(t, { F: () => r });
      var o = i(56063);
      class r extends o.m {
        constructor(e) {
          super(), (this.payload = { navSize: e });
        }
      }
      r.id = 'SET_NAV_PANO_SIZE';
    },
    77717: (e, t, i) => {
      i.r(t), i.d(t, { default: () => Ie });
      var o = i(933),
        r = i(4763),
        s = i(39060),
        n = i(15709),
        a = i(81396),
        l = i(53952),
        u = i(1147);
      const h = {
          0: l.Z.GL_TEXTURE_CUBE_MAP_POSITIVE_Y,
          1: l.Z.GL_TEXTURE_CUBE_MAP_POSITIVE_Z,
          2: l.Z.GL_TEXTURE_CUBE_MAP_POSITIVE_X,
          3: l.Z.GL_TEXTURE_CUBE_MAP_NEGATIVE_Z,
          4: l.Z.GL_TEXTURE_CUBE_MAP_NEGATIVE_X,
          5: l.Z.GL_TEXTURE_CUBE_MAP_NEGATIVE_Y,
        },
        d = (e) => {
          if (e < 0 || e > 5)
            throw new u.Z('mapFaceToCubemapFace() -> face must be in the range [0, 5]');
          return h[e];
        };
      var c = i(7516),
        p = i(17545),
        g = i(69484),
        w = i(91584),
        S = i(28721);
      class f {
        constructor(e) {
          this._value = e;
        }
        value() {
          return this._value;
        }
        set(e) {
          this._value = e;
        }
      }
      class T {
        constructor() {
          this.storage = {};
        }
        get(e, t) {
          let i = this.storage[e];
          return i || ((i = t()), (this.storage[e] = i)), i;
        }
        getNumber(e) {
          return this.get(e, () => new f(0));
        }
        getString(e) {
          return this.get(e, () => new f(''));
        }
        getArray(e) {
          return this.get(e, () => []);
        }
        getNumberMap(e) {
          return this.get(e, () => ({}));
        }
        getStringMap(e) {
          return this.get(e, () => ({}));
        }
      }
      var m,
        D = i(65281),
        y = i(3835),
        v = i(53257),
        P = i(59822),
        z = i(33968);
      !(function (e) {
        (e[(e.Center = 0)] = 'Center'),
          (e[(e.UpperLeft = 1)] = 'UpperLeft'),
          (e[(e.UpperRight = 2)] = 'UpperRight'),
          (e[(e.LowerRight = 3)] = 'LowerRight'),
          (e[(e.LowerLeft = 4)] = 'LowerLeft');
      })(m || (m = {}));
      const Q = m;
      var R = i(43627);
      const A = 512,
        F = (e, t, i, o, r, s, n, a) => {
          const u = e / t,
            h = 2 * (t / e),
            d = h / 2;
          let c = 2 * (o / u) - 1 + d,
            p = 2 * ((r = u - 1 - r) / u) - 1 + d;
          switch ((s = s || Q.Center)) {
            case Q.UpperLeft:
              (c -= d), (p += d), (c += n * h);
              break;
            case Q.UpperRight:
              (c += d), (p += d), (p -= n * h);
              break;
            case Q.LowerRight:
              (c += d), (p -= d), (c -= n * h);
              break;
            case Q.LowerLeft:
              (c -= d), (p -= d), (p += n * h);
              break;
            case Q.Center:
          }
          switch (i) {
            case l.Z.GL_TEXTURE_CUBE_MAP_POSITIVE_X:
              a.set(-1, p, -c);
              break;
            case l.Z.GL_TEXTURE_CUBE_MAP_NEGATIVE_X:
              a.set(1, p, c);
              break;
            case l.Z.GL_TEXTURE_CUBE_MAP_POSITIVE_Y:
              a.set(-c, 1, -p);
              break;
            case l.Z.GL_TEXTURE_CUBE_MAP_NEGATIVE_Y:
              a.set(-c, -1, p);
              break;
            case l.Z.GL_TEXTURE_CUBE_MAP_POSITIVE_Z:
              a.set(-c, p, 1);
              break;
            case l.Z.GL_TEXTURE_CUBE_MAP_NEGATIVE_Z:
              a.set(c, p, -1);
          }
          a.normalize();
        },
        b = (e, t) => {
          let i = A;
          e < A && (i = e);
          const o = Math.floor(e / i),
            r = o * o;
          return Math.floor(t / r);
        },
        U = (e, t, i) => {
          let o = A;
          e < A && (o = e);
          const r = b(e, t),
            s = Math.floor(e / o),
            n = t - r * (s * s);
          (i.tileX = n % s), (i.tileY = Math.floor(n / s)), (i.face = r), (i.faceTileIndex = n);
        },
        x = function (e) {
          if (e <= A) return 6;
          const t = Math.floor(e / A);
          return 6 * (t * t);
        },
        C = (function () {
          const e = new a.Matrix4(),
            t = new a.Quaternion();
          return (i, o) => {
            t.copy(i),
              t.invert(),
              e.makeRotationFromQuaternion(t),
              o.applyMatrix4(e),
              o.normalize();
          };
        })(),
        I = (function () {
          const e = new a.Vector3(),
            t = new a.Vector3(0, 0, -1),
            i = new a.Quaternion(),
            o = function (e, t) {
              e.push({
                face: t.face,
                faceTileIndex: t.faceTileIndex,
                tileX: t.tileX,
                tileY: t.tileY,
              });
            },
            r = (function () {
              const e = { face: -1, faceTileIndex: -1, tileX: -1, tileY: -1 };
              return (t, i, r) => {
                const s = x(t);
                let n = 0;
                for (let a = 0; a < s; a++) U(t, a, e), (i && !i(e)) || (n++, r && o(r, e));
                return n;
              };
            })();
          return (o, s, n, l, u = !1, h, d) => {
            l.length = u ? 0 : l.length;
            const c = s < A ? s : A;
            if (!h && !d) return r(s, null, l);
            const p = !!d;
            (h = h || 0),
              (d = d || h),
              (d = Math.max(0, Math.min(d, 360))),
              (h = Math.max(0, Math.min(h, 360))),
              e.copy(n);
            const g = o.rotation || new a.Quaternion();
            if ((C(g, e), p)) {
              i.setFromUnitVectors(e, t);
              return r(
                s,
                function (e) {
                  return M(s, c, e.face, e.tileX, e.tileY, i, h || 0, d || 0);
                },
                l,
              );
            }
            return r(
              s,
              function (t) {
                return L(s, c, t.face, t.tileX, t.tileY, e, h || 0);
              },
              l,
            );
          };
        })(),
        M = (function () {
          const e = new a.Vector3();
          return (t, i, o, r, s, n, a, l) => {
            const u = Math.tan(0.5 * l * R.Ue),
              h = -u,
              c = Math.tan(0.5 * a * R.Ue),
              p = -c,
              g = d(o);
            let w = 0,
              S = 0,
              f = 0,
              T = 0,
              m = 0;
            for (let o = Q.Center; o <= Q.LowerLeft; o++) {
              if ((F(t, i, g, r, s, o, 0, e), e.applyQuaternion(n), e.z >= -1e-5)) continue;
              const a = -1 / e.z,
                l = e.x * a,
                d = e.y * a;
              d > u ? w++ : d < h && S++, l > c ? f++ : l < p && T++, m++;
            }
            return S !== m && w !== m && f !== m && T !== m;
          };
        })(),
        L = (function () {
          const e = new a.Vector3(),
            t = new a.Vector3(0, 1, 0),
            i = new a.Vector3(1, 0, 0);
          return (o, r, s, n, a, l, u) => {
            const h = d(s);
            if ((i.copy(l).cross(t), F(o, r, h, n, a, Q.Center, 0, e), E(e, l, u))) return !0;
            const c = u / 360,
              p = Math.floor(1 / c);
            let g = 0;
            for (let t = 0; t < p; t++) {
              for (let t = Q.UpperLeft; t <= Q.LowerLeft; t++)
                if ((F(o, r, h, n, a, t, g, e), E(e, l, u))) return !0;
              g += c;
            }
            return !1;
          };
        })(),
        E = (function () {
          const e = new a.Vector3(),
            t = new a.Vector3();
          return (i, o, r, s) => {
            if ((t.copy(i), s)) {
              e.copy(s), e.normalize();
              const o = e.dot(i);
              (e.x *= o), (e.y *= o), (e.z *= o), t.sub(e);
            }
            const n = (r / 2) * R.Ue,
              a = Math.cos(n);
            return t.dot(o) >= a;
          };
        })();
      var N;
      !(function (e) {
        (e[(e.PreOrder = 0)] = 'PreOrder'), (e[(e.PostOrder = 1)] = 'PostOrder');
      })(N || (N = {}));
      class _ {
        constructor(e, t) {
          (this.tree = e),
            (this.parent = t),
            (this.children = []),
            (this.id = ++_._id),
            (this.extra = {}),
            (this.level = -1);
        }
      }
      _._id = 0;
      class V {
        constructor(e, t) {
          (this.levels = t), (this.tileSize = e), (this.root = null), (this.allNodes = []), O(this);
        }
        getSizeForLevel(e, t) {
          return Math.pow(2, t) * e;
        }
        getSubNode(e, t, i) {
          (!t || e < this.tileSize) && (t = 0),
            (!i || e < this.tileSize) && (i = 0),
            e < this.tileSize && (e = this.tileSize);
          const o = q(this.tileSize, e);
          return Z(this.root, 0, o, t, i);
        }
        deleteAllNodes() {
          this.depthFirst(
            function (e, t, i, o, r) {
              for (let t = 0; t < e.children.length; t++) {
                const i = e.children[t];
                i && ((i.parent = null), (i.tree = null)), (e.children[t] = null);
              }
              e.children.length = 0;
            }.bind(this),
            null,
            N.PostOrder,
          );
          for (let e = 0; e < this.allNodes.length; e++) {
            const t = this.allNodes[e];
            t && ((t.parent = null), (t.tree = null)), (this.allNodes[e] = null);
          }
          (this.allNodes.length = 0), (this.root = null);
        }
        breadthFirst(e) {
          const t = !!(e = e || {}).nullLevelEnd,
            i = e.maxLevel,
            o = e.minLevel,
            r = e.callback,
            s = e.saveVisited,
            n = [],
            a = new _(this, null);
          let l = 0;
          if (this.root)
            for (n.push(this.root), n.push(a); n.length > 0 && !(i && l > i); ) {
              const e = n.shift();
              if (e)
                if (e === a)
                  (!o || l >= o) && (r && t && r(), s && t && s.push(null)),
                    n.length > 0 && n.push(a),
                    l++;
                else {
                  if (e.children) for (const t of e.children) t && n.push(t);
                  const t = this.getFaceIndexFromNode(e);
                  (!o || l >= o) && (r && r(e, l, t), s && s.push(e));
                }
            }
        }
        getFaceIndexFromNode(e) {
          if (!e) return -1;
          let t = 1,
            i = e,
            o = 0,
            r = 0;
          for (;;) {
            const e = i.parent;
            if (!e) break;
            let s = -1;
            for (let t = 0; t < e.children.length; t++) e.children[t] === i && (s = t);
            (o = (s % 2) * t + o), (r = Math.floor(s / 2) * t + r), (t *= 2), (i = e);
          }
          return r * t + o;
        }
        depthFirst(e, t, i) {
          B(this.root, 0, 0, 0, e, t, i, this.tileSize);
        }
      }
      const q = function (e, t) {
          let i = 0;
          for (t < e && (t = e); !((t /= 2) < e); ) i++;
          return i;
        },
        B = function (e, t, i, o, r, s, n, a) {
          if (!e) return;
          const l = 2 * o + i;
          if (
            ((n = n || N.PreOrder) === N.PreOrder && (r && r(e, t, l, i, o), s && s.push(e)),
            !e.children || 0 === e.children.length)
          )
            return;
          const u = 2 * o,
            h = 2 * i;
          for (let i = 0; i < 2; i++)
            for (let o = 0; o < 2; o++) B(e.children[2 * o + i], t + 1, h + i, u + o, r, s, n, a);
          n === N.PostOrder && (r && r(e, t, l, i, o), s && s.push(e));
        },
        O = (e) => {
          e.root = H(e, null, 0);
        },
        H = (e, t, i) => {
          if (i > e.levels) return null;
          const o = new _(e, t);
          (o.level = i), e.allNodes.push(o);
          for (let t = 0; t < 4; t++) {
            const r = H(e, o, i + 1);
            r && (o.children[t] = r);
          }
          return o;
        },
        Z = (e, t, i, o, r) => {
          if (!e) return null;
          if (0 === i) return e;
          {
            if (!e.children || 0 === e.children.length) return null;
            const s = Math.pow(2, i) / 2,
              n = o % s,
              a = r % s,
              l = 2 * Math.floor(r / s) + Math.floor(o / s),
              u = e.children[l];
            return Z(u, t + 1, i - 1, n, a);
          }
        };
      var k,
        X = i(73943);
      class G extends X.y {
        constructor(e) {
          super(e), (this.name = 'PanoTilingError');
        }
      }
      !(function (e) {
        (e[(e.Base = 0)] = 'Base'), (e[(e.Remaining = 1)] = 'Remaining');
      })(k || (k = {}));
      class Y {
        constructor(e) {
          (this.tilePrioritizer = e),
            (this.forceQueue = []),
            (this.uploadQueues = {}),
            (this.panoLODDescriptors = {});
        }
        addToForceQueue(e) {
          this.forceQueue.push(e);
        }
        addToPanoQueue(e, t) {
          this.getUploadQueueForPano(e).push(t);
        }
        insertSortedIntoPanoQueue(e, t, i) {
          const o = this.getUploadQueueForPano(t.id);
          this.tilePrioritizer.insertSortedPanoTile(o, e, t, i);
        }
        sortQueue(e, t) {
          const i = this.getUploadQueueForPano(e.id);
          this.tilePrioritizer.sortTiles(i, e, t);
        }
        getUploadQueueForPano(e) {
          let t = this.uploadQueues[e];
          return t || ((t = []), (this.uploadQueues[e] = t)), t;
        }
        hasQueuedTiles() {
          if (this.forceQueue.length > 0) return !0;
          for (const e in this.uploadQueues) {
            const t = this.getUploadQueueForSweep(e);
            if (t && t.length > 0) return !0;
          }
          return !1;
        }
        getUploadQueueForSweep(e) {
          let t = this.uploadQueues[e];
          return t || ((t = []), (this.uploadQueues[e] = t)), t;
        }
        getTopUploadQueue(e) {
          let t = null;
          for (let i = k.Base; i <= k.Remaining; i++)
            for (const o of e)
              if (((t = this.getUploadQueueForSweep(o.id)), t.length > 0))
                switch (i) {
                  case k.Base:
                    if (0 === t[0].level) return t;
                    break;
                  case k.Remaining:
                    return t;
                }
          return null;
        }
        processNextQueueItem(e) {
          const t = e.shift();
          return t ? ((t.uploadQueued = !1), t) : null;
        }
        getNextFromUploadQueue(e) {
          if (this.forceQueue.length > 0) return this.processNextQueueItem(this.forceQueue);
          const t = this.getTopUploadQueue(e);
          return t && t.length > 0 ? this.processNextQueueItem(t) : null;
        }
        peekNextFromUploadQueue(e) {
          if (this.forceQueue.length > 0) return this.forceQueue[0];
          const t = this.getTopUploadQueue(e);
          return t && t.length > 0 ? t[0] : null;
        }
        clearAllQueuedUploads() {
          this.clearAllUploadQueues(null, 0);
        }
        clearAllUploadQueues(e, t = 0) {
          if (e)
            this.clearUploadQueue(this.getUploadQueueForSweep(e), t),
              this.clearUploadQueue(this.forceQueue, t, e);
          else {
            for (const e in this.uploadQueues)
              this.clearUploadQueue(this.getUploadQueueForSweep(e), t);
            this.clearUploadQueue(this.forceQueue, t);
          }
        }
        clearUploadQueue(e, t = 0, i) {
          let o = 0;
          for (; o < e.length; ) {
            const r = e[o];
            (!i || (i && i === r.sweepId)) && r.level >= t
              ? ((r.uploadQueued = !1), e.splice(o, 1))
              : o++;
          }
        }
        resetPanoLODDescriptors(e) {
          const t = this.getPanoLODDescriptors(e);
          for (const e in t)
            if (t.hasOwnProperty(e)) {
              const i = t[e];
              (i.uploadCount = 0), (i.uploadAttempts = 0);
            }
        }
        getPanoLODDescriptor(e, t) {
          const i = this.getPanoLODDescriptors(e);
          let o = i[t];
          return o || ((o = { uploadCount: 0, uploadAttempts: 0 }), (i[t] = o)), o;
        }
        getPanoLODDescriptors(e) {
          let t = this.panoLODDescriptors[e];
          return t || ((t = {}), (this.panoLODDescriptors[e] = t)), t;
        }
      }
      const j = new v.Z('tiles'),
        W = s.Xd.uploadIntervalDelay;
      class $ {
        constructor(e, t, i, o, r, s, n) {
          (this.cwfRenderer = e),
            (this.panoQualityManager = t),
            (this.tileDownloader = i),
            (this.tilePrioritizer = o),
            (this.sweepData = r),
            (this.cameraData = s),
            (this.tilingSettings = n),
            (this.persistentStorage = new T()),
            (this.activeSweeps = []),
            (this.sweepLoadHistory = []),
            (this.activeRenderTargetDescriptors = {}),
            (this.panoLoadMinimumCallbacks = {}),
            (this.panoLoadPromises = {}),
            (this.panoLoadResolvers = {}),
            (this.tileDirectory = {}),
            (this.tileTrees = {}),
            (this.zoomSweepRenderingDisabled = !1),
            (this.zoomingActive = !1),
            (this.zoomSweepId = null),
            (this.usingTileOverlay = !1),
            (this.overlayTilesLoaded = !1),
            (this.overlayTilesBasic = {}),
            (this.overlayTilesEnhanced = {}),
            (this.currentState = {
              direction: new a.Vector3(),
              position: new a.Vector3(),
              rotation: new a.Quaternion(),
              sweepId: void 0,
            }),
            (this.textureUsageCounter = {}),
            (this.tileUploadQueue = new Y(this.tilePrioritizer)),
            (this.renderTargetPool = new D.L(
              (e, t) => e.object.height === t.size && e.object.width === t.size,
            )),
            (this.onTileDownLoaded = this.onTileDownLoaded.bind(this));
        }
        render() {}
        deactivate() {}
        dispose() {}
        activate(e) {
          this.engine = e;
        }
        getActivePanos() {
          const e = [];
          for (const t of Object.keys(this.activeRenderTargetDescriptors)) {
            this.activeRenderTargetDescriptors[t] && e.push(t);
          }
          return e;
        }
        init() {
          this.loadOverlayTiles();
        }
        _activateSweep(e) {
          this.textureUsageCounter[e] || (this.textureUsageCounter[e] = 0);
        }
        _useTexture(e) {
          this.textureUsageCounter[e]++;
        }
        _freeTexture(e) {
          this.textureUsageCounter[e] > 0 && this.textureUsageCounter[e]--;
        }
        _setTextureUsage(e, t) {
          this.textureUsageCounter[e] = t;
        }
        _freeUnusedTextures() {
          for (const e of Object.keys(this.textureUsageCounter))
            0 === this.textureUsageCounter[e] && this.freeTexture(e);
        }
        highResRenderTarget(e, t) {
          if (e) {
            if (!t) throw new G('Cannot activate zooming without sweepId!');
            (this.zoomingActive = !0), (this.zoomSweepId = t), this.copyTargetToZoom(t);
          } else (this.zoomingActive = !1), (this.zoomSweepId = null);
          if (t) {
            const e = this.getRenderTargetDescriptorForSweep(t);
            if (!e) throw new G('Zooming at a null render target!');
            const i = this.zoomingActive ? this.zoomRenderTarget : e.object,
              o = i.width;
            this.engine.broadcast(new P.Z(o, t, i));
          }
        }
        getCurrentPanoResolution() {
          const e = this.zoomingActive
            ? this.panoQualityManager.getZoomPanoSize()
            : this.panoQualityManager.getNavPanoSize();
          return z.Z.getPanoSizeClass(e);
        }
        beforeRender() {
          if (
            (this.currentState.position.copy(this.cameraData.pose.position),
            this.currentState.rotation.copy(this.cameraData.pose.rotation),
            this.currentState.direction
              .copy(y.fU.FORWARD)
              .applyQuaternion(this.cameraData.pose.rotation),
            this.tileUploadQueue.hasQueuedTiles())
          )
            for (const e of this.activeSweeps)
              this.tileUploadQueue.sortQueue(e, this.currentState.direction);
          const e = this.sweepData.transition.to,
            t = this.sweepData.currentSweep,
            i = e || t || this.currentState.sweepId;
          i && (this.currentState.sweepId = i);
          const o = i ? this.sweepData.getSweep(i) : null;
          o &&
            this.tilePrioritizer.updateCriteria(
              o,
              this.currentState.position,
              this.currentState.direction,
              this.currentState.rotation,
            ),
            this.updateUploadQueueProcessing();
        }
        activateSweep(e, t = !0) {
          this._activateSweep(e);
          const i = this.sweepData.getSweep(e);
          if (!i)
            throw (j.error(e, i), new G('Invalid sweepId passed to TiledPanoRenderer.activate()'));
          let o = this.panoLoadPromises[e];
          if (!o) {
            const r = (() => {
              const i = this.engine;
              let o;
              return (
                t &&
                  (o = window.setTimeout(() => {
                    i.broadcast(new p.Z_(!0));
                  }, s.Xd.loadIndicatorDelay)),
                this._useTexture(e),
                () => {
                  clearTimeout(o), i.broadcast(new p.Z_(!1)), this._freeTexture(e);
                }
              );
            })();
            t && (this.panoLoadMinimumCallbacks[e] = r),
              (o = new Promise((t, o) => {
                (this.panoLoadResolvers[e] = t),
                  this.activatePano(i),
                  this.queueUploadForAllTiles(e),
                  this.tileDownloader.forceQueueTiles(
                    i,
                    c.AB.BASE,
                    this.currentState.direction,
                    !0,
                  );
              })),
              (this.panoLoadPromises[e] = o);
          }
          return o;
        }
        useTexture(e) {
          const t = this.getRenderTargetDescriptorForSweep(e);
          if (!t) throw (j.error(e), new G('Texture for sweep not activated before using'));
          const i = t.object.texture;
          return (
            this._useTexture(e),
            this._freeUnusedTextures(),
            this.zoomingActive ? this.zoomRenderTarget.texture : i
          );
        }
        freeTexture(e) {
          this._freeTexture(e), 0 === this.textureUsageCounter[e] && this.deactivatePano(e);
        }
        freeAllTextures(e = []) {
          const t = (0, S.ow)(e),
            i = this.getActivePanos();
          for (const e of i) t[e] || this.freeTexture(e);
        }
        enableUltraHighQualityMode(e) {
          this.setupZoomRenderTarget(),
            this.zoomSweepId &&
              this.engine.broadcast(
                new P.Z(this.zoomRenderTarget.width, this.zoomSweepId, this.zoomRenderTarget),
              );
        }
        resetRenderStatus(e, t, i, o) {
          let r;
          o && (r = q(A, o) + 1);
          const s = (e, o, r, s) => {
            i && (o.extra.tile.zoomUploaded = !1), t && (o.extra.tile.uploaded = !1);
          };
          for (let t = 0; t < 6; t++) {
            this.getTileTree(e, t).breadthFirst({ callback: s.bind(this, t), minLevel: r });
          }
        }
        copyBaseRenderStatusToZoomed(e) {
          const t = q(A, this.panoQualityManager.getNavPanoSize()),
            i = (e, t, i, o) => {
              (t.extra.tile.zoomUploaded = t.extra.tile.uploaded),
                (t.extra.zoomCovered = t.extra.covered);
            };
          for (let o = 0; o < 6; o++) {
            this.getTileTree(e, o).breadthFirst({ callback: i.bind(this, o), maxLevel: t });
          }
        }
        renderPanoTiles(e, t, i, o) {
          const r = [];
          (this.zoomRenderTarget &&
            this.zoomRenderTarget.width === this.panoQualityManager.getZoomPanoSize()) ||
            this.zoomSweepRenderingDisabled ||
            this.setupZoomRenderTarget(),
            (t = t || this.currentState.direction || y.fU.FORWARD);
          const s = this.getRenderTargetDescriptorForSweep(e);
          if (!this.isRenderTargetDescriptorValid(s))
            throw new G(
              'PanoRenderer.renderPanoTiles() -> Cannot render to a pano that is not activated.',
            );
          for (let t = 0; t < 6; t++) {
            const s = this.getTileTree(e, t);
            (r.length = 0), s.breadthFirst({ saveVisited: r });
            for (let e = 0; e < r.length; e++) {
              const t = r[e];
              this.queueUploadForTile(t.extra.tile, !1, o || (0 === e && i));
            }
          }
        }
        renderAllActivePanos() {
          for (const e of this.getActivePanos())
            this.resetUploadState(e, !0, !0),
              this.clearAllQueuedUploadsForPano(e),
              this.renderPanoTiles(e, null, !0, !0);
        }
        clearAllQueuedUploads() {
          this.tileUploadQueue.clearAllUploadQueues(null, 0);
        }
        clearAllQueuedUploadsForPano(e) {
          this.tileUploadQueue.clearAllUploadQueues(e, 0);
        }
        activatePano(e) {
          this.tileUploadQueue.clearAllQueuedUploads();
          const t = e.availableResolution(c.SL.ULTRAHIGH),
            i = c.eE[t],
            o = e.id;
          for (let t = 0; t < 6; t++) {
            let r = this.tileTrees[o];
            r || ((r = []), (this.tileTrees[o] = r));
            let s = r[t];
            if (!s) {
              const o = q(A, i);
              (s = new V(A, o)),
                (r[t] = s),
                s.breadthFirst({
                  callback: (i, o, r) => {
                    const s = this.getTileDirectoryEntry(e.id, t, o, r);
                    (i.extra.tile = s), (s.node = i);
                  },
                });
            }
          }
          let r = this.getRenderTargetDescriptorForSweep(e.id);
          if (!r) {
            const t = this.panoQualityManager.getNavPanoSize();
            if (((r = this.renderTargetPool.get({ size: t })), !r)) {
              const e = this.cwfRenderer.initRenderTargetCube(t);
              (r = this.renderTargetPool.add(e)), (r.extra = {}), (r.extra.size = e.width);
            }
            (r.extra.sweep = e),
              (r.extra.sweepindex = e.index),
              (this.activeRenderTargetDescriptors[e.id] = r),
              this.tileUploadQueue.resetPanoLODDescriptors(e.id),
              this.resetUploadState(e.id, !0, !0);
          }
          return this.updateActiveSweeps(e), r.object;
        }
        deactivatePano(e) {
          const t = this.getRenderTargetDescriptorForSweep(e);
          t &&
            this.isRenderTargetDescriptorValid(t) &&
            (this.renderTargetPool.free(t.object),
            (this.activeRenderTargetDescriptors[e] = null),
            this.updateActiveSweeps(),
            this.tileUploadQueue.clearAllUploadQueues(e),
            this.tileUploadQueue.resetPanoLODDescriptors(e),
            this.clearCachedTileData(),
            delete this.panoLoadPromises[e]);
        }
        clearCachedTileData() {
          for (let e = this.sweepLoadHistory.length - 1; e >= 0; e--) {
            let t = !1;
            const i = this.sweepLoadHistory[e];
            if (i) {
              for (const e of this.activeSweeps)
                if (i === e.id) {
                  t = !0;
                  break;
                }
              t ||
                (this.checkTileTreeInitialized(i) &&
                  (this.clearTileState(i, !0, !0), this.deleteTileTrees(i)),
                this.deleteTileDirectoryEntries(i),
                this.tileDownloader.deleteAllTileDownloadDescriptors(i),
                (this.sweepLoadHistory[e] = null));
            }
          }
          this.updateSweepLoadHistory();
        }
        updateActiveSweeps(e) {
          const t = this.persistentStorage.getArray('updateActiveSweeps:tempSweeps');
          t.length = 0;
          for (const i of this.activeSweeps) {
            const o = this.getRenderTargetDescriptorForSweep(i.id);
            (e && i.id === e.id) || !this.isRenderTargetDescriptorValid(o) || t.push(i);
          }
          e && t.unshift(e), (this.activeSweeps.length = 0), this.activeSweeps.push(...t);
        }
        queueUploadForAllTiles(e) {
          (this.zoomRenderTarget &&
            this.zoomRenderTarget.width === this.panoQualityManager.getZoomPanoSize()) ||
            this.zoomSweepRenderingDisabled ||
            this.setupZoomRenderTarget();
          const t = this.getRenderTargetDescriptorForSweep(e);
          if (!this.isRenderTargetDescriptorValid(t))
            throw new G(
              'queueUploadForAllTiles() -> Cannot render to a pano that is not activated.',
            );
          const i = this.persistentStorage.getArray('queueUploadForAllTiles:nodeList');
          for (let t = 0; t < 6; t++) {
            const o = this.getTileTree(e, t);
            (i.length = 0), o.breadthFirst({ saveVisited: i });
            for (const e of i) this.queueUploadForTile(e.extra.tile, !1, 0 === e.level);
          }
        }
        onTileDownLoaded(e) {
          if (!e.sweep) return;
          const t = q(A, e.panoSize),
            i = this.getTileDirectoryEntry(e.sweep.id, e.face, t, e.faceTileIndex);
          this.updateUploadDescriptorFromDownloadDescriptor(i, e),
            this.updateSweepLoadHistory(i.sweepId);
          const o = this.getRenderTargetDescriptorForSweep(i.sweepId);
          if (this.isRenderTargetDescriptorValid(o)) {
            const e = this.getTileTree(i.sweepId, i.face).getSubNode(i.panoSize, i.tileX, i.tileY);
            e && ((e.extra.tile = i), (i.node = e), this.queueUploadForTile(i, !0));
          }
        }
        updateUploadDescriptorFromDownloadDescriptor(e, t) {
          (e.downloaded = !0),
            (e.image = t.image),
            (e.panoSize = t.panoSize),
            (e.tileX = t.tileX),
            (e.tileY = t.tileY),
            (e.totalTiles = t.totalTiles),
            (e.tileIndex = t.tileIndex),
            (e.faceTileIndex = t.faceTileIndex),
            (e.face = t.face),
            (e.cubeFace = d(t.face)),
            t.sweep && (e.sweepId = t.sweep.id),
            (e.tileSize = t.tileSize),
            e.direction.copy(t.direction),
            (e.node = null),
            (e.level = q(A, e.panoSize));
        }
        updateSweepLoadHistory(e) {
          const t = this.persistentStorage.getArray('updateSweepLoadHistory:tempHistory');
          t.length = 0;
          for (const i of this.sweepLoadHistory) i && (!e || (e && e !== i)) && t.push(i);
          (this.sweepLoadHistory.length = 0),
            e && this.sweepLoadHistory.push(e),
            this.sweepLoadHistory.push(...t);
        }
        onPanoRendered(e, t) {
          var i, o;
          const r = this.panoLoadResolvers[e],
            s = this.activeRenderTargetDescriptors[e];
          s &&
            s.object &&
            (null === (o = (i = this.panoLoadMinimumCallbacks)[e]) || void 0 === o || o.call(i),
            delete this.panoLoadMinimumCallbacks[e],
            r()),
            this.clearTileState(e, !1, !0);
        }
        getRenderTargetDescriptorForSweep(e) {
          return this.activeRenderTargetDescriptors[e];
        }
        isRenderTargetDescriptorValid(e) {
          return !!e && !!e.object;
        }
        isSweepZoomed(e) {
          return this.zoomingActive && this.zoomSweepId === e;
        }
        getTileTrees(e) {
          const t = this.tileTrees[e];
          if (!t)
            throw new G('TiledPanoRenderer.getTileTrees() -> Tree array not yet initialized!');
          return t;
        }
        checkTileTreeInitialized(e) {
          return !!this.tileTrees[e];
        }
        getTileTree(e, t) {
          const i = this.getTileTrees(e)[t];
          if (!i) throw new G('TiledPanoRenderer.getTileTree() -> Tree not yet initialized!');
          return i;
        }
        deleteTileTrees(e) {
          const t = this.getTileTrees(e);
          for (let e = 0; e < 6; e++) {
            const i = t[e];
            i && i.deleteAllNodes();
          }
          (this.tileTrees[e] = null), delete this.tileTrees[e];
        }
        clearTileState(e, t = !1, i = !1) {
          const o = (e, o, r, s) => {
            var n, a;
            i &&
              (null ===
                (a = null === (n = o.extra.tile.image) || void 0 === n ? void 0 : n.close) ||
                void 0 === a ||
                a.call(n),
              (o.extra.tile.image = null)),
              t &&
                ((o.extra.tile.uploaded = !1),
                (o.extra.tile.downloaded = !1),
                (o.extra.tile.zoomUploaded = !1),
                (o.extra.tile.uploadAttempted = !1));
          };
          for (let t = 0; t < 6; t++) {
            const i = this.getTileTree(e, t);
            i &&
              i.breadthFirst({
                callback: o.bind(this, t),
                maxLevel: q(A, this.panoQualityManager.getZoomPanoSize()),
              });
          }
        }
        resetUploadState(e, t, i) {
          const o = (e, o, r, s) => {
            (o.extra.tile.zoomUploaded = !i && o.extra.tile.zoomUploaded),
              (o.extra.tile.uploaded = !t && o.extra.tile.uploaded);
          };
          for (let t = 0; t < 6; t++) {
            this.getTileTree(e, t).breadthFirst({ callback: o.bind(this, t), minLevel: 0 });
          }
        }
        anyUploaded(e) {
          if (!e) return !1;
          if (e.extra.tile && this.isTileUploaded(e.extra.tile)) return !0;
          if (e.children) for (const t of e.children) if (this.anyUploaded(t)) return !0;
          return !1;
        }
        getTileDirectoryEntry(e, t, i, o) {
          let r = this.tileDirectory[e];
          r || ((r = {}), (this.tileDirectory[e] = r));
          const s = 16384 * t + 1024 * i + o;
          let n = r[s];
          return (
            n ||
              ((n = {
                downloaded: !1,
                uploaded: !1,
                uploadAttempted: !1,
                zoomUploaded: !1,
                uploadQueued: !1,
                image: null,
                panoSize: -1,
                tileX: -1,
                tileY: -1,
                totalTiles: -1,
                tileIndex: o,
                faceTileIndex: -1,
                face: t,
                cubeFace: -1,
                sweepId: e,
                tileSize: -1,
                direction: new a.Vector3(),
                node: null,
                level: i,
              }),
              (r[s] = n)),
            (n._tileKey = s),
            n
          );
        }
        deleteTileDirectoryEntries(e) {
          var t, i;
          const o = this.tileDirectory[e];
          if (o)
            for (const e of Object.values(o))
              e.image &&
                (null === (i = (t = e.image).close) || void 0 === i || i.call(t), (e.image = null));
          delete this.tileDirectory[e];
        }
        isTileUploaded(e) {
          return this.isSweepZoomed(e.sweepId) ? e.zoomUploaded : e.uploaded;
        }
        setUploaded(e, t) {
          this.isSweepZoomed(e.sweepId) ? (e.zoomUploaded = t) : (e.uploaded = t);
        }
        queueUploadForTile(e, t, i) {
          const o =
              !e.downloaded ||
              (e.uploadQueued && !i) ||
              this.isTileUploaded(e) ||
              (e.panoSize > this.panoQualityManager.getNavPanoSize() && !this.zoomingActive),
            r = this.getRenderTargetDescriptorForSweep(e.sweepId);
          !o &&
            r &&
            this.isRenderTargetDescriptorValid(r) &&
            (i
              ? this.uploadTile(e)
              : (0 === q(A, e.panoSize)
                  ? this.tileUploadQueue.addToForceQueue(e)
                  : t && this.currentState.direction
                    ? this.tileUploadQueue.insertSortedIntoPanoQueue(
                        e,
                        r.extra.sweep,
                        this.currentState.direction,
                      )
                    : this.tileUploadQueue.addToPanoQueue(e.sweepId, e),
                (e.uploadQueued = !0)));
        }
        uploadTile(e) {
          const t = this.persistentStorage.get('uploadTile:tempTileTexture', () => ({})),
            i = this.tileUploadQueue.getPanoLODDescriptor(e.sweepId, e.panoSize),
            o = this.getRenderTargetDescriptorForSweep(e.sweepId);
          if (!o || !e.image || !this.isRenderTargetDescriptorValid(o)) return;
          let r = o.object,
            n = o.extra.size;
          if (
            (this.isSweepZoomed(e.sweepId) &&
              ((r = this.zoomRenderTarget), (n = this.panoQualityManager.getZoomPanoSize())),
            this.isTileUploaded(e) || this.anyUploaded(e.node))
          )
            this.setUploaded(e, !1);
          else {
            const o = e.tileX * e.tileSize,
              l = e.tileY * e.tileSize,
              u = (e.tileSize / e.panoSize) * n,
              h = (o / e.panoSize) * n,
              d = (l / e.panoSize) * n;
            let c = t[e.tileSize];
            if (
              (t[e.tileSize] ||
                ((c = this.cwfRenderer.initSizedTexture2D(e.tileSize, {
                  generateMipmaps: !1,
                  minFilter: a.LinearFilter,
                  flipY: !1,
                })),
                (t[e.tileSize] = c)),
              this.cwfRenderer.uploadTexture2D(e.image, c, 0, 0),
              this.cwfRenderer.renderToCubeMap(
                c,
                r,
                e.tileSize,
                e.tileSize,
                0,
                0,
                e.tileSize,
                e.tileSize,
                h,
                d,
                u,
                u,
                e.cubeFace,
              ),
              s.Xd.overlayStyle > 0)
            ) {
              const t =
                1 === s.Xd.overlayStyle ? this.overlayTilesBasic : this.overlayTilesEnhanced;
              this.cwfRenderer.renderToCubeMap(
                t[e.panoSize],
                r,
                e.tileSize,
                e.tileSize,
                0,
                0,
                e.tileSize,
                e.tileSize,
                h,
                d,
                u,
                u,
                e.cubeFace,
                a.NormalBlending,
                !0,
                0.5,
              );
            }
            i.uploadCount++, this.setUploaded(e, !0);
          }
          e.uploadAttempted || i.uploadAttempts++,
            (e.uploadAttempted = !0),
            i.uploadAttempts === e.totalTiles && this.onPanoRendered(e.sweepId, e.panoSize);
        }
        updateUploadQueueProcessing() {
          if (!this.currentUploadPromise && (this.overlayTilesLoaded || !this.usingTileOverlay)) {
            const e = new w._(
              'pano/tiling/upload',
              () =>
                this.engine
                  .after(g.A.End)
                  .then(() =>
                    this.processUploadQueue(
                      this.tilingSettings.highResUploadsPerFrame,
                      this.tilingSettings.uploadsPerFrame,
                    ),
                  ),
              W,
            );
            this.currentUploadPromise = this.engine.commandBinder
              .issueCommand(e)
              .then(async (e) => {
                await e.promise, (this.currentUploadPromise = null);
              });
          }
        }
        processUploadQueue(e = 1, t) {
          let i = 0,
            o = 0,
            r = null;
          for (; (r = this.tileUploadQueue.getNextFromUploadQueue(this.activeSweeps)); ) {
            const s = this.getRenderTargetDescriptorForSweep(r.sweepId);
            if (
              !(
                (r.panoSize > this.panoQualityManager.getNavPanoSize() && !this.zoomingActive) ||
                !this.isRenderTargetDescriptorValid(s)
              ) &&
              (this.uploadTile(r),
              (i += 0 !== r.level ? 1 : 0),
              (o += 0 === r.level ? 1 : 0),
              o >= t || i >= e)
            )
              break;
          }
        }
        loadOverlayTiles() {
          if (0 !== s.Xd.overlayStyle) {
            let e = 0;
            const t = [],
              o = (i, o, r) => {
                const s = (i[o] = this.cwfRenderer.initSizedTexture2D(A, {
                  generateMipmaps: !1,
                  minFilter: a.LinearFilter,
                  flipY: !1,
                }));
                this.cwfRenderer.uploadTexture2D(r, s, 0, 0),
                  e++,
                  e >= t.length && (this.overlayTilesLoaded = !0);
              };
            switch (s.Xd.overlayStyle) {
              case 1:
                t.push([i(95405), this.overlayTilesBasic, 256]),
                  t.push([i(95405), this.overlayTilesBasic, 512]),
                  t.push([i(43890), this.overlayTilesBasic, 1024]),
                  t.push([i(75183), this.overlayTilesBasic, 2048]),
                  t.push([i(94326), this.overlayTilesBasic, 4096]);
                break;
              case 2:
                t.push([i(21742), this.overlayTilesEnhanced, 256]),
                  t.push([i(21742), this.overlayTilesEnhanced, 512]),
                  t.push([i(20699), this.overlayTilesEnhanced, 1024]),
                  t.push([i(5793), this.overlayTilesEnhanced, 2048]),
                  t.push([i(94991), this.overlayTilesEnhanced, 4096]);
            }
            t.forEach((e) => {
              const t = document.createElement('img');
              (t.crossOrigin = 'anonymous'),
                (t.src = e[0]),
                (t.onload = () => {
                  o.call(this, e[1], e[2], t);
                });
            }),
              (this.usingTileOverlay = !0);
          } else this.usingTileOverlay = !1;
        }
        copyTargetToZoom(e) {
          if (!this.zoomingActive) return;
          const t = this.getRenderTargetDescriptorForSweep(e);
          if (!t) throw new G('Error in copying a null render target to a zoomed target');
          const i = t.object;
          this.cwfRenderer.copyCubemap(i.texture, this.zoomRenderTarget),
            this.copyBaseRenderStatusToZoomed(e);
        }
        setupZoomRenderTarget() {
          if (
            this.panoQualityManager.getZoomPanoSize() >= this.panoQualityManager.getNavPanoSize()
          ) {
            if (
              this.zoomRenderTarget &&
              this.zoomRenderTarget.width === this.panoQualityManager.getZoomPanoSize()
            )
              return;
            const e = this.zoomRenderTarget;
            (this.zoomRenderTarget = this.cwfRenderer.initRenderTargetCube(
              this.panoQualityManager.getZoomPanoSize(),
            )),
              e &&
                (this.cwfRenderer.copyCubemap(e.texture, this.zoomRenderTarget),
                e.texture.dispose(),
                (e.texture.version = 0),
                (e.texture = null)),
              (this.zoomSweepRenderingDisabled = !1);
          } else this.zoomSweepRenderingDisabled = !0;
        }
      }
      var K,
        J = i(85726);
      !(function (e) {
        (e[(e.None = 0)] = 'None'),
          (e[(e.Queued = 1)] = 'Queued'),
          (e[(e.ForceQueued = 2)] = 'ForceQueued'),
          (e[(e.Downloading = 3)] = 'Downloading'),
          (e[(e.Downloaded = 4)] = 'Downloaded'),
          (e[(e.DownloadFailed = 5)] = 'DownloadFailed');
      })(K || (K = {}));
      const ee = K;
      var te,
        ie = i(61173),
        oe = i(58057),
        re = i(43017),
        se = i(61565),
        ne = i(71835);
      !(function (e) {
        (e[(e.CurrentView = 0)] = 'CurrentView'), (e[(e.FullPanorama = 1)] = 'FullPanorama');
      })(te || (te = {}));
      var ae;
      !(function (e) {
        (e[(e.None = 0)] = 'None'), (e[(e.DirectionalFOV = 1)] = 'DirectionalFOV');
      })(ae || (ae = {}));
      class le {
        constructor(e, t, i, o) {
          (this.panoQualityManager = e),
            (this.tilingSettings = t),
            (this.sweepData = i),
            (this.raycaster = o),
            (this.tempQueue = []),
            (this.priorityCriteria = new ge()),
            (this.filterAndPrioritize = (e, t) => {
              if (!this.priorityCriteria.sweep) return;
              const i =
                  void 0 !== this.priorityCriteria.upcomingSweeps &&
                  null !== this.priorityCriteria.upcomingSweeps,
                o = this.tempQueue;
              (o.length = 0), this.queueTilesForPano(o, t, this.priorityCriteria.sweep, c.AB.BASE);
              const r = pe(e, o, !0);
              (this.currViewQueue[c.SL.BASE].value = r),
                (this.fullPanoQueue[c.SL.BASE].value = r),
                i
                  ? this.queueForRestrictedSweeps(e, t)
                  : this.priorityCriteria.viewmode !== re.Ey.Panorama
                    ? this.queueForNonPanoViewmode(e, t)
                    : this.queueForPanoViewmode(e, t),
                this.tilingSettings.downloadFullPano && this.queueFullPano(e, t);
            }),
            (this.queueRaycast = (() => {
              const e = new a.Vector3();
              return (t, i) => {
                if (this.priorityCriteria.sweep)
                  if (this.priorityCriteria.hovered)
                    this.queueTilesForPano(t, i, this.priorityCriteria.hovered, c.AB.BASE);
                  else if (this.raycaster && this.raycaster.hit) {
                    const o = e
                        .copy(this.raycaster.hit.point)
                        .sub(this.priorityCriteria.sweep.position),
                      r = this.getSinglePanoInDirection(o),
                      s = this.sweepData.getSweep(r);
                    s && this.queueTilesForPano(t, i, s, c.AB.BASE);
                  }
              };
            })()),
            (this.getSweepIdInLocalDirection = (() => {
              const e = new a.Vector3();
              return (t) => {
                const i = this.priorityCriteria.rotation,
                  o = e.copy(t).applyQuaternion(i);
                return this.getSinglePanoInDirection(o);
              };
            })()),
            (this.persistentStorage = new T()),
            (this.maxResolution = e.getNavPanoSize()),
            (this.currViewQueue = de()),
            (this.fullPanoQueue = de()),
            (this.isMobileDevice = (0, ie.tq)());
        }
        getQualityQueueSize(e, t) {
          return e === te.CurrentView ? this.currViewQueue[t].value : this.fullPanoQueue[t].value;
        }
        makeQueueSubscription(e, t, i) {
          return (e === te.CurrentView ? this.currViewQueue[t] : this.fullPanoQueue[t]).onChanged(
            i,
          );
        }
        updateCriteria(e, t, i, o) {
          (this.priorityCriteria.sweep = e),
            this.priorityCriteria.position.copy(t),
            this.priorityCriteria.direction.copy(i),
            this.priorityCriteria.rotation.copy(o);
        }
        setHoveredSweep(e) {
          this.priorityCriteria.hovered = null != e ? e : null;
        }
        setUpcomingSweeps(e) {
          this.priorityCriteria.upcomingSweeps = e;
        }
        clearUpcomingSweeps() {
          this.priorityCriteria.upcomingSweeps = void 0;
        }
        setDownloadFOV(e) {
          this.priorityCriteria.fov = e;
        }
        queueForRestrictedSweeps(e, t) {
          if (!this.priorityCriteria.upcomingSweeps) return;
          let i = 0;
          for (const o of this.priorityCriteria.upcomingSweeps)
            if ((i++, this.queueTilesForPano(e, t, o, c.AB.BASE), i >= 3)) break;
          this.queueFOVStandardNarrow(e, t), this.queueFOVHighNarrow(e, t);
        }
        queueForPanoViewmode(e, t) {
          this.queueRaycast(e, t),
            this.queueFOVStandardNarrow(e, t),
            this.queueScoredSweeps(e, t),
            this.queueFOVHighNarrow(e, t),
            this.isMobileDevice || this.queueWASD(e, t);
        }
        queueForNonPanoViewmode(e, t) {
          if (!this.raycaster || !this.raycaster.hit || !this.meshQuery) return 0;
          const i = (0, oe.bG)(this.sweepData, !1, this.raycaster.hit.intersection, this.meshQuery),
            o =
              i.length > 0
                ? i[0].sweep
                : this.sweepData.getClosestSweep(this.raycaster.hit.point, !0);
          return o ? this.queueTilesForPano(e, t, o, c.AB.BASE) : 0;
        }
        queueFOVTiles(e, t, i, o) {
          if (!this.priorityCriteria.sweep) return 0;
          const r = c.eE[t];
          return this.canDownloadSize(this.priorityCriteria.sweep, t)
            ? this.queueTilesInDirectionForPano(
                e,
                o,
                this.priorityCriteria.sweep,
                r,
                this.priorityCriteria.direction,
                i,
              )
            : 0;
        }
        queueScoredSweeps(e, t) {
          if (this.priorityCriteria.sweep && this.maxResolution <= 2048) {
            const i = this.persistentStorage.getArray('filterAndPrioritize:scoredSweeps');
            this.populateScoredSweeps(
              this.priorityCriteria.sweep,
              i,
              this.priorityCriteria.direction,
              6,
            ),
              this.queueTilesForPanos(e, i, t, c.AB.BASE, 4);
          }
        }
        queueFOVStandardNarrow(e, t) {
          if (!this.priorityCriteria.sweep) return;
          const i = this.tempQueue;
          i.length = 0;
          const { direction: o, fov: r, sweep: s } = this.priorityCriteria,
            n = this.queueFOVTiles(i, c.SL.STANDARD, r, t);
          this.sortTiles(i, s, o),
            pe(e, i),
            (this.currViewQueue[c.SL.STANDARD].value = n),
            (this.fullPanoQueue[c.SL.STANDARD].value = n);
        }
        queueFOVHighNarrow(e, t) {
          if (!this.priorityCriteria.sweep) return;
          const i = this.tempQueue;
          i.length = 0;
          const { fov: o } = this.priorityCriteria,
            r = this.queueFOVTiles(i, c.SL.HIGH, o, t),
            s = this.queueFOVTiles(i, c.SL.ULTRAHIGH, o, t);
          this.sortTiles(i, this.priorityCriteria.sweep, this.priorityCriteria.direction),
            pe(e, i),
            (this.currViewQueue[c.SL.HIGH].value = r),
            (this.currViewQueue[c.SL.ULTRAHIGH].value = s);
        }
        queueFullPano(e, t) {
          if (!this.priorityCriteria.sweep) return;
          const i = this.tempQueue;
          if (((i.length = 0), this.maxResolution <= c.AB.HIGH)) {
            if (this.canDownloadSize(this.priorityCriteria.sweep, c.SL.HIGH)) {
              const e = this.queueTilesForPano(i, t, this.priorityCriteria.sweep, c.AB.HIGH);
              this.fullPanoQueue[c.SL.HIGH].value = e;
            }
          } else if (this.canDownloadSize(this.priorityCriteria.sweep, c.SL.ULTRAHIGH)) {
            const e = this.queueTilesForPano(i, t, this.priorityCriteria.sweep, c.AB.ULTRAHIGH);
            this.fullPanoQueue[c.SL.ULTRAHIGH].value = e;
          }
          this.sortTiles(i, this.priorityCriteria.sweep, this.priorityCriteria.direction),
            pe(e, i, !0);
        }
        queueWASD(e, t) {
          const i = this.persistentStorage.getArray('filterAndPrioritize:neighbors') || [];
          if (((i.length = 0), !this.priorityCriteria.sweep)) return;
          const o = [y.fU.FORWARD, y.fU.RIGHT, y.fU.LEFT, y.fU.BACK];
          for (const e of o) {
            const t = this.getSweepIdInLocalDirection(e),
              o = this.sweepData.getSweep(t);
            o && i.push(o);
          }
          this.queueTilesForPanos(e, i, t, c.AB.BASE);
        }
        canDownloadSize(e, t) {
          const i = c.eE[t],
            o =
              this.panoQualityManager.getNavPanoSize() >= i ||
              (this.maxResolution >= i && this.panoQualityManager.getZoomPanoSize() >= i);
          return e.availableResolution(t) === t && o;
        }
        populateScoredSweeps(e, t, i, o) {
          (t = t || []).length = 0;
          const r = new a.Vector3().copy(e.position),
            n = [se._k(), se.ff(e), se.jN(r, 400), se.pI(r, i, 0.75)],
            l = [
              ne.Dv(r, s.Xd.navigation.distanceFactor),
              ne.o7(r, i, s.Xd.navigation.directionFactor),
            ],
            u = this.sweepData.getSweepNeighbours(e),
            h = this.sweepData.sortByScore(n, l, u);
          for (let e = 0; e < h.length && e < o; e++) {
            const i = h[e].sweep;
            t.push(i);
          }
        }
        queueTilesForPanos(e, t, i, o, r) {
          let s = 0;
          for (const n of t) {
            if (((s += this.queueTilesForPano(e, i, n, o) > 0 ? 1 : 0), r && s >= r)) break;
          }
          return s;
        }
        queueTilesForPano(e, t, i, o) {
          const r = this.persistentStorage.get('queueTilesForSweep:filterCriteria', () => ({
            filter: ae.None,
          }));
          return this.filterAndQueueTileDownloadDescriptors(e, t, i, o, r);
        }
        queueTilesInDirectionForPano(e, t, i, o, r, s) {
          const n = this.persistentStorage.get(
              'queueTilesInDirectionForSweep:panoSpaceDir',
              () => new a.Vector3(),
            ),
            l = this.persistentStorage.get('queueTilesInDirectionForSweep:filterCriteria', () => ({
              filter: ae.DirectionalFOV,
              direction: new a.Vector3(),
              fov: 60,
            }));
          return (
            n.copy(r),
            C(i.rotation, n),
            l.direction.copy(n),
            (l.fov = s),
            this.filterAndQueueTileDownloadDescriptors(e, t, i, o, l)
          );
        }
        filterAndQueueTileDownloadDescriptors(e, t, i, o, r) {
          const s = this.persistentStorage.getArray(
              'filterAndQueueTileDownloadDescriptors:descriptors',
            ),
            n = t.getTileDownloadDescriptors(i, o);
          (s.length = 0), this.filterTileDownloadDescriptors(n, s, r);
          let a = 0;
          for (const t of s) t && (e.push(t), a++);
          return a;
        }
        filterTileDownloadDescriptors(e, t, i) {
          let o, r;
          switch (i.filter) {
            case ae.DirectionalFOV:
              for (o = 0; o < e.length; o++)
                (r = e[o]),
                  r &&
                    L(r.panoSize, r.tileSize, r.face, r.tileX, r.tileY, i.direction, i.fov) &&
                    t.push(r);
              break;
            default:
              for (o = 0; o < e.length; o++) (r = e[o]), t.push(r);
          }
          for (o = 0; o < t.length; o++)
            (r = t[o]), r && !this.canIncludeDescriptor(r) && (t[o] = null);
        }
        canIncludeDescriptor(e) {
          return e.status !== ee.Downloading && e.status !== ee.Downloaded;
        }
        sortTiles(e, t, i) {
          ue.panoSpaceDir.copy(i),
            C(t.rotation, ue.panoSpaceDir),
            (ue.fovThresholdNarrow = ce(this.priorityCriteria.fov)),
            e.sort(he);
        }
        insertSortedPanoTile(e, t, i, o) {
          ue.panoSpaceDir.copy(o),
            C(i.rotation, ue.panoSpaceDir),
            (ue.fovThresholdNarrow = ce(this.priorityCriteria.fov));
          let r = -1;
          for (let i = 0; i < e.length; i++) {
            if (he(t, e[i]) <= 0) {
              r = i;
              break;
            }
          }
          if (-1 === r) e[e.length] = t;
          else {
            for (let t = e.length; t > r; t--) e[t] = e[t - 1];
            e[r] = t;
          }
        }
        getSinglePanoInDirection(e) {
          const t = this.priorityCriteria.sweep;
          if (!t) return '';
          const i = [se.ff(t), se._k(), se.pI(t.position, e)],
            o = [ne.o7(t.position, e), ne.TE(t.position)],
            r = t.neighbours
              .filter((e) => {
                const t = this.sweepData.getSweep(e);
                return i.every((e) => e(t));
              })
              .map((e) => {
                const t = this.sweepData.getSweep(e);
                return { sweepId: e, score: o.reduce((e, i) => e + i(t), 0) };
              }),
            s = r.reduce((e, t) => (e.score > t.score ? e : t), r[0]);
          return s ? s.sweepId : '';
        }
      }
      const ue = { panoSpaceDir: new a.Vector3(), fovThresholdNarrow: -1 },
        he = (e, t) => {
          const i = ue.panoSpaceDir,
            o = ue.fovThresholdNarrow,
            r = Math.max(Math.min(i.dot(e.direction), 1), -1),
            s = Math.max(Math.min(i.dot(t.direction), 1), -1);
          return r >= o && s < o
            ? -1
            : (r < o && s >= o) || e.panoSize > t.panoSize
              ? 1
              : t.panoSize > e.panoSize
                ? -1
                : -(r - s);
        };
      function de() {
        return {
          [c.SL.BASE]: (0, J.Y)(0),
          [c.SL.STANDARD]: (0, J.Y)(0),
          [c.SL.HIGH]: (0, J.Y)(0),
          [c.SL.ULTRAHIGH]: (0, J.Y)(0),
        };
      }
      function ce(e) {
        return Math.cos((Math.PI / 180) * (e / 2));
      }
      function pe(e, t, i = !1) {
        let o = 0;
        if (e && t) for (const r of t) (i && -1 !== e.indexOf(r)) || (e.push(r), o++);
        return o;
      }
      class ge {
        constructor() {
          (this.direction = new a.Vector3()),
            (this.position = new a.Vector3()),
            (this.rotation = new a.Quaternion()),
            (this.hovered = null),
            (this.sweep = null),
            (this.viewmode = null),
            (this.fov = 120);
        }
        set({
          direction: e,
          fov: t,
          hovered: i,
          position: o,
          rotation: r,
          sweep: s,
          upcomingSweeps: n,
          viewmode: a,
        }) {
          return (
            this.direction.copy(void 0 === e ? this.direction : e),
            this.position.copy(void 0 === o ? this.position : o),
            this.rotation.copy(void 0 === r ? this.rotation : r),
            (this.hovered = void 0 === i ? this.hovered : i),
            (this.sweep = void 0 === s ? this.sweep : s),
            (this.upcomingSweeps = n),
            (this.viewmode = void 0 === a ? this.viewmode : a),
            (this.fov = void 0 === t ? this.fov : t),
            this
          );
        }
        clone() {
          const e = new ge();
          return e.set(this), e;
        }
      }
      var we = i(27067),
        Se = i(66724);
      const fe = new v.Z('tile-downloader');
      class Te {
        constructor(e, t, i, o) {
          (this.sweepData = e),
            (this.api = t),
            (this.tilePrioritizer = i),
            (this.settings = o),
            (this.persistentStorage = new T()),
            (this.downloadDescriptors = {}),
            (this.priorityQueue = []),
            (this.forceQueue = []),
            (this.activeDownloads = []),
            (this.lastPrioritizedTime = Date.now()),
            (this.processPriorityQueue = !0);
        }
        init() {}
        render() {
          this.update();
        }
        update() {
          this.processQueue(this.forceQueue, !1),
            this.processPriorityQueue &&
              (!this.processQueuePromise &&
                this.activeDownloads.length < this.settings.concurrentDownloads &&
                Date.now() - this.lastPrioritizedTime > 200 &&
                (this.processQueuePromise = this.engine.commandBinder
                  .issueCommand(
                    new w._(
                      'pano/tiling/queue-download',
                      () => {
                        this.queuePrioritizedTiles(), (this.lastPrioritizedTime = Date.now());
                      },
                      100,
                    ),
                  )
                  .then(async (e) => {
                    await e.promise, (this.processQueuePromise = null);
                  })),
              this.processQueue(this.priorityQueue, !1));
        }
        dispose() {}
        activate(e) {
          this.engine = e;
        }
        deactivate(e) {}
        setRestrictedSweeps(e) {
          const t = e.map((e) => this.sweepData.getSweep(e));
          this.tilePrioritizer.setUpcomingSweeps(t), this.clearFromAllQueuesBySweep(e);
        }
        clearRestrictedSweeps() {
          this.tilePrioritizer.clearUpcomingSweeps();
        }
        setLoadCallbacks(e, t) {
          (this.onTileDownloaded = e), (this.onPanoDownloaded = t);
        }
        getNonDownloadedTiles(e, t, i) {
          i.length = 0;
          const o = this.getTileDownloadDescriptors(e, t);
          for (const e of o) !e || (e.status !== ee.None && e.status !== ee.Queued) || i.push(e);
        }
        forceQueueTiles(e, t, i, o) {
          const r = this.persistentStorage.getArray('forceQueueTiles:remaining'),
            s = this.persistentStorage.getArray('forceQueueTiles:matching'),
            n = this.persistentStorage.getArray('forceQueueTiles:toDownload');
          if ((this.getNonDownloadedTiles(e, t, r), (n.length = 0), r.length > 0)) {
            this.tilePrioritizer.sortTiles(r, e, i), (s.length = 0), I(e, t, i, s, !0);
            for (const e of r)
              for (const t of s)
                e.face === t.face && e.faceTileIndex === t.faceTileIndex && n.push(e);
            this.forceQueue.push(...n),
              this.setStatusForAllDescriptors(this.forceQueue, ee.ForceQueued),
              this.clearFromQueue(this.priorityQueue, ee.ForceQueued, !1),
              o && this.processQueue(this.forceQueue, !0);
          }
        }
        clearForceQueue() {
          this.clearQueue(this.forceQueue);
        }
        queuePrioritizedTiles() {
          this.clearQueue(this.priorityQueue),
            this.tilePrioritizer.filterAndPrioritize(this.priorityQueue, this),
            this.invalidateDuplicateEntries(this.priorityQueue),
            this.clearFromQueue(this.priorityQueue, ee.None, !0),
            this.setStatusForAllDescriptors(this.priorityQueue, ee.Queued),
            (this.lastPrioritizedTime = Date.now());
        }
        clearQueue(e) {
          this.setStatusForAllDescriptors(e, ee.None), (e.length = 0);
        }
        clearFromQueue(e, t, i) {
          for (let o = 0; o < e.length; o++) {
            const r = e[o];
            r && ((t === r.status && !i) || (t !== r.status && i)) && (e[o] = null);
          }
        }
        clearFromAllQueuesBySweep(e) {
          this.clearFromQueueBySweep(this.forceQueue, e),
            this.clearFromQueueBySweep(this.priorityQueue, e);
        }
        clearFromQueueBySweep(e, t) {
          const i = (0, S.ow)(t);
          for (let t = 0; t < e.length; t++) {
            const o = e[t];
            o && o.sweep && (i[o.sweep.id] || (e[t] = null));
          }
        }
        setStatusForAllDescriptors(e, t) {
          for (const i of e) i && (i.status = t);
        }
        invalidateDuplicateEntries(e) {
          for (const t of e) t && (t.queuedCount = 0);
          for (let t = 0; t < e.length; t++) {
            const i = e[t];
            i && (i.queuedCount++, i.queuedCount > 1 && (e[t] = null));
          }
        }
        getTileDownloadDescriptors(e, t) {
          const i = this.getAllTileDownloadDescriptors(e.id);
          let o = i[t];
          return (
            o ||
              ((o = this.buildDownloadDescriptorArray(t)),
              (i[t] = o),
              this.initTileDownloadDescriptors(o, e, t)),
            o
          );
        }
        getAllTileDownloadDescriptors(e) {
          let t = this.downloadDescriptors[e];
          return t || ((t = {}), (this.downloadDescriptors[e] = t)), t;
        }
        deleteAllTileDownloadDescriptors(e) {
          (this.downloadDescriptors[e] = null), delete this.downloadDescriptors[e];
        }
        processQueue(e, t) {
          if (
            (this.cleanupActiveDownloads(),
            this.activeDownloads.length < this.settings.concurrentDownloads || t)
          ) {
            const i = t
              ? e.length
              : this.settings.concurrentDownloads - this.activeDownloads.length;
            let o = 0;
            for (let t = 0; o < i && e.length > 0; t++) {
              const t = e.shift();
              t && (this.startDownload(t), o++);
            }
          }
        }
        async startDownload(e) {
          if (e.sweep) {
            const t = e.status === ee.ForceQueued ? we.ru.HIGHEST : we.ru.MEDIUM;
            e.status = ee.Downloading;
            this.checkRestrictedSweep(e.sweep.id) ||
              fe.warn('Downloading a tile that is not in restricted list'),
              this.activeDownloads.push(e);
            const i = await this.getTileUrl(e.sweep, e.panoSize, e.tileSize, e.tileIndex);
            this.api
              .getImageBitmap(i, e.tileSize, e.tileSize, { maxRetries: 3, priority: t })
              .then(this.downloadComplete.bind(this, e), this.downloadFailed.bind(this, e));
          }
        }
        checkRestrictedSweep(e) {
          const t = this.tilePrioritizer.priorityCriteria.upcomingSweeps;
          if (t) {
            let i = !1;
            for (const o of t) o && o.id === e && (i = !0);
            return i;
          }
          return !0;
        }
        downloadFailed(e, t) {
          e.status = ee.DownloadFailed;
        }
        downloadComplete(e, t) {
          if (
            e.sweep &&
            ((e.status = ee.Downloaded),
            (e.image = t),
            this.onTileDownloaded && this.onTileDownloaded(e),
            this.engine.broadcast(new Se.o()),
            this.isPanoDownloaded(e.sweep, e.panoSize))
          ) {
            const t = { sweep: e.sweep, tileSize: e.tileSize, panoSize: e.panoSize };
            this.onPanoDownloaded && this.onPanoDownloaded(t);
          }
        }
        cleanupActiveDownloads() {
          const e = this.persistentStorage.getArray('cleanupActiveDownloads:temp');
          e.length = 0;
          for (const t of this.activeDownloads)
            t.status !== ee.Downloaded && t.status !== ee.DownloadFailed && e.push(t);
          (this.activeDownloads.length = 0), this.activeDownloads.push(...e);
        }
        isPanoDownloaded(e, t) {
          const i = this.getTileDownloadDescriptors(e, t);
          if (!i || i.length <= 0) return !1;
          for (const e of i) if (e && e.status !== ee.Downloaded) return !1;
          return !0;
        }
        buildDownloadDescriptorArray(e) {
          const t = x(e),
            i = [];
          for (let e = 0; e < t; e++) {
            const e = this.buildDownloadDescriptor();
            i.push(e);
          }
          return i;
        }
        buildDownloadDescriptor() {
          return {
            sweep: null,
            panoSize: -1,
            tileSize: -1,
            tileIndex: -1,
            totalTiles: -1,
            faceTileIndex: -1,
            status: ee.None,
            url: null,
            image: null,
            direction: new a.Vector3(),
            face: -1,
            cubeFace: -1,
            tileX: -1,
            tileY: -1,
            queuedCount: -1,
          };
        }
        initTileDownloadDescriptors(e, t, i) {
          for (let o = 0; o < e.length; o++) {
            const r = e[o];
            r && this.initTileDownloadDescriptor(r, t, i, o);
          }
        }
        initTileDownloadDescriptor(e, t, i, o) {
          const r = i >= A ? A : i;
          (e.face = b(i, o)),
            (e.cubeFace = d(e.face)),
            (e.sweep = t),
            (e.panoSize = i),
            (e.tileSize = r),
            (e.tileIndex = o),
            (e.totalTiles = x(i)),
            (e.status = ee.None),
            (e.image = null),
            U(e.panoSize, e.tileIndex, e),
            F(e.panoSize, e.tileSize, e.cubeFace, e.tileX, e.tileY, Q.Center, 0, e.direction);
        }
        getTileUrl(e, t, i, o) {
          const r = this.persistentStorage.get('getTileUrl:locationInfo', () => ({
            face: -1,
            faceTileIndex: -1,
            tileX: -1,
            tileY: -1,
          }));
          U(t, o, r);
          const s = Math.floor(t / i),
            n = s * s,
            a = Math.floor(o / n),
            l = z.Z.getPanoSizeClass(t);
          return e.getTileUrl(l, a, r.tileX, r.tileY);
        }
      }
      var me = i(72317),
        De = i(49128),
        ye = i(93827),
        ve = i(57793),
        Pe = i(33716),
        ze = i(64150),
        Qe = i(31740),
        Re = i(54909),
        Ae = i(93955),
        Fe = i(3189),
        be = i(7721),
        Ue = i(29956),
        xe = i(35557),
        Ce = i(98009);
      class Ie extends o.Y {
        constructor() {
          super(...arguments),
            (this.name = 'sweep-pano-tiling'),
            (this.enum = { resolution: c.SL, queueStyle: te }),
            (this.preloadQuality = null),
            (this.preloadResolution = null),
            (this.handleResolutionChange = (e, t) => {
              const i = this.panoRenderer.getCurrentPanoResolution();
              this.qualityManager.update({ height: this.getVerticalResolution() });
              i !== this.panoRenderer.getCurrentPanoResolution() && e && this.resetPano(e);
            });
        }
        setPreloadQuality(e) {
          this.settingsData.setProperty(s.YS, e);
        }
        async init(e, t) {
          const { market: i } = t,
            [o, a, l] = await Promise.all([
              t.getModuleBySymbol(r.Vs),
              t.getModuleBySymbol(r.Aj),
              i.waitForData(Pe.P),
            ]);
          [this.cameraData, this.settingsData, this.sweepData] = await Promise.all([
            i.waitForData(ve.M),
            i.waitForData(ze.e),
            i.waitForData(Qe.Z),
          ]);
          const u = (this.cwfRenderer = a.cwfRenderer),
            h = a.maxCubemapSize,
            { navPanoSize: d, zoomPanoSize: p } = (function (e) {
              let t = c.AB.STANDARD,
                i = c.AB.HIGH;
              return (
                (0, ie.tq)()
                  ? (0, ie.tq)() && e && ((t = c.AB.STANDARD), (i = c.AB.HIGH))
                  : ((t = c.AB.HIGH), (i = c.AB.ULTRAHIGH)),
                { navPanoSize: t, zoomPanoSize: i }
              );
            })(a.isHighPerformanceMobileGPU());
          (this.settings = new s.k4()),
            (this.qualityManager = new z.Z(h, d, p, this.getVerticalResolution())),
            (this.tilePrioritizer = new le(this.qualityManager, this.settings, this.sweepData, l)),
            t.getModuleBySymbol(r.hi).then((e) => (this.tilePrioritizer.meshQuery = e)),
            (this.tileDownloader = new Te(
              this.sweepData,
              o.getApi(),
              this.tilePrioritizer,
              this.settings,
            )),
            (this.panoRenderer = new $(
              u,
              this.qualityManager,
              this.tileDownloader,
              this.tilePrioritizer,
              this.sweepData,
              this.cameraData,
              this.settings,
            )),
            this.tileDownloader.setLoadCallbacks(this.panoRenderer.onTileDownLoaded),
            t.addComponent(this, this.tileDownloader),
            t.addComponent(this, this.panoRenderer),
            this.bindings.push(
              t.commandBinder.addBinding(Ce.F, async ({ navSize: e }) => {
                this.overrideNavPanoResolutionMax(e);
              }),
            ),
            this.bindings.push(
              t.subscribe(Ae.Z, (e) => {
                this.setTilingFOV();
              }),
              t.subscribe(n.a, () => {
                const e = this.setTilingFOV();
                this.handleResolutionChange(this.sweepData.currentSweep, e);
              }),
              t.subscribe(xe.Vx, () => {
                const e = this.setTilingFOV();
                this.handleResolutionChange(this.sweepData.currentSweep, e);
              }),
              t.subscribe(me.Z, (e) => {
                this.tileDownloader.setRestrictedSweeps(e.sweepIds);
              }),
              t.subscribe(De.Z, (e) => {
                this.tileDownloader.clearRestrictedSweeps();
              }),
              t.subscribe(Re.Z, (e) => {
                const t = this.sweepData.getSweep(e.sweepId);
                this.setHoverPreloadSweep(e.hovered ? t : void 0);
              }),
              t.subscribe(Fe.a, (e) => {
                this.tilePrioritizer.priorityCriteria.viewmode = e.toMode;
              }),
              this.sweepData.onPropertyChanged('transitionActive', () => {
                if (this.sweepData.transition.to) {
                  const e = this.sweepData.getSweep(this.sweepData.transition.to);
                  this.handlePreloadQualityChange(e);
                }
              }),
              this.settingsData.onPropertyChanged(s.YS, () => {
                (this.preloadQuality = this.settingsData.tryGetProperty(s.YS, null)),
                  this.qualityManager.overrideWindowMaximums(null !== this.preloadQuality),
                  this.sweepData.currentSweepObject &&
                    this.handlePreloadQualityChange(this.sweepData.currentSweepObject);
              }),
              t.subscribe(xe.zq, () => {
                this.panoRenderer.clearAllQueuedUploads();
              }),
              t.subscribe(xe.Xq, () => {
                this.panoRenderer.renderAllActivePanos();
              }),
            ),
            this.setTilingFOV(),
            t.broadcast(new be.em(Ue.Y.PanoTiles));
        }
        getVerticalResolution() {
          return this.cwfRenderer.getSize().height * this.cwfRenderer.getPixelRatio();
        }
        overrideNavPanoResolutionMax(e) {
          const t = c.eE[null != e ? e : this.panoRenderer.getCurrentPanoResolution()],
            i = null !== this.settingsData.tryGetProperty(s.YS, null);
          this.qualityManager.overrideWindowMaximums(i), this.qualityManager.overrideNavPanoSize(t);
        }
        setTilingFOV() {
          const e = this.cameraData.fovX(),
            t = this.cameraData.fovY(),
            i = Math.max(e, t) * R.MN;
          return this.tilePrioritizer.setDownloadFOV(i), i;
        }
        getRenderer() {
          return this.panoRenderer;
        }
        setHoverPreloadSweep(e) {
          this.tilePrioritizer && this.tilePrioritizer.setHoveredSweep(e);
        }
        handlePreloadQualityChange(e) {
          if (null !== this.preloadQuality) {
            const t = e.availableResolution(this.preloadQuality);
            this.preloadResolution = z.Z.getPanoSize(t);
          } else this.preloadResolution = null;
          this.enableHighRes(!1);
        }
        enableHighRes(e = !0, t) {
          const i =
            null !== this.preloadResolution
              ? this.preloadResolution
              : e
                ? this.qualityManager.getZoomPanoSize()
                : this.qualityManager.getNavPanoSize();
          this.tilePrioritizer.maxResolution !== i &&
            this.log.debug(`Setting max resolution: ${i}`),
            (this.tilePrioritizer.maxResolution = i),
            this.panoRenderer.highResRenderTarget(e, t);
        }
        enableZooming(e, t) {
          if (e) {
            const e = z.Z.getPanoSizeClass(this.qualityManager.getZoomPanoSize());
            return this.requestResolution({ sweepId: t, resolution: e }).res >= e;
          }
          return this.enableHighRes(!1, t), this.resetPano(t), !1;
        }
        requestResolution({
          onProgress: e,
          queueType: t = te.CurrentView,
          quickly: i = !1,
          resolution: o,
          sweepId: r,
          timeout: n = 1e3,
        }) {
          const a = this.sweepData.getSweep(r);
          (this.settings.highResUploadsPerFrame = i
            ? s.Xd.maxHighResUploadsPerFrame
            : s.Xd.highResUploadsPerFrame),
            (this.settings.concurrentDownloads = i
              ? s.Xd.maxConcurrentDownloads
              : s.Xd.concurrentDownloads),
            (this.settings.downloadFullPano = t === te.FullPanorama);
          const l = a.availableResolution(o),
            u = c.eE[l];
          u > c.AB.HIGH &&
            (this.qualityManager.overrideWindowMaximums(!0),
            this.panoRenderer.enableUltraHighQualityMode(a.id));
          (u > c.eE[this.panoRenderer.getCurrentPanoResolution()] ||
            u > this.qualityManager.getNavPanoSize()) &&
            (this.enableHighRes(!0, a.id), this.resetPano(a.id));
          const h = this.waitForQueue(t, o, n);
          return e && h.progress(e), { res: l, promise: h.nativePromise() };
        }
        waitForQueue(e, t, i = 1e3) {
          const o = new ye.Q(),
            r = () => {
              a.cancel(), o.notify(1), o.resolve();
            };
          let s = this.tilePrioritizer.getQualityQueueSize(e, t),
            n = window.setTimeout(() => {
              this.log.debug(`Download queue ${e} timed out from inactivity after ${i}ms`), r();
            }, i);
          const a = this.tilePrioritizer.makeQueueSubscription(e, t, (e) => {
            if ((n && (window.clearTimeout(n), (n = 0), (s = e)), e > 0)) {
              const t = (s - e) / Math.max(s, 1);
              o.notify(t);
            } else r();
          });
          return o.promise();
        }
        resetSweep(e) {
          this.enableHighRes(!1, e), this.resetPano(e), this.settings.reset();
        }
        resetPano(e) {
          this.panoRenderer.resetRenderStatus(
            e,
            !1,
            !0,
            this.panoRenderer.panoQualityManager.getNavPanoSize(),
          ),
            this.panoRenderer.clearAllQueuedUploadsForPano(e),
            this.panoRenderer.renderPanoTiles(e, null, !1, !1);
        }
      }
    },
    49128: (e, t, i) => {
      i.d(t, { Z: () => r });
      var o = i(8126);
      class r extends o.v0 {
        constructor() {
          super();
        }
      }
    },
    72317: (e, t, i) => {
      i.d(t, { Z: () => r });
      var o = i(8126);
      class r extends o.v0 {
        constructor(e) {
          super(), (this.sweepIds = e);
        }
      }
    },
    65281: (e, t, i) => {
      i.d(t, { L: () => o });
      class o {
        constructor(e) {
          (this.comparer = e || this.defaultComparer), (this.poolArray = []);
        }
        add(e) {
          const t = this.createObjectDescriptor(e);
          return (t.object = e), (t.inUse = !0), this.addObjectDescriptorToPool(t), t;
        }
        get(e) {
          for (const t of this.poolArray)
            if (!t.inUse && this.comparer(t, e)) return (t.inUse = !0), t;
          return null;
        }
        free(e) {
          for (const t of this.poolArray) if (t.object === e) return (t.inUse = !1), !0;
          return !1;
        }
        all() {
          return this.poolArray;
        }
        remove(e) {
          const t = this.poolArray.findIndex((t) => t.object === e);
          return -1 !== t && (this.poolArray.splice(t, 1), !0);
        }
        defaultComparer(e, t) {
          return !0;
        }
        createObjectDescriptor(e) {
          return { object: e, inUse: !1 };
        }
        addObjectDescriptorToPool(e) {
          this.poolArray.push(e);
        }
      }
    },
    43890: (e, t, i) => {
      e.exports = i.p + 'images/outlineBasic1024.png';
    },
    75183: (e, t, i) => {
      e.exports = i.p + 'images/outlineBasic2048.png';
    },
    94326: (e, t, i) => {
      e.exports = i.p + 'images/outlineBasic4096.png';
    },
    95405: (e, t, i) => {
      e.exports = i.p + 'images/outlineBasic512.png';
    },
    20699: (e, t, i) => {
      e.exports = i.p + 'images/outlineEnhanced1024.png';
    },
    5793: (e, t, i) => {
      e.exports = i.p + 'images/outlineEnhanced2048.png';
    },
    94991: (e, t, i) => {
      e.exports = i.p + 'images/outlineEnhanced4096.png';
    },
    21742: (e, t, i) => {
      e.exports = i.p + 'images/outlineEnhanced512.png';
    },
  },
]);
