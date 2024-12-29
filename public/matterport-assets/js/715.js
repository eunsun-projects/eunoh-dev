/*! For license information please see 715.js.LICENSE.txt */
'use strict';
(self.webpackChunkmp_webgl = self.webpackChunkmp_webgl || []).push([
  [715],
  {
    3715: (e, t, i) => {
      i.r(t), i.d(t, { default: () => Z });
      var a = i(933),
        o = i(4763),
        s = i(68720),
        n = i(58724),
        r = i(31971),
        h = i(20360),
        d = i(69947),
        m = i(57793),
        l = i(91524),
        c = i(90512),
        u = i(31740),
        p = i(96783),
        w = i(43627),
        g = i(53462);
      const b = 0.1,
        y = 0.7,
        z = 2,
        D = 3,
        B = 1.1;
      var S = i(63513),
        v = i(93955),
        T = i(7516);
      class Z extends a.Y {
        constructor() {
          super(...arguments),
            (this.name = 'zoom-controls'),
            (this.uhQuality = {}),
            (this.config = { enabled: !0 });
        }
        async init(e, t) {
          (this.config.enabled = !!e.enabled),
            (this.sweepTilingModule = await t.getModuleBySymbol(o.RR)),
            this.config.enabled && (await this.registerControls(t)),
            (this.engine = t),
            (this.cameraModule = await t.getModuleBySymbol(o.kg)),
            (this.cameraData = await t.market.waitForData(m.M)),
            (this.viewmodeData = await t.market.waitForData(c.O)),
            (this.sweepData = await t.market.waitForData(u.Z)),
            this.bindings.push(
              t.commandBinder.addBinding(S.bj, async (e) => this.zoomBy(e.step)),
              t.commandBinder.addBinding(S.KB, async (e) => this.zoomBy(-e.step)),
              t.commandBinder.addBinding(S.ob, async () => this.zoomTo(1)),
              t.commandBinder.addBinding(S.ts, async (e) => this.zoomTo(e.value)),
              t.commandBinder.addBinding(S._N, async () =>
                Promise.resolve(this.getMaxZoomAvailable()),
              ),
            );
        }
        async registerControls(e) {
          e.getModuleBySymbol(o.PZ).then((e) => {
            this.bindings.push(
              e.registerHandler(s.a, (e) => this.zoomByInput(this.scrollToZoomDelta(e))),
            ),
              this.bindings.push(
                e.registerHandler(n.G, (e) => this.zoomByInput(this.pinchToZoomDelta(e))),
              ),
              this.bindings.push(e.registerHandler(r.e, (e) => this.keyHandler(e)));
          });
        }
        zoomTo(e) {
          const t = this.cameraData.zoom();
          if (!this.validateViewmode()) return t;
          const { currentSweep: i, currentSweepObject: a } = this.sweepData;
          if (
            (a && this.checkTilingZoomLevels(e, a), (e = (0, p.uZ)(e, y, this.getMaxZoom(i))) !== t)
          ) {
            const t = (0, w.ZY)(this.cameraData.baseFovY / e),
              i = l.oR.near,
              a = l.oR.far;
            this.cameraModule.updateCameraProjection(
              new g.M().makePerspectiveFov(t, this.cameraData.aspect(), i, a),
            );
          }
          return this.engine.broadcast(new v.Z(e)), e;
        }
        checkTilingZoomLevels(e, t) {
          if (e >= B && this.zoomedSweep !== t) {
            this.zoomedSweep = t;
            this.sweepTilingModule.enableZooming(!0, t.id)
              ? (this.uhQuality[t.id] = !0)
              : ((this.uhQuality[t.id] = !1), (this.zoomedSweep = void 0));
          } else
            e < B &&
              this.zoomedSweep &&
              this.zoomedSweep === t &&
              (this.sweepTilingModule.enableZooming(!1, this.zoomedSweep.id),
              (this.zoomedSweep = void 0));
        }
        getMaxZoom(e) {
          return this.uhQuality[null != e ? e : 'none'] ? D : z;
        }
        zoomBy(e) {
          const t = this.cameraData.zoom();
          return this.validateViewmode() ? this.zoomTo(t + e) : t;
        }
        validateViewmode() {
          return this.viewmodeData.isInside() && this.cameraData.canTransition();
        }
        scrollToZoomDelta(e) {
          return -Math.sign(e.delta.y) * b;
        }
        pinchToZoomDelta(e) {
          return e.pinchDelta * (z - y);
        }
        zoomByInput(e) {
          const t = this.cameraData.zoom();
          if (!this.validateViewmode()) return t;
          const i = this.sweepData.currentSweep,
            a = (0, p.uZ)(t + e, y, this.getMaxZoom(i));
          return this.zoomTo(a);
        }
        keyHandler(e) {
          if (e.state === d.M.DOWN)
            switch (e.key) {
              case h.R.PLUSEQUALS:
                this.zoomByInput(b);
                break;
              case h.R.DASHUNDERSCORE:
                this.zoomByInput(-b);
                break;
              case h.R.OPENBRACKET:
                this.zoomTo(1);
            }
        }
        getMaxZoomAvailable() {
          if (!this.sweepData.currentSweepObject) return z;
          return this.sweepData.currentSweepObject.availableResolution(T.SL.ULTRAHIGH) >=
            T.SL.ULTRAHIGH
            ? D
            : z;
        }
      }
    },
  },
]);
