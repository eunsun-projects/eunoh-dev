/*! For license information please see 625.js.LICENSE.txt */
(self.webpackChunkmp_webgl = self.webpackChunkmp_webgl || []).push([
  [625],
  {
    36625: (e, r) => {
      var t;
      (r = e.exports = c),
        (t =
          'object' == typeof process &&
          process.env &&
          process.env.NODE_DEBUG &&
          /\bsemver\b/i.test(process.env.NODE_DEBUG)
            ? function () {
                var e = Array.prototype.slice.call(arguments, 0);
                e.unshift('SEMVER'), console.log.apply(console, e);
              }
            : function () {}),
        (r.SEMVER_SPEC_VERSION = '2.0.0');
      var n = Number.MAX_SAFE_INTEGER || 9007199254740991,
        o = (r.re = []),
        i = (r.src = []),
        s = (r.tokens = {}),
        a = 0;
      function E(e) {
        s[e] = a++;
      }
      E('NUMERICIDENTIFIER'),
        (i[s.NUMERICIDENTIFIER] = '0|[1-9]\\d*'),
        E('NUMERICIDENTIFIERLOOSE'),
        (i[s.NUMERICIDENTIFIERLOOSE] = '[0-9]+'),
        E('NONNUMERICIDENTIFIER'),
        (i[s.NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*'),
        E('MAINVERSION'),
        (i[s.MAINVERSION] =
          '(' +
          i[s.NUMERICIDENTIFIER] +
          ')\\.(' +
          i[s.NUMERICIDENTIFIER] +
          ')\\.(' +
          i[s.NUMERICIDENTIFIER] +
          ')'),
        E('MAINVERSIONLOOSE'),
        (i[s.MAINVERSIONLOOSE] =
          '(' +
          i[s.NUMERICIDENTIFIERLOOSE] +
          ')\\.(' +
          i[s.NUMERICIDENTIFIERLOOSE] +
          ')\\.(' +
          i[s.NUMERICIDENTIFIERLOOSE] +
          ')'),
        E('PRERELEASEIDENTIFIER'),
        (i[s.PRERELEASEIDENTIFIER] =
          '(?:' + i[s.NUMERICIDENTIFIER] + '|' + i[s.NONNUMERICIDENTIFIER] + ')'),
        E('PRERELEASEIDENTIFIERLOOSE'),
        (i[s.PRERELEASEIDENTIFIERLOOSE] =
          '(?:' + i[s.NUMERICIDENTIFIERLOOSE] + '|' + i[s.NONNUMERICIDENTIFIER] + ')'),
        E('PRERELEASE'),
        (i[s.PRERELEASE] =
          '(?:-(' + i[s.PRERELEASEIDENTIFIER] + '(?:\\.' + i[s.PRERELEASEIDENTIFIER] + ')*))'),
        E('PRERELEASELOOSE'),
        (i[s.PRERELEASELOOSE] =
          '(?:-?(' +
          i[s.PRERELEASEIDENTIFIERLOOSE] +
          '(?:\\.' +
          i[s.PRERELEASEIDENTIFIERLOOSE] +
          ')*))'),
        E('BUILDIDENTIFIER'),
        (i[s.BUILDIDENTIFIER] = '[0-9A-Za-z-]+'),
        E('BUILD'),
        (i[s.BUILD] = '(?:\\+(' + i[s.BUILDIDENTIFIER] + '(?:\\.' + i[s.BUILDIDENTIFIER] + ')*))'),
        E('FULL'),
        E('FULLPLAIN'),
        (i[s.FULLPLAIN] = 'v?' + i[s.MAINVERSION] + i[s.PRERELEASE] + '?' + i[s.BUILD] + '?'),
        (i[s.FULL] = '^' + i[s.FULLPLAIN] + '$'),
        E('LOOSEPLAIN'),
        (i[s.LOOSEPLAIN] =
          '[v=\\s]*' + i[s.MAINVERSIONLOOSE] + i[s.PRERELEASELOOSE] + '?' + i[s.BUILD] + '?'),
        E('LOOSE'),
        (i[s.LOOSE] = '^' + i[s.LOOSEPLAIN] + '$'),
        E('GTLT'),
        (i[s.GTLT] = '((?:<|>)?=?)'),
        E('XRANGEIDENTIFIERLOOSE'),
        (i[s.XRANGEIDENTIFIERLOOSE] = i[s.NUMERICIDENTIFIERLOOSE] + '|x|X|\\*'),
        E('XRANGEIDENTIFIER'),
        (i[s.XRANGEIDENTIFIER] = i[s.NUMERICIDENTIFIER] + '|x|X|\\*'),
        E('XRANGEPLAIN'),
        (i[s.XRANGEPLAIN] =
          '[v=\\s]*(' +
          i[s.XRANGEIDENTIFIER] +
          ')(?:\\.(' +
          i[s.XRANGEIDENTIFIER] +
          ')(?:\\.(' +
          i[s.XRANGEIDENTIFIER] +
          ')(?:' +
          i[s.PRERELEASE] +
          ')?' +
          i[s.BUILD] +
          '?)?)?'),
        E('XRANGEPLAINLOOSE'),
        (i[s.XRANGEPLAINLOOSE] =
          '[v=\\s]*(' +
          i[s.XRANGEIDENTIFIERLOOSE] +
          ')(?:\\.(' +
          i[s.XRANGEIDENTIFIERLOOSE] +
          ')(?:\\.(' +
          i[s.XRANGEIDENTIFIERLOOSE] +
          ')(?:' +
          i[s.PRERELEASELOOSE] +
          ')?' +
          i[s.BUILD] +
          '?)?)?'),
        E('XRANGE'),
        (i[s.XRANGE] = '^' + i[s.GTLT] + '\\s*' + i[s.XRANGEPLAIN] + '$'),
        E('XRANGELOOSE'),
        (i[s.XRANGELOOSE] = '^' + i[s.GTLT] + '\\s*' + i[s.XRANGEPLAINLOOSE] + '$'),
        E('COERCE'),
        (i[s.COERCE] = '(^|[^\\d])(\\d{1,16})(?:\\.(\\d{1,16}))?(?:\\.(\\d{1,16}))?(?:$|[^\\d])'),
        E('COERCERTL'),
        (o[s.COERCERTL] = new RegExp(i[s.COERCE], 'g')),
        E('LONETILDE'),
        (i[s.LONETILDE] = '(?:~>?)'),
        E('TILDETRIM'),
        (i[s.TILDETRIM] = '(\\s*)' + i[s.LONETILDE] + '\\s+'),
        (o[s.TILDETRIM] = new RegExp(i[s.TILDETRIM], 'g'));
      E('TILDE'),
        (i[s.TILDE] = '^' + i[s.LONETILDE] + i[s.XRANGEPLAIN] + '$'),
        E('TILDELOOSE'),
        (i[s.TILDELOOSE] = '^' + i[s.LONETILDE] + i[s.XRANGEPLAINLOOSE] + '$'),
        E('LONECARET'),
        (i[s.LONECARET] = '(?:\\^)'),
        E('CARETTRIM'),
        (i[s.CARETTRIM] = '(\\s*)' + i[s.LONECARET] + '\\s+'),
        (o[s.CARETTRIM] = new RegExp(i[s.CARETTRIM], 'g'));
      E('CARET'),
        (i[s.CARET] = '^' + i[s.LONECARET] + i[s.XRANGEPLAIN] + '$'),
        E('CARETLOOSE'),
        (i[s.CARETLOOSE] = '^' + i[s.LONECARET] + i[s.XRANGEPLAINLOOSE] + '$'),
        E('COMPARATORLOOSE'),
        (i[s.COMPARATORLOOSE] = '^' + i[s.GTLT] + '\\s*(' + i[s.LOOSEPLAIN] + ')$|^$'),
        E('COMPARATOR'),
        (i[s.COMPARATOR] = '^' + i[s.GTLT] + '\\s*(' + i[s.FULLPLAIN] + ')$|^$'),
        E('COMPARATORTRIM'),
        (i[s.COMPARATORTRIM] =
          '(\\s*)' + i[s.GTLT] + '\\s*(' + i[s.LOOSEPLAIN] + '|' + i[s.XRANGEPLAIN] + ')'),
        (o[s.COMPARATORTRIM] = new RegExp(i[s.COMPARATORTRIM], 'g'));
      E('HYPHENRANGE'),
        (i[s.HYPHENRANGE] =
          '^\\s*(' + i[s.XRANGEPLAIN] + ')\\s+-\\s+(' + i[s.XRANGEPLAIN] + ')\\s*$'),
        E('HYPHENRANGELOOSE'),
        (i[s.HYPHENRANGELOOSE] =
          '^\\s*(' + i[s.XRANGEPLAINLOOSE] + ')\\s+-\\s+(' + i[s.XRANGEPLAINLOOSE] + ')\\s*$'),
        E('STAR'),
        (i[s.STAR] = '(<|>)?=?\\s*\\*');
      for (var u = 0; u < a; u++) t(u, i[u]), o[u] || (o[u] = new RegExp(i[u]));
      function p(e, r) {
        if (
          ((r && 'object' == typeof r) || (r = { loose: !!r, includePrerelease: !1 }),
          e instanceof c)
        )
          return e;
        if ('string' != typeof e) return null;
        if (e.length > 256) return null;
        if (!(r.loose ? o[s.LOOSE] : o[s.FULL]).test(e)) return null;
        try {
          return new c(e, r);
        } catch (e) {
          return null;
        }
      }
      function c(e, r) {
        if (
          ((r && 'object' == typeof r) || (r = { loose: !!r, includePrerelease: !1 }),
          e instanceof c)
        ) {
          if (e.loose === r.loose) return e;
          e = e.version;
        } else if ('string' != typeof e) throw new TypeError('Invalid Version: ' + e);
        if (e.length > 256) throw new TypeError('version is longer than 256 characters');
        if (!(this instanceof c)) return new c(e, r);
        t('SemVer', e, r), (this.options = r), (this.loose = !!r.loose);
        var i = e.trim().match(r.loose ? o[s.LOOSE] : o[s.FULL]);
        if (!i) throw new TypeError('Invalid Version: ' + e);
        if (
          ((this.raw = e),
          (this.major = +i[1]),
          (this.minor = +i[2]),
          (this.patch = +i[3]),
          this.major > n || this.major < 0)
        )
          throw new TypeError('Invalid major version');
        if (this.minor > n || this.minor < 0) throw new TypeError('Invalid minor version');
        if (this.patch > n || this.patch < 0) throw new TypeError('Invalid patch version');
        i[4]
          ? (this.prerelease = i[4].split('.').map(function (e) {
              if (/^[0-9]+$/.test(e)) {
                var r = +e;
                if (r >= 0 && r < n) return r;
              }
              return e;
            }))
          : (this.prerelease = []),
          (this.build = i[5] ? i[5].split('.') : []),
          this.format();
      }
      (r.parse = p),
        (r.valid = function (e, r) {
          var t = p(e, r);
          return t ? t.version : null;
        }),
        (r.clean = function (e, r) {
          var t = p(e.trim().replace(/^[=v]+/, ''), r);
          return t ? t.version : null;
        }),
        (r.SemVer = c),
        (c.prototype.format = function () {
          return (
            (this.version = this.major + '.' + this.minor + '.' + this.patch),
            this.prerelease.length && (this.version += '-' + this.prerelease.join('.')),
            this.version
          );
        }),
        (c.prototype.toString = function () {
          return this.version;
        }),
        (c.prototype.compare = function (e) {
          return (
            t('SemVer.compare', this.version, this.options, e),
            e instanceof c || (e = new c(e, this.options)),
            this.compareMain(e) || this.comparePre(e)
          );
        }),
        (c.prototype.compareMain = function (e) {
          return (
            e instanceof c || (e = new c(e, this.options)),
            h(this.major, e.major) || h(this.minor, e.minor) || h(this.patch, e.patch)
          );
        }),
        (c.prototype.comparePre = function (e) {
          if (
            (e instanceof c || (e = new c(e, this.options)),
            this.prerelease.length && !e.prerelease.length)
          )
            return -1;
          if (!this.prerelease.length && e.prerelease.length) return 1;
          if (!this.prerelease.length && !e.prerelease.length) return 0;
          var r = 0;
          do {
            var n = this.prerelease[r],
              o = e.prerelease[r];
            if ((t('prerelease compare', r, n, o), void 0 === n && void 0 === o)) return 0;
            if (void 0 === o) return 1;
            if (void 0 === n) return -1;
            if (n !== o) return h(n, o);
          } while (++r);
        }),
        (c.prototype.compareBuild = function (e) {
          e instanceof c || (e = new c(e, this.options));
          var r = 0;
          do {
            var n = this.build[r],
              o = e.build[r];
            if ((t('prerelease compare', r, n, o), void 0 === n && void 0 === o)) return 0;
            if (void 0 === o) return 1;
            if (void 0 === n) return -1;
            if (n !== o) return h(n, o);
          } while (++r);
        }),
        (c.prototype.inc = function (e, r) {
          switch (e) {
            case 'premajor':
              (this.prerelease.length = 0),
                (this.patch = 0),
                (this.minor = 0),
                this.major++,
                this.inc('pre', r);
              break;
            case 'preminor':
              (this.prerelease.length = 0), (this.patch = 0), this.minor++, this.inc('pre', r);
              break;
            case 'prepatch':
              (this.prerelease.length = 0), this.inc('patch', r), this.inc('pre', r);
              break;
            case 'prerelease':
              0 === this.prerelease.length && this.inc('patch', r), this.inc('pre', r);
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
                for (var t = this.prerelease.length; --t >= 0; )
                  'number' == typeof this.prerelease[t] && (this.prerelease[t]++, (t = -2));
                -1 === t && this.prerelease.push(0);
              }
              r &&
                (this.prerelease[0] === r
                  ? isNaN(this.prerelease[1]) && (this.prerelease = [r, 0])
                  : (this.prerelease = [r, 0]));
              break;
            default:
              throw new Error('invalid increment argument: ' + e);
          }
          return this.format(), (this.raw = this.version), this;
        }),
        (r.inc = function (e, r, t, n) {
          'string' == typeof t && ((n = t), (t = void 0));
          try {
            return new c(e, t).inc(r, n).version;
          } catch (e) {
            return null;
          }
        }),
        (r.diff = function (e, r) {
          if (O(e, r)) return null;
          var t = p(e),
            n = p(r),
            o = '';
          if (t.prerelease.length || n.prerelease.length) {
            o = 'pre';
            var i = 'prerelease';
          }
          for (var s in t)
            if (('major' === s || 'minor' === s || 'patch' === s) && t[s] !== n[s]) return o + s;
          return i;
        }),
        (r.compareIdentifiers = h);
      var l = /^[0-9]+$/;
      function h(e, r) {
        var t = l.test(e),
          n = l.test(r);
        return (
          t && n && ((e = +e), (r = +r)), e === r ? 0 : t && !n ? -1 : n && !t ? 1 : e < r ? -1 : 1
        );
      }
      function I(e, r, t) {
        return new c(e, t).compare(new c(r, t));
      }
      function R(e, r, t) {
        return I(e, r, t) > 0;
      }
      function f(e, r, t) {
        return I(e, r, t) < 0;
      }
      function O(e, r, t) {
        return 0 === I(e, r, t);
      }
      function N(e, r, t) {
        return 0 !== I(e, r, t);
      }
      function L(e, r, t) {
        return I(e, r, t) >= 0;
      }
      function m(e, r, t) {
        return I(e, r, t) <= 0;
      }
      function v(e, r, t, n) {
        switch (r) {
          case '===':
            return (
              'object' == typeof e && (e = e.version),
              'object' == typeof t && (t = t.version),
              e === t
            );
          case '!==':
            return (
              'object' == typeof e && (e = e.version),
              'object' == typeof t && (t = t.version),
              e !== t
            );
          case '':
          case '=':
          case '==':
            return O(e, t, n);
          case '!=':
            return N(e, t, n);
          case '>':
            return R(e, t, n);
          case '>=':
            return L(e, t, n);
          case '<':
            return f(e, t, n);
          case '<=':
            return m(e, t, n);
          default:
            throw new TypeError('Invalid operator: ' + r);
        }
      }
      function T(e, r) {
        if (
          ((r && 'object' == typeof r) || (r = { loose: !!r, includePrerelease: !1 }),
          e instanceof T)
        ) {
          if (e.loose === !!r.loose) return e;
          e = e.value;
        }
        if (!(this instanceof T)) return new T(e, r);
        t('comparator', e, r),
          (this.options = r),
          (this.loose = !!r.loose),
          this.parse(e),
          this.semver === A
            ? (this.value = '')
            : (this.value = this.operator + this.semver.version),
          t('comp', this);
      }
      (r.rcompareIdentifiers = function (e, r) {
        return h(r, e);
      }),
        (r.major = function (e, r) {
          return new c(e, r).major;
        }),
        (r.minor = function (e, r) {
          return new c(e, r).minor;
        }),
        (r.patch = function (e, r) {
          return new c(e, r).patch;
        }),
        (r.compare = I),
        (r.compareLoose = function (e, r) {
          return I(e, r, !0);
        }),
        (r.compareBuild = function (e, r, t) {
          var n = new c(e, t),
            o = new c(r, t);
          return n.compare(o) || n.compareBuild(o);
        }),
        (r.rcompare = function (e, r, t) {
          return I(r, e, t);
        }),
        (r.sort = function (e, t) {
          return e.sort(function (e, n) {
            return r.compareBuild(e, n, t);
          });
        }),
        (r.rsort = function (e, t) {
          return e.sort(function (e, n) {
            return r.compareBuild(n, e, t);
          });
        }),
        (r.gt = R),
        (r.lt = f),
        (r.eq = O),
        (r.neq = N),
        (r.gte = L),
        (r.lte = m),
        (r.cmp = v),
        (r.Comparator = T);
      var A = {};
      function S(e, r) {
        if (
          ((r && 'object' == typeof r) || (r = { loose: !!r, includePrerelease: !1 }),
          e instanceof S)
        )
          return e.loose === !!r.loose && e.includePrerelease === !!r.includePrerelease
            ? e
            : new S(e.raw, r);
        if (e instanceof T) return new S(e.value, r);
        if (!(this instanceof S)) return new S(e, r);
        if (
          ((this.options = r),
          (this.loose = !!r.loose),
          (this.includePrerelease = !!r.includePrerelease),
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
      function w(e, r) {
        for (var t = !0, n = e.slice(), o = n.pop(); t && n.length; )
          (t = n.every(function (e) {
            return o.intersects(e, r);
          })),
            (o = n.pop());
        return t;
      }
      function g(e) {
        return !e || 'x' === e.toLowerCase() || '*' === e;
      }
      function C(e, r, t, n, o, i, s, a, E, u, p, c, l) {
        return (
          (r = g(t) ? '' : g(n) ? '>=' + t + '.0.0' : g(o) ? '>=' + t + '.' + n + '.0' : '>=' + r) +
          ' ' +
          (a = g(E)
            ? ''
            : g(u)
              ? '<' + (+E + 1) + '.0.0'
              : g(p)
                ? '<' + E + '.' + (+u + 1) + '.0'
                : c
                  ? '<=' + E + '.' + u + '.' + p + '-' + c
                  : '<=' + a)
        ).trim();
      }
      function P(e, r, n) {
        for (var o = 0; o < e.length; o++) if (!e[o].test(r)) return !1;
        if (r.prerelease.length && !n.includePrerelease) {
          for (o = 0; o < e.length; o++)
            if ((t(e[o].semver), e[o].semver !== A && e[o].semver.prerelease.length > 0)) {
              var i = e[o].semver;
              if (i.major === r.major && i.minor === r.minor && i.patch === r.patch) return !0;
            }
          return !1;
        }
        return !0;
      }
      function d(e, r, t) {
        try {
          r = new S(r, t);
        } catch (e) {
          return !1;
        }
        return r.test(e);
      }
      function D(e, r, t, n) {
        var o, i, s, a, E;
        switch (((e = new c(e, n)), (r = new S(r, n)), t)) {
          case '>':
            (o = R), (i = m), (s = f), (a = '>'), (E = '>=');
            break;
          case '<':
            (o = f), (i = L), (s = R), (a = '<'), (E = '<=');
            break;
          default:
            throw new TypeError('Must provide a hilo val of "<" or ">"');
        }
        if (d(e, r, n)) return !1;
        for (var u = 0; u < r.set.length; ++u) {
          var p = r.set[u],
            l = null,
            h = null;
          if (
            (p.forEach(function (e) {
              e.semver === A && (e = new T('>=0.0.0')),
                (l = l || e),
                (h = h || e),
                o(e.semver, l.semver, n) ? (l = e) : s(e.semver, h.semver, n) && (h = e);
            }),
            l.operator === a || l.operator === E)
          )
            return !1;
          if ((!h.operator || h.operator === a) && i(e, h.semver)) return !1;
          if (h.operator === E && s(e, h.semver)) return !1;
        }
        return !0;
      }
      (T.prototype.parse = function (e) {
        var r = this.options.loose ? o[s.COMPARATORLOOSE] : o[s.COMPARATOR],
          t = e.match(r);
        if (!t) throw new TypeError('Invalid comparator: ' + e);
        (this.operator = void 0 !== t[1] ? t[1] : ''),
          '=' === this.operator && (this.operator = ''),
          t[2] ? (this.semver = new c(t[2], this.options.loose)) : (this.semver = A);
      }),
        (T.prototype.toString = function () {
          return this.value;
        }),
        (T.prototype.test = function (e) {
          if ((t('Comparator.test', e, this.options.loose), this.semver === A || e === A))
            return !0;
          if ('string' == typeof e)
            try {
              e = new c(e, this.options);
            } catch (e) {
              return !1;
            }
          return v(e, this.operator, this.semver, this.options);
        }),
        (T.prototype.intersects = function (e, r) {
          if (!(e instanceof T)) throw new TypeError('a Comparator is required');
          var t;
          if (
            ((r && 'object' == typeof r) || (r = { loose: !!r, includePrerelease: !1 }),
            '' === this.operator)
          )
            return '' === this.value || ((t = new S(e.value, r)), d(this.value, t, r));
          if ('' === e.operator)
            return '' === e.value || ((t = new S(this.value, r)), d(e.semver, t, r));
          var n = !(
              ('>=' !== this.operator && '>' !== this.operator) ||
              ('>=' !== e.operator && '>' !== e.operator)
            ),
            o = !(
              ('<=' !== this.operator && '<' !== this.operator) ||
              ('<=' !== e.operator && '<' !== e.operator)
            ),
            i = this.semver.version === e.semver.version,
            s = !(
              ('>=' !== this.operator && '<=' !== this.operator) ||
              ('>=' !== e.operator && '<=' !== e.operator)
            ),
            a =
              v(this.semver, '<', e.semver, r) &&
              ('>=' === this.operator || '>' === this.operator) &&
              ('<=' === e.operator || '<' === e.operator),
            E =
              v(this.semver, '>', e.semver, r) &&
              ('<=' === this.operator || '<' === this.operator) &&
              ('>=' === e.operator || '>' === e.operator);
          return n || o || (i && s) || a || E;
        }),
        (r.Range = S),
        (S.prototype.format = function () {
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
        (S.prototype.toString = function () {
          return this.range;
        }),
        (S.prototype.parseRange = function (e) {
          var r = this.options.loose;
          e = e.trim();
          var n = r ? o[s.HYPHENRANGELOOSE] : o[s.HYPHENRANGE];
          (e = e.replace(n, C)),
            t('hyphen replace', e),
            (e = e.replace(o[s.COMPARATORTRIM], '$1$2$3')),
            t('comparator trim', e, o[s.COMPARATORTRIM]),
            (e = (e = (e = e.replace(o[s.TILDETRIM], '$1~')).replace(o[s.CARETTRIM], '$1^'))
              .split(/\s+/)
              .join(' '));
          var i = r ? o[s.COMPARATORLOOSE] : o[s.COMPARATOR],
            a = e
              .split(' ')
              .map(function (e) {
                return (function (e, r) {
                  return (
                    t('comp', e, r),
                    (e = (function (e, r) {
                      return e
                        .trim()
                        .split(/\s+/)
                        .map(function (e) {
                          return (function (e, r) {
                            t('caret', e, r);
                            var n = r.loose ? o[s.CARETLOOSE] : o[s.CARET];
                            return e.replace(n, function (r, n, o, i, s) {
                              var a;
                              return (
                                t('caret', e, r, n, o, i, s),
                                g(n)
                                  ? (a = '')
                                  : g(o)
                                    ? (a = '>=' + n + '.0.0 <' + (+n + 1) + '.0.0')
                                    : g(i)
                                      ? (a =
                                          '0' === n
                                            ? '>=' +
                                              n +
                                              '.' +
                                              o +
                                              '.0 <' +
                                              n +
                                              '.' +
                                              (+o + 1) +
                                              '.0'
                                            : '>=' + n + '.' + o + '.0 <' + (+n + 1) + '.0.0')
                                      : s
                                        ? (t('replaceCaret pr', s),
                                          (a =
                                            '0' === n
                                              ? '0' === o
                                                ? '>=' +
                                                  n +
                                                  '.' +
                                                  o +
                                                  '.' +
                                                  i +
                                                  '-' +
                                                  s +
                                                  ' <' +
                                                  n +
                                                  '.' +
                                                  o +
                                                  '.' +
                                                  (+i + 1)
                                                : '>=' +
                                                  n +
                                                  '.' +
                                                  o +
                                                  '.' +
                                                  i +
                                                  '-' +
                                                  s +
                                                  ' <' +
                                                  n +
                                                  '.' +
                                                  (+o + 1) +
                                                  '.0'
                                              : '>=' +
                                                n +
                                                '.' +
                                                o +
                                                '.' +
                                                i +
                                                '-' +
                                                s +
                                                ' <' +
                                                (+n + 1) +
                                                '.0.0'))
                                        : (t('no pr'),
                                          (a =
                                            '0' === n
                                              ? '0' === o
                                                ? '>=' +
                                                  n +
                                                  '.' +
                                                  o +
                                                  '.' +
                                                  i +
                                                  ' <' +
                                                  n +
                                                  '.' +
                                                  o +
                                                  '.' +
                                                  (+i + 1)
                                                : '>=' +
                                                  n +
                                                  '.' +
                                                  o +
                                                  '.' +
                                                  i +
                                                  ' <' +
                                                  n +
                                                  '.' +
                                                  (+o + 1) +
                                                  '.0'
                                              : '>=' +
                                                n +
                                                '.' +
                                                o +
                                                '.' +
                                                i +
                                                ' <' +
                                                (+n + 1) +
                                                '.0.0')),
                                t('caret return', a),
                                a
                              );
                            });
                          })(e, r);
                        })
                        .join(' ');
                    })(e, r)),
                    t('caret', e),
                    (e = (function (e, r) {
                      return e
                        .trim()
                        .split(/\s+/)
                        .map(function (e) {
                          return (function (e, r) {
                            var n = r.loose ? o[s.TILDELOOSE] : o[s.TILDE];
                            return e.replace(n, function (r, n, o, i, s) {
                              var a;
                              return (
                                t('tilde', e, r, n, o, i, s),
                                g(n)
                                  ? (a = '')
                                  : g(o)
                                    ? (a = '>=' + n + '.0.0 <' + (+n + 1) + '.0.0')
                                    : g(i)
                                      ? (a =
                                          '>=' + n + '.' + o + '.0 <' + n + '.' + (+o + 1) + '.0')
                                      : s
                                        ? (t('replaceTilde pr', s),
                                          (a =
                                            '>=' +
                                            n +
                                            '.' +
                                            o +
                                            '.' +
                                            i +
                                            '-' +
                                            s +
                                            ' <' +
                                            n +
                                            '.' +
                                            (+o + 1) +
                                            '.0'))
                                        : (a =
                                            '>=' +
                                            n +
                                            '.' +
                                            o +
                                            '.' +
                                            i +
                                            ' <' +
                                            n +
                                            '.' +
                                            (+o + 1) +
                                            '.0'),
                                t('tilde return', a),
                                a
                              );
                            });
                          })(e, r);
                        })
                        .join(' ');
                    })(e, r)),
                    t('tildes', e),
                    (e = (function (e, r) {
                      return (
                        t('replaceXRanges', e, r),
                        e
                          .split(/\s+/)
                          .map(function (e) {
                            return (function (e, r) {
                              e = e.trim();
                              var n = r.loose ? o[s.XRANGELOOSE] : o[s.XRANGE];
                              return e.replace(n, function (n, o, i, s, a, E) {
                                t('xRange', e, n, o, i, s, a, E);
                                var u = g(i),
                                  p = u || g(s),
                                  c = p || g(a),
                                  l = c;
                                return (
                                  '=' === o && l && (o = ''),
                                  (E = r.includePrerelease ? '-0' : ''),
                                  u
                                    ? (n = '>' === o || '<' === o ? '<0.0.0-0' : '*')
                                    : o && l
                                      ? (p && (s = 0),
                                        (a = 0),
                                        '>' === o
                                          ? ((o = '>='),
                                            p
                                              ? ((i = +i + 1), (s = 0), (a = 0))
                                              : ((s = +s + 1), (a = 0)))
                                          : '<=' === o &&
                                            ((o = '<'), p ? (i = +i + 1) : (s = +s + 1)),
                                        (n = o + i + '.' + s + '.' + a + E))
                                      : p
                                        ? (n = '>=' + i + '.0.0' + E + ' <' + (+i + 1) + '.0.0' + E)
                                        : c &&
                                          (n =
                                            '>=' +
                                            i +
                                            '.' +
                                            s +
                                            '.0' +
                                            E +
                                            ' <' +
                                            i +
                                            '.' +
                                            (+s + 1) +
                                            '.0' +
                                            E),
                                  t('xRange return', n),
                                  n
                                );
                              });
                            })(e, r);
                          })
                          .join(' ')
                      );
                    })(e, r)),
                    t('xrange', e),
                    (e = (function (e, r) {
                      return t('replaceStars', e, r), e.trim().replace(o[s.STAR], '');
                    })(e, r)),
                    t('stars', e),
                    e
                  );
                })(e, this.options);
              }, this)
              .join(' ')
              .split(/\s+/);
          return (
            this.options.loose &&
              (a = a.filter(function (e) {
                return !!e.match(i);
              })),
            (a = a.map(function (e) {
              return new T(e, this.options);
            }, this))
          );
        }),
        (S.prototype.intersects = function (e, r) {
          if (!(e instanceof S)) throw new TypeError('a Range is required');
          return this.set.some(function (t) {
            return (
              w(t, r) &&
              e.set.some(function (e) {
                return (
                  w(e, r) &&
                  t.every(function (t) {
                    return e.every(function (e) {
                      return t.intersects(e, r);
                    });
                  })
                );
              })
            );
          });
        }),
        (r.toComparators = function (e, r) {
          return new S(e, r).set.map(function (e) {
            return e
              .map(function (e) {
                return e.value;
              })
              .join(' ')
              .trim()
              .split(' ');
          });
        }),
        (S.prototype.test = function (e) {
          if (!e) return !1;
          if ('string' == typeof e)
            try {
              e = new c(e, this.options);
            } catch (e) {
              return !1;
            }
          for (var r = 0; r < this.set.length; r++) if (P(this.set[r], e, this.options)) return !0;
          return !1;
        }),
        (r.satisfies = d),
        (r.maxSatisfying = function (e, r, t) {
          var n = null,
            o = null;
          try {
            var i = new S(r, t);
          } catch (e) {
            return null;
          }
          return (
            e.forEach(function (e) {
              i.test(e) && ((n && -1 !== o.compare(e)) || (o = new c((n = e), t)));
            }),
            n
          );
        }),
        (r.minSatisfying = function (e, r, t) {
          var n = null,
            o = null;
          try {
            var i = new S(r, t);
          } catch (e) {
            return null;
          }
          return (
            e.forEach(function (e) {
              i.test(e) && ((n && 1 !== o.compare(e)) || (o = new c((n = e), t)));
            }),
            n
          );
        }),
        (r.minVersion = function (e, r) {
          e = new S(e, r);
          var t = new c('0.0.0');
          if (e.test(t)) return t;
          if (((t = new c('0.0.0-0')), e.test(t))) return t;
          t = null;
          for (var n = 0; n < e.set.length; ++n) {
            e.set[n].forEach(function (e) {
              var r = new c(e.semver.version);
              switch (e.operator) {
                case '>':
                  0 === r.prerelease.length ? r.patch++ : r.prerelease.push(0),
                    (r.raw = r.format());
                case '':
                case '>=':
                  (t && !R(t, r)) || (t = r);
                  break;
                case '<':
                case '<=':
                  break;
                default:
                  throw new Error('Unexpected operation: ' + e.operator);
              }
            });
          }
          if (t && e.test(t)) return t;
          return null;
        }),
        (r.validRange = function (e, r) {
          try {
            return new S(e, r).range || '*';
          } catch (e) {
            return null;
          }
        }),
        (r.ltr = function (e, r, t) {
          return D(e, r, '<', t);
        }),
        (r.gtr = function (e, r, t) {
          return D(e, r, '>', t);
        }),
        (r.outside = D),
        (r.prerelease = function (e, r) {
          var t = p(e, r);
          return t && t.prerelease.length ? t.prerelease : null;
        }),
        (r.intersects = function (e, r, t) {
          return (e = new S(e, t)), (r = new S(r, t)), e.intersects(r);
        }),
        (r.coerce = function (e, r) {
          if (e instanceof c) return e;
          'number' == typeof e && (e = String(e));
          if ('string' != typeof e) return null;
          var t = null;
          if ((r = r || {}).rtl) {
            for (
              var n;
              (n = o[s.COERCERTL].exec(e)) && (!t || t.index + t[0].length !== e.length);

            )
              (t && n.index + n[0].length === t.index + t[0].length) || (t = n),
                (o[s.COERCERTL].lastIndex = n.index + n[1].length + n[2].length);
            o[s.COERCERTL].lastIndex = -1;
          } else t = e.match(o[s.COERCE]);
          if (null === t) return null;
          return p(t[2] + '.' + (t[3] || '0') + '.' + (t[4] || '0'), r);
        });
    },
  },
]);
