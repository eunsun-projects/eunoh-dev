/*! For license information please see 948.js.LICENSE.txt */
'use strict';
(self.webpackChunkmp_webgl = self.webpackChunkmp_webgl || []).push([
  [948],
  {
    26470: (t) => {
      function e(t) {
        if ('string' != typeof t)
          throw new TypeError('Path must be a string. Received ' + JSON.stringify(t));
      }
      function n(t, e) {
        for (var n, r = '', s = 0, i = -1, o = 0, a = 0; a <= t.length; ++a) {
          if (a < t.length) n = t.charCodeAt(a);
          else {
            if (47 === n) break;
            n = 47;
          }
          if (47 === n) {
            if (i === a - 1 || 1 === o);
            else if (i !== a - 1 && 2 === o) {
              if (
                r.length < 2 ||
                2 !== s ||
                46 !== r.charCodeAt(r.length - 1) ||
                46 !== r.charCodeAt(r.length - 2)
              )
                if (r.length > 2) {
                  var c = r.lastIndexOf('/');
                  if (c !== r.length - 1) {
                    -1 === c
                      ? ((r = ''), (s = 0))
                      : (s = (r = r.slice(0, c)).length - 1 - r.lastIndexOf('/')),
                      (i = a),
                      (o = 0);
                    continue;
                  }
                } else if (2 === r.length || 1 === r.length) {
                  (r = ''), (s = 0), (i = a), (o = 0);
                  continue;
                }
              e && (r.length > 0 ? (r += '/..') : (r = '..'), (s = 2));
            } else
              r.length > 0 ? (r += '/' + t.slice(i + 1, a)) : (r = t.slice(i + 1, a)),
                (s = a - i - 1);
            (i = a), (o = 0);
          } else 46 === n && -1 !== o ? ++o : (o = -1);
        }
        return r;
      }
      var r = {
        resolve: function () {
          for (var t, r = '', s = !1, i = arguments.length - 1; i >= -1 && !s; i--) {
            var o;
            i >= 0 ? (o = arguments[i]) : (void 0 === t && (t = process.cwd()), (o = t)),
              e(o),
              0 !== o.length && ((r = o + '/' + r), (s = 47 === o.charCodeAt(0)));
          }
          return (r = n(r, !s)), s ? (r.length > 0 ? '/' + r : '/') : r.length > 0 ? r : '.';
        },
        normalize: function (t) {
          if ((e(t), 0 === t.length)) return '.';
          var r = 47 === t.charCodeAt(0),
            s = 47 === t.charCodeAt(t.length - 1);
          return (
            0 !== (t = n(t, !r)).length || r || (t = '.'),
            t.length > 0 && s && (t += '/'),
            r ? '/' + t : t
          );
        },
        isAbsolute: function (t) {
          return e(t), t.length > 0 && 47 === t.charCodeAt(0);
        },
        join: function () {
          if (0 === arguments.length) return '.';
          for (var t, n = 0; n < arguments.length; ++n) {
            var s = arguments[n];
            e(s), s.length > 0 && (void 0 === t ? (t = s) : (t += '/' + s));
          }
          return void 0 === t ? '.' : r.normalize(t);
        },
        relative: function (t, n) {
          if ((e(t), e(n), t === n)) return '';
          if ((t = r.resolve(t)) === (n = r.resolve(n))) return '';
          for (var s = 1; s < t.length && 47 === t.charCodeAt(s); ++s);
          for (var i = t.length, o = i - s, a = 1; a < n.length && 47 === n.charCodeAt(a); ++a);
          for (var c = n.length - a, l = o < c ? o : c, u = -1, h = 0; h <= l; ++h) {
            if (h === l) {
              if (c > l) {
                if (47 === n.charCodeAt(a + h)) return n.slice(a + h + 1);
                if (0 === h) return n.slice(a + h);
              } else o > l && (47 === t.charCodeAt(s + h) ? (u = h) : 0 === h && (u = 0));
              break;
            }
            var d = t.charCodeAt(s + h);
            if (d !== n.charCodeAt(a + h)) break;
            47 === d && (u = h);
          }
          var f = '';
          for (h = s + u + 1; h <= i; ++h)
            (h !== i && 47 !== t.charCodeAt(h)) || (0 === f.length ? (f += '..') : (f += '/..'));
          return f.length > 0
            ? f + n.slice(a + u)
            : ((a += u), 47 === n.charCodeAt(a) && ++a, n.slice(a));
        },
        _makeLong: function (t) {
          return t;
        },
        dirname: function (t) {
          if ((e(t), 0 === t.length)) return '.';
          for (var n = t.charCodeAt(0), r = 47 === n, s = -1, i = !0, o = t.length - 1; o >= 1; --o)
            if (47 === (n = t.charCodeAt(o))) {
              if (!i) {
                s = o;
                break;
              }
            } else i = !1;
          return -1 === s ? (r ? '/' : '.') : r && 1 === s ? '//' : t.slice(0, s);
        },
        basename: function (t, n) {
          if (void 0 !== n && 'string' != typeof n)
            throw new TypeError('"ext" argument must be a string');
          e(t);
          var r,
            s = 0,
            i = -1,
            o = !0;
          if (void 0 !== n && n.length > 0 && n.length <= t.length) {
            if (n.length === t.length && n === t) return '';
            var a = n.length - 1,
              c = -1;
            for (r = t.length - 1; r >= 0; --r) {
              var l = t.charCodeAt(r);
              if (47 === l) {
                if (!o) {
                  s = r + 1;
                  break;
                }
              } else
                -1 === c && ((o = !1), (c = r + 1)),
                  a >= 0 && (l === n.charCodeAt(a) ? -1 == --a && (i = r) : ((a = -1), (i = c)));
            }
            return s === i ? (i = c) : -1 === i && (i = t.length), t.slice(s, i);
          }
          for (r = t.length - 1; r >= 0; --r)
            if (47 === t.charCodeAt(r)) {
              if (!o) {
                s = r + 1;
                break;
              }
            } else -1 === i && ((o = !1), (i = r + 1));
          return -1 === i ? '' : t.slice(s, i);
        },
        extname: function (t) {
          e(t);
          for (var n = -1, r = 0, s = -1, i = !0, o = 0, a = t.length - 1; a >= 0; --a) {
            var c = t.charCodeAt(a);
            if (47 !== c)
              -1 === s && ((i = !1), (s = a + 1)),
                46 === c ? (-1 === n ? (n = a) : 1 !== o && (o = 1)) : -1 !== n && (o = -1);
            else if (!i) {
              r = a + 1;
              break;
            }
          }
          return -1 === n || -1 === s || 0 === o || (1 === o && n === s - 1 && n === r + 1)
            ? ''
            : t.slice(n, s);
        },
        format: function (t) {
          if (null === t || 'object' != typeof t)
            throw new TypeError(
              'The "pathObject" argument must be of type Object. Received type ' + typeof t,
            );
          return (function (t, e) {
            var n = e.dir || e.root,
              r = e.base || (e.name || '') + (e.ext || '');
            return n ? (n === e.root ? n + r : n + t + r) : r;
          })('/', t);
        },
        parse: function (t) {
          e(t);
          var n = { root: '', dir: '', base: '', ext: '', name: '' };
          if (0 === t.length) return n;
          var r,
            s = t.charCodeAt(0),
            i = 47 === s;
          i ? ((n.root = '/'), (r = 1)) : (r = 0);
          for (var o = -1, a = 0, c = -1, l = !0, u = t.length - 1, h = 0; u >= r; --u)
            if (47 !== (s = t.charCodeAt(u)))
              -1 === c && ((l = !1), (c = u + 1)),
                46 === s ? (-1 === o ? (o = u) : 1 !== h && (h = 1)) : -1 !== o && (h = -1);
            else if (!l) {
              a = u + 1;
              break;
            }
          return (
            -1 === o || -1 === c || 0 === h || (1 === h && o === c - 1 && o === a + 1)
              ? -1 !== c && (n.base = n.name = 0 === a && i ? t.slice(1, c) : t.slice(a, c))
              : (0 === a && i
                  ? ((n.name = t.slice(1, o)), (n.base = t.slice(1, c)))
                  : ((n.name = t.slice(a, o)), (n.base = t.slice(a, c))),
                (n.ext = t.slice(o, c))),
            a > 0 ? (n.dir = t.slice(0, a - 1)) : i && (n.dir = '/'),
            n
          );
        },
        sep: '/',
        delimiter: ':',
        win32: null,
        posix: null,
      };
      (r.posix = r), (t.exports = r);
    },
    3614: (t, e, n) => {
      t.exports = s;
      var r = n(80645);
      function s(t) {
        (this.buf = ArrayBuffer.isView && ArrayBuffer.isView(t) ? t : new Uint8Array(t || 0)),
          (this.pos = 0),
          (this.type = 0),
          (this.length = this.buf.length);
      }
      (s.Varint = 0), (s.Fixed64 = 1), (s.Bytes = 2), (s.Fixed32 = 5);
      var i = 4294967296,
        o = 1 / i;
      function a(t) {
        return t.type === s.Bytes ? t.readVarint() + t.pos : t.pos + 1;
      }
      function c(t, e, n) {
        return n ? 4294967296 * e + (t >>> 0) : 4294967296 * (e >>> 0) + (t >>> 0);
      }
      function l(t, e, n) {
        var r =
          e <= 16383
            ? 1
            : e <= 2097151
              ? 2
              : e <= 268435455
                ? 3
                : Math.ceil(Math.log(e) / (7 * Math.LN2));
        n.realloc(r);
        for (var s = n.pos - 1; s >= t; s--) n.buf[s + r] = n.buf[s];
      }
      function u(t, e) {
        for (var n = 0; n < t.length; n++) e.writeVarint(t[n]);
      }
      function h(t, e) {
        for (var n = 0; n < t.length; n++) e.writeSVarint(t[n]);
      }
      function d(t, e) {
        for (var n = 0; n < t.length; n++) e.writeFloat(t[n]);
      }
      function f(t, e) {
        for (var n = 0; n < t.length; n++) e.writeDouble(t[n]);
      }
      function p(t, e) {
        for (var n = 0; n < t.length; n++) e.writeBoolean(t[n]);
      }
      function g(t, e) {
        for (var n = 0; n < t.length; n++) e.writeFixed32(t[n]);
      }
      function m(t, e) {
        for (var n = 0; n < t.length; n++) e.writeSFixed32(t[n]);
      }
      function w(t, e) {
        for (var n = 0; n < t.length; n++) e.writeFixed64(t[n]);
      }
      function y(t, e) {
        for (var n = 0; n < t.length; n++) e.writeSFixed64(t[n]);
      }
      function x(t, e) {
        return (t[e] | (t[e + 1] << 8) | (t[e + 2] << 16)) + 16777216 * t[e + 3];
      }
      function b(t, e, n) {
        (t[n] = e), (t[n + 1] = e >>> 8), (t[n + 2] = e >>> 16), (t[n + 3] = e >>> 24);
      }
      function _(t, e) {
        return (t[e] | (t[e + 1] << 8) | (t[e + 2] << 16)) + (t[e + 3] << 24);
      }
      s.prototype = {
        destroy: function () {
          this.buf = null;
        },
        readFields: function (t, e, n) {
          for (n = n || this.length; this.pos < n; ) {
            var r = this.readVarint(),
              s = r >> 3,
              i = this.pos;
            (this.type = 7 & r), t(s, e, this), this.pos === i && this.skip(r);
          }
          return e;
        },
        readMessage: function (t, e) {
          return this.readFields(t, e, this.readVarint() + this.pos);
        },
        readFixed32: function () {
          var t = x(this.buf, this.pos);
          return (this.pos += 4), t;
        },
        readSFixed32: function () {
          var t = _(this.buf, this.pos);
          return (this.pos += 4), t;
        },
        readFixed64: function () {
          var t = x(this.buf, this.pos) + x(this.buf, this.pos + 4) * i;
          return (this.pos += 8), t;
        },
        readSFixed64: function () {
          var t = x(this.buf, this.pos) + _(this.buf, this.pos + 4) * i;
          return (this.pos += 8), t;
        },
        readFloat: function () {
          var t = r.read(this.buf, this.pos, !0, 23, 4);
          return (this.pos += 4), t;
        },
        readDouble: function () {
          var t = r.read(this.buf, this.pos, !0, 52, 8);
          return (this.pos += 8), t;
        },
        readVarint: function (t) {
          var e,
            n,
            r = this.buf;
          return (
            (e = 127 & (n = r[this.pos++])),
            n < 128
              ? e
              : ((e |= (127 & (n = r[this.pos++])) << 7),
                n < 128
                  ? e
                  : ((e |= (127 & (n = r[this.pos++])) << 14),
                    n < 128
                      ? e
                      : ((e |= (127 & (n = r[this.pos++])) << 21),
                        n < 128
                          ? e
                          : (function (t, e, n) {
                              var r,
                                s,
                                i = n.buf;
                              if (((s = i[n.pos++]), (r = (112 & s) >> 4), s < 128))
                                return c(t, r, e);
                              if (((s = i[n.pos++]), (r |= (127 & s) << 3), s < 128))
                                return c(t, r, e);
                              if (((s = i[n.pos++]), (r |= (127 & s) << 10), s < 128))
                                return c(t, r, e);
                              if (((s = i[n.pos++]), (r |= (127 & s) << 17), s < 128))
                                return c(t, r, e);
                              if (((s = i[n.pos++]), (r |= (127 & s) << 24), s < 128))
                                return c(t, r, e);
                              if (((s = i[n.pos++]), (r |= (1 & s) << 31), s < 128))
                                return c(t, r, e);
                              throw new Error('Expected varint not more than 10 bytes');
                            })((e |= (15 & (n = r[this.pos])) << 28), t, this))))
          );
        },
        readVarint64: function () {
          return this.readVarint(!0);
        },
        readSVarint: function () {
          var t = this.readVarint();
          return t % 2 == 1 ? (t + 1) / -2 : t / 2;
        },
        readBoolean: function () {
          return Boolean(this.readVarint());
        },
        readString: function () {
          var t = this.readVarint() + this.pos,
            e = (function (t, e, n) {
              var r = '',
                s = e;
              for (; s < n; ) {
                var i,
                  o,
                  a,
                  c = t[s],
                  l = null,
                  u = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
                if (s + u > n) break;
                1 === u
                  ? c < 128 && (l = c)
                  : 2 === u
                    ? 128 == (192 & (i = t[s + 1])) &&
                      (l = ((31 & c) << 6) | (63 & i)) <= 127 &&
                      (l = null)
                    : 3 === u
                      ? ((i = t[s + 1]),
                        (o = t[s + 2]),
                        128 == (192 & i) &&
                          128 == (192 & o) &&
                          ((l = ((15 & c) << 12) | ((63 & i) << 6) | (63 & o)) <= 2047 ||
                            (l >= 55296 && l <= 57343)) &&
                          (l = null))
                      : 4 === u &&
                        ((i = t[s + 1]),
                        (o = t[s + 2]),
                        (a = t[s + 3]),
                        128 == (192 & i) &&
                          128 == (192 & o) &&
                          128 == (192 & a) &&
                          ((l = ((15 & c) << 18) | ((63 & i) << 12) | ((63 & o) << 6) | (63 & a)) <=
                            65535 ||
                            l >= 1114112) &&
                          (l = null)),
                  null === l
                    ? ((l = 65533), (u = 1))
                    : l > 65535 &&
                      ((l -= 65536),
                      (r += String.fromCharCode(((l >>> 10) & 1023) | 55296)),
                      (l = 56320 | (1023 & l))),
                  (r += String.fromCharCode(l)),
                  (s += u);
              }
              return r;
            })(this.buf, this.pos, t);
          return (this.pos = t), e;
        },
        readBytes: function () {
          var t = this.readVarint() + this.pos,
            e = this.buf.subarray(this.pos, t);
          return (this.pos = t), e;
        },
        readPackedVarint: function (t, e) {
          var n = a(this);
          for (t = t || []; this.pos < n; ) t.push(this.readVarint(e));
          return t;
        },
        readPackedSVarint: function (t) {
          var e = a(this);
          for (t = t || []; this.pos < e; ) t.push(this.readSVarint());
          return t;
        },
        readPackedBoolean: function (t) {
          var e = a(this);
          for (t = t || []; this.pos < e; ) t.push(this.readBoolean());
          return t;
        },
        readPackedFloat: function (t) {
          var e = a(this);
          for (t = t || []; this.pos < e; ) t.push(this.readFloat());
          return t;
        },
        readPackedDouble: function (t) {
          var e = a(this);
          for (t = t || []; this.pos < e; ) t.push(this.readDouble());
          return t;
        },
        readPackedFixed32: function (t) {
          var e = a(this);
          for (t = t || []; this.pos < e; ) t.push(this.readFixed32());
          return t;
        },
        readPackedSFixed32: function (t) {
          var e = a(this);
          for (t = t || []; this.pos < e; ) t.push(this.readSFixed32());
          return t;
        },
        readPackedFixed64: function (t) {
          var e = a(this);
          for (t = t || []; this.pos < e; ) t.push(this.readFixed64());
          return t;
        },
        readPackedSFixed64: function (t) {
          var e = a(this);
          for (t = t || []; this.pos < e; ) t.push(this.readSFixed64());
          return t;
        },
        skip: function (t) {
          var e = 7 & t;
          if (e === s.Varint) for (; this.buf[this.pos++] > 127; );
          else if (e === s.Bytes) this.pos = this.readVarint() + this.pos;
          else if (e === s.Fixed32) this.pos += 4;
          else {
            if (e !== s.Fixed64) throw new Error('Unimplemented type: ' + e);
            this.pos += 8;
          }
        },
        writeTag: function (t, e) {
          this.writeVarint((t << 3) | e);
        },
        realloc: function (t) {
          for (var e = this.length || 16; e < this.pos + t; ) e *= 2;
          if (e !== this.length) {
            var n = new Uint8Array(e);
            n.set(this.buf), (this.buf = n), (this.length = e);
          }
        },
        finish: function () {
          return (this.length = this.pos), (this.pos = 0), this.buf.subarray(0, this.length);
        },
        writeFixed32: function (t) {
          this.realloc(4), b(this.buf, t, this.pos), (this.pos += 4);
        },
        writeSFixed32: function (t) {
          this.realloc(4), b(this.buf, t, this.pos), (this.pos += 4);
        },
        writeFixed64: function (t) {
          this.realloc(8),
            b(this.buf, -1 & t, this.pos),
            b(this.buf, Math.floor(t * o), this.pos + 4),
            (this.pos += 8);
        },
        writeSFixed64: function (t) {
          this.realloc(8),
            b(this.buf, -1 & t, this.pos),
            b(this.buf, Math.floor(t * o), this.pos + 4),
            (this.pos += 8);
        },
        writeVarint: function (t) {
          (t = +t || 0) > 268435455 || t < 0
            ? (function (t, e) {
                var n, r;
                t >= 0
                  ? ((n = t % 4294967296 | 0), (r = (t / 4294967296) | 0))
                  : ((r = ~(-t / 4294967296)),
                    4294967295 ^ (n = ~(-t % 4294967296))
                      ? (n = (n + 1) | 0)
                      : ((n = 0), (r = (r + 1) | 0)));
                if (t >= 0x10000000000000000 || t < -0x10000000000000000)
                  throw new Error("Given varint doesn't fit into 10 bytes");
                e.realloc(10),
                  (function (t, e, n) {
                    (n.buf[n.pos++] = (127 & t) | 128),
                      (t >>>= 7),
                      (n.buf[n.pos++] = (127 & t) | 128),
                      (t >>>= 7),
                      (n.buf[n.pos++] = (127 & t) | 128),
                      (t >>>= 7),
                      (n.buf[n.pos++] = (127 & t) | 128),
                      (t >>>= 7),
                      (n.buf[n.pos] = 127 & t);
                  })(n, 0, e),
                  (function (t, e) {
                    var n = (7 & t) << 4;
                    if (((e.buf[e.pos++] |= n | ((t >>>= 3) ? 128 : 0)), !t)) return;
                    if (((e.buf[e.pos++] = (127 & t) | ((t >>>= 7) ? 128 : 0)), !t)) return;
                    if (((e.buf[e.pos++] = (127 & t) | ((t >>>= 7) ? 128 : 0)), !t)) return;
                    if (((e.buf[e.pos++] = (127 & t) | ((t >>>= 7) ? 128 : 0)), !t)) return;
                    if (((e.buf[e.pos++] = (127 & t) | ((t >>>= 7) ? 128 : 0)), !t)) return;
                    e.buf[e.pos++] = 127 & t;
                  })(r, e);
              })(t, this)
            : (this.realloc(4),
              (this.buf[this.pos++] = (127 & t) | (t > 127 ? 128 : 0)),
              t <= 127 ||
                ((this.buf[this.pos++] = (127 & (t >>>= 7)) | (t > 127 ? 128 : 0)),
                t <= 127 ||
                  ((this.buf[this.pos++] = (127 & (t >>>= 7)) | (t > 127 ? 128 : 0)),
                  t <= 127 || (this.buf[this.pos++] = (t >>> 7) & 127))));
        },
        writeSVarint: function (t) {
          this.writeVarint(t < 0 ? 2 * -t - 1 : 2 * t);
        },
        writeBoolean: function (t) {
          this.writeVarint(Boolean(t));
        },
        writeString: function (t) {
          (t = String(t)), this.realloc(4 * t.length), this.pos++;
          var e = this.pos;
          this.pos = (function (t, e, n) {
            for (var r, s, i = 0; i < e.length; i++) {
              if ((r = e.charCodeAt(i)) > 55295 && r < 57344) {
                if (!s) {
                  r > 56319 || i + 1 === e.length
                    ? ((t[n++] = 239), (t[n++] = 191), (t[n++] = 189))
                    : (s = r);
                  continue;
                }
                if (r < 56320) {
                  (t[n++] = 239), (t[n++] = 191), (t[n++] = 189), (s = r);
                  continue;
                }
                (r = ((s - 55296) << 10) | (r - 56320) | 65536), (s = null);
              } else s && ((t[n++] = 239), (t[n++] = 191), (t[n++] = 189), (s = null));
              r < 128
                ? (t[n++] = r)
                : (r < 2048
                    ? (t[n++] = (r >> 6) | 192)
                    : (r < 65536
                        ? (t[n++] = (r >> 12) | 224)
                        : ((t[n++] = (r >> 18) | 240), (t[n++] = ((r >> 12) & 63) | 128)),
                      (t[n++] = ((r >> 6) & 63) | 128)),
                  (t[n++] = (63 & r) | 128));
            }
            return n;
          })(this.buf, t, this.pos);
          var n = this.pos - e;
          n >= 128 && l(e, n, this), (this.pos = e - 1), this.writeVarint(n), (this.pos += n);
        },
        writeFloat: function (t) {
          this.realloc(4), r.write(this.buf, t, this.pos, !0, 23, 4), (this.pos += 4);
        },
        writeDouble: function (t) {
          this.realloc(8), r.write(this.buf, t, this.pos, !0, 52, 8), (this.pos += 8);
        },
        writeBytes: function (t) {
          var e = t.length;
          this.writeVarint(e), this.realloc(e);
          for (var n = 0; n < e; n++) this.buf[this.pos++] = t[n];
        },
        writeRawMessage: function (t, e) {
          this.pos++;
          var n = this.pos;
          t(e, this);
          var r = this.pos - n;
          r >= 128 && l(n, r, this), (this.pos = n - 1), this.writeVarint(r), (this.pos += r);
        },
        writeMessage: function (t, e, n) {
          this.writeTag(t, s.Bytes), this.writeRawMessage(e, n);
        },
        writePackedVarint: function (t, e) {
          this.writeMessage(t, u, e);
        },
        writePackedSVarint: function (t, e) {
          this.writeMessage(t, h, e);
        },
        writePackedBoolean: function (t, e) {
          this.writeMessage(t, p, e);
        },
        writePackedFloat: function (t, e) {
          this.writeMessage(t, d, e);
        },
        writePackedDouble: function (t, e) {
          this.writeMessage(t, f, e);
        },
        writePackedFixed32: function (t, e) {
          this.writeMessage(t, g, e);
        },
        writePackedSFixed32: function (t, e) {
          this.writeMessage(t, m, e);
        },
        writePackedFixed64: function (t, e) {
          this.writeMessage(t, w, e);
        },
        writePackedSFixed64: function (t, e) {
          this.writeMessage(t, y, e);
        },
        writeBytesField: function (t, e) {
          this.writeTag(t, s.Bytes), this.writeBytes(e);
        },
        writeFixed32Field: function (t, e) {
          this.writeTag(t, s.Fixed32), this.writeFixed32(e);
        },
        writeSFixed32Field: function (t, e) {
          this.writeTag(t, s.Fixed32), this.writeSFixed32(e);
        },
        writeFixed64Field: function (t, e) {
          this.writeTag(t, s.Fixed64), this.writeFixed64(e);
        },
        writeSFixed64Field: function (t, e) {
          this.writeTag(t, s.Fixed64), this.writeSFixed64(e);
        },
        writeVarintField: function (t, e) {
          this.writeTag(t, s.Varint), this.writeVarint(e);
        },
        writeSVarintField: function (t, e) {
          this.writeTag(t, s.Varint), this.writeSVarint(e);
        },
        writeStringField: function (t, e) {
          this.writeTag(t, s.Bytes), this.writeString(e);
        },
        writeFloatField: function (t, e) {
          this.writeTag(t, s.Fixed32), this.writeFloat(e);
        },
        writeDoubleField: function (t, e) {
          this.writeTag(t, s.Fixed64), this.writeDouble(e);
        },
        writeBooleanField: function (t, e) {
          this.writeVarintField(t, Boolean(e));
        },
      };
    },
    35048: (t, e, n) => {
      n.d(e, { I: () => lt });
      var r = n(26470);
      function s(t) {
        let e;
        try {
          e = new URL(t, 'http://fakehost.com/');
        } catch (t) {
          return null;
        }
        const n = e.pathname.split('/').pop(),
          r = n.lastIndexOf('.');
        if (-1 === r || r === n.length - 1) return null;
        return n.substring(r + 1);
      }
      class i {
        constructor() {
          (this.maxSize = 800),
            (this.minSize = 600),
            (this.unloadPercent = 0.05),
            (this.itemSet = new Map()),
            (this.itemList = []),
            (this.usedSet = new Set()),
            (this.callbacks = new Map()),
            (this.unloadPriorityCallback = null);
          const t = this.itemSet;
          this.defaultPriorityCallback = (e) => t.get(e);
        }
        isFull() {
          return this.itemSet.size >= this.maxSize;
        }
        add(t, e) {
          const n = this.itemSet;
          if (n.has(t)) return !1;
          if (this.isFull()) return !1;
          const r = this.usedSet,
            s = this.itemList,
            i = this.callbacks;
          return s.push(t), r.add(t), n.set(t, Date.now()), i.set(t, e), !0;
        }
        remove(t) {
          const e = this.usedSet,
            n = this.itemSet,
            r = this.itemList,
            s = this.callbacks;
          if (n.has(t)) {
            s.get(t)(t);
            const i = r.indexOf(t);
            return r.splice(i, 1), e.delete(t), n.delete(t), s.delete(t), !0;
          }
          return !1;
        }
        markUsed(t) {
          const e = this.itemSet,
            n = this.usedSet;
          e.has(t) && !n.has(t) && (e.set(t, Date.now()), n.add(t));
        }
        markAllUnused() {
          this.usedSet.clear();
        }
        unloadUnusedContent() {
          const t = this.unloadPercent,
            e = this.minSize,
            n = this.itemList,
            r = this.itemSet,
            s = this.usedSet,
            i = this.callbacks,
            o = n.length - s.size,
            a = n.length - e,
            c = this.unloadPriorityCallback || this.defaultPriorityCallback;
          if (a > 0 && o > 0) {
            n.sort((t, e) => {
              const n = s.has(t),
                r = s.has(e);
              return n && r ? 0 : n || r ? (n ? 1 : -1) : c(e) - c(t);
            });
            const l = Math.min(a, o),
              u = Math.max(e * t, l * t);
            let h = Math.min(u, o);
            h = Math.ceil(h);
            const d = n.splice(0, h);
            for (let t = 0, e = d.length; t < e; t++) {
              const e = d[t];
              i.get(e)(e), r.delete(e), i.delete(e);
            }
          }
        }
        scheduleUnload(t = !0) {
          var e;
          this.scheduled ||
            ((this.scheduled = !0),
            (e = () => {
              (this.scheduled = !1), this.unloadUnusedContent(), t && this.markAllUnused();
            }),
            Promise.resolve().then(e));
        }
      }
      var o = n(17099);
      function a(t) {
        return 3 === t || 4 === t;
      }
      function c(t, e) {
        return t.__lastFrameVisited === e && t.__used;
      }
      function l(t, e) {
        t.__lastFrameVisited !== e &&
          ((t.__lastFrameVisited = e),
          (t.__used = !1),
          (t.__inFrustum = !1),
          (t.__isLeaf = !1),
          (t.__visible = !1),
          (t.__active = !1),
          (t.__error = 1 / 0),
          (t.__distanceFromCamera = 1 / 0),
          (t.__childrenWereVisible = !1),
          (t.__allChildrenLoaded = !1));
      }
      function u(t, e, n) {
        if ((l(t, e), (t.__used = !0), n.markUsed(t), t.__contentEmpty)) {
          const r = t.children;
          for (let t = 0, s = r.length; t < s; t++) u(r[t], e, n);
        }
      }
      function h(t, e, n) {
        if (t.__contentEmpty && (!t.__externalTileSet || a(t.__loadingState))) {
          const r = t.children;
          for (let t = 0, s = r.length; t < s; t++) {
            const s = r[t];
            (s.__depthFromRenderedParent = e), h(s, e, n);
          }
        } else n.requestTileContents(t);
      }
      function d(t, e = null, n = null, r = null, s = 0) {
        if (e && e(t, r, s)) return void (n && n(t, r, s));
        const i = t.children;
        for (let r = 0, o = i.length; r < o; r++) d(i[r], e, n, t, s + 1);
        n && n(t, r, s);
      }
      function f(t, e) {
        const n = e.stats,
          r = e.frameCount,
          s = e.errorTarget,
          i = e.maxDepth,
          o = e.loadSiblings,
          a = e.lruCache,
          c = e.stopAtEmptyTiles;
        l(t, r);
        if (!1 === e.tileInView(t)) return !1;
        if (
          ((t.__used = !0),
          a.markUsed(t),
          (t.__inFrustum = !0),
          n.inFrustum++,
          (c || !t.__contentEmpty) && !t.__externalTileSet)
        ) {
          e.calculateError(t);
          if (t.__error <= s) return !0;
          if (e.maxDepth > 0 && t.__depth + 1 >= i) return !0;
        }
        let h = !1;
        const d = t.children;
        for (let t = 0, n = d.length; t < n; t++) {
          const n = f(d[t], e);
          h = h || n;
        }
        if (h && o)
          for (let t = 0, e = d.length; t < e; t++) {
            u(d[t], r, a);
          }
        return !0;
      }
      function p(t, e) {
        const n = e.stats,
          r = e.frameCount;
        if (!c(t, r)) return;
        n.used++;
        const s = t.children;
        let i = !1;
        for (let t = 0, e = s.length; t < e; t++) {
          const e = s[t];
          i = i || c(e, r);
        }
        if (i) {
          let n = !1,
            i = !0;
          for (let t = 0, o = s.length; t < o; t++) {
            const o = s[t];
            if ((p(o, e), (n = n || o.__wasSetVisible || o.__childrenWereVisible), c(o, r))) {
              const t =
                o.__allChildrenLoaded ||
                (!o.__contentEmpty && a(o.__loadingState)) ||
                (o.__externalTileSet && 4 === o.__loadingState);
              i = i && t;
            }
          }
          (t.__childrenWereVisible = n), (t.__allChildrenLoaded = i);
        } else t.__isLeaf = !0;
      }
      function g(t, e) {
        const n = e.stats,
          r = e.frameCount;
        if (!c(t, r)) return;
        const s = t.parent,
          i = s ? s.__depthFromRenderedParent : -1;
        t.__depthFromRenderedParent = i;
        const o = e.lruCache;
        if (t.__isLeaf)
          return (
            t.__depthFromRenderedParent++,
            void (3 === t.__loadingState
              ? (t.__inFrustum && ((t.__visible = !0), n.visible++), (t.__active = !0), n.active++)
              : o.isFull() ||
                (t.__contentEmpty && !t.__externalTileSet) ||
                e.requestTileContents(t))
          );
        const l = (e.errorTarget + 1) * e.errorThreshold,
          u = t.__error <= l,
          d = u || 'ADD' === t.refine,
          f = !t.__contentEmpty,
          p = f || t.__externalTileSet,
          m = a(t.__loadingState) && p,
          w = t.__childrenWereVisible,
          y = t.children;
        let x = t.__allChildrenLoaded;
        if (
          (d && f && t.__depthFromRenderedParent++,
          d && !m && !o.isFull() && p && e.requestTileContents(t),
          ((u && !x && !w && m) || ('ADD' === t.refine && m)) &&
            (t.__inFrustum && ((t.__visible = !0), n.visible++), (t.__active = !0), n.active++),
          'ADD' !== t.refine && u && !x && m)
        )
          for (let n = 0, s = y.length; n < s; n++) {
            const s = y[n];
            c(s, r) &&
              !o.isFull() &&
              ((s.__depthFromRenderedParent = t.__depthFromRenderedParent + 1),
              h(s, s.__depthFromRenderedParent, e));
          }
        else
          for (let t = 0, n = y.length; t < n; t++) {
            const n = y[t];
            c(n, r) && g(n, e);
          }
      }
      function m(t, e) {
        const n = c(t, e.frameCount);
        if (n || t.__usedLastFrame) {
          let r = !1,
            s = !1;
          n && ((r = t.__active), (s = (e.displayActiveTiles && t.__active) || t.__visible)),
            t.__contentEmpty ||
              3 !== t.__loadingState ||
              (t.__wasSetActive !== r && e.setTileActive(t, r),
              t.__wasSetVisible !== s && e.setTileVisible(t, s)),
            (t.__wasSetActive = r),
            (t.__wasSetVisible = s),
            (t.__usedLastFrame = n);
          const i = t.children;
          for (let t = 0, n = i.length; t < n; t++) {
            m(i[t], e);
          }
        }
      }
      const w = (t, e) =>
          t.__depth !== e.__depth
            ? t.__depth > e.__depth
              ? -1
              : 1
            : t.__inFrustum !== e.__inFrustum
              ? t.__inFrustum
                ? 1
                : -1
              : t.__used !== e.__used
                ? t.__used
                  ? 1
                  : -1
                : t.__error !== e.__error
                  ? t.__error > e.__error
                    ? 1
                    : -1
                  : t.__distanceFromCamera !== e.__distanceFromCamera
                    ? t.__distanceFromCamera > e.__distanceFromCamera
                      ? -1
                      : 1
                    : 0,
        y = (t) => 1 / (t.__depthFromRenderedParent + 1);
      function x(t) {
        return new TextDecoder().decode(t);
      }
      class b {
        constructor(t, e, n, r) {
          (this.buffer = t), (this.binOffset = e + n), (this.binLength = r);
          let s = null;
          if (0 !== n) {
            const r = new Uint8Array(t, e, n);
            s = JSON.parse(x(r));
          } else s = {};
          this.header = s;
        }
        getKeys() {
          return Object.keys(this.header);
        }
        getData(t, e, n = null, r = null) {
          const s = this.header;
          if (!(t in s)) return null;
          const i = s[t];
          if (i instanceof Object) {
            if (Array.isArray(i)) return i;
            {
              const { buffer: s, binOffset: o, binLength: a } = this,
                c = i.byteOffset || 0,
                l = i.type || r,
                u = i.componentType || n;
              if ('type' in i && r && i.type !== r)
                throw new Error('FeatureTable: Specified type does not match expected type.');
              let h, d;
              switch (l) {
                case 'SCALAR':
                  h = 1;
                  break;
                case 'VEC2':
                  h = 2;
                  break;
                case 'VEC3':
                  h = 3;
                  break;
                case 'VEC4':
                  h = 4;
                  break;
                default:
                  throw new Error(`FeatureTable : Feature type not provided for "${t}".`);
              }
              const f = o + c,
                p = e * h;
              switch (u) {
                case 'BYTE':
                  d = new Int8Array(s, f, p);
                  break;
                case 'UNSIGNED_BYTE':
                  d = new Uint8Array(s, f, p);
                  break;
                case 'SHORT':
                  d = new Int16Array(s, f, p);
                  break;
                case 'UNSIGNED_SHORT':
                  d = new Uint16Array(s, f, p);
                  break;
                case 'INT':
                  d = new Int32Array(s, f, p);
                  break;
                case 'UNSIGNED_INT':
                  d = new Uint32Array(s, f, p);
                  break;
                case 'FLOAT':
                  d = new Float32Array(s, f, p);
                  break;
                case 'DOUBLE':
                  d = new Float64Array(s, f, p);
                  break;
                default:
                  throw new Error(`FeatureTable : Feature component type not provided for "${t}".`);
              }
              if (f + p * d.BYTES_PER_ELEMENT > o + a)
                throw new Error('FeatureTable: Feature data read outside binary body length.');
              return d;
            }
          }
          return i;
        }
      }
      class _ extends b {
        constructor(t, e, n, r, s) {
          super(t, n, r, s), (this.batchSize = e);
        }
        getData(t, e = null, n = null) {
          return super.getData(t, this.batchSize, e, n);
        }
      }
      class T {
        constructor() {
          (this.fetchOptions = {}), (this.workingPath = '');
        }
        load(t) {
          return fetch(t, this.fetchOptions)
            .then((e) => {
              if (!e.ok)
                throw new Error(
                  `Failed to load file "${t}" with status ${e.status} : ${e.statusText}`,
                );
              return e.arrayBuffer();
            })
            .then(
              (e) => (
                '' === this.workingPath && (this.workingPath = this.workingPathForURL(t)),
                this.parse(e)
              ),
            );
        }
        resolveExternalURL(t) {
          return /^[^\\/]/.test(t) ? this.workingPath + '/' + t : t;
        }
        workingPathForURL(t) {
          const e = t.split(/[\\/]/g);
          e.pop();
          return e.join('/') + '/';
        }
        parse(t) {
          throw new Error('LoaderBase: Parse not implemented.');
        }
      }
      class v extends T {
        parse(t) {
          const e = new DataView(t),
            n =
              String.fromCharCode(e.getUint8(0)) +
              String.fromCharCode(e.getUint8(1)) +
              String.fromCharCode(e.getUint8(2)) +
              String.fromCharCode(e.getUint8(3));
          console.assert('b3dm' === n);
          const r = e.getUint32(4, !0);
          console.assert(1 === r);
          const s = e.getUint32(8, !0);
          console.assert(s === t.byteLength);
          const i = e.getUint32(12, !0),
            o = e.getUint32(16, !0),
            a = e.getUint32(20, !0),
            c = e.getUint32(24, !0),
            l = t.slice(28, 28 + i + o),
            u = new b(l, 0, i, o),
            h = 28 + i + o,
            d = t.slice(h, h + a + c),
            f = new _(d, u.getData('BATCH_LENGTH'), 0, a, c),
            p = h + a + c;
          return {
            version: r,
            featureTable: u,
            batchTable: f,
            glbBytes: new Uint8Array(t, p, s - p),
          };
        }
      }
      var S = n(81396),
        P = n(1217);
      class A extends v {
        constructor(t = S.DefaultLoadingManager) {
          super(), (this.manager = t);
        }
        parse(t) {
          const e = super.parse(t),
            n = e.glbBytes.slice().buffer;
          return new Promise((t, r) => {
            const s = this.manager,
              i = this.fetchOptions,
              o = s.getHandler('path.gltf') || new P.GLTFLoader(s);
            'include' === i.credentials && 'cors' === i.mode && o.setCrossOrigin('use-credentials'),
              'credentials' in i && o.setWithCredentials('include' === i.credentials),
              i.headers && o.setRequestHeader(i.headers);
            let a = this.workingPath;
            !/[\\/]$/.test(a) && a.length && (a += '/'),
              o.parse(
                n,
                a,
                (n) => {
                  const { batchTable: r, featureTable: s } = e,
                    { scene: i } = n,
                    o = s.getData('RTC_CENTER');
                  o && ((i.position.x += o[0]), (i.position.y += o[1]), (i.position.z += o[2])),
                    (n.batchTable = r),
                    (n.featureTable = s),
                    (i.batchTable = r),
                    (i.featureTable = s),
                    t(n);
                },
                r,
              );
          });
        }
      }
      class F extends T {
        parse(t) {
          const e = new DataView(t),
            n =
              String.fromCharCode(e.getUint8(0)) +
              String.fromCharCode(e.getUint8(1)) +
              String.fromCharCode(e.getUint8(2)) +
              String.fromCharCode(e.getUint8(3));
          console.assert('pnts' === n);
          const r = e.getUint32(4, !0);
          console.assert(1 === r);
          const s = e.getUint32(8, !0);
          console.assert(s === t.byteLength);
          const i = e.getUint32(12, !0),
            o = e.getUint32(16, !0),
            a = e.getUint32(20, !0),
            c = e.getUint32(24, !0),
            l = t.slice(28, 28 + i + o),
            u = new b(l, 0, i, o),
            h = 28 + i + o,
            d = t.slice(h, h + a + c),
            f = new _(d, u.getData('BATCH_LENGTH') || u.getData('POINTS_LENGTH'), 0, a, c);
          return Promise.resolve({ version: r, featureTable: u, batchTable: f });
        }
      }
      class C extends F {
        constructor(t = S.DefaultLoadingManager) {
          super(), (this.manager = t);
        }
        parse(t) {
          return super.parse(t).then((t) => {
            const { featureTable: e } = t,
              n = e.getData('POINTS_LENGTH'),
              r = e.getData('POSITION', n, 'FLOAT', 'VEC3'),
              s = e.getData('RGB', n, 'UNSIGNED_BYTE', 'VEC3');
            [
              'RTC_CENTER',
              'QUANTIZED_VOLUME_OFFSET',
              'QUANTIZED_VOLUME_SCALE',
              'CONSTANT_RGBA',
              'BATCH_LENGTH',
              'POSITION_QUANTIZED',
              'RGBA',
              'RGB565',
              'NORMAL',
              'NORMAL_OCT16P',
            ].forEach((t) => {
              t in e.header &&
                console.warn(`PNTSLoader: Unsupported FeatureTable feature "${t}" detected.`);
            });
            const i = new S.BufferGeometry();
            i.setAttribute('position', new S.BufferAttribute(r, 3, !1));
            const o = new S.PointsMaterial();
            (o.size = 2),
              (o.sizeAttenuation = !1),
              null !== s &&
                (i.setAttribute('color', new S.BufferAttribute(s, 3, !0)), (o.vertexColors = !0));
            const a = new S.Points(i, o);
            (t.scene = a), (t.scene.featureTable = e);
            const c = e.getData('RTC_CENTER');
            return (
              c &&
                ((t.scene.position.x += c[0]),
                (t.scene.position.y += c[1]),
                (t.scene.position.z += c[2])),
              t
            );
          });
        }
      }
      class M extends T {
        parse(t) {
          const e = new DataView(t),
            n =
              String.fromCharCode(e.getUint8(0)) +
              String.fromCharCode(e.getUint8(1)) +
              String.fromCharCode(e.getUint8(2)) +
              String.fromCharCode(e.getUint8(3));
          console.assert('i3dm' === n);
          const r = e.getUint32(4, !0);
          console.assert(1 === r);
          const s = e.getUint32(8, !0);
          console.assert(s === t.byteLength);
          const i = e.getUint32(12, !0),
            o = e.getUint32(16, !0),
            a = e.getUint32(20, !0),
            c = e.getUint32(24, !0),
            l = e.getUint32(28, !0),
            u = t.slice(32, 32 + i + o),
            h = new b(u, 0, i, o),
            d = 32 + i + o,
            f = t.slice(d, d + a + c),
            p = new _(f, h.getData('INSTANCES_LENGTH'), 0, a, c),
            g = d + a + c,
            m = new Uint8Array(t, g, s - g);
          let w = null,
            y = null;
          if (l) (w = m), (y = Promise.resolve());
          else {
            const t = this.resolveExternalURL(x(m));
            y = fetch(t, this.fetchOptions)
              .then((e) => {
                if (!e.ok)
                  throw new Error(
                    `I3DMLoaderBase : Failed to load file "${t}" with status ${e.status} : ${e.statusText}`,
                  );
                return e.arrayBuffer();
              })
              .then((t) => {
                w = new Uint8Array(t);
              });
          }
          return y.then(() => ({ version: r, featureTable: h, batchTable: p, glbBytes: w }));
        }
      }
      const V = new S.Vector3(),
        B = new S.Vector3(),
        U = new S.Vector3(),
        L = new S.Vector3(),
        k = new S.Quaternion(),
        R = new S.Vector3(),
        E = new S.Matrix4();
      class O extends M {
        constructor(t = S.DefaultLoadingManager) {
          super(), (this.manager = t);
        }
        resolveExternalURL(t) {
          return this.manager.resolveURL(super.resolveExternalURL(t));
        }
        parse(t) {
          return super.parse(t).then((t) => {
            const { featureTable: e, batchTable: n } = t,
              r = t.glbBytes.slice().buffer;
            return new Promise((t, s) => {
              const i = this.fetchOptions,
                o = this.manager,
                a = o.getHandler('path.gltf') || new P.GLTFLoader(o);
              'include' === i.credentials &&
                'cors' === i.mode &&
                a.setCrossOrigin('use-credentials'),
                'credentials' in i && a.setWithCredentials('include' === i.credentials),
                i.headers && a.setRequestHeader(i.headers);
              let c = this.workingPath;
              /[\\/]$/.test(c) || (c += '/'),
                a.parse(
                  r,
                  c,
                  (r) => {
                    const s = e.getData('INSTANCES_LENGTH'),
                      i = e.getData('POSITION', s, 'FLOAT', 'VEC3'),
                      o = e.getData('NORMAL_UP', s, 'FLOAT', 'VEC3'),
                      a = e.getData('NORMAL_RIGHT', s, 'FLOAT', 'VEC3'),
                      c = e.getData('SCALE_NON_UNIFORM', s, 'FLOAT', 'VEC3'),
                      l = e.getData('SCALE', s, 'FLOAT', 'SCALAR');
                    [
                      'RTC_CENTER',
                      'QUANTIZED_VOLUME_OFFSET',
                      'QUANTIZED_VOLUME_SCALE',
                      'EAST_NORTH_UP',
                      'POSITION_QUANTIZED',
                      'NORMAL_UP_OCT32P',
                      'NORMAL_RIGHT_OCT32P',
                    ].forEach((t) => {
                      t in e.header &&
                        console.warn(
                          `I3DMLoader: Unsupported FeatureTable feature "${t}" detected.`,
                        );
                    });
                    const u = new Map(),
                      h = [];
                    r.scene.traverse((t) => {
                      if (t.isMesh) {
                        const { geometry: e, material: n } = t,
                          r = new S.InstancedMesh(e, n, s);
                        r.position.copy(t.position),
                          r.rotation.copy(t.rotation),
                          r.scale.copy(t.scale),
                          h.push(r),
                          u.set(t, r);
                      }
                    });
                    const d = new S.Vector3();
                    for (let t = 0; t < s; t++)
                      (d.x += i[3 * t + 0] / s),
                        (d.y += i[3 * t + 1] / s),
                        (d.z += i[3 * t + 2] / s);
                    u.forEach((t, e) => {
                      const n = e.parent;
                      n &&
                        (n.remove(e),
                        n.add(t),
                        t.updateMatrixWorld(),
                        t.position.copy(d).applyMatrix4(t.matrixWorld));
                    });
                    for (let t = 0; t < s; t++) {
                      L.set(i[3 * t + 0] - d.x, i[3 * t + 1] - d.y, i[3 * t + 2] - d.z),
                        o
                          ? (B.set(o[3 * t + 0], o[3 * t + 1], o[3 * t + 2]),
                            U.set(a[3 * t + 0], a[3 * t + 1], a[3 * t + 2]),
                            V.crossVectors(U, B).normalize(),
                            E.makeBasis(U, B, V),
                            k.setFromRotationMatrix(E))
                          : k.set(0, 0, 0, 1),
                        l
                          ? R.setScalar(l[t])
                          : c
                            ? R.set(c[3 * t + 0], c[3 * t + 1], c[3 * t + 2])
                            : R.set(1, 1, 1),
                        E.compose(L, k, R);
                      for (let e = 0, n = h.length; e < n; e++) {
                        h[e].setMatrixAt(t, E);
                      }
                    }
                    (r.batchTable = n),
                      (r.featureTable = e),
                      (r.scene.batchTable = n),
                      (r.scene.featureTable = e),
                      t(r);
                  },
                  s,
                );
            });
          });
        }
      }
      class I extends T {
        parse(t) {
          const e = new DataView(t),
            n =
              String.fromCharCode(e.getUint8(0)) +
              String.fromCharCode(e.getUint8(1)) +
              String.fromCharCode(e.getUint8(2)) +
              String.fromCharCode(e.getUint8(3));
          console.assert('cmpt' === n, 'CMPTLoader: The magic bytes equal "cmpt".');
          const r = e.getUint32(4, !0);
          console.assert(1 === r, 'CMPTLoader: The version listed in the header is "1".');
          const s = e.getUint32(8, !0);
          console.assert(
            s === t.byteLength,
            'CMPTLoader: The contents buffer length listed in the header matches the file.',
          );
          const i = e.getUint32(12, !0),
            o = [];
          let a = 16;
          for (let e = 0; e < i; e++) {
            const e = new DataView(t, a, 12),
              n =
                String.fromCharCode(e.getUint8(0)) +
                String.fromCharCode(e.getUint8(1)) +
                String.fromCharCode(e.getUint8(2)) +
                String.fromCharCode(e.getUint8(3)),
              r = e.getUint32(4, !0),
              s = e.getUint32(8, !0),
              i = new Uint8Array(t, a, s);
            o.push({ type: n, buffer: i, version: r }), (a += s);
          }
          return { version: r, tiles: o };
        }
      }
      class D extends I {
        constructor(t = S.DefaultLoadingManager) {
          super(), (this.manager = t);
        }
        parse(t) {
          const e = super.parse(t),
            n = this.manager,
            r = [];
          for (const t in e.tiles) {
            const { type: s, buffer: i } = e.tiles[t];
            switch (s) {
              case 'b3dm': {
                const t = i.slice(),
                  e = new A(n);
                (e.workingPath = this.workingPath), (e.fetchOptions = this.fetchOptions);
                const s = e.parse(t.buffer);
                r.push(s);
                break;
              }
              case 'pnts': {
                const t = i.slice(),
                  e = new C(n);
                (e.workingPath = this.workingPath), (e.fetchOptions = this.fetchOptions);
                const s = e.parse(t.buffer);
                r.push(s);
                break;
              }
              case 'i3dm': {
                const t = i.slice(),
                  e = new O(n);
                (e.workingPath = this.workingPath), (e.fetchOptions = this.fetchOptions);
                const s = e.parse(t.buffer);
                r.push(s);
                break;
              }
            }
          }
          return Promise.all(r).then((t) => {
            const e = new S.Group();
            return (
              t.forEach((t) => {
                e.add(t.scene);
              }),
              { tiles: t, scene: e }
            );
          });
        }
      }
      class N extends T {
        constructor(t = S.DefaultLoadingManager) {
          super(), (this.manager = t);
        }
        parse(t) {
          return new Promise((e, n) => {
            const r = this.manager,
              s = this.fetchOptions;
            let i = r.getHandler('path.gltf') || r.getHandler('path.glb');
            i ||
              ((i = new P.GLTFLoader(r)),
              'include' === s.credentials &&
                'cors' === s.mode &&
                i.setCrossOrigin('use-credentials'),
              'credentials' in s && i.setWithCredentials('include' === s.credentials),
              s.headers && i.setRequestHeader(s.headers));
            let o = i.resourcePath || i.path || this.workingPath;
            !/[\\/]$/.test(o) && o.length && (o += '/'),
              i.parse(
                t,
                o,
                (t) => {
                  e(t);
                },
                n,
              );
          });
        }
      }
      const z = new S.Matrix4();
      class H extends S.Group {
        constructor(t) {
          super(), (this.name = 'TilesRenderer.TilesGroup'), (this.tilesRenderer = t);
        }
        raycast(t, e) {
          this.tilesRenderer.optimizeRaycast && this.tilesRenderer.raycast(t, e);
        }
        updateMatrixWorld(t) {
          if ((this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldNeedsUpdate || t)) {
            null === this.parent
              ? z.copy(this.matrix)
              : z.multiplyMatrices(this.parent.matrixWorld, this.matrix),
              (this.matrixWorldNeedsUpdate = !1);
            const t = z.elements,
              e = this.matrixWorld.elements;
            let n = !1;
            for (let r = 0; r < 16; r++) {
              const s = t[r],
                i = e[r];
              if (Math.abs(s - i) > Number.EPSILON) {
                n = !0;
                break;
              }
            }
            if (n) {
              this.matrixWorld.copy(z);
              const t = this.children;
              for (let e = 0, n = t.length; e < n; e++) t[e].updateMatrixWorld();
            }
          }
        }
      }
      const G = new S.Sphere(),
        q = new S.Matrix4(),
        j = new S.Vector3(),
        W = new S.Vector3(),
        $ = new S.Ray(),
        J = [];
      function Z(t, e) {
        return t.distance - e.distance;
      }
      function Q(t, e, n) {
        t.traverse((t) => {
          Object.getPrototypeOf(t).raycast.call(t, e, n);
        });
      }
      function X(t, e, n, r) {
        if (n.has(t)) {
          if ((Q(t.cached.scene, r, J), J.length > 0)) {
            J.length > 1 && J.sort(Z);
            const t = J[0];
            return (J.length = 0), t;
          }
          return null;
        }
        const s = [],
          i = t.children;
        for (let t = 0, n = i.length; t < n; t++) {
          const n = i[t],
            o = n.cached,
            a = e.matrixWorld;
          q.copy(a);
          const c = o.sphere;
          if (c && (G.copy(c), G.applyMatrix4(q), !r.ray.intersectsSphere(G))) continue;
          const l = o.box,
            u = o.boxTransform;
          if (l) {
            if ((q.multiply(u).invert(), $.copy(r.ray), $.applyMatrix4(q), !$.intersectBox(l, j)))
              continue;
            {
              let t;
              W.setFromMatrixScale(q),
                (t = W.x),
                Math.abs(Math.max(W.x - W.y, W.x - W.z)) > 1e-6 &&
                  console.warn(
                    'ThreeTilesRenderer : Non uniform scale used for tile which may cause issues when raycasting.',
                  );
              let e = { distance: 1 / 0, tile: null };
              s.push(e), (e.distance = j.distanceToSquared($.origin) * t * t), (e.tile = n);
            }
          }
        }
        s.sort(Z);
        let o = 1 / 0,
          a = null;
        for (let t = 0, i = s.length; t < i; t++) {
          const i = s[t];
          if (i.distance > o) break;
          {
            const t = i.tile,
              s = t.cached.scene;
            let c = null;
            if (
              (n.has(t)
                ? (Q(s, r, J), J.length > 0 && (J.length > 1 && J.sort(Z), (c = J[0])))
                : (c = X(t, e, n, r)),
              c)
            ) {
              const t = c.distance * c.distance;
              t < o && ((o = t), (a = c)), (J.length = 0);
            }
          }
        }
        return a;
      }
      function Y(t, e, n, r, s) {
        const i = t.cached,
          o = e.matrixWorld;
        q.copy(o);
        const a = i.sphere;
        if (a && (G.copy(a), G.applyMatrix4(q), !r.ray.intersectsSphere(G))) return;
        const c = i.box,
          l = i.boxTransform;
        if (c && (q.multiply(l).invert(), $.copy(r.ray).applyMatrix4(q), !$.intersectsBox(c)))
          return;
        const u = i.scene;
        if (n.has(t)) return void Q(u, r, s);
        const h = t.children;
        for (let t = 0, i = h.length; t < i; t++) Y(h[t], e, n, r, s);
      }
      const K = Symbol('INITIAL_FRUSTUM_CULLED'),
        tt = new S.Matrix4(),
        et = new S.Matrix4(),
        nt = new S.Vector3(),
        rt = new S.Vector3(),
        st = new S.Vector3(),
        it = new S.Vector3(),
        ot = new S.Vector3(1, 0, 0),
        at = new S.Vector3(0, 1, 0);
      function ct(t, e) {
        t.traverse((t) => {
          t.frustumCulled = t[K] && e;
        });
      }
      class lt extends class {
        get rootTileSet() {
          const t = this.tileSets[this.rootURL];
          return !t || t instanceof Promise ? null : t;
        }
        get root() {
          const t = this.rootTileSet;
          return t ? t.root : null;
        }
        constructor(t) {
          (this.tileSets = {}),
            (this.rootURL = t),
            (this.fetchOptions = {}),
            (this.preprocessURL = null);
          const e = new i();
          e.unloadPriorityCallback = y;
          const n = new o.Z();
          (n.maxJobs = 4), (n.priorityCallback = w);
          const r = new o.Z();
          (r.maxJobs = 1),
            (r.priorityCallback = w),
            (this.lruCache = e),
            (this.downloadQueue = n),
            (this.parseQueue = r),
            (this.stats = {
              parsing: 0,
              downloading: 0,
              failed: 0,
              inFrustum: 0,
              used: 0,
              active: 0,
              visible: 0,
            }),
            (this.frameCount = 0),
            (this.errorTarget = 6),
            (this.errorThreshold = 1 / 0),
            (this.loadSiblings = !0),
            (this.displayActiveTiles = !1),
            (this.maxDepth = 1 / 0),
            (this.stopAtEmptyTiles = !0);
        }
        traverse(t, e) {
          const n = this.tileSets[this.rootURL];
          n && n.root && d(n.root, t, e);
        }
        update() {
          const t = this.stats,
            e = this.lruCache,
            n = this.tileSets,
            r = n[this.rootURL];
          if (!(this.rootURL in n)) return void this.loadRootTileSet(this.rootURL);
          if (!r || !r.root) return;
          const s = r.root;
          (t.inFrustum = 0),
            (t.used = 0),
            (t.active = 0),
            (t.visible = 0),
            this.frameCount++,
            f(s, this),
            p(s, this),
            g(s, this),
            m(s, this),
            e.scheduleUnload();
        }
        parseTile(t, e, n) {
          return null;
        }
        disposeTile(t) {}
        preprocessNode(t, e, n) {
          t.content &&
            (!('uri' in t.content) &&
              'url' in t.content &&
              ((t.content.uri = t.content.url), delete t.content.url),
            t.content.uri &&
              (t.content.uri = (function (...t) {
                const e = /^[a-zA-Z]+:\/\//;
                let n = -1;
                for (let r = 0, s = t.length; r < s; r++) e.test(t[r]) && (n = r);
                if (-1 === n) return r.join(...t).replace(/\\/g, '/');
                {
                  const s = n <= 0 ? t : t.slice(n),
                    i = s[0].match(e)[0];
                  return (s[0] = s[0].substring(i.length)), (i + r.join(...s)).replace(/\\/g, '/');
                }
              })(n, t.content.uri)),
            t.content.boundingVolume &&
              !(
                'box' in t.content.boundingVolume ||
                'sphere' in t.content.boundingVolume ||
                'region' in t.content.boundingVolume
              ) &&
              delete t.content.boundingVolume),
            (t.parent = e),
            (t.children = t.children || []);
          if (t.content && t.content.uri) {
            const e = s(t.content.uri),
              n = Boolean(e && 'json' === e.toLowerCase());
            (t.__externalTileSet = n), (t.__contentEmpty = n);
          } else (t.__externalTileSet = !1), (t.__contentEmpty = !0);
          (t.__distanceFromCamera = 1 / 0),
            (t.__error = 1 / 0),
            (t.__inFrustum = !1),
            (t.__isLeaf = !1),
            (t.__usedLastFrame = !1),
            (t.__used = !1),
            (t.__wasSetVisible = !1),
            (t.__visible = !1),
            (t.__childrenWereVisible = !1),
            (t.__allChildrenLoaded = !1),
            (t.__wasSetActive = !1),
            (t.__active = !1),
            (t.__loadingState = 0),
            (t.__loadIndex = 0),
            (t.__loadAbort = null),
            (t.__depthFromRenderedParent = -1),
            null === e
              ? ((t.__depth = 0), (t.refine = t.refine || 'REPLACE'))
              : ((t.__depth = e.__depth + 1), (t.refine = t.refine || e.refine));
        }
        setTileActive(t, e) {}
        setTileVisible(t, e) {}
        calculateError(t) {
          return 0;
        }
        tileInView(t) {
          return !0;
        }
        fetchTileSet(t, e, n = null) {
          return fetch(t, e)
            .then((e) => {
              if (e.ok) return e.json();
              throw new Error(
                `TilesRenderer: Failed to load tileset "${t}" with status ${e.status} : ${e.statusText}`,
              );
            })
            .then((e) => {
              const s = e.asset.version;
              console.assert(
                '1.0' === s || '0.0' === s,
                'asset.version is expected to be a string of "1.0" or "0.0"',
              );
              const i = r.dirname(t);
              return (
                d(e.root, (t, e) => this.preprocessNode(t, e, i), null, n, n ? n.__depth : 0), e
              );
            });
        }
        loadRootTileSet(t) {
          const e = this.tileSets;
          if (t in e) return e[t] instanceof Error ? Promise.reject(e[t]) : Promise.resolve(e[t]);
          {
            const n = this.fetchTileSet(
              this.preprocessURL ? this.preprocessURL(t) : t,
              this.fetchOptions,
            ).then((n) => {
              e[t] = n;
            });
            return (
              n.catch((n) => {
                console.error(n), (e[t] = n);
              }),
              (e[t] = n),
              n
            );
          }
        }
        requestTileContents(t) {
          if (0 !== t.__loadingState) return;
          const e = this.stats,
            n = this.lruCache,
            r = this.downloadQueue,
            i = this.parseQueue,
            o = t.__externalTileSet;
          n.add(t, (t) => {
            1 === t.__loadingState
              ? (t.__loadAbort.abort(), (t.__loadAbort = null))
              : o
                ? (t.children.length = 0)
                : this.disposeTile(t),
              1 === t.__loadingState ? e.downloading-- : 2 === t.__loadingState && e.parsing--,
              (t.__loadingState = 0),
              t.__loadIndex++,
              i.remove(t),
              r.remove(t);
          }),
            t.__loadIndex++;
          const a = t.__loadIndex,
            c = new AbortController(),
            l = c.signal;
          e.downloading++, (t.__loadAbort = c), (t.__loadingState = 1);
          const u = (s) => {
            t.__loadIndex === a &&
              ('AbortError' !== s.name
                ? (i.remove(t),
                  r.remove(t),
                  2 === t.__loadingState ? e.parsing-- : 1 === t.__loadingState && e.downloading--,
                  e.failed++,
                  console.error(`TilesRenderer : Failed to load tile at url "${t.content.uri}".`),
                  console.error(s),
                  (t.__loadingState = 4))
                : n.remove(t));
          };
          o
            ? r
                .add(t, (t) => {
                  if (t.__loadIndex !== a) return Promise.resolve();
                  const e = this.preprocessURL ? this.preprocessURL(t.content.uri) : t.content.uri;
                  return this.fetchTileSet(e, Object.assign({ signal: l }, this.fetchOptions), t);
                })
                .then((n) => {
                  t.__loadIndex === a &&
                    (e.downloading--,
                    (t.__loadAbort = null),
                    (t.__loadingState = 3),
                    t.children.push(n.root));
                })
                .catch(u)
            : r
                .add(t, (t) => {
                  if (t.__loadIndex !== a) return Promise.resolve();
                  const e = this.preprocessURL ? this.preprocessURL(t.content.uri) : t.content.uri;
                  return fetch(e, Object.assign({ signal: l }, this.fetchOptions));
                })
                .then((e) => {
                  if (t.__loadIndex === a) {
                    if (e.ok) return e.arrayBuffer();
                    throw new Error(`Failed to load model with error code ${e.status}`);
                  }
                })
                .then((n) => {
                  if (t.__loadIndex === a)
                    return (
                      e.downloading--,
                      e.parsing++,
                      (t.__loadAbort = null),
                      (t.__loadingState = 2),
                      i.add(t, (t) => {
                        if (t.__loadIndex !== a) return Promise.resolve();
                        const e = s(t.content.uri);
                        return this.parseTile(n, t, e);
                      })
                    );
                })
                .then(() => {
                  t.__loadIndex === a &&
                    (e.parsing--,
                    (t.__loadingState = 3),
                    t.__wasSetVisible && this.setTileVisible(t, !0),
                    t.__wasSetActive && this.setTileActive(t, !0));
                })
                .catch(u);
        }
        dispose() {
          const t = this.lruCache;
          this.traverse((e) => {
            t.remove(e);
          });
        }
      } {
        get autoDisableRendererCulling() {
          return this._autoDisableRendererCulling;
        }
        set autoDisableRendererCulling(t) {
          this._autoDisableRendererCulling !== t &&
            ((super._autoDisableRendererCulling = t),
            this.forEachLoadedModel((e) => {
              ct(e, !t);
            }));
        }
        constructor(...t) {
          super(...t),
            (this.group = new H(this)),
            (this.cameras = []),
            (this.cameraMap = new Map()),
            (this.cameraInfo = []),
            (this.activeTiles = new Set()),
            (this.visibleTiles = new Set()),
            (this._autoDisableRendererCulling = !0),
            (this.optimizeRaycast = !0),
            (this.onLoadTileSet = null),
            (this.onLoadModel = null),
            (this.onDisposeModel = null),
            (this.onTileVisibilityChange = null);
          const e = new S.LoadingManager();
          e.setURLModifier((t) => (this.preprocessURL ? this.preprocessURL(t) : t)),
            (this.manager = e);
          const n = this;
          this._overridenRaycast = function (t, e) {
            n.optimizeRaycast || Object.getPrototypeOf(this).raycast.call(this, t, e);
          };
        }
        getBounds(t) {
          if (!this.root) return !1;
          const e = this.root.cached,
            n = e.box,
            r = e.boxTransform;
          return !!n && (t.copy(n), t.applyMatrix4(r), !0);
        }
        getOrientedBounds(t, e) {
          if (!this.root) return !1;
          const n = this.root.cached,
            r = n.box,
            s = n.boxTransform;
          return !!r && (t.copy(r), e.copy(s), !0);
        }
        getBoundingSphere(t) {
          if (!this.root) return !1;
          const e = this.root.cached.sphere;
          return !!e && (t.copy(e), !0);
        }
        forEachLoadedModel(t) {
          this.traverse((e) => {
            const n = e.cached.scene;
            n && t(n, e);
          });
        }
        raycast(t, e) {
          if (this.root)
            if (t.firstHitOnly) {
              const n = X(this.root, this.group, this.activeTiles, t);
              n && e.push(n);
            } else Y(this.root, this.group, this.activeTiles, t, e);
        }
        hasCamera(t) {
          return this.cameraMap.has(t);
        }
        setCamera(t) {
          const e = this.cameras,
            n = this.cameraMap;
          return !n.has(t) && (n.set(t, new S.Vector2()), e.push(t), !0);
        }
        setResolution(t, e, n) {
          const r = this.cameraMap;
          return !!r.has(t) && (e instanceof S.Vector2 ? r.get(t).copy(e) : r.get(t).set(e, n), !0);
        }
        setResolutionFromRenderer(t, e) {
          const n = this.cameraMap;
          if (!n.has(t)) return !1;
          const r = n.get(t);
          return e.getSize(r), r.multiplyScalar(e.getPixelRatio()), !0;
        }
        deleteCamera(t) {
          const e = this.cameras,
            n = this.cameraMap;
          if (n.has(t)) {
            const r = e.indexOf(t);
            return e.splice(r, 1), n.delete(t), !0;
          }
          return !1;
        }
        fetchTileSet(t, ...e) {
          const n = super.fetchTileSet(t, ...e);
          return (
            n.then((e) => {
              this.onLoadTileSet &&
                Promise.resolve().then(() => {
                  this.onLoadTileSet(e, t);
                });
            }),
            n
          );
        }
        update() {
          const t = this.group,
            e = this.cameras,
            n = this.cameraMap,
            r = this.cameraInfo;
          if (0 === e.length)
            return void console.warn('TilesRenderer: no cameras defined. Cannot update 3d tiles.');
          for (; r.length > e.length; ) r.pop();
          for (; r.length < e.length; )
            r.push({
              frustum: new S.Frustum(),
              isOrthographic: !1,
              sseDenominator: -1,
              position: new S.Vector3(),
              invScale: -1,
              pixelSize: 0,
            });
          let s;
          et.copy(t.matrixWorld).invert(),
            nt.setFromMatrixScale(et),
            (s = nt.x),
            Math.abs(Math.max(nt.x - nt.y, nt.x - nt.z)) > 1e-6 &&
              console.warn(
                'ThreeTilesRenderer : Non uniform scale used for tile which may cause issues when calculating screen space error.',
              );
          for (let i = 0, o = r.length; i < o; i++) {
            const o = e[i],
              a = r[i],
              c = a.frustum,
              l = a.position,
              u = n.get(o);
            (0 !== u.width && 0 !== u.height) ||
              console.warn('TilesRenderer: resolution for camera error calculation is not set.');
            const h = o.projectionMatrix.elements;
            if (((a.isOrthographic = 1 === h[15]), a.isOrthographic)) {
              const t = 2 / h[0],
                e = 2 / h[5];
              a.pixelSize = Math.max(e / u.height, t / u.width);
            } else a.sseDenominator = 2 / h[5] / u.height;
            (a.invScale = s),
              tt.copy(t.matrixWorld),
              tt.premultiply(o.matrixWorldInverse),
              tt.premultiply(o.projectionMatrix),
              c.setFromProjectionMatrix(tt),
              l.set(0, 0, 0),
              l.applyMatrix4(o.matrixWorld),
              l.applyMatrix4(et);
          }
          super.update();
        }
        preprocessNode(t, e, n) {
          super.preprocessNode(t, e, n);
          const r = new S.Matrix4();
          if (t.transform) {
            const e = t.transform;
            for (let t = 0; t < 16; t++) r.elements[t] = e[t];
          } else r.identity();
          e && r.premultiply(e.cached.transform);
          const s = new S.Matrix4().copy(r).invert();
          let i = null,
            o = null,
            a = null;
          if ('box' in t.boundingVolume) {
            const e = t.boundingVolume.box;
            (i = new S.Box3()),
              (o = new S.Matrix4()),
              (a = new S.Matrix4()),
              rt.set(e[3], e[4], e[5]),
              st.set(e[6], e[7], e[8]),
              it.set(e[9], e[10], e[11]);
            const n = rt.length(),
              s = st.length(),
              c = it.length();
            rt.normalize(),
              st.normalize(),
              it.normalize(),
              0 === n && rt.crossVectors(st, it),
              0 === s && st.crossVectors(rt, it),
              0 === c && it.crossVectors(rt, st),
              o.set(
                rt.x,
                st.x,
                it.x,
                e[0],
                rt.y,
                st.y,
                it.y,
                e[1],
                rt.z,
                st.z,
                it.z,
                e[2],
                0,
                0,
                0,
                1,
              ),
              o.premultiply(r),
              a.copy(o).invert(),
              i.min.set(-n, -s, -c),
              i.max.set(n, s, c);
          }
          let c = null;
          if ('sphere' in t.boundingVolume) {
            const e = t.boundingVolume.sphere;
            (c = new S.Sphere()),
              c.center.set(e[0], e[1], e[2]),
              (c.radius = e[3]),
              c.applyMatrix4(r);
          } else if ('box' in t.boundingVolume) {
            const e = t.boundingVolume.box;
            (c = new S.Sphere()),
              i.getBoundingSphere(c),
              c.center.set(e[0], e[1], e[2]),
              c.applyMatrix4(r);
          }
          'region' in t.boundingVolume &&
            console.warn('ThreeTilesRenderer: region bounding volume not supported.'),
            (t.cached = {
              loadIndex: 0,
              transform: r,
              transformInverse: s,
              active: !1,
              inFrustum: [],
              box: i,
              boxTransform: o,
              boxTransformInverse: a,
              sphere: c,
              region: null,
              scene: null,
              geometry: null,
              material: null,
            });
        }
        parseTile(t, e, n) {
          (e._loadIndex = e._loadIndex || 0), e._loadIndex++;
          const r = e.content.uri.split(/[\\\/]/g);
          r.pop();
          const s = r.join('/'),
            i = this.fetchOptions,
            o = this.manager,
            a = e._loadIndex;
          let c = null;
          switch (n) {
            case 'b3dm': {
              const e = new A(o);
              (e.workingPath = s), (e.fetchOptions = i), (c = e.parse(t).then((t) => t.scene));
              break;
            }
            case 'pnts': {
              const e = new C(o);
              (e.workingPath = s), (e.fetchOptions = i), (c = e.parse(t).then((t) => t.scene));
              break;
            }
            case 'i3dm': {
              const e = new O(o);
              (e.workingPath = s), (e.fetchOptions = i), (c = e.parse(t).then((t) => t.scene));
              break;
            }
            case 'cmpt': {
              const e = new D(o);
              (e.workingPath = s), (e.fetchOptions = i), (c = e.parse(t).then((t) => t.scene));
              break;
            }
            case 'gltf':
            case 'glb':
              const e = new N(o);
              (e.workingPath = s), (e.fetchOptions = i), (c = e.parse(t).then((t) => t.scene));
              break;
            default:
              console.warn(`TilesRenderer: Content type "${n}" not supported.`),
                (c = Promise.resolve(null));
          }
          return c.then((t) => {
            if (e._loadIndex !== a) return;
            const r = (this.rootTileSet.asset && this.rootTileSet.asset.gltfUpAxis) || 'y',
              s = e.cached,
              i = s.transform;
            switch (r.toLowerCase()) {
              case 'x':
                tt.makeRotationAxis(at, -Math.PI / 2);
                break;
              case 'y':
                tt.makeRotationAxis(ot, Math.PI / 2);
                break;
              case 'z':
                tt.identity();
            }
            t.updateMatrix(),
              'pnts' !== n && t.matrix.multiply(tt),
              t.matrix.premultiply(i),
              t.matrix.decompose(t.position, t.quaternion, t.scale),
              t.traverse((t) => {
                t[K] = t.frustumCulled;
              }),
              ct(t, !this.autoDisableRendererCulling),
              (s.scene = t),
              t.traverse((t) => {
                t.raycast = this._overridenRaycast;
              });
            const o = [],
              c = [],
              l = [];
            t.traverse((t) => {
              if ((t.geometry && c.push(t.geometry), t.material)) {
                const e = t.material;
                o.push(t.material);
                for (const t in e) {
                  const n = e[t];
                  n && n.isTexture && l.push(n);
                }
              }
            }),
              (s.materials = o),
              (s.geometry = c),
              (s.textures = l),
              this.onLoadModel && this.onLoadModel(t, e);
          });
        }
        disposeTile(t) {
          const e = t.cached;
          if (e.scene) {
            const n = e.materials,
              r = e.geometry,
              s = e.textures;
            for (let t = 0, e = r.length; t < e; t++) r[t].dispose();
            for (let t = 0, e = n.length; t < e; t++) n[t].dispose();
            for (let t = 0, e = s.length; t < e; t++) {
              s[t].dispose();
            }
            this.onDisposeModel && this.onDisposeModel(e.scene, t),
              (e.scene = null),
              (e.materials = null),
              (e.textures = null),
              (e.geometry = null);
          }
          t._loadIndex++;
        }
        setTileVisible(t, e) {
          const n = t.cached.scene,
            r = this.visibleTiles,
            s = this.group;
          e ? (s.add(n), r.add(t), n.updateMatrixWorld(!0)) : (s.remove(n), r.delete(t)),
            this.onTileVisibilityChange && this.onTileVisibilityChange(n, t, e);
        }
        setTileActive(t, e) {
          const n = this.activeTiles;
          e ? n.add(t) : n.delete(t);
        }
        calculateError(t) {
          const e = t.cached,
            n = e.inFrustum,
            r = this.cameras,
            s = this.cameraInfo,
            i = t.boundingVolume;
          if ('box' in i || 'sphere' in i) {
            const i = e.sphere,
              o = e.box,
              a = e.boxTransformInverse,
              c = e.transformInverse,
              l = o && a;
            let u = -1 / 0,
              h = 1 / 0;
            for (let e = 0, d = r.length; e < d; e++) {
              if (!n[e]) continue;
              const r = s[e],
                d = r.invScale;
              let f;
              if (r.isOrthographic) {
                const e = r.pixelSize;
                f = t.geometricError / (e * d);
              } else {
                let e;
                nt.copy(r.position),
                  l
                    ? (nt.applyMatrix4(a), (e = o.distanceToPoint(nt)))
                    : (nt.applyMatrix4(c), (e = Math.max(i.distanceToPoint(nt), 0)));
                const n = e * d,
                  s = r.sseDenominator;
                (f = t.geometricError / (n * s)), (h = Math.min(h, n));
              }
              u = Math.max(u, f);
            }
            (t.__distanceFromCamera = h), (t.__error = u);
          } else 'region' in i && console.warn('ThreeTilesRenderer : Region bounds not supported.');
        }
        tileInView(t) {
          const e = t.cached,
            n = e.sphere,
            r = e.inFrustum;
          if (n) {
            const t = this.cameraInfo;
            let e = !1;
            for (let s = 0, i = t.length; s < i; s++) {
              t[s].frustum.intersectsSphere(n) ? ((e = !0), (r[s] = !0)) : (r[s] = !1);
            }
            return e;
          }
          return !0;
        }
      }
    },
    17099: (t, e, n) => {
      n.d(e, { Z: () => r });
      class r {
        constructor() {
          (this.maxJobs = 6),
            (this.items = []),
            (this.callbacks = new Map()),
            (this.currJobs = 0),
            (this.scheduled = !1),
            (this.autoUpdate = !0),
            (this.priorityCallback = () => {
              throw new Error('PriorityQueue: PriorityCallback function not defined.');
            }),
            (this.schedulingCallback = (t) => {
              requestAnimationFrame(t);
            }),
            (this._runjobs = () => {
              this.tryRunJobs(), (this.scheduled = !1);
            });
        }
        sort() {
          const t = this.priorityCallback;
          this.items.sort(t);
        }
        add(t, e) {
          return new Promise((n, r) => {
            const s = this.items,
              i = this.callbacks;
            s.push(t),
              i.set(t, (...t) =>
                e(...t)
                  .then(n)
                  .catch(r),
              ),
              this.autoUpdate && this.scheduleJobRun();
          });
        }
        remove(t) {
          const e = this.items,
            n = this.callbacks,
            r = e.indexOf(t);
          -1 !== r && (e.splice(r, 1), n.delete(t));
        }
        tryRunJobs() {
          this.sort();
          const t = this.items,
            e = this.callbacks,
            n = this.maxJobs;
          let r = this.currJobs;
          for (; n > r && t.length > 0; ) {
            r++;
            const n = t.pop(),
              s = e.get(n);
            e.delete(n),
              s(n)
                .then(() => {
                  this.currJobs--, this.autoUpdate && this.scheduleJobRun();
                })
                .catch(() => {
                  this.currJobs--, this.autoUpdate && this.scheduleJobRun();
                });
          }
          this.currJobs = r;
        }
        scheduleJobRun() {
          this.scheduled || (this.schedulingCallback(this._runjobs), (this.scheduled = !0));
        }
      }
    },
    27896: (t, e, n) => {
      n.d(e, { r: () => lt });
      var r = n(81396);
      const s = 1.25,
        i = 65535,
        o = Math.pow(2, -24);
      class a {
        constructor() {}
      }
      function c(t, e, n) {
        return (
          (n.min.x = e[t]),
          (n.min.y = e[t + 1]),
          (n.min.z = e[t + 2]),
          (n.max.x = e[t + 3]),
          (n.max.y = e[t + 4]),
          (n.max.z = e[t + 5]),
          n
        );
      }
      function l(t) {
        let e = -1,
          n = -1 / 0;
        for (let r = 0; r < 3; r++) {
          const s = t[r + 3] - t[r];
          s > n && ((n = s), (e = r));
        }
        return e;
      }
      function u(t, e) {
        e.set(t);
      }
      function h(t, e, n) {
        let r, s;
        for (let i = 0; i < 3; i++) {
          const o = i + 3;
          (r = t[i]),
            (s = e[i]),
            (n[i] = r < s ? r : s),
            (r = t[o]),
            (s = e[o]),
            (n[o] = r > s ? r : s);
        }
      }
      function d(t, e, n) {
        for (let r = 0; r < 3; r++) {
          const s = e[t + 2 * r],
            i = e[t + 2 * r + 1],
            o = s - i,
            a = s + i;
          o < n[r] && (n[r] = o), a > n[r + 3] && (n[r + 3] = a);
        }
      }
      function f(t) {
        const e = t[3] - t[0],
          n = t[4] - t[1],
          r = t[5] - t[2];
        return 2 * (e * n + n * r + r * e);
      }
      function p(t, e, n, r, s = null) {
        let i = 1 / 0,
          o = 1 / 0,
          a = 1 / 0,
          c = -1 / 0,
          l = -1 / 0,
          u = -1 / 0,
          h = 1 / 0,
          d = 1 / 0,
          f = 1 / 0,
          p = -1 / 0,
          g = -1 / 0,
          m = -1 / 0;
        const w = null !== s;
        for (let r = 6 * e, s = 6 * (e + n); r < s; r += 6) {
          const e = t[r + 0],
            n = t[r + 1],
            s = e - n,
            y = e + n;
          s < i && (i = s), y > c && (c = y), w && e < h && (h = e), w && e > p && (p = e);
          const x = t[r + 2],
            b = t[r + 3],
            _ = x - b,
            T = x + b;
          _ < o && (o = _), T > l && (l = T), w && x < d && (d = x), w && x > g && (g = x);
          const v = t[r + 4],
            S = t[r + 5],
            P = v - S,
            A = v + S;
          P < a && (a = P), A > u && (u = A), w && v < f && (f = v), w && v > m && (m = v);
        }
        (r[0] = i),
          (r[1] = o),
          (r[2] = a),
          (r[3] = c),
          (r[4] = l),
          (r[5] = u),
          w && ((s[0] = h), (s[1] = d), (s[2] = f), (s[3] = p), (s[4] = g), (s[5] = m));
      }
      const g = 32,
        m = (t, e) => t.candidate - e.candidate,
        w = new Array(g)
          .fill()
          .map(() => ({
            count: 0,
            bounds: new Float32Array(6),
            rightCacheBounds: new Float32Array(6),
            leftCacheBounds: new Float32Array(6),
            candidate: 0,
          })),
        y = new Float32Array(6);
      function x(t, e) {
        function n(t) {
          A && A(t / F);
        }
        function i(e, r, o, c = null, A = 0) {
          if (
            (!C &&
              A >= T &&
              ((C = !0),
              v &&
                (console.warn(
                  `MeshBVH: Max depth of ${T} reached when generating BVH. Consider increasing maxDepth.`,
                ),
                console.warn(t))),
            o <= S || A >= T)
          )
            return n(r + o), (e.offset = r), (e.count = o), e;
          const F = (function (t, e, n, r, i, o) {
            let a = -1,
              c = 0;
            if (0 === o) (a = l(e)), -1 !== a && (c = (e[a] + e[a + 3]) / 2);
            else if (1 === o)
              (a = l(t)),
                -1 !== a &&
                  (c = (function (t, e, n, r) {
                    let s = 0;
                    for (let i = e, o = e + n; i < o; i++) s += t[6 * i + 2 * r];
                    return s / n;
                  })(n, r, i, a));
            else if (2 === o) {
              const o = f(t);
              let l = s * i;
              const p = 6 * r,
                x = 6 * (r + i);
              for (let t = 0; t < 3; t++) {
                const r = e[t],
                  b = (e[t + 3] - r) / g;
                if (i < 8) {
                  const e = [...w];
                  e.length = i;
                  let r = 0;
                  for (let s = p; s < x; s += 6, r++) {
                    const i = e[r];
                    (i.candidate = n[s + 2 * t]), (i.count = 0);
                    const { bounds: o, leftCacheBounds: a, rightCacheBounds: c } = i;
                    for (let t = 0; t < 3; t++)
                      (c[t] = 1 / 0),
                        (c[t + 3] = -1 / 0),
                        (a[t] = 1 / 0),
                        (a[t + 3] = -1 / 0),
                        (o[t] = 1 / 0),
                        (o[t + 3] = -1 / 0);
                    d(s, n, o);
                  }
                  e.sort(m);
                  let u = i;
                  for (let t = 0; t < u; t++) {
                    const n = e[t];
                    for (; t + 1 < u && e[t + 1].candidate === n.candidate; )
                      e.splice(t + 1, 1), u--;
                  }
                  for (let r = p; r < x; r += 6) {
                    const s = n[r + 2 * t];
                    for (let t = 0; t < u; t++) {
                      const i = e[t];
                      s >= i.candidate
                        ? d(r, n, i.rightCacheBounds)
                        : (d(r, n, i.leftCacheBounds), i.count++);
                    }
                  }
                  for (let n = 0; n < u; n++) {
                    const r = e[n],
                      u = r.count,
                      h = i - r.count,
                      d = r.leftCacheBounds,
                      p = r.rightCacheBounds;
                    let g = 0;
                    0 !== u && (g = f(d) / o);
                    let m = 0;
                    0 !== h && (m = f(p) / o);
                    const w = 1 + s * (g * u + m * h);
                    w < l && ((a = t), (l = w), (c = r.candidate));
                  }
                } else {
                  for (let t = 0; t < g; t++) {
                    const e = w[t];
                    (e.count = 0), (e.candidate = r + b + t * b);
                    const n = e.bounds;
                    for (let t = 0; t < 3; t++) (n[t] = 1 / 0), (n[t + 3] = -1 / 0);
                  }
                  for (let e = p; e < x; e += 6) {
                    let s = ~~((n[e + 2 * t] - r) / b);
                    s >= g && (s = 31);
                    const i = w[s];
                    i.count++, d(e, n, i.bounds);
                  }
                  const e = w[31];
                  u(e.bounds, e.rightCacheBounds);
                  for (let t = 30; t >= 0; t--) {
                    const e = w[t],
                      n = w[t + 1];
                    h(e.bounds, n.rightCacheBounds, e.rightCacheBounds);
                  }
                  let m = 0;
                  for (let e = 0; e < 31; e++) {
                    const n = w[e],
                      r = n.count,
                      d = n.bounds,
                      p = w[e + 1].rightCacheBounds;
                    0 !== r && (0 === m ? u(d, y) : h(d, y, y)), (m += r);
                    let g = 0,
                      x = 0;
                    0 !== m && (g = f(y) / o);
                    const b = i - m;
                    0 !== b && (x = f(p) / o);
                    const _ = 1 + s * (g * m + x * b);
                    _ < l && ((a = t), (l = _), (c = n.candidate));
                  }
                }
              }
            } else console.warn(`MeshBVH: Invalid build strategy value ${o} used.`);
            return { axis: a, pos: c };
          })(e.boundingData, c, b, r, o, P);
          if (-1 === F.axis) return n(r + o), (e.offset = r), (e.count = o), e;
          const M = (function (t, e, n, r, s) {
            let i = n,
              o = n + r - 1;
            const a = s.pos,
              c = 2 * s.axis;
            for (;;) {
              for (; i <= o && e[6 * i + c] < a; ) i++;
              for (; i <= o && e[6 * o + c] >= a; ) o--;
              if (!(i < o)) return i;
              for (let n = 0; n < 3; n++) {
                let r = t[3 * i + n];
                (t[3 * i + n] = t[3 * o + n]), (t[3 * o + n] = r);
                let s = e[6 * i + 2 * n + 0];
                (e[6 * i + 2 * n + 0] = e[6 * o + 2 * n + 0]), (e[6 * o + 2 * n + 0] = s);
                let a = e[6 * i + 2 * n + 1];
                (e[6 * i + 2 * n + 1] = e[6 * o + 2 * n + 1]), (e[6 * o + 2 * n + 1] = a);
              }
              i++, o--;
            }
          })(_, b, r, o, F);
          if (M === r || M === r + o) n(r + o), (e.offset = r), (e.count = o);
          else {
            e.splitAxis = F.axis;
            const t = new a(),
              n = r,
              s = M - r;
            (e.left = t),
              (t.boundingData = new Float32Array(6)),
              p(b, n, s, t.boundingData, x),
              i(t, n, s, x, A + 1);
            const c = new a(),
              l = M,
              u = o - s;
            (e.right = c),
              (c.boundingData = new Float32Array(6)),
              p(b, l, u, c.boundingData, x),
              i(c, l, u, x, A + 1);
          }
          return e;
        }
        !(function (t, e) {
          if (!t.index) {
            const n = t.attributes.position.count,
              s = e.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer;
            let i;
            (i = n > 65535 ? new Uint32Array(new s(4 * n)) : new Uint16Array(new s(2 * n))),
              t.setIndex(new r.BufferAttribute(i, 1));
            for (let t = 0; t < n; t++) i[t] = t;
          }
        })(t, e);
        const c = new Float32Array(6),
          x = new Float32Array(6),
          b = (function (t, e) {
            const n = t.attributes.position,
              r = n.array,
              s = t.index.array,
              i = s.length / 3,
              a = new Float32Array(6 * i),
              c = n.offset || 0;
            let l = 3;
            n.isInterleavedBufferAttribute && (l = n.data.stride);
            for (let t = 0; t < i; t++) {
              const n = 3 * t,
                i = 6 * t,
                u = s[n + 0] * l + c,
                h = s[n + 1] * l + c,
                d = s[n + 2] * l + c;
              for (let t = 0; t < 3; t++) {
                const n = r[u + t],
                  s = r[h + t],
                  c = r[d + t];
                let l = n;
                s < l && (l = s), c < l && (l = c);
                let f = n;
                s > f && (f = s), c > f && (f = c);
                const p = (f - l) / 2,
                  g = 2 * t;
                (a[i + g + 0] = l + p),
                  (a[i + g + 1] = p + (Math.abs(l) + p) * o),
                  l < e[t] && (e[t] = l),
                  f > e[t + 3] && (e[t + 3] = f);
              }
            }
            return a;
          })(t, c),
          _ = t.index.array,
          T = e.maxDepth,
          v = e.verbose,
          S = e.maxLeafTris,
          P = e.strategy,
          A = e.onProgress,
          F = t.index.count / 3;
        let C = !1;
        const M = [],
          V = (function (t) {
            if (!t.groups || !t.groups.length) return [{ offset: 0, count: t.index.count / 3 }];
            const e = [],
              n = new Set();
            for (const e of t.groups) n.add(e.start), n.add(e.start + e.count);
            const r = Array.from(n.values()).sort((t, e) => t - e);
            for (let t = 0; t < r.length - 1; t++) {
              const n = r[t],
                s = r[t + 1];
              e.push({ offset: n / 3, count: (s - n) / 3 });
            }
            return e;
          })(t);
        if (1 === V.length) {
          const t = V[0],
            e = new a();
          (e.boundingData = c),
            (function (t, e, n, r) {
              let s = 1 / 0,
                i = 1 / 0,
                o = 1 / 0,
                a = -1 / 0,
                c = -1 / 0,
                l = -1 / 0;
              for (let r = 6 * e, u = 6 * (e + n); r < u; r += 6) {
                const e = t[r + 0];
                e < s && (s = e), e > a && (a = e);
                const n = t[r + 2];
                n < i && (i = n), n > c && (c = n);
                const u = t[r + 4];
                u < o && (o = u), u > l && (l = u);
              }
              (r[0] = s), (r[1] = i), (r[2] = o), (r[3] = a), (r[4] = c), (r[5] = l);
            })(b, t.offset, t.count, x),
            i(e, t.offset, t.count, x),
            M.push(e);
        } else
          for (let t of V) {
            const e = new a();
            (e.boundingData = new Float32Array(6)),
              p(b, t.offset, t.count, e.boundingData, x),
              i(e, t.offset, t.count, x),
              M.push(e);
          }
        return M;
      }
      class b {
        constructor() {
          (this.min = 1 / 0), (this.max = -1 / 0);
        }
        setFromPointsField(t, e) {
          let n = 1 / 0,
            r = -1 / 0;
          for (let s = 0, i = t.length; s < i; s++) {
            const i = t[s][e];
            (n = i < n ? i : n), (r = i > r ? i : r);
          }
          (this.min = n), (this.max = r);
        }
        setFromPoints(t, e) {
          let n = 1 / 0,
            r = -1 / 0;
          for (let s = 0, i = e.length; s < i; s++) {
            const i = e[s],
              o = t.dot(i);
            (n = o < n ? o : n), (r = o > r ? o : r);
          }
          (this.min = n), (this.max = r);
        }
        isSeparated(t) {
          return this.min > t.max || t.min > this.max;
        }
      }
      b.prototype.setFromBox = (function () {
        const t = new r.Vector3();
        return function (e, n) {
          const r = n.min,
            s = n.max;
          let i = 1 / 0,
            o = -1 / 0;
          for (let n = 0; n <= 1; n++)
            for (let a = 0; a <= 1; a++)
              for (let c = 0; c <= 1; c++) {
                (t.x = r.x * n + s.x * (1 - n)),
                  (t.y = r.y * a + s.y * (1 - a)),
                  (t.z = r.z * c + s.z * (1 - c));
                const l = e.dot(t);
                (i = Math.min(l, i)), (o = Math.max(l, o));
              }
          (this.min = i), (this.max = o);
        };
      })();
      !(function () {
        const t = new b();
      })();
      const _ = (function () {
          const t = new r.Vector3(),
            e = new r.Vector3(),
            n = new r.Vector3();
          return function (r, s, i) {
            const o = r.start,
              a = t,
              c = s.start,
              l = e;
            n.subVectors(o, c), t.subVectors(r.end, s.start), e.subVectors(s.end, s.start);
            const u = n.dot(l),
              h = l.dot(a),
              d = l.dot(l),
              f = n.dot(a),
              p = a.dot(a) * d - h * h;
            let g, m;
            (g = 0 !== p ? (u * h - f * d) / p : 0), (m = (u + g * h) / d), (i.x = g), (i.y = m);
          };
        })(),
        T = (function () {
          const t = new r.Vector2(),
            e = new r.Vector3(),
            n = new r.Vector3();
          return function (r, s, i, o) {
            _(r, s, t);
            let a = t.x,
              c = t.y;
            if (a >= 0 && a <= 1 && c >= 0 && c <= 1) return r.at(a, i), void s.at(c, o);
            if (a >= 0 && a <= 1)
              return c < 0 ? s.at(0, o) : s.at(1, o), void r.closestPointToPoint(o, !0, i);
            if (c >= 0 && c <= 1)
              return a < 0 ? r.at(0, i) : r.at(1, i), void s.closestPointToPoint(i, !0, o);
            {
              let t, l;
              (t = a < 0 ? r.start : r.end), (l = c < 0 ? s.start : s.end);
              const u = e,
                h = n;
              return (
                r.closestPointToPoint(l, !0, e),
                s.closestPointToPoint(t, !0, n),
                u.distanceToSquared(l) <= h.distanceToSquared(t)
                  ? (i.copy(u), void o.copy(l))
                  : (i.copy(t), void o.copy(h))
              );
            }
          };
        })(),
        v = (function () {
          const t = new r.Vector3(),
            e = new r.Vector3(),
            n = new r.Plane(),
            s = new r.Line3();
          return function (r, i) {
            const { radius: o, center: a } = r,
              { a: c, b: l, c: u } = i;
            (s.start = c), (s.end = l);
            if (s.closestPointToPoint(a, !0, t).distanceTo(a) <= o) return !0;
            (s.start = c), (s.end = u);
            if (s.closestPointToPoint(a, !0, t).distanceTo(a) <= o) return !0;
            (s.start = l), (s.end = u);
            if (s.closestPointToPoint(a, !0, t).distanceTo(a) <= o) return !0;
            const h = i.getPlane(n);
            if (Math.abs(h.distanceToPoint(a)) <= o) {
              const t = h.projectPoint(a, e);
              if (i.containsPoint(t)) return !0;
            }
            return !1;
          };
        })();
      class S extends r.Triangle {
        constructor(...t) {
          super(...t),
            (this.isExtendedTriangle = !0),
            (this.satAxes = new Array(4).fill().map(() => new r.Vector3())),
            (this.satBounds = new Array(4).fill().map(() => new b())),
            (this.points = [this.a, this.b, this.c]),
            (this.sphere = new r.Sphere()),
            (this.plane = new r.Plane()),
            (this.needsUpdate = !1);
        }
        intersectsSphere(t) {
          return v(t, this);
        }
        update() {
          const t = this.a,
            e = this.b,
            n = this.c,
            r = this.points,
            s = this.satAxes,
            i = this.satBounds,
            o = s[0],
            a = i[0];
          this.getNormal(o), a.setFromPoints(o, r);
          const c = s[1],
            l = i[1];
          c.subVectors(t, e), l.setFromPoints(c, r);
          const u = s[2],
            h = i[2];
          u.subVectors(e, n), h.setFromPoints(u, r);
          const d = s[3],
            f = i[3];
          d.subVectors(n, t),
            f.setFromPoints(d, r),
            this.sphere.setFromPoints(this.points),
            this.plane.setFromNormalAndCoplanarPoint(o, t),
            (this.needsUpdate = !1);
        }
      }
      (S.prototype.closestPointToSegment = (function () {
        const t = new r.Vector3(),
          e = new r.Vector3(),
          n = new r.Line3();
        return function (r, s = null, i = null) {
          const { start: o, end: a } = r,
            c = this.points;
          let l,
            u = 1 / 0;
          for (let o = 0; o < 3; o++) {
            const a = (o + 1) % 3;
            n.start.copy(c[o]),
              n.end.copy(c[a]),
              T(n, r, t, e),
              (l = t.distanceToSquared(e)),
              l < u && ((u = l), s && s.copy(t), i && i.copy(e));
          }
          return (
            this.closestPointToPoint(o, t),
            (l = o.distanceToSquared(t)),
            l < u && ((u = l), s && s.copy(t), i && i.copy(o)),
            this.closestPointToPoint(a, t),
            (l = a.distanceToSquared(t)),
            l < u && ((u = l), s && s.copy(t), i && i.copy(a)),
            Math.sqrt(u)
          );
        };
      })()),
        (S.prototype.intersectsTriangle = (function () {
          const t = new S(),
            e = new Array(3),
            n = new Array(3),
            s = new b(),
            i = new b(),
            o = new r.Vector3(),
            a = new r.Vector3(),
            c = new r.Vector3(),
            l = new r.Vector3(),
            u = new r.Line3(),
            h = new r.Line3(),
            d = new r.Line3();
          return function (r, f = null) {
            this.needsUpdate && this.update(),
              r.isExtendedTriangle ? r.needsUpdate && r.update() : (t.copy(r), t.update(), (r = t));
            const p = this.plane,
              g = r.plane;
            if (Math.abs(p.normal.dot(g.normal)) > 1 - 1e-10) {
              const t = this.satBounds,
                a = this.satAxes;
              (n[0] = r.a), (n[1] = r.b), (n[2] = r.c);
              for (let e = 0; e < 4; e++) {
                const r = t[e],
                  i = a[e];
                if ((s.setFromPoints(i, n), r.isSeparated(s))) return !1;
              }
              const c = r.satBounds,
                l = r.satAxes;
              (e[0] = this.a), (e[1] = this.b), (e[2] = this.c);
              for (let t = 0; t < 4; t++) {
                const n = c[t],
                  r = l[t];
                if ((s.setFromPoints(r, e), n.isSeparated(s))) return !1;
              }
              for (let t = 0; t < 4; t++) {
                const r = a[t];
                for (let t = 0; t < 4; t++) {
                  const a = l[t];
                  if (
                    (o.crossVectors(r, a),
                    s.setFromPoints(o, e),
                    i.setFromPoints(o, n),
                    s.isSeparated(i))
                  )
                    return !1;
                }
              }
              return (
                f &&
                  (console.warn(
                    'ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0.',
                  ),
                  f.start.set(0, 0, 0),
                  f.end.set(0, 0, 0)),
                !0
              );
            }
            {
              const t = this.points;
              let e = !1,
                n = 0;
              for (let r = 0; r < 3; r++) {
                const s = t[r],
                  i = t[(r + 1) % 3];
                if (
                  (u.start.copy(s),
                  u.end.copy(i),
                  u.delta(a),
                  0 === g.normal.dot(a) && 0 === g.distanceToPoint(u.start))
                ) {
                  h.copy(u), (n = 2);
                  break;
                }
                if (g.intersectLine(u, e ? h.start : h.end)) {
                  if ((n++, e)) break;
                  e = !0;
                }
              }
              if (2 !== n) return !1;
              const s = r.points;
              let i = !1,
                o = 0;
              for (let t = 0; t < 3; t++) {
                const e = s[t],
                  n = s[(t + 1) % 3];
                if (
                  (u.start.copy(e),
                  u.end.copy(n),
                  u.delta(c),
                  0 === p.normal.dot(c) && 0 === p.distanceToPoint(u.start))
                ) {
                  d.copy(u), (o = 2);
                  break;
                }
                if (p.intersectLine(u, i ? d.start : d.end)) {
                  if ((o++, i)) break;
                  i = !0;
                }
              }
              if (2 !== o) return !1;
              if ((h.delta(a), d.delta(c), a.dot(c) < 0)) {
                let t = d.start;
                (d.start = d.end), (d.end = t);
              }
              const m = h.start.dot(a),
                w = h.end.dot(a),
                y = d.start.dot(a),
                x = d.end.dot(a),
                b = w < y,
                _ = m < x;
              return (
                (m === x || y === w || b !== _) &&
                (f &&
                  (l.subVectors(h.start, d.start),
                  l.dot(a) > 0 ? f.start.copy(h.start) : f.start.copy(d.start),
                  l.subVectors(h.end, d.end),
                  l.dot(a) < 0 ? f.end.copy(h.end) : f.end.copy(d.end)),
                !0)
              );
            }
          };
        })()),
        (S.prototype.distanceToPoint = (function () {
          const t = new r.Vector3();
          return function (e) {
            return this.closestPointToPoint(e, t), e.distanceTo(t);
          };
        })()),
        (S.prototype.distanceToTriangle = (function () {
          const t = new r.Vector3(),
            e = new r.Vector3(),
            n = ['a', 'b', 'c'],
            s = new r.Line3(),
            i = new r.Line3();
          return function (r, o = null, a = null) {
            const c = o || a ? s : null;
            if (this.intersectsTriangle(r, c))
              return (o || a) && (o && c.getCenter(o), a && c.getCenter(a)), 0;
            let l = 1 / 0;
            for (let e = 0; e < 3; e++) {
              let s;
              const i = n[e],
                c = r[i];
              this.closestPointToPoint(c, t),
                (s = c.distanceToSquared(t)),
                s < l && ((l = s), o && o.copy(t), a && a.copy(c));
              const u = this[i];
              r.closestPointToPoint(u, t),
                (s = u.distanceToSquared(t)),
                s < l && ((l = s), o && o.copy(u), a && a.copy(t));
            }
            for (let c = 0; c < 3; c++) {
              const u = n[c],
                h = n[(c + 1) % 3];
              s.set(this[u], this[h]);
              for (let c = 0; c < 3; c++) {
                const u = n[c],
                  h = n[(c + 1) % 3];
                i.set(r[u], r[h]), T(s, i, t, e);
                const d = t.distanceToSquared(e);
                d < l && ((l = d), o && o.copy(t), a && a.copy(e));
              }
            }
            return Math.sqrt(l);
          };
        })());
      class P extends r.Box3 {
        constructor(...t) {
          super(...t),
            (this.isOrientedBox = !0),
            (this.matrix = new r.Matrix4()),
            (this.invMatrix = new r.Matrix4()),
            (this.points = new Array(8).fill().map(() => new r.Vector3())),
            (this.satAxes = new Array(3).fill().map(() => new r.Vector3())),
            (this.satBounds = new Array(3).fill().map(() => new b())),
            (this.alignedSatBounds = new Array(3).fill().map(() => new b())),
            (this.needsUpdate = !1);
        }
        set(t, e, n) {
          super.set(t, e), this.matrix.copy(n), (this.needsUpdate = !0);
        }
        copy(t) {
          super.copy(t), this.matrix.copy(t.matrix), (this.needsUpdate = !0);
        }
      }
      (P.prototype.update = function () {
        const t = this.matrix,
          e = this.min,
          n = this.max,
          r = this.points;
        for (let s = 0; s <= 1; s++)
          for (let i = 0; i <= 1; i++)
            for (let o = 0; o <= 1; o++) {
              const a = r[(1 * s) | (2 * i) | (4 * o)];
              (a.x = s ? n.x : e.x),
                (a.y = i ? n.y : e.y),
                (a.z = o ? n.z : e.z),
                a.applyMatrix4(t);
            }
        const s = this.satBounds,
          i = this.satAxes,
          o = r[0];
        for (let t = 0; t < 3; t++) {
          const e = i[t],
            n = s[t],
            a = r[1 << t];
          e.subVectors(o, a), n.setFromPoints(e, r);
        }
        const a = this.alignedSatBounds;
        a[0].setFromPointsField(r, 'x'),
          a[1].setFromPointsField(r, 'y'),
          a[2].setFromPointsField(r, 'z'),
          this.invMatrix.copy(this.matrix).invert(),
          (this.needsUpdate = !1);
      }),
        (P.prototype.intersectsBox = (function () {
          const t = new b();
          return function (e) {
            this.needsUpdate && this.update();
            const n = e.min,
              r = e.max,
              s = this.satBounds,
              i = this.satAxes,
              o = this.alignedSatBounds;
            if (((t.min = n.x), (t.max = r.x), o[0].isSeparated(t))) return !1;
            if (((t.min = n.y), (t.max = r.y), o[1].isSeparated(t))) return !1;
            if (((t.min = n.z), (t.max = r.z), o[2].isSeparated(t))) return !1;
            for (let n = 0; n < 3; n++) {
              const r = i[n],
                o = s[n];
              if ((t.setFromBox(r, e), o.isSeparated(t))) return !1;
            }
            return !0;
          };
        })()),
        (P.prototype.intersectsTriangle = (function () {
          const t = new S(),
            e = new Array(3),
            n = new b(),
            s = new b(),
            i = new r.Vector3();
          return function (r) {
            this.needsUpdate && this.update(),
              r.isExtendedTriangle ? r.needsUpdate && r.update() : (t.copy(r), t.update(), (r = t));
            const o = this.satBounds,
              a = this.satAxes;
            (e[0] = r.a), (e[1] = r.b), (e[2] = r.c);
            for (let t = 0; t < 3; t++) {
              const r = o[t],
                s = a[t];
              if ((n.setFromPoints(s, e), r.isSeparated(n))) return !1;
            }
            const c = r.satBounds,
              l = r.satAxes,
              u = this.points;
            for (let t = 0; t < 3; t++) {
              const e = c[t],
                r = l[t];
              if ((n.setFromPoints(r, u), e.isSeparated(n))) return !1;
            }
            for (let t = 0; t < 3; t++) {
              const r = a[t];
              for (let t = 0; t < 4; t++) {
                const o = l[t];
                if (
                  (i.crossVectors(r, o),
                  n.setFromPoints(i, e),
                  s.setFromPoints(i, u),
                  n.isSeparated(s))
                )
                  return !1;
              }
            }
            return !0;
          };
        })()),
        (P.prototype.closestPointToPoint = function (t, e) {
          return (
            this.needsUpdate && this.update(),
            e
              .copy(t)
              .applyMatrix4(this.invMatrix)
              .clamp(this.min, this.max)
              .applyMatrix4(this.matrix),
            e
          );
        }),
        (P.prototype.distanceToPoint = (function () {
          const t = new r.Vector3();
          return function (e) {
            return this.closestPointToPoint(e, t), e.distanceTo(t);
          };
        })()),
        (P.prototype.distanceToBox = (function () {
          const t = ['x', 'y', 'z'],
            e = new Array(12).fill().map(() => new r.Line3()),
            n = new Array(12).fill().map(() => new r.Line3()),
            s = new r.Vector3(),
            i = new r.Vector3();
          return function (r, o = 0, a = null, c = null) {
            if ((this.needsUpdate && this.update(), this.intersectsBox(r)))
              return (
                (a || c) &&
                  (r.getCenter(i),
                  this.closestPointToPoint(i, s),
                  r.closestPointToPoint(s, i),
                  a && a.copy(s),
                  c && c.copy(i)),
                0
              );
            const l = o * o,
              u = r.min,
              h = r.max,
              d = this.points;
            let f = 1 / 0;
            for (let t = 0; t < 8; t++) {
              const e = d[t];
              i.copy(e).clamp(u, h);
              const n = e.distanceToSquared(i);
              if (n < f && ((f = n), a && a.copy(e), c && c.copy(i), n < l)) return Math.sqrt(n);
            }
            let p = 0;
            for (let r = 0; r < 3; r++)
              for (let s = 0; s <= 1; s++)
                for (let i = 0; i <= 1; i++) {
                  const o = (r + 1) % 3,
                    a = (r + 2) % 3,
                    c = (1 << r) | (s << o) | (i << a),
                    l = d[(s << o) | (i << a)],
                    f = d[c];
                  e[p].set(l, f);
                  const g = t[r],
                    m = t[o],
                    w = t[a],
                    y = n[p],
                    x = y.start,
                    b = y.end;
                  (x[g] = u[g]),
                    (x[m] = s ? u[m] : h[m]),
                    (x[w] = i ? u[w] : h[m]),
                    (b[g] = h[g]),
                    (b[m] = s ? u[m] : h[m]),
                    (b[w] = i ? u[w] : h[m]),
                    p++;
                }
            for (let t = 0; t <= 1; t++)
              for (let e = 0; e <= 1; e++)
                for (let n = 0; n <= 1; n++) {
                  (i.x = t ? h.x : u.x),
                    (i.y = e ? h.y : u.y),
                    (i.z = n ? h.z : u.z),
                    this.closestPointToPoint(i, s);
                  const r = i.distanceToSquared(s);
                  if (r < f && ((f = r), a && a.copy(s), c && c.copy(i), r < l))
                    return Math.sqrt(r);
                }
            for (let t = 0; t < 12; t++) {
              const r = e[t];
              for (let t = 0; t < 12; t++) {
                const e = n[t];
                T(r, e, s, i);
                const o = s.distanceToSquared(i);
                if (o < f && ((f = o), a && a.copy(s), c && c.copy(i), o < l)) return Math.sqrt(o);
              }
            }
            return Math.sqrt(f);
          };
        })());
      var A = n(78129);
      function F(t, e, n, r) {
        const s = t.a,
          i = t.b,
          o = t.c;
        let a = e,
          c = e + 1,
          l = e + 2;
        n && ((a = n.getX(e)), (c = n.getX(e + 1)), (l = n.getX(e + 2))),
          (s.x = r.getX(a)),
          (s.y = r.getY(a)),
          (s.z = r.getZ(a)),
          (i.x = r.getX(c)),
          (i.y = r.getY(c)),
          (i.z = r.getZ(c)),
          (o.x = r.getX(l)),
          (o.y = r.getY(l)),
          (o.z = r.getZ(l));
      }
      function C(t, e, n, r, s, i, o) {
        const a = n.index,
          c = n.attributes.position;
        for (let n = t, l = e + t; n < l; n++)
          if ((F(o, 3 * n, a, c), (o.needsUpdate = !0), r(o, n, s, i))) return !0;
        return !1;
      }
      class M {
        constructor(t) {
          (this._getNewPrimitive = t), (this._primitives = []);
        }
        getPrimitive() {
          const t = this._primitives;
          return 0 === t.length ? this._getNewPrimitive() : t.pop();
        }
        releasePrimitive(t) {
          this._primitives.push(t);
        }
      }
      function V(t, e) {
        return 65535 === e[t + 15];
      }
      function B(t, e) {
        return e[t + 6];
      }
      function U(t, e) {
        return e[t + 14];
      }
      function L(t) {
        return t + 8;
      }
      function k(t, e) {
        return e[t + 6];
      }
      const R = new r.Box3(),
        E = new r.Vector3(),
        O = ['x', 'y', 'z'];
      function I(t, e, n, r, s) {
        let i = 2 * t,
          o = j,
          a = W,
          c = $;
        if (V(i, a)) {
          const o = B(t, c),
            l = U(i, a);
          (0, A.U$)(e, n, r, o, l, s);
        } else {
          const i = L(t);
          H(i, o, r, E) && I(i, e, n, r, s);
          const a = k(t, c);
          H(a, o, r, E) && I(a, e, n, r, s);
        }
      }
      function D(t, e, n, r) {
        let s = 2 * t,
          i = j,
          o = W,
          a = $;
        if (V(s, o)) {
          const i = B(t, a),
            c = U(s, o);
          return (0, A.rM)(e, n, r, i, c);
        }
        {
          const s = (function (t, e) {
              return e[t + 7];
            })(t, a),
            o = O[s],
            c = r.direction[o] >= 0;
          let l, u;
          c ? ((l = L(t)), (u = k(t, a))) : ((l = k(t, a)), (u = L(t)));
          const h = H(l, i, r, E) ? D(l, e, n, r) : null;
          if (h) {
            const t = h.point[o];
            if (c ? t <= i[u + s] : t >= i[u + s + 3]) return h;
          }
          const d = H(u, i, r, E) ? D(u, e, n, r) : null;
          return h && d ? (h.distance <= d.distance ? h : d) : h || d || null;
        }
      }
      const N = (function () {
          let t, e;
          const n = [],
            s = new M(() => new r.Box3());
          return function (...r) {
            (t = s.getPrimitive()), (e = s.getPrimitive()), n.push(t, e);
            const o = i(...r);
            s.releasePrimitive(t), s.releasePrimitive(e), n.pop(), n.pop();
            const a = n.length;
            return a > 0 && ((e = n[a - 1]), (t = n[a - 2])), o;
          };
          function i(n, r, s, o, a = null, l = 0, u = 0) {
            function h(t) {
              let e = 2 * t,
                n = W,
                r = $;
              for (; !V(e, n); ) e = 2 * (t = L(t));
              return B(t, r);
            }
            function d(t) {
              let e = 2 * t,
                n = W,
                r = $;
              for (; !V(e, n); ) e = 2 * (t = k(t, r));
              return B(t, r) + U(e, n);
            }
            let f = 2 * n,
              p = j,
              g = W,
              m = $;
            if (V(f, g)) {
              const e = B(n, m),
                r = U(f, g);
              return c(n, p, t), o(e, r, !1, u, l + n, t);
            }
            {
              const f = L(n),
                w = k(n, m);
              let y,
                x,
                b,
                _,
                T = f,
                v = w;
              if (a && ((b = t), (_ = e), c(T, p, b), c(v, p, _), (y = a(b)), (x = a(_)), x < y)) {
                (T = w), (v = f);
                const t = y;
                (y = x), (x = t), (b = _);
              }
              b || ((b = t), c(T, p, b));
              const S = s(b, V(2 * T, g), y, u + 1, l + T);
              let P;
              if (2 === S) {
                const t = h(T);
                P = o(t, d(T) - t, !0, u + 1, l + T, b);
              } else P = S && i(T, r, s, o, a, l, u + 1);
              if (P) return !0;
              (_ = e), c(v, p, _);
              const A = s(_, V(2 * v, g), x, u + 1, l + v);
              let F;
              if (2 === A) {
                const t = h(v);
                F = o(t, d(v) - t, !0, u + 1, l + v, _);
              } else F = A && i(v, r, s, o, a, l, u + 1);
              return !!F;
            }
          }
        })(),
        z = (function () {
          const t = new S(),
            e = new S(),
            n = new r.Matrix4(),
            s = new P(),
            i = new P();
          return function r(o, a, l, u, h = null) {
            let d = 2 * o,
              f = j,
              p = W,
              g = $;
            null === h &&
              (l.boundingBox || l.computeBoundingBox(),
              s.set(l.boundingBox.min, l.boundingBox.max, u),
              (h = s));
            if (!V(d, p)) {
              const t = o + 8,
                e = g[o + 6];
              c(t, f, R);
              if (h.intersectsBox(R) && r(t, a, l, u, h)) return !0;
              c(e, f, R);
              return !!(h.intersectsBox(R) && r(e, a, l, u, h));
            }
            {
              const r = a,
                s = r.index,
                h = r.attributes.position,
                m = l.index,
                w = l.attributes.position,
                y = B(o, g),
                x = U(d, p);
              if ((n.copy(u).invert(), l.boundsTree)) {
                c(o, f, i), i.matrix.copy(n), (i.needsUpdate = !0);
                return l.boundsTree.shapecast({
                  intersectsBounds: (t) => i.intersectsBox(t),
                  intersectsTriangle: (t) => {
                    t.a.applyMatrix4(u),
                      t.b.applyMatrix4(u),
                      t.c.applyMatrix4(u),
                      (t.needsUpdate = !0);
                    for (let n = 3 * y, r = 3 * (x + y); n < r; n += 3)
                      if ((F(e, n, s, h), (e.needsUpdate = !0), t.intersectsTriangle(e))) return !0;
                    return !1;
                  },
                });
              }
              for (let r = 3 * y, i = x + 3 * y; r < i; r += 3) {
                F(t, r, s, h),
                  t.a.applyMatrix4(n),
                  t.b.applyMatrix4(n),
                  t.c.applyMatrix4(n),
                  (t.needsUpdate = !0);
                for (let n = 0, r = m.count; n < r; n += 3)
                  if ((F(e, n, m, w), (e.needsUpdate = !0), t.intersectsTriangle(e))) return !0;
              }
            }
          };
        })();
      function H(t, e, n, r) {
        return c(t, e, R), n.intersectBox(R, r);
      }
      const G = [];
      let q, j, W, $;
      function J(t) {
        q && G.push(q),
          (q = t),
          (j = new Float32Array(t)),
          (W = new Uint16Array(t)),
          ($ = new Uint32Array(t));
      }
      function Z() {
        (q = null), (j = null), (W = null), ($ = null), G.length && J(G.pop());
      }
      const Q = Symbol('skip tree generation'),
        X = new r.Box3(),
        Y = new r.Box3(),
        K = new r.Matrix4(),
        tt = new P(),
        et = new P(),
        nt = new r.Vector3(),
        rt = new r.Vector3(),
        st = new r.Vector3(),
        it = new r.Vector3(),
        ot = new r.Vector3(),
        at = new r.Box3(),
        ct = new M(() => new S());
      class lt {
        static serialize(t, e = {}) {
          if (e.isBufferGeometry)
            return (
              console.warn(
                'MeshBVH.serialize: The arguments for the function have changed. See documentation for new signature.',
              ),
              lt.serialize(arguments[0], { cloneBuffers: void 0 === arguments[2] || arguments[2] })
            );
          e = { cloneBuffers: !0, ...e };
          const n = t.geometry,
            r = t._roots,
            s = n.getIndex();
          let i;
          return (
            (i = e.cloneBuffers
              ? { roots: r.map((t) => t.slice()), index: s.array.slice() }
              : { roots: r, index: s.array }),
            i
          );
        }
        static deserialize(t, e, n = {}) {
          if ('boolean' == typeof n)
            return (
              console.warn(
                'MeshBVH.deserialize: The arguments for the function have changed. See documentation for new signature.',
              ),
              lt.deserialize(arguments[0], arguments[1], {
                setIndex: void 0 === arguments[2] || arguments[2],
              })
            );
          n = { setIndex: !0, ...n };
          const { index: s, roots: i } = t,
            o = new lt(e, { ...n, [Q]: !0 });
          if (((o._roots = i), n.setIndex)) {
            const n = e.getIndex();
            if (null === n) {
              const n = new r.BufferAttribute(t.index, 1, !1);
              e.setIndex(n);
            } else n.array !== s && (n.array.set(s), (n.needsUpdate = !0));
          }
          return o;
        }
        constructor(t, e = {}) {
          if (!t.isBufferGeometry) throw new Error('MeshBVH: Only BufferGeometries are supported.');
          if (t.index && t.index.isInterleavedBufferAttribute)
            throw new Error(
              'MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.',
            );
          if (
            (e = Object.assign(
              {
                strategy: 0,
                maxDepth: 40,
                maxLeafTris: 10,
                verbose: !0,
                useSharedArrayBuffer: !1,
                setBoundingBox: !0,
                onProgress: null,
                [Q]: !1,
              },
              e,
            )).useSharedArrayBuffer &&
            'undefined' == typeof SharedArrayBuffer
          )
            throw new Error('MeshBVH: SharedArrayBuffer is not available.');
          (this._roots = null),
            e[Q] ||
              ((this._roots = (function (t, e) {
                const n = x(t, e);
                let r, s, o;
                const a = [],
                  c = e.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer;
                for (let t = 0; t < n.length; t++) {
                  const e = n[t],
                    i = new c(32 * l(e));
                  (r = new Float32Array(i)),
                    (s = new Uint32Array(i)),
                    (o = new Uint16Array(i)),
                    u(0, e),
                    a.push(i);
                }
                return a;
                function l(t) {
                  return t.count ? 1 : 1 + l(t.left) + l(t.right);
                }
                function u(t, e) {
                  const n = t / 4,
                    a = t / 2,
                    c = !!e.count,
                    l = e.boundingData;
                  for (let t = 0; t < 6; t++) r[n + t] = l[t];
                  if (c) {
                    const r = e.offset,
                      c = e.count;
                    return (s[n + 6] = r), (o[a + 14] = c), (o[a + 15] = i), t + 32;
                  }
                  {
                    const r = e.left,
                      i = e.right,
                      o = e.splitAxis;
                    let a;
                    if (((a = u(t + 32, r)), a / 4 > Math.pow(2, 32)))
                      throw new Error('MeshBVH: Cannot store child pointer greater than 32 bits.');
                    return (s[n + 6] = a / 4), (a = u(a, i)), (s[n + 7] = o), a;
                  }
                }
              })(t, e)),
              !t.boundingBox &&
                e.setBoundingBox &&
                (t.boundingBox = this.getBoundingBox(new r.Box3()))),
            (this.geometry = t);
        }
        refit(t = null) {
          t && Array.isArray(t) && (t = new Set(t));
          const e = this.geometry,
            n = e.index.array,
            r = e.attributes.position,
            s = r.array,
            o = r.offset || 0;
          let a,
            c,
            l,
            u,
            h = 3;
          r.isInterleavedBufferAttribute && (h = r.data.stride);
          let d = 0;
          const f = this._roots;
          for (let t = 0, e = f.length; t < e; t++)
            (a = f[t]),
              (c = new Uint32Array(a)),
              (l = new Uint16Array(a)),
              (u = new Float32Array(a)),
              p(0, d),
              (d += a.byteLength);
          function p(e, r, a = !1) {
            const d = 2 * e;
            if (l[d + 15] === i) {
              const t = c[e + 6];
              let r = 1 / 0,
                i = 1 / 0,
                a = 1 / 0,
                f = -1 / 0,
                p = -1 / 0,
                g = -1 / 0;
              for (let e = 3 * t, c = 3 * (t + l[d + 14]); e < c; e++) {
                const t = n[e] * h + o,
                  c = s[t + 0],
                  l = s[t + 1],
                  u = s[t + 2];
                c < r && (r = c),
                  c > f && (f = c),
                  l < i && (i = l),
                  l > p && (p = l),
                  u < a && (a = u),
                  u > g && (g = u);
              }
              return (
                (u[e + 0] !== r ||
                  u[e + 1] !== i ||
                  u[e + 2] !== a ||
                  u[e + 3] !== f ||
                  u[e + 4] !== p ||
                  u[e + 5] !== g) &&
                ((u[e + 0] = r),
                (u[e + 1] = i),
                (u[e + 2] = a),
                (u[e + 3] = f),
                (u[e + 4] = p),
                (u[e + 5] = g),
                !0)
              );
            }
            {
              const n = e + 8,
                s = c[e + 6],
                i = n + r,
                o = s + r;
              let l = a,
                h = !1,
                d = !1;
              t ? l || ((h = t.has(i)), (d = t.has(o)), (l = !h && !d)) : ((h = !0), (d = !0));
              const f = l || d;
              let g = !1;
              (l || h) && (g = p(n, r, l));
              let m = !1;
              f && (m = p(s, r, l));
              const w = g || m;
              if (w)
                for (let t = 0; t < 3; t++) {
                  const r = n + t,
                    i = s + t,
                    o = u[r],
                    a = u[r + 3],
                    c = u[i],
                    l = u[i + 3];
                  (u[e + t] = o < c ? o : c), (u[e + t + 3] = a > l ? a : l);
                }
              return w;
            }
          }
        }
        traverse(t, e = 0) {
          const n = this._roots[e],
            r = new Uint32Array(n),
            s = new Uint16Array(n);
          !(function e(o, a = 0) {
            const c = 2 * o,
              l = s[c + 15] === i;
            if (l) {
              const e = r[o + 6],
                i = s[c + 14];
              t(a, l, new Float32Array(n, 4 * o, 6), e, i);
            } else {
              const s = o + 8,
                i = r[o + 6],
                c = r[o + 7];
              t(a, l, new Float32Array(n, 4 * o, 6), c) || (e(s, a + 1), e(i, a + 1));
            }
          })(0);
        }
        raycast(t, e = r.FrontSide) {
          const n = this._roots,
            s = this.geometry,
            i = [],
            o = e.isMaterial,
            a = Array.isArray(e),
            c = s.groups,
            l = o ? e.side : e;
          for (let r = 0, o = n.length; r < o; r++) {
            const o = a ? e[c[r].materialIndex].side : l,
              u = i.length;
            if ((J(n[r]), I(0, s, o, t, i), Z(), a)) {
              const t = c[r].materialIndex;
              for (let e = u, n = i.length; e < n; e++) i[e].face.materialIndex = t;
            }
          }
          return i;
        }
        raycastFirst(t, e = r.FrontSide) {
          const n = this._roots,
            s = this.geometry,
            i = e.isMaterial,
            o = Array.isArray(e);
          let a = null;
          const c = s.groups,
            l = i ? e.side : e;
          for (let r = 0, i = n.length; r < i; r++) {
            const i = o ? e[c[r].materialIndex].side : l;
            J(n[r]);
            const u = D(0, s, i, t);
            Z(),
              null != u &&
                (null == a || u.distance < a.distance) &&
                ((a = u), o && (u.face.materialIndex = c[r].materialIndex));
          }
          return a;
        }
        intersectsGeometry(t, e) {
          const n = this.geometry;
          let r = !1;
          for (const s of this._roots) if ((J(s), (r = z(0, n, t, e)), Z(), r)) break;
          return r;
        }
        shapecast(t, e, n) {
          const r = this.geometry;
          if (t instanceof Function) {
            if (e) {
              const t = e;
              e = (e, n, r, s) => {
                const i = 3 * n;
                return t(e, i, i + 1, i + 2, r, s);
              };
            }
            (t = {
              boundsTraverseOrder: n,
              intersectsBounds: t,
              intersectsTriangle: e,
              intersectsRange: null,
            }),
              console.warn(
                'MeshBVH: Shapecast function signature has changed and now takes an object of callbacks as a second argument. See docs for new signature.',
              );
          }
          const s = ct.getPrimitive();
          let {
            boundsTraverseOrder: i,
            intersectsBounds: o,
            intersectsRange: a,
            intersectsTriangle: c,
          } = t;
          if (a && c) {
            const t = a;
            a = (e, n, i, o, a) => !!t(e, n, i, o, a) || C(e, n, r, c, i, o, s);
          } else a || (a = c ? (t, e, n, i) => C(t, e, r, c, n, i, s) : (t, e, n) => n);
          let l = !1,
            u = 0;
          for (const t of this._roots) {
            if ((J(t), (l = N(0, r, o, a, i, u)), Z(), l)) break;
            u += t.byteLength;
          }
          return ct.releasePrimitive(s), l;
        }
        bvhcast(t, e, n) {
          let { intersectsRanges: r, intersectsTriangles: s } = n;
          const i = this.geometry.index,
            o = this.geometry.attributes.position,
            a = t.geometry.index,
            c = t.geometry.attributes.position;
          K.copy(e).invert();
          const l = ct.getPrimitive(),
            u = ct.getPrimitive();
          if (s) {
            function h(t, n, r, h, d, f, p, g) {
              for (let m = r, w = r + h; m < w; m++) {
                F(u, 3 * m, a, c),
                  u.a.applyMatrix4(e),
                  u.b.applyMatrix4(e),
                  u.c.applyMatrix4(e),
                  (u.needsUpdate = !0);
                for (let e = t, r = t + n; e < r; e++)
                  if ((F(l, 3 * e, i, o), (l.needsUpdate = !0), s(l, u, e, m, d, f, p, g)))
                    return !0;
              }
              return !1;
            }
            if (r) {
              const t = r;
              r = function (e, n, r, s, i, o, a, c) {
                return !!t(e, n, r, s, i, o, a, c) || h(e, n, r, s, i, o, a, c);
              };
            } else r = h;
          }
          this.getBoundingBox(Y), Y.applyMatrix4(e);
          const d = this.shapecast({
            intersectsBounds: (t) => Y.intersectsBox(t),
            intersectsRange: (e, n, s, i, o, a) => (
              X.copy(a),
              X.applyMatrix4(K),
              t.shapecast({
                intersectsBounds: (t) => X.intersectsBox(t),
                intersectsRange: (t, s, a, c, l) => r(e, n, t, s, i, o, c, l),
              })
            ),
          });
          return ct.releasePrimitive(l), ct.releasePrimitive(u), d;
        }
        intersectsBox(t, e) {
          return (
            tt.set(t.min, t.max, e),
            (tt.needsUpdate = !0),
            this.shapecast({
              intersectsBounds: (t) => tt.intersectsBox(t),
              intersectsTriangle: (t) => tt.intersectsTriangle(t),
            })
          );
        }
        intersectsSphere(t) {
          return this.shapecast({
            intersectsBounds: (e) => t.intersectsBox(e),
            intersectsTriangle: (e) => e.intersectsSphere(t),
          });
        }
        closestPointToGeometry(t, e, n = {}, r = {}, s = 0, i = 1 / 0) {
          t.boundingBox || t.computeBoundingBox(),
            tt.set(t.boundingBox.min, t.boundingBox.max, e),
            (tt.needsUpdate = !0);
          const o = this.geometry,
            a = o.attributes.position,
            c = o.index,
            l = t.attributes.position,
            u = t.index,
            h = ct.getPrimitive(),
            d = ct.getPrimitive();
          let f = rt,
            p = st,
            g = null,
            m = null;
          r && ((g = it), (m = ot));
          let w = 1 / 0,
            y = null,
            x = null;
          return (
            K.copy(e).invert(),
            et.matrix.copy(K),
            this.shapecast({
              boundsTraverseOrder: (t) => tt.distanceToBox(t),
              intersectsBounds: (t, e, n) =>
                n < w &&
                n < i &&
                (e && (et.min.copy(t.min), et.max.copy(t.max), (et.needsUpdate = !0)), !0),
              intersectsRange: (n, r) => {
                if (t.boundsTree)
                  return t.boundsTree.shapecast({
                    boundsTraverseOrder: (t) => et.distanceToBox(t),
                    intersectsBounds: (t, e, n) => n < w && n < i,
                    intersectsRange: (t, i) => {
                      for (let o = 3 * t, b = 3 * (t + i); o < b; o += 3) {
                        F(d, o, u, l),
                          d.a.applyMatrix4(e),
                          d.b.applyMatrix4(e),
                          d.c.applyMatrix4(e),
                          (d.needsUpdate = !0);
                        for (let t = 3 * n, e = 3 * (n + r); t < e; t += 3) {
                          F(h, t, c, a), (h.needsUpdate = !0);
                          const e = h.distanceToTriangle(d, f, g);
                          if (
                            (e < w &&
                              (p.copy(f), m && m.copy(g), (w = e), (y = t / 3), (x = o / 3)),
                            e < s)
                          )
                            return !0;
                        }
                      }
                    },
                  });
                for (let t = 0, i = u ? u.count : l.count; t < i; t += 3) {
                  F(d, t, u, l),
                    d.a.applyMatrix4(e),
                    d.b.applyMatrix4(e),
                    d.c.applyMatrix4(e),
                    (d.needsUpdate = !0);
                  for (let e = 3 * n, i = 3 * (n + r); e < i; e += 3) {
                    F(h, e, c, a), (h.needsUpdate = !0);
                    const n = h.distanceToTriangle(d, f, g);
                    if (
                      (n < w && (p.copy(f), m && m.copy(g), (w = n), (y = e / 3), (x = t / 3)),
                      n < s)
                    )
                      return !0;
                  }
                }
              },
            }),
            ct.releasePrimitive(h),
            ct.releasePrimitive(d),
            w === 1 / 0
              ? null
              : (n.point ? n.point.copy(p) : (n.point = p.clone()),
                (n.distance = w),
                (n.faceIndex = y),
                r &&
                  (r.point ? r.point.copy(m) : (r.point = m.clone()),
                  r.point.applyMatrix4(K),
                  p.applyMatrix4(K),
                  (r.distance = p.sub(r.point).length()),
                  (r.faceIndex = x)),
                n)
          );
        }
        closestPointToPoint(t, e = {}, n = 0, r = 1 / 0) {
          const s = n * n,
            i = r * r;
          let o = 1 / 0,
            a = null;
          if (
            (this.shapecast({
              boundsTraverseOrder: (e) => (nt.copy(t).clamp(e.min, e.max), nt.distanceToSquared(t)),
              intersectsBounds: (t, e, n) => n < o && n < i,
              intersectsTriangle: (e, n) => {
                e.closestPointToPoint(t, nt);
                const r = t.distanceToSquared(nt);
                return r < o && (rt.copy(nt), (o = r), (a = n)), r < s;
              },
            }),
            o === 1 / 0)
          )
            return null;
          const c = Math.sqrt(o);
          return (
            e.point ? e.point.copy(rt) : (e.point = rt.clone()),
            (e.distance = c),
            (e.faceIndex = a),
            e
          );
        }
        getBoundingBox(t) {
          t.makeEmpty();
          return (
            this._roots.forEach((e) => {
              c(0, new Float32Array(e), at), t.union(at);
            }),
            t
          );
        }
      }
      const ut = lt.prototype.raycast;
      lt.prototype.raycast = function (...t) {
        if (t[0].isMesh) {
          console.warn(
            'MeshBVH: The function signature and results frame for "raycast" has changed. See docs for new signature.',
          );
          const [e, n, r, s] = t;
          return (
            ut.call(this, r, e.material).forEach((t) => {
              (t = (0, A.O)(t, e, n)) && s.push(t);
            }),
            s
          );
        }
        return ut.apply(this, t);
      };
      const ht = lt.prototype.raycastFirst;
      lt.prototype.raycastFirst = function (...t) {
        if (t[0].isMesh) {
          console.warn(
            'MeshBVH: The function signature and results frame for "raycastFirst" has changed. See docs for new signature.',
          );
          const [e, n, r] = t;
          return (0, A.O)(ht.call(this, r, e.material), e, n);
        }
        return ht.apply(this, t);
      };
      const dt = lt.prototype.closestPointToPoint;
      lt.prototype.closestPointToPoint = function (...t) {
        if (t[0].isMesh) {
          console.warn(
            'MeshBVH: The function signature and results frame for "closestPointToPoint" has changed. See docs for new signature.',
          ),
            t.unshift();
          const e = t[1],
            n = {};
          return (t[1] = n), dt.apply(this, t), e && e.copy(n.point), n.distance;
        }
        return dt.apply(this, t);
      };
      const ft = lt.prototype.closestPointToGeometry;
      lt.prototype.closestPointToGeometry = function (...t) {
        const e = t[2],
          n = t[3];
        if ((e && e.isVector3) || (n && n.isVector3)) {
          console.warn(
            'MeshBVH: The function signature and results frame for "closestPointToGeometry" has changed. See docs for new signature.',
          );
          const r = {},
            s = {},
            i = t[1];
          return (
            (t[2] = r),
            (t[3] = s),
            ft.apply(this, t),
            e && e.copy(r.point),
            n && n.copy(s.point).applyMatrix4(i),
            r.distance
          );
        }
        return ft.apply(this, t);
      };
      const pt = lt.prototype.refit;
      (lt.prototype.refit = function (...t) {
        const e = t[0],
          n = t[1];
        if (n && (n instanceof Set || Array.isArray(n))) {
          console.warn(
            'MeshBVH: The function signature for "refit" has changed. See docs for new signature.',
          );
          const t = new Set();
          n.forEach((e) => t.add(e)), e && e.forEach((e) => t.add(e)), pt.call(this, t);
        } else pt.apply(this, t);
      }),
        ['intersectsGeometry', 'shapecast', 'intersectsBox', 'intersectsSphere'].forEach((t) => {
          const e = lt.prototype[t];
          lt.prototype[t] = function (...n) {
            return (
              (null === n[0] || n[0].isMesh) &&
                (n.shift(),
                console.warn(
                  `MeshBVH: The function signature for "${t}" has changed and no longer takes Mesh. See docs for new signature.`,
                )),
              e.apply(this, n)
            );
          };
        });
    },
    33320: (t, e, n) => {
      n.d(e, { Xy: () => u, sn: () => h, uL: () => l });
      var r = n(81396),
        s = n(78129),
        i = n(27896);
      const o = new r.Ray(),
        a = new r.Matrix4(),
        c = r.Mesh.prototype.raycast;
      function l(t, e) {
        if (this.geometry.boundsTree) {
          if (void 0 === this.material) return;
          a.copy(this.matrixWorld).invert(), o.copy(t.ray).applyMatrix4(a);
          const n = this.geometry.boundsTree;
          if (!0 === t.firstHitOnly) {
            const r = (0, s.O)(n.raycastFirst(o, this.material), this, t);
            r && e.push(r);
          } else {
            const r = n.raycast(o, this.material);
            for (let n = 0, i = r.length; n < i; n++) {
              const i = (0, s.O)(r[n], this, t);
              i && e.push(i);
            }
          }
        } else c.call(this, t, e);
      }
      function u(t) {
        return (this.boundsTree = new i.r(this, t)), this.boundsTree;
      }
      function h() {
        this.boundsTree = null;
      }
    },
    78129: (t, e, n) => {
      n.d(e, { O: () => g, rM: () => p, U$: () => f });
      var r = n(81396);
      const s = new r.Vector3(),
        i = new r.Vector3(),
        o = new r.Vector3(),
        a = new r.Vector2(),
        c = new r.Vector2(),
        l = new r.Vector2(),
        u = new r.Vector3();
      function h(t, e, n, h, d, f, p) {
        s.fromBufferAttribute(e, h), i.fromBufferAttribute(e, d), o.fromBufferAttribute(e, f);
        const g = (function (t, e, n, s, i, o) {
          let a;
          return (
            (a =
              o === r.BackSide
                ? t.intersectTriangle(s, n, e, !0, i)
                : t.intersectTriangle(e, n, s, o !== r.DoubleSide, i)),
            null === a ? null : { distance: t.origin.distanceTo(i), point: i.clone() }
          );
        })(t, s, i, o, u, p);
        if (g) {
          n &&
            (a.fromBufferAttribute(n, h),
            c.fromBufferAttribute(n, d),
            l.fromBufferAttribute(n, f),
            (g.uv = r.Triangle.getUV(u, s, i, o, a, c, l, new r.Vector2())));
          const t = { a: h, b: d, c: f, normal: new r.Vector3(), materialIndex: 0 };
          r.Triangle.getNormal(s, i, o, t.normal), (g.face = t), (g.faceIndex = h);
        }
        return g;
      }
      function d(t, e, n, r, s) {
        const i = 3 * r,
          o = t.index.getX(i),
          a = t.index.getX(i + 1),
          c = t.index.getX(i + 2),
          l = h(n, t.attributes.position, t.attributes.uv, o, a, c, e);
        return l ? ((l.faceIndex = r), s && s.push(l), l) : null;
      }
      function f(t, e, n, r, s, i) {
        for (let o = r, a = r + s; o < a; o++) d(t, e, n, o, i);
      }
      function p(t, e, n, r, s) {
        let i = 1 / 0,
          o = null;
        for (let a = r, c = r + s; a < c; a++) {
          const r = d(t, e, n, a);
          r && r.distance < i && ((o = r), (i = r.distance));
        }
        return o;
      }
      function g(t, e, n) {
        return null === t
          ? null
          : (t.point.applyMatrix4(e.matrixWorld),
            (t.distance = t.point.distanceTo(n.ray.origin)),
            (t.object = e),
            t.distance < n.near || t.distance > n.far ? null : t);
      }
    },
  },
]);
