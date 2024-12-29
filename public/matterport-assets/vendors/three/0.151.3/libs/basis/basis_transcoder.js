var BASIS = (() => {
  var t =
    'undefined' != typeof document && document.currentScript ? document.currentScript.src : void 0;
  return (
    'undefined' != typeof __filename && (t = t || __filename),
    function (e = {}) {
      var r,
        n,
        o = void 0 !== e ? e : {};
      o.ready = new Promise(function (t, e) {
        (r = t), (n = e);
      });
      var i,
        a,
        s,
        u = Object.assign({}, o),
        c = 'object' == typeof window,
        l = 'function' == typeof importScripts,
        f =
          'object' == typeof process &&
          'object' == typeof process.versions &&
          'string' == typeof process.versions.node,
        p = '';
      if (f) {
        var d = require('fs'),
          h = require('path');
        (p = l ? h.dirname(p) + '/' : __dirname + '/'),
          (i = (t, e) => (
            (t = M(t) ? new URL(t) : h.normalize(t)), d.readFileSync(t, e ? void 0 : 'utf8')
          )),
          (s = (t) => {
            var e = i(t, !0);
            return e.buffer || (e = new Uint8Array(e)), e;
          }),
          (a = (t, e, r) => {
            (t = M(t) ? new URL(t) : h.normalize(t)),
              d.readFile(t, function (t, n) {
                t ? r(t) : e(n.buffer);
              });
          }),
          process.argv.length > 1 && process.argv[1].replace(/\\/g, '/'),
          process.argv.slice(2),
          (t, e) => {
            throw ((process.exitCode = t), e);
          },
          (o.inspect = function () {
            return '[Emscripten Module object]';
          });
      } else
        (c || l) &&
          (l
            ? (p = self.location.href)
            : 'undefined' != typeof document &&
              document.currentScript &&
              (p = document.currentScript.src),
          t && (p = t),
          (p =
            0 !== p.indexOf('blob:')
              ? p.substr(0, p.replace(/[?#].*/, '').lastIndexOf('/') + 1)
              : ''),
          (i = (t) => {
            var e = new XMLHttpRequest();
            return e.open('GET', t, !1), e.send(null), e.responseText;
          }),
          l &&
            (s = (t) => {
              var e = new XMLHttpRequest();
              return (
                e.open('GET', t, !1),
                (e.responseType = 'arraybuffer'),
                e.send(null),
                new Uint8Array(e.response)
              );
            }),
          (a = (t, e, r) => {
            var n = new XMLHttpRequest();
            n.open('GET', t, !0),
              (n.responseType = 'arraybuffer'),
              (n.onload = () => {
                200 == n.status || (0 == n.status && n.response) ? e(n.response) : r();
              }),
              (n.onerror = r),
              n.send(null);
          }),
          (t) => (document.title = t));
      var v,
        y = o.print || console.log.bind(console),
        m = o.printErr || console.warn.bind(console);
      Object.assign(o, u),
        (u = null),
        o.arguments && o.arguments,
        o.thisProgram && o.thisProgram,
        o.quit && o.quit,
        o.wasmBinary && (v = o.wasmBinary);
      var g;
      o.noExitRuntime;
      'object' != typeof WebAssembly && V('no native wasm support detected');
      var $ = !1;
      var b,
        w,
        T,
        C,
        P,
        A,
        _,
        S,
        j,
        W = 'undefined' != typeof TextDecoder ? new TextDecoder('utf8') : void 0;
      function k(t, e, r) {
        for (var n = e + r, o = e; t[o] && !(o >= n); ) ++o;
        if (o - e > 16 && t.buffer && W) return W.decode(t.subarray(e, o));
        for (var i = ''; e < o; ) {
          var a = t[e++];
          if (128 & a) {
            var s = 63 & t[e++];
            if (192 != (224 & a)) {
              var u = 63 & t[e++];
              if (
                (a =
                  224 == (240 & a)
                    ? ((15 & a) << 12) | (s << 6) | u
                    : ((7 & a) << 18) | (s << 12) | (u << 6) | (63 & t[e++])) < 65536
              )
                i += String.fromCharCode(a);
              else {
                var c = a - 65536;
                i += String.fromCharCode(55296 | (c >> 10), 56320 | (1023 & c));
              }
            } else i += String.fromCharCode(((31 & a) << 6) | s);
          } else i += String.fromCharCode(a);
        }
        return i;
      }
      function E(t, e) {
        return t ? k(w, t, e) : '';
      }
      function F() {
        var t = g.buffer;
        (o.HEAP8 = b = new Int8Array(t)),
          (o.HEAP16 = T = new Int16Array(t)),
          (o.HEAP32 = P = new Int32Array(t)),
          (o.HEAPU8 = w = new Uint8Array(t)),
          (o.HEAPU16 = C = new Uint16Array(t)),
          (o.HEAPU32 = A = new Uint32Array(t)),
          (o.HEAPF32 = _ = new Float32Array(t)),
          (o.HEAPF64 = S = new Float64Array(t));
      }
      var O = [],
        R = [],
        I = [];
      var D = 0,
        x = null,
        U = null;
      function V(t) {
        o.onAbort && o.onAbort(t),
          m((t = 'Aborted(' + t + ')')),
          ($ = !0),
          1,
          (t += '. Build with -sASSERTIONS for more info.');
        var e = new WebAssembly.RuntimeError(t);
        throw (n(e), e);
      }
      var H, B;
      function z(t) {
        return t.startsWith('data:application/octet-stream;base64,');
      }
      function M(t) {
        return t.startsWith('file://');
      }
      function q(t) {
        try {
          if (t == H && v) return new Uint8Array(v);
          if (s) return s(t);
          throw 'both async and sync fetching of the wasm failed';
        } catch (t) {
          V(t);
        }
      }
      function L(t, e, r) {
        return (function (t) {
          if (!v && (c || l)) {
            if ('function' == typeof fetch && !M(t))
              return fetch(t, { credentials: 'same-origin' })
                .then(function (e) {
                  if (!e.ok) throw "failed to load wasm binary file at '" + t + "'";
                  return e.arrayBuffer();
                })
                .catch(function () {
                  return q(t);
                });
            if (a)
              return new Promise(function (e, r) {
                a(
                  t,
                  function (t) {
                    e(new Uint8Array(t));
                  },
                  r,
                );
              });
          }
          return Promise.resolve().then(function () {
            return q(t);
          });
        })(t)
          .then(function (t) {
            return WebAssembly.instantiate(t, e);
          })
          .then(function (t) {
            return t;
          })
          .then(r, function (t) {
            m('failed to asynchronously prepare wasm: ' + t), V(t);
          });
      }
      function N(t) {
        for (; t.length > 0; ) t.shift()(o);
      }
      function G(t) {
        (this.excPtr = t),
          (this.ptr = t - 24),
          (this.set_type = function (t) {
            A[(this.ptr + 4) >> 2] = t;
          }),
          (this.get_type = function () {
            return A[(this.ptr + 4) >> 2];
          }),
          (this.set_destructor = function (t) {
            A[(this.ptr + 8) >> 2] = t;
          }),
          (this.get_destructor = function () {
            return A[(this.ptr + 8) >> 2];
          }),
          (this.set_refcount = function (t) {
            P[this.ptr >> 2] = t;
          }),
          (this.set_caught = function (t) {
            (t = t ? 1 : 0), (b[(this.ptr + 12) >> 0] = t);
          }),
          (this.get_caught = function () {
            return 0 != b[(this.ptr + 12) >> 0];
          }),
          (this.set_rethrown = function (t) {
            (t = t ? 1 : 0), (b[(this.ptr + 13) >> 0] = t);
          }),
          (this.get_rethrown = function () {
            return 0 != b[(this.ptr + 13) >> 0];
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
            var t = P[this.ptr >> 2];
            P[this.ptr >> 2] = t + 1;
          }),
          (this.release_ref = function () {
            var t = P[this.ptr >> 2];
            return (P[this.ptr >> 2] = t - 1), 1 === t;
          }),
          (this.set_adjusted_ptr = function (t) {
            A[(this.ptr + 16) >> 2] = t;
          }),
          (this.get_adjusted_ptr = function () {
            return A[(this.ptr + 16) >> 2];
          }),
          (this.get_exception_ptr = function () {
            if (Oe(this.get_type())) return A[this.excPtr >> 2];
            var t = this.get_adjusted_ptr();
            return 0 !== t ? t : this.excPtr;
          });
      }
      z((H = 'basis_transcoder.wasm')) ||
        ((B = H), (H = o.locateFile ? o.locateFile(B, p) : p + B));
      var X = {};
      function J(t) {
        for (; t.length; ) {
          var e = t.pop();
          t.pop()(e);
        }
      }
      function K(t) {
        return this.fromWireType(P[t >> 2]);
      }
      var Q = {},
        Z = {},
        Y = {};
      function tt(t) {
        if (void 0 === t) return '_unknown';
        var e = (t = t.replace(/[^a-zA-Z0-9_]/g, '$')).charCodeAt(0);
        return e >= 48 && e <= 57 ? '_' + t : t;
      }
      function et(t, e) {
        return {
          [(t = tt(t))]: function () {
            return e.apply(this, arguments);
          },
        }[t];
      }
      function rt(t, e) {
        var r = et(e, function (t) {
          (this.name = e), (this.message = t);
          var r = new Error(t).stack;
          void 0 !== r &&
            (this.stack = this.toString() + '\n' + r.replace(/^Error(:[^\n]*)?\n/, ''));
        });
        return (
          (r.prototype = Object.create(t.prototype)),
          (r.prototype.constructor = r),
          (r.prototype.toString = function () {
            return void 0 === this.message ? this.name : this.name + ': ' + this.message;
          }),
          r
        );
      }
      var nt = void 0;
      function ot(t) {
        throw new nt(t);
      }
      function it(t, e, r) {
        function n(e) {
          var n = r(e);
          n.length !== t.length && ot('Mismatched type converter count');
          for (var o = 0; o < t.length; ++o) ft(t[o], n[o]);
        }
        t.forEach(function (t) {
          Y[t] = e;
        });
        var o = new Array(e.length),
          i = [],
          a = 0;
        e.forEach((t, e) => {
          Z.hasOwnProperty(t)
            ? (o[e] = Z[t])
            : (i.push(t),
              Q.hasOwnProperty(t) || (Q[t] = []),
              Q[t].push(() => {
                (o[e] = Z[t]), ++a === i.length && n(o);
              }));
        }),
          0 === i.length && n(o);
      }
      function at(t) {
        switch (t) {
          case 1:
            return 0;
          case 2:
            return 1;
          case 4:
            return 2;
          case 8:
            return 3;
          default:
            throw new TypeError('Unknown type size: ' + t);
        }
      }
      var st = void 0;
      function ut(t) {
        for (var e = '', r = t; w[r]; ) e += st[w[r++]];
        return e;
      }
      var ct = void 0;
      function lt(t) {
        throw new ct(t);
      }
      function ft(t, e, r = {}) {
        if (!('argPackAdvance' in e))
          throw new TypeError('registerType registeredInstance requires argPackAdvance');
        var n = e.name;
        if (
          (t || lt('type "' + n + '" must have a positive integer typeid pointer'),
          Z.hasOwnProperty(t))
        ) {
          if (r.ignoreDuplicateRegistrations) return;
          lt("Cannot register type '" + n + "' twice");
        }
        if (((Z[t] = e), delete Y[t], Q.hasOwnProperty(t))) {
          var o = Q[t];
          delete Q[t], o.forEach((t) => t());
        }
      }
      function pt(t) {
        if (!(this instanceof Rt)) return !1;
        if (!(t instanceof Rt)) return !1;
        for (
          var e = this.$$.ptrType.registeredClass,
            r = this.$$.ptr,
            n = t.$$.ptrType.registeredClass,
            o = t.$$.ptr;
          e.baseClass;

        )
          (r = e.upcast(r)), (e = e.baseClass);
        for (; n.baseClass; ) (o = n.upcast(o)), (n = n.baseClass);
        return e === n && r === o;
      }
      function dt(t) {
        lt(t.$$.ptrType.registeredClass.name + ' instance already deleted');
      }
      var ht = !1;
      function vt(t) {}
      function yt(t) {
        (t.count.value -= 1),
          0 === t.count.value &&
            (function (t) {
              t.smartPtr
                ? t.smartPtrType.rawDestructor(t.smartPtr)
                : t.ptrType.registeredClass.rawDestructor(t.ptr);
            })(t);
      }
      function mt(t, e, r) {
        if (e === r) return t;
        if (void 0 === r.baseClass) return null;
        var n = mt(t, e, r.baseClass);
        return null === n ? null : r.downcast(n);
      }
      var gt = {};
      function $t() {
        return Object.keys(At).length;
      }
      function bt() {
        var t = [];
        for (var e in At) At.hasOwnProperty(e) && t.push(At[e]);
        return t;
      }
      var wt = [];
      function Tt() {
        for (; wt.length; ) {
          var t = wt.pop();
          (t.$$.deleteScheduled = !1), t.delete();
        }
      }
      var Ct = void 0;
      function Pt(t) {
        (Ct = t), wt.length && Ct && Ct(Tt);
      }
      var At = {};
      function _t(t, e) {
        return (
          (e = (function (t, e) {
            for (void 0 === e && lt('ptr should not be undefined'); t.baseClass; )
              (e = t.upcast(e)), (t = t.baseClass);
            return e;
          })(t, e)),
          At[e]
        );
      }
      function St(t, e) {
        return (
          (e.ptrType && e.ptr) || ot('makeClassHandle requires ptr and ptrType'),
          !!e.smartPtrType !== !!e.smartPtr &&
            ot('Both smartPtrType and smartPtr must be specified'),
          (e.count = { value: 1 }),
          Wt(Object.create(t, { $$: { value: e } }))
        );
      }
      function jt(t) {
        var e = this.getPointee(t);
        if (!e) return this.destructor(t), null;
        var r = _t(this.registeredClass, e);
        if (void 0 !== r) {
          if (0 === r.$$.count.value) return (r.$$.ptr = e), (r.$$.smartPtr = t), r.clone();
          var n = r.clone();
          return this.destructor(t), n;
        }
        function o() {
          return this.isSmartPointer
            ? St(this.registeredClass.instancePrototype, {
                ptrType: this.pointeeType,
                ptr: e,
                smartPtrType: this,
                smartPtr: t,
              })
            : St(this.registeredClass.instancePrototype, { ptrType: this, ptr: t });
        }
        var i,
          a = this.registeredClass.getActualType(e),
          s = gt[a];
        if (!s) return o.call(this);
        i = this.isConst ? s.constPointerType : s.pointerType;
        var u = mt(e, this.registeredClass, i.registeredClass);
        return null === u
          ? o.call(this)
          : this.isSmartPointer
            ? St(i.registeredClass.instancePrototype, {
                ptrType: i,
                ptr: u,
                smartPtrType: this,
                smartPtr: t,
              })
            : St(i.registeredClass.instancePrototype, { ptrType: i, ptr: u });
      }
      function Wt(t) {
        return 'undefined' == typeof FinalizationRegistry
          ? ((Wt = (t) => t), t)
          : ((ht = new FinalizationRegistry((t) => {
              yt(t.$$);
            })),
            (vt = (t) => ht.unregister(t)),
            (Wt = (t) => {
              var e = t.$$;
              if (!!e.smartPtr) {
                var r = { $$: e };
                ht.register(t, r, t);
              }
              return t;
            })(t));
      }
      function kt() {
        if ((this.$$.ptr || dt(this), this.$$.preservePointerOnDelete))
          return (this.$$.count.value += 1), this;
        var t,
          e = Wt(
            Object.create(Object.getPrototypeOf(this), {
              $$: {
                value:
                  ((t = this.$$),
                  {
                    count: t.count,
                    deleteScheduled: t.deleteScheduled,
                    preservePointerOnDelete: t.preservePointerOnDelete,
                    ptr: t.ptr,
                    ptrType: t.ptrType,
                    smartPtr: t.smartPtr,
                    smartPtrType: t.smartPtrType,
                  }),
              },
            }),
          );
        return (e.$$.count.value += 1), (e.$$.deleteScheduled = !1), e;
      }
      function Et() {
        this.$$.ptr || dt(this),
          this.$$.deleteScheduled &&
            !this.$$.preservePointerOnDelete &&
            lt('Object already scheduled for deletion'),
          vt(this),
          yt(this.$$),
          this.$$.preservePointerOnDelete || ((this.$$.smartPtr = void 0), (this.$$.ptr = void 0));
      }
      function Ft() {
        return !this.$$.ptr;
      }
      function Ot() {
        return (
          this.$$.ptr || dt(this),
          this.$$.deleteScheduled &&
            !this.$$.preservePointerOnDelete &&
            lt('Object already scheduled for deletion'),
          wt.push(this),
          1 === wt.length && Ct && Ct(Tt),
          (this.$$.deleteScheduled = !0),
          this
        );
      }
      function Rt() {}
      function It(t, e, r) {
        if (void 0 === t[e].overloadTable) {
          var n = t[e];
          (t[e] = function () {
            return (
              t[e].overloadTable.hasOwnProperty(arguments.length) ||
                lt(
                  "Function '" +
                    r +
                    "' called with an invalid number of arguments (" +
                    arguments.length +
                    ') - expects one of (' +
                    t[e].overloadTable +
                    ')!',
                ),
              t[e].overloadTable[arguments.length].apply(this, arguments)
            );
          }),
            (t[e].overloadTable = []),
            (t[e].overloadTable[n.argCount] = n);
        }
      }
      function Dt(t, e, r) {
        o.hasOwnProperty(t)
          ? ((void 0 === r ||
              (void 0 !== o[t].overloadTable && void 0 !== o[t].overloadTable[r])) &&
              lt("Cannot register public name '" + t + "' twice"),
            It(o, t, t),
            o.hasOwnProperty(r) &&
              lt(
                'Cannot register multiple overloads of a function with the same number of arguments (' +
                  r +
                  ')!',
              ),
            (o[t].overloadTable[r] = e))
          : ((o[t] = e), void 0 !== r && (o[t].numArguments = r));
      }
      function xt(t, e, r, n, o, i, a, s) {
        (this.name = t),
          (this.constructor = e),
          (this.instancePrototype = r),
          (this.rawDestructor = n),
          (this.baseClass = o),
          (this.getActualType = i),
          (this.upcast = a),
          (this.downcast = s),
          (this.pureVirtualFunctions = []);
      }
      function Ut(t, e, r) {
        for (; e !== r; )
          e.upcast ||
            lt('Expected null or instance of ' + r.name + ', got an instance of ' + e.name),
            (t = e.upcast(t)),
            (e = e.baseClass);
        return t;
      }
      function Vt(t, e) {
        if (null === e) return this.isReference && lt('null is not a valid ' + this.name), 0;
        e.$$ || lt('Cannot pass "' + le(e) + '" as a ' + this.name),
          e.$$.ptr || lt('Cannot pass deleted object as a pointer of type ' + this.name);
        var r = e.$$.ptrType.registeredClass;
        return Ut(e.$$.ptr, r, this.registeredClass);
      }
      function Ht(t, e) {
        var r;
        if (null === e)
          return (
            this.isReference && lt('null is not a valid ' + this.name),
            this.isSmartPointer
              ? ((r = this.rawConstructor()), null !== t && t.push(this.rawDestructor, r), r)
              : 0
          );
        e.$$ || lt('Cannot pass "' + le(e) + '" as a ' + this.name),
          e.$$.ptr || lt('Cannot pass deleted object as a pointer of type ' + this.name),
          !this.isConst &&
            e.$$.ptrType.isConst &&
            lt(
              'Cannot convert argument of type ' +
                (e.$$.smartPtrType ? e.$$.smartPtrType.name : e.$$.ptrType.name) +
                ' to parameter type ' +
                this.name,
            );
        var n = e.$$.ptrType.registeredClass;
        if (((r = Ut(e.$$.ptr, n, this.registeredClass)), this.isSmartPointer))
          switch (
            (void 0 === e.$$.smartPtr && lt('Passing raw pointer to smart pointer is illegal'),
            this.sharingPolicy)
          ) {
            case 0:
              e.$$.smartPtrType === this
                ? (r = e.$$.smartPtr)
                : lt(
                    'Cannot convert argument of type ' +
                      (e.$$.smartPtrType ? e.$$.smartPtrType.name : e.$$.ptrType.name) +
                      ' to parameter type ' +
                      this.name,
                  );
              break;
            case 1:
              r = e.$$.smartPtr;
              break;
            case 2:
              if (e.$$.smartPtrType === this) r = e.$$.smartPtr;
              else {
                var o = e.clone();
                (r = this.rawShare(
                  r,
                  se.toHandle(function () {
                    o.delete();
                  }),
                )),
                  null !== t && t.push(this.rawDestructor, r);
              }
              break;
            default:
              lt('Unsupporting sharing policy');
          }
        return r;
      }
      function Bt(t, e) {
        if (null === e) return this.isReference && lt('null is not a valid ' + this.name), 0;
        e.$$ || lt('Cannot pass "' + le(e) + '" as a ' + this.name),
          e.$$.ptr || lt('Cannot pass deleted object as a pointer of type ' + this.name),
          e.$$.ptrType.isConst &&
            lt(
              'Cannot convert argument of type ' +
                e.$$.ptrType.name +
                ' to parameter type ' +
                this.name,
            );
        var r = e.$$.ptrType.registeredClass;
        return Ut(e.$$.ptr, r, this.registeredClass);
      }
      function zt(t) {
        return this.rawGetPointee && (t = this.rawGetPointee(t)), t;
      }
      function Mt(t) {
        this.rawDestructor && this.rawDestructor(t);
      }
      function qt(t) {
        null !== t && t.delete();
      }
      function Lt(t, e, r, n, o, i, a, s, u, c, l) {
        (this.name = t),
          (this.registeredClass = e),
          (this.isReference = r),
          (this.isConst = n),
          (this.isSmartPointer = o),
          (this.pointeeType = i),
          (this.sharingPolicy = a),
          (this.rawGetPointee = s),
          (this.rawConstructor = u),
          (this.rawShare = c),
          (this.rawDestructor = l),
          o || void 0 !== e.baseClass
            ? (this.toWireType = Ht)
            : n
              ? ((this.toWireType = Vt), (this.destructorFunction = null))
              : ((this.toWireType = Bt), (this.destructorFunction = null));
      }
      function Nt(t, e, r) {
        o.hasOwnProperty(t) || ot('Replacing nonexistant public symbol'),
          void 0 !== o[t].overloadTable && void 0 !== r
            ? (o[t].overloadTable[r] = e)
            : ((o[t] = e), (o[t].argCount = r));
      }
      var Gt = [];
      function Xt(t) {
        var e = Gt[t];
        return e || (t >= Gt.length && (Gt.length = t + 1), (Gt[t] = e = j.get(t))), e;
      }
      function Jt(t, e, r) {
        return t.includes('j')
          ? (function (t, e, r) {
              var n = o['dynCall_' + t];
              return r && r.length ? n.apply(null, [e].concat(r)) : n.call(null, e);
            })(t, e, r)
          : Xt(e).apply(null, r);
      }
      function Kt(t, e) {
        var r,
          n,
          o,
          i = (t = ut(t)).includes('j')
            ? ((r = t),
              (n = e),
              (o = []),
              function () {
                return (o.length = 0), Object.assign(o, arguments), Jt(r, n, o);
              })
            : Xt(e);
        return (
          'function' != typeof i && lt('unknown function pointer with signature ' + t + ': ' + e), i
        );
      }
      var Qt = void 0;
      function Zt(t) {
        var e = Fe(t),
          r = ut(e);
        return Ee(e), r;
      }
      function Yt(t, e) {
        var r = [],
          n = {};
        throw (
          (e.forEach(function t(e) {
            n[e] || Z[e] || (Y[e] ? Y[e].forEach(t) : (r.push(e), (n[e] = !0)));
          }),
          new Qt(t + ': ' + r.map(Zt).join([', '])))
        );
      }
      function te(t, e) {
        for (var r = [], n = 0; n < t; n++) r.push(A[(e + 4 * n) >> 2]);
        return r;
      }
      function ee(t, e, r, n, o, i) {
        var a = e.length;
        a < 2 &&
          lt("argTypes array size mismatch! Must at least get return value and 'this' types!");
        for (var s = null !== e[1] && null !== r, u = !1, c = 1; c < e.length; ++c)
          if (null !== e[c] && void 0 === e[c].destructorFunction) {
            u = !0;
            break;
          }
        var l = 'void' !== e[0].name,
          f = a - 2,
          p = new Array(f),
          d = [],
          h = [];
        return function () {
          var r;
          arguments.length !== f &&
            lt(
              'function ' +
                t +
                ' called with ' +
                arguments.length +
                ' arguments, expected ' +
                f +
                ' args!',
            ),
            (h.length = 0),
            (d.length = s ? 2 : 1),
            (d[0] = o),
            s && ((r = e[1].toWireType(h, this)), (d[1] = r));
          for (var i = 0; i < f; ++i) (p[i] = e[i + 2].toWireType(h, arguments[i])), d.push(p[i]);
          var a = n.apply(null, d);
          function c(t) {
            if (u) J(h);
            else
              for (var n = s ? 1 : 2; n < e.length; n++) {
                var o = 1 === n ? r : p[n - 2];
                null !== e[n].destructorFunction && e[n].destructorFunction(o);
              }
            if (l) return e[0].fromWireType(t);
          }
          return c(a);
        };
      }
      var re = [],
        ne = [{}, { value: void 0 }, { value: null }, { value: !0 }, { value: !1 }];
      function oe(t) {
        t > 4 && 0 == --ne[t].refcount && ((ne[t] = void 0), re.push(t));
      }
      function ie() {
        for (var t = 0, e = 5; e < ne.length; ++e) void 0 !== ne[e] && ++t;
        return t;
      }
      function ae() {
        for (var t = 5; t < ne.length; ++t) if (void 0 !== ne[t]) return ne[t];
        return null;
      }
      var se = {
        toValue: (t) => (t || lt('Cannot use deleted val. handle = ' + t), ne[t].value),
        toHandle: (t) => {
          switch (t) {
            case void 0:
              return 1;
            case null:
              return 2;
            case !0:
              return 3;
            case !1:
              return 4;
            default:
              var e = re.length ? re.pop() : ne.length;
              return (ne[e] = { refcount: 1, value: t }), e;
          }
        },
      };
      function ue(t, e, r) {
        switch (e) {
          case 0:
            return function (t) {
              var e = r ? b : w;
              return this.fromWireType(e[t]);
            };
          case 1:
            return function (t) {
              var e = r ? T : C;
              return this.fromWireType(e[t >> 1]);
            };
          case 2:
            return function (t) {
              var e = r ? P : A;
              return this.fromWireType(e[t >> 2]);
            };
          default:
            throw new TypeError('Unknown integer type: ' + t);
        }
      }
      function ce(t, e) {
        var r = Z[t];
        return void 0 === r && lt(e + ' has unknown type ' + Zt(t)), r;
      }
      function le(t) {
        if (null === t) return 'null';
        var e = typeof t;
        return 'object' === e || 'array' === e || 'function' === e ? t.toString() : '' + t;
      }
      function fe(t, e) {
        switch (e) {
          case 2:
            return function (t) {
              return this.fromWireType(_[t >> 2]);
            };
          case 3:
            return function (t) {
              return this.fromWireType(S[t >> 3]);
            };
          default:
            throw new TypeError('Unknown float type: ' + t);
        }
      }
      function pe(t, e, r) {
        switch (e) {
          case 0:
            return r
              ? function (t) {
                  return b[t];
                }
              : function (t) {
                  return w[t];
                };
          case 1:
            return r
              ? function (t) {
                  return T[t >> 1];
                }
              : function (t) {
                  return C[t >> 1];
                };
          case 2:
            return r
              ? function (t) {
                  return P[t >> 2];
                }
              : function (t) {
                  return A[t >> 2];
                };
          default:
            throw new TypeError('Unknown integer type: ' + t);
        }
      }
      var de = 'undefined' != typeof TextDecoder ? new TextDecoder('utf-16le') : void 0;
      function he(t, e) {
        for (var r = t, n = r >> 1, o = n + e / 2; !(n >= o) && C[n]; ) ++n;
        if ((r = n << 1) - t > 32 && de) return de.decode(w.subarray(t, r));
        for (var i = '', a = 0; !(a >= e / 2); ++a) {
          var s = T[(t + 2 * a) >> 1];
          if (0 == s) break;
          i += String.fromCharCode(s);
        }
        return i;
      }
      function ve(t, e, r) {
        if ((void 0 === r && (r = 2147483647), r < 2)) return 0;
        for (var n = e, o = (r -= 2) < 2 * t.length ? r / 2 : t.length, i = 0; i < o; ++i) {
          var a = t.charCodeAt(i);
          (T[e >> 1] = a), (e += 2);
        }
        return (T[e >> 1] = 0), e - n;
      }
      function ye(t) {
        return 2 * t.length;
      }
      function me(t, e) {
        for (var r = 0, n = ''; !(r >= e / 4); ) {
          var o = P[(t + 4 * r) >> 2];
          if (0 == o) break;
          if ((++r, o >= 65536)) {
            var i = o - 65536;
            n += String.fromCharCode(55296 | (i >> 10), 56320 | (1023 & i));
          } else n += String.fromCharCode(o);
        }
        return n;
      }
      function ge(t, e, r) {
        if ((void 0 === r && (r = 2147483647), r < 4)) return 0;
        for (var n = e, o = n + r - 4, i = 0; i < t.length; ++i) {
          var a = t.charCodeAt(i);
          if (a >= 55296 && a <= 57343)
            a = (65536 + ((1023 & a) << 10)) | (1023 & t.charCodeAt(++i));
          if (((P[e >> 2] = a), (e += 4) + 4 > o)) break;
        }
        return (P[e >> 2] = 0), e - n;
      }
      function $e(t) {
        for (var e = 0, r = 0; r < t.length; ++r) {
          var n = t.charCodeAt(r);
          n >= 55296 && n <= 57343 && ++r, (e += 4);
        }
        return e;
      }
      var be = {};
      function we(t) {
        var e = be[t];
        return void 0 === e ? ut(t) : e;
      }
      var Te = [];
      function Ce() {
        if ('object' == typeof globalThis) return globalThis;
        function t(t) {
          t.$$$embind_global$$$ = t;
          var e = 'object' == typeof $$$embind_global$$$ && t.$$$embind_global$$$ == t;
          return e || delete t.$$$embind_global$$$, e;
        }
        if ('object' == typeof $$$embind_global$$$) return $$$embind_global$$$;
        if (
          ('object' == typeof global && t(global)
            ? ($$$embind_global$$$ = global)
            : 'object' == typeof self && t(self) && ($$$embind_global$$$ = self),
          'object' == typeof $$$embind_global$$$)
        )
          return $$$embind_global$$$;
        throw Error('unable to get global object.');
      }
      var Pe = [];
      var Ae = {};
      function _e(t) {
        var e = g.buffer;
        try {
          return g.grow((t - e.byteLength + 65535) >>> 16), F(), 1;
        } catch (t) {}
      }
      var Se = [null, [], []];
      (nt = o.InternalError = rt(Error, 'InternalError')),
        (function () {
          for (var t = new Array(256), e = 0; e < 256; ++e) t[e] = String.fromCharCode(e);
          st = t;
        })(),
        (ct = o.BindingError = rt(Error, 'BindingError')),
        (Rt.prototype.isAliasOf = pt),
        (Rt.prototype.clone = kt),
        (Rt.prototype.delete = Et),
        (Rt.prototype.isDeleted = Ft),
        (Rt.prototype.deleteLater = Ot),
        (o.getInheritedInstanceCount = $t),
        (o.getLiveInheritedInstances = bt),
        (o.flushPendingDeletes = Tt),
        (o.setDelayFunction = Pt),
        (Lt.prototype.getPointee = zt),
        (Lt.prototype.destructor = Mt),
        (Lt.prototype.argPackAdvance = 8),
        (Lt.prototype.readValueFromPointer = K),
        (Lt.prototype.deleteObject = qt),
        (Lt.prototype.fromWireType = jt),
        (Qt = o.UnboundTypeError = rt(Error, 'UnboundTypeError')),
        (o.count_emval_handles = ie),
        (o.get_first_emval = ae);
      var je,
        We = {
          K: function (t, e, r) {
            throw (new G(t).init(e, r), t, t);
          },
          s: function (t) {
            var e = X[t];
            delete X[t];
            var r = e.rawConstructor,
              n = e.rawDestructor,
              o = e.fields;
            it(
              [t],
              o.map((t) => t.getterReturnType).concat(o.map((t) => t.setterArgumentType)),
              (t) => {
                var i = {};
                return (
                  o.forEach((e, r) => {
                    var n = e.fieldName,
                      a = t[r],
                      s = e.getter,
                      u = e.getterContext,
                      c = t[r + o.length],
                      l = e.setter,
                      f = e.setterContext;
                    i[n] = {
                      read: (t) => a.fromWireType(s(u, t)),
                      write: (t, e) => {
                        var r = [];
                        l(f, t, c.toWireType(r, e)), J(r);
                      },
                    };
                  }),
                  [
                    {
                      name: e.name,
                      fromWireType: function (t) {
                        var e = {};
                        for (var r in i) e[r] = i[r].read(t);
                        return n(t), e;
                      },
                      toWireType: function (t, e) {
                        for (var o in i)
                          if (!(o in e)) throw new TypeError('Missing field:  "' + o + '"');
                        var a = r();
                        for (o in i) i[o].write(a, e[o]);
                        return null !== t && t.push(n, a), a;
                      },
                      argPackAdvance: 8,
                      readValueFromPointer: K,
                      destructorFunction: n,
                    },
                  ]
                );
              },
            );
          },
          D: function (t, e, r, n, o) {},
          I: function (t, e, r, n, o) {
            var i = at(r);
            ft(t, {
              name: (e = ut(e)),
              fromWireType: function (t) {
                return !!t;
              },
              toWireType: function (t, e) {
                return e ? n : o;
              },
              argPackAdvance: 8,
              readValueFromPointer: function (t) {
                var n;
                if (1 === r) n = b;
                else if (2 === r) n = T;
                else {
                  if (4 !== r) throw new TypeError('Unknown boolean type size: ' + e);
                  n = P;
                }
                return this.fromWireType(n[t >> i]);
              },
              destructorFunction: null,
            });
          },
          x: function (t, e, r, n, o, i, a, s, u, c, l, f, p) {
            (l = ut(l)), (i = Kt(o, i)), s && (s = Kt(a, s)), c && (c = Kt(u, c)), (p = Kt(f, p));
            var d = tt(l);
            Dt(d, function () {
              Yt('Cannot construct ' + l + ' due to unbound types', [n]);
            }),
              it([t, e, r], n ? [n] : [], function (e) {
                var r, o;
                (e = e[0]), (o = n ? (r = e.registeredClass).instancePrototype : Rt.prototype);
                var a = et(d, function () {
                    if (Object.getPrototypeOf(this) !== u)
                      throw new ct("Use 'new' to construct " + l);
                    if (void 0 === f.constructor_body)
                      throw new ct(l + ' has no accessible constructor');
                    var t = f.constructor_body[arguments.length];
                    if (void 0 === t)
                      throw new ct(
                        'Tried to invoke ctor of ' +
                          l +
                          ' with invalid number of parameters (' +
                          arguments.length +
                          ') - expected (' +
                          Object.keys(f.constructor_body).toString() +
                          ') parameters instead!',
                      );
                    return t.apply(this, arguments);
                  }),
                  u = Object.create(o, { constructor: { value: a } });
                a.prototype = u;
                var f = new xt(l, a, u, p, r, i, s, c),
                  h = new Lt(l, f, !0, !1, !1),
                  v = new Lt(l + '*', f, !1, !1, !1),
                  y = new Lt(l + ' const*', f, !1, !0, !1);
                return (gt[t] = { pointerType: v, constPointerType: y }), Nt(d, a), [h, v, y];
              });
          },
          w: function (t, e, r, n, o, i) {
            var a;
            e > 0 || V(a);
            var s = te(e, r);
            (o = Kt(n, o)),
              it([], [t], function (t) {
                var r = 'constructor ' + (t = t[0]).name;
                if (
                  (void 0 === t.registeredClass.constructor_body &&
                    (t.registeredClass.constructor_body = []),
                  void 0 !== t.registeredClass.constructor_body[e - 1])
                )
                  throw new ct(
                    'Cannot register multiple constructors with identical number of parameters (' +
                      (e - 1) +
                      ") for class '" +
                      t.name +
                      "'! Overload resolution is currently only performed using the parameter count, not actual type info!",
                  );
                return (
                  (t.registeredClass.constructor_body[e - 1] = () => {
                    Yt('Cannot construct ' + t.name + ' due to unbound types', s);
                  }),
                  it([], s, function (n) {
                    return (
                      n.splice(1, 0, null),
                      (t.registeredClass.constructor_body[e - 1] = ee(r, n, null, o, i)),
                      []
                    );
                  }),
                  []
                );
              });
          },
          d: function (t, e, r, n, o, i, a, s, u) {
            var c = te(r, n);
            (e = ut(e)),
              (i = Kt(o, i)),
              it([], [t], function (t) {
                var n = (t = t[0]).name + '.' + e;
                function o() {
                  Yt('Cannot call ' + n + ' due to unbound types', c);
                }
                e.startsWith('@@') && (e = Symbol[e.substring(2)]),
                  s && t.registeredClass.pureVirtualFunctions.push(e);
                var u = t.registeredClass.instancePrototype,
                  l = u[e];
                return (
                  void 0 === l ||
                  (void 0 === l.overloadTable && l.className !== t.name && l.argCount === r - 2)
                    ? ((o.argCount = r - 2), (o.className = t.name), (u[e] = o))
                    : (It(u, e, n), (u[e].overloadTable[r - 2] = o)),
                  it([], c, function (o) {
                    var s = ee(n, o, t, i, a);
                    return (
                      void 0 === u[e].overloadTable
                        ? ((s.argCount = r - 2), (u[e] = s))
                        : (u[e].overloadTable[r - 2] = s),
                      []
                    );
                  }),
                  []
                );
              });
          },
          k: function (t, e, r) {
            (t = ut(t)),
              it([], [e], function (e) {
                return (e = e[0]), (o[t] = e.fromWireType(r)), [];
              });
          },
          H: function (t, e) {
            ft(t, {
              name: (e = ut(e)),
              fromWireType: function (t) {
                var e = se.toValue(t);
                return oe(t), e;
              },
              toWireType: function (t, e) {
                return se.toHandle(e);
              },
              argPackAdvance: 8,
              readValueFromPointer: K,
              destructorFunction: null,
            });
          },
          n: function (t, e, r, n) {
            var o = at(r);
            function i() {}
            (e = ut(e)),
              (i.values = {}),
              ft(t, {
                name: e,
                constructor: i,
                fromWireType: function (t) {
                  return this.constructor.values[t];
                },
                toWireType: function (t, e) {
                  return e.value;
                },
                argPackAdvance: 8,
                readValueFromPointer: ue(e, o, n),
                destructorFunction: null,
              }),
              Dt(e, i);
          },
          a: function (t, e, r) {
            var n = ce(t, 'enum');
            e = ut(e);
            var o = n.constructor,
              i = Object.create(n.constructor.prototype, {
                value: { value: r },
                constructor: { value: et(n.name + '_' + e, function () {}) },
              });
            (o.values[r] = i), (o[e] = i);
          },
          B: function (t, e, r) {
            var n = at(r);
            ft(t, {
              name: (e = ut(e)),
              fromWireType: function (t) {
                return t;
              },
              toWireType: function (t, e) {
                return e;
              },
              argPackAdvance: 8,
              readValueFromPointer: fe(e, n),
              destructorFunction: null,
            });
          },
          i: function (t, e, r, n, o, i, a) {
            var s = te(e, r);
            (t = ut(t)),
              (o = Kt(n, o)),
              Dt(
                t,
                function () {
                  Yt('Cannot call ' + t + ' due to unbound types', s);
                },
                e - 1,
              ),
              it([], s, function (r) {
                var n = [r[0], null].concat(r.slice(1));
                return Nt(t, ee(t, n, null, o, i), e - 1), [];
              });
          },
          j: function (t, e, r, n, o) {
            (e = ut(e)), -1 === o && (o = 4294967295);
            var i = at(r),
              a = (t) => t;
            if (0 === n) {
              var s = 32 - 8 * r;
              a = (t) => (t << s) >>> s;
            }
            var u = e.includes('unsigned');
            ft(t, {
              name: e,
              fromWireType: a,
              toWireType: u
                ? function (t, e) {
                    return this.name, e >>> 0;
                  }
                : function (t, e) {
                    return this.name, e;
                  },
              argPackAdvance: 8,
              readValueFromPointer: pe(e, i, 0 !== n),
              destructorFunction: null,
            });
          },
          e: function (t, e, r) {
            var n = [
              Int8Array,
              Uint8Array,
              Int16Array,
              Uint16Array,
              Int32Array,
              Uint32Array,
              Float32Array,
              Float64Array,
            ][e];
            function o(t) {
              var e = A,
                r = e[(t >>= 2)],
                o = e[t + 1];
              return new n(e.buffer, o, r);
            }
            ft(
              t,
              { name: (r = ut(r)), fromWireType: o, argPackAdvance: 8, readValueFromPointer: o },
              { ignoreDuplicateRegistrations: !0 },
            );
          },
          A: function (t, e) {
            var r = 'std::string' === (e = ut(e));
            ft(t, {
              name: e,
              fromWireType: function (t) {
                var e,
                  n = A[t >> 2],
                  o = t + 4;
                if (r)
                  for (var i = o, a = 0; a <= n; ++a) {
                    var s = o + a;
                    if (a == n || 0 == w[s]) {
                      var u = E(i, s - i);
                      void 0 === e ? (e = u) : ((e += String.fromCharCode(0)), (e += u)),
                        (i = s + 1);
                    }
                  }
                else {
                  var c = new Array(n);
                  for (a = 0; a < n; ++a) c[a] = String.fromCharCode(w[o + a]);
                  e = c.join('');
                }
                return Ee(t), e;
              },
              toWireType: function (t, e) {
                var n;
                e instanceof ArrayBuffer && (e = new Uint8Array(e));
                var o = 'string' == typeof e;
                o ||
                  e instanceof Uint8Array ||
                  e instanceof Uint8ClampedArray ||
                  e instanceof Int8Array ||
                  lt('Cannot pass non-string to std::string'),
                  (n =
                    r && o
                      ? (function (t) {
                          for (var e = 0, r = 0; r < t.length; ++r) {
                            var n = t.charCodeAt(r);
                            n <= 127
                              ? e++
                              : n <= 2047
                                ? (e += 2)
                                : n >= 55296 && n <= 57343
                                  ? ((e += 4), ++r)
                                  : (e += 3);
                          }
                          return e;
                        })(e)
                      : e.length);
                var i = ke(4 + n + 1),
                  a = i + 4;
                if (((A[i >> 2] = n), r && o))
                  (function (t, e, r, n) {
                    if (!(n > 0)) return 0;
                    for (var o = r, i = r + n - 1, a = 0; a < t.length; ++a) {
                      var s = t.charCodeAt(a);
                      if (
                        (s >= 55296 &&
                          s <= 57343 &&
                          (s = (65536 + ((1023 & s) << 10)) | (1023 & t.charCodeAt(++a))),
                        s <= 127)
                      ) {
                        if (r >= i) break;
                        e[r++] = s;
                      } else if (s <= 2047) {
                        if (r + 1 >= i) break;
                        (e[r++] = 192 | (s >> 6)), (e[r++] = 128 | (63 & s));
                      } else if (s <= 65535) {
                        if (r + 2 >= i) break;
                        (e[r++] = 224 | (s >> 12)),
                          (e[r++] = 128 | ((s >> 6) & 63)),
                          (e[r++] = 128 | (63 & s));
                      } else {
                        if (r + 3 >= i) break;
                        (e[r++] = 240 | (s >> 18)),
                          (e[r++] = 128 | ((s >> 12) & 63)),
                          (e[r++] = 128 | ((s >> 6) & 63)),
                          (e[r++] = 128 | (63 & s));
                      }
                    }
                    e[r] = 0;
                  })(e, w, a, n + 1);
                else if (o)
                  for (var s = 0; s < n; ++s) {
                    var u = e.charCodeAt(s);
                    u > 255 &&
                      (Ee(a), lt('String has UTF-16 code units that do not fit in 8 bits')),
                      (w[a + s] = u);
                  }
                else for (s = 0; s < n; ++s) w[a + s] = e[s];
                return null !== t && t.push(Ee, i), i;
              },
              argPackAdvance: 8,
              readValueFromPointer: K,
              destructorFunction: function (t) {
                Ee(t);
              },
            });
          },
          v: function (t, e, r) {
            var n, o, i, a, s;
            (r = ut(r)),
              2 === e
                ? ((n = he), (o = ve), (a = ye), (i = () => C), (s = 1))
                : 4 === e && ((n = me), (o = ge), (a = $e), (i = () => A), (s = 2)),
              ft(t, {
                name: r,
                fromWireType: function (t) {
                  for (var r, o = A[t >> 2], a = i(), u = t + 4, c = 0; c <= o; ++c) {
                    var l = t + 4 + c * e;
                    if (c == o || 0 == a[l >> s]) {
                      var f = n(u, l - u);
                      void 0 === r ? (r = f) : ((r += String.fromCharCode(0)), (r += f)),
                        (u = l + e);
                    }
                  }
                  return Ee(t), r;
                },
                toWireType: function (t, n) {
                  'string' != typeof n && lt('Cannot pass non-string to C++ string type ' + r);
                  var i = a(n),
                    u = ke(4 + i + e);
                  return (A[u >> 2] = i >> s), o(n, u + 4, i + e), null !== t && t.push(Ee, u), u;
                },
                argPackAdvance: 8,
                readValueFromPointer: K,
                destructorFunction: function (t) {
                  Ee(t);
                },
              });
          },
          t: function (t, e, r, n, o, i) {
            X[t] = { name: ut(e), rawConstructor: Kt(r, n), rawDestructor: Kt(o, i), fields: [] };
          },
          c: function (t, e, r, n, o, i, a, s, u, c) {
            X[t].fields.push({
              fieldName: ut(e),
              getterReturnType: r,
              getter: Kt(n, o),
              getterContext: i,
              setterArgumentType: a,
              setter: Kt(s, u),
              setterContext: c,
            });
          },
          J: function (t, e) {
            ft(t, {
              isVoid: !0,
              name: (e = ut(e)),
              argPackAdvance: 0,
              fromWireType: function () {},
              toWireType: function (t, e) {},
            });
          },
          m: function (t, e, r) {
            (t = se.toValue(t)), (e = ce(e, 'emval::as'));
            var n = [],
              o = se.toHandle(n);
            return (A[r >> 2] = o), e.toWireType(n, t);
          },
          r: function (t, e, r, n) {
            (t = Te[t])((e = se.toValue(e)), (r = we(r)), null, n);
          },
          b: oe,
          y: function (t) {
            return 0 === t ? se.toHandle(Ce()) : ((t = we(t)), se.toHandle(Ce()[t]));
          },
          o: function (t, e) {
            var r = (function (t, e) {
                for (var r = new Array(t), n = 0; n < t; ++n)
                  r[n] = ce(A[(e + 4 * n) >> 2], 'parameter ' + n);
                return r;
              })(t, e),
              n = r[0],
              o =
                n.name +
                '_$' +
                r
                  .slice(1)
                  .map(function (t) {
                    return t.name;
                  })
                  .join('_') +
                '$',
              i = Pe[o];
            if (void 0 !== i) return i;
            var a,
              s,
              u = new Array(t - 1);
            return (
              (a = (e, o, i, a) => {
                for (var s = 0, c = 0; c < t - 1; ++c)
                  (u[c] = r[c + 1].readValueFromPointer(a + s)), (s += r[c + 1].argPackAdvance);
                var l = e[o].apply(e, u);
                for (c = 0; c < t - 1; ++c) r[c + 1].deleteObject && r[c + 1].deleteObject(u[c]);
                if (!n.isVoid) return n.toWireType(i, l);
              }),
              (s = Te.length),
              Te.push(a),
              (i = s),
              (Pe[o] = i),
              i
            );
          },
          q: function (t) {
            return (t = we(t)), se.toHandle(o[t]);
          },
          f: function (t, e) {
            return (t = se.toValue(t)), (e = se.toValue(e)), se.toHandle(t[e]);
          },
          h: function (t) {
            t > 4 && (ne[t].refcount += 1);
          },
          p: function (t, e, r, n) {
            t = se.toValue(t);
            var o = Ae[e];
            return (
              o ||
                ((o = (function (t) {
                  var e = new Array(t + 1);
                  return function (r, n, o) {
                    e[0] = r;
                    for (var i = 0; i < t; ++i) {
                      var a = ce(A[(n + 4 * i) >> 2], 'parameter ' + i);
                      (e[i + 1] = a.readValueFromPointer(o)), (o += a.argPackAdvance);
                    }
                    var s = new (r.bind.apply(r, e))();
                    return se.toHandle(s);
                  };
                })(e)),
                (Ae[e] = o)),
              o(t, r, n)
            );
          },
          g: function (t) {
            return se.toHandle(we(t));
          },
          l: function (t) {
            J(se.toValue(t)), oe(t);
          },
          u: function () {
            V('');
          },
          G: function (t, e, r) {
            w.copyWithin(t, e, e + r);
          },
          E: function (t) {
            var e,
              r,
              n = w.length,
              o = 2147483648;
            if ((t >>>= 0) > o) return !1;
            for (var i = 1; i <= 4; i *= 2) {
              var a = n * (1 + 0.2 / i);
              if (
                ((a = Math.min(a, t + 100663296)),
                _e(Math.min(o, (e = Math.max(t, a)) + (((r = 65536) - (e % r)) % r))))
              )
                return !0;
            }
            return !1;
          },
          F: function (t) {
            return 52;
          },
          C: function (t, e, r, n, o) {
            return 70;
          },
          z: function (t, e, r, n) {
            for (var o, i, a, s = 0, u = 0; u < r; u++) {
              var c = A[e >> 2],
                l = A[(e + 4) >> 2];
              e += 8;
              for (var f = 0; f < l; f++)
                (o = t),
                  (i = w[c + f]),
                  (a = void 0),
                  (a = Se[o]),
                  0 === i || 10 === i ? ((1 === o ? y : m)(k(a, 0)), (a.length = 0)) : a.push(i);
              s += l;
            }
            return (A[n >> 2] = s), 0;
          },
        },
        ke =
          ((function () {
            var t,
              e,
              r,
              i,
              a = { a: We };
            function s(t, e) {
              var r,
                n = t.exports;
              return (
                (o.asm = n),
                (g = o.asm.L),
                F(),
                (j = o.asm.P),
                (r = o.asm.M),
                R.unshift(r),
                (function (t) {
                  if (
                    (D--,
                    o.monitorRunDependencies && o.monitorRunDependencies(D),
                    0 == D && (null !== x && (clearInterval(x), (x = null)), U))
                  ) {
                    var e = U;
                    (U = null), e();
                  }
                })(),
                n
              );
            }
            if ((D++, o.monitorRunDependencies && o.monitorRunDependencies(D), o.instantiateWasm))
              try {
                return o.instantiateWasm(a, s);
              } catch (t) {
                m('Module.instantiateWasm callback failed with error: ' + t), n(t);
              }
            ((t = v),
            (e = H),
            (r = a),
            (i = function (t) {
              s(t.instance);
            }),
            t ||
            'function' != typeof WebAssembly.instantiateStreaming ||
            z(e) ||
            M(e) ||
            f ||
            'function' != typeof fetch
              ? L(e, r, i)
              : fetch(e, { credentials: 'same-origin' }).then(function (t) {
                  return WebAssembly.instantiateStreaming(t, r).then(i, function (t) {
                    return (
                      m('wasm streaming compile failed: ' + t),
                      m('falling back to ArrayBuffer instantiation'),
                      L(e, r, i)
                    );
                  });
                })).catch(n);
          })(),
          function () {
            return (ke = o.asm.N).apply(null, arguments);
          }),
        Ee = function () {
          return (Ee = o.asm.O).apply(null, arguments);
        },
        Fe = (o.___getTypeName = function () {
          return (Fe = o.___getTypeName = o.asm.Q).apply(null, arguments);
        }),
        Oe =
          ((o.__embind_initialize_bindings = function () {
            return (o.__embind_initialize_bindings = o.asm.R).apply(null, arguments);
          }),
          function () {
            return (Oe = o.asm.S).apply(null, arguments);
          });
      o.dynCall_jiji = function () {
        return (o.dynCall_jiji = o.asm.T).apply(null, arguments);
      };
      function Re() {
        function t() {
          je ||
            ((je = !0),
            (o.calledRun = !0),
            $ ||
              (!0,
              N(R),
              r(o),
              o.onRuntimeInitialized && o.onRuntimeInitialized(),
              (function () {
                if (o.postRun)
                  for (
                    'function' == typeof o.postRun && (o.postRun = [o.postRun]);
                    o.postRun.length;

                  )
                    (t = o.postRun.shift()), I.unshift(t);
                var t;
                N(I);
              })()));
        }
        D > 0 ||
          (!(function () {
            if (o.preRun)
              for ('function' == typeof o.preRun && (o.preRun = [o.preRun]); o.preRun.length; )
                (t = o.preRun.shift()), O.unshift(t);
            var t;
            N(O);
          })(),
          D > 0 ||
            (o.setStatus
              ? (o.setStatus('Running...'),
                setTimeout(function () {
                  setTimeout(function () {
                    o.setStatus('');
                  }, 1),
                    t();
                }, 1))
              : t()));
      }
      if (
        ((U = function t() {
          je || Re(), je || (U = t);
        }),
        o.preInit)
      )
        for ('function' == typeof o.preInit && (o.preInit = [o.preInit]); o.preInit.length > 0; )
          o.preInit.pop()();
      return Re(), e.ready;
    }
  );
})();
'object' == typeof exports && 'object' == typeof module
  ? (module.exports = BASIS)
  : 'function' == typeof define && define.amd
    ? define([], function () {
        return BASIS;
      })
    : 'object' == typeof exports && (exports.BASIS = BASIS);
