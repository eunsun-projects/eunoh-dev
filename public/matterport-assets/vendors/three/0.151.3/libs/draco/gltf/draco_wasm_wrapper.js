var $jscomp = $jscomp || {};
($jscomp.scope = {}),
  ($jscomp.arrayIteratorImpl = function (t) {
    var e = 0;
    return function () {
      return e < t.length ? { done: !1, value: t[e++] } : { done: !0 };
    };
  }),
  ($jscomp.arrayIterator = function (t) {
    return { next: $jscomp.arrayIteratorImpl(t) };
  }),
  ($jscomp.makeIterator = function (t) {
    var e = 'undefined' != typeof Symbol && Symbol.iterator && t[Symbol.iterator];
    return e ? e.call(t) : $jscomp.arrayIterator(t);
  }),
  ($jscomp.ASSUME_ES5 = !1),
  ($jscomp.ASSUME_NO_NATIVE_MAP = !1),
  ($jscomp.ASSUME_NO_NATIVE_SET = !1),
  ($jscomp.SIMPLE_FROUND_POLYFILL = !1),
  ($jscomp.ISOLATE_POLYFILLS = !1),
  ($jscomp.FORCE_POLYFILL_PROMISE = !1),
  ($jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1),
  ($jscomp.getGlobal = function (t) {
    t = [
      'object' == typeof globalThis && globalThis,
      t,
      'object' == typeof window && window,
      'object' == typeof self && self,
      'object' == typeof global && global,
    ];
    for (var e = 0; e < t.length; ++e) {
      var r = t[e];
      if (r && r.Math == Math) return r;
    }
    throw Error('Cannot find global object');
  }),
  ($jscomp.global = $jscomp.getGlobal(this)),
  ($jscomp.defineProperty =
    $jscomp.ASSUME_ES5 || 'function' == typeof Object.defineProperties
      ? Object.defineProperty
      : function (t, e, r) {
          return t == Array.prototype || t == Object.prototype || (t[e] = r.value), t;
        }),
  ($jscomp.IS_SYMBOL_NATIVE = 'function' == typeof Symbol && 'symbol' == typeof Symbol('x')),
  ($jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE),
  ($jscomp.polyfills = {}),
  ($jscomp.propertyToPolyfillSymbol = {}),
  ($jscomp.POLYFILL_PREFIX = '$jscp$');
var $jscomp$lookupPolyfilledValue = function (t, e) {
  var r = $jscomp.propertyToPolyfillSymbol[e];
  return null == r ? t[e] : void 0 !== (r = t[r]) ? r : t[e];
};
($jscomp.polyfill = function (t, e, r, n) {
  e &&
    ($jscomp.ISOLATE_POLYFILLS
      ? $jscomp.polyfillIsolated(t, e, r, n)
      : $jscomp.polyfillUnisolated(t, e, r, n));
}),
  ($jscomp.polyfillUnisolated = function (t, e, r, n) {
    for (r = $jscomp.global, t = t.split('.'), n = 0; n < t.length - 1; n++) {
      var o = t[n];
      if (!(o in r)) return;
      r = r[o];
    }
    (e = e((n = r[(t = t[t.length - 1])]))) != n &&
      null != e &&
      $jscomp.defineProperty(r, t, { configurable: !0, writable: !0, value: e });
  }),
  ($jscomp.polyfillIsolated = function (t, e, r, n) {
    var o = t.split('.');
    (t = 1 === o.length),
      (n = o[0]),
      (n = !t && n in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global);
    for (var _ = 0; _ < o.length - 1; _++) {
      var i = o[_];
      if (!(i in n)) return;
      n = n[i];
    }
    (o = o[o.length - 1]),
      null != (e = e((r = $jscomp.IS_SYMBOL_NATIVE && 'es6' === r ? n[o] : null))) &&
        (t
          ? $jscomp.defineProperty($jscomp.polyfills, o, {
              configurable: !0,
              writable: !0,
              value: e,
            })
          : e !== r &&
            (void 0 === $jscomp.propertyToPolyfillSymbol[o] &&
              ((r = (1e9 * Math.random()) >>> 0),
              ($jscomp.propertyToPolyfillSymbol[o] = $jscomp.IS_SYMBOL_NATIVE
                ? $jscomp.global.Symbol(o)
                : $jscomp.POLYFILL_PREFIX + r + '$' + o)),
            $jscomp.defineProperty(n, $jscomp.propertyToPolyfillSymbol[o], {
              configurable: !0,
              writable: !0,
              value: e,
            })));
  }),
  $jscomp.polyfill(
    'Promise',
    function (t) {
      function e() {
        this.batch_ = null;
      }
      function r(t) {
        return t instanceof o
          ? t
          : new o(function (e, r) {
              e(t);
            });
      }
      if (
        t &&
        (!(
          $jscomp.FORCE_POLYFILL_PROMISE ||
          ($jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION &&
            void 0 === $jscomp.global.PromiseRejectionEvent)
        ) ||
          !$jscomp.global.Promise ||
          -1 === $jscomp.global.Promise.toString().indexOf('[native code]'))
      )
        return t;
      e.prototype.asyncExecute = function (t) {
        if (null == this.batch_) {
          this.batch_ = [];
          var e = this;
          this.asyncExecuteFunction(function () {
            e.executeBatch_();
          });
        }
        this.batch_.push(t);
      };
      var n = $jscomp.global.setTimeout;
      (e.prototype.asyncExecuteFunction = function (t) {
        n(t, 0);
      }),
        (e.prototype.executeBatch_ = function () {
          for (; this.batch_ && this.batch_.length; ) {
            var t = this.batch_;
            this.batch_ = [];
            for (var e = 0; e < t.length; ++e) {
              var r = t[e];
              t[e] = null;
              try {
                r();
              } catch (t) {
                this.asyncThrow_(t);
              }
            }
          }
          this.batch_ = null;
        }),
        (e.prototype.asyncThrow_ = function (t) {
          this.asyncExecuteFunction(function () {
            throw t;
          });
        });
      var o = function (t) {
        (this.state_ = 0),
          (this.result_ = void 0),
          (this.onSettledCallbacks_ = []),
          (this.isRejectionHandled_ = !1);
        var e = this.createResolveAndReject_();
        try {
          t(e.resolve, e.reject);
        } catch (t) {
          e.reject(t);
        }
      };
      (o.prototype.createResolveAndReject_ = function () {
        function t(t) {
          return function (n) {
            r || ((r = !0), t.call(e, n));
          };
        }
        var e = this,
          r = !1;
        return { resolve: t(this.resolveTo_), reject: t(this.reject_) };
      }),
        (o.prototype.resolveTo_ = function (t) {
          if (t === this) this.reject_(new TypeError('A Promise cannot resolve to itself'));
          else if (t instanceof o) this.settleSameAsPromise_(t);
          else {
            t: switch (typeof t) {
              case 'object':
                var e = null != t;
                break t;
              case 'function':
                e = !0;
                break t;
              default:
                e = !1;
            }
            e ? this.resolveToNonPromiseObj_(t) : this.fulfill_(t);
          }
        }),
        (o.prototype.resolveToNonPromiseObj_ = function (t) {
          var e = void 0;
          try {
            e = t.then;
          } catch (t) {
            return void this.reject_(t);
          }
          'function' == typeof e ? this.settleSameAsThenable_(e, t) : this.fulfill_(t);
        }),
        (o.prototype.reject_ = function (t) {
          this.settle_(2, t);
        }),
        (o.prototype.fulfill_ = function (t) {
          this.settle_(1, t);
        }),
        (o.prototype.settle_ = function (t, e) {
          if (0 != this.state_)
            throw Error(
              'Cannot settle(' + t + ', ' + e + '): Promise already settled in state' + this.state_,
            );
          (this.state_ = t),
            (this.result_ = e),
            2 === this.state_ && this.scheduleUnhandledRejectionCheck_(),
            this.executeOnSettledCallbacks_();
        }),
        (o.prototype.scheduleUnhandledRejectionCheck_ = function () {
          var t = this;
          n(function () {
            if (t.notifyUnhandledRejection_()) {
              var e = $jscomp.global.console;
              void 0 !== e && e.error(t.result_);
            }
          }, 1);
        }),
        (o.prototype.notifyUnhandledRejection_ = function () {
          if (this.isRejectionHandled_) return !1;
          var t = $jscomp.global.CustomEvent,
            e = $jscomp.global.Event,
            r = $jscomp.global.dispatchEvent;
          return (
            void 0 === r ||
            ('function' == typeof t
              ? (t = new t('unhandledrejection', { cancelable: !0 }))
              : 'function' == typeof e
                ? (t = new e('unhandledrejection', { cancelable: !0 }))
                : (t = $jscomp.global.document.createEvent('CustomEvent')).initCustomEvent(
                    'unhandledrejection',
                    !1,
                    !0,
                    t,
                  ),
            (t.promise = this),
            (t.reason = this.result_),
            r(t))
          );
        }),
        (o.prototype.executeOnSettledCallbacks_ = function () {
          if (null != this.onSettledCallbacks_) {
            for (var t = 0; t < this.onSettledCallbacks_.length; ++t)
              _.asyncExecute(this.onSettledCallbacks_[t]);
            this.onSettledCallbacks_ = null;
          }
        });
      var _ = new e();
      return (
        (o.prototype.settleSameAsPromise_ = function (t) {
          var e = this.createResolveAndReject_();
          t.callWhenSettled_(e.resolve, e.reject);
        }),
        (o.prototype.settleSameAsThenable_ = function (t, e) {
          var r = this.createResolveAndReject_();
          try {
            t.call(e, r.resolve, r.reject);
          } catch (t) {
            r.reject(t);
          }
        }),
        (o.prototype.then = function (t, e) {
          function r(t, e) {
            return 'function' == typeof t
              ? function (e) {
                  try {
                    n(t(e));
                  } catch (t) {
                    _(t);
                  }
                }
              : e;
          }
          var n,
            _,
            i = new o(function (t, e) {
              (n = t), (_ = e);
            });
          return this.callWhenSettled_(r(t, n), r(e, _)), i;
        }),
        (o.prototype.catch = function (t) {
          return this.then(void 0, t);
        }),
        (o.prototype.callWhenSettled_ = function (t, e) {
          function r() {
            switch (n.state_) {
              case 1:
                t(n.result_);
                break;
              case 2:
                e(n.result_);
                break;
              default:
                throw Error('Unexpected state: ' + n.state_);
            }
          }
          var n = this;
          null == this.onSettledCallbacks_ ? _.asyncExecute(r) : this.onSettledCallbacks_.push(r),
            (this.isRejectionHandled_ = !0);
        }),
        (o.resolve = r),
        (o.reject = function (t) {
          return new o(function (e, r) {
            r(t);
          });
        }),
        (o.race = function (t) {
          return new o(function (e, n) {
            for (var o = $jscomp.makeIterator(t), _ = o.next(); !_.done; _ = o.next())
              r(_.value).callWhenSettled_(e, n);
          });
        }),
        (o.all = function (t) {
          var e = $jscomp.makeIterator(t),
            n = e.next();
          return n.done
            ? r([])
            : new o(function (t, o) {
                function _(e) {
                  return function (r) {
                    (i[e] = r), 0 == --p && t(i);
                  };
                }
                var i = [],
                  p = 0;
                do {
                  i.push(void 0),
                    p++,
                    r(n.value).callWhenSettled_(_(i.length - 1), o),
                    (n = e.next());
                } while (!n.done);
              });
        }),
        o
      );
    },
    'es6',
    'es3',
  ),
  ($jscomp.owns = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }),
  ($jscomp.assign =
    $jscomp.TRUST_ES6_POLYFILLS && 'function' == typeof Object.assign
      ? Object.assign
      : function (t, e) {
          for (var r = 1; r < arguments.length; r++) {
            var n = arguments[r];
            if (n) for (var o in n) $jscomp.owns(n, o) && (t[o] = n[o]);
          }
          return t;
        }),
  $jscomp.polyfill(
    'Object.assign',
    function (t) {
      return t || $jscomp.assign;
    },
    'es6',
    'es3',
  ),
  ($jscomp.checkStringArgs = function (t, e, r) {
    if (null == t)
      throw new TypeError(
        "The 'this' value for String.prototype." + r + ' must not be null or undefined',
      );
    if (e instanceof RegExp)
      throw new TypeError(
        'First argument to String.prototype.' + r + ' must not be a regular expression',
      );
    return t + '';
  }),
  $jscomp.polyfill(
    'String.prototype.startsWith',
    function (t) {
      return (
        t ||
        function (t, e) {
          var r = $jscomp.checkStringArgs(this, t, 'startsWith');
          t += '';
          var n = r.length,
            o = t.length;
          e = Math.max(0, Math.min(0 | e, r.length));
          for (var _ = 0; _ < o && e < n; ) if (r[e++] != t[_++]) return !1;
          return _ >= o;
        }
      );
    },
    'es6',
    'es3',
  ),
  $jscomp.polyfill(
    'Array.prototype.copyWithin',
    function (t) {
      function e(t) {
        return 1 / 0 === (t = Number(t)) || -1 / 0 === t ? t : 0 | t;
      }
      return (
        t ||
        function (t, r, n) {
          var o = this.length;
          if (
            ((t = e(t)),
            (r = e(r)),
            (n = void 0 === n ? o : e(n)),
            (t = 0 > t ? Math.max(o + t, 0) : Math.min(t, o)),
            (r = 0 > r ? Math.max(o + r, 0) : Math.min(r, o)),
            (n = 0 > n ? Math.max(o + n, 0) : Math.min(n, o)),
            t < r)
          )
            for (; r < n; ) r in this ? (this[t++] = this[r++]) : (delete this[t++], r++);
          else
            for (t += (n = Math.min(n, o + r - t)) - r; n > r; )
              --n in this ? (this[--t] = this[n]) : delete this[--t];
          return this;
        }
      );
    },
    'es6',
    'es3',
  ),
  ($jscomp.typedArrayCopyWithin = function (t) {
    return t || Array.prototype.copyWithin;
  }),
  $jscomp.polyfill('Int8Array.prototype.copyWithin', $jscomp.typedArrayCopyWithin, 'es6', 'es5'),
  $jscomp.polyfill('Uint8Array.prototype.copyWithin', $jscomp.typedArrayCopyWithin, 'es6', 'es5'),
  $jscomp.polyfill(
    'Uint8ClampedArray.prototype.copyWithin',
    $jscomp.typedArrayCopyWithin,
    'es6',
    'es5',
  ),
  $jscomp.polyfill('Int16Array.prototype.copyWithin', $jscomp.typedArrayCopyWithin, 'es6', 'es5'),
  $jscomp.polyfill('Uint16Array.prototype.copyWithin', $jscomp.typedArrayCopyWithin, 'es6', 'es5'),
  $jscomp.polyfill('Int32Array.prototype.copyWithin', $jscomp.typedArrayCopyWithin, 'es6', 'es5'),
  $jscomp.polyfill('Uint32Array.prototype.copyWithin', $jscomp.typedArrayCopyWithin, 'es6', 'es5'),
  $jscomp.polyfill('Float32Array.prototype.copyWithin', $jscomp.typedArrayCopyWithin, 'es6', 'es5'),
  $jscomp.polyfill('Float64Array.prototype.copyWithin', $jscomp.typedArrayCopyWithin, 'es6', 'es5');
