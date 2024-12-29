/*! For license information please see 206.js.LICENSE.txt */
'use strict';
(self.webpackChunkmp_webgl = self.webpackChunkmp_webgl || []).push([
  [206],
  {
    15109: (e, t, s) => {
      s.d(t, { hf: () => n, lb: () => o });
      var i = s(51804);
      const o = (e = 200) => ({
          resizeDimensions: [
            { property: i.P.width, setDimension: (e) => e.width, duration: e },
            { property: i.P.height, setDimension: (e) => e.height, duration: e },
            { property: i.P.top, setDimension: () => 0, duration: e },
            { property: i.P.left, setDimension: () => 0, duration: e },
          ],
        }),
        n = (e, t, s, o = 200) => {
          const n = [];
          return (
            void 0 !== e &&
              n.push({ property: i.P.width, setDimension: (t) => t.width + e, duration: o }),
            void 0 !== t &&
              n.push({ property: i.P.height, setDimension: (e) => e.height + t, duration: o }),
            void 0 !== s && n.push({ property: i.P.left, setDimension: () => s, duration: o }),
            { resizeDimensions: n }
          );
        };
    },
    28438: (e, t, s) => {
      s.d(t, { g: () => c });
      var i = s(81396),
        o = s(63511),
        n = s(25565),
        r = s(49940),
        a = s(72803),
        h = s(56620);
      class c extends r.S {
        constructor(e, t, s = o.o.ALL) {
          super(),
            (this._opacity = 1),
            (this._chunks = []),
            (this.size = new i.Vector3()),
            (this.center = new i.Vector3()),
            (this.built = !1),
            (this.layers.mask = s.mask),
            (this.name = `RoomMesh:${e}-${t}`),
            (this.meshGroup = e),
            (this.meshSubgroup = t),
            (this.renderOrder = a.z.default),
            (this.onBeforeRender = (e, t, s, i, o, n) => {
              this.updateUniforms(o, n);
            });
        }
        dispose() {
          this.reset();
        }
        reset() {
          (this._chunks.length = 0),
            this.geometry.dispose(),
            delete this.onBuild,
            delete this.onOpacityUpdate,
            (this.built = !1);
        }
        addChunk(e) {
          -1 === this._chunks.indexOf(e) && this._chunks.push(e);
        }
        getChunk(e) {
          return this._chunks[e];
        }
        build() {
          if (this.built) throw new Error('build() should only be called once');
          if (!this._chunks.length) return;
          const e = (0, n.qf)(this._chunks.map((e) => e.geometry));
          e.clearGroups();
          let t = 0;
          (this.material = []),
            this._chunks.forEach((s, i) => {
              s.geometry &&
                s.geometry.index &&
                (e.addGroup(t, s.geometry.index.count, i),
                (t += s.geometry.index.count),
                s.geometry.dispose(),
                (s.geometry = e),
                s.notifyOnMaterialUpdated((e) => {
                  Array.isArray(this.material) && (this.material[i] = e),
                    this.onMaterialUpdate && this.onMaterialUpdate();
                }),
                (s.onOpacityUpdate = (e) => {
                  this.opacity = e;
                }));
            }),
            (this.geometry = e),
            this.geometry.computeBoundingBox(),
            this.geometry.computeBoundingSphere(),
            (this.material = this._chunks.map((e) => e.material)),
            (this.size = this.boundingBox.getSize(this.size)),
            (this.center = this.boundingBox.getCenter(this.center)),
            (this.built = !0),
            this.onBuild && this.onBuild();
        }
        buildWithSingleChunk(e) {
          if (this.built) return;
          const { meshGroup: t, meshSubgroup: s, lod: i } = e;
          (this.name = `RoomMesh:${i}-${t}-${s}-${e.chunkIndex}`),
            (this.meshGroup = t),
            (this.meshSubgroup = s),
            this._chunks.push(e),
            e.notifyOnMaterialUpdated((e) => {
              (this.material = e), this.onMaterialUpdate && this.onMaterialUpdate();
            }),
            (e.onOpacityUpdate = (e) => {
              this.opacity = e;
            }),
            (this.size = this.boundingBox.getSize(this.size)),
            (this.center = this.boundingBox.getCenter(this.center)),
            (this.built = !0),
            this.onBuild && this.onBuild();
        }
        updateUniforms(e, t) {
          e instanceof i.RawShaderMaterial &&
            (t
              ? this.chunks[t.materialIndex].onBeforeDraw(e)
              : this.chunks.length && this.chunks[0].onBeforeDraw(e));
        }
        get boundingBox() {
          return (0, n.A5)(this.geometry);
        }
        set opacity(e) {
          e !== this.opacity &&
            ((this._opacity = e),
            (this.raycastEnabled = e > h.xx.FADE_CLICKABLE_THRESHOLD),
            (this.renderOrder = e < h.xx.FADE_OPAQUE ? a.z.ghostFloor : a.z.default),
            this.onOpacityUpdate && this.onOpacityUpdate(e));
        }
        get opacity() {
          return this._opacity;
        }
        get chunks() {
          return this._chunks;
        }
        getSortKey() {
          return this.chunks.length ? this._chunks[0].getSortKey() : 0;
        }
      }
    },
    65302: (e, t, s) => {
      var i;
      s.d(t, { V: () => i }),
        (function (e) {
          (e[(e.Min = 0)] = 'Min'),
            (e[(e.Standard = 1)] = 'Standard'),
            (e[(e.High = 2)] = 'High'),
            (e[(e.Detail = 3)] = 'Detail');
        })(i || (i = {}));
    },
    41492: (e, t, s) => {
      s.d(t, { t: () => r });
      var i = s(1055),
        o = s(61173),
        n = s(65302);
      const r = {
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
        errorTarget: Number((0, i.eY)('errorTarget', (0, o.tq)() ? 6 : 4)),
        errorMultiplierHiddenFloors: 0.01,
        errorMultiplierRaycastOcclusion: 0.1,
        smallMeshThreshold: Number((0, i.eY)('smallMeshThreshold', 40)),
        smallMeshErrorMultiplier: Number((0, i.eY)('smallMeshErrorMultiplier', 0.1)),
      };
    },
    97140: (e, t, s) => {
      s.d(t, { $4: () => n, oR: () => o });
      var i = s(28438);
      const o = (e) => !!e && e instanceof i.g,
        n = {
          hasMeshGroup: (e) => 'object' == typeof e && !!e && 'meshGroup' in e,
          hasMeshSubgroup: (e) => 'object' == typeof e && !!e && 'meshSubgroup' in e,
          isRoomMesh: o,
          isVisibleRoomMesh: (e) => o(e) && e.raycastEnabled && e.visible,
        };
    },
    74094: (e, t, s) => {
      s.d(t, { u: () => o });
      var i = s(56063);
      class o extends i.m {
        constructor(e = null) {
          super(), (this.payload = { cursor: e });
        }
      }
      o.id = 'SET_MOUSE_CURSOR';
    },
    945: (e, t, s) => {
      var i;
      s.d(t, { C: () => i }),
        (function (e) {
          (e.NONE = 'none'),
            (e.DEFAULT = 'default'),
            (e.MOVE = 'move'),
            (e.MOVE_LF = 'col-resize'),
            (e.MOVE_UD = 'row-resize'),
            (e.XHAIR = 'crosshair'),
            (e.PLUS = 'cell'),
            (e.QUESTION = 'help'),
            (e.NOPE = 'not-allowed'),
            (e.FINGER = 'pointer'),
            (e.TEXT = 'text'),
            (e.TEXT_VERT = 'vertical-text'),
            (e.ZOOM_IN = 'zoom-in'),
            (e.ZOOM_OUT = 'zoom-in'),
            (e.GRAB = 'grab'),
            (e.GRABBING = 'grabbing'),
            (e.ARROW_R = 'e-resize'),
            (e.ARROW_L = 'w-resize'),
            (e.ARROW_U = 'n-resize'),
            (e.ARROW_D = 's-resize'),
            (e.ARROW_UR = 'ne-resize'),
            (e.ARROW_UL = 'nw-resize'),
            (e.ARROW_DR = 'se-resize'),
            (e.ARROW_DL = 'sw-resize'),
            (e.ARROW_LR = 'ew-resize'),
            (e.ARROW_UD = 'ns-resize'),
            (e.ARROW_URDL = 'nesw-resize'),
            (e.ARROW_ULDR = 'nwse-resize'),
            (e.ROOMBOUNDS_DEFAULT = 'rbe-default'),
            (e.ROOMBOUNDS_MOVING = 'rbe-moving'),
            (e.ROOMBOUNDS_PLACE_NODE = 'rbe-place-node'),
            (e.ROOMBOUNDS_FINISH_ROOM = 'rbe-finish-room');
        })(i || (i = {}));
    },
    52281: (e, t, s) => {
      s.d(t, { E: () => i });
      const i = { longerTransitionMaxDist: 10, TRANSITION_TIME_DH: 650, TRANSITION_TIME_ROOM: 800 };
    },
    58057: (e, t, s) => {
      s.d(t, { Tq: () => r, bG: () => h });
      var i = s(61565),
        o = s(71835),
        n = s(52281);
      const r = (e, t, s, i, ...o) =>
          a({ sweepData: e, direction: t, directionFactor: s, sourceSweep: i, ignoreSweeps: o }),
        a = (e) => {
          const {
            sweepData: t,
            direction: s,
            sourceSweep: n,
            ignoreSweeps: r,
            directionFactor: a,
          } = e;
          if (!t.currentSweepObject) return [];
          const h = n || t.currentSweepObject,
            c = [i.ff(h), i._k(), i.vO(h), i.pI(h.position, s, a)];
          for (const e of r) c.push(i.ff(e));
          const u = [o.o7(h.position, s), o.TE(h.position)],
            d = t.getSweepNeighbours(h);
          return t.sortByScore(c, u, d);
        },
        h = (e, t, s, r) => {
          const a = [i._k(), i._T()],
            h = [o.Dv(s.point)],
            c = e.currentSweepObject;
          t && c && a.push(i.ff(c), i.SF(c.position, n.E.longerTransitionMaxDist), i.vO(c)),
            s.face && a.push(i.D5(s.point, s.face.normal));
          const u = r.floorIdFromObject(s.object);
          u && h.push(o.Bv(u));
          const d = e.sortByScore(a, h);
          if (0 === d.length) {
            const t = e.getClosestSweep(s.point, !0);
            d.push({ sweep: t, score: 0 });
          }
          return d;
        };
    },
    53015: (e, t, s) => {
      s.d(t, { O: () => n });
      var i = s(44303),
        o = s(49095);
      function n(e, t, s) {
        const n = e && e.hasRooms(),
          r = s ? t.getLayer(s) : t.getActiveLayer();
        return r && r.layerType === i.s0.COMMON_USER_LAYER
          ? !n
          : !!(0, o.AI)(t.getCurrentView()) || !n;
      }
    },
    35922: (e, t, s) => {
      s.d(t, { I: () => o });
      var i = s(56063);
      class o extends i.m {
        constructor(e) {
          super(), (this.payload = { roomAssociation: e });
        }
      }
      o.id = 'REGISTER_ROOM_ASSOCIATION_SOURCE';
    },
    16810: (e, t, s) => {
      s.d(t, { d: () => i });
      class i {
        constructor(e) {
          (this.tags = []), e && Object.assign(this, e);
        }
      }
    },
    43606: (e, t, s) => {
      s.d(t, { MU: () => a });
      var i,
        o = s(28721),
        n = s(85661);
      !(function (e) {
        (e.GET = 'GET'),
          (e.POST = 'POST'),
          (e.PATCH = 'PATCH'),
          (e.PUT = 'PUT'),
          (e.DELETE = 'DELETE'),
          (e.OPTIONS = 'OPTIONS');
      })(i || (i = {}));
      class r extends class {
        constructor() {
          this._options = { responseType: 'json' };
        }
        get options() {
          const e = this._options;
          return (e.headers = (0, n.m)(this.url, this._options.headers || {})), e;
        }
      } {
        constructor(e) {
          super(), (this.config = e), (this.url = e.path);
        }
        async read() {
          const { deserialize: e } = this.config;
          let t = null;
          return (
            this.config.cachedData && this.config.cachedData.data
              ? (t = this.config.cachedData.data)
              : ((t = await this.config.queue.get(this.config.path, this.options)),
                this.config.cachedData && (this.config.cachedData.data = t)),
            e(t)
          );
        }
        clearCache() {
          this.config.cachedData && (this.config.cachedData.data = null);
        }
      }
      class a extends r {
        constructor(e) {
          super(e),
            (this.config = e),
            (this.acceptsPartial = !1),
            (this.config.batchUpdate = 'batchUpdate' in this.config && this.config.batchUpdate);
        }
        async create(e) {
          throw Error('Not implemented');
        }
        updateBatch(e, t) {
          const { serialize: s } = this.config,
            o = [],
            n = [...new Set([...Object.keys(e), ...Object.keys(t)])];
          for (const s of n) {
            e[s] ||
              t[s] ||
              o.push(this.config.queue.delete(`${this.config.path}/${s}`, this.options));
          }
          const r = s(e, t),
            a = Object.assign(Object.assign({}, this.options), { body: r });
          return (
            o.push(
              this.config.queue.request(this.config.httpMethod || i.POST, this.config.path, a),
            ),
            Promise.all(o)
          );
        }
        updateInternal(e, t) {
          const { serialize: s } = this.config,
            n = [],
            r = Object.assign({}, this.options),
            a = Object.keys(e),
            h = Object.keys(t),
            c = (0, o.XN)(a.concat(h));
          for (const o in c) {
            const a = c[o],
              h = e[a] || t[a];
            if (h) {
              const e = {};
              e[a] = h;
              const o = {},
                c = t[a];
              c && (o[a] = c);
              const u = s(e, o);
              (r.body = u),
                n.push(
                  this.config.queue.request(this.config.httpMethod || i.POST, this.config.path, r),
                );
            } else n.push(this.config.queue.delete(`${this.config.path}/${a}`, this.options));
          }
          return Promise.all(n);
        }
        async update(e, t) {
          this.clearCache(),
            await (this.config.batchUpdate
              ? this.updateBatch(e, t || {})
              : this.updateInternal(e, t || {}));
        }
        async delete(e) {
          throw Error('Not implemented');
        }
      }
    },
    97957: (e, t, s) => {
      s.d(t, { E: () => o });
      var i = s(81396);
      class o extends i.Mesh {
        constructor(e, t) {
          super(e, t);
        }
      }
    },
  },
]);
