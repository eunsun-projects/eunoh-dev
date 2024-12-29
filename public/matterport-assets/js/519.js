/*! For license information please see 519.js.LICENSE.txt */
'use strict';
(self.webpackChunkmp_webgl = self.webpackChunkmp_webgl || []).push([
  [519],
  {
    13806: (t, e, o) => {
      o.r(e);
      const r = globalThis,
        {
          Array: n,
          Date: a,
          FinalizationRegistry: i,
          Float32Array: s,
          JSON: c,
          Map: l,
          Math: p,
          Number: u,
          Object: f,
          Promise: y,
          Proxy: d,
          Reflect: g,
          RegExp: m,
          Set: h,
          String: b,
          Symbol: S,
          WeakMap: P,
          WeakSet: w,
        } = globalThis,
        { Error: v, RangeError: E, ReferenceError: I, SyntaxError: T, TypeError: A } = globalThis,
        {
          assign: _,
          create: x,
          defineProperties: $,
          entries: k,
          freeze: O,
          getOwnPropertyDescriptor: F,
          getOwnPropertyDescriptors: C,
          getOwnPropertyNames: N,
          getPrototypeOf: R,
          is: M,
          isFrozen: L,
          isSealed: U,
          isExtensible: D,
          keys: j,
          prototype: G,
          seal: B,
          preventExtensions: H,
          setPrototypeOf: W,
          values: z,
          fromEntries: V,
        } = f,
        {
          species: K,
          toStringTag: q,
          iterator: Y,
          matchAll: J,
          unscopables: Z,
          keyFor: X,
          for: Q,
        } = S,
        { isInteger: tt } = u,
        { stringify: et } = c,
        { defineProperty: ot } = f,
        rt = (t, e, o) => {
          const r = ot(t, e, o);
          if (r !== t)
            throw A(
              `Please report that the original defineProperty silently failed to set ${et(b(e))}. (SES_DEFINE_PROPERTY_FAILED_SILENTLY)`,
            );
          return r;
        },
        {
          apply: nt,
          construct: at,
          get: it,
          getOwnPropertyDescriptor: st,
          has: ct,
          isExtensible: lt,
          ownKeys: pt,
          preventExtensions: ut,
          set: ft,
        } = g,
        { isArray: yt, prototype: dt } = n,
        { prototype: gt } = l,
        { revocable: mt } = d,
        { prototype: ht } = RegExp,
        { prototype: bt } = h,
        { prototype: St } = b,
        { prototype: Pt } = P,
        { prototype: wt } = w,
        { prototype: vt } = Function,
        { prototype: Et } = y,
        It = R(Uint8Array.prototype),
        { bind: Tt } = vt,
        At = Tt.bind(Tt.call),
        _t = At(G.hasOwnProperty),
        xt = At(dt.filter),
        $t = At(dt.forEach),
        kt = At(dt.includes),
        Ot = At(dt.join),
        Ft = At(dt.map),
        Ct = At(dt.pop),
        Nt = At(dt.push),
        Rt = At(dt.slice),
        Mt = At(dt.some),
        Lt = At(dt.sort),
        Ut = At(dt[Y]),
        Dt = At(gt.set),
        jt = At(gt.get),
        Gt = At(gt.has),
        Bt = At(gt.delete),
        Ht = At(gt.entries),
        Wt = At(gt[Y]),
        zt = At(bt.add),
        Vt = (At(bt.delete), At(bt.forEach)),
        Kt = At(bt.has),
        qt = At(bt[Y]),
        Yt = At(ht.test),
        Jt = At(ht.exec),
        Zt = At(ht[J]),
        Xt = At(St.endsWith),
        Qt = At(St.includes),
        te = At(St.indexOf),
        ee = (At(St.match), At(St.replace)),
        oe = At(St.search),
        re = At(St.slice),
        ne = At(St.split),
        ae = At(St.startsWith),
        ie = At(St[Y]),
        se = At(Pt.delete),
        ce = At(Pt.get),
        le = At(Pt.has),
        pe = At(Pt.set),
        ue = At(wt.add),
        fe = At(wt.has),
        ye = At(vt.toString),
        { all: de } = y,
        ge = At(Et.catch),
        me = At(Et.then),
        he = i && At(i.prototype.register),
        be = (i && At(i.prototype.unregister), O(x(null))),
        Se = (t) => f(t) === t,
        Pe = (t) => t instanceof v,
        we = eval,
        ve = Function,
        Ee = () => {
          throw A('Cannot eval with evalTaming set to "noEval" (SES_NO_EVAL)');
        };
      if (
        (function () {
          return this;
        })()
      )
        throw A('SES failed to initialize, sloppy mode (SES_NO_SLOPPY)');
      const { freeze: Ie } = Object,
        { apply: Te } = Reflect,
        Ae = (
          (t) =>
          (e, ...o) =>
            Te(t, e, o)
        )(Array.prototype.push),
        _e = JSON.stringify,
        xe = (t, ...e) => {
          let o = t[0];
          for (let r = 0; r < e.length; r += 1) o = `${o}${e[r]}${t[r + 1]}`;
          throw Error(o);
        },
        $e = (t) => {
          const e = [],
            o = (o, r) => {
              'string' == typeof o || xe`Environment option name ${_e(o)} must be a string.`,
                'string' == typeof r ||
                  xe`Environment option default setting ${_e(r)} must be a string.`;
              let n = r;
              const a = t.process;
              if (a && 'object' == typeof a) {
                const t = a.env;
                if (t && 'object' == typeof t && o in t) {
                  Ae(e, o);
                  const r = t[o];
                  'string' == typeof r ||
                    xe`Environment option named ${_e(o)}, if present, must have a corresponding string value, got ${_e(r)}`,
                    (n = r);
                }
              }
              return n;
            };
          Ie(o);
          const r = () => Ie([...e]);
          return Ie(r), Ie({ getEnvironmentOption: o, getCapturedEnvironmentOptionNames: r });
        };
      Ie($e);
      const ke = (t) => ((t = `${t}`).length >= 1 && Qt('aeiouAEIOU', t[0]) ? `an ${t}` : `a ${t}`);
      O(ke);
      const Oe = (t, e) => {
        const o = new h(),
          r = (t, e) => {
            switch (typeof e) {
              case 'object': {
                if (null === e) return null;
                if (Kt(o, e)) return '[Seen]';
                if ((zt(o, e), Pe(e))) return `[${e.name}: ${e.message}]`;
                if (q in e) return `[${e[q]}]`;
                if (yt(e)) return e;
                const t = j(e);
                if (t.length < 2) return e;
                let r = !0;
                for (let e = 1; e < t.length; e += 1)
                  if (t[e - 1] >= t[e]) {
                    r = !1;
                    break;
                  }
                if (r) return e;
                Lt(t);
                const n = Ft(t, (t) => [t, e[t]]);
                return V(n);
              }
              case 'function':
                return `[Function ${e.name || '<anon>'}]`;
              case 'string':
                return ae(e, '[') ? `[${e}]` : e;
              case 'undefined':
              case 'symbol':
                return `[${b(e)}]`;
              case 'bigint':
                return `[${e}n]`;
              case 'number':
                return M(e, NaN)
                  ? '[NaN]'
                  : e === 1 / 0
                    ? '[Infinity]'
                    : e === -1 / 0
                      ? '[-Infinity]'
                      : e;
              default:
                return e;
            }
          };
        try {
          return et(t, r, e);
        } catch (t) {
          return '[Something that failed to stringify]';
        }
      };
      O(Oe);
      const { freeze: Fe } = Object,
        { isSafeInteger: Ce } = Number,
        Ne = (t) => {
          const e = { next: void 0, prev: void 0, data: t };
          return (e.next = e), (e.prev = e), e;
        },
        Re = (t, e) => {
          if (t === e) throw TypeError('Cannot splice a cell into itself');
          if (e.next !== e || e.prev !== e) throw TypeError('Expected self-linked cell');
          const o = e,
            r = t.next;
          return (o.prev = t), (o.next = r), (t.next = o), (r.prev = o), o;
        },
        Me = (t) => {
          const { prev: e, next: o } = t;
          (e.next = o), (o.prev = e), (t.prev = t), (t.next = t);
        },
        Le = (t) => {
          if (!Ce(t) || t < 0)
            throw TypeError('keysBudget must be a safe non-negative integer number');
          const e = new WeakMap();
          let o = 0;
          const r = Ne(void 0),
            n = (t) => {
              const o = e.get(t);
              if (void 0 !== o && void 0 !== o.data) return Me(o), Re(r, o), o;
            },
            a = (t) => void 0 !== n(t);
          Fe(a);
          const i = (t) => {
            const e = n(t);
            return e && e.data && e.data.get(t);
          };
          Fe(i);
          const s = (a, i) => {
            if (t < 1) return l;
            let s = n(a);
            if ((void 0 === s && ((s = Ne(void 0)), Re(r, s)), !s.data))
              for (o += 1, s.data = new WeakMap(), e.set(a, s); o > t; ) {
                const t = r.prev;
                Me(t), (t.data = void 0), (o -= 1);
              }
            return s.data.set(a, i), l;
          };
          Fe(s);
          const c = (t) => {
            const r = e.get(t);
            return (
              void 0 !== r &&
              (Me(r), e.delete(t), void 0 !== r.data && ((r.data = void 0), (o -= 1), !0))
            );
          };
          Fe(c);
          const l = Fe({ has: a, get: i, set: s, delete: c, [Symbol.toStringTag]: 'LRUCacheMap' });
          return l;
        };
      Fe(Le);
      const Ue = (t = 1e3, e = 100) => {
        if (!Ce(e) || e < 1)
          throw TypeError('argsPerErrorBudget must be a safe positive integer number');
        const o = Le(t),
          r = (t, r) => {
            const n = o.get(t);
            void 0 !== n ? (n.length >= e && n.shift(), n.push(r)) : o.set(t, [r]);
          };
        Fe(r);
        const n = (t) => {
          const e = o.get(t);
          return o.delete(t), e;
        };
        return Fe(n), Fe({ addLogArgs: r, takeLogArgsArray: n });
      };
      Fe(Ue);
      const De = new P(),
        je = (t, e) => {
          const o = O({ toString: O(() => Oe(t, e)) });
          return pe(De, o, t), o;
        };
      O(je);
      const Ge = O(/^[\w:-]( ?[\w:-])*$/),
        Be = (t, e) => {
          if ('string' != typeof t || !Yt(Ge, t)) return je(t, e);
          const o = O({ toString: O(() => t) });
          return pe(De, o, t), o;
        };
      O(Be);
      const He = new P(),
        We = ({ template: t, args: e }) => {
          const o = [t[0]];
          for (let r = 0; r < e.length; r += 1) {
            const n = e[r];
            let a;
            (a = le(De, n) ? `${n}` : Pe(n) ? `(${ke(n.name)})` : `(${ke(typeof n)})`),
              Nt(o, a, t[r + 1]);
          }
          return Ot(o, '');
        },
        ze = O({
          toString() {
            const t = ce(He, this);
            return void 0 === t ? '[Not a DetailsToken]' : We(t);
          },
        });
      O(ze.toString);
      const Ve = (t, ...e) => {
        const o = O({ __proto__: ze });
        return pe(He, o, { template: t, args: e }), o;
      };
      O(Ve);
      const Ke = (t, ...e) => ((e = Ft(e, (t) => (le(De, t) ? t : je(t)))), Ve(t, ...e));
      O(Ke);
      const qe = ({ template: t, args: e }) => {
          const o = [t[0]];
          for (let r = 0; r < e.length; r += 1) {
            let n = e[r];
            le(De, n) && (n = ce(De, n));
            const a = ee(Ct(o) || '', / $/, '');
            '' !== a && Nt(o, a);
            const i = ee(t[r + 1], /^ /, '');
            Nt(o, n, i);
          }
          return '' === o[o.length - 1] && Ct(o), o;
        },
        Ye = new P();
      let Je = 0;
      const Ze = new P(),
        Xe = (t, e = t.name) => {
          let o = ce(Ze, t);
          return void 0 !== o || ((Je += 1), (o = `${e}#${Je}`), pe(Ze, t, o)), o;
        },
        Qe = (t = Ve`Assert failed`, e = r.Error, { errorName: o } = {}) => {
          'string' == typeof t && (t = Ve([t]));
          const n = ce(He, t);
          if (void 0 === n) throw A(`unrecognized details ${je(t)}`);
          const a = new e(We(n));
          return pe(Ye, a, qe(n)), void 0 !== o && Xe(a, o), a;
        };
      O(Qe);
      const { addLogArgs: to, takeLogArgsArray: eo } = Ue(),
        oo = new P(),
        ro = (t, e) => {
          'string' == typeof e && (e = Ve([e]));
          const o = ce(He, e);
          if (void 0 === o) throw A(`unrecognized details ${je(e)}`);
          const r = qe(o),
            n = ce(oo, t);
          if (void 0 !== n) for (const e of n) e(t, r);
          else to(t, r);
        };
      O(ro);
      const no = {
        getStackString:
          r.getStackString ||
          ((t) => {
            if (!('stack' in t)) return '';
            const e = `${t.stack}`,
              o = te(e, '\n');
            return ae(e, ' ') || -1 === o ? e : re(e, o + 1);
          }),
        tagError: (t) => Xe(t),
        resetErrorTagNum: () => {
          Je = 0;
        },
        getMessageLogArgs: (t) => ce(Ye, t),
        takeMessageLogArgs: (t) => {
          const e = ce(Ye, t);
          return se(Ye, t), e;
        },
        takeNoteLogArgsArray: (t, e) => {
          const o = eo(t);
          if (void 0 !== e) {
            const o = ce(oo, t);
            o ? Nt(o, e) : pe(oo, t, [e]);
          }
          return o || [];
        },
      };
      O(no);
      const ao = (t, e = !1) => {
        const o = e ? Ke : Ve,
          n = o`Check failed`,
          a = (e = n, o = r.Error) => {
            const a = Qe(e, o);
            throw (void 0 !== t && t(a), a);
          };
        O(a);
        const i = (t, ...e) => a(o(t, ...e));
        const s = (t, e, r, n) => {
          M(t, e) || a(r || o`Expected ${t} is same as ${e}`, n || E);
        };
        O(s);
        const c = (t, e, r) => {
          if (typeof t !== e) {
            if (('string' == typeof e || i`${je(e)} must be a string`, void 0 === r)) {
              const n = ke(e);
              r = o`${t} must be ${Be(n)}`;
            }
            a(r, A);
          }
        };
        O(c);
        const l = _(
          function (t, e, o) {
            t || a(e, o);
          },
          {
            error: Qe,
            fail: a,
            equal: s,
            typeof: c,
            string: (t, e) => c(t, 'string', e),
            note: ro,
            details: o,
            Fail: i,
            quote: je,
            bare: Be,
            makeAssert: ao,
          },
        );
        return O(l);
      };
      O(ao);
      const io = ao(),
        so = F(It, q);
      io(so);
      const co = so.get;
      io(co);
      const lo = (t) => {
          H(t),
            $t(pt(t), (e) => {
              const o = F(t, e);
              io(o),
                ((t) => {
                  const e = +b(t);
                  return tt(e) && b(e) === t;
                })(e) || rt(t, e, { ...o, writable: !1, configurable: !1 });
            });
        },
        po = { Infinity: 1 / 0, NaN: NaN, undefined: void 0 },
        uo = {
          isFinite: 'isFinite',
          isNaN: 'isNaN',
          parseFloat: 'parseFloat',
          parseInt: 'parseInt',
          decodeURI: 'decodeURI',
          decodeURIComponent: 'decodeURIComponent',
          encodeURI: 'encodeURI',
          encodeURIComponent: 'encodeURIComponent',
          Array: 'Array',
          ArrayBuffer: 'ArrayBuffer',
          BigInt: 'BigInt',
          BigInt64Array: 'BigInt64Array',
          BigUint64Array: 'BigUint64Array',
          Boolean: 'Boolean',
          DataView: 'DataView',
          EvalError: 'EvalError',
          Float32Array: 'Float32Array',
          Float64Array: 'Float64Array',
          Int8Array: 'Int8Array',
          Int16Array: 'Int16Array',
          Int32Array: 'Int32Array',
          Map: 'Map',
          Number: 'Number',
          Object: 'Object',
          Promise: 'Promise',
          Proxy: 'Proxy',
          RangeError: 'RangeError',
          ReferenceError: 'ReferenceError',
          Set: 'Set',
          String: 'String',
          SyntaxError: 'SyntaxError',
          TypeError: 'TypeError',
          Uint8Array: 'Uint8Array',
          Uint8ClampedArray: 'Uint8ClampedArray',
          Uint16Array: 'Uint16Array',
          Uint32Array: 'Uint32Array',
          URIError: 'URIError',
          WeakMap: 'WeakMap',
          WeakSet: 'WeakSet',
          Iterator: 'Iterator',
          AsyncIterator: 'AsyncIterator',
          JSON: 'JSON',
          Reflect: 'Reflect',
          escape: 'escape',
          unescape: 'unescape',
          lockdown: 'lockdown',
          harden: 'harden',
          HandledPromise: 'HandledPromise',
        },
        fo = {
          Date: '%InitialDate%',
          Error: '%InitialError%',
          RegExp: '%InitialRegExp%',
          Math: '%InitialMath%',
          getStackString: '%InitialGetStackString%',
        },
        yo = {
          Date: '%SharedDate%',
          Error: '%SharedError%',
          RegExp: '%SharedRegExp%',
          Symbol: '%SharedSymbol%',
          Math: '%SharedMath%',
        },
        go = [EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError],
        mo = { '[[Proto]]': '%FunctionPrototype%', length: 'number', name: 'string' },
        ho = mo,
        bo = { '[[Proto]]': '%AsyncFunctionPrototype%' },
        So = { get: ho, set: 'undefined' },
        Po = { get: ho, set: ho },
        wo = (t) => t === So || t === Po;
      function vo(t) {
        return { '[[Proto]]': '%SharedError%', prototype: t };
      }
      function Eo(t) {
        return {
          '[[Proto]]': '%ErrorPrototype%',
          constructor: t,
          message: 'string',
          name: 'string',
          toString: !1,
          cause: !1,
        };
      }
      function Io(t) {
        return { '[[Proto]]': '%TypedArray%', BYTES_PER_ELEMENT: 'number', prototype: t };
      }
      function To(t) {
        return {
          '[[Proto]]': '%TypedArrayPrototype%',
          BYTES_PER_ELEMENT: 'number',
          constructor: t,
        };
      }
      const Ao = {
          E: 'number',
          LN10: 'number',
          LN2: 'number',
          LOG10E: 'number',
          LOG2E: 'number',
          PI: 'number',
          SQRT1_2: 'number',
          SQRT2: 'number',
          '@@toStringTag': 'string',
          abs: ho,
          acos: ho,
          acosh: ho,
          asin: ho,
          asinh: ho,
          atan: ho,
          atanh: ho,
          atan2: ho,
          cbrt: ho,
          ceil: ho,
          clz32: ho,
          cos: ho,
          cosh: ho,
          exp: ho,
          expm1: ho,
          floor: ho,
          fround: ho,
          hypot: ho,
          imul: ho,
          log: ho,
          log1p: ho,
          log10: ho,
          log2: ho,
          max: ho,
          min: ho,
          pow: ho,
          round: ho,
          sign: ho,
          sin: ho,
          sinh: ho,
          sqrt: ho,
          tan: ho,
          tanh: ho,
          trunc: ho,
          idiv: !1,
          idivmod: !1,
          imod: !1,
          imuldiv: !1,
          irem: !1,
          mod: !1,
        },
        _o = {
          '[[Proto]]': null,
          '%ThrowTypeError%': ho,
          Infinity: 'number',
          NaN: 'number',
          undefined: 'undefined',
          '%UniqueEval%': ho,
          isFinite: ho,
          isNaN: ho,
          parseFloat: ho,
          parseInt: ho,
          decodeURI: ho,
          decodeURIComponent: ho,
          encodeURI: ho,
          encodeURIComponent: ho,
          Object: {
            '[[Proto]]': '%FunctionPrototype%',
            assign: ho,
            create: ho,
            defineProperties: ho,
            defineProperty: ho,
            entries: ho,
            freeze: ho,
            fromEntries: ho,
            getOwnPropertyDescriptor: ho,
            getOwnPropertyDescriptors: ho,
            getOwnPropertyNames: ho,
            getOwnPropertySymbols: ho,
            getPrototypeOf: ho,
            hasOwn: ho,
            is: ho,
            isExtensible: ho,
            isFrozen: ho,
            isSealed: ho,
            keys: ho,
            preventExtensions: ho,
            prototype: '%ObjectPrototype%',
            seal: ho,
            setPrototypeOf: ho,
            values: ho,
            groupBy: ho,
          },
          '%ObjectPrototype%': {
            '[[Proto]]': null,
            constructor: 'Object',
            hasOwnProperty: ho,
            isPrototypeOf: ho,
            propertyIsEnumerable: ho,
            toLocaleString: ho,
            toString: ho,
            valueOf: ho,
            '--proto--': Po,
            __defineGetter__: ho,
            __defineSetter__: ho,
            __lookupGetter__: ho,
            __lookupSetter__: ho,
          },
          '%UniqueFunction%': {
            '[[Proto]]': '%FunctionPrototype%',
            prototype: '%FunctionPrototype%',
          },
          '%InertFunction%': {
            '[[Proto]]': '%FunctionPrototype%',
            prototype: '%FunctionPrototype%',
          },
          '%FunctionPrototype%': {
            apply: ho,
            bind: ho,
            call: ho,
            constructor: '%InertFunction%',
            toString: ho,
            '@@hasInstance': ho,
            caller: !1,
            arguments: !1,
          },
          Boolean: { '[[Proto]]': '%FunctionPrototype%', prototype: '%BooleanPrototype%' },
          '%BooleanPrototype%': { constructor: 'Boolean', toString: ho, valueOf: ho },
          '%SharedSymbol%': {
            '[[Proto]]': '%FunctionPrototype%',
            asyncDispose: 'symbol',
            asyncIterator: 'symbol',
            dispose: 'symbol',
            for: ho,
            hasInstance: 'symbol',
            isConcatSpreadable: 'symbol',
            iterator: 'symbol',
            keyFor: ho,
            match: 'symbol',
            matchAll: 'symbol',
            prototype: '%SymbolPrototype%',
            replace: 'symbol',
            search: 'symbol',
            species: 'symbol',
            split: 'symbol',
            toPrimitive: 'symbol',
            toStringTag: 'symbol',
            unscopables: 'symbol',
            useSimple: !1,
            useSetter: !1,
          },
          '%SymbolPrototype%': {
            constructor: '%SharedSymbol%',
            description: So,
            toString: ho,
            valueOf: ho,
            '@@toPrimitive': ho,
            '@@toStringTag': 'string',
          },
          '%InitialError%': {
            '[[Proto]]': '%FunctionPrototype%',
            prototype: '%ErrorPrototype%',
            captureStackTrace: ho,
            stackTraceLimit: Po,
            prepareStackTrace: Po,
          },
          '%SharedError%': {
            '[[Proto]]': '%FunctionPrototype%',
            prototype: '%ErrorPrototype%',
            captureStackTrace: ho,
            stackTraceLimit: Po,
            prepareStackTrace: Po,
          },
          '%ErrorPrototype%': {
            constructor: '%SharedError%',
            message: 'string',
            name: 'string',
            toString: ho,
            at: !1,
            stack: Po,
            cause: !1,
          },
          EvalError: vo('%EvalErrorPrototype%'),
          RangeError: vo('%RangeErrorPrototype%'),
          ReferenceError: vo('%ReferenceErrorPrototype%'),
          SyntaxError: vo('%SyntaxErrorPrototype%'),
          TypeError: vo('%TypeErrorPrototype%'),
          URIError: vo('%URIErrorPrototype%'),
          '%EvalErrorPrototype%': Eo('EvalError'),
          '%RangeErrorPrototype%': Eo('RangeError'),
          '%ReferenceErrorPrototype%': Eo('ReferenceError'),
          '%SyntaxErrorPrototype%': Eo('SyntaxError'),
          '%TypeErrorPrototype%': Eo('TypeError'),
          '%URIErrorPrototype%': Eo('URIError'),
          Number: {
            '[[Proto]]': '%FunctionPrototype%',
            EPSILON: 'number',
            isFinite: ho,
            isInteger: ho,
            isNaN: ho,
            isSafeInteger: ho,
            MAX_SAFE_INTEGER: 'number',
            MAX_VALUE: 'number',
            MIN_SAFE_INTEGER: 'number',
            MIN_VALUE: 'number',
            NaN: 'number',
            NEGATIVE_INFINITY: 'number',
            parseFloat: ho,
            parseInt: ho,
            POSITIVE_INFINITY: 'number',
            prototype: '%NumberPrototype%',
          },
          '%NumberPrototype%': {
            constructor: 'Number',
            toExponential: ho,
            toFixed: ho,
            toLocaleString: ho,
            toPrecision: ho,
            toString: ho,
            valueOf: ho,
          },
          BigInt: {
            '[[Proto]]': '%FunctionPrototype%',
            asIntN: ho,
            asUintN: ho,
            prototype: '%BigIntPrototype%',
            bitLength: !1,
            fromArrayBuffer: !1,
          },
          '%BigIntPrototype%': {
            constructor: 'BigInt',
            toLocaleString: ho,
            toString: ho,
            valueOf: ho,
            '@@toStringTag': 'string',
          },
          '%InitialMath%': { ...Ao, random: ho },
          '%SharedMath%': { ...Ao, random: ho },
          '%InitialDate%': {
            '[[Proto]]': '%FunctionPrototype%',
            now: ho,
            parse: ho,
            prototype: '%DatePrototype%',
            UTC: ho,
          },
          '%SharedDate%': {
            '[[Proto]]': '%FunctionPrototype%',
            now: ho,
            parse: ho,
            prototype: '%DatePrototype%',
            UTC: ho,
          },
          '%DatePrototype%': {
            constructor: '%SharedDate%',
            getDate: ho,
            getDay: ho,
            getFullYear: ho,
            getHours: ho,
            getMilliseconds: ho,
            getMinutes: ho,
            getMonth: ho,
            getSeconds: ho,
            getTime: ho,
            getTimezoneOffset: ho,
            getUTCDate: ho,
            getUTCDay: ho,
            getUTCFullYear: ho,
            getUTCHours: ho,
            getUTCMilliseconds: ho,
            getUTCMinutes: ho,
            getUTCMonth: ho,
            getUTCSeconds: ho,
            setDate: ho,
            setFullYear: ho,
            setHours: ho,
            setMilliseconds: ho,
            setMinutes: ho,
            setMonth: ho,
            setSeconds: ho,
            setTime: ho,
            setUTCDate: ho,
            setUTCFullYear: ho,
            setUTCHours: ho,
            setUTCMilliseconds: ho,
            setUTCMinutes: ho,
            setUTCMonth: ho,
            setUTCSeconds: ho,
            toDateString: ho,
            toISOString: ho,
            toJSON: ho,
            toLocaleDateString: ho,
            toLocaleString: ho,
            toLocaleTimeString: ho,
            toString: ho,
            toTimeString: ho,
            toUTCString: ho,
            valueOf: ho,
            '@@toPrimitive': ho,
            getYear: ho,
            setYear: ho,
            toGMTString: ho,
          },
          String: {
            '[[Proto]]': '%FunctionPrototype%',
            fromCharCode: ho,
            fromCodePoint: ho,
            prototype: '%StringPrototype%',
            raw: ho,
            fromArrayBuffer: !1,
          },
          '%StringPrototype%': {
            length: 'number',
            at: ho,
            charAt: ho,
            charCodeAt: ho,
            codePointAt: ho,
            concat: ho,
            constructor: 'String',
            endsWith: ho,
            includes: ho,
            indexOf: ho,
            lastIndexOf: ho,
            localeCompare: ho,
            match: ho,
            matchAll: ho,
            normalize: ho,
            padEnd: ho,
            padStart: ho,
            repeat: ho,
            replace: ho,
            replaceAll: ho,
            search: ho,
            slice: ho,
            split: ho,
            startsWith: ho,
            substring: ho,
            toLocaleLowerCase: ho,
            toLocaleUpperCase: ho,
            toLowerCase: ho,
            toString: ho,
            toUpperCase: ho,
            trim: ho,
            trimEnd: ho,
            trimStart: ho,
            valueOf: ho,
            '@@iterator': ho,
            substr: ho,
            anchor: ho,
            big: ho,
            blink: ho,
            bold: ho,
            fixed: ho,
            fontcolor: ho,
            fontsize: ho,
            italics: ho,
            link: ho,
            small: ho,
            strike: ho,
            sub: ho,
            sup: ho,
            trimLeft: ho,
            trimRight: ho,
            compare: !1,
            isWellFormed: ho,
            toWellFormed: ho,
            unicodeSets: ho,
          },
          '%StringIteratorPrototype%': {
            '[[Proto]]': '%IteratorPrototype%',
            next: ho,
            '@@toStringTag': 'string',
          },
          '%InitialRegExp%': {
            '[[Proto]]': '%FunctionPrototype%',
            prototype: '%RegExpPrototype%',
            '@@species': So,
            input: !1,
            $_: !1,
            lastMatch: !1,
            '$&': !1,
            lastParen: !1,
            '$+': !1,
            leftContext: !1,
            '$`': !1,
            rightContext: !1,
            "$'": !1,
            $1: !1,
            $2: !1,
            $3: !1,
            $4: !1,
            $5: !1,
            $6: !1,
            $7: !1,
            $8: !1,
            $9: !1,
          },
          '%SharedRegExp%': {
            '[[Proto]]': '%FunctionPrototype%',
            prototype: '%RegExpPrototype%',
            '@@species': So,
          },
          '%RegExpPrototype%': {
            constructor: '%SharedRegExp%',
            exec: ho,
            dotAll: So,
            flags: So,
            global: So,
            hasIndices: So,
            ignoreCase: So,
            '@@match': ho,
            '@@matchAll': ho,
            multiline: So,
            '@@replace': ho,
            '@@search': ho,
            source: So,
            '@@split': ho,
            sticky: So,
            test: ho,
            toString: ho,
            unicode: So,
            unicodeSets: So,
            compile: !1,
          },
          '%RegExpStringIteratorPrototype%': {
            '[[Proto]]': '%IteratorPrototype%',
            next: ho,
            '@@toStringTag': 'string',
          },
          Array: {
            '[[Proto]]': '%FunctionPrototype%',
            from: ho,
            isArray: ho,
            of: ho,
            prototype: '%ArrayPrototype%',
            '@@species': So,
            at: ho,
            fromAsync: ho,
          },
          '%ArrayPrototype%': {
            at: ho,
            length: 'number',
            concat: ho,
            constructor: 'Array',
            copyWithin: ho,
            entries: ho,
            every: ho,
            fill: ho,
            filter: ho,
            find: ho,
            findIndex: ho,
            flat: ho,
            flatMap: ho,
            forEach: ho,
            includes: ho,
            indexOf: ho,
            join: ho,
            keys: ho,
            lastIndexOf: ho,
            map: ho,
            pop: ho,
            push: ho,
            reduce: ho,
            reduceRight: ho,
            reverse: ho,
            shift: ho,
            slice: ho,
            some: ho,
            sort: ho,
            splice: ho,
            toLocaleString: ho,
            toString: ho,
            unshift: ho,
            values: ho,
            '@@iterator': ho,
            '@@unscopables': {
              '[[Proto]]': null,
              copyWithin: 'boolean',
              entries: 'boolean',
              fill: 'boolean',
              find: 'boolean',
              findIndex: 'boolean',
              flat: 'boolean',
              flatMap: 'boolean',
              includes: 'boolean',
              keys: 'boolean',
              values: 'boolean',
              at: 'boolean',
              findLast: 'boolean',
              findLastIndex: 'boolean',
              toReversed: 'boolean',
              toSorted: 'boolean',
              toSpliced: 'boolean',
              with: 'boolean',
              group: 'boolean',
              groupToMap: 'boolean',
              groupBy: 'boolean',
            },
            findLast: ho,
            findLastIndex: ho,
            toReversed: ho,
            toSorted: ho,
            toSpliced: ho,
            with: ho,
            group: ho,
            groupToMap: ho,
            groupBy: ho,
          },
          '%ArrayIteratorPrototype%': {
            '[[Proto]]': '%IteratorPrototype%',
            next: ho,
            '@@toStringTag': 'string',
          },
          '%TypedArray%': {
            '[[Proto]]': '%FunctionPrototype%',
            from: ho,
            of: ho,
            prototype: '%TypedArrayPrototype%',
            '@@species': So,
          },
          '%TypedArrayPrototype%': {
            at: ho,
            buffer: So,
            byteLength: So,
            byteOffset: So,
            constructor: '%TypedArray%',
            copyWithin: ho,
            entries: ho,
            every: ho,
            fill: ho,
            filter: ho,
            find: ho,
            findIndex: ho,
            forEach: ho,
            includes: ho,
            indexOf: ho,
            join: ho,
            keys: ho,
            lastIndexOf: ho,
            length: So,
            map: ho,
            reduce: ho,
            reduceRight: ho,
            reverse: ho,
            set: ho,
            slice: ho,
            some: ho,
            sort: ho,
            subarray: ho,
            toLocaleString: ho,
            toString: ho,
            values: ho,
            '@@iterator': ho,
            '@@toStringTag': So,
            findLast: ho,
            findLastIndex: ho,
            toReversed: ho,
            toSorted: ho,
            with: ho,
          },
          BigInt64Array: Io('%BigInt64ArrayPrototype%'),
          BigUint64Array: Io('%BigUint64ArrayPrototype%'),
          Float32Array: Io('%Float32ArrayPrototype%'),
          Float64Array: Io('%Float64ArrayPrototype%'),
          Int16Array: Io('%Int16ArrayPrototype%'),
          Int32Array: Io('%Int32ArrayPrototype%'),
          Int8Array: Io('%Int8ArrayPrototype%'),
          Uint16Array: Io('%Uint16ArrayPrototype%'),
          Uint32Array: Io('%Uint32ArrayPrototype%'),
          Uint8Array: Io('%Uint8ArrayPrototype%'),
          Uint8ClampedArray: Io('%Uint8ClampedArrayPrototype%'),
          '%BigInt64ArrayPrototype%': To('BigInt64Array'),
          '%BigUint64ArrayPrototype%': To('BigUint64Array'),
          '%Float32ArrayPrototype%': To('Float32Array'),
          '%Float64ArrayPrototype%': To('Float64Array'),
          '%Int16ArrayPrototype%': To('Int16Array'),
          '%Int32ArrayPrototype%': To('Int32Array'),
          '%Int8ArrayPrototype%': To('Int8Array'),
          '%Uint16ArrayPrototype%': To('Uint16Array'),
          '%Uint32ArrayPrototype%': To('Uint32Array'),
          '%Uint8ArrayPrototype%': To('Uint8Array'),
          '%Uint8ClampedArrayPrototype%': To('Uint8ClampedArray'),
          Map: {
            '[[Proto]]': '%FunctionPrototype%',
            '@@species': So,
            prototype: '%MapPrototype%',
            groupBy: ho,
          },
          '%MapPrototype%': {
            clear: ho,
            constructor: 'Map',
            delete: ho,
            entries: ho,
            forEach: ho,
            get: ho,
            has: ho,
            keys: ho,
            set: ho,
            size: So,
            values: ho,
            '@@iterator': ho,
            '@@toStringTag': 'string',
          },
          '%MapIteratorPrototype%': {
            '[[Proto]]': '%IteratorPrototype%',
            next: ho,
            '@@toStringTag': 'string',
          },
          Set: { '[[Proto]]': '%FunctionPrototype%', prototype: '%SetPrototype%', '@@species': So },
          '%SetPrototype%': {
            add: ho,
            clear: ho,
            constructor: 'Set',
            delete: ho,
            entries: ho,
            forEach: ho,
            has: ho,
            keys: ho,
            size: So,
            values: ho,
            '@@iterator': ho,
            '@@toStringTag': 'string',
          },
          '%SetIteratorPrototype%': {
            '[[Proto]]': '%IteratorPrototype%',
            next: ho,
            '@@toStringTag': 'string',
          },
          WeakMap: { '[[Proto]]': '%FunctionPrototype%', prototype: '%WeakMapPrototype%' },
          '%WeakMapPrototype%': {
            constructor: 'WeakMap',
            delete: ho,
            get: ho,
            has: ho,
            set: ho,
            '@@toStringTag': 'string',
          },
          WeakSet: { '[[Proto]]': '%FunctionPrototype%', prototype: '%WeakSetPrototype%' },
          '%WeakSetPrototype%': {
            add: ho,
            constructor: 'WeakSet',
            delete: ho,
            has: ho,
            '@@toStringTag': 'string',
          },
          ArrayBuffer: {
            '[[Proto]]': '%FunctionPrototype%',
            isView: ho,
            prototype: '%ArrayBufferPrototype%',
            '@@species': So,
            fromString: !1,
            fromBigInt: !1,
          },
          '%ArrayBufferPrototype%': {
            byteLength: So,
            constructor: 'ArrayBuffer',
            slice: ho,
            '@@toStringTag': 'string',
            concat: !1,
            transfer: ho,
            resize: ho,
            resizable: So,
            maxByteLength: So,
            transferToFixedLength: ho,
            detached: So,
          },
          SharedArrayBuffer: !1,
          '%SharedArrayBufferPrototype%': !1,
          DataView: {
            '[[Proto]]': '%FunctionPrototype%',
            BYTES_PER_ELEMENT: 'number',
            prototype: '%DataViewPrototype%',
          },
          '%DataViewPrototype%': {
            buffer: So,
            byteLength: So,
            byteOffset: So,
            constructor: 'DataView',
            getBigInt64: ho,
            getBigUint64: ho,
            getFloat32: ho,
            getFloat64: ho,
            getInt8: ho,
            getInt16: ho,
            getInt32: ho,
            getUint8: ho,
            getUint16: ho,
            getUint32: ho,
            setBigInt64: ho,
            setBigUint64: ho,
            setFloat32: ho,
            setFloat64: ho,
            setInt8: ho,
            setInt16: ho,
            setInt32: ho,
            setUint8: ho,
            setUint16: ho,
            setUint32: ho,
            '@@toStringTag': 'string',
          },
          Atomics: !1,
          JSON: { parse: ho, stringify: ho, '@@toStringTag': 'string', rawJSON: ho, isRawJSON: ho },
          Iterator: {
            '[[Proto]]': '%FunctionPrototype%',
            prototype: '%IteratorPrototype%',
            from: ho,
          },
          '%IteratorPrototype%': {
            '@@iterator': ho,
            constructor: 'Iterator',
            map: ho,
            filter: ho,
            take: ho,
            drop: ho,
            flatMap: ho,
            reduce: ho,
            toArray: ho,
            forEach: ho,
            some: ho,
            every: ho,
            find: ho,
            '@@toStringTag': 'string',
            toAsync: ho,
          },
          '%WrapForValidIteratorPrototype%': {
            '[[Proto]]': '%IteratorPrototype%',
            next: ho,
            return: ho,
          },
          '%IteratorHelperPrototype%': {
            '[[Proto]]': '%IteratorPrototype%',
            next: ho,
            return: ho,
            '@@toStringTag': 'string',
          },
          AsyncIterator: {
            '[[Proto]]': '%FunctionPrototype%',
            prototype: '%AsyncIteratorPrototype%',
            from: ho,
          },
          '%AsyncIteratorPrototype%': {
            '@@asyncIterator': ho,
            constructor: 'AsyncIterator',
            map: ho,
            filter: ho,
            take: ho,
            drop: ho,
            flatMap: ho,
            reduce: ho,
            toArray: ho,
            forEach: ho,
            some: ho,
            every: ho,
            find: ho,
            '@@toStringTag': 'string',
          },
          '%WrapForValidAsyncIteratorPrototype%': {
            '[[Proto]]': '%AsyncIteratorPrototype%',
            next: ho,
            return: ho,
          },
          '%AsyncIteratorHelperPrototype%': {
            '[[Proto]]': '%AsyncIteratorPrototype%',
            next: ho,
            return: ho,
            '@@toStringTag': 'string',
          },
          '%InertGeneratorFunction%': { '[[Proto]]': '%InertFunction%', prototype: '%Generator%' },
          '%Generator%': {
            '[[Proto]]': '%FunctionPrototype%',
            constructor: '%InertGeneratorFunction%',
            prototype: '%GeneratorPrototype%',
            '@@toStringTag': 'string',
          },
          '%InertAsyncGeneratorFunction%': {
            '[[Proto]]': '%InertFunction%',
            prototype: '%AsyncGenerator%',
          },
          '%AsyncGenerator%': {
            '[[Proto]]': '%FunctionPrototype%',
            constructor: '%InertAsyncGeneratorFunction%',
            prototype: '%AsyncGeneratorPrototype%',
            length: 'number',
            '@@toStringTag': 'string',
          },
          '%GeneratorPrototype%': {
            '[[Proto]]': '%IteratorPrototype%',
            constructor: '%Generator%',
            next: ho,
            return: ho,
            throw: ho,
            '@@toStringTag': 'string',
          },
          '%AsyncGeneratorPrototype%': {
            '[[Proto]]': '%AsyncIteratorPrototype%',
            constructor: '%AsyncGenerator%',
            next: ho,
            return: ho,
            throw: ho,
            '@@toStringTag': 'string',
          },
          HandledPromise: {
            '[[Proto]]': 'Promise',
            applyFunction: ho,
            applyFunctionSendOnly: ho,
            applyMethod: ho,
            applyMethodSendOnly: ho,
            get: ho,
            getSendOnly: ho,
            prototype: '%PromisePrototype%',
            resolve: ho,
          },
          Promise: {
            '[[Proto]]': '%FunctionPrototype%',
            all: ho,
            allSettled: ho,
            any: !1,
            prototype: '%PromisePrototype%',
            race: ho,
            reject: ho,
            resolve: ho,
            '@@species': So,
          },
          '%PromisePrototype%': {
            catch: ho,
            constructor: 'Promise',
            finally: ho,
            then: ho,
            '@@toStringTag': 'string',
            'UniqueSymbol(async_id_symbol)': Po,
            'UniqueSymbol(trigger_async_id_symbol)': Po,
            'UniqueSymbol(destroyed)': Po,
          },
          '%InertAsyncFunction%': {
            '[[Proto]]': '%InertFunction%',
            prototype: '%AsyncFunctionPrototype%',
          },
          '%AsyncFunctionPrototype%': {
            '[[Proto]]': '%FunctionPrototype%',
            constructor: '%InertAsyncFunction%',
            length: 'number',
            '@@toStringTag': 'string',
          },
          Reflect: {
            apply: ho,
            construct: ho,
            defineProperty: ho,
            deleteProperty: ho,
            get: ho,
            getOwnPropertyDescriptor: ho,
            getPrototypeOf: ho,
            has: ho,
            isExtensible: ho,
            ownKeys: ho,
            preventExtensions: ho,
            set: ho,
            setPrototypeOf: ho,
            '@@toStringTag': 'string',
          },
          Proxy: { '[[Proto]]': '%FunctionPrototype%', revocable: ho },
          escape: ho,
          unescape: ho,
          '%UniqueCompartment%': {
            '[[Proto]]': '%FunctionPrototype%',
            prototype: '%CompartmentPrototype%',
            toString: ho,
          },
          '%InertCompartment%': {
            '[[Proto]]': '%FunctionPrototype%',
            prototype: '%CompartmentPrototype%',
            toString: ho,
          },
          '%CompartmentPrototype%': {
            constructor: '%InertCompartment%',
            evaluate: ho,
            globalThis: So,
            name: So,
            toString: ho,
            import: bo,
            load: bo,
            importNow: ho,
            module: ho,
          },
          lockdown: ho,
          harden: { ...ho, isFake: 'boolean' },
          '%InitialGetStackString%': ho,
        },
        xo = (t) => 'function' == typeof t;
      function $o(t, e, o) {
        if (_t(t, e)) {
          const r = F(t, e);
          if (
            !r ||
            !M(r.value, o.value) ||
            r.get !== o.get ||
            r.set !== o.set ||
            r.writable !== o.writable ||
            r.enumerable !== o.enumerable ||
            r.configurable !== o.configurable
          )
            throw A(`Conflicting definitions of ${e}`);
        }
        rt(t, e, o);
      }
      function ko(t, e) {
        const o = { __proto__: null };
        for (const [r, n] of k(e)) _t(t, r) && (o[n] = t[r]);
        return o;
      }
      const Oo = () => {
        const t = x(null);
        let e;
        const o = (e) => {
          !(function (t, e) {
            for (const [o, r] of k(e)) $o(t, o, r);
          })(t, C(e));
        };
        O(o);
        const n = () => {
          for (const [e, o] of k(t)) {
            if (!Se(o)) continue;
            if (!_t(o, 'prototype')) continue;
            const r = _o[e];
            if ('object' != typeof r) throw A(`Expected permit object at whitelist.${e}`);
            const n = r.prototype;
            if (!n) throw A(`${e}.prototype property not whitelisted`);
            if ('string' != typeof n || !_t(_o, n))
              throw A(`Unrecognized ${e}.prototype whitelist entry`);
            const a = o.prototype;
            if (_t(t, n)) {
              if (t[n] !== a) throw A(`Conflicting bindings of ${n}`);
            } else t[n] = a;
          }
        };
        O(n);
        const a = () => (O(t), (e = new w(xt(z(t), xo))), t);
        O(a);
        const i = (t) => {
          if (!e) throw A('isPseudoNative can only be called after finalIntrinsics');
          return fe(e, t);
        };
        O(i);
        const s = {
          addIntrinsics: o,
          completePrototypes: n,
          finalIntrinsics: a,
          isPseudoNative: i,
        };
        return O(s), o(po), o(ko(r, uo)), s;
      };
      function Fo(t, e) {
        const o = ['undefined', 'boolean', 'number', 'string', 'symbol'],
          r = new l(
            S
              ? Ft(
                  xt(
                    k(_o['%SharedSymbol%']),
                    ([t, e]) => 'symbol' === e && 'symbol' == typeof S[t],
                  ),
                  ([t]) => [S[t], `@@${t}`],
                )
              : [],
          );
        function n(t, e) {
          if ('string' == typeof e) return e;
          const o = jt(r, e);
          if ('symbol' == typeof e) {
            if (o) return o;
            {
              const t = X(e);
              return void 0 !== t ? `RegisteredSymbol(${t})` : `Unique${b(e)}`;
            }
          }
          throw A(`Unexpected property name type ${t} ${e}`);
        }
        function a(e, r, n, a) {
          if ('object' == typeof a) return c(e, r, a), !0;
          if (!1 === a) return !1;
          if ('string' == typeof a)
            if ('prototype' === n || 'constructor' === n) {
              if (_t(t, a)) {
                if (r !== t[a]) throw A(`Does not match whitelist ${e}`);
                return !0;
              }
            } else if (kt(o, a)) {
              if (typeof r !== a) throw A(`At ${e} expected ${a} not ${typeof r}`);
              return !0;
            }
          throw A(`Unexpected whitelist permit ${a} at ${e}`);
        }
        function i(t, e, o, r) {
          const n = F(e, o);
          if (!n) throw A(`Property ${o} not found at ${t}`);
          if (_t(n, 'value')) {
            if (wo(r)) throw A(`Accessor expected at ${t}`);
            return a(t, n.value, o, r);
          }
          if (!wo(r)) throw A(`Accessor not expected at ${t}`);
          return a(`${t}<get>`, n.get, o, r.get) && a(`${t}<set>`, n.set, o, r.set);
        }
        function s(t, e, o) {
          const r = '__proto__' === o ? '--proto--' : o;
          return _t(e, r) ? e[r] : 'function' == typeof t && _t(mo, r) ? mo[r] : void 0;
        }
        function c(o, r, a) {
          if (null == r) return;
          !(function (e, o, r) {
            if (!Se(o)) throw A(`Object expected: ${e}, ${o}, ${r}`);
            const n = R(o);
            if (null !== n || null !== r) {
              if (void 0 !== r && 'string' != typeof r)
                throw A(`Malformed whitelist permit ${e}.__proto__`);
              if (n !== t[r || '%ObjectPrototype%'])
                throw A(`Unexpected intrinsic ${e}.__proto__ at ${r}`);
            }
          })(o, r, a['[[Proto]]']),
            'function' == typeof r && e(r);
          for (const t of pt(r)) {
            const e = n(o, t),
              c = `${o}.${e}`,
              l = s(r, a, e);
            if (!l || !i(c, r, t, l)) {
              !1 !== l && console.warn(`Removing ${c}`);
              try {
                delete r[t];
              } catch (e) {
                if (t in r) {
                  if (
                    'function' == typeof r &&
                    'prototype' === t &&
                    ((r.prototype = void 0), void 0 === r.prototype)
                  ) {
                    console.warn(`Tolerating undeletable ${c} === undefined`);
                    continue;
                  }
                  console.error(`failed to delete ${c}`, e);
                } else console.error(`deleting ${c} threw`, e);
                throw e;
              }
            }
          }
        }
        c('intrinsics', t, _o);
      }
      const Co = {
          '%ObjectPrototype%': { toString: !0 },
          '%FunctionPrototype%': { toString: !0 },
          '%ErrorPrototype%': { name: !0 },
        },
        No = {
          '%ObjectPrototype%': { toString: !0, valueOf: !0 },
          '%ArrayPrototype%': { toString: !0, push: !0 },
          '%FunctionPrototype%': { constructor: !0, bind: !0, toString: !0 },
          '%ErrorPrototype%': { constructor: !0, message: !0, name: !0, toString: !0 },
          '%TypeErrorPrototype%': { constructor: !0, message: !0, name: !0 },
          '%SyntaxErrorPrototype%': { message: !0, name: !0 },
          '%RangeErrorPrototype%': { message: !0, name: !0 },
          '%URIErrorPrototype%': { message: !0, name: !0 },
          '%EvalErrorPrototype%': { message: !0, name: !0 },
          '%ReferenceErrorPrototype%': { message: !0, name: !0 },
          '%PromisePrototype%': { constructor: !0 },
          '%TypedArrayPrototype%': '*',
          '%Generator%': { constructor: !0, name: !0, toString: !0 },
          '%IteratorPrototype%': { toString: !0 },
        },
        Ro = {
          ...No,
          '%ObjectPrototype%': '*',
          '%TypedArrayPrototype%': '*',
          '%MapPrototype%': '*',
          '%SetPrototype%': '*',
        };
      const { Fail: Mo, quote: Lo } = io,
        Uo = /^(\w*[a-z])Locale([A-Z]\w*)$/,
        Do = {
          localeCompare(t) {
            if (null == this) throw A('Cannot localeCompare with null or undefined "this" value');
            const e = `${this}`,
              o = `${t}`;
            return e < o
              ? -1
              : e > o
                ? 1
                : (e === o || Mo`expected ${Lo(e)} and ${Lo(o)} to compare`, 0);
          },
          toString() {
            return `${this}`;
          },
        },
        jo = Do.localeCompare,
        Go = Do.toString;
      const { Fail: Bo } = io,
        Ho = (t) => {
          for (const [e, o] of k(po))
            rt(t, e, { value: o, writable: !1, enumerable: !1, configurable: !1 });
        },
        Wo = (
          t,
          {
            intrinsics: e,
            newGlobalPropertyNames: o,
            makeCompartmentConstructor: r,
            markVirtualizedNativeFunction: n,
          },
        ) => {
          for (const [o, r] of k(uo))
            _t(e, r) && rt(t, o, { value: e[r], writable: !0, enumerable: !1, configurable: !0 });
          for (const [r, n] of k(o))
            _t(e, n) && rt(t, r, { value: e[n], writable: !0, enumerable: !1, configurable: !0 });
          const a = { globalThis: t };
          a.Compartment = r(r, e, n);
          for (const [e, o] of k(a))
            rt(t, e, { value: o, writable: !0, enumerable: !1, configurable: !0 }),
              'function' == typeof o && n(o);
        },
        zo = (t, e, o) => {
          {
            const n = ((r = e), (t) => ('string' != typeof t ? t : r(t)));
            o(n), rt(t, 'eval', { value: n, writable: !0, enumerable: !1, configurable: !0 });
          }
          var r;
          {
            const r = ((t) => {
              const e = function (e) {
                const o = `${Ct(arguments) || ''}`,
                  r = `${Ot(arguments, ',')}`;
                new ve(r, ''), new ve(o);
                return t(`(function anonymous(${r}\n) {\n${o}\n})`);
              };
              return (
                $(e, {
                  prototype: {
                    value: ve.prototype,
                    writable: !1,
                    enumerable: !1,
                    configurable: !1,
                  },
                }),
                R(ve) === ve.prototype || Bo`Function prototype is the same accross compartments`,
                R(e) === ve.prototype ||
                  Bo`Function constructor prototype is the same accross compartments`,
                e
              );
            })(e);
            o(r), rt(t, 'Function', { value: r, writable: !0, enumerable: !1, configurable: !0 });
          }
        },
        { Fail: Vo, quote: Ko } = io,
        qo = new d(
          be,
          O({
            get(t, e) {
              Vo`Please report unexpected scope handler trap: ${Ko(b(e))}`;
            },
          }),
        ),
        Yo = O(
          x(
            qo,
            C({
              get(t, e) {},
              set(t, e, o) {
                throw I(`${b(e)} is not defined`);
              },
              has: (t, e) => e in r,
              getPrototypeOf: (t) => null,
              getOwnPropertyDescriptor(t, e) {
                const o = Ko(b(e));
                console.warn(
                  `getOwnPropertyDescriptor trap on scopeTerminatorHandler for ${o}`,
                  A().stack,
                );
              },
              ownKeys: (t) => [],
            }),
          ),
        ),
        Jo = new d(be, Yo),
        Zo = (t) => {
          const e = { ...Yo, set: (e, o, r) => ft(t, o, r), has: (t, e) => !0 },
            o = O(x(qo, C(e)));
          return new d(be, o);
        };
      O(Zo);
      const { Fail: Xo } = io,
        Qo = '\\s*[@#]\\s*([a-zA-Z][a-zA-Z0-9]*)\\s*=\\s*([^\\s\\*]*)',
        tr = new m(`(?:\\s*//${Qo}|/\\*${Qo}\\s*\\*/)\\s*$`),
        er = (t) => {
          let e = '<unknown>';
          for (; t.length > 0; ) {
            const o = Jt(tr, t);
            if (null === o) break;
            (t = re(t, 0, t.length - o[0].length)),
              'sourceURL' === o[3] ? (e = o[4]) : 'sourceURL' === o[1] && (e = o[2]);
          }
          return e;
        };
      function or(t, e) {
        const o = oe(t, e);
        if (o < 0) return -1;
        const r = '\n' === t[o] ? 1 : 0;
        return ne(re(t, 0, o), '\n').length + r;
      }
      const rr = new m('(?:\x3c!--|--\x3e)', 'g'),
        nr = (t) => {
          const e = or(t, rr);
          if (e < 0) return t;
          const o = er(t);
          throw T(`Possible HTML comment rejected at ${o}:${e}. (SES_HTML_COMMENT_REJECTED)`);
        },
        ar = (t) => ee(t, rr, (t) => ('<' === t[0] ? '< ! --' : '-- >')),
        ir = new m('(^|[^.]|\\.\\.\\.)\\bimport(\\s*(?:\\(|/[/*]))', 'g'),
        sr = (t) => {
          const e = or(t, ir);
          if (e < 0) return t;
          const o = er(t);
          throw T(`Possible import expression rejected at ${o}:${e}. (SES_IMPORT_REJECTED)`);
        },
        cr = (t) => ee(t, ir, (t, e, o) => `${e}__import__${o}`),
        lr = new m('(^|[^.])\\beval(\\s*\\()', 'g'),
        pr = (t) => {
          const e = or(t, lr);
          if (e < 0) return t;
          const o = er(t);
          throw T(`Possible direct eval expression rejected at ${o}:${e}. (SES_EVAL_REJECTED)`);
        },
        ur = (t) => ((t = nr(t)), (t = sr(t))),
        fr = (t, e) => {
          for (const o of e) t = o(t);
          return t;
        },
        yr =
          (O({
            rejectHtmlComments: O(nr),
            evadeHtmlCommentTest: O(ar),
            rejectImportExpressions: O(sr),
            evadeImportExpressionTest: O(cr),
            rejectSomeDirectEvalExpressions: O(pr),
            mandatoryTransforms: O(ur),
            applyTransforms: O(fr),
          }),
          [
            'await',
            'break',
            'case',
            'catch',
            'class',
            'const',
            'continue',
            'debugger',
            'default',
            'delete',
            'do',
            'else',
            'export',
            'extends',
            'finally',
            'for',
            'function',
            'if',
            'import',
            'in',
            'instanceof',
            'new',
            'return',
            'super',
            'switch',
            'this',
            'throw',
            'try',
            'typeof',
            'var',
            'void',
            'while',
            'with',
            'yield',
            'let',
            'static',
            'enum',
            'implements',
            'package',
            'protected',
            'interface',
            'private',
            'public',
            'await',
            'null',
            'true',
            'false',
            'this',
            'arguments',
          ]),
        dr = /^[a-zA-Z_$][\w$]*$/,
        gr = (t) => 'eval' !== t && !kt(yr, t) && Yt(dr, t);
      function mr(t, e) {
        const o = F(t, e);
        return o && !1 === o.configurable && !1 === o.writable && _t(o, 'value');
      }
      function hr(t, e) {
        return 0 === t.length ? '' : `const {${Ot(t, ',')}} = this.${e};`;
      }
      const br = (t) => {
          const { globalObjectConstants: e, moduleLexicalConstants: o } = ((t, e = {}) => {
              const o = N(t),
                r = N(e),
                n = xt(r, (t) => gr(t) && mr(e, t));
              return {
                globalObjectConstants: xt(o, (e) => !kt(r, e) && gr(e) && mr(t, e)),
                moduleLexicalConstants: n,
              };
            })(t.globalObject, t.moduleLexicals),
            r = hr(e, 'globalObject'),
            n = hr(o, 'moduleLexicals'),
            a = ve(
              `\n    with (this.scopeTerminator) {\n      with (this.globalObject) {\n        with (this.moduleLexicals) {\n          with (this.evalScope) {\n            ${r}\n            ${n}\n            return function() {\n              'use strict';\n              return eval(arguments[0]);\n            };\n          }\n        }\n      }\n    }\n  `,
            );
          return nt(a, t, []);
        },
        { Fail: Sr } = io,
        Pr = ({
          globalObject: t,
          moduleLexicals: e = {},
          globalTransforms: o = [],
          sloppyGlobalsMode: r = !1,
        }) => {
          const n = r ? Zo(t) : Jo,
            a = (() => {
              const t = x(null),
                e = O({
                  eval: { get: () => (delete t.eval, we), enumerable: !1, configurable: !0 },
                }),
                o = {
                  evalScope: t,
                  allowNextEvalToBeUnsafe() {
                    const { revoked: r } = o;
                    null !== r && Xo`a handler did not reset allowNextEvalToBeUnsafe ${r.err}`,
                      $(t, e);
                  },
                  revoked: null,
                };
              return o;
            })(),
            { evalScope: i } = a,
            s = O({ evalScope: i, moduleLexicals: e, globalObject: t, scopeTerminator: n });
          let c;
          return {
            safeEvaluate: (e, r) => {
              const { localTransforms: n = [] } = r || {};
              let l;
              c || (c = br(s)), (e = fr(e, [...n, ...o, ur]));
              try {
                return a.allowNextEvalToBeUnsafe(), nt(c, t, [e]);
              } catch (t) {
                throw ((l = t), t);
              } finally {
                const t = 'eval' in i;
                delete i.eval,
                  t &&
                    ((a.revoked = { err: l }),
                    Sr`handler did not reset allowNextEvalToBeUnsafe ${l}`);
              }
            },
          };
        };
      let wr;
      const vr = () => {
        if (void 0 === wr) {
          const t = new w();
          rt(vt, 'toString', {
            value: {
              toString() {
                const e = ye(this);
                return Xt(e, ') { [native code] }') || !fe(t, this)
                  ? e
                  : `function ${this.name}() { [native code] }`;
              },
            }.toString,
          }),
            (wr = O((e) => ue(t, e)));
        }
        return wr;
      };
      const Er = O([
          ['debug', 'debug'],
          ['log', 'log'],
          ['info', 'info'],
          ['warn', 'warn'],
          ['error', 'error'],
          ['trace', 'log'],
          ['dirxml', 'log'],
          ['group', 'log'],
          ['groupCollapsed', 'log'],
        ]),
        Ir = O([
          ['assert', 'error'],
          ['timeLog', 'log'],
          ['clear', void 0],
          ['count', 'info'],
          ['countReset', void 0],
          ['dir', 'log'],
          ['groupEnd', 'log'],
          ['table', 'log'],
          ['time', 'info'],
          ['timeEnd', 'info'],
          ['profile', void 0],
          ['profileEnd', void 0],
          ['timeStamp', void 0],
        ]),
        Tr = O([...Er, ...Ir]);
      O((t, { shouldResetForDebugging: e = !1 } = {}) => {
        e && t.resetErrorTagNum();
        let o = [];
        const r = V(
          Ft(Tr, ([t, e]) => {
            const r = (...e) => {
              Nt(o, [t, ...e]);
            };
            return rt(r, 'name', { value: t }), [t, O(r)];
          }),
        );
        O(r);
        const n = () => {
          const t = O(o);
          return (o = []), t;
        };
        O(n);
        return O({ loggingConsole: r, takeLog: n });
      });
      const Ar = { NOTE: 'ERROR_NOTE:', MESSAGE: 'ERROR_MESSAGE:' };
      O(Ar);
      const _r = (t, e) => {
        const {
            getStackString: o,
            tagError: r,
            takeMessageLogArgs: n,
            takeNoteLogArgsArray: a,
          } = e,
          i = (t, e) => Ft(t, (t) => (Pe(t) ? (Nt(e, t), `(${r(t)})`) : t)),
          s = (e, o, n, a, s) => {
            const c = r(o),
              l = n === Ar.MESSAGE ? `${c}:` : `${c} ${n}`,
              p = i(a, s);
            t[e](l, ...p);
          },
          c = (e, o, r) => {
            if (0 === o.length) return;
            if (1 === o.length && void 0 === r) return void p(e, o[0]);
            let n;
            (n = 1 === o.length ? 'Nested error' : `Nested ${o.length} errors`),
              void 0 !== r && (n = `${n} under ${r}`),
              t.group(n);
            try {
              for (const t of o) p(e, t);
            } finally {
              t.groupEnd();
            }
          },
          l = new w(),
          p = (e, i) => {
            if (fe(l, i)) return;
            const p = r(i);
            ue(l, i);
            const u = [],
              f = n(i),
              y = a(
                i,
                ((t) => (e, o) => {
                  const n = [];
                  s(t, e, Ar.NOTE, o, n), c(t, n, r(e));
                })(e),
              );
            void 0 === f ? t[e](`${p}:`, i.message) : s(e, i, Ar.MESSAGE, f, u);
            let d = o(i);
            'string' == typeof d && d.length >= 1 && !Xt(d, '\n') && (d += '\n'), t[e](d);
            for (const t of y) s(e, i, Ar.NOTE, t, u);
            c(e, u, p);
          },
          u = Ft(Er, ([e, o]) => {
            const r = (...o) => {
              const r = [],
                n = i(o, r);
              t[e](...n), c(e, r);
            };
            return rt(r, 'name', { value: e }), [e, O(r)];
          }),
          f = xt(Ir, ([e, o]) => e in t),
          y = Ft(f, ([e, o]) => {
            const r = (...o) => {
              t[e](...o);
            };
            return rt(r, 'name', { value: e }), [e, O(r)];
          }),
          d = V([...u, ...y]);
        return O(d);
      };
      O(_r);
      O((t, e, o) => {
        const r = xt(Tr, ([e, o]) => e in t),
          n = Ft(r, ([o, r]) => [
            o,
            O((...n) => {
              (void 0 === r || e.canLog(r)) && t[o](...n);
            }),
          ]),
          a = V(n);
        return O(a);
      });
      const xr = (t) => {
          if (void 0 === i) return;
          let e = 0;
          const o = new l();
          let r;
          const n = (t) => {
              Bt(o, t), r && 0 === o.size && (r(), (r = void 0));
            },
            a = new P(),
            s = new i((e) => {
              if (Gt(o, e)) {
                const r = jt(o, e);
                n(e), t(r);
              }
            });
          return {
            rejectionHandledHandler: (t) => {
              const e = ce(a, t);
              n(e);
            },
            unhandledRejectionHandler: (t, r) => {
              e += 1;
              const n = e;
              Dt(o, n, t), pe(a, r, n), he(s, r, n, r);
            },
            processTerminationHandler: () => {
              for (const [e, r] of Ht(o)) n(e), t(r);
            },
          };
        },
        $r = console,
        kr = [
          'getTypeName',
          'getFunctionName',
          'getMethodName',
          'getFileName',
          'getLineNumber',
          'getColumnNumber',
          'getEvalOrigin',
          'isToplevel',
          'isEval',
          'isNative',
          'isConstructor',
          'isAsync',
          'getPosition',
          'getScriptNameOrSourceURL',
          'toString',
        ],
        Or = (t) => {
          const e = V(
            Ft(kr, (e) => {
              const o = t[e];
              return [e, () => nt(o, t, [])];
            }),
          );
          return x(e, {});
        },
        Fr = [
          /\/node_modules\//,
          /^(?:node:)?internal\//,
          /\/packages\/ses\/src\/error\/assert.js$/,
          /\/packages\/eventual-send\/src\//,
        ],
        Cr = [/^((?:.*[( ])?)[:/\w_-]*\/\.\.\.\/(.+)$/, /^((?:.*[( ])?)[:/\w_-]*\/(packages\/.+)$/],
        Nr = (t, e, o, r) => {
          const n = t.captureStackTrace,
            a = (t) =>
              'verbose' === r ||
              ((t) => {
                if (!t) return !0;
                for (const e of Fr) if (Yt(e, t)) return !1;
                return !0;
              })(t.getFileName()),
            i = (t) => {
              let e = `${t}`;
              return (
                'concise' === r &&
                  (e = ((t) => {
                    for (const e of Cr) {
                      const o = Jt(e, t);
                      if (o) return Ot(Rt(o, 1), '');
                    }
                    return t;
                  })(e)),
                `\n  at ${e}`
              );
            },
            s = (t, e) => Ot(Ft(xt(e, a), i), ''),
            c = new P(),
            l = {
              captureStackTrace(e, o = l.captureStackTrace) {
                'function' != typeof n ? ft(e, 'stack', '') : nt(n, t, [e, o]);
              },
              getStackString(t) {
                let e = ce(c, t);
                if (
                  (void 0 === e &&
                    (t.stack, (e = ce(c, t)), e || ((e = { stackString: '' }), pe(c, t, e))),
                  void 0 !== e.stackString)
                )
                  return e.stackString;
                const o = s(0, e.callSites);
                return pe(c, t, { stackString: o }), o;
              },
              prepareStackTrace(t, e) {
                if ('unsafe' === o) {
                  const o = s(0, e);
                  return pe(c, t, { stackString: o }), `${t}${o}`;
                }
                return pe(c, t, { callSites: e }), '';
              },
            },
            p = l.prepareStackTrace;
          t.prepareStackTrace = p;
          const u = new w([p]),
            f = (t) => {
              if (fe(u, t)) return t;
              const e = {
                prepareStackTrace: (e, o) => (
                  pe(c, e, { callSites: o }), t(e, ((t) => Ft(t, Or))(o))
                ),
              };
              return ue(u, e.prepareStackTrace), e.prepareStackTrace;
            };
          return (
            $(e, {
              captureStackTrace: {
                value: l.captureStackTrace,
                writable: !0,
                enumerable: !1,
                configurable: !0,
              },
              prepareStackTrace: {
                get: () => t.prepareStackTrace,
                set(e) {
                  if ('function' == typeof e) {
                    const o = f(e);
                    t.prepareStackTrace = o;
                  } else t.prepareStackTrace = p;
                },
                enumerable: !1,
                configurable: !0,
              },
            }),
            l.getStackString
          );
        },
        Rr = F(v.prototype, 'stack'),
        Mr = Rr && Rr.get,
        Lr = {
          getStackString: (t) =>
            'function' == typeof Mr ? nt(Mr, t, []) : 'stack' in t ? `${t.stack}` : '',
        };
      const { Fail: Ur, details: Dr, quote: jr } = io,
        Gr = () => {},
        Br = (t, e, o, r, n, a, i, s, c) => {
          const { resolveHook: l, moduleRecords: p } = ce(t, o),
            u = ((t, e, o) => {
              const r = x(null);
              for (const n of t) {
                const t = e(n, o);
                r[n] = t;
              }
              return O(r);
            })(n.imports, l, r),
            f = O({
              compartment: o,
              staticModuleRecord: n,
              moduleSpecifier: r,
              resolvedImports: u,
              importMeta: c,
            });
          for (const r of z(u)) {
            const n = Hr(t, e, o, r, a, i, s);
            zt(
              a,
              me(n, Gr, (t) => {
                Nt(s, t);
              }),
            );
          }
          return Dt(p, r, f), f;
        },
        Hr = async (t, e, o, r, n, a, i) => {
          const { name: s } = ce(t, o);
          let c = jt(a, o);
          void 0 === c && ((c = new l()), Dt(a, o, c));
          let p = jt(c, r);
          return (
            void 0 !== p ||
              ((p = ge(
                (async (t, e, o, r, n, a, i) => {
                  const {
                    importHook: s,
                    moduleMap: c,
                    moduleMapHook: l,
                    moduleRecords: p,
                  } = ce(t, o);
                  let u = c[r];
                  if ((void 0 === u && void 0 !== l && (u = l(r)), 'string' == typeof u))
                    io.fail(
                      Dr`Cannot map module ${jr(r)} to ${jr(u)} in parent compartment, not yet implemented`,
                      A,
                    );
                  else if (void 0 !== u) {
                    const o = ce(e, u);
                    void 0 === o &&
                      io.fail(
                        Dr`Cannot map module ${jr(r)} because the value is not a module exports namespace, or is from another realm`,
                        I,
                      );
                    const s = await Hr(t, e, o.compartment, o.specifier, n, a, i);
                    return Dt(p, r, s), s;
                  }
                  if (Gt(p, r)) return jt(p, r);
                  const f = await s(r);
                  if (
                    ((null !== f && 'object' == typeof f) ||
                      Ur`importHook must return a promise for an object, for module ${jr(r)} in compartment ${jr(o.name)}`,
                    void 0 !== f.specifier)
                  ) {
                    if (void 0 !== f.record) {
                      if (void 0 !== f.compartment)
                        throw A(
                          'Cannot redirect to an explicit record with a specified compartment',
                        );
                      const { compartment: s = o, specifier: c = r, record: l, importMeta: u } = f,
                        y = Br(t, e, s, c, l, n, a, i, u);
                      return Dt(p, r, y), y;
                    }
                    if (void 0 !== f.compartment) {
                      if (void 0 !== f.importMeta)
                        throw A(
                          'Cannot redirect to an implicit record with a specified importMeta',
                        );
                      const o = await Hr(t, e, f.compartment, f.specifier, n, a, i);
                      return Dt(p, r, o), o;
                    }
                    throw A('Unnexpected RedirectStaticModuleInterface record shape');
                  }
                  return Br(t, e, o, r, f, n, a, i);
                })(t, e, o, r, n, a, i),
                (t) => {
                  throw (io.note(t, Dr`${t.message}, loading ${jr(r)} in compartment ${jr(s)}`), t);
                },
              )),
              Dt(c, r, p)),
            p
          );
        },
        Wr = async (t, e, o, r) => {
          const { name: n } = ce(t, o),
            a = new h(),
            i = new l(),
            s = [],
            c = Hr(t, e, o, r, a, i, s);
          zt(
            a,
            me(c, Gr, (t) => {
              Nt(s, t);
            }),
          );
          for (const t of a) await t;
          if (s.length > 0)
            throw A(
              `Failed to load module ${jr(r)} in package ${jr(n)} (${s.length} underlying failures: ${Ot(
                Ft(s, (t) => t.message),
                ', ',
              )}`,
            );
        },
        { quote: zr } = io,
        Vr = (t, e, o, r) => {
          const { deferredExports: n } = e;
          if (!Gt(n, r)) {
            const e = (() => {
              let t = !1;
              const e = x(null);
              return O({
                activate() {
                  t = !0;
                },
                proxiedExports: e,
                exportsProxy: new d(e, {
                  get(o, r, n) {
                    if (!t)
                      throw A(
                        `Cannot get property ${zr(r)} of module exports namespace, the module has not yet begun to execute`,
                      );
                    return it(e, r, n);
                  },
                  set(t, e, o) {
                    throw A(`Cannot set property ${zr(e)} of module exports namespace`);
                  },
                  has(o, r) {
                    if (!t)
                      throw A(
                        `Cannot check property ${zr(r)}, the module has not yet begun to execute`,
                      );
                    return ct(e, r);
                  },
                  deleteProperty(t, e) {
                    throw A(`Cannot delete property ${zr(e)}s of module exports namespace`);
                  },
                  ownKeys(o) {
                    if (!t)
                      throw A('Cannot enumerate keys, the module has not yet begun to execute');
                    return pt(e);
                  },
                  getOwnPropertyDescriptor(o, r) {
                    if (!t)
                      throw A(
                        `Cannot get own property descriptor ${zr(r)}, the module has not yet begun to execute`,
                      );
                    return st(e, r);
                  },
                  preventExtensions(o) {
                    if (!t)
                      throw A(
                        'Cannot prevent extensions of module exports namespace, the module has not yet begun to execute',
                      );
                    return ut(e);
                  },
                  isExtensible() {
                    if (!t)
                      throw A(
                        'Cannot check extensibility of module exports namespace, the module has not yet begun to execute',
                      );
                    return lt(e);
                  },
                  getPrototypeOf: (t) => null,
                  setPrototypeOf(t, e) {
                    throw A('Cannot set prototype of module exports namespace');
                  },
                  defineProperty(t, e, o) {
                    throw A(`Cannot define property ${zr(e)} of module exports namespace`);
                  },
                  apply(t, e, o) {
                    throw A('Cannot call module exports namespace, it is not a function');
                  },
                  construct(t, e) {
                    throw A('Cannot construct module exports namespace, it is not a constructor');
                  },
                }),
              });
            })();
            pe(o, e.exportsProxy, ((t, e) => O({ compartment: t, specifier: e }))(t, r)),
              Dt(n, r, e);
          }
          return jt(n, r);
        },
        Kr = (t, e, o) => {
          if ('string' != typeof e) throw A('first argument of evaluate() must be a string');
          const {
              transforms: r = [],
              __evadeHtmlCommentTest__: n = !1,
              __evadeImportExpressionTest__: a = !1,
              __rejectSomeDirectEvalExpressions__: i = !0,
            } = o,
            s = [...r];
          !0 === n && Nt(s, ar), !0 === a && Nt(s, cr), !0 === i && Nt(s, pr);
          const { safeEvaluate: c } = ((t, e) => {
            const { sloppyGlobalsMode: o = !1, __moduleShimLexicals__: r } = e;
            let n;
            if (void 0 !== r || o) {
              let { globalTransforms: e } = t;
              const { globalObject: a } = t;
              let i;
              void 0 !== r && ((e = void 0), (i = x(null, C(r)))),
                ({ safeEvaluate: n } = Pr({
                  globalObject: a,
                  moduleLexicals: i,
                  globalTransforms: e,
                  sloppyGlobalsMode: o,
                }));
            } else ({ safeEvaluate: n } = t);
            return { safeEvaluate: n };
          })(t, o);
          return c(e, { localTransforms: s });
        },
        { quote: qr } = io,
        { Fail: Yr, quote: Jr } = io,
        Zr = (t, e, o, r) => {
          const { name: n, moduleRecords: a } = ce(t, o),
            i = jt(a, r);
          if (void 0 === i) throw I(`Missing link to module ${Jr(r)} from compartment ${Jr(n)}`);
          return Xr(t, e, i);
        };
      const Xr = (t, e, o) => {
          const {
              compartment: r,
              moduleSpecifier: n,
              resolvedImports: a,
              staticModuleRecord: i,
            } = o,
            { instances: s } = ce(t, r);
          if (Gt(s, n)) return jt(s, n);
          !(function (t, e) {
            Se(t) ||
              Yr`Static module records must be of type object, got ${Jr(t)}, for module ${Jr(e)}`;
            const { imports: o, exports: r, reexports: n = [] } = t;
            yt(o) ||
              Yr`Property 'imports' of a static module record must be an array, got ${Jr(o)}, for module ${Jr(e)}`,
              yt(r) ||
                Yr`Property 'exports' of a precompiled module record must be an array, got ${Jr(r)}, for module ${Jr(e)}`,
              yt(n) ||
                Yr`Property 'reexports' of a precompiled module record must be an array if present, got ${Jr(n)}, for module ${Jr(e)}`;
          })(i, n);
          const c = new l();
          let p;
          if (
            (function (t) {
              return 'string' == typeof t.__syncModuleProgram__;
            })(i)
          )
            !(function (t, e) {
              const { __fixedExportMap__: o, __liveExportMap__: r } = t;
              Se(o) ||
                Yr`Property '__fixedExportMap__' of a precompiled module record must be an object, got ${Jr(o)}, for module ${Jr(e)}`,
                Se(r) ||
                  Yr`Property '__liveExportMap__' of a precompiled module record must be an object, got ${Jr(r)}, for module ${Jr(e)}`;
            })(i, n),
              (p = ((t, e, o, r) => {
                const {
                    compartment: n,
                    moduleSpecifier: a,
                    staticModuleRecord: i,
                    importMeta: s,
                  } = o,
                  {
                    reexports: c = [],
                    __syncModuleProgram__: l,
                    __fixedExportMap__: p = {},
                    __liveExportMap__: u = {},
                    __reexportMap__: f = {},
                    __needsImportMeta__: y = !1,
                    __syncModuleFunctor__: d,
                  } = i,
                  g = ce(t, n),
                  { __shimTransforms__: m, importMetaHook: h } = g,
                  { exportsProxy: b, proxiedExports: S, activate: P } = Vr(n, g, e, a),
                  w = x(null),
                  v = x(null),
                  E = x(null),
                  $ = x(null),
                  F = x(null);
                s && _(F, s), y && h && h(a, F);
                const C = x(null),
                  N = x(null);
                function R(t) {
                  const e = x(null);
                  e.default = !1;
                  for (const [o, n] of t) {
                    const t = jt(r, o);
                    t.execute();
                    const { notifiers: a } = t;
                    for (const [t, e] of n) {
                      const r = a[t];
                      if (!r)
                        throw T(
                          `The requested module '${o}' does not provide an export named '${t}'`,
                        );
                      for (const t of e) r(t);
                    }
                    if (kt(c, o))
                      for (const [t, o] of k(a)) void 0 === e[t] ? (e[t] = o) : (e[t] = !1);
                    if (f[o]) for (const [t, r] of f[o]) e[r] = a[t];
                  }
                  for (const [t, o] of k(e))
                    if (!N[t] && !1 !== o) {
                      let e;
                      (N[t] = o),
                        o((t) => (e = t)),
                        (w[t] = { get: () => e, set: void 0, enumerable: !0, configurable: !1 });
                    }
                  $t(Lt(j(w)), (t) => rt(S, t, w[t])), O(S), P();
                }
                let M;
                $t(k(p), ([t, [e]]) => {
                  let o = C[e];
                  if (!o) {
                    let t,
                      r = !0,
                      n = [];
                    const a = () => {
                        if (r) throw I(`binding ${qr(e)} not yet initialized`);
                        return t;
                      },
                      i = O((o) => {
                        if (!r) throw A(`Internal: binding ${qr(e)} already initialized`);
                        t = o;
                        const a = n;
                        (n = null), (r = !1);
                        for (const t of a || []) t(o);
                        return o;
                      });
                    (o = {
                      get: a,
                      notify: (e) => {
                        e !== i && (r ? Nt(n || [], e) : e(t));
                      },
                    }),
                      (C[e] = o),
                      (E[e] = i);
                  }
                  (w[t] = { get: o.get, set: void 0, enumerable: !0, configurable: !1 }),
                    (N[t] = o.notify);
                }),
                  $t(k(u), ([t, [e, o]]) => {
                    let r = C[e];
                    if (!r) {
                      let n,
                        a = !0;
                      const i = [],
                        s = () => {
                          if (a) throw I(`binding ${qr(t)} not yet initialized`);
                          return n;
                        },
                        c = O((t) => {
                          (n = t), (a = !1);
                          for (const e of i) e(t);
                        }),
                        l = (t) => {
                          if (a) throw I(`binding ${qr(e)} not yet initialized`);
                          n = t;
                          for (const e of i) e(t);
                        };
                      (r = {
                        get: s,
                        notify: (t) => {
                          t !== c && (Nt(i, t), a || t(n));
                        },
                      }),
                        (C[e] = r),
                        o && rt(v, e, { get: s, set: l, enumerable: !0, configurable: !1 }),
                        ($[e] = c);
                    }
                    (w[t] = { get: r.get, set: void 0, enumerable: !0, configurable: !1 }),
                      (N[t] = r.notify);
                  }),
                  (N['*'] = (t) => {
                    t(S);
                  }),
                  (M =
                    void 0 !== d
                      ? d
                      : Kr(g, l, {
                          globalObject: n.globalThis,
                          transforms: m,
                          __moduleShimLexicals__: v,
                        }));
                let L,
                  U = !1;
                return O({
                  notifiers: N,
                  exportsProxy: b,
                  execute: function () {
                    if (M) {
                      const t = M;
                      M = null;
                      try {
                        t(O({ imports: O(R), onceVar: O(E), liveVar: O($), importMeta: F }));
                      } catch (t) {
                        (U = !0), (L = t);
                      }
                    }
                    if (U) throw L;
                  },
                });
              })(t, e, o, c));
          else {
            if (
              !(function (t) {
                return 'function' == typeof t.execute;
              })(i)
            )
              throw A(`importHook must return a static module record, got ${Jr(i)}`);
            !(function (t, e) {
              const { exports: o } = t;
              yt(o) ||
                Yr`Property 'exports' of a third-party static module record must be an array, got ${Jr(o)}, for module ${Jr(e)}`;
            })(i, n),
              (p = ((t, e, o, r, n, a) => {
                const { exportsProxy: i, proxiedExports: s, activate: c } = Vr(o, ce(t, o), r, n),
                  l = x(null);
                if (e.exports) {
                  if (!yt(e.exports) || Mt(e.exports, (t) => 'string' != typeof t))
                    throw A(
                      `SES third-party static module record "exports" property must be an array of strings for module ${n}`,
                    );
                  $t(e.exports, (t) => {
                    let e = s[t];
                    const o = [];
                    rt(s, t, {
                      get: () => e,
                      set: (t) => {
                        e = t;
                        for (const e of o) e(t);
                      },
                      enumerable: !0,
                      configurable: !1,
                    }),
                      (l[t] = (t) => {
                        Nt(o, t), t(e);
                      });
                  }),
                    (l['*'] = (t) => {
                      t(s);
                    });
                }
                const p = { activated: !1 };
                return O({
                  notifiers: l,
                  exportsProxy: i,
                  execute() {
                    if (ct(p, 'errorFromExecute')) throw p.errorFromExecute;
                    if (!p.activated) {
                      c(), (p.activated = !0);
                      try {
                        e.execute(s, o, a);
                      } catch (t) {
                        throw ((p.errorFromExecute = t), t);
                      }
                    }
                  },
                });
              })(t, i, r, e, n, a));
          }
          Dt(s, n, p);
          for (const [o, n] of k(a)) {
            const a = Zr(t, e, r, n);
            Dt(c, o, a);
          }
          return p;
        },
        { quote: Qr } = io,
        tn = new P(),
        en = new P(),
        on = (t) => {
          const { importHook: e, resolveHook: o } = ce(en, t);
          if ('function' != typeof e || 'function' != typeof o)
            throw A(
              'Compartment must be constructed with an importHook and a resolveHook for it to be able to load modules',
            );
        },
        rn = function (t = {}, e = {}, o = {}) {
          throw A('Compartment.prototype.constructor is not a valid constructor.');
        },
        nn = (t, e) => {
          const { execute: o, exportsProxy: r } = Zr(en, tn, t, e);
          return o(), r;
        },
        an = {
          constructor: rn,
          get globalThis() {
            return ce(en, this).globalObject;
          },
          get name() {
            return ce(en, this).name;
          },
          evaluate(t, e = {}) {
            const o = ce(en, this);
            return Kr(o, t, e);
          },
          toString: () => '[object Compartment]',
          module(t) {
            if ('string' != typeof t) throw A('first argument of module() must be a string');
            on(this);
            const { exportsProxy: e } = Vr(this, ce(en, this), tn, t);
            return e;
          },
          async import(t) {
            if ('string' != typeof t) throw A('first argument of import() must be a string');
            return on(this), me(Wr(en, tn, this, t), () => ({ namespace: nn(this, t) }));
          },
          async load(t) {
            if ('string' != typeof t) throw A('first argument of load() must be a string');
            return on(this), Wr(en, tn, this, t);
          },
          importNow(t) {
            if ('string' != typeof t) throw A('first argument of importNow() must be a string');
            return on(this), nn(this, t);
          },
        };
      $(rn, { prototype: { value: an } });
      const sn = (t, e, o) => {
        function r(r = {}, n = {}, a = {}) {
          if (void 0 === new.target)
            throw A("Class constructor Compartment cannot be invoked without 'new'");
          const {
              name: i = '<unknown>',
              transforms: s = [],
              __shimTransforms__: c = [],
              resolveHook: p,
              importHook: u,
              moduleMapHook: f,
              importMetaHook: y,
            } = a,
            d = [...s, ...c],
            g = new l(),
            m = new l(),
            h = new l();
          for (const [t, e] of k(n || {})) {
            if ('string' == typeof e)
              throw A(`Cannot map module ${Qr(t)} to ${Qr(e)} in parent compartment`);
            if (void 0 === ce(tn, e))
              throw I(
                `Cannot map module ${Qr(t)} because it has no known compartment in this realm`,
              );
          }
          const b = {};
          ((t) => {
            rt(
              t,
              Z,
              O(
                _(x(null), {
                  set: O(() => {
                    throw A("Cannot set Symbol.unscopables of a Compartment's globalThis");
                  }),
                  enumerable: !1,
                  configurable: !1,
                }),
              ),
            );
          })(b),
            Ho(b);
          const { safeEvaluate: S } = Pr({
            globalObject: b,
            globalTransforms: d,
            sloppyGlobalsMode: !1,
          });
          Wo(b, {
            intrinsics: e,
            newGlobalPropertyNames: yo,
            makeCompartmentConstructor: t,
            markVirtualizedNativeFunction: o,
          }),
            zo(b, S, o),
            _(b, r),
            pe(en, this, {
              name: `${i}`,
              globalTransforms: d,
              globalObject: b,
              safeEvaluate: S,
              resolveHook: p,
              importHook: u,
              moduleMap: n,
              moduleMapHook: f,
              importMetaHook: y,
              moduleRecords: g,
              __shimTransforms__: c,
              deferredExports: h,
              instances: m,
            });
        }
        return (r.prototype = an), r;
      };
      function cn(t) {
        return R(t).constructor;
      }
      const ln = (t, e) => {
        if ('safe' !== e && 'unsafe' !== e) throw A(`unrecognized fakeHardenOption ${e}`);
        if ('safe' === e) return t;
        if (
          ((Object.isExtensible = () => !1),
          (Object.isFrozen = () => !0),
          (Object.isSealed = () => !0),
          (Reflect.isExtensible = () => !1),
          t.isFake)
        )
          return t;
        const o = (t) => t;
        return (o.isFake = !0), O(o);
      };
      O(ln);
      const { Fail: pn, details: un, quote: fn } = io;
      let yn, dn;
      const gn = (() => {
          if ('function' == typeof r.harden) {
            return r.harden;
          }
          const t = new w(),
            { harden: e } = {
              harden(e) {
                const o = new h(),
                  r = new P();
                function n(e, n) {
                  if (!Se(e)) return;
                  const a = typeof e;
                  if ('object' !== a && 'function' !== a) throw A(`Unexpected typeof: ${a}`);
                  fe(t, e) || Kt(o, e) || (zt(o, e), pe(r, e, n));
                }
                function a(t) {
                  void 0 !== nt(co, t, []) ? lo(t) : O(t);
                  const e = ce(r, t) || 'unknown',
                    o = C(t);
                  n(R(t), `${e}.__proto__`),
                    $t(pt(o), (t) => {
                      const r = `${e}.${b(t)}`,
                        a = o[t];
                      _t(a, 'value')
                        ? n(a.value, `${r}`)
                        : (n(a.get, `${r}(get)`), n(a.set, `${r}(set)`));
                    });
                }
                function i(e) {
                  ue(t, e);
                }
                return n(e), Vt(o, a), Vt(o, i), e;
              },
            };
          return e;
        })(),
        mn = (t = {}) => {
          const { getEnvironmentOption: e } = $e(r),
            {
              errorTaming: o = e('LOCKDOWN_ERROR_TAMING', 'safe'),
              errorTrapping: n = e('LOCKDOWN_ERROR_TRAPPING', 'platform'),
              unhandledRejectionTrapping: i = e('LOCKDOWN_UNHANDLED_REJECTION_TRAPPING', 'report'),
              regExpTaming: c = e('LOCKDOWN_REGEXP_TAMING', 'safe'),
              localeTaming: f = e('LOCKDOWN_LOCALE_TAMING', 'safe'),
              consoleTaming: y = e('LOCKDOWN_CONSOLE_TAMING', 'safe'),
              overrideTaming: d = e('LOCKDOWN_OVERRIDE_TAMING', 'moderate'),
              stackFiltering: g = e('LOCKDOWN_STACK_FILTERING', 'concise'),
              domainTaming: P = e('LOCKDOWN_DOMAIN_TAMING', 'safe'),
              evalTaming: w = e('LOCKDOWN_EVAL_TAMING', 'safeEval'),
              overrideDebug: E = xt(ne(e('LOCKDOWN_OVERRIDE_DEBUG', ''), ','), (t) => '' !== t),
              __hardenTaming__: I = e('LOCKDOWN_HARDEN_TAMING', 'safe'),
              dateTaming: _ = 'safe',
              mathTaming: L = 'safe',
              ...U
            } = t;
          'unsafeEval' === w ||
            'safeEval' === w ||
            'noEval' === w ||
            pn`lockdown(): non supported option evalTaming: ${fn(w)}`;
          const D = pt(U);
          0 === D.length || pn`lockdown(): non supported option ${fn(D)}`,
            void 0 === yn || io.fail(un`Already locked down at ${yn} (SES_ALREADY_LOCKED_DOWN)`, A),
            (yn = A('Prior lockdown (SES_ALREADY_LOCKED_DOWN)')),
            yn.stack,
            (() => {
              let t = !1;
              try {
                (t = ve(
                  'eval',
                  'SES_changed',
                  '        eval("SES_changed = true");\n        return SES_changed;\n      ',
                )(we, !1)),
                  t || delete r.SES_changed;
              } catch (e) {
                t = !0;
              }
              if (!t)
                throw A(
                  "SES cannot initialize unless 'eval' is the original intrinsic 'eval', suitable for direct-eval (dynamically scoped eval) (SES_DIRECT_EVAL)",
                );
            })();
          if (
            r.Function.prototype.constructor !== r.Function &&
            'function' == typeof r.harden &&
            'function' == typeof r.lockdown &&
            r.Date.prototype.constructor !== r.Date &&
            'function' == typeof r.Date.now &&
            M(r.Date.prototype.constructor.now(), NaN)
          )
            throw A('Already locked down but not by this SES instance (SES_MULTIPLE_INSTANCES)');
          !(function (t = 'safe') {
            if ('safe' !== t && 'unsafe' !== t) throw A(`unrecognized domainTaming ${t}`);
            if ('unsafe' !== t && 'object' == typeof r.process && null !== r.process) {
              const t = F(r.process, 'domain');
              if (void 0 !== t && void 0 !== t.get)
                throw A(
                  'SES failed to lockdown, Node.js domains have been initialized (SES_NO_DOMAINS)',
                );
              rt(r.process, 'domain', {
                value: null,
                configurable: !1,
                writable: !1,
                enumerable: !1,
              });
            }
          })(P);
          const j = vr(),
            { addIntrinsics: B, completePrototypes: H, finalIntrinsics: z } = Oo(),
            q = ln(gn, I);
          B({ harden: q }),
            B(
              (function () {
                try {
                  ve.prototype.constructor('return 1');
                } catch (t) {
                  return O({});
                }
                const t = {};
                function e(e, o, r) {
                  let n;
                  try {
                    n = (0, eval)(r);
                  } catch (t) {
                    if (t instanceof T) return;
                    throw t;
                  }
                  const a = R(n),
                    i = function () {
                      throw A('Function.prototype.constructor is not a valid constructor.');
                    };
                  $(i, {
                    prototype: { value: a },
                    name: { value: e, writable: !1, enumerable: !1, configurable: !0 },
                  }),
                    $(a, { constructor: { value: i } }),
                    i !== ve.prototype.constructor && W(i, ve.prototype.constructor),
                    (t[o] = i);
                }
                return (
                  e('Function', '%InertFunction%', '(function(){})'),
                  e('GeneratorFunction', '%InertGeneratorFunction%', '(function*(){})'),
                  e('AsyncFunction', '%InertAsyncFunction%', '(async function(){})'),
                  e(
                    'AsyncGeneratorFunction',
                    '%InertAsyncGeneratorFunction%',
                    '(async function*(){})',
                  ),
                  t
                );
              })(),
            ),
            B(
              (function (t = 'safe') {
                if ('safe' !== t && 'unsafe' !== t) throw A(`unrecognized dateTaming ${t}`);
                const e = a,
                  o = e.prototype,
                  r = {
                    now() {
                      throw A('secure mode Calling %SharedDate%.now() throws');
                    },
                  },
                  n = ({ powers: t = 'none' } = {}) => {
                    let r;
                    return (
                      (r =
                        'original' === t
                          ? function (...t) {
                              return void 0 === new.target
                                ? nt(e, void 0, t)
                                : at(e, t, new.target);
                            }
                          : function (...t) {
                              if (void 0 === new.target)
                                throw A(
                                  'secure mode Calling %SharedDate% constructor as a function throws',
                                );
                              if (0 === t.length)
                                throw A(
                                  'secure mode Calling new %SharedDate%() with no arguments throws',
                                );
                              return at(e, t, new.target);
                            }),
                      $(r, {
                        length: { value: 7 },
                        prototype: { value: o, writable: !1, enumerable: !1, configurable: !1 },
                        parse: { value: e.parse, writable: !0, enumerable: !1, configurable: !0 },
                        UTC: { value: e.UTC, writable: !0, enumerable: !1, configurable: !0 },
                      }),
                      r
                    );
                  },
                  i = n({ powers: 'original' }),
                  s = n({ powers: 'none' });
                return (
                  $(i, { now: { value: e.now, writable: !0, enumerable: !1, configurable: !0 } }),
                  $(s, { now: { value: r.now, writable: !0, enumerable: !1, configurable: !0 } }),
                  $(o, { constructor: { value: s } }),
                  { '%InitialDate%': i, '%SharedDate%': s }
                );
              })(_),
            ),
            B(
              (function (t = 'safe', e = 'concise') {
                if ('safe' !== t && 'unsafe' !== t) throw A(`unrecognized errorTaming ${t}`);
                if ('concise' !== e && 'verbose' !== e) throw A(`unrecognized stackFiltering ${e}`);
                const o = v.prototype,
                  r = 'function' == typeof v.captureStackTrace ? 'v8' : 'unknown',
                  { captureStackTrace: n } = v,
                  a = (t = {}) => {
                    const e = function (...t) {
                      let o;
                      return (
                        (o = void 0 === new.target ? nt(v, this, t) : at(v, t, new.target)),
                        'v8' === r && nt(n, v, [o, e]),
                        o
                      );
                    };
                    return (
                      $(e, {
                        length: { value: 1 },
                        prototype: { value: o, writable: !1, enumerable: !1, configurable: !1 },
                      }),
                      e
                    );
                  },
                  i = a({ powers: 'original' }),
                  s = a({ powers: 'none' });
                $(o, { constructor: { value: s } });
                for (const t of go) W(t, s);
                $(i, {
                  stackTraceLimit: {
                    get() {
                      if ('number' == typeof v.stackTraceLimit) return v.stackTraceLimit;
                    },
                    set(t) {
                      'number' == typeof t &&
                        ('number' != typeof v.stackTraceLimit || (v.stackTraceLimit = t));
                    },
                    enumerable: !1,
                    configurable: !0,
                  },
                }),
                  $(s, {
                    stackTraceLimit: { get() {}, set(t) {}, enumerable: !1, configurable: !0 },
                  }),
                  'v8' === r &&
                    $(s, {
                      prepareStackTrace: {
                        get: () => () => '',
                        set(t) {},
                        enumerable: !1,
                        configurable: !0,
                      },
                      captureStackTrace: {
                        value: (t, e) => {
                          rt(t, 'stack', { value: '' });
                        },
                        writable: !1,
                        enumerable: !1,
                        configurable: !0,
                      },
                    });
                let c = Lr.getStackString;
                return (
                  'v8' === r
                    ? (c = Nr(v, i, t, e))
                    : $(
                        o,
                        'unsafe' === t
                          ? {
                              stack: {
                                get() {
                                  return c(this);
                                },
                                set(t) {
                                  $(this, {
                                    stack: {
                                      value: t,
                                      writable: !0,
                                      enumerable: !0,
                                      configurable: !0,
                                    },
                                  });
                                },
                              },
                            }
                          : {
                              stack: {
                                get() {
                                  return `${this}`;
                                },
                                set(t) {
                                  $(this, {
                                    stack: {
                                      value: t,
                                      writable: !0,
                                      enumerable: !0,
                                      configurable: !0,
                                    },
                                  });
                                },
                              },
                            },
                      ),
                  { '%InitialGetStackString%': c, '%InitialError%': i, '%SharedError%': s }
                );
              })(o, g),
            ),
            B(
              (function (t = 'safe') {
                if ('safe' !== t && 'unsafe' !== t) throw A(`unrecognized mathTaming ${t}`);
                const e = p,
                  o = e,
                  { random: r, ...n } = C(e);
                return {
                  '%InitialMath%': o,
                  '%SharedMath%': x(G, {
                    ...n,
                    random: {
                      value: {
                        random() {
                          throw A('secure mode %SharedMath%.random() throws');
                        },
                      }.random,
                      writable: !0,
                      enumerable: !1,
                      configurable: !0,
                    },
                  }),
                };
              })(L),
            ),
            B(
              (function (t = 'safe') {
                if ('safe' !== t && 'unsafe' !== t) throw A(`unrecognized regExpTaming ${t}`);
                const e = m.prototype,
                  o = (t = {}) => {
                    const o = function (...t) {
                        return void 0 === new.target ? m(...t) : at(m, t, new.target);
                      },
                      r = F(m, K);
                    if (!r) throw A('no RegExp[Symbol.species] descriptor');
                    return (
                      $(o, {
                        length: { value: 2 },
                        prototype: { value: e, writable: !1, enumerable: !1, configurable: !1 },
                        [K]: r,
                      }),
                      o
                    );
                  },
                  r = o(),
                  n = o();
                return (
                  'unsafe' !== t && delete e.compile,
                  $(e, { constructor: { value: n } }),
                  { '%InitialRegExp%': r, '%SharedRegExp%': n }
                );
              })(c),
            ),
            B(
              (() => {
                const t = S,
                  e = t.prototype,
                  o = (e) => t(e);
                $(e, { constructor: { value: o } });
                const r = k(C(t)),
                  n = V(Ft(r, ([t, e]) => [t, { ...e, configurable: !0 }]));
                return $(o, n), { '%SharedSymbol%': o };
              })(),
            ),
            B(
              (() => {
                const t = ve.prototype.constructor,
                  e = F(
                    (function () {
                      return arguments;
                    })(),
                    'callee',
                  ),
                  o = e && e.get,
                  n = ie(new b()),
                  a = R(n),
                  i = ht[J] && Zt(/./),
                  c = i && R(i),
                  p = Ut([]),
                  u = R(p),
                  f = R(s),
                  y = Wt(new l()),
                  d = R(y),
                  g = qt(new h()),
                  m = R(g),
                  S = R(u),
                  P = cn(function* () {}),
                  w = P.prototype,
                  v = cn(async function* () {}),
                  E = v.prototype,
                  I = E.prototype,
                  T = R(I),
                  A = {
                    '%InertFunction%': t,
                    '%ArrayIteratorPrototype%': u,
                    '%InertAsyncFunction%': cn(async function () {}),
                    '%AsyncGenerator%': E,
                    '%InertAsyncGeneratorFunction%': v,
                    '%AsyncGeneratorPrototype%': I,
                    '%AsyncIteratorPrototype%': T,
                    '%Generator%': w,
                    '%InertGeneratorFunction%': P,
                    '%IteratorPrototype%': S,
                    '%MapIteratorPrototype%': d,
                    '%RegExpStringIteratorPrototype%': c,
                    '%SetIteratorPrototype%': m,
                    '%StringIteratorPrototype%': a,
                    '%ThrowTypeError%': o,
                    '%TypedArray%': f,
                    '%InertCompartment%': rn,
                  };
                return (
                  r.Iterator &&
                    ((A['%IteratorHelperPrototype%'] = R(r.Iterator.from([]).take(0))),
                    (A['%WrapForValidIteratorPrototype%'] = R(r.Iterator.from({ next() {} })))),
                  r.AsyncIterator &&
                    ((A['%AsyncIteratorHelperPrototype%'] = R(r.AsyncIterator.from([]).take(0))),
                    (A['%WrapForValidAsyncIteratorPrototype%'] = R(
                      r.AsyncIterator.from({ next() {} }),
                    ))),
                  A
                );
              })(),
            ),
            H();
          const Y = z();
          let Z;
          'unsafe' !== o && (Z = Y['%InitialGetStackString%']);
          const X = ((t = 'safe', e = 'platform', o = 'report', n) => {
            if ('safe' !== t && 'unsafe' !== t) throw A(`unrecognized consoleTaming ${t}`);
            let a;
            a = void 0 === n ? no : { ...no, getStackString: n };
            const i = 'unsafe' === t ? $r : _r($r, a);
            if (
              ('none' !== e &&
                void 0 !== r.process &&
                r.process.on('uncaughtException', (t) => {
                  i.error(t),
                    'platform' === e || 'exit' === e
                      ? r.process.exit(r.process.exitCode || -1)
                      : 'abort' === e && r.process.abort();
                }),
              'none' !== o && void 0 !== r.process)
            ) {
              const t = xr((t) => {
                i.error('SES_UNHANDLED_REJECTION:', t);
              });
              t &&
                (r.process.on('unhandledRejection', t.unhandledRejectionHandler),
                r.process.on('rejectionHandled', t.rejectionHandledHandler),
                r.process.on('exit', t.processTerminationHandler));
            }
            if (
              ('none' !== e &&
                void 0 !== r.window &&
                void 0 !== r.window.addEventListener &&
                r.window.addEventListener('error', (t) => {
                  t.preventDefault(),
                    i.error(t.error),
                    ('exit' !== e && 'abort' !== e) || (r.window.location.href = 'about:blank');
                }),
              'none' !== o && void 0 !== r.window && void 0 !== r.window.addEventListener)
            ) {
              const t = xr((t) => {
                i.error('SES_UNHANDLED_REJECTION:', t);
              });
              t &&
                (r.window.addEventListener('unhandledrejection', (e) => {
                  e.preventDefault(), t.unhandledRejectionHandler(e.reason, e.promise);
                }),
                r.window.addEventListener('rejectionhandled', (e) => {
                  e.preventDefault(), t.rejectionHandledHandler(e.promise);
                }),
                r.window.addEventListener('beforeunload', (e) => {
                  t.processTerminationHandler();
                }));
            }
            return { console: i };
          })(y, n, i, Z);
          if (
            ((r.console = X.console),
            'unsafe' === o && r.assert === io && (r.assert = ao(void 0, !0)),
            (function (t, e = 'safe') {
              if ('safe' !== e && 'unsafe' !== e) throw A(`unrecognized localeTaming ${e}`);
              if ('unsafe' !== e) {
                rt(b.prototype, 'localeCompare', { value: jo });
                for (const e of N(t)) {
                  const o = t[e];
                  if (Se(o))
                    for (const t of N(o)) {
                      const e = Jt(Uo, t);
                      if (e) {
                        'function' == typeof o[t] || Mo`expected ${Lo(t)} to be a function`;
                        const r = `${e[1]}${e[2]}`,
                          n = o[r];
                        'function' == typeof n || Mo`function ${Lo(r)} not found`,
                          rt(o, t, { value: n });
                      }
                    }
                }
                rt(u.prototype, 'toLocaleString', { value: Go });
              }
            })(Y, f),
            Fo(Y, j),
            Ho(r),
            Wo(r, {
              intrinsics: Y,
              newGlobalPropertyNames: fo,
              makeCompartmentConstructor: sn,
              markVirtualizedNativeFunction: j,
            }),
            'noEval' === w)
          )
            zo(r, Ee, j);
          else if ('safeEval' === w) {
            const { safeEvaluate: t } = Pr({ globalObject: r });
            zo(r, t, j);
          }
          return () => (
            void 0 === dn || io.fail(un`Already locked down at ${dn} (SES_ALREADY_LOCKED_DOWN)`, A),
            (dn = A('Prior lockdown (SES_ALREADY_LOCKED_DOWN)')),
            dn.stack,
            (function (t, e, o = []) {
              const r = new h(o);
              function n(t, e, o, n) {
                if ('value' in n && n.configurable) {
                  const { value: i } = n;
                  function a() {
                    return i;
                  }
                  rt(a, 'originalValue', {
                    value: i,
                    writable: !1,
                    enumerable: !1,
                    configurable: !1,
                  });
                  const s = Kt(r, o);
                  rt(e, o, {
                    get: a,
                    set: function (r) {
                      if (e === this)
                        throw A(`Cannot assign to read only property '${b(o)}' of '${t}'`);
                      _t(this, o)
                        ? (this[o] = r)
                        : (s && console.error(A(`Override property ${o}`)),
                          rt(this, o, {
                            value: r,
                            writable: !0,
                            enumerable: !0,
                            configurable: !0,
                          }));
                    },
                    enumerable: n.enumerable,
                    configurable: n.configurable,
                  });
                }
              }
              function a(t, e, o) {
                const r = F(e, o);
                r && n(t, e, o, r);
              }
              function i(t, e) {
                const o = C(e);
                o && $t(pt(o), (r) => n(t, e, r, o[r]));
              }
              let s;
              switch (e) {
                case 'min':
                  s = Co;
                  break;
                case 'moderate':
                  s = No;
                  break;
                case 'severe':
                  s = Ro;
                  break;
                default:
                  throw A(`unrecognized overrideTaming ${e}`);
              }
              !(function t(e, o, r) {
                for (const n of N(r)) {
                  const s = F(o, n);
                  if (!s || s.get || s.set) continue;
                  const c = `${e}.${b(n)}`,
                    l = r[n];
                  if (!0 === l) a(c, o, n);
                  else if ('*' === l) i(c, s.value);
                  else {
                    if (!Se(l)) throw A(`Unexpected override enablement plan ${c}`);
                    t(c, s.value, l);
                  }
                }
              })('root', t, s);
            })(Y, d, E),
            q(Y),
            q
          );
        };
      (r.lockdown = (t) => {
        const e = mn(t);
        r.harden = e();
      }),
        (r.repairIntrinsics = (t) => {
          const e = mn(t);
          r.hardenIntrinsics = () => {
            r.harden = e();
          };
        });
      const hn = vr();
      (r.Compartment = sn(
        sn,
        ((t) => {
          const { addIntrinsics: e, finalIntrinsics: o } = Oo();
          return e(ko(t, yo)), o();
        })(r),
        hn,
      )),
        (r.assert = io);
    },
  },
]);
