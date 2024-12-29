/*! SDK Edit Interface v24.11.1_webgl-598-gae59c48b5b */ var e,
  t = {
    d: (e, o) => {
      for (var n in o)
        t.o(o, n) && !t.o(e, n) && Object.defineProperty(e, n, { enumerable: !0, get: o[n] });
    },
    o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
  },
  o = {};
t.d(o, { c: () => T }),
  (function (e) {
    (e.POSTMESSAGE = 'postmessage'), (e.DIRECT = 'direct'), (e.WEBSOCKET = 'websocket');
  })(e || (e = {}));
function n(e) {
  let t;
  return e && ((t = e.name), !t && e.constructor && (t = e.constructor.name)), t;
}
function r(e) {
  return `index-${e}`;
}
function a(e, t, o) {
  const a = (function (e, t, o) {
    if (
      !(function (e) {
        return (
          !('function' != typeof e || !e.hasOwnProperty('prototype')) &&
          e.prototype.constructor === e
        );
      })(t)
    )
      throw new Error('@' + e + ' is not valid here [' + n(t) + ']');
    return r(o);
  })(e, t, o);
  if (Reflect.hasOwnMetadata(e, t, a))
    throw new Error('@' + e + ' applied multiple times [' + t.constructor.name + ']');
  return a;
}
function s() {
  return function (e) {
    if (Reflect.hasOwnMetadata('async-injection:INJECTABLE', e))
      throw new Error('@Injectable applied multiple times [' + n(e) + ']');
    Reflect.defineMetadata('async-injection:INJECTABLE', !0, e);
  };
}
function i(e) {
  return function (t, o, r) {
    if (void 0 === e) throw new Error('Undefined id passed to @Inject [' + n(t) + ']');
    const s = a('Inject', t, r);
    Reflect.defineMetadata('async-injection:INJECT', e, t, s);
  };
}
function l() {
  return function (e, t, o) {
    if ('object' != typeof e || 'function' != typeof e.constructor)
      throw new Error(
        '@PostConstruct not applied to instance method [' + e.toString() + '/' + t.toString() + ']',
      );
    if (
      Reflect.hasOwnMetadata('async-injection:POSTCONSTRUCT_SYNC', e.constructor) ||
      Reflect.hasOwnMetadata('async-injection:POSTCONSTRUCT_ASYNC', e.constructor)
    )
      throw new Error('@PostConstruct applied multiple times [' + n(e.constructor) + ']');
    'function' == typeof Reflect.getMetadata('design:returntype', e, t)
      ? Reflect.defineMetadata('async-injection:POSTCONSTRUCT_ASYNC', t, e.constructor)
      : Reflect.defineMetadata('async-injection:POSTCONSTRUCT_SYNC', t, e.constructor);
  };
}
const c = [
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
  ],
  m =
    (Symbol('analytics'),
    Symbol('annotations'),
    Symbol('apiv2'),
    Symbol('app-analytics'),
    Symbol('attachments'),
    Symbol('automation-support'),
    Symbol('blur-data'),
    Symbol('camera'),
    Symbol('camera-start'),
    Symbol('canvas'),
    Symbol('container-data'),
    Symbol('controls-common'),
    Symbol('controls-dh'),
    Symbol('controls-fp'),
    Symbol('controls-inside'),
    Symbol('controls-zoom'),
    Symbol('current-pano'),
    Symbol('cursor-controller'),
    Symbol('cursors'),
    Symbol('cursor-mesh'),
    Symbol('dwell-analytics'),
    Symbol('raycast-fat'),
    Symbol('floors'),
    Symbol('floors-state'),
    Symbol('raycast-floor'),
    Symbol('gui'),
    Symbol('input'),
    Symbol('interaction'),
    Symbol('label-data'),
    Symbol('label-render'),
    Symbol('layers'),
    Symbol('lines'),
    Symbol('locale'),
    Symbol('login-redirect'),
    Symbol('mattertag-data'),
    Symbol('measurement-mode'),
    Symbol('mesh-query'),
    Symbol('mesh-api-fixup'),
    Symbol('mesh-trim-data'),
    Symbol('model-data'),
    Symbol('model-mesh'),
    Symbol('model-rating'),
    Symbol('mouse'),
    Symbol('navigation'),
    Symbol('notes'),
    Symbol('object-tag-suggestions-data'),
    Symbol('ordered-lists'),
    Symbol('orthographic-controls'),
    Symbol('pins'),
    Symbol('plugin'),
    Symbol('plugin-config-data-module')),
  u =
    (Symbol('plugin-ui'),
    Symbol('policy'),
    Symbol('pre-renderer'),
    Symbol('react-three-fiber-external'),
    Symbol('raycaster'),
    Symbol('rtt'),
    Symbol('room-bound')),
  d =
    (Symbol('room-bound-data'),
    Symbol('room-bound-renderer'),
    Symbol('rooms'),
    Symbol('room-selector'),
    Symbol('scan-info'),
    Symbol('scene'),
    Symbol('scheduler'),
    Symbol('screenshots'),
    Symbol('sdk-landing'),
    Symbol('search'),
    Symbol('sensors'),
    Symbol('ses'),
    Symbol('skybox'),
    Symbol('snapshots-editor'),
    Symbol('snapshots-data'),
    Symbol('storage'),
    Symbol('sweep-data'),
    Symbol('pano'),
    Symbol('pucks'),
    Symbol('path'),
    Symbol('sweep-pin-mesh'),
    Symbol('sweep-pin'),
    Symbol('portal'),
    Symbol('portal-nav'),
    Symbol('sweep-textures'),
    Symbol('sweep-viewdata'),
    Symbol('tags'),
    Symbol('tours-controls'),
    Symbol('tours-data'),
    Symbol('tools'));
