/*! For license information please see browser-check.js.LICENSE.txt */
var mpBrowserCheck;
(function () {
  var __webpack_modules__ = {
      702: function (e, t, n) {
        e.exports = (function () {
          'use strict';
          function e(e) {
            var t = typeof e;
            return null !== e && ('object' === t || 'function' === t);
          }
          function t(e) {
            return 'function' == typeof e;
          }
          var r = Array.isArray
              ? Array.isArray
              : function (e) {
                  return '[object Array]' === Object.prototype.toString.call(e);
                },
            o = 0,
            i = void 0,
            s = void 0,
            a = function (e, t) {
              (g[o] = e), (g[o + 1] = t), 2 === (o += 2) && (s ? s(y) : E());
            };
          function u(e) {
            s = e;
          }
          function c(e) {
            a = e;
          }
          var l = 'undefined' != typeof window ? window : void 0,
            h = l || {},
            p = h.MutationObserver || h.WebKitMutationObserver,
            d =
              'undefined' == typeof self &&
              'undefined' != typeof process &&
              '[object process]' === {}.toString.call(process),
            f =
              'undefined' != typeof Uint8ClampedArray &&
              'undefined' != typeof importScripts &&
              'undefined' != typeof MessageChannel;
          function w() {
            return function () {
              return process.nextTick(y);
            };
          }
          function m() {
            return void 0 !== i
              ? function () {
                  i(y);
                }
              : b();
          }
          function _() {
            var e = 0,
              t = new p(y),
              n = document.createTextNode('');
            return (
              t.observe(n, { characterData: !0 }),
              function () {
                n.data = e = ++e % 2;
              }
            );
          }
          function v() {
            var e = new MessageChannel();
            return (
              (e.port1.onmessage = y),
              function () {
                return e.port2.postMessage(0);
              }
            );
          }
          function b() {
            var e = setTimeout;
            return function () {
              return e(y, 1);
            };
          }
          var g = new Array(1e3);
          function y() {
            for (var e = 0; e < o; e += 2)
              (0, g[e])(g[e + 1]), (g[e] = void 0), (g[e + 1] = void 0);
            o = 0;
          }
          function x() {
            try {
              var e = Function('return this')().require('vertx');
              return (i = e.runOnLoop || e.runOnContext), m();
            } catch (e) {
              return b();
            }
          }
          var E = void 0;
          function k(e, t) {
            var n = this,
              r = new this.constructor(R);
            void 0 === r[A] && $(r);
            var o = n._state;
            if (o) {
              var i = arguments[o - 1];
              a(function () {
                return F(o, r, i, n._result);
              });
            } else z(n, r, e, t);
            return r;
          }
          function O(e) {
            var t = this;
            if (e && 'object' == typeof e && e.constructor === t) return e;
            var n = new t(R);
            return M(n, e), n;
          }
          E = d ? w() : p ? _() : f ? v() : void 0 === l ? x() : b();
          var A = Math.random().toString(36).substring(2);
          function R() {}
          var S = void 0,
            T = 1,
            P = 2;
          function q() {
            return new TypeError('You cannot resolve a promise with itself');
          }
          function j() {
            return new TypeError('A promises callback cannot return that same promise.');
          }
          function N(e, t, n, r) {
            try {
              e.call(t, n, r);
            } catch (e) {
              return e;
            }
          }
          function D(e, t, n) {
            a(function (e) {
              var r = !1,
                o = N(
                  n,
                  t,
                  function (n) {
                    r || ((r = !0), t !== n ? M(e, n) : U(e, n));
                  },
                  function (t) {
                    r || ((r = !0), B(e, t));
                  },
                  'Settle: ' + (e._label || ' unknown promise'),
                );
              !r && o && ((r = !0), B(e, o));
            }, e);
          }
          function I(e, t) {
            t._state === T
              ? U(e, t._result)
              : t._state === P
                ? B(e, t._result)
                : z(
                    t,
                    void 0,
                    function (t) {
                      return M(e, t);
                    },
                    function (t) {
                      return B(e, t);
                    },
                  );
          }
          function C(e, n, r) {
            n.constructor === e.constructor && r === k && n.constructor.resolve === O
              ? I(e, n)
              : void 0 === r
                ? U(e, n)
                : t(r)
                  ? D(e, n, r)
                  : U(e, n);
          }
          function M(t, n) {
            if (t === n) B(t, q());
            else if (e(n)) {
              var r = void 0;
              try {
                r = n.then;
              } catch (e) {
                return void B(t, e);
              }
              C(t, n, r);
            } else U(t, n);
          }
          function L(e) {
            e._onerror && e._onerror(e._result), W(e);
          }
          function U(e, t) {
            e._state === S &&
              ((e._result = t), (e._state = T), 0 !== e._subscribers.length && a(W, e));
          }
          function B(e, t) {
            e._state === S && ((e._state = P), (e._result = t), a(L, e));
          }
          function z(e, t, n, r) {
            var o = e._subscribers,
              i = o.length;
            (e._onerror = null),
              (o[i] = t),
              (o[i + T] = n),
              (o[i + P] = r),
              0 === i && e._state && a(W, e);
          }
          function W(e) {
            var t = e._subscribers,
              n = e._state;
            if (0 !== t.length) {
              for (var r = void 0, o = void 0, i = e._result, s = 0; s < t.length; s += 3)
                (r = t[s]), (o = t[s + n]), r ? F(n, r, o, i) : o(i);
              e._subscribers.length = 0;
            }
          }
          function F(e, n, r, o) {
            var i = t(r),
              s = void 0,
              a = void 0,
              u = !0;
            if (i) {
              try {
                s = r(o);
              } catch (e) {
                (u = !1), (a = e);
              }
              if (n === s) return void B(n, j());
            } else s = o;
            n._state !== S ||
              (i && u ? M(n, s) : !1 === u ? B(n, a) : e === T ? U(n, s) : e === P && B(n, s));
          }
          function G(e, t) {
            try {
              t(
                function (t) {
                  M(e, t);
                },
                function (t) {
                  B(e, t);
                },
              );
            } catch (t) {
              B(e, t);
            }
          }
          var H = 0;
          function K() {
            return H++;
          }
          function $(e) {
            (e[A] = H++), (e._state = void 0), (e._result = void 0), (e._subscribers = []);
          }
          function V() {
            return new Error('Array Methods must be provided an Array');
          }
          var X = (function () {
            function e(e, t) {
              (this._instanceConstructor = e),
                (this.promise = new e(R)),
                this.promise[A] || $(this.promise),
                r(t)
                  ? ((this.length = t.length),
                    (this._remaining = t.length),
                    (this._result = new Array(this.length)),
                    0 === this.length
                      ? U(this.promise, this._result)
                      : ((this.length = this.length || 0),
                        this._enumerate(t),
                        0 === this._remaining && U(this.promise, this._result)))
                  : B(this.promise, V());
            }
            return (
              (e.prototype._enumerate = function (e) {
                for (var t = 0; this._state === S && t < e.length; t++) this._eachEntry(e[t], t);
              }),
              (e.prototype._eachEntry = function (e, t) {
                var n = this._instanceConstructor,
                  r = n.resolve;
                if (r === O) {
                  var o = void 0,
                    i = void 0,
                    s = !1;
                  try {
                    o = e.then;
                  } catch (e) {
                    (s = !0), (i = e);
                  }
                  if (o === k && e._state !== S) this._settledAt(e._state, t, e._result);
                  else if ('function' != typeof o) this._remaining--, (this._result[t] = e);
                  else if (n === te) {
                    var a = new n(R);
                    s ? B(a, i) : C(a, e, o), this._willSettleAt(a, t);
                  } else
                    this._willSettleAt(
                      new n(function (t) {
                        return t(e);
                      }),
                      t,
                    );
                } else this._willSettleAt(r(e), t);
              }),
              (e.prototype._settledAt = function (e, t, n) {
                var r = this.promise;
                r._state === S && (this._remaining--, e === P ? B(r, n) : (this._result[t] = n)),
                  0 === this._remaining && U(r, this._result);
              }),
              (e.prototype._willSettleAt = function (e, t) {
                var n = this;
                z(
                  e,
                  void 0,
                  function (e) {
                    return n._settledAt(T, t, e);
                  },
                  function (e) {
                    return n._settledAt(P, t, e);
                  },
                );
              }),
              e
            );
          })();
          function Z(e) {
            return new X(this, e).promise;
          }
          function J(e) {
            var t = this;
            return r(e)
              ? new t(function (n, r) {
                  for (var o = e.length, i = 0; i < o; i++) t.resolve(e[i]).then(n, r);
                })
              : new t(function (e, t) {
                  return t(new TypeError('You must pass an array to race.'));
                });
          }
          function Y(e) {
            var t = new this(R);
            return B(t, e), t;
          }
          function Q() {
            throw new TypeError(
              'You must pass a resolver function as the first argument to the promise constructor',
            );
          }
          function ee() {
            throw new TypeError(
              "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.",
            );
          }
          var te = (function () {
            function e(t) {
              (this[A] = K()),
                (this._result = this._state = void 0),
                (this._subscribers = []),
                R !== t && ('function' != typeof t && Q(), this instanceof e ? G(this, t) : ee());
            }
            return (
              (e.prototype.catch = function (e) {
                return this.then(null, e);
              }),
              (e.prototype.finally = function (e) {
                var n = this,
                  r = n.constructor;
                return t(e)
                  ? n.then(
                      function (t) {
                        return r.resolve(e()).then(function () {
                          return t;
                        });
                      },
                      function (t) {
                        return r.resolve(e()).then(function () {
                          throw t;
                        });
                      },
                    )
                  : n.then(e, e);
              }),
              e
            );
          })();
          function ne() {
            var e = void 0;
            if (void 0 !== n.g) e = n.g;
            else if ('undefined' != typeof self) e = self;
            else
              try {
                e = Function('return this')();
              } catch (e) {
                throw new Error(
                  'polyfill failed because global object is unavailable in this environment',
                );
              }
            var t = e.Promise;
            if (t) {
              var r = null;
              try {
                r = Object.prototype.toString.call(t.resolve());
              } catch (e) {}
              if ('[object Promise]' === r && !t.cast) return;
            }
            e.Promise = te;
          }
          return (
            (te.prototype.then = k),
            (te.all = Z),
            (te.race = J),
            (te.resolve = O),
            (te.reject = Y),
            (te._setScheduler = u),
            (te._setAsap = c),
            (te._asap = a),
            (te.polyfill = ne),
            (te.Promise = te),
            te
          );
        })();
      },
      37: function () {},
      587: function (e) {
        'use strict';
        function t(e, t) {
          return Object.prototype.hasOwnProperty.call(e, t);
        }
        e.exports = function (e, n, r, o) {
          (n = n || '&'), (r = r || '=');
          var i = {};
          if ('string' != typeof e || 0 === e.length) return i;
          var s = /\+/g;
          e = e.split(n);
          var a = 1e3;
          o && 'number' == typeof o.maxKeys && (a = o.maxKeys);
          var u = e.length;
          a > 0 && u > a && (u = a);
          for (var c = 0; c < u; ++c) {
            var l,
              h,
              p,
              d,
              f = e[c].replace(s, '%20'),
              w = f.indexOf(r);
            w >= 0 ? ((l = f.substr(0, w)), (h = f.substr(w + 1))) : ((l = f), (h = '')),
              (p = decodeURIComponent(l)),
              (d = decodeURIComponent(h)),
              t(i, p) ? (Array.isArray(i[p]) ? i[p].push(d) : (i[p] = [i[p], d])) : (i[p] = d);
          }
          return i;
        };
      },
      361: function (e) {
        'use strict';
        var t = function (e) {
          switch (typeof e) {
            case 'string':
              return e;
            case 'boolean':
              return e ? 'true' : 'false';
            case 'number':
              return isFinite(e) ? e : '';
            default:
              return '';
          }
        };
        e.exports = function (e, n, r, o) {
          return (
            (n = n || '&'),
            (r = r || '='),
            null === e && (e = void 0),
            'object' == typeof e
              ? Object.keys(e)
                  .map(function (o) {
                    var i = encodeURIComponent(t(o)) + r;
                    return Array.isArray(e[o])
                      ? e[o]
                          .map(function (e) {
                            return i + encodeURIComponent(t(e));
                          })
                          .join(n)
                      : i + encodeURIComponent(t(e[o]));
                  })
                  .join(n)
              : o
                ? encodeURIComponent(t(o)) + r + encodeURIComponent(t(e))
                : ''
          );
        };
      },
      673: function (e, t, n) {
        'use strict';
        (t.decode = t.parse = n(587)), (t.encode = t.stringify = n(361));
      },
      665: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return X;
          },
        });
        var r,
          o,
          i = function () {
            return (i =
              Object.assign ||
              function (e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                  for (var o in (t = arguments[n]))
                    Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e;
              }).apply(this, arguments);
          };
        !(function (e) {
          (e[(e.LOW = 0)] = 'LOW'),
            (e[(e.MEDIUM = 1)] = 'MEDIUM'),
            (e[(e.HIGH = 2)] = 'HIGH'),
            (e[(e.HIGHEST = 3)] = 'HIGHEST');
        })(r || (r = {})),
          (function (e) {
            (e[(e.PENDING = 0)] = 'PENDING'),
              (e[(e.SENDING = 1)] = 'SENDING'),
              (e[(e.FAILED = 2)] = 'FAILED'),
              (e[(e.DONE = 3)] = 'DONE');
          })(o || (o = {}));
        var s = new WeakMap();
        for (
          var a = (function () {
              function e(e) {
                var t = void 0 === e ? {} : e,
                  n = t.retries,
                  r = void 0 === n ? 0 : n,
                  o = t.concurrency,
                  i = void 0 === o ? 6 : o;
                (this.totalBytesDownloaded = 0),
                  (this.queue = []),
                  (this.retries = r),
                  (this.concurrency = i);
              }
              return (
                (e.prototype.get = function (e, t) {
                  return this.request('GET', e, t);
                }),
                (e.prototype.head = function (e, t) {
                  return this.request('HEAD', e, t);
                }),
                (e.prototype.options = function (e, t) {
                  return this.request('OPTIONS', e, t);
                }),
                (e.prototype.post = function (e, t) {
                  return this.request('POST', e, t);
                }),
                (e.prototype.put = function (e, t) {
                  return this.request('PUT', e, t);
                }),
                (e.prototype.patch = function (e, t) {
                  return this.request('PATCH', e, t);
                }),
                (e.prototype.delete = function (e, t) {
                  return this.request('DELETE', e, t);
                }),
                (e.prototype.request = function (e, t, n) {
                  var r = this,
                    i = new u(e, t, n);
                  if (null == n ? void 0 : n.signal) {
                    var a = function () {
                      r.queue.includes(i) &&
                        (i.status === o.SENDING && i.abort(),
                        r.dequeue(i),
                        i.onFail(new DOMException('Aborted', 'AbortError')));
                    };
                    n.signal.addEventListener('abort', a),
                      s.set(i, function () {
                        var e;
                        null === (e = n.signal) ||
                          void 0 === e ||
                          e.removeEventListener('abort', a),
                          s.delete(i);
                      });
                  }
                  return this.enqueue(i), i.promise;
                }),
                (e.prototype.update = function () {
                  for (var e; (e = this.getNextPendingRequest()); ) this.sendRequest(e);
                  for (; (e = this.getNextOverflowingGet()); ) e.abort(), (e.status = o.PENDING);
                  this.updateTimeout = null;
                }),
                (e.prototype.enqueue = function (e) {
                  var t = this,
                    n = 0;
                  for (n = 0; n < this.queue.length; n++) {
                    if (this.queue[n].priority < e.priority) break;
                  }
                  this.queue.splice(n, 0, e),
                    this.updateTimeout ||
                      (this.updateTimeout = window.setTimeout(function () {
                        t.update();
                      }, 1));
                }),
                (e.prototype.dequeue = function (e) {
                  var t;
                  null === (t = s.get(e)) || void 0 === t || t();
                  var n = this.queue.indexOf(e);
                  if (-1 === n) throw new Error("Can't dequeue request not in queue");
                  this.queue.splice(n, 1), this.update();
                }),
                (e.prototype.getNextPendingRequest = function () {
                  for (var e = 0; e < this.queue.length && e < this.concurrency; e++) {
                    var t = this.queue[e];
                    if (t.status === o.PENDING) return t;
                  }
                  return null;
                }),
                (e.prototype.getNextOverflowingGet = function () {
                  for (var e = this.concurrency; e < this.queue.length; e++) {
                    var t = this.queue[e];
                    if (t.status === o.SENDING && t.priority !== r.HIGHEST && 'GET' === t.method)
                      return t;
                  }
                  return null;
                }),
                (e.prototype.shouldRetryStatusCode = function (t) {
                  return !e.doNotRetryStatusCodes[t];
                }),
                (e.prototype.sendRequest = function (e) {
                  var t = this;
                  (e.status = o.SENDING),
                    e
                      .send()
                      .then(function (n) {
                        (e.status = o.DONE),
                          t.dequeue(e),
                          e.contentLength &&
                            e.contentLength > 0 &&
                            (t.totalBytesDownloaded += Number(e.contentLength)),
                          e.onDone(n);
                      })
                      .catch(function (n) {
                        var r = null !== e.maxRetries ? e.maxRetries : t.retries,
                          i = e.sendAttempts < r;
                        if ('object' == typeof n) {
                          var s = n.status_code || 0;
                          i = i && t.shouldRetryStatusCode(s);
                        }
                        i
                          ? ((e.status = o.PENDING),
                            t.update(),
                            console.warn('Retried '.concat(e.url)),
                            console.warn(n))
                          : ((e.status = o.FAILED),
                            t.dequeue(e),
                            console.warn('Failed '.concat(e.url)),
                            e.onFail(n));
                      });
                }),
                (e.doNotRetryStatusCodes = {
                  400: !0,
                  401: !0,
                  403: !0,
                  404: !0,
                  405: !0,
                  406: !0,
                  410: !0,
                  411: !0,
                  414: !0,
                  415: !0,
                  421: !0,
                  431: !0,
                  451: !0,
                }),
                e
              );
            })(),
            u = (function () {
              function e(e, t, n) {
                void 0 === n && (n = {});
                var i = this;
                (this.sendAttempts = 0),
                  (this.status = o.PENDING),
                  (this.contentLength = 0),
                  (this.isAborting = !1),
                  (this.url = t),
                  (this.method = e),
                  (this.auth = n.auth || null),
                  (this.withCredentials = n.withCredentials || !1),
                  (this.priority = n.priority || r.MEDIUM),
                  (this.responseType = n.responseType || null),
                  (this.body = n.body || null),
                  (this.headers = n.headers || {}),
                  (this.maxRetries = n.maxRetries || null),
                  (this.onProgress = n.onProgress),
                  (this.promise = new Promise(function (e, t) {
                    (i.onDone = e), (i.onFail = t);
                  }));
              }
              return (
                (e.prototype.send = function () {
                  var e = this,
                    t = (this.xhr = (function (e, t, n) {
                      var r;
                      if ('undefined' != typeof XMLHttpRequest)
                        (r = new XMLHttpRequest()).withCredentials = n;
                      else {
                        if ('undefined' == typeof XDomainRequest)
                          throw new Error(
                            'No XMLHTTPRequest or XDomainRequest... are you trying to run me in node? :(',
                          );
                        r = new XDomainRequest();
                      }
                      return r.open(e, t, !0), r;
                    })(this.method, this.url, this.withCredentials));
                  if (this.responseType)
                    if (
                      'arraybuffer' === this.responseType ||
                      'text' === this.responseType ||
                      'json' === this.responseType ||
                      'blob' === this.responseType
                    )
                      t.responseType = this.responseType;
                    else {
                      if ('image' !== this.responseType)
                        throw new Error(
                          'reponseType can only be one of "arraybuffer", "text", "json", "blob", "image"',
                        );
                      t.responseType = 'blob';
                    }
                  for (var n in ('json' === this.responseType &&
                    t.setRequestHeader('Accept', 'application/json'),
                  this.auth &&
                    'string' == typeof this.auth &&
                    t.setRequestHeader('Authorization', this.auth),
                  this.headers))
                    t.setRequestHeader(n, this.headers[n]);
                  return (
                    this.body &&
                      'object' == typeof this.body &&
                      (this.body instanceof FormData ||
                        ((this.body = JSON.stringify(this.body)),
                        t.setRequestHeader('Content-Type', 'application/json'))),
                    this.onProgress && (t.onprogress = this.onProgress),
                    new Promise(function (n, r) {
                      (t.onreadystatechange = function () {
                        if (4 === t.readyState) {
                          if (200 === t.status || 201 === t.status || 204 === t.status)
                            return e.parseResponse(e.xhr).then(function (e) {
                              n(e);
                            });
                          if (!e.isAborting)
                            return e
                              .parseResponse(e.xhr)
                              .then(function (e) {
                                r(i({ status_code: t.status }, e));
                              })
                              .catch(function () {
                                r({ status_code: t.status });
                              });
                          e.isAborting = !1;
                        }
                      }),
                        (t.onerror = function (e) {
                          r(e);
                        }),
                        t.send(e.body),
                        e.sendAttempts++;
                    })
                  );
                }),
                (e.prototype.parseResponse = function (e) {
                  var t = this;
                  return new Promise(function (n, r) {
                    var o;
                    try {
                      if (!e)
                        throw new Error(
                          'No request received. Trying '
                            .concat(t.method, ' on ')
                            .concat(t.url, ' and expecting ')
                            .concat(t.responseType, ', but request was ')
                            .concat(t.xhr),
                        );
                      var i = e.response;
                      if (
                        ((t.contentLength = parseInt(
                          null !== (o = e.getResponseHeader('Content-Length')) && void 0 !== o
                            ? o
                            : '0',
                          10,
                        )),
                        'json' === t.responseType && 'object' != typeof i)
                      )
                        n(JSON.parse(e.responseText));
                      else if (
                        (200 !== e.status && 201 !== e.status && 204 !== e.status) ||
                        'image' !== t.responseType
                      )
                        n(i);
                      else {
                        var s = URL.createObjectURL(i);
                        ((i = new Image()).onload = function () {
                          URL.revokeObjectURL(s), n(i);
                        }),
                          (i.src = s),
                          (i.crossOrigin = 'Anonymous');
                      }
                    } catch (e) {
                      r({ error: 'Payload was not valid JSON' });
                    }
                  });
                }),
                (e.prototype.abort = function () {
                  if (null === this.xhr) throw new Error('Cannot abort unsent Request');
                  (this.isAborting = !0), this.xhr.abort();
                }),
                e
              );
            })(),
            c = n(257),
            l = [],
            h = 0;
          h < 256;
          h++
        )
          l[h] = (h < 16 ? '0' : '') + h.toString(16);
        function p() {
          var e,
            t = window.crypto || window.msCrypto;
          return (
            ((e = t
              ? t.getRandomValues(new Uint8Array(16))
              : new Uint8Array(16).map(function () {
                  return 255 * Math.random();
                }))[6] = (15 & e[6]) | 64),
            (e[8] = (63 & e[8]) | 128),
            l[e[0]] +
              l[e[1]] +
              l[e[2]] +
              l[e[3]] +
              '-' +
              l[e[4]] +
              l[e[5]] +
              '-' +
              l[e[6]] +
              l[e[7]] +
              '-' +
              l[e[8]] +
              l[e[9]] +
              '-' +
              l[e[10]] +
              l[e[11]] +
              l[e[12]] +
              l[e[13]] +
              l[e[14]] +
              l[e[15]]
          );
        }
        new Object();
        var d = function (e) {
            if (e) {
              var t = e.valueOf();
              if (!isNaN(t)) return e.toISOString();
            }
            return new Date().toISOString();
          },
          f = n(251),
          w = new c.Z('util-browser'),
          m = 'referrer',
          _ = '';
        function v() {
          return (
            ((function () {
              if (!window.document.referrer) return !1;
              var e;
              try {
                e = new URL(window.document.referrer);
              } catch (e) {
                return !1;
              }
              return e.origin === window.location.origin;
            })()
              ? (function () {
                  var e = new URL(window.location.href);
                  if (!e.searchParams.has(m)) return _;
                  var t = e.searchParams.get(m) || '';
                  try {
                    new URL(t), (_ = t);
                  } catch (e) {}
                  return e.searchParams.delete(m), window.history.replaceState(null, '', e.href), _;
                })()
              : '') || window.document.referrer
          );
        }
        var b = function () {
            return (b =
              Object.assign ||
              function (e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                  for (var o in (t = arguments[n]))
                    Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e;
              }).apply(this, arguments);
          },
          g = new c.Z('mp-analytics'),
          y = 'ajs_anonymous_id',
          x = 'sc_anonymous_id',
          E = (function () {
            function e(e, t, n) {
              var r = this;
              (this.token = e),
                (this.url = t),
                (this.queue = n),
                (this.options = {}),
                (this.segmentStylePayload = function (e, t, n) {
                  return {
                    timestamp: d(new Date()),
                    integrations: { Intercom: !!n },
                    context: r.segmentStyleContext(r.context),
                    properties: t,
                    event: e,
                    messageId: p(),
                    anonymousId: r.anonymousId,
                    type: 'track',
                    userId: r.user ? r.user.id : null,
                    sentAt: d(new Date()),
                  };
                }),
                (this.segmentStyleContext = function (e) {
                  var t = {
                    page: {
                      path: window.location.pathname,
                      referrer: v(),
                      search: window.location.search,
                      title: window.document.title,
                      url: window.location.href,
                    },
                    userAgent: navigator.userAgent,
                    library: { name: 'showcase', version: '1' },
                    campaign: {},
                  };
                  return b(b({}, e), t);
                });
              var o = (function (e, t) {
                if (!('localStorage' in window)) return t;
                var n;
                try {
                  n = window.localStorage.getItem(e);
                } catch (e) {
                  return w.debug(e), t;
                }
                return null === n
                  ? t
                  : 'boolean' == typeof t
                    ? 'true' === n
                    : 'number' == typeof t
                      ? parseFloat(n)
                      : n;
              })(x);
              if (o) this.anonymousId = o;
              else {
                var i = (0, f.$)(y);
                (this.anonymousId = i && 'string' == typeof i ? i.replace(/%22/g, '') : p()),
                  (function (e, t) {
                    try {
                      window.localStorage.setItem(e, t);
                    } catch (e) {
                      w.error(e);
                    }
                  })(x, this.anonymousId);
              }
              this.headers = {
                'X-API-Key': this.token,
                'Content-Type': 'application/json',
                Accept: 'application/json',
              };
            }
            return (
              (e.prototype.init = function (e, t) {
                return (
                  this.setOptions(e),
                  (this.context = t),
                  g.debug('init', {
                    options: this.options,
                    context: this.segmentStyleContext(this.context),
                  }),
                  Promise.resolve()
                );
              }),
              (e.prototype.identify = function (e) {
                g.debug('identify as', e), (this.user = e);
              }),
              (e.prototype.track = function (e, t, n) {
                c.Z.level >= 3 && g.debug(e, t ? JSON.stringify(t).replace('\\"', '"') : t),
                  (t = Object.assign(t || {}, this.options));
                var r = this.segmentStylePayload(e, t, n);
                this.queue.post(''.concat(this.url, '?ev=').concat(e), {
                  body: r,
                  headers: this.headers,
                });
              }),
              (e.prototype.trackAsync = function (e, t, n) {
                if (((t = Object.assign(t || {}, this.options)), navigator.sendBeacon))
                  try {
                    var r = this.segmentStylePayload(e, t, n);
                    navigator.sendBeacon(
                      ''.concat(this.url, '?api_key=').concat(this.token),
                      JSON.stringify(r),
                    );
                  } catch (e) {
                    g.error('Failed to sendBeacon analytics request');
                  }
              }),
              (e.prototype.setOptions = function (e) {
                Object.assign(this.options, e);
              }),
              e
            );
          })(),
          k = n(238),
          O =
            (n(575),
            function (e) {
              var t = 'function' == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && 'number' == typeof e.length)
                return {
                  next: function () {
                    return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
                  },
                };
              throw new TypeError(
                t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.',
              );
            }),
          A = [
            /^([a-z0-9\-]*\.)*matterport\.com$/,
            /^([a-z0-9\-]*\.)*matterportvr\.cn$/,
            /^localhost$/,
          ];
        function R(e) {
          var t, n;
          try {
            var r = new URL(e).hostname;
            try {
              for (var o = O(A), i = o.next(); !i.done; i = o.next()) {
                var s = i.value;
                if (r.match(s)) return !0;
              }
            } catch (e) {
              t = { error: e };
            } finally {
              try {
                i && !i.done && (n = o.return) && n.call(o);
              } finally {
                if (t) throw t.error;
              }
            }
          } catch (e) {}
          return !1;
        }
        var S = function (e, t, n, r) {
            return new (n || (n = Promise))(function (o, i) {
              function s(e) {
                try {
                  u(r.next(e));
                } catch (e) {
                  i(e);
                }
              }
              function a(e) {
                try {
                  u(r.throw(e));
                } catch (e) {
                  i(e);
                }
              }
              function u(e) {
                var t;
                e.done
                  ? o(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(s, a);
              }
              u((r = r.apply(e, t || [])).next());
            });
          },
          T = function (e, t) {
            var n,
              r,
              o,
              i,
              s = {
                label: 0,
                sent: function () {
                  if (1 & o[0]) throw o[1];
                  return o[1];
                },
                trys: [],
                ops: [],
              };
            return (
              (i = { next: a(0), throw: a(1), return: a(2) }),
              'function' == typeof Symbol &&
                (i[Symbol.iterator] = function () {
                  return this;
                }),
              i
            );
            function a(i) {
              return function (a) {
                return (function (i) {
                  if (n) throw new TypeError('Generator is already executing.');
                  for (; s; )
                    try {
                      if (
                        ((n = 1),
                        r &&
                          (o =
                            2 & i[0]
                              ? r.return
                              : i[0]
                                ? r.throw || ((o = r.return) && o.call(r), 0)
                                : r.next) &&
                          !(o = o.call(r, i[1])).done)
                      )
                        return o;
                      switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                        case 0:
                        case 1:
                          o = i;
                          break;
                        case 4:
                          return s.label++, { value: i[1], done: !1 };
                        case 5:
                          s.label++, (r = i[1]), (i = [0]);
                          continue;
                        case 7:
                          (i = s.ops.pop()), s.trys.pop();
                          continue;
                        default:
                          if (
                            !((o = s.trys),
                            (o = o.length > 0 && o[o.length - 1]) || (6 !== i[0] && 2 !== i[0]))
                          ) {
                            s = 0;
                            continue;
                          }
                          if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                            s.label = i[1];
                            break;
                          }
                          if (6 === i[0] && s.label < o[1]) {
                            (s.label = o[1]), (o = i);
                            break;
                          }
                          if (o && s.label < o[2]) {
                            (s.label = o[2]), s.ops.push(i);
                            break;
                          }
                          o[2] && s.ops.pop(), s.trys.pop();
                          continue;
                      }
                      i = t.call(e, s);
                    } catch (e) {
                      (i = [6, e]), (r = 0);
                    } finally {
                      n = o = 0;
                    }
                  if (5 & i[0]) throw i[1];
                  return { value: i[0] ? i[1] : void 0, done: !0 };
                })([i, a]);
              };
            }
          };
        function P(e) {
          return S(this, void 0, Promise, function () {
            return T(this, function (t) {
              return R(window.location.href)
                ? [
                    2,
                    e.get('https://static.matterport.com/geoip/', {
                      responseType: 'json',
                      priority: r.LOW,
                    }),
                  ]
                : [2, { city: '', country_code: '', country_name: '', region: '' }];
            });
          });
        }
        var q = n(173),
          j = function () {
            return (j =
              Object.assign ||
              function (e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                  for (var o in (t = arguments[n]))
                    Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e;
              }).apply(this, arguments);
          },
          N = function (e, t, n, r) {
            return new (n || (n = Promise))(function (o, i) {
              function s(e) {
                try {
                  u(r.next(e));
                } catch (e) {
                  i(e);
                }
              }
              function a(e) {
                try {
                  u(r.throw(e));
                } catch (e) {
                  i(e);
                }
              }
              function u(e) {
                var t;
                e.done
                  ? o(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(s, a);
              }
              u((r = r.apply(e, t || [])).next());
            });
          },
          D = function (e, t) {
            var n,
              r,
              o,
              i,
              s = {
                label: 0,
                sent: function () {
                  if (1 & o[0]) throw o[1];
                  return o[1];
                },
                trys: [],
                ops: [],
              };
            return (
              (i = { next: a(0), throw: a(1), return: a(2) }),
              'function' == typeof Symbol &&
                (i[Symbol.iterator] = function () {
                  return this;
                }),
              i
            );
            function a(i) {
              return function (a) {
                return (function (i) {
                  if (n) throw new TypeError('Generator is already executing.');
                  for (; s; )
                    try {
                      if (
                        ((n = 1),
                        r &&
                          (o =
                            2 & i[0]
                              ? r.return
                              : i[0]
                                ? r.throw || ((o = r.return) && o.call(r), 0)
                                : r.next) &&
                          !(o = o.call(r, i[1])).done)
                      )
                        return o;
                      switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                        case 0:
                        case 1:
                          o = i;
                          break;
                        case 4:
                          return s.label++, { value: i[1], done: !1 };
                        case 5:
                          s.label++, (r = i[1]), (i = [0]);
                          continue;
                        case 7:
                          (i = s.ops.pop()), s.trys.pop();
                          continue;
                        default:
                          if (
                            !((o = s.trys),
                            (o = o.length > 0 && o[o.length - 1]) || (6 !== i[0] && 2 !== i[0]))
                          ) {
                            s = 0;
                            continue;
                          }
                          if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                            s.label = i[1];
                            break;
                          }
                          if (6 === i[0] && s.label < o[1]) {
                            (s.label = o[1]), (o = i);
                            break;
                          }
                          if (o && s.label < o[2]) {
                            (s.label = o[2]), s.ops.push(i);
                            break;
                          }
                          o[2] && s.ops.pop(), s.trys.pop();
                          continue;
                      }
                      i = t.call(e, s);
                    } catch (e) {
                      (i = [6, e]), (r = 0);
                    } finally {
                      n = o = 0;
                    }
                  if (5 & i[0]) throw i[1];
                  return { value: i[0] ? i[1] : void 0, done: !0 };
                })([i, a]);
              };
            }
          },
          I = function (e) {
            return ''.concat(e, '_3.0');
          },
          C = function (e) {
            var t, n;
            return {
              pme:
                null !==
                  (n = (null !== (t = window.MP_PLATFORM_METADATA) && void 0 !== t ? t : {}).pme) &&
                void 0 !== n &&
                n,
            };
          },
          M = function (e) {
            return { height: e.innerHeight, width: e.innerWidth };
          },
          L = function (e) {
            return { width: e.screen.width, height: e.screen.height, density: e.devicePixelRatio };
          },
          U = function () {
            try {
              return Intl.DateTimeFormat().resolvedOptions().timeZone;
            } catch (e) {
              return '';
            }
          };
        function B(e) {
          var t,
            n,
            r,
            o,
            i,
            s = window,
            a = s.parent !== s,
            u = '1' === e.play || 'true' === e.play;
          return j(
            {
              model_id: e.model || e.m || '',
              language_tag: null !== (t = e.lang) && void 0 !== t ? t : null,
              quickstart: '1' === e.qs,
              is_mobile: (0, q.tq)(),
              iframe: a,
              session_id: p(),
              platform:
                ((n = new k.UAParser().getResult()),
                (r = n.os.name),
                (o = n.browser.name),
                (i = j({}, n.device)),
                (0, q._1)() &&
                  ((r = 'iPadOS'),
                  (i.vendor = 'Apple'),
                  (i.model = 'iPad'),
                  (i.type = 'tablet'),
                  'Safari' === o && (o = 'Mobile Safari')),
                {
                  browser: {
                    name: o,
                    major: n.browser.major,
                    version: n.browser.version,
                    language: navigator.language || '',
                    languages: navigator.languages ? navigator.languages.join(', ') : '',
                  },
                  os: { name: r, version: n.os.version },
                  device: { vendor: i.vendor, model: i.model, type: i.type },
                }),
              pme: C(),
              authTokenProvided: !!e.auth || !!e.connectauth,
            },
            (function (e) {
              var t = window,
                n = t.innerWidth / t.innerHeight,
                r = t.parent !== t;
              return {
                start_source: e ? 'autoplay' : r ? 'click' : 'fullpage',
                autoplay: e,
                aspect_ratio: isFinite(n) ? n : 1,
                window: M(t),
              };
            })(u),
          );
        }
        function z(e, t) {
          var n = window;
          return {
            app: { name: I(t), version: '24.11.1_webgl-598-gae59c48b5b' },
            locale: e,
            screen: L(n),
            timezone: U(),
            location: {},
          };
        }
        function W(e, t, n) {
          return N(this, void 0, Promise, function () {
            var r, o;
            return D(this, function (i) {
              switch (i.label) {
                case 0:
                  return (r = z(t, n)), [4, P(e)];
                case 1:
                  return (
                    (o = i.sent()),
                    (r.location = { city: o.city, country: o.country_name, region: o.region }),
                    [2, r]
                  );
              }
            });
          });
        }
        var F = n(772),
          G = function (e, t, n, r) {
            return new (n || (n = Promise))(function (o, i) {
              function s(e) {
                try {
                  u(r.next(e));
                } catch (e) {
                  i(e);
                }
              }
              function a(e) {
                try {
                  u(r.throw(e));
                } catch (e) {
                  i(e);
                }
              }
              function u(e) {
                var t;
                e.done
                  ? o(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(s, a);
              }
              u((r = r.apply(e, t || [])).next());
            });
          },
          H = function (e, t) {
            var n,
              r,
              o,
              i,
              s = {
                label: 0,
                sent: function () {
                  if (1 & o[0]) throw o[1];
                  return o[1];
                },
                trys: [],
                ops: [],
              };
            return (
              (i = { next: a(0), throw: a(1), return: a(2) }),
              'function' == typeof Symbol &&
                (i[Symbol.iterator] = function () {
                  return this;
                }),
              i
            );
            function a(i) {
              return function (a) {
                return (function (i) {
                  if (n) throw new TypeError('Generator is already executing.');
                  for (; s; )
                    try {
                      if (
                        ((n = 1),
                        r &&
                          (o =
                            2 & i[0]
                              ? r.return
                              : i[0]
                                ? r.throw || ((o = r.return) && o.call(r), 0)
                                : r.next) &&
                          !(o = o.call(r, i[1])).done)
                      )
                        return o;
                      switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                        case 0:
                        case 1:
                          o = i;
                          break;
                        case 4:
                          return s.label++, { value: i[1], done: !1 };
                        case 5:
                          s.label++, (r = i[1]), (i = [0]);
                          continue;
                        case 7:
                          (i = s.ops.pop()), s.trys.pop();
                          continue;
                        default:
                          if (
                            !((o = s.trys),
                            (o = o.length > 0 && o[o.length - 1]) || (6 !== i[0] && 2 !== i[0]))
                          ) {
                            s = 0;
                            continue;
                          }
                          if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                            s.label = i[1];
                            break;
                          }
                          if (6 === i[0] && s.label < o[1]) {
                            (s.label = o[1]), (o = i);
                            break;
                          }
                          if (o && s.label < o[2]) {
                            (s.label = o[2]), s.ops.push(i);
                            break;
                          }
                          o[2] && s.ops.pop(), s.trys.pop();
                          continue;
                      }
                      i = t.call(e, s);
                    } catch (e) {
                      (i = [6, e]), (r = 0);
                    } finally {
                      n = o = 0;
                    }
                  if (5 & i[0]) throw i[1];
                  return { value: i[0] ? i[1] : void 0, done: !0 };
                })([i, a]);
              };
            }
          },
          K = function (e, t) {
            var n = 'function' == typeof Symbol && e[Symbol.iterator];
            if (!n) return e;
            var r,
              o,
              i = n.call(e),
              s = [];
            try {
              for (; (void 0 === t || t-- > 0) && !(r = i.next()).done; ) s.push(r.value);
            } catch (e) {
              o = { error: e };
            } finally {
              try {
                r && !r.done && (n = i.return) && n.call(i);
              } finally {
                if (o) throw o.error;
              }
            }
            return s;
          },
          $ = new a();
        function V(e) {
          return G(this, void 0, Promise, function () {
            var t, n, r, o, i, s;
            return H(this, function (a) {
              switch (a.label) {
                case 0:
                  return (
                    (t = e),
                    (n = window.location.origin),
                    [4, $.get(''.concat(n, '/api/v1/config/').concat(t, '/?format=json'))]
                  );
                case 1:
                  return (
                    (r = a.sent()),
                    (o = JSON.parse(r)),
                    (i = o.analytics_mp_key),
                    (s = o.analytics_mp_url),
                    [2, [i, s]]
                  );
              }
            });
          });
        }
        function X(e, t, n) {
          return G(this, void 0, void 0, function () {
            var r, o, i, s, a, u, c;
            return H(this, function (l) {
              switch (l.label) {
                case 0:
                  return l.trys.push([0, 4, , 5]), [4, V(e)];
                case 1:
                  return (
                    (r = K.apply(void 0, [l.sent(), 2])), (o = r[0]), (i = r[1]), [4, W($, t, e)]
                  );
                case 2:
                  return (s = l.sent()), (a = B(n)), [4, (u = new E(o, i, $)).init(a, s)];
                case 3:
                  return (
                    l.sent(),
                    (c = {
                      error_dialog: 'browser-check',
                      error_type: 'UnsupportedBrowser',
                      exception: { message: 'unsupported browser' },
                      mock_error: (0, F.Z)(),
                    }),
                    u.track('error_displayed', c),
                    [3, 5]
                  );
                case 4:
                  return l.sent(), [3, 5];
                case 5:
                  return [2];
              }
            });
          });
        }
      },
      772: function (e, t, n) {
        'use strict';
        function r() {
          return !!window.location.href.match(/[\?&]unsupported-browser/);
        }
        n.d(t, {
          Z: function () {
            return r;
          },
        });
      },
      570: function (e, t, n) {
        'use strict';
        n.d(t, {
          W: function () {
            return c;
          },
        });
        var r = n(173),
          o = n(251),
          i = n(55),
          s = n(477),
          a = function (e, t) {
            var n = 'function' == typeof Symbol && e[Symbol.iterator];
            if (!n) return e;
            var r,
              o,
              i = n.call(e),
              s = [];
            try {
              for (; (void 0 === t || t-- > 0) && !(r = i.next()).done; ) s.push(r.value);
            } catch (e) {
              o = { error: e };
            } finally {
              try {
                r && !r.done && (n = i.return) && n.call(i);
              } finally {
                if (o) throw o.error;
              }
            }
            return s;
          };
        function u(e) {
          if (!e) return s.k$;
          if (
            (function (e) {
              return s.E7.includes(e);
            })(e)
          )
            return e;
          var t = e.toLocaleLowerCase();
          if (t in s.Xy) return s.Xy[t];
          var n = a(t.split('-'), 1)[0];
          return n in s.Xy
            ? s.Xy[n]
            : (s.E7.find(function (e) {
                return e.startsWith(t);
              }),
              s.k$);
        }
        function c(e, t) {
          void 0 === t && (t = (0, i.eY)('lang', ''));
          var n = (0, r.ht)(),
            s = (0, o.$)('SESSvl', ''),
            a = null != s ? s : '',
            c = '' === a || -1 !== a.search(/^en/);
          return u(t || (e ? (c ? n : a) : n));
        }
      },
      477: function (e, t, n) {
        'use strict';
        n.d(t, {
          E7: function () {
            return o;
          },
          Xy: function () {
            return s;
          },
          k$: function () {
            return i;
          },
        });
        var r = function () {
            return (r =
              Object.assign ||
              function (e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                  for (var o in (t = arguments[n]))
                    Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e;
              }).apply(this, arguments);
          },
          o = ['en-US', 'es', 'fr', 'de', 'ru', 'ja', 'zh-CN', 'zh-TW', 'ko', 'nl', 'it', 'pt'],
          i = 'en-US',
          s = r(
            r(
              {},
              o.reduce(function (e, t) {
                var n;
                return r(r({}, e), (((n = {})[t.toLowerCase()] = t), n));
              }, {}),
            ),
            { en: 'en-US', zh: 'zh-CN', cn: 'zh-CN', jp: 'ja' },
          );
      },
      173: function (e, t, n) {
        'use strict';
        n.d(t, {
          _1: function () {
            return s;
          },
          ht: function () {
            return c;
          },
          tq: function () {
            return i;
          },
        });
        var r = n(257),
          o = function (e, t) {
            var n = 'function' == typeof Symbol && e[Symbol.iterator];
            if (!n) return e;
            var r,
              o,
              i = n.call(e),
              s = [];
            try {
              for (; (void 0 === t || t-- > 0) && !(r = i.next()).done; ) s.push(r.value);
            } catch (e) {
              o = { error: e };
            } finally {
              try {
                r && !r.done && (n = i.return) && n.call(i);
              } finally {
                if (o) throw o.error;
              }
            }
            return s;
          },
          i =
            (new r.Z('util-browser'),
            function () {
              var e = navigator.userAgent || navigator.vendor,
                t = new RegExp(
                  '(android|bbd+|meego).+mobile|android|avantgo|bada/|blackberry|blazer|compal|elaine|fennec|\n    hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|\n    palm( os)?|phone|p(ixi|re)/|plucker|pocket|psp|series(4|6)0|symbian|treo|up.(browser|link)|vodafone|\n    wap|windows ce|xda|xiino|MatterScan',
                  'i',
                ),
                n = new RegExp(
                  '1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|\n    amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|\n    br(e|v)w|bumb|bw-(n|u)|c55/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|\n    devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|\n    g560|gene|gf-5|g-mo|go(.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|\n    a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|\n    jemu|jigs|kddi|keji|kgt( |/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|/(k|l|u)|50|54|-[a-w])|libw|lynx|\n    m1-w|m3ga|m50/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|\n    zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|\n    nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|\n    po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55/|\n    sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|\n    sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|\n    tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|\n    vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|\n    zeto|zte-',
                  'i',
                );
              return (t.test(e) || n.test(e.substr(0, 4)) || s()) && !u();
            }),
          s = function () {
            var e = window.navigator.userAgent;
            return /iPad/.test(e) || (a() && navigator.maxTouchPoints > 1);
          },
          a = function () {
            var e = window.navigator.platform;
            return /MAC/.test(e.toUpperCase());
          },
          u = function () {
            return -1 !== window.navigator.userAgent.indexOf('OculusBrowser');
          };
        !(function () {
          var e = window.URL || window.webkitURL,
            t = document.createElement('a');
          document.body.appendChild(t), (t.style.display = 'none');
        })();
        var c = function () {
          var e, t;
          return (
            (function (e) {
              var t = { language: 'en', region: void 0, script: void 0, ext: void 0 },
                n = new RegExp(
                  [
                    /^([a-z]{2,3})/,
                    /(?:[_-]([ut]{1}[_-][a-z\-\_]+))?/,
                    /(?:[_-]([a-z]{4}))?/,
                    /(?:[_-]([a-z]{2}))?$/,
                  ]
                    .map(function (e) {
                      return e.source;
                    })
                    .join(''),
                  'i',
                ).exec(e);
              if (n) {
                var r = o(n, 5),
                  i = r[1],
                  s = r[2],
                  a = r[3],
                  u = r[4];
                Object.assign(t, { language: i, ext: s, script: a, region: u });
              }
              return t;
            })(
              (null ===
                (t =
                  null ===
                    (e = null === Intl || void 0 === Intl ? void 0 : Intl.DateTimeFormat()) ||
                  void 0 === e
                    ? void 0
                    : e.resolvedOptions()) || void 0 === t
                ? void 0
                : t.locale) || navigator.language,
            ).language || ''
          );
        };
      },
      251: function (e, t, n) {
        'use strict';
        n.d(t, {
          $: function () {
            return r;
          },
        });
        var r = function (e, t) {
          var n = new RegExp(e + '=([^;]+)|$').exec(document.cookie);
          if (!n) return t;
          var r = n[1];
          return 'boolean' == typeof t
            ? 'true' === r || '1' === r
            : 'number' == typeof t
              ? parseFloat(r)
              : r;
        };
      },
      257: function (e, t, n) {
        'use strict';
        var r,
          o = window.navigationStart || Date.now();
        !(function (e) {
          (e[(e.ERROR = 0)] = 'ERROR'),
            (e[(e.WARN = 1)] = 'WARN'),
            (e[(e.INFO = 2)] = 'INFO'),
            (e[(e.DEBUG = 3)] = 'DEBUG');
        })(r || (r = {}));
        var i = (function () {
          function e(e) {
            var t;
            (this.timers = {}),
              (this.handlers =
                (((t = {})[r.DEBUG] = console.debug),
                (t[r.INFO] = console.info),
                (t[r.WARN] = console.warn),
                (t[r.ERROR] = console.error),
                t));
            var n = e.split(new RegExp('/|\\\\'));
            this.prefix = '[' + n[n.length - 1].replace('.js', '') + ']';
          }
          return (
            (e.prototype.message = function (t) {
              return e.level >= t && console
                ? (this.handlers[t] ? this.handlers[t] : console.log).bind(
                    console,
                    this.getPrefix(),
                  )
                : function () {};
            }),
            Object.defineProperty(e.prototype, 'debug', {
              get: function () {
                return this.message(r.DEBUG);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, 'devInfo', {
              get: function () {
                return function () {};
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, 'debugInfo', {
              get: function () {
                return this.debug;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, 'debugWarn', {
              get: function () {
                return this.message(e.level >= r.DEBUG ? r.WARN : r.DEBUG);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, 'info', {
              get: function () {
                return this.message(r.INFO);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, 'warn', {
              get: function () {
                return this.message(r.WARN);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, 'error', {
              get: function () {
                return this.message(r.ERROR);
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.time = function (t) {
              e.level >= r.DEBUG && (this.timers[t] = Date.now());
            }),
            (e.prototype.timeEnd = function (t) {
              if (e.level >= r.DEBUG) {
                var n = this.timers[t];
                if (!n) return;
                var o = (Date.now() - n) / 1e3;
                this.debug(t, o + 's');
              }
            }),
            (e.prototype.getPrefix = function () {
              var e = (Date.now() - o) / 1e3 + 's';
              return ''.concat(this.prefix, ' ').concat(e);
            }),
            (e.level = r.INFO),
            e
          );
        })();
        t.Z = i;
      },
      55: function (e, t, n) {
        'use strict';
        function r() {
          var e = new URLSearchParams(window.location.search),
            t = {};
          return (
            e.forEach(function (e, n) {
              t[n] = e;
            }),
            t
          );
        }
        function o(e, t, n) {
          return (
            void 0 === t && (t = null),
            void 0 === n && (n = typeof t),
            (function (e, t, n) {
              void 0 === t && (t = null);
              void 0 === n && (n = typeof t);
              if (null === e) return t;
              if ('boolean' === n) return 'true' === e || '1' === e;
              if ('number' === n) return +e;
              return e;
            })(new URLSearchParams(window.location.search).get(e), t, n)
          );
        }
        n.d(t, {
          FU: function () {
            return r;
          },
          eY: function () {
            return o;
          },
        });
      },
      238: function (e, t, n) {
        var r;
        !(function (o, i) {
          'use strict';
          var s = 'function',
            a = 'undefined',
            u = 'object',
            c = 'model',
            l = 'name',
            h = 'type',
            p = 'vendor',
            d = 'version',
            f = 'architecture',
            w = 'console',
            m = 'mobile',
            _ = 'tablet',
            v = 'smarttv',
            b = 'wearable',
            g = {
              extend: function (e, t) {
                var n = {};
                for (var r in e)
                  t[r] && t[r].length % 2 == 0 ? (n[r] = t[r].concat(e[r])) : (n[r] = e[r]);
                return n;
              },
              has: function (e, t) {
                return 'string' == typeof e && -1 !== t.toLowerCase().indexOf(e.toLowerCase());
              },
              lowerize: function (e) {
                return e.toLowerCase();
              },
              major: function (e) {
                return 'string' == typeof e ? e.replace(/[^\d\.]/g, '').split('.')[0] : i;
              },
              trim: function (e) {
                return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
              },
            },
            y = {
              rgx: function (e, t) {
                for (var n, r, o, a, c, l, h = 0; h < t.length && !c; ) {
                  var p = t[h],
                    d = t[h + 1];
                  for (n = r = 0; n < p.length && !c; )
                    if ((c = p[n++].exec(e)))
                      for (o = 0; o < d.length; o++)
                        (l = c[++r]),
                          typeof (a = d[o]) === u && a.length > 0
                            ? 2 == a.length
                              ? typeof a[1] == s
                                ? (this[a[0]] = a[1].call(this, l))
                                : (this[a[0]] = a[1])
                              : 3 == a.length
                                ? typeof a[1] !== s || (a[1].exec && a[1].test)
                                  ? (this[a[0]] = l ? l.replace(a[1], a[2]) : i)
                                  : (this[a[0]] = l ? a[1].call(this, l, a[2]) : i)
                                : 4 == a.length &&
                                  (this[a[0]] = l ? a[3].call(this, l.replace(a[1], a[2])) : i)
                            : (this[a] = l || i);
                  h += 2;
                }
              },
              str: function (e, t) {
                for (var n in t)
                  if (typeof t[n] === u && t[n].length > 0) {
                    for (var r = 0; r < t[n].length; r++)
                      if (g.has(t[n][r], e)) return '?' === n ? i : n;
                  } else if (g.has(t[n], e)) return '?' === n ? i : n;
                return e;
              },
            },
            x = {
              browser: {
                oldsafari: {
                  version: {
                    '1.0': '/8',
                    1.2: '/1',
                    1.3: '/3',
                    '2.0': '/412',
                    '2.0.2': '/416',
                    '2.0.3': '/417',
                    '2.0.4': '/419',
                    '?': '/',
                  },
                },
              },
              device: {
                amazon: { model: { 'Fire Phone': ['SD', 'KF'] } },
                sprint: {
                  model: { 'Evo Shift 4G': '7373KT' },
                  vendor: { HTC: 'APA', Sprint: 'Sprint' },
                },
              },
              os: {
                windows: {
                  version: {
                    ME: '4.90',
                    'NT 3.11': 'NT3.51',
                    'NT 4.0': 'NT4.0',
                    2e3: 'NT 5.0',
                    XP: ['NT 5.1', 'NT 5.2'],
                    Vista: 'NT 6.0',
                    7: 'NT 6.1',
                    8: 'NT 6.2',
                    8.1: 'NT 6.3',
                    10: ['NT 6.4', 'NT 10.0'],
                    RT: 'ARM',
                  },
                },
              },
            },
            E = {
              browser: [
                [
                  /(opera\smini)\/([\w\.-]+)/i,
                  /(opera\s[mobiletab]{3,6}).+version\/([\w\.-]+)/i,
                  /(opera).+version\/([\w\.]+)/i,
                  /(opera)[\/\s]+([\w\.]+)/i,
                ],
                [l, d],
                [/(opios)[\/\s]+([\w\.]+)/i],
                [[l, 'Opera Mini'], d],
                [/\s(opr)\/([\w\.]+)/i],
                [[l, 'Opera'], d],
                [
                  /(kindle)\/([\w\.]+)/i,
                  /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,
                  /(avant\s|iemobile|slim)(?:browser)?[\/\s]?([\w\.]*)/i,
                  /(bidubrowser|baidubrowser)[\/\s]?([\w\.]+)/i,
                  /(?:ms|\()(ie)\s([\w\.]+)/i,
                  /(rekonq)\/([\w\.]*)/i,
                  /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i,
                ],
                [l, d],
                [/(konqueror)\/([\w\.]+)/i],
                [[l, 'Konqueror'], d],
                [/(trident).+rv[:\s]([\w\.]{1,9}).+like\sgecko/i],
                [[l, 'IE'], d],
                [/(edge|edgios|edga|edg)\/((\d+)?[\w\.]+)/i],
                [[l, 'Edge'], d],
                [/(yabrowser)\/([\w\.]+)/i],
                [[l, 'Yandex'], d],
                [/(Avast)\/([\w\.]+)/i],
                [[l, 'Avast Secure Browser'], d],
                [/(AVG)\/([\w\.]+)/i],
                [[l, 'AVG Secure Browser'], d],
                [/(puffin)\/([\w\.]+)/i],
                [[l, 'Puffin'], d],
                [/(focus)\/([\w\.]+)/i],
                [[l, 'Firefox Focus'], d],
                [/(opt)\/([\w\.]+)/i],
                [[l, 'Opera Touch'], d],
                [/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i],
                [[l, 'UCBrowser'], d],
                [/(comodo_dragon)\/([\w\.]+)/i],
                [[l, /_/g, ' '], d],
                [/(windowswechat qbcore)\/([\w\.]+)/i],
                [[l, 'WeChat(Win) Desktop'], d],
                [/(micromessenger)\/([\w\.]+)/i],
                [[l, 'WeChat'], d],
                [/(brave)\/([\w\.]+)/i],
                [[l, 'Brave'], d],
                [/(whale)\/([\w\.]+)/i],
                [[l, 'Whale'], d],
                [/(qqbrowserlite)\/([\w\.]+)/i],
                [l, d],
                [/(QQ)\/([\d\.]+)/i],
                [l, d],
                [/m?(qqbrowser)[\/\s]?([\w\.]+)/i],
                [l, d],
                [/(baiduboxapp)[\/\s]?([\w\.]+)/i],
                [l, d],
                [/(2345Explorer)[\/\s]?([\w\.]+)/i],
                [l, d],
                [/(MetaSr)[\/\s]?([\w\.]+)/i],
                [l],
                [/(LBBROWSER)/i],
                [l],
                [/xiaomi\/miuibrowser\/([\w\.]+)/i],
                [d, [l, 'MIUI Browser']],
                [/;fbav\/([\w\.]+);/i],
                [d, [l, 'Facebook']],
                [/FBAN\/FBIOS|FB_IAB\/FB4A/i],
                [[l, 'Facebook']],
                [/safari\s(line)\/([\w\.]+)/i, /android.+(line)\/([\w\.]+)\/iab/i],
                [l, d],
                [/headlesschrome(?:\/([\w\.]+)|\s)/i],
                [d, [l, 'Chrome Headless']],
                [/\swv\).+(chrome)\/([\w\.]+)/i],
                [[l, /(.+)/, '$1 WebView'], d],
                [/((?:oculus|samsung)browser)\/([\w\.]+)/i],
                [[l, /(.+(?:g|us))(.+)/, '$1 $2'], d],
                [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i],
                [d, [l, 'Android Browser']],
                [/(sailfishbrowser)\/([\w\.]+)/i],
                [[l, 'Sailfish Browser'], d],
                [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i],
                [l, d],
                [/(dolfin)\/([\w\.]+)/i],
                [[l, 'Dolphin'], d],
                [/(qihu|qhbrowser|qihoobrowser|360browser)/i],
                [[l, '360 Browser']],
                [/((?:android.+)crmo|crios)\/([\w\.]+)/i],
                [[l, 'Chrome'], d],
                [/(coast)\/([\w\.]+)/i],
                [[l, 'Opera Coast'], d],
                [/fxios\/([\w\.-]+)/i],
                [d, [l, 'Firefox']],
                [/version\/([\w\.]+)\s.*mobile\/\w+\s(safari)/i],
                [d, [l, 'Mobile Safari']],
                [/version\/([\w\.]+)\s.*(mobile\s?safari|safari)/i],
                [d, l],
                [/webkit.+?(gsa)\/([\w\.]+)\s.*(mobile\s?safari|safari)(\/[\w\.]+)/i],
                [[l, 'GSA'], d],
                [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
                [l, [d, y.str, x.browser.oldsafari.version]],
                [/(webkit|khtml)\/([\w\.]+)/i],
                [l, d],
                [/(navigator|netscape)\/([\w\.-]+)/i],
                [[l, 'Netscape'], d],
                [
                  /(swiftfox)/i,
                  /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
                  /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,
                  /(firefox)\/([\w\.]+)\s[\w\s\-]+\/[\w\.]+$/i,
                  /(mozilla)\/([\w\.]+)\s.+rv\:.+gecko\/\d+/i,
                  /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
                  /(links)\s\(([\w\.]+)/i,
                  /(gobrowser)\/?([\w\.]*)/i,
                  /(ice\s?browser)\/v?([\w\._]+)/i,
                  /(mosaic)[\/\s]([\w\.]+)/i,
                ],
                [l, d],
              ],
              cpu: [
                [/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],
                [[f, 'amd64']],
                [/(ia32(?=;))/i],
                [[f, g.lowerize]],
                [/((?:i[346]|x)86)[;\)]/i],
                [[f, 'ia32']],
                [/windows\s(ce|mobile);\sppc;/i],
                [[f, 'arm']],
                [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],
                [[f, /ower/, '', g.lowerize]],
                [/(sun4\w)[;\)]/i],
                [[f, 'sparc']],
                [
                  /((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i,
                ],
                [[f, g.lowerize]],
              ],
              device: [
                [/\((ipad|playbook);[\w\s\),;-]+(rim|apple)/i],
                [c, p, [h, _]],
                [/applecoremedia\/[\w\.]+ \((ipad)/],
                [c, [p, 'Apple'], [h, _]],
                [/(apple\s{0,1}tv)/i],
                [
                  [c, 'Apple TV'],
                  [p, 'Apple'],
                  [h, v],
                ],
                [
                  /(archos)\s(gamepad2?)/i,
                  /(hp).+(touchpad)/i,
                  /(hp).+(tablet)/i,
                  /(kindle)\/([\w\.]+)/i,
                  /\s(nook)[\w\s]+build\/(\w+)/i,
                  /(dell)\s(strea[kpr\s\d]*[\dko])/i,
                ],
                [p, c, [h, _]],
                [/(kf[A-z]+)(\sbuild\/|\)).+silk\//i],
                [c, [p, 'Amazon'], [h, _]],
                [/(sd|kf)[0349hijorstuw]+(\sbuild\/|\)).+silk\//i],
                [
                  [c, y.str, x.device.amazon.model],
                  [p, 'Amazon'],
                  [h, m],
                ],
                [/android.+aft([bms])\sbuild/i],
                [c, [p, 'Amazon'], [h, v]],
                [/\((ip[honed|\s\w*]+);.+(apple)/i],
                [c, p, [h, m]],
                [/\((ip[honed|\s\w*]+);/i],
                [c, [p, 'Apple'], [h, m]],
                [
                  /(blackberry)[\s-]?(\w+)/i,
                  /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,
                  /(hp)\s([\w\s]+\w)/i,
                  /(asus)-?(\w+)/i,
                ],
                [p, c, [h, m]],
                [/\(bb10;\s(\w+)/i],
                [c, [p, 'BlackBerry'], [h, m]],
                [/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone|p00c)/i],
                [c, [p, 'Asus'], [h, _]],
                [/(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i],
                [
                  [p, 'Sony'],
                  [c, 'Xperia Tablet'],
                  [h, _],
                ],
                [/android.+\s([c-g]\d{4}|so[-l]\w+)(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i],
                [c, [p, 'Sony'], [h, m]],
                [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i],
                [p, c, [h, w]],
                [/android.+;\s(shield)\sbuild/i],
                [c, [p, 'Nvidia'], [h, w]],
                [/(playstation\s[34portablevi]+)/i],
                [c, [p, 'Sony'], [h, w]],
                [/(sprint\s(\w+))/i],
                [
                  [p, y.str, x.device.sprint.vendor],
                  [c, y.str, x.device.sprint.model],
                  [h, m],
                ],
                [
                  /(htc)[;_\s-]{1,2}([\w\s]+(?=\)|\sbuild)|\w+)/i,
                  /(zte)-(\w*)/i,
                  /(alcatel|geeksphone|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i,
                ],
                [p, [c, /_/g, ' '], [h, m]],
                [/(nexus\s9)/i],
                [c, [p, 'HTC'], [h, _]],
                [
                  /d\/huawei([\w\s-]+)[;\)]/i,
                  /android.+\s(nexus\s6p|vog-[at]?l\d\d|ane-[at]?l[x\d]\d|eml-a?l\d\da?|lya-[at]?l\d[\dc]|clt-a?l\d\di?)/i,
                ],
                [c, [p, 'Huawei'], [h, m]],
                [/android.+(bah2?-a?[lw]\d{2})/i],
                [c, [p, 'Huawei'], [h, _]],
                [/(microsoft);\s(lumia[\s\w]+)/i],
                [p, c, [h, m]],
                [/[\s\(;](xbox(?:\sone)?)[\s\);]/i],
                [c, [p, 'Microsoft'], [h, w]],
                [/(kin\.[onetw]{3})/i],
                [
                  [c, /\./g, ' '],
                  [p, 'Microsoft'],
                  [h, m],
                ],
                [
                  /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i,
                  /mot[\s-]?(\w*)/i,
                  /(XT\d{3,4}) build\//i,
                  /(nexus\s6)/i,
                ],
                [c, [p, 'Motorola'], [h, m]],
                [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],
                [c, [p, 'Motorola'], [h, _]],
                [/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i],
                [
                  [p, g.trim],
                  [c, g.trim],
                  [h, v],
                ],
                [/hbbtv.+maple;(\d+)/i],
                [
                  [c, /^/, 'SmartTV'],
                  [p, 'Samsung'],
                  [h, v],
                ],
                [/\(dtv[\);].+(aquos)/i],
                [c, [p, 'Sharp'], [h, v]],
                [
                  /android.+((sch-i[89]0\d|shw-m380s|SM-P605|SM-P610|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,
                  /((SM-T\w+))/i,
                ],
                [[p, 'Samsung'], c, [h, _]],
                [/smart-tv.+(samsung)/i],
                [p, [h, v], c],
                [
                  /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,
                  /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i,
                  /sec-((sgh\w+))/i,
                ],
                [[p, 'Samsung'], c, [h, m]],
                [/sie-(\w*)/i],
                [c, [p, 'Siemens'], [h, m]],
                [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]*)/i],
                [[p, 'Nokia'], c, [h, m]],
                [/android[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i],
                [c, [p, 'Acer'], [h, _]],
                [/android.+([vl]k\-?\d{3})\s+build/i],
                [c, [p, 'LG'], [h, _]],
                [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],
                [[p, 'LG'], c, [h, _]],
                [/linux;\snetcast.+smarttv/i, /lg\snetcast\.tv-201\d/i],
                [[p, 'LG'], c, [h, v]],
                [/(nexus\s[45])/i, /lg[e;\s\/-]+(\w*)/i, /android.+lg(\-?[\d\w]+)\s+build/i],
                [c, [p, 'LG'], [h, m]],
                [/(lenovo)\s?(s(?:5000|6000)(?:[\w-]+)|tab(?:[\s\w]+))/i],
                [p, c, [h, _]],
                [/android.+(ideatab[a-z0-9\-\s]+)/i],
                [c, [p, 'Lenovo'], [h, _]],
                [/(lenovo)[_\s-]?([\w-]+)/i],
                [p, c, [h, m]],
                [/linux;.+((jolla));/i],
                [p, c, [h, m]],
                [/((pebble))app\/[\d\.]+\s/i],
                [p, c, [h, b]],
                [/android.+;\s(oppo)\s?([\w\s]+)\sbuild/i],
                [p, c, [h, m]],
                [/crkey/i],
                [
                  [c, 'Chromecast'],
                  [p, 'Google'],
                  [h, v],
                ],
                [/android.+;\s(glass)\s\d/i],
                [c, [p, 'Google'], [h, b]],
                [/android.+;\s(pixel c)[\s)]/i],
                [c, [p, 'Google'], [h, _]],
                [/android.+;\s(pixel( [2-9]a?)?( xl)?)[\s)]/i],
                [c, [p, 'Google'], [h, m]],
                [
                  /android.+;\s(\w+)\s+build\/hm\1/i,
                  /android.+(hm[\s\-_]?note?[\s_]?(?:\d\w)?)\sbuild/i,
                  /android.+(redmi[\s\-_]?(?:note|k)?(?:[\s_]?[\w\s]+))(?:\sbuild|\))/i,
                  /android.+(mi[\s\-_]?(?:a\d|one|one[\s_]plus|note lte)?[\s_]?(?:\d?\w?)[\s_]?(?:plus)?)\sbuild/i,
                ],
                [
                  [c, /_/g, ' '],
                  [p, 'Xiaomi'],
                  [h, m],
                ],
                [/android.+(mi[\s\-_]?(?:pad)(?:[\s_]?[\w\s]+))(?:\sbuild|\))/i],
                [
                  [c, /_/g, ' '],
                  [p, 'Xiaomi'],
                  [h, _],
                ],
                [/android.+;\s(m[1-5]\snote)\sbuild/i],
                [c, [p, 'Meizu'], [h, m]],
                [/(mz)-([\w-]{2,})/i],
                [[p, 'Meizu'], c, [h, m]],
                [/android.+a000(1)\s+build/i, /android.+oneplus\s(a\d{4})[\s)]/i],
                [c, [p, 'OnePlus'], [h, m]],
                [/android.+[;\/]\s*(RCT[\d\w]+)\s+build/i],
                [c, [p, 'RCA'], [h, _]],
                [/android.+[;\/\s](Venue[\d\s]{2,7})\s+build/i],
                [c, [p, 'Dell'], [h, _]],
                [/android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i],
                [c, [p, 'Verizon'], [h, _]],
                [/android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i],
                [[p, 'Barnes & Noble'], c, [h, _]],
                [/android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i],
                [c, [p, 'NuVision'], [h, _]],
                [/android.+;\s(k88)\sbuild/i],
                [c, [p, 'ZTE'], [h, _]],
                [/android.+[;\/]\s*(gen\d{3})\s+build.*49h/i],
                [c, [p, 'Swiss'], [h, m]],
                [/android.+[;\/]\s*(zur\d{3})\s+build/i],
                [c, [p, 'Swiss'], [h, _]],
                [/android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i],
                [c, [p, 'Zeki'], [h, _]],
                [
                  /(android).+[;\/]\s+([YR]\d{2})\s+build/i,
                  /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i,
                ],
                [[p, 'Dragon Touch'], c, [h, _]],
                [/android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i],
                [c, [p, 'Insignia'], [h, _]],
                [/android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i],
                [c, [p, 'NextBook'], [h, _]],
                [/android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i],
                [[p, 'Voice'], c, [h, m]],
                [/android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i],
                [[p, 'LvTel'], c, [h, m]],
                [/android.+;\s(PH-1)\s/i],
                [c, [p, 'Essential'], [h, m]],
                [/android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i],
                [c, [p, 'Envizen'], [h, _]],
                [/android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i],
                [p, c, [h, _]],
                [/android.+[;\/]\s*(Trio[\s\w\-\.]+)\s+build/i],
                [c, [p, 'MachSpeed'], [h, _]],
                [/android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i],
                [p, c, [h, _]],
                [/android.+[;\/]\s*TU_(1491)\s+build/i],
                [c, [p, 'Rotor'], [h, _]],
                [/android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i],
                [p, c, [h, _]],
                [/android .+?; ([^;]+?)(?: build|\) applewebkit).+? mobile safari/i],
                [c, [h, m]],
                [/android .+?;\s([^;]+?)(?: build|\) applewebkit).+?(?! mobile) safari/i],
                [c, [h, _]],
                [/\s(tablet|tab)[;\/]/i, /\s(mobile)(?:[;\/]|\ssafari)/i],
                [[h, g.lowerize], p, c],
                [/[\s\/\(](smart-?tv)[;\)]/i],
                [[h, v]],
                [/(android[\w\.\s\-]{0,9});.+build/i],
                [c, [p, 'Generic']],
              ],
              engine: [
                [/windows.+\sedge\/([\w\.]+)/i],
                [d, [l, 'EdgeHTML']],
                [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
                [d, [l, 'Blink']],
                [
                  /(presto)\/([\w\.]+)/i,
                  /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
                  /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,
                  /(icab)[\/\s]([23]\.[\d\.]+)/i,
                ],
                [l, d],
                [/rv\:([\w\.]{1,9}).+(gecko)/i],
                [d, l],
              ],
              os: [
                [/microsoft\s(windows)\s(vista|xp)/i],
                [l, d],
                [
                  /(windows)\snt\s6\.2;\s(arm)/i,
                  /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,
                  /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i,
                ],
                [l, [d, y.str, x.os.windows.version]],
                [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],
                [
                  [l, 'Windows'],
                  [d, y.str, x.os.windows.version],
                ],
                [/\((bb)(10);/i],
                [[l, 'BlackBerry'], d],
                [
                  /(blackberry)\w*\/?([\w\.]*)/i,
                  /(tizen|kaios)[\/\s]([\w\.]+)/i,
                  /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i,
                ],
                [l, d],
                [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i],
                [[l, 'Symbian'], d],
                [/\((series40);/i],
                [l],
                [/mozilla.+\(mobile;.+gecko.+firefox/i],
                [[l, 'Firefox OS'], d],
                [/crkey\/([\d\.]+)/i],
                [d, [l, 'Chromecast']],
                [
                  /(nintendo|playstation)\s([wids34portablevu]+)/i,
                  /(mint)[\/\s\(]?(\w*)/i,
                  /(mageia|vectorlinux)[;\s]/i,
                  /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i,
                  /(hurd|linux)\s?([\w\.]*)/i,
                  /(gnu)\s?([\w\.]*)/i,
                ],
                [l, d],
                [/(cros)\s[\w]+\s([\w\.]+\w)/i],
                [[l, 'Chromium OS'], d],
                [/(sunos)\s?([\w\.\d]*)/i],
                [[l, 'Solaris'], d],
                [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i],
                [l, d],
                [/(haiku)\s(\w+)/i],
                [l, d],
                [/cfnetwork\/.+darwin/i, /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i],
                [
                  [d, /_/g, '.'],
                  [l, 'iOS'],
                ],
                [/(mac\sos\sx)\s?([\w\s\.]*)/i, /(macintosh|mac(?=_powerpc)\s)/i],
                [
                  [l, 'Mac OS'],
                  [d, /_/g, '.'],
                ],
                [
                  /((?:open)?solaris)[\/\s-]?([\w\.]*)/i,
                  /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,
                  /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i,
                  /(unix)\s?([\w\.]*)/i,
                ],
                [l, d],
              ],
            },
            k = function (e, t) {
              if (('object' == typeof e && ((t = e), (e = i)), !(this instanceof k)))
                return new k(e, t).getResult();
              var n = e || (o && o.navigator && o.navigator.userAgent ? o.navigator.userAgent : ''),
                r = t ? g.extend(E, t) : E;
              return (
                (this.getBrowser = function () {
                  var e = { name: i, version: i };
                  return y.rgx.call(e, n, r.browser), (e.major = g.major(e.version)), e;
                }),
                (this.getCPU = function () {
                  var e = { architecture: i };
                  return y.rgx.call(e, n, r.cpu), e;
                }),
                (this.getDevice = function () {
                  var e = { vendor: i, model: i, type: i };
                  return y.rgx.call(e, n, r.device), e;
                }),
                (this.getEngine = function () {
                  var e = { name: i, version: i };
                  return y.rgx.call(e, n, r.engine), e;
                }),
                (this.getOS = function () {
                  var e = { name: i, version: i };
                  return y.rgx.call(e, n, r.os), e;
                }),
                (this.getResult = function () {
                  return {
                    ua: this.getUA(),
                    browser: this.getBrowser(),
                    engine: this.getEngine(),
                    os: this.getOS(),
                    device: this.getDevice(),
                    cpu: this.getCPU(),
                  };
                }),
                (this.getUA = function () {
                  return n;
                }),
                (this.setUA = function (e) {
                  return (n = e), this;
                }),
                this
              );
            };
          (k.VERSION = '0.7.23'),
            (k.BROWSER = { NAME: l, MAJOR: 'major', VERSION: d }),
            (k.CPU = { ARCHITECTURE: f }),
            (k.DEVICE = {
              MODEL: c,
              VENDOR: p,
              TYPE: h,
              CONSOLE: w,
              MOBILE: m,
              SMARTTV: v,
              TABLET: _,
              WEARABLE: b,
              EMBEDDED: 'embedded',
            }),
            (k.ENGINE = { NAME: l, VERSION: d }),
            (k.OS = { NAME: l, VERSION: d }),
            typeof t !== a
              ? (e.exports && (t = e.exports = k), (t.UAParser = k))
              : (r = function () {
                  return k;
                }.call(t, n, t, e)) === i || (e.exports = r);
          var O = o && (o.jQuery || o.Zepto);
          if (O && !O.ua) {
            var A = new k();
            (O.ua = A.getResult()),
              (O.ua.get = function () {
                return A.getUA();
              }),
              (O.ua.set = function (e) {
                A.setUA(e);
                var t = A.getResult();
                for (var n in t) O.ua[n] = t[n];
              });
          }
        })('object' == typeof window ? window : this);
      },
      511: function (e, t, n) {
        var r;
        (e = n.nmd(e)),
          (function (o) {
            t && t.nodeType, e && e.nodeType;
            var i = 'object' == typeof n.g && n.g;
            i.global !== i && i.window !== i && i.self;
            var s,
              a = 2147483647,
              u = 36,
              c = /^xn--/,
              l = /[^\x20-\x7E]/,
              h = /[\x2E\u3002\uFF0E\uFF61]/g,
              p = {
                overflow: 'Overflow: input needs wider integers to process',
                'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
                'invalid-input': 'Invalid input',
              },
              d = Math.floor,
              f = String.fromCharCode;
            function w(e) {
              throw RangeError(p[e]);
            }
            function m(e, t) {
              for (var n = e.length, r = []; n--; ) r[n] = t(e[n]);
              return r;
            }
            function _(e, t) {
              var n = e.split('@'),
                r = '';
              return (
                n.length > 1 && ((r = n[0] + '@'), (e = n[1])),
                r + m((e = e.replace(h, '.')).split('.'), t).join('.')
              );
            }
            function v(e) {
              for (var t, n, r = [], o = 0, i = e.length; o < i; )
                (t = e.charCodeAt(o++)) >= 55296 && t <= 56319 && o < i
                  ? 56320 == (64512 & (n = e.charCodeAt(o++)))
                    ? r.push(((1023 & t) << 10) + (1023 & n) + 65536)
                    : (r.push(t), o--)
                  : r.push(t);
              return r;
            }
            function b(e) {
              return m(e, function (e) {
                var t = '';
                return (
                  e > 65535 &&
                    ((t += f((((e -= 65536) >>> 10) & 1023) | 55296)), (e = 56320 | (1023 & e))),
                  (t += f(e))
                );
              }).join('');
            }
            function g(e, t) {
              return e + 22 + 75 * (e < 26) - ((0 != t) << 5);
            }
            function y(e, t, n) {
              var r = 0;
              for (e = n ? d(e / 700) : e >> 1, e += d(e / t); e > 455; r += u) e = d(e / 35);
              return d(r + (36 * e) / (e + 38));
            }
            function x(e) {
              var t,
                n,
                r,
                o,
                i,
                s,
                c,
                l,
                h,
                p,
                f,
                m = [],
                _ = e.length,
                v = 0,
                g = 128,
                x = 72;
              for ((n = e.lastIndexOf('-')) < 0 && (n = 0), r = 0; r < n; ++r)
                e.charCodeAt(r) >= 128 && w('not-basic'), m.push(e.charCodeAt(r));
              for (o = n > 0 ? n + 1 : 0; o < _; ) {
                for (
                  i = v, s = 1, c = u;
                  o >= _ && w('invalid-input'),
                    ((l =
                      (f = e.charCodeAt(o++)) - 48 < 10
                        ? f - 22
                        : f - 65 < 26
                          ? f - 65
                          : f - 97 < 26
                            ? f - 97
                            : u) >= u ||
                      l > d((a - v) / s)) &&
                      w('overflow'),
                    (v += l * s),
                    !(l < (h = c <= x ? 1 : c >= x + 26 ? 26 : c - x));
                  c += u
                )
                  s > d(a / (p = u - h)) && w('overflow'), (s *= p);
                (x = y(v - i, (t = m.length + 1), 0 == i)),
                  d(v / t) > a - g && w('overflow'),
                  (g += d(v / t)),
                  (v %= t),
                  m.splice(v++, 0, g);
              }
              return b(m);
            }
            function E(e) {
              var t,
                n,
                r,
                o,
                i,
                s,
                c,
                l,
                h,
                p,
                m,
                _,
                b,
                x,
                E,
                k = [];
              for (_ = (e = v(e)).length, t = 128, n = 0, i = 72, s = 0; s < _; ++s)
                (m = e[s]) < 128 && k.push(f(m));
              for (r = o = k.length, o && k.push('-'); r < _; ) {
                for (c = a, s = 0; s < _; ++s) (m = e[s]) >= t && m < c && (c = m);
                for (
                  c - t > d((a - n) / (b = r + 1)) && w('overflow'), n += (c - t) * b, t = c, s = 0;
                  s < _;
                  ++s
                )
                  if (((m = e[s]) < t && ++n > a && w('overflow'), m == t)) {
                    for (l = n, h = u; !(l < (p = h <= i ? 1 : h >= i + 26 ? 26 : h - i)); h += u)
                      (E = l - p), (x = u - p), k.push(f(g(p + (E % x), 0))), (l = d(E / x));
                    k.push(f(g(l, 0))), (i = y(n, b, r == o)), (n = 0), ++r;
                  }
                ++n, ++t;
              }
              return k.join('');
            }
            (s = {
              version: '1.3.2',
              ucs2: { decode: v, encode: b },
              decode: x,
              encode: E,
              toASCII: function (e) {
                return _(e, function (e) {
                  return l.test(e) ? 'xn--' + E(e) : e;
                });
              },
              toUnicode: function (e) {
                return _(e, function (e) {
                  return c.test(e) ? x(e.slice(4).toLowerCase()) : e;
                });
              },
            }),
              void 0 ===
                (r = function () {
                  return s;
                }.call(t, n, t, e)) || (e.exports = r);
          })();
      },
      575: function (e, t, n) {
        'use strict';
        var r = n(511),
          o = n(502);
        function i() {
          (this.protocol = null),
            (this.slashes = null),
            (this.auth = null),
            (this.host = null),
            (this.port = null),
            (this.hostname = null),
            (this.hash = null),
            (this.search = null),
            (this.query = null),
            (this.pathname = null),
            (this.path = null),
            (this.href = null);
        }
        var s = /^([a-z0-9.+-]+:)/i,
          a = /:[0-9]*$/,
          u = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
          c = ['{', '}', '|', '\\', '^', '`'].concat(['<', '>', '"', '`', ' ', '\r', '\n', '\t']),
          l = ["'"].concat(c),
          h = ['%', '/', '?', ';', '#'].concat(l),
          p = ['/', '?', '#'],
          d = /^[+a-z0-9A-Z_-]{0,63}$/,
          f = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
          w = { javascript: !0, 'javascript:': !0 },
          m = { javascript: !0, 'javascript:': !0 },
          _ = {
            http: !0,
            https: !0,
            ftp: !0,
            gopher: !0,
            file: !0,
            'http:': !0,
            'https:': !0,
            'ftp:': !0,
            'gopher:': !0,
            'file:': !0,
          },
          v = n(673);
        function b(e, t, n) {
          if (e && o.isObject(e) && e instanceof i) return e;
          var r = new i();
          return r.parse(e, t, n), r;
        }
        (i.prototype.parse = function (e, t, n) {
          if (!o.isString(e))
            throw new TypeError("Parameter 'url' must be a string, not " + typeof e);
          var i = e.indexOf('?'),
            a = -1 !== i && i < e.indexOf('#') ? '?' : '#',
            c = e.split(a);
          c[0] = c[0].replace(/\\/g, '/');
          var b = (e = c.join(a));
          if (((b = b.trim()), !n && 1 === e.split('#').length)) {
            var g = u.exec(b);
            if (g)
              return (
                (this.path = b),
                (this.href = b),
                (this.pathname = g[1]),
                g[2]
                  ? ((this.search = g[2]),
                    (this.query = t ? v.parse(this.search.substr(1)) : this.search.substr(1)))
                  : t && ((this.search = ''), (this.query = {})),
                this
              );
          }
          var y = s.exec(b);
          if (y) {
            var x = (y = y[0]).toLowerCase();
            (this.protocol = x), (b = b.substr(y.length));
          }
          if (n || y || b.match(/^\/\/[^@\/]+@[^@\/]+/)) {
            var E = '//' === b.substr(0, 2);
            !E || (y && m[y]) || ((b = b.substr(2)), (this.slashes = !0));
          }
          if (!m[y] && (E || (y && !_[y]))) {
            for (var k, O, A = -1, R = 0; R < p.length; R++) {
              -1 !== (S = b.indexOf(p[R])) && (-1 === A || S < A) && (A = S);
            }
            -1 !== (O = -1 === A ? b.lastIndexOf('@') : b.lastIndexOf('@', A)) &&
              ((k = b.slice(0, O)), (b = b.slice(O + 1)), (this.auth = decodeURIComponent(k))),
              (A = -1);
            for (R = 0; R < h.length; R++) {
              var S;
              -1 !== (S = b.indexOf(h[R])) && (-1 === A || S < A) && (A = S);
            }
            -1 === A && (A = b.length),
              (this.host = b.slice(0, A)),
              (b = b.slice(A)),
              this.parseHost(),
              (this.hostname = this.hostname || '');
            var T = '[' === this.hostname[0] && ']' === this.hostname[this.hostname.length - 1];
            if (!T)
              for (var P = this.hostname.split(/\./), q = ((R = 0), P.length); R < q; R++) {
                var j = P[R];
                if (j && !j.match(d)) {
                  for (var N = '', D = 0, I = j.length; D < I; D++)
                    j.charCodeAt(D) > 127 ? (N += 'x') : (N += j[D]);
                  if (!N.match(d)) {
                    var C = P.slice(0, R),
                      M = P.slice(R + 1),
                      L = j.match(f);
                    L && (C.push(L[1]), M.unshift(L[2])),
                      M.length && (b = '/' + M.join('.') + b),
                      (this.hostname = C.join('.'));
                    break;
                  }
                }
              }
            this.hostname.length > 255
              ? (this.hostname = '')
              : (this.hostname = this.hostname.toLowerCase()),
              T || (this.hostname = r.toASCII(this.hostname));
            var U = this.port ? ':' + this.port : '',
              B = this.hostname || '';
            (this.host = B + U),
              (this.href += this.host),
              T &&
                ((this.hostname = this.hostname.substr(1, this.hostname.length - 2)),
                '/' !== b[0] && (b = '/' + b));
          }
          if (!w[x])
            for (R = 0, q = l.length; R < q; R++) {
              var z = l[R];
              if (-1 !== b.indexOf(z)) {
                var W = encodeURIComponent(z);
                W === z && (W = escape(z)), (b = b.split(z).join(W));
              }
            }
          var F = b.indexOf('#');
          -1 !== F && ((this.hash = b.substr(F)), (b = b.slice(0, F)));
          var G = b.indexOf('?');
          if (
            (-1 !== G
              ? ((this.search = b.substr(G)),
                (this.query = b.substr(G + 1)),
                t && (this.query = v.parse(this.query)),
                (b = b.slice(0, G)))
              : t && ((this.search = ''), (this.query = {})),
            b && (this.pathname = b),
            _[x] && this.hostname && !this.pathname && (this.pathname = '/'),
            this.pathname || this.search)
          ) {
            U = this.pathname || '';
            var H = this.search || '';
            this.path = U + H;
          }
          return (this.href = this.format()), this;
        }),
          (i.prototype.format = function () {
            var e = this.auth || '';
            e && ((e = (e = encodeURIComponent(e)).replace(/%3A/i, ':')), (e += '@'));
            var t = this.protocol || '',
              n = this.pathname || '',
              r = this.hash || '',
              i = !1,
              s = '';
            this.host
              ? (i = e + this.host)
              : this.hostname &&
                ((i =
                  e +
                  (-1 === this.hostname.indexOf(':') ? this.hostname : '[' + this.hostname + ']')),
                this.port && (i += ':' + this.port)),
              this.query &&
                o.isObject(this.query) &&
                Object.keys(this.query).length &&
                (s = v.stringify(this.query));
            var a = this.search || (s && '?' + s) || '';
            return (
              t && ':' !== t.substr(-1) && (t += ':'),
              this.slashes || ((!t || _[t]) && !1 !== i)
                ? ((i = '//' + (i || '')), n && '/' !== n.charAt(0) && (n = '/' + n))
                : i || (i = ''),
              r && '#' !== r.charAt(0) && (r = '#' + r),
              a && '?' !== a.charAt(0) && (a = '?' + a),
              t +
                i +
                (n = n.replace(/[?#]/g, function (e) {
                  return encodeURIComponent(e);
                })) +
                (a = a.replace('#', '%23')) +
                r
            );
          }),
          (i.prototype.resolve = function (e) {
            return this.resolveObject(b(e, !1, !0)).format();
          }),
          (i.prototype.resolveObject = function (e) {
            if (o.isString(e)) {
              var t = new i();
              t.parse(e, !1, !0), (e = t);
            }
            for (var n = new i(), r = Object.keys(this), s = 0; s < r.length; s++) {
              var a = r[s];
              n[a] = this[a];
            }
            if (((n.hash = e.hash), '' === e.href)) return (n.href = n.format()), n;
            if (e.slashes && !e.protocol) {
              for (var u = Object.keys(e), c = 0; c < u.length; c++) {
                var l = u[c];
                'protocol' !== l && (n[l] = e[l]);
              }
              return (
                _[n.protocol] && n.hostname && !n.pathname && (n.path = n.pathname = '/'),
                (n.href = n.format()),
                n
              );
            }
            if (e.protocol && e.protocol !== n.protocol) {
              if (!_[e.protocol]) {
                for (var h = Object.keys(e), p = 0; p < h.length; p++) {
                  var d = h[p];
                  n[d] = e[d];
                }
                return (n.href = n.format()), n;
              }
              if (((n.protocol = e.protocol), e.host || m[e.protocol])) n.pathname = e.pathname;
              else {
                for (var f = (e.pathname || '').split('/'); f.length && !(e.host = f.shift()); );
                e.host || (e.host = ''),
                  e.hostname || (e.hostname = ''),
                  '' !== f[0] && f.unshift(''),
                  f.length < 2 && f.unshift(''),
                  (n.pathname = f.join('/'));
              }
              if (
                ((n.search = e.search),
                (n.query = e.query),
                (n.host = e.host || ''),
                (n.auth = e.auth),
                (n.hostname = e.hostname || e.host),
                (n.port = e.port),
                n.pathname || n.search)
              ) {
                var w = n.pathname || '',
                  v = n.search || '';
                n.path = w + v;
              }
              return (n.slashes = n.slashes || e.slashes), (n.href = n.format()), n;
            }
            var b = n.pathname && '/' === n.pathname.charAt(0),
              g = e.host || (e.pathname && '/' === e.pathname.charAt(0)),
              y = g || b || (n.host && e.pathname),
              x = y,
              E = (n.pathname && n.pathname.split('/')) || [],
              k = ((f = (e.pathname && e.pathname.split('/')) || []), n.protocol && !_[n.protocol]);
            if (
              (k &&
                ((n.hostname = ''),
                (n.port = null),
                n.host && ('' === E[0] ? (E[0] = n.host) : E.unshift(n.host)),
                (n.host = ''),
                e.protocol &&
                  ((e.hostname = null),
                  (e.port = null),
                  e.host && ('' === f[0] ? (f[0] = e.host) : f.unshift(e.host)),
                  (e.host = null)),
                (y = y && ('' === f[0] || '' === E[0]))),
              g)
            )
              (n.host = e.host || '' === e.host ? e.host : n.host),
                (n.hostname = e.hostname || '' === e.hostname ? e.hostname : n.hostname),
                (n.search = e.search),
                (n.query = e.query),
                (E = f);
            else if (f.length)
              E || (E = []), E.pop(), (E = E.concat(f)), (n.search = e.search), (n.query = e.query);
            else if (!o.isNullOrUndefined(e.search)) {
              if (k)
                (n.hostname = n.host = E.shift()),
                  (T = !!(n.host && n.host.indexOf('@') > 0) && n.host.split('@')) &&
                    ((n.auth = T.shift()), (n.host = n.hostname = T.shift()));
              return (
                (n.search = e.search),
                (n.query = e.query),
                (o.isNull(n.pathname) && o.isNull(n.search)) ||
                  (n.path = (n.pathname ? n.pathname : '') + (n.search ? n.search : '')),
                (n.href = n.format()),
                n
              );
            }
            if (!E.length)
              return (
                (n.pathname = null),
                n.search ? (n.path = '/' + n.search) : (n.path = null),
                (n.href = n.format()),
                n
              );
            for (
              var O = E.slice(-1)[0],
                A = ((n.host || e.host || E.length > 1) && ('.' === O || '..' === O)) || '' === O,
                R = 0,
                S = E.length;
              S >= 0;
              S--
            )
              '.' === (O = E[S])
                ? E.splice(S, 1)
                : '..' === O
                  ? (E.splice(S, 1), R++)
                  : R && (E.splice(S, 1), R--);
            if (!y && !x) for (; R--; R) E.unshift('..');
            !y || '' === E[0] || (E[0] && '/' === E[0].charAt(0)) || E.unshift(''),
              A && '/' !== E.join('/').substr(-1) && E.push('');
            var T,
              P = '' === E[0] || (E[0] && '/' === E[0].charAt(0));
            k &&
              ((n.hostname = n.host = P ? '' : E.length ? E.shift() : ''),
              (T = !!(n.host && n.host.indexOf('@') > 0) && n.host.split('@')) &&
                ((n.auth = T.shift()), (n.host = n.hostname = T.shift())));
            return (
              (y = y || (n.host && E.length)) && !P && E.unshift(''),
              E.length ? (n.pathname = E.join('/')) : ((n.pathname = null), (n.path = null)),
              (o.isNull(n.pathname) && o.isNull(n.search)) ||
                (n.path = (n.pathname ? n.pathname : '') + (n.search ? n.search : '')),
              (n.auth = e.auth || n.auth),
              (n.slashes = n.slashes || e.slashes),
              (n.href = n.format()),
              n
            );
          }),
          (i.prototype.parseHost = function () {
            var e = this.host,
              t = a.exec(e);
            t &&
              (':' !== (t = t[0]) && (this.port = t.substr(1)),
              (e = e.substr(0, e.length - t.length))),
              e && (this.hostname = e);
          });
      },
      502: function (e) {
        'use strict';
        e.exports = {
          isString: function (e) {
            return 'string' == typeof e;
          },
          isObject: function (e) {
            return 'object' == typeof e && null !== e;
          },
          isNull: function (e) {
            return null === e;
          },
          isNullOrUndefined: function (e) {
            return null == e;
          },
        };
      },
      813: function (e, t, n) {
        'use strict';
        e.exports = n.p + 'images/unsupported-browser.jpg';
      },
      955: function (e) {
        'use strict';
        e.exports =
          "class ಠ_ಠ extends Array {\n  constructor(j = `a`, ...c) {\n    const q = (({ u: e }) => {\n      return { [`${c}`]: Symbol(j) };\n    })({});\n    super(j, q, ...c);\n  }\n}\nnew Promise((f) => {\n  const a = function* () {\n    return '\\\\u{20BB7}'.match(/./u)[0].length === 2 || !0\n  }\n  for (let z of a()) {\n    const [x, y, w, k] = [new Set(), new WeakSet(), new Map(), new WeakMap()]\n    break\n  }\n  f(new Proxy({}, { get: (h, i) => (i in h ? h[i] : 'j'.repeat(0o2)) }))\n}).then((t) => new ಠ_ಠ(t.d))\n";
      },
      578: function (e) {
        'use strict';
        e.exports =
          "<div id='unsupported-browser-container'>\n  <div id='unsupported-problem'>\n    WebGL requires a modern browser.\n  </div>\n  <div id='unsupported-solution'>\n    Install a new browser to explore in 3D.\n    <a href=\"https://support.matterport.com/s/article/Workshop-System-Requirements\" target=\"_blank\">Learn more</a>.\n  </div>\n  <div id='browsers'>\n    <a href='https://www.mozilla.org/en-US/firefox/new/' target='_blank' rel='noopener'>\n      <div class='browser'>\n        <img src='images/firefox.png'>\n      </div>\n    </a>\n    <a href='https://www.microsoft.com/en-us/edge' target='_blank' rel='noopener'>\n      <div class='browser'>\n        <img src='images/edge.png'>\n      </div>\n    </a>\n    <a href='https://support.apple.com/en-us/HT204416' target='_blank' rel='noopener'>\n      <div class='browser'>\n        <img src='images/safari.png'>\n      </div>\n    </a>\n    <a href='https://www.google.com/chrome/browser/' target='_blank' rel='noopener'>\n      <div class='browser'>\n        <img src='images/chrome.png'>\n      </div>\n    </a>\n  </div>\n</div>\n<div id='powered-by'>\n  <div>Powered by</div>\n  <img src='images/matterport-logo-light.svg'></img>\n</div>\n";
      },
    },
    __webpack_module_cache__ = {};
  function __webpack_require__(e) {
    var t = __webpack_module_cache__[e];
    if (void 0 !== t) return t.exports;
    var n = (__webpack_module_cache__[e] = { id: e, loaded: !1, exports: {} });
    return (
      __webpack_modules__[e].call(n.exports, n, n.exports, __webpack_require__),
      (n.loaded = !0),
      n.exports
    );
  }
  (__webpack_require__.n = function (e) {
    var t =
      e && e.__esModule
        ? function () {
            return e.default;
          }
        : function () {
            return e;
          };
    return __webpack_require__.d(t, { a: t }), t;
  }),
    (__webpack_require__.d = function (e, t) {
      for (var n in t)
        __webpack_require__.o(t, n) &&
          !__webpack_require__.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }),
    (__webpack_require__.g = (function () {
      if ('object' == typeof globalThis) return globalThis;
      try {
        return this || new Function('return this')();
      } catch (e) {
        if ('object' == typeof window) return window;
      }
    })()),
    (__webpack_require__.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (__webpack_require__.r = function (e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (__webpack_require__.nmd = function (e) {
      return (e.paths = []), e.children || (e.children = []), e;
    }),
    (function () {
      var e;
      __webpack_require__.g.importScripts && (e = __webpack_require__.g.location + '');
      var t = __webpack_require__.g.document;
      if (!e && t && (t.currentScript && (e = t.currentScript.src), !e)) {
        var n = t.getElementsByTagName('script');
        n.length && (e = n[n.length - 1].src);
      }
      if (!e) throw new Error('Automatic publicPath is not supported in this browser');
      (e = e
        .replace(/#.*$/, '')
        .replace(/\?.*$/, '')
        .replace(/\/[^\/]+$/, '/')),
        (__webpack_require__.p = e + '../');
    })();
  var __webpack_exports__ = {};
  !(function () {
    'use strict';
    __webpack_require__.r(__webpack_exports__),
      __webpack_require__.d(__webpack_exports__, {
        displayErrorPage: function () {
          return displayErrorPage;
        },
        supported: function () {
          return supported;
        },
      });
    var _css_unsupported_browser_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(37),
      _unsupported_browser_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(578),
      _images_unsupported_browser_jpg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(813),
      _es6check_jscheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(955),
      _analytics__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(665),
      _mockUnsupported__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(772),
      es6_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(702),
      es6_promise__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(
        es6_promise__WEBPACK_IMPORTED_MODULE_1__,
      ),
      cwf_modules_locale_getCurrentLanguage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(570),
      cwf_modules_locale_settings__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(477),
      cwf_util_urlParams__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(55);
    function supported() {
      if ((0, _mockUnsupported__WEBPACK_IMPORTED_MODULE_2__.Z)()) return !1;
      if (!('customElements' in window)) return !1;
      try {
        return eval(_es6check_jscheck__WEBPACK_IMPORTED_MODULE_3__), !0;
      } catch (e) {
        return !1;
      }
    }
    function displayErrorPage(e, t, n, r) {
      void 0 === t && (t = document),
        void 0 === n && (n = ''),
        void 0 === r && (r = (0, cwf_util_urlParams__WEBPACK_IMPORTED_MODULE_4__.FU)()),
        (0, es6_promise__WEBPACK_IMPORTED_MODULE_1__.polyfill)();
      var o = t.querySelector('#unsupported-browser');
      (o.innerHTML = _unsupported_browser_html__WEBPACK_IMPORTED_MODULE_5__.replace(
        /(src)='/g,
        "$1='".concat(n),
      )),
        o.setAttribute(
          'style',
          'background-image: url("'.concat(
            _images_unsupported_browser_jpg__WEBPACK_IMPORTED_MODULE_6__,
            '");',
          ),
        ),
        o.removeAttribute('class');
      var i = (0, cwf_modules_locale_getCurrentLanguage__WEBPACK_IMPORTED_MODULE_7__.W)(!1);
      if (
        ((0, _analytics__WEBPACK_IMPORTED_MODULE_8__.Z)(e, i, r),
        i !== cwf_modules_locale_settings__WEBPACK_IMPORTED_MODULE_9__.k$)
      ) {
        var s = ''.concat(i, '.json'),
          a = new XMLHttpRequest();
        a.addEventListener('load', function () {
          var e = JSON.parse(this.responseText);
          if (e.ERROR_BROWSER_SOLUTION && e.ERROR_BROWSER_EXPLANATION) {
            t.querySelector('#unsupported-problem').textContent = e.ERROR_BROWSER_EXPLANATION;
            var n = t.querySelector('#unsupported-solution');
            (n.textContent = e.ERROR_BROWSER_SOLUTION),
              (n.innerHTML = ''
                .concat(
                  n.textContent,
                  ' <a href="https://support.matterport.com/s/article/Workshop-System-Requirements" target="_blank">',
                )
                .concat(e.LEARN_MORE, '</a>.'));
          }
        }),
          a.open('GET', 'locale/messages/strings_' + s),
          a.send();
      }
    }
  })(),
    (mpBrowserCheck = __webpack_exports__);
})();
