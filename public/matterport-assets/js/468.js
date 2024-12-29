/*! For license information please see 468.js.LICENSE.txt */
'use strict';
(self.webpackChunkmp_webgl = self.webpackChunkmp_webgl || []).push([
  [468],
  {
    83468: (e, t, i) => {
      i.d(t, { E1: () => R });
      class s {
        static getElements(e, t = document) {
          if ('string' == typeof e) {
            const i = 'getElementById' in t ? t : void 0;
            if (i && !isNaN(+e[0])) {
              const t = i.getElementById(e);
              return t ? [t] : [];
            }
            let s = t.querySelectorAll(e);
            return (
              s.length ||
                '.' === e[0] ||
                '#' === e[0] ||
                ((s = t.querySelectorAll('.' + e)), s.length || (s = t.querySelectorAll('#' + e))),
              Array.from(s)
            );
          }
          return [e];
        }
        static getElement(e, t = document) {
          if ('string' == typeof e) {
            const i = 'getElementById' in t ? t : void 0;
            if (!e.length) return null;
            if (i && '#' === e[0]) return i.getElementById(e.substring(1));
            if ('#' === e[0] || '.' === e[0] || '[' === e[0]) return t.querySelector(e);
            if (i && !isNaN(+e[0])) return i.getElementById(e);
            let s = t.querySelector(e);
            return i && !s && (s = i.getElementById(e)), s || (s = t.querySelector('.' + e)), s;
          }
          return e;
        }
        static shouldSizeToContent(e, t = !1) {
          return (
            e?.grid &&
            (t
              ? !0 === e.sizeToContent ||
                (!0 === e.grid.opts.sizeToContent && void 0 === e.sizeToContent)
              : !!e.sizeToContent || (e.grid.opts.sizeToContent && !1 !== e.sizeToContent))
          );
        }
        static isIntercepted(e, t) {
          return !(e.y >= t.y + t.h || e.y + e.h <= t.y || e.x + e.w <= t.x || e.x >= t.x + t.w);
        }
        static isTouching(e, t) {
          return s.isIntercepted(e, { x: t.x - 0.5, y: t.y - 0.5, w: t.w + 1, h: t.h + 1 });
        }
        static areaIntercept(e, t) {
          let i = e.x > t.x ? e.x : t.x,
            s = e.x + e.w < t.x + t.w ? e.x + e.w : t.x + t.w;
          if (s <= i) return 0;
          let o = e.y > t.y ? e.y : t.y,
            n = e.y + e.h < t.y + t.h ? e.y + e.h : t.y + t.h;
          return n <= o ? 0 : (s - i) * (n - o);
        }
        static area(e) {
          return e.w * e.h;
        }
        static sort(e, t = 1) {
          const i = 1e4;
          return e.sort((e, s) => {
            let o = t * ((e.y ?? i) - (s.y ?? i));
            return 0 === o ? t * ((e.x ?? i) - (s.x ?? i)) : o;
          });
        }
        static find(e, t) {
          return t ? e.find((e) => e.id === t) : void 0;
        }
        static createStylesheet(e, t, i) {
          let s = document.createElement('style');
          const o = i?.nonce;
          return (
            o && (s.nonce = o),
            s.setAttribute('type', 'text/css'),
            s.setAttribute('gs-style-id', e),
            s.styleSheet ? (s.styleSheet.cssText = '') : s.appendChild(document.createTextNode('')),
            t
              ? t.insertBefore(s, t.firstChild)
              : (t = document.getElementsByTagName('head')[0]).appendChild(s),
            s.sheet
          );
        }
        static removeStylesheet(e, t) {
          let i = (t || document).querySelector('STYLE[gs-style-id=' + e + ']');
          i && i.parentNode && i.remove();
        }
        static addCSSRule(e, t, i) {
          'function' == typeof e.addRule
            ? e.addRule(t, i)
            : 'function' == typeof e.insertRule && e.insertRule(`${t}{${i}}`);
        }
        static toBool(e) {
          return 'boolean' == typeof e
            ? e
            : 'string' == typeof e
              ? !('' === (e = e.toLowerCase()) || 'no' === e || 'false' === e || '0' === e)
              : Boolean(e);
        }
        static toNumber(e) {
          return null === e || 0 === e.length ? void 0 : Number(e);
        }
        static parseHeight(e) {
          let t,
            i = 'px';
          if ('string' == typeof e)
            if ('auto' === e || '' === e) t = 0;
            else {
              let s = e.match(
                /^(-[0-9]+\.[0-9]+|[0-9]*\.[0-9]+|-[0-9]+|[0-9]+)(px|em|rem|vh|vw|%|cm|mm)?$/,
              );
              if (!s) throw new Error(`Invalid height val = ${e}`);
              (i = s[2] || 'px'), (t = parseFloat(s[1]));
            }
          else t = e;
          return { h: t, unit: i };
        }
        static defaults(e, ...t) {
          return (
            t.forEach((t) => {
              for (const i in t) {
                if (!t.hasOwnProperty(i)) return;
                null === e[i] || void 0 === e[i]
                  ? (e[i] = t[i])
                  : 'object' == typeof t[i] && 'object' == typeof e[i] && this.defaults(e[i], t[i]);
              }
            }),
            e
          );
        }
        static same(e, t) {
          if ('object' != typeof e) return e == t;
          if (typeof e != typeof t) return !1;
          if (Object.keys(e).length !== Object.keys(t).length) return !1;
          for (const i in e) if (e[i] !== t[i]) return !1;
          return !0;
        }
        static copyPos(e, t, i = !1) {
          return (
            void 0 !== t.x && (e.x = t.x),
            void 0 !== t.y && (e.y = t.y),
            void 0 !== t.w && (e.w = t.w),
            void 0 !== t.h && (e.h = t.h),
            i &&
              (t.minW && (e.minW = t.minW),
              t.minH && (e.minH = t.minH),
              t.maxW && (e.maxW = t.maxW),
              t.maxH && (e.maxH = t.maxH)),
            e
          );
        }
        static samePos(e, t) {
          return (
            e &&
            t &&
            e.x === t.x &&
            e.y === t.y &&
            (e.w || 1) === (t.w || 1) &&
            (e.h || 1) === (t.h || 1)
          );
        }
        static sanitizeMinMax(e) {
          e.minW || delete e.minW,
            e.minH || delete e.minH,
            e.maxW || delete e.maxW,
            e.maxH || delete e.maxH;
        }
        static removeInternalAndSame(e, t) {
          if ('object' == typeof e && 'object' == typeof t)
            for (let i in e) {
              const o = e[i],
                n = t[i];
              '_' === i[0] || o === n
                ? delete e[i]
                : o &&
                  'object' == typeof o &&
                  void 0 !== n &&
                  (s.removeInternalAndSame(o, n), Object.keys(o).length || delete e[i]);
            }
        }
        static removeInternalForSave(e, t = !0) {
          for (let t in e) ('_' !== t[0] && null !== e[t] && void 0 !== e[t]) || delete e[t];
          delete e.grid,
            t && delete e.el,
            e.autoPosition || delete e.autoPosition,
            e.noResize || delete e.noResize,
            e.noMove || delete e.noMove,
            e.locked || delete e.locked,
            (1 !== e.w && e.w !== e.minW) || delete e.w,
            (1 !== e.h && e.h !== e.minH) || delete e.h;
        }
        static throttle(e, t) {
          let i = !1;
          return (...s) => {
            i ||
              ((i = !0),
              setTimeout(() => {
                e(...s), (i = !1);
              }, t));
          };
        }
        static removePositioningStyles(e) {
          let t = e.style;
          t.position && t.removeProperty('position'),
            t.left && t.removeProperty('left'),
            t.top && t.removeProperty('top'),
            t.width && t.removeProperty('width'),
            t.height && t.removeProperty('height');
        }
        static getScrollElement(e) {
          if (!e) return document.scrollingElement || document.documentElement;
          const t = getComputedStyle(e);
          return /(auto|scroll)/.test(t.overflow + t.overflowY)
            ? e
            : this.getScrollElement(e.parentElement);
        }
        static updateScrollPosition(e, t, i) {
          let s = e.getBoundingClientRect(),
            o = window.innerHeight || document.documentElement.clientHeight;
          if (s.top < 0 || s.bottom > o) {
            let n = s.bottom - o,
              r = s.top,
              l = this.getScrollElement(e);
            if (null !== l) {
              let h = l.scrollTop;
              s.top < 0 && i < 0
                ? e.offsetHeight > o
                  ? (l.scrollTop += i)
                  : (l.scrollTop += Math.abs(r) > Math.abs(i) ? i : r)
                : i > 0 &&
                  (e.offsetHeight > o ? (l.scrollTop += i) : (l.scrollTop += n > i ? i : n)),
                (t.top += l.scrollTop - h);
            }
          }
        }
        static updateScrollResize(e, t, i) {
          const s = this.getScrollElement(t),
            o = s.clientHeight,
            n = s === this.getScrollElement() ? 0 : s.getBoundingClientRect().top,
            r = e.clientY - n,
            l = r > o - i;
          r < i
            ? s.scrollBy({ behavior: 'smooth', top: r - i })
            : l && s.scrollBy({ behavior: 'smooth', top: i - (o - r) });
        }
        static clone(e) {
          return null == e || 'object' != typeof e ? e : e instanceof Array ? [...e] : { ...e };
        }
        static cloneDeep(e) {
          const t = ['parentGrid', 'el', 'grid', 'subGrid', 'engine'],
            i = s.clone(e);
          for (const o in i)
            i.hasOwnProperty(o) &&
              'object' == typeof i[o] &&
              '__' !== o.substring(0, 2) &&
              !t.find((e) => e === o) &&
              (i[o] = s.cloneDeep(e[o]));
          return i;
        }
        static cloneNode(e) {
          const t = e.cloneNode(!0);
          return t.removeAttribute('id'), t;
        }
        static appendTo(e, t) {
          let i;
          (i = 'string' == typeof t ? s.getElement(t) : t), i && i.appendChild(e);
        }
        static addElStyles(e, t) {
          if (t instanceof Object)
            for (const i in t)
              t.hasOwnProperty(i) &&
                (Array.isArray(t[i])
                  ? t[i].forEach((t) => {
                      e.style[i] = t;
                    })
                  : (e.style[i] = t[i]));
        }
        static initEvent(e, t) {
          const i = { type: t.type },
            s = {
              button: 0,
              which: 0,
              buttons: 1,
              bubbles: !0,
              cancelable: !0,
              target: t.target ? t.target : e.target,
            };
          return (
            ['altKey', 'ctrlKey', 'metaKey', 'shiftKey'].forEach((t) => (i[t] = e[t])),
            ['pageX', 'pageY', 'clientX', 'clientY', 'screenX', 'screenY'].forEach(
              (t) => (i[t] = e[t]),
            ),
            { ...i, ...s }
          );
        }
        static simulateMouseEvent(e, t, i) {
          const s = document.createEvent('MouseEvents');
          s.initMouseEvent(
            t,
            !0,
            !0,
            window,
            1,
            e.screenX,
            e.screenY,
            e.clientX,
            e.clientY,
            e.ctrlKey,
            e.altKey,
            e.shiftKey,
            e.metaKey,
            0,
            e.target,
          ),
            (i || e.target).dispatchEvent(s);
        }
        static getValuesFromTransformedElement(e) {
          const t = document.createElement('div');
          s.addElStyles(t, {
            opacity: '0',
            position: 'fixed',
            top: '0px',
            left: '0px',
            width: '1px',
            height: '1px',
            zIndex: '-999999',
          }),
            e.appendChild(t);
          const i = t.getBoundingClientRect();
          return (
            e.removeChild(t),
            t.remove(),
            { xScale: 1 / i.width, yScale: 1 / i.height, xOffset: i.left, yOffset: i.top }
          );
        }
        static swap(e, t, i) {
          if (!e) return;
          const s = e[t];
          (e[t] = e[i]), (e[i] = s);
        }
        static canBeRotated(e) {
          return !(
            !e ||
            e.w === e.h ||
            e.locked ||
            e.noResize ||
            e.grid?.opts.disableResize ||
            (e.minW && e.minW === e.maxW) ||
            (e.minH && e.minH === e.maxH)
          );
        }
      }
      class o {
        constructor(e = {}) {
          (this.addedNodes = []),
            (this.removedNodes = []),
            (this.column = e.column || 12),
            (this.maxRow = e.maxRow),
            (this._float = e.float),
            (this.nodes = e.nodes || []),
            (this.onChange = e.onChange);
        }
        batchUpdate(e = !0, t = !0) {
          return (
            !!this.batchMode === e ||
              ((this.batchMode = e),
              e
                ? ((this._prevFloat = this._float),
                  (this._float = !0),
                  this.cleanNodes(),
                  this.saveInitial())
                : ((this._float = this._prevFloat),
                  delete this._prevFloat,
                  t && this._packNodes(),
                  this._notify())),
            this
          );
        }
        _useEntireRowArea(e, t) {
          return (
            (!this.float || (this.batchMode && !this._prevFloat)) &&
            !this._hasLocked &&
            (!e._moving || e._skipDown || t.y <= e.y)
          );
        }
        _fixCollisions(e, t = e, i, o = {}) {
          if ((this.sortNodes(-1), !(i = i || this.collide(e, t)))) return !1;
          if (e._moving && !o.nested && !this.float && this.swap(e, i)) return !0;
          let n = t;
          !this._loading &&
            this._useEntireRowArea(e, t) &&
            ((n = { x: 0, w: this.column, y: t.y, h: t.h }), (i = this.collide(e, n, o.skip)));
          let r = !1,
            l = { nested: !0, pack: !1 };
          for (; (i = i || this.collide(e, n, o.skip)); ) {
            let n;
            if (
              (i.locked ||
              this._loading ||
              (e._moving &&
                !e._skipDown &&
                t.y > e.y &&
                !this.float &&
                (!this.collide(i, { ...i, y: e.y }, e) ||
                  !this.collide(i, { ...i, y: t.y - i.h }, e)))
                ? ((e._skipDown = e._skipDown || t.y > e.y),
                  (n = this.moveNode(e, { ...t, y: i.y + i.h, ...l })),
                  (i.locked || this._loading) && n
                    ? s.copyPos(t, e)
                    : !i.locked &&
                      n &&
                      o.pack &&
                      (this._packNodes(), (t.y = i.y + i.h), s.copyPos(e, t)),
                  (r = r || n))
                : (n = this.moveNode(i, { ...i, y: t.y + t.h, skip: e, ...l })),
              !n)
            )
              return r;
            i = void 0;
          }
          return r;
        }
        collide(e, t = e, i) {
          const o = e._id,
            n = i?._id;
          return this.nodes.find((e) => e._id !== o && e._id !== n && s.isIntercepted(e, t));
        }
        collideAll(e, t = e, i) {
          const o = e._id,
            n = i?._id;
          return this.nodes.filter((e) => e._id !== o && e._id !== n && s.isIntercepted(e, t));
        }
        directionCollideCoverage(e, t, i) {
          if (!t.rect || !e._rect) return;
          let s,
            o = e._rect,
            n = { ...t.rect };
          n.y > o.y ? ((n.h += n.y - o.y), (n.y = o.y)) : (n.h += o.y - n.y),
            n.x > o.x ? ((n.w += n.x - o.x), (n.x = o.x)) : (n.w += o.x - n.x);
          let r = 0.5;
          for (let e of i) {
            if (e.locked || !e._rect) break;
            let t = e._rect,
              i = Number.MAX_VALUE,
              l = Number.MAX_VALUE;
            o.y < t.y
              ? (i = (n.y + n.h - t.y) / t.h)
              : o.y + o.h > t.y + t.h && (i = (t.y + t.h - n.y) / t.h),
              o.x < t.x
                ? (l = (n.x + n.w - t.x) / t.w)
                : o.x + o.w > t.x + t.w && (l = (t.x + t.w - n.x) / t.w);
            let h = Math.min(l, i);
            h > r && ((r = h), (s = e));
          }
          return (t.collide = s), s;
        }
        cacheRects(e, t, i, s, o, n) {
          return (
            this.nodes.forEach(
              (r) =>
                (r._rect = {
                  y: r.y * t + i,
                  x: r.x * e + n,
                  w: r.w * e - n - s,
                  h: r.h * t - i - o,
                }),
            ),
            this
          );
        }
        swap(e, t) {
          if (!t || t.locked || !e || e.locked) return !1;
          function i() {
            let i = t.x,
              s = t.y;
            return (
              (t.x = e.x),
              (t.y = e.y),
              e.h != t.h
                ? ((e.x = i), (e.y = t.y + t.h))
                : e.w != t.w
                  ? ((e.x = t.x + t.w), (e.y = s))
                  : ((e.x = i), (e.y = s)),
              (e._dirty = t._dirty = !0),
              !0
            );
          }
          let o;
          if (
            e.w === t.w &&
            e.h === t.h &&
            (e.x === t.x || e.y === t.y) &&
            (o = s.isTouching(e, t))
          )
            return i();
          if (!1 !== o) {
            if (e.w === t.w && e.x === t.x && (o || (o = s.isTouching(e, t)))) {
              if (t.y < e.y) {
                let i = e;
                (e = t), (t = i);
              }
              return i();
            }
            if (!1 !== o) {
              if (e.h === t.h && e.y === t.y && (o || (o = s.isTouching(e, t)))) {
                if (t.x < e.x) {
                  let i = e;
                  (e = t), (t = i);
                }
                return i();
              }
              return !1;
            }
          }
        }
        isAreaEmpty(e, t, i, s) {
          let o = { x: e || 0, y: t || 0, w: i || 1, h: s || 1 };
          return !this.collide(o);
        }
        compact(e = 'compact', t = !0) {
          if (0 === this.nodes.length) return this;
          t && this.sortNodes();
          const i = this.batchMode;
          i || this.batchUpdate();
          const s = this._inColumnResize;
          s || (this._inColumnResize = !0);
          let o = this.nodes;
          return (
            (this.nodes = []),
            o.forEach((t, i, s) => {
              let o;
              t.locked || ((t.autoPosition = !0), 'list' === e && i && (o = s[i - 1])),
                this.addNode(t, !1, o);
            }),
            s || delete this._inColumnResize,
            i || this.batchUpdate(!1),
            this
          );
        }
        set float(e) {
          this._float !== e && ((this._float = e || !1), e || this._packNodes()._notify());
        }
        get float() {
          return this._float || !1;
        }
        sortNodes(e = 1) {
          return (this.nodes = s.sort(this.nodes, e)), this;
        }
        _packNodes() {
          return (
            this.batchMode ||
              (this.sortNodes(),
              this.float
                ? this.nodes.forEach((e) => {
                    if (e._updating || void 0 === e._orig || e.y === e._orig.y) return;
                    let t = e.y;
                    for (; t > e._orig.y; ) {
                      --t,
                        this.collide(e, { x: e.x, y: t, w: e.w, h: e.h }) ||
                          ((e._dirty = !0), (e.y = t));
                    }
                  })
                : this.nodes.forEach((e, t) => {
                    if (!e.locked)
                      for (; e.y > 0; ) {
                        let i = 0 === t ? 0 : e.y - 1;
                        if (!(0 === t || !this.collide(e, { x: e.x, y: i, w: e.w, h: e.h }))) break;
                        (e._dirty = e.y !== i), (e.y = i);
                      }
                  })),
            this
          );
        }
        prepareNode(e, t) {
          (e._id = e._id ?? o._idSeq++),
            (void 0 !== e.x && void 0 !== e.y && null !== e.x && null !== e.y) ||
              (e.autoPosition = !0);
          let i = { x: 0, y: 0, w: 1, h: 1 };
          return (
            s.defaults(e, i),
            e.autoPosition || delete e.autoPosition,
            e.noResize || delete e.noResize,
            e.noMove || delete e.noMove,
            s.sanitizeMinMax(e),
            'string' == typeof e.x && (e.x = Number(e.x)),
            'string' == typeof e.y && (e.y = Number(e.y)),
            'string' == typeof e.w && (e.w = Number(e.w)),
            'string' == typeof e.h && (e.h = Number(e.h)),
            isNaN(e.x) && ((e.x = i.x), (e.autoPosition = !0)),
            isNaN(e.y) && ((e.y = i.y), (e.autoPosition = !0)),
            isNaN(e.w) && (e.w = i.w),
            isNaN(e.h) && (e.h = i.h),
            this.nodeBoundFix(e, t),
            e
          );
        }
        nodeBoundFix(e, t) {
          let i = e._orig || s.copyPos({}, e);
          e.maxW && (e.w = Math.min(e.w, e.maxW)),
            e.maxH && (e.h = Math.min(e.h, e.maxH)),
            e.minW && e.minW <= this.column && (e.w = Math.max(e.w, e.minW)),
            e.minH && (e.h = Math.max(e.h, e.minH));
          if (
            (e.x || 0) + (e.w || 1) > this.column &&
            this.column < 12 &&
            !this._inColumnResize &&
            e._id &&
            -1 === this.findCacheLayout(e, 12)
          ) {
            let t = { ...e };
            t.autoPosition || void 0 === t.x ? (delete t.x, delete t.y) : (t.x = Math.min(11, t.x)),
              (t.w = Math.min(12, t.w || 1)),
              this.cacheOneLayout(t, 12);
          }
          return (
            e.w > this.column ? (e.w = this.column) : e.w < 1 && (e.w = 1),
            this.maxRow && e.h > this.maxRow ? (e.h = this.maxRow) : e.h < 1 && (e.h = 1),
            e.x < 0 && (e.x = 0),
            e.y < 0 && (e.y = 0),
            e.x + e.w > this.column && (t ? (e.w = this.column - e.x) : (e.x = this.column - e.w)),
            this.maxRow &&
              e.y + e.h > this.maxRow &&
              (t ? (e.h = this.maxRow - e.y) : (e.y = this.maxRow - e.h)),
            s.samePos(e, i) || (e._dirty = !0),
            this
          );
        }
        getDirtyNodes(e) {
          return e
            ? this.nodes.filter((e) => e._dirty && !s.samePos(e, e._orig))
            : this.nodes.filter((e) => e._dirty);
        }
        _notify(e) {
          if (this.batchMode || !this.onChange) return this;
          let t = (e || []).concat(this.getDirtyNodes());
          return this.onChange(t), this;
        }
        cleanNodes() {
          return (
            this.batchMode ||
              this.nodes.forEach((e) => {
                delete e._dirty, delete e._lastTried;
              }),
            this
          );
        }
        saveInitial() {
          return (
            this.nodes.forEach((e) => {
              (e._orig = s.copyPos({}, e)), delete e._dirty;
            }),
            (this._hasLocked = this.nodes.some((e) => e.locked)),
            this
          );
        }
        restoreInitial() {
          return (
            this.nodes.forEach((e) => {
              s.samePos(e, e._orig) || (s.copyPos(e, e._orig), (e._dirty = !0));
            }),
            this._notify(),
            this
          );
        }
        findEmptyPosition(e, t = this.nodes, i = this.column, o) {
          let n = !1;
          for (let r = o ? o.y * i + (o.x + o.w) : 0; !n; ++r) {
            let o = r % i,
              l = Math.floor(r / i);
            if (o + e.w > i) continue;
            let h = { x: o, y: l, w: e.w, h: e.h };
            t.find((e) => s.isIntercepted(h, e)) ||
              ((e.x === o && e.y === l) || (e._dirty = !0),
              (e.x = o),
              (e.y = l),
              delete e.autoPosition,
              (n = !0));
          }
          return n;
        }
        addNode(e, t = !1, i) {
          let s,
            o = this.nodes.find((t) => t._id === e._id);
          return (
            o ||
            (this._inColumnResize ? this.nodeBoundFix(e) : this.prepareNode(e),
            delete e._temporaryRemoved,
            delete e._removeDOM,
            e.autoPosition &&
              this.findEmptyPosition(e, this.nodes, this.column, i) &&
              (delete e.autoPosition, (s = !0)),
            this.nodes.push(e),
            t && this.addedNodes.push(e),
            s || this._fixCollisions(e),
            this.batchMode || this._packNodes()._notify(),
            e)
          );
        }
        removeNode(e, t = !0, i = !1) {
          return this.nodes.find((t) => t._id === e._id)
            ? (i && this.removedNodes.push(e),
              t && (e._removeDOM = !0),
              (this.nodes = this.nodes.filter((t) => t._id !== e._id)),
              e._isAboutToRemove || this._packNodes(),
              this._notify([e]),
              this)
            : this;
        }
        removeAll(e = !0, t = !0) {
          if ((delete this._layouts, !this.nodes.length)) return this;
          e && this.nodes.forEach((e) => (e._removeDOM = !0));
          const i = this.nodes;
          return (this.removedNodes = t ? i : []), (this.nodes = []), this._notify(i);
        }
        moveNodeCheck(e, t) {
          if (!this.changedPosConstrain(e, t)) return !1;
          if (((t.pack = !0), !this.maxRow)) return this.moveNode(e, t);
          let i,
            n = new o({
              column: this.column,
              float: this.float,
              nodes: this.nodes.map((t) => (t._id === e._id ? ((i = { ...t }), i) : { ...t })),
            });
          if (!i) return !1;
          let r = n.moveNode(i, t) && n.getRow() <= Math.max(this.getRow(), this.maxRow);
          if (!r && !t.resizing && t.collide) {
            let i = t.collide.el.gridstackNode;
            if (this.swap(e, i)) return this._notify(), !0;
          }
          return (
            !!r &&
            (n.nodes
              .filter((e) => e._dirty)
              .forEach((e) => {
                let t = this.nodes.find((t) => t._id === e._id);
                t && (s.copyPos(t, e), (t._dirty = !0));
              }),
            this._notify(),
            !0)
          );
        }
        willItFit(e) {
          if ((delete e._willFitPos, !this.maxRow)) return !0;
          let t = new o({
              column: this.column,
              float: this.float,
              nodes: this.nodes.map((e) => ({ ...e })),
            }),
            i = { ...e };
          return (
            this.cleanupNode(i),
            delete i.el,
            delete i._id,
            delete i.content,
            delete i.grid,
            t.addNode(i),
            t.getRow() <= this.maxRow && ((e._willFitPos = s.copyPos({}, i)), !0)
          );
        }
        changedPosConstrain(e, t) {
          return (
            (t.w = t.w || e.w),
            (t.h = t.h || e.h),
            e.x !== t.x ||
              e.y !== t.y ||
              (e.maxW && (t.w = Math.min(t.w, e.maxW)),
              e.maxH && (t.h = Math.min(t.h, e.maxH)),
              e.minW && (t.w = Math.max(t.w, e.minW)),
              e.minH && (t.h = Math.max(t.h, e.minH)),
              e.w !== t.w || e.h !== t.h)
          );
        }
        moveNode(e, t) {
          if (!e || !t) return !1;
          let i;
          void 0 !== t.pack || this.batchMode || (i = t.pack = !0),
            'number' != typeof t.x && (t.x = e.x),
            'number' != typeof t.y && (t.y = e.y),
            'number' != typeof t.w && (t.w = e.w),
            'number' != typeof t.h && (t.h = e.h);
          let o = e.w !== t.w || e.h !== t.h,
            n = s.copyPos({}, e, !0);
          if (
            (s.copyPos(n, t),
            this.nodeBoundFix(n, o),
            s.copyPos(t, n),
            !t.forceCollide && s.samePos(e, t))
          )
            return !1;
          let r = s.copyPos({}, e),
            l = this.collideAll(e, n, t.skip),
            h = !0;
          if (l.length) {
            let o = e._moving && !t.nested,
              r = o ? this.directionCollideCoverage(e, t, l) : l[0];
            if (o && r && e.grid?.opts?.subGridDynamic && !e.grid._isTemp) {
              let i = s.areaIntercept(t.rect, r._rect),
                o = s.area(t.rect),
                n = s.area(r._rect);
              i / (o < n ? o : n) > 0.8 && (r.grid.makeSubGrid(r.el, void 0, e), (r = void 0));
            }
            r ? (h = !this._fixCollisions(e, n, r, t)) : ((h = !1), i && delete t.pack);
          }
          return (
            h && ((e._dirty = !0), s.copyPos(e, n)),
            t.pack && this._packNodes()._notify(),
            !s.samePos(e, r)
          );
        }
        getRow() {
          return this.nodes.reduce((e, t) => Math.max(e, t.y + t.h), 0);
        }
        beginUpdate(e) {
          return (
            e._updating ||
              ((e._updating = !0), delete e._skipDown, this.batchMode || this.saveInitial()),
            this
          );
        }
        endUpdate() {
          let e = this.nodes.find((e) => e._updating);
          return e && (delete e._updating, delete e._skipDown), this;
        }
        save(e = !0, t) {
          let i = this._layouts?.length,
            o = i && this.column !== i - 1 ? this._layouts[i - 1] : null,
            n = [];
          return (
            this.sortNodes(),
            this.nodes.forEach((i) => {
              let r = o?.find((e) => e._id === i._id),
                l = { ...i, ...(r || {}) };
              s.removeInternalForSave(l, !e), t && t(i, l), n.push(l);
            }),
            n
          );
        }
        layoutsNodesChange(e) {
          return (
            !this._layouts ||
              this._inColumnResize ||
              this._layouts.forEach((t, i) => {
                if (!t || i === this.column) return this;
                if (i < this.column) this._layouts[i] = void 0;
                else {
                  let s = i / this.column;
                  e.forEach((e) => {
                    if (!e._orig) return;
                    let i = t.find((t) => t._id === e._id);
                    i &&
                      (i.y >= 0 && e.y !== e._orig.y && (i.y += e.y - e._orig.y),
                      e.x !== e._orig.x && (i.x = Math.round(e.x * s)),
                      e.w !== e._orig.w && (i.w = Math.round(e.w * s)));
                  });
                }
              }),
            this
          );
        }
        columnChanged(e, t, i = 'moveScale') {
          if (!this.nodes.length || !t || e === t) return this;
          if ('none' === i) return this;
          const o = 'compact' === i || 'list' === i;
          o && this.sortNodes(1), t < e && this.cacheLayout(this.nodes, e), this.batchUpdate();
          let n = [],
            r = o ? this.nodes : s.sort(this.nodes, -1);
          if (t > e && this._layouts) {
            const i = this._layouts[t] || [];
            let s = this._layouts.length - 1;
            !i.length &&
              e !== s &&
              this._layouts[s]?.length &&
              ((e = s),
              this._layouts[s].forEach((e) => {
                let t = r.find((t) => t._id === e._id);
                t &&
                  (o || e.autoPosition || ((t.x = e.x ?? t.x), (t.y = e.y ?? t.y)),
                  (t.w = e.w ?? t.w),
                  (null != e.x && void 0 !== e.y) || (t.autoPosition = !0));
              })),
              i.forEach((e) => {
                let t = r.findIndex((t) => t._id === e._id);
                if (-1 !== t) {
                  const i = r[t];
                  if (o) return void (i.w = e.w);
                  (e.autoPosition || isNaN(e.x) || isNaN(e.y)) && this.findEmptyPosition(e, n),
                    e.autoPosition ||
                      ((i.x = e.x ?? i.x), (i.y = e.y ?? i.y), (i.w = e.w ?? i.w), n.push(i)),
                    r.splice(t, 1);
                }
              });
          }
          if (o) this.compact(i, !1);
          else {
            if (r.length)
              if ('function' == typeof i) i(t, e, n, r);
              else {
                let s = o ? 1 : t / e,
                  l = 'move' === i || 'moveScale' === i,
                  h = 'scale' === i || 'moveScale' === i;
                r.forEach((i) => {
                  (i.x = 1 === t ? 0 : l ? Math.round(i.x * s) : Math.min(i.x, t - 1)),
                    (i.w =
                      1 === t || 1 === e ? 1 : h ? Math.round(i.w * s) || 1 : Math.min(i.w, t)),
                    n.push(i);
                }),
                  (r = []);
              }
            (n = s.sort(n, -1)),
              (this._inColumnResize = !0),
              (this.nodes = []),
              n.forEach((e) => {
                this.addNode(e, !1), delete e._orig;
              });
          }
          return (
            this.nodes.forEach((e) => delete e._orig),
            this.batchUpdate(!1, !o),
            delete this._inColumnResize,
            this
          );
        }
        cacheLayout(e, t, i = !1) {
          let s = [];
          return (
            e.forEach((e, t) => {
              if (void 0 === e._id) {
                const t = e.id ? this.nodes.find((t) => t.id === e.id) : void 0;
                e._id = t?._id ?? o._idSeq++;
              }
              s[t] = { x: e.x, y: e.y, w: e.w, _id: e._id };
            }),
            (this._layouts = i ? [] : this._layouts || []),
            (this._layouts[t] = s),
            this
          );
        }
        cacheOneLayout(e, t) {
          e._id = e._id ?? o._idSeq++;
          let i = { x: e.x, y: e.y, w: e.w, _id: e._id };
          (e.autoPosition || void 0 === e.x) &&
            (delete i.x, delete i.y, e.autoPosition && (i.autoPosition = !0)),
            (this._layouts = this._layouts || []),
            (this._layouts[t] = this._layouts[t] || []);
          let s = this.findCacheLayout(e, t);
          return -1 === s ? this._layouts[t].push(i) : (this._layouts[t][s] = i), this;
        }
        findCacheLayout(e, t) {
          return this._layouts?.[t]?.findIndex((t) => t._id === e._id) ?? -1;
        }
        removeNodeFromLayoutCache(e) {
          if (this._layouts)
            for (let t = 0; t < this._layouts.length; t++) {
              let i = this.findCacheLayout(e, t);
              -1 !== i && this._layouts[t].splice(i, 1);
            }
        }
        cleanupNode(e) {
          for (let t in e) '_' === t[0] && '_id' !== t && delete e[t];
          return this;
        }
      }
      o._idSeq = 0;
      const n = {
          alwaysShowResizeHandle: 'mobile',
          animate: !0,
          auto: !0,
          cellHeight: 'auto',
          cellHeightThrottle: 100,
          cellHeightUnit: 'px',
          column: 12,
          draggable: { handle: '.grid-stack-item-content', appendTo: 'body', scroll: !0 },
          handle: '.grid-stack-item-content',
          itemClass: 'grid-stack-item',
          margin: 10,
          marginUnit: 'px',
          maxRow: 0,
          minRow: 0,
          placeholderClass: 'grid-stack-placeholder',
          placeholderText: '',
          removableOptions: { accept: 'grid-stack-item', decline: 'grid-stack-non-removable' },
          resizable: { handles: 'se' },
          rtl: 'auto',
        },
        r = { handle: '.grid-stack-item-content', appendTo: 'body' };
      class l {}
      const h =
        'undefined' != typeof window &&
        'undefined' != typeof document &&
        ('ontouchstart' in document ||
          'ontouchstart' in window ||
          (window.DocumentTouch && document instanceof window.DocumentTouch) ||
          navigator.maxTouchPoints > 0 ||
          navigator.msMaxTouchPoints > 0);
      class a {}
      function d(e, t) {
        if (e.touches.length > 1) return;
        e.cancelable && e.preventDefault();
        const i = e.changedTouches[0],
          s = document.createEvent('MouseEvents');
        s.initMouseEvent(
          t,
          !0,
          !0,
          window,
          1,
          i.screenX,
          i.screenY,
          i.clientX,
          i.clientY,
          !1,
          !1,
          !1,
          !1,
          0,
          null,
        ),
          e.target.dispatchEvent(s);
      }
      function g(e, t) {
        e.cancelable && e.preventDefault();
        const i = document.createEvent('MouseEvents');
        i.initMouseEvent(
          t,
          !0,
          !0,
          window,
          1,
          e.screenX,
          e.screenY,
          e.clientX,
          e.clientY,
          !1,
          !1,
          !1,
          !1,
          0,
          null,
        ),
          e.target.dispatchEvent(i);
      }
      function c(e) {
        a.touchHandled || ((a.touchHandled = !0), d(e, 'mousedown'));
      }
      function p(e) {
        a.touchHandled && d(e, 'mousemove');
      }
      function u(e) {
        if (!a.touchHandled) return;
        a.pointerLeaveTimeout &&
          (window.clearTimeout(a.pointerLeaveTimeout), delete a.pointerLeaveTimeout);
        const t = !!l.dragElement;
        d(e, 'mouseup'), t || d(e, 'click'), (a.touchHandled = !1);
      }
      function m(e) {
        'mouse' !== e.pointerType && e.target.releasePointerCapture(e.pointerId);
      }
      function f(e) {
        l.dragElement && 'mouse' !== e.pointerType && g(e, 'mouseenter');
      }
      function _(e) {
        l.dragElement &&
          'mouse' !== e.pointerType &&
          (a.pointerLeaveTimeout = window.setTimeout(() => {
            delete a.pointerLeaveTimeout, g(e, 'mouseleave');
          }, 10));
      }
      class y {
        constructor(e, t, i) {
          (this.host = e),
            (this.dir = t),
            (this.option = i),
            (this.moving = !1),
            (this._mouseDown = this._mouseDown.bind(this)),
            (this._mouseMove = this._mouseMove.bind(this)),
            (this._mouseUp = this._mouseUp.bind(this)),
            (this._keyEvent = this._keyEvent.bind(this)),
            this._init();
        }
        _init() {
          const e = (this.el = document.createElement('div'));
          return (
            e.classList.add('ui-resizable-handle'),
            e.classList.add(`${y.prefix}${this.dir}`),
            (e.style.zIndex = '100'),
            (e.style.userSelect = 'none'),
            this.host.appendChild(this.el),
            this.el.addEventListener('mousedown', this._mouseDown),
            h &&
              (this.el.addEventListener('touchstart', c),
              this.el.addEventListener('pointerdown', m)),
            this
          );
        }
        destroy() {
          return (
            this.moving && this._mouseUp(this.mouseDownEvent),
            this.el.removeEventListener('mousedown', this._mouseDown),
            h &&
              (this.el.removeEventListener('touchstart', c),
              this.el.removeEventListener('pointerdown', m)),
            this.host.removeChild(this.el),
            delete this.el,
            delete this.host,
            this
          );
        }
        _mouseDown(e) {
          (this.mouseDownEvent = e),
            document.addEventListener('mousemove', this._mouseMove, { capture: !0, passive: !0 }),
            document.addEventListener('mouseup', this._mouseUp, !0),
            h &&
              (this.el.addEventListener('touchmove', p), this.el.addEventListener('touchend', u)),
            e.stopPropagation(),
            e.preventDefault();
        }
        _mouseMove(e) {
          let t = this.mouseDownEvent;
          this.moving
            ? this._triggerEvent('move', e)
            : Math.abs(e.x - t.x) + Math.abs(e.y - t.y) > 2 &&
              ((this.moving = !0),
              this._triggerEvent('start', this.mouseDownEvent),
              this._triggerEvent('move', e),
              document.addEventListener('keydown', this._keyEvent)),
            e.stopPropagation();
        }
        _mouseUp(e) {
          this.moving &&
            (this._triggerEvent('stop', e),
            document.removeEventListener('keydown', this._keyEvent)),
            document.removeEventListener('mousemove', this._mouseMove, !0),
            document.removeEventListener('mouseup', this._mouseUp, !0),
            h &&
              (this.el.removeEventListener('touchmove', p),
              this.el.removeEventListener('touchend', u)),
            delete this.moving,
            delete this.mouseDownEvent,
            e.stopPropagation(),
            e.preventDefault();
        }
        _keyEvent(e) {
          'Escape' === e.key &&
            (this.host.gridstackNode?.grid?.engine.restoreInitial(),
            this._mouseUp(this.mouseDownEvent));
        }
        _triggerEvent(e, t) {
          return this.option[e] && this.option[e](t), this;
        }
      }
      y.prefix = 'ui-resizable-';
      class v {
        constructor() {
          this._eventRegister = {};
        }
        get disabled() {
          return this._disabled;
        }
        on(e, t) {
          this._eventRegister[e] = t;
        }
        off(e) {
          delete this._eventRegister[e];
        }
        enable() {
          this._disabled = !1;
        }
        disable() {
          this._disabled = !0;
        }
        destroy() {
          delete this._eventRegister;
        }
        triggerEvent(e, t) {
          if (!this.disabled && this._eventRegister && this._eventRegister[e])
            return this._eventRegister[e](t);
        }
      }
      class b extends v {
        constructor(e, t = {}) {
          super(),
            (this.el = e),
            (this.option = t),
            (this.rectScale = { x: 1, y: 1 }),
            (this._ui = () => {
              const e = this.el.parentElement.getBoundingClientRect(),
                t = {
                  width: this.originalRect.width,
                  height: this.originalRect.height + this.scrolled,
                  left: this.originalRect.left,
                  top: this.originalRect.top - this.scrolled,
                },
                i = this.temporalRect || t;
              return {
                position: {
                  left: (i.left - e.left) * this.rectScale.x,
                  top: (i.top - e.top) * this.rectScale.y,
                },
                size: { width: i.width * this.rectScale.x, height: i.height * this.rectScale.y },
              };
            }),
            (this._mouseOver = this._mouseOver.bind(this)),
            (this._mouseOut = this._mouseOut.bind(this)),
            this.enable(),
            this._setupAutoHide(this.option.autoHide),
            this._setupHandlers();
        }
        on(e, t) {
          super.on(e, t);
        }
        off(e) {
          super.off(e);
        }
        enable() {
          super.enable(),
            this.el.classList.remove('ui-resizable-disabled'),
            this._setupAutoHide(this.option.autoHide);
        }
        disable() {
          super.disable(), this.el.classList.add('ui-resizable-disabled'), this._setupAutoHide(!1);
        }
        destroy() {
          this._removeHandlers(), this._setupAutoHide(!1), delete this.el, super.destroy();
        }
        updateOption(e) {
          let t = e.handles && e.handles !== this.option.handles,
            i = e.autoHide && e.autoHide !== this.option.autoHide;
          return (
            Object.keys(e).forEach((t) => (this.option[t] = e[t])),
            t && (this._removeHandlers(), this._setupHandlers()),
            i && this._setupAutoHide(this.option.autoHide),
            this
          );
        }
        _setupAutoHide(e) {
          return (
            e
              ? (this.el.classList.add('ui-resizable-autohide'),
                this.el.addEventListener('mouseover', this._mouseOver),
                this.el.addEventListener('mouseout', this._mouseOut))
              : (this.el.classList.remove('ui-resizable-autohide'),
                this.el.removeEventListener('mouseover', this._mouseOver),
                this.el.removeEventListener('mouseout', this._mouseOut),
                l.overResizeElement === this && delete l.overResizeElement),
            this
          );
        }
        _mouseOver(e) {
          l.overResizeElement ||
            l.dragElement ||
            ((l.overResizeElement = this), this.el.classList.remove('ui-resizable-autohide'));
        }
        _mouseOut(e) {
          l.overResizeElement === this &&
            (delete l.overResizeElement, this.el.classList.add('ui-resizable-autohide'));
        }
        _setupHandlers() {
          return (
            (this.handlers = this.option.handles
              .split(',')
              .map((e) => e.trim())
              .map(
                (e) =>
                  new y(this.el, e, {
                    start: (e) => {
                      this._resizeStart(e);
                    },
                    stop: (e) => {
                      this._resizeStop(e);
                    },
                    move: (t) => {
                      this._resizing(t, e);
                    },
                  }),
              )),
            this
          );
        }
        _resizeStart(e) {
          (this.sizeToContent = s.shouldSizeToContent(this.el.gridstackNode, !0)),
            (this.originalRect = this.el.getBoundingClientRect()),
            (this.scrollEl = s.getScrollElement(this.el)),
            (this.scrollY = this.scrollEl.scrollTop),
            (this.scrolled = 0),
            (this.startEvent = e),
            this._setupHelper(),
            this._applyChange();
          const t = s.initEvent(e, { type: 'resizestart', target: this.el });
          return (
            this.option.start && this.option.start(t, this._ui()),
            this.el.classList.add('ui-resizable-resizing'),
            this.triggerEvent('resizestart', t),
            this
          );
        }
        _resizing(e, t) {
          (this.scrolled = this.scrollEl.scrollTop - this.scrollY),
            (this.temporalRect = this._getChange(e, t)),
            this._applyChange();
          const i = s.initEvent(e, { type: 'resize', target: this.el });
          return (
            this.option.resize && this.option.resize(i, this._ui()),
            this.triggerEvent('resize', i),
            this
          );
        }
        _resizeStop(e) {
          const t = s.initEvent(e, { type: 'resizestop', target: this.el });
          return (
            this.option.stop && this.option.stop(t),
            this.el.classList.remove('ui-resizable-resizing'),
            this.triggerEvent('resizestop', t),
            this._cleanHelper(),
            delete this.startEvent,
            delete this.originalRect,
            delete this.temporalRect,
            delete this.scrollY,
            delete this.scrolled,
            this
          );
        }
        _setupHelper() {
          (this.elOriginStyleVal = b._originStyleProp.map((e) => this.el.style[e])),
            (this.parentOriginStylePosition = this.el.parentElement.style.position);
          const e = this.el.parentElement,
            t = s.getValuesFromTransformedElement(e);
          return (
            (this.rectScale = { x: t.xScale, y: t.yScale }),
            getComputedStyle(this.el.parentElement).position.match(/static/) &&
              (this.el.parentElement.style.position = 'relative'),
            (this.el.style.position = 'absolute'),
            (this.el.style.opacity = '0.8'),
            this
          );
        }
        _cleanHelper() {
          return (
            b._originStyleProp.forEach((e, t) => {
              this.el.style[e] = this.elOriginStyleVal[t] || null;
            }),
            (this.el.parentElement.style.position = this.parentOriginStylePosition || null),
            this
          );
        }
        _getChange(e, t) {
          const i = this.startEvent,
            s = {
              width: this.originalRect.width,
              height: this.originalRect.height + this.scrolled,
              left: this.originalRect.left,
              top: this.originalRect.top - this.scrolled,
            },
            o = e.clientX - i.clientX,
            n = this.sizeToContent ? 0 : e.clientY - i.clientY;
          let r, l;
          t.indexOf('e') > -1
            ? (s.width += o)
            : t.indexOf('w') > -1 && ((s.width -= o), (s.left += o), (r = !0)),
            t.indexOf('s') > -1
              ? (s.height += n)
              : t.indexOf('n') > -1 && ((s.height -= n), (s.top += n), (l = !0));
          const h = this._constrainSize(s.width, s.height, r, l);
          return (
            Math.round(s.width) !== Math.round(h.width) &&
              (t.indexOf('w') > -1 && (s.left += s.width - h.width), (s.width = h.width)),
            Math.round(s.height) !== Math.round(h.height) &&
              (t.indexOf('n') > -1 && (s.top += s.height - h.height), (s.height = h.height)),
            s
          );
        }
        _constrainSize(e, t, i, s) {
          const o = this.option,
            n = (i ? o.maxWidthMoveLeft : o.maxWidth) || Number.MAX_SAFE_INTEGER,
            r = o.minWidth / this.rectScale.x || e,
            l = (s ? o.maxHeightMoveUp : o.maxHeight) || Number.MAX_SAFE_INTEGER,
            h = o.minHeight / this.rectScale.y || t;
          return { width: Math.min(n, Math.max(r, e)), height: Math.min(l, Math.max(h, t)) };
        }
        _applyChange() {
          let e = { left: 0, top: 0, width: 0, height: 0 };
          if ('absolute' === this.el.style.position) {
            const t = this.el.parentElement,
              { left: i, top: s } = t.getBoundingClientRect();
            e = { left: i, top: s, width: 0, height: 0 };
          }
          return this.temporalRect
            ? (Object.keys(this.temporalRect).forEach((t) => {
                const i = this.temporalRect[t],
                  s =
                    'width' === t || 'left' === t
                      ? this.rectScale.x
                      : 'height' === t || 'top' === t
                        ? this.rectScale.y
                        : 1;
                this.el.style[t] = (i - e[t]) * s + 'px';
              }),
              this)
            : this;
        }
        _removeHandlers() {
          return this.handlers.forEach((e) => e.destroy()), delete this.handlers, this;
        }
      }
      b._originStyleProp = ['width', 'height', 'position', 'left', 'top', 'opacity', 'zIndex'];
      class E extends v {
        constructor(e, t = {}) {
          super(),
            (this.el = e),
            (this.option = t),
            (this.dragTransform = { xScale: 1, yScale: 1, xOffset: 0, yOffset: 0 });
          const i = t.handle.substring(1),
            s = e.gridstackNode;
          (this.dragEls = e.classList.contains(i)
            ? [e]
            : s?.subGrid
              ? [e.querySelector(t.handle) || e]
              : Array.from(e.querySelectorAll(t.handle))),
            0 === this.dragEls.length && (this.dragEls = [e]),
            (this._mouseDown = this._mouseDown.bind(this)),
            (this._mouseMove = this._mouseMove.bind(this)),
            (this._mouseUp = this._mouseUp.bind(this)),
            (this._keyEvent = this._keyEvent.bind(this)),
            this.enable();
        }
        on(e, t) {
          super.on(e, t);
        }
        off(e) {
          super.off(e);
        }
        enable() {
          !1 !== this.disabled &&
            (super.enable(),
            this.dragEls.forEach((e) => {
              e.addEventListener('mousedown', this._mouseDown),
                h && (e.addEventListener('touchstart', c), e.addEventListener('pointerdown', m));
            }),
            this.el.classList.remove('ui-draggable-disabled'));
        }
        disable(e = !1) {
          !0 !== this.disabled &&
            (super.disable(),
            this.dragEls.forEach((e) => {
              e.removeEventListener('mousedown', this._mouseDown),
                h &&
                  (e.removeEventListener('touchstart', c), e.removeEventListener('pointerdown', m));
            }),
            e || this.el.classList.add('ui-draggable-disabled'));
        }
        destroy() {
          this.dragTimeout && window.clearTimeout(this.dragTimeout),
            delete this.dragTimeout,
            this.mouseDownEvent && this._mouseUp(this.mouseDownEvent),
            this.disable(!0),
            delete this.el,
            delete this.helper,
            delete this.option,
            super.destroy();
        }
        updateOption(e) {
          return Object.keys(e).forEach((t) => (this.option[t] = e[t])), this;
        }
        _mouseDown(e) {
          if (!l.mouseHandled)
            return (
              0 !== e.button ||
                (!this.dragEls.find((t) => t === e.target) &&
                  e.target.closest(
                    'input,textarea,button,select,option,[contenteditable="true"],.ui-resizable-handle',
                  )) ||
                (this.option.cancel && e.target.closest(this.option.cancel)) ||
                ((this.mouseDownEvent = e),
                delete this.dragging,
                delete l.dragElement,
                delete l.dropElement,
                document.addEventListener('mousemove', this._mouseMove, {
                  capture: !0,
                  passive: !0,
                }),
                document.addEventListener('mouseup', this._mouseUp, !0),
                h &&
                  (e.target.addEventListener('touchmove', p),
                  e.target.addEventListener('touchend', u)),
                e.preventDefault(),
                document.activeElement && document.activeElement.blur(),
                (l.mouseHandled = !0)),
              !0
            );
        }
        _callDrag(e) {
          if (!this.dragging) return;
          const t = s.initEvent(e, { target: this.el, type: 'drag' });
          this.option.drag && this.option.drag(t, this.ui()), this.triggerEvent('drag', t);
        }
        _mouseMove(e) {
          let t = this.mouseDownEvent;
          if (((this.lastDrag = e), this.dragging))
            if ((this._dragFollow(e), l.pauseDrag)) {
              const t = Number.isInteger(l.pauseDrag) ? l.pauseDrag : 100;
              this.dragTimeout && window.clearTimeout(this.dragTimeout),
                (this.dragTimeout = window.setTimeout(() => this._callDrag(e), t));
            } else this._callDrag(e);
          else if (Math.abs(e.x - t.x) + Math.abs(e.y - t.y) > 3) {
            (this.dragging = !0), (l.dragElement = this);
            let t = this.el.gridstackNode?.grid;
            t ? (l.dropElement = t.el.ddElement.ddDroppable) : delete l.dropElement,
              (this.helper = this._createHelper(e)),
              this._setupHelperContainmentStyle(),
              (this.dragTransform = s.getValuesFromTransformedElement(this.helperContainment)),
              (this.dragOffset = this._getDragOffset(e, this.el, this.helperContainment)),
              this._setupHelperStyle(e);
            const i = s.initEvent(e, { target: this.el, type: 'dragstart' });
            this.option.start && this.option.start(i, this.ui()),
              this.triggerEvent('dragstart', i),
              document.addEventListener('keydown', this._keyEvent);
          }
          return !0;
        }
        _mouseUp(e) {
          if (
            (document.removeEventListener('mousemove', this._mouseMove, !0),
            document.removeEventListener('mouseup', this._mouseUp, !0),
            h &&
              (e.target.removeEventListener('touchmove', p, !0),
              e.target.removeEventListener('touchend', u, !0)),
            this.dragging)
          ) {
            delete this.dragging,
              this.el.gridstackNode?._origRotate,
              document.removeEventListener('keydown', this._keyEvent),
              l.dropElement?.el === this.el.parentElement && delete l.dropElement,
              (this.helperContainment.style.position = this.parentOriginStylePosition || null),
              this.helper === this.el ? this._removeHelperStyle() : this.helper.remove();
            const t = s.initEvent(e, { target: this.el, type: 'dragstop' });
            this.option.stop && this.option.stop(t),
              this.triggerEvent('dragstop', t),
              l.dropElement && l.dropElement.drop(e);
          }
          delete this.helper,
            delete this.mouseDownEvent,
            delete l.dragElement,
            delete l.dropElement,
            delete l.mouseHandled,
            e.preventDefault();
        }
        _keyEvent(e) {
          const t = this.el.gridstackNode;
          if (!t?.grid) return;
          const i = t.grid;
          if ('Escape' === e.key)
            t._origRotate && ((t._orig = t._origRotate), delete t._origRotate),
              i.engine.restoreInitial(),
              this._mouseUp(this.mouseDownEvent);
          else if ('r' === e.key || 'R' === e.key) {
            if (!s.canBeRotated(t)) return;
            (t._origRotate = t._origRotate || { ...t._orig }),
              delete t._moving,
              i
                .setAnimation(!1)
                .rotate(t.el, {
                  top: -this.dragOffset.offsetTop,
                  left: -this.dragOffset.offsetLeft,
                })
                .setAnimation(),
              (t._moving = !0),
              (this.dragOffset = this._getDragOffset(this.lastDrag, t.el, this.helperContainment)),
              (this.helper.style.width = this.dragOffset.width + 'px'),
              (this.helper.style.height = this.dragOffset.height + 'px'),
              s.swap(t._orig, 'w', 'h'),
              delete t._rect,
              this._mouseMove(this.lastDrag);
          }
        }
        _createHelper(e) {
          let t = this.el;
          return (
            'function' == typeof this.option.helper
              ? (t = this.option.helper(e))
              : 'clone' === this.option.helper && (t = s.cloneNode(this.el)),
            document.body.contains(t) ||
              s.appendTo(
                t,
                'parent' === this.option.appendTo ? this.el.parentElement : this.option.appendTo,
              ),
            t === this.el &&
              (this.dragElementOriginStyle = E.originStyleProp.map((e) => this.el.style[e])),
            t
          );
        }
        _setupHelperStyle(e) {
          this.helper.classList.add('ui-draggable-dragging');
          const t = this.helper.style;
          return (
            (t.pointerEvents = 'none'),
            (t.width = this.dragOffset.width + 'px'),
            (t.height = this.dragOffset.height + 'px'),
            (t.willChange = 'left, top'),
            (t.position = 'fixed'),
            this._dragFollow(e),
            (t.transition = 'none'),
            setTimeout(() => {
              this.helper && (t.transition = null);
            }, 0),
            this
          );
        }
        _removeHelperStyle() {
          if (
            (this.helper.classList.remove('ui-draggable-dragging'),
            !this.helper?.gridstackNode?._isAboutToRemove && this.dragElementOriginStyle)
          ) {
            let e = this.helper,
              t = this.dragElementOriginStyle.transition || null;
            (e.style.transition = this.dragElementOriginStyle.transition = 'none'),
              E.originStyleProp.forEach(
                (t) => (e.style[t] = this.dragElementOriginStyle[t] || null),
              ),
              setTimeout(() => (e.style.transition = t), 50);
          }
          return delete this.dragElementOriginStyle, this;
        }
        _dragFollow(e) {
          let t = 0,
            i = 0;
          const s = this.helper.style,
            o = this.dragOffset;
          (s.left = (e.clientX + o.offsetLeft - t) * this.dragTransform.xScale + 'px'),
            (s.top = (e.clientY + o.offsetTop - i) * this.dragTransform.yScale + 'px');
        }
        _setupHelperContainmentStyle() {
          return (
            (this.helperContainment = this.helper.parentElement),
            'fixed' !== this.helper.style.position &&
              ((this.parentOriginStylePosition = this.helperContainment.style.position),
              getComputedStyle(this.helperContainment).position.match(/static/) &&
                (this.helperContainment.style.position = 'relative')),
            this
          );
        }
        _getDragOffset(e, t, i) {
          let s = 0,
            o = 0;
          i && ((s = this.dragTransform.xOffset), (o = this.dragTransform.yOffset));
          const n = t.getBoundingClientRect();
          return {
            left: n.left,
            top: n.top,
            offsetLeft: -e.clientX + n.left - s,
            offsetTop: -e.clientY + n.top - o,
            width: n.width * this.dragTransform.xScale,
            height: n.height * this.dragTransform.yScale,
          };
        }
        ui() {
          const e = this.el.parentElement.getBoundingClientRect(),
            t = this.helper.getBoundingClientRect();
          return {
            position: {
              top: (t.top - e.top) * this.dragTransform.yScale,
              left: (t.left - e.left) * this.dragTransform.xScale,
            },
          };
        }
      }
      E.originStyleProp = [
        'transition',
        'pointerEvents',
        'position',
        'left',
        'top',
        'minWidth',
        'willChange',
      ];
      class w extends v {
        constructor(e, t = {}) {
          super(),
            (this.el = e),
            (this.option = t),
            (this._mouseEnter = this._mouseEnter.bind(this)),
            (this._mouseLeave = this._mouseLeave.bind(this)),
            this.enable(),
            this._setupAccept();
        }
        on(e, t) {
          super.on(e, t);
        }
        off(e) {
          super.off(e);
        }
        enable() {
          !1 !== this.disabled &&
            (super.enable(),
            this.el.classList.add('ui-droppable'),
            this.el.classList.remove('ui-droppable-disabled'),
            this.el.addEventListener('mouseenter', this._mouseEnter),
            this.el.addEventListener('mouseleave', this._mouseLeave),
            h &&
              (this.el.addEventListener('pointerenter', f),
              this.el.addEventListener('pointerleave', _)));
        }
        disable(e = !1) {
          !0 !== this.disabled &&
            (super.disable(),
            this.el.classList.remove('ui-droppable'),
            e || this.el.classList.add('ui-droppable-disabled'),
            this.el.removeEventListener('mouseenter', this._mouseEnter),
            this.el.removeEventListener('mouseleave', this._mouseLeave),
            h &&
              (this.el.removeEventListener('pointerenter', f),
              this.el.removeEventListener('pointerleave', _)));
        }
        destroy() {
          this.disable(!0),
            this.el.classList.remove('ui-droppable'),
            this.el.classList.remove('ui-droppable-disabled'),
            super.destroy();
        }
        updateOption(e) {
          return Object.keys(e).forEach((t) => (this.option[t] = e[t])), this._setupAccept(), this;
        }
        _mouseEnter(e) {
          if (!l.dragElement) return;
          if (!this._canDrop(l.dragElement.el)) return;
          e.preventDefault(),
            e.stopPropagation(),
            l.dropElement && l.dropElement !== this && l.dropElement._mouseLeave(e, !0),
            (l.dropElement = this);
          const t = s.initEvent(e, { target: this.el, type: 'dropover' });
          this.option.over && this.option.over(t, this._ui(l.dragElement)),
            this.triggerEvent('dropover', t),
            this.el.classList.add('ui-droppable-over');
        }
        _mouseLeave(e, t = !1) {
          if (!l.dragElement || l.dropElement !== this) return;
          e.preventDefault(), e.stopPropagation();
          const i = s.initEvent(e, { target: this.el, type: 'dropout' });
          if (
            (this.option.out && this.option.out(i, this._ui(l.dragElement)),
            this.triggerEvent('dropout', i),
            l.dropElement === this && (delete l.dropElement, !t))
          ) {
            let t,
              i = this.el.parentElement;
            for (; !t && i; ) (t = i.ddElement?.ddDroppable), (i = i.parentElement);
            t && t._mouseEnter(e);
          }
        }
        drop(e) {
          e.preventDefault();
          const t = s.initEvent(e, { target: this.el, type: 'drop' });
          this.option.drop && this.option.drop(t, this._ui(l.dragElement)),
            this.triggerEvent('drop', t);
        }
        _canDrop(e) {
          return e && (!this.accept || this.accept(e));
        }
        _setupAccept() {
          return this.option.accept
            ? ('string' == typeof this.option.accept
                ? (this.accept = (e) =>
                    e.classList.contains(this.option.accept) || e.matches(this.option.accept))
                : (this.accept = this.option.accept),
              this)
            : this;
        }
        _ui(e) {
          return { draggable: e.el, ...e.ui() };
        }
      }
      class x {
        static init(e) {
          return e.ddElement || (e.ddElement = new x(e)), e.ddElement;
        }
        constructor(e) {
          this.el = e;
        }
        on(e, t) {
          return (
            this.ddDraggable && ['drag', 'dragstart', 'dragstop'].indexOf(e) > -1
              ? this.ddDraggable.on(e, t)
              : this.ddDroppable && ['drop', 'dropover', 'dropout'].indexOf(e) > -1
                ? this.ddDroppable.on(e, t)
                : this.ddResizable &&
                  ['resizestart', 'resize', 'resizestop'].indexOf(e) > -1 &&
                  this.ddResizable.on(e, t),
            this
          );
        }
        off(e) {
          return (
            this.ddDraggable && ['drag', 'dragstart', 'dragstop'].indexOf(e) > -1
              ? this.ddDraggable.off(e)
              : this.ddDroppable && ['drop', 'dropover', 'dropout'].indexOf(e) > -1
                ? this.ddDroppable.off(e)
                : this.ddResizable &&
                  ['resizestart', 'resize', 'resizestop'].indexOf(e) > -1 &&
                  this.ddResizable.off(e),
            this
          );
        }
        setupDraggable(e) {
          return (
            this.ddDraggable
              ? this.ddDraggable.updateOption(e)
              : (this.ddDraggable = new E(this.el, e)),
            this
          );
        }
        cleanDraggable() {
          return this.ddDraggable && (this.ddDraggable.destroy(), delete this.ddDraggable), this;
        }
        setupResizable(e) {
          return (
            this.ddResizable
              ? this.ddResizable.updateOption(e)
              : (this.ddResizable = new b(this.el, e)),
            this
          );
        }
        cleanResizable() {
          return this.ddResizable && (this.ddResizable.destroy(), delete this.ddResizable), this;
        }
        setupDroppable(e) {
          return (
            this.ddDroppable
              ? this.ddDroppable.updateOption(e)
              : (this.ddDroppable = new w(this.el, e)),
            this
          );
        }
        cleanDroppable() {
          return this.ddDroppable && (this.ddDroppable.destroy(), delete this.ddDroppable), this;
        }
      }
      const C = new (class {
        resizable(e, t, i, s) {
          return (
            this._getDDElements(e).forEach((e) => {
              if ('disable' === t || 'enable' === t) e.ddResizable && e.ddResizable[t]();
              else if ('destroy' === t) e.ddResizable && e.cleanResizable();
              else if ('option' === t) e.setupResizable({ [i]: s });
              else {
                const i = e.el.gridstackNode.grid;
                let s =
                  e.el.getAttribute('gs-resize-handles') || i.opts.resizable.handles || 'e,s,se';
                'all' === s && (s = 'n,e,s,w,se,sw,ne,nw');
                const o = !i.opts.alwaysShowResizeHandle;
                e.setupResizable({
                  ...i.opts.resizable,
                  handles: s,
                  autoHide: o,
                  start: t.start,
                  stop: t.stop,
                  resize: t.resize,
                });
              }
            }),
            this
          );
        }
        draggable(e, t, i, s) {
          return (
            this._getDDElements(e).forEach((e) => {
              if ('disable' === t || 'enable' === t) e.ddDraggable && e.ddDraggable[t]();
              else if ('destroy' === t) e.ddDraggable && e.cleanDraggable();
              else if ('option' === t) e.setupDraggable({ [i]: s });
              else {
                const i = e.el.gridstackNode.grid;
                e.setupDraggable({
                  ...i.opts.draggable,
                  start: t.start,
                  stop: t.stop,
                  drag: t.drag,
                });
              }
            }),
            this
          );
        }
        dragIn(e, t) {
          return this._getDDElements(e).forEach((e) => e.setupDraggable(t)), this;
        }
        droppable(e, t, i, s) {
          return (
            'function' != typeof t.accept ||
              t._accept ||
              ((t._accept = t.accept), (t.accept = (e) => t._accept(e))),
            this._getDDElements(e).forEach((e) => {
              'disable' === t || 'enable' === t
                ? e.ddDroppable && e.ddDroppable[t]()
                : 'destroy' === t
                  ? e.ddDroppable && e.cleanDroppable()
                  : 'option' === t
                    ? e.setupDroppable({ [i]: s })
                    : e.setupDroppable(t);
            }),
            this
          );
        }
        isDroppable(e) {
          return !(
            !(e && e.ddElement && e.ddElement.ddDroppable) || e.ddElement.ddDroppable.disabled
          );
        }
        isDraggable(e) {
          return !(
            !(e && e.ddElement && e.ddElement.ddDraggable) || e.ddElement.ddDraggable.disabled
          );
        }
        isResizable(e) {
          return !(
            !(e && e.ddElement && e.ddElement.ddResizable) || e.ddElement.ddResizable.disabled
          );
        }
        on(e, t, i) {
          return (
            this._getDDElements(e).forEach((e) =>
              e.on(t, (e) => {
                i(
                  e,
                  l.dragElement ? l.dragElement.el : e.target,
                  l.dragElement ? l.dragElement.helper : null,
                );
              }),
            ),
            this
          );
        }
        off(e, t) {
          return this._getDDElements(e).forEach((e) => e.off(t)), this;
        }
        _getDDElements(e, t = !0) {
          let i = s.getElements(e);
          if (!i.length) return [];
          let o = i.map((e) => e.ddElement || (t ? x.init(e) : null));
          return t || o.filter((e) => e), o;
        }
      })();
      class R {
        static init(e = {}, t = '.grid-stack') {
          if ('undefined' == typeof document) return null;
          let i = R.getGridElement(t);
          return i
            ? (i.gridstack || (i.gridstack = new R(i, s.cloneDeep(e))), i.gridstack)
            : ('string' == typeof t
                ? console.error(
                    'GridStack.initAll() no grid was found with selector "' +
                      t +
                      '" - element missing or wrong selector ?\nNote: ".grid-stack" is required for proper CSS styling and drag/drop, and is the default selector.',
                  )
                : console.error('GridStack.init() no grid element was passed.'),
              null);
        }
        static initAll(e = {}, t = '.grid-stack') {
          let i = [];
          return (
            'undefined' == typeof document ||
              (R.getGridElements(t).forEach((t) => {
                t.gridstack || (t.gridstack = new R(t, s.cloneDeep(e))), i.push(t.gridstack);
              }),
              0 === i.length &&
                console.error(
                  'GridStack.initAll() no grid was found with selector "' +
                    t +
                    '" - element missing or wrong selector ?\nNote: ".grid-stack" is required for proper CSS styling and drag/drop, and is the default selector.',
                )),
            i
          );
        }
        static addGrid(e, t = {}) {
          if (!e) return null;
          let i = e;
          if (i.gridstack) {
            const e = i.gridstack;
            return (
              t && (e.opts = { ...e.opts, ...t }), void 0 !== t.children && e.load(t.children), e
            );
          }
          if (!e.classList.contains('grid-stack') || R.addRemoveCB)
            if (R.addRemoveCB) i = R.addRemoveCB(e, t, !0, !0);
            else {
              let s = document.implementation.createHTMLDocument('');
              (s.body.innerHTML = `<div class="grid-stack ${t.class || ''}"></div>`),
                (i = s.body.children[0]),
                e.appendChild(i);
            }
          return R.init(t, i);
        }
        static registerEngine(e) {
          R.engineClass = e;
        }
        get placeholder() {
          if (!this._placeholder) {
            let e = document.createElement('div');
            (e.className = 'placeholder-content'),
              this.opts.placeholderText && (e.innerHTML = this.opts.placeholderText),
              (this._placeholder = document.createElement('div')),
              this._placeholder.classList.add(
                this.opts.placeholderClass,
                n.itemClass,
                this.opts.itemClass,
              ),
              this.placeholder.appendChild(e);
          }
          return this._placeholder;
        }
        constructor(e, t = {}) {
          (this.el = e),
            (this.opts = t),
            (this._gsEventHandler = {}),
            (this._extraDragRow = 0),
            (this.dragTransform = { xScale: 1, yScale: 1, xOffset: 0, yOffset: 0 }),
            (e.gridstack = this),
            (t = t || {}),
            e.classList.contains('grid-stack') || this.el.classList.add('grid-stack'),
            t.row && ((t.minRow = t.maxRow = t.row), delete t.row);
          let i = s.toNumber(e.getAttribute('gs-row'));
          'auto' === t.column && delete t.column,
            void 0 !== t.alwaysShowResizeHandle &&
              (t._alwaysShowResizeHandle = t.alwaysShowResizeHandle);
          let r = t.columnOpts?.breakpoints;
          const a = t;
          if (
            (a.oneColumnModeDomSort &&
              (delete a.oneColumnModeDomSort,
              console.log(
                'warning: Gridstack oneColumnModeDomSort no longer supported. Use GridStackOptions.columnOpts instead.',
              )),
            a.oneColumnSize || !1 === a.disableOneColumnMode)
          ) {
            const e = a.oneColumnSize || 768;
            delete a.oneColumnSize,
              delete a.disableOneColumnMode,
              (t.columnOpts = t.columnOpts || {}),
              (r = t.columnOpts.breakpoints = t.columnOpts.breakpoints || []);
            let i = r.find((e) => 1 === e.c);
            i ? (i.w = e) : ((i = { c: 1, w: e }), r.push(i, { c: 12, w: e + 1 }));
          }
          const d = t.columnOpts;
          d &&
            (d.columnWidth || d.breakpoints?.length
              ? (d.columnMax = d.columnMax || 12)
              : (delete t.columnOpts, (r = void 0))),
            r?.length > 1 && r.sort((e, t) => (t.w || 0) - (e.w || 0));
          let g = {
            ...s.cloneDeep(n),
            column: s.toNumber(e.getAttribute('gs-column')) || n.column,
            minRow: i || s.toNumber(e.getAttribute('gs-min-row')) || n.minRow,
            maxRow: i || s.toNumber(e.getAttribute('gs-max-row')) || n.maxRow,
            staticGrid: s.toBool(e.getAttribute('gs-static')) || n.staticGrid,
            draggable: {
              handle:
                (t.handleClass ? '.' + t.handleClass : t.handle ? t.handle : '') ||
                n.draggable.handle,
            },
            removableOptions: {
              accept: t.itemClass || n.removableOptions.accept,
              decline: n.removableOptions.decline,
            },
          };
          e.getAttribute('gs-animate') && (g.animate = s.toBool(e.getAttribute('gs-animate'))),
            (t = s.defaults(t, g)),
            this._initMargin(),
            this.checkDynamicColumn(),
            this.el.classList.add('gs-' + t.column),
            'auto' === t.rtl && (t.rtl = 'rtl' === e.style.direction),
            t.rtl && this.el.classList.add('grid-stack-rtl');
          const c = this.el.parentElement?.parentElement;
          let p = c?.classList.contains(n.itemClass) ? c.gridstackNode : void 0;
          p &&
            ((p.subGrid = this),
            (this.parentGridItem = p),
            this.el.classList.add('grid-stack-nested'),
            p.el.classList.add('grid-stack-sub-grid')),
            (this._isAutoCellHeight = 'auto' === t.cellHeight),
            this._isAutoCellHeight || 'initial' === t.cellHeight
              ? this.cellHeight(void 0, !1)
              : ('number' == typeof t.cellHeight &&
                  t.cellHeightUnit &&
                  t.cellHeightUnit !== n.cellHeightUnit &&
                  ((t.cellHeight = t.cellHeight + t.cellHeightUnit), delete t.cellHeightUnit),
                this.cellHeight(t.cellHeight, !1)),
            'mobile' === t.alwaysShowResizeHandle && (t.alwaysShowResizeHandle = h),
            (this._styleSheetClass = 'gs-id-' + o._idSeq++),
            this.el.classList.add(this._styleSheetClass),
            this._setStaticClass();
          let u = t.engineClass || R.engineClass || o;
          if (
            ((this.engine = new u({
              column: this.getColumn(),
              float: t.float,
              maxRow: t.maxRow,
              onChange: (e) => {
                let t = 0;
                this.engine.nodes.forEach((e) => {
                  t = Math.max(t, e.y + e.h);
                }),
                  e.forEach((e) => {
                    let t = e.el;
                    t &&
                      (e._removeDOM
                        ? (t && t.remove(), delete e._removeDOM)
                        : this._writePosAttr(t, e));
                  }),
                  this._updateStyles(!1, t);
              },
            })),
            this._updateStyles(!1, 0),
            t.auto &&
              (this.batchUpdate(),
              (this.engine._loading = !0),
              this.getGridItems().forEach((e) => this._prepareElement(e)),
              delete this.engine._loading,
              this.batchUpdate(!1)),
            t.children)
          ) {
            const e = t.children;
            delete t.children, e.length && this.load(e);
          }
          this.setAnimation(),
            t.subGridDynamic && !l.pauseDrag && (l.pauseDrag = !0),
            void 0 !== t.draggable?.pause && (l.pauseDrag = t.draggable.pause),
            this._setupRemoveDrop(),
            this._setupAcceptWidget(),
            this._updateResizeEvent();
        }
        addWidget(e, t) {
          let i, o;
          if ('string' == typeof e) {
            let t = document.implementation.createHTMLDocument('');
            (t.body.innerHTML = e), (i = t.body.children[0]);
          } else if (
            0 === arguments.length ||
            (1 === arguments.length &&
              (void 0 !== (n = e).el ||
                void 0 !== n.x ||
                void 0 !== n.y ||
                void 0 !== n.w ||
                void 0 !== n.h ||
                void 0 !== n.content))
          )
            if (((o = t = e), o?.el)) i = o.el;
            else if (R.addRemoveCB) i = R.addRemoveCB(this.el, t, !0, !1);
            else {
              let e = t?.content || '',
                s = document.implementation.createHTMLDocument('');
              (s.body.innerHTML = `<div class="grid-stack-item ${this.opts.itemClass || ''}"><div class="grid-stack-item-content">${e}</div></div>`),
                (i = s.body.children[0]);
            }
          else i = e;
          var n;
          if (!i) return;
          if (
            ((o = i.gridstackNode),
            o && i.parentElement === this.el && this.engine.nodes.find((e) => e._id === o._id))
          )
            return i;
          let r = this._readAttr(i);
          return (
            (t = s.cloneDeep(t) || {}),
            s.defaults(t, r),
            (o = this.engine.prepareNode(t)),
            this._writeAttr(i, t),
            this.el.appendChild(i),
            this.makeWidget(i, t),
            i
          );
        }
        makeSubGrid(e, t, i, o = !0) {
          let n,
            r = e.gridstackNode;
          if ((r || (r = this.makeWidget(e).gridstackNode), r.subGrid?.el)) return r.subGrid;
          let l,
            h = this;
          for (; h && !n; ) (n = h.opts?.subGridOpts), (h = h.parentGridItem?.grid);
          (t = s.cloneDeep({ ...(n || {}), children: void 0, ...(t || r.subGridOpts || {}) })),
            (r.subGridOpts = t),
            'auto' === t.column &&
              ((l = !0), (t.column = Math.max(r.w || 1, i?.w || 1)), delete t.columnOpts);
          let a,
            d,
            g = r.el.querySelector('.grid-stack-item-content');
          if (o) {
            if (
              (this._removeDD(r.el),
              (d = { ...r, x: 0, y: 0 }),
              s.removeInternalForSave(d),
              delete d.subGridOpts,
              r.content && ((d.content = r.content), delete r.content),
              R.addRemoveCB)
            )
              a = R.addRemoveCB(this.el, d, !0, !1);
            else {
              let e = document.implementation.createHTMLDocument('');
              (e.body.innerHTML = '<div class="grid-stack-item"></div>'),
                (a = e.body.children[0]),
                a.appendChild(g),
                (e.body.innerHTML = '<div class="grid-stack-item-content"></div>'),
                (g = e.body.children[0]),
                r.el.appendChild(g);
            }
            this._prepareDragDropByNode(r);
          }
          if (i) {
            let e = l ? t.column : r.w,
              s = r.h + i.h,
              o = r.el.style;
            (o.transition = 'none'),
              this.update(r.el, { w: e, h: s }),
              setTimeout(() => (o.transition = null));
          }
          let c = (r.subGrid = R.addGrid(g, t));
          return (
            i?._moving && (c._isTemp = !0),
            l && (c._autoColumn = !0),
            o && c.addWidget(a, d),
            i &&
              (i._moving
                ? window.setTimeout(() => s.simulateMouseEvent(i._event, 'mouseenter', c.el), 0)
                : c.addWidget(r.el, r)),
            c
          );
        }
        removeAsSubGrid(e) {
          let t = this.parentGridItem?.grid;
          t &&
            (t.batchUpdate(),
            t.removeWidget(this.parentGridItem.el, !0, !0),
            this.engine.nodes.forEach((e) => {
              (e.x += this.parentGridItem.x), (e.y += this.parentGridItem.y), t.addWidget(e.el, e);
            }),
            t.batchUpdate(!1),
            this.parentGridItem && delete this.parentGridItem.subGrid,
            delete this.parentGridItem,
            e && window.setTimeout(() => s.simulateMouseEvent(e._event, 'mouseenter', t.el), 0));
        }
        save(e = !0, t = !1, i = R.saveCB) {
          let o = this.engine.save(e, i);
          if (
            (o.forEach((s) => {
              if (e && s.el && !s.subGrid && !i) {
                let e = s.el.querySelector('.grid-stack-item-content');
                (s.content = e ? e.innerHTML : void 0), s.content || delete s.content;
              } else if ((e || i || delete s.content, s.subGrid?.el)) {
                const o = s.subGrid.save(e, t, i);
                (s.subGridOpts = t ? o : { children: o }), delete s.subGrid;
              }
              delete s.el;
            }),
            t)
          ) {
            let e = s.cloneDeep(this.opts);
            e.marginBottom === e.marginTop &&
              e.marginRight === e.marginLeft &&
              e.marginTop === e.marginRight &&
              ((e.margin = e.marginTop),
              delete e.marginTop,
              delete e.marginRight,
              delete e.marginBottom,
              delete e.marginLeft),
              e.rtl === ('rtl' === this.el.style.direction) && (e.rtl = 'auto'),
              this._isAutoCellHeight && (e.cellHeight = 'auto'),
              this._autoColumn && (e.column = 'auto');
            const t = e._alwaysShowResizeHandle;
            return (
              delete e._alwaysShowResizeHandle,
              void 0 !== t ? (e.alwaysShowResizeHandle = t) : delete e.alwaysShowResizeHandle,
              s.removeInternalAndSame(e, n),
              (e.children = o),
              e
            );
          }
          return o;
        }
        load(e, t = R.addRemoveCB || !0) {
          e = s.cloneDeep(e);
          const i = this.getColumn();
          e.forEach((e) => {
            (e.w = e.w || 1), (e.h = e.h || 1);
          }),
            (e = s.sort(e));
          let o = 0;
          e.forEach((e) => {
            o = Math.max(o, (e.x || 0) + e.w);
          }),
            o > i && ((this._ignoreLayoutsNodeChange = !0), this.engine.cacheLayout(e, o, !0));
          const n = R.addRemoveCB;
          'function' == typeof t && (R.addRemoveCB = t);
          let r = [];
          this.batchUpdate();
          const l = !this.engine.nodes.length;
          if ((l && this.setAnimation(!1), !l && t)) {
            [...this.engine.nodes].forEach((t) => {
              if (!t.id) return;
              s.find(e, t.id) ||
                (R.addRemoveCB && R.addRemoveCB(this.el, t, !1, !1),
                r.push(t),
                this.removeWidget(t.el, !0, !1));
            });
          }
          this.engine._loading = !0;
          let h = [];
          return (
            (this.engine.nodes = this.engine.nodes.filter(
              (t) => !s.find(e, t.id) || (h.push(t), !1),
            )),
            e.forEach((e) => {
              let i = s.find(h, e.id);
              if (i) {
                if (
                  (s.shouldSizeToContent(i) && (e.h = i.h),
                  this.engine.nodeBoundFix(e),
                  (e.autoPosition || void 0 === e.x || void 0 === e.y) &&
                    ((e.w = e.w || i.w), (e.h = e.h || i.h), this.engine.findEmptyPosition(e)),
                  this.engine.nodes.push(i),
                  s.samePos(i, e) && this.moveNode(i, { ...e, forceCollide: !0 }),
                  this.update(i.el, e),
                  e.subGridOpts?.children)
                ) {
                  let t = i.el.querySelector('.grid-stack');
                  t && t.gridstack && t.gridstack.load(e.subGridOpts.children);
                }
              } else t && this.addWidget(e);
            }),
            delete this.engine._loading,
            (this.engine.removedNodes = r),
            this.batchUpdate(!1),
            delete this._ignoreLayoutsNodeChange,
            n ? (R.addRemoveCB = n) : delete R.addRemoveCB,
            l && this.opts?.animate && this.setAnimation(this.opts.animate, !0),
            this
          );
        }
        batchUpdate(e = !0) {
          return (
            this.engine.batchUpdate(e),
            e ||
              (this._updateContainerHeight(),
              this._triggerRemoveEvent(),
              this._triggerAddEvent(),
              this._triggerChangeEvent()),
            this
          );
        }
        getCellHeight(e = !1) {
          if (
            this.opts.cellHeight &&
            'auto' !== this.opts.cellHeight &&
            (!e || !this.opts.cellHeightUnit || 'px' === this.opts.cellHeightUnit)
          )
            return this.opts.cellHeight;
          if ('rem' === this.opts.cellHeightUnit)
            return (
              this.opts.cellHeight * parseFloat(getComputedStyle(document.documentElement).fontSize)
            );
          if ('em' === this.opts.cellHeightUnit)
            return this.opts.cellHeight * parseFloat(getComputedStyle(this.el).fontSize);
          if ('cm' === this.opts.cellHeightUnit) return this.opts.cellHeight * (96 / 2.54);
          if ('mm' === this.opts.cellHeightUnit) return (this.opts.cellHeight * (96 / 2.54)) / 10;
          let t = this.el.querySelector('.' + this.opts.itemClass);
          if (t) {
            let e = s.toNumber(t.getAttribute('gs-h')) || 1;
            return Math.round(t.offsetHeight / e);
          }
          let i = parseInt(this.el.getAttribute('gs-current-row'));
          return i ? Math.round(this.el.getBoundingClientRect().height / i) : this.opts.cellHeight;
        }
        cellHeight(e, t = !0) {
          if (
            (t &&
              void 0 !== e &&
              this._isAutoCellHeight !== ('auto' === e) &&
              ((this._isAutoCellHeight = 'auto' === e), this._updateResizeEvent()),
            ('initial' !== e && 'auto' !== e) || (e = void 0),
            void 0 === e)
          ) {
            let t =
              -this.opts.marginRight -
              this.opts.marginLeft +
              this.opts.marginTop +
              this.opts.marginBottom;
            e = this.cellWidth() + t;
          }
          let i = s.parseHeight(e);
          return (
            (this.opts.cellHeightUnit === i.unit && this.opts.cellHeight === i.h) ||
              ((this.opts.cellHeightUnit = i.unit),
              (this.opts.cellHeight = i.h),
              this.resizeToContentCheck(),
              t && this._updateStyles(!0)),
            this
          );
        }
        cellWidth() {
          return this._widthOrContainer() / this.getColumn();
        }
        _widthOrContainer(e = !1) {
          return e && this.opts.columnOpts?.breakpointForWindow
            ? window.innerWidth
            : this.el.clientWidth || this.el.parentElement.clientWidth || window.innerWidth;
        }
        checkDynamicColumn() {
          const e = this.opts.columnOpts;
          if (!e || (!e.columnWidth && !e.breakpoints?.length)) return !1;
          const t = this.getColumn();
          let i = t;
          const s = this._widthOrContainer(!0);
          if (e.columnWidth) i = Math.min(Math.round(s / e.columnWidth) || 1, e.columnMax);
          else {
            i = e.columnMax;
            let o = 0;
            for (; o < e.breakpoints.length && s <= e.breakpoints[o].w; )
              i = e.breakpoints[o++].c || t;
          }
          if (i !== t) {
            const t = e.breakpoints?.find((e) => e.c === i);
            return this.column(i, t?.layout || e.layout), !0;
          }
          return !1;
        }
        compact(e = 'compact', t = !0) {
          return this.engine.compact(e, t), this._triggerChangeEvent(), this;
        }
        column(e, t = 'moveScale') {
          if (!e || e < 1 || this.opts.column === e) return this;
          let i = this.getColumn();
          return (
            (this.opts.column = e),
            this.engine
              ? ((this.engine.column = e),
                this.el.classList.remove('gs-' + i),
                this.el.classList.add('gs-' + e),
                this.engine.columnChanged(i, e, t),
                this._isAutoCellHeight && this.cellHeight(),
                this.resizeToContentCheck(!0),
                (this._ignoreLayoutsNodeChange = !0),
                this._triggerChangeEvent(),
                delete this._ignoreLayoutsNodeChange,
                this)
              : this
          );
        }
        getColumn() {
          return this.opts.column;
        }
        getGridItems() {
          return Array.from(this.el.children).filter(
            (e) =>
              e.matches('.' + this.opts.itemClass) && !e.matches('.' + this.opts.placeholderClass),
          );
        }
        destroy(e = !0) {
          if (this.el)
            return (
              this.offAll(),
              this._updateResizeEvent(!0),
              this.setStatic(!0, !1),
              this.setAnimation(!1),
              e
                ? this.el.parentNode.removeChild(this.el)
                : (this.removeAll(e),
                  this.el.classList.remove(this._styleSheetClass),
                  this.el.removeAttribute('gs-current-row')),
              this._removeStylesheet(),
              this.parentGridItem && delete this.parentGridItem.subGrid,
              delete this.parentGridItem,
              delete this.opts,
              delete this._placeholder,
              delete this.engine,
              delete this.el.gridstack,
              delete this.el,
              this
            );
        }
        float(e) {
          return (
            this.opts.float !== e &&
              ((this.opts.float = this.engine.float = e), this._triggerChangeEvent()),
            this
          );
        }
        getFloat() {
          return this.engine.float;
        }
        getCellFromPixel(e, t = !1) {
          let i,
            s = this.el.getBoundingClientRect();
          i = t
            ? { top: s.top + document.documentElement.scrollTop, left: s.left }
            : { top: this.el.offsetTop, left: this.el.offsetLeft };
          let o = e.left - i.left,
            n = e.top - i.top,
            r = s.width / this.getColumn(),
            l = s.height / parseInt(this.el.getAttribute('gs-current-row'));
          return { x: Math.floor(o / r), y: Math.floor(n / l) };
        }
        getRow() {
          return Math.max(this.engine.getRow(), this.opts.minRow);
        }
        isAreaEmpty(e, t, i, s) {
          return this.engine.isAreaEmpty(e, t, i, s);
        }
        makeWidget(e, t) {
          let i = R.getElement(e);
          this._prepareElement(i, !0, t);
          const s = i.gridstackNode;
          return (
            this._updateContainerHeight(),
            s.subGridOpts && this.makeSubGrid(i, s.subGridOpts, void 0, !1),
            1 === this.opts.column && (this._ignoreLayoutsNodeChange = !0),
            this._triggerAddEvent(),
            this._triggerChangeEvent(),
            delete this._ignoreLayoutsNodeChange,
            i
          );
        }
        on(e, t) {
          if (-1 !== e.indexOf(' ')) {
            return e.split(' ').forEach((e) => this.on(e, t)), this;
          }
          if (
            'change' === e ||
            'added' === e ||
            'removed' === e ||
            'enable' === e ||
            'disable' === e
          ) {
            let i = 'enable' === e || 'disable' === e;
            (this._gsEventHandler[e] = i ? (e) => t(e) : (e) => t(e, e.detail)),
              this.el.addEventListener(e, this._gsEventHandler[e]);
          } else
            'drag' === e ||
            'dragstart' === e ||
            'dragstop' === e ||
            'resizestart' === e ||
            'resize' === e ||
            'resizestop' === e ||
            'dropped' === e ||
            'resizecontent' === e
              ? (this._gsEventHandler[e] = t)
              : console.error('GridStack.on(' + e + ') event not supported');
          return this;
        }
        off(e) {
          if (-1 !== e.indexOf(' ')) {
            return e.split(' ').forEach((e) => this.off(e)), this;
          }
          return (
            ('change' !== e &&
              'added' !== e &&
              'removed' !== e &&
              'enable' !== e &&
              'disable' !== e) ||
              (this._gsEventHandler[e] && this.el.removeEventListener(e, this._gsEventHandler[e])),
            delete this._gsEventHandler[e],
            this
          );
        }
        offAll() {
          return Object.keys(this._gsEventHandler).forEach((e) => this.off(e)), this;
        }
        removeWidget(e, t = !0, i = !0) {
          return (
            R.getElements(e).forEach((e) => {
              if (e.parentElement && e.parentElement !== this.el) return;
              let s = e.gridstackNode;
              s || (s = this.engine.nodes.find((t) => e === t.el)),
                s &&
                  (t && R.addRemoveCB && R.addRemoveCB(this.el, s, !1, !1),
                  delete e.gridstackNode,
                  this._removeDD(e),
                  this.engine.removeNode(s, t, i),
                  t && e.parentElement && e.remove());
            }),
            i && (this._triggerRemoveEvent(), this._triggerChangeEvent()),
            this
          );
        }
        removeAll(e = !0, t = !0) {
          return (
            this.engine.nodes.forEach((t) => {
              e && R.addRemoveCB && R.addRemoveCB(this.el, t, !1, !1),
                delete t.el.gridstackNode,
                this.opts.staticGrid || this._removeDD(t.el);
            }),
            this.engine.removeAll(e, t),
            t && this._triggerRemoveEvent(),
            this
          );
        }
        setAnimation(e = this.opts.animate, t) {
          return (
            t
              ? setTimeout(() => {
                  this.opts && this.setAnimation(e);
                })
              : e
                ? this.el.classList.add('grid-stack-animate')
                : this.el.classList.remove('grid-stack-animate'),
            this
          );
        }
        hasAnimationCSS() {
          return this.el.classList.contains('grid-stack-animate');
        }
        setStatic(e, t = !0, i = !0) {
          return (
            !!this.opts.staticGrid === e ||
              (e ? (this.opts.staticGrid = !0) : delete this.opts.staticGrid,
              this._setupRemoveDrop(),
              this._setupAcceptWidget(),
              this.engine.nodes.forEach((s) => {
                this._prepareDragDropByNode(s), s.subGrid && i && s.subGrid.setStatic(e, t, i);
              }),
              t && this._setStaticClass()),
            this
          );
        }
        update(e, t) {
          if (arguments.length > 2) {
            console.warn(
              'gridstack.ts: `update(el, x, y, w, h)` is deprecated. Use `update(el, {x, w, content, ...})`. It will be removed soon',
            );
            let i = arguments,
              s = 1;
            return (t = { x: i[s++], y: i[s++], w: i[s++], h: i[s++] }), this.update(e, t);
          }
          return (
            R.getElements(e).forEach((e) => {
              let i = e?.gridstackNode;
              if (!i) return;
              let o = s.cloneDeep(t);
              this.engine.nodeBoundFix(o), delete o.autoPosition, delete o.id;
              let n,
                r = ['x', 'y', 'w', 'h'];
              if (
                (r.some((e) => void 0 !== o[e] && o[e] !== i[e]) &&
                  ((n = {}),
                  r.forEach((e) => {
                    (n[e] = void 0 !== o[e] ? o[e] : i[e]), delete o[e];
                  })),
                !n && (o.minW || o.minH || o.maxW || o.maxH) && (n = {}),
                void 0 !== o.content)
              ) {
                const t = e.querySelector('.grid-stack-item-content');
                t &&
                  t.innerHTML !== o.content &&
                  ((t.innerHTML = o.content),
                  i.subGrid?.el &&
                    (t.appendChild(i.subGrid.el),
                    i.subGrid.opts.styleInHead || i.subGrid._updateStyles(!0))),
                  delete o.content;
              }
              let l = !1,
                h = !1;
              for (const e in o)
                '_' !== e[0] &&
                  i[e] !== o[e] &&
                  ((i[e] = o[e]),
                  (l = !0),
                  (h =
                    h ||
                    (!this.opts.staticGrid &&
                      ('noResize' === e || 'noMove' === e || 'locked' === e))));
              if ((s.sanitizeMinMax(i), n)) {
                const e = void 0 !== n.w && n.w !== i.w;
                this.moveNode(i, n), this.resizeToContentCheck(e, i), delete i._orig;
              }
              (n || l) && this._writeAttr(e, i), h && this._prepareDragDropByNode(i);
            }),
            this
          );
        }
        moveNode(e, t) {
          const i = e._updating;
          i || this.engine.cleanNodes().beginUpdate(e),
            this.engine.moveNode(e, t),
            this._updateContainerHeight(),
            i || (this._triggerChangeEvent(), this.engine.endUpdate());
        }
        resizeToContent(e) {
          if (!e) return;
          if ((e.classList.remove('size-to-content-max'), !e.clientHeight)) return;
          const t = e.gridstackNode;
          if (!t) return;
          const i = t.grid;
          if (!i || e.parentElement !== i.el) return;
          const s = i.getCellHeight(!0);
          if (!s) return;
          let o,
            n = t.h ? t.h * s : e.clientHeight;
          if (
            (t.resizeToContentParent && (o = e.querySelector(t.resizeToContentParent)),
            o || (o = e.querySelector(R.resizeToContentParent)),
            !o)
          )
            return;
          const r = e.clientHeight - o.clientHeight,
            l = t.h ? t.h * s - r : o.clientHeight;
          let h;
          if (t.subGrid) h = t.subGrid.getRow() * t.subGrid.getCellHeight(!0);
          else {
            if (t.subGridOpts?.children?.length) return;
            {
              const e = o.firstElementChild;
              if (!e)
                return void console.error(
                  `Error: GridStack.resizeToContent() widget id:${t.id} '${R.resizeToContentParent}'.firstElementChild is null, make sure to have a div like container. Skipping sizing.`,
                );
              h = e.getBoundingClientRect().height || l;
            }
          }
          if (l === h) return;
          n += h - l;
          let a = Math.ceil(n / s);
          const d = Number.isInteger(t.sizeToContent) ? t.sizeToContent : 0;
          d && a > d && ((a = d), e.classList.add('size-to-content-max')),
            t.minH && a < t.minH ? (a = t.minH) : t.maxH && a > t.maxH && (a = t.maxH),
            a !== t.h &&
              ((i._ignoreLayoutsNodeChange = !0),
              i.moveNode(t, { h: a }),
              delete i._ignoreLayoutsNodeChange);
        }
        resizeToContentCBCheck(e) {
          R.resizeToContentCB ? R.resizeToContentCB(e) : this.resizeToContent(e);
        }
        rotate(e, t) {
          return (
            R.getElements(e).forEach((e) => {
              let i = e.gridstackNode;
              if (!s.canBeRotated(i)) return;
              const o = { w: i.h, h: i.w, minH: i.minW, minW: i.minH, maxH: i.maxW, maxW: i.maxH };
              if (t) {
                let e = t.left > 0 ? Math.floor(t.left / this.cellWidth()) : 0,
                  s = t.top > 0 ? Math.floor(t.top / this.opts.cellHeight) : 0;
                (o.x = i.x + e - (i.h - (s + 1))), (o.y = i.y + s - e);
              }
              Object.keys(o).forEach((e) => {
                void 0 === o[e] && delete o[e];
              });
              const n = i._orig;
              this.update(e, o), (i._orig = n);
            }),
            this
          );
        }
        margin(e) {
          if (!('string' == typeof e && e.split(' ').length > 1)) {
            let t = s.parseHeight(e);
            if (this.opts.marginUnit === t.unit && this.opts.margin === t.h) return;
          }
          return (
            (this.opts.margin = e),
            (this.opts.marginTop =
              this.opts.marginBottom =
              this.opts.marginLeft =
              this.opts.marginRight =
                void 0),
            this._initMargin(),
            this._updateStyles(!0),
            this
          );
        }
        getMargin() {
          return this.opts.margin;
        }
        willItFit(e) {
          if (arguments.length > 1) {
            console.warn(
              'gridstack.ts: `willItFit(x,y,w,h,autoPosition)` is deprecated. Use `willItFit({x, y,...})`. It will be removed soon',
            );
            let e = arguments,
              t = 0,
              i = { x: e[t++], y: e[t++], w: e[t++], h: e[t++], autoPosition: e[t++] };
            return this.willItFit(i);
          }
          return this.engine.willItFit(e);
        }
        _triggerChangeEvent() {
          if (this.engine.batchMode) return this;
          let e = this.engine.getDirtyNodes(!0);
          return (
            e &&
              e.length &&
              (this._ignoreLayoutsNodeChange || this.engine.layoutsNodesChange(e),
              this._triggerEvent('change', e)),
            this.engine.saveInitial(),
            this
          );
        }
        _triggerAddEvent() {
          if (this.engine.batchMode) return this;
          if (this.engine.addedNodes?.length) {
            this._ignoreLayoutsNodeChange || this.engine.layoutsNodesChange(this.engine.addedNodes),
              this.engine.addedNodes.forEach((e) => {
                delete e._dirty;
              });
            const e = [...this.engine.addedNodes];
            (this.engine.addedNodes = []), this._triggerEvent('added', e);
          }
          return this;
        }
        _triggerRemoveEvent() {
          if (this.engine.batchMode) return this;
          if (this.engine.removedNodes?.length) {
            const e = [...this.engine.removedNodes];
            (this.engine.removedNodes = []), this._triggerEvent('removed', e);
          }
          return this;
        }
        _triggerEvent(e, t) {
          let i = t ? new CustomEvent(e, { bubbles: !1, detail: t }) : new Event(e);
          return this.el.dispatchEvent(i), this;
        }
        _removeStylesheet() {
          if (this._styles) {
            const e = this.opts.styleInHead ? void 0 : this.el.parentNode;
            s.removeStylesheet(this._styleSheetClass, e), delete this._styles;
          }
          return this;
        }
        _updateStyles(e = !1, t) {
          if (
            (e && this._removeStylesheet(),
            void 0 === t && (t = this.getRow()),
            this._updateContainerHeight(),
            0 === this.opts.cellHeight)
          )
            return this;
          let i = this.opts.cellHeight,
            o = this.opts.cellHeightUnit,
            n = `.${this._styleSheetClass} > .${this.opts.itemClass}`;
          if (!this._styles) {
            const e = this.opts.styleInHead ? void 0 : this.el.parentNode;
            if (
              ((this._styles = s.createStylesheet(this._styleSheetClass, e, {
                nonce: this.opts.nonce,
              })),
              !this._styles)
            )
              return this;
            (this._styles._max = 0), s.addCSSRule(this._styles, n, `height: ${i}${o}`);
            let t = this.opts.marginTop + this.opts.marginUnit,
              r = this.opts.marginBottom + this.opts.marginUnit,
              l = this.opts.marginRight + this.opts.marginUnit,
              h = this.opts.marginLeft + this.opts.marginUnit,
              a = `${n} > .grid-stack-item-content`,
              d = `.${this._styleSheetClass} > .grid-stack-placeholder > .placeholder-content`;
            s.addCSSRule(this._styles, a, `top: ${t}; right: ${l}; bottom: ${r}; left: ${h};`),
              s.addCSSRule(this._styles, d, `top: ${t}; right: ${l}; bottom: ${r}; left: ${h};`),
              s.addCSSRule(this._styles, `${n} > .ui-resizable-n`, `top: ${t};`),
              s.addCSSRule(this._styles, `${n} > .ui-resizable-s`, `bottom: ${r}`),
              s.addCSSRule(this._styles, `${n} > .ui-resizable-ne`, `right: ${l}`),
              s.addCSSRule(this._styles, `${n} > .ui-resizable-e`, `right: ${l}`),
              s.addCSSRule(this._styles, `${n} > .ui-resizable-se`, `right: ${l}; bottom: ${r}`),
              s.addCSSRule(this._styles, `${n} > .ui-resizable-nw`, `left: ${h}`),
              s.addCSSRule(this._styles, `${n} > .ui-resizable-w`, `left: ${h}`),
              s.addCSSRule(this._styles, `${n} > .ui-resizable-sw`, `left: ${h}; bottom: ${r}`);
          }
          if ((t = t || this._styles._max) > this._styles._max) {
            let e = (e) => i * e + o;
            for (let i = this._styles._max + 1; i <= t; i++)
              s.addCSSRule(this._styles, `${n}[gs-y="${i}"]`, `top: ${e(i)}`),
                s.addCSSRule(this._styles, `${n}[gs-h="${i + 1}"]`, `height: ${e(i + 1)}`);
            this._styles._max = t;
          }
          return this;
        }
        _updateContainerHeight() {
          if (!this.engine || this.engine.batchMode) return this;
          const e = this.parentGridItem;
          let t = this.getRow() + this._extraDragRow;
          const i = this.opts.cellHeight,
            o = this.opts.cellHeightUnit;
          if (!i) return this;
          if (!e) {
            const e = s.parseHeight(getComputedStyle(this.el).minHeight);
            if (e.h > 0 && e.unit === o) {
              const s = Math.floor(e.h / i);
              t < s && (t = s);
            }
          }
          return (
            this.el.setAttribute('gs-current-row', String(t)),
            this.el.style.removeProperty('min-height'),
            this.el.style.removeProperty('height'),
            t && (this.el.style[e ? 'minHeight' : 'height'] = t * i + o),
            e &&
              !e.grid.engine.batchMode &&
              s.shouldSizeToContent(e) &&
              e.grid.resizeToContentCBCheck(e.el),
            this
          );
        }
        _prepareElement(e, t = !1, i) {
          (i = i || this._readAttr(e)),
            (e.gridstackNode = i),
            (i.el = e),
            (i.grid = this),
            (i = this.engine.addNode(i, t)),
            this._writeAttr(e, i),
            e.classList.add(n.itemClass, this.opts.itemClass);
          const o = s.shouldSizeToContent(i);
          return (
            o ? e.classList.add('size-to-content') : e.classList.remove('size-to-content'),
            o && this.resizeToContentCheck(!1, i),
            this._prepareDragDropByNode(i),
            this
          );
        }
        _writePosAttr(e, t) {
          return (
            void 0 !== t.x && null !== t.x && e.setAttribute('gs-x', String(t.x)),
            void 0 !== t.y && null !== t.y && e.setAttribute('gs-y', String(t.y)),
            t.w > 1 ? e.setAttribute('gs-w', String(t.w)) : e.removeAttribute('gs-w'),
            t.h > 1 ? e.setAttribute('gs-h', String(t.h)) : e.removeAttribute('gs-h'),
            this
          );
        }
        _writeAttr(e, t) {
          if (!t) return this;
          this._writePosAttr(e, t);
          let i = {
            autoPosition: 'gs-auto-position',
            noResize: 'gs-no-resize',
            noMove: 'gs-no-move',
            locked: 'gs-locked',
            id: 'gs-id',
          };
          for (const s in i) t[s] ? e.setAttribute(i[s], String(t[s])) : e.removeAttribute(i[s]);
          return this;
        }
        _readAttr(e, t = !0) {
          let i = {};
          (i.x = s.toNumber(e.getAttribute('gs-x'))),
            (i.y = s.toNumber(e.getAttribute('gs-y'))),
            (i.w = s.toNumber(e.getAttribute('gs-w'))),
            (i.h = s.toNumber(e.getAttribute('gs-h'))),
            (i.autoPosition = s.toBool(e.getAttribute('gs-auto-position'))),
            (i.noResize = s.toBool(e.getAttribute('gs-no-resize'))),
            (i.noMove = s.toBool(e.getAttribute('gs-no-move'))),
            (i.locked = s.toBool(e.getAttribute('gs-locked'))),
            (i.id = e.getAttribute('gs-id')),
            (i.maxW = s.toNumber(e.getAttribute('gs-max-w'))),
            (i.minW = s.toNumber(e.getAttribute('gs-min-w'))),
            (i.maxH = s.toNumber(e.getAttribute('gs-max-h'))),
            (i.minH = s.toNumber(e.getAttribute('gs-min-h'))),
            t &&
              (1 === i.w && e.removeAttribute('gs-w'),
              1 === i.h && e.removeAttribute('gs-h'),
              i.maxW && e.removeAttribute('gs-max-w'),
              i.minW && e.removeAttribute('gs-min-w'),
              i.maxH && e.removeAttribute('gs-max-h'),
              i.minH && e.removeAttribute('gs-min-h'));
          for (const e in i) {
            if (!i.hasOwnProperty(e)) return;
            i[e] || 0 === i[e] || delete i[e];
          }
          return i;
        }
        _setStaticClass() {
          let e = ['grid-stack-static'];
          return (
            this.opts.staticGrid
              ? (this.el.classList.add(...e), this.el.setAttribute('gs-static', 'true'))
              : (this.el.classList.remove(...e), this.el.removeAttribute('gs-static')),
            this
          );
        }
        onResize() {
          if (!this.el?.clientWidth) return;
          if (this.prevWidth === this.el.clientWidth) return;
          (this.prevWidth = this.el.clientWidth), this.batchUpdate();
          let e = !1;
          return (
            this._autoColumn && this.parentGridItem
              ? this.opts.column !== this.parentGridItem.w &&
                (this.column(this.parentGridItem.w, 'none'), (e = !0))
              : (e = this.checkDynamicColumn()),
            this._isAutoCellHeight && this.cellHeight(),
            this.engine.nodes.forEach((e) => {
              e.subGrid && e.subGrid.onResize();
            }),
            this._skipInitialResize || this.resizeToContentCheck(e),
            delete this._skipInitialResize,
            this.batchUpdate(!1),
            this
          );
        }
        resizeToContentCheck(e = !1, t) {
          if (this.engine) {
            if (e && this.hasAnimationCSS())
              return setTimeout(() => this.resizeToContentCheck(!1, t), 310);
            if (t) s.shouldSizeToContent(t) && this.resizeToContentCBCheck(t.el);
            else if (this.engine.nodes.some((e) => s.shouldSizeToContent(e))) {
              const e = [...this.engine.nodes];
              this.batchUpdate(),
                e.forEach((e) => {
                  s.shouldSizeToContent(e) && this.resizeToContentCBCheck(e.el);
                }),
                this.batchUpdate(!1);
            }
            this._gsEventHandler.resizecontent &&
              this._gsEventHandler.resizecontent(null, t ? [t] : this.engine.nodes);
          }
        }
        _updateResizeEvent(e = !1) {
          const t =
            !this.parentGridItem &&
            (this._isAutoCellHeight ||
              this.opts.sizeToContent ||
              this.opts.columnOpts ||
              this.engine.nodes.find((e) => e.sizeToContent));
          return (
            e || !t || this.resizeObserver
              ? (!e && t) ||
                !this.resizeObserver ||
                (this.resizeObserver.disconnect(),
                delete this.resizeObserver,
                delete this._sizeThrottle)
              : ((this._sizeThrottle = s.throttle(
                  () => this.onResize(),
                  this.opts.cellHeightThrottle,
                )),
                (this.resizeObserver = new ResizeObserver(() => this._sizeThrottle())),
                this.resizeObserver.observe(this.el),
                (this._skipInitialResize = !0)),
            this
          );
        }
        static getElement(e = '.grid-stack-item') {
          return s.getElement(e);
        }
        static getElements(e = '.grid-stack-item') {
          return s.getElements(e);
        }
        static getGridElement(e) {
          return R.getElement(e);
        }
        static getGridElements(e) {
          return s.getElements(e);
        }
        _initMargin() {
          let e,
            t = 0,
            i = [];
          return (
            'string' == typeof this.opts.margin && (i = this.opts.margin.split(' ')),
            2 === i.length
              ? ((this.opts.marginTop = this.opts.marginBottom = i[0]),
                (this.opts.marginLeft = this.opts.marginRight = i[1]))
              : 4 === i.length
                ? ((this.opts.marginTop = i[0]),
                  (this.opts.marginRight = i[1]),
                  (this.opts.marginBottom = i[2]),
                  (this.opts.marginLeft = i[3]))
                : ((e = s.parseHeight(this.opts.margin)),
                  (this.opts.marginUnit = e.unit),
                  (t = this.opts.margin = e.h)),
            void 0 === this.opts.marginTop
              ? (this.opts.marginTop = t)
              : ((e = s.parseHeight(this.opts.marginTop)),
                (this.opts.marginTop = e.h),
                delete this.opts.margin),
            void 0 === this.opts.marginBottom
              ? (this.opts.marginBottom = t)
              : ((e = s.parseHeight(this.opts.marginBottom)),
                (this.opts.marginBottom = e.h),
                delete this.opts.margin),
            void 0 === this.opts.marginRight
              ? (this.opts.marginRight = t)
              : ((e = s.parseHeight(this.opts.marginRight)),
                (this.opts.marginRight = e.h),
                delete this.opts.margin),
            void 0 === this.opts.marginLeft
              ? (this.opts.marginLeft = t)
              : ((e = s.parseHeight(this.opts.marginLeft)),
                (this.opts.marginLeft = e.h),
                delete this.opts.margin),
            (this.opts.marginUnit = e.unit),
            this.opts.marginTop === this.opts.marginBottom &&
              this.opts.marginLeft === this.opts.marginRight &&
              this.opts.marginTop === this.opts.marginRight &&
              (this.opts.margin = this.opts.marginTop),
            this
          );
        }
        static getDD() {
          return C;
        }
        static setupDragIn(e, t, i = document) {
          void 0 !== t?.pause && (l.pauseDrag = t.pause), (t = { ...r, ...(t || {}) });
          let o = 'string' == typeof e ? s.getElements(e, i) : e;
          o.length &&
            o?.forEach((e) => {
              C.isDraggable(e) || C.dragIn(e, t);
            });
        }
        movable(e, t) {
          return (
            this.opts.staticGrid ||
              R.getElements(e).forEach((e) => {
                const i = e.gridstackNode;
                i && (t ? delete i.noMove : (i.noMove = !0), this._prepareDragDropByNode(i));
              }),
            this
          );
        }
        resizable(e, t) {
          return (
            this.opts.staticGrid ||
              R.getElements(e).forEach((e) => {
                let i = e.gridstackNode;
                i && (t ? delete i.noResize : (i.noResize = !0), this._prepareDragDropByNode(i));
              }),
            this
          );
        }
        disable(e = !0) {
          if (!this.opts.staticGrid)
            return (
              this.enableMove(!1, e), this.enableResize(!1, e), this._triggerEvent('disable'), this
            );
        }
        enable(e = !0) {
          if (!this.opts.staticGrid)
            return (
              this.enableMove(!0, e), this.enableResize(!0, e), this._triggerEvent('enable'), this
            );
        }
        enableMove(e, t = !0) {
          return (
            this.opts.staticGrid ||
              (e ? delete this.opts.disableDrag : (this.opts.disableDrag = !0),
              this.engine.nodes.forEach((i) => {
                this._prepareDragDropByNode(i), i.subGrid && t && i.subGrid.enableMove(e, t);
              })),
            this
          );
        }
        enableResize(e, t = !0) {
          return (
            this.opts.staticGrid ||
              (e ? delete this.opts.disableResize : (this.opts.disableResize = !0),
              this.engine.nodes.forEach((i) => {
                this._prepareDragDropByNode(i), i.subGrid && t && i.subGrid.enableResize(e, t);
              })),
            this
          );
        }
        _removeDD(e) {
          return (
            C.draggable(e, 'destroy').resizable(e, 'destroy'),
            e.gridstackNode && delete e.gridstackNode._initDD,
            delete e.ddElement,
            this
          );
        }
        _setupAcceptWidget() {
          if (this.opts.staticGrid || (!this.opts.acceptWidgets && !this.opts.removable))
            return C.droppable(this.el, 'destroy'), this;
          let e,
            t,
            i = (i, o, n) => {
              let r = o.gridstackNode;
              if (!r) return;
              if (((n = n || o), !r.grid?.el)) {
                n.style.transform = `scale(${1 / this.dragTransform.xScale},${1 / this.dragTransform.yScale})`;
                const e = n.getBoundingClientRect();
                (n.style.left =
                  e.x +
                  ((this.dragTransform.xScale - 1) * (i.clientX - e.x)) /
                    this.dragTransform.xScale +
                  'px'),
                  (n.style.top =
                    e.y +
                    ((this.dragTransform.yScale - 1) * (i.clientY - e.y)) /
                      this.dragTransform.yScale +
                    'px'),
                  (n.style.transformOrigin = '0px 0px');
              }
              let l = this.el.getBoundingClientRect(),
                { top: h, left: a } = n.getBoundingClientRect();
              (a -= l.left), (h -= l.top);
              let d = {
                position: {
                  top: h * this.dragTransform.xScale,
                  left: a * this.dragTransform.yScale,
                },
              };
              if (r._temporaryRemoved) {
                if (
                  ((r.x = Math.max(0, Math.round(a / t))),
                  (r.y = Math.max(0, Math.round(h / e))),
                  delete r.autoPosition,
                  this.engine.nodeBoundFix(r),
                  !this.engine.willItFit(r))
                ) {
                  if (((r.autoPosition = !0), !this.engine.willItFit(r)))
                    return void C.off(o, 'drag');
                  r._willFitPos && (s.copyPos(r, r._willFitPos), delete r._willFitPos);
                }
                this._onStartMoving(n, i, d, r, t, e);
              } else this._dragOrResize(n, i, d, r, t, e);
            };
          return (
            C.droppable(this.el, {
              accept: (e) => {
                let t = e.gridstackNode || this._readAttr(e, !1);
                if (t?.grid === this) return !0;
                if (!this.opts.acceptWidgets) return !1;
                let i = !0;
                if ('function' == typeof this.opts.acceptWidgets) i = this.opts.acceptWidgets(e);
                else {
                  let t =
                    !0 === this.opts.acceptWidgets ? '.grid-stack-item' : this.opts.acceptWidgets;
                  i = e.matches(t);
                }
                if (i && t && this.opts.maxRow) {
                  let e = { w: t.w, h: t.h, minW: t.minW, minH: t.minH };
                  i = this.engine.willItFit(e);
                }
                return i;
              },
            })
              .on(this.el, 'dropover', (s, o, n) => {
                let r = o.gridstackNode;
                if (r?.grid === this && !r._temporaryRemoved) return !1;
                if (r?.grid && r.grid !== this && !r._temporaryRemoved) {
                  r.grid._leave(o, n);
                }
                (t = this.cellWidth()),
                  (e = this.getCellHeight(!0)),
                  r || (r = this._readAttr(o, !1)),
                  r.grid || ((r._isExternal = !0), (o.gridstackNode = r)),
                  (n = n || o);
                let l = r.w || Math.round(n.offsetWidth / t) || 1,
                  h = r.h || Math.round(n.offsetHeight / e) || 1;
                return (
                  r.grid && r.grid !== this
                    ? (o._gridstackNodeOrig || (o._gridstackNodeOrig = r),
                      (o.gridstackNode = r = { ...r, w: l, h: h, grid: this }),
                      delete r.x,
                      delete r.y,
                      this.engine.cleanupNode(r).nodeBoundFix(r),
                      (r._initDD = r._isExternal = r._temporaryRemoved = !0))
                    : ((r.w = l), (r.h = h), (r._temporaryRemoved = !0)),
                  R._itemRemoving(r.el, !1),
                  C.on(o, 'drag', i),
                  i(s, o, n),
                  !1
                );
              })
              .on(this.el, 'dropout', (e, t, i) => {
                let s = t.gridstackNode;
                return (
                  !!s &&
                  ((s.grid && s.grid !== this) ||
                    (this._leave(t, i), this._isTemp && this.removeAsSubGrid(s)),
                  !1)
                );
              })
              .on(this.el, 'drop', (e, t, i) => {
                let o = t.gridstackNode;
                if (o?.grid === this && !o._isExternal) return !1;
                const n = !!this.placeholder.parentElement;
                this.placeholder.remove();
                const r = n && this.opts.animate;
                r && this.setAnimation(!1);
                let l = t._gridstackNodeOrig;
                if ((delete t._gridstackNodeOrig, n && l?.grid && l.grid !== this)) {
                  let e = l.grid;
                  e.engine.removeNodeFromLayoutCache(l),
                    e.engine.removedNodes.push(l),
                    e._triggerRemoveEvent()._triggerChangeEvent(),
                    e.parentGridItem &&
                      !e.engine.nodes.length &&
                      e.opts.subGridDynamic &&
                      e.removeAsSubGrid();
                }
                if (!o) return !1;
                if (
                  (n && (this.engine.cleanupNode(o), (o.grid = this)),
                  o.grid?._isTemp,
                  C.off(t, 'drag'),
                  i !== t
                    ? (i.remove(), (t.gridstackNode = l), n && (t = t.cloneNode(!0)))
                    : (t.remove(), this._removeDD(t)),
                  !n)
                )
                  return !1;
                (t.gridstackNode = o), (o.el = t);
                let h = o.subGrid?.el?.gridstack;
                return (
                  s.copyPos(o, this._readAttr(this.placeholder)),
                  s.removePositioningStyles(t),
                  this.el.appendChild(t),
                  this._prepareElement(t, !0, o),
                  h && ((h.parentGridItem = o), h.opts.styleInHead || h._updateStyles(!0)),
                  this._updateContainerHeight(),
                  this.engine.addedNodes.push(o),
                  this._triggerAddEvent(),
                  this._triggerChangeEvent(),
                  this.engine.endUpdate(),
                  this._gsEventHandler.dropped &&
                    this._gsEventHandler.dropped(
                      { ...e, type: 'dropped' },
                      l && l.grid ? l : void 0,
                      o,
                    ),
                  r && this.setAnimation(this.opts.animate, !0),
                  !1
                );
              }),
            this
          );
        }
        static _itemRemoving(e, t) {
          const i = e ? e.gridstackNode : void 0;
          i?.grid &&
            !e.classList.contains(i.grid.opts.removableOptions.decline) &&
            (t ? (i._isAboutToRemove = !0) : delete i._isAboutToRemove,
            t
              ? e.classList.add('grid-stack-item-removing')
              : e.classList.remove('grid-stack-item-removing'));
        }
        _setupRemoveDrop() {
          if ('string' != typeof this.opts.removable) return this;
          let e = document.querySelector(this.opts.removable);
          return e
            ? (this.opts.staticGrid ||
                C.isDroppable(e) ||
                C.droppable(e, this.opts.removableOptions)
                  .on(e, 'dropover', (e, t) => R._itemRemoving(t, !0))
                  .on(e, 'dropout', (e, t) => R._itemRemoving(t, !1)),
              this)
            : this;
        }
        _prepareDragDropByNode(e) {
          let t = e.el;
          const i = e.noMove || this.opts.disableDrag,
            o = e.noResize || this.opts.disableResize;
          if (this.opts.staticGrid || (i && o))
            return (
              e._initDD && (this._removeDD(t), delete e._initDD),
              t.classList.add('ui-draggable-disabled', 'ui-resizable-disabled'),
              this
            );
          if (!e._initDD) {
            let i,
              o,
              n = (s, n) => {
                this._gsEventHandler[s.type] && this._gsEventHandler[s.type](s, s.target),
                  (i = this.cellWidth()),
                  (o = this.getCellHeight(!0)),
                  this._onStartMoving(t, s, n, e, i, o);
              },
              r = (s, n) => {
                this._dragOrResize(t, s, n, e, i, o);
              },
              l = (i) => {
                this.placeholder.remove(), delete e._moving, delete e._event, delete e._lastTried;
                const o = e.w !== e._orig.w;
                let n = i.target;
                if (n.gridstackNode && n.gridstackNode.grid === this) {
                  if (((e.el = n), e._isAboutToRemove)) {
                    let s = t.gridstackNode.grid;
                    s._gsEventHandler[i.type] && s._gsEventHandler[i.type](i, n),
                      s.engine.nodes.push(e),
                      s.removeWidget(t, !0, !0);
                  } else
                    s.removePositioningStyles(n),
                      e._temporaryRemoved
                        ? (s.copyPos(e, e._orig), this._writePosAttr(n, e), this.engine.addNode(e))
                        : this._writePosAttr(n, e),
                      this._gsEventHandler[i.type] && this._gsEventHandler[i.type](i, n);
                  (this._extraDragRow = 0),
                    this._updateContainerHeight(),
                    this._triggerChangeEvent(),
                    this.engine.endUpdate(),
                    'resizestop' === i.type &&
                      (Number.isInteger(e.sizeToContent) && (e.sizeToContent = e.h),
                      this.resizeToContentCheck(o, e));
                }
              };
            C.draggable(t, { start: n, stop: l, drag: r }).resizable(t, {
              start: n,
              stop: l,
              resize: r,
            }),
              (e._initDD = !0);
          }
          return (
            C.draggable(t, i ? 'disable' : 'enable').resizable(t, o ? 'disable' : 'enable'), this
          );
        }
        _onStartMoving(e, t, i, o, n, r) {
          if (
            (this.engine.cleanNodes().beginUpdate(o),
            this._writePosAttr(this.placeholder, o),
            this.el.appendChild(this.placeholder),
            (this.placeholder.gridstackNode = o),
            o.grid?.el)
          )
            this.dragTransform = s.getValuesFromTransformedElement(e);
          else if (this.placeholder && this.placeholder.closest('.grid-stack')) {
            const e = this.placeholder.closest('.grid-stack');
            this.dragTransform = s.getValuesFromTransformedElement(e);
          } else this.dragTransform = { xScale: 1, xOffset: 0, yScale: 1, yOffset: 0 };
          if (
            ((o.el = this.placeholder),
            (o._lastUiPosition = i.position),
            (o._prevYPix = i.position.top),
            (o._moving = 'dragstart' === t.type),
            delete o._lastTried,
            'dropover' === t.type &&
              o._temporaryRemoved &&
              (this.engine.addNode(o), (o._moving = !0)),
            this.engine.cacheRects(
              n,
              r,
              this.opts.marginTop,
              this.opts.marginRight,
              this.opts.marginBottom,
              this.opts.marginLeft,
            ),
            'resizestart' === t.type)
          ) {
            const t = this.getColumn() - o.x,
              i = (this.opts.maxRow || Number.MAX_SAFE_INTEGER) - o.y;
            C.resizable(e, 'option', 'minWidth', n * Math.min(o.minW || 1, t))
              .resizable(e, 'option', 'minHeight', r * Math.min(o.minH || 1, i))
              .resizable(
                e,
                'option',
                'maxWidth',
                n * Math.min(o.maxW || Number.MAX_SAFE_INTEGER, t),
              )
              .resizable(
                e,
                'option',
                'maxWidthMoveLeft',
                n * Math.min(o.maxW || Number.MAX_SAFE_INTEGER, o.x + o.w),
              )
              .resizable(
                e,
                'option',
                'maxHeight',
                r * Math.min(o.maxH || Number.MAX_SAFE_INTEGER, i),
              )
              .resizable(
                e,
                'option',
                'maxHeightMoveUp',
                r * Math.min(o.maxH || Number.MAX_SAFE_INTEGER, o.y + o.h),
              );
          }
        }
        _dragOrResize(e, t, i, o, n, r) {
          let l,
            h = { ...o._orig },
            a = this.opts.marginLeft,
            d = this.opts.marginRight,
            g = this.opts.marginTop,
            c = this.opts.marginBottom,
            p = Math.round(0.1 * r),
            u = Math.round(0.1 * n);
          if (
            ((a = Math.min(a, u)),
            (d = Math.min(d, u)),
            (g = Math.min(g, p)),
            (c = Math.min(c, p)),
            'drag' === t.type)
          ) {
            if (o._temporaryRemoved) return;
            let t = i.position.top - o._prevYPix;
            (o._prevYPix = i.position.top),
              !1 !== this.opts.draggable.scroll && s.updateScrollPosition(e, i.position, t);
            let l = i.position.left + (i.position.left > o._lastUiPosition.left ? -d : a),
              p = i.position.top + (i.position.top > o._lastUiPosition.top ? -c : g);
            (h.x = Math.round(l / n)), (h.y = Math.round(p / r));
            let u = this._extraDragRow;
            if (this.engine.collide(o, h)) {
              let e = this.getRow(),
                t = Math.max(0, h.y + o.h - e);
              this.opts.maxRow &&
                e + t > this.opts.maxRow &&
                (t = Math.max(0, this.opts.maxRow - e)),
                (this._extraDragRow = t);
            } else this._extraDragRow = 0;
            if (
              (this._extraDragRow !== u && this._updateContainerHeight(),
              o.x === h.x && o.y === h.y)
            )
              return;
          } else if ('resize' === t.type) {
            if (h.x < 0) return;
            if (
              (s.updateScrollResize(t, e, r),
              (h.w = Math.round((i.size.width - a) / n)),
              (h.h = Math.round((i.size.height - g) / r)),
              o.w === h.w && o.h === h.h)
            )
              return;
            if (o._lastTried && o._lastTried.w === h.w && o._lastTried.h === h.h) return;
            let d = i.position.left + a,
              c = i.position.top + g;
            (h.x = Math.round(d / n)), (h.y = Math.round(c / r)), (l = !0);
          }
          (o._event = t), (o._lastTried = h);
          let m = {
            x: i.position.left + a,
            y: i.position.top + g,
            w: (i.size ? i.size.width : o.w * n) - a - d,
            h: (i.size ? i.size.height : o.h * r) - g - c,
          };
          if (
            this.engine.moveNodeCheck(o, {
              ...h,
              cellWidth: n,
              cellHeight: r,
              rect: m,
              resizing: l,
            })
          ) {
            (o._lastUiPosition = i.position),
              this.engine.cacheRects(n, r, g, d, c, a),
              delete o._skipDown,
              l && o.subGrid && o.subGrid.onResize(),
              (this._extraDragRow = 0),
              this._updateContainerHeight();
            let e = t.target;
            this._writePosAttr(e, o),
              this._gsEventHandler[t.type] && this._gsEventHandler[t.type](t, e);
          }
        }
        _leave(e, t) {
          let i = e.gridstackNode;
          i &&
            (((t = t || e).style.transform = 'scale(1)'),
            C.off(e, 'drag'),
            i._temporaryRemoved ||
              ((i._temporaryRemoved = !0),
              this.engine.removeNode(i),
              (i.el = i._isExternal && t ? t : e),
              !0 === this.opts.removable && R._itemRemoving(e, !0),
              e._gridstackNodeOrig
                ? ((e.gridstackNode = e._gridstackNodeOrig), delete e._gridstackNodeOrig)
                : i._isExternal &&
                  (delete i.el, delete e.gridstackNode, this.engine.restoreInitial())));
        }
        commit() {
          return (
            (function (e, t, i, s, o) {
              let n = (...n) => (
                console.warn(
                  'gridstack.js: Function `' +
                    i +
                    '` is deprecated in ' +
                    o +
                    ' and has been replaced with `' +
                    s +
                    '`. It will be **removed** in a future release',
                ),
                t.apply(e, n)
              );
              n.prototype = t.prototype;
            })(this, this.batchUpdate(!1), 'commit', 'batchUpdate', '5.2'),
            this
          );
        }
      }
      (R.resizeToContentParent = '.grid-stack-item-content'),
        (R.Utils = s),
        (R.Engine = o),
        (R.GDRev = '10.3.1');
    },
  },
]);
