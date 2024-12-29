'use strict';
(self.webpackChunkmp_webgl = self.webpackChunkmp_webgl || []).push([
  [833],
  {
    833: (e, s, t) => {
      t.r(s),
        t.d(s, {
          AcceptMessage: () => H,
          AcceptObserver: () => O,
          ConnectMessage: () => E,
          ConnectMessageObserver: () => V,
          ConnectionRefusedError: () => C,
          ErrorType: () => m,
          ErrorTypeMap: () => T,
          HandshakeMessage: () => L,
          HandshakeObserver: () => w,
          IncomingMessageType: () => p,
          InvalidProviderError: () => b,
          KeyReferrerMismatchError: () => I,
          MP_SDK: () => u,
          OutgoingMessageType: () => v,
          RejectMessage: () => B,
          RejectObserver: () => M,
          connect: () => k,
          version: () => S,
        });
      class n {
        constructor(e) {
          this.messageReceiver = e;
        }
        notify(e, s) {
          this.messageReceiver.onMessageReceived(e, s);
        }
      }
      class r {
        constructor() {
          this.values = {};
        }
        add(e, s) {
          this.getValuesAtKey(e).push(s);
        }
        remove(e, s) {
          const t = this.values[e];
          if (t) {
            const e = t.indexOf(s);
            e > -1 && t.splice(e, 1);
          }
        }
        removeKey(e) {
          delete this.values[e];
        }
        getValuesAtKey(e) {
          const s = this.values[e] || [];
          return (this.values[e] = s), s;
        }
        valuesPerKey(e) {
          return this.getValuesAtKey(e).length;
        }
        find(e, s) {
          return this.values[e] && this.values[e].find(s);
        }
        get keys() {
          return Object.keys(this.values);
        }
        hasKey(e) {
          return e in this.values;
        }
        has(e, s) {
          return this.hasKey(e) && this.values[e].includes(s);
        }
        *[Symbol.iterator]() {
          for (const e in this.values) for (const s of this.values[e]) yield [e, s];
        }
      }
      Symbol.iterator;
      class i {
        listen() {}
        stopListening() {}
        send() {
          throw Error("The sdk has been disconnected and can't make any new calls");
        }
      }
      class o {
        constructor(e, s, t) {
          (this.sourceId = e),
            (this.targetId = s),
            (this.messageBridge = t),
            (this.observers = new r());
        }
        static toFilteredMessenger(e, s, t) {
          const n = new c(e.sourceId, e.targetId, e, s);
          for (const s of t) for (const t of e.observers.getValuesAtKey(s)) n.addObserver(t);
          return n;
        }
        init() {
          const e = new (class {
              constructor(e) {
                this.messenger = e;
              }
              onMessageReceived(e, s) {
                this.messenger.onMessageReceived(e, s);
              }
            })(this),
            s = new n(e);
          this.messageBridge.listen(s);
        }
        dispose() {
          this.messageBridge.stopListening(), (this.messageBridge = new i());
        }
        addObserver(e) {
          this.observers.add(e.messageType, e);
        }
        removeObserver(e) {
          this.observers.remove(e.messageType, e);
        }
        send(e) {
          const s = this.sourceId,
            t = this.targetId;
          this.messageBridge.send(
            Object.assign(Object.assign({}, e), { fromId: s, toId: t, timestamp: Date.now() }),
          );
        }
        onMessageReceived(e, s) {
          if (!this.filterMessageId(e)) return;
          const t = e.type,
            n = this.observers.getValuesAtKey(t);
          if (n)
            for (const t of n) {
              const n = e.payload || e;
              t.notify(n, s, e.timestamp);
            }
        }
        filterMessageId(e) {
          const s = e.toId,
            t = e.fromId;
          return s instanceof Array
            ? s.indexOf(this.sourceId) > -1
            : (void 0 === s || s === this.sourceId) && t === this.targetId;
        }
      }
      class c extends o {
        constructor(e, s, t, n) {
          super(e, s, new i()),
            (this.messenger = t),
            (this.sendFilter = n),
            (this.errorBridge = new i());
        }
        send(e) {
          this.sendFilter.includes(e.type) ? this.messenger.send(e) : this.errorBridge.send();
        }
      }
      class a {
        constructor(e, s) {
          (this.sourceId = e), (this.listenerBridge = s), (this.observers = new r());
        }
        init() {
          const e = new (class {
              constructor(e) {
                this.messenger = e;
              }
              onMessageReceived(e, s) {
                this.messenger.onMessageReceived(e, s);
              }
            })(this),
            s = new n(e);
          this.listenerBridge.listen(s);
        }
        dispose() {
          this.listenerBridge.stopListening();
        }
        addObserver(e) {
          this.observers.add(e.messageType, e);
        }
        removeObserver(e) {
          this.observers.remove(e.messageType, e);
        }
        send(e, s, t, n) {
          t.send(
            Object.assign(Object.assign({}, e), {
              fromId: this.sourceId,
              toId: s,
              timestamp: Date.now(),
            }),
            n,
          );
        }
        onMessageReceived(e, s) {
          const t = e.type,
            n = this.observers.getValuesAtKey(t);
          if (n)
            for (const t of n) {
              const n = e.payload || e;
              t.notify(n, s, e.timestamp);
            }
        }
      }
      class h {
        constructor(e) {
          (this.targetWindow = e),
            (this.messageObserver = null),
            (this.onMessage = (e) => {
              if (this.messageObserver) {
                const s = e.data;
                this.messageObserver.notify(
                  Object.assign({}, s),
                  { id: s.fromId, origin: e.origin, source: e.source },
                  e.data.timestamp,
                );
              }
            });
        }
        listen(e) {
          this.messageObserver ||
            ((this.messageObserver = e),
            this.targetWindow.addEventListener('message', this.onMessage));
        }
        stopListening() {
          this.targetWindow.removeEventListener('message', this.onMessage),
            (this.messageObserver = null);
        }
      }
      class d {
        constructor(e, s = '*') {
          (this.targetWindow = e), (this.targetOrigin = s);
        }
        send(e, s) {
          this.targetWindow.postMessage(e, this.targetOrigin);
        }
      }
      class l {
        constructor(e, s, t = '*') {
          (this.sourceWindow = e), (this.listener = new h(e)), (this.sender = new d(s, t));
        }
        listen(e) {
          this.listener.listen(e);
        }
        stopListening() {
          this.listener.stopListening();
        }
        send(e) {
          this.sender.send(e, this.sourceWindow);
        }
      }
      class g {
        constructor(e, s, t, n, r = '*') {
          (this.sourceId = e),
            (this.sourceWindow = s),
            (this.targetId = t),
            (this.targetWindow = n),
            (this.targetOrigin = r);
        }
        createMessenger() {
          const e = new l(this.sourceWindow, this.targetWindow, this.targetOrigin);
          return new o(this.sourceId, this.targetId, e);
        }
      }
      var u,
        v,
        p,
        m,
        f = t(669),
        y = function (e, s, t, n) {
          return new (t || (t = Promise))(function (r, i) {
            function o(e) {
              try {
                a(n.next(e));
              } catch (e) {
                i(e);
              }
            }
            function c(e) {
              try {
                a(n.throw(e));
              } catch (e) {
                i(e);
              }
            }
            function a(e) {
              var s;
              e.done
                ? r(e.value)
                : ((s = e.value),
                  s instanceof t
                    ? s
                    : new t(function (e) {
                        e(s);
                      })).then(o, c);
            }
            a((n = n.apply(e, s || [])).next());
          });
        };
      !(function (e) {
        const s = new f.M();
        e.connect = function (e, t, n) {
          return y(this, void 0, void 0, function* () {
            let r;
            try {
              r = yield e.connect();
            } finally {
              e.cancelConnecting();
            }
            const i = yield (function (e) {
                return y(this, void 0, void 0, function* () {
                  if (!e) throw new Error('Unabled to load the sdk');
                  try {
                    const t = yield s.load(e, 'sdk-client');
                    if (t && t.SdkBuilder && 'function' == typeof t.SdkBuilder) return t.SdkBuilder;
                  } catch (e) {}
                  throw Error(`Could not load the sdk from ${e}`);
                });
              })(r.scriptUrl),
              o = t.getFactory(r);
            return (function (e, s, t, n) {
              return new s(t, e).build(n);
            })(n, i, o, r.serializedInterface);
          });
        };
      })(u || (u = {})),
        (function (e) {
          e.CONNECT = 'postmessage.connect';
        })(v || (v = {})),
        (function (e) {
          (e.HANDSHAKE = 'postmessage.handshake'),
            (e.ACCEPT = 'postmessage.accept'),
            (e.REJECT = 'postmessage.reject');
        })(p || (p = {}));
      class E {
        constructor(e, s = {}) {
          (this.type = v.CONNECT),
            (this.payload = {
              bootstrapVersion: e,
              options: { auth: s.auth, provider: s.provider, sdkType: s.sdkType },
              applicationKey: s.applicationKey,
            });
        }
      }
      class w {
        constructor(e) {
          (this.receiver = e), (this.messageType = p.HANDSHAKE);
        }
        notify(e, s, t) {
          this.receiver.handshake();
        }
      }
      class O {
        constructor(e) {
          (this.receiver = e), (this.messageType = p.ACCEPT);
        }
        notify(e, s, t) {
          const { sourceId: n, scriptUrl: r, targetId: i, targetOrigin: o } = e,
            c = e.interface;
          this.receiver.accept(n, r, c, i, o);
        }
      }
      !(function (e) {
        (e.CANCELLED = 'ConnectionCancelled'),
          (e.REFUSED = 'ConnectionRefused'),
          (e.INVALID_PROVIDER = 'InvalidProvider'),
          (e.KEY_MISMATCH = 'KeyReferrerMismatch');
      })(m || (m = {}));
      class C extends Error {
        constructor() {
          super(), (this.type = m.REFUSED), (this.name = 'ConnectionRefusedError');
        }
      }
      class b extends Error {
        constructor(e) {
          super(e), (this.type = m.INVALID_PROVIDER), (this.name = 'InvalidProviderError');
        }
      }
      class I extends Error {
        constructor(e) {
          super(e), (this.type = m.KEY_MISMATCH), (this.name = 'KeyReferrerMismatchError');
        }
      }
      const T = { [m.REFUSED]: C, [m.KEY_MISMATCH]: I, [m.INVALID_PROVIDER]: b };
      class M {
        constructor(e) {
          (this.receiver = e), (this.messageType = p.REJECT);
        }
        notify(e, s, t) {
          const n = T[e.errorType];
          if (n) {
            const s = new n(e.reason);
            this.receiver.reject(s);
          }
        }
      }
      class N extends Error {
        constructor(e) {
          super(e), (this.type = m.CANCELLED), (this.name = 'ConnectionCancelledError');
        }
      }
      var D;
      !(function (e) {
        (e[(e.IDLE = 0)] = 'IDLE'),
          (e[(e.CONNECTING = 1)] = 'CONNECTING'),
          (e[(e.HANDSHAKE = 2)] = 'HANDSHAKE'),
          (e[(e.CONNECTED = 3)] = 'CONNECTED'),
          (e[(e.REJECTED = 4)] = 'REJECTED');
      })(D || (D = {}));
      class A {
        constructor(e, s, t) {
          (this.messenger = e),
            (this.target = s),
            (this.source = t),
            (this.connectionState = D.IDLE),
            (this.connectionPoll = void 0);
          const n = new (class {
            constructor(e) {
              this.connector = e;
            }
            handshake() {
              this.connector.handshake();
            }
            accept(e, s, t, n, r) {
              this.connector.accept(e, s, t, n, r);
            }
            reject(e) {
              this.connector.reject(e);
            }
          })(this);
          (this.handshakeObserver = new w(n)),
            (this.acceptObserver = new O(n)),
            (this.rejectObserver = new M(n)),
            (this.connectionPromise = new Promise((e, s) => {
              (this.resolveConnection = e), (this.rejectConnection = s);
            }));
        }
        connect(e, s = {}) {
          return (
            this.connectionState === D.IDLE &&
              ((this.connectionState = D.CONNECTING),
              this.messenger.addObserver(this.handshakeObserver),
              this.messenger.addObserver(this.acceptObserver),
              this.messenger.addObserver(this.rejectObserver),
              (this.connectionPoll = window.setInterval(() => {
                this.messenger.send(new E(e, s), -1, this.target, this.source);
              }, 500))),
            this.connectionPromise
          );
        }
        cancelConnecting() {
          this.connectionState < D.CONNECTED &&
            (this.stopConnectPolling(),
            this.rejectConnection(new N('User manually cancelled connection')));
        }
        handshake() {
          this.connectionState < D.HANDSHAKE &&
            ((this.connectionState = D.HANDSHAKE),
            this.stopConnectPolling(),
            this.messenger.removeObserver(this.handshakeObserver));
        }
        accept(e, s, t, n, r) {
          this.connectionState < D.CONNECTED &&
            ((this.connectionState = D.CONNECTED),
            this.messenger.removeObserver(this.handshakeObserver),
            this.messenger.removeObserver(this.acceptObserver),
            this.messenger.removeObserver(this.rejectObserver),
            this.stopConnectPolling(),
            this.resolveConnection({
              sourceId: e,
              targetId: n,
              targetOrigin: r,
              scriptUrl: s,
              serializedInterface: t,
            }));
        }
        reject(e) {
          this.connectionState < D.CONNECTED &&
            ((this.connectionState = D.REJECTED),
            this.messenger.removeObserver(this.handshakeObserver),
            this.messenger.removeObserver(this.acceptObserver),
            this.messenger.removeObserver(this.rejectObserver),
            this.stopConnectPolling(),
            this.rejectConnection(e));
        }
        stopConnectPolling() {
          clearInterval(this.connectionPoll), (this.connectionPoll = void 0);
        }
      }
      var R = function (e, s, t, n) {
        return new (t || (t = Promise))(function (r, i) {
          function o(e) {
            try {
              a(n.next(e));
            } catch (e) {
              i(e);
            }
          }
          function c(e) {
            try {
              a(n.throw(e));
            } catch (e) {
              i(e);
            }
          }
          function a(e) {
            var s;
            e.done
              ? r(e.value)
              : ((s = e.value),
                s instanceof t
                  ? s
                  : new t(function (e) {
                      e(s);
                    })).then(o, c);
          }
          a((n = n.apply(e, s || [])).next());
        });
      };
      const S = '3.0';
      function k(e, s = {}) {
        return R(this, void 0, void 0, function* () {
          return 'string' == typeof s
            ? (function (e, s) {
                return (
                  console.warn(
                    "MP_SDK: connecting using an `applicationKey` argument is deprecated. Please add the key to the iframe's URL parameters instead.",
                  ),
                  K(e, { applicationKey: s })
                );
              })(e, s)
            : K(e, s);
        });
      }
      function K(e, s = {}) {
        const t = (n = e).contentWindow ? n.contentWindow : null;
        var n;
        if (!t) return Promise.reject('invalid window');
        const r = Math.floor(1e6 * Math.random()),
          i = new h(window),
          o = new d(t),
          c = new a(r, i);
        c.init();
        const l = new A(c, o, window);
        return u.connect(new P(l, c, s), new j(t), window);
      }
      class P {
        constructor(e, s, t) {
          (this.connector = e), (this.postMessage = s), (this.options = t);
        }
        connect() {
          return this.connector.connect(S, this.options);
        }
        cancelConnecting() {
          this.postMessage.dispose();
        }
      }
      class j {
        constructor(e) {
          this.target = e;
        }
        getFactory(e) {
          return new g(e.sourceId, window, e.targetId, this.target, e.targetOrigin);
        }
      }
      class L {
        constructor() {
          (this.type = p.HANDSHAKE), (this.payload = {});
        }
      }
      class H {
        constructor(e, s, t, n, r) {
          (this.type = p.ACCEPT),
            (this.payload = {
              scriptUrl: e,
              interface: s,
              sourceId: t,
              targetId: n,
              targetOrigin: r,
            }),
            (this.interface = s);
        }
      }
      class B {
        constructor(e) {
          (this.type = p.REJECT),
            (this.payload = { reason: e.message, errorType: e.type }),
            (this.reason = e.message);
        }
      }
      class V {
        constructor(e) {
          (this.receiver = e), (this.messageType = v.CONNECT);
        }
        notify(e, s) {
          this.receiver.onConnectionReceived(e, s);
        }
      }
    },
  },
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFNWCxZQUFZOUMsR0FMSSxLQUFBeEYsS0FBT2tDLEVBQW9CbUQsT0FNekN4SSxLQUFLcUQsUUFBVSxDQUNidUYsT0FBUUQsRUFBTTdJLFFBQ2Q0SSxVQUFXQyxFQUFNeEYsTUFFbkJuRCxLQUFLNEksT0FBU0QsRUFBTTdJLFNDRGpCLE1BQU00TCxFQUVYLFlBQW9CckUsR0FBQSxLQUFBQSxTQUFBQSxFQURKLEtBQUEzRSxZQUFjMEMsRUFBb0IyQixRQUczQyxPQUFPdEIsRUFBeUIxRixHQUNyQ0MsS0FBS3FILFNBQVNzRSxxQkFBcUJsRyxFQUFTMUYiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWNrYWdlcy9zZGsvbWVzc2VuZ2Vycy9NZXNzZW5nZXIvQnJpZGdlT2JzZXJ2ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vcGFja2FnZXMvdXRpbC9EaWN0QXJyYXkvRGljdEFycmF5LnRzIiwid2VicGFjazovLy8uL3BhY2thZ2VzL3V0aWwvRGljdEFycmF5L01hcFNldC50cyIsIndlYnBhY2s6Ly8vLi9wYWNrYWdlcy9zZGsvbWVzc2VuZ2Vycy9lcnJvcm1lc3NhZ2UvRXJyb3JNZXNzYWdlQnJpZGdlLnRzIiwid2VicGFjazovLy8uL3BhY2thZ2VzL3Nkay9tZXNzZW5nZXJzL01lc3Nlbmdlci9NZXNzZW5nZXIudHMiLCJ3ZWJwYWNrOi8vLy4vcGFja2FnZXMvc2RrL21lc3NlbmdlcnMvTWVzc2VuZ2VyL1VuZGlyZWN0ZWRNZXNzZW5nZXIudHMiLCJ3ZWJwYWNrOi8vLy4vcGFja2FnZXMvc2RrL21lc3NlbmdlcnMvcG9zdG1lc3NhZ2UvVW5kaXJlY3RlZFBvc3RNZXNzYWdlQnJpZGdlLnRzIiwid2VicGFjazovLy8uL3BhY2thZ2VzL3Nkay9tZXNzZW5nZXJzL3Bvc3RtZXNzYWdlL1Bvc3RNZXNzYWdlQnJpZGdlLnRzIiwid2VicGFjazovLy8uL3BhY2thZ2VzL3Nkay9tZXNzZW5nZXJzL3Bvc3RtZXNzYWdlL1Bvc3RNZXNzYWdlRmFjdG9yeS50cyIsIndlYnBhY2s6Ly8vLi9wYWNrYWdlcy9zZGsvYm9vdHN0cmFwL3NyYy9NUF9TREsudHMiLCJ3ZWJwYWNrOi8vLy4vcGFja2FnZXMvc2RrL2Jvb3RzdHJhcC9zcmMvTWVzc2FnZVR5cGVzLnRzIiwid2VicGFjazovLy8uL3BhY2thZ2VzL3Nkay9ib290c3RyYXAvc3JjL0Vycm9ycy90eXBlLnRzIiwid2VicGFjazovLy8uL3BhY2thZ2VzL3Nkay9ib290c3RyYXAvc3JjL01lc3NhZ2VzL0Nvbm5lY3RNZXNzYWdlLnRzIiwid2VicGFjazovLy8uL3BhY2thZ2VzL3Nkay9ib290c3RyYXAvc3JjL01lc3NhZ2VPYnNlcnZlcnMvSGFuZHNoYWtlT2JzZXJ2ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vcGFja2FnZXMvc2RrL2Jvb3RzdHJhcC9zcmMvTWVzc2FnZU9ic2VydmVycy9BY2NlcHRPYnNlcnZlci50cyIsIndlYnBhY2s6Ly8vLi9wYWNrYWdlcy9zZGsvYm9vdHN0cmFwL3NyYy9FcnJvcnMvQ29ubmVjdGlvblJlZnVzZWQudHMiLCJ3ZWJwYWNrOi8vLy4vcGFja2FnZXMvc2RrL2Jvb3RzdHJhcC9zcmMvRXJyb3JzL0ludmFsaWRQcm92aWRlci50cyIsIndlYnBhY2s6Ly8vLi9wYWNrYWdlcy9zZGsvYm9vdHN0cmFwL3NyYy9FcnJvcnMvS2V5UmVmZXJyZXJNaXNtYXRjaC50cyIsIndlYnBhY2s6Ly8vLi9wYWNrYWdlcy9zZGsvYm9vdHN0cmFwL3NyYy9FcnJvcnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vcGFja2FnZXMvc2RrL2Jvb3RzdHJhcC9zcmMvTWVzc2FnZU9ic2VydmVycy9SZWplY3RPYnNlcnZlci50cyIsIndlYnBhY2s6Ly8vLi9wYWNrYWdlcy9zZGsvYm9vdHN0cmFwL3NyYy9FcnJvcnMvQ2FuY2VsbGVkLnRzIiwid2VicGFjazovLy8uL3BhY2thZ2VzL3Nkay9ib290c3RyYXAvc3JjL0Nvbm5lY3Rvci9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9wYWNrYWdlcy9zZGsvbWVzc2VuZ2Vycy9NZXNzZW5nZXIvSU1lc3Nlbmdlci50cyIsIndlYnBhY2s6Ly8vLi9wYWNrYWdlcy9zZGsvYm9vdHN0cmFwL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9wYWNrYWdlcy9zZGsvYm9vdHN0cmFwL3NyYy9NZXNzYWdlcy9IYW5kc2hha2VNZXNzYWdlLnRzIiwid2VicGFjazovLy8uL3BhY2thZ2VzL3Nkay9ib290c3RyYXAvc3JjL01lc3NhZ2VzL0FjY2VwdE1lc3NhZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vcGFja2FnZXMvc2RrL2Jvb3RzdHJhcC9zcmMvTWVzc2FnZXMvUmVqZWN0TWVzc2FnZS50cyIsIndlYnBhY2s6Ly8vLi9wYWNrYWdlcy9zZGsvYm9vdHN0cmFwL3NyYy9NZXNzYWdlT2JzZXJ2ZXJzL0Nvbm5lY3RPYnNlcnZlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IElPYnNlcnZlciwgSUJyaWRnZU1lc3NhZ2UgfSBmcm9tICcuL0lNZXNzZW5nZXInO1xuaW1wb3J0IHR5cGUgeyBJbmRleEtleSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB0eXBlIHsgQ2xpZW50SW5mbyB9IGZyb20gJy4uJztcblxuZXhwb3J0IGludGVyZmFjZSBJTWVzc2FnZVJlY2VpdmVyPEluY29taW5nRGF0YU1hcFQ+IHtcbiAgb25NZXNzYWdlUmVjZWl2ZWQobWVzc2FnZTogSUJyaWRnZU1lc3NhZ2U8SW5kZXhLZXk8SW5jb21pbmdEYXRhTWFwVD4sIEluY29taW5nRGF0YU1hcFQ+LCBjbGllbnRJbmZvOiBDbGllbnRJbmZvKTogdm9pZDtcbn1cblxuLyoqXG4gKiBBbiBvYnNlcnZlciB1c2VkIHNwZWNpZmljYWxseSBmb3IgYmluZGluZyBhbiBJTWVzc2VuZ2VyIHRvIGFuIElNZXNzZW5nZXJCcmlkZ2VcbiAqL1xuZXhwb3J0IGNsYXNzIEJyaWRnZU9ic2VydmVyPEluY29taW5nRGF0YU1hcFQ+IGltcGxlbWVudHMgSU9ic2VydmVyPFtJQnJpZGdlTWVzc2FnZTxJbmRleEtleTxJbmNvbWluZ0RhdGFNYXBUPiwgSW5jb21pbmdEYXRhTWFwVD4sIENsaWVudEluZm9dPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWVzc2FnZVJlY2VpdmVyOiBJTWVzc2FnZVJlY2VpdmVyPEluY29taW5nRGF0YU1hcFQ+KSB7IH1cbiAgcHVibGljIG5vdGlmeShtZXNzYWdlOiBJQnJpZGdlTWVzc2FnZTxJbmRleEtleTxJbmNvbWluZ0RhdGFNYXBUPiwgSW5jb21pbmdEYXRhTWFwVD4sIGNsaWVudEluZm86IENsaWVudEluZm8pOiB2b2lkIHtcbiAgICB0aGlzLm1lc3NhZ2VSZWNlaXZlci5vbk1lc3NhZ2VSZWNlaXZlZChtZXNzYWdlLCBjbGllbnRJbmZvKTtcbiAgfVxufVxuIiwiLyoqXG4gKiBBIGRpY3Rpb25hcnkgbGlrZSBvYmplY3Qgb2YgYXJyYXlzXG4gKi9cbmV4cG9ydCBjbGFzcyBEaWN0QXJyYXk8SyBleHRlbmRzIHN0cmluZyB8IG51bWJlciwgVj4ge1xuICBwcml2YXRlIHZhbHVlczogUmVjb3JkPHN0cmluZyB8IG51bWJlciwgVltdPiA9IHt9O1xuXG4gIC8qKlxuICAgKiBBZGQgYW4gZW50cnkgdG8gdGhlIGFycmF5IGF0IGBrZXlgXG4gICAqXG4gICAqIEBwYXJhbSB7S30ga2V5XG4gICAqIEBwYXJhbSB7Vn0gdmFsdWVcbiAgICovXG4gIHB1YmxpYyBhZGQoa2V5OiBLLCB2YWx1ZTogVik6IHZvaWQge1xuICAgIGNvbnN0IHZhbHVlc0F0S2V5ID0gdGhpcy5nZXRWYWx1ZXNBdEtleShrZXkpO1xuICAgIHZhbHVlc0F0S2V5LnB1c2godmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbiBlbnRyeSBmcm9tIHRoZSBhcnJheSBhdCBga2V5YFxuICAgKlxuICAgKiBAcGFyYW0ge0t9IGtleVxuICAgKiBAcGFyYW0ge1Z9IHZhbHVlXG4gICAqL1xuICBwdWJsaWMgcmVtb3ZlKGtleTogSywgdmFsdWU6IFYpOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZXNBdEtleSA9IHRoaXMudmFsdWVzW2tleV07XG4gICAgaWYgKHZhbHVlc0F0S2V5KSB7XG4gICAgICBjb25zdCBpZHggPSB2YWx1ZXNBdEtleS5pbmRleE9mKHZhbHVlKTtcbiAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICB2YWx1ZXNBdEtleS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFsbCB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGBrZXlgXG4gICAqIEBwYXJhbSB7S30ga2V5XG4gICAqL1xuICBwdWJsaWMgcmVtb3ZlS2V5KGtleTogSyk6IHZvaWQge1xuICAgIGRlbGV0ZSB0aGlzLnZhbHVlc1trZXldO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgYXJyYXkgb2YgdmFsdWVzIGF0IGBrZXlgXG4gICAqIFdpbGwgYWx3YXlzIHJldHVybiBhdCBsZWFzdCBhbiBlbXB0eSBhcnJheVxuICAgKlxuICAgKiBAcGFyYW0ge0t9IGtleVxuICAgKi9cbiAgcHVibGljIGdldFZhbHVlc0F0S2V5KGtleTogSyk6IFZbXSB7XG4gICAgY29uc3QgdmFsdWVzQXRLZXkgPSB0aGlzLnZhbHVlc1trZXldIHx8IFtdO1xuICAgIHRoaXMudmFsdWVzW2tleV0gPSB2YWx1ZXNBdEtleTtcbiAgICByZXR1cm4gdmFsdWVzQXRLZXkgYXMgVltdO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY291bnQgb2YgdmFsdWVzIGF0IGBrZXlgXG4gICAqXG4gICAqIEBwYXJhbSB7S30ga2V5XG4gICAqL1xuICBwdWJsaWMgdmFsdWVzUGVyS2V5KGtleTogSyk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VmFsdWVzQXRLZXkoa2V5KS5sZW5ndGg7XG4gIH1cblxuICBwdWJsaWMgZmluZChrZXk6IEssIHZhbEZpbmRlcjogKHZhbDogVikgPT4gYm9vbGVhbik6IFYgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnZhbHVlc1trZXldICYmIHRoaXMudmFsdWVzW2tleV0uZmluZCh2YWxGaW5kZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbiBpdGVyYXRvciBvdmVyIHRoZSBrZXlzIGluIHRoaXMgYERpY3RBcnJheWBcbiAgICovXG4gIHB1YmxpYyBnZXQga2V5cygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMudmFsdWVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUZXN0IGlmIGBrZXlgIGlzIGluIHRoaXMgYERpY3RBcnJheWBcbiAgICogQHBhcmFtIHtLfSBrZXlcbiAgICovXG4gIHB1YmxpYyBoYXNLZXkoa2V5OiBLKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGtleSBpbiB0aGlzLnZhbHVlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUZXN0IGlmIGEga2V5LXZhbHVlIHBhaXIgaXMgaW4gdGhpcyBgRGljdEFycmF5YFxuICAgKiBAcGFyYW0ge0t9IGtleVxuICAgKiBAcGFyYW0ge1Z9IHZhbFxuICAgKi9cbiAgcHVibGljIGhhcyhrZXk6IEssIHZhbDogVik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmhhc0tleShrZXkpICYmIHRoaXMudmFsdWVzW2tleV0uaW5jbHVkZXModmFsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVyYXRlIG92ZXIgYWxsIHZhbHVlcyBpbiB0aGlzIGBEaWN0QXJyYXlgXG4gICAqL1xuICBwdWJsaWMgKltTeW1ib2wuaXRlcmF0b3JdKCk6IEl0ZXJhYmxlSXRlcmF0b3I8W3N0cmluZywgVl0+IHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLnZhbHVlcykge1xuICAgICAgZm9yIChjb25zdCB2YWwgb2YgdGhpcy52YWx1ZXNba2V5XSkge1xuICAgICAgICB5aWVsZCBba2V5LCB2YWxdO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiLyoqXG4gKiBBIGRpY3Rpb25hcnkgbGlrZSBvYmplY3Qgb2YgYXJyYXlzXG4gKi9cbmV4cG9ydCBjbGFzcyBNYXBTZXQ8SywgVj4ge1xuICBwcml2YXRlIHZhbHVlcyA9IG5ldyBNYXA8SywgU2V0PFY+PigpO1xuXG4gIC8qKlxuICAgKiBBZGQgYW4gZW50cnkgdG8gdGhlIHNldCBhdCBga2V5YFxuICAgKiAqKk5PVEUqKjogdHJ5aW5nIHRvIGFkZCB0aGUgc2FtZSBvYmplY3QgdHdpY2Ugd2lsbCBub3QgYWRkIHR3byBpbnN0YW5jZXMuIElmIHR3byBjb3BpZXMgaXMgcmVxdWlyZWQsIG1ha2UgYSBjbG9uZSBmaXJzdFxuICAgKlxuICAgKiBAcGFyYW0ge0t9IGtleVxuICAgKiBAcGFyYW0ge1Z9IHZhbHVlXG4gICAqL1xuICBwdWJsaWMgYWRkKGtleTogSywgdmFsdWU6IFYpOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZXNBdEtleSA9IHRoaXMuZ2V0VmFsdWVzQXRLZXkoa2V5KTtcbiAgICB2YWx1ZXNBdEtleS5hZGQodmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbiBlbnRyeSBmcm9tIHRoZSBhcnJheSBhdCBga2V5YFxuICAgKlxuICAgKiBAcGFyYW0ge0t9IGtleVxuICAgKiBAcGFyYW0ge1Z9IHZhbHVlXG4gICAqL1xuICBwdWJsaWMgcmVtb3ZlKGtleTogSywgdmFsdWU6IFYpOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZXNBdEtleSA9IHRoaXMudmFsdWVzLmdldChrZXkpO1xuICAgIHZhbHVlc0F0S2V5Py5kZWxldGUodmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbGwgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBga2V5YFxuICAgKiBAcGFyYW0ge0t9IGtleVxuICAgKi9cbiAgcHVibGljIHJlbW92ZUtleShrZXk6IEspOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlcy5kZWxldGUoa2V5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGFycmF5IG9mIHZhbHVlcyBhdCBga2V5YFxuICAgKiBXaWxsIGFsd2F5cyByZXR1cm4gYXQgbGVhc3QgYW4gZW1wdHkgYXJyYXlcbiAgICpcbiAgICogQHBhcmFtIHtLfSBrZXlcbiAgICovXG4gIHB1YmxpYyBnZXRWYWx1ZXNBdEtleShrZXk6IEspOiBTZXQ8Vj4ge1xuICAgIGNvbnN0IHZhbHVlc0F0S2V5ID0gdGhpcy52YWx1ZXMuZ2V0KGtleSkgfHwgbmV3IFNldDxWPigpO1xuICAgIHRoaXMudmFsdWVzLnNldChrZXksIHZhbHVlc0F0S2V5KTtcbiAgICByZXR1cm4gdmFsdWVzQXRLZXk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjb3VudCBvZiB2YWx1ZXMgYXQgYGtleWBcbiAgICpcbiAgICogQHBhcmFtIHtLfSBrZXlcbiAgICovXG4gIHB1YmxpYyB2YWx1ZXNQZXJLZXkoa2V5OiBLKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5nZXRWYWx1ZXNBdEtleShrZXkpLnNpemU7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFuIGl0ZXJhdG9yIG92ZXIgdGhlIGtleXMgaW4gdGhpcyBgTWFwU2V0YFxuICAgKi9cbiAgcHVibGljIGdldCBrZXlzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8Sz4ge1xuICAgIHJldHVybiB0aGlzLnZhbHVlcy5rZXlzKCk7XG4gIH1cblxuICAvKipcbiAgICogVGVzdCBpZiBga2V5YCBpcyBpbiB0aGlzIGBNYXBTZXRgXG4gICAqIEBwYXJhbSB7S30ga2V5XG4gICAqL1xuICBwdWJsaWMgaGFzS2V5KGtleTogSyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnZhbHVlcy5oYXMoa2V5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUZXN0IGlmIGEga2V5LXZhbHVlIHBhaXIgaXMgaW4gdGhpcyBgTWFwU2V0YFxuICAgKiBAcGFyYW0ge0t9IGtleVxuICAgKiBAcGFyYW0ge1Z9IHZhbFxuICAgKi9cbiAgcHVibGljIGhhcyhrZXk6IEssIHZhbDogVik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMudmFsdWVzLmdldChrZXkpPy5oYXModmFsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVyYXRlIG92ZXIgYWxsIHZhbHVlcyBpbiB0aGlzIGBNYXBTZXRgXG4gICAqL1xuICBwdWJsaWMgKltTeW1ib2wuaXRlcmF0b3JdKCk6IEl0ZXJhYmxlSXRlcmF0b3I8W0ssIFZdPiB7XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWxzXSBvZiB0aGlzLnZhbHVlcykge1xuICAgICAgZm9yIChjb25zdCB2YWwgb2YgdmFscykge1xuICAgICAgICB5aWVsZCBba2V5LCB2YWxdO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgeyBJTWVzc2VuZ2VyQnJpZGdlIH0gZnJvbSAnLi4vTWVzc2VuZ2VyL0lNZXNzZW5nZXInO1xuXG4vKipcbiAqIEFjdHMgYXMgYSBNZXNzZW5nZXJCcmlkZ2UgYnV0IHRocm93cyBlcnJvcnMgb24gYWxsIG91dGdvaW5nIGNhbGxzIGFuZCBuby1vcHMgYW55IGluY29taW5nIG1lc3NhZ2VzXG4gKi9cbmV4cG9ydCBjbGFzcyBFcnJvck1lc3NhZ2VCcmlkZ2UgaW1wbGVtZW50cyBJTWVzc2VuZ2VyQnJpZGdlPHVua25vd24sIHVua25vd24+IHtcbiAgLyoqXG4gICAqIE5vLW9wIGxpc3RlbmVyXG4gICAqL1xuICBwdWJsaWMgbGlzdGVuKCk6IHZvaWQge31cblxuICAvKipcbiAgICogTm8tb3Agc3RvcCByZWNlaXZpbmcgbWVzc2FnZVxuICAgKi9cbiAgcHVibGljIHN0b3BMaXN0ZW5pbmcoKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBUaHJvdyBlcnJvcnMgd2hlbiBhdHRlbXB0aW5nIHRvIHNlbmQgbWVzc2FnZXNcbiAgICovXG4gIHB1YmxpYyBzZW5kKCk6IG5ldmVyIHtcbiAgICB0aHJvdyBFcnJvcignVGhlIHNkayBoYXMgYmVlbiBkaXNjb25uZWN0ZWQgYW5kIGNhblxcJ3QgbWFrZSBhbnkgbmV3IGNhbGxzJyk7XG4gIH1cbn1cbiIsImltcG9ydCB0eXBlIHtcbiAgSU1lc3NlbmdlciwgSU1lc3NlbmdlckJyaWRnZSxcbiAgSU1lc3NhZ2UsIElNZXNzYWdlT2JzZXJ2ZXIsIElCcmlkZ2VNZXNzYWdlLFxuICBDbGllbnRJbmZvLFxufSBmcm9tICcuL0lNZXNzZW5nZXInO1xuaW1wb3J0IHsgQnJpZGdlT2JzZXJ2ZXIgfSBmcm9tICcuL0JyaWRnZU9ic2VydmVyJztcbmltcG9ydCB7IERpY3RBcnJheSB9IGZyb20gJ0BtcC91dGlsLWRpY3RhcnJheSc7XG5pbXBvcnQgdHlwZSB7IEluZGV4S2V5IH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgRXJyb3JNZXNzYWdlQnJpZGdlIH0gZnJvbSAnLi4vZXJyb3JtZXNzYWdlL0Vycm9yTWVzc2FnZUJyaWRnZSc7XG5cbi8qKlxuICogQSBiaS1kaXJlY3Rpb25hbCBjb21tdW5pY2F0b3IgdGhhdCBjYW5cbiAqIC0gcmVjZWl2ZSBtZXNzYWdlIG9mIHR5cGUgYGtleW9mIEluY29taW5nRGF0YU1hcFRgIHZpYSBvYnNlcnZlcnNcbiAqIC0gc2VuZCBtZXNzYWdlcyBvZiB0eXBlIGBrZXlvZiBPdXRnb2luZ0RhdGFNYXBUYFxuICogLSBmaWx0ZXJzIGluY29taW5nIG1lc3NhZ2VzIGJhc2VkIG9uIHRoZSBpZCBvZiB0aGUgY2xpZW50IGFuZCB0aGUgbWVzc2FnZSdzIHRhcmdldFxuICpcbiAqIFRoZSB1bmRlcmx5aW5nIGNvbW11bmljYXRpb24gbWVjaGFuaXNtcyBhcmUgZGVmaW5lZCBieSBhbiBJTWVzc2VuZ2VyQnJpZGdlIHByb3ZpZGVkIGJ5IHRoZSBjcmVhdG9yXG4gKlxuICogQHBhcmFtIE91dGdvaW5nRGF0YU1hcFQgVGhlIG91dGdvaW5nIG1lc3NhZ2UgdHlwZXMgc3VwcG9ydGVkXG4gKiBAcGFyYW0gSW5jb21pbmdEYXRhTWFwVCBUaGUgaW5jb21pbmcgbWVzc2FnZSB0eXBlcyBzdXBwb3J0ZWQgYnkgcmVnaXN0ZXJlZCBvYnNlcnZlcnNcbiAqL1xuZXhwb3J0IGNsYXNzIE1lc3NlbmdlcjxcbiAgT3V0Z29pbmdEYXRhTWFwVCxcbiAgSW5jb21pbmdEYXRhTWFwVCxcbj4gaW1wbGVtZW50cyBJTWVzc2VuZ2VyPE91dGdvaW5nRGF0YU1hcFQsIEluY29taW5nRGF0YU1hcFQ+IHtcblxuICBwcml2YXRlIG9ic2VydmVyczogRGljdEFycmF5PEluZGV4S2V5PEluY29taW5nRGF0YU1hcFQ+LCBJTWVzc2FnZU9ic2VydmVyPEluZGV4S2V5PEluY29taW5nRGF0YU1hcFQ+LCBJbmNvbWluZ0RhdGFNYXBUPj4gPSBuZXcgRGljdEFycmF5KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzb3VyY2VJZDogbnVtYmVyLCBwcml2YXRlIHRhcmdldElkOiBudW1iZXIsIHByaXZhdGUgbWVzc2FnZUJyaWRnZTogSU1lc3NlbmdlckJyaWRnZTxPdXRnb2luZ0RhdGFNYXBULCBJbmNvbWluZ0RhdGFNYXBUPikgeyB9XG5cbiAgLyoqXG4gICAqIENsb25lIHRoaXMgTWVzc2VuZ2VyIGFzIGFuIElNZXNzZW5nZXIgdGhhdCB3aWxsIG9ubHkgc2VuZCBhbmQgcmVjZWl2ZSBjZXJ0YWluIHR5cGVzIG9mIG1lc3NhZ2VzXG4gICAqIEBwYXJhbSBtZXNzZW5nZXJcbiAgICogQHBhcmFtIHNlbmRGaWx0ZXJcbiAgICogQHBhcmFtIHJlY3ZGaWx0ZXJcbiAgICogQHJldHVybnNcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgdG9GaWx0ZXJlZE1lc3NlbmdlcjxPdXRnb2luZ0RhdGFNYXBULCBJbmNvbWluZ0RhdGFNYXBUPihcbiAgICBtZXNzZW5nZXI6IE1lc3NlbmdlcjxPdXRnb2luZ0RhdGFNYXBULCBJbmNvbWluZ0RhdGFNYXBUPixcbiAgICBzZW5kRmlsdGVyOiBBcnJheTxJbmRleEtleTxPdXRnb2luZ0RhdGFNYXBUPj4sXG4gICAgcmVjdkZpbHRlcjogQXJyYXk8SW5kZXhLZXk8SW5jb21pbmdEYXRhTWFwVD4+LFxuICApOiBJTWVzc2VuZ2VyPE91dGdvaW5nRGF0YU1hcFQsIEluY29taW5nRGF0YU1hcFQ+IHtcbiAgICBjb25zdCBmaWx0ZXJlZE1lc3NlbmdlciA9IG5ldyBGaWx0ZXJlZE1lc3NlbmdlcjxPdXRnb2luZ0RhdGFNYXBULCBJbmNvbWluZ0RhdGFNYXBUPihtZXNzZW5nZXIuc291cmNlSWQsIG1lc3Nlbmdlci50YXJnZXRJZCwgbWVzc2VuZ2VyLCBzZW5kRmlsdGVyKTtcbiAgICBmb3IgKGNvbnN0IG1zZ1R5cGUgb2YgcmVjdkZpbHRlcikge1xuICAgICAgZm9yIChjb25zdCBvYnNlcnZlciBvZiBtZXNzZW5nZXIub2JzZXJ2ZXJzLmdldFZhbHVlc0F0S2V5KG1zZ1R5cGUpKSB7XG4gICAgICAgIGZpbHRlcmVkTWVzc2VuZ2VyLmFkZE9ic2VydmVyKG9ic2VydmVyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmlsdGVyZWRNZXNzZW5nZXI7XG4gIH1cbiAgLyoqXG4gICAqIFN0YXJ0IGxpc3RlbmluZyBmb3IgYW55IGluY29taW5nIG1lc3NhZ2VzIHZpYSB0aGUgYG1lc3NhZ2VCcmlkZ2VgXG4gICAqL1xuICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcbiAgICBjbGFzcyBNZXNzZW5nZXJGYWNhZGUge1xuICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBtZXNzZW5nZXI6IE1lc3NlbmdlcjxPdXRnb2luZ0RhdGFNYXBULCBJbmNvbWluZ0RhdGFNYXBUPikge31cbiAgICAgIHB1YmxpYyBvbk1lc3NhZ2VSZWNlaXZlZChtZXNzYWdlOiBJQnJpZGdlTWVzc2FnZTxJbmRleEtleTxJbmNvbWluZ0RhdGFNYXBUPiwgSW5jb21pbmdEYXRhTWFwVD4sIGNsaWVudEluZm86IENsaWVudEluZm8pIHtcbiAgICAgICAgdGhpcy5tZXNzZW5nZXIub25NZXNzYWdlUmVjZWl2ZWQobWVzc2FnZSwgY2xpZW50SW5mbyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgbWVzc2VuZ2VyRmFjYWRlID0gbmV3IE1lc3NlbmdlckZhY2FkZSh0aGlzKTtcbiAgICBjb25zdCBicmlkZ2VPYnNlcnZlciA9IG5ldyBCcmlkZ2VPYnNlcnZlcihtZXNzZW5nZXJGYWNhZGUpO1xuICAgIHRoaXMubWVzc2FnZUJyaWRnZS5saXN0ZW4oYnJpZGdlT2JzZXJ2ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3AgbGlzdGVuaW5nIGZvciBtZXNzYWdlcyBhbmQgY2xlYW4gdXAgdGhpcyBNZXNzZW5nZXJcbiAgICovXG4gIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xuICAgIHRoaXMubWVzc2FnZUJyaWRnZS5zdG9wTGlzdGVuaW5nKCk7XG4gICAgdGhpcy5tZXNzYWdlQnJpZGdlID0gbmV3IEVycm9yTWVzc2FnZUJyaWRnZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9ic2VydmUgaW5jb21pbmcgbWVzc2FnZXNcbiAgICpcbiAgICogQHBhcmFtIG9ic2VydmVyXG4gICAqL1xuICBwdWJsaWMgYWRkT2JzZXJ2ZXIobzogSU1lc3NhZ2VPYnNlcnZlcjxJbmRleEtleTxJbmNvbWluZ0RhdGFNYXBUPiwgSW5jb21pbmdEYXRhTWFwVD4pOiB2b2lkIHtcbiAgICB0aGlzLm9ic2VydmVycy5hZGQoby5tZXNzYWdlVHlwZSwgbyk7XG4gIH1cblxuICAvKipcbiAgICogU3RvcCBhbiBvYnNlcnZlciBmcm9tIHJlY2VpdmluZyBtZXNzYWdlc1xuICAgKlxuICAgKiBAcGFyYW0gb2JzZXJ2ZXJcbiAgICovXG4gIHB1YmxpYyByZW1vdmVPYnNlcnZlcihvOiBJTWVzc2FnZU9ic2VydmVyPEluZGV4S2V5PEluY29taW5nRGF0YU1hcFQ+LCBJbmNvbWluZ0RhdGFNYXBUPik6IHZvaWQge1xuICAgIHRoaXMub2JzZXJ2ZXJzLnJlbW92ZShvLm1lc3NhZ2VUeXBlLCBvKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIGEgYG1lc3NhZ2VgIHRvIHRoZSBgdGFyZ2V0YCBvZiB0aGUgYElNZXNzZW5nZXJCcmlkZ2VgXG4gICAqXG4gICAqIEBwYXJhbSBtZXNzYWdlXG4gICAqL1xuICBwdWJsaWMgc2VuZChtZXNzYWdlOiBJTWVzc2FnZTxJbmRleEtleTxPdXRnb2luZ0RhdGFNYXBUPiwgT3V0Z29pbmdEYXRhTWFwVD4pOiB2b2lkIHtcbiAgICBjb25zdCBmcm9tSWQgPSB0aGlzLnNvdXJjZUlkO1xuICAgIGNvbnN0IHRvSWQgPSB0aGlzLnRhcmdldElkO1xuICAgIHRoaXMubWVzc2FnZUJyaWRnZS5zZW5kKHtcbiAgICAgIC4uLm1lc3NhZ2UsXG4gICAgICBmcm9tSWQsXG4gICAgICB0b0lkLFxuICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vdGlmeSBhbGwgb2JzZXJ2ZXJzIG9mIGBtZXNzYWdlLnR5cGVgIG9mIHRoZSBpbmNvbWluZyBgbWVzc2FnZWAgYWZ0ZXIgYW55IGZpbHRlcmluZyBvdXQgbWVzc2FnZXMgbm90IG1lYW50IGZvciB0aGlzIE1lc3NlbmdlclxuICAgKlxuICAgKiBAcGFyYW0gbWVzc2FnZVxuICAgKi9cbiAgcHJpdmF0ZSBvbk1lc3NhZ2VSZWNlaXZlZChtZXNzYWdlOiBJQnJpZGdlTWVzc2FnZTxJbmRleEtleTxJbmNvbWluZ0RhdGFNYXBUPiwgSW5jb21pbmdEYXRhTWFwVD4sIGNsaWVudEluZm86IENsaWVudEluZm8pIHtcbiAgICBpZiAoIXRoaXMuZmlsdGVyTWVzc2FnZUlkKG1lc3NhZ2UpKSByZXR1cm47XG5cbiAgICBjb25zdCBtZXNzYWdlVHlwZSA9IG1lc3NhZ2UudHlwZTtcbiAgICBjb25zdCBtZXNzYWdlT2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlcnMuZ2V0VmFsdWVzQXRLZXkobWVzc2FnZVR5cGUpO1xuICAgIGlmIChtZXNzYWdlT2JzZXJ2ZXJzKSB7XG4gICAgICBmb3IgKGNvbnN0IG9ic2VydmVyIG9mIG1lc3NhZ2VPYnNlcnZlcnMpIHtcbiAgICAgICAgLy8gVE9ETyAoc2RrIDEueCBzdXBwb3J0KTogU0RLIGJvb3RzdHJhcCAxLnggcHV0IHRoZSBwYXlsb2FkIGF0IHRoZSByb290IG9mIHRoZSBtZXNzYWdlLCBub3QgdW5kZXIgdGhlIGBwYXlsb2FkYCBwcm9wZXJ0eVxuICAgICAgICBjb25zdCBwYXlsb2FkID0gbWVzc2FnZS5wYXlsb2FkIHx8IG1lc3NhZ2UgYXMgdW5rbm93biBhcyBJbmNvbWluZ0RhdGFNYXBUW0V4Y2x1ZGU8a2V5b2YgSW5jb21pbmdEYXRhTWFwVCwgc3ltYm9sPl07XG4gICAgICAgIG9ic2VydmVyLm5vdGlmeShwYXlsb2FkLCBjbGllbnRJbmZvLCBtZXNzYWdlLnRpbWVzdGFtcCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZSB3aGV0aGVyIGBtZXNzYWdlYCBpcyBtZWFudCBmb3IgdGhpcyBNZXNzZW5nZXIgYW5kIGNvbWVzIGZyb20gYSBrbm93biB0YXJnZXRcbiAgICogQHBhcmFtIG1lc3NhZ2VcbiAgICovXG4gIHByaXZhdGUgZmlsdGVyTWVzc2FnZUlkKG1lc3NhZ2U6IElCcmlkZ2VNZXNzYWdlPEluZGV4S2V5PEluY29taW5nRGF0YU1hcFQ+LCBJbmNvbWluZ0RhdGFNYXBUPik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHRvSWQgPSBtZXNzYWdlLnRvSWQ7XG4gICAgY29uc3QgZnJvbUlkID0gbWVzc2FnZS5mcm9tSWQ7XG4gICAgaWYgKHRvSWQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgcmV0dXJuIHRvSWQuaW5kZXhPZih0aGlzLnNvdXJjZUlkKSA+IC0xO1xuICAgIH1cblxuICAgIC8vIFRPRE8gKHNkayAxLnggc3VwcG9ydCk6IFNESyBib290c3RyYXAgMS54IGhhZCBgdG9JZGAgYXMgdW5kZWZpbmVkIGZvciBtZXNzYWdlc1xuICAgIHJldHVybiAodG9JZCA9PT0gdW5kZWZpbmVkIHx8IHRvSWQgPT09IHRoaXMuc291cmNlSWQpICYmIGZyb21JZCA9PT0gdGhpcy50YXJnZXRJZDtcbiAgfVxufVxuXG4vKipcbiAqIEEgZGVjb3JhdGVkIElNZXNzZW5nZXIgdGhhdCBvbmx5IHNlbmRzIG1lc3NhZ2VzIGZyb20gYSBwcmVkZWZpbmVkIHNldCBvZiBtZXNzYWdlIHR5cGVzIGFuZCBlcnJvcnMgb24gb3RoZXJzLlxuICovXG5jbGFzcyBGaWx0ZXJlZE1lc3NlbmdlcjxcbiAgT3V0Z29pbmdEYXRhTWFwVCxcbiAgSW5jb21pbmdEYXRhTWFwVFxuPiBleHRlbmRzIE1lc3NlbmdlcjxPdXRnb2luZ0RhdGFNYXBULCBJbmNvbWluZ0RhdGFNYXBUPiB7XG4gIHByaXZhdGUgZXJyb3JCcmlkZ2U6IEVycm9yTWVzc2FnZUJyaWRnZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBzb3VyY2VJZDogbnVtYmVyLFxuICAgIHRhcmdldElkOiBudW1iZXIsXG4gICAgcHJpdmF0ZSBtZXNzZW5nZXI6IElNZXNzZW5nZXI8T3V0Z29pbmdEYXRhTWFwVCwgSW5jb21pbmdEYXRhTWFwVD4sXG4gICAgcHJpdmF0ZSBzZW5kRmlsdGVyOiBBcnJheTxJbmRleEtleTxPdXRnb2luZ0RhdGFNYXBUPj4sXG4gICkge1xuICAgIC8vIFRPRE8gKEBtcC9zZGspOiBzb21ldGhpbmcgYWJvdXQgdGhlIHRzY29uZmlnIGluIEBtcC9zZGsgcmVxdWlyZXMgYHN1cGVyYCB0byBiZSBjYWxsZWQgZmlyc3Qgc28gdGhlIGBuZXcgRXJyb3JNZXNzYWdlQnJpZGdlYCBjYW4ndCBiZSBzaGFyZWRcbiAgICBzdXBlcihzb3VyY2VJZCwgdGFyZ2V0SWQsIG5ldyBFcnJvck1lc3NhZ2VCcmlkZ2UoKSk7XG4gICAgdGhpcy5lcnJvckJyaWRnZSA9IG5ldyBFcnJvck1lc3NhZ2VCcmlkZ2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZW5kKG1lc3NhZ2U6IElNZXNzYWdlPEluZGV4S2V5PE91dGdvaW5nRGF0YU1hcFQ+LCBPdXRnb2luZ0RhdGFNYXBUPik6IHZvaWQge1xuICAgIGlmICh0aGlzLnNlbmRGaWx0ZXIuaW5jbHVkZXMobWVzc2FnZS50eXBlKSkge1xuICAgICAgdGhpcy5tZXNzZW5nZXIuc2VuZChtZXNzYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lcnJvckJyaWRnZS5zZW5kKCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgdHlwZSB7XG4gIElVbmRpcmVjdGVkTWVzc2VuZ2VyLCBJVW5kaXJlY3RlZE1lc3Nlbmdlckxpc3RlbmVyLCBJVW5kaXJlY3RlZE1lc3NlbmdlclNlbmRlcixcbiAgSU1lc3NhZ2UsIElNZXNzYWdlT2JzZXJ2ZXIsIElCcmlkZ2VNZXNzYWdlLFxuICBDbGllbnRJbmZvLFxufSBmcm9tICcuL0lNZXNzZW5nZXInO1xuaW1wb3J0IHsgQnJpZGdlT2JzZXJ2ZXIgfSBmcm9tICcuL0JyaWRnZU9ic2VydmVyJztcbmltcG9ydCB7IERpY3RBcnJheSB9IGZyb20gJ0BtcC91dGlsLWRpY3RhcnJheSc7XG5pbXBvcnQgdHlwZSB7IEluZGV4S2V5IH0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vKipcbiAqIEEgYmktZGlyZWN0aW9uYWwgY29tbXVuaWNhdG9yIHRoYXQgY2FuXG4gKiAtIG9wZW5seSByZWNlaXZlIG1lc3NhZ2VzIG9mIHR5cGUgYGtleW9mIEluY29taW5nRGF0YU1hcFRgIHZpYSBvYnNlcnZlcnMgZnJvbSB1bnNwZWNpZmllZCBzb3VyY2VzXG4gKiAtIHNlbmQgbWVzc2FnZXMgb2YgdHlwZSBga2V5b2YgT3V0Z29pbmdEYXRhTWFwVGAgdG8gdGFyZ2V0cyBzcGVjaWZpZWQgd2hlbiBzZW5kaW5nXG4gKlxuICogKipEaWZmZXJzIGZyb20gYSBzdGFuZGFyZCBgSU1lc3NlbmdlcmAgaW4gdGhhdCBpdCBkb2Vzbid0IGtub3cgaXQncyBjb21tdW5pY2F0aW9uIHRhcmdldCBhdCBjb25zdHJ1Y3Rpb24gdGltZSoqXG4gKlxuICogVGhlIHVuZGVybHlpbmcgY29tbXVuaWNhdGlvbiBtZWNoYW5pc21zIGFyZSBkZWZpbmVkIGJ5IGFuIGBJVW5kaXJlY3RlZE1lc3Nlbmdlckxpc3RlbmVyYCBwcm92aWRlZCBpbiB0aGUgY29uc3RydWN0b3JcbiAqIGFuZCBieSB0aGUgYElVbmRpcmVjdGVkTWVzc2VuZ2VyU2VuZGVyYCBwcm92aWRlZCBpbiBzZW5kXG4gKlxuICogQHBhcmFtIE91dGdvaW5nRGF0YU1hcFQgVGhlIG91dGdvaW5nIG1lc3NhZ2UgdHlwZXMgc3VwcG9ydGVkXG4gKiBAcGFyYW0gSW5jb21pbmdEYXRhTWFwVCBUaGUgaW5jb21pbmcgbWVzc2FnZSB0eXBlcyBzdXBwb3J0ZWQgYnkgcmVnaXN0ZXJlZCBvYnNlcnZlcnNcbiAqL1xuZXhwb3J0IGNsYXNzIFVuZGlyZWN0ZWRNZXNzZW5nZXI8XG4gIE91dGdvaW5nRGF0YU1hcFQsXG4gIEluY29taW5nRGF0YU1hcFQsXG4gIFNvdXJjZVQsXG4+IGltcGxlbWVudHMgSVVuZGlyZWN0ZWRNZXNzZW5nZXI8T3V0Z29pbmdEYXRhTWFwVCwgSW5jb21pbmdEYXRhTWFwVCwgU291cmNlVD4ge1xuXG4gIHByaXZhdGUgb2JzZXJ2ZXJzOiBEaWN0QXJyYXk8SW5kZXhLZXk8SW5jb21pbmdEYXRhTWFwVD4sIElNZXNzYWdlT2JzZXJ2ZXI8SW5kZXhLZXk8SW5jb21pbmdEYXRhTWFwVD4sIEluY29taW5nRGF0YU1hcFQ+PiA9IG5ldyBEaWN0QXJyYXkoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNvdXJjZUlkOiBudW1iZXIsIHByaXZhdGUgbGlzdGVuZXJCcmlkZ2U6IElVbmRpcmVjdGVkTWVzc2VuZ2VyTGlzdGVuZXI8SW5jb21pbmdEYXRhTWFwVD4pIHsgfVxuXG4gIC8qKlxuICAgKiBTdGFydCBsaXN0ZW5pbmcgZm9yIGFueSBpbmNvbWluZyBtZXNzYWdlcyB2aWEgdGhlIGBsaXN0ZW5lckJyaWRnZWBcbiAgICovXG4gIHB1YmxpYyBpbml0KCk6IHZvaWQge1xuICAgIGNsYXNzIFVuZGlyZWN0ZWRGYWNhZGUge1xuICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBtZXNzZW5nZXI6IFVuZGlyZWN0ZWRNZXNzZW5nZXI8T3V0Z29pbmdEYXRhTWFwVCwgSW5jb21pbmdEYXRhTWFwVCwgU291cmNlVD4pIHt9XG4gICAgICBwdWJsaWMgb25NZXNzYWdlUmVjZWl2ZWQobWVzc2FnZTogSUJyaWRnZU1lc3NhZ2U8SW5kZXhLZXk8SW5jb21pbmdEYXRhTWFwVD4sIEluY29taW5nRGF0YU1hcFQ+LCBjbGllbnRJbmZvOiBDbGllbnRJbmZvKSB7XG4gICAgICAgIHRoaXMubWVzc2VuZ2VyLm9uTWVzc2FnZVJlY2VpdmVkKG1lc3NhZ2UsIGNsaWVudEluZm8pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IG1lc3NlbmdlckZhY2FkZSA9IG5ldyBVbmRpcmVjdGVkRmFjYWRlKHRoaXMpO1xuICAgIGNvbnN0IGJyaWRnZU9ic2VydmVyID0gbmV3IEJyaWRnZU9ic2VydmVyKG1lc3NlbmdlckZhY2FkZSk7XG4gICAgdGhpcy5saXN0ZW5lckJyaWRnZS5saXN0ZW4oYnJpZGdlT2JzZXJ2ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3AgbGlzdGVuaW5nIGZvciBtZXNzYWdlcyBhbmQgY2xlYW4gdXAgdGhpcyBVbmRpcmVjdGVkTWVzc2VuZ2VyXG4gICAqL1xuICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLmxpc3RlbmVyQnJpZGdlLnN0b3BMaXN0ZW5pbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPYnNlcnZlIGluY29taW5nIG1lc3NhZ2VzXG4gICAqXG4gICAqIEBwYXJhbSBvYnNlcnZlclxuICAgKi9cbiAgcHVibGljIGFkZE9ic2VydmVyKG9ic2VydmVyOiBJTWVzc2FnZU9ic2VydmVyPEluZGV4S2V5PEluY29taW5nRGF0YU1hcFQ+LCBJbmNvbWluZ0RhdGFNYXBUPik6IHZvaWQge1xuICAgIHRoaXMub2JzZXJ2ZXJzLmFkZChvYnNlcnZlci5tZXNzYWdlVHlwZSwgb2JzZXJ2ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3AgYW4gb2JzZXJ2ZXIgZnJvbSByZWNlaXZpbmcgbWVzc2FnZXNcbiAgICpcbiAgICogQHBhcmFtIG9ic2VydmVyXG4gICAqL1xuICBwdWJsaWMgcmVtb3ZlT2JzZXJ2ZXIob2JzZXJ2ZXI6IElNZXNzYWdlT2JzZXJ2ZXI8SW5kZXhLZXk8SW5jb21pbmdEYXRhTWFwVD4sIEluY29taW5nRGF0YU1hcFQ+KTogdm9pZCB7XG4gICAgdGhpcy5vYnNlcnZlcnMucmVtb3ZlKG9ic2VydmVyLm1lc3NhZ2VUeXBlLCBvYnNlcnZlcik7XG4gIH1cblxuICAvKipcbiAgICogU2VuZCBhIGBtZXNzYWdlYCB0byB0aGUgYHRhcmdldGBcbiAgICpcbiAgICogQHBhcmFtIG1lc3NhZ2VcbiAgICogQHBhcmFtIHRhcmdldElkXG4gICAqIEBwYXJhbSB0YXJnZXRcbiAgICovXG4gIHB1YmxpYyBzZW5kKFxuICAgIG1lc3NhZ2U6IElNZXNzYWdlPEluZGV4S2V5PE91dGdvaW5nRGF0YU1hcFQ+LCBPdXRnb2luZ0RhdGFNYXBUPixcbiAgICB0YXJnZXRJZDogbnVtYmVyLFxuICAgIHRhcmdldDogSVVuZGlyZWN0ZWRNZXNzZW5nZXJTZW5kZXI8T3V0Z29pbmdEYXRhTWFwVCwgdW5rbm93bj4sXG4gICAgc291cmNlOiBTb3VyY2VULFxuICApOiB2b2lkIHtcbiAgICB0YXJnZXQuc2VuZCh7XG4gICAgICAuLi5tZXNzYWdlLFxuICAgICAgZnJvbUlkOiB0aGlzLnNvdXJjZUlkLFxuICAgICAgdG9JZDogdGFyZ2V0SWQsXG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgfSwgc291cmNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3RpZnkgYWxsIG9ic2VydmVycyBvZiBgbWVzc2FnZS50eXBlYCBvZiB0aGUgaW5jb21pbmcgYG1lc3NhZ2VgXG4gICAqXG4gICAqIEBwYXJhbSBtZXNzYWdlXG4gICAqL1xuICBwcml2YXRlIG9uTWVzc2FnZVJlY2VpdmVkKG1lc3NhZ2U6IElCcmlkZ2VNZXNzYWdlPEluZGV4S2V5PEluY29taW5nRGF0YU1hcFQ+LCBJbmNvbWluZ0RhdGFNYXBUPiwgY2xpZW50SW5mbzogQ2xpZW50SW5mbyk6IHZvaWQge1xuICAgIGNvbnN0IG1lc3NhZ2VUeXBlID0gbWVzc2FnZS50eXBlO1xuICAgIGNvbnN0IG1lc3NhZ2VPYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVycy5nZXRWYWx1ZXNBdEtleShtZXNzYWdlVHlwZSk7XG4gICAgaWYgKG1lc3NhZ2VPYnNlcnZlcnMpIHtcbiAgICAgIGZvciAoY29uc3Qgb2JzZXJ2ZXIgb2YgbWVzc2FnZU9ic2VydmVycykge1xuICAgICAgICAvLyBUT0RPIChzZGsgMS54IHN1cHBvcnQpOiBTREsgQm9vc3RyYXAgMS54IHB1dCB0aGUgcGF5bG9hZCBhdCB0aGUgcm9vdCBvZiB0aGUgbWVzc2FnZVxuICAgICAgICBjb25zdCBwYXlsb2FkID0gbWVzc2FnZS5wYXlsb2FkIHx8IG1lc3NhZ2UgYXMgdW5rbm93biBhcyBJbmNvbWluZ0RhdGFNYXBUW0V4Y2x1ZGU8a2V5b2YgSW5jb21pbmdEYXRhTWFwVCwgc3ltYm9sPl07XG4gICAgICAgIG9ic2VydmVyLm5vdGlmeShwYXlsb2FkLCBjbGllbnRJbmZvLCBtZXNzYWdlLnRpbWVzdGFtcCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgdHlwZSB7IFBvc3RNZXNzYWdlQ2xpZW50SW5mbyB9IGZyb20gJy4vUG9zdE1lc3NhZ2VDbGllbnRJbmZvJztcbmltcG9ydCB0eXBlIHsgSVVuZGlyZWN0ZWRNZXNzZW5nZXJMaXN0ZW5lciwgSVVuZGlyZWN0ZWRNZXNzZW5nZXJTZW5kZXIsIElPYnNlcnZlciwgSUJyaWRnZU1lc3NhZ2UsIElNZXNzYWdlIH0gZnJvbSAnLi4vTWVzc2VuZ2VyL0lNZXNzZW5nZXInO1xuXG4vKipcbiAqIEJyaWRnZXMgYW5kIGFic3RyYWN0cyBhIHdpbmRvdyBhbmQgaXRzIGFkZEV2ZW50TGlzdGVuZXIgZnVuY3Rpb24gdG8gcmVjZWl2ZSBgbWVzc2FnZWAgZXZlbnRzXG4gKlxuICogQHBhcmFtIEluY29taW5nRGF0YU1hcFQgVGhlIGluY29taW5nIG1lc3NhZ2UgdHlwZXMgc3VwcG9ydGVkXG4gKi9cbmV4cG9ydCBjbGFzcyBQb3N0TWVzc2FnZUxpc3RlbmVyPFxuICBJbmNvbWluZ0RhdGFNYXBULFxuPiBpbXBsZW1lbnRzIElVbmRpcmVjdGVkTWVzc2VuZ2VyTGlzdGVuZXI8SW5jb21pbmdEYXRhTWFwVD4ge1xuICBwcml2YXRlIG1lc3NhZ2VPYnNlcnZlcjogSU9ic2VydmVyPFtJTWVzc2FnZTxrZXlvZiBJbmNvbWluZ0RhdGFNYXBULCBJbmNvbWluZ0RhdGFNYXBUPiwgUG9zdE1lc3NhZ2VDbGllbnRJbmZvLCBudW1iZXJdPiB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIG9uTWVzc2FnZTogKGV2ZW50OiBNZXNzYWdlRXZlbnQpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0YXJnZXRXaW5kb3c6IFdpbmRvdykge1xuICAgIC8vIHNldCB1cCBhIGNhbGxiYWNrIHRvIHVzZSBpbiBgd2luZG93LmFkZEV2ZW50TGlzdGVuZXJgIHRoYXQgd2lsbCB0cmlnZ2VyIHRoZSByZWdpc3RlcmVkIG9ic2VydmVyc1xuICAgIHRoaXMub25NZXNzYWdlID0gKGV2ZW50OiBNZXNzYWdlRXZlbnQ8SUJyaWRnZU1lc3NhZ2U8a2V5b2YgSW5jb21pbmdEYXRhTWFwVCwgSW5jb21pbmdEYXRhTWFwVD4+KSA9PiB7XG4gICAgICBpZiAodGhpcy5tZXNzYWdlT2JzZXJ2ZXIpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGV2ZW50LmRhdGE7XG4gICAgICAgIHRoaXMubWVzc2FnZU9ic2VydmVyLm5vdGlmeSh7XG4gICAgICAgICAgLy8gVGhpcyBzcHJlYWQgaXMga2VwdCBmb3IgYmFja3dhcmQgY29tcGF0aWxpdHkgd2l0aCBtZXNzZW5nZXJzIGNvbXBpbGVkIGludG8gb2xkZXIgc2RrIGJvb3RzdHJhcHMuLi4gc3Vja3NcbiAgICAgICAgICAuLi5tZXNzYWdlLFxuICAgICAgICB9LCB7XG4gICAgICAgICAgaWQ6IG1lc3NhZ2UuZnJvbUlkLFxuICAgICAgICAgIG9yaWdpbjogZXZlbnQub3JpZ2luLFxuICAgICAgICAgIHNvdXJjZTogZXZlbnQuc291cmNlIGFzIFdpbmRvdyxcbiAgICAgICAgfSwgZXZlbnQuZGF0YS50aW1lc3RhbXApO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogU3RhcnQgcmVjZWl2aW5nIG1lc3NhZ2UgZXZlbnRzIGZyb20gcG9zdE1lc3NhZ2VcbiAgICpcbiAgICogQHBhcmFtIG9ic2VydmVyXG4gICAqL1xuICBwdWJsaWMgbGlzdGVuKG9ic2VydmVyOiBJT2JzZXJ2ZXI8W0lNZXNzYWdlPGtleW9mIEluY29taW5nRGF0YU1hcFQsIEluY29taW5nRGF0YU1hcFQ+LCBQb3N0TWVzc2FnZUNsaWVudEluZm9dPik6IHZvaWQge1xuICAgIGlmICghdGhpcy5tZXNzYWdlT2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMubWVzc2FnZU9ic2VydmVyID0gb2JzZXJ2ZXI7XG4gICAgICB0aGlzLnRhcmdldFdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdGhpcy5vbk1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wIHJlY2VpdmluZyBtZXNzYWdlIGV2ZW50cyBmcm9tIHBvc3RNZXNzYWdlXG4gICAqL1xuICBwdWJsaWMgc3RvcExpc3RlbmluZygpOiB2b2lkIHtcbiAgICB0aGlzLnRhcmdldFdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdGhpcy5vbk1lc3NhZ2UpO1xuICAgIHRoaXMubWVzc2FnZU9ic2VydmVyID0gbnVsbDtcbiAgfVxufVxuXG4vKipcbiAqIEJyaWRnZXMgYW5kIGFic3RyYWN0cyBhIHdpbmRvdyBhbmQgaXRzIHBvc3RNZXNzYWdlIGZ1bmN0aW9uIHRvIHNlbmQgbWVzc2FnZXNcbiAqXG4gKiBAcGFyYW0gT3V0Z29pbmdEYXRhTWFwVCBUaGUgb3V0Z29pbmcgbWVzc2FnZSB0eXBlcyBzdXBwb3J0ZWRcbiAqL1xuZXhwb3J0IGNsYXNzIFBvc3RNZXNzYWdlU2VuZGVyPFxuICBPdXRnb2luZ0RhdGFNYXBULFxuPiBpbXBsZW1lbnRzIElVbmRpcmVjdGVkTWVzc2VuZ2VyU2VuZGVyPE91dGdvaW5nRGF0YU1hcFQsIFdpbmRvdz4ge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdGFyZ2V0V2luZG93OiBXaW5kb3csIHByaXZhdGUgdGFyZ2V0T3JpZ2luOiBzdHJpbmcgPSAnKicpIHsgfVxuXG4gIC8qKlxuICAgKiBTZW5kIGEgbWVzc2FnZSBvdmVyIHBvc3RNZXNzYWdlIHRvIHRoZSBgdGFyZ2V0V2luZG93YFxuICAgKlxuICAgKiBAcGFyYW0gbWVzc2FnZVxuICAgKi9cbiAgcHVibGljIHNlbmQobWVzc2FnZTogSUJyaWRnZU1lc3NhZ2U8a2V5b2YgT3V0Z29pbmdEYXRhTWFwVCwgT3V0Z29pbmdEYXRhTWFwVD4sIF9zb3VyY2U6IFdpbmRvdyk6IHZvaWQge1xuICAgIHRoaXMudGFyZ2V0V2luZG93LnBvc3RNZXNzYWdlKG1lc3NhZ2UsIHRoaXMudGFyZ2V0T3JpZ2luKTtcbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgeyBJTWVzc2VuZ2VyQnJpZGdlLCBJTWVzc2FnZSwgSU9ic2VydmVyLCBJQnJpZGdlTWVzc2FnZSwgSVVuZGlyZWN0ZWRNZXNzZW5nZXJMaXN0ZW5lciwgSVVuZGlyZWN0ZWRNZXNzZW5nZXJTZW5kZXIgfSBmcm9tICcuLi9NZXNzZW5nZXIvSU1lc3Nlbmdlcic7XG5pbXBvcnQgeyBQb3N0TWVzc2FnZUxpc3RlbmVyLCBQb3N0TWVzc2FnZVNlbmRlciB9IGZyb20gJy4vVW5kaXJlY3RlZFBvc3RNZXNzYWdlQnJpZGdlJztcbmltcG9ydCB0eXBlIHsgSW5kZXhLZXkgfSBmcm9tICcuLi90eXBlcyc7XG5cbi8qKlxuICogQnJpZGdlcyBhbmQgc2V0cyB1cCBhIGRpcmVjdCBjaGFubmVsIGJldHdlZW4gdHdvIFdpbmRvd3MgdXNpbmcgcG9zdE1lc3NhZ2VcbiAqXG4gKiBAcGFyYW0gT3V0Z29pbmdEYXRhTWFwVCBUaGUgb3V0Z29pbmcgbWVzc2FnZSB0eXBlcyBzdXBwb3J0ZWRcbiAqIEBwYXJhbSBJbmNvbWluZ0RhdGFNYXBUIFRoZSBpbmNvbWluZyBtZXNzYWdlIHR5cGVzIHN1cHBvcnRlZFxuICovXG5leHBvcnQgY2xhc3MgUG9zdE1lc3NhZ2VCcmlkZ2U8XG4gIE91dGdvaW5nRGF0YU1hcFQsXG4gIEluY29taW5nRGF0YU1hcFQsXG4+IGltcGxlbWVudHMgSU1lc3NlbmdlckJyaWRnZTxPdXRnb2luZ0RhdGFNYXBULCBJbmNvbWluZ0RhdGFNYXBUPiB7XG4gIHByaXZhdGUgbGlzdGVuZXI6IElVbmRpcmVjdGVkTWVzc2VuZ2VyTGlzdGVuZXI8SW5jb21pbmdEYXRhTWFwVD47XG4gIHByaXZhdGUgc2VuZGVyOiBJVW5kaXJlY3RlZE1lc3NlbmdlclNlbmRlcjxPdXRnb2luZ0RhdGFNYXBULCBXaW5kb3c+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc291cmNlV2luZG93OiBXaW5kb3csIHRhcmdldFdpbmRvdzogV2luZG93LCB0YXJnZXRPcmlnaW46IHN0cmluZyA9ICcqJykge1xuICAgIHRoaXMubGlzdGVuZXIgPSBuZXcgUG9zdE1lc3NhZ2VMaXN0ZW5lcihzb3VyY2VXaW5kb3cpO1xuICAgIHRoaXMuc2VuZGVyID0gbmV3IFBvc3RNZXNzYWdlU2VuZGVyKHRhcmdldFdpbmRvdywgdGFyZ2V0T3JpZ2luKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydCByZWNlaXZpbmcgbWVzc2FnZSBldmVudHMgZnJvbSBwb3N0TWVzc2FnZVxuICAgKlxuICAgKiBAcGFyYW0gb2JzZXJ2ZXJcbiAgICovXG4gIHB1YmxpYyBsaXN0ZW4ob2JzZXJ2ZXI6IElPYnNlcnZlcjxbSU1lc3NhZ2U8a2V5b2YgSW5jb21pbmdEYXRhTWFwVCwgSW5jb21pbmdEYXRhTWFwVD5dPik6IHZvaWQge1xuICAgIHRoaXMubGlzdGVuZXIubGlzdGVuKG9ic2VydmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wIHJlY2VpdmluZyBtZXNzYWdlIGV2ZW50cyBmcm9tIHBvc3RNZXNzYWdlXG4gICAqL1xuICBwdWJsaWMgc3RvcExpc3RlbmluZygpOiB2b2lkIHtcbiAgICB0aGlzLmxpc3RlbmVyLnN0b3BMaXN0ZW5pbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIGEgbWVzc2FnZSBvdmVyIHBvc3RNZXNzYWdlIHRvIHRoZSBgdGFyZ2V0V2luZG93YFxuICAgKlxuICAgKiBAcGFyYW0gbWVzc2FnZVxuICAgKi9cbiAgcHVibGljIHNlbmQobWVzc2FnZTogSUJyaWRnZU1lc3NhZ2U8SW5kZXhLZXk8T3V0Z29pbmdEYXRhTWFwVD4sIE91dGdvaW5nRGF0YU1hcFQ+KTogdm9pZCB7XG4gICAgdGhpcy5zZW5kZXIuc2VuZChtZXNzYWdlLCB0aGlzLnNvdXJjZVdpbmRvdyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1lc3NlbmdlciB9IGZyb20gJy4uL01lc3Nlbmdlci9NZXNzZW5nZXInO1xuaW1wb3J0IHR5cGUgeyBJTWVzc2VuZ2VyRmFjdG9yeSwgSU1lc3NlbmdlciB9IGZyb20gJy4uL01lc3Nlbmdlci9JTWVzc2VuZ2VyJztcbmltcG9ydCB7IFBvc3RNZXNzYWdlQnJpZGdlIH0gZnJvbSAnLi9Qb3N0TWVzc2FnZUJyaWRnZSc7XG5cbi8qKlxuICogQSBzaW1wbGUgZmFjdG9yeSB0byBjcmVhdGUgUG9zdE1lc3NhZ2UgdG8gaGlkZSBhd2F5IHRoZSBkZXRhaWxzIG9mIGlkcyBhbmQgc291cmNlL2FyZ2V0IFdpbmRvdyBpbmZvcm1hdGlvblxuICovXG5leHBvcnQgY2xhc3MgUG9zdE1lc3NhZ2VGYWN0b3J5PE91dGdvaW5nRGF0YU1hcFQsIEluY29taW5nRGF0YU1hcFQ+IGltcGxlbWVudHMgSU1lc3NlbmdlckZhY3Rvcnk8T3V0Z29pbmdEYXRhTWFwVCwgSW5jb21pbmdEYXRhTWFwVD4gIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzb3VyY2VJZDogbnVtYmVyLCBwcml2YXRlIHNvdXJjZVdpbmRvdzogV2luZG93LFxuICAgIHByaXZhdGUgdGFyZ2V0SWQ6IG51bWJlciwgcHJpdmF0ZSB0YXJnZXRXaW5kb3c6IFdpbmRvdywgcHJpdmF0ZSB0YXJnZXRPcmlnaW46IHN0cmluZyA9ICcqJykgeyB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIFBvc3RNZXNzYWdlIGNoYW5uZWxcbiAgICogQHBhcmFtIE91dGdvaW5nRGF0YU1hcFQgVGhlIG91dGdvaW5nIG1lc3NhZ2UgdHlwZXMgc3VwcG9ydGVkIGJ5IHRoZSBuZXdseSBjcmVhdGVkIElNZXNzZW5nZXJcbiAgICogQHBhcmFtIE91dGdvaW5nRGF0YU1hcFQgVGhlIGluY29taW5nIG1lc3NhZ2UgdHlwZXMgc3VwcG9ydGVkIGJ5IHRoZSBuZXdseSBjcmVhdGVkIElNZXNzZW5nZXJcbiAgICovXG4gIHB1YmxpYyBjcmVhdGVNZXNzZW5nZXIoKTogSU1lc3NlbmdlcjxPdXRnb2luZ0RhdGFNYXBULCBJbmNvbWluZ0RhdGFNYXBUPiB7XG4gICAgY29uc3QgcG9zdE1lc3NhZ2VCcmlkZ2UgPSBuZXcgUG9zdE1lc3NhZ2VCcmlkZ2U8T3V0Z29pbmdEYXRhTWFwVCwgSW5jb21pbmdEYXRhTWFwVD4odGhpcy5zb3VyY2VXaW5kb3csIHRoaXMudGFyZ2V0V2luZG93LCB0aGlzLnRhcmdldE9yaWdpbik7XG4gICAgY29uc3QgbWVzc2VuZ2VyID0gbmV3IE1lc3NlbmdlcjxPdXRnb2luZ0RhdGFNYXBULCBJbmNvbWluZ0RhdGFNYXBUPih0aGlzLnNvdXJjZUlkLCB0aGlzLnRhcmdldElkLCBwb3N0TWVzc2FnZUJyaWRnZSk7XG4gICAgcmV0dXJuIG1lc3NlbmdlcjtcbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgeyBDb25uZWN0UmVzcG9uc2UgfSBmcm9tICcuL0Nvbm5lY3Rvcic7XG5pbXBvcnQgdHlwZSB7IElNZXNzZW5nZXJGYWN0b3J5IH0gZnJvbSAnQHNkay9tZXNzZW5nZXJzJztcblxuaW1wb3J0IHR5cGUgeyBNcFNkayB9IGZyb20gJ0BzZGsvdHlwZXMnO1xuaW1wb3J0IHsgRHluYW1pY0xpYkxvYWRlciB9IGZyb20gJ2R5bmFtaWMtbGliLWxvYWRlcic7XG5cbnR5cGUgRGljdDxUID0gdW5rbm93bj4gPSBSZWNvcmQ8c3RyaW5nLCBUIHwgdW5kZWZpbmVkPjtcblxuLy8gZGVjbGFyZSBjbGFzcyBpcyBsaWtlIGRlZmluaW5nIGFuIGludGVyZmFjZSwgYnV0IGl0IGNhbiBoYXZlIGEgY29uc3RydWN0b3Jcbi8vIGl0J3Mgc2ltaWxhciB0byBgZXh0ZXJuYCwgd2hlcmUgdGhpcyBjbGFzcyBpcyBmdWxseSBkZWZpbmVkIGFuZCBpbXBsZW1lbnRlZCBlbHNld2hlcmVcbmRlY2xhcmUgY2xhc3MgU2RrQnVpbGRlcjxPdXRnb2luZ0RhdGFNYXBUID0gdW5rbm93biwgSW5jb21pbmdEYXRhTWFwVCA9IHVua25vd24+IHtcbiAgY29uc3RydWN0b3IobWVzc2VuZ2VyRmFjdG9yeTogSU1lc3NlbmdlckZhY3Rvcnk8T3V0Z29pbmdEYXRhTWFwVCwgSW5jb21pbmdEYXRhTWFwVD4sIHdpbmRvd0NvbnRleHQ6IFdpbmRvdyk7XG4gIHB1YmxpYyBidWlsZChzZXJpYWxpemVkSW50ZXJmYWNlOiBEaWN0KTogTXBTZGs7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNka0Nvbm5lY3RvcjxUIGV4dGVuZHMgQ29ubmVjdFJlc3BvbnNlPiB7XG4gIGNvbm5lY3QoKTogUHJvbWlzZTxUPjtcbiAgY2FuY2VsQ29ubmVjdGluZygpOiB2b2lkO1xufVxuXG5leHBvcnQgdHlwZSBNZXNzZW5nZXJGYWN0b3J5RmV0Y2hlcjxDb25uZWN0UmVzcG9uc2VUIGV4dGVuZHMgQ29ubmVjdFJlc3BvbnNlLCBPdXV0Z29pbmdEYXRhTWFwLCBJbmNvbWluZ0RhdGFNYXA+ID0ge1xuICBnZXRGYWN0b3J5KGNvbm5lY3RSZXNwb25zZTogQ29ubmVjdFJlc3BvbnNlVCk6IElNZXNzZW5nZXJGYWN0b3J5PE91dXRnb2luZ0RhdGFNYXAsIEluY29taW5nRGF0YU1hcD47XG59O1xuXG5leHBvcnQgbmFtZXNwYWNlIE1QX1NESyB7XG4gIGNvbnN0IGxpYkxvYWRlciA9IG5ldyBEeW5hbWljTGliTG9hZGVyKCk7XG4gIGV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25uZWN0PFQgZXh0ZW5kcyBDb25uZWN0UmVzcG9uc2UgPSBDb25uZWN0UmVzcG9uc2UsIE91dGdvaW5nRGF0YU1hcCA9IHVua25vd24sIEluY29taW5nRGF0YU1hcCA9IHVua25vd24+KFxuICAgIGNvbm5lY3RvcjogSVNka0Nvbm5lY3RvcjxUPixcbiAgICBmYWN0b3J5RmV0Y2hlcjogTWVzc2VuZ2VyRmFjdG9yeUZldGNoZXI8VCwgT3V0Z29pbmdEYXRhTWFwLCBJbmNvbWluZ0RhdGFNYXA+LFxuICAgIHdpbmRvd0NvbnRleHQ6IFdpbmRvdyxcbiAgKTogUHJvbWlzZTxNcFNkaz4ge1xuICAgIGxldCBjb25uZWN0UmVzcG9uc2U6IFQ7XG4gICAgdHJ5IHtcbiAgICAgIGNvbm5lY3RSZXNwb25zZSA9IGF3YWl0IGNvbm5lY3Rvci5jb25uZWN0KCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIC8vIGFmdGVyIGEgY29ubmVjdGlvbiBpcyBzdWNjZXNzZnVsIG9yIG5vdCwgc2h1dGRvd24gdGhlIGNvbm5lY3RvciBhbmQgaXRzIHBvc3RtZXNzYWdlIHJlY2VpdmluZyBtZXNzYWdlc1xuICAgICAgY29ubmVjdG9yLmNhbmNlbENvbm5lY3RpbmcoKTtcbiAgICB9XG5cbiAgICAvLyBmZXRjaCBhbmQgYnVpbGQgdGhlIGNsaWVudCBpbnRlcmZhY2VcbiAgICBjb25zdCBidWlsZGVyID0gYXdhaXQgZmV0Y2hTY3JpcHQoY29ubmVjdFJlc3BvbnNlLnNjcmlwdFVybCk7XG4gICAgLy8gc2V0IHVwIGEgZmFjdG9yeSBzbyB0aGF0IHRoZSBjbGllbnQgY2FuIGNyZWF0ZSBNZXNzZW5nZXIgY2hhbm5lbHNcbiAgICBjb25zdCBtZXNzZW5nZXJGYWN0b3J5ID0gZmFjdG9yeUZldGNoZXIuZ2V0RmFjdG9yeShjb25uZWN0UmVzcG9uc2UpO1xuICAgIC8vIGJ1aWxkIGFuZCByZXR1cm4gdGhlIGNsaWVudCBpbnRlcmZhY2UgdG8gdGhlIHVzZXJcbiAgICByZXR1cm4gYnVpbGRJbnRlcmZhY2Uod2luZG93Q29udGV4dCwgYnVpbGRlciwgbWVzc2VuZ2VyRmFjdG9yeSwgY29ubmVjdFJlc3BvbnNlLnNlcmlhbGl6ZWRJbnRlcmZhY2UpO1xuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gZmV0Y2hTY3JpcHQodXJsPzogc3RyaW5nKTogUHJvbWlzZTx0eXBlb2YgU2RrQnVpbGRlcj4ge1xuICAgIGlmICghdXJsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZWQgdG8gbG9hZCB0aGUgc2RrJyk7XG4gICAgfVxuXG4gICAgLy8gZmV0Y2ggYW5kIGNhY2hlIHRoZSBwcm9taXNlIGZvciB0aGUgcmVxdWVzdGVkIHNjcmlwdFxuICAgIHRyeSB7XG4gICAgICBjb25zdCBzZGtDbGllbnQgPSBhd2FpdCBsaWJMb2FkZXIubG9hZDx7U2RrQnVpbGRlcjogdHlwZW9mIFNka0J1aWxkZXJ9Pih1cmwsICdzZGstY2xpZW50Jyk7XG4gICAgICBpZiAoc2RrQ2xpZW50ICYmIHNka0NsaWVudC5TZGtCdWlsZGVyICYmIHR5cGVvZiBzZGtDbGllbnQuU2RrQnVpbGRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gc2RrQ2xpZW50LlNka0J1aWxkZXI7XG4gICAgICB9XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBjYXRjaCBhbGwgYW5kIFwiaWdub3JlXCIsIHNpbmNlIHdlJ2xsIHRocm93IHNob3J0bHkgYW55d2F5XG4gICAgfVxuICAgIHRocm93IEVycm9yKGBDb3VsZCBub3QgbG9hZCB0aGUgc2RrIGZyb20gJHt1cmx9YCk7XG4gIH1cblxuICBmdW5jdGlvbiBidWlsZEludGVyZmFjZTxPdXRnb2luZ0RhdGFNYXBULCBJbmNvbWluZ0RhdGFNYXBUPihcbiAgICB3aW5kb3dDb250ZXh0OiBXaW5kb3csXG4gICAgc2RrQnVpbGRlcjogdHlwZW9mIFNka0J1aWxkZXIsXG4gICAgbWVzc2VuZ2VyRmFjdG9yeTogSU1lc3NlbmdlckZhY3Rvcnk8T3V0Z29pbmdEYXRhTWFwVCwgSW5jb21pbmdEYXRhTWFwVD4sXG4gICAgc2VyaWFsaXplZEludGVyZmFjZTogRGljdCxcbiAgKTogUmV0dXJuVHlwZTxTZGtCdWlsZGVyWydidWlsZCddPiB7XG4gICAgcmV0dXJuIG5ldyBzZGtCdWlsZGVyKG1lc3NlbmdlckZhY3RvcnksIHdpbmRvd0NvbnRleHQpLmJ1aWxkKHNlcmlhbGl6ZWRJbnRlcmZhY2UpO1xuICB9XG59XG4iLCJpbXBvcnQgdHlwZSB7IEVycm9yVHlwZSB9IGZyb20gJy4vRXJyb3JzJztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gT3V0Z29pbmcgTWVzc2FnZXMgLS0tLS0tLS0tLS0tLS0tLS0gLy9cbmV4cG9ydCBlbnVtIE91dGdvaW5nTWVzc2FnZVR5cGUge1xuICBDT05ORUNUID0gJ3Bvc3RtZXNzYWdlLmNvbm5lY3QnLFxufVxuXG4vKipcbiAqIFRoZSBkYXRhIHBheWxvYWQgb2YgYSBDb25uZWN0IG1lc3NhZ2VcbiAqL1xuZXhwb3J0IHR5cGUgQ29ubmVjdFBheWxvYWQgPSB7XG4gIC8qKiBUaGUgdmVyc2lvbiBvZiB0aGUgc2RrIGJvb3RzdHJhcCBhdHRlbXB0aW5nIHRvIGNvbm5lY3QgKi9cbiAgYm9vdHN0cmFwVmVyc2lvbjogc3RyaW5nO1xuICBvcHRpb25zOiB7XG4gICAgLyoqIEFuIGF1dGggdG9rZW4gKi9cbiAgICBhdXRoPzogc3RyaW5nO1xuXG4gICAgLyoqIHByb3ZpZGVyIG5hbWUgKi9cbiAgICBwcm92aWRlcj86IHN0cmluZztcblxuICAgIHNka1R5cGU/OiBzdHJpbmc7XG4gIH0sXG4gIC8vIFRPRE8gKHNkayk6IHNkayBib290c3RyYXAgdjIueCBwYXNzZWQgdGhlIGFwcGxpY2F0aW9uS2V5OyByZW1vdmUgdGhpcyB3aGVuIHRob3NlIHZlcnNpb25zIGFyZSBubyBsb25nZXIgc3VwcG9ydGVkXG4gIGFwcGxpY2F0aW9uS2V5Pzogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBBIG1hcCBiZXR3ZWVuIHRoZSBvdXRnb2luZyBtZXNzYWdlcyB0eXBlcyBhbmQgdGhlIGRhdGEgYXNzb2NpYXRlZCB3aXRoIHRoZSBtZXNzYWdlXG4gKi9cbmV4cG9ydCB0eXBlIE91dGdvaW5nRGF0YU1hcCA9IHtcbiAgW091dGdvaW5nTWVzc2FnZVR5cGUuQ09OTkVDVF06IENvbm5lY3RQYXlsb2FkLFxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gSW5jb21pbmcgTWVzc2FnZXMgLS0tLS0tLS0tLS0tLS0tLS0gLy9cbmV4cG9ydCBlbnVtIEluY29taW5nTWVzc2FnZVR5cGUge1xuICBIQU5EU0hBS0UgPSAncG9zdG1lc3NhZ2UuaGFuZHNoYWtlJyxcbiAgQUNDRVBUICAgID0gJ3Bvc3RtZXNzYWdlLmFjY2VwdCcsXG4gIFJFSkVDVCAgICA9ICdwb3N0bWVzc2FnZS5yZWplY3QnLFxufVxuXG4vKipcbiAqIFRoZSBkYXRhIG9mIGEgbWVzc2FnZSBzaWduYWxsaW5nIHRoYXQgdGhlIGNvbm5lY3Rpb24gd2FzIChtb3N0bHkpIGFjY2VwdGVkIGJ1dCBoYXNuJ3QgYmVlbiBmaW5hbGl6ZWQgeWV0XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSGFuZHNoYWtlUGF5bG9hZCB7XG4gIC8qKiBETyBOT1QgVVNFOiBQbGFjZWhvbGRlciB0byBtYWtlIHRoaXMgdHlwZSB1bmlxdWUgZnJvbSBvdGhlciBtZXNzYWdlIERhdGEgdHlwZXMgKi9cbiAgdW51c2VkPzogJ2hhbmRzaGFrZS5kYXRhJztcbn1cblxuLyoqXG4gKiBUaGUgZGF0YSBvZiBhIG1lc3NhZ2Ugc2lnbmFsbGluZyB0aGUgY29ubmVjdGlvbiB0byB0aGUgaG9zdCB3YXMgYWNjZXB0ZWRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBY2NlcHRQYXlsb2FkIHtcbiAgLyoqIFRoZSBpZCB0aGF0IHdhcyBhc3NpZ25lZCB0byB0aGllIGNsaWVudCBiZWhpbmQgdGhpcyBjb25uZWN0aW9uICovXG4gIHNvdXJjZUlkOiBudW1iZXI7XG4gIC8qKiBUaGUgcmVtb3RlIHVybCBvZiB0aGUgY2xpZW50IHNjcmlwdCB0byBiZSBkeW5hbWljYWxseSBsb2FkZWQgKi9cbiAgc2NyaXB0VXJsOiBzdHJpbmc7XG4gIC8qKiBUaGUgc2VyaWFsaXplZCBpbnRlcmZhY2UgdGhhdCB0aGUgaG9zdCBzdXBwb3J0cyAqL1xuICBpbnRlcmZhY2U6IFJlY29yZDxzdHJpbmcsIHVua25vd24gfCB1bmRlZmluZWQ+O1xuICAvKiogVGhlIGlkIG9mIHRoZSBob3N0IHRoYXQgYWNjZXB0ZWQgdGhlIGNvbm5lY3Rpb24gKi9cbiAgdGFyZ2V0SWQ6IG51bWJlcjtcbiAgLyoqIFRoZSBvcmlnaW4gb2YgdGhlIGhvc3QgdGhhdCBhY2NlcHRlZCB0aGUgY29ubmVjdGlvbiAqL1xuICB0YXJnZXRPcmlnaW46IHN0cmluZztcbn1cblxuLyoqXG4gKiBUaGUgZGF0YSBvZiBhIG1lc3NhZ2Ugc2lnbmFsbGluZyB0aGF0IHRoZSBjb25uZWN0aW9uIHdhcyByZWplY3RlZCBvciBmYWlsZWRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZWplY3RQYXlsb2FkIHtcbiAgLyoqIFRoZSBlcnJvciBtZXNzYWdlIHdoeSBjb25uZWN0aW5nIGZhaWxlZCAqL1xuICByZWFzb246IHN0cmluZztcbiAgLyoqIFRoZSBzcGVjaWZpYyB0eXBlIG9mIGVycm9yIHRocm93biB3aGVuIGNvbm5lY3RpbmcgKi9cbiAgZXJyb3JUeXBlOiBFcnJvclR5cGU7XG59XG5cbi8qKlxuICogQSBtYXAgYmV0d2VlbiB0aGUgaW5jb21pbmcgbWVzc2FnZXMgdHlwZXMgYW5kIHRoZSBkYXRhIGFzc29jaWF0ZWQgd2l0aCB0aGUgbWVzc2FnZVxuICovXG5leHBvcnQgdHlwZSBJbmNvbWluZ0RhdGFNYXAgPSB7XG4gIFtJbmNvbWluZ01lc3NhZ2VUeXBlLkhBTkRTSEFLRV06IEhhbmRzaGFrZVBheWxvYWQ7XG4gIFtJbmNvbWluZ01lc3NhZ2VUeXBlLkFDQ0VQVF06IEFjY2VwdFBheWxvYWQ7XG4gIFtJbmNvbWluZ01lc3NhZ2VUeXBlLlJFSkVDVF06IFJlamVjdFBheWxvYWQ7XG59O1xuIiwiZXhwb3J0IGVudW0gRXJyb3JUeXBlIHtcbiAgQ0FOQ0VMTEVEID0gJ0Nvbm5lY3Rpb25DYW5jZWxsZWQnLFxuICBSRUZVU0VEID0gJ0Nvbm5lY3Rpb25SZWZ1c2VkJyxcbiAgSU5WQUxJRF9QUk9WSURFUiA9ICdJbnZhbGlkUHJvdmlkZXInLFxuICBLRVlfTUlTTUFUQ0ggPSAnS2V5UmVmZXJyZXJNaXNtYXRjaCcsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2RrQ29ubmVjdEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICByZWFkb25seSB0eXBlOiBFcnJvclR5cGU7XG4gIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcbn1cbiIsImltcG9ydCB0eXBlIHsgSU1lc3NhZ2UgfSBmcm9tICdAc2RrL21lc3NlbmdlcnMnO1xuaW1wb3J0IHR5cGUgeyBDb25uZWN0aW9uT3B0aW9ucyB9IGZyb20gJy4uL0Nvbm5lY3Rvcic7XG5pbXBvcnQgdHlwZSB7IENvbm5lY3RQYXlsb2FkLCBPdXRnb2luZ0RhdGFNYXB9IGZyb20gJy4uL01lc3NhZ2VUeXBlcyc7XG5pbXBvcnQgeyBPdXRnb2luZ01lc3NhZ2VUeXBlIH0gZnJvbSAnLi4vTWVzc2FnZVR5cGVzJztcblxuZXhwb3J0IGNsYXNzIENvbm5lY3RNZXNzYWdlIGltcGxlbWVudHMgSU1lc3NhZ2U8T3V0Z29pbmdNZXNzYWdlVHlwZS5DT05ORUNULCBPdXRnb2luZ0RhdGFNYXA+IHtcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBPdXRnb2luZ01lc3NhZ2VUeXBlLkNPTk5FQ1Q7XG4gIHB1YmxpYyByZWFkb25seSBwYXlsb2FkOiBDb25uZWN0UGF5bG9hZDtcblxuICBjb25zdHJ1Y3Rvcihib290c3RyYXBWZXJzaW9uOiBzdHJpbmcsIG9wdGlvbnM6IFBhcnRpYWw8Q29ubmVjdGlvbk9wdGlvbnM+ID0ge30pIHtcbiAgICB0aGlzLnBheWxvYWQgPSB7XG4gICAgICBib290c3RyYXBWZXJzaW9uLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBhdXRoOiBvcHRpb25zLmF1dGgsXG4gICAgICAgIHByb3ZpZGVyOiBvcHRpb25zLnByb3ZpZGVyLFxuICAgICAgICBzZGtUeXBlOiBvcHRpb25zLnNka1R5cGUsXG4gICAgICB9LFxuICAgICAgYXBwbGljYXRpb25LZXk6IG9wdGlvbnMuYXBwbGljYXRpb25LZXksXG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgeyBDbGllbnRJbmZvLCBJTWVzc2FnZU9ic2VydmVyIH0gZnJvbSAnQHNkay9tZXNzZW5nZXJzJztcbmltcG9ydCB0eXBlIHsgSW5jb21pbmdEYXRhTWFwLCBIYW5kc2hha2VQYXlsb2FkIH0gZnJvbSAnLi4vTWVzc2FnZVR5cGVzJztcbmltcG9ydCB7IEluY29taW5nTWVzc2FnZVR5cGUgfSBmcm9tICcuLi9NZXNzYWdlVHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEhhbmRzaGFrZVJlY2VpdmVyIHtcbiAgaGFuZHNoYWtlKCk6IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBIYW5kc2hha2VPYnNlcnZlciBpbXBsZW1lbnRzIElNZXNzYWdlT2JzZXJ2ZXI8SW5jb21pbmdNZXNzYWdlVHlwZS5IQU5EU0hBS0UsIEluY29taW5nRGF0YU1hcD4ge1xuICBwdWJsaWMgcmVhZG9ubHkgbWVzc2FnZVR5cGUgPSBJbmNvbWluZ01lc3NhZ2VUeXBlLkhBTkRTSEFLRTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWNlaXZlcjogSGFuZHNoYWtlUmVjZWl2ZXIpIHsgfVxuXG4gIHB1YmxpYyBub3RpZnkoX2hhbmRzaGFrZTogSGFuZHNoYWtlUGF5bG9hZCwgX2NsaWVudEluZm86IENsaWVudEluZm8sIF90aW1lc3RhbXA6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMucmVjZWl2ZXIuaGFuZHNoYWtlKCk7XG4gIH1cbn1cbiIsImltcG9ydCB0eXBlIHsgQ2xpZW50SW5mbywgSU1lc3NhZ2VPYnNlcnZlciB9IGZyb20gJ0BzZGsvbWVzc2VuZ2Vycyc7XG5pbXBvcnQgdHlwZSB7IEluY29taW5nRGF0YU1hcCwgQWNjZXB0UGF5bG9hZCB9IGZyb20gJy4uL01lc3NhZ2VUeXBlcyc7XG5pbXBvcnQgeyBJbmNvbWluZ01lc3NhZ2VUeXBlIH0gZnJvbSAnLi4vTWVzc2FnZVR5cGVzJztcblxudHlwZSBEaWN0PFQgPSB1bmtub3duPiA9IFJlY29yZDxzdHJpbmcsIFQgfCB1bmRlZmluZWQ+O1xuXG5leHBvcnQgaW50ZXJmYWNlIEFjY2VwdFJlY2VpdmVyIHtcbiAgYWNjZXB0KHNvdXJjZUlkOiBudW1iZXIsIHNjcmlwdFVybDogc3RyaW5nLCBzZXJpYWxpemVkSW50ZXJmYWNlOiBEaWN0LCB0YXJnZXRJZDogbnVtYmVyLCB0YXJnZXRPcmlnaW46IHN0cmluZyk6IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBBY2NlcHRPYnNlcnZlciBpbXBsZW1lbnRzIElNZXNzYWdlT2JzZXJ2ZXI8SW5jb21pbmdNZXNzYWdlVHlwZS5BQ0NFUFQsIEluY29taW5nRGF0YU1hcD4ge1xuICBwdWJsaWMgcmVhZG9ubHkgbWVzc2FnZVR5cGUgPSBJbmNvbWluZ01lc3NhZ2VUeXBlLkFDQ0VQVDtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWNlaXZlcjogQWNjZXB0UmVjZWl2ZXIpIHt9XG5cbiAgcHVibGljIG5vdGlmeShhY2NlcHQ6IEFjY2VwdFBheWxvYWQsIF9jbGllbnRJbmZvOiBDbGllbnRJbmZvLCBfdGltZXN0YW1wOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCB7IHNvdXJjZUlkLCBzY3JpcHRVcmwsIHRhcmdldElkLCB0YXJnZXRPcmlnaW4gfSA9IGFjY2VwdDtcbiAgICBjb25zdCBzZXJpYWxpemVkSW50ZXJmYWNlID0gYWNjZXB0LmludGVyZmFjZTsgLy8gY2FuJ3QgYmUgZGVzdHJ1Y3R1cmVkIGJlY2F1c2UgYGludGVyZmFjZWAgaXMgYSByZXNlcnZlZCB3b3JkXG5cbiAgICB0aGlzLnJlY2VpdmVyLmFjY2VwdChzb3VyY2VJZCwgc2NyaXB0VXJsLCBzZXJpYWxpemVkSW50ZXJmYWNlLCB0YXJnZXRJZCwgdGFyZ2V0T3JpZ2luKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRXJyb3JUeXBlLCB0eXBlIFNka0Nvbm5lY3RFcnJvciB9IGZyb20gJy4vdHlwZSc7XG5cbmV4cG9ydCBjbGFzcyBDb25uZWN0aW9uUmVmdXNlZEVycm9yIGV4dGVuZHMgRXJyb3IgaW1wbGVtZW50cyBTZGtDb25uZWN0RXJyb3Ige1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZTogRXJyb3JUeXBlID0gRXJyb3JUeXBlLlJFRlVTRUQ7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5uYW1lID0gJ0Nvbm5lY3Rpb25SZWZ1c2VkRXJyb3InO1xuICB9XG59XG4iLCJpbXBvcnQgeyBFcnJvclR5cGUsIHR5cGUgU2RrQ29ubmVjdEVycm9yIH0gZnJvbSAnLi90eXBlJztcblxuZXhwb3J0IGNsYXNzIEludmFsaWRQcm92aWRlckVycm9yIGV4dGVuZHMgRXJyb3IgaW1wbGVtZW50cyBTZGtDb25uZWN0RXJyb3Ige1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZTogRXJyb3JUeXBlID0gRXJyb3JUeXBlLklOVkFMSURfUFJPVklERVI7XG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2U/OiBzdHJpbmcpIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB0aGlzLm5hbWUgPSAnSW52YWxpZFByb3ZpZGVyRXJyb3InO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IEVycm9yVHlwZSwgdHlwZSBTZGtDb25uZWN0RXJyb3IgfSBmcm9tICcuL3R5cGUnO1xuXG5leHBvcnQgY2xhc3MgS2V5UmVmZXJyZXJNaXNtYXRjaEVycm9yIGV4dGVuZHMgRXJyb3IgaW1wbGVtZW50cyBTZGtDb25uZWN0RXJyb3Ige1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZTogRXJyb3JUeXBlID0gRXJyb3JUeXBlLktFWV9NSVNNQVRDSDtcbiAgY29uc3RydWN0b3IobWVzc2FnZT86IHN0cmluZykge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIHRoaXMubmFtZSA9ICdLZXlSZWZlcnJlck1pc21hdGNoRXJyb3InO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb25uZWN0aW9uUmVmdXNlZEVycm9yIH0gZnJvbSAnLi9Db25uZWN0aW9uUmVmdXNlZCc7XG5pbXBvcnQgeyBJbnZhbGlkUHJvdmlkZXJFcnJvciB9IGZyb20gJy4vSW52YWxpZFByb3ZpZGVyJztcbmltcG9ydCB7IEtleVJlZmVycmVyTWlzbWF0Y2hFcnJvciB9IGZyb20gJy4vS2V5UmVmZXJyZXJNaXNtYXRjaCc7XG5pbXBvcnQgeyBFcnJvclR5cGUsIHR5cGUgU2RrQ29ubmVjdEVycm9yIH0gZnJvbSAnLi90eXBlJztcblxuZXhwb3J0IHsgQ29ubmVjdGlvblJlZnVzZWRFcnJvciB9IGZyb20gJy4vQ29ubmVjdGlvblJlZnVzZWQnO1xuZXhwb3J0IHsgS2V5UmVmZXJyZXJNaXNtYXRjaEVycm9yIH0gZnJvbSAnLi9LZXlSZWZlcnJlck1pc21hdGNoJztcbmV4cG9ydCB7IEludmFsaWRQcm92aWRlckVycm9yIH0gZnJvbSAnLi9JbnZhbGlkUHJvdmlkZXInO1xuXG5leHBvcnQgeyBFcnJvclR5cGUsIHR5cGUgU2RrQ29ubmVjdEVycm9yIH0gZnJvbSAnLi90eXBlJztcblxuZXhwb3J0IGNvbnN0IEVycm9yVHlwZU1hcDogS2V5ZWREaWN0PHR5cGVvZiBFcnJvclR5cGUsIG5ldyhtZXNzYWdlPzogc3RyaW5nKSA9PiBTZGtDb25uZWN0RXJyb3I+ID0ge1xuICBbRXJyb3JUeXBlLlJFRlVTRURdOiBDb25uZWN0aW9uUmVmdXNlZEVycm9yLFxuICBbRXJyb3JUeXBlLktFWV9NSVNNQVRDSF06IEtleVJlZmVycmVyTWlzbWF0Y2hFcnJvcixcbiAgW0Vycm9yVHlwZS5JTlZBTElEX1BST1ZJREVSXTogSW52YWxpZFByb3ZpZGVyRXJyb3IsXG59O1xuXG50eXBlIEtleWVkRGljdDxFIGV4dGVuZHMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4sIFYgPSBhbnk+ID0ge1xuICBba2V5IGluIEV4dHJhY3Q8RVtrZXlvZiBFXSwgbnVtYmVyIHwgc3RyaW5nPl0/OiBWO1xufTtcbiIsImltcG9ydCB0eXBlIHsgQ2xpZW50SW5mbywgSU1lc3NhZ2VPYnNlcnZlciB9IGZyb20gJ0BzZGsvbWVzc2VuZ2Vycyc7XG5pbXBvcnQgdHlwZSB7IENvbm5lY3Rpb25SZWZ1c2VkRXJyb3IsIEludmFsaWRQcm92aWRlckVycm9yLCBLZXlSZWZlcnJlck1pc21hdGNoRXJyb3IgfSBmcm9tICcuLi9FcnJvcnMnO1xuaW1wb3J0IHsgRXJyb3JUeXBlTWFwIH0gZnJvbSAnLi4vRXJyb3JzJztcbmltcG9ydCB0eXBlIHsgSW5jb21pbmdEYXRhTWFwLCBSZWplY3RQYXlsb2FkIH0gZnJvbSAnLi4vTWVzc2FnZVR5cGVzJztcbmltcG9ydCB7IEluY29taW5nTWVzc2FnZVR5cGUgfSBmcm9tICcuLi9NZXNzYWdlVHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlamVjdFJlY2VpdmVyIHtcbiAgcmVqZWN0KHJlYXNvbjogQ29ubmVjdGlvblJlZnVzZWRFcnJvciB8IEludmFsaWRQcm92aWRlckVycm9yIHwgS2V5UmVmZXJyZXJNaXNtYXRjaEVycm9yKTogdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIFJlamVjdE9ic2VydmVyIGltcGxlbWVudHMgSU1lc3NhZ2VPYnNlcnZlcjxJbmNvbWluZ01lc3NhZ2VUeXBlLlJFSkVDVCwgSW5jb21pbmdEYXRhTWFwPiB7XG4gIHB1YmxpYyByZWFkb25seSBtZXNzYWdlVHlwZSA9IEluY29taW5nTWVzc2FnZVR5cGUuUkVKRUNUO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlY2VpdmVyOiBSZWplY3RSZWNlaXZlcikge31cblxuICBwdWJsaWMgbm90aWZ5KHJlamVjdDogUmVqZWN0UGF5bG9hZCwgX2NsaWVudEluZm86IENsaWVudEluZm8sIF90aW1lc3RhbXA6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGVycm9yVHlwZSA9IEVycm9yVHlwZU1hcFtyZWplY3QuZXJyb3JUeXBlXTtcbiAgICBpZiAoZXJyb3JUeXBlKSB7XG4gICAgICBjb25zdCBlcnJvciA9IG5ldyBlcnJvclR5cGUocmVqZWN0LnJlYXNvbik7XG4gICAgICB0aGlzLnJlY2VpdmVyLnJlamVjdChlcnJvcik7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBFcnJvclR5cGUsIHR5cGUgU2RrQ29ubmVjdEVycm9yIH0gZnJvbSAnLi90eXBlJztcblxuZXhwb3J0IGNsYXNzIENvbm5lY3Rpb25DYW5jZWxsZWRFcnJvciBleHRlbmRzIEVycm9yIGltcGxlbWVudHMgU2RrQ29ubmVjdEVycm9yIHtcbiAgcHVibGljIHJlYWRvbmx5IHR5cGU6IEVycm9yVHlwZSA9IEVycm9yVHlwZS5DQU5DRUxMRUQ7XG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIHRoaXMubmFtZSA9ICdDb25uZWN0aW9uQ2FuY2VsbGVkRXJyb3InO1xuICB9XG59XG4iLCJpbXBvcnQgdHlwZSB7IElVbmRpcmVjdGVkTWVzc2VuZ2VyLCBJVW5kaXJlY3RlZE1lc3NlbmdlclNlbmRlcn0gZnJvbSAnQHNkay9tZXNzZW5nZXJzJztcbmltcG9ydCB7IEFOWV9UQVJHRVQgfSBmcm9tICdAc2RrL21lc3NlbmdlcnMnO1xuaW1wb3J0IHR5cGUgeyBDb25uZWN0T3B0aW9ucyB9IGZyb20gJ0BzZGsvdHlwZXMnO1xuaW1wb3J0IHR5cGUgeyBPdXRnb2luZ0RhdGFNYXAsIEluY29taW5nRGF0YU1hcCB9IGZyb20gJy4uL01lc3NhZ2VUeXBlcyc7XG5pbXBvcnQgeyBDb25uZWN0TWVzc2FnZSB9IGZyb20gJy4uL01lc3NhZ2VzL0Nvbm5lY3RNZXNzYWdlJztcbmltcG9ydCB7IEhhbmRzaGFrZU9ic2VydmVyIH0gZnJvbSAnLi4vTWVzc2FnZU9ic2VydmVycy9IYW5kc2hha2VPYnNlcnZlcic7XG5pbXBvcnQgeyBBY2NlcHRPYnNlcnZlciB9IGZyb20gJy4uL01lc3NhZ2VPYnNlcnZlcnMvQWNjZXB0T2JzZXJ2ZXInO1xuaW1wb3J0IHsgUmVqZWN0T2JzZXJ2ZXIgfSBmcm9tICcuLi9NZXNzYWdlT2JzZXJ2ZXJzL1JlamVjdE9ic2VydmVyJztcbmltcG9ydCB7IENvbm5lY3Rpb25DYW5jZWxsZWRFcnJvciB9IGZyb20gJy4uL0Vycm9ycy9DYW5jZWxsZWQnO1xuaW1wb3J0IHR5cGUgeyBTZGtDb25uZWN0RXJyb3IgfSBmcm9tICcuLi9FcnJvcnMnO1xuXG50eXBlIERpY3Q8VCA9IHVua25vd24+ID0gUmVjb3JkPHN0cmluZywgVCB8IHVuZGVmaW5lZD47XG5cbmVudW0gQ29ubmVjdGlvblN0YXRlIHtcbiAgSURMRSxcbiAgQ09OTkVDVElORyxcbiAgSEFORFNIQUtFLFxuICBDT05ORUNURUQsXG4gIFJFSkVDVEVELFxufVxuXG5leHBvcnQgdHlwZSBDb25uZWN0aW9uT3B0aW9ucyA9IENvbm5lY3RPcHRpb25zICYge1xuICAvKiogQGJhY2t3YXJkQ29tcGF0YWJpbGl0eSAqL1xuICBhcHBsaWNhdGlvbktleTogc3RyaW5nO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBDb25uZWN0UmVzcG9uc2Uge1xuICBzb3VyY2VJZDogbnVtYmVyO1xuICB0YXJnZXRJZDogbnVtYmVyO1xuICB0YXJnZXRPcmlnaW46IHN0cmluZztcbiAgc2NyaXB0VXJsOiBzdHJpbmc7XG4gIHNlcmlhbGl6ZWRJbnRlcmZhY2U6IERpY3Q7XG59XG5cbmV4cG9ydCBjbGFzcyBDb25uZWN0b3I8U291cmNlVD4ge1xuICBwcml2YXRlIGNvbm5lY3Rpb25TdGF0ZTogQ29ubmVjdGlvblN0YXRlID0gQ29ubmVjdGlvblN0YXRlLklETEU7XG4gIHByaXZhdGUgY29ubmVjdGlvblBvbGw6IG51bWJlciB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBjb25uZWN0aW9uUHJvbWlzZTogUHJvbWlzZTxDb25uZWN0UmVzcG9uc2U+O1xuICBwcml2YXRlIHJlc29sdmVDb25uZWN0aW9uITogKHZhbHVlOiBDb25uZWN0UmVzcG9uc2UpID0+IHZvaWQ7XG4gIHByaXZhdGUgcmVqZWN0Q29ubmVjdGlvbiE6IChyZWFzb246IFNka0Nvbm5lY3RFcnJvcikgPT4gdm9pZDtcblxuICBwcml2YXRlIGhhbmRzaGFrZU9ic2VydmVyOiBIYW5kc2hha2VPYnNlcnZlcjtcbiAgcHJpdmF0ZSBhY2NlcHRPYnNlcnZlcjogQWNjZXB0T2JzZXJ2ZXI7XG4gIHByaXZhdGUgcmVqZWN0T2JzZXJ2ZXI6IFJlamVjdE9ic2VydmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbWVzc2VuZ2VyOiBJVW5kaXJlY3RlZE1lc3NlbmdlcjxPdXRnb2luZ0RhdGFNYXAsIEluY29taW5nRGF0YU1hcCwgU291cmNlVD4sXG4gICAgcHJpdmF0ZSB0YXJnZXQ6IElVbmRpcmVjdGVkTWVzc2VuZ2VyU2VuZGVyPE91dGdvaW5nRGF0YU1hcCwgU291cmNlVD4sXG4gICAgcHJpdmF0ZSBzb3VyY2U6IFNvdXJjZVRcbiAgKSB7XG4gICAgY2xhc3MgQ29ubmVjdG9yRmFjYWRlIHtcbiAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29ubmVjdG9yOiBDb25uZWN0b3I8U291cmNlVD4pIHt9XG4gICAgICBwdWJsaWMgaGFuZHNoYWtlKCkge1xuICAgICAgICB0aGlzLmNvbm5lY3Rvci5oYW5kc2hha2UoKTtcbiAgICAgIH1cbiAgICAgIHB1YmxpYyBhY2NlcHQoc291cmNlSWQ6IG51bWJlciwgc2NyaXB0VXJsOiBzdHJpbmcsIHNlcmlhbGl6ZWRJbnRlcmZhY2U6IERpY3QsIHRhcmdldElkOiBudW1iZXIsIHRhcmdldE9yaWdpbjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdG9yLmFjY2VwdChzb3VyY2VJZCwgc2NyaXB0VXJsLCBzZXJpYWxpemVkSW50ZXJmYWNlLCB0YXJnZXRJZCwgdGFyZ2V0T3JpZ2luKTtcbiAgICAgIH1cbiAgICAgIHB1YmxpYyByZWplY3QocmVhc29uOiBTZGtDb25uZWN0RXJyb3IpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0b3IucmVqZWN0KHJlYXNvbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY29ubmVjdG9yRmFjYWRlID0gbmV3IENvbm5lY3RvckZhY2FkZSh0aGlzKTtcblxuICAgIHRoaXMuaGFuZHNoYWtlT2JzZXJ2ZXIgPSBuZXcgSGFuZHNoYWtlT2JzZXJ2ZXIoY29ubmVjdG9yRmFjYWRlKTtcbiAgICB0aGlzLmFjY2VwdE9ic2VydmVyID0gbmV3IEFjY2VwdE9ic2VydmVyKGNvbm5lY3RvckZhY2FkZSk7XG4gICAgdGhpcy5yZWplY3RPYnNlcnZlciA9IG5ldyBSZWplY3RPYnNlcnZlcihjb25uZWN0b3JGYWNhZGUpO1xuICAgIHRoaXMuY29ubmVjdGlvblByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgIHRoaXMucmVzb2x2ZUNvbm5lY3Rpb24gPSByZXM7XG4gICAgICB0aGlzLnJlamVjdENvbm5lY3Rpb24gPSByZWo7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgY29ubmVjdCh2ZXJzaW9uOiBzdHJpbmcsIG9wdGlvbnM6IFBhcnRpYWw8Q29ubmVjdGlvbk9wdGlvbnM+ID0ge30pOiBQcm9taXNlPENvbm5lY3RSZXNwb25zZT4ge1xuICAgIGlmICh0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9PT0gQ29ubmVjdGlvblN0YXRlLklETEUpIHtcbiAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gQ29ubmVjdGlvblN0YXRlLkNPTk5FQ1RJTkc7XG4gICAgICB0aGlzLm1lc3Nlbmdlci5hZGRPYnNlcnZlcih0aGlzLmhhbmRzaGFrZU9ic2VydmVyKTtcbiAgICAgIHRoaXMubWVzc2VuZ2VyLmFkZE9ic2VydmVyKHRoaXMuYWNjZXB0T2JzZXJ2ZXIpO1xuICAgICAgdGhpcy5tZXNzZW5nZXIuYWRkT2JzZXJ2ZXIodGhpcy5yZWplY3RPYnNlcnZlcik7XG4gICAgICAvLyBUT0RPOiBmaWd1cmUgb3V0IGEgYmV0dGVyIHdheSB0byBlbnN1cmUgY29ubmVjdGlvblxuICAgICAgdGhpcy5jb25uZWN0aW9uUG9sbCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIC8vIHNlbmQgdGhlIG1lc3NhZ2UgdG8gYW55Ym9keSB3aG8ncyBsaXN0ZW5pbmcgd2l0aGluIHRoZSB0YXJnZXQgd2luZG93XG4gICAgICAgIHRoaXMubWVzc2VuZ2VyLnNlbmQobmV3IENvbm5lY3RNZXNzYWdlKHZlcnNpb24sIG9wdGlvbnMpLCBBTllfVEFSR0VULCB0aGlzLnRhcmdldCwgdGhpcy5zb3VyY2UpO1xuICAgICAgfSwgNTAwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9uUHJvbWlzZTtcbiAgfVxuXG4gIHB1YmxpYyBjYW5jZWxDb25uZWN0aW5nKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbm5lY3Rpb25TdGF0ZSA8IENvbm5lY3Rpb25TdGF0ZS5DT05ORUNURUQpIHtcbiAgICAgIHRoaXMuc3RvcENvbm5lY3RQb2xsaW5nKCk7XG4gICAgICB0aGlzLnJlamVjdENvbm5lY3Rpb24obmV3IENvbm5lY3Rpb25DYW5jZWxsZWRFcnJvcignVXNlciBtYW51YWxseSBjYW5jZWxsZWQgY29ubmVjdGlvbicpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhhbmRzaGFrZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgPCBDb25uZWN0aW9uU3RhdGUuSEFORFNIQUtFKSB7XG4gICAgICB0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9IENvbm5lY3Rpb25TdGF0ZS5IQU5EU0hBS0U7XG4gICAgICB0aGlzLnN0b3BDb25uZWN0UG9sbGluZygpO1xuXG4gICAgICB0aGlzLm1lc3Nlbmdlci5yZW1vdmVPYnNlcnZlcih0aGlzLmhhbmRzaGFrZU9ic2VydmVyKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFjY2VwdChzb3VyY2VJZDogbnVtYmVyLCBzY3JpcHRVcmw6IHN0cmluZywgc2VyaWFsaXplZEludGVyZmFjZTogRGljdCwgdGFyZ2V0SWQ6IG51bWJlciwgdGFyZ2V0T3JpZ2luOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgPCBDb25uZWN0aW9uU3RhdGUuQ09OTkVDVEVEKSB7XG4gICAgICB0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9IENvbm5lY3Rpb25TdGF0ZS5DT05ORUNURUQ7XG5cbiAgICAgIHRoaXMubWVzc2VuZ2VyLnJlbW92ZU9ic2VydmVyKHRoaXMuaGFuZHNoYWtlT2JzZXJ2ZXIpO1xuICAgICAgdGhpcy5tZXNzZW5nZXIucmVtb3ZlT2JzZXJ2ZXIodGhpcy5hY2NlcHRPYnNlcnZlcik7XG4gICAgICB0aGlzLm1lc3Nlbmdlci5yZW1vdmVPYnNlcnZlcih0aGlzLnJlamVjdE9ic2VydmVyKTtcbiAgICAgIHRoaXMuc3RvcENvbm5lY3RQb2xsaW5nKCk7XG5cbiAgICAgIHRoaXMucmVzb2x2ZUNvbm5lY3Rpb24oe1xuICAgICAgICBzb3VyY2VJZCxcbiAgICAgICAgdGFyZ2V0SWQsXG4gICAgICAgIHRhcmdldE9yaWdpbixcbiAgICAgICAgc2NyaXB0VXJsLFxuICAgICAgICBzZXJpYWxpemVkSW50ZXJmYWNlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZWplY3QocmVhc29uOiBTZGtDb25uZWN0RXJyb3IpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgPCBDb25uZWN0aW9uU3RhdGUuQ09OTkVDVEVEKSB7XG4gICAgICB0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9IENvbm5lY3Rpb25TdGF0ZS5SRUpFQ1RFRDtcblxuICAgICAgdGhpcy5tZXNzZW5nZXIucmVtb3ZlT2JzZXJ2ZXIodGhpcy5oYW5kc2hha2VPYnNlcnZlcik7XG4gICAgICB0aGlzLm1lc3Nlbmdlci5yZW1vdmVPYnNlcnZlcih0aGlzLmFjY2VwdE9ic2VydmVyKTtcbiAgICAgIHRoaXMubWVzc2VuZ2VyLnJlbW92ZU9ic2VydmVyKHRoaXMucmVqZWN0T2JzZXJ2ZXIpO1xuICAgICAgdGhpcy5zdG9wQ29ubmVjdFBvbGxpbmcoKTtcblxuICAgICAgdGhpcy5yZWplY3RDb25uZWN0aW9uKHJlYXNvbik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdG9wQ29ubmVjdFBvbGxpbmcoKTogdm9pZCB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmNvbm5lY3Rpb25Qb2xsKTtcbiAgICB0aGlzLmNvbm5lY3Rpb25Qb2xsID0gdW5kZWZpbmVkO1xuICB9XG5cbn1cbiIsImltcG9ydCB0eXBlIHsgSW5kZXhLZXkgfSBmcm9tICcuLi90eXBlcyc7XG5cbi8qKlxuICogQW4gb2JqZWN0IHRvIHVzZSBpbiBwbGFjZSBvZiBhIGNhbGxiYWNrXG4gKiBBdm9pZHMgaXNzdWVzIHdpdGggdW5ib3VuZCBmdW5jdGlvbnNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJT2JzZXJ2ZXI8VCBleHRlbmRzIHVua25vd25bXT4ge1xuICBub3RpZnkoLi4uZGF0YTogVCk6IHZvaWQ7XG59XG5cbi8qKlxuICogSW5mb3JtYXRpb24gYWJvdXQgYSBjbGllbnQgc2VuZGluZyBtZXNzYWdlc1xuICovXG5leHBvcnQgdHlwZSBDbGllbnRJbmZvID0ge1xuICBpZDogbnVtYmVyO1xufVxuXG4vKipcbiAqIEFuIG9ic2VydmVyIGFzc29jaWF0ZWQgd2l0aCBhIHNwZWNpZmljIHR5cGUgb2YgbWVzc2FnZVxuICogTm90aWZpZWQgb2YgaW5jb21pbmcgbWVzc2FnZXMgb2YgdHlwZSBgSW5jb21pbmdNZXNzYWdlVHlwZWBcbiAqXG4gKiBAcGFyYW0gSW5jb21pbmdNZXNzYWdlVHlwZSBUaGUgbWVzc2FnZSB0eXBlIHRvIGxpc3RlbiBmb3JcbiAqIEBwYXJhbSBJbmNvbWluZ0RhdGFNYXBUIEEgbWFwIGJldHdlZW4gSW5jb21pbmdNZXNzYWdlVHlwZSBhbmQgZGF0YSByZWNlaXZlZCBhbmQgdXNlZCB3aXRoaW4gYG5vdGlmeWBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJTWVzc2FnZU9ic2VydmVyPFxuICBJbmNvbWluZ01lc3NhZ2VUeXBlIGV4dGVuZHMga2V5b2YgSW5jb21pbmdEYXRhTWFwVCxcbiAgSW5jb21pbmdEYXRhTWFwVCxcbiAgQ2xpZW50SW5mb1QgZXh0ZW5kcyBDbGllbnRJbmZvID0gQ2xpZW50SW5mbyxcbj4ge1xuICAvKiogVGhlIG1lc3NhZ2UgdHlwZSB0byBsaXN0ZW4gZm9yICovXG4gIHJlYWRvbmx5IG1lc3NhZ2VUeXBlOiBJbmNvbWluZ01lc3NhZ2VUeXBlO1xuICAvKiogQSBjYWxsYmFjayBjYWxsZWQgd2hlbiBhbiBJTWVzc2FnZSByZWNlaXZlcyBhbiBgSW5jb21pbmdNZXNzYWdlVHlwZWAgbWVzc2FnZSAqL1xuICBub3RpZnkocGF5bG9hZDogSW5jb21pbmdEYXRhTWFwVFtJbmNvbWluZ01lc3NhZ2VUeXBlXSwgY2xpZW50SW5mbzogQ2xpZW50SW5mb1QsIHNlbnRBdFRpbWVzdGFtcDogbnVtYmVyKTogdm9pZDtcbn1cblxuLyoqXG4gKiBBIGZhY3RvcnkgdG8gY3JlYXRlIElNZXNzZW5nZXJzXG4gKlxuICogQHBhcmFtIE91dGdvaW5nRGF0YU1hcFQgVGhlIG91dGdvaW5nIG1lc3NhZ2UgdHlwZXMgc3VwcG9ydGVkXG4gKiBAcGFyYW0gSW5jb21pbmdEYXRhTWFwVCBUaGUgaW5jb21pbmcgbWVzc2FnZSB0eXBlcyBzdXBwb3J0ZWRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJTWVzc2VuZ2VyRmFjdG9yeTxPdXRnb2luZ0RhdGFNYXBULEluY29taW5nRGF0YU1hcFQ+IHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhbiBJTWVzc2VuZ2VyIHRoYXQgY2FuIHNlbmQgYE91dGdvaW5nRGF0YU1hcFRgIGFuZCBjYW4gcmVjZWl2ZSBgSW5jb21pbmdEYXRhTWFwVGBcbiAgICovXG4gIGNyZWF0ZU1lc3NlbmdlcigpOiBJTWVzc2VuZ2VyPE91dGdvaW5nRGF0YU1hcFQsIEluY29taW5nRGF0YU1hcFQ+O1xufVxuXG4vKipcbiAqIEEgYmktZGlyZWN0aW9uYWwgY29tbXVuaWNhdG9yIHRoYXQgY2FuXG4gKiAtIHJlY2VpdmUgbWVzc2FnZSBvZiB0eXBlIGBrZXlvZiBJbmNvbWluZ0RhdGFNYXBUYCB2aWEgb2JzZXJ2ZXJzXG4gKiAtIHNlbmQgbWVzc2FnZXMgb2YgdHlwZSBga2V5b2YgT3V0Z29pbmdEYXRhTWFwVGBcbiAqXG4gKiBAcGFyYW0gT3V0Z29pbmdEYXRhTWFwVCBUaGUgb3V0Z29pbmcgbWVzc2FnZSB0eXBlcyBzdXBwb3J0ZWRcbiAqIEBwYXJhbSBJbmNvbWluZ0RhdGFNYXBUIFRoZSBpbmNvbWluZyBtZXNzYWdlIHR5cGVzIHN1cHBvcnRlZCBieSByZWdpc3RlcmVkIG9ic2VydmVyc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIElNZXNzZW5nZXI8XG4gIE91dGdvaW5nRGF0YU1hcFQsXG4gIEluY29taW5nRGF0YU1hcFQsXG4+IHtcbiAgLyoqIHRlYXIgZG93biB0aGlzIG1lc3NlbmdlciAqL1xuICBpbml0KCk6IHZvaWQ7XG4gIC8qKiB0ZWFyIGRvd24gdGhpcyBtZXNzZW5nZXIgKi9cbiAgZGlzcG9zZSgpOiB2b2lkO1xuICAvKiogUmVnaXN0ZXIgYW4gYG9ic2VydmVyYCB0byBsaXN0ZW4gZm9yIGluY29taW5nIG1lc3NhZ2VzICovXG4gIGFkZE9ic2VydmVyKG9ic2VydmVyOiBJTWVzc2FnZU9ic2VydmVyPEluZGV4S2V5PEluY29taW5nRGF0YU1hcFQ+LCBJbmNvbWluZ0RhdGFNYXBUPik6IHZvaWQ7XG4gIC8qKiBSZW1vdmUgYW4gYG9ic2VydmVyYCBmcm9tIGxpc3RlbmluZyB0byBpbmNvbWluZyBtZXNzYWdlcyAqL1xuICByZW1vdmVPYnNlcnZlcihvYnNlcnZlcjogSU1lc3NhZ2VPYnNlcnZlcjxJbmRleEtleTxJbmNvbWluZ0RhdGFNYXBUPiwgSW5jb21pbmdEYXRhTWFwVD4pOiB2b2lkO1xuICAvKiogU2VuZCBhIGBtZXNzYWdlYCB0byB0aGUgdGFyZ2V0ICovXG4gIHNlbmQobWVzc2FnZTogSU1lc3NhZ2U8SW5kZXhLZXk8T3V0Z29pbmdEYXRhTWFwVD4sIE91dGdvaW5nRGF0YU1hcFQ+KTogdm9pZDtcbn1cblxuLyoqXG4gKiBBIGJyaWRnZSBiZXR3ZWVuIGEgbWVzc2VuZ2VyIGFuZCB0aGUgdW5kZXJseWluZyBtZXNzZW5naW5nIG1lY2hhbmlzbSwgYWxsb3dpbmcgdGhlIG1lc3NlbmdlciB0byBiZSBtb3JlIGdlbmVyaWNcbiAqIFVzZWZ1bCBpbiBhYnN0cmFjdGluZyBhd2F5IHNvbWV0aGluZyBsaWtlIHdpbmRvdy5wb3N0TWVzc2FnZSBmcm9tIGFuIGBJTWVzc2VuZ2VyYFxuICpcbiAqIEBwYXJhbSBPdXRnb2luZ0RhdGFNYXBUIFRoZSBvdXRnb2luZyBtZXNzYWdlIHR5cGVzIHN1cHBvcnRlZFxuICogQHBhcmFtIEluY29taW5nRGF0YU1hcFQgVGhlIGluY29taW5nIG1lc3NhZ2UgdHlwZXMgc3VwcG9ydGVkIGJ5IHJlZ2lzdGVyZWQgb2JzZXJ2ZXJzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSU1lc3NlbmdlckJyaWRnZTxcbiAgT3V0Z29pbmdEYXRhTWFwVCxcbiAgSW5jb21pbmdEYXRhTWFwVCxcbj4ge1xuICAvKiogVHVybiBvbiB0aGUgYWJpbGl0eSB0byByZWNlaXZlIG1lc3NhZ2VzIGZyb20gYW5vdGhlciBjbGllbnQgKi9cbiAgbGlzdGVuKG9ic2VydmVyOiBJT2JzZXJ2ZXI8W0lCcmlkZ2VNZXNzYWdlPEluZGV4S2V5PEluY29taW5nRGF0YU1hcFQ+LCBJbmNvbWluZ0RhdGFNYXBUPiwgQ2xpZW50SW5mb10+KTogdm9pZDtcbiAgLyoqIFR1cm4gb2ZmIHRoZSBhYmlsaXR5IHRvIHJlY2VpdmUgbWVzc2FnZXMgKi9cbiAgc3RvcExpc3RlbmluZygpOiB2b2lkO1xuICAvKiogU2VuZCBtZXNzYWdlIHRvIHRoZSBhbm90aGVyIGNsaWVudCAqL1xuICBzZW5kKG1lc3NhZ2U6IElCcmlkZ2VNZXNzYWdlPEluZGV4S2V5PE91dGdvaW5nRGF0YU1hcFQ+LCBPdXRnb2luZ0RhdGFNYXBUPik6IHZvaWQ7XG59XG5cbi8qKlxuICogQSBiaS1kaXJlY3Rpb25hbCBjb21tdW5pY2F0b3IgdGhhdCBjYW5cbiAqIC0gb3Blbmx5IHJlY2VpdmUgbWVzc2FnZXMgb2YgdHlwZSBga2V5b2YgSW5jb21pbmdEYXRhTWFwVGAgdmlhIG9ic2VydmVycyBmcm9tIHVuc3BlY2lmaWVkIHNvdXJjZXNcbiAqIC0gc2VuZCBtZXNzYWdlcyBvZiB0eXBlIGBrZXlvZiBPdXRnb2luZ0RhdGFNYXBUYCB0byB0YXJnZXRzIHNwZWNpZmllZCB3aGVuIHNlbmRpbmdcbiAqXG4gKiBAcGFyYW0gT3V0Z29pbmdEYXRhTWFwVCBUaGUgb3V0Z29pbmcgbWVzc2FnZSB0eXBlcyBzdXBwb3J0ZWRcbiAqIEBwYXJhbSBJbmNvbWluZ0RhdGFNYXBUIFRoZSBpbmNvbWluZyBtZXNzYWdlIHR5cGVzIHN1cHBvcnRlZCBieSByZWdpc3RlcmVkIG9ic2VydmVyc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIElVbmRpcmVjdGVkTWVzc2VuZ2VyPFxuICBPdXRnb2luZ0RhdGFNYXBULFxuICBJbmNvbWluZ0RhdGFNYXBULFxuICBTb3VyY2VULFxuPiB7XG4gIC8qKiBSZWdpc3RlciBhbiBgb2JzZXJ2ZXJgIHRvIGxpc3RlbiBmb3IgaW5jb21pbmcgbWVzc2FnZXMgKi9cbiAgYWRkT2JzZXJ2ZXIob2JzZXJ2ZXI6IElNZXNzYWdlT2JzZXJ2ZXI8SW5kZXhLZXk8SW5jb21pbmdEYXRhTWFwVD4sIEluY29taW5nRGF0YU1hcFQ+KTogdm9pZDtcbiAgLyoqIFJlbW92ZSBhbiBgb2JzZXJ2ZXJgIGZyb20gbGlzdGVuaW5nIHRvIGluY29taW5nIG1lc3NhZ2VzICovXG4gIHJlbW92ZU9ic2VydmVyKG9ic2VydmVyOiBJTWVzc2FnZU9ic2VydmVyPEluZGV4S2V5PEluY29taW5nRGF0YU1hcFQ+LCBJbmNvbWluZ0RhdGFNYXBUPik6IHZvaWQ7XG4gIC8qKiBTZW5kIGEgYG1lc3NhZ2VgIHRvIHRoZSBgdGFyZ2V0YCAqL1xuICBzZW5kKFxuICAgIG1lc3NhZ2U6IElNZXNzYWdlPEluZGV4S2V5PE91dGdvaW5nRGF0YU1hcFQ+LCBPdXRnb2luZ0RhdGFNYXBUPixcbiAgICB0YXJnZXRJZDogbnVtYmVyIHwgdHlwZW9mIEFOWV9UQVJHRVQsIHRhcmdldDogSVVuZGlyZWN0ZWRNZXNzZW5nZXJTZW5kZXI8T3V0Z29pbmdEYXRhTWFwVCwgU291cmNlVD4sXG4gICAgc291cmNlOiBTb3VyY2VULFxuICApOiB2b2lkO1xuICAvKiogVGVhciBkb3duIHRoaXMgbWVzc2VuZ2VyICovXG4gIGRpc3Bvc2UoKTogdm9pZDtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWwgaWQgdG8gc3ltYm9saXplIHRoZSBtZXNzYWdlIHNob3VsZCBnbyB0byBhbGwgb3RoZXIgYElVbmRpcmVjdGVkTGlzdGVuZXJzYC5cbiAqIEZvciB1c2Ugd2l0aCBgSVVuZGlyZWN0ZWRNZXNzZW5nZXJgIGFuZCBgSVVuZGlyZWN0ZWRNZXNzZW5nZXJTZW5kZXJgLlxuICovXG5leHBvcnQgY29uc3QgQU5ZX1RBUkdFVCA9IC0xO1xuXG4vKipcbiAqIEEgYnJpZGdlIGJldHdlZW4gYSBtZXNzZW5nZXIgYW5kIHRoZSB1bmRlcmx5aW5nIG1lc3NhZ2UgcmVjZWl2aW5nIG1lY2hhbmlzbSwgYWxsb3dpbmcgdGhlIG1lc3NlbmdlciB0byBiZSBtb3JlIGdlbmVyaWNcbiAqIFVzZWZ1bCBpbiBhYnN0cmFjdGluZyBhd2F5IHNvbWV0aGluZyBsaWtlIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyIGZyb20gYW4gYElNZXNzZW5nZXJgXG4gKlxuICogQHBhcmFtIEluY29taW5nRGF0YU1hcFQgVGhlIGluY29taW5nIG1lc3NhZ2UgdHlwZXMgc3VwcG9ydGVkIGJ5IHJlZ2lzdGVyZWQgb2JzZXJ2ZXJzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSVVuZGlyZWN0ZWRNZXNzZW5nZXJMaXN0ZW5lcjxcbiAgSW5jb21pbmdEYXRhTWFwVCxcbj4ge1xuICAvKiogVHVybiBvbiB0aGUgYWJpbGl0eSB0byByZWNlaXZlIG1lc3NhZ2VzIGZyb20gYW5vdGhlciBjbGllbnQgKi9cbiAgbGlzdGVuKG9ic2VydmVyOiBJT2JzZXJ2ZXI8W0lCcmlkZ2VNZXNzYWdlPEluZGV4S2V5PEluY29taW5nRGF0YU1hcFQ+LCBJbmNvbWluZ0RhdGFNYXBUPiwgQ2xpZW50SW5mb10+KTogdm9pZDtcbiAgLyoqIFR1cm4gb2ZmIHRoZSBhYmlsaXR5IHRvIHJlY2VpdmUgbWVzc2FnZXMgKi9cbiAgc3RvcExpc3RlbmluZygpOiB2b2lkO1xufVxuXG4vKipcbiAqIEEgYnJpZGdlIGJldHdlZW4gYSBtZXNzZW5nZXIgYW5kIHRoZSB1bmRlcmx5aW5nIG1lc3NhZ2Ugc2VuZGluZyBtZWNoYW5pc20sIGFsbG93aW5nIHRoZSBtZXNzZW5nZXIgdG8gYmUgbW9yZSBnZW5lcmljXG4gKiBVc2VmdWwgaW4gYWJzdHJhY3RpbmcgYXdheSBzb21ldGhpbmcgbGlrZSB3aW5kb3cucG9zdE1lc3NhZ2UgZnJvbSBhbiBgSU1lc3NlbmdlcmBcbiAqXG4gKiBAcGFyYW0gT3V0Z29pbmdEYXRhTWFwVCBUaGUgb3V0Z29pbmcgbWVzc2FnZSB0eXBlcyBzdXBwb3J0ZWRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJVW5kaXJlY3RlZE1lc3NlbmdlclNlbmRlcjxcbiAgT3V0Z29pbmdEYXRhTWFwVCxcbiAgU291cmNlVCxcbj4ge1xuICAvKiogU2VuZCBtZXNzYWdlIHRvIHRoZSBjbGllbnQgKi9cbiAgc2VuZChtZXNzYWdlOiBJQnJpZGdlTWVzc2FnZTxJbmRleEtleTxPdXRnb2luZ0RhdGFNYXBUPiwgT3V0Z29pbmdEYXRhTWFwVD4sIHNvdXJjZTogU291cmNlVCk6IHZvaWQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgZGF0YSBmb3IgZWFjaCBtZXNzYWdlIChib3RoIG91dGdvaW5nIGFuZCBpbmNvbWluZylcbiAqXG4gKiBAcGFyYW0gTWVzc2FnZVR5cGUgVGhlIHR5cGUgb2YgdGhlIG1lc3NhZ2VcbiAqIEBwYXJhbSBQYXlsb2FkTWFwIFRoZSBtYXAgYmV0d2VlbiBtZXNzYWdlIHR5cGVzIGFuZCB0aGVpciBwYXlsb2Fkc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIElNZXNzYWdlPFxuICBNZXNzYWdlVHlwZSBleHRlbmRzIGtleW9mIFBheWxvYWRNYXBULFxuICBQYXlsb2FkTWFwVCxcbj4ge1xuICAvKiogVGhlIHNwZWNpZmljIHR5cGUgb2YgbWVzc2FnZSAqL1xuICB0eXBlOiBNZXNzYWdlVHlwZTtcbiAgLyoqIFRoZSBkYXRhIHRvIHNlbmQgKi9cbiAgcGF5bG9hZDogUGF5bG9hZE1hcFRbTWVzc2FnZVR5cGVdO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGRhdGEgZm9yIGVhY2ggbG93ZXIgbGV2ZWwgbWVzc2FnZSB0eXBlcyBiZWluZyByZWNlaXZlZCBieSB0aGUgYnJpZGdlc1xuICpcbiAqIEBwYXJhbSBNZXNzYWdlVHlwZSBUaGUgdHlwZSBvZiB0aGUgbWVzc2FnZVxuICogQHBhcmFtIFBheWxvYWRNYXAgVGhlIG1hcCBiZXR3ZWVuIG1lc3NhZ2UgdHlwZXMgYW5kIHRoZWlyIHBheWxvYWRzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUJyaWRnZU1lc3NhZ2U8XG4gIE1lc3NhZ2VUeXBlIGV4dGVuZHMga2V5b2YgUGF5bG9hZE1hcFQsXG4gIFBheWxvYWRNYXBULFxuPiB7XG4gIC8qKiBUaGUgc3BlY2lmaWMgdHlwZSBvZiBtZXNzYWdlICovXG4gIHR5cGU6IE1lc3NhZ2VUeXBlO1xuICAvKiogVGhlIGRhdGEgcmVjZWl2ZWQgKi9cbiAgcGF5bG9hZDogUGF5bG9hZE1hcFRbTWVzc2FnZVR5cGVdO1xuICAvKiogVGhlIHRpbWVzdGFtcCBvZiB3aGVuIHRoZSBtZXNzYWdlIHdhcyBzZW50ICovXG4gIHRpbWVzdGFtcDogbnVtYmVyO1xuICAvKiogVGhlIGlkIG9mIHRoZSBjbGllbnQgc2VuZGluZyB0aGUgbWVzc2FnZSAqL1xuICBmcm9tSWQ6IG51bWJlcjtcbiAgLyoqIFRoZSBpZCBvZiB0aGUgY2xpZW50IHRoYXQgc2hvdWxkIHJlY2VpdmUgdGhpcyBtZXNzYWdlICovXG4gIHRvSWQ6IG51bWJlciB8IG51bWJlcltdO1xufVxuIiwiaW1wb3J0IHsgUG9zdE1lc3NhZ2VGYWN0b3J5LCBQb3N0TWVzc2FnZUxpc3RlbmVyLCBQb3N0TWVzc2FnZVNlbmRlciwgVW5kaXJlY3RlZE1lc3NlbmdlciB9IGZyb20gJ0BzZGsvbWVzc2VuZ2Vycyc7XG5pbXBvcnQgdHlwZSB7IElTZGtDb25uZWN0b3J9IGZyb20gJy4vTVBfU0RLJztcbmltcG9ydCB7IE1QX1NESyB9IGZyb20gJy4vTVBfU0RLJztcbmltcG9ydCB0eXBlIHsgQ29ubmVjdGlvbk9wdGlvbnMsIENvbm5lY3RSZXNwb25zZSB9IGZyb20gJy4vQ29ubmVjdG9yJztcbmltcG9ydCB7IENvbm5lY3RvciB9IGZyb20gJy4vQ29ubmVjdG9yJztcbmltcG9ydCB0eXBlIHsgSW5jb21pbmdEYXRhTWFwLCBPdXRnb2luZ0RhdGFNYXAgfSBmcm9tICcuL01lc3NhZ2VUeXBlcyc7XG5pbXBvcnQgdHlwZSB7IE1wU2RrLCBDb25uZWN0T3B0aW9ucyB9IGZyb20gJ0BzZGsvdHlwZXMnO1xuXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9ICczLjAnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29ubmVjdCh0YXJnZXRXaW5kb3c6IEhUTUxJRnJhbWVFbGVtZW50LCBhcHBsaWNhdGlvbktleTogc3RyaW5nKTogUHJvbWlzZTxNcFNkaz47XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29ubmVjdCh0YXJnZXRXaW5kb3c6IEhUTUxJRnJhbWVFbGVtZW50LCBvcHRpb25zPzogUGFydGlhbDxDb25uZWN0T3B0aW9ucz4pOiBQcm9taXNlPE1wU2RrPjtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25uZWN0KHRhcmdldFdpbmRvdzogSFRNTElGcmFtZUVsZW1lbnQsIG9wdGlvbnM6IHN0cmluZyB8IFBhcnRpYWw8Q29ubmVjdE9wdGlvbnM+ID0ge30pOiBQcm9taXNlPE1wU2RrPiB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gY29ubmVjdFdpdGhBcHBsaWNhdGlvbktleSh0YXJnZXRXaW5kb3csIG9wdGlvbnMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb25uZWN0V2l0aE9wdGlvbnModGFyZ2V0V2luZG93LCBvcHRpb25zKTtcbiAgfVxufVxuXG4vKipcbiAqIENvbm5lY3QgdXNpbmcgYW4gYXBwbGljYXRpb24ga2V5IHBhcmFtZXRlclxuICpcbiAqIEBiYWNrd2FyZENvbXBhdGFiaWxpdHlcbiAqIEBwYXJhbSB0YXJnZXRXaW5kb3dcbiAqIEBwYXJhbSBhcHBsaWNhdGlvbktleVxuICovXG5mdW5jdGlvbiBjb25uZWN0V2l0aEFwcGxpY2F0aW9uS2V5KHRhcmdldFdpbmRvdzogSFRNTElGcmFtZUVsZW1lbnQsIGFwcGxpY2F0aW9uS2V5OiBzdHJpbmcpOiBQcm9taXNlPE1wU2RrPiB7XG4gIGNvbnNvbGUud2FybihgTVBfU0RLOiBjb25uZWN0aW5nIHVzaW5nIGFuIFxcYGFwcGxpY2F0aW9uS2V5XFxgIGFyZ3VtZW50IGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSBhZGQgdGhlIGtleSB0byB0aGUgaWZyYW1lJ3MgVVJMIHBhcmFtZXRlcnMgaW5zdGVhZC5gKTtcbiAgcmV0dXJuIGNvbm5lY3RXaXRoT3B0aW9ucyh0YXJnZXRXaW5kb3csIHtcbiAgICBhcHBsaWNhdGlvbktleSxcbiAgfSk7XG59XG5cbi8qKlxuICogQ29ubmVjdCB3aXRoIGEgY29ubmVjdGlvbiBvcHRpb25zIG9iamVjdFxuICogQHBhcmFtIHRhcmdldFdpbmRvd1xuICogQHBhcmFtIG9wdGlvbnNcbiAqL1xuZnVuY3Rpb24gY29ubmVjdFdpdGhPcHRpb25zKHRhcmdldFdpbmRvdzogSFRNTElGcmFtZUVsZW1lbnQsIG9wdGlvbnM6IFBhcnRpYWw8Q29ubmVjdGlvbk9wdGlvbnM+ID0ge30pOiBQcm9taXNlPE1wU2RrPiB7XG4gIGNvbnN0IHRhcmdldCA9IGdldFdpbmRvdyh0YXJnZXRXaW5kb3cpO1xuICBpZiAoIXRhcmdldCkgcmV0dXJuIFByb21pc2UucmVqZWN0KCdpbnZhbGlkIHdpbmRvdycpO1xuXG4gIC8vIGNyZWF0ZSBhIHdheSB0byBjcmVhdGUgY29tbXVuaWNhdGlvbiBjaGFubmVscyAoSU1lc3NhZ2UpIGFuZCBzZXQgdXAgYSBQb3N0TWVzc2FnZSB0byB1c2UgZm9yIGNvbm5lY3RpbmdcbiAgY29uc3Qgc291cmNlSWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwKTsgLy8gYSB0ZW1wIGlkIHRvIHVzZSB3aGlsZSBjb25uZWN0aW5nXG4gIGNvbnN0IHBvc3RNZXNzYWdlTGlzdGVuZXIgPSBuZXcgUG9zdE1lc3NhZ2VMaXN0ZW5lcjxJbmNvbWluZ0RhdGFNYXA+KHdpbmRvdyk7XG4gIGNvbnN0IHBvc3RNZXNhZ2VTZW5kZXIgPSBuZXcgUG9zdE1lc3NhZ2VTZW5kZXI8T3V0Z29pbmdEYXRhTWFwPih0YXJnZXQpO1xuICBjb25zdCBwb3N0TWVzc2FnZSA9IG5ldyBVbmRpcmVjdGVkTWVzc2VuZ2VyPE91dGdvaW5nRGF0YU1hcCwgSW5jb21pbmdEYXRhTWFwLCBXaW5kb3c+KHNvdXJjZUlkLCBwb3N0TWVzc2FnZUxpc3RlbmVyKTtcbiAgcG9zdE1lc3NhZ2UuaW5pdCgpO1xuXG4gIC8vIGNvbm5lY3RcbiAgY29uc3QgY29ubmVjdG9yID0gbmV3IENvbm5lY3RvcjxXaW5kb3c+KHBvc3RNZXNzYWdlLCBwb3N0TWVzYWdlU2VuZGVyLCB3aW5kb3cpO1xuICByZXR1cm4gTVBfU0RLLmNvbm5lY3QobmV3IEVtYmVkQ29ubmVjdG9yKGNvbm5lY3RvciwgcG9zdE1lc3NhZ2UsIG9wdGlvbnMpLCBuZXcgRW1iZWRNZXNzZW5nZXJGYWN0b3J5RmV0Y2hlcih0YXJnZXQpLCB3aW5kb3cpO1xufVxuXG5mdW5jdGlvbiBnZXRXaW5kb3coZWxlbWVudDogSFRNTElGcmFtZUVsZW1lbnQpOiBXaW5kb3cgfCBudWxsIHtcbiAgaWYgKGVsZW1lbnQuY29udGVudFdpbmRvdykgcmV0dXJuIGVsZW1lbnQuY29udGVudFdpbmRvdztcbiAgcmV0dXJuIG51bGw7XG59XG5cbmNsYXNzIEVtYmVkQ29ubmVjdG9yIGltcGxlbWVudHMgSVNka0Nvbm5lY3RvcjxDb25uZWN0UmVzcG9uc2U+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25uZWN0b3I6IENvbm5lY3RvcjxXaW5kb3c+LFxuICAgIHByaXZhdGUgcG9zdE1lc3NhZ2U6IFVuZGlyZWN0ZWRNZXNzZW5nZXI8T3V0Z29pbmdEYXRhTWFwLCBJbmNvbWluZ0RhdGFNYXAsIFdpbmRvdz4sXG4gICAgcHJpdmF0ZSBvcHRpb25zOiBQYXJ0aWFsPENvbm5lY3Rpb25PcHRpb25zPixcbiAgKSB7fVxuICBwdWJsaWMgY29ubmVjdCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb25uZWN0b3IuY29ubmVjdCh2ZXJzaW9uLCB0aGlzLm9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGNhbmNlbENvbm5lY3RpbmcoKSB7XG4gICAgdGhpcy5wb3N0TWVzc2FnZS5kaXNwb3NlKCk7XG4gIH1cbn1cblxuY2xhc3MgRW1iZWRNZXNzZW5nZXJGYWN0b3J5RmV0Y2hlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdGFyZ2V0OiBXaW5kb3cpIHt9XG4gIHB1YmxpYyBnZXRGYWN0b3J5KGNvbm5lY3RSZXNwb25zZTogQ29ubmVjdFJlc3BvbnNlKSB7XG4gICAgcmV0dXJuIG5ldyBQb3N0TWVzc2FnZUZhY3RvcnkoY29ubmVjdFJlc3BvbnNlLnNvdXJjZUlkLCB3aW5kb3csIGNvbm5lY3RSZXNwb25zZS50YXJnZXRJZCwgdGhpcy50YXJnZXQsIGNvbm5lY3RSZXNwb25zZS50YXJnZXRPcmlnaW4pO1xuICB9XG59XG4iLCJpbXBvcnQgdHlwZSB7IElNZXNzYWdlIH0gZnJvbSAnQHNkay9tZXNzZW5nZXJzJztcbmltcG9ydCB0eXBlIHsgSGFuZHNoYWtlUGF5bG9hZCwgSW5jb21pbmdEYXRhTWFwfSBmcm9tICcuLi9NZXNzYWdlVHlwZXMnO1xuaW1wb3J0IHsgSW5jb21pbmdNZXNzYWdlVHlwZSB9IGZyb20gJy4uL01lc3NhZ2VUeXBlcyc7XG5cbmV4cG9ydCBjbGFzcyBIYW5kc2hha2VNZXNzYWdlIGltcGxlbWVudHMgSU1lc3NhZ2U8SW5jb21pbmdNZXNzYWdlVHlwZS5IQU5EU0hBS0UsIEluY29taW5nRGF0YU1hcD4ge1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IEluY29taW5nTWVzc2FnZVR5cGUuSEFORFNIQUtFO1xuICBwdWJsaWMgcmVhZG9ubHkgcGF5bG9hZDogSGFuZHNoYWtlUGF5bG9hZDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnBheWxvYWQgPSB7fTtcbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgeyBJTWVzc2FnZSB9IGZyb20gJ0BzZGsvbWVzc2VuZ2Vycyc7XG5pbXBvcnQgdHlwZSB7IEFjY2VwdFBheWxvYWQsIEluY29taW5nRGF0YU1hcH0gZnJvbSAnLi4vTWVzc2FnZVR5cGVzJztcbmltcG9ydCB7IEluY29taW5nTWVzc2FnZVR5cGUgfSBmcm9tICcuLi9NZXNzYWdlVHlwZXMnO1xuXG5leHBvcnQgY2xhc3MgQWNjZXB0TWVzc2FnZSBpbXBsZW1lbnRzIElNZXNzYWdlPEluY29taW5nTWVzc2FnZVR5cGUuQUNDRVBULCBJbmNvbWluZ0RhdGFNYXA+IHtcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBJbmNvbWluZ01lc3NhZ2VUeXBlLkFDQ0VQVDtcbiAgcHVibGljIHJlYWRvbmx5IHBheWxvYWQ6IEFjY2VwdFBheWxvYWQ7XG5cbiAgLy8gVE9PRCAoc2RrIDEueCBzdXBwb3J0KTogU0RLIGJvb3RzdHJhcCAxLnggZXhwZWN0cyB0aGUgYGludGVyZmFjZWAgdG8gYmUgYXQgdGhlIHJvb3Qgb2YgdGhlIG1lc3NhZ2VzXG4gIHB1YmxpYyBpbnRlcmZhY2U6IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuXG4gIGNvbnN0cnVjdG9yKHNjcmlwdFVybDogc3RyaW5nLCBjbGllbnRJbnRlcmZhY2U6IFJlY29yZDxzdHJpbmcsIHVua25vd24+LCBzb3VyY2VJZDogbnVtYmVyLCB0YXJnZXRJZDogbnVtYmVyLCB0YXJnZXRPcmlnaW46IHN0cmluZykge1xuICAgIHRoaXMucGF5bG9hZCA9IHtcbiAgICAgIHNjcmlwdFVybCxcbiAgICAgIGludGVyZmFjZTogY2xpZW50SW50ZXJmYWNlLFxuICAgICAgc291cmNlSWQsXG4gICAgICB0YXJnZXRJZCxcbiAgICAgIHRhcmdldE9yaWdpbixcbiAgICB9O1xuICAgIHRoaXMuaW50ZXJmYWNlID0gY2xpZW50SW50ZXJmYWNlO1xuICB9XG59XG4iLCJpbXBvcnQgdHlwZSB7IElNZXNzYWdlIH0gZnJvbSAnQHNkay9tZXNzZW5nZXJzJztcbmltcG9ydCB0eXBlIHsgU2RrQ29ubmVjdEVycm9yIH0gZnJvbSAnLi4vRXJyb3JzJztcbmltcG9ydCB0eXBlIHsgSW5jb21pbmdEYXRhTWFwLCBSZWplY3RQYXlsb2FkIH0gZnJvbSAnLi4vTWVzc2FnZVR5cGVzJztcbmltcG9ydCB7IEluY29taW5nTWVzc2FnZVR5cGUgfSBmcm9tICcuLi9NZXNzYWdlVHlwZXMnO1xuXG5leHBvcnQgY2xhc3MgUmVqZWN0TWVzc2FnZSBpbXBsZW1lbnRzIElNZXNzYWdlPEluY29taW5nTWVzc2FnZVR5cGUuUkVKRUNULCBJbmNvbWluZ0RhdGFNYXA+IHtcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBJbmNvbWluZ01lc3NhZ2VUeXBlLlJFSkVDVDtcbiAgcHVibGljIHJlYWRvbmx5IHBheWxvYWQ6IFJlamVjdFBheWxvYWQ7XG5cbiAgLy8gVE9PRCAoc2RrIDEueCBzdXBwb3J0KTogU0RLIGJvb3RzdHJhcCAxLnggZXhwZWN0cyB0aGUgYHJlYXNvbmAgdG8gYmUgYXQgdGhlIHJvb3Qgb2YgdGhlIG1lc3NhZ2VzXG4gIHB1YmxpYyByZWFzb246IHN0cmluZztcbiAgY29uc3RydWN0b3IoZXJyb3I6IFNka0Nvbm5lY3RFcnJvcikge1xuICAgIHRoaXMucGF5bG9hZCA9IHtcbiAgICAgIHJlYXNvbjogZXJyb3IubWVzc2FnZSxcbiAgICAgIGVycm9yVHlwZTogZXJyb3IudHlwZSxcbiAgICB9O1xuICAgIHRoaXMucmVhc29uID0gZXJyb3IubWVzc2FnZTtcbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgeyBDbGllbnRJbmZvLCBJTWVzc2FnZU9ic2VydmVyIH0gZnJvbSAnQHNkay9tZXNzZW5nZXJzJztcbmltcG9ydCB0eXBlIHsgT3V0Z29pbmdEYXRhTWFwLCBDb25uZWN0UGF5bG9hZCB9IGZyb20gJ0BzZGsvYm9vdHN0cmFwJztcbmltcG9ydCB7IE91dGdvaW5nTWVzc2FnZVR5cGUgfSBmcm9tICdAc2RrL2Jvb3RzdHJhcCc7XG5cbi8qKlxuICogQW4gb2JzZXJ2ZXIgdGhhdCByZWNlaXZlcyBgQ29ubmVjdFBheWxvYWRgIG9iamVjdHMgaW4gaXRzIGBvbkNvbm5lY3Rpb25SZWNlaXZlZGAgY2FsbGJhY2tcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJQ29ubmVjdE9ic2VydmVyPFQgZXh0ZW5kcyBDbGllbnRJbmZvPiB7XG4gIG9uQ29ubmVjdGlvblJlY2VpdmVkKGNvbm5lY3Q6IENvbm5lY3RQYXlsb2FkLCBjbGllbnRJbmZvOiBUKTogdm9pZDtcbn1cblxuLyoqXG4gKiBBbiBhZGFwdG9yIHRvIG1ha2UgYW4gYElDb25uZWN0T2JzZXJ2ZXJgIGxvb2sgbGlrZSBhbiBgSU1lc3NhZ2VPYnNlcnZlcmAgKHdpdGggYSBgbm90aWZ5YCBmdW5jdGlvbilcbiAqIENhbGxzIHRoZSBpbnB1dCBvYmplY3QncyBgb25Db25uZWN0aW9uUmVjZWl2ZWRgIHdoZW4gYSBgQ09OTkVDVGAgbWVzc2FnZSBpcyByZWNlaXZlZCBvbiB0aGUgYElNZXNzZW5nZXJgIHRoaXMgaXMgcmVnaXN0ZXJlZCB3aXRoLlxuICovXG5leHBvcnQgY2xhc3MgQ29ubmVjdE1lc3NhZ2VPYnNlcnZlcjxUIGV4dGVuZHMgQ2xpZW50SW5mbz4gaW1wbGVtZW50cyBJTWVzc2FnZU9ic2VydmVyPE91dGdvaW5nTWVzc2FnZVR5cGUuQ09OTkVDVCwgT3V0Z29pbmdEYXRhTWFwLCBUPiB7XG4gIHB1YmxpYyByZWFkb25seSBtZXNzYWdlVHlwZSA9IE91dGdvaW5nTWVzc2FnZVR5cGUuQ09OTkVDVDtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWNlaXZlcjogSUNvbm5lY3RPYnNlcnZlcjxUPikge31cblxuICBwdWJsaWMgbm90aWZ5KGNvbm5lY3Q6IENvbm5lY3RQYXlsb2FkLCBjbGllbnRJbmZvOiBUKTogdm9pZCB7XG4gICAgdGhpcy5yZWNlaXZlci5vbkNvbm5lY3Rpb25SZWNlaXZlZChjb25uZWN0LCBjbGllbnRJbmZvKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIkJyaWRnZU9ic2VydmVyIiwibWVzc2FnZVJlY2VpdmVyIiwibWVzc2FnZSIsImNsaWVudEluZm8iLCJ0aGlzIiwib25NZXNzYWdlUmVjZWl2ZWQiLCJEaWN0QXJyYXkiLCJ2YWx1ZXMiLCJrZXkiLCJ2YWx1ZSIsImdldFZhbHVlc0F0S2V5IiwicHVzaCIsInZhbHVlc0F0S2V5IiwiaWR4IiwiaW5kZXhPZiIsInNwbGljZSIsImxlbmd0aCIsInZhbEZpbmRlciIsImZpbmQiLCJPYmplY3QiLCJrZXlzIiwidmFsIiwiaGFzS2V5IiwiaW5jbHVkZXMiLCJTeW1ib2wiLCJpdGVyYXRvciIsIkVycm9yTWVzc2FnZUJyaWRnZSIsIkVycm9yIiwic291cmNlSWQiLCJ0YXJnZXRJZCIsIm1lc3NhZ2VCcmlkZ2UiLCJvYnNlcnZlcnMiLCJtZXNzZW5nZXIiLCJzZW5kRmlsdGVyIiwicmVjdkZpbHRlciIsImZpbHRlcmVkTWVzc2VuZ2VyIiwiRmlsdGVyZWRNZXNzZW5nZXIiLCJtc2dUeXBlIiwib2JzZXJ2ZXIiLCJhZGRPYnNlcnZlciIsIm1lc3NlbmdlckZhY2FkZSIsImJyaWRnZU9ic2VydmVyIiwibGlzdGVuIiwic3RvcExpc3RlbmluZyIsIm8iLCJhZGQiLCJtZXNzYWdlVHlwZSIsInJlbW92ZSIsImZyb21JZCIsInRvSWQiLCJzZW5kIiwidGltZXN0YW1wIiwiRGF0ZSIsIm5vdyIsImZpbHRlck1lc3NhZ2VJZCIsInR5cGUiLCJtZXNzYWdlT2JzZXJ2ZXJzIiwicGF5bG9hZCIsIm5vdGlmeSIsIkFycmF5IiwidW5kZWZpbmVkIiwic3VwZXIiLCJlcnJvckJyaWRnZSIsIlVuZGlyZWN0ZWRNZXNzZW5nZXIiLCJsaXN0ZW5lckJyaWRnZSIsInRhcmdldCIsInNvdXJjZSIsIlBvc3RNZXNzYWdlTGlzdGVuZXIiLCJ0YXJnZXRXaW5kb3ciLCJtZXNzYWdlT2JzZXJ2ZXIiLCJvbk1lc3NhZ2UiLCJldmVudCIsImRhdGEiLCJpZCIsIm9yaWdpbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiUG9zdE1lc3NhZ2VTZW5kZXIiLCJ0YXJnZXRPcmlnaW4iLCJfc291cmNlIiwicG9zdE1lc3NhZ2UiLCJQb3N0TWVzc2FnZUJyaWRnZSIsInNvdXJjZVdpbmRvdyIsImxpc3RlbmVyIiwic2VuZGVyIiwiUG9zdE1lc3NhZ2VGYWN0b3J5IiwicG9zdE1lc3NhZ2VCcmlkZ2UiLCJNUF9TREsiLCJPdXRnb2luZ01lc3NhZ2VUeXBlIiwiSW5jb21pbmdNZXNzYWdlVHlwZSIsIkVycm9yVHlwZSIsImxpYkxvYWRlciIsIkR5bmFtaWNMaWJMb2FkZXIiLCJjb25uZWN0IiwiY29ubmVjdG9yIiwiZmFjdG9yeUZldGNoZXIiLCJ3aW5kb3dDb250ZXh0IiwiY29ubmVjdFJlc3BvbnNlIiwiY2FuY2VsQ29ubmVjdGluZyIsImJ1aWxkZXIiLCJ1cmwiLCJzZGtDbGllbnQiLCJsb2FkIiwiU2RrQnVpbGRlciIsImZldGNoU2NyaXB0Iiwic2NyaXB0VXJsIiwibWVzc2VuZ2VyRmFjdG9yeSIsImdldEZhY3RvcnkiLCJzZGtCdWlsZGVyIiwic2VyaWFsaXplZEludGVyZmFjZSIsImJ1aWxkIiwiYnVpbGRJbnRlcmZhY2UiLCJDb25uZWN0TWVzc2FnZSIsImJvb3RzdHJhcFZlcnNpb24iLCJvcHRpb25zIiwiQ09OTkVDVCIsImF1dGgiLCJwcm92aWRlciIsInNka1R5cGUiLCJhcHBsaWNhdGlvbktleSIsIkhhbmRzaGFrZU9ic2VydmVyIiwicmVjZWl2ZXIiLCJIQU5EU0hBS0UiLCJfaGFuZHNoYWtlIiwiX2NsaWVudEluZm8iLCJfdGltZXN0YW1wIiwiaGFuZHNoYWtlIiwiQWNjZXB0T2JzZXJ2ZXIiLCJBQ0NFUFQiLCJhY2NlcHQiLCJpbnRlcmZhY2UiLCJDb25uZWN0aW9uUmVmdXNlZEVycm9yIiwiUkVGVVNFRCIsIm5hbWUiLCJJbnZhbGlkUHJvdmlkZXJFcnJvciIsIklOVkFMSURfUFJPVklERVIiLCJLZXlSZWZlcnJlck1pc21hdGNoRXJyb3IiLCJLRVlfTUlTTUFUQ0giLCJFcnJvclR5cGVNYXAiLCJSZWplY3RPYnNlcnZlciIsIlJFSkVDVCIsInJlamVjdCIsImVycm9yVHlwZSIsImVycm9yIiwicmVhc29uIiwiQ29ubmVjdGlvbkNhbmNlbGxlZEVycm9yIiwiQ0FOQ0VMTEVEIiwiQ29ubmVjdGlvblN0YXRlIiwiQ29ubmVjdG9yIiwiY29ubmVjdGlvblN0YXRlIiwiSURMRSIsImNvbm5lY3Rpb25Qb2xsIiwiY29ubmVjdG9yRmFjYWRlIiwiaGFuZHNoYWtlT2JzZXJ2ZXIiLCJhY2NlcHRPYnNlcnZlciIsInJlamVjdE9ic2VydmVyIiwiY29ubmVjdGlvblByb21pc2UiLCJQcm9taXNlIiwicmVzIiwicmVqIiwicmVzb2x2ZUNvbm5lY3Rpb24iLCJyZWplY3RDb25uZWN0aW9uIiwidmVyc2lvbiIsIkNPTk5FQ1RJTkciLCJ3aW5kb3ciLCJzZXRJbnRlcnZhbCIsIkNPTk5FQ1RFRCIsInN0b3BDb25uZWN0UG9sbGluZyIsInJlbW92ZU9ic2VydmVyIiwiUkVKRUNURUQiLCJjbGVhckludGVydmFsIiwiY29uc29sZSIsIndhcm4iLCJjb25uZWN0V2l0aE9wdGlvbnMiLCJjb25uZWN0V2l0aEFwcGxpY2F0aW9uS2V5IiwiZWxlbWVudCIsImNvbnRlbnRXaW5kb3ciLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJwb3N0TWVzc2FnZUxpc3RlbmVyIiwicG9zdE1lc2FnZVNlbmRlciIsImluaXQiLCJFbWJlZENvbm5lY3RvciIsIkVtYmVkTWVzc2VuZ2VyRmFjdG9yeUZldGNoZXIiLCJkaXNwb3NlIiwiSGFuZHNoYWtlTWVzc2FnZSIsIkFjY2VwdE1lc3NhZ2UiLCJjbGllbnRJbnRlcmZhY2UiLCJSZWplY3RNZXNzYWdlIiwiQ29ubmVjdE1lc3NhZ2VPYnNlcnZlciIsIm9uQ29ubmVjdGlvblJlY2VpdmVkIl0sInNvdXJjZVJvb3QiOiIifQ==