Symbol('transform-gizmo'),
  Symbol('users'),
  Symbol('mode-change'),
  Symbol('mode'),
  Symbol('video'),
  Symbol('visible-mesh-bounds'),
  Symbol('webgl-renderer'),
  Symbol('webxr');
var y,
  b,
  p = function (e, t, o, n) {
    var r,
      a = arguments.length,
      s = a < 3 ? t : null === n ? (n = Object.getOwnPropertyDescriptor(t, o)) : n;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, o, n);
    else
      for (var i = e.length - 1; i >= 0; i--)
        (r = e[i]) && (s = (a < 3 ? r(s) : a > 3 ? r(t, o, s) : r(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  },
  f = function (e, t) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, t);
  },
  S = function (e, t) {
    return function (o, n) {
      t(o, n, e);
    };
  };
let g = class {
  constructor(e, t) {
    (this.sdk = e), (this.roomBound = t);
  }
  async init() {
    await this.sdk.addCommandToInterface(
      {
        namespace: 'UI',
        name: 'isRoomBoundsVisible',
        args: [],
        sdkTypes: [e.DIRECT],
        origins: c,
        varArg: !1,
      },
      Promise.resolve({
        validateInput: (e) => e,
        exec: async () => this.roomBound.getAllowRendering,
      }),
    );
    const t = {
      validateInput: function (e) {
        if ('boolean' != typeof e.enabled) throw new Error('Expected a boolean');
        return e;
      },
      exec: async (e) => {
        const o = t.validateInput(e);
        this.roomBound.setAllowRendering(o.enabled);
      },
    };
    await this.sdk.addCommandToInterface(
      {
        namespace: 'UI',
        name: 'toggleRoomBounds',
        args: ['enabled'],
        sdkTypes: [e.DIRECT],
        origins: c,
        varArg: !1,
      },
      Promise.resolve(t),
    );
  }
};
p(
  [
    l(),
    f('design:type', Function),
    f('design:paramtypes', []),
    f(
      'design:returntype',
      'function' == typeof (y = 'undefined' != typeof Promise && Promise) ? y : Object,
    ),
  ],
  g.prototype,
  'init',
  null,
),
  (g = p(
    [
      s(),
      S(0, i('$WorkSdk')),
      S(1, i(u.toString())),
      f('design:paramtypes', [
        Object,
        'function' == typeof (b = 'undefined' != typeof RoomBoundModule && RoomBoundModule)
          ? b
          : Object,
      ]),
    ],
    g,
  ));
var h = function (e, t, o, n) {
    var r,
      a = arguments.length,
      s = a < 3 ? t : null === n ? (n = Object.getOwnPropertyDescriptor(t, o)) : n;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, o, n);
    else
      for (var i = e.length - 1; i >= 0; i--)
        (r = e[i]) && (s = (a < 3 ? r(s) : a > 3 ? r(t, o, s) : r(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  },
  w = function (e, t) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, t);
  },
  R = function (e, t) {
    return function (o, n) {
      t(o, n, e);
    };
  };