var DracoDecoderModule = (function () {
  var t =
    'undefined' != typeof document && document.currentScript ? document.currentScript.src : void 0;
  return (
    'undefined' != typeof __filename && (t = t || __filename),
    function (e) {
      function r(t, e) {
        if (t) {
          var r = Z,
            n = t + e;
          for (e = t; r[e] && !(e >= n); ) ++e;
          if (16 < e - t && r.buffer && ot) r = ot.decode(r.subarray(t, e));
          else {
            for (n = ''; t < e; ) {
              var o = r[t++];
              if (128 & o) {
                var _ = 63 & r[t++];
                if (192 == (224 & o)) n += String.fromCharCode(((31 & o) << 6) | _);
                else {
                  var i = 63 & r[t++];
                  65536 >
                  (o =
                    224 == (240 & o)
                      ? ((15 & o) << 12) | (_ << 6) | i
                      : ((7 & o) << 18) | (_ << 12) | (i << 6) | (63 & r[t++]))
                    ? (n += String.fromCharCode(o))
                    : ((o -= 65536),
                      (n += String.fromCharCode(55296 | (o >> 10), 56320 | (1023 & o))));
                }
              } else n += String.fromCharCode(o);
            }
            r = n;
          }
        } else r = '';
        return r;
      }
      function n() {
        var t = K.buffer;
        (L.HEAP8 = J = new Int8Array(t)),
          (L.HEAP16 = new Int16Array(t)),
          (L.HEAP32 = tt = new Int32Array(t)),
          (L.HEAPU8 = Z = new Uint8Array(t)),
          (L.HEAPU16 = new Uint16Array(t)),
          (L.HEAPU32 = et = new Uint32Array(t)),
          (L.HEAPF32 = new Float32Array(t)),
          (L.HEAPF64 = new Float64Array(t));
      }
      function o(t) {
        throw (
          (L.onAbort && L.onAbort(t),
          X((t = 'Aborted(' + t + ')')),
          (nt = !0),
          (t = new WebAssembly.RuntimeError(t + '. Build with -sASSERTIONS for more info.')),
          F(t),
          t)
        );
      }
      function _(t) {
        try {
          if (t == yt && q) return new Uint8Array(q);
          if (Y) return Y(t);
          throw 'both async and sync fetching of the wasm failed';
        } catch (t) {
          o(t);
        }
      }
      function i(t) {
        for (; 0 < t.length; ) t.shift()(L);
      }
      function p(t) {
        (this.excPtr = t),
          (this.ptr = t - 24),
          (this.set_type = function (t) {
            et[(this.ptr + 4) >> 2] = t;
          }),
          (this.get_type = function () {
            return et[(this.ptr + 4) >> 2];
          }),
          (this.set_destructor = function (t) {
            et[(this.ptr + 8) >> 2] = t;
          }),
          (this.get_destructor = function () {
            return et[(this.ptr + 8) >> 2];
          }),
          (this.set_refcount = function (t) {
            tt[this.ptr >> 2] = t;
          }),
          (this.set_caught = function (t) {
            J[(this.ptr + 12) >> 0] = t ? 1 : 0;
          }),
          (this.get_caught = function () {
            return 0 != J[(this.ptr + 12) >> 0];
          }),
          (this.set_rethrown = function (t) {
            J[(this.ptr + 13) >> 0] = t ? 1 : 0;
          }),
          (this.get_rethrown = function () {
            return 0 != J[(this.ptr + 13) >> 0];
          }),
          (this.init = function (t, e) {
            this.set_adjusted_ptr(0),
              this.set_type(t),
              this.set_destructor(e),
              this.set_refcount(0),
              this.set_caught(!1),
              this.set_rethrown(!1);
          }),
          (this.add_ref = function () {
            tt[this.ptr >> 2] += 1;
          }),
          (this.release_ref = function () {
            var t = tt[this.ptr >> 2];
            return (tt[this.ptr >> 2] = t - 1), 1 === t;
          }),
          (this.set_adjusted_ptr = function (t) {
            et[(this.ptr + 16) >> 2] = t;
          }),
          (this.get_adjusted_ptr = function () {
            return et[(this.ptr + 16) >> 2];
          }),
          (this.get_exception_ptr = function () {
            if (Xr(this.get_type())) return et[this.excPtr >> 2];
            var t = this.get_adjusted_ptr();
            return 0 !== t ? t : this.excPtr;
          });
      }
      function a() {
        function t() {
          if (!qr && ((qr = !0), (L.calledRun = !0), !nt)) {
            if (
              ((at = !0),
              i(it),
              g(L),
              L.onRuntimeInitialized && L.onRuntimeInitialized(),
              L.postRun)
            )
              for ('function' == typeof L.postRun && (L.postRun = [L.postRun]); L.postRun.length; )
                pt.unshift(L.postRun.shift());
            i(pt);
          }
        }
        if (!(0 < ct)) {
          if (L.preRun)
            for ('function' == typeof L.preRun && (L.preRun = [L.preRun]); L.preRun.length; )
              _t.unshift(L.preRun.shift());
          i(_t),
            0 < ct ||
              (L.setStatus
                ? (L.setStatus('Running...'),
                  setTimeout(function () {
                    setTimeout(function () {
                      L.setStatus('');
                    }, 1),
                      t();
                  }, 1))
                : t());
        }
      }
      function c() {}
      function s(t) {
        return (t || c).__cache__;
      }
      function u(t, e) {
        var r = s(e),
          n = r[t];
        return n || (((n = Object.create((e || c).prototype)).ptr = t), (r[t] = n));
      }
      function y(t) {
        if ('string' == typeof t) {
          for (var e = 0, r = 0; r < t.length; ++r) {
            var n = t.charCodeAt(r);
            127 >= n
              ? e++
              : 2047 >= n
                ? (e += 2)
                : 55296 <= n && 57343 >= n
                  ? ((e += 4), ++r)
                  : (e += 3);
          }
          if (((r = 0), 0 < (n = (e = Array(e + 1)).length))) {
            n = r + n - 1;
            for (var o = 0; o < t.length; ++o) {
              var _ = t.charCodeAt(o);
              if (55296 <= _ && 57343 >= _)
                _ = (65536 + ((1023 & _) << 10)) | (1023 & t.charCodeAt(++o));
              if (127 >= _) {
                if (r >= n) break;
                e[r++] = _;
              } else {
                if (2047 >= _) {
                  if (r + 1 >= n) break;
                  e[r++] = 192 | (_ >> 6);
                } else {
                  if (65535 >= _) {
                    if (r + 2 >= n) break;
                    e[r++] = 224 | (_ >> 12);
                  } else {
                    if (r + 3 >= n) break;
                    (e[r++] = 240 | (_ >> 18)), (e[r++] = 128 | ((_ >> 12) & 63));
                  }
                  e[r++] = 128 | ((_ >> 6) & 63);
                }
                e[r++] = 128 | (63 & _);
              }
            }
            e[r] = 0;
          }
          return (t = Kr.alloc(e, J)), Kr.copy(e, J, t), t;
        }
        return t;
      }
      function l(t) {
        if ('object' == typeof t) {
          var e = Kr.alloc(t, J);
          return Kr.copy(t, J, e), e;
        }
        return t;
      }
      function f() {
        throw 'cannot construct a VoidPtr, no constructor in IDL';
      }
      function m() {
        (this.ptr = mt()), (s(m)[this.ptr] = this);
      }
      function d() {
        (this.ptr = ht()), (s(d)[this.ptr] = this);
      }
      function b() {
        (this.ptr = Dt()), (s(b)[this.ptr] = this);
      }
      function h() {
        (this.ptr = jt()), (s(h)[this.ptr] = this);
      }
      function A() {
        (this.ptr = gt()), (s(A)[this.ptr] = this);
      }
      function T() {
        (this.ptr = zt()), (s(T)[this.ptr] = this);
      }
      function D() {
        (this.ptr = kt()), (s(D)[this.ptr] = this);
      }
      function I() {
        (this.ptr = Ht()), (s(I)[this.ptr] = this);
      }
      function j() {
        (this.ptr = Zt()), (s(j)[this.ptr] = this);
      }
      function E() {
        throw 'cannot construct a Status, no constructor in IDL';
      }
      function G() {
        (this.ptr = _e()), (s(G)[this.ptr] = this);
      }
      function O() {
        (this.ptr = ce()), (s(O)[this.ptr] = this);
      }
      function v() {
        (this.ptr = le()), (s(v)[this.ptr] = this);
      }
      function P() {
        (this.ptr = be()), (s(P)[this.ptr] = this);
      }
      function R() {
        (this.ptr = De()), (s(R)[this.ptr] = this);
      }
      function S() {
        (this.ptr = Ge()), (s(S)[this.ptr] = this);
      }
      function M() {
        (this.ptr = Re()), (s(M)[this.ptr] = this);
      }
      function N() {
        (this.ptr = Ue()), (s(N)[this.ptr] = this);
      }
      function U() {
        (this.ptr = Be()), (s(U)[this.ptr] = this);
      }
      var g,
        F,
        L = void 0 !== (e = void 0 === e ? {} : e) ? e : {};
      L.ready = new Promise(function (t, e) {
        (g = t), (F = e);
      });
      var C = !1,
        $ = !1;
      (L.onRuntimeInitialized = function () {
        (C = !0), $ && 'function' == typeof L.onModuleLoaded && L.onModuleLoaded(L);
      }),
        (L.onModuleParsed = function () {
          ($ = !0), C && 'function' == typeof L.onModuleLoaded && L.onModuleLoaded(L);
        }),
        (L.isVersionSupported = function (t) {
          return (
            'string' == typeof t &&
            !(2 > (t = t.split('.')).length || 3 < t.length) &&
            ((1 == t[0] && 0 <= t[1] && 5 >= t[1]) || !(0 != t[0] || 10 < t[1]))
          );
        });
      var w = Object.assign({}, L),
        z = 'object' == typeof window,
        V = 'function' == typeof importScripts,
        B =
          'object' == typeof process &&
          'object' == typeof process.versions &&
          'string' == typeof process.versions.node,
        W = '';
      if (B) {
        var k = require('fs'),
          x = require('path');
        W = V ? x.dirname(W) + '/' : __dirname + '/';
        var Q = function (t, e) {
            return (
              (t = t.startsWith('file://') ? new URL(t) : x.normalize(t)),
              k.readFileSync(t, e ? void 0 : 'utf8')
            );
          },
          Y = function (t) {
            return (t = Q(t, !0)).buffer || (t = new Uint8Array(t)), t;
          },
          H = function (t, e, r) {
            (t = t.startsWith('file://') ? new URL(t) : x.normalize(t)),
              k.readFile(t, function (t, n) {
                t ? r(t) : e(n.buffer);
              });
          };
        1 < process.argv.length && process.argv[1].replace(/\\/g, '/'),
          process.argv.slice(2),
          (L.inspect = function () {
            return '[Emscripten Module object]';
          });
      } else
        (z || V) &&
          (V
            ? (W = self.location.href)
            : 'undefined' != typeof document &&
              document.currentScript &&
              (W = document.currentScript.src),
          t && (W = t),
          (W =
            0 !== W.indexOf('blob:')
              ? W.substr(0, W.replace(/[?#].*/, '').lastIndexOf('/') + 1)
              : ''),
          (Q = function (t) {
            var e = new XMLHttpRequest();
            return e.open('GET', t, !1), e.send(null), e.responseText;
          }),
          V &&
            (Y = function (t) {
              var e = new XMLHttpRequest();
              return (
                e.open('GET', t, !1),
                (e.responseType = 'arraybuffer'),
                e.send(null),
                new Uint8Array(e.response)
              );
            }),
          (H = function (t, e, r) {
            var n = new XMLHttpRequest();
            n.open('GET', t, !0),
              (n.responseType = 'arraybuffer'),
              (n.onload = function () {
                200 == n.status || (0 == n.status && n.response) ? e(n.response) : r();
              }),
              (n.onerror = r),
              n.send(null);
          }));
      L.print || console.log.bind(console);
      var q,
        X = L.printErr || console.warn.bind(console);
      Object.assign(L, w),
        (w = null),
        L.wasmBinary && (q = L.wasmBinary),
        'object' != typeof WebAssembly && o('no native wasm support detected');
      var K,
        J,
        Z,
        tt,
        et,
        rt,
        nt = !1,
        ot = 'undefined' != typeof TextDecoder ? new TextDecoder('utf8') : void 0,
        _t = [],
        it = [],
        pt = [],
        at = !1,
        ct = 0,
        st = null,
        ut = null,
        yt = 'draco_decoder_gltf.wasm';
      yt.startsWith('data:application/octet-stream;base64,') ||
        ((rt = yt), (yt = L.locateFile ? L.locateFile(rt, W) : W + rt));
      var lt = {
        b: function (t, e, r) {
          throw (new p(t).init(e, r), t);
        },
        a: function () {
          o('');
        },
        d: function (t, e, r) {
          Z.copyWithin(t, e, e + r);
        },
        c: function (t) {
          var e = Z.length;
          if (2147483648 < (t >>>= 0)) return !1;
          for (var r = 1; 4 >= r; r *= 2) {
            var o = e * (1 + 0.2 / r);
            o = Math.min(o, t + 100663296);
            var _ = Math;
            (o = Math.max(t, o)),
              (_ = _.min.call(_, 2147483648, o + ((65536 - (o % 65536)) % 65536)));
            t: {
              o = K.buffer;
              try {
                K.grow((_ - o.byteLength + 65535) >>> 16), n();
                var i = 1;
                break t;
              } catch (t) {}
              i = void 0;
            }
            if (i) return !0;
          }
          return !1;
        },
      };
      !(function () {
        function t(t, e) {
          (L.asm = t.exports),
            (K = L.asm.e),
            n(),
            it.unshift(L.asm.f),
            ct--,
            L.monitorRunDependencies && L.monitorRunDependencies(ct),
            0 == ct &&
              (null !== st && (clearInterval(st), (st = null)), ut && ((t = ut), (ut = null), t()));
        }
        function e(e) {
          t(e.instance);
        }
        function r(t) {
          return (function () {
            if (!q && (z || V)) {
              if ('function' == typeof fetch && !yt.startsWith('file://'))
                return fetch(yt, { credentials: 'same-origin' })
                  .then(function (t) {
                    if (!t.ok) throw "failed to load wasm binary file at '" + yt + "'";
                    return t.arrayBuffer();
                  })
                  .catch(function () {
                    return _(yt);
                  });
              if (H)
                return new Promise(function (t, e) {
                  H(
                    yt,
                    function (e) {
                      t(new Uint8Array(e));
                    },
                    e,
                  );
                });
            }
            return Promise.resolve().then(function () {
              return _(yt);
            });
          })()
            .then(function (t) {
              return WebAssembly.instantiate(t, i);
            })
            .then(function (t) {
              return t;
            })
            .then(t, function (t) {
              X('failed to asynchronously prepare wasm: ' + t), o(t);
            });
        }
        var i = { a: lt };
        if ((ct++, L.monitorRunDependencies && L.monitorRunDependencies(ct), L.instantiateWasm))
          try {
            return L.instantiateWasm(i, t);
          } catch (t) {
            X('Module.instantiateWasm callback failed with error: ' + t), F(t);
          }
        (q ||
        'function' != typeof WebAssembly.instantiateStreaming ||
        yt.startsWith('data:application/octet-stream;base64,') ||
        yt.startsWith('file://') ||
        B ||
        'function' != typeof fetch
          ? r(e)
          : fetch(yt, { credentials: 'same-origin' }).then(function (t) {
              return WebAssembly.instantiateStreaming(t, i).then(e, function (t) {
                return (
                  X('wasm streaming compile failed: ' + t),
                  X('falling back to ArrayBuffer instantiation'),
                  r(e)
                );
              });
            })
        ).catch(F);
      })();
      var ft = (L._emscripten_bind_VoidPtr___destroy___0 = function () {
          return (ft = L._emscripten_bind_VoidPtr___destroy___0 = L.asm.h).apply(null, arguments);
        }),
        mt = (L._emscripten_bind_DecoderBuffer_DecoderBuffer_0 = function () {
          return (mt = L._emscripten_bind_DecoderBuffer_DecoderBuffer_0 = L.asm.i).apply(
            null,
            arguments,
          );
        }),
        dt = (L._emscripten_bind_DecoderBuffer_Init_2 = function () {
          return (dt = L._emscripten_bind_DecoderBuffer_Init_2 = L.asm.j).apply(null, arguments);
        }),
        bt = (L._emscripten_bind_DecoderBuffer___destroy___0 = function () {
          return (bt = L._emscripten_bind_DecoderBuffer___destroy___0 = L.asm.k).apply(
            null,
            arguments,
          );
        }),
        ht = (L._emscripten_bind_AttributeTransformData_AttributeTransformData_0 = function () {
          return (ht = L._emscripten_bind_AttributeTransformData_AttributeTransformData_0 =
            L.asm.l).apply(null, arguments);
        }),
        At = (L._emscripten_bind_AttributeTransformData_transform_type_0 = function () {
          return (At = L._emscripten_bind_AttributeTransformData_transform_type_0 = L.asm.m).apply(
            null,
            arguments,
          );
        }),
        Tt = (L._emscripten_bind_AttributeTransformData___destroy___0 = function () {
          return (Tt = L._emscripten_bind_AttributeTransformData___destroy___0 = L.asm.n).apply(
            null,
            arguments,
          );
        }),
        Dt = (L._emscripten_bind_GeometryAttribute_GeometryAttribute_0 = function () {
          return (Dt = L._emscripten_bind_GeometryAttribute_GeometryAttribute_0 = L.asm.o).apply(
            null,
            arguments,
          );
        }),
        It = (L._emscripten_bind_GeometryAttribute___destroy___0 = function () {
          return (It = L._emscripten_bind_GeometryAttribute___destroy___0 = L.asm.p).apply(
            null,
            arguments,
          );
        }),
        jt = (L._emscripten_bind_PointAttribute_PointAttribute_0 = function () {
          return (jt = L._emscripten_bind_PointAttribute_PointAttribute_0 = L.asm.q).apply(
            null,
            arguments,
          );
        }),
        Et = (L._emscripten_bind_PointAttribute_size_0 = function () {
          return (Et = L._emscripten_bind_PointAttribute_size_0 = L.asm.r).apply(null, arguments);
        }),
        Gt = (L._emscripten_bind_PointAttribute_GetAttributeTransformData_0 = function () {
          return (Gt = L._emscripten_bind_PointAttribute_GetAttributeTransformData_0 =
            L.asm.s).apply(null, arguments);
        }),
        Ot = (L._emscripten_bind_PointAttribute_attribute_type_0 = function () {
          return (Ot = L._emscripten_bind_PointAttribute_attribute_type_0 = L.asm.t).apply(
            null,
            arguments,
          );
        }),
        vt = (L._emscripten_bind_PointAttribute_data_type_0 = function () {
          return (vt = L._emscripten_bind_PointAttribute_data_type_0 = L.asm.u).apply(
            null,
            arguments,
          );
        }),
        Pt = (L._emscripten_bind_PointAttribute_num_components_0 = function () {
          return (Pt = L._emscripten_bind_PointAttribute_num_components_0 = L.asm.v).apply(
            null,
            arguments,
          );
        }),
        Rt = (L._emscripten_bind_PointAttribute_normalized_0 = function () {
          return (Rt = L._emscripten_bind_PointAttribute_normalized_0 = L.asm.w).apply(
            null,
            arguments,
          );
        }),
        St = (L._emscripten_bind_PointAttribute_byte_stride_0 = function () {
          return (St = L._emscripten_bind_PointAttribute_byte_stride_0 = L.asm.x).apply(
            null,
            arguments,
          );
        }),
        Mt = (L._emscripten_bind_PointAttribute_byte_offset_0 = function () {
          return (Mt = L._emscripten_bind_PointAttribute_byte_offset_0 = L.asm.y).apply(
            null,
            arguments,
          );
        }),
        Nt = (L._emscripten_bind_PointAttribute_unique_id_0 = function () {
          return (Nt = L._emscripten_bind_PointAttribute_unique_id_0 = L.asm.z).apply(
            null,
            arguments,
          );
        }),
        Ut = (L._emscripten_bind_PointAttribute___destroy___0 = function () {
          return (Ut = L._emscripten_bind_PointAttribute___destroy___0 = L.asm.A).apply(
            null,
            arguments,
          );
        }),
        gt = (L._emscripten_bind_AttributeQuantizationTransform_AttributeQuantizationTransform_0 =
          function () {
            return (gt =
              L._emscripten_bind_AttributeQuantizationTransform_AttributeQuantizationTransform_0 =
                L.asm.B).apply(null, arguments);
          }),
        Ft = (L._emscripten_bind_AttributeQuantizationTransform_InitFromAttribute_1 = function () {
          return (Ft = L._emscripten_bind_AttributeQuantizationTransform_InitFromAttribute_1 =
            L.asm.C).apply(null, arguments);
        }),
        Lt = (L._emscripten_bind_AttributeQuantizationTransform_quantization_bits_0 = function () {
          return (Lt = L._emscripten_bind_AttributeQuantizationTransform_quantization_bits_0 =
            L.asm.D).apply(null, arguments);
        }),
        Ct = (L._emscripten_bind_AttributeQuantizationTransform_min_value_1 = function () {
          return (Ct = L._emscripten_bind_AttributeQuantizationTransform_min_value_1 =
            L.asm.E).apply(null, arguments);
        }),
        $t = (L._emscripten_bind_AttributeQuantizationTransform_range_0 = function () {
          return ($t = L._emscripten_bind_AttributeQuantizationTransform_range_0 = L.asm.F).apply(
            null,
            arguments,
          );
        }),
        wt = (L._emscripten_bind_AttributeQuantizationTransform___destroy___0 = function () {
          return (wt = L._emscripten_bind_AttributeQuantizationTransform___destroy___0 =
            L.asm.G).apply(null, arguments);
        }),
        zt = (L._emscripten_bind_AttributeOctahedronTransform_AttributeOctahedronTransform_0 =
          function () {
            return (zt =
              L._emscripten_bind_AttributeOctahedronTransform_AttributeOctahedronTransform_0 =
                L.asm.H).apply(null, arguments);
          }),
        Vt = (L._emscripten_bind_AttributeOctahedronTransform_InitFromAttribute_1 = function () {
          return (Vt = L._emscripten_bind_AttributeOctahedronTransform_InitFromAttribute_1 =
            L.asm.I).apply(null, arguments);
        }),
        Bt = (L._emscripten_bind_AttributeOctahedronTransform_quantization_bits_0 = function () {
          return (Bt = L._emscripten_bind_AttributeOctahedronTransform_quantization_bits_0 =
            L.asm.J).apply(null, arguments);
        }),
        Wt = (L._emscripten_bind_AttributeOctahedronTransform___destroy___0 = function () {
          return (Wt = L._emscripten_bind_AttributeOctahedronTransform___destroy___0 =
            L.asm.K).apply(null, arguments);
        }),
        kt = (L._emscripten_bind_PointCloud_PointCloud_0 = function () {
          return (kt = L._emscripten_bind_PointCloud_PointCloud_0 = L.asm.L).apply(null, arguments);
        }),
        xt = (L._emscripten_bind_PointCloud_num_attributes_0 = function () {
          return (xt = L._emscripten_bind_PointCloud_num_attributes_0 = L.asm.M).apply(
            null,
            arguments,
          );
        }),
        Qt = (L._emscripten_bind_PointCloud_num_points_0 = function () {
          return (Qt = L._emscripten_bind_PointCloud_num_points_0 = L.asm.N).apply(null, arguments);
        }),
        Yt = (L._emscripten_bind_PointCloud___destroy___0 = function () {
          return (Yt = L._emscripten_bind_PointCloud___destroy___0 = L.asm.O).apply(
            null,
            arguments,
          );
        }),
        Ht = (L._emscripten_bind_Mesh_Mesh_0 = function () {
          return (Ht = L._emscripten_bind_Mesh_Mesh_0 = L.asm.P).apply(null, arguments);
        }),
        qt = (L._emscripten_bind_Mesh_num_faces_0 = function () {
          return (qt = L._emscripten_bind_Mesh_num_faces_0 = L.asm.Q).apply(null, arguments);
        }),
        Xt = (L._emscripten_bind_Mesh_num_attributes_0 = function () {
          return (Xt = L._emscripten_bind_Mesh_num_attributes_0 = L.asm.R).apply(null, arguments);
        }),
        Kt = (L._emscripten_bind_Mesh_num_points_0 = function () {
          return (Kt = L._emscripten_bind_Mesh_num_points_0 = L.asm.S).apply(null, arguments);
        }),
        Jt = (L._emscripten_bind_Mesh___destroy___0 = function () {
          return (Jt = L._emscripten_bind_Mesh___destroy___0 = L.asm.T).apply(null, arguments);
        }),
        Zt = (L._emscripten_bind_Metadata_Metadata_0 = function () {
          return (Zt = L._emscripten_bind_Metadata_Metadata_0 = L.asm.U).apply(null, arguments);
        }),
        te = (L._emscripten_bind_Metadata___destroy___0 = function () {
          return (te = L._emscripten_bind_Metadata___destroy___0 = L.asm.V).apply(null, arguments);
        }),
        ee = (L._emscripten_bind_Status_code_0 = function () {
          return (ee = L._emscripten_bind_Status_code_0 = L.asm.W).apply(null, arguments);
        }),
        re = (L._emscripten_bind_Status_ok_0 = function () {
          return (re = L._emscripten_bind_Status_ok_0 = L.asm.X).apply(null, arguments);
        }),
        ne = (L._emscripten_bind_Status_error_msg_0 = function () {
          return (ne = L._emscripten_bind_Status_error_msg_0 = L.asm.Y).apply(null, arguments);
        }),
        oe = (L._emscripten_bind_Status___destroy___0 = function () {
          return (oe = L._emscripten_bind_Status___destroy___0 = L.asm.Z).apply(null, arguments);
        }),
        _e = (L._emscripten_bind_DracoFloat32Array_DracoFloat32Array_0 = function () {
          return (_e = L._emscripten_bind_DracoFloat32Array_DracoFloat32Array_0 = L.asm._).apply(
            null,
            arguments,
          );
        }),
        ie = (L._emscripten_bind_DracoFloat32Array_GetValue_1 = function () {
          return (ie = L._emscripten_bind_DracoFloat32Array_GetValue_1 = L.asm.$).apply(
            null,
            arguments,
          );
        }),
        pe = (L._emscripten_bind_DracoFloat32Array_size_0 = function () {
          return (pe = L._emscripten_bind_DracoFloat32Array_size_0 = L.asm.aa).apply(
            null,
            arguments,
          );
        }),
        ae = (L._emscripten_bind_DracoFloat32Array___destroy___0 = function () {
          return (ae = L._emscripten_bind_DracoFloat32Array___destroy___0 = L.asm.ba).apply(
            null,
            arguments,
          );
        }),
        ce = (L._emscripten_bind_DracoInt8Array_DracoInt8Array_0 = function () {
          return (ce = L._emscripten_bind_DracoInt8Array_DracoInt8Array_0 = L.asm.ca).apply(
            null,
            arguments,
          );
        }),
        se = (L._emscripten_bind_DracoInt8Array_GetValue_1 = function () {
          return (se = L._emscripten_bind_DracoInt8Array_GetValue_1 = L.asm.da).apply(
            null,
            arguments,
          );
        }),
        ue = (L._emscripten_bind_DracoInt8Array_size_0 = function () {
          return (ue = L._emscripten_bind_DracoInt8Array_size_0 = L.asm.ea).apply(null, arguments);
        }),
        ye = (L._emscripten_bind_DracoInt8Array___destroy___0 = function () {
          return (ye = L._emscripten_bind_DracoInt8Array___destroy___0 = L.asm.fa).apply(
            null,
            arguments,
          );
        }),
        le = (L._emscripten_bind_DracoUInt8Array_DracoUInt8Array_0 = function () {
          return (le = L._emscripten_bind_DracoUInt8Array_DracoUInt8Array_0 = L.asm.ga).apply(
            null,
            arguments,
          );
        }),
        fe = (L._emscripten_bind_DracoUInt8Array_GetValue_1 = function () {
          return (fe = L._emscripten_bind_DracoUInt8Array_GetValue_1 = L.asm.ha).apply(
            null,
            arguments,
          );
        }),
        me = (L._emscripten_bind_DracoUInt8Array_size_0 = function () {
          return (me = L._emscripten_bind_DracoUInt8Array_size_0 = L.asm.ia).apply(null, arguments);
        }),
        de = (L._emscripten_bind_DracoUInt8Array___destroy___0 = function () {
          return (de = L._emscripten_bind_DracoUInt8Array___destroy___0 = L.asm.ja).apply(
            null,
            arguments,
          );
        }),
        be = (L._emscripten_bind_DracoInt16Array_DracoInt16Array_0 = function () {
          return (be = L._emscripten_bind_DracoInt16Array_DracoInt16Array_0 = L.asm.ka).apply(
            null,
            arguments,
          );
        }),
        he = (L._emscripten_bind_DracoInt16Array_GetValue_1 = function () {
          return (he = L._emscripten_bind_DracoInt16Array_GetValue_1 = L.asm.la).apply(
            null,
            arguments,
          );
        }),
        Ae = (L._emscripten_bind_DracoInt16Array_size_0 = function () {
          return (Ae = L._emscripten_bind_DracoInt16Array_size_0 = L.asm.ma).apply(null, arguments);
        }),
        Te = (L._emscripten_bind_DracoInt16Array___destroy___0 = function () {
          return (Te = L._emscripten_bind_DracoInt16Array___destroy___0 = L.asm.na).apply(
            null,
            arguments,
          );
        }),
        De = (L._emscripten_bind_DracoUInt16Array_DracoUInt16Array_0 = function () {
          return (De = L._emscripten_bind_DracoUInt16Array_DracoUInt16Array_0 = L.asm.oa).apply(
            null,
            arguments,
          );
        }),
        Ie = (L._emscripten_bind_DracoUInt16Array_GetValue_1 = function () {
          return (Ie = L._emscripten_bind_DracoUInt16Array_GetValue_1 = L.asm.pa).apply(
            null,
            arguments,
          );
        }),
        je = (L._emscripten_bind_DracoUInt16Array_size_0 = function () {
          return (je = L._emscripten_bind_DracoUInt16Array_size_0 = L.asm.qa).apply(
            null,
            arguments,
          );
        }),
        Ee = (L._emscripten_bind_DracoUInt16Array___destroy___0 = function () {
          return (Ee = L._emscripten_bind_DracoUInt16Array___destroy___0 = L.asm.ra).apply(
            null,
            arguments,
          );
        }),
        Ge = (L._emscripten_bind_DracoInt32Array_DracoInt32Array_0 = function () {
          return (Ge = L._emscripten_bind_DracoInt32Array_DracoInt32Array_0 = L.asm.sa).apply(
            null,
            arguments,
          );
        }),
        Oe = (L._emscripten_bind_DracoInt32Array_GetValue_1 = function () {
          return (Oe = L._emscripten_bind_DracoInt32Array_GetValue_1 = L.asm.ta).apply(
            null,
            arguments,
          );
        }),
        ve = (L._emscripten_bind_DracoInt32Array_size_0 = function () {
          return (ve = L._emscripten_bind_DracoInt32Array_size_0 = L.asm.ua).apply(null, arguments);
        }),
        Pe = (L._emscripten_bind_DracoInt32Array___destroy___0 = function () {
          return (Pe = L._emscripten_bind_DracoInt32Array___destroy___0 = L.asm.va).apply(
            null,
            arguments,
          );
        }),
        Re = (L._emscripten_bind_DracoUInt32Array_DracoUInt32Array_0 = function () {
          return (Re = L._emscripten_bind_DracoUInt32Array_DracoUInt32Array_0 = L.asm.wa).apply(
            null,
            arguments,
          );
        }),
        Se = (L._emscripten_bind_DracoUInt32Array_GetValue_1 = function () {
          return (Se = L._emscripten_bind_DracoUInt32Array_GetValue_1 = L.asm.xa).apply(
            null,
            arguments,
          );
        }),
        Me = (L._emscripten_bind_DracoUInt32Array_size_0 = function () {
          return (Me = L._emscripten_bind_DracoUInt32Array_size_0 = L.asm.ya).apply(
            null,
            arguments,
          );
        }),
        Ne = (L._emscripten_bind_DracoUInt32Array___destroy___0 = function () {
          return (Ne = L._emscripten_bind_DracoUInt32Array___destroy___0 = L.asm.za).apply(
            null,
            arguments,
          );
        }),
        Ue = (L._emscripten_bind_MetadataQuerier_MetadataQuerier_0 = function () {
          return (Ue = L._emscripten_bind_MetadataQuerier_MetadataQuerier_0 = L.asm.Aa).apply(
            null,
            arguments,
          );
        }),
        ge = (L._emscripten_bind_MetadataQuerier_HasEntry_2 = function () {
          return (ge = L._emscripten_bind_MetadataQuerier_HasEntry_2 = L.asm.Ba).apply(
            null,
            arguments,
          );
        }),
        Fe = (L._emscripten_bind_MetadataQuerier_GetIntEntry_2 = function () {
          return (Fe = L._emscripten_bind_MetadataQuerier_GetIntEntry_2 = L.asm.Ca).apply(
            null,
            arguments,
          );
        }),
        Le = (L._emscripten_bind_MetadataQuerier_GetIntEntryArray_3 = function () {
          return (Le = L._emscripten_bind_MetadataQuerier_GetIntEntryArray_3 = L.asm.Da).apply(
            null,
            arguments,
          );
        }),
        Ce = (L._emscripten_bind_MetadataQuerier_GetDoubleEntry_2 = function () {
          return (Ce = L._emscripten_bind_MetadataQuerier_GetDoubleEntry_2 = L.asm.Ea).apply(
            null,
            arguments,
          );
        }),
        $e = (L._emscripten_bind_MetadataQuerier_GetStringEntry_2 = function () {
          return ($e = L._emscripten_bind_MetadataQuerier_GetStringEntry_2 = L.asm.Fa).apply(
            null,
            arguments,
          );
        }),
        we = (L._emscripten_bind_MetadataQuerier_NumEntries_1 = function () {
          return (we = L._emscripten_bind_MetadataQuerier_NumEntries_1 = L.asm.Ga).apply(
            null,
            arguments,
          );
        }),
        ze = (L._emscripten_bind_MetadataQuerier_GetEntryName_2 = function () {
          return (ze = L._emscripten_bind_MetadataQuerier_GetEntryName_2 = L.asm.Ha).apply(
            null,
            arguments,
          );
        }),
        Ve = (L._emscripten_bind_MetadataQuerier___destroy___0 = function () {
          return (Ve = L._emscripten_bind_MetadataQuerier___destroy___0 = L.asm.Ia).apply(
            null,
            arguments,
          );
        }),
        Be = (L._emscripten_bind_Decoder_Decoder_0 = function () {
          return (Be = L._emscripten_bind_Decoder_Decoder_0 = L.asm.Ja).apply(null, arguments);
        }),
        We = (L._emscripten_bind_Decoder_DecodeArrayToPointCloud_3 = function () {
          return (We = L._emscripten_bind_Decoder_DecodeArrayToPointCloud_3 = L.asm.Ka).apply(
            null,
            arguments,
          );
        }),
        ke = (L._emscripten_bind_Decoder_DecodeArrayToMesh_3 = function () {
          return (ke = L._emscripten_bind_Decoder_DecodeArrayToMesh_3 = L.asm.La).apply(
            null,
            arguments,
          );
        }),
        xe = (L._emscripten_bind_Decoder_GetAttributeId_2 = function () {
          return (xe = L._emscripten_bind_Decoder_GetAttributeId_2 = L.asm.Ma).apply(
            null,
            arguments,
          );
        }),
        Qe = (L._emscripten_bind_Decoder_GetAttributeIdByName_2 = function () {
          return (Qe = L._emscripten_bind_Decoder_GetAttributeIdByName_2 = L.asm.Na).apply(
            null,
            arguments,
          );
        }),
        Ye = (L._emscripten_bind_Decoder_GetAttributeIdByMetadataEntry_3 = function () {
          return (Ye = L._emscripten_bind_Decoder_GetAttributeIdByMetadataEntry_3 = L.asm.Oa).apply(
            null,
            arguments,
          );
        }),
        He = (L._emscripten_bind_Decoder_GetAttribute_2 = function () {
          return (He = L._emscripten_bind_Decoder_GetAttribute_2 = L.asm.Pa).apply(null, arguments);
        }),
        qe = (L._emscripten_bind_Decoder_GetAttributeByUniqueId_2 = function () {
          return (qe = L._emscripten_bind_Decoder_GetAttributeByUniqueId_2 = L.asm.Qa).apply(
            null,
            arguments,
          );
        }),
        Xe = (L._emscripten_bind_Decoder_GetMetadata_1 = function () {
          return (Xe = L._emscripten_bind_Decoder_GetMetadata_1 = L.asm.Ra).apply(null, arguments);
        }),
        Ke = (L._emscripten_bind_Decoder_GetAttributeMetadata_2 = function () {
          return (Ke = L._emscripten_bind_Decoder_GetAttributeMetadata_2 = L.asm.Sa).apply(
            null,
            arguments,
          );
        }),
        Je = (L._emscripten_bind_Decoder_GetFaceFromMesh_3 = function () {
          return (Je = L._emscripten_bind_Decoder_GetFaceFromMesh_3 = L.asm.Ta).apply(
            null,
            arguments,
          );
        }),
        Ze = (L._emscripten_bind_Decoder_GetTriangleStripsFromMesh_2 = function () {
          return (Ze = L._emscripten_bind_Decoder_GetTriangleStripsFromMesh_2 = L.asm.Ua).apply(
            null,
            arguments,
          );
        }),
        tr = (L._emscripten_bind_Decoder_GetTrianglesUInt16Array_3 = function () {
          return (tr = L._emscripten_bind_Decoder_GetTrianglesUInt16Array_3 = L.asm.Va).apply(
            null,
            arguments,
          );
        }),
        er = (L._emscripten_bind_Decoder_GetTrianglesUInt32Array_3 = function () {
          return (er = L._emscripten_bind_Decoder_GetTrianglesUInt32Array_3 = L.asm.Wa).apply(
            null,
            arguments,
          );
        }),
        rr = (L._emscripten_bind_Decoder_GetAttributeFloat_3 = function () {
          return (rr = L._emscripten_bind_Decoder_GetAttributeFloat_3 = L.asm.Xa).apply(
            null,
            arguments,
          );
        }),
        nr = (L._emscripten_bind_Decoder_GetAttributeFloatForAllPoints_3 = function () {
          return (nr = L._emscripten_bind_Decoder_GetAttributeFloatForAllPoints_3 = L.asm.Ya).apply(
            null,
            arguments,
          );
        }),
        or = (L._emscripten_bind_Decoder_GetAttributeIntForAllPoints_3 = function () {
          return (or = L._emscripten_bind_Decoder_GetAttributeIntForAllPoints_3 = L.asm.Za).apply(
            null,
            arguments,
          );
        }),
        _r = (L._emscripten_bind_Decoder_GetAttributeInt8ForAllPoints_3 = function () {
          return (_r = L._emscripten_bind_Decoder_GetAttributeInt8ForAllPoints_3 = L.asm._a).apply(
            null,
            arguments,
          );
        }),
        ir = (L._emscripten_bind_Decoder_GetAttributeUInt8ForAllPoints_3 = function () {
          return (ir = L._emscripten_bind_Decoder_GetAttributeUInt8ForAllPoints_3 = L.asm.$a).apply(
            null,
            arguments,
          );
        }),
        pr = (L._emscripten_bind_Decoder_GetAttributeInt16ForAllPoints_3 = function () {
          return (pr = L._emscripten_bind_Decoder_GetAttributeInt16ForAllPoints_3 = L.asm.ab).apply(
            null,
            arguments,
          );
        }),
        ar = (L._emscripten_bind_Decoder_GetAttributeUInt16ForAllPoints_3 = function () {
          return (ar = L._emscripten_bind_Decoder_GetAttributeUInt16ForAllPoints_3 =
            L.asm.bb).apply(null, arguments);
        }),
        cr = (L._emscripten_bind_Decoder_GetAttributeInt32ForAllPoints_3 = function () {
          return (cr = L._emscripten_bind_Decoder_GetAttributeInt32ForAllPoints_3 = L.asm.cb).apply(
            null,
            arguments,
          );
        }),
        sr = (L._emscripten_bind_Decoder_GetAttributeUInt32ForAllPoints_3 = function () {
          return (sr = L._emscripten_bind_Decoder_GetAttributeUInt32ForAllPoints_3 =
            L.asm.db).apply(null, arguments);
        }),
        ur = (L._emscripten_bind_Decoder_GetAttributeDataArrayForAllPoints_5 = function () {
          return (ur = L._emscripten_bind_Decoder_GetAttributeDataArrayForAllPoints_5 =
            L.asm.eb).apply(null, arguments);
        }),
        yr = (L._emscripten_bind_Decoder_SkipAttributeTransform_1 = function () {
          return (yr = L._emscripten_bind_Decoder_SkipAttributeTransform_1 = L.asm.fb).apply(
            null,
            arguments,
          );
        }),
        lr = (L._emscripten_bind_Decoder_GetEncodedGeometryType_Deprecated_1 = function () {
          return (lr = L._emscripten_bind_Decoder_GetEncodedGeometryType_Deprecated_1 =
            L.asm.gb).apply(null, arguments);
        }),
        fr = (L._emscripten_bind_Decoder_DecodeBufferToPointCloud_2 = function () {
          return (fr = L._emscripten_bind_Decoder_DecodeBufferToPointCloud_2 = L.asm.hb).apply(
            null,
            arguments,
          );
        }),
        mr = (L._emscripten_bind_Decoder_DecodeBufferToMesh_2 = function () {
          return (mr = L._emscripten_bind_Decoder_DecodeBufferToMesh_2 = L.asm.ib).apply(
            null,
            arguments,
          );
        }),
        dr = (L._emscripten_bind_Decoder___destroy___0 = function () {
          return (dr = L._emscripten_bind_Decoder___destroy___0 = L.asm.jb).apply(null, arguments);
        }),
        br = (L._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_INVALID_TRANSFORM =
          function () {
            return (br =
              L._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_INVALID_TRANSFORM =
                L.asm.kb).apply(null, arguments);
          }),
        hr = (L._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_NO_TRANSFORM = function () {
          return (hr = L._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_NO_TRANSFORM =
            L.asm.lb).apply(null, arguments);
        }),
        Ar = (L._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_QUANTIZATION_TRANSFORM =
          function () {
            return (Ar =
              L._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_QUANTIZATION_TRANSFORM =
                L.asm.mb).apply(null, arguments);
          }),
        Tr = (L._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_OCTAHEDRON_TRANSFORM =
          function () {
            return (Tr =
              L._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_OCTAHEDRON_TRANSFORM =
                L.asm.nb).apply(null, arguments);
          }),
        Dr = (L._emscripten_enum_draco_GeometryAttribute_Type_INVALID = function () {
          return (Dr = L._emscripten_enum_draco_GeometryAttribute_Type_INVALID = L.asm.ob).apply(
            null,
            arguments,
          );
        }),
        Ir = (L._emscripten_enum_draco_GeometryAttribute_Type_POSITION = function () {
          return (Ir = L._emscripten_enum_draco_GeometryAttribute_Type_POSITION = L.asm.pb).apply(
            null,
            arguments,
          );
        }),
        jr = (L._emscripten_enum_draco_GeometryAttribute_Type_NORMAL = function () {
          return (jr = L._emscripten_enum_draco_GeometryAttribute_Type_NORMAL = L.asm.qb).apply(
            null,
            arguments,
          );
        }),
        Er = (L._emscripten_enum_draco_GeometryAttribute_Type_COLOR = function () {
          return (Er = L._emscripten_enum_draco_GeometryAttribute_Type_COLOR = L.asm.rb).apply(
            null,
            arguments,
          );
        }),
        Gr = (L._emscripten_enum_draco_GeometryAttribute_Type_TEX_COORD = function () {
          return (Gr = L._emscripten_enum_draco_GeometryAttribute_Type_TEX_COORD = L.asm.sb).apply(
            null,
            arguments,
          );
        }),
        Or = (L._emscripten_enum_draco_GeometryAttribute_Type_GENERIC = function () {
          return (Or = L._emscripten_enum_draco_GeometryAttribute_Type_GENERIC = L.asm.tb).apply(
            null,
            arguments,
          );
        }),
        vr = (L._emscripten_enum_draco_EncodedGeometryType_INVALID_GEOMETRY_TYPE = function () {
          return (vr = L._emscripten_enum_draco_EncodedGeometryType_INVALID_GEOMETRY_TYPE =
            L.asm.ub).apply(null, arguments);
        }),
        Pr = (L._emscripten_enum_draco_EncodedGeometryType_POINT_CLOUD = function () {
          return (Pr = L._emscripten_enum_draco_EncodedGeometryType_POINT_CLOUD = L.asm.vb).apply(
            null,
            arguments,
          );
        }),
        Rr = (L._emscripten_enum_draco_EncodedGeometryType_TRIANGULAR_MESH = function () {
          return (Rr = L._emscripten_enum_draco_EncodedGeometryType_TRIANGULAR_MESH =
            L.asm.wb).apply(null, arguments);
        }),
        Sr = (L._emscripten_enum_draco_DataType_DT_INVALID = function () {
          return (Sr = L._emscripten_enum_draco_DataType_DT_INVALID = L.asm.xb).apply(
            null,
            arguments,
          );
        }),
        Mr = (L._emscripten_enum_draco_DataType_DT_INT8 = function () {
          return (Mr = L._emscripten_enum_draco_DataType_DT_INT8 = L.asm.yb).apply(null, arguments);
        }),
        Nr = (L._emscripten_enum_draco_DataType_DT_UINT8 = function () {
          return (Nr = L._emscripten_enum_draco_DataType_DT_UINT8 = L.asm.zb).apply(
            null,
            arguments,
          );
        }),
        Ur = (L._emscripten_enum_draco_DataType_DT_INT16 = function () {
          return (Ur = L._emscripten_enum_draco_DataType_DT_INT16 = L.asm.Ab).apply(
            null,
            arguments,
          );
        }),
        gr = (L._emscripten_enum_draco_DataType_DT_UINT16 = function () {
          return (gr = L._emscripten_enum_draco_DataType_DT_UINT16 = L.asm.Bb).apply(
            null,
            arguments,
          );
        }),
        Fr = (L._emscripten_enum_draco_DataType_DT_INT32 = function () {
          return (Fr = L._emscripten_enum_draco_DataType_DT_INT32 = L.asm.Cb).apply(
            null,
            arguments,
          );
        }),
        Lr = (L._emscripten_enum_draco_DataType_DT_UINT32 = function () {
          return (Lr = L._emscripten_enum_draco_DataType_DT_UINT32 = L.asm.Db).apply(
            null,
            arguments,
          );
        }),
        Cr = (L._emscripten_enum_draco_DataType_DT_INT64 = function () {
          return (Cr = L._emscripten_enum_draco_DataType_DT_INT64 = L.asm.Eb).apply(
            null,
            arguments,
          );
        }),
        $r = (L._emscripten_enum_draco_DataType_DT_UINT64 = function () {
          return ($r = L._emscripten_enum_draco_DataType_DT_UINT64 = L.asm.Fb).apply(
            null,
            arguments,
          );
        }),
        wr = (L._emscripten_enum_draco_DataType_DT_FLOAT32 = function () {
          return (wr = L._emscripten_enum_draco_DataType_DT_FLOAT32 = L.asm.Gb).apply(
            null,
            arguments,
          );
        }),
        zr = (L._emscripten_enum_draco_DataType_DT_FLOAT64 = function () {
          return (zr = L._emscripten_enum_draco_DataType_DT_FLOAT64 = L.asm.Hb).apply(
            null,
            arguments,
          );
        }),
        Vr = (L._emscripten_enum_draco_DataType_DT_BOOL = function () {
          return (Vr = L._emscripten_enum_draco_DataType_DT_BOOL = L.asm.Ib).apply(null, arguments);
        }),
        Br = (L._emscripten_enum_draco_DataType_DT_TYPES_COUNT = function () {
          return (Br = L._emscripten_enum_draco_DataType_DT_TYPES_COUNT = L.asm.Jb).apply(
            null,
            arguments,
          );
        }),
        Wr = (L._emscripten_enum_draco_StatusCode_OK = function () {
          return (Wr = L._emscripten_enum_draco_StatusCode_OK = L.asm.Kb).apply(null, arguments);
        }),
        kr = (L._emscripten_enum_draco_StatusCode_DRACO_ERROR = function () {
          return (kr = L._emscripten_enum_draco_StatusCode_DRACO_ERROR = L.asm.Lb).apply(
            null,
            arguments,
          );
        }),
        xr = (L._emscripten_enum_draco_StatusCode_IO_ERROR = function () {
          return (xr = L._emscripten_enum_draco_StatusCode_IO_ERROR = L.asm.Mb).apply(
            null,
            arguments,
          );
        }),
        Qr = (L._emscripten_enum_draco_StatusCode_INVALID_PARAMETER = function () {
          return (Qr = L._emscripten_enum_draco_StatusCode_INVALID_PARAMETER = L.asm.Nb).apply(
            null,
            arguments,
          );
        }),
        Yr = (L._emscripten_enum_draco_StatusCode_UNSUPPORTED_VERSION = function () {
          return (Yr = L._emscripten_enum_draco_StatusCode_UNSUPPORTED_VERSION = L.asm.Ob).apply(
            null,
            arguments,
          );
        }),
        Hr = (L._emscripten_enum_draco_StatusCode_UNKNOWN_VERSION = function () {
          return (Hr = L._emscripten_enum_draco_StatusCode_UNKNOWN_VERSION = L.asm.Pb).apply(
            null,
            arguments,
          );
        });
      (L._malloc = function () {
        return (L._malloc = L.asm.Qb).apply(null, arguments);
      }),
        (L._free = function () {
          return (L._free = L.asm.Rb).apply(null, arguments);
        });
      var qr,
        Xr = function () {
          return (Xr = L.asm.Sb).apply(null, arguments);
        };
      if (
        ((L.___start_em_js = 11660),
        (L.___stop_em_js = 11758),
        (ut = function t() {
          qr || a(), qr || (ut = t);
        }),
        L.preInit)
      )
        for ('function' == typeof L.preInit && (L.preInit = [L.preInit]); 0 < L.preInit.length; )
          L.preInit.pop()();
      a(),
        (c.prototype = Object.create(c.prototype)),
        (c.prototype.constructor = c),
        (c.prototype.__class__ = c),
        (c.__cache__ = {}),
        (L.WrapperObject = c),
        (L.getCache = s),
        (L.wrapPointer = u),
        (L.castObject = function (t, e) {
          return u(t.ptr, e);
        }),
        (L.NULL = u(0)),
        (L.destroy = function (t) {
          if (!t.__destroy__) throw 'Error: Cannot destroy object. (Did you create it yourself?)';
          t.__destroy__(), delete s(t.__class__)[t.ptr];
        }),
        (L.compare = function (t, e) {
          return t.ptr === e.ptr;
        }),
        (L.getPointer = function (t) {
          return t.ptr;
        }),
        (L.getClass = function (t) {
          return t.__class__;
        });
      var Kr = {
        buffer: 0,
        size: 0,
        pos: 0,
        temps: [],
        needed: 0,
        prepare: function () {
          if (Kr.needed) {
            for (var t = 0; t < Kr.temps.length; t++) L._free(Kr.temps[t]);
            (Kr.temps.length = 0),
              L._free(Kr.buffer),
              (Kr.buffer = 0),
              (Kr.size += Kr.needed),
              (Kr.needed = 0);
          }
          Kr.buffer || ((Kr.size += 128), (Kr.buffer = L._malloc(Kr.size)), Kr.buffer || o(void 0)),
            (Kr.pos = 0);
        },
        alloc: function (t, e) {
          return (
            Kr.buffer || o(void 0),
            (t = ((t = t.length * e.BYTES_PER_ELEMENT) + 7) & -8),
            Kr.pos + t >= Kr.size
              ? (0 < t || o(void 0), (Kr.needed += t), (e = L._malloc(t)), Kr.temps.push(e))
              : ((e = Kr.buffer + Kr.pos), (Kr.pos += t)),
            e
          );
        },
        copy: function (t, e, r) {
          switch (((r >>>= 0), e.BYTES_PER_ELEMENT)) {
            case 2:
              r >>>= 1;
              break;
            case 4:
              r >>>= 2;
              break;
            case 8:
              r >>>= 3;
          }
          for (var n = 0; n < t.length; n++) e[r + n] = t[n];
        },
      };
      return (
        (f.prototype = Object.create(c.prototype)),
        (f.prototype.constructor = f),
        (f.prototype.__class__ = f),
        (f.__cache__ = {}),
        (L.VoidPtr = f),
        (f.prototype.__destroy__ = f.prototype.__destroy__ =
          function () {
            ft(this.ptr);
          }),
        (m.prototype = Object.create(c.prototype)),
        (m.prototype.constructor = m),
        (m.prototype.__class__ = m),
        (m.__cache__ = {}),
        (L.DecoderBuffer = m),
        (m.prototype.Init = m.prototype.Init =
          function (t, e) {
            var r = this.ptr;
            Kr.prepare(),
              'object' == typeof t && (t = l(t)),
              e && 'object' == typeof e && (e = e.ptr),
              dt(r, t, e);
          }),
        (m.prototype.__destroy__ = m.prototype.__destroy__ =
          function () {
            bt(this.ptr);
          }),
        (d.prototype = Object.create(c.prototype)),
        (d.prototype.constructor = d),
        (d.prototype.__class__ = d),
        (d.__cache__ = {}),
        (L.AttributeTransformData = d),
        (d.prototype.transform_type = d.prototype.transform_type =
          function () {
            return At(this.ptr);
          }),
        (d.prototype.__destroy__ = d.prototype.__destroy__ =
          function () {
            Tt(this.ptr);
          }),
        (b.prototype = Object.create(c.prototype)),
        (b.prototype.constructor = b),
        (b.prototype.__class__ = b),
        (b.__cache__ = {}),
        (L.GeometryAttribute = b),
        (b.prototype.__destroy__ = b.prototype.__destroy__ =
          function () {
            It(this.ptr);
          }),
        (h.prototype = Object.create(c.prototype)),
        (h.prototype.constructor = h),
        (h.prototype.__class__ = h),
        (h.__cache__ = {}),
        (L.PointAttribute = h),
        (h.prototype.size = h.prototype.size =
          function () {
            return Et(this.ptr);
          }),
        (h.prototype.GetAttributeTransformData = h.prototype.GetAttributeTransformData =
          function () {
            return u(Gt(this.ptr), d);
          }),
        (h.prototype.attribute_type = h.prototype.attribute_type =
          function () {
            return Ot(this.ptr);
          }),
        (h.prototype.data_type = h.prototype.data_type =
          function () {
            return vt(this.ptr);
          }),
        (h.prototype.num_components = h.prototype.num_components =
          function () {
            return Pt(this.ptr);
          }),
        (h.prototype.normalized = h.prototype.normalized =
          function () {
            return !!Rt(this.ptr);
          }),
        (h.prototype.byte_stride = h.prototype.byte_stride =
          function () {
            return St(this.ptr);
          }),
        (h.prototype.byte_offset = h.prototype.byte_offset =
          function () {
            return Mt(this.ptr);
          }),
        (h.prototype.unique_id = h.prototype.unique_id =
          function () {
            return Nt(this.ptr);
          }),
        (h.prototype.__destroy__ = h.prototype.__destroy__ =
          function () {
            Ut(this.ptr);
          }),
        (A.prototype = Object.create(c.prototype)),
        (A.prototype.constructor = A),
        (A.prototype.__class__ = A),
        (A.__cache__ = {}),
        (L.AttributeQuantizationTransform = A),
        (A.prototype.InitFromAttribute = A.prototype.InitFromAttribute =
          function (t) {
            var e = this.ptr;
            return t && 'object' == typeof t && (t = t.ptr), !!Ft(e, t);
          }),
        (A.prototype.quantization_bits = A.prototype.quantization_bits =
          function () {
            return Lt(this.ptr);
          }),
        (A.prototype.min_value = A.prototype.min_value =
          function (t) {
            var e = this.ptr;
            return t && 'object' == typeof t && (t = t.ptr), Ct(e, t);
          }),
        (A.prototype.range = A.prototype.range =
          function () {
            return $t(this.ptr);
          }),
        (A.prototype.__destroy__ = A.prototype.__destroy__ =
          function () {
            wt(this.ptr);
          }),
        (T.prototype = Object.create(c.prototype)),
        (T.prototype.constructor = T),
        (T.prototype.__class__ = T),
        (T.__cache__ = {}),
        (L.AttributeOctahedronTransform = T),
        (T.prototype.InitFromAttribute = T.prototype.InitFromAttribute =
          function (t) {
            var e = this.ptr;
            return t && 'object' == typeof t && (t = t.ptr), !!Vt(e, t);
          }),
        (T.prototype.quantization_bits = T.prototype.quantization_bits =
          function () {
            return Bt(this.ptr);
          }),
        (T.prototype.__destroy__ = T.prototype.__destroy__ =
          function () {
            Wt(this.ptr);
          }),
        (D.prototype = Object.create(c.prototype)),
        (D.prototype.constructor = D),
        (D.prototype.__class__ = D),
        (D.__cache__ = {}),
        (L.PointCloud = D),
        (D.prototype.num_attributes = D.prototype.num_attributes =
          function () {
            return xt(this.ptr);
          }),
        (D.prototype.num_points = D.prototype.num_points =
          function () {
            return Qt(this.ptr);
          }),
        (D.prototype.__destroy__ = D.prototype.__destroy__ =
          function () {
            Yt(this.ptr);
          }),
        (I.prototype = Object.create(c.prototype)),
        (I.prototype.constructor = I),
        (I.prototype.__class__ = I),
        (I.__cache__ = {}),
        (L.Mesh = I),
        (I.prototype.num_faces = I.prototype.num_faces =
          function () {
            return qt(this.ptr);
          }),
        (I.prototype.num_attributes = I.prototype.num_attributes =
          function () {
            return Xt(this.ptr);
          }),
        (I.prototype.num_points = I.prototype.num_points =
          function () {
            return Kt(this.ptr);
          }),
        (I.prototype.__destroy__ = I.prototype.__destroy__ =
          function () {
            Jt(this.ptr);
          }),
        (j.prototype = Object.create(c.prototype)),
        (j.prototype.constructor = j),
        (j.prototype.__class__ = j),
        (j.__cache__ = {}),
        (L.Metadata = j),
        (j.prototype.__destroy__ = j.prototype.__destroy__ =
          function () {
            te(this.ptr);
          }),
        (E.prototype = Object.create(c.prototype)),
        (E.prototype.constructor = E),
        (E.prototype.__class__ = E),
        (E.__cache__ = {}),
        (L.Status = E),
        (E.prototype.code = E.prototype.code =
          function () {
            return ee(this.ptr);
          }),
        (E.prototype.ok = E.prototype.ok =
          function () {
            return !!re(this.ptr);
          }),
        (E.prototype.error_msg = E.prototype.error_msg =
          function () {
            return r(ne(this.ptr));
          }),
        (E.prototype.__destroy__ = E.prototype.__destroy__ =
          function () {
            oe(this.ptr);
          }),
        (G.prototype = Object.create(c.prototype)),
        (G.prototype.constructor = G),
        (G.prototype.__class__ = G),
        (G.__cache__ = {}),
        (L.DracoFloat32Array = G),
        (G.prototype.GetValue = G.prototype.GetValue =
          function (t) {
            var e = this.ptr;
            return t && 'object' == typeof t && (t = t.ptr), ie(e, t);
          }),
        (G.prototype.size = G.prototype.size =
          function () {
            return pe(this.ptr);
          }),
        (G.prototype.__destroy__ = G.prototype.__destroy__ =
          function () {
            ae(this.ptr);
          }),
        (O.prototype = Object.create(c.prototype)),
        (O.prototype.constructor = O),
        (O.prototype.__class__ = O),
        (O.__cache__ = {}),
        (L.DracoInt8Array = O),
        (O.prototype.GetValue = O.prototype.GetValue =
          function (t) {
            var e = this.ptr;
            return t && 'object' == typeof t && (t = t.ptr), se(e, t);
          }),
        (O.prototype.size = O.prototype.size =
          function () {
            return ue(this.ptr);
          }),
        (O.prototype.__destroy__ = O.prototype.__destroy__ =
          function () {
            ye(this.ptr);
          }),
        (v.prototype = Object.create(c.prototype)),
        (v.prototype.constructor = v),
        (v.prototype.__class__ = v),
        (v.__cache__ = {}),
        (L.DracoUInt8Array = v),
        (v.prototype.GetValue = v.prototype.GetValue =
          function (t) {
            var e = this.ptr;
            return t && 'object' == typeof t && (t = t.ptr), fe(e, t);
          }),
        (v.prototype.size = v.prototype.size =
          function () {
            return me(this.ptr);
          }),
        (v.prototype.__destroy__ = v.prototype.__destroy__ =
          function () {
            de(this.ptr);
          }),
        (P.prototype = Object.create(c.prototype)),
        (P.prototype.constructor = P),
        (P.prototype.__class__ = P),
        (P.__cache__ = {}),
        (L.DracoInt16Array = P),
        (P.prototype.GetValue = P.prototype.GetValue =
          function (t) {
            var e = this.ptr;
            return t && 'object' == typeof t && (t = t.ptr), he(e, t);
          }),
        (P.prototype.size = P.prototype.size =
          function () {
            return Ae(this.ptr);
          }),
        (P.prototype.__destroy__ = P.prototype.__destroy__ =
          function () {
            Te(this.ptr);
          }),
        (R.prototype = Object.create(c.prototype)),
        (R.prototype.constructor = R),
        (R.prototype.__class__ = R),
        (R.__cache__ = {}),
        (L.DracoUInt16Array = R),
        (R.prototype.GetValue = R.prototype.GetValue =
          function (t) {
            var e = this.ptr;
            return t && 'object' == typeof t && (t = t.ptr), Ie(e, t);
          }),
        (R.prototype.size = R.prototype.size =
          function () {
            return je(this.ptr);
          }),
        (R.prototype.__destroy__ = R.prototype.__destroy__ =
          function () {
            Ee(this.ptr);
          }),
        (S.prototype = Object.create(c.prototype)),
        (S.prototype.constructor = S),
        (S.prototype.__class__ = S),
        (S.__cache__ = {}),
        (L.DracoInt32Array = S),
        (S.prototype.GetValue = S.prototype.GetValue =
          function (t) {
            var e = this.ptr;
            return t && 'object' == typeof t && (t = t.ptr), Oe(e, t);
          }),
        (S.prototype.size = S.prototype.size =
          function () {
            return ve(this.ptr);
          }),
        (S.prototype.__destroy__ = S.prototype.__destroy__ =
          function () {
            Pe(this.ptr);
          }),
        (M.prototype = Object.create(c.prototype)),
        (M.prototype.constructor = M),
        (M.prototype.__class__ = M),
        (M.__cache__ = {}),
        (L.DracoUInt32Array = M),
        (M.prototype.GetValue = M.prototype.GetValue =
          function (t) {
            var e = this.ptr;
            return t && 'object' == typeof t && (t = t.ptr), Se(e, t);
          }),
        (M.prototype.size = M.prototype.size =
          function () {
            return Me(this.ptr);
          }),
        (M.prototype.__destroy__ = M.prototype.__destroy__ =
          function () {
            Ne(this.ptr);
          }),
        (N.prototype = Object.create(c.prototype)),
        (N.prototype.constructor = N),
        (N.prototype.__class__ = N),
        (N.__cache__ = {}),
        (L.MetadataQuerier = N),
        (N.prototype.HasEntry = N.prototype.HasEntry =
          function (t, e) {
            var r = this.ptr;
            return (
              Kr.prepare(),
              t && 'object' == typeof t && (t = t.ptr),
              (e = e && 'object' == typeof e ? e.ptr : y(e)),
              !!ge(r, t, e)
            );
          }),
        (N.prototype.GetIntEntry = N.prototype.GetIntEntry =
          function (t, e) {
            var r = this.ptr;
            return (
              Kr.prepare(),
              t && 'object' == typeof t && (t = t.ptr),
              (e = e && 'object' == typeof e ? e.ptr : y(e)),
              Fe(r, t, e)
            );
          }),
        (N.prototype.GetIntEntryArray = N.prototype.GetIntEntryArray =
          function (t, e, r) {
            var n = this.ptr;
            Kr.prepare(),
              t && 'object' == typeof t && (t = t.ptr),
              (e = e && 'object' == typeof e ? e.ptr : y(e)),
              r && 'object' == typeof r && (r = r.ptr),
              Le(n, t, e, r);
          }),
        (N.prototype.GetDoubleEntry = N.prototype.GetDoubleEntry =
          function (t, e) {
            var r = this.ptr;
            return (
              Kr.prepare(),
              t && 'object' == typeof t && (t = t.ptr),
              (e = e && 'object' == typeof e ? e.ptr : y(e)),
              Ce(r, t, e)
            );
          }),
        (N.prototype.GetStringEntry = N.prototype.GetStringEntry =
          function (t, e) {
            var n = this.ptr;
            return (
              Kr.prepare(),
              t && 'object' == typeof t && (t = t.ptr),
              (e = e && 'object' == typeof e ? e.ptr : y(e)),
              r($e(n, t, e))
            );
          }),
        (N.prototype.NumEntries = N.prototype.NumEntries =
          function (t) {
            var e = this.ptr;
            return t && 'object' == typeof t && (t = t.ptr), we(e, t);
          }),
        (N.prototype.GetEntryName = N.prototype.GetEntryName =
          function (t, e) {
            var n = this.ptr;
            return (
              t && 'object' == typeof t && (t = t.ptr),
              e && 'object' == typeof e && (e = e.ptr),
              r(ze(n, t, e))
            );
          }),
        (N.prototype.__destroy__ = N.prototype.__destroy__ =
          function () {
            Ve(this.ptr);
          }),
        (U.prototype = Object.create(c.prototype)),
        (U.prototype.constructor = U),
        (U.prototype.__class__ = U),
        (U.__cache__ = {}),
        (L.Decoder = U),
        (U.prototype.DecodeArrayToPointCloud = U.prototype.DecodeArrayToPointCloud =
          function (t, e, r) {
            var n = this.ptr;
            return (
              Kr.prepare(),
              'object' == typeof t && (t = l(t)),
              e && 'object' == typeof e && (e = e.ptr),
              r && 'object' == typeof r && (r = r.ptr),
              u(We(n, t, e, r), E)
            );
          }),
        (U.prototype.DecodeArrayToMesh = U.prototype.DecodeArrayToMesh =
          function (t, e, r) {
            var n = this.ptr;
            return (
              Kr.prepare(),
              'object' == typeof t && (t = l(t)),
              e && 'object' == typeof e && (e = e.ptr),
              r && 'object' == typeof r && (r = r.ptr),
              u(ke(n, t, e, r), E)
            );
          }),
        (U.prototype.GetAttributeId = U.prototype.GetAttributeId =
          function (t, e) {
            var r = this.ptr;
            return (
              t && 'object' == typeof t && (t = t.ptr),
              e && 'object' == typeof e && (e = e.ptr),
              xe(r, t, e)
            );
          }),
        (U.prototype.GetAttributeIdByName = U.prototype.GetAttributeIdByName =
          function (t, e) {
            var r = this.ptr;
            return (
              Kr.prepare(),
              t && 'object' == typeof t && (t = t.ptr),
              (e = e && 'object' == typeof e ? e.ptr : y(e)),
              Qe(r, t, e)
            );
          }),
        (U.prototype.GetAttributeIdByMetadataEntry = U.prototype.GetAttributeIdByMetadataEntry =
          function (t, e, r) {
            var n = this.ptr;
            return (
              Kr.prepare(),
              t && 'object' == typeof t && (t = t.ptr),
              (e = e && 'object' == typeof e ? e.ptr : y(e)),
              (r = r && 'object' == typeof r ? r.ptr : y(r)),
              Ye(n, t, e, r)
            );
          }),
        (U.prototype.GetAttribute = U.prototype.GetAttribute =
          function (t, e) {
            var r = this.ptr;
            return (
              t && 'object' == typeof t && (t = t.ptr),
              e && 'object' == typeof e && (e = e.ptr),
              u(He(r, t, e), h)
            );
          }),
        (U.prototype.GetAttributeByUniqueId = U.prototype.GetAttributeByUniqueId =
          function (t, e) {
            var r = this.ptr;
            return (
              t && 'object' == typeof t && (t = t.ptr),
              e && 'object' == typeof e && (e = e.ptr),
              u(qe(r, t, e), h)
            );
          }),
        (U.prototype.GetMetadata = U.prototype.GetMetadata =
          function (t) {
            var e = this.ptr;
            return t && 'object' == typeof t && (t = t.ptr), u(Xe(e, t), j);
          }),
        (U.prototype.GetAttributeMetadata = U.prototype.GetAttributeMetadata =
          function (t, e) {
            var r = this.ptr;
            return (
              t && 'object' == typeof t && (t = t.ptr),
              e && 'object' == typeof e && (e = e.ptr),
              u(Ke(r, t, e), j)
            );
          }),
        (U.prototype.GetFaceFromMesh = U.prototype.GetFaceFromMesh =
          function (t, e, r) {
            var n = this.ptr;
            return (
              t && 'object' == typeof t && (t = t.ptr),
              e && 'object' == typeof e && (e = e.ptr),
              r && 'object' == typeof r && (r = r.ptr),
              !!Je(n, t, e, r)
            );
          }),
        (U.prototype.GetTriangleStripsFromMesh = U.prototype.GetTriangleStripsFromMesh =
          function (t, e) {
            var r = this.ptr;
            return (
              t && 'object' == typeof t && (t = t.ptr),
              e && 'object' == typeof e && (e = e.ptr),
              Ze(r, t, e)
            );
          }),
        (U.prototype.GetTrianglesUInt16Array = U.prototype.GetTrianglesUInt16Array =
          function (t, e, r) {
            var n = this.ptr;
            return (
              t && 'object' == typeof t && (t = t.ptr),
              e && 'object' == typeof e && (e = e.ptr),
              r && 'object' == typeof r && (r = r.ptr),
              !!tr(n, t, e, r)
            );
          }),
        (U.prototype.GetTrianglesUInt32Array = U.prototype.GetTrianglesUInt32Array =
          function (t, e, r) {
            var n = this.ptr;
            return (
              t && 'object' == typeof t && (t = t.ptr),
              e && 'object' == typeof e && (e = e.ptr),
              r && 'object' == typeof r && (r = r.ptr),
              !!er(n, t, e, r)
            );
          }),
        (U.prototype.GetAttributeFloat = U.prototype.GetAttributeFloat =
          function (t, e, r) {
            var n = this.ptr;
            return (
              t && 'object' == typeof t && (t = t.ptr),
              e && 'object' == typeof e && (e = e.ptr),
              r && 'object' == typeof r && (r = r.ptr),
              !!rr(n, t, e, r)
            );
          }),
        (U.prototype.GetAttributeFloatForAllPoints = U.prototype.GetAttributeFloatForAllPoints =
          function (t, e, r) {
            var n = this.ptr;
            return (
              t && 'object' == typeof t && (t = t.ptr),
              e && 'object' == typeof e && (e = e.ptr),
              r && 'object' == typeof r && (r = r.ptr),
              !!nr(n, t, e, r)
            );
          }),
        (U.prototype.GetAttributeIntForAllPoints = U.prototype.GetAttributeIntForAllPoints =
          function (t, e, r) {
            var n = this.ptr;
            return (
              t && 'object' == typeof t && (t = t.ptr),
              e && 'object' == typeof e && (e = e.ptr),
              r && 'object' == typeof r && (r = r.ptr),
              !!or(n, t, e, r)
            );
          }),
        (U.prototype.GetAttributeInt8ForAllPoints = U.prototype.GetAttributeInt8ForAllPoints =
          function (t, e, r) {
            var n = this.ptr;
            return (
              t && 'object' == typeof t && (t = t.ptr),
              e && 'object' == typeof e && (e = e.ptr),
              r && 'object' == typeof r && (r = r.ptr),
              !!_r(n, t, e, r)
            );
          }),
        (U.prototype.GetAttributeUInt8ForAllPoints = U.prototype.GetAttributeUInt8ForAllPoints =
          function (t, e, r) {
            var n = this.ptr;
            return (
              t && 'object' == typeof t && (t = t.ptr),
              e && 'object' == typeof e && (e = e.ptr),
              r && 'object' == typeof r && (r = r.ptr),
              !!ir(n, t, e, r)
            );
          }),
        (U.prototype.GetAttributeInt16ForAllPoints = U.prototype.GetAttributeInt16ForAllPoints =
          function (t, e, r) {
            var n = this.ptr;
            return (
              t && 'object' == typeof t && (t = t.ptr),
              e && 'object' == typeof e && (e = e.ptr),
              r && 'object' == typeof r && (r = r.ptr),
              !!pr(n, t, e, r)
            );
          }),
        (U.prototype.GetAttributeUInt16ForAllPoints = U.prototype.GetAttributeUInt16ForAllPoints =
          function (t, e, r) {
            var n = this.ptr;
            return (
              t && 'object' == typeof t && (t = t.ptr),
              e && 'object' == typeof e && (e = e.ptr),
              r && 'object' == typeof r && (r = r.ptr),
              !!ar(n, t, e, r)
            );
          }),
        (U.prototype.GetAttributeInt32ForAllPoints = U.prototype.GetAttributeInt32ForAllPoints =
          function (t, e, r) {
            var n = this.ptr;
            return (
              t && 'object' == typeof t && (t = t.ptr),
              e && 'object' == typeof e && (e = e.ptr),
              r && 'object' == typeof r && (r = r.ptr),
              !!cr(n, t, e, r)
            );
          }),
        (U.prototype.GetAttributeUInt32ForAllPoints = U.prototype.GetAttributeUInt32ForAllPoints =
          function (t, e, r) {
            var n = this.ptr;
            return (
              t && 'object' == typeof t && (t = t.ptr),
              e && 'object' == typeof e && (e = e.ptr),
              r && 'object' == typeof r && (r = r.ptr),
              !!sr(n, t, e, r)
            );
          }),
        (U.prototype.GetAttributeDataArrayForAllPoints =
          U.prototype.GetAttributeDataArrayForAllPoints =
            function (t, e, r, n, o) {
              var _ = this.ptr;
              return (
                t && 'object' == typeof t && (t = t.ptr),
                e && 'object' == typeof e && (e = e.ptr),
                r && 'object' == typeof r && (r = r.ptr),
                n && 'object' == typeof n && (n = n.ptr),
                o && 'object' == typeof o && (o = o.ptr),
                !!ur(_, t, e, r, n, o)
              );
            }),
        (U.prototype.SkipAttributeTransform = U.prototype.SkipAttributeTransform =
          function (t) {
            var e = this.ptr;
            t && 'object' == typeof t && (t = t.ptr), yr(e, t);
          }),
        (U.prototype.GetEncodedGeometryType_Deprecated =
          U.prototype.GetEncodedGeometryType_Deprecated =
            function (t) {
              var e = this.ptr;
              return t && 'object' == typeof t && (t = t.ptr), lr(e, t);
            }),
        (U.prototype.DecodeBufferToPointCloud = U.prototype.DecodeBufferToPointCloud =
          function (t, e) {
            var r = this.ptr;
            return (
              t && 'object' == typeof t && (t = t.ptr),
              e && 'object' == typeof e && (e = e.ptr),
              u(fr(r, t, e), E)
            );
          }),
        (U.prototype.DecodeBufferToMesh = U.prototype.DecodeBufferToMesh =
          function (t, e) {
            var r = this.ptr;
            return (
              t && 'object' == typeof t && (t = t.ptr),
              e && 'object' == typeof e && (e = e.ptr),
              u(mr(r, t, e), E)
            );
          }),
        (U.prototype.__destroy__ = U.prototype.__destroy__ =
          function () {
            dr(this.ptr);
          }),
        (function () {
          function t() {
            (L.ATTRIBUTE_INVALID_TRANSFORM = br()),
              (L.ATTRIBUTE_NO_TRANSFORM = hr()),
              (L.ATTRIBUTE_QUANTIZATION_TRANSFORM = Ar()),
              (L.ATTRIBUTE_OCTAHEDRON_TRANSFORM = Tr()),
              (L.INVALID = Dr()),
              (L.POSITION = Ir()),
              (L.NORMAL = jr()),
              (L.COLOR = Er()),
              (L.TEX_COORD = Gr()),
              (L.GENERIC = Or()),
              (L.INVALID_GEOMETRY_TYPE = vr()),
              (L.POINT_CLOUD = Pr()),
              (L.TRIANGULAR_MESH = Rr()),
              (L.DT_INVALID = Sr()),
              (L.DT_INT8 = Mr()),
              (L.DT_UINT8 = Nr()),
              (L.DT_INT16 = Ur()),
              (L.DT_UINT16 = gr()),
              (L.DT_INT32 = Fr()),
              (L.DT_UINT32 = Lr()),
              (L.DT_INT64 = Cr()),
              (L.DT_UINT64 = $r()),
              (L.DT_FLOAT32 = wr()),
              (L.DT_FLOAT64 = zr()),
              (L.DT_BOOL = Vr()),
              (L.DT_TYPES_COUNT = Br()),
              (L.OK = Wr()),
              (L.DRACO_ERROR = kr()),
              (L.IO_ERROR = xr()),
              (L.INVALID_PARAMETER = Qr()),
              (L.UNSUPPORTED_VERSION = Yr()),
              (L.UNKNOWN_VERSION = Hr());
          }
          at ? t() : it.unshift(t);
        })(),
        'function' == typeof L.onModuleParsed && L.onModuleParsed(),
        (L.Decoder.prototype.GetEncodedGeometryType = function (t) {
          if (t.__class__ && t.__class__ === L.DecoderBuffer)
            return L.Decoder.prototype.GetEncodedGeometryType_Deprecated(t);
          if (8 > t.byteLength) return L.INVALID_GEOMETRY_TYPE;
          switch (t[7]) {
            case 0:
              return L.POINT_CLOUD;
            case 1:
              return L.TRIANGULAR_MESH;
            default:
              return L.INVALID_GEOMETRY_TYPE;
          }
        }),
        e.ready
      );
    }
  );
})();
'object' == typeof exports && 'object' == typeof module
  ? (module.exports = DracoDecoderModule)
  : 'function' == typeof define && define.amd
    ? define([], function () {
        return DracoDecoderModule;
      })
    : 'object' == typeof exports && (exports.DracoDecoderModule = DracoDecoderModule);
