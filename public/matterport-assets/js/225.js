/*! For license information please see 225.js.LICENSE.txt */
'use strict';
(self.webpackChunkmp_webgl = self.webpackChunkmp_webgl || []).push([
  [225],
  {
    13668: (i, e, n) => {
      n.d(e, { Bl: () => r, Lm: () => d, Pi: () => o, RV: () => s, e_: () => l, v6: () => a });
      var t = n(56063);
      class a extends t.m {
        constructor(i) {
          super(), (this.payload = { exclude: i || [] });
        }
      }
      a.id = 'PLUGIN_RESET_ALL';
      class s extends t.m {
        constructor(i, e, n, t) {
          super(), (this.payload = { name: i, config: e, configMeta: n, permissions: t || {} });
        }
      }
      s.id = 'PLUGIN_RELOAD';
      class o extends t.m {
        constructor(i, e, n, t) {
          super(), (this.payload = { name: i, config: e, configMeta: n, permissions: t || {} });
        }
      }
      o.id = 'PLUGIN_LOAD';
      class l extends t.m {
        constructor(i) {
          super(), (this.payload = { name: i });
        }
      }
      l.id = 'PLUGIN_UNLOAD';
      class d extends t.m {
        constructor(i, e) {
          super(), (this.payload = { operation: i, callback: e });
        }
      }
      d.id = 'PLUGIN_CONFIG_FETCH_DATA';
      class r extends t.m {
        constructor(i, e) {
          super(), (this.payload = { attachmentId: i, pluginId: e });
        }
      }
      r.id = 'ATTACHMENT_ASSOCIATE_WITH_PLUGIN';
      class c extends t.m {
        constructor(i, e) {
          super(), (this.payload = { attachmentId: i, pluginId: e });
        }
      }
      c.id = 'ATTACHMENT_DISSOCIATE_FROM_PLUGIN';
    },
    37225: (i, e, n) => {
      n.r(e), n.d(e, { default: () => b });
      var t = n(34608),
        a = n(4763),
        s = n(29067),
        o = n(933),
        l = n(73754),
        d = n(43822),
        r = n(24938),
        c = n(88288),
        u = n(13668),
        g = n(6394),
        h = n(1581),
        p = n.n(h),
        m = n(5477),
        f = n.n(m),
        y = n(5885),
        P = n(98276),
        v = n(10880);
      class w {
        getFactory(i) {
          return i.messengerFactory;
        }
      }
      class b extends o.Y {
        constructor() {
          super(...arguments),
            (this.name = 'plugin'),
            (this.data = new l.e()),
            (this.allowLoad = !1),
            (this.allowLiveReload = !0),
            (this.ajv = new (p())({ strict: !1 })),
            (this.pluginOverlayElements = new Map()),
            (this.applicationType = void 0),
            (this.onResetPlugins = async ({ exclude: i }) => {
              await this.unloadPlugins(i), await this.loadConfigured(i);
            }),
            (this.onLoadPlugin = async ({ config: i, configMeta: e, permissions: n }, t) => {
              var a;
              if (this.allowLiveReload && t) {
                const s = { properties: e, required: [] };
                for (const i of Object.keys(s.properties)) {
                  (null === (a = s.properties[i].required) || void 0 === a
                    ? void 0
                    : a.includes(i)) && s.required.push(i);
                }
                if (!this.ajv.validate(s, i)) return;
                await this.load(
                  Object.assign(Object.assign(Object.assign({}, t), { config: i }), n),
                );
              }
            }),
            (this.onUnloadPlugin = async (i) => {
              if (this.allowLiveReload && i) {
                const e = { applicationKey: i.applicationKey, id: i.id };
                await this.unload(e);
              }
            }),
            (this.onReloadPlugin = async (
              { name: i, config: e, configMeta: n, permissions: t },
              a,
            ) => {
              this.allowLiveReload &&
                (await this.onUnloadPlugin(a),
                this.debouncedOnLoadPlugin(
                  { name: i, config: e, configMeta: n, permissions: t },
                  a,
                ));
            }),
            (this.debouncedOnReloadPlugin = (0, g.D)(this.onReloadPlugin, 500)),
            (this.onReloadPluginCommand = async (i) => {
              if (!this.allowLiveReload) return;
              let e = this.configuredPlugins.find((e) => e.id === i.name);
              e || (e = this.createLoadableConfig(i.name)), this.debouncedOnReloadPlugin(i, e);
            }),
            (this.debouncedOnLoadPlugin = (0, g.D)(this.onLoadPlugin, 500)),
            (this.onLoadPluginCommand = async (i) => {
              this.debouncedOnLoadPlugin(i, this.createLoadableConfig(i.name));
            }),
            (this.debouncedOnUnloadPlugin = (0, g.D)(this.onUnloadPlugin, 500)),
            (this.onUnloadPluginCommand = async (i) => {
              let e = this.configuredPlugins.find((e) => e.id === i.name);
              if (!e) {
                const n = this.availablePlugins.get(i.name);
                n && (e = { applicationKey: n.applicationKey, id: n.name });
              }
              this.debouncedOnUnloadPlugin(e);
            }),
            (this.onFetchSdkDataCommand = async (i) => {
              const e = await this.engine.diContainer.resolve('$ServiceSdk'),
                [n, t] = i.operation.split('.');
              let a;
              try {
                const i = e[n][t];
                a = i.subscribe
                  ? await new Promise((e, n) => {
                      const t = i.subscribe((i) => {
                        t.cancel(), e(i);
                      });
                    })
                  : await i();
              } catch (e) {
                throw new Error('Failed to run command: ' + i.operation);
              }
              i.callback(a);
            });
        }
        async init(i, e) {
          if (
            ((this.commandBinder = e.commandBinder),
            f()(this.ajv),
            ([this.ses, this.sdk, this.pluginConfigDataModule] = await Promise.all([
              e.getModuleBySymbol(a.lC),
              e.getModuleBySymbol(t.Mv),
              e.getModuleBySymbol(a.Yi),
            ])),
            (this.engine = e),
            (this.allowLoad = i.pluginPolicies.enabled),
            (this.allowLiveReload =
              this.allowLoad &&
              !this.pluginConfigDataModule.pluginConfigData.disabled &&
              !this.pluginConfigDataModule.pluginConfigData.preventLiveEdit),
            this.allowLoad && this.initializeServiceConnection(),
            this.allowLoad)
          ) {
            const i = e.subscribe(c.LZ, async ({ phase: n, application: t }) => {
              n === r.nh.PLAYING &&
                (i.cancel(),
                (this.applicationType = t),
                this.allowLiveReload
                  ? await this.loadConfigured()
                  : (this.log.devInfo(
                      'Reached PLAYING stage, checking whether configured plugins need to load to start: ',
                      t,
                    ),
                    t === r.Mx.SHOWCASE && (await this.loadConfigured()),
                    this.bindings.push(
                      e.subscribe(c.pB, async (i) => {
                        if (
                          (this.log.devInfo(
                            'Switch in active application detected by plugin system: ',
                            i.application,
                          ),
                          i.application === r.Mx.WORKSHOP)
                        )
                          try {
                            await this.disposeAll();
                          } catch (i) {
                            this.log.debugWarn(
                              'Entering workshop, one or more plugins failed to dispose properly:',
                              i,
                            );
                          }
                        else i.application === r.Mx.SHOWCASE && (await this.loadConfigured());
                      }),
                    )));
            });
          }
          this.bindings.push(
            e.commandBinder.addBinding(u.v6, this.onResetPlugins),
            e.commandBinder.addBinding(u.RV, this.onReloadPluginCommand),
            e.commandBinder.addBinding(u.Pi, this.onLoadPluginCommand),
            e.commandBinder.addBinding(u.e_, this.onUnloadPluginCommand),
            e.commandBinder.addBinding(u.Lm, this.onFetchSdkDataCommand),
            e.commandBinder.addBinding(P._, this.handlePluginVisibility.bind(this)),
          ),
            e.market.register(this, l.e, this.data);
        }
        initializeServiceConnection() {
          const i = this.pluginConfigDataModule.serviceSdkKey;
          this.engine.diContainer.bindAsyncFactory('$ServiceSdk', () =>
            s.tK.connect(
              {
                connect: () => this.sdk.connectPlugin(i, 'PluginConfigRootConnection'),
                cancelConnecting: () => {},
              },
              new w(),
              window,
            ),
          );
        }
        async handlePluginVisibility(i) {
          for (const e of i.ids)
            this.data.visibilityData.set(e, i.value), this.toggleVisibility(e, i.value);
        }
        toggleVisibility(i, e) {
          var n;
          null === (n = this.pluginOverlayElements.get(i)) ||
            void 0 === n ||
            n.classList.toggle('hidden', !e),
            this.commandBinder.issueCommand(new v.Y(i, e));
        }
        async loadConfigured(i = []) {
          if (this.pluginConfigDataModule.registryLoaded) {
            if (this.pluginConfigDataModule.pluginConfigData.disabled)
              return void this.log.debug('Cannot load plugins! Disabled by URL parameter.');
            (this.configuredPlugins = await this.pluginConfigDataModule.getConfiguredPlugins(
              this.applicationType,
            )),
              (this.availablePlugins =
                this.pluginConfigDataModule.pluginConfigData.availablePlugins),
              this.data.visibilityData.replace(
                this.configuredPlugins
                  .filter((i) => !i.hideViewToggle)
                  .reduce((i, e) => {
                    var n;
                    return (
                      (i[e.id] =
                        null === (n = this.data.visibilityData.get(e.id)) || void 0 === n || n),
                      i
                    );
                  }, {}),
              ),
              this.log.debug(
                'Combined configuration with registry data, loading plugins: ' +
                  JSON.stringify(this.configuredPlugins, void 0, 2),
              ),
              await this.waitForPluginLoad(i);
          }
        }
        async waitForPluginLoad(i) {
          var e;
          if (!this.configuredPlugins)
            return void this.log.error('Waiting for load before plugin records fetched.');
          const n = [];
          for (const i of this.configuredPlugins)
            n.push(
              this.load(i).then(() => {
                this.engine.broadcast(
                  new y.I(i.id, i.src, Date.now() - performance.timing.navigationStart),
                );
              }),
            );
          try {
            await Promise.all(n);
          } catch (i) {
            this.log.warn('Issues were encountered loading configured plugins.');
          }
          for (const n of this.pluginOverlayElements.keys()) {
            if (i.includes(n)) continue;
            const t = this.data.visibilityData.get(n);
            null === (e = this.pluginOverlayElements.get(n)) ||
              void 0 === e ||
              e.classList.toggle('hidden', !t);
          }
        }
        async fetchPlugin(i, e, n, t, a) {
          t.strict && this.ses.freezeForStrict();
          const s = await this.ses.makeSecureEnvironment(
            i + `${n ? this.ses.separator + n : ''}`,
            e,
            t,
            this.pluginConfigDataModule.pluginConfigData.eventTarget,
            a,
          );
          if (s) {
            return [s, s.compartment.globalThis.plugin];
          }
          return null;
        }
        async unload(i) {
          const e = i.id && '' !== i.id ? i.id : 'default',
            n = { applicationKey: i.applicationKey, id: e },
            t = this.data.get(n);
          let a = null;
          if (t) {
            try {
              a = t.dispose();
            } catch (i) {
              this.log.warn(
                'An error occurred when disposing a plugin, it may be in a partially disposed state',
                i,
              );
            }
            this.data.delete(n);
          }
          return a || Promise.resolve();
        }
        async load(i) {
          var e;
          const {
            applicationKey: n,
            src: t,
            id: a,
            strict: s,
            fetchLevel: o = d.u6.None,
            peerDependencies: l,
            canPlaceInGrid: r,
          } = i;
          if (!this.allowLoad) {
            const i = t.startsWith('http') ? t : `${t.substring(0, 16)}...`;
            return Promise.reject(
              `Load for plugin <${a}:${i}> requested, but plugin system is not available.`,
            );
          }
          if (n.includes(this.ses.separator))
            return Promise.reject(
              `Application Key cannot contain the separator character: ${this.ses.separator}`,
            );
          if (a.includes(this.ses.separator))
            return Promise.reject(
              `Plugin ID cannot contain the separator character: ${this.ses.separator}`,
            );
          const c = void 0 === s || s,
            u = a || 'default',
            g = { applicationKey: n, id: u };
          if (this.data.get(g)) return Promise.reject(`Plugin for ${n}-${u} already loaded.`);
          const h = {
              strict: c,
              canFetch: o >= d.u6.AnonymousFetch,
              canFetchAsUser: o >= d.u6.UserFetch,
              canStoreLocal: !0,
              canPlaceInGrid: r || !1,
            },
            [p, m] = (await this.fetchPlugin(n, t, u, h, l)) || [];
          if (p && m) {
            const t =
              null === (e = p.overlayElement) || void 0 === e
                ? void 0
                : e.querySelector(`.${n}${this.ses.separator}${a}`);
            t &&
              !i.hideViewToggle &&
              (this.pluginOverlayElements.set(u, t), this.data.visibilityData.set(u, !0)),
              await this.initPlugin(p, m.factory, i, u);
          }
        }
        async initPlugin(i, e, n, t) {
          const a = e(),
            { applicationKey: o, id: l, config: d } = n;
          let r = () => {};
          const c = a.onInit || a.init;
          let u = Promise.resolve();
          if (c) {
            class i {
              constructor(i) {
                this.sdk = i;
              }
              connect() {
                return this.sdk.connectPlugin(o, l);
              }
              cancelConnecting() {}
            }
            const e = await s.tK.connect(new i(this.sdk), new w(), window);
            (u = c.call(a, e, d)), (r = () => e.disconnect());
          }
          const g = this.pluginConfigDataModule.pluginConfigData.eventTarget,
            h = this.setupVisibilityEvents(g);
          async function p() {
            const e = a.onDestroy || a.dispose;
            return ((null == e ? void 0 : e.call(a)) || Promise.resolve()).finally(() => {
              r(), h.cancel(), g.delete(t), i.dispose();
            });
          }
          const m = { applicationKey: o, id: l };
          try {
            return await u, this.data.set(m, a, p), Promise.resolve();
          } catch (i) {
            this.log.warn('Plugin initialization failed: ', i),
              this.log.debugWarn('Attemptying dispose for clean up...');
            try {
              await p();
            } catch (i) {
              this.log.warn('Auto-cleanup of plugin had errors: ', i);
            }
            return Promise.reject(i);
          }
        }
        setupVisibilityEvents(i) {
          const e = async (i, e) => {
            '_CLOSE_' === i.name &&
              (await this.engine.commandBinder.issueCommand(new P._([e], !1)));
          };
          return i.onElementChanged({ onAdded: e, onUpdated: e });
        }
        dispose(i) {
          super.dispose(i),
            this.disposeAll().catch((i) => {
              this.log.warn('One or more plugins failed to dispose properly.', i);
            });
        }
        disposeAll() {
          return (this.configuredPlugins = []), this.unloadPlugins();
        }
        unloadPlugins(i = []) {
          this.log.devInfo('Unloading all plugins...except: ' + i.join(', '));
          const e = [];
          for (const [n, t] of this.data.plugins.entries()) {
            const a = n.split('.')[1];
            i.includes(a) || (e.push(t.dispose()), this.data.plugins.delete(n));
          }
          return Promise.all(e);
        }
        createLoadableConfig(i) {
          var e, n;
          const t = this.availablePlugins.get(i),
            {
              src: a,
              config: s,
              applicationKey: o,
              strict: l,
              outputs: d,
              peerDependencies: r,
            } = t;
          return {
            id: i,
            src: a,
            config: s,
            outputs: d,
            applicationKey: o,
            strict: l,
            peerDependencies: r,
            canPlaceInGrid: null === (e = t.options) || void 0 === e ? void 0 : e.canPlaceInGrid,
            hideViewToggle: null === (n = t.options) || void 0 === n ? void 0 : n.hideViewToggle,
          };
        }
      }
    },
    10880: (i, e, n) => {
      n.d(e, { Y: () => a });
      var t = n(56063);
      class a extends t.m {
        constructor(i, e) {
          super(), (this.payload = { owner: i, isVisible: e });
        }
      }
      a.id = 'TOGGLE_SCENES_BY_OWNER';
    },
  },
]);
