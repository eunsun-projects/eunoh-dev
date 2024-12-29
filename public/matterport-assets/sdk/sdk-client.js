/*! SDK Client v24.11.1_webgl-598-gae59c48b5b */ (() => {
  'use strict';
  var t = {
      d: (e, s) => {
        for (var i in s)
          t.o(s, i) && !t.o(e, i) && Object.defineProperty(e, i, { enumerable: !0, get: s[i] });
      },
      o: (t, e) => Object.prototype.hasOwnProperty.call(t, e),
      r: (t) => {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(t, '__esModule', { value: !0 });
      },
    },
    e = {};
  t.r(e), t.d(e, { SdkBuilder: () => fs });
  const s = window.navigationStart || Date.now();
  var i, r, n, o;
  !(function (t) {
    (t[(t.ERROR = 0)] = 'ERROR'),
      (t[(t.WARN = 1)] = 'WARN'),
      (t[(t.INFO = 2)] = 'INFO'),
      (t[(t.DEBUG = 3)] = 'DEBUG');
  })(i || (i = {}));
  class a {
    constructor(t) {
      (this.timers = {}),
        (this.handlers = {
          [i.DEBUG]: console.debug,
          [i.INFO]: console.info,
          [i.WARN]: console.warn,
          [i.ERROR]: console.error,
        });
      const e = t.split(new RegExp('/|\\\\'));
      this.prefix = '[' + e[e.length - 1].replace('.js', '') + ']';
    }
    message(t) {
      if (a.level >= t && console) {
        return (this.handlers[t] ? this.handlers[t] : console.log).bind(console, this.getPrefix());
      }
      return () => {};
    }
    get debug() {
      return this.message(i.DEBUG);
    }
    get devInfo() {
      return () => {};
    }
    get debugInfo() {
      return this.debug;
    }
    get debugWarn() {
      return this.message(a.level >= i.DEBUG ? i.WARN : i.DEBUG);
    }
    get info() {
      return this.message(i.INFO);
    }
    get warn() {
      return this.message(i.WARN);
    }
    get error() {
      return this.message(i.ERROR);
    }
    time(t) {
      a.level >= i.DEBUG && (this.timers[t] = Date.now());
    }
    timeEnd(t) {
      if (a.level >= i.DEBUG) {
        const e = this.timers[t];
        if (!e) return;
        const s = (Date.now() - e) / 1e3;
        this.debug(t, s + 's');
      }
    }
    getPrefix() {
      const t = (Date.now() - s) / 1e3 + 's';
      return `${this.prefix} ${t}`;
    }
  }
  a.level = i.INFO;
  class h {
    constructor(t) {
      this.messageReceiver = t;
    }
    notify(t, e) {
      this.messageReceiver.onMessageReceived(t, e);
    }
  }
  class c {
    constructor() {
      this.values = {};
    }
    add(t, e) {
      this.getValuesAtKey(t).push(e);
    }
    remove(t, e) {
      const s = this.values[t];
      if (s) {
        const t = s.indexOf(e);
        t > -1 && s.splice(t, 1);
      }
    }
    removeKey(t) {
      delete this.values[t];
    }
    getValuesAtKey(t) {
      const e = this.values[t] || [];
      return (this.values[t] = e), e;
    }
    valuesPerKey(t) {
      return this.getValuesAtKey(t).length;
    }
    find(t, e) {
      return this.values[t] && this.values[t].find(e);
    }
    get keys() {
      return Object.keys(this.values);
    }
    hasKey(t) {
      return t in this.values;
    }
    has(t, e) {
      return this.hasKey(t) && this.values[t].includes(e);
    }
    *[Symbol.iterator]() {
      for (const t in this.values) for (const e of this.values[t]) yield [t, e];
    }
  }
  class l {
    constructor() {
      this.values = new Map();
    }
    add(t, e) {
      this.getValuesAtKey(t).add(e);
    }
    remove(t, e) {
      const s = this.values.get(t);
      null == s || s.delete(e);
    }
    removeKey(t) {
      this.values.delete(t);
    }
    getValuesAtKey(t) {
      const e = this.values.get(t) || new Set();
      return this.values.set(t, e), e;
    }
    valuesPerKey(t) {
      return this.getValuesAtKey(t).size;
    }
    get keys() {
      return this.values.keys();
    }
    hasKey(t) {
      return this.values.has(t);
    }
    has(t, e) {
      var s;
      return !!(null === (s = this.values.get(t)) || void 0 === s ? void 0 : s.has(e));
    }
    *[Symbol.iterator]() {
      for (const [t, e] of this.values) for (const s of e) yield [t, s];
    }
  }
  class u {
    listen() {}
    stopListening() {}
    send() {
      throw Error("The sdk has been disconnected and can't make any new calls");
    }
  }
  class d {
    constructor(t, e, s) {
      (this.sourceId = t),
        (this.targetId = e),
        (this.messageBridge = s),
        (this.observers = new c());
    }
    static toFilteredMessenger(t, e, s) {
      const i = new p(t.sourceId, t.targetId, t, e);
      for (const e of s) for (const s of t.observers.getValuesAtKey(e)) i.addObserver(s);
      return i;
    }
    init() {
      const t = new (class {
          constructor(t) {
            this.messenger = t;
          }
          onMessageReceived(t, e) {
            this.messenger.onMessageReceived(t, e);
          }
        })(this),
        e = new h(t);
      this.messageBridge.listen(e);
    }
    dispose() {
      this.messageBridge.stopListening(), (this.messageBridge = new u());
    }
    addObserver(t) {
      this.observers.add(t.messageType, t);
    }
    removeObserver(t) {
      this.observers.remove(t.messageType, t);
    }
    send(t) {
      const e = this.sourceId,
        s = this.targetId;
      this.messageBridge.send(
        Object.assign(Object.assign({}, t), { fromId: e, toId: s, timestamp: Date.now() }),
      );
    }
    onMessageReceived(t, e) {
      if (!this.filterMessageId(t)) return;
      const s = t.type,
        i = this.observers.getValuesAtKey(s);
      if (i)
        for (const s of i) {
          const i = t.payload || t;
          s.notify(i, e, t.timestamp);
        }
    }
    filterMessageId(t) {
      const e = t.toId,
        s = t.fromId;
      return e instanceof Array
        ? e.indexOf(this.sourceId) > -1
        : (void 0 === e || e === this.sourceId) && s === this.targetId;
    }
  }
  class p extends d {
    constructor(t, e, s, i) {
      super(t, e, new u()),
        (this.messenger = s),
        (this.sendFilter = i),
        (this.errorBridge = new u());
    }
    send(t) {
      this.sendFilter.includes(t.type) ? this.messenger.send(t) : this.errorBridge.send();
    }
  }
  !(function (t) {
    (t.EVENT = 'postmessage.event'),
      (t.RESPONSE = 'postmessage.response'),
      (t.OBSERVATION = 'postmessage.observation'),
      (t.COLLECTION_UPDATE = 'collection.updated'),
      (t.PRIVATE_MESSAGE = 'private.message');
  })(r || (r = {})),
    (function (t) {
      (t.ITEM_ADDED = 'collection.item.added'),
        (t.ITEM_REMOVED = 'collection.item.removed'),
        (t.ITEM_UPDATED = 'collection.item.updated'),
        (t.COLL_UPDATED = 'collection.coll.updated');
    })(n || (n = {}));
  class m {
    constructor(t) {
      (this.observer = t), (this.messageType = r.EVENT);
    }
    notify(t) {
      this.observer.receiveEvent(t);
    }
  }
  !(function (t) {
    (t.DISCONNECT = 'sdk.client.disconnect'),
      (t.ACTION = 'postmessage.action'),
      (t.EVENT_SUB = 'postmessage.subscribe'),
      (t.EVENT_UNSUB = 'postmessage.unsubscribe'),
      (t.OBSERVABLE_SUB = 'postmessage.observe'),
      (t.OBSERVABLE_UNSUB = 'postmessage.unobserve'),
      (t.COLLECTION_SUB = 'collection.sub'),
      (t.COLLECTION_UNSUB = 'collection.unsub'),
      (t.PRIVATE_MESSAGE = 'private.message');
  })(o || (o = {}));
  class g {
    constructor(t) {
      (this.type = o.EVENT_SUB), (this.payload = { subscription: t });
    }
  }
  class f {
    constructor(t) {
      (this.type = o.EVENT_UNSUB), (this.payload = { subscription: t });
    }
  }
  class y {
    constructor(t) {
      (this.getMessenger = t), (this.eventHandlers = new c());
      const e = new (class {
        constructor(t) {
          this.eventHandler = t;
        }
        receiveEvent(t) {
          this.eventHandler.receiveEvent(t);
        }
      })(this);
      (this.eventObserver = new m(e)), this.getMessenger().addObserver(this.eventObserver);
    }
    build() {
      return { on: (t, e) => this.subscribe(t, e), off: (t, e) => this.unsubscribe(t, e) };
    }
    dispose() {
      for (const t of this.eventHandlers.keys) this.getMessenger().send(new f(t));
      this.getMessenger().removeObserver(this.eventObserver);
    }
    receiveEvent(t) {
      const e = this.eventHandlers.getValuesAtKey(t.eventType);
      if (e) for (const s of e) t.eventData ? s(...t.eventData) : s();
    }
    subscribe(t, e) {
      0 === this.eventHandlers.valuesPerKey(t) && this.getMessenger().send(new g(t)),
        this.eventHandlers.add(t, e);
    }
    unsubscribe(t, e) {
      this.eventHandlers.remove(t, e),
        0 === this.eventHandlers.valuesPerKey(t) && this.getMessenger().send(new f(t));
    }
  }
  class b {}
  function v(t, e) {
    const s = t.split('.');
    let i = e;
    for (const t of s) {
      const e = i[t] || new b();
      (i[t] = e), (i = e);
    }
    return i;
  }
  class w {
    constructor() {}
    build(t) {
      const e = new b();
      for (const s of Object.keys(t)) {
        const i = t[s];
        if (i) {
          v(i.namespace, e)[i.name] = i.values;
        }
      }
      return e;
    }
    dispose() {}
  }
  class x {
    constructor(t, e) {
      (this.type = o.PRIVATE_MESSAGE), (this.payload = { messageType: t, messagePayload: e });
    }
  }
  class M {
    constructor(t) {
      (this.getMessenger = t), (this.values = new Map());
    }
    dispose() {}
    register(t, e) {
      const s = e.value();
      return (
        this.values.set(t, s),
        'function' == typeof s
          ? (...t) => (
              this.getMessenger().send(
                new x('client call', { namespace: e.namespace, name: e.name }),
              ),
              s(...t)
            )
          : s
      );
    }
    lookup(t) {
      return this.values.get(t);
    }
  }
  class E {
    constructor(t) {
      this.registration = t;
    }
    build(t) {
      const e = new b();
      for (const s of Object.keys(t)) {
        const i = t[s];
        if (i) {
          v(i.namespace, e)[i.name] = this.registration.register(s, i);
        }
      }
      return e;
    }
  }
  function _(t, e) {
    return (
      ((e = e || { x: 0, y: 0, z: 0 }).x = t.anchorPosition.x),
      (e.y = t.anchorPosition.y),
      (e.z = t.anchorPosition.z),
      (e.x += t.stemVector.x),
      (e.y += t.stemVector.y),
      (e.z += t.stemVector.z),
      e
    );
  }
  const O = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '0a',
    '0b',
    '0c',
    '0d',
    '0e',
    '0f',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '1a',
    '1b',
    '1c',
    '1d',
    '1e',
    '1f',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '2a',
    '2b',
    '2c',
    '2d',
    '2e',
    '2f',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '3a',
    '3b',
    '3c',
    '3d',
    '3e',
    '3f',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '4a',
    '4b',
    '4c',
    '4d',
    '4e',
    '4f',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '5a',
    '5b',
    '5c',
    '5d',
    '5e',
    '5f',
    '60',
    '61',
    '62',
    '63',
    '64',
    '65',
    '66',
    '67',
    '68',
    '69',
    '6a',
    '6b',
    '6c',
    '6d',
    '6e',
    '6f',
    '70',
    '71',
    '72',
    '73',
    '74',
    '75',
    '76',
    '77',
    '78',
    '79',
    '7a',
    '7b',
    '7c',
    '7d',
    '7e',
    '7f',
    '80',
    '81',
    '82',
    '83',
    '84',
    '85',
    '86',
    '87',
    '88',
    '89',
    '8a',
    '8b',
    '8c',
    '8d',
    '8e',
    '8f',
    '90',
    '91',
    '92',
    '93',
    '94',
    '95',
    '96',
    '97',
    '98',
    '99',
    '9a',
    '9b',
    '9c',
    '9d',
    '9e',
    '9f',
    'a0',
    'a1',
    'a2',
    'a3',
    'a4',
    'a5',
    'a6',
    'a7',
    'a8',
    'a9',
    'aa',
    'ab',
    'ac',
    'ad',
    'ae',
    'af',
    'b0',
    'b1',
    'b2',
    'b3',
    'b4',
    'b5',
    'b6',
    'b7',
    'b8',
    'b9',
    'ba',
    'bb',
    'bc',
    'bd',
    'be',
    'bf',
    'c0',
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'c7',
    'c8',
    'c9',
    'ca',
    'cb',
    'cc',
    'cd',
    'ce',
    'cf',
    'd0',
    'd1',
    'd2',
    'd3',
    'd4',
    'd5',
    'd6',
    'd7',
    'd8',
    'd9',
    'da',
    'db',
    'dc',
    'dd',
    'de',
    'df',
    'e0',
    'e1',
    'e2',
    'e3',
    'e4',
    'e5',
    'e6',
    'e7',
    'e8',
    'e9',
    'ea',
    'eb',
    'ec',
    'ed',
    'ee',
    'ef',
    'f0',
    'f1',
    'f2',
    'f3',
    'f4',
    'f5',
    'f6',
    'f7',
    'f8',
    'f9',
    'fa',
    'fb',
    'fc',
    'fd',
    'fe',
    'ff',
  ];
  const C = Math.PI / 180,
    T = 180 / Math.PI;
  function A() {
    const t = (4294967295 * Math.random()) | 0,
      e = (4294967295 * Math.random()) | 0,
      s = (4294967295 * Math.random()) | 0,
      i = (4294967295 * Math.random()) | 0;
    return (
      O[255 & t] +
      O[(t >> 8) & 255] +
      O[(t >> 16) & 255] +
      O[(t >> 24) & 255] +
      '-' +
      O[255 & e] +
      O[(e >> 8) & 255] +
      '-' +
      O[((e >> 16) & 15) | 64] +
      O[(e >> 24) & 255] +
      '-' +
      O[(63 & s) | 128] +
      O[(s >> 8) & 255] +
      '-' +
      O[(s >> 16) & 255] +
      O[(s >> 24) & 255] +
      O[255 & i] +
      O[(i >> 8) & 255] +
      O[(i >> 16) & 255] +
      O[(i >> 24) & 255]
    ).toLowerCase();
  }
  function R(t, e, s) {
    return Math.max(e, Math.min(s, t));
  }
  class S {
    constructor(t = 0, e = 0, s = 0, i = 1) {
      (this.isQuaternion = !0), (this._x = t), (this._y = e), (this._z = s), (this._w = i);
    }
    static slerpFlat(t, e, s, i, r, n, o) {
      let a = s[i + 0],
        h = s[i + 1],
        c = s[i + 2],
        l = s[i + 3];
      const u = r[n + 0],
        d = r[n + 1],
        p = r[n + 2],
        m = r[n + 3];
      if (0 === o) return (t[e + 0] = a), (t[e + 1] = h), (t[e + 2] = c), void (t[e + 3] = l);
      if (1 === o) return (t[e + 0] = u), (t[e + 1] = d), (t[e + 2] = p), void (t[e + 3] = m);
      if (l !== m || a !== u || h !== d || c !== p) {
        let t = 1 - o;
        const e = a * u + h * d + c * p + l * m,
          s = e >= 0 ? 1 : -1,
          i = 1 - e * e;
        if (i > Number.EPSILON) {
          const r = Math.sqrt(i),
            n = Math.atan2(r, e * s);
          (t = Math.sin(t * n) / r), (o = Math.sin(o * n) / r);
        }
        const r = o * s;
        if (
          ((a = a * t + u * r),
          (h = h * t + d * r),
          (c = c * t + p * r),
          (l = l * t + m * r),
          t === 1 - o)
        ) {
          const t = 1 / Math.sqrt(a * a + h * h + c * c + l * l);
          (a *= t), (h *= t), (c *= t), (l *= t);
        }
      }
      (t[e] = a), (t[e + 1] = h), (t[e + 2] = c), (t[e + 3] = l);
    }
    static multiplyQuaternionsFlat(t, e, s, i, r, n) {
      const o = s[i],
        a = s[i + 1],
        h = s[i + 2],
        c = s[i + 3],
        l = r[n],
        u = r[n + 1],
        d = r[n + 2],
        p = r[n + 3];
      return (
        (t[e] = o * p + c * l + a * d - h * u),
        (t[e + 1] = a * p + c * u + h * l - o * d),
        (t[e + 2] = h * p + c * d + o * u - a * l),
        (t[e + 3] = c * p - o * l - a * u - h * d),
        t
      );
    }
    get x() {
      return this._x;
    }
    set x(t) {
      (this._x = t), this._onChangeCallback();
    }
    get y() {
      return this._y;
    }
    set y(t) {
      (this._y = t), this._onChangeCallback();
    }
    get z() {
      return this._z;
    }
    set z(t) {
      (this._z = t), this._onChangeCallback();
    }
    get w() {
      return this._w;
    }
    set w(t) {
      (this._w = t), this._onChangeCallback();
    }
    set(t, e, s, i) {
      return (
        (this._x = t), (this._y = e), (this._z = s), (this._w = i), this._onChangeCallback(), this
      );
    }
    clone() {
      return new this.constructor(this._x, this._y, this._z, this._w);
    }
    copy(t) {
      return (
        (this._x = t.x),
        (this._y = t.y),
        (this._z = t.z),
        (this._w = t.w),
        this._onChangeCallback(),
        this
      );
    }
    setFromEuler(t, e) {
      const s = t._x,
        i = t._y,
        r = t._z,
        n = t._order,
        o = Math.cos,
        a = Math.sin,
        h = o(s / 2),
        c = o(i / 2),
        l = o(r / 2),
        u = a(s / 2),
        d = a(i / 2),
        p = a(r / 2);
      switch (n) {
        case 'XYZ':
          (this._x = u * c * l + h * d * p),
            (this._y = h * d * l - u * c * p),
            (this._z = h * c * p + u * d * l),
            (this._w = h * c * l - u * d * p);
          break;
        case 'YXZ':
          (this._x = u * c * l + h * d * p),
            (this._y = h * d * l - u * c * p),
            (this._z = h * c * p - u * d * l),
            (this._w = h * c * l + u * d * p);
          break;
        case 'ZXY':
          (this._x = u * c * l - h * d * p),
            (this._y = h * d * l + u * c * p),
            (this._z = h * c * p + u * d * l),
            (this._w = h * c * l - u * d * p);
          break;
        case 'ZYX':
          (this._x = u * c * l - h * d * p),
            (this._y = h * d * l + u * c * p),
            (this._z = h * c * p - u * d * l),
            (this._w = h * c * l + u * d * p);
          break;
        case 'YZX':
          (this._x = u * c * l + h * d * p),
            (this._y = h * d * l + u * c * p),
            (this._z = h * c * p - u * d * l),
            (this._w = h * c * l - u * d * p);
          break;
        case 'XZY':
          (this._x = u * c * l - h * d * p),
            (this._y = h * d * l - u * c * p),
            (this._z = h * c * p + u * d * l),
            (this._w = h * c * l + u * d * p);
          break;
        default:
          console.warn('THREE.Quaternion: .setFromEuler() encountered an unknown order: ' + n);
      }
      return !1 !== e && this._onChangeCallback(), this;
    }
    setFromAxisAngle(t, e) {
      const s = e / 2,
        i = Math.sin(s);
      return (
        (this._x = t.x * i),
        (this._y = t.y * i),
        (this._z = t.z * i),
        (this._w = Math.cos(s)),
        this._onChangeCallback(),
        this
      );
    }
    setFromRotationMatrix(t) {
      const e = t.elements,
        s = e[0],
        i = e[4],
        r = e[8],
        n = e[1],
        o = e[5],
        a = e[9],
        h = e[2],
        c = e[6],
        l = e[10],
        u = s + o + l;
      if (u > 0) {
        const t = 0.5 / Math.sqrt(u + 1);
        (this._w = 0.25 / t),
          (this._x = (c - a) * t),
          (this._y = (r - h) * t),
          (this._z = (n - i) * t);
      } else if (s > o && s > l) {
        const t = 2 * Math.sqrt(1 + s - o - l);
        (this._w = (c - a) / t),
          (this._x = 0.25 * t),
          (this._y = (i + n) / t),
          (this._z = (r + h) / t);
      } else if (o > l) {
        const t = 2 * Math.sqrt(1 + o - s - l);
        (this._w = (r - h) / t),
          (this._x = (i + n) / t),
          (this._y = 0.25 * t),
          (this._z = (a + c) / t);
      } else {
        const t = 2 * Math.sqrt(1 + l - s - o);
        (this._w = (n - i) / t),
          (this._x = (r + h) / t),
          (this._y = (a + c) / t),
          (this._z = 0.25 * t);
      }
      return this._onChangeCallback(), this;
    }
    setFromUnitVectors(t, e) {
      let s = t.dot(e) + 1;
      return (
        s < Number.EPSILON
          ? ((s = 0),
            Math.abs(t.x) > Math.abs(t.z)
              ? ((this._x = -t.y), (this._y = t.x), (this._z = 0), (this._w = s))
              : ((this._x = 0), (this._y = -t.z), (this._z = t.y), (this._w = s)))
          : ((this._x = t.y * e.z - t.z * e.y),
            (this._y = t.z * e.x - t.x * e.z),
            (this._z = t.x * e.y - t.y * e.x),
            (this._w = s)),
        this.normalize()
      );
    }
    angleTo(t) {
      return 2 * Math.acos(Math.abs(R(this.dot(t), -1, 1)));
    }
    rotateTowards(t, e) {
      const s = this.angleTo(t);
      if (0 === s) return this;
      const i = Math.min(1, e / s);
      return this.slerp(t, i), this;
    }
    identity() {
      return this.set(0, 0, 0, 1);
    }
    invert() {
      return this.conjugate();
    }
    conjugate() {
      return (this._x *= -1), (this._y *= -1), (this._z *= -1), this._onChangeCallback(), this;
    }
    dot(t) {
      return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w;
    }
    lengthSq() {
      return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
    }
    length() {
      return Math.sqrt(
        this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w,
      );
    }
    normalize() {
      let t = this.length();
      return (
        0 === t
          ? ((this._x = 0), (this._y = 0), (this._z = 0), (this._w = 1))
          : ((t = 1 / t),
            (this._x = this._x * t),
            (this._y = this._y * t),
            (this._z = this._z * t),
            (this._w = this._w * t)),
        this._onChangeCallback(),
        this
      );
    }
    multiply(t) {
      return this.multiplyQuaternions(this, t);
    }
    premultiply(t) {
      return this.multiplyQuaternions(t, this);
    }
    multiplyQuaternions(t, e) {
      const s = t._x,
        i = t._y,
        r = t._z,
        n = t._w,
        o = e._x,
        a = e._y,
        h = e._z,
        c = e._w;
      return (
        (this._x = s * c + n * o + i * h - r * a),
        (this._y = i * c + n * a + r * o - s * h),
        (this._z = r * c + n * h + s * a - i * o),
        (this._w = n * c - s * o - i * a - r * h),
        this._onChangeCallback(),
        this
      );
    }
    slerp(t, e) {
      if (0 === e) return this;
      if (1 === e) return this.copy(t);
      const s = this._x,
        i = this._y,
        r = this._z,
        n = this._w;
      let o = n * t._w + s * t._x + i * t._y + r * t._z;
      if (
        (o < 0
          ? ((this._w = -t._w), (this._x = -t._x), (this._y = -t._y), (this._z = -t._z), (o = -o))
          : this.copy(t),
        o >= 1)
      )
        return (this._w = n), (this._x = s), (this._y = i), (this._z = r), this;
      const a = 1 - o * o;
      if (a <= Number.EPSILON) {
        const t = 1 - e;
        return (
          (this._w = t * n + e * this._w),
          (this._x = t * s + e * this._x),
          (this._y = t * i + e * this._y),
          (this._z = t * r + e * this._z),
          this.normalize(),
          this._onChangeCallback(),
          this
        );
      }
      const h = Math.sqrt(a),
        c = Math.atan2(h, o),
        l = Math.sin((1 - e) * c) / h,
        u = Math.sin(e * c) / h;
      return (
        (this._w = n * l + this._w * u),
        (this._x = s * l + this._x * u),
        (this._y = i * l + this._y * u),
        (this._z = r * l + this._z * u),
        this._onChangeCallback(),
        this
      );
    }
    slerpQuaternions(t, e, s) {
      return this.copy(t).slerp(e, s);
    }
    random() {
      const t = Math.random(),
        e = Math.sqrt(1 - t),
        s = Math.sqrt(t),
        i = 2 * Math.PI * Math.random(),
        r = 2 * Math.PI * Math.random();
      return this.set(e * Math.cos(i), s * Math.sin(r), s * Math.cos(r), e * Math.sin(i));
    }
    equals(t) {
      return t._x === this._x && t._y === this._y && t._z === this._z && t._w === this._w;
    }
    fromArray(t, e = 0) {
      return (
        (this._x = t[e]),
        (this._y = t[e + 1]),
        (this._z = t[e + 2]),
        (this._w = t[e + 3]),
        this._onChangeCallback(),
        this
      );
    }
    toArray(t = [], e = 0) {
      return (t[e] = this._x), (t[e + 1] = this._y), (t[e + 2] = this._z), (t[e + 3] = this._w), t;
    }
    fromBufferAttribute(t, e) {
      return (
        (this._x = t.getX(e)),
        (this._y = t.getY(e)),
        (this._z = t.getZ(e)),
        (this._w = t.getW(e)),
        this
      );
    }
    toJSON() {
      return this.toArray();
    }
    _onChange(t) {
      return (this._onChangeCallback = t), this;
    }
    _onChangeCallback() {}
    *[Symbol.iterator]() {
      yield this._x, yield this._y, yield this._z, yield this._w;
    }
  }
  class I {
    constructor(t = 0, e = 0, s = 0) {
      (I.prototype.isVector3 = !0), (this.x = t), (this.y = e), (this.z = s);
    }
    set(t, e, s) {
      return void 0 === s && (s = this.z), (this.x = t), (this.y = e), (this.z = s), this;
    }
    setScalar(t) {
      return (this.x = t), (this.y = t), (this.z = t), this;
    }
    setX(t) {
      return (this.x = t), this;
    }
    setY(t) {
      return (this.y = t), this;
    }
    setZ(t) {
      return (this.z = t), this;
    }
    setComponent(t, e) {
      switch (t) {
        case 0:
          this.x = e;
          break;
        case 1:
          this.y = e;
          break;
        case 2:
          this.z = e;
          break;
        default:
          throw new Error('index is out of range: ' + t);
      }
      return this;
    }
    getComponent(t) {
      switch (t) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        case 2:
          return this.z;
        default:
          throw new Error('index is out of range: ' + t);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y, this.z);
    }
    copy(t) {
      return (this.x = t.x), (this.y = t.y), (this.z = t.z), this;
    }
    add(t) {
      return (this.x += t.x), (this.y += t.y), (this.z += t.z), this;
    }
    addScalar(t) {
      return (this.x += t), (this.y += t), (this.z += t), this;
    }
    addVectors(t, e) {
      return (this.x = t.x + e.x), (this.y = t.y + e.y), (this.z = t.z + e.z), this;
    }
    addScaledVector(t, e) {
      return (this.x += t.x * e), (this.y += t.y * e), (this.z += t.z * e), this;
    }
    sub(t) {
      return (this.x -= t.x), (this.y -= t.y), (this.z -= t.z), this;
    }
    subScalar(t) {
      return (this.x -= t), (this.y -= t), (this.z -= t), this;
    }
    subVectors(t, e) {
      return (this.x = t.x - e.x), (this.y = t.y - e.y), (this.z = t.z - e.z), this;
    }
    multiply(t) {
      return (this.x *= t.x), (this.y *= t.y), (this.z *= t.z), this;
    }
    multiplyScalar(t) {
      return (this.x *= t), (this.y *= t), (this.z *= t), this;
    }
    multiplyVectors(t, e) {
      return (this.x = t.x * e.x), (this.y = t.y * e.y), (this.z = t.z * e.z), this;
    }
    applyEuler(t) {
      return this.applyQuaternion(N.setFromEuler(t));
    }
    applyAxisAngle(t, e) {
      return this.applyQuaternion(N.setFromAxisAngle(t, e));
    }
    applyMatrix3(t) {
      const e = this.x,
        s = this.y,
        i = this.z,
        r = t.elements;
      return (
        (this.x = r[0] * e + r[3] * s + r[6] * i),
        (this.y = r[1] * e + r[4] * s + r[7] * i),
        (this.z = r[2] * e + r[5] * s + r[8] * i),
        this
      );
    }
    applyNormalMatrix(t) {
      return this.applyMatrix3(t).normalize();
    }
    applyMatrix4(t) {
      const e = this.x,
        s = this.y,
        i = this.z,
        r = t.elements,
        n = 1 / (r[3] * e + r[7] * s + r[11] * i + r[15]);
      return (
        (this.x = (r[0] * e + r[4] * s + r[8] * i + r[12]) * n),
        (this.y = (r[1] * e + r[5] * s + r[9] * i + r[13]) * n),
        (this.z = (r[2] * e + r[6] * s + r[10] * i + r[14]) * n),
        this
      );
    }
    applyQuaternion(t) {
      const e = this.x,
        s = this.y,
        i = this.z,
        r = t.x,
        n = t.y,
        o = t.z,
        a = t.w,
        h = a * e + n * i - o * s,
        c = a * s + o * e - r * i,
        l = a * i + r * s - n * e,
        u = -r * e - n * s - o * i;
      return (
        (this.x = h * a + u * -r + c * -o - l * -n),
        (this.y = c * a + u * -n + l * -r - h * -o),
        (this.z = l * a + u * -o + h * -n - c * -r),
        this
      );
    }
    project(t) {
      return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix);
    }
    unproject(t) {
      return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld);
    }
    transformDirection(t) {
      const e = this.x,
        s = this.y,
        i = this.z,
        r = t.elements;
      return (
        (this.x = r[0] * e + r[4] * s + r[8] * i),
        (this.y = r[1] * e + r[5] * s + r[9] * i),
        (this.z = r[2] * e + r[6] * s + r[10] * i),
        this.normalize()
      );
    }
    divide(t) {
      return (this.x /= t.x), (this.y /= t.y), (this.z /= t.z), this;
    }
    divideScalar(t) {
      return this.multiplyScalar(1 / t);
    }
    min(t) {
      return (
        (this.x = Math.min(this.x, t.x)),
        (this.y = Math.min(this.y, t.y)),
        (this.z = Math.min(this.z, t.z)),
        this
      );
    }
    max(t) {
      return (
        (this.x = Math.max(this.x, t.x)),
        (this.y = Math.max(this.y, t.y)),
        (this.z = Math.max(this.z, t.z)),
        this
      );
    }
    clamp(t, e) {
      return (
        (this.x = Math.max(t.x, Math.min(e.x, this.x))),
        (this.y = Math.max(t.y, Math.min(e.y, this.y))),
        (this.z = Math.max(t.z, Math.min(e.z, this.z))),
        this
      );
    }
    clampScalar(t, e) {
      return (
        (this.x = Math.max(t, Math.min(e, this.x))),
        (this.y = Math.max(t, Math.min(e, this.y))),
        (this.z = Math.max(t, Math.min(e, this.z))),
        this
      );
    }
    clampLength(t, e) {
      const s = this.length();
      return this.divideScalar(s || 1).multiplyScalar(Math.max(t, Math.min(e, s)));
    }
    floor() {
      return (
        (this.x = Math.floor(this.x)),
        (this.y = Math.floor(this.y)),
        (this.z = Math.floor(this.z)),
        this
      );
    }
    ceil() {
      return (
        (this.x = Math.ceil(this.x)),
        (this.y = Math.ceil(this.y)),
        (this.z = Math.ceil(this.z)),
        this
      );
    }
    round() {
      return (
        (this.x = Math.round(this.x)),
        (this.y = Math.round(this.y)),
        (this.z = Math.round(this.z)),
        this
      );
    }
    roundToZero() {
      return (
        (this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x)),
        (this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y)),
        (this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z)),
        this
      );
    }
    negate() {
      return (this.x = -this.x), (this.y = -this.y), (this.z = -this.z), this;
    }
    dot(t) {
      return this.x * t.x + this.y * t.y + this.z * t.z;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    setLength(t) {
      return this.normalize().multiplyScalar(t);
    }
    lerp(t, e) {
      return (
        (this.x += (t.x - this.x) * e),
        (this.y += (t.y - this.y) * e),
        (this.z += (t.z - this.z) * e),
        this
      );
    }
    lerpVectors(t, e, s) {
      return (
        (this.x = t.x + (e.x - t.x) * s),
        (this.y = t.y + (e.y - t.y) * s),
        (this.z = t.z + (e.z - t.z) * s),
        this
      );
    }
    cross(t) {
      return this.crossVectors(this, t);
    }
    crossVectors(t, e) {
      const s = t.x,
        i = t.y,
        r = t.z,
        n = e.x,
        o = e.y,
        a = e.z;
      return (this.x = i * a - r * o), (this.y = r * n - s * a), (this.z = s * o - i * n), this;
    }
    projectOnVector(t) {
      const e = t.lengthSq();
      if (0 === e) return this.set(0, 0, 0);
      const s = t.dot(this) / e;
      return this.copy(t).multiplyScalar(s);
    }
    projectOnPlane(t) {
      return z.copy(this).projectOnVector(t), this.sub(z);
    }
    reflect(t) {
      return this.sub(z.copy(t).multiplyScalar(2 * this.dot(t)));
    }
    angleTo(t) {
      const e = Math.sqrt(this.lengthSq() * t.lengthSq());
      if (0 === e) return Math.PI / 2;
      const s = this.dot(t) / e;
      return Math.acos(R(s, -1, 1));
    }
    distanceTo(t) {
      return Math.sqrt(this.distanceToSquared(t));
    }
    distanceToSquared(t) {
      const e = this.x - t.x,
        s = this.y - t.y,
        i = this.z - t.z;
      return e * e + s * s + i * i;
    }
    manhattanDistanceTo(t) {
      return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z);
    }
    setFromSpherical(t) {
      return this.setFromSphericalCoords(t.radius, t.phi, t.theta);
    }
    setFromSphericalCoords(t, e, s) {
      const i = Math.sin(e) * t;
      return (
        (this.x = i * Math.sin(s)), (this.y = Math.cos(e) * t), (this.z = i * Math.cos(s)), this
      );
    }
    setFromCylindrical(t) {
      return this.setFromCylindricalCoords(t.radius, t.theta, t.y);
    }
    setFromCylindricalCoords(t, e, s) {
      return (this.x = t * Math.sin(e)), (this.y = s), (this.z = t * Math.cos(e)), this;
    }
    setFromMatrixPosition(t) {
      const e = t.elements;
      return (this.x = e[12]), (this.y = e[13]), (this.z = e[14]), this;
    }
    setFromMatrixScale(t) {
      const e = this.setFromMatrixColumn(t, 0).length(),
        s = this.setFromMatrixColumn(t, 1).length(),
        i = this.setFromMatrixColumn(t, 2).length();
      return (this.x = e), (this.y = s), (this.z = i), this;
    }
    setFromMatrixColumn(t, e) {
      return this.fromArray(t.elements, 4 * e);
    }
    setFromMatrix3Column(t, e) {
      return this.fromArray(t.elements, 3 * e);
    }
    setFromEuler(t) {
      return (this.x = t._x), (this.y = t._y), (this.z = t._z), this;
    }
    setFromColor(t) {
      return (this.x = t.r), (this.y = t.g), (this.z = t.b), this;
    }
    equals(t) {
      return t.x === this.x && t.y === this.y && t.z === this.z;
    }
    fromArray(t, e = 0) {
      return (this.x = t[e]), (this.y = t[e + 1]), (this.z = t[e + 2]), this;
    }
    toArray(t = [], e = 0) {
      return (t[e] = this.x), (t[e + 1] = this.y), (t[e + 2] = this.z), t;
    }
    fromBufferAttribute(t, e) {
      return (this.x = t.getX(e)), (this.y = t.getY(e)), (this.z = t.getZ(e)), this;
    }
    random() {
      return (this.x = Math.random()), (this.y = Math.random()), (this.z = Math.random()), this;
    }
    randomDirection() {
      const t = 2 * (Math.random() - 0.5),
        e = Math.random() * Math.PI * 2,
        s = Math.sqrt(1 - t ** 2);
      return (this.x = s * Math.cos(e)), (this.y = s * Math.sin(e)), (this.z = t), this;
    }
    *[Symbol.iterator]() {
      yield this.x, yield this.y, yield this.z;
    }
  }
  const z = new I(),
    N = new S();
  class D {
    constructor() {
      (D.prototype.isMatrix4 = !0),
        (this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    set(t, e, s, i, r, n, o, a, h, c, l, u, d, p, m, g) {
      const f = this.elements;
      return (
        (f[0] = t),
        (f[4] = e),
        (f[8] = s),
        (f[12] = i),
        (f[1] = r),
        (f[5] = n),
        (f[9] = o),
        (f[13] = a),
        (f[2] = h),
        (f[6] = c),
        (f[10] = l),
        (f[14] = u),
        (f[3] = d),
        (f[7] = p),
        (f[11] = m),
        (f[15] = g),
        this
      );
    }
    identity() {
      return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
    }
    clone() {
      return new D().fromArray(this.elements);
    }
    copy(t) {
      const e = this.elements,
        s = t.elements;
      return (
        (e[0] = s[0]),
        (e[1] = s[1]),
        (e[2] = s[2]),
        (e[3] = s[3]),
        (e[4] = s[4]),
        (e[5] = s[5]),
        (e[6] = s[6]),
        (e[7] = s[7]),
        (e[8] = s[8]),
        (e[9] = s[9]),
        (e[10] = s[10]),
        (e[11] = s[11]),
        (e[12] = s[12]),
        (e[13] = s[13]),
        (e[14] = s[14]),
        (e[15] = s[15]),
        this
      );
    }
    copyPosition(t) {
      const e = this.elements,
        s = t.elements;
      return (e[12] = s[12]), (e[13] = s[13]), (e[14] = s[14]), this;
    }
    setFromMatrix3(t) {
      const e = t.elements;
      return (
        this.set(e[0], e[3], e[6], 0, e[1], e[4], e[7], 0, e[2], e[5], e[8], 0, 0, 0, 0, 1), this
      );
    }
    extractBasis(t, e, s) {
      return (
        t.setFromMatrixColumn(this, 0),
        e.setFromMatrixColumn(this, 1),
        s.setFromMatrixColumn(this, 2),
        this
      );
    }
    makeBasis(t, e, s) {
      return this.set(t.x, e.x, s.x, 0, t.y, e.y, s.y, 0, t.z, e.z, s.z, 0, 0, 0, 0, 1), this;
    }
    extractRotation(t) {
      const e = this.elements,
        s = t.elements,
        i = 1 / P.setFromMatrixColumn(t, 0).length(),
        r = 1 / P.setFromMatrixColumn(t, 1).length(),
        n = 1 / P.setFromMatrixColumn(t, 2).length();
      return (
        (e[0] = s[0] * i),
        (e[1] = s[1] * i),
        (e[2] = s[2] * i),
        (e[3] = 0),
        (e[4] = s[4] * r),
        (e[5] = s[5] * r),
        (e[6] = s[6] * r),
        (e[7] = 0),
        (e[8] = s[8] * n),
        (e[9] = s[9] * n),
        (e[10] = s[10] * n),
        (e[11] = 0),
        (e[12] = 0),
        (e[13] = 0),
        (e[14] = 0),
        (e[15] = 1),
        this
      );
    }
    makeRotationFromEuler(t) {
      const e = this.elements,
        s = t.x,
        i = t.y,
        r = t.z,
        n = Math.cos(s),
        o = Math.sin(s),
        a = Math.cos(i),
        h = Math.sin(i),
        c = Math.cos(r),
        l = Math.sin(r);
      if ('XYZ' === t.order) {
        const t = n * c,
          s = n * l,
          i = o * c,
          r = o * l;
        (e[0] = a * c),
          (e[4] = -a * l),
          (e[8] = h),
          (e[1] = s + i * h),
          (e[5] = t - r * h),
          (e[9] = -o * a),
          (e[2] = r - t * h),
          (e[6] = i + s * h),
          (e[10] = n * a);
      } else if ('YXZ' === t.order) {
        const t = a * c,
          s = a * l,
          i = h * c,
          r = h * l;
        (e[0] = t + r * o),
          (e[4] = i * o - s),
          (e[8] = n * h),
          (e[1] = n * l),
          (e[5] = n * c),
          (e[9] = -o),
          (e[2] = s * o - i),
          (e[6] = r + t * o),
          (e[10] = n * a);
      } else if ('ZXY' === t.order) {
        const t = a * c,
          s = a * l,
          i = h * c,
          r = h * l;
        (e[0] = t - r * o),
          (e[4] = -n * l),
          (e[8] = i + s * o),
          (e[1] = s + i * o),
          (e[5] = n * c),
          (e[9] = r - t * o),
          (e[2] = -n * h),
          (e[6] = o),
          (e[10] = n * a);
      } else if ('ZYX' === t.order) {
        const t = n * c,
          s = n * l,
          i = o * c,
          r = o * l;
        (e[0] = a * c),
          (e[4] = i * h - s),
          (e[8] = t * h + r),
          (e[1] = a * l),
          (e[5] = r * h + t),
          (e[9] = s * h - i),
          (e[2] = -h),
          (e[6] = o * a),
          (e[10] = n * a);
      } else if ('YZX' === t.order) {
        const t = n * a,
          s = n * h,
          i = o * a,
          r = o * h;
        (e[0] = a * c),
          (e[4] = r - t * l),
          (e[8] = i * l + s),
          (e[1] = l),
          (e[5] = n * c),
          (e[9] = -o * c),
          (e[2] = -h * c),
          (e[6] = s * l + i),
          (e[10] = t - r * l);
      } else if ('XZY' === t.order) {
        const t = n * a,
          s = n * h,
          i = o * a,
          r = o * h;
        (e[0] = a * c),
          (e[4] = -l),
          (e[8] = h * c),
          (e[1] = t * l + r),
          (e[5] = n * c),
          (e[9] = s * l - i),
          (e[2] = i * l - s),
          (e[6] = o * c),
          (e[10] = r * l + t);
      }
      return (
        (e[3] = 0),
        (e[7] = 0),
        (e[11] = 0),
        (e[12] = 0),
        (e[13] = 0),
        (e[14] = 0),
        (e[15] = 1),
        this
      );
    }
    makeRotationFromQuaternion(t) {
      return this.compose(F, t, L);
    }
    lookAt(t, e, s) {
      const i = this.elements;
      return (
        W.subVectors(t, e),
        0 === W.lengthSq() && (W.z = 1),
        W.normalize(),
        U.crossVectors(s, W),
        0 === U.lengthSq() &&
          (1 === Math.abs(s.z) ? (W.x += 1e-4) : (W.z += 1e-4),
          W.normalize(),
          U.crossVectors(s, W)),
        U.normalize(),
        V.crossVectors(W, U),
        (i[0] = U.x),
        (i[4] = V.x),
        (i[8] = W.x),
        (i[1] = U.y),
        (i[5] = V.y),
        (i[9] = W.y),
        (i[2] = U.z),
        (i[6] = V.z),
        (i[10] = W.z),
        this
      );
    }
    multiply(t) {
      return this.multiplyMatrices(this, t);
    }
    premultiply(t) {
      return this.multiplyMatrices(t, this);
    }
    multiplyMatrices(t, e) {
      const s = t.elements,
        i = e.elements,
        r = this.elements,
        n = s[0],
        o = s[4],
        a = s[8],
        h = s[12],
        c = s[1],
        l = s[5],
        u = s[9],
        d = s[13],
        p = s[2],
        m = s[6],
        g = s[10],
        f = s[14],
        y = s[3],
        b = s[7],
        v = s[11],
        w = s[15],
        x = i[0],
        M = i[4],
        E = i[8],
        _ = i[12],
        O = i[1],
        C = i[5],
        T = i[9],
        A = i[13],
        R = i[2],
        S = i[6],
        I = i[10],
        z = i[14],
        N = i[3],
        D = i[7],
        P = i[11],
        k = i[15];
      return (
        (r[0] = n * x + o * O + a * R + h * N),
        (r[4] = n * M + o * C + a * S + h * D),
        (r[8] = n * E + o * T + a * I + h * P),
        (r[12] = n * _ + o * A + a * z + h * k),
        (r[1] = c * x + l * O + u * R + d * N),
        (r[5] = c * M + l * C + u * S + d * D),
        (r[9] = c * E + l * T + u * I + d * P),
        (r[13] = c * _ + l * A + u * z + d * k),
        (r[2] = p * x + m * O + g * R + f * N),
        (r[6] = p * M + m * C + g * S + f * D),
        (r[10] = p * E + m * T + g * I + f * P),
        (r[14] = p * _ + m * A + g * z + f * k),
        (r[3] = y * x + b * O + v * R + w * N),
        (r[7] = y * M + b * C + v * S + w * D),
        (r[11] = y * E + b * T + v * I + w * P),
        (r[15] = y * _ + b * A + v * z + w * k),
        this
      );
    }
    multiplyScalar(t) {
      const e = this.elements;
      return (
        (e[0] *= t),
        (e[4] *= t),
        (e[8] *= t),
        (e[12] *= t),
        (e[1] *= t),
        (e[5] *= t),
        (e[9] *= t),
        (e[13] *= t),
        (e[2] *= t),
        (e[6] *= t),
        (e[10] *= t),
        (e[14] *= t),
        (e[3] *= t),
        (e[7] *= t),
        (e[11] *= t),
        (e[15] *= t),
        this
      );
    }
    determinant() {
      const t = this.elements,
        e = t[0],
        s = t[4],
        i = t[8],
        r = t[12],
        n = t[1],
        o = t[5],
        a = t[9],
        h = t[13],
        c = t[2],
        l = t[6],
        u = t[10],
        d = t[14];
      return (
        t[3] * (+r * a * l - i * h * l - r * o * u + s * h * u + i * o * d - s * a * d) +
        t[7] * (+e * a * d - e * h * u + r * n * u - i * n * d + i * h * c - r * a * c) +
        t[11] * (+e * h * l - e * o * d - r * n * l + s * n * d + r * o * c - s * h * c) +
        t[15] * (-i * o * c - e * a * l + e * o * u + i * n * l - s * n * u + s * a * c)
      );
    }
    transpose() {
      const t = this.elements;
      let e;
      return (
        (e = t[1]),
        (t[1] = t[4]),
        (t[4] = e),
        (e = t[2]),
        (t[2] = t[8]),
        (t[8] = e),
        (e = t[6]),
        (t[6] = t[9]),
        (t[9] = e),
        (e = t[3]),
        (t[3] = t[12]),
        (t[12] = e),
        (e = t[7]),
        (t[7] = t[13]),
        (t[13] = e),
        (e = t[11]),
        (t[11] = t[14]),
        (t[14] = e),
        this
      );
    }
    setPosition(t, e, s) {
      const i = this.elements;
      return (
        t.isVector3
          ? ((i[12] = t.x), (i[13] = t.y), (i[14] = t.z))
          : ((i[12] = t), (i[13] = e), (i[14] = s)),
        this
      );
    }
    invert() {
      const t = this.elements,
        e = t[0],
        s = t[1],
        i = t[2],
        r = t[3],
        n = t[4],
        o = t[5],
        a = t[6],
        h = t[7],
        c = t[8],
        l = t[9],
        u = t[10],
        d = t[11],
        p = t[12],
        m = t[13],
        g = t[14],
        f = t[15],
        y = l * g * h - m * u * h + m * a * d - o * g * d - l * a * f + o * u * f,
        b = p * u * h - c * g * h - p * a * d + n * g * d + c * a * f - n * u * f,
        v = c * m * h - p * l * h + p * o * d - n * m * d - c * o * f + n * l * f,
        w = p * l * a - c * m * a - p * o * u + n * m * u + c * o * g - n * l * g,
        x = e * y + s * b + i * v + r * w;
      if (0 === x) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      const M = 1 / x;
      return (
        (t[0] = y * M),
        (t[1] = (m * u * r - l * g * r - m * i * d + s * g * d + l * i * f - s * u * f) * M),
        (t[2] = (o * g * r - m * a * r + m * i * h - s * g * h - o * i * f + s * a * f) * M),
        (t[3] = (l * a * r - o * u * r - l * i * h + s * u * h + o * i * d - s * a * d) * M),
        (t[4] = b * M),
        (t[5] = (c * g * r - p * u * r + p * i * d - e * g * d - c * i * f + e * u * f) * M),
        (t[6] = (p * a * r - n * g * r - p * i * h + e * g * h + n * i * f - e * a * f) * M),
        (t[7] = (n * u * r - c * a * r + c * i * h - e * u * h - n * i * d + e * a * d) * M),
        (t[8] = v * M),
        (t[9] = (p * l * r - c * m * r - p * s * d + e * m * d + c * s * f - e * l * f) * M),
        (t[10] = (n * m * r - p * o * r + p * s * h - e * m * h - n * s * f + e * o * f) * M),
        (t[11] = (c * o * r - n * l * r - c * s * h + e * l * h + n * s * d - e * o * d) * M),
        (t[12] = w * M),
        (t[13] = (c * m * i - p * l * i + p * s * u - e * m * u - c * s * g + e * l * g) * M),
        (t[14] = (p * o * i - n * m * i - p * s * a + e * m * a + n * s * g - e * o * g) * M),
        (t[15] = (n * l * i - c * o * i + c * s * a - e * l * a - n * s * u + e * o * u) * M),
        this
      );
    }
    scale(t) {
      const e = this.elements,
        s = t.x,
        i = t.y,
        r = t.z;
      return (
        (e[0] *= s),
        (e[4] *= i),
        (e[8] *= r),
        (e[1] *= s),
        (e[5] *= i),
        (e[9] *= r),
        (e[2] *= s),
        (e[6] *= i),
        (e[10] *= r),
        (e[3] *= s),
        (e[7] *= i),
        (e[11] *= r),
        this
      );
    }
    getMaxScaleOnAxis() {
      const t = this.elements,
        e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2],
        s = t[4] * t[4] + t[5] * t[5] + t[6] * t[6],
        i = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
      return Math.sqrt(Math.max(e, s, i));
    }
    makeTranslation(t, e, s) {
      return this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, s, 0, 0, 0, 1), this;
    }
    makeRotationX(t) {
      const e = Math.cos(t),
        s = Math.sin(t);
      return this.set(1, 0, 0, 0, 0, e, -s, 0, 0, s, e, 0, 0, 0, 0, 1), this;
    }
    makeRotationY(t) {
      const e = Math.cos(t),
        s = Math.sin(t);
      return this.set(e, 0, s, 0, 0, 1, 0, 0, -s, 0, e, 0, 0, 0, 0, 1), this;
    }
    makeRotationZ(t) {
      const e = Math.cos(t),
        s = Math.sin(t);
      return this.set(e, -s, 0, 0, s, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
    }
    makeRotationAxis(t, e) {
      const s = Math.cos(e),
        i = Math.sin(e),
        r = 1 - s,
        n = t.x,
        o = t.y,
        a = t.z,
        h = r * n,
        c = r * o;
      return (
        this.set(
          h * n + s,
          h * o - i * a,
          h * a + i * o,
          0,
          h * o + i * a,
          c * o + s,
          c * a - i * n,
          0,
          h * a - i * o,
          c * a + i * n,
          r * a * a + s,
          0,
          0,
          0,
          0,
          1,
        ),
        this
      );
    }
    makeScale(t, e, s) {
      return this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, s, 0, 0, 0, 0, 1), this;
    }
    makeShear(t, e, s, i, r, n) {
      return this.set(1, s, r, 0, t, 1, n, 0, e, i, 1, 0, 0, 0, 0, 1), this;
    }
    compose(t, e, s) {
      const i = this.elements,
        r = e._x,
        n = e._y,
        o = e._z,
        a = e._w,
        h = r + r,
        c = n + n,
        l = o + o,
        u = r * h,
        d = r * c,
        p = r * l,
        m = n * c,
        g = n * l,
        f = o * l,
        y = a * h,
        b = a * c,
        v = a * l,
        w = s.x,
        x = s.y,
        M = s.z;
      return (
        (i[0] = (1 - (m + f)) * w),
        (i[1] = (d + v) * w),
        (i[2] = (p - b) * w),
        (i[3] = 0),
        (i[4] = (d - v) * x),
        (i[5] = (1 - (u + f)) * x),
        (i[6] = (g + y) * x),
        (i[7] = 0),
        (i[8] = (p + b) * M),
        (i[9] = (g - y) * M),
        (i[10] = (1 - (u + m)) * M),
        (i[11] = 0),
        (i[12] = t.x),
        (i[13] = t.y),
        (i[14] = t.z),
        (i[15] = 1),
        this
      );
    }
    decompose(t, e, s) {
      const i = this.elements;
      let r = P.set(i[0], i[1], i[2]).length();
      const n = P.set(i[4], i[5], i[6]).length(),
        o = P.set(i[8], i[9], i[10]).length();
      this.determinant() < 0 && (r = -r), (t.x = i[12]), (t.y = i[13]), (t.z = i[14]), k.copy(this);
      const a = 1 / r,
        h = 1 / n,
        c = 1 / o;
      return (
        (k.elements[0] *= a),
        (k.elements[1] *= a),
        (k.elements[2] *= a),
        (k.elements[4] *= h),
        (k.elements[5] *= h),
        (k.elements[6] *= h),
        (k.elements[8] *= c),
        (k.elements[9] *= c),
        (k.elements[10] *= c),
        e.setFromRotationMatrix(k),
        (s.x = r),
        (s.y = n),
        (s.z = o),
        this
      );
    }
    makePerspective(t, e, s, i, r, n) {
      const o = this.elements,
        a = (2 * r) / (e - t),
        h = (2 * r) / (s - i),
        c = (e + t) / (e - t),
        l = (s + i) / (s - i),
        u = -(n + r) / (n - r),
        d = (-2 * n * r) / (n - r);
      return (
        (o[0] = a),
        (o[4] = 0),
        (o[8] = c),
        (o[12] = 0),
        (o[1] = 0),
        (o[5] = h),
        (o[9] = l),
        (o[13] = 0),
        (o[2] = 0),
        (o[6] = 0),
        (o[10] = u),
        (o[14] = d),
        (o[3] = 0),
        (o[7] = 0),
        (o[11] = -1),
        (o[15] = 0),
        this
      );
    }
    makeOrthographic(t, e, s, i, r, n) {
      const o = this.elements,
        a = 1 / (e - t),
        h = 1 / (s - i),
        c = 1 / (n - r),
        l = (e + t) * a,
        u = (s + i) * h,
        d = (n + r) * c;
      return (
        (o[0] = 2 * a),
        (o[4] = 0),
        (o[8] = 0),
        (o[12] = -l),
        (o[1] = 0),
        (o[5] = 2 * h),
        (o[9] = 0),
        (o[13] = -u),
        (o[2] = 0),
        (o[6] = 0),
        (o[10] = -2 * c),
        (o[14] = -d),
        (o[3] = 0),
        (o[7] = 0),
        (o[11] = 0),
        (o[15] = 1),
        this
      );
    }
    equals(t) {
      const e = this.elements,
        s = t.elements;
      for (let t = 0; t < 16; t++) if (e[t] !== s[t]) return !1;
      return !0;
    }
    fromArray(t, e = 0) {
      for (let s = 0; s < 16; s++) this.elements[s] = t[s + e];
      return this;
    }
    toArray(t = [], e = 0) {
      const s = this.elements;
      return (
        (t[e] = s[0]),
        (t[e + 1] = s[1]),
        (t[e + 2] = s[2]),
        (t[e + 3] = s[3]),
        (t[e + 4] = s[4]),
        (t[e + 5] = s[5]),
        (t[e + 6] = s[6]),
        (t[e + 7] = s[7]),
        (t[e + 8] = s[8]),
        (t[e + 9] = s[9]),
        (t[e + 10] = s[10]),
        (t[e + 11] = s[11]),
        (t[e + 12] = s[12]),
        (t[e + 13] = s[13]),
        (t[e + 14] = s[14]),
        (t[e + 15] = s[15]),
        t
      );
    }
  }
  const P = new I(),
    k = new D(),
    F = new I(0, 0, 0),
    L = new I(1, 1, 1),
    U = new I(),
    V = new I(),
    W = new I(),
    j = new D(),
    H = new S();
  class B {
    constructor(t = 0, e = 0, s = 0, i = B.DEFAULT_ORDER) {
      (this.isEuler = !0), (this._x = t), (this._y = e), (this._z = s), (this._order = i);
    }
    get x() {
      return this._x;
    }
    set x(t) {
      (this._x = t), this._onChangeCallback();
    }
    get y() {
      return this._y;
    }
    set y(t) {
      (this._y = t), this._onChangeCallback();
    }
    get z() {
      return this._z;
    }
    set z(t) {
      (this._z = t), this._onChangeCallback();
    }
    get order() {
      return this._order;
    }
    set order(t) {
      (this._order = t), this._onChangeCallback();
    }
    set(t, e, s, i = this._order) {
      return (
        (this._x = t),
        (this._y = e),
        (this._z = s),
        (this._order = i),
        this._onChangeCallback(),
        this
      );
    }
    clone() {
      return new this.constructor(this._x, this._y, this._z, this._order);
    }
    copy(t) {
      return (
        (this._x = t._x),
        (this._y = t._y),
        (this._z = t._z),
        (this._order = t._order),
        this._onChangeCallback(),
        this
      );
    }
    setFromRotationMatrix(t, e = this._order, s = !0) {
      const i = t.elements,
        r = i[0],
        n = i[4],
        o = i[8],
        a = i[1],
        h = i[5],
        c = i[9],
        l = i[2],
        u = i[6],
        d = i[10];
      switch (e) {
        case 'XYZ':
          (this._y = Math.asin(R(o, -1, 1))),
            Math.abs(o) < 0.9999999
              ? ((this._x = Math.atan2(-c, d)), (this._z = Math.atan2(-n, r)))
              : ((this._x = Math.atan2(u, h)), (this._z = 0));
          break;
        case 'YXZ':
          (this._x = Math.asin(-R(c, -1, 1))),
            Math.abs(c) < 0.9999999
              ? ((this._y = Math.atan2(o, d)), (this._z = Math.atan2(a, h)))
              : ((this._y = Math.atan2(-l, r)), (this._z = 0));
          break;
        case 'ZXY':
          (this._x = Math.asin(R(u, -1, 1))),
            Math.abs(u) < 0.9999999
              ? ((this._y = Math.atan2(-l, d)), (this._z = Math.atan2(-n, h)))
              : ((this._y = 0), (this._z = Math.atan2(a, r)));
          break;
        case 'ZYX':
          (this._y = Math.asin(-R(l, -1, 1))),
            Math.abs(l) < 0.9999999
              ? ((this._x = Math.atan2(u, d)), (this._z = Math.atan2(a, r)))
              : ((this._x = 0), (this._z = Math.atan2(-n, h)));
          break;
        case 'YZX':
          (this._z = Math.asin(R(a, -1, 1))),
            Math.abs(a) < 0.9999999
              ? ((this._x = Math.atan2(-c, h)), (this._y = Math.atan2(-l, r)))
              : ((this._x = 0), (this._y = Math.atan2(o, d)));
          break;
        case 'XZY':
          (this._z = Math.asin(-R(n, -1, 1))),
            Math.abs(n) < 0.9999999
              ? ((this._x = Math.atan2(u, h)), (this._y = Math.atan2(o, r)))
              : ((this._x = Math.atan2(-c, d)), (this._y = 0));
          break;
        default:
          console.warn('THREE.Euler: .setFromRotationMatrix() encountered an unknown order: ' + e);
      }
      return (this._order = e), !0 === s && this._onChangeCallback(), this;
    }
    setFromQuaternion(t, e, s) {
      return j.makeRotationFromQuaternion(t), this.setFromRotationMatrix(j, e, s);
    }
    setFromVector3(t, e = this._order) {
      return this.set(t.x, t.y, t.z, e);
    }
    reorder(t) {
      return H.setFromEuler(this), this.setFromQuaternion(H, t);
    }
    equals(t) {
      return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order;
    }
    fromArray(t) {
      return (
        (this._x = t[0]),
        (this._y = t[1]),
        (this._z = t[2]),
        void 0 !== t[3] && (this._order = t[3]),
        this._onChangeCallback(),
        this
      );
    }
    toArray(t = [], e = 0) {
      return (
        (t[e] = this._x), (t[e + 1] = this._y), (t[e + 2] = this._z), (t[e + 3] = this._order), t
      );
    }
    _onChange(t) {
      return (this._onChangeCallback = t), this;
    }
    _onChangeCallback() {}
    *[Symbol.iterator]() {
      yield this._x, yield this._y, yield this._z, yield this._order;
    }
  }
  B.DEFAULT_ORDER = 'XYZ';
  class G {
    constructor() {
      this.mask = 1;
    }
    set(t) {
      this.mask = ((1 << t) | 0) >>> 0;
    }
    enable(t) {
      this.mask |= (1 << t) | 0;
    }
    enableAll() {
      this.mask = -1;
    }
    toggle(t) {
      this.mask ^= (1 << t) | 0;
    }
    disable(t) {
      this.mask &= ~((1 << t) | 0);
    }
    disableAll() {
      this.mask = 0;
    }
    test(t) {
      return 0 != (this.mask & t.mask);
    }
    isEnabled(t) {
      return 0 != (this.mask & ((1 << t) | 0));
    }
  }
  class K {
    constructor() {
      (K.prototype.isMatrix3 = !0), (this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]);
    }
    set(t, e, s, i, r, n, o, a, h) {
      const c = this.elements;
      return (
        (c[0] = t),
        (c[1] = i),
        (c[2] = o),
        (c[3] = e),
        (c[4] = r),
        (c[5] = a),
        (c[6] = s),
        (c[7] = n),
        (c[8] = h),
        this
      );
    }
    identity() {
      return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
    }
    copy(t) {
      const e = this.elements,
        s = t.elements;
      return (
        (e[0] = s[0]),
        (e[1] = s[1]),
        (e[2] = s[2]),
        (e[3] = s[3]),
        (e[4] = s[4]),
        (e[5] = s[5]),
        (e[6] = s[6]),
        (e[7] = s[7]),
        (e[8] = s[8]),
        this
      );
    }
    extractBasis(t, e, s) {
      return (
        t.setFromMatrix3Column(this, 0),
        e.setFromMatrix3Column(this, 1),
        s.setFromMatrix3Column(this, 2),
        this
      );
    }
    setFromMatrix4(t) {
      const e = t.elements;
      return this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]), this;
    }
    multiply(t) {
      return this.multiplyMatrices(this, t);
    }
    premultiply(t) {
      return this.multiplyMatrices(t, this);
    }
    multiplyMatrices(t, e) {
      const s = t.elements,
        i = e.elements,
        r = this.elements,
        n = s[0],
        o = s[3],
        a = s[6],
        h = s[1],
        c = s[4],
        l = s[7],
        u = s[2],
        d = s[5],
        p = s[8],
        m = i[0],
        g = i[3],
        f = i[6],
        y = i[1],
        b = i[4],
        v = i[7],
        w = i[2],
        x = i[5],
        M = i[8];
      return (
        (r[0] = n * m + o * y + a * w),
        (r[3] = n * g + o * b + a * x),
        (r[6] = n * f + o * v + a * M),
        (r[1] = h * m + c * y + l * w),
        (r[4] = h * g + c * b + l * x),
        (r[7] = h * f + c * v + l * M),
        (r[2] = u * m + d * y + p * w),
        (r[5] = u * g + d * b + p * x),
        (r[8] = u * f + d * v + p * M),
        this
      );
    }
    multiplyScalar(t) {
      const e = this.elements;
      return (
        (e[0] *= t),
        (e[3] *= t),
        (e[6] *= t),
        (e[1] *= t),
        (e[4] *= t),
        (e[7] *= t),
        (e[2] *= t),
        (e[5] *= t),
        (e[8] *= t),
        this
      );
    }
    determinant() {
      const t = this.elements,
        e = t[0],
        s = t[1],
        i = t[2],
        r = t[3],
        n = t[4],
        o = t[5],
        a = t[6],
        h = t[7],
        c = t[8];
      return e * n * c - e * o * h - s * r * c + s * o * a + i * r * h - i * n * a;
    }
    invert() {
      const t = this.elements,
        e = t[0],
        s = t[1],
        i = t[2],
        r = t[3],
        n = t[4],
        o = t[5],
        a = t[6],
        h = t[7],
        c = t[8],
        l = c * n - o * h,
        u = o * a - c * r,
        d = h * r - n * a,
        p = e * l + s * u + i * d;
      if (0 === p) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
      const m = 1 / p;
      return (
        (t[0] = l * m),
        (t[1] = (i * h - c * s) * m),
        (t[2] = (o * s - i * n) * m),
        (t[3] = u * m),
        (t[4] = (c * e - i * a) * m),
        (t[5] = (i * r - o * e) * m),
        (t[6] = d * m),
        (t[7] = (s * a - h * e) * m),
        (t[8] = (n * e - s * r) * m),
        this
      );
    }
    transpose() {
      let t;
      const e = this.elements;
      return (
        (t = e[1]),
        (e[1] = e[3]),
        (e[3] = t),
        (t = e[2]),
        (e[2] = e[6]),
        (e[6] = t),
        (t = e[5]),
        (e[5] = e[7]),
        (e[7] = t),
        this
      );
    }
    getNormalMatrix(t) {
      return this.setFromMatrix4(t).invert().transpose();
    }
    transposeIntoArray(t) {
      const e = this.elements;
      return (
        (t[0] = e[0]),
        (t[1] = e[3]),
        (t[2] = e[6]),
        (t[3] = e[1]),
        (t[4] = e[4]),
        (t[5] = e[7]),
        (t[6] = e[2]),
        (t[7] = e[5]),
        (t[8] = e[8]),
        this
      );
    }
    setUvTransform(t, e, s, i, r, n, o) {
      const a = Math.cos(r),
        h = Math.sin(r);
      return (
        this.set(
          s * a,
          s * h,
          -s * (a * n + h * o) + n + t,
          -i * h,
          i * a,
          -i * (-h * n + a * o) + o + e,
          0,
          0,
          1,
        ),
        this
      );
    }
    scale(t, e) {
      return this.premultiply(q.makeScale(t, e)), this;
    }
    rotate(t) {
      return this.premultiply(q.makeRotation(-t)), this;
    }
    translate(t, e) {
      return this.premultiply(q.makeTranslation(t, e)), this;
    }
    makeTranslation(t, e) {
      return this.set(1, 0, t, 0, 1, e, 0, 0, 1), this;
    }
    makeRotation(t) {
      const e = Math.cos(t),
        s = Math.sin(t);
      return this.set(e, -s, 0, s, e, 0, 0, 0, 1), this;
    }
    makeScale(t, e) {
      return this.set(t, 0, 0, 0, e, 0, 0, 0, 1), this;
    }
    equals(t) {
      const e = this.elements,
        s = t.elements;
      for (let t = 0; t < 9; t++) if (e[t] !== s[t]) return !1;
      return !0;
    }
    fromArray(t, e = 0) {
      for (let s = 0; s < 9; s++) this.elements[s] = t[s + e];
      return this;
    }
    toArray(t = [], e = 0) {
      const s = this.elements;
      return (
        (t[e] = s[0]),
        (t[e + 1] = s[1]),
        (t[e + 2] = s[2]),
        (t[e + 3] = s[3]),
        (t[e + 4] = s[4]),
        (t[e + 5] = s[5]),
        (t[e + 6] = s[6]),
        (t[e + 7] = s[7]),
        (t[e + 8] = s[8]),
        t
      );
    }
    clone() {
      return new this.constructor().fromArray(this.elements);
    }
  }
  const q = new K();
  let X = 0;
  const Y = new I(),
    Z = new S(),
    Q = new D(),
    $ = new I(),
    J = new I(),
    tt = new I(),
    et = new S(),
    st = new I(1, 0, 0),
    it = new I(0, 1, 0),
    rt = new I(0, 0, 1),
    nt = { type: 'added' },
    ot = { type: 'removed' };
  class at extends class {
    addEventListener(t, e) {
      void 0 === this._listeners && (this._listeners = {});
      const s = this._listeners;
      void 0 === s[t] && (s[t] = []), -1 === s[t].indexOf(e) && s[t].push(e);
    }
    hasEventListener(t, e) {
      if (void 0 === this._listeners) return !1;
      const s = this._listeners;
      return void 0 !== s[t] && -1 !== s[t].indexOf(e);
    }
    removeEventListener(t, e) {
      if (void 0 === this._listeners) return;
      const s = this._listeners[t];
      if (void 0 !== s) {
        const t = s.indexOf(e);
        -1 !== t && s.splice(t, 1);
      }
    }
    dispatchEvent(t) {
      if (void 0 === this._listeners) return;
      const e = this._listeners[t.type];
      if (void 0 !== e) {
        t.target = this;
        const s = e.slice(0);
        for (let e = 0, i = s.length; e < i; e++) s[e].call(this, t);
        t.target = null;
      }
    }
  } {
    constructor() {
      super(),
        (this.isObject3D = !0),
        Object.defineProperty(this, 'id', { value: X++ }),
        (this.uuid = A()),
        (this.name = ''),
        (this.type = 'Object3D'),
        (this.parent = null),
        (this.children = []),
        (this.up = at.DEFAULT_UP.clone());
      const t = new I(),
        e = new B(),
        s = new S(),
        i = new I(1, 1, 1);
      e._onChange(function () {
        s.setFromEuler(e, !1);
      }),
        s._onChange(function () {
          e.setFromQuaternion(s, void 0, !1);
        }),
        Object.defineProperties(this, {
          position: { configurable: !0, enumerable: !0, value: t },
          rotation: { configurable: !0, enumerable: !0, value: e },
          quaternion: { configurable: !0, enumerable: !0, value: s },
          scale: { configurable: !0, enumerable: !0, value: i },
          modelViewMatrix: { value: new D() },
          normalMatrix: { value: new K() },
        }),
        (this.matrix = new D()),
        (this.matrixWorld = new D()),
        (this.matrixAutoUpdate = at.DEFAULT_MATRIX_AUTO_UPDATE),
        (this.matrixWorldNeedsUpdate = !1),
        (this.matrixWorldAutoUpdate = at.DEFAULT_MATRIX_WORLD_AUTO_UPDATE),
        (this.layers = new G()),
        (this.visible = !0),
        (this.castShadow = !1),
        (this.receiveShadow = !1),
        (this.frustumCulled = !0),
        (this.renderOrder = 0),
        (this.animations = []),
        (this.userData = {});
    }
    onBeforeRender() {}
    onAfterRender() {}
    applyMatrix4(t) {
      this.matrixAutoUpdate && this.updateMatrix(),
        this.matrix.premultiply(t),
        this.matrix.decompose(this.position, this.quaternion, this.scale);
    }
    applyQuaternion(t) {
      return this.quaternion.premultiply(t), this;
    }
    setRotationFromAxisAngle(t, e) {
      this.quaternion.setFromAxisAngle(t, e);
    }
    setRotationFromEuler(t) {
      this.quaternion.setFromEuler(t, !0);
    }
    setRotationFromMatrix(t) {
      this.quaternion.setFromRotationMatrix(t);
    }
    setRotationFromQuaternion(t) {
      this.quaternion.copy(t);
    }
    rotateOnAxis(t, e) {
      return Z.setFromAxisAngle(t, e), this.quaternion.multiply(Z), this;
    }
    rotateOnWorldAxis(t, e) {
      return Z.setFromAxisAngle(t, e), this.quaternion.premultiply(Z), this;
    }
    rotateX(t) {
      return this.rotateOnAxis(st, t);
    }
    rotateY(t) {
      return this.rotateOnAxis(it, t);
    }
    rotateZ(t) {
      return this.rotateOnAxis(rt, t);
    }
    translateOnAxis(t, e) {
      return (
        Y.copy(t).applyQuaternion(this.quaternion), this.position.add(Y.multiplyScalar(e)), this
      );
    }
    translateX(t) {
      return this.translateOnAxis(st, t);
    }
    translateY(t) {
      return this.translateOnAxis(it, t);
    }
    translateZ(t) {
      return this.translateOnAxis(rt, t);
    }
    localToWorld(t) {
      return this.updateWorldMatrix(!0, !1), t.applyMatrix4(this.matrixWorld);
    }
    worldToLocal(t) {
      return this.updateWorldMatrix(!0, !1), t.applyMatrix4(Q.copy(this.matrixWorld).invert());
    }
    lookAt(t, e, s) {
      t.isVector3 ? $.copy(t) : $.set(t, e, s);
      const i = this.parent;
      this.updateWorldMatrix(!0, !1),
        J.setFromMatrixPosition(this.matrixWorld),
        this.isCamera || this.isLight ? Q.lookAt(J, $, this.up) : Q.lookAt($, J, this.up),
        this.quaternion.setFromRotationMatrix(Q),
        i &&
          (Q.extractRotation(i.matrixWorld),
          Z.setFromRotationMatrix(Q),
          this.quaternion.premultiply(Z.invert()));
    }
    add(t) {
      if (arguments.length > 1) {
        for (let t = 0; t < arguments.length; t++) this.add(arguments[t]);
        return this;
      }
      return t === this
        ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", t),
          this)
        : (t && t.isObject3D
            ? (null !== t.parent && t.parent.remove(t),
              (t.parent = this),
              this.children.push(t),
              t.dispatchEvent(nt))
            : console.error('THREE.Object3D.add: object not an instance of THREE.Object3D.', t),
          this);
    }
    remove(t) {
      if (arguments.length > 1) {
        for (let t = 0; t < arguments.length; t++) this.remove(arguments[t]);
        return this;
      }
      const e = this.children.indexOf(t);
      return -1 !== e && ((t.parent = null), this.children.splice(e, 1), t.dispatchEvent(ot)), this;
    }
    removeFromParent() {
      const t = this.parent;
      return null !== t && t.remove(this), this;
    }
    clear() {
      for (let t = 0; t < this.children.length; t++) {
        const e = this.children[t];
        (e.parent = null), e.dispatchEvent(ot);
      }
      return (this.children.length = 0), this;
    }
    attach(t) {
      return (
        this.updateWorldMatrix(!0, !1),
        Q.copy(this.matrixWorld).invert(),
        null !== t.parent && (t.parent.updateWorldMatrix(!0, !1), Q.multiply(t.parent.matrixWorld)),
        t.applyMatrix4(Q),
        this.add(t),
        t.updateWorldMatrix(!1, !0),
        this
      );
    }
    getObjectById(t) {
      return this.getObjectByProperty('id', t);
    }
    getObjectByName(t) {
      return this.getObjectByProperty('name', t);
    }
    getObjectByProperty(t, e) {
      if (this[t] === e) return this;
      for (let s = 0, i = this.children.length; s < i; s++) {
        const i = this.children[s].getObjectByProperty(t, e);
        if (void 0 !== i) return i;
      }
    }
    getObjectsByProperty(t, e) {
      let s = [];
      this[t] === e && s.push(this);
      for (let i = 0, r = this.children.length; i < r; i++) {
        const r = this.children[i].getObjectsByProperty(t, e);
        r.length > 0 && (s = s.concat(r));
      }
      return s;
    }
    getWorldPosition(t) {
      return this.updateWorldMatrix(!0, !1), t.setFromMatrixPosition(this.matrixWorld);
    }
    getWorldQuaternion(t) {
      return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(J, t, tt), t;
    }
    getWorldScale(t) {
      return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(J, et, t), t;
    }
    getWorldDirection(t) {
      this.updateWorldMatrix(!0, !1);
      const e = this.matrixWorld.elements;
      return t.set(e[8], e[9], e[10]).normalize();
    }
    raycast() {}
    traverse(t) {
      t(this);
      const e = this.children;
      for (let s = 0, i = e.length; s < i; s++) e[s].traverse(t);
    }
    traverseVisible(t) {
      if (!1 === this.visible) return;
      t(this);
      const e = this.children;
      for (let s = 0, i = e.length; s < i; s++) e[s].traverseVisible(t);
    }
    traverseAncestors(t) {
      const e = this.parent;
      null !== e && (t(e), e.traverseAncestors(t));
    }
    updateMatrix() {
      this.matrix.compose(this.position, this.quaternion, this.scale),
        (this.matrixWorldNeedsUpdate = !0);
    }
    updateMatrixWorld(t) {
      this.matrixAutoUpdate && this.updateMatrix(),
        (this.matrixWorldNeedsUpdate || t) &&
          (null === this.parent
            ? this.matrixWorld.copy(this.matrix)
            : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
          (this.matrixWorldNeedsUpdate = !1),
          (t = !0));
      const e = this.children;
      for (let s = 0, i = e.length; s < i; s++) {
        const i = e[s];
        (!0 !== i.matrixWorldAutoUpdate && !0 !== t) || i.updateMatrixWorld(t);
      }
    }
    updateWorldMatrix(t, e) {
      const s = this.parent;
      if (
        (!0 === t && null !== s && !0 === s.matrixWorldAutoUpdate && s.updateWorldMatrix(!0, !1),
        this.matrixAutoUpdate && this.updateMatrix(),
        null === this.parent
          ? this.matrixWorld.copy(this.matrix)
          : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
        !0 === e)
      ) {
        const t = this.children;
        for (let e = 0, s = t.length; e < s; e++) {
          const s = t[e];
          !0 === s.matrixWorldAutoUpdate && s.updateWorldMatrix(!1, !0);
        }
      }
    }
    toJSON(t) {
      const e = void 0 === t || 'string' == typeof t,
        s = {};
      e &&
        ((t = {
          geometries: {},
          materials: {},
          textures: {},
          images: {},
          shapes: {},
          skeletons: {},
          animations: {},
          nodes: {},
        }),
        (s.metadata = { version: 4.5, type: 'Object', generator: 'Object3D.toJSON' }));
      const i = {};
      function r(e, s) {
        return void 0 === e[s.uuid] && (e[s.uuid] = s.toJSON(t)), s.uuid;
      }
      if (
        ((i.uuid = this.uuid),
        (i.type = this.type),
        '' !== this.name && (i.name = this.name),
        !0 === this.castShadow && (i.castShadow = !0),
        !0 === this.receiveShadow && (i.receiveShadow = !0),
        !1 === this.visible && (i.visible = !1),
        !1 === this.frustumCulled && (i.frustumCulled = !1),
        0 !== this.renderOrder && (i.renderOrder = this.renderOrder),
        Object.keys(this.userData).length > 0 && (i.userData = this.userData),
        (i.layers = this.layers.mask),
        (i.matrix = this.matrix.toArray()),
        (i.up = this.up.toArray()),
        !1 === this.matrixAutoUpdate && (i.matrixAutoUpdate = !1),
        this.isInstancedMesh &&
          ((i.type = 'InstancedMesh'),
          (i.count = this.count),
          (i.instanceMatrix = this.instanceMatrix.toJSON()),
          null !== this.instanceColor && (i.instanceColor = this.instanceColor.toJSON())),
        this.isScene)
      )
        this.background &&
          (this.background.isColor
            ? (i.background = this.background.toJSON())
            : this.background.isTexture && (i.background = this.background.toJSON(t).uuid)),
          this.environment &&
            this.environment.isTexture &&
            !0 !== this.environment.isRenderTargetTexture &&
            (i.environment = this.environment.toJSON(t).uuid);
      else if (this.isMesh || this.isLine || this.isPoints) {
        i.geometry = r(t.geometries, this.geometry);
        const e = this.geometry.parameters;
        if (void 0 !== e && void 0 !== e.shapes) {
          const s = e.shapes;
          if (Array.isArray(s))
            for (let e = 0, i = s.length; e < i; e++) {
              const i = s[e];
              r(t.shapes, i);
            }
          else r(t.shapes, s);
        }
      }
      if (
        (this.isSkinnedMesh &&
          ((i.bindMode = this.bindMode),
          (i.bindMatrix = this.bindMatrix.toArray()),
          void 0 !== this.skeleton &&
            (r(t.skeletons, this.skeleton), (i.skeleton = this.skeleton.uuid))),
        void 0 !== this.material)
      )
        if (Array.isArray(this.material)) {
          const e = [];
          for (let s = 0, i = this.material.length; s < i; s++)
            e.push(r(t.materials, this.material[s]));
          i.material = e;
        } else i.material = r(t.materials, this.material);
      if (this.children.length > 0) {
        i.children = [];
        for (let e = 0; e < this.children.length; e++)
          i.children.push(this.children[e].toJSON(t).object);
      }
      if (this.animations.length > 0) {
        i.animations = [];
        for (let e = 0; e < this.animations.length; e++) {
          const s = this.animations[e];
          i.animations.push(r(t.animations, s));
        }
      }
      if (e) {
        const e = n(t.geometries),
          i = n(t.materials),
          r = n(t.textures),
          o = n(t.images),
          a = n(t.shapes),
          h = n(t.skeletons),
          c = n(t.animations),
          l = n(t.nodes);
        e.length > 0 && (s.geometries = e),
          i.length > 0 && (s.materials = i),
          r.length > 0 && (s.textures = r),
          o.length > 0 && (s.images = o),
          a.length > 0 && (s.shapes = a),
          h.length > 0 && (s.skeletons = h),
          c.length > 0 && (s.animations = c),
          l.length > 0 && (s.nodes = l);
      }
      return (s.object = i), s;
      function n(t) {
        const e = [];
        for (const s in t) {
          const i = t[s];
          delete i.metadata, e.push(i);
        }
        return e;
      }
    }
    clone(t) {
      return new this.constructor().copy(this, t);
    }
    copy(t, e = !0) {
      if (
        ((this.name = t.name),
        this.up.copy(t.up),
        this.position.copy(t.position),
        (this.rotation.order = t.rotation.order),
        this.quaternion.copy(t.quaternion),
        this.scale.copy(t.scale),
        this.matrix.copy(t.matrix),
        this.matrixWorld.copy(t.matrixWorld),
        (this.matrixAutoUpdate = t.matrixAutoUpdate),
        (this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate),
        (this.matrixWorldAutoUpdate = t.matrixWorldAutoUpdate),
        (this.layers.mask = t.layers.mask),
        (this.visible = t.visible),
        (this.castShadow = t.castShadow),
        (this.receiveShadow = t.receiveShadow),
        (this.frustumCulled = t.frustumCulled),
        (this.renderOrder = t.renderOrder),
        (this.userData = JSON.parse(JSON.stringify(t.userData))),
        !0 === e)
      )
        for (let e = 0; e < t.children.length; e++) {
          const s = t.children[e];
          this.add(s.clone());
        }
      return this;
    }
  }
  (at.DEFAULT_UP = new I(0, 1, 0)),
    (at.DEFAULT_MATRIX_AUTO_UPDATE = !0),
    (at.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0);
  class ht extends at {
    constructor() {
      super(),
        (this.isCamera = !0),
        (this.type = 'Camera'),
        (this.matrixWorldInverse = new D()),
        (this.projectionMatrix = new D()),
        (this.projectionMatrixInverse = new D());
    }
    copy(t, e) {
      return (
        super.copy(t, e),
        this.matrixWorldInverse.copy(t.matrixWorldInverse),
        this.projectionMatrix.copy(t.projectionMatrix),
        this.projectionMatrixInverse.copy(t.projectionMatrixInverse),
        this
      );
    }
    getWorldDirection(t) {
      this.updateWorldMatrix(!0, !1);
      const e = this.matrixWorld.elements;
      return t.set(-e[8], -e[9], -e[10]).normalize();
    }
    updateMatrixWorld(t) {
      super.updateMatrixWorld(t), this.matrixWorldInverse.copy(this.matrixWorld).invert();
    }
    updateWorldMatrix(t, e) {
      super.updateWorldMatrix(t, e), this.matrixWorldInverse.copy(this.matrixWorld).invert();
    }
    clone() {
      return new this.constructor().copy(this);
    }
  }
  class ct extends ht {
    constructor(t = 50, e = 1, s = 0.1, i = 2e3) {
      super(),
        (this.isPerspectiveCamera = !0),
        (this.type = 'PerspectiveCamera'),
        (this.fov = t),
        (this.zoom = 1),
        (this.near = s),
        (this.far = i),
        (this.focus = 10),
        (this.aspect = e),
        (this.view = null),
        (this.filmGauge = 35),
        (this.filmOffset = 0),
        this.updateProjectionMatrix();
    }
    copy(t, e) {
      return (
        super.copy(t, e),
        (this.fov = t.fov),
        (this.zoom = t.zoom),
        (this.near = t.near),
        (this.far = t.far),
        (this.focus = t.focus),
        (this.aspect = t.aspect),
        (this.view = null === t.view ? null : Object.assign({}, t.view)),
        (this.filmGauge = t.filmGauge),
        (this.filmOffset = t.filmOffset),
        this
      );
    }
    setFocalLength(t) {
      const e = (0.5 * this.getFilmHeight()) / t;
      (this.fov = 2 * T * Math.atan(e)), this.updateProjectionMatrix();
    }
    getFocalLength() {
      const t = Math.tan(0.5 * C * this.fov);
      return (0.5 * this.getFilmHeight()) / t;
    }
    getEffectiveFOV() {
      return 2 * T * Math.atan(Math.tan(0.5 * C * this.fov) / this.zoom);
    }
    getFilmWidth() {
      return this.filmGauge * Math.min(this.aspect, 1);
    }
    getFilmHeight() {
      return this.filmGauge / Math.max(this.aspect, 1);
    }
    setViewOffset(t, e, s, i, r, n) {
      (this.aspect = t / e),
        null === this.view &&
          (this.view = {
            enabled: !0,
            fullWidth: 1,
            fullHeight: 1,
            offsetX: 0,
            offsetY: 0,
            width: 1,
            height: 1,
          }),
        (this.view.enabled = !0),
        (this.view.fullWidth = t),
        (this.view.fullHeight = e),
        (this.view.offsetX = s),
        (this.view.offsetY = i),
        (this.view.width = r),
        (this.view.height = n),
        this.updateProjectionMatrix();
    }
    clearViewOffset() {
      null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix();
    }
    updateProjectionMatrix() {
      const t = this.near;
      let e = (t * Math.tan(0.5 * C * this.fov)) / this.zoom,
        s = 2 * e,
        i = this.aspect * s,
        r = -0.5 * i;
      const n = this.view;
      if (null !== this.view && this.view.enabled) {
        const t = n.fullWidth,
          o = n.fullHeight;
        (r += (n.offsetX * i) / t),
          (e -= (n.offsetY * s) / o),
          (i *= n.width / t),
          (s *= n.height / o);
      }
      const o = this.filmOffset;
      0 !== o && (r += (t * o) / this.getFilmWidth()),
        this.projectionMatrix.makePerspective(r, r + i, e, e - s, t, this.far),
        this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
    }
    toJSON(t) {
      const e = super.toJSON(t);
      return (
        (e.object.fov = this.fov),
        (e.object.zoom = this.zoom),
        (e.object.near = this.near),
        (e.object.far = this.far),
        (e.object.focus = this.focus),
        (e.object.aspect = this.aspect),
        null !== this.view && (e.object.view = Object.assign({}, this.view)),
        (e.object.filmGauge = this.filmGauge),
        (e.object.filmOffset = this.filmOffset),
        e
      );
    }
  }
  const lt = (t, e, s = 1e-5) => Math.abs(t - e) <= s,
    ut = (t, e, s = 1e-5) => lt(t.x, e.x, s) && lt(t.y, e.y, s),
    dt = (t, e, s = 1e-5) => ut(t, e, s) && lt(t.z, e.z, s);
  function pt(t, e) {
    (t.x = e.x), (t.y = e.y);
  }
  function mt(t, e) {
    pt(t, e), (t.z = e.z);
  }
  class gt extends Error {
    constructor(t, e) {
      var s;
      super(t instanceof Error ? t.message : t),
        (this.name = 'BaseException'),
        e && (this.code = e),
        t instanceof Error &&
          ((this.originalError = t),
          (s = t) && s instanceof Error && s.isMock && (this.isMock = !0));
    }
  }
  function ft(t, e) {
    const s = e.length;
    t.length = s;
    for (let i = 0; i < s; ++i) t[i] = e[i];
    return t;
  }
  class yt extends gt {
    constructor() {
      super('Cannot copy into an array of a different size'), (this.name = 'ArraySizeMismatch');
    }
  }
  function bt(t, e) {
    const s = 1e-5;
    return (
      t.mode === e.mode &&
      t.sweep === e.sweep &&
      dt(t.position, e.position, s) &&
      ut(t.rotation, e.rotation, s) &&
      ((t, e, s = 1e-5) =>
        t.length === e.length && !Array.prototype.some.call(t, (t, i) => !lt(t, e[i], s)))(
        t.projection,
        e.projection,
        s,
      )
    );
  }
  function vt(t, e) {
    (t.sweep = e.sweep),
      (t.mode = e.mode),
      mt(t.position, e.position),
      pt(t.rotation, e.rotation),
      (function (t, e) {
        if (t.byteLength !== e.byteLength) throw new yt();
        const s = e.length;
        for (let i = 0; i < s; ++i) t[i] = e[i];
      })(t.projection, e.projection);
  }
  var wt, xt, Mt, Et, _t, Ot, Ct, Tt, At, Rt, St, It, zt, Nt, Dt, Pt, kt, Ft, Lt, Ut, Vt;
  !(function (t) {
    let e, s, i, r;
    !(function (t) {
      t.PHASE_CHANGE = 'application.phasechange';
    })((e = t.Event || (t.Event = {}))),
      (function (t) {
        (t.UNINITIALIZED = 'appphase.uninitialized'),
          (t.WAITING = 'appphase.waiting'),
          (t.LOADING = 'appphase.loading'),
          (t.STARTING = 'appphase.starting'),
          (t.PLAYING = 'appphase.playing'),
          (t.ERROR = 'appphase.error');
      })((s = t.Phase || (t.Phase = {}))),
      (function (t) {
        (t.UNKNOWN = 'application.unknown'),
          (t.WEBVR = 'application.webvr'),
          (t.SHOWCASE = 'application.showcase'),
          (t.WORKSHOP = 'application.workshop');
      })((i = t.Application || (t.Application = {}))),
      (function (t) {
        t.RoomBounds = 'feature.roombounds';
      })((r = t.Feature || (t.Feature = {})));
  })(wt || (wt = {})),
    (function (t) {
      let e, s, i;
      !(function (t) {
        (t.IMAGE = 'image'),
          (t.PDF = 'pdf'),
          (t.VIDEO = 'video'),
          (t.RICH = 'rich'),
          (t.ZIP = 'zip'),
          (t.TEXT = 'text'),
          (t.AUDIO = 'audio'),
          (t.MODEL = 'model'),
          (t.APPLICATION = 'application');
      })((e = t.MediaType || (t.MediaType = {}))),
        (function (t) {
          (t.EXTERNAL = 'external'), (t.UPLOAD = 'upload'), (t.SANDBOX = 'sandbox');
        })((s = t.AttachmentCategory || (t.AttachmentCategory = {}))),
        (function (t) {
          (t.COMMENT = 'comment'), (t.MATTERTAG = 'mattertag');
        })((i = t.ParentType || (t.ParentType = {})));
    })(xt || (xt = {})),
    (function (t) {
      let e, s;
      !(function (t) {
        t.MOVE = 'camera.move';
      })((e = t.Event || (t.Event = {}))),
        (function (t) {
          (t.FORWARD = 'FORWARD'),
            (t.LEFT = 'LEFT'),
            (t.RIGHT = 'RIGHT'),
            (t.BACK = 'BACK'),
            (t.UP = 'UP'),
            (t.DOWN = 'DOWN');
        })((s = t.Direction || (t.Direction = {})));
    })(Mt || (Mt = {})),
    (function (t) {
      let e;
      !(function (t) {
        (t.CHANGE_START = 'floors.changestart'), (t.CHANGE_END = 'floors.changeend');
      })((e = t.Event || (t.Event = {})));
    })(Et || (Et = {})),
    (function (t) {
      let e;
      !(function (t) {
        (t.SUCCESS = 'astar.status.success'),
          (t.NO_PATH = 'astar.status.no_path'),
          (t.TIMEOUT = 'astar.status.timeout'),
          (t.NO_START_VERTEX = 'astar.status.no_start'),
          (t.NO_END_VERTEX = 'astar.status.no_end');
      })((e = t.AStarStatus || (t.AStarStatus = {})));
    })(_t || (_t = {})),
    (function (t) {
      let e;
      !(function (t) {
        t.POSITION_UPDATED = 'label.positionupdated';
      })((e = t.Event || (t.Event = {})));
    })(Ot || (Ot = {})),
    (function (t) {
      let e, s, i;
      !(function (t) {
        (t.WINDOW = 'link.creationpolicy.window'),
          (t.REFERRER = 'link.creationpolicy.referrer'),
          (t.MATTERPORT = 'link.creationpolicy.matterport');
      })((e = t.CreationPolicy || (t.CreationPolicy = {}))),
        (function (t) {
          (t.DEFAULT = 'link.openpolicy.default'),
            (t.NEW_WINDOW = 'link.openpolicy.newwindow'),
            (t.SAME_FRAME = 'link.openpolicy.sameframe'),
            (t.CURRENT_WINDOW = 'link.openpolicy.current');
        })((s = t.OpenPolicy || (t.OpenPolicy = {}))),
        (function (t) {
          (t.DEFAULT = 'link.destination.default'), (t.MATTERPORT = 'link.destination.matterport');
        })((i = t.DestinationPolicy || (t.DestinationPolicy = {})));
    })(Ct || (Ct = {})),
    (function (t) {
      let e, s, i, r, n;
      !(function (t) {
        (t.INSTANT = 'transition.instant'),
          (t.FLY = 'transition.fly'),
          (t.FADEOUT = 'transition.fade');
      })((e = t.Transition || (t.Transition = {}))),
        (function (t) {
          (t.NAVIGATION = 'tag.link.nav'),
            (t.MODEL = 'tag.link.model'),
            (t.EXT_LINK = 'tag.link.ext');
        })((s = t.LinkType || (t.LinkType = {}))),
        (function (t) {
          (t.NONE = 'tag.chunk.none'), (t.TEXT = 'tag.chunk.text'), (t.LINK = 'tag.chunk.link');
        })((i = t.DescriptionChunkType || (t.DescriptionChunkType = {}))),
        (function (t) {
          (t.HOVER = 'tag.hover'), (t.CLICK = 'tag.click'), (t.LINK_OPEN = 'tag.linkopen');
        })((r = t.Event || (t.Event = {}))),
        (function (t) {
          (t.NONE = 'mattertag.media.none'),
            (t.PHOTO = 'mattertag.media.photo'),
            (t.VIDEO = 'mattertag.media.video'),
            (t.RICH = 'mattertag.media.rich');
        })((n = t.MediaType || (t.MediaType = {})));
    })(Tt || (Tt = {})),
    (function (t) {
      let e, s, i;
      !(function (t) {
        (t.INSIDE = 'mode.inside'),
          (t.OUTSIDE = 'mode.outside'),
          (t.DOLLHOUSE = 'mode.dollhouse'),
          (t.FLOORPLAN = 'mode.floorplan'),
          (t.TRANSITIONING = 'mode.transitioning');
      })((e = t.Mode || (t.Mode = {}))),
        (function (t) {
          (t.CHANGE_START = 'viewmode.changestart'), (t.CHANGE_END = 'viewmode.changeend');
        })((s = t.Event || (t.Event = {}))),
        (function (t) {
          (t.INSTANT = 'transition.instant'),
            (t.FLY = 'transition.fly'),
            (t.FADEOUT = 'transition.fade');
        })((i = t.TransitionType || (t.TransitionType = {})));
    })(At || (At = {})),
    (function (t) {
      let e;
      !(function (t) {
        t.MODEL_LOADED = 'model.loaded';
      })((e = t.Event || (t.Event = {})));
    })(Rt || (Rt = {})),
    (function (t) {
      let e;
      !(function (t) {
        (t.NONE = 'intersectedobject.none'),
          (t.MODEL = 'intersectedobject.model'),
          (t.TAG = 'intersectedobject.tag'),
          (t.SWEEP = 'intersectedobject.sweep'),
          (t.UNKNOWN = 'intersectedobject.unknown');
      })((e = t.Colliders || (t.Colliders = {})));
    })(St || (St = {})),
    It || (It = {}),
    (function (t) {
      let e, s;
      !(function (t) {
        t.CAMERA = 'sensor.sensortype.camera';
      })((e = t.SensorType || (t.SensorType = {}))),
        (function (t) {
          (t.SPHERE = 'sensor.sourcetype.sphere'),
            (t.BOX = 'sensor.sourcetype.box'),
            (t.CYLINDER = 'sensor.sourcetype.cylinder');
        })((s = t.SourceType || (t.SourceType = {})));
    })(zt || (zt = {})),
    (function (t) {
      let e, s, i, r;
      !(function (t) {
        (t.ENTER = 'sweep.enter'), (t.EXIT = 'sweep.exit');
      })((e = t.Event || (t.Event = {}))),
        (function (t) {
          (t.INSTANT = 'transition.instant'),
            (t.FLY = 'transition.fly'),
            (t.FADEOUT = 'transition.fade');
        })((s = t.Transition || (t.Transition = {}))),
        (function (t) {
          (t.ALIGNED = 'aligned'), (t.UNALIGNED = 'unaligned');
        })((i = t.Alignment || (t.Alignment = {}))),
        (function (t) {
          (t.UNPLACED = 'unplaced'), (t.AUTO = 'auto'), (t.MANUAL = 'manual');
        })((r = t.Placement || (t.Placement = {})));
    })(Nt || (Nt = {})),
    (function (t) {
      let e;
      !(function (t) {
        (t.UNKNOWN = 'tag.attachment.unknown'),
          (t.APPLICATION = 'tag.attachment.application'),
          (t.AUDIO = 'tag.attachment.audio'),
          (t.IMAGE = 'tag.attachment.image'),
          (t.MODEL = 'tag.attachment.model'),
          (t.PDF = 'tag.attachment.pdf'),
          (t.RICH = 'tag.attachment.rich'),
          (t.TEXT = 'tag.attachment.text'),
          (t.VIDEO = 'tag.attachment.video'),
          (t.ZIP = 'tag.attachment.zip'),
          (t.SANDBOX = 'tag.attachment.sandbox');
      })((e = t.AttachmentType || (t.AttachmentType = {})));
    })(Dt || (Dt = {})),
    (function (t) {
      let e, s;
      !(function (t) {
        (t.STARTED = 'tour.started'),
          (t.STOPPED = 'tour.stopped'),
          (t.ENDED = 'tour.ended'),
          (t.STEPPED = 'tour.stepped');
      })((e = t.Event || (t.Event = {}))),
        (function (t) {
          (t.INACTIVE = 'tour.inactive'),
            (t.ACTIVE = 'tour.active'),
            (t.STOP_SCHEDULED = 'tour.stopscheduled');
        })((s = t.PlayState || (t.PlayState = {})));
    })(Pt || (Pt = {})),
    (function (t) {
      let e, s, i;
      !(function (t) {
        (t.OBJ_LOADER = 'mp.objLoader'),
          (t.FBX_LOADER = 'mp.fbxLoader'),
          (t.DAE_LOADER = 'mp.daeLoader'),
          (t.GLTF_LOADER = 'mp.gltfLoader'),
          (t.SCROLLING_TUBE = 'mp.scrollingTube'),
          (t.TRANSFORM_CONTROLS = 'mp.transformControls'),
          (t.LIGHTS_COMPONENT = 'mp.lights'),
          (t.POINT_LIGHT = 'mp.pointLight'),
          (t.DIRECTIONAL_LIGHT = 'mp.directionalLight'),
          (t.AMBIENT_LIGHT = 'mp.ambientLight'),
          (t.CAMERA = 'mp.camera'),
          (t.INPUT = 'mp.input'),
          (t.XR = 'mp.xr');
      })((e = t.Component || (t.Component = {}))),
        (function (t) {
          (t.CLICK = 'INTERACTION.CLICK'),
            (t.HOVER = 'INTERACTION.HOVER'),
            (t.DRAG = 'INTERACTION.DRAG'),
            (t.DRAG_BEGIN = 'INTERACTION.DRAG_BEGIN'),
            (t.DRAG_END = 'INTERACTION.DRAG_END'),
            (t.POINTER_MOVE = 'INTERACTION.POINTER_MOVE'),
            (t.POINTER_BUTTON = 'INTERACTION.POINTER_BUTTON'),
            (t.SCROLL = 'INTERACTION.SCROLL'),
            (t.KEY = 'INTERACTION.KEY'),
            (t.LONG_PRESS_START = 'INTERACTION.LONG_PRESS_START'),
            (t.LONG_PRESS_END = 'INTERACTION.LONG_PRESS_END'),
            (t.MULTI_SWIPE = 'INTERACTION.MULTI_SWIPE'),
            (t.MULTI_SWIPE_END = 'INTERACTION.MULTI_SWIPE_END'),
            (t.PINCH = 'INTERACTION.PINCH'),
            (t.PINCH_END = 'INTERACTION.PINCH_END'),
            (t.ROTATE = 'INTERACTION.ROTATE'),
            (t.ROTATE_END = 'INTERACTION.ROTATE_END');
        })((s = t.InteractionType || (t.InteractionType = {}))),
        (function (t) {
          (t.INPUT = 'input'), (t.OUTPUT = 'output'), (t.EVENT = 'event'), (t.EMIT = 'emit');
        })((i = t.PathType || (t.PathType = {})));
    })(kt || (kt = {})),
    (function (t) {
      (t[(t.BACKSPACE = 8)] = 'BACKSPACE'),
        (t[(t.TAB = 9)] = 'TAB'),
        (t[(t.RETURN = 13)] = 'RETURN'),
        (t[(t.SHIFT = 16)] = 'SHIFT'),
        (t[(t.CONTROL = 17)] = 'CONTROL'),
        (t[(t.ALT = 18)] = 'ALT'),
        (t[(t.ESCAPE = 27)] = 'ESCAPE'),
        (t[(t.SPACE = 32)] = 'SPACE'),
        (t[(t.HASH = 35)] = 'HASH'),
        (t[(t.LEFTARROW = 37)] = 'LEFTARROW'),
        (t[(t.UPARROW = 38)] = 'UPARROW'),
        (t[(t.RIGHTARROW = 39)] = 'RIGHTARROW'),
        (t[(t.DOWNARROW = 40)] = 'DOWNARROW'),
        (t[(t.DELETE = 46)] = 'DELETE'),
        (t[(t.ZERO = 48)] = 'ZERO'),
        (t[(t.ONE = 49)] = 'ONE'),
        (t[(t.TWO = 50)] = 'TWO'),
        (t[(t.THREE = 51)] = 'THREE'),
        (t[(t.FOUR = 52)] = 'FOUR'),
        (t[(t.FIVE = 53)] = 'FIVE'),
        (t[(t.SIX = 54)] = 'SIX'),
        (t[(t.SEVEN = 55)] = 'SEVEN'),
        (t[(t.EIGHT = 56)] = 'EIGHT'),
        (t[(t.NINE = 57)] = 'NINE'),
        (t[(t.AT = 64)] = 'AT'),
        (t[(t.A = 65)] = 'A'),
        (t[(t.B = 66)] = 'B'),
        (t[(t.C = 67)] = 'C'),
        (t[(t.D = 68)] = 'D'),
        (t[(t.E = 69)] = 'E'),
        (t[(t.F = 70)] = 'F'),
        (t[(t.G = 71)] = 'G'),
        (t[(t.H = 72)] = 'H'),
        (t[(t.I = 73)] = 'I'),
        (t[(t.J = 74)] = 'J'),
        (t[(t.K = 75)] = 'K'),
        (t[(t.L = 76)] = 'L'),
        (t[(t.M = 77)] = 'M'),
        (t[(t.N = 78)] = 'N'),
        (t[(t.O = 79)] = 'O'),
        (t[(t.P = 80)] = 'P'),
        (t[(t.Q = 81)] = 'Q'),
        (t[(t.R = 82)] = 'R'),
        (t[(t.S = 83)] = 'S'),
        (t[(t.T = 84)] = 'T'),
        (t[(t.U = 85)] = 'U'),
        (t[(t.V = 86)] = 'V'),
        (t[(t.W = 87)] = 'W'),
        (t[(t.X = 88)] = 'X'),
        (t[(t.Y = 89)] = 'Y'),
        (t[(t.Z = 90)] = 'Z'),
        (t[(t.SEMICOLON = 186)] = 'SEMICOLON'),
        (t[(t.PLUSEQUALS = 187)] = 'PLUSEQUALS'),
        (t[(t.COMMA = 188)] = 'COMMA'),
        (t[(t.DASHUNDERSCORE = 189)] = 'DASHUNDERSCORE'),
        (t[(t.PERIOD = 190)] = 'PERIOD'),
        (t[(t.OPENBRACKET = 219)] = 'OPENBRACKET');
    })(Ft || (Ft = {})),
    (function (t) {
      (t[(t.DOWN = 0)] = 'DOWN'), (t[(t.PRESSED = 1)] = 'PRESSED'), (t[(t.UP = 2)] = 'UP');
    })(Lt || (Lt = {})),
    (function (t) {
      (t[(t.PRIMARY = 0)] = 'PRIMARY'),
        (t[(t.MIDDLE = 1)] = 'MIDDLE'),
        (t[(t.SECONDARY = 2)] = 'SECONDARY'),
        (t[(t.BACK = 3)] = 'BACK'),
        (t[(t.FORWARD = 4)] = 'FORWARD'),
        (t[(t.COUNT = 5)] = 'COUNT');
    })(Ut || (Ut = {})),
    (function (t) {
      (t[(t.NONE = 0)] = 'NONE'),
        (t[(t.PRIMARY = 1)] = 'PRIMARY'),
        (t[(t.SECONDARY = 4)] = 'SECONDARY'),
        (t[(t.MIDDLE = 2)] = 'MIDDLE'),
        (t[(t.BACK = 8)] = 'BACK'),
        (t[(t.FORWARD = 16)] = 'FORWARD'),
        (t[(t.ALL = 31)] = 'ALL');
    })(Vt || (Vt = {}));
  const Wt = Math.PI / 180;
  class jt {
    constructor() {
      (this.tempEuler = new B()),
        (this.tempPosition = new I()),
        (this.camera = new ct()),
        (this.cameraPose = null);
    }
    setCameraFromPose(t) {
      if (this.cameraPose && bt(this.cameraPose, t)) return;
      (this.cameraPose = this.cameraPose || Ht), vt(this.cameraPose, t);
      const e = t.position;
      this.camera.position.set(e.x, e.y, e.z);
      const s = t.rotation;
      this.tempEuler.set(s.x * Wt, s.y * Wt, 0, 'YXZ'),
        this.camera.quaternion.setFromEuler(this.tempEuler),
        this.camera.updateMatrixWorld(),
        this.camera.projectionMatrix.fromArray(t.projection).transpose();
    }
    worldToNDC(t, e) {
      return (
        this.tempPosition.set(t.x, t.y, t.z),
        this.tempPosition.project(this.camera),
        ((e = e || { x: 0, y: 0, z: 0 }).x = this.tempPosition.x),
        (e.y = this.tempPosition.y),
        (e.z = this.tempPosition.z),
        e
      );
    }
    worldToScreen(t, e, s) {
      return (
        ((s = this.worldToNDC(t, s)).x = 0.5 * (s.x + 1) * e.w),
        (s.y = -0.5 * (s.y - 1) * e.h),
        (s.z < -1 || s.z > 1) && ((s.x = -Math.abs(s.x)), (s.y = -Math.abs(s.y))),
        s
      );
    }
  }
  const Ht = {
    sweep: '',
    mode: At.Mode.DOLLHOUSE,
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0 },
    projection: new Float32Array(16),
  };
  class Bt {
    constructor(t) {
      (this.observers = new Set()),
        (this.refreshListeners = new Set()),
        (this.errorListeners = new Set()),
        (this.updateTokenCall = t.functionRegister.register('OAuth.updateToken', {
          namespace: 'OAuth',
          name: 'updateToken',
          args: ['token'],
        }));
      const e = this;
      this.TokenRefresher = class {
        constructor(t, s) {
          e.scheduleRefresh(t, s);
        }
        dispose() {
          clearTimeout(e.refreshTimeout);
        }
        on(t, s) {
          if ('string' == typeof t) {
            if (!s || 'function' != typeof s)
              throw Error('The callback provided was not a valid function');
            if ('refresh' === t) return e.addRefreshListener(s);
            if ('error' === t) return e.addErrorListener(s);
          } else if (!('onRefresh' in t) && !('onError' in t))
            throw Error('The observer provided was not a valid IRefreshObserver');
          return e.addObserver(t);
        }
      };
    }
    create(t, e) {
      return new this.TokenRefresher(t, e);
    }
    addRefreshListener(t) {
      return (
        this.refreshListeners.add(t),
        {
          cancel() {
            this.refreshListeners.delete(t);
          },
        }
      );
    }
    addErrorListener(t) {
      return (
        this.errorListeners.add(t),
        {
          cancel() {
            this.errorListeners.delete(t);
          },
        }
      );
    }
    addObserver(t) {
      return (
        this.observers.add(t),
        {
          cancel() {
            this.observers.delete(t);
          },
        }
      );
    }
    scheduleRefresh(t, e) {
      this.refreshTimeout = setTimeout(
        async () => {
          let s;
          try {
            if (((s = await e.fetch(t.access_token)), !s))
              throw Error('The "tokenFetcher" did not fetch anything');
            if ('string' != typeof s.access_token)
              throw Error(
                'The "tokenFetcher" fetched an object that did not have a valid "access_token" property.',
              );
            if ('number' != typeof s.expires_in)
              throw Error(
                'The "tokenFetcher" fetched an object that did not have a valid "expires_in" property',
              );
          } catch (t) {
            return void this.notifyError(t);
          }
          this.updateTokenCall(s.access_token), this.notifyRefresh(), this.scheduleRefresh(s, e);
        },
        1e3 * (t.expires_in - 60),
      );
    }
    notifyRefresh() {
      for (const t of this.refreshListeners) t();
      for (const t of this.observers) t.onRefresh && t.onRefresh();
    }
    notifyError(t) {
      for (const e of this.errorListeners) e(t);
      for (const e of this.observers) e.onError && e.onError(t);
    }
  }
  class Gt {
    constructor() {
      this.observers = new Set();
    }
    observe(t) {
      this.observers.add(t);
      const e = this;
      return {
        renew() {
          e.observers.add(t);
        },
        cancel() {
          e.removeObserver(t);
        },
      };
    }
    removeObserver(t) {
      this.observers.delete(t);
    }
    notify() {
      for (const t of this.observers) t.notify();
    }
  }
  class Kt {
    constructor(t) {
      (this.comparator = t), (this.nodes = []);
    }
    push(t) {
      return this.nodes.push(t), this.siftdown(0, this.nodes.length - 1);
    }
    pop() {
      let t, e;
      return this.nodes.length && ((t = this.nodes.pop()), t)
        ? (this.nodes.length ? ((e = this.nodes[0]), (this.nodes[0] = t), this.siftup(0)) : (e = t),
          e)
        : null;
    }
    peek() {
      return this.nodes[0];
    }
    contains(t) {
      return -1 !== this.nodes.indexOf(t);
    }
    replace(t) {
      if (this.nodes.length) {
        const e = this.nodes[0];
        return (this.nodes[0] = t), this.siftup(0), e;
      }
      return null;
    }
    _pushpop(t, e, s) {
      let i;
      const r = s || this.defaultCompare;
      return (
        t.length &&
          r(t[0], e) < 0 &&
          ((i = [t[0], e]), (e = i[0]), (t[0] = i[1]), this._siftup(t, 0, r)),
        e
      );
    }
    pushpop(t) {
      return this._pushpop(this.nodes, t, this.comparator);
    }
    _heapify(t, e) {
      let s, i, r, n, o, a;
      const h = Math.floor(t.length / 2),
        c = function () {
          for (a = [], r = 0, o = h; 0 <= o ? r < o : r > o; 0 <= o ? r++ : r--) a.push(r);
          return a;
        }
          .apply(this)
          .reverse(),
        l = [];
      for (i = 0, n = c.length; i < n; i++) (s = c[i]), l.push(this._siftup(t, s, e));
      return l;
    }
    heapify() {
      let t, e, s, i, r, n;
      const o = Math.floor(this.nodes.length / 2),
        a = function () {
          for (n = [], s = 0, r = o; 0 <= r ? s < r : s > r; 0 <= r ? s++ : s--) n.push(s);
          return n;
        }
          .apply(this)
          .reverse(),
        h = [];
      for (e = 0, i = a.length; e < i; e++) (t = a[e]), h.push(this.siftup(t));
      return h;
    }
    updateItem(t) {
      const e = this.nodes.indexOf(t);
      return -1 === e ? null : (this.siftdown(0, e), this.siftup(e));
    }
    clear() {
      return (this.nodes = []);
    }
    empty() {
      return 0 === this.nodes.length;
    }
    size() {
      return this.nodes.length;
    }
    clone() {
      const t = new Kt(this.comparator);
      return (t.nodes = this.nodes.slice(0)), t;
    }
    toArray() {
      return this.nodes.slice(0);
    }
    insert(t) {
      return this.push(t);
    }
    top() {
      return this.peek();
    }
    front() {
      return this.peek();
    }
    has(t) {
      return this.contains(t);
    }
    copy() {
      return this.clone();
    }
    nlargest(t) {
      let e, s, i;
      const r = this.nodes.slice(0, t);
      if (!r.length) return r;
      this._heapify(r, this.comparator);
      const n = this.nodes.slice(t);
      for (s = 0, i = n.length; s < i; s++) (e = n[s]), this._pushpop(r, e, this.comparator);
      return r.sort(this.comparator).reverse();
    }
    defaultCompare(t, e) {
      return t < e ? -1 : t > e ? 1 : 0;
    }
    _siftdown(t, e, s, i) {
      let r, n;
      const o = i || this.defaultCompare,
        a = t[s];
      for (; s > e && ((n = (s - 1) >> 1), (r = t[n]), o(a, r) < 0); ) (t[s] = r), (s = n);
      return (t[s] = a);
    }
    siftdown(t, e) {
      return this._siftdown(this.nodes, t, e, this.comparator);
    }
    _siftup(t, e, s) {
      let i, r;
      const n = s || this.defaultCompare,
        o = t.length,
        a = e,
        h = t[e];
      for (i = 2 * e + 1; i < o; )
        (r = i + 1), r < o && !(n(t[i], t[r]) < 0) && (i = r), (t[e] = t[i]), (i = 2 * (e = i) + 1);
      return (t[e] = h), this._siftdown(t, a, e, n);
    }
    siftup(t) {
      return this._siftup(this.nodes, t, this.comparator);
    }
  }
  var qt;
  function Xt(t) {
    if (void 0 !== t.parent) {
      const e = Xt(t.parent);
      return e.push(t.data), e;
    }
    return [t.data];
  }
  function Yt(t, e) {
    if (t.f && e.f) return t.f - e.f;
    throw new Error('heapComparator() -> Property "f" is undefined.');
  }
  !(function (t) {
    (t[(t.Success = 0)] = 'Success'),
      (t[(t.NoPath = 1)] = 'NoPath'),
      (t[(t.Timeout = 2)] = 'Timeout');
  })(qt || (qt = {}));
  const Zt = {
    [qt.Success]: _t.AStarStatus.SUCCESS,
    [qt.NoPath]: _t.AStarStatus.NO_PATH,
    [qt.Timeout]: _t.AStarStatus.TIMEOUT,
  };
  function Qt() {
    return function (t, e, s, i) {
      const r = (null == i ? void 0 : i.heuristic) || (() => 0);
      let n = !0,
        o = null;
      const a = new Gt();
      const h = new (class {
          exec(i) {
            if (!n && o) return o;
            if (t.vertex(e.id) !== e)
              return { cost: 0, path: [], status: _t.AStarStatus.NO_START_VERTEX };
            if (t.vertex(s.id) !== s)
              return { cost: 0, path: [], status: _t.AStarStatus.NO_END_VERTEX };
            if (((i = parseFloat(i + '') || 5e3), isNaN(i) || i < 0))
              throw Error('the `options.timeout` provided was invalid');
            const {
              status: a,
              cost: h,
              path: c,
            } = (function (t) {
              void 0 === t.timeout && (t.timeout = 1 / 0);
              const e = { data: t.start, g: 0, heuristicValue: t.heuristic(t.start) };
              let s = e;
              e.f = e.heuristicValue;
              const i = new Set(),
                r = new Kt(Yt),
                n = new Map();
              r.push(e), n.set(e.data, e);
              const o = Date.now();
              for (; r.size(); ) {
                if (Date.now() - o > t.timeout)
                  return { status: qt.Timeout, cost: s.g, path: Xt(s) };
                const e = r.pop();
                if ((n.delete(e.data), e && t.isEnd(e.data)))
                  return { status: qt.Success, cost: e.g, path: Xt(e) };
                i.add(e.data);
                const a = t.neighbors(e.data);
                for (const o of a) {
                  if (i.has(o)) continue;
                  const a = e.g + t.distance(e.data, o);
                  let h = n.get(o),
                    c = !1;
                  if (void 0 === h) (h = { data: o, g: 0, heuristicValue: 0, f: 0 }), n.set(o, h);
                  else {
                    if (h.g < a) continue;
                    c = !0;
                  }
                  (h.parent = e || void 0),
                    (h.g = a),
                    (h.heuristicValue = t.heuristic(o)),
                    (h.f = a + h.heuristicValue),
                    h.heuristicValue < s.heuristicValue && (s = h),
                    c ? r.heapify() : r.push(h);
                }
              }
              return { status: qt.NoPath, cost: s.g, path: Xt(s) };
            })({
              start: e,
              isEnd: (t) => t === s,
              distance(e, s) {
                const i = t.edge(e, s);
                return i ? i.weight : 1 / 0;
              },
              heuristic(e, s) {
                const i = t.edge(e, s);
                return i ? r(e, s, i) : 0;
              },
              neighbors: (t) => t.neighbors,
              timeout: i,
            });
            return (
              (o = { status: Zt[a], cost: h, path: Zt[a] === _t.AStarStatus.NO_PATH ? [] : c }),
              (n = !1),
              o
            );
          }
          subscribe(t) {
            const e = this,
              s = {
                notify() {
                  'function' == typeof t ? t(e) : t.onChanged(e);
                },
              },
              i = a.observe(s);
            return {
              cancel() {
                i.cancel();
              },
            };
          }
          dispose() {
            for (const t of l) t.cancel();
          }
        })(),
        c = {
          onChanged() {
            (n = !0), a.notify();
          },
        },
        l = [t.onEdgesChanged(c), t.onVerticesChanged(c)];
      return h;
    };
  }
  function $t() {
    return function (t) {
      const e = (function () {
          const t = new Map(),
            e = new Map(),
            s = new Map(),
            i = new Gt(),
            r = new Gt();
          class n {
            constructor(t, e) {
              (this.id = t), (this.data = e);
            }
            get edgesIn() {
              const t = s.get(this);
              return t ? t.values() : [].values();
            }
            get edgesOut() {
              const t = e.get(this);
              return t ? t.values() : [].values();
            }
            get neighbors() {
              const t = e.get(this) || [];
              return (function* () {
                for (const [e] of t) yield e;
              })();
            }
          }
          class o {
            constructor(t, e, s) {
              (this.src = t), (this.dst = e), (this.weight = s);
            }
          }
          let a = !0,
            h = !0;
          return new (class {
            addVertex(...e) {
              for (const s of e) t.set(s.id, new n(s.id, s.data));
              a = !0;
            }
            hasVertex(e) {
              return t.has(e);
            }
            vertex(e) {
              return t.get(e);
            }
            get vertices() {
              return t.values();
            }
            get vertexCount() {
              return t.size;
            }
            removeVertex(...i) {
              var r, n;
              for (const o of i) {
                t.delete(o.id);
                const i = s.get(o);
                if (i)
                  for (const [t] of i)
                    null === (r = e.get(t)) || void 0 === r || r.delete(o), i.delete(t), (h = !0);
                const a = e.get(o);
                if (a)
                  for (const [t] of a)
                    null === (n = s.get(t)) || void 0 === n || n.delete(o), a.delete(t), (h = !0);
              }
              a = !0;
            }
            get edges() {
              return (function* () {
                for (const [, t] of e) for (const [, e] of t) yield e;
              })();
            }
            get edgeCount() {
              let t = 0;
              for (const [, s] of e) t += s.size;
              return t;
            }
            setEdge(...i) {
              for (let e = 0; e < i.length; ++e) {
                const { src: s, dst: r } = i[e],
                  n = i[e].weight || 0;
                if (!t.has(s.id))
                  throw Error(`At index ${e}: ${s.id} is not a vertex of this graph`);
                if (!t.has(r.id))
                  throw Error(`At index ${e}: ${r.id} is not a vertex of this graph`);
                if (isNaN(parseFloat(n + '')) || n < 0)
                  throw Error(`At index ${e}: invalid weight`);
              }
              function r(t, i, r = 0) {
                const n = new o(t, i, r),
                  a = e.get(t) || new Map();
                e.set(t, a), a.set(i, n);
                const h = s.get(i) || new Map();
                s.set(i, h), h.set(t, n);
              }
              for (const { src: t, dst: e, weight: s } of i) r(t, e, s);
              h = !0;
            }
            hasEdge(t, s) {
              const i = e.get(t);
              return !!i && i.has(s);
            }
            edge(t, s) {
              const i = e.get(t);
              return null == i ? void 0 : i.get(s);
            }
            removeEdge(...t) {
              for (const i of t) {
                const t = e.get(i.src);
                null == t || t.delete(i.dst);
                const r = s.get(i.dst);
                null == r || r.delete(i.src);
              }
              h = !0;
            }
            clear() {
              t.clear(), e.clear(), s.clear(), (a = !1), (h = !1);
            }
            onVerticesChanged(t) {
              return i.observe(t);
            }
            onEdgesChanged(t) {
              return r.observe(t);
            }
            commit() {
              a && (i.notify(), (a = !1)), h && (r.notify(), (h = !1));
            }
          })();
        })(),
        s = new Set();
      function i(t, i) {
        e.addVertex({ id: t, data: i }), s.add(t);
      }
      return new (class {
        watch(t) {
          return t.collection.subscribe({
            onAdded(e, s) {
              t.shouldAdd && t.shouldAdd(s) && i(e, s);
            },
            onRemoved(t) {
              const s = e.vertex(t);
              s && e.removeVertex(s);
            },
            onUpdated(s, r) {
              const n = e.vertex(s);
              if ((n || (t.shouldAdd && !t.shouldAdd(r)) || i(s, r), n)) {
                (t.shouldAdd && t.shouldAdd(r)) || e.removeVertex(n);
                for (const e of n.edgesIn) t.weightBetween(e.src, e.dst);
                for (const e of n.edgesOut) t.weightBetween(e.src, e.dst);
              }
            },
            onCollectionUpdated() {
              for (const i of s) {
                const r = e.vertex(i);
                if (r) {
                  for (const i of e.vertices)
                    !s.has(i.id) &&
                      t.isNeighborOf(i, r) &&
                      e.setEdge({ src: i, dst: r, weight: t.weightBetween(i, r) });
                  for (const s of t.neighborsOf(r)) {
                    const i = e.vertex(s);
                    i && e.setEdge({ src: r, dst: i, weight: t.weightBetween(r, i) });
                  }
                }
              }
              s.clear(), e.commit();
            },
          });
        }
        addVertex(...t) {
          e.addVertex(...t);
        }
        hasVertex(t) {
          return e.hasVertex(t);
        }
        vertex(t) {
          return e.vertex(t);
        }
        removeVertex(...t) {
          e.removeVertex(...t);
        }
        get vertices() {
          return e.vertices;
        }
        get vertexCount() {
          return e.vertexCount;
        }
        setEdge(...t) {
          e.setEdge(...t);
        }
        hasEdge(t, s) {
          return e.hasEdge(t, s);
        }
        edge(t, s) {
          return e.edge(t, s);
        }
        removeEdge(...t) {
          e.removeEdge(...t);
        }
        get edges() {
          return e.edges;
        }
        get edgeCount() {
          return e.edgeCount;
        }
        dispose() {
          t && t(), e.clear();
        }
        onVerticesChanged(t) {
          return e.onVerticesChanged({
            notify() {
              t.onChanged();
            },
          });
        }
        onEdgesChanged(t) {
          return e.onEdgesChanged({
            notify() {
              t.onChanged();
            },
          });
        }
        commit() {
          e.commit();
        }
      })();
    };
  }
  function Jt(t) {
    return {
      'Conversion.worldToScreen': {
        namespace: 'Conversion',
        name: 'worldToScreen',
        value: () => {
          return (
            (t = new jt()),
            function (e, s, i, r) {
              return t.setCameraFromPose(s), t.worldToScreen(e, i, r);
            }
          );
          var t;
        },
      },
      'Mattertag.getDiscPosition': {
        namespace: 'Mattertag',
        name: 'getDiscPosition',
        value: () => _,
      },
      'OAuth.createTokenRefresher': {
        namespace: 'OAuth',
        name: 'createTokenRefresher',
        value: () =>
          (function (t) {
            const e = new Bt(t);
            return (t, s) => e.create(t, s);
          })(t),
      },
      'Graph.createDirect': { namespace: 'Graph', name: 'createDirectedGraph', value: () => $t() },
      'Graph.A*': { namespace: 'Graph', name: 'createAStarRunner', value: () => Qt() },
      'Graph.AStarStatus': { namespace: 'Graph', name: 'AStarStatus', value: () => _t.AStarStatus },
      'Sweep.graph': {
        namespace: 'Sweep',
        name: 'createGraph',
        value: () =>
          (function (t) {
            const e = t.collectionRegister.lookup('Sweep.data');
            if (!e) throw Error('sweep.data was misconfigured');
            return function () {
              const t = $t()(() => s.cancel()),
                s = t.watch({
                  collection: e,
                  isNeighborOf: (t, e) => t.data.neighbors.includes(e.id),
                  neighborsOf: (t) => t.data.neighbors.values(),
                  weightBetween(t, e) {
                    const s = e.data.position.x - t.data.position.x,
                      i = e.data.position.y - t.data.position.y,
                      r = e.data.position.z - t.data.position.z;
                    return Math.sqrt(s ** 2 + i ** 2 + r ** 2);
                  },
                  shouldAdd: (t) => t.enabled,
                });
              let i;
              const r = new Promise((s) => {
                i = e.subscribe({
                  onCollectionUpdated() {
                    s(t);
                  },
                });
              });
              return r.then(() => i.cancel()), r;
            };
          })(t),
      },
    };
  }
  class te {
    constructor(t) {
      (this.receiver = t), (this.messageType = r.RESPONSE);
    }
    notify(t) {
      this.receiver.receiveResponse(t);
    }
  }
  class ee {
    constructor(t, e, s, i) {
      (this.type = o.ACTION), (this.payload = { uid: t, targetFunction: e, params: s, context: i });
    }
  }
  function se(t, e, s) {
    const i = {},
      r = void 0 === s ? t.length : s;
    for (let s = 0; s < r; ++s) i[t[s]] = e[s];
    return i;
  }
  class ie {
    constructor(t) {
      (this.getMessenger = t),
        (this.inFlightActions = new Map()),
        (this.responseResolvers = {}),
        (this.functions = new Map()),
        (this.currentMsgId = 0),
        (this.registeredRoutines = new Map()),
        (this.routines = new Map());
      const e = new (class {
        constructor(t) {
          this.functions = t;
        }
        receiveResponse(t) {
          this.functions.receiveResponse(t);
        }
      })(this);
      (this.responseObserver = new te(e)), this.getMessenger().addObserver(this.responseObserver);
    }
    async dispose() {
      await Promise.allSettled(this.inFlightActions.values()),
        this.getMessenger().removeObserver(this.responseObserver);
    }
    register(t, e) {
      if (e.subRoutine && !this.registeredRoutines.get(e.subRoutine))
        throw new Error(`${e.subRoutine} sub-routine was not provided for ${e}`);
      const s = (...s) => this.dispatchAction(t, e, void 0, ...s);
      return (
        (s.callWithContext = (s, ...i) => this.dispatchAction(t, e, s, ...i)),
        this.functions.set(t, s),
        s
      );
    }
    lookup(t) {
      return this.functions.get(t);
    }
    registerMiddleware(...t) {
      for (const [e, s] of t) this.registeredRoutines.set(e, s);
    }
    applyMiddleware() {
      for (const [t, e] of this.registeredRoutines) {
        const s = e();
        this.routines.set(t, s);
      }
    }
    async dispatchAction(t, e, s, ...i) {
      const r = this.currentMsgId,
        n = new Promise((n, o) => {
          this.responseResolvers[r] = { funcKey: t, funcDef: e, resolve: n, reject: o };
          const a = this.getSubRoutineFromDef(e),
            h = (function (t, e, s = !1) {
              if (s) {
                const s = se(t, e, t.length - 1),
                  i = t.length - 1;
                return (s[t[i]] = e.slice(i)), s;
              }
              return se(t, e);
            })(a ? a.argsDef.argNames : e.args, i, a ? a.argsDef.varArg : e.varArg),
            c = a ? a.buildMessageData(this.currentMsgId, h) : h;
          this.getMessenger().send(new ee(this.currentMsgId, t, c, s)), ++this.currentMsgId;
        });
      return this.inFlightActions.set(r, n), n;
    }
    async receiveResponse(t) {
      const e = this.responseResolvers[t.uid];
      if (e) {
        const s = this.getSubRoutineFromDef(e.funcDef);
        t.success
          ? e.resolve(s ? await s.onResponse(t.uid, t.message) : e.resolve(t.message))
          : e.reject(s && s.onError ? s.onError(t.uid, t.error) : t.error);
      }
      this.inFlightActions.delete(t.uid), delete this.responseResolvers[t.uid];
    }
    getSubRoutineFromDef(t) {
      if (t.subRoutine) {
        const e = this.routines.get(t.subRoutine);
        if (!e) throw new Error(`${t.subRoutine} sub-routine was not provided for ${t}`);
        return e;
      }
      return null;
    }
  }
  class re {
    constructor(t) {
      this.registration = t;
    }
    build(t) {
      const e = new b();
      for (const s of Object.keys(t)) {
        const i = t[s];
        if (i) {
          const t = v(i.namespace, e),
            r = this.registration.register(s, i);
          t[i.name] = (...t) => r(...t);
        }
      }
      return e;
    }
  }
  class ne {
    constructor(t) {
      (this.observer = t), (this.messageType = r.OBSERVATION);
    }
    notify(t) {
      this.observer.observe(t);
    }
  }
  class oe {
    constructor(t) {
      (this.type = o.OBSERVABLE_SUB), (this.payload = { observableKey: t });
    }
  }
  class ae {
    constructor(t) {
      (this.type = o.OBSERVABLE_UNSUB), (this.payload = { observableKey: t });
    }
  }
  class he {
    constructor(t) {
      (this.getMessenger = t),
        (this.observables = new Map()),
        (this.dataCache = {}),
        (this.subscribedObservers = new c()),
        (this.cancelledObservers = new c()),
        (this.registeredObjectFactories = new Map()),
        (this.objectFactories = new Map()),
        (this.observableToFactoryMap = new Map()),
        (this.isDisposed = !1);
      const e = new (class {
        constructor(t) {
          this.observables = t;
        }
        observe(t) {
          this.observables.observe(t);
        }
      })(this);
      (this.observableObserver = new ne(e)),
        this.getMessenger().addObserver(this.observableObserver);
    }
    dispose() {
      for (const t of this.subscribedObservers.keys) this.getMessenger().send(new ae(t));
      this.getMessenger().removeObserver(this.observableObserver), (this.isDisposed = !0);
    }
    register(t, e) {
      const s = this;
      if (e) {
        if (!this.registeredObjectFactories.get(e))
          throw new Error(`${e} factory was not provided for ${t}`);
        this.observableToFactoryMap.set(t, e);
      }
      const i = new (class {
        subscribe(e) {
          return s.subscribe(t, e);
        }
        waitUntil(e) {
          return s.waitUntil(t, e);
        }
      })();
      return this.observables.set(t, i), i;
    }
    lookup(t) {
      return this.observables.get(t);
    }
    registerMiddleware(...t) {
      for (const [e, s] of t) this.registeredObjectFactories.set(e, s);
    }
    applyMiddleware() {
      for (const [t, e] of this.registeredObjectFactories) {
        const s = e();
        this.objectFactories.set(t, s);
      }
    }
    subscribe(t, e) {
      if ('function' == typeof e) return this.subscribeWithCallback(t, e);
      if (e.onChanged && 'function' == typeof e.onChanged) return this.subscribeWithObserver(t, e);
      throw Error(
        'The argument provided to subscribe was not a valid observer\nExpected a function or an object with an `onChanged` function',
      );
    }
    subscribeWithCallback(t, e) {
      return this.addObserver(
        t,
        new (class {
          onChanged(t) {
            e(t);
          }
        })(),
      );
    }
    subscribeWithObserver(t, e) {
      return this.addObserver(
        t,
        new (class {
          onChanged(t) {
            e.onChanged(t);
          }
        })(),
      );
    }
    waitUntil(t, e) {
      if ('function' == typeof e) return this.waitWithCallback(t, e);
      if (e.hasOwnProperty('waitUntil') && 'function' == typeof e.waitUntil)
        return this.waitWithWaiter(t, e);
      throw Error(
        'The argument provided to waitUntil was not a valid waiter\nExpected a function or an object with an `waitUntil` function',
      );
    }
    waitWithCallback(t, e) {
      class s {
        constructor(t, e) {
          (this.obsIntfBuilder = t), (this.res = e);
        }
        onChanged(s) {
          e(s) && (this.res(s), this.obsIntfBuilder.cancelledObservers.add(t, this));
        }
      }
      return new Promise((e) => {
        this.addObserver(t, new s(this, e));
      });
    }
    waitWithWaiter(t, e) {
      class s {
        constructor(t, e) {
          (this.obsIntfBuilder = t), (this.res = e);
        }
        onChanged(s) {
          e.waitUntil(s) && (this.res(s), this.obsIntfBuilder.cancelledObservers.add(t, this));
        }
      }
      return new Promise((e) => {
        this.addObserver(t, new s(this, e));
      });
    }
    observe(t) {
      const { observableKey: e, observableData: s } = t,
        i = this.observableToFactoryMap.get(e),
        r = i && this.objectFactories.get(i);
      this.dataCache[e] = r ? r.create(s, this.dataCache[e]) : s;
      const n = this.subscribedObservers.getValuesAtKey(e);
      if (n)
        for (const s of n)
          this.cancelledObservers.has(e, s) || s.onChanged(this.dataCache[t.observableKey]);
      this.removeCancelledObservers(e);
    }
    addObserver(t, e) {
      0 === this.subscribedObservers.valuesPerKey(t) && this.getMessenger().send(new oe(t)),
        this.subscribedObservers.add(t, e);
      const s = this.dataCache[t];
      s &&
        Promise.resolve().then(() => {
          e.onChanged(s), this.removeCancelledObservers(t);
        });
      const i = this;
      return new (class {
        cancel() {
          i.cancelledObservers.add(t, e),
            Promise.resolve().then(() => {
              i.isDisposed || i.removeObserver(t, e);
            });
        }
      })();
    }
    removeObserver(t, e) {
      this.subscribedObservers.remove(t, e),
        0 === this.subscribedObservers.valuesPerKey(t) &&
          (this.getMessenger().send(new ae(t)), delete this.dataCache[t]);
    }
    removeCancelledObservers(t) {
      const e = this.cancelledObservers.getValuesAtKey(t);
      for (const s of e) this.removeObserver(t, s), this.cancelledObservers.remove(t, s);
    }
  }
  class ce {
    constructor(t) {
      this.registration = t;
    }
    build(t) {
      const e = new b();
      for (const s of Object.keys(t)) {
        const i = t[s];
        if (i) {
          v(i.namespace, e)[i.name] = this.registration.register(s, i.objectFactory);
        }
      }
      return e;
    }
  }
  class le {
    constructor(t) {
      (this.observer = t), (this.messageType = r.COLLECTION_UPDATE);
    }
    notify(t) {
      this.observer.observe(t);
    }
  }
  class ue {
    constructor(t) {
      (this.type = o.COLLECTION_SUB), (this.payload = { collectionKey: t });
    }
  }
  class de {
    constructor(t) {
      (this.type = o.COLLECTION_UNSUB), (this.payload = { collectionKey: t });
    }
  }
  class pe {
    constructor(t) {
      (this.getMessenger = t),
        (this.collections = new Map()),
        (this.collectionCache = new Map()),
        (this.observers = new c()),
        (this.cancelledObservers = new c()),
        (this.registeredElementFactories = new Map()),
        (this.elementFactories = new Map()),
        (this.collectionToElementFactoryMap = new Map());
      (this.collectionUpdateObserver = new le(
        new (class {
          constructor(t) {
            this.collectionBuilder = t;
          }
          observe(t) {
            this.collectionBuilder.observe(t);
          }
        })(this),
      )),
        this.getMessenger().addObserver(this.collectionUpdateObserver);
    }
    dispose() {
      for (const t of this.observers.keys) this.getMessenger().send(new de(t));
      this.getMessenger().removeObserver(this.collectionUpdateObserver);
    }
    register(t, e) {
      const s = this;
      if (e) {
        if (!this.registeredElementFactories.get(e))
          throw new Error(`${e} element factory was not provided for ${t}`);
        this.collectionToElementFactoryMap.set(t, e);
      }
      const i = new (class {
        subscribe(e) {
          return s.subscribe(t, e);
        }
      })();
      return this.collections.set(t, i), i;
    }
    lookup(t) {
      return this.collections.get(t);
    }
    registerMiddleware(...t) {
      for (const [e, s] of t) this.registeredElementFactories.set(e, s);
    }
    applyMiddleware() {
      for (const [t, e] of this.registeredElementFactories) {
        const s = e();
        this.elementFactories.set(t, s);
      }
    }
    observe(t) {
      const { collectionKey: e } = t;
      switch (t.operation) {
        case n.ITEM_ADDED: {
          const { collectionIndex: s, item: i } = t;
          this.onItemAdded(e, s, i);
          break;
        }
        case n.ITEM_REMOVED: {
          const { collectionIndex: s } = t;
          this.onItemRemoved(e, s);
          break;
        }
        case n.ITEM_UPDATED: {
          const { collectionIndex: s, item: i } = t;
          this.onItemUpdated(e, s, i);
          break;
        }
        case n.COLL_UPDATED:
          this.onCollectionUpdated(e);
      }
      this.removeCancelledObservers(e);
    }
    onItemAdded(t, e, s) {
      const i = this.collectionCache.get(t) || new me();
      this.collectionCache.set(t, i);
      const r = this.collectionToElementFactoryMap.get(t),
        n = r && this.elementFactories.get(r);
      i[e] = n ? n.create(s) : s;
      const o = this.observers.getValuesAtKey(t);
      for (const s of o) s.onAdded && (this.cancelledObservers.has(t, s) || s.onAdded(e, i[e], i));
    }
    onItemRemoved(t, e) {
      const s = this.collectionCache.get(t);
      if (!s) return;
      const i = s[e];
      if ((delete s[e], i)) {
        const r = this.observers.getValuesAtKey(t);
        for (const n of r)
          n.onRemoved && (this.cancelledObservers.has(t, n) || n.onRemoved(e, i, s));
      }
    }
    onItemUpdated(t, e, s) {
      const i = this.collectionCache.get(t);
      if (!i) return;
      const r = this.collectionToElementFactoryMap.get(t),
        n = r && this.elementFactories.get(r);
      n ? n.update(s, i[e]) : (i[e] = s);
      const o = this.observers.getValuesAtKey(t);
      for (const s of o)
        s.onUpdated && (this.cancelledObservers.has(t, s) || s.onUpdated(e, i[e], i));
    }
    onCollectionUpdated(t) {
      const e = this.collectionCache.get(t) || new me();
      this.collectionCache.set(t, e);
      const s = this.observers.getValuesAtKey(t);
      for (const i of s)
        i.onCollectionUpdated && (this.cancelledObservers.has(t, i) || i.onCollectionUpdated(e));
    }
    subscribe(t, e) {
      0 === this.observers.valuesPerKey(t) && this.getMessenger().send(new ue(t)),
        this.observers.add(t, e);
      const s = this.collectionCache.get(t);
      s &&
        Promise.resolve().then(() => {
          for (const t of Object.keys(s)) e.onAdded && e.onAdded(t, s[t], s);
          e.onCollectionUpdated && e.onCollectionUpdated(s);
        });
      const i = this;
      return new (class {
        cancel() {
          i.cancelledObservers.add(t, e), Promise.resolve().then(() => i.unsubscribe(t, e));
        }
      })();
    }
    unsubscribe(t, e) {
      this.observers.remove(t, e),
        0 === this.observers.valuesPerKey(t) &&
          (this.getMessenger().send(new de(t)), this.collectionCache.delete(t));
    }
    removeCancelledObservers(t) {
      const e = this.cancelledObservers.getValuesAtKey(t);
      for (const s of e) this.unsubscribe(t, s), this.cancelledObservers.remove(t, s);
    }
  }
  class me {
    *[Symbol.iterator]() {
      for (const t in this) yield [t, this[t]];
    }
  }
  class ge {
    constructor(t) {
      this.registration = t;
    }
    build(t) {
      const e = new b();
      for (const s of Object.keys(t)) {
        const i = t[s];
        if (i) {
          v(i.namespace, e)[i.name] = this.registration.register(s, i.elementFactory);
        }
      }
      return e;
    }
  }
  class fe {
    constructor(t) {
      (this.getMessenger = t), (this.handlers = new Map()), (this.registeredHandlers = new Set());
      (this.privateMessageObserver = new ye(
        new (class {
          constructor(t) {
            this.messageHandler = t;
          }
          observe(t) {
            this.messageHandler.onMessage(t);
          }
        })(this),
      )),
        this.getMessenger().addObserver(this.privateMessageObserver);
    }
    dispose() {
      this.getMessenger().removeObserver(this.privateMessageObserver);
    }
    onMessage(t) {
      const e = this.handlers.get(t.messageType);
      null == e || e(t.messagePayload);
    }
    registerMiddleware(...t) {
      for (const e of t) this.registeredHandlers.add(e);
    }
    applyMiddleware() {
      for (const t of this.registeredHandlers) {
        const e = t();
        this.handlers.set(e.messageType, (t) => e.onMessage(t));
      }
    }
  }
  class ye {
    constructor(t) {
      (this.observer = t), (this.messageType = r.PRIVATE_MESSAGE);
    }
    notify(t) {
      this.observer.observe(t);
    }
  }
  class be {
    constructor() {
      (this.type = o.DISCONNECT), (this.payload = {});
    }
  }
  function ve(t, e, s = '') {
    for (const i in t) {
      const r = t[i];
      if (r instanceof b) {
        const t = e[i] || new b();
        (e[i] = t), ve(r, t, `${s}${s ? '.' : ''}${i}`), (e[i] = t);
      } else {
        if (e[i]) throw Error(`clobbering ${s}.${i}`);
        e[i] = r;
      }
    }
  }
  class we {
    constructor(t) {
      (this.windowContext = t), (this.argsDef = { argNames: ['policy', 'options'], varArg: !1 });
    }
    buildMessageData(t, e) {
      return {
        policy: e.policy,
        baseHref: this.windowContext.location.origin + this.windowContext.location.pathname,
        options: { includeParams: e.options ? e.options.includeParams : [] },
      };
    }
    onResponse(t, e) {
      return Promise.resolve();
    }
  }
  class xe {
    constructor(t) {
      (this.windowContext = t), (this.argsDef = { argNames: ['policy', 'options'], varArg: !1 });
    }
    buildMessageData(t, e) {
      var s;
      return (function (t, e) {
        return Object.values(t).includes(e);
      })(Ct.DestinationPolicy, e.options)
        ? {
            policy: e.policy,
            baseHref: this.windowContext.location.origin + this.windowContext.location.pathname,
            destinationPolicy: e.options,
          }
        : {
            policy: e.policy,
            baseHref: this.windowContext.location.origin + this.windowContext.location.pathname,
            options: {
              templateHref: null === (s = e.options) || void 0 === s ? void 0 : s.templateHref,
            },
          };
    }
    onResponse(t, e) {
      return Promise.resolve();
    }
  }
  var Me;
  !(function (t) {
    (t.SETUP = 'sandbox.setup'),
      (t.TO_SANDBOX = 'sandbox.to.sandbox'),
      (t.TO_CLIENT = 'sandbox.to.client');
  })(Me || (Me = {}));
  class Ee {
    constructor() {
      (this.usedIds = new Set()), this.usedIds.add(0);
    }
    generate() {
      let t;
      do {
        t = Math.floor(1e6 * Math.random());
      } while (this.usedIds.has(t));
      return this.usedIds.add(t), t;
    }
    isInUse(t) {
      return this.usedIds.has(t);
    }
  }
  class _e {
    constructor(t) {
      (this.getMessenger = t),
        (this.RegisterSandbox = class {
          constructor(t) {
            (this.sandboxMiddleware = t),
              (this.argsDef = { argNames: ['html', 'options'], varArg: !1 });
          }
          buildMessageData(t, e) {
            return Object.assign(Object.assign({}, e), {
              clientId: this.sandboxMiddleware.sandboxIdGenerator.generate(),
            });
          }
          onResponse(t, e) {
            const { attachmentId: s, sandboxId: i } = e,
              r = new this.sandboxMiddleware.SandboxMessenger(i, this.sandboxMiddleware);
            return Promise.resolve([s, r]);
          }
        }),
        (this.InjectHtml = class {
          constructor(t) {
            (this.sandboxMiddleware = t),
              (this.argsDef = { argNames: ['tagId', 'html', 'options'], varArg: !1 });
          }
          buildMessageData(t, e) {
            return Object.assign(Object.assign({}, e), {
              clientId: this.sandboxMiddleware.sandboxIdGenerator.generate(),
            });
          }
          onResponse(t, e) {
            const { sandboxId: s } = e,
              i = new this.sandboxMiddleware.SandboxMessenger(s, this.sandboxMiddleware);
            return Promise.resolve(i);
          }
        }),
        (this.SandboxMessenger = class {
          constructor(t, e) {
            (this.sandboxId = t), (this.sandboxMiddleware = e);
          }
          send(t, ...e) {
            this.sandboxMiddleware
              .getMessenger()
              .send(new x(Me.TO_SANDBOX, { type: t, payload: e, sandboxId: this.sandboxId }));
          }
          on(t, e) {
            const s = this.sandboxMiddleware.callbacks.get(this.sandboxId) || new Map();
            this.sandboxMiddleware.callbacks.set(this.sandboxId, s);
            const i = s.get(t) || new Set();
            s.set(t, i), i.add(e);
          }
          off(t, e) {
            const s = this.sandboxMiddleware.callbacks.get(this.sandboxId),
              i = null == s ? void 0 : s.get(t);
            null == i || i.delete(e);
          }
        }),
        (this.SandboxMessageHandler = class {
          constructor(t) {
            this.sandboxMiddleware = t;
          }
          get messageType() {
            return Me.TO_CLIENT;
          }
          onMessage(t) {
            const e = this.sandboxMiddleware.callbacks.get(t.sandboxId),
              s = null == e ? void 0 : e.get(t.type);
            if (s) for (const e of s) e(...t.payload);
          }
        }),
        (this.sandboxIdGenerator = new Ee()),
        (this.callbacks = new Map()),
        (this.registerSandboxRoutine = new this.RegisterSandbox(this)),
        (this.injectRoutine = new this.InjectHtml(this)),
        (this.messageHandler = new this.SandboxMessageHandler(this));
    }
    get registerSandbox() {
      return this.registerSandboxRoutine;
    }
    get injectHTML() {
      return this.injectRoutine;
    }
    get sandboxMessageHandler() {
      return this.messageHandler;
    }
  }
  const Oe = {
      namespace: 'Sensor',
      name: 'addSource',
      varArg: !0,
      args: ['sensorId', 'sourceIds'],
    },
    Ce = { namespace: 'Sensor', name: 'dispose', args: ['sensorId'] },
    Te = { namespace: 'Sensor', name: 'showDebug', args: ['sensorId', 'show'] };
  var Ae;
  !(function (t) {
    t.map = new Map();
  })(Ae || (Ae = {}));
  class Re {
    constructor(t, e, s, i) {
      (this.id = t),
        (this.sensorCalls = e),
        (this.sensorState = s),
        (this.readingCollection = i),
        (this.origin = { x: 0, y: 0, z: 0 }),
        (this.forward = { x: 0, y: 0, z: -1 }),
        (this.sources = []);
      this.stateObservingCancellable = s.subscribe(
        new (class {
          constructor(t) {
            this.sensor = t;
          }
          onChanged(t) {
            ze(this.sensor.origin, t.origin), ze(this.sensor.forward, t.forward);
          }
        })(this),
      );
    }
    dispose() {
      this.sensorCalls.dispose(this.id), this.stateObservingCancellable.cancel();
    }
    get facade() {
      const t = this;
      class e {
        constructor(t) {
          this.observer = t;
        }
        onChanged() {
          try {
            this.observerIsCallback(this.observer) ? this.observer(i) : this.observer.onChanged(i);
          } catch (t) {
            throw Error(
              'The argument provided to subscribe was not a valid observer\nExpected a function or an object with an `onChanged` function',
            );
          }
        }
        observerIsCallback(t) {
          return !t.onChanged;
        }
      }
      class s {
        constructor(t) {
          this.condition = t;
        }
        waitUntil() {
          try {
            return this.conditionIsCallback(this.condition)
              ? this.condition(i)
              : this.condition.waitUntil(i);
          } catch (t) {
            throw Error(
              'The argument provided to subscribe was not a valid waiter\nExpected a function or an object with an `waitUntil` function',
            );
          }
        }
        conditionIsCallback(t) {
          return !t.waitUntil;
        }
      }
      const i = {
        get origin() {
          return t.origin;
        },
        get forward() {
          return t.forward;
        },
        addSource(...e) {
          t.addSource(...e);
        },
        showDebug(e) {
          t.sensorCalls.showDebug(t.id, e);
        },
        readings: { subscribe: (e) => t.readingCollection.subscribe(new Se(e, t.sources)) },
        dispose() {
          t.dispose();
        },
        subscribe: (s) => t.sensorState.subscribe(new e(s)),
        waitUntil: (e) => t.sensorState.waitUntil(new s(e)),
      };
      return i;
    }
    async addSource(...t) {
      this.sources.push(...t);
      const e = [];
      for (const s of t) {
        const t = Ae.map.get(s);
        if (!t)
          throw Error(s + ' was not a valid source. Sources must be created using createSource');
        t.id && e.push(t.id);
      }
      this.sensorCalls.addSource(this.id, ...e);
    }
  }
  class Se {
    constructor(t, e) {
      (this.observer = t),
        (this.sources = e),
        (this.sourceMap = new Map()),
        (this.internalReadingMap = new Map()),
        (this.readingMap = new Map());
    }
    onAdded(t, e) {
      const s = this.sources[this.sourceMap.size];
      if (s) {
        this.sourceMap.set(t, s);
        const i = new Ie(e);
        this.internalReadingMap.set(s, i),
          this.readingMap.set(s, i.facade),
          this.observer.onAdded && this.observer.onAdded(s, i.facade, this.readingMap);
      }
    }
    onRemoved(t, e) {
      const s = this.sourceMap.get(t);
      if (s) {
        const t = this.readingMap.get(s);
        this.internalReadingMap.delete(s),
          this.readingMap.delete(s),
          this.observer.onRemoved && this.observer.onRemoved(s, t, this.readingMap);
      }
    }
    onUpdated(t, e) {
      const s = this.sourceMap.get(t);
      if (s) {
        if ((this.internalReadingMap.get(s).update(e), this.observer.onUpdated)) {
          const t = this.readingMap.get(s);
          this.observer.onUpdated(s, t, this.readingMap);
        }
      }
    }
    onCollectionUpdated() {
      this.observer.onCollectionUpdated && this.observer.onCollectionUpdated(this.readingMap);
    }
  }
  class Ie {
    constructor(t) {
      (this.baseReading = t), (this.distanceCache = 1 / 0), (this.distanceNeedsUpdate = !0);
    }
    get facade() {
      const t = this;
      return {
        get inRange() {
          return t.baseReading.inRange;
        },
        get inView() {
          return t.baseReading.inView;
        },
        get distanceSquared() {
          return t.baseReading.distanceSquared;
        },
        get direction() {
          return t.baseReading.direction;
        },
        get distance() {
          return t.distance;
        },
      };
    }
    update(t) {
      (this.baseReading.inRange = t.inRange),
        (this.baseReading.inView = t.inView),
        this.updateDistance(t.distanceSquared),
        this.updateDirection(t.direction);
    }
    updateDirection(t) {
      ze(this.baseReading.direction, t);
    }
    updateDistance(t) {
      t && ((this.distanceNeedsUpdate = !0), (this.baseReading.distanceSquared = t));
    }
    get distance() {
      return (
        this.distanceNeedsUpdate &&
          ((this.distanceNeedsUpdate = !1),
          (this.distanceCache = Math.sqrt(this.baseReading.distanceSquared))),
        this.distanceCache
      );
    }
  }
  function ze(t, e) {
    (t.x = e.x), (t.y = e.y), (t.z = e.z);
  }
  class Ne {
    constructor(t) {
      (this.argsDef = { argNames: ['type'], varArg: !1 }),
        (this.observableRegistry = t.observableRegister),
        (this.collectionRegistry = t.collectionRegister),
        (this.sensorCalls = {
          addSource: t.functionRegister.register('Sensor.addSource', Oe),
          dispose: t.functionRegister.register('sensor.dispose', Ce),
          showDebug: t.functionRegister.register('sensor.showDebug', Te),
        });
    }
    buildMessageData(t, e) {
      return e;
    }
    async onResponse(t, e) {
      const s = this.observableRegistry.register(e.sensorId),
        i = this.collectionRegistry.register(e.sensorId);
      return new Re(e.sensorId, this.sensorCalls, s, i).facade;
    }
  }
  class De {
    constructor(t, e, s, i) {
      (this.id = t),
        (this.updateSourceCall = e),
        (this.userData = s),
        (this.volumeCache = { origin: { x: 0, y: 0, z: 0 }, radius: 1 / 0 }),
        this.updateCache(i.origin, i.radius);
    }
    get facade() {
      const t = {
        radius: this.volumeCache.radius,
        origin: Object.assign({}, this.volumeCache.origin),
      };
      const e = this,
        s = new (class {
          get type() {
            return zt.SourceType.SPHERE;
          }
          get volume() {
            return t;
          }
          get userData() {
            return e.userData;
          }
          commit() {
            return e.commit(this);
          }
        })();
      return Ae.map.set(s, this), s;
    }
    async commit(t) {
      this.hasSourceChanged(t) &&
        (this.updateCache(t.volume.origin, t.volume.radius),
        await this.updateSourceCall(this.id, zt.SourceType.SPHERE, this.volumeCache));
    }
    hasSourceChanged(t) {
      return !(
        this.volumeCache.origin.x === t.volume.origin.x &&
        this.volumeCache.origin.y === t.volume.origin.y &&
        this.volumeCache.origin.z === t.volume.origin.z &&
        this.volumeCache.radius === t.volume.radius
      );
    }
    updateCache(t, e) {
      (this.volumeCache.origin.x = t.x),
        (this.volumeCache.origin.y = t.y),
        (this.volumeCache.origin.z = t.z),
        (this.volumeCache.radius = e);
    }
  }
  function Pe(t, e, ...s) {
    for (const i of s) t[i] = e[i];
  }
  class ke {
    constructor(t, e, s, i) {
      (this.id = t),
        (this.updateSourceCall = e),
        (this.userData = s),
        (this.volumeCache = {
          center: { x: 0, y: 0, z: 0 },
          size: { x: 1 / 0, y: 1 / 0, z: 1 / 0 },
          orientation: { yaw: 0, pitch: 0, roll: 0 },
        }),
        this.updateCache(i.center, i.size, i.orientation);
    }
    get facade() {
      const t = {
        center: Object.assign({}, this.volumeCache.center),
        size: Object.assign({}, this.volumeCache.size),
        orientation: Object.assign({}, this.volumeCache.orientation),
      };
      const e = this,
        s = new (class {
          get type() {
            return zt.SourceType.BOX;
          }
          get volume() {
            return t;
          }
          get userData() {
            return e.userData;
          }
          commit() {
            return e.commit(this);
          }
        })();
      return Ae.map.set(s, this), s;
    }
    async commit(t) {
      this.hasSourceChanged(t) &&
        (this.updateCache(t.volume.center, t.volume.size, t.volume.orientation),
        await this.updateSourceCall(this.id, zt.SourceType.BOX, this.volumeCache));
    }
    hasSourceChanged(t) {
      return !(
        this.volumeCache.center.x === t.volume.center.x &&
        this.volumeCache.center.y === t.volume.center.y &&
        this.volumeCache.center.z === t.volume.center.z &&
        this.volumeCache.size.x === t.volume.size.x &&
        this.volumeCache.size.y === t.volume.size.y &&
        this.volumeCache.size.z === t.volume.size.z &&
        this.volumeCache.orientation.yaw === t.volume.orientation.yaw &&
        this.volumeCache.orientation.pitch === t.volume.orientation.pitch &&
        this.volumeCache.orientation.roll === t.volume.orientation.roll
      );
    }
    updateCache(t, e, s) {
      mt(this.volumeCache.center, t),
        mt(this.volumeCache.size, e),
        Pe(this.volumeCache.orientation, s, 'yaw', 'pitch', 'roll');
    }
  }
  class Fe {
    constructor(t, e, s, i) {
      (this.id = t),
        (this.updateSourceCall = e),
        (this.userData = s),
        (this.volumeCache = { basePoint: { x: 0, y: 0, z: 0 }, height: 1 / 0, radius: 1 / 0 }),
        this.updateCache(i.basePoint, i.height, i.radius);
    }
    get facade() {
      const t = {
        basePoint: Object.assign({}, this.volumeCache.basePoint),
        height: this.volumeCache.height,
        radius: this.volumeCache.radius,
      };
      const e = this,
        s = new (class {
          get type() {
            return zt.SourceType.CYLINDER;
          }
          get volume() {
            return t;
          }
          get userData() {
            return e.userData;
          }
          commit() {
            return e.commit(this);
          }
        })();
      return Ae.map.set(s, this), s;
    }
    async commit(t) {
      this.hasSourceChanged(t) &&
        (this.updateCache(t.volume.basePoint, t.volume.height, t.volume.radius),
        await this.updateSourceCall(this.id, zt.SourceType.CYLINDER, this.volumeCache));
    }
    hasSourceChanged(t) {
      return !(
        this.volumeCache.basePoint.x === t.volume.basePoint.x &&
        this.volumeCache.basePoint.y === t.volume.basePoint.y &&
        this.volumeCache.basePoint.z === t.volume.basePoint.z &&
        this.volumeCache.height === t.volume.height &&
        this.volumeCache.radius === t.volume.radius
      );
    }
    updateCache(t, e, s) {
      mt(this.volumeCache.basePoint, t),
        (this.volumeCache.height = e),
        (this.volumeCache.radius = s);
    }
  }
  const Le = { namespace: 'Sensor', name: 'updateSource', args: ['sourceId', 'type', 'options'] };
  class Ue {
    constructor(t) {
      (this.userDataMap = new Map()),
        (this.argsDef = { argNames: ['type', 'options'], varArg: !1 }),
        (this.updateSourceCall = t.functionRegister.register('Sensor.updateSource', Le));
    }
    buildMessageData(t, e) {
      const s = e.options.hasOwnProperty('userData') ? e.options.userData : {};
      if (
        !(function (t) {
          return !!t && 'object' == typeof t;
        })(s)
      )
        throw new Error('Error creating Source, userData was provided but not an object');
      this.userDataMap.set(t, Object.assign({}, s));
      const i = Object.assign({}, e.options);
      return delete i.userData, { type: e.type, options: i };
    }
    async onResponse(t, e) {
      const s = this.userDataMap.get(t) || {};
      return (
        this.userDataMap.delete(t),
        (function (t, e, s) {
          const { sourceId: i, type: r, volume: n } = t;
          switch (r) {
            case zt.SourceType.SPHERE:
              return new De(i, e, s, n);
            case zt.SourceType.BOX:
              return new ke(i, e, s, n);
            case zt.SourceType.CYLINDER:
              return new Fe(i, e, s, n);
          }
        })(e, this.updateSourceCall, s).facade
      );
    }
  }
  window.THREE;
  const Ve = (t, e) => t.x === e.x && t.y === e.y && t.z === e.z;
  class We {
    constructor() {
      this.updateMethodMap = new Map();
    }
    create(t) {
      const [e, s] = (function (t) {
        let e = !0;
        const s = { x: 0, y: 0, z: 0 };
        let i = !0;
        const r = { x: 0, y: 0, z: 0 };
        class n {
          constructor() {
            (this.bounds = { min: { x: 0, y: 0, z: 0 }, max: { x: 0, y: 0, z: 0 } }),
              (this.floorInfo = { id: '0', sequence: 0 });
          }
          get size() {
            return (
              i &&
                ((i = !1),
                (r.x = this.bounds.max.x - this.bounds.min.x),
                (r.y = this.bounds.max.y - this.bounds.min.y),
                (r.z = this.bounds.max.z - this.bounds.min.z)),
              r
            );
          }
          get center() {
            return (
              e &&
                ((e = !1),
                (s.x = 0.5 * (this.bounds.max.x + this.bounds.min.x)),
                (s.y = 0.5 * (this.bounds.max.y + this.bounds.min.y)),
                (s.z = 0.5 * (this.bounds.max.z + this.bounds.min.z))),
              s
            );
          }
        }
        const o = new n();
        function a(t) {
          (Ve(o.bounds.max, t.bounds.max) && Ve(o.bounds.min, t.bounds.min)) ||
            ((e = !0), (i = !0)),
            (o.id = t.id),
            (o.label = t.label),
            mt(o.bounds.max, t.bounds.max),
            mt(o.bounds.min, t.bounds.min),
            (o.floorInfo.id = t.floorInfo.id),
            (o.floorInfo.sequence = t.floorInfo.sequence);
        }
        return a(t), [o, (t) => a(t)];
      })(t);
      return this.updateMethodMap.set(e, s), e;
    }
    update(t, e) {
      const s = this.updateMethodMap.get(e);
      null == s || s(t);
    }
  }
  class je {
    constructor() {
      this.roomFactory = new We();
    }
    create(t, e) {
      e = e || { rooms: [] };
      for (let s = 0; s < t.rooms.length; ++s)
        e.rooms[s]
          ? this.roomFactory.update(t.rooms[s], e.rooms[s])
          : (e.rooms[s] = this.roomFactory.create(t.rooms[s]));
      return (e.rooms.length = t.rooms.length), e;
    }
  }
  class He {
    constructor() {
      this.updateMethodMap = new Map();
    }
    create(t) {
      const [e, s] = (function (t) {
        let e = !0;
        const s = { x: 0, y: 0, z: 0 };
        let i,
          r = !0;
        class n {
          constructor() {
            (this.anchorPosition = { x: 0, y: 0, z: 0 }),
              (this.stemVector = { x: 0, y: 0, z: 0 }),
              (this.color = { r: 0, g: 0, b: 0 }),
              (this.attachments = []),
              (this.keywords = []);
          }
          get discPosition() {
            return (
              e &&
                ((e = !1),
                (s.x = this.anchorPosition.x + this.stemVector.x),
                (s.y = this.anchorPosition.y + this.stemVector.y),
                (s.z = this.anchorPosition.z + this.stemVector.z)),
              s
            );
          }
          get stemHeight() {
            return (
              r &&
                ((r = !1),
                (i = Math.sqrt(
                  this.stemVector.x ** 2 + this.stemVector.y ** 2 + this.stemVector.z ** 2,
                ))),
              i
            );
          }
        }
        const o = new n();
        function a(t) {
          const s = Ve(o.anchorPosition, t.anchorPosition);
          Ve(o.stemVector, t.stemVector) || ((e = !0), (r = !0)),
            s || (e = !0),
            (o.id = t.id),
            mt(o.anchorPosition, t.anchorPosition),
            mt(o.stemVector, t.stemVector),
            (o.stemVisible = t.stemVisible),
            (o.label = t.label),
            (o.description = t.description),
            Pe(o.color, t.color, 'r', 'g', 'b'),
            (o.roomId = t.roomId),
            ft(o.attachments, t.attachments),
            ft(o.keywords, t.keywords),
            (o.fontId = t.fontId);
        }
        return a(t), [o, (t) => a(t)];
      })(t);
      return this.updateMethodMap.set(e, s), e;
    }
    update(t, e) {
      const s = this.updateMethodMap.get(e);
      null == s || s(t);
    }
  }
  class Be {
    constructor(t) {
      this.windowContext = t;
    }
    get messageType() {
      return 'open link';
    }
    onMessage(t) {
      t.newWindow ? window.open(t.href) : this.windowContext.location.assign(t.href);
    }
  }
  var Ge;
  !(function (t) {
    (t.ADD = 'view.add.layer'), (t.REMOVE = 'view.remove.layer');
  })(Ge || (Ge = {}));
  const Ke = 'View.update',
    qe = { namespace: 'View', name: 'update', args: ['op', 'viewId', 'layerId'] },
    Xe = 'View.activate',
    Ye = { namespace: 'View', name: 'activate', args: ['viewId', 'returnToStart'] },
    Ze = 'Layer.toggle',
    Qe = { namespace: 'View', name: 'toggleLayer', args: ['layerId', 'activate'] },
    $e = 'Layer.interface',
    Je = { namespace: 'View', name: 'queryLayerInterface', args: [] };
  var ts,
    es,
    ss,
    is = function (t, e, s, i, r) {
      if ('m' === i) throw new TypeError('Private method is not writable');
      if ('a' === i && !r) throw new TypeError('Private accessor was defined without a setter');
      if ('function' == typeof e ? t !== e || !r : !e.has(t))
        throw new TypeError(
          'Cannot write private member to an object whose class did not declare it',
        );
      return 'a' === i ? r.call(t, s) : r ? (r.value = s) : e.set(t, s), s;
    },
    rs = function (t, e, s, i) {
      if ('a' === s && !i) throw new TypeError('Private accessor was defined without a getter');
      if ('function' == typeof e ? t !== e || !i : !e.has(t))
        throw new TypeError(
          'Cannot read private member from an object whose class did not declare it',
        );
      return 'm' === s ? i : 'a' === s ? i.call(t) : i ? i.value : e.get(t);
    };
  class ns {
    constructor(t, e, s) {
      ts.set(this, void 0),
        es.set(this, void 0),
        ss.set(this, void 0),
        is(this, es, t, 'f'),
        is(this, ts, e, 'f'),
        is(this, ss, s, 'f');
    }
    get id() {
      return rs(this, ts, 'f').id;
    }
    get name() {
      return rs(this, ts, 'f').name;
    }
    get active() {
      return rs(this, ts, 'f').active;
    }
    setActive(t = !1) {
      return rs(this, es, 'f').activateView(this.id, t);
    }
    get layers() {
      return rs(this, ts, 'f').layers.values();
    }
    addLayer(t) {
      return rs(this, es, 'f').updateView(Ge.ADD, rs(this, ts, 'f').id, t.id);
    }
    removeLayer(t) {
      return rs(this, es, 'f').updateView(Ge.REMOVE, rs(this, ts, 'f').id, t.id);
    }
    hasLayer(t) {
      return rs(this, ts, 'f').layers.has(t);
    }
    subscribe(t) {
      const e = rs(this, ss, 'f').call(this, t);
      return 'function' == typeof t ? t(this) : t.onChanged(this), e;
    }
    waitUntil(t) {
      return new Promise((e) => {
        rs(this, ss, 'f').call(this, () => {
          ('function' == typeof t ? t(this) : t.waitUntil(this)) && e(this);
        });
      });
    }
  }
  (ts = new WeakMap()), (es = new WeakMap()), (ss = new WeakMap());
  class os {
    constructor(t, e, s) {
      (this.updateViewCalls = t),
        (this.layerFactory = e),
        (this.views = s),
        (this.viewDataMap = new Map()),
        (this.viewObservers = new l());
    }
    create(t) {
      const e = this.views.get(t.id);
      if (e) return this.update(t, e), e;
      return this.createView(t);
    }
    update(t, e) {
      const s = this.viewDataMap.get(e.id);
      if (s) {
        (s.name = t.name), (s.active = t.active), s.layers.clear();
        for (const e of t.layers) s.layers.add(this.layerFactory.get(e));
        for (const t of this.viewObservers.getValuesAtKey(e.id))
          'function' == typeof t ? t(e) : t.onChanged(e);
      } else this.create(t);
    }
    createView(t) {
      const e = {
          id: t.id,
          name: t.name,
          active: t.active,
          layers: new Set(t.layers.map((t) => this.layerFactory.get(t))),
        },
        s = new ns(
          this.updateViewCalls,
          e,
          (e) => (
            this.viewObservers.add(t.id, e), { cancel: () => this.viewObservers.remove(t.id, e) }
          ),
        );
      return this.views.set(s.id, s), this.viewDataMap.set(s.id, e), s;
    }
  }
  var as,
    hs,
    cs,
    ls = function (t, e, s, i, r) {
      if ('m' === i) throw new TypeError('Private method is not writable');
      if ('a' === i && !r) throw new TypeError('Private accessor was defined without a setter');
      if ('function' == typeof e ? t !== e || !r : !e.has(t))
        throw new TypeError(
          'Cannot write private member to an object whose class did not declare it',
        );
      return 'a' === i ? r.call(t, s) : r ? (r.value = s) : e.set(t, s), s;
    },
    us = function (t, e, s, i) {
      if ('a' === s && !i) throw new TypeError('Private accessor was defined without a getter');
      if ('function' == typeof e ? t !== e || !i : !e.has(t))
        throw new TypeError(
          'Cannot read private member from an object whose class did not declare it',
        );
      return 'm' === s ? i : 'a' === s ? i.call(t) : i ? i.value : e.get(t);
    };
  class ds {
    constructor(t, e, s, i) {
      as.set(this, void 0),
        hs.set(this, void 0),
        cs.set(this, void 0),
        ls(this, as, t, 'f'),
        ls(this, hs, e, 'f'),
        ls(this, cs, i, 'f');
      for (const t in s) this[t] = s[t];
    }
    get id() {
      return us(this, hs, 'f').id;
    }
    get name() {
      return us(this, hs, 'f').name;
    }
    get toggled() {
      return us(this, hs, 'f').toggled;
    }
    toggle(t) {
      return us(this, as, 'f').toggleLayer(this.id, t);
    }
    subscribe(t) {
      const e = us(this, cs, 'f').call(this, t);
      return 'function' == typeof t ? t(this) : t.onChanged(this), e;
    }
    waitUntil(t) {
      return new Promise((e) => {
        us(this, cs, 'f').call(this, () => {
          ('function' == typeof t ? t(this) : t.waitUntil(this)) && e(this);
        });
      });
    }
  }
  (as = new WeakMap()), (hs = new WeakMap()), (cs = new WeakMap());
  class ps {
    constructor(t, e) {
      (this.layerId = t), (this.baseFunctionRegister = e);
    }
    build(t) {
      const e = new b();
      for (const [s, i] of t) {
        const t = this.baseFunctionRegister.lookup(s);
        if (t) {
          v(i.namespace, e)[i.name] = (...e) =>
            t.callWithContext({ layerId: this.layerId, subType: 'layered.op' }, ...e);
        }
      }
      return e;
    }
  }
  class ms {
    constructor(t, e, s, i) {
      (this.functionRegister = t),
        (this.viewCalls = e),
        (this.layers = s),
        (this.getLayerInterface = i),
        (this.argsDef = { argNames: ['name'], varArg: !1 }),
        (this.layerDataMap = new Map()),
        (this.layerObservers = new l());
    }
    buildMessageData(t, e) {
      return e;
    }
    async onResponse(t, e) {
      return this.createLayer(e);
    }
    create(t, e) {
      if ((e = e || this.layers.get(t.id))) return this.update(t, e), e;
      return this.createLayer(t);
    }
    update(t, e) {
      const s = this.layerDataMap.get(e.id);
      if (s) {
        (s.name = t.name), (s.toggled = t.toggled);
        for (const t of this.layerObservers.getValuesAtKey(e.id))
          'function' == typeof t ? t(e) : t.onChanged(e);
      } else this.create(t);
    }
    get(t) {
      return this.layers.get(t.id) || this.create(t);
    }
    createLayer(t) {
      const e = this.getLayerInterface(),
        s = new ps(t.id, this.functionRegister).build(e),
        i = new ds(
          this.viewCalls,
          t,
          s,
          (e) => (
            this.layerObservers.add(t.id, e), { cancel: () => this.layerObservers.remove(t.id, e) }
          ),
        );
      return this.layers.set(i.id, i), this.layerDataMap.set(i.id, t), i;
    }
  }
  class gs {
    constructor(t) {
      (this.views = new Map()),
        (this.layers = new Map()),
        (this.viewCalls = {
          updateView: t.functionRegister.register(Ke, qe),
          activateView: t.functionRegister.register(Xe, Ye),
          toggleLayer: t.functionRegister.register(Ze, Qe),
        });
      t.functionRegister
        .register($e, Je)()
        .then((t) => (this.layerInterface = t)),
        (this.layerElementFactory = new ms(
          t.functionRegister,
          this.viewCalls,
          this.layers,
          () => this.layerInterface,
        )),
        (this.viewElementFactory = new os(this.viewCalls, this.layerElementFactory, this.views));
    }
    get viewFactory() {
      return this.viewElementFactory;
    }
    get layerFactory() {
      return this.layerElementFactory;
    }
  }
  class fs {
    constructor(t, e) {
      (this.windowContext = e || window), (this.messenger = t.createMessenger());
      const s = () => this.messenger;
      (this.clientRegistration = new M(s)),
        (this.functionRegistration = new ie(s)),
        (this.observableRegistration = new he(s)),
        (this.collectionRegistration = new pe(s)),
        (this.privateMessageHandler = new fe(s)),
        (this.registryMap = {
          functionRegister: this.functionRegistration,
          observableRegister: this.observableRegistration,
          collectionRegister: this.collectionRegistration,
        }),
        this.registerMiddleware(),
        (this.clientHelpers = new E(this.clientRegistration)),
        (this.enums = new w()),
        (this.eventHandler = new y(s)),
        (this.functions = new re(this.functionRegistration)),
        (this.observable = new ce(this.observableRegistration)),
        (this.collections = new ge(this.collectionRegistration)),
        this.messenger.init();
    }
    build(t) {
      const e = {},
        s = this.eventHandler.build();
      (e.on = (t, i) => (s.on(t, i), e)), (e.off = (t, i) => (s.off(t, i), e));
      const i = [
        [this.enums, t.enums],
        [this.functions, t.functions],
        [this.observable, t.observables],
        [this.collections, t.collections],
      ];
      for (const [t, s] of i)
        if (s) {
          ve(t.build(s), e);
        }
      return (
        this.functionRegistration.applyMiddleware(),
        this.observableRegistration.applyMiddleware(),
        this.collectionRegistration.applyMiddleware(),
        this.privateMessageHandler.applyMiddleware(),
        ve(this.clientHelpers.build(Jt(this.registryMap)), e),
        (e.disconnect = () => {
          (e.disconnect = () => {}), this.dispose();
        }),
        e
      );
    }
    async dispose() {
      const t = Promise.all([
        this.enums.dispose(),
        this.eventHandler.dispose(),
        this.clientRegistration.dispose(),
        this.functionRegistration.dispose(),
        this.observableRegistration.dispose(),
        this.collectionRegistration.dispose(),
        this.privateMessageHandler.dispose(),
      ]);
      this.messenger.send(new be()),
        (this.messenger = d.toFilteredMessenger(
          this.messenger,
          [o.OBSERVABLE_UNSUB, o.COLLECTION_UNSUB],
          [r.RESPONSE],
        )),
        await t,
        this.messenger.dispose();
    }
    registerMiddleware() {
      const t = new gs(this.registryMap),
        e = new _e(() => this.messenger),
        s = [
          ['link.setsharepolicy', () => new we(this.windowContext)],
          ['link.setopenpolicy', () => new xe(this.windowContext)],
          ['mattertag.inject', () => e.injectHTML],
          ['tag.registerSandbox', () => e.registerSandbox],
          ['sensor.create', () => new Ne(this.registryMap)],
          ['source.create', () => new Ue(this.registryMap)],
          ['Layer', () => t.layerFactory],
        ],
        i = [
          ['current.room', () => new je()],
          ['View', () => t.viewFactory],
          ['Layer', () => t.layerFactory],
        ],
        r = [
          ['tag.data', () => new He()],
          ['collection.room', () => new We()],
          ['View', () => t.viewFactory],
          ['Layer', () => t.layerFactory],
        ],
        n = [() => e.sandboxMessageHandler, () => new Be(this.windowContext)];
      this.functionRegistration.registerMiddleware(...s),
        this.observableRegistration.registerMiddleware(...i),
        this.collectionRegistration.registerMiddleware(...r),
        this.privateMessageHandler.registerMiddleware(...n);
    }
  }
  new a('SDK client').info('Showcase SDK client version:', '24.11.1_webgl-598-gae59c48b5b'),
    (window['sdk-client'] = e);
})();
