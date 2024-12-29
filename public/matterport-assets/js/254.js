/*! For license information please see 254.js.LICENSE.txt */
(self.webpackChunkmp_webgl = self.webpackChunkmp_webgl || []).push([
  [254],
  {
    70759: (e, t, n) => {
      'use strict';
      n.d(t, { i: () => W });
      var r = function () {
        return (r =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
              for (var i in (t = arguments[n]))
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e;
          }).apply(this, arguments);
      };
      function i(e, t) {
        var n = {};
        for (var r in e)
          Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
        if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
          var i = 0;
          for (r = Object.getOwnPropertySymbols(e); i < r.length; i++)
            t.indexOf(r[i]) < 0 &&
              Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
              (n[r[i]] = e[r[i]]);
        }
        return n;
      }
      Object.create;
      Object.create;
      var o = n(67294);
      var a = function () {
        return (a =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
              for (var i in (t = arguments[n]))
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e;
          }).apply(this, arguments);
      };
      Object.create;
      function s(e) {
        var t = 'function' == typeof Symbol && Symbol.iterator,
          n = t && e[t],
          r = 0;
        if (n) return n.call(e);
        if (e && 'number' == typeof e.length)
          return {
            next: function () {
              return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
            },
          };
        throw new TypeError(t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.');
      }
      function u(e, t) {
        var n = 'function' == typeof Symbol && e[Symbol.iterator];
        if (!n) return e;
        var r,
          i,
          o = n.call(e),
          a = [];
        try {
          for (; (void 0 === t || t-- > 0) && !(r = o.next()).done; ) a.push(r.value);
        } catch (e) {
          i = { error: e };
        } finally {
          try {
            r && !r.done && (n = o.return) && n.call(o);
          } finally {
            if (i) throw i.error;
          }
        }
        return a;
      }
      function c(e, t, n) {
        if (n || 2 === arguments.length)
          for (var r, i = 0, o = t.length; i < o; i++)
            (!r && i in t) || (r || (r = Array.prototype.slice.call(t, 0, i)), (r[i] = t[i]));
        return e.concat(r || Array.prototype.slice.call(t));
      }
      Object.create;
      var d = n(94184),
        l = n.n(d),
        p = function (e) {
          return (Array.isArray(e) ? e : [e])
            .filter(function (e) {
              return !!e;
            })
            .map(function (e) {
              return (
                'mdc-theme--' +
                e.replace(/([A-Z])/g, function (e) {
                  return '-' + e.toLowerCase();
                })
              );
            });
        },
        h = o.forwardRef(function (e, t) {
          var n = e.tag,
            r = void 0 === n ? 'div' : n,
            i = (e.theme, e.element),
            s = (function (e, t) {
              var n = {};
              for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
              if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
                var i = 0;
                for (r = Object.getOwnPropertySymbols(e); i < r.length; i++)
                  t.indexOf(r[i]) < 0 &&
                    Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
                    (n[r[i]] = e[r[i]]);
              }
              return n;
            })(e, ['tag', 'theme', 'element']),
            u = i ? i.props(s) : s,
            c = i ? f(t, i.setRef) : t;
          return o.createElement(r, a({}, u, { ref: c }));
        }),
        f = function () {
          for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
          return function (t) {
            var n, r;
            try {
              for (var i = s(e), o = i.next(); !o.done; o = i.next()) {
                var a = o.value;
                'function' == typeof a ? a(t) : a && 'current' in a && (a.current = t);
              }
            } catch (e) {
              n = { error: e };
            } finally {
              try {
                o && !o.done && (r = i.return) && r.call(i);
              } finally {
                if (n) throw n.error;
              }
            }
          };
        },
        m = function (e, t) {
          'function' == typeof e ? e(t) : e && 'current' in e && (e.current = t);
        };
      function v(e) {
        var t = o.forwardRef(e),
          n = function (e, t) {
            return o.createElement(o.Fragment, null);
          };
        return (
          (n.displayName = e.constructor.name || 'RMWCComponent'),
          (t.displayName = n.displayName),
          t
        );
      }
      var y = {
          blur: 'onBlur',
          cancel: 'onCancel',
          click: 'onClick',
          close: 'onClose',
          contextmenu: 'onContextMenu',
          copy: 'onCopy',
          cut: 'onCut',
          auxclick: 'onAuxClick',
          doubleclick: 'onDoubleClick',
          dragend: 'onDragEnd',
          dragstart: 'onDragStart',
          drop: 'onDrop',
          focus: 'onFocus',
          input: 'onInput',
          invalid: 'onInvalid',
          keydown: 'onKeyDown',
          keypress: 'onKeyPress',
          keyup: 'onKeyUp',
          mousedown: 'onMouseDown',
          mouseup: 'onMouseUp',
          paste: 'onPaste',
          pause: 'onPause',
          play: 'onPlay',
          pointercancel: 'onPointerCancel',
          pointerdown: 'onPointerDown',
          pointerup: 'onPointerUp',
          ratechange: 'onRateChange',
          reset: 'onReset',
          seeked: 'onSeeked',
          submit: 'onSubmit',
          touchcancel: 'onTouchCancel',
          touchend: 'onTouchEnd',
          touchstart: 'onTouchStart',
          volumechange: 'onVolumeChange',
          abort: 'onAbort',
          animationend: 'onAnimationEnd',
          animationiteration: 'onAnimationIteration',
          animationstart: 'onAnimationStart',
          canplay: 'onCanPlay',
          canplaythrough: 'onCanPlayThrough',
          drag: 'onDrag',
          dragenter: 'onDragEnter',
          dragexit: 'onDragExit',
          dragleave: 'onDragLeave',
          dragover: 'onDragOver',
          durationchange: 'onDurationChange',
          emptied: 'onEmptied',
          encrypted: 'onEncrypted',
          ended: 'onEnded',
          error: 'onError',
          gotpointercapture: 'onGotPointerCapture',
          load: 'onLoad',
          loadeddata: 'onLoadedData',
          loadedmetadata: 'onLoadedMetadata',
          loadstart: 'onLoadStart',
          lostpointercapture: 'onLostPointerCapture',
          mousemove: 'onMouseMove',
          mouseout: 'onMouseOut',
          mouseover: 'onMouseOver',
          playing: 'onPlaying',
          pointermove: 'onPointerMove',
          pointerout: 'onPointerOut',
          pointerover: 'onPointerOver',
          progress: 'onProgress',
          scroll: 'onScroll',
          seeking: 'onSeeking',
          stalled: 'onStalled',
          suspend: 'onSuspend',
          timeupdate: 'onTimeUpdate',
          toggle: 'onToggle',
          touchmove: 'onTouchMove',
          transitionend: 'onTransitionEnd',
          waiting: 'onWaiting',
          wheel: 'onWheel',
          mouseenter: 'onMouseEnter',
          mouseleave: 'onMouseLeave',
          pointerenter: 'onPointerEnter',
          pointerleave: 'onPointerLeave',
          change: 'onChange',
          select: 'onSelect',
          beforeinput: 'onBeforeInput',
          compositionend: 'onCompositionEnd',
          compositionstart: 'onCompositionStart',
          compositionupdate: 'onCompositionUpdate',
        },
        g = function (e) {
          return y[e] || e;
        },
        _ = (function () {
          function e(e) {
            (this._classes = new Set()),
              (this._events = {}),
              (this._style = {}),
              (this._props = {}),
              (this._ref = null),
              (this._onChange = null),
              (this._onChange = e),
              (this.onChange = this.onChange.bind(this)),
              (this.addClass = this.addClass.bind(this)),
              (this.removeClass = this.removeClass.bind(this)),
              (this.hasClass = this.hasClass.bind(this)),
              (this.setProp = this.setProp.bind(this)),
              (this.getProp = this.getProp.bind(this)),
              (this.removeProp = this.removeProp.bind(this)),
              (this.setStyle = this.setStyle.bind(this)),
              (this.addEventListener = this.addEventListener.bind(this)),
              (this.removeEventListener = this.removeEventListener.bind(this)),
              (this.setRef = this.setRef.bind(this));
          }
          return (
            (e.prototype.onChange = function () {
              this._onChange && this._onChange();
            }),
            (e.prototype.destroy = function () {
              var e = this;
              (this._onChange = null),
                (this._events = {}),
                (this._style = {}),
                (this._props = {}),
                (this._classes = new Set()),
                setTimeout(function () {
                  e._ref = null;
                });
            }),
            (e.prototype.addClass = function (e) {
              this._classes.has(e) || (this._classes.add(e), this.onChange());
            }),
            (e.prototype.removeClass = function (e) {
              this._classes.has(e) && (this._classes.delete(e), this.onChange());
            }),
            (e.prototype.hasClass = function (e) {
              return this._classes.has(e);
            }),
            (e.prototype.setProp = function (e, t, n) {
              void 0 === n && (n = !1),
                this._props[e] !== t && ((this._props[e] = t), !n && this.onChange());
            }),
            (e.prototype.getProp = function (e) {
              return this._props[e];
            }),
            (e.prototype.removeProp = function (e) {
              void 0 !== this._props[e] && (delete this._props[e], this.onChange());
            }),
            (e.prototype.props = function (e) {
              var t = this,
                n = e.className,
                r = void 0 === n ? '' : n,
                i = e.style,
                o = void 0 === i ? {} : i,
                s = Object.entries(e).reduce(
                  function (e, n) {
                    var r = u(n, 2),
                      i = r[0],
                      o = r[1],
                      a = t._events[i];
                    if ('function' == typeof o && 'function' == typeof a) {
                      e[i] = function (e) {
                        return a(e), o(e);
                      };
                    }
                    return e;
                  },
                  a({}, this._events),
                ),
                d = l()(r, c([], u(this._classes))),
                p = a(a({}, this._style), o);
              return a(a(a(a({}, e), this._props), s), { style: p, className: d });
            }),
            (e.prototype.setStyle = function (e, t) {
              (e = e.startsWith('--')
                ? e
                : e.replace(/(-[a-z])/g, function (e) {
                    return e.toUpperCase().replace('-', '');
                  })),
                this._style[e] !== t && ((this._style[e] = t), this.onChange());
            }),
            (e.prototype.addEventListener = function (e, t) {
              var n = g(e);
              this._events[n] !== t && ((this._events[n] = t), this.onChange());
            }),
            (e.prototype.removeEventListener = function (e, t) {
              var n = g(e);
              this._events[n] && (delete this._events[n], this.onChange());
            }),
            (e.prototype.setRef = function (e) {
              e && (this._ref = e);
            }),
            Object.defineProperty(e.prototype, 'ref', {
              get: function () {
                return this._ref;
              },
              enumerable: !1,
              configurable: !0,
            }),
            e
          );
        })(),
        E = function (e) {
          return function (t, n, r) {
            var i;
            void 0 === r && (r = !1),
              (i = new CustomEvent(t, { detail: n, bubbles: r })),
              Object.defineProperty(i, 'target', { value: n, writable: !1 }),
              Object.defineProperty(i, 'currentTarget', { value: n, writable: !1 });
            var o = t;
            return e[o] && e[o](i), i;
          };
        },
        b = { bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0 },
        T = function (e, t) {
          return (T =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
            })(e, t);
        };
      var C = function () {
        return (C =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
              for (var i in (t = arguments[n]))
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e;
          }).apply(this, arguments);
      };
      var S = {
          animation: { prefixed: '-webkit-animation', standard: 'animation' },
          transform: { prefixed: '-webkit-transform', standard: 'transform' },
          transition: { prefixed: '-webkit-transition', standard: 'transition' },
        },
        A = {
          animationend: {
            cssProperty: 'animation',
            prefixed: 'webkitAnimationEnd',
            standard: 'animationend',
          },
          animationiteration: {
            cssProperty: 'animation',
            prefixed: 'webkitAnimationIteration',
            standard: 'animationiteration',
          },
          animationstart: {
            cssProperty: 'animation',
            prefixed: 'webkitAnimationStart',
            standard: 'animationstart',
          },
          transitionend: {
            cssProperty: 'transition',
            prefixed: 'webkitTransitionEnd',
            standard: 'transitionend',
          },
        };
      function P(e) {
        return Boolean(e.document) && 'function' == typeof e.document.createElement;
      }
      var O = (function () {
        function e(e) {
          void 0 === e && (e = {}), (this.adapter_ = e);
        }
        return (
          Object.defineProperty(e, 'cssClasses', {
            get: function () {
              return {};
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(e, 'strings', {
            get: function () {
              return {};
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(e, 'numbers', {
            get: function () {
              return {};
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(e, 'defaultAdapter', {
            get: function () {
              return {};
            },
            enumerable: !0,
            configurable: !0,
          }),
          (e.prototype.init = function () {}),
          (e.prototype.destroy = function () {}),
          e
        );
      })();
      var w = {
          ACTIVE: 'mdc-slider--active',
          DISABLED: 'mdc-slider--disabled',
          DISCRETE: 'mdc-slider--discrete',
          FOCUS: 'mdc-slider--focus',
          HAS_TRACK_MARKER: 'mdc-slider--display-markers',
          IN_TRANSIT: 'mdc-slider--in-transit',
          IS_DISCRETE: 'mdc-slider--discrete',
        },
        k = {
          ARIA_DISABLED: 'aria-disabled',
          ARIA_VALUEMAX: 'aria-valuemax',
          ARIA_VALUEMIN: 'aria-valuemin',
          ARIA_VALUENOW: 'aria-valuenow',
          CHANGE_EVENT: 'MDCSlider:change',
          INPUT_EVENT: 'MDCSlider:input',
          PIN_VALUE_MARKER_SELECTOR: '.mdc-slider__pin-value-marker',
          STEP_DATA_ATTR: 'data-step',
          THUMB_CONTAINER_SELECTOR: '.mdc-slider__thumb-container',
          TRACK_MARKER_CONTAINER_SELECTOR: '.mdc-slider__track-marker-container',
          TRACK_SELECTOR: '.mdc-slider__track',
        },
        R = { PAGE_FACTOR: 4 },
        x = ['mousedown', 'pointerdown', 'touchstart'],
        I = ['mouseup', 'pointerup', 'touchend'],
        M = { mousedown: 'mousemove', pointerdown: 'pointermove', touchstart: 'touchmove' },
        L = 'ArrowDown',
        N = 'ArrowLeft',
        D = 'ArrowRight',
        H = 'ArrowUp',
        V = 'End',
        j = 'Home',
        U = 'PageDown',
        F = 'PageUp',
        K = (function (e) {
          function t(n) {
            var r = e.call(this, C({}, t.defaultAdapter, n)) || this;
            return (
              (r.savedTabIndex_ = NaN),
              (r.active_ = !1),
              (r.inTransit_ = !1),
              (r.isDiscrete_ = !1),
              (r.hasTrackMarker_ = !1),
              (r.handlingThumbTargetEvt_ = !1),
              (r.min_ = 0),
              (r.max_ = 100),
              (r.step_ = 0),
              (r.value_ = 0),
              (r.disabled_ = !1),
              (r.preventFocusState_ = !1),
              (r.thumbContainerPointerHandler_ = function () {
                return (r.handlingThumbTargetEvt_ = !0);
              }),
              (r.interactionStartHandler_ = function (e) {
                return r.handleDown_(e);
              }),
              (r.keydownHandler_ = function (e) {
                return r.handleKeydown_(e);
              }),
              (r.focusHandler_ = function () {
                return r.handleFocus_();
              }),
              (r.blurHandler_ = function () {
                return r.handleBlur_();
              }),
              (r.resizeHandler_ = function () {
                return r.layout();
              }),
              r
            );
          }
          return (
            (function (e, t) {
              function n() {
                this.constructor = e;
              }
              T(e, t),
                (e.prototype =
                  null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
            })(t, e),
            Object.defineProperty(t, 'cssClasses', {
              get: function () {
                return w;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t, 'strings', {
              get: function () {
                return k;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t, 'numbers', {
              get: function () {
                return R;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t, 'defaultAdapter', {
              get: function () {
                return {
                  hasClass: function () {
                    return !1;
                  },
                  addClass: function () {},
                  removeClass: function () {},
                  getAttribute: function () {
                    return null;
                  },
                  setAttribute: function () {},
                  removeAttribute: function () {},
                  computeBoundingRect: function () {
                    return { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 };
                  },
                  getTabIndex: function () {
                    return 0;
                  },
                  registerInteractionHandler: function () {},
                  deregisterInteractionHandler: function () {},
                  registerThumbContainerInteractionHandler: function () {},
                  deregisterThumbContainerInteractionHandler: function () {},
                  registerBodyInteractionHandler: function () {},
                  deregisterBodyInteractionHandler: function () {},
                  registerResizeHandler: function () {},
                  deregisterResizeHandler: function () {},
                  notifyInput: function () {},
                  notifyChange: function () {},
                  setThumbContainerStyleProperty: function () {},
                  setTrackStyleProperty: function () {},
                  setMarkerValue: function () {},
                  setTrackMarkers: function () {},
                  isRTL: function () {
                    return !1;
                  },
                };
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.init = function () {
              var e = this;
              (this.isDiscrete_ = this.adapter_.hasClass(w.IS_DISCRETE)),
                (this.hasTrackMarker_ = this.adapter_.hasClass(w.HAS_TRACK_MARKER)),
                x.forEach(function (t) {
                  e.adapter_.registerInteractionHandler(t, e.interactionStartHandler_),
                    e.adapter_.registerThumbContainerInteractionHandler(
                      t,
                      e.thumbContainerPointerHandler_,
                    );
                }),
                this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_),
                this.adapter_.registerInteractionHandler('focus', this.focusHandler_),
                this.adapter_.registerInteractionHandler('blur', this.blurHandler_),
                this.adapter_.registerResizeHandler(this.resizeHandler_),
                this.layout(),
                this.isDiscrete_ && 0 === this.getStep() && (this.step_ = 1);
            }),
            (t.prototype.destroy = function () {
              var e = this;
              x.forEach(function (t) {
                e.adapter_.deregisterInteractionHandler(t, e.interactionStartHandler_),
                  e.adapter_.deregisterThumbContainerInteractionHandler(
                    t,
                    e.thumbContainerPointerHandler_,
                  );
              }),
                this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_),
                this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_),
                this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_),
                this.adapter_.deregisterResizeHandler(this.resizeHandler_);
            }),
            (t.prototype.setupTrackMarker = function () {
              this.isDiscrete_ &&
                this.hasTrackMarker_ &&
                0 !== this.getStep() &&
                this.adapter_.setTrackMarkers(this.getStep(), this.getMax(), this.getMin());
            }),
            (t.prototype.layout = function () {
              (this.rect_ = this.adapter_.computeBoundingRect()), this.updateUIForCurrentValue_();
            }),
            (t.prototype.getValue = function () {
              return this.value_;
            }),
            (t.prototype.setValue = function (e) {
              this.setValue_(e, !1);
            }),
            (t.prototype.getMax = function () {
              return this.max_;
            }),
            (t.prototype.setMax = function (e) {
              if (e < this.min_)
                throw new Error("Cannot set max to be less than the slider's minimum value");
              (this.max_ = e),
                this.setValue_(this.value_, !1, !0),
                this.adapter_.setAttribute(k.ARIA_VALUEMAX, String(this.max_)),
                this.setupTrackMarker();
            }),
            (t.prototype.getMin = function () {
              return this.min_;
            }),
            (t.prototype.setMin = function (e) {
              if (e > this.max_)
                throw new Error("Cannot set min to be greater than the slider's maximum value");
              (this.min_ = e),
                this.setValue_(this.value_, !1, !0),
                this.adapter_.setAttribute(k.ARIA_VALUEMIN, String(this.min_)),
                this.setupTrackMarker();
            }),
            (t.prototype.getStep = function () {
              return this.step_;
            }),
            (t.prototype.setStep = function (e) {
              if (e < 0) throw new Error('Step cannot be set to a negative number');
              this.isDiscrete_ && ('number' != typeof e || e < 1) && (e = 1),
                (this.step_ = e),
                this.setValue_(this.value_, !1, !0),
                this.setupTrackMarker();
            }),
            (t.prototype.isDisabled = function () {
              return this.disabled_;
            }),
            (t.prototype.setDisabled = function (e) {
              (this.disabled_ = e),
                this.toggleClass_(w.DISABLED, this.disabled_),
                this.disabled_
                  ? ((this.savedTabIndex_ = this.adapter_.getTabIndex()),
                    this.adapter_.setAttribute(k.ARIA_DISABLED, 'true'),
                    this.adapter_.removeAttribute('tabindex'))
                  : (this.adapter_.removeAttribute(k.ARIA_DISABLED),
                    isNaN(this.savedTabIndex_) ||
                      this.adapter_.setAttribute('tabindex', String(this.savedTabIndex_)));
            }),
            (t.prototype.handleDown_ = function (e) {
              var t = this;
              if (!this.disabled_) {
                (this.preventFocusState_ = !0),
                  this.setInTransit_(!this.handlingThumbTargetEvt_),
                  (this.handlingThumbTargetEvt_ = !1),
                  this.setActive_(!0);
                var n = function (e) {
                    t.handleMove_(e);
                  },
                  r = M[e.type],
                  i = function () {
                    t.handleUp_(),
                      t.adapter_.deregisterBodyInteractionHandler(r, n),
                      I.forEach(function (e) {
                        return t.adapter_.deregisterBodyInteractionHandler(e, i);
                      });
                  };
                this.adapter_.registerBodyInteractionHandler(r, n),
                  I.forEach(function (e) {
                    return t.adapter_.registerBodyInteractionHandler(e, i);
                  }),
                  this.setValueFromEvt_(e);
              }
            }),
            (t.prototype.handleMove_ = function (e) {
              e.preventDefault(), this.setValueFromEvt_(e);
            }),
            (t.prototype.handleUp_ = function () {
              this.setActive_(!1), this.adapter_.notifyChange();
            }),
            (t.prototype.getClientX_ = function (e) {
              return e.targetTouches && e.targetTouches.length > 0
                ? e.targetTouches[0].clientX
                : e.clientX;
            }),
            (t.prototype.setValueFromEvt_ = function (e) {
              var t = this.getClientX_(e),
                n = this.computeValueFromClientX_(t);
              this.setValue_(n, !0);
            }),
            (t.prototype.computeValueFromClientX_ = function (e) {
              var t = this.max_,
                n = this.min_,
                r = (e - this.rect_.left) / this.rect_.width;
              return this.adapter_.isRTL() && (r = 1 - r), n + r * (t - n);
            }),
            (t.prototype.handleKeydown_ = function (e) {
              var t = this.getKeyId_(e),
                n = this.getValueForKeyId_(t);
              isNaN(n) ||
                (e.preventDefault(),
                this.adapter_.addClass(w.FOCUS),
                this.setValue_(n, !0),
                this.adapter_.notifyChange());
            }),
            (t.prototype.getKeyId_ = function (e) {
              return e.key === N || 37 === e.keyCode
                ? N
                : e.key === D || 39 === e.keyCode
                  ? D
                  : e.key === H || 38 === e.keyCode
                    ? H
                    : e.key === L || 40 === e.keyCode
                      ? L
                      : e.key === j || 36 === e.keyCode
                        ? j
                        : e.key === V || 35 === e.keyCode
                          ? V
                          : e.key === F || 33 === e.keyCode
                            ? F
                            : e.key === U || 34 === e.keyCode
                              ? U
                              : '';
            }),
            (t.prototype.getValueForKeyId_ = function (e) {
              var t = this,
                n = t.max_,
                r = t.min_,
                i = t.step_ || (n - r) / 100;
              switch ((this.adapter_.isRTL() && (e === N || e === D) && (i = -i), e)) {
                case N:
                case L:
                  return this.value_ - i;
                case D:
                case H:
                  return this.value_ + i;
                case j:
                  return this.min_;
                case V:
                  return this.max_;
                case F:
                  return this.value_ + i * R.PAGE_FACTOR;
                case U:
                  return this.value_ - i * R.PAGE_FACTOR;
                default:
                  return NaN;
              }
            }),
            (t.prototype.handleFocus_ = function () {
              this.preventFocusState_ || this.adapter_.addClass(w.FOCUS);
            }),
            (t.prototype.handleBlur_ = function () {
              (this.preventFocusState_ = !1), this.adapter_.removeClass(w.FOCUS);
            }),
            (t.prototype.setValue_ = function (e, t, n) {
              if ((void 0 === n && (n = !1), e !== this.value_ || n)) {
                var r = this.min_,
                  i = this.max_,
                  o = e === r || e === i;
                this.step_ && !o && (e = this.quantize_(e)),
                  e < r ? (e = r) : e > i && (e = i),
                  (e = e || 0),
                  (this.value_ = e),
                  this.adapter_.setAttribute(k.ARIA_VALUENOW, String(this.value_)),
                  this.updateUIForCurrentValue_(),
                  t &&
                    (this.adapter_.notifyInput(),
                    this.isDiscrete_ && this.adapter_.setMarkerValue(e));
              }
            }),
            (t.prototype.quantize_ = function (e) {
              return Math.round(e / this.step_) * this.step_;
            }),
            (t.prototype.updateUIForCurrentValue_ = function () {
              var e = this,
                t = this,
                n = t.max_,
                r = t.min_,
                i = (t.value_ - r) / (n - r),
                o = i * this.rect_.width;
              this.adapter_.isRTL() && (o = this.rect_.width - o);
              var a = (function (e, t) {
                  if (P(e) && t in S) {
                    var n = e.document.createElement('div'),
                      r = S[t],
                      i = r.standard,
                      o = r.prefixed;
                    return i in n.style ? i : o;
                  }
                  return t;
                })(window, 'transform'),
                s = (function (e, t) {
                  if (P(e) && t in A) {
                    var n = e.document.createElement('div'),
                      r = A[t],
                      i = r.standard,
                      o = r.prefixed;
                    return r.cssProperty in n.style ? i : o;
                  }
                  return t;
                })(window, 'transitionend');
              if (this.inTransit_) {
                var u = function () {
                  e.setInTransit_(!1), e.adapter_.deregisterThumbContainerInteractionHandler(s, u);
                };
                this.adapter_.registerThumbContainerInteractionHandler(s, u);
              }
              requestAnimationFrame(function () {
                e.adapter_.setThumbContainerStyleProperty(
                  a,
                  'translateX(' + o + 'px) translateX(-50%)',
                ),
                  e.adapter_.setTrackStyleProperty(a, 'scaleX(' + i + ')');
              });
            }),
            (t.prototype.setActive_ = function (e) {
              (this.active_ = e), this.toggleClass_(w.ACTIVE, this.active_);
            }),
            (t.prototype.setInTransit_ = function (e) {
              (this.inTransit_ = e), this.toggleClass_(w.IN_TRANSIT, this.inTransit_);
            }),
            (t.prototype.toggleClass_ = function (e, t) {
              t ? this.adapter_.addClass(e) : this.adapter_.removeClass(e);
            }),
            t
          );
        })(O);
      var B = function (e) {
          var t = (0, o.useRef)(),
            n = (0, o.useRef)(),
            s = (function (e) {
              var t = e.foundation,
                n = e.props,
                r = e.elements,
                i = e.api,
                s = u((0, o.useState)(0), 2)[1],
                d = (0, o.useRef)(n);
              d.current = n;
              var l = (0, o.useMemo)(function () {
                  return Object.keys(r).reduce(function (e, t) {
                    return (
                      (e[t] = new _(function () {
                        s(function (e) {
                          return e + 1;
                        });
                      })),
                      e
                    );
                  }, {});
                }, []),
                p = (0, o.useMemo)(function () {
                  var e = t(
                    a(a({}, l), {
                      getProps: function () {
                        return d.current;
                      },
                      emit: function () {
                        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                        return E(d.current).apply(void 0, c([], u(e)));
                      },
                    }),
                  );
                  return i && m(d.current.apiRef, i(a({ foundation: e }, l))), e;
                }, []);
              return (
                (0, o.useEffect)(
                  function () {
                    var e = p;
                    return (
                      e.init(),
                      i && m(d.current.apiRef, i(a({ foundation: e }, l))),
                      m(d.current.foundationRef, e),
                      function () {
                        e.destroy(),
                          m(d.current.apiRef, null),
                          m(d.current.foundationRef, null),
                          Object.values(l).map(function (e) {
                            return e.destroy();
                          }),
                          (d.current = {});
                      }
                    );
                  },
                  [p, l],
                ),
                a({ foundation: p }, l)
              );
            })({
              props: e,
              elements: { rootEl: !0, thumbContainerEl: !0, sliderPinEl: !0 },
              foundation: function (e) {
                var r,
                  i,
                  o,
                  a = e.rootEl,
                  s = e.thumbContainerEl,
                  u = e.sliderPinEl,
                  c = e.emit;
                return new K({
                  hasClass: function (e) {
                    return a.hasClass(e);
                  },
                  addClass: function (e) {
                    return a.addClass(e);
                  },
                  removeClass: function (e) {
                    return a.removeClass(e);
                  },
                  getAttribute: function (e) {
                    return a.getProp(e);
                  },
                  setAttribute:
                    ((r = function (e, t) {
                      return a.setProp(e, t);
                    }),
                    (i = 300),
                    function () {
                      var e = this,
                        t = arguments,
                        n = function () {
                          (o = null), r.apply(e, t);
                        };
                      null !== o && clearTimeout(o), (o = setTimeout(n, i));
                    }),
                  removeAttribute: function (e) {
                    return a.removeProp(e);
                  },
                  computeBoundingRect: function () {
                    return a.ref ? a.ref.getBoundingClientRect() : b;
                  },
                  getTabIndex: function () {
                    return a.ref ? a.ref.tabIndex : 0;
                  },
                  registerInteractionHandler: function (e, t) {
                    a.addEventListener(e, t);
                  },
                  deregisterInteractionHandler: function (e, t) {
                    a.removeEventListener(e, t);
                  },
                  registerThumbContainerInteractionHandler: function (e, t) {
                    s.addEventListener(e, t);
                  },
                  deregisterThumbContainerInteractionHandler: function (e, t) {
                    s.removeEventListener(e, t);
                  },
                  registerBodyInteractionHandler: function (e, t) {
                    document.body && document.body.addEventListener(e, t);
                  },
                  deregisterBodyInteractionHandler: function (e, t) {
                    document.body && document.body.removeEventListener(e, t);
                  },
                  registerResizeHandler: function (e) {
                    window.addEventListener('resize', e);
                  },
                  deregisterResizeHandler: function (e) {
                    window.removeEventListener('resize', e);
                  },
                  notifyInput: function () {
                    c('onInput', { value: d.getValue() });
                  },
                  notifyChange: function () {
                    c('onChange', { value: d.getValue() });
                  },
                  setThumbContainerStyleProperty: function (e, t) {
                    s.setStyle(e, t);
                  },
                  setTrackStyleProperty: function (e, n) {
                    var r;
                    null === (r = t.current) || void 0 === r || r.style.setProperty(e, n);
                  },
                  setMarkerValue: function (e) {
                    u.setProp('value', e);
                  },
                  setTrackMarkers: function (e, t, r) {
                    var i,
                      o = e.toLocaleString(),
                      a =
                        'linear-gradient(to right, currentColor 2px, transparent 0) ' +
                        ('0 center / calc((100% - 2px) / ' +
                          ('((' +
                            t.toLocaleString() +
                            ' - ' +
                            r.toLocaleString() +
                            ') / ' +
                            o +
                            ')') +
                          ') 100% repeat-x');
                    null === (i = n.current) ||
                      void 0 === i ||
                      i.style.setProperty('background', a);
                  },
                  isRTL: function () {
                    return !!a.ref && 'rtl' === getComputedStyle(a.ref).direction;
                  },
                });
              },
            }),
            d = s.foundation,
            l = i(s, ['foundation']);
          return (
            (0, o.useEffect)(
              function () {
                void 0 !== e.max && d.setMax(+e.max);
              },
              [e.max, d],
            ),
            (0, o.useEffect)(
              function () {
                void 0 !== e.min && d.setMin(+e.min);
              },
              [e.min, d],
            ),
            (0, o.useEffect)(
              function () {
                var t = void 0 !== e.value ? Number(e.value) : d.getValue(),
                  n = d.getMin(),
                  r = d.getMax();
                t < n &&
                  (console.warn(
                    'Attempted to set slider to ' + t + ' which is less than min: ' + n,
                  ),
                  (t = n)),
                  t > r &&
                    (console.warn(
                      'Attempted to set slider to ' + t + ' which is greater than max: ' + r,
                    ),
                    (t = r)),
                  d.setValue(t);
              },
              [e.value, d],
            ),
            (0, o.useEffect)(
              function () {
                void 0 !== e.step && d.setStep(+e.step);
              },
              [e.step, d],
            ),
            (0, o.useEffect)(
              function () {
                void 0 !== e.disabled && d.setDisabled(e.disabled);
              },
              [e.disabled, d],
            ),
            (0, o.useEffect)(
              function () {
                void 0 !== e.discrete && (d.isDiscrete_ = e.discrete),
                  e.discrete && 0 === d.getStep() && d.setStep(1);
              },
              [e.discrete, d],
            ),
            (0, o.useEffect)(
              function () {
                var t = d.hasTrackMarker_;
                void 0 !== e.displayMarkers &&
                  e.displayMarkers !== t &&
                  ((d.hasTrackMarker_ = e.displayMarkers),
                  window.requestAnimationFrame(function () {
                    return d.setupTrackMarker();
                  }));
              },
              [e.displayMarkers, d],
            ),
            (0, o.useEffect)(
              function () {
                var e = d.handleDown_.bind(d);
                d.handleDown_ = function (t) {
                  t.persist(), e(t);
                };
              },
              [d],
            ),
            r(
              {
                setTrackRef: function (e) {
                  return (t.current = e);
                },
                setTrackMarkerContainerRef: function (e) {
                  return (n.current = e);
                },
              },
              l,
            )
          );
        },
        G = o.memo(
          o.forwardRef(function (e, t) {
            return o.createElement('div', { ref: t, className: 'mdc-slider__track' });
          }),
        ),
        q = o.memo(
          o.forwardRef(function (e, t) {
            return o.createElement('div', {
              ref: t,
              className: 'mdc-slider__track-marker-container',
            });
          }),
        ),
        J = o.memo(function (e) {
          var t = e.value;
          return o.createElement(
            'div',
            { className: 'mdc-slider__pin' },
            o.createElement('span', { className: 'mdc-slider__pin-value-marker' }, t),
          );
        }),
        X = o.memo(function () {
          return o.createElement(
            'svg',
            { className: 'mdc-slider__thumb', width: '21', height: '21' },
            o.createElement('circle', { cx: '10.5', cy: '10.5', r: '7.875' }),
          );
        }),
        z = o.memo(function () {
          return o.createElement('div', { className: 'mdc-slider__focus-ring' });
        }),
        W = v(function (e, t) {
          var n = B(e),
            a = n.rootEl,
            s = n.thumbContainerEl,
            d = n.sliderPinEl,
            f = n.setTrackRef,
            m = n.setTrackMarkerContainerRef,
            v = e.value,
            y = (e.min, e.max),
            g = e.discrete,
            _ = e.displayMarkers,
            E = e.step,
            b = e.disabled,
            T = (e.onChange, e.onInput, e.children),
            C =
              (e.foundationRef,
              i(e, [
                'value',
                'min',
                'max',
                'discrete',
                'displayMarkers',
                'step',
                'disabled',
                'onChange',
                'onInput',
                'children',
                'foundationRef',
              ])),
            S = (function (e, t) {
              return l().apply(
                void 0,
                c(
                  c([e.className], u(e.theme ? p(e.theme) : [])),
                  u('function' == typeof t ? t(e) : t),
                ),
              );
            })(e, [
              'mdc-slider',
              { 'mdc-slider--discrete': g, 'mdc-slider--display-markers': _ && g },
            ]),
            A = E ? { 'data-step': E } : {};
          return (
            _ &&
              !g &&
              console.warn(
                "The 'displayMarkers' prop on rmwc Slider will\n        only work in conjunction with the 'discrete' prop",
              ),
            o.createElement(
              h,
              r(
                {
                  tabIndex: 0,
                  role: 'slider',
                  'aria-valuemax': y,
                  'aria-valuenow': v,
                  'aria-label': 'Select Value',
                },
                b ? { 'aria-disabled': b } : {},
                A,
                C,
                { ref: t, element: a, className: S },
              ),
              o.createElement(
                'div',
                { className: 'mdc-slider__track-container' },
                o.createElement(G, { ref: f }),
                _ && o.createElement(q, { ref: m }),
              ),
              o.createElement(
                h,
                { element: s, className: 'mdc-slider__thumb-container' },
                g && o.createElement(J, { value: d.getProp('value') }),
                o.createElement(X, null),
                o.createElement(z, null),
              ),
              T,
            )
          );
        });
    },
    85925: (e, t, n) => {
      'use strict';
      n(54443);
    },
    54443: (e, t, n) => {
      'use strict';
      n.r(t);
    },
    17141: (e, t, n) => {
      var r;
      !(function (i, o) {
        var a = {};
        function s(e) {
          return function () {
            var t = { method: e },
              n = Array.prototype.slice.call(arguments);
            /^get/.test(e)
              ? (a.assert(n.length > 0, 'Get methods require a callback.'), n.unshift(t))
              : (/^set/.test(e) &&
                  (a.assert(0 !== n.length, 'Set methods require a value.'), (t.value = n[0])),
                (n = [t])),
              this.send.apply(this, n);
          };
        }
        (a.DEBUG = !1),
          (a.VERSION = '0.0.11'),
          (a.CONTEXT = 'player.js'),
          (a.POST_MESSAGE = !!i.postMessage),
          (a.origin = function (e) {
            return (
              '//' === e.substr(0, 2) && (e = i.location.protocol + e),
              e.split('/').slice(0, 3).join('/')
            );
          }),
          (a.addEvent = function (e, t, n) {
            e &&
              (e.addEventListener
                ? e.addEventListener(t, n, !1)
                : e.attachEvent
                  ? e.attachEvent('on' + t, n)
                  : (e['on' + t] = n));
          }),
          (a.log = function () {
            (a.log.history = a.log.history || []),
              a.log.history.push(arguments),
              i.console && a.DEBUG && i.console.log(Array.prototype.slice.call(arguments));
          }),
          (a.isString = function (e) {
            return '[object String]' === Object.prototype.toString.call(e);
          }),
          (a.isObject = function (e) {
            return '[object Object]' === Object.prototype.toString.call(e);
          }),
          (a.isArray = function (e) {
            return '[object Array]' === Object.prototype.toString.call(e);
          }),
          (a.isNone = function (e) {
            return null == e;
          }),
          (a.has = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
          }),
          (a.indexOf = function (e, t) {
            if (null == e) return -1;
            var n = 0,
              r = e.length;
            if (Array.prototype.IndexOf && e.indexOf === Array.prototype.IndexOf)
              return e.indexOf(t);
            for (; n < r; n++) if (e[n] === t) return n;
            return -1;
          }),
          (a.assert = function (e, t) {
            if (!e) throw t || 'Player.js Assert Failed';
          }),
          (a.Keeper = function () {
            this.init();
          }),
          (a.Keeper.prototype.init = function () {
            this.data = {};
          }),
          (a.Keeper.prototype.getUUID = function () {
            return 'listener-xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (e) {
              var t = (16 * Math.random()) | 0;
              return ('x' === e ? t : (3 & t) | 8).toString(16);
            });
          }),
          (a.Keeper.prototype.has = function (e, t) {
            if (!this.data.hasOwnProperty(e)) return !1;
            if (a.isNone(t)) return !0;
            for (var n = this.data[e], r = 0; r < n.length; r++) if (n[r].id === t) return !0;
            return !1;
          }),
          (a.Keeper.prototype.add = function (e, t, n, r, i) {
            var o = { id: e, event: t, cb: n, ctx: r, one: i };
            this.has(t) ? this.data[t].push(o) : (this.data[t] = [o]);
          }),
          (a.Keeper.prototype.execute = function (e, t, n, r) {
            if (!this.has(e, t)) return !1;
            for (var i = [], o = [], s = 0; s < this.data[e].length; s++) {
              var u = this.data[e][s];
              a.isNone(t) || (!a.isNone(t) && u.id === t)
                ? (o.push({ cb: u.cb, ctx: u.ctx ? u.ctx : r, data: n }), !1 === u.one && i.push(u))
                : i.push(u);
            }
            0 === i.length ? delete this.data[e] : (this.data[e] = i);
            for (var c = 0; c < o.length; c++) {
              var d = o[c];
              d.cb.call(d.ctx, d.data);
            }
          }),
          (a.Keeper.prototype.on = function (e, t, n, r) {
            this.add(e, t, n, r, !1);
          }),
          (a.Keeper.prototype.one = function (e, t, n, r) {
            this.add(e, t, n, r, !0);
          }),
          (a.Keeper.prototype.off = function (e, t) {
            var n = [];
            if (!this.data.hasOwnProperty(e)) return n;
            for (var r = [], i = 0; i < this.data[e].length; i++) {
              var o = this.data[e][i];
              a.isNone(t) || o.cb === t ? a.isNone(o.id) || n.push(o.id) : r.push(o);
            }
            return 0 === r.length ? delete this.data[e] : (this.data[e] = r), n;
          }),
          (a.Player = function (e, t) {
            if (!(this instanceof a.Player)) return new a.Player(e, t);
            this.init(e, t);
          }),
          (a.EVENTS = {
            READY: 'ready',
            PLAY: 'play',
            PAUSE: 'pause',
            ENDED: 'ended',
            TIMEUPDATE: 'timeupdate',
            PROGRESS: 'progress',
            ERROR: 'error',
          }),
          (a.EVENTS.all = function () {
            var e = [];
            for (var t in a.EVENTS)
              a.has(a.EVENTS, t) && a.isString(a.EVENTS[t]) && e.push(a.EVENTS[t]);
            return e;
          }),
          (a.METHODS = {
            PLAY: 'play',
            PAUSE: 'pause',
            GETPAUSED: 'getPaused',
            MUTE: 'mute',
            UNMUTE: 'unmute',
            GETMUTED: 'getMuted',
            SETVOLUME: 'setVolume',
            GETVOLUME: 'getVolume',
            GETDURATION: 'getDuration',
            SETCURRENTTIME: 'setCurrentTime',
            GETCURRENTTIME: 'getCurrentTime',
            SETLOOP: 'setLoop',
            GETLOOP: 'getLoop',
            REMOVEEVENTLISTENER: 'removeEventListener',
            ADDEVENTLISTENER: 'addEventListener',
          }),
          (a.METHODS.all = function () {
            var e = [];
            for (var t in a.METHODS)
              a.has(a.METHODS, t) && a.isString(a.METHODS[t]) && e.push(a.METHODS[t]);
            return e;
          }),
          (a.READIED = []),
          (a.Player.prototype.init = function (e, t) {
            var n = this;
            a.isString(e) && (e = o.getElementById(e)),
              (this.elem = e),
              a.assert(
                'IFRAME' === e.nodeName,
                'playerjs.Player constructor requires an Iframe, got "' + e.nodeName + '"',
              ),
              a.assert(
                e.src,
                "playerjs.Player constructor requires a Iframe with a 'src' attribute.",
              ),
              (this.origin = a.origin(e.src)),
              (this.keeper = new a.Keeper()),
              (this.isReady = !1),
              (this.queue = []),
              (this.events = a.EVENTS.all()),
              (this.methods = a.METHODS.all()),
              a.POST_MESSAGE
                ? a.addEvent(i, 'message', function (e) {
                    n.receive(e);
                  })
                : a.log('Post Message is not Available.'),
              a.indexOf(a.READIED, e.src) > -1
                ? (n.loaded = !0)
                : (this.elem.onload = function () {
                    n.loaded = !0;
                  });
          }),
          (a.Player.prototype.send = function (e, t, n) {
            if (((e.context = a.CONTEXT), (e.version = a.VERSION), t)) {
              var r = this.keeper.getUUID();
              (e.listener = r), this.keeper.one(r, e.method, t, n);
            }
            return this.isReady || 'ready' === e.value
              ? (a.log('Player.send', e, this.origin),
                !0 === this.loaded &&
                  this.elem.contentWindow.postMessage(JSON.stringify(e), this.origin),
                !0)
              : (a.log('Player.queue', e), this.queue.push(e), !1);
          }),
          (a.Player.prototype.receive = function (e) {
            if ((a.log('Player.receive', e), e.origin !== this.origin)) return !1;
            var t;
            try {
              t = JSON.parse(e.data);
            } catch (e) {
              return !1;
            }
            if (t.context !== a.CONTEXT) return !1;
            'ready' === t.event && t.value && t.value.src === this.elem.src && this.ready(t),
              this.keeper.has(t.event, t.listener) &&
                this.keeper.execute(t.event, t.listener, t.value, this);
          }),
          (a.Player.prototype.ready = function (e) {
            if (!0 === this.isReady) return !1;
            e.value.events && (this.events = e.value.events),
              e.value.methods && (this.methods = e.value.methods),
              (this.isReady = !0),
              (this.loaded = !0);
            for (var t = 0; t < this.queue.length; t++) {
              var n = this.queue[t];
              a.log('Player.dequeue', n),
                'ready' === e.event && this.keeper.execute(n.event, n.listener, !0, this),
                this.send(n);
            }
            this.queue = [];
          }),
          (a.Player.prototype.on = function (e, t, n) {
            var r = this.keeper.getUUID();
            return (
              'ready' === e ? this.keeper.one(r, e, t, n) : this.keeper.on(r, e, t, n),
              this.send({ method: 'addEventListener', value: e, listener: r }),
              !0
            );
          }),
          (a.Player.prototype.off = function (e, t) {
            var n = this.keeper.off(e, t);
            if ((a.log('Player.off', n), n.length > 0))
              for (var r in n)
                return this.send({ method: 'removeEventListener', value: e, listener: n[r] }), !0;
            return !1;
          }),
          (a.Player.prototype.supports = function (e, t) {
            a.assert(
              a.indexOf(['method', 'event'], e) > -1,
              'evtOrMethod needs to be either "event" or "method" got ' + e,
            ),
              (t = a.isArray(t) ? t : [t]);
            for (var n = 'event' === e ? this.events : this.methods, r = 0; r < t.length; r++)
              if (-1 === a.indexOf(n, t[r])) return !1;
            return !0;
          });
        for (var u = 0, c = a.METHODS.all().length; u < c; u++) {
          var d = a.METHODS.all()[u];
          a.Player.prototype.hasOwnProperty(d) || (a.Player.prototype[d] = s(d));
        }
        a.addEvent(i, 'message', function (e) {
          var t;
          try {
            t = JSON.parse(e.data);
          } catch (e) {
            return !1;
          }
          if (t.context !== a.CONTEXT) return !1;
          'ready' === t.event && t.value && t.value.src && a.READIED.push(t.value.src);
        }),
          (a.Receiver = function (e, t) {
            this.init(e, t);
          }),
          (a.Receiver.prototype.init = function (e, t) {
            var n = this;
            (this.isReady = !1),
              (this.origin = a.origin(o.referrer)),
              (this.methods = {}),
              (this.supported = { events: e || a.EVENTS.all(), methods: t || a.METHODS.all() }),
              (this.eventListeners = {}),
              (this.reject = !(i.self !== i.top && a.POST_MESSAGE)),
              this.reject ||
                a.addEvent(i, 'message', function (e) {
                  n.receive(e);
                });
          }),
          (a.Receiver.prototype.receive = function (e) {
            if (e.origin !== this.origin) return !1;
            var t = {};
            if (a.isObject(e.data)) t = e.data;
            else
              try {
                t = i.JSON.parse(e.data);
              } catch (e) {
                a.log('JSON Parse Error', e);
              }
            if ((a.log('Receiver.receive', e, t), !t.method)) return !1;
            if (t.context !== a.CONTEXT) return !1;
            if (-1 === a.indexOf(a.METHODS.all(), t.method))
              return this.emit('error', { code: 2, msg: 'Invalid Method "' + t.method + '"' }), !1;
            var n = a.isNone(t.listener) ? null : t.listener;
            if ('addEventListener' === t.method)
              this.eventListeners.hasOwnProperty(t.value)
                ? -1 === a.indexOf(this.eventListeners[t.value], n) &&
                  this.eventListeners[t.value].push(n)
                : (this.eventListeners[t.value] = [n]),
                'ready' === t.value && this.isReady && this.ready();
            else if ('removeEventListener' === t.method) {
              if (this.eventListeners.hasOwnProperty(t.value)) {
                var r = a.indexOf(this.eventListeners[t.value], n);
                r > -1 && this.eventListeners[t.value].splice(r, 1),
                  0 === this.eventListeners[t.value].length && delete this.eventListeners[t.value];
              }
            } else this.get(t.method, t.value, n);
          }),
          (a.Receiver.prototype.get = function (e, t, n) {
            var r = this;
            if (!this.methods.hasOwnProperty(e))
              return this.emit('error', { code: 3, msg: 'Method Not Supported"' + e + '"' }), !1;
            var i = this.methods[e];
            if ('get' === e.substr(0, 3)) {
              i.call(this, function (t) {
                r.send(e, t, n);
              });
            } else i.call(this, t);
          }),
          (a.Receiver.prototype.on = function (e, t) {
            this.methods[e] = t;
          }),
          (a.Receiver.prototype.send = function (e, t, n) {
            if ((a.log('Receiver.send', e, t, n), this.reject))
              return a.log('Receiver.send.reject', e, t, n), !1;
            var r = { context: a.CONTEXT, version: a.VERSION, event: e };
            a.isNone(t) || (r.value = t), a.isNone(n) || (r.listener = n);
            var o = JSON.stringify(r);
            i.parent.postMessage(o, '' === this.origin ? '*' : this.origin);
          }),
          (a.Receiver.prototype.emit = function (e, t) {
            if (!this.eventListeners.hasOwnProperty(e)) return !1;
            a.log('Instance.emit', e, t, this.eventListeners[e]);
            for (var n = 0; n < this.eventListeners[e].length; n++) {
              var r = this.eventListeners[e][n];
              this.send(e, t, r);
            }
            return !0;
          }),
          (a.Receiver.prototype.ready = function () {
            a.log('Receiver.ready'), (this.isReady = !0);
            var e = {
              src: i.location.toString(),
              events: this.supported.events,
              methods: this.supported.methods,
            };
            this.emit('ready', e) || this.send('ready', e);
          }),
          (a.HTML5Adapter = function (e) {
            if (!(this instanceof a.HTML5Adapter)) return new a.HTML5Adapter(e);
            this.init(e);
          }),
          (a.HTML5Adapter.prototype.init = function (e) {
            a.assert(e, 'playerjs.HTML5Adapter requires a video element');
            var t = (this.receiver = new a.Receiver());
            e.addEventListener('playing', function () {
              t.emit('play');
            }),
              e.addEventListener('pause', function () {
                t.emit('pause');
              }),
              e.addEventListener('ended', function () {
                t.emit('ended');
              }),
              e.addEventListener('timeupdate', function () {
                t.emit('timeupdate', { seconds: e.currentTime, duration: e.duration });
              }),
              e.addEventListener('progress', function () {
                t.emit('buffered', { percent: e.buffered.length });
              }),
              t.on('play', function () {
                e.play();
              }),
              t.on('pause', function () {
                e.pause();
              }),
              t.on('getPaused', function (t) {
                t(e.paused);
              }),
              t.on('getCurrentTime', function (t) {
                t(e.currentTime);
              }),
              t.on('setCurrentTime', function (t) {
                e.currentTime = t;
              }),
              t.on('getDuration', function (t) {
                t(e.duration);
              }),
              t.on('getVolume', function (t) {
                t(100 * e.volume);
              }),
              t.on('setVolume', function (t) {
                e.volume = t / 100;
              }),
              t.on('mute', function () {
                e.muted = !0;
              }),
              t.on('unmute', function () {
                e.muted = !1;
              }),
              t.on('getMuted', function (t) {
                t(e.muted);
              }),
              t.on('getLoop', function (t) {
                t(e.loop);
              }),
              t.on('setLoop', function (t) {
                e.loop = t;
              });
          }),
          (a.HTML5Adapter.prototype.ready = function () {
            this.receiver.ready();
          }),
          (a.JWPlayerAdapter = function (e) {
            if (!(this instanceof a.JWPlayerAdapter)) return new a.JWPlayerAdapter(e);
            this.init(e);
          }),
          (a.JWPlayerAdapter.prototype.init = function (e) {
            a.assert(e, 'playerjs.JWPlayerAdapter requires a player object');
            var t = (this.receiver = new a.Receiver());
            (this.looped = !1),
              e.on('pause', function () {
                t.emit('pause');
              }),
              e.on('play', function () {
                t.emit('play');
              }),
              e.on('time', function (e) {
                var n = e.position,
                  r = e.duration;
                if (!n || !r) return !1;
                var i = { seconds: n, duration: r };
                t.emit('timeupdate', i);
              });
            var n = this;
            e.on('complete', function () {
              !0 === n.looped ? e.seek(0) : t.emit('ended');
            }),
              e.on('error', function () {
                t.emit('error');
              }),
              t.on('play', function () {
                e.play(!0);
              }),
              t.on('pause', function () {
                e.pause(!0);
              }),
              t.on('getPaused', function (t) {
                t(e.getState().toLowerCase() !== 'PLAYING'.toLowerCase());
              }),
              t.on('getCurrentTime', function (t) {
                t(e.getPosition());
              }),
              t.on('setCurrentTime', function (t) {
                e.seek(t);
              }),
              t.on('getDuration', function (t) {
                t(e.getDuration());
              }),
              t.on('getVolume', function (t) {
                t(e.getVolume());
              }),
              t.on('setVolume', function (t) {
                e.setVolume(t);
              }),
              t.on('mute', function () {
                e.setMute(!0);
              }),
              t.on('unmute', function () {
                e.setMute(!1);
              }),
              t.on('getMuted', function (t) {
                t(!0 === e.getMute());
              }),
              t.on(
                'getLoop',
                function (e) {
                  e(this.looped);
                },
                this,
              ),
              t.on(
                'setLoop',
                function (e) {
                  this.looped = e;
                },
                this,
              );
          }),
          (a.JWPlayerAdapter.prototype.ready = function () {
            this.receiver.ready();
          }),
          (a.MockAdapter = function () {
            if (!(this instanceof a.MockAdapter)) return new a.MockAdapter();
            this.init();
          }),
          (a.MockAdapter.prototype.init = function () {
            var e = {
                duration: 20,
                currentTime: 0,
                interval: null,
                timeupdate: function () {},
                volume: 100,
                mute: !1,
                playing: !1,
                loop: !1,
                play: function () {
                  (e.interval = setInterval(function () {
                    (e.currentTime += 0.25),
                      e.timeupdate({ seconds: e.currentTime, duration: e.duration });
                  }, 250)),
                    (e.playing = !0);
                },
                pause: function () {
                  clearInterval(e.interval), (e.playing = !1);
                },
              },
              t = (this.receiver = new a.Receiver());
            t.on('play', function () {
              var t = this;
              e.play(),
                this.emit('play'),
                (e.timeupdate = function (e) {
                  t.emit('timeupdate', e);
                });
            }),
              t.on('pause', function () {
                e.pause(), this.emit('pause');
              }),
              t.on('getPaused', function (t) {
                t(!e.playing);
              }),
              t.on('getCurrentTime', function (t) {
                t(e.currentTime);
              }),
              t.on('setCurrentTime', function (t) {
                e.currentTime = t;
              }),
              t.on('getDuration', function (t) {
                t(e.duration);
              }),
              t.on('getVolume', function (t) {
                t(e.volume);
              }),
              t.on('setVolume', function (t) {
                e.volume = t;
              }),
              t.on('mute', function () {
                e.mute = !0;
              }),
              t.on('unmute', function () {
                e.mute = !1;
              }),
              t.on('getMuted', function (t) {
                t(e.mute);
              }),
              t.on('getLoop', function (t) {
                t(e.loop);
              }),
              t.on('setLoop', function (t) {
                e.loop = t;
              });
          }),
          (a.MockAdapter.prototype.ready = function () {
            this.receiver.ready();
          }),
          (a.VideoJSAdapter = function (e) {
            if (!(this instanceof a.VideoJSAdapter)) return new a.VideoJSAdapter(e);
            this.init(e);
          }),
          (a.VideoJSAdapter.prototype.init = function (e) {
            a.assert(e, 'playerjs.VideoJSReceiver requires a player object');
            var t = (this.receiver = new a.Receiver());
            e.on('pause', function () {
              t.emit('pause');
            }),
              e.on('play', function () {
                t.emit('play');
              }),
              e.on('timeupdate', function (n) {
                var r = e.currentTime(),
                  i = e.duration();
                if (!r || !i) return !1;
                var o = { seconds: r, duration: i };
                t.emit('timeupdate', o);
              }),
              e.on('ended', function () {
                t.emit('ended');
              }),
              e.on('error', function () {
                t.emit('error');
              }),
              t.on('play', function () {
                e.play();
              }),
              t.on('pause', function () {
                e.pause();
              }),
              t.on('getPaused', function (t) {
                t(e.paused());
              }),
              t.on('getCurrentTime', function (t) {
                t(e.currentTime());
              }),
              t.on('setCurrentTime', function (t) {
                e.currentTime(t);
              }),
              t.on('getDuration', function (t) {
                t(e.duration());
              }),
              t.on('getVolume', function (t) {
                t(100 * e.volume());
              }),
              t.on('setVolume', function (t) {
                e.volume(t / 100);
              }),
              t.on('mute', function () {
                e.volume(0);
              }),
              t.on('unmute', function () {
                e.volume(1);
              }),
              t.on('getMuted', function (t) {
                t(0 === e.volume());
              }),
              t.on('getLoop', function (t) {
                t(e.loop());
              }),
              t.on('setLoop', function (t) {
                e.loop(t);
              });
          }),
          (a.VideoJSAdapter.prototype.ready = function () {
            this.receiver.ready();
          }),
          void 0 ===
            (r = function () {
              return a;
            }.call(t, n, t, e)) || (e.exports = r);
      })(window, document);
    },
  },
]);
