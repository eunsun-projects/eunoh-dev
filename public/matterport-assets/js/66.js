/*! For license information please see 66.js.LICENSE.txt */
(self.webpackChunkmp_webgl = self.webpackChunkmp_webgl || []).push([
  [66, 858],
  {
    94810: (t, e, i) => {
      var n = i(72337);
      (n.Canvas = i(64376)), (n.SVG = i(50060)), (t.exports = n);
    },
    72337: (t, e, i) => {
      var n = i(70858),
        s = i(98470),
        o = i(83211),
        a = i(66716),
        r = i(13424),
        h = i(14652),
        l = i(47261),
        d = i(69819),
        p = (i(81231), i(33925)),
        u = i(56204),
        _ = i(8081),
        c = i(18468),
        v = i(29126),
        g = i(36177),
        y = i(59827),
        f = i(57174),
        E = i(91724),
        S = !1;
      function C(t) {
        if (S) throw new Error('ControlKit is already initialized.');
        ((t = t || {}).history = void 0 !== t.history && t.history),
          (t.loadAndSave = void 0 !== t.loadAndSave && t.loadAndSave),
          (t.opacity = void 0 === t.opacity ? 1 : t.opacity),
          (t.panelsClosable = void 0 !== t.panelsClosable && t.panelsClosable),
          (t.useExternalStyle = void 0 !== t.useExternalStyle && t.useExternalStyle),
          (t.enable = void 0 === t.enable || t.enable),
          h.apply(this, arguments);
        var e = null;
        if (
          (t.parentDomElementId
            ? (e = n.getNodeById(t.parentDomElementId))
            : ((e = new n()), document.body.appendChild(e.getElement())),
          !t.useExternalStyle)
        ) {
          var s = document.createElement('style');
          s.type = 'text/css';
          var l = t.style ? t.styleString : i(64958).string;
          s.stylesheet ? (s.stylesheet.cssText = l) : s.appendChild(document.createTextNode(l)),
            (document.head || document.getElementsByTagName('head')[0]).appendChild(s);
        }
        e.setProperty('id', r.ControlKit),
          (this._node = e),
          (this._panels = []),
          (this._enabled = t.enable),
          (this._historyEnabled = t.history),
          (this._statesEnabled = t.loadAndSave),
          (this._panelsClosable = t.panelsClosable);
        var p = c.setup();
        this._historyEnabled
          ? (p.addEventListener(u.STATE_PUSH, this, 'onHistoryStatePush'),
            p.addEventListener(u.STATE_POP, this, 'onHistoryStatePop'))
          : p.disable(),
          g.setup(),
          a.setup(e),
          o.setup(e);
        var _ = t.opacity;
        1 != _ && 0 != _ && e.setStyleProperty('opacity', _), (this._canUpdate = !0);
        var v,
          y = this,
          f = 0,
          E = 10;
        window.addEventListener(d.WINDOW_RESIZE, function () {
          (y._canUpdate = !1),
            clearInterval(v),
            (v = setInterval(function () {
              f >= E && ((f = 0), (y._canUpdate = !0), clearInterval(v)), f++;
            }, 25));
        }),
          (this._shortcutEnable = 'h'),
          document.addEventListener('keydown', function (t) {
            t.ctrlKey &&
              String.fromCharCode(t.which || t.keyCode).toLowerCase() == y._shortcutEnable &&
              ((y._enabled = !y._enabled), y._enabled ? y._enable() : y._disable());
          }),
          this._enabled || this._disable(),
          (S = !0);
      }
      (C.prototype = Object.create(h.prototype)),
        (C.prototype.constructor = C),
        (C.prototype.addPanel = function (t) {
          var e = new s(this, t);
          return this._panels.push(e), e;
        }),
        (C.prototype.update = function () {
          if (this._enabled && this._canUpdate) {
            var t,
              e,
              i,
              n,
              s,
              o,
              a,
              r,
              h,
              l,
              d = this._panels;
            for (t = -1, n = d.length; ++t < n; )
              if (!(a = d[t]).isDisabled())
                for (e = -1, s = (r = a.getGroups()).length; ++e < s; )
                  for (i = -1, o = (h = r[e].getComponents()).length; ++i < o; )
                    (l = h[i]).isDisabled() ||
                      ((l instanceof y || l instanceof f || l instanceof E) && l.update());
          }
        }),
        (C.prototype.historyIsEnabled = function () {
          return this._historyEnabled;
        }),
        (C.prototype.statesAreEnabled = function () {
          return this._statesEnabled;
        }),
        (C.prototype.panelsAreClosable = function () {
          return this._panelsClosable;
        }),
        (C.prototype._enable = function () {
          for (var t = -1, e = this._panels, i = e.length; ++t < i; ) e[t].enable();
          this._node.setStyleProperty('visibility', '');
        }),
        (C.prototype._disable = function () {
          for (var t = -1, e = this._panels, i = e.length; ++t < i; ) e[t].disable();
          this._node.setStyleProperty('visibility', 'hidden');
        }),
        (C.prototype.enable = function () {
          this._enable(), (this._enabled = !0);
        }),
        (C.prototype.disable = function () {
          this._disable(), (this._enabled = !1);
        }),
        (C.prototype.setShortcutEnable = function (t) {
          this._shortcutEnable = t;
        }),
        (C.prototype.onHistoryStatePush = function () {
          this.dispatchEvent(new l(this, _.UPDATE_MENU, null));
        }),
        (C.prototype.onHistoryStatePop = function () {
          this.dispatchEvent(new l(this, p.UPDATE_VALUE, { origin: null })),
            this.dispatchEvent(new l(this, _.UPDATE_MENU, null));
        }),
        (C.prototype.loadSettings = function (t) {
          for (var e = -1, i = t.length, n = this._panels; ++e < i; ) n[e].setData(t[e]);
        }),
        (C.prototype._loadState = function () {
          v.load(this.loadSettings.bind(this));
        }),
        (C.prototype._saveState = function () {
          this.update();
          for (var t = this._panels, e = -1, i = t.length, n = new Array(i); ++e < i; )
            n[e] = t[e].getData();
          v.save({ data: n });
        }),
        (C.prototype.getNode = function () {
          return this._node;
        }),
        (C.destroy = function () {
          g.get().destroy(), o.get().destroy(), a.get().destroy(), (S = !1);
        }),
        (t.exports = C);
    },
    92787: (t, e, i) => {
      var n = i(47261),
        s = i(81231),
        o = i(33925),
        a = i(70858),
        r = i(40930),
        h = i(13424);
      function l(t, e, i, l) {
        (i = i || function () {}), ((l = l || {}).label = l.label || ''), r.apply(this, [t, l]);
        var d = (this._inputNode = new a(a.INPUT_BUTTON));
        d.setStyleClass(h.Button), d.setProperty('value', e);
        var p = this;
        d.addEventListener(s.ON_CLICK, function () {
          i.bind(p)(), p.dispatchEvent(new n(p, o.VALUE_UPDATED));
        }),
          this._wrapNode.addChild(d);
      }
      (l.prototype = Object.create(r.prototype)),
        (l.prototype.constructor = l),
        (l.prototype.getButtonLabel = function () {
          return this._inputNode.getProperty('value');
        }),
        (l.prototype.setButtonLabel = function (t) {
          this._inputNode.setProperty('value', t);
        }),
        (t.exports = l);
    },
    12410: (t, e, i) => {
      var n = i(14652),
        s = i(81796),
        o = i(47261),
        a = i(72519),
        r = i(81231),
        h = i(70858),
        l = i(13424);
      function d(t) {
        n.apply(this);
        var e = (this._btnNode = new h(h.INPUT_BUTTON)),
          i = (this._indiNode = new h());
        (this._onActive = function () {}),
          (this._onDeactive = function () {}),
          (this._isActive = !1),
          e.setStyleClass(l.ButtonPreset),
          e.addEventListener(r.MOUSE_DOWN, this._onMouseDown.bind(this)),
          e.addChild(i),
          t.addChildAt(e, 0),
          s.get().addEventListener(a.TRIGGER, this, 'onOptionTrigger'),
          this.addEventListener(a.TRIGGERED, s.get(), 'onOptionTriggered');
      }
      (d.prototype = Object.create(n.prototype)),
        (d.prototype.constructor = d),
        (d.prototype.onOptionTrigger = function (t) {
          t.data.origin != this
            ? this._isActive && this.deactivate()
            : this._isActive
              ? this._onDeactive()
              : (this._onActive(),
                this._btnNode.setStyleClass(l.ButtonPresetActive),
                (this._isActive = !0));
        }),
        (d.prototype._onMouseDown = function () {
          this.dispatchEvent(new o(this, a.TRIGGERED, null));
        }),
        (d.prototype.setOnActive = function (t) {
          this._onActive = t;
        }),
        (d.prototype.setOnDeactive = function (t) {
          this._onDeactive = t;
        }),
        (d.prototype.deactivate = function () {
          (this._isActive = !1), this._btnNode.setStyleClass(l.ButtonPreset);
        }),
        (t.exports = d);
    },
    64376: (t, e, i) => {
      var n = i(40930),
        s = i(13424),
        o = i(35226),
        a = i(47261),
        r = i(47282);
      function h(t, e) {
        n.apply(this, arguments);
        var i = this._wrapNode;
        i.setStyleClass(s.CanvasWrap);
        var o = (this._canvas = document.createElement('canvas'));
        i.getElement().appendChild(o);
        var a = i.getWidth();
        (this._canvasWidth = this._canvasHeight = 0),
          this._setCanvasSize(a, a),
          this._updateHeight(),
          this._node.setStyleClass(s.CanvasListItem),
          this._parent.addEventListener(r.GROUP_SIZE_CHANGE, this, 'onGroupSizeChange'),
          this.addEventListener(r.GROUP_SIZE_UPDATE, this._parent, 'onGroupSizeUpdate');
      }
      (h.prototype = Object.create(n.prototype)),
        (h.prototype.constructor = h),
        (h.prototype._updateHeight = function () {
          var t = this._canvas.height;
          this._wrapNode.setHeight(t), this._node.setHeight(t + o.PADDING_WRAPPER);
        }),
        (h.prototype.onGroupSizeChange = function () {
          var t = this._wrapNode.getWidth();
          this._setCanvasSize(t, t),
            this._updateHeight(),
            this._redraw(),
            this.dispatchEvent(new a(this, r.GROUP_SIZE_UPDATE, null));
        }),
        (h.prototype._setCanvasSize = function (t, e) {
          var i = (this._canvasWidth = t),
            n = (this._canvasHeight = e),
            s = this._canvas;
          (s.style.width = i + 'px'), (s.style.height = n + 'px'), (s.width = i), (s.height = n);
        }),
        (h.prototype.getCanvas = function () {
          return this._canvas;
        }),
        (h.prototype.getContext = function () {
          return this._canvas.getContext('2d');
        }),
        (t.exports = h);
    },
    65761: (t, e, i) => {
      var n = i(32884),
        s = i(70858),
        o = i(47261),
        a = i(81231),
        r = i(33925);
      function h(t, e, i, o) {
        n.apply(this, arguments),
          ((o = o || {}).onChange = o.onChange || this._onChange),
          (this._onChange = o.onChange);
        var r = (this._input = new s(s.INPUT_CHECKBOX));
        r.setProperty('checked', this._obj[this._key]),
          r.addEventListener(a.CHANGE, this._onInputChange.bind(this)),
          this._wrapNode.addChild(this._input);
      }
      (h.prototype = Object.create(n.prototype)),
        (h.prototype.constructor = h),
        (h.prototype.applyValue = function () {
          this.pushHistoryState();
          var t = this._obj,
            e = this._key;
          (t[e] = !t[e]), this.dispatchEvent(new o(this, r.VALUE_UPDATED, null));
        }),
        (h.prototype._onInputChange = function () {
          this.applyValue(), this._onChange();
        }),
        (h.prototype.onValueUpdate = function (t) {
          t.data.origin != this && this._input.setProperty('checked', this._obj[this._key]);
        }),
        (t.exports = h);
    },
    61134: (t, e, i) => {
      var n = i(32884),
        s = i(70858),
        o = i(89433),
        a = i(66716),
        r = i(21074),
        h = i(83211),
        l = i(12410),
        d = i(35226),
        p = i(13424),
        u = i(47261),
        _ = i(81231),
        c = i(33925),
        v = i(72222),
        g = o.HEX,
        y = 'Color format should be hex. Set colorMode to rgb, rgbfv or hsv.',
        f = 'Color format should be rgb, rgbfv or hsv. Set colorMode to hex.',
        E = 'Preset color format should be hex.',
        S = 'Preset color format should be rgb, rgbfv or hsv.';
      function C(t, e, i, o) {
        n.apply(this, arguments),
          ((o = o || {}).presets = o.presets || null),
          (o.colorMode = o.colorMode || g),
          (o.onChange = o.onChange || this._onChange),
          (this._presetsKey = o.presets),
          (this._onChange = o.onChange);
        var a = (this._color = new s());
        i = this._value = this._obj[this._key];
        var r = (this._colorMode = o.colorMode);
        this._validateColorFormat(i, y, f);
        var u = this._wrapNode;
        if (this._presetsKey) {
          a.setStyleClass(p.Color);
          var c = new s();
          c.setStyleClass(p.WrapColorWPreset), u.addChild(c), c.addChild(a);
          for (var v = this._obj[this._presetsKey], C = -1; ++C < v.length; )
            this._validateColorFormat(v[C], E, S);
          var b = h.get(),
            m = new l(u),
            w = function () {
              b.clear(), m.deactivate();
            },
            P = this,
            M = function () {
              b.build(
                v,
                P._value,
                a,
                function () {
                  P.pushHistoryState(),
                    (P._value = v[b.getSelectedIndex()]),
                    P.applyValue(),
                    P._onChange(P._obj[P._key]);
                },
                w,
                d.PADDING_PRESET,
                !0,
                r,
              );
            };
          m.setOnActive(M), m.setOnDeactive(w);
        } else a.setStyleClass(p.Color), u.addChild(a);
        a.addEventListener(_.MOUSE_DOWN, this._onColorTrigger.bind(this)), this._updateColor();
      }
      (C.prototype = Object.create(n.prototype)),
        (C.prototype.constructor = C),
        (C.prototype._onColorTrigger = function () {
          var t,
            e = this._colorMode,
            i = o.HEX,
            n = o.RGB,
            s = o.RGBfv,
            r = o.HSV,
            h = this._value,
            l = function () {
              switch ((this.pushHistoryState(), e)) {
                case i:
                  this._value = a.get().getHEX();
                  break;
                case n:
                  (t = a.get().getRGB()), (h[0] = t[0]), (h[1] = t[1]), (h[2] = t[2]);
                  break;
                case s:
                  (t = a.get().getRGBfv()), (h[0] = t[0]), (h[1] = t[1]), (h[2] = t[2]);
                  break;
                case r:
                  this._value = a.get().getHSV();
              }
              this.applyValue();
            }.bind(this),
            d = a.get();
          switch (e) {
            case i:
              d.setColorHEX(h);
              break;
            case n:
              d.setColorRGB(h[0], h[1], h[2]);
              break;
            case s:
              d.setColorRGBfv(h[0], h[1], h[2]);
              break;
            case r:
              d.setColorHSV(h[0], h[1], h[2]);
          }
          d.setCallbackPick(l), d.open();
        }),
        (C.prototype.applyValue = function () {
          (this._obj[this._key] = this._value),
            this._updateColor(),
            this.dispatchEvent(new u(this, c.VALUE_UPDATED, null)),
            this._onChange(this._obj[this._key]);
        }),
        (C.prototype.onValueUpdate = function (t) {
          t.data.origin != this && ((this._value = this._obj[this._key]), this._updateColor());
        }),
        (C.prototype._updateColor = function () {
          var t,
            e = this._value,
            i = this._color;
          switch ((i.setProperty('innerHTML', e), this._colorMode)) {
            case o.HEX:
              t = e;
              break;
            case o.RGB:
              t = r.RGB2HEX(e[0], e[1], e[2]);
              break;
            case o.RGBfv:
              t = r.RGBfv2HEX(e[0], e[1], e[2]);
              break;
            case o.HSV:
              t = r.HSV2RGB(e[0], e[1], e[2]);
          }
          i.getStyle().backgroundColor = t;
        }),
        (C.prototype._validateColorFormat = function (t, e, i) {
          var n = this._colorMode;
          if (
            (n == o.HEX && '[object Array]' === Object.prototype.toString.call(t)) ||
            (n == o.HEX && '[object Float32Array]' === Object.prototype.toString.call(t))
          )
            throw new v(e);
          if (
            ((n == o.RGB || n == o.RGBfv || n == o.HSV) &&
              '[object Array]' !== Object.prototype.toString.call(t)) ||
            (n == o.HSV && '[object Float32Array]' !== Object.prototype.toString.call(t))
          )
            throw new v(i);
        }),
        (t.exports = C);
    },
    77563: (t) => {
      t.exports = { IMPLICIT: 'implicit', NON_IMPLICIT: 'nonImplicit' };
    },
    12396: (t, e, i) => {
      var n = i(78427),
        s = i(70858),
        o = i(13424),
        a = i(77563),
        r = i(36177),
        h = i(35226),
        l = i(69819),
        d = i(33925),
        p = i(81231),
        u = i(17160),
        _ = i(61467),
        c = i(81796),
        v = 'rgba(255,255,255,0.75)',
        g = 'rgba(25,25,25,0.75)',
        y = 'rgb(54,60,64)',
        f = 'rgb(25,25,25)';
      function E(t, e, i, r) {
        if (
          (((r = r || {}).showMinMaxLabels = void 0 === r.showMinMaxLabels || r.showMinMaxLabels),
          n.apply(this, arguments),
          'function' != typeof e[i])
        )
          throw new u(e, i);
        var h = e[i].length;
        if (h > 2 || 0 == h) throw new _();
        var E = this._svgRoot,
          S = this._path,
          C = (this._axes = E.insertBefore(this._createSVGObject('path'), S));
        C.style.strokeWidth = 1;
        var b = (this._axesLabels = E.insertBefore(this._createSVGObject('path'), S));
        (b.style.stroke = 'rgb(43,48,51)'), (b.style.strokeWidth = 1);
        var m = this._grid,
          w = this._svg,
          P = Number(w.getAttribute('width')),
          M = new s();
        M.setStyleClass(o.GraphSliderXWrap);
        var H = new s();
        H.setStyleClass(o.GraphSliderYWrap);
        var N = (this._sliderXTrack = new s());
        N.setStyleClass(o.GraphSliderX);
        var L = (this._sliderYTrack = new s());
        L.setStyleClass(o.GraphSliderY);
        var O = (this._sliderXHandle = new s());
        O.setStyleClass(o.GraphSliderXHandle);
        var A = (this._sliderYHandle = new s());
        A.setStyleClass(o.GraphSliderYHandle),
          N.addChild(O),
          L.addChild(A),
          M.addChild(N),
          H.addChild(L);
        var I = this._wrapNode,
          G = (this._plotMode = 1 == h ? a.NON_IMPLICIT : a.IMPLICIT);
        if (G == a.IMPLICIT) {
          var T = (this._canvas = document.createElement('canvas'));
          (T.style.width = T.style.height = P + 'px'),
            (T.width = T.height = P),
            I.getElement().insertBefore(T, w),
            (this._canvasContext = T.getContext('2d')),
            (this._canvasImageData = this._canvasContext.getImageData(0, 0, P, P)),
            (C.style.stroke = v),
            (m.style.stroke = g);
        } else (C.style.stroke = y), (m.style.stroke = f);
        I.addChild(M),
          I.addChild(H),
          O.addEventListener(p.MOUSE_DOWN, this._onSliderXHandleDown.bind(this)),
          A.addEventListener(p.MOUSE_DOWN, this._onSliderYHandleDown.bind(this));
        var D = (this._units = [null, null]);
        (this._scale = null),
          G == a.NON_IMPLICIT
            ? ((D[0] = 1), (D[1] = 1), (this._scale = 10))
            : G == a.IMPLICIT && ((D[0] = 0.25), (D[1] = 0.25), (this._scale = 1)),
          (this._unitsMinMax = [0.15, 4]),
          (this._scaleMinMax = [0.02, 25]),
          (this._center = [Math.round(0.5 * P), Math.round(0.5 * P)]),
          (this._svgPos = [0, 0]),
          (this._func = null),
          this.setFunction(this._obj[this._key]),
          this._sliderXHandleUpdate(),
          this._sliderYHandleUpdate(),
          w.addEventListener(l.MOUSE_DOWN, this._onDragStart.bind(this), !1),
          this._wrapNode.getElement().addEventListener('mousewheel', this._onScale.bind(this, !1)),
          c.get().addEventListener(d.UPDATE_VALUE, this, 'onValueUpdate');
      }
      (E.prototype = Object.create(n.prototype)),
        (E.prototype.constructor = E),
        (E.prototype._updateCenter = function () {
          var t = this._svg,
            e = Number(t.getAttribute('width')),
            i = Number(t.getAttribute('height')),
            n = r.get().getPosition(),
            s = this._svgPos,
            o = this._center;
          (o[0] = Math.max(0, Math.min(n[0] - s[0], e))),
            (o[1] = Math.max(0, Math.min(n[1] - s[1], i))),
            this._plotGraph();
        }),
        (E.prototype._onDragStart = function (t) {
          var e = this._svgPos;
          (e[0] = 0), (e[1] = 0);
          for (var i = this._svg.parentNode; i; )
            (e[0] += i.offsetLeft), (e[1] += i.offsetTop), (i = i.offsetParent);
          var n = l.MOUSE_MOVE,
            s = l.MOUSE_UP,
            o = this._updateCenter.bind(this),
            a = function () {
              this._updateCenter.bind(this),
                document.removeEventListener(n, o, !1),
                document.removeEventListener(s, a, !1);
            }.bind(this);
          document.addEventListener(n, o, !1),
            document.addEventListener(s, a, !1),
            this._updateCenter();
        }),
        (E.prototype._onScale = function (t) {
          (t = window.event || t),
            (this._scale += -1 * Math.max(-1, Math.min(1, t.wheelDelta || -t.detail)));
          var e = this._scaleMinMax;
          (this._scale = Math.max(e[0], Math.min(this._scale, e[1]))),
            this._plotGraph(),
            t.preventDefault();
        }),
        (E.prototype.onValueUpdate = function () {
          this.setFunction(this._obj[this._key]);
        }),
        (E.prototype._redraw = function () {
          if (this._plotMode == a.IMPLICIT) {
            var t = this._wrapNode.getWidth(),
              e = this._canvas;
            (e.style.width = e.style.height = t + 'px'),
              (e.width = e.height = t),
              (this._canvasImageData = this._canvasContext.getImageData(0, 0, t, t));
          }
          this._sliderXHandleUpdate(),
            this._sliderYHandleUpdate(),
            this.setFunction(this._obj[this._key]);
        }),
        (E.prototype.setFunction = function (t) {
          (this._func = t.bind(this._obj)), this._plotGraph();
        }),
        (E.prototype._plotGraph = function () {
          this._drawGrid(), this._drawAxes(), this._drawPlot();
        }),
        (E.prototype._drawAxes = function () {
          var t = this._svg,
            e = Number(t.getAttribute('width')),
            i = Number(t.getAttribute('height')),
            n = this._center,
            s = n[0],
            o = n[1],
            a = '';
          (a += this._pathCmdLine(0, o, e, o)),
            (a += this._pathCmdLine(s, 0, s, i)),
            this._axes.setAttribute('d', a);
        }),
        (E.prototype._drawPlot = function () {
          var t,
            e,
            i,
            n,
            s,
            o,
            r,
            h,
            l,
            d,
            p = this._center,
            u = p[0],
            _ = p[1],
            c = this._units,
            v = this._scale;
          if (this._plotMode == a.NON_IMPLICIT) {
            var g = this._svg;
            (t = Number(g.getAttribute('width'))),
              (e = Number(g.getAttribute('height'))),
              (i = c[0] * v),
              (n = e / (c[1] * v)),
              (h = u / t);
            var y = Math.floor(t),
              f = new Array(2 * y);
            for (d = -1; ++d < y; )
              (s = (d / y - h) * i),
                (o = _ - this._func(s) * n),
                (f[(r = 2 * d)] = d),
                (f[r + 1] = o);
            var E = '';
            for (E += this._pathCmdMoveTo(f[0], f[1]), d = 2; d < f.length; )
              (E += this._pathCmdLineTo(f[d], f[d + 1])), (d += 2);
            this._path.setAttribute('d', E);
          } else {
            var S = this._canvas,
              C = this._canvasContext,
              b = this._canvasImageData;
            (t = S.width), (e = S.height), (i = c[0] * v), (n = c[1] * v), (h = u / t), (l = _ / e);
            var m,
              w = 1 / t,
              P = 1 / e,
              M = [0, 0, 0],
              H = [30, 34, 36],
              N = [255, 255, 255];
            for (d = -1; ++d < e; )
              for (m = -1; ++m < t; )
                (o = this._func((m * w - h) * i, (d * P - l) * n)),
                  (M[0] = Math.floor((N[0] - H[0]) * o + H[0])),
                  (M[1] = Math.floor((N[1] - H[1]) * o + H[1])),
                  (M[2] = Math.floor((N[2] - H[2]) * o + H[2])),
                  (r = 4 * (d * t + m)),
                  (b.data[r] = M[0]),
                  (b.data[r + 1] = M[1]),
                  (b.data[r + 2] = M[2]),
                  (b.data[r + 3] = 255);
            C.clearRect(0, 0, t, e), C.putImageData(b, 0, 0);
          }
        }),
        (E.prototype._drawGrid = function () {
          var t,
            e,
            i = this._svg,
            n = Number(i.getAttribute('width')),
            s = Number(i.getAttribute('height')),
            o = this._scale,
            a = this._units,
            r = n / (a[0] * o),
            l = s / (a[1] * o),
            d = this._center,
            p = d[0],
            u = d[1],
            _ = Math.round(u / l) + 1,
            c = Math.round((s - u) / l) + 1,
            v = Math.round(p / r) + 1,
            g = Math.round((n - p) / r) + 1,
            y = '',
            f = '',
            E = h.STROKE_SIZE,
            S = h.FUNCTION_PLOTTER_LABEL_TICK_SIZE,
            C = n - S - E,
            b = s - S - E,
            m = C - S,
            w = b - S,
            P = C - 2 * (S + E),
            M = b - 2 * (S + E);
          for (t = -1; ++t < _; )
            (e = Math.round(u - l * t)),
              (y += this._pathCmdLine(0, e, n, e)),
              e > S && (f += this._pathCmdLine(C, e, m, e));
          for (t = -1; ++t < c; )
            (e = Math.round(u + l * t)),
              (y += this._pathCmdLine(0, e, n, e)),
              e < M && (f += this._pathCmdLine(C, e, m, e));
          for (t = -1; ++t < v; )
            (e = Math.round(p - r * t)),
              (y += this._pathCmdLine(e, 0, e, s)),
              e > S && (f += this._pathCmdLine(e, b, e, w));
          for (t = -1; ++t < g; )
            (e = Math.round(p + r * t)),
              (y += this._pathCmdLine(e, 0, e, s)),
              e < P && (f += this._pathCmdLine(e, b, e, w));
          this._grid.setAttribute('d', y), this._axesLabels.setAttribute('d', f);
        }),
        (E.prototype._sliderXStep = function (t) {
          var e = t[0],
            i = this._sliderXHandle,
            n = 0.5 * i.getWidth(),
            s = this._sliderXTrack,
            o = s.getWidth(),
            a = s.getPositionGlobalX(),
            r = o - n - 2 * h.STROKE_SIZE,
            l = Math.max(n, Math.min(e - a, r)),
            d = l - n;
          i.setPositionX(d);
          var p = this._unitsMinMax[0],
            u = p + (this._unitsMinMax[1] - p) * ((l - n) / (r - n));
          (this._units[0] = u), this._plotGraph();
        }),
        (E.prototype._sliderYStep = function (t) {
          var e = t[1],
            i = this._sliderYHandle,
            n = 0.5 * i.getHeight(),
            s = this._sliderYTrack,
            o = s.getHeight(),
            a = s.getPositionGlobalY(),
            r = o - n - 2,
            h = Math.max(n, Math.min(e - a, r)),
            l = h - n;
          i.setPositionY(l);
          var d = this._unitsMinMax[0],
            p = this._unitsMinMax[1],
            u = p + (d - p) * ((h - n) / (r - n));
          (this._units[1] = u), this._plotGraph();
        }),
        (E.prototype._onSliderXHandleDown = function () {
          this._onSliderHandleDown(this._sliderXStep.bind(this));
        }),
        (E.prototype._onSliderYHandleDown = function () {
          this._onSliderHandleDown(this._sliderYStep.bind(this));
        }),
        (E.prototype._onSliderHandleDown = function (t) {
          var e = l.MOUSE_MOVE,
            i = l.MOUSE_UP,
            n = r.get(),
            s = function () {
              t(n.getPosition());
            },
            o = function () {
              document.removeEventListener(e, s, !1), document.removeEventListener(i, o, !1);
            };
          t(n.getPosition()),
            document.addEventListener(e, s, !1),
            document.addEventListener(i, o, !1);
        }),
        (E.prototype._sliderXHandleUpdate = function () {
          var t = this._unitsMinMax[0],
            e = this._unitsMinMax[1],
            i = this._units[0],
            n = this._sliderXHandle,
            s = 0.5 * n.getWidth(),
            o = s,
            a = this._sliderXTrack.getWidth() - s - 2 * h.STROKE_SIZE;
          n.setPositionX(o + ((i - t) / (e - t)) * (a - o) - s);
        }),
        (E.prototype._sliderYHandleUpdate = function () {
          var t = this._unitsMinMax[0],
            e = this._unitsMinMax[1],
            i = this._units[1],
            n = this._sliderYHandle,
            s = 0.5 * n.getHeight(),
            o = this._sliderYTrack.getHeight() - s - 2 * h.STROKE_SIZE,
            a = s;
          n.setPositionY(o + ((i - t) / (e - t)) * (a - o) - s);
        }),
        (t.exports = E);
    },
    61467: (t) => {
      function e() {
        Error.apply(this),
          Error.captureStackTrace(this, e),
          (this.name = 'FunctionPlotterFunctionArgsError'),
          (this.message = 'Function should be of form f(x) or f(x,y).');
      }
      (e.prototype = Object.create(Error.prototype)),
        (e.prototype.constructor = e),
        (t.exports = e);
    },
    17160: (t) => {
      function e(t, i) {
        Error.apply(this),
          Error.captureStackTrace(this, e),
          (this.name = 'ComponentObjectError'),
          (this.message = 'Object ' + t.constructor.name + ' ' + i + 'should be of type Function.');
      }
      (e.prototype = Object.create(Error.prototype)),
        (e.prototype.constructor = e),
        (t.exports = e);
    },
    35226: (t) => {
      t.exports = {
        COMPONENT_MIN_HEIGHT: 25,
        STROKE_SIZE: 1,
        PADDING_WRAPPER: 12,
        PADDING_OPTIONS: 2,
        PADDING_PRESET: 20,
        SCROLLBAR_TRACK_PADDING: 2,
        FUNCTION_PLOTTER_LABEL_TICK_SIZE: 6,
      };
    },
    7969: (t, e, i) => {
      var n = i(32884),
        s = i(36735),
        o = i(70858),
        a = i(83211),
        r = i(12410),
        h = i(13424),
        l = i(35226),
        d = i(47261),
        p = i(69819),
        u = i(81231),
        _ = i(33925);
      function c(t, e, i, d) {
        n.apply(this, arguments),
          ((d = d || {}).onBegin = d.onBegin || null),
          (d.onChange = d.onChange || this._onChange),
          (d.onFinish = d.onFinish || null),
          (d.onError = d.onError || null),
          (d.dp = void 0 === d.dp || null == d.dp ? 2 : d.dp),
          (d.step = d.step || 1),
          (d.presets = d.presets || null),
          (this._onBegin = d.onBegin),
          (this._onChange = d.onChange),
          (this._presetsKey = d.presets);
        var p = (this._input = new s(
            d.step,
            d.dp,
            d.onBegin,
            this._onInputChange.bind(this),
            d.onFinish,
            d.onError,
          )),
          c = this._wrapNode,
          v = d.presets;
        if (v) {
          var g = new o();
          g.setStyleClass(h.WrapInputWPreset), c.addChild(g), g.addChild(p.getNode());
          var y = a.get(),
            f = (this._btnPreset = new r(this._wrapNode)),
            E = function () {
              y.clear(), f.deactivate();
            },
            S = this,
            C = function () {
              y.build(
                v,
                p.getValue(),
                p.getNode(),
                function () {
                  p.setValue(v[y.getSelectedIndex()]), S.applyValue(), S._onChange(S._obj[S._key]);
                },
                E,
                l.PADDING_PRESET,
                !1,
              );
            };
          f.setOnActive(C), f.setOnDeactive(E);
        } else c.addChild(p.getNode());
        p.getNode().addEventListener(u.MOUSE_DOWN, this._onInputDragStart.bind(this)),
          this.addEventListener(_.INPUT_SELECT_DRAG, this._parent, 'onComponentSelectDrag'),
          p.setValue(this._obj[this._key]);
      }
      (c.prototype = Object.create(n.prototype)),
        (c.prototype.constructor = c),
        (c.prototype._onInputChange = function () {
          this.applyValue(), this._onChange(this._obj[this._key]);
        }),
        (c.prototype.applyValue = function () {
          this.pushHistoryState(),
            (this._obj[this._key] = this._input.getValue()),
            this.dispatchEvent(new d(this, _.VALUE_UPDATED, null));
        }),
        (c.prototype.onValueUpdate = function (t) {
          t.data.origin != this && this._input.setValue(this._obj[this._key]);
        }),
        (c.prototype._onInputDragStart = function () {
          var t = p.MOUSE_MOVE,
            e = p.MOUSE_UP,
            i = _.INPUT_SELECT_DRAG,
            n = this,
            s = function () {
              n.dispatchEvent(new d(this, i, null));
            },
            o = function () {
              n.dispatchEvent(new d(this, i, null)),
                document.removeEventListener(t, s, !1),
                document.removeEventListener(t, o, !1);
            };
          this.dispatchEvent(new d(this, i, null)),
            document.addEventListener(t, s, !1),
            document.addEventListener(e, o, !1);
        }),
        (t.exports = c);
    },
    36735: (t, e, i) => {
      var n = i(14652),
        s = (i(81231), i(70858)),
        o = /^-?\d*\.?\d*$/,
        a = null,
        r = null;
      function h(t, e) {
        t.setProperty('value', e), t.dispatchEvent(new Event('input'));
      }
      (NumberInput_Internal = function (t, e, i, o, h, l) {
        n.apply(this, null),
          (this._value = 0),
          (this._valueStep = t),
          (this._valueDp = e),
          (this._onBegin = i || function () {}),
          (this._onChange = o || function () {}),
          (this._onFinish = h || function () {}),
          (this._onError = l || function () {}),
          (this._keyCode = null),
          (this._caretOffset = 0);
        var d = (this._input = new s('text'));
        d.setProperty('value', this._value),
          d.addEventListener('input', this._onInput.bind(this)),
          d.addEventListener('keydown', this._onKeydown.bind(this)),
          a ||
            (d.getElement().setSelectionRange
              ? ((a = function (t, e) {
                  t.getElement().setSelectionRange(e, e);
                }),
                (r = function (t) {
                  t.getElement().setSelectionRange(0, t.getProperty('value').length);
                }))
              : ((a = function (t, e) {
                  var i = t.getElement().createTextRange();
                  i.collapse(!0),
                    i.moveEnd('character', e),
                    i.moveStart('character', e),
                    i.select();
                }),
                (r = function (t) {
                  var e = t.getElement().createTextRange();
                  e.collapse(!0),
                    e.moveStart('character', 0),
                    e.moveEnd('character', t.getProperty('value').length),
                    e.select();
                })));
      }),
        (NumberInput_Internal.prototype = Object.create(n.prototype)),
        (NumberInput_Internal.prototype.constructor = NumberInput_Internal),
        (NumberInput_Internal.prototype._setValue = function (t) {
          var e = ((t = +t) || 1 / t) < 0 && 0 == t ? '-' : '';
          (t = Number(t).toFixed(this._valueDp)),
            this._input.setProperty('value', e + t),
            (this._value = Number(t));
        }),
        (NumberInput_Internal.prototype._onInput = function () {
          var t = this._input,
            e = t.getProperty('value'),
            i = t.getProperty('selectionStart'),
            n = this._valueDp,
            s = e[0];
          if (('' == e ? (e = 0) : '.' === s && (e = '0' + e), !o.test(e) || '-' == e))
            return (
              t.setProperty('value', this._value.toFixed(n)),
              a(t, Math.max(--i, 0)),
              void this._onError(this._keyCode)
            );
          this._onBegin(this._value),
            this._setValue(e),
            a(t, i - this._caretOffset),
            this._onChange();
        }),
        (NumberInput_Internal.prototype._onKeydown = function (t) {
          var e = (this._keyCode = t.keyCode);
          if (13 == e) return this._onFinish(), void t.preventDefault();
          var i = this._input,
            n = i.getProperty('value'),
            s = i.getProperty('selectionStart'),
            o = i.getProperty('selectionEnd'),
            l = n.length,
            d = 8 == e || 45 == e,
            p = t.metaKey,
            u = t.ctrlKey,
            _ = 37 == e,
            c = _ || 39 == e,
            v = t.shiftKey,
            g = 38 == e || 40 == e,
            y = (p || u) && 65 == e,
            f = s != o,
            E = 0 == s && o == l,
            S = 189 == e,
            C = n.indexOf('.');
          if (((this._caretOffset = 0), (!p && !u) || 90 != e)) {
            if (y) return r(i), void t.preventDefault();
            if (E)
              return (
                S ? (h(i, '-0'), a(i, 1)) : (h(i, d ? 0 : String.fromCharCode(e)), a(i, _ ? s : o)),
                void t.preventDefault()
              );
            if (!d || s - 1 != C) {
              if (!c && '0' == n[0] && 1 == s) return a(i, 1), void (this._caretOffset = 1);
              if (g) {
                var b = (v ? 10 : 1) * this._valueStep,
                  m = 38 == e ? 1 : -1;
                return h(i, Number(n) + b * m), a(i, s), void t.preventDefault();
              }
              return !f || (v && c)
                ? !v && !c && !d && s > C && s < l
                  ? (h(i, (n = n.substr(0, s) + String.fromCharCode(e) + n.substr(s + 1, l - 1))),
                    a(i, Math.min(s + 1, l - 1)),
                    void t.preventDefault())
                  : void (!d && !c && !g && s >= l && t.preventDefault())
                : (c
                    ? a(i, _ ? s : o)
                    : (h(i, (n = n.substr(0, s) + String.fromCharCode(e) + n.substr(o, l - o))),
                      a(i, o)),
                  void t.preventDefault());
            }
            a(i, s - 1);
          } else t.preventDefault();
        }),
        (NumberInput_Internal.prototype.getValue = function () {
          return this._value;
        }),
        (NumberInput_Internal.prototype.setValue = function (t) {
          this._setValue(t);
        }),
        (NumberInput_Internal.prototype.getNode = function () {
          return this._input;
        }),
        (t.exports = NumberInput_Internal);
    },
    91724: (t, e, i) => {
      var n = i(35992);
      function s(t, e, i, s) {
        ((s = s || {}).dp = s.dp || 2), n.apply(this, arguments), (this._valueDp = s.dp + 1);
      }
      (s.prototype = Object.create(n.prototype)),
        (s.prototype.constructor = s),
        (s.prototype._setValue = function () {
          if (!this._parent.isDisabled()) {
            var t,
              e,
              i = this._obj[this._key],
              n = this._textArea,
              s = this._valueDp;
            if (
              'object' != typeof i ||
              'number' != typeof i.length ||
              'function' != typeof i.splice ||
              i.propertyIsEnumerable('length')
            )
              (t = (e = i.toString()).indexOf('.')),
                n.setProperty('value', t > 0 ? e.slice(0, t + s) : e);
            else {
              e = i.slice();
              for (var o, a = -1, r = this._wrap; ++a < e.length; )
                (t = (o = e[a] = e[a].toString()).indexOf('.')) > 0 && (e[a] = o.slice(0, t + s));
              r && (n.setStyleProperty('white-space', 'nowrap'), (e = e.join('\n'))),
                n.setProperty('value', e);
            }
          }
        }),
        (t.exports = s);
    },
    83211: (t, e, i) => {
      var n = i(70858),
        s = i(69819),
        o = i(81231),
        a = i(13424),
        r = i(89433),
        h = i(21074),
        l = i(35226);
      function d(t) {
        this._parenNode = t;
        var e = (this._node = new n()),
          i = (this._listNode = new n(n.LIST));
        e.setStyleClass(a.Options),
          e.addChild(i),
          (this._selectedIndex = null),
          (this._callbackOut = function () {}),
          (this._unfocusable = !1),
          document.addEventListener(s.MOUSE_DOWN, this._onDocumentMouseDown.bind(this)),
          document.addEventListener(s.MOUSE_UP, this._onDocumentMouseUp.bind(this)),
          this.clear();
      }
      (d.prototype = {
        _onDocumentMouseDown: function () {
          this._unfocusable && this._callbackOut();
        },
        _onDocumentMouseUp: function () {
          this._unfocusable = !0;
        },
        build: function (t, e, i, s, d, p, u, _) {
          this._clearList(), this._parenNode.addChild(this.getNode());
          var c = this._node,
            v = this._listNode;
          p = p || 0;
          var g,
            y,
            f,
            E,
            S = this,
            C = -1;
          if (u)
            for (_ = _ || r.HEX, v.setStyleClass(a.Color); ++C < t.length; ) {
              switch (
                ((y = t[C]), (f = (g = v.addChild(new n(n.LIST_ITEM))).addChild(new n())), _)
              ) {
                case r.HEX:
                  E = y;
                  break;
                case r.RGB:
                  E = h.RGB2HEX(y[0], y[1], y[2]);
                  break;
                case r.RGBfv:
                  E = h.RGBfv2HEX(y[0], y[1], y[2]);
                  break;
                case r.HSV:
                  E = h.HSV2RGB(y[0], y[1], y[2]);
              }
              (f.getStyle().backgroundColor = E),
                (f.getStyle().backgroundImage =
                  'linear-gradient( rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%)'),
                f.setProperty('innerHTML', y),
                y == e && g.setStyleClass(a.OptionsSelected),
                g.addEventListener(o.MOUSE_DOWN, function () {
                  (S._selectedIndex = Array.prototype.indexOf.call(this.parentNode.children, this)),
                    s();
                });
            }
          else
            for (v.deleteStyleClass(); ++C < t.length; )
              (y = t[C]),
                (g = v.addChild(new n(n.LIST_ITEM))).setProperty('innerHTML', y),
                y == e && g.setStyleClass(a.OptionsSelected),
                g.addEventListener(o.MOUSE_DOWN, function () {
                  (S._selectedIndex = Array.prototype.indexOf.call(this.parentNode.children, this)),
                    s();
                });
          var b = i.getPositionGlobal(),
            m = i.getWidth() - p,
            w = i.getHeight(),
            P = v.getWidth(),
            M = v.getHeight(),
            H = 2 * l.STROKE_SIZE,
            N = l.PADDING_OPTIONS,
            L = (P < m ? m : P) - H,
            O = b[0],
            A = b[1] + w - N,
            I = O + L > window.innerWidth ? O - L + m - H : O,
            G = A + M > window.innerHeight ? A - 0.5 * M - 0.5 * w : A;
          v.setWidth(L),
            c.setPositionGlobal(I, G),
            (this._callbackOut = d),
            (this._unfocusable = !1);
        },
        _clearList: function () {
          this._listNode.removeAllChildren(),
            this._listNode.deleteStyleProperty('width'),
            (this._selectedIndex = null),
            (this._build = !1);
        },
        clear: function () {
          this._clearList(),
            (this._callbackOut = function () {}),
            this._parenNode.removeChild(this.getNode());
        },
        isBuild: function () {
          return this._build;
        },
        getNode: function () {
          return this._node;
        },
        getSelectedIndex: function () {
          return this._selectedIndex;
        },
      }),
        (d.setup = function (t) {
          return (d._instance = new d(t));
        }),
        (d.get = function () {
          return d._instance;
        }),
        (d.destroy = function () {
          d._instance = null;
        }),
        (t.exports = d);
    },
    35992: (t, e, i) => {
      var n = i(32884),
        s = i(70858),
        o = i(13424),
        a = i(35226),
        r = i(59574),
        h = i(47261),
        l = i(69819),
        d = i(81231),
        p = i(33925);
      function u(t, e, i, h) {
        n.apply(this, arguments),
          ((h = h || {}).height = h.height || null),
          (h.wrap = void 0 !== h.wrap && h.wrap),
          (h.update = void 0 === h.update || h.update),
          (this._wrap = h.wrap),
          (this._update = h.update);
        var l = (this._textArea = new s(s.TEXTAREA)),
          u = this._wrapNode,
          _ = this._node;
        if (
          (l.setProperty('readOnly', !0),
          u.addChild(l),
          l.addEventListener(d.MOUSE_DOWN, this._onInputDragStart.bind(this)),
          this.addEventListener(p.INPUT_SELECT_DRAG, this._parent, 'onComponentSelectDrag'),
          h.height)
        ) {
          var c = new s();
          c.setStyleClass(o.TextAreaWrap), c.addChild(l), u.addChild(c);
          var v = (this._height = h.height),
            g = 4;
          l.setHeight(Math.max(v + g, a.COMPONENT_MIN_HEIGHT)),
            u.setHeight(l.getHeight()),
            _.setHeight(u.getHeight() + g),
            (this._scrollBar = new r(c, l, v - g));
        }
        h.wrap && l.setStyleProperty('white-space', 'pre-wrap'),
          (this._prevString = ''),
          (this._prevScrollHeight = -1),
          this._setValue();
      }
      (u.prototype = Object.create(n.prototype)),
        (u.prototype.constructor = u),
        (u.prototype._setValue = function () {}),
        (u.prototype.onValueUpdate = function () {
          this._setValue();
        }),
        (u.prototype.update = function () {
          this._update && this._setValue();
        }),
        (u.prototype._onDrag = function () {
          this.dispatchEvent(new h(this, p.INPUT_SELECT_DRAG, null));
        }),
        (u.prototype._onDragFinish = function () {
          this.dispatchEvent(new h(this, p.INPUT_SELECT_DRAG, null)),
            document.removeEventListener(l.MOUSE_MOVE, this._onDrag, !1),
            document.removeEventListener(l.MOUSE_MOVE, this._onDragFinish, !1);
        }),
        (u.prototype._onInputDragStart = function () {
          this.dispatchEvent(new h(this, p.INPUT_SELECT_DRAG, null)),
            document.addEventListener(l.MOUSE_MOVE, this._onDrag.bind(this), !1),
            document.addEventListener(l.MOUSE_UP, this._onDragFinish.bind(this), !1);
        }),
        (t.exports = u);
    },
    75239: (t, e, i) => {
      var n = i(78427),
        s = i(36177),
        o = i(47261),
        a = i(69819),
        r = i(33925),
        h = [-1, 1],
        l = [-1, 1];
      function d(t, e, i, s) {
        n.apply(this, arguments),
          ((s = s || {}).boundsX = s.boundsX || h),
          (s.boundsY = s.boundsY || l),
          (s.labelX = s.labelX || ''),
          (s.labelY = s.labelY || ''),
          (s.showCross = s.showCross || !0),
          (this._onChange = s.onChange || this._onChange),
          (this._onFinish = s.onFinish || function () {}),
          (this._boundsX = s.boundsX),
          (this._boundsY = s.boundsY),
          (this._labelAxisX = '' != s.labelX && 'none' != s.labelX ? s.labelX : null),
          (this._labelAxisY = '' != s.labelY && 'none' != s.labelY ? s.labelY : null);
        var o = this._path;
        (o.style.strokeWidth = 1),
          (o.style.stroke = '#363c40'),
          (this._grid.style.stroke = 'rgb(25,25,25)'),
          (this._svgPos = [0, 0]);
        var r = (this._handle = this._svgRoot.appendChild(this._createSVGObject('g'))),
          d = r.appendChild(this._createSVGObject('circle'));
        d.setAttribute('r', String(11)), d.setAttribute('fill', 'rgba(0,0,0,0.05)');
        var p = r.appendChild(this._createSVGObject('circle'));
        p.setAttribute('r', String(10)), p.setAttribute('fill', 'rgb(83,93,98)');
        var u = r.appendChild(this._createSVGObject('circle'));
        u.setAttribute('r', String(9)),
          u.setAttribute('fill', 'rgb(57,69,76)'),
          u.setAttribute('cy', String(0.75));
        var _ = r.appendChild(this._createSVGObject('circle'));
        _.setAttribute('r', String(10)),
          _.setAttribute('stroke', 'rgb(17,19,20)'),
          _.setAttribute('stroke-width', String(1)),
          _.setAttribute('fill', 'none');
        var c = r.appendChild(this._createSVGObject('circle'));
        c.setAttribute('r', String(6)), c.setAttribute('fill', 'rgb(30,34,36)');
        var v = r.appendChild(this._createSVGObject('circle'));
        v.setAttribute('r', String(3)),
          v.setAttribute('fill', 'rgb(255,255,255)'),
          r.setAttribute('tranform', 'translate(0 0)'),
          this._svg.addEventListener(a.MOUSE_DOWN, this._onDragStart.bind(this), !1),
          this._drawValue(this._obj[this._key]);
      }
      (d.prototype = Object.create(n.prototype)),
        (d.prototype.constructor = d),
        (d.prototype._onDragStart = function () {
          var t = this._svgPos;
          (t[0] = 0), (t[1] = 0);
          for (var e = this._svg.parentNode; e; )
            (t[0] += e.offsetLeft), (t[1] += e.offsetTop), (e = e.offsetParent);
          var i = a.MOUSE_MOVE,
            n = a.MOUSE_UP,
            s = function () {
              this._drawValueInput(), this.applyValue(), this._onChange();
            }.bind(this),
            o = function () {
              this.pushHistoryState(),
                this._drawValueInput(),
                this.applyValue(),
                this._onFinish(),
                document.removeEventListener(i, s, !1),
                document.removeEventListener(n, o, !1);
            }.bind(this);
          document.addEventListener(i, s, !1),
            document.addEventListener(n, o, !1),
            this._drawValueInput(),
            this.applyValue(),
            this._onChange();
        }),
        (d.prototype._redraw = function () {
          this._drawValue(this._obj[this._key]);
        }),
        (d.prototype._drawValueInput = function () {
          this._drawValue(this._getMouseNormalized());
        }),
        (d.prototype._drawValue = function (t) {
          (this._obj[this._key] = t), this._drawGrid(), this._drawPoint();
        }),
        (d.prototype._drawGrid = function () {
          var t = Number(this._svg.getAttribute('width')),
            e = Math.floor(0.5 * t),
            i = Math.floor(0.5 * t),
            n = '';
          (n += this._pathCmdLine(0, i, t, i)),
            (n += this._pathCmdLine(e, 0, e, t)),
            this._grid.setAttribute('d', n);
        }),
        (d.prototype._drawPoint = function () {
          var t = Number(this._svg.getAttribute('width')),
            e = this._obj[this._key],
            i = (0.5 + 0.5 * e[0]) * t,
            n = (0.5 + 0.5 * -e[1]) * t,
            s = '';
          (s += this._pathCmdLine(0, n, t, n)),
            (s += this._pathCmdLine(i, 0, i, t)),
            this._path.setAttribute('d', s),
            this._handle.setAttribute('transform', 'translate(' + i + ' ' + n + ')');
        }),
        (d.prototype._getMouseNormalized = function () {
          var t = this._svgPos,
            e = s.get().getPosition(),
            i = Number(this._svg.getAttribute('width'));
          return [
            (Math.max(0, Math.min(e[0] - t[0], i)) / i) * 2 - 1,
            1 - (Math.max(0, Math.min(e[1] - t[1], i)) / i) * 2,
          ];
        }),
        (d.prototype.applyValue = function () {
          this.dispatchEvent(new o(this, r.VALUE_UPDATED, null));
        }),
        (d.prototype.onValueUpdate = function (t) {
          t.data.origin != this && this._drawValue(this._obj[this._key]);
        }),
        (t.exports = d);
    },
    66716: (t, e, i) => {
      var n = i(70858),
        s = i(13424),
        o = i(36735),
        a = i(36177),
        r = i(21074),
        h = i(69819),
        l = i(81231);
      function d(t) {
        var e = (this._node = new n().setStyleClass(s.Picker)),
          i = (this._headNode = new n().setStyleClass(s.Head)),
          a = new n().setStyleClass(s.Wrap),
          r = new n().setStyleClass(s.Label),
          h = new n().setStyleClass(s.Menu),
          d = new n().setStyleClass(s.Wrap),
          p = new n(n.INPUT_BUTTON);
        p.setStyleClass(s.ButtonMenuClose);
        var u = new n().setStyleClass(s.PickerFieldWrap),
          _ = new n().setStyleClass(s.SliderWrap),
          c = new n().setStyleClass(s.PickerInputWrap),
          v = (this._canvasField = document.createElement('canvas')),
          g = (this._canvasSlider = document.createElement('canvas'));
        u.getElement().appendChild(v),
          _.getElement().appendChild(g),
          this._setSizeCanvasField(154, 154),
          this._setSizeCanvasSlider(14, 154);
        var y = (this._contextCanvasField = v.getContext('2d')),
          f = (this._contextCanvasSlider = g.getContext('2d')),
          E = (this._handleField = new n());
        E.setStyleClass(s.PickerHandleField);
        var S = (this._handleSlider = new n());
        S.setStyleClass(s.PickerHandleSlider);
        var C = this._onInputHueChange.bind(this),
          b = this._onInputSatChange.bind(this),
          m = this._onInputValChange.bind(this),
          w = this._onInputRChange.bind(this),
          P = this._onInputGChange.bind(this),
          M = this._onInputBChange.bind(this),
          H = (this._inputHue = new o(1, 0, null, C)),
          N = (this._inputSat = new o(1, 0, null, b)),
          L = (this._inputVal = new o(1, 0, null, m)),
          O = (this._inputR = new o(1, 0, null, w)),
          A = (this._inputG = new o(1, 0, null, P)),
          I = (this._inputB = new o(1, 0, null, M)),
          G = new n().setStyleClass(s.PickerControlsWrap),
          T = new n(n.INPUT_BUTTON).setStyleClass(s.Button).setProperty('value', 'pick'),
          D = new n(n.INPUT_BUTTON).setStyleClass(s.Button).setProperty('value', 'cancel'),
          U = new n().setStyleClass(s.PickerColorContrast),
          V = (this._colorCurrNode = new n()),
          x = (this._colorPrevNode = new n());
        U.addChild(V),
          U.addChild(x),
          G.addChild(D),
          G.addChild(T),
          G.addChild(U),
          this._setContrasPrevColor(0, 0, 0);
        var B = new n().setStyleClass(s.PickerInputField),
          R = new n().setStyleClass(s.PickerInputField),
          W = new n().setStyleClass(s.PickerInputField),
          k = new n(n.SPAN).setStyleClass(s.Label).setProperty('innerHTML', 'H'),
          F = new n(n.SPAN).setStyleClass(s.Label).setProperty('innerHTML', 'S'),
          j = new n(n.SPAN).setStyleClass(s.Label).setProperty('innerHTML', 'V');
        B.addChildren(k, H.getNode()), R.addChildren(F, N.getNode()), W.addChildren(j, L.getNode());
        var X = new n().setStyleClass(s.PickerInputField),
          z = new n().setStyleClass(s.PickerInputField),
          Y = new n().setStyleClass(s.PickerInputField),
          K = new n(n.SPAN).setStyleClass(s.Label).setProperty('innerHTML', 'R'),
          Z = new n(n.SPAN).setStyleClass(s.Label).setProperty('innerHTML', 'G'),
          $ = new n(n.SPAN).setStyleClass(s.Label).setProperty('innerHTML', 'B');
        X.addChildren(K, O.getNode()),
          z.addChildren(Z, A.getNode()),
          Y.addChildren($, I.getNode()),
          c.addChildren(X, B, z, R, Y, W, U);
        var J = new n();
        J.setStyleClass(s.PickerInputWrap);
        var Q = (this._inputHEX = new n(n.INPUT_TEXT)),
          q = new n().setStyleClass(s.PickerInputField),
          tt = new n(n.SPAN).setStyleClass(s.Label);
        tt.setProperty('innerHTML', '#'),
          q.addChildren(tt, Q),
          J.addChild(q),
          Q.addEventListener(l.CHANGE, this._onInputHEXFinish.bind(this)),
          r.setProperty('innerHTML', 'Color Picker'),
          h.addChild(p),
          i.addChild(h),
          a.addChild(r),
          i.addChild(a),
          e.addChild(i),
          e.addChild(d),
          d.addChild(u),
          d.addChild(_),
          d.addChild(c),
          d.addChild(J),
          d.addChild(G),
          u.addChild(E),
          _.addChild(S);
        var et = l.MOUSE_DOWN,
          it = this._onCanvasFieldMouseDown.bind(this);
        u.addEventListener(et, it),
          E.addEventListener(et, it),
          (it = this._onCanvasSliderMouseDown.bind(this)),
          _.addEventListener(et, it),
          S.addEventListener(et, it),
          p.addEventListener(et, this._onClose.bind(this)),
          T.addEventListener(et, this._onPick.bind(this)),
          D.addEventListener(et, this._onClose.bind(this)),
          i.addEventListener(l.MOUSE_DOWN, this._onHeadDragStart.bind(this)),
          (this._parentNode = t),
          (this._mouseOffset = [0, 0]),
          (this._position = [null, null]),
          (this._canvasSliderPos = [0, 0]),
          (this._canvasFieldPos = [0, 0]),
          (this._handleFieldSize = 12),
          (this._handleSliderHeight = 7),
          (this._imageDataSlider = f.createImageData(g.width, g.height)),
          (this._imageDataField = y.createImageData(v.width, v.height)),
          (this._valueHueMinMax = [0, 360]),
          (this._valueSatMinMax = this._valueValMinMax = [0, 100]),
          (this._valueRGBMinMax = [0, 255]),
          (this._valueHue = 200),
          (this._valueSat = 50),
          (this._valueVal = 50),
          (this._valueR = 0),
          (this._valueG = 0),
          (this._valueB = 0),
          (this._valueHEX = '#000000'),
          (this._valueHEXValid = this._valueHEX),
          (this._callbackPick = function () {}),
          this._drawCanvasField(),
          this._drawCanvasSlider(),
          this._setColorHSV(this._valueHue, this._valueSat, this._valueVal),
          this._updateColorRGBFromHSV(),
          this._updateColorHEXFromRGB(),
          this._updateHandles();
      }
      (d.prototype = {
        _drawHandleField: function () {
          var t = this._canvasField,
            e = this._canvasFieldPos,
            i = a.get().getPosition(),
            n = Math.max(0, Math.min(i[0] - e[0], t.width)),
            s = Math.max(0, Math.min(i[1] - e[1], t.height)),
            o = n / t.width,
            r = s / t.height,
            h = Math.round(o * this._valueSatMinMax[1]),
            l = Math.round((1 - r) * this._valueValMinMax[1]);
          this._setColorHSV(this._valueHue, h, l),
            this._updateColorRGBFromHSV(),
            this._updateColorHEXFromRGB(),
            this._updateHandleField();
        },
        _updateHandleField: function () {
          var t = this._canvasField.width,
            e = this._canvasField.height,
            i = 0.25 * this._handleFieldSize,
            n = this._valueSat / this._valueSatMinMax[1],
            s = this._valueVal / this._valueValMinMax[1];
          this._handleField.setPositionGlobal(n * t - i, (1 - s) * e - i);
        },
        _drawHandleSlider: function () {
          var t = this._canvasSlider,
            e = this._canvasSliderPos[1],
            i = a.get().getY(),
            n = Math.max(0, Math.min(i - e, t.height)) / t.height,
            s = Math.floor((1 - n) * this._valueHueMinMax[1]);
          this._setColorHSV(s, this._valueSat, this._valueVal),
            this._updateColorRGBFromHSV(),
            this._updateColorHEXFromRGB(),
            this._updateHandleSlider();
        },
        _updateHandleSlider: function () {
          var t = this._canvasSlider.height,
            e = 0.25 * this._handleSliderHeight,
            i = this._valueHue / this._valueHueMinMax[1];
          this._handleSlider.setPositionGlobalY((t - e) * (1 - i));
        },
        _updateHandles: function () {
          this._updateHandleField(), this._updateHandleSlider();
        },
        _setHue: function (t) {
          var e = this._valueHueMinMax;
          (this._valueHue = t == e[1] ? e[0] : t), this._updateColorHSV(), this._drawCanvasField();
        },
        _setSat: function (t) {
          (this._valueSat = Math.round(t)), this._updateColorHSV();
        },
        _setVal: function (t) {
          (this._valueVal = Math.round(t)), this._updateColorHSV();
        },
        _setR: function (t) {
          (this._valueR = Math.round(t)), this._updateColorRGB();
        },
        _setG: function (t) {
          (this._valueG = Math.round(t)), this._updateColorRGB();
        },
        _setB: function (t) {
          (this._valueB = Math.round(t)), this._updateColorRGB();
        },
        _onInputHueChange: function () {
          var t = this._inputHue,
            e = this._getValueContrained(t, this._valueHueMinMax),
            i = this._valueHueMinMax;
          e == i[1] && ((e = i[0]), t.setValue(e)),
            this._setHue(e),
            this._updateColorRGBFromHSV(),
            this._updateColorHEXFromRGB(),
            this._updateHandleSlider(),
            this._drawCanvasField();
        },
        _onInputSatChange: function () {
          this._setSat(this._getValueContrained(this._inputSat, this._valueSatMinMax)),
            this._onInputSVChange();
        },
        _onInputValChange: function () {
          this._setVal(this._getValueContrained(this._inputVal, this._valueValMinMax)),
            this._onInputSVChange();
        },
        _onInputRChange: function () {
          this._setR(this._getValueContrained(this._inputR, this._valueRGBMinMax)),
            this._onInputRGBChange();
        },
        _onInputGChange: function () {
          this._setG(this._getValueContrained(this._inputG, this._valueRGBMinMax)),
            this._onInputRGBChange();
        },
        _onInputBChange: function () {
          this._setB(this._getValueContrained(this._inputB, this._valueRGBMinMax)),
            this._onInputRGBChange();
        },
        _onInputHEXFinish: function () {
          var t = this._inputHEX,
            e = t.getProperty('value');
          r.isValidHEX(e)
            ? ((this._valueHEX = this._valueHEXValid = e), this._updateColorFromHEX())
            : t.setProperty('value', this._valueHEXValid);
        },
        _onInputSVChange: function () {
          this._updateColorRGBFromHSV(), this._updateColorHEXFromRGB(), this._updateHandleField();
        },
        _onInputRGBChange: function () {
          this._updateColorHSVFromRGB(), this._updateColorHEXFromRGB(), this._updateHandles();
        },
        _getValueContrained: function (t, e) {
          var i = Math.round(t.getValue()),
            n = e[0],
            s = e[1];
          return i <= n && ((i = n), t.setValue(i)), i >= s && ((i = s), t.setValue(i)), i;
        },
        _updateInputHue: function () {
          this._inputHue.setValue(this._valueHue);
        },
        _updateInputSat: function () {
          this._inputSat.setValue(this._valueSat);
        },
        _updateInputVal: function () {
          this._inputVal.setValue(this._valueVal);
        },
        _updateInputR: function () {
          this._inputR.setValue(this._valueR);
        },
        _updateInputG: function () {
          this._inputG.setValue(this._valueG);
        },
        _updateInputB: function () {
          this._inputB.setValue(this._valueB);
        },
        _updateInputHEX: function () {
          this._inputHEX.setProperty('value', this._valueHEX);
        },
        _setColorHSV: function (t, e, i) {
          (this._valueHue = t),
            (this._valueSat = e),
            (this._valueVal = i),
            this._updateInputHue(),
            this._updateInputSat(),
            this._updateInputVal(),
            this._updateContrastCurrColor();
        },
        _setColorRGB: function (t, e, i) {
          (this._valueR = t),
            (this._valueG = e),
            (this._valueB = i),
            this._updateInputR(),
            this._updateInputG(),
            this._updateInputB(),
            this._updateContrastCurrColor();
        },
        _setColorHEX: function (t) {
          (this._valueHEX = t), this._updateInputHEX();
        },
        _updateColorHSV: function () {
          this._setColorHSV(this._valueHue, this._valueSat, this._valueVal),
            this._updateContrastCurrColor();
        },
        _updateColorRGB: function () {
          this._setColorRGB(this._valueR, this._valueG, this._valueB),
            this._updateContrastCurrColor();
        },
        _updateColorHSVFromRGB: function () {
          var t = r.RGB2HSV(this._valueR, this._valueG, this._valueB);
          this._setColorHSV(t[0], t[1], t[2]);
        },
        _updateColorRGBFromHSV: function () {
          var t = r.HSV2RGB(this._valueHue, this._valueSat, this._valueVal);
          this._setColorRGB(t[0], t[1], t[2]);
        },
        _updateColorHEXFromRGB: function () {
          var t = r.RGB2HEX(this._valueR, this._valueG, this._valueB);
          this._setColorHEX(t);
        },
        _updateColorFromHEX: function () {
          var t = r.HEX2RGB(this._valueHEX);
          this._setColorRGB(t[0], t[1], t[2]), this._updateColorHSVFromRGB(), this._updateHandles();
        },
        _updateContrastCurrColor: function () {
          this._setContrastCurrColor(this._valueR, this._valueG, this._valueB);
        },
        _updateContrastPrevColor: function () {
          this._setContrasPrevColor(this._valueR, this._valueG, this._valueB);
        },
        _setContrastCurrColor: function (t, e, i) {
          this._colorCurrNode.setStyleProperty('background', 'rgb(' + t + ',' + e + ',' + i + ')');
        },
        _setContrasPrevColor: function (t, e, i) {
          this._colorPrevNode.setStyleProperty('background', 'rgb(' + t + ',' + e + ',' + i + ')');
        },
        _onHeadDragStart: function () {
          var t = this._node,
            e = this._parentNode,
            i = t.getPositionGlobal(),
            n = a.get().getPosition(),
            s = this._mouseOffset;
          (s[0] = n[0] - i[0]), (s[1] = n[1] - i[1]);
          var o = h.MOUSE_MOVE,
            r = h.MOUSE_UP,
            l = this,
            d = function () {
              l._updatePosition(), l._updateCanvasNodePositions();
            },
            p = function () {
              l._updateCanvasNodePositions(),
                document.removeEventListener(o, d, !1),
                document.removeEventListener(r, p, !1);
            };
          e.removeChild(t),
            e.addChild(t),
            document.addEventListener(o, d, !1),
            document.addEventListener(r, p, !1),
            this._updateCanvasNodePositions();
        },
        _updatePosition: function () {
          var t = a.get().getPosition(),
            e = this._mouseOffset,
            i = t[0] - e[0],
            n = t[1] - e[1],
            s = this._node,
            o = this._headNode,
            r = this._position,
            h = window.innerWidth - s.getWidth(),
            l = window.innerHeight - o.getHeight();
          (r[0] = Math.max(0, Math.min(i, h))),
            (r[1] = Math.max(0, Math.min(n, l))),
            s.setPositionGlobal(r[0], r[1]);
        },
        _drawCanvasField: function () {
          for (
            var t,
              e = this._canvasField,
              i = this._contextCanvasField,
              n = e.width,
              s = e.height,
              o = 1 / n,
              a = 1 / s,
              h = this._imageDataField,
              l = [],
              d = 0,
              p = this._valueHue,
              u = -1;
            ++u < s;

          )
            for (t = -1; ++t < n; )
              (l = r.HSV2RGB(p, t * o * 100, 100 * (1 - u * a))),
                (d = 4 * (u * n + t)),
                (h.data[d] = l[0]),
                (h.data[d + 1] = l[1]),
                (h.data[d + 2] = l[2]),
                (h.data[d + 3] = 255);
          i.putImageData(h, 0, 0);
        },
        _drawCanvasSlider: function () {
          for (
            var t,
              e = this._canvasSlider,
              i = this._contextCanvasSlider,
              n = e.width,
              s = e.height,
              o = 1 / s,
              a = this._imageDataSlider,
              h = [],
              l = 0,
              d = -1;
            ++d < s;

          )
            for (t = -1; ++t < n; )
              (h = r.HSV2RGB(360 * (1 - d * o), 100, 100)),
                (l = 4 * (d * n + t)),
                (a.data[l] = h[0]),
                (a.data[l + 1] = h[1]),
                (a.data[l + 2] = h[2]),
                (a.data[l + 3] = 255);
          i.putImageData(a, 0, 0);
        },
        _onCanvasFieldMouseDown: function () {
          var t = h.MOUSE_MOVE,
            e = h.MOUSE_UP,
            i = this,
            n = function () {
              i._drawHandleField();
            },
            s = function () {
              document.removeEventListener(t, n, !1), document.removeEventListener(e, s, !1);
            };
          document.addEventListener(t, n, !1),
            document.addEventListener(e, s, !1),
            i._drawHandleField();
        },
        _onCanvasSliderMouseDown: function () {
          var t = h.MOUSE_MOVE,
            e = h.MOUSE_UP,
            i = this,
            n = function () {
              i._drawHandleSlider(), i._drawCanvasField();
            },
            s = function () {
              document.removeEventListener(t, n, !1),
                document.removeEventListener(e, s, !1),
                i._drawCanvasField();
            };
          document.addEventListener(t, n, !1),
            document.addEventListener(e, s, !1),
            i._drawHandleSlider(),
            i._drawCanvasField();
        },
        _setSizeCanvasField: function (t, e) {
          var i = this._canvasField;
          (i.style.width = t + 'px'), (i.style.height = e + 'px'), (i.width = t), (i.height = e);
        },
        _setSizeCanvasSlider: function (t, e) {
          var i = this._canvasSlider;
          (i.style.width = t + 'px'), (i.style.height = e + 'px'), (i.width = t), (i.height = e);
        },
        open: function () {
          var t = this._node;
          this._parentNode.addChild(t);
          var e = this._position;
          null === e[0] || null === e[1]
            ? ((e[0] = 0.5 * window.innerWidth - 0.5 * t.getWidth()),
              (e[1] = 0.5 * window.innerHeight - 0.5 * t.getHeight()))
            : ((e[0] = Math.max(0, Math.min(e[0], window.innerWidth - t.getWidth()))),
              (e[1] = Math.max(0, Math.min(e[1], window.innerHeight - t.getHeight())))),
            t.setPositionGlobal(e[0], e[1]),
            this._updateCanvasNodePositions();
        },
        close: function () {
          this._parentNode.removeChild(this._node);
        },
        _onClose: function (t) {
          (t.cancelBubble = !0), this.close();
        },
        _onPick: function () {
          this._callbackPick(), this.close();
        },
        _updateCanvasNodePositions: function () {
          var t = this._canvasSliderPos,
            e = this._canvasFieldPos;
          (t[0] = t[1] = 0), (e[0] = e[1] = 0);
          for (var i = this._canvasSlider; i; )
            (t[0] += i.offsetLeft), (t[1] += i.offsetTop), (i = i.offsetParent);
          for (i = this._canvasField; i; )
            (e[0] += i.offsetLeft), (e[1] += i.offsetTop), (i = i.offsetParent);
        },
        setCallbackPick: function (t) {
          this._callbackPick = t;
        },
        setColorHEX: function (t) {
          this._setColorHEX(t), this._updateColorFromHEX(), this._setColor();
        },
        setColorRGB: function (t, e, i) {
          this._setColorRGB(t, e, i),
            this._updateColorHEXFromRGB(),
            this._updateColorHSVFromRGB(),
            this._setColor();
        },
        setColorRGBfv: function (t, e, i) {
          this.setColorRGB(Math.floor(255 * t), Math.floor(255 * e), Math.floor(255 * i));
        },
        setColorHSV: function (t, e, i) {
          this._setColorHSV(t, e, i),
            this._updateColorRGBFromHSV(),
            this._updateColorHEXFromRGB(),
            this._setColor();
        },
        _setColor: function () {
          this._drawCanvasField(),
            this._drawCanvasSlider(),
            this._updateHandles(),
            this._setContrasPrevColor(this._valueR, this._valueG, this._valueB);
        },
        getR: function () {
          return this._valueR;
        },
        getG: function () {
          return this._valueG;
        },
        getB: function () {
          return this._valueB;
        },
        getRGB: function () {
          return [this._valueR, this._valueG, this._valueB];
        },
        getHue: function () {
          return this._valueHue;
        },
        getSat: function () {
          return this._valueSat;
        },
        getVal: function () {
          return this._valueVal;
        },
        getHSV: function () {
          return [this._valueHue, this._valueSat, this._valueVal];
        },
        getHEX: function () {
          return this._valueHEX;
        },
        getRGBfv: function () {
          return [this._valueR / 255, this._valueG / 255, this._valueB / 255];
        },
        getNode: function () {
          return this._node;
        },
      }),
        (d.setup = function (t) {
          return (d._instance = new d(t));
        }),
        (d.get = function () {
          return d._instance;
        }),
        (d.destroy = function () {
          d._instance = null;
        }),
        (t.exports = d);
    },
    78427: (t, e, i) => {
      var n = i(24968);
      function s(t, e, i, s) {
        ((s = s || {}).lineWidth = s.lineWidth || 2),
          (s.lineColor = s.lineColor || [255, 255, 255]),
          n.apply(this, arguments);
        var o = (this._lineWidth = s.lineWidth),
          a = s.lineColor,
          r = (this._grid = this._svgRoot.appendChild(this._createSVGObject('path')));
        r.style.stroke = 'rgb(26,29,31)';
        var h = (this._path = this._svgRoot.appendChild(this._createSVGObject('path')));
        (h.style.stroke = 'rgb(' + a[0] + ',' + a[1] + ',' + a[2] + ')'),
          (h.style.strokeWidth = o),
          (h.style.fill = 'none');
      }
      (s.prototype = Object.create(n.prototype)), (s.prototype.constructor = s), (t.exports = s);
    },
    89239: (t, e, i) => {
      var n = i(32884),
        s = i(70858),
        o = i(36735),
        a = i(13424),
        r = i(47261),
        h = i(33925);
      function l(t, e, i, r) {
        n.apply(this, arguments),
          ((r = r || {}).onChange = r.onChange || this._onChange),
          (r.step = r.step || 1),
          (r.dp = null != r.dp ? r.dp : 2),
          (this._onChange = r.onChange);
        var h = (this._step = r.step),
          l = (this._dp = r.dp),
          d = new s(),
          p = (this._inputMin = new o(
            h,
            l,
            this.pushHistoryState.bind(this),
            this._onInputMinChange.bind(this),
          )),
          u = new s(),
          _ = (this._inputMax = new o(
            h,
            l,
            this.pushHistoryState.bind(this),
            this._onInputMaxChange.bind(this),
          )),
          c = new s().setStyleClass(a.Wrap),
          v = new s().setStyleClass(a.Wrap),
          g = new s().setStyleClass(a.Wrap),
          y = new s().setStyleClass(a.Wrap);
        d.setStyleClass(a.Label).setProperty('innerHTML', 'MIN'),
          u.setStyleClass(a.Label).setProperty('innerHTML', 'MAX');
        var f = this._obj[this._key];
        p.setValue(f[0]), _.setValue(f[1]);
        var E = this._wrapNode;
        c.addChild(d),
          v.addChild(p.getNode()),
          g.addChild(u),
          y.addChild(_.getNode()),
          E.addChild(c),
          E.addChild(v),
          E.addChild(g),
          E.addChild(y);
      }
      (l.prototype = Object.create(n.prototype)),
        (l.prototype.constructor = l),
        (l.prototype._onInputChange = function () {
          this.dispatchEvent(new r(this, h.VALUE_UPDATED, null)), this._onChange();
        }),
        (l.prototype._updateValueMin = function () {
          var t = this._obj[this._key],
            e = this._inputMin,
            i = e.getValue();
          i >= this._inputMax.getValue() ? e.setValue(t[0]) : (t[0] = i);
        }),
        (l.prototype._updateValueMax = function () {
          var t = this._obj[this._key],
            e = this._inputMax,
            i = e.getValue();
          i <= this._inputMin.getValue() ? e.setValue(t[1]) : (t[1] = i);
        }),
        (l.prototype.onValueUpdate = function (t) {
          if (t.data.origin != this) {
            t.data.origin;
            var e = this._obj,
              i = this._key;
            this._inputMin.setValue(e[i][0]), this._inputMax.setValue(e[i][1]);
          }
        }),
        (l.prototype.setValue = function (t) {
          var e = this._obj,
            i = this._key;
          (e[i][0] = t[0]),
            (e[i][1] = t[1]),
            this.dispatchEvent(new r(this, h.VALUE_UPDATED, null));
        }),
        (l.prototype._onInputMinChange = function () {
          this._updateValueMin(), this._onInputChange();
        }),
        (l.prototype._onInputMaxChange = function () {
          this._updateValueMax(), this._onInputChange();
        }),
        (t.exports = l);
    },
    50060: (t, e, i) => {
      var n = i(40930),
        s = i(13424),
        o = i(35226),
        a = i(47282);
      function r(t, e) {
        n.apply(this, arguments);
        var i = this._wrapNode;
        i.setStyleClass(s.CanvasWrap);
        var o = i.getWidth(),
          r = (this._svg = this._createSVGObject('svg'));
        r.setAttribute('version', '1.2'),
          r.setAttribute('baseProfile', 'tiny'),
          r.setAttribute('preserveAspectRatio', 'true'),
          i.getElement().appendChild(r),
          this._svgSetSize(o, o),
          this._updateHeight(),
          this._node.setStyleClass(s.CanvasListItem),
          this._parent.addEventListener(a.GROUP_SIZE_CHANGE, this, 'onGroupSizeChange'),
          this.addEventListener(a.GROUP_SIZE_UPDATE, this._parent, 'onGroupSizeUpdate');
      }
      (r.prototype = Object.create(n.prototype)),
        (r.prototype.constructor = r),
        (r.prototype._updateHeight = function () {
          var t = Number(this._svg.getAttribute('height'));
          this._wrapNode.setHeight(t), this._node.setHeight(t + o.PADDING_WRAPPER);
        }),
        (r.prototype.onGroupSizeChange = function () {
          var t = this._wrapNode.getWidth();
          this._svgSetSize(t, t), this._updateHeight();
        }),
        (r.prototype._svgSetSize = function (t, e) {
          var i = this._svg;
          i.setAttribute('width', t),
            i.setAttribute('height', e),
            i.setAttribute('viewbox', '0 0 ' + t + ' ' + e);
        }),
        (r.prototype.getSVG = function () {
          return this._svg;
        }),
        (t.exports = r);
    },
    24968: (t, e, i) => {
      var n = i(32884),
        s = i(13424),
        o = i(47282),
        a = i(35226);
      function r(t, e, i, a) {
        n.apply(this, arguments);
        var r = this._wrapNode;
        r.setStyleClass(s.SVGWrap);
        var h = r.getWidth(),
          l = (this._svg = this._createSVGObject('svg'));
        l.setAttribute('version', '1.2'),
          l.setAttribute('baseProfile', 'tiny'),
          r.getElement().appendChild(l);
        var d = (this._svgRoot = l.appendChild(this._createSVGObject('g')));
        d.setAttribute('transform', 'translate(0.5 0.5)'),
          this._svgSetSize(h, h),
          this._updateHeight(),
          this._node.setStyleClass(s.SVGListItem),
          this._parent.addEventListener(o.GROUP_SIZE_CHANGE, this, 'onGroupSizeChange'),
          this.addEventListener(o.GROUP_SIZE_UPDATE, this._parent, 'onGroupSizeUpdate');
      }
      (r.prototype = Object.create(n.prototype)),
        (r.prototype.constructor = r),
        (r.prototype._updateHeight = function () {
          var t = Number(this._svg.getAttribute('height'));
          this._wrapNode.setHeight(t), this._node.setHeight(t + a.PADDING_WRAPPER);
        }),
        (r.prototype._redraw = function () {}),
        (r.prototype.onGroupSizeChange = function () {
          var t = this._wrapNode.getWidth();
          this._svgSetSize(t, t), this._updateHeight(), this._redraw();
        }),
        (r.prototype._createSVGObject = function (t) {
          return document.createElementNS('http://www.w3.org/2000/svg', t);
        }),
        (r.prototype._svgSetSize = function (t, e) {
          var i = this._svg;
          i.setAttribute('width', t),
            i.setAttribute('height', e),
            i.setAttribute('viewbox', '0 0 ' + t + ' ' + e);
        }),
        (r.prototype._pathCmdMoveTo = function (t, e) {
          return 'M ' + t + ' ' + e + ' ';
        }),
        (r.prototype._pathCmdLineTo = function (t, e) {
          return 'L ' + t + ' ' + e + ' ';
        }),
        (r.prototype._pathCmdClose = function () {
          return 'Z';
        }),
        (r.prototype._pathCmdLine = function (t, e, i, n) {
          return 'M ' + t + ' ' + e + ' L ' + i + ' ' + n;
        }),
        (r.prototype._pathCmdBezierCubic = function (t, e, i, n, s, o, a, r, h) {
          return 'M ' + e + ' ' + i + ' C ' + n + ' ' + s + ', ' + o + ' ' + a + ', ' + r + ' ' + h;
        }),
        (r.prototype._pathCmdBezierQuadratic = function (t, e, i, n, s, o, a) {
          return 'M ' + e + ' ' + i + ' Q ' + n + ' ' + s + ', ' + o + ' ' + a;
        }),
        (t.exports = r);
    },
    55453: (t, e, i) => {
      var n = i(32884),
        s = i(70858),
        o = i(13424),
        a = i(83211),
        r = i(18468),
        h = i(47261),
        l = i(81231),
        d = i(33925),
        p = i(72519),
        u = i(81796),
        _ = 'Choose ...';
      function c(t, e, i, a) {
        n.apply(this, arguments),
          ((a = a || {}).onChange = a.onChange || this._onChange),
          (this._onChange = a.onChange);
        var r = this._obj,
          h = this._key,
          d = (this._targetKey = a.target),
          c = (this._values = r[h]);
        (this._selectedIndex = -1), (this._selected = null);
        var v = (this._select = new s(s.INPUT_BUTTON));
        if (
          (v.setStyleClass(o.Select),
          v.addEventListener(l.MOUSE_DOWN, this._onOptionTrigger.bind(this)),
          this._hasTarget())
        ) {
          for (var g = r[d] || '', y = -1; ++y < c.length; ) g == c[y] && (this._selected = c[y]);
          v.setProperty('value', g.toString().length > 0 ? g : c[0]);
        } else v.setProperty('value', a.selected ? c[a.selected] : _);
        this._wrapNode.addChild(v),
          u.get().addEventListener(p.TRIGGER, this, 'onOptionTrigger'),
          this.addEventListener(p.TRIGGERED, u.get(), 'onOptionTriggered');
      }
      (c.prototype = Object.create(n.prototype)),
        (c.prototype.constructor = c),
        (c.prototype.onOptionTrigger = function (t) {
          if (t.data.origin == this)
            return (
              (this._active = !this._active),
              this._updateAppearance(),
              void (this._active ? this._buildOptions() : a.get().clear())
            );
          (this._active = !1), this._updateAppearance();
        }),
        (c.prototype._buildOptions = function () {
          var t = a.get(),
            e = this;
          t.build(
            this._values,
            this._selected,
            this._select,
            function () {
              e.applyValue(),
                (e._active = !1),
                e._updateAppearance(),
                (e._selectedIndex = t.getSelectedIndex()),
                e._onChange(e._selectedIndex),
                t.clear();
            },
            function () {
              (e._active = !1), e._updateAppearance(), t.clear();
            },
            !1,
          );
        }),
        (c.prototype._applySelected = function (t) {
          this._select.setProperty('value', t),
            this.dispatchEvent(new h(this, d.VALUE_UPDATED), null);
        }),
        (c.prototype.applyValue = function () {
          var t = a.get().getSelectedIndex(),
            e = (this._selected = this._values[t]);
          this._hasTarget() && (this.pushHistoryState(), (this._obj[this._targetKey] = e)),
            this._applySelected(e);
        }),
        (c.prototype.pushHistoryState = function () {
          var t = this._obj,
            e = this._targetKey;
          r.get().pushState(t, e, t[e]);
        }),
        (c.prototype._onOptionTrigger = function () {
          this.dispatchEvent(new h(this, p.TRIGGERED, null));
        }),
        (c.prototype._updateAppearance = function () {
          this._select.setStyleClass(this._active ? o.SelectActive : o.Select);
        }),
        (c.prototype.onValueUpdate = function (t) {
          this._hasTarget() &&
            ((this._selected = this._obj[this._targetKey]),
            this._select.setProperty('value', this._selected.toString()));
        }),
        (c.prototype._hasTarget = function () {
          return null != this._targetKey;
        }),
        (c.prototype.setValue = function (t) {
          if (((this._selectedIndex = t), -1 == t))
            return (this._selected = null), void this._select.setProperty('value', _);
          (this._selected = this._values[this._selectedIndex]), this._applySelected(this._selected);
        }),
        (c.prototype.getData = function () {
          var t = {};
          return (t.selectedIndex = this._selectedIndex), t;
        }),
        (t.exports = c);
    },
    98360: (t, e, i) => {
      var n = i(32884),
        s = i(13424),
        o = i(20013),
        a = i(18468),
        r = i(89239),
        h = i(36735),
        l = i(47261),
        d = i(69819),
        p = i(32076),
        u = i(47282),
        _ = i(33925);
      function c(t, e, i, a, r) {
        ((r = r || {}).label = r.label || i),
          n.apply(this, [t, e, a, r]),
          (this._values = this._obj[this._key]),
          (this._targetKey = i),
          (r.step = r.step || 1),
          (r.dp = void 0 === r.dp || null == r.dp ? 2 : r.dp),
          (r.onChange = r.onChange || this._onChange),
          (r.onFinish = r.onFinish || function () {}),
          (this._dp = r.dp),
          (this._onChange = r.onChange),
          (this._onFinish = r.onFinish);
        var l = this._values,
          _ = this._obj,
          c = this._targetKey,
          v = this._wrapNode;
        v.setStyleClass(s.WrapSlider);
        var g = (this._slider = new o(
          v,
          this._onSliderBegin.bind(this),
          this._onSliderMove.bind(this),
          this._onSliderEnd.bind(this),
        ));
        g.setBoundMax(l[1]), g.setBoundMin(l[0]), g.setValue(_[c]);
        var y = (this._input = new h(r.step, r.dp, null, this._onInputChange.bind(this)));
        y.setValue(_[c]),
          v.addChild(y.getNode()),
          this._parent.addEventListener(p.PANEL_MOVE_END, this, 'onPanelMoveEnd'),
          this._parent.addEventListener(u.GROUP_SIZE_CHANGE, this, 'onGroupWidthChange'),
          this._parent.addEventListener(d.WINDOW_RESIZE, this, 'onWindowResize');
      }
      (c.prototype = Object.create(n.prototype)),
        (c.prototype.constructor = c),
        (c.prototype.pushHistoryState = function () {
          var t = this._obj,
            e = this._targetKey;
          a.get().pushState(t, e, t[e]);
        }),
        (c.prototype._onSliderBegin = function () {
          this.pushHistoryState();
        }),
        (c.prototype._onSliderMove = function () {
          this.applyValue(),
            this._updateValueField(),
            this.dispatchEvent(new l(this, _.VALUE_UPDATED, null)),
            this._onChange();
        }),
        (c.prototype._onSliderEnd = function () {
          this.applyValue(),
            this._updateValueField(),
            this.dispatchEvent(new l(this, _.VALUE_UPDATED, null)),
            this._onFinish();
        }),
        (c.prototype._onInputChange = function () {
          var t = this._input,
            e = this._values[0],
            i = this._values[1];
          t.getValue() >= i && t.setValue(i), t.getValue() <= e && t.setValue(e);
          var n = t.getValue();
          this._slider.setValue(n),
            (this._obj[this._targetKey] = n),
            this.dispatchEvent(new l(this, _.VALUE_UPDATED, null)),
            this._onFinish();
        }),
        (c.prototype.applyValue = function () {
          var t = this._slider.getValue();
          (this._obj[this._targetKey] = parseFloat(t.toFixed(this._dp))), this._input.setValue(t);
        }),
        (c.prototype.onValueUpdate = function (t) {
          var e = t.data.origin;
          if (e != this) {
            var i = this._slider;
            if (e instanceof c) i.setValue(this._obj[this._targetKey]);
            else {
              var n = this._values;
              i.setBoundMin(n[0]),
                i.setBoundMax(n[1]),
                e instanceof r || i.setValue(this._obj[this._targetKey]);
            }
            this.applyValue();
          }
        }),
        (c.prototype._updateValueField = function () {
          this._input.setValue(this._slider.getValue());
        }),
        (c.prototype.onPanelMoveEnd =
          c.prototype.onGroupWidthChange =
          c.prototype.onWindowResize =
            function () {
              this._slider.resetOffset();
            }),
        (c.prototype.setValue = function (t) {
          -1 != t &&
            ((this._obj[this._targetKey] = t),
            this.dispatchEvent(new l(this, _.VALUE_UPDATED, null)));
        }),
        (c.prototype.getData = function () {
          var t = {};
          return (t[this._targetKey] = this._obj[this._targetKey]), t;
        }),
        (t.exports = c);
    },
    20013: (t, e, i) => {
      var n = i(70858),
        s = i(69819),
        o = i(81231),
        a = i(13424),
        r = i(36177);
      function h(t, e, i, r) {
        (this._bounds = [0, 1]),
          (this._value = 0),
          (this._intrpl = 0),
          (this._focus = !1),
          (this._onBegin = e || function () {}),
          (this._onChange = i || function () {}),
          (this._onFinish = r || function () {});
        var h = new n().setStyleClass(a.SliderWrap);
        t.addChild(h);
        var l = (this._slot = {
            node: new n().setStyleClass(a.SliderSlot),
            offsetX: 0,
            width: 0,
            padding: 3,
          }),
          d = (this._handle = {
            node: new n().setStyleClass(a.SliderHandle),
            width: 0,
            dragging: !1,
          });
        h.addChild(l.node),
          l.node.addChild(d.node),
          (l.offsetX = l.node.getPositionGlobalX()),
          (l.width = Math.floor(l.node.getWidth() - 2 * l.padding)),
          d.node.setWidth(d.width),
          l.node.addEventListener(o.MOUSE_DOWN, this._onSlotMouseDown.bind(this)),
          l.node.addEventListener(o.MOUSE_UP, this._onSlotMouseUp.bind(this)),
          document.addEventListener(s.MOUSE_MOVE, this._onDocumentMouseMove.bind(this)),
          document.addEventListener(s.MOUSE_UP, this._onDocumentMouseUp.bind(this));
      }
      (h.prototype._onDocumentMouseMove = function () {
        this._handle.dragging && (this._update(), this._onChange());
      }),
        (h.prototype._onDocumentMouseUp = function () {
          this._handle.dragging && this._onFinish(), (this._handle.dragging = !1);
        }),
        (h.prototype._onSlotMouseDown = function () {
          this._onBegin(),
            (this._focus = !0),
            (this._handle.dragging = !0),
            this._handle.node.getElement().focus(),
            this._update(),
            this._onChange();
        }),
        (h.prototype._onSlotMouseUp = function () {
          if (this._focus) {
            var t = this._handle;
            t.dragging && this._onFinish(), (t.dragging = !1);
          }
          this._focus = !1;
        }),
        (h.prototype._update = function () {
          var t = r.get().getX(),
            e = this._slot.node._element.getBoundingClientRect().x,
            i = this._slot.node.getWidth() - 6;
          (px = t < e ? 0 : t > e + i ? i : t - e),
            this._handle.node.setWidth(Math.round(px)),
            (this._intrpl = px / i),
            this._interpolateValue();
        }),
        (h.prototype._updateHandle = function () {
          var t = this._slot.width,
            e = Math.round(this._intrpl * t);
          this._handle.node.setWidth(Math.min(e, t));
        }),
        (h.prototype._interpolateValue = function () {
          var t = this._intrpl,
            e = this._bounds;
          this._value = e[0] * (1 - t) + e[1] * t;
        }),
        (h.prototype.resetOffset = function () {
          var t = this._slot;
          (t.offsetX = t.node.getPositionGlobalX()),
            (t.width = Math.floor(t.node.getWidth() - 2 * t.padding));
        }),
        (h.prototype.setBoundMin = function (t) {
          var e = this._bounds;
          t >= e[1] || ((e[0] = t), this._updateFromBounds());
        }),
        (h.prototype.setBoundMax = function (t) {
          var e = this._bounds;
          t <= e[0] || ((e[1] = t), this._updateFromBounds());
        }),
        (h.prototype._updateFromBounds = function () {
          var t = this._bounds[0],
            e = this._bounds[1];
          (this._value = Math.max(t, Math.min(this._value, e))),
            (this._intrpl = Math.abs((this._value - t) / (t - e))),
            this._updateHandle();
        }),
        (h.prototype.setValue = function (t) {
          var e = this._bounds[0],
            i = this._bounds[1];
          t < e ||
            t > i ||
            ((this._intrpl = Math.abs((t - e) / (e - i))), this._updateHandle(), (this._value = t));
        }),
        (h.prototype.getValue = function () {
          return this._value;
        }),
        (t.exports = h);
    },
    42670: (t, e, i) => {
      var n = i(32884),
        s = i(70858),
        o = i(13424),
        a = i(83211),
        r = i(12410),
        h = i(35226),
        l = i(47261),
        d = i(69819),
        p = i(81231),
        u = i(33925);
      function _(t, e, i, l) {
        n.apply(this, arguments),
          ((l = l || {}).onChange = l.onChange || this._onChange),
          (l.presets = l.presets || null),
          (this._onChange = l.onChange);
        var d = (this._input = new s(s.INPUT_TEXT)),
          _ = this._wrapNode,
          c = l.presets;
        if (c) {
          var v = new s();
          v.setStyleClass(o.WrapInputWPreset), _.addChild(v), v.addChild(d);
          var g = a.get(),
            y = new r(this._wrapNode),
            f = function () {
              g.clear(), y.deactivate();
            },
            E = this,
            S = function () {
              g.build(
                c,
                d.getProperty('value'),
                d,
                function () {
                  d.setProperty('value', c[g.getSelectedIndex()]),
                    E.pushHistoryState(),
                    E.applyValue();
                },
                f,
                h.PADDING_PRESET,
                !1,
              );
            };
          y.setOnActive(S), y.setOnDeactive(f);
        } else _.addChild(d);
        d.setProperty('value', this._obj[this._key]),
          d.addEventListener(p.KEY_UP, this._onInputKeyUp.bind(this)),
          d.addEventListener(p.CHANGE, this._onInputChange.bind(this)),
          d.addEventListener(p.MOUSE_DOWN, this._onInputDragStart.bind(this)),
          this.addEventListener(u.INPUT_SELECT_DRAG, this._parent, 'onComponentSelectDrag');
      }
      (_.prototype = Object.create(n.prototype)),
        (_.prototype.constructor = _),
        (_.prototype._onInputKeyUp = function (t) {
          this._keyIsChar(t.keyCode) && this.pushHistoryState(),
            this.applyValue(),
            this._onChange();
        }),
        (_.prototype._onInputChange = function (t) {
          this._keyIsChar(t.keyCode) && this.pushHistoryState(), this.applyValue();
        }),
        (_.prototype._keyIsChar = function (t) {
          return (
            17 != t && 18 != t && 20 != t && 37 != t && 38 != t && 39 != t && 40 != t && 16 != t
          );
        }),
        (_.prototype.applyValue = function () {
          (this._obj[this._key] = this._input.getProperty('value')),
            this.dispatchEvent(new l(this, u.VALUE_UPDATED, null));
        }),
        (_.prototype.onValueUpdate = function (t) {
          t.data.origin != this && this._input.setProperty('value', this._obj[this._key]);
        }),
        (_.prototype._onInputDragStart = function () {
          var t = d.MOUSE_MOVE,
            e = d.MOUSE_UP,
            i = u.INPUT_SELECT_DRAG,
            n = this,
            s = function () {
              n.dispatchEvent(new l(this, i, null));
            },
            o = function () {
              n.dispatchEvent(new l(this, i, null)),
                document.removeEventListener(t, s, !1),
                document.removeEventListener(t, o, !1);
            };
          this.dispatchEvent(new l(this, i, null)),
            document.addEventListener(t, s, !1),
            document.addEventListener(e, o, !1);
        }),
        (t.exports = _);
    },
    57174: (t, e, i) => {
      var n = i(35992);
      (StringOutput = function (t, e, i, s) {
        n.apply(this, arguments);
      }),
        (StringOutput.prototype = Object.create(n.prototype)),
        (StringOutput.prototype.constructor = StringOutput),
        (StringOutput.prototype._setValue = function () {
          if (!this._parent.isDisabled()) {
            var t = this._obj[this._key];
            if (t != this._prevString) {
              var e,
                i = this._textArea,
                n = i.getElement();
              i.setProperty('value', t), (e = n.scrollHeight), i.setHeight(e);
              var s = this._scrollBar;
              s &&
                (e <= this._wrapNode.getHeight()
                  ? s.disable()
                  : (s.enable(), s.update(), s.reset())),
                (this._prevString = t);
            }
          }
        }),
        (t.exports = StringOutput);
    },
    59827: (t, e, i) => {
      var n = i(78427),
        s = i(35226);
      function o(t, e, i, o) {
        n.apply(this, arguments);
        var a = this._svg,
          r = Number(a.getAttribute('width')),
          h = Number(a.getAttribute('height'));
        ((o = o || {}).height = o.height || h), (o.resolution = o.resolution || 1);
        for (
          var l = o.resolution,
            d = Math.floor(r / l),
            p = (this._points = new Array(2 * d)),
            u = (this._buffer0 = new Array(d)),
            _ = (this._buffer1 = new Array(d)),
            c = 0.5 * this._lineWidth,
            v = -1;
          ++v < d;

        )
          u[v] = _[v] = p[2 * v] = p[2 * v + 1] = c;
        (this._height = o.height =
          o.height < s.COMPONENT_MIN_HEIGHT ? s.COMPONENT_MIN_HEIGHT : o.height),
          this._svgSetSize(h, Math.floor(o.height)),
          (this._grid.style.stroke = 'rgb(39,44,46)'),
          this._updateHeight(),
          this._drawValue();
      }
      (o.prototype = Object.create(n.prototype)),
        (o.prototype.constructor = o),
        (o.prototype._redraw = function () {
          for (
            var t = this._points,
              e = this._buffer0.length,
              i = Number(this._svg.getAttribute('width')),
              n = i / (e - 1),
              s = -1;
            ++s < e;

          )
            t[2 * s] = i - s * n;
          this._drawValue();
        }),
        (o.prototype.onGroupSizeChange = function () {
          var t = this._wrapNode.getWidth(),
            e = this._height;
          this._svgSetSize(t, e), this._updateHeight(), this._drawGrid(), this._redraw();
        }),
        (o.prototype._drawValue = function () {
          this._drawCurve();
        }),
        (o.prototype._drawGrid = function () {
          var t = this._svg,
            e = Number(t.getAttribute('width')),
            i = Math.floor(0.5 * Number(t.getAttribute('height'))),
            n = '';
          (n += this._pathCmdMoveTo(0, i)),
            (n += this._pathCmdLineTo(e, i)),
            this._grid.setAttribute('d', n);
        }),
        (o.prototype._drawCurve = function () {
          var t = this._svg,
            e = this._obj[this._key],
            i = this._buffer0,
            n = this._buffer1,
            s = this._points,
            o = i.length,
            a = '',
            r = 0.5 * Number(t.getAttribute('height')),
            h = r - 0.5 * this._lineWidth;
          (s[1] = i[0]),
            (i[o - 1] = e * h * -1 + Math.floor(r)),
            (a += this._pathCmdMoveTo(s[0], s[1]));
          for (var l, d = 0; ++d < o; )
            (l = 2 * d),
              (n[d - 1] = i[d]),
              (s[l + 1] = i[d - 1] = n[d - 1]),
              (a += this._pathCmdLineTo(s[l], s[l + 1]));
          this._path.setAttribute('d', a);
        }),
        (o.prototype.update = function () {
          this._parent.isDisabled() || this._drawValue();
        }),
        (t.exports = o);
    },
    40930: (t, e, i) => {
      var n = i(70858),
        s = i(13424),
        o = i(14652),
        a = i(33925);
      function r(t, e) {
        o.apply(this, arguments),
          (e.label = t.usesLabels() ? e.label : 'none'),
          (this._parent = t),
          (this._enabled = !0);
        var i = (this._node = new n(n.LIST_ITEM)),
          r = (this._wrapNode = new n());
        if (
          (r.setStyleClass(s.Wrap),
          i.addChild(r),
          (e.ratio = e.ratio || getParentRatio(t)),
          e.ratio && r.setStyleProperty('width', e.ratio + '%'),
          void 0 !== e.label)
        ) {
          if (0 != e.label.length && 'none' != e.label) {
            var h = (this._lablNode = new n(n.SPAN));
            h.setStyleClass(s.Label),
              h.setProperty('innerHTML', e.label),
              e.ratio && h.setStyleProperty('width', 100 - e.ratio + '%'),
              i.addChild(h);
          }
          'none' == e.label &&
            (r.setStyleProperty('marginLeft', '0'), r.setStyleProperty('width', '100%'));
        }
        this._parent.addEventListener(a.ENABLE, this, 'onEnable'),
          this._parent.addEventListener(a.DISABLE, this, 'onDisable'),
          this._parent.addComponentNode(i);
      }
      (r.prototype = Object.create(o.prototype)),
        (r.prototype.constructor = r),
        (r.prototype.enable = function () {
          this._enabled = !0;
        }),
        (r.prototype.disable = function () {
          this._enabled = !1;
        }),
        (r.prototype.isEnabled = function () {
          return this._enabled;
        }),
        (r.prototype.isDisabled = function () {
          return !this._enabled;
        }),
        (r.prototype.onEnable = function () {
          this.enable();
        }),
        (r.prototype.onDisable = function () {
          this.disable();
        }),
        (getParentRatio = function (t) {
          for (; !t._ratio && t._parent; ) t = t._parent;
          return t._ratio;
        }),
        (t.exports = r);
    },
    33925: (t) => {
      t.exports = {
        VALUE_UPDATED: 'valueUpdated',
        UPDATE_VALUE: 'updateValue',
        INPUT_SELECT_DRAG: 'inputSelectDrag',
        ENABLE: 'enable',
        DISABLE: 'disable',
      };
    },
    84657: (t) => {
      function e(t, i) {
        Error.apply(this),
          Error.captureStackTrace(this, e),
          (this.name = 'ComponentObjectError'),
          (this.message = 'Object of type ' + t.constructor.name + ' has no member ' + i + '.');
      }
      (e.prototype = Object.create(Error.prototype)),
        (e.prototype.constructor = e),
        (t.exports = e);
    },
    18468: (t, e, i) => {
      var n = i(14652),
        s = i(47261),
        o = i(56204);
      function a() {
        n.apply(this, arguments), (this._states = []), (this._enabled = !1);
      }
      (a.prototype = Object.create(n.prototype)),
        (a.prototype.constructor = a),
        (a.prototype.pushState = function (t, e, i) {
          if (!this._enabled) {
            var n = this._states;
            n.length >= 30 && n.shift(),
              n.push({ object: t, key: e, value: i }),
              this.dispatchEvent(new s(this, o.STATE_PUSH, null));
          }
        }),
        (a.prototype.getState = function (t, e) {
          var i,
            n,
            s = this._states,
            o = s.length;
          if (0 == o) return null;
          for (var a = -1; ++a < o; )
            if ((i = s[a]).object === t && i.key === e) {
              n = i.value;
              break;
            }
          return n;
        }),
        (a.prototype.popState = function () {
          if (!this._enabled) {
            var t = this._states;
            if (!(t.length < 1)) {
              var e = t.pop();
              (e.object[e.key] = e.value), this.dispatchEvent(new s(this, o.STATE_POP, null));
            }
          }
        }),
        (a.prototype.getNumStates = function () {
          return this._states.length;
        }),
        (a._instance = null),
        (a.setup = function () {
          return (a._instance = new a());
        }),
        (a.get = function () {
          return a._instance;
        }),
        (a.prototype.enable = function () {
          this._enabled = !1;
        }),
        (a.prototype.disable = function () {
          this._enabled = !0;
        }),
        (t.exports = a);
    },
    56204: (t) => {
      t.exports = { STATE_PUSH: 'historyStatePush', STATE_POP: 'historyStatePop' };
    },
    32884: (t, e, i) => {
      var n = i(18468),
        s = i(40930),
        o = i(33925),
        a = i(81796),
        r = i(84657),
        h = i(47261);
      function l(t, e, i, n) {
        if (void 0 === e[i]) throw new r(e, i);
        ((n = n || {}).label = n.label || i),
          s.apply(this, [t, n]),
          (this._obj = e),
          (this._key = i),
          (this._onChange = function () {}),
          a.get().addEventListener(o.UPDATE_VALUE, this, 'onValueUpdate'),
          this.addEventListener(o.VALUE_UPDATED, a.get(), 'onValueUpdated');
      }
      (l.prototype = Object.create(s.prototype)),
        (l.prototype.constructor = l),
        (l.prototype.applyValue = function () {}),
        (l.prototype.onValueUpdate = function (t) {}),
        (l.prototype.pushHistoryState = function () {
          var t = this._obj,
            e = this._key;
          n.get().pushState(t, e, t[e]);
        }),
        (l.prototype.setValue = function (t) {
          (this._obj[this._key] = t), this.dispatchEvent(new h(this, o.VALUE_UPDATED, null));
        }),
        (l.prototype.getData = function () {
          var t = {};
          return (t[this._key] = this._obj[this._key]), t;
        }),
        (t.exports = l);
    },
    81796: (t, e, i) => {
      var n = i(14652),
        s = i(47261),
        o = i(33925),
        a = i(72519);
      function r() {
        n.apply(this);
      }
      (r.prototype = Object.create(n.prototype)),
        (r.prototype.constructor = r),
        (r.prototype.onValueUpdated = function (t) {
          this.dispatchEvent(new s(this, o.UPDATE_VALUE, { origin: t.sender }));
        }),
        (r.prototype.onOptionTriggered = function (t) {
          this.dispatchEvent(new s(this, a.TRIGGER, { origin: t.sender }));
        });
      var h = null;
      (r.get = function () {
        return h || (h = new r()), h;
      }),
        (r.destroy = function () {
          h = null;
        }),
        (t.exports = r);
    },
    72519: (t) => {
      t.exports = { TRIGGERED: 'selectTrigger', TRIGGER: 'triggerSelect' };
    },
    29126: (t) => {
      function e() {
        var t = window.open(
          '',
          '',
          '        width=320,        height=200,        left=' +
            (window.screenX + 0.5 * window.innerWidth - 160) +
            ',        top=' +
            (window.screenY + 0.5 * window.innerHeight - 100) +
            ',        location=0,        titlebar=0,        resizable=0',
        );
        return (
          (t.document.documentElement.innerHTML =
            '<head>\n   <title>ControlKit State</title>\n   <style type="text/css">\n      body{\n          box-sizing: border-box;\n          padding: 20px;\n          margin: 0;\n          font-family: Arial, sans-serif;\n          width: 100%;\n      }\n      textarea{\n          margin-bottom:10px;\n          box-sizing: border-box;\n          padding: 0;\n          border: 0;\n          border: 1px solid #dedede;\n          outline: none;\n          font-family: Monaco, monospace;\n          font-size: 11px;\n          resize: none;\n          word-wrap: break-word;\n          display: block;\n          width: 100%;\n          overflow-y: scroll;\n          height: 125px;\n      }\n      button{\n          margin: 0;\n          padding: 0 5px 3px 5px;\n          height: 20px;\n      }\n      #save,#filename,#load{\n          float: right;\n      }\n      input[type="text"]{\n          margin: 0;\n          padding: 0;\n          width: 45%;\n          height:20px;\n      }\n   </style>\n</head>\n<body>\n   <textarea name="state" id="state"></textarea>\n</body>'),
          t
        );
      }
      t.exports = {
        load: function (t) {
          var i = e(),
            n = i.document;
          n.body.innerHTML +=
            '<input type="file" id="load-disk"></button><button type="button" id="load">Load</button>';
          var s = n.getElementById('state'),
            o = n.getElementById('load');
          function a() {
            try {
              var t = JSON.parse(s.value);
              t && 'object' == typeof t && null !== t && (o.disabled = !1);
            } catch (t) {
              o.disabled = !0;
            }
          }
          (o.disabled = !0),
            s.addEventListener('input', function () {
              a();
            }),
            n.getElementById('load').addEventListener('click', function () {
              var e = s.value;
              t(JSON.parse(e).data), i.close();
            });
          var r = n.getElementById('load-disk');
          r.addEventListener('change', function () {
            var t = new FileReader();
            t.addEventListener('loadend', function (t) {
              (s.value = t.target.result), a();
            }),
              t.readAsText(r.files[0], 'utf-8');
          });
        },
        save: function (t) {
          var i = e().document;
          (i.body.innerHTML +=
            '<button type="button" id="save">Save</button>\n<input type="text" id="filename" value="ck-state.json"></input>'),
            i.getElementById('save').addEventListener('click', function () {
              var t = i.getElementById('state').value,
                e = new Blob([t], { type: 'application:json' }),
                n = i.getElementById('filename').value,
                s = document.createElement('a');
              (s.download = n),
                window.webkitURL
                  ? (s.href = window.webkitURL.createObjectURL(e))
                  : ((s.href = window.createObjectURL(e)),
                    (s.style.display = 'none'),
                    s.addEventListener('click', function () {
                      i.body.removeChild(s);
                    }),
                    i.body.appendChild(s)),
                s.click();
            }),
            (i.getElementById('state').innerText = JSON.stringify(t));
        },
      };
    },
    72222: (t) => {
      function e(t) {
        Error.apply(this),
          Error.captureStackTrace(this, e),
          (this.name = 'ColorFormatError'),
          (this.message = t);
      }
      (e.prototype = Object.create(Error.prototype)),
        (e.prototype.constructor = e),
        (t.exports = e);
    },
    89433: (t) => {
      t.exports = { RGB: 'rgb', HSV: 'hsv', HEX: 'hex', RGBfv: 'rgbfv' };
    },
    21074: (t) => {
      var e = {
        HSV2RGB: function (t, e, i) {
          if (((t %= 360), (i = (Math.max(0, Math.min(i, 100)) / 100) * 255), e <= 0))
            return [(i = Math.round(i)), i, i];
          e > 100 && (e = 100), (e /= 100);
          var n = Math.floor(t / 60) % 6,
            s = t / 60 - n,
            o = i * (1 - e),
            a = i * (1 - s * e),
            r = i * (1 - (1 - s) * e),
            h = 0,
            l = 0,
            d = 0;
          switch (n) {
            case 0:
              (h = i), (l = r), (d = o);
              break;
            case 1:
              (h = a), (l = i), (d = o);
              break;
            case 2:
              (h = o), (l = i), (d = r);
              break;
            case 3:
              (h = o), (l = a), (d = i);
              break;
            case 4:
              (h = r), (l = o), (d = i);
              break;
            case 5:
              (h = i), (l = o), (d = a);
          }
          return [(h = Math.round(h)), (l = Math.round(l)), (d = Math.round(d))];
        },
        RGB2HSV: function (t, e, i) {
          var n = 0;
          (t /= 255), (e /= 255), (i /= 255);
          var s = Math.min(t, Math.min(e, i)),
            o = Math.max(t, Math.max(e, i));
          if (s == o) return (n = s), [0, 0, Math.round(n)];
          var a = t == s ? e - i : i == s ? t - e : i - t,
            r = t == s ? 3 : i == s ? 1 : 5;
          return [
            Math.round(60 * (r - a / (o - s))),
            Math.round(((o - s) / o) * 100),
            (n = Math.round(100 * o)),
          ];
        },
        RGB2HEX: function (t, e, i) {
          return '#' + ((1 << 24) + (t << 16) + (e << 8) + i).toString(16).slice(1);
        },
        RGBfv2HEX: function (t, i, n) {
          return e.RGB2HEX(Math.floor(255 * t), Math.floor(255 * i), Math.floor(255 * n));
        },
        HSV2HEX: function (t, e, i) {
          var n = ControlKit.ColorUtil.HSV2RGB(t, e, i);
          return ControlKit.ColorUtil.RGB2HEX(n[0], n[1], n[2]);
        },
        HEX2RGB: function (t) {
          t = t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (t, e, i, n) {
            return e + e + i + i + n + n;
          });
          var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
          return e ? [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)] : null;
        },
        isValidHEX: function (t) {
          return /^#[0-9A-F]{6}$/i.test(t);
        },
        isValidRGB: function (t, e, i) {
          return t >= 0 && t <= 255 && e >= 0 && e <= 255 && i >= 0 && i <= 255;
        },
        isValidRGBfv: function (t, e, i) {
          return t >= 0 && t <= 1 && e >= 0 && e <= 1 && i >= 0 && i <= 1;
        },
      };
      t.exports = e;
    },
    13424: (t) => {
      t.exports = {
        ControlKit: 'controlKit',
        Panel: 'panel',
        Head: 'head',
        Label: 'label',
        Menu: 'menu',
        Wrap: 'wrap',
        ButtonMenuClose: 'button-menu-close',
        ButtonMenuHide: 'button-menu-hide',
        ButtonMenuShow: 'button-menu-show',
        ButtonMenuUndo: 'button-menu-undo',
        ButtonMenuLoad: 'button-menu-load',
        ButtonMenuSave: 'button-menu-save',
        MenuActive: 'menu-active',
        Button: 'button',
        ButtonPreset: 'button-preset',
        ButtonPresetActive: 'button-preset-active',
        WrapInputWPreset: 'input-with-preset-wrap',
        WrapColorWPreset: 'color-with-preset-wrap',
        HeadInactive: 'head-inactive',
        PanelHeadInactive: 'panel-head-inactive',
        GroupList: 'group-list',
        Group: 'group',
        SubGroupList: 'sub-group-list',
        SubGroup: 'sub-group',
        TextAreaWrap: 'textarea-wrap',
        WrapSlider: 'wrap-slider',
        SliderWrap: 'slider-wrap',
        SliderSlot: 'slider-slot',
        SliderHandle: 'slider-handle',
        ArrowBMin: 'arrow-b-min',
        ArrowBMax: 'arrow-b-max',
        ArrowBSubMin: 'arrow-b-sub-min',
        ArrowBSubMax: 'arrow-b-sub-max',
        ArrowSMin: 'arrow-s-min',
        ArrowSMax: 'arrow-s-max',
        Select: 'select',
        SelectActive: 'select-active',
        Options: 'options',
        OptionsSelected: 'li-selected',
        CanvasListItem: 'canvas-list-item',
        CanvasWrap: 'canvas-wrap',
        SVGListItem: 'svg-list-item',
        SVGWrap: 'svg-wrap',
        GraphSliderXWrap: 'graph-slider-x-wrap',
        GraphSliderYWrap: 'graph-slider-y-wrap',
        GraphSliderX: 'graph-slider-x',
        GraphSliderY: 'graph-slider-y',
        GraphSliderXHandle: 'graph-slider-x-handle',
        GraphSliderYHandle: 'graph-slider-y-handle',
        Picker: 'picker',
        PickerFieldWrap: 'field-wrap',
        PickerInputWrap: 'input-wrap',
        PickerInputField: 'input-field',
        PickerControlsWrap: 'controls-wrap',
        PickerColorContrast: 'color-contrast',
        PickerHandleField: 'indicator',
        PickerHandleSlider: 'indicator',
        Color: 'color',
        ScrollBar: 'scrollBar',
        ScrollWrap: 'scroll-wrap',
        ScrollBarBtnUp: 'btnUp',
        ScrollBarBtnDown: 'btnDown',
        ScrollBarTrack: 'track',
        ScrollBarThumb: 'thumb',
        ScrollBuffer: 'scroll-buffer',
      };
    },
    69819: (t) => {
      t.exports = {
        MOUSE_MOVE: 'mousemove',
        MOUSE_UP: 'mouseup',
        MOUSE_DOWN: 'mousedown',
        MOUSE_WHEEL: 'mousewheel',
        WINDOW_RESIZE: 'resize',
      };
    },
    36177: (t, e, i) => {
      var n = i(14652),
        s = i(47261),
        o = i(69819),
        a = null;
      function r() {
        n.apply(this),
          (this._pos = [0, 0]),
          (this._wheelDirection = 0),
          (this._hoverElement = null);
        var t = this;
        (this._onDocumentMouseMove = function (e) {
          var i = 0,
            n = 0;
          e || (e = window.event),
            e.pageX
              ? ((i = e.pageX), (n = e.pageY))
              : e.clientX &&
                ((i = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft),
                (n = e.clientY + document.body.scrollTop + document.documentElement.scrollTop)),
            (t._pos[0] = i),
            (t._pos[1] = n),
            (t._hoverElement = document.elementFromPoint(i, n));
        }),
          (this._onDocumentMouseWheel = function (e) {
            (t._wheelDirection = e.detail < 0 || e.wheelDelta > 0 ? 1 : -1),
              t.dispatchEvent(new s(t, o.MOUSE_WHEEL, e));
          }),
          document.addEventListener(o.MOUSE_MOVE, this._onDocumentMouseMove),
          document.addEventListener(o.MOUSE_WHEEL, this._onDocumentMouseWheel);
      }
      (r.prototype = Object.create(n.prototype)),
        (r.prototype.constructor = r),
        (r.prototype._removeDocumentListener = function () {
          document.removeEventListener(o.MOUSE_MOVE, this._onDocumentMouseMove),
            document.removeEventListener(o.MOUSE_WHEEL, this._onDocumentMouseWheel);
        }),
        (r.prototype.getPosition = function () {
          return this._pos;
        }),
        (r.prototype.getX = function () {
          return this._pos[0];
        }),
        (r.prototype.getY = function () {
          return this._pos[1];
        }),
        (r.prototype.getWheelDirection = function () {
          return this._wheelDirection;
        }),
        (r.prototype.getHoverElement = function () {
          return this._hoverElement;
        }),
        (r.setup = function () {
          return (a = a || new r());
        }),
        (r.get = function () {
          return a;
        }),
        (r.destroy = function () {
          a._removeDocumentListener(), (a = null);
        }),
        (t.exports = r);
    },
    70858: (t) => {
      function e() {
        switch (((this._element = null), arguments.length)) {
          case 1:
            var t = arguments[0];
            t != e.INPUT_TEXT && t != e.INPUT_BUTTON && t != e.INPUT_SELECT && t != e.INPUT_CHECKBOX
              ? (this._element = document.createElement(t))
              : ((this._element = document.createElement('input')), (this._element.type = t));
            break;
          case 0:
            this._element = document.createElement('div');
        }
      }
      (e.DIV = 'div'),
        (e.INPUT_TEXT = 'text'),
        (e.INPUT_BUTTON = 'button'),
        (e.INPUT_SELECT = 'select'),
        (e.INPUT_CHECKBOX = 'checkbox'),
        (e.OPTION = 'option'),
        (e.LIST = 'ul'),
        (e.LIST_ITEM = 'li'),
        (e.SPAN = 'span'),
        (e.TEXTAREA = 'textarea'),
        (e.prototype = {
          addChild: function (t) {
            return this._element.appendChild(t.getElement()), t;
          },
          addChildren: function () {
            for (var t = -1, e = arguments.length, i = this._element; ++t < e; )
              i.appendChild(arguments[t].getElement());
            return this;
          },
          addChildAt: function (t, e) {
            return this._element.insertBefore(t.getElement(), this._element.children[e]), t;
          },
          removeChild: function (t) {
            return this.contains(t) ? (this._element.removeChild(t.getElement()), t) : null;
          },
          removeChildren: function () {
            for (var t = -1, e = arguments.length, i = this._element; ++t < e; )
              i.removeChild(arguments[t].getElement());
            return this;
          },
          removeChildAt: function (t, e) {
            return this.contains(t) ? (this._element.removeChild(t.getElement()), t) : null;
          },
          removeAllChildren: function () {
            for (var t = this._element; t.hasChildNodes(); ) t.removeChild(t.lastChild);
            return this;
          },
          setWidth: function (t) {
            return (this._element.style.width = t + 'px'), this;
          },
          getWidth: function () {
            return this._element.offsetWidth;
          },
          setHeight: function (t) {
            return (this._element.style.height = t + 'px'), this;
          },
          getHeight: function () {
            return this._element.offsetHeight;
          },
          setPosition: function (t, e) {
            return this.setPosition(t).setPosition(e);
          },
          setPositionX: function (t) {
            return (this._element.style.marginLeft = t + 'px'), this;
          },
          setPositionY: function (t) {
            return (this._element.style.marginTop = t + 'px'), this;
          },
          setPositionGlobal: function (t, e) {
            return this.setPositionGlobalX(t).setPositionGlobalY(e);
          },
          setPositionGlobalX: function (t) {
            return (this._element.style.left = t + 'px'), this;
          },
          setPositionGlobalY: function (t) {
            return (this._element.style.top = t + 'px'), this;
          },
          getPosition: function () {
            return [this.getPositionX(), this.getPositionY()];
          },
          getPositionX: function () {
            return this._element.offsetLeft;
          },
          getPositionY: function () {
            return this._element.offsetTop;
          },
          getPositionGlobal: function () {
            for (var t = [0, 0], e = this._element; e; )
              (t[0] += e.offsetLeft), (t[1] += e.offsetTop), (e = e.offsetParent);
            return t;
          },
          getPositionGlobalX: function () {
            for (var t = 0, e = this._element; e; ) (t += e.offsetLeft), (e = e.offsetParent);
            return t;
          },
          getPositionGlobalY: function () {
            for (var t = 0, e = this._element; e; ) (t += e.offsetTop), (e = e.offsetParent);
            return t;
          },
          addEventListener: function (t, e, i) {
            return this._element.addEventListener(t, e, i), this;
          },
          removeEventListener: function (t, e, i) {
            return this._element.removeEventListener(t, e, i), this;
          },
          dispatchEvent: function (t) {
            return this._element.dispatchEvent(t), this;
          },
          setStyleClass: function (t) {
            return (this._element.className = t), this;
          },
          setStyleProperty: function (t, e) {
            return (this._element.style[t] = e), this;
          },
          getStyleProperty: function (t) {
            return this._element.style[t];
          },
          setStyleProperties: function (t) {
            for (var e in t) this._element.style[e] = t[e];
            return this;
          },
          deleteStyleClass: function () {
            return (this._element.className = ''), this;
          },
          deleteStyleProperty: function (t) {
            return (this._element.style[t] = ''), this;
          },
          deleteStyleProperties: function (t) {
            for (var e in t) this._element.style[e] = '';
            return this;
          },
          getChildAt: function (t) {
            return new e().setElement(this._element.children[t]);
          },
          getChildIndex: function (t) {
            return this._indexOf(this._element, t.getElement());
          },
          getNumChildren: function () {
            return this._element.children.length;
          },
          getFirstChild: function () {
            return new e().setElement(this._element.firstChild);
          },
          getLastChild: function () {
            return new e().setElement(this._element.lastChild);
          },
          hasChildren: function () {
            return 0 != this._element.children.length;
          },
          contains: function (t) {
            return -1 != this._indexOf(this._element, t.getElement());
          },
          _indexOf: function (t, e) {
            return Array.prototype.indexOf.call(t.children, e);
          },
          setProperty: function (t, e) {
            return (this._element[t] = e), this;
          },
          setProperties: function (t) {
            for (var e in t) this._element[e] = t[e];
            return this;
          },
          getProperty: function (t) {
            return this._element[t];
          },
          setElement: function (t) {
            return (this._element = t), this;
          },
          getElement: function () {
            return this._element;
          },
          getStyle: function () {
            return this._element.style;
          },
          getParent: function () {
            return new e().setElement(this._element.parentNode);
          },
        }),
        (e.getNodeByElement = function (t) {
          return new e().setElement(t);
        }),
        (e.getNodeById = function (t) {
          return new e().setElement(document.getElementById(t));
        }),
        (t.exports = e);
    },
    81231: (t) => {
      t.exports = {
        MOUSE_DOWN: 'mousedown',
        MOUSE_UP: 'mouseup',
        MOUSE_OVER: 'mouseover',
        MOUSE_MOVE: 'mousemove',
        MOUSE_OUT: 'mouseout',
        KEY_DOWN: 'keydown',
        KEY_UP: 'keyup',
        CHANGE: 'change',
        FINISH: 'finish',
        DBL_CLICK: 'dblclick',
        ON_CLICK: 'click',
        SELECT_START: 'selectstart',
        DRAG_START: 'dragstart',
        DRAG: 'drag',
        DRAG_END: 'dragend',
        DRAG_ENTER: 'dragenter',
        DRAG_OVER: 'dragover',
        DRAG_LEAVE: 'dragleave',
        RESIZE: 'resize',
      };
    },
    47261: (t) => {
      t.exports = function (t, e, i) {
        (this.sender = t), (this.type = e), (this.data = i);
      };
    },
    14652: (t) => {
      function e() {
        this._listeners = [];
      }
      (e.prototype = {
        addEventListener: function (t, e, i) {
          (this._listeners[t] = this._listeners[t] || []),
            this._listeners[t].push({ obj: e, method: i });
        },
        dispatchEvent: function (t) {
          var e = t.type;
          if (this.hasEventListener(e))
            for (var i, n, s = this._listeners[e], o = -1, a = s.length; ++o < a; ) {
              if (!(i = s[o].obj)[(n = s[o].method)]) throw i + ' has no method ' + n;
              i[n](t);
            }
        },
        removeEventListener: function (t, e, i) {
          if (this.hasEventListener(t))
            for (var n = this._listeners[t], s = n.length; --s > -1; )
              if (n[s].obj == e && n[s].method == i) {
                n.splice(s, 1), 0 == n.length && delete this._listeners[t];
                break;
              }
        },
        removeAllEventListeners: function () {
          this._listeners = [];
        },
        hasEventListener: function (t) {
          return null != this._listeners[t] && null != this._listeners[t];
        },
      }),
        (t.exports = e);
    },
    55696: (t) => {
      t.exports = { LEFT: 'left', RIGHT: 'right', TOP: 'top', BOTTOM: 'bottom', NONE: 'none' };
    },
    59574: (t, e, i) => {
      var n = i(70858),
        s = i(35226),
        o = i(13424),
        a = i(69819),
        r = (i(81231), i(36177));
      function h(t, e, i) {
        (this._parentNode = t), (this._targetNode = e), (this._wrapHeight = i);
        var r = (this._wrapNode = new n().setStyleClass(o.ScrollWrap)),
          h = (this._node = new n().setStyleClass(o.ScrollBar)),
          l = (this._trackNode = new n().setStyleClass(o.ScrollBarTrack)),
          d = (this._thumbNode = new n().setStyleClass(o.ScrollBarThumb));
        t.removeChild(e),
          t.addChild(r),
          t.addChildAt(h, 0),
          r.addChild(e),
          h.addChild(l),
          l.addChild(d),
          (this._mouseThumbOffset = 0),
          (this._scrollHeight = 0),
          (this._scrollUnit = 0),
          (this._scrollMin = 0),
          (this._scrollMax = 0),
          d.setPositionY(s.SCROLLBAR_TRACK_PADDING),
          d.addEventListener(a.MOUSE_DOWN, this._onThumbDragStart.bind(this)),
          (this._isValid = !1),
          (this._enabled = !1);
        var p = h.getElement(),
          u = d.getElement(),
          _ = this;
        (this._onMouseWheel = function (t) {
          var e = t.sender,
            i = e.getHoverElement();
          if (i == p || i == u) {
            var n = 0.0125 * _._scrollHeight;
            _._scroll(d.getPositionY() + e.getWheelDirection() * n * -1), t.data.preventDefault();
          }
        }),
          this.addMouseListener();
      }
      (h.prototype.update = function () {
        var t = this._targetNode,
          e = this._thumbNode,
          i = s.SCROLLBAR_TRACK_PADDING,
          n = this._wrapHeight,
          o = t.getHeight(),
          a = n - 2 * i;
        e.setHeight(a);
        var r = n / o;
        if (((this._isValid = !1), !(r > 1))) {
          var h = a * r;
          (this._scrollHeight = a),
            (this._scrollUnit = o - this._scrollHeight - 2 * i),
            (this._scrollMin = i),
            (this._scrollMax = i + a - h),
            e.setHeight(h),
            (this._isValid = !0);
        }
      }),
        (h.prototype._scroll = function (t) {
          var e = this._scrollMin,
            i = this._scrollMax,
            n = Math.max(e, Math.min(t, i)),
            s = (n - e) / (i - e);
          this._thumbNode.setPositionY(n), this._targetNode.setPositionY(s * this._scrollUnit * -1);
        }),
        (h.prototype._onThumbDragStart = function () {
          if (this._isValid && !this._enabled) {
            var t = a.MOUSE_MOVE,
              e = a.MOUSE_UP,
              i = r.get(),
              n = this._trackNode.getPositionGlobalY();
            this._mouseThumbOffset = i.getY() - this._thumbNode.getPositionGlobalY();
            var s = this,
              o = function () {
                s._scroll(i.getY() - n - s._mouseThumbOffset);
              },
              h = function () {
                document.removeEventListener(t, o, !1), document.removeEventListener(e, h, !1);
              };
            document.addEventListener(t, o, !1),
              document.addEventListener(e, h, !1),
              this._scroll(i.getY() - n - s._mouseThumbOffset);
          }
        }),
        (h.prototype.enable = function () {
          (this._enabled = !1), this._updateAppearance();
        }),
        (h.prototype.disable = function () {
          (this._enabled = !0), this._updateAppearance();
        }),
        (h.prototype.reset = function () {
          this._scroll(0);
        }),
        (h.prototype._updateAppearance = function () {
          this._enabled
            ? (this._node.setStyleProperty('display', 'none'),
              this._targetNode.setPositionY(0),
              this._thumbNode.setPositionY(s.SCROLLBAR_TRACK_PADDING))
            : this._node.setStyleProperty('display', 'block');
        }),
        (h.prototype.isValid = function () {
          return this._isValid;
        }),
        (h.prototype.setWrapHeight = function (t) {
          (this._wrapHeight = t), this.update();
        }),
        (h.prototype.removeTargetNode = function () {
          return this._wrapNode.removeChild(this._targetNode);
        }),
        (h.prototype.removeMouseListener = function () {
          r.get().removeEventListener(a.MOUSE_WHEEL, this, '_onMouseWheel');
        }),
        (h.prototype.addMouseListener = function () {
          r.get().addEventListener(a.MOUSE_WHEEL, this, '_onMouseWheel');
        }),
        (h.prototype.removeFromParent = function () {
          var t = this._parentNode,
            e = this._node,
            i = this._targetNode;
          return e.removeChild(i), t.removeChild(this._wrapNode), t.removeChild(e), i;
        }),
        (h.prototype.getWrapNode = function () {
          return this._wrapNode;
        }),
        (h.prototype.getNode = function () {
          return this._node;
        }),
        (h.prototype.getTargetNode = function () {
          return this._targetNode;
        }),
        (t.exports = h);
    },
    49506: (t, e, i) => {
      var n = i(14652),
        s = i(70858),
        o = i(59574);
      function a(t, e) {
        n.apply(this, arguments),
          ((e = e || {}).height = e.height || null),
          (e.enable = void 0 === e.enable || e.enable),
          (this._parent = t),
          (this._height = e.height),
          (this._enabled = e.enable),
          (this._scrollBar = null),
          (this._node = new s(s.LIST_ITEM)),
          (this._wrapNode = new s()),
          (this._listNode = new s(s.LIST)),
          this._parent.getList().addChild(this._node);
      }
      (a.prototype = Object.create(n.prototype)),
        (a.prototype.constructor = a),
        (a.prototype.addScrollWrap = function () {
          var t = this._wrapNode,
            e = this.getMaxHeight();
          (this._scrollBar = new o(t, this._listNode, e)), this.isEnabled() && t.setHeight(e);
        }),
        (a.prototype.preventSelectDrag = function () {
          this._parent.preventSelectDrag(),
            this.hasScrollWrap() && (this._wrapNode.getElement().scrollTop = 0);
        }),
        (a.prototype.hasMaxHeight = function () {
          return null != this._height;
        }),
        (a.prototype.getMaxHeight = function () {
          return this._height;
        }),
        (a.prototype.hasScrollWrap = function () {
          return null != this._scrollBar;
        }),
        (a.prototype.hasLabel = function () {
          return null != this._lablNode;
        }),
        (a.prototype.disable = function () {
          (this._enabled = !1), this._updateAppearance();
        }),
        (a.prototype.enable = function () {
          (this._enabled = !0), this._updateAppearance();
        }),
        (a.prototype.isDisabled = function () {
          return !this._enabled;
        }),
        (a.prototype.isEnabled = function () {
          return this._enabled;
        }),
        (a.prototype.getList = function () {
          return this._listNode;
        }),
        (t.exports = a);
    },
    38223: (t, e, i) => {
      var n = i(49506),
        s = i(13424),
        o = i(70858),
        a = i(99781),
        r = i(47261),
        h = i(69819),
        l = i(81231),
        d = i(32076),
        p = i(47282),
        u = i(32884),
        _ = i(59827),
        c = i(12396);
      function v(t, e) {
        ((e = e || {}).label = e.label || null),
          (e.useLabels = e.useLabels || !0),
          (e.enable = void 0 === e.enable || e.enable),
          n.apply(this, arguments),
          (this._components = []),
          (this._subGroups = []);
        var i = this._node,
          a = this._wrapNode,
          r = this._listNode;
        i.setStyleClass(s.Group),
          a.setStyleClass(s.Wrap),
          r.setStyleClass(s.SubGroupList),
          a.addChild(r);
        var u = e.label;
        if (u) {
          var _ = new o(),
            c = new o(),
            v = new o(o.SPAN),
            g = (this._indiNode = new o());
          _.setStyleClass(s.Head),
            c.setStyleClass(s.Wrap),
            v.setStyleClass(s.Label),
            g.setStyleClass(s.ArrowBMax),
            v.setProperty('innerHTML', u),
            _.addChild(g),
            c.addChild(v),
            _.addChild(c),
            i.addChild(_),
            _.addEventListener(l.MOUSE_DOWN, this._onHeadTrigger.bind(this)),
            this.addEventListener(p.GROUP_LIST_SIZE_CHANGE, t, 'onGroupListSizeChange'),
            this._updateAppearance();
        }
        if ((this.hasMaxHeight() && this.addScrollWrap(), i.addChild(a), this.hasMaxHeight())) {
          if (!u) {
            var y = (this._scrollBufferTop = new o());
            y.setStyleClass(s.ScrollBuffer), i.addChildAt(y, 0);
          }
          var f = (this._scrollBufferBottom = new o());
          f.setStyleClass(s.ScrollBuffer), i.addChild(f);
        }
        (t = this._parent).addEventListener(d.PANEL_MOVE_BEGIN, this, 'onPanelMoveBegin'),
          t.addEventListener(d.PANEL_MOVE, this, 'onPanelMove'),
          t.addEventListener(d.PANEL_MOVE_END, this, 'onPanelMoveEnd'),
          t.addEventListener(d.PANEL_HIDE, this, 'onPanelHide'),
          t.addEventListener(d.PANEL_SHOW, this, 'onPanelShow'),
          t.addEventListener(d.PANEL_SCROLL_WRAP_ADDED, this, 'onPanelScrollWrapAdded'),
          t.addEventListener(d.PANEL_SCROLL_WRAP_REMOVED, this, 'onPanelScrollWrapRemoved'),
          t.addEventListener(d.PANEL_SIZE_CHANGE, this, 'onPanelSizeChange'),
          t.addEventListener(h.WINDOW_RESIZE, this, 'onWindowResize'),
          this.addEventListener(p.GROUP_SIZE_CHANGE, t, 'onGroupListSizeChange');
      }
      function g(t) {
        return t instanceof u && !(t instanceof _) && !(t instanceof c);
      }
      (v.prototype = Object.create(n.prototype)),
        (v.prototype.constructor = v),
        (v.prototype.onPanelMoveBegin = function () {
          this.dispatchEvent(new r(this, d.PANEL_MOVE_BEGIN, null));
        }),
        (v.prototype.onPanelMove = function () {
          this.dispatchEvent(new r(this, d.PANEL_MOVE, null));
        }),
        (v.prototype.onPanelMoveEnd = function () {
          this.dispatchEvent(new r(this, d.PANEL_MOVE_END, null));
        }),
        (v.prototype.onPanelScrollWrapAdded = function () {
          this.dispatchEvent(new r(this, p.GROUP_SIZE_CHANGE, null));
        }),
        (v.prototype.onPanelScrollWrapRemoved = function () {
          this.dispatchEvent(new r(this, p.GROUP_SIZE_CHANGE, null));
        }),
        (v.prototype.onPanelHide = function () {
          this.dispatchEvent(new r(this, p.SUBGROUP_DISABLE, null));
        }),
        (v.prototype.onPanelShow = function () {
          this.dispatchEvent(new r(this, p.SUBGROUP_ENABLE, null));
        }),
        (v.prototype.onPanelSizeChange = function () {
          this.dispatchEvent(new r(this, p.GROUP_SIZE_CHANGE, null));
        }),
        (v.prototype.onWindowResize = function (t) {
          this.dispatchEvent(t);
        }),
        (v.prototype.onSubGroupTrigger = function () {
          if ((this._updateHeight(), this.hasMaxHeight())) {
            var t = this._scrollBar,
              e = this._wrapNode,
              i = this._scrollBufferTop,
              n = this._scrollBufferBottom;
            t.update(),
              t.isValid()
                ? (t.enable(),
                  e.setHeight(this.getMaxHeight()),
                  i && i.setStyleProperty('display', 'block'),
                  n && n.setStyleProperty('display', 'block'))
                : (t.disable(),
                  e.setHeight(e.getChildAt(1).getHeight()),
                  i && i.setStyleProperty('display', 'none'),
                  n && n.setStyleProperty('display', 'none')),
              this.dispatchEvent(new r(this, p.GROUP_SIZE_CHANGE, null));
          }
        }),
        (v.prototype._onHeadTrigger = function () {
          (this._enabled = !this._enabled),
            this._updateAppearance(),
            this.dispatchEvent(new r(this, p.GROUP_LIST_SIZE_CHANGE, null));
        }),
        (v.prototype.addComponent = function () {
          var t = arguments[0],
            e = Array.prototype.slice.call(arguments);
          e.shift(), e.unshift(this._getSubGroup());
          var i = Object.create(t.prototype);
          t.apply(i, e), this._components.push(i), this._updateHeight();
        }),
        (v.prototype._updateHeight = function () {
          this._getSubGroup().update(),
            this.dispatchEvent(new r(this, p.GROUP_SIZE_CHANGE, null)),
            this.hasMaxHeight() && this._scrollBar.update();
        }),
        (v.prototype._updateAppearance = function () {
          var t = this._wrapNode,
            e = this._indiNode,
            i = this._scrollBar,
            n = this._scrollBufferTop,
            o = this._scrollBufferBottom;
          if (this.isDisabled())
            return (
              t.setHeight(0),
              e && e.setStyleClass(s.ArrowBMin),
              void (
                i &&
                (n && n.setStyleProperty('display', 'none'),
                o && o.setStyleProperty('display', 'none'))
              )
            );
          if (this.hasMaxHeight()) {
            var a = this.getMaxHeight(),
              r = t.getChildAt(1).getHeight();
            t.setHeight(r < a ? r : a),
              i.isValid() &&
                (n && n.setStyleProperty('display', 'block'),
                o && o.setStyleProperty('display', 'block'));
          } else t.deleteStyleProperty('height');
          e && e.setStyleClass(s.ArrowBMax);
        }),
        (v.prototype.onGroupSizeUpdate = function () {
          this._updateAppearance(), this.hasMaxHeight() && this._scrollBar.update();
        }),
        (v.prototype.addSubGroup = function (t) {
          return this._subGroups.push(new a(this, t)), this._updateHeight(), this;
        }),
        (v.prototype._getSubGroup = function () {
          var t = this._subGroups;
          return 0 == t.length && t.push(new a(this)), t[t.length - 1];
        }),
        (v.prototype.getComponents = function () {
          return this._components;
        }),
        (v.prototype.setData = function (t) {
          for (var e, i, n = this._components, s = -1, o = 0, a = n.length; ++s < a; )
            g((e = n[s])) && ((i = t[o++]), e.setValue(i[Object.keys(i)[0]]));
        }),
        (v.prototype.getData = function () {
          for (var t, e = this._components, i = -1, n = e.length, s = []; ++i < n; )
            g((t = e[i])) && s.push(t.getData());
          return s;
        }),
        (t.exports = v);
    },
    47282: (t) => {
      t.exports = {
        GROUP_SIZE_CHANGE: 'groupSizeChange',
        GROUP_LIST_SIZE_CHANGE: 'groupListSizeChange',
        GROUP_SIZE_UPDATE: 'groupSizeUpdate',
        SUBGROUP_TRIGGER: 'subGroupTrigger',
        SUBGROUP_ENABLE: 'enableSubGroup',
        SUBGROUP_DISABLE: 'disableSubGroup',
      };
    },
    8081: (t) => {
      t.exports = { UPDATE_MENU: 'updateMenu' };
    },
    98470: (t, e, i) => {
      var n = i(70858),
        s = i(38223),
        o = i(59574),
        a = i(13424),
        r = i(55696),
        h = i(18468),
        l = i(14652),
        d = i(47261),
        p = i(69819),
        u = i(81231),
        _ = i(32076),
        c = i(8081),
        v = i(36177),
        g = i(42670),
        y = i(7969),
        f = i(89239),
        E = i(65761),
        S = i(61134),
        C = i(92787),
        b = i(55453),
        m = i(98360),
        w = i(12396),
        P = i(75239),
        M = i(59827),
        H = i(91724),
        N = i(57174),
        L = i(64376),
        O = i(50060),
        A = 'Control Panel',
        I = r.TOP,
        G = r.RIGHT,
        T = { align: r.RIGHT, resizable: !0 };
      function D(t, e) {
        l.apply(this, arguments),
          (this._parent = t),
          ((e = e || {}).valign = e.valign || I),
          (e.align = e.align || G),
          (e.position = e.position || null),
          (e.width = e.width || 200),
          (e.height = e.height || null),
          (e.ratio = e.ratio || 40),
          (e.label = e.label || A),
          (e.opacity = e.opacity || 1),
          (e.fixed = void 0 === e.fixed || e.fixed),
          (e.enable = void 0 === e.enable || e.enable),
          (e.vconstrain = void 0 === e.vconstrain || e.vconstrain),
          e.dock &&
            ((e.dock.align = e.dock.align || T.align),
            (e.dock.resizable = e.dock.resizable || T.resizable)),
          (this._width = Math.max(100, Math.min(e.width, 600))),
          (this._height = e.height ? Math.max(0, Math.min(e.height, window.innerHeight)) : null),
          (this._ratio = e.ratio),
          (this._fixed = e.fixed),
          (this._dock = e.dock),
          (this._position = e.position),
          (this._vConstrain = e.vconstrain),
          (this._label = e.label),
          (this._enabled = e.enable),
          (this._groups = []);
        var i = this._width,
          s = this._fixed,
          o = this._dock,
          d = this._position,
          _ = this._label,
          v = e.align,
          g = e.opacity,
          y = (this._node = new n().setStyleClass(a.Panel)),
          f = (this._headNode = new n().setStyleClass(a.Head)),
          E = new n().setStyleClass(a.Menu),
          S = new n().setStyleClass(a.Wrap),
          C = new n(n.SPAN).setStyleClass(a.Label),
          b = (this._wrapNode = new n(n.DIV).setStyleClass(a.Wrap)),
          m = (this._listNode = new n(n.LIST).setStyleClass(a.GroupList));
        if (
          (y.setWidth(i),
          C.setProperty('innerHTML', _),
          S.addChild(C),
          f.addChild(E),
          f.addChild(S),
          b.addChild(m),
          y.addChild(f),
          y.addChild(b),
          t.getNode().addChild(y),
          o)
        ) {
          var w = o.align;
          (w != r.LEFT && w != r.RIGHT) || ((v = w), (this._height = window.innerHeight)),
            w == r.TOP || r.BOTTOM,
            y.setStyleProperty('float', v);
        } else {
          var P = (this._menuHide = new n(n.INPUT_BUTTON));
          if (
            (P.setStyleClass(a.ButtonMenuHide),
            P.addEventListener(u.MOUSE_DOWN, this._onMenuHideMouseDown.bind(this)),
            E.addChild(P),
            this._parent.panelsAreClosable())
          ) {
            var M = new n(n.INPUT_BUTTON);
            M.setStyleClass(a.ButtonMenuClose),
              M.addEventListener(u.MOUSE_DOWN, this.disable.bind(this)),
              E.addChild(M);
          }
          if ((this.hasMaxHeight() && this._addScrollWrap(), s)) {
            if (d) {
              var H = d[0],
                N = d[1];
              0 != N && y.setPositionY(N),
                0 != H && (v == r.RIGHT ? (y.getElement().marginRight = H) : y.setPositionX(H));
            }
            y.setStyleProperty('float', v);
          } else
            d
              ? v == r.LEFT || v == r.TOP || v == r.BOTTOM
                ? y.setPositionGlobal(d[0], d[1])
                : (y.setPositionGlobal(window.innerWidth - i - d[0], d[1]),
                  (this._position = y.getPosition()))
              : (this._position = y.getPosition()),
              (this._mouseOffset = [0, 0]),
              y.setStyleProperty('position', 'absolute'),
              f.addEventListener(u.MOUSE_DOWN, this._onHeadDragStart.bind(this));
        }
        var L = this._parent,
          O = L.historyIsEnabled(),
          D = L.statesAreEnabled();
        (O || D) && E.addChildAt(new n(), 0).setStyleClass(a.Wrap),
          O &&
            ((this._menuUndo = E.getChildAt(0)
              .addChild(new n(n.INPUT_BUTTON))
              .setStyleClass(a.ButtonMenuUndo)
              .setProperty('value', h.get().getNumStates())
              .addEventListener(u.MOUSE_DOWN, function () {
                h.get().popState();
              })),
            L.addEventListener(c.UPDATE_MENU, this, 'onUpdateMenu')),
          D &&
            (E.getChildAt(0)
              .addChild(new n(n.INPUT_BUTTON))
              .setStyleClass(a.ButtonMenuLoad)
              .setProperty('value', 'Load')
              .addEventListener(u.MOUSE_DOWN, function () {
                t._loadState();
              }),
            E.getChildAt(0)
              .addChild(new n(n.INPUT_BUTTON))
              .setStyleClass(a.ButtonMenuSave)
              .setProperty('value', 'Save')
              .addEventListener(u.MOUSE_DOWN, function () {
                t._saveState();
              })),
          (O || D) &&
            (f.addEventListener(u.MOUSE_OVER, function () {
              E.setStyleClass(a.MenuActive);
            }),
            f.addEventListener(u.MOUSE_OUT, function () {
              E.setStyleClass(a.Menu);
            })),
          1 != g && 0 != g && y.setStyleProperty('opacity', g),
          window.addEventListener(p.WINDOW_RESIZE, this._onWindowResize.bind(this)),
          this._updateAppearance();
      }
      (D.prototype = Object.create(l.prototype)),
        (D.prototype.constructor = D),
        (D.prototype._onMenuHideMouseDown = function () {
          (this._enabled = !this._enabled), this._updateAppearance();
        }),
        (D.prototype.onUpdateMenu = function () {
          this._menuUndo.setProperty('value', h.get().getNumStates());
        }),
        (D.prototype._onMenuUndoTrigger = function () {
          h.get().popState();
        }),
        (D.prototype._updateAppearance = function () {
          var t = this._node,
            e = this._headNode,
            i = this._menuHide;
          this._enabled
            ? (t.setHeight(e.getHeight() + this._wrapNode.getHeight()),
              t.deleteStyleProperty('height'),
              i.setStyleClass(a.ButtonMenuHide),
              e.setStyleClass(a.Head),
              this.dispatchEvent(new d(this, _.PANEL_SHOW, null)))
            : ((e.getStyle().borderBottom = 'none'),
              t.setHeight(e.getHeight()),
              i.setStyleClass(a.ButtonMenuShow),
              this.dispatchEvent(new d(this, _.PANEL_HIDE, null)));
        }),
        (D.prototype._onHeadDragStart = function () {
          var t = this._parent.getNode(),
            e = this._node,
            i = e.getPositionGlobal(),
            n = v.get().getPosition(),
            s = this._mouseOffset;
          (s[0] = n[0] - i[0]), (s[1] = n[1] - i[1]);
          var o = p.MOUSE_MOVE,
            a = p.MOUSE_UP,
            r = this,
            h = function () {
              r._updatePosition();
            },
            l = function () {
              document.removeEventListener(o, h, !1),
                document.removeEventListener(a, l, !1),
                r.dispatchEvent(new d(this, _.PANEL_MOVE_END, null));
            };
          t.removeChild(e),
            t.addChild(e),
            document.addEventListener(o, h, !1),
            document.addEventListener(a, l, !1),
            this.dispatchEvent(new d(this, _.PANEL_MOVE_BEGIN, null));
        }),
        (D.prototype._updatePosition = function () {
          var t = v.get().getPosition(),
            e = this._mouseOffset,
            i = this._position;
          (i[0] = t[0] - e[0]),
            (i[1] = t[1] - e[1]),
            this._constrainHeight(),
            this._constrainPosition(),
            this.dispatchEvent(new d(this, _.PANEL_MOVE, null));
        }),
        (D.prototype._onWindowResize = function () {
          if (this.isDocked()) {
            var t = this._dock;
            if (t.align == r.RIGHT || t.align == r.LEFT) {
              var e = window.innerHeight,
                i = this._listNode.getHeight(),
                n = this._headNode.getHeight();
              (this._height = e),
                e - n > i ? this._scrollBar.disable() : this._scrollBar.enable(),
                this.dispatchEvent(new d(this, _.PANEL_SIZE_CHANGE));
            }
          } else this.isFixed() || this._constrainPosition();
          this._constrainHeight(), this.dispatchEvent(new d(this, p.WINDOW_RESIZE));
        }),
        (D.prototype._constrainPosition = function () {
          var t = this._node,
            e = window.innerWidth - t.getWidth(),
            i = window.innerHeight - t.getHeight(),
            n = this._position;
          (n[0] = Math.max(0, Math.min(n[0], e))),
            (n[1] = Math.max(0, Math.min(n[1], i))),
            t.setPositionGlobal(n[0], n[1]);
        }),
        (D.prototype._constrainHeight = function () {
          if (this._vConstrain) {
            var t,
              e = this.hasMaxHeight(),
              i = this.hasScrollWrap(),
              n = this._headNode,
              s = this._wrapNode,
              o = this._scrollBar,
              a = this.isDocked() || this.isFixed() ? 0 : this._position[1],
              r = e ? this.getMaxHeight() : i ? o.getTargetNode().getHeight() : s.getHeight(),
              h = a + r,
              l = n.getHeight(),
              p = window.innerHeight - h - l;
            if (p < 0) {
              if (((t = r + p), !i))
                return (
                  this._addScrollWrap(t),
                  void this.dispatchEvent(new d(this, _.PANEL_SCROLL_WRAP_ADDED, null))
                );
              o.setWrapHeight(t), s.setHeight(t);
            } else
              !e &&
                i &&
                (o.removeFromParent(),
                s.addChild(this._listNode),
                s.deleteStyleProperty('height'),
                this._scrollBar.removeMouseListener(),
                (this._scrollBar = null),
                this.dispatchEvent(new d(this, _.PANEL_SCROLL_WRAP_REMOVED, null)));
          }
        }),
        (D.prototype.onGroupListSizeChange = function () {
          this.hasScrollWrap() && this._updateScrollWrap(), this._constrainHeight();
        }),
        (D.prototype._updateScrollWrap = function () {
          var t = this._wrapNode,
            e = this._scrollBar,
            i = this.hasMaxHeight() ? this.getMaxHeight() : 100,
            n = this._listNode.getHeight();
          t.setHeight(n < i ? n : i),
            e.update(),
            e.isValid()
              ? (e.enable(), t.setHeight(i))
              : (e.disable(), t.setHeight(t.getChildAt(1).getHeight()));
        }),
        (D.prototype._addScrollWrap = function () {
          var t = this._wrapNode,
            e = this._listNode,
            i = 0 == arguments.length ? this.getMaxHeight() : arguments[0];
          (this._scrollBar = new o(t, e, i)), this.isEnabled() && t.setHeight(i);
        }),
        (D.prototype.hasScrollWrap = function () {
          return null != this._scrollBar;
        }),
        (D.prototype.preventSelectDrag = function () {
          this.hasScrollWrap() && (this._wrapNode.getElement().scrollTop = 0);
        }),
        (D.prototype.enable = function () {
          this._node.setStyleProperty('display', 'block'),
            (this._enabled = !0),
            this._updateAppearance();
        }),
        (D.prototype.disable = function () {
          this._node.setStyleProperty('display', 'none'),
            (this._enabled = !1),
            this._updateAppearance();
        }),
        (D.prototype.isEnabled = function () {
          return this._enabled;
        }),
        (D.prototype.isDisabled = function () {
          return !this._enabled;
        }),
        (D.prototype.hasMaxHeight = function () {
          return null != this._height;
        }),
        (D.prototype.getMaxHeight = function () {
          return this._height;
        }),
        (D.prototype.isDocked = function () {
          return this._dock;
        }),
        (D.prototype.isFixed = function () {
          return this._fixed;
        }),
        (D.prototype.getGroups = function () {
          return this._groups;
        }),
        (D.prototype.getNode = function () {
          return this._node;
        }),
        (D.prototype.getList = function () {
          return this._listNode;
        }),
        (D.prototype.getWidth = function () {
          return this._width;
        }),
        (D.prototype.getPosition = function () {
          return this._position;
        }),
        (D.prototype.getParent = function () {
          return this._parent;
        }),
        (D.prototype.addGroup = function (t) {
          var e = new s(this, t);
          return (
            this._groups.push(e),
            this.isDocked() && this.dispatchEvent(new d(this, _.PANEL_SIZE_CHANGE)),
            this
          );
        }),
        (D.prototype.addSubGroup = function (t) {
          var e = this._groups;
          return 0 == e.length && this.addGroup(), e[e.length - 1].addSubGroup(t), this;
        }),
        (D.prototype._addComponent = function () {
          var t,
            e = this._groups;
          return (
            0 == e.length && e.push(new s(this)),
            (t = e[e.length - 1]).addComponent.apply(t, arguments),
            this
          );
        }),
        (D.prototype.addStringInput = function (t, e, i) {
          return this._addComponent(g, t, e, i);
        }),
        (D.prototype.addNumberInput = function (t, e, i) {
          return this._addComponent(y, t, e, i);
        }),
        (D.prototype.addRange = function (t, e, i) {
          return this._addComponent(f, t, e, i);
        }),
        (D.prototype.addCheckbox = function (t, e, i) {
          return this._addComponent(E, t, e, i);
        }),
        (D.prototype.addColor = function (t, e, i) {
          return this._addComponent(S, t, e, i);
        }),
        (D.prototype.addButton = function (t, e, i) {
          return this._addComponent(C, t, e, i);
        }),
        (D.prototype.addSelect = function (t, e, i) {
          return this._addComponent(b, t, e, i);
        }),
        (D.prototype.addSlider = function (t, e, i, n) {
          return this._addComponent(m, t, e, i, n);
        }),
        (D.prototype.addFunctionPlotter = function (t, e, i) {
          return this._addComponent(w, t, e, i);
        }),
        (D.prototype.addPad = function (t, e, i) {
          return this._addComponent(P, t, e, i);
        }),
        (D.prototype.addValuePlotter = function (t, e, i) {
          return this._addComponent(M, t, e, i);
        }),
        (D.prototype.addNumberOutput = function (t, e, i) {
          return this._addComponent(H, t, e, i);
        }),
        (D.prototype.addStringOutput = function (t, e, i) {
          return this._addComponent(N, t, e, i);
        }),
        (D.prototype.addCanvas = function (t) {
          return this._addComponent(L, t);
        }),
        (D.prototype.addSVG = function (t) {
          return this._addComponent(O, t);
        }),
        (D.prototype.setData = function (t) {
          for (var e = this._groups, i = -1, n = e.length; ++i < n; ) e[i].setData(t[i]);
        }),
        (D.prototype.getData = function () {
          for (var t = this._groups, e = -1, i = t.length, n = []; ++e < i; )
            n.push(t[e].getData());
          return n;
        }),
        (t.exports = D);
    },
    32076: (t) => {
      t.exports = {
        PANEL_MOVE_BEGIN: 'panelMoveBegin',
        PANEL_MOVE: 'panelMove',
        PANEL_MOVE_END: 'panelMoveEnd',
        PANEL_SHOW: 'panelShow',
        PANEL_HIDE: 'panelHide',
        PANEL_SCROLL_WRAP_ADDED: 'panelScrollWrapAdded',
        PANEL_SCROLL_WRAP_REMOVED: 'panelScrollWrapRemoved',
        PANEL_SIZE_CHANGE: 'panelSizeChange',
      };
    },
    99781: (t, e, i) => {
      var n = i(49506),
        s = i(70858),
        o = i(13424),
        a = i(47261),
        r = i(69819),
        h = i(32076),
        l = i(47282),
        d = i(33925);
      function p(t, e) {
        ((e = e || {}).label = e.label || null),
          (e.useLabels = void 0 === e.useLabels || e.useLabels),
          n.apply(this, arguments);
        var i = this._node,
          a = this._wrapNode,
          d = this._listNode;
        i.setStyleClass(o.SubGroup),
          a.setStyleClass(o.Wrap),
          a.addChild(d),
          i.addChild(a),
          (this._useLabels = e.useLabels);
        var p = e.label;
        if (p && 0 != p.length && 'none' != p) {
          var u = (this._headNode = new s()),
            _ = new s(),
            c = new s(s.SPAN);
          u.setStyleClass(o.Head),
            _.setStyleClass(o.Wrap),
            c.setStyleClass(o.Label),
            c.setProperty('innerHTML', p),
            _.addChild(c),
            u.addChild(_);
          var v = (this._indiNode = new s());
          v.setStyleClass(o.ArrowBSubMax),
            u.addChildAt(v, 0),
            i.addChildAt(u, 0),
            this.addEventListener(l.SUBGROUP_TRIGGER, this._parent, 'onSubGroupTrigger'),
            u.addEventListener(r.MOUSE_DOWN, this._onHeadMouseDown.bind(this)),
            this._updateAppearance();
        }
        this.hasMaxHeight() && this.addScrollWrap(),
          this._parent.addEventListener(l.SUBGROUP_ENABLE, this, 'onEnable'),
          this._parent.addEventListener(l.SUBGROUP_DISABLE, this, 'onDisable'),
          this._parent.addEventListener(h.PANEL_MOVE_END, this, 'onPanelMoveEnd'),
          this._parent.addEventListener(l.GROUP_SIZE_CHANGE, this, 'onGroupSizeChange'),
          this._parent.addEventListener(h.PANEL_SIZE_CHANGE, this, 'onPanelSizeChange'),
          this._parent.addEventListener(r.WINDOW_RESIZE, this, 'onWindowResize'),
          this.addEventListener(l.GROUP_SIZE_UPDATE, this._parent, 'onGroupSizeUpdate');
      }
      (p.prototype = Object.create(n.prototype)),
        (p.prototype.constructor = p),
        (p.prototype._onHeadMouseDown = function () {
          (this._enabled = !this._enabled), this._onTrigger();
          var t = r.MOUSE_UP,
            e = this,
            i = function () {
              e._onTrigger(), document.removeEventListener(t, i);
            };
          document.addEventListener(t, i);
        }),
        (p.prototype._onTrigger = function () {
          this._updateAppearance(), this.dispatchEvent(new a(this, l.SUBGROUP_TRIGGER, null));
        }),
        (p.prototype._updateAppearance = function () {
          this.isDisabled()
            ? (this._wrapNode.setHeight(0),
              this.hasLabel() &&
                (this._headNode.setStyleClass(o.HeadInactive),
                this._indiNode.setStyleClass(o.ArrowBSubMin)))
            : (this.hasMaxHeight()
                ? this._wrapNode.setHeight(this.getMaxHeight())
                : this._wrapNode.deleteStyleProperty('height'),
              this.hasLabel() &&
                (this._headNode.setStyleClass(o.Head),
                this._indiNode.setStyleClass(o.ArrowBSubMax)));
        }),
        (p.prototype.update = function () {
          this.hasMaxHeight() && this._scrollBar.update();
        }),
        (p.prototype.onComponentSelectDrag = function () {
          this.preventSelectDrag();
        }),
        (p.prototype.onEnable = function () {
          this.isDisabled() || this.dispatchEvent(new a(this, d.ENABLE, null));
        }),
        (p.prototype.onDisable = function () {
          this.isDisabled() || this.dispatchEvent(new a(this, d.DISABLE, null));
        }),
        (p.prototype.onGroupSizeChange = function () {
          this.dispatchEvent(new a(this, l.GROUP_SIZE_CHANGE, null));
        }),
        (p.prototype.onGroupSizeUpdate = function () {
          this.dispatchEvent(new a(this, l.GROUP_SIZE_UPDATE, null));
        }),
        (p.prototype.onPanelMoveEnd = function () {
          this.dispatchEvent(new a(this, h.PANEL_MOVE_END, null));
        }),
        (p.prototype.onPanelSizeChange = function () {
          this._updateAppearance();
        }),
        (p.prototype.onWindowResize = function (t) {
          this.dispatchEvent(t);
        }),
        (p.prototype.hasLabel = function () {
          return null != this._headNode;
        }),
        (p.prototype.addComponentNode = function (t) {
          this._listNode.addChild(t);
        }),
        (p.prototype.usesLabels = function () {
          return this._useLabels;
        }),
        (t.exports = p);
    },
  },
]);