let v = class {
  constructor(e, t, o) {
    (this.sdk = e), (this.toolsModule = t), (this.pluginConfigDataModule = o);
  }
  init() {
    const t = Promise.resolve({
      getData: () => {
        const e = this.toolsModule.toolsData.activeToolName;
        return e ? e.slice(0) : null;
      },
      subscribe: (e) => {
        const t = () => {
          e.dirty = !0;
        };
        return (
          this.toolsModule.toolsData.onPropertyChanged('activeToolName', t),
          {
            cancel: () => {
              this.toolsModule.toolsData.removeOnPropertyChanged('activeToolName', t);
            },
            renew: () => {
              this.toolsModule.toolsData.onPropertyChanged('activeToolName', t);
            },
          }
        );
      },
    });
    this.sdk.addObservableToInterface(
      { namespace: 'UI', name: 'currentPanel', sdkTypes: [e.DIRECT], origins: c },
      t,
    );
    const o = Promise.resolve({
      getData: () => {
        const e = this.pluginConfigDataModule.pluginConfigData.currentlyConfiguring.value;
        return JSON.parse(JSON.stringify(e));
      },
      subscribe: (e) => {
        const t = () => {
          e.dirty = !0;
        };
        return (
          this.pluginConfigDataModule.pluginConfigData.currentlyConfiguring.onChanged(t),
          {
            cancel: () => {
              this.pluginConfigDataModule.pluginConfigData.currentlyConfiguring.removeOnChanged(t);
            },
            renew: () => {
              this.pluginConfigDataModule.pluginConfigData.currentlyConfiguring.onChanged(t);
            },
          }
        );
      },
    });
    this.sdk.addObservableToInterface(
      { namespace: 'UI', name: 'currentPlugin', sdkTypes: [e.DIRECT], origins: c },
      o,
    );
  }
};
h(
  [l(), w('design:type', Function), w('design:paramtypes', []), w('design:returntype', void 0)],
  v.prototype,
  'init',
  null,
),
  (v = h(
    [
      s(),
      R(0, i('$WorkSdk')),
      R(1, i(d.toString())),
      R(2, i(m.toString())),
      w('design:paramtypes', [Object, Object, Object]),
    ],
    v,
  ));
const C = window.navigationStart || Date.now();
var O;
!(function (e) {
  (e[(e.ERROR = 0)] = 'ERROR'),
    (e[(e.WARN = 1)] = 'WARN'),
    (e[(e.INFO = 2)] = 'INFO'),
    (e[(e.DEBUG = 3)] = 'DEBUG');
})(O || (O = {}));
class E {
  constructor(e) {
    (this.timers = {}),
      (this.handlers = {
        [O.DEBUG]: console.debug,
        [O.INFO]: console.info,
        [O.WARN]: console.warn,
        [O.ERROR]: console.error,
      });
    const t = e.split(new RegExp('/|\\\\'));
    this.prefix = '[' + t[t.length - 1].replace('.js', '') + ']';
  }
  message(e) {
    if (E.level >= e && console) {
      return (this.handlers[e] ? this.handlers[e] : console.log).bind(console, this.getPrefix());
    }
    return () => {};
  }
  get debug() {
    return this.message(O.DEBUG);
  }
  get devInfo() {
    return () => {};
  }
  get debugInfo() {
    return this.debug;
  }
  get debugWarn() {
    return this.message(E.level >= O.DEBUG ? O.WARN : O.DEBUG);
  }
  get info() {
    return this.message(O.INFO);
  }
  get warn() {
    return this.message(O.WARN);
  }
  get error() {
    return this.message(O.ERROR);
  }
  time(e) {
    E.level >= O.DEBUG && (this.timers[e] = Date.now());
  }
  timeEnd(e) {
    if (E.level >= O.DEBUG) {
      const t = this.timers[e];
      if (!t) return;
      const o = (Date.now() - t) / 1e3;
      this.debug(e, o + 's');
    }
  }
  getPrefix() {
    const e = (Date.now() - C) / 1e3 + 's';
    return `${this.prefix} ${e}`;
  }
}
E.level = O.INFO;
const D = new E('ws.sdk.interface');
async function T(e, t, o, n, r, a, s, i) {
  i.bindConstant('$WorkSdk', e),
    (function (e) {
      e.bindClass(g).asSingleton(), e.bindClass(v).asSingleton();
    })(i);
  const l = [d.toString(), m.toString(), u.toString()],
    c = new Promise((e) => {
      const t = () => {
        const o = i.parent.providers.entries().toArray().length;
        D.debugInfo(`there are currently ${o} known DI ids`),
          l.every((e) => i.isIdKnown(e, !0)) ? e() : setTimeout(t, 1e3);
      };
      t();
    });
  await c,
    D.debugInfo('Required modules are now known, continuing with sdk creation...'),
    i.resolveSingletons();
}
var I = o.c;
export { I as setup };
