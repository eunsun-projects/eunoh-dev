/*! For license information please see 521.js.LICENSE.txt */
'use strict';
(self.webpackChunkmp_webgl = self.webpackChunkmp_webgl || []).push([
  [521],
  {
    55671: (e, t, n) => {
      n.r(t), n.d(t, { default: () => d });
      var a = n(64777),
        r = n(34608),
        l = n(56620),
        i = n(52763),
        s = n(19765),
        o = n(4763);
      const d = async function (e) {
        const t = await e.getModuleBySymbol(r.Ak),
          n = await e.getModuleBySymbol(o.Ve),
          d = t.addPanel(a.s.TITLE, a.s.HOTKEYS, { width: 350 });
        await t.loadPromise.then(() => {
          const a = 'meshtextures';
          [
            {
              panel: d,
              header: a,
              setting: 'disableTextureStreamBelowLod',
              initialValue: () => -1,
              onChange: (e) => {
                e > -1 && n.textureQualityMap.limitStreamingBelow(e);
              },
              urlParam: !0,
              rangePrecision: 0,
              range: [-1, 7],
            },
            {
              panel: d,
              header: a,
              setting: 'textureStreamPause',
              initialValue: () => l.ZP.debugPauseTexStream,
              onChange: (e) => {
                l.ZP.debugPauseTexStream = e;
              },
              urlParam: !0,
            },
            {
              panel: d,
              header: a,
              setting: 'textureStreamRaycastHits',
              initialValue: () => l.ZP.debugLOD,
              onChange: (e) => {
                (l.ZP.debugLOD = e), e || (0, s.dw)();
              },
              urlParam: !0,
            },
            {
              panel: d,
              header: a,
              setting: 'debugRTTQuality',
              initialValue: () => l.ZP.debugRttQuality,
              onChange: (t) => {
                (l.ZP.debugRttQuality = t),
                  t ||
                    e.commandBinder.issueCommand(
                      new i.u({ color: null }, { style: i.u.selectBy.all }),
                    );
              },
              urlParam: !0,
            },
            {
              panel: d,
              header: a,
              setting: 'debugRTTScores',
              initialValue: () => l.ZP.debugRttScores,
              onChange: (t) => {
                (l.ZP.debugRttScores = t),
                  t ||
                    e.commandBinder.issueCommand(
                      new i.u({ color: null }, { style: i.u.selectBy.all }),
                    );
              },
              urlParam: !0,
            },
          ].forEach((e) => t.registerMenuEntry(e));
        });
      };
    },
    47774: (e, t, n) => {
      n.r(t), n.d(t, { default: () => h });
      var a = n(34608),
        r = n(64150),
        l = n(4763),
        i = n(5743),
        s = n(56620),
        o = n(37332),
        d = n(28730),
        u = n(7230),
        g = n(81396),
        c = n(5429);
      async function h(e) {
        const t = await e.getModuleBySymbol(l.Ve),
          [n, h] = await Promise.all([e.market.waitForData(r.e), e.getModuleBySymbol(a.Ak)]),
          m = t.commands;
        await h.loadPromise.then(() => {
          h.registerButton('Mesh', 'Toggle visible', () => {
            t.meshes.forEach((e) => {
              e.modelMesh.visible = !e.modelMesh.visible;
            });
          }),
            h.registerButton('Mesh', 'Toggle UV debug', () => {
              t.meshes.forEach((t) => {
                const n = t.renderer.chunkRenderingModeOverride ? null : u.S.UV;
                e.commandBinder.issueCommand(new m.SetChunkRenderModeCommand(n));
              });
            }),
            h.registerButton('Mesh', 'Toggle depth', () => {
              t.meshes.forEach((t) => {
                const n = t.renderer.chunkRenderingModeOverride ? null : u.S.Depth;
                e.commandBinder.issueCommand(new m.SetChunkRenderModeCommand(n));
              });
            }),
            h.registerButton('Mesh', 'Toggle transparent', () => {
              t.meshes.forEach((t) => {
                const n = t.renderer.chunkRenderingModeOverride ? null : u.S.Transparent;
                e.commandBinder.issueCommand(new m.SetChunkRenderModeCommand(n));
              });
            }),
            h.registerButton('Mesh', 'Toggle wireframe', () => {
              t.meshes.forEach((t) => {
                const n = t.renderer.chunkRenderingModeOverride ? null : u.S.Wireframe;
                e.commandBinder.issueCommand(new m.SetChunkRenderModeCommand(n));
              });
            });
          let a = !1;
          h.registerButton('Mesh', 'Toggle flat shading', () => {
            (a = !a),
              t.meshes.forEach((e) => {
                for (const t of e.modelMesh.chunks) t.setFlatShading(a);
              });
          });
          const r = (() => {
            let e = !1;
            return (n, a) => {
              const r = new g.Vector4(1, 1, 1, 0);
              var l;
              (e = !e),
                (l = n || e),
                t.meshes.forEach((e) => {
                  for (const t of e.modelMesh.chunks) {
                    const e = a ? 100 * t.id : 100 * t.meshSubgroup,
                      n = l ? (0, c.G1)(0.5, e) : r;
                    t.setColorOverlay(n);
                  }
                });
            };
          })();
          h.registerButton('Mesh', 'Highlight Rooms', r),
            h.registerButton('Mesh', 'Highlight Chunks', () => r(!0, !0)),
            n.onPropertyChanged(s.NR, (e) => {
              t.meshes.forEach((t) => {
                for (const n of t.modelMesh.chunks) {
                  const a = t.meshData.meshGroups.floors.get(n.meshGroup);
                  a &&
                    n.setMaterialsUniform({
                      floorTrimHeight: 1 - e / 100,
                      floorHeightMin: a.boundingBox.min.y,
                      floorHeightMax: a.boundingBox.max.y,
                    });
                }
              });
            });
          const l = (e, t, a, r, l) => {
            h.registerSetting(e, t, a, !0, i.SettingPersistence.NONE, l), n.onPropertyChanged(t, r);
          };
          l('Wireframe', s.Lp, !1, (e) => {
            t.meshes.forEach((t) => {
              for (const n of t.modelMesh.chunks) n.setWireframe(e);
            });
          });
          const p = {
            [o.h.Wireframe]: {
              Wireframe: [
                'thickness',
                'wireframeOpacity',
                'stroke',
                'fillEnabled',
                'fill',
                'insideAltColor',
                'dualStroke',
                'secondThickness',
              ],
              'Wireframe Dashes': ['dashEnabled', 'dashLength', 'dashAnimate', 'dashOverlap'],
              'Wireframe Advanced': ['squeeze', 'squeezeMin', 'squeezeMax'],
            },
          };
          for (const e in p) {
            const n = d.Z.modelChunk.uniforms[e];
            for (const a in p[e])
              for (const r of p[e][a])
                l(
                  a,
                  r,
                  n[r].value,
                  (e) => {
                    t.meshes.forEach((t) => {
                      for (const n of t.modelMesh.chunks) n.setMaterialsUniform({ [r]: e });
                    });
                  },
                  n[r].range,
                );
          }
        });
      }
    },
    987: (e, t, n) => {
      n.r(t), n.d(t, { default: () => k, tiledMeshDebugMenu: () => E });
      var a = n(81396),
        r = n(53257),
        l = n(34608),
        i = n(4763),
        s = n(64777),
        o = n(59491);
      function d(e, t = 16) {
        let n;
        const a = (0, o.k1)(
          () => (n = window.setInterval(() => e(), t)),
          () => {
            n && clearInterval(n);
          },
        );
        return a.cancel(), a;
      }
      var u = n(1055),
        g = n(28721),
        c = n(25589),
        h = n(5429),
        m = n(69484),
        p = n(41492),
        M = n(56620);
      const y = new r.Z('tiled-mesh'),
        f = {
          hideMenu: '1' !== (0, u.eY)('dmenu', '0'),
          debug: '1' === (0, u.eY)('debugTiles', '0') || '1' === (0, u.eY)('debug-tiles', '0'),
          statsTiles: !1,
          statsTileset: !0,
          statsTextures: !0,
          statsTextureStream: !0,
        };
      let T = null;
      function b(e, t, n) {
        T ||
          ((T = document.createElement('div')),
          (T.style.color = '#FFFFFF'),
          (T.style.fontFamily = 'Roboto'),
          (T.style.fontWeight = '300'),
          (T.style.fontSize = '12px'),
          (T.style.position = 'absolute'),
          (T.style.top = '85px'),
          (T.style.width = '500px'),
          (T.style.pointerEvents = 'none'),
          (T.style.whiteSpace = 'pre'),
          (T.style.zIndex = '99999'),
          (T.style.textShadow = '0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black'),
          document.body.appendChild(T));
        let a = '\n\n';
        (a += (function (e) {
          const t = e.threeRenderer.info;
          return `three:\n  drawCalls: ${t.render.calls}\n  geometries: ${t.memory.geometries}\n  textures: ${t.memory.textures}\n  triangles: ${t.render.triangles}\n  memory allocated (megs): ${Math.floor(e.estimatedGPUMemoryAllocated() / 2 ** 20)}`;
        })(e)),
          (a += f.statsTextureStream
            ? (function (e) {
                const t = `\ntextureStreaming:\n  downloadingTiles: ${e.downloadingTiles} / ${e.totalTiles}\n  downloadingTextures: ${e.loadingTextures}\n`,
                  n =
                    '  downloaded:\n' +
                    Object.keys(e.totalTextures)
                      .map((t) => `    ${t}: ${e.totalTextures[t]} `)
                      .join('\n') +
                    '\n';
                return t + n;
              })(n)
            : ''),
          t.forEach((e, t) => {
            const n = e.modelMesh;
            (a += `\n\n<mesh: id:${t}>`),
              (a += f.statsTileset
                ? (function (e, t) {
                    var n, a, r;
                    const l = e.tilesRenderer,
                      i = Object.values(null !== (n = l.tileSets) && void 0 !== n ? n : [])[0];
                    return `\n  tileset: preset: ${null === (a = null == i ? void 0 : i.asset.extras) || void 0 === a ? void 0 : a.preset}, depth: ${null === (r = null == i ? void 0 : i.asset.extras) || void 0 === r ? void 0 : r.depth}, version: ${null == i ? void 0 : i.asset.tilesetVersion}\n  view: errorTarget: ${t.settings.errorTarget}, maxLOD: ${t.settings.maxLOD}, detail: '${t.detail}'\n`;
                  })(n.tileLoader, n)
                : ''),
              (a += f.statsTiles
                ? (function (e) {
                    const t = e.tilesRenderer,
                      n = t.visibleTiles,
                      a = {};
                    n.forEach((e) => {
                      var t;
                      const n = `lod${null === (t = e.extras) || void 0 === t ? void 0 : t.level}`,
                        r = a[n] || 0;
                      a[n] = r + 1;
                    });
                    const { stats: r, downloadQueue: l, parseQueue: i, lruCache: s } = t,
                      {
                        active: o,
                        downloading: d,
                        inFrustum: u,
                        parsing: g,
                        used: c,
                        visible: h,
                      } = r;
                    return (
                      `  tiles:\n    tiles in frustum: ${u}\n    visible: ${h}` +
                      Object.keys(a)
                        .sort()
                        .map((e) => `\n     ${e} tiles: ${a[e] || 0}`)
                        .join() +
                      `\n    downloading gltf: ${d}\n    parsing gltf: ${g}\n    active: ${o}\n    used: ${c}\n    queues:\n      download: ${l.currJobs} running, ${l.items.length} waiting\n      parse: ${i.currJobs} running, ${i.items.length} waiting\n    lruCache: ${s.itemSet.size}\n`
                    );
                  })(n.tileLoader)
                : ''),
              (a += `</mesh: id:${t}>`);
          }),
          (T.textContent = a);
      }
      function v(e, t, n, r, l, i) {
        C &&
          (e.forEach((e, n) => {
            x.has(e.modelMesh) ||
              (x.add(e.modelMesh),
              w.push(
                ...(function (e, t, n, r) {
                  return [
                    {
                      panel: e,
                      header: t.tile + ': ' + n,
                      setting: 'maxLOD: ' + n,
                      initialValue: () => r.settings.maxLOD,
                      onChange: (e) => {
                        r.settings.maxLOD = e;
                      },
                      range: [0, 4],
                      rangePrecision: 0,
                    },
                    {
                      panel: e,
                      header: t.tile + ': ' + n,
                      setting: 'nonMeshMaxLOD: ' + n,
                      initialValue: () => r.settings.nonMeshMaxLOD,
                      onChange: (e) => {
                        r.settings.nonMeshMaxLOD = e;
                      },
                      range: [0, 4],
                      rangePrecision: 0,
                    },
                    {
                      panel: e,
                      header: t.tile + ': ' + n,
                      setting: 'minLOD: ' + n,
                      initialValue: () => r.settings.minLOD,
                      onChange: (e) => {
                        r.settings.minLOD = e;
                      },
                      range: [0, 4],
                      rangePrecision: 0,
                    },
                    {
                      panel: e,
                      header: t.tile + ': ' + n,
                      setting: 'errorTarget:' + n,
                      initialValue: () => r.settings.errorTarget,
                      onChange: (e) => {
                        r.settings.errorTarget = e;
                      },
                      range: [0, 20],
                      rangePrecision: 1,
                      urlParam: !0,
                    },
                    {
                      panel: e,
                      header: t.tile + ': ' + n,
                      setting: 'disableTileUpdates:' + n,
                      initialValue: () => r.settings.disableTileUpdates,
                      onChange: (e) => {
                        r.settings.disableTileUpdates = e;
                      },
                    },
                    {
                      panel: e,
                      header: t.tile + ': ' + n,
                      setting: 'disposeModel: ' + n,
                      initialValue: () => r.settings.disposeModel,
                      onChange: (e) => {
                        r.settings.disposeModel = e;
                      },
                    },
                    {
                      panel: e,
                      header: t.tile + ': ' + n,
                      setting: 'pos on z axis: ' + n,
                      initialValue: () => 0,
                      onChange: (e) => {
                        r.position.copy(new a.Vector3(0, 0, e)), r.updateMatrixWorld(!0);
                      },
                      range: [-100, 100],
                      rangePrecision: 0,
                    },
                  ];
                })(t, r, n, e.modelMesh),
              ),
              w.push(
                ...(function (e, t, n, a, r, l) {
                  const i = a.tileLoader,
                    s = P(i, l, (e, t) => e.setWireframe(t)),
                    o = (function (e, t) {
                      const n = { scale: 1 },
                        a = (t, a) => {
                          if (!t) return;
                          const r = e.container.tilesByChunkId.get(t.id),
                            l = (null == r ? void 0 : r.__error) || 1e-4,
                            i = t.lod !== p.t.maxLOD && l > p.t.errorTarget ? 1 : 0.5,
                            s = Math.max(0, Math.min(1, 1 - n.scale / l)),
                            o = a ? O(t.lod, s, i) : null;
                          t.setColorOverlay(o);
                        },
                        r = P(e, t, a),
                        l = d(() => r.colorize(e.container.chunks));
                      return {
                        toggle: (e) => {
                          e ? l.renew() : l.cancel(), r.toggle(e);
                        },
                        colorize: r.colorize,
                        subscription: l,
                        config: n,
                      };
                    })(i, l),
                    u = P(i, l, (e, t) => {
                      e.setColorOverlay(t ? O(e.lod, 1, 0.5) : null);
                    }),
                    g = P(i, l, (e, t) => {
                      e.setColorOverlay(t ? (0, h.G1)(0.5, e.id || 0) : null);
                    }),
                    m = P(i, l, (e, t) => {
                      var n;
                      const a = i.container.tilesByChunkId.get(e.id);
                      e.setColorOverlay(
                        t
                          ? (0, h.G1)(
                              0.5,
                              (0, c.un)(
                                (null === (n = null == a ? void 0 : a.content) || void 0 === n
                                  ? void 0
                                  : n.uri) || 'missing',
                              ) || 0,
                            )
                          : null,
                      );
                    }),
                    M = P(i, l, (e, t) => {
                      e.setColorOverlay(
                        t ? (0, h.G1)(0.5, (e.meshGroup << 16) + e.meshSubgroup || 0) : null,
                      );
                    }),
                    f = P(i, l, (e, t) => {
                      e.setColorOverlay(t ? (0, h.G1)(0.5, e.meshSubgroup || 0) : null);
                    }),
                    T = P(i, l, (e, t) => {
                      e.setColorOverlay(t ? (0, h.G1)(0.5, e.meshGroup || 0) : null);
                    }),
                    b = P(i, l, (e, t) => {
                      e.setColorOverlay(t ? (0, h.G1)(0.5, (0, c.un)(e.textureName) || 0) : null);
                    }),
                    v = P(i, l, (e, t) => {
                      const n = i.container.tilesByChunkId.get(e.id);
                      e.setColorOverlay(
                        t ? (0, h.G1)(0.5, (null == n ? void 0 : n.geometricError) || 0) : null,
                      );
                    }),
                    w = r.slots,
                    x = r.textureQualityMap,
                    C = P(i, l, (e, t) => {
                      const n = w.find((t) => t.textureName === e.textureName);
                      if (n) {
                        const a = n.loading ? 1 : n.quality > x.min(e.lod) ? 0.7 : 0.3,
                          r = x.maxTexelSize / x.get(n.quality).texelSize;
                        e.setColorOverlay(t ? O(e.lod, r, a) : null);
                      }
                    }),
                    S = d(() => C.colorize(i.container.chunks));
                  let E = 'none';
                  const V = {
                    none: void 0,
                    byError: o,
                    byGeometricError: v,
                    byTile: m,
                    bySubgroup: f,
                    byMeshgroup: T,
                    bySubAndMeshgroup: M,
                    byTexture: b,
                    byStreamedTextures: {
                      subscription: S,
                      toggle: (e) => {
                        e ? S.renew() : S.cancel(),
                          e &&
                            y.info(
                              'colorize=byStreamedTextures solid color: loading, dark color: streamed, light color: basis',
                            ),
                          C.toggle(e);
                      },
                    },
                    byChunk: g,
                    byLod: u,
                  };
                  return [
                    {
                      panel: e,
                      header: `${t.viz}: ${n}`,
                      setting: 'disableTileUpdates:' + n,
                      initialValue: () => a.settings.disableTileUpdates,
                      onChange: (e) => {
                        a.settings.disableTileUpdates = e;
                      },
                      urlParam: !0,
                    },
                    {
                      panel: e,
                      header: `${t.viz}: ${n}`,
                      setting: 'wireframe:' + n,
                      initialValue: () => !1,
                      onChange: s.toggle,
                      urlParam: !0,
                    },
                    {
                      panel: e,
                      header: `${t.viz}: ${n}`,
                      setting: 'colorize:' + n,
                      initialValue: () => 'none',
                      onChange: (e) => {
                        var t, n;
                        null === (t = V[E]) || void 0 === t || t.toggle(!1),
                          null === (n = V[e]) || void 0 === n || n.toggle(!0),
                          (E = e);
                      },
                      options: Object.keys(V),
                      urlParam: !0,
                    },
                    {
                      panel: e,
                      header: `${t.viz}: ${n}`,
                      setting: 'colorizeByErrorScale:' + n,
                      initialValue: () => 1,
                      onChange: (e) => {
                        o.config.scale = e;
                      },
                      range: [0, 6],
                      rangePrecision: 3,
                      urlParam: !0,
                    },
                  ];
                })(t, r, n, e.modelMesh, l, i),
              ));
          }),
          w.length && (w.forEach((e) => n.registerMenuEntry(e)), (w.length = 0)));
      }
      const w = [],
        x = new Set();
      let C = !1,
        S = null;
      async function E(e) {
        if (!f.debug) return;
        const t = await e.getModuleBySymbol(l.Ak),
          n = await e.getModuleBySymbol(i.PZ),
          a = await e.getModuleBySymbol(i.Aj),
          r = a.getScene(),
          o = await e.getModuleBySymbol(i.Ve);
        await o.firstMeshLoadPromise, await (0, g.gw)(100);
        const d = o.meshes,
          u = o.meshTextureLoader,
          c = t.tryGetProperty(M.iT, !1),
          h = t.addPanel(s.s.TITLE, s.s.HOTKEYS, { width: 350 }),
          m = { viz: 'visualize', stats: 'stats', tile: 'tileset', log: 'log' };
        function T() {
          S ||
            (S = setInterval(() => {
              b(a, d, u), v(d, h, t, m, u, e);
            }, 150));
        }
        const w = [
            {
              panel: h,
              header: m.stats,
              setting: 'tilesetStatsOverlay',
              initialValue: () => f.statsTileset,
              onChange: (e) => {
                (f.statsTileset = e), e && T();
              },
              urlParam: !0,
            },
            {
              panel: h,
              header: m.stats,
              setting: 'tileStatsOverlay',
              initialValue: () => f.statsTiles,
              onChange: (e) => {
                (f.statsTiles = e), e && T();
              },
              urlParam: !0,
            },
            {
              panel: h,
              header: m.stats,
              setting: 'textureStatsOverlay',
              initialValue: () => f.statsTextures,
              onChange: (e) => {
                (f.statsTextures = e), e && T();
              },
              urlParam: !0,
            },
            {
              panel: h,
              header: m.stats,
              setting: 'textureStreamingOverlay',
              initialValue: () => f.statsTextureStream,
              onChange: (e) => {
                (f.statsTextureStream = e), e && T();
              },
              urlParam: !0,
            },
          ],
          x = [
            {
              panel: h,
              header: m.log,
              buttonName: 'Log: App State',
              callback: () => {
                y.warn(d), y.warn(n), y.warn(r), y.warn(t);
              },
            },
          ];
        c &&
          (f.hideMenu ||
            (await (0, g.gw)(1e3).then(() => {
              t.getSettingsGui()
                .loadGuiPackage()
                .then(() => {
                  t.getSettingsGui().toggle(t.getMainPanelId()),
                    t.getSettingsGui().toggle(t.getMainPanelId());
                });
            })),
          await (0, g.gw)(16),
          C ||
            (await (0, g.gw)(16),
            (C = !0),
            (function (e, t, n, a) {
              return [
                {
                  panel: e,
                  header: t.tile,
                  setting: 'smallMeshThreshold',
                  initialValue: () => p.t.smallMeshThreshold,
                  onChange: (e) => {
                    (p.t.smallMeshThreshold = e),
                      a.forEach((t) => {
                        t.modelMesh.settings.smallMeshThreshold = e;
                      });
                  },
                  range: [0, 100],
                  rangePrecision: 1,
                  urlParam: !0,
                },
                {
                  panel: e,
                  header: t.tile,
                  setting: 'smallMeshErrorMultiplier',
                  initialValue: () => p.t.smallMeshErrorMultiplier,
                  onChange: (e) => {
                    (p.t.smallMeshErrorMultiplier = e),
                      a.forEach((t) => {
                        t.modelMesh.settings.smallMeshErrorMultiplier = e;
                      });
                  },
                  range: [0.01, 2],
                  rangePrecision: 2,
                  urlParam: !0,
                },
                {
                  panel: e,
                  header: t.tile,
                  setting: 'displayActiveTiles',
                  initialValue: () => p.t.displayActiveTiles,
                  onChange: (e) => {
                    (p.t.displayActiveTiles = e),
                      a.forEach((t) => {
                        t.modelMesh.settings.displayActiveTiles = e;
                      });
                  },
                  urlParam: !0,
                },
                {
                  panel: e,
                  header: t.tile,
                  setting: 'loadSiblings',
                  initialValue: () => p.t.loadSiblings,
                  onChange: (e) => {
                    (p.t.loadSiblings = e),
                      a.forEach((t) => {
                        t.modelMesh.settings.loadSiblings = e;
                      });
                  },
                  urlParam: !0,
                },
                {
                  panel: e,
                  header: t.tile,
                  setting: 'autoDisableRendererCulling',
                  initialValue: () => p.t.autoDisableRendererCulling,
                  onChange: (e) => {
                    (p.t.autoDisableRendererCulling = e),
                      a.forEach((t) => {
                        t.modelMesh.settings.autoDisableRendererCulling = e;
                      });
                  },
                  urlParam: !0,
                },
                {
                  panel: e,
                  header: t.tile,
                  setting: 'stopAtEmptyTiles',
                  initialValue: () => p.t.stopAtEmptyTiles,
                  onChange: (e) => {
                    (p.t.stopAtEmptyTiles = e),
                      a.forEach((t) => {
                        t.modelMesh.settings.stopAtEmptyTiles = e;
                      });
                  },
                  urlParam: !0,
                },
                {
                  panel: e,
                  header: t.tile,
                  setting: 'limitMemoryUsage',
                  initialValue: () => p.t.limitMemoryUsage,
                  onChange: (e) => {
                    (p.t.limitMemoryUsage = e),
                      a.forEach((t) => {
                        t.modelMesh.settings.limitMemoryUsage = e;
                      });
                  },
                  urlParam: !0,
                },
                {
                  panel: e,
                  header: t.tile,
                  setting: 'allocatedMegsBeforeLimitingLod',
                  initialValue: () => p.t.allocatedMegsBeforeLimitingLod,
                  onChange: (e) => {
                    (p.t.allocatedMegsBeforeLimitingLod = e),
                      a.forEach((t) => {
                        t.modelMesh.settings.allocatedMegsBeforeLimitingLod = e;
                      });
                  },
                  urlParam: !0,
                  range: [100, 1e3],
                },
                {
                  panel: e,
                  header: t.tile,
                  setting: 'lruMinExtraTiles',
                  initialValue: () => p.t.lruMinExtraTiles,
                  onChange: (e) => {
                    (p.t.lruMinExtraTiles = e),
                      a.forEach((t) => {
                        t.modelMesh.settings.lruMinExtraTiles = e;
                      });
                  },
                  urlParam: !0,
                  range: [0, 2e3],
                },
                {
                  panel: e,
                  header: t.tile,
                  setting: 'lruMaxTiles',
                  initialValue: () => p.t.lruMaxTiles,
                  onChange: (e) => {
                    (p.t.lruMaxTiles = e),
                      a.forEach((t) => {
                        t.modelMesh.settings.lruMaxTiles = e;
                      });
                  },
                  urlParam: !0,
                  range: [0, 2e3],
                },
                {
                  panel: e,
                  header: t.tile,
                  setting: 'lruUnloadPercent',
                  initialValue: () => p.t.lruUnloadPercent,
                  onChange: (e) => {
                    (p.t.lruUnloadPercent = e),
                      a.forEach((t) => {
                        t.modelMesh.settings.lruUnloadPercent = e;
                      });
                  },
                  urlParam: !0,
                  range: [0, 1],
                },
                {
                  panel: e,
                  header: 'Priority',
                  setting: 'errorMultiplierRaycastOcclusion',
                  initialValue: () => p.t.errorMultiplierRaycastOcclusion,
                  onChange: (e) => {
                    (p.t.errorMultiplierRaycastOcclusion = e),
                      a.forEach((t) => {
                        t.modelMesh.settings.errorMultiplierRaycastOcclusion = e;
                      });
                  },
                  range: [0.001, 1],
                  rangePrecision: 2,
                },
                {
                  panel: e,
                  header: 'Priority',
                  setting: 'errorMultiplierHiddenFloors',
                  initialValue: () => p.t.errorMultiplierHiddenFloors,
                  onChange: (e) => {
                    (p.t.errorMultiplierHiddenFloors = e),
                      a.forEach((t) => {
                        t.modelMesh.settings.errorMultiplierHiddenFloors = e;
                      });
                  },
                  range: [0.001, 1],
                  rangePrecision: 2,
                },
              ];
            })(h, m, 0, d).forEach((e) => t.registerMenuEntry(e)),
            w.forEach((e) => t.registerMenuEntry(e)),
            x.forEach((e) => t.registerMenuButton(e))));
      }
      function P(e, t, n) {
        let a = !1;
        const r = (e) => {
            t.after(m.A.End).then(() => {
              e.forEach((e) => {
                e && n(e, a);
              });
            });
          },
          l = e.notifyOnChunksLoaded(r);
        l.cancel();
        return {
          toggle: (t) => {
            t ? l.renew() : l.cancel(), t !== a && ((a = t), r([...e.container.chunks]));
          },
          colorize: r,
          subscription: l,
        };
      }
      const V = {
        0: new a.Vector4(1, 0, 0, 1),
        1: new a.Vector4(0, 1, 0, 1),
        2: new a.Vector4(0, 0, 1, 1),
        3: new a.Vector4(1, 1, 1, 1),
        4: new a.Vector4(1, 0, 1, 1),
        5: new a.Vector4(0, 1, 1, 1),
        6: new a.Vector4(1, 1, 0, 1),
        7: new a.Vector4(0, 0, 0, 1),
      };
      function O(e, t, n) {
        var r, l;
        const i =
          null !== (l = null === (r = V[e]) || void 0 === r ? void 0 : r.clone()) && void 0 !== l
            ? l
            : new a.Vector4();
        return i.multiplyScalar(t), i.setW(n), i;
      }
      const k = E;
    },
    64777: (e, t, n) => {
      n.d(t, { s: () => a });
      const a = { TITLE: 'streamed-mesh (T)', HOTKEYS: [n(20360).R.T] };
    },
    7230: (e, t, n) => {
      var a;
      n.d(t, { S: () => a }),
        (function (e) {
          (e[(e.Standard = 0)] = 'Standard'),
            (e[(e.Depth = 1)] = 'Depth'),
            (e[(e.Transparent = 2)] = 'Transparent'),
            (e[(e.Wireframe = 3)] = 'Wireframe'),
            (e[(e.UV = 4)] = 'UV');
        })(a || (a = {}));
    },
    52763: (e, t, n) => {
      n.d(t, { u: () => i });
      var a,
        r,
        l = n(56063);
      !(function (e) {
        (e.all = 'all'), (e.byMeshGroup = 'byMeshGroup'), (e.byMeshSubGroup = 'byMeshSubGroup');
      })(a || (a = {})),
        (function (e) {
          (e.explicit = 'explicit'), (e.random = 'random');
        })(r || (r = {}));
      class i extends l.m {
        constructor(e, t) {
          super(),
            (this.payload = {
              selectBy: (null == t ? void 0 : t.style) || a.all,
              colorStyle: (null == e ? void 0 : e.style) || r.explicit,
              color: (null == e ? void 0 : e.color) || null,
              alpha: (null == e ? void 0 : e.alpha) || 0.5,
              index: null == t ? void 0 : t.index,
            });
        }
      }
      (i.id = 'SET_MESH_OVERLAY_COLOR'),
        (i.selectBy = a),
        (i.colorBy = r),
        (i.COLOR_DIM = { x: 0, y: 0, z: 0, w: 0.3 });
    },
    65302: (e, t, n) => {
      var a;
      n.d(t, { V: () => a }),
        (function (e) {
          (e[(e.Min = 0)] = 'Min'),
            (e[(e.Standard = 1)] = 'Standard'),
            (e[(e.High = 2)] = 'High'),
            (e[(e.Detail = 3)] = 'Detail');
        })(a || (a = {}));
    },
    41492: (e, t, n) => {
      n.d(t, { t: () => i });
      var a = n(1055),
        r = n(61173),
        l = n(65302);
      const i = {
        urlTemplateToken: '<file>',
        initialMaxLOD: l.V.Min,
        nonMeshMaxLOD: l.V.Standard,
        maxLOD: l.V.High,
        minLOD: l.V.Min,
        loadSiblings: !0,
        displayActiveTiles: !1,
        autoDisableRendererCulling: !0,
        optimizeRaycast: !1,
        stopAtEmptyTiles: !1,
        disableTileUpdates: !1,
        disposeModel: !1,
        limitMemoryUsage: (0, r.tq)(),
        allocatedMegsBeforeLimitingLod: 350,
        lruMinExtraTiles: (0, r.tq)() ? 0 : 100,
        lruMaxTiles: 800,
        lruUnloadPercent: 0.05,
        downloadQueueConcurrency: 8,
        parseQueueConcurrency: 10,
        snappingMaxLOD: l.V.Standard,
        errorTarget: Number((0, a.eY)('errorTarget', (0, r.tq)() ? 6 : 4)),
        errorMultiplierHiddenFloors: 0.01,
        errorMultiplierRaycastOcclusion: 0.1,
        smallMeshThreshold: Number((0, a.eY)('smallMeshThreshold', 40)),
        smallMeshErrorMultiplier: Number((0, a.eY)('smallMeshErrorMultiplier', 0.1)),
      };
    },
    19765: (e, t, n) => {
      n.d(t, { dw: () => d, ef: () => o });
      var a = n(81396);
      const r = n(56620).ZP.sightingMaxAge,
        l = new a.Color();
      let i,
        s = -1;
      const o = (e, t, n) => {
          i ||
            ((i = new a.InstancedMesh(
              new a.SphereGeometry(0.005, 8, 4),
              new a.MeshBasicMaterial(),
              r,
            )),
            (i.frustumCulled = !1),
            u(i));
          const o = new a.Matrix4();
          return ({ point: a, distance: d }) => {
            const u = d / n.fovDistanceScale();
            o.makeScale(u, u, u).setPosition(a),
              i.setMatrixAt(++s % r, o),
              (i.instanceMatrix.needsUpdate = !0);
            for (let t = r; t--; )
              i.setColorAt((s - t + r) % r, l.set(e).multiplyScalar(1 - t / r));
            i.instanceColor && (i.instanceColor.needsUpdate = !0), i.parent || t.scene.add(i);
          };
        },
        d = () => {
          var e;
          i && (null === (e = i.parent) || void 0 === e || e.remove(i), u(i));
        };
      function u(e) {
        const t = new a.Matrix4().makeScale(0, 0, 0);
        for (let n = 0; n < r; n++) e.setMatrixAt(n, t);
      }
      new a.Vector4(1, 0, 0, 1),
        new a.Vector4(0, 1, 0, 1),
        new a.Vector4(0, 0, 1, 1),
        new a.Vector4(1, 1, 0, 1),
        new a.Vector4(1, 0, 1, 1),
        new a.Vector4(1, 1, 1, 1),
        new a.Vector4(0, 1, 1, 1),
        new a.Vector4(0, 0, 0, 1);
    },
    5429: (e, t, n) => {
      n.d(t, { D5: () => d, Ex: () => u, G1: () => s, rn: () => o });
      var a = n(81396),
        r = n(28721);
      const l = () => Math.random(),
        i = {},
        s = (e, t = l()) => (i[t] || (i[t] = new a.Vector4(l(), l(), l(), e)), i[t]),
        o = () => new a.Color(l(), l(), l()),
        d = (e) => e instanceof Object && 'r' in e && 'g' in e && 'b' in e;
      function u(e) {
        return `#${(0, r.Q_)(255 * e.r, 2, '0', 16)}${(0, r.Q_)(255 * e.g, 2, '0', 16)}${(0, r.Q_)(255 * e.b, 2, '0', 16)}`;
      }
    },
  },
]);
