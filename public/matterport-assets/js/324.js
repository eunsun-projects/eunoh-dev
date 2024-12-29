/*! For license information please see 324.js.LICENSE.txt */
(self.webpackChunkmp_webgl = self.webpackChunkmp_webgl || []).push([
  [324, 625],
  {
    36625: (e, t) => {
      var i;
      (t = e.exports = h),
        (i =
          'object' == typeof process &&
          process.env &&
          process.env.NODE_DEBUG &&
          /\bsemver\b/i.test(process.env.NODE_DEBUG)
            ? function () {
                var e = Array.prototype.slice.call(arguments, 0);
                e.unshift('SEMVER'), console.log.apply(console, e);
              }
            : function () {}),
        (t.SEMVER_SPEC_VERSION = '2.0.0');
      var r = Number.MAX_SAFE_INTEGER || 9007199254740991,
        n = (t.re = []),
        s = (t.src = []),
        o = (t.tokens = {}),
        a = 0;
      function l(e) {
        o[e] = a++;
      }
      l('NUMERICIDENTIFIER'),
        (s[o.NUMERICIDENTIFIER] = '0|[1-9]\\d*'),
        l('NUMERICIDENTIFIERLOOSE'),
        (s[o.NUMERICIDENTIFIERLOOSE] = '[0-9]+'),
        l('NONNUMERICIDENTIFIER'),
        (s[o.NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*'),
        l('MAINVERSION'),
        (s[o.MAINVERSION] =
          '(' +
          s[o.NUMERICIDENTIFIER] +
          ')\\.(' +
          s[o.NUMERICIDENTIFIER] +
          ')\\.(' +
          s[o.NUMERICIDENTIFIER] +
          ')'),
        l('MAINVERSIONLOOSE'),
        (s[o.MAINVERSIONLOOSE] =
          '(' +
          s[o.NUMERICIDENTIFIERLOOSE] +
          ')\\.(' +
          s[o.NUMERICIDENTIFIERLOOSE] +
          ')\\.(' +
          s[o.NUMERICIDENTIFIERLOOSE] +
          ')'),
        l('PRERELEASEIDENTIFIER'),
        (s[o.PRERELEASEIDENTIFIER] =
          '(?:' + s[o.NUMERICIDENTIFIER] + '|' + s[o.NONNUMERICIDENTIFIER] + ')'),
        l('PRERELEASEIDENTIFIERLOOSE'),
        (s[o.PRERELEASEIDENTIFIERLOOSE] =
          '(?:' + s[o.NUMERICIDENTIFIERLOOSE] + '|' + s[o.NONNUMERICIDENTIFIER] + ')'),
        l('PRERELEASE'),
        (s[o.PRERELEASE] =
          '(?:-(' + s[o.PRERELEASEIDENTIFIER] + '(?:\\.' + s[o.PRERELEASEIDENTIFIER] + ')*))'),
        l('PRERELEASELOOSE'),
        (s[o.PRERELEASELOOSE] =
          '(?:-?(' +
          s[o.PRERELEASEIDENTIFIERLOOSE] +
          '(?:\\.' +
          s[o.PRERELEASEIDENTIFIERLOOSE] +
          ')*))'),
        l('BUILDIDENTIFIER'),
        (s[o.BUILDIDENTIFIER] = '[0-9A-Za-z-]+'),
        l('BUILD'),
        (s[o.BUILD] = '(?:\\+(' + s[o.BUILDIDENTIFIER] + '(?:\\.' + s[o.BUILDIDENTIFIER] + ')*))'),
        l('FULL'),
        l('FULLPLAIN'),
        (s[o.FULLPLAIN] = 'v?' + s[o.MAINVERSION] + s[o.PRERELEASE] + '?' + s[o.BUILD] + '?'),
        (s[o.FULL] = '^' + s[o.FULLPLAIN] + '$'),
        l('LOOSEPLAIN'),
        (s[o.LOOSEPLAIN] =
          '[v=\\s]*' + s[o.MAINVERSIONLOOSE] + s[o.PRERELEASELOOSE] + '?' + s[o.BUILD] + '?'),
        l('LOOSE'),
        (s[o.LOOSE] = '^' + s[o.LOOSEPLAIN] + '$'),
        l('GTLT'),
        (s[o.GTLT] = '((?:<|>)?=?)'),
        l('XRANGEIDENTIFIERLOOSE'),
        (s[o.XRANGEIDENTIFIERLOOSE] = s[o.NUMERICIDENTIFIERLOOSE] + '|x|X|\\*'),
        l('XRANGEIDENTIFIER'),
        (s[o.XRANGEIDENTIFIER] = s[o.NUMERICIDENTIFIER] + '|x|X|\\*'),
        l('XRANGEPLAIN'),
        (s[o.XRANGEPLAIN] =
          '[v=\\s]*(' +
          s[o.XRANGEIDENTIFIER] +
          ')(?:\\.(' +
          s[o.XRANGEIDENTIFIER] +
          ')(?:\\.(' +
          s[o.XRANGEIDENTIFIER] +
          ')(?:' +
          s[o.PRERELEASE] +
          ')?' +
          s[o.BUILD] +
          '?)?)?'),
        l('XRANGEPLAINLOOSE'),
        (s[o.XRANGEPLAINLOOSE] =
          '[v=\\s]*(' +
          s[o.XRANGEIDENTIFIERLOOSE] +
          ')(?:\\.(' +
          s[o.XRANGEIDENTIFIERLOOSE] +
          ')(?:\\.(' +
          s[o.XRANGEIDENTIFIERLOOSE] +
          ')(?:' +
          s[o.PRERELEASELOOSE] +
          ')?' +
          s[o.BUILD] +
          '?)?)?'),
        l('XRANGE'),
        (s[o.XRANGE] = '^' + s[o.GTLT] + '\\s*' + s[o.XRANGEPLAIN] + '$'),
        l('XRANGELOOSE'),
        (s[o.XRANGELOOSE] = '^' + s[o.GTLT] + '\\s*' + s[o.XRANGEPLAINLOOSE] + '$'),
        l('COERCE'),
        (s[o.COERCE] = '(^|[^\\d])(\\d{1,16})(?:\\.(\\d{1,16}))?(?:\\.(\\d{1,16}))?(?:$|[^\\d])'),
        l('COERCERTL'),
        (n[o.COERCERTL] = new RegExp(s[o.COERCE], 'g')),
        l('LONETILDE'),
        (s[o.LONETILDE] = '(?:~>?)'),
        l('TILDETRIM'),
        (s[o.TILDETRIM] = '(\\s*)' + s[o.LONETILDE] + '\\s+'),
        (n[o.TILDETRIM] = new RegExp(s[o.TILDETRIM], 'g'));
      l('TILDE'),
        (s[o.TILDE] = '^' + s[o.LONETILDE] + s[o.XRANGEPLAIN] + '$'),
        l('TILDELOOSE'),
        (s[o.TILDELOOSE] = '^' + s[o.LONETILDE] + s[o.XRANGEPLAINLOOSE] + '$'),
        l('LONECARET'),
        (s[o.LONECARET] = '(?:\\^)'),
        l('CARETTRIM'),
        (s[o.CARETTRIM] = '(\\s*)' + s[o.LONECARET] + '\\s+'),
        (n[o.CARETTRIM] = new RegExp(s[o.CARETTRIM], 'g'));
      l('CARET'),
        (s[o.CARET] = '^' + s[o.LONECARET] + s[o.XRANGEPLAIN] + '$'),
        l('CARETLOOSE'),
        (s[o.CARETLOOSE] = '^' + s[o.LONECARET] + s[o.XRANGEPLAINLOOSE] + '$'),
        l('COMPARATORLOOSE'),
        (s[o.COMPARATORLOOSE] = '^' + s[o.GTLT] + '\\s*(' + s[o.LOOSEPLAIN] + ')$|^$'),
        l('COMPARATOR'),
        (s[o.COMPARATOR] = '^' + s[o.GTLT] + '\\s*(' + s[o.FULLPLAIN] + ')$|^$'),
        l('COMPARATORTRIM'),
        (s[o.COMPARATORTRIM] =
          '(\\s*)' + s[o.GTLT] + '\\s*(' + s[o.LOOSEPLAIN] + '|' + s[o.XRANGEPLAIN] + ')'),
        (n[o.COMPARATORTRIM] = new RegExp(s[o.COMPARATORTRIM], 'g'));
      l('HYPHENRANGE'),
        (s[o.HYPHENRANGE] =
          '^\\s*(' + s[o.XRANGEPLAIN] + ')\\s+-\\s+(' + s[o.XRANGEPLAIN] + ')\\s*$'),
        l('HYPHENRANGELOOSE'),
        (s[o.HYPHENRANGELOOSE] =
          '^\\s*(' + s[o.XRANGEPLAINLOOSE] + ')\\s+-\\s+(' + s[o.XRANGEPLAINLOOSE] + ')\\s*$'),
        l('STAR'),
        (s[o.STAR] = '(<|>)?=?\\s*\\*');
      for (var c = 0; c < a; c++) i(c, s[c]), n[c] || (n[c] = new RegExp(s[c]));
      function u(e, t) {
        if (
          ((t && 'object' == typeof t) || (t = { loose: !!t, includePrerelease: !1 }),
          e instanceof h)
        )
          return e;
        if ('string' != typeof e) return null;
        if (e.length > 256) return null;
        if (!(t.loose ? n[o.LOOSE] : n[o.FULL]).test(e)) return null;
        try {
          return new h(e, t);
        } catch (e) {
          return null;
        }
      }
      function h(e, t) {
        if (
          ((t && 'object' == typeof t) || (t = { loose: !!t, includePrerelease: !1 }),
          e instanceof h)
        ) {
          if (e.loose === t.loose) return e;
          e = e.version;
        } else if ('string' != typeof e) throw new TypeError('Invalid Version: ' + e);
        if (e.length > 256) throw new TypeError('version is longer than 256 characters');
        if (!(this instanceof h)) return new h(e, t);
        i('SemVer', e, t), (this.options = t), (this.loose = !!t.loose);
        var s = e.trim().match(t.loose ? n[o.LOOSE] : n[o.FULL]);
        if (!s) throw new TypeError('Invalid Version: ' + e);
        if (
          ((this.raw = e),
          (this.major = +s[1]),
          (this.minor = +s[2]),
          (this.patch = +s[3]),
          this.major > r || this.major < 0)
        )
          throw new TypeError('Invalid major version');
        if (this.minor > r || this.minor < 0) throw new TypeError('Invalid minor version');
        if (this.patch > r || this.patch < 0) throw new TypeError('Invalid patch version');
        s[4]
          ? (this.prerelease = s[4].split('.').map(function (e) {
              if (/^[0-9]+$/.test(e)) {
                var t = +e;
                if (t >= 0 && t < r) return t;
              }
              return e;
            }))
          : (this.prerelease = []),
          (this.build = s[5] ? s[5].split('.') : []),
          this.format();
      }
      (t.parse = u),
        (t.valid = function (e, t) {
          var i = u(e, t);
          return i ? i.version : null;
        }),
        (t.clean = function (e, t) {
          var i = u(e.trim().replace(/^[=v]+/, ''), t);
          return i ? i.version : null;
        }),
        (t.SemVer = h),
        (h.prototype.format = function () {
          return (
            (this.version = this.major + '.' + this.minor + '.' + this.patch),
            this.prerelease.length && (this.version += '-' + this.prerelease.join('.')),
            this.version
          );
        }),
        (h.prototype.toString = function () {
          return this.version;
        }),
        (h.prototype.compare = function (e) {
          return (
            i('SemVer.compare', this.version, this.options, e),
            e instanceof h || (e = new h(e, this.options)),
            this.compareMain(e) || this.comparePre(e)
          );
        }),
        (h.prototype.compareMain = function (e) {
          return (
            e instanceof h || (e = new h(e, this.options)),
            d(this.major, e.major) || d(this.minor, e.minor) || d(this.patch, e.patch)
          );
        }),
        (h.prototype.comparePre = function (e) {
          if (
            (e instanceof h || (e = new h(e, this.options)),
            this.prerelease.length && !e.prerelease.length)
          )
            return -1;
          if (!this.prerelease.length && e.prerelease.length) return 1;
          if (!this.prerelease.length && !e.prerelease.length) return 0;
          var t = 0;
          do {
            var r = this.prerelease[t],
              n = e.prerelease[t];
            if ((i('prerelease compare', t, r, n), void 0 === r && void 0 === n)) return 0;
            if (void 0 === n) return 1;
            if (void 0 === r) return -1;
            if (r !== n) return d(r, n);
          } while (++t);
        }),
        (h.prototype.compareBuild = function (e) {
          e instanceof h || (e = new h(e, this.options));
          var t = 0;
          do {
            var r = this.build[t],
              n = e.build[t];
            if ((i('prerelease compare', t, r, n), void 0 === r && void 0 === n)) return 0;
            if (void 0 === n) return 1;
            if (void 0 === r) return -1;
            if (r !== n) return d(r, n);
          } while (++t);
        }),
        (h.prototype.inc = function (e, t) {
          switch (e) {
            case 'premajor':
              (this.prerelease.length = 0),
                (this.patch = 0),
                (this.minor = 0),
                this.major++,
                this.inc('pre', t);
              break;
            case 'preminor':
              (this.prerelease.length = 0), (this.patch = 0), this.minor++, this.inc('pre', t);
              break;
            case 'prepatch':
              (this.prerelease.length = 0), this.inc('patch', t), this.inc('pre', t);
              break;
            case 'prerelease':
              0 === this.prerelease.length && this.inc('patch', t), this.inc('pre', t);
              break;
            case 'major':
              (0 === this.minor && 0 === this.patch && 0 !== this.prerelease.length) ||
                this.major++,
                (this.minor = 0),
                (this.patch = 0),
                (this.prerelease = []);
              break;
            case 'minor':
              (0 === this.patch && 0 !== this.prerelease.length) || this.minor++,
                (this.patch = 0),
                (this.prerelease = []);
              break;
            case 'patch':
              0 === this.prerelease.length && this.patch++, (this.prerelease = []);
              break;
            case 'pre':
              if (0 === this.prerelease.length) this.prerelease = [0];
              else {
                for (var i = this.prerelease.length; --i >= 0; )
                  'number' == typeof this.prerelease[i] && (this.prerelease[i]++, (i = -2));
                -1 === i && this.prerelease.push(0);
              }
              t &&
                (this.prerelease[0] === t
                  ? isNaN(this.prerelease[1]) && (this.prerelease = [t, 0])
                  : (this.prerelease = [t, 0]));
              break;
            default:
              throw new Error('invalid increment argument: ' + e);
          }
          return this.format(), (this.raw = this.version), this;
        }),
        (t.inc = function (e, t, i, r) {
          'string' == typeof i && ((r = i), (i = void 0));
          try {
            return new h(e, i).inc(t, r).version;
          } catch (e) {
            return null;
          }
        }),
        (t.diff = function (e, t) {
          if (v(e, t)) return null;
          var i = u(e),
            r = u(t),
            n = '';
          if (i.prerelease.length || r.prerelease.length) {
            n = 'pre';
            var s = 'prerelease';
          }
          for (var o in i)
            if (('major' === o || 'minor' === o || 'patch' === o) && i[o] !== r[o]) return n + o;
          return s;
        }),
        (t.compareIdentifiers = d);
      var p = /^[0-9]+$/;
      function d(e, t) {
        var i = p.test(e),
          r = p.test(t);
        return (
          i && r && ((e = +e), (t = +t)), e === t ? 0 : i && !r ? -1 : r && !i ? 1 : e < t ? -1 : 1
        );
      }
      function f(e, t, i) {
        return new h(e, i).compare(new h(t, i));
      }
      function E(e, t, i) {
        return f(e, t, i) > 0;
      }
      function g(e, t, i) {
        return f(e, t, i) < 0;
      }
      function v(e, t, i) {
        return 0 === f(e, t, i);
      }
      function m(e, t, i) {
        return 0 !== f(e, t, i);
      }
      function I(e, t, i) {
        return f(e, t, i) >= 0;
      }
      function R(e, t, i) {
        return f(e, t, i) <= 0;
      }
      function O(e, t, i, r) {
        switch (t) {
          case '===':
            return (
              'object' == typeof e && (e = e.version),
              'object' == typeof i && (i = i.version),
              e === i
            );
          case '!==':
            return (
              'object' == typeof e && (e = e.version),
              'object' == typeof i && (i = i.version),
              e !== i
            );
          case '':
          case '=':
          case '==':
            return v(e, i, r);
          case '!=':
            return m(e, i, r);
          case '>':
            return E(e, i, r);
          case '>=':
            return I(e, i, r);
          case '<':
            return g(e, i, r);
          case '<=':
            return R(e, i, r);
          default:
            throw new TypeError('Invalid operator: ' + t);
        }
      }
      function L(e, t) {
        if (
          ((t && 'object' == typeof t) || (t = { loose: !!t, includePrerelease: !1 }),
          e instanceof L)
        ) {
          if (e.loose === !!t.loose) return e;
          e = e.value;
        }
        if (!(this instanceof L)) return new L(e, t);
        i('comparator', e, t),
          (this.options = t),
          (this.loose = !!t.loose),
          this.parse(e),
          this.semver === y
            ? (this.value = '')
            : (this.value = this.operator + this.semver.version),
          i('comp', this);
      }
      (t.rcompareIdentifiers = function (e, t) {
        return d(t, e);
      }),
        (t.major = function (e, t) {
          return new h(e, t).major;
        }),
        (t.minor = function (e, t) {
          return new h(e, t).minor;
        }),
        (t.patch = function (e, t) {
          return new h(e, t).patch;
        }),
        (t.compare = f),
        (t.compareLoose = function (e, t) {
          return f(e, t, !0);
        }),
        (t.compareBuild = function (e, t, i) {
          var r = new h(e, i),
            n = new h(t, i);
          return r.compare(n) || r.compareBuild(n);
        }),
        (t.rcompare = function (e, t, i) {
          return f(t, e, i);
        }),
        (t.sort = function (e, i) {
          return e.sort(function (e, r) {
            return t.compareBuild(e, r, i);
          });
        }),
        (t.rsort = function (e, i) {
          return e.sort(function (e, r) {
            return t.compareBuild(r, e, i);
          });
        }),
        (t.gt = E),
        (t.lt = g),
        (t.eq = v),
        (t.neq = m),
        (t.gte = I),
        (t.lte = R),
        (t.cmp = O),
        (t.Comparator = L);
      var y = {};
      function N(e, t) {
        if (
          ((t && 'object' == typeof t) || (t = { loose: !!t, includePrerelease: !1 }),
          e instanceof N)
        )
          return e.loose === !!t.loose && e.includePrerelease === !!t.includePrerelease
            ? e
            : new N(e.raw, t);
        if (e instanceof L) return new N(e.value, t);
        if (!(this instanceof N)) return new N(e, t);
        if (
          ((this.options = t),
          (this.loose = !!t.loose),
          (this.includePrerelease = !!t.includePrerelease),
          (this.raw = e),
          (this.set = e
            .split(/\s*\|\|\s*/)
            .map(function (e) {
              return this.parseRange(e.trim());
            }, this)
            .filter(function (e) {
              return e.length;
            })),
          !this.set.length)
        )
          throw new TypeError('Invalid SemVer Range: ' + e);
        this.format();
      }
      function T(e, t) {
        for (var i = !0, r = e.slice(), n = r.pop(); i && r.length; )
          (i = r.every(function (e) {
            return n.intersects(e, t);
          })),
            (n = r.pop());
        return i;
      }
      function A(e) {
        return !e || 'x' === e.toLowerCase() || '*' === e;
      }
      function w(e, t, i, r, n, s, o, a, l, c, u, h, p) {
        return (
          (t = A(i) ? '' : A(r) ? '>=' + i + '.0.0' : A(n) ? '>=' + i + '.' + r + '.0' : '>=' + t) +
          ' ' +
          (a = A(l)
            ? ''
            : A(c)
              ? '<' + (+l + 1) + '.0.0'
              : A(u)
                ? '<' + l + '.' + (+c + 1) + '.0'
                : h
                  ? '<=' + l + '.' + c + '.' + u + '-' + h
                  : '<=' + a)
        ).trim();
      }
      function S(e, t, r) {
        for (var n = 0; n < e.length; n++) if (!e[n].test(t)) return !1;
        if (t.prerelease.length && !r.includePrerelease) {
          for (n = 0; n < e.length; n++)
            if ((i(e[n].semver), e[n].semver !== y && e[n].semver.prerelease.length > 0)) {
              var s = e[n].semver;
              if (s.major === t.major && s.minor === t.minor && s.patch === t.patch) return !0;
            }
          return !1;
        }
        return !0;
      }
      function C(e, t, i) {
        try {
          t = new N(t, i);
        } catch (e) {
          return !1;
        }
        return t.test(e);
      }
      function D(e, t, i, r) {
        var n, s, o, a, l;
        switch (((e = new h(e, r)), (t = new N(t, r)), i)) {
          case '>':
            (n = E), (s = R), (o = g), (a = '>'), (l = '>=');
            break;
          case '<':
            (n = g), (s = I), (o = E), (a = '<'), (l = '<=');
            break;
          default:
            throw new TypeError('Must provide a hilo val of "<" or ">"');
        }
        if (C(e, t, r)) return !1;
        for (var c = 0; c < t.set.length; ++c) {
          var u = t.set[c],
            p = null,
            d = null;
          if (
            (u.forEach(function (e) {
              e.semver === y && (e = new L('>=0.0.0')),
                (p = p || e),
                (d = d || e),
                n(e.semver, p.semver, r) ? (p = e) : o(e.semver, d.semver, r) && (d = e);
            }),
            p.operator === a || p.operator === l)
          )
            return !1;
          if ((!d.operator || d.operator === a) && s(e, d.semver)) return !1;
          if (d.operator === l && o(e, d.semver)) return !1;
        }
        return !0;
      }
      (L.prototype.parse = function (e) {
        var t = this.options.loose ? n[o.COMPARATORLOOSE] : n[o.COMPARATOR],
          i = e.match(t);
        if (!i) throw new TypeError('Invalid comparator: ' + e);
        (this.operator = void 0 !== i[1] ? i[1] : ''),
          '=' === this.operator && (this.operator = ''),
          i[2] ? (this.semver = new h(i[2], this.options.loose)) : (this.semver = y);
      }),
        (L.prototype.toString = function () {
          return this.value;
        }),
        (L.prototype.test = function (e) {
          if ((i('Comparator.test', e, this.options.loose), this.semver === y || e === y))
            return !0;
          if ('string' == typeof e)
            try {
              e = new h(e, this.options);
            } catch (e) {
              return !1;
            }
          return O(e, this.operator, this.semver, this.options);
        }),
        (L.prototype.intersects = function (e, t) {
          if (!(e instanceof L)) throw new TypeError('a Comparator is required');
          var i;
          if (
            ((t && 'object' == typeof t) || (t = { loose: !!t, includePrerelease: !1 }),
            '' === this.operator)
          )
            return '' === this.value || ((i = new N(e.value, t)), C(this.value, i, t));
          if ('' === e.operator)
            return '' === e.value || ((i = new N(this.value, t)), C(e.semver, i, t));
          var r = !(
              ('>=' !== this.operator && '>' !== this.operator) ||
              ('>=' !== e.operator && '>' !== e.operator)
            ),
            n = !(
              ('<=' !== this.operator && '<' !== this.operator) ||
              ('<=' !== e.operator && '<' !== e.operator)
            ),
            s = this.semver.version === e.semver.version,
            o = !(
              ('>=' !== this.operator && '<=' !== this.operator) ||
              ('>=' !== e.operator && '<=' !== e.operator)
            ),
            a =
              O(this.semver, '<', e.semver, t) &&
              ('>=' === this.operator || '>' === this.operator) &&
              ('<=' === e.operator || '<' === e.operator),
            l =
              O(this.semver, '>', e.semver, t) &&
              ('<=' === this.operator || '<' === this.operator) &&
              ('>=' === e.operator || '>' === e.operator);
          return r || n || (s && o) || a || l;
        }),
        (t.Range = N),
        (N.prototype.format = function () {
          return (
            (this.range = this.set
              .map(function (e) {
                return e.join(' ').trim();
              })
              .join('||')
              .trim()),
            this.range
          );
        }),
        (N.prototype.toString = function () {
          return this.range;
        }),
        (N.prototype.parseRange = function (e) {
          var t = this.options.loose;
          e = e.trim();
          var r = t ? n[o.HYPHENRANGELOOSE] : n[o.HYPHENRANGE];
          (e = e.replace(r, w)),
            i('hyphen replace', e),
            (e = e.replace(n[o.COMPARATORTRIM], '$1$2$3')),
            i('comparator trim', e, n[o.COMPARATORTRIM]),
            (e = (e = (e = e.replace(n[o.TILDETRIM], '$1~')).replace(n[o.CARETTRIM], '$1^'))
              .split(/\s+/)
              .join(' '));
          var s = t ? n[o.COMPARATORLOOSE] : n[o.COMPARATOR],
            a = e
              .split(' ')
              .map(function (e) {
                return (function (e, t) {
                  return (
                    i('comp', e, t),
                    (e = (function (e, t) {
                      return e
                        .trim()
                        .split(/\s+/)
                        .map(function (e) {
                          return (function (e, t) {
                            i('caret', e, t);
                            var r = t.loose ? n[o.CARETLOOSE] : n[o.CARET];
                            return e.replace(r, function (t, r, n, s, o) {
                              var a;
                              return (
                                i('caret', e, t, r, n, s, o),
                                A(r)
                                  ? (a = '')
                                  : A(n)
                                    ? (a = '>=' + r + '.0.0 <' + (+r + 1) + '.0.0')
                                    : A(s)
                                      ? (a =
                                          '0' === r
                                            ? '>=' +
                                              r +
                                              '.' +
                                              n +
                                              '.0 <' +
                                              r +
                                              '.' +
                                              (+n + 1) +
                                              '.0'
                                            : '>=' + r + '.' + n + '.0 <' + (+r + 1) + '.0.0')
                                      : o
                                        ? (i('replaceCaret pr', o),
                                          (a =
                                            '0' === r
                                              ? '0' === n
                                                ? '>=' +
                                                  r +
                                                  '.' +
                                                  n +
                                                  '.' +
                                                  s +
                                                  '-' +
                                                  o +
                                                  ' <' +
                                                  r +
                                                  '.' +
                                                  n +
                                                  '.' +
                                                  (+s + 1)
                                                : '>=' +
                                                  r +
                                                  '.' +
                                                  n +
                                                  '.' +
                                                  s +
                                                  '-' +
                                                  o +
                                                  ' <' +
                                                  r +
                                                  '.' +
                                                  (+n + 1) +
                                                  '.0'
                                              : '>=' +
                                                r +
                                                '.' +
                                                n +
                                                '.' +
                                                s +
                                                '-' +
                                                o +
                                                ' <' +
                                                (+r + 1) +
                                                '.0.0'))
                                        : (i('no pr'),
                                          (a =
                                            '0' === r
                                              ? '0' === n
                                                ? '>=' +
                                                  r +
                                                  '.' +
                                                  n +
                                                  '.' +
                                                  s +
                                                  ' <' +
                                                  r +
                                                  '.' +
                                                  n +
                                                  '.' +
                                                  (+s + 1)
                                                : '>=' +
                                                  r +
                                                  '.' +
                                                  n +
                                                  '.' +
                                                  s +
                                                  ' <' +
                                                  r +
                                                  '.' +
                                                  (+n + 1) +
                                                  '.0'
                                              : '>=' +
                                                r +
                                                '.' +
                                                n +
                                                '.' +
                                                s +
                                                ' <' +
                                                (+r + 1) +
                                                '.0.0')),
                                i('caret return', a),
                                a
                              );
                            });
                          })(e, t);
                        })
                        .join(' ');
                    })(e, t)),
                    i('caret', e),
                    (e = (function (e, t) {
                      return e
                        .trim()
                        .split(/\s+/)
                        .map(function (e) {
                          return (function (e, t) {
                            var r = t.loose ? n[o.TILDELOOSE] : n[o.TILDE];
                            return e.replace(r, function (t, r, n, s, o) {
                              var a;
                              return (
                                i('tilde', e, t, r, n, s, o),
                                A(r)
                                  ? (a = '')
                                  : A(n)
                                    ? (a = '>=' + r + '.0.0 <' + (+r + 1) + '.0.0')
                                    : A(s)
                                      ? (a =
                                          '>=' + r + '.' + n + '.0 <' + r + '.' + (+n + 1) + '.0')
                                      : o
                                        ? (i('replaceTilde pr', o),
                                          (a =
                                            '>=' +
                                            r +
                                            '.' +
                                            n +
                                            '.' +
                                            s +
                                            '-' +
                                            o +
                                            ' <' +
                                            r +
                                            '.' +
                                            (+n + 1) +
                                            '.0'))
                                        : (a =
                                            '>=' +
                                            r +
                                            '.' +
                                            n +
                                            '.' +
                                            s +
                                            ' <' +
                                            r +
                                            '.' +
                                            (+n + 1) +
                                            '.0'),
                                i('tilde return', a),
                                a
                              );
                            });
                          })(e, t);
                        })
                        .join(' ');
                    })(e, t)),
                    i('tildes', e),
                    (e = (function (e, t) {
                      return (
                        i('replaceXRanges', e, t),
                        e
                          .split(/\s+/)
                          .map(function (e) {
                            return (function (e, t) {
                              e = e.trim();
                              var r = t.loose ? n[o.XRANGELOOSE] : n[o.XRANGE];
                              return e.replace(r, function (r, n, s, o, a, l) {
                                i('xRange', e, r, n, s, o, a, l);
                                var c = A(s),
                                  u = c || A(o),
                                  h = u || A(a),
                                  p = h;
                                return (
                                  '=' === n && p && (n = ''),
                                  (l = t.includePrerelease ? '-0' : ''),
                                  c
                                    ? (r = '>' === n || '<' === n ? '<0.0.0-0' : '*')
                                    : n && p
                                      ? (u && (o = 0),
                                        (a = 0),
                                        '>' === n
                                          ? ((n = '>='),
                                            u
                                              ? ((s = +s + 1), (o = 0), (a = 0))
                                              : ((o = +o + 1), (a = 0)))
                                          : '<=' === n &&
                                            ((n = '<'), u ? (s = +s + 1) : (o = +o + 1)),
                                        (r = n + s + '.' + o + '.' + a + l))
                                      : u
                                        ? (r = '>=' + s + '.0.0' + l + ' <' + (+s + 1) + '.0.0' + l)
                                        : h &&
                                          (r =
                                            '>=' +
                                            s +
                                            '.' +
                                            o +
                                            '.0' +
                                            l +
                                            ' <' +
                                            s +
                                            '.' +
                                            (+o + 1) +
                                            '.0' +
                                            l),
                                  i('xRange return', r),
                                  r
                                );
                              });
                            })(e, t);
                          })
                          .join(' ')
                      );
                    })(e, t)),
                    i('xrange', e),
                    (e = (function (e, t) {
                      return i('replaceStars', e, t), e.trim().replace(n[o.STAR], '');
                    })(e, t)),
                    i('stars', e),
                    e
                  );
                })(e, this.options);
              }, this)
              .join(' ')
              .split(/\s+/);
          return (
            this.options.loose &&
              (a = a.filter(function (e) {
                return !!e.match(s);
              })),
            (a = a.map(function (e) {
              return new L(e, this.options);
            }, this))
          );
        }),
        (N.prototype.intersects = function (e, t) {
          if (!(e instanceof N)) throw new TypeError('a Range is required');
          return this.set.some(function (i) {
            return (
              T(i, t) &&
              e.set.some(function (e) {
                return (
                  T(e, t) &&
                  i.every(function (i) {
                    return e.every(function (e) {
                      return i.intersects(e, t);
                    });
                  })
                );
              })
            );
          });
        }),
        (t.toComparators = function (e, t) {
          return new N(e, t).set.map(function (e) {
            return e
              .map(function (e) {
                return e.value;
              })
              .join(' ')
              .trim()
              .split(' ');
          });
        }),
        (N.prototype.test = function (e) {
          if (!e) return !1;
          if ('string' == typeof e)
            try {
              e = new h(e, this.options);
            } catch (e) {
              return !1;
            }
          for (var t = 0; t < this.set.length; t++) if (S(this.set[t], e, this.options)) return !0;
          return !1;
        }),
        (t.satisfies = C),
        (t.maxSatisfying = function (e, t, i) {
          var r = null,
            n = null;
          try {
            var s = new N(t, i);
          } catch (e) {
            return null;
          }
          return (
            e.forEach(function (e) {
              s.test(e) && ((r && -1 !== n.compare(e)) || (n = new h((r = e), i)));
            }),
            r
          );
        }),
        (t.minSatisfying = function (e, t, i) {
          var r = null,
            n = null;
          try {
            var s = new N(t, i);
          } catch (e) {
            return null;
          }
          return (
            e.forEach(function (e) {
              s.test(e) && ((r && 1 !== n.compare(e)) || (n = new h((r = e), i)));
            }),
            r
          );
        }),
        (t.minVersion = function (e, t) {
          e = new N(e, t);
          var i = new h('0.0.0');
          if (e.test(i)) return i;
          if (((i = new h('0.0.0-0')), e.test(i))) return i;
          i = null;
          for (var r = 0; r < e.set.length; ++r) {
            e.set[r].forEach(function (e) {
              var t = new h(e.semver.version);
              switch (e.operator) {
                case '>':
                  0 === t.prerelease.length ? t.patch++ : t.prerelease.push(0),
                    (t.raw = t.format());
                case '':
                case '>=':
                  (i && !E(i, t)) || (i = t);
                  break;
                case '<':
                case '<=':
                  break;
                default:
                  throw new Error('Unexpected operation: ' + e.operator);
              }
            });
          }
          if (i && e.test(i)) return i;
          return null;
        }),
        (t.validRange = function (e, t) {
          try {
            return new N(e, t).range || '*';
          } catch (e) {
            return null;
          }
        }),
        (t.ltr = function (e, t, i) {
          return D(e, t, '<', i);
        }),
        (t.gtr = function (e, t, i) {
          return D(e, t, '>', i);
        }),
        (t.outside = D),
        (t.prerelease = function (e, t) {
          var i = u(e, t);
          return i && i.prerelease.length ? i.prerelease : null;
        }),
        (t.intersects = function (e, t, i) {
          return (e = new N(e, i)), (t = new N(t, i)), e.intersects(t);
        }),
        (t.coerce = function (e, t) {
          if (e instanceof h) return e;
          'number' == typeof e && (e = String(e));
          if ('string' != typeof e) return null;
          var i = null;
          if ((t = t || {}).rtl) {
            for (
              var r;
              (r = n[o.COERCERTL].exec(e)) && (!i || i.index + i[0].length !== e.length);

            )
              (i && r.index + r[0].length === i.index + i[0].length) || (i = r),
                (n[o.COERCERTL].lastIndex = r.index + r[1].length + r[2].length);
            n[o.COERCERTL].lastIndex = -1;
          } else i = e.match(n[o.COERCE]);
          if (null === i) return null;
          return u(i[2] + '.' + (i[3] || '0') + '.' + (i[4] || '0'), t);
        });
    },
    13668: (e, t, i) => {
      'use strict';
      i.d(t, { Bl: () => c, Lm: () => l, Pi: () => o, RV: () => s, e_: () => a, v6: () => n });
      var r = i(56063);
      class n extends r.m {
        constructor(e) {
          super(), (this.payload = { exclude: e || [] });
        }
      }
      n.id = 'PLUGIN_RESET_ALL';
      class s extends r.m {
        constructor(e, t, i, r) {
          super(), (this.payload = { name: e, config: t, configMeta: i, permissions: r || {} });
        }
      }
      s.id = 'PLUGIN_RELOAD';
      class o extends r.m {
        constructor(e, t, i, r) {
          super(), (this.payload = { name: e, config: t, configMeta: i, permissions: r || {} });
        }
      }
      o.id = 'PLUGIN_LOAD';
      class a extends r.m {
        constructor(e) {
          super(), (this.payload = { name: e });
        }
      }
      a.id = 'PLUGIN_UNLOAD';
      class l extends r.m {
        constructor(e, t) {
          super(), (this.payload = { operation: e, callback: t });
        }
      }
      l.id = 'PLUGIN_CONFIG_FETCH_DATA';
      class c extends r.m {
        constructor(e, t) {
          super(), (this.payload = { attachmentId: e, pluginId: t });
        }
      }
      c.id = 'ATTACHMENT_ASSOCIATE_WITH_PLUGIN';
      class u extends r.m {
        constructor(e, t) {
          super(), (this.payload = { attachmentId: e, pluginId: t });
        }
      }
      u.id = 'ATTACHMENT_DISSOCIATE_FROM_PLUGIN';
    },
    21276: (e, t, i) => {
      'use strict';
      i.r(t),
        i.d(t, {
          FetchLevel: () => r.u6,
          PluginConfigData: () => r.iU,
          default: () => A,
          getPluginMetadataUrl: () => g,
          getPluginUrl: () => E,
          manifestEndpoint: () => r.OC,
        });
      var r = i(43822),
        n = i(24938),
        s = i(933),
        o = i(4763),
        a = i(43606);
      const l = '0.0';
      function c(e) {
        if (!e) return [];
        const t = { [l]: u }['0.0'];
        if (!t)
          throw new Error(
            `[PluginConfigDeserializer] Data with version "${e.version}": not recognized.`,
          );
        return t(e);
      }
      function u(e) {
        return e['0.0'];
      }
      const h = '0.0';
      function p(e) {
        const t = { [h]: d };
        if (!e) throw new Error('[PluginConfigSerializer] no data to serialize.');
        const i = t['0.0'];
        if (!i) throw new Error('[PluginConfigSerializer] Version "0.0" not recognized.');
        return i(e);
      }
      function d(e) {
        return { [h]: e };
      }
      class f extends a.MU {
        constructor(e, t, i) {
          super({
            queue: e,
            path: `${t}/api/v1/jsonstore/model/plugins/${i}`,
            batchUpdate: !0,
            deserialize: c,
            serialize: p,
          }),
            (this.config.cachedData = { data: null });
        }
      }
      function E(e, t, i) {
        return i + `${e}/${t}/${e}.js`;
      }
      function g(e, t, i) {
        return i + `${e}/${t}/plugin.json`;
      }
      const v = (e) => {
        var t, i, r;
        return null !==
          (r =
            null ===
              (i =
                null === (t = null == e ? void 0 : e.src) || void 0 === t
                  ? void 0
                  : t.match(/(\d+\.\d+\.\d+)\/[^\/]*\.js$/)) || void 0 === i
              ? void 0
              : i[1]) && void 0 !== r
          ? r
          : null;
      };
      var m = i(10765),
        I = i(44979),
        R = i(77609),
        O = i(36625),
        L = i(22925),
        y = i(13668),
        N = i(1055);
      const T = 'unknown-app-key';
      class A extends s.Y {
        constructor() {
          super(...arguments), (this.name = 'plugin-config'), (this._registryLoaded = !1);
        }
        get serviceSdkKey() {
          if (!this._applicationKey)
            throw new Error('[PluginConfigData] service key has not yet been set.');
          return this._applicationKey;
        }
        get canOverrideStrict() {
          var e, t;
          return null ===
            (t = null === (e = this._config) || void 0 === e ? void 0 : e.pluginPolicies) ||
            void 0 === t
            ? void 0
            : t.canDebug;
        }
        get registryLoaded() {
          return this._registryLoaded;
        }
        async init(e, t) {
          (this.queue = e.queue), (this.pluginConfigData = new r.iU()), (this._config = e);
          if (
            (([this._policyData, this._layersData] = await Promise.all([
              t.market.waitForData(I.n),
              t.market.waitForData(L.R),
            ])),
            e.pluginPolicies.enabled)
          ) {
            const i = (await t.getModuleBySymbol(o.Vs)).getApi(),
              r = await i.getAppKey('showcase', 'plugin');
            if (r instanceof Object) {
              const t = r;
              await this.initializePluginRegistry(t, e),
                await this.setupConfigStore(e.apiHostBaseUrl, e.modelId, false),
                (this._registryLoaded = !0);
            }
          }
          t.commandBinder.addBinding(y.Bl, async (e) => {
            var t, i;
            const r = (await this.pluginConfigData.getMdsResult()).find(
                (t) => t.name === e.pluginId,
              ),
              n =
                null !==
                  (i =
                    null === (t = null == r ? void 0 : r.attachments) || void 0 === t
                      ? void 0
                      : t.map((e) => e.id)) && void 0 !== i
                  ? i
                  : [];
            this.pluginConfigData.updateMds({
              name: e.pluginId,
              attachments: [...n, e.attachmentId],
            });
          }),
            t.market.register(this, r.iU, this.pluginConfigData);
        }
        async saveToMds(e) {
          var t;
          if (!this.pluginConfigData.mdsIsSetup)
            return void this.log.warn('Plugin changes will NOT be saved');
          const i = null !== (t = v(e)) && void 0 !== t ? t : '0.0.0';
          if (!this._manifest.find((t) => t.name === e.id && t.versions[i]))
            return void this.log.warn(
              `Version ${i} does not exist in registry. Changes not saved to MDS.`,
            );
          const r = [];
          e.config.photoUrl && r.push(e.config.photoUrl),
            e.config.logoUrl && r.push(e.config.logoUrl);
          const n = { name: e.id, version: i };
          r.length > 0 && (n.attachments = r), this.pluginConfigData.updateMds(n);
        }
        deleteFromMds(e) {
          this.pluginConfigData.mdsIsSetup
            ? this.pluginConfigData.deleteMdsById(e.id)
            : this.log.warn('Plugin changes will NOT be saved');
        }
        saveConfig(e, t) {
          const i = this.pluginConfigData.lastSavedConfiguration.values();
          this.log.debugInfo(`configuration for ${e.id} updated. ${JSON.stringify(i, void 0, 2)}`),
            e.enabled ? this.saveToMds(e) : this.deleteFromMds(e),
            this.currentStore.update(i);
        }
        async setupConfigStore(e, t, i) {
          let r;
          (this.currentStore = new f(this.queue, e, t)),
            this.pluginConfigData.setupConfigStore(this._layersData.mdsContext, i, e);
          try {
            (r = (await this.currentStore.read()) || []),
              this.log.debugWarn(`Saved configuration data loaded for ${r.length} plugin(s).`),
              this.log.debugInfo(JSON.stringify(r, void 0, 2));
          } catch (e) {
            (r = []), this.log.error('Failed to load configured plugins: ', e);
          }
          this.pluginConfigData.lastSavedConfiguration.replace(r),
            this.pluginConfigData.lastSavedConfiguration.onElementChanged({
              onAdded: this.saveConfig.bind(this),
              onUpdated: this.saveConfig.bind(this),
              onRemoved: this.deleteFromMds.bind(this),
            });
        }
        getAutoUpgradedVersion(e, t) {
          var i;
          const r = Object.keys(t.versions)
              .sort((e, t) => R.o.compare(t, e))
              .filter((e) => this.hasRequiredPolicies(t.versions[e].requiredPolicies)),
            n = null !== (i = O.maxSatisfying(r, `~${e}`)) && void 0 !== i ? i : e,
            s = t.currentVersion;
          let o = n;
          return O.gt(n, s) && (o = s), o;
        }
        dispose(e) {
          super.dispose(e), e.market.unregister(this, r.iU), (this.pluginConfigData = void 0);
        }
        async initializePluginRegistry(e, t) {
          const { manifestUrl: i, applicationKey: r } = this.getManifestUrl(e, t);
          this._applicationKey = r;
          const n = await this.queue
            .get(i, { responseType: 'json' })
            .catch((e) => (this.log.error(e), null));
          null !== n
            ? ((this._manifest = n), await this.populateFromManifest(n, e, r))
            : this.log.error('Plugin manifest could not be found, please contact support.');
        }
        getManifestUrl(e, t, i = !0) {
          var n;
          let s = this._config.apiHostBaseUrl + r.OC,
            o = e.applicationKey;
          if (this.pluginConfigData.pluginVersion) {
            const e =
              this.pluginConfigData.pluginVersion.match(
                /^(https?:\/\/)?(localhost|127.0.0.1)(:\d*)?(\/(\w+-)?manifest.json)?$/,
              ) || this.pluginConfigData.pluginVersion.match(/^(draft|edge|local)$/);
            if (e) {
              const t = ['draft', 'edge', 'local'].includes(e[1]),
                i = 'edge' === e[1],
                r = window.location.protocol + '//',
                o = t ? r : e[1] || r,
                a = t ? 'localhost' : e[2] || 'localhost',
                l = e[3] || ':8800',
                c = i ? '/edge-manifest.json' : e[4] || '/draft-manifest.json',
                u = null === (n = e[5]) || void 0 === n ? void 0 : n.slice(0, -1);
              (s = `${o}${a}${l}${c}?manifest=${u || 'true'}`),
                this.log.devInfo(`Using local manifest override: ${s}`),
                e[5] && this.log.devInfo('with specified plugin name', u);
            } else {
              const e = this.pluginConfigData.pluginVersion.match(
                /^(?:([a-zA-Z-]+)-)?\d+\.\d+\.\d+-\d+-g[0-9a-f]{7}/,
              );
              s += e
                ? `?v=${e[0]}&manifest=${e[1] || 'true'}`
                : `?v=${this.pluginConfigData.pluginVersion}&manifest=true`;
            }
          } else
            this.pluginConfigData.manifestUrl &&
            ((0, m.mM)(this.pluginConfigData.manifestUrl) || t.pluginPolicies.canDebug)
              ? (s = this.pluginConfigData.manifestUrl)
              : (s += '?manifest=true');
          return (
            this.log.devInfo(`Using manifest URL: ${s}`),
            (s.match(/localhost/) || s.match(/127.0.0.1/)) &&
              i &&
              !t.pluginPolicies.canDebug &&
              (o = T),
            { manifestUrl: s, applicationKey: o }
          );
        }
        async populateFromManifest(e, t, i) {
          const r = [];
          for (const n of e) r.push(this.registerManifestEntry(n, t, i));
          await Promise.all(r);
        }
        async registerManifestEntry(e, t, i) {
          var r, n, s;
          const o = this.findLatestPermittedVersion(e.versions, e.currentVersion);
          if (!o) return;
          e.currentVersion = o;
          const a = Object.assign(Object.assign({}, e), {
            src: e.src || E(e.name, e.currentVersion, t.baseUrl),
            meta: e.meta || g(e.name, e.currentVersion, t.baseUrl),
            icon: e.icon || '',
            applicationKey: e.applicationKey || i || T,
            fetchLevel:
              null !== (r = e.fetchLevel) && void 0 !== r
                ? r
                : this.pluginConfigData.defaultFetchLevel,
          });
          if (!(0, m.mM)(a.src) || !(0, m.mM)(a.meta)) return;
          const l = await this.queue.get(a.meta, { responseType: 'json' }).catch((e) => {
            this.log.error(e);
          });
          var c, u, h;
          l &&
            this.pluginConfigData.add({
              name: a.name,
              description: l.description,
              version: a.currentVersion,
              config: l.config || {},
              outputs: l.outputs || {},
              applicationKey: a.applicationKey || T,
              src: a.src,
              meta: a.meta,
              icon: (null === (n = l.options) || void 0 === n ? void 0 : n.icon)
                ? a.icon ||
                  ((c = e.name), (u = e.currentVersion), (h = t.baseUrl), h + `${c}/${u}/${c}.svg`)
                : void 0,
              enabled: !1,
              strict:
                this.canOverrideStrict && null !== this.pluginConfigData.defaultStrict
                  ? this.pluginConfigData.defaultStrict
                  : a.sesStrict,
              fetchLevel:
                null !== (s = a.fetchLevel) && void 0 !== s
                  ? s
                  : this.pluginConfigData.defaultFetchLevel,
              options: l.options,
              peerDependencies: l.peerDependencies,
            });
        }
        findLatestPermittedVersion(e, t) {
          const i = Object.keys(e).sort((e, t) => R.o.compare(t, e));
          for (const r of i) {
            const i = e[r].requiredPolicies;
            if (!R.o.gt(r, t) && this.hasRequiredPolicies(i)) return r;
          }
          return null;
        }
        hasRequiredPolicies(e) {
          if (!e || 0 === e.length) return !0;
          const t = this._config.pluginPolicies.groups || [],
            i = (e) =>
              -1 === e.indexOf('.') ? -1 !== t.indexOf(e) : this._policyData.hasPolicy(e);
          return e.reduce((e, t) => {
            if (!e) return e;
            if (t instanceof Object) {
              if ('or' === t.operator) return t.policies.some((e) => i(e));
              if ('xor' === t.operator) {
                let e = 0;
                return (
                  t.policies.forEach((t) => {
                    e += i(t) ? 1 : 0;
                  }),
                  1 === e
                );
              }
              return (
                this.log.warn(
                  `unrecognized required policy entry, operator: <${t.operator}> - plugin disabled`,
                ),
                !1
              );
            }
            return i(t);
          }, !0);
        }
        checkMLSMode(e, t, i, r) {
          var n;
          if (e) {
            if (!t.meta)
              return (
                this.log.warn(
                  `MLS mode requires plugin meta. Plugin meta URL missing from plugin "${null == r ? void 0 : r.id}"`,
                ),
                !1
              );
            if (
              !(null === (n = null == i ? void 0 : i.options) || void 0 === n
                ? void 0
                : n.mlsEnabled)
            )
              return (
                this.log.info(`Plugin "${null == r ? void 0 : r.id}" not allowed in MLS mode.`), !1
              );
          }
          return !0;
        }
        checkEditOnly(e, t, i) {
          var r;
          return (
            !(null === (r = null == t ? void 0 : t.options) || void 0 === r
              ? void 0
              : r.editOnly) ||
            e === n.Mx.WORKSHOP ||
            (this.log.info(
              `Plugin "${null == i ? void 0 : i.id}" is edit-only and cannot be loaded in Showcase.`,
            ),
            !1)
          );
        }
        updatePatchInProduction(e) {
          var t;
          const i = v(e),
            r = this._manifest.find((t) => t.name === e.id);
          if (i && r) {
            const n = this.getAutoUpgradedVersion(i, r);
            null !== n &&
              n !== i &&
              (this.log.debugInfo(`Replacing ${r.name} version ${i} with version ${n}`),
              (e.src = e.src.replace(i, n)),
              (e.meta = null === (t = e.meta) || void 0 === t ? void 0 : t.replace(i, n)));
          } else
            this.log.debugInfo(
              `Missing config version or manifest entry for ${e.id}. Not auto-updating patch for this plugin.`,
            );
        }
        async getConfiguredPlugins(e) {
          const t = (await this.currentStore.read()) || [],
            i = [],
            n = (0, N.eY)('mls', 0);
          return (
            t.forEach((t) => {
              var s, o, a, l;
              if (t.enabled) {
                const c = this.pluginConfigData.availablePlugins.get(t.id);
                let u = !(c && (!c || void 0 !== c.strict)) || c.strict;
                if (!c)
                  return (
                    this.log.warn(
                      `"${t.id}" plugin not found in current plugin manifest -- was it configured with a different one?`,
                    ),
                    void this.log.warn(
                      `Unrecognized plugin disallowed "${null == t ? void 0 : t.id}" cannot load from ${null == t ? void 0 : t.src}`,
                    )
                  );
                const h = {
                  config: t.config || {},
                  src: t.src || c.src,
                  meta: t.meta || c.meta,
                  id: t.id || c.name,
                  strict: u,
                  applicationKey: null == c ? void 0 : c.applicationKey,
                  fetchLevel:
                    null !== (s = null == c ? void 0 : c.fetchLevel) && void 0 !== s
                      ? s
                      : r.u6.None,
                  peerDependencies:
                    null !== (o = null == c ? void 0 : c.peerDependencies) && void 0 !== o ? o : {},
                };
                if (!this.checkMLSMode(n, h, c, t)) return;
                if (!this.checkEditOnly(e, c, t)) return;
                this.updatePatchInProduction(h),
                  (h.canPlaceInGrid =
                    (null === (a = null == c ? void 0 : c.options) || void 0 === a
                      ? void 0
                      : a.canPlaceInGrid) || !1),
                  (h.hideViewToggle =
                    (null === (l = null == c ? void 0 : c.options) || void 0 === l
                      ? void 0
                      : l.hideViewToggle) || !1),
                  i.push(h);
              }
            }),
            this.log.debugWarn(`Readied configuration data for ${i.length} plugin(s).`),
            this.log.debugInfo(JSON.stringify(i, void 0, 2)),
            i
          );
        }
      }
    },
    67944: (e, t, i) => {
      'use strict';
      i.d(t, { q: () => u });
      var r = i(42141),
        n = i(42896),
        s = i(53257),
        o = i(91033),
        a = i(83468),
        l = i(61173);
      const c = new s.Z('plugin-ui-data');
      class u extends r.V {
        constructor(e) {
          var t;
          super(),
            (this.parentMainDiv = e),
            (this.name = 'plugin-ui-data'),
            (this.overlayRoot = document.createElement('div')),
            (this.overlayRootAppended = !1),
            (this.pluginOverlayElements = new n.v()),
            (this.subs = []),
            (this.mobile = (0, l.tq)()),
            (this.watchedElement =
              null !== (t = this.parentMainDiv.getElementsByTagName('canvas')[0]) && void 0 !== t
                ? t
                : this.parentMainDiv),
            (this.createOverlayRoot = () => {
              this.overlayRootAppended ||
                (this.parentMainDiv.appendChild(this.overlayRoot),
                (this.overlayRootAppended = !0),
                (this.grid = a.E1.init(
                  {
                    column: 16,
                    margin: 0,
                    float: !0,
                    animate: !1,
                    row: 16,
                    alwaysShowResizeHandle: !0,
                    resizable: { handles: 'se, sw' },
                    children: [{ x: 0, y: 0, w: 4, h: 2, locked: !0, noMove: !0, noResize: !0 }],
                  },
                  this.overlayRoot,
                )),
                (this.resizeObserver = new o.Z(this.resizeHandler)),
                this.resizeObserver.observe(this.watchedElement));
            }),
            this.overlayRoot.classList.add('plugin-root-element', 'grid-stack'),
            this.initOverlayListeners(),
            (this.resizeHandler = this.handleResize.bind(this));
        }
        handleResize(e = []) {
          if (!e.length) return;
          const t = Math.floor(this.overlayRoot.clientHeight / 16);
          this.grid.cellHeight(t),
            (this.overlayRoot.style.width = `${this.watchedElement.clientWidth}px`);
        }
        registerOverlay(e, t, i) {
          this.pluginOverlayElements.set(e, t),
            i &&
              (this.grid
                ? this.grid.addWidget(t)
                : c.warn('tried to register an overlay, but gridstack not initialized yet'));
        }
        createOverlay(e, t = !1) {
          const i = document.createElement('div');
          return (
            i.classList.add('plugin-overlay'),
            i.classList.add(e),
            t &&
              (i.classList.add('grid-stack-item'),
              i.setAttribute('gs-min-w', this.mobile ? '2' : '1'),
              i.setAttribute('gs-min-h', this.mobile ? '2' : '1')),
            this.registerOverlay(e, i, t),
            i
          );
        }
        replaceOrCreateOverlay(e, t) {
          let i = this.pluginOverlayElements.get(e);
          if (
            (i &&
              (i.remove(),
              this.grid
                ? this.grid.removeWidget(i)
                : c.warn(
                    '[replaceOrCreate] tried to remove an overlay, but gridstack not initialized yet',
                  )),
            (i = this.createOverlay(e, t)),
            t)
          ) {
            const e = document.createElement('span');
            return e.classList.add('grid-stack-item-content'), i.appendChild(e), e;
          }
          return i;
        }
        getOverlay(e, t) {
          return this.replaceOrCreateOverlay(e, t.canPlaceInGrid).attachShadow({ mode: 'closed' });
        }
        initOverlayListeners() {
          c.info('init plugin UI overlay'),
            this.subs.push(
              this.pluginOverlayElements.onElementChanged({
                onAdded: (e, t) => {
                  c.debug('added plugin overlay', t),
                    this.createOverlayRoot(),
                    e && this.overlayRoot.appendChild(e);
                },
                onRemoved: (e, t) => {
                  c.debug('removed plugin overlay', t), e && e.remove();
                },
              }),
            );
        }
        disposeByKey(e) {
          this.pluginOverlayElements.delete(e);
        }
        dispose() {
          this.pluginOverlayElements.forEach((e, t) => {
            this.disposeByKey(t);
          }),
            this.subs.forEach((e) => e.cancel()),
            (this.subs = []),
            this.grid.destroy(),
            this.resizeObserver.disconnect(),
            (this.overlayRootAppended = !1),
            this.overlayRoot.remove();
        }
      }
    },
    19560: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => s });
      var r = i(933),
        n = i(67944);
      class s extends r.Y {
        constructor() {
          super(...arguments), (this.name = 'plugin-ui');
        }
        async init(e, t) {
          (this.engine = t),
            (this.pluginUiData = new n.q(e.mainDiv)),
            this.engine.market.register(this, n.q, this.pluginUiData);
        }
        dispose(e) {
          this.pluginUiData.dispose(), this.engine.market.unregister(this, n.q), super.dispose(e);
        }
      }
    },
    43606: (e, t, i) => {
      'use strict';
      i.d(t, { MU: () => a });
      var r,
        n = i(28721),
        s = i(85661);
      !(function (e) {
        (e.GET = 'GET'),
          (e.POST = 'POST'),
          (e.PATCH = 'PATCH'),
          (e.PUT = 'PUT'),
          (e.DELETE = 'DELETE'),
          (e.OPTIONS = 'OPTIONS');
      })(r || (r = {}));
      class o extends class {
        constructor() {
          this._options = { responseType: 'json' };
        }
        get options() {
          const e = this._options;
          return (e.headers = (0, s.m)(this.url, this._options.headers || {})), e;
        }
      } {
        constructor(e) {
          super(), (this.config = e), (this.url = e.path);
        }
        async read() {
          const { deserialize: e } = this.config;
          let t = null;
          return (
            this.config.cachedData && this.config.cachedData.data
              ? (t = this.config.cachedData.data)
              : ((t = await this.config.queue.get(this.config.path, this.options)),
                this.config.cachedData && (this.config.cachedData.data = t)),
            e(t)
          );
        }
        clearCache() {
          this.config.cachedData && (this.config.cachedData.data = null);
        }
      }
      class a extends o {
        constructor(e) {
          super(e),
            (this.config = e),
            (this.acceptsPartial = !1),
            (this.config.batchUpdate = 'batchUpdate' in this.config && this.config.batchUpdate);
        }
        async create(e) {
          throw Error('Not implemented');
        }
        updateBatch(e, t) {
          const { serialize: i } = this.config,
            n = [],
            s = [...new Set([...Object.keys(e), ...Object.keys(t)])];
          for (const i of s) {
            e[i] ||
              t[i] ||
              n.push(this.config.queue.delete(`${this.config.path}/${i}`, this.options));
          }
          const o = i(e, t),
            a = Object.assign(Object.assign({}, this.options), { body: o });
          return (
            n.push(
              this.config.queue.request(this.config.httpMethod || r.POST, this.config.path, a),
            ),
            Promise.all(n)
          );
        }
        updateInternal(e, t) {
          const { serialize: i } = this.config,
            s = [],
            o = Object.assign({}, this.options),
            a = Object.keys(e),
            l = Object.keys(t),
            c = (0, n.XN)(a.concat(l));
          for (const n in c) {
            const a = c[n],
              l = e[a] || t[a];
            if (l) {
              const e = {};
              e[a] = l;
              const n = {},
                c = t[a];
              c && (n[a] = c);
              const u = i(e, n);
              (o.body = u),
                s.push(
                  this.config.queue.request(this.config.httpMethod || r.POST, this.config.path, o),
                );
            } else s.push(this.config.queue.delete(`${this.config.path}/${a}`, this.options));
          }
          return Promise.all(s);
        }
        async update(e, t) {
          this.clearCache(),
            await (this.config.batchUpdate
              ? this.updateBatch(e, t || {})
              : this.updateInternal(e, t || {}));
        }
        async delete(e) {
          throw Error('Not implemented');
        }
      }
    },
  },
]);
