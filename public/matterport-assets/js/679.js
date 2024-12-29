/*! For license information please see 679.js.LICENSE.txt */
'use strict';
(self.webpackChunkmp_webgl = self.webpackChunkmp_webgl || []).push([
  [679],
  {
    4679: (e, t, r) => {
      r.d(t, { xv: () => Ue, Dy: () => X, C5: () => K });
      var n = r(81396);
      function a() {
        var e = Object.create(null);
        function t(n, a) {
          var o = n.id,
            i = n.name,
            s = n.dependencies;
          void 0 === s && (s = []);
          var l = n.init;
          void 0 === l && (l = function () {});
          var u = n.getTransferables;
          if ((void 0 === u && (u = null), !e[o]))
            try {
              (s = s.map(function (r) {
                return (
                  r &&
                    r.isWorkerModule &&
                    (t(r, function (e) {
                      if (e instanceof Error) throw e;
                    }),
                    (r = e[r.id].value)),
                  r
                );
              })),
                (l = r('<' + i + '>.init', l)),
                u && (u = r('<' + i + '>.getTransferables', u));
              var f = null;
              'function' == typeof l
                ? (f = l.apply(void 0, s))
                : console.error('worker module init function failed to rehydrate'),
                (e[o] = { id: o, value: f, getTransferables: u }),
                a(f);
            } catch (e) {
              (e && e.noLog) || console.error(e), a(e);
            }
        }
        function r(e, t) {
          var r = void 0;
          self.troikaDefine = function (e) {
            return (r = e);
          };
          var n = URL.createObjectURL(
            new Blob(['/** ' + e.replace(/\*/g, '') + ' **/\n\ntroikaDefine(\n' + t + '\n)'], {
              type: 'application/javascript',
            }),
          );
          try {
            importScripts(n);
          } catch (e) {
            console.error(e);
          }
          return URL.revokeObjectURL(n), delete self.troikaDefine, r;
        }
        self.addEventListener('message', function (r) {
          var n = r.data,
            a = n.messageId,
            o = n.action,
            i = n.data;
          try {
            'registerModule' === o &&
              t(i, function (e) {
                e instanceof Error
                  ? postMessage({ messageId: a, success: !1, error: e.message })
                  : postMessage({
                      messageId: a,
                      success: !0,
                      result: { isCallable: 'function' == typeof e },
                    });
              }),
              'callModule' === o &&
                (function (t, r) {
                  var n,
                    a = t.id,
                    o = t.args;
                  (e[a] && 'function' == typeof e[a].value) ||
                    r(
                      new Error(
                        'Worker module ' +
                          a +
                          ": not found or its 'init' did not return a function",
                      ),
                    );
                  try {
                    var i = (n = e[a]).value.apply(n, o);
                    i && 'function' == typeof i.then
                      ? i.then(s, function (e) {
                          return r(e instanceof Error ? e : new Error('' + e));
                        })
                      : s(i);
                  } catch (e) {
                    r(e);
                  }
                  function s(t) {
                    try {
                      var n = e[a].getTransferables && e[a].getTransferables(t);
                      (n && Array.isArray(n) && n.length) || (n = void 0), r(t, n);
                    } catch (e) {
                      console.error(e), r(e);
                    }
                  }
                })(i, function (e, t) {
                  e instanceof Error
                    ? postMessage({ messageId: a, success: !1, error: e.message })
                    : postMessage({ messageId: a, success: !0, result: e }, t || void 0);
                });
          } catch (e) {
            postMessage({ messageId: a, success: !1, error: e.stack });
          }
        });
      }
      var o = function () {
          var e = !1;
          if ('undefined' != typeof window && void 0 !== window.document)
            try {
              new Worker(
                URL.createObjectURL(new Blob([''], { type: 'application/javascript' })),
              ).terminate(),
                (e = !0);
            } catch (e) {
              console.log(
                'Troika createWorkerModule: web workers not allowed; falling back to main thread execution. Cause: [' +
                  e.message +
                  ']',
              );
            }
          return (
            (o = function () {
              return e;
            }),
            e
          );
        },
        i = 0,
        s = 0,
        l = !1,
        u = Object.create(null),
        f = Object.create(null),
        c = Object.create(null);
      function h(e) {
        if (!((e && 'function' == typeof e.init) || l))
          throw new Error('requires `options.init` function');
        var t = e.dependencies,
          r = e.init,
          n = e.getTransferables,
          a = e.workerId;
        if (!o())
          return (function (e) {
            var t = function () {
              for (var e = [], r = arguments.length; r--; ) e[r] = arguments[r];
              return t._getInitResult().then(function (t) {
                if ('function' == typeof t) return t.apply(void 0, e);
                throw new Error(
                  'Worker module function was called but `init` did not return a callable function',
                );
              });
            };
            return (
              (t._getInitResult = function () {
                var r = e.dependencies,
                  n = e.init;
                r = Array.isArray(r)
                  ? r.map(function (e) {
                      return e && e._getInitResult ? e._getInitResult() : e;
                    })
                  : [];
                var a = Promise.all(r).then(function (e) {
                  return n.apply(null, e);
                });
                return (
                  (t._getInitResult = function () {
                    return a;
                  }),
                  a
                );
              }),
              t
            );
          })(e);
        null == a && (a = '#default');
        var s = 'workerModule' + ++i,
          u = e.name || s,
          c = null;
        function p() {
          for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
          if (!c) {
            c = v(a, 'registerModule', p.workerModuleData);
            var r = function () {
              (c = null), f[a].delete(r);
            };
            (f[a] || (f[a] = new Set())).add(r);
          }
          return c.then(function (t) {
            if (t.isCallable) return v(a, 'callModule', { id: s, args: e });
            throw new Error(
              'Worker module function was called but `init` did not return a callable function',
            );
          });
        }
        return (
          (t =
            t &&
            t.map(function (e) {
              return (
                'function' != typeof e ||
                  e.workerModuleData ||
                  ((l = !0),
                  (e = h({
                    workerId: a,
                    name: '<' + u + '> function dependency: ' + e.name,
                    init: 'function(){return (\n' + d(e) + '\n)}',
                  })),
                  (l = !1)),
                e && e.workerModuleData && (e = e.workerModuleData),
                e
              );
            })),
          (p.workerModuleData = {
            isWorkerModule: !0,
            id: s,
            name: u,
            dependencies: t,
            init: d(r),
            getTransferables: n && d(n),
          }),
          p
        );
      }
      function d(e) {
        var t = e.toString();
        return !/^function/.test(t) && /^\w+\s*\(/.test(t) && (t = 'function ' + t), t;
      }
      function v(e, t, r) {
        return new Promise(function (n, o) {
          var i = ++s;
          (c[i] = function (e) {
            e.success ? n(e.result) : o(new Error('Error in worker ' + t + ' call: ' + e.error));
          }),
            (function (e) {
              var t = u[e];
              if (!t) {
                var r = d(a);
                (t = u[e] =
                  new Worker(
                    URL.createObjectURL(
                      new Blob(
                        [
                          '/** Worker Module Bootstrap: ' +
                            e.replace(/\*/g, '') +
                            ' **/\n\n;(' +
                            r +
                            ')()',
                        ],
                        { type: 'application/javascript' },
                      ),
                    ),
                  )).onmessage = function (e) {
                  var t = e.data,
                    r = t.messageId,
                    n = c[r];
                  if (!n) throw new Error('WorkerModule response with empty or unknown messageId');
                  delete c[r], n(t);
                };
              }
              return t;
            })(e).postMessage({ messageId: i, action: t, data: r });
        });
      }
      function p() {
        return (function (e) {
          function t(e, t, r, n, a, o, i, s, l, u) {
            var f = 1 - l;
            (u.x = f * f * f * e + 3 * f * f * l * r + 3 * f * l * l * a + l * l * l * i),
              (u.y = f * f * f * t + 3 * f * f * l * n + 3 * f * l * l * o + l * l * l * s);
          }
          function r(e, t) {
            for (var r, n, a, o, i, s = /([MLQCZ])([^MLQCZ]*)/g; (r = s.exec(e)); ) {
              var l = r[2]
                .replace(/^\s*|\s*$/g, '')
                .split(/[,\s]+/)
                .map(function (e) {
                  return parseFloat(e);
                });
              switch (r[1]) {
                case 'M':
                  (o = n = l[0]), (i = a = l[1]);
                  break;
                case 'L':
                  (l[0] === o && l[1] === i) || t('L', o, i, (o = l[0]), (i = l[1]));
                  break;
                case 'Q':
                  t('Q', o, i, (o = l[2]), (i = l[3]), l[0], l[1]);
                  break;
                case 'C':
                  t('C', o, i, (o = l[4]), (i = l[5]), l[0], l[1], l[2], l[3]);
                  break;
                case 'Z':
                  (o === n && i === a) || t('L', o, i, n, a);
              }
            }
          }
          function n(e, n, a) {
            void 0 === a && (a = 16);
            var o = { x: 0, y: 0 };
            r(e, function (e, r, i, s, l, u, f, c, h) {
              switch (e) {
                case 'L':
                  n(r, i, s, l);
                  break;
                case 'Q':
                  for (var d = r, v = i, p = 1; p < a; p++)
                    (b = i),
                      (x = f),
                      (S = l),
                      (w = void 0),
                      (w = 1 - (U = p / (a - 1))),
                      ((k = o).x = w * w * r + 2 * w * U * u + U * U * s),
                      (k.y = w * w * b + 2 * w * U * x + U * U * S),
                      n(d, v, o.x, o.y),
                      (d = o.x),
                      (v = o.y);
                  break;
                case 'C':
                  for (var g = r, m = i, y = 1; y < a; y++)
                    t(r, i, u, f, c, h, s, l, y / (a - 1), o),
                      n(g, m, o.x, o.y),
                      (g = o.x),
                      (m = o.y);
              }
              var b, x, S, U, k, w;
            });
          }
          var a =
              'precision highp float;attribute vec2 aUV;varying vec2 vUV;void main(){vUV=aUV;gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}',
            o = new WeakMap(),
            i = { premultipliedAlpha: !1, preserveDrawingBuffer: !0, antialias: !1, depth: !1 };
          function s(e, t) {
            var r = e.getContext ? e.getContext('webgl', i) : e,
              n = o.get(r);
            if (!n) {
              var a =
                  'undefined' != typeof WebGL2RenderingContext &&
                  r instanceof WebGL2RenderingContext,
                s = {},
                l = {},
                u = {},
                f = -1,
                c = [];
              function h(e) {
                var t = s[e];
                if (!t && !(t = s[e] = r.getExtension(e))) throw new Error(e + ' not supported');
                return t;
              }
              function d(e, t) {
                var n = r.createShader(t);
                return r.shaderSource(n, e), r.compileShader(n), n;
              }
              function v() {
                (s = {}), (l = {}), (u = {}), (f = -1), (c.length = 0);
              }
              r.canvas.addEventListener(
                'webglcontextlost',
                function (e) {
                  v(), e.preventDefault();
                },
                !1,
              ),
                o.set(
                  r,
                  (n = {
                    gl: r,
                    isWebGL2: a,
                    getExtension: h,
                    withProgram: function (e, t, n, o) {
                      if (!l[e]) {
                        var i = {},
                          s = {},
                          u = r.createProgram();
                        r.attachShader(u, d(t, r.VERTEX_SHADER)),
                          r.attachShader(u, d(n, r.FRAGMENT_SHADER)),
                          r.linkProgram(u),
                          (l[e] = {
                            program: u,
                            transaction: function (e) {
                              r.useProgram(u),
                                e({
                                  setUniform: function (e, t) {
                                    for (var n = [], a = arguments.length - 2; a-- > 0; )
                                      n[a] = arguments[a + 2];
                                    var o = s[t] || (s[t] = r.getUniformLocation(u, t));
                                    r['uniform' + e].apply(r, [o].concat(n));
                                  },
                                  setAttribute: function (e, t, n, o, s) {
                                    var l = i[e];
                                    l ||
                                      (l = i[e] =
                                        {
                                          buf: r.createBuffer(),
                                          loc: r.getAttribLocation(u, e),
                                          data: null,
                                        }),
                                      r.bindBuffer(r.ARRAY_BUFFER, l.buf),
                                      r.vertexAttribPointer(l.loc, t, r.FLOAT, !1, 0, 0),
                                      r.enableVertexAttribArray(l.loc),
                                      a
                                        ? r.vertexAttribDivisor(l.loc, o)
                                        : h('ANGLE_instanced_arrays').vertexAttribDivisorANGLE(
                                            l.loc,
                                            o,
                                          ),
                                      s !== l.data &&
                                        (r.bufferData(r.ARRAY_BUFFER, s, n), (l.data = s));
                                  },
                                });
                            },
                          });
                      }
                      l[e].transaction(o);
                    },
                    withTexture: function (e, t) {
                      f++;
                      try {
                        r.activeTexture(r.TEXTURE0 + f);
                        var n = u[e];
                        n ||
                          ((n = u[e] = r.createTexture()),
                          r.bindTexture(r.TEXTURE_2D, n),
                          r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.NEAREST),
                          r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.NEAREST)),
                          r.bindTexture(r.TEXTURE_2D, n),
                          t(n, f);
                      } finally {
                        f--;
                      }
                    },
                    withTextureFramebuffer: function (e, t, n) {
                      var a = r.createFramebuffer();
                      c.push(a),
                        r.bindFramebuffer(r.FRAMEBUFFER, a),
                        r.activeTexture(r.TEXTURE0 + t),
                        r.bindTexture(r.TEXTURE_2D, e),
                        r.framebufferTexture2D(
                          r.FRAMEBUFFER,
                          r.COLOR_ATTACHMENT0,
                          r.TEXTURE_2D,
                          e,
                          0,
                        );
                      try {
                        n(a);
                      } finally {
                        r.deleteFramebuffer(a),
                          r.bindFramebuffer(r.FRAMEBUFFER, c[--c.length - 1] || null);
                      }
                    },
                    handleContextLoss: v,
                  }),
                );
            }
            t(n);
          }
          function l(e, t, r, n, o, i, l, u) {
            void 0 === l && (l = 15),
              void 0 === u && (u = null),
              s(e, function (e) {
                var s = e.gl,
                  f = e.withProgram;
                (0, e.withTexture)('copy', function (e, c) {
                  s.texImage2D(s.TEXTURE_2D, 0, s.RGBA, o, i, 0, s.RGBA, s.UNSIGNED_BYTE, t),
                    f(
                      'copy',
                      a,
                      'precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){gl_FragColor=texture2D(tex,vUV);}',
                      function (e) {
                        var t = e.setUniform;
                        (0, e.setAttribute)(
                          'aUV',
                          2,
                          s.STATIC_DRAW,
                          0,
                          new Float32Array([0, 0, 2, 0, 0, 2]),
                        ),
                          t('1i', 'image', c),
                          s.bindFramebuffer(s.FRAMEBUFFER, u || null),
                          s.disable(s.BLEND),
                          s.colorMask(8 & l, 4 & l, 2 & l, 1 & l),
                          s.viewport(r, n, o, i),
                          s.scissor(r, n, o, i),
                          s.drawArrays(s.TRIANGLES, 0, 3);
                      },
                    );
                });
              });
          }
          var u = Object.freeze({
            __proto__: null,
            withWebGLContext: s,
            renderImageData: l,
            resizeWebGLCanvasWithoutClearing: function (e, t, r) {
              var n = e.width,
                a = e.height;
              s(e, function (o) {
                var i = o.gl,
                  s = new Uint8Array(n * a * 4);
                i.readPixels(0, 0, n, a, i.RGBA, i.UNSIGNED_BYTE, s),
                  (e.width = t),
                  (e.height = r),
                  l(i, s, 0, 0, n, a);
              });
            },
          });
          function f(e, t, r, a, o, i) {
            void 0 === i && (i = 1);
            var s = new Uint8Array(e * t),
              l = a[2] - a[0],
              u = a[3] - a[1],
              f = [];
            n(r, function (e, t, r, n) {
              f.push({
                x1: e,
                y1: t,
                x2: r,
                y2: n,
                minX: Math.min(e, r),
                minY: Math.min(t, n),
                maxX: Math.max(e, r),
                maxY: Math.max(t, n),
              });
            }),
              f.sort(function (e, t) {
                return e.maxX - t.maxX;
              });
            for (var c = 0; c < e; c++)
              for (var h = 0; h < t; h++) {
                var v = g(a[0] + (l * (c + 0.5)) / e, a[1] + (u * (h + 0.5)) / t),
                  p = Math.pow(1 - Math.abs(v) / o, i) / 2;
                v < 0 && (p = 1 - p),
                  (p = Math.max(0, Math.min(255, Math.round(255 * p)))),
                  (s[h * e + c] = p);
              }
            return s;
            function g(e, t) {
              for (var r = 1 / 0, n = 1 / 0, a = f.length; a--; ) {
                var o = f[a];
                if (o.maxX + n <= e) break;
                if (e + n > o.minX && t - n < o.maxY && t + n > o.minY) {
                  var i = d(e, t, o.x1, o.y1, o.x2, o.y2);
                  i < r && ((r = i), (n = Math.sqrt(r)));
                }
              }
              return (
                (function (e, t) {
                  for (var r = 0, n = f.length; n--; ) {
                    var a = f[n];
                    if (a.maxX <= e) break;
                    a.y1 > t != a.y2 > t &&
                      e < ((a.x2 - a.x1) * (t - a.y1)) / (a.y2 - a.y1) + a.x1 &&
                      (r += a.y1 < a.y2 ? 1 : -1);
                  }
                  return 0 !== r;
                })(e, t) && (n = -n),
                n
              );
            }
          }
          function c(e, t, r, n, a, o, i, s, l, u) {
            void 0 === o && (o = 1),
              void 0 === s && (s = 0),
              void 0 === l && (l = 0),
              void 0 === u && (u = 0),
              h(e, t, r, n, a, o, i, null, s, l, u);
          }
          function h(e, t, r, n, a, o, i, s, u, c, h) {
            void 0 === o && (o = 1),
              void 0 === u && (u = 0),
              void 0 === c && (c = 0),
              void 0 === h && (h = 0);
            for (
              var d = f(e, t, r, n, a, o), v = new Uint8Array(4 * d.length), p = 0;
              p < d.length;
              p++
            )
              v[4 * p + h] = d[p];
            l(i, v, u, c, e, t, 1 << (3 - h), s);
          }
          function d(e, t, r, n, a, o) {
            var i = a - r,
              s = o - n,
              l = i * i + s * s,
              u = l ? Math.max(0, Math.min(1, ((e - r) * i + (t - n) * s) / l)) : 0,
              f = e - (r + u * i),
              c = t - (n + u * s);
            return f * f + c * c;
          }
          var v = Object.freeze({
              __proto__: null,
              generate: f,
              generateIntoCanvas: c,
              generateIntoFramebuffer: h,
            }),
            p = new Float32Array([0, 0, 2, 0, 0, 2]),
            g = null,
            m = !1,
            y = {},
            b = new WeakMap();
          function x(e) {
            if (!m && !w(e)) throw new Error('WebGL generation not supported');
          }
          function S(e, t, r, n, a, o, i) {
            if ((void 0 === o && (o = 1), void 0 === i && (i = null), !i && !(i = g))) {
              var l =
                'function' == typeof OffscreenCanvas
                  ? new OffscreenCanvas(1, 1)
                  : 'undefined' != typeof document
                    ? document.createElement('canvas')
                    : null;
              if (!l) throw new Error('OffscreenCanvas or DOM canvas not supported');
              i = g = l.getContext('webgl', { depth: !1 });
            }
            x(i);
            var u = new Uint8Array(e * t * 4);
            s(i, function (i) {
              var s = i.gl,
                l = i.withTexture,
                f = i.withTextureFramebuffer;
              l('readable', function (i, l) {
                s.texImage2D(s.TEXTURE_2D, 0, s.RGBA, e, t, 0, s.RGBA, s.UNSIGNED_BYTE, null),
                  f(i, l, function (i) {
                    k(e, t, r, n, a, o, s, i, 0, 0, 0),
                      s.readPixels(0, 0, e, t, s.RGBA, s.UNSIGNED_BYTE, u);
                  });
              });
            });
            for (var f = new Uint8Array(e * t), c = 0, h = 0; c < u.length; c += 4) f[h++] = u[c];
            return f;
          }
          function U(e, t, r, n, a, o, i, s, l, u) {
            void 0 === o && (o = 1),
              void 0 === s && (s = 0),
              void 0 === l && (l = 0),
              void 0 === u && (u = 0),
              k(e, t, r, n, a, o, i, null, s, l, u);
          }
          function k(e, t, r, o, i, l, u, f, c, h, d) {
            void 0 === l && (l = 1),
              void 0 === c && (c = 0),
              void 0 === h && (h = 0),
              void 0 === d && (d = 0),
              x(u);
            var v = [];
            n(r, function (e, t, r, n) {
              v.push(e, t, r, n);
            }),
              (v = new Float32Array(v)),
              s(u, function (r) {
                var n = r.gl,
                  s = r.isWebGL2,
                  u = r.getExtension,
                  g = r.withProgram,
                  m = r.withTexture,
                  y = r.withTextureFramebuffer,
                  b = r.handleContextLoss;
                if (
                  (m('rawDistances', function (r, m) {
                    (e === r._lastWidth && t === r._lastHeight) ||
                      n.texImage2D(
                        n.TEXTURE_2D,
                        0,
                        n.RGBA,
                        (r._lastWidth = e),
                        (r._lastHeight = t),
                        0,
                        n.RGBA,
                        n.UNSIGNED_BYTE,
                        null,
                      ),
                      g(
                        'main',
                        'precision highp float;uniform vec4 uGlyphBounds;attribute vec2 aUV;attribute vec4 aLineSegment;varying vec4 vLineSegment;varying vec2 vGlyphXY;void main(){vLineSegment=aLineSegment;vGlyphXY=mix(uGlyphBounds.xy,uGlyphBounds.zw,aUV);gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}',
                        'precision highp float;uniform vec4 uGlyphBounds;uniform float uMaxDistance;uniform float uExponent;varying vec4 vLineSegment;varying vec2 vGlyphXY;float absDistToSegment(vec2 point,vec2 lineA,vec2 lineB){vec2 lineDir=lineB-lineA;float lenSq=dot(lineDir,lineDir);float t=lenSq==0.0 ? 0.0 : clamp(dot(point-lineA,lineDir)/lenSq,0.0,1.0);vec2 linePt=lineA+t*lineDir;return distance(point,linePt);}void main(){vec4 seg=vLineSegment;vec2 p=vGlyphXY;float dist=absDistToSegment(p,seg.xy,seg.zw);float val=pow(1.0-clamp(dist/uMaxDistance,0.0,1.0),uExponent)*0.5;bool crossing=(seg.y>p.y!=seg.w>p.y)&&(p.x<(seg.z-seg.x)*(p.y-seg.y)/(seg.w-seg.y)+seg.x);bool crossingUp=crossing&&vLineSegment.y<vLineSegment.w;gl_FragColor=vec4(crossingUp ? 1.0/255.0 : 0.0,crossing&&!crossingUp ? 1.0/255.0 : 0.0,0.0,val);}',
                        function (a) {
                          var f = a.setAttribute,
                            c = a.setUniform,
                            h = !s && u('ANGLE_instanced_arrays'),
                            d = !s && u('EXT_blend_minmax');
                          f('aUV', 2, n.STATIC_DRAW, 0, p),
                            f('aLineSegment', 4, n.DYNAMIC_DRAW, 1, v),
                            c.apply(void 0, ['4f', 'uGlyphBounds'].concat(o)),
                            c('1f', 'uMaxDistance', i),
                            c('1f', 'uExponent', l),
                            y(r, m, function (r) {
                              n.enable(n.BLEND),
                                n.colorMask(!0, !0, !0, !0),
                                n.viewport(0, 0, e, t),
                                n.scissor(0, 0, e, t),
                                n.blendFunc(n.ONE, n.ONE),
                                n.blendEquationSeparate(n.FUNC_ADD, s ? n.MAX : d.MAX_EXT),
                                n.clear(n.COLOR_BUFFER_BIT),
                                s
                                  ? n.drawArraysInstanced(n.TRIANGLES, 0, 3, v.length / 4)
                                  : h.drawArraysInstancedANGLE(n.TRIANGLES, 0, 3, v.length / 4);
                            });
                        },
                      ),
                      g(
                        'post',
                        a,
                        'precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){vec4 color=texture2D(tex,vUV);bool inside=color.r!=color.g;float val=inside ? 1.0-color.a : color.a;gl_FragColor=vec4(val);}',
                        function (r) {
                          r.setAttribute('aUV', 2, n.STATIC_DRAW, 0, p),
                            r.setUniform('1i', 'tex', m),
                            n.bindFramebuffer(n.FRAMEBUFFER, f),
                            n.disable(n.BLEND),
                            n.colorMask(0 === d, 1 === d, 2 === d, 3 === d),
                            n.viewport(c, h, e, t),
                            n.scissor(c, h, e, t),
                            n.drawArrays(n.TRIANGLES, 0, 3);
                        },
                      );
                  }),
                  n.isContextLost())
                )
                  throw (b(), new Error('webgl context lost'));
              });
          }
          function w(e) {
            var t = e && e !== g ? e.canvas || e : y,
              r = b.get(t);
            if (void 0 === r) {
              m = !0;
              var n = null;
              try {
                var a = [97, 106, 97, 61, 99, 137, 118, 80, 80, 118, 137, 99, 61, 97, 106, 97],
                  o = S(4, 4, 'M8,8L16,8L24,24L16,24Z', [0, 0, 32, 32], 24, 1, e);
                (r =
                  o &&
                  a.length === o.length &&
                  o.every(function (e, t) {
                    return e === a[t];
                  })) || ((n = 'bad trial run results'), console.info(a, o));
              } catch (e) {
                (r = !1), (n = e.message);
              }
              n && console.warn('WebGL SDF generation not supported:', n), (m = !1), b.set(t, r);
            }
            return r;
          }
          var _ = Object.freeze({
            __proto__: null,
            generate: S,
            generateIntoCanvas: U,
            generateIntoFramebuffer: k,
            isSupported: w,
          });
          return (
            (e.forEachPathCommand = r),
            (e.generate = function (e, t, r, n, a, o) {
              void 0 === a && (a = Math.max(n[2] - n[0], n[3] - n[1]) / 2), void 0 === o && (o = 1);
              try {
                return S.apply(_, arguments);
              } catch (e) {
                return (
                  console.info('WebGL SDF generation failed, falling back to JS', e),
                  f.apply(v, arguments)
                );
              }
            }),
            (e.generateIntoCanvas = function (e, t, r, n, a, o, i, s, l, u) {
              void 0 === a && (a = Math.max(n[2] - n[0], n[3] - n[1]) / 2),
                void 0 === o && (o = 1),
                void 0 === s && (s = 0),
                void 0 === l && (l = 0),
                void 0 === u && (u = 0);
              try {
                return U.apply(_, arguments);
              } catch (e) {
                return (
                  console.info('WebGL SDF generation failed, falling back to JS', e),
                  c.apply(v, arguments)
                );
              }
            }),
            (e.javascript = v),
            (e.pathToLineSegments = n),
            (e.webgl = _),
            (e.webglUtils = u),
            Object.defineProperty(e, '__esModule', { value: !0 }),
            e
          );
        })({});
      }
      const g = function () {
          return (function (e) {
            var t = {
                R: '13k,1a,2,3,3,2+1j,ch+16,a+1,5+2,2+n,5,a,4,6+16,4+3,h+1b,4mo,179q,2+9,2+11,2i9+7y,2+68,4,3+4,5+13,4+3,2+4k,3+29,8+cf,1t+7z,w+17,3+3m,1t+3z,16o1+5r,8+30,8+mc,29+1r,29+4v,75+73',
                EN: '1c+9,3d+1,6,187+9,513,4+5,7+9,sf+j,175h+9,qw+q,161f+1d,4xt+a,25i+9',
                ES: '17,2,6dp+1,f+1,av,16vr,mx+1,4o,2',
                ET: 'z+2,3h+3,b+1,ym,3e+1,2o,p4+1,8,6u,7c,g6,1wc,1n9+4,30+1b,2n,6d,qhx+1,h0m,a+1,49+2,63+1,4+1,6bb+3,12jj',
                AN: '16o+5,2j+9,2+1,35,ed,1ff2+9,87+u',
                CS: '18,2+1,b,2u,12k,55v,l,17v0,2,3,53,2+1,b',
                B: 'a,3,f+2,2v,690',
                S: '9,2,k',
                WS: 'c,k,4f4,1vk+a,u,1j,335',
                ON: 'x+1,4+4,h+5,r+5,r+3,z,5+3,2+1,2+1,5,2+2,3+4,o,w,ci+1,8+d,3+d,6+8,2+g,39+1,9,6+1,2,33,b8,3+1,3c+1,7+1,5r,b,7h+3,sa+5,2,3i+6,jg+3,ur+9,2v,ij+1,9g+9,7+a,8m,4+1,49+x,14u,2+2,c+2,e+2,e+2,e+1,i+n,e+e,2+p,u+2,e+2,36+1,2+3,2+1,b,2+2,6+5,2,2,2,h+1,5+4,6+3,3+f,16+2,5+3l,3+81,1y+p,2+40,q+a,m+13,2r+ch,2+9e,75+hf,3+v,2+2w,6e+5,f+6,75+2a,1a+p,2+2g,d+5x,r+b,6+3,4+o,g,6+1,6+2,2k+1,4,2j,5h+z,1m+1,1e+f,t+2,1f+e,d+3,4o+3,2s+1,w,535+1r,h3l+1i,93+2,2s,b+1,3l+x,2v,4g+3,21+3,kz+1,g5v+1,5a,j+9,n+v,2,3,2+8,2+1,3+2,2,3,46+1,4+4,h+5,r+5,r+a,3h+2,4+6,b+4,78,1r+24,4+c,4,1hb,ey+6,103+j,16j+c,1ux+7,5+g,fsh,jdq+1t,4,57+2e,p1,1m,1m,1m,1m,4kt+1,7j+17,5+2r,d+e,3+e,2+e,2+10,m+4,w,1n+5,1q,4z+5,4b+rb,9+c,4+c,4+37,d+2g,8+b,l+b,5+1j,9+9,7+13,9+t,3+1,27+3c,2+29,2+3q,d+d,3+4,4+2,6+6,a+o,8+6,a+2,e+6,16+42,2+1i',
                BN: '0+8,6+d,2s+5,2+p,e,4m9,1kt+2,2b+5,5+5,17q9+v,7k,6p+8,6+1,119d+3,440+7,96s+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+75,6p+2rz,1ben+1,1ekf+1,1ekf+1',
                NSM: 'lc+33,7o+6,7c+18,2,2+1,2+1,2,21+a,1d+k,h,2u+6,3+5,3+1,2+3,10,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,g+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+g,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,k1+w,2db+2,3y,2p+v,ff+3,30+1,n9x+3,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,r2,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+5,3+1,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2d+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,f0c+4,1o+6,t5,1s+3,2a,f5l+1,43t+2,i+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,gzhy+6n',
                AL: '16w,3,2,e+1b,z+2,2+2s,g+1,8+1,b+m,2+t,s+2i,c+e,4h+f,1d+1e,1bwe+dp,3+3z,x+c,2+1,35+3y,2rm+z,5+7,b+5,dt+l,c+u,17nl+27,1t+27,4x+6n,3+d',
                LRO: '6ct',
                RLO: '6cu',
                LRE: '6cq',
                RLE: '6cr',
                PDF: '6cs',
                LRI: '6ee',
                RLI: '6ef',
                FSI: '6eg',
                PDI: '6eh',
              },
              r = {},
              n = {};
            (r.L = 1),
              (n[1] = 'L'),
              Object.keys(t).forEach(function (e, t) {
                (r[e] = 1 << (t + 1)), (n[r[e]] = e);
              }),
              Object.freeze(r);
            var a = r.LRI | r.RLI | r.FSI,
              o = r.L | r.R | r.AL,
              i = r.B | r.S | r.WS | r.ON | r.FSI | r.LRI | r.RLI | r.PDI,
              s = r.BN | r.RLE | r.LRE | r.RLO | r.LRO | r.PDF,
              l = r.S | r.WS | r.B | a | r.PDI | s,
              u = null;
            function f(e) {
              return (
                (function () {
                  if (!u) {
                    u = new Map();
                    var e = function (e) {
                      if (t.hasOwnProperty(e)) {
                        var n = 0;
                        t[e].split(',').forEach(function (t) {
                          var a = t.split('+'),
                            o = a[0],
                            i = a[1];
                          (o = parseInt(o, 36)),
                            (i = i ? parseInt(i, 36) : 0),
                            u.set((n += o), r[e]);
                          for (var s = 0; s < i; s++) u.set(++n, r[e]);
                        });
                      }
                    };
                    for (var n in t) e(n);
                  }
                })(),
                u.get(e.codePointAt(0)) || r.L
              );
            }
            var c,
              h,
              d,
              v =
                '14>1,1e>2,u>2,2wt>1,1>1,1ge>1,1wp>1,1j>1,f>1,hm>1,1>1,u>1,u6>1,1>1,+5,28>1,w>1,1>1,+3,b8>1,1>1,+3,1>3,-1>-1,3>1,1>1,+2,1s>1,1>1,x>1,th>1,1>1,+2,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,4q>1,1e>2,u>2,2>1,+1',
              p =
                '6f1>-6dx,6dy>-6dx,6ec>-6ed,6ee>-6ed,6ww>2jj,-2ji>2jj,14r4>-1e7l,1e7m>-1e7l,1e7m>-1e5c,1e5d>-1e5b,1e5c>-14qx,14qy>-14qx,14vn>-1ecg,1ech>-1ecg,1edu>-1ecg,1eci>-1ecg,1eda>-1ecg,1eci>-1ecg,1eci>-168q,168r>-168q,168s>-14ye,14yf>-14ye';
            function g(e, t) {
              var r,
                n = 0,
                a = new Map(),
                o = t && new Map();
              return (
                e.split(',').forEach(function e(i) {
                  if (-1 !== i.indexOf('+')) for (var s = +i; s--; ) e(r);
                  else {
                    r = i;
                    var l = i.split('>'),
                      u = l[0],
                      f = l[1];
                    (u = String.fromCodePoint((n += parseInt(u, 36)))),
                      (f = String.fromCodePoint((n += parseInt(f, 36)))),
                      a.set(u, f),
                      t && o.set(f, u);
                  }
                }),
                { map: a, reverseMap: o }
              );
            }
            function m() {
              if (!c) {
                var e = g(v, !0),
                  t = e.map,
                  r = e.reverseMap;
                (c = t), (h = r), (d = g(p, !1).map);
              }
            }
            function y(e) {
              return m(), c.get(e) || null;
            }
            function b(e) {
              return m(), h.get(e) || null;
            }
            function x(e) {
              return m(), d.get(e) || null;
            }
            var S = r.L,
              U = r.R,
              k = r.EN,
              w = r.ES,
              _ = r.ET,
              T = r.AN,
              F = r.CS,
              C = r.B,
              D = r.S,
              A = r.ON,
              M = r.BN,
              I = r.NSM,
              E = r.AL,
              R = r.LRO,
              G = r.RLO,
              O = r.LRE,
              P = r.RLE,
              B = r.PDF,
              L = r.LRI,
              W = r.RLI,
              z = r.FSI,
              j = r.PDI;
            var V;
            function N(e) {
              return (
                (function () {
                  if (!V) {
                    var e = g(
                        '14>1,j>2,t>2,u>2,1a>g,2v3>1,1>1,1ge>1,1wd>1,b>1,1j>1,f>1,ai>3,-2>3,+1,8>1k0,-1jq>1y7,-1y6>1hf,-1he>1h6,-1h5>1ha,-1h8>1qi,-1pu>1,6>3u,-3s>7,6>1,1>1,f>1,1>1,+2,3>1,1>1,+13,4>1,1>1,6>1eo,-1ee>1,3>1mg,-1me>1mk,-1mj>1mi,-1mg>1mi,-1md>1,1>1,+2,1>10k,-103>1,1>1,4>1,5>1,1>1,+10,3>1,1>8,-7>8,+1,-6>7,+1,a>1,1>1,u>1,u6>1,1>1,+5,26>1,1>1,2>1,2>2,8>1,7>1,4>1,1>1,+5,b8>1,1>1,+3,1>3,-2>1,2>1,1>1,+2,c>1,3>1,1>1,+2,h>1,3>1,a>1,1>1,2>1,3>1,1>1,d>1,f>1,3>1,1a>1,1>1,6>1,7>1,13>1,k>1,1>1,+19,4>1,1>1,+2,2>1,1>1,+18,m>1,a>1,1>1,lk>1,1>1,4>1,2>1,f>1,3>1,1>1,+3,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,6>1,4j>1,j>2,t>2,u>2,2>1,+1',
                        !0,
                      ),
                      t = e.map;
                    e.reverseMap.forEach(function (e, r) {
                      t.set(r, e);
                    }),
                      (V = t);
                  }
                })(),
                V.get(e) || null
              );
            }
            function q(e, t, r, n) {
              var a = e.length;
              (r = Math.max(0, null == r ? 0 : +r)), (n = Math.min(a - 1, null == n ? a - 1 : +n));
              var o = [];
              return (
                t.paragraphs.forEach(function (a) {
                  var i = Math.max(r, a.start),
                    s = Math.min(n, a.end);
                  if (i < s) {
                    for (var u = t.levels.slice(i, s + 1), c = s; c >= i && f(e[c]) & l; c--)
                      u[c] = a.level;
                    for (var h = a.level, d = 1 / 0, v = 0; v < u.length; v++) {
                      var p = u[v];
                      p > h && (h = p), p < d && (d = 1 | p);
                    }
                    for (var g = h; g >= d; g--)
                      for (var m = 0; m < u.length; m++)
                        if (u[m] >= g) {
                          for (var y = m; m + 1 < u.length && u[m + 1] >= g; ) m++;
                          m > y && o.push([y + r, m + r]);
                        }
                  }
                }),
                o
              );
            }
            function X(e, t, r, n) {
              for (var a = q(e, t, r, n), o = [], i = 0; i < e.length; i++) o[i] = i;
              return (
                a.forEach(function (e) {
                  for (var t = e[0], r = e[1], n = o.slice(t, r + 1), a = n.length; a--; )
                    o[r - a] = n[a];
                }),
                o
              );
            }
            return (
              (e.closingToOpeningBracket = b),
              (e.getBidiCharType = f),
              (e.getBidiCharTypeName = function (e) {
                return n[f(e)];
              }),
              (e.getCanonicalBracket = x),
              (e.getEmbeddingLevels = function (e, t) {
                for (var r = new Uint32Array(e.length), n = 0; n < e.length; n++) r[n] = f(e[n]);
                var u = new Map();
                function c(e, t) {
                  var n = r[e];
                  (r[e] = t),
                    u.set(n, u.get(n) - 1),
                    n & i && u.set(i, u.get(i) - 1),
                    u.set(t, (u.get(t) || 0) + 1),
                    t & i && u.set(i, (u.get(i) || 0) + 1);
                }
                for (
                  var h = new Uint8Array(e.length), d = new Map(), v = [], p = null, g = 0;
                  g < e.length;
                  g++
                )
                  p ||
                    v.push(
                      (p = {
                        start: g,
                        end: e.length - 1,
                        level: 'rtl' === t ? 1 : 'ltr' === t ? 0 : zt(g, !1),
                      }),
                    ),
                    r[g] & C && ((p.end = g), (p = null));
                for (
                  var m = P | O | G | R | a | j | B | C,
                    V = function (e) {
                      return e + (1 & e ? 1 : 2);
                    },
                    N = function (e) {
                      return e + (1 & e ? 2 : 1);
                    },
                    q = 0;
                  q < v.length;
                  q++
                ) {
                  var X = [{ _level: (p = v[q]).level, _override: 0, _isolate: 0 }],
                    H = void 0,
                    $ = 0,
                    Y = 0,
                    K = 0;
                  u.clear();
                  for (var Z = p.start; Z <= p.end; Z++) {
                    var Q = r[Z];
                    if (
                      ((H = X[X.length - 1]),
                      u.set(Q, (u.get(Q) || 0) + 1),
                      Q & i && u.set(i, (u.get(i) || 0) + 1),
                      Q & m)
                    )
                      if (Q & (P | O)) {
                        h[Z] = H._level;
                        var J = (Q === P ? N : V)(H._level);
                        J <= 125 && !$ && !Y
                          ? X.push({ _level: J, _override: 0, _isolate: 0 })
                          : $ || Y++;
                      } else if (Q & (G | R)) {
                        h[Z] = H._level;
                        var ee = (Q === G ? N : V)(H._level);
                        ee <= 125 && !$ && !Y
                          ? X.push({ _level: ee, _override: Q & G ? U : S, _isolate: 0 })
                          : $ || Y++;
                      } else if (Q & a) {
                        Q & z && (Q = 1 === zt(Z + 1, !0) ? W : L),
                          (h[Z] = H._level),
                          H._override && c(Z, H._override);
                        var te = (Q === W ? N : V)(H._level);
                        te <= 125 && 0 === $ && 0 === Y
                          ? (K++,
                            X.push({ _level: te, _override: 0, _isolate: 1, _isolInitIndex: Z }))
                          : $++;
                      } else if (Q & j) {
                        if ($ > 0) $--;
                        else if (K > 0) {
                          for (Y = 0; !X[X.length - 1]._isolate; ) X.pop();
                          var re = X[X.length - 1]._isolInitIndex;
                          null != re && (d.set(re, Z), d.set(Z, re)), X.pop(), K--;
                        }
                        (H = X[X.length - 1]), (h[Z] = H._level), H._override && c(Z, H._override);
                      } else
                        Q & B
                          ? (0 === $ &&
                              (Y > 0
                                ? Y--
                                : !H._isolate && X.length > 1 && (X.pop(), (H = X[X.length - 1]))),
                            (h[Z] = H._level))
                          : Q & C && (h[Z] = p.level);
                    else (h[Z] = H._level), H._override && Q !== M && c(Z, H._override);
                  }
                  for (var ne = [], ae = null, oe = p.start; oe <= p.end; oe++) {
                    var ie = r[oe];
                    if (!(ie & s)) {
                      var se = h[oe],
                        le = ie & a,
                        ue = ie === j;
                      ae && se === ae._level
                        ? ((ae._end = oe), (ae._endsWithIsolInit = le))
                        : ne.push(
                            (ae = {
                              _start: oe,
                              _end: oe,
                              _level: se,
                              _startsWithPDI: ue,
                              _endsWithIsolInit: le,
                            }),
                          );
                    }
                  }
                  for (var fe = [], ce = 0; ce < ne.length; ce++) {
                    var he = ne[ce];
                    if (!he._startsWithPDI || (he._startsWithPDI && !d.has(he._start))) {
                      for (
                        var de = [(ae = he)], ve = void 0;
                        ae && ae._endsWithIsolInit && null != (ve = d.get(ae._end));

                      )
                        for (var pe = ce + 1; pe < ne.length; pe++)
                          if (ne[pe]._start === ve) {
                            de.push((ae = ne[pe]));
                            break;
                          }
                      for (var ge = [], me = 0; me < de.length; me++)
                        for (var ye = de[me], be = ye._start; be <= ye._end; be++) ge.push(be);
                      for (var xe = h[ge[0]], Se = p.level, Ue = ge[0] - 1; Ue >= 0; Ue--)
                        if (!(r[Ue] & s)) {
                          Se = h[Ue];
                          break;
                        }
                      var ke = ge[ge.length - 1],
                        we = h[ke],
                        _e = p.level;
                      if (!(r[ke] & a))
                        for (var Te = ke + 1; Te <= p.end; Te++)
                          if (!(r[Te] & s)) {
                            _e = h[Te];
                            break;
                          }
                      fe.push({
                        _seqIndices: ge,
                        _sosType: Math.max(Se, xe) % 2 ? U : S,
                        _eosType: Math.max(_e, we) % 2 ? U : S,
                      });
                    }
                  }
                  for (var Fe = 0; Fe < fe.length; Fe++) {
                    var Ce = fe[Fe],
                      De = Ce._seqIndices,
                      Ae = Ce._sosType,
                      Me = Ce._eosType;
                    if (u.get(I))
                      for (var Ie = 0; Ie < De.length; Ie++) {
                        var Ee = De[Ie];
                        if (r[Ee] & I) {
                          for (var Re = Ae, Ge = Ie - 1; Ge >= 0; Ge--)
                            if (!(r[De[Ge]] & s)) {
                              Re = r[De[Ge]];
                              break;
                            }
                          c(Ee, Re & (a | j) ? A : Re);
                        }
                      }
                    if (u.get(k))
                      for (var Oe = 0; Oe < De.length; Oe++) {
                        var Pe = De[Oe];
                        if (r[Pe] & k)
                          for (var Be = Oe - 1; Be >= -1; Be--) {
                            var Le = -1 === Be ? Ae : r[De[Be]];
                            if (Le & o) {
                              Le === E && c(Pe, T);
                              break;
                            }
                          }
                      }
                    if (u.get(E))
                      for (var We = 0; We < De.length; We++) {
                        var ze = De[We];
                        r[ze] & E && c(ze, U);
                      }
                    if (u.get(w) || u.get(F))
                      for (var je = 1; je < De.length - 1; je++) {
                        var Ve = De[je];
                        if (r[Ve] & (w | F)) {
                          for (
                            var Ne = 0, qe = 0, Xe = je - 1;
                            Xe >= 0 && (Ne = r[De[Xe]]) & s;
                            Xe--
                          );
                          for (var He = je + 1; He < De.length && (qe = r[De[He]]) & s; He++);
                          Ne === qe && (r[Ve] === w ? Ne === k : Ne & (k | T)) && c(Ve, Ne);
                        }
                      }
                    if (u.get(k))
                      for (var $e = 0; $e < De.length; $e++) {
                        var Ye = De[$e];
                        if (r[Ye] & k) {
                          for (var Ke = $e - 1; Ke >= 0 && r[De[Ke]] & (_ | s); Ke--) c(De[Ke], k);
                          for (var Ze = $e + 1; Ze < De.length && r[De[Ze]] & (_ | s); Ze++)
                            c(De[Ze], k);
                        }
                      }
                    if (u.get(_) || u.get(w) || u.get(F))
                      for (var Qe = 0; Qe < De.length; Qe++) {
                        var Je = De[Qe];
                        if (r[Je] & (_ | w | F)) {
                          c(Je, A);
                          for (var et = Qe - 1; et >= 0 && r[De[et]] & s; et--) c(De[et], A);
                          for (var tt = Qe + 1; tt < De.length && r[De[tt]] & s; tt++) c(De[tt], A);
                        }
                      }
                    if (u.get(k))
                      for (var rt = 0, nt = Ae; rt < De.length; rt++) {
                        var at = De[rt],
                          ot = r[at];
                        ot & k ? nt === S && c(at, S) : ot & o && (nt = ot);
                      }
                    if (u.get(i)) {
                      for (
                        var it = U | k | T, st = it | S, lt = [], ut = [], ft = 0;
                        ft < De.length;
                        ft++
                      )
                        if (r[De[ft]] & i) {
                          var ct = e[De[ft]],
                            ht = void 0;
                          if (null !== y(ct)) {
                            if (!(ut.length < 63)) break;
                            ut.push({ char: ct, seqIndex: ft });
                          } else if (null !== (ht = b(ct)))
                            for (var dt = ut.length - 1; dt >= 0; dt--) {
                              var vt = ut[dt].char;
                              if (vt === ht || vt === b(x(ct)) || y(x(vt)) === ct) {
                                lt.push([ut[dt].seqIndex, ft]), (ut.length = dt);
                                break;
                              }
                            }
                        }
                      lt.sort(function (e, t) {
                        return e[0] - t[0];
                      });
                      for (var pt = 0; pt < lt.length; pt++) {
                        for (
                          var gt = lt[pt], mt = gt[0], yt = gt[1], bt = !1, xt = 0, St = mt + 1;
                          St < yt;
                          St++
                        ) {
                          var Ut = De[St];
                          if (r[Ut] & st) {
                            bt = !0;
                            var kt = r[Ut] & it ? U : S;
                            if (kt === Vt(Ut)) {
                              xt = kt;
                              break;
                            }
                          }
                        }
                        if (bt && !xt) {
                          xt = Ae;
                          for (var wt = mt - 1; wt >= 0; wt--) {
                            var _t = De[wt];
                            if (r[_t] & st) {
                              var Tt = r[_t] & it ? U : S;
                              xt = Tt !== Vt(_t) ? Tt : Vt(_t);
                              break;
                            }
                          }
                        }
                        if (xt) {
                          if (((r[De[mt]] = r[De[yt]] = xt), xt !== Vt(De[mt])))
                            for (var Ft = mt + 1; Ft < De.length; Ft++)
                              if (!(r[De[Ft]] & s)) {
                                f(e[De[Ft]]) & I && (r[De[Ft]] = xt);
                                break;
                              }
                          if (xt !== Vt(De[yt]))
                            for (var Ct = yt + 1; Ct < De.length; Ct++)
                              if (!(r[De[Ct]] & s)) {
                                f(e[De[Ct]]) & I && (r[De[Ct]] = xt);
                                break;
                              }
                        }
                      }
                      for (var Dt = 0; Dt < De.length; Dt++)
                        if (r[De[Dt]] & i) {
                          for (var At = Dt, Mt = Dt, It = Ae, Et = Dt - 1; Et >= 0; Et--) {
                            if (!(r[De[Et]] & s)) {
                              It = r[De[Et]] & it ? U : S;
                              break;
                            }
                            At = Et;
                          }
                          for (var Rt = Me, Gt = Dt + 1; Gt < De.length; Gt++) {
                            if (!(r[De[Gt]] & (i | s))) {
                              Rt = r[De[Gt]] & it ? U : S;
                              break;
                            }
                            Mt = Gt;
                          }
                          for (var Ot = At; Ot <= Mt; Ot++) r[De[Ot]] = It === Rt ? It : Vt(De[Ot]);
                          Dt = Mt;
                        }
                    }
                  }
                  for (var Pt = p.start; Pt <= p.end; Pt++) {
                    var Bt = h[Pt],
                      Lt = r[Pt];
                    if (
                      (1 & Bt
                        ? Lt & (S | k | T) && h[Pt]++
                        : Lt & U
                          ? h[Pt]++
                          : Lt & (T | k) && (h[Pt] += 2),
                      Lt & s && (h[Pt] = 0 === Pt ? p.level : h[Pt - 1]),
                      Pt === p.end || f(e[Pt]) & (D | C))
                    )
                      for (var Wt = Pt; Wt >= 0 && f(e[Wt]) & l; Wt--) h[Wt] = p.level;
                  }
                }
                return { levels: h, paragraphs: v };
                function zt(t, n) {
                  for (var o = t; o < e.length; o++) {
                    var i = r[o];
                    if (i & (U | E)) return 1;
                    if (i & (C | S) || (n && i === j)) return 0;
                    if (i & a) {
                      var s = jt(o);
                      o = -1 === s ? e.length : s;
                    }
                  }
                  return 0;
                }
                function jt(t) {
                  for (var n = 1, o = t + 1; o < e.length; o++) {
                    var i = r[o];
                    if (i & C) break;
                    if (i & j) {
                      if (0 == --n) return o;
                    } else i & a && n++;
                  }
                  return -1;
                }
                function Vt(e) {
                  return 1 & h[e] ? U : S;
                }
              }),
              (e.getMirroredCharacter = N),
              (e.getMirroredCharactersMap = function (e, t, r, n) {
                var a = e.length;
                (r = Math.max(0, null == r ? 0 : +r)),
                  (n = Math.min(a - 1, null == n ? a - 1 : +n));
                for (var o = new Map(), i = r; i <= n; i++)
                  if (1 & t[i]) {
                    var s = N(e[i]);
                    null !== s && o.set(i, s);
                  }
                return o;
              }),
              (e.getReorderSegments = q),
              (e.getReorderedIndices = X),
              (e.getReorderedString = function (e, t, r, n) {
                var a = X(e, t, r, n),
                  o = [].concat(e);
                return (
                  a.forEach(function (r, n) {
                    o[n] = (1 & t.levels[r] ? N(e[r]) : null) || e[r];
                  }),
                  o.join('')
                );
              }),
              (e.openingToClosingBracket = y),
              Object.defineProperty(e, '__esModule', { value: !0 }),
              e
            );
          })({});
        },
        m = /\bvoid\s+main\s*\(\s*\)\s*{/g;
      function y(e) {
        return e.replace(/^[ \t]*#include +<([\w\d./]+)>/gm, function (e, t) {
          let r = n.ShaderChunk[t];
          return r ? y(r) : e;
        });
      }
      const b = [];
      for (let e = 0; e < 256; e++) b[e] = (e < 16 ? '0' : '') + e.toString(16);
      const x =
          Object.assign ||
          function () {
            let e = arguments[0];
            for (let t = 1, r = arguments.length; t < r; t++) {
              let r = arguments[t];
              if (r) for (let t in r) Object.prototype.hasOwnProperty.call(r, t) && (e[t] = r[t]);
            }
            return e;
          },
        S = Date.now(),
        U = new WeakMap(),
        k = new Map();
      let w = 1e10;
      function _(e, t) {
        const r = (function (e) {
          const t = JSON.stringify(e, F);
          let r = D.get(t);
          null == r && D.set(t, (r = ++C));
          return r;
        })(t);
        let a = U.get(e);
        if ((a || U.set(e, (a = Object.create(null))), a[r])) return new a[r]();
        const o = `_onBeforeCompile${r}`,
          i = function (n, a) {
            e.onBeforeCompile.call(this, n, a);
            const i = this.customProgramCacheKey() + '|' + n.vertexShader + '|' + n.fragmentShader;
            let s = k[i];
            if (!s) {
              const e = (function (e, { vertexShader: t, fragmentShader: r }, n, a) {
                let {
                  vertexDefs: o,
                  vertexMainIntro: i,
                  vertexMainOutro: s,
                  vertexTransform: l,
                  fragmentDefs: u,
                  fragmentMainIntro: f,
                  fragmentMainOutro: c,
                  fragmentColorTransform: h,
                  customRewriter: d,
                  timeUniform: v,
                } = n;
                (o = o || ''),
                  (i = i || ''),
                  (s = s || ''),
                  (u = u || ''),
                  (f = f || ''),
                  (c = c || ''),
                  (l || d) && (t = y(t));
                (h || d) &&
                  (r = y(
                    (r = r.replace(
                      /^[ \t]*#include <((?:tonemapping|encodings|colorspace|fog|premultiplied_alpha|dithering)_fragment)>/gm,
                      '\n//!BEGIN_POST_CHUNK $1\n$&\n//!END_POST_CHUNK\n',
                    )),
                  ));
                if (d) {
                  let e = d({ vertexShader: t, fragmentShader: r });
                  (t = e.vertexShader), (r = e.fragmentShader);
                }
                if (h) {
                  let e = [];
                  (r = r.replace(
                    /^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,
                    (t) => (e.push(t), ''),
                  )),
                    (c = `${h}\n${e.join('\n')}\n${c}`);
                }
                if (v) {
                  const e = `\nuniform float ${v};\n`;
                  (o = e + o), (u = e + u);
                }
                l &&
                  ((o = `${o}\nvoid troikaVertexTransform${a}(inout vec3 position, inout vec3 normal, inout vec2 uv) {\n  ${l}\n}\n`),
                  (i = `\ntroika_position_${a} = vec3(position);\ntroika_normal_${a} = vec3(normal);\ntroika_uv_${a} = vec2(uv);\ntroikaVertexTransform${a}(troika_position_${a}, troika_normal_${a}, troika_uv_${a});\n${i}\n`),
                  (t =
                    (t = `vec3 troika_position_${a};\nvec3 troika_normal_${a};\nvec2 troika_uv_${a};\n${t}\n`).replace(
                      /\b(position|normal|uv)\b/g,
                      (e, t, r, n) =>
                        /\battribute\s+vec[23]\s+$/.test(n.substr(0, r)) ? t : `troika_${t}_${a}`,
                    )),
                  (e.map && e.map.channel > 0) || (t = t.replace(/\bMAP_UV\b/g, `troika_uv_${a}`)));
                return (
                  (t = T(t, a, o, i, s)),
                  (r = T(r, a, u, f, c)),
                  { vertexShader: t, fragmentShader: r }
                );
              })(this, n, t, r);
              s = k[i] = e;
            }
            (n.vertexShader = s.vertexShader),
              (n.fragmentShader = s.fragmentShader),
              x(n.uniforms, this.uniforms),
              t.timeUniform &&
                (n.uniforms[t.timeUniform] = {
                  get value() {
                    return Date.now() - S;
                  },
                }),
              this[o] && this[o](n);
          },
          s = function () {
            return l(t.chained ? e : e.clone());
          },
          l = function (n) {
            const a = Object.create(n, u);
            return (
              Object.defineProperty(a, 'baseMaterial', { value: e }),
              Object.defineProperty(a, 'id', { value: w++ }),
              (a.uuid = (function () {
                const e = (4294967295 * Math.random()) | 0,
                  t = (4294967295 * Math.random()) | 0,
                  r = (4294967295 * Math.random()) | 0,
                  n = (4294967295 * Math.random()) | 0;
                return (
                  b[255 & e] +
                  b[(e >> 8) & 255] +
                  b[(e >> 16) & 255] +
                  b[(e >> 24) & 255] +
                  '-' +
                  b[255 & t] +
                  b[(t >> 8) & 255] +
                  '-' +
                  b[((t >> 16) & 15) | 64] +
                  b[(t >> 24) & 255] +
                  '-' +
                  b[(63 & r) | 128] +
                  b[(r >> 8) & 255] +
                  '-' +
                  b[(r >> 16) & 255] +
                  b[(r >> 24) & 255] +
                  b[255 & n] +
                  b[(n >> 8) & 255] +
                  b[(n >> 16) & 255] +
                  b[(n >> 24) & 255]
                ).toUpperCase();
              })()),
              (a.uniforms = x({}, n.uniforms, t.uniforms)),
              (a.defines = x({}, n.defines, t.defines)),
              (a.defines[`TROIKA_DERIVED_MATERIAL_${r}`] = ''),
              (a.extensions = x({}, n.extensions, t.extensions)),
              (a._listeners = void 0),
              a
            );
          },
          u = {
            constructor: { value: s },
            isDerivedMaterial: { value: !0 },
            isDerivedFrom: {
              writable: !0,
              configurable: !0,
              value: function (e) {
                const t = this.baseMaterial;
                return e === t || (t.isDerivedMaterial && t.isDerivedFrom(e)) || !1;
              },
            },
            customProgramCacheKey: {
              writable: !0,
              configurable: !0,
              value: function () {
                return e.customProgramCacheKey() + '|' + r;
              },
            },
            onBeforeCompile: {
              get: () => i,
              set(e) {
                this[o] = e;
              },
            },
            copy: {
              writable: !0,
              configurable: !0,
              value: function (t) {
                return (
                  e.copy.call(this, t),
                  e.isShaderMaterial ||
                    e.isDerivedMaterial ||
                    (x(this.extensions, t.extensions),
                    x(this.defines, t.defines),
                    x(this.uniforms, n.UniformsUtils.clone(t.uniforms))),
                  this
                );
              },
            },
            clone: {
              writable: !0,
              configurable: !0,
              value: function () {
                const t = new e.constructor();
                return l(t).copy(this);
              },
            },
            getDepthMaterial: {
              writable: !0,
              configurable: !0,
              value: function () {
                let r = this._depthMaterial;
                return (
                  r ||
                    ((r = this._depthMaterial =
                      _(
                        e.isDerivedMaterial
                          ? e.getDepthMaterial()
                          : new n.MeshDepthMaterial({ depthPacking: n.RGBADepthPacking }),
                        t,
                      )),
                    (r.defines.IS_DEPTH_MATERIAL = ''),
                    (r.uniforms = this.uniforms)),
                  r
                );
              },
            },
            getDistanceMaterial: {
              writable: !0,
              configurable: !0,
              value: function () {
                let r = this._distanceMaterial;
                return (
                  r ||
                    ((r = this._distanceMaterial =
                      _(
                        e.isDerivedMaterial
                          ? e.getDistanceMaterial()
                          : new n.MeshDistanceMaterial(),
                        t,
                      )),
                    (r.defines.IS_DISTANCE_MATERIAL = ''),
                    (r.uniforms = this.uniforms)),
                  r
                );
              },
            },
            dispose: {
              writable: !0,
              configurable: !0,
              value() {
                const { _depthMaterial: t, _distanceMaterial: r } = this;
                t && t.dispose(), r && r.dispose(), e.dispose.call(this);
              },
            },
          };
        return (a[r] = s), new s();
      }
      function T(e, t, r, n, a) {
        return (
          (n || a || r) &&
            ((e = e.replace(m, `\n${r}\nvoid troikaOrigMain${t}() {`)),
            (e += `\nvoid main() {\n  ${n}\n  troikaOrigMain${t}();\n  ${a}\n}`)),
          e
        );
      }
      function F(e, t) {
        return 'uniforms' === e ? void 0 : 'function' == typeof t ? t.toString() : t;
      }
      let C = 0;
      const D = new Map();
      n.DoubleSide;
      const A = h({
        name: 'FontResolver',
        dependencies: [
          function (e, t) {
            const r = Object.create(null),
              n = Object.create(null);
            function a(t, a) {
              let o = r[t];
              o
                ? a(o)
                : n[t]
                  ? n[t].push(a)
                  : ((n[t] = [a]),
                    (function (t, r) {
                      const n = (e) => {
                        console.error(`Failure loading font ${t}`, e);
                      };
                      try {
                        const a = new XMLHttpRequest();
                        a.open('get', t, !0),
                          (a.responseType = 'arraybuffer'),
                          (a.onload = function () {
                            if (a.status >= 400) n(new Error(a.statusText));
                            else if (a.status > 0)
                              try {
                                const n = e(a.response);
                                (n.src = t), r(n);
                              } catch (e) {
                                n(e);
                              }
                          }),
                          (a.onerror = n),
                          a.send();
                      } catch (e) {
                        n(e);
                      }
                    })(t, (e) => {
                      (e.src = t), (r[t] = e), n[t].forEach((t) => t(e)), delete n[t];
                    }));
            }
            return function (
              e,
              n,
              {
                lang: o,
                fonts: i = [],
                style: s = 'normal',
                weight: l = 'normal',
                unicodeFontsURL: u,
              } = {},
            ) {
              const f = new Uint8Array(e.length),
                c = [];
              e.length || p();
              const h = new Map(),
                d = [];
              if (
                ('italic' !== s && (s = 'normal'),
                'number' != typeof l && (l = 'bold' === l ? 700 : 400),
                i && !Array.isArray(i) && (i = [i]),
                (i = i
                  .slice()
                  .filter((e) => !e.lang || e.lang.test(o))
                  .reverse()).length)
              ) {
                const t = 1,
                  n = 2;
                let o = 0;
                !(function s(l = 0) {
                  for (let u = l, v = e.length; u < v; u++) {
                    const l = e.codePointAt(u);
                    if ((o === t && c[f[u - 1]].supportsCodePoint(l)) || /\s/.test(e[u]))
                      (f[u] = f[u - 1]), o === n && (d[d.length - 1][1] = u);
                    else
                      for (let e = f[u], v = i.length; e <= v; e++)
                        if (e === v) {
                          ((o === n ? d[d.length - 1] : (d[d.length] = [u, u]))[1] = u), (o = n);
                        } else {
                          f[u] = e;
                          const { src: n, unicodeRange: d } = i[e];
                          if (!d || g(l, d)) {
                            const e = r[n];
                            if (!e)
                              return void a(n, () => {
                                s(u);
                              });
                            if (e.supportsCodePoint(l)) {
                              let r = h.get(e);
                              'number' != typeof r && ((r = c.length), c.push(e), h.set(e, r)),
                                (f[u] = r),
                                (o = t);
                              break;
                            }
                          }
                        }
                    l > 65535 &&
                      u + 1 < v &&
                      ((f[u + 1] = f[u]), u++, o === n && (d[d.length - 1][1] = u));
                  }
                  v();
                })();
              } else d.push([0, e.length - 1]), v();
              function v() {
                if (d.length) {
                  const r = d.map((t) => e.substring(t[0], t[1] + 1)).join('\n');
                  t.getFontsForString(r, {
                    lang: o || void 0,
                    style: s,
                    weight: l,
                    dataUrl: u,
                  }).then(({ fontUrls: e, chars: t }) => {
                    const r = c.length;
                    let n = 0;
                    d.forEach((e) => {
                      for (let a = 0, o = e[1] - e[0]; a <= o; a++) f[e[0] + a] = t[n++] + r;
                      n++;
                    });
                    let o = 0;
                    e.forEach((t, n) => {
                      a(t, (t) => {
                        (c[n + r] = t), ++o === e.length && p();
                      });
                    });
                  });
                } else p();
              }
              function p() {
                n({ chars: f, fonts: c });
              }
              function g(e, t) {
                for (let r = 0; r < t.length; r++) {
                  const [n, a = n] = t[r];
                  if (n <= e && e <= a) return !0;
                }
                return !1;
              }
            };
          },
          h({
            name: 'Typr Font Parser',
            dependencies: [
              function () {
                return (
                  'undefined' == typeof window && (self.window = self),
                  (function (e) {
                    var t = {
                      parse: function (e) {
                        var r = t._bin,
                          n = new Uint8Array(e);
                        if ('ttcf' == r.readASCII(n, 0, 4)) {
                          var a = 4;
                          r.readUshort(n, a), (a += 2), r.readUshort(n, a), (a += 2);
                          var o = r.readUint(n, a);
                          a += 4;
                          for (var i = [], s = 0; s < o; s++) {
                            var l = r.readUint(n, a);
                            (a += 4), i.push(t._readFont(n, l));
                          }
                          return i;
                        }
                        return [t._readFont(n, 0)];
                      },
                      _readFont: function (e, r) {
                        var n = t._bin,
                          a = r;
                        n.readFixed(e, r), (r += 4);
                        var o = n.readUshort(e, r);
                        (r += 2),
                          n.readUshort(e, r),
                          (r += 2),
                          n.readUshort(e, r),
                          (r += 2),
                          n.readUshort(e, r),
                          (r += 2);
                        for (
                          var i = [
                              'cmap',
                              'head',
                              'hhea',
                              'maxp',
                              'hmtx',
                              'name',
                              'OS/2',
                              'post',
                              'loca',
                              'glyf',
                              'kern',
                              'CFF ',
                              'GDEF',
                              'GPOS',
                              'GSUB',
                              'SVG ',
                            ],
                            s = { _data: e, _offset: a },
                            l = {},
                            u = 0;
                          u < o;
                          u++
                        ) {
                          var f = n.readASCII(e, r, 4);
                          (r += 4), n.readUint(e, r), (r += 4);
                          var c = n.readUint(e, r);
                          r += 4;
                          var h = n.readUint(e, r);
                          (r += 4), (l[f] = { offset: c, length: h });
                        }
                        for (u = 0; u < i.length; u++) {
                          var d = i[u];
                          l[d] && (s[d.trim()] = t[d.trim()].parse(e, l[d].offset, l[d].length, s));
                        }
                        return s;
                      },
                      _tabOffset: function (e, r, n) {
                        for (
                          var a = t._bin, o = a.readUshort(e, n + 4), i = n + 12, s = 0;
                          s < o;
                          s++
                        ) {
                          var l = a.readASCII(e, i, 4);
                          (i += 4), a.readUint(e, i), (i += 4);
                          var u = a.readUint(e, i);
                          if (((i += 4), a.readUint(e, i), (i += 4), l == r)) return u;
                        }
                        return 0;
                      },
                    };
                    (t._bin = {
                      readFixed: function (e, t) {
                        return ((e[t] << 8) | e[t + 1]) + ((e[t + 2] << 8) | e[t + 3]) / 65540;
                      },
                      readF2dot14: function (e, r) {
                        return t._bin.readShort(e, r) / 16384;
                      },
                      readInt: function (e, r) {
                        return t._bin._view(e).getInt32(r);
                      },
                      readInt8: function (e, r) {
                        return t._bin._view(e).getInt8(r);
                      },
                      readShort: function (e, r) {
                        return t._bin._view(e).getInt16(r);
                      },
                      readUshort: function (e, r) {
                        return t._bin._view(e).getUint16(r);
                      },
                      readUshorts: function (e, r, n) {
                        for (var a = [], o = 0; o < n; o++) a.push(t._bin.readUshort(e, r + 2 * o));
                        return a;
                      },
                      readUint: function (e, r) {
                        return t._bin._view(e).getUint32(r);
                      },
                      readUint64: function (e, r) {
                        return 4294967296 * t._bin.readUint(e, r) + t._bin.readUint(e, r + 4);
                      },
                      readASCII: function (e, t, r) {
                        for (var n = '', a = 0; a < r; a++) n += String.fromCharCode(e[t + a]);
                        return n;
                      },
                      readUnicode: function (e, t, r) {
                        for (var n = '', a = 0; a < r; a++) {
                          var o = (e[t++] << 8) | e[t++];
                          n += String.fromCharCode(o);
                        }
                        return n;
                      },
                      _tdec:
                        'undefined' != typeof window && window.TextDecoder
                          ? new window.TextDecoder()
                          : null,
                      readUTF8: function (e, r, n) {
                        var a = t._bin._tdec;
                        return a && 0 == r && n == e.length
                          ? a.decode(e)
                          : t._bin.readASCII(e, r, n);
                      },
                      readBytes: function (e, t, r) {
                        for (var n = [], a = 0; a < r; a++) n.push(e[t + a]);
                        return n;
                      },
                      readASCIIArray: function (e, t, r) {
                        for (var n = [], a = 0; a < r; a++) n.push(String.fromCharCode(e[t + a]));
                        return n;
                      },
                      _view: function (e) {
                        return (
                          e._dataView ||
                          (e._dataView = e.buffer
                            ? new DataView(e.buffer, e.byteOffset, e.byteLength)
                            : new DataView(new Uint8Array(e).buffer))
                        );
                      },
                    }),
                      (t._lctf = {}),
                      (t._lctf.parse = function (e, r, n, a, o) {
                        var i = t._bin,
                          s = {},
                          l = r;
                        i.readFixed(e, r), (r += 4);
                        var u = i.readUshort(e, r);
                        r += 2;
                        var f = i.readUshort(e, r);
                        r += 2;
                        var c = i.readUshort(e, r);
                        return (
                          (r += 2),
                          (s.scriptList = t._lctf.readScriptList(e, l + u)),
                          (s.featureList = t._lctf.readFeatureList(e, l + f)),
                          (s.lookupList = t._lctf.readLookupList(e, l + c, o)),
                          s
                        );
                      }),
                      (t._lctf.readLookupList = function (e, r, n) {
                        var a = t._bin,
                          o = r,
                          i = [],
                          s = a.readUshort(e, r);
                        r += 2;
                        for (var l = 0; l < s; l++) {
                          var u = a.readUshort(e, r);
                          r += 2;
                          var f = t._lctf.readLookupTable(e, o + u, n);
                          i.push(f);
                        }
                        return i;
                      }),
                      (t._lctf.readLookupTable = function (e, r, n) {
                        var a = t._bin,
                          o = r,
                          i = { tabs: [] };
                        (i.ltype = a.readUshort(e, r)),
                          (r += 2),
                          (i.flag = a.readUshort(e, r)),
                          (r += 2);
                        var s = a.readUshort(e, r);
                        r += 2;
                        for (var l = i.ltype, u = 0; u < s; u++) {
                          var f = a.readUshort(e, r);
                          r += 2;
                          var c = n(e, l, o + f, i);
                          i.tabs.push(c);
                        }
                        return i;
                      }),
                      (t._lctf.numOfOnes = function (e) {
                        for (var t = 0, r = 0; r < 32; r++) 0 != ((e >>> r) & 1) && t++;
                        return t;
                      }),
                      (t._lctf.readClassDef = function (e, r) {
                        var n = t._bin,
                          a = [],
                          o = n.readUshort(e, r);
                        if (((r += 2), 1 == o)) {
                          var i = n.readUshort(e, r);
                          r += 2;
                          var s = n.readUshort(e, r);
                          r += 2;
                          for (var l = 0; l < s; l++)
                            a.push(i + l), a.push(i + l), a.push(n.readUshort(e, r)), (r += 2);
                        }
                        if (2 == o) {
                          var u = n.readUshort(e, r);
                          for (r += 2, l = 0; l < u; l++)
                            a.push(n.readUshort(e, r)),
                              (r += 2),
                              a.push(n.readUshort(e, r)),
                              (r += 2),
                              a.push(n.readUshort(e, r)),
                              (r += 2);
                        }
                        return a;
                      }),
                      (t._lctf.getInterval = function (e, t) {
                        for (var r = 0; r < e.length; r += 3) {
                          var n = e[r],
                            a = e[r + 1];
                          if ((e[r + 2], n <= t && t <= a)) return r;
                        }
                        return -1;
                      }),
                      (t._lctf.readCoverage = function (e, r) {
                        var n = t._bin,
                          a = {};
                        (a.fmt = n.readUshort(e, r)), (r += 2);
                        var o = n.readUshort(e, r);
                        return (
                          (r += 2),
                          1 == a.fmt && (a.tab = n.readUshorts(e, r, o)),
                          2 == a.fmt && (a.tab = n.readUshorts(e, r, 3 * o)),
                          a
                        );
                      }),
                      (t._lctf.coverageIndex = function (e, r) {
                        var n = e.tab;
                        if (1 == e.fmt) return n.indexOf(r);
                        if (2 == e.fmt) {
                          var a = t._lctf.getInterval(n, r);
                          if (-1 != a) return n[a + 2] + (r - n[a]);
                        }
                        return -1;
                      }),
                      (t._lctf.readFeatureList = function (e, r) {
                        var n = t._bin,
                          a = r,
                          o = [],
                          i = n.readUshort(e, r);
                        r += 2;
                        for (var s = 0; s < i; s++) {
                          var l = n.readASCII(e, r, 4);
                          r += 4;
                          var u = n.readUshort(e, r);
                          r += 2;
                          var f = t._lctf.readFeatureTable(e, a + u);
                          (f.tag = l.trim()), o.push(f);
                        }
                        return o;
                      }),
                      (t._lctf.readFeatureTable = function (e, r) {
                        var n = t._bin,
                          a = r,
                          o = {},
                          i = n.readUshort(e, r);
                        (r += 2), i > 0 && (o.featureParams = a + i);
                        var s = n.readUshort(e, r);
                        (r += 2), (o.tab = []);
                        for (var l = 0; l < s; l++) o.tab.push(n.readUshort(e, r + 2 * l));
                        return o;
                      }),
                      (t._lctf.readScriptList = function (e, r) {
                        var n = t._bin,
                          a = r,
                          o = {},
                          i = n.readUshort(e, r);
                        r += 2;
                        for (var s = 0; s < i; s++) {
                          var l = n.readASCII(e, r, 4);
                          r += 4;
                          var u = n.readUshort(e, r);
                          (r += 2), (o[l.trim()] = t._lctf.readScriptTable(e, a + u));
                        }
                        return o;
                      }),
                      (t._lctf.readScriptTable = function (e, r) {
                        var n = t._bin,
                          a = r,
                          o = {},
                          i = n.readUshort(e, r);
                        (r += 2), i > 0 && (o.default = t._lctf.readLangSysTable(e, a + i));
                        var s = n.readUshort(e, r);
                        r += 2;
                        for (var l = 0; l < s; l++) {
                          var u = n.readASCII(e, r, 4);
                          r += 4;
                          var f = n.readUshort(e, r);
                          (r += 2), (o[u.trim()] = t._lctf.readLangSysTable(e, a + f));
                        }
                        return o;
                      }),
                      (t._lctf.readLangSysTable = function (e, r) {
                        var n = t._bin,
                          a = {};
                        n.readUshort(e, r), (r += 2), (a.reqFeature = n.readUshort(e, r)), (r += 2);
                        var o = n.readUshort(e, r);
                        return (r += 2), (a.features = n.readUshorts(e, r, o)), a;
                      }),
                      (t.CFF = {}),
                      (t.CFF.parse = function (e, r, n) {
                        var a = t._bin;
                        (e = new Uint8Array(e.buffer, r, n))[(r = 0)], e[++r], e[++r], e[++r], r++;
                        var o = [];
                        r = t.CFF.readIndex(e, r, o);
                        for (var i = [], s = 0; s < o.length - 1; s++)
                          i.push(a.readASCII(e, r + o[s], o[s + 1] - o[s]));
                        r += o[o.length - 1];
                        var l = [];
                        r = t.CFF.readIndex(e, r, l);
                        var u = [];
                        for (s = 0; s < l.length - 1; s++)
                          u.push(t.CFF.readDict(e, r + l[s], r + l[s + 1]));
                        r += l[l.length - 1];
                        var f = u[0],
                          c = [];
                        r = t.CFF.readIndex(e, r, c);
                        var h = [];
                        for (s = 0; s < c.length - 1; s++)
                          h.push(a.readASCII(e, r + c[s], c[s + 1] - c[s]));
                        if (((r += c[c.length - 1]), t.CFF.readSubrs(e, r, f), f.CharStrings)) {
                          (r = f.CharStrings), (c = []), (r = t.CFF.readIndex(e, r, c));
                          var d = [];
                          for (s = 0; s < c.length - 1; s++)
                            d.push(a.readBytes(e, r + c[s], c[s + 1] - c[s]));
                          f.CharStrings = d;
                        }
                        if (f.ROS) {
                          r = f.FDArray;
                          var v = [];
                          for (
                            r = t.CFF.readIndex(e, r, v), f.FDArray = [], s = 0;
                            s < v.length - 1;
                            s++
                          ) {
                            var p = t.CFF.readDict(e, r + v[s], r + v[s + 1]);
                            t.CFF._readFDict(e, p, h), f.FDArray.push(p);
                          }
                          (r += v[v.length - 1]), (r = f.FDSelect), (f.FDSelect = []);
                          var g = e[r];
                          if ((r++, 3 != g)) throw g;
                          var m = a.readUshort(e, r);
                          for (r += 2, s = 0; s < m + 1; s++)
                            f.FDSelect.push(a.readUshort(e, r), e[r + 2]), (r += 3);
                        }
                        return (
                          f.Encoding &&
                            (f.Encoding = t.CFF.readEncoding(e, f.Encoding, f.CharStrings.length)),
                          f.charset &&
                            (f.charset = t.CFF.readCharset(e, f.charset, f.CharStrings.length)),
                          t.CFF._readFDict(e, f, h),
                          f
                        );
                      }),
                      (t.CFF._readFDict = function (e, r, n) {
                        var a;
                        for (var o in (r.Private &&
                          ((a = r.Private[1]),
                          (r.Private = t.CFF.readDict(e, a, a + r.Private[0])),
                          r.Private.Subrs && t.CFF.readSubrs(e, a + r.Private.Subrs, r.Private)),
                        r))
                          -1 !=
                            [
                              'FamilyName',
                              'FontName',
                              'FullName',
                              'Notice',
                              'version',
                              'Copyright',
                            ].indexOf(o) && (r[o] = n[r[o] - 426 + 35]);
                      }),
                      (t.CFF.readSubrs = function (e, r, n) {
                        var a = t._bin,
                          o = [];
                        r = t.CFF.readIndex(e, r, o);
                        var i,
                          s = o.length;
                        (i = s < 1240 ? 107 : s < 33900 ? 1131 : 32768),
                          (n.Bias = i),
                          (n.Subrs = []);
                        for (var l = 0; l < o.length - 1; l++)
                          n.Subrs.push(a.readBytes(e, r + o[l], o[l + 1] - o[l]));
                      }),
                      (t.CFF.tableSE = [
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                        17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
                        36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54,
                        55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73,
                        74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92,
                        93, 94, 95, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96, 97, 98, 99, 100, 101, 102, 103,
                        104, 105, 106, 107, 108, 109, 110, 0, 111, 112, 113, 114, 0, 115, 116, 117,
                        118, 119, 120, 121, 122, 0, 123, 0, 124, 125, 126, 127, 128, 129, 130, 131,
                        0, 132, 133, 0, 134, 135, 136, 137, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 138, 0, 139, 0, 0, 0, 0, 140, 141, 142, 143, 0, 0, 0, 0, 0, 144, 0,
                        0, 0, 145, 0, 0, 146, 147, 148, 149, 0, 0, 0, 0,
                      ]),
                      (t.CFF.glyphByUnicode = function (e, t) {
                        for (var r = 0; r < e.charset.length; r++) if (e.charset[r] == t) return r;
                        return -1;
                      }),
                      (t.CFF.glyphBySE = function (e, r) {
                        return r < 0 || r > 255 ? -1 : t.CFF.glyphByUnicode(e, t.CFF.tableSE[r]);
                      }),
                      (t.CFF.readEncoding = function (e, r, n) {
                        t._bin;
                        var a = ['.notdef'],
                          o = e[r];
                        if ((r++, 0 != o)) throw 'error: unknown encoding format: ' + o;
                        var i = e[r];
                        r++;
                        for (var s = 0; s < i; s++) a.push(e[r + s]);
                        return a;
                      }),
                      (t.CFF.readCharset = function (e, r, n) {
                        var a = t._bin,
                          o = ['.notdef'],
                          i = e[r];
                        if ((r++, 0 == i))
                          for (var s = 0; s < n; s++) {
                            var l = a.readUshort(e, r);
                            (r += 2), o.push(l);
                          }
                        else {
                          if (1 != i && 2 != i) throw 'error: format: ' + i;
                          for (; o.length < n; ) {
                            (l = a.readUshort(e, r)), (r += 2);
                            var u = 0;
                            for (
                              1 == i ? ((u = e[r]), r++) : ((u = a.readUshort(e, r)), (r += 2)),
                                s = 0;
                              s <= u;
                              s++
                            )
                              o.push(l), l++;
                          }
                        }
                        return o;
                      }),
                      (t.CFF.readIndex = function (e, r, n) {
                        var a = t._bin,
                          o = a.readUshort(e, r) + 1,
                          i = e[(r += 2)];
                        if ((r++, 1 == i)) for (var s = 0; s < o; s++) n.push(e[r + s]);
                        else if (2 == i) for (s = 0; s < o; s++) n.push(a.readUshort(e, r + 2 * s));
                        else if (3 == i)
                          for (s = 0; s < o; s++) n.push(16777215 & a.readUint(e, r + 3 * s - 1));
                        else if (1 != o) throw 'unsupported offset size: ' + i + ', count: ' + o;
                        return (r += o * i) - 1;
                      }),
                      (t.CFF.getCharString = function (e, r, n) {
                        var a = t._bin,
                          o = e[r],
                          i = e[r + 1];
                        e[r + 2], e[r + 3], e[r + 4];
                        var s = 1,
                          l = null,
                          u = null;
                        o <= 20 && ((l = o), (s = 1)),
                          12 == o && ((l = 100 * o + i), (s = 2)),
                          21 <= o && o <= 27 && ((l = o), (s = 1)),
                          28 == o && ((u = a.readShort(e, r + 1)), (s = 3)),
                          29 <= o && o <= 31 && ((l = o), (s = 1)),
                          32 <= o && o <= 246 && ((u = o - 139), (s = 1)),
                          247 <= o && o <= 250 && ((u = 256 * (o - 247) + i + 108), (s = 2)),
                          251 <= o && o <= 254 && ((u = 256 * -(o - 251) - i - 108), (s = 2)),
                          255 == o && ((u = a.readInt(e, r + 1) / 65535), (s = 5)),
                          (n.val = null != u ? u : 'o' + l),
                          (n.size = s);
                      }),
                      (t.CFF.readCharString = function (e, r, n) {
                        for (var a = r + n, o = t._bin, i = []; r < a; ) {
                          var s = e[r],
                            l = e[r + 1];
                          e[r + 2], e[r + 3], e[r + 4];
                          var u = 1,
                            f = null,
                            c = null;
                          s <= 20 && ((f = s), (u = 1)),
                            12 == s && ((f = 100 * s + l), (u = 2)),
                            (19 != s && 20 != s) || ((f = s), (u = 2)),
                            21 <= s && s <= 27 && ((f = s), (u = 1)),
                            28 == s && ((c = o.readShort(e, r + 1)), (u = 3)),
                            29 <= s && s <= 31 && ((f = s), (u = 1)),
                            32 <= s && s <= 246 && ((c = s - 139), (u = 1)),
                            247 <= s && s <= 250 && ((c = 256 * (s - 247) + l + 108), (u = 2)),
                            251 <= s && s <= 254 && ((c = 256 * -(s - 251) - l - 108), (u = 2)),
                            255 == s && ((c = o.readInt(e, r + 1) / 65535), (u = 5)),
                            i.push(null != c ? c : 'o' + f),
                            (r += u);
                        }
                        return i;
                      }),
                      (t.CFF.readDict = function (e, r, n) {
                        for (var a = t._bin, o = {}, i = []; r < n; ) {
                          var s = e[r],
                            l = e[r + 1];
                          e[r + 2], e[r + 3], e[r + 4];
                          var u = 1,
                            f = null,
                            c = null;
                          if (
                            (28 == s && ((c = a.readShort(e, r + 1)), (u = 3)),
                            29 == s && ((c = a.readInt(e, r + 1)), (u = 5)),
                            32 <= s && s <= 246 && ((c = s - 139), (u = 1)),
                            247 <= s && s <= 250 && ((c = 256 * (s - 247) + l + 108), (u = 2)),
                            251 <= s && s <= 254 && ((c = 256 * -(s - 251) - l - 108), (u = 2)),
                            255 == s)
                          )
                            throw ((c = a.readInt(e, r + 1) / 65535), (u = 5), 'unknown number');
                          if (30 == s) {
                            var h = [];
                            for (u = 1; ; ) {
                              var d = e[r + u];
                              u++;
                              var v = d >> 4,
                                p = 15 & d;
                              if ((15 != v && h.push(v), 15 != p && h.push(p), 15 == p)) break;
                            }
                            for (
                              var g = '',
                                m = [
                                  0,
                                  1,
                                  2,
                                  3,
                                  4,
                                  5,
                                  6,
                                  7,
                                  8,
                                  9,
                                  '.',
                                  'e',
                                  'e-',
                                  'reserved',
                                  '-',
                                  'endOfNumber',
                                ],
                                y = 0;
                              y < h.length;
                              y++
                            )
                              g += m[h[y]];
                            c = parseFloat(g);
                          }
                          s <= 21 &&
                            ((f = [
                              'version',
                              'Notice',
                              'FullName',
                              'FamilyName',
                              'Weight',
                              'FontBBox',
                              'BlueValues',
                              'OtherBlues',
                              'FamilyBlues',
                              'FamilyOtherBlues',
                              'StdHW',
                              'StdVW',
                              'escape',
                              'UniqueID',
                              'XUID',
                              'charset',
                              'Encoding',
                              'CharStrings',
                              'Private',
                              'Subrs',
                              'defaultWidthX',
                              'nominalWidthX',
                            ][s]),
                            (u = 1),
                            12 == s &&
                              ((f = [
                                'Copyright',
                                'isFixedPitch',
                                'ItalicAngle',
                                'UnderlinePosition',
                                'UnderlineThickness',
                                'PaintType',
                                'CharstringType',
                                'FontMatrix',
                                'StrokeWidth',
                                'BlueScale',
                                'BlueShift',
                                'BlueFuzz',
                                'StemSnapH',
                                'StemSnapV',
                                'ForceBold',
                                0,
                                0,
                                'LanguageGroup',
                                'ExpansionFactor',
                                'initialRandomSeed',
                                'SyntheticBase',
                                'PostScript',
                                'BaseFontName',
                                'BaseFontBlend',
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                'ROS',
                                'CIDFontVersion',
                                'CIDFontRevision',
                                'CIDFontType',
                                'CIDCount',
                                'UIDBase',
                                'FDArray',
                                'FDSelect',
                                'FontName',
                              ][l]),
                              (u = 2))),
                            null != f ? ((o[f] = 1 == i.length ? i[0] : i), (i = [])) : i.push(c),
                            (r += u);
                        }
                        return o;
                      }),
                      (t.cmap = {}),
                      (t.cmap.parse = function (e, r, n) {
                        (e = new Uint8Array(e.buffer, r, n)), (r = 0);
                        var a = t._bin,
                          o = {};
                        a.readUshort(e, r), (r += 2);
                        var i = a.readUshort(e, r);
                        r += 2;
                        var s = [];
                        o.tables = [];
                        for (var l = 0; l < i; l++) {
                          var u = a.readUshort(e, r);
                          r += 2;
                          var f = a.readUshort(e, r);
                          r += 2;
                          var c = a.readUint(e, r);
                          r += 4;
                          var h = 'p' + u + 'e' + f,
                            d = s.indexOf(c);
                          if (-1 == d) {
                            var v;
                            (d = o.tables.length), s.push(c);
                            var p = a.readUshort(e, c);
                            0 == p
                              ? (v = t.cmap.parse0(e, c))
                              : 4 == p
                                ? (v = t.cmap.parse4(e, c))
                                : 6 == p
                                  ? (v = t.cmap.parse6(e, c))
                                  : 12 == p
                                    ? (v = t.cmap.parse12(e, c))
                                    : console.debug('unknown format: ' + p, u, f, c),
                              o.tables.push(v);
                          }
                          if (null != o[h]) throw 'multiple tables for one platform+encoding';
                          o[h] = d;
                        }
                        return o;
                      }),
                      (t.cmap.parse0 = function (e, r) {
                        var n = t._bin,
                          a = {};
                        (a.format = n.readUshort(e, r)), (r += 2);
                        var o = n.readUshort(e, r);
                        (r += 2), n.readUshort(e, r), (r += 2), (a.map = []);
                        for (var i = 0; i < o - 6; i++) a.map.push(e[r + i]);
                        return a;
                      }),
                      (t.cmap.parse4 = function (e, r) {
                        var n = t._bin,
                          a = r,
                          o = {};
                        (o.format = n.readUshort(e, r)), (r += 2);
                        var i = n.readUshort(e, r);
                        (r += 2), n.readUshort(e, r), (r += 2);
                        var s = n.readUshort(e, r);
                        r += 2;
                        var l = s / 2;
                        (o.searchRange = n.readUshort(e, r)),
                          (r += 2),
                          (o.entrySelector = n.readUshort(e, r)),
                          (r += 2),
                          (o.rangeShift = n.readUshort(e, r)),
                          (r += 2),
                          (o.endCount = n.readUshorts(e, r, l)),
                          (r += 2 * l),
                          (r += 2),
                          (o.startCount = n.readUshorts(e, r, l)),
                          (r += 2 * l),
                          (o.idDelta = []);
                        for (var u = 0; u < l; u++) o.idDelta.push(n.readShort(e, r)), (r += 2);
                        for (
                          o.idRangeOffset = n.readUshorts(e, r, l), r += 2 * l, o.glyphIdArray = [];
                          r < a + i;

                        )
                          o.glyphIdArray.push(n.readUshort(e, r)), (r += 2);
                        return o;
                      }),
                      (t.cmap.parse6 = function (e, r) {
                        var n = t._bin,
                          a = {};
                        (a.format = n.readUshort(e, r)),
                          (r += 2),
                          n.readUshort(e, r),
                          (r += 2),
                          n.readUshort(e, r),
                          (r += 2),
                          (a.firstCode = n.readUshort(e, r)),
                          (r += 2);
                        var o = n.readUshort(e, r);
                        (r += 2), (a.glyphIdArray = []);
                        for (var i = 0; i < o; i++)
                          a.glyphIdArray.push(n.readUshort(e, r)), (r += 2);
                        return a;
                      }),
                      (t.cmap.parse12 = function (e, r) {
                        var n = t._bin,
                          a = {};
                        (a.format = n.readUshort(e, r)),
                          (r += 2),
                          (r += 2),
                          n.readUint(e, r),
                          (r += 4),
                          n.readUint(e, r),
                          (r += 4);
                        var o = n.readUint(e, r);
                        (r += 4), (a.groups = []);
                        for (var i = 0; i < o; i++) {
                          var s = r + 12 * i,
                            l = n.readUint(e, s + 0),
                            u = n.readUint(e, s + 4),
                            f = n.readUint(e, s + 8);
                          a.groups.push([l, u, f]);
                        }
                        return a;
                      }),
                      (t.glyf = {}),
                      (t.glyf.parse = function (e, t, r, n) {
                        for (var a = [], o = 0; o < n.maxp.numGlyphs; o++) a.push(null);
                        return a;
                      }),
                      (t.glyf._parseGlyf = function (e, r) {
                        var n = t._bin,
                          a = e._data,
                          o = t._tabOffset(a, 'glyf', e._offset) + e.loca[r];
                        if (e.loca[r] == e.loca[r + 1]) return null;
                        var i = {};
                        if (
                          ((i.noc = n.readShort(a, o)),
                          (o += 2),
                          (i.xMin = n.readShort(a, o)),
                          (o += 2),
                          (i.yMin = n.readShort(a, o)),
                          (o += 2),
                          (i.xMax = n.readShort(a, o)),
                          (o += 2),
                          (i.yMax = n.readShort(a, o)),
                          (o += 2),
                          i.xMin >= i.xMax || i.yMin >= i.yMax)
                        )
                          return null;
                        if (i.noc > 0) {
                          i.endPts = [];
                          for (var s = 0; s < i.noc; s++)
                            i.endPts.push(n.readUshort(a, o)), (o += 2);
                          var l = n.readUshort(a, o);
                          if (((o += 2), a.length - o < l)) return null;
                          (i.instructions = n.readBytes(a, o, l)), (o += l);
                          var u = i.endPts[i.noc - 1] + 1;
                          for (i.flags = [], s = 0; s < u; s++) {
                            var f = a[o];
                            if ((o++, i.flags.push(f), 0 != (8 & f))) {
                              var c = a[o];
                              o++;
                              for (var h = 0; h < c; h++) i.flags.push(f), s++;
                            }
                          }
                          for (i.xs = [], s = 0; s < u; s++) {
                            var d = 0 != (2 & i.flags[s]),
                              v = 0 != (16 & i.flags[s]);
                            d
                              ? (i.xs.push(v ? a[o] : -a[o]), o++)
                              : v
                                ? i.xs.push(0)
                                : (i.xs.push(n.readShort(a, o)), (o += 2));
                          }
                          for (i.ys = [], s = 0; s < u; s++)
                            (d = 0 != (4 & i.flags[s])),
                              (v = 0 != (32 & i.flags[s])),
                              d
                                ? (i.ys.push(v ? a[o] : -a[o]), o++)
                                : v
                                  ? i.ys.push(0)
                                  : (i.ys.push(n.readShort(a, o)), (o += 2));
                          var p = 0,
                            g = 0;
                          for (s = 0; s < u; s++)
                            (p += i.xs[s]), (g += i.ys[s]), (i.xs[s] = p), (i.ys[s] = g);
                        } else {
                          var m;
                          i.parts = [];
                          do {
                            (m = n.readUshort(a, o)), (o += 2);
                            var y = { m: { a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0 }, p1: -1, p2: -1 };
                            if (
                              (i.parts.push(y),
                              (y.glyphIndex = n.readUshort(a, o)),
                              (o += 2),
                              1 & m)
                            ) {
                              var b = n.readShort(a, o);
                              o += 2;
                              var x = n.readShort(a, o);
                              o += 2;
                            } else (b = n.readInt8(a, o)), o++, (x = n.readInt8(a, o)), o++;
                            2 & m ? ((y.m.tx = b), (y.m.ty = x)) : ((y.p1 = b), (y.p2 = x)),
                              8 & m
                                ? ((y.m.a = y.m.d = n.readF2dot14(a, o)), (o += 2))
                                : 64 & m
                                  ? ((y.m.a = n.readF2dot14(a, o)),
                                    (o += 2),
                                    (y.m.d = n.readF2dot14(a, o)),
                                    (o += 2))
                                  : 128 & m &&
                                    ((y.m.a = n.readF2dot14(a, o)),
                                    (o += 2),
                                    (y.m.b = n.readF2dot14(a, o)),
                                    (o += 2),
                                    (y.m.c = n.readF2dot14(a, o)),
                                    (o += 2),
                                    (y.m.d = n.readF2dot14(a, o)),
                                    (o += 2));
                          } while (32 & m);
                          if (256 & m) {
                            var S = n.readUshort(a, o);
                            for (o += 2, i.instr = [], s = 0; s < S; s++) i.instr.push(a[o]), o++;
                          }
                        }
                        return i;
                      }),
                      (t.GDEF = {}),
                      (t.GDEF.parse = function (e, r, n, a) {
                        var o = r;
                        r += 4;
                        var i = t._bin.readUshort(e, r);
                        return { glyphClassDef: 0 === i ? null : t._lctf.readClassDef(e, o + i) };
                      }),
                      (t.GPOS = {}),
                      (t.GPOS.parse = function (e, r, n, a) {
                        return t._lctf.parse(e, r, n, a, t.GPOS.subt);
                      }),
                      (t.GPOS.subt = function (e, r, n, a) {
                        var o = t._bin,
                          i = n,
                          s = {};
                        if (
                          ((s.fmt = o.readUshort(e, n)),
                          (n += 2),
                          1 == r || 2 == r || 3 == r || 7 == r || (8 == r && s.fmt <= 2))
                        ) {
                          var l = o.readUshort(e, n);
                          (n += 2), (s.coverage = t._lctf.readCoverage(e, l + i));
                        }
                        if (1 == r && 1 == s.fmt) {
                          var u = o.readUshort(e, n);
                          (n += 2), 0 != u && (s.pos = t.GPOS.readValueRecord(e, n, u));
                        } else if (2 == r && s.fmt >= 1 && s.fmt <= 2) {
                          (u = o.readUshort(e, n)), (n += 2);
                          var f = o.readUshort(e, n);
                          n += 2;
                          var c = t._lctf.numOfOnes(u),
                            h = t._lctf.numOfOnes(f);
                          if (1 == s.fmt) {
                            s.pairsets = [];
                            var d = o.readUshort(e, n);
                            n += 2;
                            for (var v = 0; v < d; v++) {
                              var p = i + o.readUshort(e, n);
                              n += 2;
                              var g = o.readUshort(e, p);
                              p += 2;
                              for (var m = [], y = 0; y < g; y++) {
                                var b = o.readUshort(e, p);
                                (p += 2),
                                  0 != u && ((_ = t.GPOS.readValueRecord(e, p, u)), (p += 2 * c)),
                                  0 != f && ((T = t.GPOS.readValueRecord(e, p, f)), (p += 2 * h)),
                                  m.push({ gid2: b, val1: _, val2: T });
                              }
                              s.pairsets.push(m);
                            }
                          }
                          if (2 == s.fmt) {
                            var x = o.readUshort(e, n);
                            n += 2;
                            var S = o.readUshort(e, n);
                            n += 2;
                            var U = o.readUshort(e, n);
                            n += 2;
                            var k = o.readUshort(e, n);
                            for (
                              n += 2,
                                s.classDef1 = t._lctf.readClassDef(e, i + x),
                                s.classDef2 = t._lctf.readClassDef(e, i + S),
                                s.matrix = [],
                                v = 0;
                              v < U;
                              v++
                            ) {
                              var w = [];
                              for (y = 0; y < k; y++) {
                                var _ = null,
                                  T = null;
                                0 != u && ((_ = t.GPOS.readValueRecord(e, n, u)), (n += 2 * c)),
                                  0 != f && ((T = t.GPOS.readValueRecord(e, n, f)), (n += 2 * h)),
                                  w.push({ val1: _, val2: T });
                              }
                              s.matrix.push(w);
                            }
                          }
                        } else if (4 == r && 1 == s.fmt)
                          (s.markCoverage = t._lctf.readCoverage(e, o.readUshort(e, n) + i)),
                            (s.baseCoverage = t._lctf.readCoverage(e, o.readUshort(e, n + 2) + i)),
                            (s.markClassCount = o.readUshort(e, n + 4)),
                            (s.markArray = t.GPOS.readMarkArray(e, o.readUshort(e, n + 6) + i)),
                            (s.baseArray = t.GPOS.readBaseArray(
                              e,
                              o.readUshort(e, n + 8) + i,
                              s.markClassCount,
                            ));
                        else if (6 == r && 1 == s.fmt)
                          (s.mark1Coverage = t._lctf.readCoverage(e, o.readUshort(e, n) + i)),
                            (s.mark2Coverage = t._lctf.readCoverage(e, o.readUshort(e, n + 2) + i)),
                            (s.markClassCount = o.readUshort(e, n + 4)),
                            (s.mark1Array = t.GPOS.readMarkArray(e, o.readUshort(e, n + 6) + i)),
                            (s.mark2Array = t.GPOS.readBaseArray(
                              e,
                              o.readUshort(e, n + 8) + i,
                              s.markClassCount,
                            ));
                        else {
                          if (9 == r && 1 == s.fmt) {
                            var F = o.readUshort(e, n);
                            n += 2;
                            var C = o.readUint(e, n);
                            if (((n += 4), 9 == a.ltype)) a.ltype = F;
                            else if (a.ltype != F) throw 'invalid extension substitution';
                            return t.GPOS.subt(e, a.ltype, i + C);
                          }
                          console.debug('unsupported GPOS table LookupType', r, 'format', s.fmt);
                        }
                        return s;
                      }),
                      (t.GPOS.readValueRecord = function (e, r, n) {
                        var a = t._bin,
                          o = [];
                        return (
                          o.push(1 & n ? a.readShort(e, r) : 0),
                          (r += 1 & n ? 2 : 0),
                          o.push(2 & n ? a.readShort(e, r) : 0),
                          (r += 2 & n ? 2 : 0),
                          o.push(4 & n ? a.readShort(e, r) : 0),
                          (r += 4 & n ? 2 : 0),
                          o.push(8 & n ? a.readShort(e, r) : 0),
                          (r += 8 & n ? 2 : 0),
                          o
                        );
                      }),
                      (t.GPOS.readBaseArray = function (e, r, n) {
                        var a = t._bin,
                          o = [],
                          i = r,
                          s = a.readUshort(e, r);
                        r += 2;
                        for (var l = 0; l < s; l++) {
                          for (var u = [], f = 0; f < n; f++)
                            u.push(t.GPOS.readAnchorRecord(e, i + a.readUshort(e, r))), (r += 2);
                          o.push(u);
                        }
                        return o;
                      }),
                      (t.GPOS.readMarkArray = function (e, r) {
                        var n = t._bin,
                          a = [],
                          o = r,
                          i = n.readUshort(e, r);
                        r += 2;
                        for (var s = 0; s < i; s++) {
                          var l = t.GPOS.readAnchorRecord(e, n.readUshort(e, r + 2) + o);
                          (l.markClass = n.readUshort(e, r)), a.push(l), (r += 4);
                        }
                        return a;
                      }),
                      (t.GPOS.readAnchorRecord = function (e, r) {
                        var n = t._bin,
                          a = {};
                        return (
                          (a.fmt = n.readUshort(e, r)),
                          (a.x = n.readShort(e, r + 2)),
                          (a.y = n.readShort(e, r + 4)),
                          a
                        );
                      }),
                      (t.GSUB = {}),
                      (t.GSUB.parse = function (e, r, n, a) {
                        return t._lctf.parse(e, r, n, a, t.GSUB.subt);
                      }),
                      (t.GSUB.subt = function (e, r, n, a) {
                        var o = t._bin,
                          i = n,
                          s = {};
                        if (
                          ((s.fmt = o.readUshort(e, n)),
                          (n += 2),
                          1 != r && 2 != r && 4 != r && 5 != r && 6 != r)
                        )
                          return null;
                        if (
                          1 == r ||
                          2 == r ||
                          4 == r ||
                          (5 == r && s.fmt <= 2) ||
                          (6 == r && s.fmt <= 2)
                        ) {
                          var l = o.readUshort(e, n);
                          (n += 2), (s.coverage = t._lctf.readCoverage(e, i + l));
                        }
                        if (1 == r && s.fmt >= 1 && s.fmt <= 2) {
                          if (1 == s.fmt) (s.delta = o.readShort(e, n)), (n += 2);
                          else if (2 == s.fmt) {
                            var u = o.readUshort(e, n);
                            (n += 2), (s.newg = o.readUshorts(e, n, u)), (n += 2 * s.newg.length);
                          }
                        } else if (2 == r && 1 == s.fmt) {
                          (u = o.readUshort(e, n)), (n += 2), (s.seqs = []);
                          for (var f = 0; f < u; f++) {
                            var c = o.readUshort(e, n) + i;
                            n += 2;
                            var h = o.readUshort(e, c);
                            s.seqs.push(o.readUshorts(e, c + 2, h));
                          }
                        } else if (4 == r)
                          for (s.vals = [], u = o.readUshort(e, n), n += 2, f = 0; f < u; f++) {
                            var d = o.readUshort(e, n);
                            (n += 2), s.vals.push(t.GSUB.readLigatureSet(e, i + d));
                          }
                        else if (5 == r && 2 == s.fmt) {
                          if (2 == s.fmt) {
                            var v = o.readUshort(e, n);
                            (n += 2), (s.cDef = t._lctf.readClassDef(e, i + v)), (s.scset = []);
                            var p = o.readUshort(e, n);
                            for (n += 2, f = 0; f < p; f++) {
                              var g = o.readUshort(e, n);
                              (n += 2),
                                s.scset.push(0 == g ? null : t.GSUB.readSubClassSet(e, i + g));
                            }
                          }
                        } else if (6 == r && 3 == s.fmt) {
                          if (3 == s.fmt) {
                            for (f = 0; f < 3; f++) {
                              (u = o.readUshort(e, n)), (n += 2);
                              for (var m = [], y = 0; y < u; y++)
                                m.push(t._lctf.readCoverage(e, i + o.readUshort(e, n + 2 * y)));
                              (n += 2 * u),
                                0 == f && (s.backCvg = m),
                                1 == f && (s.inptCvg = m),
                                2 == f && (s.ahedCvg = m);
                            }
                            (u = o.readUshort(e, n)),
                              (n += 2),
                              (s.lookupRec = t.GSUB.readSubstLookupRecords(e, n, u));
                          }
                        } else {
                          if (7 == r && 1 == s.fmt) {
                            var b = o.readUshort(e, n);
                            n += 2;
                            var x = o.readUint(e, n);
                            if (((n += 4), 9 == a.ltype)) a.ltype = b;
                            else if (a.ltype != b) throw 'invalid extension substitution';
                            return t.GSUB.subt(e, a.ltype, i + x);
                          }
                          console.debug('unsupported GSUB table LookupType', r, 'format', s.fmt);
                        }
                        return s;
                      }),
                      (t.GSUB.readSubClassSet = function (e, r) {
                        var n = t._bin.readUshort,
                          a = r,
                          o = [],
                          i = n(e, r);
                        r += 2;
                        for (var s = 0; s < i; s++) {
                          var l = n(e, r);
                          (r += 2), o.push(t.GSUB.readSubClassRule(e, a + l));
                        }
                        return o;
                      }),
                      (t.GSUB.readSubClassRule = function (e, r) {
                        var n = t._bin.readUshort,
                          a = {},
                          o = n(e, r),
                          i = n(e, (r += 2));
                        (r += 2), (a.input = []);
                        for (var s = 0; s < o - 1; s++) a.input.push(n(e, r)), (r += 2);
                        return (a.substLookupRecords = t.GSUB.readSubstLookupRecords(e, r, i)), a;
                      }),
                      (t.GSUB.readSubstLookupRecords = function (e, r, n) {
                        for (var a = t._bin.readUshort, o = [], i = 0; i < n; i++)
                          o.push(a(e, r), a(e, r + 2)), (r += 4);
                        return o;
                      }),
                      (t.GSUB.readChainSubClassSet = function (e, r) {
                        var n = t._bin,
                          a = r,
                          o = [],
                          i = n.readUshort(e, r);
                        r += 2;
                        for (var s = 0; s < i; s++) {
                          var l = n.readUshort(e, r);
                          (r += 2), o.push(t.GSUB.readChainSubClassRule(e, a + l));
                        }
                        return o;
                      }),
                      (t.GSUB.readChainSubClassRule = function (e, r) {
                        for (
                          var n = t._bin, a = {}, o = ['backtrack', 'input', 'lookahead'], i = 0;
                          i < o.length;
                          i++
                        ) {
                          var s = n.readUshort(e, r);
                          (r += 2),
                            1 == i && s--,
                            (a[o[i]] = n.readUshorts(e, r, s)),
                            (r += 2 * a[o[i]].length);
                        }
                        return (
                          (s = n.readUshort(e, r)),
                          (r += 2),
                          (a.subst = n.readUshorts(e, r, 2 * s)),
                          (r += 2 * a.subst.length),
                          a
                        );
                      }),
                      (t.GSUB.readLigatureSet = function (e, r) {
                        var n = t._bin,
                          a = r,
                          o = [],
                          i = n.readUshort(e, r);
                        r += 2;
                        for (var s = 0; s < i; s++) {
                          var l = n.readUshort(e, r);
                          (r += 2), o.push(t.GSUB.readLigature(e, a + l));
                        }
                        return o;
                      }),
                      (t.GSUB.readLigature = function (e, r) {
                        var n = t._bin,
                          a = { chain: [] };
                        (a.nglyph = n.readUshort(e, r)), (r += 2);
                        var o = n.readUshort(e, r);
                        r += 2;
                        for (var i = 0; i < o - 1; i++) a.chain.push(n.readUshort(e, r)), (r += 2);
                        return a;
                      }),
                      (t.head = {}),
                      (t.head.parse = function (e, r, n) {
                        var a = t._bin,
                          o = {};
                        return (
                          a.readFixed(e, r),
                          (r += 4),
                          (o.fontRevision = a.readFixed(e, r)),
                          (r += 4),
                          a.readUint(e, r),
                          (r += 4),
                          a.readUint(e, r),
                          (r += 4),
                          (o.flags = a.readUshort(e, r)),
                          (r += 2),
                          (o.unitsPerEm = a.readUshort(e, r)),
                          (r += 2),
                          (o.created = a.readUint64(e, r)),
                          (r += 8),
                          (o.modified = a.readUint64(e, r)),
                          (r += 8),
                          (o.xMin = a.readShort(e, r)),
                          (r += 2),
                          (o.yMin = a.readShort(e, r)),
                          (r += 2),
                          (o.xMax = a.readShort(e, r)),
                          (r += 2),
                          (o.yMax = a.readShort(e, r)),
                          (r += 2),
                          (o.macStyle = a.readUshort(e, r)),
                          (r += 2),
                          (o.lowestRecPPEM = a.readUshort(e, r)),
                          (r += 2),
                          (o.fontDirectionHint = a.readShort(e, r)),
                          (r += 2),
                          (o.indexToLocFormat = a.readShort(e, r)),
                          (r += 2),
                          (o.glyphDataFormat = a.readShort(e, r)),
                          (r += 2),
                          o
                        );
                      }),
                      (t.hhea = {}),
                      (t.hhea.parse = function (e, r, n) {
                        var a = t._bin,
                          o = {};
                        return (
                          a.readFixed(e, r),
                          (r += 4),
                          (o.ascender = a.readShort(e, r)),
                          (r += 2),
                          (o.descender = a.readShort(e, r)),
                          (r += 2),
                          (o.lineGap = a.readShort(e, r)),
                          (r += 2),
                          (o.advanceWidthMax = a.readUshort(e, r)),
                          (r += 2),
                          (o.minLeftSideBearing = a.readShort(e, r)),
                          (r += 2),
                          (o.minRightSideBearing = a.readShort(e, r)),
                          (r += 2),
                          (o.xMaxExtent = a.readShort(e, r)),
                          (r += 2),
                          (o.caretSlopeRise = a.readShort(e, r)),
                          (r += 2),
                          (o.caretSlopeRun = a.readShort(e, r)),
                          (r += 2),
                          (o.caretOffset = a.readShort(e, r)),
                          (r += 2),
                          (r += 8),
                          (o.metricDataFormat = a.readShort(e, r)),
                          (r += 2),
                          (o.numberOfHMetrics = a.readUshort(e, r)),
                          (r += 2),
                          o
                        );
                      }),
                      (t.hmtx = {}),
                      (t.hmtx.parse = function (e, r, n, a) {
                        for (
                          var o = t._bin, i = { aWidth: [], lsBearing: [] }, s = 0, l = 0, u = 0;
                          u < a.maxp.numGlyphs;
                          u++
                        )
                          u < a.hhea.numberOfHMetrics &&
                            ((s = o.readUshort(e, r)), (r += 2), (l = o.readShort(e, r)), (r += 2)),
                            i.aWidth.push(s),
                            i.lsBearing.push(l);
                        return i;
                      }),
                      (t.kern = {}),
                      (t.kern.parse = function (e, r, n, a) {
                        var o = t._bin,
                          i = o.readUshort(e, r);
                        if (((r += 2), 1 == i)) return t.kern.parseV1(e, r - 2, n, a);
                        var s = o.readUshort(e, r);
                        r += 2;
                        for (var l = { glyph1: [], rval: [] }, u = 0; u < s; u++) {
                          (r += 2), (n = o.readUshort(e, r)), (r += 2);
                          var f = o.readUshort(e, r);
                          r += 2;
                          var c = f >>> 8;
                          if (0 != (c &= 15)) throw 'unknown kern table format: ' + c;
                          r = t.kern.readFormat0(e, r, l);
                        }
                        return l;
                      }),
                      (t.kern.parseV1 = function (e, r, n, a) {
                        var o = t._bin;
                        o.readFixed(e, r), (r += 4);
                        var i = o.readUint(e, r);
                        r += 4;
                        for (var s = { glyph1: [], rval: [] }, l = 0; l < i; l++) {
                          o.readUint(e, r), (r += 4);
                          var u = o.readUshort(e, r);
                          (r += 2), o.readUshort(e, r), (r += 2);
                          var f = u >>> 8;
                          if (0 != (f &= 15)) throw 'unknown kern table format: ' + f;
                          r = t.kern.readFormat0(e, r, s);
                        }
                        return s;
                      }),
                      (t.kern.readFormat0 = function (e, r, n) {
                        var a = t._bin,
                          o = -1,
                          i = a.readUshort(e, r);
                        (r += 2),
                          a.readUshort(e, r),
                          (r += 2),
                          a.readUshort(e, r),
                          (r += 2),
                          a.readUshort(e, r),
                          (r += 2);
                        for (var s = 0; s < i; s++) {
                          var l = a.readUshort(e, r);
                          r += 2;
                          var u = a.readUshort(e, r);
                          r += 2;
                          var f = a.readShort(e, r);
                          (r += 2),
                            l != o && (n.glyph1.push(l), n.rval.push({ glyph2: [], vals: [] }));
                          var c = n.rval[n.rval.length - 1];
                          c.glyph2.push(u), c.vals.push(f), (o = l);
                        }
                        return r;
                      }),
                      (t.loca = {}),
                      (t.loca.parse = function (e, r, n, a) {
                        var o = t._bin,
                          i = [],
                          s = a.head.indexToLocFormat,
                          l = a.maxp.numGlyphs + 1;
                        if (0 == s)
                          for (var u = 0; u < l; u++) i.push(o.readUshort(e, r + (u << 1)) << 1);
                        if (1 == s) for (u = 0; u < l; u++) i.push(o.readUint(e, r + (u << 2)));
                        return i;
                      }),
                      (t.maxp = {}),
                      (t.maxp.parse = function (e, r, n) {
                        var a = t._bin,
                          o = {},
                          i = a.readUint(e, r);
                        return (
                          (r += 4),
                          (o.numGlyphs = a.readUshort(e, r)),
                          (r += 2),
                          65536 == i &&
                            ((o.maxPoints = a.readUshort(e, r)),
                            (r += 2),
                            (o.maxContours = a.readUshort(e, r)),
                            (r += 2),
                            (o.maxCompositePoints = a.readUshort(e, r)),
                            (r += 2),
                            (o.maxCompositeContours = a.readUshort(e, r)),
                            (r += 2),
                            (o.maxZones = a.readUshort(e, r)),
                            (r += 2),
                            (o.maxTwilightPoints = a.readUshort(e, r)),
                            (r += 2),
                            (o.maxStorage = a.readUshort(e, r)),
                            (r += 2),
                            (o.maxFunctionDefs = a.readUshort(e, r)),
                            (r += 2),
                            (o.maxInstructionDefs = a.readUshort(e, r)),
                            (r += 2),
                            (o.maxStackElements = a.readUshort(e, r)),
                            (r += 2),
                            (o.maxSizeOfInstructions = a.readUshort(e, r)),
                            (r += 2),
                            (o.maxComponentElements = a.readUshort(e, r)),
                            (r += 2),
                            (o.maxComponentDepth = a.readUshort(e, r)),
                            (r += 2)),
                          o
                        );
                      }),
                      (t.name = {}),
                      (t.name.parse = function (e, r, n) {
                        var a = t._bin,
                          o = {};
                        a.readUshort(e, r), (r += 2);
                        var i = a.readUshort(e, r);
                        (r += 2), a.readUshort(e, r);
                        for (
                          var s,
                            l = [
                              'copyright',
                              'fontFamily',
                              'fontSubfamily',
                              'ID',
                              'fullName',
                              'version',
                              'postScriptName',
                              'trademark',
                              'manufacturer',
                              'designer',
                              'description',
                              'urlVendor',
                              'urlDesigner',
                              'licence',
                              'licenceURL',
                              '---',
                              'typoFamilyName',
                              'typoSubfamilyName',
                              'compatibleFull',
                              'sampleText',
                              'postScriptCID',
                              'wwsFamilyName',
                              'wwsSubfamilyName',
                              'lightPalette',
                              'darkPalette',
                            ],
                            u = (r += 2),
                            f = 0;
                          f < i;
                          f++
                        ) {
                          var c = a.readUshort(e, r);
                          r += 2;
                          var h = a.readUshort(e, r);
                          r += 2;
                          var d = a.readUshort(e, r);
                          r += 2;
                          var v = a.readUshort(e, r);
                          r += 2;
                          var p = a.readUshort(e, r);
                          r += 2;
                          var g = a.readUshort(e, r);
                          r += 2;
                          var m,
                            y = l[v],
                            b = u + 12 * i + g;
                          if (0 == c) m = a.readUnicode(e, b, p / 2);
                          else if (3 == c && 0 == h) m = a.readUnicode(e, b, p / 2);
                          else if (0 == h) m = a.readASCII(e, b, p);
                          else if (1 == h) m = a.readUnicode(e, b, p / 2);
                          else if (3 == h) m = a.readUnicode(e, b, p / 2);
                          else {
                            if (1 != c) throw 'unknown encoding ' + h + ', platformID: ' + c;
                            (m = a.readASCII(e, b, p)),
                              console.debug('reading unknown MAC encoding ' + h + ' as ASCII');
                          }
                          var x = 'p' + c + ',' + d.toString(16);
                          null == o[x] && (o[x] = {}),
                            (o[x][void 0 !== y ? y : v] = m),
                            (o[x]._lang = d);
                        }
                        for (var S in o)
                          if (null != o[S].postScriptName && 1033 == o[S]._lang) return o[S];
                        for (var S in o)
                          if (null != o[S].postScriptName && 0 == o[S]._lang) return o[S];
                        for (var S in o)
                          if (null != o[S].postScriptName && 3084 == o[S]._lang) return o[S];
                        for (var S in o) if (null != o[S].postScriptName) return o[S];
                        for (var S in o) {
                          s = S;
                          break;
                        }
                        return (
                          console.debug('returning name table with languageID ' + o[s]._lang), o[s]
                        );
                      }),
                      (t['OS/2'] = {}),
                      (t['OS/2'].parse = function (e, r, n) {
                        var a = t._bin.readUshort(e, r);
                        r += 2;
                        var o = {};
                        if (0 == a) t['OS/2'].version0(e, r, o);
                        else if (1 == a) t['OS/2'].version1(e, r, o);
                        else if (2 == a || 3 == a || 4 == a) t['OS/2'].version2(e, r, o);
                        else {
                          if (5 != a) throw 'unknown OS/2 table version: ' + a;
                          t['OS/2'].version5(e, r, o);
                        }
                        return o;
                      }),
                      (t['OS/2'].version0 = function (e, r, n) {
                        var a = t._bin;
                        return (
                          (n.xAvgCharWidth = a.readShort(e, r)),
                          (r += 2),
                          (n.usWeightClass = a.readUshort(e, r)),
                          (r += 2),
                          (n.usWidthClass = a.readUshort(e, r)),
                          (r += 2),
                          (n.fsType = a.readUshort(e, r)),
                          (r += 2),
                          (n.ySubscriptXSize = a.readShort(e, r)),
                          (r += 2),
                          (n.ySubscriptYSize = a.readShort(e, r)),
                          (r += 2),
                          (n.ySubscriptXOffset = a.readShort(e, r)),
                          (r += 2),
                          (n.ySubscriptYOffset = a.readShort(e, r)),
                          (r += 2),
                          (n.ySuperscriptXSize = a.readShort(e, r)),
                          (r += 2),
                          (n.ySuperscriptYSize = a.readShort(e, r)),
                          (r += 2),
                          (n.ySuperscriptXOffset = a.readShort(e, r)),
                          (r += 2),
                          (n.ySuperscriptYOffset = a.readShort(e, r)),
                          (r += 2),
                          (n.yStrikeoutSize = a.readShort(e, r)),
                          (r += 2),
                          (n.yStrikeoutPosition = a.readShort(e, r)),
                          (r += 2),
                          (n.sFamilyClass = a.readShort(e, r)),
                          (r += 2),
                          (n.panose = a.readBytes(e, r, 10)),
                          (r += 10),
                          (n.ulUnicodeRange1 = a.readUint(e, r)),
                          (r += 4),
                          (n.ulUnicodeRange2 = a.readUint(e, r)),
                          (r += 4),
                          (n.ulUnicodeRange3 = a.readUint(e, r)),
                          (r += 4),
                          (n.ulUnicodeRange4 = a.readUint(e, r)),
                          (r += 4),
                          (n.achVendID = [
                            a.readInt8(e, r),
                            a.readInt8(e, r + 1),
                            a.readInt8(e, r + 2),
                            a.readInt8(e, r + 3),
                          ]),
                          (r += 4),
                          (n.fsSelection = a.readUshort(e, r)),
                          (r += 2),
                          (n.usFirstCharIndex = a.readUshort(e, r)),
                          (r += 2),
                          (n.usLastCharIndex = a.readUshort(e, r)),
                          (r += 2),
                          (n.sTypoAscender = a.readShort(e, r)),
                          (r += 2),
                          (n.sTypoDescender = a.readShort(e, r)),
                          (r += 2),
                          (n.sTypoLineGap = a.readShort(e, r)),
                          (r += 2),
                          (n.usWinAscent = a.readUshort(e, r)),
                          (r += 2),
                          (n.usWinDescent = a.readUshort(e, r)),
                          r + 2
                        );
                      }),
                      (t['OS/2'].version1 = function (e, r, n) {
                        var a = t._bin;
                        return (
                          (r = t['OS/2'].version0(e, r, n)),
                          (n.ulCodePageRange1 = a.readUint(e, r)),
                          (r += 4),
                          (n.ulCodePageRange2 = a.readUint(e, r)),
                          r + 4
                        );
                      }),
                      (t['OS/2'].version2 = function (e, r, n) {
                        var a = t._bin;
                        return (
                          (r = t['OS/2'].version1(e, r, n)),
                          (n.sxHeight = a.readShort(e, r)),
                          (r += 2),
                          (n.sCapHeight = a.readShort(e, r)),
                          (r += 2),
                          (n.usDefault = a.readUshort(e, r)),
                          (r += 2),
                          (n.usBreak = a.readUshort(e, r)),
                          (r += 2),
                          (n.usMaxContext = a.readUshort(e, r)),
                          r + 2
                        );
                      }),
                      (t['OS/2'].version5 = function (e, r, n) {
                        var a = t._bin;
                        return (
                          (r = t['OS/2'].version2(e, r, n)),
                          (n.usLowerOpticalPointSize = a.readUshort(e, r)),
                          (r += 2),
                          (n.usUpperOpticalPointSize = a.readUshort(e, r)),
                          r + 2
                        );
                      }),
                      (t.post = {}),
                      (t.post.parse = function (e, r, n) {
                        var a = t._bin,
                          o = {};
                        return (
                          (o.version = a.readFixed(e, r)),
                          (r += 4),
                          (o.italicAngle = a.readFixed(e, r)),
                          (r += 4),
                          (o.underlinePosition = a.readShort(e, r)),
                          (r += 2),
                          (o.underlineThickness = a.readShort(e, r)),
                          (r += 2),
                          o
                        );
                      }),
                      null == t && (t = {}),
                      null == t.U && (t.U = {}),
                      (t.U.codeToGlyph = function (e, t) {
                        var r = e.cmap,
                          n = -1;
                        if (
                          (null != r.p0e4
                            ? (n = r.p0e4)
                            : null != r.p3e1
                              ? (n = r.p3e1)
                              : null != r.p1e0
                                ? (n = r.p1e0)
                                : null != r.p0e3 && (n = r.p0e3),
                          -1 == n)
                        )
                          throw 'no familiar platform and encoding!';
                        var a = r.tables[n];
                        if (0 == a.format) return t >= a.map.length ? 0 : a.map[t];
                        if (4 == a.format) {
                          for (var o = -1, i = 0; i < a.endCount.length; i++)
                            if (t <= a.endCount[i]) {
                              o = i;
                              break;
                            }
                          return -1 == o || a.startCount[o] > t
                            ? 0
                            : 65535 &
                                (0 != a.idRangeOffset[o]
                                  ? a.glyphIdArray[
                                      t -
                                        a.startCount[o] +
                                        (a.idRangeOffset[o] >> 1) -
                                        (a.idRangeOffset.length - o)
                                    ]
                                  : t + a.idDelta[o]);
                        }
                        if (12 == a.format) {
                          if (t > a.groups[a.groups.length - 1][1]) return 0;
                          for (i = 0; i < a.groups.length; i++) {
                            var s = a.groups[i];
                            if (s[0] <= t && t <= s[1]) return s[2] + (t - s[0]);
                          }
                          return 0;
                        }
                        throw 'unknown cmap table format ' + a.format;
                      }),
                      (t.U.glyphToPath = function (e, r) {
                        var n = { cmds: [], crds: [] };
                        if (e.SVG && e.SVG.entries[r]) {
                          var a = e.SVG.entries[r];
                          return null == a
                            ? n
                            : ('string' == typeof a &&
                                ((a = t.SVG.toPath(a)), (e.SVG.entries[r] = a)),
                              a);
                        }
                        if (e.CFF) {
                          var o = {
                              x: 0,
                              y: 0,
                              stack: [],
                              nStems: 0,
                              haveWidth: !1,
                              width: e.CFF.Private ? e.CFF.Private.defaultWidthX : 0,
                              open: !1,
                            },
                            i = e.CFF,
                            s = e.CFF.Private;
                          if (i.ROS) {
                            for (var l = 0; i.FDSelect[l + 2] <= r; ) l += 2;
                            s = i.FDArray[i.FDSelect[l + 1]].Private;
                          }
                          t.U._drawCFF(e.CFF.CharStrings[r], o, i, s, n);
                        } else e.glyf && t.U._drawGlyf(r, e, n);
                        return n;
                      }),
                      (t.U._drawGlyf = function (e, r, n) {
                        var a = r.glyf[e];
                        null == a && (a = r.glyf[e] = t.glyf._parseGlyf(r, e)),
                          null != a &&
                            (a.noc > -1 ? t.U._simpleGlyph(a, n) : t.U._compoGlyph(a, r, n));
                      }),
                      (t.U._simpleGlyph = function (e, r) {
                        for (var n = 0; n < e.noc; n++) {
                          for (
                            var a = 0 == n ? 0 : e.endPts[n - 1] + 1, o = e.endPts[n], i = a;
                            i <= o;
                            i++
                          ) {
                            var s = i == a ? o : i - 1,
                              l = i == o ? a : i + 1,
                              u = 1 & e.flags[i],
                              f = 1 & e.flags[s],
                              c = 1 & e.flags[l],
                              h = e.xs[i],
                              d = e.ys[i];
                            if (i == a)
                              if (u) {
                                if (!f) {
                                  t.U.P.moveTo(r, h, d);
                                  continue;
                                }
                                t.U.P.moveTo(r, e.xs[s], e.ys[s]);
                              } else
                                f
                                  ? t.U.P.moveTo(r, e.xs[s], e.ys[s])
                                  : t.U.P.moveTo(r, (e.xs[s] + h) / 2, (e.ys[s] + d) / 2);
                            u
                              ? f && t.U.P.lineTo(r, h, d)
                              : c
                                ? t.U.P.qcurveTo(r, h, d, e.xs[l], e.ys[l])
                                : t.U.P.qcurveTo(r, h, d, (h + e.xs[l]) / 2, (d + e.ys[l]) / 2);
                          }
                          t.U.P.closePath(r);
                        }
                      }),
                      (t.U._compoGlyph = function (e, r, n) {
                        for (var a = 0; a < e.parts.length; a++) {
                          var o = { cmds: [], crds: [] },
                            i = e.parts[a];
                          t.U._drawGlyf(i.glyphIndex, r, o);
                          for (var s = i.m, l = 0; l < o.crds.length; l += 2) {
                            var u = o.crds[l],
                              f = o.crds[l + 1];
                            n.crds.push(u * s.a + f * s.b + s.tx),
                              n.crds.push(u * s.c + f * s.d + s.ty);
                          }
                          for (l = 0; l < o.cmds.length; l++) n.cmds.push(o.cmds[l]);
                        }
                      }),
                      (t.U._getGlyphClass = function (e, r) {
                        var n = t._lctf.getInterval(r, e);
                        return -1 == n ? 0 : r[n + 2];
                      }),
                      (t.U._applySubs = function (e, r, n, a) {
                        for (var o = e.length - r - 1, i = 0; i < n.tabs.length; i++)
                          if (null != n.tabs[i]) {
                            var s,
                              l = n.tabs[i];
                            if (!l.coverage || -1 != (s = t._lctf.coverageIndex(l.coverage, e[r])))
                              if (1 == n.ltype)
                                e[r], 1 == l.fmt ? (e[r] = e[r] + l.delta) : (e[r] = l.newg[s]);
                              else if (4 == n.ltype)
                                for (var u = l.vals[s], f = 0; f < u.length; f++) {
                                  var c = u[f],
                                    h = c.chain.length;
                                  if (!(h > o)) {
                                    for (var d = !0, v = 0, p = 0; p < h; p++) {
                                      for (; -1 == e[r + v + (1 + p)]; ) v++;
                                      c.chain[p] != e[r + v + (1 + p)] && (d = !1);
                                    }
                                    if (d) {
                                      for (e[r] = c.nglyph, p = 0; p < h + v; p++)
                                        e[r + p + 1] = -1;
                                      break;
                                    }
                                  }
                                }
                              else if (5 == n.ltype && 2 == l.fmt)
                                for (
                                  var g = t._lctf.getInterval(l.cDef, e[r]),
                                    m = l.cDef[g + 2],
                                    y = l.scset[m],
                                    b = 0;
                                  b < y.length;
                                  b++
                                ) {
                                  var x = y[b],
                                    S = x.input;
                                  if (!(S.length > o)) {
                                    for (d = !0, p = 0; p < S.length; p++) {
                                      var U = t._lctf.getInterval(l.cDef, e[r + 1 + p]);
                                      if (-1 == g && l.cDef[U + 2] != S[p]) {
                                        d = !1;
                                        break;
                                      }
                                    }
                                    if (d) {
                                      var k = x.substLookupRecords;
                                      for (f = 0; f < k.length; f += 2) k[f], k[f + 1];
                                    }
                                  }
                                }
                              else if (6 == n.ltype && 3 == l.fmt) {
                                if (!t.U._glsCovered(e, l.backCvg, r - l.backCvg.length)) continue;
                                if (!t.U._glsCovered(e, l.inptCvg, r)) continue;
                                if (!t.U._glsCovered(e, l.ahedCvg, r + l.inptCvg.length)) continue;
                                var w = l.lookupRec;
                                for (b = 0; b < w.length; b += 2) {
                                  g = w[b];
                                  var _ = a[w[b + 1]];
                                  t.U._applySubs(e, r + g, _, a);
                                }
                              }
                          }
                      }),
                      (t.U._glsCovered = function (e, r, n) {
                        for (var a = 0; a < r.length; a++)
                          if (-1 == t._lctf.coverageIndex(r[a], e[n + a])) return !1;
                        return !0;
                      }),
                      (t.U.glyphsToPath = function (e, r, n) {
                        for (var a = { cmds: [], crds: [] }, o = 0, i = 0; i < r.length; i++) {
                          var s = r[i];
                          if (-1 != s) {
                            for (
                              var l = i < r.length - 1 && -1 != r[i + 1] ? r[i + 1] : 0,
                                u = t.U.glyphToPath(e, s),
                                f = 0;
                              f < u.crds.length;
                              f += 2
                            )
                              a.crds.push(u.crds[f] + o), a.crds.push(u.crds[f + 1]);
                            for (n && a.cmds.push(n), f = 0; f < u.cmds.length; f++)
                              a.cmds.push(u.cmds[f]);
                            n && a.cmds.push('X'),
                              (o += e.hmtx.aWidth[s]),
                              i < r.length - 1 && (o += t.U.getPairAdjustment(e, s, l));
                          }
                        }
                        return a;
                      }),
                      (t.U.P = {}),
                      (t.U.P.moveTo = function (e, t, r) {
                        e.cmds.push('M'), e.crds.push(t, r);
                      }),
                      (t.U.P.lineTo = function (e, t, r) {
                        e.cmds.push('L'), e.crds.push(t, r);
                      }),
                      (t.U.P.curveTo = function (e, t, r, n, a, o, i) {
                        e.cmds.push('C'), e.crds.push(t, r, n, a, o, i);
                      }),
                      (t.U.P.qcurveTo = function (e, t, r, n, a) {
                        e.cmds.push('Q'), e.crds.push(t, r, n, a);
                      }),
                      (t.U.P.closePath = function (e) {
                        e.cmds.push('Z');
                      }),
                      (t.U._drawCFF = function (e, r, n, a, o) {
                        for (
                          var i = r.stack,
                            s = r.nStems,
                            l = r.haveWidth,
                            u = r.width,
                            f = r.open,
                            c = 0,
                            h = r.x,
                            d = r.y,
                            v = 0,
                            p = 0,
                            g = 0,
                            m = 0,
                            y = 0,
                            b = 0,
                            x = 0,
                            S = 0,
                            U = 0,
                            k = 0,
                            w = { val: 0, size: 0 };
                          c < e.length;

                        ) {
                          t.CFF.getCharString(e, c, w);
                          var _ = w.val;
                          if (((c += w.size), 'o1' == _ || 'o18' == _))
                            i.length % 2 != 0 && !l && (u = i.shift() + a.nominalWidthX),
                              (s += i.length >> 1),
                              (i.length = 0),
                              (l = !0);
                          else if ('o3' == _ || 'o23' == _)
                            i.length % 2 != 0 && !l && (u = i.shift() + a.nominalWidthX),
                              (s += i.length >> 1),
                              (i.length = 0),
                              (l = !0);
                          else if ('o4' == _)
                            i.length > 1 && !l && ((u = i.shift() + a.nominalWidthX), (l = !0)),
                              f && t.U.P.closePath(o),
                              (d += i.pop()),
                              t.U.P.moveTo(o, h, d),
                              (f = !0);
                          else if ('o5' == _)
                            for (; i.length > 0; )
                              (h += i.shift()), (d += i.shift()), t.U.P.lineTo(o, h, d);
                          else if ('o6' == _ || 'o7' == _)
                            for (var T = i.length, F = 'o6' == _, C = 0; C < T; C++) {
                              var D = i.shift();
                              F ? (h += D) : (d += D), (F = !F), t.U.P.lineTo(o, h, d);
                            }
                          else if ('o8' == _ || 'o24' == _) {
                            T = i.length;
                            for (var A = 0; A + 6 <= T; )
                              (v = h + i.shift()),
                                (p = d + i.shift()),
                                (g = v + i.shift()),
                                (m = p + i.shift()),
                                (h = g + i.shift()),
                                (d = m + i.shift()),
                                t.U.P.curveTo(o, v, p, g, m, h, d),
                                (A += 6);
                            'o24' == _ &&
                              ((h += i.shift()), (d += i.shift()), t.U.P.lineTo(o, h, d));
                          } else {
                            if ('o11' == _) break;
                            if ('o1234' == _ || 'o1235' == _ || 'o1236' == _ || 'o1237' == _)
                              'o1234' == _ &&
                                ((p = d),
                                (g = (v = h + i.shift()) + i.shift()),
                                (k = m = p + i.shift()),
                                (b = m),
                                (S = d),
                                (h =
                                  (x = (y = (U = g + i.shift()) + i.shift()) + i.shift()) +
                                  i.shift()),
                                t.U.P.curveTo(o, v, p, g, m, U, k),
                                t.U.P.curveTo(o, y, b, x, S, h, d)),
                                'o1235' == _ &&
                                  ((v = h + i.shift()),
                                  (p = d + i.shift()),
                                  (g = v + i.shift()),
                                  (m = p + i.shift()),
                                  (U = g + i.shift()),
                                  (k = m + i.shift()),
                                  (y = U + i.shift()),
                                  (b = k + i.shift()),
                                  (x = y + i.shift()),
                                  (S = b + i.shift()),
                                  (h = x + i.shift()),
                                  (d = S + i.shift()),
                                  i.shift(),
                                  t.U.P.curveTo(o, v, p, g, m, U, k),
                                  t.U.P.curveTo(o, y, b, x, S, h, d)),
                                'o1236' == _ &&
                                  ((v = h + i.shift()),
                                  (p = d + i.shift()),
                                  (g = v + i.shift()),
                                  (k = m = p + i.shift()),
                                  (b = m),
                                  (x = (y = (U = g + i.shift()) + i.shift()) + i.shift()),
                                  (S = b + i.shift()),
                                  (h = x + i.shift()),
                                  t.U.P.curveTo(o, v, p, g, m, U, k),
                                  t.U.P.curveTo(o, y, b, x, S, h, d)),
                                'o1237' == _ &&
                                  ((v = h + i.shift()),
                                  (p = d + i.shift()),
                                  (g = v + i.shift()),
                                  (m = p + i.shift()),
                                  (U = g + i.shift()),
                                  (k = m + i.shift()),
                                  (y = U + i.shift()),
                                  (b = k + i.shift()),
                                  (x = y + i.shift()),
                                  (S = b + i.shift()),
                                  Math.abs(x - h) > Math.abs(S - d)
                                    ? (h = x + i.shift())
                                    : (d = S + i.shift()),
                                  t.U.P.curveTo(o, v, p, g, m, U, k),
                                  t.U.P.curveTo(o, y, b, x, S, h, d));
                            else if ('o14' == _) {
                              if (
                                (i.length > 0 &&
                                  !l &&
                                  ((u = i.shift() + n.nominalWidthX), (l = !0)),
                                4 == i.length)
                              ) {
                                var M = i.shift(),
                                  I = i.shift(),
                                  E = i.shift(),
                                  R = i.shift(),
                                  G = t.CFF.glyphBySE(n, E),
                                  O = t.CFF.glyphBySE(n, R);
                                t.U._drawCFF(n.CharStrings[G], r, n, a, o),
                                  (r.x = M),
                                  (r.y = I),
                                  t.U._drawCFF(n.CharStrings[O], r, n, a, o);
                              }
                              f && (t.U.P.closePath(o), (f = !1));
                            } else if ('o19' == _ || 'o20' == _)
                              i.length % 2 != 0 && !l && (u = i.shift() + a.nominalWidthX),
                                (s += i.length >> 1),
                                (i.length = 0),
                                (l = !0),
                                (c += (s + 7) >> 3);
                            else if ('o21' == _)
                              i.length > 2 && !l && ((u = i.shift() + a.nominalWidthX), (l = !0)),
                                (d += i.pop()),
                                (h += i.pop()),
                                f && t.U.P.closePath(o),
                                t.U.P.moveTo(o, h, d),
                                (f = !0);
                            else if ('o22' == _)
                              i.length > 1 && !l && ((u = i.shift() + a.nominalWidthX), (l = !0)),
                                (h += i.pop()),
                                f && t.U.P.closePath(o),
                                t.U.P.moveTo(o, h, d),
                                (f = !0);
                            else if ('o25' == _) {
                              for (; i.length > 6; )
                                (h += i.shift()), (d += i.shift()), t.U.P.lineTo(o, h, d);
                              (v = h + i.shift()),
                                (p = d + i.shift()),
                                (g = v + i.shift()),
                                (m = p + i.shift()),
                                (h = g + i.shift()),
                                (d = m + i.shift()),
                                t.U.P.curveTo(o, v, p, g, m, h, d);
                            } else if ('o26' == _)
                              for (i.length % 2 && (h += i.shift()); i.length > 0; )
                                (v = h),
                                  (p = d + i.shift()),
                                  (h = g = v + i.shift()),
                                  (d = (m = p + i.shift()) + i.shift()),
                                  t.U.P.curveTo(o, v, p, g, m, h, d);
                            else if ('o27' == _)
                              for (i.length % 2 && (d += i.shift()); i.length > 0; )
                                (p = d),
                                  (g = (v = h + i.shift()) + i.shift()),
                                  (m = p + i.shift()),
                                  (h = g + i.shift()),
                                  (d = m),
                                  t.U.P.curveTo(o, v, p, g, m, h, d);
                            else if ('o10' == _ || 'o29' == _) {
                              var P = 'o10' == _ ? a : n;
                              if (0 == i.length) console.debug('error: empty stack');
                              else {
                                var B = i.pop(),
                                  L = P.Subrs[B + P.Bias];
                                (r.x = h),
                                  (r.y = d),
                                  (r.nStems = s),
                                  (r.haveWidth = l),
                                  (r.width = u),
                                  (r.open = f),
                                  t.U._drawCFF(L, r, n, a, o),
                                  (h = r.x),
                                  (d = r.y),
                                  (s = r.nStems),
                                  (l = r.haveWidth),
                                  (u = r.width),
                                  (f = r.open);
                              }
                            } else if ('o30' == _ || 'o31' == _) {
                              var W = i.length,
                                z = ((A = 0), 'o31' == _);
                              for (A += W - (T = -3 & W); A < T; )
                                z
                                  ? ((p = d),
                                    (g = (v = h + i.shift()) + i.shift()),
                                    (d = (m = p + i.shift()) + i.shift()),
                                    T - A == 5 ? ((h = g + i.shift()), A++) : (h = g),
                                    (z = !1))
                                  : ((v = h),
                                    (p = d + i.shift()),
                                    (g = v + i.shift()),
                                    (m = p + i.shift()),
                                    (h = g + i.shift()),
                                    T - A == 5 ? ((d = m + i.shift()), A++) : (d = m),
                                    (z = !0)),
                                  t.U.P.curveTo(o, v, p, g, m, h, d),
                                  (A += 4);
                            } else {
                              if ('o' == (_ + '').charAt(0))
                                throw (console.debug('Unknown operation: ' + _, e), _);
                              i.push(_);
                            }
                          }
                        }
                        (r.x = h),
                          (r.y = d),
                          (r.nStems = s),
                          (r.haveWidth = l),
                          (r.width = u),
                          (r.open = f);
                      });
                    var r = t,
                      n = { Typr: r };
                    return (
                      (e.Typr = r),
                      (e.default = n),
                      Object.defineProperty(e, '__esModule', { value: !0 }),
                      e
                    );
                  })({}).Typr
                );
              },
              function () {
                return (function (e) {
                  var t = Uint8Array,
                    r = Uint16Array,
                    n = Uint32Array,
                    a = new t([
                      0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5,
                      5, 5, 0, 0, 0, 0,
                    ]),
                    o = new t([
                      0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11,
                      11, 12, 12, 13, 13, 0, 0,
                    ]),
                    i = new t([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
                    s = function (e, t) {
                      for (var a = new r(31), o = 0; o < 31; ++o) a[o] = t += 1 << e[o - 1];
                      var i = new n(a[30]);
                      for (o = 1; o < 30; ++o)
                        for (var s = a[o]; s < a[o + 1]; ++s) i[s] = ((s - a[o]) << 5) | o;
                      return [a, i];
                    },
                    l = s(a, 2),
                    u = l[0],
                    f = l[1];
                  (u[28] = 258), (f[258] = 28);
                  for (var c = s(o, 0)[0], h = new r(32768), d = 0; d < 32768; ++d) {
                    var v = ((43690 & d) >>> 1) | ((21845 & d) << 1);
                    (v =
                      ((61680 & (v = ((52428 & v) >>> 2) | ((13107 & v) << 2))) >>> 4) |
                      ((3855 & v) << 4)),
                      (h[d] = (((65280 & v) >>> 8) | ((255 & v) << 8)) >>> 1);
                  }
                  var p = function (e, t, n) {
                      for (var a = e.length, o = 0, i = new r(t); o < a; ++o) ++i[e[o] - 1];
                      var s,
                        l = new r(t);
                      for (o = 0; o < t; ++o) l[o] = (l[o - 1] + i[o - 1]) << 1;
                      if (n) {
                        s = new r(1 << t);
                        var u = 15 - t;
                        for (o = 0; o < a; ++o)
                          if (e[o])
                            for (
                              var f = (o << 4) | e[o],
                                c = t - e[o],
                                d = l[e[o] - 1]++ << c,
                                v = d | ((1 << c) - 1);
                              d <= v;
                              ++d
                            )
                              s[h[d] >>> u] = f;
                      } else
                        for (s = new r(a), o = 0; o < a; ++o)
                          e[o] && (s[o] = h[l[e[o] - 1]++] >>> (15 - e[o]));
                      return s;
                    },
                    g = new t(288);
                  for (d = 0; d < 144; ++d) g[d] = 8;
                  for (d = 144; d < 256; ++d) g[d] = 9;
                  for (d = 256; d < 280; ++d) g[d] = 7;
                  for (d = 280; d < 288; ++d) g[d] = 8;
                  var m = new t(32);
                  for (d = 0; d < 32; ++d) m[d] = 5;
                  var y = p(g, 9, 1),
                    b = p(m, 5, 1),
                    x = function (e) {
                      for (var t = e[0], r = 1; r < e.length; ++r) e[r] > t && (t = e[r]);
                      return t;
                    },
                    S = function (e, t, r) {
                      var n = (t / 8) | 0;
                      return ((e[n] | (e[n + 1] << 8)) >> (7 & t)) & r;
                    },
                    U = function (e, t) {
                      var r = (t / 8) | 0;
                      return (e[r] | (e[r + 1] << 8) | (e[r + 2] << 16)) >> (7 & t);
                    },
                    k = [
                      'unexpected EOF',
                      'invalid block type',
                      'invalid length/literal',
                      'invalid distance',
                      'stream finished',
                      'no stream handler',
                      ,
                      'no callback',
                      'invalid UTF-8 data',
                      'extra field too long',
                      'date not in range 1980-2099',
                      'filename too long',
                      'stream finishing',
                      'invalid zip data',
                    ],
                    w = function (e, t, r) {
                      var n = new Error(t || k[e]);
                      if (
                        ((n.code = e), Error.captureStackTrace && Error.captureStackTrace(n, w), !r)
                      )
                        throw n;
                      return n;
                    },
                    _ = function (e, s, l) {
                      var f = e.length;
                      if (!f || (l && !l.l && f < 5)) return s || new t(0);
                      var h = !s || l,
                        d = !l || l.i;
                      l || (l = {}), s || (s = new t(3 * f));
                      var v,
                        g = function (e) {
                          var r = s.length;
                          if (e > r) {
                            var n = new t(Math.max(2 * r, e));
                            n.set(s), (s = n);
                          }
                        },
                        m = l.f || 0,
                        k = l.p || 0,
                        _ = l.b || 0,
                        T = l.l,
                        F = l.d,
                        C = l.m,
                        D = l.n,
                        A = 8 * f;
                      do {
                        if (!T) {
                          l.f = m = S(e, k, 1);
                          var M = S(e, k + 1, 3);
                          if (((k += 3), !M)) {
                            var I =
                                e[(V = (((v = k) / 8) | 0) + (7 & v && 1) + 4) - 4] |
                                (e[V - 3] << 8),
                              E = V + I;
                            if (E > f) {
                              d && w(0);
                              break;
                            }
                            h && g(_ + I),
                              s.set(e.subarray(V, E), _),
                              (l.b = _ += I),
                              (l.p = k = 8 * E);
                            continue;
                          }
                          if (1 == M) (T = y), (F = b), (C = 9), (D = 5);
                          else if (2 == M) {
                            var R = S(e, k, 31) + 257,
                              G = S(e, k + 10, 15) + 4,
                              O = R + S(e, k + 5, 31) + 1;
                            k += 14;
                            for (var P = new t(O), B = new t(19), L = 0; L < G; ++L)
                              B[i[L]] = S(e, k + 3 * L, 7);
                            k += 3 * G;
                            var W = x(B),
                              z = (1 << W) - 1,
                              j = p(B, W, 1);
                            for (L = 0; L < O; ) {
                              var V,
                                N = j[S(e, k, z)];
                              if (((k += 15 & N), (V = N >>> 4) < 16)) P[L++] = V;
                              else {
                                var q = 0,
                                  X = 0;
                                for (
                                  16 == V
                                    ? ((X = 3 + S(e, k, 3)), (k += 2), (q = P[L - 1]))
                                    : 17 == V
                                      ? ((X = 3 + S(e, k, 7)), (k += 3))
                                      : 18 == V && ((X = 11 + S(e, k, 127)), (k += 7));
                                  X--;

                                )
                                  P[L++] = q;
                              }
                            }
                            var H = P.subarray(0, R),
                              $ = P.subarray(R);
                            (C = x(H)), (D = x($)), (T = p(H, C, 1)), (F = p($, D, 1));
                          } else w(1);
                          if (k > A) {
                            d && w(0);
                            break;
                          }
                        }
                        h && g(_ + 131072);
                        for (var Y = (1 << C) - 1, K = (1 << D) - 1, Z = k; ; Z = k) {
                          var Q = (q = T[U(e, k) & Y]) >>> 4;
                          if ((k += 15 & q) > A) {
                            d && w(0);
                            break;
                          }
                          if ((q || w(2), Q < 256)) s[_++] = Q;
                          else {
                            if (256 == Q) {
                              (Z = k), (T = null);
                              break;
                            }
                            var J = Q - 254;
                            if (Q > 264) {
                              var ee = a[(L = Q - 257)];
                              (J = S(e, k, (1 << ee) - 1) + u[L]), (k += ee);
                            }
                            var te = F[U(e, k) & K],
                              re = te >>> 4;
                            if (
                              (te || w(3),
                              (k += 15 & te),
                              ($ = c[re]),
                              re > 3 && ((ee = o[re]), ($ += U(e, k) & ((1 << ee) - 1)), (k += ee)),
                              k > A)
                            ) {
                              d && w(0);
                              break;
                            }
                            h && g(_ + 131072);
                            for (var ne = _ + J; _ < ne; _ += 4)
                              (s[_] = s[_ - $]),
                                (s[_ + 1] = s[_ + 1 - $]),
                                (s[_ + 2] = s[_ + 2 - $]),
                                (s[_ + 3] = s[_ + 3 - $]);
                            _ = ne;
                          }
                        }
                        (l.l = T),
                          (l.p = Z),
                          (l.b = _),
                          T && ((m = 1), (l.m = C), (l.d = F), (l.n = D));
                      } while (!m);
                      return _ == s.length
                        ? s
                        : (function (e, a, o) {
                            (null == a || a < 0) && (a = 0),
                              (null == o || o > e.length) && (o = e.length);
                            var i = new (e instanceof r ? r : e instanceof n ? n : t)(o - a);
                            return i.set(e.subarray(a, o)), i;
                          })(s, 0, _);
                    },
                    T = new t(0),
                    F = 'undefined' != typeof TextDecoder && new TextDecoder();
                  try {
                    F.decode(T, { stream: !0 });
                  } catch (e) {}
                  return (
                    (e.convert_streams = function (e) {
                      var t = new DataView(e),
                        r = 0;
                      function n() {
                        var e = t.getUint16(r);
                        return (r += 2), e;
                      }
                      function a() {
                        var e = t.getUint32(r);
                        return (r += 4), e;
                      }
                      function o(e) {
                        m.setUint16(y, e), (y += 2);
                      }
                      function i(e) {
                        m.setUint32(y, e), (y += 4);
                      }
                      for (
                        var s = {
                            signature: a(),
                            flavor: a(),
                            length: a(),
                            numTables: n(),
                            reserved: n(),
                            totalSfntSize: a(),
                            majorVersion: n(),
                            minorVersion: n(),
                            metaOffset: a(),
                            metaLength: a(),
                            metaOrigLength: a(),
                            privOffset: a(),
                            privLength: a(),
                          },
                          l = 0;
                        Math.pow(2, l) <= s.numTables;

                      )
                        l++;
                      l--;
                      for (
                        var u = 16 * Math.pow(2, l),
                          f = 16 * s.numTables - u,
                          c = 12,
                          h = [],
                          d = 0;
                        d < s.numTables;
                        d++
                      )
                        h.push({
                          tag: a(),
                          offset: a(),
                          compLength: a(),
                          origLength: a(),
                          origChecksum: a(),
                        }),
                          (c += 16);
                      var v,
                        p = new Uint8Array(
                          12 +
                            16 * h.length +
                            h.reduce(function (e, t) {
                              return e + t.origLength + 4;
                            }, 0),
                        ),
                        g = p.buffer,
                        m = new DataView(g),
                        y = 0;
                      return (
                        i(s.flavor),
                        o(s.numTables),
                        o(u),
                        o(l),
                        o(f),
                        h.forEach(function (e) {
                          i(e.tag),
                            i(e.origChecksum),
                            i(c),
                            i(e.origLength),
                            (e.outOffset = c),
                            (c += e.origLength) % 4 != 0 && (c += 4 - (c % 4));
                        }),
                        h.forEach(function (t) {
                          var r,
                            n = e.slice(t.offset, t.offset + t.compLength);
                          if (t.compLength != t.origLength) {
                            var a = new Uint8Array(t.origLength);
                            (r = new Uint8Array(n, 2)), _(r, a);
                          } else a = new Uint8Array(n);
                          p.set(a, t.outOffset);
                          var o = 0;
                          (c = t.outOffset + t.origLength) % 4 != 0 && (o = 4 - (c % 4)),
                            p.set(new Uint8Array(o).buffer, t.outOffset + t.origLength),
                            (v = c + o);
                        }),
                        g.slice(0, v)
                      );
                    }),
                    Object.defineProperty(e, '__esModule', { value: !0 }),
                    e
                  );
                })({}).convert_streams;
              },
              function (e, t) {
                const r = { M: 2, L: 2, Q: 4, C: 6, Z: 0 },
                  n = {
                    C: '18g,ca,368,1kz',
                    D: '17k,6,2,2+4,5+c,2+6,2+1,10+1,9+f,j+11,2+1,a,2,2+1,15+2,3,j+2,6+3,2+8,2,2,2+1,w+a,4+e,3+3,2,3+2,3+5,23+w,2f+4,3,2+9,2,b,2+3,3,1k+9,6+1,3+1,2+2,2+d,30g,p+y,1,1+1g,f+x,2,sd2+1d,jf3+4,f+3,2+4,2+2,b+3,42,2,4+2,2+1,2,3,t+1,9f+w,2,el+2,2+g,d+2,2l,2+1,5,3+1,2+1,2,3,6,16wm+1v',
                    R: '17m+3,2,2,6+3,m,15+2,2+2,h+h,13,3+8,2,2,3+1,2,p+1,x,5+4,5,a,2,2,3,u,c+2,g+1,5,2+1,4+1,5j,6+1,2,b,2+2,f,2+1,1s+2,2,3+1,7,1ez0,2,2+1,4+4,b,4,3,b,42,2+2,4,3,2+1,2,o+3,ae,ep,x,2o+2,3+1,3,5+1,6',
                    L: 'x9u,jff,a,fd,jv',
                    T: '4t,gj+33,7o+4,1+1,7c+18,2,2+1,2+1,2,21+a,2,1b+k,h,2u+6,3+5,3+1,2+3,y,2,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,3,7,6+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+d,1,1+1,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,ek,3+1,r+4,1e+4,6+5,2p+c,1+3,1,1+2,1+b,2db+2,3y,2p+v,ff+3,30+1,n9x,1+2,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,5s,6y+2,ea,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+9,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2,2b+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,470+8,at4+4,1o+6,t5,1s+3,2a,f5l+1,2+3,43o+2,a+7,1+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,1,gzau,v+2n,3l+6n',
                  };
                let a;
                function o(e) {
                  if (!a) {
                    const e = { R: 2, L: 1, D: 4, C: 16, U: 32, T: 8 };
                    a = new Map();
                    for (let t in n) {
                      let r = 0;
                      n[t].split(',').forEach((n) => {
                        let [o, i] = n.split('+');
                        (o = parseInt(o, 36)), (i = i ? parseInt(i, 36) : 0), a.set((r += o), e[t]);
                        for (let n = i; n--; ) a.set(++r, e[t]);
                      });
                    }
                  }
                  return a.get(e) || 32;
                }
                const i = [null, 'isol', 'init', 'fina', 'medi'];
                function s(e) {
                  const t = new Uint8Array(e.length);
                  let r = 32,
                    n = 1,
                    a = -1;
                  for (let i = 0; i < e.length; i++) {
                    const s = e.codePointAt(i);
                    let l = 0 | o(s),
                      u = 1;
                    8 & l ||
                      (21 & r
                        ? 22 & l
                          ? ((u = 3), (1 !== n && 3 !== n) || t[a]++)
                          : 33 & l && ((2 !== n && 4 !== n) || t[a]--)
                        : 34 & r && ((2 !== n && 4 !== n) || t[a]--),
                      (n = t[i] = u),
                      (r = l),
                      (a = i),
                      s > 65535 && i++);
                  }
                  return t;
                }
                function l(t, r) {
                  const n = t.GDEF && t.GDEF.glyphClassDef;
                  return n ? e.U._getGlyphClass(r, n) : 0;
                }
                function u(...e) {
                  for (let t = 0; t < e.length; t++) if ('number' == typeof e[t]) return e[t];
                }
                function f(t) {
                  const n = Object.create(null),
                    a = t['OS/2'],
                    o = t.hhea,
                    f = t.head.unitsPerEm,
                    c = u(a && a.sTypoAscender, o && o.ascender, f),
                    h = {
                      unitsPerEm: f,
                      ascender: c,
                      descender: u(a && a.sTypoDescender, o && o.descender, 0),
                      capHeight: u(a && a.sCapHeight, c),
                      xHeight: u(a && a.sxHeight, c),
                      lineGap: u(a && a.sTypoLineGap, o && o.lineGap),
                      supportsCodePoint: (r) => e.U.codeToGlyph(t, r) > 0,
                      forEachGlyph(a, o, u, f) {
                        let c = 0;
                        const d = (1 / h.unitsPerEm) * o,
                          v = (function (t, r) {
                            const n = [];
                            for (let a = 0; a < r.length; a++) {
                              const o = r.codePointAt(a);
                              o > 65535 && a++, n.push(e.U.codeToGlyph(t, o));
                            }
                            const a = t.GSUB;
                            if (a) {
                              const { lookupList: t, featureList: o } = a;
                              let l;
                              const u =
                                  /^(rlig|liga|mset|isol|init|fina|medi|half|pres|blws|ccmp)$/,
                                f = [];
                              o.forEach((a) => {
                                if (u.test(a.tag))
                                  for (let o = 0; o < a.tab.length; o++) {
                                    if (f[a.tab[o]]) continue;
                                    f[a.tab[o]] = !0;
                                    const u = t[a.tab[o]],
                                      c = /^(isol|init|fina|medi)$/.test(a.tag);
                                    c && !l && (l = s(r));
                                    for (let r = 0; r < n.length; r++)
                                      (l && c && i[l[r]] !== a.tag) || e.U._applySubs(n, r, u, t);
                                  }
                              });
                            }
                            return n;
                          })(t, a);
                        let p = 0;
                        const g = (function (t, r) {
                          const n = new Int16Array(3 * r.length);
                          let a = 0;
                          for (; a < r.length; a++) {
                            const u = r[a];
                            if (-1 === u) continue;
                            n[3 * a + 2] = t.hmtx.aWidth[u];
                            const f = t.GPOS;
                            if (f) {
                              const c = f.lookupList;
                              for (let f = 0; f < c.length; f++) {
                                const h = c[f];
                                for (let f = 0; f < h.tabs.length; f++) {
                                  const c = h.tabs[f];
                                  if (1 === h.ltype) {
                                    if (-1 !== e._lctf.coverageIndex(c.coverage, u) && c.pos) {
                                      s(c.pos, a);
                                      break;
                                    }
                                  } else if (2 === h.ltype) {
                                    let t = null,
                                      n = o();
                                    if (-1 !== n) {
                                      const o = e._lctf.coverageIndex(c.coverage, r[n]);
                                      if (-1 !== o) {
                                        if (1 === c.fmt) {
                                          const e = c.pairsets[o];
                                          for (let r = 0; r < e.length; r++)
                                            e[r].gid2 === u && (t = e[r]);
                                        } else if (2 === c.fmt) {
                                          const a = e.U._getGlyphClass(r[n], c.classDef1),
                                            o = e.U._getGlyphClass(u, c.classDef2);
                                          t = c.matrix[a][o];
                                        }
                                        if (t) {
                                          t.val1 && s(t.val1, n), t.val2 && s(t.val2, a);
                                          break;
                                        }
                                      }
                                    }
                                  } else if (4 === h.ltype) {
                                    const t = e._lctf.coverageIndex(c.markCoverage, u);
                                    if (-1 !== t) {
                                      const s = o(i),
                                        l =
                                          -1 === s
                                            ? -1
                                            : e._lctf.coverageIndex(c.baseCoverage, r[s]);
                                      if (-1 !== l) {
                                        const e = c.markArray[t],
                                          r = c.baseArray[l][e.markClass];
                                        (n[3 * a] = r.x - e.x + n[3 * s] - n[3 * s + 2]),
                                          (n[3 * a + 1] = r.y - e.y + n[3 * s + 1]);
                                        break;
                                      }
                                    }
                                  } else if (6 === h.ltype) {
                                    const i = e._lctf.coverageIndex(c.mark1Coverage, u);
                                    if (-1 !== i) {
                                      const s = o();
                                      if (-1 !== s) {
                                        const o = r[s];
                                        if (3 === l(t, o)) {
                                          const t = e._lctf.coverageIndex(c.mark2Coverage, o);
                                          if (-1 !== t) {
                                            const e = c.mark1Array[i],
                                              r = c.mark2Array[t][e.markClass];
                                            (n[3 * a] = r.x - e.x + n[3 * s] - n[3 * s + 2]),
                                              (n[3 * a + 1] = r.y - e.y + n[3 * s + 1]);
                                            break;
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            } else if (t.kern && !t.cff) {
                              const e = o();
                              if (-1 !== e) {
                                const a = t.kern.glyph1.indexOf(r[e]);
                                if (-1 !== a) {
                                  const r = t.kern.rval[a].glyph2.indexOf(u);
                                  -1 !== r && (n[3 * e + 2] += t.kern.rval[a].vals[r]);
                                }
                              }
                            }
                          }
                          return n;
                          function o(e) {
                            for (let t = a - 1; t >= 0; t--)
                              if (-1 !== r[t] && (!e || e(r[t]))) return t;
                            return -1;
                          }
                          function i(e) {
                            return 1 === l(t, e);
                          }
                          function s(e, t) {
                            for (let r = 0; r < 3; r++) n[3 * t + r] += e[r] || 0;
                          }
                        })(t, v);
                        return (
                          v.forEach((i, s) => {
                            if (-1 !== i) {
                              let a = n[i];
                              if (!a) {
                                const { cmds: o, crds: s } = e.U.glyphToPath(t, i);
                                let l,
                                  u,
                                  f,
                                  c,
                                  h = '',
                                  d = 0;
                                for (let e = 0, t = o.length; e < t; e++) {
                                  const t = r[o[e]];
                                  h += o[e];
                                  for (let e = 1; e <= t; e++) h += (e > 1 ? ',' : '') + s[d++];
                                }
                                if (s.length) {
                                  (l = u = 1 / 0), (f = c = -1 / 0);
                                  for (let e = 0, t = s.length; e < t; e += 2) {
                                    let t = s[e],
                                      r = s[e + 1];
                                    t < l && (l = t),
                                      r < u && (u = r),
                                      t > f && (f = t),
                                      r > c && (c = r);
                                  }
                                } else l = f = u = c = 0;
                                a = n[i] = {
                                  index: i,
                                  advanceWidth: t.hmtx.aWidth[i],
                                  xMin: l,
                                  yMin: u,
                                  xMax: f,
                                  yMax: c,
                                  path: h,
                                };
                              }
                              f.call(null, a, c + g[3 * s] * d, g[3 * s + 1] * d, p),
                                (c += g[3 * s + 2] * d),
                                u && (c += u * o);
                            }
                            p += a.codePointAt(p) > 65535 ? 2 : 1;
                          }),
                          c
                        );
                      },
                    };
                  return h;
                }
                return function (r) {
                  const n = new Uint8Array(r, 0, 4),
                    a = e._bin.readASCII(n, 0, 4);
                  if ('wOFF' === a) r = t(r);
                  else if ('wOF2' === a) throw new Error('woff2 fonts not supported');
                  return f(e.parse(r)[0]);
                };
              },
            ],
            init: (e, t, r) => r(e(), t()),
          }),
          function () {
            return (function (e) {
              var t = function () {
                this.buckets = new Map();
              };
              (t.prototype.add = function (e) {
                var t = e >> 5;
                this.buckets.set(t, (this.buckets.get(t) || 0) | (1 << (31 & e)));
              }),
                (t.prototype.has = function (e) {
                  var t = this.buckets.get(e >> 5);
                  return void 0 !== t && 0 != (t & (1 << (31 & e)));
                }),
                (t.prototype.serialize = function () {
                  var e = [];
                  return (
                    this.buckets.forEach(function (t, r) {
                      e.push((+r).toString(36) + ':' + t.toString(36));
                    }),
                    e.join(',')
                  );
                }),
                (t.prototype.deserialize = function (e) {
                  var t = this;
                  this.buckets.clear(),
                    e.split(',').forEach(function (e) {
                      var r = e.split(':');
                      t.buckets.set(parseInt(r[0], 36), parseInt(r[1], 36));
                    });
                });
              var r = Math.pow(2, 8),
                n = r - 1,
                a = ~n;
              function o(e) {
                return (
                  'codepoint-index/plane' +
                  (e >> 16) +
                  '/' +
                  (function (e) {
                    return e & a;
                  })(e).toString(16) +
                  '-' +
                  (function (e) {
                    return (e & a) + r - 1;
                  })(e).toString(16) +
                  '.json'
                );
              }
              function i(e, t) {
                var r = e & n,
                  a = t.codePointAt((r / 6) | 0);
                return 0 != ((a = (a || 48) - 48) & (1 << r % 6));
              }
              function s(e, t) {
                !(function (e, t) {
                  var r;
                  ((r = e),
                  r
                    .replace(/U\+/gi, '')
                    .replace(/^,+|,+$/g, '')
                    .split(/,+/)
                    .map(function (e) {
                      return e.split('-').map(function (e) {
                        return parseInt(e.trim(), 16);
                      });
                    })).forEach(function (e) {
                    var r = e[0],
                      n = e[1];
                    void 0 === n && (n = r), t(r, n);
                  });
                })(e, function (e, r) {
                  for (var n = e; n <= r; n++) t(n);
                });
              }
              var l = {},
                u = {},
                f = new WeakMap(),
                c = 'https://cdn.jsdelivr.net/gh/lojjic/unicode-font-resolver@v1.0.1/packages/data';
              function h(e) {
                var r = f.get(e);
                return (
                  r ||
                    ((r = new t()),
                    s(e.ranges, function (e) {
                      return r.add(e);
                    }),
                    f.set(e, r)),
                  r
                );
              }
              var d,
                v = new Map();
              function p(e, t, r) {
                return e[t]
                  ? t
                  : e[r]
                    ? r
                    : (function (e) {
                        for (var t in e) return t;
                      })(e);
              }
              function g(e, t) {
                var r = t;
                if (!e.includes(r)) {
                  r = 1 / 0;
                  for (var n = 0; n < e.length; n++)
                    Math.abs(e[n] - t) < Math.abs(r - t) && (r = e[n]);
                }
                return r;
              }
              function m(e) {
                return (
                  d ||
                    ((d = new Set()),
                    s('9-D,20,85,A0,1680,2000-200A,2028-202F,205F,3000', function (e) {
                      d.add(e);
                    })),
                  d.has(e)
                );
              }
              return (
                (e.CodePointSet = t),
                (e.clearCache = function () {
                  (l = {}), (u = {});
                }),
                (e.getFontsForString = function (e, t) {
                  void 0 === t && (t = {});
                  var r,
                    n = t.lang;
                  void 0 === n &&
                    (n = /\p{Script=Hangul}/u.test((r = e))
                      ? 'ko'
                      : /\p{Script=Hiragana}|\p{Script=Katakana}/u.test(r)
                        ? 'ja'
                        : 'en');
                  var a = t.category;
                  void 0 === a && (a = 'sans-serif');
                  var s = t.style;
                  void 0 === s && (s = 'normal');
                  var f = t.weight;
                  void 0 === f && (f = 400);
                  var d = (t.dataUrl || c).replace(/\/$/g, ''),
                    y = new Map(),
                    b = new Uint8Array(e.length),
                    x = {},
                    S = {},
                    U = new Array(e.length),
                    k = new Map(),
                    w = !1;
                  function _(e) {
                    var t = v.get(e);
                    return (
                      t ||
                        ((t = fetch(d + '/' + e)
                          .then(function (e) {
                            if (!e.ok) throw new Error(e.statusText);
                            return e.json().then(function (e) {
                              if (!Array.isArray(e) || 1 !== e[0])
                                throw new Error('Incorrect schema version; need 1, got ' + e[0]);
                              return e[1];
                            });
                          })
                          .catch(function (t) {
                            if (d !== c)
                              return (
                                w ||
                                  (console.error(
                                    'unicode-font-resolver: Failed loading from dataUrl "' +
                                      d +
                                      '", trying default CDN. ' +
                                      t.message,
                                  ),
                                  (w = !0)),
                                (d = c),
                                v.delete(e),
                                _(e)
                              );
                            throw t;
                          })),
                        v.set(e, t)),
                      t
                    );
                  }
                  for (
                    var T = function (t) {
                        var r = e.codePointAt(t),
                          n = o(r);
                        (U[t] = n),
                          l[n] ||
                            k.has(n) ||
                            k.set(
                              n,
                              _(n).then(function (e) {
                                l[n] = e;
                              }),
                            ),
                          r > 65535 && (t++, (F = t));
                      },
                      F = 0;
                    F < e.length;
                    F++
                  )
                    T(F);
                  return Promise.all(k.values())
                    .then(function () {
                      k.clear();
                      for (
                        var t = function (t) {
                            var a = e.codePointAt(t),
                              o = null,
                              s = l[U[t]],
                              f = void 0;
                            for (var c in s) {
                              var h = S[c];
                              if ((void 0 === h && (h = S[c] = new RegExp(c).test(n || 'en')), h)) {
                                for (var d in ((f = c), s[c]))
                                  if (i(a, s[c][d])) {
                                    o = d;
                                    break;
                                  }
                                break;
                              }
                            }
                            if (!o)
                              e: for (var v in s)
                                if (v !== f)
                                  for (var p in s[v])
                                    if (i(a, s[v][p])) {
                                      o = p;
                                      break e;
                                    }
                            o ||
                              (console.debug('No font coverage for U+' + a.toString(16)),
                              (o = 'latin')),
                              (U[t] = o),
                              u[o] ||
                                k.has(o) ||
                                k.set(
                                  o,
                                  _('font-meta/' + o + '.json').then(function (e) {
                                    u[o] = e;
                                  }),
                                ),
                              a > 65535 && (t++, (r = t));
                          },
                          r = 0;
                        r < e.length;
                        r++
                      )
                        t(r);
                      return Promise.all(k.values());
                    })
                    .then(function () {
                      for (var t, r = null, n = 0; n < e.length; n++) {
                        var o = e.codePointAt(n);
                        if (r && (m(o) || h(r).has(o))) b[n] = b[n - 1];
                        else {
                          r = u[U[n]];
                          var i = x[r.id];
                          if (!i) {
                            var l = r.typeforms,
                              c = p(l, a, 'sans-serif'),
                              v = p(l[c], s, 'normal'),
                              S = g(null === (t = l[c]) || void 0 === t ? void 0 : t[v], f);
                            i = x[r.id] =
                              d + '/font-files/' + r.id + '/' + c + '.' + v + '.' + S + '.woff';
                          }
                          var k = y.get(i);
                          null == k && ((k = y.size), y.set(i, k)), (b[n] = k);
                        }
                        o > 65535 && (n++, (b[n] = b[n - 1]));
                      }
                      return { fontUrls: Array.from(y.keys()), chars: b };
                    });
                }),
                Object.defineProperty(e, '__esModule', { value: !0 }),
                e
              );
            })({});
          },
        ],
        init: (e, t, r) => e(t, r()),
      });
      const M = () => (self.performance || Date).now(),
        I = p();
      let E;
      const R = [];
      let G = 0;
      function O() {
        const e = M();
        for (; R.length && M() - e < 5; ) R.shift()();
        G = R.length ? setTimeout(O, 0) : 0;
      }
      const P = (...e) =>
          new Promise((t, r) => {
            R.push(() => {
              const n = M();
              try {
                I.webgl.generateIntoCanvas(...e), t({ timing: M() - n });
              } catch (e) {
                r(e);
              }
            }),
              G || (G = setTimeout(O, 0));
          }),
        B = {};
      let L = 0;
      function W(e, t, r, n, a, o, i, s, l, c) {
        const d = 'TroikaTextSDFGenerator_JS_' + (L++ % 4);
        let v = B[d];
        return (
          v ||
            (v = B[d] =
              {
                workerModule: h({
                  name: d,
                  workerId: d,
                  dependencies: [p, M],
                  init(e, t) {
                    const r = e().javascript.generate;
                    return function (...e) {
                      const n = t();
                      return { textureData: r(...e), timing: t() - n };
                    };
                  },
                  getTransferables: (e) => [e.textureData.buffer],
                }),
                requests: 0,
                idleTimer: null,
              }),
          v.requests++,
          clearTimeout(v.idleTimer),
          v.workerModule(e, t, r, n, a, o).then(({ textureData: r, timing: n }) => {
            const a = M(),
              o = new Uint8Array(4 * r.length);
            for (let e = 0; e < r.length; e++) o[4 * e + c] = r[e];
            return (
              I.webglUtils.renderImageData(i, o, s, l, e, t, 1 << (3 - c)),
              (n += M() - a),
              0 == --v.requests &&
                (v.idleTimer = setTimeout(() => {
                  !(function (e) {
                    f[e] &&
                      f[e].forEach(function (e) {
                        e();
                      }),
                      u[e] && (u[e].terminate(), delete u[e]);
                  })(d);
                }, 2e3)),
              { timing: n }
            );
          })
        );
      }
      const z = I.webglUtils.resizeWebGLCanvasWithoutClearing,
        j = {
          defaultFontURL: null,
          unicodeFontsURL: null,
          sdfGlyphSize: 64,
          sdfMargin: 1 / 16,
          sdfExponent: 9,
          textureWidth: 2048,
        },
        V = new n.Color();
      let N = !1;
      function q() {
        return (self.performance || Date).now();
      }
      function X(e) {
        N
          ? console.warn('configureTextBuilder called after first font request; will be ignored.')
          : Z(j, e);
      }
      const H = Object.create(null);
      function $(e, t) {
        (N = !0), (e = Z({}, e));
        const r = q(),
          { defaultFontURL: a } = j,
          o = [];
        if (
          (a && o.push({ label: 'default', src: J(a) }),
          e.font && o.push({ label: 'user', src: J(e.font) }),
          (e.font = o),
          (e.text = '' + e.text),
          (e.sdfGlyphSize = e.sdfGlyphSize || j.sdfGlyphSize),
          (e.unicodeFontsURL = e.unicodeFontsURL || j.unicodeFontsURL),
          null != e.colorRanges)
        ) {
          let t = {};
          for (let r in e.colorRanges)
            if (e.colorRanges.hasOwnProperty(r)) {
              let n = e.colorRanges[r];
              'number' != typeof n && (n = V.set(n).getHex()), (t[r] = n);
            }
          e.colorRanges = t;
        }
        Object.freeze(e);
        const { textureWidth: i, sdfExponent: s } = j,
          { sdfGlyphSize: l } = e,
          u = (i / l) * 4;
        let f = H[l];
        if (!f) {
          const e = document.createElement('canvas');
          (e.width = i),
            (e.height = (256 * l) / u),
            (f = H[l] =
              {
                glyphCount: 0,
                sdfGlyphSize: l,
                sdfCanvas: e,
                sdfTexture: new n.Texture(
                  e,
                  void 0,
                  void 0,
                  void 0,
                  n.LinearFilter,
                  n.LinearFilter,
                ),
                contextLost: !1,
                glyphsByFont: new Map(),
              }),
            (f.sdfTexture.generateMipmaps = !1),
            (function (e) {
              const t = e.sdfCanvas;
              t.addEventListener('webglcontextlost', (t) => {
                console.log('Context Lost', t), t.preventDefault(), (e.contextLost = !0);
              }),
                t.addEventListener('webglcontextrestored', (t) => {
                  console.log('Context Restored', t), (e.contextLost = !1);
                  const r = [];
                  e.glyphsByFont.forEach((t) => {
                    t.forEach((t) => {
                      r.push(Y(t, e, !0));
                    });
                  }),
                    Promise.all(r).then(() => {
                      ee(e), (e.sdfTexture.needsUpdate = !0);
                    });
                });
            })(f);
        }
        const { sdfTexture: c, sdfCanvas: h } = f;
        te(e).then((n) => {
          const {
              glyphIds: a,
              glyphFontIndices: o,
              fontData: d,
              glyphPositions: v,
              fontSize: p,
              timings: g,
            } = n,
            m = [],
            y = new Float32Array(4 * a.length);
          let b = 0,
            x = 0;
          const S = q(),
            U = d.map((e) => {
              let t = f.glyphsByFont.get(e.src);
              return t || f.glyphsByFont.set(e.src, (t = new Map())), t;
            });
          a.forEach((e, t) => {
            const r = o[t],
              { src: i, unitsPerEm: s } = d[r];
            let u = U[r].get(e);
            if (!u) {
              const { path: t, pathBounds: a } = n.glyphData[i][e],
                o = (Math.max(a[2] - a[0], a[3] - a[1]) / l) * (j.sdfMargin * l + 0.5),
                s = f.glyphCount++,
                c = [a[0] - o, a[1] - o, a[2] + o, a[3] + o];
              U[r].set(e, (u = { path: t, atlasIndex: s, sdfViewBox: c })), m.push(u);
            }
            const { sdfViewBox: c } = u,
              h = v[x++],
              g = v[x++],
              S = p / s;
            (y[b++] = h + c[0] * S),
              (y[b++] = g + c[1] * S),
              (y[b++] = h + c[2] * S),
              (y[b++] = g + c[3] * S),
              (a[t] = u.atlasIndex);
          }),
            (g.quads = (g.quads || 0) + (q() - S));
          const k = q();
          g.sdf = {};
          const w = h.height,
            _ = Math.ceil(f.glyphCount / u),
            T = Math.pow(2, Math.ceil(Math.log2(_ * l)));
          T > w &&
            (console.info(`Increasing SDF texture size ${w}->${T}`), z(h, i, T), c.dispose()),
            Promise.all(
              m.map((t) =>
                Y(t, f, e.gpuAccelerateSDF).then(({ timing: e }) => {
                  g.sdf[t.atlasIndex] = e;
                }),
              ),
            ).then(() => {
              m.length && !f.contextLost && (ee(f), (c.needsUpdate = !0)),
                (g.sdfTotal = q() - k),
                (g.total = q() - r),
                t(
                  Object.freeze({
                    parameters: e,
                    sdfTexture: c,
                    sdfGlyphSize: l,
                    sdfExponent: s,
                    glyphBounds: y,
                    glyphAtlasIndices: a,
                    glyphColors: n.glyphColors,
                    caretPositions: n.caretPositions,
                    chunkedBounds: n.chunkedBounds,
                    ascender: n.ascender,
                    descender: n.descender,
                    lineHeight: n.lineHeight,
                    capHeight: n.capHeight,
                    xHeight: n.xHeight,
                    topBaseline: n.topBaseline,
                    blockBounds: n.blockBounds,
                    visibleBounds: n.visibleBounds,
                    timings: n.timings,
                  }),
                );
            });
        }),
          Promise.resolve().then(() => {
            var e;
            f.contextLost || (e = h)._warm || (I.webgl.isSupported(e), (e._warm = !0));
          });
      }
      function Y(
        { path: e, atlasIndex: t, sdfViewBox: r },
        { sdfGlyphSize: n, sdfCanvas: a, contextLost: o },
        i,
      ) {
        if (o) return Promise.resolve({ timing: -1 });
        const { textureWidth: s, sdfExponent: l } = j,
          u = Math.max(r[2] - r[0], r[3] - r[1]),
          f = Math.floor(t / 4);
        return (function (e, t, r, n, a, o, i, s, l, u, f = !0) {
          return f
            ? P(e, t, r, n, a, o, i, s, l, u).then(
                null,
                (f) => (
                  E ||
                    (console.warn('WebGL SDF generation failed, falling back to JS', f), (E = !0)),
                  W(e, t, r, n, a, o, i, s, l, u)
                ),
              )
            : W(e, t, r, n, a, o, i, s, l, u);
        })(n, n, e, r, u, l, a, (f % (s / n)) * n, Math.floor(f / (s / n)) * n, t % 4, i);
      }
      function K({ font: e, characters: t, sdfGlyphSize: r }, n) {
        $({ font: e, sdfGlyphSize: r, text: Array.isArray(t) ? t.join('\n') : '' + t }, n);
      }
      function Z(e, t) {
        for (let r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
        return e;
      }
      let Q;
      function J(e) {
        return (
          Q || (Q = 'undefined' == typeof document ? {} : document.createElement('a')),
          (Q.href = e),
          Q.href
        );
      }
      function ee(e) {
        if ('function' != typeof createImageBitmap) {
          console.info('Safari<15: applying SDF canvas workaround');
          const { sdfCanvas: t, sdfTexture: r } = e,
            { width: n, height: a } = t,
            o = e.sdfCanvas.getContext('webgl');
          let i = r.image.data;
          (i && i.length === n * a * 4) ||
            ((i = new Uint8Array(n * a * 4)),
            (r.image = { width: n, height: a, data: i }),
            (r.flipY = !1),
            (r.isDataTexture = !0)),
            o.readPixels(0, 0, n, a, o.RGBA, o.UNSIGNED_BYTE, i);
        }
      }
      const te = h({
        name: 'Typesetter',
        dependencies: [
          h({
            name: 'Typesetter',
            dependencies: [
              function (e, t) {
                const r = 1 / 0,
                  n =
                    /[\u00AD\u034F\u061C\u115F-\u1160\u17B4-\u17B5\u180B-\u180E\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFF8]/,
                  a = '[^\\S\\u00A0]',
                  o = new RegExp(
                    '[^\\S\\u00A0]|[\\-\\u007C\\u00AD\\u2010\\u2012-\\u2014\\u2027\\u2056\\u2E17\\u2E40]',
                  );
                function i(
                  {
                    text: i = '',
                    font: c,
                    lang: h,
                    sdfGlyphSize: d = 64,
                    fontSize: v = 400,
                    fontWeight: p = 1,
                    fontStyle: g = 'normal',
                    letterSpacing: m = 0,
                    lineHeight: y = 'normal',
                    maxWidth: b = r,
                    direction: x,
                    textAlign: S = 'left',
                    textIndent: U = 0,
                    whiteSpace: k = 'normal',
                    overflowWrap: w = 'normal',
                    anchorX: _ = 0,
                    anchorY: T = 0,
                    metricsOnly: F = !1,
                    unicodeFontsURL: C,
                    preResolvedFonts: D = null,
                    includeCaretPositions: A = !1,
                    chunkedBoundsSize: M = 8192,
                    colorRanges: I = null,
                  },
                  E,
                ) {
                  const R = u(),
                    G = { fontLoad: 0, typesetting: 0 };
                  i.indexOf('\r') > -1 &&
                    (console.info('Typesetter: got text with \\r chars; normalizing to \\n'),
                    (i = i.replace(/\r\n/g, '\n').replace(/\r/g, '\n'))),
                    (v = +v),
                    (m = +m),
                    (b = +b),
                    (y = y || 'normal'),
                    (U = +U),
                    (function (
                      {
                        text: t,
                        lang: r,
                        fonts: n,
                        style: a,
                        weight: o,
                        preResolvedFonts: i,
                        unicodeFontsURL: s,
                      },
                      l,
                    ) {
                      const u = ({ chars: e, fonts: t }) => {
                        let r, n;
                        const a = [];
                        for (let o = 0; o < e.length; o++)
                          e[o] !== n
                            ? ((n = e[o]), a.push((r = { start: o, end: o, fontObj: t[e[o]] })))
                            : (r.end = o);
                        l(a);
                      };
                      i
                        ? u(i)
                        : e(t, u, { lang: r, fonts: n, style: a, weight: o, unicodeFontsURL: s });
                    })(
                      {
                        text: i,
                        lang: h,
                        style: g,
                        weight: p,
                        fonts: 'string' == typeof c ? [{ src: c }] : c,
                        unicodeFontsURL: C,
                        preResolvedFonts: D,
                      },
                      (e) => {
                        G.fontLoad = u() - R;
                        const c = isFinite(b);
                        let h = null,
                          d = null,
                          p = null,
                          g = null,
                          C = null,
                          D = null,
                          O = null,
                          P = null,
                          B = 0,
                          L = 0,
                          W = 'nowrap' !== k;
                        const z = new Map(),
                          j = u();
                        let V = U,
                          N = 0,
                          q = new f();
                        const X = [q];
                        e.forEach((e) => {
                          const { fontObj: t } = e,
                            {
                              ascender: r,
                              descender: s,
                              unitsPerEm: l,
                              lineGap: u,
                              capHeight: h,
                              xHeight: d,
                            } = t;
                          let p = z.get(t);
                          if (!p) {
                            const e = v / l,
                              n = 'normal' === y ? (r - s + u) * e : y * v,
                              a = (n - (r - s) * e) / 2,
                              o = Math.min(n, (r - s) * e),
                              i = ((r + s) / 2) * e + o / 2;
                            (p = {
                              index: z.size,
                              src: t.src,
                              fontObj: t,
                              fontSizeMult: e,
                              unitsPerEm: l,
                              ascender: r * e,
                              descender: s * e,
                              capHeight: h * e,
                              xHeight: d * e,
                              lineHeight: n,
                              baseline: -a - r * e,
                              caretTop: i,
                              caretBottom: i - o,
                            }),
                              z.set(t, p);
                          }
                          const { fontSizeMult: g } = p,
                            x = i.slice(e.start, e.end + 1);
                          let S, k;
                          t.forEachGlyph(x, v, m, (t, r, s, l) => {
                            (r += N), (l += e.start), (S = r), (k = t);
                            const u = i.charAt(l),
                              h = t.advanceWidth * g,
                              d = q.count;
                            let y;
                            if (
                              ('isEmpty' in t ||
                                ((t.isWhitespace = !!u && new RegExp(a).test(u)),
                                (t.canBreakAfter = !!u && o.test(u)),
                                (t.isEmpty = t.xMin === t.xMax || t.yMin === t.yMax || n.test(u))),
                              t.isWhitespace || t.isEmpty || L++,
                              W && c && !t.isWhitespace && r + h + V > b && d)
                            ) {
                              if (q.glyphAt(d - 1).glyphObj.canBreakAfter) (y = new f()), (V = -r);
                              else
                                for (let e = d; e--; ) {
                                  if (0 === e && 'break-word' === w) {
                                    (y = new f()), (V = -r);
                                    break;
                                  }
                                  if (q.glyphAt(e).glyphObj.canBreakAfter) {
                                    y = q.splitAt(e + 1);
                                    const t = y.glyphAt(0).x;
                                    V -= t;
                                    for (let e = y.count; e--; ) y.glyphAt(e).x -= t;
                                    break;
                                  }
                                }
                              y && ((q.isSoftWrapped = !0), (q = y), X.push(q), (B = b));
                            }
                            let x = q.glyphAt(q.count);
                            (x.glyphObj = t),
                              (x.x = r + V),
                              (x.y = s),
                              (x.width = h),
                              (x.charIndex = l),
                              (x.fontData = p),
                              '\n' === u && ((q = new f()), X.push(q), (V = -(r + h + m * v) + U));
                          }),
                            (N = S + k.advanceWidth * g + m * v);
                        });
                        let H = 0;
                        X.forEach((e) => {
                          let t = !0;
                          for (let r = e.count; r--; ) {
                            const n = e.glyphAt(r);
                            t &&
                              !n.glyphObj.isWhitespace &&
                              ((e.width = n.x + n.width), e.width > B && (B = e.width), (t = !1));
                            let {
                              lineHeight: a,
                              capHeight: o,
                              xHeight: i,
                              baseline: s,
                            } = n.fontData;
                            a > e.lineHeight && (e.lineHeight = a);
                            const l = s - e.baseline;
                            l < 0 && ((e.baseline += l), (e.cap += l), (e.ex += l)),
                              (e.cap = Math.max(e.cap, e.baseline + o)),
                              (e.ex = Math.max(e.ex, e.baseline + i));
                          }
                          (e.baseline -= H), (e.cap -= H), (e.ex -= H), (H += e.lineHeight);
                        });
                        let $ = 0,
                          Y = 0;
                        if (
                          (_ &&
                            ('number' == typeof _
                              ? ($ = -_)
                              : 'string' == typeof _ &&
                                ($ =
                                  -B *
                                  ('left' === _
                                    ? 0
                                    : 'center' === _
                                      ? 0.5
                                      : 'right' === _
                                        ? 1
                                        : s(_)))),
                          T &&
                            ('number' == typeof T
                              ? (Y = -T)
                              : 'string' == typeof T &&
                                (Y =
                                  'top' === T
                                    ? 0
                                    : 'top-baseline' === T
                                      ? -X[0].baseline
                                      : 'top-cap' === T
                                        ? -X[0].cap
                                        : 'top-ex' === T
                                          ? -X[0].ex
                                          : 'middle' === T
                                            ? H / 2
                                            : 'bottom' === T
                                              ? H
                                              : 'bottom-baseline' === T
                                                ? -X[X.length - 1].baseline
                                                : s(T) * H)),
                          !F)
                        ) {
                          const e = t.getEmbeddingLevels(i, x);
                          (h = new Uint16Array(L)),
                            (d = new Uint8Array(L)),
                            (p = new Float32Array(2 * L)),
                            (g = {}),
                            (O = [r, r, -1 / 0, -1 / 0]),
                            (P = []),
                            A && (D = new Float32Array(4 * i.length)),
                            I && (C = new Uint8Array(3 * L));
                          let n,
                            a,
                            o = 0,
                            s = -1,
                            u = -1;
                          if (
                            (X.forEach((f, c) => {
                              let { count: v, width: m } = f;
                              if (v > 0) {
                                let c = 0;
                                for (let e = v; e-- && f.glyphAt(e).glyphObj.isWhitespace; ) c++;
                                let y = 0,
                                  b = 0;
                                if ('center' === S) y = (B - m) / 2;
                                else if ('right' === S) y = B - m;
                                else if ('justify' === S && f.isSoftWrapped) {
                                  let e = 0;
                                  for (let t = v - c; t--; )
                                    f.glyphAt(t).glyphObj.isWhitespace && e++;
                                  b = (B - m) / e;
                                }
                                if (b || y) {
                                  let e = 0;
                                  for (let t = 0; t < v; t++) {
                                    let r = f.glyphAt(t);
                                    const n = r.glyphObj;
                                    (r.x += y + e),
                                      0 !== b &&
                                        n.isWhitespace &&
                                        t < v - c &&
                                        ((e += b), (r.width += b));
                                  }
                                }
                                const x = t.getReorderSegments(
                                  i,
                                  e,
                                  f.glyphAt(0).charIndex,
                                  f.glyphAt(f.count - 1).charIndex,
                                );
                                for (let e = 0; e < x.length; e++) {
                                  const [t, r] = x[e];
                                  let n = 1 / 0,
                                    a = -1 / 0;
                                  for (let e = 0; e < v; e++)
                                    if (f.glyphAt(e).charIndex >= t) {
                                      let t = e,
                                        o = e;
                                      for (; o < v; o++) {
                                        let e = f.glyphAt(o);
                                        if (e.charIndex > r) break;
                                        o < v - c &&
                                          ((n = Math.min(n, e.x)),
                                          (a = Math.max(a, e.x + e.width)));
                                      }
                                      for (let e = t; e < o; e++) {
                                        const t = f.glyphAt(e);
                                        t.x = a - (t.x + t.width - n);
                                      }
                                      break;
                                    }
                                }
                                let U;
                                const k = (e) => (U = e);
                                for (let c = 0; c < v; c++) {
                                  const v = f.glyphAt(c);
                                  U = v.glyphObj;
                                  const m = U.index,
                                    y = 1 & e.levels[v.charIndex];
                                  if (y) {
                                    const e = t.getMirroredCharacter(i[v.charIndex]);
                                    e && v.fontData.fontObj.forEachGlyph(e, 0, 0, k);
                                  }
                                  if (A) {
                                    const { charIndex: e, fontData: t } = v,
                                      r = v.x + $,
                                      n = v.x + v.width + $;
                                    (D[4 * e] = y ? n : r),
                                      (D[4 * e + 1] = y ? r : n),
                                      (D[4 * e + 2] = f.baseline + t.caretBottom + Y),
                                      (D[4 * e + 3] = f.baseline + t.caretTop + Y);
                                    const a = e - s;
                                    a > 1 && l(D, s, a), (s = e);
                                  }
                                  if (I) {
                                    const { charIndex: e } = v;
                                    for (; e > u; ) u++, I.hasOwnProperty(u) && (a = I[u]);
                                  }
                                  if (!U.isWhitespace && !U.isEmpty) {
                                    const e = o++,
                                      { fontSizeMult: t, src: i, index: s } = v.fontData,
                                      l = g[i] || (g[i] = {});
                                    l[m] ||
                                      (l[m] = {
                                        path: U.path,
                                        pathBounds: [U.xMin, U.yMin, U.xMax, U.yMax],
                                      });
                                    const u = v.x + $,
                                      c = v.y + f.baseline + Y;
                                    (p[2 * e] = u), (p[2 * e + 1] = c);
                                    const y = u + U.xMin * t,
                                      b = c + U.yMin * t,
                                      x = u + U.xMax * t,
                                      S = c + U.yMax * t;
                                    y < O[0] && (O[0] = y),
                                      b < O[1] && (O[1] = b),
                                      x > O[2] && (O[2] = x),
                                      S > O[3] && (O[3] = S),
                                      e % M == 0 &&
                                        ((n = { start: e, end: e, rect: [r, r, -1 / 0, -1 / 0] }),
                                        P.push(n)),
                                      n.end++;
                                    const k = n.rect;
                                    if (
                                      (y < k[0] && (k[0] = y),
                                      b < k[1] && (k[1] = b),
                                      x > k[2] && (k[2] = x),
                                      S > k[3] && (k[3] = S),
                                      (h[e] = m),
                                      (d[e] = s),
                                      I)
                                    ) {
                                      const t = 3 * e;
                                      (C[t] = (a >> 16) & 255),
                                        (C[t + 1] = (a >> 8) & 255),
                                        (C[t + 2] = 255 & a);
                                    }
                                  }
                                }
                              }
                            }),
                            D)
                          ) {
                            const e = i.length - s;
                            e > 1 && l(D, s, e);
                          }
                        }
                        const K = [];
                        z.forEach(
                          ({
                            index: e,
                            src: t,
                            unitsPerEm: r,
                            ascender: n,
                            descender: a,
                            lineHeight: o,
                            capHeight: i,
                            xHeight: s,
                          }) => {
                            K[e] = {
                              src: t,
                              unitsPerEm: r,
                              ascender: n,
                              descender: a,
                              lineHeight: o,
                              capHeight: i,
                              xHeight: s,
                            };
                          },
                        ),
                          (G.typesetting = u() - j),
                          E({
                            glyphIds: h,
                            glyphFontIndices: d,
                            glyphPositions: p,
                            glyphData: g,
                            fontData: K,
                            caretPositions: D,
                            glyphColors: C,
                            chunkedBounds: P,
                            fontSize: v,
                            topBaseline: Y + X[0].baseline,
                            blockBounds: [$, Y - H, $ + B, Y],
                            visibleBounds: O,
                            timings: G,
                          });
                      },
                    );
                }
                function s(e) {
                  let t = e.match(/^([\d.]+)%$/),
                    r = t ? parseFloat(t[1]) : NaN;
                  return isNaN(r) ? 0 : r / 100;
                }
                function l(e, t, r) {
                  const n = e[4 * t],
                    a = e[4 * t + 1],
                    o = e[4 * t + 2],
                    i = e[4 * t + 3],
                    s = (a - n) / r;
                  for (let a = 0; a < r; a++) {
                    const r = 4 * (t + a);
                    (e[r] = n + s * a),
                      (e[r + 1] = n + s * (a + 1)),
                      (e[r + 2] = o),
                      (e[r + 3] = i);
                  }
                }
                function u() {
                  return (self.performance || Date).now();
                }
                function f() {
                  this.data = [];
                }
                const c = ['glyphObj', 'x', 'y', 'width', 'charIndex', 'fontData'];
                return (
                  (f.prototype = {
                    width: 0,
                    lineHeight: 0,
                    baseline: 0,
                    cap: 0,
                    ex: 0,
                    isSoftWrapped: !1,
                    get count() {
                      return Math.ceil(this.data.length / c.length);
                    },
                    glyphAt(e) {
                      let t = f.flyweight;
                      return (t.data = this.data), (t.index = e), t;
                    },
                    splitAt(e) {
                      let t = new f();
                      return (t.data = this.data.splice(e * c.length)), t;
                    },
                  }),
                  (f.flyweight = c.reduce(
                    (e, t, r, n) => (
                      Object.defineProperty(e, t, {
                        get() {
                          return this.data[this.index * c.length + r];
                        },
                        set(e) {
                          this.data[this.index * c.length + r] = e;
                        },
                      }),
                      e
                    ),
                    { data: null, index: 0 },
                  )),
                  {
                    typeset: i,
                    measure: function (e, t) {
                      i({ ...e, metricsOnly: !0 }, (e) => {
                        const [r, n, a, o] = e.blockBounds;
                        t({ width: a - r, height: o - n });
                      });
                    },
                  }
                );
              },
              A,
              g,
            ],
            init: (e, t, r) => e(t, r()),
          }),
        ],
        init: (e) =>
          function (t) {
            return new Promise((r) => {
              e.typeset(t, r);
            });
          },
        getTransferables(e) {
          const t = [];
          for (let r in e) e[r] && e[r].buffer && t.push(e[r].buffer);
          return t;
        },
      });
      const re = {};
      const ne = 'aTroikaGlyphBounds',
        ae = 'aTroikaGlyphIndex';
      class oe extends n.InstancedBufferGeometry {
        constructor() {
          super(),
            (this.detail = 1),
            (this.curveRadius = 0),
            (this.groups = [
              { start: 0, count: 1 / 0, materialIndex: 0 },
              { start: 0, count: 1 / 0, materialIndex: 1 },
            ]),
            (this.boundingSphere = new n.Sphere()),
            (this.boundingBox = new n.Box3());
        }
        computeBoundingSphere() {}
        computeBoundingBox() {}
        set detail(e) {
          if (e !== this._detail) {
            (this._detail = e), ('number' != typeof e || e < 1) && (e = 1);
            let t = (function (e) {
              let t = re[e];
              return t || (t = re[e] = new n.PlaneGeometry(1, 1, e, e).translate(0.5, 0.5, 0)), t;
            })(e);
            ['position', 'normal', 'uv'].forEach((e) => {
              this.attributes[e] = t.attributes[e].clone();
            }),
              this.setIndex(t.getIndex().clone());
          }
        }
        get detail() {
          return this._detail;
        }
        set curveRadius(e) {
          e !== this._curveRadius && ((this._curveRadius = e), this._updateBounds());
        }
        get curveRadius() {
          return this._curveRadius;
        }
        updateGlyphs(e, t, r, n, a) {
          this.updateAttributeData(ne, e, 4),
            this.updateAttributeData(ae, t, 1),
            this.updateAttributeData('aTroikaGlyphColor', a, 3),
            (this._blockBounds = r),
            (this._chunkedBounds = n),
            (this.instanceCount = t.length),
            this._updateBounds();
        }
        _updateBounds() {
          const e = this._blockBounds;
          if (e) {
            const { curveRadius: t, boundingBox: r } = this;
            if (t) {
              const { PI: n, floor: a, min: o, max: i, sin: s, cos: l } = Math,
                u = n / 2,
                f = 2 * n,
                c = Math.abs(t),
                h = e[0] / c,
                d = e[2] / c,
                v = a((h + u) / f) !== a((d + u) / f) ? -c : o(s(h) * c, s(d) * c),
                p = a((h - u) / f) !== a((d - u) / f) ? c : i(s(h) * c, s(d) * c),
                g = a((h + n) / f) !== a((d + n) / f) ? 2 * c : i(c - l(h) * c, c - l(d) * c);
              r.min.set(v, e[1], t < 0 ? -g : 0), r.max.set(p, e[3], t < 0 ? 0 : g);
            } else r.min.set(e[0], e[1], 0), r.max.set(e[2], e[3], 0);
            r.getBoundingSphere(this.boundingSphere);
          }
        }
        applyClipRect(e) {
          let t = this.getAttribute(ae).count,
            r = this._chunkedBounds;
          if (r)
            for (let n = r.length; n--; ) {
              t = r[n].end;
              let a = r[n].rect;
              if (a[1] < e.w && a[3] > e.y && a[0] < e.z && a[2] > e.x) break;
            }
          this.instanceCount = t;
        }
        updateAttributeData(e, t, r) {
          const a = this.getAttribute(e);
          t
            ? a && a.array.length === t.length
              ? (a.array.set(t), (a.needsUpdate = !0))
              : (this.setAttribute(e, new n.InstancedBufferAttribute(t, r)),
                delete this._maxInstanceCount,
                this.dispose())
            : a && this.deleteAttribute(e);
        }
      }
      function ie(e) {
        const t = _(e, {
          chained: !0,
          extensions: { derivatives: !0 },
          uniforms: {
            uTroikaSDFTexture: { value: null },
            uTroikaSDFTextureSize: { value: new n.Vector2() },
            uTroikaSDFGlyphSize: { value: 0 },
            uTroikaSDFExponent: { value: 0 },
            uTroikaTotalBounds: { value: new n.Vector4(0, 0, 0, 0) },
            uTroikaClipRect: { value: new n.Vector4(0, 0, 0, 0) },
            uTroikaDistanceOffset: { value: 0 },
            uTroikaOutlineOpacity: { value: 0 },
            uTroikaFillOpacity: { value: 1 },
            uTroikaPositionOffset: { value: new n.Vector2() },
            uTroikaCurveRadius: { value: 0 },
            uTroikaBlurRadius: { value: 0 },
            uTroikaStrokeWidth: { value: 0 },
            uTroikaStrokeColor: { value: new n.Color() },
            uTroikaStrokeOpacity: { value: 1 },
            uTroikaOrient: { value: new n.Matrix3() },
            uTroikaUseGlyphColors: { value: !0 },
            uTroikaSDFDebug: { value: !1 },
          },
          vertexDefs:
            '\nuniform vec2 uTroikaSDFTextureSize;\nuniform float uTroikaSDFGlyphSize;\nuniform vec4 uTroikaTotalBounds;\nuniform vec4 uTroikaClipRect;\nuniform mat3 uTroikaOrient;\nuniform bool uTroikaUseGlyphColors;\nuniform float uTroikaDistanceOffset;\nuniform float uTroikaBlurRadius;\nuniform vec2 uTroikaPositionOffset;\nuniform float uTroikaCurveRadius;\nattribute vec4 aTroikaGlyphBounds;\nattribute float aTroikaGlyphIndex;\nattribute vec3 aTroikaGlyphColor;\nvarying vec2 vTroikaGlyphUV;\nvarying vec4 vTroikaTextureUVBounds;\nvarying float vTroikaTextureChannel;\nvarying vec3 vTroikaGlyphColor;\nvarying vec2 vTroikaGlyphDimensions;\n',
          vertexTransform:
            '\nvec4 bounds = aTroikaGlyphBounds;\nbounds.xz += uTroikaPositionOffset.x;\nbounds.yw -= uTroikaPositionOffset.y;\n\nvec4 outlineBounds = vec4(\n  bounds.xy - uTroikaDistanceOffset - uTroikaBlurRadius,\n  bounds.zw + uTroikaDistanceOffset + uTroikaBlurRadius\n);\nvec4 clippedBounds = vec4(\n  clamp(outlineBounds.xy, uTroikaClipRect.xy, uTroikaClipRect.zw),\n  clamp(outlineBounds.zw, uTroikaClipRect.xy, uTroikaClipRect.zw)\n);\n\nvec2 clippedXY = (mix(clippedBounds.xy, clippedBounds.zw, position.xy) - bounds.xy) / (bounds.zw - bounds.xy);\n\nposition.xy = mix(bounds.xy, bounds.zw, clippedXY);\n\nuv = (position.xy - uTroikaTotalBounds.xy) / (uTroikaTotalBounds.zw - uTroikaTotalBounds.xy);\n\nfloat rad = uTroikaCurveRadius;\nif (rad != 0.0) {\n  float angle = position.x / rad;\n  position.xz = vec2(sin(angle) * rad, rad - cos(angle) * rad);\n  normal.xz = vec2(sin(angle), cos(angle));\n}\n  \nposition = uTroikaOrient * position;\nnormal = uTroikaOrient * normal;\n\nvTroikaGlyphUV = clippedXY.xy;\nvTroikaGlyphDimensions = vec2(bounds[2] - bounds[0], bounds[3] - bounds[1]);\n\n\nfloat txCols = uTroikaSDFTextureSize.x / uTroikaSDFGlyphSize;\nvec2 txUvPerSquare = uTroikaSDFGlyphSize / uTroikaSDFTextureSize;\nvec2 txStartUV = txUvPerSquare * vec2(\n  mod(floor(aTroikaGlyphIndex / 4.0), txCols),\n  floor(floor(aTroikaGlyphIndex / 4.0) / txCols)\n);\nvTroikaTextureUVBounds = vec4(txStartUV, vec2(txStartUV) + txUvPerSquare);\nvTroikaTextureChannel = mod(aTroikaGlyphIndex, 4.0);\n',
          fragmentDefs:
            "\nuniform sampler2D uTroikaSDFTexture;\nuniform vec2 uTroikaSDFTextureSize;\nuniform float uTroikaSDFGlyphSize;\nuniform float uTroikaSDFExponent;\nuniform float uTroikaDistanceOffset;\nuniform float uTroikaFillOpacity;\nuniform float uTroikaOutlineOpacity;\nuniform float uTroikaBlurRadius;\nuniform vec3 uTroikaStrokeColor;\nuniform float uTroikaStrokeWidth;\nuniform float uTroikaStrokeOpacity;\nuniform bool uTroikaSDFDebug;\nvarying vec2 vTroikaGlyphUV;\nvarying vec4 vTroikaTextureUVBounds;\nvarying float vTroikaTextureChannel;\nvarying vec2 vTroikaGlyphDimensions;\n\nfloat troikaSdfValueToSignedDistance(float alpha) {\n  // Inverse of exponential encoding in webgl-sdf-generator\n  \n  float maxDimension = max(vTroikaGlyphDimensions.x, vTroikaGlyphDimensions.y);\n  float absDist = (1.0 - pow(2.0 * (alpha > 0.5 ? 1.0 - alpha : alpha), 1.0 / uTroikaSDFExponent)) * maxDimension;\n  float signedDist = absDist * (alpha > 0.5 ? -1.0 : 1.0);\n  return signedDist;\n}\n\nfloat troikaGlyphUvToSdfValue(vec2 glyphUV) {\n  vec2 textureUV = mix(vTroikaTextureUVBounds.xy, vTroikaTextureUVBounds.zw, glyphUV);\n  vec4 rgba = texture2D(uTroikaSDFTexture, textureUV);\n  float ch = floor(vTroikaTextureChannel + 0.5); //NOTE: can't use round() in WebGL1\n  return ch == 0.0 ? rgba.r : ch == 1.0 ? rgba.g : ch == 2.0 ? rgba.b : rgba.a;\n}\n\nfloat troikaGlyphUvToDistance(vec2 uv) {\n  return troikaSdfValueToSignedDistance(troikaGlyphUvToSdfValue(uv));\n}\n\nfloat troikaGetAADist() {\n  \n  #if defined(GL_OES_standard_derivatives) || __VERSION__ >= 300\n  return length(fwidth(vTroikaGlyphUV * vTroikaGlyphDimensions)) * 0.5;\n  #else\n  return vTroikaGlyphDimensions.x / 64.0;\n  #endif\n}\n\nfloat troikaGetFragDistValue() {\n  vec2 clampedGlyphUV = clamp(vTroikaGlyphUV, 0.5 / uTroikaSDFGlyphSize, 1.0 - 0.5 / uTroikaSDFGlyphSize);\n  float distance = troikaGlyphUvToDistance(clampedGlyphUV);\n \n  // Extrapolate distance when outside bounds:\n  distance += clampedGlyphUV == vTroikaGlyphUV ? 0.0 : \n    length((vTroikaGlyphUV - clampedGlyphUV) * vTroikaGlyphDimensions);\n\n  \n\n  return distance;\n}\n\nfloat troikaGetEdgeAlpha(float distance, float distanceOffset, float aaDist) {\n  #if defined(IS_DEPTH_MATERIAL) || defined(IS_DISTANCE_MATERIAL)\n  float alpha = step(-distanceOffset, -distance);\n  #else\n\n  float alpha = smoothstep(\n    distanceOffset + aaDist,\n    distanceOffset - aaDist,\n    distance\n  );\n  #endif\n\n  return alpha;\n}\n",
          fragmentColorTransform:
            '\nfloat aaDist = troikaGetAADist();\nfloat fragDistance = troikaGetFragDistValue();\nfloat edgeAlpha = uTroikaSDFDebug ?\n  troikaGlyphUvToSdfValue(vTroikaGlyphUV) :\n  troikaGetEdgeAlpha(fragDistance, uTroikaDistanceOffset, max(aaDist, uTroikaBlurRadius));\n\n#if !defined(IS_DEPTH_MATERIAL) && !defined(IS_DISTANCE_MATERIAL)\nvec4 fillRGBA = gl_FragColor;\nfillRGBA.a *= uTroikaFillOpacity;\nvec4 strokeRGBA = uTroikaStrokeWidth == 0.0 ? fillRGBA : vec4(uTroikaStrokeColor, uTroikaStrokeOpacity);\nif (fillRGBA.a == 0.0) fillRGBA.rgb = strokeRGBA.rgb;\ngl_FragColor = mix(fillRGBA, strokeRGBA, smoothstep(\n  -uTroikaStrokeWidth - aaDist,\n  -uTroikaStrokeWidth + aaDist,\n  fragDistance\n));\ngl_FragColor.a *= edgeAlpha;\n#endif\n\nif (edgeAlpha == 0.0) {\n  discard;\n}\n',
          customRewriter({ vertexShader: e, fragmentShader: t }) {
            let r = /\buniform\s+vec3\s+diffuse\b/;
            return (
              r.test(t) &&
                ((t = t
                  .replace(r, 'varying vec3 vTroikaGlyphColor')
                  .replace(/\bdiffuse\b/g, 'vTroikaGlyphColor')),
                r.test(e) ||
                  (e = e.replace(
                    m,
                    'uniform vec3 diffuse;\n$&\nvTroikaGlyphColor = uTroikaUseGlyphColors ? aTroikaGlyphColor / 255.0 : diffuse;\n',
                  ))),
              { vertexShader: e, fragmentShader: t }
            );
          },
        });
        return (
          (t.transparent = !0),
          (t.forceSinglePass = !0),
          Object.defineProperties(t, {
            isTroikaTextMaterial: { value: !0 },
            shadowSide: {
              get() {
                return this.side;
              },
              set() {},
            },
          }),
          t
        );
      }
      const se = new n.MeshBasicMaterial({ color: 16777215, side: n.DoubleSide, transparent: !0 }),
        le = 8421504,
        ue = new n.Matrix4(),
        fe = new n.Vector3(),
        ce = new n.Vector3(),
        he = [],
        de = new n.Vector3(),
        ve = '+x+y';
      function pe(e) {
        return Array.isArray(e) ? e[0] : e;
      }
      let ge = () => {
          const e = new n.Mesh(new n.PlaneGeometry(1, 1), se);
          return (ge = () => e), e;
        },
        me = () => {
          const e = new n.Mesh(new n.PlaneGeometry(1, 1, 32, 1), se);
          return (me = () => e), e;
        };
      const ye = { type: 'syncstart' },
        be = { type: 'synccomplete' },
        xe = [
          'font',
          'fontSize',
          'fontStyle',
          'fontWeight',
          'lang',
          'letterSpacing',
          'lineHeight',
          'maxWidth',
          'overflowWrap',
          'text',
          'direction',
          'textAlign',
          'textIndent',
          'whiteSpace',
          'anchorX',
          'anchorY',
          'colorRanges',
          'sdfGlyphSize',
        ],
        Se = xe.concat(
          'material',
          'color',
          'depthOffset',
          'clipRect',
          'curveRadius',
          'orientation',
          'glyphGeometryDetail',
        );
      class Ue extends n.Mesh {
        constructor() {
          super(new oe(), null),
            (this.text = ''),
            (this.anchorX = 0),
            (this.anchorY = 0),
            (this.curveRadius = 0),
            (this.direction = 'auto'),
            (this.font = null),
            (this.unicodeFontsURL = null),
            (this.fontSize = 0.1),
            (this.fontWeight = 'normal'),
            (this.fontStyle = 'normal'),
            (this.lang = null),
            (this.letterSpacing = 0),
            (this.lineHeight = 'normal'),
            (this.maxWidth = 1 / 0),
            (this.overflowWrap = 'normal'),
            (this.textAlign = 'left'),
            (this.textIndent = 0),
            (this.whiteSpace = 'normal'),
            (this.material = null),
            (this.color = null),
            (this.colorRanges = null),
            (this.outlineWidth = 0),
            (this.outlineColor = 0),
            (this.outlineOpacity = 1),
            (this.outlineBlur = 0),
            (this.outlineOffsetX = 0),
            (this.outlineOffsetY = 0),
            (this.strokeWidth = 0),
            (this.strokeColor = le),
            (this.strokeOpacity = 1),
            (this.fillOpacity = 1),
            (this.depthOffset = 0),
            (this.clipRect = null),
            (this.orientation = ve),
            (this.glyphGeometryDetail = 1),
            (this.sdfGlyphSize = null),
            (this.gpuAccelerateSDF = !0),
            (this.debugSDF = !1);
        }
        sync(e) {
          this._needsSync &&
            ((this._needsSync = !1),
            this._isSyncing
              ? (this._queuedSyncs || (this._queuedSyncs = [])).push(e)
              : ((this._isSyncing = !0),
                this.dispatchEvent(ye),
                $(
                  {
                    text: this.text,
                    font: this.font,
                    lang: this.lang,
                    fontSize: this.fontSize || 0.1,
                    fontWeight: this.fontWeight || 'normal',
                    fontStyle: this.fontStyle || 'normal',
                    letterSpacing: this.letterSpacing || 0,
                    lineHeight: this.lineHeight || 'normal',
                    maxWidth: this.maxWidth,
                    direction: this.direction || 'auto',
                    textAlign: this.textAlign,
                    textIndent: this.textIndent,
                    whiteSpace: this.whiteSpace,
                    overflowWrap: this.overflowWrap,
                    anchorX: this.anchorX,
                    anchorY: this.anchorY,
                    colorRanges: this.colorRanges,
                    includeCaretPositions: !0,
                    sdfGlyphSize: this.sdfGlyphSize,
                    gpuAccelerateSDF: this.gpuAccelerateSDF,
                    unicodeFontsURL: this.unicodeFontsURL,
                  },
                  (t) => {
                    (this._isSyncing = !1),
                      (this._textRenderInfo = t),
                      this.geometry.updateGlyphs(
                        t.glyphBounds,
                        t.glyphAtlasIndices,
                        t.blockBounds,
                        t.chunkedBounds,
                        t.glyphColors,
                      );
                    const r = this._queuedSyncs;
                    r &&
                      ((this._queuedSyncs = null),
                      (this._needsSync = !0),
                      this.sync(() => {
                        r.forEach((e) => e && e());
                      })),
                      this.dispatchEvent(be),
                      e && e();
                  },
                )));
        }
        onBeforeRender(e, t, r, n, a, o) {
          this.sync(), a.isTroikaTextMaterial && this._prepareForRender(a);
        }
        dispose() {
          this.geometry.dispose();
        }
        get textRenderInfo() {
          return this._textRenderInfo || null;
        }
        createDerivedMaterial(e) {
          return ie(e);
        }
        get material() {
          let e = this._derivedMaterial;
          const t =
            this._baseMaterial || this._defaultMaterial || (this._defaultMaterial = se.clone());
          if (
            ((e && e.isDerivedFrom(t)) ||
              ((e = this._derivedMaterial = this.createDerivedMaterial(t)),
              t.addEventListener('dispose', function r() {
                t.removeEventListener('dispose', r), e.dispose();
              })),
            this.outlineWidth || this.outlineBlur || this.outlineOffsetX || this.outlineOffsetY)
          ) {
            let t = e._outlineMtl;
            return (
              t ||
                ((t = e._outlineMtl = Object.create(e, { id: { value: e.id + 0.1 } })),
                (t.isTextOutlineMaterial = !0),
                (t.depthWrite = !1),
                (t.map = null),
                e.addEventListener('dispose', function r() {
                  e.removeEventListener('dispose', r), t.dispose();
                })),
              [t, e]
            );
          }
          return e;
        }
        set material(e) {
          e && e.isTroikaTextMaterial
            ? ((this._derivedMaterial = e), (this._baseMaterial = e.baseMaterial))
            : (this._baseMaterial = e);
        }
        get glyphGeometryDetail() {
          return this.geometry.detail;
        }
        set glyphGeometryDetail(e) {
          this.geometry.detail = e;
        }
        get curveRadius() {
          return this.geometry.curveRadius;
        }
        set curveRadius(e) {
          this.geometry.curveRadius = e;
        }
        get customDepthMaterial() {
          return pe(this.material).getDepthMaterial();
        }
        get customDistanceMaterial() {
          return pe(this.material).getDistanceMaterial();
        }
        _prepareForRender(e) {
          const t = e.isTextOutlineMaterial,
            r = e.uniforms,
            a = this.textRenderInfo;
          if (a) {
            const { sdfTexture: e, blockBounds: n } = a;
            (r.uTroikaSDFTexture.value = e),
              r.uTroikaSDFTextureSize.value.set(e.image.width, e.image.height),
              (r.uTroikaSDFGlyphSize.value = a.sdfGlyphSize),
              (r.uTroikaSDFExponent.value = a.sdfExponent),
              r.uTroikaTotalBounds.value.fromArray(n),
              (r.uTroikaUseGlyphColors.value = !t && !!a.glyphColors);
            let o,
              i,
              s,
              l = 0,
              u = 0,
              f = 0,
              c = 0,
              h = 0;
            if (t) {
              let {
                outlineWidth: e,
                outlineOffsetX: t,
                outlineOffsetY: r,
                outlineBlur: n,
                outlineOpacity: a,
              } = this;
              (l = this._parsePercent(e) || 0),
                (u = Math.max(0, this._parsePercent(n) || 0)),
                (o = a),
                (c = this._parsePercent(t) || 0),
                (h = this._parsePercent(r) || 0);
            } else
              (f = Math.max(0, this._parsePercent(this.strokeWidth) || 0)),
                f &&
                  ((s = this.strokeColor),
                  r.uTroikaStrokeColor.value.set(null == s ? le : s),
                  (i = this.strokeOpacity),
                  null == i && (i = 1)),
                (o = this.fillOpacity);
            (r.uTroikaDistanceOffset.value = l),
              r.uTroikaPositionOffset.value.set(c, h),
              (r.uTroikaBlurRadius.value = u),
              (r.uTroikaStrokeWidth.value = f),
              (r.uTroikaStrokeOpacity.value = i),
              (r.uTroikaFillOpacity.value = null == o ? 1 : o),
              (r.uTroikaCurveRadius.value = this.curveRadius || 0);
            let d = this.clipRect;
            if (d && Array.isArray(d) && 4 === d.length) r.uTroikaClipRect.value.fromArray(d);
            else {
              const e = 100 * (this.fontSize || 0.1);
              r.uTroikaClipRect.value.set(n[0] - e, n[1] - e, n[2] + e, n[3] + e);
            }
            this.geometry.applyClipRect(r.uTroikaClipRect.value);
          }
          (r.uTroikaSDFDebug.value = !!this.debugSDF),
            (e.polygonOffset = !!this.depthOffset),
            (e.polygonOffsetFactor = e.polygonOffsetUnits = this.depthOffset || 0);
          const o = t ? this.outlineColor || 0 : this.color;
          if (null == o) delete e.color;
          else {
            const t = e.hasOwnProperty('color') ? e.color : (e.color = new n.Color());
            (o === t._input && 'object' != typeof o) || t.set((t._input = o));
          }
          let i = this.orientation || ve;
          if (i !== e._orientation) {
            let t = r.uTroikaOrient.value;
            i = i.replace(/[^-+xyz]/g, '');
            let n = i !== ve && i.match(/^([-+])([xyz])([-+])([xyz])$/);
            if (n) {
              let [, e, r, a, o] = n;
              (fe.set(0, 0, 0)[r] = '-' === e ? 1 : -1),
                (ce.set(0, 0, 0)[o] = '-' === a ? -1 : 1),
                ue.lookAt(de, fe.cross(ce), ce),
                t.setFromMatrix4(ue);
            } else t.identity();
            e._orientation = i;
          }
        }
        _parsePercent(e) {
          if ('string' == typeof e) {
            let t = e.match(/^(-?[\d.]+)%$/),
              r = t ? parseFloat(t[1]) : NaN;
            e = (isNaN(r) ? 0 : r / 100) * this.fontSize;
          }
          return e;
        }
        localPositionToTextCoords(e, t = new n.Vector2()) {
          t.copy(e);
          const r = this.curveRadius;
          return r && (t.x = Math.atan2(e.x, Math.abs(r) - Math.abs(e.z)) * Math.abs(r)), t;
        }
        worldPositionToTextCoords(e, t = new n.Vector2()) {
          return fe.copy(e), this.localPositionToTextCoords(this.worldToLocal(fe), t);
        }
        raycast(e, t) {
          const { textRenderInfo: r, curveRadius: n } = this;
          if (r) {
            const a = r.blockBounds,
              o = n ? me() : ge(),
              i = o.geometry,
              { position: s, uv: l } = i.attributes;
            for (let e = 0; e < l.count; e++) {
              let t = a[0] + l.getX(e) * (a[2] - a[0]);
              const r = a[1] + l.getY(e) * (a[3] - a[1]);
              let o = 0;
              n && ((o = n - Math.cos(t / n) * n), (t = Math.sin(t / n) * n)), s.setXYZ(e, t, r, o);
            }
            (i.boundingSphere = this.geometry.boundingSphere),
              (i.boundingBox = this.geometry.boundingBox),
              (o.matrixWorld = this.matrixWorld),
              (o.material.side = this.material.side),
              (he.length = 0),
              o.raycast(e, he);
            for (let e = 0; e < he.length; e++) (he[e].object = this), t.push(he[e]);
          }
        }
        copy(e) {
          const t = this.geometry;
          return (
            super.copy(e),
            (this.geometry = t),
            Se.forEach((t) => {
              this[t] = e[t];
            }),
            this
          );
        }
        clone() {
          return new this.constructor().copy(this);
        }
      }
      xe.forEach((e) => {
        const t = '_private_' + e;
        Object.defineProperty(Ue.prototype, e, {
          get() {
            return this[t];
          },
          set(e) {
            e !== this[t] && ((this[t] = e), (this._needsSync = !0));
          },
        });
      });
      let ke = 17;
      ke = 4 * Math.ceil(ke / 4);
      new n.Box3(), new n.Color();
      new WeakMap();
      new WeakMap();
    },
  },
]);
