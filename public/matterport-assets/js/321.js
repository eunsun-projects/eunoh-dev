/*! For license information please see 321.js.LICENSE.txt */
(self.webpackChunkmp_webgl = self.webpackChunkmp_webgl || []).push([
  [321],
  {
    92011: (e, t) => {
      'use strict';
      var i = (t.binary_mesh = {});
      (i.read = function (e, t) {
        return e.readFields(i._readField, { chunk: [], quantized_chunk: [] }, t);
      }),
        (i._readField = function (e, t, i) {
          1 === e
            ? t.chunk.push(r.read(i, i.readVarint() + i.pos))
            : 2 === e && t.quantized_chunk.push(l.read(i, i.readVarint() + i.pos));
        }),
        (i.write = function (e, t) {
          if (e.chunk)
            for (var i = 0; i < e.chunk.length; i++) t.writeMessage(1, r.write, e.chunk[i]);
          if (e.quantized_chunk)
            for (i = 0; i < e.quantized_chunk.length; i++)
              t.writeMessage(2, l.write, e.quantized_chunk[i]);
        });
      var s = (t.vertices_simple = {});
      (s.read = function (e, t) {
        return e.readFields(s._readField, { xyz: [], uv: [] }, t);
      }),
        (s._readField = function (e, t, i) {
          1 === e ? i.readPackedFloat(t.xyz) : 2 === e && i.readPackedFloat(t.uv);
        }),
        (s.write = function (e, t) {
          e.xyz && t.writePackedFloat(1, e.xyz), e.uv && t.writePackedFloat(2, e.uv);
        });
      var o = (t.faces_simple = {});
      (o.read = function (e, t) {
        return e.readFields(o._readField, { faces: [] }, t);
      }),
        (o._readField = function (e, t, i) {
          1 === e && i.readPackedVarint(t.faces);
        }),
        (o.write = function (e, t) {
          e.faces && t.writePackedVarint(1, e.faces);
        });
      var r = (t.chunk_simple = {});
      (r.read = function (e, t) {
        return e.readFields(
          r._readField,
          { vertices: null, faces: null, chunk_name: '', material_name: '' },
          t,
        );
      }),
        (r._readField = function (e, t, i) {
          1 === e
            ? (t.vertices = s.read(i, i.readVarint() + i.pos))
            : 2 === e
              ? (t.faces = o.read(i, i.readVarint() + i.pos))
              : 3 === e
                ? (t.chunk_name = i.readString())
                : 4 === e && (t.material_name = i.readString());
        }),
        (r.write = function (e, t) {
          e.vertices && t.writeMessage(1, s.write, e.vertices),
            e.faces && t.writeMessage(2, o.write, e.faces),
            e.chunk_name && t.writeStringField(3, e.chunk_name),
            e.material_name && t.writeStringField(4, e.material_name);
        });
      var n = (t.vertices_quantized = {});
      (n.read = function (e, t) {
        return e.readFields(
          n._readField,
          { quantization: 0, translation: [], x: [], y: [], z: [] },
          t,
        );
      }),
        (n._readField = function (e, t, i) {
          1 === e
            ? (t.quantization = i.readFloat())
            : 2 === e
              ? i.readPackedFloat(t.translation)
              : 3 === e
                ? i.readPackedSVarint(t.x)
                : 4 === e
                  ? i.readPackedSVarint(t.y)
                  : 5 === e && i.readPackedSVarint(t.z);
        }),
        (n.write = function (e, t) {
          e.quantization && t.writeFloatField(1, e.quantization),
            e.translation && t.writePackedFloat(2, e.translation),
            e.x && t.writePackedSVarint(3, e.x),
            e.y && t.writePackedSVarint(4, e.y),
            e.z && t.writePackedSVarint(5, e.z);
        });
      var a = (t.uv_quantized = {});
      (a.read = function (e, t) {
        return e.readFields(a._readField, { name: '', quantization: 0, u: [], v: [] }, t);
      }),
        (a._readField = function (e, t, i) {
          1 === e
            ? (t.name = i.readString())
            : 2 === e
              ? (t.quantization = i.readFloat())
              : 3 === e
                ? i.readPackedSVarint(t.u)
                : 4 === e && i.readPackedSVarint(t.v);
        }),
        (a.write = function (e, t) {
          e.name && t.writeStringField(1, e.name),
            e.quantization && t.writeFloatField(2, e.quantization),
            e.u && t.writePackedSVarint(3, e.u),
            e.v && t.writePackedSVarint(4, e.v);
        });
      var h = (t.faces_compressed = {});
      (h.read = function (e, t) {
        return e.readFields(h._readField, { faces: [] }, t);
      }),
        (h._readField = function (e, t, i) {
          1 === e && i.readPackedSVarint(t.faces);
        }),
        (h.write = function (e, t) {
          e.faces && t.writePackedSVarint(1, e.faces);
        });
      var l = (t.chunk_quantized = {});
      (l.read = function (e, t) {
        return e.readFields(
          l._readField,
          { chunk_name: '', material_name: '', vertices: null, uvs: [], faces: null },
          t,
        );
      }),
        (l._readField = function (e, t, i) {
          1 === e
            ? (t.chunk_name = i.readString())
            : 2 === e
              ? (t.material_name = i.readString())
              : 3 === e
                ? (t.vertices = n.read(i, i.readVarint() + i.pos))
                : 4 === e
                  ? t.uvs.push(a.read(i, i.readVarint() + i.pos))
                  : 5 === e && (t.faces = o.read(i, i.readVarint() + i.pos));
        }),
        (l.write = function (e, t) {
          if (
            (e.chunk_name && t.writeStringField(1, e.chunk_name),
            e.material_name && t.writeStringField(2, e.material_name),
            e.vertices && t.writeMessage(3, n.write, e.vertices),
            e.uvs)
          )
            for (var i = 0; i < e.uvs.length; i++) t.writeMessage(4, a.write, e.uvs[i]);
          e.faces && t.writeMessage(5, o.write, e.faces);
        });
    },
    65838: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => S });
      var s = i(933),
        o = i(4763),
        r = i(24938),
        n = i(31740),
        a = i(90512),
        h = i(44288),
        l = i(3999),
        d = i(68540),
        c = i(16013),
        u = i(68687),
        m = i(98375),
        p = i(57363),
        g = i(87549),
        y = i(30850),
        v = i(43846),
        f = i(81378),
        w = i(13512),
        M = i(43017),
        b = i(55574);
      class D extends s.Y {
        constructor() {
          super(...arguments),
            (this.name = 'mesh-quality'),
            (this.measurementModeData = null),
            (this.updateMaxQuality = (() => {
              let e, t, i;
              return ({ modeChange: s, criticalChange: o, interactionChange: r }) => {
                void 0 !== o && (t = o), void 0 !== s && (e = s), void 0 !== r && (i = r);
                const n =
                    i === y.s.VrOrientOnly ||
                    i === y.s.VrWithController ||
                    i === y.s.VrWithTrackedController,
                  a = this.modelMeshModule.stats(),
                  h =
                    a.textureCount <= this.config.textureLODThreshold
                      ? Math.max(v.S.ULTRA, this.config.maxQuality)
                      : v.S.MEDIUM,
                  l = Math.max(
                    h,
                    e === M.Ey.Panorama &&
                      0 === this.modelMeshModule.meshGroupVisuals.meshTextureOpacity.value
                      ? h
                      : this.config.maxQuality,
                  );
                this.modelMeshModule.setTextureLimits(h, l);
                const d =
                    this.viewmodeData.currentMode !== M.Ey.Dollhouse &&
                    this.viewmodeData.currentMode !== M.Ey.Floorplan,
                  c =
                    this.viewmodeData.transition.active &&
                    (0, M.Bw)(this.viewmodeData.transition.to);
                n || c || ((a.streaming || t) && d)
                  ? this.modelMeshModule.setTextureStreamMode(f.l.NONE)
                  : this.modelMeshModule.setTextureStreamMode(this.config.textureLOD);
              };
            })());
        }
        async init(e, t) {
          (this.config = e),
            (this.engine = t),
            ([
              this.modelMeshModule,
              this.viewmodeData,
              this.sweepData,
              this.appData,
              this.interactionModeData,
            ] = await Promise.all([
              t.getModuleBySymbol(o.Ve),
              t.market.waitForData(a.O),
              t.market.waitForData(n.Z),
              t.market.waitForData(r.pu),
              t.market.waitForData(b.Z),
            ])),
            await this.modelMeshModule.firstMeshLoadPromise,
            this.bindAppEventsToTextureQuality(),
            this.bindAppEventsToTextureVisibility(),
            this.updateMaxQuality({}),
            this.showcaseMeshDetailRules();
        }
        bindAppEventsToTextureQuality() {
          let e = 0;
          const t = this.modelMeshModule.meshGroupVisuals.meshTextureOpacity;
          this.bindings.push(
            t.onChanged(() => {
              t.value !== e && this.updateMaxQuality({}), (e = t.value);
            }),
            this.appData.onPhase(() => {
              this.updateMaxQuality({});
            }),
            this.engine.subscribe(p.Z, (e) => {
              this.updateMaxQuality({ criticalChange: !0, modeChange: e.toMode });
            }),
            this.engine.subscribe(g.Z, (e) => {
              this.updateMaxQuality({ criticalChange: !1, modeChange: e.toMode });
            }),
            this.engine.subscribe(m.oR, () => {
              this.updateMaxQuality({ criticalChange: !0 });
            }),
            this.engine.subscribe(m.NR, () => {
              this.updateMaxQuality({ criticalChange: !1 });
            }),
            this.engine.subscribe(d.Z, () => {
              this.updateMaxQuality({ criticalChange: !0 });
            }),
            this.engine.subscribe(c.Z, () => {
              this.updateMaxQuality({ criticalChange: !1 });
            }),
            this.engine.subscribe(l.m, (e) => {
              this.updateMaxQuality({ interactionChange: e.mode });
            }),
          );
        }
        showcaseMeshDetailRules() {
          const { modelMeshModule: e, log: t } = this,
            i = () => this.appData.phase <= this.appData.phases.LOADING,
            s = () => this.appData.phase === this.appData.phases.STARTING,
            o = () =>
              this.appData.phase >= this.appData.phases.PLAYING &&
              this.appData.phase !== this.appData.phases.ERROR,
            r = () => this.appData.phase === this.appData.phases.ERROR,
            n = (e) => this.viewmodeData.closestMode === e,
            a = () => n(M.Ey.Panorama),
            l = () => this.viewmodeData.transition.active,
            d = (e) => l() && this.viewmodeData.transition.to === e,
            c = () => {
              var e, t;
              return (
                null !==
                  (t =
                    null === (e = this.measurementModeData) || void 0 === e
                      ? void 0
                      : e.isEditingOrCreating()) &&
                void 0 !== t &&
                t
              );
            },
            u = () => this.interactionModeData.isVR(),
            m = () => void 0 !== this.sweepData.currentAlignedSweepObject;
          function p() {
            const h = e.getMeshDetail();
            let p = h;
            o()
              ? l()
                ? (d(M.Ey.Dollhouse) || d(M.Ey.Floorplan) || d(M.Ey.Mesh)) && (p = 'max')
                : ((p = 'default'),
                  a() && u() && (p = 'minimal'),
                  a() && !m() && (p = 'minimal'),
                  a() && c() && (p = 'max'),
                  (n(M.Ey.Dollhouse) || n(M.Ey.Floorplan) || n(M.Ey.Mesh)) && (p = 'max'))
              : (i() && (p = 'minimal'), r() && (p = 'minimal'), s() && (p = 'default')),
              h !== p &&
                (t.debug(`overrideMaxDetail from ${h} to ${p}`),
                e.setMeshOptions({ overrideMaxDetail: p }));
          }
          this.bindings.push(
            this.appData.onPhase(p),
            this.viewmodeData.onChanged(p),
            this.modelMeshModule.meshGroupVisuals.meshTextureOpacity.onComplete(p),
            this.interactionModeData.onChanged(p),
          ),
            this.engine.market.waitForData(h.X).then((e) => {
              this.bindings.push(e.onPhaseChanged(p)), (this.measurementModeData = e);
            }),
            p();
        }
        bindAppEventsToTextureVisibility() {
          this.bindings.push(
            this.engine.subscribe(u.Z, (e) => {
              const t = this.sweepData.isSweepUnaligned(e.toSweep);
              t !== this.sweepData.isSweepUnaligned(e.fromSweep) &&
                this.modelMeshModule.setRenderMode(t ? w.k.PanoramaCube : w.k.PanoramaMesh);
            }),
          );
        }
      }
      const S = D;
    },
    38575: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => f });
      var s = i(4763),
        o = i(31971),
        r = i(20360),
        n = i(97187),
        a = i(933),
        h = i(69947),
        l = i(90512),
        d = i(43017),
        c = i(64150),
        u = i(56620),
        m = i(57793),
        p = i(22925),
        g = i(49095),
        y = i(35575),
        v = i(11134);
      class f extends a.Y {
        constructor() {
          super(...arguments),
            (this.name = 'showcase-hotkeys'),
            (this.inputCommandMap = {
              [h.M.PRESSED]: {
                [r.R.ONE]: () => (
                  this.viewmodeData.currentMode === d.Ey.Panorama &&
                    (this.settings.setProperty(u.Lp, !1), (this.currentView = 0)),
                  this.switchToMode(n.BD.INSIDE)
                ),
                [r.R.TWO]: () => this.switchToMode(n.BD.DOLLHOUSE),
                [r.R.THREE]: () => this.switchToMode(n.BD.FLOORPLAN),
                [r.R.ZERO]: () => {
                  const e = this.currentView++ % this.meshViews.length;
                  return this.meshViews[e]();
                },
                [r.R.FOUR]: () => this.toggleDefurnishView(),
              },
            }),
            (this.currentView = 0),
            (this.meshViews = [
              () => (this.settings.setProperty(u.Lp, !1), this.switchToMode(n.BD.MESH)),
              () => (this.settings.setProperty(u.Lp, !0), this.switchToMode(n.BD.MESH)),
              () => (this.settings.setProperty(u.Lp, !0), this.switchToMode(n.BD.INSIDE)),
              () => (this.settings.setProperty(u.Lp, !1), this.switchToMode(n.BD.INSIDE)),
            ]);
        }
        async init(e, t) {
          const i = await t.getModuleBySymbol(s.PZ);
          ([this.viewmodeData, this.settings, this.cameraData, this.layersData] = await Promise.all(
            [
              t.market.waitForData(l.O),
              t.market.waitForData(c.e),
              t.market.waitForData(m.M),
              t.market.waitForData(p.R),
            ],
          )),
            (this.issueCommand = t.commandBinder.issueCommand.bind(t.commandBinder));
          let r = null;
          i.registerHandler(o.e, async (e) => {
            !r &&
              this.inputCommandMap[e.state] &&
              this.inputCommandMap[e.state][e.key] &&
              ((r = this.inputCommandMap[e.state][e.key]()), await r, (r = null));
          });
        }
        async switchToMode(e) {
          const { currentMode: t } = this.viewmodeData;
          if (t !== d.Ey.Transition) {
            const i =
              (0, d.Bw)(t) && (e === n.BD.MESH || e === n.BD.INSIDE)
                ? this.cameraData.pose.rotation
                : void 0;
            try {
              await this.issueCommand(new n._i(e, void 0, { rotation: i }));
            } catch (e) {
              this.log.debug('Unable to switchToMode', e);
            }
          }
        }
        async toggleDefurnishView() {
          var e;
          const t =
              null ===
                (e = this.layersData
                  .getOrderedModelViews({ includeDefurnish: !0, includeDisabled: !1 })
                  .find((e) => (0, g.eU)(e))) || void 0 === e
                ? void 0
                : e.id,
            i = this.layersData.getBaseModelId();
          if (!t) return;
          const s = this.layersData.currentViewId === t;
          try {
            await this.issueCommand(new v.D(!1)),
              await this.issueCommand(new y.wG(s ? i : t)),
              await this.issueCommand(new v.D(!0));
          } catch (e) {
            this.log.debug('Unable to toggle defurnish', e);
          }
        }
      }
    },
    6377: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => F });
      var s = i(933),
        o = i(34608),
        r = i(4763),
        n = i(64150),
        a = i(9263),
        h = i(25396),
        l = i(90288),
        d = i(93797),
        c = i(53257),
        u = i(65919),
        m = i(30629),
        p = i(62680),
        g = i(80383);
      const y = new c.Z('mds-player-options-deserializer'),
        v = { [g.Y6.LEFT]: m.kw.Left, [g.Y6.RIGHT]: m.kw.Right, [g.Y6.AUTO]: m.kw.Auto },
        f = { [g.rq.BLACK]: p.z.black, [g.rq.GREY]: p.z.grey, [g.rq.WHITE]: p.z.white };
      class w {
        deserialize(e) {
          var t;
          if (!e || !this.validate(e))
            return y.debug('Deserialized invalid options data from MDS', e), null;
          const i = (null === (t = e.publication) || void 0 === t ? void 0 : t.options) || {},
            s = e.options || {},
            o = (null == s ? void 0 : s.tourPanDirection) ? v[s.tourPanDirection] : m.kw.Auto,
            r = {
              defurnish_view: s.defurnishViewEnabled,
              address: i.address,
              contact_email: i.contactEmail,
              contact_name: i.contactName,
              contact_phone: i.contactPhone,
              dollhouse: s.dollhouseEnabled,
              external_url: i.externalUrl,
              floor_plan: s.floorplanEnabled,
              floor_select: s.floorSelectEnabled,
              highlight_reel: s.highlightReelEnabled,
              labels: s.labelsEnabled,
              labels_dh: s.dollhouseLabelsEnabled,
              model_name: i.modelName,
              model_summary: i.modelSummary,
              presented_by: i.presentedBy,
              measurements: s.measurements !== g.XR.DISABLED,
              measurements_saved: s.measurements === g.XR.MEASUREANDVIEW,
              room_bounds: s.roomBoundsEnabled,
              unit_type: s.unitType === g.nL.IMPERIAL ? u.M.IMPERIAL : u.M.METRIC,
              background_color: (null == s ? void 0 : s.backgroundColor)
                ? f[s.backgroundColor]
                : p.z.black,
              tour_buttons: s.tourButtonsEnabled,
              fast_transitions: s.tourFastTransitionsEnabled,
              transition_speed: s.tourTransitionSpeed,
              transition_time: s.tourTransitionTime,
              pan_speed: s.tourPanSpeed,
              dollhouse_pan_speed: s.tourDollhousePanSpeed,
              zoom_duration: s.tourZoomDuration,
              pan_angle: s.tourPanAngle,
              pan_direction: o,
              space_search: s.spaceSearchEnabled,
            };
          return new a.af(r);
        }
        validate(e) {
          if (!e) return !1;
          return ['id', 'options', 'publication'].every((t) => t in e);
        }
      }
      var M = i(90253);
      const b = (0, M.S)(v),
        D = (0, M.S)(f);
      class S {
        serialize(e) {
          const t = {},
            i = e.options || {};
          if (
            (void 0 !== i.defurnish_view &&
              (t.defurnishViewOverride = i.defurnish_view ? g.J1.ENABLED : g.J1.DISABLED),
            void 0 !== i.dollhouse &&
              (t.dollhouseOverride = i.dollhouse ? g.J1.ENABLED : g.J1.DISABLED),
            void 0 !== i.floor_plan &&
              (t.floorplanOverride = i.floor_plan ? g.J1.ENABLED : g.J1.DISABLED),
            void 0 !== i.floor_select &&
              (t.floorSelectOverride = i.floor_select ? g.J1.ENABLED : g.J1.DISABLED),
            void 0 !== i.room_bounds &&
              (t.roomBoundsOverride = i.room_bounds ? g.J1.ENABLED : g.J1.DISABLED),
            void 0 !== i.space_search &&
              (t.spaceSearchOverride = i.space_search ? g.J1.ENABLED : g.J1.DISABLED),
            void 0 !== i.labels && (t.labelsOverride = i.labels ? g.J1.ENABLED : g.J1.DISABLED),
            void 0 !== i.labels_dh &&
              (t.dollhouseLabelsOverride = i.labels_dh ? g.J1.ENABLED : g.J1.DISABLED),
            void 0 !== i.highlight_reel &&
              (t.highlightReelOverride = i.highlight_reel ? g.J1.ENABLED : g.J1.DISABLED),
            void 0 !== i.background_color &&
              (t.backgroundColor = { set: D[i.background_color] || g.rq.BLACK }),
            void 0 !== i.unit_type)
          ) {
            const e = i.unit_type === u.M.METRIC ? g.nL.METRIC : g.nL.IMPERIAL;
            t.unitType = { set: e };
          }
          if (void 0 !== i.measurements || void 0 !== i.measurements_saved) {
            const e =
              i.measurements && i.measurements_saved
                ? g.XR.MEASUREANDVIEW
                : i.measurements
                  ? g.XR.MEASURE
                  : g.XR.DISABLED;
            t.measurements = { set: e };
          }
          void 0 !== i.tour_buttons &&
            (t.tourButtonsOverride = i.tour_buttons ? g.J1.ENABLED : g.J1.DISABLED),
            void 0 !== i.fast_transitions &&
              (t.tourFastTransitionsOverride = i.fast_transitions ? g.J1.ENABLED : g.J1.DISABLED),
            void 0 !== i.pan_angle && (t.tourPanAngle = { set: i.pan_angle }),
            void 0 !== i.pan_direction && (t.tourPanDirection = { set: b[i.pan_direction] }),
            void 0 !== i.pan_speed && (t.tourPanSpeed = { set: i.pan_speed }),
            void 0 !== i.transition_speed && (t.tourTransitionSpeed = { set: i.transition_speed }),
            void 0 !== i.transition_time && (t.tourTransitionTime = { set: i.transition_time }),
            void 0 !== i.zoom_duration && (t.tourZoomDuration = { set: i.zoom_duration }),
            void 0 !== i.dollhouse_pan_speed &&
              (t.tourDollhousePanSpeed = { set: i.dollhouse_pan_speed });
          const s = {};
          void 0 !== i.presented_by &&
            (s.presentedByOverride = i.presented_by ? g.J1.ENABLED : g.J1.DISABLED),
            void 0 !== i.contact_email &&
              (s.contactEmailOverride = i.contact_email ? g.J1.ENABLED : g.J1.DISABLED),
            void 0 !== i.contact_name &&
              (s.contactNameOverride = i.contact_name ? g.J1.ENABLED : g.J1.DISABLED),
            void 0 !== i.contact_phone &&
              (s.contactPhoneOverride = i.contact_phone ? g.J1.ENABLED : g.J1.DISABLED),
            void 0 !== i.external_url &&
              (s.externalUrlOverride = i.external_url ? g.J1.ENABLED : g.J1.DISABLED),
            void 0 !== i.model_name &&
              (s.modelNameOverride = i.model_name ? g.J1.ENABLED : g.J1.DISABLED),
            void 0 !== i.model_summary &&
              (s.modelSummaryOverride = i.model_summary ? g.J1.ENABLED : g.J1.DISABLED),
            void 0 !== i.address && (s.addressOverride = i.address ? g.J1.ENABLED : g.J1.DISABLED);
          return { options: t, publication: Object.keys(s).length > 0 ? { options: s } : void 0 };
        }
      }
      var x = i(90314);
      const T = new c.Z('mds-player-options-store');
      class C extends d.u {
        constructor() {
          super(...arguments),
            (this.serializer = new S()),
            (this.deserializer = new w()),
            (this.prefetchKey = 'data.model.publication.options');
        }
        async read(e = {}) {
          const t = { modelId: this.getViewId() };
          return this.query(x.GetModelOptions, t, e).then((e) => {
            var t;
            return this.deserializer.deserialize(
              null === (t = null == e ? void 0 : e.data) || void 0 === t ? void 0 : t.model,
            );
          });
        }
        async update(e) {
          const t = this.getViewId(),
            i = this.serializer.serialize(e);
          if (0 === Object.keys(i).length) throw new Error('No data to update?');
          return this.mutate(x.PatchModel, { modelId: t, patch: i }).then((e) => {
            T.debug(e);
          });
        }
      }
      var P = i(27606),
        O = i(83069),
        k = i(35659),
        A = i(37137),
        E = i(22925);
      class F extends s.Y {
        constructor() {
          super(...arguments),
            (this.name = 'showcase-settings'),
            (this.updateTransitionType = (e, t, i) => {
              const s = e.options.fast_transitions ? l.nF.FadeToBlack : l.nF.Interpolate;
              t.hasProperty(h.gj)
                ? t.setProperty(h.gj, s)
                : i.registerSetting('player_options', h.gj, s);
            });
        }
        async init(e, t) {
          const { baseModelId: i, readonly: s, baseUrl: h } = e;
          this.engine = t;
          const l = await t.market.waitForData(E.R);
          this.store = new C({ context: l.mdsContext, readonly: s, baseUrl: h, viewId: i });
          const [d, c, u, m] = await Promise.all([
            t.getModuleBySymbol(o.Ak),
            t.market.waitForData(n.e),
            t.getModuleBySymbol(r.Lx),
            this.store.read(),
          ]);
          (this.playerOptionsData = m || new a.af()),
            t.market.register(this, a.af, this.playerOptionsData);
          for (const e in a.gx) {
            const t = a.gx[e],
              i = this.playerOptionsData.options[t];
            if (d.hasProperty(t)) {
              const e = d.getProperty(t);
              d.updateSetting(t, i && e),
                this.log.debug(`Updated player_options setting ${t} = ${i && e}`);
            } else
              d.registerSetting('player_options', t, i),
                this.log.debug(`Registered player_options setting ${t} = ${i}`);
          }
          this.updateTransitionType(this.playerOptionsData, c, d),
            this.bindings.push(
              c.onPropertyChanged(a.gx.InstantTransitions, () =>
                this.updateTransitionType(this.playerOptionsData, c, d),
              ),
            ),
            s ||
              (this.bindings.push(u.onSave(() => this.save(), { dataType: k.g.SETTINGS })),
              (this.monitor = new P.u(
                this.playerOptionsData,
                { aggregationType: O.E.NextFrame },
                this.engine,
              )),
              this.monitor.onChanged(() =>
                this.engine.commandBinder.issueCommand(new A.V({ dataTypes: [k.g.SETTINGS] })),
              ));
        }
        async save() {
          if (!this.store || !this.monitor)
            return void this.log.warn('Settings changes will NOT be saved');
          const e = this.monitor.getDiffRecord(),
            t = e.options;
          return (
            t &&
              (t &&
                void 0 === t.measurements &&
                void 0 !== t.measurements_saved &&
                (t.measurements = this.playerOptionsData.options.measurements),
              t &&
                void 0 !== t.measurements &&
                void 0 === t.measurements_saved &&
                (t.measurements_saved = this.playerOptionsData.options.measurements_saved),
              void 0 !== (null == t ? void 0 : t.floor_select) &&
                (t.floor_select = this.playerOptionsData.options.floor_select),
              void 0 !== (null == t ? void 0 : t.labels_dh) &&
                (t.labels_dh = this.playerOptionsData.options.labels_dh),
              (void 0 === t.presented_by &&
                void 0 === t.contact_email &&
                void 0 === t.contact_name &&
                void 0 === t.contact_phone &&
                void 0 === t.external_url &&
                void 0 === t.model_name &&
                void 0 === t.model_summary &&
                void 0 === t.address) ||
                ((t.presented_by = this.playerOptionsData.options.presented_by),
                (t.contact_email = this.playerOptionsData.options.contact_email),
                (t.contact_name = this.playerOptionsData.options.contact_name),
                (t.contact_phone = this.playerOptionsData.options.contact_phone),
                (t.external_url = this.playerOptionsData.options.external_url),
                (t.model_name = this.playerOptionsData.options.model_name),
                (t.model_summary = this.playerOptionsData.options.model_summary),
                (t.address = this.playerOptionsData.options.address))),
            this.monitor.clearDiffRecord(),
            this.store.update(e)
          );
        }
      }
    },
    25893: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => T });
      var s = i(81396),
        o = i(933),
        r = i(4763),
        n = i(31740),
        a = i(43017),
        h = i(8152),
        l = i(55587),
        d = i(8374),
        c = i(90288),
        u = i(84376),
        m = i(28721),
        p = i(64150),
        g = i(57682),
        y = i(32197),
        v = i(93827),
        f = i(29765),
        w = i(17545),
        M = i(2490),
        b = i(34014),
        D = i(24938),
        S = i(38247),
        x = i(9263);
      class T extends o.Y {
        constructor() {
          super(...arguments),
            (this.name = 'showcase-start'),
            (this.firstRenderPromise = new v.Q()),
            (this.flyInPromise = new v.Q()),
            (this.handleFlyIn = async (e, t, i) => {
              this.renderer.startRender(!1);
              try {
                await this.doStandardStart(e, t, i, !0);
              } catch (e) {
                this.log.error(e), this.renderer.startRender(!0);
              }
            });
        }
        async init(e, t) {
          const [i, s, o] = await Promise.all([
            t.market.waitForData(p.e),
            t.market.waitForData(d.O),
            t.market.waitForData(x.af),
          ]);
          [this.sweepData, this.sweepModule, this.cameraModule, this.renderer, this.appData] =
            await Promise.all([
              t.market.waitForData(n.Z),
              t.getModuleBySymbol(r.l),
              t.getModuleBySymbol(r.kg),
              t.getModuleBySymbol(r.Aj),
              t.market.waitForData(D.pu),
            ]);
          const a = i.tryGetProperty('quickstart', !1),
            h = this.getStartingPose(s, o);
          return (
            (a ? this.doQuickStart(h, t, c.nF.Instant) : this.doStandardStart(h, t, i, !1))
              .catch((e) => {
                this.log.error('Handling error during initial fly-in, attempting recover', {
                  startingPose: h,
                  error: e,
                }),
                  this.doQuickStart(h, t, c.nF.FadeToBlack),
                  this.renderBeforeStarting(t);
              })
              .finally(() => this.flyInPromise.resolve()),
            this.bindings.push(
              t.commandBinder.addBinding(g.b, async (e) => {
                this.handleFlyIn(e.pose || s.getStartingPose(), t, i);
              }),
              t.commandBinder.addBinding(g.Q, async (e) => {
                this.fadeToStartLocation(s, t);
              }),
              t.subscribe(b.YB, async () => {
                this.appData.application !== D.Mx.WORKSHOP &&
                  s.moveCameraOnViewChange &&
                  this.fadeToStartLocation(s, t);
              }),
            ),
            this.waitForFirstRender
          );
        }
        getStartingPose(e, t) {
          const i = e.getStartingPose(),
            s = !t.options.dollhouse,
            o = !t.options.floor_plan;
          return (s && i.mode === a.Ey.Dollhouse) || (o && i.mode === a.Ey.Floorplan)
            ? new d.B()
            : i;
        }
        fadeToStartLocation(e, t) {
          const i = e.getStartingPose();
          this.doQuickStart(i, t, c.nF.FadeToBlack);
        }
        get waitForFirstRender() {
          return this.firstRenderPromise.nativePromise();
        }
        get waitForFlyin() {
          return this.flyInPromise.nativePromise();
        }
        async doQuickStart(e, t, i) {
          const s = this.sweepData.getStartSweep(e),
            o = s && s.id,
            n = await t.getModuleBySymbol(r.XT);
          return (
            await n.switchToMode(e.mode, i, {
              sweepID: o,
              position: e.camera.position || (s && s.position),
              rotation: e.camera.rotation,
              zoom: -1 !== e.camera.zoom ? e.camera.zoom : void 0,
            }),
            t.broadcast(new w.bN(!1)),
            (e.mode !== a.Ey.Dollhouse && e.mode !== a.Ey.Floorplan) ||
              (e.floorVisibility &&
                (await t.commandBinder.issueCommandWhenBound(
                  new f.h9(e.floorVisibility.lastIndexOf(1), !0, 0),
                ))),
            this.renderBeforeStarting(t)
          );
        }
        async doStandardStart(e, t, i, o) {
          var n;
          const [d] = await Promise.all([t.getModuleBySymbol(r.XT)]);
          await t.getModuleBySymbol(S.My);
          const u = !i.tryGetProperty(l.wY, !1),
            p = !i.tryGetProperty(l.dF, !1);
          e &&
            ((e.mode === a.Ey.Dollhouse && u) ||
              (e.mode === a.Ey.Floorplan && p) ||
              (e.mode === a.Ey.Panorama && !e.pano)) &&
            (e = null);
          const g = !e || (e && (e.mode === a.Ey.Dollhouse || e.mode === a.Ey.Floorplan)),
            v = !e || (e && !this.is360Pano(e) && (0, a.Bw)(e.mode) && !u),
            b = e ? e.mode : a.Ey.Panorama,
            D = this.sweepData.getStartSweep(e),
            x = D && D.id,
            T = this.sweepData.getFirstSweep();
          let C = T && T.rotation;
          if (
            ((null === (n = null == e ? void 0 : e.camera) || void 0 === n ? void 0 : n.rotation) &&
              !(0, M.mB)(e.camera.rotation) &&
              (C = e.camera.rotation),
            C && b !== a.Ey.Floorplan && (C = (0, y.Z)(C)),
            v)
          ) {
            await (
              await t.getModuleBySymbol(r.Ve)
            ).firstMeshLoadPromise;
            const i = d.getFlyinEndPose({
                sweepID: x,
                position: e ? e.camera.position : void 0,
                rotation: C,
              }),
              n = d.getFlyinStartPose(i, o ? new s.Vector3(0, 0, 0) : void 0);
            t.broadcast(new w.bN(!0));
            const l = x ? this.sweepModule.activateSweepUnsafe({ sweepId: x }) : Promise.resolve();
            await d.switchToMode(a.Ey.Dollhouse, c.nF.Instant, n),
              await this.renderBeforeStarting(t),
              await (0, m.gw)(750),
              await this.cameraModule
                .moveTo({ transitionType: c.nF.Interpolate, pose: i })
                .nativePromise(),
              await l,
              t.broadcast(new w.bN(!1)),
              await d.switchToMode(
                b,
                c.nF.Interpolate,
                { sweepID: x, rotation: C },
                h.DEFAULT_TRANSITION_TIME,
              );
          } else
            await d.switchToMode(b, c.nF.Instant, {
              sweepID: x,
              position: e ? e.camera.position : void 0,
              rotation: C,
              zoom: e && -1 !== e.camera.zoom ? e.camera.zoom : void 0,
            }),
              g &&
                e &&
                (e.floorVisibility
                  ? await t.commandBinder.issueCommandWhenBound(
                      new f.h9(e.floorVisibility.lastIndexOf(1), !0, 0),
                    )
                  : await t.commandBinder.issueCommandWhenBound(new f.Vw(null))),
              await this.renderBeforeStarting(t);
        }
        is360Pano(e) {
          if (e.pano.uuid) {
            const t = this.sweepData.getSweep(e.pano.uuid);
            if (t) return t.alignmentType !== u.z9.ALIGNED;
          } else {
            const e = this.sweepData.getFirstSweep();
            if (void 0 !== e) return e.alignmentType !== u.z9.ALIGNED;
          }
          return !1;
        }
        async renderBeforeStarting(e) {
          await this.renderer.renderOnce(),
            await e.getModuleBySymbol(S.$1),
            this.renderer.startRender(!0),
            this.firstRenderPromise.resolve();
        }
      }
    },
    3433: (e, t, i) => {
      'use strict';
      i.d(t, { Z: () => o });
      var s = i(933);
      class o extends s.Y {
        constructor() {
          super(...arguments), (this.name = 'base-controls'), (this.inputBindings = []);
        }
        registerActiveStateChangeBinding() {
          this.bindings.push(this.controls.onActiveStateChanged(() => this.onActiveStateChanged()));
        }
        updateInputBindings() {
          this.controls.isActive
            ? this.inputBindings.forEach((e) => e.renew())
            : this.inputBindings.forEach((e) => e.cancel());
        }
        onActiveStateChanged() {
          this.controls.stop(), this.updateInputBindings();
        }
        dispose(e) {
          super.dispose(e);
          for (const e of this.inputBindings) e.cancel();
          this.inputBindings = [];
        }
      }
    },
    68467: (e, t, i) => {
      'use strict';
      i.d(t, { Z: () => o });
      var s = i(85726);
      class o {
        constructor() {
          this.poseControllerObservable = (0, s.Y)(null);
        }
        get poseController() {
          return this.poseControllerObservable.value;
        }
        setController(e) {
          return (this.poseControllerObservable.value = e), this;
        }
        get isActive() {
          return null != this.poseController;
        }
        onActiveStateChanged(e) {
          return this.poseControllerObservable.onChanged(e);
        }
      }
    },
    71281: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => n });
      var s = i(933),
        o = i(90512),
        r = i(4763);
      class n extends s.Y {
        constructor() {
          super(...arguments),
            (this.name = 'common-controls'),
            (this.modeControls = new Map()),
            (this.poseController = null);
        }
        async init(e, t) {
          (this.modeControls = new Map()),
            t.market.waitForData(o.O).then((e) => {
              (this.viewmodeData = e),
                this.bindings.push(
                  this.viewmodeData.onChanged(() => this.setControllerForCurrViewmode()),
                ),
                this.setControllerForCurrViewmode();
            }),
            (this.cameraPoseProxy = (await t.getModuleBySymbol(r.kg)).cameraPoseProxy),
            this.cameraPoseProxy.newSession(this);
        }
        onAccessGranted(e) {
          (this.poseController = e),
            this.setControllerForCurrViewmode(),
            this.bindings.forEach((e) => e.renew());
        }
        onAccessRevoked(e) {
          this.stop(), this.bindings.forEach((e) => e.cancel()), (this.poseController = null);
          for (const e of this.modeControls.values()) e.controls.setController(null);
        }
        startRotateTransition(e, t, i = !0) {
          return this.checkControlsForAction((s) => s.startRotateTransition(e, t, i));
        }
        startZoomTransition(e, t, i = !0) {
          return this.checkControlsForAction((s) => s.startZoomTransition(e, t, i));
        }
        startTranslateTransition(e, t, i = !0) {
          return this.checkControlsForAction((s) => s.startTranslateTransition(e, t, i));
        }
        stop() {
          return this.checkControlsForAction((e) => (e.stop(), Promise.resolve()));
        }
        setControllerForCurrViewmode() {
          var e;
          if (this.viewmodeData && this.viewmodeData.currentMode) {
            const t =
              null === (e = this.modeControls.get(this.viewmodeData.currentMode)) || void 0 === e
                ? void 0
                : e.controls;
            if (t) {
              t.setController(this.poseController);
              for (const e of this.modeControls.values()) {
                const i = e.controls;
                i !== t && i.setController(null);
              }
            }
          }
        }
        checkControlsForAction(e) {
          if (this.viewmodeData && null !== this.viewmodeData.currentMode) {
            const t = this.modeControls.get(this.viewmodeData.currentMode);
            if (t) {
              return e(t.controls);
            }
          }
          return Promise.reject('checkControlsForAction() -> Current view mode is null');
        }
        addControls(e, t, i) {
          (this.modeControls.get(e) && !i) ||
            (this.modeControls.set(e, { mode: e, controls: t }),
            this.setControllerForCurrViewmode());
        }
      }
    },
    91180: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => q });
      var s,
        o = i(4763),
        r = i(3835),
        n = i(68720),
        a = i(95840),
        h = i(31971),
        l = i(20360),
        d = i(69947),
        c = i(43017),
        u = i(43627),
        m = i(81396),
        p = i(92015),
        g = i(40333),
        y = i(2897),
        v = i(68467),
        f = i(96783),
        w = i(93827),
        M = i(90288),
        b = i(84906),
        D = i(21170),
        S = i(11250);
      !(function (e) {
        (e[(e.NONE = 0)] = 'NONE'),
          (e[(e.ROTATE = 1)] = 'ROTATE'),
          (e[(e.PAN = 2)] = 'PAN'),
          (e[(e.ZOOM = 3)] = 'ZOOM');
      })(s || (s = {}));
      const x = {
          [g.r.NONE]: s.NONE,
          [g.r.PRIMARY]: s.ROTATE,
          [g.r.SECONDARY]: s.PAN,
          [g.r.MIDDLE]: s.ZOOM,
          [g.r.BACK]: s.NONE,
          [g.r.FORWARD]: s.NONE,
          [g.r.ALL]: s.NONE,
        },
        T = {
          [g.r.NONE]: s.NONE,
          [g.r.PRIMARY]: s.PAN,
          [g.r.SECONDARY]: s.ROTATE,
          [g.r.MIDDLE]: s.ZOOM,
          [g.r.BACK]: s.NONE,
          [g.r.FORWARD]: s.NONE,
          [g.r.ALL]: s.NONE,
        };
      var C;
      !(function (e) {
        (e[(e.NONE = 0)] = 'NONE'),
          (e[(e.MOUSE = 1)] = 'MOUSE'),
          (e[(e.KEYBOARD = 2)] = 'KEYBOARD'),
          (e[(e.TOUCH = 3)] = 'TOUCH');
      })(C || (C = {}));
      class P {
        constructor(e, t, i, s, o, n) {
          (this.poseProxy = e),
            (this.poseConstrainer = t),
            (this.getRayPoint = i),
            (this.getFocusPoint = s),
            (this.invalidateParentOrbitCache = o),
            (this.movingCamera = !1),
            (this.smoothedTouch0 = new m.Vector2()),
            (this.smoothedTouch1 = new m.Vector2()),
            (this.origTouchAxis = new m.Vector2()),
            (this.origCenterPt = new m.Vector2()),
            (this.plane = new m.Plane(r.fU.UP.clone(), 0)),
            (this.focusPlane = new m.Plane(r.fU.UP.clone(), 0)),
            (this.maxScale = 1),
            (this.minScale = 1),
            (this.originalPinchLength = 0),
            (this.pointersMoved = (() => {
              const e = new m.Vector2(),
                t = new m.Vector3(),
                i = new m.Vector3(),
                s = new m.Vector2(),
                o = new D.B(1),
                n = new m.Ray(),
                a = new m.Vector3();
              return (h) => {
                if (!this.poseController || !this.movingCamera) return;
                o.copy(this.poseProxy.pose);
                this.smoothedTouch0.lerp(h[0].position, 0.2),
                  this.smoothedTouch1.lerp(h[1].position, 0.2),
                  s.copy(this.smoothedTouch1).sub(this.smoothedTouch0).normalize();
                const l = this.origTouchAxis.angle() - s.angle();
                t.copy(this.initialPose.fovCorrectedPosition());
                const d = new m.Vector3(-this.intersectionPt.x, 0, -this.intersectionPt.z);
                t.add(d), t.applyAxisAngle(r.fU.UP, l), d.negate(), t.add(d);
                const c = new m.Quaternion().copy(this.initialPose.rotation),
                  u = new m.Quaternion().setFromAxisAngle(r.fU.UP, l);
                c.premultiply(u);
                const p = this.smoothedTouch0.clone().lerp(this.smoothedTouch1, 0.5),
                  g = new m.Vector3();
                if (
                  (i.copy(r.fU.FORWARD).applyQuaternion(c), this.castFrom(p.x, p.y, g), isNaN(g.x))
                )
                  return void (this.movingCamera = !1);
                g.sub(this.intersectionPt), g.negate(), g.applyAxisAngle(r.fU.UP, l);
                const y =
                    e.subVectors(this.smoothedTouch0, this.smoothedTouch1).length() /
                    this.originalPinchLength,
                  v = 1 - 1 / (0, f.uZ)(y, this.minScale, this.maxScale),
                  w = t.add(g).lerp(this.intersectionPt, v).clone();
                if ((n.set(w, i), n.intersectPlane(this.focusPlane, a))) {
                  const e = a.distanceTo(w);
                  o.position.copy(w),
                    o.rotation.copy(c),
                    (o.focalDistance = e),
                    o.resetProjMatrix(),
                    o.applyPhiBasedFovSquish(),
                    this.poseConstrainer.constrain(o),
                    this.poseController.updateCameraPose(o),
                    this.invalidateParentOrbitCache();
                }
              };
            })()),
            (this.initMove = (() => {
              const e = new m.Vector2(),
                t = new m.Ray();
              return (i) => {
                const s = i[0].position,
                  o = i[1].position;
                this.smoothedTouch0.copy(s),
                  this.smoothedTouch1.copy(o),
                  (this.originalPinchLength = e.subVectors(s, o).length()),
                  this.origTouchAxis.copy(o).sub(s).normalize(),
                  this.origCenterPt.copy(s).lerp(o, 0.5);
                const { pose: n } = this.poseProxy;
                this.initialPose = n.clone();
                const a = new m.Vector3(),
                  h = new m.Vector3();
                (0, S.Kh)(this.initialPose, a.set(this.origCenterPt.x, this.origCenterPt.y, -1), a),
                  (0, S.Kh)(
                    this.initialPose,
                    h.set(this.origCenterPt.x, this.origCenterPt.y, 1),
                    h,
                  ),
                  h.sub(a).normalize(),
                  t.set(a, h),
                  (this.intersectionPt = this.getRayPoint(t));
                const l = this.getFocusPoint();
                (n.focalDistance = n.position.distanceTo(l)),
                  (this.initialPose.focalDistance = n.position.distanceTo(l)),
                  (this.maxScale =
                    this.initialPose.fovCorrectedFocalDistance() /
                    this.poseConstrainer.minZoomDistance),
                  (this.minScale =
                    this.initialPose.fovCorrectedFocalDistance() /
                    this.poseConstrainer.maxZoomDistance),
                  this.poseConstrainer.setStartPose(this.initialPose);
                const d = n.phi() < b.N2 ? n.forward().clone().multiplyScalar(-1) : r.fU.UP;
                this.plane.setFromNormalAndCoplanarPoint(d, this.intersectionPt),
                  this.focusPlane.setFromNormalAndCoplanarPoint(d, l);
              };
            })()),
            (this.castFrom = (() => {
              const e = new m.Ray(),
                t = new m.Vector3(),
                i = new m.Vector3();
              return (s, o, r) => {
                (0, S.Kh)(this.initialPose, t.set(s, o, -1), t),
                  (0, S.Kh)(this.initialPose, i.set(s, o, 1), i),
                  i.sub(t).normalize(),
                  e.set(t, i),
                  (e.intersectPlane(this.plane, r) && !r.equals(t)) || (r.x = NaN);
              };
            })()),
            n.onGrabStart((e) => {
              (this.movingCamera = !0), this.initMove(e.pointers);
            }),
            n.onGrabEnd(() => {
              this.movingCamera = !1;
            });
        }
        isMovingCamera() {
          return this.movingCamera;
        }
        rawPointerUpdate(e) {
          this.pointersMoved(e.pointers);
        }
        setController(e) {
          e
            ? (this.poseController = e)
            : ((this.poseController = void 0), (this.movingCamera = !1));
        }
      }
      var O = i(5829),
        k = i(59491);
      var A;
      !(function (e) {
        (e.NONE = 'none'), (e.GRAB = 'grab'), (e.SPIN = 'spin');
      })(A || (A = {}));
      class E {
        constructor() {
          (this.t1 = new m.Vector2()),
            (this.t2 = new m.Vector2()),
            (this.initT1 = new m.Vector2()),
            (this.initT2 = new m.Vector2()),
            (this.deltaT1 = new m.Vector2()),
            (this.deltaT2 = new m.Vector2()),
            (this.twoFingerEventCt = 0),
            (this.currGesture = A.NONE),
            (this.contiguousGrabEventCt = 0),
            (this.grabStartObservers = new Set()),
            (this.grabEndObservers = new Set()),
            (this.spinStartObservers = new Set()),
            (this.spinEndObservers = new Set()),
            (this.gesturePointerIds = [null, null]),
            (this.currPos = new m.Vector2());
        }
        rawPointerUpdate(e) {
          if (e.pointers.length >= 2) {
            0 === this.twoFingerEventCt
              ? (this.t1.copy(e.pointers[0].clientPosition),
                this.t2.copy(e.pointers[1].clientPosition),
                this.initT1.copy(e.pointers[0].clientPosition),
                this.initT2.copy(e.pointers[1].clientPosition),
                (this.gestureStartPointers = e),
                (this.gesturePointerIds[0] = e.pointers[0].id),
                (this.gesturePointerIds[1] = e.pointers[1].id),
                this.setCurrGesureAndNotifyObservers(A.NONE))
              : (this.t1.lerp(e.pointers[0].clientPosition, 0.2),
                this.t2.lerp(e.pointers[1].clientPosition, 0.2),
                (this.currGesture === A.NONE ||
                  (this.currGesture === A.GRAB && this.contiguousGrabEventCt < 30)) &&
                  this.setCurrGesureAndNotifyObservers(this.nextGesture()));
            const t = (e.pointers[0].position.x + e.pointers[1].position.x) / 2,
              i = (e.pointers[0].position.y + e.pointers[1].position.y) / 2;
            this.currPos.set(t, i), this.twoFingerEventCt++;
          } else (this.twoFingerEventCt = 0), this.setCurrGesureAndNotifyObservers(A.NONE);
          this.currGesture === A.GRAB && this.contiguousGrabEventCt++;
        }
        onGrabStart(e) {
          return (0, k.k1)(
            () => this.grabStartObservers.add(e),
            () => this.grabStartObservers.delete(e),
            !0,
          );
        }
        onGrabEnd(e) {
          return (0, k.k1)(
            () => this.grabEndObservers.add(e),
            () => this.grabEndObservers.delete(e),
            !0,
          );
        }
        onSpinStart(e) {
          return (0, k.k1)(
            () => this.spinStartObservers.add(e),
            () => this.spinStartObservers.delete(e),
            !0,
          );
        }
        onSpinEnd(e) {
          return (0, k.k1)(
            () => this.spinEndObservers.add(e),
            () => this.spinEndObservers.delete(e),
            !0,
          );
        }
        setCurrGesureAndNotifyObservers(e) {
          const t = this.currGesture;
          if (((this.currGesture = e), t === A.NONE))
            e === A.GRAB
              ? this.notifyGrabStartObservers()
              : e === A.SPIN && this.notifySpinStartObservers();
          else if (t === A.GRAB)
            e === A.SPIN
              ? (this.notifyGrabEndObservers(), this.notifySpinStartObservers())
              : e === A.NONE && this.notifyGrabEndObservers();
          else if (t === A.SPIN)
            if (e === A.NONE) this.notifySpinEndObservers();
            else if (e === A.GRAB)
              throw new Error('Gesture recognizer should never switch from SPIN -> GRAB');
        }
        notifyGrabStartObservers() {
          for (const e of this.grabStartObservers) e(this.gestureStartPointers);
        }
        notifySpinStartObservers() {
          for (const e of this.spinStartObservers) e(this.gestureStartPointers);
        }
        notifyGrabEndObservers() {
          this.contiguousGrabEventCt = 0;
          for (const e of this.grabEndObservers) e();
        }
        notifySpinEndObservers() {
          for (const e of this.spinEndObservers) e();
        }
        nextGesture() {
          if (this.twoFingerEventCt > 5) {
            const e = this.t1.y - this.initT1.y,
              t = this.t2.y - this.initT2.y,
              i = this.t1.x - this.initT1.x,
              s = this.t2.x - this.initT2.x;
            this.deltaT1.set(i, e), this.deltaT2.set(s, t);
            const o = this.deltaT1.length(),
              r = this.deltaT2.length(),
              n = Math.min(o, r) / Math.max(o, r) > 0.7,
              a = this.deltaT1.normalize().dot(this.deltaT2.normalize()) > 0.7;
            return n && a && o > 2 && r > 2 ? A.SPIN : A.GRAB;
          }
          return A.NONE;
        }
      }
      var F = i(61173),
        B = i(55981);
      const I = y.Z.epsilon,
        R = b.pj,
        V = 0.15 * Math.PI;
      class _ extends v.Z {
        constructor(e, t, i, o, n, a, h) {
          super(),
            (this.cameraPoseProxy = e),
            (this.poseConstrainer = t),
            (this.getOrbitPoint = i),
            (this.getGrabPoint = o),
            (this.constrolsData = a),
            (this.messageBus = h),
            (this.tempOrientation = new m.Quaternion()),
            (this.tempAxis = new m.Vector3()),
            (this.nextPosition = new m.Vector3()),
            (this.nextOrientation = new m.Quaternion()),
            (this.currentPose = new D.B(1)),
            (this.positionDelta = new m.Vector3()),
            (this.angularAccel = new m.Vector2()),
            (this.angularVelocity = new m.Vector2()),
            (this.linearAccel = new m.Vector2()),
            (this.linearVelocity = new m.Vector2()),
            (this.grabPlane = new m.Plane().setFromNormalAndCoplanarPoint(r.fU.UP, r.fU.ZERO)),
            (this.grabPt = new m.Vector3()),
            (this.ndcPos = new m.Vector2()),
            (this.zoomAccel = 0),
            (this.zoomVelocity = 0),
            (this.orbitPoint = new m.Vector3()),
            (this.orbitDistance = 0),
            (this.orbitPlane = new m.Plane()),
            (this.needsOrbitDataInit = !0),
            (this.autoOrbitStartPhi = 0),
            (this.aimTarget = new m.Vector3()),
            (this.currentPhiLowerLimit = b.zf),
            (this.currentPhiUpperLimit = b.uQ),
            (this.activeAction = s.NONE),
            (this.activeDevice = C.NONE),
            (this.touchGestureRecognizer = new E()),
            (this.isTouchSpinning = !1),
            (this.prevTouchY = 0),
            (this.prevTouchX = 0),
            (this.zoomDirection = new m.Vector3()),
            (this.castFromNdc = (() => {
              const e = new m.Vector3(),
                t = new m.Vector3(0, 0, -1),
                i = new m.Ray(e, t),
                s = new m.Vector3();
              return () => {
                (0, S.Kh)(this.grabCameraPose, e.set(this.ndcPos.x, this.ndcPos.y, -1), e),
                  (0, S.Kh)(this.grabCameraPose, t.set(this.ndcPos.x, this.ndcPos.y, 1), t),
                  t.sub(e).normalize(),
                  i.set(e, t);
                return i.intersectPlane(this.grabPlane, s);
              };
            })()),
            (this.dampedZoomDir = (() => {
              const e = new m.Vector3(),
                t = new m.Quaternion(),
                i = new m.Vector3(),
                s = new m.Vector3(),
                o = new m.Quaternion();
              return (r = b.SI) => {
                const n = this.cameraPoseProxy.pose,
                  a = n.forward().clone(),
                  h = this.getGrabPoint(),
                  l = h.clone().sub(this.cameraPoseProxy.pose.fovCorrectedPosition()).normalize(),
                  d =
                    this.poseConstrainer.modelBoundingBox.containsPoint(h) && n.phi() > b.bp
                      ? l
                      : a,
                  c = o.angleTo(n.rotation) > 1e-8;
                if ((o.copy(n.rotation), e.length() < 0.1 || c))
                  e.copy(d), this.zoomDirection.copy(d);
                else {
                  const o = e.angleTo(d);
                  s.crossVectors(e, d);
                  const n = (0, u.Id)(1 * r),
                    a = Math.min(o, n);
                  t.setFromAxisAngle(s, a);
                  const h = i.copy(e).applyQuaternion(t);
                  e.copy(h), this.zoomDirection.copy(h);
                }
              };
            })()),
            (this.touchControls = new P(
              e,
              t,
              n,
              i,
              () => this.invalidateOrbitMetadata(),
              this.touchGestureRecognizer,
            )),
            e.pose.autoOrtho && (this.currentPhiUpperLimit = b.pj),
            (this.transition = {
              active: !1,
              startTime: 0,
              elapsed: 0,
              duration: 0,
              angularVelocity: new m.Vector2(),
              linearVelocity: new m.Vector2(),
              zoomVelocity: 0,
              easeOut: !1,
            }),
            this.touchGestureRecognizer.onGrabStart(() => {
              this.messageBus.broadcast(new B.O()), this.stopAndClearState();
            }),
            this.touchGestureRecognizer.onGrabEnd(() => this.stopAndClearState()),
            this.touchGestureRecognizer.onSpinStart((e) => {
              (this.isTouchSpinning = !0),
                (this.prevTouchX = (e.pointers[0].position.x + e.pointers[1].position.x) / 2),
                (this.prevTouchY = (e.pointers[0].position.y + e.pointers[1].position.y) / 2),
                this.initMove(s.ROTATE, C.MOUSE);
            }),
            this.touchGestureRecognizer.onSpinEnd(() => {
              this.endMove(), (this.isTouchSpinning = !1);
            });
        }
        touchGestureIds() {
          return this.touchGestureRecognizer.gesturePointerIds;
        }
        rawPointerUpdate(e) {
          this.touchGestureRecognizer.rawPointerUpdate(e), this.touchControls.rawPointerUpdate(e);
        }
        setController(e) {
          return (
            super.setController(e),
            this.touchControls.setController(e),
            null === e && this.activeAction !== s.NONE && this.endMove(),
            this
          );
        }
        setOrbitalAcceleration(e, t = !1) {
          this.transition.active ||
            (t && this.haltVelocity(e, this.angularVelocity),
            (this.angularAccel.x = void 0 !== e.x ? e.x : this.angularAccel.x),
            (this.angularAccel.y = void 0 !== e.y ? e.y : this.angularAccel.y));
        }
        setPanAcceleration(e, t = !1) {
          this.transition.active ||
            (t && this.haltVelocity(e, this.linearVelocity),
            (this.linearAccel.x = void 0 !== e.x ? e.x : this.linearAccel.x),
            (this.linearAccel.y = void 0 !== e.y ? e.y : this.linearAccel.y));
        }
        setNdcPos(e) {
          this.ndcPos.copy(e);
        }
        initMove(e, t, i) {
          if (
            (t !== C.KEYBOARD && (this.setPanAcceleration({ x: 0, y: 0 }), this.stop()),
            i && this.setNdcPos(i),
            e !== this.activeAction || t !== this.activeDevice)
          ) {
            this.updateOrbitState(), (this.activeDevice = t), (this.activeAction = e);
            const i = this.cameraPoseProxy.pose;
            this.poseConstrainer.setStartPose(i);
            const o = this.getGrabPoint(),
              n = i.phi() < b.N2 ? i.forward().clone().multiplyScalar(-1) : r.fU.UP;
            this.grabPlane.setFromNormalAndCoplanarPoint(n, o),
              (this.grabCameraPose = this.cameraPoseProxy.pose.clone()),
              this.grabPt.copy(o),
              e === s.ROTATE && this.messageBus.broadcast(new B.O());
          }
        }
        stopAndClearState(e = !1) {
          ((0, F.tq)() || e) && this.stop(),
            this.updateOrbitState(),
            (this.activeDevice = C.NONE),
            (this.activeAction = s.NONE);
        }
        softStopAndClearState() {
          this.stopAcceleration(),
            this.updateOrbitState(),
            (this.activeDevice = C.NONE),
            (this.activeAction = s.NONE);
        }
        endMove(e) {
          e && this.setNdcPos(e),
            this.isTouchSpinning ? this.softStopAndClearState() : this.stopAndClearState();
          const t = this.cameraPoseProxy.pose.pitchFactor();
          !this.isAutoOrbitting &&
            t < 1 &&
            t > 1e-10 &&
            this.cameraPoseProxy.pose.autoOrtho &&
            this.startAutoOrbitTo();
        }
        startAutoOrbitTo(e = 'top') {
          const t = 'top' === e ? R : b.dG;
          if (Math.abs(this.cameraPoseProxy.pose.phi() - t) < 1e-10) return Promise.resolve();
          const i = this.constrolsData.startAutoOrbit(e);
          return (this.autoOrbitStartPhi = this.cameraPoseProxy.pose.phi()), i;
        }
        stopAutoOrbit() {
          this.stopAndClearState(!0),
            this.constrolsData.stopAutoOrbit(),
            this.invalidateOrbitMetadata();
        }
        invalidateOrbitMetadata() {
          this.needsOrbitDataInit = !0;
        }
        get isAutoOrbitting() {
          return this.constrolsData.isAutoOrbitting;
        }
        get mouseDown() {
          return this.activeDevice === C.MOUSE || this.activeDevice === C.TOUCH;
        }
        updateOrbitState() {
          if (this.activeAction !== s.ROTATE || this.needsOrbitDataInit) {
            const e = this.cameraPoseProxy.pose,
              t = this.getOrbitPoint();
            this.orbitPoint.copy(t);
            const i = e.position.distanceTo(this.orbitPoint);
            (this.orbitDistance = i / e.fovDistanceScale()),
              this.orbitPlane.setFromNormalAndCoplanarPoint(r.fU.UP, this.orbitPoint),
              (this.cameraPoseProxy.pose.focalDistance = i),
              (this.needsOrbitDataInit = !1);
          }
        }
        setZoomAcceleration(e) {
          this.transition.active || (this.zoomAccel = e);
        }
        async setPhiLimits(e, t, i) {
          (this.currentPhiLowerLimit = e), (this.currentPhiUpperLimit = t);
          const s = this.cameraPoseProxy.pose.phi(),
            o = (0, f.uZ)(0, this.currentPhiLowerLimit - s, this.currentPhiUpperLimit - s);
          Math.abs(o) > I && i && (await this.orbit(new m.Vector2(), !0));
        }
        haltVelocity(e, t) {
          e.x && t.x && Math.sign(e.x) !== Math.sign(t.x) && (t.x = 0),
            e.y && t.y && Math.sign(e.y) !== Math.sign(t.y) && (t.y = 0);
        }
        startTransition(e, t, i, s, o) {
          if (null === this.poseController)
            return w.Q.reject('Unable to start transition, since controller is unavailable.');
          const r = new w.Q();
          return (
            (this.transition.active = !0),
            (this.transition.duration = e),
            (this.transition.elapsed = 0),
            (this.transition.startTime = Date.now()),
            (this.transition.deferred = r),
            this.transition.angularVelocity.copy(t),
            this.transition.linearVelocity.copy(i),
            (this.transition.zoomVelocity = s),
            (this.transition.easeOut = o),
            this.angularAccel.set(0, 0),
            this.linearAccel.set(0, 0),
            (this.zoomAccel = 0),
            this.angularVelocity.copy(t),
            this.linearVelocity.copy(i),
            (this.zoomVelocity = s),
            this.poseController.beginExternalTransition(),
            r.promise()
          );
        }
        stopTransition() {
          this.transition.active &&
            (this.poseController && this.poseController.endExternalTransition(),
            (this.transition.active = !1),
            this.endMove()),
            this.transition.deferred &&
              (this.transition.deferred.resolve(), (this.transition.deferred = void 0));
        }
        updateTransition(e, t, i, s) {
          let o = 1,
            r = e / b.SI;
          if (
            ((this.transition.elapsed += e), this.transition.elapsed >= this.transition.duration)
          ) {
            (o = (this.transition.duration - (this.transition.elapsed - e)) / e), (r = 1);
          }
          t &&
            (this.angularVelocity.copy(this.transition.angularVelocity).multiplyScalar(o * r),
            this.orbit(this.angularVelocity)),
            i &&
              (this.linearVelocity.copy(this.transition.linearVelocity).multiplyScalar(o * r),
              this.pan(this.linearVelocity)),
            s &&
              ((this.zoomVelocity = this.transition.zoomVelocity * o * r),
              this.zoom(this.zoomVelocity)),
            this.transition.elapsed >= this.transition.duration &&
              (this.stop(this.transition.easeOut), (this.transition.active = !1));
        }
        updateDefault(e, t, i, s) {
          if (this.touchControls.isMovingCamera()) return;
          const o = e / b.SI;
          if (t && !s) {
            this.angularVelocity.addScaledVector(this.angularAccel, o);
            const e = this.isTouchSpinning ? 1.1 : 1;
            this.orbit(this.angularVelocity.clone().multiplyScalar(o / e)),
              this.angularVelocity.multiplyScalar(Math.pow(1 - b.O8, o) / e);
          }
          i &&
            (this.linearVelocity.addScaledVector(this.linearAccel, o),
            this.pan(this.linearVelocity),
            this.linearVelocity.multiplyScalar(Math.pow(1 - b.O8, o))),
            s &&
              ((this.zoomVelocity += this.zoomAccel * o),
              this.zoom(this.zoomVelocity),
              (this.zoomVelocity *= Math.pow(1 - b.TD, o)),
              this.angularVelocity.set(0, 0),
              this.angularAccel.set(0, 0));
        }
        startRotateTransition(e, t, i) {
          return (
            (t.x *= -1),
            (this.orbitDistance = this.cameraPoseProxy.pose.focalDistance),
            this.initMove(s.ROTATE, C.KEYBOARD),
            this.startTransition(
              e,
              t.clone().multiplyScalar(b.SI),
              new m.Vector2(),
              0,
              i,
            ).nativePromise()
          );
        }
        startTranslateTransition(e, t, i = !0) {
          return (
            this.initMove(s.PAN, C.KEYBOARD),
            this.startTransition(
              e,
              new m.Vector2(),
              t.clone().multiplyScalar(b.SI),
              0,
              i,
            ).nativePromise()
          );
        }
        startZoomTransition(e, t, i) {
          return this.startTransition(
            e,
            new m.Vector2(0, 0),
            new m.Vector2(0, 0),
            t,
            i,
          ).nativePromise();
        }
        update(e) {
          const t = this.linearAccel.length() > I || this.linearVelocity.length() > I,
            i = this.angularAccel.length() > I || this.angularVelocity.length() > I,
            o = Math.abs(this.zoomAccel) > I || Math.abs(this.zoomVelocity) > I,
            r = i || this.isAutoOrbitting,
            n = t || (this.mouseDown && this.activeAction === s.PAN),
            a = o;
          this.dampedZoomDir(e),
            this.updateMultiTouchGesture(e),
            this.activeDevice !== C.KEYBOARD || t || i || o
              ? this.transition.active
                ? this.updateTransition(e, r, n, a)
                : this.updateDefault(e, r, n, a)
              : this.endMove();
        }
        stopMomentum() {
          this.transition.active ||
            (this.angularVelocity.set(0, 0),
            this.linearVelocity.set(0, 0),
            (this.zoomVelocity = 0));
        }
        stopAcceleration() {
          this.transition.active ||
            (this.setOrbitalAcceleration({ x: 0, y: 0 }),
            this.setPanAcceleration({ x: 0, y: 0 }),
            this.setZoomAcceleration(0));
        }
        stop(e = !1) {
          this.stopTransition(), this.stopAcceleration(), e || this.stopMomentum();
        }
        pan(e) {
          if (!this.poseController) return;
          this.setupCurrentPose();
          const t = this.cameraPoseProxy.pose;
          if (this.mouseDown) {
            const e = this.castFromNdc();
            if (e) {
              const t = e.sub(this.grabPt);
              t.lengthSq() > 0 &&
                (this.nextPosition
                  .copy(this.grabCameraPose.fovCorrectedPosition())
                  .addScaledVector(t, -1),
                this.currentPose.position.copy(this.nextPosition),
                this.currentPose.applyPhiBasedFovSquish(),
                this.poseConstrainer.constrain(this.currentPose),
                this.poseController.updateCameraPose(this.currentPose));
            }
          } else
            (this.positionDelta.x = e.x),
              (this.positionDelta.z = e.y),
              (this.positionDelta.y = 0),
              this.nextPosition.copy(t.fovCorrectedPosition()).add(this.positionDelta),
              this.currentPose.position.copy(this.nextPosition),
              this.currentPose.applyPhiBasedFovSquish(),
              this.poseConstrainer.constrain(this.currentPose),
              this.poseController.updateCameraPose(this.currentPose);
        }
        orbit(e, t = !1) {
          if (!this.poseController) return;
          this.setupCurrentPose();
          const i = this.cameraPoseProxy.pose,
            s = i.phi(),
            o = this.isAutoOrbitting ? this.calcAutoOrbitVelocity(s) : e,
            n = this.isAutoOrbitting ? R : this.currentPhiUpperLimit,
            a = this.isAutoOrbitting ? b.dG : this.currentPhiLowerLimit,
            h = (0, f.uZ)(o.y, a - s, n - s),
            l = n - s < 1e-10,
            d = s - a < 1e-10,
            c = 'top' === this.constrolsData.autoOrbitTarget ? l : d;
          if (this.isAutoOrbitting && c) return void this.stopAutoOrbit();
          if (l && h > 0 && !(Math.abs(e.x) > 0))
            return (this.angularVelocity.y = 0), void (this.angularAccel.y = 0);
          const u = this.orbitDistance;
          if (
            (this.aimTarget.copy(r.fU.FORWARD).applyQuaternion(i.rotation),
            this.aimTarget.setLength(u),
            this.aimTarget.addVectors(i.fovCorrectedPosition(), this.aimTarget),
            this.tempAxis.copy(r.fU.RIGHT),
            this.tempOrientation.setFromAxisAngle(this.tempAxis.applyQuaternion(i.rotation), -h),
            this.nextPosition
              .copy(i.fovCorrectedPosition())
              .sub(this.aimTarget)
              .applyQuaternion(this.tempOrientation),
            this.nextOrientation.copy(i.rotation).premultiply(this.tempOrientation),
            this.tempOrientation.setFromAxisAngle(r.fU.UP, o.x),
            this.nextPosition.applyQuaternion(this.tempOrientation),
            this.nextOrientation.premultiply(this.tempOrientation),
            (this.nextPosition = this.nextPosition.add(this.aimTarget)),
            this.nextOrientation.normalize(),
            this.currentPose.position.copy(this.nextPosition),
            this.currentPose.rotation.copy(this.nextOrientation),
            (this.currentPose.focalDistance = u),
            this.currentPose.applyPhiBasedFovSquish(),
            t)
          )
            return this.poseController
              .moveTo({
                transitionType: M.nF.Interpolate,
                pose: {
                  position: this.currentPose.position.clone(),
                  rotation: this.currentPose.rotation.clone(),
                },
                transitionTime: 500,
              })
              .nativePromise();
          this.poseController.updateCameraPose(this.currentPose);
        }
        zoom(e) {
          if (!this.poseController) return;
          this.setupCurrentPose(), this.updateOrbitState();
          const t = this.cameraPoseProxy.pose;
          this.poseConstrainer.setStartPose(t);
          const i = t.forward().clone(),
            s = (1 / (this.getGrabPoint().distanceTo(t.position) / t.fovDistanceScale())) * 2,
            o = this.poseConstrainer.modelSize,
            r = (e * b.jX) / (s * o * b.mP),
            n = this.zoomDirection,
            a = this.orbitPoint,
            h = this.poseConstrainer.maxZoomDistance - this.poseConstrainer.minZoomDistance,
            l = a.distanceTo(t.position) / t.fovDistanceScale(),
            d =
              (0, f.uZ)(
                r * h + l,
                this.poseConstrainer.minZoomDistance,
                this.poseConstrainer.maxZoomDistance,
              ) - l,
            c = n.setLength(-d);
          this.nextPosition.copy(t.fovCorrectedPosition()).add(c);
          const u = new m.Ray(this.nextPosition, i),
            p = new m.Vector3(),
            g = u.intersectPlane(this.orbitPlane, p) || a;
          this.currentPose.position.copy(this.nextPosition),
            (this.currentPose.focalDistance = g.distanceTo(this.nextPosition)),
            this.currentPose.resetProjMatrix(),
            this.currentPose.applyPhiBasedFovSquish(),
            this.poseConstrainer.constrain(this.currentPose),
            this.poseController.updateCameraPose(this.currentPose);
        }
        setupCurrentPose() {
          const e = this.cameraPoseProxy.pose;
          this.currentPose.copy(e), this.currentPose.unapplyPhiBasedFovSquish();
        }
        calcAutoOrbitVelocity(e) {
          const t = 'top' === this.constrolsData.autoOrbitTarget ? 1 : -1,
            i = 'top' === this.constrolsData.autoOrbitTarget ? R : b.dG,
            s = Math.abs((i - e) / (i - this.autoOrbitStartPhi)),
            o = (0, O.t)(0.002, 0.08, s);
          return new m.Vector2(0, t * o);
        }
        getDebugState() {
          return {
            plane: this.orbitPlane.clone(),
            orbitPt: this.orbitPoint.clone(),
            zoomDir: this.zoomDirection.clone().normalize(),
          };
        }
        updateMultiTouchGesture(e) {
          if (this.isTouchSpinning) {
            const t = this.touchGestureRecognizer.currPos.x,
              i = this.touchGestureRecognizer.currPos.y,
              s = this.prevTouchX - t,
              o = this.prevTouchY - i,
              r = Math.abs(s) > 0.001 ? s : 0,
              n = Math.abs(o) > 0.001 ? o : 0,
              a = e / b.SI;
            this.setOrbitalAcceleration({ x: V * r * a, y: V * n * a }),
              (this.prevTouchX = t),
              (this.prevTouchY = i);
          }
        }
      }
      var L = i(56063);
      class N extends L.m {
        constructor(e) {
          super(), (this.payload = e);
        }
      }
      N.id = 'DOLLHOUSE_VERTICAL_LIMITS';
      class z extends L.m {
        constructor() {
          super();
        }
      }
      z.id = 'SWAP_MOUSE_BTN_ACTION';
      class U extends L.m {
        constructor() {
          super();
        }
      }
      U.id = 'RESTORE_MOUSE_BTN_ACTION';
      var G = i(91524);
      class j {
        constructor(e) {
          (this.idealOrbitCenter = new m.Vector3()),
            (this.gestureStartPose = new D.B(1)),
            (this.constrain = (() => {
              const e = new m.Vector3(),
                t = new m.Vector3(),
                i = new m.Vector3(),
                s = new m.Vector3(),
                o = new m.Ray(),
                n = new m.Plane();
              return (a) => {
                const h = this.gestureStartPose.focalPoint(),
                  l = a.focalPoint();
                if (l.distanceTo(h) < 1e-10) return;
                const d = i.subVectors(a.position, this.gestureStartPose.position);
                o.set(this.gestureStartPose.position, d);
                const c = this.maxDeviationOfOrbitPoint.clampPoint(l, e),
                  u = a.fovDistanceScale(),
                  m = this.minOrbitDistance * u,
                  p = this.maxOrbitDistance * u,
                  g = (0, f.uZ)(a.focalDistance, m, p),
                  y = t.copy(c).addScaledVector(a.forward(), -1 * g);
                Math.abs(d.y) > 1e-8 &&
                  (n.setFromNormalAndCoplanarPoint(r.fU.UP, y),
                  o.intersectPlane(n, s) && y.copy(s)),
                  (a.focalDistance = g),
                  a.position.copy(y),
                  a.commit();
              };
            })()),
            this.updateConstraints(e);
        }
        updateConstraints(e) {
          const t = e.getSize(new m.Vector3());
          (this.modelSize = Math.max(t.length(), 1)),
            (this.modelBoundingBox = e),
            (this.idealOrbitCenter = e.getCenter(this.idealOrbitCenter));
          const i = e.max.distanceTo(this.idealOrbitCenter);
          this.minOrbitDistance = 2;
          const s = 2 * i;
          this.maxOrbitDistance = s / Math.tan((G.oR.fov / 2) * u.Ue);
          const o = 2 * i;
          (this.maxDeviationOfOrbitPoint = new m.Box3(
            this.idealOrbitCenter.clone().add(new m.Vector3(-o, 0, -o)),
            this.idealOrbitCenter.clone().add(new m.Vector3(o, 0, o)),
          )),
            (this.maxDeviationOfOrbitPoint.min.y = this.modelBoundingBox.min.y),
            (this.maxDeviationOfOrbitPoint.max.y = this.modelBoundingBox.max.y);
        }
        get minZoomDistance() {
          return this.minOrbitDistance;
        }
        get maxZoomDistance() {
          return this.maxOrbitDistance;
        }
        setStartPose(e) {
          this.gestureStartPose.copy(e);
        }
        containsPoint(e) {
          return this.maxDeviationOfOrbitPoint.containsPoint(e);
        }
      }
      var H = i(900),
        Q = i(3433),
        Z = i(64150),
        W = i(59452),
        K = i(16567),
        $ = i(34608);
      class q extends Q.Z {
        constructor() {
          super(...arguments),
            (this.name = 'dollhouse-controls'),
            (this.controlState = s.NONE),
            (this.movementKeys = new m.Vector2()),
            (this.didDrag = !1),
            (this.peekabooActive = !1),
            (this.swapMouseBoutton = !1),
            (this.displayDollhouseMetadata = !1),
            (this.resetControlState = () => {
              this.controlState = s.NONE;
            }),
            (this.convertDeltaToLocal = (() => {
              const e = new m.Vector3(),
                t = new m.Vector3();
              return (i) => {
                const s = i.x || 0,
                  o = i.y || 0,
                  n = this.cameraPoseProxy.pose.phi() > (0, u.Id)(85) ? r.fU.UP : r.fU.FORWARD,
                  a = 2 * s * this.cameraPoseProxy.pose.fovCorrectedFocalDistance(),
                  h =
                    (2 * o * this.cameraPoseProxy.pose.fovCorrectedFocalDistance()) /
                    this.cameraPoseProxy.pose.aspect();
                return (
                  e
                    .copy(r.fU.RIGHT)
                    .applyQuaternion(this.cameraPoseProxy.pose.rotation)
                    .setY(0)
                    .setLength(a),
                  t.copy(n).applyQuaternion(this.cameraPoseProxy.pose.rotation),
                  e.add(t.setY(0).setLength(h)),
                  e
                );
              };
            })());
        }
        async init(e, t) {
          [
            this.visibleMeshBounds,
            this.commonControlsModule,
            this.inputIni,
            this.raycaster,
            this.renderer,
            this.settings,
          ] = await Promise.all([
            t.getModuleBySymbol(o.ep),
            t.getModuleBySymbol(o.Ng),
            t.getModuleBySymbol(o.PZ),
            t.getModuleBySymbol(o.fQ),
            t.getModuleBySymbol(o.Aj),
            t.getModuleBySymbol($.Ak),
          ]);
          const i = await t.market.waitForData(Z.e);
          (this.peekabooActive = i.tryGetProperty(W.eC, !1)),
            this.bindings.push(
              i.onPropertyChanged(W.eC, (e) => {
                this.peekabooActive = e;
              }),
            ),
            this.settings.registerMenuButton({
              header: 'Dollhouse',
              buttonName: 'Toggle Orbit point display',
              callback: () => {
                (this.displayDollhouseMetadata = !this.displayDollhouseMetadata),
                  this.displayDollhouseMetadata
                    ? this.createDebugObjects()
                    : this.removeDebugObjects();
              },
            }),
            (this.cameraPoseProxy = this.commonControlsModule.cameraPoseProxy),
            (this.poseConstrainer = new j(this.visibleMeshBounds.getFullBounds())),
            (this.controlsData = new K.x()),
            t.market.register(this, K.x, this.controlsData),
            (this.controls = new _(
              this.cameraPoseProxy,
              this.poseConstrainer,
              () => this.computeOrbitPoint(),
              () => this.computeGrabPoint(),
              (e) => this.focusPointHelper(e),
              this.controlsData,
              t.msgBus,
            )),
            this.bindings.push(
              this.visibleMeshBounds.onFullBoundsChanged((e) => {
                this.poseConstrainer.updateConstraints(e), this.controls.invalidateOrbitMetadata();
              }),
              this.visibleMeshBounds.onVisibleBoundsChanged((e) => {
                this.controls.invalidateOrbitMetadata();
              }),
              t.commandBinder.addBinding(N, async (e) => {
                const t = this.cameraPoseProxy.pose.autoOrtho ? b.pj : b.uQ;
                return this.controls.setPhiLimits(
                  void 0 !== e.phiLowerLimitDegrees ? e.phiLowerLimitDegrees * u.Ue : b.zf,
                  void 0 !== e.phiUpperLimitDegrees ? e.phiUpperLimitDegrees * u.Ue : t,
                  void 0 !== e.noTransition ? !e.noTransition : this.controls.isActive,
                );
              }),
              t.commandBinder.addBinding(z, async () => {
                this.peekabooActive || (this.swapMouseBoutton = !0);
              }),
              t.commandBinder.addBinding(U, async () => {
                this.peekabooActive || (this.swapMouseBoutton = !1);
              }),
            ),
            this.registerActiveStateChangeBinding();
          const s = this.inputIni;
          this.commonControlsModule.addControls(c.Ey.Dollhouse, this.controls);
          const r = (e) => {
              (this.didDrag = !1), this.onDragBegin(e.buttons, e.position, e.device, e.ctrlKey);
            },
            l = (e) => {
              e.timeSinceLastMove < 100 &&
                this.didDrag &&
                (this.onDrag(e.delta, e.position),
                this.controls.update(b.SI),
                this.controls.stopAcceleration()),
                this.onDragEnd(e.delta, e.buttons, e.position);
            },
            m = (e) => {
              (this.didDrag = !0),
                this.onDrag(e.delta, e.position),
                this.controls.update(b.SI),
                this.controls.stop();
            };
          this.inputBindings.push(
            s.registerHandler(n.a, (e) => {
              this.onScrollWheel(e);
            }),
          ),
            this.inputBindings.push(
              s.registerHandler(a.E0, (e) => {
                this.isTouchDrag(e.pointerId) || r(e);
              }),
            ),
            this.inputBindings.push(
              s.registerHandler(a._R, (e) => {
                this.isTouchDrag(e.pointerId) || l(e);
              }),
            ),
            this.inputBindings.push(
              s.registerHandler(a._t, (e) => {
                this.isTouchDrag(e.pointerId) || m(e);
              }),
            ),
            this.inputBindings.push(
              s.registerHandler(p.h, (e) => {
                this.controls.rawPointerUpdate(e);
              }),
            ),
            this.inputBindings.push(
              s.registerHandler(h.e, (e) => {
                e.state !== d.M.PRESSED && this.onKey(e.key, e.state);
              }),
            ),
            this.updateInputBindings(),
            this.peekabooActive &&
              (this.controls.setPhiLimits(b.zf, b.pj, !1), (this.swapMouseBoutton = !0));
        }
        onUpdate(e) {
          this.controls.isActive && (this.controls.update(e), this.updateDebugObjects());
        }
        isTouchDrag(e) {
          const t = this.controls.touchGestureIds();
          return t[0] === e || t[1] === e;
        }
        onActiveStateChanged() {
          super.onActiveStateChanged(), this.resetControlState();
        }
        onScrollWheel(e) {
          this.zoom(e.delta.y);
        }
        zoom(e) {
          0 !== e &&
            (this.controls.setZoomAcceleration(e),
            this.controls.update(b.SI),
            this.controls.setZoomAcceleration(0));
        }
        onDragBegin(e, t, i, o = !1) {
          if (this.controlState === s.NONE) {
            const t = this.swapMouseBoutton ? T : x;
            if (i === H._.MOUSE) {
              const i = this.applyKeyboardModifier(e, o);
              this.controlState = t[i];
            } else this.controlState = this.peekabooActive ? s.PAN : s.ROTATE;
          }
          const r = i === H._.TOUCH ? C.TOUCH : C.MOUSE;
          this.controls.initMove(this.controlState, r, t);
        }
        onDrag(e, t) {
          switch ((this.controls.setNdcPos(t), this.controlState)) {
            case s.ROTATE:
              this.controls.setOrbitalAcceleration({ x: -Math.PI * e.x, y: -Math.PI * e.y });
              break;
            case s.ZOOM:
              0 !== e.y && this.controls.setZoomAcceleration(-e.y);
          }
        }
        onDragEnd(e, t, i) {
          t & this.controlState || ((this.controlState = s.NONE), this.controls.endMove(i));
        }
        onKey(e, t) {
          const i = t === d.M.DOWN;
          let o = !1;
          switch (e) {
            case l.R.LEFTARROW:
            case l.R.J:
              this.controls.setOrbitalAcceleration({ x: i ? b.v0 : 0 }, !0),
                this.controls.initMove(s.ROTATE, C.KEYBOARD);
              break;
            case l.R.RIGHTARROW:
            case l.R.L:
              this.controls.setOrbitalAcceleration({ x: i ? -b.v0 : 0 }, !0),
                this.controls.initMove(s.ROTATE, C.KEYBOARD);
              break;
            case l.R.UPARROW:
            case l.R.I:
              this.controls.setOrbitalAcceleration({ y: i ? -b.v0 : 0 }, !0),
                this.controls.initMove(s.ROTATE, C.KEYBOARD);
              break;
            case l.R.DOWNARROW:
            case l.R.K:
              this.controls.setOrbitalAcceleration({ y: i ? b.v0 : 0 }, !0),
                this.controls.initMove(s.ROTATE, C.KEYBOARD);
              break;
            case l.R.W:
              (this.movementKeys.y = i ? 1 : 0), (o = !0);
              break;
            case l.R.S:
              (this.movementKeys.y = i ? -1 : 0), (o = !0);
              break;
            case l.R.D:
              (this.movementKeys.x = i ? 1 : 0), (o = !0);
              break;
            case l.R.A:
              (this.movementKeys.x = i ? -1 : 0), (o = !0);
              break;
            case l.R.PLUSEQUALS:
              this.zoom(-b.Gu);
              break;
            case l.R.DASHUNDERSCORE:
              this.zoom(b.Gu);
          }
          if (o) {
            const e = this.convertDeltaToLocal(this.movementKeys).setLength(b.bC);
            this.controls.setPanAcceleration({ x: e.x, y: e.z }),
              this.controls.initMove(s.PAN, C.KEYBOARD);
          }
        }
        computeGrabPoint() {
          const e = this.inputIni.getCurrentPointerRay();
          return this.focusPointHelper(e, !0);
        }
        computeOrbitPoint() {
          const e = this.cameraPoseProxy.pose,
            t = new m.Ray(e.position.clone(), e.forward().clone());
          return this.focusPointHelper(t);
        }
        focusPointHelper(e, t = !1) {
          const i = () => {
            const t = this.visibleMeshBounds.getVisibleBounds(),
              i = this.visibleMeshBounds.getCenterOfMass(),
              s = Math.ceil(Math.abs(i.y - t.min.y) / 3);
            let o = Number.MAX_VALUE;
            const n = new m.Vector3(),
              a = new m.Vector3();
            let h = !1;
            if (Number.isFinite(s))
              for (let l = 0; l < s; l++) {
                const s = t.min.y + 3 * l,
                  d = new m.Plane().setFromNormalAndCoplanarPoint(
                    r.fU.UP,
                    new m.Vector3(t.min.x, s, t.min.z),
                  );
                h = !!e.intersectPlane(d, n);
                const c = i.distanceTo(n);
                h && c < o && ((o = c), a.copy(n));
              }
            const l = !this.poseConstrainer.containsPoint(a);
            return (
              (h && !l) ||
                (e.closestPointToPoint(i, a), e.origin.distanceTo(a) < b.qj && e.at(b.qj, a)),
              a
            );
          };
          if (this.cameraPoseProxy.pose.autoOrtho && !t) return i();
          {
            const t = this.raycaster.picking.pick(e.origin, e.direction);
            return t ? t.point.clone() : i();
          }
        }
        applyKeyboardModifier(e, t) {
          let i = e;
          return t && e === g.r.PRIMARY && (i = g.r.SECONDARY), i;
        }
        createDebugObjects() {
          if (null == this.debugPlane) {
            const e = new m.PlaneHelper(new m.Plane(), 100, 16711680);
            (e.material.depthTest = !1), (this.debugPlane = e);
          }
          if (null == this.debugOrbit) {
            const e = new m.SphereGeometry(0.1, 2, 2),
              t = new m.MeshBasicMaterial({ color: 16711680, side: m.DoubleSide, depthTest: !1 }),
              i = new m.Mesh(e, t);
            this.debugOrbit = i;
          }
          if (null == this.debugZoom) {
            const e = new m.SphereGeometry(0.2, 2, 2),
              t = new m.MeshBasicMaterial({ color: 65280, side: m.DoubleSide, depthTest: !1 }),
              i = new m.Mesh(e, t);
            this.debugZoom = i;
          }
          this.renderer.getScene().add(this.debugPlane, this.debugOrbit, this.debugZoom);
        }
        removeDebugObjects() {
          null != this.debugPlane &&
            (this.renderer.getScene().remove(this.debugPlane), (this.debugPlane = null)),
            null != this.debugOrbit &&
              (this.renderer.getScene().remove(this.debugOrbit), (this.debugOrbit = null)),
            null != this.debugZoom &&
              (this.renderer.getScene().remove(this.debugZoom), (this.debugZoom = null));
        }
        updateDebugObjects() {
          if (this.displayDollhouseMetadata) {
            const { plane: e, orbitPt: t, zoomDir: i } = this.controls.getDebugState();
            if (
              (null != this.debugPlane &&
                ((this.debugPlane.plane = e), this.debugPlane.updateMatrixWorld(!0)),
              null != this.debugOrbit && this.debugOrbit.position.copy(t),
              null != this.debugZoom)
            ) {
              const e = this.cameraPoseProxy.pose
                .fovCorrectedPosition()
                .clone()
                .addScaledVector(i, this.cameraPoseProxy.pose.fovCorrectedFocalDistance());
              this.debugZoom.position.copy(e);
            }
          }
        }
      }
    },
    88561: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => w });
      var s = i(81396),
        o = i(3835),
        r = i(43718),
        n = i(2897),
        a = i(30404);
      class h extends a.B {
        constructor(e, t, i, s, o = !1) {
          super(e, t, i, s, o),
            (this.cameraPoseProxy = e),
            (this.angularAccel = 0),
            (this.angularVelocity = 0),
            (this.transition.angularVelocity = 0);
        }
        setRollAcceleration(e, t = !1) {
          this.transition.active ||
            (t &&
              e &&
              this.angularVelocity &&
              Math.sign(e) !== Math.sign(this.angularVelocity) &&
              (this.angularVelocity = 0),
            (this.angularAccel = e));
        }
        startRotateTransition(e, t, i) {
          return this.startTransition(e, t.x * r.SI, new s.Vector2(), 0, i).nativePromise();
        }
        startTransition(e, t, i, s, o) {
          return (
            (this.transition.angularVelocity = t),
            (this.angularVelocity = t),
            (this.angularAccel = 0),
            super.startTransition(e, t, i, s, o)
          );
        }
        update(e) {
          super.update(e);
          (Math.abs(this.angularAccel) > n.Z.epsilon ||
            Math.abs(this.angularVelocity) > n.Z.epsilon) &&
            (this.transition.active
              ? this.updateAngularTransition(e)
              : this.updateAngularDefault(e));
        }
        stopMomentum() {
          super.stopMomentum(), this.transition.active || (this.angularVelocity = 0);
        }
        stopAcceleration() {
          super.stopAcceleration(), this.transition.active || this.setRollAcceleration(0);
        }
        updateAngularTransition(e) {
          const t = this.getTransitionScale(e);
          (this.angularVelocity = this.transition.angularVelocity * t),
            this.roll(this.angularVelocity);
        }
        updateAngularDefault(e) {
          const t = e / r.SI;
          (this.angularVelocity = this.angularVelocity + this.angularAccel * t),
            this.roll(this.angularVelocity),
            (this.angularVelocity *= Math.pow(1 - r.O8, t));
        }
        roll(e) {
          var t;
          const i = this.cameraPoseProxy.pose;
          this.currentOrientation.setFromAxisAngle(o.fU.FORWARD, e),
            this.currentOrientation.multiplyQuaternions(i.rotation, this.currentOrientation),
            this.currentOrientation.normalize(),
            (this.checkBounds &&
              !this.insideBounds(i.position, this.currentOrientation, i.projection)) ||
              i.rotation.equals(this.currentOrientation) ||
              null === (t = this.poseController) ||
              void 0 === t ||
              t.updateCameraRotation(this.currentOrientation);
        }
      }
      var l = i(24213),
        d = i(41200),
        c = i(4763),
        u = i(20360),
        m = i(69947),
        p = i(43017),
        g = i(40333);
      const y = Math.PI / 2 / 1e3;
      var v,
        f = i(59452);
      !(function (e) {
        (e[(e.NONE = g.r.NONE)] = 'NONE'),
          (e[(e.PAN = g.r.PRIMARY)] = 'PAN'),
          (e[(e.ROTATE = g.r.SECONDARY)] = 'ROTATE'),
          (e[(e.ZOOM = g.r.MIDDLE)] = 'ZOOM');
      })(v || (v = {}));
      class w extends l.default {
        constructor() {
          super(...arguments), (this.name = 'floorplan-controls');
        }
        async init(e, t) {
          await super.init(e, t),
            t.getModuleBySymbol(c.PZ).then((e) => {
              this.inputBindings.push(
                e.registerHandler(d.D, (e) => {
                  this.controls.isActive &&
                    (this.controls.setRollAcceleration(e.rotateDelta),
                    this.controls.update(r.SI),
                    this.controls.stop());
                }),
                e.registerHandler(d.u, this.resetControlState),
              ),
                this.updateInputBindings();
            });
        }
        createCameraControls(e, t, i) {
          const s = this.commonControlsModule.cameraPoseProxy,
            o = t.defaultZoom.bind(t);
          (this.controls = new h(s, o, e.extendedBounds, e.meshCenter, !0)),
            i.tryGetProperty(f.eC, !1) ||
              this.commonControlsModule.addControls(p.Ey.Floorplan, this.controls);
        }
        onDrag(e) {
          switch ((super.onDrag(e), this.controlState)) {
            case v.ROTATE:
              this.controls.setRollAcceleration(e.x * Math.PI);
          }
        }
        onKey(e) {
          super.onKey(e);
          const { key: t, state: i, modifiers: s } = e,
            o = i === m.M.DOWN;
          switch (t) {
            case u.R.J:
            case u.R.LEFTARROW:
              this.controls.setRollAcceleration(o ? y : 0, !0);
              break;
            case u.R.L:
            case u.R.RIGHTARROW:
              this.controls.setRollAcceleration(o ? -y : 0, !0);
              break;
            case u.R.DOWNARROW:
              s.shiftKey || this.controls.setZoomAcceleration(o ? r.Gu : 0);
              break;
            case u.R.UPARROW:
              s.shiftKey || this.controls.setZoomAcceleration(o ? -r.Gu : 0);
          }
        }
      }
    },
    66369: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => P });
      var s = i(933),
        o = i(4763),
        r = i(83069),
        n = i(68661),
        a = i(4218),
        h = i(17295),
        l = i(35659),
        d = i(37137),
        c = i(8699),
        u = i(93797),
        m = i(53257),
        p = i(81396);
      class g {
        constructor() {
          this.list = [];
        }
        insort(e) {
          const t = this.binarySearch(e);
          let i = t.index;
          if (!t.success) for (; this.compare(e, this.list[i]) >= 0 && i < this.list.length; ) i++;
          for (let e = this.list.length; e > i; e--) this.list[e] = this.list[e - 1];
          this.list[i] = e;
        }
        removeIndex(e) {
          if (e > this.list.length) throw Error('OrderList.removeIndex() -> Invalid index: ' + e);
          this.list.splice(e, 1);
        }
        getElement(e) {
          if (e >= 0 && e < this.list.length) return this.list[e];
          throw new Error('OrderList.getElement() -> Invalid index: ' + e);
        }
        get length() {
          return this.list.length;
        }
        find(e) {
          const t = this.binarySearch(e);
          return t.success ? t.index : -1;
        }
        compare(e, t) {
          return void 0 === t
            ? 1
            : 'number' == typeof e
              ? e === t
                ? 0
                : e < t
                  ? -1
                  : 1
              : e.compare(t);
        }
        binarySearch(e) {
          let t,
            i = 0,
            s = this.list.length - 1,
            o = -1,
            r = 0;
          for (; i <= s; ) {
            if (
              ((o = Math.floor((i + s) / 2)), (t = this.list[o]), (r = this.compare(e, t)), 0 === r)
            )
              return { success: !0, index: o };
            r < 0 ? (s = o - 1) : (i = o + 1);
          }
          return { success: !1, index: o };
        }
      }
      var y = i(58196),
        v = i(64831),
        f = i(3835),
        w = i(85726);
      class M extends v.T {
        constructor(e = {}) {
          super(),
            (this.name = ''),
            (this.center = new p.Vector3()),
            (this.centerOfMass = new p.Vector3()),
            (this._boundingBox = new w.f(new p.Box3())),
            (this.size = new p.Vector3()),
            (this.sweepHeights = new g()),
            (this.sweepFloorHeights = new g()),
            (this._groundPlane = new p.Plane()),
            (this._groundPt = new p.Vector3()),
            (this.medianSweepHeight = () =>
              this.sweepHeights.length > 0
                ? this.sweepHeights.getElement(Math.floor(this.sweepHeights.length / 2))
                : this.center.y),
            (this.minSweepFloorHeight = () =>
              this.sweepFloorHeights.length > 0
                ? this.sweepFloorHeights.getElement(0)
                : this.boundingBox.min.y),
            Object.assign(this, e);
        }
        get boundingBox() {
          return this._boundingBox.value;
        }
        set boundingBox(e) {
          this.setBounds(e);
        }
        setBounds(e) {
          this._boundingBox.value.copy(e),
            this._boundingBox.value.getSize(this.size),
            this._boundingBox.value.getCenter(this.center),
            this._boundingBox.setDirty(!0);
        }
        setCenterOfMass(e) {
          this.centerOfMass.copy(e);
        }
        onBoundsChanged(e) {
          return this._boundingBox.onChanged(e);
        }
        addSweep(e, t) {
          this.sweepHeights.insort(e.y), this.sweepFloorHeights.insort(t.y);
        }
        medianSweepFloorHeight() {
          return this.sweepFloorHeights.length > 0
            ? this.sweepFloorHeights.getElement(Math.floor(this.sweepFloorHeights.length / 2))
            : this.bottom;
        }
        get bottom() {
          return this.minSweepFloorHeight();
        }
        get groundPlane() {
          return (
            this._groundPt.set(0, this.bottom, 0),
            this._groundPlane.setFromNormalAndCoplanarPoint(f.fU.UP, this._groundPt),
            this._groundPlane
          );
        }
        get top() {
          return this.sweepFloorHeights.length > 0
            ? this.sweepFloorHeights.getElement(this.sweepFloorHeights.length - 1)
            : this.boundingBox.max.y;
        }
        deepCopy() {
          return (0, y.p$)({
            id: this.id,
            meshGroup: this.meshGroup,
            index: this.index,
            name: this.name,
            center: this.center,
            boundingBox: this.boundingBox,
            size: this.size,
            medianSweepHeight: this.medianSweepHeight(),
            bottom: this.bottom,
          });
        }
      }
      const b = new m.Z('mds-floor-deserializer');
      class D {
        deserialize(e) {
          if (!e || !this.validate(e))
            return b.debug('Deserialized invalid floor data from MDS', e), null;
          const t = e.label || '',
            i = e.dimensions || { areaFloor: -1 },
            { areaFloor: s } = i;
          return new M({
            id: e.id,
            index: e.sequence,
            meshGroup: e.meshId,
            name: t,
            areaFloor: s || -1,
          });
        }
        validate(e) {
          return ['id', 'sequence', 'meshId'].every((t) => t in e);
        }
      }
      class S {
        serialize(e) {
          return { label: e.name };
        }
      }
      class x extends u.u {
        constructor() {
          super(...arguments),
            (this.deserializer = new D()),
            (this.prefetchKey = 'data.model.floors');
        }
        async read(e = {}) {
          const t = { modelId: this.getViewId() };
          return this.query(c.GetFloors, t, e).then((e) => {
            var t, i;
            const s =
              null ===
                (i =
                  null === (t = null == e ? void 0 : e.data) || void 0 === t ? void 0 : t.model) ||
              void 0 === i
                ? void 0
                : i.floors;
            if (!s || !Array.isArray(s)) return null;
            return s.reduce((e, t) => {
              const i = this.deserializer.deserialize(t);
              return i && (e[t.id] = i), e;
            }, {});
          });
        }
        async update(e, t) {
          const i = this.getViewId(),
            s = new S().serialize(t);
          if (!s) throw new Error('Could not update Floor');
          return this.mutate(c.PatchFloor, { modelId: i, floorId: e, data: s });
        }
      }
      var T = i(97115),
        C = i(22925);
      class P extends s.Y {
        constructor() {
          super(...arguments), (this.name = 'floors');
        }
        async init(e, t) {
          const { readonly: i, baseUrl: s, baseModelId: n } = e;
          this.engine = t;
          const { mdsContext: c } = await t.market.waitForData(C.R);
          this.store = new x({ context: c, readonly: i, baseUrl: s, viewId: n });
          const [u] = await Promise.all([this.store.read()]);
          if (((this.data = new h.i(u || {})), t.market.register(this, h.i, this.data), !1 === i)) {
            const e = this.data.getCollection();
            (this.monitor = new a.c(e, { aggregationType: r.E.NextFrame, shallow: !0 }, t)),
              this.monitor.onChanged(() =>
                this.engine.commandBinder.issueCommand(new d.V({ dataTypes: [l.g.FLOORS] })),
              );
            const [i] = await Promise.all([t.getModuleBySymbol(o.Lx)]);
            this.bindings.push(i.onSave(() => this.save(), { dataType: l.g.FLOORS }));
          }
        }
        onUpdate() {}
        async save() {
          const e = this.monitor.getDiffRecord();
          this.monitor.clearDiffRecord();
          const t = [];
          for (const i of e) {
            const e = i.index;
            if (!e) throw new T.H(`Invalid floor '${i.index}'`);
            i.action === n.KI.updated && t.push(this.store.update(e, i.diff));
          }
          return Promise.all(t);
        }
      }
    },
    63180: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => re });
      var s = i(933),
        o = i(4763),
        r = i(31971),
        n = i(86210),
        a = i(20360),
        h = i(69947),
        l = i(31740),
        d = i(90512),
        c = i(57793),
        u = i(67108),
        m = i(33809),
        p = i(16013),
        g = i(57363),
        y = i(33716),
        v = i(43017),
        f = i(72392),
        w = i(24938),
        M = i(88288),
        b = i(17295),
        D = i(96783),
        S = i(5829),
        x = i(56620);
      class T {
        constructor(e, t, i, s, o, r, n, a, h) {
          (this.getAngleModifier = e),
            (this.floorsViewData = t),
            (this.meshQuery = i),
            (this.viewmodeData = s),
            (this.raycasterData = o),
            (this.cameraData = r),
            (this.applicationData = n),
            (this.touchDevice = a),
            (this.meshModule = h);
        }
        activate() {}
        init() {}
        dispose() {}
        deactivate() {
          const { floorOpacity: e } = this.meshModule.meshGroupVisuals;
          for (const t of e.keys) e.set(t, 0);
        }
        beforeRender() {
          const e = this.floorsViewData.nearestFloor,
            t = this.floorsViewData.transition.progress.active,
            { meshGroupVisuals: i } = this.meshModule,
            s = !(!e || this.viewmodeData.isInside()),
            o = x.xx.FADE_OPAQUE;
          let r = o,
            n = o;
          const a = this.getAngleModifier(),
            h = this.floorsViewData.onlyShowActiveFloor.value ? 0 : 1;
          (i.globalOpacityModifier.value =
            i.allFloorsVisibleInOrtho.value ||
            this.floorsViewData.isInAllFloorsMode ||
            this.applicationData.application !== w.Mx.SHOWCASE
              ? 1
              : this.cameraData.pose.pitchFactor()),
            s &&
              (this.viewmodeData.isDollhouse() || this.viewmodeData.isOrthographic()
                ? ((r = o * a * h * x.xx.FADE_IN_VALUE),
                  (n = r * x.xx.FADE_BELOW_MULT + x.xx.FADE_BELOW_START))
                : ((r = x.xx.FADE_ABOVE), (n = x.xx.FADE_BELOW)));
          const { floorOpacity: l } = i;
          for (const e of l.keys) {
            const i = this.floorsViewData.floors.getFloorByMeshGroup(Number(e));
            let s = o;
            const a = this.isBelowSelectedFloor(i) ? n : r;
            let h = (0, D.uZ)(a + x.xx.FADE_IN_HOVER_BOOST_VALUE, 0, 1);
            this.floorsViewData.roomSelectModeActive && (h = a),
              (s = this.isHoveredFloor(null == i ? void 0 : i.id) && !t && a > 0 ? h : a),
              (s = this.isFloorTransitioningOut(i) ? a : s);
            const d =
              this.isSelectedFloor(null == i ? void 0 : i.id) || this.isFloorTransitioningIn(i);
            if (((s = d ? o : s), (s = this.clampForViewmodeTransitions(s)), d)) l.set(e, s);
            else {
              const t = l.get(e);
              if (null == t) l.set(e, s);
              else if (t !== s) {
                let i = (0, S.t)(t, s, 0.2);
                Math.abs(s - i) < 1e-4 && (i = s), l.set(e, i);
              }
            }
          }
        }
        render() {}
        clampForViewmodeTransitions(e) {
          if (this.viewmodeData.currentMode === v.Ey.Transition) {
            const { to: t } = this.viewmodeData.transition;
            if (t === v.Ey.Panorama)
              return Math.max(1 - this.meshModule.meshGroupVisuals.meshTextureOpacity.value, e);
          }
          return e;
        }
        isHoveredFloor(e) {
          if (
            void 0 !== e &&
            this.raycasterData.hit &&
            (this.viewmodeData.isDollhouse() || this.viewmodeData.isOrthographic()) &&
            !this.touchDevice &&
            this.floorsViewData.isNavigable(e)
          ) {
            const t = this.raycasterData.hit.object;
            return e === this.meshQuery.floorIdFromObject(t);
          }
          return !1;
        }
        isSelectedFloor(e) {
          const t = this.floorsViewData.nearestFloor;
          return !t || !(!e || t.id !== e);
        }
        isBelowSelectedFloor(e) {
          const t = this.floorsViewData.nearestFloor;
          return !!(e && t && t.index > e.index);
        }
        isFloorTransitioningIn(e) {
          return !(
            !e ||
            !this.floorsViewData.transition.progress.active ||
            (this.floorsViewData.transition.to && this.floorsViewData.transition.to !== e.id)
          );
        }
        isFloorTransitioningOut(e) {
          return !(
            !e ||
            !this.floorsViewData.transition.progress.active ||
            (this.floorsViewData.transition.from &&
              this.floorsViewData.transition.from !== e.id &&
              this.floorsViewData.transition.to === e.id)
          );
        }
      }
      var C = i(93827),
        P = i(82076),
        O = i(17785),
        k = i(90288),
        A = i(38063),
        E = i(81396),
        F = i(3835),
        B = i(26059),
        I = i(61565),
        R = i(71835),
        V = i(97115),
        _ = i(62900),
        L = i(58340),
        N = i(11250),
        z = i(59452);
      class U {
        constructor(e, t, i, s, o, r, n, a, h, l) {
          (this.engine = e),
            (this.floorsData = t),
            (this.floorsViewData = i),
            (this.sweepData = s),
            (this.cameraData = o),
            (this.cameraModule = r),
            (this.viewmodeData = n),
            (this.updateCurrentFloor = a),
            (this.meshData = h),
            (this.settingsData = l),
            (this.MOVE_TO_BLACK_TRANSITION_TIME = 2e3),
            (this.moveFloorUp = (e = !1, t) => {
              const i = this.floorsViewData.currentFloorId,
                s = this.floorsViewData.getNavigableFloorIds(),
                o = i ? s.indexOf(i) : -1;
              let r = s[o + 1];
              return (
                void 0 === r && (r = this.viewmodeData.isInside() ? s[s.length - 1] : s[0]),
                this.moveToFloor(r, e, t)
              );
            }),
            (this.moveFloorDown = (e = !1, t) => {
              const i = this.floorsViewData.currentFloorId,
                s = this.floorsViewData.getNavigableFloorIds(),
                o = i ? s.indexOf(i) : s.length;
              let r = s[o - 1];
              return (
                void 0 === r && (r = this.viewmodeData.isInside() ? s[0] : s[s.length - 1]),
                this.moveToFloor(r, e, t)
              );
            }),
            (this.moveToFloor = (e, t = !1, i, s) => {
              const o = this.floorsViewData.currentFloorId,
                r = o === e,
                n = this.floorsViewData.totalFloors < 2 && !e,
                a = e ? this.floorsViewData.floors.getFloor(e) : null;
              if (r || n || !this.floorsViewData.floorsEnabled)
                return this.updateCurrentFloor(e), C.Q.resolve();
              if (a && !this.canMoveToFloor(a, t)) return C.Q.reject(new V.H('Invalid floor ID'));
              this.engine.broadcast(new P.S(o, e)), void 0 === i && (i = L.cw);
              const h = new C.Q();
              let l;
              this.floorsViewData.transitionToFloor(o, e, i, h.nativePromise()),
                this.floorsViewData.commit();
              let d,
                c = s;
              if (this.viewmodeData.isInside()) {
                const t = (e) => (e) => this.floorsViewData.isCurrentOrAllFloors(e.floorId),
                  i = !!e ? I.nK : t,
                  o = [(0, I._T)(), (0, I._k)(), i(e)],
                  r = [(0, R.l0)(s || this.cameraData.pose.position)],
                  n = this.sweepData.sortByScore(o, r).shift();
                n && ((c = n.sweep.position), (l = n.sweep.id));
              } else null !== e && this.engine.commandBinder.issueCommand(new _.aK());
              d = t ? Promise.resolve() : this.getCameraTransition(e, i, l, c);
              const u = this,
                m = C.Q.all([h, d]);
              return (
                this.engine.startGenerator(function* () {
                  let e = Date.now();
                  for (; u.floorsViewData.transition.progress.active; ) {
                    yield new O.Jj();
                    const t = Date.now(),
                      i = t - e;
                    u.floorsViewData.transition.progress.tick(i),
                      u.floorsViewData.commit(),
                      (e = t);
                  }
                  u.updateCurrentFloor(u.floorsViewData.transition.to), h.resolve();
                }),
                m
              );
            });
        }
        moveToFloorIndex(e, t = !1, i, s) {
          let o = null;
          if (e !== L.qE) {
            const t = this.floorsViewData.floors.getFloorAtIndex(e);
            if (!t) return C.Q.reject(new V.H(`Invalid floor index ${e}`));
            o = t.id;
          }
          return this.moveToFloor(o, t, i, s);
        }
        canMoveToFloor(e, t = !1) {
          if (!e) return !1;
          const i = this.floorsViewData.transition.progress.active,
            s = this.cameraData.canTransition() || t,
            o = e.index <= this.floorsViewData.totalFloors - 1,
            r = e.index >= -1;
          return !i && s && o && r;
        }
        getCameraTransition(e, t, i, s) {
          if (
            this.settingsData.tryGetProperty(z.eC, !1)
              ? this.viewmodeData.currentMode === v.Ey.Dollhouse &&
                !(0, N.Eb)(this.cameraData.pose.pitchFactor())
              : this.viewmodeData.currentMode === v.Ey.Dollhouse ||
                this.viewmodeData.currentMode === v.Ey.Floorplan
          ) {
            const i = this.getPoseForFloor(e, s);
            return this.cameraModule
              .moveTo({
                transitionType: k.nF.Interpolate,
                pose: i.pose,
                focalDistance: i.focalDistance,
                transitionTime: t,
                autoOrtho: this.cameraData.pose.autoOrtho,
              })
              .nativePromise();
          }
          return this.viewmodeData.isInside() && i
            ? this.engine.commandBinder.issueCommand(
                new A.ju({
                  transition: k.nF.MoveToBlack,
                  sweep: i,
                  transitionTime: this.MOVE_TO_BLACK_TRANSITION_TIME,
                }),
              )
            : Promise.resolve();
        }
        getPoseForFloor(e, t) {
          const i = this.cameraData.pose.fovCorrectedPosition(),
            s = this.cameraData.pose.rotation,
            o = e ? this.floorsData.getFloor(e) : null,
            r = o ? o.medianSweepHeight() : this.meshData.meshCenter.y,
            n = o ? o.center : this.meshData.meshCenter;
          n.setY(r);
          const a = F.fU.FORWARD.clone().applyQuaternion(s),
            h = i.clone();
          let l, d;
          if (t) {
            const e = i
                .clone()
                .addScaledVector(a, this.cameraData.pose.fovCorrectedFocalDistance()),
              s = new E.Vector3().set(0, i.y, 0),
              o = new E.Vector3().set(0, e.y, 0),
              n = s.distanceTo(o);
            h.setY(r + n);
            const c = e.clone().setY(t.y);
            (d = c.distanceTo(h)), this.viewmodeData.isDollhouse() && (l = (0, B.n0)(h, c));
          } else {
            const e = (o ? o.size.y : G) / 2 + G * -a.y;
            h.setY(r + e), (d = h.distanceTo(n));
          }
          return { focalDistance: d, pose: { position: h, rotation: l } };
        }
      }
      const G = 8;
      var j = i(60937),
        H = i(29765),
        Q = i(86743),
        Z = i(32197),
        W = i(43627);
      class K {
        constructor(e, t, i) {
          (this.floorsViewData = e),
            (this.viewmodeData = t),
            (this.pose = i),
            (this.vectors = { lookDir: new E.Vector3(), flattenedLookDir: new E.Vector3() }),
            (this.getAngleModifier = this.getAngleModifier.bind(this));
        }
        update() {
          const e = this.getAngleModifier(),
            t = 1 === this.floorsViewData.totalFloors,
            i = !!this.floorsViewData.nearestFloor,
            s = !this.viewmodeData.isInside() && !this.viewmodeData.transitionActive();
          (this.floorsViewData.roomSelectModeActive =
            s && (t || (i && e < 1) || this.viewmodeData.isFloorplan())),
            (this.floorsViewData.floorSelectModeActive = s && 1 === e && !t),
            (this.floorsViewData.showFloorSelection =
              !this.viewmodeData.transitionActive() &&
              (this.viewmodeData.isDollhouse() || this.viewmodeData.isFloorplan()) &&
              i &&
              !t),
            (this.floorsViewData.floorSelectable =
              this.viewmodeData.isDollhouse() || this.viewmodeData.isOrthographic());
        }
        getAngleModifier() {
          const e = this.vectors.lookDir.copy(F.fU.FORWARD).applyQuaternion(this.pose.rotation),
            t = this.vectors.flattenedLookDir.copy(e).setY(0),
            i = e.angleTo(t) * W.MN,
            s = x.xx.FADE_IN_START_ANGLE,
            o = x.xx.FADE_IN_END_ANGLE,
            r = 1 - (0, Z.dS)(i, s, o, 0, 1);
          return (0, Q.FG)(r, 0, 1, 1);
        }
      }
      var $ = i(61173),
        q = i(20348),
        Y = i(21676),
        J = i(97140),
        X = i(74094),
        ee = i(945),
        te = i(64150),
        ie = i(57983),
        se = i(87549),
        oe = i(9263);
      class re extends s.Y {
        constructor() {
          super(),
            (this.name = 'floors-viewdata'),
            (this.onEndMoveToSweepMessage = (e) => {
              const t = this.sweepData.getSweep(e.toSweep);
              (0, v.Bw)(this.viewmodeData.closestMode) && t && this.updateCurrentFloor(t.floorId);
            }),
            (this.onMoveToFloorIndexCommand = async (e) =>
              this.floorNavigation.moveToFloorIndex(
                e.floorIndex,
                e.suppressCameraMovement,
                e.transitionTime,
                e.focusPoint,
              )),
            (this.onShowAllFloorsCommand = async (e) => {
              const t = 'boolean' == typeof e.moveCamera && !e.moveCamera;
              await this.engine.commandBinder.issueCommand(new H.Vw(null, t));
            }),
            (this.onEnableAllFloorsOptionCommand = async () => {
              (this.floorsViewData.showAllFloorsOption = !0), this.floorsViewData.commit();
            }),
            (this.onDisableAllFloorsOptionCommand = async () => {
              this.floorsViewData.currentFloorIndex === L.qE &&
                (await this.floorNavigation.moveToFloorIndex(0, !0)),
                (this.floorsViewData.showAllFloorsOption = !1),
                this.floorsViewData.commit();
            }),
            (this.applicationChanged = () => {
              this.floorsViewData.updateViewData();
            }),
            (this.updateCurrentFloor = (e) => {
              this.config.allowFloorChanges &&
                this.floorsViewData.currentFloorId !== e &&
                (this.floorsViewData.transitionToFloorInstant(e),
                this.engine.broadcast(new m.P(e, this.floorsViewData.getFloorName(e))));
            }),
            (this.updateFloorSelectMode = () => {
              var e;
              null === (e = this.floorsSelectModeHelper) || void 0 === e || e.update();
            }),
            (this.floorSelectFeatureEnabledCheck = () => {
              const e = this.settingsData.tryGetProperty(ie.w, !0),
                t = this.settingsData.tryGetProperty(oe.gx.FloorSelect, !0),
                i = this.applicationData.application === w.Mx.WORKSHOP;
              this.toggleFloors(i || (e && t));
            }),
            (this.onMoveToFloorCommand = this.onMoveToFloorCommand.bind(this));
        }
        async init(e, t) {
          var i, s, r;
          (this.engine = t),
            (this.config = e),
            ([
              this.floorsData,
              this.settingsData,
              this.applicationData,
              this.sweepData,
              this.viewmodeData,
            ] = await Promise.all([
              t.market.waitForData(b.i),
              t.market.waitForData(te.e),
              t.market.waitForData(w.pu),
              t.market.waitForData(l.Z),
              t.market.waitForData(d.O),
            ]));
          const n = await t.getModuleBySymbol(o.e9),
            a = { floorChangesEnabled: () => this.config.allowFloorChanges };
          if (
            ((this.floorsViewData = new j.c(
              this.floorsData,
              this.viewmodeData,
              this.sweepData,
              this.applicationData,
              n.t.bind(n),
              a,
            )),
            this.floorSelectFeatureEnabledCheck(),
            t.market.register(this, j.c, this.floorsViewData),
            ([this.cameraData, this.input, this.raycasterData] = await Promise.all([
              t.market.waitForData(c.M),
              t.getModuleBySymbol(o.PZ),
              t.market.waitForData(y.P),
            ])),
            this.config.allowFloorChanges)
          ) {
            const e =
                null === (i = this.config.startingFloorsVisibility) || void 0 === i
                  ? void 0
                  : i.lastIndexOf(1),
              t = null === (s = this.floorsData.getFloorAtIndex(e)) || void 0 === s ? void 0 : s.id,
              o =
                null === (r = this.sweepData.currentSweepObject) || void 0 === r
                  ? void 0
                  : r.floorId,
              n = o || t || null;
            (o || t) &&
              (this.log.debug(`Set initial floor to ${n} from current pose`),
              this.updateCurrentFloor(n));
          }
          const [h, m, D] = await Promise.all([
            t.getModuleBySymbol(o.kg),
            t.market.waitForData(u._),
            t.getModuleBySymbol(o.Ve),
          ]);
          (this.floorNavigation = new U(
            t,
            this.floorsData,
            this.floorsViewData,
            this.sweepData,
            this.cameraData,
            h,
            this.viewmodeData,
            this.updateCurrentFloor,
            m,
            this.settingsData,
          )),
            (this.floorsSelectModeHelper = new K(
              this.floorsViewData,
              this.viewmodeData,
              this.cameraData.pose,
            ));
          const S = await t.getModuleBySymbol(o.hi),
            x = new T(
              this.floorsSelectModeHelper.getAngleModifier,
              this.floorsViewData,
              S,
              this.viewmodeData,
              this.raycasterData,
              this.cameraData,
              this.applicationData,
              (0, $.Jm)(),
              D,
            );
          t.addComponent(this, x),
            this.config.allowFloorChanges && this.registerFloorHoverCursorEffect(),
            this.bindings.push(
              this.registerKeys(),
              t.subscribe(M.bS, this.applicationChanged),
              this.floorsData.onChanged(this.floorsViewData.updateViewData),
              t.subscribe(p.Z, this.onEndMoveToSweepMessage),
              t.subscribe(
                g.Z,
                (function (e, t, i, s, o) {
                  const r = s.tryGetProperty(z.eC, !1);
                  let n = r;
                  return (s) => {
                    const a = e.tryGetData(f.k);
                    if (!a || (a && a.isTourActive())) return;
                    !(0, v.Bw)(s.toMode) ||
                      (r && o.phase !== w.nh.PLAYING) ||
                      (n = null !== i.currentFloorId);
                    const h = (0, v.Bw)(s.fromMode),
                      l = s.toMode === v.Ey.Floorplan,
                      d = s.toMode === v.Ey.Dollhouse;
                    if (!h || (!d && !l)) return;
                    const c = n || l ? i.currentFloorId : null;
                    t(new H.Vw(c, !0, 0));
                  };
                })(
                  t.market,
                  t.commandBinder.issueCommand,
                  this.floorsViewData,
                  this.settingsData,
                  this.applicationData,
                ),
              ),
              t.commandBinder.addBinding(H.Vw, this.onMoveToFloorCommand),
              t.commandBinder.addBinding(H.h9, this.onMoveToFloorIndexCommand),
              t.commandBinder.addBinding(H.EU, this.onShowAllFloorsCommand),
              t.commandBinder.addBinding(H.LW, this.onEnableAllFloorsOptionCommand),
              t.commandBinder.addBinding(H.tR, this.onDisableAllFloorsOptionCommand),
              t.subscribe(se.Z, this.updateFloorSelectMode),
              this.cameraData.pose.onChanged(this.updateFloorSelectMode),
              this.floorsViewData.onChanged(this.updateFloorSelectMode),
              this.settingsData.onPropertyChanged(ie.w, this.floorSelectFeatureEnabledCheck),
              this.settingsData.onPropertyChanged(
                oe.gx.FloorSelect,
                this.floorSelectFeatureEnabledCheck,
              ),
              this.applicationData.onPropertyChanged(
                'application',
                this.floorSelectFeatureEnabledCheck,
              ),
            ),
            this.updateFloorSelectMode(),
            this.sweepData.currentSweepObject &&
              this.updateCurrentFloor(this.sweepData.currentSweepObject.floorId);
        }
        onUpdate() {}
        async onMoveToFloorCommand(e) {
          return this.floorNavigation
            .moveToFloor(e.floorId, e.suppressCameraMovement, e.transitionTime, e.focusPoint)
            .nativePromise();
        }
        toggleFloors(e) {
          e || null === this.floorsViewData.currentFloorId || this.updateCurrentFloor(null),
            (this.config.allowFloorChanges = e),
            this.updateFloorSelectMode();
        }
        registerKeys() {
          return this.input.registerHandler(r.e, async (e) => {
            if (!this.cameraData.canTransition()) return;
            const t = e.modifiers.shiftKey;
            if (e.state === h.M.PRESSED)
              switch (e.key) {
                case a.R.UPARROW:
                  t && this.floorNavigation.moveFloorUp();
                  break;
                case a.R.DOWNARROW:
                  t && this.floorNavigation.moveFloorDown();
                  break;
                case a.R.R:
                  this.floorNavigation.moveFloorUp();
                  break;
                case a.R.F:
                  this.floorNavigation.moveFloorDown();
                  break;
                case a.R.Y:
                  this.floorNavigation.moveToFloor(null);
              }
          });
        }
        registerFloorHoverCursorEffect() {
          const e = Y.s.is(
              (e) => J.$4.isRoomMesh(e) && e.raycastEnabled && this.floorsViewData.floorSelectable,
            ),
            t = new q.V(
              this.input.registerMeshHandler(n.z, e, (e) => {
                this.engine.commandBinder.issueCommand(new X.u(ee.C.FINGER));
              }),
              this.input.registerMeshHandler(n.A, e, (e) => {
                this.engine.commandBinder.issueCommand(new X.u(ee.C.DEFAULT));
              }),
            );
          t.cancel();
          const i = (() => {
            let e = !1;
            return () => {
              const i = this.floorsViewData.floorSelectHoverEnabled;
              i !== e &&
                ((e = i),
                e
                  ? t.renew()
                  : (t.cancel(), this.engine.commandBinder.issueCommand(new X.u(ee.C.DEFAULT))));
            };
          })();
          i();
          const s = () => {
              (this.floorsViewData.floorSelectHoverEnabled = !1), i();
            },
            o = () => {
              (this.floorsViewData.floorSelectHoverEnabled = !0), i();
            };
          this.bindings.push(
            this.viewmodeData.onChanged(i),
            this.floorsViewData.onFloorSelectModeChange(i),
            this.floorsViewData.makeFloorChangeSubscription(i),
            this.engine.commandBinder.addBinding(H.TS, async () => s()),
            this.engine.commandBinder.addBinding(H.Md, async () => o()),
            t,
          );
        }
      }
    },
    18808: (e, t, i) => {
      'use strict';
      i.d(t, { p: () => o });
      var s = i(20470);
      function o(e) {
        return e.width <= s.MN;
      }
    },
    50084: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => u });
      var s = i(933),
        o = i(4763),
        r = i(59228),
        n = i(900),
        a = i(31971),
        h = i(55574),
        l = i(30850),
        d = i(3999),
        c = i(61173);
      class u extends s.Y {
        constructor() {
          super(...arguments),
            (this.name = 'interactionmode'),
            (this.onPointerButtonEvent = (e) => {
              let t = this.data.source;
              switch (e.device) {
                case n._.TOUCH:
                  t = l.f.Touch;
                  break;
                case n._.MOUSE:
                  t = l.f.Mouse;
                  break;
                case n._.PEN:
                  t = l.f.Pen;
                  break;
                case n._.GAMEPAD:
                  this.renderer.xr.enabled &&
                    this.renderer.xr.isPresenting &&
                    (t = l.f.XRController);
                  break;
                default:
                  this.log.debug('source:', e.device, e);
              }
              this.updateSource(t);
            }),
            (this.onKeyEvent = () => {
              this.updateSource(l.f.Key);
            });
        }
        async init(e, t) {
          (this.engine = t), (this.data = new h.Z()), (this.mobileBrowser = (0, c.tq)());
          const i = await t.getModuleBySymbol(o.Aj);
          (this.renderer = i.threeRenderer),
            this.updateMode(this.getInteractionMode(), this.data.mode),
            this.engine.market.register(this, h.Z, this.data),
            t.getModuleBySymbol(o.PZ).then((e) => {
              this.bindings.push(
                e.registerHandler(r.er, this.onPointerButtonEvent),
                e.registerHandler(a.e, this.onKeyEvent),
              );
            });
        }
        onUpdate(e) {
          const t = this.getInteractionMode();
          this.updateMode(t, this.data.mode);
        }
        getInteractionMode() {
          if (this.renderer.xr.enabled && this.renderer.xr.isPresenting) {
            const e = this.renderer.xr.getSession();
            if (null !== e && e.inputSources.length > 0)
              switch (e.inputSources[0].targetRayMode) {
                case 'gaze':
                case 'screen':
                  return l.s.VrOrientOnly;
                case 'tracked-pointer':
                  return l.s.VrWithTrackedController;
              }
            return l.s.VrOrientOnly;
          }
          return this.mobileBrowser ? l.s.Mobile : l.s.Desktop;
        }
        updateMode(e, t) {
          e !== this.data.mode &&
            (this.data.updateMode(e),
            this.data.commit(),
            this.engine.broadcast(new d.m(this.data.mode, t)));
        }
        updateSource(e) {
          e !== this.data.source &&
            (this.data.updateSource(e),
            this.data.commit(),
            this.engine.broadcast(new d.a(this.data.source)));
        }
      }
    },
    36538: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => d });
      var s = i(933),
        o = i(4763),
        r = i(17295),
        n = i(67108),
        a = i(31740),
        h = i(35922),
        l = i(10637);
      class d extends s.Y {
        constructor() {
          super(...arguments), (this.name = 'mesh-api-data-fixups');
        }
        async init(e, t) {
          const { market: i } = t;
          ([this.floorData, this.sweepData, this.meshData, this.meshQuery, this.analytics] =
            await Promise.all([
              i.waitForData(r.i),
              i.waitForData(a.Z),
              i.waitForData(n._),
              t.getModuleBySymbol(o.hi),
              t.getModuleBySymbol(o.V6),
            ])),
            this.assignSweepToFloors(),
            this.assignBoundingBoxesToFloors(),
            this.assignMissingSweepFloors(),
            this.registerRoomAssociationSource(t);
        }
        assignBoundingBoxesToFloors() {
          const e = this.meshData.meshGroups.floors;
          this.floorData.iterate((t, i) => {
            const s = e.get(t.meshGroup);
            s && (t.setBounds(s.boundingBox), t.setCenterOfMass(s.centerOfMass));
          }),
            this.floorData.commit();
        }
        assignMissingSweepFloors() {
          let e = 0;
          try {
            this.sweepData.getSweepList().forEach((t) => {
              var i;
              if (t.isUnplaced()) return;
              let s;
              if (null === t.floorId || !this.floorData.hasFloor(t.floorId)) {
                const o = this.meshQuery.floorIdFromObject(
                  null === (i = this.meshQuery.nearestMeshInfo(t.position)) || void 0 === i
                    ? void 0
                    : i.object,
                );
                o && this.floorData.hasFloor(o) && (s = this.floorData.getFloor(o)),
                  (null == s ? void 0 : s.id) &&
                    s.id !== t.floorId &&
                    (this.log.debug(
                      `Setting ${t.alignmentType} sweep ${t.id} from floor ${t.floorId} to ${s.id}`,
                    ),
                    (t.floorId = s.id),
                    t.commit(),
                    e++);
              }
            });
          } finally {
            0 !== e &&
              this.analytics.track('mesh_api_data_fixup_sweeps_assigned', {
                missing_floor_count: e,
              });
          }
        }
        assignSweepToFloors() {
          this.sweepData.getSweepList().forEach((e) => {
            var t;
            if (!e.isUnplaced() && e.isAligned()) {
              let i;
              if (e.floorId && this.floorData.hasFloor(e.floorId))
                i = this.floorData.getFloor(e.floorId);
              else {
                const s = this.meshQuery.floorIdFromObject(
                  null === (t = this.meshQuery.nearestMeshInfo(e.position)) || void 0 === t
                    ? void 0
                    : t.object,
                );
                s && this.floorData.hasFloor(s) && (i = this.floorData.getFloor(s));
              }
              i && i.addSweep(e.position, e.floorPosition);
            }
          }),
            this.floorData.commit();
        }
        registerRoomAssociationSource(e) {
          const t = this.sweepData;
          e.commandBinder.issueCommandWhenBound(
            new h.I({
              type: 'locations',
              getPositionId: function* () {
                for (const e of t.sweeps())
                  yield {
                    id: e.id,
                    roomId: e.roomId || void 0,
                    floorId: e.floorId || void 0,
                    position: e.position,
                    layerId: l.gi,
                  };
              },
              updateRoomForId: (e, i) => {
                const s = t.getSweep(e);
                if (!s) throw new Error('Invalid sweep id!');
                (s.roomId = i || null), s.commit();
              },
            }),
          );
        }
      }
    },
    69868: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => m });
      var s = i(933),
        o = i(4763),
        r = i(62770),
        n = i(17295);
      const a = (...e) =>
        function (t) {
          return e.every((e) => e(t));
        };
      var h = i(97140),
        l = i(81396),
        d = i(69161),
        c = i(22925),
        u = i(53015);
      class m extends s.Y {
        constructor() {
          super(...arguments), (this.name = 'mesh-query'), (this.roomBoundData = null);
        }
        async init(e, t) {
          const { market: i } = t;
          ([this.raycaster, this.floorData, this.roomData, this.layersData] = await Promise.all([
            t.getModuleBySymbol(o.fQ),
            i.waitForData(n.i),
            i.waitForData(r.Z),
            i.waitForData(c.R),
          ])),
            i.waitForData(d.Z).then((e) => (this.roomBoundData = e));
        }
        nearestMeshInfoOnFloor(e, t) {
          const i = a(h.$4.isRoomMesh, this.matchesFloorId(t));
          return this.raycaster.picking.nearest(new l.Vector3().set(e.x, e.y, e.z), i);
        }
        nearestMeshInfo(e) {
          return this.raycaster.picking.nearest(
            new l.Vector3().set(e.x, e.y, e.z),
            h.$4.isRoomMesh,
          );
        }
        inferMeshIdsFromPoint(e, t, i = !0) {
          const s = i && (0, u.O)(this.roomBoundData, this.layersData, e.layerId),
            o = !!this.roomBoundData && this.roomBoundData.hasRooms() && s;
          let r = !s || !e.roomId || !this.roomData.get(e.roomId);
          const n = !e.floorId || !this.floorData.hasFloor(e.floorId);
          if (!n && r && o && this.roomBoundData) {
            const i = this.roomBoundData.findRoomIdForPosition(t, e.floorId);
            i && ((e.roomId = i), (r = !1));
          }
          if (r || n) {
            const i = n ? h.$4.isRoomMesh : a(h.$4.isRoomMesh, this.matchesFloorId(e.floorId)),
              s = this.raycaster.picking.nearest(new l.Vector3().set(t.x, t.y, t.z), i);
            let d;
            if (this.roomBoundData && this.roomBoundData.hasRooms()) {
              if (s) {
                const e = s.object.meshGroup;
                if (void 0 !== e) {
                  const i = this.floorData.getFloorByMeshGroup(e);
                  i &&
                    (d = {
                      floorId: i.id,
                      roomId: (o && this.roomBoundData.findRoomIdForPosition(t, i.id)) || void 0,
                    });
                }
              }
            } else d = s && this.roomIdFloorIdFromObject(s.object);
            if (d) {
              const { roomId: t, floorId: i } = d;
              this.log.debug(
                'data-fixup:',
                r ? { roomId: t, prev: e.roomId } : '',
                n ? { floorId: i, prev: e.floorId } : '',
                { data: e },
              ),
                r && (e.roomId = t),
                n && (e.floorId = i);
            } else
              this.log.warn('Nearest Room/Floor not found for:', {
                point: t,
                data: e,
                invalidRoomId: r,
                invalidFloorId: n,
              });
          }
          return e;
        }
        roomIdFloorIdFromObject(e) {
          if (!h.$4.hasMeshGroup(e)) return;
          const t = this.floorData.getFloorByMeshGroup(e.meshGroup);
          if (void 0 === t) return;
          const i =
            (0, u.O)(this.roomBoundData, this.layersData, null) && h.$4.hasMeshSubgroup(e)
              ? this.roomData.getByMeshSubgroup(e.meshSubgroup)
              : void 0;
          return { floorId: t.id, roomId: null == i ? void 0 : i.id };
        }
        floorIdFromObject(e) {
          if (h.$4.hasMeshGroup(e)) {
            const t = this.floorData.getFloorByMeshGroup(e.meshGroup);
            return null == t ? void 0 : t.id;
          }
        }
        mdsRoomIdFromObject(e) {
          if (
            !(0, u.O)(this.roomBoundData, this.layersData, null) ||
            !h.$4.hasMeshSubgroup(e) ||
            !h.$4.hasMeshGroup(e)
          )
            return;
          const t = this.roomData.getByMeshSubgroup(e.meshSubgroup);
          if (!t) return;
          const i = this.floorData.getFloorByMeshGroup(e.meshGroup);
          return t.floorId === (null == i ? void 0 : i.id) ? t.id : void 0;
        }
        mdsFloorIdFromObject(e) {
          if (!h.$4.hasMeshGroup(e)) return;
          const t = this.floorData.getFloorByMeshGroup(e.meshGroup);
          return t ? t.id : void 0;
        }
        matchesFloorId(e) {
          return (t) => {
            const i = this.roomIdFloorIdFromObject(t);
            return (null == i ? void 0 : i.floorId) === e;
          };
        }
      }
    },
    46362: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => V });
      var s = i(933),
        o = i(83069),
        r = i(4218),
        n = i(68661),
        a = i(1795),
        h = i(45995),
        l = i(23355),
        d = i(7321),
        c = i(4763),
        u = i(29518);
      class m {
        constructor(e) {
          this.config = e;
        }
        serialize(e) {
          const { serializer: t } = this.config;
          if (!e || !t) return null;
          const i = {};
          for (const s in e) {
            const o = t.serialize(e[s]);
            o && (i[s] = o);
          }
          return i;
        }
        deserialize(e) {
          const { deserializer: t } = this.config;
          if (!e || !t) return {};
          const i = {};
          for (const s in e) {
            const o = t.deserialize(e[s]);
            o && (i[s] = o);
          }
          return i;
        }
      }
      var p = i(43606),
        g = i(32197),
        y = i(38256),
        v = i(81396),
        f = i(64831),
        w = i(28721);
      const M = new v.Vector3();
      class b extends f.T {
        constructor(e, t, i, s, o, r, n = new Date(), a = new Date(), h, l, d, c) {
          super(),
            (this.position = e),
            (this.scale = t),
            (this.rotation = i),
            (this.enabled = o),
            (this.meshGroup = r),
            (this.created = n),
            (this.modified = a),
            (this.discardContents = !0),
            (this.activeInPanoMode = !0),
            (this._rotationMatrix = new v.Matrix4()),
            (this._matrix = new v.Matrix4()),
            (this.id = h || `${this.meshGroup}` + (0, w.O1)(11)),
            (this.index = s),
            (this.name = l),
            (this.discardContents = void 0 === d || d),
            (this.activeInPanoMode = void 0 === c || c);
        }
        get sid() {
          return this.id;
        }
        isPointTrimmed(e, t) {
          return (
            !!this.enabled &&
            !(t && !this.activeInPanoMode) &&
            (this.discardContents ? this.isPointInside(e) : !this.isPointInside(e))
          );
        }
        isPointInside(e) {
          this._matrix.compose(this.position, this.rotation, this.scale), this._matrix.invert();
          const t = M.copy(e).applyMatrix4(this._matrix);
          return t.x < 0.5 && t.x > -0.5 && t.y < 0.5 && t.y > -0.5 && t.z < 0.5 && t.z > -0.5;
        }
        updateRotationMatrix() {
          const e = this.rotation,
            t = this.rotation.clone().set(e.x, e.y, e.z, -e.w);
          this._rotationMatrix.makeRotationFromQuaternion(t.normalize());
        }
        get rotationMatrix() {
          return this.updateRotationMatrix(), this._rotationMatrix;
        }
      }
      var D = i(53257),
        S = i(33382);
      const x = new D.Z('JsonStoreMeshTrimDeserializer'),
        T = [
          { path: ['position', 'x'], type: 'number' },
          { path: ['position', 'y'], type: 'number' },
          { path: ['position', 'z'], type: 'number' },
          { path: ['scale', 'x'], type: 'number' },
          { path: ['scale', 'y'], type: 'number' },
          { path: ['scale', 'z'], type: 'number' },
          { path: ['rotation', 'x'], type: 'number' },
          { path: ['rotation', 'y'], type: 'number' },
          { path: ['rotation', 'z'], type: 'number' },
          { path: ['rotation', 'w'], type: 'number' },
          { path: ['index'], type: 'number' },
          { path: ['enabled'], type: 'boolean' },
          { path: ['meshGroup'], type: 'number' },
          { path: ['id'], type: 'string' },
          { path: ['created'], type: 'string' },
          { path: ['modified'], type: 'string' },
        ];
      class C {
        constructor() {
          this.deserialize = (e) => {
            if (!this.isValid(e))
              return x.debug('Unable to deserialize invalid mesh trim data', e), null;
            const {
              position: t,
              scale: i,
              rotation: s,
              index: o,
              enabled: r,
              meshGroup: n,
              created: a,
              modified: h,
              id: l,
              name: d,
              discardContents: c,
              activeInPanoMode: u,
            } = e;
            return new b(
              g.ep.fromVisionVector(t),
              g.ep.fromVisionVector(i),
              g.ep.fromVisionQuaternion(s),
              o,
              r,
              n,
              (0, y.p)(a),
              (0, y.p)(h),
              l,
              d,
              c,
              u,
            );
          };
        }
        isValid(e) {
          if (!e || 'object' != typeof e) return !1;
          const t = e;
          return (
            (0, S.r)(t.meshGroup) || (t.meshGroup = t.floorIndex),
            T.every((t) => this.hasRequiredField(e, t))
          );
        }
        hasRequiredField(e, t) {
          try {
            return (
              typeof t.path.reduce((i, s) => {
                if ('object' == typeof i && null !== i) return i[s];
                throw new Error(
                  `data ${JSON.stringify(e)} must be addressable by ${t.path.join('.')} with a value of type ${t.type}`,
                );
              }, e) === t.type
            );
          } catch (e) {
            return x.debug(e), !1;
          }
        }
      }
      var P = i(16385);
      class O {
        serialize(e) {
          if (!e) return null;
          const {
            position: t,
            scale: i,
            rotation: s,
            index: o,
            enabled: r,
            meshGroup: n,
            created: a,
            modified: h,
            id: l,
            name: d,
            discardContents: c,
            activeInPanoMode: u,
          } = e;
          return {
            position: (0, P.m)(g.ep.toVisionVector(t)),
            scale: (0, P.m)(g.ep.toVisionVector(i)),
            rotation: (0, P.J5)(g.ep.toVisionQuaternion(s)),
            index: o,
            enabled: r,
            meshGroup: n,
            created: (0, y.U)(a),
            modified: (0, y.U)(h),
            id: l,
            name: d,
            discardContents: c,
            activeInPanoMode: u,
          };
        }
      }
      class k extends p.MU {
        constructor(e, t, i) {
          const s = new C(),
            o = new O(),
            r = new m({ deserializer: s, serializer: o });
          super({
            queue: e,
            path: `${t}/api/v1/jsonstore/model/trims/${i}`,
            batchUpdate: !0,
            deserialize: (e) => r.deserialize(e),
            serialize: (e) => r.serialize(e),
          });
        }
      }
      var A = i(56063);
      class E extends A.m {
        constructor(e) {
          super(), (this.payload = e);
        }
      }
      E.id = 'CREATE_MESH_TRIM';
      class F extends A.m {
        constructor(e) {
          super(), (this.payload = e);
        }
      }
      F.id = 'DELETE_MESH_TRIM';
      class B extends A.m {
        constructor(e) {
          super(), (this.payload = e);
        }
      }
      B.id = 'MOVE_MESH_TRIM_ALL_FLOORS';
      var I = i(93827);
      const { TRIM: R } = d.Z.WORKSHOP;
      class V extends s.Y {
        constructor() {
          super(...arguments),
            (this.name = 'trim-data'),
            (this.dataLoadedPromise = new I.Q()),
            (this.load = async () => {
              let e = {};
              try {
                e = (await this.store.read()) || {};
              } catch (e) {
                this.log.debug('error when reading from json storage'), this.log.debug(e);
              }
              try {
                const t = Object.values(e);
                this.modelMeshModule.meshTrimData.addMeshGroups(t.map((e) => e.meshGroup)),
                  this.modelMeshModule.meshTrimData.add(...t);
              } catch (e) {
                this.log.debug('error when adding trims from json storage'), this.log.debug(e);
              }
              this.monitor && this.monitor.removeOnChanged(this.onMeshTrimsChanged),
                (this.monitor = new r.c(this.modelMeshModule.meshTrimData.meshTrimsById, {
                  aggregationType: o.E.Immediate,
                })),
                this.monitor.onChanged(this.onMeshTrimsChanged),
                this.dataLoadedPromise.resolve();
            }),
            (this.createMeshTrim = async (e) => {
              try {
                this.modelMeshModule.meshTrimData.add(e);
              } catch (e) {
                if (e instanceof u.M) {
                  const e = R.MAX_TRIMS_ERROR_MESSAGE;
                  this.engine.commandBinder.issueCommand(
                    new h.I(e, { throttle: 0, type: a.N.ERROR }),
                  );
                }
              }
            }),
            (this.deleteMeshTrim = async (e) => {
              this.modelMeshModule.meshTrimData.delete(e);
            }),
            (this.save = async () => {
              const e = this.monitor.getDiffRecord();
              if ((this.monitor.clearDiffRecord(), !e.length)) return;
              const t = {};
              for (const i of e)
                switch (i.action) {
                  case n.KI.added:
                  case n.KI.updated:
                    t[i.index] = this.modelMeshModule.meshTrimData.getTrimById(i.index);
                    break;
                  case n.KI.removed:
                    t[i.index] = null;
                }
              try {
                await this.store.update(t);
              } catch (e) {
                this.log.debug('error when writing to json storage'), this.log.debug(e);
                const t = R.UNABLE_TO_SAVE_CHANGES_ERROR_MESSAGE;
                this.engine.commandBinder.issueCommand(
                  new h.I(t, { throttle: 30, type: a.N.ERROR }),
                );
              }
            }),
            (this.moveMeshTrimToAllFloors = async (e) => {
              const t = e.enabled;
              this.deleteMeshTrim(e), (e.meshGroup = -1), (e.enabled = t), this.createMeshTrim(e);
            }),
            (this.onMeshTrimsChanged = (0, l.P)(this.save, 1e3));
        }
        get waitForData() {
          return this.dataLoadedPromise.nativePromise();
        }
        async init(e, t) {
          (this.engine = t),
            (this.store = new k(e.queue, e.baseUrl, e.baseModelId)),
            (this.modelMeshModule = await t.getModuleBySymbol(c.Ve)),
            this.load(),
            this.bindings.push(
              t.commandBinder.addBinding(E, this.createMeshTrim),
              t.commandBinder.addBinding(F, this.deleteMeshTrim),
              t.commandBinder.addBinding(B, this.moveMeshTrimToAllFloors),
            );
        }
      }
    },
    7230: (e, t, i) => {
      'use strict';
      var s;
      i.d(t, { S: () => s }),
        (function (e) {
          (e[(e.Standard = 0)] = 'Standard'),
            (e[(e.Depth = 1)] = 'Depth'),
            (e[(e.Transparent = 2)] = 'Transparent'),
            (e[(e.Wireframe = 3)] = 'Wireframe'),
            (e[(e.UV = 4)] = 'UV');
        })(s || (s = {}));
    },
    53729: (e, t, i) => {
      'use strict';
      i.d(t, { F: () => n });
      var s = i(72803),
        o = i(81396),
        r = i(56620);
      class n extends o.Mesh {
        constructor(e) {
          super(),
            (this.roomMesh = e),
            (this.excludeFromOctree = !0),
            (this.layers.mask = e.layers.mask),
            (this.name = `DepthPassRoomMesh:${e.meshGroup}-${e.meshSubgroup}`),
            (this.renderOrder = s.z.ghostFloorDepthPrepass),
            (this.visible = !1),
            (this.roomMesh.onOpacityUpdate = (e) => {
              this.visible = e < r.xx.FADE_OPAQUE;
            }),
            (this.roomMesh.onBuild = () => {
              (this.geometry = this.roomMesh.geometry), (this.material = this.roomMesh.material);
            }),
            (this.roomMesh.onMaterialUpdate = () => {
              this.material = this.roomMesh.material;
            });
          let t = !0,
            i = !0;
          (this.onBeforeRender = (e, s, o, r, n, a) => {
            this.roomMesh.updateUniforms(n, a),
              (t = n.colorWrite),
              (i = n.depthWrite),
              (n.colorWrite = !1),
              (n.depthWrite = !0);
          }),
            (this.onAfterRender = (e, s, o, r, n, a) => {
              (n.colorWrite = t), (n.depthWrite = i);
            });
        }
      }
    },
    76871: (e, t, i) => {
      'use strict';
      i.d(t, { e: () => r });
      var s = i(81396),
        o = i(59491);
      class r extends s.Object3D {
        constructor() {
          super(...arguments),
            (this.boundingBox = new s.Box3()),
            (this.size = new s.Vector3()),
            (this.center = new s.Vector3()),
            (this._detail = 'default'),
            (this._chunks = []),
            (this.onChunksLoaded = new Set());
        }
        get detail() {
          return this._detail;
        }
        get chunks() {
          return this._chunks;
        }
        get visibleChunks() {
          return this._chunks;
        }
        notifyOnChunksLoaded(e) {
          return (0, o.k1)(
            () => this.onChunksLoaded.add(e),
            () => this.onChunksLoaded.delete(e),
            !0,
          );
        }
        dispose() {
          for (const e of this._chunks) e.dispose();
          this._chunks.length = 0;
        }
        overrideMaxDetail(e) {}
      }
    },
    63592: (e, t, i) => {
      'use strict';
      i.d(t, { s: () => o });
      var s = i(42141);
      class o extends s.V {
        constructor() {
          super(),
            (this.name = 'room-mesh-data'),
            (this.floors = new Set()),
            (this.rooms = new Set());
        }
      }
    },
    41946: (e, t, i) => {
      'use strict';
      i.d(t, { n: () => o });
      var s = i(56063);
      class o extends s.m {
        constructor(e, t, i) {
          super(), (this.payload = { enabled: e, previewCirclePosition: t, size: i });
        }
      }
      o.id = 'MESH_PREVIEW_POSITION';
    },
    16419: (e, t, i) => {
      'use strict';
      i.d(t, { U: () => r });
      var s = i(56063),
        o = i(7230);
      class r extends s.m {
        constructor(e) {
          super(), (this.payload = { mode: e });
        }
      }
      (r.modes = o.S), (r.id = 'SET_CHUNK_RENDER_MODE');
    },
    52763: (e, t, i) => {
      'use strict';
      i.d(t, { u: () => n });
      var s,
        o,
        r = i(56063);
      !(function (e) {
        (e.all = 'all'), (e.byMeshGroup = 'byMeshGroup'), (e.byMeshSubGroup = 'byMeshSubGroup');
      })(s || (s = {})),
        (function (e) {
          (e.explicit = 'explicit'), (e.random = 'random');
        })(o || (o = {}));
      class n extends r.m {
        constructor(e, t) {
          super(),
            (this.payload = {
              selectBy: (null == t ? void 0 : t.style) || s.all,
              colorStyle: (null == e ? void 0 : e.style) || o.explicit,
              color: (null == e ? void 0 : e.color) || null,
              alpha: (null == e ? void 0 : e.alpha) || 0.5,
              index: null == t ? void 0 : t.index,
            });
        }
      }
      (n.id = 'SET_MESH_OVERLAY_COLOR'),
        (n.selectBy = s),
        (n.colorBy = o),
        (n.COLOR_DIM = { x: 0, y: 0, z: 0, w: 0.3 });
    },
    13512: (e, t, i) => {
      'use strict';
      var s;
      i.d(t, { k: () => s }),
        (function (e) {
          (e.Mesh = 'mesh'),
            (e.PanoramaMesh = 'mesh.inside'),
            (e.PanoramaCube = 'cubemap.inside'),
            (e.Hidden = 'mesh.hidden');
        })(s || (s = {}));
    },
    42180: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => He });
      var s = i(81396),
        o = i(933),
        r = i(93827),
        n = i(34608),
        a = i(4763),
        h = i(3835),
        l = i(86743),
        d = i(61173),
        c = i(7721),
        u = i(29956),
        m = i(42896),
        p = i(85726),
        g = i(63926),
        y = i(57793),
        v = i(31740),
        f = i(59822),
        w = i(35557),
        M = i(90512),
        b = i(43017),
        D = i(33320);
      let S = !1;
      var x = i(41946),
        T = i(16419),
        C = i(52763),
        P = i(56063);
      class O extends P.m {
        constructor(e, t, i) {
          super(), (this.payload = { sweepId: e, texture: t, quaternion: i });
        }
      }
      O.id = 'SET_PANO_OVERLAY';
      class k extends P.m {
        constructor(e) {
          super(), (this.payload = { enabled: e });
        }
      }
      k.id = 'TOGGLE_MESH_OVERLAY_COLOR';
      var A = i(13512),
        E = i(81378),
        F = i(67108),
        B = i(28730);
      class I {
        constructor(e) {
          (this.floorUniforms = {}), (this.sharedFloorUniforms = {}), (this.isPanoMode = e);
        }
        getSharedFloorUniforms(e) {
          return (
            void 0 === this.sharedFloorUniforms[`${e}`] &&
              ((this.sharedFloorUniforms[`${e}`] = this.getEmptyCacheUniforms()),
              this.floorUniforms[`${e}`]
                ? this.updateSharedFloorUniforms(e)
                : this.updateMeshTrimArrays(e, [])),
            this.sharedFloorUniforms[`${e}`]
          );
        }
        updateMeshTrimArrays(e, t) {
          const i = [],
            o = [];
          let r = !1;
          t.forEach((e) => {
            i.push(this.computeTrimMatrixFromTrim(e, new s.Matrix4())),
              o.push(e.discardContents),
              r || (r = e.enabled && !e.discardContents);
          }),
            this.setFloorUniforms(e, {
              meshTrimMatrices: i,
              meshTrimsDiscardContents: o,
              hasKeepVolume: r,
            });
          '-1' == `${e}`
            ? Object.keys(this.sharedFloorUniforms).forEach((e) => {
                this.updateSharedFloorUniforms(e);
              })
            : this.updateSharedFloorUniforms(e);
        }
        computeTrimMatrixFromTrim(e, t = new s.Matrix4()) {
          return (
            e.enabled && (!this.isPanoMode || (this.isPanoMode && e.activeInPanoMode))
              ? (t.compose(e.position, e.rotation, e.scale), t.invert())
              : t.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
            t
          );
        }
        updateSharedFloorUniforms(e) {
          const t = this.getSharedFloorUniforms(e),
            i = '-1' != `${e}` ? this.getFloorUniforms(e) : this.getEmptyCacheUniforms(),
            o = this.getFloorUniforms(-1),
            r = new s.Matrix4();
          r.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
            this.concatUniformArrays(t.meshTrimMatrices, o.meshTrimMatrices, i.meshTrimMatrices, r),
            this.concatUniformArrays(
              t.meshTrimsDiscardContents,
              o.meshTrimsDiscardContents,
              i.meshTrimsDiscardContents,
              !0,
            ),
            (t.hasKeepVolume = o.hasKeepVolume || i.hasKeepVolume),
            (this.sharedFloorUniforms[`${e}`] = t);
        }
        concatUniformArrays(e, t, i, s) {
          const o = t.concat(i).slice(0, B.t);
          for (let e = o.length; e < B.t; e++) o.push(s);
          return (e.length = 0), e.push(...o), e;
        }
        getFloorUniforms(e) {
          return this.floorUniforms[`${e}`] || this.getEmptyCacheUniforms();
        }
        setFloorUniforms(e, t) {
          this.floorUniforms[`${e}`] = t;
        }
        getEmptyCacheUniforms() {
          return { meshTrimMatrices: [], meshTrimsDiscardContents: [], hasKeepVolume: !1 };
        }
      }
      var R = i(5429),
        V = i(24938),
        _ = i(64150),
        L = i(7230),
        N = i(72803),
        z = i(65302),
        U = i(97001);
      class G extends U.b {
        constructor(e, t, i, s) {
          const o = {};
          for (const e of t) o[e] = !0;
          super({
            extensions: { derivatives: !0 },
            fragmentShader: B.Z.modelChunk.fragmentShader,
            vertexShader: B.Z.modelChunk.vertexShader,
            uniforms: i,
            name: e,
            defines: o,
          }),
            (this.getSide = s),
            (this.capabilities = t);
        }
        get side() {
          return this.getSide();
        }
        set side(e) {}
      }
      var j = i(37332),
        H = i(51784),
        Q = i(28721),
        Z = i(56620),
        W = i(59491);
      function K(e, t) {
        if (null == t) return t;
        if (t.isVector3 || t.isVector4 || t.isMatrix3 || t.isMatrix4 || t.isColor)
          return null != e ? (e.copy(t), e) : t.clone();
        if (Array.isArray(t) && (Array.isArray(e) || null == e)) {
          null == e && (e = []);
          const i = 0 === e.length;
          let s = e.length === t.length;
          for (let o = 0; o < t.length; o++) {
            s = s || void 0 === e[o] || e[o] !== t[o];
            const r = K(i ? void 0 : e[o], t[o]);
            i ? e.push(r) : s && (e[o] = r);
          }
          return e;
        }
        return t;
      }
      let $,
        q = 1;
      try {
        $ = (0, H.k7)(0, 0);
      } catch (e) {}
      const Y = 5 + B.t,
        J = [
          {
            key: j.h.PanoTextureTransition,
            enabled: function (e) {
              return (
                e.progress.value > 0 &&
                e.progress.value < 1 &&
                e.pano0Map.value !== e.pano1Map.value
              );
            },
            dependsOn: [j.h.PanoTexture],
            uniformsUsed: ['progress', 'pano0Map', 'pano1Map'],
          },
          {
            key: j.h.PanoTexture,
            enabled: function (e) {
              return e.panoOpacity.value > 0;
            },
            dependsOn: [],
            uniformsUsed: ['panoOpacity'],
          },
          {
            key: j.h.ColorOverlay,
            enabled: function (e) {
              return null !== e.colorOverlay.value;
            },
            dependsOn: [],
            uniformsUsed: ['colorOverlay'],
          },
          {
            key: j.h.MeshPreviewSphere,
            enabled: function (e) {
              return null !== e.meshPreviewCenter.value;
            },
            dependsOn: [j.h.MeshTexture],
            uniformsUsed: [],
          },
          {
            key: j.h.MeshTexture,
            enabled: function (e) {
              return e.meshOpacity.value > 0 && e.map.value;
            },
            dependsOn: [],
            uniformsUsed: ['meshOpacity', 'map'],
          },
          {
            key: j.h.Wireframe,
            enabled: function (e) {
              return !1;
            },
            dependsOn: [],
            uniformsUsed: [],
          },
          {
            key: j.h.FlatShading,
            enabled: function (e) {
              return !1;
            },
            dependsOn: [],
            uniformsUsed: [],
          },
          {
            key: j.h.PanoOverlay,
            enabled: function (e) {
              return !!e.overlay0Map.value;
            },
            dependsOn: [j.h.PanoTexture],
            uniformsUsed: ['overlay0Map'],
          },
          {
            key: j.h.PanoOverlayTransition,
            enabled: function (e) {
              return !!(
                e.progress.value > 0 &&
                e.progress.value < 1 &&
                e.overlay0Map.value &&
                e.overlay1Map.value &&
                e.overlay0Map.value !== e.overlay1Map.value
              );
            },
            dependsOn: [j.h.PanoOverlay, j.h.PanoTexture, j.h.PanoTextureTransition],
            uniformsUsed: ['progress', 'overlay0Map', 'overlay1Map'],
          },
          {
            key: j.h.MeshTrimVertex,
            enabled: function (e, { maxVaryings: t }) {
              return t > Y && e.meshTrimMatrices.value.some((e) => !!e.elements[15]);
            },
            dependsOn: [j.h.MeshTexture],
            uniformsUsed: [],
          },
          {
            key: j.h.MeshTrimPixel,
            enabled: function (e, { maxVaryings: t }) {
              return t <= Y && e.meshTrimMatrices.value.some((e) => !!e.elements[15]);
            },
            dependsOn: [j.h.MeshTexture],
            uniformsUsed: [],
          },
          {
            key: j.h.FloorTrimVertex,
            enabled: function (e) {
              return !!(e.floorTrimHeight.value < 1 && 1 === e.opacity.value);
            },
            dependsOn: [j.h.MeshTexture],
            uniformsUsed: ['floorTrimHeight'],
          },
          {
            key: j.h.FloorTrimPixel,
            enabled: function (e) {
              return !!(e.floorTrimHeight.value < 1 && 1 === e.opacity.value);
            },
            dependsOn: [j.h.MeshTexture],
            uniformsUsed: ['floorTrimHeight'],
          },
        ],
        X = new Set(J.map((e) => e.uniformsUsed).reduce((e, t) => e.concat(t), [])),
        ee = new Set([
          'progress',
          'panoOpacity',
          'meshOpacity',
          'pano0Map',
          'pano0Position',
          'pano0Matrix1',
          'pano0Matrix2',
          'pano1Map',
          'pano1Position',
          'pano1Matrix1',
          'pano1Matrix2',
          'overlay0Map',
          'overlay0Matrix',
          'overlay1Map',
          'overlay1Matrix',
        ]);
      class te {
        constructor(e, t, i, o, r = '', n = '', a = !1) {
          (this.meshGroup = e),
            (this.meshSubgroup = t),
            (this.geometry = i),
            (this.sharedState = o),
            (this.textureName = r),
            (this.sourceKey = n),
            (this.id = q++),
            (this.name = ''),
            (this.lod = z.V.Standard),
            (this.capabilityOverrides = {}),
            (this.onMaterialUpdate = new Set()),
            (this.uniformCache = te.getUniformDefaults()),
            (this.opacity = 1),
            (this.temp = {
              m1: new s.Matrix4(),
              m2: new s.Matrix4(),
              quat: new s.Quaternion(),
              m3: null,
            }),
            (this.textureCacheKey = `${n}${r}`),
            (this.standardMaterial = this.getChunkMaterial(this.getCapabilities(), !1)),
            this.updateRenderingMode(),
            a && this.setMaterialsUniform(o.globalUniforms);
        }
        dispose() {
          this.geometry.dispose();
        }
        static getUniformDefaults() {
          const e = {};
          for (const t in B.Z.modelChunk.uniforms) {
            const i = s.UniformsUtils.clone(B.Z.modelChunk.uniforms[t]);
            for (const t in i) e[t] = i[t];
          }
          return e;
        }
        set material(e) {
          if (this._material !== e && this.onMaterialUpdate)
            for (const t of this.onMaterialUpdate.values()) t(e);
          this._material = e;
        }
        get material() {
          return this._material;
        }
        notifyOnMaterialUpdated(e) {
          return (0, W.k1)(
            () => this.onMaterialUpdate.add(e),
            () => this.onMaterialUpdate.delete(e),
            !0,
          );
        }
        setMeshTexture(e) {
          this.setMaterialsUniform({ map: e });
        }
        getColorOverlay() {
          return this._colorOverlay;
        }
        setColorOverlay(e) {
          this._colorOverlay !== e &&
            (this.setMaterialsUniform({ colorOverlay: e }), (this._colorOverlay = e));
        }
        setMeshTextureOpacity(e) {
          e !== this._meshTextureOpacity &&
            (this.setMaterialsUniform({ meshOpacity: e, panoOpacity: 1 - e }),
            (this._meshTextureOpacity = e));
        }
        setProgress(e) {
          this._progress !== e && (this.setMaterialsUniform({ progress: e }), (this._progress = e));
        }
        needsTransparent() {
          return this.opacity < Z.xx.FADE_OPAQUE;
        }
        setOpacity(e) {
          this.opacity = e;
          const t = this.needsTransparent();
          return this.onOpacityUpdate && this.onOpacityUpdate(e), t !== this._material.transparent;
        }
        getOpacity() {
          return this.opacity;
        }
        setTime(e) {
          this.sharedState.renderingMode === L.S.Wireframe && this.setMaterialsUniform({ time: e });
        }
        setMeshPreviewSphere(e, t = 0.3) {
          this.setMaterialsUniform({ meshPreviewCenter: e, meshPreviewSize: t });
        }
        setWireframe(e) {
          if (e) {
            if (this.geometry.getIndex()) {
              const e = this.geometry;
              e.boundsTree && (e.boundsTree.geometry = this.geometry.clone()),
                this.geometry.copy(this.geometry.toNonIndexed());
            }
            (0, H.ko)(this.geometry);
          }
          this.overrideCapability(j.h.Wireframe, e);
        }
        setFlatShading(e) {
          e && this.geometry.computeVertexNormals(), this.overrideCapability(j.h.FlatShading, e);
        }
        getCapabilities() {
          const e = new Set();
          for (const t in this.capabilityOverrides) this.capabilityOverrides[t] && e.add(t);
          for (const t of J)
            if (!e.has(t.key) && t.enabled(this.uniformCache, this.sharedState)) {
              e.add(t.key);
              for (const i of t.dependsOn) e.add(i);
            }
          return e;
        }
        overrideCapability(e, t) {
          (this.capabilityOverrides[e] = t), this.updateMaterialCapabilities();
        }
        updateMaterialCapabilities() {
          const e = this.getCapabilities(),
            t = this.standardMaterial,
            i = this.needsTransparent();
          if ((0, Q.TH)(t.capabilities, e) && i === t.transparent) return this._material;
          const s = this.getChunkMaterial(e, i);
          return (
            (this.standardMaterial = s),
            this.sharedState.renderingMode === L.S.Standard && (this.material = s),
            this._material
          );
        }
        getChunkMaterial(e, t) {
          let i = `chunkMaterial_${this.sourceKey}`;
          for (const t of J) i += e.has(t.key) ? '1' : '0';
          const o = -1 === this.meshGroup && -1 === this.meshSubgroup;
          i += o ? 'f' : t ? '1' : '0';
          const { chunkMaterials: r } = this.sharedState;
          if (!r[i]) {
            const n = new G(i, e, this.getUniformsForCapabilities(e), () =>
              o ? s.BackSide : this.sharedState.side,
            );
            o
              ? ((n.transparent = !0), (n.depthWrite = !1))
              : ((n.transparent = t), (n.depthWrite = !t)),
              (r[i] = n);
          }
          return r[i];
        }
        getUniformsForCapabilities(e) {
          const t = {};
          for (const i of e) {
            const e = B.Z.modelChunk.uniforms[i];
            for (const i in e) t[i] = s.UniformsUtils.clone(this.uniformCache[i]);
          }
          return t;
        }
        setMaterialsUniform(e, t = !1) {
          let i,
            s = !1;
          for (const o in e) {
            let r = !1;
            const n = e[o];
            if (!(o in this.uniformCache)) throw new Error(`Uniform ${o} does not exist in Chunk`);
            const a = this.uniformCache[o],
              h = a.value;
            (r =
              'meshPreviewCenter' === o
                ? r || (null === h) != (null === n)
                : 'meshTrimMatrices' === o || r || (X.has(o) && h !== n)),
              (a.value = K(a.value, n)),
              'opacity' === o && (i = n),
              t &&
                ee.has(o) &&
                (this.sharedState.globalUniforms[o] = K(this.sharedState.globalUniforms[o], n)),
              (s = s || r);
          }
          return (
            void 0 !== i && (s = this.setOpacity(i) || s),
            s && this.updateMaterialCapabilities(),
            this._material
          );
        }
        updateRenderingMode() {
          const { renderingMode: e, modeMaterials: t } = this.sharedState;
          e === L.S.Standard ? (this.material = this.standardMaterial) : (this.material = t.get(e));
        }
        setProjectedPano(e, t, i, s, o = !1) {
          let r = 1 === e ? 'pano1Map' : 'pano0Map';
          const n = {};
          (n[r] = s || $),
            t && ((r = 1 === e ? 'pano1Position' : 'pano0Position'), (n[r] = t)),
            i &&
              t &&
              ((r = 1 === e ? 'pano1Matrix' : 'pano0Matrix'),
              this.temp.m1.makeRotationFromQuaternion(this.temp.quat.copy(i).invert()),
              this.temp.m2.makeScale(-1, 1, 1),
              (n[`${r}1`] = this.temp.m1),
              (n[`${r}2`] = this.temp.m2)),
            this.setMaterialsUniform(n, o);
        }
        setOverlayPano(e, t, i, o = !1) {
          const r = `overlay${e}`,
            n = {};
          if (t) {
            this.temp.m3 || (this.temp.m3 = new s.Matrix4());
            const e = this.temp.m3.makeRotationFromQuaternion(t);
            n[r + 'Matrix'] = e;
          }
          (n[r + 'Map'] = i || $), this.setMaterialsUniform(n, o);
        }
        onBeforeDraw(e) {
          if (this.sharedState.renderingMode === L.S.Standard) {
            for (const t of Object.keys(e.uniforms))
              this.uniformCache[t] &&
                null !== this.uniformCache[t].value &&
                (e.uniforms[t].value = this.uniformCache[t].value);
            e.uniformsNeedUpdate = !0;
          }
        }
        getSortKey() {
          var e, t, i;
          return null !==
            (i =
              null ===
                (t = null === (e = this.uniformCache.map) || void 0 === e ? void 0 : e.value) ||
              void 0 === t
                ? void 0
                : t.id) && void 0 !== i
            ? i
            : 0;
        }
      }
      const ie = new s.Vector3(0, 0, 0),
        se = new s.Vector3(100, 100, 100),
        oe = new s.Vector3(),
        re = new s.Vector3(),
        ne = new s.Box3();
      class ae extends s.Mesh {
        constructor(e) {
          super(),
            (this.bounds = new s.Box3()),
            (this.geometry = new s.BoxGeometry(1, 1, 1)),
            this.geometry.computeBoundingBox(),
            this.geometry.computeBoundingSphere(),
            (this.chunk = new te(-1, -1, this.geometry, e));
          const t = (e) => {
            this.material = e;
          };
          this.chunk.notifyOnMaterialUpdated(t),
            t(this.chunk.material),
            (this.name = 'FallbackMesh'),
            (this.renderOrder = N.z.boundingSkybox),
            this.setFromCenterAndSize(ie, se),
            (this.onBeforeRender = (e, t, i, o, r, n) => {
              r instanceof s.RawShaderMaterial && this.chunk.onBeforeDraw(r);
            });
        }
        setBounds(e) {
          if (this.bounds.equals(e)) return;
          this.bounds.copy(e);
          const t = e.getSize(oe);
          this.position.copy(e.getCenter(re)),
            this.scale.set(t.x, t.y, t.z),
            this.updateMatrixWorld(!0);
        }
        setFromCenterAndSize(e, t = se) {
          this.setBounds(ne.setFromCenterAndSize(e, t));
        }
      }
      var he = i(71180);
      class le {
        constructor(e, t, i, o, r, n, a, h) {
          (this.meshModule = e),
            (this.scene = t),
            (this.container = i),
            (this.mesh = o),
            (this.meshData = r),
            (this.sweepData = n),
            (this.chunkSharedState = a),
            (this.renderOptions = h),
            (this.chunkRenderingModeOverride = null),
            (this.lastChunkRenderingModeOverride = null),
            (this.fallbackMesh = new ae(this.chunkSharedState)),
            (this.overlayColors = []),
            (this.toolMeshColorEnabled = !1),
            (this.TOOL_MESH_COLOR_OVERLAY = new s.Vector4(0, 0, 0, 0.3)),
            (this.overlayTextures = [
              {
                sweepId: void 0,
                texture: void 0,
                renderTarget: new s.WebGLCubeRenderTarget(2048, { format: s.RGBAFormat }),
                quaternion: new s.Quaternion(),
              },
              {
                sweepId: void 0,
                texture: void 0,
                renderTarget: new s.WebGLCubeRenderTarget(2048, { format: s.RGBAFormat }),
                quaternion: new s.Quaternion(),
              },
            ]),
            (this.overlayEnabled = !1),
            (this.bindings = []),
            (this.updateFallbackMesh = (() => {
              const e = new s.Box3();
              return (t) => {
                if (this.sweepData.currentAlignedSweepObject && this.viewmodeData.isInside()) {
                  const t = e.copy(this.meshData.extendedBounds).expandByScalar(0.2);
                  this.fallbackMesh.setBounds(t);
                } else
                  this.cameraData &&
                    this.fallbackMesh.setFromCenterAndSize(this.cameraData.pose.position);
                this.fallbackMesh.material &&
                  (this.fallbackMesh.material.transparent = !(t < 1e-5));
              };
            })()),
            (this.opacity = null),
            (this.debugColorizeChunks = (() => {
              let e = !1;
              return (t, i) => {
                const o = new s.Vector4(1, 1, 1, 0);
                (e = !e),
                  ((e) => {
                    for (const t of this.mesh.chunks) {
                      const s = i ? 100 * t.id : 100 * t.meshSubgroup,
                        r = e ? (0, R.G1)(0.5, s) : o;
                      t.setColorOverlay(r);
                    }
                  })(t || e);
              };
            })());
        }
        init() {}
        dispose() {}
        async activate(e) {
          ([
            this.applicationData,
            this.viewmodeData,
            this.settings,
            this.cameraData,
            this.renderer,
          ] = await Promise.all([
            e.market.waitForData(V.pu),
            e.market.waitForData(M.O),
            e.market.waitForData(_.e),
            e.market.waitForData(y.M),
            e.getModuleBySymbol(a.Aj),
          ])),
            (this.panoRenderer = (await e.getModuleBySymbol(a.RR)).getRenderer()),
            this.scene.add(this.container),
            this.scene.add(this.fallbackMesh),
            (this.fallbackMesh.layers.mask = this.container.layers.mask),
            this.updateRenderState(),
            this.bindings.push(
              this.viewmodeData.onChanged(this.updateRenderState.bind(this)),
              this.sweepData.onChanged(this.updateRenderState.bind(this)),
              this.settings.onChanged(this.updateRenderState.bind(this)),
              this.settings.onPropertyChanged(Z.Lp, (e) => this.toggleWireframe(e)),
            ),
            this.bindings.push(
              this.mesh.notifyOnChunksLoaded((t) => {
                for (const e of this.overlayColors) e(t);
                e.msgBus.broadcast(new he.$m());
              }),
            ),
            this.renderOptions.colorizeRooms && this.debugColorizeChunks(!0),
            this.renderOptions.colorizeChunks && this.debugColorizeChunks(!0, !0),
            this.renderOptions.wireframe && this.toggleWireframe(!0);
        }
        deactivate() {
          for (const e of this.bindings) e.cancel();
          (this.bindings = []),
            this.scene.remove(this.container),
            this.scene.remove(this.fallbackMesh),
            this.currentSweepId && this.panoRenderer.freeTexture(this.currentSweepId),
            (this.currentSweepId = null),
            (this.targetSweepId = null);
        }
        updateSweepRenderTarget(e, t, i, s) {
          const o = this.panoRenderer.useTexture(t);
          if (o) {
            let t = !0;
            for (const r of this.allChunks()) r.setProjectedPano(e, i, s, o, t), (t = !1);
          }
        }
        *allChunks() {
          yield* this.mesh.chunks, yield this.fallbackMesh.chunk;
        }
        updateExistingTexture(e, t, i, s) {
          let o = !0;
          for (const r of this.allChunks())
            e === this.currentSweepId && r.setProjectedPano(0, i, s, t, o),
              e === this.targetSweepId && r.setProjectedPano(1, i, s, t, o),
              (o = !1);
        }
        render() {}
        beforeRender() {
          var e;
          const {
            floorOpacity: t,
            globalOpacityModifier: i,
            meshTextureOpacity: s,
          } = this.meshModule.meshGroupVisuals;
          for (const o of this.mesh.visibleChunks) {
            const r = (null !== (e = t.get(`${o.meshGroup}`)) && void 0 !== e ? e : 1) * i.value;
            o.setMaterialsUniform({
              meshOpacity: s.value,
              panoOpacity: 1 - s.value,
              opacity: null !== this.opacity ? this.opacity : r,
              progress: this.sweepData.transition.progress.value,
            });
          }
          const o = (0, l.w2)(s.value, 0, 1, 1);
          this.fallbackMesh.chunk.setMeshTextureOpacity(o),
            this.fallbackMesh.chunk.setProgress(this.sweepData.transition.progress.value),
            this.updateFallbackMesh(o);
        }
        updateChunkMaterialMode(e, t) {
          const i = e ? s.DoubleSide : s.FrontSide;
          (this.chunkSharedState.side = i),
            (this.chunkSharedState.renderingMode = t || L.S.Standard);
          for (const e of this.mesh.chunks) e.updateRenderingMode();
        }
        updateRenderState() {
          if (
            this.viewmodeData.currentMode !== this.lastViewmode ||
            this.lastChunkRenderingModeOverride !== this.chunkRenderingModeOverride
          ) {
            this.lastChunkRenderingModeOverride = this.chunkRenderingModeOverride;
            const e = this.viewmodeData.isInside();
            this.updateChunkMaterialMode(e, this.chunkRenderingModeOverride),
              (this.lastViewmode = this.viewmodeData.currentMode);
          }
          if (
            (this.viewmodeData.transition.active && (0, b.Bw)(this.viewmodeData.transition.to)) ||
            this.viewmodeData.isInside()
          ) {
            const e = this.sweepData.currentSweep,
              t = this.sweepData.transition,
              i =
                t.active &&
                (this.applicationData.phase === V.nh.PLAYING ||
                  this.applicationData.phase === V.nh.STARTING),
              s = i ? t.from : e,
              o = i ? t.to : e,
              r = this.currentSweepId,
              n = this.targetSweepId;
            (this.currentSweepId = s || null),
              (this.targetSweepId = o || null),
              this.handleSweepChange(0, r, this.currentSweepId),
              this.handleSweepChange(1, n, this.targetSweepId);
          }
          if (this.overlayEnabled) {
            const e = this.overlayTextures.find((e) => e.sweepId === this.currentSweepId),
              t = this.overlayTextures.find((e) => e.sweepId === this.targetSweepId);
            let i = !0;
            for (const s of this.allChunks())
              s.setOverlayPano(0, e ? e.quaternion : void 0, e ? e.texture : void 0, i),
                s.setOverlayPano(1, t ? t.quaternion : void 0, t ? t.texture : void 0, i),
                (i = !1);
          }
        }
        handleSweepChange(e, t, i) {
          if (t !== i && (t && this.panoRenderer.freeTexture(t), i)) {
            const t = this.sweepData.getSweep(i);
            this.updateSweepRenderTarget(e, i, t.position, t.rotation);
          }
        }
        async onPanoOverlayCommand(e) {
          this.overlayEnabled = !0;
          const t = (t) => {
            const i = t.renderTarget;
            (t.renderTarget.width = e.texture.image.width),
              (t.renderTarget.height = e.texture.image.height),
              (t.sweepId = e.sweepId),
              (t.texture = i.texture),
              (t.quaternion = e.quaternion),
              this.renderer.cwfRenderer.copyCubemap(e.texture, t.renderTarget);
          };
          let i = !1;
          for (const s of this.overlayTextures) i || s.sweepId !== e.sweepId || (t(s), (i = !0));
          for (const e of this.overlayTextures)
            i ||
              e.sweepId === this.targetSweepId ||
              e.sweepId === this.currentSweepId ||
              (t(e), (i = !0));
          this.updateRenderState();
        }
        async onMeshOverlayCommand(e) {
          let t = () => !0;
          switch (e.selectBy) {
            case C.u.selectBy.all:
              (t = () => !0), (this.overlayColors.length = 0);
              break;
            case C.u.selectBy.byMeshGroup:
              t = (t) => t.meshGroup === e.index;
              break;
            case C.u.selectBy.byMeshSubGroup:
              t = (t) => t.meshSubgroup === e.index;
          }
          if (!t) return;
          let i = 'rand';
          e.colorStyle === C.u.colorBy.explicit &&
            (i = e.color ? new s.Vector4(e.color.x, e.color.y, e.color.z, e.color.w) : null);
          const o = (s) => {
            for (const o of s) t(o) && o.setColorOverlay('rand' === i ? (0, R.G1)(e.alpha) : i);
          };
          o([...this.allChunks()]),
            (e.selectBy === C.u.selectBy.all && null === i) || this.overlayColors.push(o);
        }
        async toggleMeshOverlayColor({ enabled: e }) {
          if (e !== this.toolMeshColorEnabled)
            return (
              (this.toolMeshColorEnabled = e),
              this.onMeshOverlayCommand({
                color: e ? this.TOOL_MESH_COLOR_OVERLAY : null,
                selectBy: C.u.selectBy.all,
                colorStyle: C.u.colorBy.explicit,
                alpha: 0.5,
              })
            );
        }
        async onSetChunkRenderStateCommand(e) {
          (this.chunkRenderingModeOverride = e.mode), this.updateRenderState();
        }
        toggleWireframe(e) {
          for (const t of this.mesh.chunks) t.setWireframe(e);
        }
      }
      var de = i(27067),
        ce = i(69484),
        ue = i(10765),
        me = i(26059),
        pe = i(53257),
        ge = i(96783),
        ye = i(91584),
        ve = i(43846),
        fe = i(83607);
      class we {
        constructor(e, t, i, s = z.V.Standard, o) {
          (this.textureName = e),
            (this.mesh = i),
            (this.lod = s),
            (this.chunkedTexInfo = o),
            (this.chunks = new Set()),
            (this.loading = !1),
            (this.unloaded = !1),
            (this.screenCoverage = 0),
            (this.screenCoverageScore = 0),
            (this.sightings = new fe.P(Z.EJ.sightingMaxAge)),
            o &&
              (t.registerQualities(s, o.maxTextureSize, o.maxTexelSize, o.minScale),
              (this.quality = t.min(s)),
              (this.targetQuality = this.quality)),
            (this.minQuality = t.min(s)),
            (this.maxQuality = this.minQuality);
        }
        setTexture(e) {
          const t = this.texture;
          if (((this.texture = e), t && t !== e && t.dispose(), e))
            for (const t of this.chunks) t.setMeshTexture(e);
        }
        getEmbeddedTexture() {
          var e;
          const t = null === (e = this.chunks.entries().next()) || void 0 === e ? void 0 : e.value;
          return t ? t[0].embeddedTexture : void 0;
        }
      }
      class Me {
        constructor(e, t, i, s = 0.85) {
          (this.textureQualityMap = e),
            (this.renderer = t),
            (this.maxBudget = i),
            (this.pctTotalMemory = s),
            (this.lods = new Map()),
            (this.orders = {}),
            (this.slotTexSizes = new Map());
        }
        dispose() {
          (this.slots.length = 0), this.lods.clear();
        }
        update(e) {
          this.updateBudget(void 0), this.updateTargetQualitiesFromBudget();
        }
        updateBudget(e) {
          if (
            (e &&
              ((this.slots = e),
              e.forEach((e) => {
                const t = this.lods.get(e.lod) || new Set();
                t.add(e),
                  this.lods.set(e.lod, t),
                  (this.orders[e.lod] = this.textureQualityMap.order(e.lod));
              })),
            this.shouldRestrictBudget())
          ) {
            const e = this.calcCurrentTexturesSize(),
              t = this.renderer.estimatedGPUMemoryAllocated() - e,
              i = this.maxBudget() - t;
            this.budget = i * this.pctTotalMemory;
          } else this.budget = 1 / 0;
          return this;
        }
        updateTargetQualitiesFromBudget() {
          let e = 0;
          for (const t of this.slots)
            this.updateBudgetSize(t),
              (t.targetQuality = t.minQuality),
              (e += this.getBudgetSize(t, t.targetQuality));
          const t = (t, i) =>
            t.maxQuality < i ||
            ((e -= this.getBudgetSize(t, t.targetQuality)),
            (e += this.getBudgetSize(t, i)),
            !(e > this.budget) && ((t.targetQuality = i), !0));
          if (this.shouldRestrictBudget()) {
            for (const e of this.slots) for (const i of this.orders[e.lod]) if (!t(e, i)) return;
          } else
            for (const [e, i] of this.lods.entries())
              for (const s of this.orders[e]) for (const e of i) if (!t(e, s)) return;
        }
        shouldRestrictBudget() {
          return this.maxBudget() !== 1 / 0;
        }
        getBudgetSize(e, t) {
          if (!t) return 0;
          const i = this.textureQualityMap.get(t);
          let s = 0;
          if (e) {
            const i = this.textureQualityMap.min(e.lod);
            i !== t && e.getEmbeddedTexture() && (s = this.getBudgetSize(e, i));
            const o = e.textureName + t,
              r = this.slotTexSizes.get(o);
            if (r) return r + s;
          }
          return (i ? i.textureSize : 4096) ** 2 * 4 + s;
        }
        updateBudgetSize(e) {
          var t;
          const i = e.textureName + e.quality,
            s = null !== (t = e.texture) && void 0 !== t ? t : e.getEmbeddedTexture();
          this.slotTexSizes.set(i, this.texSizeBytes(s));
        }
        calcCurrentTexturesSize() {
          return this.slots.reduce((e, t) => {
            var i;
            const s = t.getEmbeddedTexture(),
              o = null !== (i = t.texture) && void 0 !== i ? i : s;
            return o === s
              ? e + this.texSizeBytes(o)
              : e + this.texSizeBytes(o) + this.texSizeBytes(s);
          }, 0);
        }
        texSizeBytes(e) {
          if (!e) return 0;
          if (e.mipmaps.length > 0) return e.mipmaps.reduce((e, t) => e + t.data.length, 0);
          let t = e.image.width * e.image.height * 4,
            i = t / 4;
          for (; i >= 1; ) (t += i), (i /= 4);
          return t;
        }
      }
      const be = new pe.Z('tex-lod');
      class De {
        constructor(e, t, i, s, o, r, n, a, h) {
          (this.textureQualityMap = e),
            (this.textureLOD = t),
            (this.api = i),
            (this.camera = s),
            (this.renderer = o),
            (this.renderToTextureModule = r),
            (this.engine = n),
            (this.chunkVisibilityChecker = a),
            (this.rendererModule = h),
            (this.name = 'texture-streaming'),
            (this.limitMemoryUsage = !1),
            (this.allocatedMegsBeforeLimitingLod = 350),
            (this.slots = []),
            (this.textureKeyToSlot = {}),
            (this.chunkSourceToMesh = {}),
            (this.chunkIdToSlot = {}),
            (this._systemMin = ve.S.LOW),
            (this._systemMax = ve.S.ULTRA),
            (this.allowTextureDownload = () => !0),
            (this.concurrentLoadingTextures = 1),
            (this.concurrentDownloadingTiles = 12),
            (this.autoLoadTiles = !1),
            (this.lastSortedAt = 0),
            (this.loadingTextures = 0),
            (this.downloadingTiles = 0),
            (this.totalTextures = {}),
            (this.totalTiles = 0),
            (this.abortController = new AbortController()),
            (this.bindings = []),
            (this.textureApiInfo = new Map()),
            (this._chunkSlotsSet = new Set()),
            (this.loadImage = async (e, t, i, s, o) => {
              var r;
              const n = this.textureQualityMap.get(t),
                { assetType: a, lod: h } = n,
                l =
                  (null === (r = e.chunkedTexInfo) || void 0 === r ? void 0 : r.maxTextureSize) ||
                  n.assetSize;
              let d,
                c = e.textureName;
              if (this.textureApiInfo) {
                if (!e.chunkedTexInfo) {
                  const e = c.match(/[_.]([0-9]{3})[_.]/);
                  if (!e) throw new Error(`Could not parse texture index from texture name: ${c}`);
                  c = e[1];
                }
                const t = this.textureApiInfo.get(e.mesh);
                if (!t) throw new Error(`No texture URLs found for mesh: ${e}`);
                d = (await t[a].get()).urlTemplate
                  .replace('<folder>', `${h}`)
                  .replace('<texture>', c);
              } else {
                const e = c.match(/^([a-f0-9]+(_10k|_50k)?)/);
                if (!e) throw new Error(`Unknown format for texture name: ${c}`);
                d = `${e[0]}_texture_jpg_${a}/${c}`;
              }
              const { sourceSize: u = l, sourceX: m = 0, sourceY: p = 0, destSize: g = u } = s,
                y = {};
              return (
                g !== u && (y.width = `${g}`),
                u !== l && (y.crop = `${u},${u},x${m / l},y${p / l}`),
                (d = (0, ue.bf)(d, y)),
                i.getImageBitmap(d, g, g, o)
              );
            }),
            (this.textureBudgeter = new Me(this.textureQualityMap, this.rendererModule, () =>
              this.limitMemoryUsage ? this.allocatedMegsBeforeLimitingLod * 2 ** 20 : 1 / 0,
            )),
            this.bindings.push(
              this.chunkVisibilityChecker.notifyOnNewSighting((e, t) => {
                const i = this.chunkSourceToMesh[e.sourceKey];
                if (i) {
                  const s = this.addChunkSlots(i, [e]);
                  for (const e of s) e.sightings.push(t);
                }
              }),
            );
        }
        setModel(e, t, i) {
          if ((this.textureApiInfo.set(e, i), 0 === t.length)) throw new Error('Chunks required');
          this.addChunkSlots(e, [...t]),
            this.textureBudgeter.updateBudget(this.slots),
            this.updateSystemQualityRanges();
        }
        clearSlots() {
          this.abortController.abort(),
            this.slots.forEach((e) => {
              this.removeChunks([...e.chunks]);
            }),
            (this.abortController = new AbortController());
        }
        dispose() {
          this.abortController.abort(),
            this.bindings.forEach((e) => e.cancel()),
            (this.bindings.length = 0),
            this.clearSlots(),
            this._chunkSlotsSet.clear(),
            this.textureBudgeter.dispose(),
            this.textureApiInfo.clear();
        }
        addChunkSlots(e, t) {
          t.forEach((t) => {
            this.chunkSourceToMesh[t.sourceKey] = e;
          }),
            this._chunkSlotsSet.clear();
          let i = !1;
          for (const s of t) {
            const t = s.textureName;
            let o = this.textureKeyToSlot[s.textureCacheKey];
            o ||
              ((i = !0),
              (o = new we(t, this.textureQualityMap, e, s.lod, s.textureLODInfo)),
              s.embeddedTexture && o.setTexture(s.embeddedTexture),
              (this.textureKeyToSlot[s.textureCacheKey] = o),
              this.slots.push(o)),
              o.chunks.has(s) ||
                ((i = !0), o.chunks.add(s), o.texture && s.setMeshTexture(o.texture)),
              this._chunkSlotsSet.add(o),
              (this.chunkIdToSlot[s.id] = o);
          }
          return (
            i &&
              this.textureBudgeter &&
              (this.textureBudgeter.updateBudget(this.slots), this.updateSystemQualityRanges()),
            this._chunkSlotsSet
          );
        }
        removeChunks(e) {
          for (const t of e) {
            const e = this.chunkIdToSlot[t.id];
            if (e) {
              if ((e.chunks.delete(t), 0 === e.chunks.size)) {
                (e.unloaded = !0), e.setTexture(null);
                const i = this.slots.indexOf(e);
                this.slots.splice(i, 1), delete this.textureKeyToSlot[t.textureCacheKey];
              }
              delete this.chunkIdToSlot[t.id];
            } else be.error('Missing slot for chunk!', t.id, t.textureCacheKey, t);
          }
        }
        setQuality(e, t) {
          (this._systemMin = e), (this._systemMax = t), this.updateSystemQualityRanges();
        }
        updateSystemQualityRanges() {
          const e = this.textureQualityMap;
          (this.minQuality = {}), (this.maxQuality = {});
          for (const t of new Set([...this.slots.map((e) => e.lod)]).values())
            (this.minQuality[t] = e.nearestQuality(t, this._systemMin)),
              (this.maxQuality[t] = e.nearestQuality(t, this._systemMax));
          for (const e of this.slots)
            (e.minQuality = this.minQuality[e.lod]),
              (e.maxQuality = e.maxQuality
                ? Math.min(this.maxQuality[e.lod], e.maxQuality)
                : this.maxQuality[e.lod]);
        }
        get textureCount() {
          return this.slots.length;
        }
        async loadAll(e) {
          this.slots[0] && this.slots[0].textureName && (await this.loadSlots(this.slots, e));
        }
        async loadSlots(e, t = this.textureQualityMap.min(z.V.Standard)) {
          const i = this.textureQualityMap;
          i.valid(t)
            ? await Promise.all(e.map((e) => this.loadTexture(e, t, !1)))
            : be.warn(t, 'not found in', i);
        }
        onWebGLContextLost() {
          this.abortController.abort();
          for (const e of this.slots) e.texture = null;
        }
        onWebGLContextRestored() {
          this.abortController = new AbortController();
          for (const e of this.slots) this.loadTexture(e, e.quality);
        }
        async loadTexture(e, t, i = !0) {
          var s, o;
          const r = this.textureQualityMap;
          r.valid(t) || be.warn(t, 'not found in', r);
          const n = r.get(t),
            a =
              (null === (s = e.chunkedTexInfo) || void 0 === s ? void 0 : s.maxTextureSize) ||
              n.assetSize,
            h = Math.min(a, n.textureSize);
          e.lastLoadedAt = performance.now();
          let l = e.texture;
          if (!l || t !== e.quality)
            if (l && t < e.quality && e.texture) {
              const i =
                null === (o = e.chunks.values().next().value) || void 0 === o
                  ? void 0
                  : o.embeddedTexture;
              if (i && i.image.width >= h && i.mipmaps[0].data.length <= h * h * 4)
                (e.quality = t), e.setTexture(i);
              else {
                const i = this.renderToTextureModule.resizeTexture(l, h);
                Se(i, e), (e.quality = t), e.setTexture(i);
              }
              this.engine.msgBus.broadcast(new he._I());
            } else {
              (e.loading = !0),
                this.loadingTextures++,
                (this.totalTextures[h] = (this.totalTextures[h] || 0) + 1);
              try {
                (l =
                  this.textureLOD !== E.l.NONE && i
                    ? await this.loadTextureTiled(h, t, e, this.abortController.signal)
                    : await this.loadTextureSolid(h, t, e, this.abortController.signal)),
                  e.unloaded
                    ? l.dispose()
                    : (Se(l, e), e.setTexture(l), this.engine.msgBus.broadcast(new he.WQ()));
              } catch (e) {
              } finally {
                this.loadingTextures--, (e.quality = t), (e.loading = !1);
              }
            }
        }
        async loadTextureTiled(e, t, i, o) {
          var r;
          const n = this.renderer.initSizedTexture2D(e, {
              generateMipmaps: !1,
              minFilter: s.LinearFilter,
              magFilter: s.LinearFilter,
            }),
            a = this.textureQualityMap,
            h =
              (null === (r = i.chunkedTexInfo) || void 0 === r ? void 0 : r.maxTextureSize) ||
              a.get(t).assetSize,
            l = Math.min(h, a.get(t).textureSize),
            d = Math.min(l, a.get(t).tileSize),
            c = async (e, s) => {
              let r;
              (this.downloadingTiles += 1), (this.totalTiles += 1);
              const a = Z.ZP.flipDownload;
              try {
                r = await this.loadImage(
                  i,
                  t,
                  this.api,
                  {
                    sourceSize: h * (d / l),
                    sourceX: h * (e / l),
                    sourceY: h * (s / l),
                    destSize: d,
                  },
                  { priority: de.ru.LOW, flipY: a, signal: o },
                );
              } finally {
                this.downloadingTiles -= 1;
              }
              const c = e,
                u = Z.ZP.flipUpload ? l - s - d : s,
                m = new ye._(
                  'mesh/texture/upload-tiles',
                  () =>
                    this.engine.after(ce.A.End).then(() => {
                      if (o.aborted) throw new DOMException('Aborted', 'AbortError');
                      (n.flipY = a && r instanceof HTMLImageElement),
                        this.renderer.uploadTexture2D(r, n, c, u);
                    }),
                  100,
                );
              return (await this.engine.commandBinder.issueCommand(m)).promise.finally(() => {
                var e, t;
                r && (null === (t = (e = r).close) || void 0 === t || t.call(e));
              });
            },
            u = [];
          for (let e = 0; e < l; e += d) for (let t = 0; t < l; t += d) u.push(c(e, t));
          try {
            await Promise.all(u);
          } catch (e) {
            throw (n.dispose(), e);
          }
          return n;
        }
        async loadTextureSolid(e, t, i, s) {
          var o, r;
          const n = this.renderer.initSizedTexture2D(e);
          let a = null;
          try {
            const e = this.textureQualityMap.get(t).textureSize,
              h = Z.ZP.flipDownload;
            (a = await this.loadImage(
              i,
              t,
              this.api,
              { destSize: e },
              { priority: de.ru.LOW, flipY: h, signal: s },
            )),
              (n.flipY = h && a instanceof HTMLImageElement),
              this.renderer.uploadTexture2D(a, n, 0, 0);
          } catch (e) {
            throw (n.dispose(), e);
          } finally {
            a && (null === (r = (o = a).close) || void 0 === r || r.call(o));
          }
          return n;
        }
        setImageLoader(e) {
          this.loadImage = e;
        }
        analyzeTextureScreenCoverageFromRaycasts() {
          const e = this.renderer.getSize().x,
            t = this.camera.getWorldPosition(new s.Vector3());
          for (const i of this.slots) {
            (i.screenCoverage = 0), (i.screenCoverageScore = 0), (i.maxQuality = i.minQuality);
            const s = i.sightings.getList(),
              o = i.sightings.index - 1;
            for (let r = 0; r < s.length; r++) {
              const n = s[(o - r + s.length) % s.length];
              if (n.raycastAge < this.chunkVisibilityChecker.raycastCounter - Z.ZP.sightingMaxAge)
                break;
              const a = t.distanceTo(n.point),
                h = (0, me._U)(a, this.camera.projectionMatrix, e);
              let l = this.textureQualityMap.fromPixelSize(i.lod, h);
              (l = Math.min(l, this.maxQuality[i.lod])),
                (i.screenCoverageScore += l),
                (i.screenCoverage += 1),
                (i.maxQuality = Math.max(l, i.maxQuality));
            }
          }
          this.slots.sort((e, t) => t.screenCoverageScore - e.screenCoverageScore),
            this.textureBudgeter.updateTargetQualitiesFromBudget();
        }
        update(e) {
          if (!this.camera || !this.autoLoadTiles || this.abortController.signal.aborted) return;
          this.textureBudgeter.update(e);
          const t = performance.now();
          this.textureLOD === E.l.RAYCAST && this.scheduleRaycastTasks(t);
          let i = !1;
          for (let e = this.slots.length - 1; e >= 0; e--) {
            const s = this.slots[e],
              o = (0, ge.uZ)(s.targetQuality, s.minQuality, s.maxQuality),
              r = t - s.lastLoadedAt < 1e3;
            if (!s.loading && s.quality > o) {
              r ? (i = !0) : this.loadTexture(s, o);
              break;
            }
          }
          if (this.allowTextureDownload() && !i)
            for (const e of this.slots) {
              if (
                this.loadingTextures >= this.concurrentLoadingTextures ||
                this.downloadingTiles >= this.concurrentDownloadingTiles
              )
                break;
              const t = (0, ge.uZ)(e.targetQuality, e.minQuality, e.maxQuality);
              !e.loading &&
                e.quality < t &&
                this.loadTexture(e, this.textureQualityMap.moreDetailed(e.lod, e.quality));
            }
        }
        scheduleRaycastTasks(e) {
          if (!this.analyzeTaskPromise && e - this.lastSortedAt > 200) {
            const e = () => {
                this.analyzeTextureScreenCoverageFromRaycasts(),
                  (this.lastSortedAt = performance.now());
              },
              t = async (e) => {
                await e.promise, (this.analyzeTaskPromise = null);
              },
              i = new ye._('mesh/texture/analyze-screen-coverage', e, 100);
            this.analyzeTaskPromise = this.engine.commandBinder.issueCommand(i).then(t);
          }
        }
      }
      function Se(e, t) {
        e.addEventListener('dispose', () => {
          e === t.texture && be.warn('Streamed texture disposed while still in use');
        });
      }
      var xe = i(63592),
        Te = i(41513),
        Ce = i(28438),
        Pe = i(19765);
      const Oe = Math.round(Z.ZP.sightingMaxAge / 60 / 5) || 1;
      class ke {
        constructor(e, t, i) {
          (this.scene = e),
            (this.raycaster = t),
            (this.pose = i),
            (this.raycastCounter = 0),
            (this.onNewSighting = new Set()),
            (this.lastReset = 0),
            (this.raycastRandomScreenLocation = (() => {
              const e = new s.Vector3(),
                t = new s.Vector3(),
                i = new s.Vector3();
              function o(e) {
                return (
                  !!((0, Te.Pv)(e) && e instanceof Ce.g) &&
                  e.chunks.some((e) => e.getOpacity() > Z.xx.FADE_TILE_VISIBLE_THRESHOLD)
                );
              }
              return (s, r, n) => {
                this.raycastCounter++;
                const a = (2 - 2 * r) / s,
                  h = -1 + r,
                  l = this.raycastCounter % (s * s),
                  d = l % s,
                  c = h + ((l - d) / s) * a,
                  u = h + d * a + Math.random() * a,
                  m = c + Math.random() * a;
                e.set(u, m, -1).unproject(this.camera),
                  t.set(u, m, 1).unproject(this.camera),
                  i.subVectors(t, e).normalize();
                const p = this.raycaster.pick(e, i, o);
                if (p) {
                  if (p.face && p.object instanceof Ce.g) {
                    const e = p.object.getChunk(p.face.materialIndex),
                      t = { point: p.point.clone(), raycastAge: this.raycastCounter };
                    for (const i of this.onNewSighting.values()) i(e, t);
                  }
                  n && n(p);
                }
              };
            })()),
            (this.camera = e.camera);
        }
        resetCounter() {
          this.lastReset = this.raycastCounter;
        }
        update() {
          const e = Z.ZP.debugLOD ? (0, Pe.ef)(65280, this.scene, this.pose) : void 0,
            t = performance.now();
          for (
            let i = 0;
            i < Oe &&
            performance.now() - t < 0.5 &&
            this.raycastCounter <= this.lastReset + Z.ZP.sightingMaxAge;
            i++
          )
            this.raycastRandomScreenLocation(5, 0.05, e);
        }
        notifyOnNewSighting(e) {
          return (0, W.k1)(
            () => this.onNewSighting.add(e),
            () => this.onNewSighting.delete(e),
            !0,
          );
        }
      }
      const Ae = i.p + 'images/uv_grid_opengl.jpg';
      var Ee = i(71472);
      class Fe {
        constructor() {
          this.materials = new Map();
        }
        get(e) {
          let t = this.materials.get(e);
          return t || ((t = Be[e]()), this.materials.set(e, t)), t;
        }
      }
      const Be = {
        [L.S.Depth]() {
          const e = s.UniformsUtils.clone(B.Z.depth.uniforms);
          return new s.RawShaderMaterial({
            fragmentShader: B.Z.depth.fragmentShader,
            vertexShader: B.Z.depth.vertexShader,
            uniforms: e,
            side: s.FrontSide,
            name: 'materialDepth',
          });
        },
        [L.S.Transparent]() {
          const e = s.UniformsUtils.clone(B.Z.modelOutside.uniforms);
          return (
            (e.opacity.value = 0.2),
            e.colorOverlay.value.set(1, 1, 1, 1),
            new s.RawShaderMaterial({
              fragmentShader: B.Z.modelOutside.fragmentShader,
              vertexShader: B.Z.modelOutside.vertexShader,
              uniforms: e,
              side: s.FrontSide,
              transparent: !0,
              name: 'materialTransparent',
            })
          );
        },
        [L.S.Wireframe]() {
          const e = s.UniformsUtils.clone(B.Z.modelOutside.uniforms);
          return (
            (e.opacity.value = 0.5),
            e.colorOverlay.value.set(1, 1, 1, 1),
            new s.RawShaderMaterial({
              fragmentShader: B.Z.modelOutside.fragmentShader,
              vertexShader: B.Z.modelOutside.vertexShader,
              uniforms: e,
              side: s.FrontSide,
              transparent: !0,
              wireframe: !0,
              name: 'materialWireframe',
            })
          );
        },
        [L.S.UV]: () => new s.MeshBasicMaterial({ name: 'uv-debug', map: (0, Ee.p)(Ae) }),
      };
      class Ie {
        constructor() {
          (this.side = s.FrontSide),
            (this.renderingMode = L.S.Standard),
            (this.chunkMaterials = {}),
            (this.modeMaterials = new Fe()),
            (this.globalUniforms = {});
        }
        forEachChunkMaterial(e) {
          const { chunkMaterials: t } = this;
          for (const i in t) e(t[i]);
        }
        dispose() {
          const { chunkMaterials: e } = this;
          for (const t in e) {
            const i = e[t];
            for (const e in i.uniforms)
              i.uniforms[e].value instanceof s.Texture && i.uniforms[e].value.dispose();
            i.dispose(), delete e[t];
          }
        }
      }
      var Re = i(32197);
      class Ve {
        constructor() {
          (this._configs = {}),
            (this._orders = {}),
            (this._maxLod = -1 / 0),
            (this._maxTs = 1 / 0),
            (this._streamAbove = 0);
        }
        static encodeKey(e, t) {
          return e - t;
        }
        get maxLod() {
          return this._maxLod;
        }
        get maxTexelSize() {
          return this._maxTs;
        }
        limitStreamingBelow(e) {
          this._streamAbove = e;
        }
        order(e, t = !1) {
          return t && !this._orders[e] && (this._orders[e] = []), this._orders[e];
        }
        reset() {
          (this._configs = {}), (this._orders = {}), (this._maxTs = 1 / 0), (this._maxLod = -1 / 0);
        }
        valid(e) {
          return e in this._configs;
        }
        get(e) {
          if (!this.valid(e)) throw new Error('invalid quality level ' + e);
          return this._configs[e];
        }
        max(e) {
          return e < this._streamAbove ? this.min(e) : this.order(e)[this.order(e).length - 1];
        }
        min(e) {
          return this.order(e)[0];
        }
        fromPixelSize(e, t) {
          const i = this.order(e),
            s = this.min(e);
          let o = this.max(e);
          for (let e = i.length - 1; e >= 0; e--)
            t > this.get(i[e]).texelSize && i.indexOf(o) > i.indexOf(s) && (o = i[e]);
          return o;
        }
        moreDetailed(e, t) {
          let i = this.min(e);
          const s = this.max(e),
            o = this.order(e),
            r = o.indexOf(t);
          return r + 1 === o.length ? s : (-1 !== r && (i = Math.min(s, o[r + (1 % o.length)])), i);
        }
        lessDetailed(e, t) {
          const i = this.order(e),
            s = i.indexOf(t);
          let o = t;
          return -1 !== s && (o = i[Math.max(0, s - 1)]), o;
        }
        minSize() {
          return Object.values(this._configs).sort(_e)[0];
        }
        maxSize() {
          const e = Object.values(this._configs).sort(_e);
          return e[e.length - 1];
        }
        nearestQuality(e, t) {
          const i = this.order(e),
            s = this.max(e),
            o = (0, Re.et)(t, 1, 4, 0, i.length - 1);
          return Math.min(s, i[Math.round(o)]);
        }
        registerQualities(e, t, i, s, o = 'max') {
          const r = this._configs,
            n = this.order(e, !0),
            a = t * s;
          for (let s = t, h = i; s >= a; s *= 0.5, h *= 2) {
            const i = Ve.encodeKey(e, h),
              a = r[i];
            (!a || (a && a.assetSize < t)) &&
              ((this._maxTs = Math.min(this._maxTs, h)),
              (this._maxLod = Math.max(this._maxLod, e)),
              (r[i] = {
                key: i,
                lod: e,
                texelSize: h,
                textureSize: s,
                assetSize: t,
                assetType: o,
                tileSize: Math.min(s, Z.ZP.textureTileSize),
              })),
              -1 === n.indexOf(i) && n.push(i);
          }
          n.sort((e, t) => r[t].texelSize - r[e].texelSize);
        }
      }
      function _e(e, t) {
        return e.textureSize > t.textureSize ? 1 : -1;
      }
      var Le = i(42141),
        Ne = i(53584),
        ze = i(29518);
      const Ue = new pe.Z('MeshTrimData'),
        Ge = -1;
      class je extends Le.V {
        constructor() {
          super(),
            (this.maxTrimsPerFloor = B.t),
            (this.maxAllFloorsTrims = B.t),
            (this.numberOfTrims = 0),
            (this.meshTrimsByMeshGroup = new m.v()),
            (this.meshTrimsById = new m.v()),
            (this.onMeshGroupChangedCallbacks = new Set()),
            (this.onMeshTrimChangedCallbacks = new Set()),
            (this.updateMeshTrim = (e) => {
              for (const t of this.onMeshTrimChangedCallbacks) t(e);
            }),
            (this.notifyMeshGroupChanges = (e) => {
              for (const t of this.onMeshGroupChangedCallbacks) t(e);
            }),
            this.meshTrimsByMeshGroup.set('-1', new Ne.d());
        }
        addMeshGroups(e) {
          for (const t of e)
            if (!this.meshTrimsByMeshGroup.has(`${t}`)) {
              const e = new Ne.d();
              this.meshTrimsByMeshGroup.set(`${t}`, e);
            }
          this.singleFloorMeshGroup || 1 !== e.length || (this.singleFloorMeshGroup = e[0]);
        }
        add(...e) {
          const t = new Set();
          let i = !1;
          if (
            (this.meshTrimsById.atomic(() => {
              this.meshTrimsByMeshGroup.atomic(() => {
                for (const s of e) {
                  void 0 !== this.singleFloorMeshGroup && (s.meshGroup = this.singleFloorMeshGroup);
                  const e = s.meshGroup === Ge,
                    o = `${s.meshGroup}`;
                  this.meshTrimsByMeshGroup.has(o) || this.meshTrimsByMeshGroup.set(o, new Ne.d());
                  const r = this.meshTrimsByMeshGroup.get(o);
                  r.length < (e ? this.maxAllFloorsTrims : this.maxTrimsPerFloor)
                    ? (r.push(s),
                      this.meshTrimsById.set(s.id, s),
                      t.add(s.meshGroup),
                      s.onChanged(this.updateMeshTrim))
                    : (Ue.debugWarn(
                        'Trims exceed floor limit (trimId, meshGroup):',
                        s.id,
                        s.meshGroup,
                      ),
                      (i = !0));
                }
              });
            }),
            t.forEach((e) => {
              const t = this.meshTrimsByMeshGroup.get(`${e}`);
              this.sortList(t), this.reassignIndexes(t), this.notifyMeshGroupChanges(e);
            }),
            this.updateDerivedProperties(),
            i)
          )
            throw new ze.M('Exceeding max trims');
        }
        delete(...e) {
          const t = new Set();
          this.meshTrimsByMeshGroup.atomic(() => {
            for (const i of e) {
              const e = this.meshTrimsByMeshGroup.get(`${i.meshGroup}`),
                s = e.indexOf(i);
              if (s >= 0) {
                (e.splice(s, 1)[0].enabled = !1),
                  t.add(i.meshGroup),
                  i.removeOnChanged(this.updateMeshTrim);
              } else Ue.error('Could not delete mesh trim:' + i.id);
            }
          }),
            t.forEach((e) => {
              const t = this.meshTrimsByMeshGroup.get(`${e}`);
              this.reassignIndexes(t), this.notifyMeshGroupChanges(e);
            }),
            this.meshTrimsById.atomic(() => {
              e.forEach((e) => {
                this.meshTrimsById.delete(e.id);
              });
            }),
            this.updateDerivedProperties();
        }
        updateDerivedProperties() {
          (this.numberOfTrims = this.meshTrimsById.length),
            (this.maxTrimsPerFloor = B.t - this.meshTrimsByMeshGroup.get('-1').length),
            (this.maxAllFloorsTrims = B.t - this.getLongestTrimListLength()),
            this.commit();
        }
        onMeshGroupChanged(e) {
          return (0, W.k1)(
            () => this.onMeshGroupChangedCallbacks.add(e),
            () => this.onMeshGroupChangedCallbacks.delete(e),
          );
        }
        onMeshTrimChanged(e) {
          return (0, W.k1)(
            () => this.onMeshTrimChangedCallbacks.add(e),
            () => this.onMeshTrimChangedCallbacks.delete(e),
          );
        }
        getTrimById(e) {
          return this.meshTrimsById.get(e);
        }
        getTrim(e, t) {
          return this.meshTrimsByMeshGroup.has(`${e}`)
            ? this.meshTrimsByMeshGroup.get(`${e}`).get(t)
            : null;
        }
        getTrimsForMeshGroup(e) {
          return this.meshTrimsByMeshGroup.has(`${e}`)
            ? this.meshTrimsByMeshGroup.get(`${e}`).values()
            : [];
        }
        *activeTrimsForMeshGroup(e) {
          if (this.meshTrimsByMeshGroup.has(`${e}`))
            for (const t of this.meshTrimsByMeshGroup.get(`${e}`)) t.enabled && (yield t);
          if (this.meshTrimsByMeshGroup.has('-1'))
            for (const e of this.meshTrimsByMeshGroup.get('-1')) e.enabled && (yield e);
        }
        reassignIndexes(e) {
          e.forEach((e, t) => {
            e.index = t;
          });
        }
        sortList(e) {
          e.sort((e, t) => e.index - t.index);
        }
        getLongestTrimListLength() {
          let e = 0;
          return (
            this.meshTrimsByMeshGroup.keys.forEach((t) => {
              if ('-1' === t) return;
              const i = this.meshTrimsByMeshGroup.get(t);
              e = Math.max(i.length, e);
            }),
            e
          );
        }
      }
      class He extends o.Y {
        constructor() {
          super(...arguments),
            (this.name = 'model-mesh'),
            (this.commands = {
              MeshPreviewSetPositonCommand: x.n,
              SetChunkRenderModeCommand: T.U,
              SetMeshOverlayCommand: C.u,
              SetPanoOverlayCommand: O,
              ToggleMeshOverlayColorCommand: k,
            }),
            (this.meshTrimData = new je()),
            (this.meshes = new Map()),
            (this.inactiveMeshes = new Map()),
            (this.meshGroupVisuals = {
              allFloorsVisibleInOrtho: new p.f(!0),
              floorOpacity: new m.v(),
              globalOpacityModifier: new p.f(1),
              meshTextureOpacity: new g.z(1),
            }),
            (this.meshesLoaded = 0),
            (this.meshLoadPromises = new Map()),
            (this._firstMeshLoadPromise = new r.Q()),
            (this._renderMode = A.k.Hidden),
            (this.onMeshOverlayCommand = (e) => {
              for (const t of this.allMeshes()) t.renderer.onMeshOverlayCommand(e);
            }),
            (this.toggleMeshOverlayColor = (e) => {
              for (const t of this.allMeshes()) t.renderer.toggleMeshOverlayColor(e);
            }),
            (this.onSetChunkRenderStateCommand = (e) => {
              for (const t of this.allMeshes()) t.renderer.onSetChunkRenderStateCommand(e);
            }),
            (this.onPanoOverlayCommand = (e) => {
              for (const t of this.allMeshes()) t.renderer.onPanoOverlayCommand(e);
            }),
            (this.meshTrimUpdateRenderMode = (e) => {
              this.meshTrimUniforms &&
                e !== this.meshTrimUniforms.isPanoMode &&
                ((this.meshTrimUniforms.isPanoMode = e), this.meshTrimUpdate(-1));
            }),
            (this.meshTrimFilter = (e) => {
              const t = e.object,
                i = e.point;
              let s = !1,
                o = !1;
              if (this.meshTrimData && this.viewmodeData && (0, Te.Pv)(t)) {
                for (const e of this.meshTrimData.activeTrimsForMeshGroup(t.meshGroup)) {
                  const t = e.isPointTrimmed(i, this.viewmodeData.isPano());
                  if (e.discardContents) {
                    if (t) return !1;
                  } else (s = s || !t), (o = !0);
                }
                if (o) return s;
              }
              return !0;
            });
        }
        get firstMeshLoadPromise() {
          return this._firstMeshLoadPromise.nativePromise();
        }
        *allMeshes() {
          yield* this.meshes.values(), yield* this.inactiveMeshes.values();
        }
        getMesh(e) {
          var t, i;
          return (
            (null === (t = this.meshes.get(e)) || void 0 === t ? void 0 : t.modelMesh) ||
            (null === (i = this.inactiveMeshes.get(e)) || void 0 === i ? void 0 : i.modelMesh) ||
            null
          );
        }
        hasMesh(e) {
          return this.meshes.has(e) || this.inactiveMeshes.has(e) || this.meshLoadPromises.has(e);
        }
        async init(e, t) {
          S ||
            ((s.Mesh.prototype.raycast = D.uL),
            (s.BufferGeometry.prototype.computeBoundsTree = D.Xy),
            (s.BufferGeometry.prototype.disposeBoundsTree = D.sn),
            (S = !0)),
            (this.engine = t),
            (this.config = e),
            (this.market = t.market);
          const [i, o, r, n, h, l, d] = await Promise.all([
            t.getModuleBySymbol(a.Vs),
            t.market.waitForData(y.M),
            t.getModuleBySymbol(a.PZ),
            t.getModuleBySymbol(a.Aj),
            t.getModuleBySymbol(a.fQ),
            t.getModuleBySymbol(a.tA),
            t.market.waitForData(M.O),
          ]);
          (this.viewmodeData = d),
            (this.webglScene = n.getScene()),
            (this.raycasterModule = h),
            (this.input = r),
            (this.chunkVisibilityChecker = new ke(this.webglScene, h.picking, o.pose)),
            o.pose.onChanged(() => this.chunkVisibilityChecker.resetCounter()),
            this.meshGroupVisuals.floorOpacity.onChanged(() =>
              this.chunkVisibilityChecker.resetCounter(),
            ),
            (this.chunkSharedState = new Ie()),
            (this.chunkSharedState.maxVaryings = n.maxVaryings),
            (this.textureQualityMap = new Ve()),
            (this.meshTextureLoader = new De(
              this.textureQualityMap,
              e.textureLOD,
              i.getApi(),
              this.webglScene.camera,
              n.cwfRenderer,
              l,
              t,
              this.chunkVisibilityChecker,
              n,
            )),
            this.initRenderMode(e.startingMode, d),
            this.meshTrimInit(this.meshTrimData, h);
          const m = this.meshGroupVisuals.meshTextureOpacity;
          this.bindings.push(
            m.onActivate(() => {
              this.meshTrimUpdateRenderMode(0 === m.endValue);
            }),
            m.onComplete(() => {
              this.meshTrimUpdateRenderMode(0 === m.value);
            }),
          ),
            this.bindings.push(
              this.engine.subscribe(f.Z, (e) => {
                this.meshes.forEach((t) => {
                  t.renderer.updateExistingTexture(e.sweepId, e.renderTarget.texture);
                });
              }),
            ),
            this.bindings.push(
              t.commandBinder.addBinding(x.n, this.setPreviewPosition.bind(this)),
              t.subscribe(w.zq, () => {
                this.meshTextureLoader.onWebGLContextLost();
              }),
              t.subscribe(w.Xq, () => {
                this.meshTextureLoader.onWebGLContextRestored();
              }),
              t.commandBinder.addBinding(C.u, this.onMeshOverlayCommand.bind(this)),
              t.commandBinder.addBinding(k, this.toggleMeshOverlayColor.bind(this)),
              t.commandBinder.addBinding(T.U, this.onSetChunkRenderStateCommand.bind(this)),
              t.commandBinder.addBinding(O, this.onPanoOverlayCommand.bind(this)),
            ),
            t.broadcast(new c.em(u.Y.ModelMesh)),
            t.broadcast(new c.em(u.Y.StreamingMesh)),
            t.broadcast(new c.em(u.Y.StreamingTexture));
        }
        onUpdate(e) {
          this.chunkVisibilityChecker && this.chunkVisibilityChecker.update(),
            this.meshTextureLoader && !Z.ZP.debugPauseTexStream && this.meshTextureLoader.update(e),
            this.meshGroupVisuals.meshTextureOpacity.active &&
              (this.viewmodeData.transition.active
                ? (this.meshGroupVisuals.meshTextureOpacity.updateProgress(
                    this.viewmodeData.transition.progress,
                  ),
                  this.meshGroupVisuals.meshTextureOpacity.commit())
                : (this.meshGroupVisuals.meshTextureOpacity.tick(e),
                  this.meshGroupVisuals.meshTextureOpacity.commit()));
          const t = performance.now() / 1e3;
          this.meshes.forEach((i) => {
            for (const e of i.modelMesh.chunks) e.setTime(t);
            i.modelMesh.onUpdate(e);
          });
        }
        dispose(e) {
          super.dispose(e), this.meshTextureLoader.dispose();
          const t = (e) => {
            e.modelMesh.dispose(),
              e.roomMeshData.floors.clear(),
              e.roomMeshData.rooms.clear(),
              this.meshLoadPromises.delete(e.id);
          };
          for (const e of this.allMeshes()) t(e);
          this.meshLoadPromises.size > 0 &&
            Promise.all(this.meshLoadPromises.values()).then((e) => {
              e.forEach(t);
            });
        }
        async removeMesh(e) {
          const t =
            this.meshes.get(e) ||
            this.inactiveMeshes.get(e) ||
            (await this.meshLoadPromises.get(e)) ||
            null;
          t &&
            (await this.engine.removeComponent(this, t.renderer),
            t.modelMesh.dispose(),
            t.roomMeshData.floors.clear(),
            t.roomMeshData.rooms.clear(),
            t.modelMesh.unregisterCollision(this.input),
            this.meshes.delete(e),
            this.inactiveMeshes.delete(e),
            this.meshLoadPromises.delete(e));
        }
        async isolateMesh(e) {
          this.meshes.forEach((e) => {
            this.log.debug('hiding', e),
              this.meshes.delete(e.id),
              this.inactiveMeshes.set(e.id, e),
              e.modelMesh.unregisterCollision(this.input),
              (e.renderer.opacity = 0);
          });
          const t =
            this.meshes.get(e.sid) ||
            this.inactiveMeshes.get(e.sid) ||
            (await this.meshLoadPromises.get(e.sid)) ||
            (await this.loadMesh(e, e.sid));
          this.inactiveMeshes.has(e.sid) &&
            (this.log.debug('showing', t, e),
            this.inactiveMeshes.delete(e.sid),
            await this.engine.addComponent(this, t.renderer),
            this.meshes.set(e.sid, t),
            t.modelMesh.registerCollision(this.input),
            (t.renderer.opacity = null),
            t.renderer.beforeRender(),
            this.onUpdate(0)),
            this.inactiveMeshes.forEach((e) => {
              this.engine.removeComponent(this, e.renderer);
            });
        }
        async loadMesh(e, t) {
          const i = this.meshLoadPromises.get(t);
          if (i) return i;
          const s = (async () => {
            this.meshesLoaded++;
            const {
                engine: i,
                config: s,
                meshTrimUniforms: o,
                chunkVisibilityChecker: r,
                chunkSharedState: n,
              } = this,
              a = i.claimRenderLayer(this.name),
              h = this.isTiled(e),
              l = await this.getModelMeshFactory(h),
              d = new xe.s(),
              c = await l({
                uuid: e.uuid,
                model: e,
                renderLayer: a,
                engine: i,
                settings: Z.ZP,
                roomMeshData: d,
                chunkSharedState: n,
                chunkFactory: (t, i, s, r) => {
                  const a = e.key() || 'unknown',
                    h = new te(t, i, s, n, r, a, !0);
                  if (o) {
                    const e = o.getSharedFloorUniforms(t);
                    h.setMaterialsUniform(e);
                  }
                  return h;
                },
                chunkVisibilityChecker: r,
                gltfConfig: s.gltfConfig,
              }),
              u = c.initTextureLoader(this.meshTextureLoader, e.textures),
              m = await i.market.waitForData(v.Z),
              p = this.makeMeshData(c.chunks, m);
            1 === this.meshesLoaded &&
              (this.raycasterModule.setupOctree(c.boundingBox),
              this.market.register(this, xe.s, d),
              this.market.register(this, F._, p)),
              this.setupRaycasting(c, this.input);
            const g = new le(this, this.webglScene.scene, c, c, p, m, n, s);
            await i.addComponent(this, g),
              this.setRenderModeMesh(c, g, this.getRenderMode()),
              c.overrideMaxDetail(this.getMeshDetail()),
              await u;
            return { id: t, meshData: p, modelMesh: c, roomMeshData: d, renderer: g, tiled: h };
          })();
          this.meshLoadPromises.set(t, s);
          const o = await s;
          return (
            this.meshes.set(t, o),
            1 === this.meshesLoaded && this._firstMeshLoadPromise.resolve(),
            o
          );
        }
        async getModelMeshFactory(e = !0) {
          return (
            e
              ? await Promise.all([
                  i.e(217),
                  i.e(764),
                  i.e(468),
                  i.e(648),
                  i.e(948),
                  i.e(206),
                  i.e(321),
                ]).then(i.bind(i, 85911))
              : await Promise.all([
                  i.e(217),
                  i.e(764),
                  i.e(468),
                  i.e(648),
                  i.e(948),
                  i.e(206),
                  i.e(321),
                ]).then(i.bind(i, 53596))
          ).createModelMesh;
        }
        setupRaycasting(e, t) {
          e.registerCollision(t);
        }
        setChunkSide(e) {
          const t = this.chunkSharedState.side;
          return (this.chunkSharedState.side = e), t;
        }
        stats() {
          const e = {};
          return (
            (e.textureCount = this.meshTextureLoader.textureCount),
            (e.streaming = [...this.meshes.values()].some((e) => e.tiled)),
            e
          );
        }
        getRenderMode() {
          return this._renderMode;
        }
        setRenderMode(e, t = 0, i = l.Q9) {
          for (const s of this.allMeshes())
            this.setRenderModeMesh(s.modelMesh, s.renderer, e, t, i);
          this.log.debug(`setRenderMode from ${this._renderMode} to ${e}`), (this._renderMode = e);
        }
        setMeshOptions(e) {
          var t;
          for (const i of this.allMeshes()) {
            const s = null !== (t = e.overrideMaxDetail) && void 0 !== t ? t : i.modelMesh.detail;
            i.modelMesh.overrideMaxDetail(s);
          }
        }
        getMeshDetail() {
          let e = 'default';
          return this.meshes.forEach((t) => (e = t.modelMesh.detail)), e;
        }
        setTextureLimits(e, t) {
          for (const i of this.allMeshes())
            i.modelMesh.setTextureQuality(this.meshTextureLoader, e, t);
        }
        setTextureStreamMode(e) {
          switch (e) {
            case E.l.NONE:
              this.meshTextureLoader.autoLoadTiles = !1;
              break;
            case E.l.RAYCAST:
              this.meshTextureLoader.autoLoadTiles = !0;
          }
        }
        setRenderModeMesh(e, t, i, s = 0, o = l.Q9) {
          let r = 1;
          switch (i) {
            case A.k.Hidden:
              (r = 1), (e.visible = !1);
              break;
            case A.k.Mesh:
              (r = 1), (e.visible = !0);
              break;
            case A.k.PanoramaMesh:
              (r = 0), (e.visible = !0);
              break;
            case A.k.PanoramaCube:
              (r = 0), (e.visible = !1);
              break;
            default:
              throw new Error(`unknown mode ${i}!`);
          }
          const n = this.meshGroupVisuals.meshTextureOpacity;
          return (
            (n.value === r && n.easing === o && n.duration === s) ||
              (n.modifyAnimation(n.value, r, s, o), 0 === s && t.beforeRender()),
            r
          );
        }
        initRenderMode(e, t) {
          let i = e;
          switch ((null === i && (i = t.transition.active ? t.transition.to : t.currentMode), i)) {
            case b.Ey.Dollhouse:
            case b.Ey.Floorplan:
            case b.Ey.Mesh:
              this.setRenderMode(A.k.Mesh);
              break;
            default:
              this.setRenderMode(A.k.PanoramaMesh);
          }
          this.bindings.push(
            t.transitionActiveObservable.onChanged((e) => {
              if (e) {
                const e = this.viewmodeData.transition.to === b.Ey.Panorama,
                  t = this.viewmodeData.transition.from !== b.Ey.Panorama,
                  i = e ? A.k.PanoramaMesh : A.k.Mesh,
                  s = t ? 100 : 0,
                  o = e ? l.Q9 : l.w2;
                this.setRenderMode(i, s, o);
              }
            }),
          );
        }
        makeMeshData(e, t) {
          var i;
          const o = new Map(),
            r = new Map(),
            n = new Map(),
            a = new s.Box3(),
            l = new s.Vector3();
          e.forEach((t) => {
            if ((t.geometry.boundingBox && a.union(t.geometry.boundingBox), t.geometry)) {
              const i = (0, H.bo)(t.geometry);
              n.set(t, i), l.addScaledVector(i, 1 / e.length);
            }
            o.set(t.meshGroup, (o.get(t.meshGroup) || []).concat(t)),
              r.set(t.meshSubgroup, (r.get(t.meshSubgroup) || []).concat(t));
          });
          const d = a.clone(),
            c = new s.Box3();
          t.iterate((e) => {
            e.isUnplaced() || (c.setFromCenterAndSize(e.position, h.fU.UNIT), d.union(c));
          });
          const u = new F._(
            [...a.min.toArray(), ...a.max.toArray()],
            [...d.min.toArray(), ...d.max.toArray()],
            l,
          );
          for (const [e, t] of o.entries()) {
            const o = new s.Box3(),
              a = new s.Vector3();
            t.forEach((e) => {
              e.geometry.boundingBox && o.union(e.geometry.boundingBox);
              const i = n.get(e);
              i && a.addScaledVector(i, 1 / t.length);
            }),
              u.meshGroups.floors.set(e, {
                meshGroup: e,
                boundingBox: o,
                parentMeshGroup: null,
                centerOfMass: a,
              });
            const h = [...new Set(t.map((e) => e.meshSubgroup))].sort((e, t) => t - e);
            u.meshGroups.roomsByFloor.set(e, h);
            const l = u.meshGroups.rooms;
            for (const t of h) {
              const o = new s.Box3(),
                a = new s.Vector3(),
                h = r.get(t) || [];
              h.forEach((e) => {
                e.geometry.boundingBox && o.union(e.geometry.boundingBox);
                const t = n.get(e);
                t && a.addScaledVector(t, 1 / h.length);
              });
              const d = { meshGroup: t, boundingBox: o, parentMeshGroup: e, centerOfMass: a },
                c = l.get(t);
              c
                ? (c.parentMeshGroup = Math.min(
                    null !== (i = c.parentMeshGroup) && void 0 !== i ? i : 1 / 0,
                    e,
                  ))
                : l.set(t, d);
            }
            this.meshGroupVisuals.floorOpacity.set(`${e}`, 1);
          }
          const m = [...u.meshGroups.floors.keys()].sort();
          return this.meshTrimData.addMeshGroups(m), u;
        }
        async setPreviewPosition(e) {
          const t = e.enabled && e.previewCirclePosition ? e.previewCirclePosition : null,
            i = e.size ? e.size : 0.3;
          this.meshes.forEach((e) => {
            e.modelMesh.chunks.forEach((e) => {
              e.setMeshPreviewSphere(t, i);
            });
          });
        }
        isTiled(e) {
          var t, i;
          const s =
            null !==
              (i =
                null === (t = this.engine.tryGetModuleBySymbolSync(n.Ak)) || void 0 === t
                  ? void 0
                  : t.tryGetProperty(Z.iT, !1)) &&
            void 0 !== i &&
            i;
          return !!e.tileset && s && !(0, d.Q0)();
        }
        meshTrimInit(e, t) {
          this.meshTrimUniforms = new I(this.getRenderMode() === A.k.PanoramaMesh);
          const { meshTrimsByMeshGroup: i } = e;
          this.bindings.push(
            e.onMeshGroupChanged((e) => this.meshTrimUpdate(e)),
            e.onMeshTrimChanged((e) => {
              this.meshTrimUpdate(e.meshGroup);
            }),
          ),
            i.keys.forEach((e) => {
              this.meshTrimUpdate(e);
            });
          const s = () => {
            t.setIntersectionFilter(
              e.meshTrimsById.values.some((e) => e.enabled) ? this.meshTrimFilter : null,
            );
          };
          this.bindings.push(e.onMeshTrimChanged(s)), s();
        }
        meshTrimUpdate(e) {
          const t = this.meshTrimData.getTrimsForMeshGroup(e);
          this.meshTrimUniforms.updateMeshTrimArrays(e, t);
          for (const e of this.allMeshes())
            e.modelMesh.chunks.forEach((e) => {
              e.setMaterialsUniform(this.meshTrimUniforms.getSharedFloorUniforms(e.meshGroup));
            });
        }
      }
    },
    53596: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { createModelMesh: () => S });
      var s = i(71180),
        o = i(63511),
        r = i(73943);
      class n extends r.y {
        constructor(e) {
          super(e), (this.name = 'MeshCreationException');
        }
      }
      var a = i(81396),
        h = i(28438),
        l = i(25541),
        d = i(53729);
      class c extends a.Object3D {
        constructor(e, t = o.o.ALL) {
          super(),
            (this.renderLayer = t),
            (this.roomMeshes = new l.Z((e) => e.meshSubgroup)),
            (this.boundingBox = new a.Box3()),
            (this.size = new a.Vector3()),
            (this.center = new a.Vector3()),
            (this._chunks = []),
            (this.built = !1),
            (this.name = `FloorMesh:${e}`),
            (this.meshGroup = e);
        }
        dispose() {
          this.reset(), this.roomMeshes.clear();
        }
        reset() {
          for (const e of this.roomMeshes) e.dispose(), this.remove(e);
          (this._chunks.length = 0), (this.built = !1);
        }
        addChunk(e) {
          const t = this.getOrCreateRoomMesh(e.meshSubgroup);
          this._chunks.push(e), t.addChunk(e);
        }
        build() {
          if (this.built) throw new Error('build() should only be called once');
          this.boundingBox.makeEmpty();
          for (const e of this.roomMeshes) this.add(e), this.boundingBox.union(e.boundingBox);
          (this.center = this.boundingBox.getCenter(this.center)),
            (this.size = this.boundingBox.getSize(this.size)),
            (this.built = !0);
        }
        get chunks() {
          return this._chunks;
        }
        getOrCreateRoomMesh(e) {
          let t = this.roomMeshes.get(e);
          if (!t) {
            t = new h.g(this.meshGroup, e, this.renderLayer);
            const i = new d.F(t);
            this.roomMeshes.add(t), this.add(t), this.add(i);
          }
          return t;
        }
      }
      var u = i(76871),
        m = i(53257),
        p = i(3614),
        g = i(51784);
      const y = new m.Z('dam-loader');
      class v {
        constructor(e) {
          (this.chunkFactory = e), (this.decoder = i(92011));
        }
        async load(e, t, i) {
          y.time('download');
          const s = await t.get(e, { responseType: 'arraybuffer', onProgress: i });
          return y.timeEnd('download'), this.parse(s);
        }
        parse(e) {
          y.time('parse proto');
          const t = this.decoder.binary_mesh.read(new p(e));
          y.timeEnd('parse proto'), y.time('convert to webgl');
          const i = this.convertProtobufToSceneObject(t);
          return y.timeEnd('convert to webgl'), i;
        }
        convertProtobufToSceneObject(e) {
          if (0 === e.chunk.length) return y.warn('No chunks in damfile...'), [];
          const t = new a.Matrix4();
          t.set(1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1);
          return e.chunk.map((e) => {
            const i = new a.BufferGeometry();
            i.setAttribute('position', new a.BufferAttribute(new Float32Array(e.vertices.xyz), 3)),
              e.vertices.uv.length > 0 &&
                i.setAttribute('uv', new a.BufferAttribute(new Float32Array(e.vertices.uv), 2)),
              i.setIndex(new a.BufferAttribute(new Uint32Array(e.faces.faces), 1)),
              i.applyMatrix4(t),
              i.computeBoundingBox();
            const { group: s, subgroup: o } = (0, g.xc)(e.chunk_name);
            return this.chunkFactory(s, o, i, e.material_name);
          });
        }
      }
      var f = i(65302),
        w = i(61173);
      const M = new m.Z('mesh');
      class b extends u.e {
        constructor(e, t, i = o.o.ALL, s) {
          super(),
            (this.uuid = e),
            (this.api = t),
            (this.renderLayer = i),
            (this.damMeshUrls = s),
            (this.floorMeshes = new l.Z((e) => e.meshGroup)),
            (this.built = !1),
            (this.name = `ModelMesh:${e}`),
            (this.layers.mask = i.mask);
        }
        dispose() {
          super.dispose(),
            this.floorMeshes.mapElements((e) => {
              e.dispose(), this.remove(e);
            }),
            this.floorMeshes.clear(),
            (this.built = !1);
        }
        reset() {
          this.floorMeshes.mapElements((e) => {
            e.reset(), this.remove(e);
          }),
            (this._chunks.length = 0),
            (this.built = !1);
        }
        async load(e) {
          const { roomMeshData: t } = e;
          (0, w.Q0)() && (e.chunks = []);
          let i = e.chunks
            ? e.chunks
            : await class {
                static async load(e, t, i, s, o = 0) {
                  const r = new v(t),
                    n = i[o];
                  if (!n) return Promise.reject('No suitable model file found...');
                  const a = await n.url.get();
                  return r.load(a, e, s).catch(() => this.load(e, t, i, s, ++o));
                }
              }
                .load(this.api, e.chunkFactory, this.damMeshUrls, e.onProgress)
                .catch((e) => {
                  M.error(e);
                  const t = e instanceof Error ? e.message : 'Failed to load model mesh';
                  throw new n(t);
                });
          if (0 === i.length) {
            M.warn(
              'No geometry found for model, loading faux geometry, disabling outside view-mode',
            );
            const t = new a.PlaneGeometry(5, 5, 1, 1);
            t.rotateX(-Math.PI / 2), t.computeBoundingBox();
            const s = e.chunkFactory(0, 0, t);
            s.sharedState.forEachChunkMaterial((e) => (e.visible = !1)), (i = [s]);
          }
          i.forEach((e) => {
            this.addChunk(e);
          }),
            this.build(t);
        }
        addChunk(e) {
          const t = this.getOrCreateFloorMesh(e.meshGroup);
          this._chunks.push(e), t.addChunk(e);
        }
        build(e) {
          var t, i;
          if (this.built) throw new Error('build() should only be called once');
          let s = 0,
            o = 0;
          for (const e of this.floorMeshes) {
            this.add(e);
            for (const o of e.roomMeshes)
              o.build(),
                o.geometry.boundsTree ||
                  null === (i = (t = o.geometry).computeBoundsTree) ||
                  void 0 === i ||
                  i.call(t),
                s++;
            e.build(), o++;
          }
          M.debug(`FloorMeshes: ${o} RoomMeshes: ${s} Chunks: ${this._chunks.length}`),
            this.boundingBox.makeEmpty();
          for (const e of this.floorMeshes) this.boundingBox.union(e.boundingBox);
          (this.size = this.boundingBox.getSize(this.size)),
            (this.center = this.boundingBox.getCenter(this.center)),
            (e.root = this),
            (e.floors = new Set(this.floorMeshes)),
            (e.rooms = this.roomMeshes),
            e.commit(),
            (this.built = !0);
        }
        get roomMeshes() {
          const e = new Set();
          for (const t of this.floorMeshes) for (const i of t.roomMeshes) e.add(i);
          return e;
        }
        async initTextureLoader(e, t) {
          var i;
          (i = e.textureQualityMap).reset(),
            i.registerQualities(f.V.Standard, 512, 0.048, 0.5, 'low'),
            i.registerQualities(f.V.Standard, 2048, 0.012, 0.5, 'high'),
            (e.limitMemoryUsage = !1),
            e.setModel(this, this.chunks, t),
            await e.loadAll(e.textureQualityMap.min(f.V.Standard));
        }
        registerCollision(e) {
          e.registerMesh(this, !0);
          for (const t of this.roomMeshes)
            e.registerSnappingMeshGeometry(t.name, t.geometry, { meshGroup: t.meshGroup });
        }
        unregisterCollision(e) {
          e.unregisterMesh(this);
          for (const t of this.roomMeshes) e.unregisterSnappingMeshGeometry(t.name);
        }
        setTextureQuality(e, t, i) {
          e.setQuality(t, i);
        }
        onUpdate() {}
        getOrCreateFloorMesh(e) {
          let t = this.floorMeshes.get(e);
          return t || ((t = new c(e, this.renderLayer)), this.floorMeshes.add(t), this.add(t)), t;
        }
      }
      var D = i(4763);
      const S = async function ({
        model: e,
        renderLayer: t,
        engine: i,
        chunkFactory: o,
        roomMeshData: r,
      }) {
        var n;
        const [a] = await Promise.all([i.getModuleBySymbol(D.Vs)]),
          h = e.meshUrls || [],
          l = new b(null === (n = h[0]) || void 0 === n ? void 0 : n.uuid, a.getApi(), t, h);
        return (
          await l.load({
            roomMeshData: r,
            chunkFactory: o,
            onProgress: (e) => {
              i.broadcast(new s.Zb(e.loaded, e.total));
            },
          }),
          l
        );
      };
    },
    85911: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { createModelMesh: () => J });
      var s = i(4763),
        o = i(57793),
        r = i(63511),
        n = i(15709),
        a = i(81396);
      const h = new a.Vector3(),
        l = new a.Matrix4().set(1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1),
        d = l.clone().invert();
      function c(e, t) {
        if (!1 !== t(e) && e.children) for (const i of e.children) c(i, t);
      }
      function u(e, t) {
        const { box: i, boxTransformInverse: s } = (function (e) {
          let t = m.get(e);
          if (!t) {
            const i = e.boundingVolume.box,
              s = new a.Box3(),
              o = new a.Matrix4(),
              r = new a.Vector3(i[3], i[4], i[5]),
              n = new a.Vector3(i[6], i[7], i[8]),
              h = new a.Vector3(i[9], i[10], i[11]),
              l = r.length(),
              d = n.length(),
              c = h.length();
            r.normalize(),
              n.normalize(),
              h.normalize(),
              0 === l && r.crossVectors(n, h),
              0 === d && n.crossVectors(r, h),
              0 === c && h.crossVectors(r, n),
              o
                .set(r.x, n.x, h.x, i[0], r.y, n.y, h.y, i[1], r.z, n.z, h.z, i[2], 0, 0, 0, 1)
                .invert(),
              s.min.set(-l, -d, -c),
              s.max.set(l, d, c),
              (t = { box: s, boxTransformInverse: o }),
              m.set(e, t);
          }
          return t;
        })(t);
        return h.copy(e).applyMatrix4(l).applyMatrix4(s), i.containsPoint(h);
      }
      const m = new WeakMap();
      function p(e) {
        for (var t; e; ) {
          const i = null === (t = e.extras) || void 0 === t ? void 0 : t.level;
          if ('number' == typeof i) return i;
          e = e.parent;
        }
        return -1;
      }
      var g = i(97140),
        y = i(43846),
        v = i(76871),
        f = i(71180),
        w = i(59491),
        M = i(93827),
        b = i(53257),
        D = i(23355),
        S = i(91584),
        x = i(35048),
        T = i(82854),
        C = i(1217);
      class P {
        constructor() {
          this.caches = new Map();
        }
        registerPlugin(e, t) {
          this.caches.has(e) || this.caches.set(e, new Map());
          const i = this.caches.get(e);
          e.pluginCallbacks.unshift((e) => new O(e, t, i));
        }
        unregisterLoader(e) {
          this.caches.delete(e);
        }
        unregisterAllLoaders() {
          this.caches.clear();
        }
      }
      class O {
        constructor(e, t, i) {
          (this.parser = e),
            (this.modelKey = t),
            (this.textureCache = i),
            (this.name = 'CrossModelTextureCache');
        }
        key(e) {
          return `${e} @ ${this.modelKey}`;
        }
        loadTexture(e) {
          var t;
          const i = this.textureCache,
            s = this.parser,
            o = s.json,
            r = o.textures[e];
          let n = r.source;
          Object.keys(r.extensions).forEach((e) => (n = n || r.extensions[e].source));
          const a = null === (t = o.images[n]) || void 0 === t ? void 0 : t.uri;
          if (void 0 === a) return null;
          const h = i.get(this.key(a));
          if (h) return h;
          let l = s._invokeOne((t) => (t === this ? null : t.loadTexture && t.loadTexture(e)));
          l || (l = s.loadTexture(e));
          const d = l.then((e) => {
            const t = () => {
              i.delete(this.key(a)), null == e || e.removeEventListener('dispose', t);
            };
            return null == e || e.addEventListener('dispose', t), e;
          });
          return i.set(this.key(a), d), d;
        }
      }
      var k = i(28438),
        A = i(27896);
      class E {
        constructor(e) {
          (this.parser = e), (this.name = 'MTTR_three_mesh_bvh');
        }
        async loadMesh(e) {
          const t = async (t, i) => {
              var s, o;
              const r = this.parser.json.meshes[e].primitives[i];
              if (null === (s = r.extensions) || void 0 === s ? void 0 : s.MTTR_three_mesh_bvh) {
                const e =
                    null === (o = r.extensions) || void 0 === o ? void 0 : o.MTTR_three_mesh_bvh,
                  i = {
                    roots: (await Promise.all(e.roots.map((e) => this.parser.loadAccessor(e)))).map(
                      (e) => {
                        const t = e.array;
                        return t.byteLength !== t.buffer.byteLength ? t.slice().buffer : t.buffer;
                      },
                    ),
                    index: new Uint8Array(0),
                  };
                t.geometry.boundsTree = A.r.deserialize(i, t.geometry, { setIndex: !1 });
              }
            },
            i = [],
            s = await this.loadMeshInternal(e);
          if (s)
            if ('Group' === s.type) {
              const e = s;
              i.push(...e.children.map((e, i) => t(e, i)));
            } else 'Mesh' === s.type && i.push(t(s, 0));
          return await Promise.all(i), s;
        }
        async loadMeshInternal(e) {
          const t = this.parser,
            i = t,
            s = this.parser.json.meshes[e],
            o = s.primitives,
            n = [];
          for (let e = 0, s = o.length; e < s; e++) {
            const s =
              void 0 === o[e].material
                ? t.createDefaultMaterial(i.cache)
                : t.getDependency('material', o[e].material);
            n.push(s);
          }
          return (
            n.push(t.loadGeometries(o)),
            Promise.all(n).then(function (i) {
              const n = i.slice(0, i.length - 1),
                h = i[i.length - 1],
                l = [];
              for (let i = 0, a = h.length; i < a; i++) {
                const a = h[i],
                  d = o[i];
                let c;
                const u = n[i];
                if (d.mode !== F.TRIANGLES && void 0 !== d.mode)
                  throw new Error('THREE.GLTFLoader: Primitive mode unsupported: ' + d.mode);
                (c = new k.g(0, 0, r.o.DEFAULT)),
                  (c.geometry = a),
                  (c.material = u),
                  (c.name = t.createUniqueName(s.name || 'mesh_' + e)),
                  B(c, s),
                  t.assignFinalMaterial(c),
                  l.push(c);
              }
              if (1 === l.length) return l[0];
              const d = new a.Group();
              for (let e = 0, t = l.length; e < t; e++) d.add(l[e]);
              return d;
            })
          );
        }
      }
      const F = {
        FLOAT: 5126,
        FLOAT_MAT3: 35675,
        FLOAT_MAT4: 35676,
        FLOAT_VEC2: 35664,
        FLOAT_VEC3: 35665,
        FLOAT_VEC4: 35666,
        LINEAR: 9729,
        REPEAT: 10497,
        SAMPLER_2D: 35678,
        POINTS: 0,
        LINES: 1,
        LINE_LOOP: 2,
        LINE_STRIP: 3,
        TRIANGLES: 4,
        TRIANGLE_STRIP: 5,
        TRIANGLE_FAN: 6,
        UNSIGNED_BYTE: 5121,
        UNSIGNED_SHORT: 5123,
      };
      function B(e, t) {
        void 0 !== t.extras && 'object' == typeof t.extras && Object.assign(e.userData, t.extras);
      }
      var I = i(72348),
        R = i(27067);
      class V extends I.KTX2Loader {
        constructor(e, t, i) {
          super(i), (this.urlSigner = e), (this.api = t), (this.taskCache = new WeakMap());
        }
        load(e, t, i, s) {
          const o = new a.CompressedTexture([], 0, 0, a.RGB_ETC2_Format);
          return (
            this.urlSigner(e)
              .then(async (e) => {
                const s = await this.api.get(e, {
                  onProgress: i,
                  responseType: 'arraybuffer',
                  priority: R.ru.MEDIUM,
                });
                let r = this.taskCache.get(s);
                if (!r) {
                  (r = { promise: this._createTexture(s) }), this.taskCache.set(s, r);
                }
                const n = await r.promise;
                o.copy(n), (o.needsUpdate = !0), t(o);
              })
              .catch(s),
            o
          );
        }
        preload() {
          this.init();
        }
      }
      let _;
      const L = /\gltf$/,
        N = /\glb$/;
      var z = i(17099);
      var U,
        G = i(65302);
      class j extends z.Z {
        constructor(e, t, i, s) {
          super(),
            (this.urlSigner = e),
            (this.api = t),
            (this.onProgress = s),
            (this.priorityCallback = i);
        }
        add(e, t) {
          return super.add(e, async (e) => {
            var i, s, o;
            if (null === (i = null == e ? void 0 : e.content) || void 0 === i ? void 0 : i.uri) {
              const i = e.content.uri;
              try {
                const r = null === (s = this.onProgress) || void 0 === s ? void 0 : s.bind(this, e);
                if (
                  ((e.content.uri = await this.urlSigner(i)),
                  (null === (o = e.extras) || void 0 === o ? void 0 : o.level) === G.V.Min)
                )
                  return t(e).then((e) =>
                    r
                      ? (function (e, t) {
                          if (e.ok && e.body) {
                            const i = e.body.getReader(),
                              s = e.headers.get('Content-Length');
                            let o = s ? +s : 0,
                              r = 0 !== o,
                              n = 0;
                            const a = new ReadableStream({
                              async start(e) {
                                for (;;) {
                                  const { done: s, value: a } = await i.read();
                                  if (
                                    (a && ((n += a.byteLength), e.enqueue(a)),
                                    s && ((o = n), (r = !0)),
                                    null == t ||
                                      t(
                                        new ProgressEvent('progress', {
                                          lengthComputable: r,
                                          loaded: n,
                                          total: o,
                                        }),
                                      ),
                                    s)
                                  ) {
                                    e.close();
                                    break;
                                  }
                                }
                              },
                            });
                            e = new Response(a);
                          }
                          return e;
                        })(e, r)
                      : e,
                  );
                {
                  const i = window.fetch;
                  try {
                    return (
                      (window.fetch = async (e, t) => {
                        const i = await this.api.get(e, {
                          responseType: 'blob',
                          priority: R.ru.MEDIUM,
                          onProgress: r,
                          signal: null == t ? void 0 : t.signal,
                        });
                        return new Response(i);
                      }),
                      t(e)
                    );
                  } finally {
                    window.fetch = i;
                  }
                }
              } finally {
                e.content.uri = i;
              }
            }
          });
        }
      }
      class H extends z.Z {
        constructor(e) {
          super(),
            (this.settings = e),
            (this.prioritizeBy = U.FRUSTUM_ERROR_THRESH),
            (this.priorityCallback = (e, t) => {
              switch (this.prioritizeBy) {
                case U.FRUSTUM_ERROR_THRESH:
                  return this.sortBySelectors(e, t, [
                    (e) => Number(e.__inFrustum),
                    (e) => Number(e.__error <= this.settings.errorTarget),
                    (e) => e.__error,
                    (e) => e.__distanceFromCamera,
                  ]);
                default:
                  return this.defaultPriorityCallback(e, t);
              }
            });
        }
        sortBySelectors(e, t, i) {
          for (const s of i) {
            const i = this.compareTile(e, t, s);
            if (null !== i) return i;
          }
          return 0;
        }
        compareTile(e, t, i) {
          const s = i(e),
            o = i(t);
          return s === o ? null : s > o ? 1 : -1;
        }
        defaultPriorityCallback(e, t) {
          return e.__depth !== t.__depth
            ? e.__depth > t.__depth
              ? -1
              : 1
            : e.__inFrustum !== t.__inFrustum
              ? e.__inFrustum
                ? 1
                : -1
              : e.__used !== t.__used
                ? e.__used
                  ? 1
                  : -1
                : e.__error !== t.__error
                  ? e.__error > t.__error
                    ? 1
                    : -1
                  : e.__distanceFromCamera !== t.__distanceFromCamera
                    ? e.__distanceFromCamera > t.__distanceFromCamera
                      ? -1
                      : 1
                    : 0;
        }
      }
      !(function (e) {
        (e.DEFAULT = 'DEFAULT'), (e.FRUSTUM_ERROR_THRESH = 'FRUSTUM_ERROR_THRESH');
      })(U || (U = {}));
      var Q = i(53729),
        Z = i(51784);
      const W = 3;
      class K {
        constructor(e, t, i, s, o, r, n, a) {
          (this.container = e),
            (this.threeRenderer = t),
            (this.chunkFactory = i),
            (this.tilesetInfo = s),
            (this.commandBinder = o),
            (this.api = r),
            (this.gltfConfig = n),
            (this.settings = a),
            (this.name = 'MttrTileLoader'),
            (this.log = new b.Z('3d-tiles')),
            (this.loadStats = {
              startTimes: { start: 0, tileset: 0, lod0: 0 },
              timings: { tileset: '', lod0: '' },
            }),
            (this.lodDeferreds = []),
            (this.tileProgress = new WeakMap()),
            (this.onChunksLoaded = new Set()),
            (this.onChunksUnloaded = new Set()),
            (this.tileSetLoaded = !1),
            (this.minimalLoaded = !1),
            (this.minimalTileCount = 0),
            (this.signUrl = async (e) => {
              if (e.startsWith('blob')) return e;
              return (await this.tilesetInfo.urlTemplate.get()).replace(
                this.settings.urlTemplateToken,
                e,
              );
            }),
            (this.onTileGltfDownloadProgress = (e, t) => {
              this.tileProgress.set(e, t.lengthComputable ? (0.5 * t.loaded) / t.total : 0),
                this.checkLoadStatus();
            }),
            (this.checkLoadStatus = (() => {
              const e = [];
              let t = !1,
                i = !1;
              return (0, D.P)(() => {
                (t && i) ||
                  !this.tileSetLoaded ||
                  (0 === e.length &&
                    (e.push([], []),
                    this.tilesRenderer.traverse((t, i, s) => {
                      var o;
                      const r = null === (o = t.extras) || void 0 === o ? void 0 : o.level;
                      return (0 !== r && 1 !== r) || e[r].push(t), !1;
                    }, null)),
                  t ||
                    ((t = this.notifyIfFullyLoaded(0, e, !0)),
                    t &&
                      (this.tilesRenderer.update(),
                      this.log.debug('LOD0 fully downloaded, allow showing more lods'),
                      (this.minimalLoaded = !0),
                      (this.minimalTileCount = e[0].length),
                      (this.loadStats.timings.lod0 =
                        (performance.now() - this.loadStats.startTimes.lod0).toFixed(1) + 'ms'))),
                  i || ((i = this.notifyIfFullyLoaded(1, e, !1)), i && (e.length = 0)));
              }, 16);
            })());
        }
        async init() {
          this.loadStats.startTimes.start = performance.now();
          const e = await this.signUrl(this.tilesetInfo.rootFilename);
          (this.tilesRenderer = new x.I(e)), (this.tilesRenderer.manager = new a.LoadingManager());
          const t = (function (e, t, i, s, o, r) {
            const n = new T.DRACOLoader(t);
            n.setDecoderPath(`${o.dracoDecoderPath}`), n.preload();
            const a = new C.GLTFLoader(t);
            a.setDRACOLoader(n),
              a.register((e) => new E(e)),
              _ || (_ = new P()),
              _.registerPlugin(a, r);
            const h = new V(i, s, t);
            return (
              h.setTranscoderPath(o.basisTranscoderPath),
              h.detectSupport(e),
              h.preload(),
              a.setKTX2Loader(h),
              t.removeHandler(L),
              t.addHandler(L, a),
              t.removeHandler(N),
              t.addHandler(N, a),
              a
            );
          })(
            this.threeRenderer,
            this.tilesRenderer.manager,
            this.signUrl,
            this.api,
            this.gltfConfig,
            e,
          );
          this.configureTilesRenderer(this.tilesRenderer, t);
        }
        setCamera(e, t, i) {
          this.tilesRenderer.setCamera(e), this.tilesRenderer.setResolution(e, t, i);
        }
        hasCamera(e) {
          return this.tilesRenderer.hasCamera(e);
        }
        deleteCamera(e) {
          return this.tilesRenderer.deleteCamera(e);
        }
        notifyOnChunksLoaded(e) {
          return (0, w.k1)(
            () => this.onChunksLoaded.add(e),
            () => this.onChunksLoaded.delete(e),
            !0,
          );
        }
        notifyOnChunksUnloaded(e) {
          return (0, w.k1)(
            () => this.onChunksUnloaded.add(e),
            () => this.onChunksUnloaded.delete(e),
            !0,
          );
        }
        notifyOnLodProgress(e, t) {
          this.getLodDeferred(e).progress(t);
        }
        awaitLod(e) {
          return this.getLodDeferred(e).nativePromise();
        }
        getLodDeferred(e) {
          return this.lodDeferreds[e] || (this.lodDeferreds[e] = new M.Q());
        }
        update() {
          const { minimalLoaded: e, tilesRenderer: t } = this;
          e
            ? ((t.displayActiveTiles = this.settings.displayActiveTiles),
              (t.loadSiblings = this.settings.loadSiblings),
              (t.stopAtEmptyTiles = this.settings.stopAtEmptyTiles),
              (t.autoDisableRendererCulling = this.settings.autoDisableRendererCulling),
              (t.downloadQueue.maxJobs = this.settings.downloadQueueConcurrency),
              (t.parseQueue.maxJobs = this.settings.parseQueueConcurrency))
            : ((t.loadSiblings = !0),
              (t.downloadQueue.maxJobs = 1 / 0),
              (t.parseQueue.maxJobs = 1 / 0)),
            (t.optimizeRaycast = this.settings.optimizeRaycast),
            (t.errorTarget = this.settings.errorTarget),
            (t.lruCache.maxSize = e
              ? Math.max(this.settings.lruMaxTiles, this.minimalTileCount)
              : 1 / 0),
            t.update(),
            (t.lruCache.minSize = this.settings.lruMinExtraTiles + t.lruCache.usedSet.size),
            (t.lruCache.unloadPercent = this.settings.lruUnloadPercent);
        }
        getDownloadParseStatus() {
          return this.tilesRenderer.stats;
        }
        configureTilesRenderer(e, t) {
          const i = e.calculateError.bind(e);
          (e.calculateError = (e) => {
            i(e),
              this.adjustScreenSpaceError &&
                (e.__error = this.adjustScreenSpaceError(e.__error, e));
          }),
            (e.errorTarget = this.settings.errorTarget),
            (e.loadSiblings = this.settings.loadSiblings),
            (e.stopAtEmptyTiles = this.settings.stopAtEmptyTiles),
            (e.displayActiveTiles = this.settings.displayActiveTiles);
          const s = e.preprocessNode.bind(e);
          (e.preprocessNode = function (e, t, i) {
            return s(e, t, '');
          }),
            this.configurePriorityQueues(),
            this.container.add(e.group);
          const o = new a.Quaternion().setFromAxisAngle(
            new a.Vector3(-1, 0, 0),
            a.MathUtils.degToRad(90),
          );
          this.container.quaternion.copy(o),
            this.container.updateMatrixWorld(!0),
            (e.onLoadTileSet = this.onLoadTileset.bind(this)),
            (e.onLoadModel = this.onLoadModel.bind(this)),
            (e.onDisposeModel = this.onDisposeModel.bind(this));
          const r = e.setTileActive.bind(e);
          e.setTileActive = (e, t) => {
            r(e, t), this.onTileActiveChange && this.onTileActiveChange(e, t);
          };
          const n = e.setTileVisible.bind(e);
          e.setTileVisible = (e, t) => {
            n(e, t), this.onTileVisibleChange && this.onTileVisibleChange(e, t);
          };
          const h = e.tileInView.bind(e);
          e.tileInView = (e) => {
            let t = h(e);
            return this.adjustTileInView && (t = this.adjustTileInView(t, e)), t;
          };
        }
        configurePriorityQueues() {
          const { tilesRenderer: e } = this;
          (e.downloadQueue = new j(
            this.signUrl,
            this.api,
            e.downloadQueue.priorityCallback,
            this.onTileGltfDownloadProgress,
          )),
            (e.parseQueue = new H(this.settings));
          const t = (e) => {
            this.commandBinder.issueCommand(new S._('mesh/tiled/priorityQueue', e, 100));
          };
          (e.parseQueue.schedulingCallback = t), (e.downloadQueue.schedulingCallback = t);
        }
        async onLoadModel(e, t) {
          const i = (function (e, t, i) {
            var s;
            const o = [],
              r = (null === (s = t.extras) || void 0 === s ? void 0 : s.id) || '' + e.id;
            return (
              (e.name = r),
              e.traverse((s) => {
                var n, h;
                if (((s.matrixAutoUpdate = !1), s.updateMatrix(), s instanceof k.g)) {
                  const l = new Q.F(s);
                  e.add(l);
                  const { group: d, subgroup: c, chunkIndex: u } = (0, Z.xc)(`${r}-${s.name}`),
                    m = s.material,
                    p = m.map;
                  let g = null !== (n = null == p ? void 0 : p.name) && void 0 !== n ? n : m.name;
                  (g = g.replace('.jpg', '')), p && (p.encoding = a.LinearEncoding);
                  const y = i(d, c, s.geometry, g);
                  (y.textureLODInfo =
                    (function (e, t) {
                      if (
                        t &&
                        (null == t ? void 0 : t.maxTextureSize) &&
                        (null == t ? void 0 : t.texelSize) &&
                        (null == t ? void 0 : t.textureScale) &&
                        t.textureScale > 0
                      ) {
                        const i = t.textureScale;
                        return {
                          name: e,
                          maxTexelSize: 0.001 * t.texelSize,
                          maxTextureSize: t.maxTextureSize,
                          minTexelSize: (1 / i) * t.texelSize * 0.001,
                          minTextureSize: i * t.maxTextureSize,
                          minScale: i,
                        };
                      }
                      return null;
                    })(g, t.extras) || void 0),
                    (y.lod = (null === (h = t.extras) || void 0 === h ? void 0 : h.level) || 0),
                    (y.chunkIndex = u),
                    y.notifyOnMaterialUpdated((e) => {
                      s.material = e;
                    });
                  const v = {};
                  (v.map = p),
                    s.buildWithSingleChunk(y),
                    (s.material = y.setMaterialsUniform(v)),
                    (y.name = s.name),
                    (y.embeddedTexture = v.map),
                    o.push(y);
                }
              }),
              e.matrixWorld.copy(e.matrix),
              e.matrixWorld.premultiply(d),
              e.children.forEach((e) => e.updateMatrixWorld(!0)),
              o
            );
          })(e, t, this.chunkFactory);
          for (const e of i) this.container.addChunk(e);
          for (const e of this.onChunksLoaded.values()) e(i, t);
          this.onModelLoaded && this.onModelLoaded(e, t),
            this.tileProgress.set(t, 1),
            await new Promise((e) => setTimeout(e, 0)),
            this.checkLoadStatus();
        }
        onDisposeModel(e, t) {
          e.traverse((e) => {
            if ((0, g.oR)(e)) {
              const i = e.chunks;
              if (!i) return void this.log.error('Missing chunks from RoomMesh');
              for (const e of i) this.container.removeChunk(e);
              for (const e of this.onChunksUnloaded.values()) e(i, t);
            }
          }),
            this.onModelUnloaded && this.onModelUnloaded(e, t),
            e.traverse((e) => {
              (0, g.oR)(e) && e.reset();
            });
        }
        onLoadTileset(e, t) {
          var i;
          const s = !this.tileSetLoaded;
          let o = '';
          s &&
            ((o = (performance.now() - this.loadStats.startTimes.start).toFixed(1)),
            (this.loadStats.timings.tileset = o + 'ms'));
          const r = null === (i = t.match(/[^/]*\.json/)) || void 0 === i ? void 0 : i[0];
          this.log.debug(`Tileset ${r} load${s ? `: ${o}ms` : ''}`, e),
            s && (this.loadStats.startTimes.lod0 = performance.now()),
            (this.tileSetLoaded = !0),
            this.onTilesetLoaded && this.onTilesetLoaded(e, t),
            this.tilesRenderer.update();
        }
        notifyIfFullyLoaded(e, t, i) {
          if (!t[e]) return !1;
          const s = t[e],
            o = s.filter((e) => e.__loadingState !== W),
            r = this.getLodDeferred(e);
          return (
            i && r.notify(s.reduce((e, t) => e + (this.tileProgress.get(t) || 0) / s.length, 0)),
            0 === o.length && r.resolve(),
            0 === o.length
          );
        }
      }
      var $ = i(56620),
        q = i(41492);
      class Y extends v.e {
        constructor(e, t = r.o.ALL, i) {
          super(),
            (this.uuid = e),
            (this.renderLayer = t),
            (this.chunkSharedState = i),
            (this.boundingBox = new a.Box3()),
            (this.size = new a.Vector3()),
            (this.center = new a.Vector3()),
            (this.tilesByChunkId = new Map()),
            (this.bindings = []),
            (this.roomMeshesByTile = new Map()),
            (this.activeRoomMeshes = new Set()),
            (this.visibleRoomMeshes = new Set()),
            (this.activeTiles = new Set()),
            (this.tileActiveDescendantCounts = new WeakMap()),
            (this.isActiveRoomMeshFilter = (e) => this.activeRoomMeshes.has(e)),
            (this.isActiveRoomMeshSnapFilter = (e) => {
              var t, i, s;
              const o = null === (t = e.meta) || void 0 === t ? void 0 : t.tile;
              if (o) {
                const { snappingMaxLOD: e } = this.settings,
                  t =
                    null !== (s = null === (i = o.extras) || void 0 === i ? void 0 : i.level) &&
                    void 0 !== s
                      ? s
                      : 1 / 0;
                if (
                  (t === e && (this.tileActiveDescendantCounts.get(o) || 0) > 0) ||
                  (t <= e && this.activeTiles.has(o))
                )
                  return !0;
              }
              return !1;
            }),
            (this.settings = Object.assign({}, q.t)),
            (this.maxLOD = this.settings.maxLOD),
            (this.layers.mask = t.mask),
            (this.overriddenIsTileInView = this.overriddenIsTileInView.bind(this));
        }
        dispose() {
          super.dispose(), this.bindings.forEach((e) => e.cancel()), (this.bindings = []);
        }
        async load(e, t, i, s, o, r, a, h, l, c) {
          (this.renderer = t),
            (this.cameraData = s),
            (r.root = this),
            (this.maxLOD = this.settings.maxLOD = o.maxLOD),
            (this.tileLoader = new K(
              this,
              t.threeRenderer,
              a,
              o,
              e.commandBinder,
              l,
              c,
              this.settings,
            )),
            await this.tileLoader.init(),
            this.tileLoader.setCamera(i, s.width, s.height),
            this.bindings.push(
              e.subscribe(n.a, (e) => {
                this.tileLoader.setCamera(i, e.width, e.height);
              }),
            ),
            (this.tileLoader.onModelLoaded = (e, t) => {
              let i = this.roomMeshesByTile.get(t);
              i || ((i = []), this.roomMeshesByTile.set(t, i)),
                e.traverse((e) => {
                  (e.layers.mask = this.renderLayer.mask),
                    (0, g.oR)(e) &&
                      (r.rooms.add(e),
                      i.push(e),
                      this.inputIni && this.registerMeshForCollision(this.inputIni, e, t));
                }),
                r.commit();
            }),
            (this.tileLoader.onModelUnloaded = (e, t) => {
              e.traverse((e) => {
                e instanceof k.g &&
                  (r.rooms.delete(e),
                  this.inputIni && this.unregisterMeshFromCollision(this.inputIni, e));
              }),
                r.commit(),
                this.tileLoader.onTileActiveChange(t, !1),
                this.tileLoader.onTileVisibleChange(t, !1),
                this.roomMeshesByTile.delete(t);
            }),
            (this.tileLoader.onTileActiveChange = (e, t) => {
              var i;
              const s = t ? 'add' : 'delete';
              null === (i = this.roomMeshesByTile.get(e)) ||
                void 0 === i ||
                i.forEach((e) => {
                  this.activeRoomMeshes[s](e);
                }),
                this.activeTiles[s](e);
              for (let i = e.parent; i; i = i.parent) {
                const e = this.tileActiveDescendantCounts.get(i) || 0;
                this.tileActiveDescendantCounts.set(i, e + (t ? 1 : -1));
              }
            }),
            (this.tileLoader.onTileVisibleChange = (e, t) => {
              var i;
              null === (i = this.roomMeshesByTile.get(e)) ||
                void 0 === i ||
                i.forEach((e) => {
                  this.visibleRoomMeshes[t ? 'add' : 'delete'](e);
                });
            }),
            this.initTileLodAdjustments(this.tileLoader, h),
            this.tileLoader.notifyOnLodProgress(0, (t) => {
              e.broadcast(new f.Zb(t, 1));
            }),
            this.tileLoader.notifyOnChunksLoaded((e, i) => {
              var s;
              0 === (null === (s = i.extras) || void 0 === s ? void 0 : s.level) &&
                e.forEach((e) => {
                  t.threeRenderer.initTexture(e.embeddedTexture);
                });
            }),
            this.tileLoader.update(),
            (this._detail = 'minimal'),
            await this.tileLoader.awaitLod(this.settings.initialMaxLOD),
            (this._detail = 'default'),
            this.tileLoader.tilesRenderer.getBounds(this.boundingBox),
            this.boundingBox.applyMatrix4(d),
            this.boundingBox.getSize(this.size),
            this.boundingBox.getCenter(this.center);
          const u = this.size.clone().multiplyScalar(0.5).length(),
            { smallMeshThreshold: m, smallMeshErrorMultiplier: p } = this.settings;
          u < m && (this.settings.errorTarget = Math.min(this.settings.errorTarget, u * p));
        }
        initTextureLoader(e, t) {
          return (
            (e.limitMemoryUsage = this.settings.limitMemoryUsage),
            e.setModel(this, this._chunks, t),
            this.bindings.push(
              this.tileLoader.notifyOnChunksLoaded((t) => {
                e.addChunkSlots(this, t);
                for (const e of this.onChunksLoaded.values()) e(t);
              }),
              this.tileLoader.notifyOnChunksUnloaded((t) => {
                e.removeChunks(t);
              }),
            ),
            (e.allowTextureDownload = () => {
              const { downloading: e, parsing: t } = this.tileLoader.getDownloadParseStatus();
              return 0 === e && 0 === t;
            }),
            Promise.resolve()
          );
        }
        initTileLodAdjustments(e, t) {
          e.adjustTileInView = this.overriddenIsTileInView;
          const i = this.tilesByChunkId,
            s = new Map();
          let o = 0;
          this.bindings.push(
            e.notifyOnChunksLoaded((e, t) => {
              for (const s of e) i.set(s.id, t);
            }),
            t.notifyOnNewSighting((e, t) => {
              o++;
              const r = i.get(e.id);
              if (r) {
                for (let e = r.parent; e; e = e.parent) s.set(e, o);
                c(r, (e) => !(e !== r && !u(t.point, e)) && (s.set(e, o), !0));
              }
            }),
            this.tileLoader.notifyOnChunksUnloaded((e) => {
              for (const t of e) i.delete(t.id), t.dispose();
            }),
          ),
            (e.adjustScreenSpaceError = (e, t) => {
              var i, r;
              if (1 !== this.settings.errorMultiplierRaycastOcclusion) {
                (null !== (i = s.get(t)) && void 0 !== i ? i : -1 / 0) < o - $.EJ.sightingMaxAge &&
                  (e *= this.settings.errorMultiplierRaycastOcclusion);
              }
              if (1 !== this.settings.errorMultiplierHiddenFloors) {
                (null === (r = this.roomMeshesByTile.get(t)) || void 0 === r
                  ? void 0
                  : r.some((e) =>
                      e.chunks.some((e) => e.getOpacity() > $.xx.FADE_TILE_VISIBLE_THRESHOLD),
                    )) || (e *= this.settings.errorMultiplierHiddenFloors);
              }
              return (
                p(t) < this.settings.minLOD && (e = Math.max(e, this.settings.errorTarget + 1e-10)),
                e
              );
            });
        }
        registerCollision(e) {
          (this.inputIni = e),
            this.tileLoader.tilesRenderer.forEachLoadedModel((t, i) => {
              t.traverse((t) => {
                (0, g.oR)(t) && this.registerMeshForCollision(e, t, i);
              });
            });
        }
        unregisterCollision(e) {
          this.tileLoader.tilesRenderer.forEachLoadedModel((t, i) => {
            t.traverse((t) => {
              (0, g.oR)(t) && this.unregisterMeshFromCollision(e, t);
            });
          });
        }
        addChunk(e) {
          this._chunks.push(e);
        }
        removeChunk(e) {
          const t = this._chunks.indexOf(e);
          this._chunks.splice(t, 1);
        }
        onUpdate() {
          this.settings.disableTileUpdates ||
            (this.tileLoader.tilesRenderer.setResolution(
              this.renderer.getCamera(),
              this.cameraData.width,
              this.cameraData.height,
            ),
            this.tileLoader.update(),
            this.checkDispose()),
            this.downgradeIfMemoryConstrained();
        }
        setTextureQuality(e, t, i) {
          e.setQuality(y.S.LOW, i);
        }
        get visibleChunks() {
          const e = this.visibleRoomMeshes;
          return {
            *[Symbol.iterator]() {
              for (const t of e) for (const e of t.chunks) yield e;
            },
          };
        }
        registerMeshForCollision(e, t, i) {
          e.registerMesh(t, !0, this.isActiveRoomMeshFilter),
            t.chunks[0].lod <= this.settings.snappingMaxLOD &&
              e.registerSnappingMeshGeometry(
                t.name,
                t.geometry,
                { tile: i, meshGroup: t.meshGroup },
                this.isActiveRoomMeshSnapFilter,
              );
        }
        unregisterMeshFromCollision(e, t) {
          e.unregisterMesh(t), e.unregisterSnappingMeshGeometry(t.name);
        }
        overriddenIsTileInView(e, t) {
          const i = p(t.parent);
          if ('minimal' === this._detail && -1 === i) return !0;
          let s = this.settings.nonMeshMaxLOD;
          return (
            'max' === this._detail && (s = this.settings.maxLOD),
            'minimal' === this._detail && (s = this.settings.initialMaxLOD),
            !(i >= s) && e
          );
        }
        overrideMaxDetail(e) {
          if (e !== this._detail)
            switch (((this._detail = e), this._detail)) {
              case 'minimal':
                this.setMaxLOD(0);
                break;
              case 'max':
                this.setMaxLOD(null);
                break;
              default:
                const e = this.size.length() / 2 < this.settings.smallMeshThreshold;
                this.setMaxLOD(e ? this.settings.maxLOD : this.settings.nonMeshMaxLOD);
            }
        }
        setMaxLOD(e) {
          (e = null != e ? e : this.maxLOD), (this.settings.maxLOD = e);
        }
        downgradeIfMemoryConstrained() {
          this.renderer.estimatedGPUMemoryAllocated() >
            2 ** 20 *
              (this.settings.limitMemoryUsage
                ? this.settings.allocatedMegsBeforeLimitingLod
                : 1 / 0) &&
            this.settings.maxLOD > 0 &&
            this.setMaxLOD(this.settings.maxLOD - 1);
        }
        checkDispose() {
          if (this.settings.disposeModel) {
            const e = this.tileLoader.tilesRenderer,
              t = e;
            for (const e of t.cameras) t.deleteCamera(e);
            const i = 0.001,
              s = new a.OrthographicCamera(-i, i, i, -i, i, 2 * i);
            s.position.set(0, -1e4, 0),
              s.rotation.setFromVector3(new a.Vector3(0, -1, 0)),
              s.updateMatrix(),
              s.updateMatrixWorld(),
              this.tileLoader.setCamera(s, 100, 100),
              (e.lruCache.minSize = 0),
              (e.lruCache.unloadPercent = 1),
              e.lruCache.markAllUnused(),
              e.update(),
              e.dispose(),
              this.chunkSharedState.dispose(),
              (this.settings.disableTileUpdates = !0);
          }
        }
      }
      const J = async function ({
        uuid: e,
        model: t,
        engine: i,
        renderLayer: r,
        settings: n,
        roomMeshData: a,
        chunkFactory: h,
        chunkVisibilityChecker: l,
        chunkSharedState: d,
        gltfConfig: c,
      }) {
        (n.flipDownload = !1), (n.flipUpload = !1);
        const [u, m, p] = await Promise.all([
            i.getModuleBySymbol(s.Aj),
            i.getModuleBySymbol(s.Vs),
            i.market.waitForData(o.M),
          ]),
          g = new Y(e, r, d);
        return await g.load(i, u, u.getCamera(), p, t.tileset, a, h, l, m.getApi(), c), g;
      };
    },
    19765: (e, t, i) => {
      'use strict';
      i.d(t, { dw: () => l, ef: () => h });
      var s = i(81396);
      const o = i(56620).ZP.sightingMaxAge,
        r = new s.Color();
      let n,
        a = -1;
      const h = (e, t, i) => {
          n ||
            ((n = new s.InstancedMesh(
              new s.SphereGeometry(0.005, 8, 4),
              new s.MeshBasicMaterial(),
              o,
            )),
            (n.frustumCulled = !1),
            d(n));
          const h = new s.Matrix4();
          return ({ point: s, distance: l }) => {
            const d = l / i.fovDistanceScale();
            h.makeScale(d, d, d).setPosition(s),
              n.setMatrixAt(++a % o, h),
              (n.instanceMatrix.needsUpdate = !0);
            for (let t = o; t--; )
              n.setColorAt((a - t + o) % o, r.set(e).multiplyScalar(1 - t / o));
            n.instanceColor && (n.instanceColor.needsUpdate = !0), n.parent || t.scene.add(n);
          };
        },
        l = () => {
          var e;
          n && (null === (e = n.parent) || void 0 === e || e.remove(n), d(n));
        };
      function d(e) {
        const t = new s.Matrix4().makeScale(0, 0, 0);
        for (let i = 0; i < o; i++) e.setMatrixAt(i, t);
      }
      new s.Vector4(1, 0, 0, 1),
        new s.Vector4(0, 1, 0, 1),
        new s.Vector4(0, 0, 1, 1),
        new s.Vector4(1, 1, 0, 1),
        new s.Vector4(1, 0, 1, 1),
        new s.Vector4(1, 1, 1, 1),
        new s.Vector4(0, 1, 1, 1),
        new s.Vector4(0, 0, 0, 1);
    },
    29518: (e, t, i) => {
      'use strict';
      i.d(t, { M: () => o });
      var s = i(73943);
      class o extends s.y {
        constructor(e) {
          super(e), (this.name = 'TooManyTrimsError');
        }
      }
    },
    51784: (e, t, i) => {
      'use strict';
      i.d(t, { bo: () => a, k7: () => n, ko: () => r, xc: () => o });
      var s = i(81396);
      function o(e) {
        const t = e.match(/group([0-9]+)/),
          i = e.match(/sub([0-9]+)/),
          s = e.match(/type([0-9]+)/),
          o = e.match(/mirror([0-9]+)/),
          r = e.match(/window([0-9]+)/),
          n = e.match(/chunk([0-9]+)/),
          a = e.match(/_chunk([0-9]+)/),
          h = s
            ? parseInt(s[1], 10)
            : o && !isNaN(parseInt(o[1], 10))
              ? 100
              : r && !isNaN(parseInt(r[1], 10))
                ? 101
                : 0;
        return {
          group: t ? parseInt(t[1], 10) : 0,
          subgroup: i ? parseInt(i[1], 10) : 0,
          chunkIndex: n ? parseInt(n[1], 10) : 0,
          nodeIndex: a ? parseInt(a[1], 10) : 0,
          type: h,
        };
      }
      function r(e, t = !1) {
        let i = e.getAttribute('barycentric');
        if (i) return i;
        const o = (e.getIndex() || e.getAttribute('position')).count / 3,
          r = [];
        for (let e = 0; e < o; e++) {
          const i = t ? 1 : 0;
          e % 2 == 0 ? r.push(0, 0, 1, 0, 1, 0, 1, 0, i) : r.push(0, 1, 0, 0, 0, 1, 1, 0, i);
        }
        const n = new Float32Array(r);
        return (i = new s.BufferAttribute(n, 3)), e.setAttribute('barycentric', i), i;
      }
      function n(e = 16777215 * Math.random(), t = 1) {
        const i = (function (e, t, i, s = 1) {
            const o = document.createElement('canvas');
            (o.width = t), (o.height = i);
            const r = o.getContext('2d');
            return (
              (r.fillStyle = `rgba(${(255 * e.r) | 0},${(255 * e.g) | 0},${(255 * e.b) | 0}, ${(255 * s) | 0})`),
              r.fillRect(0, 0, t, i),
              o
            );
          })(new s.Color(e), 1, 1, t),
          o = new s.CubeTexture([i, i, i, i, i, i]);
        return (o.format = s.RGBAFormat), (o.needsUpdate = !0), o;
      }
      const a = (() => {
        const e = new s.Vector3(),
          t = new s.Vector3(),
          i = new s.Vector3(),
          o = new s.Vector3(),
          r = new s.Vector3(),
          n = new s.Vector3();
        return (a) => {
          const h = new s.Vector3(),
            l = a.index,
            d = a.getAttribute('position');
          if (null != d && null != l) {
            let s = 0;
            for (let a = 0, c = l.count; a < c; a += 3) {
              const c = l.getX(a + 0),
                u = l.getX(a + 1),
                m = l.getX(a + 2);
              e.fromBufferAttribute(d, c),
                t.fromBufferAttribute(d, u),
                i.fromBufferAttribute(d, m),
                o.subVectors(i, t),
                r.subVectors(e, t),
                o.cross(r);
              const p = o.length() / 2;
              p > 0 &&
                ((s += p),
                n
                  .set(0, 0, 0)
                  .add(e)
                  .add(t)
                  .add(i)
                  .multiplyScalar((1 / 3) * p),
                h.add(n));
            }
            s > 0 ? h.multiplyScalar(1 / s) : a.boundingBox && a.boundingBox.getCenter(h);
          }
          return h;
        };
      })();
    },
    30918: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { Cursor: () => o.C, SetMouseCursorCommand: () => r.u, default: () => n });
      var s = i(933),
        o = i(945),
        r = i(74094);
      class n extends s.Y {
        constructor() {
          super(...arguments), (this.name = 'mouse-cursor'), (this.activeCursor = null);
        }
        async init(e, t) {
          (this.config = Object.assign({ classPrefix: 'cursor' }, e)),
            this.bindings.push(
              t.commandBinder.addBinding(r.u, async (e) => this.changeCursor(e.cursor)),
            );
        }
        changeCursor(e) {
          const { container: t, classPrefix: i } = this.config;
          e !== this.activeCursor &&
            (this.activeCursor && t.classList.remove(`${i}-${this.activeCursor}`),
            e && t.classList.add(`${i}-${e}`),
            (this.activeCursor = e));
        }
      }
    },
    7216: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => Re });
      var s = i(933),
        o = i(64150),
        r = i(4763),
        n = i(57793),
        a = i(90288),
        h = i(59452),
        l = i(55574),
        d = i(38063),
        c = i(32332);
      class u extends c.f {
        constructor(e) {
          super(e), (this.name = 'NavigationException');
        }
      }
      const m = {
        Locked: 'Cannot move while navigation is locked',
        InsideOnly: 'Cannot navigate between panos when not in Panorama mode',
        InvalidSweep: 'Not at a valid sweep',
        InTransition: 'Cannot move while in a transition',
        NoDestinationFound: 'Cannot move in that direction',
        InvalidMode: 'Cannot move to mode',
      };
      var p = i(79242),
        g = i(21676),
        y = i(26302),
        v = i(81396),
        f = i(29765),
        w = i(41513),
        M = i(58057),
        b = i(62900),
        D = i(74094),
        S = i(945),
        x = i(28721);
      class T {
        constructor(e, t, i, s, o, r, n, a, h, l) {
          (this.canStartTransition = e),
            (this.commandBinder = t),
            (this.input = i),
            (this.floorsViewData = s),
            (this.navigation = o),
            (this.sweepData = r),
            (this.cameraModule = n),
            (this.meshQuery = a),
            (this.doubleClickToEnter = h),
            (this.hasRoomBounds = l),
            (this.bindings = []),
            (this.cancelTransition = !1),
            (this.targetFloorId = null),
            (this.targetHitPoint = new v.Vector3()),
            (this.changeFloorPromise = null),
            (this.toggleInput = (e) => {
              this.bindings.forEach((t) => (e ? t.renew() : t.cancel()));
            }),
            (this.onRoomClick = (e, t, i) => {
              if (!this.canStartTransition()) return !1;
              if (this.changeFloorPromise) return !0;
              if (!i || !i.point) return !1;
              const s = this.meshQuery.floorIdFromObject(t);
              if (!s) return !1;
              if (!this.floorsViewData.isNavigable(s)) return this.onBackgroundClick();
              if (this.cancelTransition) return !0;
              const o = this.floorsViewData.currentFloorId;
              return 1 !== this.floorsViewData.totalFloors && s !== o
                ? (this.targetFloorId ||
                    ((this.targetFloorId = s), this.targetHitPoint.copy(i.point)),
                  !o && (this.changeFloorIfNeeded(), !0))
                : this.floorsViewData.roomSelectModeActive ||
                    this.floorsViewData.floorSelectModeActive
                  ? !!this.doubleClickToEnter || this.roomNavZoom(e, t, i)
                  : this.floorsViewData.floorSelectModeActive
                    ? ((this.cancelTransition = !1), !1)
                    : (this.navigation.focus(i.point).then(() => {
                        this.cancelTransition || this.setFocusSweep(i),
                          (this.cancelTransition = !1);
                      }),
                      !0);
            }),
            (this.roomNavZoom = (e, t, i) =>
              !i ||
              ((this.cancelTransition = !0),
              (async () => {
                this.doubleClickToEnter || (this.hasRoomBounds && (await (0, x.gw)(100))),
                  await this.changeFloorPromise,
                  await this.cameraModule.cancelTransition(),
                  await this.navigation.navigateToPanoNearIntersection(i),
                  (this.cancelTransition = !1);
              })(),
              this.commandBinder.issueCommand(new D.u(S.C.DEFAULT)),
              !0)),
            (this.onBackgroundClick = () =>
              !!this.canStartTransition() &&
              !!this.floorsViewData.showAllFloorsOption &&
              !this.targetFloorId &&
              (!!this.cancelTransition ||
                ((this.cancelTransition = !0),
                void this.cameraModule
                  .cancelTransition()
                  .then(() => this.commandBinder.issueCommand(new f.Vw(null, !1)))
                  .then(() => {
                    this.cancelTransition = !1;
                  })))),
            (this.onFloorChange = () => {
              null === this.floorsViewData.currentFloorId &&
                this.commandBinder.issueCommand(new D.u(S.C.DEFAULT));
            }),
            (this.clearFloorChange = () => {
              this.targetFloorId = null;
            }),
            (this.changeFloorIfNeeded = async () => {
              this.targetFloorId &&
                ((this.changeFloorPromise = this.commandBinder.issueCommand(
                  new f.Vw(this.targetFloorId, !1, void 0, this.targetHitPoint),
                )),
                await this.changeFloorPromise,
                (this.targetFloorId = null),
                (this.changeFloorPromise = null));
            }),
            this.bindings.push(
              this.input.registerMeshHandler(p.Rd, g.s.is(w.Pv), this.onRoomClick, { default: !0 }),
              this.input.registerUnfilteredHandler(p.Rd, this.clearFloorChange),
              this.input.registerHandler(p.Rd, this.changeFloorIfNeeded),
              this.input.registerMeshHandler(p.Rd, g.s.isType(y.i), this.onBackgroundClick, {
                default: !0,
              }),
              this.floorsViewData.makeFloorChangeSubscription(this.onFloorChange),
            ),
            h &&
              this.bindings.push(
                this.input.registerMeshHandler(p.bN, g.s.is(w.Pv), this.roomNavZoom, {
                  default: !0,
                }),
              );
        }
        async setFocusSweep(e) {
          if (!this.canStartTransition()) return;
          if (this.cancelTransition) return;
          const t = (0, M.bG)(this.sweepData, !1, e, this.meshQuery);
          t.length > 0 &&
            t[0].sweep &&
            (await this.commandBinder.issueCommand(new b.aK(t[0].sweep.id)));
        }
      }
      var C = i(3835),
        P = i(20360),
        O = i(68720),
        k = i(31971),
        A = i(69947),
        E = i(49940),
        F = i(40333),
        B = i(53257);
      const I = new B.Z('nav-input');
      class R {
        constructor(e, t, i) {
          (this.navigation = e),
            (this.inputIni = t),
            (this.insideNav = []),
            (this.insideVrNav = []),
            (this.toggleInput = (e) => {
              this.insideNav.forEach((t) => (e ? t.renew() : t.cancel()));
            }),
            (this.toggleVrInput = (e) => {
              this.insideVrNav.forEach((t) => (e ? t.renew() : t.cancel()));
            }),
            (this.registerInsideClickHandlers = (e) => [
              e.registerMeshHandler(
                p.Rd,
                g.s.is(w.Pv),
                (e, t, i) =>
                  this.tryExecuteAction(
                    (e, t) => N(e) && V(t),
                    (e, t) => V(t) && this.navigation.navigateTowardsIntersection(t),
                    e,
                    i,
                  ),
                { default: !0 },
              ),
              e.registerMeshHandler(
                p.Rd,
                g.s.isType(y.i),
                (e, t, i) =>
                  this.tryExecuteAction(
                    (e, t) => N(e) && V(t),
                    (e, t) => V(t) && this.navigation.navigateTowardsIntersection(t),
                    e,
                    i,
                  ),
                { default: !0 },
              ),
            ]),
            (this.registerVrClickHandlers = (e) => [
              e.registerMeshHandler(
                p.Rd,
                g.s.isInstanceOf(E.S),
                (e, t, i) =>
                  this.tryExecuteAction(
                    (e, t) => N(e) && V(t),
                    (e, t) => V(t) && this.navigation.navigateToPanoNearIntersection(t),
                    e,
                    i,
                  ),
                { default: !0 },
              ),
            ]),
            (this.registerWheelInput = (e) => [
              e.registerHandler(O.a, (e) =>
                this.tryExecuteAction(
                  (e) => !0,
                  (e) => {
                    if (e instanceof O.a) {
                      const t = new v.Vector3(0, 0, Math.sign(e.delta.y));
                      return !!this.navigation.navigateInLocalDirection(t);
                    }
                    return !1;
                  },
                  e,
                ),
              ),
            ]),
            (this.hotkeys = (e) => [
              e.registerHandler(k.e, (e) =>
                this.tryExecuteAction(
                  (e) => (_(e) || L(e)) && e.key in R.hotkeyDirections,
                  (e) => {
                    if (_(e)) {
                      this.continuousMovementHotkey = e.key;
                      const t = R.hotkeyDirections[e.key];
                      this.navigation.setContinuousNavigationLocalDirection(t);
                    } else
                      L(e) &&
                        e.key === this.continuousMovementHotkey &&
                        this.navigation.setContinuousNavigationLocalDirection();
                    return !1;
                  },
                  e,
                ),
              ),
            ]),
            (this.tryExecuteAction = (e, t, i, s) => {
              let o = !1;
              try {
                this.navigation.isNavigationInputAllowed() && e(i, s) && (o = t(i, s));
              } catch (e) {
                if (!(e instanceof u)) throw (I.warn(e), e);
                I.debug(e);
              }
              return o;
            }),
            this.insideVrNav.push(...this.registerVrClickHandlers(this.inputIni)),
            this.insideNav.push(
              ...this.registerInsideClickHandlers(this.inputIni),
              ...this.hotkeys(this.inputIni),
            ),
            i && this.insideNav.push(...this.registerWheelInput(this.inputIni));
        }
        get bindings() {
          return [...this.insideNav, ...this.insideVrNav];
        }
      }
      function V(e) {
        return void 0 !== e && void 0 !== e.point;
      }
      function _(e) {
        return e instanceof k.e && e.state === A.M.DOWN;
      }
      function L(e) {
        return e instanceof k.e && e.state === A.M.UP;
      }
      function N(e) {
        return e instanceof p.Rd && e.button === F.M.PRIMARY;
      }
      R.hotkeyDirections = {
        [P.R.W]: C.fU.FORWARD,
        [P.R.A]: C.fU.LEFT,
        [P.R.S]: C.fU.BACK,
        [P.R.D]: C.fU.RIGHT,
        [P.R.UPARROW]: C.fU.FORWARD,
        [P.R.DOWNARROW]: C.fU.BACK,
      };
      var z = i(31740),
        U = i(97187),
        G = i(90512),
        j = i(43017),
        H = i(25396),
        Q = i(60937),
        Z = i(70593),
        W = i(26059),
        K = i(73908);
      function $(e) {
        if (e && 'object' == typeof e && 'min' in e && 'max' in e) {
          const t = e;
          if ((0, K.u)(t.min) && (0, K.u)(t.max)) return !0;
        }
        return !1;
      }
      var q = i(49518);
      function Y(e) {
        if (e && 'object' == typeof e && 'x' in e && 'y' in e) {
          const t = e;
          return (0, q.hj)(t.x) && (0, q.hj)(t.y);
        }
        return !1;
      }
      function J(e) {
        if (e && 'object' == typeof e && 'min' in e && 'max' in e) {
          const t = e;
          if (Y(t.min) && Y(t.max)) return !0;
        }
        return !1;
      }
      var X = i(52281);
      var ee = i(43627);
      class te {
        constructor(e, t, i, s, o) {
          (this.canStartTransition = e),
            (this.pose = t),
            (this.cameraData = i),
            (this.cameraModule = s),
            (this.viewmodeData = o),
            (this.focus = this.focus.bind(this)),
            (this.focusFloorplan = this.focusFloorplan.bind(this));
        }
        async focus(e, t) {
          if (!this.canStartTransition()) return;
          let i, s, o;
          $(e)
            ? ((s = e), (i = s.getCenter(new v.Vector3())))
            : J(e)
              ? ((s = new v.Box3()),
                s.min.set(e.min.x, 0, e.min.y),
                s.max.set(e.max.x, 0, e.max.y),
                (o = new v.Box2(e.min, e.max)),
                (i = s.getCenter(new v.Vector3())))
              : ((i = e), (s = void 0));
          const { from: r, transition: n, mode: h } = null != t ? t : {};
          let { position: l, rotation: d, focalDistance: c } = this.pose;
          const u = this.pose.pitchFactor() < 0.01;
          if (
            (h !== j.Ey.Dollhouse ||
              (!u && !1 !== (null == t ? void 0 : t.forceOrtho)) ||
              (d = (0, W.Gf)(d, -55)),
            (o && J(o)) || (null == t ? void 0 : t.forceOrtho) || h === j.Ey.Floorplan)
          ) {
            if (
              (o ||
                (s &&
                  (o = new v.Box2(
                    new v.Vector2(s.min.x, s.min.z),
                    new v.Vector2(s.max.x, s.max.z),
                  )),
                !s &&
                  i &&
                  (o = new v.Box2(
                    new v.Vector2(i.x - 5, i.z - 5),
                    new v.Vector2(i.x + 5, i.z + 5),
                  ))),
              !o)
            )
              throw new Error('Floorplan mode requires a box or point');
            return this.focusFloorplan(i, o, h === j.Ey.Dollhouse);
          }
          r
            ? ((l = r), (d = (0, W.n0)(l, i)))
            : s
              ? ({
                  focalDistance: c,
                  rotation: d,
                  position: l,
                } = this.getPoseForBox({ box: s, targetRotation: d }))
              : (l = (0, W.fd)(d, i, c));
          const m = {
            pose: { position: l, rotation: d },
            transitionType: null != n ? n : a.nF.Interpolate,
            focalDistance: c,
            transitionTime: X.E.TRANSITION_TIME_DH,
            autoOrtho: u,
          };
          return this.cameraModule.moveTo(m).nativePromise();
        }
        async focusFloorplan(e, t, i) {
          i &&
            (await this.cameraModule.moveTo({
              transitionType: a.nF.OrbitTo,
              pose: {},
              autoOrtho: !0,
              targetPhi: a.Jh.Top,
            }));
          const s = (function (e, t, i, s) {
            const o = e.pose,
              r = new v.Vector3().copy(i());
            let n = null,
              a = o.focalDistance;
            const h =
                s.min.distanceTo(s.max) /
                (0, W._U)(o.position.distanceTo(r), o.projection.asThreeMatrix4(), e.width) /
                e.screenDiagonalPx,
              l = h < 0.2,
              d = h > 1.2,
              c = (l ? 0.2 + 0.1 : 1.2 - 0.1) / h;
            if (
              (t.isFloorplan() &&
                ((r.y = o.position.y),
                (a = o.focalDistance),
                (n = o.projection.clone()),
                (l || d) && ((n.elements[0] *= c), (n.elements[5] *= c))),
              t.isDollhouse() &&
                ((r.y = o.fovCorrectedPosition().y), (a = o.fovCorrectedFocalDistance()), l || d))
            ) {
              const e = o.fovCorrectedFocalDistance() / c,
                t = o.fovCorrectedPosition().y - o.fovCorrectedFocalDistance() + e;
              (r.y = t), (a = e);
            }
            return { position: r, projection: n, focalDistance: a };
          })(this.cameraData, this.viewmodeData, () => e, t);
          return this.cameraModule
            .moveTo({
              pose: { position: s.position },
              projection: s.projection ? s.projection : void 0,
              transitionType: a.nF.Interpolate,
              transitionTime: X.E.TRANSITION_TIME_ROOM,
              autoOrtho: this.cameraData.pose.autoOrtho,
              focalDistance: s.focalDistance,
            })
            .nativePromise();
        }
        getPoseForBox({ box: e, targetRotation: t }) {
          let i = this.pose;
          i.pitchFactor() < 0.01 &&
            ((i = i.clone()), i.unapplyPhiBasedFovSquish(), i.resetProjMatrix());
          const s = t || i.rotation,
            o = 35 * ee.Ue;
          (0, W.QC)(s, o);
          const r = i.aspect(),
            n = e.getCenter(new v.Vector3()),
            a = {
              targetPosition: n,
              targetRotation: s.clone(),
              angleDown: undefined,
              box: e,
              fovY: i.fovY(),
              aspectRatio: r,
            },
            h = (0, W.YN)(a),
            l = n.distanceTo(h.position);
          return { position: h.position, rotation: h.rotation, focalDistance: l };
        }
      }
      var ie = i(61565),
        se = i(71835),
        oe = i(32197),
        re = i(11250),
        ne = i(81619);
      const ae = !0,
        he = 8,
        le = 0.1,
        de = -25,
        ce = 500,
        ue = -2,
        me = 32,
        pe = 32;
      class ge {
        constructor(e, t, i, s, o) {
          (this.cameraData = e),
            (this.sweepData = t),
            (this.viewmodeModule = i),
            (this.picking = s),
            (this.issueCommand = o),
            (this.tryNavigateToPoint = async (e, t, i, s, o, r, n) => {
              const h = n ? n.slice() : [],
                l = r ? r.slice() : [];
              if (
                (h.push(ie._T()),
                h.push(ie._k()),
                l.push(this.scoreByLatitude(e, me)),
                t === a.nF.Interpolate &&
                  (0, j.Bw)(this.viewmodeModule.currentMode) &&
                  this.sweepData.currentSweep)
              ) {
                const t = this.sweepData.currentSweep,
                  i = this.sweepData.getSweep(t),
                  s = i.position.clone().sub(e).normalize();
                h.push(ie.T3(i)), l.push(se.o7(e, s));
              }
              h.push(this.withinLatitudeFilter(e)),
                h.push(this.notTooCloseFilter(e)),
                ae || h.push(this.notTooFarFilter(e)),
                l.push(se.Dv(e, ue));
              const c = this.sweepData.sortByScore(h, l),
                u = this.sweepData.currentSweepObject,
                m = new v.Vector3();
              let p = null,
                g = !1,
                y = null;
              const f = (0, j.Bw)(this.viewmodeModule.currentMode),
                w = null != o ? o : 15,
                M =
                  f && u
                    ? new Set(
                        u.neighbours
                          .filter(
                            (e) => this.sweepData.getSweep(e).position.distanceTo(u.position) < w,
                          )
                          .concat([u.id]),
                      )
                    : new Set();
              for (const o of c)
                if (this.sweepCanSeeNote(e, o.sweep)) {
                  if (((y = o.sweep), t === a.nF.Interpolate || M.has(y.id))) {
                    m.copy(e).sub(y.position).normalize(), (g = !0);
                    const o = this.getSweepToPointRotation(y.position, e, s),
                      r = this.cameraData.pose.projection.asThreeMatrix4(),
                      { width: n, height: h } = this.cameraData,
                      l = (0, re.bD)(e, y.position, o, n, h, r);
                    i && i(l),
                      (p = f
                        ? this.issueCommand(
                            new d.ju({ transition: a.nF.Interpolate, sweep: y.id, rotation: o }),
                          )
                        : this.viewmodeModule.switchToMode(j.Ey.Panorama, t, {
                            rotation: o,
                            sweepID: y.id,
                          }));
                  }
                  break;
                }
              return (
                !(!y || (!g && t === a.nF.Interpolate)) &&
                (p ||
                  (p = this.issueCommand(
                    new d.ju({
                      transition: t,
                      transitionTime: ce,
                      sweep: y.id,
                      rotation: this.getSweepToPointRotation(y.position, e, s),
                    }),
                  )),
                p && (await p),
                !0)
              );
            }),
            (this.getSweepToPointRotation = (e, t, i) => {
              const s = (0, W.n0)(e, t);
              return i && s.multiply(i), (0, oe.Z)(s);
            }),
            (this.sweepCanSeeNote = (() => {
              const e = new v.Vector3();
              return (t, i) => {
                e.copy(t).sub(i.position);
                const s = e.length();
                e.normalize();
                let o = this.picking.pick(i.position, e, w.Pv);
                return (
                  (!o || o.distance > s) && (o = this.picking.pick(t, e.negate(), w.Pv)),
                  !o || s <= o.distance
                );
              };
            })()),
            (this.notTooCloseFilter = (e) => (t) =>
              Math.abs(t.position.x - e.x) > le || Math.abs(t.position.z - e.z) > le),
            (this.notTooFarFilter = (e) => (t) => t.position.distanceTo(e) > he),
            (this.withinLatitudeFilter = (e) => (t) => {
              const i = new v.Vector3().copy(e).sub(t.position),
                s = -Math.atan(i.y / Math.sqrt(i.x * i.x + i.z * i.z)),
                o = (0, ee.Id)(de);
              return ne.zf - o < s && s < ne.uQ + o;
            }),
            (this.scoreByLatitude = (() => {
              const e = new v.Vector3();
              return (t, i) => (s) => {
                e.copy(t).sub(s.position);
                const o =
                    Math.abs(Math.atan(e.y / Math.sqrt(e.x * e.x + e.z * e.z))) / (Math.PI / 2),
                  r = Math.floor(20 * o) / 20;
                return i * (1 - r);
              };
            })()),
            (this.scoreByDirection = (() => {
              const e = new v.Vector3(),
                t = new v.Vector3();
              return (i, s, o) => (r) => {
                if (Math.abs(s.dot(C.fU.UP)) > 0.75) return 0;
                t.copy(s).normalize(), e.copy(i).sub(r.position).normalize();
                return -1 * e.dot(t) * o;
              };
            })()),
            (this.scoreByFloor = (e, t) => (i) => (i.floorId === e ? t : 0));
        }
        async focusPin(e, t, i, s, o) {
          const { anchorPosition: r, stemNormal: n, stemLength: a } = e,
            h = r.clone().add(n.clone().setLength(a)),
            l = [this.scoreByDirection(h, n, pe), this.scoreByFloor(e.floorId, 32)];
          return this.focusPoint(h, t, i, s, o, l);
        }
        focus(e, t) {
          var i;
          let s;
          if ($(e)) s = e.getCenter(new v.Vector3());
          else if (J(e)) {
            const t = e.getCenter(new v.Vector2());
            s = new v.Vector3(t.x, 0, t.y);
          } else s = e;
          return this.focusPoint(
            s,
            null !== (i = null == t ? void 0 : t.transition) && void 0 !== i ? i : a.nF.Interpolate,
            void 0,
            void 0,
            void 0,
            (null == t ? void 0 : t.from) ? [se.Dv(null == t ? void 0 : t.from, 100)] : [],
            [ie.no(s, 0.25)],
          );
        }
        async focusPoint(e, t, i, s, o, r, n) {
          if (
            this.cameraData.canTransition() &&
            this.sweepData.canTransition() &&
            !(await this.tryNavigateToPoint(e, t, i, s, o, r, n))
          ) {
            if (t !== a.nF.Interpolate) return this.goToNearestSweep(e, t, i, s);
            try {
              await this.issueCommand(new U._i(U.BD.DOLLHOUSE, a.nF.Interpolate));
            } catch (o) {
              await this.goToNearestSweep(e, t, i, s);
            }
            (await this.tryNavigateToPoint(e, t, i, s, o, r, n)) ||
              (await this.goToNearestSweep(e, t, i, s));
          }
        }
        async goToNearestSweep(e, t, i, s) {
          const o = e,
            r = this.sweepData.getClosestSweep(o, !0);
          if (!r) throw new Error('Cannot find sweep closest to Mattertag disc');
          const n = this.getSweepToPointRotation(r.position, o, s),
            h = this.cameraData.pose.projection.asThreeMatrix4(),
            { width: l, height: c } = this.cameraData,
            u = (0, re.bD)(o, r.position, n, l, c, h);
          i && i(u),
            await this.issueCommand(
              new d.ju({ sweep: r.id, rotation: n, transition: t || a.nF.Interpolate }),
            );
        }
      }
      var ye = i(17785),
        ve = i(64831);
      class fe extends ve.T {
        constructor(e = 1, t = 0) {
          super(),
            (this._slowdown = !0),
            (this._initialSpeed = 0),
            (this._speed = 0),
            (this._acceleration = 1),
            (this._desiredAcceleration = 1),
            (this._jerk = 1),
            (this._maxSpeed = 1),
            (this._minSpeed = 0.05),
            (this._startValue = 0),
            (this._value = 0),
            (this._endValue = e),
            (this._delay = t);
        }
        get active() {
          return this._active;
        }
        get currentValue() {
          return this._value;
        }
        get endValue() {
          return this._endValue;
        }
        get speed() {
          return this._speed;
        }
        get isSlowingDown() {
          return this._isSlowingDown;
        }
        get maxSpeed() {
          return this._maxSpeed;
        }
        get acceleration() {
          return this._acceleration;
        }
        getProgressPercent() {
          return (this._value - this._startValue) / (this._endValue - this._startValue);
        }
        onComplete(e) {
          return (this._onComplete = e), this;
        }
        setStartValue(e) {
          return (this._startValue = e), this;
        }
        setCurrentValue(e) {
          return (this._value = e), this;
        }
        setEndValue(e) {
          return (this._endValue = e), this;
        }
        setInitialSpeed(e) {
          return (this._initialSpeed = e), this;
        }
        setMaxSpeed(e) {
          return (this._maxSpeed = e), this;
        }
        setDesiredAcceleration(e) {
          return (
            (this._desiredAcceleration = e),
            (this._jerk = 3 * Math.abs(this._desiredAcceleration - this._acceleration)),
            this
          );
        }
        activate(e) {
          return (this._active = e), this;
        }
        setAccel(e) {
          return (this._acceleration = Math.abs(e)), this;
        }
        start() {
          (this._active = !0), (this._value = this._startValue), (this._speed = this._initialSpeed);
        }
        setSlowdown(e) {
          return (this._slowdown = e), this;
        }
        tick(e) {
          if (!this._active || e <= 0) return;
          if (this._delay > 0) return void (this._delay -= e);
          e > 33 && (e = 33);
          const t = 0.001 * e,
            i = this._value,
            s = this._speed * t,
            o = (0, oe.r_)(i, this.endValue, s),
            r = this._endValue - i <= this.getSlowdownDistance(),
            n = this._slowdown && r,
            a = n ? this._minSpeed : this._maxSpeed,
            h = this.acceleration * t;
          (this._speed = (0, oe.r_)(this._speed, a, h)), (this._isSlowingDown = n);
          const l = this._desiredAcceleration,
            d = this._jerk * t;
          return (
            (this._acceleration = (0, oe.r_)(this._acceleration, l, d)),
            (this._value = o),
            o === this.endValue
              ? (this.activate(!1), this.commit(), void (this._onComplete && this._onComplete()))
              : void 0
          );
        }
        getSlowdownDistance() {
          const e = this.speed,
            t = this._acceleration,
            i = e / (0 === t ? 1e-5 : t);
          return this.speed * i + 0.5 * t * i * i;
        }
        stop(e) {
          (this._active = !1), (this._endValue = e), this.commit();
        }
      }
      var we = i(93827),
        Me = i(82863),
        be = i(2959);
      const De = new B.Z('walk');
      class Se {
        constructor(e, t, i, s, o, r, n) {
          (this.cameraPose = e),
            (this.sweepTransition = t),
            (this.sweepControl = i),
            (this.cameraControl = s),
            (this.generators = o),
            (this.navigation = r),
            (this.active = !1),
            (this.path = []),
            (this.lastQueueTime = 0),
            (this.repeatedQueueDelayMS = 150),
            (this.positionTracker = new fe().setAccel(15).setMaxSpeed(5)),
            (this.baseTransitionTime = h.ZP.camera.baseTransitionTime),
            (this.baseTransitionSpeed = h.ZP.camera.transitionSpeed),
            n.onPropertyChanged(Me.baseTransitionSpeedKey, (e) => {
              this.baseTransitionTime = e;
            });
        }
        get isActive() {
          return this.active;
        }
        get targetSweep() {
          return this.nextSweep;
        }
        setContinuousMovementDirection(e) {
          (this.continuousMovementDirection = e),
            !this.active && e && this.navigation.navigateInLocalDirection(e);
        }
        stop() {
          (this.path.length = 0),
            this.cameraControl.endExternalTransition(),
            (this.nextSweep = void 0),
            (this.active = !1),
            this.generator &&
              (this.generators.stopGenerator(this.generator), (this.generator = null));
        }
        appendNode(e, t) {
          if (!this.canQueueSweeps(e)) return Promise.resolve();
          if (!e) return Promise.resolve();
          if ((this.path.push(e), (this.lastQueueTime = Date.now()), !this.active)) {
            this.active = !0;
            const { generator: t, deferred: i } = this.createTransition();
            this.generators.startGenerator(t),
              (this.generator = t),
              (this.activePromise = i.nativePromise().then(() => {
                this.activePromise = null;
              })),
              this.positionTracker.setEndValue(this.getDistanceToSweep(e)),
              this.checkForSpeedIncrease(e);
          }
          return this.activePromise ? this.activePromise : Promise.resolve();
        }
        canQueueSweeps(e) {
          if (e && this.path.indexOf(e) >= 0) return !1;
          return (
            !(this.path.length >= 2) &&
            !(this.active && Date.now() - this.lastQueueTime < this.repeatedQueueDelayMS)
          );
        }
        attemptContinuousNavigation() {
          try {
            this.continuousMovementDirection &&
              this.navigation.navigateInLocalDirection(this.continuousMovementDirection);
          } catch (e) {
            if (!(e instanceof u || e instanceof be.f)) throw (De.warn(e), e);
            De.debug(e);
          }
        }
        createTransition() {
          const e = this,
            t = new we.Q();
          return {
            generator: function* () {
              let i = Date.now();
              e.cameraControl.beginExternalTransition();
              const s = new v.Vector3().copy(e.cameraPose.position),
                o = new v.Vector3(),
                r = new v.Vector3(),
                n = e.positionTracker;
              for (n.setMaxSpeed(5).setAccel(15); e.path.length > 0; ) {
                const t = e.path.shift();
                if (!t) {
                  e.nextSweep = void 0;
                  break;
                }
                (e.nextSweep = t), s.copy(e.cameraPose.position);
                const a = s.distanceTo(t.position);
                for (
                  n.setStartValue(0).setEndValue(a).setInitialSpeed(n.speed).activate(!0),
                    r.subVectors(t.position, s),
                    r.normalize(),
                    yield new ye.M8(
                      e.sweepControl.activateSweepUnsafe({ sweepId: t.id }).then(() => {
                        e.sweepControl.beginSweepTransition({
                          sweepId: t.id,
                          internalProgress: !1,
                        });
                      }),
                    ),
                    n.start(),
                    e.checkForSpeedIncrease(t);
                  n.active;

                ) {
                  const a = Date.now() - i,
                    h = 0 === e.path.length;
                  let l = !1,
                    d = !1;
                  if (!h) {
                    const i = e.path[0];
                    l =
                      n.endValue - n.currentValue + t.position.distanceTo(i.position) <
                      n.getSlowdownDistance();
                    const s = o.subVectors(i.position, t.position);
                    s.normalize();
                    r.dot(s) < 0.3 && (d = !0);
                  }
                  n.setSlowdown(h || l || d), n.tick(a);
                  const c = n.getProgressPercent();
                  e.cameraControl.updateCameraPosition(o.lerpVectors(s, t.position, c)),
                    e.sweepTransition.progress.modifyAnimation(c, 1, 0),
                    (i = Date.now()),
                    e.continuousMovementDirection &&
                      e.canQueueSweeps() &&
                      n.isSlowingDown &&
                      e.attemptContinuousNavigation(),
                    n.active && (yield new ye.Jj());
                }
                e.sweepControl.endSweepTransition({ sweepId: t.id });
              }
              t.resolve(), e.stop();
            },
            deferred: t,
          };
        }
        getDistanceToSweep(e) {
          return (this.nextSweep ? this.nextSweep.position : this.cameraPose.position).distanceTo(
            e.position,
          );
        }
        checkForSpeedIncrease(e) {
          const t = this.positionTracker,
            i = this.getDistanceToSweep(e),
            s = t.endValue - t.currentValue,
            o = s + i - t.getSlowdownDistance();
          if (s + i > 12) {
            const e = this.baseTransitionTime,
              i = this.baseTransitionSpeed,
              s =
                0.001 * (e + Math.log2(1 + o) * Me.TRANSITION_DISTANCE_MULTIPLIER * i) -
                t.maxSpeed / t.acceleration,
              r = o / s;
            s > 0 && t.setMaxSpeed(r).setDesiredAcceleration(3 * r);
          } else t.setMaxSpeed(5).setDesiredAcceleration(15);
        }
      }
      var xe = i(9263),
        Te = i(27163);
      class Ce {
        constructor(e, t, i, s, o, r, n) {
          (this.engine = e),
            (this.navigation = t),
            (this.settingsData = i),
            (this.cameraData = s),
            (this.cameraModule = o),
            (this.viewmodeData = r),
            (this.toolsData = n),
            (this.defaultSize = new v.Vector3().fromArray([3, 3, 3]));
        }
        async enforceLabelEditorFriendlyViewmode() {
          var e;
          let t = !0;
          await (null === (e = this.cameraData.transition.promise) || void 0 === e
            ? void 0
            : e.nativePromise());
          const i = this.determineViewmode();
          if (this.viewmodeData.currentMode !== i)
            try {
              await this.engine.commandBinder.issueCommand(
                new U._i(i === j.Ey.Dollhouse ? U.BD.DOLLHOUSE : U.BD.FLOORPLAN, a.nF.Interpolate),
              );
            } catch (e) {
              t = !1;
            }
          return t;
        }
        async navigateToLabel(e) {
          try {
            const t = this.determineViewmode();
            return (
              await this.navigation.focus(
                new v.Box3().setFromCenterAndSize(
                  new v.Vector3(0, 1, 0).add(e.position),
                  this.defaultSize,
                ),
                { floorId: e.floorId, mode: t },
              ),
              this.viewmodeData.currentMode === j.Ey.Dollhouse ||
                this.viewmodeData.currentMode === j.Ey.Floorplan
            );
          } catch (e) {
            return !1;
          }
        }
        determineViewmode() {
          const e = this.settingsData.tryGetProperty(h.eC, !1),
            t =
              this.toolsData.activeToolName === Te.w1.LABELS ||
              this.settingsData.tryGetProperty(xe.gx.LabelsDollhouse, !0),
            i = !this.viewmodeData.isDollhouseDisabled() && t ? j.Ey.Dollhouse : j.Ey.Floorplan,
            s = this.viewmodeData.currentMode;
          return e && (0, re.Eb)(this.cameraData.pose.pitchFactor())
            ? j.Ey.Floorplan
            : s === j.Ey.Floorplan || s === j.Ey.Dollhouse
              ? s
              : i;
        }
      }
      var Pe = i(7721),
        Oe = i(29956),
        ke = i(91524);
      var Ae = i(21206),
        Ee = i(55587),
        Fe = i(3626),
        Be = i(44979),
        Ie = i(24938);
      class Re extends s.Y {
        constructor() {
          super(...arguments),
            (this.name = 'navigation'),
            (this.navigationRules = [() => !0]),
            (this.navigationEnabled = !0),
            (this.inputOutside = []),
            (this.addNavigationRule = (e) => {
              -1 === this.navigationRules.indexOf(e) && this.navigationRules.push(e);
            }),
            (this.removeNavigationRule = (e) => {
              const t = this.navigationRules.indexOf(e);
              -1 !== t && this.navigationRules.splice(t, 1);
            }),
            (this.isNavigationInputAllowed = () => {
              const e = this.navigationRules.reduce((e, t) => e && t(), !0);
              return (
                !(!this.navigationEnabled || !e) ||
                (this.log.debug('Cannot move while navigation is locked', {
                  blockedByRules: !e,
                  blockedByCommand: !this.navigationEnabled,
                }),
                !1)
              );
            });
        }
        async init(e, t) {
          const { market: i } = t;
          (this.commandBinder = t.commandBinder),
            this.bindings.push(
              this.commandBinder.addBinding(d.ZK, async () => this.lockNavigation()),
              this.commandBinder.addBinding(d.Lp, async () => this.unlockNavigation()),
              this.commandBinder.addBinding(d.zs, async (e) => {
                const {
                  focusPosition: t,
                  transition: i,
                  orientationAdjust: s,
                  onSweepChosen: o,
                  neighborDistanceThreshold: r,
                } = e;
                return this.navigationPoint.focusPoint(t, i, o, s, r);
              }),
              this.commandBinder.addBinding(d.OR, async (e) => {
                const {
                  pinPosition: t,
                  transition: i,
                  orientationAdjust: s,
                  onSweepChosen: o,
                  neighborDistanceThreshold: r,
                } = e;
                return this.navigationPoint.focusPin(t, i, o, s, r);
              }),
              this.commandBinder.addBinding(d.ju, (e) =>
                this.navigateToSweep(
                  e.sweep,
                  e.rotation,
                  e.transition,
                  e.transitionTime,
                  e.transitionSpeedMultiplier,
                ),
              ),
              this.commandBinder.addBinding(
                d.Cs,
                async ({ position: e, floorId: t, viewmodeOnly: i }) =>
                  i
                    ? this.navigationLabel.enforceLabelEditorFriendlyViewmode()
                    : !(!e || !t) &&
                      this.navigationLabel.navigateToLabel({ position: e, floorId: t }),
              ),
              this.commandBinder.addBinding(d.SG, async ({ room: e }) => {
                var t, i;
                const s = this.floorsViewData
                    .getFloor(
                      null !== (t = e.floorId) && void 0 !== t ? t : this.floorsViewData.topFloorId,
                    )
                    .medianSweepHeight(),
                  o = new v.Box3(
                    new v.Vector3(e.bbox.min.x, s, e.bbox.min.y),
                    new v.Vector3(e.bbox.max.x, s, e.bbox.max.y),
                  ),
                  r = this.settingsData.tryGetProperty(Ee.dF, !1) ? j.Ey.Floorplan : j.Ey.Dollhouse,
                  n =
                    (0, re.Eb)(this.cameraData.pose.pitchFactor()) || this.viewmodeData.isInside()
                      ? r
                      : null !== (i = this.viewmodeData.currentMode) && void 0 !== i
                        ? i
                        : void 0;
                return this.focus(o, { mode: n, floorId: e.floorId });
              }),
              this.commandBinder.addBinding(d.L4, async (e) => this.navigateToPose(e.pose)),
            ),
            ([
              this.settingsData,
              this.sweepData,
              this.sweepModule,
              this.viewmodeData,
              this.viewmodeModule,
              this.cameraData,
              this.cameraModule,
              this.interactionmodeData,
              this.meshQuery,
            ] = await Promise.all([
              i.waitForData(o.e),
              i.waitForData(z.Z),
              t.getModuleBySymbol(r.l),
              i.waitForData(G.O),
              t.getModuleBySymbol(r.XT),
              i.waitForData(n.M),
              t.getModuleBySymbol(r.kg),
              i.waitForData(l.Z),
              t.getModuleBySymbol(r.hi),
            ]));
          const [s, a, c, u, m] = await Promise.all([
            t.getModuleBySymbol(r.fQ),
            i.waitForData(Z.t),
            i.waitForData(Q.c),
            i.waitForData(Be.n),
            i.waitForData(Ie.pu),
          ]);
          (this.floorsViewData = c),
            (this.navigationPoint = new ge(
              this.cameraData,
              this.sweepData,
              this.viewmodeModule,
              null == s ? void 0 : s.picking,
              t.commandBinder.issueCommand,
            )),
            (this.navigationLabel = new Ce(
              t,
              this,
              this.settingsData,
              this.cameraData,
              this.cameraModule,
              this.viewmodeData,
              a,
            ));
          const p = await t.getModuleBySymbol(r.PZ),
            g = () =>
              this.isNavigationInputAllowed() &&
              this.viewmodeData.canStartTransition() &&
              this.sweepData.canTransition(),
            y = () =>
              g() &&
              (this.viewmodeData.isDollhouse() ||
                this.viewmodeData.isFloorplan() ||
                this.viewmodeData.isOrthographic());
          (this.navigationOutside = new te(
            y,
            this.cameraData.pose,
            this.cameraData,
            this.cameraModule,
            this.viewmodeData,
          )),
            this.inputOutside.push(
              new T(
                y,
                t.commandBinder,
                p,
                c,
                this,
                this.sweepData,
                this.cameraModule,
                this.meshQuery,
                this.settingsData.tryGetProperty(h.eC, !1),
                (0, Fe.PQ)(u, this.settingsData, m.application === Ie.Mx.WORKSHOP),
              ),
            ),
            (this.inputInside = new R(this, p, !!e.enableWheel)),
            this.inputOutside.forEach((e) => this.bindings.push(...e.bindings)),
            this.bindings.push(...this.inputInside.bindings),
            this.updateInputBindings(),
            this.bindings.push(
              this.viewmodeData.makeModeChangeSubscription(() => {
                this.viewmodeData.currentMode !== j.Ey.Transition && this.updateInputBindings();
              }),
            ),
            (this.navigationWalk = new Se(
              this.cameraData.pose,
              this.sweepData.transition,
              this.sweepModule,
              this.cameraModule,
              t,
              this,
              this.settingsData,
            )),
            t.broadcast(new Pe.em(Oe.Y.Navigation));
        }
        updateInputBindings() {
          const e = this.interactionmodeData.isVR(),
            t = this.viewmodeData.isInside();
          this.inputInside.toggleInput(t && !e),
            this.inputInside.toggleVrInput(t && e),
            this.inputOutside.forEach((e) => e.toggleInput(!t));
        }
        navigateInLocalDirection(e) {
          const t = this.cameraData.pose.rotation;
          return this.navigateInDirection(e.clone().applyQuaternion(t));
        }
        setContinuousNavigationLocalDirection(e) {
          this.navigationWalk.setContinuousMovementDirection(e);
        }
        navigateTowardsIntersection(e) {
          try {
            this.navigateInDirection(e.point.clone().sub(this.cameraData.pose.position));
          } catch (e) {
            return !1;
          }
          return !0;
        }
        navigateToPanoNearIntersection(e) {
          const t = (0, M.bG)(this.sweepData, this.viewmodeData.isInside(), e, this.meshQuery),
            i = t.length > 0 ? t[0].sweep : this.sweepData.getClosestSweep(e.point, !0),
            s = h.y4[this.interactionmodeData.mode];
          if (this.viewmodeData.isInside() && i) return this.navigateToSweep(i.id, void 0, s), !0;
          if (this.viewmodeData.canSwitchViewMode(j.Ey.Panorama)) {
            const e = i ? i.id : void 0;
            return this.commandBinder.issueCommand(new U._i(U.BD.INSIDE, s, { sweepID: e })), !0;
          }
          return !1;
        }
        navigateInDirection(e) {
          if (!this.viewmodeData.isInside()) throw new u(m.InsideOnly);
          if (!this.sweepData.currentSweep) throw new u(m.InvalidSweep);
          const t = h.y4[this.interactionmodeData.mode],
            i = (0, M.Tq)(
              this.sweepData,
              e,
              this.navigationWalk.isActive ? 0.65 : void 0,
              this.navigationWalk.isActive ? this.navigationWalk.targetSweep : void 0,
            );
          if (i.length > 0 && i[0].sweep) return this.navigateToSweep(i[0].sweep.id, void 0, t);
          throw new u(m.NoDestinationFound);
        }
        async focus(e, t) {
          var i;
          if (
            !(t = Object.assign(
              { mode: this.viewmodeData.currentMode, transition: a.nF.Interpolate },
              t,
            )).mode ||
            !this.isNavigationInputAllowed()
          )
            throw new u(m.Locked);
          let s;
          if (
            (await (0, Ae.E)(this.cameraData, this.viewmodeData),
            this.cameraData.pose.autoOrtho && t.mode === j.Ey.Floorplan && (t.forceOrtho = !0),
            ((t.floorId && t.floorId !== this.floorsViewData.currentFloorId) ||
              null === this.floorsViewData.currentFloorId ||
              this.viewmodeData.isInside()) &&
              (this.viewmodeData.isInside() && this.floorsViewData.transitionToFloorInstant(null),
              this.commandBinder.issueCommand(
                new f.Vw(
                  t.floorId || this.floorsViewData.getHighestVisibleFloorId(),
                  !0,
                  X.E.TRANSITION_TIME_DH / 2,
                ),
              )),
            this.viewmodeData.isInside())
          ) {
            let o;
            if ($(e)) o = e;
            else if (J(e)) {
              const s = this.floorsViewData.floors
                .getFloor(
                  null !== (i = t.floorId) && void 0 !== i
                    ? i
                    : this.floorsViewData.getHighestVisibleFloorId(),
                )
                .medianSweepFloorHeight();
              o = new v.Box3(
                new v.Vector3(e.min.x, s, e.min.y),
                new v.Vector3(e.max.x, s, e.max.y),
              );
            }
            s = (function (e, t) {
              t || (t = (e.currentFloor || e.getFloor(e.bottomFloorId)).boundingBox);
              const i = t.min.y,
                s = t.getCenter(new v.Vector3()),
                o = t.max.clone();
              o.y = i;
              const r = s.distanceTo(o) / Math.tan((ke.oR.fov / 2) * ee.Ue),
                n = C.Hk.DOWNWARD.clone().multiply(
                  new v.Quaternion().setFromAxisAngle(C.fU.RIGHT, 45 * ee.Ue),
                ),
                a = C.fU.FORWARD.clone()
                  .applyQuaternion(n)
                  .multiplyScalar(-1 * r);
              return { position: s.clone().add(a), rotation: n };
            })(this.floorsViewData, o);
          }
          try {
            switch (t.mode) {
              case j.Ey.Panorama:
                await this.navigationPoint.focus(e, t);
                break;
              case j.Ey.Dollhouse:
                await this.viewmodeModule.switchToMode(t.mode, t.transition, s),
                  await this.navigationOutside.focus(e, t);
                break;
              case j.Ey.Floorplan:
                await this.viewmodeModule.switchToMode(t.mode, t.transition),
                  await this.navigationOutside.focus(e, t);
                break;
              default:
                throw (
                  (this.log.warn(`navigation.focus: ${t.mode} not implemented yet`),
                  new u(m.InvalidMode))
                );
            }
          } catch (i) {
            throw (this.log.debug('Unable to set focus', e, t, i), i);
          }
        }
        lockNavigation() {
          (this.navigationEnabled = !1), this.log.debug('Navigation input locked');
        }
        unlockNavigation() {
          (this.navigationEnabled = !0), this.log.debug('Navigation input unlocked');
        }
        async navigateToSweep(e, t, i, s, o) {
          const r = this.settingsData.tryGetProperty(H.gj, a.nF.Interpolate);
          let n;
          void 0 === i && (i = r);
          const h = this.sweepData.currentSweep;
          if (i === a.nF.Interpolate) {
            const t = !h || this.sweepData.isSweepAligned(h),
              s = this.sweepData.isSweepAligned(e),
              o = h !== e,
              r = !t || !s,
              n = this.viewmodeData.isInside();
            o && r && n && (i = a.nF.FadeToBlack);
          }
          if (this.viewmodeData.isInside()) {
            const r = void 0 === t && void 0 === s && void 0 === o,
              h = this.cameraData.canTransition() && this.sweepData.canTransition();
            if (
              i === a.nF.Interpolate &&
              this.sweepData.currentSweep !== e &&
              r &&
              (h || this.navigationWalk.isActive)
            ) {
              const t = this.sweepData.getSweep(e);
              n = this.navigationWalk.appendNode(t, this.sweepData.currentSweep);
            } else {
              if (!h) return this.sweepData.currentSweep;
              n = this.sweepModule.moveToSweep({
                transitionType: i,
                sweepId: e,
                rotation: t,
                transitionTime: s,
                transitionSpeedMultiplier: o,
              });
            }
          } else
            n = this.viewmodeModule.switchToMode(j.Ey.Panorama, i, { sweepID: e, rotation: t });
          return await n, this.sweepData.currentSweep;
        }
        navigateToPose(e) {
          const t = { 2: U.BD.DOLLHOUSE, 3: U.BD.FLOORPLAN },
            { sweepIndex: i, quaternion: s, mode: o } = e;
          let { panoId: r, position: n } = e;
          if (!r && void 0 !== i) {
            const e = this.sweepData.getSweepByIndex(i);
            e && (r = e.id);
          }
          if (r)
            this.commandBinder.issueCommand(
              new d.ju({ sweep: r, rotation: s, transition: a.nF.FadeToBlack }),
            );
          else {
            if (!(o in t)) throw new Error('Unknown navigation link pose: ' + JSON.stringify(e));
            this.commandBinder.issueCommand(
              new U._i(t[o], a.nF.Interpolate, { rotation: s, position: n }),
            );
          }
        }
      }
    },
    30404: (e, t, i) => {
      'use strict';
      i.d(t, { B: () => c });
      var s = i(81396),
        o = i(53462),
        r = i(43718),
        n = i(2897),
        a = i(32197),
        h = i(26059),
        l = i(68467),
        d = i(93827);
      class c extends l.Z {
        constructor(e, t, i, n, a = !1) {
          super(),
            (this.cameraPoseProxy = e),
            (this.getDefaultZoom = t),
            (this.targetProjection = new o.M()),
            (this.currentOrientation = new s.Quaternion()),
            (this.currentPosition = new s.Vector3()),
            (this.positionDelta = new s.Vector3()),
            (this.linearAccel = new s.Vector2()),
            (this.linearVelocity = new s.Vector2()),
            (this.zoomAccel = 0),
            (this.zoomVelocity = 0),
            (this.scale = 1),
            (this.maxZoom = 0),
            (this.minZoom = r.Tm),
            (this.checkBounds = a),
            (this.bounds = i.clone()),
            (this.boundsCenter = n.clone()),
            this.setupBounds(),
            (this.transition = {
              active: !1,
              startTime: 0,
              elapsed: 0,
              duration: 0,
              linearVelocity: new s.Vector2(),
              zoomVelocity: 0,
              easeOut: !1,
            });
        }
        start() {
          (this.scale = 1), (this.maxZoom = this.getDefaultZoom() * r.Ct);
        }
        setPanAcceleration(e, t = !1, i) {
          if (!this.transition.active) {
            t && this.haltVelocity(e, this.linearVelocity);
            const s = this.cameraPoseProxy.pose,
              o = s.projection.elements[0],
              r = s.projection.elements[5];
            (this.linearAccel.x = void 0 !== e.x ? e.x / o : this.linearAccel.x),
              (this.linearAccel.y = void 0 !== e.y ? e.y / r : this.linearAccel.y),
              void 0 !== i && this.linearAccel.setLength(i);
          }
        }
        setZoomAcceleration(e) {
          this.transition.active || (this.zoomAccel = e);
        }
        haltVelocity(e, t) {
          e.x && t.x && Math.sign(e.x) !== Math.sign(t.x) && (t.x = 0),
            e.y && t.y && Math.sign(e.y) !== Math.sign(t.y) && (t.y = 0);
        }
        startRotateTransition(e, t, i) {
          return Promise.resolve();
        }
        startTranslateTransition(e, t, i = !0) {
          return this.startTransition(e, 0, t.clone().multiplyScalar(r.SI), 0, i).nativePromise();
        }
        startZoomTransition(e, t, i) {
          return this.startTransition(e, 0, new s.Vector2(0, 0), t, i).nativePromise();
        }
        startTransition(e, t, i, s, o) {
          const r = new d.Q();
          return this.poseController
            ? ((this.transition.active = !0),
              (this.transition.duration = e),
              (this.transition.elapsed = 0),
              (this.transition.startTime = Date.now()),
              (this.transition.deferred = r),
              this.transition.linearVelocity.copy(i),
              (this.transition.zoomVelocity = s),
              (this.transition.easeOut = o),
              this.linearAccel.set(0, 0),
              (this.zoomAccel = 0),
              this.linearVelocity.copy(i),
              (this.zoomVelocity = s),
              this.poseController.beginExternalTransition(),
              r.promise())
            : r.resolve().promise();
        }
        stopTransition() {
          var e;
          this.transition.active &&
            (null === (e = this.poseController) || void 0 === e || e.endExternalTransition(),
            (this.transition.active = !1)),
            this.transition.deferred &&
              (this.transition.deferred.resolve(), (this.transition.deferred = void 0));
        }
        updateTransition(e, t, i) {
          this.transition.elapsed += e;
          const s = this.getTransitionScale(e);
          t &&
            (this.linearVelocity.copy(this.transition.linearVelocity).multiplyScalar(s),
            this.pan(this.linearVelocity)),
            i &&
              ((this.zoomVelocity = this.transition.zoomVelocity * s),
              this.zoom(this.zoomVelocity)),
            this.transition.elapsed >= this.transition.duration &&
              (this.stop(this.transition.easeOut), (this.transition.active = !1));
        }
        getTransitionScale(e) {
          if (this.transition.elapsed >= this.transition.duration) {
            return (this.transition.duration - (this.transition.elapsed - e)) / e;
          }
          return e / r.SI;
        }
        updateDefault(e, t, i) {
          const s = e / r.SI;
          t &&
            (this.linearVelocity.addScaledVector(this.linearAccel, s),
            this.pan(this.linearVelocity),
            this.linearVelocity.multiplyScalar(Math.pow(1 - r.O8, s))),
            i &&
              ((this.zoomVelocity = this.zoomVelocity + this.zoomAccel * s),
              this.zoom(this.zoomVelocity),
              (this.zoomVelocity *= Math.pow(1 - r.TD, s)));
        }
        update(e) {
          const t =
              this.linearAccel.length() > n.Z.epsilon || this.linearVelocity.length() > n.Z.epsilon,
            i = Math.abs(this.zoomAccel) > n.Z.epsilon || Math.abs(this.zoomVelocity) > n.Z.epsilon;
          this.transition.active ? this.updateTransition(e, t, i) : this.updateDefault(e, t, i);
        }
        stopMomentum() {
          this.transition.active || (this.linearVelocity.set(0, 0), (this.zoomVelocity = 0));
        }
        stopAcceleration() {
          this.transition.active ||
            (this.setPanAcceleration({ x: 0, y: 0 }), this.setZoomAcceleration(0));
        }
        stop(e = !1) {
          this.stopTransition(), this.stopAcceleration(), e || this.stopMomentum();
        }
        pan(e) {
          if (!this.poseController) return;
          const t = this.cameraPoseProxy.pose;
          (this.positionDelta.x = e.x),
            (this.positionDelta.y = e.y),
            (this.positionDelta.z = 0),
            this.positionDelta.applyQuaternion(t.rotation),
            this.currentPosition.copy(t.position).add(this.positionDelta),
            (this.checkBounds &&
              !this.insideBounds(this.currentPosition, t.rotation, t.projection)) ||
              this.poseController.updateCameraPosition(this.currentPosition);
        }
        zoom(e) {
          if (!this.poseController) return;
          const t = this.cameraPoseProxy.pose;
          this.targetProjection.copy(t.projection);
          const i = this.scale * (1 - e);
          if (Math.abs(i - this.scale) > n.Z.epsilon) {
            (this.targetProjection.elements[0] *= i / this.scale),
              (this.targetProjection.elements[5] *= i / this.scale);
            const s = (0, h.S3)(this.targetProjection);
            if ((e < 0 && s <= this.minZoom) || (e > 0 && s >= this.maxZoom)) return;
            if (
              this.checkBounds &&
              !this.insideBounds(t.position, t.rotation, this.targetProjection)
            )
              return;
            (this.scale = i),
              this.poseController.updateCameraProjection(this.targetProjection.clone());
          }
        }
        setupBounds() {
          (this.bounds.min.x = this.adjustBound(this.bounds.min.x, 2)),
            (this.bounds.min.y = this.adjustBound(this.bounds.min.y, 2)),
            (this.bounds.min.z = this.adjustBound(this.bounds.min.z, 2)),
            (this.bounds.max.x = this.adjustBound(this.bounds.max.x, -2)),
            (this.bounds.max.y = this.adjustBound(this.bounds.max.y, -2)),
            (this.bounds.max.z = this.adjustBound(this.bounds.max.z, -2)),
            (this.worldBounds = new s.Box3().setFromCenterAndSize(
              this.boundsCenter,
              new s.Vector3(
                this.bounds.max.x - this.bounds.min.x,
                this.bounds.max.y - this.bounds.min.y,
                this.bounds.max.z - this.bounds.min.z,
              ),
            ));
        }
        insideBounds(e, t, i) {
          return !!(0, a.cb)(e, t, i, this.worldBounds);
        }
        adjustBound(e, t) {
          return Math.sign(e + t) === Math.sign(e) ? e + t : 0;
        }
      }
    },
    24213: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => D });
      var s,
        o = i(81396),
        r = i(30404),
        n = i(43718),
        a = i(40333),
        h = i(20360),
        l = i(69947),
        d = i(43017),
        c = i(87549),
        u = i(68720),
        m = i(95840),
        p = i(58724),
        g = i(31971),
        y = i(67108),
        v = i(32197),
        f = i(4763),
        w = i(57793),
        M = i(3433),
        b = i(64150);
      !(function (e) {
        (e[(e.NONE = a.r.NONE)] = 'NONE'),
          (e[(e.PAN = a.r.PRIMARY)] = 'PAN'),
          (e[(e.ROTATE = a.r.SECONDARY)] = 'ROTATE'),
          (e[(e.ZOOM = a.r.MIDDLE)] = 'ZOOM');
      })(s || (s = {}));
      class D extends M.Z {
        constructor() {
          super(...arguments),
            (this.name = 'orthographic-controls'),
            (this.controlState = s.NONE),
            (this.controlsEngaged = !1),
            (this.movementKeys = new o.Vector2()),
            (this.resetControlState = () => {
              this.controlState = s.NONE;
            });
        }
        async init(e, t) {
          const [i, s, o, r, a] = await Promise.all([
            t.market.waitForData(y._),
            t.getModuleBySymbol(f.kg),
            t.getModuleBySymbol(f.Ng),
            t.market.waitForData(w.M),
            t.market.waitForData(b.e),
          ]);
          (this.meshData = i),
            (this.cameraModule = s),
            (this.modelSize = Math.max(i.extendedSize.length(), 1)),
            (this.commonControlsModule = o),
            this.createCameraControls(i, r, a),
            this.registerActiveStateChangeBinding(),
            t.getModuleBySymbol(f.PZ).then((e) => {
              this.inputBindings.push(
                e.registerHandler(u.a, (e) => {
                  this.onScrollWheel(e);
                }),
              ),
                this.inputBindings.push(
                  e.registerHandler(m.E0, (e) => {
                    this.onDragBegin(e.buttons);
                  }),
                ),
                this.inputBindings.push(
                  e.registerHandler(m._t, (e) => {
                    (this.controlsEngaged = !0),
                      this.onDrag(e.delta),
                      this.controls.update(n.SI),
                      this.controls.stop();
                  }),
                ),
                this.inputBindings.push(
                  e.registerHandler(m._R, (e) => {
                    this.controlsEngaged &&
                      (e.timeSinceLastMove < 100 &&
                        (this.onDrag(e.delta),
                        this.controls.update(n.SI),
                        this.controls.stopAcceleration()),
                      this.onDragEnd(e.delta, e.buttons),
                      (this.controlsEngaged = !1));
                  }),
                ),
                this.inputBindings.push(
                  e.registerHandler(p.G, (e) => {
                    this.controls.setZoomAcceleration(-e.pinchDelta * n.N4),
                      this.controls.update(n.SI),
                      this.controls.stop();
                  }),
                ),
                this.inputBindings.push(e.registerHandler(p.i, this.resetControlState)),
                this.inputBindings.push(
                  e.registerHandler(g.e, (e) => {
                    e.state !== l.M.PRESSED && this.onKey(e);
                  }),
                ),
                this.updateInputBindings();
            }),
            this.bindings.push(
              t.subscribe(c.Z, (e) => {
                this.controls.isActive && this.controls.start();
              }),
            );
        }
        onUpdate(e) {
          this.controls.isActive && this.controls.update(e);
        }
        createCameraControls(e, t, i) {
          const s = this.commonControlsModule.cameraPoseProxy,
            o = t.defaultZoom.bind(t);
          (this.controls = new r.B(s, o, e.extendedBounds, e.meshCenter, !0)),
            this.commonControlsModule.addControls(d.Ey.Orthographic, this.controls);
        }
        onActiveStateChanged() {
          super.onActiveStateChanged(), this.resetControlState();
        }
        onScrollWheel(e) {
          if (0 !== e.delta.y) {
            const t = (0, v.et)(this.modelSize, 1, 1500, 2, 0.125);
            this.controls.setZoomAcceleration((e.delta.y * n.jX) / (t * n.mP)),
              this.controls.update(n.SI),
              this.controls.setZoomAcceleration(0);
          }
        }
        onDragBegin(e) {
          if (this.controlState === s.NONE) {
            const t = e;
            this.controlState = t;
          }
          this.controls.stop();
        }
        onDrag(e) {
          switch (this.controlState) {
            case s.PAN:
              const t = e;
              this.controls.setPanAcceleration({ x: -t.x, y: -t.y });
              break;
            case s.ZOOM:
              0 !== e.y && this.controls.setZoomAcceleration(-e.y);
          }
        }
        onDragEnd(e, t) {
          t & this.controlState || (this.controlState = s.NONE);
        }
        onKey(e) {
          const { key: t, state: i } = e,
            s = i === l.M.DOWN;
          let o = !1;
          switch (t) {
            case h.R.A:
              (this.movementKeys.x = s ? -1 : 0), (o = !0);
              break;
            case h.R.D:
              (this.movementKeys.x = s ? 1 : 0), (o = !0);
              break;
            case h.R.W:
              (this.movementKeys.y = s ? 1 : 0), (o = !0);
              break;
            case h.R.S:
              (this.movementKeys.y = s ? -1 : 0), (o = !0);
              break;
            case h.R.K:
              this.controls.setZoomAcceleration(s ? n.Gu : 0);
              break;
            case h.R.I:
              this.controls.setZoomAcceleration(s ? -n.Gu : 0);
          }
          if (o) {
            const e = this.movementKeys;
            this.controls.setPanAcceleration({ x: e.x, y: e.y }, !1, n.bC);
          }
        }
      }
    },
    81619: (e, t, i) => {
      'use strict';
      i.d(t, { O8: () => a, SI: () => o, WI: () => h, uQ: () => r, zf: () => n });
      var s = i(43627);
      const o = 1e3 / 60,
        r = (0, s.Id)(70),
        n = -r,
        a = 0.05,
        h = 0.1 / 60;
    },
    56253: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => S, lookAccelerationKey: () => D });
      var s = i(81396),
        o = i(3835),
        r = i(81619),
        n = i(2897),
        a = i(96783),
        h = i(68467),
        l = i(93827);
      class d extends h.Z {
        constructor(e) {
          super(),
            (this.cameraPoseProxy = e),
            (this.lookVelocity = new s.Vector2()),
            (this.lookAccel = new s.Vector2()),
            (this.tempAxis = new s.Vector3()),
            (this.tempOrientation = new s.Quaternion()),
            (this.currentOrientation = new s.Quaternion()),
            (this.tempEuler = new s.Euler()),
            (this.transition = {
              active: !1,
              startTime: 0,
              elapsed: 0,
              duration: 0,
              velocity: new s.Vector2(),
              easeOut: !1,
            });
        }
        setController(e) {
          return null == e && this.stop(), super.setController(e);
        }
        setLookAcceleration(e, t = !1) {
          this.transition.active ||
            (t &&
              (e.x &&
                this.lookVelocity.x &&
                Math.sign(e.x) !== Math.sign(this.lookVelocity.x) &&
                (this.lookVelocity.x = 0),
              e.y &&
                this.lookVelocity.y &&
                Math.sign(e.y) !== Math.sign(this.lookVelocity.y) &&
                (this.lookVelocity.y = 0)),
            (this.lookAccel.x = void 0 !== e.x ? e.x : this.lookAccel.x),
            (this.lookAccel.y = void 0 !== e.y ? e.y : this.lookAccel.y));
        }
        startTransition(e, t, i) {
          var s;
          const o = new l.Q();
          return (
            (this.transition.active = !0),
            (this.transition.duration = e),
            (this.transition.elapsed = 0),
            (this.transition.startTime = Date.now()),
            (this.transition.deferred = o),
            this.transition.velocity.copy(t),
            (this.transition.easeOut = i),
            this.lookAccel.set(0, 0),
            this.lookVelocity.copy(t),
            null === (s = this.poseController) || void 0 === s || s.beginExternalTransition(),
            o.promise()
          );
        }
        stopTransition() {
          var e;
          this.transition.active &&
            (null === (e = this.poseController) || void 0 === e || e.endExternalTransition(),
            (this.transition.active = !1)),
            this.transition.deferred &&
              (this.transition.deferred.resolve(), (this.transition.deferred = void 0));
        }
        updateTransition(e) {
          const t = e / r.SI;
          if (
            (this.lookVelocity.copy(this.transition.velocity),
            (this.transition.elapsed += e),
            this.transition.elapsed >= this.transition.duration)
          ) {
            const t = this.transition.duration - (this.transition.elapsed - e);
            this.lookVelocity.multiplyScalar(t / e);
          } else this.lookVelocity.multiplyScalar(t);
        }
        updateCameraParameters() {
          var e;
          const t = this.cameraPoseProxy.pose;
          this.tempEuler.setFromQuaternion(t.rotation, 'YXZ');
          const i = this.tempEuler.x,
            s = (0, a.uZ)(this.lookVelocity.y, r.zf - i, r.uQ - i);
          this.tempAxis.copy(o.fU.RIGHT),
            this.tempOrientation.setFromAxisAngle(this.tempAxis.applyQuaternion(t.rotation), s),
            this.currentOrientation.copy(t.rotation).premultiply(this.tempOrientation),
            this.tempOrientation.setFromAxisAngle(o.fU.UP, this.lookVelocity.x),
            this.currentOrientation.premultiply(this.tempOrientation),
            t.rotation.equals(this.currentOrientation) ||
              (this.tempOrientation.copy(this.currentOrientation).normalize(),
              null === (e = this.poseController) ||
                void 0 === e ||
                e.updateCameraRotation(this.tempOrientation));
        }
        update(e) {
          const t = this.cameraPoseProxy.pose,
            i = e / r.SI;
          t.rotation.equals(this.currentOrientation) || this.currentOrientation.copy(t.rotation),
            this.transition.active
              ? (this.updateTransition(e),
                this.updateCameraParameters(),
                this.transition.elapsed >= this.transition.duration &&
                  (this.stop(this.transition.easeOut), (this.transition.active = !1)))
              : (this.lookAccel.length() > n.Z.epsilon ||
                  this.lookVelocity.length() > n.Z.epsilon) &&
                (this.lookVelocity.addScaledVector(this.lookAccel, i),
                this.updateCameraParameters(),
                this.lookVelocity.multiplyScalar(Math.pow(1 - r.O8, i)));
        }
        stop(e = !1) {
          this.stopTransition(), this.lookAccel.set(0, 0), e || this.lookVelocity.set(0, 0);
        }
        startRotateTransition(e, t, i) {
          return (
            this.beforeStartRotationTransition && this.beforeStartRotationTransition(),
            this.startTransition(e, t.clone().multiplyScalar(r.SI), i).nativePromise()
          );
        }
        startTranslateTransition(e, t, i = !0) {
          throw new Error("Panning isn't supported in Panorama Controls");
        }
        startZoomTransition(e, t, i) {
          throw new Error("Zooming isn't supported in Panorama Controls");
        }
      }
      var c = i(55574),
        u = i(43017),
        m = i(40333),
        p = i(20360),
        g = i(69947),
        y = i(95840),
        v = i(31971),
        f = i(64150),
        w = i(4763),
        M = i(57793),
        b = i(3433);
      const D = 'Rotation speed';
      class S extends b.Z {
        constructor() {
          super(...arguments),
            (this.name = 'panorama-controls'),
            (this.controlsEngaged = !1),
            (this.lookAccelerationSpeed = r.WI),
            (this.calcRotationAngle = (() => {
              const e = new s.Matrix4(),
                t = new s.Vector3(),
                i = new s.Vector3();
              return (o, r) => {
                e.copy(this.cameraData.pose.projection.asThreeMatrix4()),
                  e.invert(),
                  t.set(o.x - r.x, o.y - r.y, -1).applyMatrix4(e),
                  i.set(o.x, o.y, -1).applyMatrix4(e);
                const n = Math.sqrt(t.x * t.x + t.z * t.z),
                  a = Math.sqrt(i.x * i.x + i.z * i.z),
                  h = Math.atan2(t.y, n),
                  l = Math.atan2(i.y, a) - h;
                (t.y = 0), (i.y = 0), t.normalize(), i.normalize();
                const d = Math.acos(t.dot(i));
                let c = 0;
                return isNaN(d) || ((c = d), r.x > 0 && (c *= -1)), new s.Vector2(-c, -l);
              };
            })());
        }
        async init(e, t) {
          const i = await t.getModuleBySymbol(w.Ng);
          (this.controls = new d(i.cameraPoseProxy)),
            (this.cameraData = await t.market.waitForData(M.M));
          const s = this.cameraData;
          (this.controls.beforeStartRotationTransition = () => {
            s.transition &&
              s.transition.activeInternal &&
              s.transition.to.rotation &&
              (s.transition.to.rotation = void 0);
          }),
            i.addControls(u.Ey.Panorama, this.controls),
            i.addControls(u.Ey.Mesh, this.controls),
            (this.market = t.market),
            this.registerActiveStateChangeBinding(),
            t.getModuleBySymbol(w.PZ).then((e) => {
              e.registerHandler(y.E0, (e) => {
                this.shouldBeActive() && this.controls.stop();
              }),
                e.registerHandler(y._t, (e) => {
                  this.shouldBeActive() &&
                    e.buttons & m.r.PRIMARY &&
                    ((this.controlsEngaged = !0),
                    this.onDrag(e.position, e.delta),
                    this.controls.update(r.SI),
                    this.controls.stop());
                }),
                e.registerHandler(y._R, (e) => {
                  this.shouldBeActive() &&
                    this.controlsEngaged &&
                    (e.timeSinceLastMove < 100 &&
                      !(e.buttons & m.r.PRIMARY) &&
                      (this.onDrag(e.position, e.delta),
                      this.controls.update(r.SI),
                      this.controls.setLookAcceleration({ x: 0, y: 0 })),
                    (this.controlsEngaged = !1));
                }),
                e.registerHandler(v.e, (e) => {
                  this.shouldBeActive() && this.onKey(e.key, e.state);
                }),
                this.updateInputBindings();
            });
        }
        onUpdate(e) {
          this.shouldBeActive() && this.controls.update(e);
        }
        onDrag(e, t) {
          this.controls.setLookAcceleration(this.calcRotationAngle(e, t));
        }
        onKey(e, t) {
          var i, s;
          const o =
            null !==
              (s =
                null === (i = this.market.tryGetData(f.e)) || void 0 === i
                  ? void 0
                  : i.tryGetProperty(D, null)) && void 0 !== s
              ? s
              : null;
          this.lookAccelerationSpeed = o ? (o * (Math.PI / 180)) / 60 : this.lookAccelerationSpeed;
          const r = t === g.M.DOWN;
          switch (e) {
            case p.R.LEFTARROW:
            case p.R.J:
              this.controls.setLookAcceleration({ x: r ? this.lookAccelerationSpeed : 0 }, !0);
              break;
            case p.R.RIGHTARROW:
            case p.R.L:
              this.controls.setLookAcceleration({ x: r ? -this.lookAccelerationSpeed : 0 }, !0);
              break;
            case p.R.K:
              this.controls.setLookAcceleration({ y: r ? -this.lookAccelerationSpeed : 0 }, !0);
              break;
            case p.R.I:
              this.controls.setLookAcceleration({ y: r ? this.lookAccelerationSpeed : 0 }, !0);
          }
        }
        shouldBeActive() {
          var e, t;
          return (
            null !==
              (t = !(null === (e = this.market.tryGetData(c.Z)) || void 0 === e
                ? void 0
                : e.isVR())) &&
            void 0 !== t &&
            t
          );
        }
      }
    },
    67944: (e, t, i) => {
      'use strict';
      i.d(t, { q: () => d });
      var s = i(42141),
        o = i(42896),
        r = i(53257),
        n = i(91033),
        a = i(83468),
        h = i(61173);
      const l = new r.Z('plugin-ui-data');
      class d extends s.V {
        constructor(e) {
          var t;
          super(),
            (this.parentMainDiv = e),
            (this.name = 'plugin-ui-data'),
            (this.overlayRoot = document.createElement('div')),
            (this.overlayRootAppended = !1),
            (this.pluginOverlayElements = new o.v()),
            (this.subs = []),
            (this.mobile = (0, h.tq)()),
            (this.watchedElement =
              null !== (t = this.parentMainDiv.getElementsByTagName('canvas')[0]) && void 0 !== t
                ? t
                : this.parentMainDiv),
            (this.createOverlayRoot = () => {
              this.overlayRootAppended ||
                (this.parentMainDiv.appendChild(this.overlayRoot),
                (this.overlayRootAppended = !0),
                (this.grid = a.E1.init(
                  {
                    column: 16,
                    margin: 0,
                    float: !0,
                    animate: !1,
                    row: 16,
                    alwaysShowResizeHandle: !0,
                    resizable: { handles: 'se, sw' },
                    children: [{ x: 0, y: 0, w: 4, h: 2, locked: !0, noMove: !0, noResize: !0 }],
                  },
                  this.overlayRoot,
                )),
                (this.resizeObserver = new n.Z(this.resizeHandler)),
                this.resizeObserver.observe(this.watchedElement));
            }),
            this.overlayRoot.classList.add('plugin-root-element', 'grid-stack'),
            this.initOverlayListeners(),
            (this.resizeHandler = this.handleResize.bind(this));
        }
        handleResize(e = []) {
          if (!e.length) return;
          const t = Math.floor(this.overlayRoot.clientHeight / 16);
          this.grid.cellHeight(t),
            (this.overlayRoot.style.width = `${this.watchedElement.clientWidth}px`);
        }
        registerOverlay(e, t, i) {
          this.pluginOverlayElements.set(e, t),
            i &&
              (this.grid
                ? this.grid.addWidget(t)
                : l.warn('tried to register an overlay, but gridstack not initialized yet'));
        }
        createOverlay(e, t = !1) {
          const i = document.createElement('div');
          return (
            i.classList.add('plugin-overlay'),
            i.classList.add(e),
            t &&
              (i.classList.add('grid-stack-item'),
              i.setAttribute('gs-min-w', this.mobile ? '2' : '1'),
              i.setAttribute('gs-min-h', this.mobile ? '2' : '1')),
            this.registerOverlay(e, i, t),
            i
          );
        }
        replaceOrCreateOverlay(e, t) {
          let i = this.pluginOverlayElements.get(e);
          if (
            (i &&
              (i.remove(),
              this.grid
                ? this.grid.removeWidget(i)
                : l.warn(
                    '[replaceOrCreate] tried to remove an overlay, but gridstack not initialized yet',
                  )),
            (i = this.createOverlay(e, t)),
            t)
          ) {
            const e = document.createElement('span');
            return e.classList.add('grid-stack-item-content'), i.appendChild(e), e;
          }
          return i;
        }
        getOverlay(e, t) {
          return this.replaceOrCreateOverlay(e, t.canPlaceInGrid).attachShadow({ mode: 'closed' });
        }
        initOverlayListeners() {
          l.info('init plugin UI overlay'),
            this.subs.push(
              this.pluginOverlayElements.onElementChanged({
                onAdded: (e, t) => {
                  l.debug('added plugin overlay', t),
                    this.createOverlayRoot(),
                    e && this.overlayRoot.appendChild(e);
                },
                onRemoved: (e, t) => {
                  l.debug('removed plugin overlay', t), e && e.remove();
                },
              }),
            );
        }
        disposeByKey(e) {
          this.pluginOverlayElements.delete(e);
        }
        dispose() {
          this.pluginOverlayElements.forEach((e, t) => {
            this.disposeByKey(t);
          }),
            this.subs.forEach((e) => e.cancel()),
            (this.subs = []),
            this.grid.destroy(),
            this.resizeObserver.disconnect(),
            (this.overlayRootAppended = !1),
            this.overlayRoot.remove();
        }
      }
    },
    41835: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => C });
      var s = i(933),
        o = i(4763),
        r = i(63511),
        n = i(81396),
        a = i(27115),
        h = i.n(a),
        l = i(92393),
        d = i.n(l),
        c = i(17965),
        u = i.n(c),
        m = i(14282),
        p = i.n(m),
        g = i(98419),
        y = i.n(g),
        v = i(20367),
        f = i.n(v);
      const w = {
        circle_projection: new n.RawShaderMaterial({
          uniforms: {
            textureSampleScale: { value: 5 },
            panoTexture: { value: null },
            borderSize: { value: 0 },
            borderColor: { value: new n.Vector4(1, 1, 1, 1) },
          },
          depthWrite: !1,
          depthTest: !0,
          side: n.DoubleSide,
          vertexShader: h(),
          fragmentShader: d(),
        }),
        equirectangular: new n.RawShaderMaterial({
          uniforms: { cubemap: { value: null }, yaw: { value: 0 } },
          depthWrite: !1,
          depthTest: !1,
          vertexShader: u(),
          fragmentShader: p(),
        }),
        compose: new n.RawShaderMaterial({
          uniforms: { mask: { value: null }, bg: { value: null } },
          transparent: !0,
          vertexShader: y(),
          fragmentShader: f(),
        }),
      };
      var M = i(97957),
        b = i(9832);
      class D {
        constructor(e, t) {
          (this._renderer = e), (this._renderTarget = t);
        }
        get target() {
          return this._renderTarget;
        }
        get width() {
          return this._renderTarget.width;
        }
        get height() {
          return this._renderTarget.height;
        }
        get bpp() {
          return 4;
        }
        readRenderTargetData(e) {
          const t = this._renderTarget.width,
            i = this._renderTarget.height;
          return (
            (e = e || new Uint8Array(t * i * 4)),
            this._renderer.readRenderTargetPixels(this._renderTarget, 0, 0, t, i, e),
            e
          );
        }
        setSize(e, t) {
          this._renderTarget.setSize(e, t);
        }
        dispose() {
          this._renderTarget.dispose();
        }
      }
      var S = i(69484),
        x = i(25565);
      const T = new n.DataTexture(new Uint8Array([255, 255, 255, 255]), 1, 1);
      T.needsUpdate = !0;
      class C extends s.Y {
        constructor() {
          super(...arguments),
            (this.name = 'render-to-texture'),
            (this.circleProjectionPlane = new M.E((0, x.fc)(), w.circle_projection)),
            (this.equirectProjectionPlane = new M.E((0, x.fc)(), w.equirectangular)),
            (this.composePlane = new M.E((0, x.fc)(), w.compose)),
            (this.cachedSize = new n.Vector2()),
            (this.cachedViewport = new n.Vector4()),
            (this.cachedViewport2 = new n.Vector4()),
            (this.debugRenderOffset = 0);
        }
        async init(e, t) {
          this.engine = t;
          const i = await t.getModuleBySymbol(o.Aj);
          (this.cwfRenderer = i.cwfRenderer),
            (this.renderer = i.threeRenderer),
            (this.camera = new n.PerspectiveCamera()),
            (this.orthoCamera = new n.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, 1)),
            (this.camera.layers.mask = r.o.ALL.mask),
            (this.scene = new n.Scene()),
            (this.scene.name = 'rtt'),
            (this.scene.matrixWorldAutoUpdate = !1),
            this.bindings.push(
              t.commandBinder.addBinding(
                b.oM,
                async () => new D(this.renderer, this.createRenderTarget2D(0)),
              ),
              t.commandBinder.addBinding(b.sH, async (e) => {
                this.renderContext(e.renderTarget.target, e.context);
              }),
              t.commandBinder.addBinding(b.vU, async (e) => {
                this.render(e.renderTarget.target, e.sceneObject, e.camera);
              }),
              t.commandBinder.addBinding(b.fZ, async (e) => {
                this.renderEquirectangular(e.texture, e.renderTarget.target, e.heading);
              }),
              t.commandBinder.addBinding(b.sp, async (e) => {
                this.render(e.renderTarget, e.sceneObject, e.camera);
              }),
            );
        }
        getRenderSize() {
          const e = this.renderer.getPixelRatio(),
            t = this.renderer.getSize(this.cachedSize);
          return (t.width *= e), (t.height *= e), t;
        }
        onUpdate() {
          this.debugRenderOffset = 0;
        }
        createRenderTarget2D(e, t = e, i, s = !0) {
          const o = new n.WebGLRenderTarget(e, t, i);
          return (o.texture.generateMipmaps = s), o;
        }
        clearRenderTarget2D(e) {
          this.renderer.setRenderTarget(e),
            this.renderer.clear(),
            this.renderer.setRenderTarget(null);
        }
        disposeRenderTarget2D(e) {
          e.texture.dispose(), e.depthTexture && e.depthTexture.dispose(), e.dispose();
        }
        getRenderTargetData(e, t) {
          const i = e.width,
            s = e.height;
          return (
            (t = t || new Uint8Array(i * s * 4)),
            this.renderer.readRenderTargetPixels(e, 0, 0, i, s, t),
            t
          );
        }
        compose(e, t, i) {
          var s;
          const o = Object.assign({ sourceMask: T, sourceResize: !0, sourceScale: 1 }, i),
            { uniforms: r } = this.composePlane.material;
          (r.bg.value = this.isRenderTarget(t) ? t.texture : t),
            (r.mask.value = this.isRenderTarget(o.sourceMask)
              ? o.sourceMask.texture
              : o.sourceMask),
            this.scene.add(this.composePlane);
          const { z: a, w: h } =
              null !== (s = null == e ? void 0 : e.viewport) && void 0 !== s
                ? s
                : this.renderer.getViewport(new n.Vector4()),
            l = r.bg.value.image.width,
            d = r.bg.value.image.height,
            c = !o.sourceResize && (a !== l || h !== d);
          if (c) {
            const e = new n.Vector3((o.sourceScale * l) / a, (o.sourceScale * d) / h, 1),
              t = 0.01,
              i = new n.Vector3(0.5 - t - 0.5 * e.x, -0.5 + t + 0.5 * e.y, 0);
            this.composePlane.applyMatrix4(new n.Matrix4().compose(i, new n.Quaternion(), e)),
              this.composePlane.updateMatrixWorld();
          }
          this.overrideRenderTarget(e, () => {
            this.renderer.render(this.scene, this.orthoCamera);
          }),
            this.scene.remove(this.composePlane),
            c &&
              (this.composePlane.position.set(0, 0, 0),
              this.composePlane.scale.set(1, 1, 1),
              this.composePlane.updateMatrixWorld()),
            (r.bg.value = null),
            (r.mask.value = null);
        }
        copyTexture(e, t) {
          return this.compose(e, t);
        }
        resizeTexture(e, t) {
          const i = new n.WebGLRenderTarget(t, t);
          return (
            e.isCompressedTexture
              ? (i.texture.format = n.RGBAFormat)
              : (i.texture.format = e.format),
            i.texture.addEventListener('dispose', i.dispose.bind(i)),
            this.copyTexture(i, e),
            i.texture
          );
        }
        renderToScreen(e, t = !0, i, s) {
          (t ? Promise.resolve() : this.engine.after(S.A.Render)).then(() => {
            const t = this.isRenderTarget(e) ? e.width : e.image.width,
              o = this.isRenderTarget(e) ? e.height : e.image.height,
              r = i ? i.x : this.debugRenderOffset,
              n = i ? i.y : 60;
            this.renderer.getViewport(this.cachedViewport),
              this.renderer.setViewport(r, n, t, o),
              this.compose(null, e, { sourceMask: s }),
              this.renderer.setViewport(this.cachedViewport),
              i || (this.debugRenderOffset += t + 4);
          });
        }
        isRenderTarget(e) {
          return e.hasOwnProperty('texture');
        }
        renderContext(e, t) {
          (e.texture.image = t.canvas), (e.texture.needsUpdate = !0);
        }
        render(e, t, i, s, o = !0) {
          const r = t.parent;
          if (
            (r && this.scene.applyMatrix4(r.matrixWorld),
            this.scene.add(t),
            e.isWebGLCubeRenderTarget)
          ) {
            const t = new n.CubeCamera(0.01, 1e3, e);
            i.getWorldPosition(t.position),
              i.getWorldQuaternion(t.quaternion),
              this.scene.add(t),
              this.scene.updateMatrixWorld(),
              (t.layers.mask = s ? s.mask : i.layers.mask),
              t.update(this.renderer, this.scene),
              this.scene.remove(t);
          } else {
            i.getWorldPosition(this.camera.position),
              i.getWorldQuaternion(this.camera.quaternion),
              this.camera.projectionMatrix.copy(i.projectionMatrix),
              (this.camera.layers.mask = s ? s.mask : i.layers.mask);
            const t = this.renderer.getSize(this.cachedSize),
              r = t.width / t.height,
              n = e.width / e.height,
              a = this.camera.projectionMatrix;
            r > n ? (a.elements[0] = a.elements[5] / n) : (a.elements[5] = a.elements[0] * n),
              this.overrideRenderTarget(e, () => {
                o && this.renderer.clear(), this.renderer.render(this.scene, this.camera);
              });
          }
          return r && (r.add(t), this.scene.matrixWorld.identity()), this.scene.remove(t), e;
        }
        setScissors(e, t) {
          if (e) {
            if (!t) throw Error('Rect to restrict rendering to required when enabling scissors.');
            this.renderer.setScissorTest(!0), this.renderer.setScissor(t.x, t.y, t.width, t.height);
          } else {
            const e = this.renderer.getSize(this.cachedSize);
            this.renderer.setScissor(0, 0, e.width, e.height), this.renderer.setScissorTest(!1);
          }
        }
        renderSphericalProjection(e, t, i, s, o) {
          const r = w.circle_projection;
          r.uniforms.borderColor.value.copy(o || new n.Vector4(1, 1, 1, 1)),
            (r.uniforms.borderSize.value = s || 0),
            (r.uniforms.textureSampleScale.value = i || 5),
            (r.uniforms.panoTexture.value = e),
            this.scene.add(this.circleProjectionPlane),
            (this.circleProjectionPlane.position.z = 0),
            this.overrideRenderTarget(t, () => {
              this.renderer.render(this.scene, this.orthoCamera);
            }),
            this.scene.remove(this.circleProjectionPlane),
            (r.uniforms.panoTexture.value = null);
        }
        renderEquirectangular(e, t, i = 0) {
          const s = this.equirectProjectionPlane.material;
          (s.uniforms.cubemap.value = e),
            (s.uniforms.yaw.value = i),
            this.scene.add(this.equirectProjectionPlane),
            (this.equirectProjectionPlane.position.z = 0),
            this.overrideRenderTarget(t, () => {
              this.renderer.render(this.scene, this.orthoCamera);
            }),
            this.scene.remove(this.equirectProjectionPlane),
            (s.uniforms.cubemap.value = null),
            (s.uniforms.yaw.value = 0);
        }
        overrideRenderTarget(e, t) {
          const i = this.renderTargetSwap(e);
          t(), this.renderTargetRestore(i);
        }
        renderTargetSwap(e) {
          const t = this.renderer.xr.enabled,
            i = this.renderer.getRenderTarget(),
            s = this.renderer.getViewport(this.cachedViewport2);
          return (
            (this.renderer.xr.enabled = !1),
            this.renderer.setRenderTarget(e),
            { xr: t, rtt: i, viewport: s }
          );
        }
        renderTargetRestore(e) {
          (this.renderer.xr.enabled = e.xr),
            this.renderer.setRenderTarget(e.rtt),
            this.renderer.setViewport(e.viewport);
        }
        renderAndReadAsync(e, t, i) {
          const s = i.buffer;
          if (!this.renderer.capabilities.isWebGL2)
            return (
              this.log.debug('renderAsync call webgl2, falling back to sync render/read'),
              this.render(e.target, e.mesh, e.camera),
              Promise.resolve(this.getRenderTargetData(e.target, s))
            );
          const o = this.renderTargetSwap(e.target),
            r = this.renderer.getContext(),
            n = i.webglBuffer || r.createBuffer();
          if (!n) throw Error('Unable to create pack buffer');
          return (
            r.bindBuffer(r.PIXEL_PACK_BUFFER, n),
            r.bufferData(r.PIXEL_PACK_BUFFER, s.byteLength, r.DYNAMIC_READ),
            e.clear && this.renderer.clear(),
            this.renderer.render(e.mesh, e.camera),
            r.readPixels(t.x, t.y, t.width, t.height, r.RGBA, r.UNSIGNED_BYTE, 0),
            r.bindBuffer(r.PIXEL_PACK_BUFFER, null),
            this.renderTargetRestore(o),
            this.cwfRenderer
              .fence(r)
              .then(
                () => (
                  r.bindBuffer(r.PIXEL_PACK_BUFFER, n),
                  r.getBufferSubData(r.PIXEL_PACK_BUFFER, 0, s),
                  r.bindBuffer(r.PIXEL_PACK_BUFFER, null),
                  i.webglBuffer || r.deleteBuffer(n),
                  s
                ),
              )
          );
        }
      }
    },
    93717: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => y });
      var s = i(933),
        o = i(62770),
        r = i(31740),
        n = i(90512),
        a = i(31910),
        h = i(86400),
        l = i(93797),
        d = i(53257),
        c = i(16810);
      const u = new d.Z('mds-floor-deserializer');
      class m {
        deserialize(e) {
          var t, i, s, o;
          if (!e || !this.validate(e))
            return u.debug('Deserialized invalid room data from MDS', e), null;
          const r = (e) => (null !== e ? e : void 0),
            n = e.dimensions || { height: null, width: null, depth: null, areaFloor: null },
            { height: a, width: h, depth: l, areaFloor: d } = n;
          return new c.d({
            id: e.id,
            meshSubgroup: e.meshId || -1,
            floorId:
              null !== (i = null === (t = e.floor) || void 0 === t ? void 0 : t.id) && void 0 !== i
                ? i
                : '',
            height: r(a),
            width: r(h),
            depth: r(l),
            areaFloor: r(d),
            tags:
              null !== (o = null === (s = e.tags) || void 0 === s ? void 0 : s.filter((e) => e)) &&
              void 0 !== o
                ? o
                : void 0,
          });
        }
        validate(e) {
          const t = ['id', 'meshId'].every((t) => t in e),
            i = e.floor && e.floor.id && 'number' == typeof e.floor.meshId;
          return t && !!i;
        }
      }
      class p extends l.u {
        constructor() {
          super(...arguments), (this.prefetchKey = 'data.model.rooms');
        }
        async read(e) {
          const t = new m(),
            i = { modelId: this.getViewId() };
          return this.query(h.GetRooms, i, e).then((e) => {
            var i, s;
            const o =
              null ===
                (s =
                  null === (i = null == e ? void 0 : e.data) || void 0 === i ? void 0 : i.model) ||
              void 0 === s
                ? void 0
                : s.rooms;
            if (!o || !Array.isArray(o)) return null;
            return o.reduce((e, i) => {
              const s = t.deserialize(i);
              return s && (e[s.id] = s), e;
            }, {});
          });
        }
      }
      var g = i(22925);
      class y extends s.Y {
        constructor() {
          super(...arguments), (this.name = 'room-data'), (this.visitedRooms = {});
        }
        async init(e, t) {
          const { baseModelId: i, baseUrl: s } = e,
            h = await t.market.waitForData(g.R);
          this.store = new p({ context: h.mdsContext, baseUrl: s, readonly: !0, viewId: i });
          const l = await this.store.read();
          (this.data = new o.Z(l || {})), t.market.register(this, o.Z, this.data);
          const d = await t.market.waitForData(n.O),
            c = this.data.roomCount,
            u = (e) => {
              const i = d.closestMode;
              this.visitedRooms[e.id] || (this.visitedRooms[e.id] = { visitCount: 0 }),
                this.visitedRooms[e.id].visitCount++;
              const s = this.visitedRooms[e.id].visitCount;
              t.broadcast(new a.D(e.id, e.meshSubgroup, i, s, c, ''));
            },
            m = await t.market.waitForData(r.Z),
            y = m.makeSweepChangeSubscription((e) => {
              if (e) {
                const t = m.getSweep(e);
                (this.data.selected.value = t.roomId), this.data.commit();
              }
            }),
            v = this.data.selected.onChanged((e) => {
              if (null !== e) {
                const t = this.data.get(e);
                t && u(t);
              }
            });
          this.bindings.push(y, v);
        }
      }
    },
    11986: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => g });
      var s = i(48199),
        o = i(933),
        r = i(53257),
        n = i(85661);
      function a(e, t) {
        return fetch(e, Object.assign(Object.assign({}, t), { credentials: 'omit' }));
      }
      function h(e, t) {
        const i = e instanceof Request ? e.url : e,
          s = (0, n.m)(i, {});
        return fetch(
          e,
          Object.assign(Object.assign({}, t), {
            headers: Object.assign(Object.assign({}, null == t ? void 0 : t.headers), s),
          }),
        );
      }
      const l = [
        1 / 0,
        Array,
        ArrayBuffer,
        Boolean,
        DataView,
        Date,
        Error,
        EvalError,
        Float32Array,
        Float64Array,
        Function,
        Int8Array,
        Int16Array,
        Int32Array,
        JSON,
        Map,
        Math,
        NaN,
        Number,
        Object,
        Promise,
        Proxy,
        RangeError,
        ReferenceError,
        Reflect,
        RegExp,
        Set,
        String,
        SyntaxError,
        TypeError,
        URIError,
        Uint8Array,
        Uint8ClampedArray,
        Uint16Array,
        Uint32Array,
        WeakMap,
        WeakSet,
        decodeURI,
        decodeURIComponent,
        encodeURI,
        encodeURIComponent,
        escape,
        eval,
        isFinite,
        isNaN,
        parseFloat,
        parseInt,
        unescape,
        XMLHttpRequest,
        Headers,
        HTMLIFrameElement,
        Document,
        HTMLDocument,
        HTMLCanvasElement,
        DOMException,
        URLSearchParams,
        ResizeObserver,
      ];
      class d {
        constructor(e, t) {
          (this.originalSetFunc = e),
            (this.originalClearFunc = t),
            (this.disposed = !1),
            (this.ids = new Set());
        }
        setFunc(e, t) {
          if (this.disposed) return -1;
          const i = this.originalSetFunc(() => e(), t);
          return this.ids.add(i), i;
        }
        clearFunc(e) {
          this.disposed || (this.ids.has(e) && (this.ids.delete(e), this.originalClearFunc(e)));
        }
        dispose() {
          if (!this.disposed) {
            this.disposed = !0;
            for (const e of this.ids) this.originalClearFunc(e);
            this.ids.clear();
          }
        }
      }
      var c = i(67944);
      class u {
        constructor(e) {
          if (((this.values = new Map()), e))
            for (const [t, i] of e) for (const [e, s] of i) this.set(t, e, s);
        }
        set(e, t, i) {
          this.getValuesAtKey(e).set(t, i);
        }
        delete(e, t) {
          const i = this.values.get(e);
          null == i || i.delete(t);
        }
        removeKey(e) {
          this.values.delete(e);
        }
        getValuesAtKey(e) {
          const t = this.values.get(e) || new Map();
          return this.values.set(e, t), t;
        }
        valuesPerKey(e) {
          return this.getValuesAtKey(e).size;
        }
        get(e, t) {
          var i;
          return null === (i = this.values.get(e)) || void 0 === i ? void 0 : i.get(t);
        }
        get keys() {
          return this.values.keys();
        }
        hasKey(e) {
          return this.values.has(e);
        }
        has(e, t) {
          var i;
          return !!(null === (i = this.values.get(e)) || void 0 === i ? void 0 : i.has(t));
        }
        *[Symbol.iterator]() {
          for (const [e, t] of this.values) for (const [i, s] of t) yield [e, i, s];
        }
      }
      const m = function (e) {
        return (
          Object.freeze(e),
          Object.getOwnPropertyNames(e).forEach(function (t) {
            const i = Object.getOwnPropertyDescriptor(e, t);
            (null == i ? void 0 : i.value) && 'object' == typeof i.value && m(i.value);
          }),
          e
        );
      };
      class p extends o.Y {
        constructor() {
          super(...arguments),
            (this.overlayElement = null),
            (this.name = 'SesModule'),
            (this.separator = '¦'),
            (this.frozen = !1),
            (this.libraryCache = new u());
        }
        freezeForStrict() {
          if (!this.frozen) {
            for (const e of l) m(e);
            this.frozen = !0;
          }
        }
        async init(e, t) {
          ([this.semver] = await Promise.all([
            i
              .e(625)
              .then(i.t.bind(i, 36625, 23))
              .then((e) => e.default),
            i.e(519).then(i.bind(i, 13806)),
          ])),
            (this.pluginUIData = await t.market.waitForData(c.q)),
            (this.pluginUIData = await t.market.waitForData(c.q)),
            globalThis.process && (globalThis.process.on = () => {}),
            (this.overlayElement = this.pluginUIData.overlayRoot);
        }
        async makeSecureEnvironment(e, t, i, o, n) {
          const l = new r.Z(`plugin ${e}`);
          if ((Object.freeze(l), !this.overlayElement))
            return this.log.warn('Not creating a secure env due to missing overlay element'), null;
          if (
            t.startsWith('http') ||
            (t.startsWith('//') && window.location.href.match(/^https?:/))
          )
            try {
              const e = await fetch(t);
              t = await e.text();
            } catch (e) {
              return this.log.warn('There was an error retrieving the plugin source.'), null;
            }
          const c = this.pluginUIData.getOverlay(e, i),
            u = (t, i) => {
              l.debug('dispatching plugin event', e, t, i),
                o.set(e.split(this.separator)[1], { name: t, eventData: i });
            },
            m = new d(
              (e, t) => window.setInterval(e, t),
              (e) => window.clearInterval(e),
            ),
            p = new d(
              (e, t) => window.setTimeout(e, t),
              (e) => window.clearTimeout(e),
            ),
            g = {
              log: (...e) => l.info(...e),
              error: (...e) => l.error(...e),
              info: (...e) => l.info(...e),
              warn: (...e) => l.warn(...e),
              time: (e) => l.time(e),
              timeEnd: (e) => l.timeEnd(e),
            };
          function y(e, t) {
            return m.setFunc(e, t);
          }
          function v(e) {
            return m.clearFunc(e);
          }
          function f(e, t) {
            return p.setFunc(e, t);
          }
          function w(e) {
            return p.clearFunc(e);
          }
          let M = {};
          for (const [e, t] of Object.entries(n || {}))
            M = Object.assign(Object.assign({}, M), await this.loadLibrary(e, t));
          const b = Object.assign(
              {
                setInterval: y,
                clearInterval: v,
                setTimeout: f,
                clearTimeout: w,
                console: g,
                window: {
                  setInterval: y,
                  clearInterval: v,
                  setTimeout: f,
                  clearTimeout: w,
                  console: g,
                  parent: {
                    postMessage(e, t, i) {
                      (0, s.t)(t)
                        ? window.parent.postMessage(e, t, i)
                        : window.parent.postMessage(e, t);
                    },
                  },
                },
              },
              M,
            ),
            D = Object.assign(Object.assign({}, b.window), {
              HTMLIFrameElement: HTMLIFrameElement,
              location: { href: '' },
              document: document,
              getComputedStyle: getComputedStyle.bind(globalThis),
              parent: window.parent,
            }),
            S = Object.assign(Object.assign({}, b), {
              window: D,
              HTMLIFrameElement: HTMLIFrameElement,
              Document: Document,
              HTMLDocument: HTMLDocument,
              HTMLCanvasElement: HTMLCanvasElement,
              DOMException: DOMException,
              URLSearchParams: URLSearchParams,
              ResizeObserver: ResizeObserver,
              Error: Error,
              Headers: Headers,
              DOMMatrix: DOMMatrix,
              DOMMatrixReadOnly: DOMMatrixReadOnly,
              URL: URL,
              Blob: Blob,
              FileReader: FileReader,
              document: document,
              navigator: { userAgent: navigator.userAgent, language: navigator.language },
              overlaySlot: () => c,
              notifyEvent(e, t) {
                u(e, t);
              },
            });
          if (i.canFetch) {
            const e = i.canFetchAsUser ? h : a;
            (D.fetch = e), (S.fetch = e), (S.XMLHttpRequest = XMLHttpRequest);
          }
          if (i.canStoreLocal) {
            let e;
            for (e of [S, D])
              (e.indexedDB = indexedDB),
                (e.IDBKeyRange = IDBKeyRange),
                (e.IDBTransaction = IDBTransaction),
                (e.IDBDatabase = IDBDatabase),
                (e.IDBObjectStore = IDBObjectStore),
                (e.IDBIndex = IDBIndex),
                (e.IDBCursor = IDBCursor),
                (e.IDBCursorWithValue = IDBCursorWithValue),
                (e.IDBRequest = IDBRequest),
                (e.IDBOpenDBRequest = IDBOpenDBRequest),
                (e.IDBVersionChangeEvent = IDBVersionChangeEvent),
                (e.IDBFactory = IDBFactory);
          }
          const { strict: x } = i,
            T = new Compartment(x ? b : S);
          T.evaluate(
            t,
            x ? void 0 : { __evadeImportExpressionTest__: !0, __evadeHtmlCommentTest__: !0 },
          );
          let C = !1;
          return {
            compartment: T,
            overlayElement: this.overlayElement,
            dispose: () => {
              C || ((C = !0), this.pluginUIData.disposeByKey(e), m.dispose(), p.dispose());
            },
          };
        }
        async loadLibrary(e, t) {
          var i;
          const s = this.libraryCache.get(e, t);
          if (s) return s;
          const o = null === (i = this.semver.coerce(t)) || void 0 === i ? void 0 : i.raw;
          if (!o) throw Error(`${t} is an invalid version for ${e}@${t}`);
          if (p.libraryManifest.hasKey(e)) {
            const i = p.libraryManifest.getValuesAtKey(e);
            for (const [t, s] of i)
              if (this.semver.satisfies(o, t)) {
                const i = await s();
                return this.libraryCache.set(e, t, i), i;
              }
            throw Error(
              `${e}@${t} is unsupported. Supported versions are \n\t${[...i.keys()].join('\n\t')}`,
            );
          }
          throw Error(
            `${e} is unsupported as a peer dependency. Include it as a normal dependency to utilize it.`,
          );
        }
      }
      p.libraryManifest = new u([
        [
          'three',
          [
            [
              '0.151',
              async () => ({ THREE: await Promise.resolve().then(i.t.bind(i, 81396, 23)) }),
            ],
          ],
        ],
        [
          'react',
          [
            ['19', () => Promise.all([i.e(18), i.e(126)]).then(i.bind(i, 28126))],
            ['18', () => Promise.all([i.e(432), i.e(227)]).then(i.bind(i, 65227))],
            ['17', () => Promise.all([i.e(537), i.e(734)]).then(i.bind(i, 97734))],
          ],
        ],
        [
          'react-dom',
          [
            ['19', () => Promise.all([i.e(18), i.e(126)]).then(i.bind(i, 28126))],
            ['18', () => Promise.all([i.e(432), i.e(227)]).then(i.bind(i, 65227))],
            ['17', () => Promise.all([i.e(537), i.e(734)]).then(i.bind(i, 97734))],
          ],
        ],
      ]);
      const g = p;
    },
    26302: (e, t, i) => {
      'use strict';
      i.d(t, { i: () => o });
      var s = i(81396);
      class o extends s.Mesh {}
    },
    28838: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => D });
      var s = i(933),
        o = i(4763),
        r = i(81396),
        n = i(80218),
        a = i.n(n),
        h = i(46262),
        l = i.n(h);
      const d = {
        sky: {
          uniforms: {
            topColor: { type: 'v3', value: new r.Vector3(0.094, 0.102, 0.11) },
            bottomColor: { type: 'v3', value: new r.Vector3(0.2, 0.216, 0.235) },
            cameraMatrix: { type: 'm4', value: new r.Matrix4() },
            inverseProjectionMatrix: { type: 'm4', value: new r.Matrix4() },
            radius: { type: 'f', value: 1e4 },
          },
          vertexShader: a(),
          fragmentShader: l(),
        },
      };
      class c extends r.RawShaderMaterial {
        constructor(e = {}) {
          super(
            Object.assign(
              {
                fragmentShader: d.sky.fragmentShader,
                vertexShader: d.sky.vertexShader,
                uniforms: r.UniformsUtils.clone(d.sky.uniforms),
                name: 'SkyboxMaterial',
              },
              e,
            ),
          );
        }
      }
      var u = i(63511),
        m = i(26302),
        p = i(72803),
        g = i(91524),
        y = i(3835);
      class v {
        constructor(e, t, i, s, o = u.o.ALL) {
          (this.scene = e),
            (this.cameraData = t),
            (this.addToRaycasting = i),
            (this.removeFromRaycasting = s),
            (this.renderLayer = o),
            (this.bindings = []);
        }
        init() {
          const { visualMesh: e, colliderMesh: t } = this.setupSkysphere();
          (this.skyVisual = e), (this.material = this.skyVisual.material), (this.skyCollider = t);
        }
        dispose() {
          this.material.uniforms.pano0Map && this.material.uniforms.pano0Map.value.dispose(),
            this.material.uniforms.pano1Map && this.material.uniforms.pano1Map.value.dispose(),
            this.material.dispose(),
            this.skyVisual.geometry.dispose();
        }
        activate(e) {
          this.scene.addChild(this.scene.ids.Root, this.skyVisual),
            this.skyVisual.updateMatrixWorld(!0),
            (this.skyVisual.visible = !0),
            this.addToRaycasting(this.skyCollider, !1);
        }
        deactivate(e) {
          for (const e of this.bindings) e.cancel();
          (this.bindings = []),
            this.scene.removeChild(this.scene.ids.Root, this.skyVisual),
            this.scene.removeChild(this.scene.ids.CameraRig, this.skyCollider),
            this.removeFromRaycasting(this.skyCollider);
        }
        updateBackgroundColors(e, t) {
          const i = new r.Color(e),
            s = new r.Color(t);
          this.material.uniforms.topColor.value.set(i.r, i.g, i.b),
            this.material.uniforms.bottomColor.value.set(s.r, s.g, s.b);
        }
        beforeRender() {
          this.skyCollider.position.copy(this.cameraData.pose.position),
            this.material.uniforms.cameraMatrix.value.compose(
              this.cameraData.pose.position,
              this.cameraData.pose.rotation,
              y.fU.UNIT,
            ),
            this.material.uniforms.inverseProjectionMatrix.value.copy(
              this.cameraData.pose.projection.asThreeMatrix4(),
            ),
            this.material.uniforms.inverseProjectionMatrix.value.invert();
        }
        render() {}
        setupSkysphere(e) {
          const t = new r.SphereGeometry(1e4, 5, 5);
          t.computeBoundingBox();
          const i = g.oR.far - 10,
            s = new Float32Array([-1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0]),
            o = new r.BufferGeometry();
          o.setAttribute('position', new r.Float32BufferAttribute(s, 3)),
            o.setIndex([0, 1, 2, 0, 2, 3]),
            e || (e = new c({ side: r.FrontSide }));
          const n = new m.i(o, e);
          (n.layers.mask = this.renderLayer.mask),
            (n.name = 'Skysphere'),
            (n.renderOrder = p.z.boundingSkybox),
            n.updateMatrixWorld(!0),
            (n.frustumCulled = !1),
            (e.uniforms.radius.value = i),
            (e.depthWrite = !1),
            (e.depthTest = !1);
          return {
            visualMesh: n,
            colliderMesh: new m.i(
              t,
              new r.MeshBasicMaterial({ opacity: 0, depthWrite: !1, side: r.BackSide }),
            ),
          };
        }
      }
      var f = i(64150),
        w = i(62680),
        M = i(9263),
        b = i(57793);
      class D extends s.Y {
        constructor() {
          super(...arguments), (this.name = 'skybox-module');
        }
        async init(e, t) {
          const [i, s, r, n] = await Promise.all([
              t.getModuleBySymbol(o.Aj),
              t.market.waitForData(f.e),
              t.getModuleBySymbol(o.PZ),
              t.market.waitForData(b.M),
            ]),
            a = t.claimRenderLayer('skybox'),
            h = i.getScene();
          (this.skybox = new v(h, n, r.registerMesh, r.unregisterMesh, a)),
            t.addComponent(this, this.skybox);
          const l = s.tryGetProperty(M.gx.BackgroundColor, w.z.default);
          this.skybox.updateBackgroundColors(w.K[l].bgPrimary, w.K[l].bgSecondary),
            this.bindings.push(
              s.onPropertyChanged(M.gx.BackgroundColor, (e) => {
                this.skybox.updateBackgroundColors(w.K[e].bgPrimary, w.K[e].bgSecondary);
              }),
            );
        }
      }
    },
    71835: (e, t, i) => {
      'use strict';
      i.d(t, { Bv: () => u, Dv: () => h, TE: () => l, l0: () => c, o7: () => d });
      var s = i(81396);
      const o = -1,
        r = 10,
        n = 5,
        a = -5,
        h =
          (e, t = o) =>
          (i) =>
            e.distanceToSquared(i.position) * t,
        l =
          (e, t = o) =>
          (i) =>
            e.distanceTo(i.position) * t,
        d = (e, t, i = r) => {
          const o = new s.Vector3();
          return (s) => o.copy(s.position).sub(e).normalize().dot(t) * i;
        },
        c =
          (e, t = o) =>
          (i) =>
            e.distanceToSquared(i.floorPosition) * t,
        u =
          (e, t = n, i = a) =>
          (s) =>
            e === s.floorId ? t : i;
    },
    59822: (e, t, i) => {
      'use strict';
      i.d(t, { Z: () => o });
      var s = i(8126);
      class o extends s.v0 {
        constructor(e, t, i) {
          super(), (this.size = e), (this.sweepId = t), (this.renderTarget = i);
        }
      }
    },
    48436: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => u });
      var s = i(933),
        o = i(31740),
        r = i(79884),
        n = i(62900),
        a = i(90512),
        h = i(33809),
        l = i(60937),
        d = i(88288),
        c = i(98375);
      class u extends s.Y {
        constructor() {
          super(...arguments),
            (this.name = 'sweep-viewdata'),
            (this.selectionEnabled = !0),
            (this.nonPanoCurrentPuckVisible = !1),
            (this.enableSweepSelection = async (e) => {
              this.selectionEnabled = !0;
            }),
            (this.disableSweepSelection = async (e) => {
              this.selectionEnabled = !1;
            }),
            (this.toggleCurrentPuck = async (e) => {
              (this.nonPanoCurrentPuckVisible = e.visible),
                this.updateVisibility(this.viewData.data.currentSweep);
            }),
            (this.onSweepSelectCommand = async (e) => {
              this.selectionEnabled &&
                this.viewData.modifySelectAnimation(e.id, e.selected, e.duration);
            }),
            (this.onSweepHoverCommand = async (e) => {
              this.viewData.modifySelectAnimation(e.id, e.hovered, e.duration);
            }),
            (this.updateVisibility = async (e) => {
              if (this.viewmodeData.isInside()) {
                if (e) {
                  const t = this.viewData.getSweep(e).neighbours;
                  this.viewData.atomic(() => {
                    this.viewData.iterate((e) => {
                      const i = this.viewData.getSweepVisibility(e) && -1 !== t.indexOf(e.id);
                      this.viewData.setVisible(e.id, i);
                    }),
                      this.viewData.setVisible(e, !1);
                  });
                }
              } else
                this.viewData.atomic(() => {
                  this.viewData.iterate((e) => {
                    this.viewData.setVisible(
                      e.id,
                      this.floorsViewData.isCurrentOrAllFloors(e.floorId),
                    );
                  }),
                    e && this.viewData.setVisible(e, this.nonPanoCurrentPuckVisible);
                });
            });
        }
        async init(e, t) {
          (this.data = await t.market.waitForData(o.Z)),
            (this.viewData = t.market.tryGetData(r.D) || new r.D(this.data)),
            t.market.register(this, r.D, this.viewData),
            this.bindings.push(
              t.commandBinder.addBinding(n.iF, this.onSweepSelectCommand),
              t.commandBinder.addBinding(n.kR, this.onSweepHoverCommand),
              t.commandBinder.addBinding(n.zd, this.enableSweepSelection),
              t.commandBinder.addBinding(n.ZD, this.disableSweepSelection),
              t.commandBinder.addBinding(n.e9, this.toggleCurrentPuck),
              t.msgBus.subscribe(c.sY, () => this.viewData.updateViewData()),
              ...this.viewData.bindings,
            ),
            (this.viewmodeData = await t.market.waitForData(a.O)),
            (this.floorsViewData = await t.market.waitForData(l.c)),
            this.bindings.push(
              this.data.getCollection().onElementsChanged((e) => {
                if (e.updated && this.data.currentSweepObject) {
                  const t = [
                    ...this.data.currentSweepObject.neighbours,
                    this.data.currentSweepObject.id,
                  ];
                  e.updated.map(([e, t]) => e).some((e) => t.includes(e)) &&
                    this.updateVisibility(this.data.currentSweep);
                }
                e.added && this.updateVisibility(this.data.currentSweep);
              }),
              this.data.onPropertyChanged('currentSweep', this.updateVisibility),
              t.subscribe(h.P, () => this.updateVisibility(this.data.currentSweep)),
              t.subscribe(d.bS, () => this.updateVisibility(this.data.currentSweep)),
              this.viewmodeData.makeModeChangeSubscription(() =>
                this.updateVisibility(this.data.currentSweep),
              ),
            ),
            this.updateVisibility(this.data.currentSweep);
        }
        onUpdate(e) {
          this.viewData.updateAnimations(e);
        }
      }
    },
    51085: (e, t, i) => {
      'use strict';
      i.r(t),
        i.d(t, {
          AssetDockedMessage: () => m.ro,
          AssetUndockedMessage: () => m.A,
          CloseAndRemoveToolsCommand: () => u.Ye,
          CloseCurrentToolCommand: () => u.eS,
          CloseToolCommand: () => u.CH,
          CollapseBottomPanelCommand: () => u.qy,
          OpenInitialToolCommand: () => u.r_,
          OpenPreviousToolCommand: () => u.cR,
          OpenToolCommand: () => u.z2,
          PanelCollapseMessage: () => m.U7,
          PanelTransitionEndMessage: () => m.rh,
          RegisterToolsCommand: () => u.MV,
          SetAppBarVisibleMessage: () => m.bz,
          ToggleToolCommand: () => u.tT,
          ToggleViewingControlsMessage: () => m.ps,
          Tool: () => O.U,
          ToolPalette: () => l.$r,
          ToolPanelLayout: () => l.wS,
          ToolToggleCollapseCommand: () => u.Fg,
          Tools: () => l.w1,
          ToolsData: () => d.t,
          default: () => k,
        });
      var s = i(933),
        o = i(4763),
        r = i(24938);
      var n = i(57793),
        a = i(90512),
        h = i(21206),
        l = i(27163),
        d = i(70593),
        c = i(67679),
        u = i(92257),
        m = i(2159),
        p = i(1591),
        g = i(13760),
        y = i(17545),
        v = i(20470),
        f = i(15109),
        w = i(51804),
        M = i(64150),
        b = i(49982),
        D = i(35575),
        S = i(7321),
        x = i(6394),
        T = i(18808),
        C = i(99220);
      class P extends s.Y {
        constructor() {
          super(...arguments),
            (this.name = 'tools-module'),
            (this.activeToolDurationMap = {}),
            (this.keyboardTimeout = 0),
            (this.bottomPanelHeight = 0),
            (this.sidePanelWidth = 0),
            (this.sidePanelLeft = 0),
            (this.initialUrlToolOpened = !1),
            (this.toolClosing = !1),
            (this.closeAndRemoveTools = async (e) =>
              !(e && !(await this.deactivateCurrentTool())) &&
              (this.closeModal(),
              this.toolsData.setActiveTool(null),
              this.toolsData.removeAllTools(),
              !0)),
            (this.onAssetDocked = () => {
              (this.toolsData.assetDocked = !0), this.toolsData.commit();
            }),
            (this.onAssetUndocked = () => {
              (this.toolsData.assetDocked = !1), this.toolsData.commit();
            }),
            (this.handleTextBoxFocus = (e) => {
              window.clearTimeout(this.keyboardTimeout),
                e.focused
                  ? (this.keyboardTimeout = window.setTimeout(() => {
                      document.documentElement.classList.add('keyboard-layout');
                    }, 500))
                  : document.documentElement.classList.remove('keyboard-layout');
            }),
            (this.onToggleModal = async (e) => {
              this.toggleModal(e.modal, e.open);
            }),
            (this.closeModal = () => {
              this.toolsData.openModal && this.toggleModal(this.toolsData.openModal, !1);
            }),
            (this.allowToolOrViewChange = async () => {
              var e;
              const t = this.toolsData.getActiveTool();
              if (
                !(null === (e = null == t ? void 0 : t.manager) || void 0 === e
                  ? void 0
                  : e.hasPendingEdits)
              )
                return !0;
              if (await t.manager.hasPendingEdits()) {
                const e = {
                  title: S.Z.TOOLS.UNSAVED_CHANGES_TITLE,
                  message: S.Z.TOOLS.UNSAVED_CHANGES_MESSAGE,
                  cancellable: !0,
                  confirmPhraseKey: S.Z.TOOLS.UNSAVED_CHANGES_CONFIRM,
                  cancelPhraseKey: S.Z.TOOLS.UNSAVED_CHANGES_CANCEL,
                };
                return (
                  (await this.engine.commandBinder.issueCommand(new b.EW(b.Rx.DISPLAY, e))) ===
                  b.Uc.CLOSE
                );
              }
              return !0;
            }),
            (this.toggleTool = async ({ toolName: e, active: t }) =>
              t ? this.openTool(e, !1) : this.closeTool(e)),
            (this.closeCurrentTool = async () =>
              !!(await this.deactivateCurrentTool()) && (this.toolsData.setActiveTool(null), !0)),
            (this.openInitialTool = async () => {
              var e;
              const t = (0, p.u)(this.settingsData, this.initialUrlToolOpened);
              if (t) {
                const i = this.toolsData.getTool(t);
                if (i) {
                  const s = (0, p.B)(this.settingsData, i);
                  s && (null === (e = i.manager) || void 0 === e ? void 0 : e.deepLink)
                    ? i.manager.deepLink(s)
                    : this.engine.commandBinder.issueCommandWhenBound(new u.tT(t, !0));
                }
              }
              this.initialUrlToolOpened = !0;
            }),
            (this.openPreviousTool = async () => {
              (this.toolsData.softOpening = !1), this.toolsData.commit();
              const e = this.toolsData.previousToolName;
              if (null === e) return;
              const t = this.toolsData.getTool(e) || null;
              null !== t
                ? (await this.deactivateCurrentTool(t)) &&
                  (await this.activateTool(t), this.toolsData.setActiveTool(e))
                : this.log.error(`Tool not loaded: ${e}`);
            }),
            (this.updateLayoutSize = () => {
              const { toolPanelLayout: e } = this.toolsData;
              let t = e;
              const i = this.isSidePanelLayout();
              switch (e) {
                case l.wS.NORMAL:
                  i || (t = l.wS.NARROW);
                  break;
                case l.wS.SIDE_PANEL:
                  i || (t = l.wS.BOTTOM_PANEL);
                  break;
                case l.wS.NARROW:
                  i && (t = l.wS.NORMAL);
                  break;
                case l.wS.BOTTOM_PANEL:
                  i && (t = l.wS.SIDE_PANEL);
              }
              t !== e
                ? ((this.toolsData.toolPanelLayout = t), this.toolsData.commit())
                : e === l.wS.BOTTOM_PANEL && this.adjustCanvasForPanel();
            }),
            (this.handleToolCollapse = async (e) => {
              e !== this.toolsData.toolCollapsed &&
                ((this.toolsData.toolCollapsed = e),
                this.toolsData.commit(),
                e || this.toolsData.toolPanelLayout !== l.wS.BOTTOM_PANEL || this.closeModal(),
                this.engine.broadcast(new m.U7(e)));
            }),
            (this.handleBottomPanelCollapse = async (e) => {
              if (this.toolsData.toolPanelLayout === l.wS.BOTTOM_PANEL)
                return this.handleToolCollapse(e.collapse);
            }),
            (this.adjustCanvasForPanelActual = async () => {
              const {
                  toolPanelLayout: e,
                  toolCollapsed: t,
                  assetDocked: i,
                  openModal: s,
                } = this.toolsData,
                { sidePanelWidth: o, bottomPanelHeight: r, sidePanelLeft: n } = this,
                a = this.toolsData.getActiveTool(),
                h = e === l.wS.SIDE_PANEL,
                d = a && h && !t,
                u = d && !!(null == a ? void 0 : a.panelLeft),
                m = d ? -v.LH : 0,
                p = m !== o ? m : void 0,
                g = u ? v.LH : 0,
                y = g !== n ? g : void 0,
                w = e === l.wS.BOTTOM_PANEL && !s && i,
                M = -Math.floor(((this.containerData.size.height - 55) * c.GW) / 100),
                b = w ? M : 0,
                D = b !== r ? b : void 0,
                S = 0 === p || 0 === D ? 0 : c.tn;
              this.resizeCanvas((0, f.hf)(p, D, y, S)),
                (this.bottomPanelHeight = b),
                (this.sidePanelWidth = m),
                (this.sidePanelLeft = g);
            }),
            (this.adjustCanvasForPanel = (0, x.D)(this.adjustCanvasForPanelActual, 50)),
            (this.resizeCanvas = async (e) => {
              this.engine.commandBinder.issueCommand(new w.M(e));
            });
        }
        async init(e, t) {
          (this.engine = t),
            await t.getModuleBySymbol(o.nI),
            (this.analytics = await t.getModuleBySymbol(o.V6)),
            ([this.settingsData, this.appData, this.containerData] = await Promise.all([
              t.market.waitForData(M.e),
              t.market.waitForData(r.pu),
              t.market.waitForData(C.V),
            ])),
            (this.toolsData = new d.t()),
            this.updateLayoutSize(),
            this.bindings.push(
              t.commandBinder.addBinding(u.tT, this.toggleTool),
              t.commandBinder.addBinding(u.cR, this.openPreviousTool),
              t.commandBinder.addBinding(u.z2, async (e) =>
                this.openTool(e.toolName, e.softOpening),
              ),
              t.commandBinder.addBinding(u.r_, this.openInitialTool),
              t.commandBinder.addBinding(u.CH, async (e) => this.closeTool(e.toolName)),
              t.commandBinder.addBinding(u.eS, this.closeCurrentTool),
              t.commandBinder.addBinding(g.B, this.onToggleModal),
              t.commandBinder.addBinding(g.r, async () => this.closeModal()),
              t.commandBinder.addBinding(u.Fg, async (e) => {
                this.handleToolCollapse(e.collapse);
              }),
              t.commandBinder.addBinding(u.qy, this.handleBottomPanelCollapse),
              this.containerData.onPropertyChanged('size', this.updateLayoutSize),
              t.subscribe(m.ro, this.onAssetDocked),
              t.subscribe(m.A, this.onAssetUndocked),
              t.subscribe(y.SN, this.handleTextBoxFocus),
              this.toolsData.onPropertyChanged('toolPanelLayout', this.adjustCanvasForPanel),
              this.toolsData.onPropertyChanged('activeToolChanged', this.adjustCanvasForPanel),
              this.toolsData.onPropertyChanged('toolCollapsed', this.adjustCanvasForPanel),
              this.toolsData.onPropertyChanged('assetDocked', this.adjustCanvasForPanel),
              t.commandBinder.addBinding(u.Ye, ({ checkForEdits: e }) =>
                this.closeAndRemoveTools(e),
              ),
              t.commandBinder.addBinding(u.MV, async ({ tools: e }) => this.registerTools(...e)),
            ),
            t.commandBinder.issueCommand(new D.vM(this.allowToolOrViewChange)),
            t.market.register(this, d.t, this.toolsData);
        }
        dispose(e) {
          super.dispose(e), this.closeAndRemoveTools(!1), e.market.unregister(this, d.t);
        }
        registerTools(...e) {
          e.forEach((e) => {
            e.featureFlag &&
              this.bindings.push(
                this.settingsData.onPropertyChanged(e.featureFlag, () => this.updateEnabledTools()),
              );
          }),
            this.toolsData.addTool(...e);
        }
        closePanel() {
          (this.toolsData.toolPanelLayout = this.isSidePanelLayout() ? l.wS.NORMAL : l.wS.NARROW),
            this.toolsData.commit();
        }
        openPanel(e) {
          if (!e.panel)
            return (this.toolsData.toolCollapsed = !!e.panelBar), void this.toolsData.commit();
          const t = this.isSidePanelLayout();
          this.toolsData.toolPanelLayout = t ? l.wS.SIDE_PANEL : l.wS.BOTTOM_PANEL;
          const i = !t && !this.toolsData.softOpening;
          (this.toolsData.toolCollapsed = i), this.toolsData.commit();
        }
        toggleModal(e, t) {
          const { openModal: i, toolPanelLayout: s } = this.toolsData;
          if ((t && i === e) || (!t && e !== i)) return;
          const o = e.toLowerCase(),
            n = this.appData.application === r.Mx.WORKSHOP ? 'workshop_gui' : 'showcase_gui';
          this.analytics.track(n, { gui_action: `open_${o}` }),
            e && this.analytics.track('modal_shown', { modal: e }),
            (this.toolsData.openModal = t ? e : null),
            this.toolsData.commit(),
            s === l.wS.BOTTOM_PANEL && t !== !!i && this.adjustCanvasForPanel(),
            this.engine.broadcast(new y.nV(e, t));
        }
        async activateTool(e) {
          if (this.toolInit) throw new Error('Current tool has not finished initializing!');
          (this.toolsData.toolChangeInProgress = !0),
            this.toolsData.commit(),
            this.closeModal(),
            this.openPanel(e),
            e.manager &&
              ((this.toolInit = e.manager.activate()), await this.toolInit, (this.toolInit = null)),
            (this.toolsData.toolChangeInProgress = !1),
            this.toolsData.commit(),
            this.startTrackingTool(e);
        }
        async deactivateCurrentTool(e, t = !0) {
          if (this.toolClosing) return !1;
          this.toolClosing = !0;
          const i = this.toolsData.getActiveTool();
          if (!i) return (this.toolClosing = !1), !0;
          if ((await this.toolInit, t && !(await this.allowToolOrViewChange())))
            return (this.toolClosing = !1), !1;
          this.engine.broadcast(new y.Z_(!0)),
            i.manager &&
              ((this.toolsData.toolChangeInProgress = !0),
              this.toolsData.commit(),
              await i.manager.deactivate(),
              (this.toolsData.toolChangeInProgress = !1),
              this.toolsData.commit()),
            this.engine.broadcast(new y.Z_(!1)),
            this.closeModal();
          const s =
            this.toolsData.toolPanelLayout === l.wS.BOTTOM_PANEL ||
            this.toolsData.toolPanelLayout === l.wS.NARROW ||
            (null == e ? void 0 : e.panelLeft) === i.panelLeft;
          return (
            !(e && e.panel && e.panel === i.panel && s) && this.closePanel(),
            (this.toolClosing = !1),
            this.stopTrackingTool(i),
            !0
          );
        }
        async activateToolName(e, t) {
          const { activeToolName: i, toolChangeInProgress: s } = this.toolsData;
          if (s) return;
          if (i === e) return (this.toolsData.softOpening = t), void this.toolsData.commit();
          const o = this.toolsData.getTool(e) || null;
          if (null === o) return void this.log.error(`Tool not loaded: ${e}`);
          const [r, l] = await Promise.all([
            this.engine.market.waitForData(n.M),
            this.engine.market.waitForData(a.O),
          ]);
          await (0, h.E)(r, l),
            (await this.deactivateCurrentTool(o)) &&
              (await (0, h.E)(r, l),
              (this.toolsData.softOpening = t),
              this.toolsData.commit(),
              await this.activateTool(o),
              this.toolsData.setActiveTool(o.id));
        }
        async deactivateToolName(e, t) {
          e === this.toolsData.activeToolName &&
            (await this.deactivateCurrentTool(t)) &&
            this.toolsData.setActiveTool(null);
        }
        async openTool(e, t) {
          await this.activateToolName(e, t);
        }
        async closeTool(e) {
          await this.deactivateToolName(e);
        }
        startTrackingTool(e) {
          this.activeToolDurationMap[e.analytic] = Date.now();
        }
        stopTrackingTool(e) {
          const { analytic: t } = e;
          this.activeToolDurationMap[t] = Date.now() - this.activeToolDurationMap[t];
          const i = { tool: `${t}_session_time`, duration: this.activeToolDurationMap[t] };
          this.analytics.track('tool_session_time', i);
        }
        updateEnabledTools() {
          const e = this.toolsData.toolsMap;
          e.atomic(() => {
            for (const t of e)
              if (t.featureFlag) {
                const e = this.settingsData.tryGetProperty(t.featureFlag, !1);
                t.enabled !== e && ((t.enabled = e), t.commit());
              }
          });
        }
        isSidePanelLayout() {
          return !(0, T.p)(this.containerData.size);
        }
      }
      var O = i(59635);
      const k = P;
    },
    28717: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => C });
      var s = i(933),
        o = i(4763),
        r = i(64150),
        n = i(43017),
        a = i(90288),
        h = i(67108),
        l = i(3835),
        d = i(81396),
        c = i(26059),
        u = i(31740),
        m = i(61565),
        p = i(71835),
        g = i(57793),
        y = i(9263),
        v = i(38063),
        f = i(24938),
        w = i(88288),
        M = i(8374),
        b = i(60937),
        D = i(13525),
        S = i(59452),
        x = i(97187),
        T = i(55587);
      class C extends s.Y {
        constructor() {
          super(...arguments), (this.name = 'viewmode-change');
        }
        async init(e, t) {
          (this.engine = t),
            (this.viewmodesModule = await t.getModuleBySymbol(o.XT)),
            this.bindings.push(
              t.subscribe(w.bS, (e) => this.setEnabledModes(e.application)),
              t.commandBinder.addBinding(x._i, this.onChangeViewmodeCommand.bind(this)),
            ),
            Promise.all([t.market.waitForData(f.pu), t.market.waitForData(r.e)]).then(([t, i]) => {
              (this.settings = i),
                (0, T.g_)(i, e.inWorkshop),
                (0, T.CE)(i, e.inWorkshop),
                this.setEnabledModes(t.application),
                this.bindings.push(
                  i.onPropertyChanged(y.gx.FloorPlan, () => (0, T.g_)(i, e.inWorkshop)),
                  i.onPropertyChanged(y.gx.Dollhouse, () => (0, T.CE)(i, e.inWorkshop)),
                );
            });
        }
        async setEnabledModes(e) {
          if (e === f.Mx.SHOWCASE) {
            if (
              ((this.viewmodesModule.data.isDollhouseDisabled = () =>
                !this.settings.tryGetProperty(T.wY, !1)),
              (this.viewmodesModule.data.isFloorplanDisabled = () =>
                !this.settings.tryGetProperty(T.dF, !1)),
              this.previousApp)
            ) {
              const e = this.viewmodesModule.currentMode;
              if (
                (e === n.Ey.Dollhouse && this.viewmodesModule.data.isDollhouseDisabled()) ||
                (e === n.Ey.Floorplan && this.viewmodesModule.data.isFloorplanDisabled())
              ) {
                const e = (await this.engine.market.waitForData(M.O)).pose;
                if (e && (0, n.Bw)(e.mode))
                  this.goToInsideMode(a.nF.Interpolate, { position: e.camera.position }, e.mode);
                else {
                  const e = (await this.engine.market.waitForData(g.M)).pose,
                    t = (await this.engine.market.waitForData(u.Z)).getClosestSweep(e.position, !0),
                    i = t ? { position: t.position } : void 0;
                  this.goToInsideMode(a.nF.Interpolate, i, n.Ey.Panorama);
                }
              }
            }
          } else
            e === f.Mx.WORKSHOP &&
              ((this.viewmodesModule.data.isDollhouseDisabled = () => !1),
              (this.viewmodesModule.data.isFloorplanDisabled = () => !1));
          const t = this.settings.tryGetProperty(S.eC, !1),
            i =
              this.viewmodesModule.data.isFloorplanDisabled() ||
              this.viewmodesModule.data.isDollhouseDisabled();
          this.settings.setProperty(S.eC, t && !i), (this.previousApp = e);
        }
        async onChangeViewmodeCommand(e) {
          try {
            switch (e.mode) {
              case x.BD.INSIDE:
                return this.goToInsideMode(
                  e.transitionType,
                  e.pose,
                  n.Ey.Panorama,
                  e.transitionTime,
                );
              case x.BD.DOLLHOUSE:
                return this.goToDollhouse(e.transitionType, e.pose, e.transitionTime);
              case x.BD.FLOORPLAN:
                return this.goToFloorplan(e.transitionType, e.pose, e.transitionTime);
              case x.BD.ORTHOGRAPHIC:
                return this.goToOrthographic(e.transitionType, e.pose, e.transitionTime);
              case x.BD.MESH:
                return this.goToInsideMode(e.transitionType, e.pose, n.Ey.Mesh, e.transitionTime);
            }
          } catch (t) {
            throw (this.log.error(t), new D.x6(`Could not move to mode ${e.mode}`, t));
          }
        }
        async goToInsideMode(e = a.nF.Interpolate, t = {}, i, s) {
          const o = this.engine.market.tryGetData(u.Z);
          if (!o) throw new D.YR();
          if (!(0, n.Bw)(i)) throw new D.YR();
          let r = t.sweepID || o.currentSweep;
          if ((r || (r = await this.getLookAtSweep(o)), o.isSweepUnaligned(r))) {
            const e = o.getFirstAlignedSweep();
            r = e ? e.id : this.getFirstSweepId(o);
          }
          return (0, n.Bw)(this.viewmodesModule.currentMode) && o.isSweepUnaligned(o.currentSweep)
            ? this.engine.commandBinder.issueCommand(
                new v.ju({ sweep: r, rotation: t.rotation, transition: a.nF.FadeToBlack }),
              )
            : this.viewmodesModule.switchToMode(i, e, { sweepID: r, rotation: t.rotation }, s);
        }
        async getLookAtSweep(e) {
          const t = this.engine.market.tryGetData(g.M);
          if (!t) return this.getFirstSweepId(e);
          const i = this.engine.market.tryGetData(b.c),
            s = (null == i ? void 0 : i.getFloorMin()) || this.getModelMinHeight(),
            o = new d.Plane(l.fU.DOWN, s),
            r = (0, c.Fe)(t.pose.position, t.pose.rotation, o);
          if (!r) return this.getFirstSweepId(e);
          const n = [m._T(), m._k(), (e) => !i || i.isCurrentOrAllFloors(e.floorId)],
            a = [p.l0(r)],
            h = e.sortByScore(n, a).shift();
          if (h) return h.sweep.id;
          const u = e.getClosestSweep(r, !0);
          return u ? u.id : this.getFirstSweepId(e);
        }
        getFirstSweepId(e) {
          const t = e.getFirstSweep();
          if (void 0 === t) throw new Error('First enabled sweep not found');
          return t.id;
        }
        getModelMinHeight() {
          return (
            this.meshData || (this.meshData = this.engine.market.tryGetData(h._)),
            this.meshData ? this.meshData.extendedBounds.min.y : 0
          );
        }
        async goToDollhouse(e = a.nF.Interpolate, t = {}, i) {
          if (this.viewmodesModule.data.isDollhouseDisabled()) throw new D.YR();
          return this.viewmodesModule.switchToMode(n.Ey.Dollhouse, e, t, i);
        }
        async goToFloorplan(e = a.nF.Interpolate, t = {}, i) {
          if (this.viewmodesModule.data.isFloorplanDisabled()) throw new D.YR();
          const s = await this.engine.getModuleBySymbol(o.iM);
          return (
            s && (await s.getTransitionPromise()),
            this.viewmodesModule.switchToMode(n.Ey.Floorplan, e, t, i, !0)
          );
        }
        async goToOrthographic(e = a.nF.Interpolate, t = {}, i) {
          const s = await this.engine.getModuleBySymbol(o.iM);
          return (
            s && (await s.getTransitionPromise()),
            this.viewmodesModule.switchToMode(n.Ey.Orthographic, e, t, i)
          );
        }
      }
    },
    5429: (e, t, i) => {
      'use strict';
      i.d(t, { D5: () => l, Ex: () => d, G1: () => a, rn: () => h });
      var s = i(81396),
        o = i(28721);
      const r = () => Math.random(),
        n = {},
        a = (e, t = r()) => (n[t] || (n[t] = new s.Vector4(r(), r(), r(), e)), n[t]),
        h = () => new s.Color(r(), r(), r()),
        l = (e) => e instanceof Object && 'r' in e && 'g' in e && 'b' in e;
      function d(e) {
        return `#${(0, o.Q_)(255 * e.r, 2, '0', 16)}${(0, o.Q_)(255 * e.g, 2, '0', 16)}${(0, o.Q_)(255 * e.b, 2, '0', 16)}`;
      }
    },
    21206: (e, t, i) => {
      'use strict';
      async function s(e, t) {
        if ((await e.transition.promise, !t.canStartTransition())) {
          const e = new Promise((e) => {
            const i = t.onChanged(() => {
              t.canStartTransition() && (i.cancel(), e());
            });
          });
          await e;
        }
      }
      i.d(t, { E: () => s });
    },
    92393: (e) => {
      e.exports =
        'precision highp float;precision highp int;uniform mat4 viewMatrix;uniform vec3 cameraPosition;vec3 closestPointToRay(vec3 point,vec3 origin,vec3 direction){vec3 d=point-origin;float D=dot(d,direction);return origin+D*direction;}vec3 rayIntersectsSphere(vec3 origin,float radius,vec3 rayOrigin,vec3 rayDirection){vec3 chordPoint=closestPointToRay(origin,rayOrigin,rayDirection);float D1=length(rayOrigin-chordPoint);float D=length(chordPoint-origin);float D2=sqrt(radius*radius-D*D);return rayOrigin+(D1+D2)*rayDirection;}uniform float borderSize;uniform float textureSampleScale;uniform samplerCube panoTexture;uniform vec4 borderColor;varying vec2 vUv;const vec4 transparent=vec4(0.,0.,0.,0.);const float PI=3.14159265359;const float HALF_PI=PI/2.;void main(){float fadeDist=0.1;float r=1.;vec2 uv=(vUv*2.)-vec2(1.,1.);float d=length(uv);float p=d*PI-HALF_PI;float y=sin(p);float h=cos(p)*textureSampleScale;vec3 sampleVec=vec3(uv.x*h,y,uv.y*h);vec4 panoColor=textureCube(panoTexture,sampleVec);panoColor.a=clamp(((1.-d)/d)/fadeDist,0.,1.);vec4 outColor=mix(panoColor,transparent,step(1.,d));float isBorder=max(sign(borderSize),0.)*step(1.-borderSize,d)*step(d,1.);gl_FragColor=mix(outColor,borderColor,isBorder);}';
    },
    27115: (e) => {
      e.exports =
        'precision highp float;precision highp int;uniform mat4 modelMatrix;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;uniform mat4 viewMatrix;uniform mat3 normalMatrix;uniform vec3 cameraPosition;attribute vec3 position;attribute vec3 normal;attribute vec2 uv;varying vec2 vUv;void main(){vUv=uv;vec4 projectedPosition=projectionMatrix*viewMatrix*modelMatrix*vec4(position,1.);gl_Position=projectedPosition;}';
    },
    20367: (e) => {
      e.exports =
        'precision highp float;precision highp int;uniform mat4 viewMatrix;uniform vec3 cameraPosition;vec3 closestPointToRay(vec3 point,vec3 origin,vec3 direction){vec3 d=point-origin;float D=dot(d,direction);return origin+D*direction;}vec3 rayIntersectsSphere(vec3 origin,float radius,vec3 rayOrigin,vec3 rayDirection){vec3 chordPoint=closestPointToRay(origin,rayOrigin,rayDirection);float D1=length(rayOrigin-chordPoint);float D=length(chordPoint-origin);float D2=sqrt(radius*radius-D*D);return rayOrigin+(D1+D2)*rayDirection;}uniform sampler2D bg;uniform sampler2D mask;varying vec2 vUv;void main(){vec4 existingColor=texture2D(bg,vUv);vec4 maskColor=texture2D(mask,vUv);gl_FragColor=vec4(existingColor.rgb*maskColor.rgb,maskColor.a);}';
    },
    98419: (e) => {
      e.exports =
        'precision highp float;precision highp int;uniform mat4 modelMatrix;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;uniform mat4 viewMatrix;uniform mat3 normalMatrix;uniform vec3 cameraPosition;attribute vec3 position;attribute vec3 normal;attribute vec2 uv;varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelMatrix*vec4(position,1.);}';
    },
    14282: (e) => {
      e.exports =
        'precision highp float;precision highp int;uniform mat4 viewMatrix;uniform vec3 cameraPosition;vec3 closestPointToRay(vec3 point,vec3 origin,vec3 direction){vec3 d=point-origin;float D=dot(d,direction);return origin+D*direction;}vec3 rayIntersectsSphere(vec3 origin,float radius,vec3 rayOrigin,vec3 rayDirection){vec3 chordPoint=closestPointToRay(origin,rayOrigin,rayDirection);float D1=length(rayOrigin-chordPoint);float D=length(chordPoint-origin);float D2=sqrt(radius*radius-D*D);return rayOrigin+(D1+D2)*rayDirection;}\n#define M_PI  3.14159265359\nuniform samplerCube cubemap;uniform float yaw;varying vec2 vUv;void main(){vec2 uv=vUv;float theta=uv.x*2.*M_PI+yaw;float phi=uv.y*M_PI;vec3 longitude=vec3(sin(theta),1.,-cos(theta));vec3 latitude=vec3(sin(phi),-cos(phi),sin(phi));vec3 dir=longitude*latitude;normalize(dir);gl_FragColor=vec4(textureCube(cubemap,dir).rgb,1.);}';
    },
    17965: (e) => {
      e.exports =
        'precision highp float;precision highp int;uniform mat4 modelMatrix;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;uniform mat4 viewMatrix;uniform mat3 normalMatrix;uniform vec3 cameraPosition;attribute vec3 position;attribute vec3 normal;attribute vec2 uv;varying vec2 vUv;void main(){vUv=vec2(1.-uv.x,uv.y);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}';
    },
    46262: (e) => {
      e.exports =
        'precision highp float;precision highp int;uniform mat4 viewMatrix;uniform vec3 cameraPosition;vec3 closestPointToRay(vec3 point,vec3 origin,vec3 direction){vec3 d=point-origin;float D=dot(d,direction);return origin+D*direction;}vec3 rayIntersectsSphere(vec3 origin,float radius,vec3 rayOrigin,vec3 rayDirection){vec3 chordPoint=closestPointToRay(origin,rayOrigin,rayDirection);float D1=length(rayOrigin-chordPoint);float D=length(chordPoint-origin);float D2=sqrt(radius*radius-D*D);return rayOrigin+(D1+D2)*rayDirection;}uniform vec3 topColor;uniform vec3 bottomColor;uniform float radius;varying vec3 rayOrigin;varying vec3 rayDirection;\n#define SRGB_TO_LINEAR(c)pow((c),vec3(2.2))\n#define LINEAR_TO_SRGB(c)pow((c),vec3(1./2.2))\n#define USE_DITHER \nfloat gradientNoise(in vec2 uv){const vec3 magic=vec3(0.06711056,0.00583715,52.9829189);return fract(magic.z*fract(dot(uv,magic.xy)));}void main(){vec3 worldPosition=rayIntersectsSphere(vec3(0.,0.,0.),radius,rayOrigin,normalize(rayDirection));float normalizedHeight=(worldPosition.y+radius)/(radius*2.);float ratio=smoothstep(0.,0.5,normalizedHeight);vec3 colorFromGradient=mix(SRGB_TO_LINEAR(bottomColor),SRGB_TO_LINEAR(topColor),ratio);vec3 color=LINEAR_TO_SRGB(colorFromGradient);\n#if defined (USE_DITHER)\ncolor+=(1./255.)*gradientNoise(gl_FragCoord.xy)-(0.5/255.);\n#endif\ngl_FragColor=vec4(color,1.);}';
    },
    80218: (e) => {
      e.exports =
        'precision highp float;precision highp int;uniform mat4 modelMatrix;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;uniform mat4 viewMatrix;uniform mat3 normalMatrix;uniform vec3 cameraPosition;attribute vec3 position;attribute vec3 normal;attribute vec2 uv;varying vec3 rayOrigin;varying vec3 rayDirection;uniform mat4 cameraMatrix;uniform mat4 inverseProjectionMatrix;vec3 unproject(vec3 pos){vec4 v=cameraMatrix*inverseProjectionMatrix*vec4(pos,1.);return vec3(v.xyz/v.w);}void main(){rayOrigin=unproject(vec3(position.xy,-1.));vec3 end=unproject(vec3(position.xy,1.));rayDirection=normalize(end-rayOrigin);gl_Position=vec4(position,1.);}';
    },
  },
]);
