/*! SDK Interface2 v24.11.1_webgl-598-gae59c48b5b */ var t,
  e,
  n = {
    d: (t, e) => {
      for (var o in e)
        n.o(e, o) && !n.o(t, o) && Object.defineProperty(t, o, { enumerable: !0, get: e[o] });
    },
    o: (t, e) => Object.prototype.hasOwnProperty.call(t, e),
  },
  o = {};
function r(n) {
  return (
    (function (n) {
      n.addEnumToInterface({
        namespace: 'Test',
        name: 'directEnum',
        values: e,
        sdkTypes: [t.DIRECT],
      }),
        n.addEnumToInterface({
          namespace: 'Test',
          name: 'postMessageEnum',
          values: e,
          sdkTypes: [t.POSTMESSAGE],
        });
    })(n),
    {}
  );
}
n.d(o, { c: () => y }),
  (function (t) {
    (t.POSTMESSAGE = 'postmessage'), (t.DIRECT = 'direct'), (t.WEBSOCKET = 'websocket');
  })(t || (t = {})),
  (function (t) {
    (t.ENUM1 = 'test.enum1-2'), (t.ENUM2 = 'test.enum2-2');
  })(e || (e = {}));
function c(t) {
  let e;
  return t && ((e = t.name), !e && t.constructor && (e = t.constructor.name)), e;
}
function a(t) {
  return `index-${t}`;
}
function i(t, e, n) {
  const o = (function (t, e, n) {
    if (
      !(function (t) {
        return (
          !('function' != typeof t || !t.hasOwnProperty('prototype')) &&
          t.prototype.constructor === t
        );
      })(e)
    )
      throw new Error('@' + t + ' is not valid here [' + c(e) + ']');
    return a(n);
  })(t, e, n);
  if (Reflect.hasOwnMetadata(t, e, o))
    throw new Error('@' + t + ' applied multiple times [' + e.constructor.name + ']');
  return o;
}
function s(t) {
  return function (e, n, o) {
    if (void 0 === t) throw new Error('Undefined id passed to @Inject [' + c(e) + ']');
    const r = i('Inject', e, o);
    Reflect.defineMetadata('async-injection:INJECT', t, e, r);
  };
}
const p = [
  'dev-app.matterport.com',
  'dev-app.matterportvr.cn',
  'qa3-app.matterport.com',
  'qa3-app.matterportvr.cn',
  'gc1-app.matterport.com',
  'my.matterport.com',
  'my.matterportvr.cn',
  'showcase-next.matterport.com',
  'static.matterport.com',
  'static.matterportvr.cn',
  'static.matterport.us',
  'matterport.github.io',
  '127.0.0.1',
  'localhost',
];
var u,
  f = function (t, e, n, o) {
    var r,
      c = arguments.length,
      a = c < 3 ? e : null === o ? (o = Object.getOwnPropertyDescriptor(e, n)) : o;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, n, o);
    else
      for (var i = t.length - 1; i >= 0; i--)
        (r = t[i]) && (a = (c < 3 ? r(a) : c > 3 ? r(e, n, a) : r(e, n)) || a);
    return c > 3 && a && Object.defineProperty(e, n, a), a;
  },
  d = function (t, e) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(t, e);
  },
  m = function (t, e) {
    return function (n, o) {
      e(n, o, t);
    };
  };
let l = class {
  constructor(t, e) {
    (this.sdk = t), (this.scene = e);
  }
  async init() {
    const e = this.scene;
    await this.sdk.addCommandToInterface(
      {
        namespace: 'Connected',
        name: 'getScene',
        args: [],
        sdkTypes: [t.DIRECT],
        origins: p,
        varArg: !1,
      },
      Promise.resolve({
        validateInput: function (t, e) {
          return t;
        },
        exec: function (t, n) {
          return Promise.resolve(e);
        },
      }),
    ),
      await this.sdk.addCommandToInterface(
        {
          namespace: 'Connected',
          name: 'directCommand',
          args: [],
          sdkTypes: [t.DIRECT],
          origins: p,
          varArg: !1,
        },
        Promise.resolve({
          validateInput: function (t, e) {
            return t;
          },
          exec: function (t, e) {
            throw new Error('Function not implemented.');
          },
        }),
      );
  }
};
async function y(t, e, n, o, c, a, i, s) {
  s.bindConstant('Sdk', t),
    s.bindConstant('CwfTypes', n),
    r(t),
    (function (t) {
      t.bindClass(l).asSingleton();
    })(s),
    await s.resolveSingletons();
}
f(
  [
    function (t, e, n) {
      if ('object' != typeof t || 'function' != typeof t.constructor)
        throw new Error(
          '@PostConstruct not applied to instance method [' +
            t.toString() +
            '/' +
            e.toString() +
            ']',
        );
      if (
        Reflect.hasOwnMetadata('async-injection:POSTCONSTRUCT_SYNC', t.constructor) ||
        Reflect.hasOwnMetadata('async-injection:POSTCONSTRUCT_ASYNC', t.constructor)
      )
        throw new Error('@PostConstruct applied multiple times [' + c(t.constructor) + ']');
      'function' == typeof Reflect.getMetadata('design:returntype', t, e)
        ? Reflect.defineMetadata('async-injection:POSTCONSTRUCT_ASYNC', e, t.constructor)
        : Reflect.defineMetadata('async-injection:POSTCONSTRUCT_SYNC', e, t.constructor);
    },
    d('design:type', Function),
    d('design:paramtypes', []),
    d(
      'design:returntype',
      'function' == typeof (u = 'undefined' != typeof Promise && Promise) ? u : Object,
    ),
  ],
  l.prototype,
  'init',
  null,
),
  (l = f(
    [
      function (t) {
        if (Reflect.hasOwnMetadata('async-injection:INJECTABLE', t))
          throw new Error('@Injectable applied multiple times [' + c(t) + ']');
        Reflect.defineMetadata('async-injection:INJECTABLE', !0, t);
      },
      m(0, s('Sdk')),
      m(1, s('ThreeScene')),
      d('design:paramtypes', [Object, Object]),
    ],
    l,
  ));
var T = o.c;
export { T as setup };
